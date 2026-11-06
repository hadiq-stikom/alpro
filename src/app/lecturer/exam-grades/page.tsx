"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  ArrowLeft, 
  Save, 
  Sliders, 
  Search, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Sparkles, 
  BookOpen, 
  Code2, 
  Cpu, 
  MessageSquare, 
  HelpCircle, 
  TrendingUp, 
  BarChart3, 
  Users,
  Maximize2,
  Minimize2,
  Settings2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  X,
  MessageSquarePlus,
  Check
} from "lucide-react";
import Link from "next/link";
import { BADGE_CONFIGS, BadgeConfig } from "@/lib/badges";

// 5 Aspek Penilaian Baku sesuai Arahan Dosen Pengampu
export interface ExamAspects {
  penyerapan_materi: number;     // 1. Prosentase penyerapan materi
  pemahaman_konsep: number;      // 2. Pemahaman konsep
  kemampuan_menjelaskan: number; // 3. Kemampuan menjelaskan
  implementasi_algoritma: number;// 4. Kemampuan implementasi algoritma
  implementasi_kode: number;     // 5. Kemampuan implementasi kode
}

export interface ExamWeights {
  penyerapan_materi: number;
  pemahaman_konsep: number;
  kemampuan_menjelaskan: number;
  implementasi_algoritma: number;
  implementasi_kode: number;
}

// Konfigurasi Ambang Batas Nilai per Grade (Dapat disesuaikan Dosen)
export interface GradeThresholds {
  A: number;   // default 90
  AB: number;  // default 80
  B: number;   // default 70
  BC: number;  // default 60
  C: number;   // default 50
  CD: number;  // default 40
  D: number;   // default 30
}

export const DEFAULT_GRADE_THRESHOLDS: GradeThresholds = {
  A: 90,
  AB: 80,
  B: 70,
  BC: 60,
  C: 50,
  CD: 40,
  D: 30,
};

export interface StudentExamRecord {
  id: string;
  full_name: string;
  nim: string | null;
  class_id: string | null;
  submissionId: string | null;
  isGraded: boolean;
  aspectScores: ExamAspects;
  finalScore: number;
  badge: BadgeConfig;
  notes: string;
  isDirty?: boolean; // Menandai adanya perubahan yang belum disimpan
  submittedAt?: string | null;
}

interface RawStudentApi {
  id: string;
  full_name: string;
  nim: string | null;
  class_id: string | null;
  submissionId: string | null;
  isGraded: boolean;
  aspectScores: ExamAspects | null;
  finalScore: number | null;
  notes: string | null;
  submittedAt: string | null;
}

const DEFAULT_WEIGHTS: ExamWeights = {
  penyerapan_materi: 20,
  pemahaman_konsep: 20,
  kemampuan_menjelaskan: 20,
  implementasi_algoritma: 20,
  implementasi_kode: 20,
};

export const ASPECT_METADATA = [
  {
    key: "penyerapan_materi" as const,
    label: "1. Penyerapan Materi",
    shortLabel: "Penyerapan",
    icon: BookOpen,
    desc: "Persentase penyerapan seluruh cakupan materi kuliah yang diujikan.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    key: "pemahaman_konsep" as const,
    label: "2. Pemahaman Konsep",
    shortLabel: "Konsep",
    icon: Cpu,
    desc: "Kedalaman penguasaan konsep dasar, logika komputasi, dan teori algoritma.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    key: "kemampuan_menjelaskan" as const,
    label: "3. Kemampuan Menjelaskan",
    shortLabel: "Penjelasan",
    icon: MessageSquare,
    desc: "Artikulasi ide, penalaran analitis, dan kejelasan merumuskan solusi.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    key: "implementasi_algoritma" as const,
    label: "4. Implementasi Algoritma",
    shortLabel: "Algoritma",
    icon: Sliders,
    desc: "Kecakapan merancang alur logika, flowchart ANSI/ISO, dan pseudocode CLRS.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    key: "implementasi_kode" as const,
    label: "5. Implementasi Kode",
    shortLabel: "Koding",
    icon: Code2,
    desc: "Kerapian sintaks, type safety, modularitas fungsi, dan eksekusi bebas bug.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
];

// Bank Frasa Saran Evaluasi Pedagogis untuk Masukan Cepat Dosen
export const QUICK_FEEDBACK_TEMPLATES = [
  "Penguasaan konsep dasar dan penalaran logika algoritma sudah sangat matang.",
  "Perlu memperbanyak latihan implementasi kode mandiri dan debugging sintaks.",
  "Rancangan pseudocode dan struktur alur penyelesaian masalah sangat rapi.",
  "Kemampuan menjelaskan ide solusi sangat runtut, jelas, dan percaya diri.",
  "Perlu penguatan konsep percabangan (if-else) dan perulangan (looping).",
  "Implementasi program modular, penamaan variabel bersih, dan eksekusi bebas bug.",
  "Pertahankan performa akademis dan konsistensi penalaran komputasional ini.",
  "Disarankan mereviu kembali materi pengantar algoritma sebelum evaluasi akhir.",
];

// Helper kalkulasi badge dengan ambang batas kustom
export function getCustomBadgeFromScore(score: number, thresholds: GradeThresholds): BadgeConfig {
  const safeScore = Math.max(0, Math.min(100, score));
  if (safeScore >= thresholds.A) return { ...BADGE_CONFIGS[0], minScore: thresholds.A };
  if (safeScore >= thresholds.AB) return { ...BADGE_CONFIGS[1], minScore: thresholds.AB, maxScore: thresholds.A - 0.01 };
  if (safeScore >= thresholds.B) return { ...BADGE_CONFIGS[2], minScore: thresholds.B, maxScore: thresholds.AB - 0.01 };
  if (safeScore >= thresholds.BC) return { ...BADGE_CONFIGS[3], minScore: thresholds.BC, maxScore: thresholds.B - 0.01 };
  if (safeScore >= thresholds.C) return { ...BADGE_CONFIGS[4], minScore: thresholds.C, maxScore: thresholds.BC - 0.01 };
  if (safeScore >= thresholds.CD) return { ...BADGE_CONFIGS[5], minScore: thresholds.CD, maxScore: thresholds.C - 0.01 };
  if (safeScore >= thresholds.D) return { ...BADGE_CONFIGS[6], minScore: thresholds.D, maxScore: thresholds.CD - 0.01 };
  return { ...BADGE_CONFIGS[7], maxScore: thresholds.D - 0.01 };
}

export default function LecturerExamGradesPage() {
  const [examType, setExamType] = useState<"UTS" | "UAS">("UTS");
  const [loading, setLoading] = useState<boolean>(true);
  const [savingAll, setSavingAll] = useState<boolean>(false);
  const [savingStudentId, setSavingStudentId] = useState<string | null>(null);

  // Mode Fokus / Layar Penuh untuk kenyamanan penilaian
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);

  // Bobot penilaian yang dapat diatur oleh dosen (persentase tiap aspek)
  const [weights, setWeights] = useState<ExamWeights>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`web_alpro_weights_UTS`);
      if (saved) {
        try {
          return JSON.parse(saved) as ExamWeights;
        } catch {
          // ignore
        }
      }
    }
    return DEFAULT_WEIGHTS;
  });

  // Ambang batas nilai per kategori grade (A, AB, B, dst.) yang dapat diubah dosen
  const [thresholds, setThresholds] = useState<GradeThresholds>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`web_alpro_thresholds_${examType}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed.D === "number" && (parsed as any).DE === undefined) {
            return parsed as GradeThresholds;
          }
        } catch {
          // ignore
        }
      }
    }
    return DEFAULT_GRADE_THRESHOLDS;
  });
  const [showThresholdConfig, setShowThresholdConfig] = useState<boolean>(false);

  // Data nilai mahasiswa
  const [students, setStudents] = useState<StudentExamRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "graded" | "ungraded">("all");

  // Mahasiswa yang sedang dibuka catatan evaluasinya di modal luas
  const [activeNoteStudentId, setActiveNoteStudentId] = useState<string | null>(null);

  // Feedback Toast
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Handler pergantian tipe ujian (UTS / UAS)
  const handleExamTypeChange = (newType: "UTS" | "UAS") => {
    setExamType(newType);
    if (typeof window !== "undefined") {
      const savedWeights = localStorage.getItem(`web_alpro_weights_${newType}`);
      if (savedWeights) {
        try {
          setWeights(JSON.parse(savedWeights) as ExamWeights);
        } catch {
          setWeights(DEFAULT_WEIGHTS);
        }
      } else {
        setWeights(DEFAULT_WEIGHTS);
      }

      const savedThresh = localStorage.getItem(`web_alpro_thresholds_${newType}`);
      if (savedThresh) {
        try {
          const parsed = JSON.parse(savedThresh);
          if (parsed && typeof parsed.D === "number" && (parsed as any).DE === undefined) {
            setThresholds(parsed as GradeThresholds);
          } else {
            setThresholds(DEFAULT_GRADE_THRESHOLDS);
          }
        } catch {
          setThresholds(DEFAULT_GRADE_THRESHOLDS);
        }
      } else {
        setThresholds(DEFAULT_GRADE_THRESHOLDS);
      }
    }
  };

  // Kalkulasi total bobot
  const totalWeight = useMemo(() => {
    return (
      Number(weights.penyerapan_materi || 0) +
      Number(weights.pemahaman_konsep || 0) +
      Number(weights.kemampuan_menjelaskan || 0) +
      Number(weights.implementasi_algoritma || 0) +
      Number(weights.implementasi_kode || 0)
    );
  }, [weights]);

  // Fungsi utilitas untuk menghitung nilai akhir terbobot
  const calculateFinalScore = useCallback((scores: ExamAspects, currentWeights: ExamWeights): number => {
    const sumWeights =
      Number(currentWeights.penyerapan_materi || 0) +
      Number(currentWeights.pemahaman_konsep || 0) +
      Number(currentWeights.kemampuan_menjelaskan || 0) +
      Number(currentWeights.implementasi_algoritma || 0) +
      Number(currentWeights.implementasi_kode || 0);

    if (sumWeights <= 0) return 0;

    const weightedTotal =
      Number(scores.penyerapan_materi || 0) * Number(currentWeights.penyerapan_materi || 0) +
      Number(scores.pemahaman_konsep || 0) * Number(currentWeights.pemahaman_konsep || 0) +
      Number(scores.kemampuan_menjelaskan || 0) * Number(currentWeights.kemampuan_menjelaskan || 0) +
      Number(scores.implementasi_algoritma || 0) * Number(currentWeights.implementasi_algoritma || 0) +
      Number(scores.implementasi_kode || 0) * Number(currentWeights.implementasi_kode || 0);

    const result = weightedTotal / sumWeights;
    return Number(result.toFixed(2));
  }, []);

  // Fetch data mahasiswa & nilai ujian dari backend
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(`/api/lecturer/exam-grades?examType=${examType}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Gagal mengambil data ujian.");
        }

        let activeWeights = DEFAULT_WEIGHTS;
        const savedLocal = localStorage.getItem(`web_alpro_weights_${examType}`);
        if (savedLocal) {
          try {
            activeWeights = JSON.parse(savedLocal) as ExamWeights;
          } catch {
            activeWeights = data.detectedWeights || DEFAULT_WEIGHTS;
          }
        } else if (data.detectedWeights) {
          activeWeights = data.detectedWeights;
          setWeights(activeWeights);
        }

        const rawStudents: RawStudentApi[] = data.students || [];

        const formattedStudents: StudentExamRecord[] = rawStudents.map((st) => {
          const rawAspects: ExamAspects = st.aspectScores || {
            penyerapan_materi: 0,
            pemahaman_konsep: 0,
            kemampuan_menjelaskan: 0,
            implementasi_algoritma: 0,
            implementasi_kode: 0,
          };

          const finalScore =
            st.finalScore !== null && st.finalScore !== undefined
              ? Number(st.finalScore)
              : calculateFinalScore(rawAspects, activeWeights);

          return {
            id: st.id,
            full_name: st.full_name,
            nim: st.nim,
            class_id: st.class_id,
            submissionId: st.submissionId,
            isGraded: st.isGraded,
            aspectScores: rawAspects,
            finalScore,
            badge: getCustomBadgeFromScore(finalScore, thresholds),
            notes: st.notes || "",
            isDirty: false,
            submittedAt: st.submittedAt,
          };
        });

        setStudents(formattedStudents);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Gagal memuat data.";
        console.error("Fetch exam error:", err);
        setToast({ type: "error", message: msg });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [examType, calculateFinalScore, thresholds]);

  // Hitung ulang semua nilai siswa ketika bobot diubah
  const handleWeightChange = (key: keyof ExamWeights, value: number) => {
    const val = Math.max(0, Math.min(100, isNaN(value) ? 0 : value));
    const newWeights = { ...weights, [key]: val };
    setWeights(newWeights);

    // Simpan ke localStorage
    localStorage.setItem(`web_alpro_weights_${examType}`, JSON.stringify(newWeights));

    // Perbarui nilai siswa di state secara real-time
    setStudents((prev) =>
      prev.map((s) => {
        const newFinal = calculateFinalScore(s.aspectScores, newWeights);
        return {
          ...s,
          finalScore: newFinal,
          badge: getCustomBadgeFromScore(newFinal, thresholds),
          isDirty: s.isGraded ? true : s.isDirty,
        };
      })
    );
  };

  // Terapkan preset bobot
  const applyPreset = (presetWeights: ExamWeights) => {
    setWeights(presetWeights);
    localStorage.setItem(`web_alpro_weights_${examType}`, JSON.stringify(presetWeights));
    setStudents((prev) =>
      prev.map((s) => {
        const newFinal = calculateFinalScore(s.aspectScores, presetWeights);
        return {
          ...s,
          finalScore: newFinal,
          badge: getCustomBadgeFromScore(newFinal, thresholds),
          isDirty: s.isGraded ? true : s.isDirty,
        };
      })
    );
    setToast({ type: "success", message: "Preset bobot persentase berhasil diterapkan!" });
  };

  // Ubah ambang batas kategori nilai (A, AB, B, dst.)
  const handleThresholdChange = (gradeKey: keyof GradeThresholds, value: number) => {
    const cleanVal = Math.max(0, Math.min(100, isNaN(value) ? 0 : value));
    const newThresholds = { ...thresholds, [gradeKey]: cleanVal };
    setThresholds(newThresholds);
    localStorage.setItem(`web_alpro_thresholds_${examType}`, JSON.stringify(newThresholds));

    // Perbarui lencana semua siswa
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        badge: getCustomBadgeFromScore(s.finalScore, newThresholds),
        isDirty: s.isGraded ? true : s.isDirty,
      }))
    );
  };

  // Reset ambang batas nilai ke standar baku
  const resetThresholdsToDefault = () => {
    setThresholds(DEFAULT_GRADE_THRESHOLDS);
    localStorage.setItem(`web_alpro_thresholds_${examType}`, JSON.stringify(DEFAULT_GRADE_THRESHOLDS));
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        badge: getCustomBadgeFromScore(s.finalScore, DEFAULT_GRADE_THRESHOLDS),
        isDirty: s.isGraded ? true : s.isDirty,
      }))
    );
    setToast({ type: "success", message: "Ambang batas kategori nilai berhasil dikembalikan ke standar baku (A=90, B=70)." });
  };

  // Ubah nilai aspek per mahasiswa
  const handleScoreChange = (studentId: string, aspect: keyof ExamAspects, val: number) => {
    const cleanVal = Math.max(0, Math.min(100, isNaN(val) ? 0 : val));

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        const newAspects = { ...s.aspectScores, [aspect]: cleanVal };
        const newFinal = calculateFinalScore(newAspects, weights);
        return {
          ...s,
          aspectScores: newAspects,
          finalScore: newFinal,
          badge: getCustomBadgeFromScore(newFinal, thresholds),
          isDirty: true,
        };
      })
    );
  };

  // Ubah catatan per mahasiswa
  const handleNotesChange = (studentId: string, notes: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        return { ...s, notes, isDirty: true };
      })
    );
  };

  // Simpan nilai satu mahasiswa
  const saveSingleStudent = async (student: StudentExamRecord) => {
    setSavingStudentId(student.id);
    try {
      const res = await fetch("/api/lecturer/exam-grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examType,
          weights,
          grades: [
            {
              studentId: student.id,
              aspectScores: student.aspectScores,
              finalScore: student.finalScore,
              notes: student.notes,
            },
          ],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan nilai.");

      setStudents((prev) =>
        prev.map((s) => (s.id === student.id ? { ...s, isDirty: false, isGraded: true } : s))
      );

      setToast({
        type: "success",
        message: `Nilai ${examType} untuk ${student.full_name} berhasil disimpan (${student.finalScore} / ${student.badge.level}).`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan nilai.";
      console.error("Save single error:", err);
      setToast({ type: "error", message: msg });
    } finally {
      setSavingStudentId(null);
    }
  };

  // Simpan semua nilai yang telah diisi/diubah
  const saveAllGrades = async () => {
    const changedStudents = students.filter((s) => s.isDirty || s.isGraded);
    if (changedStudents.length === 0) {
      setToast({ type: "error", message: "Belum ada nilai yang diinput atau diubah." });
      return;
    }

    setSavingAll(true);
    try {
      const payloadGrades = changedStudents.map((s) => ({
        studentId: s.id,
        aspectScores: s.aspectScores,
        finalScore: s.finalScore,
        notes: s.notes,
      }));

      const res = await fetch("/api/lecturer/exam-grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examType,
          weights,
          grades: payloadGrades,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan semua nilai.");

      setStudents((prev) => prev.map((s) => ({ ...s, isDirty: false, isGraded: true })));

      setToast({
        type: "success",
        message: `Berhasil menyimpan nilai ${examType} untuk ${payloadGrades.length} mahasiswa!`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan nilai massal.";
      console.error("Save all error:", err);
      setToast({ type: "error", message: msg });
    } finally {
      setSavingAll(false);
    }
  };

  // Export ke file CSV
  const handleExportCSV = () => {
    if (students.length === 0) return;

    const headers = [
      "NIM",
      "Nama Mahasiswa",
      `Penyerapan Materi (${weights.penyerapan_materi}%)`,
      `Pemahaman Konsep (${weights.pemahaman_konsep}%)`,
      `Kemampuan Menjelaskan (${weights.kemampuan_menjelaskan}%)`,
      `Implementasi Algoritma (${weights.implementasi_algoritma}%)`,
      `Implementasi Kode (${weights.implementasi_kode}%)`,
      "Nilai Akhir",
      "Lencana (Grade)",
      "Kategori",
      "Catatan Dosen",
    ];

    const rows = students.map((s) => [
      `"${s.nim || ""}"`,
      `"${s.full_name}"`,
      s.aspectScores.penyerapan_materi,
      s.aspectScores.pemahaman_konsep,
      s.aspectScores.kemampuan_menjelaskan,
      s.aspectScores.implementasi_algoritma,
      s.aspectScores.implementasi_kode,
      s.finalScore,
      `"${s.badge.level}"`,
      `"${s.badge.category}"`,
      `"${(s.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Nilai_${examType}_Alpro_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToast({ type: "success", message: `Rekap nilai ${examType} berhasil diunduh dalam format CSV.` });
  };

  // Filter siswa berdasarkan query pencarian dan status
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.nim && s.nim.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchSearch) return false;

      if (statusFilter === "graded") return s.isGraded;
      if (statusFilter === "ungraded") return !s.isGraded;
      return true;
    });
  }, [students, searchQuery, statusFilter]);

  // Mahasiswa yang sedang dibuka di modal catatan evaluasi komprehensif
  const activeNoteStudent = useMemo(() => {
    if (!activeNoteStudentId) return null;
    return students.find((s) => s.id === activeNoteStudentId) || null;
  }, [students, activeNoteStudentId]);

  const activeStudentIndex = useMemo(() => {
    if (!activeNoteStudentId) return -1;
    return filteredStudents.findIndex((s) => s.id === activeNoteStudentId);
  }, [filteredStudents, activeNoteStudentId]);

  const handlePrevStudent = () => {
    if (activeStudentIndex > 0) {
      setActiveNoteStudentId(filteredStudents[activeStudentIndex - 1].id);
    }
  };

  const handleNextStudent = () => {
    if (activeStudentIndex >= 0 && activeStudentIndex < filteredStudents.length - 1) {
      setActiveNoteStudentId(filteredStudents[activeStudentIndex + 1].id);
    }
  };

  const handleAppendFeedback = (template: string) => {
    if (!activeNoteStudent) return;
    const current = (activeNoteStudent.notes || "").trim();
    const updated = current ? `${current} ${template}` : template;
    handleNotesChange(activeNoteStudent.id, updated);
  };

  // Statistik ringkas ujian
  const stats = useMemo(() => {
    const total = students.length;
    const graded = students.filter((s) => s.isGraded).length;
    const gradedStudents = students.filter((s) => s.isGraded && s.finalScore > 0);
    const avg =
      gradedStudents.length > 0
        ? Number((gradedStudents.reduce((acc, s) => acc + s.finalScore, 0) / gradedStudents.length).toFixed(1))
        : 0;

    const goldCount = students.filter((s) => s.isGraded && s.badge.level === "A").length;
    const dirtyCount = students.filter((s) => s.isDirty).length;

    return { total, graded, avg, goldCount, dirtyCount };
  }, [students]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className={`flex flex-col bg-background ${isFocusMode ? "fixed inset-0 z-50 overflow-hidden" : "h-[calc(100vh-4rem)] overflow-hidden"}`}>
      {/* ============================================================== */}
      {/* 1. TOP HEADER BAR (FIXED AT TOP, NEVER SCROLLS AWAY)          */}
      {/* ============================================================== */}
      <header className="flex-shrink-0 border-b border-border/80 bg-card/90 backdrop-blur-md px-4 py-2.5 z-40">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Sisi Kiri: Tombol Kembali & Judul Evaluasi */}
          <div className="flex items-center gap-3">
            {!isFocusMode && (
              <Link
                href="/lecturer/dashboard"
                className="p-2 rounded-xl border border-border/80 bg-background hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground shrink-0"
                title="Kembali ke Dashboard Dosen"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.2 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Panel Evaluasi Dosen
                </span>
                <span className="text-[11px] text-muted-foreground font-mono">PP112601</span>
                {isFocusMode && (
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                    Mode Layar Penuh
                  </span>
                )}
              </div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-foreground flex items-center gap-2">
                Input &amp; Kelola Nilai Ujian
                <span className="text-primary font-bold">({examType})</span>
              </h1>
            </div>
          </div>

          {/* Sisi Kanan: Switcher UTS/UAS & Aksi Global */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Toggle Switcher UTS vs UAS */}
            <div className="flex items-center p-0.5 rounded-xl bg-secondary/80 border border-border/80 shadow-inner">
              <button
                onClick={() => handleExamTypeChange("UTS")}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  examType === "UTS"
                    ? "bg-amber-500 text-white shadow-sm shadow-amber-500/25"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>UTS (Pekan 08)</span>
              </button>
              <button
                onClick={() => handleExamTypeChange("UAS")}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  examType === "UAS"
                    ? "bg-primary text-white shadow-sm shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>UAS (Pekan 16)</span>
              </button>
            </div>

            {/* Toggle Pengaturan Ambang Batas Nilai */}
            <button
              onClick={() => setShowThresholdConfig(!showThresholdConfig)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                showThresholdConfig
                  ? "bg-primary/15 text-primary border-primary/40 shadow-xs"
                  : "border-border/80 bg-background hover:bg-secondary text-muted-foreground hover:text-foreground"
              }`}
              title="Atur Ambang Batas Persentase Grade (A, AB, B, dst.)"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ambang Batas Nilai</span>
            </button>

            {/* Tombol Export CSV */}
            <button
              onClick={handleExportCSV}
              disabled={loading || students.length === 0}
              className="px-3 py-1.5 rounded-xl border border-border/80 bg-background hover:bg-secondary text-foreground text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              title="Unduh Rekap Spreadsheet CSV"
            >
              <Download className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="hidden md:inline">Unduh CSV</span>
            </button>

            {/* Tombol Toggle Layar Penuh (Focus Mode) */}
            <button
              onClick={() => setIsFocusMode(!isFocusMode)}
              className="px-3 py-1.5 rounded-xl border border-border/80 bg-background hover:bg-secondary text-foreground text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title={isFocusMode ? "Tutup Mode Layar Penuh" : "Mode Layar Penuh (Tabel Penuh)"}
            >
              {isFocusMode ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-primary" />
                  <span className="hidden sm:inline">Tutup Layar Penuh</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="hidden sm:inline">Layar Penuh</span>
                </>
              )}
            </button>

            {/* Tombol Simpan Semua Nilai */}
            <button
              onClick={saveAllGrades}
              disabled={savingAll || loading}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                stats.dirtyCount > 0
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/25 animate-pulse"
                  : "bg-primary hover:bg-primary/90 text-white shadow-primary/25"
              } disabled:opacity-50`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingAll ? "Menyimpan..." : stats.dirtyCount > 0 ? `Simpan (${stats.dirtyCount})` : "Simpan Semua"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. TOOLBAR: PRESET BOBOT, STATISTIK RINGKAS, & PENCARIAN        */}
      {/* ============================================================== */}
      <section className="flex-shrink-0 border-b border-border/60 bg-muted/20 px-4 py-2 z-30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2.5">
          {/* Preset Bobot */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-foreground flex items-center gap-1 mr-1">
              <Sliders className="w-3 h-3 text-primary" />
              <span>Preset Bobot:</span>
            </span>
            <button
              onClick={() =>
                applyPreset({
                  penyerapan_materi: 20,
                  pemahaman_konsep: 20,
                  kemampuan_menjelaskan: 20,
                  implementasi_algoritma: 20,
                  implementasi_kode: 20,
                })
              }
              className="px-2 py-0.5 rounded-lg border border-border bg-background hover:bg-secondary text-[11px] font-medium text-foreground transition-colors cursor-pointer"
            >
              ⚖️ Rata (20%)
            </button>
            <button
              onClick={() =>
                applyPreset({
                  penyerapan_materi: 15,
                  pemahaman_konsep: 15,
                  kemampuan_menjelaskan: 20,
                  implementasi_algoritma: 25,
                  implementasi_kode: 25,
                })
              }
              className="px-2 py-0.5 rounded-lg border border-border bg-background hover:bg-secondary text-[11px] font-medium text-foreground transition-colors cursor-pointer"
            >
              💻 Fokus Koding (15,15,20,25,25)
            </button>
            <button
              onClick={() =>
                applyPreset({
                  penyerapan_materi: 25,
                  pemahaman_konsep: 25,
                  kemampuan_menjelaskan: 25,
                  implementasi_algoritma: 15,
                  implementasi_kode: 10,
                })
              }
              className="px-2 py-0.5 rounded-lg border border-border bg-background hover:bg-secondary text-[11px] font-medium text-foreground transition-colors cursor-pointer"
            >
              📖 Fokus Teori (25,25,25,15,10)
            </button>

            {/* Total Bobot Badge */}
            <span
              className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold ${
                totalWeight === 100
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
              }`}
            >
              Total: {totalWeight}% {totalWeight === 100 ? "✓" : "⚠"}
            </span>
          </div>

          {/* Sisi Kanan: Ringkasan Nilai & Filter Pencarian */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Quick Stat Pill */}
            <div className="hidden xl:flex items-center gap-2 text-[11px] font-medium text-muted-foreground mr-1">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 text-violet-500" />
                <span>Dinilai: <strong className="text-foreground">{stats.graded}/{stats.total}</strong></span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <BarChart3 className="w-3 h-3 text-indigo-500" />
                <span>Rata-rata: <strong className="text-foreground font-mono">{stats.avg}</strong></span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                <span>Grade A: <strong className="text-amber-500 font-bold">{stats.goldCount}</strong></span>
              </span>
            </div>

            {/* Search Input */}
            <div className="relative w-44 sm:w-52">
              <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari mahasiswa / NIM..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Filter Status */}
            <div className="flex items-center p-0.5 rounded-lg bg-secondary/80 border border-border text-[11px]">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-2 py-0.5 rounded font-bold transition-all ${
                  statusFilter === "all" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground"
                }`}
              >
                Semua ({students.length})
              </button>
              <button
                onClick={() => setStatusFilter("graded")}
                className={`px-2 py-0.5 rounded font-bold transition-all ${
                  statusFilter === "graded" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground"
                }`}
              >
                Dinilai ({stats.graded})
              </button>
              <button
                onClick={() => setStatusFilter("ungraded")}
                className={`px-2 py-0.5 rounded font-bold transition-all ${
                  statusFilter === "ungraded" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground"
                }`}
              >
                Belum ({stats.total - stats.graded})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. COLLAPSIBLE PANEL: AMBANG BATAS PERSENTASE NILAI (A, B, C)  */}
      {/* ============================================================== */}
      <AnimatePresence>
        {showThresholdConfig && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex-shrink-0 border-b border-border/80 bg-card/95 backdrop-blur-md px-4 py-3 z-30 shadow-md max-h-64 overflow-y-auto"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border/50">
              <div className="flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-primary" />
                <h3 className="text-xs font-bold text-foreground">
                  Konfigurasi Ambang Batas Persentase Minimum Kategori Grade
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <button
                  onClick={resetThresholdsToDefault}
                  className="px-2 py-0.5 rounded border border-border bg-background hover:bg-secondary text-foreground flex items-center gap-1 font-medium text-[11px] transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Kembalikan Default (A=90, B=70)</span>
                </button>
                <button
                  onClick={() => setShowThresholdConfig(false)}
                  className="px-2 py-0.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground text-[11px]"
                >
                  Tutup
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 pt-2.5">
              {[
                { key: "A" as const, label: "Grade A", color: "#F59E0B" },
                { key: "AB" as const, label: "Grade AB", color: "#3B82F6" },
                { key: "B" as const, label: "Grade B", color: "#10B981" },
                { key: "BC" as const, label: "Grade BC", color: "#0EA5E9" },
                { key: "C" as const, label: "Grade C", color: "#FBBF24" },
                { key: "CD" as const, label: "Grade CD", color: "#F97316" },
                { key: "D" as const, label: "Grade D", color: "#F43F5E" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="p-1.5 rounded-lg border border-border/80 bg-background flex flex-col items-center justify-between gap-1 shadow-xs"
                >
                  <div
                    className="px-2 py-0.2 rounded text-[10px] font-black text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.key}
                  </div>
                  <div className="flex items-center gap-0.5">
                    <span className="text-[10px] text-muted-foreground font-mono">≥</span>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={thresholds[item.key]}
                      onChange={(e) => handleThresholdChange(item.key, parseFloat(e.target.value))}
                      className="w-10 px-1 py-0.5 text-center font-mono font-bold text-xs bg-muted/40 border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground pt-1.5">
              * Mahasiswa dengan nilai di bawah ambang batas D ({thresholds.D}) otomatis berpredikat Grade E (0–{thresholds.D - 1}).
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* 4. TOAST NOTIFIKASI FEEDBACK                                   */}
      {/* ============================================================== */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex-shrink-0 px-4 py-2 flex items-center justify-between gap-3 text-xs font-semibold z-40 ${
              toast.type === "success"
                ? "bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                : "bg-rose-500/15 border-b border-rose-500/30 text-rose-800 dark:text-rose-300"
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-[11px] underline hover:no-underline cursor-pointer"
            >
              Tutup
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* 5. WORKSPACE TABEL NILAI (FLEX-1 VIEWPORT FIT, STICKY THEAD)    */}
      {/* ============================================================== */}
      <main className="flex-1 min-h-0 overflow-auto bg-card relative">
        <table className="w-full text-left text-sm border-collapse min-w-[1100px]">
          {/* THEAD STICKY TERKUNCI PERMANEN DI ATAS WORKSPACE */}
          <thead className="sticky top-0 z-30 shadow-xs">
            <tr className="border-b-2 border-border/90 bg-slate-100 dark:bg-slate-900 text-xs font-bold text-muted-foreground">
              {/* Kolom No */}
              <th className="py-2.5 px-3 w-12 text-center sticky top-0 z-30 bg-slate-100 dark:bg-slate-900 border-b-2 border-border/90">
                No
              </th>

              {/* Kolom Mahasiswa */}
              <th className="py-2.5 px-4 min-w-[210px] sticky top-0 z-30 bg-slate-100 dark:bg-slate-900 border-b-2 border-border/90">
                Mahasiswa
              </th>

              {/* 1. Kolom Penyerapan Materi */}
              <th className="py-2 px-3 text-center min-w-[125px] sticky top-0 z-30 bg-slate-100 dark:bg-slate-900 border-b-2 border-border/90">
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-foreground font-black text-xs">Penyerapan</span>
                  <div className="flex items-center gap-1 bg-background dark:bg-slate-950 px-1.5 py-0.5 rounded-md border border-border/80 hover:border-primary/60 focus-within:border-primary shadow-xs transition-colors">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={weights.penyerapan_materi}
                      onChange={(e) => handleWeightChange("penyerapan_materi", parseInt(e.target.value, 10))}
                      className="w-10 text-center font-mono font-black text-xs text-primary bg-transparent focus:outline-none"
                      title="Ubah Bobot Persentase Penyerapan Materi"
                    />
                    <span className="text-[10px] font-bold text-muted-foreground">%</span>
                  </div>
                </div>
              </th>

              {/* 2. Kolom Pemahaman Konsep */}
              <th className="py-2 px-3 text-center min-w-[125px] sticky top-0 z-30 bg-slate-100 dark:bg-slate-900 border-b-2 border-border/90">
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-foreground font-black text-xs">Konsep</span>
                  <div className="flex items-center gap-1 bg-background dark:bg-slate-950 px-1.5 py-0.5 rounded-md border border-border/80 hover:border-primary/60 focus-within:border-primary shadow-xs transition-colors">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={weights.pemahaman_konsep}
                      onChange={(e) => handleWeightChange("pemahaman_konsep", parseInt(e.target.value, 10))}
                      className="w-10 text-center font-mono font-black text-xs text-primary bg-transparent focus:outline-none"
                      title="Ubah Bobot Persentase Pemahaman Konsep"
                    />
                    <span className="text-[10px] font-bold text-muted-foreground">%</span>
                  </div>
                </div>
              </th>

              {/* 3. Kolom Kemampuan Menjelaskan */}
              <th className="py-2 px-3 text-center min-w-[125px] sticky top-0 z-30 bg-slate-100 dark:bg-slate-900 border-b-2 border-border/90">
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-foreground font-black text-xs">Penjelasan</span>
                  <div className="flex items-center gap-1 bg-background dark:bg-slate-950 px-1.5 py-0.5 rounded-md border border-border/80 hover:border-primary/60 focus-within:border-primary shadow-xs transition-colors">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={weights.kemampuan_menjelaskan}
                      onChange={(e) => handleWeightChange("kemampuan_menjelaskan", parseInt(e.target.value, 10))}
                      className="w-10 text-center font-mono font-black text-xs text-primary bg-transparent focus:outline-none"
                      title="Ubah Bobot Persentase Kemampuan Menjelaskan"
                    />
                    <span className="text-[10px] font-bold text-muted-foreground">%</span>
                  </div>
                </div>
              </th>

              {/* 4. Kolom Implementasi Algoritma */}
              <th className="py-2 px-3 text-center min-w-[125px] sticky top-0 z-30 bg-slate-100 dark:bg-slate-900 border-b-2 border-border/90">
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-foreground font-black text-xs">Algoritma</span>
                  <div className="flex items-center gap-1 bg-background dark:bg-slate-950 px-1.5 py-0.5 rounded-md border border-border/80 hover:border-primary/60 focus-within:border-primary shadow-xs transition-colors">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={weights.implementasi_algoritma}
                      onChange={(e) => handleWeightChange("implementasi_algoritma", parseInt(e.target.value, 10))}
                      className="w-10 text-center font-mono font-black text-xs text-primary bg-transparent focus:outline-none"
                      title="Ubah Bobot Persentase Implementasi Algoritma"
                    />
                    <span className="text-[10px] font-bold text-muted-foreground">%</span>
                  </div>
                </div>
              </th>

              {/* 5. Kolom Implementasi Kode */}
              <th className="py-2 px-3 text-center min-w-[125px] sticky top-0 z-30 bg-slate-100 dark:bg-slate-900 border-b-2 border-border/90">
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-foreground font-black text-xs">Koding</span>
                  <div className="flex items-center gap-1 bg-background dark:bg-slate-950 px-1.5 py-0.5 rounded-md border border-border/80 hover:border-primary/60 focus-within:border-primary shadow-xs transition-colors">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={weights.implementasi_kode}
                      onChange={(e) => handleWeightChange("implementasi_kode", parseInt(e.target.value, 10))}
                      className="w-10 text-center font-mono font-black text-xs text-primary bg-transparent focus:outline-none"
                      title="Ubah Bobot Persentase Implementasi Kode"
                    />
                    <span className="text-[10px] font-bold text-muted-foreground">%</span>
                  </div>
                </div>
              </th>

              {/* Nilai Akhir */}
              <th className="py-2.5 px-4 text-center min-w-[120px] sticky top-0 z-30 bg-slate-100 dark:bg-slate-900 border-b-2 border-border/90">
                Nilai Akhir
              </th>

              {/* Catatan Dosen */}
              <th className="py-2.5 px-3 min-w-[280px] sm:min-w-[320px] sticky top-0 z-30 bg-slate-100 dark:bg-slate-900 border-b-2 border-border/90">
                <div className="flex items-center justify-between">
                  <span>Catatan Evaluasi Dosen</span>
                  <span className="text-[10px] font-normal text-muted-foreground hidden lg:inline">
                    (Klik ⛶ untuk editor luas)
                  </span>
                </div>
              </th>

              {/* Aksi */}
              <th className="py-2.5 px-4 text-center min-w-[90px] sticky top-0 z-30 bg-slate-100 dark:bg-slate-900 border-b-2 border-border/90">
                Aksi
              </th>
            </tr>
          </thead>

          {/* TBODY DENGAN ROW MAHASISWA */}
          <tbody className="divide-y divide-border/60">
            {loading ? (
              <tr>
                <td colSpan={10} className="py-20 text-center text-muted-foreground">
                  <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-xs font-medium">Memuat data nilai mahasiswa...</p>
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-16 text-center text-muted-foreground">
                  Tidak ada mahasiswa yang sesuai dengan filter pencarian.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student, index) => {
                const isSavingThis = savingStudentId === student.id;

                return (
                  <tr
                    key={student.id}
                    className={`hover:bg-muted/30 transition-colors ${
                      student.isDirty ? "bg-amber-500/5 dark:bg-amber-950/10" : ""
                    }`}
                  >
                    {/* Nomor Urut */}
                    <td className="py-3 px-3 text-center font-mono text-xs text-muted-foreground">
                      {index + 1}
                    </td>

                    {/* Nama & NIM Mahasiswa */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-foreground text-sm leading-tight">
                        {student.full_name}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5 flex items-center gap-2">
                        <span>{student.nim || "NIM -"}</span>
                        {student.isDirty ? (
                          <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-600 dark:text-amber-400">
                            Diubah
                          </span>
                        ) : student.isGraded ? (
                          <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            ✓ Tersimpan
                          </span>
                        ) : (
                          <span className="inline-block px-1.5 py-0.2 rounded text-[10px] text-muted-foreground/70">
                            Belum dinilai
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Input 5 Aspek */}
                    <td className="py-3 px-2 text-center">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={student.aspectScores.penyerapan_materi || ""}
                        onChange={(e) =>
                          handleScoreChange(student.id, "penyerapan_materi", parseFloat(e.target.value))
                        }
                        placeholder="0"
                        className="w-16 px-2 py-1.5 text-center font-mono font-bold text-sm bg-background border border-border/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                      />
                    </td>

                    <td className="py-3 px-2 text-center">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={student.aspectScores.pemahaman_konsep || ""}
                        onChange={(e) =>
                          handleScoreChange(student.id, "pemahaman_konsep", parseFloat(e.target.value))
                        }
                        placeholder="0"
                        className="w-16 px-2 py-1.5 text-center font-mono font-bold text-sm bg-background border border-border/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                      />
                    </td>

                    <td className="py-3 px-2 text-center">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={student.aspectScores.kemampuan_menjelaskan || ""}
                        onChange={(e) =>
                          handleScoreChange(student.id, "kemampuan_menjelaskan", parseFloat(e.target.value))
                        }
                        placeholder="0"
                        className="w-16 px-2 py-1.5 text-center font-mono font-bold text-sm bg-background border border-border/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                      />
                    </td>

                    <td className="py-3 px-2 text-center">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={student.aspectScores.implementasi_algoritma || ""}
                        onChange={(e) =>
                          handleScoreChange(student.id, "implementasi_algoritma", parseFloat(e.target.value))
                        }
                        placeholder="0"
                        className="w-16 px-2 py-1.5 text-center font-mono font-bold text-sm bg-background border border-border/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                      />
                    </td>

                    <td className="py-3 px-2 text-center">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={student.aspectScores.implementasi_kode || ""}
                        onChange={(e) =>
                          handleScoreChange(student.id, "implementasi_kode", parseFloat(e.target.value))
                        }
                        placeholder="0"
                        className="w-16 px-2 py-1.5 text-center font-mono font-bold text-sm bg-background border border-border/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                      />
                    </td>

                    {/* Nilai Akhir & Badge */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <span className="font-mono text-base font-black text-foreground">
                          {student.finalScore}
                        </span>
                        <div
                          className="px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider text-white shadow-sm flex items-center gap-1"
                          style={{ backgroundColor: student.badge.hexColor }}
                          title={`Kategori: ${student.badge.category} (Min: ${student.badge.minScore})`}
                        >
                          <span>{student.badge.level}</span>
                          <span className="text-[9px] font-medium opacity-90 hidden xl:inline">
                            • {student.badge.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Catatan / Feedback Dosen */}
                    <td className="py-2.5 px-3 min-w-[280px] sm:min-w-[320px]">
                      <div className="relative group">
                        <textarea
                          rows={2}
                          placeholder="Tulis catatan evaluasi..."
                          value={student.notes}
                          onChange={(e) => handleNotesChange(student.id, e.target.value)}
                          className="w-full pl-2.5 pr-8 py-1.5 text-xs bg-background border border-border/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-y min-h-[46px] leading-relaxed transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setActiveNoteStudentId(student.id)}
                          className="absolute right-2 top-2 p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors cursor-pointer"
                          title="Buka Editor Catatan Luas & Bank Saran Cepat"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Aksi Simpan Per Siswa */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => saveSingleStudent(student)}
                        disabled={isSavingThis}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          student.isDirty
                            ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
                            : "border border-border bg-background hover:bg-secondary text-foreground"
                        } disabled:opacity-50`}
                        title="Simpan Nilai Mahasiswa Ini"
                      >
                        {isSavingThis ? "..." : student.isDirty ? "Simpan" : "Update"}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </main>

      {/* ============================================================== */}
      {/* 6. BOTTOM STATUS BAR: SKALA 9 CAPAIAN RESMI                    */}
      {/* ============================================================== */}
      <footer className="flex-shrink-0 border-t border-border/60 bg-card px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground z-30">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-foreground flex items-center gap-1 text-[11px]">
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            <span>Skala Capaian:</span>
          </span>
          <div className="flex flex-wrap items-center gap-1 font-mono">
            {BADGE_CONFIGS.map((b) => {
              const minScore = thresholds[b.level as keyof GradeThresholds] ?? b.minScore;
              return (
                <div
                  key={b.level}
                  className="px-1.5 py-0.2 rounded text-[10px] font-bold text-white shadow-xs flex items-center gap-0.5"
                  style={{ backgroundColor: b.hexColor }}
                >
                  <span>{b.level}</span>
                  <span className="text-[8px] opacity-90">(≥{minScore})</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1">
            <Info className="w-3 h-3 text-primary" />
            <span>Header tabel terkunci permanen di atas layar saat digulir</span>
          </span>
          <span>•</span>
          <span className="font-mono text-foreground font-bold">
            Total {students.length} Mahasiswa
          </span>
        </div>
      </footer>

      {/* ============================================================== */}
      {/* 7. MODAL EDITOR CATATAN EVALUASI MAHASISWA (LEGA & LUAS)        */}
      {/* ============================================================== */}
      <AnimatePresence>
        {activeNoteStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-border/80 bg-muted/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-primary text-sm">
                    {activeNoteStudent.full_name
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-foreground leading-tight">
                      {activeNoteStudent.full_name}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono">
                      {activeNoteStudent.nim || "NIM belum terdaftar"} • {examType}
                    </p>
                  </div>
                </div>

                {/* Navigasi Mahasiswa Sebelumnya / Selanjutnya */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrevStudent}
                    disabled={activeStudentIndex <= 0}
                    className="p-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                    title="Mahasiswa Sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono font-bold text-muted-foreground px-1">
                    {activeStudentIndex + 1} / {filteredStudents.length}
                  </span>
                  <button
                    onClick={handleNextStudent}
                    disabled={activeStudentIndex >= filteredStudents.length - 1}
                    className="p-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                    title="Mahasiswa Berikutnya"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="w-px h-5 bg-border mx-1" />
                  <button
                    onClick={() => setActiveNoteStudentId(null)}
                    className="p-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    title="Tutup (Esc)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 space-y-4 overflow-y-auto flex-1">
                {/* Scoreboard Ringkas Mahasiswa */}
                <div className="p-3 rounded-xl border border-border/80 bg-background flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">
                      Penyerapan: <strong>{activeNoteStudent.aspectScores.penyerapan_materi}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium">
                      Konsep: <strong>{activeNoteStudent.aspectScores.pemahaman_konsep}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                      Penjelasan: <strong>{activeNoteStudent.aspectScores.kemampuan_menjelaskan}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                      Algoritma: <strong>{activeNoteStudent.aspectScores.implementasi_algoritma}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-medium">
                      Koding: <strong>{activeNoteStudent.aspectScores.implementasi_kode}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Nilai Akhir:</span>
                    <span className="text-lg font-black font-mono text-foreground">
                      {activeNoteStudent.finalScore}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded text-xs font-black text-white"
                      style={{ backgroundColor: activeNoteStudent.badge.hexColor }}
                    >
                      {activeNoteStudent.badge.level} ({activeNoteStudent.badge.category})
                    </span>
                  </div>
                </div>

                {/* Textarea Catatan Evaluasi yang Luas */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-bold text-foreground flex items-center gap-1.5">
                      <MessageSquarePlus className="w-4 h-4 text-primary" />
                      <span>Catatan Evaluasi &amp; Umpan Balik Dosen Pengampu:</span>
                    </label>
                    <span className="text-muted-foreground font-mono text-[11px]">
                      {(activeNoteStudent.notes || "").length} karakter
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    placeholder="Tuliskan evaluasi mendalam, saran perbaikan akademis, serta apresiasi pencapaian mahasiswa di sini... (Catatan ini dapat dibaca oleh mahasiswa di halaman rekap nilai)"
                    value={activeNoteStudent.notes}
                    onChange={(e) => handleNotesChange(activeNoteStudent.id, e.target.value)}
                    className="w-full p-3.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed shadow-inner"
                  />
                </div>

                {/* Bank Frasa Saran Cepat (One-Click Pedagogical Feedback) */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Bank Frasa Masukan Pedagogis (Klik untuk Menambahkan):</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_FEEDBACK_TEMPLATES.map((tmpl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAppendFeedback(tmpl)}
                        className="text-left text-[11px] px-2.5 py-1 rounded-lg border border-border/80 bg-background hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all cursor-pointer text-muted-foreground"
                        title="Klik untuk menambahkan kalimat ini ke catatan"
                      >
                        + {tmpl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-border/80 bg-muted/20 flex items-center justify-between gap-3">
                <div className="text-xs text-muted-foreground">
                  {activeNoteStudent.isDirty ? (
                    <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                      Perubahan belum disimpan ke server
                    </span>
                  ) : activeNoteStudent.isGraded ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Tersimpan di server
                    </span>
                  ) : (
                    <span>Siap dinilai</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => saveSingleStudent(activeNoteStudent)}
                    disabled={savingStudentId === activeNoteStudent.id}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>
                      {savingStudentId === activeNoteStudent.id
                        ? "Menyimpan..."
                        : "Simpan Nilai Mahasiswa Ini"}
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveNoteStudentId(null)}
                    className="px-3.5 py-2 rounded-xl border border-border bg-background hover:bg-secondary text-foreground text-xs font-bold transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
