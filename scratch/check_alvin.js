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

async function checkAlvin() {
  const { data: user } = await supabase.from('users').select('*').eq('nim', '1126102264').single();
  console.log('User:', user.full_name, user.nim, user.id);

  const { data: mg } = await supabase
    .from('meeting_grades')
    .select('*')
    .eq('user_id', user.id)
    .order('meeting_id', { ascending: true });

  console.log('\n=== MEETING GRADES DARI DATABASE (VIEW) ===');
  console.log(mg);

  const avg = mg.reduce((acc, curr) => acc + curr.avg_score, 0) / mg.length;
  console.log('\nRerata Baru:', avg.toFixed(1));
}

checkAlvin();
