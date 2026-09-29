"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, LightbulbOff, Power, Clock, ArrowUpCircle, RefreshCcw } from 'lucide-react';

export default function LogicPuzzleSwitches() {
  const [floor, setFloor] = useState<1 | 2>(1);
  const [switches, setSwitches] = useState({ A: false, B: false, C: false });
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  
  // The TRUTH: Which switch actually controls the bulb?
  const [correctSwitch, setCorrectSwitch] = useState<'A'|'B'|'C'>('A');
  const [heatLevel, setHeatLevel] = useState(0); // 0 to 100

  // Randomize on load
  useEffect(() => {
    const options: ('A'|'B'|'C')[] = ['A', 'B', 'C'];
    setCorrectSwitch(options[Math.floor(Math.random() * options.length)]);
  }, []);

  // Simulating time/heat
  const waitTime = () => {
    setTimeElapsed(prev => prev + 10);
    // If the correct switch is ON, heat increases. Otherwise it cools down.
    if (switches[correctSwitch]) {
      setHeatLevel(prev => Math.min(prev + 50, 100)); // Gets hot fast
    } else {
      setHeatLevel(prev => Math.max(prev - 20, 0)); // Cools down slowly
    }
  };

  const toggleSwitch = (s: 'A'|'B'|'C') => {
    setSwitches(prev => ({ ...prev, [s]: !prev[s] }));
    // Immediately calculate some tiny heat just to register it was flicked
    if (s === correctSwitch) {
       if (!switches[s]) setHeatLevel(prev => Math.min(prev + 5, 100)); // Turning on gives small heat tick
    }
  };

  const reset = () => {
    setFloor(1);
    setSwitches({ A: false, B: false, C: false });
    setTimeElapsed(0);
    setHeatLevel(0);
    setAnswer(null);
    const options: ('A'|'B'|'C')[] = ['A', 'B', 'C'];
    setCorrectSwitch(options[Math.floor(Math.random() * options.length)]);
  };

  const isBulbOn = switches[correctSwitch];
  const isBulbHot = heatLevel >= 40;

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 bg-card text-card-foreground rounded-3xl border border-border shadow-md mt-8 transition-colors">
      
      {/* Header */}
      <div className="flex flex-col items-center">
        <h3 className="text-2xl md:text-3xl font-extrabold mb-2 text-amber-500 tracking-tight">Misteri 3 Saklar &amp; 1 Lampu</h3>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 text-center max-w-xl leading-relaxed font-medium">
          Ada 3 saklar (A, B, C) di Lantai 1, dan satu lampu di Lantai 2. Hanya satu saklar yang mengontrol lampu.{' '}
          Anda hanya boleh naik ke Lantai 2 <strong className="text-foreground bg-secondary px-2 py-0.5 rounded-md border border-border font-bold">satu kali saja</strong>. Tentukan saklar mana yang benar!
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 relative">
        
        {/* LANTAI 1 */}
        <div className={`flex-1 p-5 md:p-6 rounded-2xl border transition-all ${floor === 1 ? 'bg-background border-border shadow-sm' : 'bg-muted/40 border-border/50 opacity-40 pointer-events-none'}`}>
          <div className="flex justify-between items-center mb-4 border-b border-border pb-3">
            <h4 className="font-extrabold text-lg text-foreground">Lantai 1</h4>
            <div className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-xl border border-border">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="font-mono font-bold text-sm text-foreground">{timeElapsed} Menit</span>
            </div>
          </div>

          <div className="flex justify-center gap-6 mb-5">
            {(['A', 'B', 'C'] as const).map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div className="font-black text-xl text-foreground">{s}</div>
                <button
                  onClick={() => toggleSwitch(s)}
                  className={`w-14 h-20 rounded-xl flex items-center justify-center border-b-4 transition-all active:translate-y-1 active:border-b-0 cursor-pointer
                    ${switches[s] 
                      ? 'bg-emerald-500 border-emerald-700 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                      : 'bg-secondary border-border text-muted-foreground hover:border-slate-400 dark:hover:border-slate-500'}
                  `}
                >
                  <Power className={`w-7 h-7 ${switches[s] ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                </button>
                <div className={`text-xs font-black font-mono mt-1 ${switches[s] ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                  {switches[s] ? 'ON' : 'OFF'}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
             <button 
               onClick={waitTime}
               className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-sm hover:shadow transition-all flex justify-center items-center gap-2 cursor-pointer active:scale-[0.99]"
             >
               <Clock className="w-5 h-5" /> Tunggu 10 Menit di Lantai 1
             </button>
             
             <button 
               onClick={() => setFloor(2)}
               className="w-full py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-sm hover:shadow transition-all flex justify-center items-center gap-2 cursor-pointer active:scale-[0.99]"
             >
               <ArrowUpCircle className="w-5 h-5" /> Naik ke Lantai 2 (Kunci Saklar!)
             </button>
          </div>
        </div>


        {/* LANTAI 2 */}
        <div className="flex-1 relative">
          
          {/* Fog Cover if on floor 1 */}
          <AnimatePresence>
            {floor === 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 backdrop-blur-md bg-background/80 rounded-2xl flex items-center justify-center border border-border shadow-inner"
              >
                <div className="text-center font-bold text-muted-foreground flex flex-col items-center gap-2 p-4">
                  <span className="text-4xl">🔒</span>
                  <span className="text-foreground font-extrabold text-sm">Naik ke Lantai 2 untuk melihat lampu</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full h-full p-5 md:p-6 rounded-2xl border bg-background border-border flex flex-col items-center justify-between transition-all shadow-sm">
             <div className="flex justify-between w-full items-center mb-4 border-b border-border pb-3">
               <h4 className="font-extrabold text-lg text-foreground">Lantai 2</h4>
             </div>
             
              {/* THE BULB */}
              <div className="flex-1 flex flex-col items-center justify-center w-full relative py-6">
                 {/* Glow effect if hot but off */}
                 {!isBulbOn && isBulbHot && (
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-red-500/25 blur-2xl rounded-full z-0"></div>
                 )}
                
                 {isBulbOn ? (
                   <Lightbulb className="w-24 h-24 text-amber-500 drop-shadow-[0_0_30px_rgba(245,158,11,0.7)] z-10 animate-pulse" />
                 ) : (
                   <LightbulbOff className={`w-24 h-24 z-10 ${isBulbHot ? 'text-red-500 dark:text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'text-slate-400 dark:text-slate-600'}`} />
                 )}
                 
                 <div className="mt-4 flex gap-3 flex-wrap justify-center">
                  <div className={`px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 border ${
                    isBulbOn 
                      ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40' 
                      : 'bg-secondary text-muted-foreground border-border'
                  }`}>
                    <span>Status:</span>
                    <strong className="font-extrabold">{isBulbOn ? 'MENYALA' : 'MATI'}</strong>
                  </div>
                  <div className={`px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 border ${
                    isBulbHot 
                      ? 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/40' 
                      : 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/40'
                  }`}>
                    <span>Suhu:</span>
                    <strong className="font-extrabold">{isBulbHot ? 'PANAS 🔥' : 'DINGIN ❄️'}</strong>
                  </div>
                </div>
             </div>

              {/* Quiz Section (Only visible on floor 2) */}
              {floor === 2 && !answer && (
                <div className="mt-4 w-full p-3.5 bg-secondary/50 rounded-xl border border-border">
                  <p className="text-center font-bold mb-3 text-sm text-foreground">Saklar mana yang mengontrol lampu ini?</p>
                  <div className="flex gap-3 justify-center">
                    {(['A', 'B', 'C'] as const).map(opt => (
                      <button 
                        key={opt}
                        onClick={() => setAnswer(opt)}
                        className="w-11 h-11 bg-card hover:bg-primary hover:text-primary-foreground text-foreground font-black text-lg rounded-xl border border-border hover:border-primary transition-all shadow-sm cursor-pointer active:scale-95"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
               </div>
              )}

              {/* Result Section */}
              {answer && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`mt-4 w-full p-4 rounded-xl border text-center font-bold ${
                    answer === correctSwitch 
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-800 dark:text-emerald-300' 
                      : 'bg-red-500/15 border-red-500/40 text-red-800 dark:text-red-300'
                  }`}
                >
                  {answer === correctSwitch ? (
                    <>
                      <div className="text-xl">🎉 Tepat Sekali!</div>
                      <div className="text-xs font-normal mt-1 text-slate-700 dark:text-slate-300">
                        Anda berhasil memecahkan algoritma <em>hidden state</em> (suhu)!
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-xl">❌ Salah!</div>
                      <div className="text-xs font-normal mt-1 text-slate-700 dark:text-slate-300">
                        Kunci rahasianya adalah memanfaatkan waktu dan suhu. Coba lagi!
                      </div>
                    </>
                  )}
                  <button onClick={reset} className="mt-3 px-3.5 py-1.5 bg-secondary hover:bg-secondary/80 text-foreground font-bold rounded-lg text-sm flex items-center gap-2 mx-auto border border-border transition-colors cursor-pointer">
                    <RefreshCcw className="w-3.5 h-3.5" /> Main Lagi
                  </button>
                </motion.div>
              )}

          </div>

        </div>
      </div>
    </div>
  );
}
