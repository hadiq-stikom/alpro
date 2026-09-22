"use client";

import React, { useState } from 'react';
import { Network, PenTool, Braces, ChevronDown, CheckCircle2, ChevronRight, Binary, Workflow } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedAlgorithmCharacteristics from '@/components/AnimatedAlgorithmCharacteristics';
import InteractiveAlgorithmPresentation from '@/components/InteractiveAlgorithmPresentation';
import AnimatedBasicStructures from '@/components/AnimatedBasicStructures';
import AnimatedAlgorithmDefinition from '@/components/AnimatedAlgorithmDefinition';
import LogicPuzzleRiver from '@/components/LogicPuzzleRiver';
import LogicPuzzleSwitches from '@/components/LogicPuzzleSwitches';
import AnimatedShippingAlgorithm from '@/components/AnimatedShippingAlgorithm';
import DetailedDescriptive from '@/components/theory/DetailedDescriptive';
import DetailedFlowchart from '@/components/theory/DetailedFlowchart';
import DetailedPseudocode from '@/components/theory/DetailedPseudocode';
import AlgorithmTriConverterLab from '@/components/theory/chapter3/AlgorithmTriConverterLab';
import ProgramEngineeringMethodology from '@/components/theory/chapter3/ProgramEngineeringMethodology';

export default function Pertemuan3() {
  const [isOpen1, setIsOpen1] = useState(true); // Open by default
  const [isOpen2, setIsOpen2] = useState(true); // Sub-Bab 2 Baru (Metodologi)
  const [isOpen3, setIsOpen3] = useState(false); // Sub-Bab 3 (Teknik Penyajian)
  const [isOpen4, setIsOpen4] = useState(false); // Sub-Bab 4 (Struktur Dasar)
  const [isPuzzlesOpen, setIsPuzzlesOpen] = useState(true);

  return (
    <div className="space-y-12">
      <header className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 shadow-inner">
          <Binary className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Fondasi Algoritma</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gerbang utama menuju logika pemrograman. Memahami cara berpikir sistematis, terstruktur, dan efisien layaknya seorang insinyur perangkat lunak.
        </p>
      </header>

      {/* --- SUB BAB 1: PENGANTAR ALGORITMA --- */}
      <div className="border border-border/50 rounded-2xl overflow-hidden bg-secondary/5 shadow-sm transition-all hover:border-primary/30">
        <button 
          onClick={() => setIsOpen1(!isOpen1)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 flex items-center gap-3">
              <Network className="w-8 h-8" />
              1. Pengantar Algoritma
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Capaian: Memahami definisi, alasan pentingnya, serta 5 ciri utama algoritma yang baik.</span>
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
              className="overflow-hidden"
            >
              <div className="p-6 md:p-8 pt-2 space-y-10">
                
                <AnimatedAlgorithmDefinition />

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-4">
                  <p>
                    Mengapa kita harus repot-repot memikirkan langkah-langkahnya? Karena algoritma bersifat universal. Ia tidak terikat pada satu bahasa pemrograman apa pun. Jika Anda menguasai algoritmanya, menerjemahkannya ke dalam bahasa C++, Python, atau Java hanyalah masalah sintaksis (tata bahasa).
                  </p>
                  
                  <AnimatedShippingAlgorithm />
                </div>

                {/* Pendalaman Konsep / Pemanasan Otak */}
                <div className="pt-8 border-t border-border/50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h3 className="text-2xl font-bold flex items-center gap-3 text-blue-500">
                      <span className="text-3xl">🧠</span>
                      Pemanasan Otak &amp; Pendalaman Konsep
                    </h3>
                    <button 
                      onClick={() => setIsPuzzlesOpen(!isPuzzlesOpen)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-lg font-bold transition-colors text-sm"
                    >
                      {isPuzzlesOpen ? 'Sembunyikan' : 'Tampilkan'}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isPuzzlesOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {isPuzzlesOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="prose prose-slate dark:prose-invert max-w-none mb-8 pt-2">
                          <p className="text-lg">
                            Seorang Programmer hebat bukanlah mereka yang sekadar hafal bahasa pemrograman, melainkan mereka yang memiliki <strong>naluri memecahkan masalah (Problem Solving)</strong> yang tajam.
                          </p>
                          <p>
                            Selesaikan dua teka-teki logika interaktif di bawah ini secara manual. Perhatikan baik-baik urutan langkah apa saja yang Anda ambil hingga mencapai kemenangan! Itulah wujud nyata dari merancang sebuah Algoritma di dunia nyata.
                          </p>
                        </div>

                        <div className="space-y-12 pb-8">
                          <LogicPuzzleRiver />
                          <LogicPuzzleSwitches />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Animated Algorithm Characteristics */}
                <AnimatedAlgorithmCharacteristics />

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- SUB BAB 2 (BARU): METODOLOGI REKAYASA PROGRAM --- */}
      <div className={`border border-border/50 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-indigo-500/30 ${isOpen2 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button 
          onClick={() => setIsOpen2(!isOpen2)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background rounded-t-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-500 mb-2 flex items-center gap-3">
              <Workflow className="w-8 h-8" />
              2. Metodologi Rekayasa Program: Dari Masalah ke Solusi
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Capaian: Menguasai 4 siklus rekayasa (Analisis Persamaan &amp; Tipe Data, Desain Algoritma, Coding, dan Testing).</span>
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
              <div className="p-6 md:p-8 pt-2 space-y-10">
                <ProgramEngineeringMethodology />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- SUB BAB 3: PENYAJIAN ALGORITMA --- */}
      <div className={`border border-border/50 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-amber-500/30 ${isOpen3 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button 
          onClick={() => setIsOpen3(!isOpen3)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background rounded-t-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-amber-500 mb-2 flex items-center gap-3">
              <PenTool className="w-8 h-8" />
              3. Teknik Penyajian Algoritma
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Capaian: Mampu menyajikan algoritma menggunakan Deskriptif, Flowchart, dan Pseudocode.</span>
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
              <div className="p-6 md:p-8 pt-2 space-y-10">
                
                <div className="prose prose-slate dark:prose-invert max-w-none mb-10">
                  <p>
                    Algoritma dapat disajikan dalam berbagai bentuk, mulai dari yang paling santai hingga yang paling terstruktur. Terdapat 3 teknik utama yang harus dikuasai oleh seorang <em>Programmer</em>. Mari kita pelajari satu per satu secara mendetail.
                  </p>
                </div>

                <div className="space-y-10">
                  <DetailedDescriptive />
                  <DetailedFlowchart />
                  <DetailedPseudocode />
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none mt-16 mb-8 pt-8 border-t border-border/50">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Sintesis: Perbandingan Ketiga Teknik</h3>
                  <p>
                    Setelah memahami anatomi dan cara kerja masing-masing teknik, mari kita lihat bagaimana ketiganya menerjemahkan sebuah persoalan yang sama secara berdampingan. Jalankan simulasi interaktif di bawah ini!
                  </p>
                </div>

                {/* Interactive Presentation Tool */}
                <InteractiveAlgorithmPresentation />

                {/* Tri-Directional Converter Lab & Rule Linter */}
                <div className="prose prose-slate dark:prose-invert max-w-none mt-16 mb-6 pt-8 border-t border-border/50">
                  <h3 className="text-2xl font-bold text-emerald-500 mb-2 flex items-center gap-2">
                    <Binary className="w-6 h-6" />
                    Laboratorium Interaktif: Konversi Tri-Arah &amp; Pengingat Aturan Penulisan
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300">
                    Cobalah membuat atau mengubah salah satu bentuk representasi di bawah ini (Naratif, Flowchart, atau Pseudocode). Sistem akan secara otomatis mengonversi ke dua bentuk lainnya serta memeriksa kepatuhan aturan penulisan algoritma Anda secara <em>real-time</em>!
                  </p>
                </div>

                <AlgorithmTriConverterLab />

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- SUB BAB 4: STRUKTUR DASAR ALGORITMA --- */}
      <div className="border border-border/50 rounded-2xl overflow-hidden bg-secondary/5 shadow-sm transition-all hover:border-emerald-500/30">
        <button 
          onClick={() => setIsOpen4(!isOpen4)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-500 mb-2 flex items-center gap-3">
              <Braces className="w-8 h-8" />
              4. Struktur Dasar Algoritma
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Capaian: Memahami dan membedakan alur Sequential, Selection, dan Looping.</span>
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
              className="overflow-hidden"
            >
              <div className="p-6 md:p-8 pt-2 space-y-10">
                
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p>
                    Sebesar apa pun dan serumit apa pun sebuah program (bahkan Sistem Operasi Windows atau Game 3D sekalipun), pada dasarnya mereka hanyalah gabungan raksasa dari <strong>3 Struktur Dasar</strong> ini. 
                  </p>
                  <p>
                    Jika Anda mampu merangkai ketiga struktur ini, Anda bisa membuat aplikasi apa saja! Mari kita lihat bagaimana rupa dari ketiga struktur pembangun dunia digital ini.
                  </p>
                </div>

                {/* Animated Basic Structures Tool */}
                <AnimatedBasicStructures />

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
