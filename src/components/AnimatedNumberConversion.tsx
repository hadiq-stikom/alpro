"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DivideCircle, Scissors, ArrowDownToLine, RefreshCw, Layers, Lightbulb, ChevronDown, ArrowRightLeft, Spline } from 'lucide-react';

type Tab = 'dec-to-bin' | 'bin-to-oct' | 'bin-to-hex';

export default function AnimatedNumberConversion() {
  const [activeTab, setActiveTab] = useState<Tab>('dec-to-bin');

  // --- State for Mode 1: Dec to Bin ---
  const [decInput, setDecInput] = useState(179);
  const [divisionSteps, setDivisionSteps] = useState<{ q: number; r: number }[]>([]);
  const [showSteps, setShowSteps] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // --- State for Pro Tip Simulation ---
  const [showTip, setShowTip] = useState(false);
  const [tipInput, setTipInput] = useState(10);

  // --- State for Mode 2 & 3: Bin to Oct/Hex ---
  const [isReversed, setIsReversed] = useState(false); // false = Bin to Oct/Hex, true = Oct/Hex to Bin
  const [binInput, setBinInput] = useState("10110011");
  const [octInput, setOctInput] = useState("263");
  const [hexInput, setHexInput] = useState("B3");
  const [showSlices, setShowSlices] = useState(false);

  // Re-calculate divisions when input changes
  useEffect(() => {
    let current = decInput;
    const steps = [];
    while (current > 0) {
      const quotient = Math.floor(current / 2);
      const remainder = current % 2;
      steps.push({ q: quotient, r: remainder });
      current = quotient;
    }
    setDivisionSteps(steps);
    setShowSteps(false);
  }, [decInput]);

  useEffect(() => {
    setShowSlices(false);
  }, [binInput, octInput, hexInput, activeTab, isReversed]);

  const tabs = [
    { id: 'dec-to-bin', label: 'Desimal ke Biner', icon: DivideCircle, color: 'text-blue-500', bg: 'bg-blue-500' },
    { id: 'bin-to-oct', label: 'Biner ↔ Oktal', icon: Scissors, color: 'text-yellow-500', bg: 'bg-yellow-500' },
    { id: 'bin-to-hex', label: 'Biner ↔ Heksa', icon: Layers, color: 'text-purple-500', bg: 'bg-purple-500' },
  ];

  // Helper for Bin to Oct/Hex
  const groupSize = activeTab === 'bin-to-oct' ? 3 : 4;
  
  // -- Logic for Bin -> Oct/Hex --
  const paddedLength = Math.ceil(binInput.length / groupSize) * groupSize;
  const paddedBin = binInput.padStart(paddedLength, '0');
  
  const chunks = [];
  if (binInput) {
    for (let i = 0; i < paddedBin.length; i += groupSize) {
      chunks.push(paddedBin.substring(i, i + groupSize));
    }
  }

  const hexChars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
  const getChunkValue = (chunk: string) => {
    const val = parseInt(chunk, 2);
    return activeTab === 'bin-to-hex' ? hexChars[val] : val.toString();
  };

  // -- Logic for Oct/Hex -> Bin --
  const getBinFromChar = (char: string) => {
    const val = activeTab === 'bin-to-hex' ? parseInt(char, 16) : parseInt(char, 10);
    if (isNaN(val)) return '0'.repeat(groupSize);
    return val.toString(2).padStart(groupSize, '0');
  };

  // Helper for Tip Simulation
  const weights = [128, 64, 32, 16, 8, 4, 2, 1];
  let tipRemaining = tipInput;
  const activeWeights = weights.map(w => {
    if (tipRemaining >= w) {
      tipRemaining -= w;
      return true;
    }
    return false;
  });

  return (
    <div className="border border-border/50 rounded-2xl overflow-hidden bg-background shadow-lg mt-8">
      
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
                isActive ? `${tab.color} bg-background` : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? tab.color : 'text-muted-foreground'}`} />
              {tab.label}
              {isActive && (
                <motion.div 
                  layoutId="activeConvTabBottom"
                  className={`absolute bottom-0 left-0 right-0 h-1 ${tab.bg}`}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="p-4 md:p-8 min-h-[500px] flex flex-col relative overflow-hidden bg-dot-pattern">
        <AnimatePresence mode="wait">
          
          {/* MODE 1: Decimal to Binary */}
          {activeTab === 'dec-to-bin' && (
            <motion.div 
              key="dec-to-bin"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8 max-w-2xl mx-auto w-full"
            >
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold">Mesin Pembagi Sisa (Modulo)</h3>
                <p className="text-muted-foreground">Bagilah angka desimal dengan 2 berulang kali hingga habis. Sisa baginya adalah angka biner dari bawah ke atas.</p>
              </div>

              {/* TIPS BOX (INTERACTIVE) */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl overflow-hidden flex flex-col w-full">
                <button 
                  onClick={() => setShowTip(!showTip)} 
                  className="p-4 md:p-5 flex items-center justify-between hover:bg-emerald-500/10 transition-colors text-emerald-700 dark:text-emerald-400 font-bold"
                >
                  <div className="flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-emerald-500 shrink-0" />
                    <span className="text-base md:text-lg text-left">💡 Pro Tip: Metode Penjumlahan Bobot (Cara Cepat)</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform shrink-0 ${showTip ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {showTip && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-5 md:px-6 md:pb-6 text-sm md:text-base text-emerald-700 dark:text-emerald-400"
                    >
                      <p className="mb-4">
                        Cara cepat (di luar kepala) mengubah desimal ke biner adalah dengan mencari kombinasi penjumlahan dari nilai bobot posisinya <strong>(128, 64, 32, 16, 8, 4, 2, 1)</strong>. Jika bobot tersebut terpakai untuk membentuk angka desimal, maka bit-nya bernilai <strong>1</strong>. Jika tidak, nilainya <strong>0</strong>.
                      </p>

                      {/* Simulation Area */}
                      <div className="bg-background rounded-xl p-4 border border-emerald-500/20">
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-bold">Simulasi Interaktif:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Angka:</span>
                            <input 
                              type="number" 
                              min="0"
                              max="255"
                              value={tipInput} 
                              onChange={(e) => setTipInput(Math.min(255, Math.max(0, parseInt(e.target.value) || 0)))}
                              className="bg-secondary/50 border border-border rounded-md px-3 py-1 w-20 text-center font-bold focus:outline-none focus:border-emerald-500 text-foreground"
                            />
                          </div>
                        </div>

                        <div className="flex justify-between items-end gap-1 md:gap-2 mb-4 overflow-x-auto pb-2">
                          {weights.map((w, i) => {
                            const isActive = activeWeights[i];
                            return (
                              <div key={w} className="flex flex-col items-center gap-2">
                                <span className={`text-[10px] md:text-xs font-mono font-bold ${isActive ? 'text-emerald-500' : 'text-muted-foreground/50'}`}>
                                  {w}
                                </span>
                                <div className={`w-8 h-10 md:w-12 md:h-14 rounded-lg flex items-center justify-center text-lg md:text-2xl font-black transition-colors ${isActive ? 'bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-secondary text-muted-foreground/40'}`}>
                                  {isActive ? '1' : '0'}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="text-center p-3 bg-emerald-500/10 rounded-lg">
                          <div className="text-sm font-mono text-emerald-600 dark:text-emerald-400 mb-1">
                            {tipInput} = {weights.filter((_, i) => activeWeights[i]).join(' + ') || '0'}
                          </div>
                          <div className="font-bold text-foreground flex items-center justify-center flex-wrap gap-2">
                            Hasil Biner: 
                            <span className="text-emerald-500 tracking-widest bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/30">
                              {activeWeights.map(w => w ? '1' : '0').join('')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col items-center gap-6 pt-4">
                <div className="flex flex-col md:flex-row items-center gap-4 bg-secondary/50 p-4 rounded-xl border border-border/50 w-full max-w-md">
                  <span className="font-bold whitespace-nowrap">Angka Desimal:</span>
                  <input 
                    type="number" 
                    value={decInput} 
                    onChange={(e) => setDecInput(Math.max(1, parseInt(e.target.value) || 0))}
                    className="bg-background border border-border rounded-lg px-4 py-3 w-full text-2xl md:text-3xl font-black text-center focus:outline-none focus:border-blue-500 text-blue-500"
                  />
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-md justify-center">
                  <button 
                    onClick={() => {
                      setShowSteps(true);
                      setIsManualMode(false);
                      setCurrentStep(divisionSteps.length);
                    }}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <RefreshCw className={`w-5 h-5 ${showSteps && !isManualMode ? 'animate-spin' : ''}`} />
                    Proses Otomatis
                  </button>
                  <button 
                    onClick={() => {
                      setShowSteps(true);
                      setIsManualMode(true);
                      setCurrentStep(1);
                    }}
                    className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground border border-border font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    Langkah Manual
                  </button>
                </div>
              </div>

              {showSteps && (
                <div className="relative mt-8 p-6 bg-secondary/20 rounded-2xl border border-border/50">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-muted-foreground text-sm font-bold border-b border-border/50 pb-2 mb-2 px-4">
                      <span>Proses Bagi 2</span>
                      <span>Sisa (Remainder)</span>
                    </div>

                    <AnimatePresence>
                      {divisionSteps.slice(0, currentStep).map((step, idx) => {
                        const prevQ = idx === 0 ? decInput : divisionSteps[idx - 1].q;
                        const delay = isManualMode ? 0 : idx * 0.4;
                        return (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay, type: "spring" }}
                            className="flex items-center justify-between bg-background p-3 rounded-xl border border-border shadow-sm px-4 md:px-6"
                          >
                            <div className="flex items-center gap-2 md:gap-4 text-lg md:text-xl">
                              <span className="font-bold w-12 text-right">{prevQ}</span>
                              <span className="text-muted-foreground">/ 2 = </span>
                              <span className="font-bold text-blue-500 w-12">{step.q}</span>
                            </div>
                            
                            <motion.div 
                              initial={{ scale: 0, x: -20 }}
                              animate={{ scale: 1, x: 0 }}
                              transition={{ delay: delay + 0.2, type: "spring" }}
                              className="bg-emerald-500 text-white w-10 h-10 rounded-lg flex items-center justify-center font-black text-xl shadow-md z-10 shrink-0"
                            >
                              {step.r}
                            </motion.div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                    
                    {/* Next Step Button for Manual Mode */}
                    {isManualMode && currentStep < divisionSteps.length && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setCurrentStep(prev => prev + 1)}
                        className="mx-auto mt-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 font-bold py-2 px-6 rounded-full transition-colors border border-emerald-500/20"
                      >
                        Bagi Selanjutnya 👇
                      </motion.button>
                    )}
                  </div>

                  {/* Upwards arrow indicating read direction */}
                  {currentStep >= divisionSteps.length && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: '100%' }}
                      transition={{ delay: isManualMode ? 0.3 : divisionSteps.length * 0.4, duration: 1 }}
                      className="absolute top-16 bottom-6 right-9 md:right-11 w-1 bg-gradient-to-t from-emerald-500 to-emerald-500/10 rounded-full flex flex-col justify-start items-center pt-2"
                    >
                      <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-8 border-b-emerald-500 -mt-2"></div>
                    </motion.div>
                  )}

                  {currentStep >= divisionSteps.length && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: isManualMode ? 0.6 : divisionSteps.length * 0.4 + 0.5 }}
                      className="mt-8 pt-6 border-t border-border/50 text-center"
                    >
                      <span className="text-muted-foreground font-bold">Hasil Akhir (Biner):</span>
                      <div className="text-3xl md:text-4xl font-black text-emerald-500 mt-2 tracking-widest drop-shadow-sm flex justify-center gap-1 flex-wrap">
                        {divisionSteps.map(s => s.r).reverse().map((r, i) => (
                          <motion.span 
                            key={i}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: (isManualMode ? 0.6 : (divisionSteps.length * 0.4) + 0.5) + (i * 0.1) }}
                          >
                            {r}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* MODE 2 & 3: Binary to Octal/Hex OR Octal/Hex to Binary */}
          {(activeTab === 'bin-to-oct' || activeTab === 'bin-to-hex') && (
            <motion.div 
              key="bin-to-others"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8 w-full max-w-4xl mx-auto"
            >
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold flex flex-col items-center justify-center gap-2">
                  {isReversed ? 'Animasi Mekar (Unfolding)' : 'Mesin Pemotong Pita'}
                </h3>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  {isReversed 
                    ? `Setiap 1 digit membelah diri menjadi ${groupSize} bit Biner secara instan.`
                    : `Konversi cepat! Kelompokkan angka biner per ${groupSize} bit dari arah kanan.`}
                </p>
                
                {/* SWAP BUTTON */}
                <button 
                  onClick={() => {
                    setIsReversed(!isReversed);
                    setShowSlices(false);
                  }}
                  className="mx-auto mt-4 flex items-center gap-2 bg-secondary/80 hover:bg-secondary text-foreground font-bold py-2 px-4 rounded-full border border-border shadow-sm transition-all active:scale-95 text-sm"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                  Putar Arah ({isReversed ? (activeTab === 'bin-to-hex' ? 'Heksa' : 'Oktal') + ' ➡️ Biner' : 'Biner ➡️ ' + (activeTab === 'bin-to-hex' ? 'Heksa' : 'Oktal')})
                </button>
              </div>

              <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col md:flex-row items-center gap-4 bg-secondary/50 p-4 rounded-xl border border-border/50 w-full max-w-md">
                  <span className="font-bold whitespace-nowrap">Input {isReversed ? (activeTab === 'bin-to-hex' ? 'Heksa' : 'Oktal') : 'Biner'}:</span>
                  
                  {!isReversed ? (
                    <input 
                      type="text" 
                      value={binInput} 
                      onChange={(e) => setBinInput(e.target.value.replace(/[^01]/g, ''))}
                      maxLength={16}
                      className="bg-background border border-border rounded-lg px-4 py-2 w-full text-xl font-mono font-black text-center focus:outline-none focus:border-emerald-500"
                    />
                  ) : (
                    <input 
                      type="text" 
                      value={activeTab === 'bin-to-hex' ? hexInput : octInput} 
                      onChange={(e) => {
                        const val = e.target.value.toUpperCase();
                        if (activeTab === 'bin-to-hex') {
                          setHexInput(val.replace(/[^0-9A-F]/g, ''));
                        } else {
                          setOctInput(val.replace(/[^0-7]/g, ''));
                        }
                      }}
                      maxLength={4}
                      className="bg-background border border-border rounded-lg px-4 py-2 w-full text-2xl font-black text-center focus:outline-none focus:border-emerald-500 uppercase"
                    />
                  )}
                </div>
                
                <button 
                  onClick={() => setShowSlices(true)}
                  disabled={(!isReversed && binInput.length === 0) || (isReversed && (activeTab === 'bin-to-hex' ? hexInput : octInput).length === 0)}
                  className={`${activeTab === 'bin-to-oct' ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-purple-500 hover:bg-purple-600 text-white'} font-bold py-3 px-6 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isReversed ? <Spline className="w-5 h-5" /> : <Scissors className="w-5 h-5" />}
                  {isReversed ? `Urai per ${groupSize} Bit` : `Potong per ${groupSize} Bit`}
                </button>
              </div>

              {/* === ANIMATION AREA === */}
              {showSlices && (
                <div className="mt-12 flex flex-col items-center">
                  
                  {/* SCENARIO A: BINARY TO OCTAL/HEX */}
                  {!isReversed && binInput.length > 0 && (
                    <>
                      {/* The Ribbon */}
                      <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
                        {chunks.map((chunk, chunkIdx) => (
                          <div key={chunkIdx} className="flex items-center">
                            <motion.div 
                              initial={{ x: 50, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: chunkIdx * 0.3 }}
                              className="flex gap-1"
                            >
                              {chunk.split('').map((bit, bitIdx) => (
                                <div 
                                  key={bitIdx} 
                                  className={`w-8 h-12 md:w-12 md:h-16 flex items-center justify-center text-xl md:text-3xl font-black rounded-md border-2 
                                    ${bitIdx < (chunk.length - binInput.length % groupSize) && chunkIdx === 0 && binInput.length % groupSize !== 0 
                                      ? 'bg-secondary border-dashed text-muted-foreground/50 border-border' // Padded zeros
                                      : 'bg-emerald-500/10 border-emerald-500 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                    }
                                  `}
                                >
                                  {bit}
                                </div>
                              ))}
                            </motion.div>
                            
                            {/* Cut Line */}
                            {chunkIdx < chunks.length - 1 && (
                              <motion.div 
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ delay: chunks.length * 0.3 + (chunkIdx * 0.2) }}
                                className="w-1 h-20 md:h-24 bg-red-500/50 mx-2 md:mx-4 border-l-2 border-dashed border-red-500 relative shrink-0"
                              >
                                 <motion.div 
                                  initial={{ y: -20, opacity: 0 }}
                                  animate={{ y: 80, opacity: [0, 1, 0] }}
                                  transition={{ delay: chunks.length * 0.3 + (chunkIdx * 0.2) + 0.2, duration: 1 }}
                                  className="absolute -left-3 -top-2 text-red-500"
                                 >
                                   <Scissors className="w-5 h-5 rotate-90" />
                                 </motion.div>
                              </motion.div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Morph into Target Base */}
                      <div className="mt-16 flex items-center justify-center gap-6 md:gap-10">
                        {chunks.map((chunk, chunkIdx) => {
                          const val = getChunkValue(chunk);
                          const isHex = activeTab === 'bin-to-hex';
                          return (
                            <div key={chunkIdx} className="flex flex-col items-center">
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 40, opacity: 1 }}
                                transition={{ delay: (chunks.length * 0.3) + 1 + (chunkIdx * 0.2) }}
                                className="w-1 bg-border rounded-full mb-4 flex items-end pb-1"
                              >
                                <ArrowDownToLine className="w-4 h-4 text-muted-foreground -ml-1.5" />
                              </motion.div>
                              
                              <motion.div 
                                initial={{ scale: 0, rotateX: 90 }}
                                animate={{ scale: 1, rotateX: 0 }}
                                transition={{ delay: (chunks.length * 0.3) + 1.2 + (chunkIdx * 0.2), type: "spring" }}
                                className={`w-16 h-20 md:w-24 md:h-28 flex flex-col items-center justify-center rounded-2xl border-4 shadow-lg shrink-0
                                  ${isHex ? 'bg-purple-500/10 border-purple-500 text-purple-500' : 'bg-yellow-500/10 border-yellow-500 text-yellow-600 dark:text-yellow-400'}
                                `}
                              >
                                <span className="text-5xl md:text-6xl font-black">{val}</span>
                              </motion.div>
                              
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: (chunks.length * 0.3) + 1.5 + (chunkIdx * 0.2) }}
                                className="mt-3 text-sm font-bold text-muted-foreground"
                              >
                                {isHex ? 'Heksa' : 'Oktal'}
                              </motion.div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Final Result Combine */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (chunks.length * 0.3) + 2.5 }}
                        className="mt-10 p-6 bg-secondary/30 rounded-2xl border border-border/50 text-center flex flex-col items-center"
                      >
                        <span className="text-muted-foreground font-bold">Hasil Akhir:</span>
                        <div className="text-5xl font-black mt-2">
                           {chunks.map(c => getChunkValue(c)).join('')}
                           <sub className="text-xl text-muted-foreground font-semibold">{activeTab === 'bin-to-hex' ? '16' : '8'}</sub>
                        </div>
                      </motion.div>
                    </>
                  )}

                  {/* SCENARIO B: OCTAL/HEX TO BINARY */}
                  {isReversed && (activeTab === 'bin-to-hex' ? hexInput : octInput).length > 0 && (
                    <>
                      <div className="flex items-center justify-center gap-6 md:gap-10">
                        {(activeTab === 'bin-to-hex' ? hexInput : octInput).split('').map((char, charIdx) => {
                          const isHex = activeTab === 'bin-to-hex';
                          return (
                            <div key={charIdx} className="flex flex-col items-center">
                              <motion.div 
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: charIdx * 0.3, type: "spring" }}
                                className={`w-16 h-20 md:w-24 md:h-28 flex flex-col items-center justify-center rounded-2xl border-4 shadow-lg shrink-0
                                  ${isHex ? 'bg-purple-500/10 border-purple-500 text-purple-500' : 'bg-yellow-500/10 border-yellow-500 text-yellow-600 dark:text-yellow-400'}
                                `}
                              >
                                <span className="text-5xl md:text-6xl font-black">{char}</span>
                              </motion.div>
                              
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 40, opacity: 1 }}
                                transition={{ delay: ((activeTab === 'bin-to-hex' ? hexInput : octInput).length * 0.3) + (charIdx * 0.2) }}
                                className="w-1 bg-border rounded-full mt-4 flex items-end pb-1 relative"
                              >
                                <Spline className="w-5 h-5 text-muted-foreground absolute -bottom-5 -left-2 rotate-90" />
                              </motion.div>
                              
                              {/* Unfolded Binary Blocks */}
                              <motion.div 
                                initial={{ scale: 0, opacity: 0, y: -20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                transition={{ delay: ((activeTab === 'bin-to-hex' ? hexInput : octInput).length * 0.3) + 0.6 + (charIdx * 0.2), type: "spring" }}
                                className="flex gap-1 mt-8"
                              >
                                {getBinFromChar(char).split('').map((bit, bitIdx) => (
                                  <div 
                                    key={bitIdx} 
                                    className="w-6 h-10 md:w-10 md:h-14 flex items-center justify-center text-lg md:text-2xl font-black rounded-md border-2 bg-emerald-500/10 border-emerald-500 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                                  >
                                    {bit}
                                  </div>
                                ))}
                              </motion.div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Final Result Combine */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: ((activeTab === 'bin-to-hex' ? hexInput : octInput).length * 0.3) + 1.5 }}
                        className="mt-10 p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 text-center flex flex-col items-center max-w-full overflow-hidden"
                      >
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold mb-2">Pita Biner yang Terjahit:</span>
                        <div className="text-3xl md:text-5xl font-black mt-2 text-emerald-500 tracking-widest break-all px-4">
                           {(activeTab === 'bin-to-hex' ? hexInput : octInput).split('').map(c => getBinFromChar(c)).join('')}
                           <sub className="text-xl text-muted-foreground font-semibold tracking-normal">2</sub>
                        </div>
                      </motion.div>
                    </>
                  )}

                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
