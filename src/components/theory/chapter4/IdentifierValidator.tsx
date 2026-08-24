"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  HelpCircle,
  FileCode,
  Terminal
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

export default function IdentifierValidator() {
  const [testIdentifier, setTestIdentifier] = useState('total_belanja');

  // Validate Identifier
  const validate = (name: string) => {
    if (!name) return { isValid: false, reason: 'Identifier tidak boleh kosong', style: 'none' };
    
    // Check space
    if (name.includes(' ')) {
      return { 
        isValid: false, 
        reason: '❌ Mengandung SPASI. Komputer akan menganggap ini sebagai dua kata/instruksi terpisah!', 
        style: 'invalid' 
      };
    }

    // Check hyphen
    if (name.includes('-')) {
      return { 
        isValid: false, 
        reason: '❌ Mengandung tanda hubung (-). Komputer akan mengira ini adalah operasi PENGURANGAN (minus)!', 
        style: 'invalid' 
      };
    }

    // Check leading digit
    if (/^[0-9]/.test(name)) {
      return { 
        isValid: false, 
        reason: '❌ Diawali ANGKA. Identifier WAJIB diawali oleh huruf (a-z, A-Z) atau garis bawah (_).', 
        style: 'invalid' 
      };
    }

    // Check special characters
    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      return { 
        isValid: false, 
        reason: '❌ Mengandung SIMBOL KHUSUS (@, #, $, %, dll). Hanya huruf, angka, dan underscore (_) yang diizinkan.', 
        style: 'invalid' 
      };
    }

    // Check Python Reserved Keywords
    if (PYTHON_KEYWORDS.includes(name)) {
      return { 
        isValid: false, 
        reason: `❌ Merupakan KATA KUNCI SISTEM (Reserved Keyword) di Python ("${name}").`, 
        style: 'keyword' 
      };
    }

    // Check JS Reserved Keywords
    if (JS_KEYWORDS.includes(name)) {
      return { 
        isValid: false, 
        reason: `❌ Merupakan KATA KUNCI SISTEM (Reserved Keyword) di JavaScript ("${name}").`, 
        style: 'keyword' 
      };
    }

    // Check Style Convention
    let styleNote = 'Valid';
    if (/^[A-Z0-9_]+$/.test(name) && name.includes('_')) {
      styleNote = 'UPPER_SNAKE_CASE (Standar Baku Konstanta)';
    } else if (name.includes('_') && /^[a-z0-9_]+$/.test(name)) {
      styleNote = 'snake_case (Konvensi Utama Python / PEP 8)';
    } else if (/^[a-z][a-zA-Z0-9]*$/.test(name) && /[A-Z]/.test(name)) {
      styleNote = 'camelCase (Konvensi Utama JavaScript)';
    } else if (/^[a-z0-9]+$/.test(name)) {
      styleNote = 'Lowercase tunggal (Valid untuk Python & JS)';
    }

    return { 
      isValid: true, 
      reason: `✅ IDENTIFIER VALID! Memenuhi kaidah leksikal komputer. Gaya: ${styleNote}`, 
      style: styleNote 
    };
  };

  const validationResult = validate(testIdentifier.trim());

  return (
    <div className="border border-border/60 rounded-3xl overflow-hidden bg-slate-950 shadow-2xl">
      
      {/* Header Bar */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-100">
            Kaidah &amp; Konvensi Penamaan Identifier (Python &amp; JavaScript)
          </h3>
        </div>
        <span className="text-xs font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-3 py-0.5 rounded-full">
          Identifier Validator
        </span>
      </div>

      {/* Main Workspace */}
      <div className="p-4 md:p-6 space-y-6">
        
        {/* 1. Universal Rules Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Rule 1 & 2 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono">1</span>
              Aturan Baku Bahasa Pemrograman:
            </h4>
            <ul className="text-xs text-slate-300 space-y-2 pl-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Harus diawali <strong>huruf (a-z, A-Z)</strong> atau <strong>underscore (_)</strong>. Tidak boleh angka.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Hanya boleh berisi <strong>alfanumerik &amp; underscore</strong> (tanpa spasi atau simbol @, #, $, %).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Bersifat <strong>Case-Sensitive</strong>: <code>skor</code> &ne; <code>Skor</code> &ne; <code>SKOR</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>Dilarang memakai <strong>Reserved Keywords</strong> (seperti: <code>if</code>, <code>def</code>, <code>class</code>, <code>let</code>).</span>
              </li>
            </ul>
          </div>

          {/* Style Conventions (Python vs JS) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-mono">2</span>
              Konvensi Gaya Bahasa (Style Guide):
            </h4>
            
            <div className="space-y-2 text-xs">
              {/* Python */}
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-blue-400 block">🐍 Python (PEP 8 Standard):</span>
                  <span className="text-slate-400 text-[11px]">Memakai gaya <strong>snake_case</strong></span>
                </div>
                <code className="text-blue-300 font-mono font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  total_harga_diskon
                </code>
              </div>

              {/* JavaScript */}
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-amber-400 block">🌐 JavaScript (ECMAScript):</span>
                  <span className="text-slate-400 text-[11px]">Memakai gaya <strong>camelCase</strong></span>
                </div>
                <code className="text-amber-300 font-mono font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  totalHargaDiskon
                </code>
              </div>

              {/* Constant */}
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-300">🔒 Konstanta (Kedua Bahasa):</span>
                <code className="text-purple-300 font-mono font-bold">
                  MAX_BUFFER_SIZE = 1024
                </code>
              </div>
            </div>
          </div>

        </div>

        {/* 2. Interactive Live Identifier Validator Engine */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 md:p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs md:text-sm font-bold text-emerald-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Uji Coba Langsung: Live Identifier Validator
            </h4>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              Linter Mesin
            </span>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px] font-medium">Coba Contoh Kasus:</span>
            <button
              onClick={() => setTestIdentifier('nama_lengkap')}
              className="px-2 py-0.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-blue-300 text-[11px] font-mono transition-colors cursor-pointer"
            >
              nama_lengkap (Python)
            </button>
            <button
              onClick={() => setTestIdentifier('namaLengkap')}
              className="px-2 py-0.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-amber-300 text-[11px] font-mono transition-colors cursor-pointer"
            >
              namaLengkap (JS)
            </button>
            <button
              onClick={() => setTestIdentifier('1st_winner')}
              className="px-2 py-0.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-rose-400 text-[11px] font-mono transition-colors cursor-pointer"
            >
              1st_winner (Salah)
            </button>
            <button
              onClick={() => setTestIdentifier('total belanja')}
              className="px-2 py-0.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-rose-400 text-[11px] font-mono transition-colors cursor-pointer"
            >
              total belanja (Spasi)
            </button>
            <button
              onClick={() => setTestIdentifier('class')}
              className="px-2 py-0.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-rose-400 text-[11px] font-mono transition-colors cursor-pointer"
            >
              class (Keyword)
            </button>
          </div>

          {/* Live Input Field */}
          <div className="space-y-2">
            <div className="relative">
              <input
                type="text"
                value={testIdentifier}
                onChange={(e) => setTestIdentifier(e.target.value)}
                placeholder="Ketik nama variabel di sini..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm font-mono text-cyan-300 focus:outline-none focus:border-emerald-400 transition-colors pr-10"
              />
              <div className="absolute right-3 top-3.5">
                {validationResult.isValid ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-500" />
                )}
              </div>
            </div>

            {/* Validation Feedback Box */}
            <div className={`p-3.5 rounded-xl border text-xs font-mono flex items-start gap-2.5 transition-all ${
              validationResult.isValid 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              <div className="leading-relaxed">
                {validationResult.reason}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
