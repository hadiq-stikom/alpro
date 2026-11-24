"use client";

import React, { useState } from 'react';
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
  Columns,
  Maximize2,
  CheckCircle2,
  ArrowRight,
  Info,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ForLoopRepresentationMatrix() {
  const [viewMode, setViewMode] = useState<'matrix' | 'focus'>('matrix');
  const [focusTab, setFocusTab] = useState<'naratif' | 'flowchart' | 'pseudocode' | 'kode'>('flowchart');
  const [activeLang, setActiveLang] = useState<'python' | 'javascript'>('python');
  const [simStep, setSimStep] = useState<number>(0);
  // simStep:
  // 0: Standby / Seluruh Diagram Lengkap
  // 1: Hexagon i = 1 (Kondisi True)
  // 2: Badan Loop output(1)
  // 3: Loopback Next i (i menjadi 2)
  // 4: Selesai Loop (i melampaui 5 -> Cabang Selesai ke Terminator)
  const [isSimPlaying, setIsSimPlaying] = useState<boolean>(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimPlaying) {
      timer = setTimeout(() => {
        setSimStep((prev) => {
          if (prev >= 4) {
            setIsSimPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1800);
    }
    return () => clearTimeout(timer);
  }, [isSimPlaying, simStep]);

  // Deskripsi status simulasi flowchart
  const getSimStepDescription = () => {
    switch (simStep) {
      case 1:
        return {
          title: 'Langkah 1: Inisialisasi & Evaluasi Batas (Hexagon)',
          desc: 'Nilai awal i diset ke 1. Karena 1 <= 5 bernilai TRUE, eksekusi masuk melalui cabang "Ulangi".',
          badge: 'i = 1 (True)'
        };
      case 2:
        return {
          title: 'Langkah 2: Eksekusi Badan Loop (Jajar Genjang Output)',
          desc: 'Instruksi output(i) mencetak nilai 1 ke layar (terminal).',
          badge: 'Cetak: output(1)'
        };
      case 3:
        return {
          title: 'Langkah 3: Jalur Putar Balik & Kenaikan (Loopback Next i)',
          desc: 'Aliran berputar kembali ke hexagon melalui jalur Next i. Nilai pencacah dinaikkan otomatis: i = i + 1.',
          badge: 'Next i (i++)'
        };
      case 4:
        return {
          title: 'Langkah 4: Terminasi & Keluar (Cabang Selesai)',
          desc: 'Saat i melampaui batas 5 (i = 6), kondisi menjadi FALSE. Alur melompat keluar ke titik temu A lalu SELESAI.',
          badge: 'Terminasi Selesai'
        };
      default:
        return {
          title: 'Mode Siap / Diagram Utuh Baku ANSI/ISO',
          desc: 'Klik tombol "Animasi Alur" di atas untuk mensimulasikan langkah perputaran iterasi secara real-time.',
          badge: 'Standby'
        };
    }
  };

  const simInfo = getSimStepDescription();

  return (
    <div className="p-5 md:p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-sm">
      
      {/* ── 1. HEADER UTAMA: Judul, Selector Mode Tampilan, & Kontrol Animasi ──────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-border/70 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm md:text-base text-slate-950 dark:text-white">
              Sintesis 4 Representasi Baku FOR Loop (Mencetak 1 s.d. 5)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Komparasi menyeluruh: Naratif, Flowchart ANSI/ISO, Pseudocode CLRS, dan Kode Dwibahasa.
            </p>
          </div>
        </div>

        {/* Kontrol Kanan: Toggle Mode Tampilan (2 Kolom vs Fokus Tab) + Play Animasi */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          {/* Mode Switcher: Matriks 2x2 vs Tab Fokus */}
          <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-950 p-1 rounded-xl border border-border/80 dark:border-slate-800">
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'matrix'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Tampilkan ke-4 representasi sekaligus dalam format 2 Kolom lega"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Matriks 2 Kolom</span>
            </button>
            <button
              onClick={() => setViewMode('focus')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'focus'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Fokus telaah satu per satu dalam tampilan lebar penuh"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Tab Fokus</span>
            </button>
          </div>

          {/* Live Simulator Stepper Controls */}
          <div className="flex items-center gap-1 bg-card dark:bg-slate-950 p-1 rounded-xl border border-border/80 dark:border-slate-800 shadow-xs">
            <button
              onClick={() => {
                if (simStep === 0) setSimStep(1);
                setIsSimPlaying(!isSimPlaying);
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isSimPlaying
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
              }`}
              title="Simulasikan Alur Eksekusi Flowchart"
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

      {/* ── 2. KONTEN REPRESENTASI: MODE MATRIKS 2 KOLOM (DEFAULT) ────────────── */}
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
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm">1. Algoritma Naratif</span>
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

              {/* Isi Naratif Terstruktur */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 font-mono text-xs sm:text-[13px] leading-relaxed space-y-2">
                <p className="font-bold text-emerald-700 dark:text-emerald-400">
                  1. Untuk setiap nilai i dari 1 sampai 5 lakukan:
                </p>
                <div className="pl-5 text-slate-700 dark:text-slate-300 border-l-2 border-emerald-500/50 ml-2 py-1">
                  Tampilkan nilai i ke layar.
                </div>
                {/* Penutup Selesai TANPA nomor urut (Sesuai Aturan Tunggal Pedagogi Web-Alpro) */}
                <p className="font-bold text-slate-800 dark:text-slate-200 pt-1">
                  Selesai.
                </p>
              </div>

              {/* Kaidah Baku Naratif */}
              <div className="p-3.5 rounded-xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-blue-700 dark:text-blue-300">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Kaidah Baku Algoritma Naratif:</span>
                </div>
                <ul className="space-y-1.5 pl-4 list-disc text-slate-600 dark:text-slate-400 leading-relaxed text-[11.5px]">
                  <li>
                    Menggunakan klausa imperatif terhitung: <em>&quot;Untuk setiap [pencacah] dari [awal] sampai [akhir] lakukan:&quot;</em>.
                  </li>
                  <li>
                    Aksi di dalam tubuh perulangan menjorok ke dalam (indentasi) tanpa nomor baru untuk menegaskan hierarki blok atomik.
                  </li>
                  <li>
                    Instruksi penutup <code>Selesai.</code> wajib tanpa nomor urut sebagai batas akhir alur.
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-border/40 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
              <span>Model: Atomic Block</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Sesuai Konvensi</span>
            </div>
          </div>

          {/* ── BARIS 1, KOLOM 2: 🔷 2. FLOWCHART ANSI / ISO (HEXAGON PREPARATION) ─ */}
          <div className="rounded-2xl border-2 border-emerald-500/40 bg-card dark:bg-slate-950 p-5 flex flex-col justify-between shadow-xs space-y-4 relative overflow-hidden">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-border/60 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm">2. Flowchart ANSI / ISO</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    Preparation Hexagon
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
                  <span className={`w-2 h-2 rounded-full ${isSimPlaying ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}`} />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{simInfo.title}</span>
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  {simInfo.badge}
                </span>
              </div>

              {/* SVG Diagram Alir Baku ANSI / ISO (Tersaji Luas & Proporsional) */}
              <div className="flex items-center justify-center py-2 bg-slate-50/60 dark:bg-slate-900/40 rounded-xl border border-border/60">
                <svg
                  viewBox="0 0 340 280"
                  className="w-full max-w-[310px] h-auto overflow-visible select-none"
                  textRendering="geometricPrecision"
                >
                  <defs>
                    <marker
                      id="m9-matrix-arrow-slate"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" className="dark:fill-slate-400" />
                    </marker>
                    <marker
                      id="m9-matrix-arrow-emerald"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" className="dark:fill-emerald-400" />
                    </marker>
                    <marker
                      id="m9-matrix-arrow-rose"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#e11d48" className="dark:fill-rose-400" />
                    </marker>
                  </defs>

                  {/* 1. Terminator MULAI */}
                  <rect
                    x="120"
                    y="8"
                    width="100"
                    height="26"
                    rx="13"
                    fill="#064e3b"
                    stroke="#10b981"
                    strokeWidth="2"
                    className="dark:fill-emerald-950/90"
                  />
                  <text
                    x="170"
                    y="25"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="900"
                    fill="#6ee7b7"
                    fontFamily="monospace"
                    letterSpacing="1"
                  >
                    MULAI
                  </text>

                  {/* Panah Masuk ke Hexagon */}
                  <line
                    x1="170"
                    y1="34"
                    x2="170"
                    y2="58"
                    stroke="#475569"
                    className="dark:stroke-slate-400"
                    strokeWidth="2.5"
                    markerEnd="url(#m9-matrix-arrow-slate)"
                  />

                  {/* 2. Simbol PREPARATION (Hexagon Segi Enam Standar ANSI) */}
                  <polygon
                    points="95,60 245,60 268,82 245,104 95,104 72,82"
                    fill={simStep === 1 ? '#047857' : '#ecfdf5'}
                    stroke={simStep === 1 ? '#fbbf24' : '#059669'}
                    strokeWidth={simStep === 1 ? '3.5' : '2.5'}
                    className={simStep === 1 ? 'transition-all filter drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]' : 'dark:fill-emerald-950/80 dark:stroke-emerald-400 transition-all'}
                  />
                  <text
                    x="170"
                    y="87"
                    textAnchor="middle"
                    fontSize="12.5"
                    fontWeight="900"
                    fill={simStep === 1 ? '#ffffff' : '#064e3b'}
                    className={simStep === 1 ? 'fill-white' : 'dark:fill-emerald-200'}
                    fontFamily="monospace"
                  >
                    i = 1 TO 5
                  </text>

                  {/* 3. Cabang Masuk Tubuh Loop (Ulangi) */}
                  <text
                    x="178"
                    y="120"
                    fontSize="10"
                    fontWeight="900"
                    fill="#059669"
                    className="dark:fill-emerald-400"
                  >
                    ✓ Ulangi
                  </text>
                  <line
                    x1="170"
                    y1="104"
                    x2="170"
                    y2="132"
                    stroke="#059669"
                    className="dark:stroke-emerald-400"
                    strokeWidth={simStep === 2 ? '3.5' : '2.5'}
                    markerEnd="url(#m9-matrix-arrow-emerald)"
                  />

                  {/* 4. Simbol Jajar Genjang OUTPUT(i) */}
                  <polygon
                    points="105,134 245,134 225,168 85,168"
                    fill={simStep === 2 ? '#3b82f6' : '#eff6ff'}
                    stroke={simStep === 2 ? '#fbbf24' : '#2563eb'}
                    strokeWidth={simStep === 2 ? '3' : '2'}
                    className={simStep === 2 ? 'transition-all filter drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]' : 'dark:fill-blue-950/80 dark:stroke-blue-400 transition-all'}
                  />
                  <text
                    x="165"
                    y="155"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="900"
                    fill={simStep === 2 ? '#ffffff' : '#1e3a8a'}
                    className={simStep === 2 ? 'fill-white' : 'dark:fill-blue-200'}
                    fontFamily="monospace"
                  >
                    output(i)
                  </text>

                  {/* 5. Jalur Putar Balik (Next i / Loopback) */}
                  <polyline
                    points="155,168 155,188 32,188 32,82 68,82"
                    fill="none"
                    stroke="#059669"
                    className="dark:stroke-emerald-400"
                    strokeWidth={simStep === 3 ? '3.5' : '2.5'}
                    strokeDasharray={simStep === 3 ? '4,4' : undefined}
                    markerEnd="url(#m9-matrix-arrow-emerald)"
                  />
                  <text
                    x="26"
                    y="140"
                    textAnchor="end"
                    fontSize="10"
                    fontWeight="900"
                    fill="#059669"
                    className="dark:fill-emerald-400"
                  >
                    Next i
                  </text>

                  {/* 6. Cabang Selesai Loop (Keluar ke Sisi Kanan) */}
                  <polyline
                    points="268,82 305,82 305,212 184,212"
                    fill="none"
                    stroke="#e11d48"
                    className="dark:stroke-rose-400"
                    strokeWidth={simStep === 4 ? '3.5' : '2.5'}
                    markerEnd="url(#m9-matrix-arrow-slate)"
                  />
                  <text
                    x="272"
                    y="74"
                    fontSize="10"
                    fontWeight="900"
                    fill="#e11d48"
                    className="dark:fill-rose-400"
                  >
                    Selesai
                  </text>

                  {/* 7. Lingkaran Connector A (Titik Temu ANSI) */}
                  <circle
                    cx="170"
                    cy="212"
                    r="12"
                    fill="#0284c7"
                    stroke="#0369a1"
                    strokeWidth="2"
                  />
                  <text
                    x="170"
                    y="216"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="900"
                    fill="#ffffff"
                  >
                    A
                  </text>

                  {/* Panah dari Connector A ke Terminator SELESAI */}
                  <line
                    x1="170"
                    y1="224"
                    x2="170"
                    y2="246"
                    stroke="#475569"
                    className="dark:stroke-slate-400"
                    strokeWidth="2.5"
                    markerEnd="url(#m9-matrix-arrow-slate)"
                  />

                  {/* 8. Terminator SELESAI */}
                  <rect
                    x="120"
                    y="246"
                    width="100"
                    height="26"
                    rx="13"
                    fill="#881337"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    className="dark:fill-rose-950/90"
                  />
                  <text
                    x="170"
                    y="263"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="900"
                    fill="#fecdd3"
                    fontFamily="monospace"
                    letterSpacing="1"
                  >
                    SELESAI
                  </text>
                </svg>
              </div>

              <p className="text-[11.5px] text-slate-600 dark:text-slate-400 leading-relaxed">
                ⬡ <strong>Segi Enam (Preparation)</strong> mengatur inisialisasi awal dan syarat batas. Jalur <strong>Next i</strong> memutar kembali aliran, dan jalur <strong>Selesai</strong> melompat keluar setelah iterasi terpenuhi.
              </p>
            </div>

            <div className="pt-3 border-t border-border/40 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
              <span>Simbol: Preparation (Hexagon)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% ANSI/ISO Baku</span>
            </div>
          </div>

          {/* ── BARIS 2, KOLOM 1: 📋 3. PSEUDOCODE STANDAR (CLRS) ──────────────── */}
          <div className="rounded-2xl border border-border/80 dark:border-slate-800 bg-card dark:bg-slate-950/90 p-5 flex flex-col justify-between shadow-xs space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border/60 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm">3. Pseudocode Standar (CLRS)</span>
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

              {/* Blok Pseudocode Luas Tanpa Terpotong Scrollbar */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 font-mono text-xs sm:text-[13px] leading-relaxed">
                <pre className="text-slate-800 dark:text-slate-200 whitespace-pre">
<span className="text-purple-700 dark:text-purple-400 font-bold">PROGRAM</span> CetakDeret <span className="text-slate-500 italic text-[11px]">// Mencetak deret 1 s.d. 5</span>{'\n'}
<span className="text-sky-700 dark:text-sky-400 font-bold">KAMUS:</span>{'\n'}
{'  '}i : integer{'\n\n'}
<span className="text-amber-700 dark:text-amber-400 font-bold">ALGORITMA:</span>{'\n'}
{'  '}<span className="text-emerald-700 dark:text-emerald-400 font-bold">for</span> i = 1 <span className="text-emerald-700 dark:text-emerald-400 font-bold">to</span> 5 <span className="text-emerald-700 dark:text-emerald-400 font-bold">do</span>{'\n'}
{'    '}<span className="text-blue-700 dark:text-blue-400 font-bold">output</span>(i){'\n'}
{'  '}<span className="text-emerald-700 dark:text-emerald-400 font-bold">endfor</span>
                </pre>
              </div>

              {/* Kaidah Baku CLRS */}
              <div className="p-3.5 rounded-xl bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/20 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-purple-700 dark:text-purple-300">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Kaidah Baku Pseudocode CLRS:</span>
                </div>
                <ul className="space-y-1.5 pl-4 list-disc text-slate-600 dark:text-slate-400 leading-relaxed text-[11.5px]">
                  <li>
                    Wajib menerapkan <strong>3 Blok Baku</strong>: <code>PROGRAM</code>, <code>KAMUS:</code>, dan <code>ALGORITMA:</code>.
                  </li>
                  <li>
                    Konstruksi perulangan: <code>for var = start to end do ... endfor</code> dengan pasangan penutup tegas.
                  </li>
                  <li>
                    Instruksi I/O universal wajib menggunakan fungsi <code>output(i)</code>.
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-border/40 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
              <span>Standar: CLRS (Bab 3)</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold">Struktur 3 Blok</span>
            </div>
          </div>

          {/* ── BARIS 2, KOLOM 2: 💻 4. KODE PROGRAM DWIBAHASA (PYTHON & JS) ──── */}
          <div className="rounded-2xl border border-border/80 dark:border-slate-800 bg-card dark:bg-slate-950/90 p-5 flex flex-col justify-between shadow-xs space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border/60 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-sm">4. Kode Dwibahasa</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Toggle Python vs JS */}
                  <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-900 p-0.5 rounded-lg border border-border/60">
                    <button
                      onClick={() => setActiveLang('python')}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                        activeLang === 'python'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      Python
                    </button>
                    <button
                      onClick={() => setActiveLang('javascript')}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                        activeLang === 'javascript'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      JavaScript
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setViewMode('focus');
                      setFocusTab('kode');
                    }}
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
                    title="Buka dalam Tab Fokus Layar Penuh"
                  >
                    <span>Fokus</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Editor Kode Program Luas */}
              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 font-mono text-xs sm:text-[13px] leading-relaxed">
                {activeLang === 'python' ? (
                  <pre className="text-slate-200 whitespace-pre">
<span className="text-slate-500 italic text-[11.5px]"># Python: batas akhir stop bersifat eksklusif (stop = 6)</span>{'\n'}
<span className="text-emerald-400 font-bold">for</span> i <span className="text-emerald-400 font-bold">in</span> <span className="text-yellow-400">range</span>(1, 6):{'\n'}
{'    '}<span className="text-sky-300">print</span>(<span className="text-emerald-300">f&quot;Putaran ke-&#123;i&#125;: angka &#123;i&#125;&quot;</span>)
                  </pre>
                ) : (
                  <pre className="text-slate-200 whitespace-pre">
<span className="text-slate-500 italic text-[11.5px]">// JavaScript: inisialisasi counter, batas kondisi, kenaikan</span>{'\n'}
<span className="text-emerald-400 font-bold">for</span> (<span className="text-rose-400 font-bold">let</span> i = 1; i &lt;= 5; i++) &#123;{'\n'}
{'    '}<span className="text-sky-300">console</span>.log(<span className="text-emerald-300">`Putaran ke-$&#123;i&#125;: angka $&#123;i&#125;`</span>);{'\n'}
&#125;
                  </pre>
                )}
              </div>

              {/* Terminal Output Snapshot */}
              <div className="p-3 rounded-xl bg-black/90 text-emerald-400 border border-slate-800 font-mono text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 pb-1.5 border-b border-slate-800/80 text-[10.5px]">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Keluaran Konsol (Terminal Output):</span>
                </div>
                <div>Putaran ke-1: angka 1</div>
                <div>Putaran ke-2: angka 2</div>
                <div>Putaran ke-3: angka 3</div>
                <div>Putaran ke-4: angka 4</div>
                <div>Putaran ke-5: angka 5</div>
              </div>
            </div>

            <div className="pt-3 border-t border-border/40 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
              <span>Dual-Language Engine</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">Python &amp; JavaScript</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── 3. ALTERNATIF LAIN: MODE TAB FOKUS (LEBAR PENUH 100%) ─────────────── */}
      {viewMode === 'focus' && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          {/* Sub-Bar Navigasi Tab Fokus */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl bg-slate-100 dark:bg-slate-950/80 border border-border/80 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setFocusTab('naratif')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  focusTab === 'naratif'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>1. Naratif</span>
              </button>
              <button
                onClick={() => setFocusTab('flowchart')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  focusTab === 'flowchart'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900'
                }`}
              >
                <GitBranch className="w-4 h-4" />
                <span>2. Flowchart ANSI</span>
              </button>
              <button
                onClick={() => setFocusTab('pseudocode')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  focusTab === 'pseudocode'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>3. Pseudocode</span>
              </button>
              <button
                onClick={() => setFocusTab('kode')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  focusTab === 'kode'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>4. Kode Dwibahasa</span>
              </button>
            </div>

            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 px-2 hidden sm:inline">
              Mode Fokus: Telaah Representasi Lebar Penuh
            </span>
          </div>

          {/* Area Konten Tab Fokus */}
          <div className="rounded-2xl border border-border/80 dark:border-slate-800 bg-card dark:bg-slate-950 p-6 shadow-sm">
            {focusTab === 'naratif' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  <h5 className="font-extrabold text-base text-slate-950 dark:text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span>Konstruksi Algoritma Naratif</span>
                  </h5>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 font-mono text-sm leading-relaxed space-y-2">
                    <p className="font-bold text-emerald-700 dark:text-emerald-400">
                      1. Untuk setiap nilai i dari 1 sampai 5 lakukan:
                    </p>
                    <div className="pl-6 text-slate-700 dark:text-slate-300 border-l-2 border-emerald-500/50 ml-2 py-1">
                      Tampilkan nilai i ke layar.
                    </div>
                    <p className="font-bold text-slate-800 dark:text-slate-200 pt-1">
                      Selesai.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h6 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Pembedahan Pedagogis:
                  </h6>
                  <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <div className="p-3 rounded-xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20">
                      <strong className="text-blue-700 dark:text-blue-300">1. Klausa Perulangan Terhitung:</strong>
                      <p className="mt-1">
                        Diawali kata kunci <em>&quot;Untuk setiap [pencacah] dari [awal] sampai [akhir] lakukan:&quot;</em> yang menegaskan bahwa jumlah perulangan sudah pasti (5 putaran).
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20">
                      <strong className="text-emerald-700 dark:text-emerald-300">2. Hierarki Tubuh Loop (Indented):</strong>
                      <p className="mt-1">
                        Instruksi di dalam perulangan menjorok ke dalam tanpa membuat nomor urut baru, menjaga keutuhan nomor langkah algoritma secara terstruktur.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-500/5 dark:bg-slate-500/10 border border-border">
                      <strong className="text-slate-800 dark:text-slate-200">3. Terminal Selesai Unnumbered:</strong>
                      <p className="mt-1">
                        Sesuai pedoman baku, instruksi <code>Selesai.</code> tidak memiliki nomor baru karena berfungsi sebagai penutup alur eksekusi keseluruhan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {focusTab === 'flowchart' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 flex justify-center py-4 bg-slate-50/50 dark:bg-slate-900/40 rounded-2xl border border-border/70">
                  <svg
                    viewBox="0 0 340 280"
                    className="w-full max-w-[340px] h-auto overflow-visible select-none"
                    textRendering="geometricPrecision"
                  >
                    <defs>
                      <marker
                        id="m9-focus-arrow-slate"
                        viewBox="0 0 10 10"
                        refX="6"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" className="dark:fill-slate-400" />
                      </marker>
                      <marker
                        id="m9-focus-arrow-emerald"
                        viewBox="0 0 10 10"
                        refX="6"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" className="dark:fill-emerald-400" />
                      </marker>
                    </defs>

                    {/* 1. Terminator MULAI */}
                    <rect x="120" y="8" width="100" height="26" rx="13" fill="#064e3b" stroke="#10b981" strokeWidth="2" className="dark:fill-emerald-950/90" />
                    <text x="170" y="25" textAnchor="middle" fontSize="11" fontWeight="900" fill="#6ee7b7" fontFamily="monospace" letterSpacing="1">MULAI</text>

                    <line x1="170" y1="34" x2="170" y2="58" stroke="#475569" className="dark:stroke-slate-400" strokeWidth="2.5" markerEnd="url(#m9-focus-arrow-slate)" />

                    {/* 2. Preparation Hexagon */}
                    <polygon
                      points="95,60 245,60 268,82 245,104 95,104 72,82"
                      fill={simStep === 1 ? '#047857' : '#ecfdf5'}
                      stroke={simStep === 1 ? '#fbbf24' : '#059669'}
                      strokeWidth={simStep === 1 ? '3.5' : '2.5'}
                      className={simStep === 1 ? 'transition-all filter drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]' : 'dark:fill-emerald-950/80 dark:stroke-emerald-400 transition-all'}
                    />
                    <text x="170" y="87" textAnchor="middle" fontSize="12.5" fontWeight="900" fill={simStep === 1 ? '#ffffff' : '#064e3b'} className={simStep === 1 ? 'fill-white' : 'dark:fill-emerald-200'} fontFamily="monospace">
                      i = 1 TO 5
                    </text>

                    {/* 3. Cabang Ulangi */}
                    <text x="178" y="120" fontSize="10" fontWeight="900" fill="#059669" className="dark:fill-emerald-400">✓ Ulangi</text>
                    <line x1="170" y1="104" x2="170" y2="132" stroke="#059669" className="dark:stroke-emerald-400" strokeWidth={simStep === 2 ? '3.5' : '2.5'} markerEnd="url(#m9-focus-arrow-emerald)" />

                    {/* 4. Output Jajar Genjang */}
                    <polygon
                      points="105,134 245,134 225,168 85,168"
                      fill={simStep === 2 ? '#3b82f6' : '#eff6ff'}
                      stroke={simStep === 2 ? '#fbbf24' : '#2563eb'}
                      strokeWidth={simStep === 2 ? '3' : '2'}
                      className={simStep === 2 ? 'transition-all filter drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]' : 'dark:fill-blue-950/80 dark:stroke-blue-400 transition-all'}
                    />
                    <text x="165" y="155" textAnchor="middle" fontSize="12" fontWeight="900" fill={simStep === 2 ? '#ffffff' : '#1e3a8a'} className={simStep === 2 ? 'fill-white' : 'dark:fill-blue-200'} fontFamily="monospace">
                      output(i)
                    </text>

                    {/* 5. Loopback Next i */}
                    <polyline
                      points="155,168 155,188 32,188 32,82 68,82"
                      fill="none"
                      stroke="#059669"
                      className="dark:stroke-emerald-400"
                      strokeWidth={simStep === 3 ? '3.5' : '2.5'}
                      strokeDasharray={simStep === 3 ? '4,4' : undefined}
                      markerEnd="url(#m9-focus-arrow-emerald)"
                    />
                    <text x="26" y="140" textAnchor="end" fontSize="10" fontWeight="900" fill="#059669" className="dark:fill-emerald-400">Next i</text>

                    {/* 6. Cabang Selesai */}
                    <polyline
                      points="268,82 305,82 305,212 184,212"
                      fill="none"
                      stroke="#e11d48"
                      className="dark:stroke-rose-400"
                      strokeWidth={simStep === 4 ? '3.5' : '2.5'}
                      markerEnd="url(#m9-focus-arrow-slate)"
                    />
                    <text x="272" y="74" fontSize="10" fontWeight="900" fill="#e11d48" className="dark:fill-rose-400">Selesai</text>

                    {/* 7. Connector A */}
                    <circle cx="170" cy="212" r="12" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
                    <text x="170" y="216" textAnchor="middle" fontSize="10" fontWeight="900" fill="#ffffff">A</text>

                    <line x1="170" y1="224" x2="170" y2="246" stroke="#475569" className="dark:stroke-slate-400" strokeWidth="2.5" markerEnd="url(#m9-focus-arrow-slate)" />

                    {/* 8. SELESAI */}
                    <rect x="120" y="246" width="100" height="26" rx="13" fill="#881337" stroke="#f43f5e" strokeWidth="2" className="dark:fill-rose-950/90" />
                    <text x="170" y="263" textAnchor="middle" fontSize="11" fontWeight="900" fill="#fecdd3" fontFamily="monospace" letterSpacing="1">SELESAI</text>
                  </svg>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                      Simulasi Alur Interaktif
                    </span>
                    <h6 className="font-bold text-sm text-slate-900 dark:text-slate-100">{simInfo.title}</h6>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{simInfo.desc}</p>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                    <h6 className="font-bold text-slate-800 dark:text-slate-200">Kaidah ANSI/ISO Hexagon:</h6>
                    <p>• <strong>Simbol Segi Enam (Preparation)</strong> menggabungkan inisialisasi counter (<code>i = 1</code>), batas kondisi (<code>TO 5</code>), dan kenaikan (<code>STEP 1</code>) dalam satu simbol tunggal.</p>
                    <p>• <strong>Dua Cabang Keluar:</strong> Cabang bawah (<code>✓ Ulangi</code>) dieksekusi saat kondisi terpenuhi; cabang samping kanan (<code>Selesai</code>) dieksekusi saat perulangan selesai.</p>
                  </div>
                </div>
              </div>
            )}

            {focusTab === 'pseudocode' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  <h5 className="font-extrabold text-base text-slate-950 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span>Notasi Pseudocode Baku (CLRS)</span>
                  </h5>
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 font-mono text-sm leading-relaxed">
                    <pre className="text-slate-800 dark:text-slate-200 whitespace-pre">
<span className="text-purple-700 dark:text-purple-400 font-bold">PROGRAM</span> CetakDeret <span className="text-slate-500 italic text-xs">// Mencetak deret 1 s.d. 5</span>{'\n'}
<span className="text-sky-700 dark:text-sky-400 font-bold">KAMUS:</span>{'\n'}
{'  '}i : integer{'\n\n'}
<span className="text-amber-700 dark:text-amber-400 font-bold">ALGORITMA:</span>{'\n'}
{'  '}<span className="text-emerald-700 dark:text-emerald-400 font-bold">for</span> i = 1 <span className="text-emerald-700 dark:text-emerald-400 font-bold">to</span> 5 <span className="text-emerald-700 dark:text-emerald-400 font-bold">do</span>{'\n'}
{'    '}<span className="text-blue-700 dark:text-blue-400 font-bold">output</span>(i){'\n'}
{'  '}<span className="text-emerald-700 dark:text-emerald-400 font-bold">endfor</span>
                    </pre>
                  </div>
                </div>

                <div className="space-y-4">
                  <h6 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Standar 3 Blok Baku (Bab 3):
                  </h6>
                  <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <div className="p-3 rounded-xl bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/20">
                      <strong className="text-purple-700 dark:text-purple-300">Blok PROGRAM:</strong>
                      <p className="mt-1">Nama program PascalCase yang mendeskripsikan tujuan algoritma beserta komentar penjelas.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-sky-500/5 dark:bg-sky-500/10 border border-sky-500/20">
                      <strong className="text-sky-700 dark:text-sky-300">Blok KAMUS:</strong>
                      <p className="mt-1">Deklarasi seluruh variabel pencacah (<code>i : integer</code>) sebelum digunakan dalam algoritma.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20">
                      <strong className="text-emerald-700 dark:text-emerald-300">Blok ALGORITMA:</strong>
                      <p className="mt-1">Konstruksi <code>for ... to ... do</code> wajib ditutup dengan <code>endfor</code> yang sejajar secara vertikal.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {focusTab === 'kode' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h5 className="font-extrabold text-base text-slate-950 dark:text-white flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <span>Komparasi Implementasi Kode Nyata (Python vs JavaScript)</span>
                  </h5>

                  <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-900 p-1 rounded-xl border border-border/60">
                    <button
                      onClick={() => setActiveLang('python')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activeLang === 'python'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Python
                    </button>
                    <button
                      onClick={() => setActiveLang('javascript')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activeLang === 'javascript'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      JavaScript
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-7 space-y-3">
                    <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 font-mono text-sm leading-relaxed">
                      {activeLang === 'python' ? (
                        <pre className="text-slate-200 whitespace-pre">
<span className="text-slate-500 italic text-xs"># Python: range(start, stop) berhenti sebelum angka stop</span>{'\n'}
<span className="text-emerald-400 font-bold">for</span> i <span className="text-emerald-400 font-bold">in</span> <span className="text-yellow-400">range</span>(1, 6):{'\n'}
{'    '}<span className="text-sky-300">print</span>(<span className="text-emerald-300">f&quot;Putaran ke-&#123;i&#125;: angka &#123;i&#125;&quot;</span>)
                        </pre>
                      ) : (
                        <pre className="text-slate-200 whitespace-pre">
<span className="text-slate-500 italic text-xs">// JavaScript: 3 ekspresi (inisialisasi; kondisi; kenaikan)</span>{'\n'}
<span className="text-emerald-400 font-bold">for</span> (<span className="text-rose-400 font-bold">let</span> i = 1; i &lt;= 5; i++) &#123;{'\n'}
{'    '}<span className="text-sky-300">console</span>.log(<span className="text-emerald-300">`Putaran ke-$&#123;i&#125;: angka $&#123;i&#125;`</span>);{'\n'}
&#125;
                        </pre>
                      )}
                    </div>

                    <div className="p-3.5 rounded-2xl bg-black/90 text-emerald-400 border border-slate-800 font-mono text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-500 pb-1.5 border-b border-slate-800/80 text-[11px]">
                        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Keluaran Terminal Konsol:</span>
                      </div>
                      <div>Putaran ke-1: angka 1</div>
                      <div>Putaran ke-2: angka 2</div>
                      <div>Putaran ke-3: angka 3</div>
                      <div>Putaran ke-4: angka 4</div>
                      <div>Putaran ke-5: angka 5</div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    <h6 className="font-bold text-slate-900 dark:text-slate-100">Perbedaan Kunci Bahasa:</h6>
                    <div className="p-3 rounded-xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 space-y-1">
                      <strong className="text-blue-700 dark:text-blue-300">Karakteristik Python:</strong>
                      <p>Fungsi bawaan <code>range(1, 6)</code> membangkitkan urutan nilai [1, 2, 3, 4, 5]. Nilai stop bersifat eksklusif sehingga untuk mencetak hingga 5 harus menuliskan 6.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-1">
                      <strong className="text-amber-700 dark:text-amber-300">Karakteristik JavaScript:</strong>
                      <p>Sintaks C-style klasik yang mengeksplisitkan 3 bagian: <code>let i = 1</code> (inisialisasi), <code>i &lt;= 5</code> (evaluasi kondisi boolean), dan <code>i++</code> (kenaikan pasca-putaran).</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

    </div>
  );
}
