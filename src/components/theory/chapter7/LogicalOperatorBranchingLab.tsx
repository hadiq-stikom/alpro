"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause,
  RotateCcw, 
  StepForward,
  FileText, 
  GitBranch, 
  Code2, 
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Maximize2,
  Minimize2,
  Tv,
  ArrowRight,
  ArrowDown,
  Scale,
  Check,
  X,
  Zap,
  Info
} from 'lucide-react';

// ── Skenario & Studi Kasus Operator Logika ─────────────────────────────────────
interface LogicScenario {
  id: 'donor_duel' | 'tiket_or' | 'rentang_and';
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
}

const SCENARIOS: LogicScenario[] = [
  {
    id: 'donor_duel',
    title: 'Donor Darah: Duel Operator AND vs Nested IF (Krisis Diagnostik)',
    badge: 'AND vs Nested IF',
    badgeColor: 'from-amber-500 to-orange-600',
    description: 'Bandingkan secara langsung mengapa operator AND kurang tepat saat sistem memerlukan umpan balik spesifik per syarat kegagalan.',
  },
  {
    id: 'tiket_or',
    title: 'Tiket Wahana: Duel Operator OR vs IF Majemuk (Prinsip DRY & Short-Circuit)',
    badge: 'OR vs IF Majemuk',
    badgeColor: 'from-sky-500 to-blue-600',
    description: 'Pahami mengapa operator OR jauh lebih unggul daripada IF Majemuk berulang untuk kriteria alternatif yang bermuara pada aksi identik.',
  },
  {
    id: 'rentang_and',
    title: 'Validasi Rentang Nilai: Domain Matematika Tertutup',
    badge: 'Operator AND (Rentang)',
    badgeColor: 'from-emerald-500 to-teal-600',
    description: 'Use case paling tepat untuk operator AND: membatasi domain variabel numerik atomik dalam rentang tertutup.',
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// 1. FLOWCHART VERTIKAL (ANSI/ISO 5807) UNTUK SKENARIO OPERATOR LOGIKA
// ══════════════════════════════════════════════════════════════════════════════
function LogicVerticalFlowchart({
  scenarioId,
  v1,
  v2,
  v3,
  step,
}: {
  scenarioId: 'donor_duel' | 'tiket_or' | 'rentang_and';
  v1: number;
  v2: number;
  v3: boolean;
  step: number;
}) {
  const isStepActive = (s: number) => (step === 0 ? true : step >= s);

  // Perhitungan Kondisi Berdasarkan Skenario
  let isPass = false;
  let inputLabel = '';
  let condExpr = '';
  let trueOutput = '';
  let falseOutput = '';

  if (scenarioId === 'donor_duel') {
    const c1 = v1 >= 17;
    const c2 = v2 >= 45;
    isPass = c1 && c2;
    inputLabel = `input(usia, berat) [${v1} thn, ${v2} kg]`;
    condExpr = 'usia >= 17 and berat >= 45?';
    trueOutput = '"Kualifikasi Donor Terpenuhi"';
    falseOutput = '"Pendaftaran Donor Ditolak"';
  } else if (scenarioId === 'tiket_or') {
    const c1 = v1 < 5;
    const c2 = v1 >= 60;
    const c3 = v3;
    isPass = c1 || c2 || c3;
    inputLabel = `input(usia, isVIP) [${v1} thn, VIP:${v3 ? 'Ya' : 'Tdk'}]`;
    condExpr = 'usia < 5 or usia >= 60 or isVIP?';
    trueOutput = '"Tiket Gratis (Akses Bebas)"';
    falseOutput = '"Tarif Reguler: Rp50.000"';
  } else {
    isPass = v1 >= 0 && v1 <= 100;
    inputLabel = `input(nilai) [nilai = ${v1}]`;
    condExpr = 'nilai >= 0 and nilai <= 100?';
    trueOutput = '"Nilai Valid (Dalam Rentang)"';
    falseOutput = '"Error: Nilai di Luar Batas (0-100)"';
  }

  const cx = 230;
  const cyDiamond = 210;

  return (
    <svg
      viewBox="0 0 760 520"
      className="w-full h-auto select-none max-w-[700px] mx-auto"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <marker id="lv-arr-gray" markerWidth="11" markerHeight="11" refX="9.5" refY="5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 9.5 5 L 1 8.5 Z" fill="#94a3b8" />
        </marker>
        <marker id="lv-arr-green" markerWidth="12" markerHeight="12" refX="10.5" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 10.5 5.5 L 1 9.5 Z" fill="#10b981" stroke="#34d399" strokeWidth="0.5" />
        </marker>
        <marker id="lv-arr-rose" markerWidth="12" markerHeight="12" refX="10.5" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 10.5 5.5 L 1 9.5 Z" fill="#f43f5e" stroke="#fb7185" strokeWidth="0.5" />
        </marker>
        <filter id="lv-glow-diamond" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="lv-glow-active" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. START TERMINAL (MULAI) */}
      <g opacity={isStepActive(1) ? 1 : 0.2}>
        <rect x={cx - 70} y="16" width="140" height="42" rx="21" fill="rgba(16,185,129,0.18)" stroke="#10b981" strokeWidth="2.5" />
        <text x={cx} y="42" textAnchor="middle" fontSize="14" fontWeight="900" fill="#6ee7b7" fontFamily="monospace">
          MULAI
        </text>
      </g>
      <line x1={cx} y1="58" x2={cx} y2="88" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#lv-arr-gray)" opacity={isStepActive(1) ? 1 : 0.2} />

      {/* 2. INPUT JAJARAN GENJANG */}
      <g opacity={isStepActive(2) ? 1 : 0.2}>
        <polygon points={`${cx - 110},88 ${cx + 110},88 ${cx + 80},134 ${cx - 140},134`} fill="rgba(168,85,247,0.25)" stroke="#a855f7" strokeWidth="2.5" />
        <text x={cx - 15} y="104" dominantBaseline="central" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#e9d5ff" fontFamily="monospace">
          {inputLabel.split('[')[0]}
        </text>
        <text x={cx - 15} y="120" dominantBaseline="central" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fbcfe8" fontFamily="monospace">
          [{inputLabel.split('[')[1] || ''}
        </text>
      </g>
      <line x1={cx} y1="134" x2={cx} y2="168" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#lv-arr-gray)" opacity={isStepActive(2) ? 1 : 0.2} />

      {/* 3. BELAH KETUPAT KEPUTUSAN EKSPRESI LOGIKA */}
      <g opacity={isStepActive(3) ? 1 : 0.2}>
        <polygon
          points={`${cx},${cyDiamond - 42} ${cx + 140},${cyDiamond} ${cx},${cyDiamond + 42} ${cx - 140},${cyDiamond}`}
          fill="#451a03"
          stroke={isPass ? '#fbbf24' : '#f59e0b'}
          strokeWidth="3.5"
          filter="url(#lv-glow-diamond)"
        />
        <text
          x={cx}
          y={cyDiamond - 8}
          textAnchor="middle"
          fill="#fde68a"
          fontSize="13"
          fontWeight="900"
          fontFamily="monospace"
        >
          {condExpr}
        </text>

        {/* Dynamic Evaluation Badge */}
        <g transform={`translate(${cx}, ${cyDiamond + 15})`}>
          <rect
            x="-60"
            y="-9"
            width="120"
            height="20"
            rx="10"
            fill={isPass ? '#10b981' : '#881337'}
            stroke={isPass ? '#34d399' : '#f43f5e'}
            strokeWidth="1.5"
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="10"
            fontWeight="bold"
            fontFamily="monospace"
          >
            {isPass ? '✓ HASIL: TRUE (Ya)' : '✗ HASIL: FALSE (Tidak)'}
          </text>
        </g>
      </g>

      {/* ─── CABANG YA: KE SAMPING KANAN MENUJU AKSI TRUE ─── */}
      <g opacity={isStepActive(4) ? (isPass ? 1 : 0.3) : 0.2}>
        <line
          x1={cx + 140}
          y1={cyDiamond}
          x2={435}
          y2={cyDiamond}
          stroke={isPass ? '#10b981' : '#334155'}
          strokeWidth={isPass ? 3.5 : 2}
          markerEnd={isPass ? 'url(#lv-arr-green)' : 'url(#lv-arr-gray)'}
        />
        {/* Badge 'Ya' */}
        <rect
          x="385"
          y={cyDiamond - 19}
          width="36"
          height="18"
          rx="4"
          fill={isPass ? '#065f46' : '#1e293b'}
          stroke={isPass ? '#10b981' : '#334155'}
        />
        <text
          x="403"
          y={cyDiamond - 6}
          textAnchor="middle"
          fill={isPass ? '#6ee7b7' : '#94a3b8'}
          fontSize="11"
          fontWeight="bold"
          fontFamily="monospace"
        >
          Ya
        </text>

        {/* Jajaran Genjang Aksi TRUE */}
        <polygon
          points={`455,${cyDiamond - 25} 700,${cyDiamond - 25} 670,${cyDiamond + 25} 425,${cyDiamond + 25}`}
          fill={isPass ? '#064e3b' : '#0f172a'}
          stroke={isPass ? '#10b981' : '#1e293b'}
          strokeWidth={isPass ? 3 : 1.5}
          filter={isPass ? 'url(#lv-glow-active)' : undefined}
        />
        <text
          x="562"
          y={cyDiamond}
          dominantBaseline="central"
          textAnchor="middle"
          fill={isPass ? '#a7f3d0' : '#475569'}
          fontSize="12"
          fontWeight="bold"
          fontFamily="monospace"
        >
          output({trueOutput})
        </text>

        {/* Panah dari TRUE ke Rel Bus Kanan (x = 730) */}
        <line
          x1="670"
          y1={cyDiamond}
          x2="730"
          y2={cyDiamond}
          stroke={isPass ? '#10b981' : '#334155'}
          strokeWidth={isPass ? 3.5 : 1.5}
          strokeDasharray={isPass ? undefined : '3 3'}
        />
        {/* Rel Bus Vertikal Kanan */}
        <line
          x1="730"
          y1={cyDiamond}
          x2="730"
          y2="425"
          stroke={isPass ? '#10b981' : '#334155'}
          strokeWidth={isPass ? 3.5 : 1.5}
          strokeDasharray={isPass ? undefined : '3 3'}
        />
        {/* Bus Masuk ke Titik Temu Merge Node (x = 230, y = 425) */}
        <line
          x1="730"
          y1="425"
          x2={cx + 5}
          y2="425"
          stroke={isPass ? '#10b981' : '#334155'}
          strokeWidth={isPass ? 3.5 : 1.5}
          strokeDasharray={isPass ? undefined : '3 3'}
          markerEnd={isPass ? 'url(#lv-arr-green)' : 'url(#lv-arr-gray)'}
        />
      </g>

      {/* ─── CABANG TIDAK: KE BAWAH MENUJU AKSI FALSE ─── */}
      <g opacity={isStepActive(4) ? (!isPass ? 1 : 0.3) : 0.2}>
        <line
          x1={cx}
          y1={cyDiamond + 42}
          x2={cx}
          y2={325}
          stroke={!isPass ? '#f43f5e' : '#334155'}
          strokeWidth={!isPass ? 3.5 : 2}
          markerEnd={!isPass ? 'url(#lv-arr-rose)' : 'url(#lv-arr-gray)'}
        />
        {/* Badge 'Tidak' */}
        <rect
          x={cx + 8}
          y={cyDiamond + 50}
          width="46"
          height="17"
          rx="4"
          fill={!isPass ? '#881337' : '#1e293b'}
          stroke={!isPass ? '#f43f5e' : '#334155'}
        />
        <text
          x={cx + 31}
          y={cyDiamond + 62}
          textAnchor="middle"
          fill={!isPass ? '#fecdd3' : '#64748b'}
          fontSize="10"
          fontWeight="bold"
          fontFamily="monospace"
        >
          Tidak
        </text>

        {/* Jajaran Genjang Aksi FALSE (Cabang Else) */}
        <polygon
          points={`${cx - 130},325 ${cx + 130},325 ${cx + 105},375 ${cx - 155},375`}
          fill={!isPass ? '#881337' : '#0f172a'}
          stroke={!isPass ? '#f43f5e' : '#1e293b'}
          strokeWidth={!isPass ? 3 : 1.5}
        />
        <text
          x={cx - 12}
          y="350"
          dominantBaseline="central"
          textAnchor="middle"
          fill={!isPass ? '#fecdd3' : '#475569'}
          fontSize="11"
          fontWeight="bold"
          fontFamily="monospace"
        >
          output({falseOutput})
        </text>

        {/* Panah Turun Langsung dari FALSE ke Merge Node */}
        <line
          x1={cx}
          y1="375"
          x2={cx}
          y2={420}
          stroke={!isPass ? '#f43f5e' : '#64748b'}
          strokeWidth={!isPass ? 3.5 : 2}
          markerEnd={!isPass ? 'url(#lv-arr-rose)' : 'url(#lv-arr-gray)'}
        />
      </g>

      {/* ─── 4. MERGE NODE & SELESAI ─── */}
      <g opacity={step === 0 || step >= 5 ? 1 : 0.2}>
        <circle
          cx={cx}
          cy="425"
          r="5"
          fill={isPass ? '#10b981' : '#f43f5e'}
        />
        <line
          x1={cx}
          y1="430"
          x2={cx}
          y2="460"
          stroke={isPass ? '#10b981' : '#f43f5e'}
          strokeWidth={3.5}
          markerEnd={isPass ? 'url(#lv-arr-green)' : 'url(#lv-arr-rose)'}
        />

        {/* Terminal SELESAI */}
        <rect
          x={cx - 70}
          y="460"
          width="140"
          height="42"
          rx="21"
          fill="rgba(239,68,68,0.18)"
          stroke="#f87171"
          strokeWidth="2.5"
        />
        <text
          x={cx}
          y="481"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize="14"
          fontWeight="900"
          fill="#fecdd3"
          fontFamily="monospace"
        >
          SELESAI
        </text>
      </g>
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 2. KOMPONEN UTAMA: LOGICALOPERATORBRANCHINGLAB
// ══════════════════════════════════════════════════════════════════════════════
export default function LogicalOperatorBranchingLab() {
  const [selectedScenario, setSelectedScenario] = useState<'donor_duel' | 'tiket_or' | 'rentang_and'>('donor_duel');
  const [usia, setUsia] = useState<number>(16);
  const [berat, setBerat] = useState<number>(50);
  const [isVIP, setIsVIP] = useState<boolean>(false);
  const [nilai, setNilai] = useState<number>(85);

  const [activeTab, setActiveTab] = useState<'duel' | 'naratif' | 'flowchart' | 'pseudocode' | 'kode'>('duel');
  const [step, setStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeLang, setActiveLang] = useState<'python' | 'js'>('python');

  const maxSteps = 5;
  const animRunIdRef = useRef<number>(0);

  const runAnimation = async () => {
    if (isRunning) {
      animRunIdRef.current++;
      setIsRunning(false);
      return;
    }
    const runId = ++animRunIdRef.current;
    setIsRunning(true);
    const startFrom = (step === 0 || step >= maxSteps) ? 1 : step;
    for (let i = startFrom; i <= maxSteps; i++) {
      setStep(i);
      await new Promise(r => setTimeout(r, 650));
      if (animRunIdRef.current !== runId) return;
    }
    setIsRunning(false);
  };

  const nextStep = () => {
    animRunIdRef.current++;
    setIsRunning(false);
    if (step === 0 || step >= maxSteps) {
      setStep(1);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const reset = () => {
    animRunIdRef.current++;
    setIsRunning(false);
    setStep(0);
  };

  // Evaluasi Logika Runtime
  const isUsiaPass = usia >= 17;
  const isBeratPass = berat >= 45;
  const isDonorPass = isUsiaPass && isBeratPass;

  const isTiketBalita = usia < 5;
  const isTiketLansia = usia >= 60;
  const isTiketGratis = isTiketBalita || isTiketLansia || isVIP;

  const isNilaiValid = nilai >= 0 && nilai <= 100;

  // Narasi Baku per Skenario
  const getNarrative = () => {
    if (selectedScenario === 'donor_duel') {
      return `// Skenario A: Operator Logika AND (Pesan Umum)
1. Masukkan usia dan berat badan calon pendonor.
2. Jika usia >= 17 dan berat >= 45 maka:
      Tampilkan "Kualifikasi Donor Terpenuhi" ke layar.
   Selain itu:
      Tampilkan "Pendaftaran Donor Ditolak" ke layar.
Selesai.

--------------------------------------------------
// Skenario B: Percabangan Bersarang (Pesan Diagnostik Spesifik)
1. Masukkan usia dan berat badan calon pendonor.
2. Jika usia >= 17 maka:
      Jika berat >= 45 maka:
         Tampilkan "Kualifikasi Donor Terpenuhi" ke layar.
      Selain itu:
         Tampilkan "Gagal: Berat badan minimal 45 kg" ke layar.
   Selain itu:
      Tampilkan "Gagal: Usia minimal 17 tahun" ke layar.
Selesai.`;
    }
    if (selectedScenario === 'tiket_or') {
      return `// Skenario A: Percabangan Majemuk IF-ELIF (Kurang Tepat - Melanggar Prinsip DRY)
1. Masukkan usia pengunjung dan status keanggotaan VIP.
2. Jika usia < 5 maka:
      Tampilkan "Tiket Bebas Biaya (Rp 0)" ke layar.
   Selain itu, jika usia >= 60 maka:
      Tampilkan "Tiket Bebas Biaya (Rp 0)" ke layar.
   Selain itu, jika isVIP == true maka:
      Tampilkan "Tiket Bebas Biaya (Rp 0)" ke layar.
   Selain itu:
      Tampilkan "Tarif Reguler: Rp 50.000" ke layar.
Selesai.

--------------------------------------------------
// Skenario B: Operator Logika OR (Sangat Tepat - Clean Code & Short-Circuit)
1. Masukkan usia pengunjung dan status keanggotaan VIP.
2. Jika usia < 5 atau usia >= 60 atau isVIP == true maka:
      Tampilkan "Tiket Bebas Biaya (Rp 0)" ke layar.
   Selain itu:
      Tampilkan "Tarif Reguler: Rp 50.000" ke layar.
Selesai.`;
    }
    return `1. Masukkan nilai ujian mahasiswa.
2. Jika nilai >= 0 dan nilai <= 100 maka:
      Tampilkan "Nilai Valid (Dalam Rentang)" ke layar.
   Selain itu:
      Tampilkan "Error: Nilai di Luar Batas (0-100)" ke layar.
Selesai.`;
  };

  // Pseudocode Baku CLRS
  const getPseudocode = () => {
    if (selectedScenario === 'donor_duel') {
      return `PROGRAM ValidasiDonorDarah
// Membandingkan Operator AND vs Nested IF dalam memberikan umpan balik

KAMUS:
  usia, berat : integer

ALGORITMA:
  input(usia, berat)

  // Pendekatan 1: Operator Logika AND (Kurang Informatif)
  if usia >= 17 and berat >= 45 then
    output("Kualifikasi Donor Terpenuhi")
  else
    output("Pendaftaran Donor Ditolak")
  endif

  // Pendekatan 2: Nested IF (Diagnostik Granular & Tepat)
  if usia >= 17 then
    if berat >= 45 then
      output("Kualifikasi Donor Terpenuhi")
    else
      output("Gagal: Berat badan belum mencapai 45 kg")
    endif
  else
    output("Gagal: Usia belum mencapai 17 tahun")
  endif`;
    }
    if (selectedScenario === 'tiket_or') {
      return `PROGRAM TarifTiketWisataKomparasi
// Membandingkan IF Majemuk vs Operator Disjungsi (OR)

KAMUS:
  usia : integer
  isVIP : boolean

ALGORITMA:
  input(usia, isVIP)

  // Pendekatan 1: IF Majemuk (Anti-Pattern: Duplikasi Aksi Identik)
  if usia < 5 then
    output("Tiket Bebas Biaya (Rp 0)")
  else if usia >= 60 then
    output("Tiket Bebas Biaya (Rp 0)")
  else if isVIP == true then
    output("Tiket Bebas Biaya (Rp 0)")
  else
    output("Tarif Reguler: Rp 50.000")
  endif

  // Pendekatan 2: Operator Logika OR (Best Practice: Single Point of Truth)
  if usia < 5 or usia >= 60 or isVIP == true then
    output("Tiket Bebas Biaya (Rp 0)")
  else
    output("Tarif Reguler: Rp 50.000")
  endif`;
    }
    return `PROGRAM ValidasiRentangNilai
// Memeriksa domain batas angka matematis tertutup menggunakan operator konjungsi (AND)

KAMUS:
  nilai : integer

ALGORITMA:
  input(nilai)
  if nilai >= 0 and nilai <= 100 then
    output("Nilai Valid (Dalam Rentang)")
  else
    output("Error: Nilai di Luar Batas (0-100)")
  endif`;
  };

  // Kode Program Python & JS
  const getCode = () => {
    if (activeLang === 'python') {
      if (selectedScenario === 'donor_duel') {
        return `# Python — Komparasi Operator AND vs Nested IF
usia = ${usia}
berat = ${berat}

# 1. Pendekatan Operator AND (Blanket Error)
if usia >= 17 and berat >= 45:
    print("✓ Kualifikasi Donor Terpenuhi")
else:
    print("✗ Pendaftaran Ditolak (Pengguna tidak tahu letak kesalahannya)")

# 2. Pendekatan Nested IF (Granular Diagnosis)
if usia >= 17:
    if berat >= 45:
        print("✓ Kualifikasi Donor Terpenuhi")
    else:
        print("✗ Ditolak pada Gerbang 2: Berat badan minimal 45 kg!")
else:
    print("✗ Ditolak pada Gerbang 1: Usia minimal 17 tahun!")`;
      }
      if (selectedScenario === 'tiket_or') {
        return `# Python — Komparasi IF Majemuk vs Operator Logika OR
usia = ${usia}
is_vip = ${isVIP ? 'True' : 'False'}

# 1. Pendekatan IF Majemuk (Kurang Tepat: Duplikasi Aksi Berulang / Melanggar DRY)
if usia < 5:
    print("Tiket Bebas Biaya (Rp 0)")
elif usia >= 60:
    print("Tiket Bebas Biaya (Rp 0)")
elif is_vip:
    print("Tiket Bebas Biaya (Rp 0)")
else:
    print("Tarif Reguler: Rp 50.000")

# 2. Pendekatan Operator OR (Sangat Tepat: Bersih, DRY & Short-Circuit)
if usia < 5 or usia >= 60 or is_vip:
    print("✓ Tiket Bebas Biaya (Rp 0)")
else:
    print("Tarif Reguler: Rp 50.000")`;
      }
      return `# Python — Validasi Rentang Tertutup Atomik
nilai = ${nilai}

if nilai >= 0 and nilai <= 100:
    print("✓ Nilai Valid (0 s.d 100)")
else:
    print("✗ Error: Nilai berada di luar rentang!")`;
    } else {
      if (selectedScenario === 'donor_duel') {
        return `// JavaScript — Komparasi Operator AND vs Nested IF
const usia = ${usia};
const berat = ${berat};

// 1. Pendekatan Operator AND
if (usia >= 17 && berat >= 45) {
    console.log("✓ Kualifikasi Donor Terpenuhi");
} else {
    console.log("✗ Pendaftaran Ditolak");
}

// 2. Pendekatan Nested IF
if (usia >= 17) {
    if (berat >= 45) {
        console.log("✓ Kualifikasi Donor Terpenuhi");
    } else {
        console.log("✗ Gagal: Berat badan minimal 45 kg!");
    }
} else {
    console.log("✗ Gagal: Usia minimal 17 tahun!");
}`;
      }
      if (selectedScenario === 'tiket_or') {
        return `// JavaScript — Komparasi IF Majemuk vs Operator Logika OR
const usia = ${usia};
const isVIP = ${isVIP ? 'true' : 'false'};

// 1. Pendekatan IF Majemuk (Kurang Tepat: Duplikasi Aksi Berulang)
if (usia < 5) {
    console.log("Tiket Bebas Biaya (Rp 0)");
} else if (usia >= 60) {
    console.log("Tiket Bebas Biaya (Rp 0)");
} else if (isVIP) {
    console.log("Tiket Bebas Biaya (Rp 0)");
} else {
    console.log("Tarif Reguler: Rp 50.000");
}

// 2. Pendekatan Operator Logika OR (Sangat Tepat: DRY & Short-Circuit)
if (usia < 5 || usia >= 60 || isVIP) {
    console.log("✓ Tiket Bebas Biaya (Rp 0)");
} else {
    console.log("Tarif Reguler: Rp 50.000");
}`;
      }
      return `// JavaScript — Validasi Rentang Tertutup
const nilai = ${nilai};

if (nilai >= 0 && nilai <= 100) {
    console.log("✓ Nilai Valid (0 s.d 100)");
} else {
    console.log("✗ Error: Nilai berada di luar rentang!");
}`;
    }
  };

  const tabs = [
    { id: 'duel', icon: <Scale className="w-3.5 h-3.5" />, label: 'Duel Komparasi' },
    { id: 'flowchart', icon: <GitBranch className="w-3.5 h-3.5" />, label: 'Flowchart' },
    { id: 'naratif', icon: <FileText className="w-3.5 h-3.5" />, label: 'Naratif' },
    { id: 'pseudocode', icon: <Sparkles className="w-3.5 h-3.5" />, label: 'Pseudocode' },
    { id: 'kode', icon: <Code2 className="w-3.5 h-3.5" />, label: 'Kode Program' },
  ] as const;

  return (
    <div className="border border-border/60 rounded-3xl overflow-hidden bg-slate-950 shadow-2xl space-y-0 text-slate-100 subpixel-antialiased">
      {/* ─── Header Lab ─────────────────────────────────────────────────────── */}
      <div className="p-4 md:px-6 bg-slate-900/95 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/30 font-black text-sm">
            &amp;|
          </div>
          <div>
            <h3 className="font-bold text-sm md:text-base text-slate-100 flex items-center gap-2">
              <span>Laboratorium Operator Logika &amp; Komparasi Kritis Use Case</span>
            </h3>
            <p className="text-xs text-slate-400">
              Mengevaluasi kapan operator logika tepat digunakan vs kapan harus beralih ke Nested IF.
            </p>
          </div>
        </div>

        {/* 5 Tab Pilihan Representasi */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── Bar Pemilihan Skenario ─────────────────────────────────────────── */}
      <div className="px-4 md:px-6 py-3 bg-slate-900/50 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-400">Pilih Studi Kasus:</span>
          <div className="flex flex-wrap gap-1.5">
            {SCENARIOS.map(sc => (
              <button
                key={sc.id}
                onClick={() => {
                  setSelectedScenario(sc.id);
                  setStep(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedScenario === sc.id
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md ring-2 ring-orange-400/50'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'
                }`}
              >
                {sc.badge}
              </button>
            ))}
          </div>
        </div>

        {/* Tombol Kontrol Animasi */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={runAnimation}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              isRunning ? 'bg-amber-600 text-white animate-pulse' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'Jeda' : 'Otomatis'}</span>
          </button>
          <button
            onClick={nextStep}
            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer flex items-center gap-1 border border-slate-700"
          >
            <StepForward className="w-3.5 h-3.5 text-orange-400" />
            <span>Langkah ({step}/{maxSteps})</span>
          </button>
          <button
            onClick={reset}
            className="p-1 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer border border-slate-700"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ─── Konten Utama Lab Berdasarkan Tab ───────────────────────────────── */}
      <div className="p-4 md:p-6 space-y-6">

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* TAB 1: DUEL KOMPARASI (SIDE-BY-SIDE INTERACTIVE DUEL)                 */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'duel' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            
            {/* Dock Kontrol Input Real-Time */}
            <div className="p-4 md:p-5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-md space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4" /> Variabel Input Real-Time
                </span>
                <span className="text-xs text-slate-400">
                  Geser input di bawah untuk mengamati perbedaan respons sistem:
                </span>
              </div>

              {selectedScenario === 'donor_duel' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Slider Usia */}
                    <div className="space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-300">1. Usia Calon Pendonor:</span>
                        <span className={`font-mono font-black px-2 py-0.5 rounded ${isUsiaPass ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-rose-950 text-rose-300 border border-rose-600'}`}>
                          {usia} tahun ({isUsiaPass ? '✓ Lolos ≥17' : '✗ Belum 17'})
                        </span>
                      </div>
                      <input
                        type="range"
                        min="12"
                        max="45"
                        value={usia}
                        onChange={e => setUsia(Number(e.target.value))}
                        className="w-full accent-orange-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>12 thn</span>
                        <span className="text-amber-400 font-bold">Syarat: ≥ 17 thn</span>
                        <span>45 thn</span>
                      </div>
                    </div>

                    {/* Slider Berat Badan */}
                    <div className="space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-300">2. Berat Badan:</span>
                        <span className={`font-mono font-black px-2 py-0.5 rounded ${isBeratPass ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-rose-950 text-rose-300 border border-rose-600'}`}>
                          {berat} kg ({isBeratPass ? '✓ Lolos ≥45' : '✗ Kurang <45'})
                        </span>
                      </div>
                      <input
                        type="range"
                        min="35"
                        max="85"
                        value={berat}
                        onChange={e => setBerat(Number(e.target.value))}
                        className="w-full accent-orange-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>35 kg</span>
                        <span className="text-amber-400 font-bold">Syarat: ≥ 45 kg</span>
                        <span>85 kg</span>
                      </div>
                    </div>
                  </div>

                  {/* Preset Uji Cepat Donor */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-800/80">
                    <span className="text-[11px] font-mono text-slate-400 font-bold">Preset Uji:</span>
                    <button
                      onClick={() => { setUsia(15); setBerat(50); }}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30 cursor-pointer"
                    >
                      🛑 Umur 15 (Gagal Usia)
                    </button>
                    <button
                      onClick={() => { setUsia(22); setBerat(40); }}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 cursor-pointer"
                    >
                      ⚠️ BB 40 kg (Gagal Berat)
                    </button>
                    <button
                      onClick={() => { setUsia(24); setBerat(55); }}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 cursor-pointer"
                    >
                      ✓ Lolos Kualifikasi (Umur 24, BB 55)
                    </button>
                  </div>
                </div>
              )}

              {selectedScenario === 'tiket_or' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-300">Usia Pengunjung:</span>
                        <span className="font-mono font-black px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-600">
                          {usia} tahun
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="75"
                        value={usia}
                        onChange={e => setUsia(Number(e.target.value))}
                        className="w-full accent-sky-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>1 thn (Balita &lt;5)</span>
                        <span className="text-amber-400">Reguler: 5-59 thn</span>
                        <span>75 thn (Lansia ≥60)</span>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="block text-xs font-bold text-slate-200">Kartu Member VIP:</span>
                        <span className="text-[11px] text-slate-400">Akses bebas tanpa memandang usia</span>
                      </div>
                      <button
                        onClick={() => setIsVIP(!isVIP)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isVIP ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 font-black' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isVIP ? '✓ STATUS: VIP AKTIF' : '✗ BUKAN VIP'}
                      </button>
                    </div>
                  </div>

                  {/* Preset Uji Cepat Tiket OR */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-800/80">
                    <span className="text-[11px] font-mono text-slate-400 font-bold">Preset Uji:</span>
                    <button
                      onClick={() => { setUsia(3); setIsVIP(false); }}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/30 cursor-pointer"
                    >
                      👶 Balita (3 thn)
                    </button>
                    <button
                      onClick={() => { setUsia(65); setIsVIP(false); }}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 cursor-pointer"
                    >
                      👴 Lansia (65 thn)
                    </button>
                    <button
                      onClick={() => { setUsia(28); setIsVIP(true); }}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 cursor-pointer"
                    >
                      ⭐ Member VIP (28 thn)
                    </button>
                    <button
                      onClick={() => { setUsia(28); setIsVIP(false); }}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                    >
                      🎟️ Reguler (28 thn)
                    </button>
                  </div>
                </div>
              )}

              {selectedScenario === 'rentang_and' && (
                <div className="space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800 max-w-xl mx-auto">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-300">Input Nilai Ujian:</span>
                    <span className={`font-mono font-black px-2.5 py-0.5 rounded ${isNilaiValid ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-rose-950 text-rose-300 border border-rose-600'}`}>
                      {nilai} ({isNilaiValid ? '✓ Dalam Rentang 0-100' : '✗ DI LUAR DOMAIN!'})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="125"
                    value={nilai}
                    onChange={e => setNilai(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span className="text-rose-400">-20 (Invalid)</span>
                    <span className="text-emerald-400 font-bold">Domain Valid: 0 s.d 100</span>
                    <span className="text-rose-400">+125 (Invalid)</span>
                  </div>
                </div>
              )}
            </div>

            {/* DUEL PANEL KOMPARASI SIDE-BY-SIDE */}
            {selectedScenario === 'donor_duel' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
                
                {/* PANEL KIRI: PENDEKATAN OPERATOR AND (KURANG TEPAT) */}
                <div className="p-4 md:p-5 rounded-2xl border-2 border-rose-500/40 bg-rose-950/20 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/50">
                        Pendekatan A: Operator Logika AND
                      </span>
                      <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Kurang Tepat (Anti-Pattern)</span>
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1">
                      <span className="text-slate-400">// Pengecekan satu baris:</span>
                      <div className="text-slate-100">
                        <span className="text-purple-400">if</span>{' '}
                        <span className={isUsiaPass ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                          usia &gt;= 17 ({isUsiaPass ? 'True' : 'False'})
                        </span>{' '}
                        <span className="text-amber-400 font-black">and</span>{' '}
                        <span className={isBeratPass ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                          berat &gt;= 45 ({isBeratPass ? 'True' : 'False'})
                        </span>:
                      </div>
                      <div className="pl-4 text-emerald-400">
                        output(&quot;Kualifikasi Donor Terpenuhi&quot;)
                      </div>
                      <div className="text-purple-400">else:</div>
                      <div className="pl-4 text-rose-400">
                        output(&quot;Pendaftaran Donor Ditolak&quot;)
                      </div>
                    </div>

                    {/* Output Layar User */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-[11px] font-mono text-slate-400 block">Pesan yang Dilihat Pengguna:</span>
                      <div className={`p-2 rounded-lg font-mono text-xs font-bold ${
                        isDonorPass ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-rose-950 text-rose-300 border border-rose-600'
                      }`}>
                        {isDonorPass ? '✓ Kualifikasi Donor Terpenuhi' : '✗ Pendaftaran Donor Ditolak'}
                      </div>
                    </div>
                  </div>

                  {/* Ulasan Kelemahan Kritis */}
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200 space-y-1">
                    <strong className="block text-rose-300 font-black flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-400" />
                      Kelemahan: Kebutaan Diagnostik (Diagnostic Blindspot)
                    </strong>
                    <p className="leading-relaxed text-[11.5px] text-rose-200/90">
                      Jika kondisi bernilai <strong>False</strong>, sistem mengeluarkan vonis penolakan umum. Pengguna <strong>tidak diberitahu secara pasti</strong> apakah kegagalannya akibat umur yang kurang atau berat badan yang belum cukup.
                    </p>
                  </div>
                </div>

                {/* PANEL KANAN: PENDEKATAN NESTED IF (TEPAT & INFORMATIF) */}
                <div className="p-4 md:p-5 rounded-2xl border-2 border-emerald-500/40 bg-emerald-950/20 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/50">
                        Pendekatan B: Percabangan Bersarang (Nested IF)
                      </span>
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Sangat Tepat (Best Practice)</span>
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1">
                      <span className="text-slate-400">// Pengecekan bertingkat terisolasi:</span>
                      <div className="text-slate-100">
                        <span className="text-purple-400">if</span>{' '}
                        <span className={isUsiaPass ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                          usia &gt;= 17
                        </span>:
                      </div>
                      <div className="pl-4 text-slate-100">
                        <span className="text-purple-400">if</span>{' '}
                        <span className={isBeratPass ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                          berat &gt;= 45
                        </span>:
                      </div>
                      <div className="pl-8 text-emerald-400">output(&quot;Kualifikasi Donor Terpenuhi&quot;)</div>
                      <div className="pl-4 text-purple-400">else:</div>
                      <div className="pl-8 text-rose-300">output(&quot;Gagal: Berat badan minimal 45 kg!&quot;)</div>
                      <div className="text-purple-400">else:</div>
                      <div className="pl-4 text-rose-300">output(&quot;Gagal: Usia minimal 17 tahun!&quot;)</div>
                    </div>

                    {/* Output Layar User */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-[11px] font-mono text-slate-400 block">Pesan Diagnostik Presisi:</span>
                      <div className={`p-2 rounded-lg font-mono text-xs font-bold ${
                        isDonorPass ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-amber-950 text-amber-300 border border-amber-600'
                      }`}>
                        {isDonorPass
                          ? '✓ Kualifikasi Donor Terpenuhi (Lolos Semua Gerbang)'
                          : !isUsiaPass
                          ? '🛑 Gagal pada Gerbang 1: Usia Anda belum mencapai 17 tahun!'
                          : '⚠️ Gagal pada Gerbang 2: Berat badan belum mencapai 45 kg!'}
                      </div>
                    </div>
                  </div>

                  {/* Keunggulan Pedogis */}
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 space-y-1">
                    <strong className="block text-emerald-300 font-black flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Keunggulan: Umpan Balik Diagnostik Granular
                    </strong>
                    <p className="leading-relaxed text-[11.5px] text-emerald-200/90">
                      Sistem mampu mengidentifikasi <strong>secara presisi titik kegagalan</strong>. Mahasiswa atau calon pendonor langsung tahu syarat mana yang belum terpenuhi dan langkah perbaikan yang harus diambil.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* SKENARIO 2: OR OPERATOR (DUEL KOMPARASI IF MAJEMUK VS OPERATOR OR) */}
            {selectedScenario === 'tiket_or' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
                
                {/* PANEL KIRI: PENDEKATAN IF MAJEMUK (KURANG TEPAT / REDUNDANT) */}
                <div className="p-4 md:p-5 rounded-2xl border-2 border-rose-500/40 bg-rose-950/20 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/50">
                        Pendekatan A: Percabangan Majemuk (IF - ELIF)
                      </span>
                      <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Kurang Tepat (Anti-Pattern)</span>
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1">
                      <span className="text-slate-400">// Duplikasi baris aksi identik (Melanggar Prinsip DRY):</span>
                      
                      <div className={`p-1 rounded transition-colors ${isTiketBalita ? 'bg-rose-500/20 border-l-2 border-rose-400' : ''}`}>
                        <span className="text-purple-400">if</span>{' '}
                        <span className={isTiketBalita ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                          usia &lt; 5 ({isTiketBalita ? 'True' : 'False'})
                        </span>:
                        <div className={`pl-4 ${isTiketBalita ? 'text-emerald-300 font-black' : 'text-slate-500'}`}>
                          output(&quot;Tiket Bebas Biaya (Rp 0)&quot;)
                        </div>
                      </div>

                      <div className={`p-1 rounded transition-colors ${!isTiketBalita && isTiketLansia ? 'bg-rose-500/20 border-l-2 border-rose-400' : ''}`}>
                        <span className="text-purple-400">elif</span>{' '}
                        <span className={!isTiketBalita && isTiketLansia ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                          usia &gt;= 60 ({isTiketLansia ? 'True' : 'False'})
                        </span>:
                        <div className={`pl-4 ${!isTiketBalita && isTiketLansia ? 'text-emerald-300 font-black' : 'text-slate-500'}`}>
                          output(&quot;Tiket Bebas Biaya (Rp 0)&quot;)
                        </div>
                      </div>

                      <div className={`p-1 rounded transition-colors ${!isTiketBalita && !isTiketLansia && isVIP ? 'bg-rose-500/20 border-l-2 border-rose-400' : ''}`}>
                        <span className="text-purple-400">elif</span>{' '}
                        <span className={!isTiketBalita && !isTiketLansia && isVIP ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                          isVIP ({isVIP ? 'True' : 'False'})
                        </span>:
                        <div className={`pl-4 ${!isTiketBalita && !isTiketLansia && isVIP ? 'text-emerald-300 font-black' : 'text-slate-500'}`}>
                          output(&quot;Tiket Bebas Biaya (Rp 0)&quot;)
                        </div>
                      </div>

                      <div className={`p-1 rounded transition-colors ${!isTiketGratis ? 'bg-slate-800/80 border-l-2 border-amber-400' : ''}`}>
                        <span className="text-purple-400">else:</span>
                        <div className={`pl-4 ${!isTiketGratis ? 'text-amber-300 font-black' : 'text-slate-500'}`}>
                          output(&quot;Tarif Reguler: Rp 50.000&quot;)
                        </div>
                      </div>
                    </div>

                    {/* Output Layar User */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-[11px] font-mono text-slate-400 block">Pesan yang Dilihat Pengguna:</span>
                      <div className={`p-2 rounded-lg font-mono text-xs font-bold ${
                        isTiketGratis ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-slate-900 text-slate-200 border border-slate-700'
                      }`}>
                        {isTiketGratis ? '✓ Tiket Bebas Biaya (Rp 0)' : 'Tarif Reguler: Rp 50.000'}
                        <span className="text-[10.5px] text-slate-400 font-normal block mt-0.5">
                          {isTiketBalita
                            ? '↳ Dieksekusi melalui cabang 1: if usia < 5'
                            : isTiketLansia
                            ? '↳ Dieksekusi melalui cabang 2: elif usia >= 60'
                            : isVIP
                            ? '↳ Dieksekusi melalui cabang 3: elif isVIP'
                            : '↳ Dieksekusi melalui cabang fallback: else'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ulasan Kelemahan Kritis */}
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200 space-y-1">
                    <strong className="block text-rose-300 font-black flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-400" />
                      Kelemahan: Pelanggaran Prinsip DRY &amp; Kerentanan Pemeliharaan
                    </strong>
                    <p className="leading-relaxed text-[11.5px] text-rose-200/90">
                      Baris output <code className="font-mono text-rose-300 font-bold">&quot;Tiket Bebas Biaya (Rp 0)&quot;</code> ditulis <strong>berulang 3 kali secara redundan</strong>. Jika nominal subsidi tiket atau hak fasilitas berubah, programmer wajib mengubah kode di 3 tempat terpisah. Jika salah satu cabang terlewat, akan timbul inkonsistensi sistem dan potensi bug fatal (maintenance nightmare).
                    </p>
                  </div>
                </div>

                {/* PANEL KANAN: PENDEKATAN OPERATOR LOGIKA OR (SANGAT TEPAT & BERSIH) */}
                <div className="p-4 md:p-5 rounded-2xl border-2 border-emerald-500/40 bg-emerald-950/20 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/50">
                        Pendekatan B: Operator Logika OR (Disjungsi)
                      </span>
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Sangat Tepat (Best Practice)</span>
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1.5">
                      <span className="text-slate-400">// Satu ekspresi terpadu &amp; Single Source of Truth:</span>
                      <div className="text-slate-100 leading-relaxed">
                        <span className="text-purple-400 font-bold">if</span>{' '}
                        <span className={isTiketBalita ? 'text-emerald-400 font-bold underline' : 'text-slate-300'}>
                          usia &lt; 5 ({isTiketBalita ? 'True' : 'False'})
                        </span>{' '}
                        <span className="text-sky-400 font-black">or</span>{' '}
                        <span className={isTiketBalita ? 'text-slate-500 line-through' : isTiketLansia ? 'text-emerald-400 font-bold underline' : 'text-slate-300'}>
                          usia &gt;= 60 {isTiketBalita ? '(⚡Bypass)' : isTiketLansia ? '(True)' : '(False)'}
                        </span>{' '}
                        <span className="text-sky-400 font-black">or</span>{' '}
                        <span className={(isTiketBalita || isTiketLansia) ? 'text-slate-500 line-through' : isVIP ? 'text-emerald-400 font-bold underline' : 'text-slate-300'}>
                          isVIP {(isTiketBalita || isTiketLansia) ? '(⚡Bypass)' : isVIP ? '(True)' : '(False)'}
                        </span>:
                      </div>
                      <div className={`pl-4 ${isTiketGratis ? 'text-emerald-300 font-black' : 'text-slate-500'}`}>
                        output(&quot;Tiket Bebas Biaya (Rp 0)&quot;)
                      </div>
                      <div className="text-purple-400">else:</div>
                      <div className={`pl-4 ${!isTiketGratis ? 'text-amber-300 font-black' : 'text-slate-500'}`}>
                        output(&quot;Tarif Reguler: Rp 50.000&quot;)
                      </div>
                    </div>

                    {/* Tracking Evaluasi Short-Circuit 3 Syarat */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 font-mono text-[11px]">
                      <div className={`p-2 rounded-lg border flex flex-col justify-between ${
                        isTiketBalita ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}>
                        <span className="font-bold">1. Balita (&lt;5 thn)</span>
                        <span className="font-black text-[10.5px] mt-0.5">
                          {isTiketBalita ? '✓ TRUE (Pemicu)' : '✗ FALSE'}
                        </span>
                      </div>

                      <div className={`p-2 rounded-lg border flex flex-col justify-between ${
                        isTiketBalita
                          ? 'bg-slate-950/60 border-dashed border-slate-800 text-slate-600'
                          : isTiketLansia
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}>
                        <span className="font-bold">2. Lansia (≥60 thn)</span>
                        <span className="font-black text-[10.5px] mt-0.5">
                          {isTiketBalita ? '⚡ BYPASS (Short-Circuit)' : isTiketLansia ? '✓ TRUE (Pemicu)' : '✗ FALSE'}
                        </span>
                      </div>

                      <div className={`p-2 rounded-lg border flex flex-col justify-between ${
                        (isTiketBalita || isTiketLansia)
                          ? 'bg-slate-950/60 border-dashed border-slate-800 text-slate-600'
                          : isVIP
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}>
                        <span className="font-bold">3. Member VIP</span>
                        <span className="font-black text-[10.5px] mt-0.5">
                          {(isTiketBalita || isTiketLansia) ? '⚡ BYPASS (Short-Circuit)' : isVIP ? '✓ TRUE (Pemicu)' : '✗ FALSE'}
                        </span>
                      </div>
                    </div>

                    {/* Output Layar User */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-[11px] font-mono text-slate-400 block">Pesan Hasil Eksekusi Terpadu:</span>
                      <div className={`p-2 rounded-lg font-mono text-xs font-bold ${
                        isTiketGratis ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-slate-900 text-slate-200 border border-slate-700'
                      }`}>
                        {isTiketGratis ? '✓ Tiket Bebas Biaya (Rp 0)' : 'Tarif Reguler: Rp 50.000'}
                        <span className="text-[10.5px] text-emerald-400/90 font-normal block mt-0.5">
                          {isTiketGratis
                            ? '↳ Hak akses diberikan langsung melalui 1 instruksi aksi terpadu'
                            : '↳ Seluruh operan bernilai False, dialihkan ke cabang fallback else'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Keunggulan Pedagogis */}
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 space-y-1">
                    <strong className="block text-emerald-300 font-black flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Keunggulan: Single Point of Truth &amp; Optimalisasi Short-Circuit
                    </strong>
                    <p className="leading-relaxed text-[11.5px] text-emerald-200/90">
                      Aksi hanya didefinisikan <strong>satu kali (Single Source of Truth)</strong> sehingga aman dari inkonsistensi saat pemeliharaan. Selain itu, berkat <strong>Short-Circuit Evaluation</strong>, jika salah satu syarat di awal sudah bernilai True, CPU langsung melompat mengeksekusi aksi tanpa membuang siklus untuk memeriksa sisa kondisi lainnya.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* SKENARIO 3: AND OPERATOR (RENTANG ATOMIK) */}
            {selectedScenario === 'rentang_and' && (
              <div className="p-4 md:p-5 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-emerald-500/30 pb-2">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Validasi Rentang Domain Matematika Tertutup (Domain Constraint)</span>
                  </div>
                  <span className="text-xs font-mono bg-emerald-900/60 px-2 py-0.5 rounded text-emerald-200 border border-emerald-600">
                    Kombinasi Batas Bawah &amp; Atas
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                    <strong className="text-emerald-300 block">Sintaks Universal yang Dianjurkan:</strong>
                    <code className="block bg-slate-950 p-2 rounded text-amber-300 font-mono">
                      if nilai &gt;= 0 and nilai &lt;= 100:
                    </code>
                    <p className="text-[11.5px] text-slate-300 leading-relaxed">
                      Kedua batas menguji variabel numerik yang sama. Tidak diperlukan Nested IF karena nilai di bawah 0 maupun nilai di atas 100 sama-sama merupakan pelanggaran integritas domain nilai ujian.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                    <strong className="text-sky-300 block">Guarded Evaluation (Pengaman Pembagian / Null):</strong>
                    <code className="block bg-slate-950 p-2 rounded text-sky-300 font-mono">
                      if pembagi != 0 and total / pembagi &gt; 50:
                    </code>
                    <p className="text-[11.5px] text-slate-300 leading-relaxed">
                      Berkat hukum Short-Circuit, jika <code className="font-mono">pembagi == 0</code>, komputer langsung berhenti dan tidak akan mengeksekusi operasi pembagian di sebelah kanan, sehingga program terhindar dari <em>ZeroDivisionError</em>!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════════ */}
            {/* TABEL PANDUAN PENGAMBILAN KEPUTUSAN ARSITEKTURAL                    */}
            {/* ═════════════════════════════════════════════════════════════════ */}
            <div className="p-4 md:p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs md:text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                <Info className="w-4 h-4 text-orange-400" />
                <span>Ringkasan Kaidah Arsitektural: Operator Logika vs Nested IF</span>
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-mono">
                      <th className="py-2 px-3">Karakteristik Kasus</th>
                      <th className="py-2 px-3">Gunakan Operator Logika (AND/OR)</th>
                      <th className="py-2 px-3">Gunakan Nested IF (Bersarang)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-semibold text-slate-200">Kebutuhan Pesan Kesalahan</td>
                      <td className="py-2.5 px-3 text-rose-300">Cukup pesan penolakan umum (blanket error)</td>
                      <td className="py-2.5 px-3 text-emerald-300 font-bold">Wajib pesan diagnostik spesifik tiap syarat gagal</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-semibold text-slate-200">Domain Variabel</td>
                      <td className="py-2.5 px-3 text-emerald-300 font-bold">Validasi rentang batas variabel atomik tunggal</td>
                      <td className="py-2.5 px-3 text-slate-400">Kurang efisien (membuat kode terlalu menjorok)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-semibold text-slate-200">Hierarki Pengujian</td>
                      <td className="py-2.5 px-3 text-slate-400">Syarat setara tanpa ketergantungan urutan logis</td>
                      <td className="py-2.5 px-3 text-emerald-300 font-bold">Kondisi ke-2 hanya masuk akal jika kondisi ke-1 terpenuhi</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-semibold text-slate-200">Kriteria Alternatif Ekuivalen</td>
                      <td className="py-2.5 px-3 text-emerald-300 font-bold">Sangat Tepat (OR): Menghindari duplikasi aksi (DRY) &amp; otomatis Short-Circuit</td>
                      <td className="py-2.5 px-3 text-rose-300">Kurang Tepat: Terjadi duplikasi blok instruksi identik di setiap cabang (Code Smell)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-semibold text-slate-200">Keamanan &amp; Integritas</td>
                      <td className="py-2.5 px-3 text-sky-300">Guarded evaluation (pengaman null/zero)</td>
                      <td className="py-2.5 px-3 text-sky-300">Otorisasi bertingkat multi-tahap (Multi-Factor)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </motion.div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* TAB 2: FLOWCHART (ANSI/ISO 5807)                                      */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'flowchart' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="w-full flex flex-col items-center justify-center p-4 md:p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-inner overflow-x-auto min-h-[480px]">
              <LogicVerticalFlowchart
                scenarioId={selectedScenario}
                v1={selectedScenario === 'rentang_and' ? nilai : usia}
                v2={berat}
                v3={isVIP}
                step={step}
              />
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Simbol Belah Ketupat merepresentasikan ekspresi majemuk yang langsung mengevaluasi operator logika.</span>
              <span className="font-mono text-[11px] text-amber-400">ANSI/ISO 5807 Compliant</span>
            </div>
          </motion.div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* TAB 3: NARATIF                                                        */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'naratif' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs md:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
              {getNarrative()}
            </div>
          </motion.div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* TAB 4: PSEUDOCODE (CLRS)                                              */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'pseudocode' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs md:text-sm text-amber-200 leading-relaxed whitespace-pre-wrap">
              {getPseudocode()}
            </div>
          </motion.div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* TAB 5: KODE PROGRAM (PYTHON & JS)                                     */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'kode' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <span className="text-xs font-mono text-slate-400">Pilih Bahasa Pemrograman:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setActiveLang('python')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeLang === 'python' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  Python
                </button>
                <button
                  onClick={() => setActiveLang('js')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeLang === 'js' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  JavaScript
                </button>
              </div>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs md:text-sm text-emerald-300 leading-relaxed whitespace-pre-wrap">
              {getCode()}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
