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
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Layers,
  Maximize2,
  Minimize2,
  Tv,
  ArrowRight,
  ArrowDown
} from 'lucide-react';

// ── Definisi Skenario Multi-Branch ───────────────────────────────────────────
interface MultiBranchScenario {
  id: string;
  title: string;
  variable: string;
  unit: string;
  min: number;
  max: number;
  defaultVal: number;
  presets: number[];
  branches: {
    condLabel: string;
    condStr: string;
    outputLabel: string;
    condition: (v: number) => boolean;
  }[];
  elseLabel: string;
  narrative: (v: number) => string;
  pseudocode: string;
  pythonCode: (v: number) => string;
  jsCode: (v: number) => string;
}

const SCENARIOS: MultiBranchScenario[] = [
  {
    id: 'nilai',
    title: 'Indeks Nilai Ujian',
    variable: 'nilai',
    unit: '',
    min: 0,
    max: 100,
    defaultVal: 78,
    presets: [92, 78, 64, 48, 25],
    branches: [
      { condLabel: 'nilai ≥ 85?', condStr: 'nilai >= 85', outputLabel: '"Grade A"', condition: v => v >= 85 },
      { condLabel: 'nilai ≥ 70?', condStr: 'nilai >= 70', outputLabel: '"Grade B"', condition: v => v >= 70 },
      { condLabel: 'nilai ≥ 55?', condStr: 'nilai >= 55', outputLabel: '"Grade C"', condition: v => v >= 55 },
      { condLabel: 'nilai ≥ 40?', condStr: 'nilai >= 40', outputLabel: '"Grade D"', condition: v => v >= 40 },
    ],
    elseLabel: '"Grade E"',
    narrative: v => `1. Masukkan nilai ujian mahasiswa.
2. Jika nilai >= 85 maka:
      Tampilkan "Grade A" (Istimewa) ke layar.
   Selain itu, jika nilai >= 70 maka:
      Tampilkan "Grade B" (Baik) ke layar.
   Selain itu, jika nilai >= 55 maka:
      Tampilkan "Grade C" (Cukup) ke layar.
   Selain itu, jika nilai >= 40 maka:
      Tampilkan "Grade D" (Kurang) ke layar.
   Selain itu:
      Tampilkan "Grade E" (Gagal) ke layar.
Selesai.`,
    pseudocode: `PROGRAM PenentuIndeksNilai
// Menentukan predikat akademik mahasiswa secara berjenjang

KAMUS:
  nilai : integer

ALGORITMA:
  input(nilai)
  if nilai >= 85 then
    output("Grade A")
  else if nilai >= 70 then
    output("Grade B")
  else if nilai >= 55 then
    output("Grade C")
  else if nilai >= 40 then
    output("Grade D")
  else
    output("Grade E")
  endif
  output("Evaluasi selesai.")`,
    pythonCode: v => `# Python — Percabangan Majemuk (IF - ELIF - ELSE)
nilai = ${v}

if nilai >= 85:
    grade = "Grade A"
elif nilai >= 70:
    grade = "Grade B"
elif nilai >= 55:
    grade = "Grade C"
elif nilai >= 40:
    grade = "Grade D"
else:
    grade = "Grade E"

print(f"Hasil Nilai: {nilai} -> {grade}")`,
    jsCode: v => `// JavaScript — Percabangan Majemuk (if - else if - else)
const nilai = ${v};
let grade;

if (nilai >= 85) {
    grade = "Grade A";
} else if (nilai >= 70) {
    grade = "Grade B";
} else if (nilai >= 55) {
    grade = "Grade C";
} else if (nilai >= 40) {
    grade = "Grade D";
} else {
    grade = "Grade E";
}

console.log(\`Hasil Nilai: \${nilai} -> \${grade}\`);`,
  },
  {
    id: 'tiket',
    title: 'Kategori Tiket Usia',
    variable: 'usia',
    unit: ' thn',
    min: 1,
    max: 75,
    defaultVal: 16,
    presets: [3, 9, 16, 35, 65],
    branches: [
      { condLabel: 'usia < 5?', condStr: 'usia < 5', outputLabel: '"Gratis (Balita)"', condition: v => v < 5 },
      { condLabel: 'usia < 12?', condStr: 'usia < 12', outputLabel: '"Anak: Rp20.000"', condition: v => v < 12 },
      { condLabel: 'usia < 18?', condStr: 'usia < 18', outputLabel: '"Remaja: Rp35.000"', condition: v => v < 18 },
      { condLabel: 'usia < 60?', condStr: 'usia < 60', outputLabel: '"Dewasa: Rp50.000"', condition: v => v < 60 },
    ],
    elseLabel: '"Lansia: Rp25.000"',
    narrative: v => `1. Masukkan usia pengunjung.
2. Jika usia < 5 maka:
      Tampilkan "Gratis (Balita)" ke layar.
   Selain itu, jika usia < 12 maka:
      Tampilkan "Tiket Anak: Rp20.000" ke layar.
   Selain itu, jika usia < 18 maka:
      Tampilkan "Tiket Remaja: Rp35.000" ke layar.
   Selain itu, jika usia < 60 maka:
      Tampilkan "Tiket Dewasa: Rp50.000" ke layar.
   Selain itu:
      Tampilkan "Tiket Lansia: Rp25.000" ke layar.
Selesai.`,
    pseudocode: `PROGRAM TarifTiketWisata
// Menetapkan tarif tiket masuk berdasarkan kategori usia pengunjung

KAMUS:
  usia : integer

ALGORITMA:
  input(usia)
  if usia < 5 then
    output("Gratis (Balita)")
  else if usia < 12 then
    output("Tiket Anak: Rp20.000")
  else if usia < 18 then
    output("Tiket Remaja: Rp35.000")
  else if usia < 60 then
    output("Tiket Dewasa: Rp50.000")
  else
    output("Tiket Lansia: Rp25.000")
  endif`,
    pythonCode: v => `# Python — Penentuan Kategori Usia
usia = ${v}

if usia < 5:
    kategori = "Gratis (Balita)"
elif usia < 12:
    kategori = "Tiket Anak: Rp20.000"
elif usia < 18:
    kategori = "Tiket Remaja: Rp35.000"
elif usia < 60:
    kategori = "Tiket Dewasa: Rp50.000"
else:
    kategori = "Tiket Lansia: Rp25.000"

print(f"Usia: {usia} tahun -> {kategori}")`,
    jsCode: v => `// JavaScript — Penentuan Kategori Usia
const usia = ${v};
let kategori;

if (usia < 5) {
    kategori = "Gratis (Balita)";
} else if (usia < 12) {
    kategori = "Tiket Anak: Rp20.000";
} else if (usia < 18) {
    kategori = "Tiket Remaja: Rp35.000";
} else if (usia < 60) {
    kategori = "Tiket Dewasa: Rp50.000";
} else {
    kategori = "Tiket Lansia: Rp25.000";
}

console.log(\`Usia: \${usia} tahun -> \${kategori}\`);`,
  },
  {
    id: 'pajak',
    title: 'Tarif Pajak Progresif',
    variable: 'penghasilan',
    unit: ' jt',
    min: 20,
    max: 600,
    defaultVal: 120,
    presets: [45, 120, 350, 550],
    branches: [
      { condLabel: 'gaji ≤ 60 jt?', condStr: 'penghasilan <= 60', outputLabel: '"Tarif: 5%"', condition: v => v <= 60 },
      { condLabel: 'gaji ≤ 250 jt?', condStr: 'penghasilan <= 250', outputLabel: '"Tarif: 15%"', condition: v => v <= 250 },
      { condLabel: 'gaji ≤ 500 jt?', condStr: 'penghasilan <= 500', outputLabel: '"Tarif: 25%"', condition: v => v <= 500 },
      { condLabel: 'gaji ≤ 1000 jt?', condStr: 'penghasilan <= 1000', outputLabel: '"Tarif: 30%"', condition: v => v <= 1000 },
    ],
    elseLabel: '"Tarif: 35%"',
    narrative: v => `1. Masukkan penghasilan tahunan dalam juta rupiah.
2. Jika penghasilan <= 60 maka:
      Tampilkan "Tarif: 5%" ke layar.
   Selain itu, jika penghasilan <= 250 maka:
      Tampilkan "Tarif: 15%" ke layar.
   Selain itu, jika penghasilan <= 500 maka:
      Tampilkan "Tarif: 25%" ke layar.
   Selain itu, jika penghasilan <= 1000 maka:
      Tampilkan "Tarif: 30%" ke layar.
   Selain itu:
      Tampilkan "Tarif: 35%" ke layar.
Selesai.`,
    pseudocode: `PROGRAM TarifPajakProgresif
// Menentukan lapisan tarif pajak penghasilan tahunan

KAMUS:
  penghasilan : integer

ALGORITMA:
  input(penghasilan)
  if penghasilan <= 60 then
    output("Tarif: 5%")
  else if penghasilan <= 250 then
    output("Tarif: 15%")
  else if penghasilan <= 500 then
    output("Tarif: 25%")
  else if penghasilan <= 1000 then
    output("Tarif: 30%")
  else
    output("Tarif: 35%")
  endif`,
    pythonCode: v => `# Python — Tarif Pajak Progresif
penghasilan = ${v}  # dalam juta rupiah

if penghasilan <= 60:
    tarif = "Tarif: 5%"
elif penghasilan <= 250:
    tarif = "Tarif: 15%"
elif penghasilan <= 500:
    tarif = "Tarif: 25%"
elif penghasilan <= 1000:
    tarif = "Tarif: 30%"
else:
    tarif = "Tarif: 35%"

print(f"Penghasilan: Rp{penghasilan} Juta -> {tarif}")`,
    jsCode: v => `// JavaScript — Tarif Pajak Progresif
const penghasilan = ${v}; // dalam juta rupiah
let tarif;

if (penghasilan <= 60) {
    tarif = "Tarif: 5%";
} else if (penghasilan <= 250) {
    tarif = "Tarif: 15%";
} else if (penghasilan <= 500) {
    tarif = "Tarif: 25%";
} else if (penghasilan <= 1000) {
    tarif = "Tarif: 30%";
} else {
    tarif = "Tarif: 35%";
}

console.log(\`Penghasilan: Rp\${penghasilan} Juta -> \${tarif}\`);`,
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// 1. FLOWCHART VERTIKAL (STANDAR ANSI/ISO 5807 PROPORSIONAL)
// ══════════════════════════════════════════════════════════════════════════════
function MultiBranchVerticalFlowchart({
  scenario,
  sliderVal,
  hazardMode,
  step,
}: {
  scenario: MultiBranchScenario;
  sliderVal: number;
  hazardMode: boolean;
  step: number;
}) {
  const branches = hazardMode ? [...scenario.branches].reverse() : scenario.branches;
  const activeIndex = branches.findIndex(b => b.condition(sliderVal));
  const isElseHit = activeIndex === -1;

  const isStepActive = (s: number) => {
    if (step === 0) return true;
    return step >= s;
  };

  return (
    <svg
      viewBox="0 0 760 720"
      className="w-full h-auto select-none max-w-[700px] mx-auto"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <marker id="mbs-arr-gray" markerWidth="11" markerHeight="11" refX="9.5" refY="5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 9.5 5 L 1 8.5 Z" fill="#94a3b8" />
        </marker>
        <marker id="mbs-arr-green" markerWidth="12" markerHeight="12" refX="10.5" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 10.5 5.5 L 1 9.5 Z" fill="#10b981" stroke="#34d399" strokeWidth="0.5" />
        </marker>
        <marker id="mbs-arr-rose" markerWidth="12" markerHeight="12" refX="10.5" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 10.5 5.5 L 1 9.5 Z" fill="#f43f5e" stroke="#fb7185" strokeWidth="0.5" />
        </marker>
        <filter id="mbs-glow-diamond" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="mbs-glow-active" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ─── 1. START TERMINAL ─── */}
      <g opacity={isStepActive(1) ? 1 : 0.2}>
        <rect x="145" y="16" width="140" height="42" rx="21" fill="rgba(16,185,129,0.18)" stroke="#10b981" strokeWidth="2.5" />
        <text x="215" y="42" textAnchor="middle" fontSize="14" fontWeight="900" fill="#6ee7b7" fontFamily="monospace">
          MULAI
        </text>
      </g>
      <line x1="215" y1="58" x2="215" y2="88" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#mbs-arr-gray)" opacity={isStepActive(1) ? 1 : 0.2} />

      {/* ─── 2. INPUT JAJARAN GENJANG ─── */}
      <g opacity={isStepActive(2) ? 1 : 0.2}>
        <polygon points="135,88 325,88 295,134 105,134" fill="rgba(168,85,247,0.25)" stroke="#a855f7" strokeWidth="2.5" />
        <text x="215" y="104" dominantBaseline="central" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#e9d5ff" fontFamily="monospace">
          input({scenario.variable})
        </text>
        <text x="215" y="120" dominantBaseline="central" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fbcfe8" fontFamily="monospace">
          [{sliderVal}{scenario.unit}]
        </text>
      </g>
      <line x1="215" y1="134" x2="215" y2="168" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#mbs-arr-gray)" opacity={isStepActive(2) ? 1 : 0.2} />

      {/* ─── 3. REL BUS PENGUMPUL (x = 675) ─── */}
      <line x1="675" y1="205" x2="675" y2="635" stroke="#334155" strokeWidth="2.5" strokeDasharray="4 4" />
      {activeIndex !== -1 && (
        <>
          <line
            x1="675"
            y1={205 + activeIndex * 95}
            x2="675"
            y2="635"
            stroke="#10b981"
            strokeWidth="8"
            strokeOpacity="0.25"
            opacity={isStepActive(3 + activeIndex) ? 1 : 0.2}
          />
          <line
            x1="675"
            y1={205 + activeIndex * 95}
            x2="675"
            y2="635"
            stroke="#10b981"
            strokeWidth="3.5"
            opacity={isStepActive(3 + activeIndex) ? 1 : 0.2}
          />
        </>
      )}
      {/* Rel Pengumpul Horisontal Bawah ke Titik Temu (Merge Node) — Khusus Cabang Kanan (Ya) */}
      <line x1="675" y1="635" x2="220" y2="635" stroke="#334155" strokeWidth="2.5" strokeDasharray="4 4" />
      {activeIndex !== -1 && (
        <>
          <line
            x1="675"
            y1="635"
            x2="220"
            y2="635"
            stroke="#10b981"
            strokeWidth="8"
            strokeOpacity="0.25"
            opacity={step === 0 || step >= 8 ? 1 : 0.2}
          />
          <line
            x1="675"
            y1="635"
            x2="220"
            y2="635"
            stroke="#10b981"
            strokeWidth="3.5"
            markerEnd="url(#mbs-arr-green)"
            opacity={step === 0 || step >= 8 ? 1 : 0.2}
          />
        </>
      )}

      {/* ─── 4. CASCADING DIAMONDS DENGAN CABANG YA KE SAMPING ─── */}
      {branches.map((b, i) => {
        const cx = 215;
        const cy = 205 + i * 95;
        const isHit = activeIndex === i;
        const isPassedFalse = activeIndex > i || (activeIndex === -1 && i < branches.length);
        const isSkipped = activeIndex !== -1 && i > activeIndex;

        const currentStep = 3 + i;
        const groupOpacity = isStepActive(currentStep) ? (isSkipped ? 0.35 : 1) : 0.2;

        return (
          <g key={i} opacity={groupOpacity}>
            {/* Belah Ketupat ANSI/ISO 5807 Besar & Kontras */}
            <polygon
              points={`${cx},${cy - 38} ${cx + 105},${cy} ${cx},${cy + 38} ${cx - 105},${cy}`}
              fill={isHit ? '#451a03' : isSkipped ? '#18181b' : '#291305'}
              stroke={isHit ? '#fbbf24' : isSkipped ? '#3f3f46' : '#78350f'}
              strokeWidth={isHit ? 3.5 : 2}
              strokeDasharray={isSkipped ? '4 3' : undefined}
              filter={isHit ? 'url(#mbs-glow-diamond)' : undefined}
            />

            {/* Teks Kondisi Besar */}
            <text
              x={cx}
              y={cy - 6}
              textAnchor="middle"
              fill={isHit ? '#fde68a' : isSkipped ? '#52525b' : '#fcd34d'}
              fontSize="14.5"
              fontWeight="900"
              fontFamily="monospace"
            >
              {b.condLabel}
            </text>

            {/* Dynamic Status Badge */}
            <g transform={`translate(${cx}, ${cy + 14})`}>
              <rect
                x="-48"
                y="-9"
                width="96"
                height="18"
                rx="9"
                fill={isHit ? '#10b981' : isSkipped ? '#27272a' : '#881337'}
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="10.5"
                fontWeight="bold"
                fontFamily="monospace"
              >
                {isHit ? '✓ TRUE (Ya)' : isSkipped ? '🚫 LEWATI' : '✗ FALSE'}
              </text>
            </g>

            {/* ─── CABANG YA: MENCABANG KE SAMPING (KANAN) MENUJU JAJARAN GENJANG ─── */}
            <line
              x1={cx + 105}
              y1={cy}
              x2={385}
              y2={cy}
              stroke={isHit ? '#10b981' : '#334155'}
              strokeWidth={isHit ? 3.5 : 2}
              markerEnd={isHit ? 'url(#mbs-arr-green)' : 'url(#mbs-arr-gray)'}
            />
            {/* Badge 'Ya' */}
            <rect
              x="328"
              y={cy - 19}
              width="36"
              height="18"
              rx="4"
              fill={isHit ? '#065f46' : '#1e293b'}
              stroke={isHit ? '#10b981' : '#334155'}
            />
            <text
              x="346"
              y={cy - 6}
              textAnchor="middle"
              fill={isHit ? '#6ee7b7' : '#94a3b8'}
              fontSize="11"
              fontWeight="bold"
              fontFamily="monospace"
            >
              Ya
            </text>

            {/* JAJARAN GENJANG OUTPUT (MENCABANG DI SISI KANAN) */}
            <polygon
              points={`405,${cy - 25} 615,${cy - 25} 590,${cy + 25} 380,${cy + 25}`}
              fill={isHit ? '#064e3b' : '#0f172a'}
              stroke={isHit ? '#10b981' : '#1e293b'}
              strokeWidth={isHit ? 3 : 1.5}
            />
            <text
              x="497"
              y={cy}
              dominantBaseline="central"
              textAnchor="middle"
              fill={isHit ? '#a7f3d0' : '#475569'}
              fontSize="13.5"
              fontWeight="bold"
              fontFamily="monospace"
            >
              output({b.outputLabel})
            </text>

            {/* Panah Pengumpul dari Output ke Rel Bus */}
            <line
              x1="590"
              y1={cy}
              x2="675"
              y2={cy}
              stroke={isHit ? '#10b981' : '#334155'}
              strokeWidth={isHit ? 3.5 : 1.5}
              strokeDasharray={isHit ? undefined : '3 3'}
            />

            {/* ─── CABANG TIDAK: MENGALIR KE BAWAH KE KONDISI BERIKUTNYA ─── */}
            <line
              x1={cx}
              y1={cy + 38}
              x2={cx}
              y2={i === branches.length - 1 ? 565 : cy + 57}
              stroke={isPassedFalse ? '#f43f5e' : '#334155'}
              strokeWidth={isPassedFalse ? 3 : 2}
              markerEnd={isPassedFalse ? 'url(#mbs-arr-rose)' : 'url(#mbs-arr-gray)'}
            />
            {/* Badge 'Tidak' */}
            <rect
              x={cx + 8}
              y={cy + 42}
              width="46"
              height="17"
              rx="4"
              fill={isPassedFalse ? '#881337' : '#1e293b'}
              stroke={isPassedFalse ? '#f43f5e' : '#334155'}
            />
            <text
              x={cx + 31}
              y={cy + 54}
              textAnchor="middle"
              fill={isPassedFalse ? '#fecdd3' : '#64748b'}
              fontSize="10"
              fontWeight="bold"
              fontFamily="monospace"
            >
              Tidak
            </text>
          </g>
        );
      })}

      {/* ─── 5. CABANG ELSE (JIKA SELURUH KONDISI TIDAK TERPENUHI) ─── */}
      <g opacity={isStepActive(7) ? (isElseHit ? 1 : 0.35) : 0.2}>
        {/* Jajaran Genjang Blok ELSE */}
        <polygon
          points="135,565 325,565 300,615 110,615"
          fill={isElseHit ? '#881337' : '#0f172a'}
          stroke={isElseHit ? '#f43f5e' : '#1e293b'}
          strokeWidth={isElseHit ? 3 : 1.5}
        />
        <text
          x="217"
          y="590"
          dominantBaseline="central"
          textAnchor="middle"
          fill={isElseHit ? '#fecdd3' : '#475569'}
          fontSize="13.5"
          fontWeight="bold"
          fontFamily="monospace"
        >
          output({scenario.elseLabel})
        </text>

        {/* Panah Langsung Turun dari ELSE ke Titik Temu / SELESAI */}
        {isElseHit && (
          <line
            x1="215"
            y1="615"
            x2="215"
            y2="630"
            stroke="#f43f5e"
            strokeWidth="8"
            strokeOpacity="0.25"
            opacity={isStepActive(7) ? 1 : 0.2}
          />
        )}
        <line
          x1="215"
          y1="615"
          x2="215"
          y2="630"
          stroke={isElseHit ? '#f43f5e' : '#64748b'}
          strokeWidth={isElseHit ? 3.5 : 2.5}
          markerEnd={isElseHit ? 'url(#mbs-arr-rose)' : 'url(#mbs-arr-gray)'}
          opacity={isStepActive(7) ? (isElseHit ? 1 : 0.35) : 0.2}
        />
      </g>

      {/* ─── 6. MERGE NODE & SELESAI ─── */}
      <g opacity={step === 0 || step >= 8 ? 1 : 0.2}>
        <circle
          cx="215"
          cy="635"
          r="5"
          fill={activeIndex !== -1 ? '#10b981' : isElseHit ? '#f43f5e' : '#94a3b8'}
        />
        {(activeIndex !== -1 || isElseHit) && (
          <line
            x1="215"
            y1="640"
            x2="215"
            y2="665"
            stroke={activeIndex !== -1 ? '#10b981' : '#f43f5e'}
            strokeWidth="8"
            strokeOpacity="0.25"
          />
        )}
        <line
          x1="215"
          y1="640"
          x2="215"
          y2="665"
          stroke={activeIndex !== -1 ? '#10b981' : isElseHit ? '#f43f5e' : '#64748b'}
          strokeWidth={activeIndex !== -1 || isElseHit ? 3.5 : 2.5}
          markerEnd={activeIndex !== -1 ? 'url(#mbs-arr-green)' : isElseHit ? 'url(#mbs-arr-rose)' : 'url(#mbs-arr-gray)'}
        />

        <rect
          x="145"
          y="665"
          width="140"
          height="42"
          rx="21"
          fill={activeIndex !== -1 || isElseHit ? 'rgba(239,68,68,0.35)' : 'rgba(239,68,68,0.18)'}
          stroke={activeIndex !== -1 || isElseHit ? '#f87171' : '#ef4444'}
          strokeWidth={activeIndex !== -1 || isElseHit ? 3.5 : 2.5}
        />
        <text
          x="215"
          y="686"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize="14"
          fontWeight="900"
          fill={activeIndex !== -1 || isElseHit ? '#fecdd3' : '#fca5a5'}
          fontFamily="monospace"
        >
          SELESAI
        </text>
      </g>
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 2. FLOWCHART HORISONTAL (MODE PROYEKTOR / MAXIMIZE LANSKAP)
// ══════════════════════════════════════════════════════════════════════════════
function MultiBranchHorizontalFlowchart({
  scenario,
  sliderVal,
  hazardMode,
  step,
}: {
  scenario: MultiBranchScenario;
  sliderVal: number;
  hazardMode: boolean;
  step: number;
}) {
  const branches = hazardMode ? [...scenario.branches].reverse() : scenario.branches;
  const activeIndex = branches.findIndex(b => b.condition(sliderVal));
  const isElseHit = activeIndex === -1;

  const isStepActive = (s: number) => {
    if (step === 0) return true;
    return step >= s;
  };

  const startX = 330;
  const stepX = 190;
  const cxElse = startX + branches.length * stepX;
  const cxMerge = cxElse + 80;
  const cxSelesai = cxElse + 110;
  const busY = 305;
  const totalWidth = cxSelesai + 105;

  const isFlowActive = step === 0 || (activeIndex !== -1 ? step >= 3 + activeIndex + 1 : step >= 8);
  const activeColor = isElseHit ? '#f43f5e' : activeIndex !== -1 ? '#10b981' : '#64748b';
  const activeMarker = isElseHit ? 'url(#mbh-arr-rose)' : activeIndex !== -1 ? 'url(#mbh-arr-green)' : 'url(#mbh-arr-gray)';
  const cxActive = isElseHit ? cxElse - 6 : startX + activeIndex * stepX - 6;

  return (
    <svg
      viewBox={`0 0 ${totalWidth} 370`}
      className="w-full h-auto select-none min-w-[900px]"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Marker Gray (Inactive Flow) - warna slate terang ber-kontras tinggi */}
        <marker id="mbh-arr-gray" markerWidth="11" markerHeight="11" refX="9.5" refY="5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 9.5 5 L 1 8.5 Z" fill="#94a3b8" />
        </marker>
        {/* Marker Green (Active True Branch) - emerald terang */}
        <marker id="mbh-arr-green" markerWidth="12" markerHeight="12" refX="10.5" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 10.5 5.5 L 1 9.5 Z" fill="#10b981" stroke="#34d399" strokeWidth="0.5" />
        </marker>
        {/* Marker Rose (Active False / Else) - rose terang */}
        <marker id="mbh-arr-rose" markerWidth="12" markerHeight="12" refX="10.5" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 10.5 5.5 L 1 9.5 Z" fill="#f43f5e" stroke="#fb7185" strokeWidth="0.5" />
        </marker>
        <filter id="mbh-glow-diamond" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="mbh-glow-active" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ─── 1. MULAI (OVAL / ROUNDED RECT) ─── */}
      <g opacity={isStepActive(1) ? 1 : 0.2}>
        <rect
          x="12"
          y="32"
          width="76"
          height="36"
          rx="18"
          fill="rgba(16,185,129,0.18)"
          stroke="#10b981"
          strokeWidth="2.5"
        />
        <text
          x="50"
          y="50"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize="12.5"
          fontWeight="bold"
          fill="#6ee7b7"
          fontFamily="monospace"
        >
          MULAI
        </text>
        <line
          x1="88"
          y1="50"
          x2="117"
          y2="50"
          stroke="#64748b"
          strokeWidth="2.5"
          markerEnd="url(#mbh-arr-gray)"
        />
      </g>

      {/* ─── 2. INPUT JAJARAN GENJANG ─── */}
      <g opacity={isStepActive(2) ? 1 : 0.2}>
        <polygon
          points="126,24 242,24 224,76 108,76"
          fill="rgba(168,85,247,0.25)"
          stroke="#a855f7"
          strokeWidth="2.5"
        />
        <text
          x="175"
          y="42"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize="11.5"
          fontWeight="bold"
          fill="#e9d5ff"
          fontFamily="monospace"
        >
          input({scenario.variable})
        </text>
        <text
          x="175"
          y="59"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize="12.5"
          fontWeight="900"
          fill="#fbcfe8"
          fontFamily="monospace"
        >
          [{sliderVal}{scenario.unit}]
        </text>
        <line
          x1="233"
          y1="50"
          x2="260"
          y2="50"
          stroke="#64748b"
          strokeWidth="2.5"
          markerEnd="url(#mbh-arr-gray)"
        />
      </g>

      {/* ─── 3. REL BUS PENGUMPUL & JALUR AKTIF BERKESINAMBUNGAN KE SELESAI ─── */}
      {/* Rel Bus Default (Garis Putus-putus) */}
      <line
        x1={startX - 6}
        y1={busY}
        x2={cxMerge}
        y2={busY}
        stroke="#334155"
        strokeWidth="2.5"
        strokeDasharray="4 4"
      />

      {/* Jalur Aktif Berkesinambungan: Keluar dari Statement Aktif -> Belok Mulus -> Bus -> Merge Node */}
      {isFlowActive && (
        <g>
          {/* 1. Panah Drop Vertikal dari Bawah Kotak Statement Aktif */}
          <line
            x1={cxActive}
            y1={244}
            x2={cxActive}
            y2={275}
            stroke={activeColor}
            strokeWidth="3.5"
            markerEnd={activeMarker}
          />
          {/* 2. Glow Underlayer (Native SVG tanpa filter, 100% bebas clipping bug) */}
          <path
            d={`M ${cxActive} 275 L ${cxActive} ${busY - 12} Q ${cxActive} ${busY} ${cxActive + 12} ${busY} L ${cxMerge} ${busY}`}
            fill="none"
            stroke={activeColor}
            strokeWidth="8"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />
          {/* 3. Jalur Inti Solid Menyala Terang */}
          <path
            d={`M ${cxActive} 275 L ${cxActive} ${busY - 12} Q ${cxActive} ${busY} ${cxActive + 12} ${busY} L ${cxMerge} ${busY}`}
            fill="none"
            stroke={activeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* 4. Panah Horisontal Mengarah ke Kanan Sepanjang Rel Bus Menuju SELESAI */}
          <line
            x1={cxActive + 12}
            y1={busY}
            x2={Math.min(cxMerge - 10, cxActive + Math.max(35, (cxMerge - cxActive) / 2))}
            y2={busY}
            stroke={activeColor}
            strokeWidth="3.5"
            markerEnd={activeMarker}
          />
        </g>
      )}

      {/* ─── 4. CABANG-CABANG KONDISI BERJEJER KE SAMPING ─── */}
      {branches.map((b, i) => {
        const cx = startX + i * stepX;
        const cy = 50;
        const isHit = activeIndex === i;
        const isPassedFalse = activeIndex > i || (activeIndex === -1 && i < branches.length);
        const isSkipped = activeIndex !== -1 && i > activeIndex;

        return (
          <g key={i} opacity={isStepActive(3 + i) ? (isSkipped ? 0.35 : 1) : 0.2}>
            {/* Belah Ketupat Keputusan ANSI/ISO */}
            <polygon
              points={`${cx},17 ${cx + 70},50 ${cx},83 ${cx - 70},50`}
              fill={isHit ? '#451a03' : isSkipped ? '#18181b' : '#291305'}
              stroke={isHit ? '#fbbf24' : isSkipped ? '#3f3f46' : '#78350f'}
              strokeWidth={isHit ? 3.5 : 2}
              filter={isHit ? 'url(#mbh-glow-diamond)' : undefined}
            />
            {/* Teks Kondisi */}
            <text
              x={cx}
              y={cy - 4}
              dominantBaseline="central"
              textAnchor="middle"
              fill={isHit ? '#fde68a' : isSkipped ? '#52525b' : '#fcd34d'}
              fontSize="13"
              fontWeight="900"
              fontFamily="monospace"
            >
              {b.condLabel}
            </text>

            {/* Dynamic Status Badge */}
            <g transform={`translate(${cx}, ${cy + 33})`}>
              <rect
                x="-42"
                y="-9"
                width="84"
                height="18"
                rx="9"
                fill={isHit ? '#10b981' : isSkipped ? '#27272a' : '#881337'}
              />
              <text
                x="0"
                y="1"
                dominantBaseline="central"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="10"
                fontWeight="bold"
                fontFamily="monospace"
              >
                {isHit ? '✓ TRUE (Ya)' : isSkipped ? '🚫 LEWATI' : '✗ FALSE'}
              </text>
            </g>

            {/* ─── Cabang YA: Menuju ke Bawah (Jajaran Genjang Output) ─── */}
            <line
              x1={cx}
              y1={cy + 42}
              x2={cx}
              y2={186}
              stroke={isHit ? '#10b981' : '#334155'}
              strokeWidth={isHit ? 3.5 : 2}
              markerEnd={isHit ? 'url(#mbh-arr-green)' : 'url(#mbh-arr-gray)'}
            />
            {/* Badge Ya */}
            <rect
              x={cx + 8}
              y={cy + 52}
              width="28"
              height="17"
              rx="4"
              fill={isHit ? '#065f46' : '#1e293b'}
              stroke={isHit ? '#10b981' : '#334155'}
              strokeWidth="1"
            />
            <text
              x={cx + 22}
              y={cy + 60.5}
              dominantBaseline="central"
              textAnchor="middle"
              fill={isHit ? '#6ee7b7' : '#94a3b8'}
              fontSize="9.5"
              fontWeight="bold"
              fontFamily="monospace"
            >
              Ya
            </text>

            {/* Jajaran Genjang Output */}
            <polygon
              points={`${cx - 68},186 ${cx + 80},186 ${cx + 56},244 ${cx - 92},244`}
              fill={isHit ? '#064e3b' : '#0f172a'}
              stroke={isHit ? '#10b981' : '#1e293b'}
              strokeWidth={3}
            />
            <text
              x={cx - 6}
              y={215}
              dominantBaseline="central"
              textAnchor="middle"
              fill={isHit ? '#a7f3d0' : '#475569'}
              fontSize="12.5"
              fontWeight="bold"
              fontFamily="monospace"
            >
              output({b.outputLabel})
            </text>

            {/* Garis Vertikal Non-Aktif dari Output ke Collector Bus */}
            {!isHit && (
              <line
                x1={cx - 6}
                y1={244}
                x2={cx - 6}
                y2={busY}
                stroke="#334155"
                strokeWidth="2"
                strokeDasharray="3 3"
                markerEnd="url(#mbh-arr-gray)"
              />
            )}

            {/* Cabang Tidak (Ke Kanan menuju Kondisi Berikutnya) */}
            {i < branches.length - 1 && (
              <>
                <line
                  x1={cx + 70}
                  y1={cy}
                  x2={cx + stepX - 70}
                  y2={cy}
                  stroke={isPassedFalse ? '#f43f5e' : '#334155'}
                  strokeWidth={isPassedFalse ? 3 : 2}
                  markerEnd={isPassedFalse ? 'url(#mbh-arr-rose)' : 'url(#mbh-arr-gray)'}
                />
                {/* Floating Badge Tidak */}
                <rect
                  x={cx + stepX / 2 - 18}
                  y={cy - 22}
                  width="36"
                  height="16"
                  rx="4"
                  fill={isPassedFalse ? '#881337' : '#1e293b'}
                  stroke={isPassedFalse ? '#f43f5e' : '#334155'}
                  strokeWidth="1"
                />
                <text
                  x={cx + stepX / 2}
                  y={cy - 14}
                  dominantBaseline="central"
                  textAnchor="middle"
                  fill={isPassedFalse ? '#fecdd3' : '#64748b'}
                  fontSize="9.5"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  Tidak
                </text>
              </>
            )}
          </g>
        );
      })}

      {/* ─── 5. CABANG ELSE (DI KOLOM PALING KANAN) ─── */}
      <g opacity={isStepActive(7) ? (isElseHit ? 1 : 0.35) : 0.2}>
        {/* Panah dari Diamond Terakhir berbelok ke Output ELSE */}
        <path
          d={`M ${startX + (branches.length - 1) * stepX + 70} 50 L ${cxElse - 12} 50 Q ${cxElse} 50 ${cxElse} 62 L ${cxElse} 186`}
          fill="none"
          stroke={isElseHit ? '#f43f5e' : '#334155'}
          strokeWidth={isElseHit ? 3.5 : 2}
          markerEnd={isElseHit ? 'url(#mbh-arr-rose)' : 'url(#mbh-arr-gray)'}
        />
        {/* Floating Badge Else di segmen horizontal */}
        <rect
          x={startX + (branches.length - 1) * stepX + 70 + 26}
          y="28"
          width="36"
          height="16"
          rx="4"
          fill={isElseHit ? '#881337' : '#1e293b'}
          stroke={isElseHit ? '#f43f5e' : '#334155'}
          strokeWidth="1"
        />
        <text
          x={startX + (branches.length - 1) * stepX + 70 + 44}
          y="36"
          dominantBaseline="central"
          textAnchor="middle"
          fill={isElseHit ? '#fecdd3' : '#64748b'}
          fontSize="9.5"
          fontWeight="bold"
          fontFamily="monospace"
        >
          Else
        </text>

        {/* Jajaran Genjang ELSE (Sejajar di baris output y = 186) */}
        <polygon
          points={`${cxElse - 68},186 ${cxElse + 80},186 ${cxElse + 56},244 ${cxElse - 92},244`}
          fill={isElseHit ? '#881337' : '#0f172a'}
          stroke={isElseHit ? '#f43f5e' : '#1e293b'}
          strokeWidth={3}
        />
        <text
          x={cxElse - 6}
          y={215}
          dominantBaseline="central"
          textAnchor="middle"
          fill={isElseHit ? '#fecdd3' : '#475569'}
          fontSize="12.5"
          fontWeight="bold"
          fontFamily="monospace"
        >
          output({scenario.elseLabel})
        </text>

        {/* Garis Vertikal Non-Aktif dari Else ke Collector Bus */}
        {!isElseHit && (
          <line
            x1={cxElse - 6}
            y1={244}
            x2={cxElse - 6}
            y2={busY}
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="3 3"
            markerEnd="url(#mbh-arr-gray)"
          />
        )}
      </g>

      {/* ─── 6. MERGE NODE & SELESAI ─── */}
      <g opacity={isFlowActive ? 1 : 0.2}>
        {/* Lingkaran Konektor Penggabung (ANSI/ISO Merge Connector) */}
        <circle
          cx={cxMerge}
          cy={busY}
          r="6"
          fill={isFlowActive ? activeColor : '#64748b'}
          stroke={isFlowActive ? '#ffffff' : '#334155'}
          strokeWidth="1.5"
        />
        {/* Panah dari Merge Node Masuk Tepat ke SELESAI */}
        <line
          x1={cxMerge + 6}
          y1={busY}
          x2={cxSelesai}
          y2={busY}
          stroke={isFlowActive ? activeColor : '#64748b'}
          strokeWidth={isFlowActive ? 3.5 : 2}
          markerEnd={isFlowActive ? activeMarker : 'url(#mbh-arr-gray)'}
        />

        {/* Terminator SELESAI */}
        <rect
          x={cxSelesai}
          y={busY - 20}
          width="96"
          height="40"
          rx="20"
          fill={isFlowActive ? 'rgba(239,68,68,0.25)' : 'rgba(239,68,68,0.1)'}
          stroke={isFlowActive ? '#ef4444' : '#7f1d1d'}
          strokeWidth={isFlowActive ? 3 : 2}
          filter={isFlowActive ? 'url(#mbh-glow-diamond)' : undefined}
        />
        <text
          x={cxSelesai + 48}
          y={busY}
          dominantBaseline="central"
          textAnchor="middle"
          fontSize="13"
          fontWeight="900"
          fill={isFlowActive ? '#fca5a5' : '#991b1b'}
          fontFamily="monospace"
        >
          SELESAI
        </text>
      </g>
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 3. KOMPONEN UTAMA MULTIBRANCHGRADELAB
// ══════════════════════════════════════════════════════════════════════════════
export default function MultiBranchGradeLab() {
  const [scenarioId, setScenarioId] = useState<string>('nilai');
  const [activeTab, setActiveTab] = useState<'naratif' | 'flowchart' | 'pseudocode' | 'kode'>('flowchart');
  const [flowchartOrientation, setFlowchartOrientation] = useState<'vertical' | 'horizontal'>('vertical');
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [isProjectorMode, setIsProjectorMode] = useState<boolean>(false);
  const [activeLang, setActiveLang] = useState<'python' | 'js'>('python');
  const [hazardMode, setHazardMode] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Pada mode Maximize (Proyektor), keputusan wajib berjejer ke samping (horisontal lanskap)
  const effectiveOrientation = isProjectorMode ? 'horizontal' : flowchartOrientation;

  const scenario = SCENARIOS.find(s => s.id === scenarioId)!;
  const [sliderVal, setSliderVal] = useState<number>(scenario.defaultVal);

  const handleScenarioChange = (id: string) => {
    const s = SCENARIOS.find(sc => sc.id === id)!;
    setScenarioId(id);
    setSliderVal(s.defaultVal);
    setHazardMode(false);
    setStep(0);
    setIsRunning(false);
  };

  const branches = hazardMode ? [...scenario.branches].reverse() : scenario.branches;
  const activeBranchIndex = branches.findIndex(b => b.condition(sliderVal));
  const activeBranch = activeBranchIndex !== -1 ? branches[activeBranchIndex] : null;

  const maxSteps = 8;
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

  const getStepDescription = (s: number) => {
    if (s === 1) return 'Terminal MULAI program.';
    if (s === 2) return `Input data masukan: input(${scenario.variable}) = ${sliderVal}${scenario.unit}.`;
    if (s >= 3 && s <= 6) {
      const idx = s - 3;
      const b = branches[idx];
      const isMet = b.condition(sliderVal);
      return `Kondisi ke-${idx + 1} (${b.condStr}) dievaluasi: ${isMet ? '✓ TRUE (Ya) → Cetak output(' + b.outputLabel + ')' : '✗ FALSE (Tidak) → Lanjut ke evaluasi berikutnya.'}`;
    }
    if (s === 7) {
      return activeBranchIndex === -1
        ? `Seluruh kondisi False → Masuk blok Selain itu (ELSE): output(${scenario.elseLabel}).`
        : `Jalur ELSE dilewati karena salah satu kondisi sebelumnya telah bernilai True.`;
    }
    if (s === 8) return 'Alur mencapai rel pengumpul (Merge Node) dan SELESAI.';
    return '';
  };

  const tabs = [
    { id: 'naratif', icon: <FileText className="w-3.5 h-3.5" />, label: 'Naratif' },
    { id: 'flowchart', icon: <GitBranch className="w-3.5 h-3.5" />, label: 'Flowchart' },
    { id: 'pseudocode', icon: <Sparkles className="w-3.5 h-3.5" />, label: 'Pseudocode' },
    { id: 'kode', icon: <Code2 className="w-3.5 h-3.5" />, label: 'Kode Program' },
  ] as const;

  return (
    <div className={`border border-border/60 rounded-3xl overflow-hidden bg-slate-950 shadow-2xl transition-all duration-300 ${
      isProjectorMode ? 'fixed inset-4 z-50 overflow-y-auto bg-slate-950/98 ring-4 ring-orange-500/50 backdrop-blur-2xl p-2' : ''
    }`}>
      {/* ─── Header Lab ─────────────────────────────────────────────────────── */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">1️⃣</span>
          <div>
            <h3 className="font-bold text-sm md:text-base text-slate-100 flex items-center gap-2">
              <span>Lab Percabangan Majemuk (IF – ELIF – ELSE)</span>
              {isProjectorMode && (
                <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-wider animate-pulse">
                  Mode Proyektor Aktif
                </span>
              )}
            </h3>
          </div>
        </div>

        {/* 4 Pilar Tabs Header */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 flex-wrap">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === tab.id
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tombol Maximize / Mode Proyektor */}
          {activeTab === 'flowchart' && (
            <button
              onClick={() => {
                const next = !isProjectorMode;
                setIsProjectorMode(next);
                if (next) setActiveTab('flowchart');
              }}
              className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isProjectorMode
                  ? 'bg-orange-500 text-white border-orange-400 shadow-lg ring-2 ring-orange-400/50'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
              title={isProjectorMode ? 'Kembali ke Tampilan Normal' : 'Mode Layar Penuh Maximize (Keputusan Berjejer ke Samping)'}
            >
              {isProjectorMode ? (
                <>
                  <Minimize2 className="w-4 h-4" />
                  <span className="hidden sm:inline text-[11px]">Tutup Maximize</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4" />
                  <span className="hidden sm:inline text-[11px]">Maximize 16:9</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* ─── Scenario Selector & Orientation Switcher Bar ────────────────────── */}
      <div className="p-3 md:px-6 bg-slate-900/50 border-b border-slate-800/50 flex flex-wrap items-center justify-between gap-3">
        {/* Scenario Chips */}
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.map(sc => (
            <button
              key={sc.id}
              onClick={() => handleScenarioChange(sc.id)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                scenarioId === sc.id
                  ? 'bg-amber-700 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {sc.title}
            </button>
          ))}
        </div>

        {/* Kontrol Khusus Tab Flowchart: Saklar Orientasi & Kontrol Zoom */}
        {activeTab === 'flowchart' && (
          <div className="flex flex-wrap items-center gap-2">
            {/* Orientasi Flowchart */}
            {isProjectorMode ? (
              <div className="flex items-center bg-orange-950/70 border border-orange-500/50 text-orange-200 px-3 py-1.5 rounded-xl text-[11px] font-bold gap-2 shadow-sm">
                <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
                <span>Mode Maximize: Keputusan Berjejer ke Samping</span>
                <span className="text-[10px] bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded border border-orange-500/30 font-mono">Lanskap 16:9</span>
              </div>
            ) : (
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-bold">
                <span className="text-slate-500 px-2 flex items-center gap-1">
                  <Tv className="w-3.5 h-3.5" /> Orientasi:
                </span>
                <button
                  onClick={() => setFlowchartOrientation('vertical')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                    flowchartOrientation === 'vertical'
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Arah Atas ke Bawah: Keputusan Mengalir Vertikal dengan Output Mencabang"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span>Vertikal</span>
                </button>
                <button
                  onClick={() => setFlowchartOrientation('horizontal')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                    flowchartOrientation === 'horizontal'
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Arah Kiri ke Kanan: Keputusan Berjejer ke Samping (Optimal untuk Layar Lebar)"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Horisontal</span>
                </button>
              </div>
            )}

            {/* Kontrol Pembesaran / Zoom */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-bold">
              <span className="text-slate-500 px-2">🔍 Skala:</span>
              {[0.85, 1.0, 1.2, 1.4].map(scale => (
                <button
                  key={scale}
                  onClick={() => setZoomLevel(scale)}
                  className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                    zoomLevel === scale
                      ? 'bg-amber-600 text-white font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {Math.round(scale * 100)}%
                </button>
              ))}
            </div>

            {/* Hazard Mode Switch */}
            <button
              onClick={() => {
                setHazardMode(!hazardMode);
                reset();
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                hazardMode
                  ? 'bg-rose-600 text-white shadow-md animate-pulse'
                  : 'bg-slate-800 text-rose-300 hover:bg-slate-700 border border-rose-900/50'
              }`}
              title="Bandingkan efek urutan benar vs urutan salah"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{hazardMode ? '⚠️ Hazard Aktif' : 'Simulasi Urutan Salah'}</span>
            </button>
          </div>
        )}
      </div>

      {/* ─── Konten Tab ─────────────────────────────────────────────────────── */}
      <div className="p-4 md:p-6">
        {/* 1. TAB NARATIF */}
        {activeTab === 'naratif' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-xl">
              <p className="text-slate-300 text-xs font-medium">
                📝 <strong>Algoritma Naratif Baku</strong> — Disusun dalam satu nomor urut utama dengan anak-cabang <code>Selain itu, jika:</code> dan <code>Selain itu:</code> yang menjorok tanpa nomor baru.
              </p>
            </div>

            <pre className="bg-slate-900 p-5 rounded-2xl border border-slate-800 font-mono text-sm leading-relaxed overflow-x-auto shadow-sm text-slate-300 whitespace-pre">
              <span className="text-slate-400">1. Masukkan nilai {scenario.variable}.</span>{'\n\n'}
              <span className="font-bold text-amber-300">2. Jika {branches[0].condStr} maka:</span>{'\n'}
              <span className="text-emerald-300">      Tampilkan {branches[0].outputLabel} ke layar.</span>{'\n'}
              <span className="font-bold text-amber-300">   Selain itu, jika {branches[1].condStr} maka:</span>{'\n'}
              <span className="text-sky-300">      Tampilkan {branches[1].outputLabel} ke layar.</span>{'\n'}
              <span className="font-bold text-amber-300">   Selain itu, jika {branches[2].condStr} maka:</span>{'\n'}
              <span className="text-amber-300">      Tampilkan {branches[2].outputLabel} ke layar.</span>{'\n'}
              <span className="font-bold text-amber-300">   Selain itu, jika {branches[3].condStr} maka:</span>{'\n'}
              <span className="text-orange-300">      Tampilkan {branches[3].outputLabel} ke layar.</span>{'\n'}
              <span className="font-bold text-amber-300">   Selain itu:</span>{'\n'}
              <span className="text-rose-300">      Tampilkan {scenario.elseLabel} ke layar.</span>{'\n\n'}
              <span className="text-slate-400">Selesai.</span>
            </pre>

            {/* Perbandingan Struktur Percabangan */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-900 border border-emerald-600/30 rounded-xl">
                <p className="text-xs font-bold text-emerald-400 mb-1.5">✅ IF Tunggal</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Tepat <strong>1 kondisi</strong> dan <strong>1 aksi</strong>. Jika kondisi False, program melompat tanpa ada aksi cadangan.
                </p>
              </div>
              <div className="p-3 bg-slate-900 border border-amber-600/30 rounded-xl">
                <p className="text-xs font-bold text-amber-400 mb-1.5">✅ IF-ELSE (Ganda)</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Tepat <strong>2 cabang alternatif</strong>. Menjamin salah satu dari 2 aksi pasti dieksekusi komputer.
                </p>
              </div>
              <div className="p-3 bg-slate-900 border border-purple-600/30 rounded-xl">
                <p className="text-xs font-bold text-purple-400 mb-1.5">✅ IF-ELIF-ELSE (Majemuk)</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Mendukung <strong>3 atau lebih pilihan mutually exclusive</strong>. Begitu satu cabang True, percabangan di bawahnya diabaikan (short-circuit).
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. TAB FLOWCHART (STACKED LANDSCAPE ARCHITECTURE) */}
        {activeTab === 'flowchart' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">


            {/* ─── ZONA ATAS: KANVAS FLOWCHART LEBAR & ZOOMABLE ─── */}
            <div className={`w-full flex flex-col items-center justify-center p-4 md:p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-inner overflow-x-auto ${effectiveOrientation === 'horizontal' ? 'min-h-[380px]' : 'min-h-[480px]'}`}>
              <div
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  width: '100%',
                }}
              >
                {effectiveOrientation === 'vertical' && (
                  <MultiBranchVerticalFlowchart
                    scenario={scenario}
                    sliderVal={sliderVal}
                    hazardMode={hazardMode}
                    step={step}
                  />
                )}
                {effectiveOrientation === 'horizontal' && (
                  <MultiBranchHorizontalFlowchart
                    scenario={scenario}
                    sliderVal={sliderVal}
                    hazardMode={hazardMode}
                    step={step}
                  />
                )}
              </div>
            </div>

            {/* ─── ZONA BAWAH: CONTROL DOCK TERPADU & TIDAK TERPOTONG ─── */}
            <div className="p-4 md:p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* 1. Kontrol Slider & Preset */}
                <div className="md:col-span-7 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-slate-300 flex items-center gap-1.5">
                      <span>Nilai Input (<code className="text-amber-400 font-bold">{scenario.variable}</code>):</span>
                    </span>
                    <span className="font-mono font-black text-amber-400 text-xl px-3.5 py-0.5 rounded-xl bg-slate-950 border border-amber-500/40">
                      {sliderVal}{scenario.unit}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={scenario.min}
                    max={scenario.max}
                    value={sliderVal}
                    onChange={e => {
                      setSliderVal(Number(e.target.value));
                      reset();
                    }}
                    className="w-full accent-amber-500 cursor-pointer h-2.5 bg-slate-800 rounded-lg"
                  />

                  {/* Preset Nilai Cepat */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] text-slate-400 font-mono font-bold mr-1">Preset Cepat:</span>
                      {scenario.presets.map(pv => (
                        <button
                          key={pv}
                          onClick={() => {
                            setSliderVal(pv);
                            reset();
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                            sliderVal === pv
                              ? 'bg-amber-600 text-white shadow-sm'
                              : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                          }`}
                        >
                          {pv}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      Rentang: {scenario.min} – {scenario.max}
                    </span>
                  </div>
                </div>

                {/* 2. Tombol Aksi Animasi: Mode Otomatis & Mode Manual */}
                <div className="md:col-span-5 flex items-center gap-2">
                  <button
                    onClick={runAnimation}
                    className={`flex-1 flex items-center justify-center gap-2 px-3.5 py-3 rounded-2xl text-xs md:text-sm font-black transition-all cursor-pointer shadow-lg ${
                      isRunning
                        ? 'bg-amber-500 text-white shadow-amber-900/50 animate-pulse'
                        : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950/40'
                    }`}
                    title={isRunning ? 'Jeda simulasi otomatis' : 'Jalankan seluruh langkah secara otomatis'}
                  >
                    {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isRunning ? 'Jeda Otomatis' : 'Mode Otomatis'}</span>
                  </button>

                  <button
                    onClick={nextStep}
                    className={`flex-1 flex items-center justify-center gap-2 px-3.5 py-3 rounded-2xl text-xs md:text-sm font-black transition-all cursor-pointer shadow-lg border ${
                      step > 0 && !isRunning
                        ? 'bg-sky-600 hover:bg-sky-500 text-white border-sky-400/60 shadow-sky-950/40 ring-2 ring-sky-400/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white border-slate-700 shadow-md'
                    }`}
                    title="Maju langkah demi langkah (Step-by-Step) sambil menjelaskan materi"
                  >
                    <StepForward className="w-4 h-4" />
                    <span>
                      {step === 0 || isRunning ? 'Mode Manual' : `Langkah (${step}/${maxSteps})`}
                    </span>
                  </button>

                  <button
                    onClick={reset}
                    className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-bold transition-all cursor-pointer border border-slate-800 hover:border-slate-700 shadow-md shrink-0"
                    title="Reset ke Tampilan Penuh (Semua Alur)"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bilah Edukasi Mode Manual / Langkah Aktif */}
              {step > 0 && (
                <div className="p-3 rounded-2xl bg-sky-950/70 border border-sky-600/50 text-sky-200 text-xs flex flex-wrap items-center justify-between gap-3 shadow-md font-mono">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded-lg bg-sky-500/20 text-sky-300 font-black border border-sky-500/30 text-[11px] shrink-0">
                      {isRunning ? '🤖 OTOMATIS' : '👤 MANUAL'} • Langkah {step}/{maxSteps}
                    </span>
                    <span className="font-sans font-semibold text-slate-100">
                      {getStepDescription(step)}
                    </span>
                  </div>
                  {!isRunning && (
                    <span className="text-[11px] text-sky-300/80 font-bold shrink-0">
                      {step === maxSteps ? '✓ Selesai' : 'Klik "Mode Manual" untuk lanjut →'}
                    </span>
                  )}
                </div>
              )}

              {/* 3. Pita Evaluasi Status Live — Widescreen, Jelas & Bebas Terpotong */}
              <div className={`p-4 rounded-2xl border-2 text-xs font-bold flex flex-wrap items-center justify-between gap-3 shadow-md ${
                activeBranch
                  ? 'border-emerald-500/80 bg-emerald-950/70 text-emerald-200'
                  : 'border-rose-500/80 bg-rose-950/70 text-rose-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl text-base ${
                    activeBranch ? 'bg-emerald-900/80 text-emerald-300' : 'bg-rose-900/80 text-rose-300'
                  }`}>
                    {activeBranch ? '✓' : '✗'}
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                      Hasil Evaluasi Komputer (Runtime Live):
                    </div>
                    <div className="text-sm md:text-base font-black font-mono text-white pt-0.5">
                      {activeBranch ? (
                        <span>
                          Kondisi Terpenuhi: <span className="text-amber-300">{activeBranch.condStr}</span>
                        </span>
                      ) : (
                        <span>
                          Seluruh Kondisi Terlewati (False) $\rightarrow$ Eksekusi Blok <span className="text-rose-300 font-bold">ELSE</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`px-4 py-2 rounded-xl text-sm font-black font-mono shadow-md border ${
                  activeBranch
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                    : 'bg-rose-600 text-white border-rose-400'
                }`}>
                  {activeBranch
                    ? `✓ Hasil: ${activeBranch.outputLabel.replace(/"/g, '')}`
                    : `✓ Hasil: ${scenario.elseLabel.replace(/"/g, '')}`}
                </div>
              </div>

              {/* Peringatan Bahaya Logika jika Mode Hazard Aktif */}
              {hazardMode && (
                <div className="p-3 bg-rose-950/80 rounded-2xl border border-rose-600 text-xs text-rose-200 flex items-start gap-2.5 shadow-md">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>BAHAYA URUTAN LOGIKA (ORDER HAZARD):</strong> Kondisi paling longgar dievaluasi di awal. 
                    Karena nilai <strong>{sliderVal}</strong> memenuhi kondisi awal yang longgar, komputer langsung melompat keluar (short-circuit) tanpa sempat memeriksa kondisi yang lebih spesifik!
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* 3. TAB PSEUDOCODE */}
        {activeTab === 'pseudocode' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-xl">
              <p className="text-slate-300 text-xs font-medium">
                📋 <strong>Pseudocode Standar Buku Teks (CLRS)</strong> — Format baku 3 blok dengan kata kunci <code>if ... then</code>, <code>else if ... then</code>, dan <code>else ... endif</code>.
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-xs text-slate-400 font-mono">pseudocode — IF - ELSE IF - ELSE</span>
                </div>
              </div>
              <pre className="p-5 text-sm font-mono text-slate-200 leading-relaxed whitespace-pre overflow-x-auto">
                <span className="text-purple-400 font-bold">PROGRAM</span> <span className="text-white font-semibold">{scenarioId === 'nilai' ? 'PenentuIndeksNilai' : scenarioId === 'tiket' ? 'TarifTiketWisata' : 'TarifPajakProgresif'}</span>{'\n'}
                <span className="text-slate-500 italic text-xs">// Evaluasi bertingkat saling lepas (mutually exclusive)</span>{'\n\n'}
                <span className="text-sky-400 font-bold">KAMUS:</span>{'\n'}
                <span className="text-slate-300">  {scenario.variable} : integer</span>{'\n\n'}
                <span className="text-amber-400 font-bold">ALGORITMA:</span>{'\n'}
                <span className="text-slate-300">  input({scenario.variable})</span>{'\n'}
                <span className="text-amber-300 font-bold">  if</span> <span className="text-amber-100 font-bold">{branches[0].condStr}</span> <span className="text-amber-300 font-bold">then</span>{'\n'}
                <span className="text-emerald-300 font-medium">    output({branches[0].outputLabel})</span>{'\n'}
                <span className="text-amber-300 font-bold">  else if</span> <span className="text-amber-100 font-bold">{branches[1].condStr}</span> <span className="text-amber-300 font-bold">then</span>{'\n'}
                <span className="text-sky-300 font-medium">    output({branches[1].outputLabel})</span>{'\n'}
                <span className="text-amber-300 font-bold">  else if</span> <span className="text-amber-100 font-bold">{branches[2].condStr}</span> <span className="text-amber-300 font-bold">then</span>{'\n'}
                <span className="text-amber-300 font-medium">    output({branches[2].outputLabel})</span>{'\n'}
                <span className="text-amber-300 font-bold">  else if</span> <span className="text-amber-100 font-bold">{branches[3].condStr}</span> <span className="text-amber-300 font-bold">then</span>{'\n'}
                <span className="text-orange-300 font-medium">    output({branches[3].outputLabel})</span>{'\n'}
                <span className="text-amber-300 font-bold">  else</span>{'\n'}
                <span className="text-rose-300 font-medium">    output({scenario.elseLabel})</span>{'\n'}
                <span className="text-amber-300 font-bold">  endif</span>{'\n'}
                <span className="text-slate-400">  output(&quot;Program selesai.&quot;)</span>
              </pre>
            </div>
          </motion.div>
        )}

        {/* 4. TAB KODE PROGRAM */}
        {activeTab === 'kode' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-xl flex items-center justify-between flex-wrap gap-2">
              <p className="text-slate-300 text-xs font-medium">
                💻 <strong>Kode Program Eksekusi Langsung</strong> — Perhatikan perbedaan kata kunci <code>elif</code> pada Python vs <code>else if</code> pada JavaScript.
              </p>
            </div>

            {/* Language Selector */}
            <div className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700 w-fit">
              {(['python', 'js'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeLang === lang
                      ? lang === 'python'
                        ? 'bg-blue-600 text-white'
                        : 'bg-yellow-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lang === 'python' ? '🐍 Python' : '⚡ JavaScript'}
                </button>
              ))}
            </div>

            {/* Slider Live Input Sync */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Nilai <code className="text-amber-400 font-mono">{scenario.variable}</code>:</span>
                <span className="font-mono font-bold text-white text-base">
                  {sliderVal}{scenario.unit}
                </span>
              </div>
              <input
                type="range"
                min={scenario.min}
                max={scenario.max}
                value={sliderVal}
                onChange={e => {
                  setSliderVal(Number(e.target.value));
                  reset();
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Code Block Container */}
            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {activeLang === 'python' ? 'percabangan_majemuk.py' : 'percabanganMajemuk.js'}
                  </span>
                </div>
              </div>
              <pre className="p-5 text-sm font-mono text-slate-200 leading-relaxed overflow-x-auto">
                {activeLang === 'python' ? (
                  <>
                    <span className="text-slate-400">{scenario.variable} = {sliderVal}</span>{'\n\n'}
                    <span className="text-amber-300 font-bold">if {branches[0].condStr}:</span>{'\n'}
                    <span className="text-emerald-300 font-medium">    print({branches[0].outputLabel}){'\n'}</span>
                    <span className="text-amber-300 font-bold">elif {branches[1].condStr}:</span>{'\n'}
                    <span className="text-sky-300 font-medium">    print({branches[1].outputLabel}){'\n'}</span>
                    <span className="text-amber-300 font-bold">elif {branches[2].condStr}:</span>{'\n'}
                    <span className="text-amber-300 font-medium">    print({branches[2].outputLabel}){'\n'}</span>
                    <span className="text-amber-300 font-bold">elif {branches[3].condStr}:</span>{'\n'}
                    <span className="text-orange-300 font-medium">    print({branches[3].outputLabel}){'\n'}</span>
                    <span className="text-amber-300 font-bold">else:</span>{'\n'}
                    <span className="text-rose-300 font-medium">    print({scenario.elseLabel}){'\n\n'}</span>
                    <span className="text-slate-400">print(&quot;Pemeriksaan selesai.&quot;)</span>
                  </>
                ) : (
                  <>
                    <span className="text-slate-400">const {scenario.variable} = {sliderVal};</span>{'\n\n'}
                    <span className="text-amber-300 font-bold">if ({branches[0].condStr}) {'{'}</span>{'\n'}
                    <span className="text-emerald-300 font-medium">    console.log({branches[0].outputLabel});{'\n'}</span>
                    <span className="text-amber-300 font-bold">{'}'} else if ({branches[1].condStr}) {'{'}</span>{'\n'}
                    <span className="text-sky-300 font-medium">    console.log({branches[1].outputLabel});{'\n'}</span>
                    <span className="text-amber-300 font-bold">{'}'} else if ({branches[2].condStr}) {'{'}</span>{'\n'}
                    <span className="text-amber-300 font-medium">    console.log({branches[2].outputLabel});{'\n'}</span>
                    <span className="text-amber-300 font-bold">{'}'} else if ({branches[3].condStr}) {'{'}</span>{'\n'}
                    <span className="text-orange-300 font-medium">    console.log({branches[3].outputLabel});{'\n'}</span>
                    <span className="text-amber-300 font-bold">{'}'} else {'{'}</span>{'\n'}
                    <span className="text-rose-300 font-medium">    console.log({scenario.elseLabel});{'\n'}</span>
                    <span className="text-amber-300 font-bold">{'}'}</span>{'\n\n'}
                    <span className="text-slate-400">console.log(&quot;Pemeriksaan selesai.&quot;);</span>
                  </>
                )}
              </pre>
            </div>

            {/* Live Terminal Output Simulator */}
            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <span className="text-xs text-amber-400 font-bold font-mono">Hasil Output Program</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  activeBranch 
                    ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300' 
                    : 'bg-rose-950 border border-rose-500/40 text-rose-300'
                }`}>
                  {activeBranch ? `✔ Cabang ${activeBranch.outputLabel.replace(/"/g, '')}` : '✖ Cabang ELSE'}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <p className={`text-sm font-mono font-bold ${activeBranch ? 'text-emerald-300' : 'text-rose-300'}`}>
                  &gt; {activeBranch ? activeBranch.outputLabel.replace(/"/g, '') : scenario.elseLabel.replace(/"/g, '')}
                </p>
                <p className="text-slate-500 text-xs font-mono">&gt; Program selesai.</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
