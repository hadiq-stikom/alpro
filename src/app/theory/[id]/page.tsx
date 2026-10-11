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
import Pertemuan6 from '@/components/theory/Pertemuan6';
import Pertemuan7 from '@/components/theory/Pertemuan7';
import Pertemuan9 from '@/components/theory/Pertemuan9';
import { TheoryAssessment } from '@/components/assessment/TheoryAssessment';

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

  // Handle auto-scroll jika ada parameter tes atau hash asesmen
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash;
    const urlParams = new URLSearchParams(window.location.search);
    const shouldScrollToAssessment = hash === '#assessment' || hash === '#assessment-section' || urlParams.get('startTest') === 'true';

    if (shouldScrollToAssessment) {
      const scrollTimer = setTimeout(() => {
        const el = document.getElementById('essay-container-card') || document.getElementById('warmup-chat-card') || document.getElementById('assessment-section') || document.getElementById('assessment');
        if (el) {
          const headerOffset = 154; // navbar 64px + sub-header ~70px + aesthetic margin 20px
          const currentScrollY = window.scrollY || window.pageYOffset;
          const targetY = Math.max(0, currentScrollY + el.getBoundingClientRect().top - headerOffset);
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(scrollTimer);
    } else {
      // Akses normal dari menu/peta materi: selalu tampil rapi di paling atas halaman
      window.scrollTo(0, 0);
    }
  }, [unwrappedParams.id]);

  return (
    <div className="min-h-screen bg-background relative pb-32">
      {/* Sub-Header Navigation & Reading Progress (Berada di bawah Navbar Utama) */}
      <div className="sticky top-16 z-40 bg-background/90 backdrop-blur-md border-b border-border/50 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center p-3 md:p-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mr-4 md:mr-6 shrink-0">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-semibold text-xs md:text-sm">Peta Utama</span>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-xs md:text-base truncate text-foreground">
              {unwrappedParams.id === '1' ? 'Pertemuan 1: Pengenalan Komputer & Bahasa' : 
               unwrappedParams.id === '2' ? 'Pertemuan 2: Arsitektur & Organisasi Komputer' : 
               unwrappedParams.id === '3' ? 'Pertemuan 3: Fondasi Algoritma' : 
               unwrappedParams.id === '4' ? 'Pertemuan 4: Tipe Data, Variabel & I/O Dasar' : 
               unwrappedParams.id === '5' ? 'Pertemuan 5: Operator, Ekspresi & Manipulasi Data' :
               unwrappedParams.id === '6' ? 'Pertemuan 6: Struktur Percabangan Statemen Tunggal & Ganda' :
               unwrappedParams.id === '7' ? 'Pertemuan 7: Percabangan Majemuk & Bersarang' :
               unwrappedParams.id === '9' ? 'Pertemuan 9: Dasar Perulangan (FOR & WHILE Loop)' :
               `Pertemuan ${unwrappedParams.id}`}
            </h1>
          </div>
          <div className="text-xs font-mono font-bold text-primary ml-3 shrink-0 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
            {Math.round(scrollProgress * 100)}% Dibaca
          </div>

          {/* Quick Jump to Assessment Button */}
          {['1', '2', '3', '4', '5', '6', '7', '9'].includes(unwrappedParams.id) && (
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('essay-container-card') || document.getElementById('warmup-chat-card') || document.getElementById('assessment-section') || document.getElementById('assessment');
                if (el) {
                  const headerOffset = 154; // navbar 64px + sub-header ~70px + aesthetic margin 20px
                  const currentScrollY = window.scrollY || window.pageYOffset;
                  const targetY = Math.max(0, currentScrollY + el.getBoundingClientRect().top - headerOffset);
                  window.scrollTo({ top: targetY, behavior: 'smooth' });
                }
              }}
              className="ml-3 shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold transition-all shadow-xs hover:shadow-sm cursor-pointer active:scale-95"
              title="Lompat langsung ke Uji Pemahaman / Tes"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Uji Pemahaman</span>
              <span className="sm:hidden">Tes</span>
            </button>
          )}
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12 text-lg leading-relaxed text-foreground/90">
        {unwrappedParams.id === '1' && <Pertemuan1 />}
        {unwrappedParams.id === '2' && <Pertemuan2 />}
        {unwrappedParams.id === '3' && <Pertemuan3 />}
        {unwrappedParams.id === '4' && <Pertemuan4 />}
        {unwrappedParams.id === '5' && <Pertemuan5 />}
        {unwrappedParams.id === '6' && <Pertemuan6 />}
        {unwrappedParams.id === '7' && <Pertemuan7 />}
        {unwrappedParams.id === '9' && <Pertemuan9 />}
        {!['1','2','3','4','5','6','7','9'].includes(unwrappedParams.id) && (
           <div className="p-8 text-center mt-20 text-muted-foreground font-mono">Materi belum tersedia untuk pertemuan ini.</div>
        )}

        {/* Asesmen & Uji Pemahaman */}
        {['1', '2', '3', '4', '5', '6', '7', '9'].includes(unwrappedParams.id) && (
          <div id="assessment" className="pt-2 relative">
            <hr className="border-border/50 mb-3" />
            <TheoryAssessment meetingId={Number(unwrappedParams.id)} />
          </div>
        )}
      </main>

    </div>
  );
}
