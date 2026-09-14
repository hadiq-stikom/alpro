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
  GitFork,
  HelpCircle,
  AlertTriangle,
  Check,
  Scale
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import MultiBranchGradeLab from './chapter7/MultiBranchGradeLab';
import NestedDonorLab from './chapter7/NestedDonorLab';
import LogicalOperatorBranchingLab from './chapter7/LogicalOperatorBranchingLab';
import SwitchMatchLab from './chapter7/SwitchMatchLab';
import CaseStudyNestedLab from './chapter7/CaseStudyNestedLab';
import AnimatedMultiBranchDefinition from './AnimatedMultiBranchDefinition';
import AnimatedNestedIfDefinition from './AnimatedNestedIfDefinition';

export default function Pertemuan7() {
  const [isOpen1, setIsOpen1] = useState(true); // Terbuka secara default
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);

  return (
    <div className="space-y-12 overflow-visible">
      {/* ─── Hero Header ─────────────────────────────────────────────────────── */}
      <header className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-orange-500/10 rounded-full mb-4 shadow-inner">
          <GitFork className="w-10 h-10 text-orange-600 dark:text-orange-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Percabangan Majemuk &amp; Bersarang
        </h1>
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Dunia nyata jarang sesederhana &quot;Hitam atau Putih&quot;. Pelajari bagaimana membangun{' '}
          <strong className="text-slate-900 dark:text-slate-100">keputusan bertingkat</strong> menggunakan{' '}
          <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-bold">IF - ELIF - ELSE</code>,{' '}
          <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-bold">Nested IF</code>, dan{' '}
          <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-bold">match/switch</code>{' '}
          melalui 4 representasi baku yang terpadu dan interaktif.
        </p>

        {/* 4 Pilar Badge */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {[
            { icon: '📝', label: 'Naratif Blok Sejajar', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30' },
            { icon: '🔷', label: 'Flowchart Cascading ANSI', color: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30' },
            { icon: '📋', label: 'Pseudocode CLRS 3 Blok', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30' },
            { icon: '💻', label: 'Kode Python (elif) & JS (else if)', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30' },
          ].map(item => (
            <span key={item.label} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${item.color}`}>
              {item.icon} {item.label}
            </span>
          ))}
        </div>

        {/* CTA ke Workspace Chapter 7 */}
        <div className="pt-2">
          <Link
            href="/workspace?chapter=7"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
          >
            <Terminal className="w-4 h-4" />
            <span>Buka Interactive Code Studio (Latihan Coding Bab 7)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 1. HAKIKAT PERCABANGAN MAJEMUK (IF - ELIF - ELSE)                     */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-orange-500/40 ${isOpen1 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button
          onClick={() => setIsOpen1(!isOpen1)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2 flex items-center gap-3">
              <GitFork className="w-8 h-8" />
              1. Hakikat Percabangan Majemuk &amp; Urutan Evaluasi (Order of Evaluation)
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Capaian: Memahami kapan skenario percabangan majemuk dibutuhkan, memahami mekanisme evaluasi sekuensial (short-circuit), dan menghindari jebakan logika urutan terbalik.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen1 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen1 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 border-t border-border/60 space-y-8 overflow-visible"
            >
              {/* Teori Fondasi — Definisi Akademik & Animasi Interaktif */}
              <div className="space-y-6 leading-relaxed text-slate-700 dark:text-slate-300 overflow-visible">
                <AnimatedMultiBranchDefinition />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl border border-sky-500/30 bg-sky-500/5">
                    <strong className="text-sky-600 dark:text-sky-400 block mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Prinsip Evaluasi Sekuensial:
                    </strong>
                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      Komputer memeriksa kondisi dari atas ke bawah secara urut. Begitu ditemukan kondisi pertama yang bernilai <strong>True</strong>, blok perintah tersebut dieksekusi, dan komputer langsung <strong>melompat keluar (short-circuit)</strong> melewati seluruh blok <code className="font-mono">elif</code> dan <code className="font-mono">else</code> di bawahnya.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5">
                    <strong className="text-rose-600 dark:text-rose-400 block mb-1.5 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Bahaya Urutan Evaluasi (Order Hazard):
                    </strong>
                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      Urutan pengujian kondisi <strong>wajib disusun dari yang paling spesifik / ketat ke yang paling umum / longgar</strong>. Jika Anda menguji kondisi longgar di atas (misal <code className="font-mono font-bold">nilai &gt;= 40</code> diuji sebelum <code className="font-mono font-bold">nilai &gt;= 85</code>), maka nilai 95 akan keliru divonis mendapat Grade D!
                    </p>
                  </div>
                </div>
              </div>

              {/* Lab 1 Embed */}
              <div>
                <MultiBranchGradeLab />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 2. PERCABANGAN BERSARANG (NESTED IF) — POHON KEPUTUSAN               */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-orange-500/40 ${isOpen2 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button
          onClick={() => setIsOpen2(!isOpen2)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2 flex items-center gap-3">
              <Layers className="w-8 h-8" />
              2. Percabangan Bersarang (Nested IF) — Keputusan di Dalam Keputusan
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Capaian: Memahami konsep gerbang prasyarat (gatekeeper), hierarki pohon keputusan logis, serta penulisan indentasi bersarang yang bebas ambiguitas.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen2 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen2 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 border-t border-border/60 space-y-8 overflow-visible"
            >
              <div className="space-y-6 leading-relaxed text-slate-700 dark:text-slate-300 overflow-visible">
                <AnimatedNestedIfDefinition />
              </div>

              {/* Lab 2 Embed */}
              <div>
                <NestedDonorLab />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 3. KONDISI MAJEMUK DENGAN OPERATOR LOGIKA (AND, OR) & ANALISIS USE CASE */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-orange-500/40 ${isOpen3 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button
          onClick={() => setIsOpen3(!isOpen3)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2 flex items-center gap-3">
              <Scale className="w-8 h-8" />
              3. Kondisi Majemuk dengan Operator Logika (AND, OR) &amp; Analisis Kritis Use Case
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Capaian: Memahami penggabungan kondisi logika boolean, evaluasi short-circuit, serta membedakan secara kritis kapan harus memakai Operator Logika vs kapan mutlak wajib menggunakan Nested IF.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen3 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen3 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 border-t border-border/60 space-y-8"
            >
              <div className="space-y-4 leading-relaxed text-slate-700 dark:text-slate-300">
                <p>
                  Seringkali sebuah keputusan algoritma tidak hanya bergantung pada satu variabel tunggal, melainkan gabungan dari beberapa syarat sekaligus. Dalam pemrograman, kita dapat menggabungkan beberapa ekspresi relasional menggunakan <strong>Operator Logika Boolean</strong>:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2 text-xs">
                  <div className="p-3.5 rounded-xl border border-sky-500/30 bg-sky-500/5">
                    <span className="font-bold text-sky-600 dark:text-sky-400 block mb-1">Operator Konjungsi (AND / &amp;&amp;)</span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Bernilai <strong>TRUE</strong> hanya jika <em>seluruh</em> kondisi yang digabungkan terpenuhi sekaligus. Bila ada satu saja kondisi bernilai FALSE, hasil langsung FALSE (Short-Circuit).
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-purple-500/30 bg-purple-500/5">
                    <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">Operator Disjungsi (OR / ||)</span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Bernilai <strong>TRUE</strong> jika <em>minimal salah satu</em> dari kondisi terpenuhi. Jika operand pertama sudah TRUE, operand berikutnya tidak perlu dievaluasi (Short-Circuit).
                    </p>
                  </div>
                </div>
                <p className="text-sm">
                  <strong>Peringatan Arsitektural Pemrograman:</strong> Pemula kerap menyamakan operator logika dengan percabangan bersarang (Nested IF). Di bawah ini disajikan laboratorium interaktif khusus untuk membedah komparasi langsung, kelemahan &quot;Blindspot Diagnostik&quot; operator AND, evaluasi Short-Circuit, serta pedoman arsitektur kapan harus memilih salah satunya.
                </p>
              </div>

              {/* Lab Operator Logika Embed */}
              <div>
                <LogicalOperatorBranchingLab />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 4. STRUKTUR PEMILIHAN NILAI DISKRIT (SWITCH & MATCH CASE)             */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-orange-500/40 ${isOpen4 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button
          onClick={() => setIsOpen4(!isOpen4)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2 flex items-center gap-3">
              <Code2 className="w-8 h-8" />
              4. Pemilihan Nilai Diskrit (switch-case &amp; match-case)
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Capaian: Menguasai konstruksi alternatif untuk pencocokan nilai pasti diskrit, memahami fitur Pattern Matching Python 3.10+, dan mengantisipasi bahaya fall-through pada JavaScript.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen4 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen4 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 border-t border-border/60 space-y-8"
            >
              <div className="space-y-4 leading-relaxed text-slate-700 dark:text-slate-300">
                <p>
                  Ketika kita ingin menguji sebuah variabel terhadap sejumlah <strong>nilai konstan pasti</strong> (misal angka menu 1, 2, 3, 4 atau nama hari &quot;SENIN&quot;, &quot;SELASA&quot;), tumpukan kode <code className="font-mono font-bold">if / elif / elif ...</code> seringkali tampak berulang-ulang dan kurang efisien dibaca.
                </p>
                <p>
                  Bahasa pemrograman modern menyediakan struktur khusus:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  <li><strong>JavaScript:</strong> Struktur klasik <code className="font-mono font-bold">switch (variabel) &#123; case nilai: ... break; &#125;</code>.</li>
                  <li><strong>Python 3.10+:</strong> Fitur mutakhir Structural Pattern Matching dengan sintaks <code className="font-mono font-bold">match variabel: case nilai: ... case _: ...</code>.</li>
                </ul>
              </div>

              {/* Lab 4 Embed (Switch Match) */}
              <div>
                <SwitchMatchLab />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 5. STUDI KASUS NYATA TERPADU (KASIR RESTORAN)                         */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-orange-500/40 ${isOpen5 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button
          onClick={() => setIsOpen5(!isOpen5)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2 flex items-center gap-3">
              <FlaskConical className="w-8 h-8" />
              5. Studi Kasus Nyata Terpadu — Sistem Kasir Restoran Nusantara
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Capaian: Mengintegrasikan multi-way selection dan nested IF dalam satu kasus komersial nyata, diverifikasi melalui 4 representasi baku tersinkronisasi.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen5 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen5 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 border-t border-border/60 space-y-8"
            >
              <div className="space-y-4 leading-relaxed text-slate-700 dark:text-slate-300">
                <p>
                  Di industri ritel dan restoran modern, skema diskon selalu menggabungkan berbagai dimensi: tingkat keanggotaan (Membership Tier), ambang batas nilai transaksi (Minimum Spending Threshold), serta hari promosi khusus (Promotional Event / Weekend).
                </p>
                <p>
                  Laboratorium di bawah ini memperlihatkan bagaimana perpaduan antara <strong>Multi-Way Selection</strong> dan <strong>Nested IF</strong> diwujudkan ke dalam 4 representasi baku algoritma secara serasi dan konsisten.
                </p>
              </div>

              {/* Lab 5 Embed (Kasir) */}
              <div>
                <CaseStudyNestedLab />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Penutup & Ajakan Praktikum ────────────────────────────────────────── */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-background border border-orange-500/20 text-center space-y-4 shadow-sm">
        <h3 className="text-2xl font-bold text-foreground">
          Siap Menguji Kemampuan Analisis Percabangan Anda?
        </h3>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Setelah mendalami materi interaktif di atas, selesaikan latihan coding terpandu di <strong>Interactive Code Studio Bab 7</strong> serta selesaikan Kuis dan Ujian Esai Bertingkat di bawah ini untuk meraih lencana keahlian Anda!
        </p>
        <div className="pt-2">
          <Link
            href="/workspace?chapter=7"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-105"
          >
            <Terminal className="w-4 h-4" />
            <span>Mulai Praktikum Coding Bab 7 di Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
