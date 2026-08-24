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
  Zap, 
  Layers,
  Code2,
  FileCode
} from 'lucide-react';

export default function TypeCastingLab() {
  const [castInput, setCastInput] = useState<string>("100");
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
    <div className="border border-border/60 rounded-3xl overflow-visible bg-slate-950 shadow-2xl space-y-0">
      
      {/* Header Bar */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between rounded-t-3xl">
        <div className="flex items-center gap-2.5">
          <FlaskConical className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-100">
            Laboratorium Type Casting: Eksperimen &amp; Pembuktian Nyata
          </h3>
        </div>
        <span className="text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 px-3 py-0.5 rounded-full">
          Explicit Casting Lab
        </span>
      </div>

      {/* Main Workspace */}
      <div className="p-4 md:p-6 space-y-6">
        
        {/* 1. Mengapa Konversi Tipe Data Itu Mutlak? (Jebakan Klasik) */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-3">
          <h4 className="text-xs md:text-sm font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Jebakan Klasik Programmer Pemula: Mengapa Kita Butuh Type Casting?
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Semua data masukan dari pengguna lewat papan ketik (keyboard) menggunakan fungsi <code>input()</code> atau <code>prompt()</code> secara *default* akan <strong>selalu terbaca sebagai String (Teks)</strong>!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-1 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.3] sm:hover:scale-[1.4] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-rose-400">
              <span className="text-rose-400 font-bold block font-sans">❌ Tanpa Type Casting (Teks Digabung):</span>
              <div className="text-slate-300">a = &quot;10&quot;</div>
              <div className="text-slate-300">b = &quot;20&quot;</div>
              <div className="text-rose-300 font-bold">a + b &rarr; &quot;1020&quot; (Bukan 30!)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.3] sm:hover:scale-[1.4] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-emerald-400">
              <span className="text-emerald-400 font-bold font-sans">✅ Dengan Type Casting (Penjumlahan Angka):</span>
              <div className="text-slate-300">a = int(&quot;10&quot;)</div>
              <div className="text-slate-300">b = int(&quot;20&quot;)</div>
              <div className="text-emerald-300 font-bold">a + b &rarr; 30 (Penjumlahan Matematis)</div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Type Casting Sandbox */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-inner space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs md:text-sm font-bold text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Uji Coba Konversi Data &amp; Buktikan Perubahan Kelas Tipe:
            </h4>
            <span className="text-[10px] font-mono text-slate-400">Live Casting Sandbox</span>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px]">Coba Kasus:</span>
            <button
              onClick={() => { setCastInput("9.95"); setTargetType('int'); }}
              className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-mono transition-colors cursor-pointer"
            >
              Float 9.95 &rarr; int
            </button>
            <button
              onClick={() => { setCastInput("45"); setTargetType('str'); }}
              className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-mono transition-colors cursor-pointer"
            >
              Angka 45 &rarr; str
            </button>
            <button
              onClick={() => { setCastInput("0"); setTargetType('bool'); }}
              className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-mono transition-colors cursor-pointer"
            >
              Angka 0 &rarr; bool
            </button>
            <button
              onClick={() => { setCastInput("Algoritma"); setTargetType('int'); }}
              className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-rose-400 text-[11px] font-mono transition-colors cursor-pointer"
            >
              Teks &rarr; int (Error)
            </button>
          </div>

          {/* Converter Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Input Box */}
            <div className="md:col-span-5 space-y-1">
              <label className="text-[11px] font-bold text-slate-300 font-mono flex items-center justify-between">
                <span>Nilai Input Asal:</span>
                <span className="text-[10px] text-cyan-400">Tipe: {originType.typeName}</span>
              </label>
              <input 
                type="text"
                value={castInput}
                onChange={(e) => setCastInput(e.target.value)}
                placeholder="misal: 100 atau 3.14"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Target Type Selector */}
            <div className="md:col-span-3 space-y-1">
              <label className="text-[11px] font-bold text-slate-300 font-mono">Dikonversi Ke:</label>
              <select
                value={targetType}
                onChange={(e) => setTargetType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-400 transition-colors cursor-pointer font-bold"
              >
                <option value="int">Integer (int)</option>
                <option value="float">Float (float)</option>
                <option value="str">String (str)</option>
                <option value="bool">Boolean (bool)</option>
              </select>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex md:col-span-1 justify-center pt-4">
              <ArrowRight className="w-5 h-5 text-amber-400" />
            </div>

            {/* Result Box */}
            <div className="md:col-span-3 space-y-1">
              <label className="text-[11px] font-bold text-slate-300 font-mono">Hasil Konversi:</label>
              <div className={`w-full bg-slate-950 border rounded-xl px-3 py-2 text-xs font-mono font-bold flex items-center justify-between ${
                castResult.valid ? 'border-emerald-500/50 text-emerald-400' : 'border-rose-500/50 text-rose-400'
              }`}>
                <span>{castResult.val}</span>
                {castResult.valid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
              </div>
            </div>

          </div>

          {/* 3. Pembuktian Nyata Sebelum vs Sesudah */}
          {castResult.valid && (
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
              <span className="text-[11px] font-bold text-slate-400 font-sans block">
                🔬 Bukti Nyata Perubahan Tipe di Interpreter:
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.35] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-cyan-400">
                  <span className="text-slate-500 block">🐍 Sintaks Python:</span>
                  <div className="text-cyan-400 font-bold">{castResult.pyCode}</div>
                  <div className="text-emerald-400 text-[10px]">type(hasil) &rarr; {castResult.pyClass}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.35] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-amber-400">
                  <span className="text-slate-500 block">🌐 Sintaks JavaScript:</span>
                  <div className="text-amber-400 font-bold">{castResult.jsCode}</div>
                  <div className="text-emerald-400 text-[10px]">typeof hasil &rarr; &quot;{castResult.jsType}&quot;</div>
                </div>
              </div>
            </div>
          )}

          {/* Explanation Note */}
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-amber-300 font-bold block mb-0.5">Analisis Komputer:</strong>
              {castResult.note}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
