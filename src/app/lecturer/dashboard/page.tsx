"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, BarChart3, Award, TrendingUp, BookOpen, Search, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { getBadgeFromScore } from "@/lib/badges";
import { BadgeDisplay } from "@/components/BadgeDisplay";
import Link from "next/link";

export default function LecturerDashboardPage() {
  const { profile } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);
  const [stats, setStats] = useState({ 
    totalStudents: 0, 
    classAverage: 0, 
    goldBadges: 0, 
    submissionsToday: 0 
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchLecturerData() {
      try {
        setLoading(true);
        
        // 1. Ambil daftar mahasiswa
        const { data: usersData, error: userErr } = await supabase
          .from('users')
          .select('*')
          .eq('role', 'mahasiswa');
          
        if (userErr) throw userErr;
        
        // 2. Ambil nilai rata-rata keseluruhan semua mahasiswa
        const { data: overallData, error: overallErr } = await supabase
          .from('overall_grades')
          .select('*');
          
        if (overallErr) throw overallErr;
        
        // 3. Ambil jumlah submission hari ini (sejak tengah malam)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const { count: submissionCount } = await supabase
          .from('quiz_submissions')
          .select('*', { count: 'exact', head: true })
          .gte('submitted_at', today.toISOString());

        // Gabungkan data user dengan nilainya
        const studentsList = (usersData || []) as any[];
        const gradesList = (overallData || []) as any[];
        
        const mergedStudents = studentsList.map(student => {
          const grade = gradesList.find(g => g.user_id === student.id);
          return {
            ...student,
            avg_score: grade?.total_avg_score || 0,
            badge: getBadgeFromScore(grade?.total_avg_score || 0)
          };
        }).sort((a, b) => b.avg_score - a.avg_score);
        
        setStudents(mergedStudents);
        
        // Kalkulasi Statistik Kelas
        const totalScore = mergedStudents.reduce((acc, curr) => acc + curr.avg_score, 0);
        const avg = mergedStudents.length > 0 ? (totalScore / mergedStudents.length) : 0;
        const golds = mergedStudents.filter(s => s.badge.level === 'A').length;
        
        setStats({
          totalStudents: usersData?.length || 0,
          classAverage: Number(avg.toFixed(1)),
          goldBadges: golds,
          submissionsToday: submissionCount || 0
        });

      } catch (error) {
        console.error("Gagal mengambil data dosen", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchLecturerData();
  }, []);

  const filteredStudents = students.filter(s => 
    s.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (s.nim && s.nim.includes(searchQuery))
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/20">
              <BookOpen className="h-7 w-7 text-violet-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Selamat datang, {profile?.full_name ?? "Dosen"} 👋
              </h1>
              <p className="text-sm text-muted-foreground">
                Dashboard Dosen — TI-101 Algoritma &amp; Pemrograman
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Users, label: "Total Mahasiswa", value: loading ? "..." : stats.totalStudents, color: "text-violet-500", bg: "bg-violet-500/10", border: "border-violet-500/20" },
            { icon: BarChart3, label: "Rata-Rata Kelas", value: loading ? "..." : stats.classAverage, color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
            { icon: Award, label: "Peraih Lencana Emas", value: loading ? "..." : stats.goldBadges, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
            { icon: TrendingUp, label: "Submission Hari Ini", value: loading ? "..." : stats.submissionsToday, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
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
              <p className="text-2xl font-bold mb-0.5">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabel Mahasiswa */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm"
        >
          <div className="p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-bold">Daftar Mahasiswa & Capaian</h2>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari nama atau NIM..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/30">
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Mahasiswa</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Rata-Rata</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Lencana</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-muted-foreground text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                      <div className="flex justify-center mb-2">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      Memuat data kelas...
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                      Tidak ada data mahasiswa yang cocok dengan pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="p-4">
                        <div className="font-bold">{student.full_name}</div>
                        <div className="text-xs text-muted-foreground">{student.nim || 'NIM Tidak Ada'}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-lg font-mono font-bold" style={{ color: student.badge.hexColor }}>
                          {student.avg_score.toFixed(1)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: student.badge.hexColor }}></div>
                          <span className="text-sm font-medium">{student.badge.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/lecturer/student/${student.id}`}>
                          <button className="px-4 py-2 bg-background border border-border rounded-xl text-xs font-bold hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-1 ml-auto">
                            Rincian <ChevronRight className="w-3 h-3" />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
