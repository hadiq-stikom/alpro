"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  BarChart3, 
  Award, 
  TrendingUp, 
  BookOpen, 
  Search, 
  ChevronRight, 
  KeyRound, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  RotateCcw,
  ShieldAlert
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { getBadgeFromScore, type BadgeConfig } from "@/lib/badges";
import Link from "next/link";

interface StudentItem {
  id: string;
  email: string | null;
  full_name: string;
  nim: string | null;
  role: string;
  class_id: string | null;
  password_changed: boolean;
  avg_score: number;
  badge: BadgeConfig;
}

interface OverallGradeItem {
  user_id: string;
  total_avg_score: number;
}

export default function LecturerDashboardPage() {
  const { profile } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [stats, setStats] = useState({ 
    totalStudents: 0, 
    classAverage: 0, 
    goldBadges: 0, 
    submissionsToday: 0 
  });
  const [searchQuery, setSearchQuery] = useState("");

  // State untuk modal reset password & feedback toast
  const [resetModalStudent, setResetModalStudent] = useState<StudentItem | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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
        const { data: overallData } = await supabase
          .from('overall_grades')
          .select('*');

        // 2b. Fallback langsung: ambil semua submissions untuk melengkapi data yang belum teragregasi view
        const { data: allSubmissionsData } = await supabase
          .from('quiz_submissions')
          .select('user_id, meeting_id, score, quiz_type');

        const allSubmissions = (allSubmissionsData || []) as { user_id?: string; meeting_id?: number; score?: number; quiz_type?: string }[];

        // Aturan pedagogi: hanya essay/exam/lab yang jadi sumber nilai. MCQ (quiz) hanya syarat masuk.
        const GRADABLE_TYPES = ['essay', 'exam', 'lab', 'challenge'];

        const userMeetingScores = new Map<string, Map<number, number>>();
        for (const sub of allSubmissions) {
          if (
            !sub.user_id ||
            sub.meeting_id === undefined ||
            sub.score === undefined ||
            sub.score <= 0 ||                              // abaikan skor 0 (tidak selesai)
            !GRADABLE_TYPES.includes(sub.quiz_type || '') // hanya esai/exam/lab
          ) continue;
          if (!userMeetingScores.has(sub.user_id)) {
            userMeetingScores.set(sub.user_id, new Map<number, number>());
          }
          const m = userMeetingScores.get(sub.user_id)!;
          const cur = m.get(sub.meeting_id) || 0;
          if (sub.score > cur) {
            m.set(sub.meeting_id, sub.score);
          }
        }
        
        // 3. Ambil jumlah submission hari ini (sejak tengah malam)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const { count: submissionCount } = await supabase
          .from('quiz_submissions')
          .select('*', { count: 'exact', head: true })
          .gte('submitted_at', today.toISOString());

        // Gabungkan data user dengan nilainya
        const studentsList = (usersData || []) as StudentItem[];
        const gradesList = (overallData || []) as OverallGradeItem[];
        
        const mergedStudents: StudentItem[] = studentsList.map(student => {
          const grade = gradesList.find(g => g.user_id === student.id);
          let score = grade?.total_avg_score || 0;
          
          if (score === 0 && userMeetingScores.has(student.id)) {
            const m = userMeetingScores.get(student.id)!;
            const scores = Array.from(m.values());
            if (scores.length > 0) {
              score = Number((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2));
            }
          }

          return {
            ...student,
            avg_score: score,
            badge: getBadgeFromScore(score)
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

  // Auto-dismiss toast setelah 6 detik
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Fungsi eksekusi reset password ke NIM default
  const handleConfirmReset = async () => {
    if (!resetModalStudent) return;
    setIsResetting(true);
    setToastMessage(null);

    try {
      const res = await fetch("/api/lecturer/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: resetModalStudent.id }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Gagal mereset password.");
      }

      // Update state lokal mahasiswa agar password_changed menjadi false
      setStudents((prev) =>
        prev.map((s) =>
          s.id === resetModalStudent.id ? { ...s, password_changed: false } : s
        )
      );

      setToastMessage({
        type: "success",
        text: `Password untuk ${resetModalStudent.full_name} (${resetModalStudent.nim}) berhasil direset ke default (NIM).`,
      });
      setResetModalStudent(null);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Terjadi kesalahan saat mereset password.";
      setToastMessage({
        type: "error",
        text: errMsg,
      });
    } finally {
      setIsResetting(false);
    }
  };

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

        {/* Toast Notifikasi Feedback */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-6 p-4 rounded-2xl border flex items-center justify-between gap-3 shadow-md ${
                toastMessage.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-800 dark:text-rose-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {toastMessage.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                )}
                <p className="text-sm font-medium">{toastMessage.text}</p>
              </div>
              <button
                onClick={() => setToastMessage(null)}
                className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Tutup notifikasi"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabel Mahasiswa */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm"
        >
          <div className="p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold">Daftar Mahasiswa &amp; Capaian</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Kelola progres belajar dan autentikasi akun mahasiswa</p>
            </div>
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
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-muted-foreground min-w-[200px]">Mahasiswa</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-muted-foreground min-w-[100px]">Rata-Rata</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-muted-foreground min-w-[150px]">Lencana</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-muted-foreground min-w-[200px]">Reset Password</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-muted-foreground text-right min-w-[100px]">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      <div className="flex justify-center mb-2">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      Memuat data kelas...
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      Tidak ada data mahasiswa yang cocok dengan pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-foreground">{student.full_name}</div>
                        <div className="text-xs font-mono text-muted-foreground">{student.nim || 'NIM Tidak Ada'}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-lg font-mono font-bold" style={{ color: student.badge.hexColor }}>
                          {student.avg_score.toFixed(1)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: student.badge.hexColor }}></div>
                          <span className="text-sm font-medium">{student.badge.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <button
                            onClick={() => setResetModalStudent(student)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/30 transition-all shadow-xs cursor-pointer active:scale-95"
                            title={`Reset password ${student.full_name} ke default (${student.nim})`}
                          >
                            <KeyRound className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                            <span>Reset ke NIM</span>
                          </button>
                          {student.password_changed ? (
                            <span 
                              className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20"
                              title="Mahasiswa telah mengganti password bawaan"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              Kustom
                            </span>
                          ) : (
                            <span 
                              className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground px-2 py-0.5 rounded-md bg-secondary border border-border"
                              title="Akun masih menggunakan password default (NIM)"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                              Default NIM
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/lecturer/student/${student.id}`}>
                          <button className="px-4 py-2 bg-background border border-border rounded-xl text-xs font-bold hover:bg-primary/10 hover:text-primary transition-colors inline-flex items-center gap-1 cursor-pointer">
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

      {/* Modal Konfirmasi Reset Password */}
      <AnimatePresence>
        {resetModalStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => !isResetting && setResetModalStudent(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-muted-foreground hover:bg-secondary transition-colors cursor-pointer"
                disabled={isResetting}
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3.5 mb-5">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Reset Password Mahasiswa</h3>
                  <p className="text-xs text-muted-foreground">Kembalikan ke password default (NIM)</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="p-4 rounded-2xl bg-secondary/40 border border-border space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-xs">Nama Mahasiswa:</span>
                    <span className="font-bold text-foreground">{resetModalStudent.full_name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-xs">NIM (Password Baru):</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {resetModalStudent.nim || '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 leading-relaxed flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                  <span>
                    Password login akun mahasiswa ini akan dikembalikan menjadi <strong>{resetModalStudent.nim}</strong>. 
                    Saat mahasiswa login kembali, sistem akan mewajibkannya untuk membuat password baru di halaman aktivasi.
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setResetModalStudent(null)}
                  disabled={isResetting}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-border hover:bg-secondary transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReset}
                  disabled={isResetting}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/20 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isResetting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Mereset...</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Ya, Reset Password</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
