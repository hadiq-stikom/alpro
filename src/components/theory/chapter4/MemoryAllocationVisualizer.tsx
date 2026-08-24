"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Package, 
  Sparkles, 
  RotateCcw, 
  Zap, 
  Edit3, 
  Eye, 
  RefreshCw, 
  Layers,
  Tag,
  ArrowRight,
  Info
} from 'lucide-react';

interface StorageBox {
  id: string;
  address: string;
  name: string | null;
  value: string | null;
  isAllocated: boolean;
  color: string;
}

export default function MemoryAllocationVisualizer() {
  const [viewMode, setViewMode] = useState<'warehouse' | 'ram'>('warehouse');
  const [inputName, setInputName] = useState('skor_pemain');
  const [inputValue, setInputValue] = useState('100');

  const [boxes, setBoxes] = useState<StorageBox[]>([
    { id: '1', address: '0x7FFE0', name: 'skor_pemain', value: '100', isAllocated: true, color: 'border-blue-500 bg-blue-500/10 text-blue-400' },
    { id: '2', address: '0x7FFE4', name: 'nama_hero', value: 'Arjuna', isAllocated: true, color: 'border-emerald-500 bg-emerald-500/10 text-emerald-400' },
    { id: '3', address: '0x7FFE8', name: 'sisa_nyawa', value: '3', isAllocated: true, color: 'border-purple-500 bg-purple-500/10 text-purple-400' },
    { id: '4', address: '0x7FFEC', name: null, value: null, isAllocated: false, color: 'border-slate-800 bg-slate-950/40 text-slate-600' },
    { id: '5', address: '0x7FFF0', name: null, value: null, isAllocated: false, color: 'border-slate-800 bg-slate-950/40 text-slate-600' },
    { id: '6', address: '0x7FFF4', name: null, value: null, isAllocated: false, color: 'border-slate-800 bg-slate-950/40 text-slate-600' },
  ]);

  const [selectedBox, setSelectedBox] = useState<number>(0);
  const [actionLog, setActionLog] = useState<string>(
    'Wadah "skor_pemain" saat ini menyimpan nilai 100.'
  );

  // Assign or Update
  const handleAssign = () => {
    if (!inputName.trim()) return;

    const trimmedName = inputName.trim();
    const existingIndex = boxes.findIndex(
      b => b.name?.toLowerCase() === trimmedName.toLowerCase()
    );

    if (existingIndex !== -1) {
      // Re-assignment (Mutable concept)
      const updated = [...boxes];
      const oldValue = updated[existingIndex].value;
      updated[existingIndex] = {
        ...updated[existingIndex],
        value: inputValue.trim()
      };
      setBoxes(updated);
      setSelectedBox(existingIndex);
      setActionLog(
        `[NILAI BERUBAH / MUTABLE] Wadah "${trimmedName}" diubah isinya dari ${oldValue} menjadi ${inputValue.trim()}. Nama wadah dan alamatnya tetap sama!`
      );
    } else {
      // Allocate new empty box
      const emptyIndex = boxes.findIndex(b => !b.isAllocated);
      if (emptyIndex !== -1) {
        const colors = [
          'border-cyan-500 bg-cyan-500/10 text-cyan-400',
          'border-amber-500 bg-amber-500/10 text-amber-400',
          'border-rose-500 bg-rose-500/10 text-rose-400'
        ];
        const updated = [...boxes];
        updated[emptyIndex] = {
          ...updated[emptyIndex],
          name: trimmedName,
          value: inputValue.trim(),
          color: colors[emptyIndex % colors.length],
          isAllocated: true
        };
        setBoxes(updated);
        setSelectedBox(emptyIndex);
        setActionLog(
          `[WADAH BARU DIBUAT] Berhasil menempel label "${trimmedName}" pada wadah baru dan mengisinya dengan "${inputValue.trim()}".`
        );
      } else {
        setActionLog('[WADAH PENUH] Semua wadah penyimpanan telah terisi. Hapus atau timpa wadah yang ada.');
      }
    }
  };

  const handleReset = () => {
    setBoxes([
      { id: '1', address: '0x7FFE0', name: 'skor_pemain', value: '100', isAllocated: true, color: 'border-blue-500 bg-blue-500/10 text-blue-400' },
      { id: '2', address: '0x7FFE4', name: 'nama_hero', value: 'Arjuna', isAllocated: true, color: 'border-emerald-500 bg-emerald-500/10 text-emerald-400' },
      { id: '3', address: '0x7FFE8', name: 'sisa_nyawa', value: '3', isAllocated: true, color: 'border-purple-500 bg-purple-500/10 text-purple-400' },
      { id: '4', address: '0x7FFEC', name: null, value: null, isAllocated: false, color: 'border-slate-800 bg-slate-950/40 text-slate-600' },
      { id: '5', address: '0x7FFF0', name: null, value: null, isAllocated: false, color: 'border-slate-800 bg-slate-950/40 text-slate-600' },
      { id: '6', address: '0x7FFF4', name: null, value: null, isAllocated: false, color: 'border-slate-800 bg-slate-950/40 text-slate-600' },
    ]);
    setSelectedBox(0);
    setInputName('skor_pemain');
    setInputValue('100');
    setActionLog('Wadah penyimpanan di-reset ke kondisi awal.');
  };

  return (
    <div className="border border-border/60 rounded-3xl overflow-hidden bg-slate-950 shadow-2xl">
      
      {/* 1. Header Toolbar */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Package className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-100">
            Simulator Interaktif: &quot;Variabel Sebagai Wadah Bernama&quot;
          </h3>
        </div>

        {/* View Mode Switcher: Kotak Gudang vs Memori RAM */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('warehouse')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'warehouse' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>📦 Analogi Kotak Gudang</span>
          </button>
          <button
            onClick={() => setViewMode('ram')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'ram' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>💻 Petak Memori RAM</span>
          </button>
        </div>
      </div>

      {/* 2. Main Workspace */}
      <div className="p-4 md:p-6 space-y-6">
        
        {/* Form: Simpan / Ganti Isi Wadah */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-inner">
          <div className="text-xs text-slate-300 font-medium mb-3 flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-cyan-400" />
            <span>Interaksi: Deklarasikan Nama Wadah &amp; Isi Nilainya</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            
            {/* Variable Name Input */}
            <div className="sm:col-span-5 space-y-1">
              <label className="text-[11px] font-bold text-slate-300 font-sans flex items-center gap-1">
                <Tag className="w-3 h-3 text-cyan-400" />
                Nama Wadah (Label Variabel):
              </label>
              <input 
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="misal: skor_pemain"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Variable Value Input */}
            <div className="sm:col-span-4 space-y-1">
              <label className="text-[11px] font-bold text-slate-300 font-sans flex items-center gap-1">
                <Package className="w-3 h-3 text-emerald-400" />
                Isi di Dalam Wadah (Nilai):
              </label>
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="misal: 150 atau Budi"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-emerald-400 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="sm:col-span-3 flex gap-2">
              <button
                onClick={handleAssign}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                title="Masukkan ke Wadah"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Simpan Nilai</span>
              </button>
              <button
                onClick={handleReset}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                title="Reset Semua Wadah"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* 3. Visual Grid: Kotak Gudang vs RAM Cells */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              {viewMode === 'warehouse' ? (
                <>
                  <Package className="w-4 h-4 text-cyan-400" />
                  Deretan Kotak Penyimpanan di Gudang:
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  Alamat Fisik Petak Memori RAM:
                </>
              )}
            </span>
            <span className="text-[11px] text-slate-400 font-sans">Klik kotak untuk memilih</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {boxes.map((box, idx) => {
              const isSelected = selectedBox === idx;
              return (
                <motion.div
                  key={box.id}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => {
                    setSelectedBox(idx);
                    if (box.isAllocated) {
                      setInputName(box.name || '');
                      setInputValue(box.value || '');
                    }
                  }}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[140px] relative overflow-hidden ${
                    isSelected ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)]' : ''
                  } ${box.isAllocated ? box.color : 'border-slate-800/80 bg-slate-950/40 text-slate-600'}`}
                >
                  {/* Top Bar: Address / Box Tag */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {viewMode === 'warehouse' ? `Kotak #${box.id}` : box.address}
                    </span>
                    {box.isAllocated && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                        TERISI
                      </span>
                    )}
                  </div>

                  {/* Variable Name / Label */}
                  <div className="my-2 text-center">
                    {box.isAllocated ? (
                      <>
                        <span className="text-[10px] text-slate-400 block font-sans">Label Nama:</span>
                        <strong className="text-xs font-mono font-extrabold text-white truncate block">
                          {box.name}
                        </strong>
                      </>
                    ) : (
                      <span className="text-xs font-mono text-slate-700 italic block">
                        [KOSONG]
                      </span>
                    )}
                  </div>

                  {/* Stored Value */}
                  <div className="bg-slate-950/90 rounded-xl p-2 text-center border border-white/10">
                    <span className="text-[9px] text-slate-400 block font-sans">Isi Barang/Nilai:</span>
                    <strong className={`text-sm font-mono font-bold truncate block ${box.isAllocated ? 'text-cyan-300' : 'text-slate-700'}`}>
                      {box.isAllocated ? box.value : '-'}
                    </strong>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 4. Realtime Explanation & AHA Moment */}
        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-slate-200">
              <strong className="text-cyan-300">Log Aktivitas:</strong> {actionLog}
            </span>
          </div>
          <span className="text-[11px] text-cyan-300 font-bold shrink-0 bg-slate-950 px-3 py-1 rounded-lg border border-cyan-500/30">
            💡 Momen AHA: Label wadah tetap sama, tetapi isinya bebas diganti!
          </span>
        </div>

      </div>

    </div>
  );
}
