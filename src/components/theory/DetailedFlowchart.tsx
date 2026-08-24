"use client";

import React, { useState } from 'react';
import { GitCommit, Circle, Square, Hexagon, ArrowRight, Cog, LayoutGrid, RectangleHorizontal, RotateCw, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const FlipCard = ({ sym }: { sym: any }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`relative z-0 hover:z-50 w-full h-full min-h-[200px] cursor-pointer group/flip hover:scale-[1.45] sm:hover:scale-[1.5] transition-all duration-300 ease-out origin-center ${
        sym.fullWidth ? 'sm:col-span-2' : ''
      }`}
      style={{ perspective: 1000, textRendering: 'geometricPrecision' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative grid"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Bagian Depan */}
        <div 
          className={`col-start-1 row-start-1 w-full p-5 rounded-xl border-2 bg-slate-900/95 dark:bg-slate-950 flex flex-col items-center text-center gap-3 ${sym.color} shadow-md group-hover/flip:shadow-[0_15px_35px_rgba(0,0,0,0.6)] group-hover/flip:brightness-125 transition-all duration-300 antialiased`}
          style={{ backfaceVisibility: "hidden", transform: "translateZ(0)", textRendering: "geometricPrecision", WebkitFontSmoothing: "antialiased" }}
        >
          <div className="absolute top-3 right-3 text-emerald-400/50 group-hover/flip:text-emerald-400 group-hover/flip:rotate-90 transition-all duration-300">
            <RotateCw className="w-4 h-4" />
          </div>

          <div className="h-14 flex items-center justify-center filter group-hover/flip:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
            {sym.icon}
          </div>
          <div>
            <h5 className="font-bold text-sm text-slate-100 mb-2 group-hover/flip:text-white">{sym.name}</h5>
            <p className="text-[11px] text-slate-300 leading-relaxed font-medium group-hover/flip:text-slate-100">{sym.desc}</p>
          </div>
        </div>

        {/* Bagian Belakang */}
        <div 
          className="col-start-1 row-start-1 w-full p-5 rounded-xl border-2 border-emerald-500/70 bg-slate-950 text-slate-100 shadow-2xl group-hover/flip:shadow-[0_15px_35px_rgba(16,185,129,0.3)] group-hover/flip:brightness-125 flex flex-col items-center justify-center antialiased"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg) translateZ(0)", textRendering: "geometricPrecision", WebkitFontSmoothing: "antialiased" }}
        >
          <div className="absolute top-3 right-3 text-emerald-500/40 group-hover/flip:text-emerald-500 group-hover/flip:-rotate-90 transition-all duration-300 z-10">
            <RotateCw className="w-4 h-4" />
          </div>
          
          <span className="text-[10px] text-emerald-400 mb-4 font-semibold tracking-wider border-b border-emerald-500/30 pb-1 px-4 text-center">CONTOH PENERAPAN</span>
          <div className="flex-1 flex items-center justify-center w-full">
            {sym.example}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function DetailedFlowchart() {
  const symbols = [
    {
      name: "Terminator",
      icon: <div className="w-20 h-8 px-2.5 rounded-[2rem] border-2 border-emerald-500 bg-emerald-500/20 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.3)]"><span className="text-[10px] font-bold text-emerald-400">START/STOP</span></div>,
      desc: "Menandakan titik awal atau akhir dari sebuah algoritma.",
      color: "border-emerald-500/30",
      example: (
        <div className="flex flex-col items-center gap-0">
          <div className="px-3 py-1 rounded-full border border-emerald-500 bg-emerald-500/20 text-[10px] text-emerald-400 font-bold">START</div>
          <div className="flex flex-col items-center -my-0.5 z-10">
            <div className="w-[1.5px] h-2.5 bg-slate-400"></div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 rotate-90 -mt-1.5" />
          </div>
          <div className="px-3 py-1 rounded-full border border-emerald-500 bg-emerald-500/20 text-[10px] text-emerald-400 font-bold">STOP</div>
        </div>
      )
    },
    {
      name: "Input / Output",
      icon: <div className="w-20 h-8 px-2.5 border-2 border-blue-500 bg-blue-500/20 skew-x-[-20deg] flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.3)]"><span className="text-[10px] font-bold text-blue-400 skew-x-[20deg]">I/O</span></div>,
      desc: "Operasi membaca data (Input) atau menampilkan data (Output).",
      color: "border-blue-500/30",
      example: (
        <div className="flex flex-col items-center gap-0">
          {/* Arrow from above */}
          <div className="flex flex-col items-center -mb-0.5 z-10 opacity-70">
            <div className="w-[1.5px] h-2 bg-slate-400"></div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 rotate-90 -mt-1.5" />
          </div>

          <div className="group/io relative cursor-pointer px-4 py-1.5 border border-blue-500 bg-blue-500/20 skew-x-[-15deg] text-[10px] text-blue-400 font-bold">
            <span className="block skew-x-[15deg] group-hover/io:hidden text-center leading-tight">IN(panjang)<br/>IN(lebar)</span>
            <span className="hidden group-hover/io:block skew-x-[15deg] text-center text-emerald-300 font-extrabold">IN(panjang, lebar)</span>
          </div>

          <div className="flex flex-col items-center -my-0.5 z-10">
            <div className="w-[1.5px] h-2.5 bg-slate-400"></div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 rotate-90 -mt-1.5" />
          </div>

          <div className="px-4 py-1 border border-blue-500 bg-blue-500/20 skew-x-[-15deg] text-[10px] text-blue-400 font-bold"><span className="block skew-x-[15deg]">OUT(luas)</span></div>

          {/* Arrow to below */}
          <div className="flex flex-col items-center -mt-0.5 z-10 opacity-70">
            <div className="w-[1.5px] h-2 bg-slate-400"></div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 rotate-90 -mt-1.5" />
          </div>
        </div>
      )
    },
    {
      name: "Process",
      icon: <div className="w-20 h-8 px-2.5 border-2 border-amber-500 bg-amber-500/20 flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.3)]"><span className="text-[10px] font-bold text-amber-400">PROSES</span></div>,
      desc: "Menandakan proses perhitungan, pengolahan data, atau assignment variabel.",
      color: "border-amber-500/30",
      example: (
        <div className="flex flex-col items-center gap-0">
          {/* Arrow from above */}
          <div className="flex flex-col items-center -mb-0.5 z-10 opacity-70">
            <div className="w-[1.5px] h-2 bg-slate-400"></div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 rotate-90 -mt-1.5" />
          </div>

          <div className="px-2.5 py-1 border border-amber-500 bg-amber-500/20 text-[9px] sm:text-[10px] text-amber-400 font-bold whitespace-nowrap">luas = panjang * lebar</div>

          {/* Arrow to below */}
          <div className="flex flex-col items-center -mt-0.5 z-10 opacity-70">
            <div className="w-[1.5px] h-2 bg-slate-400"></div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 rotate-90 -mt-1.5" />
          </div>
        </div>
      )
    },
    {
      name: "Decision",
      icon: <div className="w-12 h-12 border-2 border-purple-500 bg-purple-500/20 rotate-45 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.3)]"><span className="text-[10px] font-bold text-purple-400 -rotate-45">IF</span></div>,
      desc: "Titik percabangan (Ya/Tidak) berdasarkan suatu kondisi/evaluasi logika.",
      color: "border-purple-500/30",
      example: (
        <div className="flex flex-col items-center justify-center w-full py-1">
          <svg viewBox="0 0 370 215" className="w-full max-w-[370px] h-auto overflow-visible">
            <defs>
              <marker id="arrow-slate" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#94a3b8" />
              </marker>
              <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#34d399" />
              </marker>
              <marker id="arrow-rose" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f87171" />
              </marker>
            </defs>

            {/* 1. Panah Masuk dari Atas ke Ujung Belah Ketupat */}
            <line x1="150" y1="2" x2="150" y2="20" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />

            {/* 2. Belah Ketupat Decision */}
            <polygon points="150,20 185,50 150,80 115,50" fill="rgba(168,85,247,0.25)" stroke="#a855f7" strokeWidth="2" />
            <text x="150" y="53" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#e9d5ff">luas &gt; 0?</text>

            {/* 3. Cabang Ya (Ke Bawah) */}
            <text x="142" y="93" textAnchor="end" fontSize="10" fontWeight="bold" fill="#34d399">Ya</text>
            <line x1="150" y1="80" x2="150" y2="102" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrow-emerald)" />

            {/* Box Proses Logika Benar (X: 85 -> 215) */}
            <rect x="85" y="102" width="130" height="28" rx="5" fill="rgba(245,158,11,0.25)" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="150" y="119" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fcd34d">Proses logika benar</text>

            {/* Panah dari Proses Benar ke Connector A (dari atas) */}
            <line x1="150" y1="130" x2="150" y2="154" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />

            {/* 4. Cabang Tidak (Ke Kanan lalu ke Bawah) */}
            <text x="198" y="44" fontSize="10" fontWeight="bold" fill="#f87171">Tidak</text>
            <line x1="185" y1="50" x2="290" y2="50" stroke="#f87171" strokeWidth="1.5" />
            <line x1="290" y1="50" x2="290" y2="102" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#arrow-rose)" />

            {/* Box Proses Logika Salah (X: 230 -> 350) */}
            <rect x="230" y="102" width="120" height="28" rx="5" fill="rgba(245,158,11,0.25)" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="290" y="119" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fcd34d">Proses logika salah</text>

            {/* Garis dari Proses Salah turun lalu menekuk ke kiri masuk ke Connector A dari samping */}
            <line x1="290" y1="130" x2="290" y2="170" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="290" y1="170" x2="166" y2="170" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />

            {/* 5. Connector A */}
            <circle cx="150" cy="170" r="14" fill="rgba(6,182,212,0.25)" stroke="#06b6d4" strokeWidth="2" />
            <text x="150" y="174" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#67e8f9">A</text>

            {/* 6. Panah Keluar ke Bawah dari Connector A */}
            <line x1="150" y1="184" x2="150" y2="206" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />
          </svg>
        </div>
      )
    },
    {
      name: "Preparation (Looping FOR)",
      icon: (
        <div 
          className="w-20 h-8 border-2 border-emerald-500 bg-emerald-500/20 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.3)] text-[10px] font-bold text-emerald-400"
          style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)' }}
        >
          FOR
        </div>
      ),
      desc: "Menandakan inisialisasi dan penentuan variabel kontrol perulangan (terutamanya struktur perulangan FOR).",
      color: "border-emerald-500/30",
      example: (
        <div className="flex flex-col items-center justify-center w-full py-1">
          <svg viewBox="0 0 370 205" className="w-full max-w-[370px] h-auto overflow-visible">
            <defs>
              <marker id="arrow-slate" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#94a3b8" />
              </marker>
              <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#34d399" />
              </marker>
              <marker id="arrow-rose" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f87171" />
              </marker>
            </defs>

            {/* 1. Panah Masuk dari Atas ke Top Hexagon */}
            <line x1="150" y1="2" x2="150" y2="27" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />

            {/* 2. Hexagon Preparation i = 1 TO 10 */}
            <polygon points="100,27 200,27 220,45 200,63 100,63 80,45" fill="rgba(16,185,129,0.25)" stroke="#10b981" strokeWidth="2" />
            <text x="150" y="49" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6ee7b7">i = 1 TO 10</text>

            {/* 3. Cabang Masuk ke Tubuh Loop (Ulangi) */}
            <text x="157" y="78" fontSize="9" fontWeight="bold" fill="#34d399">Ulangi</text>
            <line x1="150" y1="63" x2="150" y2="88" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrow-emerald)" />

            {/* Box Tubuh Loop OUT(i) */}
            <rect x="90" y="88" width="120" height="28" rx="5" fill="rgba(245,158,11,0.25)" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="150" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fcd34d">OUT(i)</text>

            {/* 4. Jalur Putar Balik (Next i) dari bawah OUT(i) kembali ke Hexagon */}
            <line x1="150" y1="116" x2="150" y2="132" stroke="#34d399" strokeWidth="1.5" />
            <line x1="150" y1="132" x2="45" y2="132" stroke="#34d399" strokeWidth="1.5" />
            <line x1="45" y1="132" x2="45" y2="45" stroke="#34d399" strokeWidth="1.5" />
            <line x1="45" y1="45" x2="74" y2="45" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrow-emerald)" />
            <text x="40" y="85" textAnchor="end" fontSize="9" fontWeight="bold" fill="#34d399">Next i</text>

            {/* 5. Cabang Selesai Loop (Ke Kanan lalu ke Connector A) */}
            <text x="226" y="38" fontSize="9" fontWeight="bold" fill="#f87171">Selesai</text>
            <line x1="220" y1="45" x2="290" y2="45" stroke="#f87171" strokeWidth="1.5" />
            <line x1="290" y1="45" x2="290" y2="155" stroke="#f87171" strokeWidth="1.5" />
            <line x1="290" y1="155" x2="166" y2="155" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />

            {/* 6. Connector A */}
            <circle cx="150" cy="155" r="14" fill="rgba(6,182,212,0.25)" stroke="#06b6d4" strokeWidth="2" />
            <text x="150" y="159" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#67e8f9">A</text>

            {/* 7. Panah Keluar ke Bawah dari Connector A */}
            <line x1="150" y1="169" x2="150" y2="195" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-slate)" />
          </svg>
        </div>
      )
    },
    {
      name: "Predefined Process (Function)",
      icon: <div className="w-20 h-8 px-2.5 border-2 border-rose-500 bg-rose-500/20 flex items-center justify-between shadow-[0_0_10px_rgba(244,63,94,0.3)] relative">
        <div className="w-[2px] h-full bg-rose-500/80 absolute left-2"></div>
        <div className="w-[2px] h-full bg-rose-500/80 absolute right-2"></div>
        <span className="text-[10px] font-bold text-rose-400 w-full text-center">FUNC</span>
      </div>,
      desc: "Menandakan pemanggilan subprogram, fungsi, atau prosedur lain yang terpisah.",
      color: "border-rose-500/30",
      example: (
        <div className="flex flex-col items-center gap-0">
          {/* Arrow from above */}
          <div className="flex flex-col items-center -mb-0.5 z-10 opacity-70">
            <div className="w-[1.5px] h-2 bg-slate-400"></div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 rotate-90 -mt-1.5" />
          </div>

          <div className="px-4 py-1 border border-rose-500 bg-rose-500/20 relative text-[10px] text-rose-400 font-bold">
            <div className="w-[2px] h-full bg-rose-500/80 absolute left-1.5 top-0"></div>
            <div className="w-[2px] h-full bg-rose-500/80 absolute right-1.5 top-0"></div>
            HitungDiskon()
          </div>

          {/* Arrow to below */}
          <div className="flex flex-col items-center -mt-0.5 z-10 opacity-70">
            <div className="w-[1.5px] h-2 bg-slate-400"></div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 rotate-90 -mt-1.5" />
          </div>
        </div>
      )
    },
    {
      name: "On-Page Connector",
      icon: <div className="w-10 h-10 rounded-full border-2 border-cyan-500 bg-cyan-500/20 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)]"><span className="text-[10px] font-bold text-cyan-400">A</span></div>,
      desc: "Menghubungkan bagian flowchart yang terpisah namun masih berada pada halaman yang sama.",
      color: "border-cyan-500/30",
      example: (
        <div className="flex flex-col items-center gap-0">
          <div className="flex flex-col items-center -my-0.5 z-10">
            <div className="w-[1.5px] h-2.5 bg-slate-400"></div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 rotate-90 -mt-1.5" />
          </div>
          <div className="w-6 h-6 rounded-full border border-cyan-500 bg-cyan-500/20 flex items-center justify-center"><span className="text-[10px] text-cyan-400 font-bold">A</span></div>
          <span className="text-[9px] text-slate-400 mt-1">(Lanjut ke A)</span>
        </div>
      )
    },
    {
      name: "Off-Page Connector",
      icon: <div className="w-10 h-12 border-2 border-indigo-500 bg-indigo-500/20 flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.3)]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}><span className="text-[10px] font-bold text-indigo-400 mb-1">1</span></div>,
      desc: "Menghubungkan bagian flowchart yang terpisah dan berada pada halaman yang berbeda.",
      color: "border-indigo-500/30",
      example: (
        <div className="flex flex-col items-center gap-0">
          <div className="flex flex-col items-center -my-0.5 z-10">
            <div className="w-[1.5px] h-2.5 bg-slate-400"></div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 rotate-90 -mt-1.5" />
          </div>
          <div className="w-6 h-8 border border-indigo-500 bg-indigo-500/20 flex items-center justify-center" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}><span className="text-[10px] text-indigo-400 mb-1 font-bold">1</span></div>
          <span className="text-[9px] text-slate-400 mt-1">(Ke Hal. Lain)</span>
        </div>
      )
    },
    {
      name: "Flow Line",
      fullWidth: true,
      icon: (
        <div className="w-20 h-8 flex items-center justify-center gap-1.5 text-slate-400">
          <ArrowRight className="w-4 h-4" />
          <ArrowRight className="w-4 h-4 rotate-90" />
          <ArrowRight className="w-4 h-4 rotate-180" />
          <ArrowRight className="w-4 h-4 -rotate-90" />
        </div>
      ),
      desc: "Tanda panah yang menunjukkan arah aliran eksekusi program (dapat mengalir ke bawah, kanan, kiri, maupun berbalik ke atas).",
      color: "border-slate-500/30",
      example: (
        <div className="flex flex-col items-center justify-center gap-2 py-1">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-[340px] text-[10px] font-bold">
            {/* 1. Bawah (Sekuensial) */}
            <div className="flex items-center justify-between bg-slate-800/80 px-2 py-1.5 rounded border border-slate-700">
              <span className="text-slate-300">Sekuensial</span>
              <div className="flex items-center gap-1 text-emerald-400">
                <ArrowRight className="w-3.5 h-3.5 rotate-90 shrink-0" />
              </div>
            </div>

            {/* 2. Kanan (Percabangan) */}
            <div className="flex items-center justify-between bg-slate-800/80 px-2 py-1.5 rounded border border-slate-700">
              <span className="text-slate-300">Cabang</span>
              <div className="flex items-center gap-1 text-blue-400">
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </div>
            </div>

            {/* 3. Kiri (Connector) */}
            <div className="flex items-center justify-between bg-slate-800/80 px-2 py-1.5 rounded border border-slate-700">
              <span className="text-slate-300">Connector</span>
              <div className="flex items-center gap-1 text-purple-400">
                <ArrowRight className="w-3.5 h-3.5 rotate-180 shrink-0" />
              </div>
            </div>

            {/* 4. Atas (Looping / Berbalik) */}
            <div className="flex items-center justify-between bg-slate-800/80 px-2 py-1.5 rounded border border-slate-700">
              <span className="text-slate-300">Looping</span>
              <div className="flex items-center gap-1 text-amber-400">
                <ArrowRight className="w-3.5 h-3.5 -rotate-90 shrink-0" />
              </div>
            </div>
          </div>
          <p className="text-[9px] text-slate-400 italic text-center">
            Arah panah menentukan arah aliran eksekusi program.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="bg-secondary/10 border border-border/50 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
      <div className="flex items-center gap-4 border-b border-border/50 pb-4">
        <div className="p-3 bg-blue-500/20 rounded-xl text-blue-500 shadow-inner">
          <GitCommit className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-blue-500">2. Flowchart (Diagram Alir)</h3>
          <p className="text-muted-foreground text-sm mt-1">Menyajikan algoritma dengan simbol geometris untuk menggambarkan alur logika secara visual.</p>
        </div>
      </div>

      <div className="space-y-8 pt-2">
        {/* 1. BAGIAN A: TEORI & PENJELASAN */}
        <div className="space-y-4">
          <p className="text-foreground leading-relaxed">
            <strong>Flowchart (Diagram Alir)</strong> adalah representasi grafis atau bagan dari suatu algoritma yang mendeskripsikan urutan langkah-langkah penyelesaian masalah. Setiap langkah direpresentasikan menggunakan <strong>simbol-simbol geometri yang terstandarisasi</strong>.
          </p>
          <p className="text-foreground leading-relaxed">
            Dalam konteks rekayasa perangkat lunak, flowchart berfungsi sebagai instrumen pemodelan visual yang krusial untuk menganalisis, merancang, dan mendokumentasikan alur logika sebuah program sebelum ditranslasikan ke dalam sintaks bahasa pemrograman.
          </p>
        </div>

        {/* 2. BAGIAN B: KAMUS SIMBOL STANDAR FLOWCHART */}
        <div className="space-y-4 pt-2 border-t border-border/40">
          <h4 className="font-bold flex items-center gap-2 text-blue-500 text-lg">
            <LayoutGrid className="w-5 h-5" />
            Simbol Standar Flowchart
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {symbols.map((sym, idx) => (
              <FlipCard key={idx} sym={sym} />
            ))}
          </div>
        </div>

        {/* 3. BAGIAN C: CONTOH FLOWCHART UTUH */}
        <div className="space-y-4 pt-4 border-t border-border/40">
          <h4 className="font-bold flex items-center gap-2 text-blue-500 text-lg">
            <GitCommit className="w-5 h-5" />
            Contoh Penerapan Flowchart Utuh (Studi Kasus: Menghitung Luas Persegi Panjang)
          </h4>
          
          <div 
            className="bg-slate-900 border-2 border-slate-800 rounded-2xl p-6 md:p-8 shadow-inner font-mono text-sm text-slate-300 relative min-h-[380px] flex flex-col items-center justify-center gap-4 transition-all duration-300 ease-out origin-center hover:scale-[1.5] hover:z-50 hover:brightness-125 hover:border-blue-500/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] cursor-pointer antialiased"
            style={{ transform: "translateZ(0)", textRendering: "geometricPrecision", WebkitFontSmoothing: "antialiased" }}
          >
            <p className="text-slate-500 absolute top-4 left-6 italic text-left w-full">// Contoh: Flowchart Menghitung Luas (Arahkan kursor untuk memperbesar)</p>
            
            <div className="flex flex-col items-center gap-0 mt-6">
              {/* Start */}
              <div className="px-6 py-2 rounded-full border-2 border-emerald-500 bg-emerald-500/20 text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]">START</div>
              <div className="flex flex-col items-center -my-0.5 z-10">
                <div className="w-[2px] h-3 bg-slate-400"></div>
                <ArrowRight className="w-4 h-4 text-slate-400 rotate-90 -mt-1.5" />
              </div>
              
              {/* Input */}
              <div className="group/in relative cursor-pointer px-6 py-2 border-2 border-blue-500 bg-blue-500/20 text-blue-400 font-bold skew-x-[-15deg] shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all">
                <span className="block skew-x-[15deg] group-hover/in:hidden text-center leading-tight">
                  IN(panjang)<br />IN(lebar)
                </span>
                <span className="hidden group-hover/in:block skew-x-[15deg] text-center text-emerald-300 font-extrabold">
                  IN(panjang, lebar)
                </span>
              </div>
              <div className="flex flex-col items-center -my-0.5 z-10">
                <div className="w-[2px] h-3 bg-slate-400"></div>
                <ArrowRight className="w-4 h-4 text-slate-400 rotate-90 -mt-1.5" />
              </div>
              
              {/* Process */}
              <div className="px-6 py-2 border-2 border-amber-500 bg-amber-500/20 text-amber-400 font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)] whitespace-nowrap">
                luas = panjang * lebar
              </div>
              <div className="flex flex-col items-center -my-0.5 z-10">
                <div className="w-[2px] h-3 bg-slate-400"></div>
                <ArrowRight className="w-4 h-4 text-slate-400 rotate-90 -mt-1.5" />
              </div>
              
              {/* Output */}
              <div className="px-6 py-2 border-2 border-blue-500 bg-blue-500/20 text-blue-400 font-bold skew-x-[-15deg] shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <span className="block skew-x-[15deg]">OUT(luas)</span>
              </div>
              <div className="flex flex-col items-center -my-0.5 z-10">
                <div className="w-[2px] h-3 bg-slate-400"></div>
                <ArrowRight className="w-4 h-4 text-slate-400 rotate-90 -mt-1.5" />
              </div>

              {/* End */}
              <div className="px-6 py-2 rounded-full border-2 border-emerald-500 bg-emerald-500/20 text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]">STOP</div>
            </div>
          </div>
        </div>

        {/* 4. BAGIAN D: EVALUASI KEKUATAN & KELEMAHAN FLOWCHART (PENUTUP) */}
        <div className="space-y-3 pt-6 border-t border-border/40">
          <h4 className="font-bold flex items-center gap-2 text-foreground text-base mb-2">
            <Cog className="w-5 h-5 text-amber-500" />
            Evaluasi Penggunaan Flowchart
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
                  Sangat efektif untuk menggambarkan alur logika percabangan (IF) dan perulangan (Looping) yang rumit secara visual. Titik awal, urutan eksekusi, hingga titik akhir dapat dilacak dengan jelas oleh siapapun.
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
                  Kurang praktis untuk program kompleks berukuran besar karena membutuhkan ruang yang sangat luas, serta relatif rumit diperbarui (*maintenance*) jika terjadi modifikasi pada struktur logika program.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
