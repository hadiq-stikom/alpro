'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle2, ChevronRight, Send, AlertTriangle, Check, Sparkles } from 'lucide-react';
import { useAntiCheat } from '@/hooks/useAntiCheat';
import { QuizTimer } from './QuizTimer';
import { Question } from '@/lib/question-bank';
import { seededShuffle } from '@/lib/quiz-utils';
import { calculateFinalScore } from '@/lib/badges';

interface QuizContainerProps {
  questions: Question[]; 
  userId: string;
  meetingId?: number;
  timeLimitPerQuestion?: number; // Batas waktu per soal dalam detik
  onComplete: (
    finalScore: number, 
    timeReward: number,
    timeSpent: number, 
    tabSwitches: number, 
    answers: Record<string, string>
  ) => void;
}

export function QuizContainer({ 
  questions, 
  userId, 
  meetingId = 1, 
  timeLimitPerQuestion = 60,
  onComplete 
}: QuizContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Acak urutan soal secara deterministik
  const randomizedQuestions = useMemo(() => {
    return seededShuffle(questions, `${userId}-meeting${meetingId}-questions`);
  }, [questions, userId, meetingId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [startTime] = useState(Date.now());
  const [showWarning, setShowWarning] = useState(false);

  // 2. Anti-Cheat hook
  const { tabSwitches, containerProps, lastSwitchTime } = useAntiCheat(!isFinished);

  // Warning jika pindah tab
  useEffect(() => {
    if (lastSwitchTime) {
      setShowWarning(true);
      const t = setTimeout(() => setShowWarning(false), 3000);
      return () => clearTimeout(t);
    }
  }, [lastSwitchTime]);

  const currentQuestion = randomizedQuestions[currentIndex];

  // 3. Acak opsi jawaban per soal
  const randomizedOptions = useMemo(() => {
    if (!currentQuestion) return [];
    return seededShuffle(currentQuestion.options, `${userId}-q${currentQuestion.id}-opts`);
  }, [currentQuestion, userId]);

  // Auto-scroll ke posisi tengah layar agar tidak terpotong navbar atas atau bawah layar
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentIndex]);

  // Keyboard shortcut untuk memilih jawaban (1-4 / A-D) dan Enter untuk lanjut
  useEffect(() => {
    if (isFinished || !currentQuestion) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      const keyMap: Record<string, number> = {
        '1': 0, 'A': 0,
        '2': 1, 'B': 1,
        '3': 2, 'C': 2,
        '4': 3, 'D': 3,
      };

      if (key in keyMap) {
        const optIndex = keyMap[key];
        if (randomizedOptions[optIndex]) {
          handleSelectOption(randomizedOptions[optIndex].id);
        }
      } else if (e.key === 'Enter' && answers[currentQuestion.id]) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, answers, randomizedOptions, currentQuestion, isFinished]);

  if (!currentQuestion && !isFinished) {
    return <div className="p-8 text-center text-slate-400 animate-pulse">Menyiapkan ruang ujian...</div>;
  }

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleNext = () => {
    if (currentIndex < randomizedQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    if (isFinished) return;
    setIsFinished(true);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const totalTimeLimit = randomizedQuestions.reduce((acc, q) => acc + (q.timeLimit || timeLimitPerQuestion), 0);
    
    let correct = 0;
    randomizedQuestions.forEach(q => {
      if (answers[q.id] === q.correctOptionId) {
        correct++;
      }
    });
    
    const { finalScore, timeReward } = calculateFinalScore(
      correct, 
      randomizedQuestions.length, 
      totalTimeLimit, 
      timeSpent, 
      tabSwitches
    );
    
    onComplete(finalScore, timeReward, timeSpent, tabSwitches, answers);
  };

  const handleTimeUp = () => {
    handleNext();
  };

  const progressPercent = ((currentIndex + 1) / randomizedQuestions.length) * 100;
  const isCurrentAnswered = !!answers[currentQuestion?.id];

  return (
    <div 
      ref={containerRef}
      {...containerProps} 
      className={`relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden bg-[#121929] border border-slate-700/60 shadow-2xl transition-all ${containerProps.className}`}
    >
      {/* Top Animated Progress Bar */}
      <div className="w-full h-1 bg-slate-800/80 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary via-indigo-500 to-emerald-400"
          initial={{ width: `${((currentIndex) / randomizedQuestions.length) * 100}%` }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>

      {/* HEADER: Stepper & Timer (Ringkas & Rapi) */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          {/* Step indicator pills */}
          <div className="flex items-center gap-1">
            {randomizedQuestions.map((q, idx) => {
              const isAnswered = !!answers[q.id];
              const isCurrent = idx === currentIndex;
              return (
                <div
                  key={q.id}
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-200 ${
                    isCurrent 
                      ? 'bg-primary text-white scale-110 shadow-sm ring-2 ring-primary/40' 
                      : isAnswered 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {isAnswered && !isCurrent ? (
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  ) : (
                    idx + 1
                  )}
                </div>
              );
            })}
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Soal {currentIndex + 1}/{randomizedQuestions.length}
          </span>
        </div>

        {!isFinished && (
          <QuizTimer 
            key={currentQuestion.id}
            duration={currentQuestion.timeLimit || timeLimitPerQuestion} 
            onTimeUp={handleTimeUp} 
            isActive={!isFinished} 
          />
        )}
      </div>

      {/* WARNING OVERLAY */}
      <AnimatePresence>
        {showWarning && (
          <motion.div 
            initial={{ opacity: 0, y: -15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="absolute top-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 px-4 py-1.5 bg-red-500 text-white text-[11px] font-bold rounded-full shadow-lg shadow-red-500/30 backdrop-blur-md"
          >
            <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
            <span>Peringatan! Pelanggaran Ujian Terdeteksi.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KONTEN UTAMA DENGAN SLIDE ANIMATION */}
      {!isFinished ? (
        <div className="p-4 sm:p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {/* Question Text (Compact & Readable) */}
              <div className="mb-3.5">
                <h2 className="text-sm sm:text-base font-semibold text-white leading-snug">
                  {currentQuestion.text}
                </h2>
              </div>

              {/* 2-Column Responsive Grid untuk Pilihan Jawaban (Sangat Menghemat Ruang Vertikal!) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {randomizedOptions.map((opt, index) => {
                  const isSelected = answers[currentQuestion.id] === opt.id;
                  
                  return (
                    <motion.button
                      key={opt.id}
                      type="button"
                      whileHover={{ scale: 1.005 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full flex items-center p-2.5 sm:p-3 rounded-xl text-left border transition-all duration-150 cursor-pointer select-none
                        ${isSelected 
                          ? 'bg-primary/20 border-primary shadow-[0_0_12px_rgba(var(--primary),0.3)] text-white' 
                          : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.07] hover:border-white/20 hover:text-white'
                        }`}
                    >
                      <div className={`flex items-center justify-center w-6 h-6 rounded-lg mr-2.5 text-xs font-bold shrink-0 transition-colors
                        ${isSelected 
                          ? 'bg-primary text-white' 
                          : 'bg-slate-800/90 border border-slate-700 text-slate-400'}`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1 text-xs sm:text-sm leading-tight">
                        {opt.text}
                      </span>
                      
                      {isSelected && (
                        <motion.div 
                          initial={{ scale: 0 }} 
                          animate={{ scale: 1 }} 
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          className="ml-1.5 shrink-0"
                        >
                          <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-white">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* FOOTER: Selalu Terlihat Tanpa Scroll */}
          <div className="mt-4 pt-3 border-t border-white/5 flex flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Pilih A-D lalu tekan Enter ↵</span>
            </div>
            
            <button
              onClick={handleNext}
              disabled={!isCurrentAnswered}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 shadow-md ${
                isCurrentAnswered
                  ? 'bg-primary hover:bg-primary/90 text-white shadow-primary/30 hover:scale-[1.03] cursor-pointer'
                  : 'bg-slate-800 text-slate-500 opacity-40 cursor-not-allowed'
              }`}
            >
              {currentIndex < randomizedQuestions.length - 1 ? (
                <>
                  <span>Lanjut</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>Kirim Jawaban</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 flex flex-col items-center justify-center text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
            <div className="relative w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
          </div>
          <h2 className="text-lg font-bold text-white mb-1.5">Kuis MCQ Selesai!</h2>
          <p className="text-slate-400 text-xs max-w-xs mx-auto">
            Memvalidasi hasil kuis Anda...
          </p>
        </motion.div>
      )}
    </div>
  );
}
