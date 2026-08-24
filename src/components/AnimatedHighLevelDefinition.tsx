"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick, Languages, HeartHandshake, MonitorSmartphone, Cpu, Check, FileCode2, Binary, ChevronRight, Wand2 } from 'lucide-react';

export default function AnimatedHighLevelDefinition() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li 
      className="bg-pink-500/5 p-5 rounded-xl border-l-4 border-pink-500 mb-4 relative cursor-pointer shadow-sm overflow-hidden list-none ml-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ minHeight: isHovered ? 520 : 120 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
    >
      <div className="absolute top-3 right-4 text-pink-500/60 text-xs flex items-center gap-1.5 font-medium animate-pulse z-20">
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
            <strong className="text-pink-600 dark:text-pink-400">Tingkat Tinggi (High Level):</strong> Bahasa yang{' '}
            <motion.span layoutId="hl-manusia" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform">sangat dekat dengan bahasa manusia</motion.span>
            {' '} (contoh: Python, JavaScript, C++).{' '}
            <motion.span layoutId="hl-mudah" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-bold border border-yellow-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform">Sangat mudah dipelajari</motion.span>
            {' '}dan{' '}
            <motion.span layoutId="hl-independent" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 font-bold border border-green-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform italic">Machine Independent</motion.span>
            {' '} (bisa berjalan di berbagai mesin berbeda). Hebatnya,{' '}
            <motion.span layoutId="hl-bungkus" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/30 cursor-help hover:scale-105 transition-transform leading-relaxed">
              satu baris kode di bahasa ini bisa membungkus puluhan hingga ratusan instruksi bahasa mesin
            </motion.span>!
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
            <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* 1. Dekat Manusia & Mudah */}
                <div className="flex flex-col items-center">
                  <div className="flex gap-2 mb-2">
                     <motion.span layoutId="hl-manusia" className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/30 text-[10px] md:text-xs shadow-sm z-10">
                       dekat bahasa manusia
                     </motion.span>
                     <motion.span layoutId="hl-mudah" className="px-3 py-1 rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-bold border border-yellow-500/30 text-[10px] md:text-xs shadow-sm z-10">
                       mudah dipelajari
                     </motion.span>
                  </div>
                  <div className="w-full bg-[#0d1526] p-4 rounded-xl border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.15)] flex flex-col items-center justify-center relative h-40">
                     <Languages className="w-12 h-12 text-blue-400/20 absolute right-4 top-4" />
                     <HeartHandshake className="w-12 h-12 text-yellow-400/20 absolute left-4 bottom-4" />
                     
                     <div className="bg-[#1e1e1e] p-3 rounded-lg border border-blue-500/30 w-full max-w-xs shadow-md z-10 font-mono text-xs md:text-sm">
                       <div className="text-muted-foreground mb-1 flex items-center gap-2 text-[10px]">
                         <span>// Persis seperti bahasa Inggris</span>
                       </div>
                       <span className="text-pink-400">if</span> (<span className="text-blue-300">hungry</span>) {'{'}
                       <br />
                       &nbsp;&nbsp;<span className="text-yellow-300">eat</span>(<span className="text-green-300">"pizza"</span>);
                       <br />
                       {'}'}
                     </div>
                  </div>
                </div>

                {/* 2. Machine Independent */}
                <div className="flex flex-col items-center">
                  <motion.span layoutId="hl-independent" className="mb-2 px-3 py-1 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 font-bold border border-green-500/30 text-[10px] md:text-xs shadow-sm z-10 italic text-center">
                    Machine Independent (Bebas Lintas Platform)
                  </motion.span>
                  <div className="w-full bg-[#0a1a0f] p-4 rounded-xl border border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.15)] flex flex-col items-center justify-center h-40 relative">
                     <MonitorSmartphone className="w-8 h-8 text-green-400/20 absolute right-4 top-4" />
                     
                     <div className="flex items-center gap-2 w-full justify-center mt-2">
                        <div className="bg-[#1e1e1e] p-2 rounded-lg border border-blue-500/30 flex flex-col items-center shadow-sm relative z-10">
                           <FileCode2 className="w-6 h-6 text-blue-400 mb-1" />
                           <span className="text-[10px] font-bold text-blue-300">Script.js</span>
                        </div>
                        
                        <div className="flex flex-col justify-center items-center h-full px-2">
                          <div className="w-px h-16 bg-green-500/50 absolute z-0" />
                          <div className="w-12 h-px bg-green-500/50 -translate-y-8" />
                          <div className="w-12 h-px bg-green-500/50" />
                          <div className="w-12 h-px bg-green-500/50 translate-y-8" />
                        </div>
                        
                        <div className="flex flex-col gap-2 z-10">
                           {/* Intel */}
                           <div className="bg-background/80 p-1.5 rounded-lg border border-green-500/30 flex items-center gap-2 shadow-sm relative pr-6">
                              <Cpu className="w-4 h-4 text-green-400" />
                              <span className="text-[9px] font-bold text-green-400">PC (Intel)</span>
                              <Check className="w-3 h-3 text-white bg-green-500 rounded-full absolute -right-1.5 -bottom-1.5 p-0.5" />
                           </div>
                           {/* ARM Mac */}
                           <div className="bg-background/80 p-1.5 rounded-lg border border-green-500/30 flex items-center gap-2 shadow-sm relative pr-6">
                              <Cpu className="w-4 h-4 text-green-400" />
                              <span className="text-[9px] font-bold text-green-400">Mac (ARM)</span>
                              <Check className="w-3 h-3 text-white bg-green-500 rounded-full absolute -right-1.5 -bottom-1.5 p-0.5" />
                           </div>
                           {/* Smartphone */}
                           <div className="bg-background/80 p-1.5 rounded-lg border border-green-500/30 flex items-center gap-2 shadow-sm relative pr-6">
                              <Cpu className="w-4 h-4 text-green-400" />
                              <span className="text-[9px] font-bold text-green-400">HP (Snapdragon)</span>
                              <Check className="w-3 h-3 text-white bg-green-500 rounded-full absolute -right-1.5 -bottom-1.5 p-0.5" />
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* 3. Satu Baris = Ratusan Biner */}
              <div className="flex flex-col items-center w-full">
                <motion.span layoutId="hl-bungkus" className="mb-2 px-3 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/30 text-[10px] md:text-xs shadow-sm z-10 text-center">
                  1 Baris Kode = Ratusan Instruksi Mesin
                </motion.span>
                <div className="w-full bg-[#110c17] p-4 rounded-xl border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.15)] flex flex-col md:flex-row items-center justify-between relative min-h-32 overflow-hidden gap-4">
                   <Wand2 className="w-16 h-16 text-purple-500/10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                   
                   {/* High Level Input */}
                   <div className="bg-[#1e1e1e] p-3 rounded-lg border-2 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)] z-10 font-mono text-sm min-w-[200px] text-center">
                     <span className="text-pink-400">print</span>(<span className="text-yellow-300">"Hello"</span>)
                   </div>

                   {/* Magic Arrow */}
                   <div className="flex flex-col items-center z-10 shrink-0">
                      <div className="bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/50 flex items-center gap-2 shadow-lg mb-1">
                        <Wand2 className="w-4 h-4 text-purple-400" />
                        <span className="text-[10px] font-bold text-purple-300">DITERJEMAHKAN COMPILER</span>
                      </div>
                      <ChevronRight className="w-6 h-6 text-purple-400 animate-pulse hidden md:block" />
                   </div>

                   {/* Machine Language Output Matrix */}
                   <div className="bg-[#05100a] p-3 rounded-lg border-2 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] z-10 w-full md:flex-1 relative overflow-hidden h-24 flex items-center justify-center">
                      <div className="absolute inset-0 opacity-30 flex flex-wrap gap-1 p-2 overflow-hidden text-[8px] font-mono text-green-500 leading-none pointer-events-none">
                         {Array.from({length: 150}).map((_, i) => (
                           <span key={i}>{Math.random() > 0.5 ? '10110' : '01101'}</span>
                         ))}
                      </div>
                      <div className="bg-background/90 px-3 py-2 rounded-lg border border-green-500/30 flex items-center gap-2 backdrop-blur-sm z-20">
                        <Binary className="w-5 h-5 text-green-400" />
                        <span className="font-bold text-green-400 text-sm tracking-wider">100+ INSTRUKSI BINER!</span>
                      </div>
                   </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
