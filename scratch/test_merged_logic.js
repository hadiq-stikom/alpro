const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    let val = match[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    env[match[1].trim()] = val;
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function testMerged() {
  const GRADABLE_TYPES = ['essay', 'exam', 'lab', 'challenge'];
  const { data: meetingGradesData } = await supabase
    .from('meeting_grades')
    .select('user_id, meeting_id, avg_score');

  const { data: allSubmissionsData } = await supabase
    .from('quiz_submissions')
    .select('id, user_id, meeting_id, score, quiz_type, ai_feedback, submitted_at')
    .order('submitted_at', { ascending: true });

  const userMeetingScores = new Map();
  for (const row of meetingGradesData || []) {
    if (!row.user_id || row.meeting_id === undefined || !row.avg_score || row.avg_score <= 0) continue;
    if (!userMeetingScores.has(row.user_id)) userMeetingScores.set(row.user_id, new Map());
    userMeetingScores.get(row.user_id).set(row.meeting_id, { score: row.avg_score });
  }

  const winningSubmissions = new Map();
  for (const sub of allSubmissionsData || []) {
    if (
      !sub.user_id ||
      sub.meeting_id === undefined ||
      sub.score === undefined ||
      sub.score <= 0 ||
      !GRADABLE_TYPES.includes(sub.quiz_type || '')
    ) continue;

    if (!winningSubmissions.has(sub.user_id)) winningSubmissions.set(sub.user_id, new Map());
    const m = winningSubmissions.get(sub.user_id);
    const cur = m.get(sub.meeting_id);

    const hasIncompleteNote = Boolean(sub.ai_feedback && sub.ai_feedback.includes('Koreksi Proporsionalitas'));
    let answeredCount = undefined;
    if (hasIncompleteNote && sub.ai_feedback) {
      const match = sub.ai_feedback.match(/\((\d+)\/5 terjawab\)/);
      if (match) answeredCount = parseInt(match[1], 10);
    }

    if (!cur || sub.score > cur.score || (sub.score === cur.score && sub.submitted_at > cur.submitted_at)) {
      m.set(sub.meeting_id, {
        score: sub.score,
        submitted_at: sub.submitted_at,
        isIncomplete: hasIncompleteNote,
        answeredCount
      });
    }
  }

  for (const [userId, meetings] of winningSubmissions.entries()) {
    if (!userMeetingScores.has(userId)) userMeetingScores.set(userId, new Map());
    const targetMap = userMeetingScores.get(userId);
    for (const [meetingId, winInfo] of meetings.entries()) {
      const existing = targetMap.get(meetingId);
      const finalScore = existing ? Math.max(existing.score, winInfo.score) : winInfo.score;
      const isIncomplete = winInfo.isIncomplete && (winInfo.score >= finalScore);
      targetMap.set(meetingId, {
        score: finalScore,
        isIncomplete,
        answeredCount: isIncomplete ? winInfo.answeredCount : undefined
      });
    }
  }

  // Check Chelsea:
  const { data: chelsea } = await supabase.from('users').select('id, full_name').ilike('full_name', '%CHELSEA%').single();
  console.log('Chelsea dashboard items:');
  const chelseaMeetings = userMeetingScores.get(chelsea.id);
  for (const [mId, info] of chelseaMeetings.entries()) {
    console.log(`M${mId}: score=${info.score}, isIncomplete=${info.isIncomplete}, answeredCount=${info.answeredCount}`);
  }

  // Check Alvin:
  const { data: alvin } = await supabase.from('users').select('id, full_name').ilike('full_name', '%ALVIN TAUVIQUL%').single();
  console.log('\nAlvin dashboard items:');
  const alvinMeetings = userMeetingScores.get(alvin.id);
  for (const [mId, info] of alvinMeetings.entries()) {
    console.log(`M${mId}: score=${info.score}, isIncomplete=${info.isIncomplete}, answeredCount=${info.answeredCount}`);
  }
}

testMerged();

