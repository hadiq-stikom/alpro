"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Binary, 
  Database, 
  HardDrive, 
  Cpu, 
  HelpCircle, 
  Info, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Sparkles,
  Zap,
  Globe,
  FileText,
  Music,
  Film,
  FolderArchive,
  Server
} from 'lucide-react';

interface UnitInfo {
  name: string;
  symbol: string;
  powerOfTwo: string;
  bytesValue: number;
  exactDecimal: string;
  exactBinary: string;
  iecSymbol: string;
  iecName: string;
  analogy: string;
  icon: any;
  color: string;
  borderColor: string;
  bgLight: string;
}

const UNITS_DATA: UnitInfo[] = [
  {
    name: "Bit",
    symbol: "b",
    powerOfTwo: "2^0 (1 bit)",
    bytesValue: 0.125,
    exactDecimal: "1 bit (0 atau 1)",
    exactBinary: "1 bit",
    iecSymbol: "b",
    iecName: "Bit",
    analogy: "Satu sakelar lampu digital (kondisi ON = 1 atau OFF = 0). Satuan terkecil komputasi.",
    icon: Zap,
    color: "text-amber-500 dark:text-amber-400",
    borderColor: "border-amber-500/40",
    bgLight: "bg-amber-500/10"
  },
  {
    name: "Nibble",
    symbol: "nibble",
    powerOfTwo: "4 bits",
    bytesValue: 0.5,
    exactDecimal: "4 bits (Setengah Byte)",
    exactBinary: "4 bits",
    iecSymbol: "nibble",
    iecName: "Nibble",
    analogy: "Tepat merepresentasikan 1 digit heksadesimal (0 sampai F, misal: 1111 = F).",
    icon: Binary,
    color: "text-orange-500 dark:text-orange-400",
    borderColor: "border-orange-500/40",
    bgLight: "bg-orange-500/10"
  },
  {
    name: "Byte",
    symbol: "B",
    powerOfTwo: "2^3 = 8 bits",
    bytesValue: 1,
    exactDecimal: "8 bits = 1 Byte",
    exactBinary: "8 bits = 1 Byte",
    iecSymbol: "B",
    iecName: "Byte (Oktet)",
    analogy: "Satu karakter teks ASCII dasar (misal huruf 'A' disimpan sebagai 01000001).",
    icon: FileText,
    color: "text-blue-500 dark:text-blue-400",
    borderColor: "border-blue-500/40",
    bgLight: "bg-blue-500/10"
  },
  {
    name: "Kilobyte",
    symbol: "KB",
    powerOfTwo: "2^10 = 1.024 Bytes",
    bytesValue: 1024,
    exactDecimal: "1.000 Bytes (10³)",
    exactBinary: "1.024 Bytes (2¹⁰)",
    iecSymbol: "KiB",
    iecName: "Kibibyte",
    analogy: "Satu lembar halaman dokumen ketikan teks polos (.txt sederhana).",
    icon: FileText,
    color: "text-cyan-500 dark:text-cyan-400",
    borderColor: "border-cyan-500/40",
    bgLight: "bg-cyan-500/10"
  },
  {
    name: "Megabyte",
    symbol: "MB",
    powerOfTwo: "2^20 = 1.048.576 Bytes",
    bytesValue: 1024 * 1024,
    exactDecimal: "1.000.000 Bytes (10⁶)",
    exactBinary: "1.048.576 Bytes (2²⁰)",
    iecSymbol: "MiB",
    iecName: "Mebibyte",
    analogy: "Satu lagu MP3 berdurasi 3 menit atau 1 foto resolusi tinggi dari kamera smartphone.",
    icon: Music,
    color: "text-emerald-500 dark:text-emerald-400",
    borderColor: "border-emerald-500/40",
    bgLight: "bg-emerald-500/10"
  },
  {
    name: "Gigabyte",
    symbol: "GB",
    powerOfTwo: "2^30 = 1.073.741.824 Bytes",
    bytesValue: 1024 * 1024 * 1024,
    exactDecimal: "1.000.000.000 Bytes (10⁹)",
    exactBinary: "1.073.741.824 Bytes (2³⁰)",
    iecSymbol: "GiB",
    iecName: "Gibibyte",
    analogy: "Satu film resolusi HD (1080p) berdurasi 2 jam atau sekitar 250 lagu audio berkualitas tinggi.",
    icon: Film,
    color: "text-indigo-500 dark:text-indigo-400",
    borderColor: "border-indigo-500/40",
    bgLight: "bg-indigo-500/10"
  },
  {
    name: "Terabyte",
    symbol: "TB",
    powerOfTwo: "2^40 = 1.099.511.627.776 Bytes",
    bytesValue: 1024 * 1024 * 1024 * 1024,
    exactDecimal: "1.000.000.000.000 Bytes (10¹²)",
    exactBinary: "1.099.511.627.776 Bytes (2⁴⁰)",
    iecSymbol: "TiB",
    iecName: "Tebibyte",
    analogy: "Kapasitas harddisk modern; mampu menyimpan sekitar 500 jam video HD atau jutaan dokumen buku.",
    icon: HardDrive,
    color: "text-purple-500 dark:text-purple-400",
    borderColor: "border-purple-500/40",
    bgLight: "bg-purple-500/10"
  },
  {
    name: "Petabyte",
    symbol: "PB",
    powerOfTwo: "2^50 = 1.125.899.906.842.624 Bytes",
    bytesValue: 1024 * 1024 * 1024 * 1024 * 1024,
    exactDecimal: "10¹⁵ Bytes",
    exactBinary: "1.125.899.906.842.624 Bytes (2⁵⁰)",
    iecSymbol: "PiB",
    iecName: "Pebibyte",
    analogy: "Pusat data (Data Center) perusahaan teknologi besar seperti arsip harian streaming video YouTube/Netflix.",
    icon: Server,
    color: "text-rose-500 dark:text-rose-400",
    borderColor: "border-rose-500/40",
    bgLight: "bg-rose-500/10"
  },
  {
    name: "Exabyte, Zettabyte & Yottabyte",
    symbol: "EB / ZB / YB",
    powerOfTwo: "2^60, 2^70, 2^80 Bytes",
    bytesValue: 1024 * 1024 * 1024 * 1024 * 1024 * 1024,
    exactDecimal: "10¹⁸ / 10²¹ / 10²⁴ Bytes",
    exactBinary: "2⁶⁰ / 2⁷⁰ / 2⁸⁰ Bytes",
    iecSymbol: "EiB / ZiB / YiB",
    iecName: "Exbi/Zebi/Yobibyte",
    analogy: "Estimasi total seluruh volume lalu lintas data internet global di seluruh dunia dalam setahun.",
    icon: Globe,
    color: "text-pink-500 dark:text-pink-400",
    borderColor: "border-pink-500/40",
    bgLight: "bg-pink-500/10"
  }
];

export default function DataUnitsHierarchyLab() {
  const [selectedUnitIdx, setSelectedUnitIdx] = useState<number>(2); // Default to Byte
  const [calcValue, setCalcValue] = useState<number>(64);
  const [calcUnit, setCalcUnit] = useState<string>('GB');

  // Interactive Live Calculation
  const getUnitMultiplier = (unit: string): number => {
    switch(unit) {
      case 'b': return 0.125;
      case 'B': return 1;
      case 'KB': return 1024;
      case 'MB': return 1024 * 1024;
      case 'GB': return 1024 * 1024 * 1024;
      case 'TB': return 1024 * 1024 * 1024 * 1024;
      default: return 1;
    }
  };

  const currentTotalBytes = (calcValue || 0) * getUnitMultiplier(calcUnit);
  const selectedUnit = UNITS_DATA[selectedUnitIdx];
  const SelectedIcon = selectedUnit.icon;

  // Flashdisk mystery calculation:
  // e.g. 64 GB nominal (64 * 10^9) in Windows binary (divided by 1024^3)
  const nominalDecimalBytes = (calcValue || 0) * (calcUnit === 'GB' ? 1000000000 : (calcUnit === 'TB' ? 1000000000000 : 1000000));
  const windowsBinaryReport = (nominalDecimalBytes / (calcUnit === 'GB' ? (1024*1024*1024) : (calcUnit === 'TB' ? (1024*1024*1024*1024) : (1024*1024)))).toFixed(2);

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="p-5 md:p-6 rounded-3xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-border/80 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold">
            <Database className="w-3.5 h-3.5" />
            <span>Hierarki Satuan Data Komputasi</span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-foreground">
            Dari Bit Terkecil hingga Skala Petabyte
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl">
            Komputer menyimpan seluruh teks, gambar, audio, dan video dalam kombinasi angka biner. Pahami tingkatan satuan ukuran data dan perbedaan standar <strong>Desimal (SI)</strong> vs <strong>Biner (IEC)</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-card p-3 rounded-2xl border border-border shrink-0 text-xs font-mono shadow-xs">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-muted-foreground">1 Byte = <strong>8 Bits</strong></span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. INTERACTIVE UNIT HIERARCHY EXPLORER                                    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Vertical Units Selector Grid */}
        <div className="lg:col-span-5 space-y-2">
          <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider block mb-2">
            Pilih Tingkatan Satuan:
          </span>

          <div className="space-y-1.5">
            {UNITS_DATA.map((unit, idx) => {
              const isSelected = selectedUnitIdx === idx;
              const IconComp = unit.icon;

              return (
                <button
                  key={unit.name}
                  onClick={() => setSelectedUnitIdx(idx)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected 
                      ? 'bg-card border-primary ring-2 ring-primary/30 shadow-md translate-x-1' 
                      : 'bg-card/50 border-border/70 hover:bg-card hover:border-border text-muted-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl border ${unit.borderColor} ${unit.bgLight} ${unit.color}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${isSelected ? 'text-foreground font-extrabold' : 'text-foreground/90'}`}>
                          {unit.name}
                        </span>
                        <span className="text-[10px] font-mono bg-secondary px-1.5 py-0.5 rounded border border-border/50 text-muted-foreground">
                          {unit.symbol}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {unit.powerOfTwo}
                      </span>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-primary translate-x-1' : 'opacity-0'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep-Dive Card of Selected Unit */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedUnit.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-3xl bg-card border border-border shadow-md space-y-6"
            >
              {/* Unit Header Badge */}
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl border ${selectedUnit.borderColor} ${selectedUnit.bgLight} ${selectedUnit.color}`}>
                    <SelectedIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-xl text-foreground">
                        {selectedUnit.name} ({selectedUnit.symbol})
                      </h4>
                      <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold border border-primary/20">
                        Standar IEC: {selectedUnit.iecSymbol}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">
                      Nama Baku IEC: {selectedUnit.iecName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Analogy Box */}
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/70 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Analogi &amp; Representasi Nyata di Dunia Komputer:</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {selectedUnit.analogy}
                </p>
              </div>

              {/* Comparison Metric Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-2xl bg-secondary/20 border border-border/60 space-y-1">
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold">
                    Standar Desimal SI (Kelipatan 10):
                  </span>
                  <span className="font-extrabold text-sm text-foreground">
                    {selectedUnit.exactDecimal}
                  </span>
                  <p className="text-[10px] text-muted-foreground font-sans">
                    Digunakan oleh produsen penyimpanan (Harddisk, SSD, Flashdisk).
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-secondary/20 border border-border/60 space-y-1">
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold">
                    Standar Biner IEC (Kelipatan 2¹⁰ = 1024):
                  </span>
                  <span className="font-extrabold text-sm text-primary">
                    {selectedUnit.exactBinary}
                  </span>
                  <p className="text-[10px] text-muted-foreground font-sans">
                    Digunakan oleh Sistem Operasi (Windows/Linux), RAM &amp; CPU.
                  </p>
                </div>
              </div>

              {/* Quick Conversion Chain */}
              <div className="p-4 rounded-2xl bg-card border border-border/70 space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold text-muted-foreground block">
                  Rantai Konversi Satuan:
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-foreground font-bold">
                  <span>8 Bit</span>
                  <span className="text-muted-foreground">&rarr;</span>
                  <span className="text-blue-500">1 Byte</span>
                  <span className="text-muted-foreground">&rarr;</span>
                  <span className="text-cyan-500">1.024 B (1 KB)</span>
                  <span className="text-muted-foreground">&rarr;</span>
                  <span className="text-emerald-500">1.024 KB (1 MB)</span>
                  <span className="text-muted-foreground">&rarr;</span>
                  <span className="text-indigo-500">1.024 MB (1 GB)</span>
                  <span className="text-muted-foreground">&rarr;</span>
                  <span className="text-purple-500">1.024 GB (1 TB)</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE LIVE DATA CALCULATOR & FLASHDISK MYSTERY SOLVER             */}
      {/* ========================================================================= */}
      <div className="p-6 md:p-8 rounded-3xl bg-card border border-border shadow-md space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
          <div className="space-y-1">
            <h4 className="font-extrabold text-lg text-foreground flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              <span>Kalkulator Konversi Satuan Data &amp; Pemecah Misteri Kapasitas</span>
            </h4>
            <p className="text-xs text-muted-foreground">
              Masukkan nilai kapasitas untuk melihat hasil konversinya ke seluruh satuan dan alasan di balik selisih kapasitas penyimpanan.
            </p>
          </div>
        </div>

        {/* Input Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-secondary/40 p-1.5 rounded-2xl border border-border">
            <span className="text-xs font-mono font-bold text-muted-foreground px-2">Nilai:</span>
            <input 
              type="number"
              min="1"
              value={calcValue}
              onChange={(e) => setCalcValue(Number(e.target.value) || 0)}
              className="w-24 bg-card border border-border rounded-xl px-3 py-1.5 text-sm font-mono font-extrabold text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-1 bg-secondary/40 p-1.5 rounded-2xl border border-border">
            <span className="text-xs font-mono font-bold text-muted-foreground px-2">Satuan Asal:</span>
            {['KB', 'MB', 'GB', 'TB'].map((u) => (
              <button
                key={u}
                onClick={() => setCalcUnit(u)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  calcUnit === u 
                    ? 'bg-primary text-primary-foreground shadow-xs' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* Live Multi-Unit Conversion Output Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 font-mono text-xs">
          
          <div className="p-3 rounded-2xl bg-secondary/30 border border-border/70 space-y-1">
            <span className="text-[10px] text-muted-foreground block font-bold">Bit (b):</span>
            <span className="font-extrabold text-foreground text-xs line-clamp-1">
              {(currentTotalBytes * 8).toLocaleString('id-ID')}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-secondary/30 border border-border/70 space-y-1">
            <span className="text-[10px] text-muted-foreground block font-bold">Byte (B):</span>
            <span className="font-extrabold text-foreground text-xs line-clamp-1">
              {currentTotalBytes.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-secondary/30 border border-border/70 space-y-1">
            <span className="text-[10px] text-muted-foreground block font-bold">Kilobyte (KB):</span>
            <span className="font-extrabold text-cyan-600 dark:text-cyan-400 text-xs line-clamp-1">
              {(currentTotalBytes / 1024).toLocaleString('id-ID', { maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-secondary/30 border border-border/70 space-y-1">
            <span className="text-[10px] text-muted-foreground block font-bold">Megabyte (MB):</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-xs line-clamp-1">
              {(currentTotalBytes / (1024 * 1024)).toLocaleString('id-ID', { maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-secondary/30 border border-border/70 space-y-1">
            <span className="text-[10px] text-muted-foreground block font-bold">Gigabyte (GB):</span>
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-xs line-clamp-1">
              {(currentTotalBytes / (1024 * 1024 * 1024)).toLocaleString('id-ID', { maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-secondary/30 border border-border/70 space-y-1">
            <span className="text-[10px] text-muted-foreground block font-bold">Terabyte (TB):</span>
            <span className="font-extrabold text-purple-600 dark:text-purple-400 text-xs line-clamp-1">
              {(currentTotalBytes / (1024 * 1024 * 1024 * 1024)).toLocaleString('id-ID', { maximumFractionDigits: 4 })}
            </span>
          </div>

        </div>

        {/* FLASHDISK CAPACITY MYSTERY SPOTLIGHT */}
        <div className="p-4 md:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400 text-sm">
            <HelpCircle className="w-4 h-4 shrink-0" />
            <span>Misteri: Mengapa Flashdisk / SSD {calcValue} {calcUnit} Terbaca Hanya ~{windowsBinaryReport} {calcUnit} di Windows?</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Produsen pabrik flashdisk menggunakan sistem desimal kelipatan 1.000 (1 GB = 10⁹ = 1.000.000.000 Byte), sehingga kemasan tertulis <strong>{calcValue} {calcUnit} = {(nominalDecimalBytes).toLocaleString('id-ID')} Byte</strong>. 
            Namun, Sistem Operasi Windows menghitung dalam kelipatan biner 1024³ = 1.073.741.824 Byte (Gibibyte/GiB). 
            Akibatnya: {(nominalDecimalBytes).toLocaleString('id-ID')} &divide; 1.073.741.824 &asymp; <strong className="text-foreground font-mono">{windowsBinaryReport} GiB</strong>. 
            Ruang penyimpanan Anda tidak hilang atau rusak, melainkan murni perbedaan standar basis satuan desimal (SI) vs biner (IEC)!
          </p>
        </div>

        {/* BIT VS BYTE: KECEPATAN INTERNET VS UKURAN FILE */}
        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400 text-sm">
            <Zap className="w-4 h-4 shrink-0" />
            <span>Perbedaan Huruf Kecil &amp; Besar: Mbps (Internet) vs MB/s (Download File)</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Kecepatan internet yang dijual operator dinyatakan dalam <strong>Mbps (Mega bits per second &ndash; huruf b kecil)</strong>, sedangkan ukuran file film atau musik di komputer dinyatakan dalam <strong>MB (Mega Bytes &ndash; huruf B kapital)</strong>. 
            Karena 1 Byte = 8 bits, maka paket internet <strong>100 Mbps</strong> memiliki kecepatan unduh riil maksimal sebesar: <code className="px-2 py-0.5 rounded bg-card font-bold text-foreground">100 &divide; 8 = 12.5 MB/detik</code>.
          </p>
        </div>

      </div>

    </div>
  );
}
