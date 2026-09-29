"use client";

import React, { useState } from 'react';
import { BookOpen, Cpu, Code, Layers, History, ChevronDown, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveComputerDefinition, { AnimatedDefinitionText } from '@/components/InteractiveComputerDefinition';
import AnimatedProgramDefinition from '@/components/AnimatedProgramDefinition';
import AnimatedLanguageDefinition from '@/components/AnimatedLanguageDefinition';
import AnimatedMachineLanguage from '@/components/AnimatedMachineLanguage';
import AnimatedAssemblyDefinition from '@/components/AnimatedAssemblyDefinition';
import AnimatedHighLevelDefinition from '@/components/AnimatedHighLevelDefinition';
import AnimatedTranslatorDefinition from '@/components/AnimatedTranslatorDefinition';
import HistoryTimeline from '@/components/HistoryTimeline';
import CodeTranslationVisualizer from '@/components/CodeTranslationVisualizer';

export default function Pertemuan1() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  return (
    <div className="space-y-12">
      <header className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
          <BookOpen className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Pengenalan Komputer & Bahasa Pemrograman</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Sebelum kita menulis kode pertama kita, mari berkenalan dengan "otak" di balik layar.
        </p>
      </header>

      {/* --- SUB BAB 1: MENGUPAS DEFINISI KOMPUTER --- */}
      <div className={`border border-border/50 rounded-2xl bg-secondary/10 shadow-sm transition-all hover:border-primary/30 ${isOpen1 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button 
          onClick={() => setIsOpen1(!isOpen1)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 flex items-center gap-3">
              <Cpu className="w-8 h-8" />
              1. Mengupas Definisi Komputer
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Capaian: Memahami hakikat komputer, kebutuhan instruksi terstruktur, dan peran CPU.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-slate-600 dark:text-slate-400 shrink-0 transition-transform duration-300 ${isOpen1 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen1 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={isOpen1 ? 'overflow-visible' : 'overflow-hidden'}
            >
              <div className="p-6 md:p-8 pt-2 space-y-6">
                <AnimatedDefinitionText />
                <p>
                  Meskipun literatur akademis merumuskan definisi ini melalui terminologi yang formal, penelaahan lebih mendalam terhadap definisi tersebut mengungkapkan landasan fundamental mengenai urgensi mempelajari <strong className="text-foreground">Pemrograman</strong>.
                </p>
                
                <InteractiveComputerDefinition />
                
                <div className="p-5 bg-secondary/30 rounded-xl border-l-4 border-l-primary italic text-sm">
                  <strong className="text-primary not-italic block mb-1">Kesimpulan: </strong>
                  Komputer itu ibarat koki super cepat yang memiliki ingatan fotografis, namun sayangnya ia sama sekali tidak tahu cara memasak! Ia hanya bisa menunggu <strong className="not-italic text-foreground">urutan instruksi</strong> dari Anda. Nah, urutan instruksi logis itulah yang akan kita pelajari dan kita sebut sebagai <strong>Algoritma</strong>.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- SUB BAB 2: EVOLUSI CARA MEMBERI INSTRUKSI --- */}
      <div className={`border border-border/50 rounded-2xl bg-secondary/10 shadow-sm transition-all hover:border-primary/30 ${isOpen2 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button 
          onClick={() => setIsOpen2(!isOpen2)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 flex items-center gap-3">
              <History className="w-8 h-8" />
              2. Evolusi Cara Memberi Instruksi
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Capaian: Memahami transformasi historis komunikasi manusia-mesin dari kabel fisik hingga bahasa modern.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-slate-600 dark:text-slate-400 shrink-0 transition-transform duration-300 ${isOpen2 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen2 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={isOpen2 ? 'overflow-visible' : 'overflow-hidden'}
            >
              <div className="p-6 md:p-8 pt-2 space-y-6">
                <p>
                  Sebelum kita melangkah lebih jauh tentang memprogram, mari kita lihat bagaimana cara manusia berkomunikasi dengan mesin dari masa ke masa. Anda akan menyadari betapa beruntungnya kita hidup di era saat ini, di mana memberikan instruksi ke komputer tidak lagi membutuhkan kabel dan obeng!
                </p>
                <HistoryTimeline />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- SUB BAB 3: PROGRAM KOMPUTER --- */}
      <div className={`border border-border/50 rounded-2xl bg-secondary/10 shadow-sm transition-all hover:border-primary/30 ${isOpen3 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button 
          onClick={() => setIsOpen3(!isOpen3)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 flex items-center gap-3">
              <Code className="w-8 h-8" />
              3. Program Komputer &amp; Algoritma
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Capaian: Memahami analogi program sebagai resep instruksi terstruktur dan fondasi algoritma.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-slate-600 dark:text-slate-400 shrink-0 transition-transform duration-300 ${isOpen3 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen3 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={isOpen3 ? 'overflow-visible' : 'overflow-hidden'}
            >
              <div className="p-6 md:p-8 pt-2 space-y-6">
                <AnimatedProgramDefinition />
                <p>
                  Jika CPU adalah otaknya, maka Program Komputer adalah "buku resep" terstruktur yang memberitahu komputer langkah demi langkah apa yang harus dilakukan.
                </p>
                <div className="bg-card border border-border p-5 rounded-lg shadow-sm border-l-4 border-l-primary font-mono text-sm space-y-2">
                  <div className="text-muted-foreground italic"># Contoh analogi instruksi untuk membuat kopi:</div>
                  <div>1. Ambil cangkir</div>
                  <div>2. Masukkan 1 sendok kopi</div>
                  <div>3. Tuang air panas</div>
                  <div>4. Aduk hingga rata</div>
                </div>
                <p>
                  Dalam dunia pemrograman, urutan langkah demi langkah yang logis untuk memecahkan masalah ini disebut sebagai <strong className="text-foreground">Algoritma</strong>.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- SUB BAB 4: BAHASA PEMROGRAMAN & LEVELNYA --- */}
      <div className={`border border-border/50 rounded-2xl bg-secondary/10 shadow-sm transition-all hover:border-primary/30 ${isOpen4 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button 
          onClick={() => setIsOpen4(!isOpen4)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 flex items-center gap-3">
              <Layers className="w-8 h-8" />
              4. Bahasa Pemrograman &amp; Levelnya
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Capaian: Memahami hirarki bahasa mesin, assembly, bahasa tingkat tinggi, interpreter, dan compiler.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-slate-600 dark:text-slate-400 shrink-0 transition-transform duration-300 ${isOpen4 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen4 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={isOpen4 ? 'overflow-visible' : 'overflow-hidden'}
            >
              <div className="p-6 md:p-8 pt-2 space-y-6">
                <AnimatedLanguageDefinition />
                
                <AnimatedMachineLanguage />
                
                <ul className="list-disc pl-6 space-y-3 text-muted-foreground mt-4 mb-6">
                  <AnimatedAssemblyDefinition />
                  <AnimatedHighLevelDefinition />
                </ul>

                <CodeTranslationVisualizer />

                <AnimatedTranslatorDefinition />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
