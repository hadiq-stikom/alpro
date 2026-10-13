import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const moduleId = searchParams.get('moduleId');

    if (!userId) {
      return NextResponse.json({ success: false, error: 'Parameter userId wajib disertakan.' }, { status: 400 });
    }

    const supabaseAdmin = createServerClient();

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

    // 2. Ambil data submission jika moduleId disertakan
    let submission: any = null;
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
    const body = await req.json();
    const {
      userId,
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

    if (!userId || !moduleId) {
      return NextResponse.json(
        { success: false, error: 'Parameter userId dan moduleId wajib disertakan.' },
        { status: 400 }
      );
    }

    const supabaseAdmin = createServerClient();

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
      class_id: classId || null,
      module_id: Number(moduleId),
      student_name: studentName || null,
      student_nim: studentNim || null,
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
    const { data: existing, error: checkErr } = await (supabaseAdmin
      .from('praktikum_submissions' as any) as any)
      .select('id, status, lecturer_score, lecturer_signature, lecturer_feedback')
      .eq('user_id', userId)
      .eq('module_id', Number(moduleId))
      .maybeSingle();

    let resultData: any = null;

    if (existing) {
      // Pertahankan skor & feedback dosen jika sudah disetujui sebelumnya
      const updatePayload: any = {
        ...payload,
      };

      // Jika sebelumnya disetujui, dan mahasiswa mengajukan ulang, status beralih ke diajukan
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
