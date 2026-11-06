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
    const sum = extractedScores.reduce((acc, curr) => acc + curr, 0);
    rawFair = Math.round(sum / 5);
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

async function execute() {
  const { data: users } = await supabase.from('users').select('id, full_name, nim');
  const userMap = new Map((users || []).map(u => [u.id, u]));

  const { data: subs, error } = await supabase
    .from('quiz_submissions')
    .select('id, user_id, meeting_id, quiz_type, quiz_key, score, tab_switches, ai_feedback, answers_json, submitted_at')
    .in('quiz_type', ['essay', 'exam']);

  if (error) {
    console.error('Error fetching submissions:', error);
    return;
  }

  const toUpdate = [];

  for (const s of subs) {
    const d = parseSubmissionDetails(s);
    if (d.answeredCount < 5 && s.score > d.fairScore) {
      const u = userMap.get(s.user_id) || { full_name: 'Unknown', nim: '-' };
      toUpdate.push({
        id: s.id,
        user: `${u.full_name} (${u.nim})`,
        meetingId: s.meeting_id,
        oldScore: s.score,
        newScore: d.fairScore,
        answeredCount: d.answeredCount,
        note: `[Koreksi Proporsionalitas: Skor disesuaikan terhadap total 5 butir soal (${d.answeredCount}/5 terjawab). Skor lama: ${s.score} -> Skor baru: ${d.fairScore}]`,
        feedback: s.ai_feedback
      });
    }
  }

  console.log(`Menemukan ${toUpdate.length} submission yang akan diupdate ke skor adil...`);

  let successCount = 0;
  for (const item of toUpdate) {
    const updatedFeedback = item.feedback 
      ? `${item.feedback}\n\n${item.note}`
      : item.note;

    const { error: updateErr } = await supabase
      .from('quiz_submissions')
      .update({
        score: item.newScore,
        ai_feedback: updatedFeedback
      })
      .eq('id', item.id);

    if (updateErr) {
      console.error(`Gagal update submission ${item.id}:`, updateErr);
    } else {
      successCount++;
    }
  }

  console.log(`BERHASIL MEMPERBARUI ${successCount} dari ${toUpdate.length} SUBMISSION DI DATABASE!`);
}

execute();

