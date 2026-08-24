"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Keyboard, 
  Monitor, 
  Cpu, 
  ArrowRight, 
  Play, 
  RotateCcw, 
  Sparkles,
  Terminal,
  Code2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Filter,
  Zap
} from 'lucide-react';

export default function IOBridgeVisualizer() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'string_trap'>('string_trap'); // Default to string trap for high pedagogical impact

  // TAB 1: Basic Pipeline State
  const [userNameInput, setUserNameInput] = useState('Sarah');
  const [currentStep, setCurrentStep] = useState(0); // 0: Idle, 1: Inputting, 2: In RAM, 3: Output to Monitor
  const [codeLang, setCodeLang] = useState<'pseudocode' | 'python' | 'javascript'>('python');

  // TAB 2: String Trap & Type Casting Demo State
  const [numA, setNumA] = useState('10');
  const [numB, setNumB] = useState('20');
  const [useTypeCasting, setUseTypeCasting] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

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
    <div className="border border-border/60 rounded-3xl overflow-visible bg-slate-950 shadow-2xl space-y-0">
      
      {/* Header Bar */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 rounded-t-3xl">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-100">
            Laboratorium I/O: Aliran Data &amp; Bukti Input Selalu String
          </h3>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('string_trap')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'string_trap' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            <span>⚠️ Jebakan: Input Selalu String!</span>
          </button>
          
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'pipeline' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Pipeline Aliran 3-Tahap</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="p-4 md:p-6 space-y-6">
        
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
            <div className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-2xl space-y-2 text-xs md:text-sm">
              <div className="flex items-center gap-2 text-amber-400 font-bold font-mono uppercase tracking-wider text-xs">
                <AlertTriangle className="w-4 h-4" />
                <span>Aturan Emas Pemrograman (*Golden Rule*):</span>
              </div>
              <p className="text-slate-200 leading-relaxed font-medium">
                Papan ketik (keyboard) mengirim sinyal tombol sebagai <strong>karakter teks (String)</strong>. Meskipun pengguna mengetik angka <code>10</code>, fungsi <code>input()</code> membacanya sebagai teks bertanda petik: <code className="bg-slate-900 text-amber-300 px-1.5 py-0.5 rounded font-mono font-bold">&quot;10&quot;</code>!
              </p>
            </div>

            {/* Toggle Casting Mode Switch */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <span className="text-xs font-bold text-slate-200 block">Pilih Mode Eksekusi Program:</span>
                <span className="text-[11px] text-slate-400">Lihat perbedaan hasil kalkulasi secara nyata</span>
              </div>

              <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setUseTypeCasting(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    !useTypeCasting ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>1. Tanpa Type Casting (String)</span>
                </button>
                <button
                  onClick={() => setUseTypeCasting(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    useTypeCasting ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>2. Dengan Type Casting (int)</span>
                </button>
              </div>
            </div>

            {/* Visual Animated Pipeline for String Trap */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Box 1: Keyboard Input */}
              <div className="md:col-span-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Keyboard className="w-4 h-4 text-cyan-400" />
                    1. Pengguna Ketik Angka:
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300 bg-slate-950 px-2 py-0.5 rounded">
                    Keyboard
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Input Angka 1:</label>
                    <input 
                      type="text" 
                      value={numA} 
                      onChange={(e) => setNumA(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Input Angka 2:</label>
                    <input 
                      type="text" 
                      value={numB} 
                      onChange={(e) => setNumB(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="hidden md:flex md:col-span-1 justify-center">
                <ArrowRight className="w-5 h-5 text-cyan-400" />
              </div>

              {/* Box 2: Memory & Casting Filter */}
              <div className={`md:col-span-4 p-4 rounded-2xl border-2 transition-all space-y-3 ${
                useTypeCasting 
                  ? 'bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                  : 'bg-rose-500/10 border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
              }`}>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Filter className={`w-4 h-4 ${useTypeCasting ? 'text-emerald-400' : 'text-rose-400'}`} />
                    2. Filter di Memori RAM:
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    useTypeCasting ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {useTypeCasting ? 'DI-CAST KE INT' : 'TETAP STRING'}
                  </span>
                </div>

                <div className="p-2.5 bg-slate-950/90 rounded-xl border border-white/10 font-mono text-xs space-y-1 text-center">
                  <span className="text-[10px] text-slate-400 block">Status Data di Memori:</span>
                  <div className={`font-bold text-sm ${useTypeCasting ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {useTypeCasting ? `a = ${numA} | b = ${numB}` : `a = "${numA}" | b = "${numB}"`}
                  </div>
                  <span className="text-[10px] text-slate-500 block">
                    {useTypeCasting ? "Tipe: <class 'int'>" : "Tipe: <class 'str'>"}
                  </span>
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="hidden md:flex md:col-span-1 justify-center">
                <ArrowRight className={`w-5 h-5 ${useTypeCasting ? 'text-emerald-400' : 'text-rose-400'}`} />
              </div>

              {/* Box 3: Monitor Output Result */}
              <div className="md:col-span-2 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-center">
                <span className="text-xs font-bold text-slate-200 block">
                  3. Layar Monitor:
                </span>
                <div className={`text-xl font-mono font-extrabold py-2 px-1 rounded-xl bg-slate-950 border ${
                  useTypeCasting ? 'text-emerald-400 border-emerald-500/40' : 'text-rose-400 border-rose-500/40'
                }`}>
                  {result.display}
                </div>
                <span className="text-[9px] text-slate-400 block font-mono">
                  {useTypeCasting ? '✅ Benar (Hitung)' : '❌ Salah (Sambung)'}
                </span>
              </div>

            </div>

            {/* Code Comparison Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.35] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-cyan-400">
                <span className="text-slate-400 font-bold block font-sans">🐍 Sintaks Python yang Digunakan:</span>
                {useTypeCasting ? (
                  <div className="text-emerald-300 space-y-0.5">
                    <div>a = <strong className="text-amber-300 font-bold">int(input(&quot;Angka 1: &quot;))</strong></div>
                    <div>b = <strong className="text-amber-300 font-bold">int(input(&quot;Angka 2: &quot;))</strong></div>
                    <div className="text-cyan-300">print(a + b)  # Output: {result.display}</div>
                  </div>
                ) : (
                  <div className="text-rose-300 space-y-0.5">
                    <div>a = <strong className="text-rose-400">input(&quot;Angka 1: &quot;)</strong>  # Masih &quot;{numA}&quot;</div>
                    <div>b = <strong className="text-rose-400">input(&quot;Angka 2: &quot;)</strong>  # Masih &quot;{numB}&quot;</div>
                    <div className="text-cyan-300">print(a + b)  # Output: {result.display} (Bug!)</div>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.35] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-amber-400">
                <span className="text-slate-400 font-bold block font-sans">🌐 Sintaks JavaScript yang Digunakan:</span>
                {useTypeCasting ? (
                  <div className="text-emerald-300 space-y-0.5">
                    <div>let a = <strong className="text-amber-300 font-bold">parseInt(prompt(&quot;Angka 1:&quot;));</strong></div>
                    <div>let b = <strong className="text-amber-300 font-bold">parseInt(prompt(&quot;Angka 2:&quot;));</strong></div>
                    <div className="text-cyan-300">console.log(a + b); // Output: {result.display}</div>
                  </div>
                ) : (
                  <div className="text-rose-300 space-y-0.5">
                    <div>let a = <strong className="text-rose-400">prompt(&quot;Angka 1:&quot;);</strong> // Masih &quot;{numA}&quot;</div>
                    <div>let b = <strong className="text-rose-400">prompt(&quot;Angka 2:&quot;);</strong> // Masih &quot;{numB}&quot;</div>
                    <div className="text-cyan-300">console.log(a + b); // Output: {result.display} (Bug!)</div>
                  </div>
                )}
              </div>
            </div>

            {/* Explanation Note */}
            <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed flex items-start gap-2.5 ${
              useTypeCasting ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              {useTypeCasting ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
              )}
              <div>
                <strong className="block mb-0.5 font-bold">Penjelasan Sistem Komputer:</strong>
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
            <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center">
              
              {/* Stage 1: INPUT (KEYBOARD) */}
              <div className={`md:col-span-3 p-4 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[160px] ${
                currentStep === 1 
                  ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
                  : 'border-slate-800 bg-slate-900/60 text-slate-400'
              }`}>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 font-sans">
                    <Keyboard className="w-4 h-4 text-cyan-400" />
                    1. Masukan (Input)
                  </span>
                  <span className="text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded text-cyan-300">
                    Papan Ketik
                  </span>
                </div>

                <div className="my-2 space-y-1.5 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Ketik Nama:</span>
                    <input 
                      type="text" 
                      value={userNameInput} 
                      onChange={(e) => setUserNameInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-cyan-300 font-bold focus:outline-none"
                    />
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 block font-mono">
                  Fungsi: <code>input() / READ()</code>
                </span>
              </div>

              {/* Pipe 1 */}
              <div className="md:col-span-1 flex justify-center">
                <ArrowRight className={`w-6 h-6 transition-colors ${currentStep >= 2 ? 'text-cyan-400 stroke-[3]' : 'text-slate-700'}`} />
              </div>

              {/* Stage 2: MEMORY (RAM) */}
              <div className={`md:col-span-3 p-4 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[160px] ${
                currentStep === 2 
                  ? 'border-purple-400 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                  : 'border-slate-800 bg-slate-900/60 text-slate-400'
              }`}>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 font-sans">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    2. Penyimpanan (RAM)
                  </span>
                  <span className="text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded text-purple-300">
                    0x7FFE0
                  </span>
                </div>

                <div className="my-2 text-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block font-mono">Variabel: nama</span>
                  <strong className="text-sm font-mono font-extrabold text-purple-300 block">
                    {currentStep >= 2 ? `"${userNameInput}"` : '-'}
                  </strong>
                </div>

                <span className="text-[10px] text-slate-400 block font-mono">
                  Alokasi Petak Memori
                </span>
              </div>

              {/* Pipe 2 */}
              <div className="md:col-span-1 flex justify-center">
                <ArrowRight className={`w-6 h-6 transition-colors ${currentStep >= 3 ? 'text-emerald-400 stroke-[3]' : 'text-slate-700'}`} />
              </div>

              {/* Stage 3: OUTPUT (MONITOR) */}
              <div className={`md:col-span-3 p-4 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[160px] ${
                currentStep === 3 
                  ? 'border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                  : 'border-slate-800 bg-slate-900/60 text-slate-400'
              }`}>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 font-sans">
                    <Monitor className="w-4 h-4 text-emerald-400" />
                    3. Keluaran (Output)
                  </span>
                  <span className="text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded text-emerald-300">
                    Layar Terminal
                  </span>
                </div>

                <div className="my-2 bg-slate-950 p-2 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
                  <div className="text-emerald-400 font-bold">
                    {currentStep === 3 ? `> Halo, ${userNameInput}!` : '> Menunggu eksekusi...'}
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 block font-mono">
                  Fungsi: <code>print() / WRITE()</code>
                </span>
              </div>

            </div>

            {/* Action Controls & Code Sync */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              <div className="md:col-span-5 flex gap-2">
                <button
                  onClick={handleNext}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>{currentStep === 0 ? "1. Mulai Baca Input" : currentStep === 1 ? "2. Simpan ke RAM" : currentStep === 2 ? "3. Tampilkan ke Layar" : "Ulangi Lagi"}</span>
                </button>
                <button
                  onClick={handleReset}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="md:col-span-7 bg-slate-900 p-3 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300">
                {codeLang === 'pseudocode' && (
                  <div className="space-y-0.5">
                    <div className="text-purple-400 font-bold">DEKLARASI: nama : string</div>
                    <div className={currentStep === 1 ? 'text-cyan-300 font-bold bg-cyan-500/20 px-2 py-0.5 rounded' : 'text-slate-400'}>
                      input(nama)
                    </div>
                    <div className={currentStep === 3 ? 'text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded' : 'text-slate-400'}>
                      output(&quot;Halo, &quot; + nama)
                    </div>
                  </div>
                )}

                {codeLang === 'python' && (
                  <div className="space-y-0.5">
                    <div className="text-slate-500 text-[11px]"># Python 3 I/O Mechanism</div>
                    <div className={currentStep === 1 ? 'text-cyan-300 font-bold bg-cyan-500/20 px-2 py-0.5 rounded' : 'text-slate-400'}>
                      nama = input(&quot;Masukkan nama: &quot;)
                    </div>
                    <div className={currentStep === 3 ? 'text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded' : 'text-slate-400'}>
                      print(f&quot;Halo, &#123;nama&#125;!&quot;)
                    </div>
                  </div>
                )}

                {codeLang === 'javascript' && (
                  <div className="space-y-0.5">
                    <div className="text-slate-500 text-[11px]">// JavaScript I/O Mechanism</div>
                    <div className={currentStep === 1 ? 'text-cyan-300 font-bold bg-cyan-500/20 px-2 py-0.5 rounded' : 'text-slate-400'}>
                      let nama = prompt(&quot;Masukkan nama:&quot;);
                    </div>
                    <div className={currentStep === 3 ? 'text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded' : 'text-slate-400'}>
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
