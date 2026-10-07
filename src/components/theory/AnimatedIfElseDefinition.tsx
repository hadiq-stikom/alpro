"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Sparkles, Check, X, RotateCw, GitMerge, ArrowLeft, ArrowRight } from 'lucide-react';

// ── Karakter Traveler Animatif yang Halus ───────────────────────────────────────
function AnimatedTraveler({ walking, direction }: { walking: boolean; direction: 'up' | 'left' | 'right' | 'idle' }) {
  return (
    <div className="relative flex flex-col items-center justify-center select-none pointer-events-none">
      <motion.div
        animate={walking ? { scale: [1, 0.75, 1], opacity: [0.6, 0.35, 0.6] } : { scale: 1, opacity: 0.5 }}
        transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-7 h-2 rounded-full bg-slate-950/80 absolute -bottom-1 blur-[1px]"
      />

      <motion.div
        animate={walking ? { y: [0, -4, 0] } : { y: 0 }}
        transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <svg width="34" height="48" viewBox="0 0 34 48" fill="none" className="drop-shadow-md">
          {/* Topi Mahasiswa / Rambut */}
          <ellipse cx="17" cy="10" rx="7.5" ry="4" fill="#d97706" />
          <rect x="11.5" y="7" width="11" height="4" rx="2" fill="#b45309" />

          {/* Kepala & Wajah */}
          <circle cx="17" cy="13" r="6" fill="#fcd34d" />
          {direction !== 'up' && (
            <>
              <circle cx={direction === 'left' ? 14 : direction === 'right' ? 19 : 15.5} cy="12.5" r="1" fill="#1e293b" />
              <circle cx={direction === 'left' ? 17.5 : direction === 'right' ? 22 : 18.5} cy="12.5" r="1" fill="#1e293b" />
            </>
          )}

          {/* Badan / Baju Kuning Keemasan Amber */}
          <path d="M12 19 C12 18, 22 18, 22 19 L23 30 C23 31, 11 31, 11 30 Z" fill="#f59e0b" />
          
          {/* Ransel */}
          {direction === 'up' && (
            <rect x="13" y="20" width="8" height="9" rx="2" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
          )}

          {/* Tangan Kiri */}
          <motion.line
            x1={12} y1={21} x2={7} y2={28}
            initial={{ x2: 7, y2: 28 }}
            animate={walking ? { x2: [7, 14, 7], y2: [28, 23, 28] } : { x2: 7, y2: 28 }}
            transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
            stroke="#fcd34d" strokeWidth={3} strokeLinecap="round"
          />

          {/* Tangan Kanan */}
          <motion.line
            x1={22} y1={21} x2={27} y2={28}
            initial={{ x2: 27, y2: 28 }}
            animate={walking ? { x2: [27, 20, 27], y2: [28, 23, 28] } : { x2: 27, y2: 28 }}
            transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            stroke="#fcd34d" strokeWidth={3} strokeLinecap="round"
          />

          {/* Celana */}
          <rect x={12} y={30} width={10} height={5} fill="#1e293b" />

          {/* Kaki Kiri */}
          <motion.line
            x1={14} y1={34} x2={11} y2={44}
            initial={{ x2: 11, y2: 44 }}
            animate={walking ? { x2: [11, 17, 11], y2: [44, 40, 44] } : { x2: 11, y2: 44 }}
            transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
            stroke="#1e293b" strokeWidth={3.5} strokeLinecap="round"
          />
          <motion.circle
            cx={10.5} cy={44} r={2}
            initial={{ cx: 10.5, cy: 44 }}
            animate={walking ? { cx: [10.5, 17, 10.5], cy: [44, 40, 44] } : { cx: 10.5, cy: 44 }}
            transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
            fill="#d97706"
          />

          {/* Kaki Kanan */}
          <motion.line
            x1={20} y1={34} x2={23} y2={44}
            initial={{ x2: 23, y2: 44 }}
            animate={walking ? { x2: [23, 17, 23], y2: [44, 40, 44] } : { x2: 23, y2: 44 }}
            transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            stroke="#1e293b" strokeWidth={3.5} strokeLinecap="round"
          />
          <motion.circle
            cx={23.5} cy={44} r={2}
            initial={{ cx: 23.5, cy: 44 }}
            animate={walking ? { cx: [23.5, 17, 23.5], cy: [44, 40, 44] } : { cx: 23.5, cy: 44 }}
            transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            fill="#d97706"
          />
        </svg>
      </motion.div>
    </div>
  );
}

// ── Definisi Tipe & Data Skenario Percabangan Statemen Ganda (IF-ELSE) ──────────
interface IfElseScenario {
  id: string;
  label: string;
  condition: string;
  conditionFn: (v: number) => boolean;
  sliderMin: number;
  sliderMax: number;
  sliderDefault: number;
  sliderUnit: string;
  
  // Cabang IF (Saat True)
  ifActionTitle: string;
  ifActionDesc: string;
  ifActionEmoji: string;
  
  // Cabang ELSE (Saat False)
  elseActionTitle: string;
  elseActionDesc: string;
  elseActionEmoji: string;

  // Titik Penyatuan (Merge Destination)
  mergeDestTitle: string;
  mergeDestDesc: string;
}

const IF_ELSE_SCENARIOS: IfElseScenario[] = [
  {
    id: 'kelulusan',
    label: '🎓 Nilai KKM Kelulusan',
    condition: 'nilai ≥ 75',
    conditionFn: v => v >= 75,
    sliderMin: 40, sliderMax: 100, sliderDefault: 82, sliderUnit: '',
    ifActionTitle: 'POS LULUS',
    ifActionDesc: 'Nilai ≥ 75 → output("Selamat, Anda LULUS!")',
    ifActionEmoji: '🎉',
    elseActionTitle: 'POS REMEDIAL',
    elseActionDesc: 'Nilai < 75 → output("Ikuti Ujian Remedial")',
    elseActionEmoji: '📚',
    mergeDestTitle: 'Cetak Lembar Nilai',
    mergeDestDesc: 'Kedua cabang menyatu kembali untuk mencetak rapor',
  },
  {
    id: 'tiket',
    label: '🎟️ Loket Tiket Bioskop',
    condition: 'usia ≥ 12',
    conditionFn: v => v >= 12,
    sliderMin: 3, sliderMax: 65, sliderDefault: 16, sliderUnit: ' thn',
    ifActionTitle: 'TIKET DEWASA',
    ifActionDesc: 'Usia ≥ 12 → harga = Rp50.000 ("Dewasa")',
    ifActionEmoji: '🧑',
    elseActionTitle: 'TIKET ANAK',
    elseActionDesc: 'Usia < 12 → harga = Rp25.000 ("Anak-anak")',
    elseActionEmoji: '🧒',
    mergeDestTitle: 'Pintu Masuk Teater',
    mergeDestDesc: 'Kedua jalur membawa tiket menuju pintu teater',
  },
  {
    id: 'saldo',
    label: '🏧 Penarikan Tunai ATM',
    condition: 'saldo ≥ 200',
    conditionFn: v => v >= 200,
    sliderMin: 50, sliderMax: 500, sliderDefault: 350, sliderUnit: ' rb',
    ifActionTitle: 'DISPENSER UANG',
    ifActionDesc: 'Saldo cukup → Uang tunai Rp200.000 keluar',
    ifActionEmoji: '💵',
    elseActionTitle: 'TOLAK TRANSAKSI',
    elseActionDesc: 'Saldo kurang → output("Saldo Tidak Mencukupi")',
    elseActionEmoji: '🚫',
    mergeDestTitle: 'Keluarkan Kartu ATM',
    mergeDestDesc: 'Baik berhasil atau gagal, kartu ATM selalu dikembalikan',
  },
];

type IfElsePhase = 0 | 1 | 2 | 3 | 4 | 5;

// ── Canvas Simulasi Percabangan Statemen Ganda (Dual Branch + Merge Node) ───────
function IfElseScene({ scenario, value }: { scenario: IfElseScenario; value: number }) {
  const [phase, setPhase] = useState<IfElsePhase>(0);
  const isTrue = scenario.conditionFn(value);

  const play = () => {
    setPhase(0);
    const t1 = setTimeout(() => setPhase(1), 150); // jalan ke diamond keputusan
    const t2 = setTimeout(() => setPhase(2), 1100); // evaluasi kondisi diamond
    const t3 = setTimeout(() => setPhase(3), 2100); // hasil boolean ditentukan
    const t4 = setTimeout(() => setPhase(4), 2800); // traveler masuk ke Pos IF atau Pos ELSE
    const t5 = setTimeout(() => setPhase(5), 3700); // kedua jalur menyatu ke Merge Node
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  };

  useEffect(() => {
    const cleanup = play();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, scenario.id]);

  // Posisi Koordinat Karakter:
  // Phase 0: bawah (50%, 88%)
  // Phase 1..3: di depan diamond keputusan (50%, 56%)
  // Phase 4:
  //   - Jika True: di pos cabang kiri (22%, 52%)
  //   - Jika False: di pos cabang kanan (78%, 52%)
  // Phase 5:
  //   - Baik True maupun False berkumpul di titik penyatuan (Merge Node) di atas (50%, 18%)
  const charX = phase <= 3 ? '50%'
    : phase === 4 ? (isTrue ? '22%' : '78%')
    : '50%';

  const charY = phase === 0 ? '88%'
    : phase <= 3 ? '56%'
    : phase === 4 ? '52%'
    : '18%';

  const charDirection = phase === 1 ? 'up'
    : phase === 4 ? (isTrue ? 'left' : 'right')
    : phase === 5 ? (isTrue ? 'right' : 'left')
    : 'idle';

  return (
    <div className="relative w-full h-full min-h-[380px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-700/80 shadow-2xl flex flex-col justify-between">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
      
      {/* ── Jalan Masuk dari Bawah ke Diamond ──────────────────────────────── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 md:w-20 bg-slate-800 border-x-2 border-slate-600/80 shadow-inner rounded-t-xl" style={{ height: '42%' }}>
        <div className="absolute inset-y-0 left-1/2 -translate-x-0.5 flex flex-col justify-around py-2">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1 h-4 bg-amber-400/60 rounded-full" />
          ))}
        </div>
      </div>

      {/* ── Jalur Cabang IF (Kiri - Emerald) ─────────────────────────────────── */}
      <div className={`absolute top-[28%] bottom-[38%] left-6 md:left-8 w-28 md:w-32 border-l-2 border-y-2 rounded-l-3xl transition-all duration-500 pointer-events-none ${
        phase >= 3 && isTrue
          ? 'border-emerald-400 bg-emerald-950/25 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
          : 'border-slate-700/40 bg-transparent'
      }`}>
        <div className="absolute -top-2.5 right-2 text-emerald-400 text-[10px] font-bold font-mono">
          {isTrue && phase >= 4 ? 'Menyatu ➔' : ''}
        </div>
        <div className="absolute -bottom-2.5 right-2 text-emerald-400 text-[10px] font-bold font-mono">
          {isTrue && phase >= 3 ? '← Cabang IF' : ''}
        </div>
      </div>

      {/* ── Jalur Cabang ELSE (Kanan - Rose) ─────────────────────────────────── */}
      <div className={`absolute top-[28%] bottom-[38%] right-6 md:right-8 w-28 md:w-32 border-r-2 border-y-2 rounded-r-3xl transition-all duration-500 pointer-events-none ${
        phase >= 3 && !isTrue
          ? 'border-rose-400 bg-rose-950/25 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
          : 'border-slate-700/40 bg-transparent'
      }`}>
        <div className="absolute -top-2.5 left-2 text-rose-400 text-[10px] font-bold font-mono">
          {(!isTrue) && phase >= 4 ? '⬅ Menyatu' : ''}
        </div>
        <div className="absolute -bottom-2.5 left-2 text-rose-400 text-[10px] font-bold font-mono">
          {(!isTrue) && phase >= 3 ? 'Cabang ELSE →' : ''}
        </div>
      </div>

      {/* ── Titik Penyatuan Kembali (Merge Node / Lingkaran Konektor) ──────── */}
      <div className="absolute top-[16%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
        <motion.div
          animate={{
            scale: phase === 5 ? [1, 1.15, 1] : 1,
            boxShadow: phase === 5 ? '0 0 25px rgba(2,132,199,0.7)' : '0 0 0px transparent',
          }}
          transition={{ duration: 0.5 }}
          className={`px-3 py-1.5 rounded-2xl border-2 flex items-center gap-1.5 backdrop-blur-md transition-all duration-300 ${
            phase === 5
              ? 'bg-sky-950/95 border-sky-400 text-sky-100 ring-2 ring-sky-500/50'
              : 'bg-slate-900/80 border-slate-700 text-slate-400'
          }`}
        >
          <GitMerge className="w-3.5 h-3.5 text-sky-400 rotate-180" />
          <div className="text-left font-mono">
            <span className="text-[10px] font-black uppercase block tracking-wider text-sky-300">Merge Node</span>
            <span className="text-[9px] font-medium block truncate max-w-[120px]">{scenario.mergeDestTitle}</span>
          </div>
        </motion.div>
      </div>

      {/* ── Pos Aksi IF (KIRI - Dijalankan Saat True) ───────────────────────── */}
      <div className="absolute left-2 md:left-4 top-[52%] -translate-y-1/2 z-20">
        <motion.div
          animate={{
            scale: phase === 4 && isTrue ? [1, 1.1, 1] : 1,
            boxShadow: phase >= 3 && isTrue ? '0 0 30px rgba(16,185,129,0.6)' : '0 0 0px transparent',
          }}
          transition={{ duration: 0.5 }}
          className={`flex flex-col items-center p-2.5 md:p-3 rounded-2xl border-2 transition-all duration-300 backdrop-blur-md ${
            phase >= 3 && isTrue
              ? 'bg-emerald-950/95 border-emerald-400 ring-2 ring-emerald-500/50'
              : 'bg-slate-900/85 border-slate-700 opacity-40'
          }`}
        >
          <div className="flex items-center gap-1 mb-0.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isTrue ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            <span className="text-[9px] font-mono font-extrabold uppercase tracking-wider text-emerald-300">
              Jalur IF (True)
            </span>
          </div>
          <span className="text-2xl md:text-3xl my-0.5 filter drop-shadow">{scenario.ifActionEmoji}</span>
          <span className="text-xs md:text-sm font-black text-white tracking-wide">{scenario.ifActionTitle}</span>
          <span className="text-[8px] md:text-[9px] font-semibold text-emerald-200/80 max-w-[110px] text-center truncate">
            Aksi A Dieksekusi
          </span>
        </motion.div>
      </div>

      {/* ── Pos Aksi ELSE (KANAN - Dijalankan Saat False) ────────────────────── */}
      <div className="absolute right-2 md:right-4 top-[52%] -translate-y-1/2 z-20">
        <motion.div
          animate={{
            scale: phase === 4 && !isTrue ? [1, 1.1, 1] : 1,
            boxShadow: phase >= 3 && !isTrue ? '0 0 30px rgba(244,63,94,0.6)' : '0 0 0px transparent',
          }}
          transition={{ duration: 0.5 }}
          className={`flex flex-col items-center p-2.5 md:p-3 rounded-2xl border-2 transition-all duration-300 backdrop-blur-md ${
            phase >= 3 && !isTrue
              ? 'bg-rose-950/95 border-rose-400 ring-2 ring-rose-500/50'
              : 'bg-slate-900/85 border-slate-700 opacity-40'
          }`}
        >
          <div className="flex items-center gap-1 mb-0.5">
            <span className={`w-1.5 h-1.5 rounded-full ${!isTrue ? 'bg-rose-400 animate-pulse' : 'bg-slate-500'}`} />
            <span className="text-[9px] font-mono font-extrabold uppercase tracking-wider text-rose-300">
              Jalur ELSE (False)
            </span>
          </div>
          <span className="text-2xl md:text-3xl my-0.5 filter drop-shadow">{scenario.elseActionEmoji}</span>
          <span className="text-xs md:text-sm font-black text-white tracking-wide">{scenario.elseActionTitle}</span>
          <span className="text-[8px] md:text-[9px] font-semibold text-rose-200/80 max-w-[110px] text-center truncate">
            Aksi B Dieksekusi
          </span>
        </motion.div>
      </div>

      {/* ── Diamond Keputusan di Tengah (Center Diamond Decision Hub) ──────── */}
      <div className="absolute top-[56%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
        <motion.div
          animate={{
            scale: phase === 2 ? [1, 1.08, 1] : 1,
            borderColor: phase === 2 ? '#f59e0b' : phase >= 3 ? (isTrue ? '#10b981' : '#f43f5e') : '#64748b',
            boxShadow: phase === 2
              ? '0 0 25px rgba(245,158,11,0.6)'
              : phase >= 3
              ? isTrue
                ? '0 0 25px rgba(16,185,129,0.7)'
                : '0 0 25px rgba(244,63,94,0.7)'
              : '0 4px 15px rgba(0,0,0,0.5)',
          }}
          transition={{ duration: 0.4 }}
          className={`px-3.5 py-2 rounded-2xl border-2 transition-all duration-400 backdrop-blur-lg flex flex-col items-center text-center ${
            phase >= 3
              ? isTrue
                ? 'bg-emerald-950/95 border-emerald-400 text-white'
                : 'bg-rose-950/95 border-rose-400 text-white'
              : phase === 2
              ? 'bg-amber-950/95 border-amber-400 text-amber-200'
              : 'bg-slate-900/95 border-slate-600 text-slate-200'
          }`}
        >
          <div className="flex items-center gap-1 text-[9px] font-mono font-bold tracking-wider opacity-80 uppercase mb-0.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Kondisi Boolean:</span>
          </div>

          <div className="font-mono font-black text-xs md:text-sm tracking-wide text-white">
            {scenario.condition} ?
          </div>

          {/* Badge Status Evaluasi */}
          <div className="mt-1 flex items-center justify-center">
            {phase === 2 && (
              <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1 animate-pulse font-mono">
                Evaluasi ({value}{scenario.sliderUnit})…
              </span>
            )}
            {phase >= 3 && (
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-[10px] md:text-[11px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md ${
                  isTrue
                    ? 'bg-emerald-500 text-emerald-950 border border-emerald-300'
                    : 'bg-rose-500 text-rose-950 border border-rose-300'
                }`}
              >
                {isTrue ? <Check className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3 stroke-[3]" />}
                <span>{isTrue ? 'HASIL: TRUE' : 'HASIL: FALSE'}</span>
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Petunjuk Panah Belok Interaktif ───────────────────────────────── */}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute top-[48%] flex items-center gap-1 font-mono font-black text-[10px] px-2.5 py-1 rounded-full z-30 shadow-lg ${
              isTrue
                ? 'left-[32%] bg-emerald-500 text-slate-950 animate-bounce'
                : 'right-[32%] bg-rose-500 text-slate-950 animate-bounce'
            }`}
          >
            {isTrue ? <ArrowLeft className="w-3.5 h-3.5" /> : null}
            <span>{isTrue ? 'PILIH JALUR IF' : 'PILIH JALUR ELSE'}</span>
            {!isTrue ? <ArrowRight className="w-3.5 h-3.5" /> : null}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Karakter Berjalan ─────────────────────────────────────────────── */}
      <motion.div
        animate={{
          left: charX,
          top: charY,
          x: '-50%',
          y: '-50%',
        }}
        transition={{
          duration: phase === 1 ? 0.95 : phase === 4 ? 0.75 : phase === 5 ? 0.9 : 0.35,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="absolute z-30"
        style={{ left: '50%', top: '88%', transform: 'translate(-50%, -50%)' }}
      >
        <AnimatedTraveler
          walking={phase === 1 || phase === 4 || phase === 5}
          direction={charDirection}
        />
      </motion.div>

      {/* ── Caption Banner Status di Bawah Canvas ─────────────────────────── */}
      <div className="p-3 z-20 mt-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className={`px-3 py-1.5 rounded-xl text-center text-xs font-bold shadow-lg border backdrop-blur-md ${
              phase === 1
                ? 'bg-slate-900/90 border-slate-700 text-slate-200'
                : phase === 2
                ? 'bg-amber-950/90 border-amber-500/80 text-amber-200'
                : phase === 3
                ? isTrue
                  ? 'bg-emerald-950/95 border-emerald-500 text-emerald-100'
                  : 'bg-rose-950/95 border-rose-500 text-rose-100'
                : phase === 4
                ? isTrue
                  ? 'bg-emerald-950/95 border-emerald-500 text-emerald-100'
                  : 'bg-rose-950/95 border-rose-500 text-rose-100'
                : 'bg-sky-950/95 border-sky-500 text-sky-100'
            }`}
          >
            {phase <= 1 && `① Input masuk (${value}${scenario.sliderUnit}): Traveler berjalan menuju pos evaluasi IF-ELSE…`}
            {phase === 2 && `② Evaluasi Kondisi: Memeriksa apakah (${value}${scenario.sliderUnit}) memenuhi "${scenario.condition}"…`}
            {phase === 3 && (isTrue
              ? `③ TRUE! Kondisi terpenuhi → Mengambil Cabang IF (Jalur Kiri).`
              : `③ FALSE! Kondisi tidak terpenuhi → Mengambil Cabang ELSE (Jalur Kanan).`)}
            {phase === 4 && (isTrue
              ? `④ Mengeksekusi Aksi IF: ${scenario.ifActionDesc}`
              : `④ Mengeksekusi Aksi ELSE: ${scenario.elseActionDesc}`)}
            {phase === 5 && `⑤ Penyatuan Alur (Merge): Kedua jalur selesai dan menyatu di "${scenario.mergeDestTitle}".`}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}

// ── Komponen Utama dengan Desain Kartu Flip Berdimensi Ganda ─────────────────
export default function AnimatedIfElseDefinition() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [is3DActive, setIs3DActive] = useState(false);
  const [scenarioId, setScenarioId] = useState('kelulusan');
  const [value, setValue] = useState(82);
  const [replayKey, setReplayKey] = useState(0);

  const scenario = IF_ELSE_SCENARIOS.find(s => s.id === scenarioId)!;
  const isTrue = scenario.conditionFn(value);

  const handleScenarioChange = (id: string) => {
    const sc = IF_ELSE_SCENARIOS.find(s => s.id === id)!;
    setScenarioId(id);
    setValue(sc.sliderDefault);
    setReplayKey(k => k + 1);
  };

  const handleFlipToBack = () => {
    setIs3DActive(true);
    setIsFlipped(true);
  };

  const handleFlipToFront = () => {
    setIsFlipped(false);
  };

  const handleAnimationComplete = () => {
    if (!isFlipped) {
      setIs3DActive(false);
    }
  };

  return (
    <div
      className={`w-full transition-transform duration-300 ease-out origin-center relative z-0 hover:z-50 antialiased ${
        !isFlipped
          ? 'cursor-pointer hover:scale-[1.2] hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-amber-500 hover:ring-2 hover:ring-amber-400/40'
          : ''
      }`}
      style={{
        perspective: is3DActive ? 1400 : undefined,
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      <motion.div
        className="w-full relative antialiased"
        style={{
          transformStyle: is3DActive ? 'preserve-3d' : 'flat',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.65, type: 'spring', stiffness: 200, damping: 24 }}
        onAnimationComplete={handleAnimationComplete}
      >
        
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* 1. SISI DEPAN KARTU: DEFINISI AKADEMIK RESMI PERCABANGAN STATEMEN GANDA */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <div
          onClick={handleFlipToBack}
          className={`w-full p-5 md:p-6 bg-amber-50 dark:bg-slate-950 border-2 border-amber-400 dark:border-amber-600 rounded-3xl shadow-md space-y-4 transition-all antialiased ${
            isFlipped ? 'pointer-events-none absolute inset-0 opacity-0' : 'relative opacity-100'
          }`}
          style={{
            backfaceVisibility: is3DActive ? 'hidden' : 'visible',
            WebkitBackfaceVisibility: is3DActive ? 'hidden' : 'visible',
            transform: is3DActive ? 'translate3d(0, 0, 1px)' : 'none',
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          }}
        >
          {/* Header Definisi */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-extrabold text-xs uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Definisi Akademik Resmi:</span>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/60 dark:hover:bg-amber-800 text-amber-950 dark:text-amber-100 border border-amber-300 dark:border-amber-700 shadow-sm animate-pulse">
              <RotateCw className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Klik untuk Buka Analogi &amp; Animasi</span>
            </div>
          </div>

          {/* Blockquote Teks Definisi */}
          <blockquote className="text-sm md:text-base text-slate-900 dark:text-slate-100 font-semibold leading-relaxed select-none bg-white dark:bg-slate-900 p-4 rounded-2xl border-2 border-amber-200 dark:border-amber-900 hover:border-amber-400 transition-colors shadow-xs">
            &ldquo;<strong className="text-amber-700 dark:text-amber-300 font-black text-base md:text-lg underline decoration-amber-500/40">Percabangan Statemen Ganda (Dual Selection / IF-ELSE)</strong>{' '}
            adalah struktur kontrol algoritma yang menyediakan{' '}
            <strong className="text-emerald-950 dark:text-emerald-200 font-extrabold bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-400 dark:border-emerald-600 inline-block my-0.5 shadow-2xs">
              dua jalur aksi yang saling eksklusif
            </strong>:{' '}
            jalur pertama (IF/then) dieksekusi saat kondisi True, dan jalur kedua (ELSE) dieksekusi saat kondisi False, sehingga{' '}
            <strong className="text-cyan-950 dark:text-cyan-200 font-extrabold bg-cyan-100 dark:bg-cyan-950 px-2 py-0.5 rounded-md border border-cyan-400 dark:border-cyan-600 inline-block my-0.5 shadow-2xs">
              selalu ada tepat satu jalur yang dieksekusi
            </strong>{' '}
            tanpa pengecualian.&rdquo;
          </blockquote>

          {/* Petunjuk Membalik */}
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 pt-0.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Klik kartu untuk membalik &amp; melihat simulasi analogi 2 jalur + titik temu (Merge)</span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* 2. SISI BELAKANG KARTU: SIMULASI 2-KOLOM SPLIT WIDESCREEN             */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <div
          className={`w-full p-4 md:p-6 bg-amber-50 dark:bg-slate-950 border-2 border-amber-400 dark:border-amber-600 rounded-3xl shadow-2xl space-y-4 transition-all antialiased ${
            !isFlipped ? 'pointer-events-none absolute inset-0 opacity-0' : 'relative opacity-100'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) translate3d(0, 0, 1px)',
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          }}
        >
          
          {/* Header Sisi Belakang: Selector Kasus + Tombol Balik */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-amber-200 dark:border-amber-800/80">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">Pilih Kasus IF-ELSE:</span>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {IF_ELSE_SCENARIOS.map(sc => (
                  <button
                    key={sc.id}
                    onClick={() => handleScenarioChange(sc.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                      scenarioId === sc.id
                        ? 'bg-amber-600 text-white shadow-md shadow-amber-500/30 ring-2 ring-amber-400'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tombol Balik ke Definisi */}
            <button
              onClick={handleFlipToFront}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-500/20 transition-all cursor-pointer shrink-0"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Balik ke Definisi</span>
            </button>
          </div>

          {/* ── 2-Column Split Layout: Canvas di Kiri & Kontrol di Kanan ─────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            
            {/* KOLOM KIRI: Canvas Simulasi 2 Jalur Saling Eksklusif */}
            <div className="lg:col-span-7 flex flex-col min-h-[380px]">
              <IfElseScene key={replayKey} scenario={scenario} value={value} />
            </div>

            {/* KOLOM KANAN: Panel Kontrol Input & 3 Pilar Konsep IF-ELSE */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-2.5">
              
              {/* 1. Slider Input Interaktif */}
              <div className="p-3.5 bg-card dark:bg-slate-900 rounded-2xl border-2 border-border/80 dark:border-slate-700 shadow-md space-y-2 text-slate-900 dark:text-white">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">Nilai Input:</span>
                    <span className={`text-sm font-black font-mono px-2.5 py-0.5 rounded-lg border ${
                      isTrue
                        ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-950 dark:text-emerald-200 shadow-xs'
                        : 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-950 dark:text-rose-200 shadow-xs'
                    }`}>
                      {value}{scenario.sliderUnit}
                    </span>
                  </div>

                  <button
                    onClick={() => setReplayKey(k => k + 1)}
                    className="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-600 transition-all cursor-pointer shadow-xs"
                  >
                    <RefreshCcw className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                    <span>Ulangi</span>
                  </button>
                </div>

                {/* Slider track */}
                <div className="flex items-center gap-2.5 pt-0.5">
                  <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400">{scenario.sliderMin}{scenario.sliderUnit}</span>
                  <input
                    type="range"
                    min={scenario.sliderMin}
                    max={scenario.sliderMax}
                    value={value}
                    onChange={e => {
                      setValue(Number(e.target.value));
                      setReplayKey(k => k + 1);
                    }}
                    className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400">{scenario.sliderMax}{scenario.sliderUnit}</span>
                </div>
              </div>

              {/* 2. Banner Keputusan Ringkas */}
              <div className={`p-2.5 rounded-xl border-2 font-mono text-xs font-bold flex items-center justify-between gap-2 shadow-xs ${
                isTrue
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-950 dark:text-emerald-100'
                  : 'bg-rose-50 dark:bg-rose-950/70 border-rose-500 text-rose-950 dark:text-rose-100'
              }`}>
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-sm">{isTrue ? '✅' : '❌'}</span>
                  <span className="truncate">
                    <strong className="underline">{scenario.condition}</strong> = {value}{scenario.sliderUnit}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-md text-[11px] font-black shrink-0 ${
                  isTrue ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                }`}>
                  {isTrue ? 'TRUE (Cabang IF)' : 'FALSE (Cabang ELSE)'}
                </span>
              </div>

              {/* 3. Tiga Pilar Pemetaan Konsep Percabangan Statemen Ganda */}
              <div className="flex flex-col gap-2 flex-1 justify-between">
                {/* Pilar 1 */}
                <div className="p-2.5 rounded-xl border-2 border-amber-300 dark:border-amber-700/80 bg-amber-50/90 dark:bg-amber-950/50 space-y-0.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-black uppercase text-amber-900 dark:text-amber-300">
                    <span>①</span>
                    <span>Kondisi Boolean pada Diamond</span>
                  </div>
                  <p className="text-[11px] text-amber-950 dark:text-amber-100 font-semibold leading-tight">
                    Dievaluasi terhadap input <strong>{value}{scenario.sliderUnit}</strong>: Hasilnya <strong>{isTrue ? 'TRUE' : 'FALSE'}</strong>.
                  </p>
                </div>

                {/* Pilar 2 */}
                <div className={`p-2.5 rounded-xl border-2 space-y-0.5 shadow-2xs ${
                  isTrue
                    ? 'border-emerald-400 dark:border-emerald-700/80 bg-emerald-50/90 dark:bg-emerald-950/50'
                    : 'border-rose-400 dark:border-rose-700/80 bg-rose-50/90 dark:bg-rose-950/50'
                }`}>
                  <div className={`flex items-center gap-1.5 text-[10px] font-mono font-black uppercase ${
                    isTrue ? 'text-emerald-900 dark:text-emerald-300' : 'text-rose-900 dark:text-rose-300'
                  }`}>
                    <span>②</span>
                    <span>Dua Aksi Saling Eksklusif</span>
                  </div>
                  <p className={`text-[11px] font-semibold leading-tight ${
                    isTrue ? 'text-emerald-950 dark:text-emerald-100' : 'text-rose-950 dark:text-rose-100'
                  }`}>
                    {isTrue
                      ? `Kondisi True ➔ Mengeksekusi Aksi IF ("${scenario.ifActionTitle}").`
                      : `Kondisi False ➔ Dijamin mengeksekusi Aksi ELSE ("${scenario.elseActionTitle}").`}
                  </p>
                </div>

                {/* Pilar 3 */}
                <div className="p-2.5 rounded-xl border-2 border-sky-300 dark:border-sky-700/80 bg-sky-50/90 dark:bg-sky-950/50 space-y-0.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-black uppercase text-sky-900 dark:text-sky-300">
                    <span>③</span>
                    <span>Penyatuan Alur (Merge Point)</span>
                  </div>
                  <p className="text-[11px] text-sky-950 dark:text-sky-100 font-semibold leading-tight">
                    Kedua jalur menyatu kembali di <strong>Merge Node ({scenario.mergeDestTitle})</strong> sebelum program berlanjut.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </motion.div>
    </div>
  );
}
