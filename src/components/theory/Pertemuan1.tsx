"use client";

import React from 'react';
import { BookOpen, Cpu, Code, Layers, History } from 'lucide-react';
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

      {/* Section 1: Dari Definisi ke Realita */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-primary border-b border-border/50 pb-2">
          <Cpu className="w-6 h-6" />
          <h2 className="text-2xl font-bold">1. Mengupas Definisi Komputer</h2>
        </div>
        <AnimatedDefinitionText />
        <p>
          Meskipun literatur akademis merumuskan definisi ini melalui terminologi yang formal, penelaahan lebih mendalam terhadap definisi tersebut mengungkapkan landasan fundamental mengenai urgensi mempelajari <strong className="text-foreground">Pemrograman</strong>.
        </p>
        
        <InteractiveComputerDefinition />
        
        <div className="p-5 bg-secondary/30 rounded-xl border-l-4 border-l-primary italic text-sm">
          <strong className="text-primary not-italic block mb-1">Kesimpulan: </strong>
          Komputer itu ibarat koki super cepat yang memiliki ingatan fotografis, namun sayangnya ia sama sekali tidak tahu cara memasak! Ia hanya bisa menunggu <strong className="not-italic text-foreground">urutan instruksi</strong> dari Anda. Nah, urutan instruksi logis itulah yang akan kita pelajari dan kita sebut sebagai <strong>Algoritma</strong>.
        </div>
      </section>

      {/* Section 2 */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-primary border-b border-border/50 pb-2">
          <History className="w-6 h-6" />
          <h2 className="text-2xl font-bold">2. Evolusi Cara Memberi Instruksi</h2>
        </div>
        <p>
          Sebelum kita melangkah lebih jauh tentang memprogram, mari kita lihat bagaimana cara manusia berkomunikasi dengan mesin dari masa ke masa. Anda akan menyadari betapa beruntungnya kita hidup di era saat ini, di mana memberikan instruksi ke komputer tidak lagi membutuhkan kabel dan obeng!
        </p>
        <HistoryTimeline />
      </section>

      {/* Section 3 */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-primary border-b border-border/50 pb-2">
          <Code className="w-6 h-6" />
          <h2 className="text-2xl font-bold">3. Program Komputer</h2>
        </div>
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
      </section>

      {/* Section 4 */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-primary border-b border-border/50 pb-2">
          <Layers className="w-6 h-6" />
          <h2 className="text-2xl font-bold">4. Bahasa Pemrograman & Levelnya</h2>
        </div>
        <AnimatedLanguageDefinition />
        
        <AnimatedMachineLanguage />
        
        <ul className="list-disc pl-6 space-y-3 text-muted-foreground mt-4 mb-6">
        <AnimatedAssemblyDefinition />
        <AnimatedHighLevelDefinition />
        </ul>

        <CodeTranslationVisualizer />

        <AnimatedTranslatorDefinition />
      </section>
    </div>
  );
}
