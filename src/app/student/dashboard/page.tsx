"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Trophy, Clock, Target, GraduationCap, ChevronRight, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { getBadgeFromScore, BadgeConfig } from "@/lib/badges";
import { BadgeDisplay } from "@/components/BadgeDisplay";
import Link from "next/link";

export default function StudentDashboardPage() {
  const { profile } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [overallGrade, setOverallGrade] = useState<{ total_avg_score: number; overall_grade_letter: string; overall_grade_category: string } | null>(null);
  const [meetingGrades, setMeetingGrades] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalCompleted: 0, totalBadges: 0, totalHours: 0 });

  useEffect(() => {
    async function fetchDashboardData() {
      if (!profile?.id) return;
      
      try {
        setLoading(true);
        // 1. Ambil overall grades
        const { data: overallData } = await supabase
          .from('overall_grades')
          .select('*')
          .eq('user_id', profile.id)
          .single();
          
        if (overallData) setOverallGrade(overallData);
        
        // Ambil nilai rapat
        const { data: meetingGradesData, error: mgError } = await supabase
          .from('meeting_grades')
          .select('*')
          .eq('user_id', profile.id)
          .order('meeting_id', { ascending: true });
          
        if (mgError) throw mgError;
        
        // Deduplikasi meetingGrades berdasarkan meeting_id jika terjadi null class_id glitch
        const uniqueMeetingGrades: any[] = [];
        const seenMeetings = new Set();
        if (meetingGradesData) {
          for (const grade of (meetingGradesData as any[])) {
            if (!seenMeetings.has(grade.meeting_id)) {
              seenMeetings.add(grade.meeting_id);
              uniqueMeetingGrades.push(grade);
            }
          }
        }
        
        setMeetingGrades(uniqueMeetingGrades);
        
        // 3. Ambil statistik submission
        const { data: submissionsData } = await supabase
          .from('quiz_submissions')
          .select('time_spent_seconds, meeting_id')
          .eq('user_id', profile.id);
          
        const submissions = (submissionsData || []) as any[];
        if (submissions.length > 0) {
          const uniqueMeetings = new Set(submissions.map(s => s.meeting_id)).size;
          const totalSeconds = submissions.reduce((acc, curr) => acc + (curr.time_spent_seconds || 0), 0);
          
          setStats({
            totalCompleted: uniqueMeetings,
            totalBadges: uniqueMeetingGrades.length,
            totalHours: Number((totalSeconds / 3600).toFixed(1))
          });
        }
      } catch (error) {
        console.error("Gagal mengambil data dashboard", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDashboardData();
  }, [profile?.id]);

  // Fallback badge jika belum ada nilai
  const currentBadge = getBadgeFromScore(overallGrade?.total_avg_score || 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
              <GraduationCap className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Halo, {profile?.full_name ?? profile?.nim ?? "Mahasiswa"} 👋
              </h1>
              <p className="text-sm text-muted-foreground">
                NIM: {profile?.nim ?? "–"} • Semester Ganjil
              </p>
            </div>
          </div>
          
          {/* Lencana Utama */}
          {!loading && overallGrade && (
            <div className="flex items-center gap-4 bg-card border border-border p-3 rounded-2xl shadow-sm">
              <div className="text-right">
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Capaian Saat Ini</div>
                <div className="text-xl font-black">{overallGrade.total_avg_score.toFixed(1)} / 100</div>
              </div>
              <BadgeDisplay badge={currentBadge} size="md" showLabel={false} />
            </div>
          )}
        </motion.div>

        {/* Statistik Cepat */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: BookOpen, label: "Materi Selesai", value: `${stats.totalCompleted} / 16`, color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
            { icon: Trophy, label: "Lencana Diraih", value: stats.totalBadges.toString(), color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
            { icon: Target, label: "Rata-rata", value: overallGrade ? overallGrade.total_avg_score.toFixed(1) : "—", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
            { icon: Clock, label: "Waktu Belajar", value: `${stats.totalHours} jam`, color: "text-sky-500", bg: "bg-sky-500/10", border: "border-sky-500/20" },
          ].map(({ icon: Icon, label, value, color, bg, border }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className={`rounded-2xl border ${border} ${bg} p-5`}
            >
              <div className={`inline-flex p-2 rounded-lg ${bg} border ${border} mb-3`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <p className="text-2xl font-bold mb-0.5">{loading ? "..." : value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Riwayat Capaian Per Pertemuan */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Lencana & Riwayat Pertemuan</h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : meetingGrades.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meetingGrades.map((mg, idx) => {
                const badge = getBadgeFromScore(mg.avg_score);
                return (
                  <Link href={`/student/meeting/${mg.meeting_id}`} key={`mg-${mg.meeting_id}-${idx}`}>
                    <div className="bg-card hover:bg-secondary/30 border border-border hover:border-primary/50 transition-all rounded-3xl p-6 flex items-center gap-6 cursor-pointer group shadow-sm hover:shadow-md">
                      <div className="shrink-0">
                        <BadgeDisplay badge={badge} size="md" showLabel={false} />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                          Minggu {mg.meeting_id}
                        </div>
                        <div className="font-bold text-lg mb-1">{badge.name}</div>
                        <div className="text-sm">
                          Skor: <span className="font-mono font-bold" style={{ color: badge.hexColor }}>{mg.avg_score}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="bg-card border border-dashed border-border rounded-3xl p-12 text-center flex flex-col items-center justify-center">
              <AlertCircle className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-bold mb-2">Belum Ada Capaian</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Anda belum menyelesaikan kuis atau materi apapun. Silakan kerjakan modul interaktif untuk mulai mengoleksi lencana!
              </p>
              <Link href="/" className="mt-6 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors">
                Mulai Belajar
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
