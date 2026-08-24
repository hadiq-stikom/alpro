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
  Workflow
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

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
        subtitle: "Alur keputusan biner, evaluasi kondisi, dan penanganan kondisi alternatif.",
        type: "code",
        labs: ["Flowchart Decision Splitter", "Condition Matrix Evaluator", "Misi Kelulusan SIM"],
        status: "upcoming",
        description: "Membangun alur logika bercabang untuk merespons kondisi input yang berbeda secara dinamis.",
        badgeColor: "bg-amber-50 dark:bg-amber-950/70 text-amber-950 dark:text-amber-100 border-amber-300 dark:border-amber-700/80"
      },
      {
        id: 7,
        chapterNum: 7,
        title: "Percabangan Majemuk & Bersarang (Nested IF / ELIF)",
        subtitle: "Struktur hierarki multi-kondisi dan evaluasi berjenjang.",
        type: "code",
        labs: ["Multi-Branch Decision Tree", "Tarif Kasir & Diskon Bersarang"],
        status: "upcoming",
        description: "Menyelesaikan studi kasus kompleks dengan skenario keputusan lebih dari dua cabang logis.",
        badgeColor: "bg-orange-50 dark:bg-orange-950/70 text-orange-950 dark:text-orange-100 border-orange-300 dark:border-orange-700/80"
      },
      {
        id: 8,
        chapterNum: 8,
        title: "Evaluasi Tengah Semester (UTS)",
        subtitle: "Ujian komprehensif logika komputasi, algoritma, dan pemrograman dasar.",
        type: "exam",
        labs: ["Live Coding Challenge", "Algorithmic Problem Solving Test"],
        status: "upcoming",
        description: "Uji kompetensi terpadu mencakup Fondasi Algoritma, Tipe Data, Operator, dan Percabangan.",
        badgeColor: "bg-rose-50 dark:bg-rose-950/70 text-rose-900 dark:text-rose-100 border-rose-300 dark:border-rose-700/80"
      }
    ]
  },
  {
    pillarId: 3,
    pillarTitle: "Pilar 3: Struktur Perulangan & Koleksi Data",
    pillarSubtitle: "Pertemuan 9 s.d. 12",
    pillarDesc: "Otomatisasi pemrosesan data secara berulang dengan loop efisien serta struktur array dan koleksi.",
    pillarIcon: Repeat,
    pillarColor: "from-emerald-600 to-teal-600",
    meetings: [
      {
        id: 9,
        chapterNum: 9,
        title: "Struktur Perulangan Dasar (FOR & WHILE)",
        subtitle: "Inisialisasi counter, kondisi terminasi, dan update iterasi perulangan.",
        type: "code",
        labs: ["Loop Trace Visualizer", "Infinite Loop Trap Watcher"],
        status: "upcoming",
        description: "Mengotomatisasi tugas komputasi berulang secara cepat dan mengendalikan syarat berhenti loop.",
        badgeColor: "bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-100 border-emerald-300 dark:border-emerald-700/80"
      },
      {
        id: 10,
        chapterNum: 10,
        title: "Perulangan Bersarang & Pola Matriks (Nested Loops)",
        subtitle: "Iterasi 2 dimensi untuk pengolahan baris-kolom dan pola geometris.",
        type: "code",
        labs: ["2D Grid Matrix Generator", "Pola Geometri Algoritmik"],
        status: "upcoming",
        description: "Menerapkan loop di dalam loop untuk memanipulasi koordinat matriks dan data bertingkat.",
        badgeColor: "bg-teal-50 dark:bg-teal-950/70 text-teal-900 dark:text-teal-100 border-teal-300 dark:border-teal-700/80"
      },
      {
        id: 11,
        chapterNum: 11,
        title: "Struktur Data Koleksi Linear (List & Array 1D)",
        subtitle: "Penyimpanan data sekuensial, indexing, slicing, dan algoritma traversal.",
        type: "code",
        labs: ["Visual List Indexing", "Array Memory Allocator"],
        status: "upcoming",
        description: "Menyimpan dan mengolah kumpulan data terurut dalam satu variabel koleksi terstruktur.",
        badgeColor: "bg-cyan-50 dark:bg-cyan-950/70 text-cyan-900 dark:text-cyan-100 border-cyan-300 dark:border-cyan-700/80"
      },
      {
        id: 12,
        chapterNum: 12,
        title: "Koleksi Asosiatif (Dictionary, Set & Tuple)",
        subtitle: "Pemetaan Key-Value, himpunan unik, dan data *immutable* berkinerja tinggi.",
        type: "code",
        labs: ["Hash Map Key-Value Visualizer", "Set Theory Venn Diagrams"],
        status: "upcoming",
        description: "Mengorganisir data terelasi menggunakan pasangan kunci-nilai dan operasi himpunan matematika.",
        badgeColor: "bg-sky-50 dark:bg-sky-950/70 text-sky-900 dark:text-sky-100 border-sky-300 dark:border-sky-700/80"
      }
    ]
  },
  {
    pillarId: 4,
    pillarTitle: "Pilar 4: Modularitas, Rekursi & Rekayasa Perangkat Lunak",
    pillarSubtitle: "Pertemuan 13 s.d. 16",
    pillarDesc: "Membangun arsitektur perangkat lunak modular, fungsi independen, rekursi, dan penanganan error profesional.",
    pillarIcon: PackageCheck,
    pillarColor: "from-violet-600 to-purple-600",
    meetings: [
      {
        id: 13,
        chapterNum: 13,
        title: "Fungsi & Prosedur Modular (Functions & Scope)",
        subtitle: "Parameter, Return Value, prinsip DRY (Don't Repeat Yourself), dan Variable Scope.",
        type: "code",
        labs: ["Function Call Stack Inspector", "Scope Isolation Visualizer"],
        status: "upcoming",
        description: "Memecah kode besar menjadi modul-modul fungsi yang dapat digunakan kembali secara bersih.",
        badgeColor: "bg-violet-50 dark:bg-violet-950/70 text-violet-900 dark:text-violet-100 border-violet-300 dark:border-violet-700/80"
      },
      {
        id: 14,
        chapterNum: 14,
        title: "Rekursi & Algoritma Divide and Conquer",
        subtitle: "Fungsi memanggil dirinya sendiri, Base Case, dan pohon rekursi faktorial/fibonacci.",
        type: "code",
        labs: ["Recursion Tree Call Stack", "Menara Hanoi Simulator"],
        status: "upcoming",
        description: "Memahami pemecahan masalah rekursif dan mencegah terjadinya *Stack Overflow*.",
        badgeColor: "bg-purple-50 dark:bg-purple-950/70 text-purple-900 dark:text-purple-100 border-purple-300 dark:border-purple-700/80"
      },
      {
        id: 15,
        chapterNum: 15,
        title: "Penanganan Error & Validasi (Exception Handling)",
        subtitle: "Try, Catch, Finally, validasi input pengguna, dan pembuatan kode anti-crash.",
        type: "code",
        labs: ["Exception Flow Debugger", "Input Robustness Shield"],
        status: "upcoming",
        description: "Mengantisipasi *runtime error* dan menjaga kestabilan aplikasi saat menghadapi data tidak valid.",
        badgeColor: "bg-pink-50 dark:bg-pink-950/70 text-pink-900 dark:text-pink-100 border-pink-300 dark:border-pink-700/80"
      },
      {
        id: 16,
        chapterNum: 16,
        title: "Evaluasi Akhir Semester (UAS & Proyek Mandiri)",
        subtitle: "Proyek komprehensif mengintegrasikan seluruh materi semester.",
        type: "exam",
        labs: ["Final Capstone Project", "Comprehensive Algorithm Defense"],
        status: "upcoming",
        description: "Membangun solusi perangkat lunak mandiri yang menerapkan seluruh 4 pilar pemrograman.",
        badgeColor: "bg-rose-50 dark:bg-rose-950/70 text-rose-900 dark:text-rose-100 border-rose-300 dark:border-rose-700/80"
      }
    ]
  }
];

// Tema warna kontras & pasangan ikon per bab (Ilustrasi 3D Dual-Tone + Glow Aura)
interface ChapterTheme {
  FrontIcon: React.ElementType;
  BackIcon: React.ElementType;
  frontGrad: string;
  backGrad: string;
  glowGrad: string;
}

const CHAPTER_THEMES: Record<number, ChapterTheme> = {
  1: {
    FrontIcon: Terminal,
    BackIcon: GitBranch,
    frontGrad: 'from-violet-600 via-indigo-600 to-blue-600',
    backGrad: 'from-amber-400 via-orange-500 to-rose-500',
    glowGrad: 'from-violet-500/35 to-amber-500/25',
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

// Ilustrasi 3D per bab — dua ikon kontras tinggi + Ambient Glow Aura
function ChapterIllustration({ num }: { num: number; pillarId?: number }) {
  const theme = CHAPTER_THEMES[num] ?? CHAPTER_THEMES[1];
  const { FrontIcon, BackIcon, frontGrad, backGrad, glowGrad } = theme;

  return (
    <div className="relative w-[76px] h-[76px] shrink-0 flex items-center justify-center select-none pointer-events-none">
      {/* 1. Ambient Glow Aura di belakang ikon */}
      <div className={`absolute inset-1 rounded-full bg-gradient-to-tr ${glowGrad} blur-xl opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 pointer-events-none`} />

      {/* 2. Kartu belakang (Dual-Tone Contrast, rotasi -8deg) */}
      <div className={`absolute right-1 bottom-1 w-11 h-11 rounded-2xl bg-gradient-to-br ${backGrad} shadow-md border border-white/30 dark:border-white/15 flex items-center justify-center -rotate-8 transform transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-105`}>
        <BackIcon className="w-5 h-5 text-white drop-shadow-xs" />
      </div>

      {/* 3. Kartu depan (Primary Accent, rotasi 4deg, depth tinggi) */}
      <div className={`absolute left-0.5 top-0.5 w-12 h-12 rounded-2xl bg-gradient-to-br ${frontGrad} shadow-xl border border-white/40 dark:border-white/20 flex items-center justify-center rotate-4 transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}>
        <FrontIcon className="w-6 h-6 text-white drop-shadow-sm" />
      </div>
    </div>
  );
}



// Peta warna per pilar — digunakan di card & meeting cards
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
        {/* 1. HERO SECTION: HOLISTIC COURSE OVERVIEW & 4-STEP MASTERY JOURNEY       */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl border border-border/70 bg-card/90 dark:bg-slate-900/80 backdrop-blur-2xl p-6 md:p-12 shadow-xl dark:shadow-[0_20px_70px_rgba(0,0,0,0.5)] overflow-hidden transition-all">
          
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Column: Course Academic Vision & Call to Action */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold shadow-sm">
                <GraduationCap className="w-4 h-4" />
                <span>Mata Kuliah Inti: Algoritma &amp; Pemrograman (3 SKS)</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Membangun Pondasi <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">
                  Logika Pemrograman
                </span>
                <br className="hidden sm:inline" /> &amp; Rekayasa Solusi
              </h1>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl font-normal">
                Platform pembelajaran interaktif komprehensif yang dirancang untuk membimbing mahasiswa dari tahap dasar berpikir algoritmik, representasi diagram alir (*Flowchart*), penguasaan struktur kontrol, manipulasi memori data, hingga perancangan perangkat lunak modular siap industri.
              </p>

              {/* Quick Action Navigation */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="#roadmap"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-md hover:shadow-xl flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Jelajahi Silabus (16 Pertemuan)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/workspace"
                  className="px-6 py-3.5 rounded-2xl bg-secondary/80 hover:bg-secondary border border-border text-foreground font-bold text-sm shadow-sm hover:shadow-md flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer backdrop-blur"
                >
                  <Terminal className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span>Buka Studio Praktikum</span>
                </Link>
              </div>

              {/* Course Highlights Bar */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/60 text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-500 dark:text-cyan-400 shrink-0" />
                  <span>Bilingual: Python &amp; JS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-purple-500 dark:text-purple-400 shrink-0" />
                  <span>Visual Flow &amp; RAM State</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>Standar Akademik Baku</span>
                </div>
              </div>

            </div>

            {/* Right Column: 4-Step Mastery Journey (Pedagogical Overview Card) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-secondary/30 dark:bg-slate-950 border border-border/80 shadow-xl p-5 md:p-6 space-y-4 relative overflow-hidden">
                
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="font-extrabold text-xs md:text-sm text-foreground">
                      4 Tahapan Penguasaan Materi
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-bold">
                    Semester 1
                  </span>
                </div>

                {/* 4 Progression Steps */}
                <div className="space-y-2.5">
                  
                  {/* Step 1 */}
                  <div className="p-3 rounded-2xl bg-card border border-border/70 flex items-start gap-3 shadow-xs hover:border-blue-500/50 transition-all">
                    <div className="w-7 h-7 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-bold text-xs text-foreground">Fondasi Logika &amp; Notasi Algoritma</h3>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Naratif, Flowchart, Pseudocode 3 Blok, sistem biner, tipe data &amp; memori RAM.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="p-3 rounded-2xl bg-card border border-border/70 flex items-start gap-3 shadow-xs hover:border-amber-500/50 transition-all">
                    <div className="w-7 h-7 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-bold text-xs text-foreground">Struktur Kontrol &amp; Pengambilan Keputusan</h3>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Percabangan tunggal, ganda, majemuk (IF-ELSE, Nested IF) &amp; evaluasi kondisi Boolean.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="p-3 rounded-2xl bg-card border border-border/70 flex items-start gap-3 shadow-xs hover:border-emerald-500/50 transition-all">
                    <div className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-bold text-xs text-foreground">Perulangan &amp; Struktur Koleksi Data</h3>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Looping (FOR/WHILE), iterasi matriks 2D, List, Array, Dictionary &amp; Set.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="p-3 rounded-2xl bg-card border border-border/70 flex items-start gap-3 shadow-xs hover:border-purple-500/50 transition-all">
                    <div className="w-7 h-7 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      4
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-bold text-xs text-foreground">Modularitas, Rekursi &amp; Proyek Perangkat Lunak</h3>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Fungsi independen, algoritma rekursif, error handling, dan proyek aplikasi mandiri.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Footer preview */}
                <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <span>Kurikulum Terintegrasi</span>
                  <Link href="/theory/1" className="text-primary hover:underline font-bold flex items-center gap-1">
                    Mulai dari Minggu 1 &rarr;
                  </Link>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. 4 PILAR KURIKULUM PEMROGRAMAN: INTERACTIVE ROADMAP HUB                 */}
        {/* ========================================================================= */}
        <div id="roadmap" className="space-y-8 scroll-mt-20">
          
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-primary uppercase tracking-widest">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Struktur Silabus Akademik Lengkap</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-foreground">
              Peta Jalan Pembelajaran (*Roadmap Silabus*)
            </h2>
            <p className="text-sm text-muted-foreground max-w-3xl">
              Silabus disusun secara sistematis mencakup 16 pertemuan kuliah. Pilih salah satu pilar di bawah untuk melihat rincian capaian pembelajaran dan laboratorium pendukungnya.
            </p>
          </div>

          {/* Pillar Selector Tabs — redesigned with glassmorphism + per-pillar gradient */}
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
                  {/* Decorative blur orb — hanya saat aktif */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${ps.gradient} opacity-25 blur-2xl pointer-events-none`}
                    />
                  )}

                  {/* Icon + nomor pilar */}
                  <div className="flex items-center justify-between w-full relative z-10">
                    <div className={`p-2.5 rounded-xl shadow-sm transition-all ${
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

                  {/* Judul */}
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
                  <div className="p-4 md:p-5 rounded-2xl bg-white dark:bg-[#141d30] border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                    <div>
                      <h3 className="font-extrabold text-base md:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{pillar.pillarTitle}</span>
                      </h3>
                      <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 font-medium mt-1 max-w-3xl">
                        {pillar.pillarDesc}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 shrink-0 self-start md:self-center shadow-xs">
                      {pillar.meetings.length} Pertemuan Pembelajaran
                    </span>
                  </div>

                  {/* Meeting Cards Grid — desain baru mengikuti mockup */}
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
                          className={`relative rounded-3xl p-6 flex flex-col gap-4 overflow-hidden transition-all duration-300 bg-white dark:bg-[#141d30] border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] ${
                            isReady
                              ? `${ps.glow} hover:shadow-xl dark:hover:shadow-indigo-500/10 hover:border-primary/50`
                              : 'hover:shadow-md hover:border-border'
                          }`}
                        >
                          {/* Subtle gradient wash */}
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

                          {/* Row 2: Judul besar & kontras */}
                          <h4 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white leading-snug tracking-tight relative z-10">
                            {meeting.title}
                          </h4>

                          {/* Row 3: Subtitle (kiri) + Ilustrasi 3D (kanan) */}
                          <div className="flex items-center gap-3 relative z-10">
                            <p className="text-sm md:text-[14.5px] text-slate-700 dark:text-slate-100 font-normal leading-relaxed flex-1">
                              {meeting.subtitle}
                            </p>
                            <ChapterIllustration num={meeting.chapterNum} pillarId={pillar.pillarId} />
                          </div>

                          {/* Row 4: Lab tags dengan kontras tinggi */}
                          <div className="space-y-2 relative z-10">
                            <span className="text-[11px] font-mono text-slate-600 dark:text-slate-200 font-bold uppercase tracking-wider block">
                              Fitur Laboratorium:
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

                          {/* Row 5: CTA Button (Glow Hover + Konsistensi Minggu) */}
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
        {/* 3. SHOWCASE 4 FITUR UTAMA TEKNOLOGI PEMBELAJARAN                         */}
        {/* ========================================================================= */}
        <div className="rounded-3xl border border-border/70 bg-card/60 p-6 md:p-10 space-y-8 backdrop-blur shadow-sm">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary uppercase tracking-widest">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Metodologi &amp; Teknologi Edukasi</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
              Mengapa Belajar di Platform Studio Ini?
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Dirancang secara pedagogis untuk menjembatani konsep abstrak logika komputer ke dalam bentuk visual yang dapat dimanipulasi langsung.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Feature 1 */}
            <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-3 shadow-xs hover:border-blue-500/40 transition-all">
              <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl w-fit border border-blue-500/20">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm md:text-base text-foreground">Bilingual WebAssembly</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Eksekusi Python 3 (Pyodide) dan JavaScript berjalan 100% instan di peramban Anda tanpa perlu instalasi server yang rumit.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-3 shadow-xs hover:border-emerald-500/40 transition-all">
              <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl w-fit border border-emerald-500/20">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm md:text-base text-foreground">State Memory RAM Inspector</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Visualisasi langsung bagaimana setiap variabel memesan alamat sel RAM dan bagaimana nilainya berubah secara <em>live</em>.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-3 shadow-xs hover:border-purple-500/40 transition-all">
              <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl w-fit border border-purple-500/20">
                <Wand2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm md:text-base text-foreground">Tri-Converter &amp; Rule Linter</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Konversi otomatis antara Naratif, Flowchart, dan Pseudocode lengkap dengan pemeriksa kepatuhan aturan penulisan baku Bab 3.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-3 shadow-xs hover:border-amber-500/40 transition-all">
              <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl w-fit border border-amber-500/20">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm md:text-base text-foreground">Projector High-Contrast Mode</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Dilengkapi mode layar penuh (*Quad-Split 4 Kolom*) dan pembesaran $1.45\times$ yang siap dipakai dosen saat presentasi kuliah di kelas.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
