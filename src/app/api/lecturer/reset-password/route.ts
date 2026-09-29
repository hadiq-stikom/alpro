import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: { autoRefreshToken: false, persistSession: false },
  }
);

interface StudentRecord {
  id: string;
  nim: string | null;
  full_name: string;
  role: string;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Verifikasi sesi Dosen via cookie request
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll() {},
        },
      }
    );

    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser();

    if (authErr || !user) {
      return NextResponse.json(
        { error: 'Sesi login tidak valid atau telah kedaluwarsa. Silakan login kembali.' },
        { status: 401 }
      );
    }

    // 2. Pastikan role user adalah 'dosen'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: lecturerProfile, error: lecturerErr } = await (supabaseAdmin as any)
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (lecturerErr || lecturerProfile?.role !== 'dosen') {
      return NextResponse.json(
        { error: 'Akses ditolak. Hanya dosen pengampu yang berwenang mereset password mahasiswa.' },
        { status: 403 }
      );
    }

    // 3. Baca body request
    const body = await request.json().catch(() => ({}));
    const { studentId } = body;

    if (!studentId || typeof studentId !== 'string') {
      return NextResponse.json(
        { error: 'ID Mahasiswa tidak valid atau tidak disertakan.' },
        { status: 400 }
      );
    }

    // 4. Cari data mahasiswa di tabel public.users
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: studentData, error: studentErr } = await (supabaseAdmin as any)
      .from('users')
      .select('id, nim, full_name, role')
      .eq('id', studentId)
      .single();

    const student = studentData as StudentRecord | null;

    if (studentErr || !student) {
      return NextResponse.json(
        { error: 'Data mahasiswa tidak ditemukan di database.' },
        { status: 404 }
      );
    }

    if (student.role !== 'mahasiswa') {
      return NextResponse.json(
        { error: 'Hanya akun mahasiswa yang dapat direset passwordnya.' },
        { status: 400 }
      );
    }

    if (!student.nim || student.nim.trim().length === 0) {
      return NextResponse.json(
        { error: 'Mahasiswa tidak memiliki NIM yang valid untuk dijadikan password default.' },
        { status: 400 }
      );
    }

    const defaultPassword = student.nim.trim();

    // 5. Update password di auth.users ke NIM default menggunakan Supabase Auth Admin API
    const { error: resetAuthErr } = await supabaseAdmin.auth.admin.updateUserById(
      student.id,
      { password: defaultPassword }
    );

    if (resetAuthErr) {
      console.error('[API Reset Password] Error updateUserById:', resetAuthErr);
      return NextResponse.json(
        { error: `Gagal memperbarui autentikasi: ${resetAuthErr.message}` },
        { status: 500 }
      );
    }

    // 6. Reset flag password_changed = false di tabel public.users
    // Agar mahasiswa diwajibkan ganti password saat login kembali
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: updateDbErr } = await (supabaseAdmin as any)
      .from('users')
      .update({ password_changed: false })
      .eq('id', student.id);

    if (updateDbErr) {
      console.error('[API Reset Password] Error updating public.users:', updateDbErr);
      return NextResponse.json(
        { error: `Gagal memperbarui status akun di database: ${updateDbErr.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Password untuk ${student.full_name} berhasil direset ke password default (NIM: ${defaultPassword}).`,
      student: {
        id: student.id,
        nim: defaultPassword,
        full_name: student.full_name,
        password_changed: false,
      },
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Terjadi kesalahan internal pada server.';
    console.error('[API Reset Password] Internal exception:', error);
    return NextResponse.json(
      { error: errMsg },
      { status: 500 }
    );
  }
}
