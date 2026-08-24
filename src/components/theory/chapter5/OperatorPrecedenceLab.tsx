"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitCommit, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Hash
} from 'lucide-react';

interface PrecedenceCase {
  id: string;
  name: string;
  expression: string;
  steps: { stepNum: number; desc: string; subExpr: string; reducedExpr: string; highlight: string }[];
  finalResult: string;
  withoutParensNote?: string;
  ahaInsight: string;
}

const precedenceCases: PrecedenceCase[] = [
  {
    id: 'case1',
    name: 'Kasus 1: Kali vs Tambah (3 + 4 * 2)',
    expression: '3 + 4 * 2',
    steps: [
      { stepNum: 1, desc: 'Prioritas Lebih Tinggi: Operasi Perkalian (*) didahulukan daripada (+)', subExpr: '4 * 2 = 8', reducedExpr: '3 + 8', highlight: '4 * 2' },
      { stepNum: 2, desc: 'Prioritas Berikutnya: Operasi Penjumlahan (+)', subExpr: '3 + 8 = 11', reducedExpr: '11', highlight: '3 + 8' }
    ],
    finalResult: '11',
    withoutParensNote: 'Bukan (3 + 4) * 2 = 14! Perkalian selalu menang atas penjumlahan.',
    ahaInsight: 'Perkalian (*) dan Pembagian (/) memiliki level presedensi lebih tinggi daripada Tambah (+) dan Kurang (-).'
  },
  {
    id: 'case2',
    name: 'Kasus 2: Kekuatan Tanda Kurung ( (3 + 4) * 2 )',
    expression: '(3 + 4) * 2',
    steps: [
      { stepNum: 1, desc: 'Prioritas MUTLAK TERTINGGI: Selesaikan isi Tanda Kurung () terlebih dahulu', subExpr: '(3 + 4) = 7', reducedExpr: '7 * 2', highlight: '(3 + 4)' },
      { stepNum: 2, desc: 'Langkah Terakhir: Kalikan hasil kurung dengan 2', subExpr: '7 * 2 = 14', reducedExpr: '14', highlight: '7 * 2' }
    ],
    finalResult: '14',
    withoutParensNote: 'Tanda kurung () adalah "kartu sakti" yang membatalkan aturan presedensi biasa!',
    ahaInsight: 'Gunakan tanda kurung () jika Anda ingin memaksa suatu operasi dikerjakan terlebih dahulu.'
  },
  {
    id: 'case3',
    name: 'Kasus 3: Asosiatif Kiri-ke-Kanan ( 20 - 5 + 3 )',
    expression: '20 - 5 + 3',
    steps: [
      { stepNum: 1, desc: 'Tingkat Presedensi Sama: Dikerjakan dari KIRI ke KANAN (20 - 5)', subExpr: '20 - 5 = 15', reducedExpr: '15 + 3', highlight: '20 - 5' },
      { stepNum: 2, desc: 'Langkah Kedua: Jumlahkan dengan 3', subExpr: '15 + 3 = 18', reducedExpr: '18', highlight: '15 + 3' }
    ],
    finalResult: '18',
    withoutParensNote: 'Bukan 20 - (5 + 3) = 12! Operator setingkat dievaluasi urut dari kiri.',
    ahaInsight: 'Jika operator berada pada level yang sama (misal + dan -), komputer mengevaluasinya dari kiri ke kanan (Left-Associative).'
  },
  {
    id: 'case4',
    name: 'Kasus 4: Pangkat Bersarang / Right-Associative ( 2 ** 3 ** 2 )',
    expression: '2 ** 3 ** 2',
    steps: [
      { stepNum: 1, desc: 'Pengecualian Pangkat (**): Dievaluasi dari KANAN ke KIRI (3 ** 2)', subExpr: '3 ** 2 = 9', reducedExpr: '2 ** 9', highlight: '3 ** 2' },
      { stepNum: 2, desc: 'Langkah Akhir: Hitung 2 pangkat 9', subExpr: '2 ** 9 = 512', reducedExpr: '512', highlight: '2 ** 9' }
    ],
    finalResult: '512',
    withoutParensNote: 'Bukan (2 ** 3) ** 2 = 64! Khusus operator pangkat (**), evaluasi dari kanan ke kiri.',
    ahaInsight: 'Operator pemangkatan (**) di Python bersifat Right-to-Left Associative.'
  }
];

export default function OperatorPrecedenceLab() {
  const [selectedCaseId, setSelectedCaseId] = useState('case1');
  const [currentStep, setCurrentStep] = useState(0);

  const activeCase = precedenceCases.find(c => c.id === selectedCaseId) || precedenceCases[0];

  const handleSelectCase = (id: string) => {
    setSelectedCaseId(id);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < activeCase.steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const resetSteps = () => {
    setCurrentStep(0);
  };

  return (
    <div className="border border-border/60 rounded-3xl overflow-visible bg-slate-950 shadow-2xl space-y-0">
      
      {/* 1. Header Toolbar */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 rounded-t-3xl">
        <div className="flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-100">
            Laboratorium Presedensi Operator &amp; Hirarki PEMDAS
          </h3>
        </div>
        <span className="text-xs font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 px-3 py-0.5 rounded-full">
          Step-by-Step Expression Tree
        </span>
      </div>

      {/* 2. Main Content */}
      <div className="p-4 md:p-6 space-y-6 overflow-visible">
        
        {/* Presets Grid */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 font-sans">
              Pilih Contoh Hirarki Evaluasi Kompiler:
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Pilih Kasus</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {precedenceCases.map((c) => {
              const isSelected = selectedCaseId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => handleSelectCase(c.id)}
                  className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer relative z-0 hover:z-50 hover:scale-[1.05] duration-300 ease-out origin-center hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)] ${
                    isSelected 
                      ? 'border-purple-400 bg-slate-900 shadow-md ring-1 ring-purple-400' 
                      : 'border-slate-800 bg-slate-950 hover:bg-slate-900/60'
                  }`}
                >
                  <span className="text-xs font-mono font-black text-purple-300 block mb-1">
                    {c.expression}
                  </span>
                  <span className="text-[11px] font-bold text-slate-300 block truncate">
                    {c.name.split(':')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step-by-Step Expression Tree Workspace */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-inner space-y-6 overflow-visible">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-bold">
                Ekspresi Asal:
              </span>
              <div className="text-2xl font-mono font-black text-white mt-0.5 flex items-center gap-3">
                <span>{activeCase.expression}</span>
                <span className="text-sm font-sans font-normal text-slate-400">
                  &rarr; Hasil Akhir: <strong className="text-emerald-400 font-mono">{activeCase.finalResult}</strong>
                </span>
              </div>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={resetSteps}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={nextStep}
                disabled={currentStep >= activeCase.steps.length}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                  currentStep >= activeCase.steps.length 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-500 text-white'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>Langkah Berikutnya ({currentStep}/{activeCase.steps.length})</span>
              </button>
            </div>
          </div>

          {/* Stepper Visual Timeline */}
          <div className="space-y-3">
            {activeCase.steps.map((step, idx) => {
              const isVisible = currentStep >= step.stepNum;
              const isCurrent = currentStep === step.stepNum;

              return (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all duration-300 ${
                    isVisible 
                      ? isCurrent 
                        ? 'bg-purple-500/15 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
                        : 'bg-slate-950/80 border-slate-800 opacity-80'
                      : 'bg-slate-950/40 border-slate-900 opacity-30'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                        isVisible ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {step.stepNum}
                      </span>
                      <span className="text-xs font-bold text-slate-200">
                        {step.desc}
                      </span>
                    </div>

                    {isVisible && (
                      <div className="flex items-center gap-2 font-mono text-xs self-end sm:self-center">
                        <span className="text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800">
                          {step.subExpr}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-emerald-400 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {step.reducedExpr}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* AHA Box */}
          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-xs text-slate-200 space-y-1.5 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.03] transition-all duration-300 origin-center hover:shadow-xl">
            <strong className="text-purple-300 font-bold block font-mono text-sm">
              💡 Insight Evaluasi Kompiler:
            </strong>
            <p className="leading-relaxed">{activeCase.ahaInsight}</p>
            {activeCase.withoutParensNote && (
              <p className="text-[11px] text-amber-300 italic font-mono pt-1">
                ⚠️ {activeCase.withoutParensNote}
              </p>
            )}
          </div>

        </div>

        {/* 4. Tabel Kamus Resmi Tingkat Presedensi & Asosiativitas */}
        <div className="p-4 md:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
            <Layers className="w-4 h-4" />
            <span>Tabel Kamus Resmi Hirarki Presedensi &amp; Asosiativitas Kompiler (Urutan Tertinggi ke Terendah):</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-sans">
                  <th className="p-3">Prioritas</th>
                  <th className="p-3">Simbol Operator</th>
                  <th className="p-3">Kategori Operasi</th>
                  <th className="p-3">Arah Evaluasi (Asosiativitas)</th>
                  <th className="p-3">Contoh &amp; Catatan Penting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/40 transition-colors bg-purple-500/5">
                  <td className="p-3 font-bold text-purple-400">1 (Tertinggi)</td>
                  <td className="p-3 font-bold text-purple-300 text-sm">( )</td>
                  <td className="p-3 font-sans text-white font-bold">Tanda Kurung (Parentheses)</td>
                  <td className="p-3 text-cyan-300">Dalam ke Luar</td>
                  <td className="p-3 text-slate-300 font-sans">Memaksa operasi di dalamnya dikerjakan lebih dahulu.</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-blue-400">2</td>
                  <td className="p-3 font-bold text-blue-300 text-sm">**</td>
                  <td className="p-3 font-sans text-white">Pemangkatan (Exponentiation)</td>
                  <td className="p-3 text-amber-400 font-bold">Kanan ke Kiri (Right-to-Left)</td>
                  <td className="p-3 text-slate-300 font-sans"><code>2 ** 3 ** 2</code> dihitung sebagai <code>2 ** (3 ** 2) = 512</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-cyan-400">3</td>
                  <td className="p-3 font-bold text-cyan-300 text-sm">+x , -x , ~</td>
                  <td className="p-3 font-sans text-white">Unary Positive / Negative</td>
                  <td className="p-3 text-amber-400 font-bold">Kanan ke Kiri (Right-to-Left)</td>
                  <td className="p-3 text-slate-300 font-sans">Menempel langsung pada operand di kanannya (<code>-5</code>).</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-amber-400">4</td>
                  <td className="p-3 font-bold text-amber-300 text-sm">* , / , // , %</td>
                  <td className="p-3 font-sans text-white">Perkalian, Pembagian, Modulo</td>
                  <td className="p-3 text-emerald-400 font-bold">Kiri ke Kanan (Left-to-Right)</td>
                  <td className="p-3 text-slate-300 font-sans">Setara satu sama lain, dihitung urut dari sisi paling kiri.</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-emerald-400">5</td>
                  <td className="p-3 font-bold text-emerald-300 text-sm">+ , -</td>
                  <td className="p-3 font-sans text-white">Penjumlahan &amp; Pengurangan</td>
                  <td className="p-3 text-emerald-400 font-bold">Kiri ke Kanan (Left-to-Right)</td>
                  <td className="p-3 text-slate-300 font-sans">Dihitung setelah perkalian/pembagian selesai.</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-rose-400">6</td>
                  <td className="p-3 font-bold text-rose-300 text-sm">== , != , &lt; , &gt; , &lt;= , &gt;=</td>
                  <td className="p-3 font-sans text-white">Operator Relasional</td>
                  <td className="p-3 text-emerald-400 font-bold">Kiri ke Kanan (Left-to-Right)</td>
                  <td className="p-3 text-slate-300 font-sans">Menguji perbandingan setelah nilai aritmatika selesai dihitung.</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-indigo-400">7</td>
                  <td className="p-3 font-bold text-indigo-300 text-sm">not &rarr; and &rarr; or</td>
                  <td className="p-3 font-sans text-white">Operator Logika Boolean</td>
                  <td className="p-3 text-emerald-400 font-bold">Kiri ke Kanan (Left-to-Right)</td>
                  <td className="p-3 text-slate-300 font-sans">Urutan: NOT dievaluasi sebelum AND, dan AND sebelum OR.</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors bg-slate-950">
                  <td className="p-3 font-bold text-slate-400">8 (Terendah)</td>
                  <td className="p-3 font-bold text-slate-200 text-sm">= , += , -= , *= , /=</td>
                  <td className="p-3 font-sans text-white font-bold">Penugasan (Assignment)</td>
                  <td className="p-3 text-amber-400 font-bold">Kanan ke Kiri (Right-to-Left)</td>
                  <td className="p-3 text-slate-300 font-sans">Seluruh sisi kanan dievaluasi tuntas baru disimpan ke variabel kiri.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
