"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, FileText, GitBranch, Code2, Sparkles } from 'lucide-react';

// ── Skenario ──────────────────────────────────────────────────────────────────
interface IEScenario {
  id: string;
  title: string;
  variable: string;
  unit: string;
  conditionLabel: string;
  condition: (v: number) => boolean;
  conditionStr: string;
  trueLabel: string;
  falseLabel: string;
  flowchartTrueLines: [string, string];
  flowchartFalseLines: [string, string];
  min: number;
  max: number;
  defaultVal: number;
  narrative: string;
  pseudocode: string;
  pythonCode: (v: number) => string;
  jsCode: (v: number) => string;
}

const SCENARIOS: IEScenario[] = [
  {
    id: 'kelulusan',
    title: 'Penentu Kelulusan',
    variable: 'nilai',
    unit: '',
    conditionLabel: 'nilai ≥ 75?',
    condition: v => v >= 75,
    conditionStr: 'nilai >= 75',
    trueLabel: '"Selamat, Anda LULUS!"',
    falseLabel: '"Maaf, Anda TIDAK LULUS."',
    flowchartTrueLines: ['output("Selamat,', 'Anda LULUS!")'],
    flowchartFalseLines: ['output("Maaf, Anda', 'TIDAK LULUS.")'],
    min: 0,
    max: 100,
    defaultVal: 60,
    narrative: `1. Masukkan nilai ujian.
2. Jika nilai >= 75 maka:
      Tampilkan "Selamat, Anda LULUS!" ke layar.
   Selain itu:
      Tampilkan "Maaf, Anda TIDAK LULUS." ke layar.
3. Tampilkan nilai ujian ke layar.`,
    pseudocode: `PROGRAM PenentuKelulusan
// Menentukan status kelulusan berdasarkan nilai ujian

KAMUS:
  nilai : integer

ALGORITMA:
  input(nilai)
  if nilai >= 75 then
    output("Selamat, Anda LULUS!")
  else
    output("Maaf, Anda TIDAK LULUS.")
  endif`,
    pythonCode: v => `# Python — Percabangan Statemen Ganda (IF-ELSE)
nilai = ${v}

if nilai >= 75:
    print("Selamat, Anda LULUS!")
else:
    print("Maaf, Anda TIDAK LULUS.")

print(f"Nilai Anda: {nilai}/100")`,
    jsCode: v => `// JavaScript — Percabangan Statemen Ganda (IF-ELSE)
const nilai = ${v};

if (nilai >= 75) {
    console.log("Selamat, Anda LULUS!");
} else {
    console.log("Maaf, Anda TIDAK LULUS.");
}

console.log(\`Nilai Anda: \${nilai}/100\`);`,
  },
  {
    id: 'tiket',
    title: 'Harga Tiket (Dewasa/Anak)',
    variable: 'usia',
    unit: ' thn',
    conditionLabel: 'usia >= 12?',
    condition: v => v >= 12,
    conditionStr: 'usia >= 12',
    trueLabel: '"Tiket Dewasa: Rp50.000"',
    falseLabel: '"Tiket Anak: Rp25.000"',
    flowchartTrueLines: ['output("Tiket Dewasa:', 'Rp50.000")'],
    flowchartFalseLines: ['output("Tiket Anak:', 'Rp25.000")'],
    min: 1,
    max: 60,
    defaultVal: 8,
    narrative: `1. Masukkan nilai usia pengunjung.
2. Jika usia >= 12 maka:
      Tetapkan hargaTiket = 50000.
      Tampilkan "Tiket Dewasa: Rp50.000" ke layar.
   Selain itu:
      Tetapkan hargaTiket = 25000.
      Tampilkan "Tiket Anak: Rp25.000" ke layar.
3. Tampilkan usia pengunjung ke layar.`,
    pseudocode: `PROGRAM HargaTiket
// Menghitung dan menetapkan tarif tiket berdasarkan kategori usia

KAMUS:
  usia : integer
  hargaTiket : integer

ALGORITMA:
  input(usia)
  if usia >= 12 then
    hargaTiket = 50000
    output("Tiket Dewasa: Rp", hargaTiket)
  else
    hargaTiket = 25000
    output("Tiket Anak: Rp", hargaTiket)
  endif`,
    pythonCode: v => `# Python — Percabangan Statemen Ganda (IF-ELSE)
usia = ${v}

if usia >= 12:
    harga_tiket = 50000
    print(f"Tiket Dewasa: Rp{harga_tiket:,}")
else:
    harga_tiket = 25000
    print(f"Tiket Anak: Rp{harga_tiket:,}")

print(f"Usia pengunjung: {usia} tahun")`,
    jsCode: v => `// JavaScript — Percabangan Statemen Ganda (IF-ELSE)
const usia = ${v};

let hargaTiket;
if (usia >= 12) {
    hargaTiket = 50000;
    console.log(\`Tiket Dewasa: Rp\${hargaTiket.toLocaleString()}\`);
} else {
    hargaTiket = 25000;
    console.log(\`Tiket Anak: Rp\${hargaTiket.toLocaleString()}\`);
}

console.log(\`Usia pengunjung: \${usia} tahun\`);`,
  },
  {
    id: 'saldo',
    title: 'Cek Saldo ATM',
    variable: 'saldo',
    unit: ' rb',
    conditionLabel: 'saldo >= tarik?',
    condition: v => v >= 200,
    conditionStr: 'saldo >= jumlahTarik',
    trueLabel: '"Transaksi berhasil!"',
    falseLabel: '"Saldo tidak mencukupi!"',
    flowchartTrueLines: ['output("Transaksi', 'berhasil!")'],
    flowchartFalseLines: ['output("Saldo tidak', 'mencukupi!")'],
    min: 50,
    max: 500,
    defaultVal: 150,
    narrative: `1. Masukkan nilai saldo dan jumlahTarik.
2. Jika saldo >= jumlahTarik maka:
      Hitung sisaSaldo = saldo - jumlahTarik.
      Tampilkan "Transaksi berhasil! Sisa saldo: Rp" dan sisaSaldo ke layar.
   Selain itu:
      Tampilkan "Saldo tidak mencukupi!" ke layar.
3. Program selesai.`,
    pseudocode: `PROGRAM CekSaldoATM
// Memvalidasi saldo rekening sebelum melakukan transaksi penarikan uang

KAMUS:
  saldo, jumlahTarik : integer
  sisaSaldo : integer

ALGORITMA:
  input(saldo)
  input(jumlahTarik)
  if saldo >= jumlahTarik then
    sisaSaldo = saldo - jumlahTarik
    output("Transaksi berhasil! Sisa saldo: Rp", sisaSaldo)
  else
    output("Saldo tidak mencukupi!")
  endif`,
    pythonCode: v => `# Python — Percabangan Statemen Ganda (IF-ELSE)
saldo = ${v * 1000}
jumlah_tarik = 200000  # Ingin menarik Rp200.000

if saldo >= jumlah_tarik:
    sisa_saldo = saldo - jumlah_tarik
    print("✅ Transaksi berhasil!")
    print(f"Sisa saldo: Rp{sisa_saldo:,}")
else:
    print("❌ Saldo tidak mencukupi!")
    print(f"Saldo Anda: Rp{saldo:,}")`,
    jsCode: v => `// JavaScript — Percabangan Statemen Ganda (IF-ELSE)
const saldo = ${v * 1000};
const jumlahTarik = 200000; // Ingin menarik Rp200.000

if (saldo >= jumlahTarik) {
    const sisaSaldo = saldo - jumlahTarik;
    console.log("✅ Transaksi berhasil!");
    console.log(\`Sisa saldo: Rp\${sisaSaldo.toLocaleString()}\`);
} else {
    console.log("❌ Saldo tidak mencukupi!");
    console.log(\`Saldo Anda: Rp\${saldo.toLocaleString()}\`);
}`,
  },
];

// ── SVG Flowchart IF-ELSE (ANSI/ISO Standard High-Contrast) ──────────────────
function IfElseFlowchart({
  conditionLabel,
  trueLines,
  falseLines,
  inputVar,
  conditionMet,
  step,
}: {
  conditionLabel: string;
  trueLines: [string, string];
  falseLines: [string, string];
  inputVar: string;
  conditionMet: boolean;
  step: number;
}) {
  const isIdle = step === 0;

  const hl = (s: number, branch?: 'true' | 'false') => {
    if (isIdle) return { opacity: 0.95 };
    if (step < s) return { opacity: 0.25 };
    if (branch === 'true' && !conditionMet) return { opacity: 0.25 };
    if (branch === 'false' && conditionMet) return { opacity: 0.25 };
    return { opacity: 1 };
  };

  const isTrueActive = isIdle || (step >= 4 && conditionMet);
  const isTrueSkipped = step >= 4 && !conditionMet;
  const isFalseActive = isIdle || (step >= 4 && !conditionMet);
  const isFalseSkipped = step >= 4 && conditionMet;

  return (
    <svg
      viewBox="0 0 480 520"
      className="w-full max-w-[460px] mx-auto select-none"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <marker id="a0" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" className="fill-slate-600 dark:fill-slate-400" />
        </marker>
        <marker id="aY" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#047857" className="dark:fill-emerald-400" />
        </marker>
        <marker id="aN" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#be123c" className="dark:fill-rose-400" />
        </marker>
      </defs>

      {/* 1. START — Kapsul Solid Emerald High Contrast */}
      <g style={hl(1)} className="transition-all duration-300">
        <rect
          x="170"
          y="10"
          width="140"
          height="36"
          rx="18"
          fill="#047857"
          stroke="#064e3b"
          strokeWidth="2.5"
        />
        <text
          x="240"
          y="33"
          textAnchor="middle"
          fontSize="12"
          fill="#ffffff"
          fontWeight="900"
          letterSpacing="1"
        >
          MULAI
        </text>
      </g>
      <line
        x1="240"
        y1="46"
        x2="240"
        y2="78"
        className="stroke-slate-600 dark:stroke-slate-400 transition-all duration-300"
        strokeWidth="2"
        markerEnd="url(#a0)"
        style={hl(2)}
      />

      {/* 2. INPUT — Jajaran Genjang Sejati Solid Purple */}
      <g style={hl(2)} className="transition-all duration-300">
        <polygon
          points="155,78 335,78 321,114 141,114"
          fill="#7e22ce"
          stroke="#581c87"
          strokeWidth="2.5"
        />
        <text
          x="238"
          y="101"
          textAnchor="middle"
          fontSize="11"
          fill="#ffffff"
          fontWeight="900"
          fontFamily="monospace"
        >
          input({inputVar})
        </text>
      </g>
      <line
        x1="240"
        y1="114"
        x2="240"
        y2="148"
        className="stroke-slate-600 dark:stroke-slate-400 transition-all duration-300"
        strokeWidth="2"
        markerEnd="url(#a0)"
        style={hl(3)}
      />

      {/* 3. DIAMOND DECISION (ANSI Standard High Contrast) */}
      <g style={hl(3)} className="transition-all duration-300">
        <polygon
          points="240,148 348,198 240,248 132,198"
          fill="#451a03"
          stroke="#f59e0b"
          strokeWidth="2.5"
        />
        <text
          x="240"
          y={step >= 3 ? 190 : 202}
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fontFamily="monospace"
          fill="#fde68a"
        >
          {conditionLabel}
        </text>
        {/* Dynamic Evaluation Badge */}
        {step >= 3 && (
          <g>
            <rect
              x={175}
              y={204}
              width="130"
              height="20"
              rx="10"
              fill={conditionMet ? '#047857' : '#be123c'}
              stroke={conditionMet ? '#34d399' : '#f87171'}
              strokeWidth="1.5"
            />
            <text
              x={240}
              y={218}
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#ffffff"
            >
              {conditionMet ? '✓ TRUE (Ya)' : '✗ FALSE (Tidak)'}
            </text>
          </g>
        )}
      </g>

      {/* 4. CABANG YA (Kiri - Hijau Emerald) */}
      <g style={hl(4, 'true')} className="transition-all duration-300">
        {/* Horizontal out to left */}
        <line
          x1="132"
          y1="198"
          x2="88"
          y2="198"
          stroke="#047857"
          strokeWidth={isTrueActive && !isIdle ? 3.5 : 2.5}
          strokeDasharray={isTrueSkipped ? '4 3' : undefined}
        />
        <text
          x="110"
          y="190"
          textAnchor="middle"
          fontSize="12"
          fill="#047857"
          className="dark:fill-emerald-400"
          fontWeight="900"
        >
          Ya
        </text>
        {/* Vertical down into True parallelogram */}
        <line
          x1="88"
          y1="198"
          x2="88"
          y2="300"
          stroke="#047857"
          strokeWidth={isTrueActive && !isIdle ? 3.5 : 2.5}
          strokeDasharray={isTrueSkipped ? '4 3' : undefined}
          markerEnd="url(#aY)"
        />

        {/* Jajaran Genjang Output True Solid Emerald (Wider & Taller: 156x48px) */}
        <polygon
          points="17,300 173,300 159,348 3,348"
          fill="#047857"
          stroke="#064e3b"
          strokeWidth={isTrueActive && !isIdle ? 3 : 2.5}
        />
        <text
          x="88"
          y="318"
          textAnchor="middle"
          fontSize="9.5"
          fill="#ffffff"
          fontWeight="900"
          fontFamily="monospace"
        >
          {trueLines[0]}
        </text>
        <text
          x="88"
          y="335"
          textAnchor="middle"
          fontSize="9.5"
          fill="#ffffff"
          fontWeight="900"
          fontFamily="monospace"
        >
          {trueLines[1]}
        </text>

        {/* Branch Execution Badge */}
        {step >= 4 && (
          <g>
            <rect
              x={44}
              y={358}
              width="88"
              height="18"
              rx="9"
              fill={conditionMet ? '#064e3b' : '#334155'}
              stroke={conditionMet ? '#34d399' : '#64748b'}
              strokeWidth="1.2"
            />
            <text
              x={88}
              y={370}
              textAnchor="middle"
              fontSize="8"
              fontWeight="900"
              fill="#ffffff"
            >
              {conditionMet ? '✓ DIJALANKAN' : '🚫 DILEWATI'}
            </text>
          </g>
        )}

        {/* Path down to merge point */}
        <line
          x1="88"
          y1="348"
          x2="88"
          y2="430"
          stroke="#047857"
          strokeWidth={isTrueActive && !isIdle ? 3.5 : 2.5}
          strokeDasharray={isTrueSkipped ? '4 3' : undefined}
        />
        <line
          x1="88"
          y1="430"
          x2="240"
          y2="430"
          stroke="#047857"
          strokeWidth={isTrueActive && !isIdle ? 3.5 : 2.5}
          strokeDasharray={isTrueSkipped ? '4 3' : undefined}
        />
      </g>

      {/* 5. CABANG TIDAK (Kanan - Merah Rose) */}
      <g style={hl(4, 'false')} className="transition-all duration-300">
        {/* Horizontal out to right */}
        <line
          x1="348"
          y1="198"
          x2="392"
          y2="198"
          stroke="#be123c"
          strokeWidth={isFalseActive && !isIdle ? 3.5 : 2.5}
          strokeDasharray={isFalseSkipped ? '4 3' : undefined}
        />
        <text
          x="370"
          y="190"
          textAnchor="middle"
          fontSize="12"
          fill="#be123c"
          className="dark:fill-rose-400"
          fontWeight="900"
        >
          Tidak
        </text>
        {/* Vertical down into False parallelogram */}
        <line
          x1="392"
          y1="198"
          x2="392"
          y2="300"
          stroke="#be123c"
          strokeWidth={isFalseActive && !isIdle ? 3.5 : 2.5}
          strokeDasharray={isFalseSkipped ? '4 3' : undefined}
          markerEnd="url(#aN)"
        />

        {/* Jajaran Genjang Output False Solid Rose (Wider & Taller: 156x48px) */}
        <polygon
          points="321,300 477,300 463,348 307,348"
          fill="#be123c"
          stroke="#881337"
          strokeWidth={isFalseActive && !isIdle ? 3 : 2.5}
        />
        <text
          x="392"
          y="318"
          textAnchor="middle"
          fontSize="9.5"
          fill="#ffffff"
          fontWeight="900"
          fontFamily="monospace"
        >
          {falseLines[0]}
        </text>
        <text
          x="392"
          y="335"
          textAnchor="middle"
          fontSize="9.5"
          fill="#ffffff"
          fontWeight="900"
          fontFamily="monospace"
        >
          {falseLines[1]}
        </text>

        {/* Branch Execution Badge */}
        {step >= 4 && (
          <g>
            <rect
              x={348}
              y={358}
              width="88"
              height="18"
              rx="9"
              fill={!conditionMet ? '#881337' : '#334155'}
              stroke={!conditionMet ? '#f87171' : '#64748b'}
              strokeWidth="1.2"
            />
            <text
              x={392}
              y={370}
              textAnchor="middle"
              fontSize="8"
              fontWeight="900"
              fill="#ffffff"
            >
              {!conditionMet ? '✓ DIJALANKAN' : '🚫 DILEWATI'}
            </text>
          </g>
        )}

        {/* Path down to merge point */}
        <line
          x1="392"
          y1="348"
          x2="392"
          y2="430"
          stroke="#be123c"
          strokeWidth={isFalseActive && !isIdle ? 3.5 : 2.5}
          strokeDasharray={isFalseSkipped ? '4 3' : undefined}
        />
        <line
          x1="392"
          y1="430"
          x2="240"
          y2="430"
          stroke="#be123c"
          strokeWidth={isFalseActive && !isIdle ? 3.5 : 2.5}
          strokeDasharray={isFalseSkipped ? '4 3' : undefined}
        />
      </g>

      {/* 6. TITIK PENYATUAN & FLOW KE SELESAI */}
      <circle cx="240" cy="430" r="3.5" fill="#334155" className="dark:fill-slate-400" />
      <line
        x1="240"
        y1="430"
        x2="240"
        y2="464"
        stroke="#334155"
        className="dark:stroke-slate-400 transition-all duration-300"
        strokeWidth="2"
        markerEnd="url(#a0)"
        style={hl(5)}
      />

      {/* 7. END — Kapsul Merah Solid Rose High Contrast */}
      <g style={hl(5)} className="transition-all duration-300">
        <rect
          x="170"
          y="464"
          width="140"
          height="36"
          rx="18"
          fill="#be123c"
          stroke="#881337"
          strokeWidth="2.5"
        />
        <text
          x="240"
          y="487"
          textAnchor="middle"
          fontSize="12"
          fill="#ffffff"
          fontWeight="900"
          letterSpacing="1"
        >
          SELESAI
        </text>
      </g>
    </svg>
  );
}

// ── Komponen Utama ────────────────────────────────────────────────────────────
export default function IfElseLab() {
  const [scenarioId, setScenarioId] = useState('kelulusan');
  const [activeTab, setActiveTab] = useState<'naratif' | 'flowchart' | 'pseudocode' | 'kode'>('flowchart');
  const [activeLang, setActiveLang] = useState<'python' | 'js'>('python');
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<{ conditionMet: boolean } | null>(null);

  const scenario = SCENARIOS.find(s => s.id === scenarioId)!;
  const [sliderVal, setSliderVal] = useState(scenario.defaultVal);

  const handleScenarioChange = (id: string) => {
    const s = SCENARIOS.find(sc => sc.id === id)!;
    setScenarioId(id);
    setSliderVal(s.defaultVal);
    setStep(0); setResult(null); setIsRunning(false);
  };

  const runAnimation = async () => {
    setIsRunning(true); setResult(null); setStep(0);
    for (let i = 1; i <= 5; i++) {
      await new Promise(r => setTimeout(r, 450));
      setStep(i);
    }
    setResult({ conditionMet: scenario.condition(sliderVal) });
    setIsRunning(false);
  };

  const reset = () => { setStep(0); setResult(null); setIsRunning(false); };

  const condMet = scenario.condition(sliderVal);

  const tabs = [
    { id: 'naratif', icon: <FileText className="w-3.5 h-3.5" />, label: 'Naratif' },
    { id: 'flowchart', icon: <GitBranch className="w-3.5 h-3.5" />, label: 'Flowchart' },
    { id: 'pseudocode', icon: <Sparkles className="w-3.5 h-3.5" />, label: 'Pseudocode' },
    { id: 'kode', icon: <Code2 className="w-3.5 h-3.5" />, label: 'Kode Program' },
  ] as const;

  return (
    <div className="border border-border/60 rounded-3xl overflow-hidden bg-card dark:bg-slate-950 shadow-2xl">
      {/* Header */}
      <div className="p-4 md:px-6 bg-slate-100/90 dark:bg-slate-900/90 border-b border-border/70 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">2️⃣</span>
          <h3 className="font-bold text-sm md:text-base text-slate-900 dark:text-slate-100">
            Lab Percabangan Statemen Ganda (IF-ELSE)
          </h3>
        </div>
        <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-slate-950 p-1 rounded-xl border border-slate-300/70 dark:border-slate-800 flex-wrap">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === tab.id ? 'bg-amber-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="p-3 md:px-6 bg-slate-50/50 dark:bg-slate-900/50 border-b border-border/60 dark:border-slate-800/50 flex flex-wrap gap-2">
        {SCENARIOS.map(sc => (
          <button key={sc.id} onClick={() => handleScenarioChange(sc.id)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              scenarioId === sc.id ? 'bg-amber-700 text-white shadow-xs' : 'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {sc.title}
          </button>
        ))}
      </div>

      <div className="p-4 md:p-6">
        {/* ── NARATIF ─────────────────────────────────────────────────────────────── */}
        {activeTab === 'naratif' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-border/70 dark:border-slate-700/60 rounded-xl">
              <p className="text-slate-700 dark:text-slate-300 text-xs font-medium">
                📝 <strong>Algoritma Naratif</strong> — Urutan langkah dalam bahasa alami untuk percabangan statemen ganda (IF-ELSE). Baris keputusan disorot teks berwarna tanpa mengubah perataan tabulasi.
              </p>
            </div>

            <pre className="bg-card dark:bg-slate-900 p-5 rounded-2xl border border-border/70 dark:border-slate-800 font-mono text-sm leading-relaxed overflow-x-auto shadow-sm text-slate-800 dark:text-slate-300 whitespace-pre">
              <span className="text-slate-600 dark:text-slate-400">1. Masukkan nilai {scenarioId === 'saldo' ? 'saldo dan jumlahTarik' : scenario.variable}.</span>{'\n\n'}
              <span className="font-bold text-amber-700 dark:text-amber-300">2. Jika {scenario.conditionStr} maka:</span>{'\n'}
              <span className="text-emerald-700 dark:text-emerald-300 font-medium">      {scenarioId === 'saldo'
                ? 'Hitung sisaSaldo = saldo - jumlahTarik dan tampilkan pesan berhasil.'
                : `Tampilkan ${scenario.trueLabel} ke layar.`}</span>{'\n'}
              <span className="font-bold text-amber-700 dark:text-amber-300">   Selain itu:</span>{'\n'}
              <span className="text-rose-700 dark:text-rose-300 font-medium">      {scenarioId === 'saldo'
                ? 'Tampilkan "Saldo tidak mencukupi!" ke layar.'
                : `Tampilkan ${scenario.falseLabel} ke layar.`}</span>{'\n\n'}
              <span className="text-slate-600 dark:text-slate-400">3. {scenarioId === 'saldo' ? 'Program selesai.' : `Tampilkan data ${scenario.variable} ke layar.`}</span>
            </pre>

            {/* Perbandingan IF vs IF-ELSE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-card dark:bg-slate-900 border border-emerald-500/30 rounded-xl shadow-xs">
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2">✅ IF Statemen Tunggal</p>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                  <li>Hanya satu jalur aksi (True)</li>
                  <li>Jika False → tidak ada aksi</li>
                  <li>Cocok untuk: "jika syarat terpenuhi, lakukan X"</li>
                </ul>
              </div>
              <div className="p-3 bg-card dark:bg-slate-900 border border-amber-500/30 rounded-xl shadow-xs">
                <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-2">✅ IF-ELSE (Statemen Ganda)</p>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                  <li>DUA jalur aksi (True + False)</li>
                  <li>Selalu ada aksi untuk setiap kondisi</li>
                  <li>Cocok untuk: "pilih antara A atau B"</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── FLOWCHART (2-COLUMN SPLIT DASHBOARD) ─────────────────────────────── */}
        {activeTab === 'flowchart' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* KOLOM KIRI: Canvas Flowchart Lengkap */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-3 md:p-4 bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-border/70 dark:border-slate-800 shadow-inner">
                <IfElseFlowchart
                  conditionLabel={scenario.conditionLabel}
                  trueLines={scenario.flowchartTrueLines}
                  falseLines={scenario.flowchartFalseLines}
                  inputVar={scenario.variable}
                  conditionMet={condMet}
                  step={step}
                />
              </div>

              {/* KOLOM KANAN: Panel Kontrol, Slider, & Status */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-3">
                
                {/* Petunjuk */}
                <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-600/50 rounded-2xl shadow-xs">
                  <p className="text-amber-950 dark:text-amber-100 text-xs font-medium leading-relaxed">
                    🔷 <strong className="text-amber-900 dark:text-amber-300 font-black">Flowchart IF-ELSE:</strong> Atur nilai dengan <em>slider</em>. Jalur <span className="text-emerald-950 dark:text-emerald-200 font-black">hijau = True (Ya)</span>, jalur <span className="text-rose-950 dark:text-rose-200 font-black">merah = False (Tidak)</span>. Kedua cabang selalu bertemu kembali sebelum SELESAI.
                  </p>
                </div>

                {/* Panel Slider Input */}
                <div className="p-4 bg-card dark:bg-slate-900 rounded-2xl border border-border/70 dark:border-slate-800 space-y-3 shadow-md text-slate-900 dark:text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                      Nilai Input (<code className="text-amber-950 dark:text-amber-300 font-black">{scenario.variable}</code>):
                    </span>
                    <span className="font-mono font-black text-slate-900 dark:text-white text-base px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-amber-500/40">
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
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
                  />

                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>Min: {scenario.min}{scenario.unit}</span>
                    <span>Max: {scenario.max}{scenario.unit}</span>
                  </div>

                  {/* Tombol Animasi & Reset */}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={runAnimation}
                      disabled={isRunning}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-50 shadow-md shadow-amber-900/30"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Jalankan Animasi
                    </button>
                    <button
                      onClick={reset}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-border/70 dark:border-slate-700 shadow-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reset
                    </button>
                  </div>
                </div>

                {/* Status Evaluasi Kondisi Live */}
                <div className={`p-3.5 rounded-xl border-2 text-xs font-bold flex items-center justify-between gap-2 shadow-xs ${
                  condMet
                    ? 'border-emerald-500 bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200'
                    : 'border-red-500 bg-red-100/80 dark:bg-red-950/60 text-red-950 dark:text-red-200'
                }`}>
                  <div className="flex items-center gap-1.5 truncate font-mono">
                    <span>{condMet ? '✅' : '❌'}</span>
                    <span className="truncate">Kondisi: <strong>{scenario.conditionStr}</strong></span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-black shrink-0 ${
                    condMet ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                  }`}>
                    {condMet ? 'TRUE → Cabang KIRI (Ya)' : 'FALSE → Cabang KANAN (Tidak)'}
                  </span>
                </div>

                {/* Info Card Perbedaan */}
                <div className="p-3 bg-slate-50 dark:bg-slate-900/90 rounded-xl border border-border/70 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <p className="font-bold text-slate-800 dark:text-slate-300">💡 Karakteristik IF-ELSE:</p>
                  <p className="text-[11px] leading-relaxed">
                    Menjamin <strong>salah satu aksi pasti dijalankan</strong>. Tidak ada jalur kosong — komputer mengeksekusi aksi True jika kondisi terpenuhi, atau aksi False jika gagal.
                  </p>
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* ── PSEUDOCODE ─────────────────────────────────────────────────────────── */}
        {activeTab === 'pseudocode' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-border/70 dark:border-slate-700/60 rounded-xl">
              <p className="text-slate-700 dark:text-slate-300 text-xs font-medium">
                📋 <strong>Pseudocode IF-ELSE Standar</strong> — Format baku 3 blok (PROGRAM → KAMUS: → ALGORITMA:). Blok percabangan disorot lembut.
              </p>
            </div>

            <div className="bg-card dark:bg-slate-900 rounded-2xl border border-border/70 dark:border-slate-700 overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-slate-100/90 dark:bg-slate-800 border-b border-border/70 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-amber-500/60" /><div className="w-3 h-3 rounded-full bg-emerald-500/60" /></div>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">pseudocode — IF-ELSE</span>
                </div>
              </div>
              <pre className="p-5 text-sm font-mono text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre overflow-x-auto">
                <span className="text-purple-700 dark:text-purple-400 font-bold">PROGRAM</span> <span className="text-slate-900 dark:text-white font-semibold">{scenarioId === 'kelulusan' ? 'PenentuKelulusan' : scenarioId === 'tiket' ? 'HargaTiket' : 'CekSaldoATM'}</span>{'\n'}
                <span className="text-slate-500 italic text-xs">// {scenarioId === 'kelulusan' ? 'Menentukan status kelulusan berdasarkan nilai ujian' : scenarioId === 'tiket' ? 'Menghitung tarif tiket berdasarkan usia' : 'Memvalidasi saldo rekening sebelum penarikan uang'}</span>{'\n'}
                {'\n'}
                <span className="text-sky-800 dark:text-sky-400 font-bold">KAMUS:</span>{'\n'}
                <span className="text-slate-700 dark:text-slate-300">  {scenario.variable} : integer</span>{'\n'}
                {scenarioId === 'saldo' && <span className="text-slate-700 dark:text-slate-300">  jumlahTarik, sisaSaldo : integer{'\n'}</span>}
                {scenarioId === 'tiket' && <span className="text-slate-700 dark:text-slate-300">  hargaTiket : integer{'\n'}</span>}
                {'\n'}
                <span className="text-amber-700 dark:text-amber-400 font-bold">ALGORITMA:</span>{'\n'}
                <span className="text-slate-700 dark:text-slate-300">  input({scenario.variable})</span>{'\n'}
                {scenarioId === 'saldo' && <span className="text-slate-700 dark:text-slate-300">  input(jumlahTarik){'\n'}</span>}
                <span className="text-amber-700 dark:text-amber-300 font-bold">  if</span> <span className="text-amber-800 dark:text-amber-200 font-bold">{scenario.conditionStr}</span> <span className="text-amber-700 dark:text-amber-300 font-bold">then</span>{'\n'}
                {scenarioId === 'saldo' ? (
                  <span className="text-emerald-700 dark:text-emerald-300 font-medium">    sisaSaldo = saldo - jumlahTarik{'\n'}    output(&quot;Transaksi berhasil! Sisa saldo: Rp&quot;, sisaSaldo){'\n'}</span>
                ) : scenarioId === 'tiket' ? (
                  <span className="text-emerald-700 dark:text-emerald-300 font-medium">    hargaTiket = 50000{'\n'}    output(&quot;Tiket Dewasa: Rp&quot;, hargaTiket){'\n'}</span>
                ) : (
                  <span className="text-emerald-700 dark:text-emerald-300 font-medium">    output(&quot;Selamat, Anda LULUS!&quot;){'\n'}</span>
                )}
                <span className="text-amber-700 dark:text-amber-300 font-bold">  else</span>{'\n'}
                {scenarioId === 'saldo' ? (
                  <span className="text-rose-700 dark:text-rose-300 font-medium">    output(&quot;Saldo tidak mencukupi!&quot;){'\n'}</span>
                ) : scenarioId === 'tiket' ? (
                  <span className="text-rose-700 dark:text-rose-300 font-medium">    hargaTiket = 25000{'\n'}    output(&quot;Tiket Anak: Rp&quot;, hargaTiket){'\n'}</span>
                ) : (
                  <span className="text-rose-700 dark:text-rose-300 font-medium">    output(&quot;Maaf, Anda TIDAK LULUS.&quot;){'\n'}</span>
                )}
                <span className="text-amber-700 dark:text-amber-300 font-bold">  endif</span>
              </pre>
            </div>

            {/* Anotasi Blok */}
            <div className="space-y-2">
              {[
                { kw: 'if ... then', color: 'text-amber-700 dark:text-amber-300', desc: 'Evaluasi kondisi. Blok berikutnya dieksekusi hanya jika kondisi TRUE.' },
                { kw: 'else', color: 'text-rose-700 dark:text-rose-400', desc: 'Blok alternatif — dieksekusi HANYA jika kondisi FALSE. Tidak ada kondisi baru di sini.' },
                { kw: 'endif', color: 'text-amber-700 dark:text-amber-300', desc: 'Penutup keseluruhan blok IF-ELSE. Eksekusi berlanjut setelah ini.' },
              ].map(item => (
                <div key={item.kw} className="flex gap-3 text-xs">
                  <code className={`font-bold font-mono shrink-0 w-24 ${item.color}`}>{item.kw}</code>
                  <span className="text-slate-600 dark:text-slate-400">{item.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── KODE PROGRAM ───────────────────────────────────────────────────────── */}
        {activeTab === 'kode' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-border/70 dark:border-slate-700/60 rounded-xl">
              <p className="text-slate-700 dark:text-slate-300 text-xs font-medium">
                💻 <strong>Kode Program</strong> — Implementasi nyata dalam Python dan JavaScript. Blok percabangan disorot lembut tanpa mengubah perataan tabulasi.
              </p>
            </div>

            <div className="flex gap-1 bg-slate-200/70 dark:bg-slate-900 p-1 rounded-xl border border-slate-300/70 dark:border-slate-700 w-fit">
              {(['python', 'js'] as const).map(lang => (
                <button key={lang} onClick={() => setActiveLang(lang)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeLang === lang ? (lang === 'python' ? 'bg-blue-600 text-white' : 'bg-yellow-600 text-white') : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {lang === 'python' ? '🐍 Python' : '⚡ JavaScript'}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Nilai <code className="text-amber-700 dark:text-amber-400 font-mono">{scenario.variable}</code>:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white text-base">{sliderVal}{scenario.unit}</span>
              </div>
              <input type="range" min={scenario.min} max={scenario.max} value={sliderVal}
                onChange={e => { setSliderVal(Number(e.target.value)); reset(); }}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Code Block */}
            <div className="bg-card dark:bg-slate-900 rounded-2xl border border-border/70 dark:border-slate-700 overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-slate-100/90 dark:bg-slate-800 border-b border-border/70 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-amber-500/60" /><div className="w-3 h-3 rounded-full bg-emerald-500/60" /></div>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                    {activeLang === 'python' ? 'percabangan_statemen_ganda.py' : 'percabanganStatemenGanda.js'}
                  </span>
                </div>
              </div>
              <pre className="p-5 text-sm font-mono text-slate-800 dark:text-slate-200 leading-relaxed overflow-x-auto">
                {activeLang === 'python' ? (
                  <>
                    <span className="text-slate-500 dark:text-slate-400">{scenario.variable} = {scenarioId === 'saldo' ? sliderVal * 1000 : sliderVal}</span>{'\n'}
                    {scenarioId === 'saldo' && <span className="text-slate-500 dark:text-slate-400">jumlah_tarik = 200000{'\n'}</span>}
                    {'\n'}
                    <span className="text-amber-700 dark:text-amber-300 font-bold">if {scenarioId === 'saldo' ? 'saldo >= jumlah_tarik' : scenarioId === 'tiket' ? 'usia >= 12' : 'nilai >= 75'}:</span>{'\n'}
                    {scenarioId === 'saldo' ? (
                      <span className="text-emerald-700 dark:text-emerald-300 font-medium">    sisa_saldo = saldo - jumlah_tarik{'\n'}    print(f&quot;Transaksi berhasil! Sisa: Rp&#123;sisa_saldo:,&#125;&quot;){'\n'}</span>
                    ) : scenarioId === 'tiket' ? (
                      <span className="text-emerald-700 dark:text-emerald-300 font-medium">    harga_tiket = 50000{'\n'}    print(f&quot;Tiket Dewasa: Rp&#123;harga_tiket:,&#125;&quot;){'\n'}</span>
                    ) : (
                      <span className="text-emerald-700 dark:text-emerald-300 font-medium">    print(&quot;Selamat, Anda LULUS!&quot;){'\n'}</span>
                    )}
                    <span className="text-amber-700 dark:text-amber-300 font-bold">else:</span>{'\n'}
                    {scenarioId === 'saldo' ? (
                      <span className="text-rose-700 dark:text-rose-300 font-medium">    print(&quot;Saldo tidak mencukupi!&quot;){'\n'}</span>
                    ) : scenarioId === 'tiket' ? (
                      <span className="text-rose-700 dark:text-rose-300 font-medium">    harga_tiket = 25000{'\n'}    print(f&quot;Tiket Anak: Rp&#123;harga_tiket:,&#125;&quot;){'\n'}</span>
                    ) : (
                      <span className="text-rose-700 dark:text-rose-300 font-medium">    print(&quot;Maaf, Anda TIDAK LULUS.&quot;){'\n'}</span>
                    )}
                    {'\n'}
                    <span className="text-slate-500 dark:text-slate-400">
                      {scenarioId === 'tiket'
                        ? 'print(f"Usia pengunjung: {usia} tahun")'
                        : scenarioId === 'kelulusan'
                        ? 'print(f"Nilai Anda: {nilai}/100")'
                        : 'print("Terima kasih menggunakan ATM.")'}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-slate-500 dark:text-slate-400">const {scenario.variable} = {scenarioId === 'saldo' ? sliderVal * 1000 : sliderVal};</span>{'\n'}
                    {scenarioId === 'saldo' && <span className="text-slate-500 dark:text-slate-400">const jumlahTarik = 200000;{'\n'}</span>}
                    {'\n'}
                    <span className="text-amber-700 dark:text-amber-300 font-bold">if ({scenarioId === 'saldo' ? 'saldo >= jumlahTarik' : scenarioId === 'tiket' ? 'usia >= 12' : 'nilai >= 75'}) {'{'}</span>{'\n'}
                    {scenarioId === 'saldo' ? (
                      <span className="text-emerald-700 dark:text-emerald-300 font-medium">    const sisaSaldo = saldo - jumlahTarik;{'\n'}    console.log(`Transaksi berhasil! Sisa: Rp$&#123;sisaSaldo&#125;`);{'\n'}</span>
                    ) : scenarioId === 'tiket' ? (
                      <span className="text-emerald-700 dark:text-emerald-300 font-medium">    const hargaTiket = 50000;{'\n'}    console.log(`Tiket Dewasa: Rp$&#123;hargaTiket&#125;`);{'\n'}</span>
                    ) : (
                      <span className="text-emerald-700 dark:text-emerald-300 font-medium">    console.log(&quot;Selamat, Anda LULUS!&quot;);{'\n'}</span>
                    )}
                    <span className="text-amber-700 dark:text-amber-300 font-bold">{'}'} else {'{'}</span>{'\n'}
                    {scenarioId === 'saldo' ? (
                      <span className="text-rose-700 dark:text-rose-300 font-medium">    console.log(&quot;Saldo tidak mencukupi!&quot;);{'\n'}</span>
                    ) : scenarioId === 'tiket' ? (
                      <span className="text-rose-700 dark:text-rose-300 font-medium">    const hargaTiket = 25000;{'\n'}    console.log(`Tiket Anak: Rp$&#123;hargaTiket&#125;`);{'\n'}</span>
                    ) : (
                      <span className="text-rose-700 dark:text-rose-300 font-medium">    console.log(&quot;Maaf, Anda TIDAK LULUS.&quot;);{'\n'}</span>
                    )}
                    <span className="text-amber-700 dark:text-amber-300 font-bold">{'}'}</span>{'\n\n'}
                    <span className="text-slate-500 dark:text-slate-400">
                      {scenarioId === 'tiket'
                        ? 'console.log(`Usia pengunjung: ${usia} tahun`);'
                        : scenarioId === 'kelulusan'
                        ? 'console.log(`Nilai Anda: ${nilai}/100`);'
                        : 'console.log("Terima kasih menggunakan ATM.");'}
                    </span>
                  </>
                )}
              </pre>
            </div>

            {/* Live Output */}
            <div className="bg-card dark:bg-slate-900 rounded-2xl border border-border/70 dark:border-slate-700 overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-slate-100/90 dark:bg-slate-800 border-b border-border/70 dark:border-slate-700 flex items-center justify-between">
                <span className="text-xs text-amber-950 dark:text-amber-300 font-black font-mono">Hasil Output Program</span>
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${condMet ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-950 dark:text-emerald-200' : 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-950 dark:text-rose-200'}`}>
                  {condMet ? '✔ Cabang TRUE' : '✖ Cabang FALSE'}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <p className={`text-sm font-mono font-black ${condMet ? 'text-emerald-950 dark:text-emerald-300' : 'text-rose-950 dark:text-rose-300'}`}>
                  &gt; {condMet ? scenario.trueLabel.replace(/"/g, '') : scenario.falseLabel.replace(/"/g, '')}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-mono">&gt; (baris selanjutnya tetap dieksekusi...)</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
