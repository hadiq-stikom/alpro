import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { getBadgeFromScore } from '@/lib/badges';

// Inisialisasi Supabase Admin Client dengan Service Role Key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: { autoRefreshToken: false, persistSession: false },
  }
);

interface ExamWeights {
  penyerapan_materi: number;
  pemahaman_konsep: number;
  kemampuan_menjelaskan: number;
  implementasi_algoritma: number;
  implementasi_kode: number;
}

interface AspectScores {
  penyerapan_materi: number;
  pemahaman_konsep: number;
  kemampuan_menjelaskan: number;
  implementasi_algoritma: number;
  implementasi_kode: number;
}

interface StudentGradePayload {
  studentId: string;
  aspectScores: AspectScores;
  finalScore: number;
  notes?: string;
}

interface RawStudent {
  id: string;
  full_name: string;
  nim: string | null;
  class_id: string | null;
}

interface RawSubmission {
  id: string;
  user_id: string;
  score: number;
  answers_json: {
    weights?: ExamWeights;
    aspect_scores?: AspectScores;
    notes?: string;
    [key: string]: unknown;
  } | null;
  ai_feedback: string | null;
  submitted_at: string;
}

// Helper untuk verifikasi hak akses Dosen
async function verifyLecturer(request: NextRequest) {
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
    return { authorized: false as const, error: 'Sesi login tidak valid atau telah kedaluwarsa.', status: 401 };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profile, error: profileErr } = await (supabaseAdmin as any)
    .from('users')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (profileErr || profile?.role !== 'dosen') {
    return { authorized: false as const, error: 'Akses ditolak. Fitur ini khusus Dosen Pengampu.', status: 403 };
  }

  return { authorized: true as const, user, profile };
}

// GET: Ambil daftar mahasiswa beserta data nilai UTS / UAS yang sudah tersimpan
export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyLecturer(request);
    if (!authResult.authorized) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { searchParams } = new URL(request.url);
    const examTypeParam = searchParams.get('examType')?.toUpperCase() || 'UTS';
    const examType = examTypeParam === 'UAS' ? 'UAS' : 'UTS';
    const meetingId = examType === 'UTS' ? 8 : 16;

    // 1. Ambil seluruh mahasiswa
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: rawStudents, error: studentErr } = await (supabaseAdmin as any)
      .from('users')
      .select('id, full_name, nim, class_id')
      .eq('role', 'mahasiswa')
      .order('nim', { ascending: true });

    if (studentErr) {
      return NextResponse.json({ error: 'Gagal mengambil data mahasiswa: ' + studentErr.message }, { status: 500 });
    }

    const students = (rawStudents || []) as RawStudent[];

    // 2. Ambil data submission ujian untuk meeting_id terkait (8 atau 16) dengan quiz_type = 'exam'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: rawSubmissions, error: subErr } = await (supabaseAdmin as any)
      .from('quiz_submissions')
      .select('id, user_id, score, answers_json, ai_feedback, submitted_at')
      .eq('meeting_id', meetingId)
      .eq('quiz_type', 'exam');

    if (subErr) {
      return NextResponse.json({ error: 'Gagal mengambil data ujian: ' + subErr.message }, { status: 500 });
    }

    const submissions = (rawSubmissions || []) as RawSubmission[];

    // Map submission berdasarkan user_id
    const subMap = new Map<string, RawSubmission>();
    let detectedWeights: ExamWeights | null = null;

    for (const sub of submissions) {
      subMap.set(sub.user_id, sub);
      if (!detectedWeights && sub.answers_json?.weights) {
        detectedWeights = sub.answers_json.weights;
      }
    }

    // Gabungkan data mahasiswa dengan nilai ujian
    const studentGrades = students.map((st) => {
      const sub = subMap.get(st.id);
      const aspectScores = sub?.answers_json?.aspect_scores || null;
      const notes = sub?.answers_json?.notes || sub?.ai_feedback || '';
      const finalScore = sub?.score !== undefined ? Number(sub.score) : null;
      const badge = finalScore !== null ? getBadgeFromScore(finalScore) : null;

      return {
        id: st.id,
        full_name: st.full_name,
        nim: st.nim,
        class_id: st.class_id,
        submissionId: sub?.id || null,
        isGraded: sub !== undefined,
        aspectScores,
        finalScore,
        badge,
        notes,
        submittedAt: sub?.submitted_at || null,
      };
    });

    return NextResponse.json({
      success: true,
      examType,
      meetingId,
      detectedWeights,
      students: studentGrades,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Terjadi kesalahan server.';
    console.error('[GetExamGrades] Error:', error);
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}

// POST: Simpan atau perbarui nilai ujian (UTS/UAS) untuk satu atau banyak mahasiswa
export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyLecturer(request);
    if (!authResult.authorized) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const body = await request.json();
    const { examType: rawExamType, weights, grades } = body as {
      examType?: string;
      weights?: ExamWeights;
      grades?: StudentGradePayload[];
    };

    const examType = rawExamType === 'UAS' ? 'UAS' : 'UTS';
    const meetingId = examType === 'UTS' ? 8 : 16;
    const quizKey = `${examType.toLowerCase()}-evaluasi`;

    if (!weights || typeof weights !== 'object') {
      return NextResponse.json({ error: 'Bobot penilaian harus disertakan.' }, { status: 400 });
    }

    if (!Array.isArray(grades) || grades.length === 0) {
      return NextResponse.json({ error: 'Daftar nilai mahasiswa harus disertakan.' }, { status: 400 });
    }

    const savedResults = [];

    for (const item of grades) {
      const { studentId, aspectScores, finalScore, notes } = item;

      if (!studentId) continue;

      const parsedScore = Number(finalScore);
      if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 100) {
        return NextResponse.json(
          { error: `Nilai akhir untuk mahasiswa ID ${studentId} tidak valid (0 - 100).` },
          { status: 400 }
        );
      }

      const badge = getBadgeFromScore(parsedScore);

      const answersJson = {
        exam_type: examType,
        meeting_id: meetingId,
        weights: {
          penyerapan_materi: Number(weights.penyerapan_materi || 0),
          pemahaman_konsep: Number(weights.pemahaman_konsep || 0),
          kemampuan_menjelaskan: Number(weights.kemampuan_menjelaskan || 0),
          implementasi_algoritma: Number(weights.implementasi_algoritma || 0),
          implementasi_kode: Number(weights.implementasi_kode || 0),
        },
        aspect_scores: {
          penyerapan_materi: Number(aspectScores?.penyerapan_materi || 0),
          pemahaman_konsep: Number(aspectScores?.pemahaman_konsep || 0),
          kemampuan_menjelaskan: Number(aspectScores?.kemampuan_menjelaskan || 0),
          implementasi_algoritma: Number(aspectScores?.implementasi_algoritma || 0),
          implementasi_kode: Number(aspectScores?.implementasi_kode || 0),
        },
        final_score: parsedScore,
        grade_letter: badge.level,
        grade_category: badge.category,
        notes: notes || '',
        graded_by: authResult.profile?.full_name || 'Dosen Pengampu',
        updated_at: new Date().toISOString(),
      };

      const feedbackText = `[EVALUASI DOSEN - ${examType}] Skor Akhir: ${parsedScore} (Grade: ${badge.level} / ${badge.category}). ${notes ? 'Catatan: ' + notes.trim() : ''}`;

      // Cek apakah sudah ada submission untuk user ini di meeting ini
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: existingSub } = await (supabaseAdmin as any)
        .from('quiz_submissions')
        .select('id')
        .eq('user_id', studentId)
        .eq('meeting_id', meetingId)
        .eq('quiz_type', 'exam')
        .maybeSingle();

      if (existingSub?.id) {
        // Update data lama
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: updErr } = await (supabaseAdmin as any)
          .from('quiz_submissions')
          .update({
            score: parsedScore,
            answers_json: answersJson,
            ai_feedback: feedbackText,
            submitted_at: new Date().toISOString(),
          })
          .eq('id', existingSub.id);

        if (updErr) {
          console.error(`[ExamGrades] Gagal update sub ID ${existingSub.id}:`, updErr);
          throw new Error(`Gagal memperbarui nilai mahasiswa: ${updErr.message}`);
        }
        savedResults.push({ studentId, submissionId: existingSub.id, action: 'updated' });
      } else {
        // Ambil class_id mahasiswa jika ada
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: userData } = await (supabaseAdmin as any)
          .from('users')
          .select('class_id')
          .eq('id', studentId)
          .single();

        // Insert row baru
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: inserted, error: insErr } = await (supabaseAdmin as any)
          .from('quiz_submissions')
          .insert({
            user_id: studentId,
            class_id: userData?.class_id || null,
            meeting_id: meetingId,
            quiz_type: 'exam',
            quiz_key: quizKey,
            score: parsedScore,
            max_score: 100,
            answers_json: answersJson,
            ai_feedback: feedbackText,
            submitted_at: new Date().toISOString(),
          })
          .select('id')
          .single();

        if (insErr) {
          console.error(`[ExamGrades] Gagal insert submission:`, insErr);
          throw new Error(`Gagal menyimpan nilai mahasiswa: ${insErr.message}`);
        }
        savedResults.push({ studentId, submissionId: inserted?.id, action: 'inserted' });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Berhasil menyimpan nilai ${examType} untuk ${savedResults.length} mahasiswa.`,
      examType,
      meetingId,
      results: savedResults,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Terjadi kesalahan server saat menyimpan nilai.';
    console.error('[SaveExamGrades] Error:', error);
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}
