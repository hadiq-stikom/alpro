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
  // Let's hardcode it to 'A' for simplicity, but we can randomize it.
  // We'll hardcode to A for the classic puzzle solution (A=Hot, B=On, C=Cold).
  // Actually, let's randomize it on mount so it's a real puzzle!
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
    <div className="flex flex-col gap-6 p-6 bg-slate-900 rounded-2xl border border-slate-700 shadow-lg mt-8 text-slate-200">
      
      {/* Header */}
      <div className="flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-2 text-amber-500">Misteri 3 Saklar & 1 Lampu</h3>
        <p className="text-sm text-slate-200 text-center max-w-xl leading-relaxed">
          Ada 3 saklar (A, B, C) di Lantai 1, dan satu lampu di Lantai 2. Hanya satu saklar yang mengontrol lampu. 
          Anda hanya boleh naik ke Lantai 2 <strong className="text-white bg-slate-800 px-1 rounded border border-slate-600">satu kali saja</strong>. Tentukan saklar mana yang benar!
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 relative">
        
        {/* LANTAI 1 */}
        <div className={`flex-1 p-5 rounded-xl border ${floor === 1 ? 'bg-slate-800 border-slate-600' : 'bg-slate-800/50 border-slate-700/50 opacity-50 pointer-events-none'} transition-all`}>
          <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
            <h4 className="font-bold text-lg text-slate-300">Lantai 1</h4>
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="font-mono font-bold text-sm">{timeElapsed} Menit</span>
            </div>
          </div>

          <div className="flex justify-center gap-6 mb-5">
            {(['A', 'B', 'C'] as const).map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div className="font-bold text-xl text-slate-400">{s}</div>
                <button
                  onClick={() => toggleSwitch(s)}
                  className={`w-14 h-20 rounded-lg flex items-center justify-center border-b-4 transition-all active:translate-y-1 active:border-b-0
                    ${switches[s] ? 'bg-emerald-500 border-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-slate-600 border-slate-800'}
                  `}
                >
                  <Power className={`w-7 h-7 ${switches[s] ? 'text-white' : 'text-slate-400'}`} />
                </button>
                <div className="text-xs font-bold font-mono mt-1">{switches[s] ? 'ON' : 'OFF'}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
             <button 
               onClick={waitTime}
               className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-md transition-colors flex justify-center items-center gap-2"
             >
               <Clock className="w-5 h-5" /> Tunggu 10 Menit di Lantai 1
             </button>
             
             <button 
               onClick={() => setFloor(2)}
               className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md transition-colors flex justify-center items-center gap-2"
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
                className="absolute inset-0 z-20 backdrop-blur-md bg-slate-900/80 rounded-xl flex items-center justify-center border border-slate-700"
              >
                <div className="text-center font-bold text-slate-400 flex flex-col items-center gap-2">
                  <span className="text-4xl">🔒</span>
                  Naik ke Lantai 2 untuk melihat lampu
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`w-full h-full p-5 rounded-xl border bg-slate-800 border-slate-600 flex flex-col items-center transition-all`}>
             <div className="flex justify-between w-full items-center mb-4 border-b border-slate-700 pb-2">
               <h4 className="font-bold text-lg text-slate-300">Lantai 2</h4>
             </div>
             
              {/* THE BULB */}
              <div className="flex-1 flex flex-col items-center justify-center w-full relative">
                 {/* Glow effect if hot but off */}
                 {!isBulbOn && isBulbHot && (
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-red-500/20 blur-2xl rounded-full z-0"></div>
                 )}
                
                 {isBulbOn ? (
                   <Lightbulb className="w-24 h-24 text-amber-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.8)] z-10" />
                 ) : (
                   <LightbulbOff className={`w-24 h-24 z-10 ${isBulbHot ? 'text-red-900' : 'text-slate-600'}`} />
                 )}
                 
                 <div className="mt-4 flex gap-4">
                  <div className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 border ${isBulbOn ? 'bg-amber-500/20 text-amber-400 border-amber-500/50' : 'bg-slate-700 text-slate-400 border-slate-600'}`}>
                    Status: {isBulbOn ? 'MENYALA' : 'MATI'}
                  </div>
                  <div className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 border ${isBulbHot ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'bg-blue-500/20 text-blue-400 border-blue-500/50'}`}>
                    Suhu: {isBulbHot ? 'PANAS 🔥' : 'DINGIN ❄️'}
                  </div>
                </div>
             </div>

              {/* Quiz Section (Only visible on floor 2) */}
              {floor === 2 && !answer && (
                <div className="mt-4 w-full p-3 bg-slate-900 rounded-xl border border-slate-700">
                  <p className="text-center font-bold mb-3 text-sm">Saklar mana yang mengontrol lampu ini?</p>
                  <div className="flex gap-2 justify-center">
                    {(['A', 'B', 'C'] as const).map(opt => (
                      <button 
                        key={opt}
                        onClick={() => setAnswer(opt)}
                        className="w-10 h-10 bg-slate-700 hover:bg-slate-600 font-bold text-lg rounded-lg border border-slate-600 transition-colors"
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
                 className={`mt-4 w-full p-3 rounded-xl border text-center font-bold ${answer === correctSwitch ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-red-500/20 border-red-500/50 text-red-400'}`}
               >
                 {answer === correctSwitch ? (
                   <>
                     <div className="text-xl">🎉 Tepat Sekali!</div>
                     <div className="text-xs font-normal">Anda berhasil memecahkan algoritma *hidden state* (suhu)!</div>
                   </>
                 ) : (
                   <>
                     <div className="text-xl">❌ Salah!</div>
                     <div className="text-xs font-normal">Kunci rahasianya adalah memanfaatkan waktu dan suhu. Coba lagi!</div>
                   </>
                 )}
                 <button onClick={reset} className="mt-2 px-3 py-1.5 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-sm flex items-center gap-2 mx-auto">
                   <RefreshCcw className="w-3 h-3" /> Main Lagi
                 </button>
               </motion.div>
             )}

          </div>

        </div>
      </div>
    </div>
  );
}
