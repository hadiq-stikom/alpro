import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const moduleId = searchParams.get('moduleId');
    const status = searchParams.get('status');
    const lecturerId = searchParams.get('lecturerId');

    const supabaseAdmin = createServerClient();

    // 1. Ambil tanda tangan tersimpan dosen jika lecturerId disertakan
    let lecturerStoredSignature: string | null = null;
    if (lecturerId) {
      try {
        const { data: lecUser } = await (supabaseAdmin
          .from('users' as any) as any)
          .select('stored_signature')
          .eq('id', lecturerId)
          .single();
        if (lecUser?.stored_signature) {
          lecturerStoredSignature = lecUser.stored_signature;
        }
      } catch (lecErr) {
        console.warn('[lecturer/praktikum GET] Gagal mengambil stored_signature dosen:', lecErr);
      }
    }

    // 2. Query tabel praktikum_submissions
    let query = (supabaseAdmin
      .from('praktikum_submissions' as any) as any)
      .select(`
        *,
        user:users!user_id(id, full_name, nim, email, avatar_url, class_id)
      `)
      .order('updated_at', { ascending: false });

    if (moduleId) {
      query = query.eq('module_id', parseInt(moduleId, 10));
    }

    if (status && status !== 'semua') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      // Jika tabel belum dibuat, tangani secara elegan
      console.warn('[lecturer/praktikum GET] Query submissions error (tabel mungkin belum dibuat):', error.message);
      return NextResponse.json({
        success: true,
        submissions: [],
        lecturerStoredSignature,
        isTableReady: false,
        warning: 'Tabel praktikum_submissions belum diinisialisasi di basis data Supabase.'
      });
    }

    return NextResponse.json({
      success: true,
      submissions: data || [],
      lecturerStoredSignature,
      isTableReady: true
    });

  } catch (error: any) {
    console.error('Error in GET /api/lecturer/praktikum:', error);
    return NextResponse.json({ 
      success: false, 
      error: error?.message || 'Gagal memuat antrean praktikum dosen.' 
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      submissionId,
      lecturerId,
      status, // 'disetujui' | 'perlu_revisi'
      lecturerScore,
      lecturerFeedback,
      lecturerSignature,
      saveAsDefaultLecturerSignature
    } = body;

    if (!submissionId || !status) {
      return NextResponse.json(
        { success: false, error: 'Parameter submissionId dan status wajib disertakan.' },
        { status: 400 }
      );
    }

    const supabaseAdmin = createServerClient();

    // 1. Simpan tanda tangan default dosen jika diminta
    if (saveAsDefaultLecturerSignature && lecturerSignature && lecturerId) {
      try {
        await (supabaseAdmin
          .from('users' as any) as any)
          .update({ stored_signature: lecturerSignature })
          .eq('id', lecturerId);
        console.log(`[lecturer/praktikum] Stored signature dosen berhasil disimpan untuk user ${lecturerId}`);
      } catch (lSigErr) {
        console.warn('[lecturer/praktikum] Gagal menyimpan stored_signature dosen:', lSigErr);
      }
    }

    // 2. Update status pengesahan praktikum
    const isApproved = status === 'disetujui';
    const updatePayload: any = {
      status,
      lecturer_feedback: lecturerFeedback || null,
      updated_at: new Date().toISOString()
    };

    if (isApproved) {
      updatePayload.lecturer_score = Number(lecturerScore);
      updatePayload.lecturer_signature = lecturerSignature || null;
      updatePayload.lecturer_signed_at = new Date().toISOString();
    }

    const { data, error } = await (supabaseAdmin
      .from('praktikum_submissions' as any) as any)
      .update(updatePayload)
      .eq('id', submissionId)
      .select('*')
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: isApproved
        ? 'Laporan praktikum berhasil disahkan dan ditandatangani secara digital.'
        : 'Catatan revisi praktikum berhasil dikirimkan ke mahasiswa.'
    });

  } catch (error: any) {
    console.error('Error in POST /api/lecturer/praktikum:', error);
    return NextResponse.json({
      success: false,
      error: error?.message || 'Gagal menyimpan status pengesahan praktikum.'
    }, { status: 500 });
  }
}
