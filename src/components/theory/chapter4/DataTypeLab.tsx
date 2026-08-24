"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Binary, 
  Hash, 
  Quote, 
  ToggleLeft, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle,
  CheckCircle2,
  Code2,
  FlaskConical,
  HelpCircle
} from 'lucide-react';

export default function DataTypeLab() {
  const [activeTypeTab, setActiveTypeTab] = useState<'int' | 'float' | 'str' | 'bool'>('int');

  // Type Casting Sandbox States
  const [castInput, setCastInput] = useState<string>("100");
  const [targetType, setTargetType] = useState<'int' | 'float' | 'str' | 'bool'>('int');

  const typesData = [
    {
      id: 'int' as const,
      name: 'Integer (Bilangan Bulat)',
      symbol: 'int',
      icon: Hash,
      color: 'text-blue-400',
      badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
      desc: 'Menyimpan bilangan bulat positif, negatif, atau nol tanpa pecahan desimal.',
      size: '4 atau 8 Byte (32/64 bit)',
      examples: ['42', '-15', '0', '2026'],
      pyEx: 'umur = 20',
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
      desc: 'Menyimpan bilangan pecahan atau desimal dengan tanda titik (titik desimal).',
      size: '8 Byte (64-bit IEEE 754)',
      examples: ['3.14', '-0.05', '98.5', '2.0'],
      pyEx: 'ipk = 3.85',
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
      size: 'Dinamis (1 Byte per char ASCII / UTF-8)',
      examples: ['"Algoritma"', '"A"', '"12345"', '""'],
      pyEx: 'nama = "Budi Hartono"',
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
      desc: 'Tipe data biner yang hanya memiliki dua kemungkinan nilai: Benar (True) atau Salah (False).',
      size: '1 Byte (8-bit flag)',
      examples: ['True', 'False'],
      pyEx: 'is_lulus = True',
      jsEx: 'let isLulus = true;',
      pseudoEx: 'is_lulus : boolean'
    },
  ];

  // Perform Real-time Type Casting Calculation
  const performCast = () => {
    const raw = castInput.trim();
    try {
      if (targetType === 'int') {
        const num = parseFloat(raw);
        if (isNaN(num)) return { val: 'NaN / ValueError', valid: false, note: 'Teks tidak valid sebagai bilangan bulat!' };
        const truncated = Math.trunc(num);
        return { 
          val: `${truncated}`, 
          valid: true, 
          note: num % 1 !== 0 ? `Desimal dipotong (*Truncated*) dari ${num} menjadi ${truncated}` : 'Berhasil dikonversi ke Integer' 
        };
      }
      if (targetType === 'float') {
        const num = parseFloat(raw);
        if (isNaN(num)) return { val: 'NaN / ValueError', valid: false, note: 'Teks tidak valid sebagai desimal!' };
        return { 
          val: num % 1 === 0 ? `${num}.0` : `${num}`, 
          valid: true, 
          note: 'Berhasil dikonversi ke Float desimal' 
        };
      }
      if (targetType === 'str') {
        return { val: `"${raw}"`, valid: true, note: 'Data dibungkus tanda petik menjadi tipe String' };
      }
      if (targetType === 'bool') {
        if (raw === '0' || raw.toLowerCase() === 'false' || raw === '') {
          return { val: 'False', valid: true, note: 'Nilai 0 atau teks kosong menghasilkan Boolean False' };
        }
        return { val: 'True', valid: true, note: 'Nilai terisi atau bukan nol menghasilkan Boolean True' };
      }
    } catch {
      return { val: 'Error', valid: false, note: 'Konversi gagal' };
    }
    return { val: raw, valid: true, note: '' };
  };

  const castResult = performCast();
  const currentType = typesData.find(t => t.id === activeTypeTab)!;

  return (
    <div className="border border-border/60 rounded-3xl overflow-hidden bg-slate-950 shadow-2xl">
      
      {/* Header Bar */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <FlaskConical className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-100">
            Laboratorium Taksonomi Tipe Data &amp; Type Casting
          </h3>
        </div>
        <span className="text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 px-3 py-0.5 rounded-full">
          Primitif &amp; Konversi
        </span>
      </div>

      {/* Main Workspace */}
      <div className="p-4 md:p-6 space-y-6">
        
        {/* 1. Tipe Data Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {typesData.map((type) => {
            const Icon = type.icon;
            const isActive = activeTypeTab === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setActiveTypeTab(type.id)}
                className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                  isActive 
                    ? 'border-amber-400 bg-slate-900 shadow-md ring-1 ring-amber-400' 
                    : 'border-slate-800 bg-slate-950 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`p-1.5 rounded-xl ${type.badge}`}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                    {type.symbol}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-200 block truncate">
                  {type.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  {type.name.split('(')[1]?.replace(')', '') || ''}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. Active Type Detail Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-inner space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className={`text-base font-extrabold flex items-center gap-2 ${currentType.color}`}>
                {currentType.name}
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">{currentType.desc}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-400">
                Ukuran RAM: <strong className="text-slate-200">{currentType.size}</strong>
              </span>
            </div>
          </div>

          {/* Syntax Code Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1">
              <span className="text-[10px] text-slate-500 font-sans block font-bold">📄 Format Pseudocode:</span>
              <div className="text-purple-300 font-bold">{currentType.pseudoEx}</div>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1">
              <span className="text-[10px] text-slate-500 font-sans block font-bold">🐍 Sintaks Python 3:</span>
              <div className="text-blue-300 font-bold">{currentType.pyEx}</div>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1">
              <span className="text-[10px] text-slate-500 font-sans block font-bold">🌐 Sintaks JavaScript:</span>
              <div className="text-amber-300 font-bold">{currentType.jsEx}</div>
            </div>
          </div>
        </div>

        {/* 3. Interactive Type Casting Experimenter Sandbox */}
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 md:p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs md:text-sm font-bold text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Eksperimen Interaktif Type Casting (Konversi Tipe Data)
            </h4>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              Live Converter
            </span>
          </div>

          {/* Preset Buttons for Quick Aha Moments */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px] font-medium">Uji Kasus Populer:</span>
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
              onClick={() => { setCastInput("Belajar"); setTargetType('int'); }}
              className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-mono transition-colors cursor-pointer"
            >
              Teks &quot;Belajar&quot; &rarr; int (Error)
            </button>
          </div>

          {/* Converter Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Input Box */}
            <div className="md:col-span-5 space-y-1">
              <label className="text-[11px] font-bold text-slate-300 font-mono">Nilai Input Asal:</label>
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

          {/* Explanation Banner */}
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
