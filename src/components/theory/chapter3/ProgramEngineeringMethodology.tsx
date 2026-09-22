"use client";

import React, { useState } from 'react';
import { 
  Brain, 
  Workflow, 
  Code2, 
  CheckSquare, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Variable, 
  Calculator, 
  Scale, 
  Cpu, 
  Play, 
  RotateCcw,
  Zap,
  FileCode2,
  TerminalSquare,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProgramEngineeringMethodology() {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [activeLabTab, setActiveLabTab] = useState<'analisis' | 'desain' | 'coding' | 'testing'>('analisis');
  const [testWeight, setTestWeight] = useState<string>('68');
  const [testHeight, setTestHeight] = useState<string>('172');
  const [selectedMistake, setSelectedMistake] = useState<number>(0);

  // Perhitungan interaktif untuk Lab Testing
  const numWeight = parseFloat(testWeight);
  const numHeight = parseFloat(testHeight);
  const isValid = !isNaN(numWeight) && !isNaN(numHeight) && numWeight > 0 && numHeight > 0;
  
  let bmiResult: number | null = null;
  let categoryResult = '';
  let categoryColor = '';
  let statusMessage = '';

  if (isValid) {
    const heightInMeters = numHeight / 100;
    bmiResult = Number((numWeight / (heightInMeters * heightInMeters)).toFixed(1));
    if (bmiResult < 18.5) {
      categoryResult = 'Kurus (Underweight)';
      categoryColor = 'text-amber-500 bg-amber-500/10 border-amber-500/30';
      statusMessage = 'Perlu asupan nutrisi seimbang untuk mencapai berat ideal.';
    } else if (bmiResult <= 24.9) {
      categoryResult = 'Normal (Ideal)';
      categoryColor = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
      statusMessage = 'Pertahankan pola makan dan aktivitas fisik yang sehat!';
    } else if (bmiResult <= 29.9) {
      categoryResult = 'Kelebihan Berat Badan (Overweight)';
      categoryColor = 'text-orange-500 bg-orange-500/10 border-orange-500/30';
      statusMessage = 'Disarankan meningkatkan intensitas olahraga dan kontrol kalori.';
    } else {
      categoryResult = 'Obesitas (Obese)';
      categoryColor = 'text-rose-500 bg-rose-500/10 border-rose-500/30';
      statusMessage = 'Perlu konsultasi medis dan program penurunan berat terarah.';
    }
  }

  const commonMistakes = [
    {
      title: "1. Menganggap Angka Pasti 'Integer'",
      problem: "Menggunakan tipe integer untuk variabel 'berat' (misal: 62.5 kg dipaksa jadi 62 kg).",
      consequence: "Presisi desimal hilang terpotong. Perhitungan BMI menjadi tidak akurat hingga selisih 0.5 - 1.0 poin.",
      solution: "Gunakan tipe data Float (pecahan) untuk seluruh pengukuran fisika/matematis kontinu."
    },
    {
      title: "2. Masukan Angka Tertinggal sebagai 'String'",
      problem: "Hasil input pengguna dari keyboard tidak di-konversi ke angka sebelum dihitung.",
      consequence: "Di komputer, '65' + '5' bukan menghasilkan 70, melainkan teks gabungan '655'! Operasi pembagian akan memicu TypeError (Crash).",
      solution: "Wajib melakukan Type Casting (konversi tipe data eksplisit) dari string masukan ke tipe numerik."
    },
    {
      title: "3. Tanpa Analisis Batas: Pembagian dengan Nol",
      problem: "Mengabaikan analisis domain data saat tinggi badan yang dimasukkan adalah 0 cm.",
      consequence: "Komputer mengalami 'Division by Zero' crash seketika karena pembagian dengan angka nol mustahil secara matematika.",
      solution: "Sertakan pra-syarat (precondition): tinggi > 0 dan berat > 0 sebelum proses pembagian dijalankan."
    }
  ];

  return (
    <div className="space-y-12">
      {/* 1. Header Pembuka & Paradigma Think First Code Later */}
      <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10 rounded-2xl border border-indigo-500/20 p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/15 text-indigo-400 rounded-full text-xs font-semibold uppercase tracking-wider border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Paradigma Utama Insinyur Perangkat Lunak
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              Prinsip 70/30: <span className="text-indigo-600 dark:text-indigo-400">Think First</span>, Code Later
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl font-medium">
              Kesalahan fatal yang paling sering menjebak pemrogram pemula adalah <em>terburu-buru membuka editor dan langsung mengetik baris kode</em>. Di era rekayasa modern, menulis sintaksis kode adalah pekerjaan hilir yang mekanis. Nilai intelektual sejati seorang analis dan pemrogram terletak pada **kematangan analisis hulu**: menemukan persamaan, membedah variabel beserta tipe datanya, dan merancang arsitektur alur algoritma sebelum satu baris kode pun dieksekusi.
            </p>
          </div>
          <div className="shrink-0 flex items-center justify-center">
            <div className="p-4 bg-background/80 backdrop-blur rounded-2xl border border-border/80 shadow-md text-center space-y-2 w-48">
              <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">70% : 30%</div>
              <div className="text-xs text-slate-700 dark:text-slate-300 font-bold">
                70% Analisis &amp; Desain<br />
                30% Coding &amp; Testing
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden flex">
                <div className="h-full bg-indigo-500 w-[70%]" title="Analisis & Desain (70%)"></div>
                <div className="h-full bg-cyan-500 w-[30%]" title="Coding & Testing (30%)"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Tahap Ringkas Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border/50">
          <div className="p-4 rounded-xl bg-card border border-indigo-500/30 space-y-1 relative overflow-hidden">
            <div className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">FASE 1 (HULU)</div>
            <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Analisis Masalah
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">Mencari rumus/persamaan &amp; membedah tipe data tiap variabel.</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-amber-500/30 space-y-1 relative overflow-hidden">
            <div className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">FASE 2 (ARSITEKTUR)</div>
            <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
              <Workflow className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Desain Algoritma
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">Merangkai alur bebas ambiguitas (Naratif, Flowchart, Pseudocode).</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-cyan-500/30 space-y-1 relative overflow-hidden">
            <div className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400">FASE 3 (HILIR)</div>
            <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Implementasi (Coding)
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">Menerjemahkan alur ke sintaks bahasa pemrograman resmi.</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-emerald-500/30 space-y-1 relative overflow-hidden">
            <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">FASE 4 (VALIDASI)</div>
            <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Pengujian (Testing)
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">Menguji kasus normal, batas ekstrem, dan mendeteksi logic error.</p>
          </div>
        </div>
      </div>

      {/* 2. Stepper 4 Tahap Pembahasan Mendalam */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h4 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Eksplorasi Mendalam 4 Siklus Rekayasa Program
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              Pilih tahapan di bawah ini untuk melihat detail teknis, peran pedagogis, dan risiko fatal jika tahapan tersebut dilewati.
            </p>
          </div>
          {/* Navigation Pill Buttons */}
          <div className="flex items-center gap-1.5 bg-secondary/40 p-1.5 rounded-xl border border-border/60 shrink-0">
            {[
              { id: 1, label: '1. Analisis', icon: Brain },
              { id: 2, label: '2. Desain', icon: Workflow },
              { id: 3, label: '3. Coding', icon: Code2 },
              { id: 4, label: '4. Testing', icon: CheckSquare },
            ].map((step) => {
              const Icon = step.icon;
              const isActive = activeStage === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStage(step.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-slate-700 dark:text-slate-300 hover:text-foreground hover:bg-secondary/60 font-semibold'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Card by Active Stage */}
        <AnimatePresence mode="wait">
          {activeStage === 1 && (
            <motion.div
              key="stage-1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-6 md:p-8 bg-card border border-indigo-500/30 rounded-2xl space-y-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    TAHAP 1: ANALISIS MASALAH (HULU UTAMA)
                  </span>
                  <h4 className="text-2xl font-bold text-foreground mt-2">
                    Mencari Persamaan Matematis &amp; Mengurai Tipe Data Tiap Variabel
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 text-sm mt-1 font-medium">
                    Tahapan paling mendasar di mana seorang pemrogram membedah dunia nyata menjadi model komputasi yang terukur.
                  </p>
                </div>
                <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 shrink-0">
                  <Brain className="w-8 h-8" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-secondary/30 rounded-xl border border-border/70 space-y-3">
                  <div className="font-bold text-sm text-foreground flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    A. Menemukan Relasi &amp; Persamaan (Formula)
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Setiap masalah komputasi memiliki hubungan matematis atau aturan logika yang mengikatnya. Pemrogram wajib merumuskan apa yang menjadi <strong>Masukan (Input)</strong>, apa <strong>Keluaran yang Diinginkan (Output)</strong>, dan bagaimana <strong>Rumus Transformasinya (Proses)</strong>.
                  </p>
                  <div className="p-3 bg-background/80 rounded-lg border border-border/50 text-xs font-mono text-slate-700 dark:text-slate-300 space-y-1">
                    <div className="text-indigo-600 dark:text-indigo-400 font-bold"># Contoh Pemodelan Persamaan:</div>
                    <div>Input  : massa (kg), percepatan (m/s²)</div>
                    <div>Rumus  : gaya = massa * percepatan</div>
                    <div>Output : gaya (Newton)</div>
                  </div>
                </div>

                <div className="p-5 bg-secondary/30 rounded-xl border border-border/70 space-y-3">
                  <div className="font-bold text-sm text-foreground flex items-center gap-2">
                    <Variable className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    B. Dekomposisi Variabel &amp; Penentuan Tipe Data
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Setelah rumus ditemukan, kita bedah setiap variabel yang terlibat. Komputer memerlukan kejelasan: <em>Berapa banyak memori yang harus disiapkan? Apakah nilainya bisa berupa pecahan, atau murni bilangan bulat diskrit?</em>
                  </p>
                  <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300 font-medium">
                    <li className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <strong>Integer (Bilangan Bulat):</strong> Untuk kuantitas diskrit (jumlah anak, frekuensi perulangan, nomor tiket).
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <strong>Float (Bilangan Pecahan):</strong> Untuk pengukuran fisik berkelanjutan (berat badan, suhu, saldo desimal).
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      <strong>String (Teks):</strong> Untuk data identitas non-kalkulatif (nama, nomor induk mahasiswa, kategori teks).
                    </li>
                  </ul>
                </div>
              </div>

              {/* Jembatan Pedagogis */}
              <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/30 flex items-start gap-3 text-xs text-indigo-950 dark:text-indigo-300">
                <Sparkles className="w-5 h-5 shrink-0 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                <div>
                  <strong className="text-indigo-900 dark:text-indigo-200 block text-sm mb-0.5">Jembatan Menuju Pseudocode &amp; Bab 4:</strong>
                  Hasil dari dekomposisi variabel dan tipe data pada tahap Analisis ini nantinya akan langsung kita salin menjadi blok <strong>KAMUS:</strong> pada Pseudocode (Bab 3), dan menjadi deklarasi tipe data teknis di dalam bahasa pemrograman (Bab 4).
                </div>
              </div>
            </motion.div>
          )}

          {activeStage === 2 && (
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-6 md:p-8 bg-card border border-amber-500/30 rounded-2xl space-y-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    TAHAP 2: DESAIN SOLUSI &amp; ARSITEKTUR ALGORITMA
                  </span>
                  <h4 className="text-2xl font-bold text-foreground mt-2">
                    Menyusun Langkah Rinci Bebas Ambiguitas
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 text-sm mt-1 font-medium">
                    Menerjemahkan hasil analisis persamaan menjadi alur langkah terurut yang independen dari bahasa pemrograman.
                  </p>
                </div>
                <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500 dark:text-amber-400 shrink-0">
                  <Workflow className="w-8 h-8" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-secondary/30 rounded-xl border border-border/70 space-y-2">
                  <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center font-mono font-bold">1</span>
                    Bebas Bahasa Mesin
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Algoritma dirancang tanpa memikirkan apakah nanti akan diketik di Python, C++, Java, atau Rust. Jika logikanya sudah benar, ia bisa diimplementasikan ke bahasa apa pun.
                  </p>
                </div>

                <div className="p-4 bg-secondary/30 rounded-xl border border-border/70 space-y-2">
                  <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center font-mono font-bold">2</span>
                    Kejelasan &amp; Tanpa Ambiguitas
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Komputer tidak memiliki intuisi manusia. Setiap instruksi harus bersifat <em>definitif</em>: apa yang diperiksa jika kondisi benar, dan apa yang dijalankan jika salah.
                  </p>
                </div>

                <div className="p-4 bg-secondary/30 rounded-xl border border-border/70 space-y-2">
                  <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center font-mono font-bold">3</span>
                    Media Desain Formal
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Desain dituangkan ke dalam 3 instrumen standar yang akan kita pelajari pada sub-bab berikutnya: <strong>Naratif</strong>, <strong>Flowchart</strong>, dan <strong>Pseudocode</strong>.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30 text-xs text-amber-950 dark:text-amber-300 font-medium">
                <strong className="text-amber-900 dark:text-amber-200 block text-sm mb-1 font-bold">Prinsip Emas Arsitektur:</strong>
                Jika Anda belum bisa menjelaskan langkah-langkah penyelesaian masalah secara terstruktur di atas kertas atau flowchart, maka Anda <em>belum siap</em> menulis kodenya di komputer!
              </div>
            </motion.div>
          )}

          {activeStage === 3 && (
            <motion.div
              key="stage-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-6 md:p-8 bg-card border border-cyan-500/30 rounded-2xl space-y-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    TAHAP 3: IMPLEMENTASI KODE (TRANSKRIPSI MEKANIS)
                  </span>
                  <h4 className="text-2xl font-bold text-foreground mt-2">
                    Menerjemahkan Desain Menjadi Sintaksis Bahasa Pemrograman
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 text-sm mt-1 font-medium">
                    Tahapan hilir di mana rencana tertulis dikonversi menjadi baris instruksi yang dapat dieksekusi oleh mesin.
                  </p>
                </div>
                <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-500 dark:text-cyan-400 shrink-0">
                  <Code2 className="w-8 h-8" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-3 p-5 bg-secondary/30 rounded-xl border border-border/70">
                  <div className="font-bold text-sm text-foreground flex items-center gap-2">
                    <FileCode2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    Mengapa Coding Terasa Mudah Jika Analisis &amp; Desain Matang?
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Saat Analisis (persamaan &amp; tipe data) dan Desain (pseudocode/flowchart) sudah tuntas, menulis kode tidak lagi memerlukan pemikiran logika yang membingungkan. Setiap baris pseudocode tinggal dicari padanan sintaksisnya di bahasa tujuan (seperti Python, C++, atau JavaScript).
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Tidak ada lagi momen mahasiswa <em>terpaku menatap layar editor yang kosong</em> tanpa tahu harus mulai mengetik dari mana.
                  </p>
                </div>

                <div className="space-y-3 p-5 bg-secondary/30 rounded-xl border border-border/70">
                  <div className="font-bold text-sm text-foreground flex items-center gap-2">
                    <TerminalSquare className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    Kepatuhan Tata Bahasa (Syntax Rule)
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Di tahap ini, perhatian kita berfokus pada ketepatan sintaks: indentasi yang benar, tanda titik dua, kurung buka-tutup, dan fungsi baca-tulis masukan (<code className="text-cyan-700 dark:text-cyan-400 font-bold">input()</code> / <code className="text-cyan-700 dark:text-cyan-400 font-bold">print()</code>).
                  </p>
                  <div className="p-3 bg-background/80 rounded-lg border border-border/50 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold"># Konversi 1:1 dari Pseudocode ke Python:</span><br />
                    <span className="text-slate-500 dark:text-slate-400">// Pseudocode: input(berat)</span><br />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">berat = float(input("Masukkan berat (kg): "))</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeStage === 4 && (
            <motion.div
              key="stage-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-6 md:p-8 bg-card border border-emerald-500/30 rounded-2xl space-y-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    TAHAP 4: PENGUJIAN &amp; PENJAMINAN KUALITAS (TESTING)
                  </span>
                  <h4 className="text-2xl font-bold text-foreground mt-2">
                    Memvalidasi Kebenaran Program dengan Beragam Skenario Uji
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 text-sm mt-1 font-semibold">
                    "Program yang bisa berjalan tanpa error pesan merah BELUM TENTU menghasilkan jawaban yang benar!"
                  </p>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-600 dark:text-emerald-400 shrink-0">
                  <CheckSquare className="w-8 h-8" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-secondary/30 rounded-xl border border-border/70 space-y-2">
                  <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    1. Kasus Uji Normal (Happy Path)
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Data masukan yang wajar dan berada di tengah domain normal. Contoh: Berat 68 kg, Tinggi 172 cm $\rightarrow$ BMI 23.0 (Kategori Normal).
                  </p>
                </div>

                <div className="p-4 bg-secondary/30 rounded-xl border border-border/70 space-y-2">
                  <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    2. Kasus Uji Batas (Boundary Cases)
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Menguji nilai tepat di ambang pergantian kondisi. Contoh: BMI 18.5 tepat atau 24.9 tepat $\rightarrow$ apakah masuk kategori normal atau kategori sebelah? Operator <code className="text-amber-700 dark:text-amber-400 font-bold">&lt;=</code> atau <code className="text-amber-700 dark:text-amber-400 font-bold">&lt;</code> diuji ketelitiannya di sini.
                  </p>
                </div>

                <div className="p-4 bg-secondary/30 rounded-xl border border-border/70 space-y-2">
                  <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    3. Kasus Tidak Valid (Invalid/Extreme)
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Menguji data masukan yang tidak masuk akal secara fisik. Contoh: Tinggi 0 cm, Berat -10 kg, atau masukan huruf. Program yang tangguh wajib menolak masukan ini dan memberikan peringatan santun.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Laboratorium Studi Kasus End-to-End: Kalkulator BMI */}
      <div className="bg-card border border-border/80 rounded-2xl shadow-sm overflow-hidden space-y-6">
        <div className="p-6 md:p-8 bg-secondary/20 border-b border-border/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Laboratorium Studi Kasus Lengkap (End-to-End)
              </div>
              <h4 className="text-2xl font-bold text-foreground">
                Studi Kasus: Perhitungan Indeks Massa Tubuh (BMI)
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 font-medium mt-1 max-w-2xl">
                Saksikan bagaimana persoalan nyata di dunia kesehatan diolah melalui 4 tahap rekayasa: dari pembedahan rumus matematis hingga pengujian kasus batas.
              </p>
            </div>

            {/* Tab switcher */}
            <div className="flex items-center gap-1 bg-background p-1.5 rounded-xl border border-border shrink-0">
              <button
                onClick={() => setActiveLabTab('analisis')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeLabTab === 'analisis' 
                    ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-foreground'
                }`}
              >
                1. Analisis Data
              </button>
              <button
                onClick={() => setActiveLabTab('desain')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeLabTab === 'desain' 
                    ? 'bg-amber-600 dark:bg-amber-500 text-white shadow-sm' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-foreground'
                }`}
              >
                2. Desain Logika
              </button>
              <button
                onClick={() => setActiveLabTab('coding')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeLabTab === 'coding' 
                    ? 'bg-cyan-600 dark:bg-cyan-500 text-white shadow-sm' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-foreground'
                }`}
              >
                3. Kode Program
              </button>
              <button
                onClick={() => setActiveLabTab('testing')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeLabTab === 'testing' 
                    ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-foreground'
                }`}
              >
                4. Uji Kasus (Testing)
              </button>
            </div>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="p-6 md:p-8 pt-0">
          <AnimatePresence mode="wait">
            {/* TAB 1: ANALISIS */}
            {activeLabTab === 'analisis' && (
              <motion.div
                key="lab-analisis"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 text-sm"
              >
                {/* Rumus Math Box */}
                <div className="p-5 rounded-xl bg-indigo-500/5 border border-indigo-500/20 space-y-3">
                  <div className="font-bold text-foreground flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-indigo-400" />
                    Persamaan Matematis Standar WHO:
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-background/80 p-4 rounded-lg border border-border font-mono text-center sm:text-left">
                    <div className="text-base text-indigo-400 font-bold flex items-center justify-center sm:justify-start gap-2">
                      <span>BMI =</span>
                      <span className="inline-flex flex-col items-center text-xs">
                        <span className="border-b border-indigo-400 pb-0.5">berat (kg)</span>
                        <span className="pt-0.5">(tinggi (cm) / 100)&sup2;</span>
                      </span>
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 font-medium sm:border-l sm:border-border sm:pl-4">
                      Di mana <strong>berat</strong> diukur dalam kilogram (kg), dan <strong>tinggi</strong> dimasukkan dalam sentimeter (cm) lalu dikonversi ke meter sebelum dikuadratkan.
                    </div>
                  </div>
                </div>

                {/* Tabel Dekomposisi Variabel */}
                <div className="space-y-3">
                  <h5 className="font-bold text-foreground flex items-center gap-2">
                    <Variable className="w-4 h-4 text-indigo-400" />
                    Tabel Dekomposisi Variabel &amp; Penentuan Tipe Data:
                  </h5>
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-secondary/50 border-b border-border text-foreground font-semibold">
                          <th className="p-3">Nama Variabel</th>
                          <th className="p-3">Peran I/O</th>
                          <th className="p-3">Domain Nilai Fisik</th>
                          <th className="p-3">Tipe Data Dipilih</th>
                          <th className="p-3">Alasan Pemilihan Tipe Data</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60 text-slate-700 dark:text-slate-300 font-medium">
                        <tr className="hover:bg-secondary/20 transition-colors">
                          <td className="p-3 font-mono font-bold text-indigo-400">beratBadan</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold text-[11px]">INPUT</span></td>
                          <td className="p-3">10.0 s.d. 300.0 kg</td>
                          <td className="p-3 font-mono text-emerald-400 font-bold">float</td>
                          <td className="p-3">Berat seseorang dapat berupa pecahan desimal (misal 65.4 kg). Dilarang integer agar tidak terpotong.</td>
                        </tr>
                        <tr className="hover:bg-secondary/20 transition-colors">
                          <td className="p-3 font-mono font-bold text-indigo-400">tinggiBadan</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold text-[11px]">INPUT</span></td>
                          <td className="p-3">50.0 s.d. 250.0 cm</td>
                          <td className="p-3 font-mono text-emerald-400 font-bold">float</td>
                          <td className="p-3">Tinggi badan bernilai kontinu (misal 172.5 cm). Harus bernilai &gt; 0 agar terhindar dari error pembagian nol.</td>
                        </tr>
                        <tr className="hover:bg-secondary/20 transition-colors">
                          <td className="p-3 font-mono font-bold text-indigo-400">nilaiBmi</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-bold text-[11px]">PROSES / OUTPUT</span></td>
                          <td className="p-3">Hasil hitung pecahan</td>
                          <td className="p-3 font-mono text-emerald-400 font-bold">float</td>
                          <td className="p-3">Hasil pembagian matematis selalu menghasilkan bilangan desimal berpresisi.</td>
                        </tr>
                        <tr className="hover:bg-secondary/20 transition-colors">
                          <td className="p-3 font-mono font-bold text-indigo-400">kategori</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold text-[11px]">OUTPUT</span></td>
                          <td className="p-3">Teks deskriptif status</td>
                          <td className="p-3 font-mono text-purple-400 font-bold">string</td>
                          <td className="p-3">Berupa label teks: "Kurus", "Normal", "Overweight", atau "Obesitas".</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: DESAIN */}
            {activeLabTab === 'desain' && (
              <motion.div
                key="lab-desain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Format Naratif Sesuai Standar Bab 3 */}
                  <div className="p-5 bg-secondary/30 rounded-xl border border-border space-y-3">
                    <div className="font-bold text-sm text-foreground flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-amber-400">
                        <Workflow className="w-4 h-4" />
                        Representasi A: Algoritma Naratif
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Model 1: Blok Sejajar
                      </span>
                    </div>
                    <div className="p-4 bg-background/90 rounded-lg border border-border/80 font-mono text-xs leading-relaxed text-foreground/90 space-y-1">
                      <div>1. Masukkan nilai beratBadan (kg) dan tinggiBadan (cm).</div>
                      <div>2. Hitung tinggiMeter = tinggiBadan / 100.</div>
                      <div>3. Hitung nilaiBmi = beratBadan / (tinggiMeter * tinggiMeter).</div>
                      <div>4. Jika nilaiBmi &lt; 18.5 maka:</div>
                      <div className="pl-6 text-emerald-400">Tampilkan "Kategori: Kurus" ke layar.</div>
                      <div>&nbsp;&nbsp;&nbsp;Selain itu jika nilaiBmi &lt;= 24.9 maka:</div>
                      <div className="pl-6 text-emerald-400">Tampilkan "Kategori: Normal" ke layar.</div>
                      <div>&nbsp;&nbsp;&nbsp;Selain itu jika nilaiBmi &lt;= 29.9 maka:</div>
                      <div className="pl-6 text-emerald-400">Tampilkan "Kategori: Overweight" ke layar.</div>
                      <div>&nbsp;&nbsp;&nbsp;Selain itu:</div>
                      <div className="pl-6 text-emerald-400">Tampilkan "Kategori: Obesitas" ke layar.</div>
                      <div className="pt-2 text-slate-800 dark:text-slate-200 font-bold">Selesai.</div>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium italic">
                      *Perhatikan aturan baku: seluruh percabangan berada dalam nomor 4, klausa "Selain itu:" tidak diberi nomor baru, dan kata "Selesai." tanpa nomor urut.
                    </p>
                  </div>

                  {/* Format Pseudocode Baku CLRS */}
                  <div className="p-5 bg-secondary/30 rounded-xl border border-border space-y-3">
                    <div className="font-bold text-sm text-foreground flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-indigo-400">
                        <FileCode2 className="w-4 h-4" />
                        Representasi B: Pseudocode Baku (CLRS)
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        Format 3 Blok Baku
                      </span>
                    </div>
                    <div className="p-4 bg-background/90 rounded-lg border border-border/80 font-mono text-xs leading-relaxed text-foreground/90 space-y-1">
                      <div className="text-indigo-400 font-bold">PROGRAM HitungIndeksMassaTubuh // Menghitung BMI &amp; kategori status kesehatan</div>
                      <div className="text-slate-800 dark:text-slate-200 font-bold pt-1">KAMUS:</div>
                      <div className="pl-4 text-emerald-400">beratBadan, tinggiBadan, tinggiMeter, nilaiBmi : float</div>
                      <div className="pl-4 text-emerald-400">kategori : string</div>
                      <div className="text-slate-800 dark:text-slate-200 font-bold pt-1">ALGORITMA:</div>
                      <div className="pl-4">input(beratBadan)</div>
                      <div className="pl-4">input(tinggiBadan)</div>
                      <div className="pl-4">tinggiMeter = tinggiBadan / 100</div>
                      <div className="pl-4">nilaiBmi = beratBadan / (tinggiMeter * tinggiMeter)</div>
                      <div className="pl-4 text-amber-400">if nilaiBmi &lt; 18.5 then</div>
                      <div className="pl-8 text-cyan-400">output("Kurus", nilaiBmi)</div>
                      <div className="pl-4 text-amber-400">else if nilaiBmi &lt;= 24.9 then</div>
                      <div className="pl-8 text-cyan-400">output("Normal", nilaiBmi)</div>
                      <div className="pl-4 text-amber-400">else if nilaiBmi &lt;= 29.9 then</div>
                      <div className="pl-8 text-cyan-400">output("Overweight", nilaiBmi)</div>
                      <div className="pl-4 text-amber-400">else</div>
                      <div className="pl-8 text-cyan-400">output("Obesitas", nilaiBmi)</div>
                      <div className="pl-4 text-amber-400 font-bold">endif</div>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium italic">
                      *Perhatikan keselarasan: blok KAMUS memuat variabel hasil tahap Analisis, instruksi I/O universal <code className="text-indigo-400">input()</code>/<code className="text-indigo-400">output()</code>, serta penutup wajib <code className="text-amber-400">endif</code>.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: CODING */}
            {activeLabTab === 'coding' && (
              <motion.div
                key="lab-coding"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-700 dark:text-slate-300 font-mono font-semibold">
                    Bahasa Implementasi: <strong className="text-cyan-600 dark:text-cyan-400">Python 3 (Clean Standard)</strong>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-bold">
                    Transkripsi Langsung dari Pseudocode
                  </span>
                </div>

                <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed overflow-x-auto space-y-1 shadow-inner" style={{ fontVariantLigatures: 'none' }}>
                  <div className="text-slate-500"># =========================================================================</div>
                  <div className="text-slate-500"># PROGRAM: Hitung Indeks Massa Tubuh (BMI)</div>
                  <div className="text-slate-500"># Ditranskripsikan langsung dari hasil Analisis dan Desain Pseudocode Bab 3</div>
                  <div className="text-slate-500"># =========================================================================</div>
                  <div className="pt-2 text-slate-500"># 1. INPUT: Membaca data masukan dan melakukan konversi tipe ke Float</div>
                  <div><span className="text-cyan-400">berat_badan</span> = <span className="text-amber-400">float</span>(<span className="text-emerald-400">input</span>(<span className="text-emerald-300">"Masukkan berat badan (kg): "</span>))</div>
                  <div><span className="text-cyan-400">tinggi_badan</span> = <span className="text-amber-400">float</span>(<span className="text-emerald-400">input</span>(<span className="text-emerald-300">"Masukkan tinggi badan (cm): "</span>))</div>
                  <div className="pt-2 text-slate-500"># 2. PROSES: Menghitung persamaan BMI</div>
                  <div><span className="text-cyan-400">tinggi_meter</span> = <span className="text-cyan-400">tinggi_badan</span> / <span className="text-purple-400">100.0</span></div>
                  <div><span className="text-cyan-400">nilai_bmi</span> = <span className="text-cyan-400">berat_badan</span> / (<span className="text-cyan-400">tinggi_meter</span> ** <span className="text-purple-400">2</span>)</div>
                  <div className="pt-2 text-slate-500"># 3. KEPUTUSAN &amp; OUTPUT: Menentukan status kesehatan berdasarkan ambang batas</div>
                  <div><span className="text-indigo-400 font-bold">if</span> <span className="text-cyan-400">nilai_bmi</span> &lt; <span className="text-purple-400">18.5</span>:</div>
                  <div className="pl-4"><span className="text-cyan-400">kategori</span> = <span className="text-emerald-300">"Kurus (Underweight)"</span></div>
                  <div><span className="text-indigo-400 font-bold">elif</span> <span className="text-cyan-400">nilai_bmi</span> &lt;= <span className="text-purple-400">24.9</span>:</div>
                  <div className="pl-4"><span className="text-cyan-400">kategori</span> = <span className="text-emerald-300">"Normal (Ideal)"</span></div>
                  <div><span className="text-indigo-400 font-bold">elif</span> <span className="text-cyan-400">nilai_bmi</span> &lt;= <span className="text-purple-400">29.9</span>:</div>
                  <div className="pl-4"><span className="text-cyan-400">kategori</span> = <span className="text-emerald-300">"Kelebihan Berat Badan (Overweight)"</span></div>
                  <div><span className="text-indigo-400 font-bold">else</span>:</div>
                  <div className="pl-4"><span className="text-cyan-400">kategori</span> = <span className="text-emerald-300">"Obesitas (Obese)"</span></div>
                  <div className="pt-3 text-slate-500"># 4. Menampilkan hasil terformat</div>
                  <div><span className="text-emerald-400">print</span>(<span className="text-emerald-300">f"Skor BMI Anda : {"{"}nilai_bmi:.1f{"}"}"</span>)</div>
                  <div><span className="text-emerald-400">print</span>(<span className="text-emerald-300">f"Kategori      : {"{"}kategori{"}"}"</span>)</div>
                </div>

                <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-xs text-cyan-300">
                  <span className="font-bold text-cyan-200">Perhatikan Kemudahannya:</span> Tidak ada satu pun baris di atas yang membingungkan karena struktur variabel, tipe data, dan alur percabangannya telah 100% matang sejak Tahap 1 dan Tahap 2!
                </div>
              </motion.div>
            )}

            {/* TAB 4: TESTING INTERAKTIF */}
            {activeLabTab === 'testing' && (
              <motion.div
                key="lab-testing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Controls Input Simulator */}
                  <div className="p-5 bg-secondary/30 rounded-xl border border-border space-y-4">
                    <div className="font-bold text-sm text-foreground flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <Play className="w-4 h-4" />
                        Simulator Data Uji
                      </span>
                      <button 
                        onClick={() => { setTestWeight('68'); setTestHeight('172'); }}
                        className="text-[11px] text-slate-700 dark:text-slate-300 hover:text-foreground flex items-center gap-1 transition-colors font-bold"
                        title="Reset ke nilai default"
                      >
                        <RotateCcw className="w-3 h-3" /> Reset
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                          Masukan Berat Badan (kg):
                        </label>
                        <input
                          type="number"
                          value={testWeight}
                          onChange={(e) => setTestWeight(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                          placeholder="contoh: 65.5"
                          step="0.5"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                          Masukan Tinggi Badan (cm):
                        </label>
                        <input
                          type="number"
                          value={testHeight}
                          onChange={(e) => setTestHeight(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                          placeholder="contoh: 170"
                          step="1"
                        />
                      </div>
                    </div>

                    {/* Presets Button */}
                    <div className="space-y-1.5 pt-2 border-t border-border/60">
                      <div className="text-[11px] text-slate-700 dark:text-slate-300 font-bold">Uji Cepat Skenario:</div>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          onClick={() => { setTestWeight('48'); setTestHeight('165'); }}
                          className="px-2 py-1 bg-background hover:bg-secondary rounded text-[11px] font-mono text-slate-700 dark:text-slate-300 hover:text-foreground border border-border text-center transition-colors font-bold"
                        >
                          Uji Kurus
                        </button>
                        <button
                          onClick={() => { setTestWeight('65'); setTestHeight('170'); }}
                          className="px-2 py-1 bg-background hover:bg-secondary rounded text-[11px] font-mono text-slate-700 dark:text-slate-300 hover:text-foreground border border-border text-center transition-colors font-bold"
                        >
                          Uji Normal
                        </button>
                        <button
                          onClick={() => { setTestWeight('95'); setTestHeight('175'); }}
                          className="px-2 py-1 bg-background hover:bg-secondary rounded text-[11px] font-mono text-slate-700 dark:text-slate-300 hover:text-foreground border border-border text-center transition-colors font-bold"
                        >
                          Uji Obesitas
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Execution Output Box */}
                  <div className="lg:col-span-2 p-5 bg-card rounded-xl border border-border space-y-4">
                    <div className="font-bold text-sm text-foreground flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-cyan-400">
                        <TerminalSquare className="w-4 h-4" />
                        Hasil Eksekusi Program (Live Runtime)
                      </span>
                      {isValid ? (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Kasus Valid
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                          <AlertTriangle className="w-3 h-3" /> Input Tidak Valid
                        </span>
                      )}
                    </div>

                    {isValid && bmiResult !== null ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-4 rounded-xl bg-secondary/30 border border-border text-center space-y-1">
                            <div className="text-xs text-slate-700 dark:text-slate-300 font-bold">Skor BMI Terhitung</div>
                            <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">{bmiResult}</div>
                            <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">kg / m²</div>
                          </div>
                          <div className="p-4 rounded-xl bg-secondary/30 border border-border text-center space-y-1">
                            <div className="text-xs text-slate-700 dark:text-slate-300 font-bold">Status Evaluasi Cabang</div>
                            <div className={`text-base font-bold px-2 py-1 rounded-lg border inline-block mt-1 ${categoryColor}`}>
                              {categoryResult}
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-secondary/20 rounded-xl border border-border/70 text-xs space-y-2">
                          <div className="font-semibold text-foreground">Analisis Uji Kasus:</div>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                            {statusMessage} Dengan nilai input berat {numWeight} kg dan tinggi {numHeight} cm, variabel <code className="text-indigo-600 dark:text-indigo-400 font-bold">tinggiMeter</code> bernilai {(numHeight/100).toFixed(2)} m. Evaluasi percabangan melompat tepat ke blok kondisi yang sesuai.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 rounded-xl bg-rose-500/10 border border-rose-500/30 text-center space-y-2 text-rose-300">
                        <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto" />
                        <div className="font-bold text-sm">Kesalahan Data Uji Terdeteksi!</div>
                        <p className="text-xs max-w-md mx-auto leading-relaxed text-rose-300/90">
                          Nilai berat dan tinggi badan wajib berupa angka positif lebih dari nol. Pengujian ini membuktikan pentingnya menambahkan <em>validasi masukan</em> pada program sebelum rumus pembagian dieksekusi.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 4. Matriks Kesalahan Fatal Pemilihan Tipe Data & Analisis */}
      <div className="p-6 md:p-8 bg-secondary/15 border border-border/70 rounded-2xl space-y-6">
        <div className="flex items-center gap-3 text-foreground">
          <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
          <div>
            <h4 className="text-xl font-bold">
              Klinik Kesalahan Pemula: Bencana Akibat Lemahnya Analisis Tipe Data
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-0.5">
              Klik salah satu kasus di bawah untuk mempelajari mengapa kekeliruan analisis di hulu tidak bisa diselamatkan oleh sintaksis kode di hilir.
            </p>
          </div>
        </div>

        {/* Tab selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {commonMistakes.map((mistake, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMistake(idx)}
              className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all ${
                selectedMistake === idx 
                  ? 'bg-amber-500/15 border-amber-500/50 text-foreground shadow-sm' 
                  : 'bg-card border-border/60 text-slate-700 dark:text-slate-300 hover:text-foreground'
              }`}
            >
              {mistake.title}
            </button>
          ))}
        </div>

        {/* Card explanation */}
        <div className="p-5 bg-card rounded-xl border border-amber-500/30 space-y-3 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 p-3 rounded-lg bg-secondary/30 border border-border/60">
              <div className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Bentuk Kesalahan Analisis:
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{commonMistakes[selectedMistake].problem}</p>
              <div className="pt-2 font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> Konsekuensi Fatal di Komputer:
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{commonMistakes[selectedMistake].consequence}</p>
            </div>

            <div className="space-y-1.5 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/30">
              <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Solusi Rekayasa yang Tepat:
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{commonMistakes[selectedMistake].solution}</p>
              <div className="p-3 mt-3 bg-background/80 rounded border border-emerald-500/20 text-[11px] text-emerald-950 dark:text-emerald-300 font-medium">
                💡 <strong>Kaidah Pedagogis:</strong> "Lebih baik menghabiskan waktu 10 menit ekstra untuk membedah tipe data di atas kertas, daripada menghabiskan waktu 3 hari melakukan debugging mencari sumber kesalahan perhitungan di ribuan baris kode."
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
