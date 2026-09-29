"use client";

import React, { useState } from 'react';
import { GitCommit, Circle, Square, Hexagon, ArrowRight, Cog, LayoutGrid, RectangleHorizontal, RotateCw, CheckCircle2, AlertTriangle, Workflow, Sparkles, ShieldCheck, Layers, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FlipCard = ({ sym }: { sym: any }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`relative z-0 hover:z-50 w-full h-full min-h-[220px] cursor-pointer group/flip hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center select-none ${
        sym.fullWidth ? 'sm:col-span-2' : ''
      }`}
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isFlipped ? (
          <motion.div
            key="front"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className={`w-full h-full p-5 rounded-2xl border-2 bg-card dark:bg-slate-950 flex flex-col items-center text-center gap-3 ${sym.color} shadow-sm dark:shadow-md hover:shadow-2xl dark:group-hover/flip:shadow-[0_25px_50px_rgba(0,0,0,0.85)] transition-colors duration-200`}
          >
            <div className="absolute top-3 right-3 text-emerald-600 dark:text-emerald-400 group-hover/flip:rotate-90 transition-transform duration-300">
              <RotateCw className="w-4 h-4" />
            </div>

            <div className="h-14 flex items-center justify-center filter group-hover/flip:drop-shadow-[0_0_8px_rgba(0,0,0,0.15)] dark:group-hover/flip:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              {sym.icon}
            </div>
            <div>
              <h5 className="font-black text-sm md:text-base text-foreground mb-1.5">{sym.name}</h5>
              <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed font-bold">{sym.desc}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="w-full h-full p-5 rounded-2xl border-2 border-emerald-500/70 bg-card dark:bg-slate-950 text-foreground dark:text-slate-100 shadow-xl group-hover/flip:shadow-[0_25px_50px_rgba(16,185,129,0.35)] flex flex-col items-center justify-center"
          >
            <div className="absolute top-3 right-3 text-emerald-600 dark:text-emerald-400 group-hover/flip:-rotate-90 transition-transform duration-300 z-10">
              <RotateCw className="w-4 h-4" />
            </div>
            
            <span className="text-xs text-emerald-800 dark:text-emerald-300 mb-3 font-extrabold tracking-widest border-b-2 border-emerald-500/40 pb-1 px-4 text-center uppercase">CONTOH PENERAPAN</span>
            <div className="flex-1 flex items-center justify-center w-full">
              {sym.example}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FlowchartDefinitionCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [demoScore, setDemoScore] = useState<number>(85);
  const isTrue = demoScore >= 75;

  return (
    <div
      className="relative z-0 hover:z-50 w-full min-h-[250px] cursor-pointer group/flip hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center select-none"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isFlipped ? (
          <motion.div
            key="front"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="w-full h-full p-6 md:p-7 rounded-2xl border-2 border-blue-500/40 bg-card dark:bg-slate-950 flex flex-col justify-between shadow-sm dark:shadow-md hover:shadow-2xl dark:group-hover/flip:shadow-[0_25px_50px_rgba(0,0,0,0.85)] hover:border-blue-500 transition-colors duration-200"
          >
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/60">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                    <Workflow className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg md:text-xl text-foreground tracking-tight">
                      Definisi Formal Flowchart (Diagram Alir)
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Standar Baku ANSI / ISO untuk Pemodelan Algoritma Grafis
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-extrabold group-hover/flip:text-blue-700 dark:group-hover/flip:text-blue-300">
                  <span className="hidden sm:inline">Klik visualisasi simbol</span>
                  <RotateCw className="w-4 h-4 group-hover/flip:rotate-90 transition-transform" />
                </div>
              </div>

              <p className="text-sm md:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium mb-4">
                <strong className="text-blue-600 dark:text-blue-400 font-black bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                  Flowchart (Diagram Alir)
                </strong>{' '}
                adalah{' '}
                <strong className="text-foreground font-black underline decoration-blue-500 decoration-2 underline-offset-4">
                  representasi grafis atau bagan alir
                </strong>{' '}
                dari suatu algoritma yang mendeskripsikan secara eksplisit urutan langkah-langkah penyelesaian masalah menggunakan{' '}
                <strong className="text-emerald-700 dark:text-emerald-300 font-black bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/25">
                  simbol-simbol geometri yang terstandarisasi (ANSI/ISO)
                </strong>
                .
              </p>
            </div>

            {/* 3 Pilar Esensial Flowchart */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-border/50">
              <div className="p-3 rounded-xl bg-blue-500/5 dark:bg-blue-950/20 border border-blue-500/20 space-y-1">
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Visual &amp; Intuitif</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  Menggantikan abstraksi teks narasi menjadi pemodelan alur logika 2 dimensi yang mudah dipindai mata manusia.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>Standar Geometri Baku</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  Bentuk geometri terikat kaidah internasional resmi: Terminator, Jajar Genjang I/O, Belah Ketupat, dan Persegi Panjang.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-purple-500/5 dark:bg-purple-950/20 border border-purple-500/20 space-y-1">
                <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-bold text-xs">
                  <Layers className="w-3.5 h-3.5 shrink-0" />
                  <span>Cetak Biru Logika</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  Memetakan titik percabangan True/False dan pengulangan secara gamblang sebelum sintaks program ditulis.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="w-full h-full p-6 md:p-7 rounded-2xl border-2 border-emerald-500/70 bg-card dark:bg-slate-950 text-foreground dark:text-slate-100 flex flex-col justify-between shadow-xl group-hover/flip:shadow-[0_25px_50px_rgba(16,185,129,0.35)] transition-colors duration-200"
          >
            <div>
              {/* Header Kartu Sisi Belakang */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/60">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    <Workflow className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg md:text-xl text-foreground tracking-tight">
                      Visualisasi: Algoritma Dinyatakan dalam Simbol Baku
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Membuktikan bahwa Flowchart adalah algoritma konkret yang ditransformasikan ke dalam simbol geometri ANSI/ISO
                    </p>
                  </div>
                </div>
                <div 
                  className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-extrabold group-hover/flip:text-emerald-700 dark:group-hover/flip:text-emerald-300 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                >
                  <span className="hidden sm:inline">Klik balik definisi</span>
                  <RotateCw className="w-4 h-4 group-hover/flip:-rotate-90 transition-transform" />
                </div>
              </div>

              {/* Bilah Uji Interaktif Eksekusi Algoritma */}
              <div 
                className="flex items-center justify-between flex-wrap gap-2 mb-3 bg-muted/60 dark:bg-slate-900/80 p-2 px-3 rounded-xl border border-border/60"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                  <span className="p-1 rounded-md bg-blue-500/20 text-blue-600 dark:text-blue-400">
                    <PlayCircle className="w-3.5 h-3.5" />
                  </span>
                  <span>Uji Eksekusi Algoritma (Studi Kasus: Kelulusan Nilai):</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground font-semibold">Pilih Nilai Masukan:</span>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setDemoScore(85); }}
                    className={`px-3 py-1 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 border ${
                      isTrue
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-500/30'
                        : 'bg-card text-muted-foreground border-border hover:text-foreground'
                    }`}
                  >
                    <span>nilai = 85</span>
                    <span className="text-[10px] font-semibold opacity-90">(Cabang True)</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setDemoScore(60); }}
                    className={`px-3 py-1 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 border ${
                      !isTrue
                        ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-500/30'
                        : 'bg-card text-muted-foreground border-border hover:text-foreground'
                    }`}
                  >
                    <span>nilai = 60</span>
                    <span className="text-[10px] font-semibold opacity-90">(Cabang False)</span>
                  </button>
                </div>
              </div>

              {/* Diagram Flowchart SVG Horisontal ANSI/ISO */}
              <div className="p-3 bg-background/90 dark:bg-slate-950/80 rounded-2xl border border-border/70 shadow-inner overflow-x-auto">
                <svg
                  viewBox="0 0 590 195"
                  className="w-full h-auto min-w-[540px] max-h-[220px]"
                  style={{ overflow: 'visible' }}
                >
                  {/* --- 1. SIMBOL TERMINATOR (MULAI) --- */}
                  <g className="cursor-default">
                    <text x="44" y="65" textAnchor="middle" fill="#0284c7" fontWeight="900" fontSize="8.5" letterSpacing="0.5">
                      TERMINATOR
                    </text>
                    <rect
                      x="10"
                      y="75"
                      width="68"
                      height="34"
                      rx="17"
                      fill="#0284c7"
                      stroke="#38bdf8"
                      strokeWidth="2"
                    />
                    <text
                      x="44"
                      y="96"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontWeight="900"
                      fontSize="11"
                      fontFamily="system-ui, sans-serif"
                    >
                      MULAI
                    </text>
                  </g>

                  {/* Panah 1: MULAI -> INPUT */}
                  <line x1="78" y1="92" x2="106" y2="92" stroke="#0284c7" strokeWidth="2.5" />
                  <polygon points="99,88 106,92 99,96" fill="#0284c7" />

                  {/* --- 2. SIMBOL JAJAR GENJANG (INPUT) --- */}
                  <g className="cursor-default">
                    <text x="152" y="65" textAnchor="middle" fill="#2563eb" fontWeight="900" fontSize="8.5" letterSpacing="0.5">
                      MASUKAN (I/O)
                    </text>
                    <polygon
                      points="118,75 198,75 186,109 106,109"
                      className="fill-blue-50 dark:fill-blue-950/70"
                      stroke="#2563eb"
                      strokeWidth="2"
                    />
                    <text
                      x="152"
                      y="91"
                      textAnchor="middle"
                      className="fill-blue-950 dark:fill-blue-100"
                      fontWeight="900"
                      fontFamily="monospace"
                      fontSize="10.5"
                    >
                      input(nilai)
                    </text>
                    <text
                      x="152"
                      y="103"
                      textAnchor="middle"
                      className="fill-blue-600 dark:fill-blue-300"
                      fontWeight="900"
                      fontSize="8.5"
                      fontFamily="monospace"
                    >
                      nilai = {demoScore}
                    </text>
                  </g>

                  {/* Panah 2: INPUT -> DECISION */}
                  <line x1="198" y1="92" x2="224" y2="92" stroke="#2563eb" strokeWidth="2.5" />
                  <polygon points="217,88 224,92 217,96" fill="#2563eb" />

                  {/* --- 3. SIMBOL BELAH KETUPAT (DECISION ANSI/ISO) --- */}
                  <g className="cursor-default">
                    <text x="272" y="55" textAnchor="middle" fill="#d97706" fontWeight="900" fontSize="8.5" letterSpacing="0.5">
                      KEPUTUSAN (IF)
                    </text>
                    {/* Belah Ketupat Baku: Latar #451a03, Border #f59e0b, Teks #fde68a font-black */}
                    <polygon
                      points="272,62 318,92 272,122 226,92"
                      fill="#451a03"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                    />
                    <text
                      x="272"
                      y="92"
                      textAnchor="middle"
                      fill="#fde68a"
                      fontWeight="900"
                      fontFamily="monospace"
                      fontSize="10"
                    >
                      nilai &gt;= 75
                    </text>

                    {/* Badge Evaluasi Dinamis di Bawah Kondisi */}
                    {isTrue ? (
                      <g>
                        <rect x="242" y="103" width="60" height="13" rx="6.5" fill="#064e3b" stroke="#059669" strokeWidth="1" />
                        <text x="272" y="112" textAnchor="middle" fill="#a7f3d0" fontWeight="900" fontSize="8">
                          ✓ TRUE (Ya)
                        </text>
                      </g>
                    ) : (
                      <g>
                        <rect x="242" y="103" width="60" height="13" rx="6.5" fill="#881337" stroke="#e11d48" strokeWidth="1" />
                        <text x="272" y="112" textAnchor="middle" fill="#fecdd3" fontWeight="900" fontSize="8">
                          ✗ FALSE (Tidak)
                        </text>
                      </g>
                    )}
                  </g>

                  {/* --- CABANG YA (TRUE) - JALUR ATAS --- */}
                  <path
                    d="M 272 62 L 272 38 L 344 38"
                    fill="none"
                    stroke={isTrue ? "#10b981" : "#94a3b8"}
                    strokeWidth={isTrue ? "2.5" : "1.5"}
                    strokeDasharray={isTrue ? "none" : "4 3"}
                    opacity={isTrue ? 1 : 0.35}
                    className={isTrue ? "animate-pulse" : ""}
                  />
                  <polygon
                    points="337,34 344,38 337,42"
                    fill={isTrue ? "#10b981" : "#94a3b8"}
                    opacity={isTrue ? 1 : 0.35}
                  />
                  <text
                    x="280"
                    y="31"
                    fill={isTrue ? "#059669" : "#94a3b8"}
                    opacity={isTrue ? 1 : 0.45}
                    fontWeight="900"
                    fontSize="9"
                  >
                    {isTrue ? "✓ Ya (True)" : "✗ Ya (Dilewati)"}
                  </text>

                  {/* Output True (Jajar Genjang LULUS) */}
                  <g className="cursor-default" opacity={isTrue ? 1 : 0.35}>
                    <polygon
                      points="356,21 446,21 434,55 344,55"
                      className={isTrue ? "fill-emerald-50 dark:fill-emerald-950/80 stroke-emerald-600 dark:stroke-emerald-400" : "fill-slate-100 dark:fill-slate-900/40 stroke-slate-300 dark:stroke-slate-700"}
                      strokeWidth={isTrue ? "2.5" : "1.5"}
                    />
                    <text
                      x="395"
                      y="34"
                      textAnchor="middle"
                      className={isTrue ? "fill-emerald-950 dark:fill-emerald-100 font-black" : "fill-slate-400 dark:fill-slate-500 font-medium"}
                      fontFamily="monospace"
                      fontSize="9.5"
                    >
                      output(&quot;LULUS&quot;)
                    </text>
                    <text
                      x="395"
                      y="47"
                      textAnchor="middle"
                      fill={isTrue ? "#047857" : "#94a3b8"}
                      fontWeight="900"
                      fontSize="7.5"
                    >
                      {isTrue ? "✓ DIJALANKAN" : "🚫 DILEWATI"}
                    </text>
                  </g>

                  {/* Jalur dari Output True ke Lingkaran Konektor */}
                  <path
                    d="M 446 38 L 478 38 L 478 84"
                    fill="none"
                    stroke={isTrue ? "#10b981" : "#94a3b8"}
                    strokeWidth={isTrue ? "2.5" : "1.5"}
                    strokeDasharray={isTrue ? "none" : "4 3"}
                    opacity={isTrue ? 1 : 0.35}
                  />
                  <polygon
                    points="474,78 478,85 482,78"
                    fill={isTrue ? "#10b981" : "#94a3b8"}
                    opacity={isTrue ? 1 : 0.35}
                  />

                  {/* --- CABANG TIDAK (FALSE) - JALUR BAWAH --- */}
                  <path
                    d="M 272 122 L 272 146 L 344 146"
                    fill="none"
                    stroke={!isTrue ? "#f43f5e" : "#94a3b8"}
                    strokeWidth={!isTrue ? "2.5" : "1.5"}
                    strokeDasharray={!isTrue ? "none" : "4 3"}
                    opacity={!isTrue ? 1 : 0.35}
                    className={!isTrue ? "animate-pulse" : ""}
                  />
                  <polygon
                    points="337,142 344,146 337,150"
                    fill={!isTrue ? "#f43f5e" : "#94a3b8"}
                    opacity={!isTrue ? 1 : 0.35}
                  />
                  <text
                    x="280"
                    y="158"
                    fill={!isTrue ? "#e11d48" : "#94a3b8"}
                    opacity={!isTrue ? 1 : 0.45}
                    fontWeight="900"
                    fontSize="9"
                  >
                    {!isTrue ? "✓ Tidak (False)" : "✗ Tidak (Dilewati)"}
                  </text>

                  {/* Output False (Jajar Genjang REMEDIAL) */}
                  <g className="cursor-default" opacity={!isTrue ? 1 : 0.35}>
                    <polygon
                      points="356,129 458,129 446,163 344,163"
                      className={!isTrue ? "fill-rose-50 dark:fill-rose-950/80 stroke-rose-600 dark:stroke-rose-400" : "fill-slate-100 dark:fill-slate-900/40 stroke-slate-300 dark:stroke-slate-700"}
                      strokeWidth={!isTrue ? "2.5" : "1.5"}
                    />
                    <text
                      x="401"
                      y="142"
                      textAnchor="middle"
                      className={!isTrue ? "fill-rose-950 dark:fill-rose-100 font-black" : "fill-slate-400 dark:fill-slate-500 font-medium"}
                      fontFamily="monospace"
                      fontSize="9.5"
                    >
                      output(&quot;REMEDIAL&quot;)
                    </text>
                    <text
                      x="401"
                      y="155"
                      textAnchor="middle"
                      fill={!isTrue ? "#be123c" : "#94a3b8"}
                      fontWeight="900"
                      fontSize="7.5"
                    >
                      {!isTrue ? "✓ DIJALANKAN" : "🚫 DILEWATI"}
                    </text>
                  </g>

                  {/* Jalur dari Output False ke Lingkaran Konektor */}
                  <path
                    d="M 458 146 L 478 146 L 478 100"
                    fill="none"
                    stroke={!isTrue ? "#f43f5e" : "#94a3b8"}
                    strokeWidth={!isTrue ? "2.5" : "1.5"}
                    strokeDasharray={!isTrue ? "none" : "4 3"}
                    opacity={!isTrue ? 1 : 0.35}
                  />
                  <polygon
                    points="474,106 478,99 482,106"
                    fill={!isTrue ? "#f43f5e" : "#94a3b8"}
                    opacity={!isTrue ? 1 : 0.35}
                  />

                  {/* --- 4. LINGKARAN KONEKTOR (MERGE NODE) --- */}
                  <g className="cursor-default">
                    <circle cx="478" cy="92" r="7.5" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                    <text x="478" y="72" textAnchor="middle" fill="#0284c7" fontWeight="900" fontSize="8">
                      KONEKTOR
                    </text>
                  </g>

                  {/* Panah ke SELESAI */}
                  <line x1="485.5" y1="92" x2="514" y2="92" stroke="#0284c7" strokeWidth="2.5" />
                  <polygon points="507,88 514,92 507,96" fill="#0284c7" />

                  {/* --- 5. SIMBOL TERMINATOR (SELESAI) --- */}
                  <g className="cursor-default">
                    <text x="550" y="65" textAnchor="middle" fill="#0284c7" fontWeight="900" fontSize="8.5" letterSpacing="0.5">
                      TERMINATOR
                    </text>
                    <rect
                      x="514"
                      y="75"
                      width="72"
                      height="34"
                      rx="17"
                      fill="#0284c7"
                      stroke="#38bdf8"
                      strokeWidth="2"
                    />
                    <text
                      x="550"
                      y="96"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontWeight="900"
                      fontSize="11"
                      fontFamily="system-ui, sans-serif"
                    >
                      SELESAI
                    </text>
                  </g>
                </svg>
              </div>

              {/* 4 Pilar Pembuktian: Mengapa Flowchart Dinyatakan dengan Simbol? */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 mt-2 border-t border-border/50">
                <div className="p-2.5 rounded-xl bg-slate-500/10 dark:bg-slate-900/40 border border-slate-500/20 text-center space-y-0.5">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-slate-500/20 text-slate-700 dark:text-slate-300 font-black text-[10px]">
                    Terminator (Kapsul)
                  </span>
                  <p className="text-[11px] text-slate-800 dark:text-slate-200 font-bold leading-tight">
                    Titik Awal &amp; Akhir
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Menjamin kepastian batas eksekusi algoritma.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-blue-500/10 dark:bg-blue-950/40 border border-blue-500/20 text-center space-y-0.5">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 font-black text-[10px]">
                    Jajar Genjang (I/O)
                  </span>
                  <p className="text-[11px] text-blue-800 dark:text-blue-200 font-bold leading-tight">
                    Interaksi Masukan / Keluaran
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Sintaks universal: input() dan output().
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/20 text-center space-y-0.5">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-black text-[10px]">
                    Belah Ketupat (Decision)
                  </span>
                  <p className="text-[11px] text-amber-800 dark:text-amber-200 font-bold leading-tight">
                    Seleksi Kondisi (If-Else)
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Mengevaluasi logika True atau False.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-500/10 dark:bg-purple-950/40 border border-purple-500/20 text-center space-y-0.5">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 font-black text-[10px]">
                    Garis Alir &amp; Konektor
                  </span>
                  <p className="text-[11px] text-purple-800 dark:text-purple-200 font-bold leading-tight">
                    Alur Instruksi Sekuensial
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Arah pemrosesan mesin tanpa lompatan.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Penutup Pedagogis */}
            <div className="mt-3 pt-2.5 border-t border-emerald-500/20 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              <span>Prinsip: Flowchart adalah algoritma konkret yang diformulasikan ke dalam simbol grafis presisi.</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">ANSI / ISO X3.5 Standard</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function DetailedFlowchart() {
  const symbols = [
    {
      name: "Terminator",
      icon: (
        <div className="w-24 h-9 px-3 rounded-[2rem] border-2 border-emerald-600 dark:border-emerald-400 bg-emerald-500/15 dark:bg-emerald-500/25 flex items-center justify-center shadow-xs">
          <span className="text-xs font-black text-emerald-950 dark:text-emerald-200">START/STOP</span>
        </div>
      ),
      desc: "Menandakan titik awal atau akhir dari sebuah algoritma.",
      color: "border-emerald-500/40",
      example: (
        <div className="flex flex-col items-center gap-0">
          <div className="px-3.5 py-1.5 rounded-full border-2 border-emerald-600 dark:border-emerald-400 bg-emerald-500/15 dark:bg-emerald-500/25 text-xs text-emerald-950 dark:text-emerald-200 font-black shadow-xs">START</div>
          <div className="flex flex-col items-center -my-0.5 z-10">
            <div className="w-[2px] h-3 bg-slate-600 dark:bg-slate-400"></div>
            <ArrowRight className="w-4 h-4 text-slate-600 dark:text-slate-400 rotate-90 -mt-1.5" />
          </div>
          <div className="px-3.5 py-1.5 rounded-full border-2 border-emerald-600 dark:border-emerald-400 bg-emerald-500/15 dark:bg-emerald-500/25 text-xs text-emerald-950 dark:text-emerald-200 font-black shadow-xs">STOP</div>
        </div>
      )
    },
    {
      name: "Input / Output",
      icon: (
        <div className="w-24 h-9 px-3 border-2 border-blue-600 dark:border-blue-400 bg-blue-500/15 dark:bg-blue-500/25 skew-x-[-20deg] flex items-center justify-center shadow-xs">
          <span className="text-xs font-black text-blue-950 dark:text-blue-200 skew-x-[20deg]">I/O</span>
        </div>
      ),
      desc: "Operasi membaca data (Input) atau menampilkan data (Output).",
      color: "border-blue-500/40",
      example: (
        <div className="flex flex-col items-center gap-0">
          {/* Arrow from above */}
          <div className="flex flex-col items-center -mb-0.5 z-10 opacity-80">
            <div className="w-[2px] h-2.5 bg-slate-600 dark:bg-slate-400"></div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400 rotate-90 -mt-1.5" />
          </div>

          <div className="group/io relative cursor-pointer px-4 py-1.5 border-2 border-blue-600 dark:border-blue-400 bg-blue-500/15 dark:bg-blue-500/25 skew-x-[-15deg] text-xs text-blue-950 dark:text-blue-100 font-black shadow-xs">
            <span className="block skew-x-[15deg] group-hover/io:hidden text-center leading-tight">input(panjang)<br/>input(lebar)</span>
            <span className="hidden group-hover/io:block skew-x-[15deg] text-center text-emerald-900 dark:text-emerald-200 font-black">input(panjang, lebar)</span>
          </div>

          <div className="flex flex-col items-center -my-0.5 z-10">
            <div className="w-[2px] h-3 bg-slate-600 dark:bg-slate-400"></div>
            <ArrowRight className="w-4 h-4 text-slate-600 dark:text-slate-400 rotate-90 -mt-1.5" />
          </div>

          <div className="px-4 py-1.5 border-2 border-blue-600 dark:border-blue-400 bg-blue-500/15 dark:bg-blue-500/25 skew-x-[-15deg] text-xs text-blue-950 dark:text-blue-100 font-black shadow-xs">
            <span className="block skew-x-[15deg]">output(luas)</span>
          </div>

          {/* Arrow to below */}
          <div className="flex flex-col items-center -mt-0.5 z-10 opacity-80">
            <div className="w-[2px] h-2.5 bg-slate-600 dark:bg-slate-400"></div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400 rotate-90 -mt-1.5" />
          </div>
        </div>
      )
    },
    {
      name: "Process",
      icon: (
        <div className="w-24 h-9 px-3 border-2 border-amber-600 dark:border-amber-400 bg-amber-500/15 dark:bg-amber-500/25 flex items-center justify-center shadow-xs">
          <span className="text-xs font-black text-amber-950 dark:text-amber-200">PROSES</span>
        </div>
      ),
      desc: "Menandakan proses perhitungan, pengolahan data, atau assignment variabel.",
      color: "border-amber-500/40",
      example: (
        <div className="flex flex-col items-center gap-0">
          {/* Arrow from above */}
          <div className="flex flex-col items-center -mb-0.5 z-10 opacity-80">
            <div className="w-[2px] h-2.5 bg-slate-600 dark:bg-slate-400"></div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400 rotate-90 -mt-1.5" />
          </div>

          <div className="px-3.5 py-2 border-2 border-amber-600 dark:border-amber-400 bg-amber-500/15 dark:bg-amber-500/25 text-xs text-amber-950 dark:text-amber-100 font-black whitespace-nowrap rounded shadow-xs">
            luas = panjang * lebar
          </div>

          {/* Arrow to below */}
          <div className="flex flex-col items-center -mt-0.5 z-10 opacity-80">
            <div className="w-[2px] h-2.5 bg-slate-600 dark:bg-slate-400"></div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400 rotate-90 -mt-1.5" />
          </div>
        </div>
      )
    },
    {
      name: "Decision",
      icon: (
        <div className="w-12 h-12 border-2 border-purple-600 dark:border-purple-400 bg-purple-500/15 dark:bg-purple-500/25 rotate-45 flex items-center justify-center shadow-xs">
          <span className="text-xs font-black text-purple-950 dark:text-purple-200 -rotate-45">IF</span>
        </div>
      ),
      desc: "Titik percabangan (Ya/Tidak) berdasarkan suatu kondisi/evaluasi logika.",
      color: "border-purple-500/40",
      example: (
        <div className="flex flex-col items-center justify-center w-full py-1">
          <svg viewBox="75 0 285 215" className="w-full max-w-[340px] h-auto overflow-visible" textRendering="geometricPrecision">
            <defs>
              <marker id="arrow-slate-dec" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" className="dark:fill-slate-400" />
              </marker>
              <marker id="arrow-emerald-dec" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" className="dark:fill-emerald-400" />
              </marker>
              <marker id="arrow-rose-dec" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#e11d48" className="dark:fill-rose-400" />
              </marker>
            </defs>

            {/* 1. Panah Masuk dari Atas ke Ujung Belah Ketupat */}
            <line x1="150" y1="2" x2="150" y2="20" stroke="#475569" className="dark:stroke-slate-400" strokeWidth="2.5" markerEnd="url(#arrow-slate-dec)" />

            {/* 2. Belah Ketupat Decision (Pedoman Spesifikasi: Latar Cokelat Pekat #451a03 dengan Teks Kuning Keemasan Font-Black) */}
            <polygon points="150,20 188,50 150,80 112,50" fill="#451a03" stroke="#f59e0b" strokeWidth="2.5" />
            <text x="150" y="54" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fde68a" fontFamily="monospace" letterSpacing="0.5">luas &gt; 0?</text>

            {/* 3. Cabang Ya (Ke Bawah) */}
            <text x="142" y="94" textAnchor="end" fontSize="12" fontWeight="900" fill="#059669" className="dark:fill-emerald-400">Ya</text>
            <line x1="150" y1="80" x2="150" y2="102" stroke="#059669" className="dark:stroke-emerald-400" strokeWidth="2.5" markerEnd="url(#arrow-emerald-dec)" />

            {/* Box Proses Logika Benar (X: 85 -> 215) */}
            <rect x="85" y="102" width="130" height="30" rx="6" fill="#ecfdf5" stroke="#059669" strokeWidth="2" className="dark:fill-emerald-950/80 dark:stroke-emerald-400" />
            <text x="150" y="121" textAnchor="middle" fontSize="11" fontWeight="900" fill="#064e3b" className="dark:fill-emerald-200">Proses logika benar</text>

            {/* Panah dari Proses Benar ke Connector A (dari atas) */}
            <line x1="150" y1="132" x2="150" y2="154" stroke="#475569" className="dark:stroke-slate-400" strokeWidth="2.5" markerEnd="url(#arrow-slate-dec)" />

            {/* 4. Cabang Tidak (Ke Kanan lalu ke Bawah) */}
            <text x="198" y="44" fontSize="12" fontWeight="900" fill="#e11d48" className="dark:fill-rose-400">Tidak</text>
            <line x1="188" y1="50" x2="290" y2="50" stroke="#e11d48" className="dark:stroke-rose-400" strokeWidth="2.5" />
            <line x1="290" y1="50" x2="290" y2="102" stroke="#e11d48" className="dark:stroke-rose-400" strokeWidth="2.5" markerEnd="url(#arrow-rose-dec)" />

            {/* Box Proses Logika Salah (X: 230 -> 355) */}
            <rect x="230" y="102" width="125" height="30" rx="6" fill="#fff1f2" stroke="#e11d48" strokeWidth="2" className="dark:fill-rose-950/80 dark:stroke-rose-400" />
            <text x="292.5" y="121" textAnchor="middle" fontSize="11" fontWeight="900" fill="#881337" className="dark:fill-rose-200">Proses logika salah</text>

            {/* Garis dari Proses Salah turun lalu menekuk ke kiri masuk ke Connector A dari samping */}
            <line x1="290" y1="132" x2="290" y2="170" stroke="#475569" className="dark:stroke-slate-400" strokeWidth="2.5" />
            <line x1="290" y1="170" x2="167" y2="170" stroke="#475569" className="dark:stroke-slate-400" strokeWidth="2.5" markerEnd="url(#arrow-slate-dec)" />

            {/* 5. Connector A */}
            <circle cx="150" cy="170" r="15" fill="#0284c7" stroke="#0369a1" strokeWidth="2.5" />
            <text x="150" y="175" textAnchor="middle" fontSize="13" fontWeight="900" fill="#ffffff">A</text>

            {/* 6. Panah Keluar ke Bawah dari Connector A */}
            <line x1="150" y1="185" x2="150" y2="206" stroke="#475569" className="dark:stroke-slate-400" strokeWidth="2.5" markerEnd="url(#arrow-slate-dec)" />
          </svg>
        </div>
      )
    },
    {
      name: "Preparation (Looping FOR)",
      icon: (
        <div 
          className="w-24 h-9 border-2 border-emerald-600 dark:border-emerald-400 bg-emerald-500/15 dark:bg-emerald-500/25 flex items-center justify-center shadow-xs text-xs font-black text-emerald-950 dark:text-emerald-200"
          style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)' }}
        >
          FOR
        </div>
      ),
      desc: "Menandakan inisialisasi dan penentuan variabel kontrol perulangan (terutamanya struktur perulangan FOR).",
      color: "border-emerald-500/40",
      example: (
        <div className="flex flex-col items-center justify-center w-full py-1">
          <svg viewBox="25 0 280 205" className="w-full max-w-[340px] h-auto overflow-visible" textRendering="geometricPrecision">
            <defs>
              <marker id="arrow-slate-prep" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" className="dark:fill-slate-400" />
              </marker>
              <marker id="arrow-emerald-prep" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" className="dark:fill-emerald-400" />
              </marker>
              <marker id="arrow-rose-prep" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#e11d48" className="dark:fill-rose-400" />
              </marker>
            </defs>

            {/* 1. Panah Masuk dari Atas ke Top Hexagon */}
            <line x1="150" y1="2" x2="150" y2="27" stroke="#475569" className="dark:stroke-slate-400" strokeWidth="2.5" markerEnd="url(#arrow-slate-prep)" />

            {/* 2. Hexagon Preparation i = 1 TO 10 */}
            <polygon points="95,27 205,27 225,45 205,63 95,63 75,45" fill="#ecfdf5" stroke="#059669" strokeWidth="2.5" className="dark:fill-emerald-950/80 dark:stroke-emerald-400" />
            <text x="150" y="49" textAnchor="middle" fontSize="12" fontWeight="900" fill="#064e3b" className="dark:fill-emerald-200" fontFamily="monospace">i = 1 TO 10</text>

            {/* 3. Cabang Masuk ke Tubuh Loop (Ulangi) */}
            <text x="157" y="78" fontSize="11" fontWeight="900" fill="#059669" className="dark:fill-emerald-400">Ulangi</text>
            <line x1="150" y1="63" x2="150" y2="88" stroke="#059669" className="dark:stroke-emerald-400" strokeWidth="2.5" markerEnd="url(#arrow-emerald-prep)" />

            {/* Box Tubuh Loop output(i) */}
            <rect x="85" y="88" width="130" height="30" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" className="dark:fill-blue-950/80 dark:stroke-blue-400" />
            <text x="150" y="107" textAnchor="middle" fontSize="12" fontWeight="900" fill="#1e3a8a" className="dark:fill-blue-200" fontFamily="monospace">output(i)</text>

            {/* 4. Jalur Putar Balik (Next i) dari bawah output(i) kembali ke Hexagon */}
            <line x1="150" y1="118" x2="150" y2="134" stroke="#059669" className="dark:stroke-emerald-400" strokeWidth="2.5" />
            <line x1="150" y1="134" x2="45" y2="134" stroke="#059669" className="dark:stroke-emerald-400" strokeWidth="2.5" />
            <line x1="45" y1="134" x2="45" y2="45" stroke="#059669" className="dark:stroke-emerald-400" strokeWidth="2.5" />
            <line x1="45" y1="45" x2="71" y2="45" stroke="#059669" className="dark:stroke-emerald-400" strokeWidth="2.5" markerEnd="url(#arrow-emerald-prep)" />
            <text x="40" y="85" textAnchor="end" fontSize="11" fontWeight="900" fill="#059669" className="dark:fill-emerald-400">Next i</text>

            {/* 5. Cabang Selesai Loop (Ke Kanan lalu ke Connector A) */}
            <text x="226" y="38" fontSize="11" fontWeight="900" fill="#e11d48" className="dark:fill-rose-400">Selesai</text>
            <line x1="225" y1="45" x2="285" y2="45" stroke="#e11d48" className="dark:stroke-rose-400" strokeWidth="2.5" />
            <line x1="285" y1="45" x2="285" y2="155" stroke="#e11d48" className="dark:stroke-rose-400" strokeWidth="2.5" />
            <line x1="285" y1="155" x2="167" y2="155" stroke="#475569" className="dark:stroke-slate-400" strokeWidth="2.5" markerEnd="url(#arrow-slate-prep)" />

            {/* 6. Connector A */}
            <circle cx="150" cy="155" r="15" fill="#0284c7" stroke="#0369a1" strokeWidth="2.5" />
            <text x="150" y="160" textAnchor="middle" fontSize="13" fontWeight="900" fill="#ffffff">A</text>

            {/* 7. Panah Keluar ke Bawah dari Connector A */}
            <line x1="150" y1="170" x2="150" y2="198" stroke="#475569" className="dark:stroke-slate-400" strokeWidth="2.5" markerEnd="url(#arrow-slate-prep)" />
          </svg>
        </div>
      )
    },
    {
      name: "Predefined Process (Function)",
      icon: (
        <div className="w-24 h-9 px-3 border-2 border-rose-600 dark:border-rose-400 bg-rose-500/15 dark:bg-rose-500/25 flex items-center justify-between shadow-xs relative">
          <div className="w-[2px] h-full bg-rose-600 dark:bg-rose-400 absolute left-2 top-0"></div>
          <div className="w-[2px] h-full bg-rose-600 dark:bg-rose-400 absolute right-2 top-0"></div>
          <span className="text-xs font-black text-rose-950 dark:text-rose-200 w-full text-center">FUNC</span>
        </div>
      ),
      desc: "Menandakan pemanggilan subprogram, fungsi, atau prosedur lain yang terpisah.",
      color: "border-rose-500/40",
      example: (
        <div className="flex flex-col items-center gap-0">
          {/* Arrow from above */}
          <div className="flex flex-col items-center -mb-0.5 z-10 opacity-80">
            <div className="w-[2px] h-2.5 bg-slate-600 dark:bg-slate-400"></div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400 rotate-90 -mt-1.5" />
          </div>

          <div className="px-5 py-2 border-2 border-rose-600 dark:border-rose-400 bg-rose-500/15 dark:bg-rose-500/25 relative text-xs text-rose-950 dark:text-rose-100 font-black rounded shadow-xs">
            <div className="w-[2px] h-full bg-rose-600 dark:bg-rose-400 absolute left-2 top-0"></div>
            <div className="w-[2px] h-full bg-rose-600 dark:bg-rose-400 absolute right-2 top-0"></div>
            HitungDiskon()
          </div>

          {/* Arrow to below */}
          <div className="flex flex-col items-center -mt-0.5 z-10 opacity-80">
            <div className="w-[2px] h-2.5 bg-slate-600 dark:bg-slate-400"></div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400 rotate-90 -mt-1.5" />
          </div>
        </div>
      )
    },
    {
      name: "On-Page Connector",
      icon: (
        <div className="w-11 h-11 rounded-full border-2 border-cyan-600 dark:border-cyan-400 bg-cyan-500/15 dark:bg-cyan-500/25 flex items-center justify-center shadow-xs">
          <span className="text-xs font-black text-cyan-950 dark:text-cyan-200">A</span>
        </div>
      ),
      desc: "Menghubungkan bagian flowchart yang terpisah namun masih berada pada halaman yang sama.",
      color: "border-cyan-500/40",
      example: (
        <div className="flex flex-col items-center gap-0">
          <div className="flex flex-col items-center -my-0.5 z-10">
            <div className="w-[2px] h-3 bg-slate-600 dark:bg-slate-400"></div>
            <ArrowRight className="w-4 h-4 text-slate-600 dark:text-slate-400 rotate-90 -mt-1.5" />
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-cyan-600 dark:border-cyan-400 bg-cyan-500/15 dark:bg-cyan-500/25 flex items-center justify-center shadow-xs">
            <span className="text-xs text-cyan-950 dark:text-cyan-100 font-black">A</span>
          </div>
          <span className="text-[10px] text-slate-700 dark:text-slate-300 font-bold mt-1.5">(Lanjut ke A)</span>
        </div>
      )
    },
    {
      name: "Off-Page Connector",
      icon: (
        <div 
          className="w-11 h-12 border-2 border-indigo-600 dark:border-indigo-400 bg-indigo-500/15 dark:bg-indigo-500/25 flex items-center justify-center shadow-xs" 
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}
        >
          <span className="text-xs font-black text-indigo-950 dark:text-indigo-200 mb-1">1</span>
        </div>
      ),
      desc: "Menghubungkan bagian flowchart yang terpisah dan berada pada halaman yang berbeda.",
      color: "border-indigo-500/40",
      example: (
        <div className="flex flex-col items-center gap-0">
          <div className="flex flex-col items-center -my-0.5 z-10">
            <div className="w-[2px] h-3 bg-slate-600 dark:bg-slate-400"></div>
            <ArrowRight className="w-4 h-4 text-slate-600 dark:text-slate-400 rotate-90 -mt-1.5" />
          </div>
          <div 
            className="w-8 h-10 border-2 border-indigo-600 dark:border-indigo-400 bg-indigo-500/15 dark:bg-indigo-500/25 flex items-center justify-center shadow-xs" 
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}
          >
            <span className="text-xs text-indigo-950 dark:text-indigo-100 mb-1 font-black">1</span>
          </div>
          <span className="text-[10px] text-slate-700 dark:text-slate-300 font-bold mt-1.5">(Ke Hal. Lain)</span>
        </div>
      )
    },
    {
      name: "Flow Line",
      fullWidth: true,
      icon: (
        <div className="w-24 h-9 flex items-center justify-center gap-2 text-slate-700 dark:text-slate-300">
          <ArrowRight className="w-4 h-4" />
          <ArrowRight className="w-4 h-4 rotate-90" />
          <ArrowRight className="w-4 h-4 rotate-180" />
          <ArrowRight className="w-4 h-4 -rotate-90" />
        </div>
      ),
      desc: "Tanda panah yang menunjukkan arah aliran eksekusi program (dapat mengalir ke bawah, kanan, kiri, maupun berbalik ke atas).",
      color: "border-slate-500/40",
      example: (
        <div className="flex flex-col items-center justify-center gap-2.5 py-1 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-[360px] text-xs font-black">
            {/* 1. Bawah (Sekuensial) */}
            <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800/90 px-2.5 py-2 rounded-xl border border-border dark:border-slate-700 shadow-xs">
              <span className="text-slate-800 dark:text-slate-200">Sekuensial</span>
              <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                <ArrowRight className="w-4 h-4 rotate-90 shrink-0" />
              </div>
            </div>

            {/* 2. Kanan (Percabangan) */}
            <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800/90 px-2.5 py-2 rounded-xl border border-border dark:border-slate-700 shadow-xs">
              <span className="text-slate-800 dark:text-slate-200">Cabang</span>
              <div className="flex items-center gap-1 text-blue-700 dark:text-blue-400">
                <ArrowRight className="w-4 h-4 shrink-0" />
              </div>
            </div>

            {/* 3. Kiri (Connector) */}
            <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800/90 px-2.5 py-2 rounded-xl border border-border dark:border-slate-700 shadow-xs">
              <span className="text-slate-800 dark:text-slate-200">Connector</span>
              <div className="flex items-center gap-1 text-purple-700 dark:text-purple-400">
                <ArrowRight className="w-4 h-4 rotate-180 shrink-0" />
              </div>
            </div>

            {/* 4. Atas (Looping / Berbalik) */}
            <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800/90 px-2.5 py-2 rounded-xl border border-border dark:border-slate-700 shadow-xs">
              <span className="text-slate-800 dark:text-slate-200">Looping</span>
              <div className="flex items-center gap-1 text-amber-700 dark:text-amber-400">
                <ArrowRight className="w-4 h-4 -rotate-90 shrink-0" />
              </div>
            </div>
          </div>
          <p className="text-[10px] text-slate-600 dark:text-slate-400 font-bold italic text-center">
            Arah panah menentukan arah aliran eksekusi program secara pasti tanpa ambiguitas.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="bg-secondary/10 border border-border/50 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
      <div className="flex items-center gap-4 border-b border-border/50 pb-4">
        <div className="p-3 bg-blue-500/20 rounded-xl text-blue-500 shadow-inner">
          <GitCommit className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-500">2. Flowchart (Diagram Alir)</h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm mt-1 font-medium">Menyajikan algoritma dengan simbol geometris untuk menggambarkan alur logika secara visual.</p>
        </div>
      </div>

      <div className="space-y-8 pt-2">
        {/* 1. BAGIAN A: TEORI & PENJELASAN (KARTU DEFINISI BERDIMENSI GANDA) */}
        <FlowchartDefinitionCard />

        {/* 2. BAGIAN B: KAMUS SIMBOL STANDAR FLOWCHART */}
        <div className="space-y-4 pt-2 border-t border-border/40">
          <h4 className="font-bold flex items-center gap-2 text-blue-600 dark:text-blue-500 text-lg">
            <LayoutGrid className="w-5 h-5" />
            Simbol Standar Flowchart
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {symbols.map((sym, idx) => (
              <FlipCard key={idx} sym={sym} />
            ))}
          </div>
        </div>

        {/* 3. BAGIAN C: CONTOH FLOWCHART UTUH */}
        <div className="space-y-4 pt-4 border-t border-border/40">
          <h4 className="font-bold flex items-center gap-2 text-blue-600 dark:text-blue-500 text-lg">
            <GitCommit className="w-5 h-5" />
            Contoh Penerapan Flowchart Utuh (Studi Kasus: Menghitung Luas Persegi Panjang)
          </h4>
          
          <div 
            className="bg-card dark:bg-slate-900/95 border-2 border-border dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-inner font-mono text-sm md:text-base text-slate-900 dark:text-slate-50 relative min-h-[380px] flex flex-col items-center justify-center gap-4 transition-transform duration-300 ease-out origin-center hover:scale-[1.2] hover:-translate-y-2 hover:z-50 dark:hover:brightness-110 hover:border-blue-500/60 hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] cursor-pointer"
          >
            <p className="text-slate-600 dark:text-slate-400 font-bold absolute top-4 left-6 italic text-left w-full">// Contoh: Flowchart Menghitung Luas (Arahkan kursor untuk memperbesar)</p>
            
            <div className="flex flex-col items-center gap-0 mt-6">
              {/* Start */}
              <div className="px-6 py-2 rounded-full border-2 border-emerald-600 dark:border-emerald-400 bg-emerald-500/15 dark:bg-emerald-500/25 text-emerald-950 dark:text-emerald-100 font-black shadow-xs">START</div>
              <div className="flex flex-col items-center -my-0.5 z-10">
                <div className="w-[2px] h-3.5 bg-slate-600 dark:bg-slate-400"></div>
                <ArrowRight className="w-4 h-4 text-slate-600 dark:text-slate-400 rotate-90 -mt-1.5" />
              </div>
              
              {/* Input */}
              <div className="group/in relative cursor-pointer px-6 py-2 border-2 border-blue-600 dark:border-blue-400 bg-blue-500/15 dark:bg-blue-500/25 text-blue-950 dark:text-blue-100 font-black skew-x-[-15deg] shadow-xs transition-all">
                <span className="block skew-x-[15deg] group-hover/in:hidden text-center leading-tight">
                  input(panjang)<br />input(lebar)
                </span>
                <span className="hidden group-hover/in:block skew-x-[15deg] text-center text-emerald-900 dark:text-emerald-200 font-black">
                  input(panjang, lebar)
                </span>
              </div>
              <div className="flex flex-col items-center -my-0.5 z-10">
                <div className="w-[2px] h-3.5 bg-slate-600 dark:bg-slate-400"></div>
                <ArrowRight className="w-4 h-4 text-slate-600 dark:text-slate-400 rotate-90 -mt-1.5" />
              </div>
              
              {/* Process */}
              <div className="px-6 py-2 border-2 border-amber-600 dark:border-amber-400 bg-amber-500/15 dark:bg-amber-500/25 text-amber-950 dark:text-amber-100 font-black shadow-xs whitespace-nowrap rounded">
                luas = panjang * lebar
              </div>
              <div className="flex flex-col items-center -my-0.5 z-10">
                <div className="w-[2px] h-3.5 bg-slate-600 dark:bg-slate-400"></div>
                <ArrowRight className="w-4 h-4 text-slate-600 dark:text-slate-400 rotate-90 -mt-1.5" />
              </div>
              
              {/* Output */}
              <div className="px-6 py-2 border-2 border-blue-600 dark:border-blue-400 bg-blue-500/15 dark:bg-blue-500/25 text-blue-950 dark:text-blue-100 font-black skew-x-[-15deg] shadow-xs">
                <span className="block skew-x-[15deg]">output(luas)</span>
              </div>
              <div className="flex flex-col items-center -my-0.5 z-10">
                <div className="w-[2px] h-3.5 bg-slate-600 dark:bg-slate-400"></div>
                <ArrowRight className="w-4 h-4 text-slate-600 dark:text-slate-400 rotate-90 -mt-1.5" />
              </div>

              {/* End */}
              <div className="px-6 py-2 rounded-full border-2 border-emerald-600 dark:border-emerald-400 bg-emerald-500/15 dark:bg-emerald-500/25 text-emerald-950 dark:text-emerald-100 font-black shadow-xs">STOP</div>
            </div>
          </div>
        </div>

        {/* 4. BAGIAN D: EVALUASI KEKUATAN & KELEMAHAN FLOWCHART (PENUTUP) */}
        <div className="space-y-3 pt-6 border-t border-border/40">
          <h4 className="font-bold flex items-center gap-2 text-foreground text-base mb-2">
            <Cog className="w-5 h-5 text-amber-500" />
            Evaluasi Penggunaan Flowchart
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kekuatan */}
            <div className="bg-emerald-500/10 dark:bg-emerald-950/40 border-2 border-emerald-500/40 dark:border-emerald-500/30 rounded-2xl p-4 md:p-5 flex gap-3.5 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-extrabold text-sm md:text-base text-emerald-900 dark:text-emerald-300 mb-1.5">Kekuatan (Kelebihan):</h5>
                <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  Sangat efektif untuk menggambarkan alur logika percabangan (IF) dan perulangan (Looping) yang rumit secara visual. Titik awal, urutan eksekusi, hingga titik akhir dapat dilacak dengan jelas oleh siapapun.
                </p>
              </div>
            </div>

            {/* Kelemahan */}
            <div className="bg-rose-500/10 dark:bg-rose-950/40 border-2 border-rose-500/40 dark:border-rose-500/30 rounded-2xl p-4 md:p-5 flex gap-3.5 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-700 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-extrabold text-sm md:text-base text-rose-900 dark:text-rose-300 mb-1.5">Kelemahan (Kekurangan):</h5>
                <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  Kurang praktis untuk program kompleks berukuran besar karena membutuhkan ruang yang sangat luas, serta relatif rumit diperbarui (*maintenance*) jika terjadi modifikasi pada struktur logika program.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
