"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Package, Truck, Tag, Box, MousePointerClick } from 'lucide-react';

export default function AnimatedShippingAlgorithm() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="bg-primary/10 border-l-4 border-primary p-5 rounded-r-xl my-6 relative overflow-hidden shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ minHeight: isHovered ? 260 : 160 }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
    >
      <div className="absolute top-3 right-4 text-primary text-xs flex items-center gap-1.5 font-bold animate-pulse cursor-default z-20">
        <MousePointerClick className="w-4 h-4" /> Arahkan Kursor (Hover)
      </div>

      <h4 className="font-bold text-primary mb-4 flex items-center gap-2 relative z-20">
        <ChevronRight className="w-5 h-5" /> 
        Contoh Kehidupan Nyata: Algoritma Pengiriman Barang
      </h4>

      <AnimatePresence mode="wait">
        {!isHovered ? (
          <motion.ol 
            key="list"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="list-decimal list-inside space-y-2 text-slate-800 dark:text-slate-200 font-semibold relative z-10"
          >
            <li>Siapkan barang yang dipesan.</li>
            <li>Kemas barang dalam kemasan yang aman.</li>
            <li>Tempelkan alamat pengiriman.</li>
            <li>Pergi ke kantor penyedia jasa kurir pengiriman.</li>
          </motion.ol>
        ) : (
          <motion.div 
            key="animation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full flex flex-col justify-center items-center h-40 relative z-10"
          >
            <ShippingAnimation />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ShippingAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 0) timer = setTimeout(() => setStep(1), 800);  // Step 1: Barang
    else if (step === 1) timer = setTimeout(() => setStep(2), 1000); // Step 2: Kemas
    else if (step === 2) timer = setTimeout(() => setStep(3), 1000); // Step 3: Alamat
    else if (step === 3) timer = setTimeout(() => setStep(4), 1000); // Step 4: Kurir
    else if (step === 4) timer = setTimeout(() => setStep(0), 3000); // Reset after 3s

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="w-full max-w-2xl flex items-center justify-between px-4 sm:px-8 relative mt-4">
       {/* Background Connecting Line */}
       <div className="absolute left-12 right-12 sm:left-16 sm:right-16 top-1/2 -translate-y-1/2 h-1.5 bg-primary/20 -z-10 rounded-full overflow-hidden">
          {/* Progress Bar */}
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: step === 0 ? "0%" : step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
       </div>

       {/* Step 1: Siapkan Barang */}
       <div className="flex flex-col items-center gap-2 relative">
         <motion.div 
           className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-4 bg-background ${step >= 0 ? 'border-primary text-primary shadow-lg shadow-primary/20' : 'border-border text-slate-500 dark:text-slate-400'}`}
           animate={step === 0 ? { scale: [1, 1.2, 1] } : { scale: 1 }}
           transition={{ duration: 0.3 }}
         >
           <Box className="w-6 h-6 sm:w-8 sm:h-8" />
         </motion.div>
         <div className={`text-xs sm:text-sm font-bold ${step >= 0 ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}`}>1. Siapkan</div>
       </div>

       {/* Step 2: Kemas */}
       <div className="flex flex-col items-center gap-2 relative">
         <motion.div 
           className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-4 bg-background ${step >= 1 ? 'border-primary text-primary shadow-lg shadow-primary/20' : 'border-border text-slate-500 dark:text-slate-400'}`}
           animate={step === 1 ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : { scale: 1 }}
           transition={{ duration: 0.4 }}
         >
           <Package className="w-6 h-6 sm:w-8 sm:h-8" />
         </motion.div>
         <div className={`text-xs sm:text-sm font-bold ${step >= 1 ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}`}>2. Kemas</div>
       </div>

       {/* Step 3: Alamat */}
       <div className="flex flex-col items-center gap-2 relative">
         <motion.div 
           className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-4 bg-background ${step >= 2 ? 'border-primary text-primary shadow-lg shadow-primary/20' : 'border-border text-slate-500 dark:text-slate-400'}`}
           animate={step === 2 ? { scale: [1, 1.2, 1], y: [0, -5, 0] } : { scale: 1 }}
           transition={{ duration: 0.3 }}
         >
           <Tag className="w-6 h-6 sm:w-8 sm:h-8" />
         </motion.div>
         <div className={`text-xs sm:text-sm font-bold ${step >= 2 ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}`}>3. Label</div>
       </div>

       {/* Step 4: Kurir */}
       <div className="flex flex-col items-center gap-2 relative">
         <motion.div 
           className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-4 bg-background ${step >= 3 ? 'border-primary text-primary shadow-lg shadow-primary/20' : 'border-border text-slate-500 dark:text-slate-400'}`}
           animate={
             step === 3 ? { scale: [1, 1.2, 1], x: [0, 5, -2, 0] } : 
             step === 4 ? { x: [0, 15], opacity: [1, 0.5] } : 
             { scale: 1, x: 0, opacity: 1 }
           }
           transition={{ duration: step === 4 ? 0.8 : 0.4 }}
         >
           <Truck className="w-6 h-6 sm:w-8 sm:h-8" />
         </motion.div>
         <div className={`text-xs sm:text-sm font-bold ${step >= 3 ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}`}>4. Kirim</div>
       </div>
    </div>
  );
}
