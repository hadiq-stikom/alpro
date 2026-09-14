'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { QuizContainer } from '@/components/assessment/QuizContainer';
import { AssessmentGateway } from '@/components/assessment/AssessmentGateway';
import { EssayContainer } from '@/components/assessment/EssayContainer';
import { getQuestionsByMeetingId } from '@/lib/question-bank';
import { getEssaysByMeetingId } from '@/lib/essay-bank';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { CheckCircle2, RotateCcw, AlertTriangle, Lock, FileText, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBadgeFromScore } from '@/lib/badges';
import Link from 'next/link';

interface TheoryAssessmentProps {
  meetingId: number;
}

export function TheoryAssessment({ meetingId }: TheoryAssessmentProps) {
  const { profile } = useAuth();
  
  const [stage, setStage] = useState<'intro' | 'mcq' | 'gateway' | 'essay' | 'result'>('intro');
  const [mcqScore, setMcqScore] = useState<number | null>(null);
  const [mcqTabSwitches, setMcqTabSwitches] = useState(0);
  
  const [isGrading, setIsGrading] = useState(false);
  const [essayResult, setEssayResult] = useState<{
    score: number;
    feedback: string;
    aiProvider: string;
    finalScore: number; 
    breakdown?: Array<{ id: string; score: number; feedback: string }>;
  } | null>(null);
  
  // State for Context-Aware UI
  const [prevGrade, setPrevGrade] = useState<{ score: number; badge: any } | null>(null);
  const [loadingPrevGrade, setLoadingPrevGrade] = useState(true);

  const questions = useMemo(() => getQuestionsByMeetingId(meetingId), [meetingId]);
  const essayQuestions = useMemo(() => getEssaysByMeetingId(meetingId), [meetingId]);

  // Cek apakah mahasiswa sudah punya nilai sebelumnya
  useEffect(() => {
    async function fetchPreviousGrade() {
      if (!profile?.id || profile.role !== 'mahasiswa') {
        setLoadingPrevGrade(false);
        return;
      }
      
      try {
        const { data } = await supabase
          .from('meeting_grades' as any)
          .select('avg_score')
          .eq('user_id', profile.id)
          .eq('meeting_id', meetingId)
          .limit(1)
          .maybeSingle();
          
        if (data && (data as any).avg_score !== null) {
          const s = (data as any).avg_score;
          setPrevGrade({
            score: s,
            badge: getBadgeFromScore(s)
          });
        } else {
          setPrevGrade(null);
        }
      } catch (err) {
        console.error('Gagal mengambil riwayat nilai mahasiswa:', err);
      } finally {
        setLoadingPrevGrade(false);
      }
    }
    
    fetchPreviousGrade();
  }, [profile?.id, meetingId]);

  // Scroll smoothly to assessment when entering active stages
  useEffect(() => {
    if (stage !== 'intro') {
      const el = document.getElementById('assessment-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [stage]);

  // Helper untuk menyimpan ke Supabase
  const saveSubmissionToDB = async (
    quizType: 'quiz' | 'essay',
    quizId: string,
    score: number,
    timeSpent: number,
    tabSwitches: number,
    answers: Record<string, any>,
    aiFeedback?: string
  ) => {
    if (!profile?.id || profile.role !== 'mahasiswa') return;

    try {
      await (supabase.from('quiz_submissions' as any) as any).insert({
        user_id: profile.id,
        class_id: profile.class_id || null,
        meeting_id: meetingId,
        quiz_type: quizType,
        quiz_id: quizId,
        score: score,
        time_spent_seconds: timeSpent,
        tab_switches: tabSwitches,
        answers: {
          ...answers,
          ai_feedback: aiFeedback || null
        }
      });
      
      // Update state prevGrade secara lokal agar UI sinkron
      setPrevGrade({
        score: score,
        badge: getBadgeFromScore(score)
      });

    } catch (e) {
      console.error('Gagal menyimpan hasil submission:', e);
    }
  };

  const handleMCQComplete = async (accuracy: number, timeReward: number, timeSpent: number, tabSwitches: number, answers: Record<string, string>) => {
    setMcqScore(accuracy);
    setMcqTabSwitches(tabSwitches);
    
    // Simpan MCQ Result ke database
    await saveSubmissionToDB('quiz', `m${meetingId}-mcq`, accuracy, timeSpent, tabSwitches, answers);
    
    setStage('gateway');
  };

  const handleEssayComplete = async (
    completedResults: Array<{
      id: string;
      question: string;
      answer: string;
      score: number;
      feedback: string;
      provider: string;
      attempts: number;
    }>,
    timeSpent: number,
    tabSwitches: number,
    answers: Record<string, string>
  ) => {
    if (!essayQuestions || essayQuestions.length === 0) return;
    
    setIsGrading(true);
    setStage('result');
    
    try {
      const totalScore = completedResults.reduce((acc, curr) => acc + curr.score, 0);
      const rawScore = Math.round(totalScore / (completedResults.length || 1));
      const penalty = tabSwitches * 5;
      const finalCalculated = Math.max(0, rawScore - penalty);
      
      const feedbackSummary = completedResults
        .map((r, idx) => `Soal #${idx + 1} (Skor ${r.score}): ${r.feedback}`)
        .join('\n\n');

      setEssayResult({
        score: rawScore,
        feedback: feedbackSummary,
        aiProvider: completedResults[0]?.provider || 'groq',
        finalScore: finalCalculated,
        breakdown: completedResults
      });
      
      // Simpan Esai Result ke database
      await saveSubmissionToDB(
        'essay', 
        `m${meetingId}-essay`, 
        finalCalculated, 
        timeSpent, 
        tabSwitches, 
        answers, 
        feedbackSummary
      );
      
    } catch (err) {
      console.error('Gagal memproses hasil esai:', err);
    } finally {
      setIsGrading(false);
    }
  };

  // Jika tidak ada soal untuk meeting ini
  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-4 mb-16 relative z-10" id="assessment-section">
      <div className="absolute inset-0 bg-primary/5 rounded-3xl -z-10 blur-xl"></div>
      
      {stage === 'intro' && (
        <div 
          className="bg-card border-2 rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto shadow-2xl transition-all duration-500"
          style={{ 
            borderColor: prevGrade ? prevGrade.badge.hexColor : 'hsl(var(--primary) / 0.2)',
            boxShadow: prevGrade ? `0 20px 25px -5px ${prevGrade.badge.hexColor}20` : undefined
          }}
        >
          {loadingPrevGrade ? (
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          ) : prevGrade ? (
            // UI JIKA SUDAH PERNAH MENGERJAKAN
            <>
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-4"
                style={{ backgroundColor: `${prevGrade.badge.hexColor}20`, borderColor: prevGrade.badge.hexColor }}
              >
                <div className="text-4xl font-black" style={{ color: prevGrade.badge.hexColor }}>
                  {prevGrade.badge.level}
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-2">Capaian Anda: {prevGrade.badge.name}</h2>
              <div className="text-xl font-bold mb-4" style={{ color: prevGrade.badge.hexColor }}>Skor Rata-Rata: {prevGrade.score}</div>
              
              {prevGrade.badge.level === 'A' ? (
                <p className="text-muted-foreground mb-8 text-lg">
                  Luar biasa! Anda telah mencapai hasil sempurna pada materi ini. Anda bisa mengulang tes sekadar untuk pemanasan atau menguji kembali pemahaman Anda (nilai baru akan menimpa nilai lama).
                </p>
              ) : (
                <p className="text-muted-foreground mb-8 text-lg">
                  Anda belum mendapatkan hasil maksimal. Jangan menyerah! Pahami kembali materi di atas dan lakukan **Remedial** sekarang untuk merebut Lencana Emas.
                </p>
              )}
              
              <button 
                onClick={() => setStage('mcq')}
                className="text-white font-bold py-4 px-10 rounded-xl transition-all text-lg hover:scale-105"
                style={{ 
                  backgroundColor: prevGrade.badge.hexColor,
                  boxShadow: `0 0 20px ${prevGrade.badge.hexColor}50`
                }}
              >
                {prevGrade.badge.level === 'A' ? 'Mulai Ulang (Latihan)' : 'Mulai Remedial Sekarang'}
              </button>
            </>
          ) : (
            // UI DEFAULT JIKA BELUM PERNAH
            <>
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-4">Uji Pemahaman Minggu {meetingId}</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Selesaikan modul ini dengan menjawab 5 Soal Pilihan Ganda. Jika nilai Anda mencapai standar (≥80) tanpa kecurangan, Anda akan membuka Ujian 5 Soal Esai Berbasis AI untuk meraih lencana di dashboard!
              </p>
              
              {!profile ? (
                <div className="bg-secondary/50 p-6 rounded-2xl border border-border mt-4">
                  <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-foreground font-bold mb-2">Akses Terkunci</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Anda harus masuk (login) sebagai Mahasiswa terlebih dahulu untuk mengerjakan asesmen dan mendapatkan lencana.
                  </p>
                  <Link 
                    href={`/login?returnUrl=/theory/${meetingId}#assessment-section`}
                    className="inline-flex bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary/90 transition-all text-sm shadow-sm"
                  >
                    Masuk Sekarang
                  </Link>
                </div>
              ) : (
                <button 
                  onClick={() => setStage('mcq')}
                  className="bg-primary text-white font-bold py-4 px-10 rounded-xl hover:bg-primary/90 transition-all text-lg shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:scale-105 cursor-pointer"
                >
                  Mulai Kuis Sekarang
                </button>
              )}
            </>
          )}
        </div>
      )}

      {stage === 'mcq' && (
        <QuizContainer 
          questions={questions}
          userId={profile?.id || 'guest'}
          meetingId={meetingId}
          onComplete={handleMCQComplete}
        />
      )}

      {stage === 'gateway' && (
        <AssessmentGateway 
          mcqScore={mcqScore} 
          tabSwitches={mcqTabSwitches}
          onRetakeMCQ={() => setStage('mcq')}
          onStartEssay={() => setStage('essay')}
        />
      )}

      {stage === 'essay' && essayQuestions && essayQuestions.length > 0 && (
        <EssayContainer 
          questions={essayQuestions}
          userId={profile?.id || 'guest'}
          onComplete={handleEssayComplete}
        />
      )}

      {stage === 'result' && (
        <div className="max-w-3xl mx-auto">
          {isGrading ? (
            <div className="bg-card p-12 rounded-3xl border border-border flex flex-col items-center justify-center text-center shadow-2xl">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
              <h2 className="text-2xl font-bold mb-2">Menyimpan Rapor Belajar Tuntas...</h2>
              <p className="text-muted-foreground max-w-md">
                Selamat! Seluruh 5 soal esai telah berhasil Anda selesaikan dengan nilai di atas standar kelulusan (≥80).
              </p>
            </div>
          ) : essayResult ? (
            <div className="bg-card p-6 md:p-8 rounded-3xl border-2 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
              
              {/* Header Hasil */}
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8 gap-6">
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-500 mb-2">
                    <CheckCircle2 className="w-8 h-8" />
                    <h2 className="text-2xl md:text-3xl font-black">Misi Belajar Tuntas Selesai</h2>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Engine AI: <span className="uppercase font-bold text-foreground">{essayResult.aiProvider} API</span> • Seluruh 5 Soal Lolos Standar (≥80)
                  </p>
                </div>
                
                <div className="text-right bg-secondary p-4 rounded-2xl border border-border/50 shrink-0">
                  <div className="text-5xl font-black" style={{ color: getBadgeFromScore(essayResult.finalScore).hexColor }}>
                    {essayResult.finalScore}
                  </div>
                  <div className="text-xs text-muted-foreground font-bold mt-1 uppercase tracking-wider">Rata-Rata Skor Akhir</div>
                </div>
              </div>

              {essayResult.score !== essayResult.finalScore && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-xl mb-6 text-sm flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Peringatan Akademik!</strong> Rata-rata skor murni esai Anda adalah {essayResult.score}, namun Anda terkena pemotongan penalti karena sistem Anti-Cheat mendeteksi perpindahan fokus browser.
                  </p>
                </div>
              )}

              {/* Rincian Penilaian per Soal (5 Soal) */}
              <div className="space-y-4 mb-8">
                <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Rincian Jawaban &amp; Ulasan Dosen AI:
                </h3>

                {essayQuestions.map((q, idx) => {
                  const itemResult: any = essayResult.breakdown?.find(r => r.id === q.id) || {
                    score: essayResult.score,
                    feedback: 'Telah dievaluasi oleh Dosen AI.',
                    answer: ''
                  };

                  return (
                    <div key={q.id} className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3.5 shadow-2xs">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-2.5">
                        <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-black flex items-center justify-center">
                            ✓
                          </span>
                          Soal #{idx + 1}
                        </span>
                        <span className="font-bold text-xs sm:text-sm px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          Skor: {itemResult.score}/100
                        </span>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium italic leading-relaxed">
                        "{q.text}"
                      </p>

                      {itemResult.answer && (
                        <div className="bg-white dark:bg-slate-950/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                          <strong className="text-slate-600 dark:text-slate-400 block mb-1 text-[11px] font-bold uppercase tracking-wider">
                            Jawaban Akhir Anda:
                          </strong>
                          <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-normal leading-relaxed whitespace-pre-wrap font-sans">
                            {itemResult.answer}
                          </p>
                        </div>
                      )}

                      <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed">
                        <strong className="text-primary font-bold block mb-1 text-[11px] uppercase tracking-wider">
                          Ulasan Dosen AI:
                        </strong>
                        <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                          {itemResult.feedback}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center pt-2 border-t border-border/50">
                <p className="text-muted-foreground text-sm mb-4">Lencana capaian emas Anda telah otomatis diperbarui di profil & rapor kelas!</p>
                <Link 
                  href="/student/dashboard"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white py-3 px-8 rounded-xl hover:bg-primary/90 transition-colors font-bold shadow-lg"
                >
                  Lihat Dashboard Saya
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
