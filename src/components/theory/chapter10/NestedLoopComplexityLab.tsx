"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Code2,
  Terminal,
  Layers,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  RotateCcw,
  Play,
  Pause,
  Info
} from 'lucide-react';

export default function NestedLoopComplexityLab() {
  const [scaleN, setScaleN] = useState<number>(100);
  const [activeTab, setActiveTab] = useState<'complexity' | 'break_flow'>('complexity');
  const [langTab, setLangTab] = useState<'python' | 'javascript'>('python');

  // State untuk simulator break flow
  const [targetFound, setTargetFound] = useState<number>(5);
  const [breakLog, setBreakLog] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Kalkulasi kompleksitas
  const linearOps = scaleN;
  const quadraticOps = scaleN * scaleN;
  const cubicOps = scaleN <= 1000 ? scaleN * scaleN * scaleN : 'Terlalu Masif (>1T)';

  // Estimasi waktu pada CPU rata-rata (asumsi 100 juta operasi/detik)
  const getEstimatedTime = (ops: number) => {
    const seconds = ops / 100000000;
    if (seconds < 0.00001) return '< 0.01 ms (Instan)';
    if (seconds < 0.001) return `${(seconds * 1000).toFixed(2)} ms`;
    if (seconds < 1) return `${(seconds * 1000).toFixed(0)} ms`;
    if (seconds < 60) return `${seconds.toFixed(2)} detik`;
    return `${(seconds / 60).toFixed(1)} menit (CPU Hang!)`;
  };

  // Simulasi run break flow
  const runBreakSimulation = () => {
    setIsSimulating(true);
    const logs: string[] = [];
    let found = false;

    logs.push("▶ MEMULAI PENCARIAN 2D (Target: " + targetFound + ")");
    for (let i = 0; i < 4; i++) {
      logs.push(`\n[Outer Loop i = ${i}] Membuka baris ke-${i + 1}...`);
      for (let j = 0; j < 4; j++) {
        const val = i * 4 + j + 1;
        if (val === targetFound) {
          logs.push(`  → Nilai ${val} DITEMUKAN di (${i},${j})! Menjalankan BREAK.`);
          logs.push(`  ⚠️ BREAK HANYA KELUAR DARI INNER LOOP! Outer loop tetap berlanjut!`);
          break; // hanya keluar dari loop j
        } else {
          logs.push(`  Periksa (${i},${j}) = ${val} (bukan target)`);
        }
      }
    }
    logs.push("\n✓ Selesai seluruh loop luar.");
    setBreakLog(logs);
    setIsSimulating(false);
  };

  return (
    <div className="w-full my-8 space-y-6 rounded-3xl border border-border/80 bg-card p-6 md:p-8 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
      
      {/* 1. Header Lab */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <TrendingUp className="w-4 h-4" />
            <span>Algorithm Efficiency &amp; Control Flow Circuit</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100">
            Kompleksitas Waktu $O(n^2)$ &amp; Perilaku Break/Continue
          </h3>
          <p className="text-xs text-muted-foreground pt-1 max-w-2xl">
            Pahami mengapa perulangan bersarang melipatgandakan jumlah operasi secara eksponensial (kuadratik), serta selidiki bagaimana pernyataan <code className="font-mono text-rose-600 dark:text-rose-400 font-bold">break</code> berperilaku di dalam loop bertingkat.
          </p>
        </div>

        {/* Tab Mode Pembahasan */}
        <div className="flex p-1 rounded-xl bg-secondary border border-border text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('complexity')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'complexity'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Analisis O(n²) Kuadratik
          </button>
          <button
            onClick={() => setActiveTab('break_flow')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'break_flow'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sirkuit Break &amp; Flag
          </button>
        </div>
      </div>

      {activeTab === 'complexity' ? (
        /* ═══════════════════════════════════════════════════════════════════ */
        /* MODE 1: ANALISIS KOMPLEKSITAS WAKTU O(N^2)                          */
        /* ═══════════════════════════════════════════════════════════════════ */
        <div className="space-y-6">
          
          {/* Slider Eksperimen Ukuran N */}
          <div className="p-4 rounded-2xl bg-secondary/30 border border-border/60 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-foreground">
                Simulasi Ukuran Masukan Data ($N$):
              </span>
              <div className="flex gap-2">
                {[10, 50, 100, 500, 1000, 10000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setScaleN(val)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      scaleN === val
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-background hover:bg-secondary border border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    N={val.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="range"
              min={10}
              max={2000}
              step={10}
              value={scaleN}
              onChange={(e) => setScaleN(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
          </div>

          {/* Kartu Komparasi 3 Tingkat Kompleksitas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* O(n) Single Loop */}
            <div className="p-5 rounded-2xl border border-border/80 bg-background space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">1 Tingkat Loop</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold">
                  Linear O(n)
                </span>
              </div>
              <div className="text-2xl font-mono font-black text-foreground">
                {linearOps.toLocaleString()}
              </div>
              <div className="text-[11px] text-muted-foreground">
                Total Operasi Iterasi
              </div>
              <div className="pt-2 border-t border-border/60 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                Waktu: {getEstimatedTime(linearOps)}
              </div>
            </div>

            {/* O(n^2) Double Nested Loop */}
            <div className="p-5 rounded-2xl border-2 border-rose-500/40 bg-rose-500/5 space-y-2 shadow-md">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-rose-600 dark:text-rose-400 font-bold">2 Tingkat Loop Bersarang</span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-800 dark:text-rose-300 font-black">
                  Kuadratik O(n²)
                </span>
              </div>
              <div className="text-2xl font-mono font-black text-rose-600 dark:text-rose-400">
                {quadraticOps.toLocaleString()}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {scaleN.toLocaleString()} × {scaleN.toLocaleString()} Operasi
              </div>
              <div className="pt-2 border-t border-rose-500/20 text-[11px] font-mono text-rose-700 dark:text-rose-300 font-bold">
                Waktu: {getEstimatedTime(quadraticOps)}
              </div>
            </div>

            {/* O(n^3) Triple Nested Loop */}
            <div className="p-5 rounded-2xl border border-border/80 bg-background space-y-2 shadow-xs opacity-75">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-purple-600 dark:text-purple-400 font-bold">3 Tingkat Loop (i, j, k)</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300 font-bold">
                  Kubik O(n³)
                </span>
              </div>
              <div className="text-2xl font-mono font-black text-foreground">
                {typeof cubicOps === 'number' ? cubicOps.toLocaleString() : cubicOps}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {scaleN.toLocaleString()}³ Operasi
              </div>
              <div className="pt-2 border-t border-border/60 text-[11px] font-mono text-purple-600 dark:text-purple-400 font-bold">
                Waktu: {typeof cubicOps === 'number' ? getEstimatedTime(cubicOps) : 'Kritis (Freeze)'}
              </div>
            </div>

          </div>

          {/* Callout Peringatan Ilmiah */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold">Hukum Pertumbuhan Kuadratik (*Quadratic Explosion*):</div>
              <p className="leading-relaxed opacity-90">
                Ketika ukuran $N$ dinaikkan <strong>10 kali lipat</strong> (misal dari 100 ke 1.000), beban operasi loop tunggal hanya naik 10 kali. Namun pada loop bersarang 2 tingkat ($O(n^2)$), beban operasinya meledak <strong>100 kali lipat</strong> ($10^2$). Inilah alasan mengapa algoritma pengurutan data naif seperti <em>Bubble Sort</em> sangat lambat untuk data jutaan baris.
              </p>
            </div>
          </div>

        </div>
      ) : (
        /* ═══════════════════════════════════════════════════════════════════ */
        /* MODE 2: SIRKUIT PENGENDALI ALUR BREAK & BOOLEAN FLAG                */
        /* ═══════════════════════════════════════════════════════════════════ */
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Panel Kontrol Simulasi (5 Spans) */}
            <div className="md:col-span-5 space-y-4">
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/60 space-y-3 text-xs">
                <div className="font-bold text-foreground">
                  Pilih Nilai Target yang Ingin Dicari:
                </div>
                
                <div className="grid grid-cols-4 gap-2 font-mono">
                  {[1, 5, 8, 12, 16].map((num) => (
                    <button
                      key={num}
                      onClick={() => setTargetFound(num)}
                      className={`p-2 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        targetFound === num
                          ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                          : 'bg-background hover:bg-secondary border-border text-foreground'
                      }`}
                    >
                      Target: {num}
                    </button>
                  ))}
                </div>

                <button
                  onClick={runBreakSimulation}
                  disabled={isSimulating}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Uji Perilaku BREAK pada Loop 4 × 4</span>
                </button>
              </div>

              {/* Solusi Elegan: Flag & Function Return */}
              <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 space-y-2 text-xs">
                <div className="font-bold flex items-center gap-2 text-foreground">
                  <Cpu className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>Cara Keluar dari Multi-Loop Sekaligus:</span>
                </div>
                <div className="space-y-1.5 text-[11.5px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p>
                    <strong>Metode 1 (Boolean Flag):</strong> Buat variabel penanda <code className="font-mono font-bold text-emerald-600 dark:text-emerald-400">found = True</code> sebelum break, lalu di outer loop periksa <code className="font-mono font-bold text-purple-600 dark:text-purple-400">if found: break</code>.
                  </p>
                  <p>
                    <strong>Metode 2 (Fungsi &amp; Return):</strong> Bungkus nested loop ke dalam fungsi, lalu gunakan <code className="font-mono font-bold text-rose-600 dark:text-rose-400">return</code> langsung ketika data ditemukan untuk menghentikan seluruh proses seketika.
                  </p>
                </div>
              </div>
            </div>

            {/* Output Log Console Simulasi (7 Spans) */}
            <div className="md:col-span-7 space-y-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-200 font-bold">
                    <Terminal className="w-4 h-4 text-rose-400" />
                    <span>LOG ALUR KONTROL EKSEKUSI BREAK</span>
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Grid 4 × 4
                  </span>
                </div>

                <div className="min-h-[220px] max-h-[280px] overflow-y-auto space-y-1 text-slate-300 text-xs">
                  {breakLog.length === 0 ? (
                    <span className="text-slate-600 italic">
                      Klik tombol [Uji Perilaku BREAK] di samping untuk melihat alur kontrol eksekusi loop...
                    </span>
                  ) : (
                    breakLog.map((line, idx) => (
                      <div
                        key={idx}
                        className={`leading-relaxed ${
                          line.includes('DITEMUKAN')
                            ? 'text-amber-300 font-bold bg-amber-500/10 p-1 rounded'
                            : line.includes('BREAK HANYA KELUAR')
                            ? 'text-rose-400 font-bold bg-rose-500/10 p-1 rounded'
                            : line.includes('Outer Loop')
                            ? 'text-purple-400 font-bold pt-1'
                            : 'text-slate-400 pl-2'
                        }`}
                      >
                        {line}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

