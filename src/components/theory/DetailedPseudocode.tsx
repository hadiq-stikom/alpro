"use client";

import React, { useState } from 'react';
import { 
  Code2, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Cog, 
  Layers, 
  Terminal, 
  FileCode2, 
  Copy, 
  Check, 
  RotateCw, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- INTERACTIVE TOOLTIP COMPONENTS ---

const HoverKeyword = ({ text }: { text: string }) => (
  <span className="group/kw relative cursor-default inline-block z-20">
    <span className="font-extrabold text-violet-700 dark:text-violet-300 bg-violet-500/15 dark:bg-violet-500/20 border border-violet-400/40 dark:border-violet-400/50 px-2 py-0.5 rounded shadow-xs group-hover/kw:bg-violet-500 group-hover/kw:text-white dark:group-hover/kw:text-slate-950 transition-all">
      {text}
    </span>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-3.5 px-4 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 rounded-xl opacity-0 group-hover/kw:opacity-100 pointer-events-none transition-all duration-300 z-50 border-2 border-violet-400 shadow-xl dark:shadow-[0_10px_30px_rgba(139,92,246,0.4)] text-center font-sans translate-y-2 group-hover/kw:translate-y-0 leading-relaxed">
      <strong className="text-violet-600 dark:text-violet-300 font-bold block mb-0.5">Kata Kunci Struktur</strong>
      Bagian penanda utama struktur algoritma (Wajib ditulis dengan huruf kapital).
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-violet-400"></div>
    </div>
  </span>
);

const HoverType = ({ name, desc }: { name: string; desc: string }) => (
  <span className="group/type relative cursor-default inline-block z-20">
    <span className="font-extrabold text-blue-700 dark:text-blue-300 bg-blue-500/15 dark:bg-blue-500/20 border border-blue-400/40 dark:border-blue-400/50 px-2 py-0.5 rounded shadow-xs group-hover/type:bg-blue-500 group-hover/type:text-white dark:group-hover/type:text-slate-950 transition-all">
      {name}
    </span>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-3.5 px-4 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 rounded-xl opacity-0 group-hover/type:opacity-100 pointer-events-none transition-all duration-300 z-50 border-2 border-blue-400 shadow-xl dark:shadow-[0_10px_30px_rgba(59,130,246,0.4)] text-center font-sans translate-y-2 group-hover/type:translate-y-0 leading-relaxed">
      <strong className="text-blue-600 dark:text-blue-300 font-bold block mb-0.5">Tipe Data Memori</strong>
      {desc}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-blue-400"></div>
    </div>
  </span>
);

const HoverIO = ({ command, isInput = true }: { command: string; isInput?: boolean }) => (
  <span className="group/io relative cursor-default inline-block z-20">
    <span className={`font-extrabold ${isInput ? 'text-fuchsia-700 dark:text-fuchsia-300 bg-fuchsia-500/15 dark:bg-fuchsia-500/20 border-fuchsia-400/40 dark:border-fuchsia-400/50' : 'text-cyan-700 dark:text-cyan-300 bg-cyan-500/15 dark:bg-cyan-500/20 border-cyan-400/40 dark:border-cyan-400/50'} border px-2 py-0.5 rounded shadow-xs group-hover/io:${isInput ? 'bg-fuchsia-500 group-hover/io:text-white' : 'bg-cyan-500 group-hover/io:text-white'} dark:group-hover/io:text-slate-950 transition-all`}>
      {command}
    </span>
    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-3.5 px-4 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 rounded-xl opacity-0 group-hover/io:opacity-100 pointer-events-none transition-all duration-300 z-50 border-2 ${isInput ? 'border-fuchsia-400 shadow-[0_10px_30px_rgba(217,70,239,0.4)]' : 'border-cyan-400 shadow-[0_10px_30px_rgba(6,182,212,0.4)]'} text-center font-sans translate-y-2 group-hover/io:translate-y-0 leading-relaxed`}>
      <strong className={`${isInput ? 'text-fuchsia-600 dark:text-fuchsia-300' : 'text-cyan-600 dark:text-cyan-300'} font-bold block mb-0.5`}>
        {isInput ? 'Instruksi Input Data' : 'Instruksi Output Data'}
      </strong>
      {isInput ? 'Menerima masukan data dari pengguna (Keyboard) dan menyimpannya ke variabel.' : 'Menampilkan hasil nilai variabel atau teks ke layar pengguna.'}
      <div className={`absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent ${isInput ? 'border-t-fuchsia-400' : 'border-t-cyan-400'}`}></div>
    </div>
  </span>
);

const HoverVariable = ({ name }: { name: string }) => (
  <span className="group/var relative cursor-default inline-block z-20">
    <strong className="text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 dark:bg-emerald-500/20 border border-emerald-400/40 dark:border-emerald-400/50 px-2 py-0.5 rounded font-bold group-hover/var:bg-emerald-500 group-hover/var:text-white dark:group-hover/var:text-slate-950 transition-all">
      {name}
    </strong>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-3.5 px-4 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 rounded-xl opacity-0 group-hover/var:opacity-100 pointer-events-none transition-all duration-300 z-50 border-2 border-emerald-400 shadow-xl dark:shadow-[0_10px_30px_rgba(16,185,129,0.4)] text-center font-sans translate-y-2 group-hover/var:translate-y-0 leading-relaxed">
      <strong className="text-emerald-600 dark:text-emerald-300 font-bold block mb-0.5">Clean Variable Name</strong>
      Nama variabel ditulis <strong>lengkap dan deskriptif</strong> (bukan singkatan 1 huruf seperti P atau L).
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-emerald-400"></div>
    </div>
  </span>
);

const HoverAssign = () => (
  <span className="group/asg relative cursor-default inline-block z-20 mx-1">
    <span className="font-extrabold text-rose-700 dark:text-rose-300 bg-rose-500/15 dark:bg-rose-500/20 border border-rose-400/40 dark:border-rose-400/50 px-2 py-0.5 rounded shadow-xs group-hover/asg:bg-rose-500 group-hover/asg:text-white dark:group-hover/asg:text-slate-950 transition-all">
      =
    </span>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-3.5 px-4 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 rounded-xl opacity-0 group-hover/asg:opacity-100 pointer-events-none transition-all duration-300 z-50 border-2 border-rose-400 shadow-xl dark:shadow-[0_10px_30px_rgba(244,63,94,0.4)] text-center font-sans translate-y-2 group-hover/asg:translate-y-0 leading-relaxed">
      <strong className="text-rose-600 dark:text-rose-300 font-bold block mb-0.5">Operator Assignment (=)</strong>
      Menugaskan/memasukkan hasil perhitungan di sebelah kanan ke dalam variabel di sebelah kiri.
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-rose-400"></div>
    </div>
  </span>
);

// --- FLIP CARD COMPONENT FOR STRUCTURE PILLARS ---

interface PillarCardProps {
  number: string;
  title: string;
  subtitle: string;
  color: string;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
}

const PillarFlipCard = ({ number, title, subtitle, color, frontContent, backContent }: PillarCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative z-0 hover:z-50 w-full min-h-[220px] cursor-pointer group/flip hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center select-none"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isFlipped ? (
          <motion.div
            key="front"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className={`w-full h-full p-5 rounded-2xl border-2 bg-card dark:bg-slate-950 flex flex-col justify-between ${color} shadow-sm dark:shadow-lg hover:shadow-2xl dark:group-hover/flip:shadow-[0_25px_50px_rgba(0,0,0,0.85)] transition-colors duration-200`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-full bg-violet-500/15 dark:bg-violet-500/25 text-violet-700 dark:text-violet-300 font-extrabold flex items-center justify-center text-xs border border-violet-500/30 dark:border-violet-500/40">
                  {number}
                </span>
                <div className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-300 font-semibold group-hover/flip:text-violet-600 dark:group-hover/flip:text-violet-300 transition-colors">
                  <span>Klik balik</span>
                  <RotateCw className="w-3.5 h-3.5 group-hover/flip:rotate-90 transition-transform" />
                </div>
              </div>
              <h5 className="font-bold text-base text-foreground mb-1">{title}</h5>
              <p className="text-xs text-slate-900 dark:text-slate-100 font-bold mb-3">{subtitle}</p>
            </div>
            <div className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed font-mono bg-slate-100 dark:bg-slate-950/80 p-2.5 rounded-xl border border-border dark:border-slate-800 group-hover/flip:border-violet-500/40 font-bold">
              {frontContent}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="w-full h-full p-5 rounded-2xl border-2 border-violet-500/70 bg-card dark:bg-slate-950 text-foreground dark:text-slate-100 shadow-xl group-hover/flip:shadow-[0_25px_50px_rgba(139,92,246,0.4)] flex flex-col justify-between transition-colors duration-200"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-violet-700 dark:text-violet-400 font-bold tracking-wider border-b border-violet-500/30 pb-0.5">
                  PENJELASAN AKADEMIS
                </span>
                <RotateCw className="w-3.5 h-3.5 text-violet-600/70 dark:text-violet-400/60 group-hover/flip:-rotate-90 transition-transform" />
              </div>
              <h6 className="font-bold text-sm text-foreground mb-2">{title}</h6>
              <div className="text-xs text-slate-900 dark:text-slate-100 font-semibold leading-relaxed space-y-2">
                {backContent}
              </div>
            </div>
            <div className="pt-2 text-[11px] text-violet-600 dark:text-violet-400 font-bold italic">
              Klik kartu untuk membalik kembali
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PseudocodeDefinitionCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [targetLang, setTargetLang] = useState<'python' | 'javascript'>('python');

  return (
    <div
      className="relative z-0 hover:z-50 w-full min-h-[250px] cursor-pointer group/flip hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center select-none"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isFlipped ? (
          <motion.div
            key="front"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="w-full h-full p-6 md:p-7 rounded-2xl border-2 border-violet-500/40 bg-card dark:bg-slate-950 flex flex-col justify-between shadow-sm dark:shadow-md hover:shadow-2xl dark:group-hover/flip:shadow-[0_25px_50px_rgba(0,0,0,0.85)] hover:border-violet-500 transition-colors duration-200"
          >
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/60">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/30">
                    <Terminal className="w-5 h-5 text-violet-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg md:text-xl text-foreground tracking-tight">
                      Definisi Formal Pseudocode (Kode Semu)
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Standar Hibrida Akademik ITB &amp; Pearson/ACM untuk Notasi Algoritma
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 font-extrabold group-hover/flip:text-violet-700 dark:group-hover/flip:text-violet-300">
                  <span className="hidden sm:inline">Klik visualisasi jembatan sintaks</span>
                  <RotateCw className="w-4 h-4 group-hover/flip:rotate-90 transition-transform" />
                </div>
              </div>

              <p className="text-sm md:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium mb-4">
                <strong className="text-violet-600 dark:text-violet-400 font-black bg-violet-500/10 px-2 py-0.5 rounded-md border border-violet-500/20">
                  Pseudocode
                </strong>{' '}
                (berasal dari kata <em>pseudo</em> = semu/palsu dan <em>code</em> = kode pemrograman) adalah{' '}
                <strong className="text-foreground font-black underline decoration-violet-500 decoration-2 underline-offset-4">
                  notasi penulisan algoritma tekstual
                </strong>{' '}
                yang memadukan kejelasan bahasa manusia dengan ketegasan struktur pemrograman. Pseudocode memungkinkan perancangan solusi komputasi yang presisi{' '}
                <strong className="text-emerald-700 dark:text-emerald-300 font-black bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/25">
                  tanpa terikat oleh kerumitan sintaksis bahasa tertentu
                </strong>
                .
              </p>
            </div>

            {/* 3 Pilar Esensial Pseudocode */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-border/50">
              <div className="p-3 rounded-xl bg-violet-500/5 dark:bg-violet-950/20 border border-violet-500/20 space-y-1">
                <div className="flex items-center gap-1.5 text-violet-600 dark:text-violet-400 font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Notasi Semi-Formal Hibrida</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  Memadukan kata kunci imperatif bahasa alami dengan struktur logika pemrograman yang sistematis dan mudah diaudit.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-blue-500/5 dark:bg-blue-950/20 border border-blue-500/20 space-y-1">
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>Netralitas Bahasa (Agnostic)</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  Tidak bergantung pada *compiler* atau aturan ketat seperti titik-koma, tanda kurung, ataupun alokasi memori manual.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                  <Layers className="w-3.5 h-3.5 shrink-0" />
                  <span>Pemetaan 1:1 ke Kode Nyata</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  Memiliki struktur alur baris yang selaras dengan bahasa pemrograman modern (Python, JavaScript, C++, Java).
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="w-full h-full p-6 md:p-7 rounded-2xl border-2 border-violet-500/70 bg-card dark:bg-slate-950 text-foreground dark:text-slate-100 flex flex-col justify-between shadow-xl group-hover/flip:shadow-[0_25px_50px_rgba(139,92,246,0.35)] transition-colors duration-200"
          >
            <div>
              {/* Header Kartu Sisi Belakang */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/60">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/30">
                    <FileCode2 className="w-5 h-5 text-violet-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg md:text-xl text-foreground tracking-tight">
                      Visualisasi: Pseudocode sebagai Jembatan Logika Bebas Sintaks
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Membuktikan bagaimana Pseudocode memadukan bahasa manusia dan struktur kode tanpa terikat aturan sintaks rumit
                    </p>
                  </div>
                </div>
                <div 
                  className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 font-extrabold group-hover/flip:text-violet-700 dark:group-hover/flip:text-violet-300 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                >
                  <span className="hidden sm:inline">Klik balik definisi</span>
                  <RotateCw className="w-4 h-4 group-hover/flip:-rotate-90 transition-transform" />
                </div>
              </div>

              {/* Bilah Uji Interaktif: Target Bahasa Pemrograman */}
              <div 
                className="flex items-center justify-between flex-wrap gap-2 mb-3 bg-muted/60 dark:bg-slate-900/80 p-2 px-3 rounded-xl border border-border/60"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                  <span className="p-1 rounded-md bg-violet-500/20 text-violet-600 dark:text-violet-400">
                    <Code2 className="w-3.5 h-3.5" />
                  </span>
                  <span>Uji Translasi Jembatan (Studi Kasus: Evaluasi Kelulusan Siswa):</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground font-semibold">Pilih Bahasa Target:</span>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setTargetLang('python'); }}
                    className={`px-3 py-1 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 border ${
                      targetLang === 'python'
                        ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-500/30'
                        : 'bg-card text-muted-foreground border-border hover:text-foreground'
                    }`}
                  >
                    <span>Python</span>
                    <span className="text-[10px] font-semibold opacity-90">(Indented)</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setTargetLang('javascript'); }}
                    className={`px-3 py-1 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 border ${
                      targetLang === 'javascript'
                        ? 'bg-yellow-500 text-slate-950 border-yellow-400 shadow-md shadow-yellow-500/30'
                        : 'bg-card text-muted-foreground border-border hover:text-foreground'
                    }`}
                  >
                    <span>JavaScript</span>
                    <span className="text-[10px] font-semibold opacity-90">(Braces)</span>
                  </button>
                </div>
              </div>

              {/* 3 Panel Komparatif: Bahasa Alami -> Pseudocode -> Kode Riil */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Panel 1: Bahasa Manusia (Naratif) */}
                <div className="p-3.5 rounded-xl bg-blue-500/5 dark:bg-blue-950/20 border-2 border-blue-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                        1. Bahasa Manusia
                      </span>
                      <span className="text-[10px] text-muted-foreground font-semibold">Deskriptif Alami</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold leading-relaxed mb-3">
                      Langkah instruksi logis yang diekspresikan dengan kalimat bahasa sehari-hari:
                    </p>
                    <div className="p-2.5 rounded-lg bg-background/80 dark:bg-slate-900 border border-blue-500/20 font-sans text-xs text-slate-800 dark:text-slate-200 space-y-1">
                      <p>1. Minta masukan nilai siswa.</p>
                      <p>2. Jika nilai minimal 75 maka nyatakan lulus, selain itu remedial.</p>
                      <p>3. Selesai.</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-blue-500/20 text-[10px] text-blue-700 dark:text-blue-300 font-bold">
                    ✓ Mudah dipahami manusia<br />✗ Terlalu ambigu bagi komputer
                  </div>
                </div>

                {/* Panel 2: Pseudocode (Hibrida Baku) */}
                <div className="p-3.5 rounded-xl bg-violet-500/10 dark:bg-violet-950/30 border-2 border-violet-500/50 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-500/40">
                        2. Pseudocode Baku
                      </span>
                      <span className="text-[10px] text-violet-600 dark:text-violet-400 font-black">Jembatan Logika</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold leading-relaxed mb-2">
                      Memadukan kata kunci terstruktur tanpa sintaks compiler yang rumit:
                    </p>
                    <pre className="p-2.5 rounded-lg bg-slate-950 text-slate-100 font-mono text-[11px] leading-snug border border-violet-500/40 overflow-x-auto">
{`PROGRAM EvaluasiNilai
KAMUS:
  nilai : integer
ALGORITMA:
  input(nilai)
  if nilai >= 75 then
    output("LULUS")
  else
    output("REMEDIAL")
  endif`}
                    </pre>
                  </div>
                  <div className="mt-3 pt-2 border-t border-violet-500/30 text-[10px] text-violet-700 dark:text-violet-300 font-black">
                    ✓ Presisi &amp; bebas kesalahan sintaks<br />✓ Menjadi cetak biru sebelum coding
                  </div>
                </div>

                {/* Panel 3: Kode Riil (Target) */}
                <div className="p-3.5 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border-2 border-emerald-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                        3. Kode Riil ({targetLang === 'python' ? 'Python' : 'JavaScript'})
                      </span>
                      <span className="text-[10px] text-muted-foreground font-semibold">Bahasa Pemrograman</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold leading-relaxed mb-2">
                      Translasi 1:1 langsung dari blok pseudocode di samping:
                    </p>
                    <pre className="p-2.5 rounded-lg bg-slate-950 text-emerald-300 font-mono text-[11px] leading-snug border border-emerald-500/30 overflow-x-auto">
{targetLang === 'python' ? (
`# Sintaksis Python
nilai = int(input())

if nilai >= 75:
    print("LULUS")
else:
    print("REMEDIAL")`
) : (
`// Sintaksis JavaScript
const nilai = Number(prompt());

if (nilai >= 75) {
    console.log("LULUS");
} else {
    console.log("REMEDIAL");
}`
)}
                    </pre>
                  </div>
                  <div className="mt-3 pt-2 border-t border-emerald-500/20 text-[10px] text-emerald-700 dark:text-emerald-300 font-bold">
                    ✓ Siap dieksekusi mesin komputer<br />✓ Hasil translasi mudah &amp; presisi
                  </div>
                </div>
              </div>

              {/* 3 Kaidah Baku Pseudocode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 mt-2 border-t border-border/50">
                <div className="p-2 rounded-xl bg-violet-500/10 dark:bg-violet-950/40 border border-violet-500/20 text-center space-y-0.5">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-700 dark:text-violet-300 font-black text-[10px]">
                    Format 3 Blok
                  </span>
                  <p className="text-[11px] text-foreground font-bold">PROGRAM, KAMUS, ALGORITMA</p>
                  <p className="text-[10px] text-muted-foreground">Pemisahan deklarasi memori dan urutan aksi logika.</p>
                </div>

                <div className="p-2 rounded-xl bg-blue-500/10 dark:bg-blue-950/40 border border-blue-500/20 text-center space-y-0.5">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 font-black text-[10px]">
                    I/O Universal
                  </span>
                  <p className="text-[11px] text-foreground font-bold">input(var) &amp; output(pesan)</p>
                  <p className="text-[10px] text-muted-foreground">Bebas dari sintaks cetak spesifik seperti print atau console.log.</p>
                </div>

                <div className="p-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/20 text-center space-y-0.5">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-black text-[10px]">
                    Kaidah Penutup
                  </span>
                  <p className="text-[11px] text-foreground font-bold">endif &amp; Indentasi Sejajar</p>
                  <p className="text-[10px] text-muted-foreground">Menghilangkan kerancuan batas blok percabangan.</p>
                </div>
              </div>
            </div>

            {/* Footer Penutup Pedagogis */}
            <div className="mt-3 pt-2.5 border-t border-violet-500/20 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              <span>Prinsip: Pseudocode adalah cetak biru algoritmik yang dipahami manusia dan mudah dikonversi ke kode mesin.</span>
              <span className="font-bold text-violet-600 dark:text-violet-400">CLRS &amp; ACM Standard</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAIN DETAILED PSEUDOCODE COMPONENT ---

export default function DetailedPseudocode() {
  const [activeCodeTab, setActiveCodeTab] = useState<'pseudocode' | 'python' | 'javascript'>('pseudocode');
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    pseudocode: `PROGRAM HitungLuas
// Program untuk menghitung dan menampilkan luas persegi panjang

KAMUS:
  panjang, lebar : float
  luas : float

ALGORITMA:
  input(panjang)
  input(lebar)
  
  luas = panjang * lebar
  
  output(luas)`,

    python: `# Program: HitungLuas
# Menghitung dan menampilkan luas persegi panjang

# 1. Input & Konversi Tipe Data
panjang = float(input("Masukkan panjang: "))
lebar = float(input("Masukkan lebar: "))

# 2. Algoritma / Perhitungan
luas = panjang * lebar

# 3. Output Hasil
print(f"Luas persegi panjang: {luas}")`,

    javascript: `// Program: HitungLuas
// Menghitung dan menampilkan luas persegi panjang

// 1. Deklarasi & Input
let panjang = parseFloat(prompt("Masukkan panjang:"));
let lebar = parseFloat(prompt("Masukkan lebar:"));

// 2. Algoritma / Perhitungan
let luas = panjang * lebar;

// 3. Output Hasil
console.log(\`Luas persegi panjang: \${luas}\`);`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeCodeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-secondary/10 border border-border/50 rounded-2xl p-6 md:p-8 space-y-8 shadow-sm overflow-visible">
      
      {/* HEADER SECTION - High Contrast Violet Palette */}
      <div className="flex items-center gap-4 border-b border-border/50 pb-5">
        <div className="p-3 bg-violet-500/15 dark:bg-violet-500/20 rounded-2xl text-violet-700 dark:text-violet-400 shadow-inner border border-violet-500/30">
          <Code2 className="w-8 h-8" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl md:text-3xl font-bold text-violet-700 dark:text-violet-400">3. Pseudocode (Kode Semu)</h3>
            <span className="hidden sm:inline-flex items-center gap-1 bg-violet-500/10 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 text-xs px-2.5 py-0.5 rounded-full border border-violet-500/30 font-bold">
              <Sparkles className="w-3 h-3" /> Standar Modern
            </span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-sm mt-1 font-medium">
            Standar Hibrida Akademik ITB &amp; Pearson/ACM: Jembatan berpikir logis terstruktur menuju <strong>Python</strong> dan <strong>JavaScript</strong>.
          </p>
        </div>
      </div>

      <div className="space-y-8 pt-2">
        
        {/* 1. BAGIAN A: TEORI & FILOSOFI PSEUDOCODE (KARTU DEFINISI BERDIMENSI GANDA) */}
        <div className="space-y-4">
          <PseudocodeDefinitionCard />
          
          <div className="bg-background border border-border rounded-2xl p-5 md:p-6 shadow-sm overflow-visible">
            <h4 className="font-bold flex items-center gap-2 mb-4 text-violet-700 dark:text-violet-400 text-base md:text-lg">
              <ShieldCheck className="w-5 h-5" />
              4 Prinsip Utama Standar Penulisan Baru (Semester 1):
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 overflow-visible">
              
              {/* Card 1 */}
              <div 
                className="relative z-10 hover:z-50 flex items-start gap-3.5 p-4 rounded-2xl bg-card dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-2 border-violet-500/40 hover:border-violet-500 hover:scale-[1.2] hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] dark:hover:brightness-110 transition-transform duration-300 ease-out origin-center cursor-pointer shadow-sm"
              >
                <div className="w-7 h-7 rounded-full bg-violet-500/15 dark:bg-violet-500/25 text-violet-700 dark:text-violet-300 font-black flex items-center justify-center text-xs shrink-0 border border-violet-500/30 dark:border-violet-500/40 mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-foreground block mb-1 text-sm md:text-base font-bold">Struktur 3 Blok Baku</strong>
                  <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                    Disiplin membagi algoritma ke dalam: <code className="text-violet-700 dark:text-violet-300 font-bold bg-violet-500/15 dark:bg-violet-500/20 px-1.5 py-0.5 rounded">PROGRAM</code>, <code className="text-blue-700 dark:text-blue-300 font-bold bg-blue-500/15 dark:bg-blue-500/20 px-1.5 py-0.5 rounded">KAMUS</code>, dan <code className="text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-500/15 dark:bg-emerald-500/20 px-1.5 py-0.5 rounded">ALGORITMA</code>.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div 
                className="relative z-10 hover:z-50 flex items-start gap-3.5 p-4 rounded-2xl bg-card dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-2 border-emerald-500/40 hover:border-emerald-500 hover:scale-[1.2] hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] dark:hover:brightness-110 transition-transform duration-300 ease-out origin-center cursor-pointer shadow-sm"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-black flex items-center justify-center text-xs shrink-0 border border-emerald-500/30 dark:border-emerald-500/40 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-foreground block mb-1 text-sm md:text-base font-bold">Clean Variable Names</strong>
                  <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                    Nama variabel wajib deskriptif (misal: <code className="text-emerald-700 dark:text-emerald-300 font-mono font-bold">panjang, lebar</code>), dilarang singkatan 1 huruf (<code className="text-rose-600 dark:text-rose-400 font-mono font-bold">P, L</code>).
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div 
                className="relative z-10 hover:z-50 flex items-start gap-3.5 p-4 rounded-2xl bg-card dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-2 border-rose-500/40 hover:border-rose-500 hover:scale-[1.2] hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] dark:hover:brightness-110 transition-transform duration-300 ease-out origin-center cursor-pointer shadow-sm"
              >
                <div className="w-7 h-7 rounded-full bg-rose-500/15 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 font-black flex items-center justify-center text-xs shrink-0 border border-rose-500/30 dark:border-rose-500/40 mt-0.5">
                  3
                </div>
                <div>
                  <strong className="text-foreground block mb-1 text-sm md:text-base font-bold">Operator Penugasan Modern (=)</strong>
                  <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                    Menggunakan operator <code className="text-rose-700 dark:text-rose-400 font-bold bg-rose-500/15 px-2 py-0.5 rounded">=</code> agar seragam dengan Python dan JavaScript (menggantikan panah kuno <code className="text-slate-500 dark:text-slate-400">{"<-"}</code>).
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div 
                className="relative z-10 hover:z-50 flex items-start gap-3.5 p-4 rounded-2xl bg-card dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-2 border-blue-500/40 hover:border-blue-500 hover:scale-[1.2] hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] dark:hover:brightness-110 transition-transform duration-300 ease-out origin-center cursor-pointer shadow-sm"
              >
                <div className="w-7 h-7 rounded-full bg-blue-500/15 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 font-black flex items-center justify-center text-xs shrink-0 border border-blue-500/30 dark:border-blue-500/40 mt-0.5">
                  4
                </div>
                <div>
                  <strong className="text-foreground block mb-1 text-sm md:text-base font-bold">Instruksi I/O Universal</strong>
                  <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                    Menggunakan <code className="text-fuchsia-700 dark:text-fuchsia-400 font-bold">input(...)</code> dan <code className="text-cyan-700 dark:text-cyan-400 font-bold">output(...)</code> yang intuitif dan mudah dipahami pemula.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 2. BAGIAN B: ANATOMI 3 STRUKTUR UTAMA (INTERACTIVE FLIP CARDS) */}
        <div className="space-y-4 pt-2 border-t border-border/40">
          <div className="flex items-center justify-between">
            <h4 className="font-bold flex items-center gap-2 text-violet-700 dark:text-violet-400 text-lg">
              <Layers className="w-5 h-5" />
              Anatomi 3 Blok Pseudocode (Klik kartu untuk melihat detail)
            </h4>
            <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold hidden sm:inline-block">Interaktif • 3 Pilar Utama</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4 px-2 overflow-visible">
            {/* Card 1: Header */}
            <PillarFlipCard
              number="1"
              title="Header (PROGRAM)"
              subtitle="Identitas & spesifikasi algoritma"
              color="border-violet-500/40"
              frontContent={
                <>
                  <div className="text-violet-300 font-bold">PROGRAM HitungLuas</div>
                  <div className="text-slate-500 italic">// Menghitung luas persegi</div>
                </>
              }
              backContent={
                <>
                  <p>Menjelaskan nama program (menggunakan <em>PascalCase</em> seperti <code>HitungLuas</code> atau <em>snake_case</em> tanpa spasi) dan spesifikasi ringkas apa yang dikerjakan algoritma.</p>
                  <p className="text-emerald-400 font-mono text-[11px]">Komentar diawali tanda // (seperti JS/C++)</p>
                </>
              }
            />

            {/* Card 2: Kamus */}
            <PillarFlipCard
              number="2"
              title="Kamus (Deklarasi)"
              subtitle="Pemetaan variabel & memori"
              color="border-blue-500/40"
              frontContent={
                <>
                  <div className="text-violet-300 font-bold">KAMUS:</div>
                  <div className="text-emerald-300">panjang, lebar : <span className="text-blue-400 font-bold">float</span></div>
                  <div className="text-emerald-300">luas : <span className="text-blue-400 font-bold">float</span></div>
                </>
              }
              backContent={
                <>
                  <p>Tempat mendaftarkan semua variabel beserta tipe datanya (<code>integer</code>, <code>float</code>, <code>string</code>, <code>boolean</code>).</p>
                  <p className="text-blue-300 font-mono text-[11px]">Melatih pemahaman alokasi memori sebelum coding.</p>
                </>
              }
            />

            {/* Card 3: Algoritma */}
            <PillarFlipCard
              number="3"
              title="Algoritma (Deskripsi)"
              subtitle="Langkah instruksi komputasi"
              color="border-emerald-500/40"
              frontContent={
                <>
                  <div className="text-violet-300 font-bold">ALGORITMA:</div>
                  <div className="text-fuchsia-400">input(panjang, lebar)</div>
                  <div className="text-slate-200">luas <span className="text-rose-400 font-bold">=</span> panjang * lebar</div>
                  <div className="text-cyan-400">output(luas)</div>
                </>
              }
              backContent={
                <>
                  <p>Bagian inti yang memuat urutan aksi terstruktur: Pembacaan input, proses perhitungan matematis, dan penampilan hasil.</p>
                  <p className="text-rose-300 font-mono text-[11px]">Menggunakan operator = yang identik dengan Python & JS.</p>
                </>
              }
            />
          </div>
        </div>

        {/* 3. BAGIAN C: CONTOH PENERAPAN INTERAKTIF DENGAN HOVER TOOLTIPS */}
        <div className="space-y-4 pt-4 border-t border-border/40">
          <h4 className="font-bold flex items-center gap-2 text-violet-700 dark:text-violet-400 text-lg">
            <BookOpen className="w-5 h-5" />
            Studi Kasus: Penerapan Pseudocode Baku (Arahkan kursor ke kode untuk penjelasan)
          </h4>

          <div 
            className="bg-card dark:bg-slate-900/95 border-2 border-border dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-inner font-mono text-sm md:text-base text-slate-900 dark:text-slate-50 relative min-h-[360px] flex flex-col justify-center transition-transform duration-300 ease-out origin-center hover:scale-[1.2] hover:-translate-y-2 hover:z-50 dark:hover:brightness-110 hover:border-violet-500/80 hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-violet-500/80 rounded-l-2xl"></div>
            
            <p className="text-slate-600 dark:text-slate-300 mb-6 italic text-xs md:text-sm font-sans font-semibold">
              // Studi Kasus: Menghitung Luas Persegi Panjang (Arahkan kursor ke tiap elemen kata kunci)
            </p>

            <div className="space-y-5 text-sm md:text-base leading-relaxed pl-2 md:pl-4">
              
              {/* Bagian 1: Header */}
              <div>
                <HoverKeyword text="PROGRAM" /> <strong className="text-foreground font-bold ml-1">HitungLuas</strong>
                <div className="text-slate-500 dark:text-slate-400 text-xs md:text-sm italic pl-6 mt-1 font-sans">
                  // Program untuk menghitung dan menampilkan luas persegi panjang
                </div>
              </div>

              {/* Bagian 2: Kamus */}
              <div>
                <HoverKeyword text="KAMUS:" />
                <div className="pl-6 space-y-1.5 mt-1.5">
                  <div>
                    <HoverVariable name="panjang" />, <HoverVariable name="lebar" /> : <HoverType name="float" desc="Menyimpan angka desimal/pecahan agar dapat menghitung ukuran presisi." />
                  </div>
                  <div>
                    <HoverVariable name="luas" /> : <HoverType name="float" desc="Variabel penampung hasil perhitungan luas persegi panjang." />
                  </div>
                </div>
              </div>

              {/* Bagian 3: Algoritma */}
              <div>
                <HoverKeyword text="ALGORITMA:" />
                <div className="pl-6 space-y-2.5 mt-1.5">
                  <div className="flex items-center gap-2">
                    <HoverIO command="input" isInput={true} />(<HoverVariable name="panjang" />)
                  </div>
                  <div className="flex items-center gap-2">
                    <HoverIO command="input" isInput={true} />(<HoverVariable name="lebar" />)
                  </div>
                  
                  <div className="py-1">
                    <HoverVariable name="luas" /> <HoverAssign /> <HoverVariable name="panjang" /> <span className="text-violet-600 dark:text-violet-400 font-bold">*</span> <HoverVariable name="lebar" />
                  </div>
                  
                  <div className="flex items-center gap-2 pt-1">
                    <HoverIO command="output" isInput={false} />(<HoverVariable name="luas" />)
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 4. BAGIAN D: LIVE MULTI-LANGUAGE TRANSLATOR TABS (PSEUDOCODE -> PYTHON -> JS) */}
        <div className="space-y-4 pt-4 border-t border-border/40">
          <div>
            <h4 className="font-bold flex items-center gap-2 text-foreground text-base md:text-lg">
              <Terminal className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>Jembatan Translasi ke Bahasa Nyata (Python &amp; JavaScript)</span>
            </h4>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium mt-1">
              Bandingkan bagaimana setiap baris pseudocode di atas diterjemahkan secara langsung (1-ke-1) ke dalam bahasa pemrograman nyata.
            </p>
          </div>

          {/* Code Viewer Container with Integrated Top Tab Bar */}
          <div className="bg-slate-50 dark:bg-slate-950 border border-border dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-xl font-mono text-sm relative">
            
            {/* Header bar of code editor with Integrated Tabs */}
            <div className="bg-slate-100/90 dark:bg-slate-900/90 px-3 md:px-4 py-2 border-b border-border dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
              
              {/* Left: Window Dots & Tabs */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex gap-1.5 mr-1">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 bg-white dark:bg-slate-950 p-1 rounded-xl border border-border dark:border-slate-800/80 shadow-xs">
                  <button
                    onClick={() => setActiveCodeTab('pseudocode')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeCodeTab === 'pseudocode' 
                        ? 'bg-violet-600 text-white shadow-md' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <FileCode2 className="w-3.5 h-3.5" />
                    <span>Pseudocode</span>
                  </button>

                  <button
                    onClick={() => setActiveCodeTab('python')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeCodeTab === 'python' 
                        ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Python 3</span>
                  </button>

                  <button
                    onClick={() => setActiveCodeTab('javascript')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeCodeTab === 'javascript' 
                        ? 'bg-amber-400 text-slate-950 shadow-md font-bold' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>JavaScript</span>
                  </button>
                </div>
              </div>

              {/* Right: Filename & Copy Button */}
              <div className="flex items-center gap-3">
                <span className="hidden md:inline-block text-xs text-slate-500 dark:text-slate-400 font-sans">
                  {activeCodeTab === 'pseudocode' && 'hitung_luas.pseudo'}
                  {activeCodeTab === 'python' && 'hitung_luas.py'}
                  {activeCodeTab === 'javascript' && 'hitung_luas.js'}
                </span>

                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-white dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-border dark:border-slate-700 transition-colors cursor-pointer shadow-xs"
                  title="Salin Kode"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin!' : 'Salin'}</span>
                </button>
              </div>

            </div>

            {/* Code Body with Smooth Animation */}
            <div className="p-5 md:p-6 overflow-x-auto text-slate-900 dark:text-slate-200 bg-white dark:bg-slate-950 leading-relaxed text-xs md:text-sm">
              <AnimatePresence mode="wait">
                <motion.pre
                  key={activeCodeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-pre"
                >
                  {codeSnippets[activeCodeTab]}
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 5. BAGIAN E: EVALUASI KEKUATAN & KELEMAHAN (PENUTUP) */}
        <div className="space-y-4 pt-6 border-t border-border/40">
          <h4 className="font-bold flex items-center gap-2 text-foreground text-base">
            <Cog className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            Evaluasi Penggunaan Pseudocode
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kekuatan */}
            <div className="bg-emerald-500/10 dark:bg-emerald-950/40 border-2 border-emerald-500/40 dark:border-emerald-500/30 rounded-2xl p-4 md:p-5 flex gap-3.5 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-extrabold text-sm md:text-base text-emerald-900 dark:text-emerald-300 mb-1.5">Kekuatan (Kelebihan):</h5>
                <ul className="text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium space-y-1.5">
                  <li>• <strong>Sangat Dekat dengan Kode:</strong> Memudahkan programmer mentranslasikan ide langsung ke Python, JS, C++, atau Java.</li>
                  <li>• <strong>Bebas Hambatan Sintaks:</strong> Tidak akan error hanya karena lupa tanda kurung kurawal atau titik-koma.</li>
                  <li>• <strong>Terstruktur & Rapi:</strong> Memaksa pemikiran logis yang teratur melalui pembagian Kamus dan Algoritma.</li>
                </ul>
              </div>
            </div>

            {/* Kelemahan */}
            <div className="bg-rose-500/10 dark:bg-rose-950/40 border-2 border-rose-500/40 dark:border-rose-500/30 rounded-2xl p-4 md:p-5 flex gap-3.5 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-700 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-extrabold text-sm md:text-base text-rose-900 dark:text-rose-300 mb-1.5">Kelemahan (Keterbatasan):</h5>
                <ul className="text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium space-y-1.5">
                  <li>• <strong>Tidak Dapat Dieksekusi Langsung:</strong> Komputer tidak bisa langsung menjalankan pseudocode tanpa kompilasi/interpretasi manual oleh programmer.</li>
                  <li>• <strong>Kurang Ramah untuk Orang Awam:</strong> Lebih sulit dipahami oleh masyarakat non-teknis dibandingkan algoritma deskriptif.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
