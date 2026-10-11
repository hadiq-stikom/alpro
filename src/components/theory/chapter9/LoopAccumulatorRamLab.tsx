"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  StepForward,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Table,
  Calculator,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const DATASET = [45, 82, 19, 94, 63, 77];

interface TraceRow {
  step: number;
  currentVal: number;
  total: number;
  cacah: number;
  isNewMax: boolean;
  maxVal: number;
  isNewMin: boolean;
  minVal: number;
}

export default function LoopAccumulatorRamLab() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [langTab, setLangTab] = useState<'python' | 'javascript'>('python');

  // Pre-calculate full trace history
  const traceHistory = React.useMemo<TraceRow[]>(() => {
    let runningTotal = 0;
    let runningMax = -Infinity;
    let runningMin = Infinity;

    return DATASET.map((val, idx) => {
      runningTotal += val;
      const isNewMax = val > runningMax;
      if (isNewMax) runningMax = val;

      const isNewMin = val < runningMin;
      if (isNewMin) runningMin = val;

      return {
        step: idx + 1,
        currentVal: val,
        total: runningTotal,
        cacah: idx + 1,
        isNewMax,
        maxVal: runningMax,
        isNewMin,
        minVal: runningMin
      };
    });
  }, []);

  const activeRow = currentStepIndex >= 0 && currentStepIndex < traceHistory.length 
    ? traceHistory[currentStepIndex] 
    : null;

  const total = activeRow ? activeRow.total : 0;
  const cacah = activeRow ? activeRow.cacah : 0;
  const rerata = cacah > 0 ? (total / cacah).toFixed(1) : '0';
  const maxVal = activeRow ? activeRow.maxVal : '-';
  const minVal = activeRow ? activeRow.minVal : '-';

  const stepForward = () => {
    if (currentStepIndex < DATASET.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsRunning(false);
    }
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentStepIndex(-1);
  };

  // Auto-runner loop
  React.useEffect(() => {
    if (!isRunning) return;

    if (currentStepIndex >= DATASET.length - 1) {
      setIsRunning(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStepIndex((prev) => prev + 1);
    }, 950);

    return () => clearTimeout(timer);
  }, [isRunning, currentStepIndex]);

  return (
    <div className="w-full rounded-3xl border-2 border-indigo-500/30 dark:border-indigo-500/20 bg-card dark:bg-slate-950 p-5 md:p-8 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-6">
      
      {/* ── Header Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-mono text-xs font-bold border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Laboratorium 3: Accumulator &amp; Extrema Engine</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100">
            Pola Akumulator &amp; Tabel Penelusuran Memori (Trace Table)
          </h3>
        </div>

        {/* Dual-Language Toggle */}
        <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setLangTab('python')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              langTab === 'python'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-foreground'
            }`}
          >
            Python
          </button>
          <button
            onClick={() => setLangTab('javascript')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              langTab === 'javascript'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-foreground'
            }`}
          >
            JavaScript
          </button>
        </div>
      </div>

      {/* ── Dataset Array Cards ── */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
        <span className="text-xs font-mono font-bold text-muted-foreground flex items-center justify-between">
          <span>DATASET DERET NILAI (n = {DATASET.length} elemen):</span>
          <span>{currentStepIndex >= 0 ? `Elemen ke-${currentStepIndex + 1} dari ${DATASET.length}` : 'Menunggu Eksekusi'}</span>
        </span>

        <div className="flex items-center gap-2.5 overflow-x-auto py-2">
          {DATASET.map((val, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isProcessed = idx < currentStepIndex;

            return (
              <div
                key={idx}
                className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-mono font-bold transition-all ${
                  isCurrent
                    ? 'bg-indigo-600 text-white scale-110 ring-4 ring-indigo-500/30 shadow-lg'
                    : isProcessed
                    ? 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30'
                    : 'bg-card border border-border text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="text-sm">{val}</span>
                <span className="text-[9px] font-normal opacity-70">data[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Loker Memori RAM 4 Dimensi ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        
        {/* Loker 1: Total Akumulator */}
        <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 font-mono shadow-md space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>total:</span>
            <Calculator className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-indigo-400">
            {total}
          </div>
          <span className="text-[10px] text-slate-500 font-sans block">
            Pola: total += nilai
          </span>
        </div>

        {/* Loker 2: Rata-Rata */}
        <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 font-mono shadow-md space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>rerata:</span>
            <Layers className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-sky-400">
            {rerata}
          </div>
          <span className="text-[10px] text-slate-500 font-sans block">
            Pola: total / cacah
          </span>
        </div>

        {/* Loker 3: Nilai Maksimum */}
        <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 font-mono shadow-md space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>maksimum:</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">
            {maxVal}
          </div>
          <span className="text-[10px] text-slate-500 font-sans block">
            Pola: if nilai &gt; maks
          </span>
        </div>

        {/* Loker 4: Nilai Minimum */}
        <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 font-mono shadow-md space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>minimum:</span>
            <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">
            {minVal}
          </div>
          <span className="text-[10px] text-slate-500 font-sans block">
            Pola: if nilai &lt; min
          </span>
        </div>

      </div>

      {/* ── Tabel Penelusuran (Trace Table) Real-Time ── */}
      <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase">
            <Table className="w-4 h-4 text-indigo-500" />
            <span>Tabel Jejak Eksekusi (Trace Table Per Putaran):</span>
          </span>
          <span className="text-[11px] font-mono text-muted-foreground">
            Langkah: {currentStepIndex + 1} / {DATASET.length}
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-xs font-mono text-left">
            <thead className="bg-slate-100 dark:bg-slate-900/80 text-muted-foreground uppercase border-b border-border">
              <tr>
                <th className="p-2.5">Putaran (i)</th>
                <th className="p-2.5">Nilai Masuk</th>
                <th className="p-2.5">Akumulasi Total</th>
                <th className="p-2.5">Cacah</th>
                <th className="p-2.5">Maks Sementara</th>
                <th className="p-2.5">Min Sementara</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {currentStepIndex < 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-muted-foreground italic font-sans">
                    Tekan &quot;Step&quot; atau &quot;Jalankan&quot; untuk mengisi tabel jejak memori...
                  </td>
                </tr>
              ) : (
                traceHistory.slice(0, currentStepIndex + 1).map((row, idx) => (
                  <tr
                    key={idx}
                    className={idx === currentStepIndex ? 'bg-indigo-500/10 font-bold text-indigo-900 dark:text-indigo-200' : ''}
                  >
                    <td className="p-2.5 text-muted-foreground">#{row.step}</td>
                    <td className="p-2.5 font-bold">{row.currentVal}</td>
                    <td className="p-2.5 text-indigo-600 dark:text-indigo-400 font-bold">{row.total}</td>
                    <td className="p-2.5">{row.cacah}</td>
                    <td className="p-2.5 text-emerald-600 dark:text-emerald-400">
                      {row.maxVal} {row.isNewMax && <span className="text-[10px] ml-1 bg-emerald-500/20 px-1 py-0.2 rounded font-sans">Baru!</span>}
                    </td>
                    <td className="p-2.5 text-amber-600 dark:text-amber-400">
                      {row.minVal} {row.isNewMin && <span className="text-[10px] ml-1 bg-amber-500/20 px-1 py-0.2 rounded font-sans">Baru!</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Kontrol Eksekusi */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (currentStepIndex >= DATASET.length - 1) {
                  setCurrentStepIndex(0);
                  setIsRunning(true);
                } else {
                  setIsRunning(!isRunning);
                }
              }}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                isRunning
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Jeda' : currentStepIndex >= DATASET.length - 1 ? 'Ulangi Trace' : 'Jalankan Trace'}</span>
            </button>

            <button
              onClick={stepForward}
              disabled={currentStepIndex >= DATASET.length - 1}
              className="px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary/80 disabled:opacity-40 text-foreground font-bold text-xs flex items-center gap-1.5 border border-border cursor-pointer transition-all"
            >
              <StepForward className="w-4 h-4 text-indigo-500" />
              <span>Step (+1 Baris)</span>
            </button>

            <button
              onClick={resetSimulation}
              className="p-2 rounded-xl bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer transition-all"
              title="Reset Trace Table"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
            {currentStepIndex >= DATASET.length - 1 ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Trace Tuntas (Semua Data Terproses)
              </span>
            ) : (
              <span>Penelusuran Berjalan</span>
            )}
          </span>
        </div>
      </div>

    </div>
  );
}
