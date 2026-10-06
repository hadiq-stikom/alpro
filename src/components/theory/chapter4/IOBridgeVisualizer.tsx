"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Keyboard, 
  Monitor, 
  Cpu, 
  ArrowRight, 
  Play, 
  RotateCcw, 
  Terminal, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Filter, 
  Zap,
  Code2
} from 'lucide-react';

export default function IOBridgeVisualizer() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'string_trap' | 'pipeline'>('string_trap'); // Default to string trap for high pedagogical impact

  // TAB 1: Basic Pipeline State
  const [userNameInput, setUserNameInput] = useState('Sarah');
  const [currentStep, setCurrentStep] = useState(0); // 0: Idle, 1: Inputting, 2: In RAM, 3: Output to Monitor
  const [codeLang, setCodeLang] = useState<'pseudocode' | 'python' | 'javascript'>(
    language === 'javascript' ? 'javascript' : 'python'
  );

  useEffect(() => {
    if (codeLang !== 'pseudocode') {
      setCodeLang(language === 'javascript' ? 'javascript' : 'python');
    }
  }, [language]);

  // TAB 2: String Trap & Type Casting Demo State
  const [numA, setNumA] = useState('10');
  const [numB, setNumB] = useState('20');
  const [useTypeCasting, setUseTypeCasting] = useState<boolean>(false);

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
    else setCurrentStep(0);
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  const calculateResult = () => {
    if (useTypeCasting) {
      const a = parseFloat(numA) || 0;
      const b = parseFloat(numB) || 0;
      return {
        display: `${a + b}`,
        type: 'Integer / Float (Angka Murni)',
        operation: `${a} + ${b} = ${a + b}`,
        isCorrect: true,
        note: 'Penjumlahan Matematika Berhasil! Tanda petik telah dihilangkan oleh int() / Number().'
      };
    } else {
      return {
        display: `"${numA}${numB}"`,
        type: 'String (Teks Sambung)',
        operation: `"${numA}" + "${numB}" = "${numA}${numB}"`,
        isCorrect: false,
        note: 'Terjadi Penggabungan Teks (Konkatenasi)! Karena tanpa type casting, komputer memperlakukan input sebagai huruf teks.'
      };
    }
  };

  const result = calculateResult();

  return (
    <div className="border border-border/80 dark:border-slate-800 rounded-3xl overflow-visible bg-card dark:bg-slate-950 shadow-xl space-y-0">
      
      {/* Header Bar */}
      <div className="p-4 md:px-6 bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 rounded-t-3xl">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-900 dark:text-slate-100">
            Laboratorium I/O: Aliran Data &amp; Bukti Input Selalu String
          </h3>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <button
            onClick={() => setActiveTab('string_trap')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'string_trap' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-200" />
            <span>⚠️ Jebakan: Input Selalu String!</span>
          </button>
          
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'pipeline' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Pipeline Aliran 3-Tahap</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="p-4 sm:p-6 space-y-6">
        
        {/* ========================================================================= */}
        {/* TAB 1: JEBAKAN INPUT SELALU STRING (DENGAN vs TANPA CASTING)              */}
        {/* ========================================================================= */}
        {activeTab === 'string_trap' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Warning Callout */}
            <div className="p-4 sm:p-5 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-2xl space-y-2 text-xs sm:text-sm shadow-xs">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold font-mono uppercase tracking-wider text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Aturan Emas Pemrograman (*Golden Rule*):</span>
              </div>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                Papan ketik (keyboard) mengirim sinyal tombol sebagai <strong>karakter teks (String)</strong>. Meskipun pengguna mengetik angka <code>10</code>, fungsi <code>input()</code> membacanya sebagai teks bertanda petik: <code className="bg-amber-100 dark:bg-slate-900 text-amber-900 dark:text-amber-300 px-2 py-0.5 rounded font-mono font-bold text-xs sm:text-sm">&quot;10&quot;</code>!
              </p>
            </div>

            {/* Toggle Casting Mode Switch */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xs">
              <div>
                <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 block">Pilih Mode Eksekusi Program:</span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Lihat perbedaan hasil kalkulasi secara nyata</span>
              </div>

              <div className="flex items-center gap-2 bg-white dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <button
                  onClick={() => setUseTypeCasting(false)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    !useTypeCasting ? 'bg-rose-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <XCircle className="w-4 h-4" />
                  <span>1. Tanpa Type Casting (String)</span>
                </button>
                <button
                  onClick={() => setUseTypeCasting(true)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    useTypeCasting ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>2. Dengan Type Casting (int)</span>
                </button>
              </div>
            </div>

            {/* Visual Animated Pipeline for String Trap */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
              
              {/* Box 1: Keyboard Input */}
              <div className="md:col-span-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <Keyboard className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    1. Pengguna Ketik Angka:
                  </span>
                  <span className="text-xs font-mono text-cyan-800 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-300 dark:border-cyan-800 font-bold">
                    Keyboard
                  </span>
                </div>

                <div className="space-y-2.5 font-mono">
                  <div>
                    <label className="text-xs text-slate-700 dark:text-slate-300 block mb-1 font-sans font-bold">Input Angka 1:</label>
                    <input 
                      type="text" 
                      value={numA} 
                      onChange={(e) => setNumA(e.target.value)}
                      className="w-full h-11 px-3 text-base sm:text-lg font-mono font-black text-cyan-900 dark:text-cyan-200 bg-slate-50 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 dark:text-slate-300 block mb-1 font-sans font-bold">Input Angka 2:</label>
                    <input 
                      type="text" 
                      value={numB} 
                      onChange={(e) => setNumB(e.target.value)}
                      className="w-full h-11 px-3 text-base sm:text-lg font-mono font-black text-cyan-900 dark:text-cyan-200 bg-slate-50 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="hidden md:flex md:col-span-1 justify-center">
                <div className="w-8 h-8 rounded-full bg-cyan-500/15 border-2 border-cyan-500/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shadow-xs">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              {/* Box 2: Memory & Casting Filter */}
              <div className={`md:col-span-4 p-4 sm:p-5 rounded-2xl border-2 transition-all space-y-3 ${
                useTypeCasting 
                  ? 'bg-emerald-50/60 dark:bg-emerald-500/10 border-emerald-500/40 shadow-sm' 
                  : 'bg-rose-50/60 dark:bg-rose-500/10 border-rose-500/40 shadow-sm'
              }`}>
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <Filter className={`w-4 h-4 ${useTypeCasting ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`} />
                    2. Filter di Memori RAM:
                  </span>
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                    useTypeCasting ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-500/30'
                  }`}>
                    {useTypeCasting ? 'DI-CAST KE INT' : 'TETAP STRING'}
                  </span>
                </div>

                <div className="p-3 bg-white dark:bg-slate-950/90 rounded-xl border-2 border-border/60 font-mono space-y-1.5 text-center shadow-xs">
                  <span className="text-xs text-slate-600 dark:text-slate-400 block font-sans font-semibold">Status Data di Memori:</span>
                  <div className={`font-black text-base sm:text-lg ${useTypeCasting ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                    {useTypeCasting ? `a = ${numA} | b = ${numB}` : `a = "${numA}" | b = "${numB}"`}
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block font-bold">
                    {useTypeCasting ? "Tipe: <class 'int'>" : "Tipe: <class 'str'>"}
                  </span>
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="hidden md:flex md:col-span-1 justify-center">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-xs ${
                  useTypeCasting ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/15 border-rose-500/40 text-rose-600 dark:text-rose-400'
                }`}>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              {/* Box 3: Monitor Output Result */}
              <div className="md:col-span-2 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-2 text-center shadow-xs">
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 block">
                  3. Layar Monitor:
                </span>
                <div className={`text-2xl sm:text-3xl font-mono font-black py-2.5 px-2 rounded-xl border-2 ${
                  useTypeCasting ? 'text-emerald-700 dark:text-emerald-400 border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40' : 'text-rose-700 dark:text-rose-400 border-rose-500 bg-rose-50/70 dark:bg-rose-950/40'
                }`}>
                  {result.display}
                </div>
                <span className="text-[11px] text-slate-700 dark:text-slate-300 block font-mono font-bold">
                  {useTypeCasting ? '✅ Benar (Hitung)' : '❌ Salah (Sambung)'}
                </span>
              </div>

            </div>

            {/* Code Comparison Card with Strict 1.2x Zoom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border-2 border-slate-200 dark:border-slate-800 space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center md:origin-left hover:shadow-2xl hover:border-cyan-500 shadow-xs">
                <span className="text-slate-800 dark:text-slate-200 font-bold block font-sans text-xs sm:text-sm">📋 Pseudocode (Notasi Universal):</span>
                {useTypeCasting ? (
                  <div className="space-y-1 text-emerald-700 dark:text-emerald-300 font-semibold leading-relaxed">
                    <div>a = <strong className="text-amber-800 dark:text-amber-300 font-black">input(angka1)</strong></div>
                    <div>b = <strong className="text-amber-800 dark:text-amber-300 font-black">input(angka2)</strong></div>
                    <div className="text-blue-800 dark:text-cyan-300 font-bold">output(a + b)  &larr; Hasil: {result.display}</div>
                  </div>
                ) : (
                  <div className="space-y-1 text-rose-700 dark:text-rose-300 font-semibold leading-relaxed">
                    <div>a = <strong className="text-rose-600 dark:text-rose-400 font-bold">input(angka1)</strong>  &larr; Masih &quot;{numA}&quot;</div>
                    <div>b = <strong className="text-rose-600 dark:text-rose-400 font-bold">input(angka2)</strong>  &larr; Masih &quot;{numB}&quot;</div>
                    <div className="text-blue-800 dark:text-cyan-300 font-bold">output(a + b)  &larr; Output: {result.display} (Bug!)</div>
                  </div>
                )}
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border-2 border-slate-200 dark:border-slate-800 space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center md:origin-right hover:shadow-2xl hover:border-amber-500 shadow-xs">
                <span className="text-slate-800 dark:text-slate-200 font-bold block font-sans text-xs sm:text-sm">🌐 Sintaks JavaScript yang Digunakan:</span>
                {useTypeCasting ? (
                  <div className="space-y-1 text-emerald-700 dark:text-emerald-300 font-semibold leading-relaxed">
                    <div>let a = <strong className="text-amber-800 dark:text-amber-300 font-black">parseInt(prompt(&quot;Angka 1:&quot;));</strong></div>
                    <div>let b = <strong className="text-amber-800 dark:text-amber-300 font-black">parseInt(prompt(&quot;Angka 2:&quot;));</strong></div>
                    <div className="text-blue-800 dark:text-cyan-300 font-bold">console.log(a + b); // Output: {result.display}</div>
                  </div>
                ) : (
                  <div className="space-y-1 text-rose-700 dark:text-rose-300 font-semibold leading-relaxed">
                    <div>let a = <strong className="text-rose-600 dark:text-rose-400 font-bold">prompt(&quot;Angka 1:&quot;);</strong> // Masih &quot;{numA}&quot;</div>
                    <div>let b = <strong className="text-rose-600 dark:text-rose-400 font-bold">prompt(&quot;Angka 2:&quot;);</strong> // Masih &quot;{numB}&quot;</div>
                    <div className="text-blue-800 dark:text-cyan-300 font-bold">console.log(a + b); // Output: {result.display} (Bug!)</div>
                  </div>
                )}
              </div>
            </div>

            {/* Explanation Note */}
            <div className={`p-4 sm:p-5 rounded-2xl border-2 text-xs sm:text-sm leading-relaxed flex items-start gap-3 ${
              useTypeCasting 
                ? 'bg-emerald-50/60 dark:bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-300 font-medium' 
                : 'bg-rose-50/60 dark:bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-300 font-medium'
            }`}>
              {useTypeCasting ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
              )}
              <div>
                <strong className="block mb-1 font-bold text-sm">Penjelasan Sistem Komputer:</strong>
                {result.note}
              </div>
            </div>

          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PIPELINE DASAR (KEYBOARD -> RAM -> SCREEN)                        */}
        {/* ========================================================================= */}
        {activeTab === 'pipeline' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Visual 3-Stage Pipeline (Keyboard -> RAM -> Monitor) */}
            <div className="grid grid-cols-1 md:grid-cols-11 gap-3 sm:gap-4 items-center">
              
              {/* Stage 1: INPUT (KEYBOARD) */}
              <div className={`md:col-span-3 p-4 sm:p-5 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[170px] ${
                currentStep === 1 
                  ? 'border-cyan-500 bg-cyan-50/70 dark:bg-cyan-500/10 shadow-lg' 
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 shadow-xs'
              }`}>
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 font-sans">
                    <Keyboard className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    1. Masukan (Input)
                  </span>
                  <span className="text-xs font-mono bg-cyan-100 dark:bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-300 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 font-bold">
                    Papan Ketik
                  </span>
                </div>

                <div className="my-2.5 space-y-1.5 font-mono">
                  <div>
                    <span className="text-xs text-slate-700 dark:text-slate-300 block font-sans font-bold">Ketik Nama:</span>
                    <input 
                      type="text" 
                      value={userNameInput} 
                      onChange={(e) => setUserNameInput(e.target.value)}
                      className="w-full h-11 px-3 text-base font-mono font-black text-cyan-900 dark:text-cyan-200 bg-slate-50 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20"
                    />
                  </div>
                </div>

                <span className="text-xs text-slate-600 dark:text-slate-400 block font-mono font-semibold">
                  Fungsi: <code>input(nama)</code>
                </span>
              </div>

              {/* Pipe 1 */}
              <div className="md:col-span-1 flex justify-center">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-xs transition-colors ${
                  currentStep >= 2 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-600 dark:text-cyan-400' : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400'
                }`}>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              {/* Stage 2: MEMORY (RAM) */}
              <div className={`md:col-span-3 p-4 sm:p-5 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[170px] ${
                currentStep === 2 
                  ? 'border-purple-500 bg-purple-50/70 dark:bg-purple-500/10 shadow-lg' 
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 shadow-xs'
              }`}>
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 font-sans">
                    <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    2. Penyimpanan (RAM)
                  </span>
                  <span className="text-xs font-mono bg-purple-100 dark:bg-purple-950 px-2.5 py-0.5 rounded-full border border-purple-300 dark:border-purple-800 text-purple-800 dark:text-purple-300 font-bold">
                    0x7FFE0
                  </span>
                </div>

                <div className="my-2.5 text-center bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border-2 border-border/60">
                  <span className="text-xs text-slate-600 dark:text-slate-400 block font-mono font-semibold">Variabel: nama</span>
                  <strong className="text-base sm:text-lg font-mono font-black text-purple-800 dark:text-purple-300 block">
                    {currentStep >= 2 ? `"${userNameInput}"` : '-'}
                  </strong>
                </div>

                <span className="text-xs text-slate-600 dark:text-slate-400 block font-mono font-semibold">
                  Alokasi Petak Memori
                </span>
              </div>

              {/* Pipe 2 */}
              <div className="md:col-span-1 flex justify-center">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-xs transition-colors ${
                  currentStep >= 3 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400'
                }`}>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              {/* Stage 3: OUTPUT (MONITOR) */}
              <div className={`md:col-span-3 p-4 sm:p-5 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[170px] ${
                currentStep === 3 
                  ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-500/10 shadow-lg' 
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 shadow-xs'
              }`}>
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 font-sans">
                    <Monitor className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    3. Keluaran (Output)
                  </span>
                  <span className="text-xs font-mono bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold">
                    Layar Terminal
                  </span>
                </div>

                <div className="my-2.5 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border-2 border-border/60 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                  <div className="text-emerald-700 dark:text-emerald-400 font-bold">
                    {currentStep === 3 ? `> Halo, ${userNameInput}!` : '> Menunggu eksekusi...'}
                  </div>
                </div>

                <span className="text-xs text-slate-600 dark:text-slate-400 block font-mono font-semibold">
                  Fungsi: <code>output(&quot;Halo, &quot;, nama)</code>
                </span>
              </div>

            </div>

            {/* Action Controls & Code Sync */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              <div className="md:col-span-5 flex gap-2">
                <button
                  onClick={handleNext}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm py-3 px-5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>{currentStep === 0 ? "1. Mulai Baca Input" : currentStep === 1 ? "2. Simpan ke RAM" : currentStep === 2 ? "3. Tampilkan ke Layar" : "Ulangi Lagi"}</span>
                </button>
                <button
                  onClick={handleReset}
                  className="p-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer border border-border/60"
                  title="Reset"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              {/* Code Sync Box with Language Switcher */}
              <div className="md:col-span-7 bg-white dark:bg-slate-900 p-4 rounded-2xl border-2 border-border/60 font-mono text-xs sm:text-sm shadow-xs space-y-2">
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <span className="text-xs sm:text-sm font-sans font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    Representasi Kode Eksekusi:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCodeLang('pseudocode')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                        codeLang === 'pseudocode' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      Pseudocode
                    </button>
                    <button
                      onClick={() => setCodeLang('python')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                        codeLang === 'python' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      Python 3
                    </button>
                    <button
                      onClick={() => setCodeLang('javascript')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                        codeLang === 'javascript' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      JavaScript
                    </button>
                  </div>
                </div>

                {codeLang === 'pseudocode' && (
                  <div className="space-y-1 leading-relaxed font-semibold">
                    <div className="text-violet-700 dark:text-violet-400 font-black">PROGRAM SapaanPengguna</div>
                    <div className="text-teal-700 dark:text-teal-300 font-bold">KAMUS:</div>
                    <div className="pl-4 text-sky-800 dark:text-sky-300">nama : string</div>
                    <div className="text-teal-700 dark:text-teal-300 font-bold">ALGORITMA:</div>
                    <div className={`pl-4 ${currentStep === 1 ? 'text-cyan-800 dark:text-cyan-300 font-bold bg-cyan-500/20 px-1 rounded' : 'text-slate-700 dark:text-slate-400'}`}>
                      input(nama)
                    </div>
                    <div className={`pl-4 ${currentStep === 3 ? 'text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-500/20 px-1 rounded' : 'text-slate-700 dark:text-slate-400'}`}>
                      output(&quot;Halo, &quot;, nama)
                    </div>
                  </div>
                )}

                {codeLang === 'python' && (
                  <div className="space-y-1 leading-relaxed font-semibold">
                    <div className="text-slate-500 text-xs font-sans"># Python 3 — Notasi Universal I/O</div>
                    <div className={currentStep === 1 ? 'text-cyan-800 dark:text-cyan-300 font-bold bg-cyan-500/20 px-2 py-0.5 rounded' : 'text-slate-700 dark:text-slate-400'}>
                      nama = input(&quot;Masukkan nama: &quot;)
                    </div>
                    <div className={currentStep === 3 ? 'text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded' : 'text-slate-700 dark:text-slate-400'}>
                      output(&quot;Halo, &quot;, nama)
                    </div>
                  </div>
                )}

                {codeLang === 'javascript' && (
                  <div className="space-y-1 leading-relaxed font-semibold">
                    <div className="text-slate-500 text-xs font-sans">// JavaScript I/O Console</div>
                    <div className={currentStep === 1 ? 'text-cyan-800 dark:text-cyan-300 font-bold bg-cyan-500/20 px-2 py-0.5 rounded' : 'text-slate-700 dark:text-slate-400'}>
                      let nama = prompt(&quot;Masukkan nama:&quot;);
                    </div>
                    <div className={currentStep === 3 ? 'text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded' : 'text-slate-700 dark:text-slate-400'}>
                      console.log(`Halo, $&#123;nama&#125;!`);
                    </div>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        )}

      </div>

    </div>
  );
}
