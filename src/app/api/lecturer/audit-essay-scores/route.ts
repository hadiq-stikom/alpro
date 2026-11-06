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

const NON_QUESTION_KEYS = new Set([
  'telemetry',
  'baseline_wpm',
  'baseline_backspace_ratio',
  'ai_feedback',
  'sampleText',
  'keystrokes',
  'backspaces',
  'wpm',
  'backspaceRatio',
  'burstAttempts',
  'student_answer',
]);

// Helper hitung skor adil per submission
function calculateFairEssayScore(sub: any): {
  answeredCount: number;
  totalQuestions: number;
  extractedScores: number[];
  fairScore: number;
  isAnomaly: boolean;
} {
  const TOTAL_QUESTIONS = 5;

  let parsedAnswers: Record<string, any> = {};
  if (typeof sub.answers_json === 'string') {
    try {
      parsedAnswers = JSON.parse(sub.answers_json);
    } catch {
      parsedAnswers = {};
    }
  } else if (typeof sub.answers_json === 'object' && sub.answers_json !== null) {
    parsedAnswers = sub.answers_json;
  }

  // Cari butir soal dalam answers_json
  const questionKeys = Object.keys(parsedAnswers).filter(k => !NON_QUESTION_KEYS.has(k));
  
  // Ekstrak skor butir soal dari ai_feedback ("Soal #1 (Skor 95): ...")
  const extractedScores: number[] = [];
  const feedbackStr = sub.ai_feedback || '';
  const regex = /Soal\s*#?(\d+)(?:\s*\((?:Skor\s*)?(\d+)\))?:/gi;
  let match;
  while ((match = regex.exec(feedbackStr)) !== null) {
    if (match[2] !== undefined) {
      extractedScores.push(parseInt(match[2], 10));
    }
  }

  // Hitung jumlah butir soal yang benar-benar dijawab mahasiswa (bukan kosong / bukan pesan default)
  let answeredCount = 0;
  for (const k of questionKeys) {
    const val = parsedAnswers[k];
    const text = typeof val === 'string' ? val.trim() : '';
    if (text.length > 0 && !text.includes('Tidak dijawab')) {
      answeredCount++;
    }
  }

  // Jika di answers_json tidak ada format terpisah, gunakan jumlah skor yang berhasil diekstrak
  if (answeredCount === 0 && extractedScores.length > 0) {
    answeredCount = extractedScores.filter(s => s > 0).length;
  }

  // Jika extractedScores ada: jumlahkan skor dan bagi rata dengan TOTAL_QUESTIONS (5)
  let rawFair = 0;
  if (extractedScores.length > 0) {
    const sum = extractedScores.reduce((acc, curr) => acc + curr, 0);
    rawFair = Math.round(sum / TOTAL_QUESTIONS);
  } else if (answeredCount > 0 && sub.score > 0) {
    // Estimasi proporsional jika teks ulasan tidak memiliki format Skor:
    // (scoreLama * answeredCount) / 5
    rawFair = Math.round((sub.score * answeredCount) / TOTAL_QUESTIONS);
  }

  const penalty = (sub.tab_switches || 0) * 5;
  const fairScore = Math.max(0, rawFair - penalty);

  // Anomali terdeteksi jika mahasiswa menjawab kurang dari 5 soal TAPI mendapat nilai > fairScore
  const isAnomaly = answeredCount < TOTAL_QUESTIONS && sub.score > fairScore;

  return {
    answeredCount,
    totalQuestions: TOTAL_QUESTIONS,
    extractedScores,
    fairScore,
    isAnomaly
  };
}

// 1. GET: Audit seluruh submission esai yang nilainya terinflasi
export async function GET(request: NextRequest) {
  try {
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

    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) {
      return NextResponse.json({ error: 'Sesi login tidak valid' }, { status: 401 });
    }

    // Role check
    const { data: profile } = await (supabaseAdmin.from('users' as any) as any)
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'dosen') {
      return NextResponse.json({ error: 'Akses khusus Dosen' }, { status: 403 });
    }

    // Ambil data users untuk nama & NIM
    const { data: users } = await (supabaseAdmin.from('users' as any) as any)
      .select('id, full_name, nim');
    const userMap = new Map<string, { full_name: string; nim: string }>(
      (users || []).map((u: any) => [u.id, { full_name: u.full_name || 'Mahasiswa', nim: u.nim || '-' }])
    );

    // Ambil semua quiz_submissions esai
    const { data: subs, error: subErr } = await (supabaseAdmin.from('quiz_submissions' as any) as any)
      .select('id, user_id, class_id, meeting_id, quiz_type, quiz_key, score, tab_switches, time_spent_seconds, ai_feedback, answers_json, submitted_at')
      .in('quiz_type', ['essay', 'exam'])
      .order('submitted_at', { ascending: false });

    if (subErr) {
      throw subErr;
    }

    const auditResults: any[] = [];
    let totalAnomalies = 0;

    for (const sub of (subs || [])) {
      const u = userMap.get(sub.user_id) || { full_name: 'Mahasiswa', nim: '-' };
      const calc = calculateFairEssayScore(sub);

      if (calc.isAnomaly) {
        totalAnomalies++;
      }

      auditResults.push({
        id: sub.id,
        userId: sub.user_id,
        studentName: u.full_name,
        nim: u.nim,
        meetingId: sub.meeting_id,
        quizKey: sub.quiz_key,
        currentScore: sub.score,
        fairScore: calc.fairScore,
        answeredCount: calc.answeredCount,
        totalQuestions: calc.totalQuestions,
        extractedScores: calc.extractedScores,
        isAnomaly: calc.isAnomaly,
        scoreDifference: sub.score - calc.fairScore,
        submittedAt: sub.submitted_at
      });
    }

    return NextResponse.json({
      success: true,
      totalSubmissions: subs?.length || 0,
      totalAnomalies,
      anomalies: auditResults.filter(r => r.isAnomaly),
      allSubmissions: auditResults
    });

  } catch (err: any) {
    console.error('[API audit-essay-scores GET] Error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

// 2. POST: Eksekusi rekalkulasi skor untuk submission anomali
export async function POST(request: NextRequest) {
  try {
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

    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) {
      return NextResponse.json({ error: 'Sesi login tidak valid' }, { status: 401 });
    }

    const { data: profile } = await (supabaseAdmin.from('users' as any) as any)
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'dosen') {
      return NextResponse.json({ error: 'Akses khusus Dosen' }, { status: 403 });
    }

    const body = await request.json();
    const { submissionIds, dryRun = false } = body;

    // Ambil submission yang ditargetkan
    let query = (supabaseAdmin.from('quiz_submissions' as any) as any)
      .select('id, user_id, meeting_id, score, tab_switches, ai_feedback, answers_json')
      .in('quiz_type', ['essay', 'exam']);

    if (Array.isArray(submissionIds) && submissionIds.length > 0) {
      query = query.in('id', submissionIds);
    }

    const { data: subs, error: fetchErr } = await query;
    if (fetchErr) throw fetchErr;

    const updates: any[] = [];

    for (const sub of (subs || [])) {
      const calc = calculateFairEssayScore(sub);
      if (calc.isAnomaly) {
        updates.push({
          id: sub.id,
          oldScore: sub.score,
          newScore: calc.fairScore,
          answeredCount: calc.answeredCount,
          note: `[Koreksi Proporsionalitas: Skor disesuaikan terhadap total 5 butir soal (${calc.answeredCount}/5 terjawab). Skor lama: ${sub.score} -> Skor baru: ${calc.fairScore}]`
        });
      }
    }

    if (!dryRun) {
      for (const item of updates) {
        // Ambil submission lama untuk append note
        const subOld = subs.find((s: any) => s.id === item.id);
        const updatedFeedback = subOld?.ai_feedback 
          ? `${subOld.ai_feedback}\n\n${item.note}`
          : item.note;

        await (supabaseAdmin.from('quiz_submissions' as any) as any)
          .update({
            score: item.newScore,
            ai_feedback: updatedFeedback
          })
          .eq('id', item.id);
      }
    }

    return NextResponse.json({
      success: true,
      dryRun,
      totalUpdated: updates.length,
      updates
    });

  } catch (err: any) {
    console.error('[API audit-essay-scores POST] Error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

