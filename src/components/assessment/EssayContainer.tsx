'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { useAntiCheat } from '@/hooks/useAntiCheat';
import { EssayQuestion } from '@/lib/essay-bank';
import { 
  Clock, 
  Send, 
  Sparkles, 
  FileEdit, 
  ShieldAlert, 
  ShieldCheck,
  Check, 
  AlertCircle, 
  Lock, 
  Unlock, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  Eye,
  Edit3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface EssayItemResult {
  id: string;
  question: string;
  answer: string;
  score: number;
  feedback: string;
  provider: string;
  attempts: number;
}

interface EssayContainerProps {
  questions: EssayQuestion[];
  userId: string;
  baselineProfile?: {
    wpm: number;
    backspaceRatio: number;
    sampleText: string;
    totalKeystrokes?: number;
  } | null;
  onComplete: (
    results: EssayItemResult[], 
    timeSpent: number, 
    tabSwitches: number,
    answers: Record<string, string>,
    telemetry?: {
      wpm: number;
      backspaceRatio: number;
      burstAttempts: number;
    }
  ) => void;
}

export function EssayContainer({ questions, userId, baselineProfile, onComplete }: EssayContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Index soal yang sedang aktif
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Jawaban per soal (key: question.id)
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  // Hasil evaluasi AI per soal
  const [results, setResults] = useState<Record<string, {
    score: number;
    feedback: string;
    provider: string;
    submittedAnswer: string;
    attempts: number;
  }>>({});

  // Mode tampilan untuk soal aktif: 'answering' | 'evaluating' | 'reviewed'
  const [questionMode, setQuestionMode] = useState<'answering' | 'evaluating' | 'reviewed'>('answering');
  
  // State untuk menampung error API secara inline (menghindari native alert yang mencuri fokus browser)
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Track soal mana saja yang sudah ditambahkan waktunya ke time bank
  const [unlockedTimeIndices, setUnlockedTimeIndices] = useState<Set<number>>(new Set([0]));

  // Waktu awal hanya dari soal pertama (misal 5 menit / 300 detik)
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 300);
  const [startTime] = useState(Date.now());
  const [showWarning, setShowWarning] = useState(false);
  const [burstAlert, setBurstAlert] = useState(false);

  // Hook Anti-Cheat Lini 1 (akan mematikan klik kanan, copy-paste, drag-drop, dan rekam telemetri)
  const { 
    tabSwitches, 
    lastSwitchTime, 
    burstAttempts, 
    keystrokeCount, 
    backspaceCount, 
    trackKeyInput, 
    filterInputBurst, 
    containerProps 
  } = useAntiCheat(true);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion?.id] || '';
  const currentResult = results[currentQuestion?.id];
  const currentWordCount = currentAnswer.trim().split(/\s+/).filter((w) => w.length > 0).length;

  // Auto-scroll ke tengah layar saat form esai dimuat, berpindah soal, atau berganti mode
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentIndex, questionMode]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      // Jika waktu habis, paksa kumpulkan semua yang sudah ada
      handleFinalSubmit();
      return;
    }

    // WAKTU BERHENTI jika sedang dinilai atau mereview. HANYA JALAN saat menjawab.
    if (questionMode !== 'answering') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, questionMode]);

  // Warning jika pindah tab
  useEffect(() => {
    if (lastSwitchTime) {
      setShowWarning(true);
      const t = setTimeout(() => setShowWarning(false), 3000);
      return () => clearTimeout(t);
    }
  }, [lastSwitchTime]);

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

  // Kirim soal aktif ke AI untuk dinilai langsung (dengan verifikasi baseline)
  const handleGradeCurrentQuestion = async () => {
    if (!currentQuestion || currentWordCount < 10) return;
    
    setQuestionMode('evaluating');
    setSubmitError(null);
    
    try {
      const timeElapsedSeconds = Math.max(10, Math.floor((Date.now() - startTime) / 1000));
      const currentWpm = Math.round(currentWordCount / (timeElapsedSeconds / 60));
      const currentBackspaceRatio = keystrokeCount > 0 ? Number((backspaceCount / keystrokeCount).toFixed(3)) : 0.1;

      const res = await fetch('/api/grade-essay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion.text,
          answer: currentAnswer,
          rubric: currentQuestion.rubric,
          baselineProfile: baselineProfile || null,
          currentTelemetry: {
            wpm: currentWpm,
            backspaceRatio: currentBackspaceRatio,
            burstAttempts,
            keystrokes: keystrokeCount
          }
        })
      });

      const data = await res.json();

      if (res.ok) {
        const score = typeof data.score === 'number' ? data.score : 0;
        const feedback = data.feedback || 'Evaluasi selesai.';
        const provider = data.provider || 'groq';

        const prevAttempts = results[currentQuestion.id]?.attempts || 0;

        setResults(prev => ({
          ...prev,
          [currentQuestion.id]: {
            score,
            feedback,
            provider,
            submittedAnswer: currentAnswer,
            attempts: prevAttempts + 1
          }
        }));

        setQuestionMode('reviewed');
      } else {
        setSubmitError(`Dosen AI sedang sibuk atau terjadi gangguan: ${data.details || data.error || '503 Service Unavailable'}. Silakan klik Kirim ulang.`);
        setQuestionMode('answering');
      }
    } catch (err) {
      setSubmitError('Gagal menghubungi API Dosen AI. Pastikan koneksi internet Anda stabil lalu coba kirim ulang.');
      setQuestionMode('answering');
    }
  };

  // Helper navigasi & akumulasi waktu
  const navigateToQuestion = (idx: number) => {
    setCurrentIndex(idx);
    
    // Tambahkan waktu jika soal ini baru pertama kali dibuka (sisa waktu terakumulasi)
    setUnlockedTimeIndices(prev => {
      if (!prev.has(idx)) {
        setTimeLeft(t => t + (questions[idx]?.timeLimit || 300));
        return new Set(prev).add(idx);
      }
      return prev;
    });

    const qId = questions[idx].id;
    if (results[qId] && results[qId].score >= 80) {
      setQuestionMode('reviewed');
    } else {
      setQuestionMode('answering');
    }
  };

  // Lanjut ke soal berikutnya (hanya bisa jika nilai >= 80)
  const handleProceedToNext = () => {
    if (currentIndex < questions.length - 1) {
      navigateToQuestion(currentIndex + 1);
    }
  };

  // Mulai mode revisi pada soal yang nilainya < 80
  const handleStartRevision = () => {
    setQuestionMode('answering');
  };

  // Kumpulkan seluruh ujian esai
  // Hanya soal yang SUDAH DIJAWAB DAN DINILAI yang masuk ke hasil akhir
  const handleFinalSubmit = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    // Filter: hanya soal yang benar-benar sudah dinilai AI (ada result-nya)
    const answeredQuestions = questions.filter(q => results[q.id]?.score !== undefined);
    
    if (answeredQuestions.length === 0) {
      // Tidak ada soal yang selesai sama sekali — tidak perlu submit
      return;
    }

    const formattedResults: EssayItemResult[] = answeredQuestions.map(q => {
      const res = results[q.id];
      return {
        id: q.id,
        question: q.text,
        answer: answers[q.id] || '',
        score: res?.score || 0,
        feedback: res?.feedback || 'Tidak ada evaluasi.',
        provider: res?.provider || 'groq',
        attempts: res?.attempts || 1
      };
    });

    const totalWords = answeredQuestions.reduce((acc, q) => acc + (answers[q.id] || '').trim().split(/\s+/).filter(w => w.length > 0).length, 0);
    const finalWpm = Math.round(totalWords / Math.max(0.5, timeSpent / 60));
    const finalBackspaceRatio = keystrokeCount > 0 ? Number((backspaceCount / keystrokeCount).toFixed(3)) : 0.1;

    onComplete(formattedResults, timeSpent, tabSwitches, answers, {
      wpm: finalWpm,
      backspaceRatio: finalBackspaceRatio,
      burstAttempts
    });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeLeft < 120;

  // Hitung jumlah soal yang sudah lolos (skor >= 80)
  const passedCount = useMemo(() => {
    return questions.filter(q => (results[q.id]?.score || 0) >= 80).length;
  }, [questions, results]);

  const isAllPassed = passedCount === questions.length;

  if (!currentQuestion) {
    return <div className="p-8 text-center text-slate-400">Menyiapkan bank soal esai...</div>;
  }

  const isCurrentPassed = (currentResult?.score || 0) >= 80;

  return (
    <div 
      ref={containerRef}
      {...containerProps} 
      id="essay-container-card"
      className={`w-full max-w-5xl xl:max-w-6xl mx-auto relative scroll-mt-36 ${containerProps.className}`}
    >
      {/* Warning Overlay */}
      <AnimatePresence>
        {showWarning && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-red-950/80 backdrop-blur-sm pointer-events-none p-4"
          >
            <div className="bg-[#1a0f14] border border-red-500/50 rounded-2xl p-6 md:p-8 flex flex-col items-center shadow-2xl max-w-md text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center mb-3">
                <ShieldAlert className="w-8 h-8 text-red-500 animate-pulse" />
              </div>
              <h2 className="text-xl md:text-2xl font-black text-red-400 mb-2">PERINGATAN AKADEMIK!</h2>
              <p className="text-slate-300 text-sm font-medium leading-relaxed">
                Terdeteksi perpindahan tab atau fokus browser.<br />
                Sistem Anti-Cheat mencatat penalti pada skor esai Anda.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="relative rounded-2xl overflow-hidden bg-card border border-slate-200 dark:border-slate-800 shadow-2xl transition-all">
        {/* Top Gradient Line */}
        <div className="w-full h-1 bg-gradient-to-r from-primary via-indigo-500 to-emerald-400" />

        {/* HEADER: Stepper Mastery Gateway & Timer */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/60">
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Step indicator pills */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {questions.map((q, idx) => {
                const res = results[q.id];
                const isPassed = (res?.score || 0) >= 80;
                const isNeedsRevision = res && res.score < 80;
                const isCurrent = idx === currentIndex;
                
                // Soal bisa diklik jika:
                // 1. Soal adalah soal pertama (idx === 0)
                // 2. Soal sebelumnya sudah lolos (idx > 0 && results[questions[idx-1].id]?.score >= 80)
                const isUnlocked = idx === 0 || (results[questions[idx - 1]?.id]?.score || 0) >= 80;

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      if (isUnlocked) {
                        navigateToQuestion(idx);
                      }
                    }}
                    type="button"
                    disabled={!isUnlocked}
                    className={`relative min-w-[28px] h-7 px-1.5 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent 
                        ? 'bg-primary text-white scale-110 shadow-md ring-2 ring-primary/40' 
                        : isPassed 
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/25 cursor-pointer' 
                          : isNeedsRevision
                            ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/40 hover:bg-amber-500/25 cursor-pointer'
                            : isUnlocked 
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 cursor-pointer' 
                              : 'bg-slate-100/60 dark:bg-slate-900/60 text-slate-400 dark:text-slate-600 border border-slate-200/80 dark:border-slate-800/80 cursor-not-allowed opacity-60'
                    }`}
                    title={
                      isPassed 
                        ? `Soal #${idx+1} Lolos (Skor: ${res?.score})` 
                        : isNeedsRevision 
                          ? `Soal #${idx+1} Perlu Perbaikan (Skor: ${res?.score})` 
                          : isUnlocked 
                            ? `Buka Soal #${idx+1}` 
                            : `Terkunci: Selesaikan Soal #${idx} terlebih dahulu`
                    }
                  >
                    {isPassed ? (
                      <span className="flex items-center gap-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    ) : isNeedsRevision ? (
                      <span className="text-[11px] font-black">{res?.score}</span>
                    ) : !isUnlocked ? (
                      <Lock className="w-2.5 h-2.5" />
                    ) : (
                      idx + 1
                    )}
                  </button>
                );
              })}
            </div>
            
            <span className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 font-semibold hidden sm:inline">
              Misi Esai: <strong className="text-emerald-600 dark:text-emerald-400">{passedCount}/5 Lolos (≥80)</strong>
            </span>
          </div>
          
          {/* Timer Display */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
            isTimeCritical 
              ? 'bg-red-500/10 border-red-500/40 text-red-600 dark:text-red-400 animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.2)]' 
              : 'bg-slate-100 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 shadow-sm'
          }`}>
            <Clock className={`w-3.5 h-3.5 ${isTimeCritical ? 'text-red-500 dark:text-red-400' : 'text-primary'}`} />
            <div className="flex flex-col items-end leading-none">
              <span className="text-[8px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Total Waktu</span>
              <span className="font-mono font-black text-xs sm:text-sm tabular-nums">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* BODY CONTENT */}
        <div className="p-3.5 sm:p-5">
          
          {/* 2. MODE PENILAIAN SEDANG BERJALAN (EVALUATING) */}
          {questionMode === 'evaluating' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-stretch">
              <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3 opacity-75">
                <div>
                  <div className="text-[11px] font-bold text-primary uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Pertanyaan Soal #{currentIndex + 1} dari 5:</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                      Standar Lolos: Skor ≥ 80
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                    {currentQuestion.text}
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Evaluasi AI Multidimensi Aktif...</div>
              </div>

              <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1">
                    Jawaban sedang dianalisis Dosen AI...
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md">
                    Jawaban Anda sedang dievaluasi berdasarkan rubrik logika dan standar materi kuliah. Harap tunggu sebentar.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3. MODE MENJAWAB (ANSWERING): LAYOUT DUA KOLOM BERSANDING */}
          {questionMode === 'answering' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-stretch">
              {/* KOLOM KIRI (5/12): Banner Dosen, Pengingat Integritas & Teks Soal */}
              <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between space-y-3 shadow-2xs">
                <div className="space-y-2.5">
                  {/* Banner Foto Semangat & Integritas dari Pak Hadiq */}
                  <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 dark:border-emerald-500/30">
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-emerald-500/50 shadow-sm relative bg-slate-200 dark:bg-slate-800">
                        <Image
                          src="/dosen-smile.png"
                          alt="Pak Hadiq"
                          width={44}
                          height={44}
                          className="object-cover w-full h-full"
                          priority
                        />
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                          Pesan Semangat dari Pak Hadiq:
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-semibold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 shrink-0">
                          <ShieldCheck className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                          Integritas
                        </span>
                      </div>
                      <p className="text-[10.5px] sm:text-[11px] text-slate-700 dark:text-slate-300 leading-snug italic">
                        &ldquo;Kerjakan dengan tenang ya! Bapak jauh lebih menghargai satu kalimat murni pemikiranmu sendiri daripada sepuluh paragraf salinan mesin. Kamu pasti bisa!&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Header Soal & Standar Kelulusan */}
                  <div className="text-[11px] font-bold text-primary uppercase tracking-wider flex items-center justify-between pt-0.5">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                      Pertanyaan Soal #{currentIndex + 1} dari 5:
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                      Standar Lolos: Skor ≥ 80
                    </span>
                  </div>

                  {/* Isi Pertanyaan Soal */}
                  <div className="bg-white dark:bg-slate-950/60 p-3 sm:p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80">
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                      {currentQuestion.text}
                    </p>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
                  <span>Sistem Mastery Gateway</span>
                  <span>Evaluasi AI Multidimensi</span>
                </div>
              </div>

              {/* KOLOM KANAN (7/12): Form Jawaban & Tombol Kirim Langsung */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-3 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-3.5 sm:p-4 shadow-2xs">
                <div className="space-y-2.5 flex-1 flex flex-col">
                  {/* Notifikasi jika ini adalah mode perbaikan/revisi */}
                  {currentResult && currentResult.score < 80 && (
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-700 dark:text-amber-300 block mb-0.5">Mode Perbaikan (Percobaan ke-{(currentResult.attempts || 1) + 1})</strong>
                        <span className="line-clamp-2">Saran Dosen AI sebelumnya: <em>"{currentResult.feedback}"</em></span>
                      </div>
                    </div>
                  )}

                  {/* Notifikasi jika ada Error API */}
                  {submitError && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-2.5 text-xs text-red-800 dark:text-red-200 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-red-700 dark:text-red-400 block mb-0.5">Gagal Mengirim Jawaban</strong>
                        <span>{submitError}</span>
                      </div>
                    </div>
                  )}

                  {/* Notifikasi jika ada paste massal (Delta Burst Limiter) */}
                  {burstAlert && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-2 text-xs text-red-800 dark:text-red-300 flex items-center gap-2 animate-bounce">
                      <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>Penyalinan teks massal diblokir sistem. Ketikkan penalaran Anda secara mandiri!</span>
                    </div>
                  )}

                  {/* Textarea Area */}
                  <div className="flex-1 flex flex-col min-h-[140px] sm:min-h-[160px] md:min-h-[175px]">
                    <textarea
                      value={currentAnswer}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      onKeyDown={trackKeyInput}
                      placeholder={`Tuliskan analisis & penjelasan Anda untuk Soal #${currentIndex + 1} di sini...`}
                      className="w-full flex-1 min-h-[140px] sm:min-h-[160px] bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700/80 rounded-xl p-3 sm:p-3.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-sans leading-relaxed shadow-2xs"
                    />
                  </div>
                </div>

                {/* Footer Controls & Tombol Kirim */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className={`text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-lg border ${
                      currentWordCount >= 10 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400' 
                        : 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/50 text-slate-500 dark:text-slate-400'
                    }`}>
                      {currentWordCount} Kata
                    </span>
                    
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> Copy-Paste Dinonaktifkan
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Tombol Lihat Review Sebelumnya */}
                    {currentResult && (
                      <button
                        type="button"
                        onClick={() => setQuestionMode('reviewed')}
                        className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-2 px-3 rounded-xl transition-all text-xs flex items-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Review</span>
                      </button>
                    )}

                    {/* Tombol Kirim untuk Dinilai AI */}
                    <button
                      type="button"
                      onClick={handleGradeCurrentQuestion}
                      disabled={currentWordCount < 10}
                      className="bg-primary hover:bg-primary/90 text-white font-bold py-2 sm:py-2.5 px-4 sm:px-5 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-xs sm:text-sm shadow-[0_0_15px_rgba(var(--primary),0.35)] cursor-pointer"
                    >
                      <span>Kirim Jawaban #{currentIndex + 1}</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* 4. MODE REVIEW LANGSUNG BERSANDING (REVIEWED) */}
          {questionMode === 'reviewed' && currentResult && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3.5"
            >
              {/* Banner Status Lolos / Perlu Revisi */}
              <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isCurrentPassed 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300' 
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300'
              }`}>
                <div className="flex items-center gap-2.5">
                  {isCurrentPassed ? (
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                      {isCurrentPassed 
                        ? `🎉 Selamat! Jawaban Memenuhi Standar Kelulusan` 
                        : `⚠️ Perlu Disempurnakan (Belum Mencapai 80)`}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {isCurrentPassed 
                        ? `Skor Anda telah memenuhi syarat (≥80). Pintu ke soal berikutnya telah dibuka!` 
                        : `Gunakan ulasan Dosen AI di bawah ini untuk melengkapi jawaban Anda lalu kirim ulang.`}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 bg-white dark:bg-black/30 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 self-end sm:self-auto shadow-2xs">
                  <div className={`text-2xl font-black ${isCurrentPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {currentResult.score}<span className="text-xs text-slate-400 font-normal">/100</span>
                  </div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Skor Soal #{currentIndex + 1}</div>
                </div>
              </div>

              {/* DUA PANEL BERSANDING: JAWABAN ANDA VS SARAN DOSEN AI */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Panel Kiri: Jawaban yang Dikirim */}
                <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <FileEdit className="w-3.5 h-3.5 text-primary" />
                      Jawaban Anda:
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Percobaan ke-{currentResult.attempts}
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans max-h-40 overflow-y-auto whitespace-pre-wrap pr-1">
                    {currentResult.submittedAnswer}
                  </p>
                </div>

                {/* Panel Kanan: Ulasan & Feedback Dosen AI */}
                <div className="bg-primary/5 dark:bg-slate-900/80 border border-primary/20 dark:border-slate-800 rounded-xl p-3.5 space-y-2">
                  <div className="text-[11px] font-bold text-primary uppercase tracking-wider flex items-center justify-between border-b border-primary/20 dark:border-slate-800 pb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Ulasan Dosen AI:
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal uppercase">
                      {currentResult.provider}
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-100 leading-relaxed font-medium max-h-40 overflow-y-auto pr-1">
                    "{currentResult.feedback}"
                  </p>
                </div>
              </div>

              {/* Action Buttons Sesuai Hasil */}
              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-700/40">
                {!isCurrentPassed ? (
                  /* JIKA BELUM LOLOS: TOMBOL PERBAIKI JAWABAN */
                  <button
                    type="button"
                    onClick={handleStartRevision}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-2.5 px-5 sm:px-6 rounded-xl transition-all active:scale-95 flex items-center gap-2 text-xs sm:text-sm shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Perbaiki &amp; Sempurnakan Jawaban</span>
                  </button>
                ) : (
                  /* JIKA SUDAH LOLOS: BISA EDIT LAGI ATAU LANJUT */
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleStartRevision}
                      className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-2.5 px-4 rounded-xl transition-all text-xs flex items-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Ubah Jawaban</span>
                    </button>

                    {currentIndex < questions.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleProceedToNext}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2.5 px-5 sm:px-6 rounded-xl transition-all active:scale-95 flex items-center gap-2 text-xs sm:text-sm shadow-[0_0_15px_rgba(16,185,129,0.35)] cursor-pointer"
                      >
                        <span>Lanjut ke Soal #{currentIndex + 2}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleFinalSubmit}
                        className="bg-primary hover:bg-primary/90 text-white font-extrabold py-2.5 px-6 sm:px-8 rounded-xl transition-all active:scale-95 flex items-center gap-2 text-xs sm:text-sm shadow-[0_0_20px_rgba(var(--primary),0.45)] cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Selesaikan Ujian & Simpan Nilai Rapor</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}



