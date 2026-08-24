"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowDown, Code2, Cpu, Binary, Terminal } from 'lucide-react';

type Language = 'python' | 'javascript' | 'cpp' | 'csharp';

const codeExamples: Record<Language, { name: string; code: string }> = {
  python: { name: 'Python', code: "print('*')" },
  javascript: { name: 'JavaScript', code: "console.log('*')" },
  cpp: { name: 'C++', code: 'cout << "*";' },
  csharp: { name: 'C#', code: 'console.Write("*");' }
};

export default function CodeTranslationVisualizer() {
  const [lang, setLang] = useState<Language>('javascript');
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [source, setSource] = useState<'high' | 'assembly' | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslateHighLevel = () => {
    if (isTranslating) return;
    setIsTranslating(true);
    setSource('high');
    setStep(0);
    
    // Sequence of animations
    setTimeout(() => setStep(1), 600); // Reveal Machine Code
    setTimeout(() => setStep(2), 1800); // Reveal Output
    setTimeout(() => setIsTranslating(false), 2000);
  };

  const handleTranslateAssembly = () => {
    if (isTranslating) return;
    setIsTranslating(true);
    setSource('assembly');
    setStep(0);
    
    // Sequence of animations
    setTimeout(() => setStep(1), 600); // Reveal Machine Code
    setTimeout(() => setStep(2), 1800); // Reveal Output
    setTimeout(() => setIsTranslating(false), 2000);
  };

  return (
    <div className="w-full bg-card border border-border rounded-2xl p-4 md:p-8 shadow-sm my-8 font-sans">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold mb-2">Pilih Jalur Terjemahan Anda</h3>
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
          Baik menggunakan Bahasa Tingkat Tinggi yang mudah dipahami maupun Assembly yang rumit, keduanya pada akhirnya diterjemahkan langsung menjadi <strong className="text-primary">Bahasa Mesin</strong>.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* PARALLEL CONTAINERS: High Level vs Assembly */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          
          {/* LEFT: High Level */}
          <div className="flex flex-col">
            <div className="w-full bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 md:p-6 relative flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
                  <Code2 className="w-5 h-5" />
                  <span>Tingkat Tinggi</span>
                </div>
                
                {/* Language Selector */}
                <div className="flex bg-background border border-border rounded-lg overflow-hidden text-xs font-medium">
                  {(Object.keys(codeExamples) as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setStep(0); setSource(null); }}
                      disabled={isTranslating}
                      className={`px-2 py-1 transition-colors ${lang === l ? 'bg-blue-500 text-white' : 'hover:bg-secondary text-muted-foreground'} disabled:opacity-50`}
                    >
                      {codeExamples[l].name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-[#1e1e1e] p-4 rounded-lg font-mono text-blue-300 text-base md:text-lg shadow-inner flex flex-col gap-4 flex-grow justify-center">
                <code>{codeExamples[lang].code}</code>
              </div>
              
              <div className="mt-4 flex flex-col items-center gap-2">
                <p className="text-[11px] text-muted-foreground text-center">
                  Diterjemahkan oleh <strong>Compiler / Interpreter</strong>
                </p>
                <button 
                  onClick={handleTranslateHighLevel}
                  disabled={isTranslating}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-md font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-md"
                >
                  <Play className="w-4 h-4" fill="currentColor" /> Compile (Tingkat Tinggi)
                </button>
              </div>
            </div>

            {/* Arrow Down for High Level */}
            <div className="h-16 w-full flex justify-center items-center relative overflow-hidden hidden lg:flex">
              <div className="w-0.5 h-full bg-border absolute" />
              <AnimatePresence>
                {step >= 1 && source === 'high' && (
                  <motion.div 
                    initial={{ top: -20, opacity: 0 }}
                    animate={{ top: "100%", opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, ease: "linear" }}
                    className="absolute w-1.5 h-8 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,1)] z-10"
                  />
                )}
              </AnimatePresence>
              <ArrowDown className={`w-5 h-5 absolute bottom-0 bg-background z-20 transition-colors ${step >= 1 && source === 'high' ? 'text-blue-500' : 'text-border'}`} />
            </div>
          </div>

          {/* RIGHT: Assembly Level */}
          <div className="flex flex-col mt-4 lg:mt-0">
            <div className="w-full bg-purple-500/5 border border-purple-500/20 rounded-xl p-4 md:p-6 relative flex flex-col h-full">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold mb-4">
                <Cpu className="w-5 h-5" />
                <span>Tingkat Menengah (Assembly)</span>
              </div>
              
              <div className="bg-[#1e1e1e] p-4 rounded-lg font-mono text-purple-300 text-sm shadow-inner flex flex-col justify-center flex-grow">
                <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-3">
                  <div className="flex flex-col gap-1 border-r border-purple-500/20 pr-3">
                    <code>MOV AH,02H</code>
                    <code>MOV DL,2AH</code>
                    <code>INT 21H</code>
                  </div>
                  <div className="flex flex-col gap-1 text-muted-foreground text-[10px] md:text-xs justify-center">
                    <span>• Siapkan fungsi print</span>
                    <span>• Load kode ASCII (*)</span>
                    <span>• Eksekusi interupsi OS</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex flex-col items-center gap-2">
                <p className="text-[11px] text-muted-foreground text-center">
                  Diterjemahkan oleh <strong>Assembler</strong>
                </p>
                <button 
                  onClick={handleTranslateAssembly}
                  disabled={isTranslating}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2.5 rounded-md font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-md"
                >
                  <Play className="w-4 h-4" fill="currentColor" /> Assemble (Tingkat Menengah)
                </button>
              </div>
            </div>

            {/* Arrow Down for Assembly */}
            <div className="h-16 w-full flex justify-center items-center relative overflow-hidden hidden lg:flex">
              <div className="w-0.5 h-full bg-border absolute" />
              <AnimatePresence>
                {step >= 1 && source === 'assembly' && (
                  <motion.div 
                    initial={{ top: -20, opacity: 0 }}
                    animate={{ top: "100%", opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, ease: "linear" }}
                    className="absolute w-1.5 h-8 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,1)] z-10"
                  />
                )}
              </AnimatePresence>
              <ArrowDown className={`w-5 h-5 absolute bottom-0 bg-background z-20 transition-colors ${step >= 1 && source === 'assembly' ? 'text-purple-500' : 'text-border'}`} />
            </div>
          </div>

        </div>

        {/* BOTTOM: Machine Code */}
        <div className={`w-full max-w-3xl mx-auto transition-all duration-700 mt-4 lg:mt-0 ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-40 scale-95 grayscale'}`}>
          
          {/* Mobile Arrows (since side-by-side doesn't work on mobile) */}
          <div className="h-12 w-full flex justify-center items-center relative overflow-hidden lg:hidden mb-2">
            <div className="w-0.5 h-full bg-border absolute" />
            <AnimatePresence>
              {step >= 1 && (
                <motion.div 
                  initial={{ top: -20, opacity: 0 }}
                  animate={{ top: "100%", opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, ease: "linear" }}
                  className={`absolute w-1.5 h-8 rounded-full shadow-[0_0_15px_rgba(34,197,94,1)] z-10 ${source === 'high' ? 'bg-blue-500' : 'bg-purple-500'}`}
                />
              )}
            </AnimatePresence>
            <ArrowDown className={`w-5 h-5 absolute bottom-0 bg-background z-20 transition-colors ${step >= 1 ? (source === 'high' ? 'text-blue-500' : 'text-purple-500') : 'text-border'}`} />
          </div>

          <div className={`w-full border rounded-xl p-4 md:p-6 relative transition-colors duration-500 ${step >= 1 ? 'bg-green-500/10 border-green-500/40 shadow-[0_0_30px_rgba(34,197,94,0.15)]' : 'bg-card border-border/50'}`}>
            <div className={`flex items-center gap-2 font-bold mb-4 transition-colors ${step >= 1 ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
              <Binary className="w-5 h-5" />
              <span>Tingkat Rendah (Bahasa Mesin / Biner)</span>
            </div>
            
            <div className="bg-[#1e1e1e] p-4 md:p-6 rounded-lg font-mono text-sm shadow-inner grid grid-cols-[160px_1fr] md:grid-cols-[200px_1fr] gap-4 relative overflow-hidden">
              {/* Highlight flash effect when activated */}
              <AnimatePresence>
                {step === 1 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.2, 0] }}
                    transition={{ duration: 1 }}
                    className={`absolute inset-0 z-0 ${source === 'high' ? 'bg-blue-500' : 'bg-purple-500'}`}
                  />
                )}
              </AnimatePresence>

              <div className={`flex flex-col gap-1 border-r border-green-500/20 pr-4 z-10 transition-colors ${step >= 1 ? 'text-green-400' : 'text-muted-foreground'}`}>
                <code>1011 0100 0000 0010</code>
                <code>1011 0010 0010 1010</code>
                <code>1100 1101 0010 0001</code>
              </div>
              <div className={`flex flex-col gap-1 text-[10px] md:text-xs justify-center font-bold tracking-widest z-10 transition-colors ${step >= 1 ? 'text-green-600/80 dark:text-green-500/60' : 'text-muted-foreground/50'}`}>
                <span>0xB4 0x02</span>
                <span>0xB2 0x2A</span>
                <span>0xCD 0x21</span>
              </div>
            </div>
            <p className="text-[11px] md:text-xs text-muted-foreground mt-4 text-center">
              Apapun bahasa yang Anda gunakan di atas, ini adalah hasil akhir mutlak yang dibaca oleh CPU.
            </p>
          </div>
        </div>

        {/* The CPU Processing & Output */}
        <div className={`w-full max-w-3xl mx-auto mt-6 transition-all duration-700 ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none h-0 overflow-hidden'}`}>
           <div className="flex flex-col items-center">
             <div className="h-8 w-full flex justify-center items-center relative mb-4">
                <div className="w-0.5 h-full bg-border absolute" />
                <motion.div 
                  initial={{ top: -20 }}
                  animate={step >= 2 ? { top: "100%" } : { top: -20 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                  className="absolute w-1.5 h-6 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)] z-10"
                />
             </div>

             <div className="flex gap-4 items-stretch w-full">
               <motion.div 
                  animate={step >= 2 ? { rotate: 360 } : {}}
                  transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                  className="bg-card border-[3px] border-green-500/50 p-4 rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.2)] flex items-center justify-center shrink-0"
                >
                  <Cpu className="w-10 h-10 text-green-600 dark:text-green-400" />
               </motion.div>
               
               <div className="bg-foreground text-background p-4 rounded-xl font-mono relative overflow-hidden border-[3px] border-foreground flex-grow flex flex-col justify-center shadow-xl">
                  <div className="flex items-center gap-2 mb-2 opacity-50 text-[10px] md:text-xs uppercase tracking-wider">
                    <Terminal className="w-3 h-3" /> Output Layar
                  </div>
                  <div className="text-3xl pl-4 font-bold text-green-400">
                    {step >= 2 && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", bounce: 0.6 }}
                      >
                        *
                      </motion.span>
                    )}
                    <motion.span 
                      animate={{ opacity: [1, 0, 1] }} 
                      transition={{ repeat: Infinity, duration: 0.8 }} 
                      className="inline-block w-3 h-8 bg-green-400 ml-1 align-middle" 
                    />
                  </div>
               </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
