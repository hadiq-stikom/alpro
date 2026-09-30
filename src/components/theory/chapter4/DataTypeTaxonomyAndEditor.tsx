"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Editor from 'react-simple-code-editor';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Binary, 
  Hash, 
  Quote, 
  ToggleLeft, 
  FlaskConical, 
  FolderTree, 
  Terminal, 
  Play, 
  Brain,
  Code2
} from 'lucide-react';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function highlightSnippet(code: string, lang: 'python' | 'javascript'): string {
  if (!code) return '';
  return code.split('\n').map(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('#') || trimmed.startsWith('//')) {
      return `<span class="text-emerald-700 dark:text-emerald-400 italic font-semibold">${escapeHtml(line)}</span>`;
    }

    const escaped = escapeHtml(line);
    const tokenRegex = lang === 'python'
      ? /(#[^\n]*)|("[^"]*"|'[^']*')|(\b(?:True|False|None)\b)|(\b(?:def|class|return|if|elif|else|for|while|import|from|as|print|type)\b)|(\b\d+(?:\.\d+)?\b)|(==|!=|<=|>=|=|\+|-|\*|\/|\/\/|%)|([a-zA-Z_][a-zA-Z0-9_]*)|(:|,|\(|\)|\[|\]|\{|\})|(\s+)|(.)/g
      : /(\/\/[^\n]*)|("[^"]*"|'[^']*'|`[^`]*`)|(\b(?:true|false|null|undefined)\b)|(\b(?:const|let|var|function|return|if|else|for|while|typeof|console)\b)|(\b\d+(?:\.\d+)?\b)|(===|!==|==|!=|<=|>=|=|\+|-|\*|\/|%)|([a-zA-Z_][a-zA-Z0-9_]*)|(;|,|\.|\(|\)|\[|\]|\{|\})|(\s+)|(.)/g;

    return escaped.replace(tokenRegex, (match, comment, str, boolVal, kw, num, op, id, punct, ws, other) => {
      if (comment) return `<span class="text-emerald-700 dark:text-emerald-400 italic font-semibold">${comment}</span>`;
      if (str) return `<span class="text-amber-800 dark:text-amber-300 font-bold">${str}</span>`;
      if (boolVal) return `<span class="text-purple-800 dark:text-purple-400 font-black">${boolVal}</span>`;
      if (kw) return `<span class="text-violet-800 dark:text-violet-400 font-black">${kw}</span>`;
      if (num) return `<span class="text-amber-700 dark:text-amber-400 font-black">${num}</span>`;
      if (op) return `<span class="text-rose-600 dark:text-rose-400 font-black">${op}</span>`;
      if (punct) return `<span class="text-slate-700 dark:text-slate-400 font-bold">${punct}</span>`;
      if (id) return `<span class="text-sky-900 dark:text-sky-300 font-bold">${id}</span>`;
      return match;
    });
  }).join('\n');
}

export default function DataTypeTaxonomyAndEditor() {
  const { language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<'dikw' | 'taxonomy' | 'inspector'>('taxonomy');
  const [selectedPrimitive, setSelectedPrimitive] = useState<'int' | 'float' | 'str' | 'bool'>('int');

  // Mini Code Editor State
  const [editorLang, setEditorLang] = useState<'python' | 'javascript'>(language || 'python');
  const [codeSnippet, setCodeSnippet] = useState<string>(
    language === 'javascript' 
      ? 'let skor = 100;\nlet nama = "Budi Hartono";\nlet ipk = 3.85;\nlet isAktif = true;'
      : 'skor = 100\nnama = "Budi Hartono"\nipk = 3.85\nis_aktif = True'
  );

  useEffect(() => {
    if (language === 'javascript' || language === 'python') {
      setEditorLang(language);
      if (language === 'javascript' && !codeSnippet.includes('let')) {
        setCodeSnippet('let skor = 100;\nlet nama = "Budi Hartono";\nlet ipk = 3.85;\nlet isAktif = true;');
      } else if (language === 'python' && codeSnippet.includes('let')) {
        setCodeSnippet('skor = 100\nnama = "Budi Hartono"\nipk = 3.85\nis_aktif = True');
      }
    }
  }, [language]);

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
      color: 'text-blue-700 dark:text-blue-400',
      badge: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30',
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
      color: 'text-amber-700 dark:text-amber-400',
      badge: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
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
      color: 'text-emerald-700 dark:text-emerald-400',
      badge: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
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
      color: 'text-purple-700 dark:text-purple-400',
      badge: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30',
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
    <div className="border border-border/80 dark:border-slate-800 rounded-3xl overflow-visible bg-card dark:bg-slate-950 shadow-xl space-y-0">
      
      {/* 1. Header Toolbar Tabs */}
      <div className="p-4 md:px-6 bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 rounded-t-3xl">
        <div className="flex items-center gap-2.5">
          <FlaskConical className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-900 dark:text-slate-100">
            Laboratorium Taksonomi Tipe Data &amp; Live Code Inspector
          </h3>
        </div>

        {/* Sub-Tabs Navigation */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <button
            onClick={() => setActiveTab('taxonomy')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'taxonomy' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>Pohon Taksonomi</span>
          </button>

          <button
            onClick={() => setActiveTab('dikw')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'dikw' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Piramida DIKW</span>
          </button>

          <button
            onClick={() => setActiveTab('inspector')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'inspector' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Mini Code Inspector</span>
          </button>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="p-4 sm:p-6 space-y-6">
        
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              
              {/* Branch 1: Tipe Sederhana (Fokus Utama) */}
              <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-slate-900/90 border-2 border-blue-500/40 shadow-sm space-y-3.5 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-2xl hover:border-blue-500">
                <div className="flex items-center justify-between border-b border-blue-500/20 dark:border-slate-800 pb-2.5">
                  <h4 className="font-black text-sm sm:text-base text-blue-700 dark:text-blue-400 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-800 dark:text-blue-400 flex items-center justify-center text-xs font-mono font-bold">1</span>
                    Tipe Data Sederhana (Primitif / Skalar)
                  </h4>
                  <span className="text-xs font-mono bg-blue-500/20 text-blue-800 dark:text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-500/40 font-bold">
                    FOKUS BAB 4
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  Menyimpan <strong>1 nilai tunggal</strong> (atomik) dalam satu wadah variabel. Merupakan bahan bangunan dasar paling fundamental dalam semua bahasa pemrograman.
                </p>
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-blue-500/30 dark:border-slate-800 text-xs font-mono text-blue-800 dark:text-blue-300 font-bold shadow-xs">
                    &bull; <strong>Integer (int)</strong>: Bulat
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-amber-500/30 dark:border-slate-800 text-xs font-mono text-amber-800 dark:text-amber-300 font-bold shadow-xs">
                    &bull; <strong>Float (real)</strong>: Desimal
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-emerald-500/30 dark:border-slate-800 text-xs font-mono text-emerald-800 dark:text-emerald-300 font-bold shadow-xs">
                    &bull; <strong>String (str)</strong>: Teks
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-purple-500/30 dark:border-slate-800 text-xs font-mono text-purple-800 dark:text-purple-300 font-bold shadow-xs">
                    &bull; <strong>Boolean (bool)</strong>: Logika
                  </div>
                </div>
              </div>

              {/* Branch 2: Tipe Kompleks (Pengenalan Singkat) */}
              <div className="p-5 rounded-2xl bg-purple-50/50 dark:bg-slate-900/90 border-2 border-purple-500/40 shadow-sm space-y-3.5 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-2xl hover:border-purple-500">
                <div className="flex items-center justify-between border-b border-purple-500/20 dark:border-slate-800 pb-2.5">
                  <h4 className="font-black text-sm sm:text-base text-purple-700 dark:text-purple-400 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-800 dark:text-purple-400 flex items-center justify-center text-xs font-mono font-bold">2</span>
                    Tipe Data Kompleks (Komposit / Struktur)
                  </h4>
                  <span className="text-xs font-mono bg-purple-500/20 text-purple-800 dark:text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-500/40 font-bold">
                    BAB 11 &amp; 12
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  Menyimpan <strong>kumpulan banyak nilai</strong> sekaligus dalam satu wadah besar dengan struktur tertentu.
                </p>
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-purple-500/30 dark:border-slate-800 text-xs font-mono text-purple-800 dark:text-purple-300 font-bold shadow-xs">
                    &bull; <strong>List / Array</strong>: <code>[1, 2, 3]</code>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-purple-500/30 dark:border-slate-800 text-xs font-mono text-purple-800 dark:text-purple-300 font-bold shadow-xs">
                    &bull; <strong>Tuple</strong>: <code>(10, 20)</code>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-purple-500/30 dark:border-slate-800 text-xs font-mono text-purple-800 dark:text-purple-300 font-bold shadow-xs">
                    &bull; <strong>Dictionary</strong>: Key-Value
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-purple-500/30 dark:border-slate-800 text-xs font-mono text-purple-800 dark:text-purple-300 font-bold shadow-xs">
                    &bull; <strong>Set</strong>: Unik
                  </div>
                </div>
              </div>

            </div>

            {/* Deep Dive into 4 Primitive Types */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 font-sans">
                  Pilih Tipe Data Sederhana untuk Melihat Detail &amp; Sintaks:
                </span>
                <span className="text-xs text-slate-500 font-mono font-medium">(Klik kartu)</span>
              </div>

              {/* Selector Tabs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {primitives.map(prim => {
                  const Icon = prim.icon;
                  const isSelected = selectedPrimitive === prim.id;
                  return (
                    <button
                      key={prim.id}
                      onClick={() => setSelectedPrimitive(prim.id)}
                      className={`p-3.5 rounded-2xl border-2 transition-all text-left flex flex-col justify-between cursor-pointer relative z-0 hover:z-50 hover:scale-[1.2] hover:-translate-y-2 duration-300 ease-out origin-center hover:shadow-xl ${
                        isSelected 
                          ? 'border-amber-500 bg-amber-500/15 dark:bg-slate-900 shadow-md ring-2 ring-amber-500/30' 
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`p-2 rounded-xl ${prim.badge}`}>
                          <Icon className="w-5 h-5" />
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                          {prim.symbol}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 block truncate">
                        {prim.name.split(' ')[0]}
                      </span>
                      <span className="text-xs text-slate-600 dark:text-slate-400 block truncate font-medium">
                        {prim.name.split('(')[1]?.replace(')', '') || ''}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Detail Card of Selected Primitive */}
              <div className="bg-slate-50/90 dark:bg-slate-900/90 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-sm space-y-5 overflow-visible">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4 overflow-visible">
                  <div>
                    <h4 className={`text-base sm:text-lg font-black flex items-center gap-2.5 ${currentPrim.color}`}>
                      {currentPrim.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 mt-1 font-medium">{currentPrim.desc}</p>
                  </div>
                  <span className="text-xs font-mono bg-white dark:bg-slate-950 px-3.5 py-1.5 rounded-xl border-2 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shrink-0 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center md:origin-right hover:shadow-lg hover:border-cyan-500 font-bold">
                    Alokasi Memori: <strong className="text-slate-950 dark:text-white font-black">{currentPrim.size}</strong>
                  </span>
                </div>

                {/* Syntax Comparison Grid with Hover Magnification */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 font-mono text-xs sm:text-sm overflow-visible py-1">
                  {/* 1. Pseudocode (Left) -> md:origin-left */}
                  <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 space-y-1.5 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center md:origin-left hover:shadow-2xl hover:border-purple-500 shadow-xs">
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-sans block font-bold">📄 Pseudocode:</span>
                    <div className="text-purple-800 dark:text-purple-300 font-black text-sm sm:text-base">{currentPrim.pseudoEx}</div>
                  </div>

                  {/* 2. Python 3 (Center) -> origin-center */}
                  <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 space-y-1.5 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-2xl hover:border-blue-500 shadow-xs">
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-sans block font-bold">🐍 Python 3:</span>
                    <div className="text-blue-800 dark:text-blue-300 font-black text-sm sm:text-base">{currentPrim.pythonEx}</div>
                  </div>

                  {/* 3. JavaScript (Right) -> md:origin-right */}
                  <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 space-y-1.5 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center md:origin-right hover:shadow-2xl hover:border-amber-500 shadow-xs">
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-sans block font-bold">🌐 JavaScript:</span>
                    <div className="text-amber-800 dark:text-amber-300 font-black text-sm sm:text-base">{currentPrim.jsEx}</div>
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
            <div className="bg-slate-50/80 dark:bg-slate-900/80 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-sm space-y-5">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h4 className="font-black text-base sm:text-lg text-amber-700 dark:text-amber-400 flex items-center gap-2.5">
                  <Brain className="w-5 h-5" />
                  Hierarki Filosofis: Data &rarr; Informasi &rarr; Pengetahuan (DIKW)
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 mt-1 font-medium">
                  Bagaimana variabel dan tipe data menjadi jembatan pengubah angka mentah menjadi kecerdasan komputasi.
                </p>
              </div>

              {/* 3-Tier Visual Transformation Pipeline */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Tier 1: Raw Data */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border-2 border-cyan-500/30 dark:border-slate-800 space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-2xl hover:border-cyan-500 shadow-xs">
                  <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 px-2.5 py-0.5 rounded-full uppercase">
                    Tahap 1: Data Mentah
                  </span>
                  <div className="text-3xl font-mono font-black text-cyan-700 dark:text-cyan-400 py-1.5">
                    38.5
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Hanya berupa kumpulan simbol atau angka mentah tanpa makna dan tanpa konteks.
                  </p>
                </div>

                {/* Tier 2: Information */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border-2 border-blue-500/30 dark:border-blue-500/40 space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-2xl hover:border-blue-500 shadow-xs">
                  <span className="text-xs font-mono font-bold bg-blue-100 dark:bg-blue-500/20 text-blue-900 dark:text-blue-300 px-2.5 py-0.5 rounded-full uppercase">
                    Tahap 2: Informasi Berlabel
                  </span>
                  <div className="text-base font-mono font-black text-blue-800 dark:text-blue-300 py-1.5 bg-blue-50 dark:bg-slate-900 px-3 rounded-xl border border-blue-500/30 w-fit">
                    suhu_pasien = 38.5 &deg;C
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Data mentah ditempelkan ke <strong>Variabel</strong> berlabel dan bertipe <code>Float</code> sehingga memiliki arti terukur.
                  </p>
                </div>

                {/* Tier 3: Knowledge / Logic */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border-2 border-emerald-500/30 dark:border-emerald-500/40 space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-2xl hover:border-emerald-500 shadow-xs">
                  <span className="text-xs font-mono font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 px-2.5 py-0.5 rounded-full uppercase">
                    Tahap 3: Pengetahuan / Logika
                  </span>
                  <div className="text-sm font-mono font-black text-emerald-800 dark:text-emerald-300 py-1.5 bg-emerald-50 dark:bg-slate-900 px-3 rounded-xl border border-emerald-500/30">
                    if suhu &gt; 37.5 &rarr; Pasien Demam
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Informasi dievaluasi oleh algoritma untuk menghasilkan <strong>keputusan aksi cerdas</strong>.
                  </p>
                </div>

              </div>

              {/* Bottom Insight */}
              <div className="p-4 bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed font-medium shadow-xs">
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Column: Code Editor Box */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                
                {/* Editor Title Bar */}
                <div className="bg-slate-100 dark:bg-slate-950 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    </div>
                    <span className="text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300 ml-1.5 font-bold">Mini Live Type Inspector</span>
                  </div>

                  {/* Language Switcher */}
                  <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                    <button
                      onClick={() => {
                        setEditorLang('python');
                        setLanguage('python');
                        setCodeSnippet('skor = 100\nnama = "Budi Hartono"\nipk = 3.85\nis_aktif = True');
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        editorLang === 'python' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      Python 3
                    </button>
                    <button
                      onClick={() => {
                        setEditorLang('javascript');
                        setLanguage('javascript');
                        setCodeSnippet('let skor = 100;\nlet nama = "Budi Hartono";\nlet ipk = 3.85;\nlet isAktif = true;');
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        editorLang === 'javascript' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      JavaScript
                    </button>
                  </div>
                </div>

                {/* React Simple Code Editor with Dual-Mode Syntax Highlighting */}
                <div className="p-4 bg-slate-50/70 dark:bg-slate-950 flex-1 overflow-x-auto min-h-[170px]">
                  <Editor
                    value={codeSnippet}
                    onValueChange={(code) => setCodeSnippet(code)}
                    highlight={(code) => highlightSnippet(code, editorLang)}
                    padding={12}
                    className="font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 min-h-[150px] focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Editor Bottom Actions */}
                <div className="p-3.5 bg-slate-100/90 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                  <button
                    onClick={handleInspectCode}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4" />
                    <span>Periksa Tipe Data (Run Inspector)</span>
                  </button>

                  <span className="text-xs text-slate-600 dark:text-slate-400 font-mono font-bold">
                    Eksekusi: {editorLang === 'python' ? 'type(variabel)' : 'typeof variabel'}
                  </span>
                </div>

              </div>

              {/* Right Column: Realtime Inspector Output Table */}
              <div className="lg:col-span-5 bg-slate-50/90 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Hasil Pengecekan Mesin:
                  </span>
                  <span className="text-xs font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800 font-bold">
                    {inspectedResults.length} Variabel Terdeteksi
                  </span>
                </div>

                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {inspectedResults.map((res, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-mono space-y-1.5 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-blue-800 dark:text-cyan-300">{res.varName} = {res.value}</span>
                        <span className="text-xs text-slate-500 uppercase font-bold">{editorLang}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-100 dark:border-slate-900">
                        <span className="text-slate-600 dark:text-slate-400 font-sans font-medium">Kelas Data:</span>
                        <strong className="text-emerald-800 dark:text-emerald-400 font-bold">
                          {editorLang === 'python' ? res.pythonClass : res.jsType}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 italic pt-2 border-t border-slate-200 dark:border-slate-800 font-medium">
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
