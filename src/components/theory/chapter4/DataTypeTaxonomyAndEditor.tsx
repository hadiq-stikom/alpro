"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Binary, 
  Hash, 
  Quote, 
  ToggleLeft, 
  Sparkles, 
  Code2, 
  FlaskConical, 
  Layers, 
  FolderTree, 
  Terminal, 
  Play, 
  RotateCcw,
  CheckCircle2,
  Brain,
  HelpCircle,
  Braces
} from 'lucide-react';

export default function DataTypeTaxonomyAndEditor() {
  const [activeTab, setActiveTab] = useState<'dikw' | 'taxonomy' | 'inspector'>('taxonomy');
  const [selectedPrimitive, setSelectedPrimitive] = useState<'int' | 'float' | 'str' | 'bool'>('int');

  // Mini Code Editor State
  const [editorLang, setEditorLang] = useState<'python' | 'javascript'>('python');
  const [codeSnippet, setCodeSnippet] = useState<string>('skor = 100\nnama = "Budi Hartono"\nipk = 3.85\nis_aktif = True');
  const [inspectedResults, setInspectedResults] = useState<Array<{ varName: string; value: string; detectedType: string; pythonClass: string; jsType: string }>>([
    { varName: 'skor', value: '100', detectedType: 'Integer (Bilangan Bulat)', pythonClass: "<class 'int'>", jsType: 'number' },
    { varName: 'nama', value: '"Budi Hartono"', detectedType: 'String (Teks)', pythonClass: "<class 'str'>", jsType: 'string' },
    { varName: 'ipk', value: '3.85', detectedType: 'Float (Desimal)', pythonClass: "<class 'float'>", jsType: 'number' },
    { varName: 'is_aktif', value: 'True', detectedType: 'Boolean (Logika)', pythonClass: "<class 'bool'>", jsType: 'boolean' },
  ]);

  // Execute Live Inspector
  const handleInspectCode = () => {
    const lines = codeSnippet.split('\n');
    const results: Array<{ varName: string; value: string; detectedType: string; pythonClass: string; jsType: string }> = [];

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('//')) return;

      // Match variable assignment e.g. "let x = 10" or "x = 10" or "const x = 10;"
      const cleanLine = trimmed.replace(/^(let|const|var)\s+/, '').replace(/;$/, '');
      if (cleanLine.includes('=')) {
        const [left, ...rest] = cleanLine.split('=');
        const varName = left.trim();
        const rawVal = rest.join('=').trim();

        let detectedType = 'String (Teks)';
        let pyClass = "<class 'str'>";
        let jsType = 'string';

        if (/^-?\d+$/.test(rawVal)) {
          detectedType = 'Integer (Bilangan Bulat)';
          pyClass = "<class 'int'>";
          jsType = 'number';
        } else if (/^-?\d+\.\d+$/.test(rawVal)) {
          detectedType = 'Float / Real (Desimal)';
          pyClass = "<class 'float'>";
          jsType = 'number';
        } else if (rawVal === 'True' || rawVal === 'False' || rawVal === 'true' || rawVal === 'false') {
          detectedType = 'Boolean (Logika)';
          pyClass = "<class 'bool'>";
          jsType = 'boolean';
        } else if (rawVal.startsWith('[') && rawVal.endsWith(']')) {
          detectedType = 'List / Array (Tipe Kompleks)';
          pyClass = "<class 'list'>";
          jsType = 'object (array)';
        } else if (rawVal.startsWith('{') && rawVal.endsWith('}')) {
          detectedType = 'Dictionary / Object (Tipe Kompleks)';
          pyClass = "<class 'dict'>";
          jsType = 'object';
        }

        results.push({
          varName,
          value: rawVal,
          detectedType,
          pythonClass: pyClass,
          jsType
        });
      }
    });

    setInspectedResults(results);
  };

  const primitives = [
    {
      id: 'int' as const,
      name: 'Integer (Bilangan Bulat)',
      symbol: 'int',
      icon: Hash,
      color: 'text-blue-400',
      badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
      desc: 'Menyimpan bilangan bulat positif, negatif, atau nol tanpa pecahan.',
      size: '4 atau 8 Byte (32/64-bit)',
      examples: '42, -15, 0, 2026',
      pythonEx: 'umur = 20',
      jsEx: 'let umur = 20;',
      pseudoEx: 'umur : integer'
    },
    {
      id: 'float' as const,
      name: 'Float / Real (Bilangan Desimal)',
      symbol: 'float',
      icon: Binary,
      color: 'text-amber-400',
      badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      desc: 'Menyimpan bilangan pecahan atau desimal dengan tanda titik.',
      size: '8 Byte (64-bit IEEE 754)',
      examples: '3.14, -0.05, 98.5',
      pythonEx: 'ipk = 3.85',
      jsEx: 'let ipk = 3.85;',
      pseudoEx: 'ipk : real'
    },
    {
      id: 'str' as const,
      name: 'String / Char (Teks & Karakter)',
      symbol: 'str',
      icon: Quote,
      color: 'text-emerald-400',
      badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      desc: 'Menyimpan untaian karakter (huruf, angka, simbol) yang diapit tanda petik.',
      size: 'Dinamis (1 Byte per char ASCII/UTF-8)',
      examples: '"Algoritma", "A", "12345"',
      pythonEx: 'nama = "Budi Hartono"',
      jsEx: 'let nama = "Budi Hartono";',
      pseudoEx: 'nama : string'
    },
    {
      id: 'bool' as const,
      name: 'Boolean (Kebenaran Logika)',
      symbol: 'bool',
      icon: ToggleLeft,
      color: 'text-purple-400',
      badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
      desc: 'Hanya memiliki dua kemungkinan nilai: Benar (True) atau Salah (False).',
      size: '1 Byte (8-bit flag)',
      examples: 'True, False',
      pythonEx: 'is_lulus = True',
      jsEx: 'let isLulus = true;',
      pseudoEx: 'is_lulus : boolean'
    },
  ];

  const currentPrim = primitives.find(p => p.id === selectedPrimitive)!;

  return (
    <div className="border border-border/60 rounded-3xl overflow-visible bg-slate-950 shadow-2xl space-y-0">
      
      {/* 1. Header Toolbar Tabs */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 rounded-t-3xl">
        <div className="flex items-center gap-2.5">
          <FlaskConical className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-100">
            Laboratorium Taksonomi Tipe Data &amp; Live Code Inspector
          </h3>
        </div>

        {/* Sub-Tabs Navigation */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('taxonomy')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'taxonomy' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>Pohon Taksonomi</span>
          </button>

          <button
            onClick={() => setActiveTab('dikw')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'dikw' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Piramida DIKW</span>
          </button>

          <button
            onClick={() => setActiveTab('inspector')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'inspector' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Mini Code Inspector</span>
          </button>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="p-4 md:p-6 space-y-6">
        
        {/* ========================================================================= */}
        {/* TAB 1: POHON TAKSONOMI (SEDERHANA vs KOMPLEKS)                            */}
        {/* ========================================================================= */}
        {activeTab === 'taxonomy' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Overview Taxonomy Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Branch 1: Tipe Sederhana (Fokus Utama) */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-blue-500/40 shadow-inner space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.3] sm:hover:scale-[1.4] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-blue-400">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="font-extrabold text-sm md:text-base text-blue-400 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-mono">1</span>
                    Tipe Data Sederhana (Primitif / Skalar)
                  </h4>
                  <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/40 font-bold">
                    FOKUS BAB 4
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Menyimpan <strong>1 nilai tunggal</strong> (atomik) dalam satu wadah variabel. Merupakan bahan bangunan dasar paling fundamental dalam semua bahasa pemrograman.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-blue-300">
                    &bull; <strong>Integer (int)</strong>: Bulat
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-amber-300">
                    &bull; <strong>Float (real)</strong>: Desimal
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300">
                    &bull; <strong>String (str)</strong>: Teks
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-purple-300">
                    &bull; <strong>Boolean (bool)</strong>: Logika
                  </div>
                </div>
              </div>

              {/* Branch 2: Tipe Kompleks (Pengenalan Singkat) */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/40 shadow-inner space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.3] sm:hover:scale-[1.4] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-purple-400">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="font-extrabold text-sm md:text-base text-purple-400 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-mono">2</span>
                    Tipe Data Kompleks (Komposit / Struktur)
                  </h4>
                  <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/40 font-bold">
                    BAB 11 &amp; 12
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Menyimpan <strong>kumpulan banyak nilai</strong> sekaligus dalam satu wadah besar dengan struktur tertentu.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-purple-300">
                    &bull; <strong>List / Array</strong>: <code>[1, 2, 3]</code>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-purple-300">
                    &bull; <strong>Tuple</strong>: <code>(10, 20)</code>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-purple-300">
                    &bull; <strong>Dictionary / Map</strong>: Key-Value
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-purple-300">
                    &bull; <strong>Set</strong>: Himpunan unik
                  </div>
                </div>
              </div>

            </div>

            {/* Deep Dive into 4 Primitive Types */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 font-sans">
                  Pilih Tipe Data Sederhana untuk Melihat Detail &amp; Sintaks:
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Klik kartu</span>
              </div>

              {/* Selector Tabs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {primitives.map(prim => {
                  const Icon = prim.icon;
                  const isSelected = selectedPrimitive === prim.id;
                  return (
                    <button
                      key={prim.id}
                      onClick={() => setSelectedPrimitive(prim.id)}
                      className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer relative z-0 hover:z-50 hover:scale-[1.2] sm:hover:scale-[1.3] duration-300 ease-out origin-center hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)] ${
                        isSelected 
                          ? 'border-amber-400 bg-slate-900 shadow-md ring-1 ring-amber-400' 
                          : 'border-slate-800 bg-slate-950 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`p-1.5 rounded-xl ${prim.badge}`}>
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                          {prim.symbol}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-200 block truncate">
                        {prim.name.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {prim.name.split('(')[1]?.replace(')', '') || ''}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Detail Card of Selected Primitive */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-inner space-y-4 overflow-visible">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3 overflow-visible">
                  <div>
                    <h4 className={`text-base font-extrabold flex items-center gap-2 ${currentPrim.color}`}>
                      {currentPrim.name}
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">{currentPrim.desc}</p>
                  </div>
                  <span className="text-[11px] font-mono bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300 shrink-0 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] transition-all duration-300 ease-out origin-center md:origin-right hover:shadow-lg hover:border-cyan-400">
                    Alokasi Memori: <strong className="text-white">{currentPrim.size}</strong>
                  </span>
                </div>

                {/* Syntax Comparison Grid with Hover Magnification */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs overflow-visible py-1">
                  {/* 1. Pseudocode (Left) -> md:origin-left */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-1 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.35] transition-all duration-300 ease-out origin-center md:origin-left hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-purple-400">
                    <span className="text-[10px] text-slate-400 font-sans block font-bold">📄 Pseudocode:</span>
                    <div className="text-purple-300 font-bold text-xs sm:text-sm">{currentPrim.pseudoEx}</div>
                  </div>

                  {/* 2. Python 3 (Center) -> origin-center */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-1 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.35] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-blue-400">
                    <span className="text-[10px] text-slate-400 font-sans block font-bold">🐍 Python 3:</span>
                    <div className="text-blue-300 font-bold text-xs sm:text-sm">{currentPrim.pythonEx}</div>
                  </div>

                  {/* 3. JavaScript (Right) -> md:origin-right */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-1 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.35] transition-all duration-300 ease-out origin-center md:origin-right hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-amber-400">
                    <span className="text-[10px] text-slate-400 font-sans block font-bold">🌐 JavaScript:</span>
                    <div className="text-amber-300 font-bold text-xs sm:text-sm">{currentPrim.jsEx}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PIRAMIDA DIKW (DATA -> INFORMASI -> PENGETAHUAN)                   */}
        {/* ========================================================================= */}
        {activeTab === 'dikw' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-inner space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h4 className="font-extrabold text-base text-amber-400 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Hierarki Filosofis: Data &rarr; Informasi &rarr; Pengetahuan (DIKW)
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Bagaimana variabel dan tipe data menjadi jembatan pengubah angka mentah menjadi kecerdasan komputasi.
                </p>
              </div>

              {/* 3-Tier Visual Transformation Pipeline */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Tier 1: Raw Data */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.35] sm:hover:scale-[1.45] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-cyan-500/50">
                  <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase">
                    Tahap 1: Data Mentah
                  </span>
                  <div className="text-2xl font-mono font-extrabold text-cyan-400 py-1">
                    38.5
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Hanya berupa kumpulan simbol atau angka mentah tanpa makna dan tanpa konteks.
                  </p>
                </div>

                {/* Tier 2: Information */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/40 space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.35] sm:hover:scale-[1.45] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-blue-400">
                  <span className="text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded uppercase">
                    Tahap 2: Informasi Berlabel
                  </span>
                  <div className="text-sm font-mono font-extrabold text-blue-300 py-1 bg-slate-900 px-2.5 rounded-lg border border-blue-500/30 w-fit">
                    suhu_pasien = 38.5 &deg;C
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Data mentah ditempelkan ke <strong>Variabel</strong> berlabel dan bertipe <code>Float</code> sehingga memiliki arti terukur.
                  </p>
                </div>

                {/* Tier 3: Knowledge / Logic */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.35] sm:hover:scale-[1.45] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-emerald-400">
                  <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded uppercase">
                    Tahap 3: Pengetahuan / Logika
                  </span>
                  <div className="text-xs font-mono font-bold text-emerald-300 py-1 bg-slate-900 px-2.5 rounded-lg border border-emerald-500/30">
                    if suhu &gt; 37.5 &rarr; Pasien Demam
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Informasi dievaluasi oleh algoritma untuk menghasilkan <strong>keputusan aksi cerdas</strong>.
                  </p>
                </div>

              </div>

              {/* Bottom Insight */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 leading-relaxed">
                💡 <strong>Kesimpulan Momen AHA:</strong> Variabel adalah alat komputer untuk mengubah <em>Data Mentah</em> yang bisu menjadi <em>Informasi Berharga</em> yang dapat diolah oleh algoritma!
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: MINI CODE EDITOR LIVE TYPE INSPECTOR (type() / typeof)             */}
        {/* ========================================================================= */}
        {activeTab === 'inspector' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* Left Column: Code Editor Box */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
                
                {/* Editor Title Bar */}
                <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                    </div>
                    <span className="text-xs font-mono text-slate-400 ml-1">Mini Live Type Inspector</span>
                  </div>

                  {/* Language Switcher */}
                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => {
                        setEditorLang('python');
                        setCodeSnippet('skor = 100\nnama = "Budi Hartono"\nipk = 3.85\nis_aktif = True');
                      }}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                        editorLang === 'python' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Python 3
                    </button>
                    <button
                      onClick={() => {
                        setEditorLang('javascript');
                        setCodeSnippet('let skor = 100;\nlet nama = "Budi Hartono";\nlet ipk = 3.85;\nlet isAktif = true;');
                      }}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                        editorLang === 'javascript' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      JavaScript
                    </button>
                  </div>
                </div>

                {/* Textarea Code Input */}
                <div className="p-4 bg-slate-950 flex-1">
                  <textarea
                    rows={6}
                    value={codeSnippet}
                    onChange={(e) => setCodeSnippet(e.target.value)}
                    className="w-full bg-transparent font-mono text-xs text-slate-200 focus:outline-none resize-none leading-relaxed"
                    placeholder="Ketik baris deklarasi variabel di sini..."
                  />
                </div>

                {/* Editor Bottom Actions */}
                <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3">
                  <button
                    onClick={handleInspectCode}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-4 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Periksa Tipe Data (Run Inspector)</span>
                  </button>

                  <span className="text-[11px] text-slate-400 font-mono">
                    Eksekusi: {editorLang === 'python' ? 'type(variabel)' : 'typeof variabel'}
                  </span>
                </div>

              </div>

              {/* Right Column: Realtime Inspector Output Table */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-inner space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    Hasil Pengecekan Mesin:
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {inspectedResults.length} Variabel Terdeteksi
                  </span>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {inspectedResults.map((res, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/90 text-xs font-mono space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-cyan-300">{res.varName} = {res.value}</span>
                        <span className="text-[10px] text-slate-500 uppercase">{editorLang}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-900">
                        <span className="text-slate-400">Kelas Data:</span>
                        <strong className="text-emerald-400">
                          {editorLang === 'python' ? res.pythonClass : res.jsType}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800/80">
                  💡 Komputer secara otomatis menentukan kelas tipe data berdasarkan format literal nilai yang Anda ketikkan.
                </div>
              </div>

            </div>
          </motion.div>
        )}

      </div>

    </div>
  );
}
