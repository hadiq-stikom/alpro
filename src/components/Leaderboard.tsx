'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { getBadgeFromScore } from '@/lib/badges';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star } from 'lucide-react';
import { BadgeDisplay } from '@/components/BadgeDisplay';

export function Leaderboard() {
  const [topStudents, setTopStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        setLoading(true);
        
        // Ambil mahasiswa
        const { data: usersData, error: userErr } = await supabase
          .from('users')
          .select('id, full_name, nim')
          .eq('role', 'mahasiswa');
          
        if (userErr) throw userErr;
        
        // Ambil nilai
        const { data: overallData, error: overallErr } = await supabase
          .from('overall_grades')
          .select('*');
          
        if (overallErr) throw overallErr;
        
        // Gabungkan, urutkan, ambil 5 teratas
        const studentsList = (usersData || []) as any[];
        const gradesList = (overallData || []) as any[];
        
        const merged = studentsList.map(student => {
          const grade = gradesList.find(g => g.user_id === student.id);
          const score = grade?.total_avg_score || 0;
          return {
            ...student,
            avg_score: score,
            badge: getBadgeFromScore(score)
          };
        })
        .filter(s => s.avg_score > 0) // Hanya tampilkan yang sudah punya nilai
        .sort((a, b) => b.avg_score - a.avg_score)
        .slice(0, 5); // Ambil Top 5
        
        setTopStudents(merged);
      } catch (error) {
        console.error("Gagal mengambil data leaderboard", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (topStudents.length === 0) {
    return (
      <div className="text-center p-8 bg-card border border-border rounded-3xl text-muted-foreground">
        Belum ada data peringkat untuk saat ini. Yuk jadilah yang pertama!
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-8 justify-center">
        <Trophy className="w-8 h-8 text-yellow-500" />
        <h2 className="text-3xl font-black text-center">Top 5 Mahasiswa Kelas Ini</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
        {topStudents.map((student, index) => {
          // Icon untuk top 3
          let RankIcon = Star;
          let rankColor = "text-slate-400";
          
          if (index === 0) {
            RankIcon = Trophy;
            rankColor = "text-yellow-500";
          } else if (index === 1) {
            RankIcon = Medal;
            rankColor = "text-slate-300"; // Silver
          } else if (index === 2) {
            RankIcon = Award;
            rankColor = "text-amber-700"; // Bronze
          }
          
          return (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-4 md:p-6 rounded-2xl border ${index === 0 ? 'bg-primary/5 border-primary/30 shadow-lg scale-[1.02] z-10 relative' : 'bg-card border-border hover:bg-secondary/50'}`}
            >
              <div className="flex items-center gap-4 md:gap-6">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-lg bg-background border border-border shrink-0 ${rankColor}`}>
                  {index < 3 ? <RankIcon className="w-5 h-5 md:w-6 md:h-6" /> : `#${index + 1}`}
                </div>
                
                <div>
                  <div className="font-bold text-lg md:text-xl truncate max-w-[150px] md:max-w-xs">{student.full_name}</div>
                  <div className="text-xs text-muted-foreground">NIM: {student.nim}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="hidden sm:block">
                  <BadgeDisplay badge={student.badge} size="sm" showLabel={false} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black" style={{ color: student.badge.hexColor }}>
                    {student.avg_score.toFixed(1)}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                    Poin
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
