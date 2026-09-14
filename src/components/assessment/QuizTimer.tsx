'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface QuizTimerProps {
  duration: number; // Dalam detik
  onTimeUp: () => void;
  isActive: boolean; // Jika false, timer berhenti (paused)
}

export function QuizTimer({ duration, onTimeUp, isActive }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Reset timer jika duration berubah (misal pindah ke soal baru yang batas waktunya beda)
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Gunakan setTimeout agar state selesai di-update sebelum trigger event parent
          setTimeout(() => onTimeUp(), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, onTimeUp]);

  const percentage = (timeLeft / duration) * 100;
  
  // Tentukan warna berdasarkan sisa persentase waktu
  let textColorClass = 'text-emerald-500';
  let bgColorClass = 'bg-emerald-500/10 border-emerald-500/30';
  let barColor = '#10B981'; // emerald-500
  
  if (percentage <= 25) {
    textColorClass = 'text-red-500';
    bgColorClass = 'bg-red-500/10 border-red-500/30';
    barColor = '#EF4444'; // red-500
  } else if (percentage <= 50) {
    textColorClass = 'text-amber-500';
    bgColorClass = 'bg-amber-500/10 border-amber-500/30';
    barColor = '#F59E0B'; // amber-500
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-sm transition-colors duration-500 ${bgColorClass}`}>
      <Clock className={`w-4 h-4 ${textColorClass} ${percentage <= 25 ? 'animate-pulse' : ''}`} />
      
      <span className={`font-mono font-bold text-sm tabular-nums tracking-wider ${textColorClass}`}>
        {formatTime(timeLeft)}
      </span>
      
      {/* Progress Bar visual (hanya tampil di layar yang lebih besar dari mobile) */}
      <div className="w-24 h-1.5 bg-black/20 dark:bg-white/10 rounded-full overflow-hidden hidden sm:block">
        <motion.div 
          className="h-full rounded-full"
          style={{ backgroundColor: barColor }}
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'linear' }}
        />
      </div>
    </div>
  );
}
