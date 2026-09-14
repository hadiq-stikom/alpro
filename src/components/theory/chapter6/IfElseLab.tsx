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
    pythonCode: v => `# Python — Percabangan Ganda (IF-ELSE)
nilai = ${v}

if nilai >= 75:
    print("Selamat, Anda LULUS!")
else:
    print("Maaf, Anda TIDAK LULUS.")

print(f"Nilai Anda: {nilai}/100")`,
    jsCode: v => `// JavaScript — Percabangan Ganda (IF-ELSE)
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
    pythonCode: v => `# Python — Percabangan Ganda (IF-ELSE)
usia = ${v}

if usia >= 12:
    harga_tiket = 50000
    print(f"Tiket Dewasa: Rp{harga_tiket:,}")
else:
    harga_tiket = 25000
    print(f"Tiket Anak: Rp{harga_tiket:,}")

print(f"Usia pengunjung: {usia} tahun")`,
    jsCode: v => `// JavaScript — Percabangan Ganda (IF-ELSE)
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
    pythonCode: v => `# Python — Percabangan Ganda (IF-ELSE)
saldo = ${v * 1000}
jumlah_tarik = 200000  # Ingin menarik Rp200.000

if saldo >= jumlah_tarik:
    sisa_saldo = saldo - jumlah_tarik
    print("✅ Transaksi berhasil!")
    print(f"Sisa saldo: Rp{sisa_saldo:,}")
else:
    print("❌ Saldo tidak mencukupi!")
    print(f"Saldo Anda: Rp{saldo:,}")`,
    jsCode: v => `// JavaScript — Percabangan Ganda (IF-ELSE)
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

// ── SVG Flowchart IF-ELSE ─────────────────────────────────────────────────────
function IfElseFlowchart({ conditionLabel, trueLabel, falseLabel, conditionMet, step }:
  { conditionLabel: string; trueLabel: string; falseLabel: string; conditionMet: boolean; step: number }) {

  const hl = (s: number, branch?: 'true' | 'false' | 'both') => {
    if (step < s) return { opacity: 0.2 };
    if (branch === 'true' && !conditionMet) return { opacity: 0.2 };
    if (branch === 'false' && conditionMet) return { opacity: 0.2 };
    return { opacity: 1 };
  };

  return (
    <svg viewBox="0 0 340 520" className="w-full max-w-[320px] mx-auto" style={{ overflow: 'visible' }}>
      <defs>
        <marker id="a0" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#64748b" /></marker>
        <marker id="aY" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#10b981" /></marker>
        <marker id="aN" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ef4444" /></marker>
        <filter id="glow-g" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-r" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* START — Kapsul Neon Hijau */}
      <g style={hl(1)} filter="url(#glow-g)">
        <rect x="110" y="10" width="120" height="36" rx="18"
          fill="rgba(16,185,129,0.18)" stroke="#10b981" strokeWidth="2.5" />
        <text x="170" y="33" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6ee7b7">MULAI</text>
      </g>
      <line x1="170" y1="46" x2="170" y2="84" stroke="#64748b" strokeWidth="2" markerEnd="url(#a0)" style={hl(2)} />

      {/* INPUT — Jajaran Genjang Sejati */}
      <g style={hl(2)}>
        <polygon points="120,84 235,84 220,118 105,118" fill="rgba(168,85,247,0.25)" stroke="#a855f7" strokeWidth="2" />
        <text x="170" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#d8b4fe">input(data)</text>
      </g>
      <line x1="170" y1="118" x2="170" y2="158" stroke="#64748b" strokeWidth="2" markerEnd="url(#a0)" style={hl(3)} />

      {/* DIAMOND */}
      <g style={hl(3)}>
        <polygon points="170,158 260,210 170,262 80,210" fill="rgba(245,158,11,0.25)" stroke="#f59e0b" strokeWidth="2.5" />
        <text x="170" y="206" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fcd34d">
          {conditionLabel.length > 18 ? conditionLabel.substring(0, 17) + '…' : conditionLabel}
        </text>
      </g>

      {/* Ya (left) */}
      <g style={hl(4, 'true')}>
        <line x1="80" y1="210" x2="40" y2="210" stroke="#10b981" strokeWidth="2" />
        <text x="57" y="202" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#10b981">Ya</text>
        <line x1="40" y1="210" x2="40" y2="330" stroke="#10b981" strokeWidth="2" markerEnd="url(#aY)" />
        {/* Jajaran Genjang Output True */}
        <polygon points="12,330 76,330 68,362 4,362" fill="rgba(16,185,129,0.25)" stroke="#10b981" strokeWidth="2" />
        <text x="40" y="349" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#6ee7b7" dominantBaseline="middle">
          {trueLabel.length > 18 ? trueLabel.substring(0, 17) + '…' : trueLabel}
        </text>
        <line x1="40" y1="362" x2="40" y2="430" stroke="#10b981" strokeWidth="2" />
        <line x1="40" y1="430" x2="170" y2="430" stroke="#10b981" strokeWidth="2" />
      </g>

      {/* Tidak (right) */}
      <g style={hl(4, 'false')}>
        <line x1="260" y1="210" x2="300" y2="210" stroke="#ef4444" strokeWidth="2" />
        <text x="283" y="202" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ef4444">Tidak</text>
        <line x1="300" y1="210" x2="300" y2="330" stroke="#ef4444" strokeWidth="2" markerEnd="url(#aN)" />
        {/* Jajaran Genjang Output False */}
        <polygon points="272,330 336,330 328,362 264,362" fill="rgba(239,68,68,0.25)" stroke="#ef4444" strokeWidth="2" />
        <text x="300" y="349" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#fca5a5" dominantBaseline="middle">
          {falseLabel.length > 18 ? falseLabel.substring(0, 17) + '…' : falseLabel}
        </text>
        <line x1="300" y1="362" x2="300" y2="430" stroke="#ef4444" strokeWidth="2" />
        <line x1="300" y1="430" x2="170" y2="430" stroke="#ef4444" strokeWidth="2" />
      </g>

      {/* Titik Penyatuan & Flow ke SELESAI */}
      <circle cx="170" cy="430" r="2.5" fill="#94a3b8" />
      <line x1="170" y1="430" x2="170" y2="463" stroke="#64748b" strokeWidth="2" markerEnd="url(#a0)" style={hl(5)} />

      {/* END — Kapsul Neon Merah */}
      <g style={hl(5)} filter="url(#glow-r)">
        <rect x="110" y="463" width="120" height="36" rx="18"
          fill="rgba(239,68,68,0.18)" stroke="#ef4444" strokeWidth="2.5" />
        <text x="170" y="486" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fca5a5">SELESAI</text>
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
    <div className="border border-border/60 rounded-3xl overflow-hidden bg-slate-950 shadow-2xl">
      {/* Header */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">2️⃣</span>
          <h3 className="font-bold text-sm md:text-base text-slate-100">
            Lab Percabangan Ganda (IF-ELSE)
          </h3>
        </div>
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 flex-wrap">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === tab.id ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="p-3 md:px-6 bg-slate-900/50 border-b border-slate-800/50 flex flex-wrap gap-2">
        {SCENARIOS.map(sc => (
          <button key={sc.id} onClick={() => handleScenarioChange(sc.id)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              scenarioId === sc.id ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
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
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-xl">
              <p className="text-slate-300 text-xs font-medium">
                📝 <strong>Algoritma Naratif</strong> — Urutan langkah dalam bahasa alami untuk percabangan ganda (IF-ELSE). Baris keputusan disorot teks berwarna tanpa mengubah perataan tabulasi.
              </p>
            </div>

            <pre className="bg-slate-900 p-5 rounded-2xl border border-slate-800 font-mono text-sm leading-relaxed overflow-x-auto shadow-sm text-slate-300 whitespace-pre">
              <span className="text-slate-400">1. Masukkan nilai {scenarioId === 'saldo' ? 'saldo dan jumlahTarik' : scenario.variable}.</span>{'\n\n'}
              <span className="font-bold text-amber-300">2. Jika {scenario.conditionStr} maka:</span>{'\n'}
              <span className="text-emerald-300">      {scenarioId === 'saldo'
                ? 'Hitung sisaSaldo = saldo - jumlahTarik dan tampilkan pesan berhasil.'
                : `Tampilkan ${scenario.trueLabel} ke layar.`}</span>{'\n'}
              <span className="font-bold text-amber-300">   Selain itu:</span>{'\n'}
              <span className="text-rose-300">      {scenarioId === 'saldo'
                ? 'Tampilkan "Saldo tidak mencukupi!" ke layar.'
                : `Tampilkan ${scenario.falseLabel} ke layar.`}</span>{'\n\n'}
              <span className="text-slate-400">3. {scenarioId === 'saldo' ? 'Program selesai.' : `Tampilkan data ${scenario.variable} ke layar.`}</span>
            </pre>

            {/* Perbandingan IF vs IF-ELSE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-900 border border-emerald-600/30 rounded-xl">
                <p className="text-xs font-bold text-emerald-400 mb-2">✅ IF Tunggal</p>
                <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                  <li>Hanya satu jalur aksi (True)</li>
                  <li>Jika False → tidak ada aksi</li>
                  <li>Cocok untuk: "jika syarat terpenuhi, lakukan X"</li>
                </ul>
              </div>
              <div className="p-3 bg-slate-900 border border-amber-600/30 rounded-xl">
                <p className="text-xs font-bold text-amber-400 mb-2">✅ IF-ELSE (Ganda)</p>
                <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
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
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-3 md:p-4 bg-slate-900/80 rounded-2xl border border-slate-800 shadow-inner">
                <IfElseFlowchart
                  conditionLabel={scenario.conditionLabel}
                  trueLabel={scenario.trueLabel}
                  falseLabel={scenario.falseLabel}
                  conditionMet={condMet}
                  step={step}
                />
              </div>

              {/* KOLOM KANAN: Panel Kontrol, Slider, & Status */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-3">
                
                {/* Petunjuk */}
                <div className="p-3 bg-amber-950/60 border border-amber-700/60 rounded-xl">
                  <p className="text-amber-300 text-xs font-medium leading-relaxed">
                    🔷 <strong>Flowchart IF-ELSE:</strong> Atur nilai dengan <em>slider</em>. Jalur <span className="text-emerald-400 font-bold">hijau = True (Ya)</span>, jalur <span className="text-red-400 font-bold">merah = False (Tidak)</span>. Kedua cabang selalu bertemu kembali sebelum SELESAI.
                  </p>
                </div>

                {/* Panel Slider Input */}
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 shadow-md text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-300">
                      Nilai Input (<code className="text-amber-400">{scenario.variable}</code>):
                    </span>
                    <span className="font-mono font-black text-white text-base px-2.5 py-0.5 rounded-lg bg-slate-800 border border-amber-500/40">
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
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
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
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all cursor-pointer border border-slate-700 shadow-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reset
                    </button>
                  </div>
                </div>

                {/* Status Evaluasi Kondisi Live */}
                <div className={`p-3.5 rounded-xl border-2 text-xs font-bold flex items-center justify-between gap-2 shadow-xs ${
                  condMet
                    ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200'
                    : 'border-red-500 bg-red-950/60 text-red-200'
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
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                  <p className="font-bold text-slate-300">💡 Karakteristik IF-ELSE:</p>
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
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-xl">
              <p className="text-slate-300 text-xs font-medium">
                📋 <strong>Pseudocode IF-ELSE Standar</strong> — Format baku 3 blok (PROGRAM → KAMUS: → ALGORITMA:). Blok percabangan disorot lembut.
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-amber-500/60" /><div className="w-3 h-3 rounded-full bg-emerald-500/60" /></div>
                  <span className="text-xs text-slate-400 font-mono">pseudocode — IF-ELSE</span>
                </div>
              </div>
              <pre className="p-5 text-sm font-mono text-slate-200 leading-relaxed whitespace-pre overflow-x-auto">
                <span className="text-purple-400 font-bold">PROGRAM</span> <span className="text-white font-semibold">{scenarioId === 'kelulusan' ? 'PenentuKelulusan' : scenarioId === 'tiket' ? 'HargaTiket' : 'CekSaldoATM'}</span>{'\n'}
                <span className="text-slate-500 italic text-xs">// {scenarioId === 'kelulusan' ? 'Menentukan status kelulusan berdasarkan nilai ujian' : scenarioId === 'tiket' ? 'Menghitung tarif tiket berdasarkan usia' : 'Memvalidasi saldo rekening sebelum penarikan uang'}</span>{'\n'}
                {'\n'}
                <span className="text-sky-400 font-bold">KAMUS:</span>{'\n'}
                <span className="text-slate-300">  {scenario.variable} : integer</span>{'\n'}
                {scenarioId === 'saldo' && <span className="text-slate-300">  jumlahTarik, sisaSaldo : integer{'\n'}</span>}
                {scenarioId === 'tiket' && <span className="text-slate-300">  hargaTiket : integer{'\n'}</span>}
                {'\n'}
                <span className="text-amber-400 font-bold">ALGORITMA:</span>{'\n'}
                <span className="text-slate-300">  input({scenario.variable})</span>{'\n'}
                {scenarioId === 'saldo' && <span className="text-slate-300">  input(jumlahTarik){'\n'}</span>}
                <span className="text-amber-300 font-bold">  if</span> <span className="text-amber-100 font-bold">{scenario.conditionStr}</span> <span className="text-amber-300 font-bold">then</span>{'\n'}
                {scenarioId === 'saldo' ? (
                  <span className="text-emerald-300 font-medium">    sisaSaldo = saldo - jumlahTarik{'\n'}    output(&quot;Transaksi berhasil! Sisa saldo: Rp&quot;, sisaSaldo){'\n'}</span>
                ) : scenarioId === 'tiket' ? (
                  <span className="text-emerald-300 font-medium">    hargaTiket = 50000{'\n'}    output(&quot;Tiket Dewasa: Rp&quot;, hargaTiket){'\n'}</span>
                ) : (
                  <span className="text-emerald-300 font-medium">    output(&quot;Selamat, Anda LULUS!&quot;){'\n'}</span>
                )}
                <span className="text-amber-300 font-bold">  else</span>{'\n'}
                {scenarioId === 'saldo' ? (
                  <span className="text-rose-300 font-medium">    output(&quot;Saldo tidak mencukupi!&quot;){'\n'}</span>
                ) : scenarioId === 'tiket' ? (
                  <span className="text-rose-300 font-medium">    hargaTiket = 25000{'\n'}    output(&quot;Tiket Anak: Rp&quot;, hargaTiket){'\n'}</span>
                ) : (
                  <span className="text-rose-300 font-medium">    output(&quot;Maaf, Anda TIDAK LULUS.&quot;){'\n'}</span>
                )}
                <span className="text-amber-300 font-bold">  endif</span>
              </pre>
            </div>

            {/* Anotasi Blok */}
            <div className="space-y-2">
              {[
                { kw: 'if ... then', color: 'text-amber-300', desc: 'Evaluasi kondisi. Blok berikutnya dieksekusi hanya jika kondisi TRUE.' },
                { kw: 'else', color: 'text-rose-400', desc: 'Blok alternatif — dieksekusi HANYA jika kondisi FALSE. Tidak ada kondisi baru di sini.' },
                { kw: 'endif', color: 'text-amber-300', desc: 'Penutup keseluruhan blok IF-ELSE. Eksekusi berlanjut setelah ini.' },
              ].map(item => (
                <div key={item.kw} className="flex gap-3 text-xs">
                  <code className={`font-bold font-mono shrink-0 w-24 ${item.color}`}>{item.kw}</code>
                  <span className="text-slate-400">{item.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── KODE PROGRAM ───────────────────────────────────────────────────────── */}
        {activeTab === 'kode' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-xl">
              <p className="text-slate-300 text-xs font-medium">
                💻 <strong>Kode Program</strong> — Implementasi nyata dalam Python dan JavaScript. Blok percabangan disorot lembut tanpa mengubah perataan tabulasi.
              </p>
            </div>

            <div className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700 w-fit">
              {(['python', 'js'] as const).map(lang => (
                <button key={lang} onClick={() => setActiveLang(lang)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeLang === lang ? (lang === 'python' ? 'bg-blue-600 text-white' : 'bg-yellow-600 text-white') : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lang === 'python' ? '🐍 Python' : '⚡ JavaScript'}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Nilai <code className="text-amber-400 font-mono">{scenario.variable}</code>:</span>
                <span className="font-mono font-bold text-white text-base">{sliderVal}{scenario.unit}</span>
              </div>
              <input type="range" min={scenario.min} max={scenario.max} value={sliderVal}
                onChange={e => { setSliderVal(Number(e.target.value)); reset(); }}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Code Block */}
            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-amber-500/60" /><div className="w-3 h-3 rounded-full bg-emerald-500/60" /></div>
                  <span className="text-xs text-slate-400 font-mono">
                    {activeLang === 'python' ? 'percabangan_ganda.py' : 'percabanganGanda.js'}
                  </span>
                </div>
              </div>
              <pre className="p-5 text-sm font-mono text-slate-200 leading-relaxed overflow-x-auto">
                {activeLang === 'python' ? (
                  <>
                    <span className="text-slate-400">{scenario.variable} = {scenarioId === 'saldo' ? sliderVal * 1000 : sliderVal}</span>{'\n'}
                    {scenarioId === 'saldo' && <span className="text-slate-400">jumlah_tarik = 200000{'\n'}</span>}
                    {'\n'}
                    <span className="text-amber-300 font-bold">if {scenarioId === 'saldo' ? 'saldo >= jumlah_tarik' : scenarioId === 'tiket' ? 'usia >= 12' : 'nilai >= 75'}:</span>{'\n'}
                    {scenarioId === 'saldo' ? (
                      <span className="text-emerald-300 font-medium">    sisa_saldo = saldo - jumlah_tarik{'\n'}    print(f&quot;Transaksi berhasil! Sisa: Rp&#123;sisa_saldo:,&#125;&quot;){'\n'}</span>
                    ) : scenarioId === 'tiket' ? (
                      <span className="text-emerald-300 font-medium">    harga_tiket = 50000{'\n'}    print(f&quot;Tiket Dewasa: Rp&#123;harga_tiket:,&#125;&quot;){'\n'}</span>
                    ) : (
                      <span className="text-emerald-300 font-medium">    print(&quot;Selamat, Anda LULUS!&quot;){'\n'}</span>
                    )}
                    <span className="text-amber-300 font-bold">else:</span>{'\n'}
                    {scenarioId === 'saldo' ? (
                      <span className="text-rose-300 font-medium">    print(&quot;Saldo tidak mencukupi!&quot;){'\n'}</span>
                    ) : scenarioId === 'tiket' ? (
                      <span className="text-rose-300 font-medium">    harga_tiket = 25000{'\n'}    print(f&quot;Tiket Anak: Rp&#123;harga_tiket:,&#125;&quot;){'\n'}</span>
                    ) : (
                      <span className="text-rose-300 font-medium">    print(&quot;Maaf, Anda TIDAK LULUS.&quot;){'\n'}</span>
                    )}
                    {'\n'}
                    <span className="text-slate-400">
                      {scenarioId === 'tiket'
                        ? 'print(f"Usia pengunjung: {usia} tahun")'
                        : scenarioId === 'kelulusan'
                        ? 'print(f"Nilai Anda: {nilai}/100")'
                        : 'print("Terima kasih menggunakan ATM.")'}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-slate-400">const {scenario.variable} = {scenarioId === 'saldo' ? sliderVal * 1000 : sliderVal};</span>{'\n'}
                    {scenarioId === 'saldo' && <span className="text-slate-400">const jumlahTarik = 200000;{'\n'}</span>}
                    {'\n'}
                    <span className="text-amber-300 font-bold">if ({scenarioId === 'saldo' ? 'saldo >= jumlahTarik' : scenarioId === 'tiket' ? 'usia >= 12' : 'nilai >= 75'}) {'{'}</span>{'\n'}
                    {scenarioId === 'saldo' ? (
                      <span className="text-emerald-300 font-medium">    const sisaSaldo = saldo - jumlahTarik;{'\n'}    console.log(`Transaksi berhasil! Sisa: Rp$&#123;sisaSaldo&#125;`);{'\n'}</span>
                    ) : scenarioId === 'tiket' ? (
                      <span className="text-emerald-300 font-medium">    const hargaTiket = 50000;{'\n'}    console.log(`Tiket Dewasa: Rp$&#123;hargaTiket&#125;`);{'\n'}</span>
                    ) : (
                      <span className="text-emerald-300 font-medium">    console.log(&quot;Selamat, Anda LULUS!&quot;);{'\n'}</span>
                    )}
                    <span className="text-amber-300 font-bold">{'}'} else {'{'}</span>{'\n'}
                    {scenarioId === 'saldo' ? (
                      <span className="text-rose-300 font-medium">    console.log(&quot;Saldo tidak mencukupi!&quot;);{'\n'}</span>
                    ) : scenarioId === 'tiket' ? (
                      <span className="text-rose-300 font-medium">    const hargaTiket = 25000;{'\n'}    console.log(`Tiket Anak: Rp$&#123;hargaTiket&#125;`);{'\n'}</span>
                    ) : (
                      <span className="text-rose-300 font-medium">    console.log(&quot;Maaf, Anda TIDAK LULUS.&quot;);{'\n'}</span>
                    )}
                    <span className="text-amber-300 font-bold">{'}'}</span>{'\n\n'}
                    <span className="text-slate-400">
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
            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <span className="text-xs text-amber-400 font-bold font-mono">Hasil Output Program</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${condMet ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300' : 'bg-rose-950 border border-rose-500/40 text-rose-300'}`}>
                  {condMet ? '✔ Cabang TRUE' : '✖ Cabang FALSE'}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <p className={`text-sm font-mono font-bold ${condMet ? 'text-emerald-300' : 'text-rose-300'}`}>
                  &gt; {condMet ? scenario.trueLabel.replace(/"/g, '') : scenario.falseLabel.replace(/"/g, '')}
                </p>
                <p className="text-slate-500 text-xs font-mono">&gt; (baris selanjutnya tetap dieksekusi...)</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
