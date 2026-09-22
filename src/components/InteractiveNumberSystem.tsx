"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Hash, Zap, Cpu, Settings2, Grip } from 'lucide-react';

type Tab = 'decimal' | 'binary' | 'octal' | 'hex';

export default function InteractiveNumberSystem() {
  const [activeTab, setActiveTab] = useState<Tab>('binary');

  // State for Decimal (3 digits)
  const [decVals, setDecVals] = useState([3, 2, 5]);

  // State for Binary (8 bits)
  const [binVals, setBinVals] = useState([0, 1, 0, 1, 1, 0, 1, 0]);

  // State for Octal (3 digits 0-7)
  const [octVals, setOctVals] = useState([4, 5, 6]);

  // State for Hex (2 digits 0-15)
  const [hexVals, setHexVals] = useState([10, 5]); // A, 5

  const hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

  const handleDecChange = (idx: number, delta: number) => {
    const newVals = [...decVals];
    newVals[idx] = Math.max(0, Math.min(9, newVals[idx] + delta));
    setDecVals(newVals);
  };

  const handleBinToggle = (idx: number) => {
    const newVals = [...binVals];
    newVals[idx] = newVals[idx] === 1 ? 0 : 1;
    setBinVals(newVals);
  };

  const handleOctChange = (idx: number, delta: number) => {
    const newVals = [...octVals];
    newVals[idx] = Math.max(0, Math.min(7, newVals[idx] + delta));
    setOctVals(newVals);
  };

  const handleHexChange = (idx: number, delta: number) => {
    const newVals = [...hexVals];
    newVals[idx] = Math.max(0, Math.min(15, newVals[idx] + delta));
    setHexVals(newVals);
  };

  const tabs = [
    { id: 'decimal', label: 'Desimal (10)', icon: Hash, color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-600 dark:bg-blue-500' },
    { id: 'binary', label: 'Biner (2)', icon: Zap, color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-600 dark:bg-emerald-500' },
    { id: 'octal', label: 'Oktal (8)', icon: Settings2, color: 'text-amber-800 dark:text-yellow-400', bg: 'bg-amber-600 dark:bg-yellow-500' },
    { id: 'hex', label: 'Heksadesimal (16)', icon: Grip, color: 'text-purple-700 dark:text-purple-400', bg: 'bg-purple-600 dark:bg-purple-500' },
  ];

  return (
    <div className="border border-border/50 rounded-2xl overflow-hidden bg-background shadow-lg">
      
      {/* Header Tabs */}
      <div className="flex flex-wrap md:flex-nowrap border-b border-border/50 bg-secondary/20">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-2 text-sm font-semibold transition-all relative ${
                isActive ? `${tab.color} bg-background font-bold` : 'text-slate-700 dark:text-slate-300 font-semibold hover:bg-secondary/40 hover:text-foreground'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? tab.color : 'text-slate-500 dark:text-slate-400'}`} />
              {tab.label}
              {isActive && (
                <motion.div 
                  layoutId="activeTabBottom"
                  className={`absolute bottom-0 left-0 right-0 h-1 ${tab.bg}`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="p-4 md:p-6 min-h-[350px] flex flex-col justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* DECIMAL MODE */}
          {activeTab === 'decimal' && (
            <motion.div 
              key="decimal"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold">Sistem Desimal (Basis 10)</h3>
                <p className="text-slate-700 dark:text-slate-300 font-medium">Sistem yang kita gunakan sehari-hari. Memiliki 10 simbol (0-9).</p>
              </div>

              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {decVals.map((val, idx) => {
                  const power = 2 - idx; // 10^2, 10^1, 10^0
                  const multiplier = Math.pow(10, power);
                  return (
                    <div key={idx} className="flex flex-col items-center gap-4">
                      <div className="text-sm font-bold text-slate-700 dark:text-slate-300">10<sup className="text-[10px]">{power}</sup> = {multiplier}</div>
                      <div className="flex flex-col items-center gap-2 bg-secondary/30 p-3 md:p-4 rounded-xl border border-border/50">
                        <button onClick={() => handleDecChange(idx, 1)} className="w-10 h-8 md:h-10 rounded-lg bg-slate-200 dark:bg-secondary hover:bg-slate-300 dark:hover:bg-secondary/80 text-slate-800 dark:text-slate-100 flex items-center justify-center text-xl font-bold transition-colors">▲</button>
                        <div className="text-5xl md:text-6xl font-black text-blue-700 dark:text-blue-400 w-16 text-center">{val}</div>
                        <button onClick={() => handleDecChange(idx, -1)} className="w-10 h-8 md:h-10 rounded-lg bg-slate-200 dark:bg-secondary hover:bg-slate-300 dark:hover:bg-secondary/80 text-slate-800 dark:text-slate-100 flex items-center justify-center text-xl font-bold transition-colors">▼</button>
                      </div>
                      <div className="text-lg md:text-xl font-bold text-blue-800 dark:text-blue-300">{val} × {multiplier}</div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 md:mt-8 p-4 md:p-6 bg-blue-500/5 rounded-2xl border border-blue-500/20 text-center">
                <div className="text-lg text-slate-800 dark:text-slate-200 font-mono font-bold mb-2">
                  ({decVals[0]} × 100) + ({decVals[1]} × 10) + ({decVals[2]} × 1)
                </div>
                <div className="text-4xl font-black text-foreground">
                  = <span className="text-blue-700 dark:text-blue-400 font-black">{decVals[0] * 100 + decVals[1] * 10 + decVals[2]}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* BINARY MODE */}
          {activeTab === 'binary' && (
            <motion.div 
              key="binary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold">Sistem Biner (Basis 2)</h3>
                <p className="text-slate-700 dark:text-slate-300 font-medium">Bahasa mesin. Hanya memiliki 2 simbol: 0 (Mati) dan 1 (Menyala).</p>
              </div>

              <div className="flex justify-center gap-1 sm:gap-2 w-full pb-4 px-1">
                {binVals.map((val, idx) => {
                  const power = 7 - idx; // 2^7 to 2^0
                  const multiplier = Math.pow(2, power);
                  const isOn = val === 1;
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2 md:gap-3">
                      <div className="text-[10px] md:text-xs font-bold text-slate-700 dark:text-slate-300 hidden sm:block">2<sup className="text-[8px] md:text-[10px]">{power}</sup></div>
                      <div className="text-xs md:text-sm font-black text-slate-900 dark:text-white">{multiplier}</div>
                      
                      <button 
                        onClick={() => handleBinToggle(idx)}
                        className={`w-9 h-14 sm:w-12 sm:h-20 md:w-16 md:h-24 rounded-lg md:rounded-xl border-2 flex flex-col items-center justify-between py-1 md:py-2 transition-all duration-300 relative overflow-hidden group shrink-0 ${
                          isOn ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-slate-300 dark:border-border/50 bg-slate-100 dark:bg-secondary/30 hover:border-emerald-500/50'
                        }`}
                      >
                        <div className={`text-sm sm:text-lg md:text-2xl font-black z-10 transition-colors ${isOn ? 'text-emerald-700 dark:text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]' : 'text-slate-600 dark:text-slate-400'}`}>
                          {val}
                        </div>
                        <div className={`w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center z-10 transition-colors ${isOn ? 'bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-slate-200 dark:bg-secondary text-slate-700 dark:text-slate-300 font-bold'}`}>
                          <Lightbulb className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 ${isOn ? 'fill-white' : ''}`} />
                        </div>
                        
                        {/* Background slider for switch effect */}
                        <div className={`absolute inset-x-0 h-1/2 transition-all duration-300 ${isOn ? 'top-0 bg-emerald-500/10' : 'bottom-0 bg-black/10 dark:bg-white/5'}`} />
                      </button>

                      <div className={`text-xs md:text-sm font-bold transition-colors ${isOn ? 'text-emerald-700 dark:text-emerald-400 font-black' : 'text-slate-600 dark:text-slate-400 font-bold'}`}>
                        {isOn ? multiplier : 0}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 md:mt-8 p-4 md:p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 text-center">
                <div className="text-xs md:text-sm text-slate-800 dark:text-slate-200 font-mono font-semibold mb-2 md:mb-4 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto leading-relaxed">
                  {binVals.map((val, idx) => {
                    const multiplier = Math.pow(2, 7 - idx);
                    const isLast = idx === 7;
                    return (
                      <span key={idx} className={val === 1 ? 'text-emerald-700 dark:text-emerald-400 font-black' : 'text-slate-500 dark:text-slate-400'}>
                        ({val}×{multiplier}){isLast ? '' : ' + '}
                      </span>
                    );
                  })}
                </div>
                <div className="text-4xl font-black text-foreground flex items-center justify-center gap-4">
                  <span>Total = </span>
                  <span className="text-emerald-700 dark:text-emerald-400 drop-shadow-sm font-black">
                    {binVals.reduce((acc, val, idx) => acc + (val * Math.pow(2, 7 - idx)), 0)}
                  </span>
                  <span className="text-xl text-slate-700 dark:text-slate-300 font-bold mt-2">Desimal</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* OCTAL MODE */}
          {activeTab === 'octal' && (
            <motion.div 
              key="octal"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold">Sistem Oktal (Basis 8)</h3>
                <p className="text-slate-700 dark:text-slate-300 font-medium">Sering digunakan dalam komputasi awal. Memiliki 8 simbol (0-7).</p>
              </div>

              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {octVals.map((val, idx) => {
                  const power = 2 - idx; // 8^2, 8^1, 8^0
                  const multiplier = Math.pow(8, power);
                  return (
                    <div key={idx} className="flex flex-col items-center gap-4">
                      <div className="text-sm font-bold text-slate-700 dark:text-slate-300">8<sup className="text-[10px]">{power}</sup> = {multiplier}</div>
                      <div className="flex flex-col items-center gap-2 bg-secondary/30 p-3 md:p-4 rounded-xl border border-border/50">
                        <button onClick={() => handleOctChange(idx, 1)} className="w-10 h-8 md:h-10 rounded-lg bg-slate-200 dark:bg-secondary hover:bg-slate-300 dark:hover:bg-secondary/80 text-slate-800 dark:text-slate-100 flex items-center justify-center text-xl font-bold transition-colors">▲</button>
                        <div className="text-5xl md:text-6xl font-black text-amber-800 dark:text-yellow-400 w-16 text-center drop-shadow-sm">{val}</div>
                        <button onClick={() => handleOctChange(idx, -1)} className="w-10 h-8 md:h-10 rounded-lg bg-slate-200 dark:bg-secondary hover:bg-slate-300 dark:hover:bg-secondary/80 text-slate-800 dark:text-slate-100 flex items-center justify-center text-xl font-bold transition-colors">▼</button>
                      </div>
                      <div className="text-lg md:text-xl font-bold text-amber-900 dark:text-yellow-300">{val} × {multiplier}</div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 md:mt-8 p-4 md:p-6 bg-yellow-500/5 rounded-2xl border border-yellow-500/20 text-center">
                <div className="text-lg text-slate-800 dark:text-slate-200 font-mono font-bold mb-2">
                  ({octVals[0]} × 64) + ({octVals[1]} × 8) + ({octVals[2]} × 1)
                </div>
                <div className="text-4xl font-black text-foreground">
                  = <span className="text-amber-800 dark:text-yellow-400 font-black">{octVals[0] * 64 + octVals[1] * 8 + octVals[2]}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* HEXADECIMAL MODE */}
          {activeTab === 'hex' && (
            <motion.div 
              key="hex"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold">Sistem Heksadesimal (Basis 16)</h3>
                <p className="text-slate-700 dark:text-slate-300 font-medium">Standar untuk alamat memori dan warna. Memiliki 16 simbol (0-9, A-F).</p>
              </div>

              <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                {hexVals.map((val, idx) => {
                  const power = 1 - idx; // 16^1, 16^0
                  const multiplier = Math.pow(16, power);
                  const char = hexChars[val];
                  const isAlpha = val > 9;
                  return (
                    <div key={idx} className="flex flex-col items-center gap-4">
                      <div className="text-sm font-bold text-slate-700 dark:text-slate-300">16<sup className="text-[10px]">{power}</sup> = {multiplier}</div>
                      
                      <div className="flex flex-col items-center gap-2 relative">
                        <button onClick={() => handleHexChange(idx, 1)} className="w-12 h-8 md:h-10 rounded-lg bg-slate-200 dark:bg-secondary hover:bg-slate-300 dark:hover:bg-secondary/80 text-slate-800 dark:text-slate-100 flex items-center justify-center text-xl font-bold transition-colors">▲</button>
                        
                        <div className={`w-24 h-28 md:w-28 md:h-32 flex flex-col items-center justify-center rounded-2xl border-4 shadow-lg ${isAlpha ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'bg-secondary/30 border-border/50'}`}>
                          <div className={`text-6xl md:text-7xl font-black ${isAlpha ? 'text-purple-700 dark:text-purple-400' : 'text-slate-900 dark:text-white'}`}>
                            {char}
                          </div>
                        </div>

                        <button onClick={() => handleHexChange(idx, -1)} className="w-12 h-8 md:h-10 rounded-lg bg-slate-200 dark:bg-secondary hover:bg-slate-300 dark:hover:bg-secondary/80 text-slate-800 dark:text-slate-100 flex items-center justify-center text-xl font-bold transition-colors">▼</button>

                        {/* Tooltip for A-F */}
                        <AnimatePresence>
                          {isAlpha && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-1/2 -right-14 md:-right-16 -translate-y-1/2 bg-purple-600 text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 md:py-1.5 rounded-lg shadow-xl z-20"
                            >
                              = {val}
                              <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-purple-600"></div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className={`text-lg md:text-xl font-bold ${isAlpha ? 'text-purple-800 dark:text-purple-300' : 'text-slate-800 dark:text-slate-200'}`}>
                        {val} × {multiplier}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 md:mt-8 p-4 md:p-6 bg-purple-500/5 rounded-2xl border border-purple-500/20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10">
                  <div className="text-lg text-slate-800 dark:text-slate-200 font-mono font-bold mb-2">
                    ({hexVals[0]} × 16) + ({hexVals[1]} × 1)
                  </div>
                  <div className="text-5xl font-black text-foreground">
                    = <span className="text-purple-700 dark:text-purple-400 drop-shadow-md font-black">{hexVals[0] * 16 + hexVals[1]}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
