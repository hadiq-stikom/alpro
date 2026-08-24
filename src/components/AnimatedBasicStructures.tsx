"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlignJustify, 
  GitBranch, 
  Repeat, 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  SkipForward, 
  Sparkles, 
  ShieldCheck, 
  Coffee, 
  Compass, 
  Sliders,
  CheckCircle2,
  AlertCircle,
  Droplets,
  Gauge
} from 'lucide-react';

type Tab = 'sequential' | 'selection' | 'looping';
type LoopMode = 'counted' | 'conditional';

export default function AnimatedBasicStructures() {
  const [activeTab, setActiveTab] = useState<Tab>('sequential');
  const [isMaximized, setIsMaximized] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Playback States
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1400);

  // 1. Sequential States (Steps: 0: Idle, 1: Input, 2: Process, 3: Output, 4: Done)
  const [seqStep, setSeqStep] = useState(0);

  // 2. Selection States (Condition: true/false, Steps: 0: Idle, 1: Eval Condition, 2: Exec Branch, 3: Merge/Done)
  const [isConditionTrue, setIsConditionTrue] = useState(true);
  const [selStep, setSelStep] = useState(0);

  // 3. Looping States
  const [loopMode, setLoopMode] = useState<LoopMode>('counted');
  
  // 3A. FOR Loop States (Counted)
  const [forTarget, setForTarget] = useState<number>(3);
  const [forCurrentI, setForCurrentI] = useState<number>(1);
  const [forStep, setForStep] = useState(0);

  // 3B. WHILE Loop States (Conditional - Water Tank Pump)
  // Water levels: 0%, 25%, 50%, 75%, 100%
  const [initialWater, setInitialWater] = useState<number>(25);
  const [currentWater, setCurrentWater] = useState<number>(25);
  const [whileStep, setWhileStep] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    resetAll();
  }, [activeTab, loopMode]);

  const resetAll = () => {
    setIsPlaying(false);
    setSeqStep(0);
    setSelStep(0);
    setForStep(0);
    setForCurrentI(1);
    setWhileStep(0);
    setCurrentWater(initialWater);
  };

  // Handle ESC for maximize modal
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

  // --- AUTOMATIC SIMULATION ENGINES ---

  // 1. Sequential Engine
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && activeTab === 'sequential') {
      if (seqStep < 4) {
        timer = setTimeout(() => setSeqStep(prev => prev + 1), speed);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, seqStep, activeTab, speed]);

  // 2. Selection Engine
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && activeTab === 'selection') {
      if (selStep < 3) {
        timer = setTimeout(() => setSelStep(prev => prev + 1), speed);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, selStep, activeTab, speed]);

  // 3A. FOR Loop Engine (Counted)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && activeTab === 'looping' && loopMode === 'counted') {
      if (forStep === 0) {
        timer = setTimeout(() => setForStep(1), speed);
      } else if (forStep === 1) {
        timer = setTimeout(() => {
          if (forCurrentI <= forTarget) {
            setForStep(2); // Enter body
          } else {
            setForStep(4); // Exit to STOP
          }
        }, speed);
      } else if (forStep === 2) {
        timer = setTimeout(() => {
          setForStep(3);
          setForCurrentI(prev => prev + 1);
        }, speed);
      } else if (forStep === 3) {
        timer = setTimeout(() => setForStep(1), speed);
      } else if (forStep === 4) {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, forStep, forCurrentI, forTarget, activeTab, loopMode, speed]);

  // 3B. WHILE Loop Engine (Conditional - Water Tank Pump)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && activeTab === 'looping' && loopMode === 'conditional') {
      if (whileStep === 0) {
        timer = setTimeout(() => setWhileStep(1), speed);
      } else if (whileStep === 1) {
        timer = setTimeout(() => {
          if (currentWater < 100) {
            setWhileStep(2); // Pump water
          } else {
            setWhileStep(4); // Tank full -> STOP
          }
        }, speed);
      } else if (whileStep === 2) {
        timer = setTimeout(() => {
          setWhileStep(3);
          setCurrentWater(prev => Math.min(prev + 25, 100));
        }, speed);
      } else if (whileStep === 3) {
        timer = setTimeout(() => setWhileStep(1), speed);
      } else if (whileStep === 4) {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, whileStep, currentWater, activeTab, loopMode, speed]);

  // Manual Step
  const handleNextStep = () => {
    if (activeTab === 'sequential') {
      if (seqStep < 4) setSeqStep(prev => prev + 1);
    } else if (activeTab === 'selection') {
      if (selStep < 3) setSelStep(prev => prev + 1);
    } else if (activeTab === 'looping') {
      if (loopMode === 'counted') {
        if (forStep === 0) setForStep(1);
        else if (forStep === 1) {
          if (forCurrentI <= forTarget) setForStep(2);
          else setForStep(4);
        } else if (forStep === 2) {
          setForStep(3);
          setForCurrentI(prev => prev + 1);
        } else if (forStep === 3) {
          setForStep(1);
        }
      } else {
        if (whileStep === 0) setWhileStep(1);
        else if (whileStep === 1) {
          if (currentWater < 100) setWhileStep(2);
          else setWhileStep(4);
        } else if (whileStep === 2) {
          setWhileStep(3);
          setCurrentWater(prev => Math.min(prev + 25, 100));
        } else if (whileStep === 3) {
          setWhileStep(1);
        }
      }
    }
  };

  // Tab definitions
  const tabs = [
    { 
      id: 'sequential', 
      label: '1. Sequential (Runtunan)', 
      icon: AlignJustify, 
      color: 'text-blue-400',
      activeBorder: 'border-blue-500',
      badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
      flowTitle: 'Aliran Data Lurus (Linear)',
      flowSubtitle: 'Instruksi mengalir satu arah dari atas ke bawah tanpa belokan.'
    },
    { 
      id: 'selection', 
      label: '2. Selection (Percabangan)', 
      icon: GitBranch, 
      color: 'text-violet-400',
      activeBorder: 'border-violet-500',
      badge: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
      flowTitle: 'Aliran Data Bercabang (Decision)',
      flowSubtitle: 'Aliran data memilih SATU dari beberapa jalur berdasarkan kondisi.'
    },
    { 
      id: 'looping', 
      label: '3. Looping (Perulangan)', 
      icon: Repeat, 
      color: 'text-emerald-400',
      activeBorder: 'border-emerald-500',
      badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      flowTitle: 'Aliran Data Berputar (Cycle)',
      flowSubtitle: 'Aliran data berputar kembali mengulang aksi selama syarat terpenuhi.'
    },
  ];

  const currentTabInfo = tabs.find(t => t.id === activeTab)!;

  const mainContentJSX = (
    <div 
      className={`transition-all duration-300 relative ${
        isMaximized 
          ? 'fixed top-0 left-0 right-0 bottom-0 inset-0 z-[99999] p-4 md:p-6 bg-slate-950/98 backdrop-blur-2xl flex flex-col justify-between w-screen h-screen overflow-y-auto text-slate-100 font-sans' 
          : 'border border-border/60 rounded-3xl overflow-hidden bg-slate-950 shadow-2xl mt-6'
      }`}
      style={isMaximized ? { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, margin: 0, width: '100vw', height: '100vh' } : {}}
    >
      
      {/* 1. TOP HEADER NAVIGATION TABS */}
      <div className="flex flex-wrap md:flex-nowrap border-b border-slate-800 bg-slate-900/90 text-slate-200">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-3 text-xs md:text-sm font-bold transition-all relative cursor-pointer ${
                isActive 
                  ? `${tab.color} bg-slate-950 border-b-2 ${tab.activeBorder}` 
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? tab.color : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. TOOLBAR CONTROLS BAR */}
      <div className="px-4 md:px-6 py-2.5 border-b border-slate-800/80 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Core Subtitle */}
        <div className="flex items-center gap-2.5">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border flex items-center gap-1.5 shadow-sm ${currentTabInfo.badge}`}>
            <Sparkles className="w-3 h-3" />
            {currentTabInfo.flowTitle}
          </span>
          <span className="hidden sm:inline-block text-xs text-slate-400">
            {currentTabInfo.flowSubtitle}
          </span>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 shadow-sm">
          {/* Play/Pause */}
          <button
            onClick={() => {
              if (activeTab === 'sequential' && seqStep >= 4) setSeqStep(0);
              if (activeTab === 'selection' && selStep >= 3) setSelStep(0);
              if (activeTab === 'looping') {
                if (loopMode === 'counted' && forStep >= 4) {
                  setForStep(0);
                  setForCurrentI(1);
                } else if (loopMode === 'conditional' && whileStep >= 4) {
                  setWhileStep(0);
                  setCurrentWater(initialWater);
                }
              }
              setIsPlaying(!isPlaying);
            }}
            className={`px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlaying 
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400' 
                : activeTab === 'sequential' 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                  : activeTab === 'selection' 
                    ? 'bg-violet-600 hover:bg-violet-500 text-white' 
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
            title={isPlaying ? "Jeda Simulasi" : "Jalankan Animasi Aliran Data"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Jeda' : 'Jalankan Aliran'}</span>
          </button>

          {/* Next Step */}
          <button
            onClick={handleNextStep}
            disabled={isPlaying}
            className="p-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
            title="Langkah Berikutnya"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Step</span>
          </button>

          {/* Reset */}
          <button
            onClick={resetAll}
            className="p-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
            title="Reset Aliran"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <div className="w-[1px] h-3.5 bg-slate-800 mx-0.5"></div>

          {/* Fullscreen Modal Toggle */}
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
            title={isMaximized ? "Perkecil (Esc)" : "Layar Penuh"}
          >
            {isMaximized ? <Minimize2 className="w-3.5 h-3.5 text-emerald-400" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

      {/* 3. MAIN WORKSPACE: FOCUSED DATA-FLOW VIEWER */}
      <div className="p-4 md:p-6 bg-slate-950 flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT SIDE: VECTOR FLOWCHART DATA FLOW ANIMATION (COL-SPAN 7)             */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 md:p-5 shadow-inner flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden">
            
            {/* ------------------------------------------------------------- */}
            {/* A. SEQUENTIAL FLOWCHART SVG                                   */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'sequential' && (
              <div className="w-full flex flex-col items-center">
                <svg className="w-full max-w-[260px] h-auto overflow-visible select-none" viewBox="0 0 260 320">
                  <defs>
                    <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                      <polygon points="0 1, 8 4, 0 7" fill="#3b82f6" />
                    </marker>
                    <marker id="arrow-dim" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                      <polygon points="0 1, 8 4, 0 7" fill="#475569" />
                    </marker>
                  </defs>

                  {/* Node 1: START */}
                  <rect x="75" y="8" width="110" height="28" rx="14" 
                    className={`transition-all duration-300 ${seqStep >= 1 ? 'fill-blue-600 stroke-white filter drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]' : 'fill-slate-950 stroke-slate-700'}`} strokeWidth="2" />
                  <text x="130" y="27" textAnchor="middle" className="fill-white font-bold text-xs font-sans">START</text>

                  {/* Flow 1 */}
                  <line x1="130" y1="36" x2="130" y2="65" 
                    className={`transition-all duration-300 ${seqStep >= 1 ? 'stroke-blue-500 stroke-[2.5]' : 'stroke-slate-700 stroke-[1.5]'}`} 
                    markerEnd={seqStep >= 1 ? 'url(#arrow-blue)' : 'url(#arrow-dim)'} />

                  {/* Node 2: Input Data */}
                  <polygon points="50,98 210,98 190,68 30,68" 
                    className={`transition-all duration-300 ${seqStep === 1 ? 'fill-blue-600 stroke-white filter drop-shadow-[0_0_15px_rgba(59,130,246,0.9)]' : 'fill-slate-950 stroke-slate-700'}`} strokeWidth="2" />
                  <text x="120" y="87" textAnchor="middle" className="fill-white font-bold text-xs font-mono">1. Masukkan Data</text>

                  {/* Flow 2 */}
                  <line x1="130" y1="98" x2="130" y2="128" 
                    className={`transition-all duration-300 ${seqStep >= 2 ? 'stroke-blue-500 stroke-[2.5]' : 'stroke-slate-700 stroke-[1.5]'}`} 
                    markerEnd={seqStep >= 2 ? 'url(#arrow-blue)' : 'url(#arrow-dim)'} />

                  {/* Node 3: Proses Hitung */}
                  <rect x="35" y="132" width="190" height="32" rx="6" 
                    className={`transition-all duration-300 ${seqStep === 2 ? 'fill-blue-600 stroke-white filter drop-shadow-[0_0_15px_rgba(59,130,246,0.9)]' : 'fill-slate-950 stroke-slate-700'}`} strokeWidth="2" />
                  <text x="130" y="153" textAnchor="middle" className="fill-white font-bold text-xs font-mono">2. Proses Perhitungan</text>

                  {/* Flow 3 */}
                  <line x1="130" y1="164" x2="130" y2="194" 
                    className={`transition-all duration-300 ${seqStep >= 3 ? 'stroke-blue-500 stroke-[2.5]' : 'stroke-slate-700 stroke-[1.5]'}`} 
                    markerEnd={seqStep >= 3 ? 'url(#arrow-blue)' : 'url(#arrow-dim)'} />

                  {/* Node 4: Tampilkan Hasil */}
                  <polygon points="50,228 210,228 190,198 30,198" 
                    className={`transition-all duration-300 ${seqStep === 3 ? 'fill-blue-600 stroke-white filter drop-shadow-[0_0_15px_rgba(59,130,246,0.9)]' : 'fill-slate-950 stroke-slate-700'}`} strokeWidth="2" />
                  <text x="120" y="217" textAnchor="middle" className="fill-white font-bold text-xs font-mono">3. Tampilkan Hasil</text>

                  {/* Flow 4 */}
                  <line x1="130" y1="228" x2="130" y2="258" 
                    className={`transition-all duration-300 ${seqStep >= 4 ? 'stroke-blue-500 stroke-[2.5]' : 'stroke-slate-700 stroke-[1.5]'}`} 
                    markerEnd={seqStep >= 4 ? 'url(#arrow-blue)' : 'url(#arrow-dim)'} />

                  {/* Node 5: STOP */}
                  <rect x="75" y="264" width="110" height="28" rx="14" 
                    className={`transition-all duration-300 ${seqStep === 4 ? 'fill-blue-600 stroke-white filter drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]' : 'fill-slate-950 stroke-slate-700'}`} strokeWidth="2" />
                  <text x="130" y="283" textAnchor="middle" className="fill-white font-bold text-xs font-sans">STOP</text>
                </svg>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* B. SELECTION FLOWCHART SVG (PERCABANGAN)                      */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'selection' && (
              <div className="w-full flex flex-col items-center">
                <svg className="w-full max-w-[340px] h-auto overflow-visible select-none" viewBox="0 0 340 330">
                  <defs>
                    <marker id="arrow-purple" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                      <polygon points="0 1, 8 4, 0 7" fill="#a855f7" />
                    </marker>
                    <marker id="arrow-emerald" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                      <polygon points="0 1, 8 4, 0 7" fill="#10b981" />
                    </marker>
                    <marker id="arrow-rose" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                      <polygon points="0 1, 8 4, 0 7" fill="#f43f5e" />
                    </marker>
                    <marker id="arrow-dim-branch" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                      <polygon points="0 1, 8 4, 0 7" fill="#475569" />
                    </marker>
                  </defs>

                  {/* START */}
                  <rect x="120" y="8" width="100" height="26" rx="13" 
                    className={`transition-all duration-300 ${selStep >= 1 ? 'fill-violet-600 stroke-white filter drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]' : 'fill-slate-950 stroke-slate-700'}`} strokeWidth="2" />
                  <text x="170" y="25" textAnchor="middle" className="fill-white font-bold text-xs font-sans">START</text>

                  {/* Flow to Diamond */}
                  <line x1="170" y1="34" x2="170" y2="60" 
                    className={`transition-all duration-300 ${selStep >= 1 ? 'stroke-violet-500 stroke-[2.5]' : 'stroke-slate-700 stroke-[1.5]'}`} 
                    markerEnd={selStep >= 1 ? 'url(#arrow-purple)' : 'url(#arrow-dim-branch)'} />

                  {/* Decision Diamond: Kondisi Terpenuhi? */}
                  <polygon points="170,62 230,95 170,128 110,95" 
                    className={`transition-all duration-300 ${selStep >= 1 ? 'fill-slate-950 stroke-violet-400 stroke-2 filter drop-shadow-[0_0_14px_rgba(139,92,246,0.6)]' : 'fill-slate-950 stroke-slate-700 stroke-2'}`} />
                  <text x="170" y="99" textAnchor="middle" className="fill-slate-100 font-bold text-[11px] font-sans">Kondisi Benar?</text>

                  {/* Left Branch: TRUE */}
                  <path d="M 110 95 L 65 95 L 65 145" fill="none"
                    className={`transition-all duration-300 ${selStep >= 2 && isConditionTrue ? 'stroke-emerald-400 stroke-[2.5]' : 'stroke-slate-700 stroke-[1.5]'}`} 
                    markerEnd={selStep >= 2 && isConditionTrue ? 'url(#arrow-emerald)' : 'url(#arrow-dim-branch)'} />
                  <text x="52" y="87" textAnchor="middle" className={`text-xs font-extrabold font-mono transition-colors ${isConditionTrue ? 'fill-emerald-400' : 'fill-slate-500'}`}>TRUE</text>

                  {/* Right Branch: FALSE */}
                  <path d="M 230 95 L 275 95 L 275 145" fill="none"
                    className={`transition-all duration-300 ${selStep >= 2 && !isConditionTrue ? 'stroke-rose-500 stroke-[2.5]' : 'stroke-slate-700 stroke-[1.5]'}`} 
                    markerEnd={selStep >= 2 && !isConditionTrue ? 'url(#arrow-rose)' : 'url(#arrow-dim-branch)'} />
                  <text x="288" y="87" textAnchor="middle" className={`text-xs font-extrabold font-mono transition-colors ${!isConditionTrue ? 'fill-rose-400' : 'fill-slate-500'}`}>FALSE</text>

                  {/* Branch Action Left (Aksi Cabang A) */}
                  <rect x="15" y="150" width="100" height="32" rx="6" 
                    className={`transition-all duration-300 ${selStep === 2 && isConditionTrue ? 'fill-emerald-600 stroke-white filter drop-shadow-[0_0_15px_rgba(16,185,129,0.9)]' : 'fill-slate-950 stroke-slate-700'}`} strokeWidth="2" />
                  <text x="65" y="170" textAnchor="middle" className="fill-white font-bold text-[11px] font-sans">Jalur Aksi A</text>

                  {/* Branch Action Right (Aksi Cabang B) */}
                  <rect x="225" y="150" width="100" height="32" rx="6" 
                    className={`transition-all duration-300 ${selStep === 2 && !isConditionTrue ? 'fill-rose-600 stroke-white filter drop-shadow-[0_0_15px_rgba(244,63,94,0.9)]' : 'fill-slate-950 stroke-slate-700'}`} strokeWidth="2" />
                  <text x="275" y="170" textAnchor="middle" className="fill-white font-bold text-[11px] font-sans">Jalur Aksi B</text>

                  {/* Connector Merging Back */}
                  <path d="M 65 182 L 65 230 L 170 230" fill="none"
                    className={`transition-all duration-300 ${selStep >= 3 && isConditionTrue ? 'stroke-violet-400 stroke-[2]' : 'stroke-slate-700 stroke-[1.5]'}`} />
                  <path d="M 275 182 L 275 230 L 170 230" fill="none"
                    className={`transition-all duration-300 ${selStep >= 3 && !isConditionTrue ? 'stroke-violet-400 stroke-[2]' : 'stroke-slate-700 stroke-[1.5]'}`} />

                  {/* Flow to STOP */}
                  <line x1="170" y1="230" x2="170" y2="260" 
                    className={`transition-all duration-300 ${selStep >= 3 ? 'stroke-violet-500 stroke-[2.5]' : 'stroke-slate-700 stroke-[1.5]'}`} 
                    markerEnd={selStep >= 3 ? 'url(#arrow-purple)' : 'url(#arrow-dim-branch)'} />

                  {/* STOP */}
                  <rect x="120" y="264" width="100" height="26" rx="13" 
                    className={`transition-all duration-300 ${selStep === 3 ? 'fill-violet-600 stroke-white filter drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]' : 'fill-slate-950 stroke-slate-700'}`} strokeWidth="2" />
                  <text x="170" y="281" textAnchor="middle" className="fill-white font-bold text-xs font-sans">STOP</text>
                </svg>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* C. LOOPING FLOWCHART SVG (COUNTED FOR vs CONDITIONAL WHILE)   */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'looping' && (
              <div className="w-full flex flex-col items-center">
                <svg className="w-full max-w-[360px] h-auto overflow-visible select-none" viewBox="0 0 360 330">
                  <defs>
                    <marker id="arrow-emerald-loop" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                      <polygon points="0 1, 8 4, 0 7" fill="#10b981" />
                    </marker>
                    <marker id="arrow-rose-loop" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                      <polygon points="0 1, 8 4, 0 7" fill="#f43f5e" />
                    </marker>
                    <marker id="arrow-dim-loop" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                      <polygon points="0 1, 8 4, 0 7" fill="#475569" />
                    </marker>
                  </defs>

                  {/* START */}
                  <rect x="130" y="8" width="90" height="26" rx="13" 
                    className={`transition-all duration-300 ${((loopMode === 'counted' && forStep >= 1) || (loopMode === 'conditional' && whileStep >= 1)) ? 'fill-emerald-600 stroke-white filter drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'fill-slate-950 stroke-slate-700'}`} strokeWidth="2" />
                  <text x="175" y="25" textAnchor="middle" className="fill-white font-bold text-xs font-sans">START</text>

                  {/* Flow to Looping Symbol */}
                  <line x1="175" y1="34" x2="175" y2="68" 
                    className={`transition-all duration-300 ${((loopMode === 'counted' && forStep >= 1) || (loopMode === 'conditional' && whileStep >= 1)) ? 'stroke-emerald-500 stroke-[2.5]' : 'stroke-slate-700 stroke-[1.5]'}`} 
                    markerEnd={((loopMode === 'counted' && forStep >= 1) || (loopMode === 'conditional' && whileStep >= 1)) ? 'url(#arrow-emerald-loop)' : 'url(#arrow-dim-loop)'} />

                  {/* ========================================================================= */}
                  {/* MODE 1: COUNTED LOOP (SEGI ENAM / PREPARATION / FOR)                     */}
                  {/* ========================================================================= */}
                  {loopMode === 'counted' ? (
                    <>
                      {/* Hexagon Symbol */}
                      <polygon points="100,92 122,72 228,72 250,92 228,112 122,112" 
                        className={`transition-all duration-300 ${forStep === 1 ? 'fill-slate-950 stroke-emerald-400 stroke-2 filter drop-shadow-[0_0_18px_rgba(16,185,129,0.7)]' : 'fill-slate-950 stroke-slate-700 stroke-2'}`} />
                      <text x="175" y="96" textAnchor="middle" className="fill-emerald-300 font-bold text-xs font-mono">for i = 1 to {forTarget}</text>

                      {/* TRUE Path */}
                      <line x1="175" y1="112" x2="175" y2="150" 
                        className={`transition-all duration-300 ${forStep >= 2 && forStep < 4 ? 'stroke-emerald-400 stroke-[2.5]' : 'stroke-slate-700 stroke-[1.5]'}`} 
                        markerEnd={forStep >= 2 && forStep < 4 ? 'url(#arrow-emerald-loop)' : 'url(#arrow-dim-loop)'} />
                      <text x="190" y="136" textAnchor="start" className="fill-emerald-400 text-[10px] font-bold font-mono">TRUE</text>

                      {/* Action Body */}
                      <rect x="95" y="155" width="160" height="34" rx="6" 
                        className={`transition-all duration-300 ${forStep === 2 ? 'fill-emerald-600 stroke-white filter drop-shadow-[0_0_15px_rgba(16,185,129,0.9)]' : 'fill-slate-950 stroke-slate-700'}`} strokeWidth="2" />
                      <text x="175" y="176" textAnchor="middle" className="fill-white font-bold text-xs font-sans">Eksekusi Tugas Berulang</text>

                      {/* Loop Back Arc */}
                      <path d="M 175 189 L 175 225 L 45 225 L 45 92 L 93 92" fill="none"
                        className={`transition-all duration-300 ${forStep === 3 ? 'stroke-emerald-400 stroke-[2.5] stroke-dasharray-[5_3]' : 'stroke-slate-700 stroke-[1.5]'}`} 
                        markerEnd={forStep === 3 ? 'url(#arrow-emerald-loop)' : 'url(#arrow-dim-loop)'} />
                      <text x="32" y="165" textAnchor="middle" transform="rotate(-90 32 165)" className="fill-emerald-400 text-[10px] font-bold font-sans">Putar Balik</text>

                      {/* FALSE / Selesai Path */}
                      <path d="M 250 92 L 305 92 L 305 255" fill="none"
                        className={`transition-all duration-300 ${forStep === 4 ? 'stroke-rose-500 stroke-[2.5]' : 'stroke-slate-700 stroke-[1.5]'}`} 
                        markerEnd={forStep === 4 ? 'url(#arrow-rose-loop)' : 'url(#arrow-dim-loop)'} />
                      <text x="275" y="84" textAnchor="middle" className={`text-[10px] font-extrabold font-mono transition-colors ${forStep === 4 ? 'fill-rose-400' : 'fill-slate-500'}`}>SELESAI</text>
                    </>
                  ) : (
                    <>
                      {/* ========================================================================= */}
                      {/* MODE 2: CONDITIONAL LOOP (BELAH KETUPAT / DECISION / WHILE - TANGKI AIR)  */}
                      {/* ========================================================================= */}

                      {/* Diamond Symbol */}
                      <polygon points="175,62 245,95 175,128 105,95" 
                        className={`transition-all duration-300 ${whileStep === 1 ? 'fill-slate-950 stroke-emerald-400 stroke-2 filter drop-shadow-[0_0_18px_rgba(16,185,129,0.7)]' : 'fill-slate-950 stroke-slate-700 stroke-2'}`} />
                      <text x="175" y="99" textAnchor="middle" className="fill-emerald-300 font-bold text-[11px] font-mono">Air &lt; 100%?</text>

                      {/* TRUE Path */}
                      <line x1="175" y1="128" x2="175" y2="155" 
                        className={`transition-all duration-300 ${whileStep >= 2 && whileStep < 4 ? 'stroke-emerald-400 stroke-[2.5]' : 'stroke-slate-700 stroke-[1.5]'}`} 
                        markerEnd={whileStep >= 2 && whileStep < 4 ? 'url(#arrow-emerald-loop)' : 'url(#arrow-dim-loop)'} />
                      <text x="190" y="145" textAnchor="start" className="fill-emerald-400 text-[10px] font-bold font-mono">TRUE (Isi)</text>

                      {/* Action Body: Pompa Air */}
                      <rect x="90" y="160" width="170" height="34" rx="6" 
                        className={`transition-all duration-300 ${whileStep === 2 ? 'fill-cyan-600 stroke-white filter drop-shadow-[0_0_15px_rgba(6,182,212,0.9)]' : 'fill-slate-950 stroke-slate-700'}`} strokeWidth="2" />
                      <text x="175" y="181" textAnchor="middle" className="fill-white font-bold text-xs font-sans">Pompa Isi Air (+25%)</text>

                      {/* Loop Back Arc (Returns into Diamond at 105, 95) */}
                      <path d="M 175 194 L 175 225 L 45 225 L 45 95 L 98 95" fill="none"
                        className={`transition-all duration-300 ${whileStep === 3 ? 'stroke-emerald-400 stroke-[2.5] stroke-dasharray-[5_3]' : 'stroke-slate-700 stroke-[1.5]'}`} 
                        markerEnd={whileStep === 3 ? 'url(#arrow-emerald-loop)' : 'url(#arrow-dim-loop)'} />
                      <text x="32" y="165" textAnchor="middle" transform="rotate(-90 32 165)" className="fill-emerald-400 text-[10px] font-bold font-sans">Cek Ulang</text>

                      {/* FALSE Path (Tangki Penuh -> STOP) */}
                      <path d="M 245 95 L 305 95 L 305 255" fill="none"
                        className={`transition-all duration-300 ${whileStep === 4 ? 'stroke-rose-500 stroke-[2.5]' : 'stroke-slate-700 stroke-[1.5]'}`} 
                        markerEnd={whileStep === 4 ? 'url(#arrow-rose-loop)' : 'url(#arrow-dim-loop)'} />
                      <text x="275" y="87" textAnchor="middle" className={`text-[10px] font-extrabold font-mono transition-colors ${whileStep === 4 ? 'fill-rose-400' : 'fill-slate-500'}`}>FALSE (Penuh)</text>
                    </>
                  )}

                  {/* STOP */}
                  <rect x="260" y="260" width="90" height="26" rx="13" 
                    className={`transition-all duration-300 ${((loopMode === 'counted' && forStep === 4) || (loopMode === 'conditional' && whileStep === 4)) ? 'fill-rose-600 stroke-white filter drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]' : 'fill-slate-950 stroke-slate-700'}`} strokeWidth="2" />
                  <text x="305" y="277" textAnchor="middle" className="fill-white font-bold text-xs font-sans">STOP</text>
                </svg>
              </div>
            )}

            {/* Bottom Realtime Status Text */}
            <div className="w-full mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="font-sans">Status Aliran:</span>
              <span className="font-bold font-mono text-slate-200">
                {activeTab === 'sequential' && (
                  seqStep === 0 ? "Siap menjalankan aliran linear..." :
                  seqStep === 1 ? "1. Aliran data masuk ke proses input" :
                  seqStep === 2 ? "2. Aliran data diproses secara matematis" :
                  seqStep === 3 ? "3. Aliran data dikeluarkan ke layar" :
                  "4. Program selesai dieksekusi lurus 1 arah"
                )}
                {activeTab === 'selection' && (
                  selStep === 0 ? "Siap mengevaluasi cabang..." :
                  selStep === 1 ? `Mengevaluasi kondisi -> ${isConditionTrue ? 'BENAR (True)' : 'SALAH (False)'}` :
                  selStep === 2 ? `Aliran data memilih ${isConditionTrue ? 'Jalur Aksi A' : 'Jalur Aksi B'}` :
                  "Aliran data selesai dan keluar ke STOP"
                )}
                {activeTab === 'looping' && (
                  loopMode === 'counted' ? (
                    forStep === 0 ? "Siap memulai putaran pencacah (FOR)..." :
                    forStep === 1 ? `Mengecek pencacah (i = ${forCurrentI} dari ${forTarget})` :
                    forStep === 2 ? `Aliran data mengeksekusi putaran ke-${forCurrentI}` :
                    forStep === 3 ? "Aliran data berputar kembali ke atas (Increment)" :
                    `Perulangan FOR selesai (${forTarget} putaran tuntas)!`
                  ) : (
                    whileStep === 0 ? "Siap menjalankan pompa bersyarat (WHILE)..." :
                    whileStep === 1 ? `Mengecek kondisi: Level Air (${currentWater}%) < 100%? -> ${currentWater < 100 ? 'BENAR (Pompa Jalan)' : 'SALAH (Sudah Penuh)'}` :
                    whileStep === 2 ? `Pompa mengisi air (+25%) -> Level menjadi ${Math.min(currentWater + 25, 100)}%` :
                    whileStep === 3 ? "Aliran berputar kembali mengecek sensor level air" :
                    `Kondisi Air >= 100% (False)! Pompa otomatis mati dan keluar ke STOP.`
                  )
                )}
              </span>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE: ESSENCE OF DATA FLOW & INTERACTIVE TRIGGER (COL-SPAN 5)       */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Selection Branch Trigger */}
            {activeTab === 'selection' && (
              <div className="bg-slate-900/90 border border-violet-500/30 rounded-2xl p-4 shadow-md space-y-2">
                <span className="text-xs font-bold text-violet-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-violet-400" />
                  Uji Pilihan Cabang:
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsConditionTrue(true);
                      setSelStep(0);
                      setIsPlaying(false);
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isConditionTrue 
                        ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold' 
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Kondisi TRUE (Aksi A)
                  </button>
                  <button
                    onClick={() => {
                      setIsConditionTrue(false);
                      setSelStep(0);
                      setIsPlaying(false);
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      !isConditionTrue 
                        ? 'bg-rose-500 text-white shadow-md font-extrabold' 
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    Kondisi FALSE (Aksi B)
                  </button>
                </div>
              </div>
            )}

            {/* Looping Mode & Parameter Trigger */}
            {activeTab === 'looping' && (
              <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 shadow-md space-y-3">
                
                {/* Mode Selector: FOR vs WHILE */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block mb-1.5 font-sans">
                    Pilih Jenis Perulangan:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => {
                        setLoopMode('counted');
                        resetAll();
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        loopMode === 'counted' 
                          ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>⬡ 1. Jumlah Pasti (FOR)</span>
                    </button>

                    <button
                      onClick={() => {
                        setLoopMode('conditional');
                        resetAll();
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        loopMode === 'conditional' 
                          ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>🔷 2. Bersyarat (WHILE)</span>
                    </button>
                  </div>
                </div>

                {/* MODE 1: FOR Param -> Number of Iterations */}
                {loopMode === 'counted' ? (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                        <Repeat className="w-3.5 h-3.5 text-emerald-400" />
                        Target Putaran (Pasti):
                      </span>
                      <span className="text-xs font-extrabold font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/40">
                        {forTarget} Kali
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          onClick={() => {
                            setForTarget(num);
                            resetAll();
                          }}
                          className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            forTarget === num 
                              ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md' 
                              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {num}&times;
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* MODE 2: WHILE Param -> Water Tank Level Simulator */
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-300 flex items-center gap-1">
                        <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                        Level Air Saat Ini:
                      </span>
                      <span className={`text-xs font-extrabold font-mono px-2 py-0.5 rounded border ${
                        currentWater < 100 
                          ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' 
                          : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                      }`}>
                        {currentWater}% {currentWater >= 100 ? '(Penuh)' : '(Belum Penuh)'}
                      </span>
                    </div>

                    {/* Progress Bar of Water Tank */}
                    <div className="w-full bg-slate-950 h-3 rounded-full border border-slate-800 overflow-hidden p-0.5">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${currentWater}%` }}
                      />
                    </div>

                    {/* Quick Preset Buttons */}
                    <div className="flex gap-1.5 pt-1">
                      <button
                        onClick={() => {
                          setInitialWater(0);
                          setCurrentWater(0);
                          setWhileStep(0);
                          setIsPlaying(false);
                        }}
                        className={`flex-1 py-1 px-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          initialWater === 0 ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Mulai 0%
                      </button>
                      <button
                        onClick={() => {
                          setInitialWater(50);
                          setCurrentWater(50);
                          setWhileStep(0);
                          setIsPlaying(false);
                        }}
                        className={`flex-1 py-1 px-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          initialWater === 50 ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Mulai 50%
                      </button>
                      <button
                        onClick={() => {
                          setInitialWater(100);
                          setCurrentWater(100);
                          setWhileStep(0);
                          setIsPlaying(false);
                        }}
                        className={`flex-1 py-1 px-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          initialWater === 100 ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                        title="Jika mulai 100%, WHILE akan berputar 0 kali!"
                      >
                        Penuh (100%)
                      </button>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* Three Pillars of Understanding (Inti Konsep, Karakteristik, Analogi) */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-md space-y-3.5 text-xs text-slate-300">
              
              {/* Inti Aliran Data */}
              <div>
                <h5 className="font-bold text-slate-100 flex items-center gap-1.5 mb-1">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  Inti Aliran Data:
                </h5>
                <p className="text-slate-300 leading-relaxed">
                  {activeTab === 'sequential' && "Data dieksekusi langkah demi langkah secara lurus dari awal sampai akhir. Tidak ada baris yang dilewati dan tidak ada instruksi yang melompat."}
                  {activeTab === 'selection' && "Program memiliki jalur bercabang. Aliran data mengevaluasi suatu syarat logika dan hanya mengeksekusi SATU jalur yang tepat."}
                  {activeTab === 'looping' && (
                    loopMode === 'counted'
                      ? "Jumlah putaran (N kali) sudah ditentukan pasti sejak awal. Simbol Segi Enam (Preparation) mengendalikan pencacah dari nilai awal sampai batas akhir."
                      : "Jumlah putaran TIDAK ditentukan angka, melainkan berhenti saat kondisi bernilai False (Air >= 100%). Perulangan bisa berjalan 0 kali jika dari awal sudah penuh!"
                  )}
                </p>
              </div>

              {/* Ciri Kunci & Simbol Baku */}
              <div className="pt-2 border-t border-slate-800/80">
                <h5 className="font-bold text-slate-100 flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Standar Simbol Flowchart:
                </h5>
                <ul className="text-slate-300 space-y-1 pl-4 list-disc leading-relaxed">
                  {activeTab === 'sequential' && (
                    <>
                      <li>Hanya memiliki <strong>1 pintu masuk</strong> dan <strong>1 pintu keluar</strong>.</li>
                      <li>Urutan instruksi menentukan hasil akhir komputasi.</li>
                    </>
                  )}
                  {activeTab === 'selection' && (
                    <>
                      <li>Menggunakan simbol <strong>🔷 Belah Ketupat (*Decision*)</strong> untuk menguji kondisi.</li>
                      <li>Jalur saling lepas (<em>mutually exclusive</em>), hanya 1 cabang yang dijalankan.</li>
                    </>
                  )}
                  {activeTab === 'looping' && (
                    loopMode === 'counted' ? (
                      <>
                        <li><strong>⬡ Simbol Segi Enam (*Preparation*):</strong> Khusus perulangan dengan jumlah putaran yang sudah pasti sejak awal (<code>FOR</code>).</li>
                        <li>Menyatukan nilai awal, batas akhir, dan pertambahan counter dalam 1 blok.</li>
                      </>
                    ) : (
                      <>
                        <li><strong>🔷 Simbol Belah Ketupat (*Decision*):</strong> Khusus perulangan yang bergantung pada perubahan kondisi (<code>WHILE</code>).</li>
                        <li>Berhenti otomatis saat aksi di dalam loop mengubah kondisi menjadi <strong>FALSE</strong>.</li>
                      </>
                    )
                  )}
                </ul>
              </div>

              {/* Analogi Nyata */}
              <div className="pt-2 border-t border-slate-800/80">
                <h5 className="font-bold text-slate-100 flex items-center gap-1.5 mb-1">
                  <Coffee className="w-4 h-4 text-amber-400" />
                  Analogi Sederhana di Kehidupan:
                </h5>
                <p className="text-slate-300 italic leading-relaxed">
                  {activeTab === 'sequential' && '"Resep Membuat Kopi: Masukkan bubuk -> Tuang air panas -> Aduk. Harus urut dari atas ke bawah."'}
                  {activeTab === 'selection' && '"Persimpangan Rel Kereta: Kereta hanya bisa memilih jalur rel kiri ATAU kanan, tidak bisa keduanya."'}
                  {activeTab === 'looping' && (
                    loopMode === 'counted'
                      ? '"Putaran Lapangan Olahraga: Berlari mengitari lapangan tepat sebanyak 3 putaran (Target pasti)."'
                      : '"Pompa Air Otomatis: Pompa terus menyala mengisi air SELAMA tangki belum penuh (< 100%). Begitu penuh, pompa langsung mati."'
                  )}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );

  if (isMaximized && mounted) {
    return createPortal(mainContentJSX, document.body);
  }

  return mainContentJSX;
}
