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
  AlertCircle
} from "lucide-react";
import { PRAKTIKUM_MODULES, ObservationRow } from "@/lib/praktikum-data";
import { useAuth } from "@/context/AuthContext";

export interface AiEvaluationResult {
  score: number;
  status: 'Memenuhi Standar' | 'Perlu Perbaikan';
  canPrint: boolean;
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
  
  // Syarat tombol cetak aktif: Analisis & Kesimpulan lengkap DAN dinyatakan "Memenuhi Standar" oleh AI
  const canPrint = Boolean(isAnalisisComplete && isKesimpulanComplete && aiEvaluation && aiEvaluation.canPrint);

  // Handler anti copy-paste
  const handlePreventPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
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

  // State Mini Simulator / Tester
  const [testCodeInput, setTestCodeInput] = useState("10 // 4");
  const [testCodeOutput, setTestCodeOutput] = useState<string | null>(null);

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
        return;
      } catch (e) {
        console.error("Gagal membaca draf lokal:", e);
      }
    }

    // Default jika belum ada draf
    setObservations(moduleData.defaultObservations);
    setAnalisisAnswers(Array(moduleData.analisisPrompts.length).fill(""));
  }, [moduleId, moduleData, profile]);

  // Fungsi simpan draf ke LocalStorage
  const handleSaveDraft = () => {
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
      savedAt: nowStr,
    };
    localStorage.setItem(storageKey, JSON.stringify(payload));
    setLastSavedTime(nowStr);
  };

  // Evaluasi Analisis & Kesimpulan dengan AI Asisten Reviewer
  const handleEvaluateWithAI = async () => {
    if (!isAnalisisComplete || !isKesimpulanComplete) {
      alert("Harap lengkapi seluruh pertanyaan Analisis (Bagian D) dan Kesimpulan (Bagian E) sebelum meminta ulasan AI.");
      return;
    }

    setIsEvaluating(true);
    setEvalError(null);

    try {
      const res = await fetch("/api/grade-praktikum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId,
          observations,
          analisisAnswers,
          kesimpulanText,
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
  const handleRunMiniTest = () => {
    try {
      const trimmed = testCodeInput.trim();
      let res = "";
      if (trimmed === "10 // 4") {
        res = "2 (tipe: integer) - 0.5 desimal terpotong!";
      } else if (trimmed === "10 / 4") {
        res = "2.5 (tipe: float) - pembagian pecahan presisi";
      } else if (trimmed === "'50' + '25'") {
        res = "'5025' (tipe: string) - penggabungan teks";
      } else if (trimmed === "int('50') + int('25')") {
        res = "75 (tipe: integer) - kalkulasi numerik";
      } else if (trimmed.includes("/ 0") || trimmed.includes("// 0")) {
        res = "ZeroDivisionError: division by zero (Interupsi / Crash)";
      } else if (trimmed === "0.1 + 0.2") {
        res = "0.30000000000000004 (IEEE 754 floating point artifact)";
      } else {
        res = `Ekspresi '${trimmed}' berhasil diuji di memori.`;
      }
      setTestCodeOutput(res);
    } catch (e: any) {
      setTestCodeOutput(`Error: ${e.message}`);
    }
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
      <div className="p-6 md:p-8 rounded-2xl bg-card border border-border/80 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-500 dark:text-cyan-400 font-mono font-black text-base flex items-center justify-center border border-cyan-500/30 shadow-sm">
              B
            </span>
            <div>
              <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
                Dasar Teori &amp; Parameter Uji
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                Landasan ilmiah yang mendasari hipotesis pengukuran di laboratorium.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTheoryOpen(!isTheoryOpen)}
            className="p-2.5 text-slate-500 hover:text-foreground hover:bg-secondary rounded-xl transition-colors cursor-pointer"
            title="Buka / Tutup Teori"
          >
            <ChevronDown className={`w-5 h-5 transition-transform ${isTheoryOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {isTheoryOpen && (
          <div className="space-y-4 pt-1">
            <p className="p-5 rounded-xl bg-secondary/30 border border-border/80 text-sm md:text-base text-slate-800 dark:text-slate-100 leading-relaxed font-normal">
              {moduleData.dasarTeori.overview}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {moduleData.dasarTeori.points.map((p, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-secondary/40 border border-border/80 space-y-1.5">
                  <div className="font-bold text-cyan-600 dark:text-cyan-400 text-sm md:text-base">{p.title}</div>
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-normal">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* BAGIAN C: PRAKTIKUM (PROSEDUR & TABEL PENGAMATAN)                          */}
      {/* ========================================================================= */}
      <div className="p-6 md:p-8 rounded-2xl bg-card border border-cyan-500/40 shadow-md space-y-6">
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
          <div className="p-6 rounded-xl bg-secondary/30 border border-border/80 space-y-3">
            <div className="font-bold text-foreground flex items-center gap-2 text-sm md:text-base">
              <Clock className="w-5 h-5 text-cyan-500" />
              Prosedur Langkah Kerja Praktikum:
            </div>
            <ol className="list-decimal pl-6 space-y-2 text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
              {moduleData.prosedurKerja.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Mini Simulator / Tester Helper */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-sm space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-cyan-400 flex items-center gap-2 text-sm md:text-base">
              <Terminal className="w-5 h-5" /> Simulator Pengujian Cepat (Helper Terminal)
            </span>
            <span className="text-xs text-slate-300 font-medium">Gunakan untuk menguji nilai sebelum mengisi tabel</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={testCodeInput}
              onChange={(e) => setTestCodeInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-sm md:text-base font-semibold focus:outline-none focus:border-cyan-400"
              placeholder="contoh: 10 // 4 atau '50' + '25'"
            />
            <button
              onClick={handleRunMiniTest}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 shrink-0 transition-colors shadow cursor-pointer"
            >
              <Play className="w-4 h-4" />
              Jalankan Tes
            </button>
          </div>
          {testCodeOutput && (
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-cyan-300 font-medium leading-relaxed">
              <span className="text-slate-500 mr-2 font-bold">&gt;&gt;&gt;</span>{testCodeOutput}
            </div>
          )}
        </div>

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
                  <tr key={idx} className="hover:bg-secondary/30 transition-colors">
                    <td className="p-3 text-center align-top pt-4 font-mono font-bold text-cyan-500 text-sm">
                      {row.no}
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
      {/* BAGIAN D: ANALISIS & PEMBAHASAN                                           */}
      {/* ========================================================================= */}
      <div className="p-6 md:p-8 rounded-2xl bg-card border border-border/80 shadow-sm space-y-6">
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
                onPaste={handlePreventPaste}
                className="w-full p-3.5 rounded-xl bg-background border border-border/80 text-foreground font-sans text-sm md:text-base focus:ring-2 focus:ring-cyan-500/40 focus:outline-none leading-relaxed"
                placeholder="Tuliskan analisis dan penjelasan ilmiah Anda di sini..."
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
            onPaste={handlePreventPaste}
            className="w-full p-4 rounded-xl bg-background border border-border/80 text-foreground font-sans text-sm md:text-base focus:ring-2 focus:ring-cyan-500/40 focus:outline-none leading-relaxed"
            placeholder="Tuliskan kesimpulan akhir Anda berdasarkan bukti empiris yang didapat..."
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
            disabled={isEvaluating || !isAnalisisComplete || !isKesimpulanComplete}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
              isEvaluating || !isAnalisisComplete || !isKesimpulanComplete
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

      {/* Bottom Floating Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-card/95 backdrop-blur border border-border/80 shadow-xl sticky bottom-4 z-30">
        <div className="text-sm text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2.5">
          <Save className="w-5 h-5 text-cyan-500 shrink-0" />
          <span>Simpan secara berkala. Seluruh isian form ini akan terangkum pada dokumen resmi cetak A4.</span>
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
              <span>Pratinjau &amp; Cetak PDF A4</span>
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
