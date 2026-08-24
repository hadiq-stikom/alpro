"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, HardDrive, MemoryStick, Zap, Cpu, Monitor, ChevronRight } from 'lucide-react';

const steps = [
  { id: 'hd', label: "Harddisk", icon: HardDrive, desc: "Penyimpanan jangka panjang. Data/Program diam di sini saat tidak dijalankan." },
  { id: 'ram', label: "RAM", icon: MemoryStick, desc: "RAM menyalin data dari Harddisk. Menjadi meja kerja sementara yang sangat cepat." },
  { id: 'cache', label: "Cache", icon: Zap, desc: "Memori berukuran super kecil tapi secepat kilat. Menyimpan data yang paling sering diakses." },
  { id: 'cpu', label: "CPU", icon: Cpu, desc: "CPU mengambil instruksi, memprosesnya (hitung/logika), dan mengontrol seluruh sistem." },
  { id: 'io', label: "I/O", icon: Monitor, desc: "Hasil dari proses CPU dikirim ke modul Output (seperti layar) agar bisa dilihat manusia." }
];

export default function AnimatedComputerOperation() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500); // 2.5 seconds per step
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlay = () => {
    if (activeStep >= steps.length - 1) {
      setActiveStep(0);
    }
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStep(0);
  };

  return (
    <div className="bg-primary/5 p-5 md:p-6 rounded-xl border border-primary/20 text-foreground relative overflow-hidden my-6">
      
      {/* Controls */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
        <div>
          <h3 className="font-bold text-lg text-primary">Simulasi Aliran Data</h3>
          <p className="text-xs text-muted-foreground">Bagaimana program bergerak dari penyimpanan ke layar.</p>
        </div>
        <div className="flex gap-2">
          {isPlaying ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-lg font-bold text-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Memproses...
            </div>
          ) : (
            <button onClick={handlePlay} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-bold text-sm transition-colors">
              <Play className="w-4 h-4" /> {activeStep >= steps.length - 1 ? "Ulangi" : "Jalankan"}
            </button>
          )}
          <button onClick={handleReset} className="p-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual Pipeline */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative py-8 px-4">
        
        {/* Background Track Line */}
        <div className="absolute top-1/2 left-10 right-10 h-1 bg-border -translate-y-1/2 hidden md:block z-0" />

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeStep;
          const isPast = index <= activeStep;

          return (
            <div 
              key={step.id} 
              className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:gap-3 w-full md:w-auto cursor-pointer group"
              onClick={() => {
                setIsPlaying(false);
                setActiveStep(index);
              }}
            >
              
              <div className="md:hidden flex-1 border-t-2 border-dashed border-border" />

              <motion.div 
                className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shrink-0 border-4 transition-colors duration-500 relative
                  ${isActive ? 'bg-background border-primary shadow-[0_0_25px_rgba(var(--primary),0.5)]' : 
                    isPast ? 'bg-primary/20 border-primary text-primary group-hover:bg-primary/40' : 'bg-background border-border text-muted-foreground group-hover:border-primary/50 group-hover:text-primary/70'
                  }`}
                animate={{ scale: isActive ? 1.1 : 1 }}
                whileHover={{ scale: isActive ? 1.1 : 1.05 }}
              >
                <Icon className={`w-8 h-8 md:w-10 md:h-10 ${isActive ? 'text-primary' : ''}`} />
                
                {/* Active Ping */}
                {isActive && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
                  </span>
                )}
              </motion.div>

              <div className="text-left md:text-center w-full md:w-28">
                <div className={`font-bold text-sm md:text-base ${isActive ? 'text-primary' : isPast ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.label}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Description Box */}
      <div className="mt-8 bg-card border border-border p-5 rounded-lg min-h-[100px] flex items-center shadow-inner relative overflow-hidden">
        {/* Progress bar background in description box */}
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: isPlaying ? "100%" : "0%" }}
          transition={{ duration: 2.5, ease: "linear" }}
          key={`progress-${activeStep}`}
        />
        
        <div className="flex gap-4 items-start">
          <div className="bg-primary/10 p-3 rounded-lg text-primary shrink-0">
            {React.createElement(steps[activeStep].icon, { className: "w-6 h-6" })}
          </div>
          <div>
            <h4 className="font-bold text-primary mb-1">Tahap {activeStep + 1}: {steps[activeStep].label}</h4>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {steps[activeStep].desc}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
