"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  Scale,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldCheck,
  Info,
} from 'lucide-react';

// ── Tipe Data Tab ─────────────────────────────────────────────────────────────
type ActiveTab = 'anatomy' | 'operators' | 'builder' | 'pitfalls';

// ── Data Operator Relasional ──────────────────────────────────────────────────
interface OperatorData {
  id: string;
  symbol: string;
  mathSymbol: string;
  name: string;
  type: 'inklusif' | 'eksklusif' | 'kesamaan';
  pseudo: string;
  python: string;
  js: string;
  meaning: string;
  scenarioTitle: string;
  scenarioDesc: string;
  varName: string;
  unit: string;
  threshold: number;
  min: number;
  max: number;
  step: number;
  evalFn: (val: number) => boolean;
  bestPractice: string;
  pitfall: string;
}

const OPERATORS_DATA: OperatorData[] = [
  {
    id: 'gte',
    symbol: '>=',
    mathSymbol: '≥',
    name: 'Lebih Besar Sama Dengan',
    type: 'inklusif',
    pseudo: 'nilai >= 75',
    python: 'nilai >= 75',
    js: 'nilai >= 75',
    meaning: 'Memeriksa apakah nilai kiri mencapai ATAU melampaui batas minimal (nilai batas TERMASUK/LOLOS).',
    scenarioTitle: 'Syarat Kelulusan KKM Akademik',
    scenarioDesc: 'Seorang mahasiswa dinyatakan LULUS jika nilai akhirnya minimal 75. Nilai 75 pas harus LULUS.',
    varName: 'nilai',
    unit: '',
    threshold: 75,
    min: 50,
    max: 100,
    step: 1,
    evalFn: val => val >= 75,
    bestPractice: 'Gunakan saat titik batas minimal masih sah/memenuhi kriteria (syarat usia KTP, KKM, kuota minimum).',
    pitfall: 'Jangan gunakan `>` jika nilai 75 masih diperbolehkan lulus, karena `75 > 75` bernilai FALSE!',
  },
  {
    id: 'gt',
    symbol: '>',
    mathSymbol: '>',
    name: 'Lebih Besar (Mutlak)',
    type: 'eksklusif',
    pseudo: 'suhu > 37.5',
    python: 'suhu > 37.5',
    js: 'suhu > 37.5',
    meaning: 'Memeriksa apakah nilai kiri MUTLAK di atas batas (nilai batas TIDAK termasuk).',
    scenarioTitle: 'Peringatan Demam Medis',
    scenarioDesc: 'Suhu tubuh normal manusia adalah sampai 37.5°C. Peringatan demam HANYA aktif jika suhu MELEBIHI 37.5°C.',
    varName: 'suhu',
    unit: '°C',
    threshold: 37.5,
    min: 35.0,
    max: 41.0,
    step: 0.1,
    evalFn: val => val > 37.5,
    bestPractice: 'Gunakan saat nilai batas masih tergolong normal/aman, dan aksi hanya dipicu saat melampaui batas tersebut.',
    pitfall: 'Jika suhu tepat 37.5°C dievaluasi dengan `>`, hasilnya FALSE (dianggap belum demam).',
  },
  {
    id: 'lte',
    symbol: '<=',
    mathSymbol: '≤',
    name: 'Lebih Kecil Sama Dengan',
    type: 'inklusif',
    pseudo: 'usia <= 12',
    python: 'usia <= 12',
    js: 'usia <= 12',
    meaning: 'Memeriksa apakah nilai kiri MAKSIMAL mencapai batas atas (nilai batas TERMASUK).',
    scenarioTitle: 'Tarif Tiket Kategori Anak',
    scenarioDesc: 'Tiket tarif anak-anak berlaku untuk pengunjung yang berusia maksimal 12 tahun (12 tahun masih dapat tarif anak).',
    varName: 'usia',
    unit: ' tahun',
    threshold: 12,
    min: 1,
    max: 25,
    step: 1,
    evalFn: val => val <= 12,
    bestPractice: 'Gunakan untuk batas atas inklusif (kapasitas lift, usia maksimal anak, batas kuota terisi).',
    pitfall: 'Jika usia 12 tahun menggunakan `<`, anak berumur 12 tahun akan terlempar ke kategori dewasa!',
  },
  {
    id: 'lt',
    symbol: '<',
    mathSymbol: '<',
    name: 'Lebih Kecil (Mutlak)',
    type: 'eksklusif',
    pseudo: 'durasi < 1',
    python: 'durasi < 1',
    js: 'durasi < 1',
    meaning: 'Memeriksa apakah nilai kiri MUTLAK di bawah batas (nilai batas TIDAK termasuk).',
    scenarioTitle: 'Fasilitas Parkir Gratis Kurang dari 1 Jam',
    scenarioDesc: 'Parkir gratis diberikan HANYA jika durasi parkir belum mencapai 1 jam penuh (< 1 jam). Parkir tepat 1 jam sudah berbayar.',
    varName: 'durasi',
    unit: ' jam',
    threshold: 1,
    min: 0,
    max: 5,
    step: 0.5,
    evalFn: val => val < 1,
    bestPractice: 'Gunakan saat titik batas atas menandai mulainya kategori atau tarif baru.',
    pitfall: 'Jika durasi tepat 1.0 jam diuji dengan `<`, hasilnya FALSE (sudah masuk tarif berbayar).',
  },
  {
    id: 'eq',
    symbol: '==',
    mathSymbol: '=',
    name: 'Sama Dengan (Kesamaan)',
    type: 'kesamaan',
    pseudo: 'angka % 2 == 0',
    python: 'angka % 2 == 0',
    js: 'angka % 2 === 0',
    meaning: 'Memeriksa apakah kedua nilai bernilai IDENTIK/SAMA PERSIS.',
    scenarioTitle: 'Pemeriksaan Bilangan Genap',
    scenarioDesc: 'Sebuah bilangan bulat adalah GENAP jika sisa pembagiannya dengan 2 menghasilkan nilai tepat 0.',
    varName: 'angka',
    unit: '',
    threshold: 0,
    min: 1,
    max: 20,
    step: 1,
    evalFn: val => val % 2 === 0,
    bestPractice: 'Sesuai standar CLRS, selalu gunakan `==` untuk menguji kesamaan di pseudocode maupun kode nyata, BUKAN tanda penugasan tunggal `=`.',
    pitfall: '⚠️ JEBAKAN UTAMA PEMULA: Menulis `if nilai = 75` yang akan menyebabkan kerancuan antara penugasan nilai dan pengujian kesamaan!',
  },
  {
    id: 'neq',
    symbol: '!=',
    mathSymbol: '≠',
    name: 'Tidak Sama Dengan (Pengecualian)',
    type: 'kesamaan',
    pseudo: 'pembagi != 0',
    python: 'pembagi != 0',
    js: 'pembagi !== 0',
    meaning: 'Memeriksa apakah nilai kiri BERBEDA dari nilai kanan (pengecualian nilai khusus).',
    scenarioTitle: 'Pencegahan Pembagian dengan Nol (Zero Division)',
    scenarioDesc: 'Operasi pembagian matematika `a / b` hanya boleh dijalankan jika penyebut/pembagi BUKAN angka nol.',
    varName: 'pembagi',
    unit: '',
    threshold: 0,
    min: -5,
    max: 5,
    step: 1,
    evalFn: val => val !== 0,
    bestPractice: 'Gunakan `!=` untuk validasi keamanan input sebelum eksekusi berbahaya (seperti pembagian nol atau string kosong).',
    pitfall: 'Notasi klasik Pascal menggunakan `<>`, namun standar CLRS modern yang kita terapkan menggunakan `!=` agar selaras dengan bahasa pemrograman riil.',
  },
];

// ── Data Skenario Builder ─────────────────────────────────────────────────────
interface BuilderScenario {
  id: string;
  title: string;
  category: string;
  story: string;
  optionsLeft: string[];
  optionsOp: string[];
  optionsRight: string[];
  correctLeft: string;
  correctOp: string;
  correctRight: string;
  testVarName: string;
  testMin: number;
  testMax: number;
  testStep: number;
  testDefault: number;
  testUnit: string;
  evalTarget: (val: number) => boolean;
  explanation: string;
}

const BUILDER_SCENARIOS: BuilderScenario[] = [
  {
    id: 'sim',
    title: 'Kelayakan Usia Pembuatan SIM',
    category: 'Regulasi',
    story: 'Warga negara berhak mengajukan Surat Izin Mengemudi (SIM) jika telah berusia minimal 17 tahun. Usia 17 tahun tepat sudah berhak membuat SIM.',
    optionsLeft: ['usia', 'tahunLahir', 'nomorKTP'],
    optionsOp: ['>=', '>', '<=', '=='],
    optionsRight: ['17', '18', '21'],
    correctLeft: 'usia',
    correctOp: '>=',
    correctRight: '17',
    testVarName: 'usia',
    testMin: 14,
    testMax: 25,
    testStep: 1,
    testDefault: 16,
    testUnit: ' tahun',
    evalTarget: v => v >= 17,
    explanation: 'Karena usia 17 tahun sudah diizinkan, operator yang benar adalah `>=` (Inklusif) dengan ambang 17.',
  },
  {
    id: 'ongkir',
    title: 'Diskon Bebas Ongkir Toko Online',
    category: 'E-Commerce',
    story: 'Promo ongkir gratis diberikan kepada pembeli jika total belanja mencapai minimal Rp100.000. Belanja Rp100.000 pas mendapat gratis ongkir.',
    optionsLeft: ['totalBelanja', 'ongkir', 'jumlahBarang'],
    optionsOp: ['>=', '>', '==', '!='],
    optionsRight: ['100000', '50000', '150000'],
    correctLeft: 'totalBelanja',
    correctOp: '>=',
    correctRight: '100000',
    testVarName: 'totalBelanja',
    testMin: 40000,
    testMax: 200000,
    testStep: 10000,
    testDefault: 80000,
    testUnit: ' (Rp)',
    evalTarget: v => v >= 100000,
    explanation: 'Kata kunci "mencapai minimal" berarti batas Rp100.000 termasuk syarat, sehingga menggunakan operator `>=`.',
  },
  {
    id: 'ganjil',
    title: 'Pendeteksian Bilangan Ganjil',
    category: 'Matematika',
    story: 'Sebuah bilangan bulat `angka` adalah bilangan GANJIL jika hasil sisa bagi dengan 2 (`angka % 2`) tidak bernilai nol (menghasilkan 1).',
    optionsLeft: ['angka % 2', 'angka / 2', 'angka'],
    optionsOp: ['!=', '==', '>', '<'],
    optionsRight: ['0', '1', '2'],
    correctLeft: 'angka % 2',
    correctOp: '!=',
    correctRight: '0',
    testVarName: 'angka',
    testMin: 1,
    testMax: 20,
    testStep: 1,
    testDefault: 7,
    testUnit: '',
    evalTarget: v => v % 2 !== 0,
    explanation: 'Operan kiri adalah ekspresi modulo `angka % 2`, dan kita menguji apakah hasilnya tidak sama dengan 0 (`!= 0`) atau sama dengan 1 (`== 1`).',
  },
];

// ── Data Kuis Pitfalls ────────────────────────────────────────────────────────
interface PitfallQuiz {
  id: number;
  question: string;
  wrongCode: string;
  correctedCode: string;
  problemSummary: string;
  whyWrong: string;
  options: string[];
  correctIdx: number;
}

const PITFALL_QUIZZES: PitfallQuiz[] = [
  {
    id: 1,
    question: 'Seorang mahasiswa ingin memeriksa apakah nilai ujian siswa bernilai 100, lalu menulis kode berikut:',
    wrongCode: 'if nilai = 100 then',
    correctedCode: 'if nilai == 100 then',
    problemSummary: 'Menggunakan operator penugasan (=) alih-alih operator perbandingan (==)',
    whyWrong: 'Tanda sama dengan tunggal `=` adalah operator penugasan (Assignment) untuk mengisi nilai ke variabel. Untuk membandingkan kesamaan, wajib menggunakan `==` (atau `=` pada pseudocode tertentu, tetapi tidak boleh bermakna penugasan).',
    options: [
      'Gunakan `==` untuk membandingkan kesamaan nilai',
      'Tambahkan tanda kutip pada angka: `if nilai = "100"`',
      'Hapus variabel nilai: `if = 100`',
      'Ganti dengan `if nilai >= 100`',
    ],
    correctIdx: 0,
  },
  {
    id: 2,
    question: 'Syarat kelulusan KKM adalah minimal nilai 75 (nilai 75 lulus). Namun mahasiswa menulis kondisi:',
    wrongCode: 'if nilai > 75 then // Lulus',
    correctedCode: 'if nilai >= 75 then // Lulus',
    problemSummary: 'Batas tertinggal (Off-by-one error) akibat salah memilih operator eksklusif alih-alih inklusif',
    whyWrong: 'Operator `>` adalah eksklusif (tidak menyertakan batas). Mahasiswa yang mendapat nilai pas 75 akan dievaluasi `75 > 75` bernilai FALSE, sehingga dinyatakan TIDAK LULUS secara tidak adil!',
    options: [
      'Ubah operator menjadi `>=` agar nilai 75 ikut lulus',
      'Ubah angka menjadi 74: `if nilai > 74`',
      'Ganti variabel menjadi `if nilai == 75`',
      'Tidak ada yang salah, kode sudah benar',
    ],
    correctIdx: 0,
  },
  {
    id: 3,
    question: 'Program ATM ingin memastikan saldo nasabah cukup untuk melakukan penarikan sebesar Rp200.000:',
    wrongCode: 'if jumlahTarik >= saldo then // Transaksi Berhasil',
    correctedCode: 'if saldo >= jumlahTarik then // Transaksi Berhasil',
    problemSummary: 'Operan terbalik sehingga logika terbalik 180 derajat',
    whyWrong: 'Menulis `jumlahTarik >= saldo` berarti transaksi HANYA berhasil jika uang yang ditarik LEBIH BANYAK dari uang yang dimiliki! Ini membuat rekening menjadi minus dan sistem perbankan bobol.',
    options: [
      'Tukar posisi operan menjadi `saldo >= jumlahTarik`',
      'Ganti operator menjadi `jumlahTarik == saldo`',
      'Tambahkan tanda kurung tanpa mengubah urutan',
      'Ganti angka saldo menjadi konstanta 200000',
    ],
    correctIdx: 0,
  },
];

export default function ConditionMasteryLab() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('anatomy');

  // State Tab 2 (Operator Lab)
  const [selectedOpIdx, setSelectedOpIdx] = useState(0);
  const selectedOp = OPERATORS_DATA[selectedOpIdx];
  const [sliderVal, setSliderVal] = useState(selectedOp.threshold);

  // State Tab 3 (Builder)
  const [builderScenarioIdx, setBuilderScenarioIdx] = useState(0);
  const scenario = BUILDER_SCENARIOS[builderScenarioIdx];
  const [userLeft, setUserLeft] = useState(scenario.optionsLeft[0]);
  const [userOp, setUserOp] = useState(scenario.optionsOp[0]);
  const [userRight, setUserRight] = useState(scenario.optionsRight[0]);
  const [builderTestVal, setBuilderTestVal] = useState(scenario.testDefault);

  // State Tab 4 (Quiz)
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const activeQuiz = PITFALL_QUIZZES[quizIdx];

  // Handler pergantian operator di tab 2
  const handleSelectOp = (idx: number) => {
    setSelectedOpIdx(idx);
    setSliderVal(OPERATORS_DATA[idx].threshold);
  };

  // Handler pergantian skenario di tab 3
  const handleSelectScenario = (idx: number) => {
    setBuilderScenarioIdx(idx);
    const sc = BUILDER_SCENARIOS[idx];
    setUserLeft(sc.optionsLeft[0]);
    setUserOp(sc.optionsOp[0]);
    setUserRight(sc.optionsRight[0]);
    setBuilderTestVal(sc.testDefault);
  };

  const isBuilderCorrect =
    userLeft === scenario.correctLeft &&
    userOp === scenario.correctOp &&
    userRight === scenario.correctRight;

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-0 text-slate-100">
      
      {/* ── Header Modul ────────────────────────────────────────────────────────── */}
      <div className="p-6 md:p-8 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 border-b border-slate-800 space-y-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono w-fit whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Laboratorium Fondasi Logika Bab 6</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
            Anatomi &amp; Cara Merumuskan Kondisi yang Benar
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
            Kunci keberhasilan percabangan komputer terletak pada <strong>ketepatan kondisi</strong>. 
            Pelajari unsur pembentuknya, kuasai 6 operator relasional, dan hindari kesalahan fatal pemula.
          </p>
        </div>

        {/* Full-width Responsive Tab Navigation Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {[
            { id: 'anatomy', label: '1. Anatomi Kondisi', icon: Layers },
            { id: 'operators', label: '2. 6 Operator & Garis Bilangan', icon: Scale },
            { id: 'builder', label: '3. Rakit Kondisi', icon: Wrench },
            { id: 'pitfalls', label: '4. Jebakan Umum', icon: AlertTriangle },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 md:p-8">
        
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* TAB 1: ANATOMI KONDISI                                                */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'anatomy' && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-2xl">
              <p className="text-amber-200 text-xs md:text-sm leading-relaxed">
                💡 <strong>Prinsip Utama:</strong> Sebuah kondisi <em>bukan kalimat biasa</em>, melainkan sebuah <strong>ekspresi relasional</strong> yang membandingkan dua nilai dan <strong>pasti menghasilkan jawaban benar (True) atau salah (False)</strong>.
              </p>
            </div>

            {/* Diagram Anatomi 3 Komponen */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-300 font-mono flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Struktur 3 Unsur Pembentuk Kondisi:</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Blok 1: Operan Kiri */}
                <div className="p-5 bg-slate-900 border-2 border-sky-500/40 rounded-2xl space-y-2 relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-sky-500/20 text-sky-300 border-b border-l border-sky-500/40 rounded-bl-xl text-[10px] font-mono font-bold">
                    UNSUR 1
                  </div>
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block font-mono">
                    Operan Kiri (Left Operand)
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Data atau subjek yang sedang <strong>diuji nilainya</strong>. Dapat berupa variabel murni atau hasil kalkulasi matematika.
                  </p>
                  <div className="pt-2 space-y-1 text-xs font-mono">
                    <span className="text-[11px] text-slate-400 block">Contoh bentuk:</span>
                    <div className="bg-slate-950 p-2 rounded-lg text-sky-300 border border-sky-900/50 space-y-0.5">
                      <div>• <code className="font-bold">nilai</code> (Variabel tunggal)</div>
                      <div>• <code className="font-bold">angka % 2</code> (Ekspresi sisa bagi)</div>
                      <div>• <code className="font-bold">saldo</code> (Data akun pengguna)</div>
                    </div>
                  </div>
                </div>

                {/* Blok 2: Operator Relasional */}
                <div className="p-5 bg-slate-900 border-2 border-amber-500/40 rounded-2xl space-y-2 relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border-b border-l border-amber-500/40 rounded-bl-xl text-[10px] font-mono font-bold">
                    UNSUR 2
                  </div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block font-mono">
                    Operator Pembanding (Relasional)
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Simbol matematika yang menentukan <strong>aturan hubungan logika</strong> antara sisi kiri dan sisi kanan.
                  </p>
                  <div className="pt-2 space-y-1 text-xs font-mono">
                    <span className="text-[11px] text-slate-400 block">6 Operator Baku:</span>
                    <div className="grid grid-cols-3 gap-1 bg-slate-950 p-2 rounded-lg text-amber-300 border border-amber-900/50 font-bold text-center">
                      <span className="bg-slate-900 py-0.5 rounded">&gt;</span>
                      <span className="bg-slate-900 py-0.5 rounded">&gt;=</span>
                      <span className="bg-slate-900 py-0.5 rounded">==</span>
                      <span className="bg-slate-900 py-0.5 rounded">&lt;</span>
                      <span className="bg-slate-900 py-0.5 rounded">&lt;=</span>
                      <span className="bg-slate-900 py-0.5 rounded">!=</span>
                    </div>
                  </div>
                </div>

                {/* Blok 3: Operan Kanan */}
                <div className="p-5 bg-slate-900 border-2 border-purple-500/40 rounded-2xl space-y-2 relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-purple-500/20 text-purple-300 border-b border-l border-purple-500/40 rounded-bl-xl text-[10px] font-mono font-bold">
                    UNSUR 3
                  </div>
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block font-mono">
                    Operan Kanan (Right Operand)
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Nilai acuan, <strong>ambang batas (threshold)</strong>, atau variabel lain sebagai pembanding.
                  </p>
                  <div className="pt-2 space-y-1 text-xs font-mono">
                    <span className="text-[11px] text-slate-400 block">Contoh bentuk:</span>
                    <div className="bg-slate-950 p-2 rounded-lg text-purple-300 border border-purple-900/50 space-y-0.5">
                      <div>• <code className="font-bold">75</code> (Konstanta angka)</div>
                      <div>• <code className="font-bold">0</code> (Nilai nol ambang)</div>
                      <div>• <code className="font-bold">hargaBarang</code> (Variabel lain)</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Output Result Arrow Banner */}
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-300 font-bold shrink-0">
                    ➔
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-300 font-mono">Hasil Akhir Evaluasi Kondisi:</p>
                    <p className="text-xs text-slate-300">
                      Harus selalu menghasilkan nilai tipe <strong>Boolean</strong>: <code className="text-emerald-400 font-bold font-mono">TRUE</code> (Benar / 1) atau <code className="text-rose-400 font-bold font-mono">FALSE</code> (Salah / 0).
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 font-mono text-xs font-black shrink-0">
                  <span className="px-3 py-1 bg-emerald-600 text-white rounded-lg shadow-sm">TRUE (1)</span>
                  <span className="px-3 py-1 bg-rose-600 text-white rounded-lg shadow-sm">FALSE (0)</span>
                </div>
              </div>
            </div>

            {/* Galeri 4 Pola Hubungan Operan */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-slate-300 font-mono">
                🔍 4 Pola Pasangan Operan yang Sering Digunakan:
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    title: '1. Variabel vs Konstanta Angka',
                    formula: 'usia >= 17',
                    desc: 'Memeriksa apakah variabel data memenuhi nilai ambang batas statis (contoh: KKM 75, usia 17 tahun, suhu 37.5).',
                    badge: 'Paling Sering',
                  },
                  {
                    title: '2. Variabel vs Variabel Lain',
                    formula: 'saldo >= totalBelanja',
                    desc: 'Membandingkan dua data dinamis yang sama-sama tersimpan di memori (contoh: kecukupan saldo terhadap tagihan keranjang belanja).',
                    badge: 'Dinamis',
                  },
                  {
                    title: '3. Ekspresi Aritmatika vs Angka',
                    formula: 'angka % 2 != 0',
                    desc: 'Operan kiri dihitung terlebih dahulu secara matematika sebelum dibandingkan (contoh: operasi modulo untuk cek ganjil/genap).',
                    badge: 'Komputasi',
                  },
                  {
                    title: '4. Variabel Teks vs String Literal',
                    formula: 'status == "LUNAS"',
                    desc: 'Memeriksa kesamaan kata atau status string (contoh: role == "admin", status == "LUNAS").',
                    badge: 'Karakter/Teks',
                  },
                ].map(item => (
                  <div key={item.title} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 hover:border-slate-700 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200">{item.title}</span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                        {item.badge}
                      </span>
                    </div>
                    <code className="text-sm font-mono font-bold text-amber-300 bg-slate-950 px-3 py-1.5 rounded-lg block border border-slate-800 tracking-wider">
                      {item.formula}
                    </code>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* TAB 2: 6 OPERATOR & GARIS BILANGAN INTERAKTIF                         */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'operators' && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            {/* Operator Selection Bar */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-slate-400 block">Pilih Operator yang Ingin Dipelajari:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {OPERATORS_DATA.map((op, idx) => (
                  <button
                    key={op.id}
                    onClick={() => handleSelectOp(idx)}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      selectedOpIdx === idx
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg ring-2 ring-amber-400/30'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-lg font-mono font-black text-amber-300">{op.symbol}</span>
                    <span className="text-[10px] font-bold truncate max-w-full">{op.name.split(' ')[0]} {op.name.split(' ')[1] || ''}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono uppercase ${
                      op.type === 'inklusif' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' :
                      op.type === 'eksklusif' ? 'bg-sky-950 text-sky-300 border border-sky-700' :
                      'bg-purple-950 text-purple-300 border border-purple-700'
                    }`}>
                      {op.type}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Kartu Detail Operator Terpilih */}
            <div className="p-5 md:p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 shadow-xl">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl md:text-3xl font-mono font-black text-amber-300">{selectedOp.symbol}</span>
                    <span className="text-lg font-bold text-white">({selectedOp.name})</span>
                  </div>
                  <p className="text-xs text-slate-400 pt-1 leading-relaxed">{selectedOp.meaning}</p>
                </div>
                <div className="text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300 shrink-0">
                  Matematika: <strong className="text-amber-300 text-base">{selectedOp.mathSymbol}</strong>
                </div>
              </div>

              {/* Skenario Riil */}
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 space-y-1.5">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  📌 Kasus Riil: {selectedOp.scenarioTitle}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedOp.scenarioDesc}</p>
              </div>

              {/* Garis Bilangan Visual (SVG) & Live Evaluation */}
              <div className="space-y-4 p-5 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-amber-400" />
                    <span>Visualisasi Garis Bilangan &amp; Titik Ambang Batas:</span>
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold border ${
                    selectedOp.evalFn(sliderVal)
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500'
                      : 'bg-rose-950/80 text-rose-300 border-rose-500'
                  }`}>
                    Hasil: {selectedOp.evalFn(sliderVal) ? 'TRUE (Lolos/Masuk)' : 'FALSE (Gagal/Bypass)'}
                  </span>
                </div>

                {/* SVG Garis Bilangan */}
                <div className="relative pt-2 pb-6 px-4 select-none">
                  {/* Status Banner Text on Line */}
                  <div className="flex justify-between text-[11px] font-mono font-bold pb-2">
                    <span className="text-slate-500">Batas Bawah: {selectedOp.min}</span>
                    <span className="text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-600/50">
                      Titik Batas: {selectedOp.threshold}{selectedOp.unit}
                    </span>
                    <span className="text-slate-500">Batas Atas: {selectedOp.max}</span>
                  </div>

                  {/* SVG Bar */}
                  <svg className="w-full h-12 overflow-visible">
                    {/* Background Axis Line */}
                    <line x1="0%" y1="20" x2="100%" y2="20" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
                    
                    {/* Threshold Vertical Marker Line */}
                    {(() => {
                      const pct = ((selectedOp.threshold - selectedOp.min) / (selectedOp.max - selectedOp.min)) * 100;
                      return (
                        <g>
                          <line x1={`${pct}%`} y1="5" x2={`${pct}%`} y2="35" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                          
                          {/* Dot style: Solid for inclusive, Hollow for exclusive */}
                          {selectedOp.type === 'inklusif' || selectedOp.type === 'kesamaan' ? (
                            <circle cx={`${pct}%`} cy="20" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                          ) : (
                            <circle cx={`${pct}%`} cy="20" r="7" fill="#0f172a" stroke="#f59e0b" strokeWidth="3" />
                          )}
                          
                          <text x={`${pct}%`} y="48" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                            {selectedOp.threshold} ({selectedOp.type === 'inklusif' ? '● Inklusif' : selectedOp.type === 'eksklusif' ? '○ Eksklusif' : '● Sama'})
                          </text>
                        </g>
                      );
                    })()}

                    {/* Current Pointer Indicator */}
                    {(() => {
                      const curPct = Math.min(100, Math.max(0, ((sliderVal - selectedOp.min) / (selectedOp.max - selectedOp.min)) * 100));
                      const isTrue = selectedOp.evalFn(sliderVal);
                      return (
                        <g>
                          <circle cx={`${curPct}%`} cy="20" r="9" fill={isTrue ? '#10b981' : '#f43f5e'} stroke="#ffffff" strokeWidth="2.5" />
                          <polygon
                            points={`${curPct}%,8 ${curPct - 2}%,-2 ${curPct + 2}%,-2`}
                            fill={isTrue ? '#10b981' : '#f43f5e'}
                          />
                        </g>
                      );
                    })()}
                  </svg>
                </div>

                {/* Slider Input Controller */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
                    <span>Ubah Nilai <code className="text-amber-300 font-bold">{selectedOp.varName}</code>:</span>
                    <span className="text-base font-black text-white px-2 py-0.5 bg-slate-900 border border-slate-700 rounded-lg">
                      {sliderVal}{selectedOp.unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={selectedOp.min}
                    max={selectedOp.max}
                    step={selectedOp.step}
                    value={sliderVal}
                    onChange={e => setSliderVal(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>{selectedOp.min}{selectedOp.unit}</span>
                    <span>Coba geser tepat ke {selectedOp.threshold}{selectedOp.unit} untuk melihat hasilnya</span>
                    <span>{selectedOp.max}{selectedOp.unit}</span>
                  </div>
                </div>

                {/* Live Expression Box */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-slate-400">Ekspresi: </span>
                    <strong className="text-slate-200">{selectedOp.varName} {selectedOp.symbol} {selectedOp.threshold}</strong>
                    <span className="text-slate-500"> ➔ ({sliderVal} {selectedOp.symbol} {selectedOp.threshold})</span>
                  </div>
                  <span className={`font-black px-2 py-0.5 rounded ${
                    selectedOp.evalFn(sliderVal) ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                  }`}>
                    {selectedOp.evalFn(sliderVal) ? 'TRUE' : 'FALSE'}
                  </span>
                </div>

              </div>

              {/* Komparasi Sintaks 3 Bahasa */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-slate-400">Cara Penulisan di Berbagai Bahasa:</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3 bg-slate-950 border border-purple-900/40 rounded-xl">
                    <span className="text-[10px] text-purple-400 font-bold block mb-1">📋 PSEUDOCODE</span>
                    <code className="text-purple-200 font-bold">{selectedOp.pseudo}</code>
                  </div>
                  <div className="p-3 bg-slate-950 border border-sky-900/40 rounded-xl">
                    <span className="text-[10px] text-sky-400 font-bold block mb-1">🐍 PYTHON</span>
                    <code className="text-sky-200 font-bold">{selectedOp.python}</code>
                  </div>
                  <div className="p-3 bg-slate-950 border border-yellow-900/40 rounded-xl">
                    <span className="text-[10px] text-yellow-400 font-bold block mb-1">⚡ JAVASCRIPT</span>
                    <code className="text-yellow-200 font-bold">{selectedOp.js}</code>
                  </div>
                </div>
              </div>

              {/* Best Practice & Pitfall Note */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 bg-emerald-950/30 border border-emerald-600/30 rounded-xl space-y-1">
                  <p className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" /> Best Practice:
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">{selectedOp.bestPractice}</p>
                </div>
                <div className="p-3.5 bg-rose-950/30 border border-rose-600/30 rounded-xl space-y-1">
                  <p className="text-xs font-bold text-rose-300 flex items-center gap-1.5 font-mono">
                    <AlertTriangle className="w-3.5 h-3.5" /> Jebakan yang Harus Dihindari:
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">{selectedOp.pitfall}</p>
                </div>
              </div>

            </div>

          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* TAB 3: PENYUSUN KONDISI MANDIRI (CONDITION BUILDER)                   */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'builder' && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            <div className="p-4 bg-sky-950/30 border border-sky-500/30 rounded-2xl">
              <p className="text-sky-200 text-xs md:text-sm leading-relaxed">
                🛠️ <strong>Studio Perakitan Kondisi:</strong> Baca masalah di bawah ini, lalu rakit kondisi yang benar dengan memilih <strong>Operan Kiri</strong>, <strong>Operator</strong>, dan <strong>Operan Kanan</strong>.
              </p>
            </div>

            {/* Pilihan Skenario Kasus */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-slate-400">Pilih Tantangan Kasus:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {BUILDER_SCENARIOS.map((sc, idx) => (
                  <button
                    key={sc.id}
                    onClick={() => handleSelectScenario(idx)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1 ${
                      builderScenarioIdx === idx
                        ? 'bg-sky-500/20 border-sky-400 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-sky-300">
                      {sc.category}
                    </span>
                    <p className="text-xs font-bold text-slate-200 line-clamp-1">{sc.title}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Deskripsi Kasus */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider block">
                🎯 Masalah yang Harus Diselesaikan:
              </span>
              <p className="text-xs md:text-sm text-slate-200 leading-relaxed">{scenario.story}</p>
            </div>

            {/* Interactive Assembly Selector */}
            <div className="p-5 md:p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-5 shadow-xl">
              <span className="text-xs font-mono font-bold text-slate-300 block">
                Rakit 3 Unsur Kondisi:
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. Operan Kiri Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-sky-400 block">
                    1. Operan Kiri (Variabel/Ekspresi):
                  </label>
                  <div className="space-y-1.5">
                    {scenario.optionsLeft.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setUserLeft(opt)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs font-mono font-bold transition-all cursor-pointer ${
                          userLeft === opt
                            ? 'bg-sky-500/30 border-sky-400 text-sky-200 shadow-sm'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Operator Relasional Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-amber-400 block">
                    2. Operator Pembanding:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {scenario.optionsOp.map(op => (
                      <button
                        key={op}
                        onClick={() => setUserOp(op)}
                        className={`p-2.5 rounded-xl border text-center text-sm font-mono font-black transition-all cursor-pointer ${
                          userOp === op
                            ? 'bg-amber-500/30 border-amber-400 text-amber-200 shadow-sm'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {op}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Operan Kanan Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-purple-400 block">
                    3. Operan Kanan (Ambang Batas):
                  </label>
                  <div className="space-y-1.5">
                    {scenario.optionsRight.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setUserRight(opt)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs font-mono font-bold transition-all cursor-pointer ${
                          userRight === opt
                            ? 'bg-purple-500/30 border-purple-400 text-purple-200 shadow-sm'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Preview Hasil Rakitan Kondisi */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">Hasil Kondisi yang Anda Rakit:</span>
                  <span className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold border ${
                    isBuilderCorrect ? 'bg-emerald-950 text-emerald-300 border-emerald-500' : 'bg-amber-950 text-amber-300 border-amber-500'
                  }`}>
                    {isBuilderCorrect ? '✅ Kondisi Logika TEPAT' : '⚠️ Belum Tepat'}
                  </span>
                </div>

                <div className="flex items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-base md:text-lg font-black tracking-wide">
                  <span className="text-sky-300 mr-2">{userLeft}</span>
                  <span className="text-amber-400 mr-2">{userOp}</span>
                  <span className="text-purple-300">{userRight}</span>
                </div>

                {/* Penjelasan Verifikasi */}
                <p className="text-xs text-slate-400 leading-relaxed">
                  💡 <strong>Analisis Logika:</strong> {scenario.explanation}
                </p>
              </div>

              {/* Uji Kondisi Rakitan dengan Live Slider */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">Uji Nilai Input (<code className="text-amber-300 font-bold">{scenario.testVarName}</code>):</span>
                  <span className="text-white font-bold px-2 py-0.5 bg-slate-900 border border-slate-700 rounded-lg">
                    {builderTestVal}{scenario.testUnit}
                  </span>
                </div>

                <input
                  type="range"
                  min={scenario.testMin}
                  max={scenario.testMax}
                  step={scenario.testStep}
                  value={builderTestVal}
                  onChange={e => setBuilderTestVal(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />

                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>{scenario.testMin}{scenario.testUnit}</span>
                  <span>{scenario.testMax}{scenario.testUnit}</span>
                </div>

                {/* Status Evaluasi Live */}
                <div className={`p-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-between ${
                  scenario.evalTarget(builderTestVal)
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                    : 'bg-rose-950/60 border-rose-500 text-rose-200'
                }`}>
                  <span>Status Saat Nilai = {builderTestVal}:</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900">
                    {scenario.evalTarget(builderTestVal) ? 'TRUE ➔ Masuk Cabang YA' : 'FALSE ➔ Masuk Cabang TIDAK'}
                  </span>
                </div>
              </div>

            </div>

          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* TAB 4: JEBAKAN UMUM & DIAGNOSTIK                                      */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'pitfalls' && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-2xl">
              <p className="text-rose-200 text-xs md:text-sm leading-relaxed">
                ⚠️ <strong>Galeri Jebakan Pemula:</strong> Kesalahan menulis kondisi sering kali tidak menghasilkan <em>error</em> kompilasi secara langsung, melainkan <strong>kesalahan logika (logical bug)</strong> yang sangat berbahaya karena membuat program memberikan keputusan yang salah.
              </p>
            </div>

            {/* Quiz Selector */}
            <div className="flex gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
              {PITFALL_QUIZZES.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setQuizIdx(idx);
                    setSelectedAnswer(null);
                    setIsAnswerChecked(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                    quizIdx === idx
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Tantangan #{q.id}
                </button>
              ))}
            </div>

            {/* Kotak Soal Analisis Jebakan */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-5 shadow-xl">
              
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block">
                  Kasus Kesalahan #{activeQuiz.id}:
                </span>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
                  {activeQuiz.question}
                </p>
              </div>

              {/* Perbandingan Kode: SALAH vs BENAR */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-4 bg-rose-950/40 border border-rose-600/40 rounded-2xl space-y-1.5">
                  <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> KODE KELIRU (YANG DITULIS):
                  </span>
                  <code className="text-rose-200 font-bold block bg-rose-950/80 p-2.5 rounded-lg border border-rose-800">
                    {activeQuiz.wrongCode}
                  </code>
                  <p className="text-[11px] text-rose-300/90 pt-1 font-sans">{activeQuiz.problemSummary}</p>
                </div>

                <div className="p-4 bg-emerald-950/40 border border-emerald-600/40 rounded-2xl space-y-1.5">
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> KODE YANG BENAR:
                  </span>
                  <code className="text-emerald-200 font-bold block bg-emerald-950/80 p-2.5 rounded-lg border border-emerald-800">
                    {activeQuiz.correctedCode}
                  </code>
                  <p className="text-[11px] text-emerald-300/90 pt-1 font-sans">Menggunakan perbandingan relasional yang tepat.</p>
                </div>
              </div>

              {/* Pilihan Perbaikan (Kuis Diagnostik) */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono font-bold text-slate-300 block">
                  Bagaimana cara memperbaiki kesalahan di atas?
                </span>

                <div className="space-y-2">
                  {activeQuiz.options.map((opt, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === activeQuiz.correctIdx;

                    let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
                    if (isAnswerChecked) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-amber-500/20 border-amber-400 text-amber-200';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (!isAnswerChecked) setSelectedAnswer(idx);
                        }}
                        disabled={isAnswerChecked}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs md:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswerChecked && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                        {isAnswerChecked && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Tombol Periksa Jawaban */}
                {!isAnswerChecked ? (
                  <button
                    onClick={() => {
                      if (selectedAnswer !== null) setIsAnswerChecked(true);
                    }}
                    disabled={selectedAnswer === null}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md mt-2"
                  >
                    Periksa Jawaban
                  </button>
                ) : (
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 mt-3">
                    <p className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-sky-400" />
                      <span>Penjelasan Mengapa Terjadi Kesalahan Logika:</span>
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {activeQuiz.whyWrong}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedAnswer(null);
                        setIsAnswerChecked(false);
                        setQuizIdx((quizIdx + 1) % PITFALL_QUIZZES.length);
                      }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer mt-2"
                    >
                      Lanjut ke Tantangan Berikutnya ➔
                    </button>
                  </div>
                )}

              </div>

            </div>

          </motion.div>
        )}

      </div>

    </div>
  );
}
