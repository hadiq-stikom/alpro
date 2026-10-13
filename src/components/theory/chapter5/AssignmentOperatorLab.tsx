"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  RefreshCw, 
  Sparkles, 
  Terminal, 
  Zap,
  Code2,
  Database,
  Cpu
} from 'lucide-react';

export default function AssignmentOperatorLab() {
  const [activeTab, setActiveTab] = useState<'lvalue' | 'versus' | 'compound'>('lvalue');

  // State untuk Tab 1: L-Value vs R-Value
  const [selectedVar, setSelectedVar] = useState<'skor' | 'total' | 'level'>('skor');
  const [rightExpr, setRightExpr] = useState('10 + 5 * 2');
  const [isCalculated, setIsCalculated] = useState(false);
  const [lvalueErrorMode, setLvalueErrorMode] = useState<boolean>(false);

  // State untuk Tab 2: = vs ==
  const [testVarValue, setTestVarValue] = useState(25);
  const [comparisonTarget, setComparisonTarget] = useState(25);
  const [actionLog, setActionLog] = useState<{ type: '=' | '=='; message: string; resultBoolean?: boolean } | null>(null);

  // State untuk Tab 3: Compound Assignment
  const [balance, setBalance] = useState(100000);
  const [deltaValue, setDeltaValue] = useState(25000);
  const [compoundOp, setCompoundOp] = useState<'+=' | '-=' | '*=' | '/=' | '%='>('+=');

  // Handler Tab 1
  const handleEvaluateAssignment = () => {
    setIsCalculated(true);
  };

  const handleResetLvalue = () => {
    setIsCalculated(false);
    setLvalueErrorMode(false);
  };

  // Handler Tab 2
  const handleExecuteSingleEqual = () => {
    const newVal = comparisonTarget;
    setTestVarValue(newVal);
    setActionLog({
      type: '=',
      message: `Operator '=' mengeksekusi penugasan! Nilai variabel 'x' diubah menjadi ${newVal}.`
    });
  };

  const handleExecuteDoubleEqual = () => {
    const isMatched = testVarValue === comparisonTarget;
    setActionLog({
      type: '==',
      message: `Operator '==' menguji kesamaan! RAM 'x' (${testVarValue}) TIDAK diubah. Menghasilkan boolean: ${isMatched ? 'TRUE' : 'FALSE'}.`,
      resultBoolean: isMatched
    });
  };

  // Handler Tab 3: Compound
  const handleApplyCompound = () => {
    switch (compoundOp) {
      case '+=': setBalance(prev => prev + deltaValue); break;
      case '-=': setBalance(prev => Math.max(0, prev - deltaValue)); break;
      case '*=': setBalance(prev => prev * deltaValue); break;
      case '/=': setBalance(prev => deltaValue !== 0 ? Math.floor(prev / deltaValue) : prev); break;
      case '%=': setBalance(prev => deltaValue !== 0 ? prev % deltaValue : prev); break;
    }
  };

  return (
    <div className="border border-border/70 dark:border-slate-800 rounded-3xl overflow-visible bg-card dark:bg-slate-950 shadow-xl space-y-0">
      
      {/* 1. Header Toolbar */}
      <div className="p-4 md:px-6 bg-slate-50/90 dark:bg-slate-900/90 border-b border-border/70 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 rounded-t-3xl">
        <div className="flex items-center gap-2.5">
          <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-900 dark:text-slate-100">
            Laboratorium Eksplorasi Operator Penugasan (Assignment)
          </h3>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-800/80 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('lvalue')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'lvalue' 
                ? 'bg-amber-600 text-white shadow-sm' 
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            1. Alur Kanan-ke-Kiri
          </button>
          <button
            onClick={() => setActiveTab('versus')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'versus' 
                ? 'bg-amber-600 text-white shadow-sm' 
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            2. Bedah '=' vs '=='
          </button>
          <button
            onClick={() => setActiveTab('compound')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'compound' 
                ? 'bg-amber-600 text-white shadow-sm' 
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            3. Compound (+=, -=)
          </button>
        </div>
      </div>

      {/* 2. Main Body Content */}
      <div className="p-4 md:p-6 space-y-6 overflow-visible">

        {/* TAB 1: ALIRAN KANAN KE KIRI & L-VALUE VS R-VALUE */}
        {activeTab === 'lvalue' && (
          <div className="space-y-6 overflow-visible">
            
            <div className="bg-slate-50/80 dark:bg-slate-900/90 border border-border/70 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-inner space-y-5">
              <div className="border-b border-border/70 dark:border-slate-800 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono text-amber-700 dark:text-amber-400 font-bold uppercase tracking-wider">
                    Konsep Fundamental Komputasi
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                    Arah Aliran Data Satu Arah: Ruas Kanan dievaluasi, Ruas Kiri menampung
                  </h4>
                </div>
                <button
                  onClick={handleResetLvalue}
                  className="px-3 py-1 bg-card dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 border border-border/70 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-xl flex items-center gap-1.5 cursor-pointer self-start md:self-center transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Simulasi</span>
                </button>
              </div>

              {/* Mode Toggle Normal vs Kasus Terbalik (Error) */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Pilih Kasus:</span>
                <button
                  onClick={() => setLvalueErrorMode(false)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    !lvalueErrorMode
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  ✓ Statemen Benar: variabel = ekspresi
                </button>
                <button
                  onClick={() => setLvalueErrorMode(true)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    lvalueErrorMode
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  ✗ Kasus Terbalik (Error): 10 = variabel
                </button>
              </div>

              {/* Visual Interactive Pipeline */}
              {!lvalueErrorMode ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2">
                  
                  {/* Left Ruas: L-Value (Wadah Memori) */}
                  <div className="md:col-span-4 p-4 rounded-2xl bg-card dark:bg-slate-950 border-2 border-blue-500/50 shadow-md text-center space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-700 dark:text-blue-400 font-bold block">
                      Ruas Kiri (L-Value: Wadah Memori RAM)
                    </span>
                    <select
                      value={selectedVar}
                      onChange={(e) => setSelectedVar(e.target.value as any)}
                      className="w-full bg-slate-100 dark:bg-slate-900 border border-blue-400/50 rounded-xl px-3 py-2 text-base font-mono font-black text-blue-700 dark:text-blue-300 text-center cursor-pointer"
                    >
                      <option value="skor">skor (integer)</option>
                      <option value="total">total (integer)</option>
                      <option value="level">level (integer)</option>
                    </select>
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 block font-sans">
                      Hanya boleh berupa <strong>nama variabel sah</strong> yang siap ditulisi.
                    </span>
                  </div>

                  {/* Center: Operator = dengan Panah Alir */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center py-2 space-y-1">
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-black font-mono text-3xl">
                      <ArrowLeft className="w-7 h-7 text-amber-600 dark:text-amber-400 animate-pulse" />
                      <span>=</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 font-mono text-center">
                      Aliran Data: KANAN ke KIRI (Assignment)
                    </span>
                    <button
                      onClick={handleEvaluateAssignment}
                      className="mt-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-amber-600/20 cursor-pointer"
                    >
                      Hitung &amp; Simpan ke RAM
                    </button>
                  </div>

                  {/* Right Ruas: R-Value (Ekspresi) */}
                  <div className="md:col-span-4 p-4 rounded-2xl bg-card dark:bg-slate-950 border-2 border-purple-500/50 shadow-md text-center space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-700 dark:text-purple-400 font-bold block">
                      Ruas Kanan (R-Value: Ekspresi Komputasi)
                    </span>
                    <input
                      type="text"
                      value={rightExpr}
                      onChange={(e) => setRightExpr(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-slate-900 border border-purple-400/50 rounded-xl px-3 py-2 text-base font-mono font-black text-purple-700 dark:text-purple-300 text-center"
                    />
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 block font-sans">
                      Dievaluasi tuntas oleh CPU: <code>10 + (5 * 2) = 20</code>
                    </span>
                  </div>

                </div>
              ) : (
                /* Tampilan Error L-Value terbalik */
                <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-500 text-slate-800 dark:text-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm font-mono">
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                    <span>SyntaxError: cannot assign to literal / expression!</span>
                  </div>
                  <div className="bg-slate-900 text-rose-300 font-mono text-xs p-3 rounded-xl border border-rose-500/30">
                    <code>&gt;&gt;&gt; 10 = skor</code><br />
                    <code>&nbsp;&nbsp;&nbsp;&nbsp;^</code><br />
                    <code>SyntaxError: cannot assign to literal here. Maybe you meant '=='?</code>
                  </div>
                  <p className="text-xs leading-relaxed">
                    <strong>Mengapa Error?</strong> Nilai angka <code>10</code> adalah konstanta nilai (literal), bukan wadah memori RAM. Anda tidak bisa menuangkan isi gelas ke dalam nomor meja! Sisi kiri tanda <code>=</code> WAJIB berupa wadah variabel penampung (*L-Value*).
                  </p>
                </div>
              )}

              {/* Status RAM Live Update */}
              {isCalculated && !lvalueErrorMode && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                        Kompilasi Sukses: RAM Diperbarui!
                      </span>
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                        CPU menyelesaikan <code>{rightExpr} &rarr; 20</code>, lalu menulis <code>RAM[{selectedVar}] = 20</code>.
                      </span>
                    </div>
                  </div>
                  <span className="font-mono font-black text-sm text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-slate-900 px-3 py-1 rounded-lg border border-emerald-300 dark:border-emerald-800">
                    {selectedVar} = 20
                  </span>
                </div>
              )}

            </div>

            {/* Insight Card */}
            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-500/10 border-2 border-amber-400/40 dark:border-amber-500/30 text-xs text-slate-800 dark:text-slate-100 space-y-1.5 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
              <strong className="text-amber-800 dark:text-amber-300 font-bold block font-mono text-sm">
                💡 Intisari Pedagogis L-Value vs R-Value:
              </strong>
              <p className="leading-relaxed">
                Di matematika sekolah, rumus ditulis dua arah: $x = 5$ sama dengan $5 = x$. Namun di pemrograman komputer, <strong>tanda '=' adalah instruksi simpan satu arah ($\leftarrow$)</strong>. Ruas kanan (R-Value) dihitung tuntas hingga bernilai tunggal, lalu dituangkan ke alamat memori ruas kiri (L-Value).
              </p>
            </div>

          </div>
        )}

        {/* TAB 2: PERBEDAAN FATAL = (ASSIGNMENT) VS == (EQUALITY) */}
        {activeTab === 'versus' && (
          <div className="space-y-6 overflow-visible">
            
            <div className="bg-slate-50/80 dark:bg-slate-900/90 border border-border/70 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-inner space-y-5">
              <div className="border-b border-border/70 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono text-amber-700 dark:text-amber-400 font-bold uppercase tracking-wider">
                  Mencegah Bug Terbesar Pemula
                </span>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                  Tanda '=' (Penugasan / Aksi Simpan) vs Tanda '==' (Relasional / Pengujian Logika)
                </h4>
              </div>

              {/* Interactive Sandbox Playground */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Panel 1: Operator = (Penugasan) */}
                <div className="p-5 rounded-2xl bg-card dark:bg-slate-950 border-2 border-amber-500/40 space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                      Operator '=' (Satu Tanda)
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase">AKSI MEMPERBARUI RAM</span>
                  </div>
                  
                  <div className="font-mono text-xs text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 p-3 rounded-xl">
                    <code>x = {comparisonTarget}</code>
                  </div>
                  
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Menginstruksikan CPU untuk <strong>menimpa nilai di RAM</strong> variabel <code>x</code> dengan angka <code>{comparisonTarget}</code>.
                  </p>

                  <button
                    onClick={handleExecuteSingleEqual}
                    className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-amber-600/20 cursor-pointer"
                  >
                    Jalankan: x = {comparisonTarget} (Ubah Isi RAM)
                  </button>
                </div>

                {/* Panel 2: Operator == (Perbandingan) */}
                <div className="p-5 rounded-2xl bg-card dark:bg-slate-950 border-2 border-blue-500/40 space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                      Operator '==' (Dua Tanda)
                    </span>
                    <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase">PENGUJIAN TANPA UBAH RAM</span>
                  </div>
                  
                  <div className="font-mono text-xs text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 p-3 rounded-xl">
                    <code>x == {comparisonTarget}</code>
                  </div>
                  
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Meminta CPU <strong>menguji apakah nilai x saat ini sama dengan {comparisonTarget}</strong>. RAM tidak disentuh sama sekali!
                  </p>

                  <button
                    onClick={handleExecuteDoubleEqual}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-blue-600/20 cursor-pointer"
                  >
                    Jalankan: x == {comparisonTarget} (Uji &amp; Hasilkan Boolean)
                  </button>
                </div>

              </div>

              {/* Status Live RAM dan Hasil Log */}
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-border/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Isi Memori RAM Saat Ini (Variabel 'x'):
                  </span>
                  <span className="font-mono font-black text-sm text-purple-700 dark:text-purple-400 bg-white dark:bg-slate-950 px-3 py-0.5 rounded-lg border border-border">
                    x = {testVarValue}
                  </span>
                </div>

                {actionLog && (
                  <div className={`p-3 rounded-xl border text-xs font-mono mt-2 ${
                    actionLog.type === '=' 
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-800 dark:text-amber-200' 
                      : 'bg-blue-50 dark:bg-blue-950/40 border-blue-400 text-blue-800 dark:text-blue-200'
                  }`}>
                    {actionLog.message}
                  </div>
                )}
              </div>

            </div>

            {/* Comparison Table */}
            <div className="p-4 rounded-2xl bg-card dark:bg-slate-950 border border-border/70 dark:border-slate-800 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-border/70 dark:border-slate-800 text-slate-700 dark:text-slate-400">
                    <th className="p-2.5">Simbol</th>
                    <th className="p-2.5">Nama Operator</th>
                    <th className="p-2.5">Fungsi Utama</th>
                    <th className="p-2.5">Dampak pada RAM</th>
                    <th className="p-2.5">Keluaran Nilai</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                  <tr className="hover:bg-slate-100/50 dark:hover:bg-slate-900/50">
                    <td className="p-2.5 font-bold text-amber-700 dark:text-amber-400 text-sm">=</td>
                    <td className="p-2.5 font-sans font-bold">Penugasan (Assignment)</td>
                    <td className="p-2.5 font-sans">Menyimpan data ruas kanan ke variabel kiri</td>
                    <td className="p-2.5 text-amber-700 dark:text-amber-400 font-bold font-sans">Isi memori berubah</td>
                    <td className="p-2.5 font-sans">Tidak ada (hanya aksi mutasi)</td>
                  </tr>
                  <tr className="hover:bg-slate-100/50 dark:hover:bg-slate-900/50">
                    <td className="p-2.5 font-bold text-blue-700 dark:text-blue-400 text-sm">==</td>
                    <td className="p-2.5 font-sans font-bold">Kesamaan (Equality Relational)</td>
                    <td className="p-2.5 font-sans">Menguji apakah dua nilai bernilai setara</td>
                    <td className="p-2.5 text-emerald-700 dark:text-emerald-400 font-bold font-sans">Isi memori TIDAK berubah</td>
                    <td className="p-2.5 text-purple-700 dark:text-purple-400 font-bold">Boolean (True / False)</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: COMPOUND ASSIGNMENT OPERATOR */}
        {activeTab === 'compound' && (
          <div className="space-y-6 overflow-visible">
            
            <div className="bg-slate-50/80 dark:bg-slate-900/90 border border-border/70 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-inner space-y-4 overflow-visible">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-border/70 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-bold uppercase tracking-wider">
                    Sintaks Ringkas Profesional
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                    Compound Assignment (+=, -=, *=, /=, %=)
                  </h4>
                </div>
                <button
                  onClick={() => setBalance(100000)}
                  className="px-3 py-1 bg-card dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 border border-border/70 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-xl flex items-center gap-1.5 cursor-pointer self-start md:self-center transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Saldo</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center overflow-visible">
                
                {/* Control Panel */}
                <div className="lg:col-span-7 space-y-3 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-700 dark:text-slate-400 font-bold">Pilih Operator Compound:</label>
                      <select
                        value={compoundOp}
                        onChange={(e) => setCompoundOp(e.target.value as any)}
                        className="w-full bg-card dark:bg-slate-950 border border-border/80 dark:border-slate-700 rounded-xl px-3 py-2 text-cyan-700 dark:text-cyan-300 font-bold focus:outline-none focus:border-cyan-500 cursor-pointer"
                      >
                        <option value="+=">+= (Tambah &amp; Simpan)</option>
                        <option value="-=">-= (Kurang &amp; Simpan)</option>
                        <option value="*=">*= (Kali &amp; Simpan)</option>
                        <option value="/=">/= (Bagi &amp; Simpan)</option>
                        <option value="%=">%= (Mod &amp; Simpan)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-700 dark:text-slate-400 font-bold">Nilai Pengubah (Delta):</label>
                      <input
                        type="number"
                        value={deltaValue}
                        onChange={(e) => setDeltaValue(parseInt(e.target.value) || 0)}
                        className="w-full bg-card dark:bg-slate-950 border border-border/80 dark:border-slate-700 rounded-xl px-3 py-2 text-cyan-700 dark:text-cyan-300 font-bold focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleApplyCompound}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-md shadow-cyan-600/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Eksekusi Instruksi: saldo {compoundOp} {deltaValue}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* RAM Memory State Box */}
                <div className="lg:col-span-5 p-4 rounded-2xl bg-card dark:bg-slate-950 border-2 border-cyan-500/40 text-center space-y-1 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center md:origin-right hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.9)] hover:border-cyan-500">
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-mono font-bold block">Lokasi Memori RAM (saldo):</span>
                  <div className="text-2xl font-mono font-black text-cyan-700 dark:text-cyan-300 py-1">
                    Rp {balance.toLocaleString('id-ID')}
                  </div>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono font-bold block">
                    Ekuivalen: <code>saldo = saldo {compoundOp.replace('=', '')} {deltaValue}</code>
                  </span>
                </div>

              </div>
            </div>

            {/* Quick Reference Table */}
            <div className="p-4 rounded-2xl bg-card dark:bg-slate-950 border border-border/70 dark:border-slate-800 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-border/70 dark:border-slate-800 text-slate-700 dark:text-slate-400">
                    <th className="p-2.5">Sintaks Compound</th>
                    <th className="p-2.5">Bentuk Penulisan Panjang</th>
                    <th className="p-2.5">Arti Operasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                  <tr className="hover:bg-slate-100/50 dark:hover:bg-slate-900/50">
                    <td className="p-2.5 font-bold text-cyan-700 dark:text-cyan-400">x += y</td>
                    <td className="p-2.5">x = x + y</td>
                    <td className="p-2.5 font-sans">Tambahkan y ke nilai x lama, simpan kembali ke x</td>
                  </tr>
                  <tr className="hover:bg-slate-100/50 dark:hover:bg-slate-900/50">
                    <td className="p-2.5 font-bold text-cyan-700 dark:text-cyan-400">x -= y</td>
                    <td className="p-2.5">x = x - y</td>
                    <td className="p-2.5 font-sans">Kurangkan y dari nilai x lama, simpan kembali ke x</td>
                  </tr>
                  <tr className="hover:bg-slate-100/50 dark:hover:bg-slate-900/50">
                    <td className="p-2.5 font-bold text-cyan-700 dark:text-cyan-400">x *= y</td>
                    <td className="p-2.5">x = x * y</td>
                    <td className="p-2.5 font-sans">Kalikan x lama dengan y, simpan kembali ke x</td>
                  </tr>
                  <tr className="hover:bg-slate-100/50 dark:hover:bg-slate-900/50">
                    <td className="p-2.5 font-bold text-cyan-700 dark:text-cyan-400">x /= y</td>
                    <td className="p-2.5">x = x / y</td>
                    <td className="p-2.5 font-sans">Bagikan x lama dengan y, simpan kembali ke x</td>
                  </tr>
                  <tr className="hover:bg-slate-100/50 dark:hover:bg-slate-900/50">
                    <td className="p-2.5 font-bold text-cyan-700 dark:text-cyan-400">x %= y</td>
                    <td className="p-2.5">x = x % y</td>
                    <td className="p-2.5 font-sans">Ambil sisa bagi x dengan y, simpan kembali ke x</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
