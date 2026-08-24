"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick, FileCode2, PackageOpen, ArrowRight, Play, BookOpen, Mic2, Settings, Zap, ArrowRightLeft, FastForward, CheckCircle2 } from 'lucide-react';

export default function AnimatedTranslatorDefinition() {
  const [isHovered, setIsHovered] = useState(false);
  const [interpLine, setInterpLine] = useState(0);

  // Auto-increment interpreter line for animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      interval = setInterval(() => {
        setInterpLine(prev => (prev >= 3 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <motion.div 
      className="bg-amber-500/5 p-5 md:p-6 rounded-xl border border-amber-500/30 text-amber-900 dark:text-amber-200/90 relative cursor-pointer shadow-sm overflow-hidden mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setInterpLine(0); }}
      animate={{ minHeight: isHovered ? 600 : 250 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
    >
      <div className="absolute top-3 right-4 text-amber-500/60 text-xs flex items-center gap-1.5 font-medium animate-pulse z-20">
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
            className="relative z-10"
          >
            <strong className="flex items-center gap-2 mb-3 text-lg font-bold text-amber-600 dark:text-amber-400">
               <ArrowRightLeft className="w-5 h-5" /> Penerjemah: Compiler vs Interpreter
            </strong>
            <p className="mb-4 text-sm md:text-base leading-relaxed">
              Kode bahasa Inggris (Tingkat Tinggi) yang kita tulis tetap harus diterjemahkan menjadi biner (Tingkat Rendah) agar CPU paham. Ada dua cara menerjemahkannya:
            </p>
            <ul className="space-y-4 text-sm md:text-base leading-relaxed">
              <li className="flex gap-3">
                <div className="font-bold text-amber-600 dark:text-amber-400 shrink-0">1.</div>
                <div>
                  <strong className="block mb-1 text-amber-700 dark:text-amber-300">
                    <motion.span layoutId="t-compiler" className="inline-block px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/30 cursor-help hover:scale-110 transition-transform">Compiler</motion.span>
                  </strong>
                  <motion.span layoutId="t-comp-buku" className="inline-block px-1 py-0.5 mx-0.5 rounded-md bg-blue-500/5 text-blue-600/80 dark:text-blue-300 font-medium border border-blue-500/20 cursor-help">Menerjemahkan seluruh kode secara bersamaan menjadi satu file utuh</motion.span> yang siap dieksekusi (seperti menterjemahkan seluruh isi buku sekaligus). Contoh: C++, Java.
                </div>
              </li>
              <li className="flex gap-3">
                <div className="font-bold text-amber-600 dark:text-amber-400 shrink-0">2.</div>
                <div>
                  <strong className="block mb-1 text-amber-700 dark:text-amber-300">
                    <motion.span layoutId="t-interpreter" className="inline-block px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/30 cursor-help hover:scale-110 transition-transform">Interpreter</motion.span>
                  </strong>
                  <motion.span layoutId="t-inter-pidato" className="inline-block px-1 py-0.5 mx-0.5 rounded-md bg-orange-500/5 text-orange-600/80 dark:text-orange-300 font-medium border border-orange-500/20 cursor-help">Menerjemahkan kode baris demi baris saat program dijalankan secara langsung</motion.span> (seperti penerjemah simultan yang menerjemahkan kalimat orang yang sedang berpidato). Bahasa <strong className="font-bold text-foreground">Python</strong> dan <strong className="font-bold text-foreground">JavaScript</strong> yang akan kita pelajari bekerja dengan cara ini!
                </div>
              </li>
            </ul>
          </motion.div>
        ) : (
          <motion.div 
            key="diagram"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-full h-full relative pt-8 pb-4 z-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
              
              {/* COMPILER SIDE */}
              <div className="flex flex-col border border-blue-500/30 rounded-2xl bg-blue-500/5 overflow-hidden shadow-lg">
                 <div className="bg-blue-500/10 p-4 border-b border-blue-500/20 flex flex-col items-center">
                    <motion.span layoutId="t-compiler" className="px-4 py-1.5 rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/50 text-sm md:text-base shadow-sm z-10 mb-2 flex items-center gap-2">
                      Compiler
                    </motion.span>
                    <motion.span layoutId="t-comp-buku" className="text-[10px] md:text-xs text-center text-blue-500/80 font-medium">
                      Menerjemahkan seluruh kode secara bersamaan menjadi satu file utuh
                    </motion.span>
                 </div>
                 
                 <div className="p-6 flex flex-col items-center flex-grow">
                    
                    {/* Analogi Buku */}
                    <div className="flex items-center gap-2 text-blue-400/60 text-xs mb-6 font-medium italic bg-background/50 px-3 py-1.5 rounded-full border border-blue-500/20 shadow-sm">
                      <BookOpen className="w-4 h-4" /> "Menerjemahkan seluruh isi buku sekaligus"
                    </div>

                    <div className="flex items-center w-full justify-between gap-4 max-w-sm">
                       {/* Source Code */}
                       <div className="flex flex-col items-center gap-2 w-24">
                          <div className="w-16 h-20 bg-[#1e1e1e] rounded border border-blue-500/40 shadow-md flex flex-col p-1.5 gap-1">
                             <div className="w-3/4 h-1.5 bg-blue-400/50 rounded" />
                             <div className="w-full h-1.5 bg-blue-400/50 rounded" />
                             <div className="w-5/6 h-1.5 bg-blue-400/50 rounded" />
                             <div className="w-full h-1.5 bg-blue-400/50 rounded mt-2" />
                             <div className="w-4/5 h-1.5 bg-blue-400/50 rounded" />
                          </div>
                          <span className="text-[10px] font-mono text-blue-400 font-bold">Source Code</span>
                       </div>

                       {/* Translation Process (Compiler) */}
                       <div className="flex flex-col items-center relative flex-1">
                          <div className="w-full h-1 bg-blue-500/20 rounded-full overflow-hidden absolute top-1/2 -translate-y-1/2 -z-10">
                            <motion.div className="h-full bg-blue-500" animate={{ width: ['0%', '100%'] }} transition={{ duration: 3, repeat: Infinity }} />
                          </div>
                          <div className="bg-background border-2 border-blue-500 p-2 rounded-full z-10 animate-spin" style={{ animationDuration: '3s' }}>
                             <Settings className="w-6 h-6 text-blue-500" />
                          </div>
                          <span className="text-[9px] text-blue-500 font-bold mt-2 absolute -bottom-5 whitespace-nowrap bg-background/80 px-1 rounded">Memproses 100%...</span>
                       </div>

                       {/* Executable File */}
                       <div className="flex flex-col items-center gap-2 w-24 relative">
                          {/* Executable only appears when progress hits 100% */}
                          <motion.div 
                            className="w-16 h-20 bg-blue-600 rounded border-2 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center relative overflow-hidden"
                            animate={{ scale: [0.8, 1.1, 1], opacity: [0, 1, 1] }}
                            transition={{ duration: 3, times: [0, 0.9, 1], repeat: Infinity }}
                          >
                             <PackageOpen className="w-8 h-8 text-white z-10" />
                             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                          </motion.div>
                          <motion.span 
                            className="text-[10px] font-mono text-blue-400 font-bold flex items-center gap-1"
                            animate={{ opacity: [0, 1, 1] }}
                            transition={{ duration: 3, times: [0, 0.9, 1], repeat: Infinity }}
                          >
                            <CheckCircle2 className="w-3 h-3" /> Program.exe
                          </motion.span>
                       </div>
                    </div>

                    <div className="mt-8 text-center bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 w-full text-xs text-blue-900 dark:text-blue-200">
                      <strong>Hasil:</strong> Program baru bisa dijalankan <strong className="text-blue-500">SETELAH</strong> proses kompilasi selesai 100%. (Loading lama di awal, eksekusi sangat cepat).
                    </div>
                 </div>
              </div>

              {/* INTERPRETER SIDE */}
              <div className="flex flex-col border border-orange-500/30 rounded-2xl bg-orange-500/5 overflow-hidden shadow-lg relative">
                 <div className="bg-orange-500/10 p-4 border-b border-orange-500/20 flex flex-col items-center">
                    <motion.span layoutId="t-interpreter" className="px-4 py-1.5 rounded-lg bg-orange-500/20 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/50 text-sm md:text-base shadow-sm z-10 mb-2 flex items-center gap-2">
                      Interpreter
                    </motion.span>
                    <motion.span layoutId="t-inter-pidato" className="text-[10px] md:text-xs text-center text-orange-500/80 font-medium">
                      Menerjemahkan kode baris demi baris saat program dijalankan
                    </motion.span>
                 </div>

                 <div className="p-6 flex flex-col items-center flex-grow">
                    
                    {/* Analogi Pidato */}
                    <div className="flex items-center gap-2 text-orange-400/70 text-xs mb-6 font-medium italic bg-background/50 px-3 py-1.5 rounded-full border border-orange-500/20 shadow-sm">
                      <Mic2 className="w-4 h-4" /> "Seperti penerjemah simultan pidato"
                    </div>

                    <div className="flex items-center w-full justify-between gap-4 max-w-sm">
                       {/* Source Code (Line by line) */}
                       <div className="flex flex-col items-center gap-2 w-28">
                          <div className="w-24 bg-[#1e1e1e] rounded border border-orange-500/40 shadow-md flex flex-col p-2 gap-1.5 font-mono text-[8px] text-orange-200">
                             <div className={`px-1 py-0.5 rounded transition-colors ${interpLine === 0 ? 'bg-orange-500/30 text-orange-300 font-bold border-l-2 border-orange-500' : 'opacity-50'}`}>1. init()</div>
                             <div className={`px-1 py-0.5 rounded transition-colors ${interpLine === 1 ? 'bg-orange-500/30 text-orange-300 font-bold border-l-2 border-orange-500' : 'opacity-50'}`}>2. print(x)</div>
                             <div className={`px-1 py-0.5 rounded transition-colors ${interpLine === 2 ? 'bg-orange-500/30 text-orange-300 font-bold border-l-2 border-orange-500' : 'opacity-50'}`}>3. calc()</div>
                             <div className={`px-1 py-0.5 rounded transition-colors ${interpLine === 3 ? 'bg-orange-500/30 text-orange-300 font-bold border-l-2 border-orange-500' : 'opacity-50'}`}>4. end()</div>
                          </div>
                          <span className="text-[10px] font-mono text-orange-400 font-bold">Script.py / .js</span>
                       </div>

                       {/* Translation Process (Interpreter) */}
                       <div className="flex flex-col items-center relative flex-1">
                          <div className="flex gap-1 absolute top-1/2 -translate-y-1/2 -z-10">
                            <FastForward className="w-4 h-4 text-orange-400 animate-pulse" />
                            <FastForward className="w-4 h-4 text-orange-400 animate-pulse delay-75" />
                          </div>
                          <div className="bg-background border-2 border-orange-500 p-2 rounded-full z-10 scale-90 transition-transform">
                             <Zap className="w-5 h-5 text-orange-500" />
                          </div>
                          <span className="text-[9px] text-orange-500 font-bold mt-2 absolute -bottom-5 whitespace-nowrap bg-background/80 px-1 rounded">Terjemah & Eksekusi!</span>
                       </div>

                       {/* Execution Output Stream */}
                       <div className="flex flex-col items-center gap-2 w-28">
                          <div className="w-24 bg-black rounded border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.15)] flex flex-col p-2 gap-1.5 font-mono text-[8px] text-green-400 overflow-hidden relative min-h-[76px]">
                             <AnimatePresence>
                               {interpLine >= 0 && <motion.div key="out-0" initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} className="text-muted-foreground">&gt; Output:</motion.div>}
                               {interpLine >= 1 && <motion.div key="out-1" initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}}>&gt; Starting...</motion.div>}
                               {interpLine >= 2 && <motion.div key="out-2" initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}}>&gt; Hello 100</motion.div>}
                               {interpLine >= 3 && <motion.div key="out-3" initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}}>&gt; Done.</motion.div>}
                             </AnimatePresence>
                          </div>
                          <span className="text-[10px] font-mono text-green-500 font-bold">Langsung Jalan!</span>
                       </div>
                    </div>

                    <div className="mt-8 text-center bg-orange-500/10 p-3 rounded-lg border border-orange-500/20 w-full text-xs text-orange-900 dark:text-orange-200 relative">
                      <strong>Hasil:</strong> Program langsung dieksekusi detik itu juga <strong className="text-orange-500">TANPA</strong> perlu menunggu semua file selesai diterjemahkan.
                      
                      {/* Highlight absolute tag for Python/JS */}
                      <div className="absolute -top-3 -right-2 bg-yellow-400 text-black px-2 py-0.5 rounded shadow-lg text-[9px] font-bold font-mono rotate-6 border border-yellow-500">
                        Python & JS di sini!
                      </div>
                    </div>

                 </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
