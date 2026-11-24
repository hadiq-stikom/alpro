"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Terminal,
  Code2,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  RotateCw,
  Clock,
  Grid,
  Shapes,
  Calculator,
  TrendingUp,
  Cpu,
  Zap,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import AnimatedNestedLoopDefinition from './chapter10/AnimatedNestedLoopDefinition';
import NestedLoopRepresentationMatrix from './chapter10/NestedLoopRepresentationMatrix';
import NestedLoopCombinationsShowcase from './chapter10/NestedLoopCombinationsShowcase';
import NestedGridCoordsLab from './chapter10/NestedGridCoordsLab';
import PatternGeneratorLab from './chapter10/PatternGeneratorLab';
import MultiplicationMatrixLab from './chapter10/MultiplicationMatrixLab';
import NestedLoopComplexityLab from './chapter10/NestedLoopComplexityLab';

export default function Pertemuan10() {
  // Seluruh sub-materi tertutup secara default sesuai Standar Pedagogis Aturan 19
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);

  return (
    <div className="space-y-12 overflow-visible">
      
      {/* ─── Hero Header Pertemuan 10 ────────────────────────────────────────── */}
      <header className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-purple-500/10 rounded-full mb-4 shadow-inner">
          <Layers className="w-10 h-10 text-purple-600 dark:text-purple-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Perulangan Bersarang (Nested Loop)
        </h1>
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Buka dimensi komputasi multi-arah. Pelajari bagaimana perulangan di dalam perulangan mengendalikan koordinat baris dan kolom{' '}
          <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-bold text-purple-700 dark:text-purple-300">(i, j)</code>, merekayasa pola geometris visual, membangun matriks perkalian matematika, hingga menginvestigasi lonjakan kompleksitas kuadratik{' '}
          <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-bold text-rose-700 dark:text-rose-300">O(n²)</code>.
        </p>

        {/* 4 Pilar Representasi Badge */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {[
            { icon: '📝', label: 'Naratif Alur Bertingkat', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30' },
            { icon: '🔷', label: 'Flowchart Loopback Ganda', color: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30' },
            { icon: '📋', label: 'Pseudocode CLRS (Nested for)', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30' },
            { icon: '💻', label: 'Python (range) & JS (for let)', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30' },
          ].map((item) => (
            <span key={item.label} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${item.color}`}>
              {item.icon} {item.label}
            </span>
          ))}
        </div>

        {/* Tombol CTA ke Code Studio */}
        <div className="pt-2">
          <Link
            href="/workspace?chapter=10"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:from-purple-700 hover:to-sky-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
          >
            <Terminal className="w-4 h-4" />
            <span>Buka Interactive Code Studio (Latihan Coding Bab 10)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SUB-BAB 1: HAKIKAT & ALUR OUTER VS INNER LOOP                           */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-xs transition-all hover:border-purple-500/40 ${isOpen1 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button
          onClick={() => setIsOpen1(!isOpen1)}
          className="group w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
                <Clock className="w-6 h-6 md:w-7 md:h-7" />
              </span>
              <span>1. Hakikat Perulangan Bersarang: Analogi Jam Dinding &amp; Alur Eksekusi</span>
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Capaian: Memahami alur kerja dua tingkat di mana inner loop berputar tuntas untuk setiap 1 langkah outer loop.</span>
            </div>
          </div>
          <div className={`p-2 rounded-full bg-secondary/80 text-muted-foreground transition-transform duration-300 shrink-0 ${isOpen1 ? 'rotate-180 bg-purple-500/20 text-purple-700 dark:text-purple-300' : 'group-hover:bg-secondary'}`}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </button>

        <AnimatePresence>
          {isOpen1 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 border-t border-border/60 space-y-6 text-base leading-relaxed text-slate-700 dark:text-slate-300"
            >
              <p>
                Dalam pemrograman komputer, <strong>Perulangan Bersarang (*Nested Loop*)</strong> adalah struktur di mana sebuah blok perulangan ditempatkan seutuhnya di dalam badan perulangan lainnya. Kita mengenal dua pemeran utama dalam struktur ini:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="p-4 rounded-xl bg-card border border-purple-500/30 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-bold">
                    <span className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center text-xs">1</span>
                    <span>Outer Loop (Perulangan Luar)</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Bertindak sebagai <strong>Jarum Jam</strong> atau kendali kelompok makro. Loop ini berjalan perlahan: ia hanya maju 1 langkah setelah seluruh tugas di dalam badannya selesai diproses tanpa sisa.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-card border border-sky-500/30 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-sky-700 dark:text-sky-400 font-bold">
                    <span className="w-6 h-6 rounded-lg bg-sky-500/20 flex items-center justify-center text-xs">2</span>
                    <span>Inner Loop (Perulangan Dalam)</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Bertindak sebagai <strong>Jarum Menit</strong> atau kendali iterasi mikro. Setiap kali outer loop melangkah, inner loop akan <strong>dilahirkan kembali dari nilai awal</strong> dan berputar dari awal hingga akhir.
                  </p>
                </div>
              </div>

              {/* Lab Definition 2D Interactive */}
              <AnimatedNestedLoopDefinition />

              <div className="p-4 rounded-xl bg-secondary/30 border border-border/80 space-y-2 text-xs">
                <div className="font-bold text-foreground flex items-center gap-2">
                  <Compass className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Prinsip Hitungan Total Eksekusi:</span>
                </div>
                <p className="leading-relaxed">
                  Jika perulangan luar berjalan sebanyak <code className="font-mono font-bold text-primary">M</code> kali, dan setiap putaran luar memicu perulangan dalam sebanyak <code className="font-mono font-bold text-emerald-600 dark:text-emerald-400">N</code> kali, maka statemen terdalam akan dieksekusi tepat sebanyak:
                </p>
                <div className="p-3 my-2 text-center rounded-xl bg-purple-500/10 border border-purple-500/30 font-mono font-extrabold text-purple-700 dark:text-purple-300 text-base">
                  Total Eksekusi = M × N
                </div>
                <p className="leading-relaxed">
                  Sebagai contoh, jika <code className="font-mono font-bold">M = 3</code> dan <code className="font-mono font-bold">N = 4</code>, maka blok kode terdalam akan dipanggil sebanyak <code className="font-mono font-bold text-purple-600 dark:text-purple-400">3 × 4 = 12</code> kali secara teratur.
                </p>
              </div>

              {/* Komparasi 4 Representasi Baku Perulangan Bersarang (Aturan 38 & 39) */}
              <NestedLoopRepresentationMatrix />

              {/* 4 Ragam Kombinasi Perulangan Bersarang & Studi Kasus Nyata */}
              <NestedLoopCombinationsShowcase />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SUB-BAB 2: PEMETAAN KOORDINAT SPASIAL BARIS-KOLOM (i, j) & GRID KONSOL  */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-xs transition-all hover:border-purple-500/40 ${isOpen2 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button
          onClick={() => setIsOpen2(!isOpen2)}
          className="group w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
                <Grid className="w-6 h-6 md:w-7 md:h-7" />
              </span>
              <span>2. Pemetaan Koordinat Spasial: Posisi Baris-Kolom ($i, j$) &amp; Grid Layar Konsol</span>
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Capaian: Mampu mengontrol pergerakan kursor output dua dimensi (baris-demi-baris) menggunakan variabel pencacah i dan j.</span>
            </div>
          </div>
          <div className={`p-2 rounded-full bg-secondary/80 text-muted-foreground transition-transform duration-300 shrink-0 ${isOpen2 ? 'rotate-180 bg-purple-500/20 text-purple-700 dark:text-purple-300' : 'group-hover:bg-secondary'}`}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </button>

        <AnimatePresence>
          {isOpen2 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 border-t border-border/60 space-y-6 text-base leading-relaxed text-slate-700 dark:text-slate-300"
            >
              <p>
                Di layar konsol komputer, teks dicetak karakter-demi-karakter dari kiri ke kanan, lalu berganti baris dari atas ke bawah. Perulangan bersarang adalah alat utama programmer untuk <strong>mengendalikan posisi kursor dua dimensi $(i, j)$</strong>, di mana variabel outer loop <code className="font-mono font-bold text-purple-700 dark:text-purple-300">i</code> mewakili nomor baris (arah vertikal) dan variabel inner loop <code className="font-mono font-bold text-sky-700 dark:text-sky-300">j</code> mewakili nomor kolom (arah horizontal).
              </p>

              {/* Lab Simulator Grid Coords */}
              <NestedGridCoordsLab />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                <div className="p-4 rounded-xl bg-card border border-border space-y-2">
                  <div className="font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>Penjelajahan Baris-demi-Baris (Row-Major Order):</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Standar baku yang paling umum: Outer loop mengatur indeks baris <code className="font-mono font-bold text-purple-700 dark:text-purple-300">i</code> (0, 1, 2, ...), sedangkan inner loop menelusuri kolom <code className="font-mono font-bold text-sky-700 dark:text-sky-300">j</code> dari kiri ke kanan sampai batas kolom tercapai.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-card border border-border space-y-2">
                  <div className="font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    <span>Mekanisme Pindah Baris (Newline Carriage Return):</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Karakter dicetak menyamping memakai <code className="font-mono font-bold text-emerald-700 dark:text-emerald-300">print(..., end=" ")</code> di dalam inner loop. Tepat setelah inner loop selesai menyapu seluruh kolom pada satu baris, outer loop memanggil <code className="font-mono font-bold text-purple-700 dark:text-purple-300">print()</code> (tanpa parameter) tepat 1 kali untuk menurunkan kursor ke baris berikutnya.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SUB-BAB 3: REKAYASA POLA GEOMETRIS VISUAL                               */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-xs transition-all hover:border-purple-500/40 ${isOpen3 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button
          onClick={() => setIsOpen3(!isOpen3)}
          className="group w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
                <Shapes className="w-6 h-6 md:w-7 md:h-7" />
              </span>
              <span>3. Rekayasa Pola Geometris Visual (Pattern Generation Logic)</span>
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Capaian: Mampu merumuskan batas iterasi inner loop yang bergantung pada variabel outer loop untuk membentuk pola non-persegi.</span>
            </div>
          </div>
          <div className={`p-2 rounded-full bg-secondary/80 text-muted-foreground transition-transform duration-300 shrink-0 ${isOpen3 ? 'rotate-180 bg-purple-500/20 text-purple-700 dark:text-purple-300' : 'group-hover:bg-secondary'}`}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </button>

        <AnimatePresence>
          {isOpen3 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 border-t border-border/60 space-y-6 text-base leading-relaxed text-slate-700 dark:text-slate-300"
            >
              <p>
                Kunci utama membentuk bangun geometri (seperti segitiga siku-siku, piramida, atau tangga) adalah <strong>menjadikan batas inner loop dinamis</strong>. Alih-alih menggunakan angka konstan $N$, batas inner loop dikaitkan langsung dengan variabel baris luar <code className="font-mono font-bold text-purple-700 dark:text-purple-300">i</code>.
              </p>

              {/* Lab Pattern Studio */}
              <PatternGeneratorLab />

              {/* Pembedahan 3 Kategori Pola */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
                <div className="p-4 rounded-xl bg-card border border-border space-y-1.5">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                    Kategori 1: Bertumbuh (Ascending)
                  </span>
                  <div className="font-bold text-foreground">Segitiga Siku-Siku: range(i + 1)</div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11.5px]">
                    Jumlah bintang sama dengan nomor baris: baris 0 ada 1 bintang, baris 1 ada 2 bintang, baris 2 ada 3 bintang.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-card border border-border space-y-1.5">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-700 dark:text-rose-400">
                    Kategori 2: Menyusut (Descending)
                  </span>
                  <div className="font-bold text-foreground">Segitiga Terbalik: range(N - i)</div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11.5px]">
                    Jumlah bintang dimulai dari penuh ($N$) dan berkurang 1 pada setiap langkah berikutnya ($N - i$).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-card border border-border space-y-1.5">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-400">
                    Kategori 3: Kontinu (Akumulatif)
                  </span>
                  <div className="font-bold text-foreground">Segitiga Floyd: counter += 1</div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11.5px]">
                    Variabel counter dipertahankan di luar loop sehingga angka yang dicetak terus mengalir tanpa reset di baris baru.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SUB-BAB 4: TABEL PERKALIAN MATEMATIKA & AGREGASI DATA GRID 2D           */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-xs transition-all hover:border-purple-500/40 ${isOpen4 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button
          onClick={() => setIsOpen4(!isOpen4)}
          className="group w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
                <Calculator className="w-6 h-6 md:w-7 md:h-7" />
              </span>
              <span>4. Tabel Perkalian Matematika &amp; Pola Akumulasi Data Grid</span>
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Capaian: Mengimplementasikan kalkulasi produk silang matriks dan agregasi akumulator dua dimensi.</span>
            </div>
          </div>
          <div className={`p-2 rounded-full bg-secondary/80 text-muted-foreground transition-transform duration-300 shrink-0 ${isOpen4 ? 'rotate-180 bg-purple-500/20 text-purple-700 dark:text-purple-300' : 'group-hover:bg-secondary'}`}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </button>

        <AnimatePresence>
          {isOpen4 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 border-t border-border/60 space-y-6 text-base leading-relaxed text-slate-700 dark:text-slate-300"
            >
              <p>
                Salah satu penerapan terapan klasik dari perulangan bersarang adalah menghasilkan <strong>Tabel Perkalian Silang</strong>. Setiap sel pada baris <code className="font-mono font-bold text-purple-700 dark:text-purple-300">i</code> dan kolom <code className="font-mono font-bold text-sky-700 dark:text-sky-300">j</code> diisi dengan hasil evaluasi matematika $i \times j$.
              </p>

              {/* Lab Multiplication Matrix */}
              <MultiplicationMatrixLab />

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-950 dark:text-amber-200 space-y-2 font-medium">
                <div className="font-bold flex items-center gap-2 text-amber-800 dark:text-amber-300">
                  <Sparkles className="w-4 h-4" />
                  <span>Kaidah Penataan Format Output Teks (Formatting Width):</span>
                </div>
                <p className="leading-relaxed">
                  Saat mencetak angka ke layar konsol, angka 1 digit (<code className="font-mono">1</code>) dan angka 2 digit (<code className="font-mono">25</code>) memiliki lebar karakter yang berbeda, sehingga kolom tabel akan bergelombang dan tidak lurus. Untuk mengatasinya:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>
                    Di <strong>Python</strong>: Gunakan f-string specifier lebar, misal <code className="font-mono bg-amber-500/20 px-1 rounded">print(f"&#123;hasil:3d&#125;", end=" ")</code> agar setiap angka dijamin memakan 3 karakter rata kanan.
                  </li>
                  <li>
                    Di <strong>JavaScript</strong>: Gunakan fungsi string <code className="font-mono bg-amber-500/20 px-1 rounded">String(hasil).padStart(3, " ")</code> untuk menambahkan spasi pengisi di sisi kiri.
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SUB-BAB 5: KOMPLEKSITAS KUADRATIK O(N^2) & KENDALI BREAK / CONTINUE     */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-xs transition-all hover:border-purple-500/40 ${isOpen5 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button
          onClick={() => setIsOpen5(!isOpen5)}
          className="group w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
                <TrendingUp className="w-6 h-6 md:w-7 md:h-7" />
              </span>
              <span>5. Analisis Kompleksitas Waktu Kuadratik $O(n^2)$ &amp; Pengendali Alur (break &amp; continue)</span>
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Capaian: Memahami lonjakan beban komputasi kuadratik dan mengendalikan pemutusan multi-loop secara tepat.</span>
            </div>
          </div>
          <div className={`p-2 rounded-full bg-secondary/80 text-muted-foreground transition-transform duration-300 shrink-0 ${isOpen5 ? 'rotate-180 bg-purple-500/20 text-purple-700 dark:text-purple-300' : 'group-hover:bg-secondary'}`}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </button>

        <AnimatePresence>
          {isOpen5 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 border-t border-border/60 space-y-6 text-base leading-relaxed text-slate-700 dark:text-slate-300"
            >
              <p>
                Meskipun perulangan bersarang sangat ampuh untuk memecahkan masalah multi-dimensi, kita wajib mewaspadai dampaknya terhadap performa komputer. Penambahan satu lapis perulangan bersarang mengubah kompleksitas waktu algoritma dari linear $O(n)$ menjadi <strong>kuadratik $O(n^2)$</strong>.
              </p>

              {/* Lab Complexity & Break Circuit */}
              <NestedLoopComplexityLab />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-950 dark:text-rose-200 space-y-2">
                  <div className="font-bold flex items-center gap-2 text-rose-800 dark:text-rose-300">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Hukum Pemutusan 'break' pada Nested Loop:</span>
                  </div>
                  <p className="leading-relaxed">
                    Perintah <code className="font-mono bg-rose-500/20 px-1 rounded">break</code> <strong>HANYA MENGHENTIKAN LOOP TERDEKAT</strong> tempat ia berada. Jika diletakkan di dalam inner loop, ia hanya menghentikan inner loop saat itu. Outer loop akan tetap lanjut melangkah ke baris berikutnya!
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-950 dark:text-emerald-200 space-y-2">
                  <div className="font-bold flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Pola Terstruktur Murni (Single-Entry Single-Exit / SESE):</span>
                  </div>
                  <p className="leading-relaxed">
                    Sesuai kaidah pemrograman terstruktur (Aturan 41 &amp; 42), hindari ketergantungan pada <code>break</code>. Gunakan perulangan terkondisi <code>while</code> dengan penanda boolean ramah kognitif <code>ditemukan == False</code> di kedua tingkatan loop:
                  </p>
                  <pre className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 font-mono text-[11px] text-emerald-900 dark:text-emerald-200 overflow-x-auto leading-relaxed">
{`# Mencari pasangan koordinat (i, j) yang hasil kalinya cocok dengan target (misal target = 12)
ditemukan = False
i = 1
while i <= M and ditemukan == False:
    j = 1
    while j <= N and ditemukan == False:
        if (i * j) == target:
            target_i = i
            target_j = j
            ditemukan = True  # Berhenti terstruktur di kedua loop
        j += 1
    i += 1`}
                  </pre>
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
                    Ketika kondisi target terpenuhi, bendera <code>ditemukan = True</code> menyebabkan pengujian kondisi di kedua perulangan bernilai False secara bersih tanpa interupsi paksa.
                  </p>
                </div>
              </div>

              {/* Jembatan Pedagogis (Cliffhanger) ke Bab 11: Struktur Data List & Tuple */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-sky-500/10 border-2 border-purple-500/30 space-y-3">
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-bold text-sm">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Jembatan Menuju Bab 11: Dari Menampilkan Layar Menuju Menyimpan Data Memori</span>
                </div>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Sepanjang <strong>Pertemuan 10</strong> ini, kita telah berhasil menghitung ribuan titik koordinat, merekayasa pola visual geometris, hingga menyusun tabel perkalian matematika secara dinamis. Namun perhatikan satu hal: <strong>seluruh data tersebut langsung hilang dari memori begitu selesai dicetak ke layar konsol!</strong>
                </p>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Lalu, bagaimana jika hasil perhitungan multi-dimensi tersebut ingin kita <strong>SIMPAN</strong> ke dalam variabel agar dapat dicari, dimanipulasi, dan diolah kembali kapan saja? Jawabannya akan kita bedah tuntas pada materi berikutnya: <strong className="text-purple-700 dark:text-purple-400">Pertemuan 11: Struktur Data Berurutan (List &amp; Tuple)</strong>!
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-purple-700 dark:text-purple-300">
                  <span>Prasyarat Algoritma Selesai Dipelajari: Kontrol Alur 2D</span>
                  <span className="flex items-center gap-1 font-bold">
                    <span>Materi Selanjutnya: List &amp; Tuple</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
