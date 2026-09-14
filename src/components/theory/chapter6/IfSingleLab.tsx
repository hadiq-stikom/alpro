"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, ChevronRight, CheckCircle2, Sparkles, Code2, FileText, GitBranch } from 'lucide-react';

// ── Kasus Skenario ────────────────────────────────────────────────────────────
interface Scenario {
  id: string;
  title: string;
  variable: string;
  unit: string;
  condition: string;
  conditionLabel: string;
  trueAction: string;
  falseSkip: string;
  min: number;
  max: number;
  defaultVal: number;
  narrative: string;
  pseudocode: string;
  pythonCode: (val: number) => string;
  jsCode: (val: number) => string;
  evaluate: (val: number) => { conditionMet: boolean; output: string };
}

const SCENARIOS: Scenario[] = [
  {
    id: 'ganjil',
    title: 'Cek Bilangan Ganjil',
    variable: 'angka',
    unit: '',
    condition: 'angka % 2 != 0',
    conditionLabel: 'angka % 2 ≠ 0?',
    trueAction: 'output("Bilangan Ganjil")',
    falseSkip: '(tidak ada aksi — blok IF dilewati)',
    min: 1,
    max: 20,
    defaultVal: 7,
    narrative: `1. Masukkan nilai angka.
2. Jika angka % 2 != 0 maka:
      Tampilkan "Bilangan Ganjil" ke layar.
3. Tampilkan hasil selesai ke layar.`,
    pseudocode: `PROGRAM CekBilanganGanjil
// Menentukan apakah sebuah bilangan bulat adalah bilangan ganjil

KAMUS:
  angka : integer

ALGORITMA:
  input(angka)
  if angka % 2 != 0 then
    output("Bilangan Ganjil")
  endif`,
    pythonCode: (val) => `# Python — Percabangan Tunggal (IF)
angka = ${val}

if angka % 2 != 0:
    print("Bilangan Ganjil")

print(f"Pemeriksaan selesai untuk angka {angka}.")`,
    jsCode: (val) => `// JavaScript — Percabangan Tunggal (IF)
const angka = ${val};

if (angka % 2 !== 0) {
    console.log("Bilangan Ganjil");
}

console.log(\`Pemeriksaan selesai untuk angka \${angka}.\`);`,
    evaluate: (val) => {
      const met = val % 2 !== 0;
      return {
        conditionMet: met,
        output: met ? `> "Bilangan Ganjil"\n> Program selesai. angka=${val}` : `> (blok IF dilewati)\n> Program selesai. angka=${val}`,
      };
    },
  },
  {
    id: 'diskon',
    title: 'Diskon Belanja (Belanja >= 500rb)',
    variable: 'totalBelanja',
    unit: ' rb',
    condition: 'totalBelanja >= 500000',
    conditionLabel: 'belanja ≥ 500rb?',
    trueAction: 'output("Selamat! Anda mendapat diskon 10%")',
    falseSkip: '(tidak ada diskon — bayar normal)',
    min: 100,
    max: 1000,
    defaultVal: 650,
    narrative: `1. Masukkan nilai totalBelanja.
2. Jika totalBelanja >= 500000 maka:
      Tampilkan "Selamat! Anda mendapat diskon 10%" ke layar.
3. Tampilkan "Terima kasih sudah berbelanja!" ke layar.`,
    pseudocode: `PROGRAM HitungDiskonBelanja
// Memberikan potongan harga jika total belanja minimal 500.000

KAMUS:
  totalBelanja : integer

ALGORITMA:
  input(totalBelanja)
  if totalBelanja >= 500000 then
    output("Selamat! Anda mendapat diskon 10%")
  endif
  output("Terima kasih sudah berbelanja!")`,
    pythonCode: (val) => `# Python — Percabangan Tunggal (IF)
total_belanja = ${val * 1000}

if total_belanja >= 500000:
    print("Selamat! Anda mendapat diskon 10%")

print("Terima kasih sudah berbelanja!")`,
    jsCode: (val) => `// JavaScript — Percabangan Tunggal (IF)
const totalBelanja = ${val * 1000};

if (totalBelanja >= 500000) {
    console.log("Selamat! Anda mendapat diskon 10%");
}

console.log("Terima kasih sudah berbelanja!");`,
    evaluate: (val) => {
      const actual = val * 1000;
      const met = actual >= 500000;
      return {
        conditionMet: met,
        output: met
          ? `> "Selamat! Anda mendapat diskon 10%"\n> "Terima kasih sudah berbelanja!"`
          : `> (blok IF dilewati — tidak ada diskon)\n> "Terima kasih sudah berbelanja!"`,
      };
    },
  },
  {
    id: 'suhu',
    title: 'Peringatan Demam (Suhu > 37.5°C)',
    variable: 'suhuTubuh',
    unit: ' °C',
    condition: 'suhuTubuh > 37.5',
    conditionLabel: 'suhu > 37.5°C?',
    trueAction: 'output("⚠️ Suhu di atas normal! Segera istirahat.")',
    falseSkip: '(suhu aman — tidak ada peringatan)',
    min: 35,
    max: 41,
    defaultVal: 38.5,
    narrative: `1. Masukkan nilai suhuTubuh.
2. Jika suhuTubuh > 37.5 maka:
      Tampilkan "⚠️ Suhu di atas normal! Segera istirahat." ke layar.
3. Tampilkan status pemeriksaan selesai ke layar.`,
    pseudocode: `PROGRAM PeringatanSuhu
// Menampilkan peringatan kesehatan jika suhu tubuh di atas batas normal

KAMUS:
  suhu : float

ALGORITMA:
  input(suhu)
  if suhu > 37 then
    output("⚠️ Suhu di atas normal! Segera istirahat.")
  endif`,
    pythonCode: (val) => `# Python — Percabangan Tunggal (IF)
suhu = ${val}

if suhu > 37:
    print("⚠️ Suhu di atas normal! Segera istirahat.")

print(f"Pemeriksaan selesai. Suhu: {suhu}°C")`,
    jsCode: (val) => `// JavaScript — Percabangan Tunggal (IF)
const suhu = ${val};

if (suhu > 37) {
    console.log("⚠️ Suhu di atas normal! Segera istirahat.");
}

console.log(\`Pemeriksaan selesai. Suhu: \${suhu}°C\`);`,
    evaluate: (val) => {
      const met = val > 37;
      return {
        conditionMet: met,
        output: met
          ? `> "⚠️ Suhu di atas normal! Segera istirahat."\n> "Pemeriksaan selesai. Suhu: ${val}°C"`
          : `> (blok IF dilewati — suhu normal)\n> "Pemeriksaan selesai. Suhu: ${val}°C"`,
      };
    },
  },
];

// ── Flowchart SVG IF Tunggal ──────────────────────────────────────────────────
function IfSingleFlowchart({
  conditionLabel,
  trueAction,
  conditionMet,
  isRunning,
  step,
}: {
  conditionLabel: string;
  trueAction: string;
  conditionMet: boolean;
  isRunning: boolean;
  step: number; // 0=idle, 1=start, 2=input, 3=decision, 4=action/skip, 5=end
}) {
  const hl = (s: number, branch?: 'true' | 'false') => {
    if (step < s) return { opacity: 0.35 };
    if (branch === 'true' && !conditionMet) return { opacity: 0.25 };
    if (branch === 'false' && conditionMet) return { opacity: 0.25 };
    if (isRunning && step === s) return { filter: 'drop-shadow(0 0 8px rgba(250,204,21,0.9))', opacity: 1 };
    return { opacity: 1 };
  };

  return (
    <svg viewBox="0 0 340 460" className="w-full max-w-[310px] mx-auto" style={{ overflow: 'visible' }}>
      <defs>
        <marker id="arr-s" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="arr-sY" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#10b981" />
        </marker>
        <marker id="arr-sN" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" />
        </marker>
        <filter id="glow-start-single" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-end-single" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* 1. START — Kapsul Neon Hijau */}
      <g style={hl(1)} filter="url(#glow-start-single)">
        <rect x="110" y="8" width="120" height="34" rx="17"
          fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="2.5" />
        <text x="170" y="30" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6ee7b7">MULAI</text>
      </g>

      {/* Arrow: START -> INPUT (nempel di y=78) */}
      <line x1="170" y1="42" x2="170" y2="78" stroke="#64748b" strokeWidth="2" markerEnd="url(#arr-s)" style={hl(2)} />

      {/* 2. INPUT — Jajaran Genjang Sejati */}
      <g style={hl(2)}>
        <polygon points="118,78 238,78 222,112 102,112"
          fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="2" />
        <text x="170" y="99" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#d8b4fe">input(data)</text>
      </g>

      {/* Arrow: INPUT -> DECISION (nempel di y=146) */}
      <line x1="170" y1="112" x2="170" y2="146" stroke="#64748b" strokeWidth="2" markerEnd="url(#arr-s)" style={hl(3)} />

      {/* 3. DECISION — Diamond */}
      <g style={hl(3)}>
        <polygon points="170,146 260,192 170,238 80,192"
          fill="rgba(245,158,11,0.25)" stroke="#f59e0b" strokeWidth="2.5" />
        <text x="170" y="196" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fcd34d">
          {conditionLabel.length > 18 ? conditionLabel.substring(0, 17) + '…' : conditionLabel}
        </text>
      </g>

      {/* 4. CABANG YA (Kiri) — Jalur Aksi Opsional */}
      <g style={hl(4, 'true')}>
        {/* Garis keluar horizontal ke kiri */}
        <line x1="80" y1="192" x2="48" y2="192" stroke="#10b981" strokeWidth="2" />
        <text x="64" y="184" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#10b981">Ya</text>
        
        {/* Garis turun ke kotak aksi & panah nempel di atas output y=275 */}
        <line x1="48" y1="192" x2="48" y2="275" stroke="#10b981" strokeWidth="2" markerEnd="url(#arr-sY)" />
        
        {/* Jajaran Genjang Output True */}
        <polygon points="15,275 93,275 81,315 3,315"
          fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="2" />
        <text x="48" y="295" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#6ee7b7">output(</text>
        <text x="48" y="307" textAnchor="middle" fontSize="7" fill="#a7f3d0">
          {trueAction.length > 16 ? trueAction.substring(0, 14) + '…)' : trueAction}
        </text>
        
        {/* Garis keluar dari bawah output turun ke y=365 lalu belok ke tengah x=170 */}
        <line x1="48" y1="315" x2="48" y2="365" stroke="#10b981" strokeWidth="2" />
        <line x1="48" y1="365" x2="170" y2="365" stroke="#10b981" strokeWidth="2" />
      </g>

      {/* 5. CABANG TIDAK (Lurus ke Bawah) — Bypass / Tanpa Aksi */}
      <g style={hl(4, 'false')}>
        <line x1="170" y1="238" x2="170" y2="365" stroke="#64748b" strokeWidth="2" strokeDasharray={conditionMet ? '4 3' : undefined} />
        <text x="184" y="295" textAnchor="start" fontSize="10" fontWeight="bold" fill="#94a3b8">Tidak</text>
      </g>

      {/* 6. TITIK PENYATUAN (MERGE POINT) & FLOW KE SELESAI */}
      <g style={hl(5)}>
        {/* Titik temu alur */}
        <circle cx="170" cy="365" r="2.5" fill="#94a3b8" />
        <line x1="170" y1="365" x2="170" y2="400" stroke="#64748b" strokeWidth="2" markerEnd="url(#arr-s)" />
        
        {/* SELESAI — Kapsul Neon Merah */}
        <g filter="url(#glow-end-single)">
          <rect x="110" y="400" width="120" height="34" rx="17"
            fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="2.5" />
          <text x="170" y="422" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fca5a5">SELESAI</text>
        </g>
      </g>
    </svg>
  );
}

// ── Komponen Utama ────────────────────────────────────────────────────────────
export default function IfSingleLab() {
  const [scenarioId, setScenarioId] = useState('ganjil');
  const [activeTab, setActiveTab] = useState<'naratif' | 'flowchart' | 'pseudocode' | 'kode'>('flowchart');
  const [activeLang, setActiveLang] = useState<'python' | 'js'>('python');
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<{ conditionMet: boolean; output: string } | null>(null);

  const scenario = SCENARIOS.find(s => s.id === scenarioId)!;
  const [sliderVal, setSliderVal] = useState(scenario.defaultVal);

  const handleScenarioChange = (id: string) => {
    const s = SCENARIOS.find(sc => sc.id === id)!;
    setScenarioId(id);
    setSliderVal(s.defaultVal);
    setStep(0);
    setResult(null);
    setIsRunning(false);
  };

  const runAnimation = async () => {
    setIsRunning(true);
    setResult(null);
    setStep(0);
    const delays = [300, 500, 500, 600, 600, 600];
    for (let i = 1; i <= 5; i++) {
      await new Promise(r => setTimeout(r, delays[i - 1]));
      setStep(i);
    }
    setResult(scenario.evaluate(sliderVal));
    setIsRunning(false);
  };

  const reset = () => { setStep(0); setResult(null); setIsRunning(false); };

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
          <span className="text-xl">1️⃣</span>
          <h3 className="font-bold text-sm md:text-base text-slate-100">
            Lab Percabangan Tunggal (IF)
          </h3>
        </div>
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 flex-wrap">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === tab.id ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
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
              scenarioId === sc.id ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {sc.title}
          </button>
        ))}
      </div>

      <div className="p-4 md:p-6">
        {/* ── NARATIF ────────────────────────────────────────────────────────────── */}
        {activeTab === 'naratif' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-xl">
              <p className="text-slate-300 text-xs font-medium">
                📝 <strong>Algoritma Naratif</strong> — Urutan langkah dalam bahasa alami. Baris keputusan disorot teks berwarna tanpa mengubah perataan tabulasi.
              </p>
            </div>

            <pre className="bg-slate-900 p-5 rounded-2xl border border-slate-800 font-mono text-sm leading-relaxed overflow-x-auto shadow-sm text-slate-300 whitespace-pre">
              <span className="text-slate-400">1. Masukkan nilai {scenario.variable}.</span>{'\n\n'}
              <span className="font-bold text-amber-300">2. Jika {scenario.condition} maka:</span>{'\n'}
              <span className="text-emerald-300">      {scenario.id === 'ganjil'
                ? 'Tampilkan "Bilangan Ganjil" ke layar.'
                : scenario.id === 'diskon'
                ? 'Tampilkan "Selamat! Anda mendapat diskon 10%" ke layar.'
                : 'Tampilkan "⚠️ Suhu di atas normal! Segera istirahat." ke layar.'}</span>{'\n\n'}
              <span className="text-slate-400">3. {scenario.id === 'diskon' ? 'Tampilkan "Terima kasih sudah berbelanja!" ke layar.' : 'Tampilkan status selesai ke layar.'}</span>
            </pre>
          </motion.div>
        )}

        {/* ── FLOWCHART (2-COLUMN SPLIT DASHBOARD) ─────────────────────────────── */}
        {activeTab === 'flowchart' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* KOLOM KIRI: Canvas Flowchart Lengkap */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-3 md:p-4 bg-slate-900/80 rounded-2xl border border-slate-800 shadow-inner">
                <IfSingleFlowchart
                  conditionLabel={scenario.conditionLabel}
                  trueAction={scenario.trueAction}
                  conditionMet={scenario.evaluate(sliderVal).conditionMet}
                  isRunning={isRunning}
                  step={step}
                />
              </div>

              {/* KOLOM KANAN: Panel Kontrol & Live Evaluation */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-3">
                
                {/* Petunjuk */}
                <div className="p-3 bg-emerald-950/60 border border-emerald-700/60 rounded-xl">
                  <p className="text-emerald-300 text-xs font-medium leading-relaxed">
                    🔷 <strong>Flowchart IF Tunggal:</strong> Atur nilai dengan <em>slider</em>, lalu klik <strong>Jalankan Animasi</strong> untuk melihat alur eksekusi komputer (Jalur <span className="text-emerald-400 font-bold">Ya</span> saat True atau <span className="text-slate-300 font-bold">Bypass</span> saat False).
                  </p>
                </div>

                {/* Panel Slider Input */}
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 shadow-md text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-300">
                      Nilai Input (<code className="text-emerald-400">{scenario.variable}</code>):
                    </span>
                    <span className="font-mono font-black text-white text-base px-2.5 py-0.5 rounded-lg bg-slate-800 border border-emerald-500/40">
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
                    className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />

                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>Min: {scenario.min}{scenario.unit}</span>
                    <span>Max: {scenario.max}{scenario.unit}</span>
                  </div>

                  {/* Tombol Kontrol Animasi */}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={runAnimation}
                      disabled={isRunning}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-50 shadow-md shadow-emerald-900/30"
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
                <div className={`p-3 rounded-xl border-2 text-xs font-bold flex items-center justify-between gap-2 shadow-xs ${
                  scenario.evaluate(sliderVal).conditionMet
                    ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200'
                    : 'border-slate-600 bg-slate-900/60 text-slate-300'
                }`}>
                  <div className="flex items-center gap-1.5 truncate font-mono">
                    <span>{scenario.evaluate(sliderVal).conditionMet ? '✅' : '⏭️'}</span>
                    <span className="truncate">Kondisi: <strong>{scenario.conditionLabel}</strong></span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-black shrink-0 ${
                    scenario.evaluate(sliderVal).conditionMet ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-white'
                  }`}>
                    {scenario.evaluate(sliderVal).conditionMet ? 'TRUE (Eksekusi IF)' : 'FALSE (Bypass)'}
                  </span>
                </div>

                {/* Log Eksekusi & Output */}
                <AnimatePresence>
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3.5 rounded-xl border ${
                        result.conditionMet ? 'border-emerald-600 bg-emerald-950/50' : 'border-slate-700 bg-slate-900/70'
                      }`}
                    >
                      <p className={`text-xs font-bold mb-1.5 ${result.conditionMet ? 'text-emerald-400' : 'text-slate-400'}`}>
                        {result.conditionMet ? '📢 Output Program (Jalur True):' : '📢 Output Program (Jalur False / Bypass):'}
                      </p>
                      <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                        {result.output}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>

          </motion.div>
        )}

        {/* ── PSEUDOCODE ─────────────────────────────────────────────────────────── */}
        {activeTab === 'pseudocode' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-xl">
              <p className="text-slate-300 text-xs font-medium">
                📋 <strong>Pseudocode Standar</strong> — Format baku 3 blok (PROGRAM → KAMUS: → ALGORITMA:). Blok percabangan disorot lembut.
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-amber-500/60" /><div className="w-3 h-3 rounded-full bg-emerald-500/60" /></div>
                  <span className="text-xs text-slate-400 font-mono">pseudocode — IF Tunggal</span>
                </div>
              </div>
              <pre className="p-5 text-sm font-mono text-slate-200 leading-relaxed whitespace-pre overflow-x-auto">
                <span className="text-purple-400 font-bold">PROGRAM</span> <span className="text-white font-semibold">{scenario.id === 'ganjil' ? 'CekBilanganGanjil' : scenario.id === 'diskon' ? 'CekDiskon' : 'PeringatanSuhu'}</span>{'\n'}
                <span className="text-slate-500 italic text-xs">// {scenario.id === 'ganjil' ? 'Menentukan apakah bilangan bulat adalah ganjil' : scenario.id === 'diskon' ? 'Menampilkan diskon jika total belanja memenuhi syarat' : 'Menampilkan peringatan jika suhu tubuh di atas normal'}</span>{'\n'}
                {'\n'}
                <span className="text-sky-400 font-bold">KAMUS:</span>{'\n'}
                <span className="text-slate-300">  {scenario.variable} : {scenario.id === 'suhu' ? 'float' : 'integer'}</span>{'\n'}
                {'\n'}
                <span className="text-amber-400 font-bold">ALGORITMA:</span>{'\n'}
                <span className="text-slate-300">  input({scenario.variable})</span>{'\n'}
                <span className="text-amber-300 font-bold">  if</span> <span className="text-amber-200 font-semibold">{scenario.condition}</span> <span className="text-amber-300 font-bold">then</span>{'\n'}
                <span className="text-emerald-300 font-medium">    {scenario.trueAction}</span>{'\n'}
                <span className="text-amber-300 font-bold">  endif</span>
              </pre>
            </div>

            {/* Anotasi */}
            <div className="space-y-2">
              {[
                { label: 'PROGRAM', desc: 'Deklarasi nama algoritma dengan deskripsi ringkas. Menggunakan format PascalCase.', color: 'text-purple-400' },
                { label: 'KAMUS:', desc: 'Deklarasi semua variabel dan tipe datanya (integer, float, string, boolean).', color: 'text-sky-400' },
                { label: 'ALGORITMA:', desc: 'Blok instruksi utama program yang dieksekusi secara berurutan.', color: 'text-amber-400' },
                { label: 'if ... then', desc: 'Awalan blok percabangan tunggal. Kondisi dievaluasi: jika True, blok dimasuki.', color: 'text-amber-300' },
                { label: 'endif', desc: 'Penutup wajib blok IF. Eksekusi berlanjut di sini setelah blok selesai/dilewati.', color: 'text-amber-300' },
              ].map(item => (
                <div key={item.label} className="flex gap-3 text-xs">
                  <code className={`font-bold font-mono shrink-0 w-28 ${item.color}`}>{item.label}</code>
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

            {/* Lang Toggle */}
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

            {/* Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Ubah nilai <code className="text-emerald-400 font-mono">{scenario.variable}</code>:</span>
                <span className="font-mono font-bold text-white text-base">{sliderVal}{scenario.unit}</span>
              </div>
              <input type="range" min={scenario.min} max={scenario.max} value={sliderVal}
                onChange={e => { setSliderVal(Number(e.target.value)); reset(); }}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Code Block */}
            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-amber-500/60" /><div className="w-3 h-3 rounded-full bg-emerald-500/60" /></div>
                  <span className="text-xs text-slate-400 font-mono">{activeLang === 'python' ? 'percabangan_tunggal.py' : 'percabanganTunggal.js'}</span>
                </div>
              </div>
              <pre className="p-5 text-sm font-mono text-slate-200 leading-relaxed overflow-x-auto">
                {activeLang === 'python' ? (
                  <>
                    <span className="text-slate-400">{scenario.variable} = {scenario.id === 'diskon' ? sliderVal * 1000 : sliderVal}</span>{'\n\n'}
                    <span className="text-amber-300 font-bold">if {scenario.id === 'ganjil' ? 'angka % 2 != 0' : scenario.id === 'diskon' ? 'total_belanja >= 500000' : 'suhu > 37'}:</span>{'\n'}
                    <span className="text-emerald-300 font-medium">    {scenario.id === 'ganjil' ? 'print("Bilangan Ganjil")' : scenario.id === 'diskon' ? 'print("Selamat! Anda mendapat diskon 10%")' : 'print("⚠️ Suhu di atas normal! Segera istirahat.")'}</span>{'\n\n'}
                    <span className="text-slate-400">{scenario.id === 'diskon' ? 'print("Terima kasih sudah berbelanja!")' : `print(f"Pemeriksaan selesai. ${scenario.variable}={${scenario.variable}}")`}</span>
                  </>
                ) : (
                  <>
                    <span className="text-slate-400">const {scenario.variable} = {scenario.id === 'diskon' ? sliderVal * 1000 : sliderVal};</span>{'\n\n'}
                    <span className="text-amber-300 font-bold">if ({scenario.id === 'ganjil' ? 'angka % 2 !== 0' : scenario.id === 'diskon' ? 'totalBelanja >= 500000' : 'suhu > 37'}) {'{'}</span>{'\n'}
                    <span className="text-yellow-300 font-medium">    {scenario.id === 'ganjil' ? 'console.log("Bilangan Ganjil");' : scenario.id === 'diskon' ? 'console.log("Selamat! Anda mendapat diskon 10%");' : 'console.log("⚠️ Suhu di atas normal! Segera istirahat.");'}</span>{'\n'}
                    <span className="text-amber-300 font-bold">{'}'}</span>{'\n\n'}
                    <span className="text-slate-400">{scenario.id === 'diskon' ? 'console.log("Terima kasih sudah berbelanja!");' : `console.log(\`Pemeriksaan selesai. ${scenario.variable}=\${${scenario.variable}}\`);`}</span>
                  </>
                )}
              </pre>
            </div>

            {/* Live Output */}
            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-emerald-400 font-bold font-mono">Hasil Output Program</span>
              </div>
              <pre className="p-4 text-sm font-mono whitespace-pre-wrap">
                <span className={scenario.evaluate(sliderVal).conditionMet ? 'text-emerald-300' : 'text-slate-400'}>
                  {scenario.evaluate(sliderVal).output}
                </span>
              </pre>
            </div>

            {/* Key Difference */}
            <div className="p-4 bg-amber-900/20 border border-amber-700/40 rounded-xl">
              <p className="text-xs font-bold text-amber-400 mb-2">⚡ Perbedaan Sintaks Utama:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-bold text-blue-400 mb-1">🐍 Python</p>
                  <code className="text-xs text-slate-300 block">if kondisi:</code>
                  <code className="text-xs text-slate-400 block pl-4">instruksi  # indent 4 spasi</code>
                  <code className="text-xs text-slate-500 block"># Tidak ada 'endif'!</code>
                </div>
                <div>
                  <p className="text-xs font-bold text-yellow-400 mb-1">⚡ JavaScript</p>
                  <code className="text-xs text-slate-300 block">if (kondisi) {'{'}</code>
                  <code className="text-xs text-slate-400 block pl-4">instruksi;</code>
                  <code className="text-xs text-slate-300 block">{'}'}</code>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
