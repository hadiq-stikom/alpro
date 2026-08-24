"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick, FileCode2, Binary, Zap, Terminal, ArrowDown } from 'lucide-react';

export default function AnimatedProgramDefinition() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="bg-purple-500/5 p-5 rounded-xl border-l-4 border-purple-500 mb-8 relative cursor-pointer shadow-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ minHeight: isHovered ? 550 : 120 }}
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
            Secara definisi, <strong className="text-purple-600 dark:text-purple-400">Program Komputer</strong> adalah{' '}
            <motion.span layoutId="p-instruksi" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform">sekumpulan instruksi</motion.span>
            {' '}yang digunakan untuk memerintahkan komputer agar{' '}
            <motion.span layoutId="p-pekerjaan" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform">melakukan pekerjaan tertentu</motion.span>
            . Instruksi-instruksi ini pada dasarnya berbentuk{' '}
            <motion.span layoutId="p-biner" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 font-bold border border-green-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform">kode biner (0 dan 1)</motion.span>
            {' '}yang merepresentasikan{' '}
            <motion.span layoutId="p-saklar" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform">saklar tegangan listrik</motion.span>
            .
          </motion.div>
        ) : (
          <motion.div 
            key="diagram"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-full h-full relative flex flex-col items-center justify-start pt-8 pb-4 z-10 transform scale-90 origin-top"
          >
            <div className="flex flex-col items-center gap-2 w-full max-w-md">
              
              {/* 1. Instruksi (Code) */}
              <div className="flex flex-col items-center w-full">
                <motion.span layoutId="p-instruksi" className="px-4 py-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/30 text-xs md:text-sm shadow-sm z-10 mb-2 relative">
                  sekumpulan instruksi
                </motion.span>
                <div className="w-full bg-[#1e1e1e] p-3 rounded-lg border-2 border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.15)] flex items-center gap-3">
                   <FileCode2 className="w-6 h-6 text-purple-400 shrink-0" />
                   <div className="font-mono text-sm text-purple-300">
                     <span className="text-pink-400">print</span>(<span className="text-yellow-300">"Tugas Selesai!"</span>)
                   </div>
                </div>
              </div>

              {/* Arrow Down */}
              <ArrowDown className="w-5 h-5 text-border animate-bounce my-1" />

              {/* 2. Biner (0 & 1) */}
              <div className="flex flex-col items-center w-full">
                <motion.span layoutId="p-biner" className="px-4 py-1.5 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 font-bold border border-green-500/30 text-xs md:text-sm shadow-sm z-10 mb-2 relative">
                  kode biner (0 dan 1)
                </motion.span>
                <div className="w-full bg-[#1e1e1e] p-3 rounded-lg border-2 border-green-500/40 shadow-[0_0_20px_rgba(34,197,94,0.15)] flex items-center gap-3">
                   <Binary className="w-6 h-6 text-green-400 shrink-0" />
                   <div className="font-mono text-sm text-green-400 tracking-widest overflow-hidden">
                     01110000 01110010 01101001 01101110
                   </div>
                </div>
              </div>

              {/* Arrow Down */}
              <ArrowDown className="w-5 h-5 text-border animate-bounce my-1" />

              {/* 3. Saklar Tegangan Listrik (Hardware) */}
              <div className="flex flex-col items-center w-full">
                <motion.span layoutId="p-saklar" className="px-4 py-1.5 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/30 text-xs md:text-sm shadow-sm z-10 mb-2 relative">
                  saklar tegangan listrik
                </motion.span>
                <div className="w-full bg-[#1e1e1e] p-3 rounded-lg border-2 border-orange-500/40 shadow-[0_0_20px_rgba(249,115,22,0.15)] flex items-center gap-3">
                   <Zap className="w-6 h-6 text-orange-400 shrink-0" />
                   <div className="flex flex-grow justify-between items-center px-2">
                     {/* Switch Visualizations (1 = ON/Glowing, 0 = OFF/Dim) */}
                     {[0, 1, 1, 1, 0, 0, 0, 0].map((state, i) => (
                       <div key={i} className="flex flex-col items-center gap-1">
                         <div className={`w-3 h-6 rounded-sm border ${state === 1 ? 'bg-orange-500 border-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.8)]' : 'bg-background border-muted'}`} />
                         <span className={`text-[10px] font-mono font-bold ${state === 1 ? 'text-orange-400' : 'text-muted-foreground'}`}>{state === 1 ? 'ON' : 'OFF'}</span>
                       </div>
                     ))}
                   </div>
                </div>
              </div>

              {/* Arrow Down */}
              <ArrowDown className="w-5 h-5 text-border animate-bounce my-1" />

              {/* 4. Melakukan Pekerjaan Tertentu (Output) */}
              <div className="flex flex-col items-center w-full">
                <motion.span layoutId="p-pekerjaan" className="px-4 py-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/30 text-xs md:text-sm shadow-sm z-10 mb-2 relative">
                  melakukan pekerjaan tertentu
                </motion.span>
                <div className="w-full bg-[#1e1e1e] p-4 rounded-lg border-2 border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)] flex items-center gap-3 relative overflow-hidden">
                   <Terminal className="w-6 h-6 text-blue-400 shrink-0" />
                   <div className="font-mono text-base text-blue-300 font-bold">
                     &gt; Tugas Selesai!
                     <motion.span 
                       animate={{ opacity: [1, 0, 1] }} 
                       transition={{ repeat: Infinity, duration: 0.8 }} 
                       className="inline-block w-2.5 h-5 bg-blue-400 ml-1 align-middle" 
                     />
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
