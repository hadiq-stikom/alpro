"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick, Keyboard, Mic, Camera, Monitor, Speaker, Printer, Database, HardDrive, Cloud, FileCode2, Cpu, Zap, Activity } from 'lucide-react';

const cards = [
  {
    id: 'mesin',
    title: 'Mesin yang Diprogram',
    icon: '🤖',
    color: 'blue',
    desc: 'Sebuah kanvas kosong yang mampu menanggapi serangkaian instruksi untuk melakukan tugas apapun yang Anda bayangkan.',
    AnimationComponent: () => (
      <div className="flex flex-col items-center justify-center py-2 h-full w-full">
        <div className="flex items-center gap-3">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ repeat: Infinity, duration: 2, repeatType: "loop" }}
            className="flex flex-col gap-1 bg-blue-500/10 border border-blue-500/20 p-2 rounded-md text-[10px] font-mono text-blue-600 dark:text-blue-400"
          >
            <span>{"function() {"}</span>
            <span className="pl-2">run()</span>
            <span>{"}"}</span>
          </motion.div>
          
          <div className="flex flex-col items-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="text-2xl text-foreground"
            >
              ⚙️
            </motion.div>
            <span className="text-[10px] text-muted-foreground mt-1">CPU</span>
          </div>

          <motion.div
             initial={{ x: -10, opacity: 0 }}
             animate={{ x: 10, opacity: 1 }}
             transition={{ repeat: Infinity, duration: 2, repeatType: "loop", delay: 0.5 }}
             className="bg-blue-500 text-white text-[10px] px-2 py-1 rounded shadow-sm"
          >
             Output
          </motion.div>
        </div>
        <p className="text-[11px] text-muted-foreground mt-4 text-center max-w-[200px]">
          Instruksi masuk, diproses oleh CPU, dan menghasilkan output nyata.
        </p>
      </div>
    )
  },
  {
    id: 'instruksi',
    title: 'Taat Instruksi',
    icon: '⚙️',
    color: 'green',
    desc: 'Mengeksekusi dan memanipulasi data berdasarkan urutan instruksi yang telah terekam dengan akurasi mutlak.',
    AnimationComponent: () => (
      <div className="flex flex-col items-center justify-center py-2 h-full w-full">
         <div className="flex flex-col gap-2 w-full max-w-[150px]">
            {[1, 2, 3].map((step, i) => (
              <div key={step} className="flex items-center gap-2 bg-green-500/5 border border-green-500/20 p-2 rounded-md">
                 <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.8, duration: 0.3, repeat: Infinity, repeatDelay: 2.4 }}
                    className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-white shrink-0 shadow-sm shadow-green-500/30"
                 >✓</motion.div>
                 <div className="h-1.5 bg-green-500/20 rounded w-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: '100%' }}
                     transition={{ delay: i * 0.8, duration: 0.3, repeat: Infinity, repeatDelay: 2.4 }}
                     className="h-full bg-green-500"
                   />
                 </div>
              </div>
            ))}
         </div>
         <p className="text-[11px] text-muted-foreground mt-4 text-center max-w-[200px]">
           Komputer mengeksekusi instruksi dari atas ke bawah tanpa pernah melompat atau protes.
         </p>
      </div>
    )
  },
  {
    id: 'penyimpanan',
    title: 'Penyimpanan Kilat',
    icon: '🗄️',
    color: 'orange',
    desc: 'Alat bantu komputasi yang dapat menyimpan serta memanggil kembali data raksasa dalam sekejap mata.',
    AnimationComponent: () => (
      <div className="flex flex-col items-center justify-center py-2 h-full w-full">
         <div className="relative flex flex-col items-center h-20 w-32 bg-orange-500/5 border border-orange-500/20 rounded-xl pt-12 overflow-hidden">
            <motion.div className="text-3xl absolute top-2 z-10 bg-card rounded-full shadow-sm">🗄️</motion.div>
            <div className="flex flex-wrap w-full gap-1 justify-center px-4">
               {[1, 2, 3, 4, 5, 6].map((item, i) => (
                  <motion.div
                     key={item}
                     initial={{ y: -60, opacity: 0, scale: 0.5 }}
                     animate={{ y: 0, opacity: 1, scale: 1 }}
                     transition={{ delay: i * 0.15, duration: 0.4, repeat: Infinity, repeatDelay: 1 }}
                     className="w-3 h-3 bg-orange-500 rounded-[3px] shadow-sm shadow-orange-500/30"
                  />
               ))}
            </div>
         </div>
         <p className="text-[11px] text-muted-foreground mt-4 text-center max-w-[200px]">
           Menyimpan ribuan data ke dalam memori sekunder dan mengambilnya kembali secara instan.
         </p>
      </div>
    )
  }
];

export default function InteractiveComputerDefinition() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6 min-h-[420px] md:min-h-[350px]">
      {cards.map((card, idx) => {
        const isHovered = hoveredIndex === idx;
        const isOthersHovered = hoveredIndex !== null && hoveredIndex !== idx;

        let borderColorClass = 'border-border/50';
        let iconBgClass = 'bg-primary/10';
        let iconColorClass = 'text-primary';

        if (card.color === 'blue') {
          iconBgClass = 'bg-blue-500/10';
          iconColorClass = 'text-blue-500';
          if (isHovered) borderColorClass = 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]';
          else borderColorClass = 'hover:border-blue-500/50 border-border/50';
        } else if (card.color === 'green') {
          iconBgClass = 'bg-green-500/10';
          iconColorClass = 'text-green-500';
          if (isHovered) borderColorClass = 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.15)]';
          else borderColorClass = 'hover:border-green-500/50 border-border/50';
        } else if (card.color === 'orange') {
          iconBgClass = 'bg-orange-500/10';
          iconColorClass = 'text-orange-500';
          if (isHovered) borderColorClass = 'border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.15)]';
          else borderColorClass = 'hover:border-orange-500/50 border-border/50';
        }

        return (
          <motion.div
            key={card.id}
            layout
            onHoverStart={() => setHoveredIndex(idx)}
            onHoverEnd={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              flex: isHovered ? 2.5 : isOthersHovered ? 0.8 : 1
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className={`relative overflow-hidden bg-card p-5 border-2 rounded-2xl flex flex-col items-center transition-colors cursor-pointer ${borderColorClass}`}
          >
            <motion.div layout className={`w-12 h-12 shrink-0 ${iconBgClass} ${iconColorClass} rounded-full flex items-center justify-center mb-3`}>
              <span className="text-2xl">{card.icon}</span>
            </motion.div>
            
            <motion.h3 layout className="font-bold text-sm text-foreground text-center mb-2 whitespace-nowrap">
              {card.title}
            </motion.h3>

            <AnimatePresence mode="wait">
              {!isHovered ? (
                <motion.div 
                  key="desc"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-grow flex items-center"
                >
                  <p className="text-xs text-muted-foreground leading-relaxed text-center">
                    {isOthersHovered ? card.desc.substring(0, 45) + "..." : card.desc}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="anim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="w-full flex-grow flex flex-col justify-start"
                >
                  <p className="text-xs text-muted-foreground leading-relaxed text-center mb-4 hidden md:block">
                    {card.desc}
                  </p>
                  <div className="flex-grow flex items-center justify-center border-t border-border/50 pt-4 w-full relative">
                    <card.AnimationComponent />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export function AnimatedDefinitionText() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="bg-blue-500/5 p-5 rounded-xl border-l-4 border-blue-500 mb-8 relative cursor-pointer shadow-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ minHeight: isHovered ? 520 : 120 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
    >
      <div className="absolute top-3 right-4 text-blue-500/60 text-xs flex items-center gap-1.5 font-medium animate-pulse z-20">
        <MousePointerClick className="w-4 h-4" /> Arahkan Kursor (Hover)
      </div>

      <AnimatePresence mode="popLayout">
        {!isHovered ? (
          <motion.div 
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-foreground font-medium leading-loose text-sm md:text-base pt-6 md:pt-2 relative z-10"
          >
            Secara fundamental, <strong className="text-blue-500">Komputer</strong> adalah perangkat elektronik yang dirancang untuk{' '}
            <motion.span layoutId="k-input" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 font-bold border border-green-500/30 whitespace-nowrap">menerima data (Input)</motion.span>
            ,{' '}
            <motion.span layoutId="k-process" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/30 whitespace-nowrap">memprosesnya secara otomatis (Proses)</motion.span>
            {' '}berdasarkan{' '}
            <motion.span layoutId="k-program" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/30 whitespace-nowrap">urutan instruksi (Program)</motion.span>
            , serta{' '}
            <motion.span layoutId="k-storage" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/30 whitespace-nowrap">menyimpan data (Penyimpanan)</motion.span>
            {' '}dan{' '}
            <motion.span layoutId="k-output" className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-red-500/10 text-red-600 dark:text-red-400 font-bold border border-red-500/30 whitespace-nowrap">menghasilkan informasi (Output)</motion.span>
            .
          </motion.div>
        ) : (
          <motion.div 
            key="diagram"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-full h-full relative flex flex-col items-center justify-center pt-8 pb-4 transform scale-90 origin-top md:origin-center"
          >
            {/* Background Grid Lines for aesthetic */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="relative w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 grid-rows-[auto_auto_auto] gap-x-4 gap-y-12 md:gap-y-16 items-center z-10 mt-4">
              
              {/* CONNECTING LINES (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" style={{ zIndex: -1 }}>
                <defs>
                  <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(34 197 94 / 0.5)" /> {/* Green */}
                    <stop offset="50%" stopColor="rgb(59 130 246 / 0.5)" /> {/* Blue */}
                    <stop offset="100%" stopColor="rgb(239 68 68 / 0.5)" /> {/* Red */}
                  </linearGradient>
                  <linearGradient id="line-vert" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(168 85 247 / 0.5)" /> {/* Purple */}
                    <stop offset="100%" stopColor="rgb(249 115 22 / 0.5)" /> {/* Orange */}
                  </linearGradient>
                </defs>
                
                {/* Horizontal main pipeline */}
                <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="url(#line-grad)" strokeWidth="3" strokeDasharray="6 6" className="animate-[dash_20s_linear_infinite]" />
                {/* Vertical pipeline (Program -> Process -> Storage) */}
                <line x1="50%" y1="20%" x2="50%" y2="80%" stroke="url(#line-vert)" strokeWidth="3" strokeDasharray="6 6" className="animate-[dash_20s_linear_infinite]" />
              </svg>

              {/* 1. TOP CENTER: PROGRAM */}
              <div className="col-start-1 md:col-start-2 row-start-1 flex flex-col items-center justify-center relative group">
                <div className="flex gap-4 mb-4 text-purple-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-2.5 bg-background rounded-full border border-purple-500/30 shadow-sm hover:scale-125 hover:border-purple-500 hover:shadow-md transition-all duration-300 cursor-pointer"><FileCode2 className="w-5 h-5 md:w-7 md:h-7" /></div>
                  <div className="p-2.5 bg-background rounded-full border border-purple-500/30 shadow-sm hover:scale-125 hover:border-purple-500 hover:shadow-md transition-all duration-300 cursor-pointer"><Activity className="w-5 h-5 md:w-7 md:h-7" /></div>
                </div>
                <motion.span layoutId="k-program" className="px-4 py-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/30 text-xs md:text-sm shadow-[0_0_15px_rgba(168,85,247,0.2)] text-center backdrop-blur-sm z-10">
                  urutan instruksi (Program)
                </motion.span>
                <p className="text-[10px] text-muted-foreground mt-2 opacity-70">Software / Aplikasi</p>
              </div>

              {/* 2. MIDDLE LEFT: INPUT */}
              <div className="col-start-1 row-start-2 flex flex-col items-center justify-center relative group">
                <motion.span layoutId="k-input" className="px-4 py-2 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 font-bold border border-green-500/30 text-xs md:text-sm shadow-[0_0_15px_rgba(34,197,94,0.2)] text-center backdrop-blur-sm z-10">
                  menerima data (Input)
                </motion.span>
                <div className="flex gap-3 mt-4 text-green-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-2 md:p-3 bg-background rounded-full border border-green-500/30 shadow-sm hover:scale-125 hover:border-green-500 hover:shadow-md transition-all duration-300 cursor-pointer"><Keyboard className="w-5 h-5 md:w-8 md:h-8" /></div>
                  <div className="p-2 md:p-3 bg-background rounded-full border border-green-500/30 shadow-sm hover:scale-125 hover:border-green-500 hover:shadow-md transition-all duration-300 cursor-pointer"><Mic className="w-5 h-5 md:w-8 md:h-8" /></div>
                  <div className="p-2 md:p-3 bg-background rounded-full border border-green-500/30 shadow-sm hover:scale-125 hover:border-green-500 hover:shadow-md transition-all duration-300 cursor-pointer"><Camera className="w-5 h-5 md:w-8 md:h-8" /></div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 opacity-70">Sensor, Keyboard, Mouse, dll.</p>
              </div>

              {/* 3. MIDDLE CENTER: PROCESS (CPU) */}
              <div className="col-start-1 md:col-start-2 row-start-3 md:row-start-2 flex flex-col items-center justify-center relative group">
                <div className="absolute inset-0 bg-blue-500/5 border-2 border-blue-500/40 rounded-xl transform scale-[1.3] md:scale-[1.6] animate-pulse z-0 pointer-events-none" />
                <div className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-lg transform scale-125 md:scale-150 rotate-45 z-0 transition-transform group-hover:rotate-90 duration-700 pointer-events-none" />
                
                <div className="p-3 md:p-4 bg-background rounded-xl border-2 border-blue-500/50 shadow-md mb-3 z-10 flex items-center justify-center hover:scale-110 hover:border-blue-400 hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer">
                  <Cpu className="w-8 h-8 md:w-12 md:h-12 text-blue-500" />
                </div>
                <motion.span layoutId="k-process" className="px-4 py-2 rounded-lg bg-background text-blue-600 dark:text-blue-400 font-bold border-2 border-blue-500/50 text-xs md:text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] text-center z-10">
                  memprosesnya secara otomatis (Proses)
                </motion.span>
                <p className="text-[10px] text-blue-500/70 mt-2 z-10 font-bold tracking-widest">CPU / Prosesor</p>
              </div>

              {/* 4. MIDDLE RIGHT: OUTPUT */}
              <div className="col-start-1 md:col-start-3 row-start-4 md:row-start-2 flex flex-col items-center justify-center relative group">
                <motion.span layoutId="k-output" className="px-4 py-2 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 font-bold border border-red-500/30 text-xs md:text-sm shadow-[0_0_15px_rgba(239,68,68,0.2)] text-center backdrop-blur-sm z-10">
                  menghasilkan informasi (Output)
                </motion.span>
                <div className="flex gap-3 mt-4 text-red-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-2 md:p-3 bg-background rounded-full border border-red-500/30 shadow-sm hover:scale-125 hover:border-red-500 hover:shadow-md transition-all duration-300 cursor-pointer"><Monitor className="w-5 h-5 md:w-8 md:h-8" /></div>
                  <div className="p-2 md:p-3 bg-background rounded-full border border-red-500/30 shadow-sm hover:scale-125 hover:border-red-500 hover:shadow-md transition-all duration-300 cursor-pointer"><Speaker className="w-5 h-5 md:w-8 md:h-8" /></div>
                  <div className="p-2 md:p-3 bg-background rounded-full border border-red-500/30 shadow-sm hover:scale-125 hover:border-red-500 hover:shadow-md transition-all duration-300 cursor-pointer"><Printer className="w-5 h-5 md:w-8 md:h-8" /></div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 opacity-70">Layar, Speaker, Printer, dll.</p>
              </div>

              {/* 5. BOTTOM CENTER: STORAGE */}
              <div className="col-start-1 md:col-start-2 row-start-5 md:row-start-3 flex flex-col items-center justify-center relative group pt-4 md:pt-0">
                <motion.span layoutId="k-storage" className="px-4 py-2 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/30 text-xs md:text-sm shadow-[0_0_15px_rgba(249,115,22,0.2)] text-center backdrop-blur-sm z-10">
                  menyimpan data (Penyimpanan)
                </motion.span>
                <div className="flex gap-3 mt-4 text-orange-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-2 md:p-3 bg-background rounded-full border border-orange-500/30 shadow-sm hover:scale-125 hover:border-orange-500 hover:shadow-md transition-all duration-300 cursor-pointer"><Database className="w-5 h-5 md:w-8 md:h-8" /></div>
                  <div className="p-2 md:p-3 bg-background rounded-full border border-orange-500/30 shadow-sm hover:scale-125 hover:border-orange-500 hover:shadow-md transition-all duration-300 cursor-pointer"><HardDrive className="w-5 h-5 md:w-8 md:h-8" /></div>
                  <div className="p-2 md:p-3 bg-background rounded-full border border-orange-500/30 shadow-sm hover:scale-125 hover:border-orange-500 hover:shadow-md transition-all duration-300 cursor-pointer"><Cloud className="w-5 h-5 md:w-8 md:h-8" /></div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 opacity-70">RAM, HDD, SSD, Cloud</p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Add CSS for SVG dash animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
        }
      `}} />
    </motion.div>
  )
}
