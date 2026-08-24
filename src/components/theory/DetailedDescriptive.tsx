"use client";

import React from 'react';
import { FileText, CheckCircle2, AlertTriangle, BookOpen, Cog } from 'lucide-react';
import { motion } from 'framer-motion';

const HoverNumber = ({ num }: { num: string }) => (
  <div className="group/num relative shrink-0 z-20">
    <div className="w-7 h-7 flex items-center justify-center font-extrabold text-emerald-400 border border-emerald-500/40 bg-emerald-500/10 rounded-full group-hover/num:bg-emerald-500 group-hover/num:text-slate-950 transition-all cursor-default group-hover/num:scale-125 group-hover/num:shadow-[0_0_15px_rgba(16,185,129,0.6)]">
      {num}.
    </div>
    <div className="absolute bottom-full left-0 mb-3 w-64 p-3.5 px-4 bg-slate-950 text-sm text-slate-100 rounded-xl opacity-0 group-hover/num:opacity-100 pointer-events-none transition-all duration-300 z-50 border-2 border-emerald-500 shadow-[0_10px_30px_rgba(16,185,129,0.3)] text-left font-sans translate-y-2 group-hover/num:translate-y-0 leading-relaxed">
      Algoritma deskriptif harus ditulis berurutan menggunakan <strong className="text-emerald-400 font-bold">nomor urut</strong>.
      <div className="absolute top-full left-3 border-6 border-transparent border-t-emerald-500"></div>
    </div>
  </div>
);

const HoverCommand = ({ word }: { word: string }) => (
  <span className="group/cmd relative cursor-default inline-block z-10">
    <span className="font-extrabold text-cyan-400 bg-cyan-500/15 border border-cyan-500/40 px-2.5 py-1 rounded-md shadow-sm group-hover/cmd:bg-cyan-400 group-hover/cmd:text-slate-950 transition-all">
      {word}
    </span>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3.5 px-4 bg-slate-950 text-sm text-slate-100 rounded-xl opacity-0 group-hover/cmd:opacity-100 pointer-events-none transition-all duration-300 z-50 border-2 border-cyan-400 shadow-[0_10px_30px_rgba(6,182,212,0.35)] text-center font-sans translate-y-2 group-hover/cmd:translate-y-0 leading-relaxed">
      Kata yang digunakan adalah <strong className="text-cyan-300 font-bold">kata perintah (imperatif)</strong> yang tegas.
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-cyan-400"></div>
    </div>
  </span>
);

const HoverVariable = ({ name }: { name: string }) => (
  <span className="group/var relative cursor-default inline-block z-10">
    <strong className="text-purple-300 bg-purple-500/15 border border-purple-500/40 px-2 py-0.5 rounded-md group-hover/var:bg-purple-400 group-hover/var:text-slate-950 transition-all font-bold">
      {name}
    </strong>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-3.5 px-4 bg-slate-950 text-sm text-slate-100 rounded-xl opacity-0 group-hover/var:opacity-100 pointer-events-none transition-all duration-300 z-50 border-2 border-purple-400 shadow-[0_10px_30px_rgba(168,85,247,0.35)] text-center font-sans translate-y-2 group-hover/var:translate-y-0 leading-relaxed">
      Variabel ditulis dengan <strong className="text-purple-300 font-bold">jelas dan lengkap</strong>, bukan singkatan.
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-purple-400"></div>
    </div>
  </span>
);

const HoverFormula = ({ formula }: { formula: string }) => (
  <div className="group/form relative inline-block mt-2 z-10">
    <code className="bg-slate-800/90 px-3 py-2 rounded-lg text-amber-300 font-mono text-sm border border-amber-500/40 block w-fit group-hover/form:border-amber-400 group-hover/form:bg-amber-400 group-hover/form:text-slate-950 transition-all cursor-default group-hover/form:shadow-[0_0_20px_rgba(245,158,11,0.4)] font-bold">
      {formula}
    </code>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-3.5 px-4 bg-slate-950 text-sm text-slate-100 rounded-xl opacity-0 group-hover/form:opacity-100 pointer-events-none transition-all duration-300 z-50 border-2 border-amber-400 shadow-[0_10px_30px_rgba(245,158,11,0.35)] text-center font-sans translate-y-2 group-hover/form:translate-y-0 leading-relaxed">
      Rumus harus ditulis secara tegas dan <strong className="text-amber-300 font-bold">tidak boleh ambigu</strong>.
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-amber-400"></div>
    </div>
  </div>
);

export default function DetailedDescriptive() {
  return (
    <div className="bg-secondary/10 border border-border/50 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm overflow-visible">
      <div className="flex items-center gap-4 border-b border-border/50 pb-4">
        <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-500 shadow-inner">
          <FileText className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-emerald-500">1. Algoritma Deskriptif (Naratif)</h3>
          <p className="text-muted-foreground text-sm mt-1">Menyajikan algoritma dengan bahasa sehari-hari yang mudah dipahami manusia.</p>
        </div>
      </div>

      <div className="space-y-8 pt-2">
        {/* 1. BAGIAN A: TEORI & ATURAN PENULISAN */}
        <div className="space-y-4">
          <p className="text-foreground leading-relaxed">
            Penyajikan <strong>Deskriptif</strong> atau yang sering juga disebut sebagai <strong>Algoritma Naratif</strong> adalah bentuk yang paling alamiah. Kita menggunakan untaian kalimat (seperti bahasa Indonesia atau Inggris) untuk mendeskripsikan langkah-langkah penyelesaian masalah secara naratif seperti sedang bercerita.
          </p>
          <div className="bg-background border border-border rounded-xl p-5 shadow-sm">
            <h4 className="font-bold flex items-center gap-2 mb-4 text-emerald-500">
              <CheckCircle2 className="w-5 h-5" />
              Aturan Penulisan Utama
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="font-bold text-emerald-500 mt-0.5">•</span>
                <span className="leading-relaxed">Setiap langkah harus diberi <strong>nomor urut</strong> yang jelas agar alurnya tidak melompat-lompat.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-emerald-500 mt-0.5">•</span>
                <span className="leading-relaxed">Menggunakan <strong>kalimat perintah (imperatif)</strong> yang singkat, padat, dan jelas.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-emerald-500 mt-0.5">•</span>
                <span className="leading-relaxed">Bebas dari <strong>ambiguitas</strong> (jangan menggunakan kiasan, perumpamaan, atau kata bersayap).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 2. BAGIAN B: CONTOH PENERAPAN INTERAKTIF */}
        <div className="space-y-4 pt-2 border-t border-border/40">
          <h4 className="font-bold flex items-center gap-2 text-emerald-500 text-lg">
            <BookOpen className="w-5 h-5" />
            Contoh Penerapan: Algoritma Naratif (Studi Kasus: Menghitung Luas Persegi Panjang)
          </h4>
          <div 
            className="bg-slate-900 border-2 border-slate-800 rounded-2xl p-6 md:p-8 shadow-inner text-sm text-slate-300 relative min-h-[260px] transition-all duration-300 ease-out origin-center hover:scale-[1.5] hover:z-50 hover:brightness-125 hover:border-emerald-500/80 hover:shadow-[0_25px_60px_rgba(0,0,0,0.8)] cursor-pointer antialiased"
            style={{ transform: "translateZ(0)", textRendering: "geometricPrecision", WebkitFontSmoothing: "antialiased" }}
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500/60 rounded-l-2xl"></div>
            
            <p className="text-slate-500 mb-6 italic font-mono">// Algoritma naratif untuk menghitung luas persegi panjang. <br/>(Arahkan kursor Anda ke teks untuk melihat aturan penulisan)</p>

            <div className="space-y-6 text-[15px]">
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex gap-3 items-center">
                <HoverNumber num="1" />
                <div>
                  <HoverCommand word="Masukkan" /> nilai <HoverVariable name="panjang" />.
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex gap-3 items-center">
                <HoverNumber num="2" />
                <div>
                  <HoverCommand word="Masukkan" /> nilai <HoverVariable name="lebar" />.
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex gap-3 items-start">
                <HoverNumber num="3" />
                <div>
                  <span className="block mb-1"><HoverCommand word="Hitung" /> nilai <HoverVariable name="luas" /></span>
                  <HoverFormula formula="luas = panjang * lebar" />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex gap-3 items-center">
                <HoverNumber num="4" />
                <div>
                  <HoverCommand word="Tampilkan" /> hasil <HoverVariable name="luas" /> ke layar.
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 3. BAGIAN C: EVALUASI KEKUATAN & KELEMAHAN (PENUTUP) */}
        <div className="space-y-3 pt-6 border-t border-border/40">
          <h4 className="font-bold flex items-center gap-2 text-foreground text-base mb-2">
            <Cog className="w-5 h-5 text-amber-500" />
            Evaluasi Penggunaan Algoritma Deskriptif
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
                  Sangat alamiah dan mudah dipahami oleh siapa saja (termasuk orang non-teknis) karena menggunakan kalimat bahasa sehari-hari tanpa perlu memahami sintaks pemrograman.
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
                  Cukup sulit diterjemahkan secara langsung ke dalam kode program komputer karena ketiadaan aturan sintaks yang kaku dan strukturnya yang terlalu bebas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
