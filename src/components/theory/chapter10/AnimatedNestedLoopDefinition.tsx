"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Repeat, 
  RotateCw, 
  RotateCcw,
  Sparkles, 
  CheckCircle2, 
  Play, 
  Pause, 
  ArrowRight, 
  Code2, 
  Layers, 
  Cpu, 
  Clock,
  Compass,
  Zap,
  Info
} from 'lucide-react';

export default function AnimatedNestedLoopDefinition() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // 0 .. 11 (Single Source of Truth)

  const TOTAL_OUTER = 3;
  const TOTAL_INNER = 4;
  const TOTAL_STEPS = TOTAL_OUTER * TOTAL_INNER; // 12

  // Nilai outer & inner diturunkan secara deterministik dari step linear (mencegah bug desinkronisasi / double increment)
  const outerStep = Math.floor(currentStepIndex / TOTAL_INNER); // 0, 1, 2
  const innerStep = currentStepIndex % TOTAL_INNER;             // 0, 1, 2, 3
  const totalSteps = currentStepIndex + 1;                      // 1 .. 12

  // Efek simulasi perputaran deterministik jarum jam / gear nested loop
  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % TOTAL_STEPS);
    }, 900);

    return () => clearInterval(timer);
  }, [isRunning, TOTAL_STEPS]);

  return (
    <div className="w-full my-8">
      {/* Container dengan zoom 1.2x standar baku */}
      <div className="relative group transition-transform duration-300 ease-out origin-center hover:scale-[1.03] md:hover:scale-[1.05] z-0 hover:z-30">
        
        {/* Glow ambient background */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-sky-500/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="relative rounded-3xl border-2 border-purple-500/30 dark:border-purple-500/20 bg-card dark:bg-slate-950 p-6 md:p-8 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 shadow-xs">
                <Layers className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                  Konsep Inti Pemrograman (Pilar Multi-Dimensi)
                </span>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100">
                  Hakikat Perulangan Bersarang (Nested Loop)
                </h3>
              </div>
            </div>

            {/* Tombol Balik Kartu (Flip Button) */}
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300 hover:bg-purple-500/20 transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isFlipped ? 'Lihat Analogi Visual' : 'Lihat Pembedahan Sintaks & RAM'}</span>
            </button>
          </div>

          {/* Konten Kartu dengan Pola 2D Bebas Buram */}
          <AnimatePresence mode="wait" initial={false}>
            {!isFlipped ? (
              /* SISI MUKA (FRONT): ANALOGI JAM DINDING & DUA RODA GIGI (OUTER VS INNER) */
              <motion.div
                key="front"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="pt-6 space-y-6"
              >
                {/* Penjelasan Ringkas Padat */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-secondary/30 border border-border/60 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-400">
                      <Clock className="w-4 h-4" />
                      <span>Analogi Jarum Jam</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      Outer loop adalah <strong>Jarum Jam</strong> (bergerak lambat). Inner loop adalah <strong>Jarum Menit</strong> (berputar cepat menyelesaikan putaran penuh untuk setiap 1 langkah jam).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-secondary/30 border border-border/60 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-400">
                      <Layers className="w-4 h-4" />
                      <span>Multi-Dimensi (2D Grid)</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      Outer loop mengendalikan koordinat baris vertikal (<code className="font-mono font-bold text-purple-700 dark:text-purple-300">i</code>). Inner loop mengendalikan kolom horizontal (<code className="font-mono font-bold text-sky-700 dark:text-sky-300">j</code>).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-secondary/30 border border-border/60 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      <Zap className="w-4 h-4" />
                      <span>Perkalian Total Iterasi</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      Total operasi instruksi adalah hasil perkalian: 
                      <span className="block font-mono font-black text-emerald-700 dark:text-emerald-300 pt-0.5">
                        Total = N_outer × N_inner
                      </span>
                    </p>
                  </div>
                </div>

                {/* VISUALISASI DINAMIS: SIMULATOR ORBIT DUA LOOP */}
                <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-inner flex flex-col md:flex-row items-center justify-between gap-6">
                  
                  {/* Visual Matriks Mini Interaktif */}
                  <div className="flex-1 w-full space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-600 dark:text-slate-400">STATUS ALUR ITERASI:</span>
                      <span className="text-amber-600 dark:text-amber-300 font-bold">
                        Langkah #{totalSteps} dari {TOTAL_OUTER * TOTAL_INNER}
                      </span>
                    </div>

                    {/* Grid Matriks 3 x 4 */}
                    <div className="grid grid-cols-4 gap-2.5 p-4 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
                      {Array.from({ length: TOTAL_OUTER }).map((_, r) => (
                        Array.from({ length: TOTAL_INNER }).map((_, c) => {
                          const isActive = r === outerStep && c === innerStep;
                          const isVisited = r < outerStep || (r === outerStep && c < innerStep);
                          return (
                            <div
                              key={`${r}-${c}`}
                              className={`p-2.5 rounded-lg border text-center transition-all duration-200 flex flex-col items-center justify-center font-mono ${
                                isActive
                                  ? 'bg-purple-600 text-white border-purple-400 scale-105 shadow-lg shadow-purple-500/50 ring-2 ring-purple-400'
                                  : isVisited
                                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/80'
                                  : 'bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-800'
                              }`}
                            >
                              <span className="text-[10px] opacity-75">({r}, {c})</span>
                              <span className="text-xs font-bold">
                                {isActive ? '▶ AKTIF' : isVisited ? '✓ SELESAI' : 'TUNGGU'}
                              </span>
                            </div>
                          );
                        })
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 font-mono pt-1">
                      <span>Outer (i) = <strong className="text-purple-700 dark:text-purple-300 font-bold">{outerStep}</strong> (Baris {outerStep + 1} dari {TOTAL_OUTER})</span>
                      <span>Inner (j) = <strong className="text-sky-700 dark:text-sky-300 font-bold">{innerStep}</strong> (Kolom {innerStep + 1} dari {TOTAL_INNER})</span>
                    </div>
                  </div>

                  {/* Panel Indikator Telemetri & Kontrol Animasi */}
                  <div className="w-full md:w-64 flex flex-col items-center justify-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shrink-0">
                    <div className="text-center space-y-1">
                      <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-purple-400">
                        Kecepatan Jarum Jam
                      </div>
                      <div className="text-2xl font-black font-mono text-emerald-400">
                        {outerStep} : {innerStep}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        (Outer : Inner)
                      </div>
                    </div>

                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 via-sky-500 to-emerald-500 transition-all duration-300"
                        style={{ width: `${(totalSteps / (TOTAL_OUTER * TOTAL_INNER)) * 100}%` }}
                      />
                    </div>

                    <div className="flex items-center gap-2 w-full">
                      <button
                        onClick={() => setIsRunning(!isRunning)}
                        className={`flex-1 py-1.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isRunning
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                            : 'bg-emerald-500 text-white hover:bg-emerald-600'
                        }`}
                      >
                        {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{isRunning ? 'Jeda Simulasi' : 'Jalankan'}</span>
                      </button>
                      <button
                        onClick={() => {
                          setCurrentStepIndex(0);
                          setIsRunning(false);
                        }}
                        className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Reset ke Langkah Awal"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>

                {/* Kaidah Inti */}
                <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-950 dark:text-purple-200 flex items-center gap-3 font-medium">
                  <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>
                    <strong>Hukum Mutlak Nested Loop:</strong> Perulangan bagian dalam (<em>inner loop</em>) <strong>HARUS SELESAI 100%</strong> terlebih dahulu sebelum perulangan luar (<em>outer loop</em>) dapat maju ke iterasi berikutnya!
                  </span>
                </div>
              </motion.div>
            ) : (
              /* SISI BELAKANG (BACK): PEMBEDAHAN SINTAKS KOMPARATIF & ATURAN RAM */
              <motion.div
                key="back"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="pt-6 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Kode Python */}
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 p-4 space-y-2 text-xs font-mono shadow-sm">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-amber-400 font-bold">
                      <span className="flex items-center gap-1.5">
                        <Code2 className="w-4 h-4 text-emerald-400" />
                        <span>Sintaks Python (Indented Block)</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                        2 Tingkat Indentasi
                      </span>
                    </div>
                    <pre className="text-slate-200 leading-relaxed overflow-x-auto">
{`# Outer Loop (Baris): i = 0, 1, 2
for i in range(3):
    # Inner Loop (Kolom): j = 0, 1, 2, 3
    for j in range(4):
        print(f"({i},{j})", end=" ")
    print()  # Ganti baris setelah inner loop tuntas`}
                    </pre>
                    <p className="text-[11px] text-slate-400 font-sans pt-1">
                      Blok inner loop menjorok 4 spasi ke dalam. Statemen <code className="text-emerald-300">print()</code> penutup sejajar dengan <code className="text-purple-300">for j</code> untuk pindah baris.
                    </p>
                  </div>

                  {/* Kode JavaScript */}
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 p-4 space-y-2 text-xs font-mono shadow-sm">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-amber-400 font-bold">
                      <span className="flex items-center gap-1.5">
                        <Code2 className="w-4 h-4 text-sky-400" />
                        <span>Sintaks JavaScript (Nested Curly Braces)</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                        {'{ { ... } }'} Kurung Kurawal
                      </span>
                    </div>
                    <pre className="text-slate-200 leading-relaxed overflow-x-auto">
{`// Outer Loop (Baris)
for (let i = 0; i < 3; i++) {
    let rowText = "";
    // Inner Loop (Kolom)
    for (let j = 0; j < 4; j++) {
        rowText += \`(\${i},\${j}) \`;
    }
    console.log(rowText); // Cetak 1 baris utuh
}`}
                    </pre>
                    <p className="text-[11px] text-slate-400 font-sans pt-1">
                      Variabel <code className="text-sky-300">let i</code> dan <code className="text-sky-300">let j</code> diisolasi secara leksikal per blok kurung kurawal agar nilai indeks tidak bertabrakan.
                    </p>
                  </div>
                </div>

                {/* 3 Jebakan Maut Pemula (Common Pitfalls) */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 dark:text-amber-200 text-xs space-y-2 font-medium">
                  <div className="font-bold flex items-center gap-2 text-amber-800 dark:text-amber-300">
                    <Info className="w-4 h-4" />
                    <span>3 Jebakan Kritis Pemula pada Nested Loop:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-[11.5px] leading-relaxed">
                    <li>
                      <strong>Menggunakan Nama Variabel yang Sama:</strong> Menggunakan <code className="font-mono bg-amber-500/20 px-1 rounded">for i in range(3): for i in range(4):</code> akan merusak nilai loop luar dan memicu <em>infinite loop</em> atau penghentian dini!
                    </li>
                    <li>
                      <strong>Salah Menempatkan Pindah Baris:</strong> Memanggil perintah pindah baris (<code className="font-mono bg-amber-500/20 px-1 rounded">print()</code> / <code className="font-mono bg-amber-500/20 px-1 rounded">\n</code>) di dalam <em>inner loop</em> akan mencetak kotak secara vertikal turun ke bawah, bukan ke samping!
                    </li>
                    <li>
                      <strong>Mengabaikan Biaya Komputasi $O(n^2)$:</strong> Menumpuk 3 tingkatan loop (<code className="font-mono bg-amber-500/20 px-1 rounded">i, j, k</code>) dengan rentang 1.000 iterasi akan mengeksekusi <strong>1 Miliar operasi</strong> ($1.000^3$), yang langsung membekukan peramban atau CPU!
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}

