'use client';

import React from 'react';
import { Lock, Unlock, AlertTriangle, RefreshCcw, ArrowRight } from 'lucide-react';

interface AssessmentGatewayProps {
  mcqScore: number | null;
  tabSwitches: number;
  onRetakeMCQ: () => void;
  onStartEssay: () => void;
}

export function AssessmentGateway({ mcqScore, tabSwitches, onRetakeMCQ, onStartEssay }: AssessmentGatewayProps) {
  // Belum mengerjakan MCQ
  if (mcqScore === null) {
    return (
      <div className="bg-[#151d30] border border-slate-700/50 rounded-2xl p-8 text-center max-w-md mx-auto shadow-xl">
        <Lock className="w-12 h-12 text-slate-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Ujian Esai Terkunci</h3>
        <p className="text-slate-400 text-sm mb-6">
          Anda harus menyelesaikan dan lulus Kuis Pilihan Ganda (Skor minimal 80) tanpa indikasi kecurangan untuk membuka ujian Esai.
        </p>
        <button 
          onClick={onRetakeMCQ}
          className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
        >
          Mulai Kuis Pilihan Ganda
        </button>
      </div>
    );
  }

  const isPassed = mcqScore >= 80 && tabSwitches === 0;

  if (isPassed) {
    return (
      <div className="bg-[#151d30] border border-emerald-500/30 rounded-2xl p-8 text-center max-w-md mx-auto relative overflow-hidden shadow-xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_10px_#10B981]"></div>
        <Unlock className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Akses Terbuka!</h3>
        <p className="text-slate-400 text-sm mb-6">
          Selamat! Anda lulus kuis pilihan ganda dengan skor {mcqScore} secara jujur. Anda berhak melanjutkan ke Ujian Esai sebagai penentu nilai akhir.
        </p>
        <button 
          onClick={onStartEssay}
          className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-2"
        >
          Mulai Ujian Esai Sekarang
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  // Jika gagal
  return (
    <div className="bg-[#151d30] border border-red-500/30 rounded-2xl p-8 text-center max-w-md mx-auto relative overflow-hidden shadow-xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_10px_#EF4444]"></div>
      <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">Akses Ditolak</h3>
      <div className="text-slate-400 text-sm mb-6 space-y-2">
        <p>Anda belum memenuhi syarat untuk mengikuti Ujian Esai.</p>
        <ul className="text-left bg-black/20 p-4 rounded-xl border border-slate-700/50 space-y-2 mt-4">
          <li className="flex justify-between items-center">
            <span>Skor Pilihan Ganda:</span>
            <span className={mcqScore >= 80 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>{mcqScore} / 80</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Indikasi Kecurangan:</span>
            <span className={tabSwitches === 0 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
              {tabSwitches === 0 ? 'Bersih' : `${tabSwitches} pelanggaran`}
            </span>
          </li>
        </ul>
      </div>
      <button 
        onClick={onRetakeMCQ}
        className="w-full bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-700 transition-all flex items-center justify-center gap-2 border border-slate-600"
      >
        <RefreshCcw className="w-5 h-5" />
        Remedial Kuis Pilihan Ganda
      </button>
    </div>
  );
}
