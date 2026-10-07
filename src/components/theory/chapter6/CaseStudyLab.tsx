"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  GitBranch,
  Code2,
  Sparkles,
  LayoutGrid,
  Columns,
  Maximize2,
  Terminal,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sliders,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

// ── Tipe Data Studi Kasus ─────────────────────────────────────────────────────
interface CaseStudy {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  problem: string;
  sliderVar: string;
  sliderUnit: string;
  sliderMin: number;
  sliderMax: number;
  sliderDefault: number;
  conditionStr: string;
  conditionDisplay: string;
  trueActionSummary: string;
  falseActionSummary: string;
  flowchartInfo: {
    conditionLabel: string;
    trueLabel: string;
    falseLabel: string;
  };
  evaluate: (v: number) => {
    condMet: boolean;
    output: string;
  };
  narrativeSteps: {
    step1: string;
    condition: string;
    trueBranch: string[];
    falseBranch: string[];
    step3: string;
  };
  pseudocodeLines: {
    programName: string;
    comment: string;
    kamus: string[];
    inputLine: string;
    ifCondition: string;
    trueLines: string[];
    falseLines: string[];
  };
  pythonCode: (v: number) => string;
  jsCode: (v: number) => string;
}

// ── Master Data Studi Kasus Terpadu ──────────────────────────────────────────
const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'kelulusan',
    emoji: '🎓',
    title: 'Penentu Status Kelulusan',
    subtitle: 'Kasus Nilai Ujian Mahasiswa',
    problem:
      'Sebuah perguruan tinggi menetapkan batas kelulusan nilai akhir ujian sebesar 75. Mahasiswa dinyatakan LULUS jika nilai akhir ≥ 75, dan TIDAK LULUS (wajib remedial) jika nilai akhir < 75.',
    sliderVar: 'nilaiAkhir',
    sliderUnit: '/100',
    sliderMin: 0,
    sliderMax: 100,
    sliderDefault: 65,
    conditionStr: 'nilaiAkhir >= 75',
    conditionDisplay: 'nilaiAkhir ≥ 75',
    trueActionSummary: 'LULUS (Memenuhi syarat kelulusan)',
    falseActionSummary: 'TIDAK LULUS (Perlu ujian remedial)',
    flowchartInfo: {
      conditionLabel: 'nilaiAkhir ≥ 75?',
      trueLabel: 'output("LULUS")',
      falseLabel: 'output("TIDAK LULUS")',
    },
    evaluate: v => ({
      condMet: v >= 75,
      output:
        v >= 75
          ? `> 🎉 Status: LULUS\n> Nilai Anda (${v}/100) memenuhi batas minimum 75.\n> Selamat, Anda tidak perlu remedial!`
          : `> ❌ Status: TIDAK LULUS\n> Nilai Anda (${v}/100) berada di bawah batas minimum 75.\n> Anda dijadwalkan mengikuti sesi remedial.`,
    }),
    narrativeSteps: {
      step1: '1. Masukkan nilai ujian akhir mahasiswa.',
      condition: '2. Jika nilaiAkhir >= 75 maka:',
      trueBranch: [
        'Tampilkan "Selamat! Status Anda: LULUS" ke layar.',
        'Tampilkan "Nilai Anda memenuhi syarat kelulusan." ke layar.',
      ],
      falseBranch: [
        'Tampilkan "Status Anda: TIDAK LULUS" ke layar.',
        'Tampilkan "Anda perlu mengikuti ujian remedial." ke layar.',
      ],
      step3: '3. Program penentuan kelulusan selesai.',
    },
    pseudocodeLines: {
      programName: 'PenentuStatusKelulusan',
      comment: 'Menentukan status kelulusan mahasiswa berdasarkan nilai akhir',
      kamus: ['nilaiAkhir : integer'],
      inputLine: 'input(nilaiAkhir)',
      ifCondition: 'if nilaiAkhir >= 75 then',
      trueLines: [
        'output("Selamat! Status Anda: LULUS")',
        'output("Nilai Anda memenuhi syarat kelulusan.")',
      ],
      falseLines: [
        'output("Status Anda: TIDAK LULUS")',
        'output("Anda perlu mengikuti ujian remedial.")',
      ],
    },
    pythonCode: v => `# Python — Kasus 1: Penentu Status Kelulusan
nilai_akhir = ${v}

if nilai_akhir >= 75:
    print("🎉 Selamat! Status Anda: LULUS")
    print("Nilai Anda memenuhi syarat kelulusan.")
else:
    print("❌ Status Anda: TIDAK LULUS")
    print("Anda perlu mengikuti ujian remedial.")

print(f"Nilai akhir: {nilai_akhir}/100")`,
    jsCode: v => `// JavaScript — Kasus 1: Penentu Status Kelulusan
const nilaiAkhir = ${v};

if (nilaiAkhir >= 75) {
    console.log("🎉 Selamat! Status Anda: LULUS");
    console.log("Nilai Anda memenuhi syarat kelulusan.");
} else {
    console.log("❌ Status Anda: TIDAK LULUS");
    console.log("Anda perlu mengikuti ujian remedial.");
}

console.log(\`Nilai akhir: \${nilaiAkhir}/100\`);`,
  },
  {
    id: 'diskon',
    emoji: '🛍️',
    title: 'Diskon Belanja Toko',
    subtitle: 'Kasus Potongan Harga Swalayan',
    problem:
      'Sebuah toko swalayan memberikan potongan harga 10% jika total belanja pelanggan mencapai Rp300.000 atau lebih (≥ 300.000). Jika belanja di bawah Rp300.000, pelanggan membayar harga normal tanpa potongan.',
    sliderVar: 'totalBelanja',
    sliderUnit: ' rb',
    sliderMin: 50,
    sliderMax: 700,
    sliderDefault: 450,
    conditionStr: 'totalBelanja >= 300000',
    conditionDisplay: 'belanja ≥ 300rb',
    trueActionSummary: 'Diskon 10% (Hemat 10% dari total belanja)',
    falseActionSummary: 'Bayar Normal (Belanja belum capai Rp300.000)',
    flowchartInfo: {
      conditionLabel: 'belanja ≥ 300rb?',
      trueLabel: 'output("Diskon 10%")',
      falseLabel: 'output("Bayar Normal")',
    },
    evaluate: v => {
      const belanja = v * 1000;
      const condMet = belanja >= 300000;
      const potongan = Math.round(belanja * 0.1);
      const bayar = condMet ? belanja - potongan : belanja;
      return {
        condMet,
        output: condMet
          ? `> 🎉 Diskon 10% Aktif!\n> 💰 Total Belanja : Rp${belanja.toLocaleString('id-ID')}\n> ✂️ Potongan Diskon: Rp${potongan.toLocaleString('id-ID')}\n> 💵 Total Bayar    : Rp${bayar.toLocaleString('id-ID')}`
          : `> ℹ️ Belum mencapai batas diskon Rp300.000\n> 💰 Total Belanja : Rp${belanja.toLocaleString('id-ID')}\n> 💵 Total Bayar    : Rp${bayar.toLocaleString('id-ID')}`,
      };
    },
    narrativeSteps: {
      step1: '1. Masukkan nilai totalBelanja pelanggan.',
      condition: '2. Jika totalBelanja >= 300000 maka:',
      trueBranch: [
        'Hitung potongan = totalBelanja * 10 / 100.',
        'Hitung totalBayar = totalBelanja - potongan.',
        'Tampilkan pesan diskon 10% dan totalBayar ke layar.',
      ],
      falseBranch: [
        'Tetapkan totalBayar = totalBelanja (tanpa potongan).',
        'Tampilkan pesan bayar normal dan totalBayar ke layar.',
      ],
      step3: '3. Tampilkan pesan terima kasih sudah berbelanja.',
    },
    pseudocodeLines: {
      programName: 'HitungDiskonBelanja',
      comment: 'Menghitung potongan belanja 10% jika total belanja >= 300000',
      kamus: ['totalBelanja : integer', 'potongan, totalBayar : integer'],
      inputLine: 'input(totalBelanja)',
      ifCondition: 'if totalBelanja >= 300000 then',
      trueLines: [
        'potongan = totalBelanja * 10 / 100',
        'totalBayar = totalBelanja - potongan',
        'output("Diskon 10%! Total bayar: Rp", totalBayar)',
      ],
      falseLines: [
        'totalBayar = totalBelanja',
        'output("Bayar Normal. Total bayar: Rp", totalBayar)',
      ],
    },
    pythonCode: v => {
      const belanja = v * 1000;
      return `# Python — Kasus 2: Diskon Belanja Toko
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
      return `// JavaScript — Kasus 2: Diskon Belanja Toko
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
  },
  {
    id: 'parkir',
    emoji: '🚗',
    title: 'Fasilitas Parkir Gratis',
    subtitle: 'Kasus Mall & Parkir Singkat',
    problem:
      'Sistem parkir mall memberlakukan tarif gratis (Rp0) jika durasi parkir di bawah 1 jam (< 1 jam). Jika durasi parkir 1 jam atau lebih, dikenakan tarif standar flat Rp5.000.',
    sliderVar: 'durasiParkir',
    sliderUnit: ' jam',
    sliderMin: 0,
    sliderMax: 5,
    sliderDefault: 2,
    conditionStr: 'durasiParkir < 1',
    conditionDisplay: 'durasi < 1 jam',
    trueActionSummary: 'GRATIS (Rp0 untuk parkir cepat)',
    falseActionSummary: 'Bayar Standar (Tarif flat Rp5.000)',
    flowchartInfo: {
      conditionLabel: 'durasi < 1 jam?',
      trueLabel: 'output("GRATIS")',
      falseLabel: 'output("Rp5.000")',
    },
    evaluate: v => ({
      condMet: v < 1,
      output:
        v < 1
          ? `> 🆓 GRATIS! Fasilitas Parkir di Bawah 1 Jam (Rp0)\n> ⏱️ Durasi Tercatat: ${v} jam\n> Kategori         : Pengunjung Singkat (Bebas Biaya)`
          : `> 💰 Tarif Parkir Flat Dikenakan: Rp5.000\n> ⏱️ Durasi Tercatat: ${v} jam\n> Kategori         : Parkir Standar Mall`,
    }),
    narrativeSteps: {
      step1: '1. Masukkan nilai durasiParkir kendaraan (dalam jam).',
      condition: '2. Jika durasiParkir < 1 maka:',
      trueBranch: [
        'Tetapkan tarifParkir = 0 (bebas biaya parkir).',
        'Tampilkan "GRATIS! (Parkir di bawah 1 jam)" ke layar.',
      ],
      falseBranch: [
        'Tetapkan tarifParkir = 5000 (tarif flat standar).',
        'Tampilkan "Tarif Parkir: Rp5.000" ke layar.',
      ],
      step3: '3. Tampilkan durasi parkir dan cetak karcis.',
    },
    pseudocodeLines: {
      programName: 'KalkulatorTarifParkir',
      comment: 'Menghitung tarif parkir gratis < 1 jam atau tarif flat 5000',
      kamus: ['durasiParkir : float', 'tarifParkir : integer'],
      inputLine: 'input(durasiParkir)',
      ifCondition: 'if durasiParkir < 1 then',
      trueLines: [
        'tarifParkir = 0',
        'output("GRATIS! (Parkir di bawah 1 jam)")',
      ],
      falseLines: [
        'tarifParkir = 5000',
        'output("Tarif Parkir: Rp", tarifParkir)',
      ],
    },
    pythonCode: v => `# Python — Kasus 3: Fasilitas Parkir Gratis
durasi_parkir = ${v}  # dalam jam

if durasi_parkir < 1:
    tarif_parkir = 0
    print("🆓 GRATIS! (Parkir di bawah 1 jam)")
else:
    tarif_parkir = 5000
    print(f"💰 Tarif Parkir: Rp{tarif_parkir:,}")

print(f"⏱️ Durasi: {durasi_parkir} jam")`,
    jsCode: v => `// JavaScript — Kasus 3: Fasilitas Parkir Gratis
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
  },
];

// ── Komponen Diagram Flowchart ANSI/ISO (High Contrast & Presisi) ─────────────
function CaseFlowchart({
  info,
  inputVar,
  condMet,
  isProjector = false,
}: {
  info: CaseStudy['flowchartInfo'];
  inputVar: string;
  condMet: boolean;
  isProjector?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 420 460"
      preserveAspectRatio="xMidYMid meet"
      className={`w-full ${
        isProjector ? 'h-[360px] max-h-[50vh]' : 'h-auto max-w-[340px] md:max-w-[360px]'
      } mx-auto block select-none`}
    >
      <defs>
        <marker id="cs-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" className="fill-slate-600 dark:fill-slate-400" />
        </marker>
        <marker id="cs-arrY" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#047857" className="dark:fill-emerald-400" />
        </marker>
        <marker id="cs-arrN" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#be123c" className="dark:fill-rose-400" />
        </marker>
      </defs>

      {/* 1. START — Kapsul Emerald */}
      <g>
        <rect
          x="140"
          y="10"
          width="140"
          height="36"
          rx="18"
          fill="#047857"
          stroke="#064e3b"
          strokeWidth="2.5"
        />
        <text
          x="210"
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
        x1="210"
        y1="46"
        x2="210"
        y2="76"
        className="stroke-slate-600 dark:stroke-slate-400"
        strokeWidth="2"
        markerEnd="url(#cs-arr)"
      />

      {/* 2. INPUT — Jajaran Genjang Ungu */}
      <polygon
        points="135,76 295,76 280,112 120,112"
        fill="#7e22ce"
        stroke="#581c87"
        strokeWidth="2.5"
      />
      <text
        x="208"
        y="99"
        textAnchor="middle"
        fontSize="11"
        fill="#ffffff"
        fontWeight="900"
        fontFamily="monospace"
      >
        input({inputVar})
      </text>
      <line
        x1="210"
        y1="112"
        x2="210"
        y2="146"
        className="stroke-slate-600 dark:stroke-slate-400"
        strokeWidth="2"
        markerEnd="url(#cs-arr)"
      />

      {/* 3. DIAMOND DECISION (ANSI Standard High Contrast) */}
      <polygon
        points="210,146 315,196 210,246 105,196"
        fill="#451a03"
        stroke="#f59e0b"
        strokeWidth="2.5"
      />
      <text
        x="210"
        y="190"
        textAnchor="middle"
        fontSize="11"
        fontWeight="900"
        fontFamily="monospace"
        fill="#fde68a"
      >
        {info.conditionLabel}
      </text>

      {/* Badge Evaluasi Kondisi Live */}
      <rect
        x="150"
        y="204"
        width="120"
        height="18"
        rx="9"
        fill={condMet ? '#047857' : '#be123c'}
        stroke={condMet ? '#34d399' : '#f87171'}
        strokeWidth="1.2"
      />
      <text
        x="210"
        y="216"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="900"
        fill="#ffffff"
      >
        {condMet ? '✓ TRUE (Ya)' : '✗ FALSE (Tidak)'}
      </text>

      {/* 4. CABANG YA (Kiri - Emerald) */}
      <g opacity={condMet ? 1 : 0.35} className="transition-opacity duration-300">
        <line
          x1="105"
          y1="196"
          x2="72"
          y2="196"
          stroke="#047857"
          strokeWidth={condMet ? 3.5 : 2}
          strokeDasharray={!condMet ? '4 3' : undefined}
        />
        <text
          x="90"
          y="188"
          textAnchor="middle"
          fontSize="12"
          fill="#047857"
          className="dark:fill-emerald-400"
          fontWeight="900"
        >
          Ya
        </text>
        <line
          x1="72"
          y1="196"
          x2="72"
          y2="288"
          stroke="#047857"
          strokeWidth={condMet ? 3.5 : 2}
          strokeDasharray={!condMet ? '4 3' : undefined}
          markerEnd="url(#cs-arrY)"
        />

        {/* Output True (Jajaran Genjang 130px) */}
        <polygon
          points="15,288 145,288 131,332 1,332"
          fill="#047857"
          stroke="#064e3b"
          strokeWidth={condMet ? 3 : 2}
        />
        <text
          x="73"
          y="314"
          textAnchor="middle"
          fontSize="9.5"
          fill="#ffffff"
          fontWeight="900"
          fontFamily="monospace"
        >
          {info.trueLabel}
        </text>

        {/* Badge Jalur Aktif / Dilewati */}
        <rect
          x="35"
          y="342"
          width="76"
          height="16"
          rx="8"
          fill={condMet ? '#064e3b' : '#334155'}
          stroke={condMet ? '#34d399' : '#64748b'}
          strokeWidth="1.2"
        />
        <text
          x="73"
          y="353"
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="900"
          fill="#ffffff"
        >
          {condMet ? '✓ DIJALANKAN' : '🚫 DILEWATI'}
        </text>

        <line
          x1="73"
          y1="332"
          x2="73"
          y2="396"
          stroke="#047857"
          strokeWidth={condMet ? 3.5 : 2}
          strokeDasharray={!condMet ? '4 3' : undefined}
        />
        <line
          x1="73"
          y1="396"
          x2="210"
          y2="396"
          stroke="#047857"
          strokeWidth={condMet ? 3.5 : 2}
          strokeDasharray={!condMet ? '4 3' : undefined}
        />
      </g>

      {/* 5. CABANG TIDAK (Kanan - Rose) */}
      <g opacity={!condMet ? 1 : 0.35} className="transition-opacity duration-300">
        <line
          x1="315"
          y1="196"
          x2="348"
          y2="196"
          stroke="#be123c"
          strokeWidth={!condMet ? 3.5 : 2}
          strokeDasharray={condMet ? '4 3' : undefined}
        />
        <text
          x="330"
          y="188"
          textAnchor="middle"
          fontSize="12"
          fill="#be123c"
          className="dark:fill-rose-400"
          fontWeight="900"
        >
          Tidak
        </text>
        <line
          x1="348"
          y1="196"
          x2="348"
          y2="288"
          stroke="#be123c"
          strokeWidth={!condMet ? 3.5 : 2}
          strokeDasharray={condMet ? '4 3' : undefined}
          markerEnd="url(#cs-arrN)"
        />

        {/* Output False (Jajaran Genjang 130px) */}
        <polygon
          points="289,288 419,288 405,332 275,332"
          fill="#be123c"
          stroke="#881337"
          strokeWidth={!condMet ? 3 : 2}
        />
        <text
          x="347"
          y="314"
          textAnchor="middle"
          fontSize="9.5"
          fill="#ffffff"
          fontWeight="900"
          fontFamily="monospace"
        >
          {info.falseLabel}
        </text>

        {/* Badge Jalur Aktif / Dilewati */}
        <rect
          x="309"
          y="342"
          width="76"
          height="16"
          rx="8"
          fill={!condMet ? '#881337' : '#334155'}
          stroke={!condMet ? '#f87171' : '#64748b'}
          strokeWidth="1.2"
        />
        <text
          x="347"
          y="353"
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="900"
          fill="#ffffff"
        >
          {!condMet ? '✓ DIJALANKAN' : '🚫 DILEWATI'}
        </text>

        <line
          x1="347"
          y1="332"
          x2="347"
          y2="396"
          stroke="#be123c"
          strokeWidth={!condMet ? 3.5 : 2}
          strokeDasharray={condMet ? '4 3' : undefined}
        />
        <line
          x1="347"
          y1="396"
          x2="210"
          y2="396"
          stroke="#be123c"
          strokeWidth={!condMet ? 3.5 : 2}
          strokeDasharray={condMet ? '4 3' : undefined}
        />
      </g>

      {/* 6. TITIK TEMU & ALUR KE SELESAI */}
      <circle cx="210" cy="396" r="3.5" fill="#334155" className="dark:fill-slate-400" />
      <line
        x1="210"
        y1="396"
        x2="210"
        y2="424"
        stroke="#334155"
        className="dark:stroke-slate-400"
        strokeWidth="2"
        markerEnd="url(#cs-arr)"
      />

      {/* 7. END — Kapsul Rose */}
      <g>
        <rect
          x="140"
          y="424"
          width="140"
          height="36"
          rx="18"
          fill="#be123c"
          stroke="#881337"
          strokeWidth="2.5"
        />
        <text
          x="210"
          y="447"
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

// ── Komponen Utama: Lab Studi Kasus Terpadu ───────────────────────────────────
export default function CaseStudyLab() {
  const [caseIdx, setCaseIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'matrix' | 'focus'>('matrix');
  const [focusTab, setFocusTab] = useState<'naratif' | 'flowchart' | 'pseudocode' | 'kode'>('flowchart');
  const [activeLang, setActiveLang] = useState<'python' | 'js'>('python');
  const [isProjectorOpen, setIsProjectorOpen] = useState(false);

  const cs = CASE_STUDIES[caseIdx];
  const [sliderVal, setSliderVal] = useState(cs.sliderDefault);

  // Sinkronisasi slider saat skenario berpindah
  const handleCaseChange = (newIdx: number) => {
    setCaseIdx(newIdx);
    setSliderVal(CASE_STUDIES[newIdx].sliderDefault);
  };

  const evalResult = cs.evaluate(sliderVal);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsProjectorOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="border border-border/70 dark:border-slate-800 rounded-3xl overflow-hidden bg-card dark:bg-slate-950 shadow-2xl">
      {/* ── 1. HEADER UTAMA: Judul, Selector Kasus, & Mode Switcher ───────────── */}
      <div className="p-4 md:px-6 bg-slate-100/90 dark:bg-slate-900/90 border-b border-border/70 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔬</span>
          <div>
            <h3 className="font-extrabold text-base md:text-lg text-slate-950 dark:text-white">
              Lab Studi Kasus Terpadu — 4 Representasi Algoritma
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Satu logika percabangan dianalisis serentak lintas 4 bentuk representasi.
            </p>
          </div>
        </div>

        {/* View Mode Toggle: Matriks vs Tab Fokus */}
        <div className="flex items-center gap-1.5 bg-slate-200/80 dark:bg-slate-950 p-1 rounded-xl border border-border/70 dark:border-slate-800 self-start md:self-center shrink-0">
          <button
            onClick={() => setViewMode('matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'matrix'
                ? 'bg-rose-700 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
            title="Tampilkan ke-4 representasi sekaligus dalam format matriks"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Matriks 4 Terpadu</span>
          </button>
          <button
            onClick={() => setViewMode('focus')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'focus'
                ? 'bg-rose-700 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
            title="Fokus telaah satu per satu dalam tampilan 2-kolom berdampingan"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Tab Fokus</span>
          </button>
        </div>
      </div>

      {/* ── 2. SUB-BAR: Kasus Selector Pills ──────────────────────────────────── */}
      <div className="px-4 md:px-6 py-2.5 bg-slate-50/80 dark:bg-slate-900/60 border-b border-border/60 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">
            Pilih Kasus:
          </span>
          {CASE_STUDIES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => handleCaseChange(i)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                caseIdx === i
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white shadow-xs'
                  : 'bg-card dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-border/70 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{c.emoji}</span>
              <span>{c.title}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsProjectorOpen(true)}
          className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Layar Penuh Flowchart</span>
        </button>
      </div>

      {/* ── 3. LIVE CONTROLLER BAR (Kompak, Elegan & Proporsional) ─────────────── */}
      <div className="p-4 md:px-6 bg-slate-100/60 dark:bg-slate-900/40 border-b border-border/60 dark:border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          {/* Deskripsi Kasus Ringkas */}
          <div className="lg:col-span-5 p-3 bg-card dark:bg-slate-900 rounded-xl border border-border/70 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
            <span className="font-bold text-rose-700 dark:text-rose-400 block mb-0.5">
              📌 Masalah: {cs.subtitle}
            </span>
            <p className="line-clamp-2 leading-relaxed text-[11px] text-slate-600 dark:text-slate-400">
              {cs.problem}
            </p>
          </div>

          {/* Slider Input Proporsional */}
          <div className="lg:col-span-4 p-3 bg-card dark:bg-slate-900 rounded-xl border border-border/70 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Nilai Input (<code className="text-rose-700 dark:text-rose-400 font-black">{cs.sliderVar}</code>):
              </span>
              <span className="font-black text-slate-900 dark:text-white px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                {sliderVal}
                {cs.sliderUnit}
              </span>
            </div>
            <input
              type="range"
              min={cs.sliderMin}
              max={cs.sliderMax}
              value={sliderVal}
              onChange={e => setSliderVal(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Min: {cs.sliderMin}</span>
              <span>Max: {cs.sliderMax}</span>
            </div>
          </div>

          {/* Live Status Evaluasi Kondisi */}
          <div
            className={`lg:col-span-3 p-3 rounded-xl border text-xs font-bold flex flex-col justify-center items-center text-center gap-1 transition-all ${
              evalResult.condMet
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 text-rose-900 dark:text-rose-200'
            }`}
          >
            <div className="flex items-center gap-1 font-mono text-[11px]">
              <span>Kondisi:</span>
              <span className="bg-white/80 dark:bg-slate-900/80 px-1.5 py-0.5 rounded border border-border/60">
                {cs.conditionDisplay}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {evalResult.condMet ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              )}
              <span className="font-black">
                {evalResult.condMet ? 'TRUE (Jalur Ya)' : 'FALSE (Jalur Tidak)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. AREA KERJA KONTEN ──────────────────────────────────────────────── */}
      <div className="p-4 md:p-6">
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* VIEW 1: MATRIKS 4 TERPADU (GRID 2x2 — BANDINGKAN SECARA SERENTAK)      */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {viewMode === 'matrix' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
              {/* CARD 1: 📝 ALGORITMA NARATIF */}
              <div className="rounded-2xl border border-border/80 dark:border-slate-800 bg-card dark:bg-slate-900/90 overflow-hidden flex flex-col shadow-sm">
                <div className="px-4 py-2.5 bg-slate-100/80 dark:bg-slate-800/80 border-b border-border/70 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>1. Algoritma Naratif</span>
                  </div>
                  <button
                    onClick={() => {
                      setViewMode('focus');
                      setFocusTab('naratif');
                    }}
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Fokus</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-4 font-mono text-xs leading-relaxed flex-1 space-y-2 text-slate-800 dark:text-slate-200">
                  <p className="text-slate-500 dark:text-slate-400">
                    {cs.narrativeSteps.step1}
                  </p>

                  <div className="p-2.5 rounded-xl border border-border/60 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 space-y-2">
                    <p className="font-black text-amber-700 dark:text-amber-300">
                      {cs.narrativeSteps.condition}
                    </p>
                    {/* Jalur True */}
                    <div
                      className={`pl-3 space-y-0.5 transition-all duration-300 ${
                        evalResult.condMet
                          ? 'bg-emerald-500/10 border-l-2 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold p-1 rounded-r'
                          : 'opacity-35'
                      }`}
                    >
                      {cs.narrativeSteps.trueBranch.map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>

                    <p className="font-black text-amber-700 dark:text-amber-300">
                      Selain itu:
                    </p>
                    {/* Jalur False */}
                    <div
                      className={`pl-3 space-y-0.5 transition-all duration-300 ${
                        !evalResult.condMet
                          ? 'bg-rose-500/10 border-l-2 border-rose-500 text-rose-800 dark:text-rose-300 font-bold p-1 rounded-r'
                          : 'opacity-35'
                      }`}
                    >
                      {cs.narrativeSteps.falseBranch.map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-500 dark:text-slate-400">
                    {cs.narrativeSteps.step3}
                  </p>
                </div>
              </div>

              {/* CARD 2: 🔷 FLOWCHART ANSI / ISO */}
              <div className="rounded-2xl border border-border/80 dark:border-slate-800 bg-card dark:bg-slate-900/90 overflow-hidden flex flex-col shadow-sm">
                <div className="px-4 py-2.5 bg-slate-100/80 dark:bg-slate-800/80 border-b border-border/70 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <GitBranch className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>2. Flowchart ANSI / ISO</span>
                  </div>
                  <button
                    onClick={() => {
                      setViewMode('focus');
                      setFocusTab('flowchart');
                    }}
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Fokus</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-3 flex-1 flex items-center justify-center bg-slate-50/50 dark:bg-slate-950/40">
                  <CaseFlowchart
                    info={cs.flowchartInfo}
                    inputVar={cs.sliderVar}
                    condMet={evalResult.condMet}
                    isProjector={false}
                  />
                </div>
              </div>

              {/* CARD 3: 📋 PSEUDOCODE STANDAR (CLRS) */}
              <div className="rounded-2xl border border-border/80 dark:border-slate-800 bg-card dark:bg-slate-900/90 overflow-hidden flex flex-col shadow-sm">
                <div className="px-4 py-2.5 bg-slate-100/80 dark:bg-slate-800/80 border-b border-border/70 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>3. Pseudocode Standar</span>
                  </div>
                  <button
                    onClick={() => {
                      setViewMode('focus');
                      setFocusTab('pseudocode');
                    }}
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Fokus</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <pre className="p-4 font-mono text-xs leading-relaxed flex-1 overflow-x-auto text-slate-800 dark:text-slate-200 whitespace-pre">
                  <span className="text-purple-700 dark:text-purple-400 font-bold">PROGRAM</span>{' '}
                  <span className="font-bold text-slate-900 dark:text-white">
                    {cs.pseudocodeLines.programName}
                  </span>
                  {'\n'}
                  <span className="text-slate-500 italic text-[11px]">
                    // {cs.pseudocodeLines.comment}
                  </span>
                  {'\n\n'}
                  <span className="text-sky-800 dark:text-sky-400 font-bold">KAMUS:</span>
                  {'\n'}
                  {cs.pseudocodeLines.kamus.map((line, idx) => (
                    <span key={idx} className="text-slate-600 dark:text-slate-400">
                      {'  '}
                      {line}
                      {'\n'}
                    </span>
                  ))}
                  {'\n'}
                  <span className="text-amber-700 dark:text-amber-400 font-bold">ALGORITMA:</span>
                  {'\n'}
                  <span className="text-slate-700 dark:text-slate-300">
                    {'  '}
                    {cs.pseudocodeLines.inputLine}
                  </span>
                  {'\n'}
                  <span className="text-amber-700 dark:text-amber-400 font-bold">
                    {'  '}
                    {cs.pseudocodeLines.ifCondition}
                  </span>
                  {'\n'}
                  {/* True Lines */}
                  <span
                    className={`block pl-6 transition-all duration-300 ${
                      evalResult.condMet
                        ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-bold border-l-2 border-emerald-500'
                        : 'opacity-35'
                    }`}
                  >
                    {cs.pseudocodeLines.trueLines.map((l, i) => (
                      <span key={i} className="block">
                        {l}
                      </span>
                    ))}
                  </span>
                  <span className="text-amber-700 dark:text-amber-400 font-bold">
                    {'  else\n'}
                  </span>
                  {/* False Lines */}
                  <span
                    className={`block pl-6 transition-all duration-300 ${
                      !evalResult.condMet
                        ? 'bg-rose-500/10 text-rose-800 dark:text-rose-300 font-bold border-l-2 border-rose-500'
                        : 'opacity-35'
                    }`}
                  >
                    {cs.pseudocodeLines.falseLines.map((l, i) => (
                      <span key={i} className="block">
                        {l}
                      </span>
                    ))}
                  </span>
                  <span className="text-amber-700 dark:text-amber-400 font-bold">
                    {'  endif'}
                  </span>
                </pre>
              </div>

              {/* CARD 4: 💻 KODE PROGRAM & LIVE TERMINAL */}
              <div className="rounded-2xl border border-border/80 dark:border-slate-800 bg-card dark:bg-slate-900/90 overflow-hidden flex flex-col shadow-sm">
                <div className="px-4 py-2 bg-slate-100/80 dark:bg-slate-800/80 border-b border-border/70 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      4. Kode Program & Eksekusi
                    </span>
                  </div>
                  {/* Toggle Bahasa */}
                  <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-950 p-0.5 rounded-lg border border-border/60">
                    <button
                      onClick={() => setActiveLang('python')}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-all ${
                        activeLang === 'python'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Python
                    </button>
                    <button
                      onClick={() => setActiveLang('js')}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-all ${
                        activeLang === 'js'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      JS
                    </button>
                  </div>
                </div>

                <div className="p-3 font-mono text-xs flex-1 flex flex-col justify-between space-y-3">
                  <pre className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 whitespace-pre overflow-x-auto border border-border/60 dark:border-slate-800 leading-relaxed max-h-[190px]">
                    {activeLang === 'python' ? cs.pythonCode(sliderVal) : cs.jsCode(sliderVal)}
                  </pre>

                  {/* Terminal Output Live */}
                  <div className="rounded-xl border border-border/70 dark:border-slate-800 bg-slate-900 text-slate-100 overflow-hidden">
                    <div className="px-3 py-1 bg-slate-950 border-b border-slate-800 flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                      <Terminal className="w-3 h-3 text-emerald-400" />
                      <span>Live Terminal Output:</span>
                    </div>
                    <pre className="p-2.5 text-[11px] text-emerald-400 whitespace-pre leading-relaxed font-mono">
                      {evalResult.output}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* VIEW 2: TAB FOKUS (2-KOLOM SPLIT DASHBOARD ERGONOMIS)                   */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {viewMode === 'focus' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Tab Selector Representasi */}
            <div className="flex items-center gap-1.5 bg-slate-100/90 dark:bg-slate-900 p-1 rounded-2xl border border-border/70 dark:border-slate-800 flex-wrap">
              {[
                { id: 'naratif', label: '📝 Naratif', icon: <FileText className="w-3.5 h-3.5" /> },
                { id: 'flowchart', label: '🔷 Flowchart', icon: <GitBranch className="w-3.5 h-3.5" /> },
                { id: 'pseudocode', label: '📋 Pseudocode', icon: <Sparkles className="w-3.5 h-3.5" /> },
                { id: 'kode', label: '💻 Kode Program', icon: <Code2 className="w-3.5 h-3.5" /> },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFocusTab(tab.id as typeof focusTab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    focusTab === tab.id
                      ? 'bg-rose-700 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* 2-Column Split Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* KOLOM KIRI (7-col): Detail Representasi yang Dipilih */}
              <div className="lg:col-span-7 flex flex-col justify-center rounded-2xl border border-border/80 dark:border-slate-800 bg-card dark:bg-slate-900 p-4 shadow-sm">
                {focusTab === 'naratif' && (
                  <div className="space-y-3 font-mono text-xs leading-relaxed text-slate-800 dark:text-slate-200">
                    <div className="p-3 bg-blue-50/80 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200">
                      <p className="font-sans font-bold text-xs mb-1">
                        📝 Algoritma Naratif ({cs.title})
                      </p>
                      <p className="font-sans text-[11px] leading-relaxed">
                        Bahasa alami langkah demi langkah. Baris yang aktif disorot otomatis saat nilai input di sebelah kanan diubah.
                      </p>
                    </div>

                    <pre className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-border/70 dark:border-slate-800 whitespace-pre overflow-x-auto leading-relaxed">
                      <span className="text-slate-500">{cs.narrativeSteps.step1}</span>
                      {'\n\n'}
                      <span className="font-black text-amber-700 dark:text-amber-300">
                        {cs.narrativeSteps.condition}
                      </span>
                      {'\n'}
                      <span
                        className={`block pl-4 ${
                          evalResult.condMet
                            ? 'bg-emerald-500/15 border-l-2 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold p-1 rounded-r'
                            : 'opacity-35'
                        }`}
                      >
                        {cs.narrativeSteps.trueBranch.map((l, i) => (
                          <span key={i} className="block">
                            {l}
                          </span>
                        ))}
                      </span>
                      <span className="font-black text-amber-700 dark:text-amber-300">
                        Selain itu:
                      </span>
                      {'\n'}
                      <span
                        className={`block pl-4 ${
                          !evalResult.condMet
                            ? 'bg-rose-500/10 border-l-2 border-rose-500 text-rose-800 dark:text-rose-300 font-bold p-1 rounded-r'
                            : 'opacity-35'
                        }`}
                      >
                        {cs.narrativeSteps.falseBranch.map((l, i) => (
                          <span key={i} className="block">
                            {l}
                          </span>
                        ))}
                      </span>
                      {'\n'}
                      <span className="text-slate-500">{cs.narrativeSteps.step3}</span>
                    </pre>
                  </div>
                )}

                {focusTab === 'flowchart' && (
                  <div className="flex flex-col items-center justify-center p-2">
                    <CaseFlowchart
                      info={cs.flowchartInfo}
                      inputVar={cs.sliderVar}
                      condMet={evalResult.condMet}
                      isProjector={false}
                    />
                  </div>
                )}

                {focusTab === 'pseudocode' && (
                  <div className="space-y-3 font-mono text-xs leading-relaxed">
                    <div className="p-3 bg-purple-50/80 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-900 text-purple-900 dark:text-purple-200 font-sans">
                      <p className="font-bold text-xs mb-1">
                        📋 Pseudocode Standar CLRS ({cs.title})
                      </p>
                      <p className="text-[11px] leading-relaxed">
                        Mengikuti format baku 3 blok (PROGRAM, KAMUS, ALGORITMA) dengan penutup percabangan <code>endif</code>.
                      </p>
                    </div>

                    <pre className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-border/70 dark:border-slate-800 text-slate-800 dark:text-slate-200 whitespace-pre overflow-x-auto leading-relaxed">
                      <span className="text-purple-700 dark:text-purple-400 font-bold">PROGRAM</span>{' '}
                      <span className="font-bold text-slate-900 dark:text-white">
                        {cs.pseudocodeLines.programName}
                      </span>
                      {'\n'}
                      <span className="text-slate-500 italic text-[11px]">
                        // {cs.pseudocodeLines.comment}
                      </span>
                      {'\n\n'}
                      <span className="text-sky-800 dark:text-sky-400 font-bold">KAMUS:</span>
                      {'\n'}
                      {cs.pseudocodeLines.kamus.map((line, idx) => (
                        <span key={idx} className="text-slate-600 dark:text-slate-400">
                          {'  '}
                          {line}
                          {'\n'}
                        </span>
                      ))}
                      {'\n'}
                      <span className="text-amber-700 dark:text-amber-400 font-bold">ALGORITMA:</span>
                      {'\n'}
                      <span className="text-slate-700 dark:text-slate-300">
                        {'  '}
                        {cs.pseudocodeLines.inputLine}
                      </span>
                      {'\n'}
                      <span className="text-amber-700 dark:text-amber-400 font-bold">
                        {'  '}
                        {cs.pseudocodeLines.ifCondition}
                      </span>
                      {'\n'}
                      <span
                        className={`block pl-6 ${
                          evalResult.condMet
                            ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold border-l-2 border-emerald-500 p-1 rounded-r'
                            : 'opacity-35'
                        }`}
                      >
                        {cs.pseudocodeLines.trueLines.map((l, i) => (
                          <span key={i} className="block">
                            {l}
                          </span>
                        ))}
                      </span>
                      <span className="text-amber-700 dark:text-amber-400 font-bold">
                        {'  else\n'}
                      </span>
                      <span
                        className={`block pl-6 ${
                          !evalResult.condMet
                            ? 'bg-rose-500/10 text-rose-800 dark:text-rose-300 font-bold border-l-2 border-rose-500 p-1 rounded-r'
                            : 'opacity-35'
                        }`}
                      >
                        {cs.pseudocodeLines.falseLines.map((l, i) => (
                          <span key={i} className="block">
                            {l}
                          </span>
                        ))}
                      </span>
                      <span className="text-amber-700 dark:text-amber-400 font-bold">
                        {'  endif'}
                      </span>
                    </pre>
                  </div>
                )}

                {focusTab === 'kode' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between pb-1 border-b border-border/60">
                      <span className="font-sans font-bold text-xs text-slate-800 dark:text-slate-200">
                        Bahasa Pemrograman:
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setActiveLang('python')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                            activeLang === 'python'
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          🐍 Python
                        </button>
                        <button
                          onClick={() => setActiveLang('js')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                            activeLang === 'js'
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          ⚡ JavaScript
                        </button>
                      </div>
                    </div>

                    <pre className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-border/70 dark:border-slate-800 text-slate-800 dark:text-slate-200 whitespace-pre overflow-x-auto leading-relaxed max-h-[360px]">
                      {activeLang === 'python' ? cs.pythonCode(sliderVal) : cs.jsCode(sliderVal)}
                    </pre>
                  </div>
                )}
              </div>

              {/* KOLOM KANAN (5-col): Panel Kontrol, Feedback, & Terminal */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-3">
                {/* Petunjuk Live */}
                <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/50 rounded-2xl text-xs text-amber-950 dark:text-amber-200">
                  <p className="font-bold mb-1">
                    💡 Hubungan Logika & Output:
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    Ubah nilai slider di atas untuk melihat bagaimana komputer mengevaluasi syarat boolean dan menentukan jalur aksi yang dieksekusi.
                  </p>
                </div>

                {/* Ringkasan Cabang Aktif */}
                <div className="p-4 bg-card dark:bg-slate-900 rounded-2xl border border-border/70 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Cabang Logika Terpilih:
                  </span>
                  <div
                    className={`p-3 rounded-xl border text-xs font-bold ${
                      evalResult.condMet
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                        : 'bg-rose-50 dark:bg-rose-950/50 border-rose-400 text-rose-900 dark:text-rose-200'
                    }`}
                  >
                    <p className="text-sm font-black mb-0.5">
                      {evalResult.condMet ? '✅ Cabang TRUE (Ya)' : '❌ Cabang FALSE (Tidak)'}
                    </p>
                    <p className="text-[11px] font-normal">
                      Aksi:{' '}
                      <strong>
                        {evalResult.condMet ? cs.trueActionSummary : cs.falseActionSummary}
                      </strong>
                    </p>
                  </div>
                </div>

                {/* Output Terminal Live */}
                <div className="rounded-2xl border border-border/70 dark:border-slate-800 bg-slate-900 text-slate-100 overflow-hidden shadow-md">
                  <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Hasil Output Terminal Live</span>
                    </div>
                    <span className="text-[10px] text-emerald-400">● REAL-TIME</span>
                  </div>
                  <pre className="p-3.5 text-xs text-emerald-400 whitespace-pre leading-relaxed font-mono">
                    {evalResult.output}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* ── 5. MODAL MODE PROYEKTOR (LAYAR PENUH) ─────────────────────────────── */}
      <AnimatePresence>
        {isProjectorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsProjectorOpen(false)}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md overflow-y-auto p-4 md:p-6 flex items-center justify-center"
          >
            <div
              onClick={e => e.stopPropagation()}
              className="w-full max-w-4xl bg-slate-900 border-2 border-rose-500/50 rounded-3xl p-5 md:p-6 shadow-[0_0_80px_rgba(244,63,94,0.3)] relative flex flex-col gap-4 my-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cs.emoji}</span>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold uppercase tracking-wider border border-rose-500/40">
                      Mode Proyektor (ESC untuk Tutup)
                    </span>
                    <h2 className="text-lg md:text-xl font-black text-white mt-1">
                      {cs.title} — Flowchart Interaktif Layar Penuh
                    </h2>
                  </div>
                </div>

                <button
                  onClick={() => setIsProjectorOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-all cursor-pointer font-bold text-xs shrink-0"
                >
                  ✕ Tutup
                </button>
              </div>

              {/* Slider Controller di Modal */}
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                  <span>Input:</span>
                  <span className="text-base font-black text-rose-400 bg-slate-900 px-3 py-0.5 rounded border border-rose-500/40">
                    {sliderVal}
                    {cs.sliderUnit}
                  </span>
                </div>
                <input
                  type="range"
                  min={cs.sliderMin}
                  max={cs.sliderMax}
                  value={sliderVal}
                  onChange={e => setSliderVal(Number(e.target.value))}
                  className="w-64 accent-rose-500 cursor-pointer h-2 bg-slate-900 rounded-lg"
                />
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-lg ${
                    evalResult.condMet
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white'
                  }`}
                >
                  {evalResult.condMet ? '✓ KONDISI TRUE' : '✗ KONDISI FALSE'}
                </span>
              </div>

              {/* Kanvas Flowchart Proyektor */}
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-center">
                <CaseFlowchart
                  info={cs.flowchartInfo}
                  inputVar={cs.sliderVar}
                  condMet={evalResult.condMet}
                  isProjector={true}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
