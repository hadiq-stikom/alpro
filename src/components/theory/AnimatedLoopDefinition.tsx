"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Repeat, 
  RotateCw, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  Pause, 
  ArrowRight, 
  Code2, 
  Layers, 
  Cpu, 
  Timer,
  Compass
} from 'lucide-react';

export default function AnimatedLoopDefinition() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [lapCount, setLapCount] = useState(1);

  // Auto-increment lap for demonstration
  React.useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setLapCount((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 1800);
    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <div className="w-full my-8">
      {/* Container dengan zoom 1.2x standar baku */}
      <div className="relative group transition-transform duration-300 ease-out origin-center hover:scale-[1.03] md:hover:scale-[1.05] z-0 hover:z-30">
        
        {/* Glow ambient background */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-sky-500/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="relative rounded-3xl border-2 border-emerald-500/30 dark:border-emerald-500/20 bg-card dark:bg-slate-950 p-6 md:p-8 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-xs">
                <Repeat className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Konsep Inti Pemrograman (Pilar 3)
                </span>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100">
                  Hakikat &amp; Anatomi Perulangan (Looping)
                </h3>
              </div>
            </div>

            {/* Tombol Balik Kartu (Flip Button) */}
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold text-xs transition-all cursor-pointer active:scale-95 shadow-xs"
            >
              <RotateCw className="w-4 h-4" />
              <span>{isFlipped ? 'Lihat Sisi Muka (Analogi Orbit)' : 'Lihat Sisi Balik (Definite vs Indefinite)'}</span>
            </button>
          </div>

          {/* Konten 2D Bersih (Zero 3D Blur) */}
          <AnimatePresence mode="wait" initial={false}>
            {!isFlipped ? (
              <motion.div
                key="front-loop"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="pt-6 space-y-6"
              >
                {/* Deskripsi Intisari */}
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                  <strong className="text-slate-900 dark:text-slate-100 font-bold">Perulangan (Looping / Iteration)</strong> adalah struktur kontrol algoritma yang mengeksekusi sekumpulan instruksi secara berulang-ulang selama suatu syarat logis bernilai <span className="font-bold text-emerald-700 dark:text-emerald-400">BENAR (True)</span>. Tanpa perulangan, programer harus mengetik ribuan baris instruksi identik yang tidak efisien (*violating DRY principle*).
                </p>

                {/* Visual Simulator Mini: Lintasan Putaran Orbit & Counter RAM */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                  
                  {/* Sisi Kiri: Lintasan Sirkuit Putaran Animatif */}
                  <div className="lg:col-span-7 flex flex-col items-center justify-center p-4">
                    <div className="relative w-64 h-64 flex items-center justify-center">
                      
                      {/* Lintasan Lingkaran Berputar */}
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* Lingkaran Jalur Dasar */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          className="stroke-slate-200 dark:stroke-slate-800"
                          strokeWidth="8"
                          fill="none"
                        />
                        {/* Garis Kemajuan Aktif */}
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          className="stroke-emerald-500"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray="251.2"
                          strokeDashoffset={251.2 - (251.2 * lapCount) / 5}
                          strokeLinecap="round"
                          transition={{ duration: 0.4 }}
                        />
                      </svg>

                      {/* Pusat Orbit: Status Putaran */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                        <span className="text-xs font-mono font-bold text-muted-foreground uppercase">
                          Putaran Ke-
                        </span>
                        <div className="text-4xl font-black text-emerald-700 dark:text-emerald-400 font-mono my-0.5">
                          {lapCount} <span className="text-base text-slate-500 font-sans">/ 5</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                          {lapCount < 5 ? '⚡ Kondisi: True' : '🛑 Selesai (False)'}
                        </span>
                      </div>

                      {/* Titik Satelit Pelari yang Mengorbit */}
                      <motion.div
                        animate={{ rotate: (lapCount - 1) * 72 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="absolute inset-0 pointer-events-none"
                      >
                        <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg font-mono text-xs font-bold border-2 border-white dark:border-slate-950">
                          i={lapCount}
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => setIsRunning(!isRunning)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold cursor-pointer transition-colors"
                      >
                        {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{isRunning ? 'Jeda Simulasi' : 'Jalankan Orbit'}</span>
                      </button>
                      <button
                        onClick={() => setLapCount(1)}
                        className="px-3 py-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer transition-colors"
                      >
                        Reset (i = 1)
                      </button>
                    </div>
                  </div>

                  {/* Sisi Kanan: 3 Rukun Wajib Perulangan */}
                  <div className="lg:col-span-5 space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-emerald-500" />
                      <span>3 Elemen Wajib Struktur Perulangan:</span>
                    </h4>

                    <div className="p-3.5 rounded-xl bg-card border border-border/80 shadow-xs space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-300">
                        <span className="w-5 h-5 rounded-md bg-sky-500/10 flex items-center justify-center font-mono">1</span>
                        <span>Inisialisasi (Titik Awal)</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 pl-7 leading-relaxed">
                        Menetapkan nilai mula-mula variabel pencacah (contoh: <code className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">i = 1</code>).
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-card border border-border/80 shadow-xs space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-300">
                        <span className="w-5 h-5 rounded-md bg-amber-500/10 flex items-center justify-center font-mono">2</span>
                        <span>Uji Syarat (Terminasi)</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 pl-7 leading-relaxed">
                        Kondisi penentu apakah loop lanjut berputar atau berhenti (contoh: <code className="font-mono text-amber-600 dark:text-amber-400 font-bold">i &lt;= 5</code>).
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-card border border-border/80 shadow-xs space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                        <span className="w-5 h-5 rounded-md bg-emerald-500/10 flex items-center justify-center font-mono">3</span>
                        <span>Pembaruan Nilai (Update / Step)</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 pl-7 leading-relaxed">
                        Mengubah variabel pencacah setiap putaran agar mendekati kondisi berhenti (contoh: <code className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">i = i + 1</code>).
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="back-taxonomy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="pt-6 space-y-6"
              >
                {/* Sub-judul Sisi Balik */}
                <div className="space-y-1">
                  <h4 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-emerald-500" />
                    <span>Dua Taksonomi Utama: Definite vs Indefinite Iteration</span>
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Dalam ilmu komputasi, struktur perulangan dibagi menjadi dua kategori fundamental berdasarkan kepastian jumlah putarannya:
                  </p>
                </div>

                {/* Perbandingan Kartu 2 Kolom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Kolom 1: FOR Loop (Definite) */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border-2 border-emerald-500/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-500/20 font-mono">
                        FOR LOOP
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        Definite (Pasti / Terhitung)
                      </span>
                    </div>

                    <h5 className="font-black text-slate-900 dark:text-slate-100 text-base">
                      Jumlah Putaran Sudah Diketahui Pasti di Awal
                    </h5>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Digunakan ketika programmer sudah mengetahui secara eksak berapa kali aksi harus diulang sebelum perulangan dimulai (misal: 10 kali, sebanyak panjang data deret, atau dari tanggal 1 sampai 31).
                    </p>

                    <div className="p-3 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono space-y-1.5 overflow-x-auto select-none">
                      <span className="text-slate-400 block text-[10px]">// Python: range(1, 6)</span>
                      <span className="text-sky-300 font-bold">for</span> i <span className="text-sky-300 font-bold">in</span> <span className="text-amber-300">range</span>(1, 6):<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-300">print</span>(f<span className="text-emerald-300">&quot;Putaran ke-{'{i}'}&quot;</span>)
                    </div>

                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 pl-4 list-disc">
                      <li>Menggunakan fungsi generator range atau koleksi urutan.</li>
                      <li>Pencacah (*counter*) otomatis diperbarui di tiap putaran.</li>
                    </ul>
                  </div>

                  {/* Kolom 2: WHILE Loop (Indefinite) */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border-2 border-sky-500/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-300 font-bold text-xs border border-sky-500/20 font-mono">
                        WHILE LOOP
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        Indefinite (Terkondisi / Tak Tentu)
                      </span>
                    </div>

                    <h5 className="font-black text-slate-900 dark:text-slate-100 text-base">
                      Jumlah Putaran Bergantung Pada Keadaan Dinamis
                    </h5>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Digunakan ketika jumlah perulangan tidak bisa diprediksi di awal, karena bergantung pada masukan dinamis pengguna, waktu, atau kondisi data runtime (misal: mengulang selama password salah).
                    </p>

                    <div className="p-3 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono space-y-1.5 overflow-x-auto select-none">
                      <span className="text-slate-400 block text-[10px]">// Python: kondisi dinamis</span>
                      saldo = 100000<br />
                      <span className="text-sky-300 font-bold">while</span> saldo &gt; 0:<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;saldo -= belanja_harian()
                    </div>

                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 pl-4 list-disc">
                      <li>Wajib ada instruksi pembaruan manual di dalam badan loop.</li>
                      <li>Berisiko memicu *Infinite Loop* jika kondisi tidak pernah False.</li>
                    </ul>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
