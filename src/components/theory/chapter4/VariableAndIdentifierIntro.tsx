"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  Tag,
  Cpu,
  Code2,
  Play,
  Info
} from 'lucide-react';

const PYTHON_KEYWORDS = [
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 
  'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 
  'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 
  'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 
  'while', 'with', 'yield'
];

const JS_KEYWORDS = [
  'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 
  'default', 'delete', 'do', 'else', 'export', 'extends', 'finally', 
  'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 
  'return', 'super', 'switch', 'this', 'throw', 'try', 'typeof', 
  'var', 'void', 'while', 'with', 'yield', 'let', 'static'
];

export default function VariableAndIdentifierIntro() {
  const [activeTab, setActiveTab] = useState<'story' | 'custom'>('story');
  
  // Guided Story State
  const [storyStep, setStoryStep] = useState<number>(1);

  // Custom Interactive Identifier State
  const [customVarName, setCustomVarName] = useState<string>('total_harga');
  const [customVarValue, setCustomVarValue] = useState<string>('50000');

  const storySteps = [
    {
      step: 1,
      title: '1. Deklarasi & Inisialisasi Pertama',
      codePseudo: 'skor = 100',
      codePy: 'skor = 100',
      codeJs: 'let skor = 100;',
      varName: 'skor',
      varValue: '100',
      oldValue: null,
      actionNote: 'Komputer memesan satu blok memori kosong (RAM), memberinya label stiker "skor", lalu memasukkan nilai angka 100 ke dalamnya.',
      highlight: 'Memesan wadah baru di RAM bernilai 100'
    },
    {
      step: 2,
      title: '2. Pembaruan Nilai (Re-assignment)',
      codePseudo: 'skor = 150',
      codePy: 'skor = 150',
      codeJs: 'skor = 150;',
      varName: 'skor',
      varValue: '150',
      oldValue: '100',
      actionNote: 'Nilai lama 100 ditimpa dan digantikan oleh nilai baru 150. Wadah dan alamat memorinya tetap sama, hanya isinya yang berganti.',
      highlight: 'Nilai lama 100 ditimpa menjadi 150'
    },
    {
      step: 3,
      title: '3. Operasi Aritmatika pada Wadah',
      codePseudo: 'skor = skor + 25',
      codePy: 'skor = skor + 25',
      codeJs: 'skor = skor + 25;',
      varName: 'skor',
      varValue: '175',
      oldValue: '150',
      actionNote: 'Komputer membaca isi wadah (150), menambahkannya dengan 25 di CPU, lalu menyimpan hasil akhirnya (175) kembali ke wadah yang sama.',
      highlight: 'Nilai 150 + 25 = 175'
    },
    {
      step: 4,
      title: '4. Membaca & Menampilkan Isi Wadah',
      codePseudo: 'output("Skor akhir:", skor)',
      codePy: 'print("Skor akhir:", skor)',
      codeJs: 'console.log("Skor akhir:", skor);',
      varName: 'skor',
      varValue: '175',
      oldValue: '175',
      actionNote: 'Layar monitor meminta data. Komputer mencari wadah berlabel "skor", mengambil isi nilainya (175), lalu menampilkannya ke layar pengguna.',
      highlight: 'Membaca nilai 175 dari wadah'
    }
  ];

  const currentStory = storySteps[storyStep - 1];

  // Validate Identifier function
  const validate = (name: string) => {
    if (!name) return { isValid: false, reason: 'Nama variabel tidak boleh kosong.', style: 'none' };
    if (name.includes(' ')) return { isValid: false, reason: '❌ Dilarang spasi! Gunakan garis bawah (_) atau camelCase.', style: 'invalid' };
    if (name.includes('-')) return { isValid: false, reason: '❌ Dilarang tanda minus (-), komputer mengira ini pengurangan!', style: 'invalid' };
    if (/^[0-9]/.test(name)) return { isValid: false, reason: '❌ Dilarang diawali angka! Awali dengan huruf atau underscore (_).', style: 'invalid' };
    if (!/^[a-zA-Z0-9_]+$/.test(name)) return { isValid: false, reason: '❌ Mengandung simbol khusus terlarang (@, #, $, %, dll).', style: 'invalid' };
    if (PYTHON_KEYWORDS.includes(name) || JS_KEYWORDS.includes(name)) return { isValid: false, reason: `❌ Kata kunci sistem ("${name}") tidak boleh dijadikan nama variabel.`, style: 'keyword' };

    let style = 'Valid';
    if (name.includes('_') && /^[a-z0-9_]+$/.test(name)) style = 'snake_case (Gaya Python)';
    else if (/^[a-z][a-zA-Z0-9]*$/.test(name) && /[A-Z]/.test(name)) style = 'camelCase (Gaya JavaScript)';
    else if (/^[A-Z0-9_]+$/.test(name)) style = 'UPPER_SNAKE_CASE (Gaya Konstanta)';

    return { isValid: true, reason: `✅ Nama variabel valid & sah! Format: ${style}`, style };
  };

  const validation = validate(customVarName.trim());

  return (
    <div className="border border-border/80 dark:border-slate-800 rounded-3xl overflow-visible bg-card dark:bg-slate-950 shadow-xl space-y-0">
      
      {/* 1. Header Bar */}
      <div className="p-4 md:px-6 bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 rounded-t-3xl">
        <div className="flex items-center gap-2.5">
          <Package className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-900 dark:text-slate-100">
            Simulator Alur Kerja: Apa yang Terjadi di Memori Komputer?
          </h3>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <button
            onClick={() => setActiveTab('story')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'story' 
                ? 'bg-cyan-600 text-white shadow-md' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            📖 Simulasi Langkah-demi-Langkah
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'custom' 
                ? 'bg-cyan-600 text-white shadow-md' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            🧪 Coba Nama Sendiri (Validator)
          </button>
        </div>
      </div>

      {/* 2. Main Workspace */}
      <div className="p-4 sm:p-6 space-y-6">
        
        {/* ========================================================================= */}
        {/* TAB 1: GUIDED STORY (SIMULASI ALUR KODE -> MEMORI)                      */}
        {/* ========================================================================= */}
        {activeTab === 'story' && (
          <div className="space-y-6">
            
            {/* Step Selector Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {storySteps.map((item) => (
                <button
                  key={item.step}
                  onClick={() => setStoryStep(item.step)}
                  className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer shadow-xs ${
                    storyStep === item.step
                      ? 'border-cyan-500 bg-cyan-500/15 text-cyan-900 dark:text-cyan-200 ring-2 ring-cyan-500/30'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  <span className="text-xs font-mono block font-bold text-cyan-800 dark:text-cyan-400">Langkah {item.step}:</span>
                  <span className="text-xs sm:text-sm font-black font-mono truncate block text-slate-900 dark:text-slate-100">
                    {item.codePseudo}
                  </span>
                </button>
              ))}
            </div>

            {/* 2-Column Visual Stage */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              
              {/* Left Column: Code Executed */}
              <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-sm">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 font-sans">
                      <Code2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      Baris Kode yang Dijalankan:
                    </span>
                    <span className="text-xs font-mono bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 px-2.5 py-0.5 rounded-full font-bold border border-cyan-300 dark:border-cyan-800">
                      Langkah {currentStory.step}/4
                    </span>
                  </div>

                  <div className="p-4 bg-white dark:bg-slate-950 rounded-xl border-2 border-slate-200 dark:border-slate-800 font-mono space-y-3 shadow-xs">
                    <div>
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-sans block font-bold">📋 Notasi Universal (Pseudocode):</span>
                      <strong className="text-purple-800 dark:text-purple-300 text-xs sm:text-sm font-black block mt-0.5">{currentStory.codePseudo}</strong>
                    </div>
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-sans block font-bold">🐍 Implementasi Python:</span>
                      <strong className="text-blue-800 dark:text-blue-300 text-xs sm:text-sm font-black block mt-0.5">{currentStory.codePy}</strong>
                    </div>
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-sans block font-bold">🌐 Implementasi JavaScript:</span>
                      <strong className="text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-black block mt-0.5">{currentStory.codeJs}</strong>
                    </div>
                  </div>
                </div>

                {/* Next Step Button */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setStoryStep(prev => (prev < 4 ? prev + 1 : 1))}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4" />
                    <span>{storyStep < 4 ? 'Lanjut ke Langkah Berikutnya' : 'Ulangi dari Langkah 1'}</span>
                  </button>
                  <button
                    onClick={() => setStoryStep(1)}
                    className="p-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer border border-border/60"
                    title="Reset ke Langkah 1"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Physical Memory Box Representation (Spacious & Clean) */}
              <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900 border-2 border-cyan-500/40 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4">
                
                {/* Header info */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 font-sans">
                    <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    Kondisi Petak Memori Komputer (RAM):
                  </span>
                  <span className="text-xs font-mono text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 font-bold">
                    Alamat Fisik: <strong className="text-cyan-700 dark:text-cyan-300">0x7FFE0</strong>
                  </span>
                </div>

                {/* THE VARIABLE CONTAINER (BIG & PROUD) */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-950 border-2 border-cyan-500 dark:border-cyan-400 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
                  
                  {/* Variable Label Badge */}
                  <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-cyan-500/40 shadow-xs">
                    <Tag className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    <div>
                      <span className="text-xs text-slate-600 dark:text-slate-400 block font-sans font-bold">Label Identifier:</span>
                      <strong className="text-base sm:text-lg font-mono text-slate-950 dark:text-white tracking-wider font-black">
                        {currentStory.varName}
                      </strong>
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="text-cyan-600 dark:text-cyan-400 hidden md:block">
                    <ArrowRight className="w-7 h-7 stroke-[2.5]" />
                  </div>

                  {/* Variable Value Inside Box */}
                  <div className="bg-slate-50 dark:bg-slate-900/90 px-8 py-3.5 rounded-2xl border-2 border-emerald-500/50 text-center min-w-[150px] shadow-inner">
                    <span className="text-xs text-slate-600 dark:text-slate-400 block font-sans font-bold">Isi Nilai Saat Ini:</span>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStory.varValue}
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-3xl sm:text-4xl font-mono font-black text-emerald-800 dark:text-emerald-300 py-1"
                      >
                        {currentStory.varValue}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                </div>

                {/* Status explanation */}
                <div className="p-4 bg-cyan-500/10 border-2 border-cyan-500/30 rounded-2xl text-xs sm:text-sm space-y-1 shadow-xs">
                  <div className="flex items-center gap-1.5 text-cyan-900 dark:text-cyan-300 font-bold">
                    <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Apa yang Terjadi di Komputer?</span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    {currentStory.actionNote}
                  </p>
                </div>

              </div>

            </div>

            {/* Bottom AHA Moment Banner */}
            <div className="p-4 sm:p-5 bg-slate-100 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between text-xs sm:text-sm shadow-xs">
              <span className="text-slate-800 dark:text-slate-200 flex items-center gap-2.5 font-medium leading-relaxed">
                <span className="text-xl">💡</span>
                <span><strong>Momen AHA Mutability:</strong> Wadah dan alamat memorinya (<code className="bg-white dark:bg-slate-950 px-2 py-0.5 rounded font-bold border border-slate-200 dark:border-slate-800">0x7FFE0</code>) tetap persis sama, hanya nilai angka di dalamnya yang bervariasi/berubah!</span>
              </span>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CUSTOM SANDBOX (COBA NAMA & NILAI SENDIRI + LIVE VALIDATOR)        */}
        {/* ========================================================================= */}
        {activeTab === 'custom' && (
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              
              {/* Form Input */}
              <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Uji Coba Penamaan Variabel Sendiri:
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">Live Linter</span>
                </div>

                {/* Quick Presets */}
                <div className="space-y-2">
                  <span className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold">Contoh Cepat:</span>
                  <div className="flex flex-wrap items-center gap-2">
                    <button 
                      onClick={() => { setCustomVarName('total_harga'); setCustomVarValue('50000'); }}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border-2 border-cyan-300 dark:border-cyan-700 text-cyan-900 dark:text-cyan-300 text-xs font-mono cursor-pointer font-bold transition-all shadow-xs hover:scale-105 active:scale-95"
                    >
                      total_harga (Python)
                    </button>
                    <button 
                      onClick={() => { setCustomVarName('totalHarga'); setCustomVarValue('50000'); }}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border-2 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-300 text-xs font-mono cursor-pointer font-bold transition-all shadow-xs hover:scale-105 active:scale-95"
                    >
                      totalHarga (JS)
                    </button>
                    <button 
                      onClick={() => { setCustomVarName('1st_winner'); setCustomVarValue('Emas'); }}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border-2 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-400 text-xs font-mono cursor-pointer font-bold transition-all shadow-xs hover:scale-105 active:scale-95"
                    >
                      1st_winner (Salah)
                    </button>
                    <button 
                      onClick={() => { setCustomVarName('nama user'); setCustomVarValue('Ali'); }}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border-2 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-400 text-xs font-mono cursor-pointer font-bold transition-all shadow-xs hover:scale-105 active:scale-95"
                    >
                      nama user (Spasi)
                    </button>
                  </div>
                </div>

                {/* Inputs */}
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 font-sans block mb-1">
                      Ketik Nama Variabel (Identifier):
                    </label>
                    <div className="relative">
                      <input 
                        type="text"
                        value={customVarName}
                        onChange={(e) => setCustomVarName(e.target.value)}
                        placeholder="misal: nama_lengkap"
                        className={`w-full h-12 px-3.5 text-base sm:text-lg font-mono font-black transition-all bg-white dark:bg-slate-950 border-2 rounded-xl focus:outline-none pr-10 shadow-inner ${
                          validation.isValid 
                            ? 'border-slate-300 dark:border-slate-700 text-cyan-900 dark:text-cyan-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20' 
                            : 'border-rose-400 dark:border-rose-500 text-rose-800 dark:text-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20'
                        }`}
                      />
                      <div className="absolute right-3.5 top-3.5">
                        {validation.isValid ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-500" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 font-sans block mb-1">
                      Isi Nilai di Dalam Wadah:
                    </label>
                    <input 
                      type="text"
                      value={customVarValue}
                      onChange={(e) => setCustomVarValue(e.target.value)}
                      placeholder="misal: Arjuna atau 2026"
                      className="w-full h-12 px-3.5 text-base sm:text-lg font-mono font-black text-emerald-900 dark:text-emerald-300 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Linter Message */}
                <div className={`p-3.5 rounded-xl border-2 text-xs sm:text-sm font-mono flex items-center gap-2.5 shadow-xs ${
                  validation.isValid 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-300' 
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-300'
                }`}>
                  <Info className="w-5 h-5 shrink-0" />
                  <span className="font-bold">{validation.reason}</span>
                </div>
              </div>

              {/* Memory Result Box */}
              <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">Hasil Pembuatan Wadah Memori:</span>
                  <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-950 px-2.5 py-0.5 rounded-lg border border-slate-200 dark:border-slate-800">RAM Slot</span>
                </div>

                {validation.isValid ? (
                  <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-950 border-2 border-emerald-500/50 space-y-3 text-center shadow-xs">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-slate-100 dark:border-slate-900 pb-1.5 font-bold">
                      <span>ALOKASI RAM: 0x7FFE4</span>
                      <span className="text-emerald-700 dark:text-emerald-400">STATUS: TERDAFTAR</span>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                      Nama Identifier: <strong className="text-slate-950 dark:text-white font-mono text-base font-black">{customVarName}</strong>
                    </div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl border border-emerald-500/30 font-mono text-xl sm:text-2xl font-black text-emerald-800 dark:text-emerald-300 shadow-inner">
                      {customVarValue || '[KOSONG]'}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border-2 border-dashed border-rose-500/40 text-center space-y-2">
                    <XCircle className="w-10 h-10 text-rose-600 dark:text-rose-400 mx-auto" />
                    <strong className="text-sm text-rose-800 dark:text-rose-300 block font-mono font-black">KOMPUTER MENOLAK MEMBUAT WADAH</strong>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                      Nama variabel &quot;{customVarName}&quot; melanggar aturan leksikal sehingga memori gagal dialokasikan.
                    </p>
                  </div>
                )}

                <div className="text-xs text-slate-600 dark:text-slate-400 italic font-medium">
                  💡 Komputer hanya mau memesan memori jika nama variabel mematuhi kaidah leksikal bahasa pemrograman.
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
