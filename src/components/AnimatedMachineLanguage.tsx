"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick, Binary, Cpu, Lock, Zap, Gauge, BrainCircuit, X, Check } from 'lucide-react';

export default function AnimatedMachineLanguage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="bg-green-500/5 p-5 rounded-xl border-l-4 border-green-500 mb-8 relative cursor-pointer shadow-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ minHeight: isHovered ? 480 : 120 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
    >
      <div className="absolute top-3 right-4 text-green-500/60 text-xs flex items-center gap-1.5 font-medium animate-pulse z-20">
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
            Komputer (CPU) di level terdalam hanya mengerti{' '}
            <motion.span layoutId="ml-bahasa" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 font-bold border border-green-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform">Bahasa Mesin (Tingkat Rendah)</motion.span>
            {' '}yang murni berisi{' '}
            <motion.span layoutId="ml-biner" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform">bilangan biner</motion.span>
            {' '}dan sangat spesifik untuk satu jenis mesin ({' '}
            <motion.span layoutId="ml-dependent" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-red-500/10 text-red-600 dark:text-red-400 font-bold border border-red-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform italic">Machine Dependent</motion.span>
            {' '}). Karena{' '}
            <motion.span layoutId="ml-cepat" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-bold border border-yellow-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform">eksekusinya sangat cepat</motion.span>
            {' '}namun{' '}
            <motion.span layoutId="ml-sukar" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform">sukar dipelajari manusia</motion.span>
            , diciptakanlah level bahasa di atasnya:
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
              
              {/* 1. Bahasa Mesin & Biner */}
              <div className="flex flex-col items-center">
                <div className="flex gap-2 mb-2">
                   <motion.span layoutId="ml-bahasa" className="px-3 py-1 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 font-bold border border-green-500/30 text-[10px] md:text-xs shadow-sm z-10">
                     Bahasa Mesin
                   </motion.span>
                   <motion.span layoutId="ml-biner" className="px-3 py-1 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/30 text-[10px] md:text-xs shadow-sm z-10">
                     bilangan biner
                   </motion.span>
                </div>
                <div className="w-full bg-[#0a1910] p-4 rounded-xl border border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.15)] flex flex-col items-center justify-center relative overflow-hidden h-32">
                   <div className="absolute inset-0 opacity-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />
                   <Binary className="w-8 h-8 text-green-400/30 absolute right-4 top-4 z-0" />
                   <div className="font-mono text-green-400 text-sm tracking-widest break-all w-full text-center">
                     <motion.div animate={{ y: [0, -100] }} transition={{ repeat: Infinity, duration: 5, ease: "linear" }}>
                       10110010 01101111<br/>
                       11001010 10100101<br/>
                       01010101 11110000<br/>
                       10110010 01101111<br/>
                       11001010 10100101<br/>
                       01010101 11110000
                     </motion.div>
                   </div>
                </div>
              </div>

              {/* 2. Machine Dependent */}
              <div className="flex flex-col items-center">
                <motion.span layoutId="ml-dependent" className="mb-2 px-3 py-1 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 font-bold border border-red-500/30 text-[10px] md:text-xs shadow-sm z-10 italic">
                  Machine Dependent
                </motion.span>
                <div className="w-full bg-[#1a0f0f] p-4 rounded-xl border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.15)] flex flex-col items-center justify-center h-32 relative">
                   <Lock className="w-6 h-6 text-red-400/20 absolute right-4 top-4" />
                   <div className="flex items-center justify-center gap-6 w-full">
                     <div className="flex flex-col items-center gap-2">
                       <div className="bg-background border-2 border-green-500/50 p-2 rounded-lg relative">
                         <Cpu className="w-6 h-6 text-green-500" />
                         <Check className="w-4 h-4 text-green-500 absolute -bottom-2 -right-2 bg-background rounded-full" />
                       </div>
                       <span className="text-[10px] text-green-500 font-bold">CPU A (Intel)</span>
                     </div>
                     <div className="flex flex-col items-center font-mono text-xs text-muted-foreground">
                        <span>101100</span>
                        <div className="h-px w-12 bg-border my-1" />
                        <span>Hanya Cocok</span>
                     </div>
                     <div className="flex flex-col items-center gap-2 opacity-50">
                       <div className="bg-background border-2 border-red-500/50 p-2 rounded-lg relative">
                         <Cpu className="w-6 h-6 text-red-500" />
                         <X className="w-4 h-4 text-red-500 absolute -bottom-2 -right-2 bg-background rounded-full" />
                       </div>
                       <span className="text-[10px] text-red-500 font-bold">CPU B (ARM)</span>
                     </div>
                   </div>
                </div>
              </div>

              {/* 3. Eksekusi Sangat Cepat */}
              <div className="flex flex-col items-center">
                <motion.span layoutId="ml-cepat" className="mb-2 px-3 py-1 rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-bold border border-yellow-500/30 text-[10px] md:text-xs shadow-sm z-10">
                  eksekusinya sangat cepat
                </motion.span>
                <div className="w-full bg-[#1a170a] p-4 rounded-xl border border-yellow-500/40 shadow-[0_0_15px_rgba(234,179,8,0.15)] flex items-center justify-center h-32 gap-6 relative">
                   <Zap className="w-12 h-12 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]" />
                   <div className="flex flex-col">
                     <div className="flex items-center gap-2 text-yellow-400 font-mono text-xl font-bold">
                       <Gauge className="w-5 h-5" /> 0.0001 ms
                     </div>
                     <span className="text-[10px] text-yellow-500/70 uppercase tracking-wider mt-1">Langsung dieksekusi Hardware tanpa translasi</span>
                   </div>
                </div>
              </div>

              {/* 4. Sukar Dipelajari Manusia */}
              <div className="flex flex-col items-center">
                <motion.span layoutId="ml-sukar" className="mb-2 px-3 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/30 text-[10px] md:text-xs shadow-sm z-10">
                  sukar dipelajari manusia
                </motion.span>
                <div className="w-full bg-[#160f1c] p-4 rounded-xl border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.15)] flex items-center justify-center h-32 gap-6 relative overflow-hidden">
                   <div className="absolute -right-4 -bottom-4 opacity-10">
                     <BrainCircuit className="w-32 h-32 text-purple-400" />
                   </div>
                   
                   <div className="flex flex-col items-center">
                     <div className="bg-background border border-purple-500/30 p-2 rounded-full mb-2">
                       <BrainCircuit className="w-6 h-6 text-purple-400" />
                     </div>
                     <span className="text-xs text-purple-300 font-medium">Bikin Pusing! 🤯</span>
                   </div>
                   
                   <div className="bg-background/50 border border-border p-3 rounded-lg flex flex-col items-center">
                     <span className="text-[10px] text-muted-foreground mb-1">Cara nulis "Hello" di Biner:</span>
                     <span className="font-mono text-[10px] text-purple-400">01001000 01100101<br/>01101100 01101100 01101111</span>
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
