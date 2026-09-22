"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Ship, ArrowRight, Dog, PawPrint, Leaf, ListOrdered } from 'lucide-react';

type Entity = 'farmer' | 'wolf' | 'sheep' | 'cabbage';
type Position = 'left' | 'right' | 'boat';

export default function LogicPuzzleRiver() {
  const [positions, setPositions] = useState<Record<Entity, Position>>({
    farmer: 'left',
    wolf: 'left',
    sheep: 'left',
    cabbage: 'left'
  });
  
  const [boatPosition, setBoatPosition] = useState<'left' | 'right'>('left');
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [gameOverReason, setGameOverReason] = useState<string | null>(null);
  const [isVictorious, setIsVictorious] = useState(false);

  // Constants
  const BOAT_CAPACITY = 2; // Farmer + 1

  const getEntitiesAt = (pos: Position) => {
    return (Object.keys(positions) as Entity[]).filter(e => positions[e] === pos);
  };

  const handleEntityClick = (entity: Entity) => {
    if (gameOverReason || isVictorious) return;
    
    const currentPos = positions[entity];

    if (currentPos === 'boat') {
      // Unload from boat to current boat bank
      setPositions({ ...positions, [entity]: boatPosition });
    } else {
      // Load onto boat if boat is at the same bank
      if (currentPos === boatPosition) {
        const currentlyOnBoat = getEntitiesAt('boat');
        if (currentlyOnBoat.length < BOAT_CAPACITY) {
          setPositions({ ...positions, [entity]: 'boat' });
        } else {
          alert("Perahu penuh! Hanya muat Petani dan 1 bawaan.");
        }
      }
    }
  };

  const checkConstraints = (newPositions: Record<Entity, Position>) => {
    const leftBank = (Object.keys(newPositions) as Entity[]).filter(e => newPositions[e] === 'left');
    const rightBank = (Object.keys(newPositions) as Entity[]).filter(e => newPositions[e] === 'right');
    
    const checkBank = (bank: Entity[], bankName: string) => {
      if (!bank.includes('farmer')) { // Farmer is NOT on this bank
        if (bank.includes('wolf') && bank.includes('sheep')) {
          return `GAME OVER: Serigala memakan Domba di Tepi ${bankName === 'left' ? 'Kiri' : 'Kanan'}!`;
        }
        if (bank.includes('sheep') && bank.includes('cabbage')) {
          return `GAME OVER: Domba memakan Sayur di Tepi ${bankName === 'left' ? 'Kiri' : 'Kanan'}!`;
        }
      }
      return null;
    };

    const leftError = checkBank(leftBank, 'left');
    const rightError = checkBank(rightBank, 'right');
    
    return leftError || rightError;
  };

  const moveBoat = () => {
    if (gameOverReason || isVictorious) return;

    const onBoat = getEntitiesAt('boat');
    if (!onBoat.includes('farmer')) {
      alert("Perahu tidak bisa berlayar tanpa Petani!");
      return;
    }

    const newBoatPos = boatPosition === 'left' ? 'right' : 'left';
    
    // Log the move
    const passenger = onBoat.find(e => e !== 'farmer');
    const passengerName = passenger === 'wolf' ? 'Serigala' : passenger === 'sheep' ? 'Domba' : passenger === 'cabbage' ? 'Sayur' : 'Sendirian';
    const direction = newBoatPos === 'right' ? 'Kanan' : 'Kiri';
    const newMove = `Petani menyeberang ke ${direction} membawa ${passengerName}`;
    setMoveHistory([...moveHistory, newMove]);

    // Check constraints after moving
    // Wait, constraints should be checked based on what is left behind BEFORE moving, 
    // and what is at the destination AFTER moving?
    // Actually, simply checking the state of both banks while the boat is in transit/arrived is enough, 
    // because the entities on the boat are safe with the farmer.
    const error = checkConstraints(positions);
    
    if (error) {
      setGameOverReason(error);
    } else {
      setBoatPosition(newBoatPos);
      
      // Check win condition (all on right)
      // Note: we must also consider things on the boat arriving at the right
      // So let's check if all are on right or on the boat at right
      const willBeRight = (Object.keys(positions) as Entity[]).filter(e => positions[e] === 'right' || positions[e] === 'boat');
      if (willBeRight.length === 4 && newBoatPos === 'right') {
        setIsVictorious(true);
      }
    }
  };

  const resetGame = () => {
    setPositions({ farmer: 'left', wolf: 'left', sheep: 'left', cabbage: 'left' });
    setBoatPosition('left');
    setMoveHistory([]);
    setGameOverReason(null);
    setIsVictorious(false);
  };

  const icons: Record<Entity, React.ReactNode> = {
    farmer: <span className="text-2xl sm:text-3xl">👨‍🌾</span>,
    wolf: <span className="text-2xl sm:text-3xl">🐺</span>,
    sheep: <span className="text-2xl sm:text-3xl">🐑</span>,
    cabbage: <span className="text-2xl sm:text-3xl">🥬</span>
  };

  const names: Record<Entity, string> = {
    farmer: 'Petani',
    wolf: 'Serigala',
    sheep: 'Domba',
    cabbage: 'Sayur'
  };

  return (
    <div className="flex flex-col p-6 bg-secondary/10 rounded-2xl border border-border/50 shadow-sm mt-8">
      
      {/* Header */}
      <div className="flex flex-col items-center w-full mb-8">
        <h3 className="text-2xl font-bold mb-2 text-primary">Teka-teki Menyeberang Sungai</h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 font-medium text-justify max-w-lg">
          Bantu Petani menyeberangkan Serigala, Domba, dan Sayur ke tepi seberang. Perahu hanya muat Petani dan 1 barang/hewan bawaan. 
          Jika ditinggal tanpa Petani: <strong className="text-red-600 dark:text-red-400 font-bold">Serigala memangsa Domba</strong>, dan <strong className="text-emerald-700 dark:text-emerald-400 font-bold">Domba memakan Sayur</strong>.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 w-full justify-center items-start">
        
        {/* Game Area */}
        <div className="flex-1 w-full max-w-3xl flex flex-col items-center">
          <div className="w-full flex flex-col gap-4">
          
          {/* Banks */}
          <div className="flex justify-between items-start w-full z-10 relative">
            {/* Tepi Kiri */}
            <div className="w-28 sm:w-36 bg-emerald-700 min-h-[10rem] py-3 px-2 flex flex-col items-center rounded-2xl shadow-md border-4 border-emerald-900/50 relative overflow-hidden">
              <div className="text-emerald-300 dark:text-emerald-200 font-extrabold mb-3 text-sm sm:text-base">Tepi Kiri</div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full place-items-center">
                {getEntitiesAt('left').map(e => (
                  <motion.button 
                    key={e} 
                    layoutId={e}
                    onClick={() => handleEntityClick(e)}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-background rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:ring-2 ring-primary transition-all z-20"
                    title={`Klik untuk menaikkan ${names[e]} ke perahu`}
                  >
                    {icons[e]}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tepi Kanan */}
            <div className="w-28 sm:w-36 bg-emerald-700 min-h-[10rem] py-3 px-2 flex flex-col items-center rounded-2xl shadow-md border-4 border-emerald-900/50 relative overflow-hidden">
              <div className="text-emerald-300 dark:text-emerald-200 font-extrabold mb-3 text-sm sm:text-base">Tepi Kanan</div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full place-items-center">
                {getEntitiesAt('right').map(e => (
                  <motion.button 
                    key={e} 
                    layoutId={e}
                    onClick={() => handleEntityClick(e)}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-background rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:ring-2 ring-primary transition-all z-20"
                    title={`Klik untuk menaikkan ${names[e]} ke perahu`}
                  >
                    {icons[e]}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* River & Boat */}
          <div className="w-full h-20 sm:h-24 relative mt-[-1rem]">
            <div className="relative w-full h-full flex items-start">
              <motion.div 
                className="absolute w-36 sm:w-40 h-16 sm:h-20 bg-amber-700/95 rounded-full border-4 border-amber-900 shadow-xl flex items-center justify-center gap-1 sm:gap-2 p-1 sm:p-2 z-20"
                initial={false}
                animate={{
                  left: boatPosition === 'left' ? '0%' : '100%',
                  x: boatPosition === 'left' ? '0%' : '-100%',
                  y: [0, 5, -5, 0] // bobbing effect
                }}
                transition={{ 
                  left: { type: "spring", stiffness: 45, damping: 12 },
                  x: { type: "spring", stiffness: 45, damping: 12 },
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" } 
                }}
              >
                <div className="absolute -left-14 top-1/2 -translate-y-1/2 text-xs font-black text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-950/80 px-1 py-0.5 rounded border border-amber-300 dark:border-amber-800">PERAHU</div>
                
                {/* Boat Slots */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-dashed border-amber-900/40 rounded-full flex items-center justify-center">
                   {getEntitiesAt('boat')[0] && (
                     <motion.button 
                       layoutId={getEntitiesAt('boat')[0]}
                       onClick={() => handleEntityClick(getEntitiesAt('boat')[0])}
                       className="w-10 h-10 sm:w-12 sm:h-12 bg-background rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:ring-2 ring-primary transition-all z-30"
                     >
                       {icons[getEntitiesAt('boat')[0]]}
                     </motion.button>
                   )}
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-dashed border-amber-900/40 rounded-full flex items-center justify-center">
                   {getEntitiesAt('boat')[1] && (
                     <motion.button 
                       layoutId={getEntitiesAt('boat')[1]}
                       onClick={() => handleEntityClick(getEntitiesAt('boat')[1])}
                       className="w-10 h-10 sm:w-12 sm:h-12 bg-background rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:ring-2 ring-primary transition-all z-30"
                     >
                       {icons[getEntitiesAt('boat')[1]]}
                     </motion.button>
                   )}
                </div>
              </motion.div>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="mt-0 sm:mt-2 flex gap-4">
          <button 
            onClick={moveBoat}
            disabled={!!gameOverReason || isVictorious}
            className="flex items-center gap-2 px-8 py-2 bg-primary text-primary-foreground font-bold rounded-xl shadow-md hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Ship className="w-5 h-5" /> 
            Seberangkan Perahu
          </button>
          
          <button 
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground font-bold rounded-xl shadow-md hover:bg-secondary/80 transition-all active:scale-95"
          >
            <RefreshCcw className="w-5 h-5" />
            Ulang
          </button>
        </div>

        {/* Game State Overlay */}
        <AnimatePresence>
          {gameOverReason && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mt-6 p-4 bg-red-500/20 border-2 border-red-500 rounded-xl text-red-600 dark:text-red-400 font-bold flex items-center gap-3 text-center"
            >
              <span className="text-3xl">💀</span>
              {gameOverReason}
            </motion.div>
          )}

          {isVictorious && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-4 bg-emerald-500/20 border-2 border-emerald-500 rounded-xl text-emerald-700 dark:text-emerald-400 font-bold flex flex-col items-center gap-2 text-center"
            >
              <div className="flex gap-2 text-3xl">🎉 🏆 🎉</div>
              Selamat! Anda telah memecahkan masalah ini dengan Algoritma yang tepat!
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Log Panel (Algorithm Steps) */}
      <div className="w-full lg:w-80 bg-background rounded-xl border p-4 shadow-sm h-full max-h-[500px] flex flex-col">
        <h4 className="font-bold flex items-center gap-2 border-b pb-3 text-primary">
          <ListOrdered className="w-5 h-5" />
          Log Algoritma Anda
        </h4>
        <div className="flex-1 overflow-y-auto pt-3 space-y-2">
          {moveHistory.length === 0 ? (
            <div className="text-sm text-slate-600 dark:text-slate-400 italic text-center mt-10 font-medium">Belum ada langkah yang diambil.</div>
          ) : (
            moveHistory.map((move, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm p-2 bg-secondary/30 rounded-md border border-border flex gap-2 items-start"
              >
                <span className="font-bold text-slate-700 dark:text-slate-300 shrink-0">{i + 1}.</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">{move}</span>
              </motion.div>
            ))
          )}
        </div>
        {isVictorious && (
          <div className="mt-4 pt-4 border-t text-xs text-emerald-600 font-bold text-center">
            Langkah-langkah di atas adalah sebuah algoritma penyelesaian!
          </div>
        )}
      </div>

      </div>
    </div>
  );
}
