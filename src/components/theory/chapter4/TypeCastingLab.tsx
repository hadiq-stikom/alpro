"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  FlaskConical, 
  HelpCircle,
  Binary,
  Filter,
  Code2,
  XCircle
} from 'lucide-react';

export default function TypeCastingLab() {
  const [castInput, setCastInput] = useState<string>("9.95");
  const [targetType, setTargetType] = useState<'int' | 'float' | 'str' | 'bool'>('int');

  // Detect origin type
  const detectOriginType = (raw: string) => {
    const trimmed = raw.trim();
    if (/^-?\d+$/.test(trimmed)) return { typeName: 'Integer (int)', pyClass: "<class 'int'>", jsType: 'number' };
    if (/^-?\d+\.\d+$/.test(trimmed)) return { typeName: 'Float (float)', pyClass: "<class 'float'>", jsType: 'number' };
    if (trimmed === 'True' || trimmed === 'False') return { typeName: 'Boolean (bool)', pyClass: "<class 'bool'>", jsType: 'boolean' };
    return { typeName: 'String (str)', pyClass: "<class 'str'>", jsType: 'string' };
  };

  const originType = detectOriginType(castInput);

  // Perform Real-time Type Casting Calculation
  const performCast = () => {
    const raw = castInput.trim();
    try {
      if (targetType === 'int') {
        const num = parseFloat(raw);
        if (isNaN(num)) {
          return { 
            val: 'ValueError / NaN', 
            valid: false, 
            pyCode: `int("${raw}") -> Error`, 
            jsCode: `Number("${raw}") -> NaN`,
            note: 'Teks tidak mengandung angka yang valid untuk diubah ke bilangan bulat!' 
          };
        }
        const truncated = Math.trunc(num);
        return { 
          val: `${truncated}`, 
          valid: true, 
          pyClass: "<class 'int'>",
          jsType: 'number',
          pyCode: `int("${raw}") -> ${truncated}`, 
          jsCode: `parseInt("${raw}") -> ${truncated}`,
          note: num % 1 !== 0 
            ? `Desimal dipotong (*Truncated*) dari ${num} menjadi ${truncated}. (Bukan dibulatkan, melainkan bagian komanya langsung dibuang).` 
            : 'Berhasil dikonversi secara eksplisit ke Integer.' 
        };
      }
      if (targetType === 'float') {
        const num = parseFloat(raw);
        if (isNaN(num)) {
          return { 
            val: 'ValueError / NaN', 
            valid: false, 
            pyCode: `float("${raw}") -> Error`, 
            jsCode: `parseFloat("${raw}") -> NaN`,
            note: 'Teks tidak valid sebagai bilangan desimal!' 
          };
        }
        const valStr = num % 1 === 0 ? `${num}.0` : `${num}`;
        return { 
          val: valStr, 
          valid: true, 
          pyClass: "<class 'float'>",
          jsType: 'number',
          pyCode: `float("${raw}") -> ${valStr}`, 
          jsCode: `parseFloat("${raw}") -> ${num}`,
          note: 'Berhasil dikonversi ke Float desimal dengan presisi titik pecahan.' 
        };
      }
      if (targetType === 'str') {
        return { 
          val: `"${raw}"`, 
          valid: true, 
          pyClass: "<class 'str'>",
          jsType: 'string',
          pyCode: `str(${raw}) -> "${raw}"`, 
          jsCode: `String(${raw}) -> "${raw}"`,
          note: 'Nilai dibungkus tanda petik menjadi untaian karakter (String).' 
        };
      }
      if (targetType === 'bool') {
        if (raw === '0' || raw.toLowerCase() === 'false' || raw === '') {
          return { 
            val: 'False', 
            valid: true, 
            pyClass: "<class 'bool'>",
            jsType: 'boolean',
            pyCode: `bool("${raw}") -> False`, 
            jsCode: `Boolean("${raw}") -> false`,
            note: 'Nilai 0, teks kosong, atau kondisi salah menghasilkan Boolean False (Falsy).' 
          };
        }
        return { 
          val: 'True', 
          valid: true, 
          pyClass: "<class 'bool'>",
          jsType: 'boolean',
          pyCode: `bool("${raw}") -> True`, 
          jsCode: `Boolean("${raw}") -> true`,
          note: 'Nilai yang memiliki isi atau bukan angka 0 menghasilkan Boolean True (Truthy).' 
        };
      }
    } catch {
      return { val: 'Error', valid: false, pyCode: '', jsCode: '', note: 'Konversi gagal.' };
    }
    return { val: raw, valid: true, pyCode: '', jsCode: '', note: '' };
  };

  const castResult = performCast();

  return (
    <div className="border border-border/80 dark:border-slate-800 rounded-3xl overflow-visible bg-card dark:bg-slate-950 shadow-xl space-y-0">
      
      {/* Header Bar */}
      <div className="p-4 md:px-6 bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between rounded-t-3xl">
        <div className="flex items-center gap-2.5">
          <FlaskConical className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-900 dark:text-slate-100">
            Laboratorium Type Casting: Eksperimen &amp; Pembuktian Nyata
          </h3>
        </div>
        <span className="text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 px-3 py-1 rounded-full shadow-xs">
          Explicit Casting Lab
        </span>
      </div>

      {/* Main Workspace */}
      <div className="p-4 md:p-6 space-y-6">
        
        {/* 1. Mengapa Konversi Tipe Data Itu Mutlak? (Jebakan Klasik) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/20 border-2 border-amber-500/30 space-y-3 shadow-xs">
          <h4 className="text-sm sm:text-base font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            Jebakan Klasik Programmer Pemula: Mengapa Kita Butuh Type Casting?
          </h4>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            Semua data masukan dari pengguna lewat papan ketik (keyboard) menggunakan fungsi <code>input()</code> atau <code>prompt()</code> secara *default* akan <strong>selalu terbaca sebagai String (Teks)</strong>!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm font-mono pt-1">
            <div className="p-4 rounded-xl bg-card dark:bg-slate-900 border-2 border-rose-300 dark:border-rose-500/40 space-y-1.5 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-rose-500 shadow-sm">
              <span className="text-rose-700 dark:text-rose-400 font-bold block font-sans text-xs sm:text-sm">❌ Tanpa Type Casting (Teks Digabung):</span>
              <div className="text-slate-700 dark:text-slate-300 font-bold">a = &quot;10&quot;</div>
              <div className="text-slate-700 dark:text-slate-300 font-bold">b = &quot;20&quot;</div>
              <div className="text-rose-700 dark:text-rose-400 font-black text-sm sm:text-base pt-1">a + b &rarr; &quot;1020&quot; (Bukan 30!)</div>
            </div>

            <div className="p-4 rounded-xl bg-card dark:bg-slate-900 border-2 border-emerald-300 dark:border-emerald-500/40 space-y-1.5 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-emerald-500 shadow-sm">
              <span className="text-emerald-700 dark:text-emerald-400 font-bold block font-sans text-xs sm:text-sm">✅ Dengan Type Casting (Penjumlahan Angka):</span>
              <div className="text-slate-700 dark:text-slate-300 font-bold">a = int(&quot;10&quot;)</div>
              <div className="text-slate-700 dark:text-slate-300 font-bold">b = int(&quot;20&quot;)</div>
              <div className="text-emerald-700 dark:text-emerald-300 font-black text-sm sm:text-base pt-1">a + b &rarr; 30 (Penjumlahan Matematis)</div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Type Casting Sandbox */}
        <div className="bg-slate-50 dark:bg-slate-900/90 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 gap-2">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              Uji Coba Konversi Data &amp; Buktikan Perubahan Kelas Tipe:
            </h4>
            <span className="text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-lg">
              Live Casting Sandbox
            </span>
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold font-sans">Coba Kasus Cepat:</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">(Klik untuk mengisi otomatis)</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => { setCastInput("9.95"); setTargetType('int'); }}
                className={`px-3.5 py-1.5 rounded-xl border-2 text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 ${
                  castInput === '9.95' && targetType === 'int'
                    ? 'border-amber-500 bg-amber-500/15 text-amber-900 dark:text-amber-200 ring-2 ring-amber-500/30'
                    : 'border-amber-300/80 dark:border-amber-500/30 bg-white dark:bg-slate-950 text-amber-800 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                }`}
              >
                Float 9.95 &rarr; int
              </button>

              <button
                onClick={() => { setCastInput("45"); setTargetType('str'); }}
                className={`px-3.5 py-1.5 rounded-xl border-2 text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 ${
                  castInput === '45' && targetType === 'str'
                    ? 'border-emerald-500 bg-emerald-500/15 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/30'
                    : 'border-emerald-300/80 dark:border-emerald-500/30 bg-white dark:bg-slate-950 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                }`}
              >
                Angka 45 &rarr; str
              </button>

              <button
                onClick={() => { setCastInput("0"); setTargetType('bool'); }}
                className={`px-3.5 py-1.5 rounded-xl border-2 text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 ${
                  castInput === '0' && targetType === 'bool'
                    ? 'border-purple-500 bg-purple-500/15 text-purple-900 dark:text-purple-200 ring-2 ring-purple-500/30'
                    : 'border-purple-300/80 dark:border-purple-500/30 bg-white dark:bg-slate-950 text-purple-800 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/30'
                }`}
              >
                Angka 0 &rarr; bool
              </button>

              <button
                onClick={() => { setCastInput("Algoritma"); setTargetType('int'); }}
                className={`px-3.5 py-1.5 rounded-xl border-2 text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 ${
                  castInput === 'Algoritma' && targetType === 'int'
                    ? 'border-rose-500 bg-rose-500/15 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/30'
                    : 'border-rose-300/80 dark:border-rose-500/30 bg-white dark:bg-slate-950 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                }`}
              >
                Teks &rarr; int (Error)
              </button>
            </div>
          </div>

          {/* 3-Stage Interactive Conversion Pipeline */}
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-3 sm:gap-4 items-center">
            
            {/* Step 1: Input Box */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-2xl p-4 space-y-2.5 shadow-sm">
              <div className="flex items-center justify-between gap-1 border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 font-sans">
                  <Binary className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  1. Nilai Input Asal:
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800 shadow-2xs">
                  {originType.typeName}
                </span>
              </div>

              <input 
                type="text"
                value={castInput}
                onChange={(e) => setCastInput(e.target.value)}
                placeholder="misal: 100 atau 3.14"
                className="w-full h-12 px-3.5 text-base sm:text-lg font-mono font-black text-cyan-900 dark:text-cyan-200 bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all shadow-inner"
              />

              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">
                Terbaca keyboard sebagai string teks
              </span>
            </div>

            {/* Connector Arrow 1 */}
            <div className="lg:col-span-1 flex justify-center py-1 lg:py-0">
              <div className="w-9 h-9 rounded-full bg-amber-500/15 border-2 border-amber-500/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            {/* Step 2: Target Type Selector */}
            <div className="lg:col-span-3 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-2xl p-4 space-y-2.5 shadow-sm">
              <div className="flex items-center justify-between gap-1 border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 font-sans">
                  <Filter className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  2. Dikonversi Ke:
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 shadow-2xs">
                  {targetType}(x)
                </span>
              </div>

              <select
                value={targetType}
                onChange={(e) => setTargetType(e.target.value as any)}
                className="w-full h-12 px-3.5 text-sm sm:text-base font-mono font-bold text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 transition-all cursor-pointer shadow-inner"
              >
                <option value="int">Integer (int)</option>
                <option value="float">Float (float)</option>
                <option value="str">String (str)</option>
                <option value="bool">Boolean (bool)</option>
              </select>

              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">
                Pemanggilan fungsi eksplisit casting
              </span>
            </div>

            {/* Connector Arrow 2 */}
            <div className="lg:col-span-1 flex justify-center py-1 lg:py-0">
              <div className="w-9 h-9 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            {/* Step 3: Result Box */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-2xl p-4 space-y-2.5 shadow-sm">
              <div className="flex items-center justify-between gap-1 border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 font-sans">
                  3. Hasil:
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold border shadow-2xs ${
                  castResult.valid 
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800' 
                    : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                }`}>
                  {castResult.valid ? 'VALID' : 'ERROR'}
                </span>
              </div>

              <div className={`h-12 px-3.5 rounded-xl border-2 flex items-center justify-between shadow-inner ${
                castResult.valid 
                  ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300' 
                  : 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300'
              }`}>
                <span className="text-base sm:text-lg font-mono font-black truncate">{castResult.val}</span>
                {castResult.valid ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 ml-1" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 ml-1" />
                )}
              </div>

              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">
                {castResult.valid ? 'Kelas memori berubah' : 'Eksekusi gagal'}
              </span>
            </div>

          </div>

          {/* 3. Pembuktian Nyata Sebelum vs Sesudah */}
          {castResult.valid && (
            <div className="p-4 sm:p-5 bg-card dark:bg-slate-950 rounded-2xl border-2 border-border/80 space-y-3 shadow-xs">
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 font-sans flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Bukti Nyata Perubahan Tipe di Interpreter:
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm font-mono">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-cyan-500 space-y-1">
                  <span className="text-slate-600 dark:text-slate-400 block font-sans font-bold text-xs">🐍 Sintaks Python 3:</span>
                  <div className="text-cyan-800 dark:text-cyan-300 font-black text-sm sm:text-base">{castResult.pyCode}</div>
                  <div className="text-emerald-700 dark:text-emerald-400 text-xs font-bold pt-0.5">type(hasil) &rarr; {castResult.pyClass}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-amber-500 space-y-1">
                  <span className="text-slate-600 dark:text-slate-400 block font-sans font-bold text-xs">🌐 Sintaks JavaScript:</span>
                  <div className="text-amber-800 dark:text-amber-300 font-black text-sm sm:text-base">{castResult.jsCode}</div>
                  <div className="text-emerald-700 dark:text-emerald-400 text-xs font-bold pt-0.5">typeof hasil &rarr; &quot;{castResult.jsType}&quot;</div>
                </div>
              </div>
            </div>
          )}

          {/* Explanation Note */}
          <div className="p-3.5 sm:p-4 bg-card dark:bg-slate-950/80 rounded-2xl border-2 border-border/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-start gap-3 shadow-xs">
            <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed font-medium">
              <strong className="text-amber-900 dark:text-amber-300 font-bold block mb-1">Analisis Komputer:</strong>
              {castResult.note}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
