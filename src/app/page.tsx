"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Sparkles, 
  Cpu, 
  Layers, 
  GitCommit, 
  Code2, 
  BookOpen, 
  Terminal, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Award, 
  ShieldCheck, 
  Binary, 
  Flame, 
  LayoutGrid, 
  Wand2, 
  Bot, 
  ChevronRight,
  Monitor,
  Database,
  Braces,
  GitBranch,
  Repeat,
  PackageCheck,
  Check,
  Compass,
  Lightbulb,
  GraduationCap,
  Workflow,
  MousePointerClick,
  FileCheck
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Leaderboard } from "@/components/Leaderboard";

interface Meeting {
  id: number;
  chapterNum: number;
  title: string;
  subtitle: string;
  type: 'theory' | 'code' | 'exam';
  labs: string[];
  status: 'ready' | 'upcoming';
  description: string;
  badgeColor: string;
}

const chaptersData: {
  pillarId: number;
  pillarTitle: string;
  pillarSubtitle: string;
  pillarDesc: string;
  pillarIcon: any;
  pillarColor: string;
  meetings: Meeting[];
}[] = [
  {
    pillarId: 1,
    pillarTitle: "Pilar 1: Fondasi Logika, Algoritma & Tipe Data",
    pillarSubtitle: "Pertemuan 1 s.d. 5",
    pillarDesc: "Membangun cara berpikir komputasional, representasi algoritma baku, sistem bilangan biner, arsitektur memori RAM, dan manipulasi data ekspresi.",
    pillarIcon: Binary,
    pillarColor: "from-blue-600 to-indigo-600",
    meetings: [
      {
        id: 1,
        chapterNum: 1,
        title: "Pengenalan Komputer & Pemrograman",
        subtitle: "Evolusi komputasi, bahasa pemrograman, dan siklus eksekusi program.",
        type: "theory",
        labs: ["Sejarah Komputasi", "Siklus Fetch-Decode-Execute", "Bilingual Python vs JS"],
        status: "ready",
        description: "Memahami bagaimana instruksi digital diterjemahkan hingga dieksekusi oleh perangkat keras komputer.",
        badgeColor: "bg-blue-50 dark:bg-blue-950/70 text-blue-900 dark:text-blue-100 border-blue-300 dark:border-blue-700/80"
      },
      {
        id: 2,
        chapterNum: 2,
        title: "Arsitektur Komputer & Sistem Bilangan",
        subtitle: "Biner, Desimal, Heksadesimal, dan gerbang logika dasar.",
        type: "theory",
        labs: ["Interactive Radix Converter", "Live Bit Matrix", "Logic Switch Gates"],
        status: "ready",
        description: "Menguasai konversi basis radiks dan representasi bit biner di dalam sirkuit digital modern.",
        badgeColor: "bg-cyan-50 dark:bg-cyan-950/70 text-cyan-900 dark:text-cyan-100 border-cyan-300 dark:border-cyan-700/80"
      },
      {
        id: 3,
        chapterNum: 3,
        title: "Notasi & Penyajian Algoritma",
        subtitle: "Algoritma Naratif, Flowchart Interaktif, dan Pseudocode 3 Blok Baku.",
        type: "theory",
        labs: ["Tri-Directional Converter", "Pedagogical Rule Linter", "Flowchart Visualizer"],
        status: "ready",
        description: "Menyajikan logika pemecahan masalah dengan 3 teknik baku yang saling tersinkronisasi dan tervalidasi.",
        badgeColor: "bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-100 border-emerald-300 dark:border-emerald-700/80"
      },
      {
        id: 4,
        chapterNum: 4,
        title: "Tipe Data, Variabel & I/O Dasar",
        subtitle: "Alokasi memori RAM, sistem tipe data, identifier, dan jembatan I/O.",
        type: "theory",
        labs: ["RAM Cell Matrix Inspector", "Identifier Rules Validator", "Type Casting Lab"],
        status: "ready",
        description: "Menelusuri bagaimana variabel memesan alamat memori RAM serta aturan ketat penamaan identifier.",
        badgeColor: "bg-amber-50 dark:bg-amber-950/70 text-amber-950 dark:text-amber-100 border-amber-300 dark:border-amber-700/80"
      },
      {
        id: 5,
        chapterNum: 5,
        title: "Operator, Ekspresi & Manipulasi Data",
        subtitle: "Aritmatika, Modulo, Relasional, Logika Boolean, dan Presedensi PEMDAS.",
        type: "theory",
        labs: ["Rotating Modulo Clock", "PEMDAS Expression Tree", "Interactive Truth Table", "Studio Praktikum"],
        status: "ready",
        description: "Mengoperasikan data secara presisi, memahami taksonomi operator uner/biner/ternari, dan hierarki evaluasi.",
        badgeColor: "bg-purple-50 dark:bg-purple-950/70 text-purple-900 dark:text-purple-100 border-purple-300 dark:border-purple-700/80"
      }
    ]
  },
  {
    pillarId: 2,
    pillarTitle: "Pilar 2: Struktur Kontrol & Percabangan Logika",
    pillarSubtitle: "Pertemuan 6 s.d. 8",
    pillarDesc: "Mengembangkan algoritma cerdas yang mampu mengambil keputusan kondisional berdasarkan evaluasi logika Boolean.",
    pillarIcon: GitBranch,
    pillarColor: "from-amber-600 to-orange-600",
    meetings: [
      {
        id: 6,
        chapterNum: 6,
        title: "Struktur Percabangan Tunggal & Ganda (IF - ELSE)",
        subtitle: "Naratif, Flowchart, Pseudocode & Kode — 4 representasi algoritma percabangan IF & IF-ELSE.",
        type: "code",
        labs: ["Lab Simbol Flowchart", "Lab IF Tunggal & IF-ELSE", "Lab Studi Kasus Terpadu"],
        status: "ready",
        description: "Membangun alur logika bercabang untuk merespons kondisi input yang berbeda secara dinamis.",
        badgeColor: "bg-amber-50 dark:bg-amber-950/70 text-amber-950 dark:text-amber-100 border-amber-300 dark:border-amber-700/80"
      },
      {
        id: 7,
        chapterNum: 7,
        title: "Percabangan Majemuk & Bersarang (Nested IF / ELIF)",
        subtitle: "Struktur hierarki multi-kondisi, evaluasi berjenjang, dan seleksi diskrit.",
        type: "code",
        labs: ["Lab Predikat Nilai (Cascading IF-ELIF)", "Lab Skrining Donor Darah (Nested IF)", "Lab Menu ATM (Switch / Match-Case)", "Lab Kasir Restoran Terpadu"],
        status: "ready",
        description: "Menyelesaikan studi kasus kompleks dengan skenario keputusan multi-kondisi, hierarki bersarang (nested), dan seleksi diskrit berdasar 4 representasi standar.",
        badgeColor: "bg-orange-50 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-orange-300 dark:border-orange-700/80"
      },
      {
        id: 8,
        chapterNum: 8,
        title: "Evaluasi Tengah Semester (UTS)",
        subtitle: "Uji komprehensif logika, flowchart, pseudocode, dan percabangan.",
        type: "exam",
        labs: ["Ujian Teori Online Anti-Cheat", "Coding Challenge Realtime", "Rapor Hasil Instan"],
        status: "upcoming",
        description: "Evaluasi penguasaan konsep fundamental Pilar 1 dan Pilar 2.",
        badgeColor: "bg-rose-50 dark:bg-rose-950/70 text-rose-950 dark:text-rose-100 border-rose-300 dark:border-rose-700/80"
      }
    ]
  },
  {
    pillarId: 3,
    pillarTitle: "Pilar 3: Struktur Perulangan & Koleksi Data",
    pillarSubtitle: "Pertemuan 9 s.d. 12",
    pillarDesc: "Otomasi pemrosesan data bervolume besar melalui perulangan terkontrol dan struktur data majemuk.",
    pillarIcon: Repeat,
    pillarColor: "from-emerald-600 to-teal-600",
    meetings: [
      {
        id: 9,
        chapterNum: 9,
        title: "Perulangan Terhitung (FOR Loop)",
        subtitle: "Iterasi sekuensial, range stepping, dan manipulasi index counter.",
        type: "code",
        labs: ["Loop Visualizer Stepper", "Deret Bilangan Generator", "Loop Unrolling Benchmarker"],
        status: "upcoming",
        description: "Mengeksekusi blok kode berulang dengan batas iterasi yang telah ditentukan secara pasti.",
        badgeColor: "bg-emerald-50 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 border-emerald-300 dark:border-emerald-700/80"
      },
      {
        id: 10,
        chapterNum: 10,
        title: "Perulangan Terkondisi (WHILE & DO-WHILE Loop)",
        subtitle: "Loop berbasis state, penjaga infinite loop, dan sentinel values.",
        type: "code",
        labs: ["Infinite Loop Guard Simulator", "Sentinel Input Trap", "Live Convergence Tracker"],
        status: "upcoming",
        description: "Menjalankan perulangan dinamis selama syarat logis tertentu terpenuhi.",
        badgeColor: "bg-teal-50 dark:bg-teal-950/70 text-teal-950 dark:text-teal-100 border-teal-300 dark:border-teal-700/80"
      },
      {
        id: 11,
        chapterNum: 11,
        title: "Array 1 Dimensi & Manipulasi Vektor",
        subtitle: "Struktur data sekuensial, alokasi memori berurutan, dan algoritma pencarian linear.",
        type: "code",
        labs: ["Array Memory Visualizer", "Linear Search vs Index Lookup", "Dynamic Resizing Sandbox"],
        status: "upcoming",
        description: "Mengorganisir kumpulan data sejenis dalam satu wadah dengan indeks bernomor.",
        badgeColor: "bg-sky-50 dark:bg-sky-950/70 text-sky-950 dark:text-sky-100 border-sky-300 dark:border-sky-700/80"
      },
      {
        id: 12,
        chapterNum: 12,
        title: "Array 2 Dimensi & Matriks",
        subtitle: "Tabel baris-kolom, nested loop traversal, dan operasi matriks.",
        type: "code",
        labs: ["Matrix Cell Heatmap", "Row-Major vs Column-Major Walk", "Game Board State Engine"],
        status: "upcoming",
        description: "Memodelkan data spasial berbentuk kisi (grid), tabel, dan representasi gambar digital.",
        badgeColor: "bg-indigo-50 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-100 border-indigo-300 dark:border-indigo-700/80"
      }
    ]
  },
  {
    pillarId: 4,
    pillarTitle: "Pilar 4: Modularitas, Rekursi & Rekayasa Perangkat Lunak",
    pillarSubtitle: "Pertemuan 13 s.d. 16",
    pillarDesc: "Membangun perangkat lunak modular, fungsi mandiri, algoritma rekursif, dan proyek akhir aplikasi nyata.",
    pillarIcon: PackageCheck,
    pillarColor: "from-violet-600 to-purple-600",
    meetings: [
      {
        id: 13,
        chapterNum: 13,
        title: "Fungsi, Prosedur & Parameter Passing",
        subtitle: "Dekonstruksi kode (DRY), scope variabel lokal vs global, dan call stack.",
        type: "code",
        labs: ["Call Stack Frame Visualizer", "Pass-by-Value vs Reference Lab", "Pure Function Inspector"],
        status: "upcoming",
        description: "Membagi program besar menjadi modul-modul fungsi kecil yang dapat digunakan kembali.",
        badgeColor: "bg-purple-50 dark:bg-purple-950/70 text-purple-950 dark:text-purple-100 border-purple-300 dark:border-purple-700/80"
      },
      {
        id: 14,
        chapterNum: 14,
        title: "Algoritma Rekursif & Divide-and-Conquer",
        subtitle: "Base case, recursive step, visualisasi call stack tree, dan rekursi memoisasi.",
        type: "code",
        labs: ["Recursion Tree Generator", "Stack Overflow Simulator", "Tower of Hanoi Player"],
        status: "upcoming",
        description: "Menyelesaikan masalah komputasi kompleks dengan memanggil fungsi itu sendiri secara elegan.",
        badgeColor: "bg-fuchsia-50 dark:bg-fuchsia-950/70 text-fuchsia-950 dark:text-fuchsia-100 border-fuchsia-300 dark:border-fuchsia-700/80"
      },
      {
        id: 15,
        chapterNum: 15,
        title: "Algoritma Pengurutan (Sorting) & Pencarian (Searching)",
        subtitle: "Bubble sort, insertion sort, binary search, dan analisis kompleksitas Big-O.",
        type: "code",
        labs: ["Live Sort Bar Race", "Binary Search Tree Stepper", "Big-O Curve Comparison"],
        status: "upcoming",
        description: "Mengoptimalkan kecepatan komputasi data besar dengan algoritma standar industri.",
        badgeColor: "bg-pink-50 dark:bg-pink-950/70 text-pink-950 dark:text-pink-100 border-pink-300 dark:border-pink-700/80"
      },
      {
        id: 16,
        chapterNum: 16,
        title: "Ujian Akhir Semester (UAS) & Proyek Aplikasi",
        subtitle: "Penyusunan proyek aplikasi modular terintegrasi dan ujian akhir.",
        type: "exam",
        labs: ["Terminal CLI App Sandbox", "Live Code Reviewer", "Sertifikat Kelulusan & Lencana Emas"],
        status: "upcoming",
        description: "Puncak evaluasi akademik dan portofolio proyek perangkat lunak mandiri mahasiswa.",
        badgeColor: "bg-amber-50 dark:bg-amber-950/70 text-amber-950 dark:text-amber-100 border-amber-300 dark:border-amber-700/80"
      }
    ]
  }
];

const CHAPTER_THEMES: Record<number, {
  FrontIcon: any;
  BackIcon: any;
  frontGrad: string;
  backGrad: string;
  glowGrad: string;
}> = {
  1: {
    FrontIcon: Cpu,
    BackIcon: Terminal,
    frontGrad: 'from-blue-500 via-indigo-600 to-purple-600',
    backGrad: 'from-cyan-400 via-teal-500 to-emerald-500',
    glowGrad: 'from-blue-500/35 to-purple-500/25',
  },
  2: {
    FrontIcon: Cpu,
    BackIcon: Binary,
    frontGrad: 'from-blue-600 via-cyan-600 to-teal-500',
    backGrad: 'from-emerald-400 via-teal-500 to-cyan-500',
    glowGrad: 'from-cyan-500/35 to-emerald-500/25',
  },
  3: {
    FrontIcon: Workflow,
    BackIcon: GitCommit,
    frontGrad: 'from-emerald-600 via-teal-600 to-cyan-600',
    backGrad: 'from-fuchsia-500 via-purple-600 to-indigo-600',
    glowGrad: 'from-emerald-500/35 to-purple-500/25',
  },
  4: {
    FrontIcon: Layers,
    BackIcon: Code2,
    frontGrad: 'from-amber-500 via-orange-600 to-rose-600',
    backGrad: 'from-blue-500 via-indigo-600 to-violet-600',
    glowGrad: 'from-amber-500/35 to-blue-500/25',
  },
  5: {
    FrontIcon: Zap,
    BackIcon: Braces,
    frontGrad: 'from-rose-500 via-pink-600 to-purple-600',
    backGrad: 'from-amber-400 via-yellow-500 to-orange-500',
    glowGrad: 'from-rose-500/35 to-amber-500/25',
  },
  6: {
    FrontIcon: GitBranch,
    BackIcon: ChevronRight,
    frontGrad: 'from-amber-500 via-orange-500 to-red-500',
    backGrad: 'from-blue-500 via-indigo-600 to-purple-600',
    glowGrad: 'from-orange-500/35 to-purple-500/25',
  },
  7: {
    FrontIcon: Layers,
    BackIcon: GitBranch,
    frontGrad: 'from-orange-500 via-amber-600 to-yellow-500',
    backGrad: 'from-emerald-500 via-teal-500 to-cyan-500',
    glowGrad: 'from-orange-500/35 to-emerald-500/25',
  },
  8: {
    FrontIcon: Award,
    BackIcon: ShieldCheck,
    frontGrad: 'from-rose-600 via-red-600 to-pink-600',
    backGrad: 'from-amber-400 via-yellow-500 to-amber-600',
    glowGrad: 'from-rose-500/35 to-yellow-500/25',
  },
  9: {
    FrontIcon: Repeat,
    BackIcon: Monitor,
    frontGrad: 'from-teal-600 via-emerald-600 to-green-500',
    backGrad: 'from-indigo-500 via-blue-600 to-cyan-500',
    glowGrad: 'from-teal-500/35 to-blue-500/25',
  },
  10: {
    FrontIcon: Repeat,
    BackIcon: Database,
    frontGrad: 'from-cyan-600 via-teal-600 to-emerald-500',
    backGrad: 'from-violet-500 via-purple-600 to-pink-600',
    glowGrad: 'from-cyan-500/35 to-purple-500/25',
  },
  11: {
    FrontIcon: Database,
    BackIcon: Layers,
    frontGrad: 'from-sky-600 via-cyan-600 to-blue-600',
    backGrad: 'from-emerald-400 via-teal-500 to-cyan-500',
    glowGrad: 'from-sky-500/35 to-emerald-500/25',
  },
  12: {
    FrontIcon: Braces,
    BackIcon: Database,
    frontGrad: 'from-blue-600 via-indigo-600 to-violet-600',
    backGrad: 'from-amber-400 via-orange-500 to-rose-500',
    glowGrad: 'from-indigo-500/35 to-amber-500/25',
  },
  13: {
    FrontIcon: PackageCheck,
    BackIcon: Code2,
    frontGrad: 'from-violet-600 via-purple-600 to-fuchsia-600',
    backGrad: 'from-cyan-400 via-blue-500 to-indigo-500',
    glowGrad: 'from-violet-500/35 to-cyan-500/25',
  },
  14: {
    FrontIcon: Repeat,
    BackIcon: GitBranch,
    frontGrad: 'from-purple-600 via-fuchsia-600 to-pink-600',
    backGrad: 'from-amber-400 via-orange-500 to-red-500',
    glowGrad: 'from-purple-500/35 to-amber-500/25',
  },
  15: {
    FrontIcon: ShieldCheck,
    BackIcon: Zap,
    frontGrad: 'from-pink-600 via-rose-600 to-red-600',
    backGrad: 'from-amber-400 via-yellow-500 to-orange-500',
    glowGrad: 'from-pink-500/35 to-yellow-500/25',
  },
  16: {
    FrontIcon: GraduationCap,
    BackIcon: Award,
    frontGrad: 'from-rose-600 via-purple-600 to-indigo-600',
    backGrad: 'from-yellow-400 via-amber-500 to-orange-500',
    glowGrad: 'from-purple-500/35 to-amber-500/25',
  },
};

function ChapterIllustration({ num }: { num: number; pillarId?: number }) {
  const theme = CHAPTER_THEMES[num] ?? CHAPTER_THEMES[1];
  const { FrontIcon, BackIcon, frontGrad, backGrad, glowGrad } = theme;

  return (
    <div className="relative w-[76px] h-[76px] shrink-0 flex items-center justify-center select-none pointer-events-none">
      <div className={`absolute inset-1 rounded-full bg-gradient-to-tr ${glowGrad} blur-xl opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 pointer-events-none`} />
      <div className={`absolute right-1 bottom-1 w-11 h-11 rounded-2xl bg-gradient-to-br ${backGrad} shadow-md border border-white/30 dark:border-white/15 flex items-center justify-center -rotate-8 transform transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-105`}>
        <BackIcon className="w-5 h-5 text-white drop-shadow-xs" />
      </div>
      <div className={`absolute left-0.5 top-0.5 w-12 h-12 rounded-2xl bg-gradient-to-br ${frontGrad} shadow-xl border border-white/40 dark:border-white/20 flex items-center justify-center rotate-4 transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}>
        <FrontIcon className="w-6 h-6 text-white drop-shadow-sm" />
      </div>
    </div>
  );
}

const PILLAR_STYLES: Record<number, {
  gradient: string; glow: string; ring: string;
  cardBorderL: string; badgeBg: string; iconBg: string;
  numColor: string; activeBg: string; inactiveBg: string; button: string;
}> = {
  1: {
    gradient:    'from-blue-600 to-indigo-600',
    glow:        'hover:shadow-blue-500/20',
    ring:        'ring-blue-500/40',
    cardBorderL: 'border-l-blue-500',
    badgeBg:     'bg-blue-100 dark:bg-blue-950/60 border-blue-300 dark:border-blue-700/60 text-blue-800 dark:text-blue-200',
    iconBg:      'bg-gradient-to-br from-blue-600 to-indigo-600',
    numColor:    'text-blue-700 dark:text-blue-300',
    activeBg:    'from-blue-500/10 to-indigo-500/10',
    inactiveBg:  'from-blue-500/5 to-indigo-500/5',
    button:      'from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500',
  },
  2: {
    gradient:    'from-amber-500 to-orange-600',
    glow:        'hover:shadow-amber-500/20',
    ring:        'ring-amber-500/40',
    cardBorderL: 'border-l-amber-500',
    badgeBg:     'bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700/60 text-amber-900 dark:text-amber-200',
    iconBg:      'bg-gradient-to-br from-amber-500 to-orange-600',
    numColor:    'text-amber-800 dark:text-amber-300',
    activeBg:    'from-amber-500/10 to-orange-500/10',
    inactiveBg:  'from-amber-500/5 to-orange-500/5',
    button:      'from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500',
  },
  3: {
    gradient:    'from-emerald-500 to-teal-600',
    glow:        'hover:shadow-emerald-500/20',
    ring:        'ring-emerald-500/40',
    cardBorderL: 'border-l-emerald-500',
    badgeBg:     'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700/60 text-emerald-900 dark:text-emerald-200',
    iconBg:      'bg-gradient-to-br from-emerald-500 to-teal-600',
    numColor:    'text-emerald-800 dark:text-emerald-300',
    activeBg:    'from-emerald-500/10 to-teal-500/10',
    inactiveBg:  'from-emerald-500/5 to-teal-500/5',
    button:      'from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500',
  },
  4: {
    gradient:    'from-violet-600 to-purple-600',
    glow:        'hover:shadow-violet-500/20',
    ring:        'ring-violet-500/40',
    cardBorderL: 'border-l-violet-500',
    badgeBg:     'bg-violet-100 dark:bg-violet-950/60 border-violet-300 dark:border-violet-700/60 text-violet-900 dark:text-violet-200',
    iconBg:      'bg-gradient-to-br from-violet-600 to-purple-600',
    numColor:    'text-violet-800 dark:text-violet-300',
    activeBg:    'from-violet-500/10 to-purple-500/10',
    inactiveBg:  'from-violet-500/5 to-purple-500/5',
    button:      'from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500',
  },
};

export default function Home() {
  const { language } = useLanguage();
  const [activeTabPillar, setActiveTabPillar] = useState<number>(1);

  return (
    <div className="flex-1 bg-background text-foreground min-h-screen relative overflow-hidden font-sans selection:bg-primary/25 selection:text-primary transition-colors duration-300">
      
      {/* Dynamic Background Subtle Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.18, 0.08], x: [0, 60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[15%] -left-[10%] w-[650px] h-[650px] rounded-full bg-blue-500/20 blur-[130px] dark:bg-blue-600/25 dark:blur-[140px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.25, 1], opacity: [0.08, 0.16, 0.08], y: [0, -50, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[35%] -right-[15%] w-[750px] h-[750px] rounded-full bg-purple-500/20 blur-[150px] dark:bg-purple-600/20 dark:blur-[160px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.15, 0.05], x: [0, -40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] left-[25%] w-[600px] h-[600px] rounded-full bg-emerald-500/20 blur-[140px] dark:bg-emerald-600/20 dark:blur-[150px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION: INTUITIVE, STUDENT-CENTRIC & CLEAR CALL-TO-ACTION        */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl border border-border/70 bg-card/90 dark:bg-slate-900/80 backdrop-blur-2xl p-6 md:p-10 lg:p-12 shadow-xl dark:shadow-[0_20px_70px_rgba(0,0,0,0.5)] overflow-hidden transition-all">
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* Left Column: Clear Value Proposition & Direct Entry Point */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold shadow-xs">
                <GraduationCap className="w-4 h-4" />
                <span>Mata Kuliah: Algoritma &amp; Pemrograman (TI-101 • 3 SKS)</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Membangun Fondasi <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">
                  Logika Pemrograman
                </span>
                <br className="hidden sm:inline" /> &amp; Rekayasa Solusi
              </h1>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl font-normal">
                Platform perkuliahan interaktif modern. Pelajari algoritma melalui visualisasi diagram alir (*Flowchart*), inspeksi memori RAM secara langsung, simulasi eksekusi kode, dan uji pemahaman dengan evaluasi instan berbasis kecerdasan buatan.
              </p>

              {/* ACTION BUTTONS: Highly clear, no confusion */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/theory/1"
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 flex items-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Mulai Belajar: Minggu 01</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="#jadwal-pertemuan"
                  className="px-5 py-4 rounded-2xl bg-secondary/80 hover:bg-secondary border border-border text-foreground font-bold text-sm shadow-xs hover:shadow-md flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer backdrop-blur"
                >
                  <Compass className="w-4 h-4 text-primary" />
                  <span>Pilih Pertemuan Kuliah</span>
                </Link>

                <Link
                  href="/workspace"
                  className="px-4 py-4 rounded-2xl bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/60 text-muted-foreground hover:text-foreground font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Studio Bebas</span>
                </Link>
              </div>

              {/* 3 Key Highlights */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/60 text-[11px] sm:text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Cpu className="w-4 h-4 text-blue-500 dark:text-cyan-400 shrink-0" />
                  <span>Python &amp; JavaScript</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Workflow className="w-4 h-4 text-purple-500 dark:text-purple-400 shrink-0" />
                  <span>Visual Flow &amp; RAM</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>Asesmen &amp; Lencana AI</span>
                </div>
              </div>

            </div>

            {/* Right Column: "Pusat Mulai Cepat Perkuliahan" (Actionable Hub) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-secondary/40 dark:bg-slate-950 border border-border shadow-xl p-5 sm:p-6 space-y-5 relative overflow-hidden">
                
                {/* Header Hub */}
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-extrabold text-xs sm:text-sm text-foreground">
                      Modul Kuliah Minggu Ini
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                    Siap Dipelajari
                  </span>
                </div>

                {/* Featured Active Card: Minggu 1 */}
                <div className="p-4 rounded-2xl bg-card border border-border shadow-sm space-y-3 relative overflow-hidden group hover:border-primary/50 transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-primary tracking-wider uppercase block">
                        Pertemuan Pembuka
                      </span>
                      <h3 className="font-extrabold text-sm sm:text-base text-foreground leading-snug">
                        Minggu 01: Pengenalan Komputer &amp; Pemrograman
                      </h3>
                    </div>
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shrink-0">
                      <Code2 className="w-5 h-5" />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Pelajari evolusi komputasi, siklus Fetch-Decode-Execute, dan struktur logika dasar pemrograman.
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/theory/1"
                      className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <span>Buka Modul Minggu 1</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Quick Jumps to Other Active Weeks (1-5) */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-muted-foreground block font-semibold">
                    Lompat Cepat ke Pertemuan Lain:
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { week: 2, label: 'M-02', ready: true },
                      { week: 3, label: 'M-03', ready: true },
                      { week: 4, label: 'M-04', ready: true },
                      { week: 5, label: 'M-05', ready: true }
                    ].map((item) => (
                      <Link
                        key={item.week}
                        href={`/theory/${item.week}`}
                        className="p-2.5 rounded-xl bg-card hover:bg-primary/10 border border-border/80 hover:border-primary/40 text-center transition-all group"
                      >
                        <span className="block text-xs font-mono font-bold text-foreground group-hover:text-primary">
                          {item.label}
                        </span>
                        <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-mono block">
                          Aktif
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 1.5. ONBOARDING ALUR: 3 LANGKAH MUDAH BELAJAR DI PLATFORM INI             */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Panduan Belajar Mahasiswa</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground">
              3 Langkah Menguasai Materi Perkuliahan
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              Alur belajar mandiri yang terstruktur untuk membantu Anda memahami logika dari dasar hingga siap ujian.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-3 relative hover:border-blue-500/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center font-extrabold text-sm">
                1
              </div>
              <h3 className="font-bold text-sm sm:text-base text-foreground">
                Pelajari Teori &amp; Animasi Interaktif
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Buka modul mingguan. Konsep rumit seperti biner, pseudocode 3 blok, dan tipe data disajikan dalam animasi visual yang mudah dipahami.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-3 relative hover:border-emerald-500/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-extrabold text-sm">
                2
              </div>
              <h3 className="font-bold text-sm sm:text-base text-foreground">
                Eksperimen di Laboratorium Simulasi
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ubah nilai input, geser slider, dan amati bagaimana alur diagram alir serta alamat memori RAM berubah secara langsung (*live state*).
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-3 relative hover:border-purple-500/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center font-extrabold text-sm">
                3
              </div>
              <h3 className="font-bold text-sm sm:text-base text-foreground">
                Uji Pemahaman &amp; Raih Lencana Nilai
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Kerjakan 5 Soal Kuis Pilihan Ganda dan 5 Soal Esai. Jawaban Anda langsung dinilai oleh Dosen AI untuk membuka lencana capaian prestasi.
              </p>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. 4 PILAR KURIKULUM: ROADMAP & PERTEMUAN LENGKAP                         */}
        {/* ========================================================================= */}
        <div id="jadwal-pertemuan" className="space-y-8 scroll-mt-20">
          
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-primary uppercase tracking-widest">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Jadwal &amp; Modul Perkuliahan Semester 1</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-foreground">
              Peta Jalan Pembelajaran (16 Pertemuan)
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl">
              Silabus disusun terstruktur dalam 4 Pilar Keilmuan. Pilih salah satu pilar di bawah untuk melihat rincian modul pertemuan yang tersedia.
            </p>
          </div>

          {/* Pillar Selector Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {chaptersData.map((pillar) => {
              const Icon = pillar.pillarIcon;
              const isActive = activeTabPillar === pillar.pillarId;
              const ps = PILLAR_STYLES[pillar.pillarId];
              const numLabel = String(pillar.pillarId).padStart(2, '0');

              return (
                <motion.button
                  key={pillar.pillarId}
                  onClick={() => setActiveTabPillar(pillar.pillarId)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  className={`relative p-4 rounded-2xl border text-left cursor-pointer flex flex-col justify-between gap-3 overflow-hidden transition-all duration-300 ${
                    isActive
                      ? `bg-white dark:bg-[#151d30] border-transparent ring-2 ${ps.ring} shadow-xl dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-foreground`
                      : `bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md`
                  }`}
                >
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${ps.gradient} opacity-25 blur-2xl pointer-events-none`}
                    />
                  )}

                  <div className="flex items-center justify-between w-full relative z-10">
                    <div className={`p-2.5 rounded-xl shadow-xs transition-all ${
                      isActive ? `${ps.iconBg} shadow-lg` : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                    }`}>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`} />
                    </div>
                    <div className="text-right">
                      <span className={`block text-[18px] font-black font-mono leading-none ${isActive ? ps.numColor : 'text-slate-400 dark:text-slate-500'}`}>
                        {numLabel}
                      </span>
                      <span className={`text-[10px] font-mono block ${isActive ? 'text-slate-700 dark:text-slate-200 font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                        {pillar.pillarSubtitle}
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className={`font-extrabold text-sm md:text-base leading-snug ${
                      isActive ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'
                    }`}>
                      {pillar.pillarTitle.split(':')[0]}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-1 mt-0.5">
                      {pillar.pillarTitle.split(':')[1]?.trim()}
                    </p>
                  </div>

                  {pillar.pillarId === 1 && (
                    <span className="relative z-10 text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 px-2 py-0.5 rounded-md w-fit flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      5 Modul Lab Siap
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Active Pillar Meeting Cards List */}
          <div className="space-y-4">
            {chaptersData
              .filter(p => p.pillarId === activeTabPillar)
              .map(pillar => (
                <div key={pillar.pillarId} className="space-y-4">
                  
                  {/* Pillar Banner description */}
                  <div className="p-4 md:p-5 rounded-2xl bg-white dark:bg-[#141d30] border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                    <div>
                      <h3 className="font-extrabold text-base md:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{pillar.pillarTitle}</span>
                      </h3>
                      <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 font-medium mt-1 max-w-3xl">
                        {pillar.pillarDesc}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 shrink-0 self-start md:self-center shadow-2xs">
                      {pillar.meetings.length} Pertemuan Pembelajaran
                    </span>
                  </div>

                  {/* Meeting Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {pillar.meetings.map((meeting) => {
                      const isReady = meeting.status === 'ready';
                      const ps = PILLAR_STYLES[pillar.pillarId];
                      const weekLabel = String(meeting.chapterNum).padStart(2, '0');

                      return (
                        <motion.div
                          key={meeting.id}
                          whileHover={{ y: -5 }}
                          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                          className={`relative rounded-3xl p-6 flex flex-col gap-4 overflow-hidden transition-all duration-300 bg-white dark:bg-[#141d30] border border-slate-200 dark:border-slate-700 shadow-xs dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] ${
                            isReady
                              ? `${ps.glow} hover:shadow-xl dark:hover:shadow-indigo-500/10 hover:border-primary/50`
                              : 'hover:shadow-md hover:border-border'
                          }`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${ps.activeBg} opacity-20 pointer-events-none rounded-3xl`} />

                          {/* Row 1: MINGGU XX + status badge */}
                          <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-2">
                              <div className={`p-1.5 rounded-lg border ${ps.badgeBg}`}>
                                <Code2 className="w-4 h-4" />
                              </div>
                              <span className="text-xs font-mono font-bold tracking-wider text-slate-800 dark:text-slate-100">
                                MINGGU {weekLabel}
                              </span>
                            </div>
                            {isReady ? (
                              <span className="flex items-center gap-1.5 text-xs font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700/80 px-3 py-1 rounded-full shadow-2xs">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                                Lab Interaktif Siap
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5 text-xs font-bold bg-amber-50 dark:bg-amber-950/70 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-700/80 px-3 py-1 rounded-full shadow-2xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                                Segera Hadir
                              </span>
                            )}
                          </div>

                          {/* Row 2: Title */}
                          <h4 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white leading-snug tracking-tight relative z-10">
                            {meeting.title}
                          </h4>

                          {/* Row 3: Subtitle + 3D Illustration */}
                          <div className="flex items-center gap-3 relative z-10">
                            <p className="text-sm md:text-[14.5px] text-slate-700 dark:text-slate-100 font-normal leading-relaxed flex-1">
                              {meeting.subtitle}
                            </p>
                            <ChapterIllustration num={meeting.chapterNum} pillarId={pillar.pillarId} />
                          </div>

                          {/* Row 4: Lab tags */}
                          <div className="space-y-2 relative z-10">
                            <span className="text-[11px] font-mono text-slate-600 dark:text-slate-200 font-bold uppercase tracking-wider block">
                              Laboratorium &amp; Praktik:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {meeting.labs.map((lab, lIdx) => (
                                <span
                                  key={lIdx}
                                  className={`font-mono text-xs font-bold border px-2.5 py-1 rounded-lg shadow-2xs ${meeting.badgeColor}`}
                                >
                                  {lab}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Row 5: CTA Button */}
                          <div className="relative z-10 mt-auto pt-2">
                            {isReady ? (
                              <Link
                                href={`/theory/${meeting.chapterNum}`}
                                className={`w-full py-3.5 rounded-2xl bg-gradient-to-r ${ps.button} text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group/btn`}
                              >
                                <span>Buka Modul &amp; Lab Minggu {meeting.chapterNum}</span>
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-200" />
                              </Link>
                            ) : (
                              <div className="w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200/60 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 text-sm font-semibold flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 transition-colors shadow-2xs">
                                <span>Modul Sedang Disiapkan</span>
                              </div>
                            )}
                          </div>

                        </motion.div>
                      );
                    })}
                  </div>

                </div>
              ))}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. LEADERBOARD KELAS (TOP 5)                                              */}
        {/* ========================================================================= */}
        <div className="py-8 relative">
          <div className="absolute inset-0 bg-yellow-500/5 dark:bg-yellow-500/10 -mx-4 sm:-mx-6 md:-mx-12 rounded-3xl blur-2xl"></div>
          <div className="relative z-10">
            <Leaderboard />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. SHOWCASE FITUR UTAMA TEKNOLOGI EDUKASI                                */}
        {/* ========================================================================= */}
        <div className="rounded-3xl border border-border/70 bg-card/60 p-6 md:p-10 space-y-8 backdrop-blur shadow-xs">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary uppercase tracking-widest">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Metodologi &amp; Teknologi</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
              Fitur Pembelajaran Unggulan
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Dirancang untuk memudahkan visualisasi logika pemrograman secara dinamis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Feature 1 */}
            <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-3 shadow-2xs hover:border-blue-500/40 transition-all">
              <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl w-fit border border-blue-500/20">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm md:text-base text-foreground">Bilingual Python &amp; JS</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Beralih bebas antara Python 3 dan JavaScript modern langsung di browser dengan satu tombol.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-3 shadow-2xs hover:border-emerald-500/40 transition-all">
              <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl w-fit border border-emerald-500/20">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm md:text-base text-foreground">Inspeksi Memori RAM</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Visualisasi langsung bagaimana variabel memesan memori dan nilainya berubah saat kode dijalankan.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-3 shadow-2xs hover:border-purple-500/40 transition-all">
              <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl w-fit border border-purple-500/20">
                <Workflow className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm md:text-base text-foreground">Flowchart &amp; Pseudocode Baku</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Standar baku 3 blok pseudocode (Program, Kamus, Algoritma) dan diagram alir interaktif.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-3 shadow-2xs hover:border-amber-500/40 transition-all">
              <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl w-fit border border-amber-500/20">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm md:text-base text-foreground">Evaluasi Esai AI Instan</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ujian esai diperiksa otomatis oleh Dosen AI secara mendalam dengan saran perbaikan yang instan.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
