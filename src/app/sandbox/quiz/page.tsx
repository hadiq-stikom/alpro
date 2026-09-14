'use client';

import React, { useState } from 'react';
import { QuizContainer } from '@/components/assessment/QuizContainer';
import { getQuestionsByMeetingId } from '@/lib/question-bank';
import { Settings, RefreshCcw } from 'lucide-react';

export default function SandboxQuizPage() {
  const [meetingId, setMeetingId] = useState(1);
  const [userId, setUserId] = useState('user-demo-123');
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<{
    accuracy: number;
    timeReward: number;
    timeSpent: number;
    tabSwitches: number;
    answers: Record<string, string>;
  } | null>(null);

  const questions = getQuestionsByMeetingId(meetingId);

  const handleComplete = (accuracy: number, timeReward: number, timeSpent: number, tabSwitches: number, answers: Record<string, string>) => {
    setResult({ accuracy, timeReward, timeSpent, tabSwitches, answers });
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-4">
        <div className="bg-[#151d30] p-8 rounded-3xl max-w-md w-full border border-slate-700/50 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-white">Sandbox: Kuis Anti-AI</h1>
          </div>
          
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Simulasi User ID
            </label>
            <p className="text-xs text-slate-500 mb-2">Ubah User ID untuk melihat bagaimana soal & opsi diacak secara dinamis.</p>
            <input 
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full bg-black/20 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="mb-8">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Pilih Materi (Minggu)
            </label>
            <select 
              value={meetingId}
              onChange={(e) => setMeetingId(Number(e.target.value))}
              className="w-full bg-black/20 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
            >
              {[1, 2, 3, 4, 5].map(m => (
                <option key={m} value={m}>Minggu {m} ({getQuestionsByMeetingId(m).length} Soal)</option>
              ))}
            </select>
          </div>

          <button 
            onClick={() => setStarted(true)}
            className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            Mulai Ujian Simulasi
          </button>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-4">
        <div className="bg-[#151d30] p-8 rounded-3xl max-w-md w-full border border-slate-700/50 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Hasil Simulasi</h2>
          
          <div className="space-y-4 text-sm mb-8">
            <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
              <span className="text-slate-400">Skor Akhir (Akurasi Murni)</span>
              <span className="font-bold text-emerald-400 text-lg">{result.accuracy}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
              <span className="text-slate-400">Bonus Waktu (Reward)</span>
              <span className="font-bold text-primary text-lg">+{result.timeReward} Koin</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
              <span className="text-slate-400">Waktu Digunakan</span>
              <span className="font-bold text-amber-400 text-lg">{result.timeSpent} detik</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <span className="text-red-300">Perpindahan Tab / Fokus</span>
              <span className="font-bold text-red-500 text-lg">{result.tabSwitches} kali</span>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-xs text-slate-500 italic">
              * Jika terdeteksi kecurangan, skor akademik dan koin reward akan dipotong.
            </p>
          </div>

          <button 
            onClick={() => { setStarted(false); setResult(null); }}
            className="w-full flex items-center justify-center gap-2 border-2 border-primary/50 text-primary py-3 rounded-xl hover:bg-primary/10 transition-colors font-semibold"
          >
            <RefreshCcw className="w-4 h-4" />
            Ajukan Perbaikan Kuis (Remedial)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] pt-12 pb-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto mb-8">
        <button 
          onClick={() => setStarted(false)}
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          &larr; Batal &amp; Kembali ke Pengaturan Sandbox
        </button>
      </div>

      <QuizContainer 
        questions={questions}
        userId={userId}
        meetingId={meetingId}
        timeLimitPerQuestion={60} // Waktu lebih longgar (60 detik) sesuai kesepakatan
        onComplete={handleComplete}
      />
    </div>
  );
}
