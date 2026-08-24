"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Cpu, 
  Sparkles, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Tag, 
  Info,
  ArrowRight,
  Code2,
  Terminal,
  ShieldCheck
} from 'lucide-react';

const PYTHON_KEYWORDS = [
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 
  'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 
  'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 
  'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'
];

const JS_KEYWORDS = [
  'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 
  'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function', 
  'if', 'import', 'in', 'instanceof', 'new', 'return', 'super', 'switch', 
  'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield', 
  'let', 'static', 'enum', 'await'
];

export default function VariableAndIdentifierIntro() {
  // Mode: Guided Story (Langkah-demi-langkah) vs Custom Sandbox (Coba Sendiri)
  const [activeTab, setActiveTab] = useState<'story' | 'custom'>('story');

  // Guided Story State
  const [storyStep, setStoryStep] = useState<number>(1);

  // Custom Input State
  const [customVarName, setCustomVarName] = useState('nama_pemain');
  const [customVarValue, setCustomVarValue] = useState('Arjuna');

  // Story step details
  const storySteps = [
    {
      step: 1,
      title: '1. Membuat Variabel Baru (Deklarasi & Inisialisasi)',
      codePy: 'skor = 100',
      codeJs: 'let skor = 100;',
      varName: 'skor',
      varValue: '100',
      oldValue: null,
      actionNote: 'Komputer memesan 1 petak memori di RAM (0x7FFE0), menempelkan label "skor", dan memasukkan nilai 100 ke dalamnya.',
      highlight: 'Wadah baru dibuat & diisi 100'
    },
    {
      step: 2,
      title: '2. Mengubah Isi Variabel (Re-assignment / Mutability)',
      codePy: 'skor = 150',
      codeJs: 'skor = 150;',
      varName: 'skor',
      varValue: '150',
      oldValue: '100',
      actionNote: 'Pemain mendapat poin! Komputer TIDAK membuat wadah baru. Nilai lama 100 dibuang/ditimpa, dan nilai baru 150 dimasukkan ke wadah "skor" yang sama.',
      highlight: 'Nilai 100 ditimpa menjadi 150'
    },
    {
      step: 3,
      title: '3. Operasi Akumulasi Nilai',
      codePy: 'skor = skor + 25',
      codeJs: 'skor = skor + 25;',
      varName: 'skor',
      varValue: '175',
      oldValue: '150',
      actionNote: 'Komputer membaca isi wadah "skor" (150), menambahkannya dengan 25 (= 175), lalu menyimpan kembali hasilnya ke wadah yang sama.',
      highlight: 'Nilai 150 + 25 = 175'
    },
    {
      step: 4,
      title: '4. Membaca & Menampilkan Isi Wadah',
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
    <div className="border border-border/60 rounded-3xl overflow-visible bg-slate-950 shadow-2xl space-y-0">
      
      {/* 1. Header Bar */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 rounded-t-3xl">
        <div className="flex items-center gap-2.5">
          <Package className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-100">
            Simulator Alur Kerja: Apa yang Terjadi di Memori Komputer?
          </h3>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('story')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'story' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📖 Simulasi Langkah-demi-Langkah
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'custom' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🧪 Coba Nama Sendiri (Validator)
          </button>
        </div>
      </div>

      {/* 2. Main Workspace */}
      <div className="p-4 md:p-6 space-y-6">
        
        {/* ========================================================================= */}
        {/* TAB 1: GUIDED STORY (SIMULASI ALUR KODE -> MEMORI)                      */}
        {/* ========================================================================= */}
        {activeTab === 'story' && (
          <div className="space-y-6">
            
            {/* Step Selector Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {storySteps.map((item) => (
                <button
                  key={item.step}
                  onClick={() => setStoryStep(item.step)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    storyStep === item.step
                      ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  <span className="text-[10px] font-mono block font-bold">Langkah {item.step}:</span>
                  <span className="text-xs font-bold font-mono truncate block text-slate-200">
                    {item.codePy}
                  </span>
                </button>
              ))}
            </div>

            {/* 2-Column Visual Stage */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              
              {/* Left Column: Code Executed */}
              <div className="md:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-4 shadow-inner">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 font-sans">
                      <Code2 className="w-4 h-4 text-cyan-400" />
                      Baris Kode yang Dijalankan:
                    </span>
                    <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold">
                      Langkah {currentStory.step}/4
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                    <div>
                      <span className="text-[10px] text-slate-500 font-sans block">🐍 Bahasa Python:</span>
                      <strong className="text-cyan-300 text-sm">{currentStory.codePy}</strong>
                    </div>
                    <div className="pt-2 border-t border-slate-900">
                      <span className="text-[10px] text-slate-500 font-sans block">🌐 Bahasa JavaScript:</span>
                      <strong className="text-amber-300 text-xs">{currentStory.codeJs}</strong>
                    </div>
                  </div>
                </div>

                {/* Next Step Button */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setStoryStep(prev => (prev < 4 ? prev + 1 : 1))}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{storyStep < 4 ? 'Lanjut ke Langkah Berikutnya' : 'Ulangi dari Langkah 1'}</span>
                  </button>
                  <button
                    onClick={() => setStoryStep(1)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    title="Reset ke Langkah 1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Physical Memory Box Representation (Spacious & Clean) */}
              <div className="md:col-span-7 bg-slate-900 border border-cyan-500/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
                
                {/* Header info */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 font-sans">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    Kondisi Petak Memori Komputer (RAM):
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    Alamat Fisik: <strong className="text-cyan-300">0x7FFE0</strong>
                  </span>
                </div>

                {/* THE VARIABLE CONTAINER (BIG & PROUD) */}
                <div className="p-5 rounded-2xl bg-slate-950 border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.15)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
                  
                  {/* Variable Label Badge */}
                  <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-cyan-500/40">
                    <Tag className="w-4 h-4 text-cyan-400" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">Nama Variabel (Label):</span>
                      <strong className="text-sm font-mono text-white tracking-wider">
                        {currentStory.varName}
                      </strong>
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="text-slate-500 hidden md:block">
                    <ArrowRight className="w-6 h-6 text-cyan-400" />
                  </div>

                  {/* Variable Value Inside Box */}
                  <div className="bg-slate-900/90 px-6 py-3 rounded-2xl border border-emerald-500/40 text-center min-w-[140px]">
                    <span className="text-[10px] text-slate-400 block font-sans">Isi Nilai Saat Ini:</span>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStory.varValue}
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-2xl md:text-3xl font-mono font-extrabold text-emerald-400"
                      >
                        {currentStory.varValue}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                </div>

                {/* Status explanation */}
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Apa yang Terjadi di Komputer?</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    {currentStory.actionNote}
                  </p>
                </div>

              </div>

            </div>

            {/* Bottom AHA Moment Banner */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-2">
                <span className="text-lg">💡</span>
                <strong>Momen AHA Mutability:</strong> Wadah dan alamat memorinya (<code>0x7FFE0</code>) tetap persis sama, hanya nilai angka di dalamnya yang bervariasi/berubah!
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
              <div className="md:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Uji Coba Penamaan Variabel Sendiri:
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Live Linter</span>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-slate-500 text-[10px]">Contoh:</span>
                  <button 
                    onClick={() => { setCustomVarName('total_harga'); setCustomVarValue('50000'); }}
                    className="px-2 py-0.5 rounded bg-slate-950 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-[10px] font-mono cursor-pointer"
                  >
                    total_harga (Python)
                  </button>
                  <button 
                    onClick={() => { setCustomVarName('totalHarga'); setCustomVarValue('50000'); }}
                    className="px-2 py-0.5 rounded bg-slate-950 hover:bg-slate-800 border border-slate-700 text-amber-300 text-[10px] font-mono cursor-pointer"
                  >
                    totalHarga (JS)
                  </button>
                  <button 
                    onClick={() => { setCustomVarName('1st_winner'); setCustomVarValue('Emas'); }}
                    className="px-2 py-0.5 rounded bg-slate-950 hover:bg-slate-800 border border-slate-700 text-rose-400 text-[10px] font-mono cursor-pointer"
                  >
                    1st_winner (Salah)
                  </button>
                  <button 
                    onClick={() => { setCustomVarName('nama user'); setCustomVarValue('Ali'); }}
                    className="px-2 py-0.5 rounded bg-slate-950 hover:bg-slate-800 border border-slate-700 text-rose-400 text-[10px] font-mono cursor-pointer"
                  >
                    nama user (Spasi)
                  </button>
                </div>

                {/* Inputs */}
                <div className="space-y-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 font-sans block mb-1">
                      Ketik Nama Variabel (Identifier):
                    </label>
                    <div className="relative">
                      <input 
                        type="text"
                        value={customVarName}
                        onChange={(e) => setCustomVarName(e.target.value)}
                        placeholder="misal: nama_lengkap"
                        className={`w-full bg-slate-950 border rounded-xl px-3 py-2 text-xs font-mono transition-colors focus:outline-none pr-8 ${
                          validation.isValid ? 'border-slate-700 text-cyan-300 focus:border-cyan-500' : 'border-rose-500 text-rose-300 focus:border-rose-500'
                        }`}
                      />
                      <div className="absolute right-2.5 top-2.5">
                        {validation.isValid ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-500" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 font-sans block mb-1">
                      Isi Nilai di Dalam Wadah:
                    </label>
                    <input 
                      type="text"
                      value={customVarValue}
                      onChange={(e) => setCustomVarValue(e.target.value)}
                      placeholder="misal: Arjuna atau 2026"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-emerald-400 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Linter Message */}
                <div className={`p-2.5 rounded-xl border text-xs font-mono flex items-center gap-2 ${
                  validation.isValid ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}>
                  <Info className="w-4 h-4 shrink-0" />
                  <span>{validation.reason}</span>
                </div>
              </div>

              {/* Memory Result Box */}
              <div className="md:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-200">Hasil Pembuatan Wadah Memori:</span>
                  <span className="text-[10px] font-mono text-slate-400">RAM Slot</span>
                </div>

                {validation.isValid ? (
                  <div className="p-4 rounded-2xl bg-slate-950 border-2 border-emerald-500/50 space-y-3 text-center">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-b border-slate-900 pb-1">
                      <span>ALOKASI RAM: 0x7FFE4</span>
                      <span className="text-emerald-400 font-bold">STATUS: TERDAFTAR</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Nama Identifier: <strong className="text-white font-mono text-sm">{customVarName}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-emerald-500/30 font-mono text-lg font-bold text-emerald-400">
                      {customVarValue || '[KOSONG]'}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-slate-950 border-2 border-dashed border-rose-500/40 text-center space-y-2">
                    <XCircle className="w-8 h-8 text-rose-400 mx-auto" />
                    <strong className="text-xs text-rose-300 block font-mono">KOMPUTER MENOLAK MEMBUAT WADAH</strong>
                    <p className="text-[11px] text-slate-400">
                      Nama variabel &quot;{customVarName}&quot; melanggar aturan leksikal sehingga memori gagal dialokasikan.
                    </p>
                  </div>
                )}

                <div className="text-[11px] text-slate-400 italic">
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
