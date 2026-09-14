"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GitBranch,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Terminal,
  Code2,
  Layers,
  BookOpen,
  FlaskConical,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import FlowchartSymbolsLab from './chapter6/FlowchartSymbolsLab';
import ConditionMasteryLab from './chapter6/ConditionMasteryLab';
import IfSingleLab from './chapter6/IfSingleLab';
import IfElseLab from './chapter6/IfElseLab';
import CaseStudyLab from './chapter6/CaseStudyLab';
import AnimatedBranchingDefinition from './AnimatedBranchingDefinition';
import AnimatedSingleIfDefinition from './AnimatedSingleIfDefinition';

export default function Pertemuan6() {
  const [isOpen1, setIsOpen1] = useState(true); // Open by default
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  return (
    <div className="space-y-12 overflow-visible">

      {/* ─── Hero Header ─────────────────────────────────────────────────────── */}
      <header className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-sky-500/10 rounded-full mb-4 shadow-inner">
          <GitBranch className="w-10 h-10 text-sky-600 dark:text-sky-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Struktur Percabangan Tunggal &amp; Ganda
        </h1>
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Algoritma bukan sekadar urutan instruksi — ia bisa{' '}
          <strong className="text-slate-900 dark:text-slate-100">memilih jalan</strong>. Pelajari bagaimana
          komputer membuat keputusan logis menggunakan{' '}
          <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-bold">IF</code>{' '}
          dan{' '}
          <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-bold">IF-ELSE</code>{' '}
          melalui empat representasi: Naratif, Flowchart, Pseudocode, dan Kode Program.
        </p>

        {/* 4 Pilar Badge */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {[
            { icon: '📝', label: 'Deskriptif/Naratif', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30' },
            { icon: '🔷', label: 'Flowchart', color: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30' },
            { icon: '📋', label: 'Pseudocode', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30' },
            { icon: '💻', label: 'Kode Program', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30' },
          ].map(item => (
            <span key={item.label} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${item.color}`}>
              {item.icon} {item.label}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-2">
          <Link
            href="/workspace?chapter=6"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
          >
            <Terminal className="w-4 h-4" />
            <span>Buka Interactive Code Studio (Latihan Coding Bab 6)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 1. HAKIKAT PERCABANGAN & SIMBOL FLOWCHART                             */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-sky-500/40 ${isOpen1 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button
          onClick={() => setIsOpen1(!isOpen1)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-sky-600 dark:text-sky-400 mb-2 flex items-center gap-3">
              <GitBranch className="w-8 h-8" />
              1. Hakikat Percabangan &amp; Simbol Flowchart Standar
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Capaian: Memahami mengapa algoritma perlu &quot;memilih jalur&quot;, menguasai 5 simbol flowchart standar, dan memahami anatomi perumusan kondisi yang tepat.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen1 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen1 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-visible"
            >
              <div className="p-6 md:p-8 pt-2 space-y-8 overflow-visible">

                {/* Definisi Akademik — Animasi Interaktif */}
                <AnimatedBranchingDefinition />

                {/* Flowchart Symbols Lab */}
                <FlowchartSymbolsLab />

                {/* Condition Mastery Lab (Anatomi & Operator) */}
                <ConditionMasteryLab />

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 2. PERCABANGAN TUNGGAL (IF)                                           */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-emerald-500/40 ${isOpen2 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button
          onClick={() => setIsOpen2(!isOpen2)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-3">
              <Code2 className="w-8 h-8" />
              2. Percabangan Tunggal — Struktur IF
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Capaian: Memahami, membaca, dan menulis percabangan tunggal dalam 4 representasi: Naratif, Flowchart, Pseudocode standar, dan Kode Python/JavaScript.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen2 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen2 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-visible"
            >
              <div className="p-6 md:p-8 pt-2 space-y-8 overflow-visible">

                {/* Definisi Akademik — Animasi Interaktif Single IF */}
                <AnimatedSingleIfDefinition />

                {/* Anatomi IF */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-emerald-500" />
                    Anatomi Sintaks IF (Pseudocode Standar vs Kode):
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-visible py-3">
                    {[
                      {
                        lang: '📋 Pseudocode Standar',
                        badgeColor: 'text-emerald-300 bg-emerald-950/80 border-emerald-600',
                        borderColor: 'border-emerald-500/50 hover:border-emerald-400',
                        content: (
                          <div className="font-mono text-xs leading-relaxed space-y-1">
                            <div><span className="text-pink-400 font-bold">if</span> <span className="text-amber-300 font-semibold">kondisi</span> <span className="text-pink-400 font-bold">then</span></div>
                            <div className="pl-4 text-emerald-300 font-medium">instruksi_A</div>
                            <div className="pl-4 text-emerald-300 font-medium">instruksi_B</div>
                            <div><span className="text-pink-400 font-bold">endif</span></div>
                          </div>
                        ),
                      },
                      {
                        lang: '🐍 Python',
                        badgeColor: 'text-sky-300 bg-sky-950/80 border-sky-600',
                        borderColor: 'border-sky-500/50 hover:border-sky-400',
                        content: (
                          <div className="font-mono text-xs leading-relaxed space-y-1">
                            <div><span className="text-pink-400 font-bold">if</span> <span className="text-amber-300 font-semibold">kondisi</span><span className="text-slate-300">:</span></div>
                            <div className="pl-4 text-sky-300 font-medium">instruksi_A</div>
                            <div className="pl-4 text-sky-300 font-medium">instruksi_B</div>
                            <div className="text-slate-500 italic text-[11px] pt-1"># indentasi (tanpa endif)</div>
                          </div>
                        ),
                      },
                      {
                        lang: '⚡ JavaScript',
                        badgeColor: 'text-yellow-300 bg-yellow-950/80 border-yellow-600',
                        borderColor: 'border-yellow-500/50 hover:border-yellow-400',
                        content: (
                          <div className="font-mono text-xs leading-relaxed space-y-1">
                            <div><span className="text-pink-400 font-bold">if</span> <span className="text-slate-300">(</span><span className="text-amber-300 font-semibold">kondisi</span><span className="text-slate-300">) &#123;</span></div>
                            <div className="pl-4 text-yellow-300 font-medium">instruksiA();</div>
                            <div className="pl-4 text-yellow-300 font-medium">instruksiB();</div>
                            <div className="text-slate-300">&#125;</div>
                          </div>
                        ),
                      },
                    ].map(item => (
                      <div
                        key={item.lang}
                        className={`rounded-2xl border ${item.borderColor} bg-slate-900 shadow-md overflow-hidden transition-all duration-300 ease-out origin-center relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.3] hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)]`}
                        style={{
                          transform: 'translateZ(0)',
                          textRendering: 'geometricPrecision',
                          WebkitFontSmoothing: 'antialiased',
                        }}
                      >
                        <div className="px-3.5 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                          <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold font-mono border ${item.badgeColor}`}>
                            {item.lang}
                          </span>
                          <div className="flex items-center gap-1.5 opacity-60">
                            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          </div>
                        </div>
                        <div className="p-4 bg-slate-900 text-slate-100 font-mono">
                          {item.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lab */}
                <IfSingleLab />

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 3. PERCABANGAN GANDA (IF-ELSE)                                        */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-amber-500/40 ${isOpen3 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button
          onClick={() => setIsOpen3(!isOpen3)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-3">
              <GitBranch className="w-8 h-8" />
              3. Percabangan Ganda — Struktur IF-ELSE
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Capaian: Membedakan IF tunggal dengan IF-ELSE, memahami bahwa ELSE menjamin selalu ada aksi untuk setiap kasus, dan menguasai 4 representasinya.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen3 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen3 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-visible"
            >
              <div className="p-6 md:p-8 pt-2 space-y-8 overflow-visible">

                {/* Definisi */}
                <div className="p-5 md:p-6 bg-amber-500/10 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-2xl shadow-sm space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.3] transition-all duration-300 ease-out origin-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-amber-400 bg-background/95 dark:bg-slate-950/95">
                  <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
                    <Sparkles className="w-4 h-4" />
                    <span>Definisi Akademik Resmi:</span>
                  </div>
                  <blockquote className="text-sm md:text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    &ldquo;<strong className="text-amber-600 dark:text-amber-300 font-black text-base md:text-lg underline decoration-amber-500/40">Percabangan Ganda (Dual Selection / IF-ELSE)</strong> adalah struktur kontrol yang menyediakan{' '}
                    <strong className="text-emerald-700 dark:text-emerald-300 font-black bg-emerald-500/15 dark:bg-emerald-500/25 px-2 py-0.5 rounded-lg border border-emerald-500/40 inline-block my-0.5">dua jalur aksi yang saling eksklusif</strong>:{' '}
                    jalur pertama (IF/then) dieksekusi saat kondisi True, dan jalur kedua (ELSE) dieksekusi saat kondisi False, sehingga{' '}
                    <strong className="text-cyan-700 dark:text-cyan-300 font-black bg-cyan-500/15 dark:bg-cyan-500/25 px-2 py-0.5 rounded-lg border border-cyan-500/40 inline-block my-0.5">selalu ada tepat satu jalur yang dieksekusi</strong>{' '}
                    tanpa pengecualian.&rdquo;
                  </blockquote>
                </div>

                {/* Anatomi IF-ELSE */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-amber-500" />
                    Anatomi Sintaks IF-ELSE (Pseudocode Standar vs Kode):
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-visible py-3">
                    {[
                      {
                        lang: '📋 Pseudocode Standar',
                        badgeColor: 'text-amber-300 bg-amber-950/80 border-amber-600',
                        borderColor: 'border-amber-500/50 hover:border-amber-400',
                        content: (
                          <div className="font-mono text-xs leading-relaxed space-y-1">
                            <div><span className="text-pink-400 font-bold">if</span> <span className="text-amber-300 font-semibold">kondisi</span> <span className="text-pink-400 font-bold">then</span></div>
                            <div className="pl-4 text-emerald-300 font-medium">instruksi_A  <span className="text-slate-500 text-[11px]">// True</span></div>
                            <div><span className="text-pink-400 font-bold">else</span></div>
                            <div className="pl-4 text-rose-300 font-medium">instruksi_B  <span className="text-slate-500 text-[11px]">// False</span></div>
                            <div><span className="text-pink-400 font-bold">endif</span></div>
                          </div>
                        ),
                      },
                      {
                        lang: '🐍 Python',
                        badgeColor: 'text-sky-300 bg-sky-950/80 border-sky-600',
                        borderColor: 'border-sky-500/50 hover:border-sky-400',
                        content: (
                          <div className="font-mono text-xs leading-relaxed space-y-1">
                            <div><span className="text-pink-400 font-bold">if</span> <span className="text-amber-300 font-semibold">kondisi</span><span className="text-slate-300">:</span></div>
                            <div className="pl-4 text-sky-300 font-medium">instruksi_A</div>
                            <div><span className="text-pink-400 font-bold">else</span><span className="text-slate-300">:</span></div>
                            <div className="pl-4 text-rose-300 font-medium">instruksi_B</div>
                          </div>
                        ),
                      },
                      {
                        lang: '⚡ JavaScript',
                        badgeColor: 'text-yellow-300 bg-yellow-950/80 border-yellow-600',
                        borderColor: 'border-yellow-500/50 hover:border-yellow-400',
                        content: (
                          <div className="font-mono text-xs leading-relaxed space-y-1">
                            <div><span className="text-pink-400 font-bold">if</span> <span className="text-slate-300">(</span><span className="text-amber-300 font-semibold">kondisi</span><span className="text-slate-300">) &#123;</span></div>
                            <div className="pl-4 text-yellow-300 font-medium">instruksiA();</div>
                            <div><span className="text-slate-300">&#125; </span><span className="text-pink-400 font-bold">else</span><span className="text-slate-300"> &#123;</span></div>
                            <div className="pl-4 text-rose-300 font-medium">instruksiB();</div>
                            <div className="text-slate-300">&#125;</div>
                          </div>
                        ),
                      },
                    ].map(item => (
                      <div
                        key={item.lang}
                        className={`rounded-2xl border ${item.borderColor} bg-slate-900 shadow-md overflow-hidden transition-all duration-300 ease-out origin-center relative z-0 hover:z-50 cursor-pointer hover:scale-[1.25] sm:hover:scale-[1.3] hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)]`}
                        style={{
                          transform: 'translateZ(0)',
                          textRendering: 'geometricPrecision',
                          WebkitFontSmoothing: 'antialiased',
                        }}
                      >
                        <div className="px-3.5 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                          <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold font-mono border ${item.badgeColor}`}>
                            {item.lang}
                          </span>
                          <div className="flex items-center gap-1.5 opacity-60">
                            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          </div>
                        </div>
                        <div className="p-4 bg-slate-900 text-slate-100 font-mono">
                          {item.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lab */}
                <IfElseLab />

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 4. STUDI KASUS NYATA TERPADU                                          */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-rose-500/40 ${isOpen4 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button
          onClick={() => setIsOpen4(!isOpen4)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-rose-600 dark:text-rose-400 mb-2 flex items-center gap-3">
              <FlaskConical className="w-8 h-8" />
              4. Studi Kasus Nyata — 4 Representasi Lengkap
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Capaian: Mampu membuat dan membaca semua 4 representasi algoritma (Naratif → Flowchart → Pseudocode → Kode) secara terpadu untuk 3 kasus kehidupan nyata.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen4 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen4 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-visible"
            >
              <div className="p-6 md:p-8 pt-2 space-y-8 overflow-visible">

                {/* Pengingat 4 Pilar */}
                <div className="p-5 bg-rose-500/10 dark:bg-rose-950/30 border-l-4 border-rose-500 rounded-r-2xl shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs uppercase tracking-wider font-mono">
                    <Sparkles className="w-4 h-4" />
                    <span>4 Pilar Representasi Algoritma — Harus Dikuasai Secara Terpadu:</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { no: '1', label: 'Deskriptif / Naratif', desc: 'Bahasa alami, langkah demi langkah', icon: '📝' },
                      { no: '2', label: 'Flowchart', desc: 'Diagram visual dengan simbol standar', icon: '🔷' },
                      { no: '3', label: 'Pseudocode', desc: 'Format baku PROGRAM/KAMUS/ALGORITMA', icon: '📋' },
                      { no: '4', label: 'Kode Program', desc: 'Python & JavaScript yang bisa dieksekusi', icon: '💻' },
                    ].map(item => (
                      <div key={item.no} className="p-3 bg-slate-900 rounded-xl border border-rose-500/20 text-center">
                        <div className="text-xl mb-1">{item.icon}</div>
                        <p className="text-xs font-bold text-rose-300 mb-0.5">{item.label}</p>
                        <p className="text-[10px] text-slate-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lab */}
                <CaseStudyLab />

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 5. CALL-TO-ACTION KE WORKSPACE STUDIO (5 MISI CODING BAB 6)            */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-950/80 via-slate-900 to-indigo-950/80 border-2 border-sky-500/30 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lab Praktikum Mandiri</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white">
              Siap Mengasah Logika Percabangan Anda?
            </h3>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Tuntaskan <strong className="text-sky-300">5 Misi Latihan Coding Bab 6</strong> (Deteksi Demam, Kupon Diskon, Ganjil/Genap, Kelulusan, &amp; Tarik Tunai ATM) di <em>Interactive Code Studio</em> dengan visualisasi Flowchart dan RAM memori live.
            </p>
          </div>

          <Link
            href="/workspace?chapter=6"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-base shadow-xl hover:shadow-sky-500/25 transition-all cursor-pointer hover:scale-105 shrink-0"
          >
            <Terminal className="w-5 h-5" />
            <span>Mulai 5 Misi Coding Bab 6</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
