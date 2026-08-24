"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick, FileText, ArrowRightLeft, Settings2, Cpu, Lock, Binary, CornerDownRight, X } from 'lucide-react';

export default function AnimatedAssemblyDefinition() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li 
      className="bg-purple-500/5 p-5 rounded-xl border-l-4 border-purple-500 mb-4 relative cursor-pointer shadow-sm overflow-hidden list-none ml-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ minHeight: isHovered ? 480 : 120 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
    >
      <div className="absolute top-3 right-4 text-purple-500/60 text-xs flex items-center gap-1.5 font-medium animate-pulse z-20">
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
            className="text-foreground font-medium leading-loose text-sm md:text-base pt-6 md:pt-2 relative z-10"
          >
            <strong className="text-purple-600 dark:text-purple-400">Tingkat Menengah (Assembly):</strong> Bahasa yang menggunakan{' '}
            <motion.span layoutId="ad-mnemonik" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform">kata-kata singkatan (mnemonik)</motion.span>
            {' '}untuk{' '}
            <motion.span layoutId="ad-ganti" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform">menggantikan deretan biner</motion.span>
            , yang nantinya{' '}
            <motion.span layoutId="ad-assembler" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform">diterjemahkan kembali oleh program Assembler</motion.span>
            . Masih{' '}
            <motion.span layoutId="ad-dependent" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-red-500/10 text-red-600 dark:text-red-400 font-bold border border-red-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform italic">Machine Dependent</motion.span>
            .
          </motion.div>
        ) : (
          <motion.div 
            key="diagram"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-full h-full relative pt-8 pb-4 z-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
              
              {/* 1. Mnemonik (Kata Singkatan) */}
              <div className="flex flex-col items-center">
                <motion.span layoutId="ad-mnemonik" className="mb-2 px-3 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/30 text-[10px] md:text-xs shadow-sm z-10 text-center">
                  kata-kata singkatan (mnemonik)
                </motion.span>
                <div className="w-full bg-[#0d1526] p-4 rounded-xl border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.15)] flex flex-col items-center justify-center relative h-32">
                   <FileText className="w-8 h-8 text-blue-400/30 absolute right-4 top-4" />
                   <div className="flex flex-col gap-2 font-mono text-sm">
                     <div className="bg-background/80 px-3 py-1 rounded border border-blue-500/30 flex items-center gap-2 shadow-sm text-blue-400">
                       <span className="font-bold text-blue-300">MOV</span> <span>AH, 02H</span>
                     </div>
                     <div className="bg-background/80 px-3 py-1 rounded border border-blue-500/30 flex items-center gap-2 shadow-sm text-blue-400">
                       <span className="font-bold text-blue-300">INT</span> <span>21H</span>
                     </div>
                   </div>
                </div>
              </div>

              {/* 2. Menggantikan Biner */}
              <div className="flex flex-col items-center">
                <motion.span layoutId="ad-ganti" className="mb-2 px-3 py-1 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/30 text-[10px] md:text-xs shadow-sm z-10 text-center">
                  menggantikan deretan biner
                </motion.span>
                <div className="w-full bg-[#0a1919] p-4 rounded-xl border border-teal-500/40 shadow-[0_0_15px_rgba(20,184,166,0.15)] flex flex-col items-center justify-center relative h-32 overflow-hidden">
                   <ArrowRightLeft className="w-8 h-8 text-teal-400/20 absolute right-4 top-4" />
                   <div className="flex items-center gap-4 w-full justify-center">
                      <div className="flex flex-col items-center opacity-40 line-through decoration-red-500 decoration-2">
                         <Binary className="w-5 h-5 text-teal-500 mb-1" />
                         <span className="font-mono text-[10px] text-teal-400">10110100</span>
                      </div>
                      <ArrowRightLeft className="w-5 h-5 text-teal-400 animate-pulse" />
                      <div className="flex flex-col items-center bg-teal-500/20 px-3 py-1.5 rounded-lg border border-teal-500/50 scale-110 shadow-lg">
                         <span className="font-mono text-sm font-bold text-teal-300">MOV</span>
                      </div>
                   </div>
                   <span className="text-[9px] text-teal-500/70 mt-3 italic">Penyederhanaan agar mudah diingat</span>
                </div>
              </div>

              {/* 3. Assembler */}
              <div className="flex flex-col items-center">
                <motion.span layoutId="ad-assembler" className="mb-2 px-3 py-1 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/30 text-[10px] md:text-xs shadow-sm z-10 text-center">
                  diterjemahkan kembali oleh program Assembler
                </motion.span>
                <div className="w-full bg-[#1c110a] p-4 rounded-xl border border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.15)] flex flex-col items-center justify-center relative h-32">
                   <Settings2 className="w-8 h-8 text-orange-400/20 absolute right-4 top-4" />
                   
                   <div className="flex items-center w-full justify-between px-4 mt-2">
                     <span className="font-mono text-xs text-blue-400 font-bold">MOV</span>
                     <div className="flex flex-col items-center">
                       <div className="bg-orange-500/20 px-3 py-2 rounded-lg border-2 border-orange-500/50 flex flex-col items-center shadow-lg relative z-10 overflow-hidden group">
                         <div className="absolute inset-0 bg-orange-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                         <Settings2 className="w-4 h-4 text-orange-400 mb-1 animate-spin" style={{ animationDuration: '3s' }} />
                         <span className="text-[10px] font-bold text-orange-400 tracking-wider">ASSEMBLER</span>
                       </div>
                     </div>
                     <span className="font-mono text-[10px] text-green-400">10110100</span>
                   </div>
                   <CornerDownRight className="w-16 h-4 text-border opacity-50 mt-1" />
                </div>
              </div>

              {/* 4. Machine Dependent */}
              <div className="flex flex-col items-center">
                <motion.span layoutId="ad-dependent" className="mb-2 px-3 py-1 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 font-bold border border-red-500/30 text-[10px] md:text-xs shadow-sm z-10 italic text-center">
                  Machine Dependent
                </motion.span>
                <div className="w-full bg-[#1a0f0f] p-4 rounded-xl border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.15)] flex flex-col items-center justify-center h-32 relative">
                   <Lock className="w-6 h-6 text-red-400/20 absolute right-4 top-4" />
                   
                   <div className="flex items-center gap-3">
                      <div className="bg-background/80 p-2 rounded-lg border border-border flex flex-col items-center shadow-sm">
                         <span className="font-mono text-[10px] text-blue-400 font-bold mb-1">MOV</span>
                         <span className="text-[9px] text-muted-foreground whitespace-nowrap">Instruksi x86</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-8 h-px bg-red-500/50" />
                        <X className="w-4 h-4 text-red-500" />
                        <div className="w-8 h-px bg-red-500/50" />
                      </div>
                      <div className="bg-background/80 p-2 rounded-lg border border-red-500/30 flex flex-col items-center shadow-sm relative overflow-hidden">
                         <div className="absolute inset-0 bg-red-500/5" />
                         <Cpu className="w-5 h-5 text-red-400 mb-1 z-10" />
                         <span className="text-[9px] text-red-400 font-bold z-10">CPU ARM</span>
                      </div>
                   </div>
                   <span className="text-[9px] text-red-400/80 mt-3 text-center leading-tight">Assembly x86 tidak bisa dijalankan<br/>langsung di CPU ARM.</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
