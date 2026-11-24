"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  RotateCcw,
  RefreshCw,
  Play,
  Pause,
  CheckCircle2,
  Code2,
  Terminal,
  Sparkles,
  Info,
  Grid,
  ShieldCheck,
  Gamepad2,
  Menu,
  ChevronRight,
  Flame,
  ArrowRight,
  UserCheck
} from 'lucide-react';

type ComboType = 'for_for' | 'for_while' | 'while_while' | 'while_for';

interface ComboInfo {
  id: ComboType;
  title: string;
  badge: string;
  outerType: 'FOR (Terhitung)' | 'WHILE (Terkondisi)';
  innerType: 'FOR (Terhitung)' | 'WHILE (Terkondisi)';
  color: string;
  hexColor: string;
  accentBg: string;
  borderAccent: string;
  summary: string;
  ruleExplanation: string;
  useCase1: {
    title: string;
    icon: React.ElementType;
    desc: string;
    exampleLogic: string;
  };
  useCase2: {
    title: string;
    icon: React.ElementType;
    desc: string;
    exampleLogic: string;
  };
  pythonCode: string;
  jsCode: string;
  simDefaultOutput: string[];
}

const COMBINATIONS: ComboInfo[] = [
  {
    id: 'for_for',
    title: '1. FOR di dalam FOR (Counted - Counted)',
    badge: 'Terhitung – Terhitung',
    outerType: 'FOR (Terhitung)',
    innerType: 'FOR (Terhitung)',
    color: 'text-purple-600 dark:text-purple-400',
    hexColor: '#9333ea',
    accentBg: 'bg-purple-500/10',
    borderAccent: 'border-purple-500/30',
    summary: 'Kedua tingkatan perulangan memiliki batas perputaran yang sudah diketahui pasti sejak awal (M langkah luar dan N langkah dalam).',
    ruleExplanation: 'Pola paling lazim untuk memetakan ruang multi-dimensi deterministik. Total operasi selalu konstan tepat M × N kali.',
    useCase1: {
      title: 'Pencetakan Kisi Koordinat Layar / Papan Catur',
      icon: Grid,
      desc: 'Mencetak baris dan kolom berukuran tetap, seperti papan catur 8 × 8 atau kisi piksel layar konsol.',
      exampleLogic: 'for baris in range(1, 9): for kolom in range(1, 9): cetak simbol kotak'
    },
    useCase2: {
      title: 'Tabel Perkalian Silang & Pola Visual Geometri',
      icon: Sparkles,
      desc: 'Menghitung hasil kali i × j untuk tabel matematika atau mencetak pola piramida bintang dengan dimensi tetap.',
      exampleLogic: 'for i in range(1, 11): for j in range(1, 11): cetak i * j'
    },
    pythonCode: `# 1. FOR di dalam FOR: Papan Grid Koordinat (3 × 4)
BARIS = 3
KOLOM = 4

for i in range(1, BARIS + 1):          # Outer: Baris 1 s.d 3 (Pasti)
    for j in range(1, KOLOM + 1):      # Inner: Kolom 1 s.d 4 (Pasti)
        print(f"[{i},{j}]", end=" ")   # Cetak koordinat tanpa ganti baris
    print()                            # Pindah baris setelah kolom tuntas
print("✓ Selesai mencetak grid koordinat.")`,
    jsCode: `// 1. FOR di dalam FOR: Papan Grid Koordinat (3 × 4)
const BARIS = 3;
const KOLOM = 4;

for (let i = 1; i <= BARIS; i++) {       // Outer: Baris 1 s.d 3 (Pasti)
    let barisTeks = "";
    for (let j = 1; j <= KOLOM; j++) {   // Inner: Kolom 1 s.d 4 (Pasti)
        barisTeks += \`[\${i},\${j}] \`;
    }
    console.log(barisTeks);              // Cetak 1 baris utuh
}
console.log("✓ Selesai mencetak grid koordinat.");`,
    simDefaultOutput: [
      "[1,1] [1,2] [1,3] [1,4]",
      "[2,1] [2,2] [2,3] [2,4]",
      "[3,1] [3,2] [3,3] [3,4]",
      "✓ Selesai mencetak grid koordinat."
    ]
  },
  {
    id: 'for_while',
    title: '2. WHILE di dalam FOR (Counted - Conditioned)',
    badge: 'Terhitung – Terkondisi',
    outerType: 'FOR (Terhitung)',
    innerType: 'WHILE (Terkondisi)',
    color: 'text-blue-600 dark:text-blue-400',
    hexColor: '#2563eb',
    accentBg: 'bg-blue-500/10',
    borderAccent: 'border-blue-500/30',
    summary: 'Outer loop berjalan terhitung pasti sebanyak N kali, namun di setiap putaran terdapat inner loop yang berjalan dinamis menunggu pemenuhan kondisi tertentu.',
    ruleExplanation: 'Sangat ideal ketika kita memproses N entitas (orang, berkas, atau tahap), di mana setiap entitas memerlukan validasi berulang atau proses coba-ulang sampai berhasil.',
    useCase1: {
      title: 'Validasi Input Ujian untuk N Orang Mahasiswa',
      icon: UserCheck,
      desc: 'Program memproses tepat N mahasiswa. Untuk setiap mahasiswa, pengguna dipaksa mengulang input jika nilai yang dimasukkan tidak berada pada rentang valid (0 - 100).',
      exampleLogic: 'for mhs in range(1, 4): input nilai berulang dengan while sampai valid'
    },
    useCase2: {
      title: 'Percobaan Ulang (Retry Mechanism) N Percobaan',
      icon: ShieldCheck,
      desc: 'Melakukan N tahap pengujian koneksi jaringan. Di setiap tahap, program menunggu sinyal stabil selama kondisi status masih PENDING.',
      exampleLogic: 'for server in range(1, 4): while status != "READY": polling koneksi'
    },
    pythonCode: `# 2. WHILE di dalam FOR: Validasi Input untuk 3 Mahasiswa
TOTAL_MHS = 3

for no_mhs in range(1, TOTAL_MHS + 1):
    print(f"=== Memproses Mahasiswa ke-{no_mhs} ===")
    
    nilai = -1  # Inisialisasi awal nilai belum valid
    percobaan = 1
    
    # Inner WHILE: Mengulang terus SAMPAI nilai valid (0 - 100)
    while nilai < 0 or nilai > 100:
        # Simulasi input pengguna (contoh nilai dimasukkan)
        if percobaan == 1:
            nilai_input = 150  # Simulasi salah input
            print(f"  [Input #{percobaan}] Masukkan nilai: {nilai_input} ❌ (Harus 0-100!)")
        else:
            nilai_input = 85   # Simulasi perbaikan input
            print(f"  [Input #{percobaan}] Masukkan nilai: {nilai_input} ✓ (Valid)")
        
        nilai = nilai_input
        percobaan += 1

    print(f"  → Data Mahasiswa #{no_mhs} berhasil disimpan: Nilai = {nilai}\\n")`,
    jsCode: `// 2. WHILE di dalam FOR: Validasi Input untuk 3 Mahasiswa
const TOTAL_MHS = 3;

for (let noMhs = 1; noMhs <= TOTAL_MHS; noMhs++) {
    console.log(\`=== Memproses Mahasiswa ke-\${noMhs} ===\`);
    
    let nilai = -1;
    let percobaan = 1;
    
    // Inner WHILE: Mengulang terus SAMPAI nilai valid (0 - 100)
    while (nilai < 0 || nilai > 100) {
        let nilaiInput = (percobaan === 1) ? 150 : 85;
        if (nilaiInput < 0 || nilaiInput > 100) {
            console.log(\`  [Input #\${percobaan}] Masukkan nilai: \${nilaiInput} ❌ (Harus 0-100!)\`);
        } else {
            console.log(\`  [Input #\${percobaan}] Masukkan nilai: \${nilaiInput} ✓ (Valid)\`);
        }
        nilai = nilaiInput;
        percobaan++;
    }
    console.log(\`  → Data Mahasiswa #\${noMhs} berhasil disimpan: Nilai = \${nilai}\\n\`);
}`,
    simDefaultOutput: [
      "=== Memproses Mahasiswa ke-1 ===",
      "  [Input #1] Masukkan nilai: 150 ❌ (Harus 0-100!)",
      "  [Input #2] Masukkan nilai: 85 ✓ (Valid)",
      "  → Data Mahasiswa #1 berhasil disimpan: Nilai = 85",
      "",
      "=== Memproses Mahasiswa ke-2 ===",
      "  [Input #1] Masukkan nilai: 150 ❌ (Harus 0-100!)",
      "  [Input #2] Masukkan nilai: 85 ✓ (Valid)",
      "  → Data Mahasiswa #2 berhasil disimpan: Nilai = 85",
      "",
      "=== Memproses Mahasiswa ke-3 ===",
      "  [Input #1] Masukkan nilai: 150 ❌ (Harus 0-100!)",
      "  [Input #2] Masukkan nilai: 85 ✓ (Valid)",
      "  → Data Mahasiswa #3 berhasil disimpan: Nilai = 85"
    ]
  },
  {
    id: 'while_while',
    title: '3. WHILE di dalam WHILE (Conditioned - Conditioned)',
    badge: 'Terkondisi – Terkondisi',
    outerType: 'WHILE (Terkondisi)',
    innerType: 'WHILE (Terkondisi)',
    color: 'text-emerald-600 dark:text-emerald-400',
    hexColor: '#059669',
    accentBg: 'bg-emerald-500/10',
    borderAccent: 'border-emerald-500/30',
    summary: 'Kedua perulangan sama-sama tidak diketahui batas akhirnya sejak awal. Masing-masing dikendalikan oleh kondisi logika atau interaksi pengguna (sentinel event).',
    ruleExplanation: 'Pola standar untuk aplikasi berbasis menu berlapis (hierarchical console menu), otomata permainan, atau simulasi robot di mana seluruh keputusan terjadi secara dinamis.',
    useCase1: {
      title: 'Sistem Menu Aplikasi Bertingkat (ATM / Kasir)',
      icon: Menu,
      desc: 'Outer loop menjaga Menu Utama tetap aktif selama nasabah belum memilih "Keluar". Inner loop mengelola Sub-Menu Transaksi selama belum memilih "Kembali ke Menu Utama".',
      exampleLogic: 'while menu_utama != "Keluar": while sub_menu != "Kembali": proses transaksi'
    },
    useCase2: {
      title: 'Simulasi Robot Penjelajah Labirin',
      icon: RefreshCw,
      desc: 'Outer loop berjalan selama baterai robot masih ada (> 0). Inner loop menggerakkan robot maju selama sensor jarak mendeteksi jalur tidak terhalang rintangan.',
      exampleLogic: 'while baterai > 0: while tidak_ada_halangan(): robot_maju()'
    },
    pythonCode: `# 3. WHILE di dalam WHILE: Menu Aplikasi ATM Bertingkat
menu_utama_aktif = True
siklus_utama = 1

while menu_utama_aktif and siklus_utama <= 2:
    print(f"\\n[MENU UTAMA - Siklus #{siklus_utama}]")
    print("1. Buka Sub-Menu Tarik Tunai | 2. Keluar Aplikasi")
    
    sub_menu_aktif = True
    transaksi = 1
    
    # Inner WHILE: Menjalankan transaksi selama user belum selesai
    while sub_menu_aktif and transaksi <= 2:
        print(f"   --> Melayani Tarik Tunai ke-{transaksi}: Sukses Rp 100.000")
        transaksi += 1
        if transaksi > 2:
            print("   --> [Sub-Menu] Selesai transaksi, kembali ke Menu Utama...")
            sub_menu_aktif = False
            
    siklus_utama += 1

print("\\n✓ Pengguna memilih Keluar. Sesi ATM Berakhir dengan Aman.")`,
    jsCode: `// 3. WHILE di dalam WHILE: Menu Aplikasi ATM Bertingkat
let menuUtamaAktif = true;
let siklusUtama = 1;

while (menuUtamaAktif && siklusUtama <= 2) {
    console.log(\`\\n[MENU UTAMA - Siklus #\${siklusUtama}]\`);
    console.log("1. Buka Sub-Menu Tarik Tunai | 2. Keluar Aplikasi");
    
    let subMenuAktif = true;
    let transaksi = 1;
    
    // Inner WHILE: Menjalankan transaksi selama user belum selesai
    while (subMenuAktif && transaksi <= 2) {
        console.log(\`   --> Melayani Tarik Tunai ke-\${transaksi}: Sukses Rp 100.000\`);
        transaksi++;
        if (transaksi > 2) {
            console.log("   --> [Sub-Menu] Selesai transaksi, kembali ke Menu Utama...");
            subMenuAktif = false;
        }
    }
    siklusUtama++;
}
console.log("\\n✓ Pengguna memilih Keluar. Sesi ATM Berakhir dengan Aman.");`,
    simDefaultOutput: [
      "[MENU UTAMA - Siklus #1]",
      "1. Buka Sub-Menu Tarik Tunai | 2. Keluar Aplikasi",
      "   --> Melayani Tarik Tunai ke-1: Sukses Rp 100.000",
      "   --> Melayani Tarik Tunai ke-2: Sukses Rp 100.000",
      "   --> [Sub-Menu] Selesai transaksi, kembali ke Menu Utama...",
      "",
      "[MENU UTAMA - Siklus #2]",
      "1. Buka Sub-Menu Tarik Tunai | 2. Keluar Aplikasi",
      "   --> Melayani Tarik Tunai ke-1: Sukses Rp 100.000",
      "   --> Melayani Tarik Tunai ke-2: Sukses Rp 100.000",
      "   --> [Sub-Menu] Selesai transaksi, kembali ke Menu Utama...",
      "",
      "✓ Pengguna memilih Keluar. Sesi ATM Berakhir dengan Aman."
    ]
  },
  {
    id: 'while_for',
    title: '4. FOR di dalam WHILE (Conditioned - Counted)',
    badge: 'Terkondisi – Terhitung',
    outerType: 'WHILE (Terkondisi)',
    innerType: 'FOR (Terhitung)',
    color: 'text-amber-600 dark:text-amber-400',
    hexColor: '#d97706',
    accentBg: 'bg-amber-500/10',
    borderAccent: 'border-amber-500/30',
    summary: 'Outer loop berjalan selama kondisi global masih berlaku (jumlah ronde belum pasti), namun di setiap ronde selalu dieksekusi sejumlah langkah pasti terhitung.',
    ruleExplanation: 'Pola andalan untuk permainan multipemain turn-based (giliran), pemrosesan antrean per-batch, atau pengiriman paket konvoi bertahap.',
    useCase1: {
      title: 'Game Turn-Based Giliran Pemain (Ronde Permainan)',
      icon: Gamepad2,
      desc: 'Outer loop berjalan selama permainan belum selesai (belum ada pemenang). Pada setiap ronde, inner loop memutar giliran tepat untuk 4 pemain secara berurutan.',
      exampleLogic: 'while game_over == False: for pemain in range(1, 5): giliran(pemain)'
    },
    useCase2: {
      title: 'Pemrosesan Batch Pengiriman Paket / Truk Konvoi',
      icon: Flame,
      desc: 'Outer loop berjalan selama gudang masih memiliki stok barang. Setiap kali satu batch diberangkatkan, inner loop memproses tepat 5 truk konvoi.',
      exampleLogic: 'while stok_gudang > 0: for truk in range(1, 6): muat_barang_truk()'
    },
    pythonCode: `# 4. FOR di dalam WHILE: Game Turn-Based (Giliran 4 Pemain per Ronde)
ronde = 1
skor_total = 0
target_kemenangan = 60

print("🎮 MEMULAI TURNAMEN GAME (Target Menang: Skor 60)")

# Outer WHILE: Berjalan selama target kemenangan BELUM tercapai
while skor_total < target_kemenangan:
    print(f"\\n--- Ronde Permainan ke-{ronde} (Skor Saat Ini: {skor_total}) ---")
    
    # Inner FOR: Setiap ronde selalu memutar tepat 4 pemain secara terhitung
    for pemain in range(1, 5):
        poin_dapat = pemain * 3
        skor_total += poin_dapat
        print(f"  • Pemain #{pemain} bertanding... Tambah +{poin_dapat} poin! (Total: {skor_total})")
        
        if skor_total >= target_kemenangan:
            print(f"  🏆 TARGET TERCAPAI! Pemain #{pemain} mengunci kemenangan!")
            break  # Selesai putaran pemain
            
    ronde += 1

print(f"\\n✓ Permainan Berakhir pada Ronde ke-{ronde - 1} dengan Skor Akhir {skor_total}!")`,
    jsCode: `// 4. FOR di dalam WHILE: Game Turn-Based (Giliran 4 Pemain per Ronde)
let ronde = 1;
let skorTotal = 0;
const targetKemenangan = 60;

console.log("🎮 MEMULAI TURNAMEN GAME (Target Menang: Skor 60)");

// Outer WHILE: Berjalan selama target kemenangan BELUM tercapai
while (skorTotal < targetKemenangan) {
    console.log(\`\\n--- Ronde Permainan ke-\${ronde} (Skor Saat Ini: \${skorTotal}) ---\`);
    
    // Inner FOR: Setiap ronde selalu memutar tepat 4 pemain secara terhitung
    for (let pemain = 1; pemain <= 4; pemain++) {
        const poinDapat = pemain * 3;
        skorTotal += poinDapat;
        console.log(\`  • Pemain #\${pemain} bertanding... Tambah +\${poinDapat} poin! (Total: \${skorTotal})\`);
        
        if (skorTotal >= targetKemenangan) {
            console.log(\`  🏆 TARGET TERCAPAI! Pemain #\${pemain} mengunci kemenangan!\`);
            break;
        }
    }
    ronde++;
}
console.log(\`\\n✓ Permainan Berakhir pada Ronde ke-\${ronde - 1} dengan Skor Akhir \${skorTotal}!\`);`,
    simDefaultOutput: [
      "🎮 MEMULAI TURNAMEN GAME (Target Menang: Skor 60)",
      "",
      "--- Ronde Permainan ke-1 (Skor Saat Ini: 0) ---",
      "  • Pemain #1 bertanding... Tambah +3 poin! (Total: 3)",
      "  • Pemain #2 bertanding... Tambah +6 poin! (Total: 9)",
      "  • Pemain #3 bertanding... Tambah +9 poin! (Total: 18)",
      "  • Pemain #4 bertanding... Tambah +12 poin! (Total: 30)",
      "",
      "--- Ronde Permainan ke-2 (Skor Saat Ini: 30) ---",
      "  • Pemain #1 bertanding... Tambah +3 poin! (Total: 33)",
      "  • Pemain #2 bertanding... Tambah +6 poin! (Total: 39)",
      "  • Pemain #3 bertanding... Tambah +9 poin! (Total: 48)",
      "  • Pemain #4 bertanding... Tambah +12 poin! (Total: 60)",
      "  🏆 TARGET TERCAPAI! Pemain #4 mengunci kemenangan!",
      "",
      "✓ Permainan Berakhir pada Ronde ke-2 dengan Skor Akhir 60!"
    ]
  }
];

export default function NestedLoopCombinationsShowcase() {
  const [selectedCombo, setSelectedCombo] = useState<ComboType>('for_for');
  const [langTab, setLangTab] = useState<'python' | 'javascript'>('python');
  const [consoleOutput, setConsoleOutput] = useState<string[] | null>(null);
  const [isSimRunning, setIsSimRunning] = useState<boolean>(false);

  const activeCombo = COMBINATIONS.find((c) => c.id === selectedCombo) || COMBINATIONS[0];

  // Jalankan simulasi output
  const handleRunSimulation = () => {
    setIsSimRunning(true);
    setConsoleOutput([]);
    let currentIdx = 0;

    const timer = setInterval(() => {
      if (currentIdx < activeCombo.simDefaultOutput.length) {
        const nextLine = activeCombo.simDefaultOutput[currentIdx];
        setConsoleOutput((prev) => [...(prev || []), nextLine]);
        currentIdx++;
      } else {
        clearInterval(timer);
        setIsSimRunning(false);
      }
    }, 250);
  };

  const handleResetSimulation = () => {
    setConsoleOutput(null);
    setIsSimRunning(false);
  };

  return (
    <div className="w-full my-8 space-y-6 rounded-3xl border border-border/80 bg-card p-6 md:p-8 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
      
      {/* ── 1. HEADER SECTION ────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            <Layers className="w-4 h-4" />
            <span>Fleksibilitas Arsitektur Alur Perulangan</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100">
            4 Ragam Kombinasi Perulangan Bersarang &amp; Use Case Nyata
          </h3>
          <p className="text-xs text-muted-foreground pt-1 max-w-2xl">
            Dalam dunia rekayasa perangkat lunak, perulangan luar (*outer*) dan perulangan dalam (*inner*) dapat dipadukan secara bebas sesuai karakteristik domain masalah.
          </p>
        </div>

        {/* Badge Standar */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30">
            4 Ragam Arsitektur
          </span>
        </div>
      </div>

      {/* ── 2. SELECTOR 4 KOMBINASI ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {COMBINATIONS.map((combo) => {
          const isSelected = selectedCombo === combo.id;
          return (
            <button
              key={combo.id}
              onClick={() => {
                setSelectedCombo(combo.id);
                setConsoleOutput(null);
                setIsSimRunning(false);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-purple-500/10 border-purple-500 shadow-sm ring-2 ring-purple-500/20'
                  : 'bg-card hover:bg-secondary/40 border-border/70 hover:border-border'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-purple-600 text-white' : 'bg-secondary text-muted-foreground'
                  }`}>
                    {combo.badge}
                  </span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />}
                </div>
                <h4 className={`text-xs font-bold leading-tight ${isSelected ? 'text-purple-700 dark:text-purple-300' : 'text-foreground'}`}>
                  {combo.id.replace('_', ' - ').toUpperCase()}
                </h4>
              </div>

              <div className="mt-2 pt-2 border-t border-border/40 text-[10px] text-muted-foreground flex items-center justify-between">
                <span>Outer: {combo.outerType.split(' ')[0]}</span>
                <span>Inner: {combo.innerType.split(' ')[0]}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── 3. DETAIL AKTIF PANEL ────────────────────────────────────────── */}
      <div className="p-5 md:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-border/70 space-y-6">
        
        {/* Ringkasan & Kaidah */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/60">
          <div>
            <h4 className="text-base md:text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: activeCombo.hexColor }} />
              <span>{activeCombo.title}</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 pt-1 leading-relaxed max-w-3xl">
              {activeCombo.summary}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border/80 text-xs shrink-0 max-w-sm">
            <span className="font-bold text-foreground block mb-0.5">Karakteristik Kunci:</span>
            <span className="text-muted-foreground leading-snug">{activeCombo.ruleExplanation}</span>
          </div>
        </div>

        {/* 2 Use Case Nyata */}
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>2 Skenario Penerapan Nyata (Use Cases Dunia Nyata)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Use Case 1 */}
            <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-foreground">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  <activeCombo.useCase1.icon className="w-4 h-4" />
                </div>
                <span>A. {activeCombo.useCase1.title}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {activeCombo.useCase1.desc}
              </p>
              <div className="p-2 rounded-lg bg-secondary/50 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                <span className="text-muted-foreground">Logika: </span>
                <code>{activeCombo.useCase1.exampleLogic}</code>
              </div>
            </div>

            {/* Use Case 2 */}
            <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-foreground">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <activeCombo.useCase2.icon className="w-4 h-4" />
                </div>
                <span>B. {activeCombo.useCase2.title}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {activeCombo.useCase2.desc}
              </p>
              <div className="p-2 rounded-lg bg-secondary/50 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                <span className="text-muted-foreground">Logika: </span>
                <code>{activeCombo.useCase2.exampleLogic}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Kode Dwibahasa & Konsol Simulasi */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Code2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Implementasi Kode &amp; Konsol Eksekusi:</span>
            </div>

            {/* Switcher Bahasa */}
            <div className="flex items-center p-0.5 rounded-lg bg-secondary border border-border text-xs font-bold">
              <button
                onClick={() => setLangTab('python')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  langTab === 'python' ? 'bg-blue-600 text-white shadow-xs' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Python
              </button>
              <button
                onClick={() => setLangTab('javascript')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  langTab === 'javascript' ? 'bg-amber-600 text-white shadow-xs' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                JavaScript
              </button>
            </div>
          </div>

          {/* Editor Kode */}
          <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner leading-relaxed select-text">
            <pre>
              <code>{langTab === 'python' ? activeCombo.pythonCode : activeCombo.jsCode}</code>
            </pre>
          </div>

          {/* Konsol Output Simulator */}
          <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-foreground">
                <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                <span>Simulasi Konsol Output:</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunSimulation}
                  disabled={isSimRunning}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSimRunning
                      ? 'bg-amber-500 text-white animate-pulse'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isSimRunning ? 'Menjalankan...' : 'Jalankan Simulasi'}</span>
                </button>
                {consoleOutput && (
                  <button
                    onClick={handleResetSimulation}
                    className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary cursor-pointer transition-colors"
                    title="Bersihkan Konsol"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="min-h-[110px] p-3 rounded-xl bg-slate-950 font-mono text-xs text-emerald-400 space-y-1 overflow-x-auto shadow-inner">
              {consoleOutput ? (
                consoleOutput.map((line, idx) => (
                  <div key={idx} className="leading-snug">{line || '\u00A0'}</div>
                ))
              ) : (
                <div className="text-slate-500 italic py-6 text-center">
                  Klik tombol &quot;Jalankan Simulasi&quot; untuk mengamati alur cetak konsol secara interaktif...
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
