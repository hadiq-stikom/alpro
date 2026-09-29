"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  Target, 
  GraduationCap, 
  ChevronRight, 
  Sparkles, 
  Flame, 
  ArrowRight, 
  Award, 
  Zap, 
  RefreshCw, 
  CheckCircle2, 
  TrendingUp, 
  RotateCcw,
  Lock
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { getBadgeFromScore, BADGE_CONFIGS, type BadgeConfig } from "@/lib/badges";
import { BadgeDisplay } from "@/components/BadgeDisplay";
import Link from "next/link";

interface OverallGrade {
  total_avg_score: number;
  overall_grade_letter: string;
  overall_grade_category: string;
}

interface MeetingGradeItem {
  meeting_id: number;
  avg_score: number;
}

interface MeetingInfo {
  id: number;
  title: string;
  subtitle: string;
  status: 'ready' | 'upcoming';
}

// Daftar 16 Pertemuan Silabus Semester TI-101
const ALL_MEETINGS: MeetingInfo[] = [
  { id: 1, title: "Pengenalan Komputer & Pemrograman", subtitle: "Evolusi komputasi, bahasa pemrograman & siklus eksekusi", status: 'ready' },
  { id: 2, title: "Arsitektur Komputer & Sistem Bilangan", subtitle: "Radiks biner, heksadesimal & alokasi memori fisik", status: 'ready' },
  { id: 3, title: "Notasi & Penyajian Algoritma", subtitle: "Algoritma Naratif, Flowchart ANSI/ISO & Pseudocode 3 Blok", status: 'ready' },
  { id: 4, title: "Tipe Data, Variabel & I/O Dasar", subtitle: "Prinsip Type Safety, aturan identifier & simulator RAM", status: 'ready' },
  { id: 5, title: "Operator, Ekspresi & Manipulasi Data", subtitle: "Aritmatika, relasional, logika Boolean & manipulasi string", status: 'ready' },
  { id: 6, title: "Struktur Percabangan Tunggal & Ganda", subtitle: "Kondisi IF & IF-ELSE, evaluasi True/False beranimasi", status: 'ready' },
  { id: 7, title: "Percabangan Majemuk & Bersarang", subtitle: "Cascading IF-ELSE IF, Nested IF & Multi-branch selector", status: 'ready' },
  { id: 8, title: "Evaluasi Tengah Semester (UTS)", subtitle: "Ujian komprehensif pilar logika dan kontrol alur", status: 'upcoming' },
  { id: 9, title: "Struktur Perulangan (Looping FOR & WHILE)", subtitle: "Iterasi komputasi dan akumulator data", status: 'upcoming' },
  { id: 10, title: "Perulangan Kompleks & Nested Loop", subtitle: "Matriks, pola nested loop dan optimasi iterasi", status: 'upcoming' },
  { id: 11, title: "Fungsi, Prosedur & Modularitas Program", subtitle: "Dekomposisi masalah dan fungsi berparameter", status: 'upcoming' },
  { id: 12, title: "Parameter Passing & Variable Scope", subtitle: "Pass-by-value vs pass-by-reference & call stack", status: 'upcoming' },
  { id: 13, title: "Struktur Data Array / List 1 Dimensi", subtitle: "Indeks memori kontinu dan manipulasi larik", status: 'upcoming' },
  { id: 14, title: "Array Multidimensi & Matriks", subtitle: "Operasi baris-kolom dan pemrosesan tabel data", status: 'upcoming' },
  { id: 15, title: "Algoritma Pencarian & Pengurutan Dasar", subtitle: "Linear vs Binary Search & Bubble/Selection Sort", status: 'upcoming' },
  { id: 16, title: "Evaluasi Akhir Semester (UAS)", subtitle: "Sintesis algoritma dan proyek akhir komputasional", status: 'upcoming' },
];

export default function StudentDashboardPage() {
  const { profile } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [overallGrade, setOverallGrade] = useState<OverallGrade | null>(null);
  const [meetingGrades, setMeetingGrades] = useState<MeetingGradeItem[]>([]);
  const [stats, setStats] = useState({ totalCompleted: 0, totalBadges: 0, totalHours: 0 });
  const [filterTab, setFilterTab] = useState<'all' | 'uncompleted' | 'completed'>('all');

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
          
        if (overallData) setOverallGrade(overallData as OverallGrade);
        
        // 2. Ambil nilai pertemuan
        const { data: meetingGradesData, error: mgError } = await supabase
          .from('meeting_grades')
          .select('*')
          .eq('user_id', profile.id)
          .order('meeting_id', { ascending: true });
          
        if (mgError) throw mgError;
        
        // Deduplikasi meetingGrades berdasarkan meeting_id
        const uniqueMeetingGrades: MeetingGradeItem[] = [];
        const seenMeetings = new Set<number>();
        if (meetingGradesData) {
          for (const item of (meetingGradesData as MeetingGradeItem[])) {
            if (!seenMeetings.has(item.meeting_id)) {
              seenMeetings.add(item.meeting_id);
              uniqueMeetingGrades.push(item);
            }
          }
        }
        
        setMeetingGrades(uniqueMeetingGrades);
        
        // 3. Ambil statistik submission
        const { data: submissionsData } = await supabase
          .from('quiz_submissions')
          .select('time_spent_seconds, meeting_id')
          .eq('user_id', profile.id);
          
        const submissions = (submissionsData || []) as { time_spent_seconds?: number; meeting_id?: number }[];
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
        console.error("Gagal mengambil data dashboard mahasiswa", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDashboardData();
  }, [profile?.id]);

  // Resolusi badge saat ini
  const currentBadge: BadgeConfig = getBadgeFromScore(overallGrade?.total_avg_score || 0);
  const completionPercentage = Math.round((stats.totalCompleted / 16) * 100);

  // Cari bab terawal yang belum diselesaikan dan berstatus ready (misal Bab 1 jika terlewat)
  const firstUncompletedReadyMeeting = useMemo(() => {
    const uncompleted = ALL_MEETINGS.find(
      m => m.status === 'ready' && !meetingGrades.some(g => g.meeting_id === m.id)
    );
    return uncompleted ? uncompleted.id : 1;
  }, [meetingGrades]);

  // Cek apakah mahasiswa memiliki bab terlewat sebelum bab tertinggi yang dikerjakan
  const hasSkippedChapters = useMemo(() => {
    if (meetingGrades.length === 0) return false;
    const maxCompleted = Math.max(...meetingGrades.map(g => g.meeting_id));
    return ALL_MEETINGS.some(
      m => m.id < maxCompleted && m.status === 'ready' && !meetingGrades.some(g => g.meeting_id === m.id)
    );
  }, [meetingGrades]);

  // Filter daftar pertemuan
  const filteredMeetings = useMemo(() => {
    return ALL_MEETINGS.filter((m) => {
      const isCompleted = meetingGrades.some(g => g.meeting_id === m.id);
      if (filterTab === 'completed') return isCompleted;
      if (filterTab === 'uncompleted') return !isCompleted;
      return true;
    });
  }, [filterTab, meetingGrades]);

  return (
    <div className="min-h-screen bg-background pb-20 selection:bg-primary/20">
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-10">
        
        {/* Header Profil Mahasiswa & Lencana Utama */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-primary/20 via-violet-500/10 to-indigo-500/20 border border-primary/25 shadow-sm">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background" title="Status Akun Aktif" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                  Halo, {profile?.full_name ?? profile?.nim ?? "Mahasiswa"} 👋
                </h1>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mt-0.5 flex flex-wrap items-center gap-x-2">
                <span className="font-mono font-semibold text-foreground/80">NIM: {profile?.nim ?? "–"}</span>
                <span>•</span>
                <span>TI-101 Algoritma &amp; Pemrograman</span>
                <span>•</span>
                <span className="text-primary font-medium">Semester Ganjil</span>
              </p>
            </div>
          </div>
          
          {/* Badge Preview / Capaian Saat Ini */}
          {!loading && (
            <div className="flex items-center gap-4 bg-card/90 border border-border p-3.5 rounded-2xl shadow-sm backdrop-blur-xs">
              {overallGrade ? (
                <>
                  <div className="text-right">
                    <div className="text-[10px] text-muted-foreground uppercase font-black tracking-wider mb-0.5">
                      Rata-Rata Capaian
                    </div>
                    <div className="text-2xl font-black font-mono" style={{ color: currentBadge.hexColor }}>
                      {overallGrade.total_avg_score.toFixed(1)} <span className="text-xs text-muted-foreground font-sans">/ 100</span>
                    </div>
                    <div className="text-[11px] font-semibold text-muted-foreground">
                      Kategori: <span className="font-bold text-foreground">{overallGrade.overall_grade_category}</span>
                    </div>
                  </div>
                  <BadgeDisplay badge={currentBadge} size="md" showLabel={false} />
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">Calon Juara Logika</div>
                    <div className="text-[11px] text-muted-foreground">Siap mengoleksi lencana perdana</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* HERO MOTIVASI: KONSISTENSI & PERBAIKAN BERKELANJUTAN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-amber-500/10 p-6 md:p-8 mb-8 shadow-md backdrop-blur-sm"
        >
          {/* Ornamen Latar Ambient */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                  <span>Kunci Sukses Pemrograman</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-2">
                  Kuasai Algoritma Lewat <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 bg-clip-text text-transparent">Konsistensi &amp; Perbaikan Diri</span> 🚀
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  &ldquo;Pemrograman bukan tentang seberapa cepat kamu mengetik, melainkan <strong>ketekunan melatih logika berpikir secara konsisten</strong>. 
                  Jika capaian kuis atau esaimu belum maksimal, jangan berkecil hati. 
                  Evaluasi kekurangannya, manfaatkan ruang remedial, dan <strong>lakukan perbaikan</strong> hingga kamu meraih <strong>Lencana Emas</strong>!&rdquo;
                </p>

                {hasSkippedChapters && (
                  <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-medium">
                    <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>
                      Kamu memiliki materi yang belum diambil sebelum bab terakhir. Buka daftar di bawah untuk melengkapi bab yang terlewat!
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
                <Link 
                  href={`/theory/${firstUncompletedReadyMeeting}?startTest=true#assessment`}
                  scroll={false}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm shadow-md shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>
                    {meetingGrades.some(g => g.meeting_id === firstUncompletedReadyMeeting)
                      ? `Lanjutkan Pertemuan ${firstUncompletedReadyMeeting.toString().padStart(2, '0')}`
                      : `Mulai Pertemuan ${firstUncompletedReadyMeeting.toString().padStart(2, '0')}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/workspace"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-card border border-border hover:bg-secondary/60 text-foreground font-bold text-sm transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Studio Praktikum Interaktif</span>
                </Link>
              </div>
            </div>

            {/* 3 Pilar Sukses Mahasiswa */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border/50">
              <div className="p-4 rounded-2xl bg-background/60 border border-border/60 backdrop-blur-xs flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-1">1. Latihan Konsisten Tiap Pekan</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Luangkan waktu teratur untuk melatih alur logika di setiap bab. Belajar konsisten jauh lebih efektif daripada belajar mendadak sebelum ujian.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-background/60 border border-border/60 backdrop-blur-xs flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-1">2. Perbaikan Berkelanjutan (Remedial)</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Nilai belum 100? Pelajari kembali ulasan Dosen AI, temukan letak kesalahan logika, dan lakukan pengulangan kuis hingga konsep tuntas dikuasai.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-background/60 border border-border/60 backdrop-blur-xs flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-1">3. Targetkan Lencana Emas (A)</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Setiap mahasiswa memiliki potensi meraih Capaian Sempurna (Skor ≥ 90). Jadikan lencana emas sebagai tolak ukur penguasaan logika sejatimu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistik Cepat Belajar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { 
              icon: BookOpen, 
              label: "Materi Selesai", 
              value: `${stats.totalCompleted} / 16`, 
              subtitle: `${completionPercentage}% Kurikulum`,
              color: "text-indigo-500", 
              bg: "bg-indigo-500/10", 
              border: "border-indigo-500/20",
              progressBar: completionPercentage
            },
            { 
              icon: Trophy, 
              label: "Lencana Diraih", 
              value: stats.totalBadges.toString(), 
              subtitle: stats.totalBadges > 0 ? "Koleksi Terverifikasi" : "Belum Ada Lencana",
              color: "text-yellow-500", 
              bg: "bg-yellow-500/10", 
              border: "border-yellow-500/20" 
            },
            { 
              icon: Target, 
              label: "Rata-Rata Kelas", 
              value: overallGrade ? overallGrade.total_avg_score.toFixed(1) : "—", 
              subtitle: overallGrade ? `Tingkat ${currentBadge.level} (${currentBadge.name.split(' ')[0]})` : "Menunggu Kuis Pertama",
              color: overallGrade ? currentBadge.hexColor : "text-emerald-500", 
              bg: "bg-emerald-500/10", 
              border: "border-emerald-500/20" 
            },
            { 
              icon: Clock, 
              label: "Dedikasi Belajar", 
              value: `${stats.totalHours} jam`, 
              subtitle: "Waktu Interaksi Lab & Kuis",
              color: "text-sky-500", 
              bg: "bg-sky-500/10", 
              border: "border-sky-500/20" 
            },
          ].map(({ icon: Icon, label, value, subtitle, color, bg, border, progressBar }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className={`rounded-2xl border ${border} ${bg} p-5 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-xl ${bg} border ${border}`}>
                    <Icon className={`h-5 w-5 ${color.startsWith('#') ? '' : color}`} style={color.startsWith('#') ? { color } : {}} />
                  </div>
                  {progressBar !== undefined && (
                    <span className="text-xs font-mono font-bold text-muted-foreground">{progressBar}%</span>
                  )}
                </div>
                <p className="text-2xl font-black mb-0.5 tracking-tight">{loading ? "..." : value}</p>
                <p className="text-xs font-bold text-muted-foreground">{label}</p>
              </div>
              
              <div className="mt-3 pt-3 border-t border-border/30">
                {progressBar !== undefined ? (
                  <div className="w-full bg-secondary/50 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(100, Math.max(0, progressBar))}%` }} 
                    />
                  </div>
                ) : (
                  <span className="text-[11px] text-muted-foreground font-medium">{subtitle}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Peta 9 Tingkat Capaian & Sistem Lencana */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-10 bg-card border border-border rounded-3xl p-6 shadow-sm overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Peta 9 Tingkat Capaian &amp; Lencana Resmi</span>
              </h3>
              <p className="text-xs text-muted-foreground">
                Setiap peningkatan nilai mencerminkan kematangan logikamu. Lakukan perbaikan secara konsisten untuk melangkah ke tingkat berikutnya!
              </p>
            </div>
            <div className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary border border-border text-muted-foreground">
              Target Standar: <strong className="text-foreground">Lencana B / AB / A</strong>
            </div>
          </div>

          {/* Visual Tangga 9 Lencana */}
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2.5 mb-5">
            {BADGE_CONFIGS.map((badge) => {
              const isCurrentLevel = overallGrade && currentBadge.level === badge.level;
              return (
                <div
                  key={badge.level}
                  className={`relative p-3 rounded-2xl border transition-all text-center flex flex-col items-center justify-between ${
                    isCurrentLevel 
                      ? 'ring-2 ring-offset-2 ring-primary bg-primary/10 shadow-md scale-105 z-10' 
                      : 'bg-secondary/20 hover:bg-secondary/40'
                  }`}
                  style={{ borderColor: `${badge.hexColor}60` }}
                >
                  {isCurrentLevel && (
                    <div className="absolute -top-2.5 bg-primary text-primary-foreground text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-xs">
                      KAMU
                    </div>
                  )}
                  <div 
                    className="w-3.5 h-3.5 rounded-full mb-1.5 shadow-xs" 
                    style={{ backgroundColor: badge.hexColor }} 
                  />
                  <div className="font-mono font-black text-sm" style={{ color: badge.hexColor }}>
                    {badge.level}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-medium truncate w-full mt-0.5">
                    {badge.minScore}–{Math.floor(badge.maxScore)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Keterangan 4 Klaster Akademik */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 flex items-center justify-between">
              <div>
                <div className="font-bold flex items-center gap-1.5">
                  <span>👑 Sempurna</span>
                </div>
                <div className="text-[11px] opacity-80">Skor 90–100</div>
              </div>
              <span className="font-mono font-black text-sm px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">A</span>
            </div>

            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-900 dark:text-blue-200 flex items-center justify-between">
              <div>
                <div className="font-bold flex items-center gap-1.5">
                  <span>💎 Baik</span>
                </div>
                <div className="text-[11px] opacity-80">Skor 70–89</div>
              </div>
              <span className="font-mono font-black text-sm px-2 py-0.5 rounded bg-blue-500/20 border border-blue-500/30">B • AB</span>
            </div>

            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-900 dark:text-sky-200 flex items-center justify-between">
              <div>
                <div className="font-bold flex items-center gap-1.5">
                  <span>⚡ Cukup</span>
                </div>
                <div className="text-[11px] opacity-80">Skor 55–69</div>
              </div>
              <span className="font-mono font-black text-sm px-2 py-0.5 rounded bg-sky-500/20 border border-sky-500/30">C • BC</span>
            </div>

            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-900 dark:text-rose-200 flex items-center justify-between">
              <div>
                <div className="font-bold flex items-center gap-1.5">
                  <span>🌱 Area Perbaikan</span>
                </div>
                <div className="text-[11px] opacity-80">Skor 0–54 (Remedial)</div>
              </div>
              <span className="font-mono font-black text-sm px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/30">E s.d CD</span>
            </div>
          </div>
        </motion.div>

        {/* DAFTAR LENCANA & SELURUH PERTEMUAN (FORMAT COMPACT CARD) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-xl font-bold text-foreground">Daftar Modul &amp; Lencana Pertemuan</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Akses materi dan uji pemahamanmu kapan saja pada modul yang aktif
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="inline-flex p-1 bg-secondary rounded-2xl border border-border text-xs font-semibold">
              <button
                onClick={() => setFilterTab('all')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  filterTab === 'all' 
                    ? 'bg-background text-foreground shadow-xs' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Semua ({ALL_MEETINGS.length})
              </button>
              <button
                onClick={() => setFilterTab('uncompleted')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  filterTab === 'uncompleted' 
                    ? 'bg-background text-foreground shadow-xs' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Belum Selesai ({ALL_MEETINGS.length - meetingGrades.length})
              </button>
              <button
                onClick={() => setFilterTab('completed')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  filterTab === 'completed' 
                    ? 'bg-background text-foreground shadow-xs' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Selesai ({meetingGrades.length})
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 bg-card border border-border rounded-3xl">
              <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-xs text-muted-foreground">Memuat daftar kurikulum dan capaian Anda...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {filteredMeetings.map((meeting) => {
                const gradeItem = meetingGrades.find(g => g.meeting_id === meeting.id);
                const isCompleted = !!gradeItem;
                const badge = isCompleted ? getBadgeFromScore(gradeItem.avg_score) : null;
                const isPerfect = isCompleted && gradeItem.avg_score >= 90;
                const isGood = isCompleted && gradeItem.avg_score >= 70 && gradeItem.avg_score < 90;
                const canImprove = isCompleted && gradeItem.avg_score < 90;
                const isReady = meeting.status === 'ready';

                // KARTU COMPACT 1: Pertemuan SUDAH SELESAI (Memiliki Nilai & Lencana)
                if (isCompleted && badge) {
                  return (
                    <Link href={`/student/meeting/${meeting.id}`} key={`m-${meeting.id}`} className="group">
                      <div className="bg-card hover:bg-secondary/40 border border-border hover:border-primary/40 transition-all rounded-2xl p-4 flex flex-col justify-between h-full min-h-[148px] shadow-2xs hover:shadow-md cursor-pointer">
                        <div>
                          {/* Header Mini: Minggu & Skor */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                              Minggu {meeting.id.toString().padStart(2, '0')}
                            </span>
                            <div 
                              className="flex items-center gap-1.5 text-xs font-mono font-bold px-2 py-0.5 rounded-md border" 
                              style={{ 
                                backgroundColor: `${badge.hexColor}15`, 
                                color: badge.hexColor,
                                borderColor: `${badge.hexColor}30`
                              }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: badge.hexColor }} />
                              <span>{gradeItem.avg_score.toFixed(1)}</span>
                            </div>
                          </div>

                          {/* Tengah: Ikon Lencana & Judul */}
                          <div className="flex items-start gap-2.5 mb-2">
                            <div 
                              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border shadow-2xs group-hover:scale-105 transition-transform"
                              style={{ 
                                backgroundColor: `${badge.hexColor}20`,
                                borderColor: `${badge.hexColor}60`
                              }}
                            >
                              <Award className="w-4 h-4" style={{ color: badge.hexColor }} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-xs text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                                {meeting.title}
                              </h4>
                              <p className="text-[10px] font-semibold mt-0.5" style={{ color: badge.hexColor }}>
                                {badge.name.split(' ')[0]} ({badge.level})
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Footer Mini: Status & Aksi */}
                        <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[11px] mt-1">
                          {isPerfect ? (
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 text-[10px]">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Sempurna</span>
                            </span>
                          ) : isGood ? (
                            <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 text-[10px]">
                              <TrendingUp className="w-3 h-3" />
                              <span>Bagus</span>
                            </span>
                          ) : (
                            <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1 text-[10px]">
                              <RotateCcw className="w-3 h-3" />
                              <span>Remedial</span>
                            </span>
                          )}

                          <span className="font-bold text-muted-foreground group-hover:text-primary transition-colors inline-flex items-center text-[10px]">
                            <span>{canImprove ? 'Ulas Nilai' : 'Rapor'}</span>
                            <ChevronRight className="w-3 h-3 ml-0.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                }

                // KARTU COMPACT 2: Pertemuan AKTIF BELUM SELESAI (Siap Dikerjakan)
                if (isReady) {
                  return (
                    <Link 
                      href={`/theory/${meeting.id}?startTest=true#assessment`} 
                      scroll={false} 
                      key={`m-${meeting.id}`} 
                      className="group"
                    >
                      <div className="bg-card/70 hover:bg-card border-2 border-dashed border-border/80 hover:border-primary/50 transition-all rounded-2xl p-4 flex flex-col justify-between h-full min-h-[148px] shadow-2xs hover:shadow-md cursor-pointer">
                        <div>
                          {/* Header Mini: Minggu & Status Belum Dikerjakan */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                              Minggu {meeting.id.toString().padStart(2, '0')}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                              <Sparkles className="w-2.5 h-2.5 text-amber-500 animate-pulse" />
                              <span>Tersedia</span>
                            </span>
                          </div>

                          {/* Tengah: Ikon & Judul */}
                          <div className="flex items-start gap-2.5 mb-2">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                              <BookOpen className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-xs text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                                {meeting.title}
                              </h4>
                              <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                                {meeting.subtitle}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Footer Mini: Tombol Langsung Mulai */}
                        <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[11px] mt-1">
                          <span className="text-muted-foreground text-[10px]">Tantangan siap</span>
                          <span className="font-bold text-primary inline-flex items-center gap-0.5 text-[10px] group-hover:translate-x-0.5 transition-transform">
                            <span>Mulai Tes</span>
                            <ArrowRight className="w-3 h-3 ml-0.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                }

                // KARTU COMPACT 3: Pertemuan MENDATANG (Upcoming)
                return (
                  <div 
                    key={`m-${meeting.id}`}
                    className="bg-secondary/20 border border-border/40 rounded-2xl p-4 flex flex-col justify-between h-full min-h-[148px] opacity-60 cursor-not-allowed select-none"
                  >
                    <div>
                      {/* Header Mini */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                          Minggu {meeting.id.toString().padStart(2, '0')}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                          <Lock className="w-2.5 h-2.5" />
                          <span>Segera</span>
                        </span>
                      </div>

                      {/* Tengah: Ikon & Judul */}
                      <div className="flex items-start gap-2.5 mb-2">
                        <div className="w-8 h-8 rounded-xl bg-secondary border border-border text-muted-foreground flex items-center justify-center shrink-0">
                          <Lock className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-xs text-foreground/80 leading-snug line-clamp-2">
                            {meeting.title}
                          </h4>
                          <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                            {meeting.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Footer Mini */}
                    <div className="pt-2 border-t border-border/30 text-[10px] text-muted-foreground mt-1">
                      Pekan semester lanjutan
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
