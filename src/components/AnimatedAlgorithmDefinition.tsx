"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick, Unlock } from 'lucide-react';

export default function AnimatedAlgorithmDefinition() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="bg-emerald-500/5 p-5 md:p-8 rounded-2xl border-l-4 border-emerald-500 mb-8 relative shadow-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ minHeight: isHovered ? 400 : 120 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
    >
      <div className="absolute top-3 right-4 text-emerald-500/60 text-xs flex items-center gap-1.5 font-medium animate-pulse z-20 cursor-default">
        <MousePointerClick className="w-4 h-4" /> Arahkan Kursor (Hover) di area ini
      </div>
      
      <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 relative z-20">
        Definisi Algoritma
      </div>

      <AnimatePresence mode="wait">
        {!isHovered ? (
          <motion.div 
            key="text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-foreground font-medium leading-loose text-lg md:text-xl relative z-10"
          >
            Secara sederhana, <strong className="text-emerald-500">Algoritma</strong> adalah{' '}
            <span className="inline-block px-3 py-1 mx-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/30 whitespace-nowrap">urutan langkah-langkah</span>
            {' '}
            <span className="inline-block px-3 py-1 mx-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/30 whitespace-nowrap">logis</span>
            {' '}dan{' '}
            <span className="inline-block px-3 py-1 mx-1 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/30 whitespace-nowrap">sistematis</span>
            {' '}untuk{' '}
            <span className="inline-block px-3 py-1 mx-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30 whitespace-nowrap">memecahkan suatu masalah</span>
            .
          </motion.div>
        ) : (
          <motion.div 
            key="animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-64 relative flex flex-col items-center justify-center mt-8"
          >
            <AssemblyToSolutionAnimation />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function AssemblyToSolutionAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // Animation Sequence:
    // 0: Scattered (Initial)
    // 1: Key Head (Pegangan Kunci) moves to center
    // 2: Key Shaft (Batang Kunci) attaches
    // 3: Key Teeth (Gigi Kunci) attaches
    // 4: Key moves into padlock (Insert)
    // 5: Key turns inside padlock
    // 6: Padlock opens, Aha! glow
    
    if (step === 0) timer = setTimeout(() => setStep(1), 800);
    else if (step === 1) timer = setTimeout(() => setStep(2), 600);
    else if (step === 2) timer = setTimeout(() => setStep(3), 600);
    else if (step === 3) timer = setTimeout(() => setStep(4), 800);
    else if (step === 4) timer = setTimeout(() => setStep(5), 600);
    else if (step === 5) timer = setTimeout(() => setStep(6), 400);
    else if (step === 6) timer = setTimeout(() => setStep(0), 4000); // Wait 4 seconds then reset to loop

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="relative w-full max-w-lg h-full flex items-center justify-center bg-dot-pattern rounded-xl border border-border/50">
      
      {/* THE KEY CONTAINER (Handles Insertion and Turning) */}
      <motion.div
        className="absolute z-20 flex items-center justify-center w-0 h-0"
        initial={{ x: -60, y: 0, rotate: 0 }}
        animate={
          step >= 5 ? { x: 90, y: 0, rotate: 90 } : // Turn
          step >= 4 ? { x: 90, y: 0, rotate: 0 } :  // Insert
          { x: -60, y: 0, rotate: 0 }               // Assembly position
        }
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        {/* 1. KEY HEAD (Pegangan Kunci - Warna Biru) */}
        <motion.div
          className="absolute border-[12px] border-blue-500 rounded-full"
          initial={{ x: -100, y: -80, rotate: -45, opacity: 0, width: 64, height: 64 }}
          animate={
            step >= 1 ? { x: -40, y: 0, rotate: 0, opacity: 1 } : 
            { x: -100, y: -80, rotate: -45, opacity: 1 }
          }
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
        />

        {/* 2. KEY SHAFT (Batang Kunci - Warna Ungu) */}
        <motion.div
          className="absolute h-6 bg-purple-500 rounded-r-md"
          initial={{ x: 180, y: 80, width: 60, rotate: 120, opacity: 0 }}
          animate={
            step >= 2 ? { x: 30, y: 0, width: 80, rotate: 0, opacity: 1 } :
            step === 1 ? { x: 180, y: 80, width: 60, rotate: 120, opacity: 1 } : 
            { x: 180, y: 80, width: 60, rotate: 120, opacity: 1 }
          }
          style={{ originX: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
        />

        {/* 3. KEY TEETH (Gigi Kunci - Warna Teal) */}
        <motion.div
          className="absolute flex gap-1"
          initial={{ x: 160, y: -60, rotate: -90, opacity: 0 }}
          animate={
             step >= 3 ? { x: 50, y: 10, rotate: 0, opacity: 1 } :
             { x: 160, y: -60, rotate: -90, opacity: 1 }
          }
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
        >
          <div className="w-4 h-6 bg-teal-500 rounded-b-sm"></div>
          <div className="w-4 h-4 bg-teal-500 rounded-b-sm"></div>
          <div className="w-4 h-8 bg-teal-500 rounded-b-sm"></div>
        </motion.div>
      </motion.div>


      {/* THE PADLOCK (Sang Masalah) */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-center">
        {/* Shackle (Gembok Atas) */}
        <motion.div
          className="w-16 h-20 border-8 border-slate-400 rounded-t-3xl border-b-0 relative z-0"
          initial={{ y: 0 }}
          animate={{ y: step >= 6 ? -25 : 0 }} // POP OPEN!
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
           {/* Shackle cut to make it look open */}
           <motion.div 
             className="absolute -right-2 bottom-0 w-4 h-8 bg-background"
             initial={{ opacity: 0 }}
             animate={{ opacity: step >= 6 ? 1 : 0 }}
           />
        </motion.div>
        
        {/* Lock Body (Badan Gembok) */}
        <motion.div 
          className={`w-24 h-20 rounded-xl flex items-center justify-center relative z-10 transition-colors duration-500
            ${step >= 6 ? 'bg-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.6)]' : 'bg-slate-600'}
          `}
        >
          {/* Keyhole */}
          <div className="w-4 h-8 bg-slate-900 rounded-full flex flex-col items-center">
             <div className="w-4 h-4 bg-slate-900 rounded-full absolute -top-1"></div>
          </div>
          
          {/* AHA Icon */}
          <AnimatePresence>
            {step >= 6 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center text-white"
              >
                <Unlock className="w-10 h-10" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* TEXT EXPLANATION OVERLAY */}
      <div className="absolute bottom-4 left-0 right-0 text-center font-bold text-muted-foreground text-sm z-30">
        {step === 0 && "Berbagai elemen yang berserakan (tidak beraturan)..."}
        {step === 1 && "Disusun langkah demi langkah..."}
        {step === 2 && "Dirangkai dengan logika yang tepat..."}
        {step === 3 && "Menjadi sistem yang utuh (Sistematis)..."}
        {step === 4 && "Diterapkan pada masalah (Mengeksekusi)..."}
        {step === 5 && "Memutar logika (Proses)..."}
        {step >= 6 && <span className="text-amber-500 text-lg drop-shadow-md">AHA! Memecahkan masalah! 🎉</span>}
      </div>

    </div>
  );
}
