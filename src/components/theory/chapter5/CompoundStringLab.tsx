"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Type, 
  Sparkles, 
  Plus, 
  Minus, 
  Divide, 
  X, 
  Percent, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  Terminal,
  RefreshCw
} from 'lucide-react';

export default function CompoundStringLab() {
  // State untuk Compound Assignment Simulator
  const [balance, setBalance] = useState(100000);
  const [deltaValue, setDeltaValue] = useState(25000);
  const [compoundOp, setCompoundOp] = useState<'+=' | '-=' | '*=' | '/=' | '%='>('+=');

  // State untuk String Formatting Sandbox
  const [studentName, setStudentName] = useState('Budi Santoso');
  const [score, setScore] = useState(95);
  const [multiplier, setMultiplier] = useState(3);
  const [baseWord, setBaseWord] = useState('Alpro');

  // Evaluasi Compound
  const handleApplyCompound = () => {
    switch (compoundOp) {
      case '+=': setBalance(prev => prev + deltaValue); break;
      case '-=': setBalance(prev => Math.max(0, prev - deltaValue)); break;
      case '*=': setBalance(prev => prev * deltaValue); break;
      case '/=': setBalance(prev => deltaValue !== 0 ? Math.floor(prev / deltaValue) : prev); break;
      case '%=': setBalance(prev => deltaValue !== 0 ? prev % deltaValue : prev); break;
    }
  };

  const handleResetBalance = () => {
    setBalance(100000);
  };

  // Replikasi String (Python style)
  const replicatedText = baseWord.repeat(Math.max(1, Math.min(10, multiplier)));

  return (
    <div className="border border-border/60 rounded-3xl overflow-visible bg-slate-950 shadow-2xl space-y-0">
      
      {/* 1. Header Bar */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 rounded-t-3xl">
        <div className="flex items-center gap-2.5">
          <Type className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-100">
            Laboratorium Compound Assignment &amp; Manipulasi String
          </h3>
        </div>
        <span className="text-xs font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 px-3 py-0.5 rounded-full">
          += • -= • f-string • Interpolasi
        </span>
      </div>

      {/* 2. Main Content */}
      <div className="p-4 md:p-6 space-y-6 overflow-visible">
        
        {/* ========================================================================= */}
        {/* SECTION 1: PENUGASAN GABUNGAN (COMPOUND ASSIGNMENT)                       */}
        {/* ========================================================================= */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-inner space-y-4 overflow-visible">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                1. Operator Penugasan Gabungan (Shortcut Update Nilai)
              </span>
              <h4 className="text-base font-extrabold text-slate-100 mt-0.5">
                Mengapa Menulis <code>saldo += 25000</code> Lebih Bersih dari <code>saldo = saldo + 25000</code>?
              </h4>
            </div>
            <button
              onClick={handleResetBalance}
              className="px-3 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-xl flex items-center gap-1.5 cursor-pointer self-start md:self-center"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Saldo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center overflow-visible">
            
            {/* Interactive Control Panel */}
            <div className="lg:col-span-7 space-y-3 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">Pilih Operator Compound:</label>
                  <select
                    value={compoundOp}
                    onChange={(e) => setCompoundOp(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-cyan-300 font-bold focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="+=">+= (Tambah &amp; Simpan)</option>
                    <option value="-=">-= (Kurang &amp; Simpan)</option>
                    <option value="*=">*= (Kali &amp; Simpan)</option>
                    <option value="/=">/= (Bagi &amp; Simpan)</option>
                    <option value="%=">%= (Mod &amp; Simpan)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">Nilai Pengubah (Delta):</label>
                  <input
                    type="number"
                    value={deltaValue}
                    onChange={(e) => setDeltaValue(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-cyan-300 font-bold focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleApplyCompound}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Eksekusi Instruksi: saldo {compoundOp} {deltaValue}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* RAM Memory State Box */}
            <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 text-center space-y-1 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] sm:hover:scale-[1.3] transition-all duration-300 ease-out origin-center md:origin-right hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-cyan-400">
              <span className="text-[10px] text-slate-500 font-mono block">Lokasi Memori RAM (saldo):</span>
              <div className="text-2xl font-mono font-black text-cyan-300 py-1">
                Rp {balance.toLocaleString('id-ID')}
              </div>
              <span className="text-[10px] text-emerald-400 font-mono block">
                Ekuivalen: <code>saldo = saldo {compoundOp.replace('=', '')} {deltaValue}</code>
              </span>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: MANIPULASI STRING & FORMATTING MODERN                          */}
        {/* ========================================================================= */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-inner space-y-4 overflow-visible">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              2. Manipulasi String &amp; Modern String Interpolation
            </span>
            <h4 className="text-base font-extrabold text-slate-100 mt-0.5">
              Penggabungan Teks (+), Replikasi (*), dan f-string Modern
            </h4>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Input Variables */}
            <div className="lg:col-span-5 space-y-3 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-slate-400 font-bold">Nama Mahasiswa (String):</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-cyan-300 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold">Nilai Ujian (Integer):</label>
                <input
                  type="number"
                  value={score}
                  onChange={(e) => setScore(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">Kata Replikasi:</label>
                  <input
                    type="text"
                    value={baseWord}
                    onChange={(e) => setBaseWord(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-purple-300 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">Pengali (* N):</label>
                  <input
                    type="number"
                    min={1}
                    max={8}
                    value={multiplier}
                    onChange={(e) => setMultiplier(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-purple-300 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Live Syntax Output Representation */}
            <div className="lg:col-span-7 space-y-3 font-mono text-xs overflow-visible">
              
              {/* Python f-string Card */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-blue-500/40 space-y-1 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.15] sm:hover:scale-[1.2] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-blue-400">
                <span className="text-[10px] text-blue-400 font-sans block font-bold">🐍 Python 3 (f-string):</span>
                <div className="text-slate-300">
                  pesan = f&quot;Halo &#123;nama&#125;, nilai kamu adalah &#123;skor&#125;!&quot;
                </div>
                <div className="text-emerald-400 font-bold bg-slate-900 p-2 rounded-lg border border-slate-800 mt-1">
                  &gt; Halo {studentName}, nilai kamu adalah {score}!
                </div>
              </div>

              {/* JS Template Literal Card */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-amber-500/40 space-y-1 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.15] sm:hover:scale-[1.2] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-amber-400">
                <span className="text-[10px] text-amber-400 font-sans block font-bold">🌐 JavaScript (Template Literal):</span>
                <div className="text-slate-300">
                  let pesan = `Halo $&#123;nama&#125;, nilai kamu adalah $&#123;skor&#125;!`;
                </div>
                <div className="text-emerald-400 font-bold bg-slate-900 p-2 rounded-lg border border-slate-800 mt-1">
                  &gt; Halo {studentName}, nilai kamu adalah {score}!
                </div>
              </div>

              {/* Python String Replication Card */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-purple-500/40 space-y-1 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.15] sm:hover:scale-[1.2] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-purple-400">
                <span className="text-[10px] text-purple-400 font-sans block font-bold">🐍 Replikasi Teks Python (&quot;Kata&quot; * N):</span>
                <div className="text-slate-300">
                  sorak = &quot;{baseWord} &quot; * {multiplier}
                </div>
                <div className="text-purple-300 font-bold bg-slate-900 p-2 rounded-lg border border-slate-800 mt-1 truncate">
                  &gt; {replicatedText}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 3. Tabel Kamus Lengkap Compound Assignment & Operasi String */}
        <div className="space-y-4 pt-2">
          {/* Tabel Compound Assignment */}
          <div className="p-4 md:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <RefreshCw className="w-4 h-4" />
              <span>Tabel Kamus Operator Penugasan Gabungan (Compound Assignment):</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-sans">
                    <th className="p-3">Operator Ringkas</th>
                    <th className="p-3">Bentuk Ekuivalen Panjang</th>
                    <th className="p-3">Pseudocode</th>
                    <th className="p-3">Python 3</th>
                    <th className="p-3">JavaScript</th>
                    <th className="p-3">Contoh Perubahan Nilai</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-cyan-300 text-sm">+=</td>
                    <td className="p-3 text-slate-400">x = x + y</td>
                    <td className="p-3 text-purple-300">x = x + y</td>
                    <td className="p-3 text-blue-300">x += y</td>
                    <td className="p-3 text-amber-300">x += y</td>
                    <td className="p-3 text-emerald-400">skor += 10 &rarr; skor bertambah 10</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-cyan-300 text-sm">-=</td>
                    <td className="p-3 text-slate-400">x = x - y</td>
                    <td className="p-3 text-purple-300">x = x - y</td>
                    <td className="p-3 text-blue-300">x -= y</td>
                    <td className="p-3 text-amber-300">x -= y</td>
                    <td className="p-3 text-emerald-400">saldo -= 5000 &rarr; saldo berkurang 5000</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-cyan-300 text-sm">*=</td>
                    <td className="p-3 text-slate-400">x = x * y</td>
                    <td className="p-3 text-purple-300">x = x * y</td>
                    <td className="p-3 text-blue-300">x *= y</td>
                    <td className="p-3 text-amber-300">x *= y</td>
                    <td className="p-3 text-emerald-400">faktor *= 2 &rarr; faktor berlipat ganda</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-cyan-300 text-sm">/=</td>
                    <td className="p-3 text-slate-400">x = x / y</td>
                    <td className="p-3 text-purple-300">x = x / y</td>
                    <td className="p-3 text-blue-300">x /= y</td>
                    <td className="p-3 text-amber-300">x /= y</td>
                    <td className="p-3 text-emerald-400">nilai /= 2 &rarr; nilai dibagi dua (float)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-cyan-300 text-sm">%=</td>
                    <td className="p-3 text-slate-400">x = x % y</td>
                    <td className="p-3 text-purple-300">x = x MOD y</td>
                    <td className="p-3 text-blue-300">x %= y</td>
                    <td className="p-3 text-amber-300">x %= y</td>
                    <td className="p-3 text-emerald-400">sisa %= 10 &rarr; sisa dimodulo 10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabel Operasi Manipulasi String */}
          <div className="p-4 md:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Type className="w-4 h-4" />
              <span>Tabel Kamus Operasi Manipulasi Teks &amp; String Formatting:</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-sans">
                    <th className="p-3">Jenis Operasi</th>
                    <th className="p-3">Python 3</th>
                    <th className="p-3">JavaScript</th>
                    <th className="p-3">Contoh Kode</th>
                    <th className="p-3">Hasil Teks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-white font-sans">1. Penggabungan (Concatenation)</td>
                    <td className="p-3 text-blue-300 font-bold">+</td>
                    <td className="p-3 text-amber-300 font-bold">+</td>
                    <td className="p-3 text-cyan-300">&quot;Halo &quot; + &quot;Dunia&quot;</td>
                    <td className="p-3 font-bold text-emerald-400">&quot;Halo Dunia&quot;</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-white font-sans">2. Replikasi Teks (Repetition)</td>
                    <td className="p-3 text-blue-300 font-bold">*</td>
                    <td className="p-3 text-amber-300 font-bold">.repeat()</td>
                    <td className="p-3 text-cyan-300">&quot;Go! &quot; * 3</td>
                    <td className="p-3 font-bold text-emerald-400">&quot;Go! Go! Go! &quot;</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-white font-sans">3. Interpolasi Modern (f-string / Template)</td>
                    <td className="p-3 text-blue-300 font-bold">f&quot;&#123;var&#125;&quot;</td>
                    <td className="p-3 text-amber-300 font-bold">`$&#123;var&#125;`</td>
                    <td className="p-3 text-cyan-300">f&quot;Skor: &#123;100&#125;&quot;</td>
                    <td className="p-3 font-bold text-emerald-400">&quot;Skor: 100&quot;</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-white font-sans">4. Menghitung Panjang Teks</td>
                    <td className="p-3 text-blue-300 font-bold">len(teks)</td>
                    <td className="p-3 text-amber-300 font-bold">teks.length</td>
                    <td className="p-3 text-cyan-300">len(&quot;Informatika&quot;)</td>
                    <td className="p-3 font-bold text-emerald-400">11</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
