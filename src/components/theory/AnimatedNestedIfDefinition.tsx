"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Sparkles, Check, X, RotateCw, Layers, ArrowDown, ArrowRight, ShieldAlert, CheckCircle2, Lock, Unlock, DoorOpen } from 'lucide-react';

// ── Karakter Mahasiswa Animatif Berjalan ──────────────────────────────────────
function AnimatedTraveler({
  walking,
  direction,
}: {
  walking: boolean;
  direction: 'down' | 'right' | 'idle';
}) {
  return (
    <div className="relative flex flex-col items-center justify-center select-none pointer-events-none">
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
          {/* Topi Mahasiswa Ungu-Violet */}
          <ellipse cx="17" cy="9" rx="7.5" ry="4" fill="#9333ea" />
          <rect x="11.5" y="6" width="11" height="4" rx="2" fill="#7e22ce" />

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

          {/* Badan / Baju Ungu Indigo */}
          <path d="M12 18 C12 17, 22 17, 22 18 L23 29 C23 30, 11 30, 11 29 Z" fill="#a855f7" />

          {/* Tas Punggung Mahasiswa */}
          {direction === 'right' ? (
            <rect x="9" y="19" width="4" height="9" rx="1.5" fill="#581c87" />
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
            fill="#9333ea"
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
            fill="#9333ea"
          />
        </svg>
      </motion.div>
    </div>
  );
}

// ── Tipe Data Skenario Nested IF ──────────────────────────────────────────────
interface NestedScenario {
  id: string;
  title: string;
  shortLabel: string;
  var1Name: string;
  var1Label: string;
  var1Unit: string;
  var1Min: number;
  var1Max: number;
  var1Default: number;
  var2Name: string;
  var2Label: string;
  var2Unit: string;
  var2Min: number;
  var2Max: number;
  var2Default: number;
  outerCondLabel: string;
  outerCondFn: (v1: number) => boolean;
  innerCondLabel: string;
  innerCondFn: (v2: number) => boolean;
  outerFailCode: string;
  outerFailTitle: string;
  innerFailCode: string;
  innerFailTitle: string;
  successCode: string;
  successTitle: string;
  presets: {
    label: string;
    v1: number;
    v2: number;
    desc: string;
  }[];
}

const NESTED_SCENARIOS: NestedScenario[] = [
  {
    id: 'donor',
    title: 'Kualifikasi Donor Darah (Gerbang Usia & Berat)',
    shortLabel: '🩸 Donor Darah (Usia & Berat)',
    var1Name: 'usia',
    var1Label: 'Usia Calon Donor',
    var1Unit: ' thn',
    var1Min: 12,
    var1Max: 60,
    var1Default: 20,
    var2Name: 'berat',
    var2Label: 'Berat Badan',
    var2Unit: ' kg',
    var2Min: 30,
    var2Max: 90,
    var2Default: 52,
    outerCondLabel: 'usia >= 17',
    outerCondFn: v => v >= 17,
    innerCondLabel: 'berat >= 45',
    innerCondFn: v => v >= 45,
    outerFailCode: 'output("Gagal: Usia belum cukup")',
    outerFailTitle: 'Gagal di Gerbang 1 (Usia < 17 thn)',
    innerFailCode: 'output("Gagal: Berat badan kurang")',
    innerFailTitle: 'Gagal di Gerbang 2 (Berat < 45 kg)',
    successCode: 'output("Lolos: Siap Donor Darah")',
    successTitle: 'Lolos Kedua Gerbang (Memenuhi Syarat)',
    presets: [
      { label: '❌ Gagal Gerbang 1 (Usia 15, BB 50)', v1: 15, v2: 50, desc: 'Tertahan di Gerbang Luar' },
      { label: '⚠️ Gagal Gerbang 2 (Usia 20, BB 40)', v1: 20, v2: 40, desc: 'Lolos Luar, Gagal Dalam' },
      { label: '✅ Lolos Sempurna (Usia 22, BB 55)', v1: 22, v2: 55, desc: 'Lolos Kedua Gerbang' },
    ],
  },
  {
    id: 'beasiswa',
    title: 'Seleksi Beasiswa Unggulan (Gerbang IPK & TOEFL)',
    shortLabel: '🎓 Beasiswa (IPK & TOEFL)',
    var1Name: 'ipk',
    var1Label: 'Indeks Prestasi Kumulatif',
    var1Unit: ' IPK',
    var1Min: 20, // 2.0
    var1Max: 40, // 4.0
    var1Default: 37, // 3.7
    var2Name: 'toefl',
    var2Label: 'Skor TOEFL Prediksi',
    var2Unit: ' pts',
    var2Min: 350,
    var2Max: 650,
    var2Default: 520,
    outerCondLabel: 'ipk >= 3.5',
    outerCondFn: v => v >= 35,
    innerCondLabel: 'toefl >= 500',
    innerCondFn: v => v >= 500,
    outerFailCode: 'output("Gagal: IPK di bawah 3.5")',
    outerFailTitle: 'Gagal di Gerbang 1 (IPK Kurang)',
    innerFailCode: 'output("Gagal: Skor TOEFL di bawah 500")',
    innerFailTitle: 'Gagal di Gerbang 2 (TOEFL Kurang)',
    successCode: 'output("Lolos: Penerima Beasiswa Penuh")',
    successTitle: 'Lolos Kedua Gerbang Prestasi',
    presets: [
      { label: '❌ Gagal IPK (IPK 3.2, TOEFL 550)', v1: 32, v2: 550, desc: 'Tertahan di Syarat IPK' },
      { label: '⚠️ Gagal TOEFL (IPK 3.8, TOEFL 460)', v1: 38, v2: 460, desc: 'Lolos IPK, Gagal TOEFL' },
      { label: '✅ Lolos Penuh (IPK 3.9, TOEFL 560)', v1: 39, v2: 560, desc: 'Memenuhi Kedua Syarat' },
    ],
  },
  {
    id: 'login',
    title: 'Autentikasi Akses Sistem (Akun & PIN Keamanan)',
    shortLabel: '🔐 Autentikasi (ID & PIN)',
    var1Name: 'idValid',
    var1Label: 'Validasi User ID (1=Ada, 0=Salah)',
    var1Unit: '',
    var1Min: 0,
    var1Max: 1,
    var1Default: 1,
    var2Name: 'pinValid',
    var2Label: 'Validasi PIN 6-Digit (1=Benar, 0=Salah)',
    var2Unit: '',
    var2Min: 0,
    var2Max: 1,
    var2Default: 1,
    outerCondLabel: 'idValid == 1',
    outerCondFn: v => v === 1,
    innerCondLabel: 'pinValid == 1',
    innerCondFn: v => v === 1,
    outerFailCode: 'output("Gagal: User ID tidak ditemukan")',
    outerFailTitle: 'Gagal di Gerbang 1 (Akun Tidak Ada)',
    innerFailCode: 'output("Gagal: PIN keamanan keliru")',
    innerFailTitle: 'Gagal di Gerbang 2 (PIN Salah)',
    successCode: 'output("Sukses: Akses Sistem Diberikan")',
    successTitle: 'Autentikasi 2-Faktor Berhasil',
    presets: [
      { label: '❌ ID Salah (ID 0, PIN 1)', v1: 0, v2: 1, desc: 'Akun Tak Ditemukan' },
      { label: '⚠️ PIN Salah (ID 1, PIN 0)', v1: 1, v2: 0, desc: 'PIN Salah' },
      { label: '✅ Akses Sukses (ID 1, PIN 1)', v1: 1, v2: 1, desc: 'Akses Diterima' },
    ],
  },
];

// ── Canvas Simulasi Gerbang Berlapis (Nested Gatekeeper Scene) ─────────────────
function NestedGateScene({
  scenario,
  v1,
  v2,
  replayKey,
}: {
  scenario: NestedScenario;
  v1: number;
  v2: number;
  replayKey: number;
}) {
  const outerPass = scenario.outerCondFn(v1);
  const innerPass = scenario.innerCondFn(v2);

  // Status hasil alur:
  // 'outer-fail': gagal di gerbang 1 (tidak pernah masuk gerbang 2)
  // 'inner-fail': lolos gerbang 1, tapi gagal di gerbang 2
  // 'success': lolos kedua gerbang
  const outcome: 'outer-fail' | 'inner-fail' | 'success' = !outerPass
    ? 'outer-fail'
    : !innerPass
    ? 'inner-fail'
    : 'success';

  // Animasi langkah:
  // 0: Di pintu masuk awal
  // 1: Menguji gerbang 1 (outer)
  // 2: Selesai gerbang 1:
  //    - jika gagal: belok ke penolakan luar
  //    - jika lolos: melangkah melewati gerbang masuk ke ruang dalam (nested)
  // 3: Menguji gerbang 2 (inner)
  // 4: Selesai gerbang 2:
  //    - jika gagal: belok ke penolakan dalam
  //    - jika lolos: melangkah ke pencapaian sukses
  const [animStep, setAnimStep] = useState<number>(0);

  useEffect(() => {
    setAnimStep(0);
    const timers: NodeJS.Timeout[] = [];

    // Step 1: mulai berjalan mendekat ke Gerbang 1
    timers.push(setTimeout(() => setAnimStep(1), 200));

    // Step 2: evaluasi Gerbang 1 selesai
    timers.push(setTimeout(() => setAnimStep(2), 900));

    if (outerPass) {
      // Step 3: berjalan masuk ke ruang nested dan menguji Gerbang 2
      timers.push(setTimeout(() => setAnimStep(3), 1700));
      // Step 4: evaluasi Gerbang 2 selesai
      timers.push(setTimeout(() => setAnimStep(4), 2500));
    }

    return () => timers.forEach(clearTimeout);
  }, [scenario.id, v1, v2, replayKey, outerPass]);

  // Posisi Karakter
  const charPos = useMemo(() => {
    if (animStep <= 0) return { x: '10%', y: '35%' };
    if (animStep === 1) return { x: '24%', y: '35%' };
    if (animStep === 2) {
      if (!outerPass) return { x: '28%', y: '78%' }; // Belok turun ke Penolakan Luar
      return { x: '52%', y: '35%' }; // Lolos melangkah melewati pintu masuk ke Ruang Nested
    }
    if (animStep === 3) return { x: '68%', y: '35%' }; // Menghadap Gerbang 2
    if (animStep >= 4) {
      if (!innerPass) return { x: '72%', y: '78%' }; // Belok turun ke Penolakan Dalam
      return { x: '88%', y: '35%' }; // Sukses Penuh!
    }
    return { x: '10%', y: '35%' };
  }, [animStep, outerPass, innerPass]);

  const isWalking = animStep === 1 || animStep === 2 || (outerPass && (animStep === 3 || animStep === 4));
  const travelerDirection = !outerPass && animStep >= 2 ? 'down' : !innerPass && animStep >= 4 ? 'down' : 'right';

  const v1Display = scenario.id === 'beasiswa' ? (v1 / 10).toFixed(1) : v1;

  return (
    <div className="relative w-full h-full min-h-[460px] md:min-h-[500px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-700/80 shadow-2xl flex flex-col p-3 md:p-4 justify-between">
      {/* Background Grid Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

      {/* ── Header Kanvas: Runtime Input Display ─────────────────────────────── */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          <span className="text-[11px] font-mono font-bold text-slate-300">
            Nilai Input: <code className="text-purple-300 font-black">{scenario.var1Name} = {v1Display}{scenario.var1Unit}</code>, <code className="text-emerald-300 font-black">{scenario.var2Name} = {v2}{scenario.var2Unit}</code>
          </span>
        </div>
        <div className="text-[10px] font-mono font-bold text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded-md border border-purple-800">
          Hierarki 2 Tingkat (Outer &amp; Inner)
        </div>
      </div>

      {/* ── Area Simulasi Visual Dua Ruangan (Outer Gate & Nested Chamber) ──── */}
      <div className="relative z-10 flex-1 my-2 grid grid-cols-12 gap-3 items-stretch">
        
        {/* 1. RUANGAN LUAR / GERBANG 1 (GATEKEEPER) - 5 Kolom */}
        <div className="col-span-5 relative flex flex-col justify-between p-3 rounded-2xl border-2 border-slate-700 bg-slate-900/50 backdrop-blur-xs">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[10px] font-mono font-black text-purple-300 uppercase">
                Gerbang 1 (Outer)
              </span>
            </div>
            <span className="text-[9px] font-mono font-bold text-slate-400">
              Syarat Utama
            </span>
          </div>

          {/* Pos Pengujian Gerbang 1 */}
          <div className="flex flex-col items-center justify-center my-auto space-y-2">
            <div
              className={`w-full max-w-[150px] p-2.5 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center shadow-md ${
                animStep >= 2 && outerPass
                  ? 'border-emerald-400 bg-emerald-950/90 shadow-[0_0_18px_rgba(16,185,129,0.4)]'
                  : animStep >= 2 && !outerPass
                  ? 'border-rose-500 bg-rose-950/80 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                  : animStep === 1
                  ? 'border-amber-400 bg-amber-950/70 animate-pulse'
                  : 'border-slate-700 bg-slate-800/80'
              }`}
            >
              <span className="text-[9px] font-mono font-black uppercase text-slate-300">
                if ({scenario.outerCondLabel})
              </span>
              <span className="text-xs font-mono font-black text-white my-0.5">
                {v1Display} {scenario.var1Unit}
              </span>
              {/* Hasil Gate 1 */}
              <div className="mt-0.5">
                {animStep >= 2 ? (
                  outerPass ? (
                    <span className="text-[8px] font-mono font-black text-emerald-300 bg-emerald-900/90 px-1.5 py-0.5 rounded border border-emerald-400 flex items-center gap-0.5">
                      <Unlock className="w-2.5 h-2.5" /> LOLOS (TRUE)
                    </span>
                  ) : (
                    <span className="text-[8px] font-mono font-black text-rose-300 bg-rose-900/90 px-1.5 py-0.5 rounded border border-rose-500 flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" /> GAGAL (FALSE)
                    </span>
                  )
                ) : (
                  <span className="text-[8px] font-mono text-slate-400">Siap Uji</span>
                )}
              </div>
            </div>

            {/* Pintu Penghubung ke Ruang Dalam */}
            <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400">
              {animStep >= 2 && outerPass ? (
                <span className="text-emerald-400 flex items-center gap-1 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-500">
                  <DoorOpen className="w-3 h-3" /> Pintu Dalam Terbuka →
                </span>
              ) : (
                <span className="text-slate-500 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Akses Dalam Terkunci
                </span>
              )}
            </div>
          </div>

          {/* Kotak Kegagalan Gerbang Luar (Else Luar) */}
          <div
            className={`p-2 rounded-xl border transition-all duration-300 text-left ${
              animStep >= 2 && !outerPass
                ? 'border-rose-400 bg-rose-950/90 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                : 'border-slate-800 bg-slate-950/40 opacity-40'
            }`}
          >
            <div className="flex items-center gap-1 text-[9px] font-mono font-black text-rose-400 uppercase">
              <X className="w-3 h-3" /> Else Gerbang Luar:
            </div>
            <code className="text-[10px] font-mono font-bold text-rose-200 block truncate">
              {scenario.outerFailCode}
            </code>
          </div>

        </div>

        {/* 2. RUANGAN BERSARANG / GERBANG 2 (NESTED CHAMBER) - 7 Kolom */}
        <div
          className={`col-span-7 relative flex flex-col justify-between p-3 rounded-2xl border-2 transition-all duration-500 backdrop-blur-xs ${
            animStep >= 2 && outerPass
              ? 'border-purple-500/80 bg-purple-950/20 shadow-[0_0_25px_rgba(168,85,247,0.15)]'
              : 'border-dashed border-slate-800 bg-slate-950/30 opacity-40'
          }`}
        >
          <div className="flex items-center justify-between border-b border-purple-800/40 pb-1.5 mb-2">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[10px] font-mono font-black text-purple-300 uppercase">
                Ruang Bersarang (Nested IF)
              </span>
            </div>
            <span className="text-[9px] font-mono font-bold text-emerald-400">
              {animStep >= 2 && outerPass ? '✓ Aktif Diuji' : '🚫 Belum Terbuka'}
            </span>
          </div>

          {/* Jalur Evaluasi Gerbang 2 & Hasil Akhir */}
          <div className="grid grid-cols-2 gap-2 my-auto items-center">
            
            {/* Pos Pengujian Gerbang 2 */}
            <div
              className={`p-2.5 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center shadow-md ${
                animStep >= 4 && innerPass
                  ? 'border-emerald-400 bg-emerald-950/90 shadow-[0_0_20px_rgba(16,185,129,0.5)] ring-2 ring-emerald-500/60'
                  : animStep >= 4 && !innerPass
                  ? 'border-amber-500 bg-amber-950/80 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : animStep === 3
                  ? 'border-amber-400 bg-amber-950/70 animate-pulse'
                  : 'border-slate-700 bg-slate-800/80'
              }`}
            >
              <span className="text-[9px] font-mono font-black uppercase text-slate-300">
                if ({scenario.innerCondLabel})
              </span>
              <span className="text-xs font-mono font-black text-white my-0.5">
                {v2} {scenario.var2Unit}
              </span>
              {/* Hasil Gate 2 */}
              <div className="mt-0.5">
                {animStep >= 4 ? (
                  innerPass ? (
                    <span className="text-[8px] font-mono font-black text-emerald-300 bg-emerald-900/90 px-1.5 py-0.5 rounded border border-emerald-400 flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> LOLOS
                    </span>
                  ) : (
                    <span className="text-[8px] font-mono font-black text-amber-300 bg-amber-900/90 px-1.5 py-0.5 rounded border border-amber-400 flex items-center gap-0.5">
                      <X className="w-2.5 h-2.5" /> GAGAL
                    </span>
                  )
                ) : (
                  <span className="text-[8px] font-mono text-slate-400">
                    {outerPass ? 'Menunggu' : 'Terkunci'}
                  </span>
                )}
              </div>
            </div>

            {/* Kotak Tujuan Sukses Penuh (True Gerbang 2) */}
            <div
              className={`p-2.5 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center shadow-md ${
                animStep >= 4 && innerPass
                  ? 'border-emerald-400 bg-emerald-950/95 shadow-[0_0_25px_rgba(16,185,129,0.7)] ring-2 ring-emerald-400 animate-pulse'
                  : 'border-slate-800 bg-slate-900/50 opacity-30'
              }`}
            >
              <span className="text-base mb-0.5">🏆</span>
              <span className="text-[9px] font-mono font-black text-emerald-400 uppercase">
                Sukses Penuh
              </span>
              <code className="text-[10px] font-mono font-black text-white truncate max-w-full">
                {scenario.successCode}
              </code>
            </div>

          </div>

          {/* Kotak Kegagalan Gerbang Dalam (Else Dalam) */}
          <div
            className={`p-2 rounded-xl border transition-all duration-300 text-left ${
              animStep >= 4 && !innerPass
                ? 'border-amber-400 bg-amber-950/90 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'border-slate-800 bg-slate-950/40 opacity-30'
            }`}
          >
            <div className="flex items-center gap-1 text-[9px] font-mono font-black text-amber-400 uppercase">
              <ShieldAlert className="w-3 h-3" /> Else Gerbang Bersarang:
            </div>
            <code className="text-[10px] font-mono font-bold text-amber-200 block truncate">
              {scenario.innerFailCode}
            </code>
          </div>

        </div>

        {/* ── Karakter Mahasiswa Beranimasi Bergerak ─────────────────────────── */}
        <motion.div
          className="absolute z-30 pointer-events-none transition-all duration-700 ease-out"
          style={{
            left: charPos.x,
            top: charPos.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative">
            {/* Balon Ucap Dinamis Karakter */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/95 border border-purple-400/80 text-purple-300 font-mono font-black text-[9px] px-2 py-0.5 rounded-full shadow-lg">
              {animStep === 0 && 'Menuju Gerbang 1...'}
              {animStep === 1 && `Uji Gerbang 1 (${v1Display})...`}
              {animStep === 2 && (!outerPass ? 'Gagal di Gerbang Luar! 🛑' : 'Lolos Gerbang Luar! Masuk... 🚪')}
              {animStep === 3 && `Uji Gerbang 2 (${v2})...`}
              {animStep >= 4 && (!innerPass ? 'Gagal di Gerbang Dalam! ⚠️' : 'Lolos Semua Gerbang! 🎉')}
            </div>
            <AnimatedTraveler walking={isWalking} direction={travelerDirection} />
          </div>
        </motion.div>

      </div>

      {/* ── Footer Kanvas: Penjelasan Inti Alur Nested IF ───────────────────── */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          <span>Alur: Gerbang dalam <strong>hanya diuji</strong> jika gerbang luar bernilai <strong>True</strong></span>
        </div>

        <div className={`px-2.5 py-0.5 rounded-full border text-[10px] font-black flex items-center gap-1 transition-all ${
          outcome === 'success'
            ? 'bg-emerald-950 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
            : outcome === 'inner-fail'
            ? 'bg-amber-950 border-amber-400 text-amber-300'
            : 'bg-rose-950 border-rose-400 text-rose-300'
        }`}>
          <span>{outcome === 'success' ? 'Sukses Penuh' : outcome === 'inner-fail' ? 'Gagal Inner' : 'Gagal Outer'}</span>
          {outcome === 'success' && <Check className="w-3 h-3 text-emerald-400" />}
        </div>
      </div>
    </div>
  );
}

// ── Komponen Utama: AnimatedNestedIfDefinition (3D Flip & Zoom Card) ───────────
export default function AnimatedNestedIfDefinition() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [scenarioId, setScenarioId] = useState('donor');
  const [v1, setV1] = useState(20);
  const [v2, setV2] = useState(52);
  const [replayKey, setReplayKey] = useState(0);

  const scenario = NESTED_SCENARIOS.find(s => s.id === scenarioId) || NESTED_SCENARIOS[0];

  const handleScenarioChange = (id: string) => {
    const sc = NESTED_SCENARIOS.find(s => s.id === id) || NESTED_SCENARIOS[0];
    setScenarioId(id);
    setV1(sc.var1Default);
    setV2(sc.var2Default);
    setReplayKey(k => k + 1);
  };

  const handleFlipToFront = () => {
    setIsFlipped(false);
  };

  const outerPass = scenario.outerCondFn(v1);
  const innerPass = scenario.innerCondFn(v2);

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
          /* 1. SISI DEPAN KARTU (DEFINISI AKADEMIK RESMI PERCABANGAN BERSARANG) */
          /* ═══════════════════════════════════════════════════════════════════ */
          <motion.div
            key="front"
            initial={{ rotateY: -75, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 75, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            onClick={() => setIsFlipped(true)}
            className="w-full cursor-pointer transition-all duration-300 origin-center p-5 md:p-6 bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-slate-900/10 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950 border-2 border-purple-400 dark:border-purple-500/70 rounded-3xl shadow-md space-y-4 hover:scale-[1.015] sm:hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(168,85,247,0.25)] hover:border-purple-500 hover:ring-2 hover:ring-purple-400/30 subpixel-antialiased select-none"
            style={{
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'subpixel-antialiased',
            }}
          >
            {/* Header Definisi */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-purple-800 dark:text-purple-300 font-extrabold text-xs uppercase tracking-wider font-mono">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Definisi Akademik Resmi: Percabangan Bersarang</span>
              </div>

              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-purple-100 hover:bg-purple-200 dark:bg-purple-950 dark:hover:bg-purple-900 text-purple-900 dark:text-purple-100 border border-purple-300 dark:border-purple-700 shadow-sm animate-pulse">
                <RotateCw className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Klik untuk Buka Animasi Interaktif</span>
              </div>
            </div>

            {/* Blockquote Teks Definisi Akademik Berbobot & Super Tajam */}
            <blockquote className="text-sm md:text-base text-slate-950 dark:text-slate-100 font-semibold leading-relaxed select-none bg-white dark:bg-slate-900 p-4 md:p-5 rounded-2xl border-2 border-purple-200 dark:border-purple-900/80 hover:border-purple-400 transition-colors shadow-xs space-y-2.5">
              <p>
                &ldquo;<strong className="text-purple-700 dark:text-purple-300 font-black text-base md:text-lg underline decoration-purple-500/40">Struktur Percabangan Bersarang</strong>{' '}
                (<em>Nested Selection Structure / Nested IF</em>) adalah konstruksi kontrol alur algoritma di mana suatu blok percabangan disematkan (<em>embedded</em>) di dalam cabang eksekusi percabangan lainnya, membentuk{' '}
                <strong className="text-sky-950 dark:text-sky-200 font-extrabold bg-sky-100 dark:bg-sky-950/90 px-2 py-0.5 rounded-md border border-sky-400 dark:border-sky-600 inline-block my-0.5 shadow-2xs">
                  hierarki keputusan bertingkat (pohon keputusan)
                </strong>.
              </p>
              <p>
                Jalur percabangan internal (bagian dalam){' '}
                <strong className="text-emerald-950 dark:text-emerald-200 font-extrabold bg-emerald-100 dark:bg-emerald-950/90 px-2 py-0.5 rounded-md border border-emerald-400 dark:border-emerald-600 inline-block my-0.5 shadow-2xs">
                  hanya akan dievaluasi dan dapat diakses apabila kondisi gerbang penyeleksi eksternal (outer gatekeeper) telah terpenuhi (True) terlebih dahulu
                </strong>,{' '}
                sehingga memungkinkan algoritma melakukan pengujian kriteria multi-tahap secara berjenjang sekaligus memberikan{' '}
                <strong className="text-purple-950 dark:text-purple-200 font-extrabold bg-purple-100 dark:bg-purple-950/90 px-2 py-0.5 rounded-md border border-purple-400 dark:border-purple-600 inline-block my-0.5 shadow-2xs">
                  umpan balik diagnostik spesifik pada setiap tahapan kegagalan
                </strong>.&rdquo;
              </p>
            </blockquote>

            {/* Petunjuk Interaksi Hover & Click */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-purple-700 dark:text-purple-300 pt-0.5">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                <span>Arahkan kursor (hover) untuk efek zoom • Klik kartu untuk membalik &amp; melihat simulasi gerbang bersarang</span>
              </div>
              <span className="font-mono text-[11px] bg-purple-100 dark:bg-purple-950 px-2 py-0.5 rounded border border-purple-300 dark:border-purple-800">
                3D Flip Card
              </span>
            </div>
          </motion.div>
        ) : (
          /* ═══════════════════════════════════════════════════════════════════ */
          /* 2. SISI BELAKANG KARTU (SIMULASI GERBANG BERSARANG DUA RUANGAN)       */
          /* ═══════════════════════════════════════════════════════════════════ */
          <motion.div
            key="back"
            initial={{ rotateY: 75, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -75, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="w-full p-4 md:p-6 bg-purple-50/50 dark:bg-slate-950 border-2 border-purple-400 dark:border-purple-600 rounded-3xl shadow-2xl space-y-4 subpixel-antialiased"
            style={{
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'subpixel-antialiased',
            }}
          >
          {/* Header Sisi Belakang: Selector Skenario + Tombol Balik */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-purple-200 dark:border-purple-800/80">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                Pilih Skenario Nested:
              </span>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {NESTED_SCENARIOS.map(sc => (
                  <button
                    key={sc.id}
                    onClick={() => handleScenarioChange(sc.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                      scenarioId === sc.id
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30 ring-2 ring-purple-400'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
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
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 transition-all cursor-pointer shrink-0"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Balik ke Definisi</span>
            </button>
          </div>

          {/* ── 2-Column Split Layout: Canvas di Kiri & Kontrol di Kanan ───────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            
            {/* KOLOM KIRI: Canvas Gerbang Berlapis */}
            <div className="lg:col-span-7 flex flex-col min-h-[460px]">
              <NestedGateScene
                key={`${scenario.id}-${replayKey}`}
                scenario={scenario}
                v1={v1}
                v2={v2}
                replayKey={replayKey}
              />
            </div>

            {/* KOLOM KANAN: Panel Kontrol Input & 3 Pilar Konsep Nested IF ──────── */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-3">
              
              {/* 1. Dual Slider Input & Tombol Presets */}
              <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-700 shadow-md space-y-3 text-white">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-slate-300">Kontrol Variabel Runtime:</span>
                  <button
                    onClick={() => setReplayKey(k => k + 1)}
                    className="flex items-center gap-1 text-[11px] font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-600 transition-all cursor-pointer shadow-xs"
                  >
                    <RefreshCcw className="w-3 h-3 text-purple-400" />
                    <span>Ulangi Alur</span>
                  </button>
                </div>

                {/* Slider 1 (Gerbang Luar) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-purple-300 font-bold">1. {scenario.var1Label}:</span>
                    <span className="font-black bg-purple-950 border border-purple-500/50 px-2 py-0.2 rounded text-purple-200">
                      {scenario.var1Name} = {scenario.id === 'beasiswa' ? (v1 / 10).toFixed(1) : v1}{scenario.var1Unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={scenario.var1Min}
                    max={scenario.var1Max}
                    value={v1}
                    onChange={e => {
                      setV1(Number(e.target.value));
                      setReplayKey(k => k + 1);
                    }}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>

                {/* Slider 2 (Gerbang Dalam) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-emerald-300 font-bold">2. {scenario.var2Label}:</span>
                    <span className="font-black bg-emerald-950 border border-emerald-500/50 px-2 py-0.2 rounded text-emerald-200">
                      {scenario.var2Name} = {v2}{scenario.var2Unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={scenario.var2Min}
                    max={scenario.var2Max}
                    value={v2}
                    onChange={e => {
                      setV2(Number(e.target.value));
                      setReplayKey(k => k + 1);
                    }}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Presets Uji Cepat */}
                <div className="space-y-1 pt-1 border-t border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block">Skenario Uji Diagnostik:</span>
                  <div className="flex flex-col gap-1">
                    {scenario.presets.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setV1(p.v1);
                          setV2(p.v2);
                          setReplayKey(k => k + 1);
                        }}
                        className={`text-left px-2 py-1 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center justify-between ${
                          v1 === p.v1 && v2 === p.v2
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                        }`}
                      >
                        <span>{p.label}</span>
                        <span className="text-[9px] opacity-80">{p.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. Banner Live Decision Outcome */}
              <div className={`p-3 rounded-xl border-2 font-mono text-xs font-bold shadow-xs space-y-1 ${
                outerPass && innerPass
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-950 dark:text-emerald-100'
                  : outerPass && !innerPass
                  ? 'bg-amber-50 dark:bg-amber-950/70 border-amber-500 text-amber-950 dark:text-amber-100'
                  : 'bg-rose-50 dark:bg-rose-950/70 border-rose-500 text-rose-950 dark:text-rose-100'
              }`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-extrabold text-xs">
                    STATUS DIAGNOSTIK ALGORITMA:
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                    outerPass && innerPass
                      ? 'bg-emerald-600 text-white'
                      : outerPass && !innerPass
                      ? 'bg-amber-600 text-white'
                      : 'bg-rose-600 text-white'
                  }`}>
                    {outerPass && innerPass ? 'LOLOS KEDUA GERBANG' : outerPass ? 'GAGAL DI INNER' : 'GAGAL DI OUTER'}
                  </span>
                </div>
                <div className="text-[11px]">
                  {outerPass && innerPass ? (
                    <span>Semua gerbang terpenuhi → Menjalankan: <code className="underline font-black">{scenario.successCode}</code></span>
                  ) : outerPass && !innerPass ? (
                    <span>Lolos gerbang 1, gagal gerbang 2 → Menjalankan: <code className="underline font-black">{scenario.innerFailCode}</code></span>
                  ) : (
                    <span>Tertahan di gerbang luar → Menjalankan: <code className="underline font-black">{scenario.outerFailCode}</code></span>
                  )}
                </div>
              </div>

              {/* 3. Tiga Pilar Penjelas Konsep Nested IF */}
              <div className="flex flex-col gap-2 flex-1 justify-between">
                {/* Pilar 1 */}
                <div className="p-2.5 rounded-xl border-2 border-sky-300 dark:border-sky-700/80 bg-sky-50/90 dark:bg-sky-950/50 space-y-0.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-black uppercase text-sky-900 dark:text-sky-300">
                    <span>①</span>
                    <span>Pola Gerbang Penjaga (Gatekeeper)</span>
                  </div>
                  <p className="text-[11px] text-sky-950 dark:text-sky-100 font-semibold leading-tight">
                    Kondisi luar menyaring input awal. Jika tidak lolos, blok dalam <strong>sama sekali tidak dievaluasi</strong> (*zero execution waste*).
                  </p>
                </div>

                {/* Pilar 2 */}
                <div className="p-2.5 rounded-xl border-2 border-purple-300 dark:border-purple-700/80 bg-purple-50/90 dark:bg-purple-950/50 space-y-0.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-black uppercase text-purple-900 dark:text-purple-300">
                    <span>②</span>
                    <span>Hierarki Ketergantungan Logis</span>
                  </div>
                  <p className="text-[11px] text-purple-950 dark:text-purple-100 font-semibold leading-tight">
                    Pemeriksaan kedua hanya relevan dan masuk akal secara komputasi jika syarat pertama telah berstatus <strong>True</strong>.
                  </p>
                </div>

                {/* Pilar 3 */}
                <div className="p-2.5 rounded-xl border-2 border-amber-300 dark:border-amber-700/80 bg-amber-50/90 dark:bg-amber-950/50 space-y-0.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-black uppercase text-amber-900 dark:text-amber-300">
                    <span>③</span>
                    <span>Umpan Balik Diagnostik Granular</span>
                  </div>
                  <p className="text-[11px] text-amber-950 dark:text-amber-100 font-semibold leading-tight">
                    Keunggulan dibanding operator AND: program dapat memberitahu <strong>secara persis pada gerbang mana</strong> pengguna tidak memenuhi syarat.
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
