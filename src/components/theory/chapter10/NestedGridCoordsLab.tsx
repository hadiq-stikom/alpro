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
  Layers,
  Cpu,
  CheckCircle2,
  Sliders,
  Grid,
  Zap,
  Info
} from 'lucide-react';

interface PresetMatrix {
  id: string;
  title: string;
  rows: number;
  cols: number;
  description: string;
}

const PRESETS: PresetMatrix[] = [
  {
    id: '3x3',
    title: 'Matriks Persegi 3 × 3',
    rows: 3,
    cols: 3,
    description: 'Grid seimbang 3 baris dan 3 kolom (total 9 titik koordinat).'
  },
  {
    id: '3x5',
    title: 'Grid Persegi Panjang 3 × 5',
    rows: 3,
    cols: 5,
    description: 'Bentuk lansekap: 3 perputaran luar dengan 5 perputaran dalam (total 15 sel).'
  },
  {
    id: '4x2',
    title: 'Grid Vertikal 4 × 2',
    rows: 4,
    cols: 2,
    description: 'Bentuk potret: 4 perputaran luar dengan 2 perputaran dalam (total 8 sel).'
  },
  {
    id: '4x4',
    title: 'Matriks Papan Catur 4 × 4',
    rows: 4,
    cols: 4,
    description: 'Papan simetris 16 sel dengan koordinat baris-kolom teratur.'
  }
];

export default function NestedGridCoordsLab() {
  const [selectedPreset, setSelectedPreset] = useState<string>('3x3');
  const [rows, setRows] = useState<number>(3);
  const [cols, setCols] = useState<number>(3);
  const [activeTab, setActiveTab] = useState<'python' | 'javascript'>('python');

  // Stepper runtime state
  const [currentI, setCurrentI] = useState<number>(0);
  const [currentJ, setCurrentJ] = useState<number>(0);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [visitedCells, setVisitedCells] = useState<Set<string>>(new Set());
  const [outputLog, setOutputLog] = useState<string[]>([]);
  const [speedMs, setSpeedMs] = useState<number>(700);

  const totalCells = rows * cols;
  const isFinished = stepIndex >= totalCells;

  // Handle Preset Change
  const handleSelectPreset = (p: PresetMatrix) => {
    setSelectedPreset(p.id);
    setRows(p.rows);
    setCols(p.cols);
    handleReset();
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentI(0);
    setCurrentJ(0);
    setStepIndex(0);
    setVisitedCells(new Set());
    setOutputLog([]);
  };

  // Step Forward function
  const handleStepForward = () => {
    if (stepIndex >= totalCells) {
      setIsRunning(false);
      return;
    }

    const r = Math.floor(stepIndex / cols);
    const c = stepIndex % cols;

    setCurrentI(r);
    setCurrentJ(c);

    setVisitedCells((prev) => {
      const next = new Set(prev);
      next.add(`${r}-${c}`);
      return next;
    });

    setOutputLog((prev) => {
      const coordStr = `(${r},${c})`;
      if (c === cols - 1) {
        return [...prev, `${coordStr} ⏎ (pindah baris)`];
      }
      return [...prev, coordStr];
    });

    setStepIndex((prev) => prev + 1);
  };

  // Timer loop for auto play
  useEffect(() => {
    if (!isRunning) return;
    if (stepIndex >= totalCells) {
      setIsRunning(false);
      return;
    }

    const timer = setTimeout(() => {
      handleStepForward();
    }, speedMs);

    return () => clearTimeout(timer);
  }, [isRunning, stepIndex, totalCells, speedMs, cols]);

  // Code templates
  const pythonCode = `# Pemetaan Koordinat Grid 2D (${rows} baris × ${cols} kolom)
for i in range(${rows}):        # Outer Loop: mengendalikan baris vertikal
    for j in range(${cols}):    # Inner Loop: mengendalikan kolom horizontal
        print(f"({i},{j})", end=" ")
    print()             # Pindah baris saat 1 baris kolom selesai`;

  const jsCode = `// Pemetaan Koordinat Grid 2D (${rows} baris × ${cols} kolom)
for (let i = 0; i < ${rows}; i++) {     // Outer Loop (Baris)
    let baris = "";
    for (let j = 0; j < ${cols}; j++) { // Inner Loop (Kolom)
        baris += \`(\${i},\${j}) \`;
    }
    console.log(baris);         // Cetak satu baris penuh
}`;

  return (
    <div className="w-full my-8 space-y-6 rounded-3xl border border-border/80 bg-card p-6 md:p-8 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
      
      {/* 1. Header Lab */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            <Grid className="w-4 h-4" />
            <span>Interactive Multi-Dimensional Simulator</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100">
            Simulator Koordinat Spasial &amp; Traversal Matriks ($i, j$)
          </h3>
          <p className="text-xs text-muted-foreground pt-1 max-w-2xl">
            Amati bagaimana pointer komputer menelusuri setiap titik koordinat 2D langkah demi langkah. Inner loop (<code className="font-mono text-sky-600 dark:text-sky-400 font-bold">j</code>) menyelesaikan seluruh kolom horizontal sebelum outer loop (<code className="font-mono text-purple-600 dark:text-purple-400 font-bold">i</code>) berpindah ke baris berikutnya.
          </p>
        </div>

        {/* Tab Bahasa Python vs JS */}
        <div className="flex p-1 rounded-xl bg-secondary border border-border text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('python')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'python'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Python 3
          </button>
          <button
            onClick={() => setActiveTab('javascript')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'javascript'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            JavaScript (ES6)
          </button>
        </div>
      </div>

      {/* 2. Tombol Pilihan Preset Matriks */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {PRESETS.map((p) => {
          const isSelected = selectedPreset === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handleSelectPreset(p)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-purple-500 bg-purple-500/10 text-purple-900 dark:text-purple-200 ring-2 ring-purple-500/20 shadow-xs'
                  : 'border-border/60 bg-secondary/30 text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
              }`}
            >
              <div>
                <div className="font-bold text-xs flex items-center justify-between">
                  <span>{p.title}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />}
                </div>
                <div className="text-[10px] opacity-75 mt-0.5 line-clamp-1">{p.description}</div>
              </div>
              <div className="mt-2 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-300">
                {p.rows} Baris × {p.cols} Kolom = {p.rows * p.cols} Titik
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Slider Dimensi Kustom */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/60 text-xs">
        <div className="space-y-1.5">
          <div className="flex justify-between font-mono font-bold">
            <span className="text-purple-700 dark:text-purple-400">Outer Loop (Baris i):</span>
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-800 dark:text-purple-300 font-mono">
              {rows} Baris (0 .. {rows - 1})
            </span>
          </div>
          <input
            type="range"
            min={2}
            max={6}
            value={rows}
            onChange={(e) => {
              setRows(Number(e.target.value));
              setSelectedPreset('custom');
              handleReset();
            }}
            className="w-full accent-purple-600 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between font-mono font-bold">
            <span className="text-sky-700 dark:text-sky-400">Inner Loop (Kolom j):</span>
            <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-800 dark:text-sky-300 font-mono">
              {cols} Kolom (0 .. {cols - 1})
            </span>
          </div>
          <input
            type="range"
            min={2}
            max={6}
            value={cols}
            onChange={(e) => {
              setCols(Number(e.target.value));
              setSelectedPreset('custom');
              handleReset();
            }}
            className="w-full accent-sky-600 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between font-mono font-bold">
            <span>Kecepatan Animasi:</span>
            <span className="px-2 py-0.5 rounded bg-secondary text-foreground font-mono">
              {speedMs} ms / langkah
            </span>
          </div>
          <input
            type="range"
            min={200}
            max={1200}
            step={100}
            value={speedMs}
            onChange={(e) => setSpeedMs(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>
      </div>

      {/* 4. Area Kerja 2-Kolom: Grid Spasial Visual (Kiri) vs Code & RAM Inspector (Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Kolom Kiri (7 Spans): Kanvas Grid Visual Koordinat */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Kontrol Stepper Bar */}
          <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/80 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                disabled={isFinished}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                  isFinished
                    ? 'opacity-50 cursor-not-allowed bg-muted text-muted-foreground'
                    : isRunning
                    ? 'bg-amber-500 text-white hover:bg-amber-600 active:scale-95'
                    : 'bg-purple-600 text-white hover:bg-purple-700 active:scale-95'
                }`}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isRunning ? 'Jeda' : isFinished ? 'Selesai' : 'Jalankan Otomatis'}</span>
              </button>

              <button
                onClick={handleStepForward}
                disabled={isRunning || isFinished}
                className="px-3 py-2 rounded-xl border border-border/80 bg-background hover:bg-secondary text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5 shadow-xs active:scale-95"
                title="Maju 1 langkah iterasi (1 sel)"
              >
                <StepForward className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>1 Langkah (Next)</span>
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-xl border border-border/80 bg-background hover:bg-secondary text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-xs active:scale-95"
                title="Reset Simulasi"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Indikator Progres Langkah */}
            <div className="text-xs font-mono font-bold text-foreground">
              Langkah: <span className="text-purple-600 dark:text-purple-400">{Math.min(stepIndex, totalCells)}</span> / {totalCells}
            </div>
          </div>

          {/* Kanvas Visual Matriks Interaktif */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-border dark:border-slate-800 shadow-inner flex flex-col items-center justify-center min-h-[320px]">
            <div className="w-full mb-3 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
                <span>GRID KOORDINAT FISIK (BARIS i, KOLOM j)</span>
              </span>
              <span className="text-[11px] text-amber-600 dark:text-amber-300 font-bold">
                {isFinished ? '✓ Traversal Selesai!' : `Sedang di: baris ${currentI}, kolom ${currentJ}`}
              </span>
            </div>

            {/* Layout Grid Dinamis */}
            <div
              className="grid gap-3 p-4 rounded-2xl bg-slate-100/90 dark:bg-black/50 border border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`
              }}
            >
              {Array.from({ length: rows }).map((_, r) => (
                Array.from({ length: cols }).map((_, c) => {
                  const key = `${r}-${c}`;
                  const isActive = stepIndex > 0 && r === currentI && c === currentJ;
                  const isVisited = visitedCells.has(key);

                  return (
                    <div
                      key={key}
                      className={`relative min-w-[58px] min-h-[58px] md:min-w-[68px] md:min-h-[68px] rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center p-2 font-mono select-none ${
                        isActive
                          ? 'border-purple-400 bg-purple-600 text-white scale-110 shadow-lg shadow-purple-500/50 z-20 ring-4 ring-purple-400/30'
                          : isVisited
                          ? 'border-emerald-600/70 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-400 dark:text-slate-500 hover:border-purple-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {/* Label Koordinat (i, j) */}
                      <span className={`text-xs md:text-sm font-black ${isActive ? 'text-white' : isVisited ? 'text-emerald-800 dark:text-emerald-200' : 'text-slate-700 dark:text-slate-400'}`}>
                        ({r}, {c})
                      </span>
                      
                      {/* Sub-label Nomor Urut */}
                      <span className="text-[9px] opacity-75 font-mono mt-0.5">
                        #{r * cols + c + 1}
                      </span>

                      {/* Badge Status */}
                      {isActive && (
                        <span className="absolute -top-2 bg-amber-400 text-slate-950 text-[8px] font-black px-1.5 py-0.2 rounded-full shadow-xs">
                          AKTIF
                        </span>
                      )}
                    </div>
                  );
                })
              ))}
            </div>

            {/* Legend Bawah */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-slate-400 pt-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-purple-600 border border-purple-400" />
                <span>Sel Sedang Diproses</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-950 border border-emerald-600" />
                <span>Sudah Selesai (Visited)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800" />
                <span>Antrian Menunggu</span>
              </span>
            </div>
          </div>
        </div>

        {/* Kolom Kanan (5 Spans): Editor Kode & RAM State Inspector */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Editor Kode Komparatif */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 p-4 text-xs font-mono shadow-sm">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
              <span className="flex items-center gap-2 font-bold text-slate-200">
                <Code2 className="w-4 h-4 text-purple-400" />
                <span>{activeTab === 'python' ? 'Python 3 Code' : 'JavaScript (ES6)'}</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                {activeTab === 'python' ? 'range() Syntax' : 'for (let..) Syntax'}
              </span>
            </div>

            <pre className="text-slate-200 leading-relaxed overflow-x-auto whitespace-pre font-mono p-1">
              {activeTab === 'python' ? pythonCode : jsCode}
            </pre>
          </div>

          {/* Live RAM State Inspector */}
          <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>STATE MEMORY RAM (LIVE)</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                Sinkron Real-Time
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-background border border-border/80">
                <span className="text-muted-foreground text-[10px] block">Outer Variable (i):</span>
                <span className="text-lg font-black text-purple-600 dark:text-purple-400">
                  {stepIndex === 0 ? '-' : currentI}
                </span>
                <span className="text-[10px] text-muted-foreground block">Baris ke-{currentI + 1} dari {rows}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-background border border-border/80">
                <span className="text-muted-foreground text-[10px] block">Inner Variable (j):</span>
                <span className="text-lg font-black text-sky-600 dark:text-sky-400">
                  {stepIndex === 0 ? '-' : currentJ}
                </span>
                <span className="text-[10px] text-muted-foreground block">Kolom ke-{currentJ + 1} dari {cols}</span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-background border border-border/60 text-[11px] font-mono flex items-center justify-between">
              <span className="text-muted-foreground">Rumus Indeks Linear 1D:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                idx = (i × {cols}) + j = {stepIndex > 0 ? (currentI * cols + currentJ) : 0}
              </span>
            </div>
          </div>

          {/* Terminal Output Monitor */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300 font-bold">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>TERMINAL STDOUT OUTPUT</span>
              </span>
              <span className="text-[10px] text-slate-500">
                {outputLog.length} token tercetak
              </span>
            </div>

            <div className="min-h-[70px] max-h-[110px] overflow-y-auto font-mono text-emerald-400 space-y-1 text-xs">
              {outputLog.length === 0 ? (
                <span className="text-slate-600 italic">Tekan [Jalankan Otomatis] atau [1 Langkah] untuk melihat cetakan stdout...</span>
              ) : (
                <div className="flex flex-wrap gap-2 items-center">
                  {outputLog.map((log, idx) => (
                    <span 
                      key={idx}
                      className={`px-1.5 py-0.5 rounded text-[11px] ${
                        log.includes('pindah baris') 
                          ? 'bg-purple-900/60 text-purple-200 border border-purple-500/40 font-bold' 
                          : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                      }`}
                    >
                      {log}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* 5. Insight Analisis Akademis */}
      <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-950 dark:text-purple-200 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold">Takeaway Kunci Representasi Matriks:</div>
          <p className="leading-relaxed opacity-90">
            Perhatikan bahwa untuk setiap nilai <code className="font-mono font-bold text-purple-700 dark:text-purple-300">i</code> yang tetap, variabel <code className="font-mono font-bold text-sky-700 dark:text-sky-300">j</code> selalu menyapu habis dari <code className="font-mono">0</code> hingga <code className="font-mono">{cols - 1}</code>. Pola inilah yang menjadi fondasi seluruh pemrosesan kisi spasial dua dimensi, pembuatan tabel data dan laporan, hingga grafika piksel komputer di industri perangkat lunak.
          </p>
        </div>
      </div>

    </div>
  );
}

