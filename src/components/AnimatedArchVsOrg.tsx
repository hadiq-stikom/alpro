"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick, DraftingCompass, Wrench, Code2, Cpu, Eye, EyeOff, BookOpen, Cable } from 'lucide-react';

export default function AnimatedArchVsOrg() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="bg-primary/5 p-5 md:p-6 rounded-xl border border-primary/20 text-foreground relative cursor-pointer shadow-sm overflow-hidden my-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ minHeight: isHovered ? 500 : 160 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
    >
      <div className="absolute top-3 right-4 text-primary/50 text-xs flex items-center gap-1.5 font-medium animate-pulse z-20">
        <MousePointerClick className="w-4 h-4" /> Arahkan Kursor (Hover)
      </div>

      <AnimatePresence mode="popLayout">
        {!isHovered ? (
          <motion.div 
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 space-y-4 pt-4 md:pt-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <strong className="flex items-center gap-2 mb-2 text-blue-500">
                  <DraftingCompass className="w-5 h-5" /> Arsitektur Komputer
                </strong>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Merujuk pada atribut sistem yang <motion.span layoutId="ao-visible" className="text-blue-500 font-semibold px-1 bg-blue-500/10 rounded">visible (terlihat)</motion.span> untuk programmer. Berdampak langsung pada eksekusi logis program.
                </p>
              </div>
              <div>
                <strong className="flex items-center gap-2 mb-2 text-orange-500">
                  <Wrench className="w-5 h-5" /> Organisasi Komputer
                </strong>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Merujuk pada unit-unit operasional (hardware) yang <motion.span layoutId="ao-invisible" className="text-orange-500 font-semibold px-1 bg-orange-500/10 rounded">transparan (tak terlihat)</motion.span> oleh programmer. Menjabarkan spesifikasi arsitektur.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="diagram"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-full h-full relative pt-6 pb-2 z-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
              
              {/* ARSITEKTUR SIDE */}
              <div className="flex flex-col border border-blue-500/30 rounded-2xl bg-blue-500/5 overflow-hidden shadow-lg">
                 <div className="bg-blue-500/10 p-3 border-b border-blue-500/20 flex flex-col items-center">
                    <strong className="text-blue-500 flex items-center gap-2">
                      <DraftingCompass className="w-5 h-5" /> Arsitektur
                    </strong>
                    <motion.span layoutId="ao-visible" className="text-xs font-bold text-blue-400 mt-1 flex items-center gap-1 bg-blue-500/20 px-2 py-0.5 rounded-full">
                      <Eye className="w-3 h-3" /> Visible to Programmer
                    </motion.span>
                 </div>
                 
                 <div className="p-5 flex flex-col items-center flex-grow space-y-4">
                    {/* Metaphor */}
                    <div className="text-center bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 w-full">
                      <span className="text-xs text-blue-700 dark:text-blue-300 italic block mb-1">Analogi:</span>
                      <strong className="text-blue-800 dark:text-blue-400 text-sm">"Cetak Biru (Blueprint) Rumah"</strong>
                      <p className="text-[10px] text-blue-900 dark:text-blue-200 mt-1">Spesifikasi jumlah kamar, letak pintu, dan desain yang terlihat oleh pemilik rumah.</p>
                    </div>

                    {/* Technical Examples */}
                    <div className="w-full bg-[#0a1128] rounded-xl border border-blue-500/40 p-4 shadow-inner relative flex flex-col gap-3">
                      <Code2 className="absolute -right-2 -top-2 w-8 h-8 text-blue-500/20" />
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-500/20 p-2 rounded-lg shrink-0">
                          <BookOpen className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <strong className="text-xs text-blue-300 block">Set Instruksi</strong>
                          <span className="text-[10px] text-muted-foreground">Kumpulan perintah yang dipahami CPU (ADD, SUB, LOAD).</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-blue-500/20 p-2 rounded-lg shrink-0">
                          <span className="font-mono text-xs font-bold text-blue-400">01</span>
                        </div>
                        <div>
                          <strong className="text-xs text-blue-300 block">Format Data</strong>
                          <span className="text-[10px] text-muted-foreground">Jumlah bit (32-bit / 64-bit), representasi karakter.</span>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>

              {/* ORGANISASI SIDE */}
              <div className="flex flex-col border border-orange-500/30 rounded-2xl bg-orange-500/5 overflow-hidden shadow-lg relative">
                 <div className="bg-orange-500/10 p-3 border-b border-orange-500/20 flex flex-col items-center">
                    <strong className="text-orange-500 flex items-center gap-2">
                      <Wrench className="w-5 h-5" /> Organisasi
                    </strong>
                    <motion.span layoutId="ao-invisible" className="text-xs font-bold text-orange-400 mt-1 flex items-center gap-1 bg-orange-500/20 px-2 py-0.5 rounded-full">
                      <EyeOff className="w-3 h-3" /> Transparan to Programmer
                    </motion.span>
                 </div>

                 <div className="p-5 flex flex-col items-center flex-grow space-y-4">
                    {/* Metaphor */}
                    <div className="text-center bg-orange-500/10 p-3 rounded-lg border border-orange-500/20 w-full">
                      <span className="text-xs text-orange-700 dark:text-orange-300 italic block mb-1">Analogi:</span>
                      <strong className="text-orange-800 dark:text-orange-400 text-sm">"Tukang, Semen, dan Kabel"</strong>
                      <p className="text-[10px] text-orange-900 dark:text-orange-200 mt-1">Detail pemasangan pipa dan instalasi listrik di dalam tembok yang tidak perlu diurus oleh pemilik rumah.</p>
                    </div>

                    {/* Technical Examples */}
                    <div className="w-full bg-[#2a130c] rounded-xl border border-orange-500/40 p-4 shadow-inner relative flex flex-col gap-3">
                      <Cpu className="absolute -right-2 -top-2 w-8 h-8 text-orange-500/20" />
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-orange-500/20 p-2 rounded-lg shrink-0 relative overflow-hidden">
                          <Cable className="w-4 h-4 text-orange-400" />
                          <div className="absolute inset-0 bg-orange-500/20 w-1/2 animate-[ping_1s_infinite]" />
                        </div>
                        <div>
                          <strong className="text-xs text-orange-300 block">Sinyal Kontrol & Bus</strong>
                          <span className="text-[10px] text-muted-foreground">Kabel fisik dan voltase listrik pengatur lalu lintas data.</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-orange-500/20 p-2 rounded-lg shrink-0">
                          <Cpu className="w-4 h-4 text-orange-400" />
                        </div>
                        <div>
                          <strong className="text-xs text-orange-300 block">Teknologi Hardware</strong>
                          <span className="text-[10px] text-muted-foreground">Jenis IC, sirkuit transistor, memori (DRAM/SRAM) yang dipakai.</span>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
