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
  CheckCircle2,
  ArrowRight,
  Info,
  ChevronRight,
  AlertTriangle,
  RotateCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhileLoopRepresentationMatrix() {
  const [viewMode, setViewMode] = useState<'matrix' | 'focus'>('matrix');
  const [focusTab, setFocusTab] = useState<'naratif' | 'flowchart' | 'pseudocode' | 'kode'>('flowchart');
  const [activeLang, setActiveLang] = useState<'python' | 'javascript'>('python');
  const [simStep, setSimStep] = useState<number>(0);
  // simStep:
  // 0: Standby / Seluruh Diagram Lengkap
  // 1: Inisialisasi awal (i = 1)
  // 2: Evaluasi Belah Ketupat Decision (i <= 5? -> True)
  // 3: Eksekusi Badan Loop: output(i) & Update i = i + 1
  // 4: Loopback memutar kembali ke kondisi uji
  // 5: Terminasi Loop: i melampaui 5 -> Cabang False ke Terminator SELESAI
  const [isSimPlaying, setIsSimPlaying] = useState<boolean>(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimPlaying) {
      timer = setTimeout(() => {
        setSimStep((prev) => {
          if (prev >= 5) {
            setIsSimPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1800);
    }
    return () => clearTimeout(timer);
  }, [isSimPlaying, simStep]);

  // Deskripsi status simulasi flowchart WHILE
  const getSimStepDescription = () => {
    switch (simStep) {
      case 1:
        return {
          title: 'Langkah 1: Inisialisasi Awal Variabel (Initialization)',
          desc: 'Variabel pencacah i disiapkan di luar loop dengan nilai awal 1 (i = 1). Unsur ke-1 (Praloop).',
          badge: '1. Inisialisasi: i = 1'
        };
      case 2:
        return {
          title: 'Langkah 2: Kondisi Pengujian (Test Condition)',
          desc: 'Komputer menguji ekspresi logika pada kepala loop: Apakah 1 <= 5? Bernilai TRUE (Ya). Alur masuk ke tubuh loop.',
          badge: '2. Uji: TRUE (1 <= 5)'
        };
      case 3:
        return {
          title: 'Langkah 3: Eksekusi Badan Loop & Pembaruan Nilai (Update)',
          desc: 'Mencetak output(1) lalu mengeksekusi instruksi wajib update: i = i + 1 (nilai i naik menjadi 2).',
          badge: '3. Update: i = 2'
        };
      case 4:
        return {
          title: 'Langkah 4: Jalur Putar Balik (Loopback)',
          desc: 'Aliran memutar kembali ke atas belah ketupat keputusan untuk menguji ulang kondisi dengan nilai i yang baru.',
          badge: 'Loopback ↺'
        };
      case 5:
        return {
          title: 'Langkah 5: Evaluasi Terminasi & Keluar (Cabang False)',
          desc: 'Saat i mencapai 6, kondisi 6 <= 5 bernilai FALSE (Tidak). Alur melompat keluar ke titik temu A lalu SELESAI.',
          badge: '✗ HASIL: FALSE (Selesai)'
        };
      default:
        return {
          title: 'Mode Siap / Diagram Utuh Baku ANSI/ISO',
          desc: 'Klik tombol "Animasi Alur" di atas untuk mensimulasikan alur 3 unsur pengendali loop secara interaktif.',
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
          <div className="p-2.5 rounded-2xl bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30 shrink-0">
            <RotateCw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm md:text-base text-slate-950 dark:text-white">
              Sintesis 4 Representasi Baku WHILE Loop (Mencetak 1 s.d. 5)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Komparasi menyeluruh: Naratif, Flowchart ANSI/ISO (Decision Diamond), Pseudocode CLRS, dan Kode Dwibahasa.
            </p>
          </div>
        </div>

        {/* Kontrol Kanan: Toggle Mode Tampilan (2 Kolom vs Fokus Tab) + Play Animasi */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          {/* Mode Switcher: Matriks 2 Kolom vs Tab Fokus */}
          <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-950 p-1 rounded-xl border border-border/80 dark:border-slate-800">
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'matrix'
                  ? 'bg-teal-600 text-white shadow-xs'
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
                  ? 'bg-teal-600 text-white shadow-xs'
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
                  : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
              }`}
              title="Simulasikan Alur Eksekusi Flowchart WHILE"
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

              {/* Isi Naratif Terstruktur WHILE */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 font-mono text-xs sm:text-[13px] leading-relaxed space-y-2">
                <p className="font-bold text-purple-700 dark:text-purple-400">
                  1. Inisialisasi nilai i = 1.
                </p>
                <p className="font-bold text-teal-700 dark:text-teal-400">
                  2. Selama nilai i &le; 5 lakukan:
                </p>
                <div className="pl-5 text-slate-700 dark:text-slate-300 border-l-2 border-teal-500/50 ml-2 py-1 space-y-1">
                  <p>Tampilkan nilai i ke layar.</p>
                  <p className="font-semibold text-amber-700 dark:text-amber-400">
                    Tambahkan nilai i dengan 1.
                  </p>
                </div>
                {/* Penutup Selesai TANPA nomor urut (Aturan Baku Web-Alpro) */}
                <p className="font-bold text-slate-800 dark:text-slate-200 pt-1">
                  Selesai.
                </p>
              </div>

              {/* Kaidah Baku Naratif WHILE */}
              <div className="p-3.5 rounded-xl bg-teal-500/5 dark:bg-teal-500/10 border border-teal-500/20 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-teal-700 dark:text-teal-300">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Kaidah Baku Algoritma Naratif WHILE:</span>
                </div>
                <ul className="space-y-1.5 pl-4 list-disc text-slate-600 dark:text-slate-400 leading-relaxed text-[11.5px]">
                  <li>
                    <strong>Langkah 1 (Inisialisasi):</strong> Menetapkan nilai awal variabel kondisi sebelum perulangan dimasuki.
                  </li>
                  <li>
                    <strong>Langkah 2 (Klausa Selama):</strong> Menggunakan format imperatif <em>&quot;Selama [kondisi bernilai benar] lakukan:&quot;</em>.
                  </li>
                  <li>
                    <strong>Pembaruan Status (Update):</strong> Aksi penambahan nilai (<code>Tambahkan nilai i dengan 1</code>) wajib berada di dalam tubuh loop agar kondisi akhirnya mencapai batas terminasi (pencegahan infinite loop).
                  </li>
                  <li>
                    <strong>Terminal Selesai:</strong> Wajib tanpa nomor urut penutup.
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-border/40 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
              <span>Model: Indefinite / Pre-Test</span>
              <span className="text-teal-600 dark:text-teal-400 font-bold">✓ 3 Unsur Pengendali Lengkap</span>
            </div>
          </div>

          {/* ── BARIS 1, KOLOM 2: 🔷 2. FLOWCHART ANSI / ISO (DECISION DIAMOND) ───── */}
          <div className="rounded-2xl border-2 border-teal-500/40 bg-card dark:bg-slate-950 p-5 flex flex-col justify-between shadow-xs space-y-4 relative overflow-hidden">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-border/60 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span className="text-sm">2. Flowchart ANSI / ISO</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    Decision Diamond
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
                  <span className={`w-2 h-2 rounded-full ${isSimPlaying ? 'bg-amber-400 animate-ping' : 'bg-teal-500'}`} />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{simInfo.title}</span>
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  {simInfo.badge}
                </span>
              </div>

              {/* SVG Diagram Alir Baku ANSI / ISO untuk WHILE Loop (Decision Diamond + Loopback) */}
              <div className="flex items-center justify-center py-2 bg-slate-50/60 dark:bg-slate-900/40 rounded-xl border border-border/60">
                <svg
                  viewBox="0 0 340 375"
                  className="w-full max-w-[310px] h-auto overflow-visible select-none"
                  textRendering="geometricPrecision"
                >
                  <defs>
                    <marker
                      id="m9w-arrow-slate"
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
                      id="m9w-arrow-teal"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0d9488" className="dark:fill-teal-400" />
                    </marker>
                    <marker
                      id="m9w-arrow-rose"
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
                    y="6"
                    width="100"
                    height="24"
                    rx="12"
                    fill="#064e3b"
                    stroke="#10b981"
                    strokeWidth="2"
                    className="dark:fill-emerald-950/90"
                  />
                  <text
                    x="170"
                    y="22"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="900"
                    fill="#6ee7b7"
                    fontFamily="monospace"
                    letterSpacing="1"
                  >
                    MULAI
                  </text>

                  {/* Panah Masuk ke Inisialisasi */}
                  <line
                    x1="170"
                    y1="30"
                    x2="170"
                    y2="46"
                    stroke="#475569"
                    className="dark:stroke-slate-400"
                    strokeWidth="2.5"
                    markerEnd="url(#m9w-arrow-slate)"
                  />

                  {/* 2. Simbol Proses: Inisialisasi i = 1 (Rukun 1) */}
                  <rect
                    x="115"
                    y="46"
                    width="110"
                    height="28"
                    rx="6"
                    fill={simStep === 1 ? '#7c3aed' : '#f5f3ff'}
                    stroke={simStep === 1 ? '#fbbf24' : '#7c3aed'}
                    strokeWidth={simStep === 1 ? '3' : '2'}
                    className={simStep === 1 ? 'transition-all filter drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]' : 'dark:fill-purple-950/80 dark:stroke-purple-400 transition-all'}
                  />
                  <text
                    x="170"
                    y="64"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="900"
                    fill={simStep === 1 ? '#ffffff' : '#581c87'}
                    className={simStep === 1 ? 'fill-white' : 'dark:fill-purple-200'}
                    fontFamily="monospace"
                  >
                    i = 1
                  </text>

                  {/* Panah Masuk ke Titik Temu Alur Sebelum Decision */}
                  <line
                    x1="170"
                    y1="74"
                    x2="170"
                    y2="98"
                    stroke="#475569"
                    className="dark:stroke-slate-400"
                    strokeWidth="2.5"
                    markerEnd="url(#m9w-arrow-slate)"
                  />

                  {/* 3. Simbol Decision Belah Ketupat: i <= 5? (Rukun 2) */}
                  {/* Standar: Latar cokelat gelap pekat #451a03, border amber #f59e0b, teks kuning keemasan #fde68a font-black */}
                  <polygon
                    points="170,98 245,128 170,158 95,128"
                    fill={simStep === 2 ? '#78350f' : '#451a03'}
                    stroke={simStep === 2 ? '#38bdf8' : '#f59e0b'}
                    strokeWidth={simStep === 2 ? '3.5' : '2.5'}
                    className={simStep === 2 ? 'transition-all filter drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]' : 'transition-all'}
                  />
                  <text
                    x="170"
                    y="132"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="900"
                    fill="#fde68a"
                    fontFamily="monospace"
                  >
                    i &le; 5?
                  </text>

                  {/* Cabang True (Ke Bawah: Masuk Tubuh Loop) */}
                  <text
                    x="178"
                    y="172"
                    fontSize="10"
                    fontWeight="900"
                    fill="#0d9488"
                    className="dark:fill-teal-400"
                  >
                    ✓ Ya
                  </text>
                  <line
                    x1="170"
                    y1="158"
                    x2="170"
                    y2="182"
                    stroke="#0d9488"
                    className="dark:stroke-teal-400"
                    strokeWidth={simStep === 3 ? '3.5' : '2.5'}
                    markerEnd="url(#m9w-arrow-teal)"
                  />

                  {/* 4. Simbol Jajar Genjang: output(i) */}
                  <polygon
                    points="105,182 245,182 225,212 85,212"
                    fill={simStep === 3 ? '#3b82f6' : '#eff6ff'}
                    stroke={simStep === 3 ? '#fbbf24' : '#2563eb'}
                    strokeWidth={simStep === 3 ? '3' : '2'}
                    className={simStep === 3 ? 'transition-all filter drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'dark:fill-blue-950/80 dark:stroke-blue-400 transition-all'}
                  />
                  <text
                    x="165"
                    y="201"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="900"
                    fill={simStep === 3 ? '#ffffff' : '#1e3a8a'}
                    className={simStep === 3 ? 'fill-white' : 'dark:fill-blue-200'}
                    fontFamily="monospace"
                  >
                    output(i)
                  </text>

                  {/* Panah dari Output ke Pembaruan Nilai */}
                  <line
                    x1="165"
                    y1="212"
                    x2="165"
                    y2="230"
                    stroke="#475569"
                    className="dark:stroke-slate-400"
                    strokeWidth="2.5"
                    markerEnd="url(#m9w-arrow-slate)"
                  />

                  {/* 5. Simbol Proses Pembaruan: i = i + 1 (Rukun 3 - Anti Infinite Loop) */}
                  <rect
                    x="105"
                    y="230"
                    width="120"
                    height="28"
                    rx="6"
                    fill={simStep === 3 ? '#d97706' : '#fffbeb'}
                    stroke={simStep === 3 ? '#fbbf24' : '#d97706'}
                    strokeWidth={simStep === 3 ? '3' : '2'}
                    className={simStep === 3 ? 'transition-all filter drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]' : 'dark:fill-amber-950/80 dark:stroke-amber-400 transition-all'}
                  />
                  <text
                    x="165"
                    y="248"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="900"
                    fill={simStep === 3 ? '#ffffff' : '#92400e'}
                    className={simStep === 3 ? 'fill-white' : 'dark:fill-amber-200'}
                    fontFamily="monospace"
                  >
                    i = i + 1
                  </text>

                  {/* 6. Jalur Putar Balik (Loopback) Memutar ke Atas Decision */}
                  <polyline
                    points="165,258 165,280 32,280 32,88 162,88"
                    fill="none"
                    stroke="#0d9488"
                    className="dark:stroke-teal-400"
                    strokeWidth={simStep === 4 ? '3.5' : '2.5'}
                    strokeDasharray={simStep === 4 ? '4,4' : undefined}
                    markerEnd="url(#m9w-arrow-teal)"
                  />
                  <text
                    x="26"
                    y="200"
                    textAnchor="end"
                    fontSize="10"
                    fontWeight="900"
                    fill="#0d9488"
                    className="dark:fill-teal-400"
                  >
                    Loopback
                  </text>

                  {/* 7. Cabang False (Keluar ke Sisi Kanan: Terminasi) */}
                  <polyline
                    points="245,128 305,128 305,308 184,308"
                    fill="none"
                    stroke="#e11d48"
                    className="dark:stroke-rose-400"
                    strokeWidth={simStep === 5 ? '3.5' : '2.5'}
                    markerEnd="url(#m9w-arrow-slate)"
                  />
                  <text
                    x="252"
                    y="120"
                    fontSize="10"
                    fontWeight="900"
                    fill="#e11d48"
                    className="dark:fill-rose-400"
                  >
                    ✗ Tidak
                  </text>

                  {/* 8. Lingkaran Connector A (Titik Temu ANSI) */}
                  <circle
                    cx="170"
                    cy="308"
                    r="12"
                    fill="#0284c7"
                    stroke="#0369a1"
                    strokeWidth="2"
                  />
                  <text
                    x="170"
                    y="312"
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
                    y1="320"
                    x2="170"
                    y2="338"
                    stroke="#475569"
                    className="dark:stroke-slate-400"
                    strokeWidth="2.5"
                    markerEnd="url(#m9w-arrow-slate)"
                  />

                  {/* 9. Terminator SELESAI */}
                  <rect
                    x="120"
                    y="338"
                    width="100"
                    height="24"
                    rx="12"
                    fill="#881337"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    className="dark:fill-rose-950/90"
                  />
                  <text
                    x="170"
                    y="354"
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
                ◆ <strong>Belah Ketupat Decision (Kondisi)</strong> menguji <code>i &le; 5?</code> di awal putaran (*pre-test*). Kotak proses <code>i = i + 1</code> menjamin perputaran tidak menjadi <em>infinite loop</em>.
              </p>
            </div>

            <div className="pt-3 border-t border-border/40 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
              <span>Bentuk: Decision Diamond</span>
              <span className="text-teal-600 dark:text-teal-400 font-bold">100% ANSI/ISO Baku</span>
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
<span className="text-purple-700 dark:text-purple-400 font-bold">PROGRAM</span> CetakDeretWhile <span className="text-slate-500 italic text-[11px]">// Mencetak 1 s.d. 5</span>{'\n'}
<span className="text-sky-700 dark:text-sky-400 font-bold">KAMUS:</span>{'\n'}
{'  '}i : integer{'\n\n'}
<span className="text-amber-700 dark:text-amber-400 font-bold">ALGORITMA:</span>{'\n'}
{'  '}<span className="text-purple-700 dark:text-purple-400 font-bold">i = 1</span> <span className="text-slate-500 italic text-[11px]">// Inisialisasi awal</span>{'\n'}
{'  '}<span className="text-teal-700 dark:text-teal-400 font-bold">while</span> i &lt;= 5 <span className="text-teal-700 dark:text-teal-400 font-bold">do</span>{'\n'}
{'    '}<span className="text-blue-700 dark:text-blue-400 font-bold">output</span>(i){'\n'}
{'    '}<span className="text-amber-700 dark:text-amber-400 font-bold">i = i + 1</span> <span className="text-slate-500 italic text-[11px]">// Pembaruan pencacah (wajib!)</span>{'\n'}
{'  '}<span className="text-teal-700 dark:text-teal-400 font-bold">endwhile</span>
                </pre>
              </div>

              {/* Kaidah Baku CLRS untuk WHILE */}
              <div className="p-3.5 rounded-xl bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/20 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-purple-700 dark:text-purple-300">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Kaidah Baku Pseudocode WHILE (CLRS):</span>
                </div>
                <ul className="space-y-1.5 pl-4 list-disc text-slate-600 dark:text-slate-400 leading-relaxed text-[11.5px]">
                  <li>
                    <strong>Inisialisasi Eksplisit:</strong> <code>i = 1</code> ditulis di bagian awal blok <code>ALGORITMA:</code> sebelum baris <code>while</code>.
                  </li>
                  <li>
                    <strong>Pasangan Blok:</strong> Konstruksi <code>while &lt;kondisi&gt; do ... endwhile</code> sejajar pada kolom indentasi yang sama.
                  </li>
                  <li>
                    <strong>Pembaruan Status:</strong> Pernyataan <code>i = i + 1</code> ditulis di dalam badan loop untuk menggerakkan variabel menuju terminasi.
                  </li>
                  <li>
                    <strong>Fungsi I/O Universal:</strong> Wajib menggunakan <code>output(i)</code>.
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-border/40 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
              <span>Standar: CLRS (Bab 3)</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold">while ... endwhile</span>
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
<span className="text-slate-500 italic text-[11.5px]"># 1. Inisialisasi awal sebelum loop</span>{'\n'}
i = <span className="text-amber-400 font-bold">1</span>{'\n\n'}
<span className="text-slate-500 italic text-[11.5px]"># 2. Kondisi batas terminasi</span>{'\n'}
<span className="text-teal-400 font-bold">while</span> i &lt;= <span className="text-amber-400 font-bold">5</span>:{'\n'}
{'    '}<span className="text-sky-300">print</span>(<span className="text-emerald-300">f&quot;Putaran ke-&#123;i&#125;: angka &#123;i&#125;&quot;</span>){'\n'}
{'    '}<span className="text-slate-500 italic text-[11.5px]"># 3. Pembaruan nilai (wajib! cegah loop tak hingga)</span>{'\n'}
{'    '}i += <span className="text-amber-400 font-bold">1</span>
                  </pre>
                ) : (
                  <pre className="text-slate-200 whitespace-pre">
<span className="text-slate-500 italic text-[11.5px]">// 1. Inisialisasi awal variabel</span>{'\n'}
<span className="text-rose-400 font-bold">let</span> i = <span className="text-amber-400 font-bold">1</span>;{'\n\n'}
<span className="text-slate-500 italic text-[11.5px]">// 2. Kondisi batas terminasi</span>{'\n'}
<span className="text-teal-400 font-bold">while</span> (i &lt;= <span className="text-amber-400 font-bold">5</span>) &#123;{'\n'}
{'    '}<span className="text-sky-300">console</span>.log(<span className="text-emerald-300">`Putaran ke-$&#123;i&#125;: angka $&#123;i&#125;`</span>);{'\n'}
{'    '}<span className="text-slate-500 italic text-[11.5px]">// 3. Kenaikan nilai pencacah (wajib!)</span>{'\n'}
{'    '}i++;{'\n'}
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
                    ? 'bg-teal-600 text-white shadow-xs'
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
              Mode Fokus: Telaah Representasi WHILE Lebar Penuh
            </span>
          </div>

          {/* Area Konten Tab Fokus */}
          <div className="rounded-2xl border border-border/80 dark:border-slate-800 bg-card dark:bg-slate-950 p-6 shadow-sm">
            {focusTab === 'naratif' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  <h5 className="font-extrabold text-base text-slate-950 dark:text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span>Konstruksi Algoritma Naratif WHILE</span>
                  </h5>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 font-mono text-sm leading-relaxed space-y-2">
                    <p className="font-bold text-purple-700 dark:text-purple-400">
                      1. Inisialisasi nilai i = 1.
                    </p>
                    <p className="font-bold text-teal-700 dark:text-teal-400">
                      2. Selama nilai i &le; 5 lakukan:
                    </p>
                    <div className="pl-6 text-slate-700 dark:text-slate-300 border-l-2 border-teal-500/50 ml-2 py-1 space-y-1">
                      <p>Tampilkan nilai i ke layar.</p>
                      <p className="font-semibold text-amber-700 dark:text-amber-400">
                        Tambahkan nilai i dengan 1.
                      </p>
                    </div>
                    <p className="font-bold text-slate-800 dark:text-slate-200 pt-1">
                      Selesai.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h6 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Pembedahan 3 Unsur Pengendali WHILE (Loop Control Elements):
                  </h6>
                  <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <div className="p-3 rounded-xl bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/20">
                      <strong className="text-purple-700 dark:text-purple-300">1. Inisialisasi (Initialization) — Praloop:</strong>
                      <p className="mt-1">
                        Nilai <code>i = 1</code> wajib ditetapkan sebelum perulangan dievaluasi agar komputer memiliki pijakan status awal yang terdefinisi.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-teal-500/5 dark:bg-teal-500/10 border border-teal-500/20">
                      <strong className="text-teal-700 dark:text-teal-300">2. Kondisi Uji (Test Condition) — Pre-test:</strong>
                      <p className="mt-1">
                        Klausa <em>&quot;Selama nilai i &le; 5 lakukan:&quot;</em> dievaluasi di pintu masuk. Jika kondisi awal bernilai salah, badan loop tidak pernah dijalankan sama sekali (0 putaran).
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20">
                      <strong className="text-amber-700 dark:text-amber-300">3. Pembaruan Nilai (Update / Modification) — Badan Loop:</strong>
                      <p className="mt-1">
                        Perintah <code>Tambahkan nilai i dengan 1</code> di dalam tubuh loop mutlak wajib ada untuk menggerakkan nilai variabel menuju terminasi (anti-infinite loop).
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
                    viewBox="0 0 340 375"
                    className="w-full max-w-[340px] h-auto overflow-visible select-none"
                    textRendering="geometricPrecision"
                  >
                    <defs>
                      <marker
                        id="m9w-focus-arrow-slate"
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
                        id="m9w-focus-arrow-teal"
                        viewBox="0 0 10 10"
                        refX="6"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0d9488" className="dark:fill-teal-400" />
                      </marker>
                    </defs>

                    {/* Terminator MULAI */}
                    <rect x="120" y="6" width="100" height="24" rx="12" fill="#064e3b" stroke="#10b981" strokeWidth="2" className="dark:fill-emerald-950/90" />
                    <text x="170" y="22" textAnchor="middle" fontSize="11" fontWeight="900" fill="#6ee7b7" fontFamily="monospace" letterSpacing="1">MULAI</text>

                    <line x1="170" y1="30" x2="170" y2="46" stroke="#475569" className="dark:stroke-slate-400" strokeWidth="2.5" markerEnd="url(#m9w-focus-arrow-slate)" />

                    {/* Proses Inisialisasi */}
                    <rect
                      x="115"
                      y="46"
                      width="110"
                      height="28"
                      rx="6"
                      fill={simStep === 1 ? '#7c3aed' : '#f5f3ff'}
                      stroke={simStep === 1 ? '#fbbf24' : '#7c3aed'}
                      strokeWidth={simStep === 1 ? '3' : '2'}
                      className={simStep === 1 ? 'transition-all filter drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]' : 'dark:fill-purple-950/80 dark:stroke-purple-400 transition-all'}
                    />
                    <text x="170" y="64" textAnchor="middle" fontSize="12" fontWeight="900" fill={simStep === 1 ? '#ffffff' : '#581c87'} className={simStep === 1 ? 'fill-white' : 'dark:fill-purple-200'} fontFamily="monospace">
                      i = 1
                    </text>

                    <line x1="170" y1="74" x2="170" y2="98" stroke="#475569" className="dark:stroke-slate-400" strokeWidth="2.5" markerEnd="url(#m9w-focus-arrow-slate)" />

                    {/* Decision Diamond */}
                    <polygon
                      points="170,98 245,128 170,158 95,128"
                      fill={simStep === 2 ? '#78350f' : '#451a03'}
                      stroke={simStep === 2 ? '#38bdf8' : '#f59e0b'}
                      strokeWidth={simStep === 2 ? '3.5' : '2.5'}
                      className={simStep === 2 ? 'transition-all filter drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]' : 'transition-all'}
                    />
                    <text x="170" y="132" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fde68a" fontFamily="monospace">
                      i &le; 5?
                    </text>

                    {/* Cabang Ya */}
                    <text x="178" y="172" fontSize="10" fontWeight="900" fill="#0d9488" className="dark:fill-teal-400">✓ Ya</text>
                    <line x1="170" y1="158" x2="170" y2="182" stroke="#0d9488" className="dark:stroke-teal-400" strokeWidth={simStep === 3 ? '3.5' : '2.5'} markerEnd="url(#m9w-focus-arrow-teal)" />

                    {/* Output */}
                    <polygon
                      points="105,182 245,182 225,212 85,212"
                      fill={simStep === 3 ? '#3b82f6' : '#eff6ff'}
                      stroke={simStep === 3 ? '#fbbf24' : '#2563eb'}
                      strokeWidth={simStep === 3 ? '3' : '2'}
                      className={simStep === 3 ? 'transition-all filter drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'dark:fill-blue-950/80 dark:stroke-blue-400 transition-all'}
                    />
                    <text x="165" y="201" textAnchor="middle" fontSize="12" fontWeight="900" fill={simStep === 3 ? '#ffffff' : '#1e3a8a'} className={simStep === 3 ? 'fill-white' : 'dark:fill-blue-200'} fontFamily="monospace">
                      output(i)
                    </text>

                    <line x1="165" y1="212" x2="165" y2="230" stroke="#475569" className="dark:stroke-slate-400" strokeWidth="2.5" markerEnd="url(#m9w-focus-arrow-slate)" />

                    {/* Update i = i + 1 */}
                    <rect
                      x="105"
                      y="230"
                      width="120"
                      height="28"
                      rx="6"
                      fill={simStep === 3 ? '#d97706' : '#fffbeb'}
                      stroke={simStep === 3 ? '#fbbf24' : '#d97706'}
                      strokeWidth={simStep === 3 ? '3' : '2'}
                      className={simStep === 3 ? 'transition-all filter drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]' : 'dark:fill-amber-950/80 dark:stroke-amber-400 transition-all'}
                    />
                    <text x="165" y="248" textAnchor="middle" fontSize="12" fontWeight="900" fill={simStep === 3 ? '#ffffff' : '#92400e'} className={simStep === 3 ? 'fill-white' : 'dark:fill-amber-200'} fontFamily="monospace">
                      i = i + 1
                    </text>

                    {/* Loopback */}
                    <polyline
                      points="165,258 165,280 32,280 32,88 162,88"
                      fill="none"
                      stroke="#0d9488"
                      className="dark:stroke-teal-400"
                      strokeWidth={simStep === 4 ? '3.5' : '2.5'}
                      strokeDasharray={simStep === 4 ? '4,4' : undefined}
                      markerEnd="url(#m9w-focus-arrow-teal)"
                    />
                    <text x="26" y="200" textAnchor="end" fontSize="10" fontWeight="900" fill="#0d9488" className="dark:fill-teal-400">Loopback</text>

                    {/* Cabang Tidak */}
                    <polyline
                      points="245,128 305,128 305,308 184,308"
                      fill="none"
                      stroke="#e11d48"
                      className="dark:stroke-rose-400"
                      strokeWidth={simStep === 5 ? '3.5' : '2.5'}
                      markerEnd="url(#m9w-focus-arrow-slate)"
                    />
                    <text x="252" y="120" fontSize="10" fontWeight="900" fill="#e11d48" className="dark:fill-rose-400">✗ Tidak</text>

                    {/* Connector A */}
                    <circle cx="170" cy="308" r="12" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
                    <text x="170" y="312" textAnchor="middle" fontSize="10" fontWeight="900" fill="#ffffff">A</text>

                    <line x1="170" y1="320" x2="170" y2="338" stroke="#475569" className="dark:stroke-slate-400" strokeWidth="2.5" markerEnd="url(#m9w-focus-arrow-slate)" />

                    {/* SELESAI */}
                    <rect x="120" y="338" width="100" height="24" rx="12" fill="#881337" stroke="#f43f5e" strokeWidth="2" className="dark:fill-rose-950/90" />
                    <text x="170" y="354" textAnchor="middle" fontSize="11" fontWeight="900" fill="#fecdd3" fontFamily="monospace" letterSpacing="1">SELESAI</text>
                  </svg>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                      Simulasi Alur Interaktif WHILE
                    </span>
                    <h6 className="font-bold text-sm text-slate-900 dark:text-slate-100">{simInfo.title}</h6>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{simInfo.desc}</p>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                    <h6 className="font-bold text-slate-800 dark:text-slate-200">Perbedaan Arsitektur Flowchart vs FOR:</h6>
                    <p>• <strong>Belah Ketupat Mandiri (Decision Diamond):</strong> Tidak seperti FOR yang memakai segi enam persiapan, WHILE mengeksplisitkan kotak inisialisasi awal <code>i = 1</code> di atas belah ketupat kondisi.</p>
                    <p>• <strong>Loopback ke Titik Temu Atas:</strong> Jalur putar balik masuk kembali di antara kotak inisialisasi dan belah ketupat, sehingga nilai awal tidak ter-reset ulang.</p>
                    <p>• <strong>Kotak Kenaikan di Badan Loop:</strong> Pembaruan <code>i = i + 1</code> tergambar eksplisit di badan cabang benar.</p>
                  </div>
                </div>
              </div>
            )}

            {focusTab === 'pseudocode' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  <h5 className="font-extrabold text-base text-slate-950 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span>Notasi Pseudocode Baku WHILE (CLRS)</span>
                  </h5>
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 font-mono text-sm leading-relaxed">
                    <pre className="text-slate-800 dark:text-slate-200 whitespace-pre">
<span className="text-purple-700 dark:text-purple-400 font-bold">PROGRAM</span> CetakDeretWhile <span className="text-slate-500 italic text-xs">// Mencetak deret 1 s.d. 5</span>{'\n'}
<span className="text-sky-700 dark:text-sky-400 font-bold">KAMUS:</span>{'\n'}
{'  '}i : integer{'\n\n'}
<span className="text-amber-700 dark:text-amber-400 font-bold">ALGORITMA:</span>{'\n'}
{'  '}<span className="text-purple-700 dark:text-purple-400 font-bold">i = 1</span>{'\n'}
{'  '}<span className="text-teal-700 dark:text-teal-400 font-bold">while</span> i &lt;= 5 <span className="text-teal-700 dark:text-teal-400 font-bold">do</span>{'\n'}
{'    '}<span className="text-blue-700 dark:text-blue-400 font-bold">output</span>(i){'\n'}
{'    '}<span className="text-amber-700 dark:text-amber-400 font-bold">i = i + 1</span>{'\n'}
{'  '}<span className="text-teal-700 dark:text-teal-400 font-bold">endwhile</span>
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
                      <p className="mt-1">Mendefinisikan entitas algoritma menggunakan PascalCase dan tujuan perulangan.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-sky-500/5 dark:bg-sky-500/10 border border-sky-500/20">
                      <strong className="text-sky-700 dark:text-sky-300">Blok KAMUS:</strong>
                      <p className="mt-1">Pencacah dideklarasikan dengan tipe data terikat (<code>i : integer</code>).</p>
                    </div>
                    <div className="p-3 rounded-xl bg-teal-500/5 dark:bg-teal-500/10 border border-teal-500/20">
                      <strong className="text-teal-700 dark:text-teal-300">Blok ALGORITMA:</strong>
                      <p className="mt-1">Konstruksi <code>while &lt;kondisi&gt; do</code> wajib berpasangan dengan penutup <code>endwhile</code> pada level indentasi yang lurus.</p>
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
<span className="text-slate-500 italic text-xs"># 1. Inisialisasi awal variabel</span>{'\n'}
i = <span className="text-amber-400 font-bold">1</span>{'\n\n'}
<span className="text-slate-500 italic text-xs"># 2. Uji kondisi sebelum putaran</span>{'\n'}
<span className="text-teal-400 font-bold">while</span> i &lt;= <span className="text-amber-400 font-bold">5</span>:{'\n'}
{'    '}<span className="text-sky-300">print</span>(<span className="text-emerald-300">f&quot;Putaran ke-&#123;i&#125;: angka &#123;i&#125;&quot;</span>){'\n'}
{'    '}<span className="text-slate-500 italic text-xs"># 3. Kenaikan nilai pencacah (wajib!)</span>{'\n'}
{'    '}i += <span className="text-amber-400 font-bold">1</span>
                        </pre>
                      ) : (
                        <pre className="text-slate-200 whitespace-pre">
<span className="text-slate-500 italic text-xs">// 1. Inisialisasi awal variabel</span>{'\n'}
<span className="text-rose-400 font-bold">let</span> i = <span className="text-amber-400 font-bold">1</span>;{'\n\n'}
<span className="text-slate-500 italic text-xs">// 2. Uji kondisi sebelum putaran</span>{'\n'}
<span className="text-teal-400 font-bold">while</span> (i &lt;= <span className="text-amber-400 font-bold">5</span>) &#123;{'\n'}
{'    '}<span className="text-sky-300">console</span>.log(<span className="text-emerald-300">`Putaran ke-$&#123;i&#125;: angka $&#123;i&#125;`</span>);{'\n'}
{'    '}<span className="text-slate-500 italic text-xs">// 3. Kenaikan nilai pencacah (wajib!)</span>{'\n'}
{'    '}i++;{'\n'}
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
                    <h6 className="font-bold text-slate-900 dark:text-slate-100">Analisis Sintaks WHILE:</h6>
                    <div className="p-3 rounded-xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 space-y-1">
                      <strong className="text-blue-700 dark:text-blue-300">Sintaks Python:</strong>
                      <p>Blok perulangan ditentukan oleh tanda titik dua <code>:</code> dan indentasi 4 spasi. Operator augmentasi <code>i += 1</code> digunakan untuk pembaruan counter.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-1">
                      <strong className="text-amber-700 dark:text-amber-300">Sintaks JavaScript:</strong>
                      <p>Kondisi wajib berada di dalam kurung lengkung <code>while (...)</code> dan badan perulangan dibungkus kurung kurawal <code>&#123; ... &#125;</code>. Operator <code>i++</code> menaikkan nilai sebesar 1.</p>
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
