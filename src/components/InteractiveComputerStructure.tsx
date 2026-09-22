"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, Monitor, Usb, Cpu, Database, Activity, Map, MousePointerClick } from 'lucide-react';

type ComponentId = 'input' | 'output' | 'ioports' | 'cpu' | 'memory' | 'dataBus' | 'addressBus' | 'controlBus' | null;

export default function InteractiveComputerStructure() {
  const [activeId, setActiveId] = useState<ComponentId>(null);

  const getDetailText = (id: ComponentId) => {
    switch(id) {
      case 'input': return { title: "Input Device", desc: "Berfungsi memasukkan data/perintah (Contoh: Keyboard, Mouse, Mic).", icon: Keyboard, color: "bg-emerald-950/80 border-emerald-500/60 text-emerald-300" };
      case 'output': return { title: "Output Device", desc: "Menampilkan hasil pengolahan data berupa hard-copy, soft-copy, atau suara.", icon: Monitor, color: "bg-rose-950/80 border-rose-500/60 text-rose-300" };
      case 'ioports': return { title: "I/O Ports", desc: "Gerbang untuk menerima/mengirim data ke luar sistem. Penghubung ke perangkat input/output.", icon: Usb, color: "bg-amber-950/80 border-amber-500/60 text-amber-300" };
      case 'cpu': return { title: "CPU (Central Processing Unit)", desc: "Otak komputer. Terdiri dari ALU (Pusat pengolah logika/aritmatika) dan CU (Pengontrol kerja komputer).", icon: Cpu, color: "bg-blue-950/80 border-blue-500/60 text-blue-300" };
      case 'memory': return { title: "Memory", desc: "Penyimpan instruksi/data. Terbagi menjadi internal (RAM, ROM) dan eksternal.", icon: Database, color: "bg-orange-950/80 border-orange-500/60 text-orange-300" };
      case 'dataBus': return { title: "Data Bus", desc: "Jalur perpindahan data (8/16/32/64 bit). Bersifat Bidirectional (dua arah) - CPU bisa baca dan tulis.", icon: Activity, color: "bg-purple-950/80 border-purple-500/60 text-purple-300" };
      case 'addressBus': return { title: "Address Bus", desc: "Jalur yang menandai alamat lokasi memori yang akan ditulis/dibaca CPU.", icon: Map, color: "bg-cyan-950/80 border-cyan-500/60 text-cyan-300" };
      case 'controlBus': return { title: "Control Bus", desc: "Sinyal untuk mengontrol penggunaan serta akses ke Data Bus dan Address Bus.", icon: Activity, color: "bg-pink-950/80 border-pink-500/60 text-pink-300" };
      default: return { title: "Arahkan Kursor", desc: "Hover komponen di atas untuk melihat detail.", icon: MousePointerClick, color: "bg-slate-800/80 border-slate-700 text-slate-200" };
    }
  };

  const activeDetail = getDetailText(activeId);
  const DetailIcon = activeDetail.icon;

  return (
    <div className="w-full bg-slate-950 dark:bg-[#0d1526] p-6 rounded-2xl border border-blue-500/30 shadow-xl relative flex flex-col items-center">
      
      {/* Title */}
      <h3 className="text-xl font-bold text-center text-blue-200 mb-8 tracking-wider">ARSITEKTUR SISTEM KOMPUTER</h3>

      {/* Main Diagram Area */}
      <div className="relative w-full max-w-2xl h-80 flex items-center justify-between z-10">
        
        {/* BUS LINES SVG - IN BACKGROUND */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
           {/* Data Bus (Top) */}
           <path d="M 120 40 L 520 40" stroke="rgb(168 85 247 / 0.5)" strokeWidth="8" fill="none" />
           {/* Address Bus (Bottom) */}
           <path d="M 120 280 L 520 280" stroke="rgb(6 182 212 / 0.5)" strokeWidth="8" fill="none" />
           {/* Vertical links for CPU */}
           <path d="M 320 40 L 320 100" stroke="rgb(168 85 247 / 0.5)" strokeWidth="4" />
           <path d="M 320 280 L 320 220" stroke="rgb(6 182 212 / 0.5)" strokeWidth="4" />
        </svg>

        {/* Hover zones for buses */}
        <div 
          className="absolute top-4 left-32 right-32 h-10 flex items-center justify-center cursor-pointer group z-0"
          onMouseEnter={() => setActiveId('dataBus')} onMouseLeave={() => setActiveId(null)}
        >
           <span className="text-[10px] bg-slate-900/90 px-2 py-0.5 rounded border border-purple-500/50 text-purple-300 font-bold group-hover:bg-purple-500/30 transition-colors">DATA BUS ⟷</span>
        </div>
        <div 
          className="absolute bottom-4 left-32 right-32 h-10 flex items-center justify-center cursor-pointer group z-0"
          onMouseEnter={() => setActiveId('addressBus')} onMouseLeave={() => setActiveId(null)}
        >
           <span className="text-[10px] bg-slate-900/90 px-2 py-0.5 rounded border border-cyan-500/50 text-cyan-300 font-bold group-hover:bg-cyan-500/30 transition-colors">ADDRESS BUS ⟶</span>
        </div>

        {/* COLUMN 1: Input / Output */}
        <div className="flex flex-col justify-between h-56 w-24 gap-4 z-10">
          <motion.div 
            className={`flex-1 flex flex-col items-center justify-center gap-2 rounded-xl border-2 transition-colors cursor-pointer ${activeId === 'input' ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-slate-900 border-emerald-500/40'}`}
            onMouseEnter={() => setActiveId('input')} onMouseLeave={() => setActiveId(null)}
            whileHover={{ scale: 1.05 }}
          >
            <Keyboard className={`w-6 h-6 ${activeId === 'input' ? 'text-emerald-400' : 'text-emerald-400/60'}`} />
            <span className="text-[9px] font-bold text-emerald-200 text-center leading-tight">INPUT<br/>DEVICE</span>
          </motion.div>
          <motion.div 
            className={`flex-1 flex flex-col items-center justify-center gap-2 rounded-xl border-2 transition-colors cursor-pointer ${activeId === 'output' ? 'bg-rose-500/20 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 'bg-slate-900 border-rose-500/40'}`}
            onMouseEnter={() => setActiveId('output')} onMouseLeave={() => setActiveId(null)}
            whileHover={{ scale: 1.05 }}
          >
            <Monitor className={`w-6 h-6 ${activeId === 'output' ? 'text-rose-400' : 'text-rose-400/60'}`} />
            <span className="text-[9px] font-bold text-rose-200 text-center leading-tight">OUTPUT<br/>DEVICE</span>
          </motion.div>
        </div>

        {/* COLUMN 2: I/O PORTS */}
        <motion.div 
          className={`h-40 w-20 flex flex-col items-center justify-center gap-2 rounded-xl border-2 transition-colors cursor-pointer z-10 relative ${activeId === 'ioports' ? 'bg-amber-500/20 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-slate-900 border-amber-500/40'}`}
          onMouseEnter={() => setActiveId('ioports')} onMouseLeave={() => setActiveId(null)}
          whileHover={{ scale: 1.05 }}
        >
           {/* Horizontal connection lines to I/O */}
           <div className="absolute -left-12 top-10 w-12 h-px bg-amber-500/40 border-t border-dashed border-amber-500/60" />
           <div className="absolute -left-12 bottom-10 w-12 h-px bg-amber-500/40 border-t border-dashed border-amber-500/60" />
           
           <Usb className={`w-6 h-6 ${activeId === 'ioports' ? 'text-amber-400' : 'text-amber-400/60'}`} />
           <span className="text-[10px] font-bold text-amber-200 text-center">I/O<br/>PORTS</span>
        </motion.div>

        {/* Control Bus Line (Middle) */}
        <div 
          className="h-px bg-pink-500/50 border-t border-dashed border-pink-500/70 flex-1 relative flex items-center justify-center cursor-pointer group z-10"
          onMouseEnter={() => setActiveId('controlBus')} onMouseLeave={() => setActiveId(null)}
        >
          <span className="text-[9px] bg-slate-900/90 px-1.5 py-0.5 rounded absolute -top-4 text-pink-300 font-bold group-hover:bg-pink-500/30 border border-pink-500/30">CONTROL BUS</span>
        </div>

        {/* COLUMN 3: CPU */}
        <motion.div 
          className={`h-48 w-32 flex flex-col items-center justify-between p-2 rounded-xl border-2 transition-colors cursor-pointer z-10 bg-slate-900 ${activeId === 'cpu' ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'border-blue-500/40'}`}
          onMouseEnter={() => setActiveId('cpu')} onMouseLeave={() => setActiveId(null)}
          whileHover={{ scale: 1.05 }}
        >
           <span className="text-xs font-bold text-blue-200 mt-2">CPU</span>
           <Cpu className={`w-8 h-8 ${activeId === 'cpu' ? 'text-blue-400' : 'text-blue-400/60'}`} />
           
           <div className="flex gap-2 w-full mt-2">
             <div className="flex-1 bg-slate-950/80 border border-blue-500/40 rounded py-2 text-center text-[10px] font-bold text-blue-200">ALU</div>
             <div className="flex-1 bg-slate-950/80 border border-blue-500/40 rounded py-2 text-center text-[10px] font-bold text-blue-200">CU</div>
           </div>
        </motion.div>

        {/* Control Bus Line 2 (Middle) */}
        <div 
          className="h-px bg-pink-500/50 border-t border-dashed border-pink-500/70 flex-1 relative flex items-center justify-center cursor-pointer group z-10"
          onMouseEnter={() => setActiveId('controlBus')} onMouseLeave={() => setActiveId(null)}
        >
          <span className="text-[9px] bg-slate-900/90 px-1.5 py-0.5 rounded absolute -top-4 text-pink-300 font-bold group-hover:bg-pink-500/30 border border-pink-500/30">CONTROL BUS</span>
        </div>

        {/* COLUMN 4: MEMORY */}
        <motion.div 
          className={`h-48 w-24 flex flex-col items-center justify-center gap-2 rounded-xl border-2 transition-colors cursor-pointer z-10 relative ${activeId === 'memory' ? 'bg-orange-500/20 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'bg-slate-900 border-orange-500/40'}`}
          onMouseEnter={() => setActiveId('memory')} onMouseLeave={() => setActiveId(null)}
          whileHover={{ scale: 1.05 }}
        >
           {/* Vertical links for Memory to buses */}
           <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-1 h-12 bg-purple-500/40" />
           <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-1 h-12 bg-cyan-500/40" />

           <Database className={`w-8 h-8 ${activeId === 'memory' ? 'text-orange-400' : 'text-orange-400/60'}`} />
           <span className="text-[11px] font-bold text-orange-200 text-center">MEMORY</span>
        </motion.div>

      </div>

      {/* DETAIL PANEL (DYNAMIC) */}
      <div className={`mt-8 w-full max-w-2xl rounded-xl p-4 flex items-start gap-4 transition-all duration-300 border ${activeDetail.color}`}>
         <div className="p-3 rounded-lg bg-slate-900/80 shrink-0">
           <DetailIcon className="w-6 h-6" />
         </div>
         <div>
           <h4 className="font-bold text-sm mb-1 text-slate-100">{activeDetail.title}</h4>
           <p className="text-sm text-slate-200 leading-relaxed font-medium">{activeDetail.desc}</p>
         </div>
      </div>

    </div>
  );
}
