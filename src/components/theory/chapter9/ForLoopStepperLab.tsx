"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  StepForward,
  Terminal,
  Code2,
  Sparkles,
  ArrowRight,
  Layers,
  Cpu,
  CheckCircle2,
  Sliders,
  Compass,
  Zap,
  Info
} from 'lucide-react';

interface PresetConfig {
  id: string;
  title: string;
  start: number;
  stop: number;
  step: number;
  description: string;
  isAccumulator?: boolean;
}

const PRESETS: PresetConfig[] = [
  {
    id: 'basic',
    title: 'Deret Asli (1 s.d. 5)',
    start: 1,
    stop: 6,
    step: 1,
    description: 'Iterasi standar maju 1 langkah, berhenti sebelum nilai batas akhir (stop = 6).'
  },
  {
    id: 'even',
    title: 'Bilangan Genap (Step +2)',
    start: 2,
    stop: 11,
    step: 2,
    description: 'Melompat 2 langkah setiap putaran untuk menghasilkan deret bilangan genap: 2, 4, 6, 8, 10.'
  },
  {
    id: 'countdown',
    title: 'Hitung Mundur (Step -1)',
    start: 5,
    stop: 0,
    step: -1,
    description: 'Langkah mundur dari 5 menuju 1 dengan step negatif, berhenti sebelum menyentuh 0.'
  },
  {
    id: 'sum',
    title: 'Akumulasi Penjumlahan (1..5)',
    start: 1,
    stop: 6,
    step: 1,
    description: 'Menjumlahkan setiap nilai i ke dalam variabel akumulator total (1 + 2 + 3 + 4 + 5 = 15).',
    isAccumulator: true
  }
];

export default function ForLoopStepperLab() {
  const [activePreset, setActivePreset] = useState<string>('basic');
  const [startVal, setStartVal] = useState<number>(1);
  const [stopVal, setStopVal] = useState<number>(6);
  const [stepVal, setStepVal] = useState<number>(1);
  const [langTab, setLangTab] = useState<'python' | 'javascript'>('python');

  // Simulation execution state
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(900); // ms per step

  // Generate sequence based on start, stop, step
  const sequence = React.useMemo(() => {
    const list: number[] = [];
    if (stepVal === 0) return list;
    if (stepVal > 0) {
      for (let v = startVal; v < stopVal; v += stepVal) {
        list.push(v);
        if (list.length > 25) break; // safety guard
      }
    } else {
      for (let v = startVal; v > stopVal; v += stepVal) {
        list.push(v);
        if (list.length > 25) break; // safety guard
      }
    }
    return list;
  }, [startVal, stopVal, stepVal]);

  // Derived accumulator values
  const currentVal = currentStepIndex >= 0 && currentStepIndex < sequence.length ? sequence[currentStepIndex] : null;
  const accumulatorHistory = React.useMemo(() => {
    let sum = 0;
    return sequence.map((v) => {
      sum += v;
      return sum;
    });
  }, [sequence]);

  const currentAccumulator = currentStepIndex >= 0 && currentStepIndex < accumulatorHistory.length 
    ? accumulatorHistory[currentStepIndex] 
    : 0;

  // Handle Preset changes
  const applyPreset = (presetId: string) => {
    const p = PRESETS.find((item) => item.id === presetId);
    if (!p) return;
    setActivePreset(p.id);
    setStartVal(p.start);
    setStopVal(p.stop);
    setStepVal(p.step);
    resetSimulation();
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentStepIndex(-1);
  };

  const stepForward = () => {
    if (currentStepIndex < sequence.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsRunning(false);
    }
  };

  // Auto-runner loop
  useEffect(() => {
    if (!isRunning) return;

    if (currentStepIndex >= sequence.length - 1) {
      setIsRunning(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStepIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isRunning, currentStepIndex, sequence.length, speed]);

  // Generate formatted code string
  const pythonCode = `total = 0\nfor i in range(${startVal}, ${stopVal}${stepVal !== 1 ? `, ${stepVal}` : ''}):\n    total += i\n    print(f"Putaran: i = {i}, Total = {total}")`;
  
  const jsCode = `let total = 0;\nfor (let i = ${startVal}; ${stepVal > 0 ? `i < ${stopVal}` : `i > ${stopVal}`}; i += ${stepVal}) {\n    total += i;\n    console.log(\`Putaran: i = \${i}, Total = \${total}\`);\n}`;

  return (
    <div className="w-full rounded-3xl border-2 border-emerald-500/30 dark:border-emerald-500/20 bg-card dark:bg-slate-950 p-5 md:p-8 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-6">
      
      {/* ── Header Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Laboratorium 1: Range Stepper Engine</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Visualizer Anatomi FOR Loop &amp; Bilangan Deret</span>
          </h3>
        </div>

        {/* Dual-Language Toggle */}
        <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setLangTab('python')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              langTab === 'python'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-foreground'
            }`}
          >
            Python (range)
          </button>
          <button
            onClick={() => setLangTab('javascript')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              langTab === 'javascript'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-foreground'
            }`}
          >
            JavaScript (for let)
          </button>
        </div>
      </div>

      {/* ── Presets Selector Bar ── */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5" />
          <span>Pilih Skenario Percobaan Deret:</span>
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => applyPreset(p.id)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                activePreset === p.id
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 font-bold shadow-xs'
                  : 'border-border/80 bg-slate-50/50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:border-emerald-500/40'
              }`}
            >
              <div className="text-xs font-bold truncate">{p.title}</div>
              <div className="text-[11px] text-muted-foreground truncate mt-0.5 font-mono">
                range({p.start}, {p.stop}, {p.step})
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Interactive Canvas ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Kolom Kiri: Garis Bilangan (Visual Number Line) & Kontrol Stepping (7 Kolom) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Kotak Visualisasi Pointer Jalur Bilangan */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-500" />
                <span>Garis Bilangan Iterasi (Panjang: {sequence.length} Langkah)</span>
              </span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {currentStepIndex >= 0 ? `Langkah ${currentStepIndex + 1} / ${sequence.length}` : 'Status: Menunggu Mulai'}
              </span>
            </div>

            {/* Deret Kotak Bilangan Interaktif */}
            <div className="p-4 rounded-xl bg-card border border-border/80 overflow-x-auto min-h-[110px] flex items-center justify-center">
              {sequence.length === 0 ? (
                <span className="text-xs text-rose-500 font-bold">Kombinasi parameter menghasilkan deret kosong!</span>
              ) : (
                <div className="flex items-center gap-3 py-2 px-1">
                  {sequence.map((num, idx) => {
                    const isCurrent = idx === currentStepIndex;
                    const isPassed = idx < currentStepIndex;

                    return (
                      <div key={idx} className="relative flex flex-col items-center">
                        
                        {/* Pointer Panah Melayang Di Atas Nilai Aktif */}
                        {isCurrent && (
                          <motion.div
                            layoutId="stepper-pointer"
                            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                            className="absolute -top-7 flex flex-col items-center pointer-events-none"
                          >
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-emerald-600 text-white shadow-xs">
                              i={num}
                            </span>
                            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-emerald-600" />
                          </motion.div>
                        )}

                        {/* Kotak Sel Bilangan */}
                        <div
                          className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-sm transition-all duration-200 ${
                            isCurrent
                              ? 'bg-emerald-600 text-white ring-4 ring-emerald-500/30 scale-110 shadow-lg'
                              : isPassed
                              ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30'
                              : 'bg-secondary/40 text-muted-foreground border border-border/80'
                          }`}
                        >
                          <span>{num}</span>
                          <span className="text-[9px] font-normal opacity-70">
                            #{idx + 1}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Nilai Eksklusif Boundary Warning */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 text-xs">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
              <span>
                <strong>Aturan Eksklusif Batas Akhir:</strong> Perhatikan bahwa angka batas <code>stop = {stopVal}</code>{' '}
                <strong>tidak pernah dieksekusi</strong>. Perulangan otomatis terhenti tepat satu langkah sebelum menyentuh batas tersebut.
              </span>
            </div>

            {/* Tombol Kontrol Eksekusi Stepping */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (currentStepIndex >= sequence.length - 1) {
                      setCurrentStepIndex(0);
                      setIsRunning(true);
                    } else {
                      setIsRunning(!isRunning);
                    }
                  }}
                  className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                    isRunning
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isRunning ? 'Jeda' : currentStepIndex >= sequence.length - 1 ? 'Ulangi Otomatis' : 'Jalankan Otomatis'}</span>
                </button>

                <button
                  onClick={stepForward}
                  disabled={currentStepIndex >= sequence.length - 1}
                  className="px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary/80 disabled:opacity-40 text-foreground font-bold text-xs flex items-center gap-1.5 border border-border cursor-pointer transition-all"
                >
                  <StepForward className="w-4 h-4 text-emerald-500" />
                  <span>Step (+1)</span>
                </button>

                <button
                  onClick={resetSimulation}
                  className="p-2 rounded-xl bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer transition-all"
                  title="Reset Eksekusi"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Status Badge */}
              <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                {currentStepIndex >= sequence.length - 1 && sequence.length > 0 ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Loop Berakhir Normal
                  </span>
                ) : (
                  <span>Iterasi Berjalan</span>
                )}
              </div>
            </div>
          </div>

          {/* Pengaturan Parameter Bebas (Sliders) */}
          <div className="p-4 rounded-2xl bg-card border border-border/80 space-y-3">
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-500" />
              <span>Eksplorasi Parameter Bebas:</span>
            </span>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-bold text-muted-foreground block mb-1">
                  Start (Awal): <span className="text-emerald-600 font-mono">{startVal}</span>
                </label>
                <input
                  type="range"
                  min="-5"
                  max="10"
                  value={startVal}
                  onChange={(e) => {
                    setStartVal(Number(e.target.value));
                    resetSimulation();
                  }}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-muted-foreground block mb-1">
                  Stop (Batas): <span className="text-emerald-600 font-mono">{stopVal}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={stopVal}
                  onChange={(e) => {
                    setStopVal(Number(e.target.value));
                    resetSimulation();
                  }}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-muted-foreground block mb-1">
                  Step (Langkah): <span className="text-emerald-600 font-mono">{stepVal}</span>
                </label>
                <input
                  type="range"
                  min="-3"
                  max="5"
                  value={stepVal}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val !== 0) {
                      setStepVal(val);
                      resetSimulation();
                    }
                  }}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: RAM State Inspector & Terminal Live Output (5 Kolom) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Wadah State RAM Real-Time */}
          <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 shadow-md space-y-4 font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>STATE MEMORY RAM (LIVE)</span>
              </span>
              <span className="text-[11px] text-emerald-400 font-bold">
                {currentStepIndex >= 0 ? `PUTARAN #${currentStepIndex + 1}` : 'IDLE'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Loker Variabel i */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block">Pencacah (i):</span>
                <span className="text-2xl font-black text-emerald-400">
                  {currentVal !== null ? currentVal : '-'}
                </span>
              </div>

              {/* Loker Variabel total akumulator */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block">Akumulator (total):</span>
                <span className="text-2xl font-black text-amber-400">
                  {currentStepIndex >= 0 ? currentAccumulator : '0'}
                </span>
              </div>
            </div>

            {/* Kode Program Preview yang sedang dijalankan */}
            <div className="pt-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                Kode Eksekusi ({langTab.toUpperCase()}):
              </span>
              <pre className="p-3 rounded-xl bg-slate-950 text-slate-300 text-xs overflow-x-auto leading-relaxed border border-slate-800 select-none">
                {langTab === 'python' ? pythonCode : jsCode}
              </pre>
            </div>
          </div>

          {/* Terminal Konsol Keluaran */}
          <div className="p-5 rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 space-y-3 font-mono shadow-md">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-sky-400" />
                <span>TERMINAL LOG OUTPUT</span>
              </span>
              <span className="text-[10px] text-slate-500">stdout</span>
            </div>

            <div className="h-40 overflow-y-auto space-y-1 text-xs text-slate-300 pr-1">
              {currentStepIndex < 0 ? (
                <span className="text-slate-600 italic">Tekan &quot;Step&quot; atau &quot;Jalankan&quot; untuk memulai keluaran...</span>
              ) : (
                sequence.slice(0, currentStepIndex + 1).map((val, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-emerald-400">
                    <span className="text-slate-600 select-none">&gt;</span>
                    <span>Putaran #{idx + 1}: nilai i = <strong>{val}</strong>, total = <strong>{accumulatorHistory[idx]}</strong></span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
