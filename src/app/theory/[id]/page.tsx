"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Cpu, Code, Layers, CheckCircle, Trophy, History } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Pertemuan1 from '@/components/theory/Pertemuan1';
import Pertemuan2 from '@/components/theory/Pertemuan2';
import Pertemuan3 from '@/components/theory/Pertemuan3';
import Pertemuan4 from '@/components/theory/Pertemuan4';
import Pertemuan5 from '@/components/theory/Pertemuan5';

export default function TheoryPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress for reading indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background relative pb-32">
      {/* Sub-Header Navigation & Reading Progress (Berada di bawah Navbar Utama) */}
      <div className="sticky top-16 z-40 bg-background/90 backdrop-blur-md border-b border-border/50 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center p-3 md:p-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mr-4 md:mr-6 shrink-0">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-semibold text-xs md:text-sm">Peta Utama</span>
          </Link>
          <div className="flex-1">
            <h1 className="font-bold text-xs md:text-base truncate text-foreground">
              {unwrappedParams.id === '1' ? 'Pertemuan 1: Pengenalan Komputer & Bahasa' : 
               unwrappedParams.id === '2' ? 'Pertemuan 2: Arsitektur & Organisasi Komputer' : 
               unwrappedParams.id === '3' ? 'Pertemuan 3: Pondasi Algoritma' : 
               unwrappedParams.id === '4' ? 'Pertemuan 4: Tipe Data, Variabel & I/O Dasar' : 
               unwrappedParams.id === '5' ? 'Pertemuan 5: Operator, Ekspresi & Manipulasi Data' :
               `Pertemuan ${unwrappedParams.id}`}
            </h1>
          </div>
          <div className="text-xs font-mono font-bold text-primary ml-4 shrink-0 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
            {Math.round(scrollProgress * 100)}% Dibaca
          </div>
        </div>
        {/* Progress Bar Line */}
        <div className="h-1 w-full bg-secondary">
          <div 
            className="h-full bg-primary transition-all duration-150" 
            style={{ width: `${scrollProgress * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Content Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-12 text-lg leading-relaxed text-foreground/90">
        {unwrappedParams.id === '1' && <Pertemuan1 />}
        {unwrappedParams.id === '2' && <Pertemuan2 />}
        {unwrappedParams.id === '3' && <Pertemuan3 />}
        {unwrappedParams.id === '4' && <Pertemuan4 />}
        {unwrappedParams.id === '5' && <Pertemuan5 />}
        {unwrappedParams.id !== '1' && unwrappedParams.id !== '2' && unwrappedParams.id !== '3' && unwrappedParams.id !== '4' && unwrappedParams.id !== '5' && (
           <div className="p-8 text-center mt-20 text-muted-foreground font-mono">Materi belum tersedia untuk pertemuan ini.</div>
        )}
      </main>



    </div>
  );
}
