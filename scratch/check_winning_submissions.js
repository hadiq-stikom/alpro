const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    let val = match[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[match[1].trim()] = val;
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const NON_QUESTION_KEYS = new Set([
  "telemetry", "baseline_wpm", "baseline_backspace_ratio", "ai_feedback",
  "sampleText", "keystrokes", "backspaces", "wpm", "backspaceRatio",
  "burstAttempts", "student_answer"
]);

function countAnsweredQuestions(sub) {
  let parsed = {};
  if (typeof sub.answers_json === 'string') {
    try { parsed = JSON.parse(sub.answers_json); } catch {}
  } else if (typeof sub.answers_json === 'object' && sub.answers_json !== null) {
    parsed = sub.answers_json;
  }
  const qKeys = Object.keys(parsed).filter(k => !NON_QUESTION_KEYS.has(k));
  let countInJson = 0;
  for (const k of qKeys) {
    const val = parsed[k];
    const text = typeof val === 'string' ? val.trim() : '';
    if (text.length > 0 && !text.includes('Tidak dijawab')) {
      countInJson++;
    }
  }

  const extractedScores = [];
  const feedbackStr = sub.ai_feedback || '';
  const regex = /Soal\s*#?(\d+)(?:\s*\((?:Skor\s*)?(\d+)\))?:/gi;
  let match;
  while ((match = regex.exec(feedbackStr)) !== null) {
    if (match[2] !== undefined) {
      extractedScores.push(parseInt(match[2], 10));
    }
  }

  return Math.min(5, Math.max(countInJson, extractedScores.length));
}

async function run() {
  const { data: users } = await supabase.from('users').select('id, full_name, nim');
  const userMap = new Map((users || []).map(u => [u.id, u]));

  const { data: subs } = await supabase
    .from('quiz_submissions')
    .select('id, user_id, meeting_id, score, quiz_type, ai_feedback, answers_json, submitted_at')
    .in('quiz_type', ['essay', 'exam'])
    .order('submitted_at', { ascending: true });

  // Cari winning submission per (user_id, meeting_id)
  const winningMap = new Map();

  for (const s of subs) {
    const key = `${s.user_id}_${s.meeting_id}`;
    const cur = winningMap.get(key);
    if (!cur || s.score > cur.score || (s.score === cur.score && s.submitted_at > cur.submitted_at)) {
      winningMap.set(key, s);
    }
  }

  console.log(`=== ANALISIS WINNING SUBMISSIONS (YANG MENENTUKAN NILAI RAPOR) ===`);
  console.log(`Total Pasangan (Mahasiswa, Pertemuan): ${winningMap.size}`);

  const actuallyIncomplete = [];
  const actuallyComplete = [];

  for (const [key, winningSub] of winningMap.entries()) {
    const answered = countAnsweredQuestions(winningSub);
    const u = userMap.get(winningSub.user_id) || { full_name: 'Mahasiswa', nim: '-' };

    const item = {
      name: u.full_name,
      nim: u.nim,
      meetingId: winningSub.meeting_id,
      score: winningSub.score,
      answered,
      submittedAt: winningSub.submitted_at
    };

    if (answered < 5) {
      actuallyIncomplete.push(item);
    } else {
      actuallyComplete.push(item);
    }
  }

  console.log(`Winning Submissions LENGKAP (5 Soal): ${actuallyComplete.length}`);
  console.log(`Winning Submissions TIDAK LENGKAP (< 5 Soal): ${actuallyIncomplete.length}`);

  // Cek Chelsea specifically
  console.log(`\n=== STATUS WINNING SUBMISSION CHELSEA FRANSISCA LAURENT ===`);
  const chelseaItems = [...winningMap.values()]
    .filter(s => {
      const u = userMap.get(s.user_id);
      return u && u.nim === '1126102242';
    })
    .sort((a,b) => a.meeting_id - b.meeting_id);

  chelseaItems.forEach(s => {
    const answered = countAnsweredQuestions(s);
    console.log(`M${s.meeting_id}: Skor = ${s.score} | Butir Soal Terjawab = ${answered}/5 | Tgl: ${s.submitted_at.slice(0, 16)}`);
  });

  console.log(`\n=== DAFTAR SEMUA WINNING SUBMISSION YANG BENAR-BENAR TIDAK LENGKAP (< 5 SOAL) ===`);
  actuallyIncomplete.sort((a, b) => a.meetingId - b.meetingId || a.nim.localeCompare(b.nim));
  actuallyIncomplete.forEach((item, idx) => {
    console.log(`${idx+1}. [P${item.meetingId}] ${item.name} (${item.nim}) -> Skor: ${item.score} | Terjawab: ${item.answered}/5 | Tgl: ${item.submittedAt.slice(0, 16)}`);
  });
}

run();

