"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick, MessageCircle, FileCode2, Binary, MoveRight, BookType } from 'lucide-react';

export default function AnimatedLanguageDefinition() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="bg-blue-500/5 p-5 md:p-6 rounded-xl border-l-4 border-blue-500 mb-8 relative cursor-pointer shadow-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ minHeight: isHovered ? 280 : 120 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
    >
      <div className="absolute top-3 right-4 text-blue-500/60 text-xs flex items-center gap-1.5 font-medium animate-pulse z-20">
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
            <strong className="text-blue-600 dark:text-blue-400">Bahasa Pemrograman</strong> adalah{' '}
            <motion.span layoutId="ld-kosakata" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform">kosakata dan aturan tata bahasa (sintaks)</motion.span>
            {' '}yang diciptakan sebagai{' '}
            <motion.span layoutId="ld-jembatan" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform">jembatan komunikasi</motion.span>
            {' '}antara{' '}
            <motion.span layoutId="ld-manusia" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform">bahasa manusia</motion.span>
            {' '}dengan{' '}
            <motion.span layoutId="ld-mesin" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 font-bold border border-green-500/30 whitespace-nowrap cursor-help hover:scale-110 transition-transform">bahasa mesin</motion.span>
            .
          </motion.div>
        ) : (
          <motion.div 
            key="diagram"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-full h-full relative flex flex-col items-center justify-center pt-8 pb-4 z-10 transform scale-90 md:scale-100 origin-top"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full max-w-4xl mx-auto">
              
              {/* 1. Bahasa Manusia */}
              <div className="flex flex-col items-center flex-1 w-full relative z-10">
                <motion.span layoutId="ld-manusia" className="mb-3 px-3 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/30 text-[10px] md:text-xs shadow-sm text-center">
                  bahasa manusia
                </motion.span>
                <div className="w-full bg-[#1c1126] p-4 rounded-xl border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.15)] flex flex-col items-center justify-center h-28 relative">
                   <MessageCircle className="w-8 h-8 text-purple-400/20 absolute right-4 bottom-4" />
                   <span className="text-sm font-medium text-purple-200 italic text-center">"Tolong cetak kata<br/>Halo di layar!"</span>
                </div>
              </div>

              {/* Arrow 1 */}
              <MoveRight className="w-8 h-8 text-muted-foreground hidden md:block opacity-50 shrink-0 animate-pulse" />

              {/* 2. Jembatan (Sintaks Bahasa Pemrograman) */}
              <div className="flex flex-col items-center flex-1 w-full relative z-20 md:-mt-8">
                <div className="flex flex-col items-center mb-3 gap-1">
                  <motion.span layoutId="ld-jembatan" className="px-3 py-1 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/30 text-[10px] md:text-xs shadow-sm text-center uppercase tracking-wider">
                    Jembatan Komunikasi
                  </motion.span>
                  <motion.span layoutId="ld-kosakata" className="px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/30 text-[9px] shadow-sm text-center">
                    kosakata & aturan sintaks
                  </motion.span>
                </div>
                
                <div className="w-full md:w-[120%] bg-[#0d1b2a] p-5 rounded-2xl border-2 border-blue-500/50 shadow-[0_0_25px_rgba(59,130,246,0.3)] flex flex-col items-center justify-center h-32 relative z-20">
                   <div className="absolute inset-0 bg-blue-500/5 overflow-hidden rounded-2xl pointer-events-none">
                     <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDEiLz4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiMzYjgyZjYiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-50" />
                   </div>
                   <BookType className="w-6 h-6 text-blue-400 mb-2 z-10" />
                   <div className="bg-[#1e1e1e] px-4 py-2 rounded-lg border border-blue-500/30 w-full text-center shadow-inner z-10">
                     <span className="font-mono text-sm">
                       <span className="text-pink-400 font-bold">print</span><span className="text-blue-300">(</span><span className="text-yellow-300">"Halo!"</span><span className="text-blue-300">)</span>
                     </span>
                   </div>
                </div>
              </div>

              {/* Arrow 2 */}
              <MoveRight className="w-8 h-8 text-muted-foreground hidden md:block opacity-50 shrink-0 animate-pulse" />

              {/* 3. Bahasa Mesin */}
              <div className="flex flex-col items-center flex-1 w-full relative z-10">
                <motion.span layoutId="ld-mesin" className="mb-3 px-3 py-1 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 font-bold border border-green-500/30 text-[10px] md:text-xs shadow-sm text-center">
                  bahasa mesin
                </motion.span>
                <div className="w-full bg-[#0a1910] p-4 rounded-xl border border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.15)] flex flex-col items-center justify-center h-28 relative">
                   <Binary className="w-8 h-8 text-green-400/20 absolute left-4 bottom-4" />
                   <div className="font-mono text-[10px] text-green-400 tracking-widest text-center leading-relaxed">
                     01110000 01110010<br/>01101001 01101110
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
