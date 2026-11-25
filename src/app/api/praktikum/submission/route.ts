import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthenticatedSessionUser } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthenticatedSessionUser(req);
    if (!auth) {
      return NextResponse.json(
        { success: false, error: 'Sesi login tidak ditemukan atau telah kedaluwarsa. Harap login kembali.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const requestedUserId = searchParams.get('userId') || auth.user.id;
    const moduleId = searchParams.get('moduleId');

    // Isolasi data ketat: Mahasiswa hanya boleh mengakses datanya sendiri; hanya Dosen yang dapat melihat milik mahasiswa lain
    if (requestedUserId !== auth.user.id && auth.profile.role !== 'dosen') {
      return NextResponse.json(
        { success: false, error: 'Akses ditolak: Anda hanya dapat melihat laporan praktikum milik Anda sendiri.' },
        { status: 403 }
      );
    }

    const userId = requestedUserId;
    const { supabaseAdmin } = auth;

    // 1. Ambil stored_signature dari profil user
    let storedSignature: string | null = null;
    try {
      const { data: userRow } = await (supabaseAdmin
        .from('users' as any) as any)
        .select('stored_signature')
        .eq('id', userId)
        .single();
      if (userRow?.stored_signature) {
        storedSignature = userRow.stored_signature;
      }
    } catch (uErr) {
      console.warn('[praktikum/submission GET] Gagal membaca user.stored_signature:', uErr);
    }

    // 2. Ambil data submission jika moduleId disertakan, atau seluruh submissions user jika tidak ada moduleId
    let submission: any = null;
    let submissions: any[] = [];

    if (moduleId) {
      try {
        const { data: subData, error: subErr } = await (supabaseAdmin
          .from('praktikum_submissions' as any) as any)
          .select('*')
          .eq('user_id', userId)
          .eq('module_id', parseInt(moduleId, 10))
          .maybeSingle();

        if (!subErr && subData) {
          submission = subData;
        }
      } catch (subErr) {
        console.warn('[praktikum/submission GET] Tabel praktikum_submissions mungkin belum siap:', subErr);
      }
    } else {
      try {
        const { data: allSubs, error: allErr } = await (supabaseAdmin
          .from('praktikum_submissions' as any) as any)
          .select('id, module_id, status, lecturer_score, lecturer_feedback, lecturer_signed_at, updated_at, created_at')
          .eq('user_id', userId)
          .order('module_id', { ascending: true });

        if (!allErr && allSubs) {
          submissions = allSubs;
        }
      } catch (allErr) {
        console.warn('[praktikum/submission GET] Gagal mengambil list submissions:', allErr);
      }
    }

    // 3. Cek apakah user sudah memiliki baseline obrolan pra-ujian
    let hasBaseline = false;
    let latestBaseline: any = null;
    try {
      const { data: warmupRows, error: warmupErr } = await (supabaseAdmin
        .from('quiz_submissions' as any) as any)
        .select('quiz_key, answers_json, submitted_at')
        .eq('user_id', userId)
        .like('quiz_key', '%warmup%')
        .order('submitted_at', { ascending: false })
        .limit(1);

      if (!warmupErr && warmupRows && warmupRows.length > 0) {
        hasBaseline = true;
        latestBaseline = warmupRows[0].answers_json;
      }
    } catch (bErr) {
      console.warn('[praktikum/submission GET] Gagal mengecek baseline:', bErr);
    }

    return NextResponse.json({
      success: true,
      submission,
      submissions,
      storedSignature,
      hasBaseline,
      latestBaseline
    });
  } catch (error: any) {
    console.error('Error in GET /api/praktikum/submission:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthenticatedSessionUser(req);
    if (!auth) {
      return NextResponse.json(
        { success: false, error: 'Sesi login tidak ditemukan atau telah kedaluwarsa. Harap login kembali.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      userId: requestedUserId,
      classId,
      moduleId,
      studentName,
      studentNim,
      studentClass,
      labDate,
      observations,
      analisisAnswers,
      kesimpulanText,
      telemetry,
      aiEvaluation,
      studentSignature,
      action, // 'draft' | 'diajukan'
      saveSignatureToProfile
    } = body;

    if (!moduleId) {
      return NextResponse.json(
        { success: false, error: 'Parameter moduleId wajib disertakan.' },
        { status: 400 }
      );
    }

    // Tolak jika klien mengirim userId milik orang lain
    if (requestedUserId && requestedUserId !== auth.user.id) {
      return NextResponse.json(
        { success: false, error: 'Akses ditolak: Anda hanya dapat menyimpan laporan praktikum milik akun Anda sendiri.' },
        { status: 403 }
      );
    }

    // Gunakan selalu ID terverifikasi dari sesi cookie
    const userId = auth.user.id;
    const { supabaseAdmin } = auth;

    // 1. Jika opsi simpan tanda tangan ke profil aktif
    if (saveSignatureToProfile && studentSignature) {
      try {
        await (supabaseAdmin
          .from('users' as any) as any)
          .update({ stored_signature: studentSignature })
          .eq('id', userId);
        console.log(`[praktikum/submission] Stored signature berhasil disimpan ke profil user ${userId}`);
      } catch (sigErr) {
        console.warn('[praktikum/submission] Gagal menyimpan stored_signature ke users:', sigErr);
      }
    }

    // 2. Tentukan status baru
    const nextStatus = action === 'diajukan' ? 'diajukan' : 'draft';
    const signedAt = studentSignature ? new Date().toISOString() : null;

    const payload = {
      user_id: userId,
      class_id: classId || auth.profile.class_id || null,
      module_id: Number(moduleId),
      student_name: studentName || auth.profile.full_name || null,
      student_nim: studentNim || auth.profile.nim || null,
      student_class: studentClass || null,
      lab_date: labDate || null,
      observations: observations || [],
      analisis_answers: analisisAnswers || [],
      kesimpulan_text: kesimpulanText || '',
      telemetry: telemetry || {},
      ai_evaluation: aiEvaluation || {},
      student_signature: studentSignature || null,
      student_signed_at: signedAt,
      status: nextStatus,
      updated_at: new Date().toISOString()
    };

    // 3. Cek apakah record sudah ada
    const { data: existing } = await (supabaseAdmin
      .from('praktikum_submissions' as any) as any)
      .select('*')
      .eq('user_id', userId)
      .eq('module_id', Number(moduleId))
      .maybeSingle();

    let resultData: any = null;

    if (existing) {
      // Jangan timpa laporan resmi yang sudah disahkan dosen saat autosave / simpan draf
      if (existing.status === 'disetujui' && action !== 'diajukan') {
        return NextResponse.json({
          success: true,
          data: existing,
          message: 'Laporan praktikum telah disahkan resmi dan terkunci dari perubahan draf.'
        });
      }

      // Pertahankan status 'disetujui', 'diajukan', maupun 'perlu_revisi' saat hanya menyimpan draf!
      // Status baru berubah ke 'diajukan' hanya jika mahasiswa menekan ajukan / ajukan ulang.
      const effectiveStatus = action === 'diajukan'
        ? 'diajukan'
        : (existing.status === 'disetujui' || existing.status === 'diajukan' || existing.status === 'perlu_revisi'
            ? existing.status
            : 'draft');

      const updatePayload: any = {
        ...payload,
        status: effectiveStatus,
      };

      const { data: updated, error: updateErr } = await (supabaseAdmin
        .from('praktikum_submissions' as any) as any)
        .update(updatePayload)
        .eq('id', existing.id)
        .select('*')
        .single();

      if (updateErr) throw updateErr;
      resultData = updated;
    } else {
      const { data: inserted, error: insertErr } = await (supabaseAdmin
        .from('praktikum_submissions' as any) as any)
        .insert({
          ...payload,
          created_at: new Date().toISOString()
        })
        .select('*')
        .single();

      if (insertErr) throw insertErr;
      resultData = inserted;
    }

    return NextResponse.json({
      success: true,
      data: resultData,
      message: nextStatus === 'diajukan' 
        ? 'Laporan praktikum berhasil diajukan untuk konsultasi dan pengesahan Dosen.'
        : 'Draf laporan praktikum berhasil disimpan di sistem.'
    });

  } catch (error: any) {
    console.error('Error in POST /api/praktikum/submission:', error);
    return NextResponse.json({ 
      success: false, 
      error: error?.message || 'Gagal menyimpan pengajuan praktikum ke basis data.' 
    }, { status: 500 });
  }
}
