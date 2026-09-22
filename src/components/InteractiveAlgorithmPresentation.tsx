"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, FastForward, Info, Maximize2, Minimize2, LayoutGrid, FileText, GitCommit, Code2, ChevronUp, ChevronDown } from 'lucide-react';

export default function InteractiveAlgorithmPresentation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(2000);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'descriptive' | 'flowchart' | 'pseudocode'>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalSteps = 4; // 1: Masukkan panjang, 2: Masukkan lebar, 3: Hitung luas, 4: Tampilkan luas

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < totalSteps) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, speed);
    } else if (currentStep >= totalSteps) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, speed]);

  // Handle ESC key to exit fullscreen & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMaximized) {
        setIsMaximized(false);
      }
    };

    if (isMaximized) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMaximized]);

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const stepDescriptions = [
    "Menunggu untuk dimulai...",
    "1. Langkah 1: Masukkan nilai panjang",
    "2. Langkah 2: Masukkan nilai lebar",
    "3. Langkah 3: Hitung nilai luas (panjang * lebar)",
    "4. Langkah 4: Tampilkan hasil luas ke layar"
  ];

  const handleMaximizeToggle = () => {
    if (!isMaximized) {
      setIsMaximized(true);
      setActiveTab('all');
    } else {
      setIsMaximized(false);
    }
  };

  const mainContentJSX = (
    <div 
      className={`transition-all duration-300 relative ${
        isMaximized 
          ? 'fixed top-0 left-0 right-0 bottom-0 inset-0 z-[99999] p-3 md:p-6 bg-slate-950/98 backdrop-blur-xl flex flex-col justify-between w-screen h-screen overflow-hidden text-slate-100 font-sans' 
          : 'border border-border/50 rounded-2xl overflow-hidden bg-background shadow-lg'
      }`}
      style={isMaximized ? { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, margin: 0, width: '100vw', height: '100vh' } : {}}
    >
      
      {/* Floating Restore Header Button (When Header is Hidden) */}
      <AnimatePresence>
        {!isHeaderVisible && (
          <motion.button 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            onClick={() => setIsHeaderVisible(true)}
            className="absolute top-4 right-6 z-40 bg-slate-900/95 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500 hover:text-slate-950 px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.4)] backdrop-blur-md transition-all cursor-pointer"
            title="Tampilkan Header & Controls"
          >
            <ChevronDown className="w-3.5 h-3.5" />
            <span>Tampilkan Controls & Header</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Header & Controls */}
      <AnimatePresence>
        {isHeaderVisible && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3 md:p-4 border-b border-border/50 bg-slate-900/90 text-slate-100 flex flex-col gap-3 shrink-0 rounded-t-xl overflow-hidden"
          >
            
            {/* ROW 1: Header Content (Minimalist in Maximize mode, Full in Normal mode) */}
            {isMaximized ? (
              <div className="flex items-center justify-between gap-3 w-full">
                <div className="flex items-center gap-2.5 text-emerald-400 font-mono text-xs md:text-sm font-bold">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
                  <span>{currentStep === 0 ? stepDescriptions[0] : `Eksekusi: ${stepDescriptions[currentStep]}`}</span>
                </div>

                {/* ONLY Play, Reset, and Minimize Buttons */}
                <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 shadow-sm shrink-0">
                  <button 
                    onClick={() => {
                      if (currentStep >= totalSteps) setCurrentStep(1);
                      setIsPlaying(!isPlaying);
                    }}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isPlaying ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold'}`}
                    title={isPlaying ? "Jeda" : "Jalankan Simulasi"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <button 
                    onClick={reset}
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Reset"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <div className="w-[1px] h-4 bg-slate-800 mx-1"></div>
                  
                  {/* Minimize Button */}
                  <button 
                    onClick={handleMaximizeToggle}
                    className="px-3 h-8 rounded-lg flex items-center gap-1.5 bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all shadow-[0_0_12px_rgba(16,185,129,0.4)] cursor-pointer"
                    title="Perkecil (Minimize / Esc)"
                  >
                    <Minimize2 className="w-4 h-4" />
                    <span className="text-xs font-extrabold">Minimize</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3 w-full">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg md:text-xl font-bold text-white">Simulasi Sinkronisasi 3 Teknik Penyajian Algoritma</h3>
                    </div>
                    <p className="text-slate-400 text-xs mt-0.5">Studi Kasus Bersama: Menghitung Luas Persegi Panjang</p>
                  </div>

                  {/* Playback Controls & Maximize Button */}
                  <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shadow-sm shrink-0">
                    <button 
                      onClick={() => {
                        if (currentStep >= totalSteps) setCurrentStep(1);
                        setIsPlaying(!isPlaying);
                      }}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isPlaying ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold'}`}
                      title={isPlaying ? "Jeda" : "Jalankan Simulasi"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <button 
                      onClick={reset}
                      className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Reset"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <div className="w-[1px] h-4 bg-slate-800 mx-1"></div>
                    <button 
                      onClick={() => setSpeed(speed === 2000 ? 1000 : 2000)}
                      className={`px-2.5 h-8 rounded-lg flex items-center gap-1 text-xs font-bold transition-colors ${speed === 1000 ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                      title="Kecepatan Exec"
                    >
                      <FastForward className="w-3.5 h-3.5" />
                      {speed === 1000 ? '2x' : '1x'}
                    </button>
                    <div className="w-[1px] h-4 bg-slate-800 mx-1"></div>
                    
                    {/* Maximize Button */}
                    <button 
                      onClick={handleMaximizeToggle}
                      className="px-3 h-8 rounded-lg flex items-center gap-1.5 bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all shadow-[0_0_12px_rgba(16,185,129,0.4)] cursor-pointer"
                      title="Layar Penuh (Maximize)"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span className="text-xs font-extrabold">Maximize</span>
                    </button>

                    <div className="w-[1px] h-4 bg-slate-800 mx-1"></div>

                    {/* Show/Hide Header Toggle Button */}
                    <button 
                      onClick={() => setIsHeaderVisible(false)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Sembunyikan Header"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* ROW 2: Tab Selection Filter */}
                <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs w-full sm:w-fit">
                  <button 
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-bold transition-all ${activeTab === 'all' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Semua (3 Kolom)</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('descriptive')}
                    className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-bold transition-all ${activeTab === 'descriptive' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Deskriptif</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('flowchart')}
                    className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-bold transition-all ${activeTab === 'flowchart' ? 'bg-blue-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    <GitCommit className="w-3.5 h-3.5" />
                    <span>Flowchart</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('pseudocode')}
                    className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-bold transition-all ${activeTab === 'pseudocode' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Pseudocode</span>
                  </button>
                </div>
              </>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      {/* Standalone Status Bar (Only in Normal View) */}
      {!isMaximized && (
        <div className="bg-slate-900 border-b border-slate-800 text-emerald-400 py-1.5 px-5 font-mono text-xs md:text-sm font-bold flex items-center gap-2.5 shrink-0">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
          {currentStep === 0 ? stepDescriptions[0] : `Eksekusi: ${stepDescriptions[currentStep]}`}
        </div>
      )}

      {/* Panels Area */}
      <div className={`p-3 md:p-5 bg-slate-950 flex-1 overflow-hidden min-h-0 ${
        activeTab === 'all' ? 'grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5' : 'flex flex-col'
      }`}>
        
        {/* PANEL 1: Deskriptif (100% Identik dengan Struktur Materi) */}
        {(activeTab === 'all' || activeTab === 'descriptive') && (
          <div className="p-4 md:p-5 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col justify-between h-full overflow-y-auto shadow-inner">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <h4 className="font-bold text-base md:text-lg text-emerald-400 flex items-center gap-2">
                  <FileText className="w-4 h-4 md:w-5 md:h-5" />
                  1. Deskriptif
                </h4>
                <span title="Menggunakan bahasa naratif imperatif yang terstruktur">
                  <Info className="w-4 h-4 text-slate-500" />
                </span>
              </div>
              
              <ul className="space-y-4 text-xs md:text-sm pt-1">
                {/* Langkah 1 */}
                <li className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-300 ${
                  currentStep === 1 ? 'bg-emerald-500/25 border border-emerald-400/60 shadow-md scale-[1.02] translate-x-1' : 'border border-transparent'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    currentStep === 1 ? 'bg-emerald-400 text-slate-950 font-extrabold shadow-[0_0_10px_rgba(52,211,153,0.8)]' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  }`}>1.</div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-extrabold text-cyan-400 bg-cyan-500/15 border border-cyan-500/40 px-2 py-0.5 rounded text-xs">Masukkan</span>
                    <span className="text-slate-200 text-xs">nilai</span>
                    <strong className="text-purple-300 bg-purple-500/15 border border-purple-500/40 px-2 py-0.5 rounded font-bold text-xs">panjang</strong>
                    <span className="text-slate-200 text-xs">.</span>
                  </div>
                </li>

                {/* Langkah 2 */}
                <li className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-300 ${
                  currentStep === 2 ? 'bg-emerald-500/25 border border-emerald-400/60 shadow-md scale-[1.02] translate-x-1' : 'border border-transparent'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    currentStep === 2 ? 'bg-emerald-400 text-slate-950 font-extrabold shadow-[0_0_10px_rgba(52,211,153,0.8)]' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  }`}>2.</div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-extrabold text-cyan-400 bg-cyan-500/15 border border-cyan-500/40 px-2 py-0.5 rounded text-xs">Masukkan</span>
                    <span className="text-slate-200 text-xs">nilai</span>
                    <strong className="text-purple-300 bg-purple-500/15 border border-purple-500/40 px-2 py-0.5 rounded font-bold text-xs">lebar</strong>
                    <span className="text-slate-200 text-xs">.</span>
                  </div>
                </li>

                {/* Langkah 3 */}
                <li className={`flex items-start gap-3 p-2.5 rounded-xl transition-all duration-300 ${
                  currentStep === 3 ? 'bg-emerald-500/25 border border-emerald-400/60 shadow-md scale-[1.02] translate-x-1' : 'border border-transparent'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    currentStep === 3 ? 'bg-emerald-400 text-slate-950 font-extrabold shadow-[0_0_10px_rgba(52,211,153,0.8)]' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  }`}>3.</div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-extrabold text-cyan-400 bg-cyan-500/15 border border-cyan-500/40 px-2 py-0.5 rounded text-xs">Hitung</span>
                      <span className="text-slate-200 text-xs">nilai</span>
                      <strong className="text-purple-300 bg-purple-500/15 border border-purple-500/40 px-2 py-0.5 rounded font-bold text-xs">luas</strong>
                    </div>
                    <div className="mt-1.5 bg-slate-800/90 px-2.5 py-1 rounded text-amber-300 font-mono text-xs border border-amber-500/40 font-bold block w-fit">
                      luas = panjang * lebar
                    </div>
                  </div>
                </li>

                {/* Langkah 4 */}
                <li className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-300 ${
                  currentStep === 4 ? 'bg-emerald-500/25 border border-emerald-400/60 shadow-md scale-[1.02] translate-x-1' : 'border border-transparent'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    currentStep === 4 ? 'bg-emerald-400 text-slate-950 font-extrabold shadow-[0_0_10px_rgba(52,211,153,0.8)]' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  }`}>4.</div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-extrabold text-cyan-400 bg-cyan-500/15 border border-cyan-500/40 px-2 py-0.5 rounded text-xs">Tampilkan</span>
                    <span className="text-slate-200 text-xs">hasil</span>
                    <strong className="text-purple-300 bg-purple-500/15 border border-purple-500/40 px-2 py-0.5 rounded font-bold text-xs">luas</strong>
                    <span className="text-slate-200 text-xs">ke layar.</span>
                  </div>
                </li>
              </ul>
            </div>
            <p className="text-[11px] text-slate-400 font-medium italic mt-2 pt-2 border-t border-slate-800/60 text-center shrink-0">
              Bahasa naratif sehari-hari, sangat mudah dipahami manusia.
            </p>
          </div>
        )}

        {/* PANEL 2: Flowchart */}
        {(activeTab === 'all' || activeTab === 'flowchart') && (
          <div className="p-4 md:p-5 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col items-center justify-between h-full overflow-y-auto shadow-inner">
            <div className="w-full flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-3 border-b border-slate-800 pb-2">
                <h4 className="font-bold text-base md:text-lg text-blue-400 flex items-center gap-2">
                  <GitCommit className="w-4 h-4 md:w-5 md:h-5" />
                  2. Flowchart
                </h4>
                <span title="Menggunakan simbol-simbol bangun datar standar">
                  <Info className="w-4 h-4 text-slate-400" />
                </span>
              </div>

              <div className="flex flex-col items-center gap-0.5 w-full max-w-[240px] my-1">
                <FlowchartNode type="terminator" text="START" isActive={currentStep >= 1} />
                <FlowLine isActive={currentStep >= 1} />
                
                <FlowchartNode type="io" text="IN (panjang)" isActive={currentStep === 1} />
                <FlowLine isActive={currentStep >= 1} />
                
                <FlowchartNode type="io" text="IN (lebar)" isActive={currentStep === 2} />
                <FlowLine isActive={currentStep >= 2} />
                
                <FlowchartNode type="process" text="luas = panjang * lebar" isActive={currentStep === 3} />
                <FlowLine isActive={currentStep >= 3} />
                
                <FlowchartNode type="io" text="OUT (luas)" isActive={currentStep === 4} />
                <FlowLine isActive={currentStep >= 4} />
                
                <FlowchartNode type="terminator" text="STOP" isActive={currentStep === 4} />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-medium italic mt-2 pt-2 border-t border-slate-800/60 text-center w-full shrink-0">
              Diagram visual matematis, mudah melacak alur eksekusi logika.
            </p>
          </div>
        )}

        {/* PANEL 3: Pseudocode (Standard Baru Baku) */}
        {(activeTab === 'all' || activeTab === 'pseudocode') && (
          <div className="p-4 md:p-5 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col justify-between h-full overflow-y-auto shadow-inner font-mono text-sm text-slate-300">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <h4 className="font-bold text-base md:text-lg text-violet-400 flex items-center gap-2">
                  <Code2 className="w-4 h-4 md:w-5 md:h-5" />
                  3. Pseudocode
                </h4>
                <span title="Struktur kode mirip dengan bahasa pemrograman sungguhan">
                  <Info className="w-4 h-4 text-slate-400" />
                </span>
              </div>

              <div className="space-y-0.5 md:space-y-1">
                <CodeLine text="PROGRAM HitungLuas" color="text-violet-400 font-bold" />
                <CodeLine text="// Menghitung luas persegi panjang" color="text-slate-400 text-xs" />
                <div className="h-1"></div>
                <CodeLine text="KAMUS:" color="text-violet-400 font-bold text-xs" />
                <CodeLine text="  panjang, lebar : float" color="text-slate-300" />
                <CodeLine text="  luas : float" color="text-slate-300" />
                <div className="h-1"></div>
                <CodeLine text="ALGORITMA:" color="text-violet-400 font-bold text-xs" />
                <CodeLine text="  input(panjang)" color="text-fuchsia-300" isActive={currentStep === 1} />
                <CodeLine text="  input(lebar)" color="text-fuchsia-300" isActive={currentStep === 2} />
                <CodeLine text="  luas = panjang * lebar" color="text-slate-200" isActive={currentStep === 3} />
                <CodeLine text="  output(luas)" color="text-cyan-300" isActive={currentStep === 4} />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-medium italic mt-2 pt-2 border-t border-slate-800/60 text-center font-sans shrink-0">
              Notasi semi-pemrograman, paling dekat dengan instruksi komputer.
            </p>
          </div>
        )}

      </div>
    </div>
  );

  if (isMaximized && mounted) {
    return createPortal(mainContentJSX, document.body);
  }

  return mainContentJSX;
}

// Helper Components

function CodeLine({ text, isActive = false, color = "text-slate-200" }: { text: string, isActive?: boolean, color?: string }) {
  return (
    <div className={`px-2.5 py-0.5 rounded transition-all duration-300 text-xs md:text-sm font-mono ${
      isActive 
        ? 'bg-violet-500/30 border-l-4 border-violet-400 text-violet-100 font-extrabold shadow-sm translate-x-1' 
        : 'border-l-4 border-transparent'
    }`}>
      <span className={`${isActive ? 'text-violet-200 font-bold' : color} whitespace-pre`}>{text}</span>
    </div>
  );
}

function FlowchartNode({ type, text, isActive }: { type: 'terminator' | 'io' | 'process', text: string, isActive: boolean }) {
  const activeStyle = isActive 
    ? "bg-blue-500 text-slate-950 shadow-[0_0_18px_rgba(59,130,246,0.9)] border-white scale-105 z-10 font-extrabold" 
    : "bg-slate-950 text-slate-100 border-slate-700 font-bold";
  
  if (type === 'terminator') {
    return (
      <div className={`px-4 py-1 rounded-full border-2 text-xs font-extrabold text-center transition-all duration-300 w-28 md:w-32 ${activeStyle}`}>
        {text}
      </div>
    );
  }
  
  if (type === 'io') {
    return (
      <div className={`px-4 py-1 border-2 text-xs font-extrabold text-center transition-all duration-300 transform -skew-x-12 w-40 md:w-44 ${activeStyle}`}>
        <div className="skew-x-12">{text}</div>
      </div>
    );
  }

  if (type === 'process') {
    return (
      <div className={`px-2.5 py-1 border-2 font-extrabold text-center text-[10px] md:text-xs transition-all duration-300 w-full ${activeStyle}`}>
        {text}
      </div>
    );
  }

  return null;
}

function FlowLine({ isActive }: { isActive: boolean }) {
  return (
    <div className="w-1 h-3 md:h-3.5 relative bg-slate-800 flex flex-col justify-end items-center my-0.2">
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: isActive ? '100%' : 0 }}
        className="w-full bg-blue-400 absolute top-0 left-0 right-0"
      />
      <div className={`w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] -mb-1 z-10 transition-colors ${isActive ? 'border-t-blue-400' : 'border-t-slate-800'}`}></div>
    </div>
  );
}
