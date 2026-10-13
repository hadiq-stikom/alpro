"use client";

import React, { useState, useRef } from "react";
import { 
  MessageSquareHeart, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Loader2, 
  Bot, 
  ArrowRight,
  Flame
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface PraktikumWarmupCardProps {
  moduleId: number;
  moduleTitle: string;
  onWarmupComplete: (baseline: {
    wpm: number;
    backspaceRatio: number;
    sampleText: string;
    keystrokes: number;
    backspaces: number;
  }) => void;
}

export default function PraktikumWarmupCard({
  moduleId,
  moduleTitle,
  onWarmupComplete,
}: PraktikumWarmupCardProps) {
  const { profile } = useAuth();
  const studentName = profile?.full_name?.split(" ")[0] || "Teman";

  const [reflectionText, setReflectionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teacherResponse, setTeacherResponse] = useState<string | null>(null);
  const [completedBaseline, setCompletedBaseline] = useState<{
    wpm: number;
    backspaceRatio: number;
  } | null>(null);

  // Telemetri pengetikan
  const startTimeRef = useRef<number | null>(null);
  const keystrokeCountRef = useRef<number>(0);
  const backspaceCountRef = useRef<number>(0);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }
    if (e.key === "Backspace" || e.key === "Delete") {
      backspaceCountRef.current += 1;
    } else if (e.key.length === 1 || e.key === "Enter") {
      keystrokeCountRef.current += 1;
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    alert("⚠️ Demi keakuratan profil baseline, ketikkan ceritamu secara santai kata demi kata!");
  };

  const wordCount = reflectionText.trim().split(/\s+/).filter(Boolean).length;
  const isEligible = wordCount >= 10;

  const handleSendReflection = async () => {
    if (!isEligible) {
      alert("Tuliskan cerita santaimu minimal 10 kata agar profil ritme ketikan dapat terbentuk akurat.");
      return;
    }

    setIsSubmitting(true);

    const elapsedSeconds = startTimeRef.current
      ? Math.max(10, Math.floor((Date.now() - startTimeRef.current) / 1000))
      : 30;
    const minutes = elapsedSeconds / 60;
    const calcWpm = Math.max(6, Math.round(wordCount / minutes));
    const calcBackspaceRatio =
      keystrokeCountRef.current > 0
        ? Number((backspaceCountRef.current / keystrokeCountRef.current).toFixed(3))
        : 0.12;

    const baselineData = {
      wpm: calcWpm,
      backspaceRatio: calcBackspaceRatio,
      sampleText: reflectionText.trim(),
      keystrokes: keystrokeCountRef.current,
      backspaces: backspaceCountRef.current,
    };

    try {
      // 1. Simpan baseline ke database quiz_submissions via submit-assessment API
      const res = await fetch("/api/submit-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: profile?.id,
          class_id: profile?.class_id,
          meeting_id: moduleId,
          quiz_type: "quiz",
          quiz_key: `praktikum-m${moduleId}-warmup`,
          score: 100,
          time_spent_seconds: elapsedSeconds,
          tab_switches: 0,
          ai_feedback: "Selesai Refleksi Pemanasan Workbench (Golden Baseline Praktikum Terbentuk)",
          answers_json: {
            sampleText: baselineData.sampleText,
            wpm: baselineData.wpm,
            backspaceRatio: baselineData.backspaceRatio,
            keystrokes: baselineData.keystrokes,
            backspaces: baselineData.backspaces,
          },
        }),
      });

      if (!res.ok) {
        console.warn("Gagal menyimpan baseline via submit-assessment API, tetap lanjut lokal.");
      }

      // Berikan respons apresiatif hangat ala Pak Hadiq
      const responseMsg = `Wah, pengamatan yang sangat menarik, ${studentName}! Mengetahui bagaimana mesin memproses instruksi secara langsung di workbench adalah modal berharga. Sekarang, Golden Baseline orisinalitasmu sudah resmi aktif (~${calcWpm} WPM). Silakan lanjutkan menuangkan analisis dan kesimpulan ilmiahmu di bawah ya!`;
      
      setTeacherResponse(responseMsg);
      setCompletedBaseline({
        wpm: calcWpm,
        backspaceRatio: calcBackspaceRatio,
      });

      // Panggil callback agar parent tahu baseline sudah terbentuk
      onWarmupComplete(baselineData);
    } catch (err) {
      console.error("Error saving reflection baseline:", err);
      // Fallback tetap selesaikan agar tidak memblokir mahasiswa
      setTeacherResponse(`Bagus sekali refleksimu, ${studentName}! Golden Baseline telah tersimpan. Silakan lanjutkan ke bagian Analisis.`);
      setCompletedBaseline({
        wpm: calcWpm,
        backspaceRatio: calcBackspaceRatio,
      });
      onWarmupComplete(baselineData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10 border-2 border-indigo-500/30 dark:border-indigo-500/40 shadow-xl space-y-6">
      {/* Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 text-indigo-500 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/40 shadow-sm">
            <MessageSquareHeart className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30">
                Pemanasan Pra-Analisis On-Demand
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight mt-0.5">
              Refleksi Cepat Uji Workbench
            </h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-medium">
              Ceritakan secara santai hasil uji cobamu untuk mengaktifkan Golden Baseline keaslian ketikan.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-500/20 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-indigo-500" />
          <span>Aktivasi Golden Baseline</span>
        </div>
      </div>

      {/* Sapaan Pak Hadiq */}
      <div className="flex items-start gap-3.5 p-4.5 rounded-2xl bg-card border border-border/80 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow">
          H
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-foreground">Pak Hadiq, ST, M.Kom</span>
            <span className="text-[11px] text-slate-400 font-mono">Dosen Pengampu</span>
          </div>
          <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            &ldquo;Halo <strong>{studentName}</strong>! Sebelum mulai menulis analisis resmi pada Bagian D di bawah, ceritakan santai dulu ke Bapak: bagaimana tadi saat kamu mencoba instruksi kode pada <strong>{moduleTitle}</strong> di terminal Workbench? Apakah ada hasil keluaran mesin atau alokasi byte yang sempat bikin kamu heran atau menarik perhatianmu?&rdquo;
          </p>
        </div>
      </div>

      {/* Tanggapan Pak Hadiq Jika Sudah Dikirim */}
      {teacherResponse ? (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-start gap-3.5 p-4.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow">
              ✓
            </div>
            <div className="space-y-1">
              <span className="font-extrabold text-sm text-emerald-700 dark:text-emerald-300">
                Tanggapan Pak Hadiq:
              </span>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                &ldquo;{teacherResponse}&rdquo;
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                Golden Baseline Terbentuk: ~{completedBaseline?.wpm} WPM • Rasio Koreksi {Math.round((completedBaseline?.backspaceRatio || 0.1) * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                Formulir Analisis &amp; Kesimpulan Terbuka
              </span>
              <a
                href="#bagian-analisis-container"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold inline-flex items-center gap-1.5 transition-all shadow-sm shadow-emerald-600/20 cursor-pointer"
              >
                <span>Lanjut ke Bagian D</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* Form Ketikan Mahasiswa */
        <div className="space-y-3">
          <div className="relative">
            <textarea
              rows={3}
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder={`Contoh: Tadi pas coba di terminal workbench, pas pembagian integer hasilnya otomatis dipotong jadi bulat pak. Terus alokasi memori string ternyata nambah sesuai panjang karakter...`}
              className="w-full p-4 rounded-2xl bg-background border border-border/80 text-foreground font-sans text-xs md:text-sm focus:ring-2 focus:ring-indigo-500/40 focus:outline-none leading-relaxed"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-500 font-medium">
              {wordCount < 10 ? (
                <span className="text-amber-500 font-semibold">
                  Tuliskan minimal 10 kata ({wordCount}/10 kata)
                </span>
              ) : (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {wordCount} kata terketik (Sudah memenuhi syarat baseline)
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleSendReflection}
              disabled={isSubmitting || !isEligible}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all ${
                !isEligible
                  ? "bg-secondary text-muted-foreground cursor-not-allowed opacity-60 border border-border/60"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-indigo-500/20"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Merekam Baseline...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Refleksi &amp; Aktifkan Baseline</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
