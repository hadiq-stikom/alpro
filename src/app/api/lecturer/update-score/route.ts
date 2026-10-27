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
        { error: 'Akses ditolak. Hanya dosen pengampu yang berwenang mengubah nilai mahasiswa.' },
        { status: 403 }
      );
    }

    // 3. Baca body request
    const body = await request.json();
    const { submissionId, newScore, note } = body;

    if (!submissionId) {
      return NextResponse.json(
        { error: 'ID submission wajib disertakan.' },
        { status: 400 }
      );
    }

    const parsedScore = Number(newScore);
    if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 100) {
      return NextResponse.json(
        { error: 'Nilai harus berupa angka valid antara 0 hingga 100.' },
        { status: 400 }
      );
    }

    // 4. Ambil data submission lama
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: oldSub, error: fetchErr } = await (supabaseAdmin as any)
      .from('quiz_submissions')
      .select('id, user_id, meeting_id, score, ai_feedback')
      .eq('id', submissionId)
      .single();

    if (fetchErr || !oldSub) {
      return NextResponse.json(
        { error: 'Data submission tidak ditemukan.' },
        { status: 404 }
      );
    }

    // 5. Susun ulasan baru dengan catatan koreksi dosen
    let updatedFeedback = oldSub.ai_feedback || '';
    if (note && note.trim()) {
      const timestamp = new Date().toLocaleString('id-ID');
      const teacherNote = `\n\n[KOREKSI DOSEN (${timestamp}) - Skor disesuaikan dari ${oldSub.score} menjadi ${parsedScore}]: ${note.trim()}`;
      updatedFeedback += teacherNote;
    }

    // 6. Update nilai submission
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: updateErr } = await (supabaseAdmin as any)
      .from('quiz_submissions')
      .update({
        score: parsedScore,
        ai_feedback: updatedFeedback,
      })
      .eq('id', submissionId);

    if (updateErr) {
      console.error('[UpdateScore] Gagal memperbarui nilai di DB:', updateErr);
      return NextResponse.json(
        { error: 'Gagal memperbarui nilai: ' + updateErr.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Nilai berhasil disesuaikan menjadi ${parsedScore}.`,
      submissionId,
      newScore: parsedScore,
      feedback: updatedFeedback,
    });
  } catch (error: any) {
    console.error('[UpdateScore] Unhandled error:', error);
    return NextResponse.json(
      { error: error?.message || 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}
