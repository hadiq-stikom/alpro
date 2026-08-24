"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Unlock, 
  Sparkles, 
  AlertOctagon, 
  CheckCircle2, 
  RefreshCw,
  Cpu,
  ShieldAlert
} from 'lucide-react';

export default function ConstantVsVariable() {
  const [varScore, setVarScore] = useState<number>(100);
  const [constPi] = useState<number>(3.14159);
  const [attemptedPi, setAttemptedPi] = useState<string>('3.5');
  const [errorTriggered, setErrorTriggered] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleUpdateVar = () => {
    setVarScore(prev => prev + 50);
  };

  const handleAttemptConstantChange = () => {
    setErrorTriggered(true);
    setErrorMessage(
      'TypeError: Assignment to constant variable. Nilai konstanta (const) telah dikunci di memori dan TIDAK DAPAT diubah selama program berjalan!'
    );
  };

  const handleReset = () => {
    setVarScore(100);
    setErrorTriggered(false);
    setErrorMessage('');
  };

  return (
    <div className="border border-border/60 rounded-3xl overflow-visible bg-slate-950 shadow-2xl">
      
      {/* Header Bar */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between rounded-t-3xl">
        <div className="flex items-center gap-2.5">
          <Lock className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-100">
            Variabel vs Konstanta: Konsep Nilai Berubah (Mutable) vs Terkunci (Immutable)
          </h3>
        </div>
        <span className="text-xs font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 px-3 py-0.5 rounded-full">
          Mutable vs Const
        </span>
      </div>

      {/* Main Workspace */}
      <div className="p-4 md:p-6 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* LEFT: VARIABEL (MUTABLE) */}
          <div className="bg-slate-900/90 border border-blue-500/30 rounded-2xl p-5 shadow-inner flex flex-col justify-between space-y-4 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.35] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-blue-400">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Unlock className="w-5 h-5 text-blue-400" />
                  <h4 className="font-extrabold text-blue-400 text-sm md:text-base">
                    1. Variabel (Dapat Berubah)
                  </h4>
                </div>
                <span className="text-[10px] font-mono font-bold bg-blue-500/10 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded">
                  MUTABLE
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Nilai yang disimpan di dalam variabel dapat diganti atau ditimpa berkali-kali sepanjang jalannya eksekusi program.
              </p>

              {/* Memory Cell Representation */}
              <div className="p-3 bg-slate-950 rounded-xl border border-blue-500/40 text-center space-y-1 my-2">
                <span className="text-[10px] text-slate-500 font-mono block">Alamat RAM: 0x7FFE0 (skor)</span>
                <strong className="text-xl font-mono font-extrabold text-blue-300 block">
                  skor = {varScore}
                </strong>
                <span className="text-[10px] text-emerald-400 font-mono">Status: Terbuka untuk perubahan</span>
              </div>
            </div>

            <button
              onClick={handleUpdateVar}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Ubah Nilai: skor = skor + 50</span>
            </button>
          </div>

          {/* RIGHT: KONSTANTA (IMMUTABLE) */}
          <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-5 shadow-inner flex flex-col justify-between space-y-4 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.35] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-purple-400">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-purple-400" />
                  <h4 className="font-extrabold text-purple-400 text-sm md:text-base">
                    2. Konstanta (Nilai Tetap)
                  </h4>
                </div>
                <span className="text-[10px] font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded">
                  READ-ONLY
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Nilai yang dikunci sejak awal deklarasi. Komputer melarang penggantian nilai konstanta untuk mencegah *bug* fatal.
              </p>

              {/* Memory Cell Representation */}
              <div className="p-3 bg-slate-950 rounded-xl border border-purple-500/40 text-center space-y-1 my-2 relative overflow-hidden">
                <span className="text-[10px] text-slate-500 font-mono block">Alamat RAM: 0x7FFE8 (PI)</span>
                <strong className="text-xl font-mono font-extrabold text-purple-300 block">
                  const PI = {constPi}
                </strong>
                <span className="text-[10px] text-amber-400 font-mono flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" /> Terkunci Permanen
                </span>
              </div>
            </div>

            <button
              onClick={handleAttemptConstantChange}
              className="w-full bg-purple-600/80 hover:bg-purple-600 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer border border-purple-400/40"
            >
              <AlertOctagon className="w-3.5 h-3.5 text-amber-300" />
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
              className="p-4 bg-rose-500/15 border border-rose-500/40 rounded-2xl text-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-400 flex items-center gap-2 font-mono">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  Peringatan Sistem Komputer:
                </span>
                <button
                  onClick={handleReset}
                  className="text-[11px] text-rose-300 hover:text-white underline font-mono cursor-pointer"
                >
                  Tutup Pesan
                </button>
              </div>
              <p className="text-slate-200 font-mono leading-relaxed">
                {errorMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Real-World Constants Table */}
        <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <span className="font-bold text-slate-300">Contoh Penggunaan Konstanta Nyata:</span>
          <span className="font-mono text-purple-300">GRAVITASI = 9.8</span>
          <span className="text-slate-600">&bull;</span>
          <span className="font-mono text-purple-300">KECEPATAN_CAHAYA = 299792458</span>
          <span className="text-slate-600">&bull;</span>
          <span className="font-mono text-purple-300">MAX_LOGIN_ATTEMPTS = 3</span>
        </div>

      </div>

    </div>
  );
}
