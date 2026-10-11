import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const {
      user_id,
      class_id,
      meeting_id,
      quiz_type,
      quiz_key,
      score,
      time_spent_seconds,
      tab_switches,
      ai_feedback,
      answers_json,
    } = payload;

    if (!user_id || !meeting_id || !quiz_type || !quiz_key) {
      return NextResponse.json(
        { success: false, error: 'Parameter submission wajib tidak lengkap (user_id, meeting_id, quiz_type, quiz_key).' },
        { status: 400 }
      );
    }

    const supabaseAdmin = createServerClient();

    // Verifikasi keberadaan user
    const { data: user, error: userErr } = await (supabaseAdmin
      .from('users' as any) as any)
      .select('id, class_id, role')
      .eq('id', user_id)
      .single();

    if (userErr || !user) {
      console.error('[API submit-assessment] User tidak ditemukan di public.users:', user_id, userErr);
      return NextResponse.json(
        { success: false, error: 'User tidak ditemukan di sistem.' },
        { status: 404 }
      );
    }

    // Gunakan class_id dari user jika payload.class_id kosong
    const effectiveClassId = class_id || (user as any).class_id || null;

    const insertPayload = {
      user_id,
      class_id: effectiveClassId,
      meeting_id: Number(meeting_id),
      quiz_type,
      quiz_key,
      score: Number(score),
      max_score: 100,
      time_spent_seconds: time_spent_seconds != null ? Number(time_spent_seconds) : null,
      tab_switches: tab_switches != null ? Number(tab_switches) : 0,
      ai_feedback: ai_feedback || null,
      answers_json: answers_json || null,
      submitted_at: new Date().toISOString(),
    };

    const { data, error } = await (supabaseAdmin
      .from('quiz_submissions' as any) as any)
      .insert(insertPayload)
      .select('id')
      .single();

    if (error) {
      console.error('[API submit-assessment] Gagal insert submission:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: error.message || 'Database insert error', 
          code: error.code, 
          details: error.details, 
          hint: error.hint 
        },
        { status: 500 }
      );
    }

    const insertedId = (data as any)?.id;
    console.log(`[API submit-assessment] Berhasil simpan ${quiz_key} untuk user ${user_id} (Skor: ${score}) ID: ${insertedId}`);
    return NextResponse.json({ success: true, id: insertedId });

  } catch (err: any) {
    console.error('[API submit-assessment] Exception tak terduga:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Server internal error' },
      { status: 500 }
    );
  }
}
