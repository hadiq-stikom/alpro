import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthenticatedSessionUser } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthenticatedSessionUser(req);
    if (!auth) {
      return NextResponse.json(
        { success: false, error: 'Sesi login tidak valid atau telah kedaluwarsa.' },
        { status: 401 }
      );
    }
    if (auth.profile.role !== 'dosen') {
      return NextResponse.json(
        { success: false, error: 'Akses ditolak. Fitur ini khusus Dosen Pengampu.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const moduleId = searchParams.get('moduleId');
    const status = searchParams.get('status');
    const { supabaseAdmin } = auth;

    // 1. Ambil tanda tangan tersimpan milik dosen yang sedang login
    let lecturerStoredSignature: string | null = null;
    try {
      const { data: lecUser } = await (supabaseAdmin
        .from('users' as any) as any)
        .select('stored_signature')
        .eq('id', auth.user.id)
        .single();
      if (lecUser?.stored_signature) {
        lecturerStoredSignature = lecUser.stored_signature;
      }
    } catch (lecErr) {
      console.warn('[lecturer/praktikum GET] Gagal mengambil stored_signature dosen:', lecErr);
    }

    // 2. Query tabel praktikum_submissions (list terfilter + hitung agregat seluruh status secara paralel)
    let query = (supabaseAdmin
      .from('praktikum_submissions' as any) as any)
      .select(`
        *,
        user:users!user_id(id, full_name, nim, email, avatar_url, class_id)
      `)
      .order('updated_at', { ascending: false });

    let countsQuery = (supabaseAdmin
      .from('praktikum_submissions' as any) as any)
      .select('status');

    if (moduleId) {
      const parsedModId = parseInt(moduleId, 10);
      query = query.eq('module_id', parsedModId);
      countsQuery = countsQuery.eq('module_id', parsedModId);
    }

    if (status && status !== 'semua' && status !== 'all') {
      query = query.eq('status', status);
    }

    const [{ data, error }, { data: countsData }] = await Promise.all([
      query,
      countsQuery,
    ]);

    const counts = {
      diajukan: 0,
      disetujui: 0,
      perlu_revisi: 0,
      draft: 0,
      total: 0,
    };

    if (Array.isArray(countsData)) {
      for (const row of countsData) {
        counts.total += 1;
        if (row.status === 'diajukan') counts.diajukan += 1;
        else if (row.status === 'disetujui') counts.disetujui += 1;
        else if (row.status === 'perlu_revisi') counts.perlu_revisi += 1;
        else if (row.status === 'draft') counts.draft += 1;
      }
    }

    if (error) {
      console.warn('[lecturer/praktikum GET] Query submissions error (tabel mungkin belum dibuat):', error.message);
      return NextResponse.json({
        success: true,
        submissions: [],
        counts,
        lecturerStoredSignature,
        isTableReady: false,
        warning: 'Tabel praktikum_submissions belum diinisialisasi di basis data Supabase.'
      });
    }

    return NextResponse.json({
      success: true,
      submissions: data || [],
      counts,
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
    const auth = await getAuthenticatedSessionUser(req);
    if (!auth) {
      return NextResponse.json(
        { success: false, error: 'Sesi login tidak valid atau telah kedaluwarsa.' },
        { status: 401 }
      );
    }
    if (auth.profile.role !== 'dosen') {
      return NextResponse.json(
        { success: false, error: 'Akses ditolak. Fitur ini khusus Dosen Pengampu.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      submissionId,
      status, // 'disetujui' | 'perlu_revisi'
      lecturerScore,
      lecturerFeedback,
      lecturerSignature,
      saveAsDefaultLecturerSignature
    } = body;

    if (!submissionId || !status || !['disetujui', 'perlu_revisi'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Parameter submissionId dan status valid (disetujui/perlu_revisi) wajib disertakan.' },
        { status: 400 }
      );
    }

    const { supabaseAdmin } = auth;
    const lecturerId = auth.user.id;

    // 1. Simpan tanda tangan default dosen jika diminta
    if (saveAsDefaultLecturerSignature && lecturerSignature) {
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
    } else {
      // Jika dikembalikan untuk revisi, bersihkan pengesahan sebelumnya (jika ada)
      updatePayload.lecturer_score = null;
      updatePayload.lecturer_signature = null;
      updatePayload.lecturer_signed_at = null;
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
