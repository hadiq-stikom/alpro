"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Package, Cog, ArrowRight, StopCircle, PackageCheck, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function AnimatedAlgorithmCharacteristics() {
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0); // 0: idle, 1: input, 2: process, 3: output, 4: error
  const [hasStoppingRole, setHasStoppingRole] = useState(true);

  // Auto-run simulation when isRunning is true
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      if (step === 0) {
        setStep(1); // Start with input
      } else if (step === 1) {
        timer = setTimeout(() => setStep(2), 1500); // Wait for input to reach machine
      } else if (step === 2) {
        timer = setTimeout(() => {
          if (hasStoppingRole) {
            setStep(3); // Success output
          } else {
            setStep(4); // Error (infinite loop / no stopping role)
          }
        }, 3000); // Machine processing time
      } else if (step === 3 || step === 4) {
        timer = setTimeout(() => {
          setStep(0);
          setIsRunning(false);
        }, 3000); // Reset after 3 seconds
      }
    }
    return () => clearTimeout(timer);
  }, [isRunning, step, hasStoppingRole]);

  const runSimulation = (safe: boolean) => {
    if (isRunning) return;
    setHasStoppingRole(safe);
    setStep(0);
    setIsRunning(true);
  };

  return (
    <div className="border border-border/50 rounded-2xl overflow-hidden bg-background shadow-lg">
      <div className="p-4 md:p-6 bg-secondary/10 border-b border-border/50 text-center">
        <h3 className="text-2xl font-bold mb-2">Pabrik Logika: 5 Ciri Algoritma</h3>
        <p className="text-slate-700 dark:text-slate-300 text-sm max-w-2xl mx-auto font-medium">
          Sebuah algoritma yang baik ibarat mesin pabrik yang sempurna. Ia membutuhkan bahan baku (Input), langkah pengolahan yang jelas dan efektif (Proses), batasan waktu berhenti (Stopping Role), dan menghasilkan produk akhir (Output).
        </p>
      </div>

      <div className="p-4 md:p-6 relative flex flex-col items-center overflow-hidden bg-dot-pattern">
        
        {/* Characteristics Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-2 relative z-10 w-full max-w-3xl">
          <Badge active={step === 1} color="bg-blue-500" icon={<Package className="w-4 h-4"/>} label="1. Input" desc="Mempunyai Masukan" />
          <Badge active={step === 2} color="bg-yellow-500" icon={<Cog className="w-4 h-4"/>} label="2 & 3. Proses (Efektif & Jelas)" desc="Tidak Ambigu, Efisien" />
          <Badge active={step >= 3 && hasStoppingRole} color="bg-red-500" icon={<StopCircle className="w-4 h-4"/>} label="4. Stopping Role" desc="Kondisi Berhenti" />
          <Badge active={step === 3} color="bg-emerald-500" icon={<PackageCheck className="w-4 h-4"/>} label="5. Output" desc="Menghasilkan Keluaran" />
        </div>

        {/* Factory Conveyor Belt Simulation */}
        <div className="relative w-full max-w-3xl h-32 mt-0 flex items-center justify-between px-6">
          
          {/* Conveyor Belt Background */}
          <div className="absolute left-6 right-6 bottom-6 h-3 bg-secondary border-y-2 border-border/50 rounded-full flex items-center overflow-hidden">
             <motion.div 
               animate={step > 0 && step < 4 ? { x: [0, -100] } : {}}
               transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
               className="w-[200%] h-full flex"
             >
                {Array.from({length: 40}).map((_, i) => (
                  <div key={i} className="w-8 h-full border-r border-border/30 shrink-0"></div>
                ))}
             </motion.div>
          </div>

          {/* INPUT (Raw Material) */}
          <div className="relative z-10 w-20 h-full flex flex-col items-center justify-end pb-8">
            <AnimatePresence>
              {step === 1 && (
                <motion.div
                  initial={{ x: -100, opacity: 0, rotate: -20 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  exit={{ x: 150, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 1 }}
                  className="bg-blue-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xs shadow-lg border-2 border-blue-400 absolute bottom-10 z-20"
                >
                  DATA
                </motion.div>
              )}
            </AnimatePresence>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-2">Area Input</div>
          </div>

          {/* PROCESSOR (Machine) */}
          <div className="relative z-20 flex flex-col items-center justify-end">
            <motion.div 
              animate={
                step === 2 
                  ? { y: [-2, 2, -2], filter: 'brightness(1.2)' } 
                  : step === 4 
                    ? { x: [-5, 5, -5, 5, 0], filter: 'brightness(0.8) sepia(1) hue-rotate(-50deg) saturate(3)' }
                    : {}
              }
              transition={step === 4 ? { repeat: Infinity, duration: 0.1 } : { repeat: Infinity, duration: 0.2 }}
              className={`w-28 h-28 rounded-2xl flex flex-col items-center justify-center border-4 shadow-2xl relative transition-colors duration-500 z-20
                ${step === 4 ? 'bg-red-500 border-red-700' : 'bg-secondary/90 border-primary/50 backdrop-blur-md'}
              `}
            >
              <Cog className={`w-10 h-10 ${step === 4 ? 'text-white' : 'text-primary'} ${step === 2 || step === 4 ? 'animate-spin' : ''}`} style={{ animationDuration: step === 4 ? '0.2s' : '2s' }} />
              <div className={`font-bold mt-1 text-xs ${step === 4 ? 'text-white' : 'text-foreground'}`}>CPU / Mesin</div>
              
              {/* Error overlay */}
              <AnimatePresence>
                {step === 4 && (
                   <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-10 bg-red-500 text-white px-3 py-1 text-xs rounded-lg font-bold flex items-center gap-1 shadow-lg whitespace-nowrap"
                   >
                     <AlertTriangle className="w-4 h-4" />
                     ERROR: LOOP!
                   </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* OUTPUT (Finished Good) */}
          <div className="relative z-10 w-20 h-full flex flex-col items-center justify-end pb-8">
            <AnimatePresence>
              {step === 3 && (
                <motion.div
                  initial={{ x: -150, opacity: 0, scale: 0.5 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="bg-emerald-500 text-white w-12 h-12 rounded-full flex flex-col items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)] border-2 border-emerald-400 absolute bottom-10 z-20"
                >
                  <PackageCheck className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-2">Area Output</div>
          </div>
          
        </div>

        {/* Controls */}
        <div className="mt-2 flex flex-col items-center gap-2 z-20">
          <p className="text-xs text-slate-700 dark:text-slate-300 font-bold mb-1">Simulasikan Mesin Algoritma:</p>
          <div className="flex gap-2 flex-wrap justify-center">
            <button 
              disabled={isRunning}
              onClick={() => runSimulation(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 text-sm rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShieldCheck className="w-4 h-4" />
              Jalankan Algoritma Sehat (Berhasil)
            </button>
            <button 
              disabled={isRunning}
              onClick={() => runSimulation(false)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 text-sm rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <AlertTriangle className="w-4 h-4" />
              Hilangkan "Stopping Role" (Error)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ active, color, icon, label, desc }: { active: boolean, color: string, icon: React.ReactNode, label: string, desc: string }) {
  return (
    <div className={`flex flex-col items-center p-2 rounded-xl border transition-all duration-300 w-full text-center
      ${active ? `${color} text-white shadow-lg scale-105 z-10 border-transparent` : 'bg-background border-border text-slate-700 dark:text-slate-300 scale-100 font-medium'}
    `}>
      <div className={`p-1.5 rounded-full mb-1 ${active ? 'bg-white/20' : 'bg-secondary'}`}>
        {icon}
      </div>
      <div className="font-bold text-[11px] leading-tight">{label}</div>
      <div className={`text-[9px] mt-0.5 leading-tight ${active ? 'text-white/90' : 'text-slate-600 dark:text-slate-400 font-medium'}`}>{desc}</div>
    </div>
  );
}
