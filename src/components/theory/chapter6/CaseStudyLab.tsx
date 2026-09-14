"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, GitBranch, Code2, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

// ── Tipe ──────────────────────────────────────────────────────────────────────
interface CaseStudy {
  id: string;
  emoji: string;
  title: string;
  color: string; // tailwind color name
  problem: string;
  narrative: string;
  pseudocode: string;
  pythonCode: (v: number) => string;
  jsCode: (v: number) => string;
  flowchartInfo: {
    conditionLabel: string;
    trueLabel: string;
    falseLabel: string;
  };
  sliderVar: string;
  sliderUnit: string;
  sliderMin: number;
  sliderMax: number;
  sliderDefault: number;
  evaluate: (v: number) => { condMet: boolean; trueOutput: string; falseOutput: string };
}

// ── Data Studi Kasus ──────────────────────────────────────────────────────────
const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'kelulusan',
    emoji: '🎓',
    title: 'Penentu Status Kelulusan',
    color: 'emerald',
    problem: 'Sebuah perguruan tinggi memerlukan program untuk menentukan apakah seorang mahasiswa lulus atau tidak berdasarkan nilai akhir. Mahasiswa dinyatakan LULUS jika nilai akhirnya ≥ 75. Jika di bawah 75, dinyatakan TIDAK LULUS.',
    narrative: `1. Masukkan nilai ujian akhir.
2. Jika nilaiAkhir >= 75 maka:
      Tampilkan "Selamat! Status Anda: LULUS" ke layar.
      Tampilkan "Nilai Anda memenuhi syarat kelulusan." ke layar.
   Selain itu:
      Tampilkan "Status Anda: TIDAK LULUS" ke layar.
      Tampilkan "Anda perlu mengikuti ujian remedial." ke layar.
3. Tampilkan pesan selesai ke layar.`,
    pseudocode: `PROGRAM PenentuStatusKelulusan
// Menentukan status kelulusan mahasiswa berdasarkan nilai akhir

KAMUS:
  nilaiAkhir : integer

ALGORITMA:
  input(nilaiAkhir)
  if nilaiAkhir >= 75 then
    output("Selamat! Status Anda: LULUS")
    output("Nilai Anda memenuhi syarat kelulusan.")
  else
    output("Status Anda: TIDAK LULUS")
    output("Anda perlu mengikuti ujian remedial.")
  endif`,
    pythonCode: v => `# Studi Kasus 1: Penentu Status Kelulusan
# Struktur: IF-ELSE (Percabangan Ganda)

nilai_akhir = ${v}

if nilai_akhir >= 75:
    print("🎉 Selamat! Status Anda: LULUS")
    print("Nilai Anda memenuhi syarat kelulusan.")
else:
    print("❌ Status Anda: TIDAK LULUS")
    print("Anda perlu mengikuti ujian remedial.")

print(f"\nNilai: {nilai_akhir}/100")
print("Batas kelulusan: 75")`,
    jsCode: v => `// Studi Kasus 1: Penentu Status Kelulusan
// Struktur: IF-ELSE (Percabangan Ganda)

const nilaiAkhir = ${v};

if (nilaiAkhir >= 75) {
    console.log("🎉 Selamat! Status Anda: LULUS");
    console.log("Nilai Anda memenuhi syarat kelulusan.");
} else {
    console.log("❌ Status Anda: TIDAK LULUS");
    console.log("Anda perlu mengikuti ujian remedial.");
}

console.log(\`\nNilai: \${nilaiAkhir}/100\`);
console.log("Batas kelulusan: 75");`,
    flowchartInfo: {
      conditionLabel: 'nilaiAkhir >= 75?',
      trueLabel: 'LULUS',
      falseLabel: 'TIDAK LULUS',
    },
    sliderVar: 'nilaiAkhir',
    sliderUnit: '',
    sliderMin: 0,
    sliderMax: 100,
    sliderDefault: 65,
    evaluate: v => ({
      condMet: v >= 75,
      trueOutput: `> 🎉 Selamat! Status Anda: LULUS\n> Nilai Anda memenuhi syarat kelulusan.\n> Nilai: ${v}/100`,
      falseOutput: `> ❌ Status Anda: TIDAK LULUS\n> Anda perlu mengikuti ujian remedial.\n> Nilai: ${v}/100`,
    }),
  },
  {
    id: 'diskon',
    emoji: '🛍️',
    title: 'Diskon Belanja Toko',
    color: 'sky',
    problem: 'Sebuah toko swalayan memberikan potongan harga 10% jika total belanja pelanggan mencapai Rp300.000 atau lebih (≥ 300.000). Jika total belanja di bawah Rp300.000, pelanggan membayar harga normal tanpa potongan.',
    narrative: `1. Masukkan nilai totalBelanja.
2. Jika totalBelanja >= 300000 maka:
      Hitung potongan = totalBelanja * 10 / 100.
      Hitung totalBayar = totalBelanja - potongan.
      Tampilkan "Diskon 10%! Total bayar: Rp" dan totalBayar ke layar.
   Selain itu:
      Tetapkan totalBayar = totalBelanja.
      Tampilkan "Tidak ada diskon. Total bayar: Rp" dan totalBayar ke layar.
3. Tampilkan "Terima kasih sudah berbelanja!" ke layar.`,
    pseudocode: `PROGRAM HitungDiskonBelanja
// Menghitung potongan harga 10% jika total belanja minimal 300.000

KAMUS:
  totalBelanja : integer
  potongan, totalBayar : integer

ALGORITMA:
  input(totalBelanja)
  if totalBelanja >= 300000 then
    potongan = totalBelanja * 10 / 100
    totalBayar = totalBelanja - potongan
    output("Diskon 10%! Total bayar: Rp", totalBayar)
  else
    totalBayar = totalBelanja
    output("Tidak ada diskon. Total bayar: Rp", totalBayar)
  endif
  output("Terima kasih sudah berbelanja!")`,
    pythonCode: v => {
      const belanja = v * 1000;
      const potongan = Math.round(belanja * 0.10);
      const bayar = belanja - potongan;
      return `# Studi Kasus 2: Diskon Belanja Toko
# Struktur: IF-ELSE (Percabangan Ganda)

total_belanja = ${belanja}

if total_belanja >= 300000:
    potongan = int(total_belanja * 0.10)
    total_bayar = total_belanja - potongan
    print(f"🎉 Diskon 10%! Hemat: Rp{potongan:,}")
    print(f"💰 Total Bayar: Rp{total_bayar:,}")
else:
    total_bayar = total_belanja
    print("ℹ️ Belum mencapai batas diskon.")
    print(f"💰 Total Bayar: Rp{total_bayar:,}")

print("Terima kasih sudah berbelanja!")`;
    },
    jsCode: v => {
      const belanja = v * 1000;
      return `// Studi Kasus 2: Diskon Belanja Toko
// Struktur: IF-ELSE (Percabangan Ganda)

const totalBelanja = ${belanja};

let totalBayar;
if (totalBelanja >= 300000) {
    const potongan = totalBelanja * 0.10;
    totalBayar = totalBelanja - potongan;
    console.log(\`🎉 Diskon 10%! Hemat: Rp\${potongan.toLocaleString()}\`);
    console.log(\`💰 Total Bayar: Rp\${totalBayar.toLocaleString()}\`);
} else {
    totalBayar = totalBelanja;
    console.log("ℹ️ Belum mencapai batas diskon.");
    console.log(\`💰 Total Bayar: Rp\${totalBayar.toLocaleString()}\`);
}

console.log("Terima kasih sudah berbelanja!");`;
    },
    flowchartInfo: {
      conditionLabel: 'belanja >= 300rb?',
      trueLabel: 'Diskon 10%',
      falseLabel: 'Bayar Normal',
    },
    sliderVar: 'totalBelanja',
    sliderUnit: ' rb',
    sliderMin: 50,
    sliderMax: 700,
    sliderDefault: 450,
    evaluate: v => {
      const belanja = v * 1000;
      const condMet = belanja >= 300000;
      const potongan = Math.round(belanja * 0.10);
      const bayar = condMet ? belanja - potongan : belanja;
      return {
        condMet,
        trueOutput: `> 🎉 Selamat! Anda mendapat diskon 10% (Hemat: Rp${potongan.toLocaleString('id-ID')})\n> 💰 Total Belanja: Rp${belanja.toLocaleString('id-ID')}\n> 💵 Total Bayar: Rp${bayar.toLocaleString('id-ID')}`,
        falseOutput: `> ℹ️ Total belanja belum mencapai batas diskon Rp300.000\n> 💰 Total Belanja: Rp${belanja.toLocaleString('id-ID')}\n> 💵 Total Bayar: Rp${bayar.toLocaleString('id-ID')}`,
      };
    },
  },
  {
    id: 'parkir',
    emoji: '🚗',
    title: 'Fasilitas Parkir Gratis',
    color: 'amber',
    problem: 'Sistem parkir mall memberlakukan fasilitas parkir gratis jika durasi parkir di bawah 1 jam (< 1 jam). Jika durasi parkir 1 jam atau lebih, dikenakan tarif standar flat Rp5.000.',
    narrative: `1. Masukkan nilai durasiParkir (dalam jam).
2. Jika durasiParkir < 1 maka:
      Tetapkan tarifParkir = 0.
      Tampilkan "GRATIS! (Parkir di bawah 1 jam)" ke layar.
   Selain itu:
      Tetapkan tarifParkir = 5000.
      Tampilkan "Tarif Parkir: Rp5.000" ke layar.
3. Tampilkan durasiParkir ke layar.`,
    pseudocode: `PROGRAM KalkulatorTarifParkir
// Menghitung tarif parkir gratis < 1 jam atau tarif flat 5.000

KAMUS:
  durasiParkir : float
  tarifParkir : integer

ALGORITMA:
  input(durasiParkir)
  if durasiParkir < 1 then
    tarifParkir = 0
    output("GRATIS! (Parkir di bawah 1 jam)")
  else
    tarifParkir = 5000
    output("Tarif Parkir: Rp", tarifParkir)
  endif
  output("Durasi:", durasiParkir, "jam")`,
    pythonCode: v => `# Studi Kasus 3: Fasilitas Parkir Gratis
# Struktur: IF-ELSE (Percabangan Ganda)

durasi_parkir = ${v}  # jam

if durasi_parkir < 1:
    tarif_parkir = 0
    print("🆓 GRATIS! (Parkir di bawah 1 jam)")
else:
    tarif_parkir = 5000
    print(f"💰 Tarif Parkir: Rp{tarif_parkir:,}")

print(f"⏱️ Durasi: {durasi_parkir} jam")`,
    jsCode: v => `// Studi Kasus 3: Fasilitas Parkir Gratis
// Struktur: IF-ELSE (Percabangan Ganda)

const durasiParkir = ${v};  // jam

let tarifParkir;
if (durasiParkir < 1) {
    tarifParkir = 0;
    console.log("🆓 GRATIS! (Parkir di bawah 1 jam)");
} else {
    tarifParkir = 5000;
    console.log(\`💰 Tarif Parkir: Rp\${tarifParkir.toLocaleString()}\`);
}

console.log(\`⏱️ Durasi: \${durasiParkir} jam\`);`,
    flowchartInfo: {
      conditionLabel: 'durasi < 1 jam?',
      trueLabel: 'GRATIS (Rp0)',
      falseLabel: 'Bayar Rp5.000',
    },
    sliderVar: 'durasiParkir',
    sliderUnit: ' jam',
    sliderMin: 0,
    sliderMax: 5,
    sliderDefault: 2,
    evaluate: v => {
      const condMet = v < 1;
      return {
        condMet,
        trueOutput: `> 🆓 GRATIS! Parkir di bawah 1 jam (Rp0)\n> ⏱️ Durasi: ${v} jam`,
        falseOutput: `> 💰 Tarif Parkir Standar: Rp5.000\n> ⏱️ Durasi: ${v} jam`,
      };
    },
  },
];

// ── Flowchart Ringkas Beresolusi Tinggi & Ramah Proyektor ─────────────────────
function MiniFlowchart({
  info,
  condMet,
  isProjector = false,
}: {
  info: CaseStudy['flowchartInfo'];
  condMet: boolean;
  isProjector?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 380 450"
      preserveAspectRatio="xMidYMid meet"
      className={`w-auto ${isProjector ? 'h-[290px] sm:h-[330px] md:h-[360px] max-h-[46vh]' : 'h-auto max-w-[340px] md:max-w-[380px] w-full'} mx-auto transition-all duration-300 block`}
    >
      <defs>
        <marker id="cs-a" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#94a3b8" />
        </marker>
        <marker id="cs-y" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#10b981" />
        </marker>
        <marker id="cs-n" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#f43f5e" />
        </marker>
        <filter id="cs-glow-g" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="cs-glow-r" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="cs-glow-diamond" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* START — Kapsul Neon Hijau */}
      <g filter="url(#cs-glow-g)">
        <rect x="110" y="10" width="160" height="38" rx="19"
          fill="rgba(16,185,129,0.25)" stroke="#10b981" strokeWidth="2.5" />
        <text x="190" y="34" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6ee7b7" letterSpacing="1">
          MULAI
        </text>
      </g>
      <line x1="190" y1="48" x2="190" y2="78" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#cs-a)" />
      
      {/* INPUT — Jajaran Genjang Sejati */}
      <polygon points="120,78 270,78 250,116 100,116" fill="rgba(168,85,247,0.25)" stroke="#c084fc" strokeWidth="2.5" />
      <text x="185" y="101" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#e9d5ff">
        input(data)
      </text>
      <line x1="185" y1="116" x2="185" y2="148" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#cs-a)" />
      
      {/* DIAMOND DECISION */}
      <g filter="url(#cs-glow-diamond)">
        <polygon points="185,148 295,198 185,248 75,198" fill="rgba(245,158,11,0.25)" stroke="#fbbf24" strokeWidth="3" />
        <text x="185" y="203" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fef08a">
          {info.conditionLabel}
        </text>
      </g>
      
      {/* CABANG YA (KIRI - HIJAU) */}
      <g opacity={condMet ? 1 : 0.45} className="transition-opacity duration-300">
        <line x1="75" y1="198" x2="30" y2="198" stroke="#10b981" strokeWidth={condMet ? 3.5 : 2.5} />
        <text x="52" y="190" textAnchor="middle" fontSize="13" fontWeight="black" fill="#34d399">Ya</text>
        <line x1="30" y1="198" x2="30" y2="280" stroke="#10b981" strokeWidth={condMet ? 3.5 : 2.5} markerEnd="url(#cs-y)" />
        {/* Output Parallelogram (Left) */}
        <polygon points="15,280 145,280 130,324 0,324" fill={condMet ? "rgba(16,185,129,0.35)" : "rgba(16,185,129,0.12)"} stroke="#10b981" strokeWidth={condMet ? 3 : 2} />
        <text x="70" y="307" textAnchor="middle" fontSize="12" fontWeight="black" fill={condMet ? "#a7f3d0" : "#6ee7b7"}>
          {info.trueLabel}
        </text>
        <line x1="70" y1="324" x2="70" y2="375" stroke="#10b981" strokeWidth={condMet ? 3.5 : 2.5} />
        <line x1="70" y1="375" x2="185" y2="375" stroke="#10b981" strokeWidth={condMet ? 3.5 : 2.5} />
      </g>
      
      {/* CABANG TIDAK (KANAN - MERAH) */}
      <g opacity={!condMet ? 1 : 0.45} className="transition-opacity duration-300">
        <line x1="295" y1="198" x2="340" y2="198" stroke="#f43f5e" strokeWidth={!condMet ? 3.5 : 2.5} />
        <text x="318" y="190" textAnchor="middle" fontSize="13" fontWeight="black" fill="#fb7185">Tidak</text>
        <line x1="340" y1="198" x2="340" y2="280" stroke="#f43f5e" strokeWidth={!condMet ? 3.5 : 2.5} markerEnd="url(#cs-n)" />
        {/* Output Parallelogram (Right) */}
        <polygon points="235,280 375,280 360,324 220,324" fill={!condMet ? "rgba(244,63,94,0.35)" : "rgba(244,63,94,0.12)"} stroke="#f43f5e" strokeWidth={!condMet ? 3 : 2} />
        <text x="298" y="307" textAnchor="middle" fontSize="12" fontWeight="black" fill={!condMet ? "#fecdd3" : "#fda4af"}>
          {info.falseLabel}
        </text>
        <line x1="298" y1="324" x2="298" y2="375" stroke="#f43f5e" strokeWidth={!condMet ? 3.5 : 2.5} />
        <line x1="298" y1="375" x2="185" y2="375" stroke="#f43f5e" strokeWidth={!condMet ? 3.5 : 2.5} />
      </g>
      
      {/* TITIK TEMU & SELESAI */}
      <circle cx="185" cy="375" r="3.5" fill="#94a3b8" />
      <line x1="185" y1="375" x2="185" y2="400" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#cs-a)" />
      <g filter="url(#cs-glow-r)">
        <rect x="110" y="400" width="160" height="38" rx="19"
          fill="rgba(239,68,68,0.25)" stroke="#ef4444" strokeWidth="2.5" />
        <text x="190" y="424" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fca5a5" letterSpacing="1">
          SELESAI
        </text>
      </g>
    </svg>
  );
}


// ── Komponen Utama ────────────────────────────────────────────────────────────
export default function CaseStudyLab() {
  const [caseIdx, setCaseIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'naratif' | 'flowchart' | 'pseudocode' | 'kode'>('naratif');
  const [activeLang, setActiveLang] = useState<'python' | 'js'>('python');
  const [isProjectorOpen, setIsProjectorOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsProjectorOpen(false);
      }
    };
    if (isProjectorOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isProjectorOpen]);

  const cs = CASE_STUDIES[caseIdx];
  const [sliderVal, setSliderVal] = useState(cs.sliderDefault);

  const changeCase = (idx: number) => {
    setCaseIdx(idx);
    setSliderVal(CASE_STUDIES[idx].sliderDefault);
    setActiveTab('naratif');
  };

  const evalResult = cs.evaluate(sliderVal);
  const output = evalResult.condMet ? evalResult.trueOutput : evalResult.falseOutput;

  const tabs = [
    { id: 'naratif', icon: <FileText className="w-3.5 h-3.5" />, label: '📝 Naratif' },
    { id: 'flowchart', icon: <GitBranch className="w-3.5 h-3.5" />, label: '🔷 Flowchart' },
    { id: 'pseudocode', icon: <Sparkles className="w-3.5 h-3.5" />, label: '📋 Pseudocode' },
    { id: 'kode', icon: <Code2 className="w-3.5 h-3.5" />, label: '💻 Kode' },
  ] as const;

  return (
    <div className="border border-border/60 rounded-3xl overflow-hidden bg-slate-950 shadow-2xl">
      {/* Header */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🔬</span>
          <h3 className="font-bold text-sm md:text-base text-slate-100">
            Lab Studi Kasus Terpadu — 4 Representasi Algoritma
          </h3>
        </div>
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 flex-wrap">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === tab.id ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Case Selector */}
      <div className="p-3 md:px-6 bg-slate-900/50 border-b border-slate-800/50 flex flex-wrap gap-2">
        {CASE_STUDIES.map((c, i) => (
          <button key={c.id} onClick={() => changeCase(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              caseIdx === i ? 'bg-rose-700 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {c.emoji} {c.title}
          </button>
        ))}
      </div>

      <div className="p-4 md:p-6">
        {/* Problem Statement */}
        <div className="p-4 bg-slate-900 border border-rose-600/30 rounded-xl mb-5">
          <p className="text-xs font-bold text-rose-400 mb-1.5">📌 Deskripsi Masalah:</p>
          <p className="text-sm text-slate-300 leading-relaxed">{cs.problem}</p>
        </div>

        {/* ── NARATIF ─────────────────────────────────────────────────────────────── */}
        {activeTab === 'naratif' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-xl">
              <p className="text-slate-300 text-xs font-medium">
                📝 <strong>Algoritma Naratif</strong> — Langkah-langkah penyelesaian dalam bahasa natural. Baris keputusan disorot lembut.
              </p>
            </div>

            <pre className="bg-slate-900 p-5 rounded-2xl border border-slate-800 font-mono text-sm leading-relaxed overflow-x-auto shadow-sm text-slate-300 whitespace-pre">
              {caseIdx === 0 && (
                <>
                  <span className="text-slate-400">1. Masukkan nilai ujian akhir.</span>{'\n\n'}
                  <span className="font-bold text-amber-300">2. Jika nilaiAkhir &gt;= 75 maka:</span>{'\n'}
                  <span className="text-emerald-300">      Tampilkan &quot;Selamat! Status Anda: LULUS&quot; ke layar.</span>{'\n'}
                  <span className="text-emerald-300">      Tampilkan &quot;Nilai Anda memenuhi syarat kelulusan.&quot; ke layar.</span>{'\n'}
                  <span className="font-bold text-amber-300">   Selain itu:</span>{'\n'}
                  <span className="text-rose-300">      Tampilkan &quot;Status Anda: TIDAK LULUS&quot; ke layar.</span>{'\n'}
                  <span className="text-rose-300">      Tampilkan &quot;Anda perlu mengikuti ujian remedial.&quot; ke layar.</span>{'\n\n'}
                  <span className="text-slate-400">3. Tampilkan pesan selesai ke layar.</span>
                </>
              )}

              {caseIdx === 1 && (
                <>
                  <span className="text-slate-400">1. Masukkan nilai totalBelanja.</span>{'\n\n'}
                  <span className="font-bold text-amber-300">2. Jika totalBelanja &gt;= 300000 maka:</span>{'\n'}
                  <span className="text-emerald-300">      Hitung potongan = totalBelanja * 10 / 100.</span>{'\n'}
                  <span className="text-emerald-300">      Hitung totalBayar = totalBelanja - potongan.</span>{'\n'}
                  <span className="text-emerald-300">      Tampilkan &quot;Diskon 10%! Total bayar: Rp&quot; dan totalBayar ke layar.</span>{'\n'}
                  <span className="font-bold text-amber-300">   Selain itu:</span>{'\n'}
                  <span className="text-rose-300">      Tetapkan totalBayar = totalBelanja.</span>{'\n'}
                  <span className="text-rose-300">      Tampilkan &quot;Tidak ada diskon. Total bayar: Rp&quot; dan totalBayar ke layar.</span>{'\n\n'}
                  <span className="text-slate-400">3. Tampilkan &quot;Terima kasih sudah berbelanja!&quot; ke layar.</span>
                </>
              )}

              {caseIdx === 2 && (
                <>
                  <span className="text-slate-400">1. Masukkan nilai durasiParkir (dalam jam).</span>{'\n\n'}
                  <span className="font-bold text-amber-300">2. Jika durasiParkir &lt; 1 maka:</span>{'\n'}
                  <span className="text-emerald-300">      Tetapkan tarifParkir = 0.</span>{'\n'}
                  <span className="text-emerald-300">      Tampilkan &quot;GRATIS! (Parkir di bawah 1 jam)&quot; ke layar.</span>{'\n'}
                  <span className="font-bold text-amber-300">   Selain itu:</span>{'\n'}
                  <span className="text-rose-300">      Tetapkan tarifParkir = 5000.</span>{'\n'}
                  <span className="text-rose-300">      Tampilkan &quot;Tarif Parkir: Rp5.000&quot; ke layar.</span>{'\n\n'}
                  <span className="text-slate-400">3. Tampilkan durasiParkir ke layar.</span>
                </>
              )}
            </pre>

            <div className="flex justify-end">
              <button onClick={() => setActiveTab('flowchart')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                Lihat Flowchart <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ── FLOWCHART ──────────────────────────────────────────────────────────── */}
        {activeTab === 'flowchart' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3 bg-rose-900/30 border border-rose-700/50 rounded-xl flex flex-wrap items-center justify-between gap-2">
              <p className="text-rose-300 text-xs font-medium">
                🔷 <strong>Flowchart Interaktif</strong> — Atur nilai slider untuk melihat jalur mana yang dipilih secara real-time.
              </p>
              <button
                onClick={() => setIsProjectorOpen(true)}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-rose-900/40"
              >
                <span>🔍</span> Mode Proyektor (Layar Penuh)
              </button>
            </div>

            <div className="space-y-2 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Nilai Input (<code className="text-rose-400 font-mono">{cs.sliderVar}</code>):</span>
                <span className="font-mono font-bold text-white text-base bg-slate-800 px-3 py-0.5 rounded-lg border border-rose-500/40">
                  {sliderVal}{cs.sliderUnit}
                </span>
              </div>
              <input type="range" min={cs.sliderMin} max={cs.sliderMax} value={sliderVal}
                onChange={e => setSliderVal(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>Min: {cs.sliderMin}{cs.sliderUnit}</span>
                <span>Max: {cs.sliderMax}{cs.sliderUnit}</span>
              </div>
            </div>

            <div className={`p-3 rounded-xl border text-sm font-bold text-center transition-all ${evalResult.condMet ? 'border-emerald-500/60 bg-emerald-950/60 text-emerald-300' : 'border-rose-500/60 bg-rose-950/60 text-rose-300'}`}>
              Kondisi <code className="font-mono bg-slate-900/80 px-2 py-0.5 rounded border border-white/10">{cs.flowchartInfo.conditionLabel}</code> → <span className="underline decoration-2">{evalResult.condMet ? 'TRUE (Jalur KIRI: Ya)' : 'FALSE (Jalur KANAN: Tidak)'}</span>
            </div>

            {/* Container Flowchart Default Diperbesar */}
            <div className="p-4 md:p-6 bg-slate-900/80 rounded-2xl border border-slate-800 shadow-inner flex flex-col items-center">
              <MiniFlowchart info={cs.flowchartInfo} condMet={evalResult.condMet} isProjector={false} />
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4">
              <p className="text-xs font-bold text-slate-400 mb-1">Hasil Output Terminal:</p>
              <pre className="text-sm font-mono text-slate-200 whitespace-pre bg-slate-950 p-3 rounded-xl border border-slate-800/80">{output}</pre>
            </div>
          </motion.div>
        )}

        {/* ── PSEUDOCODE ─────────────────────────────────────────────────────────── */}
        {activeTab === 'pseudocode' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-xl">
              <p className="text-slate-300 text-xs font-medium">
                📋 <strong>Pseudocode Standar</strong> — Format baku 3 blok (PROGRAM → KAMUS: → ALGORITMA:). Blok percabangan disorot lembut tanpa mengubah perataan tabulasi.
              </p>
            </div>
            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-amber-500/60" /><div className="w-3 h-3 rounded-full bg-emerald-500/60" /></div>
                  <span className="text-xs text-slate-400 font-mono">pseudocode — {cs.title}</span>
                </div>
              </div>
              <pre className="p-5 text-sm font-mono text-slate-200 leading-relaxed whitespace-pre overflow-x-auto">
                {caseIdx === 0 && (
                  <>
                    <span className="text-purple-400 font-bold">PROGRAM</span> <span className="text-white font-semibold">PenentuStatusKelulusan</span>{'\n'}
                    <span className="text-slate-500 italic text-xs">// Menentukan status kelulusan mahasiswa berdasarkan nilai akhir</span>{'\n'}
                    {'\n'}
                    <span className="text-sky-400 font-bold">KAMUS:</span>{'\n'}
                    <span className="text-slate-300">  nilaiAkhir : integer</span>{'\n'}
                    {'\n'}
                    <span className="text-amber-400 font-bold">ALGORITMA:</span>{'\n'}
                    <span className="text-slate-300">  input(nilaiAkhir)</span>{'\n'}
                    <span className="text-amber-300 font-bold">  if</span> <span className="text-amber-100 font-bold">nilaiAkhir &gt;= 75</span> <span className="text-amber-300 font-bold">then</span>{'\n'}
                    <span className="text-emerald-300 font-medium">    output(&quot;Selamat! Status Anda: LULUS&quot;){'\n'}    output(&quot;Nilai Anda memenuhi syarat kelulusan.&quot;)</span>{'\n'}
                    <span className="text-amber-300 font-bold">  else</span>{'\n'}
                    <span className="text-rose-300 font-medium">    output(&quot;Status Anda: TIDAK LULUS&quot;){'\n'}    output(&quot;Anda perlu mengikuti ujian remedial.&quot;)</span>{'\n'}
                    <span className="text-amber-300 font-bold">  endif</span>
                  </>
                )}

                {caseIdx === 1 && (
                  <>
                    <span className="text-purple-400 font-bold">PROGRAM</span> <span className="text-white font-semibold">HitungDiskonBelanja</span>{'\n'}
                    <span className="text-slate-500 italic text-xs">// Menghitung potongan harga 10% jika total belanja minimal 300.000</span>{'\n'}
                    {'\n'}
                    <span className="text-sky-400 font-bold">KAMUS:</span>{'\n'}
                    <span className="text-slate-300">  totalBelanja : integer{'\n'}  potongan, totalBayar : integer</span>{'\n'}
                    {'\n'}
                    <span className="text-amber-400 font-bold">ALGORITMA:</span>{'\n'}
                    <span className="text-slate-300">  input(totalBelanja)</span>{'\n'}
                    <span className="text-amber-300 font-bold">  if</span> <span className="text-amber-100 font-bold">totalBelanja &gt;= 300000</span> <span className="text-amber-300 font-bold">then</span>{'\n'}
                    <span className="text-emerald-300 font-medium">    potongan = totalBelanja * 10 / 100{'\n'}    totalBayar = totalBelanja - potongan{'\n'}    output(&quot;Diskon 10%! Total bayar: Rp&quot;, totalBayar)</span>{'\n'}
                    <span className="text-amber-300 font-bold">  else</span>{'\n'}
                    <span className="text-rose-300 font-medium">    totalBayar = totalBelanja{'\n'}    output(&quot;Tidak ada diskon. Total bayar: Rp&quot;, totalBayar)</span>{'\n'}
                    <span className="text-amber-300 font-bold">  endif</span>{'\n'}
                    <span className="text-slate-300">  output(&quot;Terima kasih sudah berbelanja!&quot;)</span>
                  </>
                )}

                {caseIdx === 2 && (
                  <>
                    <span className="text-purple-400 font-bold">PROGRAM</span> <span className="text-white font-semibold">KalkulatorTarifParkir</span>{'\n'}
                    <span className="text-slate-500 italic text-xs">// Menghitung tarif parkir gratis &lt; 1 jam atau tarif flat 5.000</span>{'\n'}
                    {'\n'}
                    <span className="text-sky-400 font-bold">KAMUS:</span>{'\n'}
                    <span className="text-slate-300">  durasiParkir : float{'\n'}  tarifParkir : integer</span>{'\n'}
                    {'\n'}
                    <span className="text-amber-400 font-bold">ALGORITMA:</span>{'\n'}
                    <span className="text-slate-300">  input(durasiParkir)</span>{'\n'}
                    <span className="text-amber-300 font-bold">  if</span> <span className="text-amber-100 font-bold">durasiParkir &lt; 1</span> <span className="text-amber-300 font-bold">then</span>{'\n'}
                    <span className="text-emerald-300 font-medium">    tarifParkir = 0{'\n'}    output(&quot;GRATIS! (Parkir di bawah 1 jam)&quot;)</span>{'\n'}
                    <span className="text-amber-300 font-bold">  else</span>{'\n'}
                    <span className="text-rose-300 font-medium">    tarifParkir = 5000{'\n'}    output(&quot;Tarif Parkir: Rp&quot;, tarifParkir)</span>{'\n'}
                    <span className="text-amber-300 font-bold">  endif</span>{'\n'}
                    <span className="text-slate-300">  output(&quot;Durasi parkir:&quot;, durasiParkir, &quot;jam&quot;)</span>
                  </>
                )}
              </pre>
            </div>
          </motion.div>
        )}

        {/* ── KODE PROGRAM ───────────────────────────────────────────────────────── */}
        {activeTab === 'kode' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-xl">
              <p className="text-slate-300 text-xs font-medium">
                💻 <strong>Kode Program</strong> — Implementasi nyata dalam Python dan JavaScript. Blok percabangan disorot lembut.
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
                <span>Nilai <code className="text-rose-400 font-mono">{cs.sliderVar}</code>:</span>
                <span className="font-mono font-bold text-white text-base">{sliderVal}{cs.sliderUnit}</span>
              </div>
              <input type="range" min={cs.sliderMin} max={cs.sliderMax} value={sliderVal}
                onChange={e => setSliderVal(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            {/* Code Block */}
            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-amber-500/60" /><div className="w-3 h-3 rounded-full bg-emerald-500/60" /></div>
                  <span className="text-xs text-slate-400 font-mono">{activeLang === 'python' ? 'studi_kasus.py' : 'studiKasus.js'}</span>
                </div>
              </div>
              <pre className="p-5 text-sm font-mono text-slate-200 leading-relaxed overflow-x-auto">
                {activeLang === 'python' ? cs.pythonCode(sliderVal) : cs.jsCode(sliderVal)}
              </pre>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-slate-800 border-b border-slate-700">
                <span className="text-xs text-rose-400 font-bold font-mono">Hasil Output Program</span>
              </div>
              <pre className="p-4 text-sm font-mono text-slate-300 whitespace-pre">{output}</pre>
            </div>
          </motion.div>
        )}
      </div>

      {/* ── MODAL MODE PROYEKTOR (LAYAR PENUH) ─────────────────────────────────── */}
      <AnimatePresence>
        {isProjectorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsProjectorOpen(false)}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md overflow-y-auto p-2 sm:p-4 md:p-6 flex items-center justify-center"
          >
            <div
              onClick={e => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[96vh] bg-slate-900 border-2 border-rose-500/50 rounded-2xl md:rounded-3xl p-3.5 sm:p-4 md:p-5 shadow-[0_0_80px_rgba(244,63,94,0.3)] relative flex flex-col justify-between overflow-y-auto gap-2.5 sm:gap-3 my-auto"
            >
              {/* Header Modal */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl sm:text-3xl">{cs.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold uppercase tracking-wider border border-rose-500/40">
                        Mode Proyektor (ESC untuk tutup)
                      </span>
                      <span className="text-slate-400 text-[11px] font-mono">Kasus {caseIdx + 1}/3</span>
                    </div>
                    <h2 className="text-base sm:text-lg md:text-xl font-black text-white mt-0.5">
                      {cs.title} — Flowchart Interaktif
                    </h2>
                  </div>
                </div>

                <button
                  onClick={() => setIsProjectorOpen(false)}
                  className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-all cursor-pointer font-bold text-xs sm:text-sm px-3 sm:px-4 flex items-center gap-1.5 shrink-0 shadow-sm"
                >
                  <span>✕</span> <span className="hidden sm:inline">Tutup Layar Penuh</span>
                </button>
              </div>

              {/* Status Bar Kondisi Besar */}
              <div className={`py-1.5 px-3 sm:px-4 rounded-xl border-2 text-xs sm:text-sm font-black text-center transition-all ${evalResult.condMet ? 'border-emerald-500 bg-emerald-950/70 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-rose-500 bg-rose-950/70 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.2)]'}`}>
                Evaluasi Logika: <code className="font-mono bg-slate-950 px-2 py-0.5 rounded-lg border border-white/20">{cs.flowchartInfo.conditionLabel}</code> → <span className="underline decoration-2 underline-offset-2">{evalResult.condMet ? 'TRUE → JALUR KIRI (Ya)' : 'FALSE → JALUR KANAN (Tidak)'}</span>
              </div>

              {/* Grid 2 Kolom di Mode Proyektor */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                
                {/* Kolom Kiri: Diagram Besar & Proporsional */}
                <div className="md:col-span-7 flex items-center justify-center p-2 sm:p-3 bg-slate-950 rounded-xl sm:rounded-2xl border border-slate-800">
                  <MiniFlowchart info={cs.flowchartInfo} condMet={evalResult.condMet} isProjector={true} />
                </div>

                {/* Kolom Kanan: Pengontrol Dosen & Output */}
                <div className="md:col-span-5 space-y-2.5">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      🎛️ Pengontrol Input Nilai:
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-300 font-bold">{cs.sliderVar}:</span>
                      <span className="font-mono font-black text-base sm:text-lg text-rose-400 bg-slate-900 px-3 py-0.5 rounded-lg border border-rose-500/50">
                        {sliderVal}{cs.sliderUnit}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={cs.sliderMin}
                      max={cs.sliderMax}
                      value={sliderVal}
                      onChange={e => setSliderVal(Number(e.target.value))}
                      className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono font-bold">
                      <span>Min: {cs.sliderMin}{cs.sliderUnit}</span>
                      <span>Max: {cs.sliderMax}{cs.sliderUnit}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      💻 Hasil Output Real-Time:
                    </p>
                    <pre className="text-xs sm:text-sm font-mono text-emerald-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800 whitespace-pre-wrap break-words leading-relaxed font-bold">
                      {output}
                    </pre>
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
