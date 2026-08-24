"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  RotateCw, 
  Sparkles, 
  Clock, 
  Percent, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  Hash,
  Compass
} from 'lucide-react';

export default function ArithmeticModuloLab() {
  // State untuk Simulator Modulo Jam & Siklus
  const [clockTotal, setClockTotal] = useState(15);
  const [modBase, setModBase] = useState(12);

  // State untuk Detik ke Jam/Menit/Detik
  const [inputSeconds, setInputSeconds] = useState(3725);

  // State untuk Tab
  const [activeTab, setActiveTab] = useState<'modulo' | 'hms' | 'division'>('modulo');

  // Perhitungan Modulo Jam
  const modResult = clockTotal % modBase;
  const fullRotations = Math.floor(clockTotal / modBase);

  // Perhitungan Konversi Detik
  const hours = Math.floor(inputSeconds / 3600);
  const remAfterHours = inputSeconds % 3600;
  const minutes = Math.floor(remAfterHours / 60);
  const seconds = remAfterHours % 60;

  // Derajat putaran jarum jam modulo
  const needleAngle = (modResult / modBase) * 360;

  return (
    <div className="border border-border/60 rounded-3xl overflow-visible bg-slate-950 shadow-2xl space-y-0">
      
      {/* 1. Header Bar */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 rounded-t-3xl">
        <div className="flex items-center gap-2.5">
          <Calculator className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-100">
            Laboratorium Aritmatika &amp; Misteri Sisa Bagi (Modulo %)
          </h3>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('modulo')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'modulo' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Roda Jam Modulo</span>
          </button>
          <button
            onClick={() => setActiveTab('division')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'division' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Percent className="w-3.5 h-3.5" />
            <span>/ vs // (Pembagian Bulat)</span>
          </button>
          <button
            onClick={() => setActiveTab('hms')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'hms' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studi Kasus: Detik ke Jam</span>
          </button>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="p-4 md:p-6 space-y-6 overflow-visible">
        
        {/* ========================================================================= */}
        {/* TAB 1: RODA JAM MODULO                                                    */}
        {/* ========================================================================= */}
        {activeTab === 'modulo' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 overflow-visible"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center overflow-visible">
              
              {/* Left Column: Visual Clock / Circle Dial */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-900/90 rounded-2xl border border-amber-500/30 relative shadow-inner">
                <span className="text-xs font-mono font-bold text-amber-400 mb-4 flex items-center gap-1.5">
                  <Compass className="w-4 h-4" />
                  Roda Siklus Modulo (Sisa Bagi)
                </span>

                {/* Circular Clock Graphic */}
                <div className="relative w-48 h-48 rounded-full border-4 border-slate-700 bg-slate-950 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                  
                  {/* Dial Numbers */}
                  {Array.from({ length: modBase }).map((_, idx) => {
                    const angle = (idx / modBase) * 2 * Math.PI - Math.PI / 2;
                    const r = 70; // radius
                    const x = r * Math.cos(angle);
                    const y = r * Math.sin(angle);
                    const isTarget = idx === modResult;

                    return (
                      <div
                        key={idx}
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                        className={`absolute w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                          isTarget 
                            ? 'bg-amber-500 text-slate-950 scale-125 shadow-[0_0_15px_rgba(245,158,11,0.8)] z-20 ring-2 ring-white' 
                            : 'text-slate-400 bg-slate-900 border border-slate-800'
                        }`}
                      >
                        {idx}
                      </div>
                    );
                  })}

                  {/* Rotating Center Needle */}
                  <motion.div 
                    animate={{ rotate: needleAngle }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                    className="absolute w-1 h-20 bg-gradient-to-t from-transparent via-amber-400 to-amber-300 origin-bottom rounded-full"
                    style={{ bottom: '50%' }}
                  />
                  <div className="w-4 h-4 rounded-full bg-amber-400 border-2 border-white z-10" />
                </div>

                <div className="mt-4 text-center">
                  <span className="text-xs text-slate-400">Posisi Jarum Akhir:</span>
                  <div className="text-2xl font-mono font-extrabold text-amber-400">
                    {clockTotal} mod {modBase} = {modResult}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    (Berputar penuh {fullRotations} kali + sisa {modResult} langkah)
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive Sliders & Momen AHA */}
              <div className="lg:col-span-7 space-y-4 overflow-visible">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <h4 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Uji Interaktif: Geser Nilai Total Langkah &amp; Basis Siklus
                  </h4>

                  {/* Slider 1: Total Angka */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400 font-bold">Total Nilai (Dividen / Angka Awal):</span>
                      <span className="text-cyan-400 font-black text-sm">{clockTotal}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={60}
                      value={clockTotal}
                      onChange={(e) => setClockTotal(parseInt(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
                    />
                  </div>

                  {/* Slider 2: Basis Modulo */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400 font-bold">Basis Pembagi Modulo (Divisor / N):</span>
                      <span className="text-amber-400 font-black text-sm">{modBase}</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={24}
                      value={modBase}
                      onChange={(e) => setModBase(parseInt(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
                    />
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
                    <span className="text-[11px] text-slate-400 self-center">Kasus Nyata:</span>
                    <button
                      onClick={() => { setClockTotal(13); setModBase(12); }}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-amber-300 text-[11px] cursor-pointer"
                    >
                      Jam 13.00 &rarr; Jam 1 Siang (% 12)
                    </button>
                    <button
                      onClick={() => { setClockTotal(17); setModBase(2); }}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-emerald-300 text-[11px] cursor-pointer"
                    >
                      Angka 17 &rarr; Ganjil (% 2 == 1)
                    </button>
                    <button
                      onClick={() => { setClockTotal(10); setModBase(7); }}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-blue-300 text-[11px] cursor-pointer"
                    >
                      10 Hari Lagi &rarr; Hari ke-3 (% 7)
                    </button>
                  </div>
                </div>

                {/* AHA Box */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-200 space-y-1.5 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.03] transition-all duration-300 origin-center hover:shadow-xl">
                  <strong className="text-amber-300 font-bold block font-mono text-sm">
                    💡 Momen AHA: Mengapa Modulo (%) Sangat Sakti dalam Algoritma?
                  </strong>
                  <p className="leading-relaxed">
                    Operator Modulo adalah <strong>mesin siklus berulang</strong>. Nilai hasil <code>x % N</code> dijamin <strong>pasti selalu berada di antara 0 sampai N-1</strong>. Sifat inilah yang digunakan di seluruh dunia untuk memutar animasi, mendeteksi giliran pemain dalam game, dan enkripsi kriptografi modern!
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PEMBAGIAN NYATA (/) VS PEMBAGIAN BULAT (//)                        */}
        {/* ========================================================================= */}
        {activeTab === 'division' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 overflow-visible"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-visible">
              
              {/* Card 1: True Division */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-blue-500/40 space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.35] transition-all duration-300 ease-out origin-center md:origin-left hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-blue-400">
                <div className="flex items-center justify-between border-b border-blue-500/30 pb-2">
                  <h4 className="font-extrabold text-blue-400 text-sm">
                    1. True Division ( / )
                  </h4>
                  <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-bold">
                    HASIL FLOAT
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Menghasilkan nilai pecahan desimal lengkap tanpa memotong angka di belakang koma.
                </p>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                  <div className="text-slate-400">7 / 2</div>
                  <div className="text-blue-300 font-black text-lg">&rarr; 3.5</div>
                  <span className="text-[10px] text-slate-500 block">Tipe: &lt;class &apos;float&apos;&gt;</span>
                </div>
              </div>

              {/* Card 2: Floor Division */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-500/40 space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.35] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-purple-400">
                <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
                  <h4 className="font-extrabold text-purple-400 text-sm">
                    2. Floor Division ( // )
                  </h4>
                  <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-bold">
                    PEMBULATAN KE BAWAH
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Memotong angka desimal ke bawah (mengambil hasil bagi bulatnya saja).
                </p>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                  <div className="text-slate-400">7 // 2</div>
                  <div className="text-purple-300 font-black text-lg">&rarr; 3</div>
                  <span className="text-[10px] text-slate-500 block">Tipe: &lt;class &apos;int&apos;&gt; (Koma dibuang)</span>
                </div>
              </div>

              {/* Card 3: Modulo */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/40 space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.35] transition-all duration-300 ease-out origin-center md:origin-right hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-amber-400">
                <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
                  <h4 className="font-extrabold text-amber-400 text-sm">
                    3. Modulo ( % )
                  </h4>
                  <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                    SISA BAGI
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Mengambil sisa angka yang tidak habis terbagi oleh pembagi bulat.
                </p>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                  <div className="text-slate-400">7 % 2</div>
                  <div className="text-amber-300 font-black text-lg">&rarr; 1</div>
                  <span className="text-[10px] text-slate-500 block">Karena (2 * 3) + 1 = 7</span>
                </div>
              </div>

            </div>

            {/* Syntax Comparison in Python & JS */}
            <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl font-mono text-xs space-y-2">
              <span className="text-slate-400 font-bold block font-sans">
                ⚠️ Catatan Perbedaan Bahasa (Python vs JavaScript):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                <div className="p-3 bg-slate-950 rounded-xl border border-blue-500/30">
                  <span className="text-blue-400 font-bold block">🐍 Python:</span>
                  <div>Mendukung operator <code className="text-amber-300 font-bold">//</code> secara native:</div>
                  <div className="text-cyan-300 font-bold mt-1">hasil = 7 // 2  # Hasil: 3</div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/30">
                  <span className="text-amber-400 font-bold block">🌐 JavaScript:</span>
                  <div>Tidak ada operator <code>//</code> (dianggap komentar). Harus memakai <code>Math.floor()</code>:</div>
                  <div className="text-cyan-300 font-bold mt-1">let hasil = Math.floor(7 / 2); // Hasil: 3</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: STUDI KASUS KONVERSI DETIK KE JAM/MENIT/DETIK                      */}
        {/* ========================================================================= */}
        {activeTab === 'hms' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 overflow-visible"
          >
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-inner space-y-6">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                  Kombinasi Sempurna Floor Division (//) &amp; Modulo (%)
                </span>
                <h4 className="text-base md:text-lg font-extrabold text-slate-100 mt-1">
                  Studi Kasus: Mengurai Total Detik Menjadi Format Jam : Menit : Detik
                </h4>
              </div>

              {/* Interactive Input Seconds */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center font-mono">
                <div className="md:col-span-6 space-y-1">
                  <label className="text-xs font-bold text-slate-300">Masukkan Total Detik:</label>
                  <input
                    type="number"
                    value={inputSeconds}
                    onChange={(e) => setInputSeconds(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-base text-cyan-300 font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="md:col-span-6 flex flex-wrap gap-2">
                  <span className="text-slate-400 text-xs self-center w-full">Coba Preset:</span>
                  <button
                    onClick={() => setInputSeconds(3725)}
                    className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs text-amber-300 cursor-pointer hover:bg-slate-800"
                  >
                    3725 detik (1 jam 2 mnt 5 dtk)
                  </button>
                  <button
                    onClick={() => setInputSeconds(7322)}
                    className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs text-emerald-300 cursor-pointer hover:bg-slate-800"
                  >
                    7322 detik (2 jam 2 mnt 2 dtk)
                  </button>
                </div>
              </div>

              {/* Step-by-Step Mathematical Decomposition Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-visible">
                
                {/* Step 1: Jam */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/40 space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.35] transition-all duration-300 ease-out origin-center md:origin-left hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-blue-400">
                  <span className="text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded uppercase">
                    Langkah 1: Hitung Jam
                  </span>
                  <div className="text-xs font-mono text-slate-300">
                    jam = {inputSeconds} // 3600
                  </div>
                  <div className="text-2xl font-mono font-extrabold text-blue-400 py-1">
                    {hours} Jam
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Sisa detik setelah diambil jam: <code>{inputSeconds} % 3600 = {remAfterHours}</code> detik.
                  </p>
                </div>

                {/* Step 2: Menit */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.35] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-purple-400">
                  <span className="text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded uppercase">
                    Langkah 2: Hitung Menit
                  </span>
                  <div className="text-xs font-mono text-slate-300">
                    menit = {remAfterHours} // 60
                  </div>
                  <div className="text-2xl font-mono font-extrabold text-purple-400 py-1">
                    {minutes} Menit
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Sisa detik setelah diambil menit: <code>{remAfterHours} % 60 = {seconds}</code> detik.
                  </p>
                </div>

                {/* Step 3: Detik */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.35] transition-all duration-300 ease-out origin-center md:origin-right hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-emerald-400">
                  <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded uppercase">
                    Langkah 3: Sisa Detik
                  </span>
                  <div className="text-xs font-mono text-slate-300">
                    detik = {remAfterHours} % 60
                  </div>
                  <div className="text-2xl font-mono font-extrabold text-emerald-400 py-1">
                    {seconds} Detik
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Format Akhir: <code>{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</code>
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* 4. Tabel Kamus Lengkap Operator Aritmatika */}
        <div className="p-4 md:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Calculator className="w-4 h-4" />
            <span>Tabel Kamus Lengkap 7 Operator Aritmatika (Python, JS &amp; Pseudocode):</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-sans">
                  <th className="p-3">Simbol</th>
                  <th className="p-3">Nama Operasi</th>
                  <th className="p-3">Pseudocode</th>
                  <th className="p-3">Python 3</th>
                  <th className="p-3">JavaScript</th>
                  <th className="p-3">Contoh Hitung</th>
                  <th className="p-3">Hasil &amp; Tipe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-amber-300 text-sm">+</td>
                  <td className="p-3 font-sans font-bold text-white">Penjumlahan</td>
                  <td className="p-3 text-purple-300">a + b</td>
                  <td className="p-3 text-blue-300">a + b</td>
                  <td className="p-3 text-amber-300">a + b</td>
                  <td className="p-3 text-cyan-300">10 + 5</td>
                  <td className="p-3 font-bold text-emerald-400">15 (int)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-amber-300 text-sm">-</td>
                  <td className="p-3 font-sans font-bold text-white">Pengurangan</td>
                  <td className="p-3 text-purple-300">a - b</td>
                  <td className="p-3 text-blue-300">a - b</td>
                  <td className="p-3 text-amber-300">a - b</td>
                  <td className="p-3 text-cyan-300">10 - 4</td>
                  <td className="p-3 font-bold text-emerald-400">6 (int)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-amber-300 text-sm">*</td>
                  <td className="p-3 font-sans font-bold text-white">Perkalian</td>
                  <td className="p-3 text-purple-300">a * b</td>
                  <td className="p-3 text-blue-300">a * b</td>
                  <td className="p-3 text-amber-300">a * b</td>
                  <td className="p-3 text-cyan-300">6 * 7</td>
                  <td className="p-3 font-bold text-emerald-400">42 (int)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-blue-400 text-sm">/</td>
                  <td className="p-3 font-sans font-bold text-white">True Division (Bagi Nyata)</td>
                  <td className="p-3 text-purple-300">a / b</td>
                  <td className="p-3 text-blue-300">a / b</td>
                  <td className="p-3 text-amber-300">a / b</td>
                  <td className="p-3 text-cyan-300">7 / 2</td>
                  <td className="p-3 font-bold text-blue-300">3.5 (float)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-purple-400 text-sm">//</td>
                  <td className="p-3 font-sans font-bold text-white">Floor Division (Bagi Bulat)</td>
                  <td className="p-3 text-purple-300">a DIV b</td>
                  <td className="p-3 text-blue-300">a // b</td>
                  <td className="p-3 text-amber-300">Math.floor(a / b)</td>
                  <td className="p-3 text-cyan-300">7 // 2</td>
                  <td className="p-3 font-bold text-purple-300">3 (int)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-amber-400 text-sm">%</td>
                  <td className="p-3 font-sans font-bold text-white">Modulo (Sisa Bagi)</td>
                  <td className="p-3 text-purple-300">a MOD b</td>
                  <td className="p-3 text-blue-300">a % b</td>
                  <td className="p-3 text-amber-300">a % b</td>
                  <td className="p-3 text-cyan-300">7 % 2</td>
                  <td className="p-3 font-bold text-amber-300">1 (int)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-rose-400 text-sm">**</td>
                  <td className="p-3 font-sans font-bold text-white">Pemangkatan (Eksponen)</td>
                  <td className="p-3 text-purple-300">a ^ b</td>
                  <td className="p-3 text-blue-300">a ** b</td>
                  <td className="p-3 text-amber-300">a ** b / Math.pow(a,b)</td>
                  <td className="p-3 text-cyan-300">2 ** 3</td>
                  <td className="p-3 font-bold text-rose-300">8 (int)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
