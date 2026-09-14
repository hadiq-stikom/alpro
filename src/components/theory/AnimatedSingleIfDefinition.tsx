"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Sparkles, Check, X, RotateCw } from 'lucide-react';

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
          <ellipse cx="17" cy="10" rx="7.5" ry="4" fill="#059669" />
          <rect x="11.5" y="7" width="11" height="4" rx="2" fill="#047857" />

          {/* Kepala & Wajah */}
          <circle cx="17" cy="13" r="6" fill="#fcd34d" />
          {direction !== 'up' && (
            <>
              <circle cx={direction === 'left' ? 14 : direction === 'right' ? 19 : 15.5} cy="12.5" r="1" fill="#1e293b" />
              <circle cx={direction === 'left' ? 17.5 : direction === 'right' ? 22 : 18.5} cy="12.5" r="1" fill="#1e293b" />
            </>
          )}

          {/* Badan / Baju Hijau Emerald */}
          <path d="M12 19 C12 18, 22 18, 22 19 L23 30 C23 31, 11 31, 11 30 Z" fill="#10b981" />
          
          {/* Ransel */}
          {direction === 'up' && (
            <rect x="13" y="20" width="8" height="9" rx="2" fill="#d97706" stroke="#b45309" strokeWidth="1" />
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
            fill="#059669"
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
            fill="#059669"
          />
        </svg>
      </motion.div>
    </div>
  );
}

// ── Skenario Kasus Percabangan Tunggal (Single IF) ──────────────────────────────
interface SingleScenario {
  id: string;
  label: string;
  condition: string;
  conditionFn: (v: number) => boolean;
  sliderMin: number;
  sliderMax: number;
  sliderDefault: number;
  sliderUnit: string;
  actionTitle: string;
  actionDesc: string;
  actionEmoji: string;
  normalDest: string;
  bypassDesc: string;
}

const SINGLE_SCENARIOS: SingleScenario[] = [
  {
    id: 'diskon',
    label: '🏷️ Diskon Belanja',
    condition: 'belanja ≥ Rp100rb',
    conditionFn: v => v >= 100,
    sliderMin: 20, sliderMax: 250, sliderDefault: 140, sliderUnit: ' rb',
    actionTitle: 'POTONGAN 10%',
    actionDesc: 'Belanja ≥ Rp100rb → Ambil Kupon Diskon 10%!',
    actionEmoji: '🏷️',
    normalDest: 'Kasir Pembayaran',
    bypassDesc: 'Belanja < Rp100rb → Lewati pos diskon tanpa potongan.',
  },
  {
    id: 'baterai',
    label: '🔋 Peringatan Baterai',
    condition: 'baterai ≤ 20%',
    conditionFn: v => v <= 20,
    sliderMin: 5, sliderMax: 100, sliderDefault: 15, sliderUnit: '%',
    actionTitle: 'HEMAT DAYA',
    actionDesc: 'Baterai ≤ 20% → Aktifkan Mode Hemat Daya!',
    actionEmoji: '⚠️',
    normalDest: 'Operasional HP',
    bypassDesc: 'Baterai aman (>20%) → Tidak ada notifikasi.',
  },
  {
    id: 'tiket',
    label: '🎟️ Bonus Tiket Balita',
    condition: 'usia ≤ 5 thn',
    conditionFn: v => v <= 5,
    sliderMin: 1, sliderMax: 15, sliderDefault: 4, sliderUnit: ' thn',
    actionTitle: 'TIKET BALITA',
    actionDesc: 'Usia ≤ 5 thn → Ambil Tiket Wahana Balita Gratis!',
    actionEmoji: '🎟️',
    normalDest: 'Pintu Masuk Utama',
    bypassDesc: 'Usia > 5 thn → Masuk reguler tanpa tiket bonus.',
  },
];

type SinglePhase = 0 | 1 | 2 | 3 | 4 | 5;

function SingleIfScene({ scenario, value }: { scenario: SingleScenario; value: number }) {
  const [phase, setPhase] = useState<SinglePhase>(0);
  const isTrue = scenario.conditionFn(value);

  const play = () => {
    setPhase(0);
    const t1 = setTimeout(() => setPhase(1), 150); // jalan mendekat
    const t2 = setTimeout(() => setPhase(2), 1100); // evaluasi di pos
    const t3 = setTimeout(() => setPhase(3), 2100); // keputusan diambil
    const t4 = setTimeout(() => setPhase(4), 2800); // singgah / bypass
    const t5 = setTimeout(() => setPhase(5), 3700); // sampai di tujuan akhir
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  };

  useEffect(() => {
    const cleanup = play();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, scenario.id]);

  // Koordinat Karakter:
  // Phase 0/1: jalan dari bawah (50%, 88%) ke pos pemeriksaan (50%, 54%)
  // Phase 2/3: evaluasi kondisi di pos (50%, 54%)
  // Phase 4:
  //   - Jika True: belok ke pos samping (22%, 54%)
  //   - Jika False: tetap di jalan utama dan jalan lurus ke atas (50%, 30%)
  // Phase 5:
  //   - Baik True (kembali ke jalan utama) maupun False berakhir di tujuan akhir (50%, 18%)
  const charX = phase <= 3 ? '50%'
    : phase === 4 ? (isTrue ? '22%' : '50%')
    : '50%';

  const charY = phase === 0 ? '88%'
    : phase <= 3 ? '54%'
    : phase === 4 ? (isTrue ? '54%' : '32%')
    : '18%';

  const charDirection = phase === 1 ? 'up'
    : phase === 4 ? (isTrue ? 'left' : 'up')
    : phase === 5 ? (isTrue ? 'right' : 'up')
    : 'idle';

  return (
    <div className="relative w-full h-full min-h-[380px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-700/80 shadow-2xl flex flex-col justify-between">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
      
      {/* ── Jalan Utama Lurus (Main Trunk Road) ──────────────────────────── */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-20 md:w-24 bg-slate-800 border-x-2 border-slate-600/80 shadow-inner">
        {/* Garis marka putus-putus vertikal */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-0.5 flex flex-col justify-around py-2">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-1 h-5 bg-amber-400/60 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
          ))}
        </div>
      </div>

      {/* ── Jalur Cabang Singgah Opsional (Side Bypass Loop ke Kiri) ──────── */}
      {/* Jalur loop keluar ke pos aksi di kiri dan kembali ke jalan utama */}
      <div className={`absolute top-[32%] bottom-[24%] left-6 md:left-8 w-24 md:w-28 border-l-2 border-y-2 rounded-l-3xl transition-all duration-500 pointer-events-none ${
        phase >= 3 && isTrue
          ? 'border-emerald-400 bg-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
          : 'border-slate-700/50 bg-transparent'
      }`}>
        {/* Indikator Panah Alur Masuk & Keluar Pos */}
        <div className="absolute -top-2.5 right-2 text-emerald-400 text-xs font-bold font-mono">
          {isTrue && phase >= 3 ? '← Masuk' : ''}
        </div>
        <div className="absolute -bottom-2.5 right-2 text-emerald-400 text-xs font-bold font-mono">
          {isTrue && phase >= 4 ? 'Keluar →' : ''}
        </div>
      </div>

      {/* ── Pos Aksi Opsional (HANYA DIEKSEKUSI SAAT TRUE) ────────────────── */}
      <div className="absolute left-2 md:left-4 top-[54%] -translate-y-1/2 z-20">
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
              Aksi Opsional (IF True)
            </span>
          </div>
          <span className="text-2xl md:text-3xl my-0.5 filter drop-shadow">{scenario.actionEmoji}</span>
          <span className="text-xs md:text-sm font-black text-white tracking-wide">{scenario.actionTitle}</span>
          <span className="text-[8px] md:text-[9px] font-semibold text-emerald-200/80 text-center max-w-[90px] leading-tight">
            {scenario.actionDesc.split('→')[1] || scenario.actionDesc}
          </span>
        </motion.div>
      </div>

      {/* ── Pos Pemeriksaan / Rambu Kondisi di Tengah Jalan ──────────────── */}
      <div className="absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
        <motion.div
          animate={{
            scale: phase === 2 ? [1, 1.08, 1] : 1,
            borderColor: phase === 2 ? '#f59e0b' : phase >= 3 ? (isTrue ? '#10b981' : '#64748b') : '#475569',
            boxShadow: phase === 2
              ? '0 0 30px rgba(245,158,11,0.6)'
              : phase >= 3 && isTrue
              ? '0 0 30px rgba(16,185,129,0.7)'
              : '0 4px 15px rgba(0,0,0,0.5)',
          }}
          transition={{ duration: 0.4 }}
          className={`px-3.5 py-2 rounded-2xl border-2 transition-all duration-400 backdrop-blur-lg flex flex-col items-center text-center ${
            phase >= 3 && isTrue
              ? 'bg-emerald-950/95 border-emerald-400 text-white'
              : phase === 2
              ? 'bg-amber-950/95 border-amber-400 text-amber-200'
              : 'bg-slate-900/95 border-slate-600 text-slate-200'
          }`}
        >
          <div className="flex items-center gap-1 text-[8px] font-mono font-bold tracking-wider opacity-80 uppercase mb-0.5">
            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            <span>Kondisi Single IF</span>
          </div>

          <div className="font-mono font-black text-xs md:text-sm tracking-wide text-white">
            {scenario.condition} ?
          </div>

          {/* Badge Status */}
          <div className="mt-1 flex items-center justify-center">
            {phase === 2 && (
              <span className="text-[9px] font-bold text-amber-400 animate-pulse font-mono">
                Evaluasi ({value}{scenario.sliderUnit})…
              </span>
            )}
            {phase >= 3 && (
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md ${
                  isTrue
                    ? 'bg-emerald-500 text-emerald-950 border border-emerald-300'
                    : 'bg-slate-700 text-slate-200 border border-slate-500'
                }`}
              >
                {isTrue ? <Check className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3 stroke-[3]" />}
                {isTrue ? 'TRUE (Eksekusi IF)' : 'FALSE (Bypass / Lewati)'}
              </motion.span>
            )}
            {phase < 2 && (
              <span className="text-[8px] text-slate-400 font-mono">Mendekat…</span>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Gerbang / Tujuan Akhir di Ujung Atas Jalan Utama ─────────────── */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          animate={{
            scale: phase === 5 ? [1, 1.06, 1] : 1,
            boxShadow: phase === 5 ? '0 0 20px rgba(56,189,248,0.5)' : '0 0 0px transparent',
          }}
          className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-sky-500/60 text-center flex items-center gap-1.5 shadow-md"
        >
          <span className="text-base">🏁</span>
          <span className="text-xs font-bold text-sky-300">{scenario.normalDest}</span>
        </motion.div>
      </div>

      {/* ── Karakter Berjalan ─────────────────────────────────────────────── */}
      <motion.div
        animate={{
          left: charX,
          top: charY,
          x: '-50%',
          y: '-50%',
        }}
        transition={{
          duration: phase === 1 ? 0.95 : phase === 4 ? 0.85 : phase === 5 ? 0.85 : 0.4,
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

      {/* ── Caption Status di Dasar Canvas ───────────────────────────────── */}
      <div className="p-3 z-20 mt-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className={`px-3 py-1.5 rounded-xl text-center text-xs font-bold shadow-lg border backdrop-blur-md ${
              phase <= 1
                ? 'bg-slate-900/90 border-slate-700 text-slate-200'
                : phase === 2
                ? 'bg-amber-950/90 border-amber-500/80 text-amber-200'
                : phase >= 3 && isTrue
                ? 'bg-emerald-950/95 border-emerald-500 text-emerald-100'
                : 'bg-slate-900/95 border-slate-600 text-slate-200'
            }`}
          >
            {phase <= 1 && '① Input data masuk: Program bersiap memeriksa kondisi…'}
            {phase === 2 && `② Evaluasi: Memeriksa apakah input (${value}${scenario.sliderUnit}) memenuhi "${scenario.condition}"?`}
            {phase === 3 && (isTrue
              ? '③ HASIL TRUE! Syarat terpenuhi → Bersiap belok ke blok aksi IF.'
              : '③ HASIL FALSE! Syarat TIDAK terpenuhi → Lompati blok IF tanpa aksi apapun.')}
            {phase >= 4 && (isTrue
              ? `④ ${scenario.actionDesc}`
              : `④ ${scenario.bypassDesc}`)}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}

// ── Komponen Utama: Definisi Percabangan Tunggal (Single IF) ──────────────────
export default function AnimatedSingleIfDefinition() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [is3DActive, setIs3DActive] = useState(false);
  const [scenarioId, setScenarioId] = useState('diskon');
  const [value, setValue] = useState(140);
  const [replayKey, setReplayKey] = useState(0);

  const scenario = SINGLE_SCENARIOS.find(s => s.id === scenarioId)!;
  const isTrue = scenario.conditionFn(value);

  const handleScenarioChange = (id: string) => {
    const sc = SINGLE_SCENARIOS.find(s => s.id === id)!;
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
      className={`w-full transition-all duration-300 origin-center relative z-0 hover:z-50 subpixel-antialiased ${
        !isFlipped
          ? 'cursor-pointer hover:scale-[1.015] sm:hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(5,150,105,0.25)] hover:border-emerald-500 hover:ring-2 hover:ring-emerald-400/30'
          : ''
      }`}
      style={{
        perspective: is3DActive ? 1400 : undefined,
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'subpixel-antialiased',
        MozOsxFontSmoothing: 'auto',
      }}
    >
      <motion.div
        className="w-full relative subpixel-antialiased"
        style={{
          transformStyle: is3DActive ? 'preserve-3d' : 'flat',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'subpixel-antialiased',
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.65, type: 'spring', stiffness: 200, damping: 24 }}
        onAnimationComplete={handleAnimationComplete}
      >
        
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* 1. SISI DEPAN KARTU (GAMBAR 1: DEFINISI AKADEMIK PERCABANGAN TUNGGAL) */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <div
          onClick={handleFlipToBack}
          className={`w-full p-5 md:p-6 bg-emerald-50 dark:bg-slate-950 border-2 border-emerald-500 dark:border-emerald-600 rounded-3xl shadow-md space-y-4 transition-all subpixel-antialiased ${
            isFlipped ? 'pointer-events-none absolute inset-0 opacity-0' : 'relative opacity-100'
          }`}
          style={{
            backfaceVisibility: is3DActive ? 'hidden' : 'visible',
            WebkitBackfaceVisibility: is3DActive ? 'hidden' : 'visible',
            transform: is3DActive ? 'translate3d(0, 0, 1px)' : 'none',
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'subpixel-antialiased',
          }}
        >
          {/* Header Definisi */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Definisi Akademik Resmi:</span>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900 dark:hover:bg-emerald-800 text-emerald-900 dark:text-emerald-100 border border-emerald-300 dark:border-emerald-700 shadow-sm animate-pulse">
              <RotateCw className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Klik untuk Buka Analogi</span>
            </div>
          </div>

          {/* Blockquote Teks Definisi */}
          <blockquote className="text-sm md:text-base text-slate-900 dark:text-slate-100 font-semibold leading-relaxed select-none bg-white dark:bg-slate-900 p-4 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900 hover:border-emerald-400 transition-colors shadow-xs">
            &ldquo;<strong className="text-emerald-700 dark:text-emerald-300 font-black text-base md:text-lg underline decoration-emerald-500/40">Percabangan Tunggal (Single Selection)</strong>{' '}
            adalah struktur kontrol yang hanya memiliki{' '}
            <strong className="text-amber-900 dark:text-amber-300 font-extrabold bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-md border border-amber-400 dark:border-amber-600 inline-block my-0.5 shadow-2xs">
              satu jalur aksi opsional
            </strong>{' '}
            — blok instruksi di dalamnya dieksekusi hanya ketika kondisi boolean bernilai True. Jika kondisi False, program langsung melompat ke instruksi setelah blok IF{' '}
            <strong className="text-rose-900 dark:text-rose-300 font-extrabold bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded-md border border-rose-400 dark:border-rose-600 inline-block my-0.5 shadow-2xs">
              tanpa melakukan tindakan apapun
            </strong>.&rdquo;
          </blockquote>

          {/* Petunjuk Membalik */}
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 pt-0.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Klik kartu untuk membalik &amp; melihat simulasi jalur aksi opsional vs bypass</span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* 2. SISI BELAKANG KARTU (GAMBAR 2: SIMULASI 2-KOLOM SINGLE IF)        */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <div
          className={`w-full p-4 md:p-6 bg-emerald-50 dark:bg-slate-950 border-2 border-emerald-400 dark:border-emerald-600 rounded-3xl shadow-2xl space-y-4 transition-all antialiased ${
            !isFlipped ? 'pointer-events-none absolute inset-0 opacity-0' : 'relative opacity-100'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) translate3d(0, 0, 1px)',
            textRendering: 'geometricPrecision',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          
          {/* Header Sisi Belakang: Selector Studi Kasus + Tombol Balik */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-emerald-200 dark:border-emerald-800/80">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">Pilih Kasus Single IF:</span>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {SINGLE_SCENARIOS.map(sc => (
                  <button
                    key={sc.id}
                    onClick={() => handleScenarioChange(sc.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                      scenarioId === sc.id
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30 ring-2 ring-emerald-400'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
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
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 transition-all cursor-pointer shrink-0"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Balik ke Definisi</span>
            </button>
          </div>

          {/* ── 2-Column Split Layout: Canvas di Kiri & Kontrol di Kanan ─────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            
            {/* KOLOM KIRI: Canvas Simulasi Bypass vs Aksi Opsional */}
            <div className="lg:col-span-7 flex flex-col min-h-[380px]">
              <SingleIfScene key={replayKey} scenario={scenario} value={value} />
            </div>

            {/* KOLOM KANAN: Panel Kontrol Input & 3 Pilar Konsep Single IF */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-2.5">
              
              {/* 1. Slider Input Interaktif */}
              <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-700 shadow-md space-y-2 text-white">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-300">Nilai Input:</span>
                    <span className={`text-sm font-black font-mono px-2.5 py-0.5 rounded-lg border ${
                      isTrue
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                        : 'bg-slate-800 border-slate-600 text-slate-300'
                    }`}>
                      {value}{scenario.sliderUnit}
                    </span>
                  </div>

                  <button
                    onClick={() => setReplayKey(k => k + 1)}
                    className="flex items-center gap-1 text-[11px] font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-600 transition-all cursor-pointer shadow-xs"
                  >
                    <RefreshCcw className="w-3 h-3 text-emerald-400" />
                    <span>Ulangi</span>
                  </button>
                </div>

                {/* Slider track */}
                <div className="flex items-center gap-2.5 pt-0.5">
                  <span className="text-[10px] font-mono font-bold text-slate-400">{scenario.sliderMin}{scenario.sliderUnit}</span>
                  <input
                    type="range"
                    min={scenario.sliderMin}
                    max={scenario.sliderMax}
                    value={value}
                    onChange={e => {
                      setValue(Number(e.target.value));
                      setReplayKey(k => k + 1);
                    }}
                    className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <span className="text-[10px] font-mono font-bold text-slate-400">{scenario.sliderMax}{scenario.sliderUnit}</span>
                </div>
              </div>

              {/* 2. Banner Keputusan Ringkas */}
              <div className={`p-2.5 rounded-xl border-2 font-mono text-xs font-bold flex items-center justify-between gap-2 shadow-xs ${
                isTrue
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-950 dark:text-emerald-100'
                  : 'bg-slate-100 dark:bg-slate-900 border-slate-400 dark:border-slate-700 text-slate-800 dark:text-slate-200'
              }`}>
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-sm">{isTrue ? '✅' : '⏭️'}</span>
                  <span className="truncate">
                    <strong className="underline">{scenario.condition}</strong> = {value}{scenario.sliderUnit}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-md text-[11px] font-black shrink-0 ${
                  isTrue ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-white'
                }`}>
                  {isTrue ? 'TRUE (Jalankan IF)' : 'FALSE (Bypass / Lewati)'}
                </span>
              </div>

              {/* 3. Tiga Pilar Pemetaan Konsep Percabangan Tunggal */}
              <div className="flex flex-col gap-2 flex-1 justify-between">
                {/* Pilar 1 */}
                <div className="p-2.5 rounded-xl border-2 border-amber-300 dark:border-amber-700/80 bg-amber-50/90 dark:bg-amber-950/50 space-y-0.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-black uppercase text-amber-900 dark:text-amber-300">
                    <span>①</span>
                    <span>Kondisi Boolean</span>
                  </div>
                  <p className="text-[11px] text-amber-950 dark:text-amber-100 font-semibold leading-tight">
                    Rambu <strong>&quot;{scenario.condition}?&quot;</strong> memutuskan apakah aksi opsional perlu dijalankan.
                  </p>
                </div>

                {/* Pilar 2 */}
                <div className={`p-2.5 rounded-xl border-2 space-y-0.5 shadow-2xs ${
                  isTrue
                    ? 'border-emerald-400 dark:border-emerald-700/80 bg-emerald-50/90 dark:bg-emerald-950/50'
                    : 'border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 opacity-60'
                }`}>
                  <div className={`flex items-center gap-1.5 text-[10px] font-mono font-black uppercase ${
                    isTrue ? 'text-emerald-900 dark:text-emerald-300' : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    <span>②</span>
                    <span>Aksi Opsional (Saat True)</span>
                  </div>
                  <p className={`text-[11px] font-semibold leading-tight ${
                    isTrue ? 'text-emerald-950 dark:text-emerald-100' : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {isTrue ? `Program singgah mengeksekusi: "${scenario.actionTitle}"` : `Tidak dieksekusi karena kondisi False.`}
                  </p>
                </div>

                {/* Pilar 3 */}
                <div className="p-2.5 rounded-xl border-2 border-sky-300 dark:border-sky-700/80 bg-sky-50/90 dark:bg-sky-950/50 space-y-0.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-black uppercase text-sky-900 dark:text-sky-300">
                    <span>③</span>
                    <span>Alur Melanjutkan Perjalanan</span>
                  </div>
                  <p className="text-[11px] text-sky-950 dark:text-sky-100 font-semibold leading-tight">
                    Baik True maupun False, alur program selalu berlanjut ke <strong>{scenario.normalDest}</strong>.
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
