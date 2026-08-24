"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, Monitor, Usb, Cpu, Database, Activity, Map, MousePointerClick } from 'lucide-react';

type ComponentId = 'input' | 'output' | 'ioports' | 'cpu' | 'memory' | 'dataBus' | 'addressBus' | 'controlBus' | null;

export default function InteractiveComputerStructure() {
  const [activeId, setActiveId] = useState<ComponentId>(null);

  const getDetailText = (id: ComponentId) => {
    switch(id) {
      case 'input': return { title: "Input Device", desc: "Berfungsi memasukkan data/perintah (Contoh: Keyboard, Mouse, Mic).", icon: Keyboard, color: "bg-green-500/20 border-green-500/50 text-green-400" };
      case 'output': return { title: "Output Device", desc: "Menampilkan hasil pengolahan data berupa hard-copy, soft-copy, atau suara.", icon: Monitor, color: "bg-red-500/20 border-red-500/50 text-red-400" };
      case 'ioports': return { title: "I/O Ports", desc: "Gerbang untuk menerima/mengirim data ke luar sistem. Penghubung ke perangkat input/output.", icon: Usb, color: "bg-yellow-500/20 border-yellow-500/50 text-yellow-400" };
      case 'cpu': return { title: "CPU (Central Processing Unit)", desc: "Otak komputer. Terdiri dari ALU (Pusat pengolah logika/aritmatika) dan CU (Pengontrol kerja komputer).", icon: Cpu, color: "bg-blue-500/20 border-blue-500/50 text-blue-400" };
      case 'memory': return { title: "Memory", desc: "Penyimpan instruksi/data. Terbagi menjadi internal (RAM, ROM) dan eksternal.", icon: Database, color: "bg-orange-500/20 border-orange-500/50 text-orange-400" };
      case 'dataBus': return { title: "Data Bus", desc: "Jalur perpindahan data (8/16/32/64 bit). Bersifat Bidirectional (dua arah) - CPU bisa baca dan tulis.", icon: Activity, color: "bg-purple-500/20 border-purple-500/50 text-purple-400" };
      case 'addressBus': return { title: "Address Bus", desc: "Jalur yang menandai alamat lokasi memori yang akan ditulis/dibaca CPU.", icon: Map, color: "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" };
      case 'controlBus': return { title: "Control Bus", desc: "Sinyal untuk mengontrol penggunaan serta akses ke Data Bus dan Address Bus.", icon: Activity, color: "bg-pink-500/20 border-pink-500/50 text-pink-400" };
      default: return { title: "Arahkan Kursor", desc: "Hover komponen di atas untuk melihat detail.", icon: MousePointerClick, color: "bg-muted/10 border-muted/20 text-muted-foreground" };
    }
  };

  const activeDetail = getDetailText(activeId);
  const DetailIcon = activeDetail.icon;

  return (
    <div className="w-full bg-[#0d1526] p-6 rounded-2xl border border-blue-500/20 shadow-lg relative flex flex-col items-center">
      
      {/* Title */}
      <h3 className="text-xl font-bold text-center text-blue-100 mb-8 tracking-wider">ARSITEKTUR SISTEM KOMPUTER</h3>

      {/* Main Diagram Area */}
      <div className="relative w-full max-w-2xl h-80 flex items-center justify-between z-10">
        
        {/* BUS LINES SVG - IN BACKGROUND */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
           {/* Data Bus (Top) */}
           <path d="M 120 40 L 520 40" stroke="rgb(168 85 247 / 0.4)" strokeWidth="8" fill="none" />
           {/* Address Bus (Bottom) */}
           <path d="M 120 280 L 520 280" stroke="rgb(6 182 212 / 0.4)" strokeWidth="8" fill="none" />
           {/* Vertical links for CPU */}
           <path d="M 320 40 L 320 100" stroke="rgb(168 85 247 / 0.4)" strokeWidth="4" />
           <path d="M 320 280 L 320 220" stroke="rgb(6 182 212 / 0.4)" strokeWidth="4" />
        </svg>

        {/* Hover zones for buses */}
        <div 
          className="absolute top-4 left-32 right-32 h-10 flex items-center justify-center cursor-pointer group z-0"
          onMouseEnter={() => setActiveId('dataBus')} onMouseLeave={() => setActiveId(null)}
        >
           <span className="text-[10px] bg-background/80 px-2 py-0.5 rounded border border-purple-500/30 text-purple-400 font-bold group-hover:bg-purple-500/20 transition-colors">DATA BUS ⟷</span>
        </div>
        <div 
          className="absolute bottom-4 left-32 right-32 h-10 flex items-center justify-center cursor-pointer group z-0"
          onMouseEnter={() => setActiveId('addressBus')} onMouseLeave={() => setActiveId(null)}
        >
           <span className="text-[10px] bg-background/80 px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400 font-bold group-hover:bg-cyan-500/20 transition-colors">ADDRESS BUS ⟶</span>
        </div>

        {/* COLUMN 1: Input / Output */}
        <div className="flex flex-col justify-between h-56 w-24 gap-4 z-10">
          <motion.div 
            className={`flex-1 flex flex-col items-center justify-center gap-2 rounded-xl border-2 transition-colors cursor-pointer ${activeId === 'input' ? 'bg-green-500/20 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-[#1e1e1e] border-green-500/30'}`}
            onMouseEnter={() => setActiveId('input')} onMouseLeave={() => setActiveId(null)}
            whileHover={{ scale: 1.05 }}
          >
            <Keyboard className={`w-6 h-6 ${activeId === 'input' ? 'text-green-400' : 'text-green-500/50'}`} />
            <span className="text-[9px] font-bold text-green-200 text-center leading-tight">INPUT<br/>DEVICE</span>
          </motion.div>
          <motion.div 
            className={`flex-1 flex flex-col items-center justify-center gap-2 rounded-xl border-2 transition-colors cursor-pointer ${activeId === 'output' ? 'bg-red-500/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'bg-[#1e1e1e] border-red-500/30'}`}
            onMouseEnter={() => setActiveId('output')} onMouseLeave={() => setActiveId(null)}
            whileHover={{ scale: 1.05 }}
          >
            <Monitor className={`w-6 h-6 ${activeId === 'output' ? 'text-red-400' : 'text-red-500/50'}`} />
            <span className="text-[9px] font-bold text-red-200 text-center leading-tight">OUTPUT<br/>DEVICE</span>
          </motion.div>
        </div>

        {/* COLUMN 2: I/O PORTS */}
        <motion.div 
          className={`h-40 w-20 flex flex-col items-center justify-center gap-2 rounded-xl border-2 transition-colors cursor-pointer z-10 relative ${activeId === 'ioports' ? 'bg-yellow-500/20 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'bg-[#1e1e1e] border-yellow-500/30'}`}
          onMouseEnter={() => setActiveId('ioports')} onMouseLeave={() => setActiveId(null)}
          whileHover={{ scale: 1.05 }}
        >
           {/* Horizontal connection lines to I/O */}
           <div className="absolute -left-12 top-10 w-12 h-px bg-yellow-500/30 border-t border-dashed border-yellow-500/50" />
           <div className="absolute -left-12 bottom-10 w-12 h-px bg-yellow-500/30 border-t border-dashed border-yellow-500/50" />
           
           <Usb className={`w-6 h-6 ${activeId === 'ioports' ? 'text-yellow-400' : 'text-yellow-500/50'}`} />
           <span className="text-[10px] font-bold text-yellow-200 text-center">I/O<br/>PORTS</span>
        </motion.div>

        {/* Control Bus Line (Middle) */}
        <div 
          className="h-px bg-pink-500/40 border-t border-dashed border-pink-500/60 flex-1 relative flex items-center justify-center cursor-pointer group z-10"
          onMouseEnter={() => setActiveId('controlBus')} onMouseLeave={() => setActiveId(null)}
        >
          <span className="text-[9px] bg-background/90 px-1 rounded absolute -top-4 text-pink-400 font-bold group-hover:bg-pink-500/20">CONTROL BUS</span>
        </div>

        {/* COLUMN 3: CPU */}
        <motion.div 
          className={`h-48 w-32 flex flex-col items-center justify-between p-2 rounded-xl border-2 transition-colors cursor-pointer z-10 bg-[#1e1e1e] ${activeId === 'cpu' ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'border-blue-500/40'}`}
          onMouseEnter={() => setActiveId('cpu')} onMouseLeave={() => setActiveId(null)}
          whileHover={{ scale: 1.05 }}
        >
           <span className="text-xs font-bold text-blue-200 mt-2">CPU</span>
           <Cpu className={`w-8 h-8 ${activeId === 'cpu' ? 'text-blue-400' : 'text-blue-500/30'}`} />
           
           <div className="flex gap-2 w-full mt-2">
             <div className="flex-1 bg-background/50 border border-blue-500/30 rounded py-2 text-center text-[10px] font-bold text-blue-300">ALU</div>
             <div className="flex-1 bg-background/50 border border-blue-500/30 rounded py-2 text-center text-[10px] font-bold text-blue-300">CU</div>
           </div>
        </motion.div>

        {/* Control Bus Line 2 (Middle) */}
        <div 
          className="h-px bg-pink-500/40 border-t border-dashed border-pink-500/60 flex-1 relative flex items-center justify-center cursor-pointer group z-10"
          onMouseEnter={() => setActiveId('controlBus')} onMouseLeave={() => setActiveId(null)}
        >
          <span className="text-[9px] bg-background/90 px-1 rounded absolute -top-4 text-pink-400 font-bold group-hover:bg-pink-500/20">CONTROL BUS</span>
        </div>

        {/* COLUMN 4: MEMORY */}
        <motion.div 
          className={`h-48 w-24 flex flex-col items-center justify-center gap-2 rounded-xl border-2 transition-colors cursor-pointer z-10 relative ${activeId === 'memory' ? 'bg-orange-500/20 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-[#1e1e1e] border-orange-500/30'}`}
          onMouseEnter={() => setActiveId('memory')} onMouseLeave={() => setActiveId(null)}
          whileHover={{ scale: 1.05 }}
        >
           {/* Vertical links for Memory to buses */}
           <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-1 h-12 bg-purple-500/30" />
           <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-1 h-12 bg-cyan-500/30" />

           <Database className={`w-8 h-8 ${activeId === 'memory' ? 'text-orange-400' : 'text-orange-500/50'}`} />
           <span className="text-[11px] font-bold text-orange-200 text-center">MEMORY</span>
        </motion.div>

      </div>

      {/* DETAIL PANEL (DYNAMIC) */}
      <div className={`mt-8 w-full max-w-2xl rounded-xl p-4 flex items-start gap-4 transition-all duration-300 border ${activeDetail.color}`}>
         <div className="p-3 rounded-lg bg-background/50 shrink-0">
           <DetailIcon className="w-6 h-6" />
         </div>
         <div>
           <h4 className="font-bold text-sm mb-1">{activeDetail.title}</h4>
           <p className="text-sm opacity-90 leading-relaxed">{activeDetail.desc}</p>
         </div>
      </div>

    </div>
  );
}
