"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  Split, 
  Percent, 
  GitBranch, 
  Layers, 
  Type, 
  ChevronDown, 
  CheckCircle2, 
  Sparkles,
  Zap,
  ArrowRight,
  Code2,
  Terminal,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import ExpressionAnatomyLab from './chapter5/ExpressionAnatomyLab';
import ArithmeticModuloLab from './chapter5/ArithmeticModuloLab';
import RelationalLogicLab from './chapter5/RelationalLogicLab';
import OperatorPrecedenceLab from './chapter5/OperatorPrecedenceLab';
import CompoundStringLab from './chapter5/CompoundStringLab';

export default function Pertemuan5() {
  const [isOpen1, setIsOpen1] = useState(true); // Open by default
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);

  return (
    <div className="space-y-12 overflow-visible">
      
      {/* Hero Header */}
      <header className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-amber-500/10 rounded-full mb-4 shadow-inner">
          <Calculator className="w-10 h-10 text-amber-600 dark:text-amber-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Operator, Ekspresi &amp; Manipulasi Data
        </h1>
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Mengubah data pasif di memori RAM menjadi <strong className="text-slate-900 dark:text-slate-100">komputasi dinamis</strong>. Membedah anatomi operator, keajaiban sisa bagi modulo (<code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-bold">%</code>), logika kebenaran boolean, hirarki evaluasi PEMDAS, hingga manipulasi teks modern.
        </p>

        {/* CTA Direct to Workspace Studio */}
        <div className="pt-2">
          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
          >
            <Terminal className="w-4 h-4" />
            <span>Buka Interactive Code Studio (Workspace Bab 5)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 1. ANATOMI OPERATOR, OPERAND & EKSPRESI                                    */}
      {/* ========================================================================= */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-cyan-500/40 ${isOpen1 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button 
          onClick={() => setIsOpen1(!isOpen1)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2 flex items-center gap-3">
              <Split className="w-8 h-8" />
              1. Hakikat Operator, Operand &amp; Ekspresi (Anatomi &amp; Arity)
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Capaian: Memahami dekonstruksi matematis antara simbol instruksi (Operator), bahan baku (Operand), dan hasil evaluasi (Ekspresi).</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen1 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen1 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-visible"
            >
              <div className="p-6 md:p-8 pt-2 space-y-8 overflow-visible">
                
                {/* Definisi Akademik Formal */}
                <div className="p-5 md:p-6 bg-cyan-500/10 dark:bg-cyan-950/30 border-l-4 border-cyan-500 rounded-r-2xl shadow-sm space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.06] sm:hover:scale-[1.1] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-cyan-400 bg-background/95 dark:bg-slate-950/95">
                  <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-bold text-xs uppercase tracking-wider font-mono">
                    <Sparkles className="w-4 h-4" />
                    <span>Definisi Akademik Resmi:</span>
                  </div>
                  <blockquote className="text-sm md:text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    &ldquo;<strong className="text-cyan-600 dark:text-cyan-300 font-black text-base md:text-lg underline decoration-cyan-500/40">Operator</strong> adalah simbol khusus yang menginstruksikan prosesor untuk melakukan tindakan matematika, perbandingan, atau logika terhadap satu atau lebih data masukan (<strong className="text-emerald-700 dark:text-emerald-300 font-black bg-emerald-500/15 dark:bg-emerald-500/25 px-2 py-0.5 rounded-lg border border-emerald-500/40 inline-block my-0.5">Operand</strong>), di mana kombinasi keduanya membentuk suatu <strong className="text-amber-700 dark:text-amber-300 font-black bg-amber-500/15 dark:bg-amber-500/25 px-2 py-0.5 rounded-lg border border-amber-500/40 inline-block my-0.5">Ekspresi</strong> yang akan dievaluasi oleh sistem menjadi <strong className="text-purple-700 dark:text-purple-300 font-black bg-purple-500/15 dark:bg-purple-500/25 px-2 py-0.5 rounded-lg border border-purple-500/40 inline-block my-0.5">satu nilai tunggal baru</strong>.&rdquo;
                  </blockquote>
                </div>

                {/* 3 Kartu Pilar Anatomi */}
                <div className="space-y-4 overflow-visible">
                  <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    3 Komponen Pembangun Setiap Ekspresi Komputasi:
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-visible py-2">
                    
                    {/* Pilar 1: Operand (Left) -> origin-center sm:origin-left */}
                    <div className="p-4 rounded-2xl bg-background border border-border/60 shadow-sm space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.35] sm:hover:scale-[1.45] transition-all duration-300 ease-out origin-center sm:origin-left hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-blue-500/50">
                      <div className="text-2xl">🏷️</div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        1. Operand (Bahan Baku)
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        Nilai konstan (misal: <code>15000</code>) atau variabel (misal: <code>harga</code>) yang menjadi target operasi komputasi.
                      </p>
                    </div>

                    {/* Pilar 2: Operator (Center) -> origin-center */}
                    <div className="p-4 rounded-2xl bg-background border border-border/60 shadow-sm space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.35] sm:hover:scale-[1.45] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-amber-500/50">
                      <div className="text-2xl">⚙️</div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        2. Operator (Instruksi Aksi)
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        Simbol pemroses seperti <code>+</code>, <code>*</code>, <code>==</code>, atau <code>not</code> yang memberi perintah apa yang harus dilakukan terhadap operand.
                      </p>
                    </div>

                    {/* Pilar 3: Ekspresi (Right) -> origin-center sm:origin-right */}
                    <div className="p-4 rounded-2xl bg-background border border-border/60 shadow-sm space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.35] sm:hover:scale-[1.45] transition-all duration-300 ease-out origin-center sm:origin-right hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-emerald-500/50">
                      <div className="text-2xl">✨</div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        3. Ekspresi (Hasil Evaluasi)
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        Rangkaian lengkap <code>harga * qty</code> yang setelah dihitung oleh komputer akan menciut (*reduce*) menjadi nilai tunggal <code>60000</code>.
                      </p>
                    </div>

                  </div>
                </div>

                {/* Interactive Expression Anatomy Lab */}
                <ExpressionAnatomyLab />

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* 2. OPERATOR ARITMATIKA & MISTERI MODULO (%)                               */}
      {/* ========================================================================= */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-amber-500/40 ${isOpen2 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button 
          onClick={() => setIsOpen2(!isOpen2)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-3">
              <Percent className="w-8 h-8" />
              2. Operator Aritmatika &amp; Misteri Sisa Bagi (Modulo % &amp; //)
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Capaian: Menguasai operasi aritmatika dasar, perbedaan / vs //, serta kekuatan siklus berulang Modulo (%) dalam algoritma.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen2 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen2 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-visible"
            >
              <div className="p-6 md:p-8 pt-2 space-y-6 overflow-visible">
                
                {/* Definisi Akademik Aritmatika & Modulo */}
                <div className="p-5 md:p-6 bg-amber-500/10 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-2xl shadow-sm space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.06] sm:hover:scale-[1.1] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-amber-400 bg-background/95 dark:bg-slate-950/95">
                  <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
                    <Sparkles className="w-4 h-4" />
                    <span>Definisi Akademik Resmi:</span>
                  </div>
                  <blockquote className="text-sm md:text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    &ldquo;<strong className="text-amber-600 dark:text-amber-300 font-black text-base md:text-lg underline decoration-amber-500/40">Operator Aritmatika</strong> adalah kelompok operator matematis yang mengeksekusi kalkulasi numerik standar (<code className="font-bold">+</code>, <code className="font-bold">-</code>, <code className="font-bold">*</code>, <code className="font-bold">/</code>), serta operasi khusus seperti <strong className="text-purple-700 dark:text-purple-300 font-black bg-purple-500/15 dark:bg-purple-500/25 px-2 py-0.5 rounded-lg border border-purple-500/40 inline-block my-0.5">Floor Division (//)</strong> untuk pembagian bulat dan <strong className="text-emerald-700 dark:text-emerald-300 font-black bg-emerald-500/15 dark:bg-emerald-500/25 px-2 py-0.5 rounded-lg border border-emerald-500/40 inline-block my-0.5">Modulo (%)</strong> untuk menghitung sisa hasil bagi Euclidean.&rdquo;
                  </blockquote>
                </div>

                {/* Interactive Arithmetic & Modulo Lab */}
                <ArithmeticModuloLab />

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* 3. OPERATOR RELASIONAL & LOGIKA BOOLEAN                                   */}
      {/* ========================================================================= */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-emerald-500/40 ${isOpen3 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button 
          onClick={() => setIsOpen3(!isOpen3)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-3">
              <GitBranch className="w-8 h-8" />
              3. Operator Relasional &amp; Logika Boolean (Jebakan = vs == &amp; Truth Table)
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Capaian: Menguasai uji kesamaan/perbandingan, menghindari jebakan fatal = vs ==, serta simulasi tabel kebenaran AND, OR, NOT.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen3 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen3 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-visible"
            >
              <div className="p-6 md:p-8 pt-2 space-y-6 overflow-visible">
                
                {/* Definisi Akademik Relasional & Logika */}
                <div className="p-5 md:p-6 bg-emerald-500/10 dark:bg-emerald-950/30 border-l-4 border-emerald-500 rounded-r-2xl shadow-sm space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.06] sm:hover:scale-[1.1] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-emerald-400 bg-background/95 dark:bg-slate-950/95">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
                    <Sparkles className="w-4 h-4" />
                    <span>Definisi Akademik Resmi:</span>
                  </div>
                  <blockquote className="text-sm md:text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    &ldquo;<strong className="text-emerald-600 dark:text-emerald-300 font-black text-base md:text-lg underline decoration-emerald-500/40">Operator Relasional</strong> menguji hubungan komparasi kuantitatif antara dua nilai (menghasilkan nilai boolean <code className="font-bold">True</code> atau <code className="font-bold">False</code>), sedangkan <strong className="text-cyan-700 dark:text-cyan-300 font-black bg-cyan-500/15 dark:bg-cyan-500/25 px-2 py-0.5 rounded-lg border border-cyan-500/40 inline-block my-0.5">Operator Logika</strong> (<code className="font-bold">AND</code>, <code className="font-bold">OR</code>, <code className="font-bold">NOT</code>) mengombinasikan beberapa proposisi boolean untuk menentukan alur keputusan percabangan algoritma.&rdquo;
                  </blockquote>
                </div>

                {/* Interactive Relational & Logic Lab */}
                <RelationalLogicLab />

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* 4. PRESEDENSI OPERATOR & HIRARKI PEMDAS                                   */}
      {/* ========================================================================= */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-purple-500/40 ${isOpen4 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button 
          onClick={() => setIsOpen4(!isOpen4)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2 flex items-center gap-3">
              <Layers className="w-8 h-8" />
              4. Presedensi Operator &amp; Hirarki Evaluasi (Aturan PEMDAS)
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Capaian: Memahami urutan prioritas eksekusi kompiler dan penggunaan tanda kurung () untuk mencegah kesalahan hitung fatal.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen4 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen4 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-visible"
            >
              <div className="p-6 md:p-8 pt-2 space-y-6 overflow-visible">
                
                {/* Definisi Akademik Presedensi */}
                <div className="p-5 md:p-6 bg-purple-500/10 dark:bg-purple-950/30 border-l-4 border-purple-500 rounded-r-2xl shadow-sm space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.06] sm:hover:scale-[1.1] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-purple-400 bg-background/95 dark:bg-slate-950/95">
                  <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-bold text-xs uppercase tracking-wider font-mono">
                    <Sparkles className="w-4 h-4" />
                    <span>Definisi Akademik Resmi:</span>
                  </div>
                  <blockquote className="text-sm md:text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    &ldquo;<strong className="text-purple-600 dark:text-purple-300 font-black text-base md:text-lg underline decoration-purple-500/40">Presedensi Operator</strong> (Order of Precedence) adalah aturan hierarki baku yang menentukan urutan evaluasi operator mana yang harus dihitung terlebih dahulu dalam sebuah ekspresi majemuk yang tidak memiliki tanda kurung eksplisit.&rdquo;
                  </blockquote>
                </div>

                {/* Interactive Operator Precedence Lab */}
                <OperatorPrecedenceLab />

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* 5. COMPOUND ASSIGNMENT & MANIPULASI STRING                                 */}
      {/* ========================================================================= */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-cyan-500/40 ${isOpen5 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button 
          onClick={() => setIsOpen5(!isOpen5)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2 flex items-center gap-3">
              <Type className="w-8 h-8" />
              5. Compound Assignment &amp; Manipulasi String (f-string vs Template Literal)
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Capaian: Menguasai operator penugasan ringkas (+=, -=) serta teknik penggabungan dan interpolasi teks modern.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen5 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen5 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-visible"
            >
              <div className="p-6 md:p-8 pt-2 space-y-6 overflow-visible">
                
                {/* Definisi Akademik Compound & String */}
                <div className="p-5 md:p-6 bg-cyan-500/10 dark:bg-cyan-950/30 border-l-4 border-cyan-500 rounded-r-2xl shadow-sm space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.06] sm:hover:scale-[1.1] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-cyan-400 bg-background/95 dark:bg-slate-950/95">
                  <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-bold text-xs uppercase tracking-wider font-mono">
                    <Sparkles className="w-4 h-4" />
                    <span>Definisi Akademik Resmi:</span>
                  </div>
                  <blockquote className="text-sm md:text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    &ldquo;<strong className="text-cyan-600 dark:text-cyan-300 font-black text-base md:text-lg underline decoration-cyan-500/40">Compound Assignment</strong> adalah bentuk penulisan ringkas untuk memperbarui nilai variabel dengan melakukan operasi terhadap dirinya sendiri (<code className="font-bold">x += y</code> ekuivalen dengan <code className="font-bold">x = x + y</code>), sedangkan <strong className="text-emerald-700 dark:text-emerald-300 font-black bg-emerald-500/15 dark:bg-emerald-500/25 px-2 py-0.5 rounded-lg border border-emerald-500/40 inline-block my-0.5">String Interpolation</strong> (seperti <code className="font-bold">f-string</code> di Python atau <code className="font-bold">Template Literal</code> di JavaScript) memungkinkan penanaman nilai variabel langsung ke dalam teks secara dinamis dan efisien.&rdquo;
                  </blockquote>
                </div>

                {/* Interactive Compound & String Lab */}
                <CompoundStringLab />

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
