"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Unlock, 
  RotateCcw, 
  AlertOctagon, 
  RefreshCw, 
  Check, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export default function ConstantVsVariable() {
  const [varScore, setVarScore] = useState<number>(100);
  const constPi = 3.14159;
  const [errorTriggered, setErrorTriggered] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleUpdateVar = () => {
    setVarScore(prev => prev + 50);
  };

  const handleAttemptConstantChange = () => {
    setErrorTriggered(true);
    setErrorMessage('TypeError: Assignment to constant variable. (Sistem komputasi melarang keras pengubahan nilai yang telah dikunci!)');
  };

  const handleReset = () => {
    setVarScore(100);
    setErrorTriggered(false);
    setErrorMessage('');
  };

  return (
    <div className="border border-border/80 dark:border-slate-800 rounded-3xl overflow-visible bg-card dark:bg-slate-950 shadow-xl space-y-0">
      
      {/* Header Bar */}
      <div className="p-4 md:px-6 bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between rounded-t-3xl">
        <div className="flex items-center gap-2.5">
          <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-900 dark:text-slate-100">
            Variabel vs Konstanta: Konsep Nilai Berubah (Mutable) vs Terkunci (Immutable)
          </h3>
        </div>
        <span className="text-xs font-mono font-bold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800 px-3 py-1 rounded-full shadow-xs">
          Mutable vs Const
        </span>
      </div>

      {/* Main Workspace */}
      <div className="p-4 sm:p-6 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* LEFT: VARIABEL (MUTABLE) */}
          <div className="bg-slate-50 dark:bg-slate-900/90 border-2 border-blue-500/40 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-5 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-blue-500">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <Unlock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-black text-blue-700 dark:text-blue-400 text-base sm:text-lg">
                    1. Variabel (Dapat Berubah)
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold bg-blue-100 dark:bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-500/30 px-2.5 py-0.5 rounded-full">
                  MUTABLE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4 font-medium">
                Nilai yang disimpan di dalam variabel dapat diganti atau ditimpa berkali-kali sepanjang jalannya eksekusi program.
              </p>

              {/* Memory Cell Representation */}
              <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border-2 border-blue-500/40 text-center space-y-1.5 my-3 shadow-xs">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-bold block">Alamat RAM: 0x7FFE0 (skor)</span>
                <strong className="text-2xl sm:text-3xl font-mono font-black text-blue-800 dark:text-blue-300 block py-1">
                  skor = {varScore}
                </strong>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono font-bold block">Status: Terbuka untuk perubahan</span>
              </div>
            </div>

            <button
              onClick={handleUpdateVar}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Ubah Nilai: skor = skor + 50</span>
            </button>
          </div>

          {/* RIGHT: KONSTANTA (IMMUTABLE) */}
          <div className="bg-slate-50 dark:bg-slate-900/90 border-2 border-purple-500/40 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-5 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-purple-500">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h4 className="font-black text-purple-700 dark:text-purple-400 text-base sm:text-lg">
                    2. Konstanta (Nilai Tetap)
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold bg-purple-100 dark:bg-purple-500/15 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30 px-2.5 py-0.5 rounded-full">
                  READ-ONLY
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4 font-medium">
                Nilai yang dikunci sejak awal deklarasi. Komputer melarang penggantian nilai konstanta untuk mencegah *bug* fatal.
              </p>

              {/* Memory Cell Representation */}
              <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border-2 border-purple-500/40 text-center space-y-1.5 my-3 relative overflow-hidden shadow-xs">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-bold block">Alamat RAM: 0x7FFE8 (PI)</span>
                <strong className="text-2xl sm:text-3xl font-mono font-black text-purple-800 dark:text-purple-300 block py-1">
                  const PI = {constPi}
                </strong>
                <span className="text-xs text-amber-700 dark:text-amber-400 font-mono font-bold flex items-center justify-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> Terkunci Permanen
                </span>
              </div>
            </div>

            <button
              onClick={handleAttemptConstantChange}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-purple-400/40"
            >
              <AlertOctagon className="w-4 h-4 text-amber-300" />
              <span>Coba Paksa Ubah: PI = 3.5</span>
            </button>
          </div>

        </div>

        {/* Dynamic Error / Success Alert Box */}
        <AnimatePresence>
          {errorTriggered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 sm:p-5 bg-rose-50 dark:bg-rose-500/15 border-2 border-rose-300 dark:border-rose-500/40 rounded-2xl text-xs sm:text-sm space-y-2 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2 font-mono text-xs sm:text-sm">
                  <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  Peringatan Sistem Komputer:
                </span>
                <button
                  onClick={handleReset}
                  className="text-xs text-rose-700 dark:text-rose-300 hover:underline font-mono cursor-pointer font-bold px-2 py-1 rounded-md hover:bg-rose-100 dark:hover:bg-rose-900/40"
                >
                  Tutup Pesan
                </button>
              </div>
              <p className="text-slate-800 dark:text-slate-200 font-mono leading-relaxed font-bold">
                {errorMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Real-World Constants Table */}
        <div className="p-4 bg-slate-100 dark:bg-slate-900/60 rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <span className="font-bold text-slate-900 dark:text-slate-100">Contoh Penggunaan Konstanta Nyata:</span>
          <span className="font-mono text-purple-700 dark:text-purple-300 font-bold bg-white dark:bg-slate-950 px-2.5 py-1 rounded-lg border border-purple-200 dark:border-purple-800/40 shadow-2xs">GRAVITASI = 9.8</span>
          <span className="text-slate-400 dark:text-slate-600">&bull;</span>
          <span className="font-mono text-purple-700 dark:text-purple-300 font-bold bg-white dark:bg-slate-950 px-2.5 py-1 rounded-lg border border-purple-200 dark:border-purple-800/40 shadow-2xs">KECEPATAN_CAHAYA = 299792458</span>
          <span className="text-slate-400 dark:text-slate-600">&bull;</span>
          <span className="font-mono text-purple-700 dark:text-purple-300 font-bold bg-white dark:bg-slate-950 px-2.5 py-1 rounded-lg border border-purple-200 dark:border-purple-800/40 shadow-2xs">MAX_LOGIN_ATTEMPTS = 3</span>
        </div>

      </div>

    </div>
  );
}
