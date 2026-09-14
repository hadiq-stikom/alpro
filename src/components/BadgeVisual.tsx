'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { getBadgeFromScore, BadgeConfig } from '@/lib/badges';

interface BadgeVisualProps {
  score?: number;
  config?: BadgeConfig;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
}

export function BadgeVisual({ score, config, size = 'md', showLabel = true }: BadgeVisualProps) {
  // Use provided config or calculate from score
  const badge = config || (score !== undefined ? getBadgeFromScore(score) : null);

  if (!badge) {
    return null; // Don't render if no badge could be resolved
  }

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32',
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 40,
    xl: 64,
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center justify-center rounded-full ${sizeClasses[size]}`}
        style={{
          background: `linear-gradient(135deg, ${badge.hexColor}20, ${badge.hexColor}40)`,
          boxShadow: `0 0 20px ${badge.hexColor}40`,
          border: `2px solid ${badge.hexColor}60`
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <Award size={iconSizes[size]} color={badge.hexColor} strokeWidth={2.5} />
        </motion.div>
        
        {/* Glow effect background */}
        <div 
          className="absolute inset-0 rounded-full blur-xl -z-10"
          style={{ background: badge.hexColor, opacity: 0.25 }}
        />
      </motion.div>
      
      {showLabel && (
        <div className="text-center">
          <div 
            className="font-bold tracking-wide" 
            style={{ color: badge.hexColor, textShadow: `0 0 10px ${badge.hexColor}40` }}
          >
            {badge.level}
          </div>
          <div className="text-[10px] sm:text-xs font-medium text-slate-600 dark:text-slate-400">
            {badge.name.split(' ')[0]} {/* Display only the first part before parenthesis for neatness */}
          </div>
        </div>
      )}
    </div>
  );
}
