"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Type, 
  Sparkles, 
  Plus, 
  X, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Code2, 
  Terminal,
  HelpCircle,
  Copy,
  Hash,
  Sliders
} from 'lucide-react';

export default function StringManipulationLab() {
  const [activeTab, setActiveTab] = useState<'basics' | 'interpolation' | 'indexing'>('basics');

  // State untuk Tab 1: Operasi Dasar (Concatenation & Replication & Jebakan Tipe)
  const [strA, setStrA] = useState('Algoritma');
  const [strB, setStrB] = useState('Pemrograman');
  const [repeatWord, setRepeatWord] = useState('BISA!');
  const [repeatCount, setRepeatCount] = useState(3);
  const [trapNumA, setTrapNumA] = useState('10');
  const [trapNumB, setTrapNumB] = useState('20');

  // State untuk Tab 2: Interpolasi Modern
  const [studentName, setStudentName] = useState('Siti Nurhaliza');
  const [courseName, setCourseName] = useState('Algoritma & Struktur Data');
  const [score, setScore] = useState(88);

  // State untuk Tab 3: Pengindeksan & Panjang Karakter
  const [inspectText, setInspectText] = useState('INFORMATIKA');
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Perhitungan Tab 1
  const concatenatedStr = `${strA} ${strB}`;
  const replicatedPython = `${repeatWord} `.repeat(Math.max(1, Math.min(8, repeatCount))).trim();
  const trapConcat = `${trapNumA}${trapNumB}`;
  const trapMath = (parseInt(trapNumA) || 0) + (parseInt(trapNumB) || 0);

  return (
    <div className="border border-border/70 dark:border-slate-800 rounded-3xl overflow-visible bg-card dark:bg-slate-950 shadow-xl space-y-0">
      
      {/* 1. Header Toolbar */}
      <div className="p-4 md:px-6 bg-slate-50/90 dark:bg-slate-900/90 border-b border-border/70 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 rounded-t-3xl">
        <div className="flex items-center gap-2.5">
          <Type className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-900 dark:text-slate-100">
            Laboratorium Manipulasi Teks &amp; String Formatting Modern
          </h3>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-800/80 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('basics')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'basics' 
                ? 'bg-cyan-600 text-white shadow-sm' 
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            1. Sambung (+) &amp; Gandakan (*)
          </button>
          <button
            onClick={() => setActiveTab('interpolation')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'interpolation' 
                ? 'bg-cyan-600 text-white shadow-sm' 
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            2. Modern Interpolation (f-string)
          </button>
          <button
            onClick={() => setActiveTab('indexing')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'indexing' 
                ? 'bg-cyan-600 text-white shadow-sm' 
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            3. Panjang &amp; Indeks Karakter
          </button>
        </div>
      </div>

      {/* 2. Main Tab Body */}
      <div className="p-4 md:p-6 space-y-6 overflow-visible">
        
        {/* ========================================================================= */}
        {/* TAB 1: OPERASI DASAR STRING & JEBAKAN KONKATENASI                         */}
        {/* ========================================================================= */}
        {activeTab === 'basics' && (
          <div className="space-y-6 overflow-visible">
            
            {/* Sub-Panel A: Penggabungan String (+) */}
            <div className="bg-slate-50/80 dark:bg-slate-900/90 border border-border/70 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-inner space-y-4 overflow-visible">
              <div className="border-b border-border/70 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-bold uppercase tracking-wider">
                  Bagian 1A: Penggabungan Dua String (String Concatenation)
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium mt-1">
                  Ketika operator <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-200 font-bold font-mono">+</code> bertemu dua buah teks (string), komputer tidak menjumlahkannya melainkan merekatkan kedua teks tersebut menjadi satu kesatuan.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center overflow-visible">
                <div className="space-y-3 font-mono text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-700 dark:text-slate-400 font-bold">Teks A (depan):</label>
                    <input
                      type="text"
                      value={strA}
                      onChange={(e) => setStrA(e.target.value)}
                      className="w-full bg-card dark:bg-slate-950 border border-border/80 dark:border-slate-700 rounded-xl px-3 py-2 text-cyan-700 dark:text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-700 dark:text-slate-400 font-bold">Teks B (belakang):</label>
                    <input
                      type="text"
                      value={strB}
                      onChange={(e) => setStrB(e.target.value)}
                      className="w-full bg-card dark:bg-slate-950 border border-border/80 dark:border-slate-700 rounded-xl px-3 py-2 text-cyan-700 dark:text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Hasil Visualisasi Gabungan */}
                <div className="p-4 rounded-2xl bg-card dark:bg-slate-950 border-2 border-cyan-500/40 space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center md:origin-right hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.9)] hover:border-cyan-500">
                  <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 block">
                    Hasil Ekspresi: <code>&quot;{strA}&quot; + &quot; &quot; + &quot;{strB}&quot;</code>
                  </span>
                  <div className="text-xl md:text-2xl font-mono font-black text-cyan-700 dark:text-cyan-300 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-border/70 dark:border-slate-800 break-words">
                    &gt; &quot;{concatenatedStr}&quot;
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                    Kedua blok memori string disambung menjadi satu string baru di memori RAM.
                  </p>
                </div>
              </div>
            </div>

            {/* Sub-Panel B: Jebakan Fatal Tipe Data ("10" + "20" vs 10 + 20) */}
            <div className="p-5 md:p-6 rounded-2xl bg-amber-500/10 dark:bg-amber-950/20 border-2 border-amber-500/50 space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.9)] hover:border-amber-400">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
                <AlertTriangle className="w-4 h-4" />
                <span>Jebakan Pemula Terbesar: String Concatenation vs Penjumlahan Numerik!</span>
              </div>
              <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                Jika data angka masih dibungkus petik (string) seperti input dari form atau fungsi <code className="font-bold">input()</code>, operator <code className="font-bold">+</code> akan <strong>menyambung teks</strong> alih-alih menjumlahkan nilainya secara matematis!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 bg-card dark:bg-slate-900 rounded-xl border border-rose-400/60 space-y-1">
                  <span className="text-rose-700 dark:text-rose-400 font-bold block">❌ Teks String (Belum di-cast):</span>
                  <div className="text-slate-900 dark:text-slate-100 font-bold">
                    &quot;{trapNumA}&quot; + &quot;{trapNumB}&quot; = <span className="text-rose-600 dark:text-rose-400 text-sm font-black">&quot;{trapConcat}&quot;</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans block">Hanya direkatkan (bukan seratus dua puluh!)</span>
                </div>

                <div className="p-3 bg-card dark:bg-slate-900 rounded-xl border border-emerald-400/60 space-y-1">
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold block">✓ Bilangan Integer (Di-cast):</span>
                  <div className="text-slate-900 dark:text-slate-100 font-bold">
                    int(&quot;{trapNumA}&quot;) + int(&quot;{trapNumB}&quot;) = <span className="text-emerald-600 dark:text-emerald-400 text-sm font-black">{trapMath}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans block">Dijumlahkan secara matematis menjadi tiga puluh!</span>
                </div>
              </div>
            </div>

            {/* Sub-Panel C: Replikasi Teks (*) */}
            <div className="bg-slate-50/80 dark:bg-slate-900/90 border border-border/70 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-inner space-y-4 overflow-visible">
              <div className="border-b border-border/70 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono text-purple-700 dark:text-purple-400 font-bold uppercase tracking-wider">
                  Bagian 1B: Replikasi Teks Berulang (String Repetition)
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium mt-1">
                  Di Python, operator perkalian <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-200 font-bold font-mono">*</code> dapat mengalikan sebuah teks dengan bilangan bulat <code className="font-bold font-mono">N</code> untuk menggandakan teks tersebut sebanyak <code className="font-bold font-mono">N</code> kali secara otomatis.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-5 space-y-3 font-mono text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-700 dark:text-slate-400 font-bold">Kata yang Digandakan:</label>
                    <input
                      type="text"
                      value={repeatWord}
                      onChange={(e) => setRepeatWord(e.target.value)}
                      className="w-full bg-card dark:bg-slate-950 border border-border/80 dark:border-slate-700 rounded-xl px-3 py-2 text-purple-700 dark:text-purple-300 font-bold focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-700 dark:text-slate-400 font-bold">Jumlah Replikasi (N = 1 s/d 8):</label>
                    <input
                      type="number"
                      min={1}
                      max={8}
                      value={repeatCount}
                      onChange={(e) => setRepeatCount(Math.max(1, Math.min(8, parseInt(e.target.value) || 1)))}
                      className="w-full bg-card dark:bg-slate-950 border border-border/80 dark:border-slate-700 rounded-xl px-3 py-2 text-purple-700 dark:text-purple-300 font-bold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="md:col-span-7 p-4 rounded-2xl bg-card dark:bg-slate-950 border-2 border-purple-500/40 space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center md:origin-right hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.9)] hover:border-purple-500">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-blue-700 dark:text-blue-400 font-bold">🐍 Python: <code>&quot;{repeatWord} &quot; * {repeatCount}</code></span>
                    <span className="text-amber-700 dark:text-amber-400 font-bold">🌐 JS: <code>&quot;{repeatWord} &quot;.repeat({repeatCount})</code></span>
                  </div>
                  <div className="text-base font-mono font-black text-purple-700 dark:text-purple-300 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-border/70 dark:border-slate-800 break-words">
                    &gt; &quot;{replicatedPython}&quot;
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: MODERN STRING INTERPOLATION (F-STRING VS TEMPLATE LITERAL)         */}
        {/* ========================================================================= */}
        {activeTab === 'interpolation' && (
          <div className="space-y-6 overflow-visible">
            
            <div className="bg-slate-50/80 dark:bg-slate-900/90 border border-border/70 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-inner space-y-4 overflow-visible">
              <div className="border-b border-border/70 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-bold uppercase tracking-wider">
                  Bagian 2: Interpolasi String Modern (f-string &amp; Template Literal)
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium mt-1">
                  Tinggalkan penggabungan manual <code className="font-mono font-bold">&quot;Nilai: &quot; + str(skor)</code> yang rentan salah ketik spasi! Di era modern, kita menanam variabel langsung ke dalam badan teks menggunakan <strong className="text-blue-700 dark:text-blue-400">f-string di Python</strong> dan <strong className="text-amber-700 dark:text-amber-400">Template Literal di JavaScript</strong>.
                </p>
              </div>

              {/* Input Variables Form */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="space-y-1">
                  <label className="text-slate-700 dark:text-slate-400 font-bold">Nama Mahasiswa:</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-card dark:bg-slate-950 border border-border/80 dark:border-slate-700 rounded-xl px-3 py-2 text-cyan-700 dark:text-cyan-300 font-bold focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-700 dark:text-slate-400 font-bold">Mata Kuliah:</label>
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className="w-full bg-card dark:bg-slate-950 border border-border/80 dark:border-slate-700 rounded-xl px-3 py-2 text-cyan-700 dark:text-cyan-300 font-bold focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-700 dark:text-slate-400 font-bold">Nilai Akhir (0-100):</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={score}
                    onChange={(e) => setScore(parseInt(e.target.value) || 0)}
                    className="w-full bg-card dark:bg-slate-950 border border-border/80 dark:border-slate-700 rounded-xl px-3 py-2 text-cyan-700 dark:text-cyan-300 font-bold focus:outline-none"
                  />
                </div>
              </div>

              {/* Komparasi Visual Dua Bahasa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 overflow-visible">
                
                {/* Kartu Python 3 */}
                <div className="p-4 rounded-2xl bg-card dark:bg-slate-950 border-2 border-blue-500/40 space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center md:origin-left hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.9)] hover:border-blue-500">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-sans text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                      <span>🐍 Python 3: Format f-string</span>
                    </span>
                    <span className="text-[10px] font-mono bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-bold">
                      Awalan f&quot;...&quot;
                    </span>
                  </div>
                  
                  <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl font-mono text-xs border border-border/70 dark:border-slate-800 space-y-1">
                    <div className="text-slate-500 dark:text-slate-400 text-[10px]"># Kode Sumber:</div>
                    <div className="text-slate-900 dark:text-slate-100 font-bold">
                      laporan = <span className="text-purple-600 dark:text-purple-400">f</span><span className="text-emerald-700 dark:text-emerald-400">&quot;Mahasiswa &#123;<span className="text-blue-600 dark:text-blue-400">nama</span>&#125; meraih &#123;<span className="text-amber-600 dark:text-amber-400">skor</span>&#125; di &#123;<span className="text-cyan-600 dark:text-cyan-400">matkul</span>&#125;!&quot;</span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl font-mono text-xs border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200 font-bold break-words">
                    &gt; &quot;Mahasiswa {studentName} meraih {score} di {courseName}!&quot;
                  </div>
                </div>

                {/* Kartu JavaScript */}
                <div className="p-4 rounded-2xl bg-card dark:bg-slate-950 border-2 border-amber-500/40 space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center md:origin-right hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.9)] hover:border-amber-500">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-sans text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                      <span>🌐 JavaScript: Template Literal</span>
                    </span>
                    <span className="text-[10px] font-mono bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full font-bold">
                      Backtick `...`
                    </span>
                  </div>

                  <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl font-mono text-xs border border-border/70 dark:border-slate-800 space-y-1">
                    <div className="text-slate-500 dark:text-slate-400 text-[10px]">// Kode Sumber:</div>
                    <div className="text-slate-900 dark:text-slate-100 font-bold">
                      let laporan = <span className="text-emerald-700 dark:text-emerald-400">`Mahasiswa $&#123;<span className="text-blue-600 dark:text-blue-400">nama</span>&#125; meraih $&#123;<span className="text-amber-600 dark:text-amber-400">skor</span>&#125; di $&#123;<span className="text-cyan-600 dark:text-cyan-400">matkul</span>&#125;!`</span>;
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50/70 dark:bg-amber-950/40 rounded-xl font-mono text-xs border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 font-bold break-words">
                    &gt; &quot;Mahasiswa {studentName} meraih {score} di {courseName}!&quot;
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PANJANG STRING & PENGINDEKSAN KARAKTER (ZERO-BASED INDEX)          */}
        {/* ========================================================================= */}
        {activeTab === 'indexing' && (
          <div className="space-y-6 overflow-visible">
            
            <div className="bg-slate-50/80 dark:bg-slate-900/90 border border-border/70 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-inner space-y-4 overflow-visible">
              <div className="border-b border-border/70 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-bold uppercase tracking-wider">
                  Bagian 3: Anatomi Indeks Karakter &amp; Panjang String (len / length)
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium mt-1">
                  String adalah kumpulan karakter berurutan. Di dunia pemrograman modern, indeks karakter <strong>selalu dimulai dari angka 0 (Zero-Based Indexing)</strong>.
                </p>
              </div>

              {/* Input Text to Inspect */}
              <div className="space-y-2 font-mono text-xs">
                <label className="text-slate-700 dark:text-slate-400 font-bold">Ketik Kata untuk Dianalisis:</label>
                <input
                  type="text"
                  maxLength={16}
                  value={inspectText}
                  onChange={(e) => {
                    const txt = e.target.value.toUpperCase();
                    setInspectText(txt);
                    if (selectedIdx >= txt.length) setSelectedIdx(Math.max(0, txt.length - 1));
                  }}
                  className="w-full max-w-md bg-card dark:bg-slate-950 border border-border/80 dark:border-slate-700 rounded-xl px-3 py-2 text-cyan-700 dark:text-cyan-300 font-bold text-base tracking-widest focus:outline-none"
                />
              </div>

              {/* Interactive Character Index Visualizer */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-sans">
                  Visualisasi Slot Indeks (Klik salah satu kotak karakter):
                </span>

                <div className="flex flex-wrap gap-2 pt-1">
                  {inspectText.split('').map((char, idx) => {
                    const isSelected = idx === selectedIdx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedIdx(idx)}
                        className={`w-12 h-16 rounded-xl border-2 flex flex-col items-center justify-between p-1.5 transition-transform cursor-pointer relative z-0 hover:z-50 hover:scale-[1.2] hover:-translate-y-2 duration-300 ease-out origin-center hover:shadow-xl ${
                          isSelected 
                            ? 'border-cyan-500 bg-cyan-100/80 dark:bg-cyan-950/70 shadow-md ring-2 ring-cyan-400' 
                            : 'border-border/70 dark:border-slate-800 bg-card dark:bg-slate-900/60 hover:border-cyan-300'
                        }`}
                      >
                        <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                          [{idx}]
                        </span>
                        <span className="text-lg font-mono font-black text-slate-900 dark:text-white">
                          {char}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">
                          -{inspectText.length - idx}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card Detail Indeks Terpilih */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2 font-mono text-xs overflow-visible">
                <div className="p-3 bg-card dark:bg-slate-900 rounded-xl border border-cyan-400/50 space-y-1">
                  <span className="text-slate-600 dark:text-slate-400 font-sans font-bold block text-[11px]">Total Panjang String:</span>
                  <div className="text-slate-900 dark:text-slate-100 font-bold">
                    Python: <code className="text-cyan-700 dark:text-cyan-400">len(teks) = {inspectText.length}</code>
                  </div>
                  <div className="text-slate-900 dark:text-slate-100 font-bold">
                    JS: <code className="text-amber-700 dark:text-amber-400">teks.length = {inspectText.length}</code>
                  </div>
                </div>

                <div className="p-3 bg-card dark:bg-slate-900 rounded-xl border border-emerald-400/50 space-y-1">
                  <span className="text-slate-600 dark:text-slate-400 font-sans font-bold block text-[11px]">Karakter pada Indeks [{selectedIdx}]:</span>
                  <div className="text-emerald-700 dark:text-emerald-400 text-lg font-black">
                    &apos;{inspectText[selectedIdx] || ''}&apos;
                  </div>
                  <span className="text-[10px] text-slate-500 font-sans block">Sintaks: <code>teks[{selectedIdx}]</code></span>
                </div>

                <div className="p-3 bg-card dark:bg-slate-900 rounded-xl border border-purple-400/50 space-y-1">
                  <span className="text-slate-600 dark:text-slate-400 font-sans font-bold block text-[11px]">Indeks Negatif (Python Terbalik):</span>
                  <div className="text-purple-700 dark:text-purple-400 text-sm font-black">
                    teks[-1] = &apos;{inspectText[inspectText.length - 1] || ''}&apos;
                  </div>
                  <span className="text-[10px] text-slate-500 font-sans block">Indeks -1 selalu mengambil huruf paling terakhir!</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 3. Tabel Kamus Lengkap Manipulasi String */}
        <div className="p-4 md:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/90 border border-border/70 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-bold text-sm">
            <Type className="w-4 h-4" />
            <span>Tabel Kamus Operasi Lengkap Manipulasi Teks &amp; Format String:</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-border/70 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 font-sans">
                  <th className="p-3">Operasi</th>
                  <th className="p-3">Sintaks Python 3</th>
                  <th className="p-3">Sintaks JavaScript</th>
                  <th className="p-3">Contoh Kode</th>
                  <th className="p-3">Hasil Evaluasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                <tr className="hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-slate-900 dark:text-white font-sans">1. Penggabungan (Concatenation)</td>
                  <td className="p-3 text-blue-700 dark:text-blue-300 font-bold">+</td>
                  <td className="p-3 text-amber-700 dark:text-amber-300 font-bold">+</td>
                  <td className="p-3 text-cyan-700 dark:text-cyan-300 font-bold">&quot;Halo &quot; + &quot;Dunia&quot;</td>
                  <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">&quot;Halo Dunia&quot;</td>
                </tr>
                <tr className="hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-slate-900 dark:text-white font-sans">2. Replikasi Teks (Repetition)</td>
                  <td className="p-3 text-blue-700 dark:text-blue-300 font-bold">* N</td>
                  <td className="p-3 text-amber-700 dark:text-amber-300 font-bold">.repeat(N)</td>
                  <td className="p-3 text-cyan-700 dark:text-cyan-300 font-bold">&quot;Go! &quot; * 3</td>
                  <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">&quot;Go! Go! Go! &quot;</td>
                </tr>
                <tr className="hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-slate-900 dark:text-white font-sans">3. Interpolasi Modern (f-string)</td>
                  <td className="p-3 text-blue-700 dark:text-blue-300 font-bold">f&quot;&#123;var&#125;&quot;</td>
                  <td className="p-3 text-amber-700 dark:text-amber-300 font-bold">`$&#123;var&#125;`</td>
                  <td className="p-3 text-cyan-700 dark:text-cyan-300 font-bold">f&quot;Skor: &#123;100&#125;&quot;</td>
                  <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">&quot;Skor: 100&quot;</td>
                </tr>
                <tr className="hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-slate-900 dark:text-white font-sans">4. Menghitung Panjang String</td>
                  <td className="p-3 text-blue-700 dark:text-blue-300 font-bold">len(teks)</td>
                  <td className="p-3 text-amber-700 dark:text-amber-300 font-bold">teks.length</td>
                  <td className="p-3 text-cyan-700 dark:text-cyan-300 font-bold">len(&quot;Informatika&quot;)</td>
                  <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">11</td>
                </tr>
                <tr className="hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-slate-900 dark:text-white font-sans">5. Karakter Pertama &amp; Terakhir</td>
                  <td className="p-3 text-blue-700 dark:text-blue-300 font-bold">teks[0] / teks[-1]</td>
                  <td className="p-3 text-amber-700 dark:text-amber-300 font-bold">teks[0] / teks.at(-1)</td>
                  <td className="p-3 text-cyan-700 dark:text-cyan-300 font-bold">&quot;ALPRO&quot;[-1]</td>
                  <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">&apos;O&apos;</td>
                </tr>
                <tr className="hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-slate-900 dark:text-white font-sans">6. Konversi Huruf Besar (Uppercase)</td>
                  <td className="p-3 text-blue-700 dark:text-blue-300 font-bold">teks.upper()</td>
                  <td className="p-3 text-amber-700 dark:text-amber-300 font-bold">teks.toUpperCase()</td>
                  <td className="p-3 text-cyan-700 dark:text-cyan-300 font-bold">&quot;alpro&quot;.upper()</td>
                  <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">&quot;ALPRO&quot;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
