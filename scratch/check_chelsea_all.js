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

async function checkChelseaAll() {
  const { data: user } = await supabase.from('users').select('*').eq('nim', '1126102242').single();
  
  const { data: subs } = await supabase
    .from('quiz_submissions')
    .select('id, meeting_id, quiz_type, quiz_key, score, ai_feedback, answers_json, submitted_at')
    .eq('user_id', user.id)
    .in('quiz_type', ['essay', 'exam'])
    .order('meeting_id', { ascending: true })
    .order('submitted_at', { ascending: true });

  const byMeeting = {};
  for (const s of subs) {
    if (!byMeeting[s.meeting_id]) byMeeting[s.meeting_id] = [];
    let parsed = {};
    if (typeof s.answers_json === 'string') {
      try { parsed = JSON.parse(s.answers_json); } catch {}
    } else if (typeof s.answers_json === 'object' && s.answers_json !== null) {
      parsed = s.answers_json;
    }
    const qKeys = Object.keys(parsed).filter(k => !NON_QUESTION_KEYS.has(k));
    byMeeting[s.meeting_id].push({
      id: s.id,
      score: s.score,
      qCount: qKeys.length,
      qKeys,
      feedback: (s.ai_feedback || '').slice(0, 100),
      submittedAt: s.submitted_at
    });
  }

  for (const mid of Object.keys(byMeeting).sort((a,b)=>a-b)) {
    console.log(`\n================== PERTEMUAN ${mid} ==================`);
    byMeeting[mid].forEach((item, idx) => {
      console.log(`[Percobaan #${idx+1}] ID: ${item.id}`);
      console.log(`  - Soal dijawab: ${item.qCount}/5 (${item.qKeys.join(', ')})`);
      console.log(`  - Skor di DB  : ${item.score}`);
      console.log(`  - Feedback    : ${item.feedback}...`);
      console.log(`  - Waktu       : ${item.submittedAt}`);
    });
  }
}

checkChelseaAll();

