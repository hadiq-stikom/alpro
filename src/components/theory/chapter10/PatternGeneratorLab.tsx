"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Code2,
  Terminal,
  Layers,
  Cpu,
  CheckCircle2,
  Sliders,
  Shapes,
  Play,
  RotateCcw,
  Info
} from 'lucide-react';

type PatternType = 'square' | 'triangle' | 'inverted_triangle' | 'number_row' | 'floyd';

interface PatternOption {
  id: PatternType;
  title: string;
  badge: string;
  desc: string;
  relation: string;
}

const PATTERNS: PatternOption[] = [
  {
    id: 'square',
    title: 'Persegi Solid (N × N)',
    badge: 'Statis: j < N',
    desc: 'Jumlah kolom konstan sama dengan N pada setiap baris.',
    relation: 'Batas inner loop statis (tidak bergantung pada i).'
  },
  {
    id: 'triangle',
    title: 'Segitiga Siku-Siku',
    badge: 'Dinamis: j ≤ i',
    desc: 'Bintang bertambah 1 setiap baris baru (baris 1 ada 1 bintang, baris 2 ada 2 bintang).',
    relation: 'Batas inner loop dikendalikan nilai outer loop (range(i + 1)).'
  },
  {
    id: 'inverted_triangle',
    title: 'Segitiga Terbalik',
    badge: 'Reduktif: j < N - i',
    desc: 'Bintang berkurang 1 setiap baris (baris pertama penuh, baris terakhir tersisa 1).',
    relation: 'Batas inner loop menyusut seiring bertambahnya i (range(N - i)).'
  },
  {
    id: 'number_row',
    title: 'Piramida Angka Baris',
    badge: 'Cetak Nilai i + 1',
    desc: 'Setiap baris mencetak nomor barisnya sendiri secara berulang.',
    relation: 'Isi cetakan mencerminkan nilai variabel outer loop i.'
  },
  {
    id: 'floyd',
    title: 'Segitiga Floyd (Counter)',
    badge: 'Akumulator Kontinu',
    desc: 'Mencetak angka berurutan 1, 2, 3, 4, 5, ... tanpa kembali ke 1 di baris baru.',
    relation: 'Menggunakan satu variabel counter di luar loop yang terus bertambah.'
  }
];

export default function PatternGeneratorLab() {
  const [selectedPattern, setSelectedPattern] = useState<PatternType>('triangle');
  const [sizeN, setSizeN] = useState<number>(5);
  const [symbolChar, setSymbolChar] = useState<string>('*');
  const [activeTab, setActiveTab] = useState<'python' | 'javascript'>('python');
  const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number; val: string } | null>(null);

  // Kalkulasi pola matriks 2D
  const patternGrid = useMemo(() => {
    const grid: { r: number; c: number; char: string; isFilled: boolean }[][] = [];
    let counter = 1;

    for (let i = 0; i < sizeN; i++) {
      const row: { r: number; c: number; char: string; isFilled: boolean }[] = [];
      for (let j = 0; j < sizeN; j++) {
        let isFilled = false;
        let charToDisplay = '·';

        if (selectedPattern === 'square') {
          isFilled = true;
          charToDisplay = symbolChar;
        } else if (selectedPattern === 'triangle') {
          if (j <= i) {
            isFilled = true;
            charToDisplay = symbolChar;
          }
        } else if (selectedPattern === 'inverted_triangle') {
          if (j < sizeN - i) {
            isFilled = true;
            charToDisplay = symbolChar;
          }
        } else if (selectedPattern === 'number_row') {
          if (j <= i) {
            isFilled = true;
            charToDisplay = String(i + 1);
          }
        } else if (selectedPattern === 'floyd') {
          if (j <= i) {
            isFilled = true;
            charToDisplay = String(counter++);
          }
        }

        row.push({ r: i, c: j, char: charToDisplay, isFilled });
      }
      grid.push(row);
    }

    return grid;
  }, [selectedPattern, sizeN, symbolChar]);

  // Generate runnable code snippet dynamically
  const getCodeSnippet = () => {
    if (activeTab === 'python') {
      if (selectedPattern === 'square') {
        return `# Pola Persegi Bintang (${sizeN} × ${sizeN})
N = ${sizeN}
for i in range(N):
    for j in range(N):
        print("${symbolChar}", end=" ")
    print()`;
      }
      if (selectedPattern === 'triangle') {
        return `# Pola Segitiga Siku-Siku (Batas Dinamis: j <= i)
N = ${sizeN}
for i in range(N):
    for j in range(i + 1):  # Inner loop berulang i + 1 kali
        print("${symbolChar}", end=" ")
    print()`;
      }
      if (selectedPattern === 'inverted_triangle') {
        return `# Pola Segitiga Terbalik (Batas Reduktif: N - i)
N = ${sizeN}
for i in range(N):
    for j in range(N - i):  # Menyusut seiring bertambahnya i
        print("${symbolChar}", end=" ")
    print()`;
      }
      if (selectedPattern === 'number_row') {
        return `# Piramida Angka Baris (Cetak i + 1)
N = ${sizeN}
for i in range(N):
    for j in range(i + 1):
        print(i + 1, end=" ")
    print()`;
      }
      if (selectedPattern === 'floyd') {
        return `# Segitiga Floyd (Akumulator Kontinu)
N = ${sizeN}
angka = 1  # Inisialisasi counter di luar loop
for i in range(N):
    for j in range(i + 1):
        print(angka, end=" ")
        angka += 1  # Terus bertambah tanpa reset
    print()`;
      }
    } else {
      // JavaScript version
      if (selectedPattern === 'square') {
        return `// Pola Persegi Bintang (${sizeN} × ${sizeN})
const N = ${sizeN};
for (let i = 0; i < N; i++) {
    let baris = "";
    for (let j = 0; j < N; j++) {
        baris += "${symbolChar} ";
    }
    console.log(baris);
}`;
      }
      if (selectedPattern === 'triangle') {
        return `// Pola Segitiga Siku-Siku (j <= i)
const N = ${sizeN};
for (let i = 0; i < N; i++) {
    let baris = "";
    for (let j = 0; j <= i; j++) { // Kolom mengikuti nomor baris
        baris += "${symbolChar} ";
    }
    console.log(baris);
}`;
      }
      if (selectedPattern === 'inverted_triangle') {
        return `// Pola Segitiga Terbalik (j < N - i)
const N = ${sizeN};
for (let i = 0; i < N; i++) {
    let baris = "";
    for (let j = 0; j < N - i; j++) {
        baris += "${symbolChar} ";
    }
    console.log(baris);
}`;
      }
      if (selectedPattern === 'number_row') {
        return `// Piramida Angka Baris
const N = ${sizeN};
for (let i = 0; i < N; i++) {
    let baris = "";
    for (let j = 0; j <= i; j++) {
        baris += (i + 1) + " ";
    }
    console.log(baris);
}`;
      }
      if (selectedPattern === 'floyd') {
        return `// Segitiga Floyd (Counter Akumulator)
const N = ${sizeN};
let angka = 1;
for (let i = 0; i < N; i++) {
    let baris = "";
    for (let j = 0; j <= i; j++) {
        baris += angka + " ";
        angka++;
    }
    console.log(baris);
}`;
      }
    }
    return '';
  };

  return (
    <div className="w-full my-8 space-y-6 rounded-3xl border border-border/80 bg-card p-6 md:p-8 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
      
      {/* 1. Header Lab */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Shapes className="w-4 h-4" />
            <span>Algorithmic Pattern Studio</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100">
            Studio Rekayasa Pola Geometris Visual
          </h3>
          <p className="text-xs text-muted-foreground pt-1 max-w-2xl">
            Bongkar rahasia bagaimana hubungan matematis antara <code className="font-mono text-purple-600 dark:text-purple-400 font-bold">j</code> dan <code className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">i</code> membentuk aneka ragam pola visual komputasi geometris.
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

      {/* 2. Pemilih Jenis Pola (5 Ragam Pola Baku) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {PATTERNS.map((p) => {
          const isSelected = selectedPattern === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPattern(p.id)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'border-border/60 bg-secondary/30 text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
              }`}
            >
              <div>
                <div className="font-bold text-xs flex items-center justify-between">
                  <span>{p.title}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                </div>
                <div className="text-[10px] opacity-75 mt-0.5 line-clamp-1">{p.desc}</div>
              </div>
              <div className="mt-2 text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300">
                {p.badge}
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Slider Kontrol Parameter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/60 text-xs">
        {/* Ukuran Pola N */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-mono font-bold">
            <span>Tinggi / Ukuran (N):</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-mono">
              N = {sizeN} Baris
            </span>
          </div>
          <input
            type="range"
            min={3}
            max={8}
            value={sizeN}
            onChange={(e) => setSizeN(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        {/* Karakter Simbol */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-mono font-bold">
            <span>Karakter Glif:</span>
            <span className="text-muted-foreground">Pilih Simbol</span>
          </div>
          <div className="flex gap-2">
            {['*', '#', '$', '@', '▲'].map((char) => (
              <button
                key={char}
                onClick={() => setSymbolChar(char)}
                disabled={selectedPattern === 'number_row' || selectedPattern === 'floyd'}
                className={`flex-1 py-1 rounded-lg border font-mono font-bold text-xs transition-all cursor-pointer ${
                  symbolChar === char && selectedPattern !== 'number_row' && selectedPattern !== 'floyd'
                    ? 'border-emerald-500 bg-emerald-500 text-white shadow-xs'
                    : 'border-border bg-background hover:bg-secondary text-foreground'
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {char}
              </button>
            ))}
          </div>
        </div>

        {/* Relasi Matematis */}
        <div className="p-2.5 rounded-xl bg-background border border-border/80 flex flex-col justify-center font-mono">
          <span className="text-[10px] text-muted-foreground uppercase">Hukum Logika Inner Loop:</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">
            {PATTERNS.find(p => p.id === selectedPattern)?.relation}
          </span>
        </div>
      </div>

      {/* 4. Display Bersanding: Visual Canvas (Kiri) vs Code Editor (Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Kolom Kiri (6 Spans): Visual Kanvas Pola */}
        <div className="lg:col-span-6 space-y-3">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-border dark:border-slate-800 shadow-inner min-h-[340px] flex flex-col items-center justify-center">
            
            <div className="w-full mb-4 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
              <span>OUTPUT KANVAS GEOMETRIS 2D:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                N = {sizeN} × {sizeN}
              </span>
            </div>

            {/* Grid Bintang / Glif */}
            <div className="space-y-1.5 font-mono select-none">
              {patternGrid.map((row, r) => (
                <div key={r} className="flex gap-1.5 items-center justify-center">
                  {/* Indikator Baris di Kiri */}
                  <span className="text-[10px] text-slate-400 dark:text-slate-600 w-5 text-right font-mono pr-1">
                    i={r}
                  </span>

                  {row.map((cell) => {
                    const isHovered = hoveredCell && hoveredCell.r === cell.r && hoveredCell.c === cell.c;
                    return (
                      <div
                        key={`${cell.r}-${cell.c}`}
                        onMouseEnter={() => setHoveredCell({ r: cell.r, c: cell.c, val: cell.char })}
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs md:text-sm font-bold font-mono transition-all duration-150 cursor-pointer ${
                          isHovered
                            ? 'bg-amber-400 text-slate-950 scale-125 z-20 shadow-lg ring-2 ring-amber-300'
                            : cell.isFilled
                            ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-slate-200/50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-700 border border-slate-200 dark:border-slate-900 opacity-40'
                        }`}
                      >
                        {cell.isFilled ? cell.char : '·'}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Inspeksi Sel saat di-hover */}
            <div className="mt-5 p-2 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              {hoveredCell ? (
                <span>
                  Koordinat: Baris <strong className="text-purple-700 dark:text-purple-300">i={hoveredCell.r}</strong>, Kolom <strong className="text-sky-700 dark:text-sky-300">j={hoveredCell.c}</strong> → Karakter: <strong className="text-emerald-700 dark:text-emerald-300">"{hoveredCell.val}"</strong>
                </span>
              ) : (
                <span className="text-slate-400 dark:text-slate-500 italic">
                  Arahkan kursor ke salah satu kotak untuk menginspeksi nilai koordinat (i, j)
                </span>
              )}
            </div>

          </div>
        </div>

        {/* Kolom Kanan (6 Spans): Code Snippet & Bedah Logika */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 p-4 text-xs font-mono shadow-sm">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
              <span className="flex items-center gap-2 font-bold text-slate-200">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>Source Code ({activeTab === 'python' ? 'Python' : 'JavaScript'})</span>
              </span>
              <span className="text-[10px] text-amber-400 font-mono">
                {PATTERNS.find(p => p.id === selectedPattern)?.badge}
              </span>
            </div>

            <pre className="text-slate-200 leading-relaxed overflow-x-auto whitespace-pre font-mono p-1">
              {getCodeSnippet()}
            </pre>
          </div>

          {/* Rincian Analisis Pola */}
          <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 text-xs space-y-2">
            <div className="font-bold flex items-center gap-2 text-foreground">
              <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Analisis Hubungan Variabel (i vs j):</span>
            </div>
            
            {selectedPattern === 'triangle' && (
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Pada pola segitiga, baris ke-<code className="font-mono text-purple-600 dark:text-purple-400 font-bold">i</code> membutuhkan tepat <code className="font-mono font-bold text-emerald-600 dark:text-emerald-400">i + 1</code> buah simbol. Oleh karena itu, kita tidak memasukkan angka konstan <code className="font-mono">N</code> pada inner loop, melainkan memasukkan ekspresi dinamis <code className="font-mono font-bold text-sky-600 dark:text-sky-400">range(i + 1)</code>.
              </p>
            )}

            {selectedPattern === 'inverted_triangle' && (
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Pada segitiga terbalik, jumlah bintang berkurang dari <code className="font-mono font-bold">N</code> menuju <code className="font-mono font-bold">1</code>. Rumus batas kolomnya adalah <code className="font-mono font-bold text-sky-600 dark:text-sky-400">N - i</code>. Saat <code className="font-mono">i = 0</code>, cetak <code className="font-mono">{sizeN}</code> bintang. Saat <code className="font-mono">i = {sizeN - 1}</code>, cetak <code className="font-mono">1</code> bintang saja.
              </p>
            )}

            {selectedPattern === 'square' && (
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Pola persegi merupakan bentuk paling dasar karena inner loop berjalan dengan batas independen statis <code className="font-mono font-bold text-sky-600 dark:text-sky-400">range(N)</code> tanpa memedulikan nilai baris <code className="font-mono text-purple-600 dark:text-purple-400">i</code> saat ini. Total eksekusi tepat <code className="font-mono">{sizeN} × {sizeN} = {sizeN * sizeN}</code> titik.
              </p>
            )}

            {selectedPattern === 'number_row' && (
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Alih-alih mencetak karakter string bintang, kita mencetak ekspresi numerik <code className="font-mono font-bold text-emerald-600 dark:text-emerald-400">i + 1</code>. Karena nilai <code className="font-mono">i</code> tidak berubah selama inner loop berputar, semua angka pada baris yang sama akan identik.
              </p>
            )}

            {selectedPattern === 'floyd' && (
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Segitiga Floyd membuktikan bagaimana variabel akumulator (counter) di luar loop mempertahankan nilainya melintasi batasan baris. Variabel <code className="font-mono font-bold text-emerald-600 dark:text-emerald-400">angka</code> dinaikkan satu per satu (<code className="font-mono">angka += 1</code>) setiap kali mencetak elemen, tanpa pernah di-reset ke 1.
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

