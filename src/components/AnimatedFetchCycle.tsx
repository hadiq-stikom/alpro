"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, MemoryStick, Play, RotateCcw, ArrowRight, BookOpen, Settings, Zap, Monitor } from 'lucide-react';

const steps = [
  { 
    id: 'step1', 
    title: "1. Inisiasi Baca (Read)", 
    desc: "CPU bersiap membaca instruksi selanjutnya dari Memori.",
    activeComponent: ['cpu', 'memory'],
    dataFlow: 'none'
  },
  { 
    id: 'step2', 
    title: "2. Peran Program Counter (PC)", 
    desc: "Register PC (Program Counter) menyimpan alamat memori dari instruksi yang akan diambil (Misal: Alamat 001).",
    activeComponent: ['pc'],
    dataFlow: 'none'
  },
  { 
    id: 'step3', 
    title: "3. Fetch & Increment PC", 
    desc: "Alamat dikirim ke memori. PC langsung bertambah 1 (menjadi 002) bersiap untuk instruksi berikutnya.",
    activeComponent: ['pc', 'memory', 'bus'],
    dataFlow: 'address'
  },
  { 
    id: 'step4', 
    title: "4. Masuk ke Instruction Register (IR)", 
    desc: "Instruksi (kode biner) dari memori mengalir lewat bus dan ditampung ke dalam IR (Instruction Register).",
    activeComponent: ['memory', 'ir', 'bus'],
    dataFlow: 'data'
  },
  { 
    id: 'step5', 
    title: "5. Eksekusi (Decode & Execute)", 
    desc: "Instruksi biner dipecahkan maknanya. CPU kemudian mengeksekusi aksinya (bisa perpindahan data, operasi aritmatika, atau kontrol).",
    activeComponent: ['ir', 'execution'],
    dataFlow: 'execute'
  }
];

export default function AnimatedFetchCycle() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNextStep = () => {
    if (activeStep >= steps.length - 1) {
      setActiveStep(0);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const currentStep = steps[activeStep];
  
  // Helper to check if a component is active in current step
  const isActive = (comp: string) => currentStep.activeComponent.includes(comp);

  return (
    <div className="bg-primary/5 p-5 md:p-6 rounded-xl border border-primary/20 text-foreground relative overflow-hidden my-8">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-border/50 gap-4">
        <div>
          <h3 className="font-bold text-lg text-primary flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" /> Siklus Kerja Komputer (Fetch Cycle)
          </h3>
          <p className="text-xs text-muted-foreground mt-1">Siklus pengambilan dan pengeksekusian instruksi di dalam CPU.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={handleNextStep} 
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-bold text-sm transition-colors"
          >
            <ArrowRight className="w-4 h-4" /> {activeStep >= steps.length - 1 ? "Ulangi dari Awal" : "Langkah Berikutnya"}
          </button>
          <button 
            onClick={() => setActiveStep(0)} 
            className="p-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Animation Area */}
      <div className="relative w-full max-w-3xl mx-auto h-[315px] md:h-[360px] flex items-center justify-between px-2 md:px-10 z-10 bg-background/50 rounded-xl border border-border overflow-hidden">
        
        {/* BUS BACKGROUND */}
        <div className="absolute left-[35%] right-[25%] top-1/2 -translate-y-1/2 h-8 bg-secondary/30 flex items-center justify-center border-y border-dashed border-muted-foreground/30">
           <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">System Bus</span>
        </div>

        {/* DATA FLOW ANIMATIONS */}
        <AnimatePresence>
          {currentStep.dataFlow === 'address' && (
            <motion.div 
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: '250%', opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute left-[30%] top-[45%] bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-500/50 z-20"
            >
              Alamat: 001 ⟶
            </motion.div>
          )}
          {currentStep.dataFlow === 'data' && (
            <motion.div 
              initial={{ x: '250%', opacity: 0 }}
              animate={{ x: '100%', opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute left-[30%] top-[55%] bg-purple-500/20 text-purple-700 dark:text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-500/50 z-20"
            >
              ⟵ Instruksi
            </motion.div>
          )}
        </AnimatePresence>

        {/* LEFT: CPU BLOCK */}
        <div className={`w-40 md:w-56 h-[270px] md:h-[300px] border-2 rounded-xl relative p-4 flex flex-col justify-between transition-colors duration-500 ${isActive('cpu') || isActive('pc') || isActive('ir') || isActive('execution') ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'bg-[#1e1e1e] border-blue-500/30'}`}>
          <div className="absolute -top-3 left-4 bg-background px-2 text-xs font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1">
            <Cpu className="w-4 h-4" /> CPU
          </div>

          <div className="space-y-4 mt-2 relative z-10">
            {/* PC Register */}
            <motion.div 
              className={`border p-2 rounded flex justify-between items-center transition-colors ${isActive('pc') ? 'bg-yellow-500/20 border-yellow-500 text-yellow-700 dark:text-yellow-300' : 'bg-background border-border text-slate-700 dark:text-slate-300'}`}
              animate={{ scale: isActive('pc') ? 1.05 : 1 }}
            >
              <span className="text-[10px] md:text-xs font-bold">PC (Program Counter)</span>
              <span className="font-mono text-xs bg-background/80 px-1 rounded">{activeStep >= 2 ? '002' : '001'}</span>
            </motion.div>

            {/* MAR & MBR (Simplified visually as a block for clarity) */}
            <div className="border border-border/50 p-2 rounded bg-background/50 flex flex-col gap-2 opacity-90">
              <div className="text-[9px] text-center text-slate-700 dark:text-slate-300 font-medium">Register Memori (MAR / MBR)</div>
              <div className="h-1 w-full bg-border rounded-full" />
            </div>

            {/* IR Register */}
            <motion.div 
              className={`border p-2 rounded flex justify-between items-center transition-colors ${isActive('ir') ? 'bg-purple-500/20 border-purple-500 text-purple-700 dark:text-purple-300' : 'bg-background border-border text-slate-700 dark:text-slate-300'}`}
              animate={{ scale: isActive('ir') ? 1.05 : 1 }}
            >
              <span className="text-[10px] md:text-xs font-bold">IR (Instruction Reg)</span>
              <span className="font-mono text-[9px] bg-background/80 px-1 rounded">{activeStep >= 3 ? '10110...' : 'empty'}</span>
            </motion.div>
          </div>

          {/* Execution Unit */}
          <motion.div 
            className={`border-t-2 border-l-2 border-r-2 rounded-t-xl mt-4 h-16 md:h-20 relative flex items-center justify-center transition-colors ${isActive('execution') ? 'bg-green-500/20 border-green-500 shadow-[inset_0_-10px_20px_rgba(34,197,94,0.2)]' : 'bg-background border-border'}`}
            style={{ borderBottomWidth: 0, clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0% 100%)' }}
            animate={{ scale: isActive('execution') ? 1.05 : 1 }}
          >
            <span className={`text-[10px] font-bold ${isActive('execution') ? 'text-green-700 dark:text-green-400' : 'text-slate-700 dark:text-slate-300'}`}>
              Execution Unit
            </span>
            {isActive('execution') && (
              <Settings className="w-8 h-8 text-green-500 dark:text-green-400 absolute opacity-20 animate-spin-slow" />
            )}
          </motion.div>
        </div>

        {/* RIGHT: MAIN MEMORY */}
        <div className={`w-32 md:w-48 h-[270px] md:h-[300px] border-2 rounded-xl relative p-0 flex flex-col transition-colors duration-500 overflow-hidden ${isActive('memory') ? 'bg-orange-500/10 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.2)]' : 'bg-[#1e1e1e] border-orange-500/30'}`}>
          <div className="bg-orange-500/20 p-2 text-xs font-bold text-orange-700 dark:text-orange-400 text-center flex justify-center items-center gap-1 border-b border-orange-500/30">
            <MemoryStick className="w-4 h-4" /> Main Memory
          </div>
          
          <div className="flex-1 flex flex-col pt-4 px-2 gap-1 relative">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[8px] font-mono text-slate-500 dark:text-slate-400 w-6">001</span>
              <div className={`flex-1 border rounded px-2 py-1 text-[10px] font-mono text-center transition-colors ${activeStep === 2 || activeStep === 3 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-700 dark:text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-background border-border text-slate-700 dark:text-slate-300'}`}>Instruksi_A</div>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[8px] font-mono text-slate-500 dark:text-slate-400 w-6">002</span>
              <div className="flex-1 border rounded px-2 py-1 text-[10px] font-mono text-center bg-background border-border text-slate-700 dark:text-slate-300">Instruksi_B</div>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[8px] font-mono text-slate-500 dark:text-slate-400 w-6">003</span>
              <div className="flex-1 border rounded px-2 py-1 text-[10px] font-mono text-center bg-background border-border text-slate-700 dark:text-slate-300">Instruksi_C</div>
            </div>
            <div className="my-2 border-t border-dashed border-border w-full" />
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[8px] font-mono text-slate-500 dark:text-slate-400 w-6">...</span>
              <div className="flex-1 border rounded px-2 py-1 text-[10px] font-mono text-center bg-background border-border text-slate-700 dark:text-slate-300">Data</div>
            </div>
          </div>
        </div>

      </div>

      {/* Description Panel */}
      <div className="mt-6 bg-card border border-border p-4 md:p-5 rounded-lg min-h-[110px] flex items-center shadow-inner relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row gap-4 items-start w-full">
          <div className="bg-primary/10 p-2 md:p-3 rounded-lg text-primary shrink-0 font-bold text-xl md:text-2xl min-w-[48px] text-center">
            {activeStep + 1}
          </div>
          <div>
            <h4 className="font-bold text-primary mb-1 md:text-lg">{currentStep.title}</h4>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {currentStep.desc}
            </p>
          </div>
        </div>

        {/* Step dots */}
        <div className="absolute top-4 right-4 flex gap-1">
          {steps.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-2 h-2 rounded-full transition-colors ${idx === activeStep ? 'bg-primary' : 'bg-secondary'}`} 
            />
          ))}
        </div>
      </div>

      {/* 4 Categories of CPU Actions (Static reference from slide) */}
      <div className="mt-6 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 text-sm">
        <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2"><BookOpen className="w-4 h-4"/> 4 Kategori Aksi Eksekusi CPU:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          
          {/* Action 1: CPU - Memory */}
          <div className="group bg-background border border-border rounded-lg p-3 flex flex-col gap-3 hover:border-blue-500 hover:shadow-md transition-all cursor-crosshair relative overflow-hidden">
             <div className="flex items-start gap-3 relative z-10">
               <div className="bg-blue-500/20 p-1.5 rounded text-blue-600 dark:text-blue-400 mt-0.5 shrink-0">1</div>
               <div>
                 <strong className="block text-foreground text-sm group-hover:text-blue-500 transition-colors">CPU ↔ Memori</strong> 
                 <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">Perpindahan data dari CPU ke memori / sebaliknya.</span>
               </div>
             </div>
             {/* Illustration */}
             <div className="h-12 w-full bg-slate-500/5 rounded flex items-center justify-center gap-4 border border-dashed border-slate-500/20">
                <Cpu className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <div className="relative w-16 h-px bg-slate-300 dark:bg-slate-700">
                   <motion.div 
                     className="absolute -top-1 w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100"
                     animate={{ left: ["0%", "100%", "0%"] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                   />
                </div>
                <MemoryStick className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" />
             </div>
          </div>

          {/* Action 2: CPU - I/O */}
          <div className="group bg-background border border-border rounded-lg p-3 flex flex-col gap-3 hover:border-green-500 hover:shadow-md transition-all cursor-crosshair relative overflow-hidden">
             <div className="flex items-start gap-3 relative z-10">
               <div className="bg-green-500/20 p-1.5 rounded text-green-600 dark:text-green-400 mt-0.5 shrink-0">2</div>
               <div>
                 <strong className="block text-foreground text-sm group-hover:text-green-500 transition-colors">CPU ↔ I/O</strong> 
                 <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">Perpindahan data dari CPU ke modul I/O / sebaliknya.</span>
               </div>
             </div>
             {/* Illustration */}
             <div className="h-12 w-full bg-slate-500/5 rounded flex items-center justify-center gap-4 border border-dashed border-slate-500/20">
                <Cpu className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <div className="relative w-16 h-px bg-slate-300 dark:bg-slate-700">
                   <motion.div 
                     className="absolute -top-1.5 opacity-0 group-hover:opacity-100 text-[10px] text-green-500 font-bold"
                     animate={{ x: [0, 40, 0] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                   >
                     DATA
                   </motion.div>
                </div>
                <Monitor className="w-5 h-5 text-slate-400 group-hover:text-green-500 transition-colors" />
             </div>
          </div>

          {/* Action 3: Pengolahan Data */}
          <div className="group bg-background border border-border rounded-lg p-3 flex flex-col gap-3 hover:border-purple-500 hover:shadow-md transition-all cursor-crosshair relative overflow-hidden">
             <div className="flex items-start gap-3 relative z-10">
               <div className="bg-purple-500/20 p-1.5 rounded text-purple-600 dark:text-purple-400 mt-0.5 shrink-0">3</div>
               <div>
                 <strong className="block text-foreground text-sm group-hover:text-purple-500 transition-colors">Pengolahan Data</strong> 
                 <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">Operasi aritmatika & logika (dilakukan oleh ALU).</span>
               </div>
             </div>
             {/* Illustration */}
             <div className="h-12 w-full bg-slate-500/5 rounded flex items-center justify-center gap-6 border border-dashed border-slate-500/20 overflow-hidden">
                <span className="text-slate-400 font-mono text-sm group-hover:text-purple-500 transition-colors">5 + 3</span>
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="opacity-20 group-hover:opacity-100"
                >
                  <Settings className="w-5 h-5 text-purple-500" />
                </motion.div>
                <span className="text-slate-400 font-mono text-sm group-hover:text-purple-500 transition-colors">= 8</span>
             </div>
          </div>

          {/* Action 4: Kontrol */}
          <div className="group bg-background border border-border rounded-lg p-3 flex flex-col gap-3 hover:border-yellow-500 hover:shadow-md transition-all cursor-crosshair relative overflow-hidden">
             <div className="flex items-start gap-3 relative z-10">
               <div className="bg-yellow-500/20 p-1.5 rounded text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0">4</div>
               <div>
                 <strong className="block text-foreground text-sm group-hover:text-yellow-500 transition-colors">Kontrol</strong> 
                 <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">Instruksi untuk mengubah urutan eksekusi program.</span>
               </div>
             </div>
             {/* Illustration */}
             <div className="h-12 w-full bg-slate-500/5 rounded flex items-center justify-center gap-2 border border-dashed border-slate-500/20">
                <div className="flex flex-col gap-1 items-center">
                   <div className="w-12 h-1 bg-slate-300 dark:bg-slate-700 rounded-full group-hover:bg-yellow-500/20 transition-colors" />
                   <div className="w-12 h-1 bg-slate-300 dark:bg-slate-700 rounded-full group-hover:bg-yellow-500/50 transition-colors relative">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100"
                        animate={{ width: ["0%", "100%", "0%"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                   </div>
                   <div className="w-12 h-1 bg-slate-300 dark:bg-slate-700 rounded-full group-hover:bg-yellow-500/20 transition-colors" />
                </div>
                <motion.div 
                  className="opacity-0 group-hover:opacity-100 text-[9px] font-bold text-yellow-600 bg-yellow-500/20 px-1 rounded"
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  JUMP TO
                </motion.div>
             </div>
          </div>

        </div>
      </div>

    </div>
  );
}
