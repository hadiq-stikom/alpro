"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FlaskConical, 
  Printer, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Activity, 
  ArrowLeft,
  ChevronDown,
  Play,
  Terminal,
  Clock,
  BookOpen,
  UserCheck,
  Lock,
  AlertTriangle,
  Loader2,
  Bot,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Search,
  Tag,
  Lightbulb,
  Filter,
  Cpu
} from "lucide-react";
import { PRAKTIKUM_MODULES, ObservationRow } from "@/lib/praktikum-data";
import { useAuth } from "@/context/AuthContext";
import PraktikumWorkbench from "@/components/praktikum/PraktikumWorkbench";
import PraktikumWarmupCard from "@/components/praktikum/PraktikumWarmupCard";

export interface AiEvaluationResult {
  score: number;
  status: 'Memenuhi Standar' | 'Perlu Perbaikan';
  canPrint: boolean;
  integrity?: {
    authenticityScore: number;
    isAuthentic: boolean;
    stylometricNotes: string;
    wpmComparison?: {
      currentWpm: number;
      baselineWpm: number;
      ratio: number;
    };
  };
  summaryFeedback: string;
  feedbackAnalisis: {
    itemNo: number;
    status: 'Kuat' | 'Cukup' | 'Kurang';
    note: string;
  }[];
  feedbackKesimpulan: {
    status: 'Kuat' | 'Cukup' | 'Kurang';
    note: string;
  };
  provider?: string;
  evaluatedAt?: string;
}

/**
 * Helper untuk memberikan penekanan tipografi dan visual pada kata kunci teknis,
 * simbol memori, kode fungsi, dan metrik kapasitas dalam uraian Dasar Teori.
 */
function renderHighlightedText(text: string) {
  if (!text) return null;

  // Regex pattern komprehensif untuk seluruh Modul Praktikum 1 s.d. 7
  const regex = /(pointer ke alamat memori fisik RAM|pointer \(referensi alamat\)|Random Access Memory \(RAM\)|alokasi byte memori fisik|mantissa 52-bit|integer truncation|String Concatenation|Explicit Type Casting|Float Division|Floor Division|float division|integer division|hardware trap|defensive pre-condition check|defensive pre-condition|Data Dependency|Read-After-Write|Boundary Value Analysis|Boundary Value Coverage|Off-by-One|Dead Code|Short-Circuit Evaluation|Short-Circuit|Loop Invariant|Infinite Loop|Circuit Breaker|Single Responsibility|Scope Isolation|Call Stack|Stack Frame|Pure Function|Variable Shadowing|Mutable Default Argument|Dynamic Array|Over-allocation Buffer|Zero-Based Indexing|Aliasing Bug|Pointer Aliasing|Hash Table|Key-Value Pairs|Key Uniqueness|Hashability|Defensive Coding|Defensive Access|Amortized O\(1\)|Linear Search|Binary Search|ZeroDivisionError|IndexError|KeyError|NameError|TypeError|IEEE 754|PyObject|Program Counter|PEMDAS|sys\.getsizeof\(\)|type\(\)|input\(\)|int\(\)|float\(\)|math\.isclose\(\)|round\(\)|range\(\)|append\(\)|insert\(\)|\.copy\(\)|\.get\(\)|\.pop\(\)|hash\(\)|id\(\)|28 byte|24 byte|56 byte|88 byte|120 byte|52-bit|64-bit|100\.000|50\.000|10\.000|0\.30000000000000004|0\.1 \+ 0\.2|10 \/\/ 4|10 \/ 4|'75' \+ '25'|int\('75'\) \+ int\('25'\)|'50' \+ '25'|'5025'|x \/ 0|a, b = b, a|O\(1\)|O\(N\)|O\(N\^2\)|O\(N²\)|O\(log N\)|break|continue|return|NoneType|None|True|False|==|!=|\/\/|Tipe Data|ALU|Tabel Pengamatan Bagian C|Bagian D|Bagian E)/g;

  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (!part) return null;

    // Metrik Memori & Kapasitas Byte / Skala (Warna Amber Kontras Tinggi)
    if (
      part === "28 byte" ||
      part === "24 byte" ||
      part === "56 byte" ||
      part === "88 byte" ||
      part === "120 byte" ||
      part === "52-bit" ||
      part === "64-bit" ||
      part === "100.000" ||
      part === "50.000" ||
      part === "10.000"
    ) {
      return (
        <span
          key={i}
          className="inline-block px-1.5 py-0.2 mx-0.5 rounded font-mono text-[11px] font-black bg-amber-500/15 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-500/30"
        >
          {part}
        </span>
      );
    }

    // Kode Fungsi, Identifier Teknis & Kompleksitas Algoritma (Warna Cyan / Blue Jewel)
    if (
      part === "type()" ||
      part === "sys.getsizeof()" ||
      part === "PyObject" ||
      part === "Program Counter" ||
      part === "PEMDAS" ||
      part === "IEEE 754" ||
      part === "ZeroDivisionError" ||
      part === "IndexError" ||
      part === "KeyError" ||
      part === "NameError" ||
      part === "TypeError" ||
      part === "input()" ||
      part === "int()" ||
      part === "float()" ||
      part === "math.isclose()" ||
      part === "round()" ||
      part === "range()" ||
      part === "append()" ||
      part === "insert()" ||
      part === ".copy()" ||
      part === ".get()" ||
      part === ".pop()" ||
      part === "hash()" ||
      part === "id()" ||
      part === "a, b = b, a" ||
      part === "O(1)" ||
      part === "O(N)" ||
      part === "O(N^2)" ||
      part === "O(N²)" ||
      part === "O(log N)" ||
      part === "break" ||
      part === "continue" ||
      part === "return" ||
      part === "NoneType" ||
      part === "None" ||
      part === "0.30000000000000004" ||
      part === "0.1 + 0.2" ||
      part === "10 // 4" ||
      part === "10 / 4" ||
      part === "'75' + '25'" ||
      part === "int('75') + int('25')" ||
      part === "'50' + '25'" ||
      part === "'5025'" ||
      part === "x / 0" ||
      part === "==" ||
      part === "!=" ||
      part === "//" ||
      part === "ALU" ||
      part === "mantissa 52-bit"
    ) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.2 mx-0.5 rounded font-mono text-[11px] font-bold bg-cyan-500/10 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-500/25"
        >
          {part}
        </code>
      );
    }

    // Nilai Boolean Status (Emerald)
    if (part === "True" || part === "False") {
      return (
        <span
          key={i}
          className="inline-block px-1.5 py-0.2 mx-0.5 rounded font-mono text-[11px] font-black bg-emerald-500/15 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30"
        >
          {part}
        </span>
      );
    }

    // Konsep Inti Penting (Bold + Underline Aksen)
    if (
      part === "pointer ke alamat memori fisik RAM" ||
      part === "pointer (referensi alamat)" ||
      part === "Random Access Memory (RAM)" ||
      part === "Tipe Data" ||
      part === "alokasi byte memori fisik" ||
      part === "integer truncation" ||
      part === "String Concatenation" ||
      part === "Explicit Type Casting" ||
      part === "Float Division" ||
      part === "Floor Division" ||
      part === "float division" ||
      part === "integer division" ||
      part === "hardware trap" ||
      part === "defensive pre-condition check" ||
      part === "defensive pre-condition" ||
      part === "Data Dependency" ||
      part === "Read-After-Write" ||
      part === "Boundary Value Analysis" ||
      part === "Boundary Value Coverage" ||
      part === "Off-by-One" ||
      part === "Dead Code" ||
      part === "Short-Circuit Evaluation" ||
      part === "Short-Circuit" ||
      part === "Loop Invariant" ||
      part === "Infinite Loop" ||
      part === "Circuit Breaker" ||
      part === "Single Responsibility" ||
      part === "Scope Isolation" ||
      part === "Call Stack" ||
      part === "Stack Frame" ||
      part === "Pure Function" ||
      part === "Variable Shadowing" ||
      part === "Mutable Default Argument" ||
      part === "Dynamic Array" ||
      part === "Over-allocation Buffer" ||
      part === "Zero-Based Indexing" ||
      part === "Aliasing Bug" ||
      part === "Pointer Aliasing" ||
      part === "Hash Table" ||
      part === "Key-Value Pairs" ||
      part === "Key Uniqueness" ||
      part === "Hashability" ||
      part === "Defensive Coding" ||
      part === "Defensive Access" ||
      part === "Amortized O(1)" ||
      part === "Linear Search" ||
      part === "Binary Search" ||
      part === "Tabel Pengamatan Bagian C" ||
      part === "Bagian D" ||
      part === "Bagian E"
    ) {
      return (
        <strong
          key={i}
          className="font-extrabold text-slate-900 dark:text-white underline decoration-cyan-500/50 decoration-2 underline-offset-2"
        >
          {part}
        </strong>
      );
    }

    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export default function PraktikumWorksheetPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const moduleId = parseInt(unwrappedParams.id, 10);
  const moduleData = PRAKTIKUM_MODULES.find((m) => m.id === moduleId);

  const { profile } = useAuth();

  // State Identitas
  const [studentName, setStudentName] = useState("");
  const [studentNim, setStudentNim] = useState("");
  const [studentClass, setStudentClass] = useState("TI-SP1");
  const [labDate, setLabDate] = useState("");

  // State Tabel Pengamatan C
  const [observations, setObservations] = useState<ObservationRow[]>([]);

  // State Analisis D & Kesimpulan E
  const [analisisAnswers, setAnalisisAnswers] = useState<string[]>([]);
  const [kesimpulanText, setKesimpulanText] = useState("");

  // State Evaluasi AI Reviewer
  const [aiEvaluation, setAiEvaluation] = useState<AiEvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalError, setEvalError] = useState<string | null>(null);

  // State Telemetri Ketikan & Keaslian (Forensik Stylometri)
  const [keystrokesCount, setKeystrokesCount] = useState(0);
  const [backspacesCount, setBackspacesCount] = useState(0);
  const [burstAttemptsCount, setBurstAttemptsCount] = useState(0);
  const [tabSwitchesCount, setTabSwitchesCount] = useState(0);
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);

  // State Tanda Tangan & Pengajuan Konsultasi ke Dosen
  const [studentSignature, setStudentSignature] = useState<string | null>(null);
  const [storedProfileSignature, setStoredProfileSignature] = useState<string | null>(null);
  const [saveSigToProfile, setSaveSigToProfile] = useState<boolean>(true);
  const [submissionStatus, setSubmissionStatus] = useState<'draft' | 'diajukan' | 'perlu_revisi' | 'disetujui'>('draft');
  const [lecturerScore, setLecturerScore] = useState<number | null>(null);
  const [lecturerFeedback, setLecturerFeedback] = useState<string | null>(null);
  const [lecturerSignature, setLecturerSignature] = useState<string | null>(null);
  const [lecturerSignedAt, setLecturerSignedAt] = useState<string | null>(null);
  const [isSubmittingConsultation, setIsSubmittingConsultation] = useState(false);
  const [consultationMessage, setConsultationMessage] = useState<string | null>(null);

  // State Golden Baseline Keaslian Ketikan (Refleksi Pemanasan On-Demand)
  const [hasBaseline, setHasBaseline] = useState<boolean>(true); // default true agar tidak flicker saat memuat
  const [isBaselineLoading, setIsBaselineLoading] = useState<boolean>(true);
  const [isWarmupCompletedInSession, setIsWarmupCompletedInSession] = useState<boolean>(false);

  // State UI & Validasi Anti Copy-Paste
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isTheoryOpen, setIsTheoryOpen] = useState(true);
  const [isProcedureOpen, setIsProcedureOpen] = useState(false);
  const [pasteWarning, setPasteWarning] = useState<string | null>(null);

  // Validasi kelengkapan isian Analisis & Kesimpulan untuk tombol cetak
  const totalAnalisisPrompts = moduleData?.analisisPrompts.length || 0;
  const filledAnalisisCount = analisisAnswers.filter((a) => a && a.trim().length > 0).length;
  const isAnalisisComplete = totalAnalisisPrompts > 0 && filledAnalisisCount === totalAnalisisPrompts;
  const isKesimpulanComplete = Boolean(kesimpulanText && kesimpulanText.trim().length > 0);
  
  // Akses formulir Analisis & Kesimpulan terbuka jika baseline sudah ada, atau baru diselesaikan di sesi ini, atau sudah disubmit/disetujui
  const isFormUnlocked = hasBaseline || isWarmupCompletedInSession || submissionStatus === 'disetujui' || submissionStatus === 'diajukan';

  // Syarat tombol cetak aktif: Analisis & Kesimpulan lengkap DAN dinyatakan "Memenuhi Standar" oleh AI
  const canPrint = Boolean(
    isAnalisisComplete && 
    isKesimpulanComplete && 
    ((aiEvaluation && aiEvaluation.canPrint) || submissionStatus === 'disetujui')
  );

  // Perekam telemetri ketukan tombol
  const handleTrackKeyInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!typingStartTime) {
      setTypingStartTime(Date.now());
    }
    if (e.key === "Backspace" || e.key === "Delete") {
      setBackspacesCount((prev) => prev + 1);
    } else if (e.key.length === 1 || e.key === "Enter") {
      setKeystrokesCount((prev) => prev + 1);
    }
  };

  // Handler anti copy-paste & burst detection
  const handlePreventPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    setBurstAttemptsCount((prev) => prev + 1);
    setPasteWarning("⚠️ Demi integritas akademik, Anda diwajibkan mengetik kata per kata secara mandiri. Fitur tempel (paste) dinonaktifkan!");
    setTimeout(() => {
      setPasteWarning(null);
    }, 4500);
  };

  const handlePreventCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
    setPasteWarning("⚠️ Fitur salin (copy) teks materi dinonaktifkan!");
    setTimeout(() => {
      setPasteWarning(null);
    }, 3000);
  };

  // Pantau perpindahan tab window
  useEffect(() => {
    const handleVis = () => {
      if (document.hidden) {
        setTabSwitchesCount((prev) => prev + 1);
      }
    };
    document.addEventListener("visibilitychange", handleVis);
    return () => document.removeEventListener("visibilitychange", handleVis);
  }, []);

  // State Mini Simulator / Tester
  const [testCodeInput, setTestCodeInput] = useState("10 // 4");
  const [testCodeOutput, setTestCodeOutput] = useState<string | null>(null);

  // State Terintegrasi Lab Workbench
  const [workbenchCodeTrigger, setWorkbenchCodeTrigger] = useState<{
    code: string;
    timestamp: number;
  } | null>(null);
  const [activeTargetRow, setActiveTargetRow] = useState<number>(1);

  // State Filter & Pencarian Dasar Teori
  const [theoryCategoryFilter, setTheoryCategoryFilter] = useState<string>("Semua");
  const [theorySearchQuery, setTheorySearchQuery] = useState<string>("");

  // Inisialisasi data profil dan draf tersimpan
  useEffect(() => {
    // Tanggal hari ini
    const today = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setLabDate(today);

    if (profile) {
      setStudentName(profile.full_name || "");
      setStudentNim(profile.nim || "");
    }

    if (!moduleData) return;

    const storageKey = `lkp_draft_m${moduleId}_${profile?.nim || "local"}`;
    const savedDraft = localStorage.getItem(storageKey);

    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setObservations(parsed.observations || moduleData.defaultObservations);
        setAnalisisAnswers(parsed.analisisAnswers || Array(moduleData.analisisPrompts.length).fill(""));
        setKesimpulanText(parsed.kesimpulanText || "");
        if (parsed.aiEvaluation) setAiEvaluation(parsed.aiEvaluation);
        setLastSavedTime(parsed.savedAt || null);
        if (parsed.studentName) setStudentName(parsed.studentName);
        if (parsed.studentNim) setStudentNim(parsed.studentNim);
        if (parsed.studentClass) setStudentClass(parsed.studentClass);
        if (parsed.studentSignature) setStudentSignature(parsed.studentSignature);
        return;
      } catch (e) {
        console.error("Gagal membaca draf lokal:", e);
      }
    }

    // Default jika belum ada draf
    setObservations(moduleData.defaultObservations);
    setAnalisisAnswers(Array(moduleData.analisisPrompts.length).fill(""));
  }, [moduleId, moduleData, profile]);

  // Sinkronisasi data remote submission dan tanda tangan tersimpan
  useEffect(() => {
    if (!profile?.id) {
      setIsBaselineLoading(false);
      return;
    }
    fetch(`/api/praktikum/submission?userId=${profile.id}&moduleId=${moduleId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (data.storedSignature) {
            setStoredProfileSignature(data.storedSignature);
          }
          if (data.hasBaseline !== undefined) {
            setHasBaseline(Boolean(data.hasBaseline));
          }
          setIsBaselineLoading(false);
          if (data.submission) {
            const sub = data.submission;
            setSubmissionStatus(sub.status || "draft");
            if (sub.student_signature) {
              setStudentSignature(sub.student_signature);
            } else if (data.storedSignature) {
              setStudentSignature(data.storedSignature);
            }
            if (sub.lecturer_score !== null && sub.lecturer_score !== undefined) {
              setLecturerScore(Number(sub.lecturer_score));
            }
            if (sub.lecturer_feedback) setLecturerFeedback(sub.lecturer_feedback);
            if (sub.lecturer_signature) setLecturerSignature(sub.lecturer_signature);
            if (sub.lecturer_signed_at) setLecturerSignedAt(sub.lecturer_signed_at);
            if (sub.ai_evaluation && Object.keys(sub.ai_evaluation).length > 0) {
              setAiEvaluation(sub.ai_evaluation);
            }
          } else if (data.storedSignature) {
            setStudentSignature(data.storedSignature);
          }
        } else {
          setIsBaselineLoading(false);
        }
      })
      .catch((err) => {
        console.warn("Gagal memuat status pengajuan remote:", err);
        setIsBaselineLoading(false);
      });
  }, [profile?.id, moduleId]);

  // Fungsi simpan draf ke LocalStorage & Supabase
  const handleSaveDraft = async () => {
    if (!moduleData) return;
    const nowStr = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    const storageKey = `lkp_draft_m${moduleId}_${profile?.nim || "local"}`;
    const payload = {
      moduleId,
      studentName,
      studentNim,
      studentClass,
      labDate,
      observations,
      analisisAnswers,
      kesimpulanText,
      aiEvaluation,
      studentSignature,
      savedAt: nowStr,
    };
    localStorage.setItem(storageKey, JSON.stringify(payload));
    setLastSavedTime(nowStr);

    // Sinkronisasi draf ke database Supabase jika pengguna sudah login
    if (profile?.id) {
      try {
        await fetch("/api/praktikum/submission", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: profile.id,
            classId: profile.class_id,
            moduleId,
            studentName,
            studentNim,
            studentClass,
            labDate,
            observations,
            analisisAnswers,
            kesimpulanText,
            aiEvaluation,
            studentSignature,
            action: "draft",
            saveSignatureToProfile: false,
          }),
        });
      } catch (err) {
        console.warn("Gagal autosave draf remote:", err);
      }
    }
  };

  // Evaluasi Analisis & Kesimpulan dengan AI Asisten Reviewer (Sokratik + Keaslian Ketikan)
  const handleEvaluateWithAI = async () => {
    if (!isAnalisisComplete || !isKesimpulanComplete) {
      alert("Harap lengkapi seluruh pertanyaan Analisis (Bagian D) dan Kesimpulan (Bagian E) sebelum meminta ulasan AI.");
      return;
    }

    setIsEvaluating(true);
    setEvalError(null);

    // Hitung telemetri ketikan praktikum
    const totalWords = (analisisAnswers.join(" ") + " " + kesimpulanText).trim().split(/\s+/).filter(Boolean).length;
    const elapsedSeconds = typingStartTime ? Math.max(15, Math.floor((Date.now() - typingStartTime) / 1000)) : 60;
    const calcWpm = Math.max(5, Math.round(totalWords / (elapsedSeconds / 60)));
    const calcBackspaceRatio = keystrokesCount > 0 ? Number((backspacesCount / keystrokesCount).toFixed(3)) : 0.12;

    try {
      const res = await fetch("/api/grade-praktikum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId,
          observations,
          analisisAnswers,
          kesimpulanText,
          userId: profile?.id,
          telemetry: {
            wpm: calcWpm,
            backspaceRatio: calcBackspaceRatio,
            burstAttempts: burstAttemptsCount,
            keystrokes: keystrokesCount,
            timeSpentSeconds: elapsedSeconds,
            tabSwitches: tabSwitchesCount,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal memproses ulasan AI.");
      }

      const nowStr = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
      const resultWithTime: AiEvaluationResult = {
        ...data,
        evaluatedAt: nowStr,
      };

      setAiEvaluation(resultWithTime);

      // Simpan juga ke localStorage
      const storageKey = `lkp_draft_m${moduleId}_${profile?.nim || "local"}`;
      const existing = localStorage.getItem(storageKey);
      const base = existing ? JSON.parse(existing) : {};
      localStorage.setItem(storageKey, JSON.stringify({
        ...base,
        aiEvaluation: resultWithTime,
        observations,
        analisisAnswers,
        kesimpulanText,
        studentName,
        studentNim,
        studentClass,
        studentSignature,
        labDate,
        savedAt: nowStr
      }));
      setLastSavedTime(nowStr);
    } catch (err: any) {
      console.error("AI Evaluation error:", err);
      setEvalError(err?.message || "Terjadi kendala saat menghubungi asisten AI.");
    } finally {
      setIsEvaluating(false);
    }
  };

  // Handler unggah file gambar tanda tangan mahasiswa
  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Format berkas harus berupa gambar (PNG, JPG, atau WebP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setStudentSignature(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Handler ajukan konsultasi ke dosen
  const handleSubmitConsultation = async () => {
    if (!studentSignature) {
      alert("Harap bubuhkan tanda tangan mahasiswa terlebih dahulu sebelum mengajukan laporan ke Dosen.");
      return;
    }
    if (!aiEvaluation || !aiEvaluation.canPrint) {
      alert("Laporan praktikum harus diuji dan memenuhi standar ilmiah kelayakan AI (skor >= 60) sebelum dapat diajukan ke Dosen.");
      return;
    }

    setIsSubmittingConsultation(true);
    setConsultationMessage(null);

    const totalWords = (analisisAnswers.join(" ") + " " + kesimpulanText).trim().split(/\s+/).filter(Boolean).length;
    const elapsedSeconds = typingStartTime ? Math.max(15, Math.floor((Date.now() - typingStartTime) / 1000)) : 60;
    const calcWpm = Math.max(5, Math.round(totalWords / (elapsedSeconds / 60)));
    const calcBackspaceRatio = keystrokesCount > 0 ? Number((backspacesCount / keystrokesCount).toFixed(3)) : 0.12;

    try {
      const res = await fetch("/api/praktikum/submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: profile?.id,
          classId: profile?.class_id,
          moduleId,
          studentName,
          studentNim,
          studentClass,
          labDate,
          observations,
          analisisAnswers,
          kesimpulanText,
          telemetry: {
            wpm: calcWpm,
            backspaceRatio: calcBackspaceRatio,
            burstAttempts: burstAttemptsCount,
            keystrokes: keystrokesCount,
            timeSpentSeconds: elapsedSeconds,
            tabSwitches: tabSwitchesCount,
          },
          aiEvaluation,
          studentSignature,
          action: "diajukan",
          saveSignatureToProfile: saveSigToProfile,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengajukan laporan praktikum.");
      }

      setSubmissionStatus("diajukan");
      setConsultationMessage("✓ Laporan praktikum berhasil diajukan untuk konsultasi ke Dosen Hadiq, ST, M.Kom! Silakan tunggu pemeriksaan dan pengesahan nilai.");
      if (saveSigToProfile && studentSignature) {
        setStoredProfileSignature(studentSignature);
      }
    } catch (err: any) {
      console.error("Gagal mengajukan konsultasi:", err);
      alert("Gagal mengajukan konsultasi: " + err.message);
    } finally {
      setIsSubmittingConsultation(false);
    }
  };

  // Update isi sel tabel pengamatan
  const handleObservationChange = (index: number, field: keyof ObservationRow, value: any) => {
    const updated = [...observations];
    updated[index] = { ...updated[index], [field]: value };
    setObservations(updated);
  };

  // Update jawaban analisis
  const handleAnalisisChange = (index: number, val: string) => {
    const updated = [...analisisAnswers];
    updated[index] = val;
    setAnalisisAnswers(updated);
  };

  // Reset tabel ke default praktikum
  const handleResetObservations = () => {
    if (confirm("Reset seluruh data tabel pengamatan ke nilai bawaan modul?")) {
      if (moduleData) {
        setObservations(moduleData.defaultObservations);
      }
    }
  };

  // Mini runner evaluator sederhana untuk demonstrasi interaktif
  const handleRunMiniTest = (overrideCode?: string) => {
    try {
      const codeToRun = (overrideCode !== undefined ? overrideCode : testCodeInput).trim();
      if (overrideCode !== undefined) {
        setTestCodeInput(overrideCode);
      }
      let res = "";
      if (codeToRun === "10 // 4") {
        res = "2 (tipe: integer) - 0.5 desimal terpotong (truncated)!";
      } else if (codeToRun === "10 / 4") {
        res = "2.5 (tipe: float) - pembagian pecahan presisi";
      } else if (codeToRun === "'50' + '25'") {
        res = "'5025' (tipe: string) - penggabungan teks (concatenation bug)";
      } else if (codeToRun === "int('50') + int('25')") {
        res = "75 (tipe: integer) - kalkulasi numerik setelah type casting";
      } else if (codeToRun.includes("/ 0") || codeToRun.includes("// 0")) {
        res = "ZeroDivisionError: division by zero (Interupsi Fatal / Crash)";
      } else if (codeToRun === "0.1 + 0.2") {
        res = "0.30000000000000004 (IEEE 754 floating point rounding artifact)";
      } else if (codeToRun.includes("type(100)") || codeToRun.includes("a = 100")) {
        res = "<class 'int'>, nilai: 100, alokasi memori fisik: 28 byte (PyObject)";
      } else if (codeToRun.includes("type(100.5)") || codeToRun.includes("b = 100.5")) {
        res = "<class 'float'>, nilai: 100.5, alokasi memori fisik: 24 byte (IEEE 754)";
      } else if (codeToRun === "bool(1)" || codeToRun.includes("type(True)")) {
        res = "<class 'bool'>, nilai: True, alokasi memori: 28 byte";
      } else if (codeToRun.includes("0.1 + 0.2 == 0.3")) {
        res = "False (Penyimpangan biner IEEE 754: 0.30000000000000004 != 0.3)";
      } else {
        res = `Ekspresi '${codeToRun}' berhasil diuji di memori.`;
      }
      setTestCodeOutput(res);
    } catch (e: any) {
      setTestCodeOutput(`Error: ${e.message}`);
    }
  };

  // Handler Salin Output Workbench ke Baris Tabel Pengamatan Terpilih
  const handleApplyWorkbenchOutput = (
    actualOutput: string,
    measuredMetric: string,
    targetRowNo: number
  ) => {
    const rowIdx = targetRowNo - 1;
    if (rowIdx >= 0 && rowIdx < observations.length) {
      setObservations((prev) => {
        const next = [...prev];
        const cur = next[rowIdx];
        let newStatus = cur.validationStatus;
        if (cur.expectedTheory && actualOutput) {
          const cleanTheory = cur.expectedTheory.toLowerCase().replace(/[^a-z0-9]/g, "");
          const cleanActual = actualOutput.toLowerCase().replace(/[^a-z0-9]/g, "");
          if (cleanActual.includes(cleanTheory) || cleanTheory.includes(cleanActual)) {
            newStatus = "Sesuai";
          }
        }
        next[rowIdx] = {
          ...cur,
          actualOutput: actualOutput,
          measuredMetric: measuredMetric || cur.measuredMetric,
          validationStatus: newStatus,
        };
        return next;
      });
      setActiveTargetRow(targetRowNo);
    }
  };

  // Fungsi pengiriman sintaks cepat langsung ke Workbench
  const handleSendToWorkbench = (code: string, rowTarget?: number) => {
    setWorkbenchCodeTrigger({ code, timestamp: Date.now() });
    if (rowTarget) {
      setActiveTargetRow(rowTarget);
    }
    const el = document.getElementById("praktikum-workbench-container");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Fungsi pengiriman sintaks cepat dari Dasar Teori langsung ke Simulator Helper
  const handleSendToSimulator = (code: string) => {
    handleSendToWorkbench(code);
  };

  if (!moduleData) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Modul Praktikum Tidak Ditemukan</h2>
        <Link href="/praktikum" className="text-cyan-500 hover:underline text-sm font-semibold">
          Kembali ke Daftar Modul
        </Link>
      </div>
    );
  }

  // Filter dan Pencarian Poin Dasar Teori
  const theoryPoints = moduleData.dasarTeori?.points || [];
  const filteredTheoryPoints = theoryPoints.filter((p) => {
    const matchesCategory =
      theoryCategoryFilter === "Semua" || p.category === theoryCategoryFilter;
    if (!matchesCategory) return false;

    if (!theorySearchQuery.trim()) return true;
    const q = theorySearchQuery.toLowerCase();
    const titleMatch = p.title.toLowerCase().includes(q);
    const descMatch = p.desc.toLowerCase().includes(q);
    const syntaxMatch = p.syntaxExample?.toLowerCase().includes(q) || false;
    const scenarioMatch = p.relatedScenarios?.toLowerCase().includes(q) || false;
    const keyTermsMatch = p.keyTerms?.some((k) => k.toLowerCase().includes(q)) || false;
    const leadMatch = p.leadSentence?.toLowerCase().includes(q) || false;
    const keyPointsMatch = p.keyPoints?.some((kp) => kp.label.toLowerCase().includes(q) || kp.detail.toLowerCase().includes(q)) || false;
    return titleMatch || descMatch || syntaxMatch || scenarioMatch || keyTermsMatch || leadMatch || keyPointsMatch;
  });

  const availableCategories = [
    "Semua",
    ...Array.from(
      new Set(
        theoryPoints
          .map((p) => p.category)
          .filter((c): c is string => Boolean(c))
      )
    ),
  ];

  return (
    <div 
      className="space-y-10 pb-20 select-none"
      onCopy={handlePreventCopy}
      onCut={handlePreventCopy}
    >
      {/* Toast Peringatan Anti Copy-Paste */}
      {pasteWarning && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3.5 rounded-2xl bg-amber-500/95 dark:bg-amber-600/95 text-white font-bold text-sm shadow-2xl flex items-center gap-3 backdrop-blur border-2 border-amber-300 animate-bounce">
          <AlertTriangle className="w-5 h-5 shrink-0 text-white" />
          <span>{pasteWarning}</span>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border/80 shadow-sm">
        <div className="flex items-center gap-3.5">
          <Link
            href="/praktikum"
            className="p-2.5 rounded-xl bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            title="Kembali ke Daftar Modul"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-cyan-500/15 text-cyan-500 dark:text-cyan-400 border border-cyan-500/30">
                LKP MODUL 0{moduleData.id}
              </span>
              {lastSavedTime && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Draf Tersimpan {lastSavedTime}
                </span>
              )}
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-foreground mt-1 tracking-tight">
              Lembar Kerja Praktikum: {moduleData.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleSaveDraft}
            className="px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-sm flex items-center gap-2 border border-border/70 transition-colors cursor-pointer shadow-sm"
          >
            <Save className="w-4 h-4 text-cyan-500" />
            <span>Simpan Draf</span>
          </button>

          {canPrint ? (
            <Link
              href={`/praktikum/${moduleData.id}/print`}
              target="_blank"
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all hover:gap-2.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Ekspor PDF A4</span>
            </Link>
          ) : (
            <div className="relative group">
              <button
                disabled
                className="px-4 py-2.5 rounded-xl bg-secondary/80 text-muted-foreground font-bold text-sm flex items-center gap-2 border border-border/80 cursor-not-allowed opacity-70"
                title="Lengkapi Analisis & Kesimpulan untuk membuka cetak"
              >
                <Lock className="w-4 h-4 text-amber-500" />
                <span>Cetak PDF (Terkunci)</span>
              </button>
              <div className="absolute right-0 top-full mt-2 hidden group-hover:block z-50 w-72 p-3 bg-slate-900 text-slate-200 text-xs rounded-xl shadow-2xl border border-slate-700 leading-relaxed pointer-events-none">
                🔒 <strong>Tombol Terkunci:</strong> Lengkapi seluruh pertanyaan <strong>Analisis ({filledAnalisisCount}/{totalAnalisisPrompts})</strong> dan <strong>Kesimpulan ({isKesimpulanComplete ? "✓" : "Kosong"})</strong> agar dokumen resmi siap dicetak.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Header Identitas Mahasiswa & Praktikum */}
      <div className="p-6 md:p-8 rounded-2xl bg-card border border-border/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/30">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Identitas Lembar Kerja Praktikan</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Data resmi yang akan dicetak pada kop laporan akhir praktikum.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/30">
            Semester Ganjil 2024/2025
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Nama Mahasiswa:</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground font-semibold text-sm focus:ring-2 focus:ring-cyan-500/40 focus:outline-none"
              placeholder="Nama Lengkap"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1.5">NIM (Nomor Induk):</label>
            <input
              type="text"
              value={studentNim}
              onChange={(e) => setStudentNim(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground font-mono font-bold text-sm focus:ring-2 focus:ring-cyan-500/40 focus:outline-none"
              placeholder="NIM"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Kelas Praktikum:</label>
            <input
              type="text"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-foreground font-semibold text-sm focus:ring-2 focus:ring-cyan-500/40 focus:outline-none"
              placeholder="contoh: TI-SP1"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Dosen Pengampu:</label>
            <div className="px-3.5 py-2.5 rounded-xl bg-secondary/60 border border-border/80 text-foreground font-bold text-sm">
              Hadiq, ST, M.Kom
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BAGIAN A: CAPAIAN PRAKTIKUM                                               */}
      {/* ========================================================================= */}
      <div className="p-6 md:p-8 rounded-2xl bg-card border border-border/80 shadow-sm space-y-5">
        <div className="flex items-center gap-3.5">
          <span className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-500 dark:text-cyan-400 font-mono font-black text-base flex items-center justify-center border border-cyan-500/30 shadow-sm">
            A
          </span>
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
              Capaian Praktikum (Learning Outcomes)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              Target kompetensi terukur yang harus dibuktikan melalui pengujian hari ini.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {moduleData.capaian.map((c, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-secondary/40 border border-border/80 flex items-start gap-3 text-sm md:text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                <strong className="text-cyan-600 dark:text-cyan-400 font-bold block mb-1">Target 0{idx + 1}:</strong> {c}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BAGIAN B: DASAR TEORI                                                     */}
      {/* ========================================================================= */}
      <div className="p-6 md:p-8 rounded-2xl bg-card border border-border/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div className="flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-mono font-black text-base flex items-center justify-center border border-cyan-500/30 shadow-sm">
              B
            </span>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
                  Dasar Teori &amp; Parameter Uji Laboratorium
                </h3>
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {theoryPoints.length} Pilar Teori Terpadu
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                Landasan ilmiah pengujian hipotesis, pemetaan konsep kunci, dan parameter ukur empiris.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setIsTheoryOpen(!isTheoryOpen)}
              className="px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 border border-border/70 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Buka / Tutup Teori"
            >
              <span>{isTheoryOpen ? "Tutup Teori" : "Buka Teori"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isTheoryOpen ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {isTheoryOpen && (
          <div className="space-y-6 pt-1">
            {/* Kartu Ringkasan Teori & Peta Konsep Kunci */}
            <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-secondary/40 via-card to-cyan-500/5 border border-cyan-500/20 shadow-sm space-y-4">
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  <BookOpen className="w-4 h-4 text-cyan-500" />
                  <span>Landasan Filosofis &amp; Hipotesis Pengukuran:</span>
                </div>

                {/* Paragraf Pengantar Beraksen (Bukan Flat Monokrom) */}
                <div className="p-4 rounded-xl bg-card border border-border/80 text-sm md:text-[15px] text-slate-800 dark:text-slate-100 leading-relaxed font-medium shadow-sm">
                  {renderHighlightedText(moduleData.dasarTeori.leadParagraph || moduleData.dasarTeori.overview)}
                </div>

                {/* 2 Pilar Fundamental yang Dikendalikan Pemilihan Tipe Data (Vertikal / 2 Kolom Terstruktur, Bukan Mendatar) */}
                {moduleData.dasarTeori.fundamentalPillars && moduleData.dasarTeori.fundamentalPillars.length > 0 && (
                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      <Cpu className="w-4 h-4 text-cyan-500" />
                      <span>2 Aspek Fundamental yang Dikendalikan Pemilihan Tipe Data:</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {moduleData.dasarTeori.fundamentalPillars.map((pillar) => {
                        const isFirst = pillar.number === 1;
                        const cardBorder = isFirst 
                          ? "border-cyan-500/35 bg-gradient-to-br from-cyan-500/10 via-card to-background hover:border-cyan-500/60" 
                          : "border-indigo-500/35 bg-gradient-to-br from-indigo-500/10 via-card to-background hover:border-indigo-500/60";
                        const badgeStyle = isFirst
                          ? "bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border-cyan-500/30"
                          : "bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border-indigo-500/30";
                        const tagStyle = isFirst
                          ? "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/25"
                          : "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/25";

                        return (
                          <div
                            key={pillar.number}
                            className={`p-4 rounded-xl border-2 ${cardBorder} shadow-sm transition-all space-y-2.5 flex flex-col justify-between`}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between flex-wrap gap-2">
                                <span className={`w-7 h-7 rounded-lg font-mono font-black text-xs flex items-center justify-center border ${badgeStyle}`}>
                                  #{pillar.number}
                                </span>
                                {pillar.tag && (
                                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-tight border ${tagStyle}`}>
                                    {pillar.tag}
                                  </span>
                                )}
                              </div>
                              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm md:text-base tracking-tight leading-snug">
                                {pillar.title}
                              </h4>
                            </div>

                            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                              {renderHighlightedText(pillar.desc)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Peta Konsep Kunci Cepat */}
              {moduleData.dasarTeori.keyConceptsSummary && moduleData.dasarTeori.keyConceptsSummary.length > 0 && (
                <div className="pt-2 border-t border-border/60 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-cyan-500" />
                      Peta Konsep Kunci Laboratorium (Klik untuk filter):
                    </span>
                    {theorySearchQuery && (
                      <button
                        onClick={() => setTheorySearchQuery("")}
                        className="text-[11px] text-cyan-500 hover:underline cursor-pointer"
                      >
                        Reset Filter
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {moduleData.dasarTeori.keyConceptsSummary.map((concept, idx) => {
                      const isActive = theorySearchQuery.toLowerCase() === concept.split(" ")[0].toLowerCase();
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            if (isActive) {
                              setTheorySearchQuery("");
                            } else {
                              setTheorySearchQuery(concept.split(" ")[0]);
                            }
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-mono font-bold tracking-tight border transition-all cursor-pointer flex items-center gap-1.5 ${
                            isActive
                              ? "bg-cyan-600 text-white border-cyan-600 shadow-md scale-105"
                              : "bg-background hover:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30 hover:border-cyan-500/50"
                          }`}
                        >
                          <span>🏷️</span>
                          <span>{concept}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bilah Pencarian & Kategori Filter */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-1">
              {/* Kategori Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 shrink-0 mr-1">
                  <Filter className="w-3.5 h-3.5" /> Kategori:
                </span>
                {availableCategories.map((cat, idx) => {
                  const isCatActive = theoryCategoryFilter === cat;
                  const count = cat === "Semua" ? theoryPoints.length : theoryPoints.filter(p => p.category === cat).length;
                  return (
                    <button
                      key={idx}
                      onClick={() => setTheoryCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                        isCatActive
                          ? "bg-cyan-600 text-white shadow-sm"
                          : "bg-secondary/60 hover:bg-secondary text-slate-700 dark:text-slate-300 border border-border/70"
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isCatActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Input Pencarian Kata Kunci */}
              <div className="relative w-full md:w-72 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={theorySearchQuery}
                  onChange={(e) => setTheorySearchQuery(e.target.value)}
                  placeholder="Cari konsep, operator, sintaks..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-background border border-border/80 text-foreground font-medium text-xs md:text-sm focus:outline-none focus:border-cyan-500 shadow-sm"
                />
                {theorySearchQuery && (
                  <button
                    onClick={() => setTheorySearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-foreground text-xs font-bold px-1"
                    title="Hapus pencarian"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Indikator Jumlah Hasil */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 font-medium">
              <span>
                Menampilkan <strong>{filteredTheoryPoints.length}</strong> dari <strong>{theoryPoints.length}</strong> pilar teori laboratorium
              </span>
              {(theoryCategoryFilter !== "Semua" || theorySearchQuery) && (
                <button
                  onClick={() => {
                    setTheoryCategoryFilter("Semua");
                    setTheorySearchQuery("");
                  }}
                  className="text-cyan-600 dark:text-cyan-400 hover:underline font-bold"
                >
                  Tampilkan Semua Konsep
                </button>
              )}
            </div>

            {/* Kartu-Kartu Poin Dasar Teori */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-1">
              {filteredTheoryPoints.map((p, idx) => {
                // Semantic accent color based on index or category
                const accentColors = [
                  "border-cyan-500/40 bg-cyan-500/5",
                  "border-indigo-500/40 bg-indigo-500/5",
                  "border-emerald-500/40 bg-emerald-500/5",
                  "border-rose-500/40 bg-rose-500/5",
                  "border-amber-500/40 bg-amber-500/5",
                  "border-purple-500/40 bg-purple-500/5",
                ];
                const badgePillColors = [
                  "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
                  "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
                  "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
                  "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
                  "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
                  "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30",
                ];
                const cardAccent = accentColors[idx % accentColors.length];
                const badgeColor = badgePillColors[idx % badgePillColors.length];

                return (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl bg-card border-2 ${cardAccent} shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between`}
                  >
                    <div className="space-y-3.5">
                      {/* Top Bar Kartu: Nomor Pilar, Judul, Kategori & Tautan Skenario */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`w-7 h-7 rounded-lg font-mono font-black text-xs flex items-center justify-center border ${badgeColor}`}>
                              #{idx + 1}
                            </span>
                            {p.category && (
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-tight bg-secondary border border-border text-slate-700 dark:text-slate-300">
                                {p.category}
                              </span>
                            )}
                          </div>
                          {p.relatedScenarios && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              {p.relatedScenarios}
                            </span>
                          )}
                        </div>

                        <h4 className="font-extrabold text-foreground text-base md:text-lg tracking-tight leading-snug">
                          {p.title}
                        </h4>
                      </div>

                      {/* Chip Konsep Kunci */}
                      {p.keyTerms && p.keyTerms.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-0.5 pb-1">
                          {p.keyTerms.map((term, tIdx) => (
                            <span
                              key={tIdx}
                              onClick={() => setTheorySearchQuery(term.replace(/[^a-zA-Z0-9/]/g, ''))}
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-cyan-500/10 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border border-cyan-500/25 font-mono text-[11px] font-bold tracking-tight hover:bg-cyan-500/20 cursor-pointer transition-colors"
                              title="Klik untuk menyaring dengan kata kunci ini"
                            >
                              <Tag className="w-2.5 h-2.5 text-cyan-500" />
                              {term}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* 1. Intisari Konsep (Lead Concept Callout) */}
                      <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-500/10 via-sky-500/5 to-transparent border-l-4 border-cyan-500 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-medium leading-relaxed shadow-sm">
                        <div className="flex items-center gap-1.5 text-[11px] font-black text-cyan-800 dark:text-cyan-400 uppercase tracking-wider mb-1">
                          <Sparkles className="w-3.5 h-3.5" /> Intisari Konsep:
                        </div>
                        <p className="leading-relaxed">
                          {renderHighlightedText(p.leadSentence || p.desc)}
                        </p>
                      </div>

                      {/* 2. Rincian Parameter & Poin Kunci (Structured Grid/Cards) */}
                      {p.keyPoints && p.keyPoints.length > 0 && (
                        <div className="space-y-2 pt-1">
                          <div className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-cyan-500" /> Parameter &amp; Rincian Kunci:
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            {p.keyPoints.map((kp, kpIdx) => (
                              <div
                                key={kpIdx}
                                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 transition-all hover:border-cyan-500/40 hover:bg-slate-100/80 dark:hover:bg-slate-900/90"
                              >
                                <span className="w-2 h-2 rounded-full bg-cyan-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                                <div className="space-y-0.5 flex-1 min-w-0">
                                  <div className="flex items-center justify-between flex-wrap gap-1.5">
                                    <span className="font-bold text-slate-900 dark:text-white">
                                      {kp.label}
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                      {kp.badge && (
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-500/30">
                                          {kp.badge}
                                        </span>
                                      )}
                                      {kp.code && (
                                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-200/80 dark:bg-slate-800 text-cyan-800 dark:text-cyan-300 border border-slate-300/80 dark:border-slate-700">
                                          {kp.code}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                                    {renderHighlightedText(kp.detail)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 3. Uraian Naratif Lengkap (Collapsible Accordion jika ada keyPoints, atau direct paragraph jika tanpa keyPoints) */}
                      {p.keyPoints && p.keyPoints.length > 0 ? (
                        <details className="group pt-1">
                          <summary className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer flex items-center gap-1.5 select-none transition-colors">
                            <ChevronDown className="w-3.5 h-3.5 transition-transform group-open:rotate-180" />
                            <span>Lihat Uraian Teori Naratif Lengkap</span>
                          </summary>
                          <div className="mt-2 p-3.5 rounded-xl bg-secondary/50 border border-border text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                            {renderHighlightedText(p.desc)}
                          </div>
                        </details>
                      ) : (
                        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 font-normal">
                          {renderHighlightedText(p.desc)}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3 pt-2">
                      {/* Catatan Analisis Laboratorium */}
                      {p.labInsight && (
                        <div className="p-3.5 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2.5 font-medium">
                          <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-amber-700 dark:text-amber-300">Catatan Analisis Lab: </span>
                            {p.labInsight}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tampilan Jika Pencarian Kosong */}
            {filteredTheoryPoints.length === 0 && (
              <div className="p-8 rounded-2xl bg-secondary/30 border border-border text-center space-y-3">
                <p className="text-sm text-muted-foreground font-medium">
                  Tidak ada konsep teori yang sesuai dengan kriteria &quot;{theorySearchQuery}&quot; pada kategori &quot;{theoryCategoryFilter}&quot;.
                </p>
                <button
                  onClick={() => {
                    setTheorySearchQuery("");
                    setTheoryCategoryFilter("Semua");
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs hover:bg-cyan-500 transition-colors cursor-pointer"
                >
                  Reset Filter &amp; Tampilkan Semua Teori
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* BAGIAN C: PRAKTIKUM (PROSEDUR & TABEL PENGAMATAN)                          */}
      {/* ========================================================================= */}
      <div id="tabel-pengamatan-container" className="p-6 md:p-8 rounded-2xl bg-card border border-cyan-500/40 shadow-md space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-cyan-600 text-white font-mono font-black text-base flex items-center justify-center shadow-md">
              C
            </span>
            <div>
              <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
                Praktikum: Langkah Kerja &amp; Tabel Pengamatan
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                Inti eksperimen laboratorium: jalankan skenario uji, ukur metriknya, dan catat ke tabel berikut.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsProcedureOpen(!isProcedureOpen)}
              className="px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 border border-border/70 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-cyan-500" />
              <span>{isProcedureOpen ? "Tutup Prosedur" : "Buka Prosedur Kerja"}</span>
            </button>
            <button
              onClick={handleResetObservations}
              className="px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 border border-border/70 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset ke nilai default"
            >
              <RotateCcw className="w-4 h-4 text-amber-500" />
              <span>Reset Tabel</span>
            </button>
          </div>
        </div>

        {/* Prosedur Kerja Collapsible */}
        {isProcedureOpen && (
          <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-secondary/40 via-card to-cyan-500/5 border border-cyan-500/25 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-foreground text-sm md:text-base tracking-tight leading-snug">
                    Prosedur Langkah Kerja Praktikum:
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    Panduan operasional eksekusi eksperimen laboratorium secara terstruktur
                  </p>
                </div>
              </div>

              {/* Phase Pipeline Pills */}
              <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-bold">
                <span className="px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-800 dark:text-sky-300 border border-sky-500/30">
                  1. Persiapan
                </span>
                <span className="text-slate-400">→</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-500/30">
                  2. 5 Kasus Uji
                </span>
                <span className="text-slate-400">→</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                  3. Catat Tabel C
                </span>
                <span className="text-slate-400">→</span>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-800 dark:text-purple-300 border border-purple-500/30">
                  4. Sintesis D &amp; E
                </span>
              </div>
            </div>

            {/* List / Grid Langkah Kerja */}
            <div className="space-y-3 pt-1">
              {moduleData.prosedurSteps && moduleData.prosedurSteps.length > 0 ? (
                moduleData.prosedurSteps.map((step) => {
                  const phaseColors: Record<string, { badge: string; card: string }> = {
                    Persiapan: {
                      badge: "bg-sky-500/15 text-sky-800 dark:text-sky-300 border-sky-500/30",
                      card: "border-sky-500/25 bg-gradient-to-r from-sky-500/5 via-card to-background hover:border-sky-500/40",
                    },
                    Eksperimen: {
                      badge: "bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border-cyan-500/30",
                      card: "border-cyan-500/25 bg-gradient-to-r from-cyan-500/5 via-card to-background hover:border-cyan-500/40",
                    },
                    Pencatatan: {
                      badge: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30",
                      card: "border-amber-500/25 bg-gradient-to-r from-amber-500/5 via-card to-background hover:border-amber-500/40",
                    },
                    Sintesis: {
                      badge: "bg-purple-500/15 text-purple-800 dark:text-purple-300 border-purple-500/30",
                      card: "border-purple-500/25 bg-gradient-to-r from-purple-500/5 via-card to-background hover:border-purple-500/40",
                    },
                  };
                  const colorConfig = phaseColors[step.phase] || phaseColors.Eksperimen;

                  return (
                    <div
                      key={step.no}
                      className={`p-3.5 md:p-4 rounded-xl border-2 ${colorConfig.card} shadow-sm transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3`}
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {/* Number Badge */}
                        <span
                          className={`w-8 h-8 rounded-xl font-mono font-black text-xs md:text-sm flex items-center justify-center shrink-0 border ${colorConfig.badge} shadow-xs`}
                        >
                          #{step.no}
                        </span>

                        <div className="space-y-1 flex-1 min-w-0">
                          {/* Phase & Scenario Tag Header */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colorConfig.badge}`}
                            >
                              {step.phase}
                            </span>
                            {step.scenarioRef && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                                {step.scenarioRef}
                              </span>
                            )}
                            {step.target && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-secondary text-slate-700 dark:text-slate-300 border border-border">
                                {step.target}
                              </span>
                            )}
                          </div>

                          {/* Step Title */}
                          <h5 className="font-extrabold text-slate-900 dark:text-white text-sm md:text-[15px] leading-snug">
                            {step.title}
                          </h5>

                          {/* Step Instruction */}
                          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                            {renderHighlightedText(step.instruction)}
                          </p>
                        </div>
                      </div>

                      {/* Action Shortcuts */}
                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center pt-2 md:pt-0">
                        {step.codeSnippet && (
                          <button
                            onClick={() => {
                              handleSendToWorkbench(
                                step.codeSnippet!,
                                step.no >= 2 && step.no <= observations.length + 1 ? step.no - 1 : undefined
                              );
                            }}
                            className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                            title="Muat dan uji kode ini di Workbench Laboratorium"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Uji di Workbench</span>
                          </button>
                        )}
                        {step.no === 7 && (
                          <button
                            onClick={() => {
                              const el = document.getElementById("tabel-pengamatan-container");
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Ke Tabel Pengamatan</span>
                          </button>
                        )}
                        {step.no === 8 && (
                          <button
                            onClick={() => {
                              const el = document.getElementById("bagian-analisis-container");
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Ke Bagian Analisis</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                /* Fallback for other modules */
                moduleData.prosedurKerja.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border-2 border-cyan-500/20 bg-card hover:border-cyan-500/40 shadow-sm transition-all flex items-start gap-3"
                  >
                    <span className="w-7 h-7 rounded-lg font-mono font-black text-xs flex items-center justify-center shrink-0 border bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border-cyan-500/30">
                      #{idx + 1}
                    </span>
                    <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal flex-1">
                      {renderHighlightedText(step)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Integrated Lab Workbench (Dual Engine: Python Pyodide WASM & JavaScript) */}
        <PraktikumWorkbench
          moduleId={moduleId}
          moduleTitle={moduleData.title}
          prosedurSteps={moduleData.prosedurSteps}
          onApplyOutputToTable={handleApplyWorkbenchOutput}
          totalRows={observations.length}
          selectedRowNo={activeTargetRow}
          externalCodeTrigger={workbenchCodeTrigger}
        />

        {/* Tabel Pengamatan & Pengukuran Utama */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-sm text-slate-700 dark:text-slate-200 font-bold px-1">
            <span>Tabel Pengamatan &amp; Pengukuran Empiris (Wajib Diisi):</span>
            <span className="text-xs italic text-cyan-500 font-medium">*Sel tabel dapat diedit secara langsung</span>
          </div>
          <div className="overflow-x-auto rounded-xl border border-border/90 shadow-sm">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-secondary/80 border-b border-border text-foreground font-bold text-xs md:text-sm uppercase tracking-wider">
                  <th className="p-3.5 text-center w-12">No</th>
                  <th className="p-3.5 min-w-[170px]">Skenario Uji</th>
                  <th className="p-3.5 min-w-[150px]">Kode / Masukan Uji</th>
                  <th className="p-3.5 min-w-[170px]">Prediksi Teori</th>
                  <th className="p-3.5 min-w-[180px]">Hasil Aktual Komputer</th>
                  <th className="p-3.5 min-w-[160px]">Metrik Terukur</th>
                  <th className="p-3.5 text-center w-36">Status Validasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70 text-slate-700 dark:text-slate-200">
                {observations.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-secondary/30 transition-colors ${
                      row.no === activeTargetRow ? "bg-cyan-500/5 dark:bg-cyan-950/20" : ""
                    }`}
                  >
                    <td
                      onClick={() => setActiveTargetRow(row.no)}
                      className="p-3 text-center align-top pt-3 font-mono font-bold text-cyan-500 text-sm cursor-pointer"
                      title={`Klik untuk menetapkan Baris #${row.no} sebagai target salin Workbench`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span>{row.no}</span>
                        {row.no === activeTargetRow && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500 text-slate-950 font-sans font-extrabold uppercase tracking-tight shadow-sm">
                            Target
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-2 align-top">
                      <textarea
                        rows={2}
                        value={row.scenario}
                        onChange={(e) => handleObservationChange(idx, "scenario", e.target.value)}
                        onPaste={handlePreventPaste}
                        className="w-full px-2.5 py-2 rounded-lg bg-background border border-border/70 text-foreground font-medium text-sm focus:outline-none focus:border-cyan-500 leading-snug resize-y min-h-[58px]"
                        placeholder="Skenario uji..."
                      />
                    </td>
                    <td className="p-2 align-top">
                      <textarea
                        rows={2}
                        value={row.testInput}
                        onChange={(e) => handleObservationChange(idx, "testInput", e.target.value)}
                        onPaste={handlePreventPaste}
                        className="w-full px-2.5 py-2 rounded-lg bg-background border border-border/70 font-mono font-semibold text-emerald-600 dark:text-emerald-400 text-sm focus:outline-none focus:border-cyan-500 leading-snug resize-y min-h-[58px]"
                        placeholder="Masukan uji..."
                      />
                      {row.testInput && (
                        <button
                          type="button"
                          onClick={() => handleSendToWorkbench(row.testInput, row.no)}
                          className="mt-1 text-[11px] text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 font-mono font-bold flex items-center gap-1 hover:underline cursor-pointer"
                          title={`Kirim kode masukan baris #${row.no} ke Workbench`}
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Uji di Workbench</span>
                        </button>
                      )}
                    </td>
                    <td className="p-2 align-top">
                      <textarea
                        rows={2}
                        value={row.expectedTheory}
                        onChange={(e) => handleObservationChange(idx, "expectedTheory", e.target.value)}
                        onPaste={handlePreventPaste}
                        className="w-full px-2.5 py-2 rounded-lg bg-background border border-border/70 text-foreground font-medium text-sm focus:outline-none focus:border-cyan-500 leading-snug resize-y min-h-[58px]"
                        placeholder="Prediksi teori..."
                      />
                    </td>
                    <td className="p-2 align-top">
                      <textarea
                        rows={2}
                        value={row.actualOutput}
                        onChange={(e) => handleObservationChange(idx, "actualOutput", e.target.value)}
                        onPaste={handlePreventPaste}
                        className="w-full px-2.5 py-2 rounded-lg bg-background border border-border/70 text-foreground font-bold text-sm focus:outline-none focus:border-cyan-500 leading-snug resize-y min-h-[58px]"
                        placeholder="Hasil aktual mesin..."
                      />
                    </td>
                    <td className="p-2 align-top">
                      <textarea
                        rows={2}
                        value={row.measuredMetric}
                        onChange={(e) => handleObservationChange(idx, "measuredMetric", e.target.value)}
                        onPaste={handlePreventPaste}
                        className="w-full px-2.5 py-2 rounded-lg bg-background border border-border/70 text-foreground font-medium text-sm focus:outline-none focus:border-cyan-500 leading-snug resize-y min-h-[58px]"
                        placeholder="Metrik terukur..."
                      />
                    </td>
                    <td className="p-2 text-center align-top pt-3.5">
                      <select
                        value={row.validationStatus}
                        onChange={(e) => handleObservationChange(idx, "validationStatus", e.target.value)}
                        className={`w-full px-2 py-2 rounded-lg text-xs md:text-sm font-bold border focus:outline-none cursor-pointer ${
                          row.validationStatus === "Sesuai"
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40"
                            : row.validationStatus === "Tidak Sesuai"
                            ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/40"
                            : "bg-secondary text-slate-600 dark:text-slate-300 border-border"
                        }`}
                      >
                        <option value="Sesuai">Sesuai</option>
                        <option value="Tidak Sesuai">Tidak Sesuai</option>
                        <option value="Belum Diuji">Belum Diuji</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* REFLEKSI CEPAT WORKBENCH (GOLDEN BASELINE ON-DEMAND JIKA BELUM ADA)       */}
      {/* ========================================================================= */}
      {(!hasBaseline || isWarmupCompletedInSession) && !isBaselineLoading && submissionStatus !== 'disetujui' && (
        <div id="praktikum-warmup-container" className="scroll-mt-24">
          <PraktikumWarmupCard
            moduleId={moduleId}
            moduleTitle={`Modul 0${moduleId}: ${moduleData.title}`}
            onWarmupComplete={() => {
              setIsWarmupCompletedInSession(true);
              setHasBaseline(true);
            }}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* BAGIAN D: ANALISIS & PEMBAHASAN                                           */}
      {/* ========================================================================= */}
      <div id="bagian-analisis-container" className="p-6 md:p-8 rounded-2xl bg-card border border-border/80 shadow-sm space-y-6 scroll-mt-24">
        <div className="flex items-center gap-3.5">
          <span className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-500 dark:text-cyan-400 font-mono font-black text-base flex items-center justify-center border border-cyan-500/30 shadow-sm">
            D
          </span>
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
              Analisis &amp; Pembahasan Hasil Pengukuran
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              Uraikan telaah ilmiah mendalam berdasarkan data yang Anda dapatkan pada Tabel Pengamatan Bagian C.
            </p>
          </div>
        </div>

        {/* Banner Peringatan Kunci Jika Belum Ada Baseline */}
        {!isFormUnlocked && !isBaselineLoading && (
          <div className="p-4.5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs md:text-sm flex items-start gap-3.5 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/40 font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="font-extrabold text-sm text-foreground">
                Formulir Analisis Terkunci Sementara
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Selesaikan <strong>Refleksi Cepat Uji Workbench</strong> di atas (1–2 menit) terlebih dahulu. Refleksi ini bertujuan mengaktifkan <em>Golden Baseline</em> ritme ketikan natural Anda agar sistem dapat memvalidasi keaslian laporan secara akurat.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-5">
          {moduleData.analisisPrompts.map((prompt, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-secondary/30 border border-border/80 space-y-2.5">
              <label className="block text-sm md:text-base font-bold text-foreground leading-relaxed">
                <span className="text-cyan-600 dark:text-cyan-400">Pertanyaan Analisis 0{idx + 1}:</span>
                <span className="font-medium text-slate-700 dark:text-slate-200 block mt-1 leading-relaxed">{prompt}</span>
              </label>
              <textarea
                rows={4}
                value={analisisAnswers[idx] || ""}
                onChange={(e) => handleAnalisisChange(idx, e.target.value)}
                onKeyDown={handleTrackKeyInput}
                onPaste={handlePreventPaste}
                disabled={!isFormUnlocked && !isBaselineLoading}
                className={`w-full p-3.5 rounded-xl bg-background border border-border/80 text-foreground font-sans text-sm md:text-base focus:ring-2 focus:ring-cyan-500/40 focus:outline-none leading-relaxed transition-all ${
                  !isFormUnlocked && !isBaselineLoading
                    ? "opacity-50 cursor-not-allowed bg-secondary/40 select-none"
                    : ""
                }`}
                placeholder={
                  !isFormUnlocked && !isBaselineLoading
                    ? "🔒 Selesaikan refleksi di atas terlebih dahulu untuk membuka formulir ini..."
                    : "Tuliskan analisis dan penjelasan ilmiah Anda di sini..."
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BAGIAN E: KESIMPULAN                                                      */}
      {/* ========================================================================= */}
      <div className="p-6 md:p-8 rounded-2xl bg-card border border-border/80 shadow-sm space-y-6">
        <div className="flex items-center gap-3.5">
          <span className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-500 dark:text-cyan-400 font-mono font-black text-base flex items-center justify-center border border-cyan-500/30 shadow-sm">
            E
          </span>
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
              Kesimpulan Ilmiah
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              Rumuskan intisari kesimpulan akhir yang menjawab secara tegas capaian praktikum pada Bagian A.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-secondary/40 border border-border/80 text-xs md:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
            💡 <strong className="text-cyan-600 dark:text-cyan-400 font-bold">Panduan Perumusan:</strong> {moduleData.kesimpulanPrompts.join(" ")}
          </div>
          <textarea
            rows={5}
            value={kesimpulanText}
            onChange={(e) => setKesimpulanText(e.target.value)}
            onKeyDown={handleTrackKeyInput}
            onPaste={handlePreventPaste}
            disabled={!isFormUnlocked && !isBaselineLoading}
            className={`w-full p-4 rounded-xl bg-background border border-border/80 text-foreground font-sans text-sm md:text-base focus:ring-2 focus:ring-cyan-500/40 focus:outline-none leading-relaxed transition-all ${
              !isFormUnlocked && !isBaselineLoading
                ? "opacity-50 cursor-not-allowed bg-secondary/40 select-none"
                : ""
            }`}
            placeholder={
              !isFormUnlocked && !isBaselineLoading
                ? "🔒 Selesaikan refleksi di atas terlebih dahulu untuk membuka formulir ini..."
                : "Tuliskan kesimpulan akhir Anda berdasarkan bukti empiris yang didapat..."
            }
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* EVALUASI & VALIDASI KELAYAKAN ILMIAH (AI REVIEWER SOKRATIK)              */}
      {/* ========================================================================= */}
      <div className="p-6 md:p-8 rounded-2xl bg-card border border-indigo-500/30 dark:border-indigo-500/40 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 text-indigo-400 font-mono font-black text-base flex items-center justify-center border border-indigo-500/30 shadow-sm">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
                  Ulasan Kualitas Ilmiah (AI Lab Reviewer)
                </h3>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/30">
                  Dual AI Engine
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                Pemeriksaan otomatis keselarasan data empiris Bagian C terhadap Analisis (D) dan Kesimpulan (E).
              </p>
            </div>
          </div>

          <button
            onClick={handleEvaluateWithAI}
            disabled={isEvaluating || !isAnalisisComplete || !isKesimpulanComplete || (!isFormUnlocked && !isBaselineLoading)}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
              isEvaluating || !isAnalisisComplete || !isKesimpulanComplete || (!isFormUnlocked && !isBaselineLoading)
                ? "bg-secondary/80 text-muted-foreground border border-border cursor-not-allowed opacity-60"
                : "bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-indigo-500/20"
            }`}
          >
            {isEvaluating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Menganalisis Jawaban...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>{aiEvaluation ? "Uji Ulang Kualitas dengan AI" : "Uji Kualitas Analisis & Kesimpulan"}</span>
              </>
            )}
          </button>
        </div>

        {/* Informasi Jika Analisis/Kesimpulan Belum Lengkap */}
        {(!isAnalisisComplete || !isKesimpulanComplete) && !aiEvaluation && (
          <div className="p-4 rounded-xl bg-secondary/30 border border-border/80 flex items-center gap-3 text-xs md:text-sm text-slate-600 dark:text-slate-300">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
            <span>
              Lengkapi seluruh pertanyaan Analisis <strong>({filledAnalisisCount}/{totalAnalisisPrompts})</strong> dan Kesimpulan <strong>({isKesimpulanComplete ? "Sudah diisi" : "Masih kosong"})</strong> untuk mengaktifkan tombol evaluasi AI ini.
            </span>
          </div>
        )}

        {/* Error State */}
        {evalError && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-xs md:text-sm text-rose-400 font-medium">
            <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
            <span>{evalError}</span>
          </div>
        )}

        {/* Hasil Evaluasi AI */}
        {aiEvaluation && (
          <div className="space-y-5 animate-in fade-in duration-300">
            {/* Header Skor & Status Kelayakan */}
            <div className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              aiEvaluation.canPrint
                ? "bg-emerald-500/10 border-emerald-500/40"
                : "bg-amber-500/10 border-amber-500/40"
            }`}>
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-black text-xl border ${
                  aiEvaluation.canPrint
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                    : "bg-amber-500/20 text-amber-400 border-amber-500/40"
                }`}>
                  {aiEvaluation.score}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base md:text-lg text-foreground">
                      Skor Kelayakan Ilmiah: {aiEvaluation.score} / 100
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                      aiEvaluation.canPrint
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                        : "bg-amber-500/20 text-amber-400 border-amber-500/40"
                    }`}>
                      {aiEvaluation.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-medium">
                    {aiEvaluation.canPrint
                      ? "✓ Analisis telah memenuhi standar ilmiah. Tombol Cetak PDF A4 telah dibuka!"
                      : "⚠️ Analisis belum memenuhi ambang batas kelayakan minimal (60/100). Perbaiki telaah Anda sebelum mencetak."}
                  </p>
                </div>
              </div>

              {aiEvaluation.evaluatedAt && (
                <span className="text-xs text-slate-400 font-mono self-start md:self-auto">
                  Ditinjau {aiEvaluation.evaluatedAt}
                </span>
              )}
            </div>

            {/* Kartu Forensik Keaslian Ketikan & Integritas Ilmiah */}
            {aiEvaluation.integrity && (
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-purple-500" />
                    Audit Forensik Keaslian Ketikan (vs Baseline Chat DB)
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Indeks Keaslian:</span>
                    <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${
                      (aiEvaluation.integrity.authenticityScore || 0) >= 80
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                        : (aiEvaluation.integrity.authenticityScore || 0) >= 65
                        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
                        : "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30"
                    }`}>
                      {aiEvaluation.integrity.authenticityScore}% {(aiEvaluation.integrity.authenticityScore || 0) >= 80 ? "Autentik Mahasiswa" : "Perlu Konfirmasi"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-medium">
                  <div className="p-2.5 rounded-lg bg-background/80 border border-border/70 space-y-1">
                    <span className="text-slate-500 block text-[11px]">Kecepatan Ketik Praktikum</span>
                    <span className="font-mono font-bold text-foreground text-sm">
                      {aiEvaluation.integrity.wpmComparison?.currentWpm || 12} WPM
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-background/80 border border-border/70 space-y-1">
                    <span className="text-slate-500 block text-[11px]">Baseline Chat Pra-Ujian DB</span>
                    <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400 text-sm">
                      {aiEvaluation.integrity.wpmComparison?.baselineWpm || 12} WPM
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-background/80 border border-border/70 space-y-1">
                    <span className="text-slate-500 block text-[11px]">Rasio Laju / Pertumbuhan</span>
                    <span className="font-mono font-bold text-foreground text-sm">
                      {aiEvaluation.integrity.wpmComparison?.ratio || 1.0}x
                      <span className="text-[10px] text-emerald-500 font-semibold ml-1">(Wajar Berlatih)</span>
                    </span>
                  </div>
                </div>

                {aiEvaluation.integrity.stylometricNotes && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic pt-1 leading-relaxed">
                    💬 &ldquo;{aiEvaluation.integrity.stylometricNotes}&rdquo;
                  </p>
                )}
              </div>
            )}

            {/* Ringkasan Ulasan AI */}
            <div className="p-4 rounded-xl bg-secondary/40 border border-border/80 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Ulasan Diagnostik Dosen AI:
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                {aiEvaluation.summaryFeedback}
              </p>
            </div>

            {/* Ulasan Rinci Butir Analisis & Kesimpulan */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Catatan Rinci Tiap Butir:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
                {aiEvaluation.feedbackAnalisis.map((fb) => (
                  <div key={fb.itemNo} className="p-3.5 rounded-xl bg-secondary/30 border border-border/70 space-y-1">
                    <div className="flex items-center justify-between font-bold text-foreground">
                      <span>Pertanyaan Analisis 0{fb.itemNo}</span>
                      <span className={`text-[11px] px-2 py-0.5 rounded font-bold border ${
                        fb.status === "Kuat"
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          : fb.status === "Cukup"
                          ? "bg-cyan-500/15 text-cyan-400 border-cyan-500/30"
                          : "bg-rose-500/15 text-rose-400 border-rose-500/30"
                      }`}>
                        {fb.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {fb.note}
                    </p>
                  </div>
                ))}

                {aiEvaluation.feedbackKesimpulan && (
                  <div className="p-3.5 rounded-xl bg-secondary/30 border border-border/70 space-y-1">
                    <div className="flex items-center justify-between font-bold text-foreground">
                      <span>Kesimpulan Ilmiah</span>
                      <span className={`text-[11px] px-2 py-0.5 rounded font-bold border ${
                        aiEvaluation.feedbackKesimpulan.status === "Kuat"
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          : aiEvaluation.feedbackKesimpulan.status === "Cukup"
                          ? "bg-cyan-500/15 text-cyan-400 border-cyan-500/30"
                          : "bg-rose-500/15 text-rose-400 border-rose-500/30"
                      }`}>
                        {aiEvaluation.feedbackKesimpulan.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {aiEvaluation.feedbackKesimpulan.note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* BAGIAN F: PENGESAHAN TANDA TANGAN & PENGAJUAN KONSULTASI DOSEN             */}
      {/* ========================================================================= */}
      <div className="p-6 md:p-8 rounded-2xl bg-card border border-border/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-4">
          <div className="flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-500 dark:text-cyan-400 font-mono font-black text-base flex items-center justify-center border border-cyan-500/30 shadow-sm">
              F
            </span>
            <div>
              <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
                Pengesahan &amp; Konsultasi Laporan Praktikum
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                Bubuhkan tanda tangan digital Anda dan ajukan laporan ke Dosen Pengampu untuk pemeriksaan akhir.
              </p>
            </div>
          </div>

          {/* Status Badge Submission */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Status Laporan:</span>
            <span className={`text-xs font-extrabold px-3 py-1 rounded-full border uppercase tracking-wider ${
              submissionStatus === "disetujui"
                ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40"
                : submissionStatus === "diajukan"
                ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/40 animate-pulse"
                : submissionStatus === "perlu_revisi"
                ? "bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/40"
                : "bg-slate-500/20 text-slate-700 dark:text-slate-300 border-slate-500/30"
            }`}>
              {submissionStatus === "disetujui"
                ? "✓ Disetujui Dosen"
                : submissionStatus === "diajukan"
                ? "⏳ Dalam Antrean Dosen"
                : submissionStatus === "perlu_revisi"
                ? "⚠️ Perlu Revisi"
                : "Draf Mandiri"}
            </span>
          </div>
        </div>

        {/* Notifikasi / Catatan Dosen jika status perlu revisi atau disetujui */}
        {submissionStatus === "perlu_revisi" && lecturerFeedback && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Catatan Koreksi dari Dosen Hadiq, ST, M.Kom:</span>
            </div>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 leading-relaxed pl-6">
              {lecturerFeedback}
            </p>
          </div>
        )}

        {submissionStatus === "disetujui" && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Laporan Telah Disahkan Resmi oleh Dosen Hadiq, ST, M.Kom</span>
              </div>
              {lecturerScore !== null && (
                <div className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 font-mono font-black text-emerald-600 dark:text-emerald-300 text-sm">
                  Nilai Resmi: {lecturerScore} / 100
                </div>
              )}
            </div>
            {lecturerFeedback && (
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 leading-relaxed pl-7">
                Catatan Dosen: &ldquo;{lecturerFeedback}&rdquo;
              </p>
            )}
          </div>
        )}

        {consultationMessage && (
          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs md:text-sm font-medium flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0" />
            <span>{consultationMessage}</span>
          </div>
        )}

        {/* Kotak Tanda Tangan Mahasiswa & Dosen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Kolom Mahasiswa */}
          <div className="p-5 rounded-2xl bg-secondary/30 border border-border/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-foreground">Tanda Tangan Praktikan</h4>
                <p className="text-xs text-slate-500">Mahasiswa yang bersangkutan</p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                {studentNim || "NIM Mahasiswa"}
              </span>
            </div>

            {/* Preview Box Tanda Tangan */}
            <div className="h-36 rounded-xl bg-white dark:bg-slate-900 border-2 border-dashed border-border flex flex-col items-center justify-center p-2 relative overflow-hidden group">
              {studentSignature ? (
                <>
                  <img
                    src={studentSignature}
                    alt="Tanda Tangan Mahasiswa"
                    className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                  />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <label className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer shadow">
                      Ganti Gambar
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/svg+xml"
                        onChange={handleSignatureUpload}
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => setStudentSignature(null)}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer shadow"
                    >
                      Hapus
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-2 p-4">
                  <FileText className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-500 font-medium">
                    Belum ada tanda tangan. Tempel gambar tanda tangan Anda di sini.
                  </p>
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer shadow transition-colors">
                    <span>Unggah File Tanda Tangan</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      onChange={handleSignatureUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Opsi Tanda Tangan Tersimpan & Simpan Profil */}
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {storedProfileSignature && storedProfileSignature !== studentSignature && (
                <button
                  type="button"
                  onClick={() => setStudentSignature(storedProfileSignature)}
                  className="text-cyan-600 dark:text-cyan-400 hover:underline font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Gunakan Tanda Tangan yang Pernah Disimpan di Profil
                </button>
              )}

              {studentSignature && (
                <label className="flex items-center gap-2 cursor-pointer select-none font-medium">
                  <input
                    type="checkbox"
                    checked={saveSigToProfile}
                    onChange={(e) => setSaveSigToProfile(e.target.checked)}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 border-border"
                  />
                  <span>Simpan tanda tangan ini di profil akun saya untuk seluruh praktikum</span>
                </label>
              )}
            </div>

            <div className="text-center pt-1 border-t border-border/60">
              <span className="font-bold text-xs uppercase text-foreground">{studentName || "Nama Mahasiswa"}</span>
            </div>
          </div>

          {/* Kolom Dosen Pengampu */}
          <div className="p-5 rounded-2xl bg-secondary/30 border border-border/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-foreground">Pengesahan Dosen Pengampu</h4>
                <p className="text-xs text-slate-500">Mata Kuliah Praktikum</p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                NIDN: 0701048602
              </span>
            </div>

            {/* Preview Box Tanda Tangan Dosen */}
            <div className="h-36 rounded-xl bg-white dark:bg-slate-900 border border-border/80 flex flex-col items-center justify-center p-2 relative overflow-hidden">
              {lecturerSignature ? (
                <div className="text-center space-y-1">
                  <img
                    src={lecturerSignature}
                    alt="Tanda Tangan Dosen"
                    className="max-h-24 max-w-full object-contain mx-auto filter drop-shadow-sm"
                  />
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
                    ✓ TERVERIFIKASI DIGITAL {lecturerSignedAt ? new Date(lecturerSignedAt).toLocaleDateString("id-ID") : ""}
                  </span>
                </div>
              ) : (
                <div className="text-center space-y-1.5 p-4">
                  <Lock className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-500 font-medium">
                    {submissionStatus === "diajukan"
                      ? "Menunggu pengesahan dan pembubuhan tanda tangan dari Dosen Hadiq, ST, M.Kom"
                      : "Tanda tangan resmi Dosen akan dibubuhkan setelah Anda mengajukan laporan ini"}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-1 text-center pt-3 border-t border-border/60">
              <span className="font-bold text-xs text-foreground block">Hadiq, ST, M.Kom</span>
              <span className="text-[11px] text-slate-500 block">Dosen Pengampu Laboratorium</span>
            </div>
          </div>
        </div>

        {/* Tombol Aksi Pengajuan Konsultasi ke Dosen */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60">
          <div className="text-xs text-slate-500 font-medium">
            * Sebelum mengajukan, pastikan Analisis &amp; Kesimpulan telah lolos uji Sokratik AI dan tanda tangan telah ditempel.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSubmitConsultation}
              disabled={isSubmittingConsultation || !studentSignature || !canPrint}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                !studentSignature || !canPrint
                  ? "bg-secondary text-muted-foreground cursor-not-allowed opacity-60"
                  : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white cursor-pointer shadow-emerald-500/20"
              }`}
            >
              {isSubmittingConsultation ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Mengajukan Laporan...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>{submissionStatus === "diajukan" ? "Perbarui Pengajuan ke Dosen" : "Ajukan Konsultasi ke Dosen"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Floating Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-card/95 backdrop-blur border border-border/80 shadow-xl sticky bottom-4 z-30">
        <div className="text-sm text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2.5">
          <Save className="w-5 h-5 text-cyan-500 shrink-0" />
          <span>
            {submissionStatus === "disetujui"
              ? "✓ Laporan telah disahkan resmi oleh Dosen. Anda dapat mencetak dokumen PDF kapan saja."
              : submissionStatus === "diajukan"
              ? "⏳ Laporan sedang ditinjau Dosen. Anda tetap dapat menyimpan perubahan atau mencetak draf."
              : "Simpan secara berkala. Seluruh isian form ini akan terangkum pada dokumen resmi cetak A4."}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleSaveDraft}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-sm transition-colors border border-border/70 cursor-pointer shadow-sm"
          >
            Simpan Draf
          </button>

          {canPrint ? (
            <Link
              href={`/praktikum/${moduleData.id}/print`}
              target="_blank"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{submissionStatus === "disetujui" ? "Cetak Laporan Resmi A4" : "Pratinjau & Cetak PDF A4"}</span>
            </Link>
          ) : (
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2">
              <div className="text-xs text-amber-500 dark:text-amber-400 font-semibold bg-amber-500/10 px-3 py-2 rounded-xl border border-amber-500/20 whitespace-nowrap">
                {!isAnalisisComplete || !isKesimpulanComplete 
                  ? `Lengkapi Analisis (${filledAnalisisCount}/${totalAnalisisPrompts}) & Kesimpulan`
                  : !aiEvaluation 
                  ? "Wajib Diuji Kualitas oleh AI"
                  : `Skor AI: ${aiEvaluation.score}/100 (Perlu >= 60)`}
              </div>
              <button
                disabled
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-secondary/80 text-muted-foreground font-bold text-sm flex items-center justify-center gap-2 border border-border/80 cursor-not-allowed opacity-70 whitespace-nowrap"
                title="Lengkapi analisis & kesimpulan serta dapatkan skor kelayakan minimal 60 dari AI untuk membuka cetak"
              >
                <Lock className="w-4 h-4 text-amber-500" />
                <span>Cetak PDF (Terkunci)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
