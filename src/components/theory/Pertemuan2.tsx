"use client";

import React, { useState } from 'react';
import { Cpu, Server, MoveRight, Layers, Workflow, ChevronDown, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedArchVsOrg from '@/components/AnimatedArchVsOrg';
import InteractiveComputerStructure from '@/components/InteractiveComputerStructure';
import AnimatedComputerOperation from '@/components/AnimatedComputerOperation';
import AnimatedFetchCycle from '@/components/AnimatedFetchCycle';
import InteractiveNumberSystem from '@/components/InteractiveNumberSystem';
import AnimatedNumberConversion from '@/components/AnimatedNumberConversion';
import DataUnitsHierarchyLab from '@/components/theory/chapter2/DataUnitsHierarchyLab';
import { Hash, Repeat, Database } from 'lucide-react';

export default function Pertemuan2() {
  const [isArchOpen, setIsArchOpen] = useState(true);
  const [isNumOpen, setIsNumOpen] = useState(false);

  return (
    <div className="space-y-12">
      <header className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
          <Server className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Arsitektur dan Organisasi Komputer</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Menyelami struktur, cara kerja mesin, sistem bilangan radiks, dan hierarki satuan data komputasi.
        </p>
      </header>

      {/* --- SUB BAB 1: ARSITEKTUR & ORGANISASI KOMPUTER --- */}
      <div className="border border-border/50 rounded-2xl overflow-hidden bg-secondary/10 shadow-sm transition-all hover:border-primary/30">
        <button 
          onClick={() => setIsArchOpen(!isArchOpen)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 flex items-center gap-3">
              <Server className="w-8 h-8" />
              Arsitektur &amp; Organisasi Komputer
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Capaian: Memahami struktur, komponen utama, dan siklus eksekusi instruksi pada komputer.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground shrink-0 transition-transform duration-300 ${isArchOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isArchOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-6 md:p-8 pt-2 space-y-16">
                
                {/* Section 1: Arsitektur vs Organisasi */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 text-primary border-b border-border/50 pb-2">
                    <Layers className="w-6 h-6" />
                    <h2 className="text-2xl font-bold">1. Arsitektur vs Organisasi Komputer</h2>
                  </div>
                  <p>
                    Dalam dunia komputer, istilah <strong>Arsitektur</strong> dan <strong>Organisasi</strong> sering dianggap sama, namun sebenarnya merujuk pada dua hal yang berbeda.
                  </p>
                  
                  <AnimatedArchVsOrg />
                </section>

                {/* Section 2: Struktur Sistem Komputer */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 text-primary border-b border-border/50 pb-2">
                    <Cpu className="w-6 h-6" />
                    <h2 className="text-2xl font-bold">2. Struktur Sistem Komputer</h2>
                  </div>
                  <p>
                    Secara umum, komputer tersusun atas beberapa perangkat utama (CPU, Memori, Input/Output) yang saling terhubung melalui jalur komunikasi yang disebut <strong>Bus</strong>.
                  </p>
                  
                  <InteractiveComputerStructure />
                </section>

                {/* Section 3: Cara Kerja Komputer */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 text-primary border-b border-border/50 pb-2">
                    <Workflow className="w-6 h-6" />
                    <h2 className="text-2xl font-bold">3. Cara Kerja Komputer</h2>
                  </div>
                  <p>
                    Bagaimana tepatnya sebuah data atau program dieksekusi? Berikut adalah tahapan berurutan dari mulai data diambil hingga menghasilkan output.
                  </p>

                  <AnimatedComputerOperation />
                  <AnimatedFetchCycle />
                </section>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- SUB BAB 2: SISTEM BILANGAN & SATUAN DATA KOMPUTER --- */}
      <div className="border border-border/50 rounded-2xl overflow-hidden bg-secondary/10 shadow-sm transition-all hover:border-primary/30">
        <button 
          onClick={() => setIsNumOpen(!isNumOpen)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 flex items-center gap-3">
              <Hash className="w-8 h-8" />
              Sistem Bilangan &amp; Satuan Data Komputer
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Capaian: Menguasai basis bilangan (Desimal, Biner, Oktal, Heksadesimal) serta hierarki satuan data (Bit hingga Terabyte).</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground shrink-0 transition-transform duration-300 ${isNumOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isNumOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-6 md:p-8 pt-2 space-y-16">

                {/* Section 4: Sistem Bilangan */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 text-primary border-b border-border/50 pb-2">
                    <Hash className="w-6 h-6" />
                    <h2 className="text-2xl font-bold">4. Sistem Bilangan Komputer</h2>
                  </div>
                  <p>
                    Komputer tidak memahami bahasa manusia. Mereka menyimpan dan mengolah data menggunakan sekumpulan simbol khusus yang disebut <strong>Sistem Bilangan</strong> (<em>Number System</em>). Mari berinteraksi dengan 4 sistem bilangan utama di bawah ini untuk memahami cara mereka dikonversi menjadi bilangan desimal!
                  </p>

                  <InteractiveNumberSystem />
                </section>

                {/* Section 5: Konversi Bilangan */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 text-primary border-b border-border/50 pb-2">
                    <Repeat className="w-6 h-6" />
                    <h2 className="text-2xl font-bold">5. Konversi Antar Basis Bilangan</h2>
                  </div>
                  <p>
                    Sekarang Anda sudah mengenal 4 sistem bilangan utama. Lalu, bagaimana jika kita ingin menerjemahkan nilai dari satu basis ke basis lainnya? Jangan khawatir, Anda tidak perlu menghitung secara manual yang membosankan. Mari kita masuk ke dalam <strong>Laboratorium Konversi</strong> di bawah ini untuk melihat mesin pemotong dan mesin pembagi sisa bekerja secara visual!
                  </p>

                  <AnimatedNumberConversion />
                </section>

                {/* Section 6: Satuan Ukuran Data Komputasi */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 text-primary border-b border-border/50 pb-2">
                    <Database className="w-6 h-6" />
                    <h2 className="text-2xl font-bold">6. Satuan Ukuran Data dalam Ilmu Komputer</h2>
                  </div>
                  <p>
                    Setelah memahami bagaimana angka biner dibentuk, mari pelajari bagaimana kumpulan bit-bit tersebut dikelompokkan ke dalam satuan-satuan ukuran data digital, mulai dari <strong>Bit</strong>, <strong>Byte</strong>, <strong>Kilobyte (KB)</strong>, <strong>Megabyte (MB)</strong>, <strong>Gigabyte (GB)</strong>, hingga <strong>Terabyte (TB)</strong> dan skala internet global!
                  </p>

                  <DataUnitsHierarchyLab />
                </section>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
