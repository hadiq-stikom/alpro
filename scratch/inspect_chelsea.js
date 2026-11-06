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

async function inspectChelsea() {
  const { data: user } = await supabase.from('users').select('*').eq('nim', '1126102242').single();
  console.log('User:', user.full_name, user.nim, user.id);

  const { data: subs } = await supabase
    .from('quiz_submissions')
    .select('*')
    .eq('user_id', user.id)
    .order('meeting_id', { ascending: true })
    .order('submitted_at', { ascending: true });

  console.log(`\nTotal Submissions Chelsea: ${subs.length}`);

  for (const s of subs) {
    console.log(`\n--- [ID: ${s.id}] Pertemuan: ${s.meeting_id} | Tipe: ${s.quiz_type} | Key: ${s.quiz_key} | Skor: ${s.score} | Waktu: ${s.submitted_at} ---`);
    console.log('ai_feedback:', s.ai_feedback ? s.ai_feedback.slice(0, 300) : 'null');
    let answers = s.answers_json;
    if (typeof answers === 'string') {
      try { answers = JSON.parse(answers); } catch {}
    }
    console.log('answers_json keys:', answers ? Object.keys(answers) : 'null');
    if (answers) {
      for (const k of Object.keys(answers)) {
        if (!["telemetry", "baseline_wpm", "baseline_backspace_ratio", "ai_feedback", "sampleText", "keystrokes", "backspaces", "wpm", "backspaceRatio", "burstAttempts", "student_answer"].includes(k)) {
          const ansText = typeof answers[k] === 'string' ? answers[k] : JSON.stringify(answers[k]);
          console.log(`  * ${k} (${ansText.length} char): "${ansText.slice(0, 80)}..."`);
        }
      }
    }
  }
}

inspectChelsea();

