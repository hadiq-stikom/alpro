"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Code2,
  Terminal,
  Layers,
  Cpu,
  CheckCircle2,
  Sliders,
  Sparkles,
  Filter,
  Info
} from 'lucide-react';

type FilterMode = 'all' | 'diagonal' | 'even' | 'odd' | 'gt_20';

export default function MultiplicationMatrixLab() {
  const [maxRow, setMaxRow] = useState<number>(5);
  const [maxCol, setMaxCol] = useState<number>(5);
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [activeTab, setActiveTab] = useState<'python' | 'javascript'>('python');
  const [hoveredCoord, setHoveredCoord] = useState<{ r: number; c: number; product: number } | null>(null);

  // Kalkulasi matriks perkalian dan total akumulasi
  const { matrix, grandTotal, matchCount } = useMemo(() => {
    const mat: { r: number; c: number; product: number; isMatch: boolean }[][] = [];
    let sum = 0;
    let matches = 0;

    for (let i = 1; i <= maxRow; i++) {
      const row: { r: number; c: number; product: number; isMatch: boolean }[] = [];
      for (let j = 1; j <= maxCol; j++) {
        const product = i * j;
        sum += product;

        let isMatch = true;
        if (filterMode === 'diagonal') isMatch = (i === j);
        else if (filterMode === 'even') isMatch = (product % 2 === 0);
        else if (filterMode === 'odd') isMatch = (product % 2 !== 0);
        else if (filterMode === 'gt_20') isMatch = (product >= 20);

        if (isMatch) matches++;
        row.push({ r: i, c: j, product, isMatch });
      }
      mat.push(row);
    }

    return { matrix: mat, grandTotal: sum, matchCount: matches };
  }, [maxRow, maxCol, filterMode]);

  // Code generator
  const pythonCode = `# Tabel Perkalian Matematika & Filter (${maxRow} × ${maxCol})
total_sum = 0
for i in range(1, ${maxRow + 1}):         # Baris pengali luar: 1 s.d ${maxRow}
    for j in range(1, ${maxCol + 1}):     # Kolom pengali dalam: 1 s.d ${maxCol}
        hasil = i * j
        total_sum += hasil
        ${filterMode === 'diagonal' ? 'if i == j:  # Filter diagonal utama\n            print(f"{hasil:3d}", end=" ")\n        else:\n            print("  ·", end=" ")' :
          filterMode === 'even' ? 'if hasil % 2 == 0:  # Hanya hasil genap\n            print(f"{hasil:3d}", end=" ")\n        else:\n            print("  ·", end=" ")' :
          filterMode === 'odd' ? 'if hasil % 2 != 0:  # Hanya hasil ganjil\n            print(f"{hasil:3d}", end=" ")\n        else:\n            print("  ·", end=" ")' :
          filterMode === 'gt_20' ? 'if hasil >= 20:   # Hanya hasil >= 20\n            print(f"{hasil:3d}", end=" ")\n        else:\n            print("  ·", end=" ")' :
          'print(f"{hasil:3d}", end=" ")  # Format lebar 3 karakter rapi'}
    print()  # Pindah baris
print("Total Akumulasi Semua Produk =", total_sum)`;

  const jsCode = `// Tabel Perkalian Matematika & Filter (${maxRow} × ${maxCol})
let totalSum = 0;
for (let i = 1; i <= ${maxRow}; i++) {
    let baris = "";
    for (let j = 1; j <= ${maxCol}; j++) {
        const hasil = i * j;
        totalSum += hasil;
        ${filterMode === 'diagonal' ? 'if (i === j) baris += String(hasil).padStart(3, " ") + " ";\n        else baris += "  · ";' :
          filterMode === 'even' ? 'if (hasil % 2 === 0) baris += String(hasil).padStart(3, " ") + " ";\n        else baris += "  · ";' :
          filterMode === 'odd' ? 'if (hasil % 2 !== 0) baris += String(hasil).padStart(3, " ") + " ";\n        else baris += "  · ";' :
          filterMode === 'gt_20' ? 'if (hasil >= 20) baris += String(hasil).padStart(3, " ") + " ";\n        else baris += "  · ";' :
          'baris += String(hasil).padStart(3, " ") + " ";'}
    }
    console.log(baris);
}
console.log("Total Akumulasi =", totalSum);`;

  return (
    <div className="w-full my-8 space-y-6 rounded-3xl border border-border/80 bg-card p-6 md:p-8 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
      
      {/* 1. Header Lab */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Calculator className="w-4 h-4" />
            <span>Interactive Matrix Multiplication Lab</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100">
            Tabel Perkalian Dinamis &amp; Akumulasi Data 2D
          </h3>
          <p className="text-xs text-muted-foreground pt-1 max-w-2xl">
            Menghitung hasil kali silang baris <code className="font-mono text-purple-600 dark:text-purple-400 font-bold">i</code> dengan kolom <code className="font-mono text-sky-600 dark:text-sky-400 font-bold">j</code>, mengakumulasi total sel, serta menapis nilai menggunakan kondisi kondisional di dalam loop bersarang.
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

      {/* 2. Filter Selector & Slider Dimensi */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Kontrol Filter (7 Spans) */}
        <div className="md:col-span-7 space-y-2 p-3.5 rounded-2xl bg-secondary/30 border border-border/60">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5 text-foreground">
              <Filter className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Filter Sel Kondisional (Nested IF in Loop):</span>
            </span>
            <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono">
              {matchCount} sel lolos filter
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all' as FilterMode, label: 'Tampilkan Semua' },
              { id: 'diagonal' as FilterMode, label: 'Diagonal Utama (i == j)' },
              { id: 'even' as FilterMode, label: 'Hanya Genap (hasil % 2 == 0)' },
              { id: 'odd' as FilterMode, label: 'Hanya Ganjil (hasil % 2 != 0)' },
              { id: 'gt_20' as FilterMode, label: 'Nilai ≥ 20' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterMode(f.id)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterMode === f.id
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-background hover:bg-secondary border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Kontrol Dimensi Baris & Kolom (5 Spans) */}
        <div className="md:col-span-5 grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-secondary/30 border border-border/60 text-xs">
          <div className="space-y-1">
            <div className="flex justify-between font-mono font-bold">
              <span>Baris (i):</span>
              <span className="text-purple-600 dark:text-purple-400">{maxRow}</span>
            </div>
            <input
              type="range"
              min={3}
              max={8}
              value={maxRow}
              onChange={(e) => setMaxRow(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between font-mono font-bold">
              <span>Kolom (j):</span>
              <span className="text-sky-600 dark:text-sky-400">{maxCol}</span>
            </div>
            <input
              type="range"
              min={3}
              max={8}
              value={maxCol}
              onChange={(e) => setMaxCol(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
          </div>
        </div>

      </div>

      {/* 3. Tampilan Bersanding: Tabel Matriks (Kiri) vs Code Snippet & Akumulator (Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Kolom Kiri (7 Spans): Tabel Perkalian Visual */}
        <div className="lg:col-span-7 space-y-3">
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner flex flex-col items-center justify-center min-h-[340px]">
            
            <div className="w-full mb-4 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>TABEL HASIL KALI (i × j):</span>
              <span className="text-amber-300 font-bold">
                {maxRow} × {maxCol} = {maxRow * maxCol} Sel
              </span>
            </div>

            {/* Grid Tabel dengan Header Baris & Kolom */}
            <div className="overflow-x-auto max-w-full font-mono select-none p-2">
              <table className="border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 text-center text-xs text-slate-500 font-bold border-b border-r border-slate-800">
                      ×
                    </th>
                    {Array.from({ length: maxCol }).map((_, c) => (
                      <th
                        key={c}
                        className={`p-2 text-center text-xs font-black border-b border-slate-800 transition-colors ${
                          hoveredCoord && hoveredCoord.c === c + 1
                            ? 'text-sky-300 bg-sky-950/60'
                            : 'text-slate-400'
                        }`}
                      >
                        j={c + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((row, r) => (
                    <tr key={r}>
                      {/* Header Baris */}
                      <th
                        className={`p-2 text-center text-xs font-black border-r border-slate-800 transition-colors ${
                          hoveredCoord && hoveredCoord.r === r + 1
                            ? 'text-purple-300 bg-purple-950/60'
                            : 'text-slate-400'
                        }`}
                      >
                        i={r + 1}
                      </th>

                      {/* Sel Produk */}
                      {row.map((cell) => {
                        const isHovered = hoveredCoord && hoveredCoord.r === cell.r && hoveredCoord.c === cell.c;
                        return (
                          <td
                            key={`${cell.r}-${cell.c}`}
                            onMouseEnter={() => setHoveredCoord({ r: cell.r, c: cell.c, product: cell.product })}
                            onMouseLeave={() => setHoveredCoord(null)}
                            className="p-1 text-center"
                          >
                            <div
                              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold font-mono transition-all duration-150 cursor-pointer ${
                                isHovered
                                  ? 'bg-amber-400 text-slate-950 scale-125 z-20 shadow-lg ring-2 ring-amber-300 font-black'
                                  : cell.isMatch
                                  ? 'bg-slate-900 border border-slate-700 text-slate-100 hover:border-amber-400 hover:text-amber-300'
                                  : 'bg-slate-950/40 text-slate-700 border border-slate-900 opacity-30'
                              }`}
                            >
                              {cell.isMatch ? cell.product : '·'}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Inspeksi Interaktif di Bawah */}
            <div className="mt-4 p-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              {hoveredCoord ? (
                <span>
                  Evaluasi: Baris <strong className="text-purple-300">i={hoveredCoord.r}</strong> × Kolom <strong className="text-sky-300">j={hoveredCoord.c}</strong> = <strong className="text-amber-300 text-sm font-black">{hoveredCoord.product}</strong>
                </span>
              ) : (
                <span className="text-slate-500 italic">
                  Arahkan kursor ke angka tabel untuk melihat rumus perkalian sel
                </span>
              )}
            </div>

          </div>
        </div>

        {/* Kolom Kanan (5 Spans): Editor Kode & Total Akumulasi */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs font-mono shadow-sm">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
              <span className="flex items-center gap-2 font-bold text-slate-200">
                <Code2 className="w-4 h-4 text-amber-400" />
                <span>Source Code ({activeTab === 'python' ? 'Python' : 'JavaScript'})</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                Formula i * j
              </span>
            </div>

            <pre className="text-slate-200 leading-relaxed overflow-x-auto whitespace-pre font-mono p-1">
              {activeTab === 'python' ? pythonCode : jsCode}
            </pre>
          </div>

          {/* Kartu Telemetri Akumulasi Grid */}
          <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-foreground flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Akumulator Penjumlahan 2D</span>
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                Σ (i × j)
              </span>
            </div>

            <div className="p-3 rounded-xl bg-background border border-border/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-muted-foreground block">Grand Total Seluruh Sel:</span>
                <span className="text-xl font-mono font-black text-amber-600 dark:text-amber-400">
                  {grandTotal}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-muted-foreground block">Rata-rata per Sel:</span>
                <span className="text-sm font-mono font-bold text-foreground">
                  {(grandTotal / (maxRow * maxCol)).toFixed(1)}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Variabel akumulator <code className="font-mono font-bold text-amber-700 dark:text-amber-300">total_sum</code> diletakkan di <strong>luar kedua loop</strong> agar nilainya terakumulasi terus-menerus melintasi seluruh sel matriks.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

