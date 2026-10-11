"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  StepForward,
  Terminal,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Sparkles,
  Sliders,
  Flame,
  HelpCircle
} from 'lucide-react';

interface WhileScenario {
  id: string;
  title: string;
  subtitle: string;
  initVar: string;
  initVal: number;
  conditionLabel: string;
  evalCondition: (val: number, stepCount: number) => boolean;
  updateLabel: string;
  updateVal: (val: number) => number;
  isInfiniteTrap?: boolean;
}

const SCENARIOS: WhileScenario[] = [
  {
    id: 'savings',
    title: 'Celengan Target Tabungan',
    subtitle: 'Menabung Rp 20.000 per putaran hingga saldo mencapai target minimal Rp 100.000.',
    initVar: 'saldo',
    initVal: 20000,
    conditionLabel: 'saldo < 100000',
    evalCondition: (v) => v < 100000,
    updateLabel: 'saldo += 20000',
    updateVal: (v) => v + 20000
  },
  {
    id: 'sentinel',
    title: 'Sentinel Input Kasir (Stop = 0)',
    subtitle: 'Membaca harga belanjaan secara berulang sampai pengguna memasukkan angka 0 sebagai sinyal berhenti.',
    initVar: 'harga_input',
    initVal: 25000,
    conditionLabel: 'harga_input != 0',
    evalCondition: (v, step) => step < 4, // Berhenti di langkah ke-4
    updateLabel: 'harga_input = input_berikutnya()',
    updateVal: (v) => (v === 25000 ? 15000 : v === 15000 ? 40000 : 0)
  },
  {
    id: 'infinite',
    title: 'Perangkap Infinite Loop (Lupa Update)',
    subtitle: 'Demonstrasi bahaya fatal ketika programmer lupa menulis pembaruan variabel di dalam badan loop!',
    initVar: 'counter',
    initVal: 1,
    conditionLabel: 'counter <= 5',
    evalCondition: () => true, // Selalu bernilai True karena counter tidak pernah bertambah
    updateLabel: '# LUPA DITULIS (counter tetap 1)',
    updateVal: (v) => v, // Nilai tidak berubah!
    isInfiniteTrap: true
  }
];

export default function WhileSentinelLab() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('savings');
  const [currentVal, setCurrentVal] = useState<number>(20000);
  const [iteration, setIteration] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isTrapTriggered, setIsTrapTriggered] = useState<boolean>(false);
  const [langTab, setLangTab] = useState<'python' | 'javascript'>('python');

  const scenario = SCENARIOS.find((s) => s.id === activeScenarioId) ?? SCENARIOS[0];

  // Reset state when scenario changes
  const applyScenario = (id: string) => {
    const sc = SCENARIOS.find((s) => s.id === id);
    if (!sc) return;
    setActiveScenarioId(id);
    setCurrentVal(sc.initVal);
    setIteration(0);
    setIsRunning(false);
    setIsTrapTriggered(false);
    setLogs([`Inisialisasi: ${sc.initVar} = ${sc.initVal}`]);
  };

  const isConditionTrue = scenario.evalCondition(currentVal, iteration);

  const stepForward = () => {
    if (scenario.isInfiniteTrap && iteration >= 8) {
      setIsTrapTriggered(true);
      setIsRunning(false);
      return;
    }

    if (!isConditionTrue) {
      setIsRunning(false);
      return;
    }

    const nextIter = iteration + 1;
    const nextVal = scenario.updateVal(currentVal);
    setIteration(nextIter);
    setCurrentVal(nextVal);

    setLogs((prev) => [
      ...prev,
      `[Putaran #${nextIter}] Evaluasi (${scenario.conditionLabel}) -> TRUE. Nilai ${scenario.initVar} kini: ${nextVal}`
    ]);

    if (!scenario.isInfiniteTrap && !scenario.evalCondition(nextVal, nextIter)) {
      setLogs((prev) => [
        ...prev,
        `[SELESAI] Evaluasi (${scenario.conditionLabel}) -> FALSE! Loop berhenti normal.`
      ]);
      setIsRunning(false);
    }
  };

  // Auto-runner loop
  useEffect(() => {
    if (!isRunning) return;

    if (scenario.isInfiniteTrap && iteration >= 8) {
      setIsTrapTriggered(true);
      setIsRunning(false);
      return;
    }

    if (!isConditionTrue) {
      setIsRunning(false);
      return;
    }

    const timer = setTimeout(() => {
      stepForward();
    }, 850);

    return () => clearTimeout(timer);
  }, [isRunning, iteration, isConditionTrue, scenario.isInfiniteTrap]);

  return (
    <div className="w-full rounded-3xl border-2 border-teal-500/30 dark:border-teal-500/20 bg-card dark:bg-slate-950 p-5 md:p-8 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-6">
      
      {/* ── Header Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-400 font-mono text-xs font-bold border border-teal-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Laboratorium 2: Dynamic While &amp; Trap Breaker</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100">
            Simulator WHILE Loop, Nilai Sentinel &amp; Anti-Infinite Loop
          </h3>
        </div>

        {/* Dual-Language Toggle */}
        <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setLangTab('python')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              langTab === 'python'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-foreground'
            }`}
          >
            Python (while)
          </button>
          <button
            onClick={() => setLangTab('javascript')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              langTab === 'javascript'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-foreground'
            }`}
          >
            JavaScript (while)
          </button>
        </div>
      </div>

      {/* ── Skenario Pemilihan ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {SCENARIOS.map((sc) => {
          const isSelected = sc.id === activeScenarioId;
          return (
            <button
              key={sc.id}
              onClick={() => applyScenario(sc.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? sc.isInfiniteTrap
                    ? 'border-rose-500 bg-rose-500/10 text-rose-950 dark:text-rose-200 shadow-sm'
                    : 'border-teal-500 bg-teal-500/10 text-teal-950 dark:text-teal-200 shadow-sm'
                  : 'border-border/80 bg-slate-50/50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:border-teal-500/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs">{sc.title}</span>
                {sc.isInfiniteTrap && <Flame className="w-4 h-4 text-rose-500" />}
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                {sc.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* ── Main Canvas: Diagram Alir Dinamis & Loopback Animation ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Kolom Kiri: Evaluasi Logika Belah Ketupat & Loopback (7 Kolom) */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                Alur Loopback Eksekusi Evaluator:
              </span>
              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                isConditionTrue ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/30'
              }`}>
                Kondisi: {isConditionTrue ? 'TRUE (Lanjut Loop)' : 'FALSE (Keluar Loop)'}
              </span>
            </div>

            {/* Visual Belah Ketupat Evaluasi Dinamis */}
            <div className="py-6 flex flex-col items-center justify-center relative">
              
              {/* Node Inisialisasi */}
              <div className="px-4 py-2 rounded-xl bg-card border border-border text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mb-4 shadow-xs">
                Inisialisasi: {scenario.initVar} = {scenario.initVal}
              </div>

              {/* Garis Panah Menuju Decision */}
              <div className="w-0.5 h-6 bg-slate-400 dark:bg-slate-700 mb-1" />

              {/* Belah Ketupat Decision (Diamond ANSI Kontras Tinggi) */}
              <div className="relative w-56 h-28 flex items-center justify-center">
                <svg viewBox="0 0 220 110" className="w-full h-full drop-shadow-md">
                  <polygon
                    points="110,5 215,55 110,105 5,55"
                    className="fill-[#451a03] stroke-amber-500"
                    strokeWidth="2.5"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                  <span className="text-[11px] font-mono font-black text-amber-200">
                    {scenario.conditionLabel} ?
                  </span>
                  <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-full mt-1 ${
                    isConditionTrue ? 'bg-emerald-500 text-white' : 'bg-rose-600 text-white'
                  }`}>
                    {isConditionTrue ? '✓ HASIL: TRUE' : '✗ HASIL: FALSE'}
                  </span>
                </div>
              </div>

              {/* Cabang True (Loopback) & Cabang False (Keluar) */}
              <div className="w-full grid grid-cols-2 gap-4 mt-4">
                
                {/* Cabang TRUE: Jalur Eksekusi & Pembaruan */}
                <div className={`p-3.5 rounded-xl border text-center transition-all ${
                  isConditionTrue
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 font-bold'
                    : 'border-border/60 bg-secondary/30 text-muted-foreground opacity-50'
                }`}>
                  <span className="text-[11px] font-bold block mb-1">
                    [TRUE] Jalankan Badan Loop:
                  </span>
                  <code className="text-xs font-mono block bg-card/80 py-1 rounded">
                    {scenario.updateLabel}
                  </code>
                  <span className="text-[10px] font-mono mt-1 block opacity-80">
                    ↺ Memutar Kembali ke Decision
                  </span>
                </div>

                {/* Cabang FALSE: Selesai */}
                <div className={`p-3.5 rounded-xl border text-center transition-all ${
                  !isConditionTrue
                    ? 'border-rose-500 bg-rose-500/10 text-rose-950 dark:text-rose-200 font-bold'
                    : 'border-border/60 bg-secondary/30 text-muted-foreground opacity-50'
                }`}>
                  <span className="text-[11px] font-bold block mb-1">
                    [FALSE] Keluar dari Loop:
                  </span>
                  <code className="text-xs font-mono block bg-card/80 py-1 rounded">
                    Terminator SELESAI
                  </code>
                  <span className="text-[10px] font-mono mt-1 block opacity-80">
                    Lanjut ke baris setelah loop
                  </span>
                </div>

              </div>
            </div>

            {/* Peringatan Bahaya Infinite Loop Trap */}
            {isTrapTriggered && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-4 rounded-2xl bg-rose-500/15 border-2 border-rose-500 text-rose-950 dark:text-rose-100 space-y-2"
              >
                <div className="flex items-center gap-2 font-bold text-sm text-rose-600 dark:text-rose-400">
                  <Flame className="w-5 h-5 text-rose-500 animate-pulse" />
                  <span>EMERGENCY BREAKER: Terdeteksi Infinite Loop!</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Perhatikan bahwa variabel <code>{scenario.initVar}</code> bernilai tetap <code>{currentVal}</code> dan tidak pernah diubah di dalam badan loop. Akibatnya, kondisi <code>{scenario.conditionLabel}</code> akan bernilai <strong>TRUE SELAMANYA</strong>. Komputer Anda akan mengalami <em>hang</em> (CPU 100%) jika tidak ada sistem penyelamat otomatis!
                </p>
              </motion.div>
            )}

            {/* Tombol Kontrol */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  disabled={!isConditionTrue && !scenario.isInfiniteTrap}
                  className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                    isRunning
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isRunning ? 'Jeda' : 'Jalankan Loop'}</span>
                </button>

                <button
                  onClick={stepForward}
                  disabled={!isConditionTrue && !scenario.isInfiniteTrap}
                  className="px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary/80 disabled:opacity-40 text-foreground font-bold text-xs flex items-center gap-1.5 border border-border cursor-pointer transition-all"
                >
                  <StepForward className="w-4 h-4 text-teal-500" />
                  <span>Step (+1 Putaran)</span>
                </button>

                <button
                  onClick={() => applyScenario(activeScenarioId)}
                  className="p-2 rounded-xl bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer transition-all"
                  title="Reset Simulasi"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                Total Putaran: <strong>{iteration}</strong> kali
              </span>
            </div>

          </div>

        </div>

        {/* Kolom Kanan: RAM State & Terminal Log (5 Kolom) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Loker RAM Real-Time */}
          <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 shadow-md space-y-4 font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Cpu className="w-4 h-4 text-teal-400" />
                <span>STATE MEMORY RAM (LIVE)</span>
              </span>
              <span className="text-[11px] text-teal-400 font-bold">
                ITERASI: #{iteration}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 block">Variabel ({scenario.initVar}):</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-teal-400">
                  {currentVal.toLocaleString('id-ID')}
                </span>
                <span className="text-xs text-slate-500 font-sans">
                  {scenario.id === 'savings' ? 'Rupiah' : 'angka'}
                </span>
              </div>
            </div>

            {/* 3 Rukun Checklist */}
            <div className="pt-1 space-y-1.5 text-xs text-slate-400 font-sans">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>1. Inisialisasi awal ada: <code>{scenario.initVar} = {scenario.initVal}</code></span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>2. Kondisi terminasi diuji: <code>{scenario.conditionLabel}</code></span>
              </div>
              <div className={`flex items-center gap-2 ${scenario.isInfiniteTrap ? 'text-rose-400 font-bold' : 'text-emerald-400'}`}>
                {scenario.isInfiniteTrap ? (
                  <AlertTriangle className="w-3.5 h-3.5" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                )}
                <span>3. Pembaruan variabel: <code>{scenario.updateLabel}</code></span>
              </div>
            </div>
          </div>

          {/* Terminal Console Output */}
          <div className="p-5 rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 space-y-3 font-mono shadow-md">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-teal-400" />
                <span>TERMINAL LOG MONITOR</span>
              </span>
              <span className="text-[10px] text-slate-500">stdout</span>
            </div>

            <div className="h-44 overflow-y-auto space-y-1 text-xs text-slate-300 pr-1">
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-300">
                  <span className="text-slate-600 select-none mt-0.5">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
