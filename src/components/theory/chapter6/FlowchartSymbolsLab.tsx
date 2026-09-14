"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Sparkles, RotateCcw, Trophy, HelpCircle } from 'lucide-react';

// ── Tipe Data ─────────────────────────────────────────────────────────────────
interface FlowchartSymbol {
  id: string;
  name: string;
  shape: 'oval' | 'rectangle' | 'diamond' | 'parallelogram' | 'arrow';
  color: string;
  borderColor: string;
  textColor: string;
  description: string;
  usage: string;
  examples: string[];
}

interface QuizItem {
  question: string;
  symbolShape: 'oval' | 'rectangle' | 'diamond' | 'parallelogram';
  correctAnswer: string;
  options: string[];
  explanation: string;
}

// ── Data Simbol ───────────────────────────────────────────────────────────────
const SYMBOLS: FlowchartSymbol[] = [
  {
    id: 'oval',
    name: 'Kapsul / Terminal',
    shape: 'oval',
    color: 'bg-emerald-500/20',
    borderColor: 'border-emerald-500',
    textColor: 'text-emerald-400',
    description: 'Titik awal atau akhir dari sebuah algoritma. Berbentuk kapsul (pill) dengan glow neon. Setiap flowchart wajib memiliki tepat satu simbol MULAI dan satu simbol SELESAI.',
    usage: 'Digunakan di awal (MULAI) dan akhir (SELESAI) alur program. Tidak boleh ada lebih dari satu MULAI atau satu SELESAI.',
    examples: ['MULAI', 'SELESAI', 'START', 'END'],
  },
  {
    id: 'rectangle',
    name: 'Persegi Panjang / Proses',
    shape: 'rectangle',
    color: 'bg-blue-500/20',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-400',
    description: 'Mewakili sebuah instruksi atau tindakan komputasi yang dilakukan, seperti penugasan nilai, perhitungan matematika, atau pemanggilan fungsi.',
    usage: 'Digunakan untuk setiap operasi pemrosesan data.',
    examples: ['nilai = 85', 'total = harga * qty', 'luas = panjang * lebar'],
  },
  {
    id: 'diamond',
    name: 'Diamond / Keputusan',
    shape: 'diamond',
    color: 'bg-amber-500/20',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-400',
    description: 'Titik percabangan logika. Program mengevaluasi sebuah kondisi boolean dan mengambil SALAH SATU dari dua jalur: "Ya" (True) atau "Tidak" (False).',
    usage: 'Digunakan untuk setiap kondisi IF, perbandingan, atau pengulangan (loop).',
    examples: ['nilai >= 75?', 'usia > 17?', 'saldo >= harga?'],
  },
  {
    id: 'parallelogram',
    name: 'Jajar Genjang / I/O',
    shape: 'parallelogram',
    color: 'bg-purple-500/20',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-400',
    description: 'Mewakili operasi input (menerima data dari pengguna) atau output (menampilkan data ke layar). Berbeda dengan proses karena melibatkan interaksi luar.',
    usage: 'Digunakan untuk input() dan output()/print().',
    examples: ['input(nilai)', 'output("Lulus")', 'input(nama, usia)'],
  },
  {
    id: 'arrow',
    name: 'Panah / Alur Kontrol',
    shape: 'arrow',
    color: 'bg-slate-500/20',
    borderColor: 'border-slate-500',
    textColor: 'text-slate-400',
    description: 'Menghubungkan simbol-simbol dan menunjukkan arah aliran eksekusi program. Panah dari diamond harus diberi label "Ya" dan "Tidak".',
    usage: 'Menghubungkan setiap simbol dan menentukan urutan eksekusi.',
    examples: ['Ya →', 'Tidak ↓', '→ (next step)'],
  },
];

const QUIZ_ITEMS: QuizItem[] = [
  {
    question: 'Simbol ini digunakan untuk menandai awal atau akhir dari sebuah program. Apa nama simbol ini?',
    symbolShape: 'oval',
    correctAnswer: 'Oval / Terminal',
    options: ['Oval / Terminal', 'Diamond / Keputusan', 'Persegi Panjang / Proses', 'Jajar Genjang / I/O'],
    explanation: 'Simbol Oval (disebut juga Terminal) selalu menjadi titik START dan END pada setiap flowchart. Tanpa simbol ini, flowchart tidak memiliki titik awal yang jelas.',
  },
  {
    question: 'Di titik inilah program memilih salah satu dari dua jalur berdasarkan kondisi yang dievaluasi. Apa nama simbol ini?',
    symbolShape: 'diamond',
    correctAnswer: 'Diamond / Keputusan',
    options: ['Persegi Panjang / Proses', 'Diamond / Keputusan', 'Oval / Terminal', 'Jajar Genjang / I/O'],
    explanation: 'Simbol Diamond (Belah Ketupat) adalah inti dari percabangan! Di sini, kondisi dievaluasi menghasilkan True/False, dan dua panah keluar harus diberi label "Ya" dan "Tidak".',
  },
  {
    question: 'Simbol ini merepresentasikan langkah pemrosesan data, seperti perhitungan atau penugasan nilai variabel.',
    symbolShape: 'rectangle',
    correctAnswer: 'Persegi Panjang / Proses',
    options: ['Oval / Terminal', 'Jajar Genjang / I/O', 'Persegi Panjang / Proses', 'Diamond / Keputusan'],
    explanation: 'Simbol Persegi Panjang (Rectangle) dipakai untuk setiap instruksi pemrosesan: assignment, kalkulasi, pemanggilan fungsi. Semua "kerja nyata" program ada di sini.',
  },
  {
    question: 'Program menerima data dari pengguna dan menampilkan hasilnya ke layar. Simbol apa yang digunakan?',
    symbolShape: 'parallelogram',
    correctAnswer: 'Jajar Genjang / I/O',
    options: ['Diamond / Keputusan', 'Oval / Terminal', 'Persegi Panjang / Proses', 'Jajar Genjang / I/O'],
    explanation: 'Simbol Jajar Genjang (Parallelogram) khusus untuk operasi Input/Output. Ini membedakan antara "memproses data" (rectangle) vs "berinteraksi dengan pengguna" (parallelogram).',
  },
];

// ── Sub-komponen Simbol SVG ───────────────────────────────────────────────────
function SymbolShape({ shape, label, className = '', small = false }: { shape: string; label?: string; className?: string; small?: boolean }) {
  const size = small ? { w: 80, h: 44 } : { w: 140, h: 70 };
  const fontSize = small ? 9 : 13;

  if (shape === 'oval') {
    const rx = size.h / 2 - 3;
    return (
      <svg width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} className={className}>
        <defs>
          <filter id={`pill-glow-${size.w}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g filter={`url(#pill-glow-${size.w})`}>
          <rect x="3" y="3" width={size.w - 6} height={size.h - 6} rx={rx}
            className="fill-emerald-500/20 stroke-emerald-400" strokeWidth="2.5" />
        </g>
        {label && <text x="50%" y="50%" textAnchor="middle" dy="0.35em" fontSize={fontSize} className="fill-emerald-300 font-bold">{label}</text>}
      </svg>
    );
  }
  if (shape === 'rectangle') {
    return (
      <svg width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} className={className}>
        <rect x="3" y="3" width={size.w - 6} height={size.h - 6} rx="6"
          className="fill-blue-500/25 stroke-blue-400" strokeWidth="2" />
        {label && <text x="50%" y="50%" textAnchor="middle" dy="0.35em" fontSize={fontSize} className="fill-blue-300 font-bold">{label}</text>}
      </svg>
    );
  }
  if (shape === 'diamond') {
    const cx = size.w / 2, cy = size.h / 2;
    const pts = `${cx},3 ${size.w - 3},${cy} ${cx},${size.h - 3} 3,${cy}`;
    return (
      <svg width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} className={className}>
        <polygon points={pts} className="fill-amber-500/25 stroke-amber-400" strokeWidth="2" />
        {label && <text x="50%" y="50%" textAnchor="middle" dy="0.35em" fontSize={fontSize} className="fill-amber-300 font-bold">{label}</text>}
      </svg>
    );
  }
  if (shape === 'parallelogram') {
    const offset = small ? 10 : 18;
    const pts = `${offset + 3},3 ${size.w - 3},3 ${size.w - offset - 3},${size.h - 3} 3,${size.h - 3}`;
    return (
      <svg width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} className={className}>
        <polygon points={pts} className="fill-purple-500/25 stroke-purple-400" strokeWidth="2" />
        {label && <text x="50%" y="50%" textAnchor="middle" dy="0.35em" fontSize={fontSize} className="fill-purple-300 font-bold">{label}</text>}
      </svg>
    );
  }
  // Arrow
  return (
    <svg width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} className={className}>
      <defs>
        <marker id="ah" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" className="fill-slate-400" />
        </marker>
      </defs>
      <line x1="10" y1={size.h / 2} x2={size.w - 15} y2={size.h / 2}
        className="stroke-slate-400" strokeWidth="2.5" markerEnd="url(#ah)" />
      {label && <text x="50%" y={size.h / 2 - 8} textAnchor="middle" fontSize={fontSize} className="fill-slate-300 font-bold">{label}</text>}
    </svg>
  );
}

// ── Komponen Utama ────────────────────────────────────────────────────────────
export default function FlowchartSymbolsLab() {
  const [activeTab, setActiveTab] = useState<'gallery' | 'quiz' | 'builder'>('gallery');
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>('diamond');
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const selected = SYMBOLS.find(s => s.id === selectedSymbol);
  const currentQuiz = QUIZ_ITEMS[quizIndex];
  const isCorrect = quizSelected === currentQuiz?.correctAnswer;

  const handleQuizAnswer = (answer: string) => {
    if (quizSelected !== null) return;
    setQuizSelected(answer);
    if (answer === currentQuiz.correctAnswer) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (quizIndex < QUIZ_ITEMS.length - 1) {
      setQuizIndex(prev => prev + 1);
      setQuizSelected(null);
    } else {
      setQuizDone(true);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizSelected(null);
    setQuizScore(0);
    setQuizDone(false);
  };

  const tabs = [
    { id: 'gallery', label: '🗂️ Galeri Simbol' },
    { id: 'quiz', label: '🎯 Kuis Identifikasi' },
    { id: 'builder', label: '🏗️ Pola IF-ELSE' },
  ] as const;

  return (
    <div className="border border-border/60 rounded-3xl overflow-hidden bg-slate-950 shadow-2xl">
      {/* Header */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">🔷</span>
          <h3 className="font-bold text-sm md:text-base text-slate-100">
            Laboratorium Simbol Flowchart Standar
          </h3>
        </div>
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── TAB: GALERI ────────────────────────────────────────────────────────── */}
      {activeTab === 'gallery' && (
        <div className="p-4 md:p-6 space-y-5">
          {/* Symbol Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {SYMBOLS.map(sym => (
              <button
                key={sym.id}
                onClick={() => setSelectedSymbol(sym.id)}
                className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center gap-2 ${
                  selectedSymbol === sym.id
                    ? `${sym.borderColor} bg-slate-800 shadow-lg scale-105`
                    : 'border-slate-700 bg-slate-900 hover:border-slate-600'
                }`}
              >
                <SymbolShape shape={sym.shape} small />
                <span className={`text-[10px] font-bold text-center leading-tight ${sym.textColor}`}>
                  {sym.name}
                </span>
              </button>
            ))}
          </div>

          {/* Detail Panel */}
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-5 rounded-2xl border-l-4 ${selected.borderColor} bg-slate-900 space-y-4`}
              >
                <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
                  <div className="shrink-0">
                    <SymbolShape shape={selected.shape} />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h4 className={`font-black text-lg ${selected.textColor}`}>{selected.name}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{selected.description}</p>
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <p className="text-slate-400 text-xs">{selected.usage}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Contoh Isi:</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.examples.map((ex, i) => (
                      <code key={i} className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1 rounded-lg font-mono">
                        {ex}
                      </code>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ── TAB: KUIS ──────────────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <div className="p-4 md:p-6">
          {!quizDone ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  Soal {quizIndex + 1} / {QUIZ_ITEMS.length}
                </span>
                <span className="text-xs font-bold text-amber-400 font-mono">
                  Skor: {quizScore}/{quizIndex + (quizSelected ? 1 : 0)}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-sky-500 h-1.5 rounded-full transition-all" style={{ width: `${((quizIndex) / QUIZ_ITEMS.length) * 100}%` }} />
              </div>

              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-4">
                <p className="text-slate-200 text-sm font-medium">{currentQuiz.question}</p>
                <div className="flex justify-center py-2">
                  <SymbolShape shape={currentQuiz.symbolShape} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {currentQuiz.options.map(opt => {
                    const isSelected = quizSelected === opt;
                    const isRight = opt === currentQuiz.correctAnswer;
                    let cls = 'border-slate-700 bg-slate-800 hover:border-slate-500 text-slate-300';
                    if (quizSelected !== null) {
                      if (isRight) cls = 'border-emerald-500 bg-emerald-900/40 text-emerald-300';
                      else if (isSelected) cls = 'border-red-500 bg-red-900/40 text-red-300';
                      else cls = 'border-slate-800 bg-slate-900/50 text-slate-500';
                    }
                    return (
                      <button
                        key={opt}
                        onClick={() => handleQuizAnswer(opt)}
                        disabled={quizSelected !== null}
                        className={`text-left p-3 rounded-xl border-2 transition-all cursor-pointer text-xs font-medium flex items-center gap-2 ${cls}`}
                      >
                        {quizSelected !== null && (isRight
                          ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          : isSelected
                            ? <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                            : <HelpCircle className="w-4 h-4 text-slate-600 shrink-0" />)}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence>
                {quizSelected && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl border ${isCorrect ? 'border-emerald-600 bg-emerald-950/50' : 'border-red-600 bg-red-950/50'}`}
                  >
                    <p className={`text-xs font-bold mb-1 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isCorrect ? '✅ Benar!' : '❌ Belum tepat.'}
                    </p>
                    <p className="text-slate-300 text-xs leading-relaxed">{currentQuiz.explanation}</p>
                    <button
                      onClick={nextQuestion}
                      className="mt-3 px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      {quizIndex < QUIZ_ITEMS.length - 1 ? 'Soal Berikutnya →' : 'Lihat Hasil'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-4"
            >
              <Trophy className="w-12 h-12 text-amber-400 mx-auto" />
              <h4 className="text-xl font-black text-slate-100">Kuis Selesai!</h4>
              <p className="text-slate-400 text-sm">Skor Akhir Anda:</p>
              <div className="text-5xl font-black text-amber-400">{quizScore} / {QUIZ_ITEMS.length}</div>
              <p className="text-slate-300 text-sm">
                {quizScore === QUIZ_ITEMS.length ? '🎉 Sempurna! Kamu menguasai semua simbol flowchart.' :
                 quizScore >= 3 ? '👍 Bagus! Ulangi galeri untuk memperkuat pemahaman.' :
                 '📚 Masih perlu latihan. Baca ulang tab Galeri Simbol.'}
              </p>
              <button onClick={resetQuiz}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-bold transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Ulangi Kuis
              </button>
            </motion.div>
          )}
        </div>
      )}

      {/* ── TAB: BUILDER / POLA IF-ELSE ────────────────────────────────────────── */}
      {activeTab === 'builder' && (
        <div className="p-4 md:p-6 space-y-5">
          <div className="p-3 bg-sky-900/30 border border-sky-700/50 rounded-xl">
            <p className="text-sky-300 text-xs font-medium">
              💡 <strong>Cara membaca:</strong> Ikuti arah panah dari atas ke bawah. Di titik Diamond, program memilih satu dari dua jalur. Kedua jalur akhirnya bertemu kembali di titik penyatuan.
            </p>
          </div>

          {/* Flowchart IF-ELSE Visual Standar */}
          <div className="flex justify-center py-4 select-none bg-slate-900/60 rounded-2xl border border-slate-800">
            <svg viewBox="0 0 340 480" className="w-full max-w-[310px] mx-auto" style={{ overflow: 'visible' }}>
              <defs>
                <marker id="sym-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0,8 3,0 6" fill="#64748b" />
                </marker>
                <marker id="sym-arrY" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0,8 3,0 6" fill="#10b981" />
                </marker>
                <marker id="sym-arrN" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0,8 3,0 6" fill="#ef4444" />
                </marker>
                <filter id="glow-start-sym" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="glow-end-sym" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* 1. START — Kapsul Neon Hijau */}
              <g filter="url(#glow-start-sym)">
                <rect x="110" y="8" width="120" height="34" rx="17"
                  fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="2.5" />
                <text x="170" y="30" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6ee7b7">MULAI</text>
              </g>

              {/* Arrow: START -> INPUT (nempel persis di y=78) */}
              <line x1="170" y1="42" x2="170" y2="78" stroke="#64748b" strokeWidth="2" markerEnd="url(#sym-arr)" />

              {/* 2. INPUT — Jajaran Genjang Sejati (Slanted Parallelogram) */}
              <polygon points="118,78 238,78 222,112 102,112"
                fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="2" />
              <text x="170" y="99" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#d8b4fe">input(nilai)</text>

              {/* Arrow: INPUT -> DECISION (nempel persis di y=146) */}
              <line x1="170" y1="112" x2="170" y2="146" stroke="#64748b" strokeWidth="2" markerEnd="url(#sym-arr)" />

              {/* 3. DECISION — Diamond */}
              <polygon points="170,146 260,192 170,238 80,192"
                fill="rgba(245,158,11,0.25)" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="170" y="196" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fcd34d">nilai ≥ 75 ?</text>

              {/* 4. CABANG YA (Kiri) */}
              {/* Garis keluar dari sudut diamond ke kiri */}
              <line x1="80" y1="192" x2="48" y2="192" stroke="#10b981" strokeWidth="2" />
              <text x="64" y="184" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#10b981">Ya</text>
              
              {/* Garis turun dan panah nempel persis di atas output("Lulus") y=285 */}
              <line x1="48" y1="192" x2="48" y2="285" stroke="#10b981" strokeWidth="2" markerEnd="url(#sym-arrY)" />
              
              {/* Jajaran Genjang Sejati: Output Lulus */}
              <polygon points="15,285 93,285 81,317 3,317"
                fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="2" />
              <text x="48" y="305" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#6ee7b7">output(&quot;Lulus&quot;)</text>
              
              {/* Garis keluar dari bawah output("Lulus") turun ke y=380 lalu menyatu di x=170 */}
              <line x1="48" y1="317" x2="48" y2="380" stroke="#10b981" strokeWidth="2" />
              <line x1="48" y1="380" x2="170" y2="380" stroke="#10b981" strokeWidth="2" />

              {/* 5. CABANG TIDAK (Kanan) */}
              {/* Garis keluar dari sudut diamond ke kanan */}
              <line x1="260" y1="192" x2="292" y2="192" stroke="#ef4444" strokeWidth="2" />
              <text x="276" y="184" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ef4444">Tidak</text>
              
              {/* Garis turun dan panah nempel persis di atas output("Gagal") y=285 */}
              <line x1="292" y1="192" x2="292" y2="285" stroke="#ef4444" strokeWidth="2" markerEnd="url(#sym-arrN)" />
              
              {/* Jajaran Genjang Sejati: Output Gagal */}
              <polygon points="259,285 337,285 325,317 247,317"
                fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="2" />
              <text x="292" y="305" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#fca5a5">output(&quot;Gagal&quot;)</text>
              
              {/* Garis keluar dari bawah output("Gagal") turun ke y=380 lalu menyatu di x=170 */}
              <line x1="292" y1="317" x2="292" y2="380" stroke="#ef4444" strokeWidth="2" />
              <line x1="292" y1="380" x2="170" y2="380" stroke="#ef4444" strokeWidth="2" />

              {/* 6. TITIK PENYATUAN (MERGE POINT) & FLOW KE SELESAI */}
              <circle cx="170" cy="380" r="2.5" fill="#94a3b8" />
              <line x1="170" y1="380" x2="170" y2="418" stroke="#64748b" strokeWidth="2" markerEnd="url(#sym-arr)" />
              
              {/* SELESAI — Kapsul Neon Merah */}
              <g filter="url(#glow-end-sym)">
                <rect x="110" y="418" width="120" height="34" rx="17"
                  fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="2.5" />
                <text x="170" y="440" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fca5a5">SELESAI</text>
              </g>
            </svg>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { color: 'bg-emerald-500', label: 'Oval = Terminal (Start/End)' },
              { color: 'bg-blue-500', label: 'Rectangle = Proses' },
              { color: 'bg-amber-500', label: 'Diamond = Keputusan (IF)' },
              { color: 'bg-purple-500', label: 'Jajar Genjang = I/O' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2 text-xs text-slate-400">
                <div className={`w-3 h-3 rounded-sm ${item.color} shrink-0`} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Aturan Penulisan Flowchart */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-2">
            <h4 className="text-sm font-bold text-sky-400">📏 Aturan Wajib Flowchart Percabangan:</h4>
            <ol className="list-decimal list-inside space-y-1 text-xs text-slate-300">
              <li>Diamond (keputusan) selalu memiliki <strong>tepat dua panah keluar</strong>: satu berlabel "Ya" dan satu "Tidak".</li>
              <li>Kedua cabang <strong>harus bertemu kembali</strong> (converge) sebelum mencapai simbol End.</li>
              <li>Alur dibaca dari <strong>atas ke bawah dan kiri ke kanan</strong> secara konsisten.</li>
              <li>Setiap flowchart harus punya <strong>tepat satu titik Start</strong> dan <strong>setidaknya satu titik End</strong>.</li>
              <li>Panah <strong>tidak boleh saling memotong</strong>; gunakan simbol konektor jika flowchart panjang.</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
