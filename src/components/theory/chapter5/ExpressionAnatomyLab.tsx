"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Split, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Code2, 
  Cpu, 
  Tag, 
  Zap,
  RotateCcw
} from 'lucide-react';

interface PresetExpr {
  id: string;
  name: string;
  category: 'unary' | 'binary' | 'ternary';
  expr: string;
  operands: { label: string; value: string; type: string }[];
  operators: { symbol: string; role: string; arity: string }[];
  result: string;
  resultType: string;
  pyCode: string;
  jsCode: string;
  pseudoCode: string;
  explanation: string;
}

const presets: PresetExpr[] = [
  {
    id: 'binary_arith',
    name: 'Ekspresi Biner: total = harga * kuantitas',
    category: 'binary',
    expr: '15000 * 4',
    operands: [
      { label: 'harga', value: '15000', type: 'Integer' },
      { label: 'kuantitas', value: '4', type: 'Integer' }
    ],
    operators: [
      { symbol: '*', role: 'Perkalian Aritmatika', arity: 'Binary (2 Operand)' }
    ],
    result: '60000',
    resultType: 'Integer',
    pyCode: 'total = harga * kuantitas  # total = 60000',
    jsCode: 'let total = harga * kuantitas; // total = 60000',
    pseudoCode: 'total = harga * kuantitas',
    explanation: 'Operator * membutuhkan DUA operand (kiri dan kanan) untuk menghasilkan satu nilai perkalian baru.'
  },
  {
    id: 'unary_neg',
    name: 'Ekspresi Uner: saldo_rugi = -kerugian',
    category: 'unary',
    expr: '-75000',
    operands: [
      { label: 'kerugian', value: '75000', type: 'Integer' }
    ],
    operators: [
      { symbol: '-', role: 'Negasi Aritmatika (Uner)', arity: 'Unary (1 Operand)' }
    ],
    result: '-75000',
    resultType: 'Integer',
    pyCode: 'saldo = -kerugian  # Menegasikan angka positif jadi negatif',
    jsCode: 'let saldo = -kerugian; // Nilai menjadi -75000',
    pseudoCode: 'saldo = -kerugian',
    explanation: 'Operator Unary - hanya menempel pada SATU operand tunggal di kanannya untuk membalik tanda positif/negatif.'
  },
  {
    id: 'unary_logic',
    name: 'Ekspresi Uner Logika: status = not is_active',
    category: 'unary',
    expr: 'not True',
    operands: [
      { label: 'is_active', value: 'True', type: 'Boolean' }
    ],
    operators: [
      { symbol: 'not / !', role: 'Inversi Logika (Pembalik Kebenaran)', arity: 'Unary (1 Operand)' }
    ],
    result: 'False',
    resultType: 'Boolean',
    pyCode: 'status = not is_active  # Membalik True jadi False',
    jsCode: 'let status = !isActive; // Membalik true jadi false',
    pseudoCode: 'status = not is_active',
    explanation: 'Operator NOT / ! membalik nilai kebenaran dari satu kondisi boolean tunggal.'
  },
  {
    id: 'ternary_cond',
    name: 'Ekspresi Ternari: status = "Lulus" if nilai >= 75 else "Remidi"',
    category: 'ternary',
    expr: '"Lulus" if 80 >= 75 else "Remidi"',
    operands: [
      { label: 'kondisi', value: '80 >= 75', type: 'Boolean (True)' },
      { label: 'nilai_jika_benar', value: '"Lulus"', type: 'String' },
      { label: 'nilai_jika_salah', value: '"Remidi"', type: 'String' }
    ],
    operators: [
      { symbol: 'if...else / ? :', role: 'Kondisional Ternari', arity: 'Ternary (3 Operand)' }
    ],
    result: '"Lulus"',
    resultType: 'String',
    pyCode: 'status = "Lulus" if nilai >= 75 else "Remidi"',
    jsCode: 'let status = nilai >= 75 ? "Lulus" : "Remidi";',
    pseudoCode: 'status = IF nilai >= 75 THEN "Lulus" ELSE "Remidi"',
    explanation: 'Operator Ternary melibatkan TIGA bagian: (1) Kondisi Uji, (2) Nilai jika True, dan (3) Nilai jika False.'
  }
];

export default function ExpressionAnatomyLab() {
  const [selectedId, setSelectedId] = useState('binary_arith');
  const [customLeft, setCustomLeft] = useState('25');
  const [customOp, setCustomOp] = useState('+');
  const [customRight, setCustomRight] = useState('15');

  const selectedPreset = presets.find(p => p.id === selectedId) || presets[0];

  // Hitung live custom binary expression
  const calcCustom = () => {
    const a = parseFloat(customLeft) || 0;
    const b = parseFloat(customRight) || 0;
    let res = 0;
    let type = 'Float';
    if (customOp === '+') res = a + b;
    else if (customOp === '-') res = a - b;
    else if (customOp === '*') res = a * b;
    else if (customOp === '/') res = b !== 0 ? a / b : NaN;
    else if (customOp === '**') res = Math.pow(a, b);
    else if (customOp === '%') res = b !== 0 ? a % b : NaN;

    if (Number.isInteger(res)) type = 'Integer';
    return {
      val: isNaN(res) ? 'Error (Bagi Nol)' : res.toString(),
      type
    };
  };

  const customResult = calcCustom();

  return (
    <div className="border border-border/60 rounded-3xl overflow-visible bg-slate-950 shadow-2xl space-y-0">
      
      {/* 1. Header Toolbar */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 rounded-t-3xl">
        <div className="flex items-center gap-2.5">
          <Split className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-100">
            Laboratorium Anatomi &amp; Taksonomi Arity Ekspresi
          </h3>
        </div>
        <span className="text-xs font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 px-3 py-0.5 rounded-full">
          Unary • Binary • Ternary
        </span>
      </div>

      {/* 2. Main Workspace */}
      <div className="p-4 md:p-6 space-y-6 overflow-visible">
        
        {/* Preset Selection Buttons */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 font-sans">
              Pilih Contoh Anatomi Berdasarkan Jumlah Operand (Arity):
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Klik untuk bedah</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {presets.map((preset) => {
              const isSelected = selectedId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setSelectedId(preset.id)}
                  className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer relative z-0 hover:z-50 hover:scale-[1.05] duration-300 ease-out origin-center hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)] ${
                    isSelected 
                      ? 'border-cyan-400 bg-slate-900 shadow-md ring-1 ring-cyan-400' 
                      : 'border-slate-800 bg-slate-950 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                      preset.category === 'unary' 
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                        : preset.category === 'binary'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {preset.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-cyan-400">{preset.expr}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-200 block truncate">
                    {preset.name.split(':')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visualizer Decomposition Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-inner space-y-6 overflow-visible">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                Dekonstruksi Struktur Komputasi:
              </span>
              <h4 className="text-base md:text-lg font-extrabold text-slate-100 mt-0.5">
                {selectedPreset.name}
              </h4>
            </div>
            <span className="text-xs text-slate-300 max-w-md text-left md:text-right">
              {selectedPreset.explanation}
            </span>
          </div>

          {/* Interactive Flow Decomposition Node */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center overflow-visible">
            
            {/* Box 1: Operand (Bahan Baku Nilai) */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/40 space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.35] transition-all duration-300 ease-out origin-center md:origin-left hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-blue-400">
              <div className="flex items-center justify-between border-b border-blue-500/20 pb-1.5">
                <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  1. Operand (Nilai/Variabel)
                </span>
                <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">
                  Data
                </span>
              </div>
              <div className="space-y-1.5 font-mono text-xs">
                {selectedPreset.operands.map((op, idx) => (
                  <div key={idx} className="p-2 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300 font-bold">{op.label}:</span>
                    <span className="text-blue-300 font-extrabold">{op.value}</span>
                    <span className="text-[9px] text-slate-500 font-sans">({op.type})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 2: Operator (Simbol Instruksi) */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.35] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-amber-400">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-1.5">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  2. Operator (Instruksi)
                </span>
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
                  Aksi
                </span>
              </div>
              <div className="space-y-1.5 font-mono text-xs text-center">
                {selectedPreset.operators.map((op, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-2xl font-black text-amber-300">{op.symbol}</div>
                    <div className="text-[10px] text-slate-300 font-sans">{op.role}</div>
                    <span className="text-[9px] font-mono text-amber-400 font-bold block">{op.arity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 3: Hasil Evaluasi Akhir */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.35] transition-all duration-300 ease-out origin-center md:origin-right hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-emerald-400">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1.5">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  3. Nilai Hasil Evaluasi
                </span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                  Nilai Tunggal
                </span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-1">
                <span className="text-[10px] text-slate-500 font-mono block">Hasil Komputasi di RAM:</span>
                <div className="text-2xl font-mono font-black text-emerald-400 py-1">
                  {selectedPreset.result}
                </div>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800 inline-block">
                  Tipe: {selectedPreset.resultType}
                </span>
              </div>
            </div>

          </div>

          {/* Syntax Representation Tri-Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs overflow-visible py-1">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] sm:hover:scale-[1.3] transition-all duration-300 ease-out origin-center md:origin-left hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-purple-400">
              <span className="text-[10px] text-slate-400 font-sans block font-bold">📄 Pseudocode:</span>
              <div className="text-purple-300 font-bold">{selectedPreset.pseudoCode}</div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] sm:hover:scale-[1.3] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-blue-400">
              <span className="text-[10px] text-slate-400 font-sans block font-bold">🐍 Python 3:</span>
              <div className="text-blue-300 font-bold">{selectedPreset.pyCode}</div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] sm:hover:scale-[1.3] transition-all duration-300 ease-out origin-center md:origin-right hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-amber-400">
              <span className="text-[10px] text-slate-400 font-sans block font-bold">🌐 JavaScript:</span>
              <div className="text-amber-300 font-bold">{selectedPreset.jsCode}</div>
            </div>
          </div>

        </div>

        {/* 3. Live Custom Binary Expression Sandbox */}
        <div className="p-4 md:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs md:text-sm font-bold text-slate-200 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              Live Interactive Expression Playground (Ubah Nilai &amp; Operator):
            </h4>
            <span className="text-[10px] font-mono text-slate-400">Interactive Calculator</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center font-mono">
            {/* Left Operand Input */}
            <div className="md:col-span-3 space-y-1">
              <label className="text-[11px] font-bold text-slate-400">Operand Kiri (a):</label>
              <input
                type="number"
                value={customLeft}
                onChange={(e) => setCustomLeft(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-cyan-300 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Operator Selector */}
            <div className="md:col-span-3 space-y-1">
              <label className="text-[11px] font-bold text-slate-400">Operator Biner:</label>
              <select
                value={customOp}
                onChange={(e) => setCustomOp(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="+">+ (Tambah)</option>
                <option value="-">- (Kurang)</option>
                <option value="*">* (Kali)</option>
                <option value="/">/ (Bagi)</option>
                <option value="**">** (Pangkat)</option>
                <option value="%">% (Modulo)</option>
              </select>
            </div>

            {/* Right Operand Input */}
            <div className="md:col-span-3 space-y-1">
              <label className="text-[11px] font-bold text-slate-400">Operand Kanan (b):</label>
              <input
                type="number"
                value={customRight}
                onChange={(e) => setCustomRight(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-cyan-300 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Result Box */}
            <div className="md:col-span-3 space-y-1">
              <label className="text-[11px] font-bold text-slate-400">Hasil Evaluasi:</label>
              <div className="w-full bg-slate-950 border border-emerald-500/50 rounded-xl px-3 py-2 text-xs text-emerald-400 font-bold flex justify-between items-center">
                <span>{customResult.val}</span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-sans">
                  {customResult.type}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Tabel Resmi Taksonomi Arity Operator */}
        <div className="p-4 md:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Layers className="w-4 h-4" />
            <span>Tabel Resmi Taksonomi Operator Berdasarkan Jumlah Operand (Arity):</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-sans">
                  <th className="p-3">Kategori Arity</th>
                  <th className="p-3">Jml Operand</th>
                  <th className="p-3">Contoh Simbol</th>
                  <th className="p-3">Sintaks Python</th>
                  <th className="p-3">Sintaks JavaScript</th>
                  <th className="p-3">Makna &amp; Hasil</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-purple-400">Unary (Uner)</td>
                  <td className="p-3 font-bold text-center">1</td>
                  <td className="p-3 text-amber-300 font-bold">- , + , not , !</td>
                  <td className="p-3 text-cyan-300">-x , not isActive</td>
                  <td className="p-3 text-cyan-300">-x , !isActive</td>
                  <td className="p-3 font-sans text-slate-400">Menegasi nilai numerik atau membalik nilai kebenaran.</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-blue-400">Binary (Biner)</td>
                  <td className="p-3 font-bold text-center">2</td>
                  <td className="p-3 text-amber-300 font-bold">+ , - , * , / , == , and</td>
                  <td className="p-3 text-cyan-300">a + b , x &gt; y</td>
                  <td className="p-3 text-cyan-300">a + b , x &gt; y</td>
                  <td className="p-3 font-sans text-slate-400">Menghubungkan 2 nilai operand (kiri dan kanan).</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-emerald-400">Ternary (Ternari)</td>
                  <td className="p-3 font-bold text-center">3</td>
                  <td className="p-3 text-amber-300 font-bold">if...else / ? :</td>
                  <td className="p-3 text-cyan-300">val_a if cond else val_b</td>
                  <td className="p-3 text-cyan-300">cond ? val_a : val_b</td>
                  <td className="p-3 font-sans text-slate-400">Kondisional sebaris untuk memilih 1 dari 2 nilai.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
