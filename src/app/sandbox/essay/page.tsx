'use client';

import React, { useState } from 'react';
import { AssessmentGateway } from '@/components/assessment/AssessmentGateway';
import { EssayContainer } from '@/components/assessment/EssayContainer';
import { getEssaysByMeetingId } from '@/lib/essay-bank';
import { Settings, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';

export default function SandboxEssayPage() {
  const [meetingId, setMeetingId] = useState(1);
  const [mcqScore, setMcqScore] = useState<number | null>(null);
  const [mcqTabSwitches, setMcqTabSwitches] = useState(0);
  
  const [stage, setStage] = useState<'gateway' | 'essay' | 'result'>('gateway');
  const [essayResult, setEssayResult] = useState<{
    score: number;
    feedback: string;
    aiProvider: string;
    finalScore: number; 
  } | null>(null);
  const [isGrading, setIsGrading] = useState(false);

  const questions = getEssaysByMeetingId(meetingId);

  // Simulasi jika user mengerjakan/mengulang MCQ di Sandbox
  const handleSimulateMCQ = (score: number, switches: number) => {
    setMcqScore(score);
    setMcqTabSwitches(switches);
  };

  const handleStartEssay = () => {
    setStage('essay');
  };

  const handleEssayComplete = async (
    completedResults: any[],
    timeSpent: number,
    tabSwitches: number,
    answers: Record<string, string>
  ) => {
    if (!questions || questions.length === 0) return;
    
    setIsGrading(true);
    setStage('result');
    
    try {
      const totalScore = completedResults.reduce((acc, curr) => acc + curr.score, 0);
      const rawScore = Math.round(totalScore / (completedResults.length || 1));
      const penalty = tabSwitches * 10;
      const finalCalculated = Math.max(0, rawScore - penalty);
      
      setEssayResult({
        score: rawScore,
        feedback: completedResults.map((r, idx) => `Soal #${idx + 1} (Skor ${r.score}): ${r.feedback}`).join('\n\n'),
        aiProvider: completedResults[0]?.provider || 'groq',
        finalScore: finalCalculated
      });
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsGrading(false);
    }
  };

  if (!questions || questions.length === 0) return <div>Soal tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto mb-8 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Settings className="w-8 h-8 text-primary" />
          Sandbox Uji Coba: Gateway & Ujian 5 Esai AI
        </h1>
        <p className="text-slate-400 mt-2 text-sm">
          Gunakan halaman ini untuk mensimulasikan alur asesmen lengkap (Lolos Gateway &gt; Ujian 5 Soal Esai &gt; AI Auto-Grading &gt; Penalti Anti-Cheat).
        </p>
      </div>

      {/* Control Panel Simulasi */}
      <div className="max-w-4xl mx-auto mb-10 bg-[#121929] border border-slate-700/60 rounded-2xl p-6 shadow-xl">
        <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
          Panel Simulasi Penguji (Tester Control)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Pilih Minggu Materi:</label>
            <select
              value={meetingId}
              onChange={(e) => {
                setMeetingId(Number(e.target.value));
                setStage('gateway');
                setMcqScore(null);
              }}
              className="w-full bg-[#151d30] border border-slate-700 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-primary"
            >
              <option value={1}>Minggu 1: Pengenalan Komputer & Bahasa</option>
              <option value={2}>Minggu 2: Arsitektur & Organisasi</option>
              <option value={3}>Minggu 3: Fondasi Algoritma</option>
              <option value={4}>Minggu 4: Tipe Data & Variabel</option>
              <option value={5}>Minggu 5: Operator & Ekspresi</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Simulasi Hasil Kuis MCQ:</label>
            <div className="flex gap-2">
              <button
                onClick={() => handleSimulateMCQ(100, 0)}
                className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs border transition-all ${
                  mcqScore === 100 && mcqTabSwitches === 0
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : 'bg-[#151d30] border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                100 (Jujur)
              </button>
              <button
                onClick={() => handleSimulateMCQ(85, 2)}
                className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs border transition-all ${
                  mcqScore === 85 && mcqTabSwitches === 2
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                    : 'bg-[#151d30] border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                85 (Curang 2x)
              </button>
              <button
                onClick={() => handleSimulateMCQ(60, 0)}
                className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs border transition-all ${
                  mcqScore === 60
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : 'bg-[#151d30] border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                60 (Gagal)
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Reset / Status Stage:</label>
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-primary font-mono font-bold flex-1 text-center">
                Stage: {stage.toUpperCase()}
              </span>
              <button
                onClick={() => {
                  setStage('gateway');
                  setMcqScore(null);
                  setEssayResult(null);
                }}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 text-slate-300"
                title="Reset ke Gateway"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sandbox Area */}
      {stage === 'gateway' && (
        <AssessmentGateway 
          mcqScore={mcqScore} 
          tabSwitches={mcqTabSwitches}
          onRetakeMCQ={() => {
            alert('Di aplikasi asli, ini akan me-reset state dan mengarahkan ke halaman MCQ.');
            handleSimulateMCQ(95, 0);
          }}
          onStartEssay={handleStartEssay}
        />
      )}

      {stage === 'essay' && (
        <EssayContainer 
          questions={questions}
          userId="sandbox-user"
          onComplete={handleEssayComplete}
        />
      )}

      {stage === 'result' && (
        <div className="max-w-2xl mx-auto">
          {isGrading ? (
            <div className="bg-[#151d30] p-12 rounded-3xl border border-slate-700/50 flex flex-col items-center justify-center text-center shadow-2xl">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
              <h2 className="text-2xl font-bold text-white mb-2">AI Sedang Membaca Esai Anda...</h2>
              <p className="text-slate-400">Harap tunggu sebentar, kami mengirim jawaban ini ke server <span className="font-bold text-primary">Kecerdasan Buatan</span> untuk dievaluasi sesuai Rubrik.</p>
            </div>
          ) : essayResult ? (
            <div className="bg-[#151d30] p-8 rounded-3xl border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 mb-2">
                    <CheckCircle2 className="w-8 h-8" />
                    <h2 className="text-3xl font-black">Penilaian Selesai</h2>
                  </div>
                  <p className="text-slate-400 text-sm">Engine AI: <span className="uppercase font-bold text-white">{essayResult.aiProvider} API</span></p>
                </div>
                <div className="text-right bg-black/20 p-4 rounded-2xl border border-emerald-500/20">
                  <div className="text-5xl font-black text-white">{essayResult.finalScore}</div>
                  <div className="text-sm text-slate-500 font-bold mt-1 uppercase tracking-wider">Skor Akhir</div>
                </div>
              </div>

              {essayResult.score !== essayResult.finalScore && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 text-sm flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Peringatan Akademik!</strong> Skor murni esai Anda adalah {essayResult.score}, namun Anda terkena pemotongan nilai karena sistem Anti-Cheat mendeteksi Anda memindahkan fokus ke jendela/aplikasi lain saat mengerjakan ujian.
                  </p>
                </div>
              )}

              <div className="bg-black/40 p-6 rounded-2xl border border-slate-700/50 mb-8">
                <h3 className="text-xs font-bold text-primary mb-3 uppercase tracking-wider">Ulasan & Feedback Dosen AI:</h3>
                <p className="text-slate-200 leading-relaxed font-medium whitespace-pre-line">"{essayResult.feedback}"</p>
              </div>

              <button 
                onClick={() => setStage('gateway')}
                className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary py-4 rounded-xl hover:bg-primary hover:text-white transition-colors font-bold"
              >
                <RotateCcw className="w-5 h-5" />
                Kembali ke Sandbox Awal
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

