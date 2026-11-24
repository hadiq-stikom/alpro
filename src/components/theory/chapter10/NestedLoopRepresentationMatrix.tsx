"use client";

import React, { useState, useEffect } from 'react';
import {
  Layers,
  FileText,
  GitBranch,
  Sparkles,
  Code2,
  Terminal,
  Play,
  Pause,
  RotateCcw,
  LayoutGrid,
  Maximize2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  AlertTriangle,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NestedLoopRepresentationMatrix() {
  const [viewMode, setViewMode] = useState<'matrix' | 'focus'>('matrix');
  const [loopType, setLoopType] = useState<'for' | 'while'>('for');
  const [focusTab, setFocusTab] = useState<'naratif' | 'flowchart' | 'pseudocode' | 'kode'>('flowchart');
  const [activeLang, setActiveLang] = useState<'python' | 'javascript'>('python');

  // State simulasi alur flowchart bertingkat (simStep: 0..6)
  const [simStep, setSimStep] = useState<number>(0);
  const [isSimPlaying, setIsSimPlaying] = useState<boolean>(false);

  // State simulasi eksekusi kode console
  const [codeConsoleOutput, setCodeConsoleOutput] = useState<string[]>([]);
  const [isCodeRunning, setIsCodeRunning] = useState<boolean>(false);
  const [activeRamI, setActiveRamI] = useState<number | null>(null);
  const [activeRamJ, setActiveRamJ] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimPlaying) {
      timer = setTimeout(() => {
        setSimStep((prev) => {
          if (prev >= 6) {
            setIsSimPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isSimPlaying, simStep]);

  // Handler simulasi run kode
  const runCodeSimulation = () => {
    setIsCodeRunning(true);
    setCodeConsoleOutput([]);
    const M = 3;
    const N = 4;
    const rows: string[] = [];

    let currentStep = 0;
    const totalSteps = M * N;

    let i = 1;
    let j = 1;
    let currentRowText = "";

    const interval = setInterval(() => {
      setActiveRamI(i);
      setActiveRamJ(j);
      currentRowText += `(${i},${j}) `;

      j++;
      if (j > N) {
        rows.push(currentRowText.trim());
        setCodeConsoleOutput([...rows]);
        currentRowText = "";
        j = 1;
        i++;
      }

      currentStep++;
      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setIsCodeRunning(false);
      }
    }, 350);
  };

  const resetCodeSimulation = () => {
    setIsCodeRunning(false);
    setCodeConsoleOutput([]);
    setActiveRamI(null);
    setActiveRamJ(null);
  };

  const getSimStepDescription = () => {
    if (loopType === 'for') {
      switch (simStep) {
        case 1:
          return {
            title: 'Langkah 1: Outer Hexagon Inisialisasi (i = 1 TO M)',
            desc: 'Pencacah luar i diinisialisasi ke 1. Alur melangkah turun menuju Inner Loop.',
            badge: 'Outer: i = 1'
          };
        case 2:
          return {
            title: 'Langkah 2: Inner Hexagon Inisialisasi (j = 1 TO N)',
            desc: 'Pencacah dalam j diinisialisasi dari 1. Alur masuk ke tubuh terdalam.',
            badge: 'Inner: j = 1'
          };
        case 3:
          return {
            title: 'Langkah 3: Eksekusi output(i, j)',
            desc: 'Instruksi output(i, j) mencetak koordinat sel (1, 1) ke layar tanpa ganti baris.',
            badge: 'Aksi: output(1, 1)'
          };
        case 4:
          return {
            title: 'Langkah 4: Loopback Inner (Next j)',
            desc: 'Aliran berputar di lingkaran dalam: j bertambah 1 dan mencetak (1, 2), (1, 3), (1, 4) hingga kolom tuntas.',
            badge: 'Next j (Kolom)'
          };
        case 5:
          return {
            title: 'Langkah 5: Inner Selesai -> Ganti Baris -> Next i',
            desc: 'Setelah j tuntas, alur keluar ke output(newline) lalu memutar kembali ke Outer Loop (Next i) untuk baris berikutnya.',
            badge: 'Pindah Baris & Next i'
          };
        case 6:
          return {
            title: 'Langkah 6: Seluruh Baris Tuntas (Terminasi Selesai)',
            desc: 'Saat i melampaui M, outer loop selesai. Alur melompat ke terminator SELESAI.',
            badge: 'Terminasi Selesai'
          };
        default:
          return {
            title: 'Mode Standby / Diagram ANSI FOR Bersarang',
            desc: 'Klik "Animasi Alur" di atas untuk mensimulasikan perputaran bertingkat outer-inner loop.',
            badge: 'Standby'
          };
      }
    } else {
      switch (simStep) {
        case 1:
          return {
            title: 'Langkah 1: Inisialisasi i = 1 & Evaluasi i <= M?',
            desc: 'Variabel luar i = 1. Kondisi 1 <= 3 bernilai TRUE. Alur turun menuju persiapan inner loop.',
            badge: 'Outer: i = 1 (TRUE)'
          };
        case 2:
          return {
            title: 'Langkah 2: RESET Inner Counter (j = 1) & Evaluasi j <= N?',
            desc: 'KRUSIAL: j di-reset ke 1 pada setiap baris baru. Kondisi 1 <= 4 bernilai TRUE.',
            badge: 'Reset Inner: j = 1 (TRUE)'
          };
        case 3:
          return {
            title: 'Langkah 3: Eksekusi output(i, j)',
            desc: 'Mencetak pasangan koordinat baris dan kolom (1, 1) ke konsol layar.',
            badge: 'Aksi: output(1, 1)'
          };
        case 4:
          return {
            title: 'Langkah 4: Increment j = j + 1 & Loopback ke j <= N?',
            desc: 'Nilai j bertambah 1 secara manual. Alur berputar kembali menguji kondisi kolom j <= N?',
            badge: 'Inner Step: j = j + 1'
          };
        case 5:
          return {
            title: 'Langkah 5: Inner False -> Ganti Baris -> i = i + 1',
            desc: 'Saat j > 4 (False), kursor pindah baris, i bertambah 1 (i = 2), dan berputar kembali ke i <= M?',
            badge: 'Pindah Baris & i = i + 1'
          };
        case 6:
          return {
            title: 'Langkah 6: Outer False (i > M) -> Terminasi SELESAI',
            desc: 'Saat i = 4 (False), perulangan terluar berhenti. Alur menuju SELESAI.',
            badge: 'Terminasi Selesai'
          };
        default:
          return {
            title: 'Mode Standby / Diagram ANSI WHILE Bersarang',
            desc: 'Klik "Animasi Alur" untuk mensimulasikan mekanisme reset counter inner loop pada while bertingkat.',
            badge: 'Standby'
          };
      }
    }
  };

  const simInfo = getSimStepDescription();

  return (
    <div className="w-full my-8 space-y-6">
      
      {/* ── 1. HEADER MATRIKS DENGAN TOOLBAR KONTROL ────────────────────────── */}
      <div className="p-4 md:p-6 rounded-2xl bg-card border border-border/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <Layers className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                Pilar Standar Akademis (Aturan 38 &amp; 39)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                Dual Mode: FOR &amp; WHILE
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-slate-100">
              Komparasi 4 Representasi Baku Perulangan Bersarang (Nested Loop)
            </h3>
          </div>
        </div>

        {/* Toolbar: Toggle Struktur (FOR vs WHILE), Toggle Mode, & Simulator */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Switcher Struktur: FOR Bersarang vs WHILE Bersarang */}
          <div className="flex items-center p-1 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs font-bold">
            <button
              onClick={() => {
                setLoopType('for');
                setSimStep(0);
                setIsSimPlaying(false);
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                loopType === 'for'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-purple-700 dark:text-purple-300 hover:bg-purple-500/20'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>FOR Bersarang</span>
            </button>
            <button
              onClick={() => {
                setLoopType('while');
                setSimStep(0);
                setIsSimPlaying(false);
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                loopType === 'while'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-purple-700 dark:text-purple-300 hover:bg-purple-500/20'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>WHILE Bersarang</span>
            </button>
          </div>

          {/* Toggle View Mode: Matriks vs Tab Fokus */}
          <div className="flex items-center p-1 rounded-xl bg-secondary/60 border border-border/70 text-xs font-semibold">
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-background text-purple-700 dark:text-purple-300 shadow-xs font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Tampilkan 4 Representasi Bersanding 2 Kolom"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Matriks 2 Kolom</span>
            </button>
            <button
              onClick={() => setViewMode('focus')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'focus'
                  ? 'bg-background text-purple-700 dark:text-purple-300 shadow-xs font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Perbesar 1 Representasi Tertentu"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Fokus Terpisah</span>
            </button>
          </div>

          {/* Tombol Animasi Simulasi Flowchart */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                if (isSimPlaying) {
                  setIsSimPlaying(false);
                } else {
                  if (simStep === 0) setSimStep(1);
                  setIsSimPlaying(true);
                }
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isSimPlaying
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs animate-pulse'
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs'
              }`}
              title="Simulasikan Alur Bertingkat Outer-Inner Loop"
            >
              {isSimPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isSimPlaying ? 'Jeda' : 'Animasi Alur'}</span>
            </button>
            <button
              onClick={() => {
                setIsSimPlaying(false);
                setSimStep(0);
              }}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-secondary transition-colors cursor-pointer"
              title="Reset ke Tampilan Baku"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. MODE MATRIKS 2 KOLOM ────────────────────────────────────────── */}
      {viewMode === 'matrix' && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"
        >
          {/* ── BARIS 1, KOLOM 1: 📝 1. ALGORITMA NARATIF ──────────────────────── */}
          <div className="rounded-2xl border border-border/80 dark:border-slate-800 bg-card dark:bg-slate-950/90 p-5 flex flex-col justify-between shadow-xs space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border/60 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm">1. Algoritma Naratif ({loopType.toUpperCase()})</span>
                </div>
                <button
                  onClick={() => {
                    setViewMode('focus');
                    setFocusTab('naratif');
                  }}
                  className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
                  title="Buka dalam Tab Fokus Layar Penuh"
                >
                  <span>Fokus</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Isi Naratif Sesuai loopType */}
              {loopType === 'for' ? (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 font-mono text-xs sm:text-[13px] leading-relaxed space-y-2 select-text">
                  <p className="text-slate-700 dark:text-slate-300">
                    1. Inisialisasi batas baris M dan batas kolom N.
                  </p>
                  <p className="font-bold text-purple-700 dark:text-purple-400">
                    2. Untuk setiap baris i dari 1 sampai M lakukan:
                  </p>
                  <div className="pl-5 border-l-2 border-purple-500/50 ml-2 space-y-1.5 py-1">
                    <p className="font-semibold text-sky-700 dark:text-sky-400">
                      a. Untuk setiap kolom j dari 1 sampai N lakukan:
                    </p>
                    <div className="pl-5 border-l-2 border-sky-500/50 ml-2 py-0.5 text-slate-700 dark:text-slate-300">
                      i. Tampilkan nilai (i, j) ke layar tanpa ganti baris.
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 pt-1">
                      b. Pindah ke baris baru (output newline).
                    </p>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    3. Tampilkan pesan selesai mencetak grid.
                  </p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 pt-1">
                    Selesai.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 font-mono text-xs sm:text-[13px] leading-relaxed space-y-2 select-text">
                  <p className="text-slate-700 dark:text-slate-300">
                    1. Inisialisasi batas baris M dan batas kolom N.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300">
                    2. Inisialisasi penghitung baris luar i = 1.
                  </p>
                  <p className="font-bold text-purple-700 dark:text-purple-400">
                    3. Selama i &lt;= M lakukan:
                  </p>
                  <div className="pl-5 border-l-2 border-purple-500/50 ml-2 space-y-1.5 py-1">
                    <p className="font-semibold text-sky-700 dark:text-sky-400">
                      a. Inisialisasi penghitung kolom dalam j = 1 (reset counter).
                    </p>
                    <p className="font-semibold text-sky-700 dark:text-sky-400">
                      b. Selama j &lt;= N lakukan:
                    </p>
                    <div className="pl-5 border-l-2 border-sky-500/50 ml-2 py-0.5 text-slate-700 dark:text-slate-300 space-y-1">
                      <div>i. Tampilkan nilai (i, j) ke layar tanpa ganti baris.</div>
                      <div>ii. Tambahkan j dengan 1 (j = j + 1).</div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 pt-1">
                      c. Pindah ke baris baru (output newline).
                    </p>
                    <p className="text-slate-700 dark:text-slate-300">
                      d. Tambahkan i dengan 1 (i = i + 1).
                    </p>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    4. Tampilkan pesan selesai mencetak grid.
                  </p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 pt-1">
                    Selesai.
                  </p>
                </div>
              )}

              {/* Kaidah Baku Naratif */}
              <div className="p-3.5 rounded-xl bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/20 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-purple-700 dark:text-purple-300">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Kaidah Baku Naratif {loopType === 'for' ? 'FOR Bersarang' : 'WHILE Bersarang'}:</span>
                </div>
                <ul className="space-y-1.5 pl-4 list-disc text-slate-600 dark:text-slate-400 leading-relaxed text-[11.5px]">
                  {loopType === 'for' ? (
                    <>
                      <li>Outer loop memakai nomor utama: <em>&quot;2. Untuk setiap baris i dari 1 sampai M lakukan:&quot;</em>.</li>
                      <li>Inner loop memakai sub-nomor menjorok: <em>&quot;a. Untuk setiap kolom j...&quot;</em>.</li>
                      <li>Perintah ganti baris (newline) berada di level outer loop (sub-nomor <em>b</em>), tepat setelah inner loop selesai.</li>
                      <li>Terminal akhir <code>Selesai.</code> wajib tanpa nomor urut.</li>
                    </>
                  ) : (
                    <>
                      <li><strong>Reset Inner Counter (Langkah 3a)</strong>: Inisialisasi <code>j = 1</code> WAJIB di dalam badan outer loop agar setiap baris baru dimulai kembali dari kolom 1.</li>
                      <li><strong>Update Manual</strong>: Perintah <code>j = j + 1</code> dan <code>i = i + 1</code> wajib ditulis eksplisit agar tidak terjadi *infinite loop*.</li>
                      <li>Terminal akhir <code>Selesai.</code> wajib tanpa nomor urut.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-border/40 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
              <span>Model: Hierarchical Block</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold">✓ Sesuai Konvensi</span>
            </div>
          </div>

          {/* ── BARIS 1, KOLOM 2: 🔷 2. FLOWCHART ANSI / ISO ───────────────────── */}
          <div className="rounded-2xl border-2 border-purple-500/40 bg-card dark:bg-slate-950 p-5 flex flex-col justify-between shadow-xs space-y-4 relative overflow-hidden">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-border/60 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm">2. Flowchart ANSI / ISO ({loopType.toUpperCase()})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                    {loopType === 'for' ? 'Dual Preparation Hexagon' : 'Dual Decision Diamond'}
                  </span>
                  <button
                    onClick={() => {
                      setViewMode('focus');
                      setFocusTab('flowchart');
                    }}
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
                    title="Buka dalam Tab Fokus Layar Penuh"
                  >
                    <span>Fokus</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Status Simulator Aktif */}
              <div className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-border/70 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isSimPlaying ? 'bg-amber-400 animate-ping' : 'bg-purple-500'}`} />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{simInfo.title}</span>
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                  {simInfo.badge}
                </span>
              </div>

              {/* SVG Diagram Alir Sesuai loopType */}
              <div className="flex items-center justify-center py-2 bg-slate-50/60 dark:bg-slate-900/40 rounded-xl border border-border/60">
                {loopType === 'for' ? (
                  /* ── SVG FOR Bersarang (Preparation Hexagon) ── */
                  <svg
                    viewBox="0 0 380 340"
                    className="w-full max-w-[340px] h-auto overflow-visible select-none"
                    textRendering="geometricPrecision"
                  >
                    <defs>
                      <marker id="m10-arrow-slate" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" className="dark:fill-slate-400" />
                      </marker>
                      <marker id="m10-arrow-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#7c3aed" className="dark:fill-purple-400" />
                      </marker>
                      <marker id="m10-arrow-sky" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7" className="dark:fill-sky-400" />
                      </marker>
                      <marker id="m10-arrow-rose" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#e11d48" className="dark:fill-rose-400" />
                      </marker>
                    </defs>

                    {/* Terminator MULAI */}
                    <rect x="140" y="6" width="100" height="24" rx="12" fill="#064e3b" stroke="#10b981" strokeWidth="2" className="dark:fill-emerald-950/90" />
                    <text x="190" y="22" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#6ee7b7" fontFamily="monospace" letterSpacing="1">MULAI</text>

                    <line x1="190" y1="30" x2="190" y2="48" stroke="#475569" className="dark:stroke-slate-400" strokeWidth="2" markerEnd="url(#m10-arrow-slate)" />

                    {/* Outer Hexagon: i = 1 TO M */}
                    <polygon
                      points="120,50 260,50 280,68 260,86 120,86 100,68"
                      fill={simStep === 1 ? '#581c87' : '#f5f3ff'}
                      stroke={simStep === 1 ? '#fbbf24' : '#7c3aed'}
                      strokeWidth={simStep === 1 ? '3.5' : '2.5'}
                      className={simStep === 1 ? 'transition-all filter drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]' : 'dark:fill-purple-950/80 dark:stroke-purple-400 transition-all'}
                    />
                    <text x="190" y="72" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={simStep === 1 ? '#ffffff' : '#3b0764'} className={simStep === 1 ? 'fill-white' : 'dark:fill-purple-200'} fontFamily="monospace">
                      i = 1 TO M
                    </text>

                    {/* Panah Outer -> Inner */}
                    <text x="196" y="98" fontSize="8.5" fontWeight="bold" fill="#7c3aed" className="dark:fill-purple-300">✓ Baris i</text>
                    <line x1="190" y1="86" x2="190" y2="114" stroke={simStep >= 1 ? '#7c3aed' : '#475569'} className={simStep >= 1 ? 'dark:stroke-purple-400' : 'dark:stroke-slate-400'} strokeWidth="2.5" markerEnd="url(#m10-arrow-purple)" />

                    {/* Inner Hexagon: j = 1 TO N */}
                    <polygon
                      points="120,116 260,116 280,134 260,152 120,152 100,134"
                      fill={simStep === 2 ? '#0369a1' : '#f0f9ff'}
                      stroke={simStep === 2 ? '#38bdf8' : '#0284c7'}
                      strokeWidth={simStep === 2 ? '3.5' : '2.5'}
                      className={simStep === 2 ? 'transition-all filter drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]' : 'dark:fill-sky-950/80 dark:stroke-sky-400 transition-all'}
                    />
                    <text x="190" y="138" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={simStep === 2 ? '#ffffff' : '#082f49'} className={simStep === 2 ? 'fill-white' : 'dark:fill-sky-200'} fontFamily="monospace">
                      j = 1 TO N
                    </text>

                    {/* Panah Inner -> Output */}
                    <text x="196" y="164" fontSize="8.5" fontWeight="bold" fill="#0284c7" className="dark:fill-sky-300">✓ Kolom j</text>
                    <line x1="190" y1="152" x2="190" y2="180" stroke={simStep >= 2 ? '#0284c7' : '#475569'} className={simStep >= 2 ? 'dark:stroke-sky-400' : 'dark:stroke-slate-400'} strokeWidth="2.5" markerEnd="url(#m10-arrow-sky)" />

                    {/* Parallelogram Output: output(i, j) */}
                    <polygon
                      points="125,182 275,182 255,212 105,212"
                      fill={simStep === 3 ? '#064e3b' : '#ecfdf5'}
                      stroke={simStep === 3 ? '#34d399' : '#059669'}
                      strokeWidth={simStep === 3 ? '3.5' : '2'}
                      className={simStep === 3 ? 'transition-all filter drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]' : 'dark:fill-emerald-950/80 dark:stroke-emerald-400 transition-all'}
                    />
                    <text x="190" y="201" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill={simStep === 3 ? '#ffffff' : '#064e3b'} className={simStep === 3 ? 'fill-white' : 'dark:fill-emerald-200'} fontFamily="monospace">
                      output(i, j)
                    </text>

                    {/* Loopback Inner (Next j) */}
                    <path
                      d="M 105 197 L 70 197 L 70 134 L 98 134"
                      fill="none"
                      stroke={simStep === 4 ? '#0284c7' : '#cbd5e1'}
                      className={simStep === 4 ? 'dark:stroke-sky-400' : 'dark:stroke-slate-700'}
                      strokeWidth={simStep === 4 ? '3' : '1.5'}
                      strokeDasharray={simStep === 4 ? '4 2' : 'none'}
                      markerEnd="url(#m10-arrow-sky)"
                    />
                    <text x="40" y="170" fontSize="8" fontWeight="bold" fill="#0284c7" className="dark:fill-sky-300" textAnchor="middle">Next j</text>

                    {/* Panah Selesai j -> Output Newline */}
                    <path
                      d="M 280 134 L 305 134 L 305 235 L 262 235"
                      fill="none"
                      stroke={simStep >= 5 ? '#7c3aed' : '#cbd5e1'}
                      className={simStep >= 5 ? 'dark:stroke-purple-400' : 'dark:stroke-slate-700'}
                      strokeWidth={simStep >= 5 ? '2.5' : '1.5'}
                      markerEnd="url(#m10-arrow-purple)"
                    />
                    <text x="325" y="185" fontSize="8" fontWeight="bold" fill="#7c3aed" className="dark:fill-purple-300" textAnchor="middle">Selesai j</text>

                    {/* Parallelogram Output: output_newline() */}
                    <polygon
                      points="140,222 260,222 245,248 125,248"
                      fill={simStep === 5 ? '#581c87' : '#f5f3ff'}
                      stroke={simStep === 5 ? '#c084fc' : '#7c3aed'}
                      strokeWidth={simStep === 5 ? '3' : '2'}
                      className="dark:fill-purple-950/80 dark:stroke-purple-400"
                    />
                    <text x="185" y="239" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill={simStep === 5 ? '#ffffff' : '#4c1d95'} className={simStep === 5 ? 'fill-white' : 'dark:fill-purple-200'} fontFamily="monospace">
                      output_newline()
                    </text>

                    {/* Loopback Outer (Next i) */}
                    <path
                      d="M 125 235 L 25 235 L 25 68 L 98 68"
                      fill="none"
                      stroke={simStep === 5 ? '#7c3aed' : '#cbd5e1'}
                      className={simStep === 5 ? 'dark:stroke-purple-400' : 'dark:stroke-slate-700'}
                      strokeWidth={simStep === 5 ? '3' : '1.5'}
                      strokeDasharray={simStep === 5 ? '4 2' : 'none'}
                      markerEnd="url(#m10-arrow-purple)"
                    />
                    <text x="15" y="150" fontSize="8" fontWeight="bold" fill="#7c3aed" className="dark:fill-purple-300" textAnchor="middle">Next i</text>

                    {/* Panah Selesai i -> SELESAI */}
                    <path
                      d="M 280 68 L 350 68 L 350 285 L 242 285"
                      fill="none"
                      stroke={simStep === 6 ? '#e11d48' : '#cbd5e1'}
                      className={simStep === 6 ? 'dark:stroke-rose-400' : 'dark:stroke-slate-700'}
                      strokeWidth={simStep === 6 ? '3' : '1.5'}
                      markerEnd="url(#m10-arrow-rose)"
                    />
                    <text x="350" y="55" fontSize="8" fontWeight="bold" fill="#e11d48" className="dark:fill-rose-400" textAnchor="middle">Selesai i</text>

                    {/* Terminator SELESAI */}
                    <rect x="140" y="273" width="100" height="24" rx="12" fill={simStep === 6 ? '#881337' : '#4c0519'} stroke={simStep === 6 ? '#f43f5e' : '#e11d48'} strokeWidth="2" className="dark:fill-rose-950/90" />
                    <text x="190" y="289" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#fecdd3" fontFamily="monospace" letterSpacing="1">SELESAI</text>
                  </svg>
                ) : (
                  /* ── SVG WHILE Bersarang (Decision Diamond + Reset j) ── */
                  <svg
                    viewBox="0 0 380 370"
                    className="w-full max-w-[340px] h-auto overflow-visible select-none"
                    textRendering="geometricPrecision"
                  >
                    <defs>
                      <marker id="m10w-arrow-slate" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" className="dark:fill-slate-400" />
                      </marker>
                      <marker id="m10w-arrow-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#7c3aed" className="dark:fill-purple-400" />
                      </marker>
                      <marker id="m10w-arrow-sky" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7" className="dark:fill-sky-400" />
                      </marker>
                      <marker id="m10w-arrow-rose" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#e11d48" className="dark:fill-rose-400" />
                      </marker>
                    </defs>

                    {/* Terminator MULAI */}
                    <rect x="140" y="4" width="100" height="22" rx="11" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="190" y="19" textAnchor="middle" fontSize="10" fontWeight="900" fill="#6ee7b7" fontFamily="monospace">MULAI</text>

                    {/* Proses Inisialisasi: i = 1 */}
                    <line x1="190" y1="26" x2="190" y2="38" stroke="#475569" strokeWidth="2" markerEnd="url(#m10w-arrow-slate)" />
                    <rect x="150" y="40" width="80" height="20" rx="4" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" className="dark:fill-purple-950/80" />
                    <text x="190" y="54" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#4c1d95" className="dark:fill-purple-200" fontFamily="monospace">i = 1</text>

                    {/* Outer Decision Diamond: i <= M? */}
                    <line x1="190" y1="60" x2="190" y2="76" stroke="#475569" strokeWidth="2" markerEnd="url(#m10w-arrow-slate)" />
                    <polygon
                      points="190,78 250,98 190,118 130,98"
                      fill="#451a03"
                      stroke={simStep === 1 ? '#38bdf8' : '#f59e0b'}
                      strokeWidth={simStep === 1 ? '3' : '2'}
                      className="filter drop-shadow-xs"
                    />
                    <text x="190" y="102" textAnchor="middle" fontSize="10" fontWeight="900" fill="#fde68a" fontFamily="monospace">
                      i &lt;= M?
                    </text>

                    {/* Reset Inner Counter (PROSES): j = 1 */}
                    <text x="195" y="128" fontSize="8" fontWeight="bold" fill="#10b981">✓ True</text>
                    <line x1="190" y1="118" x2="190" y2="136" stroke="#10b981" strokeWidth="2" markerEnd="url(#m10w-arrow-slate)" />
                    <rect
                      x="145"
                      y="138"
                      width="90"
                      height="22"
                      rx="4"
                      fill={simStep === 2 ? '#0284c7' : '#e0f2fe'}
                      stroke="#0284c7"
                      strokeWidth={simStep === 2 ? '2.5' : '1.5'}
                      className="dark:fill-sky-950/80"
                    />
                    <text x="190" y="153" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill={simStep === 2 ? '#ffffff' : '#0369a1'} className={simStep === 2 ? 'fill-white' : 'dark:fill-sky-200'} fontFamily="monospace">
                      j = 1 (Reset)
                    </text>

                    {/* Inner Decision Diamond: j <= N? */}
                    <line x1="190" y1="160" x2="190" y2="176" stroke="#475569" strokeWidth="2" markerEnd="url(#m10w-arrow-slate)" />
                    <polygon
                      points="190,178 250,198 190,218 130,198"
                      fill="#451a03"
                      stroke={simStep === 2 ? '#38bdf8' : '#f59e0b'}
                      strokeWidth={simStep === 2 ? '3' : '2'}
                      className="filter drop-shadow-xs"
                    />
                    <text x="190" y="202" textAnchor="middle" fontSize="10" fontWeight="900" fill="#fde68a" fontFamily="monospace">
                      j &lt;= N?
                    </text>

                    {/* Output (i, j) & Increment j */}
                    <text x="195" y="228" fontSize="8" fontWeight="bold" fill="#10b981">✓ True</text>
                    <line x1="190" y1="218" x2="190" y2="236" stroke="#10b981" strokeWidth="2" markerEnd="url(#m10w-arrow-slate)" />

                    <polygon points="135,238 255,238 240,260 120,260" fill={simStep === 3 ? '#064e3b' : '#ecfdf5'} stroke="#059669" strokeWidth="2" className="dark:fill-emerald-950/80" />
                    <text x="187" y="253" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill={simStep === 3 ? '#ffffff' : '#064e3b'} className={simStep === 3 ? 'fill-white' : 'dark:fill-emerald-200'} fontFamily="monospace">
                      output(i, j)
                    </text>

                    <line x1="187" y1="260" x2="187" y2="272" stroke="#475569" strokeWidth="1.5" markerEnd="url(#m10w-arrow-slate)" />
                    <rect x="150" y="274" width="75" height="18" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" className="dark:fill-sky-950/80" />
                    <text x="187" y="287" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369a1" className="dark:fill-sky-200" fontFamily="monospace">j = j + 1</text>

                    {/* Loopback Inner: j = j + 1 -> di atas j <= N? */}
                    <path d="M 150 283 L 105 283 L 105 170 L 188 170" fill="none" stroke={simStep === 4 ? '#0284c7' : '#94a3b8'} strokeWidth={simStep === 4 ? '2.5' : '1.5'} strokeDasharray={simStep === 4 ? '4 2' : 'none'} markerEnd="url(#m10w-arrow-sky)" />
                    <text x="90" y="220" fontSize="7.5" fontWeight="bold" fill="#0284c7">Loop j</text>

                    {/* Inner False: output(newline) & i = i + 1 */}
                    <path d="M 250 198 L 290 198 L 290 280 L 260 280" fill="none" stroke="#e11d48" strokeWidth="1.5" markerEnd="url(#m10w-arrow-slate)" />
                    <text x="268" y="192" fontSize="7.5" fontWeight="bold" fill="#e11d48">✗ False</text>

                    <rect x="235" y="272" width="50" height="16" rx="3" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" className="dark:fill-purple-950/80" />
                    <text x="260" y="283" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#581c87" className="dark:fill-purple-200" fontFamily="monospace">i = i + 1</text>

                    {/* Loopback Outer: i = i + 1 -> di atas i <= M? */}
                    <path d="M 260 288 L 260 305 L 50 305 L 50 70 L 188 70" fill="none" stroke={simStep === 5 ? '#7c3aed' : '#94a3b8'} strokeWidth={simStep === 5 ? '2.5' : '1.5'} strokeDasharray={simStep === 5 ? '4 2' : 'none'} markerEnd="url(#m10w-arrow-purple)" />
                    <text x="40" y="180" fontSize="7.5" fontWeight="bold" fill="#7c3aed">Loop i</text>

                    {/* Outer False: i <= M? False -> SELESAI */}
                    <path d="M 250 98 L 330 98 L 330 330 L 235 330" fill="none" stroke="#e11d48" strokeWidth="2" markerEnd="url(#m10w-arrow-rose)" />
                    <text x="280" y="92" fontSize="8" fontWeight="bold" fill="#e11d48">✗ False (i &gt; M)</text>

                    {/* Terminator SELESAI */}
                    <rect x="140" y="320" width="90" height="22" rx="11" fill="#4c0519" stroke="#e11d48" strokeWidth="2" />
                    <text x="185" y="335" textAnchor="middle" fontSize="10" fontWeight="900" fill="#fecdd3" fontFamily="monospace">SELESAI</text>
                  </svg>
                )}
              </div>

              {/* Legend Singkat Flowchart */}
              <div className="pt-2 border-t border-border/40 text-[11px] text-muted-foreground flex items-center justify-between">
                <span>{loopType === 'for' ? 'Topologi: Dual Hexagon (For-For)' : 'Topologi: Dual Diamond + Reset'}</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">✓ ANSI / ISO Standard</span>
              </div>
            </div>
          </div>

          {/* ── BARIS 2, KOLOM 1: 📋 3. PSEUDOCODE CLRS ───────────────────────── */}
          <div className="rounded-2xl border border-border/80 dark:border-slate-800 bg-card dark:bg-slate-950/90 p-5 flex flex-col justify-between shadow-xs space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border/60 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm">3. Pseudocode Standar CLRS ({loopType.toUpperCase()})</span>
                </div>
                <button
                  onClick={() => {
                    setViewMode('focus');
                    setFocusTab('pseudocode');
                  }}
                  className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
                  title="Buka dalam Tab Fokus Layar Penuh"
                >
                  <span>Fokus</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Blok Pseudocode 3 Pilar Baku Sesuai loopType */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 font-mono text-xs leading-relaxed overflow-x-auto space-y-2 select-text">
                <div>
                  <span className="text-purple-700 dark:text-purple-400 font-bold">PROGRAM</span>{' '}
                  <span className="text-slate-900 dark:text-slate-100 font-bold">
                    {loopType === 'for' ? 'SimulasiForBersarang' : 'SimulasiWhileBersarang'}
                  </span>{' '}
                  <span className="text-slate-400 dark:text-slate-500 text-[11px]">
                    {loopType === 'for' ? '// Cetak grid koordinat M x N terhitung' : '// Cetak grid koordinat terkondisi'}
                  </span>
                </div>

                <div className="pt-1">
                  <div className="text-blue-700 dark:text-blue-400 font-bold">KAMUS:</div>
                  <div className="pl-4 text-slate-700 dark:text-slate-300 space-y-0.5">
                    <div>i, j : <span className="text-emerald-700 dark:text-emerald-400 font-bold">integer</span> <span className="text-slate-400 dark:text-slate-500 text-[11px]">// pencacah baris dan kolom</span></div>
                    <div>M, N : <span className="text-emerald-700 dark:text-emerald-400 font-bold">integer</span> <span className="text-slate-400 dark:text-slate-500 text-[11px]">// batas baris dan kolom</span></div>
                  </div>
                </div>

                <div className="pt-1">
                  <div className="text-amber-700 dark:text-amber-400 font-bold">ALGORITMA:</div>
                  <div className="pl-4 space-y-1 text-slate-800 dark:text-slate-200">
                    <div>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">input</span>(M, N)
                    </div>

                    {loopType === 'for' ? (
                      <>
                        <div>
                          <span className="text-purple-700 dark:text-purple-400 font-bold">for</span> i = 1{' '}
                          <span className="text-purple-700 dark:text-purple-400 font-bold">to</span> M{' '}
                          <span className="text-purple-700 dark:text-purple-400 font-bold">do</span>
                        </div>
                        <div className="pl-5 border-l-2 border-purple-500/40 ml-1 space-y-1">
                          <div>
                            <span className="text-sky-700 dark:text-sky-400 font-bold">for</span> j = 1{' '}
                            <span className="text-sky-700 dark:text-sky-400 font-bold">to</span> N{' '}
                            <span className="text-sky-700 dark:text-sky-400 font-bold">do</span>
                          </div>
                          <div className="pl-5 border-l-2 border-sky-500/40 ml-1">
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">output</span>(i, j)
                          </div>
                          <div>
                            <span className="text-sky-700 dark:text-sky-400 font-bold">endfor</span>
                          </div>
                          <div className="pt-0.5">
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">output_newline</span>()
                          </div>
                        </div>
                        <div>
                          <span className="text-purple-700 dark:text-purple-400 font-bold">endfor</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>i = 1</div>
                        <div>
                          <span className="text-purple-700 dark:text-purple-400 font-bold">while</span> i &lt;= M{' '}
                          <span className="text-purple-700 dark:text-purple-400 font-bold">do</span>
                        </div>
                        <div className="pl-5 border-l-2 border-purple-500/40 ml-1 space-y-1">
                          <div className="text-sky-600 dark:text-sky-300 font-semibold">
                            j = 1 <span className="text-slate-400 dark:text-slate-500 text-[10px]">// Reset j setiap baris baru</span>
                          </div>
                          <div>
                            <span className="text-sky-700 dark:text-sky-400 font-bold">while</span> j &lt;= N{' '}
                            <span className="text-sky-700 dark:text-sky-400 font-bold">do</span>
                          </div>
                          <div className="pl-5 border-l-2 border-sky-500/40 ml-1 space-y-1">
                            <div><span className="text-emerald-700 dark:text-emerald-400 font-bold">output</span>(i, j)</div>
                            <div>j = j + 1</div>
                          </div>
                          <div>
                            <span className="text-sky-700 dark:text-sky-400 font-bold">endwhile</span>
                          </div>
                          <div className="pt-0.5">
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">output_newline</span>()
                          </div>
                          <div>i = i + 1</div>
                        </div>
                        <div>
                          <span className="text-purple-700 dark:text-purple-400 font-bold">endwhile</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Kaidah Baku CLRS */}
              <div className="p-3.5 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Kaidah Baku Pseudocode CLRS:</span>
                </div>
                <ul className="space-y-1.5 pl-4 list-disc text-slate-600 dark:text-slate-400 leading-relaxed text-[11.5px]">
                  <li>Struktur 3 Blok Baku: <code>PROGRAM</code>, <code>KAMUS:</code>, dan <code>ALGORITMA:</code>.</li>
                  <li>
                    {loopType === 'for'
                      ? 'Pasangan for ditutup dengan endfor pada tingkat indentasi yang sejajar (+4 spasi / 1 tab).'
                      : 'Pasangan while ditutup dengan endwhile. Variabel j = 1 wajib diinisialisasi tepat di atas while j <= N do.'}
                  </li>
                  <li>Instruksi I/O universal berkurung: <code>output(i, j)</code> dan <code>output_newline()</code>. Dilarang kata kunci bahasa tertentu seperti <code>print</code>.</li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-border/40 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
              <span>Konvensi: CLRS Standard</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ 3 Blok Baku</span>
            </div>
          </div>

          {/* ── BARIS 2, KOLOM 2: 💻 4. KODE DWIBAHASA (PYTHON & JAVASCRIPT) ─────── */}
          <div className="rounded-2xl border border-border/80 dark:border-slate-800 bg-card dark:bg-slate-950/90 p-5 flex flex-col justify-between shadow-xs space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border/60 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-sm">4. Kode Dwibahasa &amp; Konsol ({loopType.toUpperCase()})</span>
                </div>
                {/* Switcher Bahasa: Python vs JavaScript */}
                <div className="flex items-center p-0.5 rounded-lg bg-secondary/80 border border-border text-[11px]">
                  <button
                    onClick={() => setActiveLang('python')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                      activeLang === 'python'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Python
                  </button>
                  <button
                    onClick={() => setActiveLang('javascript')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                      activeLang === 'javascript'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    JavaScript
                  </button>
                </div>
              </div>

              {/* Editor Kode Readonly */}
              <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-200 border border-slate-800 leading-relaxed overflow-x-auto shadow-inner select-text">
                <pre>
                  <code>
                    {loopType === 'for' ? (
                      activeLang === 'python' ? (
`# FOR Bersarang: Batas M dan N terhitung
M = 3
N = 4

for i in range(1, M + 1):       # Outer Loop: baris 1..3
    for j in range(1, N + 1):   # Inner Loop: kolom 1..4
        print(f"({i},{j})", end=" ")
    print()  # Pindah baris setelah kolom tuntas`
                      ) : (
`// FOR Bersarang: Batas M dan N terhitung
const M = 3;
const N = 4;

for (let i = 1; i <= M; i++) {       // Outer Loop: baris 1..3
    let baris = "";
    for (let j = 1; j <= N; j++) {   // Inner Loop: kolom 1..4
        baris += \`(\${i},\${j}) \`;
    }
    console.log(baris);              // Pindah baris
}`
                      )
                    ) : (
                      activeLang === 'python' ? (
`# WHILE Bersarang: Reset j = 1 WAJIB di dalam outer loop!
M = 3
N = 4

i = 1
while i <= M:
    j = 1              # Reset counter kolom setiap baris baru!
    while j <= N:
        print(f"({i},{j})", end=" ")
        j += 1         # Increment inner manual
    print()            # Pindah baris
    i += 1             # Increment outer manual`
                      ) : (
`// WHILE Bersarang: Reset j = 1 WAJIB di dalam outer loop!
const M = 3;
const N = 4;

let i = 1;
while (i <= M) {
    let j = 1;         // Reset counter kolom setiap baris baru!
    let baris = "";
    while (j <= N) {
        baris += \`(\${i},\${j}) \`;
        j++;           // Increment inner manual
    }
    console.log(baris);
    i++;               // Increment outer manual
}`
                      )
                    )}
                  </code>
                </pre>
              </div>

              {/* Konsol Simulasi Eksekusi & State RAM */}
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-border/70 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-mono font-bold text-slate-800 dark:text-slate-200">
                    <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Konsol Layar &amp; State RAM (Live)</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={runCodeSimulation}
                      disabled={isCodeRunning}
                      className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                        isCodeRunning
                          ? 'bg-amber-500 text-white animate-pulse'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>{isCodeRunning ? 'Memproses...' : 'Jalankan'}</span>
                    </button>
                    {codeConsoleOutput.length > 0 && (
                      <button
                        onClick={resetCodeSimulation}
                        className="p-1 rounded-md text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                        title="Bersihkan"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* State RAM Live */}
                <div className="p-2 rounded-lg bg-card border border-border/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-muted-foreground text-[11px]">Memori Variabel:</span>
                  <div className="flex items-center gap-3">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">
                      i = {activeRamI !== null ? activeRamI : '-'}
                    </span>
                    <span className="text-sky-600 dark:text-sky-400 font-bold">
                      j = {activeRamJ !== null ? activeRamJ : '-'}
                    </span>
                    <span className="text-muted-foreground text-[10px]">
                      (Langkah {activeRamI !== null && activeRamJ !== null ? (activeRamI - 1) * 4 + activeRamJ : 0}/12)
                    </span>
                  </div>
                </div>

                {/* Output Konsol */}
                <div className="min-h-[75px] p-2.5 rounded-lg bg-slate-950 font-mono text-xs text-emerald-400 space-y-0.5 overflow-x-auto shadow-inner">
                  {codeConsoleOutput.length > 0 ? (
                    codeConsoleOutput.map((row, idx) => (
                      <div key={idx} className="leading-snug">{row}</div>
                    ))
                  ) : (
                    <div className="text-slate-500 italic py-2 text-center text-[11px]">
                      Klik tombol &quot;Jalankan&quot; untuk melihat simulasi cetak grid koordinat.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border/40 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
              <span>Bahasa: {activeLang === 'python' ? 'Python 3' : 'JavaScript ES6'}</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">✓ Dual Output Format</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── 3. MODE TAB FOKUS (JIKA MAHASISWA INGIN FOKUS SATU PILAR) ───────────── */}
      {viewMode === 'focus' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="p-6 rounded-2xl bg-card border border-border shadow-md space-y-6"
        >
          {/* Navigation Bar Antar Tab Fokus */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase">Fokus Pilar:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'naratif', label: '1. Naratif', icon: FileText, color: 'text-purple-600' },
                  { id: 'flowchart', label: '2. Flowchart', icon: GitBranch, color: 'text-sky-600' },
                  { id: 'pseudocode', label: '3. Pseudocode', icon: Sparkles, color: 'text-emerald-600' },
                  { id: 'kode', label: '4. Kode Dwibahasa', icon: Code2, color: 'text-amber-600' },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = focusTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setFocusTab(tab.id as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-secondary/70 text-slate-700 dark:text-slate-300 hover:bg-secondary'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setViewMode('matrix')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-secondary hover:bg-secondary/80 text-foreground flex items-center gap-1.5 cursor-pointer"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Kembali ke Matriks 2 Kolom</span>
            </button>
          </div>

          {/* Konten Tab Fokus Sesuai Pilihan */}
          {focusTab === 'naratif' && (
            <div className="space-y-4 max-w-2xl mx-auto py-4">
              <h4 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span>Format Baku Algoritma Naratif ({loopType.toUpperCase()})</span>
              </h4>
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-border font-mono text-sm leading-relaxed space-y-3">
                {loopType === 'for' ? (
                  <>
                    <p className="text-slate-700 dark:text-slate-300">1. Inisialisasi batas baris M dan batas kolom N.</p>
                    <p className="font-bold text-purple-700 dark:text-purple-400">2. Untuk setiap baris i dari 1 sampai M lakukan:</p>
                    <div className="pl-6 border-l-2 border-purple-500/50 ml-2 space-y-2 py-1">
                      <p className="font-semibold text-sky-700 dark:text-sky-400">a. Untuk setiap kolom j dari 1 sampai N lakukan:</p>
                      <div className="pl-6 border-l-2 border-sky-500/50 ml-2 py-1 text-slate-700 dark:text-slate-300">
                        i. Tampilkan nilai (i, j) ke layar tanpa ganti baris.
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 pt-1">b. Pindah ke baris baru (output newline).</p>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">3. Tampilkan pesan selesai.</p>
                    <p className="font-bold text-slate-800 dark:text-slate-200 pt-2">Selesai.</p>
                  </>
                ) : (
                  <>
                    <p className="text-slate-700 dark:text-slate-300">1. Inisialisasi batas baris M dan batas kolom N.</p>
                    <p className="text-slate-700 dark:text-slate-300">2. Inisialisasi penghitung baris luar i = 1.</p>
                    <p className="font-bold text-purple-700 dark:text-purple-400">3. Selama i &lt;= M lakukan:</p>
                    <div className="pl-6 border-l-2 border-purple-500/50 ml-2 space-y-2 py-1">
                      <p className="font-semibold text-sky-700 dark:text-sky-400">a. Inisialisasi penghitung kolom dalam j = 1 (reset counter).</p>
                      <p className="font-semibold text-sky-700 dark:text-sky-400">b. Selama j &lt;= N lakukan:</p>
                      <div className="pl-6 border-l-2 border-sky-500/50 ml-2 py-1 text-slate-700 dark:text-slate-300 space-y-1">
                        <div>i. Tampilkan nilai (i, j) ke layar tanpa ganti baris.</div>
                        <div>ii. Tambahkan j dengan 1 (j = j + 1).</div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 pt-1">c. Pindah ke baris baru (output newline).</p>
                      <p className="text-slate-700 dark:text-slate-300">d. Tambahkan i dengan 1 (i = i + 1).</p>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">4. Tampilkan pesan selesai.</p>
                    <p className="font-bold text-slate-800 dark:text-slate-200 pt-2">Selesai.</p>
                  </>
                )}
              </div>
            </div>
          )}

          {focusTab === 'flowchart' && (
            <div className="space-y-4 max-w-xl mx-auto py-4 flex flex-col items-center">
              <h4 className="text-lg font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                <span>Diagram Alir ANSI/ISO: Topologi {loopType === 'for' ? 'Dual Preparation Hexagon' : 'Dual Decision Diamond'}</span>
              </h4>
              <p className="text-xs text-center text-muted-foreground max-w-md">
                Perhatikan jalur loopback dalam (Next j) dan luar (Next i) yang melingkar secara independen tanpa tubrukan garis.
              </p>
            </div>
          )}

          {focusTab === 'pseudocode' && (
            <div className="space-y-4 max-w-2xl mx-auto py-4">
              <h4 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span>Format Baku Pseudocode CLRS 3 Blok ({loopType.toUpperCase()})</span>
              </h4>
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-border font-mono text-sm leading-relaxed space-y-3">
                <div className="font-bold text-purple-700 dark:text-purple-400">
                  PROGRAM {loopType === 'for' ? 'SimulasiForBersarang' : 'SimulasiWhileBersarang'}
                </div>
                <div>
                  <div className="text-blue-700 dark:text-blue-400 font-bold">KAMUS:</div>
                  <div className="pl-4 text-slate-600 dark:text-slate-300">
                    i, j, M, N : <span className="text-emerald-700 dark:text-emerald-400 font-bold">integer</span>
                  </div>
                </div>
                <div>
                  <div className="text-amber-700 dark:text-amber-400 font-bold">ALGORITMA:</div>
                  <div className="pl-4 space-y-1">
                    <div>input(M, N)</div>
                    {loopType === 'for' ? (
                      <>
                        <div>for i = 1 to M do</div>
                        <div className="pl-6 border-l-2 border-purple-500/40 ml-1 space-y-1">
                          <div>for j = 1 to N do</div>
                          <div className="pl-6 border-l-2 border-sky-500/40 ml-1">output(i, j)</div>
                          <div>endfor</div>
                          <div>output_newline()</div>
                        </div>
                        <div>endfor</div>
                      </>
                    ) : (
                      <>
                        <div>i = 1</div>
                        <div>while i &lt;= M do</div>
                        <div className="pl-6 border-l-2 border-purple-500/40 ml-1 space-y-1">
                          <div>j = 1</div>
                          <div>while j &lt;= N do</div>
                          <div className="pl-6 border-l-2 border-sky-500/40 ml-1 space-y-1">
                            <div>output(i, j)</div>
                            <div>j = j + 1</div>
                          </div>
                          <div>endwhile</div>
                          <div>output_newline()</div>
                          <div>i = i + 1</div>
                        </div>
                        <div>endwhile</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {focusTab === 'kode' && (
            <div className="space-y-4 max-w-3xl mx-auto py-4">
              <h4 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                <span>Implementasi Dwibahasa Python &amp; JavaScript ({loopType.toUpperCase()})</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2">
                  <div className="text-blue-400 font-bold border-b border-slate-800 pb-1">Python 3</div>
                  <pre className="leading-relaxed">
                    {loopType === 'for' ? (
`for i in range(1, M + 1):
    for j in range(1, N + 1):
        print(f"({i},{j})", end=" ")
    print()`
                    ) : (
`i = 1
while i <= M:
    j = 1  # Reset inner counter!
    while j <= N:
        print(f"({i},{j})", end=" ")
        j += 1
    print()
    i += 1`
                    )}
                  </pre>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2">
                  <div className="text-amber-400 font-bold border-b border-slate-800 pb-1">JavaScript ES6</div>
                  <pre className="leading-relaxed">
                    {loopType === 'for' ? (
`for (let i = 1; i <= M; i++) {
    let row = "";
    for (let j = 1; j <= N; j++) {
        row += \`(\${i},\${j}) \`;
    }
    console.log(row);
}`
                    ) : (
`let i = 1;
while (i <= M) {
    let j = 1;  // Reset inner counter!
    let row = "";
    while (j <= N) {
        row += \`(\${i},\${j}) \`;
        j++;
    }
    console.log(row);
    i++;
}`
                    )}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

    </div>
  );
}
