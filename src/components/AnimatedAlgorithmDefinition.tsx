"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  GraduationCap, 
  Quote, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Unlock, 
  Key, 
  Cpu, 
  Layers, 
  ChevronDown, 
  Lightbulb, 
  Binary, 
  Scale
} from 'lucide-react';

export default function AnimatedAlgorithmDefinition() {
  const [isVisualActive, setIsVisualActive] = useState(false);

  return (
    <div className="space-y-6 mb-10">
      
      {/* --- HEADER ILMIAH --- */}
      <div className="border border-emerald-500/30 rounded-2xl bg-emerald-500/5 p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-widest border border-emerald-500/20">
            <GraduationCap className="w-4 h-4" />
            <span>Landasan Teoretis &amp; Sintesis Rujukan</span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Kajian Komparatif: Knuth (1968) &amp; CLRS (2009)
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3 tracking-tight">
          Definisi Algoritma: Dari Referensi Pakar Dunia Menuju Sintesis Mandiri
        </h3>
        <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed max-w-4xl font-medium">
          Dalam dunia akademik ilmu komputer, mahasiswa tidak sekadar menghafal definisi dangkal. Kita menelaah gagasan para ilmuwan peletak dasar komputasi, menganalisis persamaan esensinya, lalu <strong className="text-emerald-600 dark:text-emerald-400">mensintesis rujukan</strong> tersebut menjadi rumusan definisi yang kokoh, ilmiah, dan berdaya guna.
        </p>
      </div>

      {/* --- KARTU DUA PENDAPAT AHLI (REFERENSI RESMI DUNIA DENGAN PENEKANAN KATA KUNCI) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* AHLI 1: DONALD E. KNUTH */}
        <div className="rounded-2xl border-2 border-blue-500/30 bg-card p-6 md:p-7 shadow-sm hover:shadow-md hover:border-blue-500/60 transition-all space-y-4 relative flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/30">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Referensi 1: Donald E. Knuth (1968)</span>
              </span>
              <span className="text-[11px] text-slate-500 font-bold bg-secondary px-2.5 py-0.5 rounded-full">
                Turing Award Winner
              </span>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Buku Monumen: <em className="font-semibold text-foreground">"The Art of Computer Programming", Vol. 1</em>
            </div>

            {/* Kutipan Asli Berpenekanan Kata Kunci Kontras Tinggi */}
            <div className="relative pl-5 border-l-4 border-blue-500 py-1.5 space-y-3">
              <Quote className="w-6 h-6 text-blue-500/20 absolute -left-3 -top-2" />
              <p className="text-xs md:text-sm italic text-slate-600 dark:text-slate-300 font-serif leading-relaxed">
                "An algorithm is a <strong className="text-blue-600 dark:text-blue-400 font-black not-italic bg-blue-500/15 px-1.5 py-0.5 rounded border border-blue-500/30">finite sequence</strong> of <strong className="text-amber-600 dark:text-amber-400 font-black not-italic bg-amber-500/15 px-1.5 py-0.5 rounded border border-amber-500/30">well-defined rules or operations</strong> for <strong className="text-emerald-600 dark:text-emerald-400 font-black not-italic bg-emerald-500/15 px-1.5 py-0.5 rounded border border-emerald-500/30">solving a specific problem</strong>."
              </p>
              <p className="text-xs md:text-sm font-medium text-foreground leading-relaxed">
                "Algoritma adalah serangkaian <strong className="text-blue-600 dark:text-blue-400 font-black bg-blue-500/15 px-2 py-0.5 rounded border border-blue-500/30">berhingga (finite)</strong> dari aturan-aturan yang <strong className="text-amber-600 dark:text-amber-400 font-black bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">terdefinisi dengan pasti (well-defined)</strong> untuk <strong className="text-emerald-600 dark:text-emerald-400 font-black bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">menyelesaikan suatu masalah komputasi spesifik</strong>."
              </p>
            </div>
          </div>

          {/* Esensi Knuth */}
          <div className="pt-3 border-t border-border/60">
            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Penekanan Pilar Knuth:
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-300 rounded-lg text-xs font-black border border-blue-500/30">
                1. Finite Sequence (Langkah Berhingga / Berhenti)
              </span>
              <span className="px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-300 rounded-lg text-xs font-black border border-amber-500/30">
                2. Well-Defined (Pasti &amp; Bebas Ambigu)
              </span>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 rounded-lg text-xs font-black border border-emerald-500/30">
                3. Solving Problem (Solusi Masalah Konkret)
              </span>
            </div>
          </div>
        </div>

        {/* AHLI 2: CORMEN, LEISERSON, RIVEST, STEIN (CLRS) */}
        <div className="rounded-2xl border-2 border-purple-500/30 bg-card p-6 md:p-7 shadow-sm hover:shadow-md hover:border-purple-500/60 transition-all space-y-4 relative flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold border border-purple-500/30">
                <Cpu className="w-3.5 h-3.5" />
                <span>Referensi 2: Cormen et al. / CLRS (2009)</span>
              </span>
              <span className="text-[11px] text-slate-500 font-bold bg-secondary px-2.5 py-0.5 rounded-full">
                MIT Press
              </span>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Buku Standar Utama Dunia: <em className="font-semibold text-foreground">"Introduction to Algorithms", 3rd Edition</em>
            </div>

            {/* Kutipan Asli Berpenekanan Kata Kunci Kontras Tinggi */}
            <div className="relative pl-5 border-l-4 border-purple-500 py-1.5 space-y-3">
              <Quote className="w-6 h-6 text-purple-500/20 absolute -left-3 -top-2" />
              <p className="text-xs md:text-sm italic text-slate-600 dark:text-slate-300 font-serif leading-relaxed">
                "An algorithm is any <strong className="text-purple-600 dark:text-purple-400 font-black not-italic bg-purple-500/15 px-1.5 py-0.5 rounded border border-purple-500/30">well-defined computational procedure</strong> that takes some value, or set of values, as <strong className="text-blue-600 dark:text-blue-400 font-black not-italic bg-blue-500/15 px-1.5 py-0.5 rounded border border-blue-500/30">input</strong> and produces some value, or set of values, as <strong className="text-emerald-600 dark:text-emerald-400 font-black not-italic bg-emerald-500/15 px-1.5 py-0.5 rounded border border-emerald-500/30">output</strong>."
              </p>
              <p className="text-xs md:text-sm font-medium text-foreground leading-relaxed">
                "Algoritma adalah setiap <strong className="text-purple-600 dark:text-purple-400 font-black bg-purple-500/15 px-2 py-0.5 rounded border border-purple-500/30">prosedur komputasi terdefinisi dengan baik</strong> yang mengambil nilai sebagai <strong className="text-blue-600 dark:text-blue-400 font-black bg-blue-500/15 px-2 py-0.5 rounded border border-blue-500/30">masukan (input)</strong> dan menghasilkan nilai sebagai <strong className="text-emerald-600 dark:text-emerald-400 font-black bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">keluaran (output)</strong>."
              </p>
            </div>
          </div>

          {/* Esensi CLRS */}
          <div className="pt-3 border-t border-border/60">
            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Penekanan Pilar CLRS:
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-300 rounded-lg text-xs font-black border border-purple-500/30">
                1. Computational Procedure (Prosedur Komputasi Terstruktur)
              </span>
              <span className="px-2.5 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-300 rounded-lg text-xs font-black border border-blue-500/30">
                2. Input ➔ Output Transformation (Alur Masukan ke Keluaran)
              </span>
              <span className="px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-300 rounded-lg text-xs font-black border border-amber-500/30">
                3. Well-Defined (Setiap Langkah Terdefinisi Rinci)
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* --- TABEL MATRIKS SINTESIS: DARI 2 REFERENSI KE DEFINISI MANDIRI --- */}
      <div className="border border-border/60 rounded-2xl bg-card p-6 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-2 mb-4">
          <Scale className="w-5 h-5 text-amber-500" />
          <h4 className="text-base font-bold text-foreground">
            Matriks Sintesis: Membandingkan &amp; Menarik Kesimpulan Konseptual
          </h4>
        </div>
        <table className="w-full text-left text-xs md:text-sm border-collapse">
          <thead>
            <tr className="border-b border-border text-slate-600 dark:text-slate-400 font-bold bg-secondary/20">
              <th className="py-2.5 px-3">Dimensi Kajian</th>
              <th className="py-2.5 px-3 text-blue-600 dark:text-blue-400">Donald E. Knuth (1968)</th>
              <th className="py-2.5 px-3 text-purple-600 dark:text-purple-400">Cormen dkk. / CLRS (2009)</th>
              <th className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-extrabold bg-emerald-500/10 rounded-t-lg">
                Rumusan Sintesis Kita
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50 text-slate-700 dark:text-slate-300 font-medium">
            <tr>
              <td className="py-2.5 px-3 font-bold text-foreground">Sifat Prosedur</td>
              <td className="py-2.5 px-3">Rangkaian langkah berhingga (<em>finite</em>)</td>
              <td className="py-2.5 px-3">Prosedur komputasi (<em>computational</em>)</td>
              <td className="py-2.5 px-3 font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5">
                Prosedur komputasi terstruktur &amp; berhingga
              </td>
            </tr>
            <tr>
              <td className="py-2.5 px-3 font-bold text-foreground">Kualitas Langkah</td>
              <td className="py-2.5 px-3">Aturan terdefinisi pasti (<em>well-defined</em>)</td>
              <td className="py-2.5 px-3">Terdefinisi dengan baik (<em>well-defined</em>)</td>
              <td className="py-2.5 px-3 font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5">
                Langkah logis pasti (bebas ambigu/tafsir ganda)
              </td>
            </tr>
            <tr>
              <td className="py-2.5 px-3 font-bold text-foreground">Mekanisme Data</td>
              <td className="py-2.5 px-3">Operasi pengolahan instruksi terarah</td>
              <td className="py-2.5 px-3">Membaca Masukan (Input) ➔ Keluaran (Output)</td>
              <td className="py-2.5 px-3 font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5">
                Transformasi data masukan menjadi keluaran (IPO)
              </td>
            </tr>
            <tr>
              <td className="py-2.5 px-3 font-bold text-foreground">Tujuan Akhir</td>
              <td className="py-2.5 px-3">Memecahkan masalah (<em>solving problem</em>)</td>
              <td className="py-2.5 px-3">Menghasilkan nilai solusi komputasi</td>
              <td className="py-2.5 px-3 font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5">
                Menyelesaikan persoalan secara sahih &amp; efektif
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- KOTAK SINTESIS DEFINISI MANDIRI (DENGAN VISUALISASI ANIMASI KETIKA DIKLIK) --- */}
      <div 
        className="border-2 border-emerald-500/60 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 p-6 md:p-8 shadow-lg relative overflow-hidden transition-all duration-300"
      >
        {/* Header Kotak Sintesis */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500 text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </span>
            <h4 className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
              Rumusan Sintesis Ilmiah (Definisi Mandiri Mahasiswa)
            </h4>
          </div>

          {/* Tombol Interaktif Pengaktif Visualisasi Animasi */}
          <button
            onClick={() => setIsVisualActive(!isVisualActive)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer ${
              isVisualActive 
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 font-black ring-2 ring-amber-300' 
                : 'bg-emerald-600 text-white hover:bg-emerald-500'
            }`}
          >
            {isVisualActive ? (
              <>
                <span>📝 Tampilkan Teks Definisi</span>
              </>
            ) : (
              <>
                <Key className="w-3.5 h-3.5 animate-pulse" />
                <span>🔑 Klik untuk Animasi Visual</span>
              </>
            )}
          </button>
        </div>

        {/* Konten Berganti Halus Antara Teks Definisi dan Animasi Visual Kunci Logika */}
        <AnimatePresence mode="wait">
          {!isVisualActive ? (
            <motion.div
              key="text-content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <p className="text-foreground font-semibold leading-relaxed text-base md:text-xl">
                "Berdasarkan telaah dan sintesis atas pandangan <strong className="text-blue-600 dark:text-blue-400">Donald E. Knuth</strong> dan <strong className="text-purple-600 dark:text-purple-400">Cormen dkk. (CLRS)</strong>, kita merumuskan bahwa:
              </p>

              <div 
                onClick={() => setIsVisualActive(true)}
                className="p-5 md:p-6 rounded-xl bg-background/95 border border-emerald-500/40 shadow-inner space-y-3 cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all group"
                title="Klik untuk melihat animasi visual perakitan kunci logika"
              >
                <p className="text-lg md:text-2xl font-extrabold text-foreground leading-relaxed tracking-tight">
                  <span className="text-emerald-500 underline decoration-wavy decoration-emerald-500/60 underline-offset-8">Algoritma</span> adalah{' '}
                  <span className="inline-block px-3 py-1 mx-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-black border border-blue-500/30 whitespace-nowrap">
                    prosedur komputasi berhingga (finite)
                  </span>
                  , yang tersusun atas serangkaian langkah logis yang{' '}
                  <span className="inline-block px-3 py-1 mx-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 font-black border border-amber-500/30 whitespace-nowrap">
                    terdefinisi secara pasti (well-defined)
                  </span>
                  , untuk mengolah data{' '}
                  <span className="inline-block px-3 py-1 mx-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 font-black border border-purple-500/30 whitespace-nowrap">
                    masukan (input)
                  </span>{' '}
                  menjadi hasil{' '}
                  <span className="inline-block px-3 py-1 mx-1 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 font-black border border-teal-500/30 whitespace-nowrap">
                    keluaran (output)
                  </span>{' '}
                  sebagai{' '}
                  <span className="inline-block px-3 py-1 mx-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black border border-emerald-500/30 whitespace-nowrap">
                    solusi sahih dari suatu permasalahan
                  </span>
                  ."
                </p>

                {/* Definisi Sederhana & Intuitif yang Mudah Dipahami Mahasiswa */}
                <div className="pt-3 border-t border-emerald-500/20 flex flex-col md:flex-row md:items-center gap-2.5 bg-emerald-500/5 -mx-2 p-3.5 rounded-xl border border-emerald-500/30">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300 text-xs font-black shrink-0 border border-amber-500/30">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>Definisi Sederhana (Mudah Dipahami):</span>
                  </div>
                  <p className="text-sm md:text-base font-semibold text-slate-700 dark:text-slate-200 leading-relaxed">
                    "Secara sederhana, <strong className="text-foreground font-black">Algoritma</strong> adalah{' '}
                    <strong className="text-blue-600 dark:text-blue-400 font-extrabold bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                      sekumpulan langkah logis
                    </strong>{' '}
                    yang disusun secara{' '}
                    <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      sistematis
                    </strong>{' '}
                    untuk{' '}
                    <strong className="text-purple-600 dark:text-purple-400 font-extrabold bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
                      memecahkan suatu permasalahan
                    </strong>
                    ."
                  </p>
                </div>

                <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform pt-1">
                  <span>Klik kotak ini untuk melihat animasi visual perakitan kunci logika</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* 4 Pilar Inti Hasil Sintesis */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-card border border-border/80 text-center space-y-1 hover:border-emerald-500/60 transition-colors">
                  <div className="text-xs font-bold text-blue-500">Pilar 1 (Knuth)</div>
                  <div className="text-xs font-extrabold text-foreground">Keterbatasan (Finiteness)</div>
                  <div className="text-[10px] text-slate-500">Wajib berhenti, bebas infinite loop</div>
                </div>
                <div className="p-3 rounded-xl bg-card border border-border/80 text-center space-y-1 hover:border-emerald-500/60 transition-colors">
                  <div className="text-xs font-bold text-amber-500">Pilar 2 (Knuth &amp; CLRS)</div>
                  <div className="text-xs font-extrabold text-foreground">Kepastian (Definiteness)</div>
                  <div className="text-[10px] text-slate-500">Langkah tegas, bebas multitafsir</div>
                </div>
                <div className="p-3 rounded-xl bg-card border border-border/80 text-center space-y-1 hover:border-emerald-500/60 transition-colors">
                  <div className="text-xs font-bold text-purple-500">Pilar 3 (CLRS)</div>
                  <div className="text-xs font-extrabold text-foreground">Transformasi Masukan ➔ Keluaran</div>
                  <div className="text-[10px] text-slate-500">Mengolah input menjadi output nyata</div>
                </div>
                <div className="p-3 rounded-xl bg-card border border-border/80 text-center space-y-1 hover:border-emerald-500/60 transition-colors">
                  <div className="text-xs font-bold text-emerald-500">Pilar 4 (Konsensus Ilmiah)</div>
                  <div className="text-xs font-extrabold text-foreground">Penyelesaian Masalah</div>
                  <div className="text-[10px] text-slate-500">Menyelesaikan problem secara efektif</div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="visual-animation"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Header Visualisasi Ganda */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <h5 className="text-sm font-extrabold text-foreground">
                      Dua Perspektif Visual: Metafora Filosofis &amp; Realitas Komputasional
                    </h5>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Bandingkan bagaimana intuisi bahasa awam (kiri) bersinergi dengan proses transformasi data komputasi nyata (kanan).
                  </p>
                </div>

                <button
                  onClick={() => setIsVisualActive(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs transition-colors shrink-0 border border-border cursor-pointer"
                >
                  <span>📝 Kembali ke Teks Definisi</span>
                </button>
              </div>

              {/* DUA ANIMASI BERDAMPINGAN (GRID 2 KOLOM) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                
                {/* 1. ANIMASI KIRI: METAFORA FILOSOFIS (KUNCI LOGIKA) */}
                <div className="rounded-2xl border-2 border-amber-500/30 bg-card p-4 md:p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300 text-xs font-black border border-amber-500/30">
                      <Key className="w-3.5 h-3.5 text-amber-500" />
                      <span>1. Metafora Filosofis (Bahasa Awam)</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-bold bg-secondary px-2 py-0.5 rounded-md">
                      Kunci Pemecah Masalah
                    </span>
                  </div>

                  <div className="w-full h-72 relative flex items-center justify-center rounded-xl overflow-hidden border border-border/60 bg-background/90 shadow-inner">
                    <AssemblyToSolutionAnimation />
                  </div>

                  <div className="mt-3 text-xs text-slate-600 dark:text-slate-300 font-medium bg-amber-500/5 p-2.5 rounded-lg border border-amber-500/20">
                    <strong className="text-amber-600 dark:text-amber-400">Intisari:</strong> Komponen langkah yang disusun logis &amp; sistematis menjadi "kunci" yang tepat guna membuka "gembok permasalahan".
                  </div>
                </div>

                {/* 2. ANIMASI KANAN: REALITAS KOMPUTASIONAL (IPO PIPELINE) */}
                <div className="rounded-2xl border-2 border-blue-500/30 bg-card p-4 md:p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-700 dark:text-blue-300 text-xs font-black border border-blue-500/30">
                      <Binary className="w-3.5 h-3.5 text-blue-500" />
                      <span>2. Realitas Komputasi (Knuth &amp; CLRS)</span>
                    </span>
                    <span className="text-[11px] text-blue-600 dark:text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                      Pipeline Transformasi IPO
                    </span>
                  </div>

                  <div className="w-full h-72 relative flex items-center justify-center rounded-xl overflow-hidden border border-border/60 bg-background/90 shadow-inner">
                    <ComputationPipelineAnimation />
                  </div>

                  <div className="mt-3 text-xs text-slate-600 dark:text-slate-300 font-medium bg-blue-500/5 p-2.5 rounded-lg border border-blue-500/20">
                    <strong className="text-blue-600 dark:text-blue-400">Intisari:</strong> Data masukan (*Input*) diolah melalui prosedur komputasi berurutan (*Well-Defined &amp; Finite*) menghasilkan solusi sahih (*Output*).
                  </div>
                </div>

              </div>

              {/* FOOTER NAVIGASI BALIK */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 px-1">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Kedua animasi berulang secara otomatis dan sinkron untuk memperkuat retensi konsep.</span>
                </div>
                <button
                  onClick={() => setIsVisualActive(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer w-fit"
                >
                  <span>Kembali ke Teks Definisi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

function AssemblyToSolutionAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // Animation Sequence:
    // 0: Scattered (Initial)
    // 1: Key Head (Pegangan Kunci) moves to center
    // 2: Key Shaft (Batang Kunci) attaches
    // 3: Key Teeth (Gigi Kunci) attaches
    // 4: Key moves into padlock (Insert)
    // 5: Key turns inside padlock
    // 6: Padlock opens, Aha! glow
    
    if (step === 0) timer = setTimeout(() => setStep(1), 800);
    else if (step === 1) timer = setTimeout(() => setStep(2), 600);
    else if (step === 2) timer = setTimeout(() => setStep(3), 600);
    else if (step === 3) timer = setTimeout(() => setStep(4), 800);
    else if (step === 4) timer = setTimeout(() => setStep(5), 600);
    else if (step === 5) timer = setTimeout(() => setStep(6), 400);
    else if (step === 6) timer = setTimeout(() => setStep(0), 4000); // Wait 4 seconds then reset to loop

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-dot-pattern rounded-xl border border-border/50 overflow-hidden">
      
      {/* THE KEY CONTAINER (Handles Insertion and Turning) */}
      <motion.div
        className="absolute z-20 flex items-center justify-center w-0 h-0 scale-75 md:scale-90"
        initial={{ x: -50, y: 0, rotate: 0 }}
        animate={
          step >= 5 ? { x: 65, y: 0, rotate: 90 } : // Turn
          step >= 4 ? { x: 65, y: 0, rotate: 0 } :  // Insert
          { x: -45, y: 0, rotate: 0 }               // Assembly position
        }
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        {/* 1. KEY HEAD (Pegangan Kunci - Warna Biru) */}
        <motion.div
          className="absolute border-[10px] border-blue-500 rounded-full"
          initial={{ x: -80, y: -60, rotate: -45, opacity: 0, width: 56, height: 56 }}
          animate={
            step >= 1 ? { x: -35, y: 0, rotate: 0, opacity: 1 } : 
            { x: -80, y: -60, rotate: -45, opacity: 1 }
          }
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
        />

        {/* 2. KEY SHAFT (Batang Kunci - Warna Ungu) */}
        <motion.div
          className="absolute h-5 bg-purple-500 rounded-r-md"
          initial={{ x: 140, y: 60, width: 50, rotate: 120, opacity: 0 }}
          animate={
            step >= 2 ? { x: 25, y: 0, width: 70, rotate: 0, opacity: 1 } :
            step === 1 ? { x: 140, y: 60, width: 50, rotate: 120, opacity: 1 } : 
            { x: 140, y: 60, width: 50, rotate: 120, opacity: 1 }
          }
          style={{ originX: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
        />

        {/* 3. KEY TEETH (Gigi Kunci - Warna Teal) */}
        <motion.div
          className="absolute flex gap-1"
          initial={{ x: 120, y: -50, rotate: -90, opacity: 0 }}
          animate={
             step >= 3 ? { x: 45, y: 8, rotate: 0, opacity: 1 } :
             { x: 120, y: -50, rotate: -90, opacity: 1 }
          }
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
        >
          <div className="w-3 h-5 bg-teal-500 rounded-b-sm"></div>
          <div className="w-3 h-3.5 bg-teal-500 rounded-b-sm"></div>
          <div className="w-3 h-6 bg-teal-500 rounded-b-sm"></div>
        </motion.div>
      </motion.div>


      {/* THE PADLOCK (Sang Masalah) */}
      <div className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center scale-75 md:scale-90">
        {/* Shackle (Gembok Atas) */}
        <motion.div
          className="w-14 h-16 border-6 border-slate-400 rounded-t-3xl border-b-0 relative z-0"
          initial={{ y: 0 }}
          animate={{ y: step >= 6 ? -20 : 0 }} // POP OPEN!
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
           {/* Shackle cut to make it look open */}
           <motion.div 
             className="absolute -right-2 bottom-0 w-3.5 h-7 bg-background"
             initial={{ opacity: 0 }}
             animate={{ opacity: step >= 6 ? 1 : 0 }}
           />
        </motion.div>
        
        {/* Lock Body (Badan Gembok) */}
        <motion.div 
          className={`w-20 h-16 rounded-xl flex items-center justify-center relative z-10 transition-colors duration-500
            ${step >= 6 ? 'bg-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.6)]' : 'bg-slate-600'}
          `}
        >
          {/* Keyhole */}
          <div className="w-3.5 h-7 bg-slate-900 rounded-full flex flex-col items-center">
             <div className="w-3.5 h-3.5 bg-slate-900 rounded-full absolute -top-1"></div>
          </div>
          
          {/* AHA Icon */}
          <AnimatePresence>
            {step >= 6 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center text-white"
              >
                <Unlock className="w-8 h-8" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* TEXT EXPLANATION OVERLAY */}
      <div className="absolute bottom-2 left-0 right-0 text-center font-bold text-slate-800 dark:text-slate-200 text-xs z-30 px-2 bg-background/80 py-1 border-t border-border/40">
        {step === 0 && "Komponen berserakan (belum tersusun)..."}
        {step === 1 && "1. Langkah awal disiapkan secara teratur..."}
        {step === 2 && "2. Dirangkai dengan logika yang tepat..."}
        {step === 3 && "3. Menjadi kesatuan sistematis yang utuh..."}
        {step === 4 && "4. Diterapkan langsung pada gembok masalah..."}
        {step === 5 && "5. Memutar logika untuk membuka akses..."}
        {step >= 6 && <span className="text-amber-700 dark:text-amber-400 font-black">AHA! Gembok Masalah Terbuka! 🎉</span>}
      </div>

    </div>
  );
}

function ComputationPipelineAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // Step Sequence:
    // 0: Input Received [ 7, 2, 9, 4 ] at Input Station
    // 1: Move into Computation Engine (Step 1: Well-Defined Validation)
    // 2: Systematic Logical Step A (Swap 7 & 2 -> [ 2, 7, 9, 4 ])
    // 3: Systematic Logical Step B (Swap 9 & 4 -> [ 2, 4, 7, 9 ])
    // 4: Finiteness Termination Reached (Check complete, loops finished)
    // 5: Output Delivered [ 2, 4, 7, 9 ] at Output Station (Valid Solution!)
    
    if (step === 0) timer = setTimeout(() => setStep(1), 1100);
    else if (step === 1) timer = setTimeout(() => setStep(2), 1200);
    else if (step === 2) timer = setTimeout(() => setStep(3), 1200);
    else if (step === 3) timer = setTimeout(() => setStep(4), 1100);
    else if (step === 4) timer = setTimeout(() => setStep(5), 1000);
    else if (step === 5) timer = setTimeout(() => setStep(0), 4000); // 4s wait to read output, then loop

    return () => clearTimeout(timer);
  }, [step]);

  // Current array arrangement:
  const currentArray = 
    step <= 1 ? [7, 2, 9, 4] :
    step === 2 ? [2, 7, 9, 4] :
    [2, 4, 7, 9];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-3 bg-dot-pattern rounded-xl border border-border/50 overflow-hidden">
      
      {/* 3 STATIONS PIPELINE HEADER */}
      <div className="grid grid-cols-3 gap-1.5 w-full text-center text-[10px] font-black tracking-wider uppercase">
        <div className={`py-1 rounded-md transition-all border ${
          step === 0 
            ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500 ring-2 ring-blue-500/20' 
            : 'bg-secondary/40 text-slate-500 border-transparent'
        }`}>
          1. Masukan (Input)
        </div>

        <div className={`py-1 rounded-md transition-all border ${
          step >= 1 && step <= 4 
            ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500 ring-2 ring-purple-500/20' 
            : 'bg-secondary/40 text-slate-500 border-transparent'
        }`}>
          2. Proses Algoritma
        </div>

        <div className={`py-1 rounded-md transition-all border ${
          step === 5 
            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500 ring-2 ring-emerald-500/20' 
            : 'bg-secondary/40 text-slate-500 border-transparent'
        }`}>
          3. Keluaran (Output)
        </div>
      </div>

      {/* PIPELINE STAGE GRAPHICS */}
      <div className="relative flex-1 flex items-center justify-between w-full px-1 my-1">
        {/* Connector line behind */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-border/80 z-0">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
            initial={{ width: "0%" }}
            animate={{ 
              width: step === 0 ? "15%" : step >= 1 && step <= 4 ? "55%" : "100%" 
            }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Station 1: INPUT ZONE */}
        <div className={`relative z-10 w-[72px] h-28 rounded-xl border-2 flex flex-col items-center justify-center p-1 transition-all ${
          step === 0 
            ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.25)]' 
            : 'border-border/60 bg-card/60 opacity-60'
        }`}>
          <span className="text-[9px] font-extrabold text-blue-500 mb-1">DATA RAW</span>
          {step === 0 && (
            <motion.div 
              layoutId="pipeline-data"
              className="grid grid-cols-2 gap-1"
            >
              {currentArray.map(val => (
                <div key={val} className="w-5 h-5 rounded bg-blue-500 text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                  {val}
                </div>
              ))}
            </motion.div>
          )}
          {step !== 0 && (
            <span className="text-[10px] text-slate-400 italic">Terkirim ➔</span>
          )}
        </div>

        {/* Station 2: COMPUTATION ENGINE (Proses Komputasi) */}
        <div className={`relative z-10 flex-1 max-w-[195px] h-28 rounded-xl border-2 flex flex-col items-center justify-between p-1.5 mx-1 transition-all ${
          step >= 1 && step <= 4 
            ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
            : 'border-border/60 bg-card/60 opacity-60'
        }`}>
          {/* Header Engine */}
          <div className="flex items-center justify-between w-full px-1">
            <span className="text-[9px] font-extrabold text-purple-600 dark:text-purple-400 flex items-center gap-1">
              <Cpu className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
              <span>ATURAN LOGIS</span>
            </span>
            <span className="text-[8px] font-bold text-slate-500">
              {step === 1 && "1: Baca"}
              {step === 2 && "2: Tukar A"}
              {step === 3 && "3: Tukar B"}
              {step === 4 && "4: Selesai"}
              {(step === 0 || step === 5) && "Standby"}
            </span>
          </div>

          {/* Data Processing Area */}
          <div className="h-8 flex items-center justify-center">
            {step >= 1 && step <= 4 && (
              <motion.div 
                layoutId="pipeline-data"
                className="flex items-center gap-1"
              >
                {currentArray.map((val) => (
                  <motion.div
                    key={val}
                    layout
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className={`w-6 h-7 rounded font-black text-[11px] flex items-center justify-center shadow-md border ${
                      step === 4 
                        ? 'bg-emerald-500 text-white border-emerald-400 scale-105' 
                        : (step === 2 && (val === 2 || val === 7)) || (step === 3 && (val === 4 || val === 9))
                          ? 'bg-amber-500 text-slate-950 border-amber-400 scale-110 ring-2 ring-amber-300'
                          : 'bg-purple-600 text-white border-purple-400'
                    }`}
                  >
                    {val}
                  </motion.div>
                ))}
              </motion.div>
            )}
            {(step === 0 || step === 5) && (
              <span className="text-[10px] text-slate-400 font-mono">
                [ _ _ _ _ ]
              </span>
            )}
          </div>

          {/* Knuth/CLRS Pillars Check inside Engine */}
          <div className="flex items-center justify-center gap-1 w-full text-[7px] font-bold">
            <span className={`px-1 py-0.5 rounded ${step >= 1 ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40' : 'text-slate-400'}`}>
              Well-Defined
            </span>
            <span className={`px-1 py-0.5 rounded ${step >= 2 ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/40' : 'text-slate-400'}`}>
              Sistematis
            </span>
            <span className={`px-1 py-0.5 rounded ${step >= 4 ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40' : 'text-slate-400'}`}>
              Finiteness
            </span>
          </div>
        </div>

        {/* Station 3: OUTPUT ZONE */}
        <div className={`relative z-10 w-[72px] h-28 rounded-xl border-2 flex flex-col items-center justify-center p-1 transition-all ${
          step === 5 
            ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
            : 'border-border/60 bg-card/60 opacity-60'
        }`}>
          <span className="text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400 mb-1">SOLUSI SAHIH</span>
          {step === 5 && (
            <motion.div 
              layoutId="pipeline-data"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="grid grid-cols-2 gap-1"
            >
              {currentArray.map(val => (
                <div key={val} className="w-5 h-5 rounded bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center shadow-md ring-1 ring-emerald-300">
                  {val}
                </div>
              ))}
            </motion.div>
          )}
          {step !== 5 && (
            <span className="text-[10px] text-slate-400 italic">Menunggu...</span>
          )}
        </div>
      </div>

      {/* TEXT EXPLANATION OVERLAY */}
      <div className="text-center font-bold text-slate-800 dark:text-slate-200 text-[11px] bg-background/80 py-1 px-2 rounded-lg border border-border/50">
        {step === 0 && "1. Menerima Masukan (Input): Data mentah [ 7, 2, 9, 4 ]"}
        {step === 1 && "2. Memasuki Prosedur: Aturan Terdefinisi Rinci (Well-Defined)"}
        {step === 2 && "3. Langkah Logis A: Membandingkan & menukar posisi 7 & 2"}
        {step === 3 && "4. Langkah Logis B: Menata sisa elemen secara sistematis"}
        {step === 4 && "5. Selesai Tepat Waktu: Kondisi berhenti terpenuhi (Finiteness)"}
        {step === 5 && <span className="text-emerald-600 dark:text-emerald-400 font-black">✓ KELUARAN (OUTPUT): [ 2, 4, 7, 9 ] Solusi Sahih! 🎉</span>}
      </div>

    </div>
  );
}
