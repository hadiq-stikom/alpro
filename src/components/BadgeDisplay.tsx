import React from 'react';
import { BadgeConfig } from '@/lib/badges';
import { Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface BadgeDisplayProps {
  badge: BadgeConfig;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function BadgeDisplay({ badge, size = 'md', showLabel = true }: BadgeDisplayProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center justify-center rounded-2xl shadow-lg border-2 ${sizeClasses[size]}`}
        style={{ 
          backgroundColor: `${badge.hexColor}20`, // 20% opacity background
          borderColor: badge.hexColor,
          boxShadow: `0 0 20px ${badge.hexColor}40` 
        }}
      >
        <Award 
          className={iconSizes[size]} 
          style={{ color: badge.hexColor }} 
        />
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
      
      {showLabel && (
        <div className="text-center">
          <div className="font-black text-sm uppercase tracking-wider" style={{ color: badge.hexColor }}>
            {badge.level}
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            {badge.name.split(' ')[0]} {/* Display only the Indonesian part like "Emas" */}
          </div>
        </div>
      )}
    </div>
  );
}
