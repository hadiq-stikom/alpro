"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Repeat,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Terminal,
  Code2,
  Layers,
  BookOpen,
  FlaskConical,
  HelpCircle,
  AlertTriangle,
  RotateCw,
  Compass,
  Calculator,
  Zap,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import AnimatedLoopDefinition from './AnimatedLoopDefinition';
import ForLoopStepperLab from './chapter9/ForLoopStepperLab';
import ForLoopRepresentationMatrix from './chapter9/ForLoopRepresentationMatrix';
import WhileSentinelLab from './chapter9/WhileSentinelLab';
import WhileLoopRepresentationMatrix from './chapter9/WhileLoopRepresentationMatrix';
import LoopAccumulatorRamLab from './chapter9/LoopAccumulatorRamLab';
import BreakContinueLab from './chapter9/BreakContinueLab';

export default function Pertemuan9() {
  // Seluruh sub-materi tertutup secara default sesuai Standar Pedagogis Aturan 19
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);

  return (
    <div className="space-y-12 overflow-visible">
      
      {/* ─── Hero Header Pertemuan 9 ────────────────────────────────────────── */}
      <header className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-full mb-4 shadow-inner">
          <Repeat className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Dasar Perulangan (FOR &amp; WHILE Loop)
        </h1>
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Kekuatan sejati komputer terletak pada kemampuannya mengulang kalkulasi jutaan kali tanpa rasa lelah. Pelajari cara mengendalikan perulangan terhitung{' '}
          <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-bold text-emerald-700 dark:text-emerald-300">FOR</code>, perulangan berkondisi{' '}
          <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-bold text-teal-700 dark:text-teal-300">WHILE</code>, nilai sentinel, pola akumulator, hingga sirkuit kendali{' '}
          <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-bold text-rose-700 dark:text-rose-300">break &amp; continue</code>.
        </p>

        {/* 4 Pilar Representasi Badge */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {[
            { icon: '📝', label: 'Naratif Iterasi Terstruktur', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30' },
            { icon: '🔷', label: 'Flowchart Loopback ANSI', color: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30' },
            { icon: '📋', label: 'Pseudocode CLRS (for/while)', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30' },
            { icon: '💻', label: 'Kode Python (range) & JS (for let)', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30' },
          ].map((item) => (
            <span key={item.label} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${item.color}`}>
              {item.icon} {item.label}
            </span>
          ))}
        </div>

        {/* Tombol CTA ke Code Studio */}
        <div className="pt-2">
          <Link
            href="/workspace?chapter=9"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
          >
            <Terminal className="w-4 h-4" />
            <span>Buka Interactive Code Studio (Latihan Coding Bab 9)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SUB-BAB 1: HAKIKAT PERULANGAN (DEFINITE VS INDEFINITE)                  */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-xs transition-all hover:border-emerald-500/40 ${isOpen1 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button
          onClick={() => setIsOpen1(!isOpen1)}
          className="group w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                <Repeat className="w-6 h-6 md:w-7 md:h-7" />
              </span>
              <span>1. Hakikat Perulangan: Mengapa Komputer Membutuhkan Loop?</span>
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold pl-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Capaian: Memahami hakikat iterasi komputasi dan membedakan Definite Iteration (FOR) vs Indefinite Iteration (WHILE).</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground transition-transform duration-300 shrink-0 ${isOpen1 ? 'rotate-180 text-emerald-500' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen1 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="p-6 md:p-8 pt-0 space-y-6 border-t border-border/40"
            >
              {/* Narasi Filosofi */}
              <div className="space-y-4 pt-4 text-slate-700 dark:text-slate-300">
                <p>
                  Bayangkan jika Anda diminta mencetak angka 1 sampai 1.000 ke layar. Tanpa perulangan, Anda harus mengetikkan 1.000 baris instruksi <code>print(1)</code>, <code>print(2)</code>, hingga <code>print(1000)</code>. Cara manual ini sangat tidak realistis, melanggar prinsip <strong>DRY (Don&apos;t Repeat Yourself)</strong>, dan memicu pemborosan memori.
                </p>
                <p>
                  Dalam ilmu komputer, <strong>Perulangan (Looping / Iteration)</strong> adalah mekanisme di mana prosesor mengeksekusi blok kode yang sama berulang kali selama syarat terminasi masih bernilai <strong>True</strong>.
                </p>
              </div>

              {/* Komponen Visualizer Dua Sisi 2D */}
              <AnimatedLoopDefinition />

              {/* Rangkuman Komparasi Definite vs Indefinite */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-card border border-emerald-500/30 space-y-2">
                  <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Perulangan Terhitung (Definite Iteration)</span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Jumlah putaran sudah <strong>pasti dan terukur sejak awal</strong> sebelum perulangan dijalankan. Diimplementasikan secara utama menggunakan struktur <code>FOR</code> dan generator deret <code>range</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-card border border-teal-500/30 space-y-2">
                  <h4 className="font-bold text-sm text-teal-700 dark:text-teal-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Perulangan Terkondisi (Indefinite Iteration)</span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Jumlah putaran <strong>tidak diketahui di awal</strong> karena bergantung pada interaksi dinamis pengguna, masukan sensor, atau kondisi data runtime. Diimplementasikan menggunakan struktur <code>WHILE</code>.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SUB-BAB 2: STRUKTUR FOR LOOP & ANATOMI RANGE / COUNTER                  */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-xs transition-all hover:border-emerald-500/40 ${isOpen2 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button
          onClick={() => setIsOpen2(!isOpen2)}
          className="group w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                <Compass className="w-6 h-6 md:w-7 md:h-7" />
              </span>
              <span>2. Struktur Perulangan Terhitung: FOR Loop &amp; Anatomi Counter</span>
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold pl-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Capaian: Mengonstruksi FOR loop dwibahasa, mengendalikan rentang range(start, stop, step), dan memahami batas eksklusif.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground transition-transform duration-300 shrink-0 ${isOpen2 ? 'rotate-180 text-emerald-500' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen2 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="p-6 md:p-8 pt-0 space-y-6 border-t border-border/40"
            >
              <div className="space-y-4 pt-4 text-slate-700 dark:text-slate-300">
                <p>
                  Struktur <code>FOR</code> menggunakan variabel pencacah (*counter variable*) yang otomatis mengambil nilai dari deret urutan. Di Python, deret ini digenerasi menggunakan fungsi bawaan <code>range(start, stop, step)</code>:
                </p>

                {/* Card 3 Parameter Range */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-card border border-border shadow-xs space-y-1">
                    <span className="font-mono text-xs font-bold text-sky-700 dark:text-sky-400">1. start (Nilai Awal)</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Titik mula pencacah (opsional, default = 0 jika tidak ditulis).</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border shadow-xs space-y-1">
                    <span className="font-mono text-xs font-bold text-rose-700 dark:text-rose-400">2. stop (Batas Akhir Eksklusif)</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Batas akhir yang <strong>tidak pernah disentuh</strong> (berhenti pada stop - 1).</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border shadow-xs space-y-1">
                    <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400">3. step (Interval / Langkah)</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Besaran loncatan nilai pencacah (default = +1, bisa negatif untuk mundur).</p>
                  </div>
                </div>
              </div>

              {/* Laboratorium Interaktif 1: Range Stepper */}
              <ForLoopStepperLab />

              {/* Komparasi 4 Representasi Baku FOR Loop (Naratif, Flowchart ANSI/ISO, Pseudocode CLRS, Kode Program) */}
              <ForLoopRepresentationMatrix />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SUB-BAB 3: WHILE LOOP & PENCEGAHAN INFINITE LOOP                         */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-xs transition-all hover:border-teal-500/40 ${isOpen3 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button
          onClick={() => setIsOpen3(!isOpen3)}
          className="group w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
                <RotateCw className="w-6 h-6 md:w-7 md:h-7" />
              </span>
              <span>3. Struktur WHILE Loop, Sentinel Value &amp; Bahaya Infinite Loop</span>
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold pl-1">
              <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
              <span>Capaian: Mengonstruksi perulangan terkondisi WHILE, menerapkan sentinel value, dan menganalisis kondisi terminasi anti-hang.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground transition-transform duration-300 shrink-0 ${isOpen3 ? 'rotate-180 text-teal-500' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen3 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="p-6 md:p-8 pt-0 space-y-6 border-t border-border/40"
            >
              <div className="space-y-4 pt-4 text-slate-700 dark:text-slate-300">
                <p>
                  Berbeda dengan <code>FOR</code> yang mengelola pencacah secara otomatis di kepala loop, perulangan <code>WHILE</code> adalah struktur perulangan terkondisi (<em>pre-test conditional loop</em>). Menurut literatur baku ilmu komputer (<em>Tony Gaddis, Deitel &amp; Deitel, serta CLRS</em>), perulangan <code>WHILE</code> tersusun atas <strong>3 Unsur Pengendali Loop (<em>Loop Control Elements</em>)</strong>:
                </p>

                {/* Card 3 Unsur Penyusun Struktur WHILE Loop (Identik dengan 3 Parameter Range pada FOR) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-card border border-border shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-sky-700 dark:text-sky-400">1. Inisialisasi (Initialization)</span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20">
                        Praloop
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Pemberian nilai mula-mula pada variabel pengendali perulangan (<em>loop control variable</em>) <strong>sebelum</strong> blok perulangan dimasuki. Contoh: <code>i = 1</code>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-card border border-border shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-rose-700 dark:text-rose-400">2. Kondisi Uji (Test Condition)</span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20">
                        Kepala Loop
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Ekspresi logika boolean (<em>loop-continuation condition</em>) yang diuji di awal setiap iterasi (<em>pre-test</em>). Badan loop hanya dijalankan jika bernilai <strong>True</strong>. Contoh: <code>i &le; 5</code>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-card border border-border shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400">3. Pembaruan Nilai (Update / Step)</span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                        Badan Loop
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Instruksi di dalam tubuh perulangan yang mengubah nilai variabel pengendali pada setiap putaran agar mendekati titik terminasi <strong>False</strong>. Contoh: <code>i += 1</code>.
                    </p>
                  </div>
                </div>

                {/* Komparasi Pedagogis & Peringatan Infinite Loop */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-950 dark:text-amber-200 space-y-2">
                  <div className="font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Korelasi Arsitektur FOR vs WHILE &amp; Bahaya Infinite Loop:</span>
                  </div>
                  <div className="text-[11.5px] leading-relaxed space-y-1.5 text-slate-700 dark:text-slate-300">
                    <p>
                      Pada struktur <code>FOR</code>, ketiga unsur di atas disatukan secara otomatis di kepala loop lewat <code>range(start, stop, step)</code>.
                    </p>
                    <p>
                      Sebaliknya pada <code>WHILE</code>, pemrogram <strong>wajib memisahkan dan menuliskan ketiga unsur ini secara manual</strong>. Jika unsur ke-3 (<strong>Pembaruan Nilai / Update</strong>) terlewat atau tidak pernah membuat kondisi uji menjadi <code>False</code>, komputer akan terjebak dalam <strong>Infinite Loop (Perulangan Tak Hingga)</strong> dan aplikasi akan <em>hang</em>!
                    </p>
                  </div>
                </div>
              </div>

              {/* Laboratorium Interaktif 2: While & Sentinel Trap */}
              <WhileSentinelLab />

              {/* Komparasi 4 Representasi Baku WHILE Loop (Naratif, Flowchart ANSI/ISO, Pseudocode CLRS, Kode Program) */}
              <WhileLoopRepresentationMatrix />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SUB-BAB 4: POLA AKUMULATOR & TRACE TABLE                               */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-xs transition-all hover:border-indigo-500/40 ${isOpen4 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button
          onClick={() => setIsOpen4(!isOpen4)}
          className="group w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                <Calculator className="w-6 h-6 md:w-7 md:h-7" />
              </span>
              <span>4. Algoritma Pola Akumulator: Penjumlahan Deret, Rerata &amp; Nilai Ekstrem</span>
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold pl-1">
              <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>Capaian: Mengimplementasikan pola akumulator data (sum/average) dan penelusuran nilai ekstrem (max/min) dengan trace table RAM.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground transition-transform duration-300 shrink-0 ${isOpen4 ? 'rotate-180 text-indigo-500' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen4 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="p-6 md:p-8 pt-0 space-y-6 border-t border-border/40"
            >
              <div className="space-y-4 pt-4 text-slate-700 dark:text-slate-300">
                <p>
                  <strong>Pola Akumulator (*Accumulator Pattern*)</strong> adalah pola algoritma paling sering digunakan di dunia nyata. Pola ini mengumpulkan hasil kalkulasi sedikit demi sedikit di setiap putaran loop ke dalam satu variabel penampung.
                </p>

                <div className="p-4 rounded-xl bg-card border border-border text-xs space-y-2">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">
                    Aturan Emas Penempatan Akumulator:
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">
                    Variabel penampung seperti <code>total = 0</code> <strong>WAJIB diinisialisasi SEBELUM loop dimulai</strong>. Jika ditaruh di dalam badan loop, nilai total akan terus di-reset kembali ke 0 di setiap putaran, sehingga kalkulasi penjumlahan gagal total!
                  </p>
                </div>
              </div>

              {/* Laboratorium Interaktif 3: Accumulator & RAM Trace Table */}
              <LoopAccumulatorRamLab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SUB-BAB 5: BREAK, CONTINUE & PENGENDALIAN SIRKUIT                       */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-xs transition-all hover:border-rose-500/40 ${isOpen5 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button
          onClick={() => setIsOpen5(!isOpen5)}
          className="group w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 shrink-0">
                <Zap className="w-6 h-6 md:w-7 md:h-7" />
              </span>
              <span>5. Pengendalian Aliran Ekstra: Break, Continue &amp; Klausul Else</span>
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold pl-1">
              <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Capaian: Mengendalikan aliran eksekusi loop secara presisi menggunakan kata kunci break, continue, dan klausul else pada Python.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground transition-transform duration-300 shrink-0 ${isOpen5 ? 'rotate-180 text-rose-500' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen5 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="p-6 md:p-8 pt-0 space-y-6 border-t border-border/40"
            >
              <div className="space-y-4 pt-4 text-slate-700 dark:text-slate-300">
                <p>
                  Terkadang kita perlu menginterupsi jalannya perulangan sebelum kondisi terminasi alaminya tercapai. Bahasa pemrograman menyediakan dua kata kunci kendali:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-card border border-rose-500/30 space-y-1">
                    <span className="font-bold text-xs text-rose-600 dark:text-rose-400 font-mono">break (Hentikan Total)</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Menghentikan perulangan secara paksa dan langsung melompat keluar ke baris perintah setelah loop. Seluruh sisa putaran dibatalkan.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-card border border-amber-500/30 space-y-1">
                    <span className="font-bold text-xs text-amber-600 dark:text-amber-400 font-mono">continue (Lewati Putaran Ini)</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Melewati sisa baris perintah pada putaran saat ini, lalu langsung melompat ke putaran berikutnya (tidak menghentikan seluruh perulangan).
                    </p>
                  </div>
                </div>
              </div>

              {/* Laboratorium Interaktif 4: Break & Continue */}
              <BreakContinueLab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
