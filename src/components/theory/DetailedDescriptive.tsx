"use client";

import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  Cog, 
  ListOrdered, 
  PlayCircle, 
  ShieldAlert, 
  GitBranch, 
  Flag, 
  Code2 
} from 'lucide-react';
import { motion } from 'framer-motion';

const HoverNumber = ({ num }: { num: string }) => (
  <div className="group/num relative shrink-0 z-20">
    <div className="w-7 h-7 flex items-center justify-center font-extrabold text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 bg-emerald-500/10 rounded-full group-hover/num:bg-emerald-500 group-hover/num:text-white dark:group-hover/num:text-slate-950 transition-all cursor-default group-hover/num:scale-125 group-hover/num:shadow-[0_0_15px_rgba(16,185,129,0.6)]">
      {num}.
    </div>
    <div className="absolute bottom-full left-0 mb-3 w-64 p-3.5 px-4 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 rounded-xl opacity-0 group-hover/num:opacity-100 pointer-events-none transition-all duration-300 z-50 border-2 border-emerald-500 shadow-xl dark:shadow-[0_10px_30px_rgba(16,185,129,0.3)] text-left font-sans translate-y-2 group-hover/num:translate-y-0 leading-relaxed">
      Algoritma deskriptif harus ditulis berurutan menggunakan <strong className="text-emerald-600 dark:text-emerald-400 font-bold">nomor urut</strong>.
      <div className="absolute top-full left-3 border-6 border-transparent border-t-emerald-500"></div>
    </div>
  </div>
);

const HoverCommand = ({ word }: { word: string }) => (
  <span className="group/cmd relative cursor-default inline-block z-10">
    <span className="font-extrabold text-cyan-700 dark:text-cyan-400 bg-cyan-500/15 border border-cyan-500/40 px-2.5 py-1 rounded-md shadow-xs group-hover/cmd:bg-cyan-500 group-hover/cmd:text-white dark:group-hover/cmd:text-slate-950 transition-all">
      {word}
    </span>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3.5 px-4 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 rounded-xl opacity-0 group-hover/cmd:opacity-100 pointer-events-none transition-all duration-300 z-50 border-2 border-cyan-400 shadow-xl dark:shadow-[0_10px_30px_rgba(6,182,212,0.35)] text-center font-sans translate-y-2 group-hover/cmd:translate-y-0 leading-relaxed">
      Kata yang digunakan adalah <strong className="text-cyan-600 dark:text-cyan-300 font-bold">kata perintah (imperatif)</strong> yang tegas.
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-cyan-400"></div>
    </div>
  </span>
);

const HoverVariable = ({ name }: { name: string }) => (
  <span className="group/var relative cursor-default inline-block z-10">
    <strong className="text-purple-700 dark:text-purple-300 bg-purple-500/15 border border-purple-500/40 px-2 py-0.5 rounded-md group-hover/var:bg-purple-500 group-hover/var:text-white dark:group-hover/var:text-slate-950 transition-all font-bold">
      {name}
    </strong>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-3.5 px-4 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 rounded-xl opacity-0 group-hover/var:opacity-100 pointer-events-none transition-all duration-300 z-50 border-2 border-purple-400 shadow-xl dark:shadow-[0_10px_30px_rgba(168,85,247,0.35)] text-center font-sans translate-y-2 group-hover/var:translate-y-0 leading-relaxed">
      Variabel ditulis dengan <strong className="text-purple-600 dark:text-purple-300 font-bold">jelas dan lengkap</strong>, bukan singkatan.
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-purple-400"></div>
    </div>
  </span>
);

const HoverFormula = ({ formula }: { formula: string }) => (
  <div className="group/form relative inline-block mt-2 z-10">
    <code className="bg-amber-500/10 dark:bg-slate-800/90 px-3 py-2 rounded-lg text-amber-800 dark:text-amber-300 font-mono text-sm border border-amber-500/30 dark:border-amber-500/40 block w-fit group-hover/form:border-amber-400 group-hover/form:bg-amber-500 group-hover/form:text-white dark:group-hover/form:text-slate-950 transition-all cursor-default group-hover/form:shadow-[0_0_20px_rgba(245,158,11,0.4)] font-bold">
      {formula}
    </code>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-3.5 px-4 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 rounded-xl opacity-0 group-hover/form:opacity-100 pointer-events-none transition-all duration-300 z-50 border-2 border-amber-400 shadow-xl dark:shadow-[0_10px_30px_rgba(245,158,11,0.35)] text-center font-sans translate-y-2 group-hover/form:translate-y-0 leading-relaxed">
      Rumus harus ditulis secara tegas dan <strong className="text-amber-600 dark:text-amber-300 font-bold">tidak boleh ambigu</strong>.
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-amber-400"></div>
    </div>
  </div>
);

const HoverTerminal = () => (
  <span className="group/term relative cursor-default inline-block z-10">
    <span className="font-black text-rose-700 dark:text-rose-400 bg-rose-500/15 border border-rose-500/40 px-3 py-1 rounded-md shadow-xs group-hover/term:bg-rose-500 group-hover/term:text-white dark:group-hover/term:text-slate-950 transition-all">
      Selesai
    </span>
    <div className="absolute bottom-full left-0 mb-3 w-72 p-3.5 px-4 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 rounded-xl opacity-0 group-hover/term:opacity-100 pointer-events-none transition-all duration-300 z-50 border-2 border-rose-400 shadow-xl dark:shadow-[0_10px_30px_rgba(244,63,94,0.35)] text-left font-sans translate-y-2 group-hover/term:translate-y-0 leading-relaxed">
      Baris penutup <strong className="text-rose-600 dark:text-rose-300 font-bold">Selesai</strong> menandai akhir alur dan <strong className="text-rose-600 dark:text-rose-300 font-bold">DILARANG</strong> diberi nomor urut.
      <div className="absolute top-full left-5 border-6 border-transparent border-t-rose-400"></div>
    </div>
  </span>
);

export default function DetailedDescriptive() {
  return (
    <div className="bg-secondary/10 border border-border/50 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm overflow-visible">
      <div className="flex items-center gap-4 border-b border-border/50 pb-4">
        <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-500 shadow-inner">
          <FileText className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-500">1. Algoritma Deskriptif (Naratif)</h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm mt-1 font-medium">Menyajikan algoritma dengan bahasa sehari-hari yang mudah dipahami manusia.</p>
        </div>
      </div>

      <div className="space-y-8 pt-2">
        {/* 1. BAGIAN A: TEORI & ATURAN PENULISAN */}
        <div className="space-y-4">
          <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium text-base md:text-lg">
            Penyajian{' '}
            <strong className="text-emerald-600 dark:text-emerald-400 font-black bg-emerald-500/15 px-2 py-0.5 rounded-md border border-emerald-500/30">
              Deskriptif
            </strong>{' '}
            atau yang sering juga disebut sebagai{' '}
            <strong className="text-blue-600 dark:text-blue-400 font-black bg-blue-500/15 px-2 py-0.5 rounded-md border border-blue-500/30">
              Algoritma Naratif
            </strong>{' '}
            adalah bentuk yang{' '}
            <strong className="text-amber-600 dark:text-amber-400 font-black bg-amber-500/15 px-2 py-0.5 rounded-md border border-amber-500/30">
              paling alamiah
            </strong>
            . Kita menggunakan{' '}
            <strong className="text-purple-600 dark:text-purple-400 font-black bg-purple-500/15 px-2 py-0.5 rounded-md border border-purple-500/30">
              untaian kalimat
            </strong>{' '}
            (seperti bahasa Indonesia atau Inggris) untuk mendeskripsikan{' '}
            <strong className="text-teal-600 dark:text-teal-400 font-black bg-teal-500/15 px-2 py-0.5 rounded-md border border-teal-500/30">
              langkah-langkah penyelesaian masalah
            </strong>{' '}
            secara naratif seperti{' '}
            <strong className="text-foreground font-black underline decoration-emerald-500 decoration-2 underline-offset-4">
              sedang bercerita
            </strong>
            .
          </p>
          <div 
            className="bg-card border-2 border-border/80 rounded-3xl p-6 md:p-8 shadow-sm transition-transform duration-300 ease-out origin-center hover:scale-[1.2] hover:-translate-y-2 hover:z-50 hover:border-emerald-500 hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] cursor-pointer relative"
          >
            {/* Header Kartu */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-border/60 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-black text-lg md:text-xl text-foreground tracking-tight">
                    6 Aturan Baku Penulisan Algoritma Naratif
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Kaidah penulisan terstandar untuk menghasilkan deskripsi logika yang presisi dan sistematis.
                  </p>
                </div>
              </div>
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                Pedoman Standar Akademik
              </span>
            </div>

            {/* Grid 6 Kartu Aturan Berwarna & Berhierarki Jelas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* ATURAN 1: SEKUANSIAL (BIRU) */}
              <div className="p-4 rounded-2xl bg-background/80 dark:bg-card border-2 border-blue-500/30 hover:border-blue-500 transition-all flex flex-col justify-between space-y-3 shadow-xs group">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 font-black text-xs flex items-center justify-center border border-blue-500/30">
                      1
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase tracking-wider border border-blue-500/20">
                      Sekuensial
                    </span>
                  </div>
                  <h5 className="font-extrabold text-foreground text-sm flex items-center gap-1.5">
                    <ListOrdered className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>Nomor Urut Terstruktur</span>
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    Setiap langkah aksi wajib memiliki nomor urut urut (1, 2, 3...) agar alur eksekusi tidak melompat.
                  </p>
                </div>
                <div className="pt-2 border-t border-border/50 text-[11px] font-mono text-blue-700 dark:text-blue-300 bg-blue-500/5 px-2.5 py-1.5 rounded-lg border border-blue-500/20">
                  <span className="font-sans font-bold text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">Format Baku:</span>
                  1. Masukkan nilai panjang
                </div>
              </div>

              {/* ATURAN 2: IMPERATIF (HIJAU EMERALD) */}
              <div className="p-4 rounded-2xl bg-background/80 dark:bg-card border-2 border-emerald-500/30 hover:border-emerald-500 transition-all flex flex-col justify-between space-y-3 shadow-xs group">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-black text-xs flex items-center justify-center border border-emerald-500/30">
                      2
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider border border-emerald-500/20">
                      Instruksi
                    </span>
                  </div>
                  <h5 className="font-extrabold text-foreground text-sm flex items-center gap-1.5">
                    <PlayCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Kalimat Perintah (Imperatif)</span>
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    Diawali kata kerja perintah yang tegas dan padat untuk memandu tindakan tanpa kata berbelit.
                  </p>
                </div>
                <div className="pt-2 border-t border-border/50 text-[11px] font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-500/5 px-2.5 py-1.5 rounded-lg border border-emerald-500/20">
                  <span className="font-sans font-bold text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">Kata Kerja Aksi:</span>
                  Masukkan, Hitung, Tampilkan
                </div>
              </div>

              {/* ATURAN 3: BEBAS AMBIGUITAS (AMBER / KUNING) */}
              <div className="p-4 rounded-2xl bg-background/80 dark:bg-card border-2 border-amber-500/30 hover:border-amber-500 transition-all flex flex-col justify-between space-y-3 shadow-xs group">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 font-black text-xs flex items-center justify-center border border-amber-500/30">
                      3
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase tracking-wider border border-amber-500/20">
                      Definiteness
                    </span>
                  </div>
                  <h5 className="font-extrabold text-foreground text-sm flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Bebas Ambiguitas (Pasti)</span>
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    Langkah terdefinisi secara pasti dengan ukuran jelas, bebas makna ganda atau kata kiasan.
                  </p>
                </div>
                <div className="pt-2 border-t border-border/50 text-[11px] text-amber-800 dark:text-amber-300 bg-amber-500/5 px-2.5 py-1.5 rounded-lg border border-amber-500/20">
                  <span className="font-sans font-bold text-[10px] text-red-600 dark:text-red-400 block mb-0.5">🚫 Hindari Ambigu:</span>
                  <em>"tambahkan secukupnya"</em>
                </div>
              </div>

              {/* ATURAN 4: PERCABANGAN DALAM 1 NOMOR (UNGU) */}
              <div className="p-4 rounded-2xl bg-background/80 dark:bg-card border-2 border-purple-500/30 hover:border-purple-500 transition-all flex flex-col justify-between space-y-3 shadow-xs group">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 font-black text-xs flex items-center justify-center border border-purple-500/30">
                      4
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 uppercase tracking-wider border border-purple-500/20">
                      Percabangan
                    </span>
                  </div>
                  <h5 className="font-extrabold text-foreground text-sm flex items-center gap-1.5">
                    <GitBranch className="w-4 h-4 text-purple-500 shrink-0" />
                    <span>Blok Kondisi dalam 1 Nomor</span>
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    Struktur <em>Jika... maka:</em> dan <em>Selain itu:</em> wajib berada dalam satu nomor urut yang sama.
                  </p>
                </div>
                <div className="pt-2 border-t border-border/50 text-[11px] text-purple-800 dark:text-purple-300 bg-purple-500/5 px-2.5 py-1.5 rounded-lg border border-purple-500/20">
                  <span className="font-sans font-bold text-[10px] text-purple-600 dark:text-purple-400 block mb-0.5">Kaidah Baku:</span>
                  <em>Selain itu:</em> DILARANG bernomor baru
                </div>
              </div>

              {/* ATURAN 5: PENUTUP 'SELESAI' TANPA NOMOR (ROSE / MERAH MUDA) */}
              <div className="p-4 rounded-2xl bg-background/80 dark:bg-card border-2 border-rose-500/30 hover:border-rose-500 transition-all flex flex-col justify-between space-y-3 shadow-xs group">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 font-black text-xs flex items-center justify-center border border-rose-500/30">
                      5
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 uppercase tracking-wider border border-rose-500/20">
                      Finiteness
                    </span>
                  </div>
                  <h5 className="font-extrabold text-foreground text-sm flex items-center gap-1.5">
                    <Flag className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Penutup 'Selesai' Tanpa Nomor</span>
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    Kata akhir <strong>Selesai</strong> adalah penanda terminal berhentinya algoritma, bukan aksi bernomor.
                  </p>
                </div>
                <div className="pt-2 border-t border-border/50 text-[11px] text-rose-800 dark:text-rose-300 bg-rose-500/5 px-2.5 py-1.5 rounded-lg border border-rose-500/20 flex items-center justify-between gap-1">
                  <span className="text-emerald-700 dark:text-emerald-300 font-bold">✓ Tulis: <code>Selesai</code></span>
                  <span className="text-red-600 dark:text-red-400 font-bold">🚫 Bukan: <code>5. Selesai</code></span>
                </div>
              </div>

              {/* ATURAN 6: AGNOSTIK BAHASA PEMROGRAMAN (INDIGO / TEAL) */}
              <div className="p-4 rounded-2xl bg-background/80 dark:bg-card border-2 border-indigo-500/30 hover:border-indigo-500 transition-all flex flex-col justify-between space-y-3 shadow-xs group">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-black text-xs flex items-center justify-center border border-indigo-500/30">
                      6
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider border border-indigo-500/20">
                      Agnostik
                    </span>
                  </div>
                  <h5 className="font-extrabold text-foreground text-sm flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Bebas Sintaks Pemrograman</span>
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    Ditulis dalam bahasa alami manusia murni tanpa mencampuradukkan sintaks teknis kode mesin.
                  </p>
                </div>
                <div className="pt-2 border-t border-border/50 text-[11px] text-indigo-800 dark:text-indigo-300 bg-indigo-500/5 px-2.5 py-1.5 rounded-lg border border-indigo-500/20">
                  <span className="font-sans font-bold text-[10px] text-red-600 dark:text-red-400 block mb-0.5">🚫 Hindari Simbol:</span>
                  <code>printf</code>, <code>cin</code>, <code>;</code>, atau <code>&#123; &#125;</code>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 2. BAGIAN B: CONTOH PENERAPAN INTERAKTIF */}
        <div className="space-y-4 pt-2 border-t border-border/40">
          <h4 className="font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-lg">
            <BookOpen className="w-5 h-5" />
            Contoh Penerapan: Algoritma Naratif (Studi Kasus: Menghitung Luas Persegi Panjang)
          </h4>
          <div 
            className="bg-card dark:bg-slate-900/95 border-2 border-border dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-inner text-sm md:text-base text-slate-900 dark:text-slate-50 relative min-h-[260px] transition-transform duration-300 ease-out origin-center hover:scale-[1.2] hover:-translate-y-2 hover:z-50 dark:hover:brightness-110 hover:border-emerald-500/80 hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500/80 dark:bg-emerald-500/60 rounded-l-2xl"></div>
            
            <p className="text-slate-600 dark:text-slate-400 mb-6 italic font-mono font-medium">// Algoritma naratif untuk menghitung luas persegi panjang. <br/>(Arahkan kursor Anda ke teks untuk melihat aturan penulisan)</p>

            <div className="space-y-6 text-[15px]">
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex gap-3 items-center">
                <HoverNumber num="1" />
                <div className="text-slate-800 dark:text-slate-200 font-medium">
                  <HoverCommand word="Masukkan" /> nilai <HoverVariable name="panjang" />.
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex gap-3 items-center">
                <HoverNumber num="2" />
                <div className="text-slate-800 dark:text-slate-200 font-medium">
                  <HoverCommand word="Masukkan" /> nilai <HoverVariable name="lebar" />.
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex gap-3 items-start">
                <HoverNumber num="3" />
                <div className="text-slate-800 dark:text-slate-200 font-medium">
                  <span className="block mb-1"><HoverCommand word="Hitung" /> nilai <HoverVariable name="luas" /></span>
                  <HoverFormula formula="luas = panjang * lebar" />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex gap-3 items-center">
                <HoverNumber num="4" />
                <div className="text-slate-800 dark:text-slate-200 font-medium">
                  <HoverCommand word="Tampilkan" /> hasil <HoverVariable name="luas" /> ke layar.
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="flex gap-3 items-center pt-1">
                <div className="w-7 flex justify-center shrink-0">
                  <span className="w-2 h-2 rounded-full bg-rose-500/40 dark:bg-rose-500/30"></span>
                </div>
                <div>
                  <HoverTerminal />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 3. BAGIAN C: EVALUASI KEKUATAN & KELEMAHAN (PENUTUP) */}
        <div className="space-y-3 pt-6 border-t border-border/40">
          <h4 className="font-bold flex items-center gap-2 text-foreground text-base mb-2">
            <Cog className="w-5 h-5 text-amber-500" />
            Evaluasi Penggunaan Algoritma Deskriptif
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kekuatan */}
            <div className="bg-emerald-500/10 dark:bg-emerald-950/40 border-2 border-emerald-500/40 dark:border-emerald-500/30 rounded-2xl p-4 md:p-5 flex gap-3.5 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-extrabold text-sm md:text-base text-emerald-900 dark:text-emerald-300 mb-1.5">Kekuatan (Kelebihan):</h5>
                <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  Sangat alamiah dan mudah dipahami oleh siapa saja (termasuk orang non-teknis) karena menggunakan kalimat bahasa sehari-hari tanpa perlu memahami sintaks pemrograman.
                </p>
              </div>
            </div>

            {/* Kelemahan */}
            <div className="bg-rose-500/10 dark:bg-rose-950/40 border-2 border-rose-500/40 dark:border-rose-500/30 rounded-2xl p-4 md:p-5 flex gap-3.5 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-700 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-extrabold text-sm md:text-base text-rose-900 dark:text-rose-300 mb-1.5">Kelemahan (Kekurangan):</h5>
                <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  Cukup sulit diterjemahkan secara langsung ke dalam kode program komputer karena ketiadaan aturan sintaks yang kaku dan strukturnya yang terlalu bebas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
