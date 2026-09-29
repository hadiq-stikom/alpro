"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Package, Cog, ArrowRight, StopCircle, PackageCheck, AlertTriangle, ShieldCheck, Zap, RotateCcw, Sparkles, Info } from 'lucide-react';

interface CharacteristicItem {
  id: number;
  number: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  activeBg: string;
  borderColor: string;
  badgeColor: string;
  isActive: boolean;
  explanation: React.ReactNode;
  highlight: string;
}

export default function AnimatedAlgorithmCharacteristics() {
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0); // 0: idle, 1: input, 2: process, 3: output, 4: error
  const [hasStoppingRole, setHasStoppingRole] = useState(true);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (id: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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

  const characteristics: CharacteristicItem[] = [
    {
      id: 1,
      number: "1",
      name: "Input",
      subtitle: "Mempunyai Masukan",
      icon: <Package className="w-5 h-5" />,
      color: "text-blue-500",
      activeBg: "bg-blue-600 text-white border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.6)]",
      borderColor: "border-blue-500/80 shadow-[0_0_25px_rgba(59,130,246,0.35)]",
      badgeColor: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30 dark:border-blue-400/40",
      isActive: step === 1,
      explanation: (
        <span>
          Algoritma menerima <strong className="text-blue-700 dark:text-blue-300 font-bold">nol atau lebih masukan</strong> (<em>raw data</em>) dari luar sistem (keyboard, sensor, file) yang disimpan ke <strong className="text-slate-950 dark:text-white font-black underline decoration-blue-500/60 decoration-2">RAM</strong> untuk diproses.
        </span>
      ),
      highlight: "Variabel Bebas (Keyboard → RAM)"
    },
    {
      id: 2,
      number: "2",
      name: "Definiteness",
      subtitle: "Pasti & Tak Ambigu",
      icon: <Cog className="w-5 h-5" />,
      color: "text-amber-500",
      activeBg: "bg-amber-600 text-white border-amber-400 shadow-[0_0_20px_rgba(217,119,6,0.6)]",
      borderColor: "border-amber-500/80 shadow-[0_0_25px_rgba(245,158,11,0.35)]",
      badgeColor: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30 dark:border-amber-400/40",
      isActive: step === 2,
      explanation: (
        <span>
          Setiap langkah instruksi wajib <strong className="text-amber-700 dark:text-amber-300 font-bold">jelas, pasti, dan bermakna tunggal</strong>. Dilarang multitafsir agar <strong className="text-slate-950 dark:text-white font-black underline decoration-amber-500/60 decoration-2">tidak membingungkan CPU</strong> maupun programmer.
        </span>
      ),
      highlight: "Instruksi Pasti & Makna Tunggal"
    },
    {
      id: 3,
      number: "3",
      name: "Effectiveness",
      subtitle: "Efisien & Terarah",
      icon: <Zap className="w-5 h-5" />,
      color: "text-purple-500",
      activeBg: "bg-purple-600 text-white border-purple-400 shadow-[0_0_20px_rgba(147,51,234,0.6)]",
      borderColor: "border-purple-500/80 shadow-[0_0_25px_rgba(168,85,247,0.35)]",
      badgeColor: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30 dark:border-purple-400/40",
      isActive: step === 2,
      explanation: (
        <span>
          Setiap langkah operasi harus <strong className="text-purple-700 dark:text-purple-300 font-bold">cukup sederhana dan realistis</strong> untuk diselesaikan mesin dalam <strong className="text-slate-950 dark:text-white font-black underline decoration-purple-500/60 decoration-2">rentang waktu yang wajar</strong>.
        </span>
      ),
      highlight: "Operasi Wajar & Efisien"
    },
    {
      id: 4,
      number: "4",
      name: "Finiteness",
      subtitle: "Keterbatasan (Berhenti)",
      icon: <StopCircle className="w-5 h-5" />,
      color: "text-red-500",
      activeBg: "bg-red-600 text-white border-red-400 shadow-[0_0_20px_rgba(220,38,38,0.6)]",
      borderColor: "border-red-500/80 shadow-[0_0_25px_rgba(239,68,68,0.35)]",
      badgeColor: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30 dark:border-rose-400/40",
      isActive: step >= 3 && hasStoppingRole,
      explanation: (
        <span>
          Algoritma <strong className="text-rose-700 dark:text-rose-300 font-bold">harus memiliki titik akhir</strong> dan berhenti setelah sejumlah langkah terbatas. Wajib bebas dari <strong className="text-slate-950 dark:text-white font-black underline decoration-rose-500/60 decoration-2">Infinite Loop</strong> (macet).
        </span>
      ),
      highlight: "Stopping Role (Bebas Macet)"
    },
    {
      id: 5,
      number: "5",
      name: "Output",
      subtitle: "Menghasilkan Keluaran",
      icon: <PackageCheck className="w-5 h-5" />,
      color: "text-emerald-500",
      activeBg: "bg-emerald-600 text-white border-emerald-400 shadow-[0_0_20px_rgba(5,150,105,0.6)]",
      borderColor: "border-emerald-500/80 shadow-[0_0_25px_rgba(16,185,129,0.35)]",
      badgeColor: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30 dark:border-emerald-400/40",
      isActive: step === 3,
      explanation: (
        <span>
          Algoritma wajib menghasilkan <strong className="text-emerald-700 dark:text-emerald-300 font-bold">minimal satu nilai keluaran</strong> sebagai solusi permasalahan yang diserahkan ke <strong className="text-slate-950 dark:text-white font-black underline decoration-emerald-500/60 decoration-2">layar atau media simpan</strong>.
        </span>
      ),
      highlight: "Variabel Terikat (Solusi Akhir)"
    }
  ];

  return (
    <div className="border border-border/50 rounded-2xl overflow-visible bg-background shadow-lg">
      <div className="p-4 md:p-6 bg-secondary/10 border-b border-border/50 text-center rounded-t-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
          <span>Standar Donald E. Knuth (1968)</span>
        </div>
        <h3 className="text-2xl font-bold mb-2">Pabrik Logika: 5 Ciri Mutlak Algoritma</h3>
        <p className="text-slate-700 dark:text-slate-300 text-sm max-w-2xl mx-auto font-medium leading-relaxed">
          Menurut ilmuwan komputer legendaris <strong className="text-primary font-bold">Donald E. Knuth</strong>, sebuah algoritma yang sahih wajib memenuhi 5 ciri mutlak: <strong className="text-blue-600 dark:text-blue-400">Input</strong> (masukan), <strong className="text-amber-600 dark:text-amber-400">Definiteness</strong> (kepastian), <strong className="text-purple-600 dark:text-purple-400">Effectiveness</strong> (efektivitas), <strong className="text-red-600 dark:text-red-400">Finiteness</strong> (keterbatasan/titik henti), dan <strong className="text-emerald-600 dark:text-emerald-400">Output</strong> (keluaran).
        </p>
      </div>

      <div className="p-4 md:p-6 pt-6 pb-6 relative flex flex-col items-center overflow-visible bg-dot-pattern">
        
        {/* Panduan Interaktif Pengguna */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs shadow-sm border border-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Hover: Zoom 1.2x • Klik: Balik Kartu Penjelasan</span>
          </span>
        </div>

        {/* Characteristics Indicators - 5 Ciri Knuth Eksplisit (2D Flip & Zoom 1.2x) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-4 relative z-10 w-full max-w-5xl py-2">
          {characteristics.map(card => (
            <FlipCharacteristicCard
              key={card.id}
              card={card}
              isFlipped={!!flippedCards[card.id]}
              onToggle={() => toggleFlip(card.id)}
            />
          ))}
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
              Jalankan Algoritma Sehat (Memenuhi Finiteness)
            </button>
            <button 
              disabled={isRunning}
              onClick={() => runSimulation(false)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 text-sm rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <AlertTriangle className="w-4 h-4" />
              Hilangkan Finiteness (Uji Infinite Loop)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlipCharacteristicCard({ 
  card, 
  isFlipped, 
  onToggle 
}: { 
  card: CharacteristicItem; 
  isFlipped: boolean; 
  onToggle: () => void;
}) {
  return (
    <div 
      className="relative w-full h-[245px] sm:h-[255px] md:h-[265px] cursor-pointer select-none z-10 hover:z-50 group"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-label={`Kartu ciri ${card.name}. Klik untuk membalik penjelasan.`}
    >
      {/* ZOOM CONTAINER (Hover) */}
      <div 
        className="relative w-full h-full rounded-2xl transition-transform duration-300 ease-out origin-center group-hover:scale-[1.2] group-hover:-translate-y-2 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {!isFlipped ? (
            <motion.div
              key="front"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
              className={`w-full h-full rounded-2xl p-4 flex flex-col items-center justify-between border-2 shadow-sm transition-colors duration-200 select-none
                ${card.isActive 
                  ? `${card.activeBg} shadow-lg border-transparent` 
                  : 'bg-card border-border/80 text-foreground group-hover:border-primary/60 dark:bg-slate-900/95'
                }
              `}
            >
              {/* Icon Circle */}
              <div className={`p-3 rounded-full mt-1.5 transition-transform group-hover:scale-110 duration-200 ${card.isActive ? 'bg-white/20 text-white' : 'bg-secondary text-foreground group-hover:bg-primary/10'}`}>
                {card.icon}
              </div>

              {/* Title & Subtitle */}
              <div className="text-center space-y-1.5 my-auto">
                <div className="font-black text-sm tracking-tight text-foreground dark:text-white">
                  {card.number}. {card.name}
                </div>
                <div className={`text-xs leading-snug font-semibold ${card.isActive ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                  {card.subtitle}
                </div>
              </div>

              {/* Hint Badge */}
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-primary group-hover:text-primary dark:text-slate-200 py-1 px-2.5 rounded-full bg-secondary/80 group-hover:bg-primary/15 border border-border/50 dark:border-white/10 transition-colors">
                <RotateCcw className="w-3 h-3" />
                <span>Klik balik kartu</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
              className={`w-full h-full rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between border-2 shadow-sm dark:shadow-2xl bg-card dark:bg-slate-950 text-foreground dark:text-slate-100 ${card.borderColor} select-none`}
            >
              {/* Header Back */}
              <div className="flex items-center justify-between w-full border-b border-border/60 dark:border-white/10 pb-1.5 shrink-0">
                <span className={`text-[11px] font-black px-2 py-0.5 rounded border ${card.badgeColor}`}>
                  {card.number}. {card.name}
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-bold group-hover:text-primary dark:group-hover:text-white transition-colors">
                  <RotateCcw className="w-3 h-3" /> Balik
                </span>
              </div>

              {/* Explanation Body */}
              <div className="text-xs leading-relaxed text-slate-800 dark:text-slate-200 text-left font-medium my-auto py-1">
                {card.explanation}
              </div>

              {/* Highlight Footer */}
              <div className="pt-1.5 border-t border-border/60 dark:border-white/10 text-[10px] sm:text-[11px] font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 shrink-0 leading-tight">
                <span className="shrink-0 text-amber-500">💡</span>
                <span className="line-clamp-2">{card.highlight}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
