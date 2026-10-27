"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Target, 
  Clock, 
  AlertTriangle, 
  Bot, 
  Edit3, 
  Save, 
  X, 
  Copy, 
  Check, 
  ShieldCheck, 
  ShieldAlert, 
  BookOpen, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  MessageSquareQuote
} from "lucide-react";
import { ESSAY_BANK, EssayQuestion } from "@/lib/essay-bank";
import { getBadgeFromScore } from "@/lib/badges";
import { BadgeDisplay } from "@/components/BadgeDisplay";

const MEETING_TITLES: Record<number, string> = {
  1: "Pengenalan Komputer & Bahasa Pemrograman",
  2: "Arsitektur & Organisasi Komputer",
  3: "Fondasi Algoritma: Naratif, Flowchart & Pseudocode",
  4: "Tipe Data, Variabel & I/O Dasar",
  5: "Operator, Ekspresi & Manipulasi Data",
  6: "Struktur Percabangan Tunggal & Ganda (IF - ELSE)",
  7: "Percabangan Majemuk & Bersarang (Nested IF / ELIF)",
  8: "Ujian Tengah Semester (UTS)",
  9: "Dasar Perulangan (FOR & WHILE Loop)",
  10: "Perulangan Bersarang (Nested Loop) & Pola Karakter",
  11: "Array / List 1 Dimensi & Manipulasi Deret",
  12: "Array / Matriks Multi Dimensi",
  13: "Subprogram: Fungsi (Function), Prosedur & Scope Variabel",
  14: "Algoritma Pencarian (Linear & Binary Search)",
  15: "Algoritma Pengurutan (Bubble, Selection & Insertion Sort)",
  16: "Ujian Akhir Semester (UAS)"
};

// Buat peta pencarian cepat untuk bank soal esai
const essayMap = new Map<string, EssayQuestion>(
  ESSAY_BANK.map((q) => [q.id, q])
);

// Format durasi detik ke bentuk manusiawi (menit & detik)
function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "0 dtk";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs} detik`;
  if (secs === 0) return `${mins} menit`;
  return `${mins}m ${secs}s (${seconds}s)`;
}

// Parser Ulasan AI per nomor soal
interface AiFeedbackItem {
  score?: number;
  feedback: string;
}

function parseAiFeedback(feedbackStr?: string | null): Record<number, AiFeedbackItem> {
  if (!feedbackStr) return {};
  const map: Record<number, AiFeedbackItem> = {};
  
  // Mencocokkan: "Soal #1 (Skor 95): Feedback..." atau "Soal 1: Feedback..."
  const regex = /Soal\s*#?(\d+)(?:\s*\((?:Skor\s*)?(\d+)\))?:\s*([\s\S]*?)(?=(?:\n\s*Soal\s*#?\d+|$))/gi;
  let match;
  while ((match = regex.exec(feedbackStr)) !== null) {
    const qNum = parseInt(match[1], 10);
    const score = match[2] ? parseInt(match[2], 10) : undefined;
    const text = match[3]?.trim();
    if (qNum && text) {
      map[qNum] = { score, feedback: text };
    }
  }
  return map;
}

// Kunci metadata yang bukan merupakan jawaban butir soal
const NON_QUESTION_KEYS = new Set([
  "telemetry",
  "baseline_wpm",
  "baseline_backspace_ratio",
  "ai_feedback",
  "sampleText",
  "keystrokes",
  "backspaces",
  "wpm",
  "backspaceRatio",
  "burstAttempts",
  "student_answer"
]);

interface SubmissionDetailCardProps {
  submission: any;
  onScoreUpdated?: (subId: string, newScore: number, feedback: string) => void;
}

export function SubmissionDetailCard({ submission, onScoreUpdated }: SubmissionDetailCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editScore, setEditScore] = useState<number>(submission.score);
  const [editNote, setEditNote] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Accordion state untuk rubrik per soal
  const [openRubrics, setOpenRubrics] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toggleRubric = (key: string) => {
    setOpenRubrics(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Normalisasi data jawaban
  let parsedAnswers: any = {};
  if (typeof submission.answers_json === "string") {
    try {
      parsedAnswers = JSON.parse(submission.answers_json);
    } catch {
      parsedAnswers = { student_answer: submission.answers_json };
    }
  } else if (typeof submission.answers_json === "object" && submission.answers_json !== null) {
    parsedAnswers = submission.answers_json;
  }

  // Ekstraksi Telemetri Integritas
  const telemetry = parsedAnswers.telemetry || {
    wpm: parsedAnswers.wpm,
    burstAttempts: parsedAnswers.burstAttempts,
    backspaceRatio: parsedAnswers.backspaceRatio
  };

  const hasTelemetry = telemetry && (telemetry.wpm !== undefined || telemetry.burstAttempts !== undefined);
  const wpmValue = telemetry?.wpm !== undefined ? Number(telemetry.wpm) : null;
  const burstCount = telemetry?.burstAttempts !== undefined ? Number(telemetry.burstAttempts) : 0;
  const backspacePct = telemetry?.backspaceRatio !== undefined 
    ? (Number(telemetry.backspaceRatio) * (telemetry.backspaceRatio <= 1 ? 100 : 1)).toFixed(1)
    : null;

  // Ekstraksi Ulasan AI
  const aiFeedbackFull = submission.ai_feedback || parsedAnswers?.ai_feedback || "";
  const aiFeedbackMap = parseAiFeedback(aiFeedbackFull);

  // Ambil butir-butir soal
  const questionEntries = Object.entries(parsedAnswers)
    .filter(([key]) => !NON_QUESTION_KEYS.has(key))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

  // Kasus fallback jika hanya ada student_answer tunggal
  const singleAnswer = parsedAnswers.student_answer;
  const isWarmup = submission.quiz_key?.includes("warmup") || parsedAnswers.sampleText;

  const currentBadge = getBadgeFromScore(submission.score);
  const meetingTitle = MEETING_TITLES[submission.meeting_id] || `Pertemuan ${submission.meeting_id}`;

  // Handler simpan koreksi nilai oleh Dosen
  const handleSaveScore = async () => {
    try {
      setIsSaving(true);
      setSaveError(null);

      const res = await fetch("/api/lecturer/update-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: submission.id,
          newScore: editScore,
          note: editNote
        })
      });

      const resJson = await res.json();
      if (!res.ok || !resJson.success) {
        throw new Error(resJson.error || "Gagal memperbarui nilai");
      }

      setIsEditing(false);
      setEditNote("");
      if (onScoreUpdated) {
        onScoreUpdated(submission.id, editScore, resJson.feedback);
      }
    } catch (err: any) {
      setSaveError(err.message || "Terjadi kesalahan saat menyimpan nilai.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden mb-8 transition-all hover:border-border/80">
      {/* ── HEADER MODUL & SKOR ── */}
      <div className="p-6 border-b border-border bg-card/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
              {submission.quiz_type === "essay" ? <FileText className="w-3.5 h-3.5" /> : <Target className="w-3.5 h-3.5 text-amber-500" />}
              Minggu {submission.meeting_id} • {submission.quiz_type.toUpperCase()}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
              {submission.quiz_key}
            </span>
          </div>

          <h3 className="text-xl font-black text-foreground">
            {meetingTitle}
          </h3>

          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
            <span>Disubmit pada:</span>
            <strong className="text-foreground">
              {new Date(submission.submitted_at).toLocaleString("id-ID", {
                dateStyle: "full",
                timeStyle: "medium"
              })}
            </strong>
          </div>
        </div>

        {/* Skor & Tombol Koreksi Nilai */}
        <div className="flex items-center gap-4 bg-background/80 border border-border p-3.5 rounded-2xl self-start md:self-center shadow-sm">
          <div className="text-right">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Nilai Akhir
            </div>
            <div className="text-3xl font-black" style={{ color: currentBadge.hexColor }}>
              {submission.score}
            </div>
          </div>
          <BadgeDisplay badge={currentBadge} size="sm" showLabel={false} />

          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setEditScore(submission.score);
            }}
            className="ml-2 px-3 py-2 bg-secondary/80 hover:bg-secondary text-xs font-bold rounded-xl border border-border flex items-center gap-1.5 text-foreground transition-colors"
            title="Koreksi nilai mahasiswa"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Koreksi</span>
          </button>
        </div>
      </div>

      {/* ── FORM KOREKSI NILAI (JIKA DIBUKA DOSEN) ── */}
      {isEditing && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 p-5 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-amber-700 dark:text-amber-300 flex items-center gap-2">
              <Edit3 className="w-4 h-4" /> Koreksi / Penyesuaian Nilai Mahasiswa oleh Dosen:
            </h4>
            <button 
              onClick={() => setIsEditing(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Skor Baru (0 - 100):
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={editScore}
                onChange={(e) => setEditScore(Number(e.target.value))}
                className="w-full px-3 py-2 bg-background border border-border rounded-xl font-bold text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-foreground mb-1">
                Alasan / Catatan Penyesuaian (Opsional):
              </label>
              <input
                type="text"
                placeholder="Contoh: Koreksi penulisan representasi naratif / evaluasi gawai kedua"
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                disabled={isSaving}
                onClick={handleSaveScore}
                className="flex-1 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Menyimpan..." : "Simpan Nilai"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-2.5 bg-background border border-border text-xs font-bold rounded-xl text-muted-foreground hover:text-foreground"
              >
                Batal
              </button>
            </div>
          </div>

          {saveError && (
            <div className="mt-2 text-xs text-red-500 font-semibold">
              {saveError}
            </div>
          )}
        </div>
      )}

      {/* ── BILAH FORENSIK INTEGRITAS & TELEMETRI KETIK ── */}
      <div className="p-6 border-b border-border/60 bg-muted/20">
        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          Telemetri Integritas Ujian & Perilaku Pengetikan:
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Durasi Pengerjaan */}
          <div className="bg-background rounded-xl p-3 border border-border/70 flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Durasi</span>
              <Clock className="w-3.5 h-3.5 text-sky-500" />
            </div>
            <div className="text-base font-black text-sky-600 dark:text-sky-400">
              {formatDuration(submission.time_spent_seconds)}
            </div>
          </div>

          {/* Kecepatan Ketik (WPM) */}
          <div className="bg-background rounded-xl p-3 border border-border/70 flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Kecepatan Ketik</span>
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-foreground">
                {wpmValue !== null ? `${wpmValue} WPM` : "-"}
              </span>
              {wpmValue !== null && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  wpmValue <= 35 
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                    : wpmValue <= 60 
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : "bg-red-500/10 text-red-600 dark:text-red-400"
                }`}>
                  {wpmValue <= 35 ? "Normal" : wpmValue <= 60 ? "Cepat" : "Anomali"}
                </span>
              )}
            </div>
          </div>

          {/* Percobaan Burst/Paste */}
          <div className="bg-background rounded-xl p-3 border border-border/70 flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Burst / Copas</span>
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className={`text-base font-black ${burstCount > 0 ? "text-red-500" : "text-emerald-500"}`}>
                {burstCount}x
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                burstCount === 0 ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-red-500/10 text-red-500"
              }`}>
                {burstCount === 0 ? "Bersih" : "Terdeteksi"}
              </span>
            </div>
          </div>

          {/* Pindah Tab (Focus Loss) */}
          <div className={`rounded-xl p-3 border flex flex-col justify-between ${
            submission.tab_switches > 0 
              ? "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400" 
              : "bg-background border-border/70 text-foreground"
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Pindah Tab</span>
              <AlertTriangle className={`w-3.5 h-3.5 ${submission.tab_switches > 0 ? "text-red-500" : "text-emerald-500"}`} />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className={`text-base font-black ${submission.tab_switches > 0 ? "text-red-500" : "text-emerald-500"}`}>
                {submission.tab_switches}x
              </span>
              <span className="text-[10px] font-bold">
                {submission.tab_switches > 0 ? "Pelanggaran" : "Fokus Penuh"}
              </span>
            </div>
          </div>
        </div>

        {/* Notifikasi Khusus Jika Pindah Tab */}
        {submission.tab_switches > 0 && (
          <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-xs font-semibold">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              Mahasiswa tercatat keluar dari jendela ujian sebanyak <strong>{submission.tab_switches} kali</strong> selama pengerjaan. Nilai awal telah dikurangi penalti sistem.
            </span>
          </div>
        )}
      </div>

      {/* ── KONTEN JAWABAN MAHASISWA (BERSIH & TERSTRUKTUR) ── */}
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Lembar Jawaban Mahasiswa:
          </h4>
          <span className="text-xs text-muted-foreground">
            {questionEntries.length > 0 
              ? `${questionEntries.length} Butir Soal Terjawab`
              : isWarmup 
              ? "Sesi Obrolan Baseline" 
              : "1 Jawaban"}
          </span>
        </div>

        {/* KASUS A: Obrolan Pra-Ujian (Warmup Baseline) */}
        {isWarmup && (
          <div className="bg-background rounded-xl p-5 border border-border">
            <div className="text-xs font-bold text-sky-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MessageSquareQuote className="w-4 h-4" /> Obrolan Refleksi Mahasiswa (Golden Baseline):
            </div>
            <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
              {parsedAnswers.sampleText || "Mahasiswa menyelesaikan obrolan pra-ujian."}
            </p>
          </div>
        )}

        {/* KASUS B: Butir Soal Terurai (m5-essay-1, m5-essay-2, dst) */}
        {questionEntries.length > 0 && (
          <div className="space-y-6">
            {questionEntries.map(([qKey, rawAnswer], idx) => {
              const qDef = essayMap.get(qKey);
              const answerText = typeof rawAnswer === "string" ? rawAnswer : JSON.stringify(rawAnswer, null, 2);
              const wordCount = answerText.trim() ? answerText.trim().split(/\s+/).length : 0;
              const charCount = answerText.length;
              const qNum = idx + 1;
              const qAiFeedback = aiFeedbackMap[qNum];
              const isRubricOpen = !!openRubrics[qKey];

              return (
                <div 
                  key={qKey} 
                  className="bg-background rounded-xl border border-border/80 overflow-hidden shadow-sm"
                >
                  {/* Header Butir Soal */}
                  <div className="p-4 bg-muted/30 border-b border-border/70 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-primary text-primary-foreground font-black text-xs flex items-center justify-center">
                        #{qNum}
                      </span>
                      <div>
                        <div className="text-sm font-bold text-foreground">
                          Soal #{qNum} <span className="text-xs font-mono font-normal text-muted-foreground">({qKey})</span>
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {wordCount} kata • {charCount} karakter
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {qDef?.rubric && (
                        <button
                          onClick={() => toggleRubric(qKey)}
                          className="px-2.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-[11px] font-bold text-secondary-foreground border border-border flex items-center gap-1.5 transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-primary" />
                          <span>{isRubricOpen ? "Tutup Rubrik" : "Lihat Rubrik"}</span>
                          {isRubricOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      )}

                      <button
                        onClick={() => copyToClipboard(answerText, qKey)}
                        className="px-2.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-[11px] font-bold text-secondary-foreground border border-border flex items-center gap-1.5 transition-colors"
                        title="Salin jawaban mahasiswa"
                      >
                        {copiedKey === qKey ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-500">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Teks Instruksi Soal Asli (Jika Ada di Bank Soal) */}
                  {qDef?.text && (
                    <div className="p-4 bg-primary/5 border-b border-primary/15 text-xs text-foreground leading-relaxed">
                      <div className="font-bold text-primary mb-1 flex items-center gap-1.5">
                        <MessageSquareQuote className="w-3.5 h-3.5" /> Pertanyaan Soal:
                      </div>
                      <div className="whitespace-pre-wrap font-medium">
                        {qDef.text}
                      </div>
                    </div>
                  )}

                  {/* Kriteria Rubrik Penilaian (Collapsible) */}
                  {qDef?.rubric && isRubricOpen && (
                    <div className="p-4 bg-amber-500/5 border-b border-amber-500/20 text-xs text-foreground animate-in slide-in-from-top-1 duration-150">
                      <div className="font-bold text-amber-700 dark:text-amber-300 mb-1 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" /> Kriteria Penilaian Resmi (0 - 100):
                      </div>
                      <div className="whitespace-pre-wrap font-mono text-[11px] text-muted-foreground bg-background/60 p-3 rounded-lg border border-border/50">
                        {qDef.rubric.trim()}
                      </div>
                    </div>
                  )}

                  {/* Teks Jawaban Mahasiswa (Dibersihkan dari Simbol JSON) */}
                  <div className="p-5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      Jawaban Mahasiswa:
                    </div>
                    <div className="p-4 rounded-xl bg-muted/20 border border-border/60 text-sm leading-relaxed text-foreground whitespace-pre-wrap font-sans selection:bg-primary/20">
                      {answerText}
                    </div>
                  </div>

                  {/* Ulasan & Skor AI untuk Butir Soal Ini (Jika Ada) */}
                  {qAiFeedback && (
                    <div className="mx-5 mb-5 p-3.5 rounded-xl bg-primary/5 border border-primary/20 text-xs leading-relaxed">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-primary flex items-center gap-1.5">
                          <Bot className="w-3.5 h-3.5" /> Evaluasi AI Butir #{qNum}:
                        </span>
                        {qAiFeedback.score !== undefined && (
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-black text-xs">
                            Skor: {qAiFeedback.score}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-800 dark:text-slate-300 italic">
                        "{qAiFeedback.feedback}"
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* KASUS C: Jawaban Tunggal (Single Answer Fallback) */}
        {questionEntries.length === 0 && !isWarmup && (
          <div className="bg-background rounded-xl p-5 border border-border/80">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Jawaban Mahasiswa:
            </div>
            <div className="p-4 rounded-xl bg-muted/20 border border-border/60 text-sm leading-relaxed text-foreground whitespace-pre-wrap font-sans">
              {singleAnswer || (typeof submission.answers_json === "string" 
                ? submission.answers_json.replace(/^"|"$/g, "") 
                : JSON.stringify(submission.answers_json, null, 2))}
            </div>
          </div>
        )}

        {/* ── ULASAN MENYELURUH AI (JIKA ADA & BELUM TERURAI PER SOAL) ── */}
        {aiFeedbackFull && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 relative overflow-hidden mt-6">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Bot className="w-24 h-24" />
            </div>
            <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2 relative z-10">
              <Bot className="w-4 h-4" /> Ulasan Lengkap AI (Rubrikasi & Evaluasi):
            </h4>
            <div className="text-xs leading-relaxed text-slate-800 dark:text-slate-300 relative z-10 whitespace-pre-wrap font-sans">
              {aiFeedbackFull}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
