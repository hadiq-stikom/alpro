import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    const supabaseAdmin = createServerClient();

    // 1. Ambil mahasiswa
    const { data: usersData, error: userErr } = await (supabaseAdmin
      .from('users' as any) as any)
      .select('id, full_name, nim')
      .eq('role', 'mahasiswa');

    if (userErr) throw userErr;

    // 2. Ambil nilai rata-rata keseluruhan
    const { data: overallData, error: overallErr } = await (supabaseAdmin
      .from('overall_grades' as any) as any)
      .select('user_id, total_avg_score');

    if (overallErr) throw overallErr;

    // 3. Gabungkan, hitung peringkat, ambil Top 5
    const studentsList = (usersData || []) as any[];
    const gradesList = (overallData || []) as any[];

    const merged = studentsList
      .map((student) => {
        const grade = gradesList.find((g) => g.user_id === student.id);
        const score = grade?.total_avg_score || 0;
        return {
          id: student.id,
          full_name: student.full_name,
          nim: student.nim,
          avg_score: Number(score),
        };
      })
      .filter((s) => s.avg_score > 0)
      .sort((a, b) => b.avg_score - a.avg_score)
      .slice(0, 5);

    return NextResponse.json(
      { success: true, data: merged },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error: any) {
    console.error('[API /api/leaderboard] Error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Gagal memuat data leaderboard' },
      { status: 500 }
    );
  }
}
