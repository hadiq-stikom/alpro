"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DivideCircle, 
  Scissors, 
  ArrowDownToLine, 
  RefreshCw, 
  Layers, 
  Lightbulb, 
  ChevronDown, 
  ArrowRightLeft, 
  Spline,
  BookOpen,
  ArrowRight,
  Calculator,
  Compass,
  CheckCircle2,
  Table
} from 'lucide-react';

type Tab = 'dec-to-bin' | 'bin-to-oct' | 'bin-to-hex';

export default function AnimatedNumberConversion() {
  const [activeTab, setActiveTab] = useState<Tab>('dec-to-bin');
  const [showCheatSheet, setShowCheatSheet] = useState(false);

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
    { id: 'dec-to-bin', label: 'Desimal ke Biner', icon: DivideCircle, color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-600 dark:bg-blue-500' },
    { id: 'bin-to-oct', label: 'Biner ↔ Oktal', icon: Scissors, color: 'text-amber-800 dark:text-yellow-400', bg: 'bg-amber-600 dark:bg-yellow-500' },
    { id: 'bin-to-hex', label: 'Biner ↔ Heksa', icon: Layers, color: 'text-purple-700 dark:text-purple-400', bg: 'bg-purple-600 dark:bg-purple-500' },
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
                isActive ? `${tab.color} bg-background font-bold` : 'text-slate-700 dark:text-slate-300 font-semibold hover:bg-secondary/40 hover:text-foreground'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? tab.color : 'text-slate-500 dark:text-slate-400'}`} />
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

      {/* MASTER CHEATSHEET ACCORDION */}
      <div className="bg-secondary/15 border-b border-border/60">
        <button
          onClick={() => setShowCheatSheet(!showCheatSheet)}
          className="w-full px-4 py-3 flex items-center justify-between text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-foreground hover:bg-secondary/40 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2 text-left">
            <BookOpen className="w-4 h-4 text-primary shrink-0" />
            <span>
              <strong className="text-foreground">Matriks Acuan Baku Konversi Antar Seluruh Basis</strong> (Desimal, Biner, Oktal, Heksadesimal)
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-primary text-xs shrink-0 font-bold">
            <span>{showCheatSheet ? 'Tutup Ringkasan' : 'Buka Panduan Lengkap'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showCheatSheet ? 'rotate-180' : ''}`} />
          </div>
        </button>

        <AnimatePresence>
          {showCheatSheet && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-border/40 p-4 md:p-6 bg-secondary/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
                
                {/* 1. Desimal ke Basis Lain */}
                <div className="p-3.5 rounded-2xl bg-card border border-blue-500/30 space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 font-black text-blue-600 dark:text-blue-400">
                    <DivideCircle className="w-4 h-4 shrink-0" />
                    <span>Desimal ➔ Basis Lain (2, 8, 16)</span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    <strong>Metode Bagi Berulang:</strong> Bagilah bilangan desimal dengan basis tujuan (&divide;2, &divide;8, atau &divide;16) bertingkat sampai habis (hasil bagi 0). Catat setiap sisa bagi di kolom kanan.
                  </p>
                  <div className="p-2 rounded-xl bg-blue-500/10 font-mono text-[11px] font-bold text-blue-700 dark:text-blue-300 border border-blue-500/20">
                    Arah Baca: <strong>&uarr; DARI BAWAH KE ATAS</strong> (MSB ➔ LSB)
                  </div>
                </div>

                {/* 2. Basis Apapun ke Desimal */}
                <div className="p-3.5 rounded-2xl bg-card border border-emerald-500/30 space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 font-black text-emerald-600 dark:text-emerald-400">
                    <Calculator className="w-4 h-4 shrink-0" />
                    <span>Basis Apapun ➔ Desimal (10)</span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    <strong>Metode Penjumlahan Bobot:</strong> Kalikan setiap digit dari paling kanan dengan basis berpangkat posisinya (pangkat 0, 1, 2, ...), lalu jumlahkan seluruh hasilnya.
                  </p>
                  <div className="p-2 rounded-xl bg-emerald-500/10 font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    Rumus: &sum; (digit &times; basis<sup>posisi</sup>)
                  </div>
                </div>

                {/* 3. Biner ke Oktal */}
                <div className="p-3.5 rounded-2xl bg-card border border-yellow-500/30 space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 font-black text-yellow-600 dark:text-yellow-400">
                    <Scissors className="w-4 h-4 shrink-0" />
                    <span>Biner ➔ Oktal (Kaidah 2³ = 8)</span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    <strong>Kelompokkan 3 Bit:</strong> Bagi biner per 3 bit dari <strong>kanan (LSB)</strong>. Beri 0 di kiri jika kurang dari 3 bit. Hitung tiap blok dengan bobot <strong>(4, 2, 1)</strong>.
                  </p>
                  <div className="p-2 rounded-xl bg-yellow-500/10 font-mono text-[11px] font-bold text-yellow-800 dark:text-yellow-300 border border-yellow-500/20">
                    Contoh: 110.011₂ ➔ 63₈
                  </div>
                </div>

                {/* 4. Oktal ke Biner */}
                <div className="p-3.5 rounded-2xl bg-card border border-amber-500/30 space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 font-black text-amber-600 dark:text-amber-400">
                    <Spline className="w-4 h-4 shrink-0" />
                    <span>Oktal ➔ Biner (Mekar 3-Bit)</span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    <strong>Pemekaran 1 Digit:</strong> Setiap 1 digit oktal (0-7) langsung diubah menjadi <strong>tepat 3 digit biner</strong> berbobot (4, 2, 1), lalu rangkai berurutan.
                  </p>
                  <div className="p-2 rounded-xl bg-amber-500/10 font-mono text-[11px] font-bold text-amber-800 dark:text-amber-300 border border-amber-500/20">
                    Contoh: 5₈ ➔ 101₂, 2₈ ➔ 010₂
                  </div>
                </div>

                {/* 5. Biner ke Heksadesimal */}
                <div className="p-3.5 rounded-2xl bg-card border border-purple-500/30 space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 font-black text-purple-600 dark:text-purple-400">
                    <Layers className="w-4 h-4 shrink-0" />
                    <span>Biner ➔ Heksa (Kaidah 2⁴ = 16)</span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    <strong>Kelompokkan 4 Bit:</strong> Bagi biner per 4 bit dari kanan. Hitung bobot <strong>(8, 4, 2, 1)</strong>. Jika nilai 10-15 substitusi huruf <strong>(10=A, 11=B, ..., 15=F)</strong>.
                  </p>
                  <div className="p-2 rounded-xl bg-purple-500/10 font-mono text-[11px] font-bold text-purple-700 dark:text-purple-300 border border-purple-500/20">
                    Contoh: 1011.0011₂ ➔ B3₁₆
                  </div>
                </div>

                {/* 6. Jembatan Oktal ↔ Heksadesimal */}
                <div className="p-3.5 rounded-2xl bg-card border border-indigo-500/30 space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 font-black text-indigo-600 dark:text-indigo-400">
                    <ArrowRightLeft className="w-4 h-4 shrink-0" />
                    <span>Oktal ↔ Heksadesimal (Jembatan Biner)</span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    <strong>Gunakan Biner Sebagai Perantara:</strong> Jangan konversi langsung. Ubah Oktal ➔ Biner (3 bit), lalu kelompokkan ulang per 4 bit ➔ Heksadesimal (atau sebaliknya).
                  </p>
                  <div className="p-2 rounded-xl bg-indigo-500/10 font-mono text-[11px] font-bold text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                    Alur: Oktal (3 bit) ↔ Biner ↔ Heksa (4 bit)
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
              {/* ACUAN BAKU KONVERSI: DESIMAL KE BINER */}
              <div className="space-y-4">
                <div className="text-center space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold">
                    <DivideCircle className="w-3.5 h-3.5" />
                    <span>Acuan Baku Konversi: Desimal (Basis 10) ➔ Biner (Basis 2)</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-foreground">
                    Metode Pembagian Berulang &amp; Sisa Bagi (Modulo 2)
                  </h3>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 max-w-xl mx-auto font-medium">
                    Kaidah standar akademik untuk mengubah bilangan desimal ke biner secara manual tanpa alat hitung.
                  </p>
                </div>

                {/* 4 LANGKAH SISTEMATIS */}
                <div className="p-4 md:p-5 rounded-2xl bg-blue-500/10 dark:bg-blue-950/30 border-2 border-blue-500/30 space-y-3.5">
                  <div className="flex items-center justify-between gap-2 border-b border-blue-500/20 pb-2.5">
                    <span className="font-black text-blue-950 dark:text-blue-200 text-xs md:text-sm flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      4 Langkah Acuan Sistematis:
                    </span>
                    <span className="text-[11px] font-mono font-bold bg-blue-500/20 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full">
                      Basis Tujuan: 2
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-800 dark:text-slate-200">
                    <div className="p-3 rounded-xl bg-card border border-border/80 space-y-1 shadow-xs">
                      <div className="font-black text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">1</span>
                        <span>Bagi Nilai dengan 2</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        Ambil bilangan desimal yang akan dikonversi, lalu bagilah dengan angka basis tujuan yaitu <strong className="text-foreground font-black">2</strong>.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-card border border-border/80 space-y-1 shadow-xs">
                      <div className="font-black text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">2</span>
                        <span>Catat Sisa Pembagian</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        Tuliskan sisa pembagian (<em className="font-bold">modulo</em>) di kolom kanan. Sisa hanya boleh bernilai <strong className="text-foreground font-black">0</strong> (jika genap) atau <strong className="text-foreground font-black">1</strong> (jika ganjil).
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-card border border-border/80 space-y-1 shadow-xs">
                      <div className="font-black text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">3</span>
                        <span>Ulangi Hasil Bagi Bulat</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        Gunakan <strong className="text-foreground font-black">hasil bagi bulat</strong> (<em className="font-bold">quotient</em>, abaikan pecahan) untuk dibagi lagi dengan 2 secara bertingkat hingga hasil bagi bernilai <strong className="text-foreground font-black">0</strong>.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-card border border-border/80 space-y-1 shadow-xs">
                      <div className="font-black text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">4</span>
                        <span>Baca Sisa dari BAWAH ke ATAS</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        Susun seluruh angka sisa dari <strong className="text-blue-600 dark:text-blue-400 font-black">baris TERBAWAH (MSB)</strong> ke <strong className="text-blue-600 dark:text-blue-400 font-black">baris TERATAS (LSB)</strong> sebagai hasil biner akhir.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-start sm:items-center gap-2.5 text-xs text-blue-950 dark:text-blue-200">
                    <ArrowDownToLine className="w-4 h-4 rotate-180 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 sm:mt-0" />
                    <span>
                      <strong className="font-black">Rumus Acuan:</strong> <code className="font-mono bg-card px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400 font-bold border border-blue-500/30">Nilai Desimal = (Hasil Bagi &times; 2) + Sisa</code>. Deretan angka sisa wajib dirangkai dengan arah baca terbalik (<strong className="underline decoration-blue-500 underline-offset-2">&uarr; dari bawah ke atas</strong>).
                    </span>
                  </div>
                </div>
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
                      className="px-4 pb-5 md:px-6 md:pb-6 text-sm md:text-base text-slate-800 dark:text-slate-200 font-medium"
                    >
                      <p className="mb-4 leading-relaxed">
                        Cara cepat (di luar kepala) mengubah desimal ke biner adalah dengan mencari kombinasi penjumlahan dari nilai bobot posisinya <strong>(128, 64, 32, 16, 8, 4, 2, 1)</strong>. Jika bobot tersebut terpakai untuk membentuk angka desimal, maka bit-nya bernilai <strong>1</strong>. Jika tidak, nilainya <strong>0</strong>.
                      </p>

                      {/* Simulation Area */}
                      <div className="bg-background rounded-xl p-4 border border-emerald-500/20">
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-bold text-slate-900 dark:text-slate-100">Simulasi Interaktif:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Angka:</span>
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
                                <span className={`text-[10px] md:text-xs font-mono font-bold ${isActive ? 'text-emerald-700 dark:text-emerald-400 font-black' : 'text-slate-500 dark:text-slate-400'}`}>
                                  {w}
                                </span>
                                <div className={`w-8 h-10 md:w-12 md:h-14 rounded-lg flex items-center justify-center text-lg md:text-2xl font-black transition-colors ${isActive ? 'bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-200 dark:bg-secondary text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-border'}`}>
                                  {isActive ? '1' : '0'}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="text-center p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                          <div className="text-sm font-mono text-emerald-700 dark:text-emerald-300 font-bold mb-1">
                            {tipInput} = {weights.filter((_, i) => activeWeights[i]).join(' + ') || '0'}
                          </div>
                          <div className="font-bold text-foreground flex items-center justify-center flex-wrap gap-2">
                            <span className="text-slate-800 dark:text-slate-200">Hasil Biner:</span> 
                            <span className="text-emerald-700 dark:text-emerald-400 font-black tracking-widest bg-emerald-500/15 px-3 py-1 rounded border border-emerald-500/30">
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
                    <div className="flex items-center justify-between text-slate-800 dark:text-slate-200 text-sm font-bold border-b border-border/70 pb-2 mb-2 px-4">
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
                              <span className="text-slate-700 dark:text-slate-300 font-bold">/ 2 = </span>
                              <span className="font-bold text-blue-700 dark:text-blue-400 w-12">{step.q}</span>
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
                        className="mx-auto mt-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold py-2 px-6 rounded-full transition-colors border border-emerald-500/20"
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
                      <span className="text-slate-800 dark:text-slate-200 font-bold">Hasil Akhir (Biner):</span>
                      <div className="text-3xl md:text-4xl font-black text-emerald-700 dark:text-emerald-400 mt-2 tracking-widest drop-shadow-sm flex justify-center gap-1 flex-wrap">
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
              {/* ACUAN BAKU KONVERSI: BINER ↔ OKTAL / HEKSA */}
              <div className="space-y-4">
                <div className="text-center space-y-1.5">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                    activeTab === 'bin-to-oct' 
                      ? 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-700 dark:text-yellow-400'
                      : 'bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-400'
                  }`}>
                    {activeTab === 'bin-to-oct' ? <Scissors className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
                    <span>
                      Acuan Baku: {isReversed 
                        ? `${activeTab === 'bin-to-hex' ? 'Heksadesimal (Basis 16)' : 'Oktal (Basis 8)'} ➔ Biner (Basis 2)`
                        : `Biner (Basis 2) ➔ ${activeTab === 'bin-to-hex' ? 'Heksadesimal (Basis 16)' : 'Oktal (Basis 8)'}`}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-foreground">
                    {!isReversed 
                      ? `Metode Pengelompokan ${groupSize}-Bit (${activeTab === 'bin-to-oct' ? 'Bobot 4-2-1' : 'Bobot 8-4-2-1'})`
                      : `Metode Pemekaran 1 Digit Menjadi ${groupSize} Bit Biner`}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 max-w-xl mx-auto font-medium">
                    {!isReversed 
                      ? `Karena basis ${activeTab === 'bin-to-oct' ? '8 = 2³' : '16 = 2⁴'}, konversi biner tidak perlu dibagi manual, melainkan cukup dipotong dan dikelompokkan per ${groupSize} bit dari digit paling kanan.`
                      : `Setiap 1 digit ${activeTab === 'bin-to-oct' ? 'oktal' : 'heksadesimal'} secara langsung dimekarkan menjadi kombinasi tepat ${groupSize} digit biner.`}
                  </p>
                </div>

                {/* Pedagogy Steps Box */}
                <div className={`p-4 md:p-5 rounded-2xl border-2 space-y-3.5 ${
                  activeTab === 'bin-to-oct' 
                    ? 'bg-yellow-500/10 dark:bg-yellow-950/20 border-yellow-500/30'
                    : 'bg-purple-500/10 dark:bg-purple-950/20 border-purple-500/30'
                }`}>
                  <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-2.5">
                    <span className={`font-black text-xs md:text-sm flex items-center gap-2 ${
                      activeTab === 'bin-to-oct' ? 'text-yellow-950 dark:text-yellow-200' : 'text-purple-950 dark:text-purple-200'
                    }`}>
                      <BookOpen className="w-4 h-4 shrink-0" />
                      {!isReversed ? `4 Langkah Baku Biner ➔ ${activeTab === 'bin-to-oct' ? 'Oktal' : 'Heksa'}:` : `3 Langkah Baku ${activeTab === 'bin-to-oct' ? 'Oktal' : 'Heksa'} ➔ Biner:`}
                    </span>
                    <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                      activeTab === 'bin-to-oct' 
                        ? 'bg-yellow-500/20 text-yellow-800 dark:text-yellow-300' 
                        : 'bg-purple-500/20 text-purple-800 dark:text-purple-300'
                    }`}>
                      Kaidah Baku: 1 Digit = {groupSize} Bit
                    </span>
                  </div>

                  {!isReversed ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-800 dark:text-slate-200">
                      <div className="p-3 rounded-xl bg-card border border-border/80 space-y-1 shadow-xs">
                        <div className={`font-black flex items-center gap-1.5 ${activeTab === 'bin-to-oct' ? 'text-yellow-600 dark:text-yellow-400' : 'text-purple-600 dark:text-purple-400'}`}>
                          <span className={`w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] font-black shrink-0 ${activeTab === 'bin-to-oct' ? 'bg-yellow-500' : 'bg-purple-500'}`}>1</span>
                          <span>Kelompokkan dari KANAN (LSB)</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                          Bagi deretan bit biner menjadi blok-blok berisi <strong className="text-foreground font-black">{groupSize} bit</strong>, dihitung mulai dari <strong className="text-foreground font-black">digit paling kanan (LSB)</strong> menuju ke kiri.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-card border border-border/80 space-y-1 shadow-xs">
                        <div className={`font-black flex items-center gap-1.5 ${activeTab === 'bin-to-oct' ? 'text-yellow-600 dark:text-yellow-400' : 'text-purple-600 dark:text-purple-400'}`}>
                          <span className={`w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] font-black shrink-0 ${activeTab === 'bin-to-oct' ? 'bg-yellow-500' : 'bg-purple-500'}`}>2</span>
                          <span>Zero-Padding Sisi Kiri</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                          Jika kelompok bit paling depan (kiri) belum genap {groupSize} bit, <strong className="text-foreground font-black">tambahkan angka 0 di depannya</strong> hingga genap {groupSize} bit.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-card border border-border/80 space-y-1 shadow-xs">
                        <div className={`font-black flex items-center gap-1.5 ${activeTab === 'bin-to-oct' ? 'text-yellow-600 dark:text-yellow-400' : 'text-purple-600 dark:text-purple-400'}`}>
                          <span className={`w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] font-black shrink-0 ${activeTab === 'bin-to-oct' ? 'bg-yellow-500' : 'bg-purple-500'}`}>3</span>
                          <span>Hitung Bobot Posisi Tiap Blok</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                          Kalikan masing-masing bit dengan bobot posisinya <strong className="text-foreground font-black">({activeTab === 'bin-to-oct' ? '4, 2, 1' : '8, 4, 2, 1'})</strong> lalu jumlahkan nilainya untuk tiap kelompok.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-card border border-border/80 space-y-1 shadow-xs">
                        <div className={`font-black flex items-center gap-1.5 ${activeTab === 'bin-to-oct' ? 'text-yellow-600 dark:text-yellow-400' : 'text-purple-600 dark:text-purple-400'}`}>
                          <span className={`w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] font-black shrink-0 ${activeTab === 'bin-to-oct' ? 'bg-yellow-500' : 'bg-purple-500'}`}>4</span>
                          <span>{activeTab === 'bin-to-hex' ? 'Substitusi Huruf & Rangkai' : 'Rangkai Digit Oktal'}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                          {activeTab === 'bin-to-hex' 
                            ? 'Jika nilai blok 10 s.d. 15, ubah menjadi huruf (10=A, 11=B, 12=C, 13=D, 14=E, 15=F), lalu rangkai dari kiri ke kanan.' 
                            : 'Satukan angka hasil penjumlahan dari setiap kelompok secara berurutan dari kiri ke kanan sebagai angka oktal akhir.'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-800 dark:text-slate-200">
                      <div className="p-3 rounded-xl bg-card border border-border/80 space-y-1 shadow-xs">
                        <div className={`font-black flex items-center gap-1.5 ${activeTab === 'bin-to-oct' ? 'text-yellow-600 dark:text-yellow-400' : 'text-purple-600 dark:text-purple-400'}`}>
                          <span className={`w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] font-black shrink-0 ${activeTab === 'bin-to-oct' ? 'bg-yellow-500' : 'bg-purple-500'}`}>1</span>
                          <span>Pisahkan Setiap Digit</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                          {activeTab === 'bin-to-hex' 
                            ? 'Ambil tiap digit heksa. Jika berbentuk huruf (A-F), terjemahkan ke nilai angkanya (A=10 s.d. F=15).' 
                            : 'Urai setiap digit bilangan oktal (0-7) secara terpisah satu per satu.'}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-card border border-border/80 space-y-1 shadow-xs">
                        <div className={`font-black flex items-center gap-1.5 ${activeTab === 'bin-to-oct' ? 'text-yellow-600 dark:text-yellow-400' : 'text-purple-600 dark:text-purple-400'}`}>
                          <span className={`w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] font-black shrink-0 ${activeTab === 'bin-to-oct' ? 'bg-yellow-500' : 'bg-purple-500'}`}>2</span>
                          <span>Mekarkan Jadi {groupSize} Bit</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                          Ubah setiap angka menjadi kombinasi <strong className="text-foreground font-black">tepat {groupSize} bit biner</strong> sesuai bobot ({activeTab === 'bin-to-oct' ? '4, 2, 1' : '8, 4, 2, 1'}).
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-card border border-border/80 space-y-1 shadow-xs">
                        <div className={`font-black flex items-center gap-1.5 ${activeTab === 'bin-to-oct' ? 'text-yellow-600 dark:text-yellow-400' : 'text-purple-600 dark:text-purple-400'}`}>
                          <span className={`w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] font-black shrink-0 ${activeTab === 'bin-to-oct' ? 'bg-yellow-500' : 'bg-purple-500'}`}>3</span>
                          <span>Rangkai Kembali</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                          Satukan seluruh blok {groupSize}-bit biner secara berurutan untuk membentuk bilangan biner utuh.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className={`p-3 rounded-xl border flex items-center justify-between flex-wrap gap-2 text-xs font-semibold ${
                    activeTab === 'bin-to-oct' 
                      ? 'bg-yellow-500/15 border-yellow-500/30 text-yellow-950 dark:text-yellow-200' 
                      : 'bg-purple-500/15 border-purple-500/30 text-purple-950 dark:text-purple-200'
                  }`}>
                    <span>
                      <strong className="font-black">Kaidah Bobot:</strong> Setiap bit bernilai <code className="font-mono bg-card px-1.5 py-0.5 rounded font-bold border border-border">{activeTab === 'bin-to-oct' ? 'b₂×4 + b₁×2 + b₀×1' : 'b₃×8 + b₂×4 + b₁×2 + b₀×1'}</code>.
                    </span>
                    <button 
                      onClick={() => {
                        setIsReversed(!isReversed);
                        setShowSlices(false);
                      }}
                      className="inline-flex items-center gap-1.5 bg-card hover:bg-secondary text-foreground font-bold py-1.5 px-3 rounded-xl border border-border shadow-xs transition-all cursor-pointer text-xs"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      <span>Tukar Arah ({isReversed ? 'Ke Biner' : (activeTab === 'bin-to-hex' ? 'Ke Heksa' : 'Ke Oktal')})</span>
                    </button>
                  </div>
                </div>
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
                                      ? 'bg-slate-200 dark:bg-secondary border-dashed text-slate-500 dark:text-slate-400 font-bold border-slate-300 dark:border-border' // Padded zeros
                                      : 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
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
                                <ArrowDownToLine className="w-4 h-4 text-slate-500 dark:text-slate-400 -ml-1.5" />
                              </motion.div>
                              
                              <motion.div 
                                initial={{ scale: 0, rotateX: 90 }}
                                animate={{ scale: 1, rotateX: 0 }}
                                transition={{ delay: (chunks.length * 0.3) + 1.2 + (chunkIdx * 0.2), type: "spring" }}
                                className={`w-16 h-20 md:w-24 md:h-28 flex flex-col items-center justify-center rounded-2xl border-4 shadow-lg shrink-0
                                  ${isHex ? 'bg-purple-500/10 border-purple-500 text-purple-700 dark:text-purple-400' : 'bg-amber-500/15 border-amber-500 text-amber-800 dark:text-yellow-400'}
                                `}
                              >
                                <span className="text-5xl md:text-6xl font-black">{val}</span>
                              </motion.div>
                              
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: (chunks.length * 0.3) + 1.5 + (chunkIdx * 0.2) }}
                                className="mt-3 text-sm font-extrabold text-slate-800 dark:text-slate-200"
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
                        <span className="text-slate-800 dark:text-slate-200 font-bold">Hasil Akhir:</span>
                        <div className="text-5xl font-black mt-2">
                           {chunks.map(c => getChunkValue(c)).join('')}
                           <sub className="text-xl text-slate-700 dark:text-slate-300 font-bold">{activeTab === 'bin-to-hex' ? '16' : '8'}</sub>
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
                                  ${isHex ? 'bg-purple-500/10 border-purple-500 text-purple-700 dark:text-purple-400' : 'bg-amber-500/15 border-amber-500 text-amber-800 dark:text-yellow-400'}
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
                                <Spline className="w-5 h-5 text-slate-500 dark:text-slate-400 absolute -bottom-5 -left-2 rotate-90" />
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
                                    className="w-6 h-10 md:w-10 md:h-14 flex items-center justify-center text-lg md:text-2xl font-black rounded-md border-2 bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
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
                        <span className="text-emerald-800 dark:text-emerald-400 font-bold mb-2">Pita Biner yang Terjahit:</span>
                        <div className="text-3xl md:text-5xl font-black mt-2 text-emerald-700 dark:text-emerald-400 tracking-widest break-all px-4">
                           {(activeTab === 'bin-to-hex' ? hexInput : octInput).split('').map(c => getBinFromChar(c)).join('')}
                           <sub className="text-xl text-slate-700 dark:text-slate-300 font-bold tracking-normal">2</sub>
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
