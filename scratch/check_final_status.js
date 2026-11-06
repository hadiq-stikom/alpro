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

function parseSubmissionDetails(sub) {
  let parsed = {};
  if (typeof sub.answers_json === 'string') {
    try { parsed = JSON.parse(sub.answers_json); } catch {}
  } else if (typeof sub.answers_json === 'object' && sub.answers_json !== null) {
    parsed = sub.answers_json;
  }

  const questionKeys = Object.keys(parsed).filter(k => !NON_QUESTION_KEYS.has(k));
  let answeredInJson = 0;
  for (const k of questionKeys) {
    const val = parsed[k];
    const text = typeof val === 'string' ? val.trim() : '';
    if (text.length > 0 && !text.includes('Tidak dijawab')) {
      answeredInJson++;
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

  const answeredCount = Math.min(5, Math.max(answeredInJson, extractedScores.length));

  let rawFair = 0;
  if (extractedScores.length > 0) {
    rawFair = Math.round(extractedScores.reduce((acc, curr) => acc + curr, 0) / 5);
  } else if (answeredCount > 0 && sub.score > 0) {
    rawFair = Math.round((sub.score * answeredCount) / 5);
  }

  const penalty = (sub.tab_switches || 0) * 5;
  const fairScore = Math.max(0, rawFair - penalty);

  return {
    answeredCount,
    extractedScores,
    fairScore
  };
}

async function run() {
  const { data: users } = await supabase.from('users').select('id, full_name, nim');
  const userMap = new Map((users || []).map(u => [u.id, u]));

  const { data: subs } = await supabase
    .from('quiz_submissions')
    .select('id, user_id, meeting_id, quiz_type, quiz_key, score, tab_switches, time_spent_seconds, ai_feedback, answers_json, submitted_at')
    .in('quiz_type', ['essay', 'exam'])
    .order('submitted_at', { ascending: true });

  const groupMap = new Map();
  for (const s of subs) {
    const key = `${s.user_id}_${s.meeting_id}`;
    if (!groupMap.has(key)) {
      groupMap.set(key, []);
    }
    groupMap.get(key).push(s);
  }

  const neverCompleted = []; // Tidak pernah selesaikan 5 soal di seluruh percobaannya
  const completedEarlierButLatestIncomplete = []; // Pernah 5 soal, tapi percobaan terakhirnya < 5 soal

  for (const [key, attemptList] of groupMap.entries()) {
    const latestSub = attemptList[attemptList.length - 1];
    const latestDetails = parseSubmissionDetails(latestSub);
    const u = userMap.get(latestSub.user_id) || { full_name: 'Mahasiswa', nim: '-' };

    if (latestDetails.answeredCount < 5) {
      // Periksa apakah pernah ada attempt yang answeredCount === 5
      const completeAttempt = attemptList.find(a => parseSubmissionDetails(a).answeredCount === 5);

      const item = {
        name: u.full_name,
        nim: u.nim,
        meetingId: latestSub.meeting_id,
        latestScore: latestSub.score,
        latestAnswered: latestDetails.answeredCount,
        latestFair: latestDetails.fairScore,
        latestSubmittedAt: latestSub.submitted_at,
        totalAttempts: attemptList.length,
        hasPriorComplete: !!completeAttempt,
        priorCompleteScore: completeAttempt ? completeAttempt.score : null,
        attemptHistory: attemptList.map((a, i) => {
          const d = parseSubmissionDetails(a);
          return `#${i+1} (${d.answeredCount}/5 soal, skor ${a.score})`;
        }).join(' -> ')
      };

      if (completeAttempt) {
        completedEarlierButLatestIncomplete.push(item);
      } else {
        neverCompleted.push(item);
      }
    }
  }

  console.log(`=== KATEGORI A: SAMA SEKALI BELUM PERNAH MENJAWAB LENGKAP (5 SOAL) ===`);
  console.log(`Jumlah Pertemuan: ${neverCompleted.length}`);
  neverCompleted.sort((a,b) => a.meetingId - b.meetingId || a.nim.localeCompare(b.nim));
  neverCompleted.forEach((item, idx) => {
    console.log(`${idx+1}. [P${item.meetingId}] ${item.name} (${item.nim})`);
    console.log(`   - Percobaan Terakhir: ${item.latestAnswered}/5 soal terjawab (Skor di DB: ${item.latestScore}, Skor Adil: ${item.latestFair})`);
    console.log(`   - Total Percobaan   : ${item.totalAttempts}x [${item.attemptHistory}]`);
    console.log(`   - Tanggal Submit    : ${item.latestSubmittedAt.slice(0, 16)}`);
    console.log(``);
  });

  console.log(`\n=== KATEGORI B: PERNAH 5 SOAL DI AWAL, TAPI PERCOBAAN TERAKHIRNYA TIDAK PENUH ===`);
  console.log(`Jumlah Pertemuan: ${completedEarlierButLatestIncomplete.length}`);
  completedEarlierButLatestIncomplete.sort((a,b) => a.meetingId - b.meetingId || a.nim.localeCompare(b.nim));
  completedEarlierButLatestIncomplete.forEach((item, idx) => {
    console.log(`${idx+1}. [P${item.meetingId}] ${item.name} (${item.nim})`);
    console.log(`   - Percobaan Terakhir: ${item.latestAnswered}/5 soal (Skor di DB: ${item.latestScore}, Skor Adil: ${item.latestFair})`);
    console.log(`   - Skor Sah 5 Soal   : ${item.priorCompleteScore} (pada percobaan sebelumnya)`);
    console.log(`   - Riwayat Lengkap   : ${item.attemptHistory}`);
    console.log(``);
  });
}

run();

