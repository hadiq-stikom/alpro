"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Database, 
  Cpu, 
  FlaskConical, 
  ShieldCheck, 
  Lock, 
  Terminal, 
  ChevronDown, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Box,
  Brain,
  Code2,
  RefreshCw,
  RotateCw,
  ArrowRight,
  Zap,
  Tag,
  KeyRound
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import VariableAndIdentifierIntro from './chapter4/VariableAndIdentifierIntro';
import DataTypeTaxonomyAndEditor from './chapter4/DataTypeTaxonomyAndEditor';
import TypeCastingLab from './chapter4/TypeCastingLab';
import ConstantVsVariable from './chapter4/ConstantVsVariable';
import IOBridgeVisualizer from './chapter4/IOBridgeVisualizer';

interface DefinitionFlipCardProps {
  title: string;
  theme: 'cyan' | 'amber' | 'emerald' | 'purple';
  icon: React.ComponentType<{ className?: string }>;
  definition: React.ReactNode;
  backTitle: string;
  backContent: React.ReactNode;
}

function DefinitionFlipCard({
  title,
  theme,
  icon: Icon,
  definition,
  backTitle,
  backContent,
}: DefinitionFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const themeConfig = {
    cyan: {
      border: 'border-cyan-500/50 dark:border-cyan-500/60',
      title: 'text-cyan-800 dark:text-cyan-300',
      badge: 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-900 dark:text-cyan-200 border-cyan-300 dark:border-cyan-800',
      shadow: 'hover:shadow-[0_25px_60px_rgba(6,182,212,0.25)]',
      accentBg: 'bg-cyan-500/10 dark:bg-cyan-950/30',
    },
    amber: {
      border: 'border-amber-500/50 dark:border-amber-500/60',
      title: 'text-amber-800 dark:text-amber-300',
      badge: 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800',
      shadow: 'hover:shadow-[0_25px_60px_rgba(245,158,11,0.25)]',
      accentBg: 'bg-amber-500/10 dark:bg-amber-950/30',
    },
    emerald: {
      border: 'border-emerald-500/50 dark:border-emerald-500/60',
      title: 'text-emerald-800 dark:text-emerald-300',
      badge: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800',
      shadow: 'hover:shadow-[0_25px_60px_rgba(16,185,129,0.25)]',
      accentBg: 'bg-emerald-500/10 dark:bg-emerald-950/30',
    },
    purple: {
      border: 'border-purple-500/50 dark:border-purple-500/60',
      title: 'text-purple-800 dark:text-purple-300',
      badge: 'bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-800',
      shadow: 'hover:shadow-[0_25px_60px_rgba(168,85,247,0.25)]',
      accentBg: 'bg-purple-500/10 dark:bg-purple-950/30',
    },
  }[theme];

  return (
    <div className="w-full relative z-0 hover:z-50 overflow-visible py-2">
      <AnimatePresence mode="wait" initial={false}>
        {!isFlipped ? (
          <motion.div
            key="front"
            initial={{ rotateY: -75, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 75, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            onClick={() => setIsFlipped(true)}
            className={`w-full min-h-[245px] cursor-pointer transition-transform duration-300 ease-out origin-center hover:scale-[1.2] hover:-translate-y-2 p-5 md:p-6 rounded-3xl border-2 ${themeConfig.border} bg-card dark:bg-slate-950 shadow-md ${themeConfig.shadow} flex flex-col justify-between space-y-4`}
          >
            {/* Header Muka */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div className={`flex items-center gap-2 ${themeConfig.title} font-extrabold text-xs uppercase tracking-wider font-mono`}>
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Definisi Akademik Resmi: {title}</span>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${themeConfig.badge} border shadow-xs animate-pulse`}>
                <RotateCw className="w-3.5 h-3.5" />
                <span>Klik untuk Pembedahan Konkret &rarr;</span>
              </div>
            </div>

            {/* Isi Definisi */}
            <div className="flex-1 flex items-center py-1">
              <blockquote className="text-sm md:text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                {definition}
              </blockquote>
            </div>

            {/* Footer Petunjuk */}
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center justify-between border-t border-border/40 pt-2">
              <span className="font-semibold">💡 Klik kartu untuk membalik &amp; melihat pembedahan memori / sintaks</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Sisi Depan</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ rotateY: 75, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -75, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            onClick={() => setIsFlipped(false)}
            className={`w-full min-h-[245px] cursor-pointer transition-transform duration-300 ease-out origin-center hover:scale-[1.2] hover:-translate-y-2 p-5 md:p-6 rounded-3xl border-2 ${themeConfig.border} bg-slate-50 dark:bg-slate-900 shadow-md ${themeConfig.shadow} flex flex-col justify-between space-y-4`}
          >
            {/* Header Balik */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div className={`flex items-center gap-2 ${themeConfig.title} font-bold text-xs uppercase tracking-wider font-mono`}>
                <Icon className="w-4 h-4 shrink-0" />
                <span>Pembedahan Konsep: {backTitle}</span>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${themeConfig.badge} border shadow-xs`}>
                <RotateCw className="w-3.5 h-3.5" />
                <span>&larr; Kembali ke Definisi</span>
              </div>
            </div>

            {/* Isi Pembedahan */}
            <div className="flex-1 py-1">
              {backContent}
            </div>

            {/* Footer Balik */}
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center justify-between border-t border-border/40 pt-2">
              <span>Sisi Balik Kartu: Konkretisasi Teori ke Arsitektur Nyata</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Sisi Balik</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Pertemuan4() {
  const [isOpen1, setIsOpen1] = useState(false); // Closed by default
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);

  return (
    <div className="space-y-12 overflow-visible">
      
      {/* Hero Header */}
      <header className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-cyan-500/10 rounded-full mb-4 shadow-inner">
          <Database className="w-10 h-10 text-cyan-600 dark:text-cyan-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Tipe Data, Variabel &amp; I/O Dasar
        </h1>
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Fondasi utama pengelolaan data dan memori komputer. Memahami bagaimana data mentah diberi label (<strong className="text-slate-900 dark:text-slate-100">Variabel</strong>), diatur tipe datanya, dikonversi, dan dialirkan melalui proses Masukan/Keluaran (I/O).
        </p>

        {/* CTA Direct to Workspace Studio */}
        <div className="pt-2">
          <Link
            href="/workspace?chapter=4"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
          >
            <Terminal className="w-4 h-4" />
            <span>Buka Interactive Code Studio (Workspace Bab 4)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 1. PENGENALAN VARIABEL & KONVENSI PENAMAAN                                 */}
      {/* ========================================================================= */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-cyan-500/40 ${isOpen1 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button 
          onClick={() => setIsOpen1(!isOpen1)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2 flex items-center gap-3">
              <Cpu className="w-8 h-8" />
              1. Pengenalan Variabel &amp; Konvensi Penamaan (Identifier)
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Capaian: Memahami hakikat variabel sebagai wadah bernama di RAM serta aturan baku penamaannya (Python &amp; JS).</span>
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
                
                {/* 1. Definisi Akademik Formal dengan 2-Sided Flip Card */}
                <DefinitionFlipCard
                  title="Variabel (Variable)"
                  theme="cyan"
                  icon={Cpu}
                  definition={
                    <span>
                      &ldquo;<strong className="text-cyan-700 dark:text-cyan-300 font-black text-base md:text-lg underline decoration-cyan-500/40">Variabel</strong> adalah suatu <strong className="text-emerald-700 dark:text-emerald-300 font-black bg-emerald-500/15 dark:bg-emerald-500/25 px-2 py-0.5 rounded-lg border border-emerald-500/40 inline-block my-0.5">pengenal bernama (identifier)</strong> yang dialokasikan pada <strong className="text-purple-700 dark:text-purple-300 font-black bg-purple-500/15 dark:bg-purple-500/25 px-2 py-0.5 rounded-lg border border-purple-500/40 inline-block my-0.5">lokasi memori utama (RAM)</strong> komputer untuk menyimpan suatu <strong className="text-amber-700 dark:text-amber-300 font-black bg-amber-500/15 dark:bg-amber-500/25 px-2 py-0.5 rounded-lg border border-amber-500/40 inline-block my-0.5">nilai data sementara</strong>, di mana nilai tersebut dapat diakses, dimanipulasi, dan diubah (bersifat <strong className="text-rose-600 dark:text-rose-400 font-black bg-rose-500/15 dark:bg-rose-500/25 px-2 py-0.5 rounded-lg border border-rose-500/40 inline-block my-0.5">mutable</strong>) sepanjang siklus hidup program.&rdquo;
                    </span>
                  }
                  backTitle="3 Unsur Pembentuk Variabel di Arsitektur Komputer"
                  backContent={
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                      <div className="p-3.5 rounded-2xl bg-card border-2 border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
                        <span className="font-black text-cyan-700 dark:text-cyan-300 block font-mono">1. Nama (Identifier)</span>
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">Label logis manusia (misal: <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold">total_skor</code>) untuk mempermudah pemanggilan tanpa menghafal angka biner.</p>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-card border-2 border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
                        <span className="font-black text-purple-700 dark:text-purple-300 block font-mono">2. Alamat Fisik RAM</span>
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">Lokasi heksadesimal nyata di chip RAM (misal: <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold">0x7FFE0</code>) yang dipesan khusus untuk wadah data.</p>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-card border-2 border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
                        <span className="font-black text-emerald-700 dark:text-emerald-300 block font-mono">3. Nilai (Mutable Value)</span>
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">Isi data di dalam wadah yang nilainya bebas ditimpa/diperbarui berkali-kali sepanjang runtime program.</p>
                      </div>
                    </div>
                  }
                />

                {/* 2. Mengapa Variabel Begitu Penting? (Momen Kesadaran) */}
                <div className="space-y-3 text-slate-800 dark:text-slate-200 text-sm md:text-base leading-relaxed">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    Mengapa Program Mustahil Hidup Tanpa Variabel?
                  </h3>
                  <p>
                    Bayangkan jika Anda diminta berbelanja di pasar, namun Anda tidak diizinkan membawa keranjang belanja dan tidak boleh mencatat total harga. Setiap kali Anda melihat barang baru, Anda seketika lupa barang apa yang baru saja Anda beli sebelumnya!
                  </p>
                  <p>
                    Itulah yang terjadi pada komputer <strong>tanpa variabel</strong>. Komputer akan mengalami &ldquo;amnesia seketika&rdquo;. Tanpa variabel, program tidak akan pernah bisa:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
                    <li>Mengingat siapa pengguna yang sedang <em>login</em>.</li>
                    <li>Menyimpan skor permainan yang terus bertambah.</li>
                    <li>Menjumlahkan total belanja dari kasir.</li>
                    <li>Menampung input dari papan ketik untuk diproses lebih lanjut.</li>
                  </ul>
                </div>

                {/* 3. Tiga Analogi Dunia Nyata */}
                <div className="space-y-4 overflow-visible">
                  <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Box className="w-5 h-5 text-amber-500" />
                    3 Analogi Intuitif di Kehidupan Nyata:
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-visible py-2">
                    
                    {/* Analogi 1 (Kiri) */}
                    <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-sm space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center sm:origin-left hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-cyan-500/50">
                      <div className="text-2xl">📦</div>
                      <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-slate-100">
                        1. Kotak Kardus Berlabel
                      </h4>
                      <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        Label di luar kardus adalah <strong>Nama Variabel</strong> (misal: <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">sepatu</code>). Barang di dalam kardus adalah <strong>Nilai Data</strong>. Anda bebas mengganti isinya tanpa perlu mengganti kardusnya.
                      </p>
                    </div>

                    {/* Analogi 2 (Tengah) */}
                    <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-sm space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-amber-500/50">
                      <div className="text-2xl">🔢</div>
                      <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-slate-100">
                        2. Papan Skor Pertandingan
                      </h4>
                      <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        Tulisan &ldquo;SKOR&rdquo; di papan adalah <strong>Identifier</strong>. Angka pada papan dimulai dari 0, lalu berubah menjadi 1, 2, dst. Tempatnya tetap sama, namun nilainya dinamis seiring jalannya pertandingan.
                      </p>
                    </div>

                    {/* Analogi 3 (Kanan) */}
                    <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-sm space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center sm:origin-right hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-purple-500/50">
                      <div className="text-2xl">🏷️</div>
                      <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-slate-100">
                        3. Loker Penitipan Barang
                      </h4>
                      <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        Nomor pintu loker (misal: <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">#42</code>) adalah <strong>Alamat Fisik RAM</strong> (<code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">0x7FFE0</code>). Label nama Anda yang ditempel di loker adalah <strong>Variabel</strong> yang memudahkan Anda menemukan loker tersebut.
                      </p>
                    </div>

                  </div>
                </div>

                {/* 4. Kaidah & Konvensi Penamaan (Python snake_case vs JS camelCase) - DUAL-MODE ADAPTIVE */}
                <div className="space-y-3 text-slate-800 dark:text-slate-200 text-sm md:text-base leading-relaxed overflow-visible">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    Kaidah Leksikal &amp; Konvensi Gaya Penamaan Identifier
                  </h3>
                  <p>
                    Setiap bahasa pemrograman memiliki aturan ketat mengenai karakter apa saja yang boleh digunakan untuk menamai variabel. Melanggar aturan ini akan menyebabkan <strong className="text-rose-600 dark:text-rose-400">SyntaxError</strong>:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm overflow-visible py-2">
                    {/* Left Card: 4 Aturan Kompiler */}
                    <div className="p-5 rounded-2xl bg-card dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-2.5 text-slate-800 dark:text-slate-200 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center md:origin-left hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-cyan-500/50 shadow-sm">
                      <strong className="text-cyan-700 dark:text-cyan-400 font-black block text-sm sm:text-base">4 Aturan Wajib Kompiler:</strong>
                      <ul className="space-y-1.5 pl-4 list-disc text-xs sm:text-sm font-medium leading-relaxed">
                        <li>Wajib diawali oleh huruf (a-z, A-Z) atau garis bawah (_).</li>
                        <li>Dilarang diawali angka (misal: <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold font-mono">1st_winner</code> ❌).</li>
                        <li>Dilarang menggunakan spasi atau tanda minus (<code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold font-mono">total-harga</code> ❌).</li>
                        <li>Dilarang memakai kata kunci sistem / reserved keyword (<code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold font-mono">class</code>, <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold font-mono">if</code> ❌).</li>
                      </ul>
                    </div>

                    {/* Right Card: Gaya Industri */}
                    <div className="p-5 rounded-2xl bg-card dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-2.5 text-slate-800 dark:text-slate-200 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center md:origin-right hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-amber-500/50 shadow-sm">
                      <strong className="text-amber-700 dark:text-amber-400 font-black block text-sm sm:text-base">Konvensi Gaya Industri:</strong>
                      <ul className="space-y-1.5 pl-4 list-disc text-xs sm:text-sm font-medium leading-relaxed">
                        <li>🐍 <strong>Python (PEP 8):</strong> Menggunakan <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-black font-mono">snake_case</code> (contoh: <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold font-mono">total_belanja</code>).</li>
                        <li>🌐 <strong>JavaScript:</strong> Menggunakan <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-black font-mono">camelCase</code> (contoh: <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold font-mono">totalBelanja</code>).</li>
                        <li>🔒 <strong>Konstanta:</strong> Menggunakan <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-black font-mono">UPPER_SNAKE_CASE</code> (contoh: <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold font-mono">MAX_BUFFER</code>).</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 5. Simulator Interaktif Wadah Bernama + Live Validator */}
                <div className="pt-2 overflow-visible">
                  <div className="mb-3 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider font-mono">
                    Eksperimen Interaktif Alokasi Wadah &amp; Validator:
                  </div>
                  <VariableAndIdentifierIntro />
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* 2. TIPE DATA: DIKW, TAKSONOMI & LIVE CODE INSPECTOR                        */}
      {/* ========================================================================= */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-amber-500/40 ${isOpen2 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button 
          onClick={() => setIsOpen2(!isOpen2)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-3">
              <FlaskConical className="w-8 h-8" />
              2. Tipe Data: Konsep DIKW, Taksonomi &amp; Live Code Inspector
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Capaian: Memahami alur Data &rarr; Informasi &rarr; Pengetahuan, taksonomi tipe data, serta praktek inspeksi tipe kelas data.</span>
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
              <div className="p-6 md:p-8 pt-2 space-y-6 overflow-visible">
                
                {/* Definisi Akademik Tipe Data dengan Flip Card */}
                <DefinitionFlipCard
                  title="Tipe Data (Data Type)"
                  theme="amber"
                  icon={FlaskConical}
                  definition={
                    <span>
                      &ldquo;<strong className="text-amber-700 dark:text-amber-300 font-black text-base md:text-lg underline decoration-amber-500/40">Tipe Data</strong> adalah suatu <strong className="text-cyan-700 dark:text-cyan-300 font-black bg-cyan-500/15 dark:bg-cyan-500/25 px-2 py-0.5 rounded-lg border border-cyan-500/40 inline-block my-0.5">klasifikasi atribut nilai</strong> yang memberitahu sistem komputer mengenai <strong className="text-purple-700 dark:text-purple-300 font-black bg-purple-500/15 dark:bg-purple-500/25 px-2 py-0.5 rounded-lg border border-purple-500/40 inline-block my-0.5">alokasi ukuran byte di RAM</strong>, rentang nilai yang sah, serta <strong className="text-emerald-700 dark:text-emerald-300 font-black bg-emerald-500/15 dark:bg-emerald-500/25 px-2 py-0.5 rounded-lg border border-emerald-500/40 inline-block my-0.5">himpunan operasi matematis/logika</strong> yang diizinkan untuk dilakukan terhadap nilai tersebut.&rdquo;
                    </span>
                  }
                  backTitle="4 Tipe Data Primitif Pokok &amp; Alokasi Byte RAM"
                  backContent={
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs sm:text-sm">
                      <div className="p-3 rounded-2xl bg-card border-2 border-slate-200 dark:border-slate-800 text-center space-y-1.5 shadow-2xs">
                        <span className="font-black text-blue-700 dark:text-blue-400 font-mono block">Integer (int)</span>
                        <span className="text-xs bg-blue-500/15 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full font-mono font-bold border border-blue-500/30">4/8 Byte</span>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">Bilangan bulat: 42, -15, 0</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-card border-2 border-slate-200 dark:border-slate-800 text-center space-y-1.5 shadow-2xs">
                        <span className="font-black text-amber-700 dark:text-amber-400 font-mono block">Float (Real)</span>
                        <span className="text-xs bg-amber-500/15 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full font-mono font-bold border border-amber-500/30">8 Byte IEEE</span>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">Pecahan: 3.14, 98.5</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-card border-2 border-slate-200 dark:border-slate-800 text-center space-y-1.5 shadow-2xs">
                        <span className="font-black text-emerald-700 dark:text-emerald-400 font-mono block">String (str)</span>
                        <span className="text-xs bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-mono font-bold border border-emerald-500/30">1 Byte / Char</span>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">Teks: &quot;Alpro&quot;</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-card border-2 border-slate-200 dark:border-slate-800 text-center space-y-1.5 shadow-2xs">
                        <span className="font-black text-purple-700 dark:text-purple-400 font-mono block">Boolean (bool)</span>
                        <span className="text-xs bg-purple-500/15 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded-full font-mono font-bold border border-purple-500/30">1 Byte Flag</span>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">Logika: True / False</p>
                      </div>
                    </div>
                  }
                />

                <div className="text-slate-800 dark:text-slate-200 text-sm md:text-base leading-relaxed space-y-3">
                  <p>
                    Jika <strong>Variabel</strong> adalah wadahnya, maka <strong>Tipe Data</strong> adalah sifat dan jenis barang yang dimasukkan ke dalam wadah tersebut. Tipe data memberitahu komputer <strong>berapa byte RAM yang harus dipesan</strong> dan <strong>operasi apa saja yang sah dilakukan</strong> pada nilai tersebut.
                  </p>
                </div>

                {/* Interactive Taxonomy, DIKW & Code Inspector */}
                <DataTypeTaxonomyAndEditor />

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* 3. KONVERSI TIPE DATA (TYPE CASTING) & PEMBUKTIAN                          */}
      {/* ========================================================================= */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-emerald-500/40 ${isOpen3 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button 
          onClick={() => setIsOpen3(!isOpen3)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-3">
              <RefreshCw className="w-8 h-8" />
              3. Konversi Tipe Data (Type Casting) &amp; Pembuktiannya
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Capaian: Memahami urgensi konversi tipe data, menghindari jebakan input string, dan membuktikan perubahan kelas tipe data.</span>
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
              <div className="p-6 md:p-8 pt-2 space-y-6 overflow-visible">
                
                {/* Definisi Akademik Type Casting dengan Flip Card */}
                <DefinitionFlipCard
                  title="Type Casting (Konversi Tipe Data)"
                  theme="emerald"
                  icon={RefreshCw}
                  definition={
                    <span>
                      &ldquo;<strong className="text-emerald-700 dark:text-emerald-300 font-black text-base md:text-lg underline decoration-emerald-500/40">Type Casting</strong> (Konversi Tipe Data) adalah suatu proses komputasi eksplisit atau implisit untuk <strong className="text-cyan-700 dark:text-cyan-300 font-black bg-cyan-500/15 dark:bg-cyan-500/25 px-2 py-0.5 rounded-lg border border-cyan-500/40 inline-block my-0.5">mengubah representasi nilai data</strong> dari satu tipe kelas (misal: <code>String</code>) menjadi tipe kelas lain (misal: <code>Integer</code> atau <code>Float</code>) agar dapat diproses oleh <strong className="text-amber-700 dark:text-amber-300 font-black bg-amber-500/15 dark:bg-amber-500/25 px-2 py-0.5 rounded-lg border border-amber-500/40 inline-block my-0.5">operasi logika/aritmatika yang sesuai</strong>.&rdquo;
                    </span>
                  }
                  backTitle="Dua Jalur Konversi: Implisit (Otomatis) vs Eksplisit (Manual)"
                  backContent={
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                      <div className="p-3.5 rounded-2xl bg-card border-2 border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
                        <strong className="text-cyan-700 dark:text-cyan-300 block font-mono font-black text-sm">1. Implicit Casting (Otomatis)</strong>
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">Dilakukan kompiler tanpa kehilangan presisi (pelebaran tipe): <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold font-mono">5 + 2.5 &rarr; 7.5 (Float)</code>.</p>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-card border-2 border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
                        <strong className="text-emerald-700 dark:text-emerald-300 block font-mono font-black text-sm">2. Explicit Casting (Manual)</strong>
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">Dipaksa oleh programmer menggunakan fungsi: <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold font-mono">int(&quot;100&quot;) &rarr; 100</code> atau <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold font-mono">parseInt()</code>.</p>
                      </div>
                    </div>
                  }
                />

                <div className="text-slate-800 dark:text-slate-200 text-sm md:text-base leading-relaxed">
                  <p>
                    Dalam komputasi nyata, kita sering menerima data dalam format yang berbeda dengan kebutuhan operasi kita (misal: input umur dari pengguna selalu berupa <em>String</em>, padahal kita perlu menghitungnya sebagai <em>Integer</em>). Proses pengubahan tipe data dari satu jenis ke jenis lain disebut <strong className="text-emerald-700 dark:text-emerald-300 font-bold">Type Casting</strong>.
                  </p>
                </div>

                {/* Interactive Type Casting Lab */}
                <TypeCastingLab />

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* 4. VARIABEL VS KONSTANTA                                                  */}
      {/* ========================================================================= */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-purple-500/40 ${isOpen4 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button 
          onClick={() => setIsOpen4(!isOpen4)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2 flex items-center gap-3">
              <Lock className="w-8 h-8" />
              4. Variabel vs Konstanta (Mutable vs Read-Only)
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Capaian: Membedakan wadah yang bebas diubah nilainya (Mutable) dengan nilai mutlak yang dikunci permanen (Const).</span>
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
              <div className="p-6 md:p-8 pt-2 space-y-6 overflow-visible">
                
                {/* Definisi Akademik Konstanta dengan Flip Card */}
                <DefinitionFlipCard
                  title="Konstanta (Constant)"
                  theme="purple"
                  icon={Lock}
                  definition={
                    <span>
                      &ldquo;<strong className="text-purple-700 dark:text-purple-300 font-black text-base md:text-lg underline decoration-purple-500/40">Konstanta</strong> (Constant) adalah suatu pengenal bernama yang menyimpan suatu nilai data bernilai mutlak dan bersifat <strong className="text-rose-600 dark:text-rose-400 font-black bg-rose-500/15 dark:bg-rose-500/25 px-2 py-0.5 rounded-lg border border-rose-500/40 inline-block my-0.5">immutable (read-only)</strong>, di mana nilainya <strong className="text-amber-700 dark:text-amber-300 font-black bg-amber-500/15 dark:bg-amber-500/25 px-2 py-0.5 rounded-lg border border-amber-500/40 inline-block my-0.5">dilarang untuk dimodifikasi atau ditimpa</strong> oleh program setelah inisialisasi awal.&rdquo;
                    </span>
                  }
                  backTitle="Perbandingan Proteksi Memori: const vs let / var"
                  backContent={
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                      <div className="p-3.5 rounded-2xl bg-card border-2 border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
                        <strong className="text-blue-700 dark:text-blue-300 block font-mono font-black text-sm">Variabel (Mutable)</strong>
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">Sel memori RAM tidak dikunci. Instruksi penugasan berikutnya (<code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold font-mono">skor = 150</code>) langsung menimpa data lama.</p>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-card border-2 border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
                        <strong className="text-purple-700 dark:text-purple-300 block font-mono font-black text-sm">Konstanta (Immutable)</strong>
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">Kompiler menandai slot memori dengan bendera *Read-Only*. Upaya modifikasi nilai seketika memicu <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-rose-600 font-bold font-mono">TypeError</code>.</p>
                      </div>
                    </div>
                  }
                />

                <div className="text-slate-800 dark:text-slate-200 text-sm md:text-base leading-relaxed">
                  <p>
                    Dalam matematika dan fisika, ada nilai mutlak yang tidak boleh berubah seperti gravitasi (<code className="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono font-bold text-slate-900 dark:text-slate-100">g = 9.8</code>) atau nilai pi (<code className="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono font-bold text-slate-900 dark:text-slate-100">&pi; = 3.14159</code>). Di pemrograman, kita menguncinya menggunakan <strong className="text-purple-700 dark:text-purple-300 font-bold">Konstanta</strong> untuk mencegah ketidaksengajaan mengubah nilai penting tersebut.
                  </p>
                </div>

                {/* Interactive Constant vs Variable */}
                <ConstantVsVariable />

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* 5. OPERASI MASUKAN & KELUARAN (I/O DASAR)                                 */}
      {/* ========================================================================= */}
      <div className={`border border-border/60 rounded-2xl bg-secondary/5 shadow-sm transition-all hover:border-cyan-500/40 ${isOpen5 ? 'overflow-visible' : 'overflow-hidden'}`}>
        <button 
          onClick={() => setIsOpen5(!isOpen5)}
          className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 bg-background cursor-pointer rounded-2xl"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2 flex items-center gap-3">
              <Terminal className="w-8 h-8" />
              5. Operasi Masukan &amp; Keluaran (I/O Dasar)
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Capaian: Memahami siklus pertukaran data antara pengguna manusia, memori komputer, dan layar monitor.</span>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen5 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen5 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-visible"
            >
              <div className="p-6 md:p-8 pt-2 space-y-6 overflow-visible">
                
                <div className="text-slate-800 dark:text-slate-200 text-sm md:text-base leading-relaxed space-y-3">
                  <p>
                    Program komputer menjadi hidup dan interaktif karena dapat berkomunikasi dengan pengguna manusia. Komputer membaca masukan (<strong className="text-cyan-700 dark:text-cyan-300 font-bold">Input</strong>) dari papan ketik, menyimpannya ke variabel di RAM, lalu menampilkan hasilnya (<strong className="text-emerald-700 dark:text-emerald-300 font-bold">Output</strong>) ke layar terminal monitor.
                  </p>
                  
                  <div className="p-4 bg-rose-500/10 border-l-4 border-rose-500 rounded-r-xl text-xs md:text-sm text-slate-800 dark:text-slate-200 shadow-sm space-y-1 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-rose-400 bg-card">
                    <strong className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1.5 font-mono uppercase text-xs">
                      <span>⚠️ Aturan Emas Yang Wajib Diingat:</span>
                    </strong>
                    <p>
                      Semua data yang dimasukkan lewat fungsi <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono font-bold text-slate-900 dark:text-slate-100">input()</code> (Python) atau <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono font-bold text-slate-900 dark:text-slate-100">prompt()</code> (JavaScript) <strong>SELALU bertipe String (Teks)</strong>. Jika Anda ingin melakukan operasi hitung aritmatika di bab-bab selanjutnya, Anda <strong>WAJIB melakukan Type Casting</strong> (misal: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono font-bold text-slate-900 dark:text-slate-100">int(input())</code>)!
                    </p>
                  </div>
                </div>

                {/* Interactive IO Bridge Visualizer */}
                <IOBridgeVisualizer />

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
