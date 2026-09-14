"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Sparkles, Check, X, ArrowRight, ArrowLeft, RotateCw } from 'lucide-react';

// ── Karakter Siswa / Pelari Animatif yang Halus ─────────────────────────────────
function AnimatedTraveler({ walking, direction }: { walking: boolean; direction: 'up' | 'left' | 'right' | 'idle' }) {
  return (
    <div className="relative flex flex-col items-center justify-center select-none pointer-events-none">
      {/* Bayangan halus di bawah kaki */}
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
          <ellipse cx="17" cy="10" rx="7.5" ry="4" fill="#0284c7" />
          <rect x="11.5" y="7" width="11" height="4" rx="2" fill="#0369a1" />

          {/* Kepala & Wajah */}
          <circle cx="17" cy="13" r="6" fill="#fcd34d" />
          {/* Mata */}
          {direction !== 'up' && (
            <>
              <circle cx={direction === 'left' ? 14 : direction === 'right' ? 19 : 15.5} cy="12.5" r="1" fill="#1e293b" />
              <circle cx={direction === 'left' ? 17.5 : direction === 'right' ? 22 : 18.5} cy="12.5" r="1" fill="#1e293b" />
            </>
          )}

          {/* Badan / Baju */}
          <path d="M12 19 C12 18, 22 18, 22 19 L23 30 C23 31, 11 31, 11 30 Z" fill="#3b82f6" />
          
          {/* Ransel / Tas Sekolah */}
          {direction === 'up' && (
            <rect x="13" y="20" width="8" height="9" rx="2" fill="#f97316" stroke="#ea580c" strokeWidth="1" />
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
          {/* Sepatu Kiri */}
          <motion.circle
            cx={10.5} cy={44} r={2}
            initial={{ cx: 10.5, cy: 44 }}
            animate={walking ? { cx: [10.5, 17, 10.5], cy: [44, 40, 44] } : { cx: 10.5, cy: 44 }}
            transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
            fill="#ef4444"
          />

          {/* Kaki Kanan */}
          <motion.line
            x1={20} y1={34} x2={23} y2={44}
            initial={{ x2: 23, y2: 44 }}
            animate={walking ? { x2: [23, 17, 23], y2: [44, 40, 44] } : { x2: 23, y2: 44 }}
            transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            stroke="#1e293b" strokeWidth={3.5} strokeLinecap="round"
          />
          {/* Sepatu Kanan */}
          <motion.circle
            cx={23.5} cy={44} r={2}
            initial={{ cx: 23.5, cy: 44 }}
            animate={walking ? { cx: [23.5, 17, 23.5], cy: [44, 40, 44] } : { cx: 23.5, cy: 44 }}
            transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            fill="#ef4444"
          />
        </svg>
      </motion.div>
    </div>
  );
}

// ── Tipe Skenario ─────────────────────────────────────────────────────────────
interface Scenario {
  id: string;
  label: string;
  condition: string;
  conditionFn: (v: number) => boolean;
  sliderMin: number;
  sliderMax: number;
  sliderDefault: number;
  sliderUnit: string;
  leftLabel: string;  // True path
  rightLabel: string; // False path
  leftSub: string;
  rightSub: string;
  leftDesc: string;
  rightDesc: string;
  leftEmoji: string;
  rightEmoji: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'ujian',
    label: '🎓 Kelulusan Ujian',
    condition: 'nilai ≥ 75',
    conditionFn: v => v >= 75,
    sliderMin: 0, sliderMax: 100, sliderDefault: 85, sliderUnit: '',
    leftLabel: 'LULUS', rightLabel: 'REMEDIAL',
    leftSub: 'Syarat Terpenuhi', rightSub: 'Perlu Ujian Ulang',
    leftDesc: 'Nilai memenuhi KKM (≥75) → Berhasil Lulus!',
    rightDesc: 'Nilai di bawah KKM (<75) → Ikut Remedial.',
    leftEmoji: '🎉', rightEmoji: '📚',
  },
  {
    id: 'atm',
    label: '🏧 Tarik Tunai ATM',
    condition: 'saldo ≥ Rp50rb',
    conditionFn: v => v >= 50,
    sliderMin: 0, sliderMax: 100, sliderDefault: 70, sliderUnit: ' rb',
    leftLabel: 'CAIRKAN', rightLabel: 'DITOLAK',
    leftSub: 'Saldo Mencukupi', rightSub: 'Saldo Kurang',
    leftDesc: 'Saldo mencukupi → Uang tunai keluar.',
    rightDesc: 'Saldo tidak cukup → Transaksi dibatalkan.',
    leftEmoji: '💵', rightEmoji: '🚫',
  },
  {
    id: 'parkir',
    label: '🚗 Tarif Parkir Kilat',
    condition: 'durasi ≤ 30 mnt',
    conditionFn: v => v <= 30,
    sliderMin: 5, sliderMax: 90, sliderDefault: 20, sliderUnit: ' mnt',
    leftLabel: 'GRATIS', rightLabel: 'BAYAR',
    leftSub: 'Grace Period', rightSub: 'Tarif Normal',
    leftDesc: 'Durasi ≤ 30 menit → Bebas biaya parkir.',
    rightDesc: 'Durasi > 30 menit → Wajib bayar tarif parkir.',
    leftEmoji: '🆓', rightEmoji: '💳',
  },
];

type Phase = 0 | 1 | 2 | 3 | 4;

function CrossroadScene({ scenario, value }: { scenario: Scenario; value: number }) {
  const [phase, setPhase] = useState<Phase>(0);
  const isTrue = scenario.conditionFn(value);

  const play = () => {
    setPhase(0);
    const t1 = setTimeout(() => setPhase(1), 150);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => setPhase(4), 3000);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  };

  useEffect(() => {
    const cleanup = play();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, scenario.id]);

  const charX = phase <= 3 ? '50%' : isTrue ? '19%' : '81%';
  const charY = phase === 0 ? '88%' : phase === 1 ? '54%' : '54%';
  const charDirection = phase === 1 ? 'up' : phase === 4 ? (isTrue ? 'left' : 'right') : 'idle';

  return (
    <div className="relative w-full h-full min-h-[380px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-700/80 shadow-2xl flex flex-col justify-between">
      
      {/* ── Background Grid & Efek Suasana ───────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
      
      {/* ── Rancang Jalan (Asphalt Crossroad) ─────────────────────────────── */}
      {/* Jalan Vertikal (Dari bawah menuju tengah) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 md:w-24 bg-slate-800 border-x-2 border-slate-600/80 shadow-inner rounded-t-xl" style={{ height: '48%' }}>
        {/* Garis marka putus-putus vertikal */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-0.5 flex flex-col justify-around py-3">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="w-1 h-5 bg-amber-400/70 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
          ))}
        </div>
      </div>

      {/* Jalan Horizontal (Melintang dari kiri ke kanan di persimpangan) */}
      <div className="absolute left-0 right-0 top-[54%] -translate-y-1/2 h-20 md:h-24 bg-slate-800 border-y-2 border-slate-600/80 shadow-inner">
        {/* Garis marka kiri (True path) */}
        <div className={`absolute top-1/2 -translate-y-1/2 left-3 md:left-4 flex items-center gap-2 md:gap-3 transition-opacity duration-500 ${phase >= 3 && isTrue ? 'opacity-100' : 'opacity-30'}`} style={{ width: 'calc(50% - 2.5rem)' }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="h-1 flex-1 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
          ))}
        </div>

        {/* Garis marka kanan (False path) */}
        <div className={`absolute top-1/2 -translate-y-1/2 right-3 md:right-4 flex items-center justify-end gap-2 md:gap-3 transition-opacity duration-500 ${phase >= 3 && !isTrue ? 'opacity-100' : 'opacity-30'}`} style={{ width: 'calc(50% - 2.5rem)' }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="h-1 flex-1 bg-rose-400 rounded-full shadow-[0_0_10px_rgba(251,113,133,0.8)]" />
          ))}
        </div>
      </div>

      {/* Titik Tengah Persimpangan (Intersection Hub) */}
      <div className="absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 bg-slate-750 rounded-2xl border-2 border-slate-600/60 shadow-lg flex items-center justify-center">
        {/* Glow lingkaran sensor di persimpangan */}
        <motion.div
          animate={{
            scale: phase === 2 ? [1, 1.25, 1] : 1,
            opacity: phase === 2 ? [0.4, 0.9, 0.4] : 0.2,
          }}
          transition={{ duration: 1, repeat: phase === 2 ? Infinity : 0 }}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-400/20 border border-amber-400/50"
        />
      </div>

      {/* ── Gerbang / Tujuan Kiri (JALUR YA / TRUE) ────────────────────────── */}
      <div className="absolute left-2 md:left-4 top-[54%] -translate-y-1/2 z-20">
        <motion.div
          animate={{
            scale: phase === 4 && isTrue ? [1, 1.08, 1] : 1,
            boxShadow: phase >= 3 && isTrue ? '0 0 25px rgba(16,185,129,0.5)' : '0 0 0px transparent',
          }}
          transition={{ duration: 0.5 }}
          className={`flex flex-col items-center p-2.5 md:p-3 rounded-2xl border-2 transition-all duration-300 backdrop-blur-md ${
            phase >= 3 && isTrue
              ? 'bg-emerald-950/90 border-emerald-400 ring-2 ring-emerald-500/50'
              : 'bg-slate-900/85 border-slate-700 opacity-60'
          }`}
        >
          <div className="flex items-center gap-1 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-mono font-extrabold uppercase tracking-wider text-emerald-300">
              Ya (True)
            </span>
          </div>
          <span className="text-2xl md:text-3xl my-0.5 filter drop-shadow">{scenario.leftEmoji}</span>
          <span className="text-xs md:text-sm font-black text-white tracking-wide">{scenario.leftLabel}</span>
          <span className="text-[8px] md:text-[9px] font-semibold text-emerald-200/80">{scenario.leftSub}</span>
        </motion.div>
      </div>

      {/* ── Gerbang / Tujuan Kanan (JALUR TIDAK / FALSE) ───────────────────── */}
      <div className="absolute right-2 md:right-4 top-[54%] -translate-y-1/2 z-20">
        <motion.div
          animate={{
            scale: phase === 4 && !isTrue ? [1, 1.08, 1] : 1,
            boxShadow: phase >= 3 && !isTrue ? '0 0 25px rgba(244,63,94,0.5)' : '0 0 0px transparent',
          }}
          transition={{ duration: 0.5 }}
          className={`flex flex-col items-center p-2.5 md:p-3 rounded-2xl border-2 transition-all duration-300 backdrop-blur-md ${
            phase >= 3 && !isTrue
              ? 'bg-rose-950/90 border-rose-400 ring-2 ring-rose-500/50'
              : 'bg-slate-900/85 border-slate-700 opacity-60'
          }`}
        >
          <div className="flex items-center gap-1 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span className="text-[9px] font-mono font-extrabold uppercase tracking-wider text-rose-300">
              Tidak (False)
            </span>
          </div>
          <span className="text-2xl md:text-3xl my-0.5 filter drop-shadow">{scenario.rightEmoji}</span>
          <span className="text-xs md:text-sm font-black text-white tracking-wide">{scenario.rightLabel}</span>
          <span className="text-[8px] md:text-[9px] font-semibold text-rose-200/80">{scenario.rightSub}</span>
        </motion.div>
      </div>

      {/* ── Papan Kondisi di Atas Persimpangan ─────────────────────────────── */}
      <div className="absolute top-3 md:top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <motion.div
          animate={{
            scale: phase === 2 ? [1, 1.06, 1] : 1,
            borderColor: phase === 2 ? '#f59e0b' : phase >= 3 ? (isTrue ? '#10b981' : '#f43f5e') : '#64748b',
            boxShadow: phase === 2
              ? '0 0 30px rgba(245,158,11,0.6)'
              : phase >= 3
              ? isTrue
                ? '0 0 30px rgba(16,185,129,0.7)'
                : '0 0 30px rgba(244,63,94,0.7)'
              : '0 4px 15px rgba(0,0,0,0.5)',
          }}
          transition={{ duration: 0.4 }}
          className={`px-4 py-2 rounded-2xl border-2 transition-all duration-400 backdrop-blur-lg flex flex-col items-center text-center ${
            phase >= 3
              ? isTrue
                ? 'bg-emerald-950/95 border-emerald-400 text-white'
                : 'bg-rose-950/95 border-rose-400 text-white'
              : phase === 2
              ? 'bg-amber-950/95 border-amber-400 text-amber-200'
              : 'bg-slate-900/95 border-slate-600 text-slate-200'
          }`}
        >
          <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-wider opacity-80 uppercase mb-0.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Papan Keputusan (Kondisi)</span>
          </div>

          <div className="font-mono font-black text-xs md:text-sm tracking-wide text-white">
            {scenario.condition} ?
          </div>

          {/* Badge Status Evaluasi */}
          <div className="mt-1 flex items-center justify-center">
            {phase === 2 && (
              <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1 animate-pulse font-mono">
                Mengevaluasi input ({value}{scenario.sliderUnit})…
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
                {isTrue ? 'HASIL: TRUE (Benar)' : 'HASIL: FALSE (Salah)'}
              </motion.span>
            )}
            {phase < 2 && (
              <span className="text-[9px] text-slate-400 font-mono">Menunggu traveler mendekat</span>
            )}
          </div>
        </motion.div>

        {/* Tiang Papan */}
        <div className="w-1.5 h-6 bg-gradient-to-b from-slate-600 to-slate-800 shadow-md rounded-b" />
      </div>

      {/* ── Petunjuk Panah Jalan Aktif ────────────────────────────────────── */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute top-[54%] -translate-y-1/2 flex items-center gap-1 font-mono font-black text-[10px] md:text-xs px-2.5 py-1 rounded-full z-10 shadow-lg ${
              isTrue
                ? 'left-[35%] bg-emerald-500 text-slate-950 animate-bounce'
                : 'right-[35%] bg-rose-500 text-slate-950 animate-bounce'
            }`}
          >
            {isTrue ? <ArrowLeft className="w-3.5 h-3.5" /> : null}
            <span>{isTrue ? 'PILIH KIRI' : 'PILIH KANAN'}</span>
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
          duration: phase === 1 ? 1.05 : phase === 4 ? 1.0 : 0.4,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="absolute z-30"
        style={{ left: '50%', top: '88%', transform: 'translate(-50%, -50%)' }}
      >
        <AnimatedTraveler
          walking={phase === 1 || phase === 4}
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
                : phase >= 3 && isTrue
                ? 'bg-emerald-950/95 border-emerald-500 text-emerald-100'
                : 'bg-rose-950/95 border-rose-500 text-rose-100'
            }`}
          >
            {phase <= 1 && '① Input masuk: Traveler berjalan menuju titik persimpangan…'}
            {phase === 2 && `② Evaluasi: Memeriksa nilai (${value}${scenario.sliderUnit}) terhadap "${scenario.condition}"…`}
            {phase === 3 && (isTrue
              ? `③ TRUE! Kondisi terpenuhi → Bersiap ambil JALUR KIRI (${scenario.leftLabel}).`
              : `③ FALSE! Kondisi tidak terpenuhi → Bersiap ambil JALUR KANAN (${scenario.rightLabel}).`)}
            {phase === 4 && (isTrue
              ? `④ ${scenario.leftDesc}`
              : `④ ${scenario.rightDesc}`)}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}

// ── Komponen Utama dengan Desain 2-Kolom Split Widescreen ────────────────────
export default function AnimatedBranchingDefinition() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [is3DActive, setIs3DActive] = useState(false);
  const [scenarioId, setScenarioId] = useState('ujian');
  const [value, setValue] = useState(85);
  const [replayKey, setReplayKey] = useState(0);

  const scenario = SCENARIOS.find(s => s.id === scenarioId)!;
  const isTrue = scenario.conditionFn(value);

  const handleScenarioChange = (id: string) => {
    const sc = SCENARIOS.find(s => s.id === id)!;
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
          ? 'cursor-pointer hover:scale-[1.015] sm:hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(2,132,199,0.25)] hover:border-sky-500 hover:ring-2 hover:ring-sky-400/30'
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
        {/* 1. SISI DEPAN KARTU (GAMBAR 1: DEFINISI AKADEMIK RESMI)              */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <div
          onClick={handleFlipToBack}
          className={`w-full p-5 md:p-6 bg-sky-50 dark:bg-slate-950 border-2 border-sky-400 dark:border-sky-600 rounded-3xl shadow-md space-y-4 transition-all subpixel-antialiased ${
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
            <div className="flex items-center gap-2 text-sky-800 dark:text-sky-300 font-extrabold text-xs uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Definisi Akademik Resmi:</span>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-100 hover:bg-sky-200 dark:bg-sky-900 dark:hover:bg-sky-800 text-sky-900 dark:text-sky-100 border border-sky-300 dark:border-sky-700 shadow-sm animate-pulse">
              <RotateCw className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Klik untuk Buka Analogi</span>
            </div>
          </div>

          {/* Blockquote Teks Definisi */}
          <blockquote className="text-sm md:text-base text-slate-900 dark:text-slate-100 font-semibold leading-relaxed select-none bg-white dark:bg-slate-900 p-4 rounded-2xl border-2 border-sky-200 dark:border-sky-900 hover:border-sky-400 transition-colors shadow-xs">
            &ldquo;<strong className="text-sky-700 dark:text-sky-300 font-black text-base md:text-lg underline decoration-sky-500/40">Struktur Percabangan</strong>{' '}
            (Selection Structure) adalah konstruksi algoritma yang memungkinkan program untuk{' '}
            <strong className="text-emerald-900 dark:text-emerald-300 font-extrabold bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-400 dark:border-emerald-600 inline-block my-0.5 shadow-2xs">
              mengevaluasi sebuah kondisi boolean
            </strong>{' '}
            dan — berdasarkan hasil evaluasi tersebut (True atau False) —{' '}
            <strong className="text-amber-900 dark:text-amber-300 font-extrabold bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-md border border-amber-400 dark:border-amber-600 inline-block my-0.5 shadow-2xs">
              memilih salah satu dari jalur eksekusi yang telah didefinisikan
            </strong>,{' '}
            sehingga algoritma mampu berperilaku berbeda untuk input yang berbeda.&rdquo;
          </blockquote>

          {/* Petunjuk Membalik */}
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-sky-700 dark:text-sky-300 pt-0.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Klik kartu untuk membalik &amp; melihat simulasi analogi keputusan</span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* 2. SISI BELAKANG KARTU (GAMBAR 2: DESAIN 2-KOLOM SPLIT WIDESCREEN)   */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <div
          className={`w-full p-4 md:p-6 bg-sky-50 dark:bg-slate-950 border-2 border-sky-400 dark:border-sky-600 rounded-3xl shadow-2xl space-y-4 transition-all antialiased ${
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
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-sky-200 dark:border-sky-800/80">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">Pilih Studi Kasus:</span>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {SCENARIOS.map(sc => (
                  <button
                    key={sc.id}
                    onClick={() => handleScenarioChange(sc.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                      scenarioId === sc.id
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-500/30 ring-2 ring-sky-400'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
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
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-500/20 transition-all cursor-pointer shrink-0"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Balik ke Definisi</span>
            </button>
          </div>

          {/* ── 2-Column Split Layout: Canvas di Kiri & Kontrol/Keterangan di Kanan ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            
            {/* KOLOM KIRI: Canvas Simulasi Persimpangan Jalan */}
            <div className="lg:col-span-7 flex flex-col min-h-[380px]">
              <CrossroadScene key={replayKey} scenario={scenario} value={value} />
            </div>

            {/* KOLOM KANAN: Panel Kontrol Input & 3 Pilar Pemetaan Definisi */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-2.5">
              
              {/* 1. Slider Input Interaktif */}
              <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-700 shadow-md space-y-2 text-white">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-300">Nilai Input:</span>
                    <span className={`text-sm font-black font-mono px-2.5 py-0.5 rounded-lg border ${
                      isTrue
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                        : 'bg-rose-950 border-rose-400 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                    }`}>
                      {value}{scenario.sliderUnit}
                    </span>
                  </div>

                  <button
                    onClick={() => setReplayKey(k => k + 1)}
                    className="flex items-center gap-1 text-[11px] font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-600 transition-all cursor-pointer shadow-xs"
                  >
                    <RefreshCcw className="w-3 h-3 text-sky-400" />
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
                    className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
                  />
                  <span className="text-[10px] font-mono font-bold text-slate-400">{scenario.sliderMax}{scenario.sliderUnit}</span>
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
                  {isTrue ? 'TRUE (Ya)' : 'FALSE (Tidak)'}
                </span>
              </div>

              {/* 3. Tiga Pilar Pemetaan Konsep Definisi */}
              <div className="flex flex-col gap-2 flex-1 justify-between">
                {/* Pilar 1 */}
                <div className="p-2.5 rounded-xl border-2 border-amber-300 dark:border-amber-700/80 bg-amber-50/90 dark:bg-amber-950/50 space-y-0.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-black uppercase text-amber-900 dark:text-amber-300">
                    <span>①</span>
                    <span>Kondisi Boolean</span>
                  </div>
                  <p className="text-[11px] text-amber-950 dark:text-amber-100 font-semibold leading-tight">
                    Diwakili oleh <strong>Papan Rambu &quot;{scenario.condition}?&quot;</strong> di persimpangan.
                  </p>
                </div>

                {/* Pilar 2 */}
                <div className="p-2.5 rounded-xl border-2 border-sky-300 dark:border-sky-700/80 bg-sky-50/90 dark:bg-sky-950/50 space-y-0.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-black uppercase text-sky-900 dark:text-sky-300">
                    <span>②</span>
                    <span>Evaluasi (True / False)</span>
                  </div>
                  <p className="text-[11px] text-sky-950 dark:text-sky-100 font-semibold leading-tight">
                    Memeriksa input <strong>{value}{scenario.sliderUnit}</strong>: Hasilnya <strong>{isTrue ? 'TRUE' : 'FALSE'}</strong>.
                  </p>
                </div>

                {/* Pilar 3 */}
                <div className={`p-2.5 rounded-xl border-2 space-y-0.5 shadow-2xs ${
                  isTrue
                    ? 'border-emerald-400 dark:border-emerald-700/80 bg-emerald-50/90 dark:bg-emerald-950/50'
                    : 'border-rose-400 dark:border-rose-700/80 bg-rose-50/90 dark:bg-rose-950/50'
                }`}>
                  <div className={`flex items-center gap-1.5 text-[10px] font-mono font-black uppercase ${
                    isTrue ? 'text-emerald-900 dark:text-emerald-300' : 'text-rose-900 dark:text-rose-300'
                  }`}>
                    <span>③</span>
                    <span>Pilih Satu Jalur</span>
                  </div>
                  <p className={`text-[11px] font-semibold leading-tight ${
                    isTrue ? 'text-emerald-950 dark:text-emerald-100' : 'text-rose-950 dark:text-rose-100'
                  }`}>
                    Traveler belok ke <strong>Jalur {isTrue ? 'Kiri (' + scenario.leftLabel + ')' : 'Kanan (' + scenario.rightLabel + ')'}</strong>.
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
