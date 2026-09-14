"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Sparkles, Check, X, RotateCw, GitFork, ArrowDown, ChevronRight, CheckCircle2, ShieldAlert } from 'lucide-react';

// ── Karakter Mahasiswa / Traveler Animatif ────────────────────────────────────
function AnimatedTraveler({
  walking,
  direction,
}: {
  walking: boolean;
  direction: 'down' | 'right' | 'idle';
}) {
  return (
    <div className="relative flex flex-col items-center justify-center select-none pointer-events-none">
      {/* Bayangan di bawah kaki */}
      <motion.div
        animate={walking ? { scale: [1, 0.75, 1], opacity: [0.6, 0.35, 0.6] } : { scale: 1, opacity: 0.5 }}
        transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
        className="w-7 h-2 rounded-full bg-slate-950/80 absolute -bottom-1 blur-[1px]"
      />

      <motion.div
        animate={walking ? { y: [0, -3.5, 0] } : { y: 0 }}
        transition={{ duration: 0.3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <svg width="34" height="46" viewBox="0 0 34 46" fill="none" className="drop-shadow-md">
          {/* Topi Mahasiswa Jingga-Oranye */}
          <ellipse cx="17" cy="9" rx="7.5" ry="4" fill="#ea580c" />
          <rect x="11.5" y="6" width="11" height="4" rx="2" fill="#c2410c" />

          {/* Kepala & Wajah */}
          <circle cx="17" cy="12" r="6" fill="#fcd34d" />
          {/* Mata */}
          {direction === 'right' ? (
            <>
              <circle cx="19" cy="11.5" r="1" fill="#1e293b" />
              <circle cx="22" cy="11.5" r="1" fill="#1e293b" />
            </>
          ) : (
            <>
              <circle cx="15.5" cy="11.5" r="1" fill="#1e293b" />
              <circle cx="18.5" cy="11.5" r="1" fill="#1e293b" />
            </>
          )}

          {/* Badan / Baju Jingga Keemasan */}
          <path d="M12 18 C12 17, 22 17, 22 18 L23 29 C23 30, 11 30, 11 29 Z" fill="#f97316" />

          {/* Tas Punggung Mahasiswa */}
          {direction === 'right' ? (
            <rect x="9" y="19" width="4" height="9" rx="1.5" fill="#7c2d12" />
          ) : null}

          {/* Tangan Kiri */}
          <motion.line
            x1={12} y1={20} x2={7} y2={27}
            initial={{ x2: 7, y2: 27 }}
            animate={walking ? { x2: [7, 14, 7], y2: [27, 22, 27] } : { x2: 7, y2: 27 }}
            transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
            stroke="#fcd34d" strokeWidth={3} strokeLinecap="round"
          />

          {/* Tangan Kanan */}
          <motion.line
            x1={22} y1={20} x2={27} y2={27}
            initial={{ x2: 27, y2: 27 }}
            animate={walking ? { x2: [27, 20, 27], y2: [27, 22, 27] } : { x2: 27, y2: 27 }}
            transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut', delay: 0.18 }}
            stroke="#fcd34d" strokeWidth={3} strokeLinecap="round"
          />

          {/* Celana Gelap */}
          <rect x={12} y={29} width={10} height={5} fill="#0f172a" />

          {/* Kaki Kiri */}
          <motion.line
            x1={14} y1={33} x2={11} y2={42}
            initial={{ x2: 11, y2: 42 }}
            animate={walking ? { x2: [11, 17, 11], y2: [42, 38, 42] } : { x2: 11, y2: 42 }}
            transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
            stroke="#0f172a" strokeWidth={3.5} strokeLinecap="round"
          />
          {/* Sepatu Kiri */}
          <motion.circle
            cx={10.5} cy={42} r={2}
            initial={{ cx: 10.5, cy: 42 }}
            animate={walking ? { cx: [10.5, 17, 10.5], cy: [42, 38, 42] } : { cx: 10.5, cy: 42 }}
            transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
            fill="#ea580c"
          />

          {/* Kaki Kanan */}
          <motion.line
            x1={20} y1={33} x2={23} y2={42}
            initial={{ x2: 23, y2: 42 }}
            animate={walking ? { x2: [23, 17, 23], y2: [42, 38, 42] } : { x2: 23, y2: 42 }}
            transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut', delay: 0.18 }}
            stroke="#0f172a" strokeWidth={3.5} strokeLinecap="round"
          />
          {/* Sepatu Kanan */}
          <motion.circle
            cx={23.5} cy={42} r={2}
            initial={{ cx: 23.5, cy: 42 }}
            animate={walking ? { cx: [23.5, 17, 23.5], cy: [42, 38, 42] } : { cx: 23.5, cy: 42 }}
            transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut', delay: 0.18 }}
            fill="#ea580c"
          />
        </svg>
      </motion.div>
    </div>
  );
}

// ── Tipe Data Percabangan Majemuk ─────────────────────────────────────────────
interface BranchItem {
  id: string;
  keyword: 'if' | 'elif' | 'else';
  conditionLabel: string;
  conditionFn: (val: number) => boolean;
  actionCode: string;
  actionTitle: string;
  actionDesc: string;
  actionEmoji: string;
  isElse?: boolean;
}

interface MultiBranchScenario {
  id: string;
  title: string;
  shortLabel: string;
  varName: string;
  unit: string;
  min: number;
  max: number;
  sliderDefault: number;
  presets: { label: string; value: number; grade: string }[];
  branches: BranchItem[];
}

const MULTI_SCENARIOS: MultiBranchScenario[] = [
  {
    id: 'grade',
    title: 'Indeks Nilai Akademik (5 Cabang)',
    shortLabel: '🎓 Nilai Akademik (A-E)',
    varName: 'nilai',
    unit: '',
    min: 0,
    max: 100,
    sliderDefault: 78,
    presets: [
      { label: '92 (Grade A)', value: 92, grade: 'A' },
      { label: '78 (Grade B)', value: 78, grade: 'B' },
      { label: '62 (Grade C)', value: 62, grade: 'C' },
      { label: '45 (Grade D)', value: 45, grade: 'D' },
      { label: '25 (Grade E)', value: 25, grade: 'E' },
    ],
    branches: [
      {
        id: 'b1',
        keyword: 'if',
        conditionLabel: 'nilai >= 85',
        conditionFn: v => v >= 85,
        actionCode: 'output("Grade A")',
        actionTitle: 'Grade A',
        actionDesc: 'Sangat Memuaskan / Cum Laude',
        actionEmoji: '🌟',
      },
      {
        id: 'b2',
        keyword: 'elif',
        conditionLabel: 'nilai >= 70',
        conditionFn: v => v >= 70,
        actionCode: 'output("Grade B")',
        actionTitle: 'Grade B',
        actionDesc: 'Baik / Kompeten',
        actionEmoji: '👍',
      },
      {
        id: 'b3',
        keyword: 'elif',
        conditionLabel: 'nilai >= 55',
        conditionFn: v => v >= 55,
        actionCode: 'output("Grade C")',
        actionTitle: 'Grade C',
        actionDesc: 'Cukup / Lulus Minimal',
        actionEmoji: '👌',
      },
      {
        id: 'b4',
        keyword: 'elif',
        conditionLabel: 'nilai >= 40',
        conditionFn: v => v >= 40,
        actionCode: 'output("Grade D")',
        actionTitle: 'Grade D',
        actionDesc: 'Kurang / Wajib Remedi',
        actionEmoji: '⚠️',
      },
      {
        id: 'b5',
        keyword: 'else',
        conditionLabel: 'else (fallback)',
        conditionFn: () => true,
        isElse: true,
        actionCode: 'output("Grade E")',
        actionTitle: 'Grade E',
        actionDesc: 'Gagal / Wajib Mengulang',
        actionEmoji: '❌',
      },
    ],
  },
  {
    id: 'ticket',
    title: 'Kategori Tarif Tiket Usia (4 Cabang)',
    shortLabel: '🎟️ Tarif Tiket Usia',
    varName: 'usia',
    unit: ' thn',
    min: 1,
    max: 80,
    sliderDefault: 16,
    presets: [
      { label: '3 thn (Balita)', value: 3, grade: 'Gratis' },
      { label: '16 thn (Pelajar)', value: 16, grade: 'Diskon 50%' },
      { label: '34 thn (Dewasa)', value: 34, grade: 'Reguler' },
      { label: '68 thn (Lansia)', value: 68, grade: 'Diskon 30%' },
    ],
    branches: [
      {
        id: 't1',
        keyword: 'if',
        conditionLabel: 'usia < 5',
        conditionFn: v => v < 5,
        actionCode: 'output("Gratis Rp 0")',
        actionTitle: 'Tiket Balita',
        actionDesc: 'Bebas Biaya Masuk (Gratis)',
        actionEmoji: '👶',
      },
      {
        id: 't2',
        keyword: 'elif',
        conditionLabel: 'usia <= 17',
        conditionFn: v => v <= 17,
        actionCode: 'output("Diskon 50%")',
        actionTitle: 'Tiket Pelajar',
        actionDesc: 'Potongan Khusus Siswa / Remaja',
        actionEmoji: '🎒',
      },
      {
        id: 't3',
        keyword: 'elif',
        conditionLabel: 'usia <= 59',
        conditionFn: v => v <= 59,
        actionCode: 'output("Tarif Reguler")',
        actionTitle: 'Tiket Dewasa',
        actionDesc: 'Tarif Penuh Standar',
        actionEmoji: '💼',
      },
      {
        id: 't4',
        keyword: 'else',
        conditionLabel: 'else (fallback)',
        conditionFn: () => true,
        isElse: true,
        actionCode: 'output("Diskon 30%")',
        actionTitle: 'Tiket Lansia',
        actionDesc: 'Apresiasi Warga Senior (60+ thn)',
        actionEmoji: '🧓',
      },
    ],
  },
  {
    id: 'suhu',
    title: 'Wujud Fisika Suhu Air (3 Cabang)',
    shortLabel: '🌡️ Wujud Fisika Suhu',
    varName: 'suhu',
    unit: '°C',
    min: -15,
    max: 120,
    sliderDefault: 45,
    presets: [
      { label: '-5°C (Es)', value: -5, grade: 'Padat' },
      { label: '45°C (Air)', value: 45, grade: 'Cair' },
      { label: '108°C (Uap)', value: 108, grade: 'Gas' },
    ],
    branches: [
      {
        id: 's1',
        keyword: 'if',
        conditionLabel: 'suhu <= 0',
        conditionFn: v => v <= 0,
        actionCode: 'output("Zat Padat")',
        actionTitle: 'Es Beku (Padat)',
        actionDesc: 'Molekul terkunci dalam kristal es',
        actionEmoji: '🧊',
      },
      {
        id: 's2',
        keyword: 'elif',
        conditionLabel: 'suhu < 100',
        conditionFn: v => v < 100,
        actionCode: 'output("Zat Cair")',
        actionTitle: 'Air Biasa (Cair)',
        actionDesc: 'Fluida mengalir bebas pada suhu ruang',
        actionEmoji: '💧',
      },
      {
        id: 's3',
        keyword: 'else',
        conditionLabel: 'else (fallback)',
        conditionFn: () => true,
        isElse: true,
        actionCode: 'output("Zat Gas")',
        actionTitle: 'Uap Panas (Gas)',
        actionDesc: 'Mendidih dan menguap ke udara',
        actionEmoji: '💨',
      },
    ],
  },
];

// ── Canvas Simulasi Cascading Multi-Branch Waterfall ──────────────────────────
function MultiBranchCascadeScene({
  scenario,
  value,
  replayKey,
}: {
  scenario: MultiBranchScenario;
  value: number;
  replayKey: number;
}) {
  // Hitung cabang yang pertama kali True (First-Match)
  const targetIndex = useMemo(() => {
    const idx = scenario.branches.findIndex(b => b.conditionFn(value));
    return idx === -1 ? scenario.branches.length - 1 : idx;
  }, [scenario, value]);

  // Phase animasi:
  // -1: start/input
  // 0..targetIndex: evaluasi gate demi gate
  // targetIndex + 1: belok ke kanan eksekusi aksi
  // targetIndex + 2: selesai
  const [animStep, setAnimStep] = useState<number>(-1);

  useEffect(() => {
    setAnimStep(-1);
    const timers: NodeJS.Timeout[] = [];

    // Step 0: tiba di gerbang input
    timers.push(setTimeout(() => setAnimStep(0), 100));

    // Step 1..targetIndex: melangkah menuruni setiap gate
    for (let i = 0; i <= targetIndex; i++) {
      timers.push(
        setTimeout(() => {
          setAnimStep(i);
        }, 400 + i * 550)
      );
    }

    // Step targetIndex + 1: belok ke kanan masuk ke blok aksi
    timers.push(
      setTimeout(() => {
        setAnimStep(targetIndex + 1);
      }, 500 + (targetIndex + 1) * 550)
    );

    // Step targetIndex + 2: short circuit selesai
    timers.push(
      setTimeout(() => {
        setAnimStep(targetIndex + 2);
      }, 950 + (targetIndex + 1) * 550)
    );

    return () => timers.forEach(clearTimeout);
  }, [value, scenario.id, replayKey, targetIndex]);

  // State traveler
  const isWalking = animStep >= 0 && animStep <= targetIndex + 1;
  const travelerDirection = animStep === targetIndex + 1 ? 'right' : 'down';

  return (
    <div className="relative w-full h-full min-h-[460px] md:min-h-[500px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-700/80 shadow-2xl flex flex-col p-3 md:p-4 justify-between">
      {/* Background Grid Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

      {/* ── Header Kanvas: Indikator Nilai Input Runtime ────────────────────── */}
      <div className="relative z-10 flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
          <span className="text-[11px] font-mono font-bold text-slate-300">
            Runtime Input: <code className="text-orange-300 font-black">{scenario.varName} = {value}{scenario.unit}</code>
          </span>
        </div>
        <div className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700">
          Total: {scenario.branches.length} Tingkat Cabang
        </div>
      </div>

      {/* ── Area Cascading Checkpoints (Air Terjun Percabangan) ─────────────── */}
      <div className="relative z-10 flex-1 my-2 flex flex-col justify-around py-1">
        
        {/* Garis Pipa Aliran Vertikal Sisi Kiri (False Waterfall Connector) */}
        <div className="absolute left-[38px] md:left-[44px] top-6 bottom-6 w-1 bg-slate-800 rounded-full pointer-events-none" />

        {/* Garis Pipa Aliran Vertikal Sisi Kanan (Exit Collector Trunk) */}
        <div className={`absolute right-4 md:right-6 top-6 bottom-6 w-1 rounded-full transition-colors duration-500 pointer-events-none ${
          animStep >= targetIndex + 1 ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'bg-slate-800'
        }`} />

        {scenario.branches.map((branch, idx) => {
          const isTarget = idx === targetIndex;
          const isPast = idx < targetIndex;
          const isFuture = idx > targetIndex;
          
          // Status visualisasi gate saat ini
          const isGateActive = animStep === idx;
          const isGateEvaluated = animStep >= idx;
          const isShortCircuited = isFuture && animStep >= targetIndex + 1;

          return (
            <div key={branch.id} className="relative flex items-center justify-between gap-2 md:gap-3 py-1.5">
              
              {/* 1. KOTAK KONDISI (CHECKPOINT GATE) */}
              <div className="relative flex items-center gap-2 z-10 shrink-0">
                {/* Node Diamond / Pos Pemeriksaan */}
                <div
                  className={`w-20 md:w-24 p-2 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center shadow-md ${
                    isShortCircuited
                      ? 'border-slate-800 bg-slate-950/40 opacity-35'
                      : isTarget && isGateEvaluated
                      ? 'border-emerald-400 bg-emerald-950/90 shadow-[0_0_18px_rgba(16,185,129,0.4)] ring-2 ring-emerald-500/50'
                      : isPast && isGateEvaluated
                      ? 'border-rose-500/80 bg-rose-950/60 shadow-[0_0_10px_rgba(244,63,94,0.2)]'
                      : isGateActive
                      ? 'border-amber-400 bg-amber-950/70 animate-pulse shadow-[0_0_14px_rgba(251,191,36,0.3)]'
                      : 'border-slate-700 bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[9px] font-mono font-black uppercase text-slate-300">
                      {branch.keyword}
                    </span>
                  </div>

                  <span className="text-[10px] md:text-[11px] font-mono font-bold leading-tight text-white truncate max-w-full">
                    {branch.conditionLabel}
                  </span>

                  {/* Badge Hasil Evaluasi Gate */}
                  <div className="mt-1">
                    {isShortCircuited ? (
                      <span className="text-[8px] font-mono font-bold text-slate-500 bg-slate-900 px-1 py-0.5 rounded border border-slate-800">
                        DILEWATI
                      </span>
                    ) : isTarget && isGateEvaluated ? (
                      <span className="text-[8px] font-mono font-black text-emerald-300 bg-emerald-900/90 px-1.5 py-0.5 rounded border border-emerald-400 flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5" /> TRUE
                      </span>
                    ) : isPast && isGateEvaluated ? (
                      <span className="text-[8px] font-mono font-black text-rose-300 bg-rose-900/90 px-1.5 py-0.5 rounded border border-rose-500 flex items-center gap-0.5">
                        <X className="w-2.5 h-2.5" /> FALSE
                      </span>
                    ) : isGateActive ? (
                      <span className="text-[8px] font-mono font-bold text-amber-300 bg-amber-900/90 px-1 py-0.5 rounded border border-amber-400">
                        UJI...
                      </span>
                    ) : (
                      <span className="text-[8px] font-mono text-slate-400">
                        Menunggu
                      </span>
                    )}
                  </div>
                </div>

                {/* Indikator Panah Turun (Jika False) */}
                {idx < scenario.branches.length - 1 && (
                  <div className={`absolute left-[34px] md:left-[40px] -bottom-3 text-[10px] z-0 transition-opacity duration-300 ${
                    isPast && isGateEvaluated ? 'text-rose-400 font-bold opacity-100' : 'text-slate-600 opacity-40'
                  }`}>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              {/* 2. JEMBATAN KONEKSI HORIZONTAL (TRUE BRANCH PATHWAY) */}
              <div className="relative flex-1 flex items-center justify-center px-1">
                {/* Jalur garis horizontal */}
                <div
                  className={`w-full h-1 rounded-full transition-all duration-500 ${
                    isTarget && animStep >= targetIndex + 1
                      ? 'bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.7)]'
                      : isShortCircuited
                      ? 'border-t-2 border-dashed border-slate-800 bg-transparent'
                      : 'bg-slate-800'
                  }`}
                />

                {/* Label Status Jalur */}
                <div className="absolute top-1/2 -translate-y-1/2 px-1.5 py-0.2 text-[8px] font-mono font-black rounded backdrop-blur-md">
                  {isTarget && isGateEvaluated ? (
                    <span className="text-emerald-300 bg-emerald-950/90 border border-emerald-400/80 px-1 py-0.2 rounded shadow-sm">
                      {branch.isElse ? 'ELSE' : 'TRUE →'}
                    </span>
                  ) : isShortCircuited ? (
                    <span className="text-slate-500 bg-slate-950/80 border border-slate-800 px-1 py-0.2 rounded">
                      BYPASS
                    </span>
                  ) : null}
                </div>
              </div>

              {/* 3. BLOK AKSI STATEMENT (OUTPUT / INSTRUKSI) */}
              <div className="relative flex items-center gap-1.5 z-10 shrink-0">
                <div
                  className={`w-36 md:w-44 p-2 md:p-2.5 rounded-xl border-2 transition-all duration-300 flex items-center justify-between gap-2 shadow-md ${
                    isShortCircuited
                      ? 'border-slate-800 bg-slate-950/40 opacity-30'
                      : isTarget && animStep >= targetIndex + 1
                      ? 'border-emerald-400 bg-emerald-950/90 shadow-[0_0_20px_rgba(16,185,129,0.5)] ring-2 ring-emerald-500/60'
                      : 'border-slate-700/80 bg-slate-900/70 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-base shrink-0">{branch.actionEmoji}</span>
                    <div className="flex flex-col truncate text-left">
                      <code className="text-[10px] md:text-[11px] font-mono font-black text-white truncate">
                        {branch.actionCode}
                      </code>
                      <span className="text-[9px] text-slate-300 truncate font-semibold">
                        {branch.actionTitle}
                      </span>
                    </div>
                  </div>

                  {/* Icon status dieksekusi */}
                  {isTarget && animStep >= targetIndex + 1 ? (
                    <span className="text-emerald-400 font-bold text-xs shrink-0 animate-bounce">
                      ✓
                    </span>
                  ) : null}
                </div>

                {/* Garis Horizontal Menuju Exit Collector */}
                <div
                  className={`w-3 md:w-5 h-1 rounded-full transition-all duration-500 ${
                    isTarget && animStep >= targetIndex + 1
                      ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
                      : 'bg-slate-800'
                  }`}
                />
              </div>

            </div>
          );
        })}

        {/* ── Karakter Mahasiswa / Traveler Beranimasi ──────────────────────── */}
        {/* Posisi Traveler: Mengikuti Gate yang sedang diuji atau berbelok ke Aksi */}
        {animStep >= 0 && (
          <motion.div
            className="absolute z-30 pointer-events-none transition-all duration-500 ease-out"
            style={{
              left: animStep <= targetIndex ? '28px' : '45%',
              top: `${Math.min(animStep, targetIndex) * (100 / scenario.branches.length) + 4}%`,
            }}
          >
            <div className="relative">
              {/* Balon Ucap Ringkas Karakter */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/95 border border-orange-400/70 text-orange-300 font-mono font-black text-[9px] px-2 py-0.5 rounded-full shadow-lg">
                {animStep < targetIndex
                  ? `${value} → Bukan!`
                  : animStep === targetIndex
                  ? `${value} → Cocok!`
                  : `Eksekusi! 🎉`}
              </div>
              <AnimatedTraveler walking={isWalking} direction={travelerDirection} />
            </div>
          </motion.div>
        )}

      </div>

      {/* ── Footer Kanvas: Jalur Exit Selesai (Terminator) ──────────────────── */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-slate-400">
          <GitFork className="w-3.5 h-3.5 text-orange-400" />
          <span>Alur: <strong>Short-Circuit</strong> keluar setelah 1 cabang True</span>
        </div>

        <div className={`px-2.5 py-0.5 rounded-full border text-[10px] font-black flex items-center gap-1 transition-all ${
          animStep >= targetIndex + 1
            ? 'bg-emerald-950 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
            : 'bg-slate-900 border-slate-700 text-slate-400'
        }`}>
          <span>Selesai (Exit)</span>
          {animStep >= targetIndex + 1 && <Check className="w-3 h-3 text-emerald-400" />}
        </div>
      </div>
    </div>
  );
}

// ── Komponen Utama: AnimatedMultiBranchDefinition (3D Flip & Zoom Card) ────────
export default function AnimatedMultiBranchDefinition() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [scenarioId, setScenarioId] = useState('grade');
  const [value, setValue] = useState(78);
  const [replayKey, setReplayKey] = useState(0);

  const scenario = MULTI_SCENARIOS.find(s => s.id === scenarioId) || MULTI_SCENARIOS[0];

  const handleScenarioChange = (id: string) => {
    const sc = MULTI_SCENARIOS.find(s => s.id === id) || MULTI_SCENARIOS[0];
    setScenarioId(id);
    setValue(sc.sliderDefault);
    setReplayKey(k => k + 1);
  };

  const handleFlipToFront = () => {
    setIsFlipped(false);
  };

  const winningBranch = useMemo(() => {
    return scenario.branches.find(b => b.conditionFn(value)) || scenario.branches[scenario.branches.length - 1];
  }, [scenario, value]);

  const winningIndex = useMemo(() => {
    return scenario.branches.findIndex(b => b.id === winningBranch.id);
  }, [scenario, winningBranch]);

  return (
    <div
      className="w-full relative z-0"
      style={{
        perspective: 1200,
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'subpixel-antialiased',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isFlipped ? (
          /* ═══════════════════════════════════════════════════════════════════ */
          /* 1. SISI DEPAN KARTU (DEFINISI AKADEMIK RESMI)                     */
          /* ═══════════════════════════════════════════════════════════════════ */
          <motion.div
            key="front"
            initial={{ rotateY: -75, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 75, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            onClick={() => setIsFlipped(true)}
            className="w-full cursor-pointer transition-all duration-300 origin-center p-5 md:p-6 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-900/10 dark:from-slate-950 dark:via-orange-950/20 dark:to-slate-950 border-2 border-orange-400 dark:border-orange-500/70 rounded-3xl shadow-md space-y-4 hover:scale-[1.015] sm:hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(249,115,22,0.25)] hover:border-orange-500 hover:ring-2 hover:ring-orange-400/30 subpixel-antialiased select-none"
            style={{
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'subpixel-antialiased',
            }}
          >
            {/* Header Definisi */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-orange-800 dark:text-orange-300 font-extrabold text-xs uppercase tracking-wider font-mono">
                <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span>Definisi Akademik Resmi: Percabangan Majemuk</span>
              </div>

              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-orange-100 hover:bg-orange-200 dark:bg-orange-950 dark:hover:bg-orange-900 text-orange-900 dark:text-orange-100 border border-orange-300 dark:border-orange-700 shadow-sm animate-pulse">
                <RotateCw className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                <span>Klik untuk Buka Animasi Interaktif</span>
              </div>
            </div>

            {/* Blockquote Teks Definisi Akademik Berbobot & Super Tajam */}
            <blockquote className="text-sm md:text-base text-slate-950 dark:text-slate-100 font-semibold leading-relaxed select-none bg-white dark:bg-slate-900 p-4 md:p-5 rounded-2xl border-2 border-orange-200 dark:border-orange-900/80 hover:border-orange-400 transition-colors shadow-xs space-y-2.5">
              <p>
                &ldquo;<strong className="text-orange-700 dark:text-orange-300 font-black text-base md:text-lg underline decoration-orange-500/40">Struktur Percabangan Majemuk</strong>{' '}
                (<em>Cascading Selection / Multi-Way Decision Structure</em>) adalah konstruksi kontrol alur algoritma yang{' '}
                <strong className="text-sky-950 dark:text-sky-200 font-extrabold bg-sky-100 dark:bg-sky-950/90 px-2 py-0.5 rounded-md border border-sky-400 dark:border-sky-600 inline-block my-0.5 shadow-2xs">
                  mengevaluasi serangkaian kondisi boolean secara berjenjang dan sekuensial (top-down)
                </strong>.
              </p>
              <p>
                Blok instruksi dari kondisi pertama yang logikanya terpenuhi (<strong>True</strong>) akan dieksekusi secara{' '}
                <strong className="text-emerald-950 dark:text-emerald-200 font-extrabold bg-emerald-100 dark:bg-emerald-950/90 px-2 py-0.5 rounded-md border border-emerald-400 dark:border-emerald-600 inline-block my-0.5 shadow-2xs">
                  eksklusif (mutually exclusive)
                </strong>{' '}
                dan kontrol alur program langsung{' '}
                <strong className="text-rose-950 dark:text-rose-200 font-extrabold bg-rose-100 dark:bg-rose-950/90 px-2 py-0.5 rounded-md border border-rose-400 dark:border-rose-600 inline-block my-0.5 shadow-2xs">
                  melompat keluar (short-circuit / bypass)
                </strong>{' '}
                mengabaikan seluruh cabang di bawahnya; atau bermuara pada{' '}
                <strong className="text-amber-950 dark:text-amber-200 font-extrabold bg-amber-100 dark:bg-amber-950/90 px-2 py-0.5 rounded-md border border-amber-400 dark:border-amber-600 inline-block my-0.5 shadow-2xs">
                  blok cadangan akhir (Else / Default)
                </strong>{' '}
                apabila tidak ada satu pun kondisi pengujian yang bernilai True.&rdquo;
              </p>
            </blockquote>

            {/* Petunjuk Interaksi Hover & Click */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-orange-700 dark:text-orange-300 pt-0.5">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span>Arahkan kursor (hover) untuk efek zoom • Klik kartu untuk membalik &amp; melihat simulasi air terjun seleksi</span>
              </div>
              <span className="font-mono text-[11px] bg-orange-100 dark:bg-orange-950 px-2 py-0.5 rounded border border-orange-300 dark:border-orange-800">
                3D Flip Card
              </span>
            </div>
          </motion.div>
        ) : (
          /* ═══════════════════════════════════════════════════════════════════ */
          /* 2. SISI BELAKANG KARTU (SPLIT WIDESCREEN: ANIMASI AIR TERJUN)     */
          /* ═══════════════════════════════════════════════════════════════════ */
          <motion.div
            key="back"
            initial={{ rotateY: 75, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -75, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="w-full p-4 md:p-6 bg-orange-50/60 dark:bg-slate-950 border-2 border-orange-400 dark:border-orange-600 rounded-3xl shadow-2xl space-y-4 subpixel-antialiased"
            style={{
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'subpixel-antialiased',
            }}
          >
          
          {/* Header Sisi Belakang: Selector Studi Kasus + Tombol Balik */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-orange-200 dark:border-orange-800/80">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                Pilih Skenario Percabangan:
              </span>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {MULTI_SCENARIOS.map(sc => (
                  <button
                    key={sc.id}
                    onClick={() => handleScenarioChange(sc.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                      scenarioId === sc.id
                        ? 'bg-orange-600 text-white shadow-md shadow-orange-500/30 ring-2 ring-orange-400'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {sc.shortLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Tombol Balik ke Definisi */}
            <button
              onClick={handleFlipToFront}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-500/20 transition-all cursor-pointer shrink-0"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Balik ke Definisi</span>
            </button>
          </div>

          {/* ── 2-Column Split Layout: Canvas di Kiri & Kontrol/Keterangan di Kanan ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            
            {/* KOLOM KIRI: Canvas Simulasi Cascading Checkpoints */}
            <div className="lg:col-span-7 flex flex-col min-h-[460px]">
              <MultiBranchCascadeScene
                key={`${scenario.id}-${replayKey}`}
                scenario={scenario}
                value={value}
                replayKey={replayKey}
              />
            </div>

            {/* KOLOM KANAN: Panel Kontrol Input & 3 Pilar Pemetaan Definisi */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-3">
              
              {/* 1. Slider Input Interaktif & Tombol Presets */}
              <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-700 shadow-md space-y-2.5 text-white">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-300">Variabel Input:</span>
                    <span className="text-sm font-black font-mono px-2.5 py-0.5 rounded-lg border bg-orange-950 border-orange-400 text-orange-300 shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                      {scenario.varName} = {value}{scenario.unit}
                    </span>
                  </div>

                  <button
                    onClick={() => setReplayKey(k => k + 1)}
                    className="flex items-center gap-1 text-[11px] font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-600 transition-all cursor-pointer shadow-xs"
                  >
                    <RefreshCcw className="w-3 h-3 text-orange-400" />
                    <span>Ulangi Alur</span>
                  </button>
                </div>

                {/* Slider range input */}
                <div className="flex items-center gap-2.5 pt-0.5">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    {scenario.min}{scenario.unit}
                  </span>
                  <input
                    type="range"
                    min={scenario.min}
                    max={scenario.max}
                    value={value}
                    onChange={e => {
                      setValue(Number(e.target.value));
                      setReplayKey(k => k + 1);
                    }}
                    className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    {scenario.max}{scenario.unit}
                  </span>
                </div>

                {/* Presets Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-mono text-slate-400">Uji Cepat:</span>
                  {scenario.presets.map(p => (
                    <button
                      key={p.value}
                      onClick={() => {
                        setValue(p.value);
                        setReplayKey(k => k + 1);
                      }}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
                        value === p.value
                          ? 'bg-orange-600 text-white shadow-xs'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Banner Live Decision Outcome */}
              <div className="p-3 rounded-xl border-2 font-mono text-xs font-bold bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-xs space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{winningBranch.actionEmoji}</span>
                    <span className="font-extrabold text-xs text-emerald-700 dark:text-emerald-300">
                      CABANG TERPILIH #{winningIndex + 1}:
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-600 text-white">
                    {winningBranch.isElse ? 'DEFAULT ELSE' : 'EVALUASI TRUE'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-800 dark:text-slate-200">
                  Kondisi: <code className="font-black underline">{winningBranch.conditionLabel}</code> → Menjalankan{' '}
                  <code className="bg-emerald-100 dark:bg-emerald-900 px-1.5 py-0.2 rounded font-black text-emerald-900 dark:text-emerald-200">
                    {winningBranch.actionCode}
                  </code>
                </div>
                {winningIndex < scenario.branches.length - 1 && (
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 pt-0.5 border-t border-emerald-500/20 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{scenario.branches.length - 1 - winningIndex} cabang berikutnya otomatis dilewati (short-circuit).</span>
                  </div>
                )}
              </div>

              {/* 3. Tiga Pilar Penjelas Konsep Definisi */}
              <div className="flex flex-col gap-2 flex-1 justify-between">
                {/* Pilar 1 */}
                <div className="p-2.5 rounded-xl border-2 border-sky-300 dark:border-sky-700/80 bg-sky-50/90 dark:bg-sky-950/50 space-y-0.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-black uppercase text-sky-900 dark:text-sky-300">
                    <span>①</span>
                    <span>Evaluasi Sekuensial Berjenjang (Top-Down)</span>
                  </div>
                  <p className="text-[11px] text-sky-950 dark:text-sky-100 font-semibold leading-tight">
                    Komputer menguji kondisi urut dari atas. Kondisi ke-2 hanya diuji bila kondisi ke-1 bernilai <strong>False</strong>.
                  </p>
                </div>

                {/* Pilar 2 */}
                <div className="p-2.5 rounded-xl border-2 border-emerald-300 dark:border-emerald-700/80 bg-emerald-50/90 dark:bg-emerald-950/50 space-y-0.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-black uppercase text-emerald-900 dark:text-emerald-300">
                    <span>②</span>
                    <span>Eksekusi Eksklusif &amp; Short-Circuit</span>
                  </div>
                  <p className="text-[11px] text-emerald-950 dark:text-emerald-100 font-semibold leading-tight">
                    Tepat <strong>satu cabang</strong> yang dieksekusi. Begitu ada kondisi bernilai True, alur langsung melompat keluar ke akhir seleksi.
                  </p>
                </div>

                {/* Pilar 3 */}
                <div className="p-2.5 rounded-xl border-2 border-amber-300 dark:border-amber-700/80 bg-amber-50/90 dark:bg-amber-950/50 space-y-0.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-black uppercase text-amber-900 dark:text-amber-300">
                    <span>③</span>
                    <span>Jaring Pengaman Akhir (Default Else)</span>
                  </div>
                  <p className="text-[11px] text-amber-950 dark:text-amber-100 font-semibold leading-tight">
                    Menjamin algoritma selalu menghasilkan keluaran pasti jika seluruh kondisi sebelumnya tidak terpenuhi.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
}
