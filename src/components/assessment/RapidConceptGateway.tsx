'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAntiCheat } from '@/hooks/useAntiCheat';
import { ConceptQuestion, getRandomConceptsByMeetingId } from '@/lib/concept-bank';
import { 
  Clock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Unlock, 
  RefreshCcw, 
  ShieldCheck, 
  BrainCircuit,
  KeyRound,
  FileEdit,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ConceptBaselineProfile {
  wpm: number;
  backspaceRatio: number;
  sampleText: string;
  totalKeystrokes: number;
  totalBackspaces: number;
  tabSwitches: number;
  timeSpentSeconds: number;
}

interface RapidConceptGatewayProps {
  meetingId: number;
  onGatewayPassed: (score: number, baseline: ConceptBaselineProfile) => void;
  onRetake: () => void;
}

export function RapidConceptGateway({ meetingId, onGatewayPassed, onRetake }: RapidConceptGatewayProps) {
  // Ambil 3 pertanyaan acak untuk pertemuan ini
  const questions = useMemo(() => getRandomConceptsByMeetingId(meetingId, 3), [meetingId]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  // Timer 90 detik (1.5 menit) per istilah
  const [timeLeft, setTimeLeft] = useState<number>(90);
  const [isTimeCritical, setIsTimeCritical] = useState(false);
  
  // Telemetri kumulatif
  const [startTime] = useState<number>(Date.now());
  const [burstAlert, setBurstAlert] = useState(false);
  
  // State alur pengerjaan
  const [status, setStatus] = useState<'testing' | 'evaluating' | 'passed' | 'failed'>('testing');
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    feedback: string;
    itemScores: Array<{ id: string; score: number; feedback: string }>;
    baseline: ConceptBaselineProfile;
  } | null>(null);

  // Hook Anti-Cheat Lini 1
  const { 
    tabSwitches, 
    lastSwitchTime, 
    burstAttempts, 
    keystrokeCount, 
    backspaceCount, 
    trackKeyInput, 
    filterInputBurst, 
    containerProps 
  } = useAntiCheat(status === 'testing');

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion?.id] || '';
  const currentWordCount = currentAnswer.trim().split(/\s+/).filter(w => w.length > 0).length;

  // Reset timer 90 detik setiap kali pindah soal
  useEffect(() => {
    setTimeLeft(currentQuestion?.timeLimit || 90);
    setIsTimeCritical(false);
  }, [currentIndex, currentQuestion]);

  // Timer loop
  useEffect(() => {
    if (status !== 'testing') return;

    if (timeLeft <= 0) {
      // Waktu 90 detik habis: otomatis maju ke soal berikutnya atau kumpulkan
      handleAutoAdvanceOnTimeout();
      return;
    }

    if (timeLeft <= 20) {
      setIsTimeCritical(true);
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, status, currentIndex]);

  const handleAnswerChange = (val: string) => {
    if (!currentQuestion) return;
    const prev = answers[currentQuestion.id] || '';
    const { safeValue, isBurst } = filterInputBurst(prev, val, 15);
    
    if (isBurst) {
      setBurstAlert(true);
      setTimeout(() => setBurstAlert(false), 3500);
    }

    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestion.id]: safeValue
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Soal terakhir selesai, kirim ke AI evaluator
      handleSubmitAllConcepts();
    }
  };

  const handleAutoAdvanceOnTimeout = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleSubmitAllConcepts();
    }
  };

  const handleSubmitAllConcepts = async () => {
    setStatus('evaluating');

    const totalDurationSeconds = Math.round((Date.now() - startTime) / 1000);

    const payload = {
      meetingId,
      concepts: questions.map(q => ({
        id: q.id,
        term: q.term,
        answer: answers[q.id] || '',
        rubric: q.rubric,
        keywords: q.keywords
      })),
      telemetry: {
        timeSpentSeconds: totalDurationSeconds,
        keystrokeCount,
        backspaceCount,
        tabSwitches,
        burstAttempts
      }
    };

    try {
      const res = await fetch('/api/grade-concept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.isPassed) {
        setEvaluationResult(data);
        setStatus('passed');
      } else {
        setEvaluationResult(data);
        setStatus('failed');
      }
    } catch (err) {
      console.error('Gagal mengevaluasi konsep:', err);
      // Fallback kelulusan darurat jika jaringan terputus
      const fallbackBaseline: ConceptBaselineProfile = {
        wpm: 25,
        backspaceRatio: 0.1,
        sampleText: Object.values(answers).join(' '),
        totalKeystrokes: keystrokeCount,
        totalBackspaces: backspaceCount,
        tabSwitches,
        timeSpentSeconds: totalDurationSeconds
      };
      setEvaluationResult({
        score: 75,
        feedback: 'Konsep dasar diterima secara lokal.',
        itemScores: questions.map(q => ({ id: q.id, score: 75, feedback: 'Cukup.' })),
        baseline: fallbackBaseline
      });
      setStatus('passed');
    }
  };

  // Format detik ke MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // ==========================================
  // RENDER: STATUS EVALUATING
  // ==========================================
  if (status === 'evaluating') {
    return (
      <div className="bg-card border border-primary/30 rounded-3xl p-10 text-center max-w-xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-emerald-400 to-primary animate-pulse"></div>
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-5">
          <BrainCircuit className="w-8 h-8 text-primary animate-pulse" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Menganalisis Definisi Konsep...
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto mb-6 leading-relaxed">
          Dosen AI sedang menilai pemahaman 3 istilah inti Anda dan memetakan Profil Baseline Personal (WPM & gaya bahasa).
        </p>
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-primary">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
          <span>Memvalidasi orisinalitas kalimat...</span>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: STATUS PASSED (GERBANG TERBUKA)
  // ==========================================
  if (status === 'passed' && evaluationResult) {
    return (
      <div className="bg-card border-2 border-emerald-500/40 rounded-3xl p-8 sm:p-10 text-center max-w-xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500 shadow-[0_0_15px_#10B981]"></div>
        
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
          <Unlock className="w-8 h-8 text-emerald-500" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>GERBANG KONSEPTUAL LOLOS ({evaluationResult.score}/100)</span>
        </div>

        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
          Akses Ujian Esai Terbuka!
        </h3>
        
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
          {evaluationResult.feedback}
        </p>

        {/* METRIK BASELINE PERSONAL */}
        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-6 text-left space-y-2.5">
          <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-primary" />
            <span>Profil Karakteristik Pengetikan Anda (Baseline):</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-white dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Kecepatan Ketik</span>
              <strong className="text-sm font-black text-slate-900 dark:text-white">
                {evaluationResult.baseline.wpm} WPM
              </strong>
            </div>

            <div className="bg-white dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Rasio Koreksi (Backspace)</span>
              <strong className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                {Math.round(evaluationResult.baseline.backspaceRatio * 100)}%
              </strong>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
            *Metrik ini akan menjadi tolok ukur verifikasi konsistensi gaya bahasa dan ritme pengetikan pada Ujian Esai.
          </p>
        </div>

        <button
          onClick={() => onGatewayPassed(evaluationResult.score, evaluationResult.baseline)}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group text-sm sm:text-base cursor-pointer"
        >
          <span>Lanjut ke Ujian Esai Utama</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    );
  }

  // ==========================================
  // RENDER: STATUS FAILED (GERBANG TERTUTUP)
  // ==========================================
  if (status === 'failed' && evaluationResult) {
    return (
      <div className="bg-card border-2 border-red-500/40 rounded-3xl p-8 sm:p-10 text-center max-w-xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-red-500 shadow-[0_0_15px_#EF4444]"></div>
        
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>

        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
          Gerbang Konsep Belum Memenuhi Syarat
        </h3>
        
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
          Skor pemahaman konsep Anda: <strong className="text-red-500">{evaluationResult.score} / 70 (Standar Minimum)</strong>. 
          {evaluationResult.feedback}
        </p>

        {/* Rincian Istilah */}
        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-6 text-left space-y-3">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block uppercase">
            Catatan Perbaikan Istilah:
          </span>
          {evaluationResult.itemScores.map((it, idx) => (
            <div key={idx} className="text-xs border-b border-slate-200 dark:border-slate-800 pb-2 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-center font-bold">
                <span className="text-slate-800 dark:text-slate-200">Istilah #{idx + 1}</span>
                <span className={it.score >= 70 ? 'text-emerald-500' : 'text-red-400'}>{it.score} / 100</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">{it.feedback}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onRetake}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 rounded-xl border border-slate-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCcw className="w-5 h-5" />
          <span>Pelajari Materi & Ulangi Gerbang Konsep</span>
        </button>
      </div>
    );
  }

  // ==========================================
  // RENDER: STATUS TESTING (ESTAFET 3 SOAL @ 90 DETIK)
  // ==========================================
  if (!currentQuestion) {
    return null;
  }

  return (
    <div 
      {...containerProps}
      className="bg-card border-2 border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-2xl mx-auto overflow-hidden relative"
    >
      {/* HEADER GERBANG KONSEP */}
      <div className="px-5 py-4 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black text-xs">
            {currentIndex + 1}/3
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Gerbang Istilah Kunci
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                Tahap 1
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
              Definisikan istilah dengan kalimat orisinal Anda
            </span>
          </div>
        </div>

        {/* TIMER 90 DETIK */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono transition-all ${
          isTimeCritical
            ? 'bg-red-500/10 border-red-500/40 text-red-600 dark:text-red-400 animate-pulse font-bold'
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold'
        }`}>
          <Clock className={`w-3.5 h-3.5 ${isTimeCritical ? 'text-red-500' : 'text-primary'}`} />
          <div className="flex flex-col items-end leading-none">
            <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">Waktu Istilah</span>
            <span className="text-xs sm:text-sm font-black tabular-nums">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* INDIKATOR STEP ESTAFET */}
      <div className="grid grid-cols-3 gap-1 px-5 pt-3">
        {questions.map((q, idx) => (
          <div 
            key={q.id}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx < currentIndex 
                ? 'bg-emerald-500' 
                : idx === currentIndex 
                  ? 'bg-primary' 
                  : 'bg-slate-200 dark:bg-slate-800'
            }`}
          />
        ))}
      </div>

      {/* BODY FORM MENJAWAB */}
      <div className="p-5 sm:p-6 space-y-4">
        
        {/* KARTU ISTILAH AKTIF */}
        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 sm:p-5 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              Istilah #{currentIndex + 1} dari 3:
            </span>
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
              Batas: 1.5 Menit (90 Detik)
            </span>
          </div>

          <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2">
            "{currentQuestion.term}"
          </h4>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            {currentQuestion.prompt}
          </p>
        </div>

        {/* ALERT JIKA ADA BURST INJECTION */}
        {burstAlert && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-xs text-red-600 dark:text-red-400 flex items-center gap-2 animate-bounce">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Penyalinan teks dalam jumlah besar diblokir sistem. Mohon ketikkan definisi secara mandiri!</span>
          </div>
        )}

        {/* TEXTAREA PENJELASAN KONSEP */}
        <div>
          <textarea
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            onKeyDown={trackKeyInput}
            placeholder={`Jelaskan apa itu "${currentQuestion.term}" dan fungsinya menurut pemahaman Anda (1–2 kalimat singkat)...`}
            className="w-full h-28 sm:h-32 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-sans leading-relaxed"
          />
        </div>

        {/* FOOTER & BUTTON */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
              currentWordCount >= 6 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
            }`}>
              {currentWordCount} Kata (Min. 6 kata)
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              *Tulis dengan lugas
            </span>
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={currentWordCount < 5}
            className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              currentWordCount >= 5
                ? 'bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-primary/25'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-300 dark:border-slate-700'
            }`}
          >
            {currentIndex < questions.length - 1 ? (
              <>
                <span>Lanjut ke Istilah #{currentIndex + 2}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Selesaikan & Buka Gerbang Esai</span>
                <Sparkles className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
