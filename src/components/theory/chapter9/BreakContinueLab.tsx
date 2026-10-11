"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  StepForward,
  Terminal,
  Zap,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  FastForward,
  Layers,
  Cpu
} from 'lucide-react';

type ControlMode = 'normal' | 'break' | 'continue' | 'forelse';

export default function BreakContinueLab() {
  const [mode, setMode] = useState<ControlMode>('break');
  const [currentNum, setCurrentNum] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isBroken, setIsBroken] = useState<boolean>(false);
  const [elseExecuted, setElseExecuted] = useState<boolean>(false);
  const [langTab, setLangTab] = useState<'python' | 'javascript'>('python');

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentNum(0);
    setLogs([]);
    setIsBroken(false);
    setElseExecuted(false);
  };

  const setModeAndReset = (newMode: ControlMode) => {
    setMode(newMode);
    resetSimulation();
  };

  const stepForward = () => {
    if (isBroken || currentNum >= 10) {
      setIsRunning(false);
      return;
    }

    const nextVal = currentNum + 1;
    setCurrentNum(nextVal);

    if (mode === 'break') {
      if (nextVal === 6) {
        setIsBroken(true);
        setIsRunning(false);
        setLogs((prev) => [
          ...prev,
          `⚡ KONDISI TERCAPAI: angka == 6 -> Eksekusi BREAK! Loop dipaksa berhenti seketika.`
        ]);
        return;
      }
      setLogs((prev) => [...prev, `Putaran #${nextVal}: Memproses angka ${nextVal}`]);
    } else if (mode === 'continue') {
      if (nextVal % 2 === 0) {
        setLogs((prev) => [
          ...prev,
          `↷ KONDISI TERCAPAI: angka ${nextVal} adalah GENAP -> Eksekusi CONTINUE! Sisa putaran ini dilewati.`
        ]);
      } else {
        setLogs((prev) => [
          ...prev,
          `✓ Putaran #${nextVal}: Memproses angka GANJIL ${nextVal}`
        ]);
      }
    } else if (mode === 'forelse') {
      // Loop selesai sampai 10 tanpa break
      setLogs((prev) => [...prev, `Putaran #${nextVal}: Memproses angka ${nextVal}`]);
      if (nextVal === 10) {
        setElseExecuted(true);
        setLogs((prev) => [
          ...prev,
          `🎉 BLOK ELSE DIEKSEKUSI: Loop tuntas normal tanpa terkena break!`
        ]);
      }
    } else {
      setLogs((prev) => [...prev, `Putaran #${nextVal}: Memproses angka ${nextVal}`]);
    }
  };

  // Auto-runner loop
  React.useEffect(() => {
    if (!isRunning) return;

    if (isBroken || currentNum >= 10) {
      setIsRunning(false);
      return;
    }

    const timer = setTimeout(() => {
      stepForward();
    }, 850);

    return () => clearTimeout(timer);
  }, [isRunning, currentNum, isBroken, mode]);

  return (
    <div className="w-full rounded-3xl border-2 border-rose-500/30 dark:border-rose-500/20 bg-card dark:bg-slate-950 p-5 md:p-8 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-6">
      
      {/* ── Header Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 font-mono text-xs font-bold border border-rose-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Laboratorium 4: Flow Interrupter Circuit</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100">
            Sirkuit Pengendalian Eksekusi: Break vs Continue
          </h3>
        </div>

        {/* Dual-Language Toggle */}
        <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setLangTab('python')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              langTab === 'python'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-foreground'
            }`}
          >
            Python (break / continue / else)
          </button>
          <button
            onClick={() => setLangTab('javascript')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              langTab === 'javascript'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-foreground'
            }`}
          >
            JavaScript (break / continue)
          </button>
        </div>
      </div>

      {/* ── Mode Selector Tabs ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => setModeAndReset('break')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            mode === 'break'
              ? 'border-rose-500 bg-rose-500/10 text-rose-950 dark:text-rose-200 shadow-xs'
              : 'border-border/80 bg-slate-50/50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:border-rose-500/40'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-xs mb-1">
            <AlertOctagon className="w-4 h-4 text-rose-500" />
            <span>Uji Pernyataan BREAK</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Hentikan paksa seluruh sirkuit loop saat menemukan <strong>angka == 6</strong>.
          </p>
        </button>

        <button
          onClick={() => setModeAndReset('continue')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            mode === 'continue'
              ? 'border-amber-500 bg-amber-500/10 text-amber-950 dark:text-amber-200 shadow-xs'
              : 'border-border/80 bg-slate-50/50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:border-amber-500/40'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-xs mb-1">
            <FastForward className="w-4 h-4 text-amber-500" />
            <span>Uji Pernyataan CONTINUE</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Lewatkan (skip) hanya <strong>bilangan genap</strong> dan langsung lompat ke putaran berikutnya.
          </p>
        </button>

        <button
          onClick={() => setModeAndReset('forelse')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            mode === 'forelse'
              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 shadow-xs'
              : 'border-border/80 bg-slate-50/50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:border-emerald-500/40'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-xs mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Klausul FOR ... ELSE (Python)</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Buktikan bahwa blok <code>else:</code> aktif jika perulangan selesai alami tanpa break.
          </p>
        </button>
      </div>

      {/* ── Main Canvas: Sirkuit Lintasan Token ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Kolom Kiri: Ban Berjalan Token (7 Kolom) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                Sirkuit Konveyor Iterasi (Data 1 s.d. 10):
              </span>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {currentNum > 0 ? `Elemen Aktif: ${currentNum}` : 'Status: Siap'}
              </span>
            </div>

            {/* Lintasan Token Visual */}
            <div className="p-4 rounded-2xl bg-card border border-border/80 flex items-center justify-center gap-2 overflow-x-auto min-h-[90px]">
              {numbers.map((val) => {
                const isCurrent = val === currentNum;
                const isPast = val < currentNum;
                const isBreakTrigger = mode === 'break' && val === 6;
                const isSkipped = mode === 'continue' && val % 2 === 0 && val <= currentNum;

                let cardStyle = 'bg-card border-border text-slate-600 dark:text-slate-400';
                if (isCurrent) {
                  if (isBreakTrigger) {
                    cardStyle = 'bg-rose-600 text-white ring-4 ring-rose-500/30 scale-110 shadow-lg';
                  } else if (isSkipped) {
                    cardStyle = 'bg-amber-500/20 border-amber-500 text-amber-700 dark:text-amber-300 scale-95';
                  } else {
                    cardStyle = 'bg-emerald-600 text-white ring-4 ring-emerald-500/30 scale-110 shadow-lg';
                  }
                } else if (isPast) {
                  if (mode === 'break' && val >= 6) {
                    cardStyle = 'opacity-30 line-through bg-slate-200 dark:bg-slate-800';
                  } else if (isSkipped) {
                    cardStyle = 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400';
                  } else {
                    cardStyle = 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300';
                  }
                } else if (isBroken && val > 6) {
                  cardStyle = 'opacity-25 line-through bg-slate-100 dark:bg-slate-900';
                }

                return (
                  <div
                    key={val}
                    className={`w-11 h-12 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-xs border transition-all ${cardStyle}`}
                  >
                    <span>{val}</span>
                    <span className="text-[8px] font-normal opacity-70">
                      {isBreakTrigger && isPast ? 'BREAK' : isSkipped ? 'SKIP' : 'OK'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Pesan Dampak Eksekusi */}
            {isBroken && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-950 dark:text-rose-200 text-xs flex items-center gap-2"
              >
                <AlertOctagon className="w-4 h-4 text-rose-500 shrink-0" />
                <span>
                  <strong>Sirkuit Terputus (E-Stop):</strong> Perhatikan bahwa angka <strong>7, 8, 9, 10</strong> sama sekali tidak pernah disentuh oleh komputer karena pernyataan <code>break</code> langsung melompat keluar dari perulangan!
                </span>
              </motion.div>
            )}

            {elseExecuted && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-950 dark:text-emerald-200 text-xs flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  <strong>Keistimewaan Python:</strong> Blok <code>else:</code> dieksekusi dengan sukses karena seluruh 10 angka selesai diperiksa tanpa terkena interupsi <code>break</code>.
                </span>
              </motion.div>
            )}

            {/* Tombol Kontrol */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  disabled={isBroken || currentNum >= 10}
                  className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                    isRunning
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-rose-600 hover:bg-rose-700 text-white'
                  }`}
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isRunning ? 'Jeda' : 'Jalankan'}</span>
                </button>

                <button
                  onClick={stepForward}
                  disabled={isBroken || currentNum >= 10}
                  className="px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary/80 disabled:opacity-40 text-foreground font-bold text-xs flex items-center gap-1.5 border border-border cursor-pointer transition-all"
                >
                  <StepForward className="w-4 h-4 text-rose-500" />
                  <span>Step (+1)</span>
                </button>

                <button
                  onClick={resetSimulation}
                  className="p-2 rounded-xl bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer transition-all"
                  title="Reset Simulasi"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                {isBroken ? '🛑 Sirkuit Break Aktif' : currentNum >= 10 ? '✓ Loop Selesai' : `Diproses: ${currentNum}/10`}
              </span>
            </div>

          </div>
        </div>

        {/* Kolom Kanan: Terminal & Snippet Kode (5 Kolom) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Kode Program yang Aktif */}
          <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 font-mono text-xs shadow-md space-y-2">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Sintaks Logika ({langTab.toUpperCase()}):
            </span>
            <pre className="p-3 rounded-xl bg-slate-950 text-slate-300 overflow-x-auto leading-relaxed border border-slate-800 select-none">
              {mode === 'break'
                ? langTab === 'python'
                  ? `for i in range(1, 11):\n    if i == 6:\n        break  # Keluar seketika\n    print(f"Memproses {i}")`
                  : `for (let i = 1; i <= 10; i++) {\n    if (i === 6) {\n        break; // Keluar seketika\n    }\n    console.log(\`Memproses \${i}\`);\n}`
                : mode === 'continue'
                ? langTab === 'python'
                  ? `for i in range(1, 11):\n    if i % 2 == 0:\n        continue  # Lewati genap\n    print(f"Ganjil: {i}")`
                  : `for (let i = 1; i <= 10; i++) {\n    if (i % 2 === 0) {\n        continue; // Lewati genap\n    }\n    console.log(\`Ganjil: \${i}\`);\n}`
                : `for i in range(1, 11):\n    print(f"Memproses {i}")\nelse:\n    print("Tuntas tanpa break!")`}
            </pre>
          </div>

          {/* Terminal Console Output */}
          <div className="p-5 rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 space-y-3 font-mono shadow-md">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-rose-400" />
                <span>TERMINAL LOG OUTPUT</span>
              </span>
              <span className="text-[10px] text-slate-500">stdout</span>
            </div>

            <div className="h-36 overflow-y-auto space-y-1 text-xs text-slate-300 pr-1">
              {logs.length === 0 ? (
                <span className="text-slate-600 italic">Tekan &quot;Step&quot; atau &quot;Jalankan&quot; untuk memulai...</span>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-300">
                    <span className="text-slate-600 select-none mt-0.5">&gt;</span>
                    <span>{log}</span>
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
