"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GitBranch, 
  Sparkles, 
  ToggleLeft, 
  ToggleRight, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  HelpCircle,
  ShieldAlert,
  Layers
} from 'lucide-react';

export default function RelationalLogicLab() {
  // State untuk Truth Table Interactive Switches
  const [valP, setValP] = useState(true);
  const [valQ, setValQ] = useState(false);

  // State untuk perbandingan relasional
  const [numA, setNumA] = useState(10);
  const [numB, setNumB] = useState(20);
  const [selectedRelOp, setSelectedRelOp] = useState<string>('==');

  // State untuk tab
  const [activeTab, setActiveTab] = useState<'relational' | 'truthTable' | 'shortCircuit'>('relational');

  // Evaluasi Relasional
  const evalRelational = () => {
    switch (selectedRelOp) {
      case '==': return numA === numB;
      case '!=': return numA !== numB;
      case '>': return numA > numB;
      case '<': return numA < numB;
      case '>=': return numA >= numB;
      case '<=': return numA <= numB;
      default: return false;
    }
  };

  const relResult = evalRelational();

  // Evaluasi Logika
  const andResult = valP && valQ;
  const orResult = valP || valQ;
  const notPResult = !valP;
  const notQResult = !valQ;

  return (
    <div className="border border-border/60 rounded-3xl overflow-visible bg-slate-950 shadow-2xl space-y-0">
      
      {/* 1. Header Toolbar Tabs */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 rounded-t-3xl">
        <div className="flex items-center gap-2.5">
          <GitBranch className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-sm md:text-base text-slate-100">
            Laboratorium Relasional &amp; Logika Boolean
          </h3>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('relational')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'relational' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Relasional (= vs ==)</span>
          </button>
          <button
            onClick={() => setActiveTab('truthTable')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'truthTable' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Tabel Kebenaran (Truth Table)</span>
          </button>
          <button
            onClick={() => setActiveTab('shortCircuit')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'shortCircuit' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Short-Circuit Evaluation</span>
          </button>
        </div>
      </div>

      {/* 2. Main Workspace */}
      <div className="p-4 md:p-6 space-y-6 overflow-visible">
        
        {/* ========================================================================= */}
        {/* TAB 1: OPERATOR RELASIONAL & JEBAKAN = VS ==                              */}
        {/* ========================================================================= */}
        {activeTab === 'relational' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 overflow-visible"
          >
            {/* Fatal Trap Box: = vs == */}
            <div className="p-4 md:p-5 rounded-2xl bg-rose-500/10 border border-rose-500/40 space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.03] transition-all duration-300 origin-center hover:shadow-[0_20px_40px_rgba(244,63,94,0.3)]">
              <div className="flex items-center gap-2 text-rose-400 font-extrabold text-sm">
                <AlertTriangle className="w-5 h-5" />
                <span>JEBAKAN FATAL NOMOR 1 PEMULA: Perbedaan Tanda = vs ==</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3.5 bg-slate-950/90 rounded-xl border border-rose-500/30 space-y-1.5">
                  <span className="text-rose-400 font-bold block font-sans">
                    1. Tanda = (Satu Sama Dengan) &rarr; PENUGASAN (Assignment)
                  </span>
                  <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                    Digunakan untuk <strong>memasukkan nilai</strong> ke dalam wadah variabel. BUKAN membandingkan!
                  </p>
                  <div className="text-cyan-300 font-bold bg-slate-900 p-2 rounded-lg border border-slate-800">
                    skor = 100  # skor sekarang bernilai 100
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950/90 rounded-xl border border-emerald-500/30 space-y-1.5">
                  <span className="text-emerald-400 font-bold block font-sans">
                    2. Tanda == (Dua Sama Dengan) &rarr; PEMBANDING (Comparison)
                  </span>
                  <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                    Digunakan untuk <strong>menguji apakah dua nilai sama persis</strong>. Menghasilkan Boolean (True/False).
                  </p>
                  <div className="text-emerald-300 font-bold bg-slate-900 p-2 rounded-lg border border-slate-800">
                    skor == 100  # Menghasilkan True atau False
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Relational Sandbox */}
            <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs md:text-sm font-bold text-slate-200 flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-emerald-400" />
                  Uji Coba Interaktif Operator Relasional:
                </h4>
                <span className="text-[10px] font-mono text-slate-400">Live Relational Tester</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center font-mono">
                {/* Number A */}
                <div className="md:col-span-3 space-y-1">
                  <label className="text-xs font-bold text-slate-400">Nilai A:</label>
                  <input
                    type="number"
                    value={numA}
                    onChange={(e) => setNumA(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-cyan-300 text-sm font-bold focus:outline-none focus:border-emerald-400"
                  />
                </div>

                {/* Operator Selector */}
                <div className="md:col-span-3 space-y-1">
                  <label className="text-xs font-bold text-slate-400">Operator Pembanding:</label>
                  <select
                    value={selectedRelOp}
                    onChange={(e) => setSelectedRelOp(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 text-sm font-bold focus:outline-none focus:border-emerald-400 cursor-pointer"
                  >
                    <option value="==">== (Sama Dengan)</option>
                    <option value="!=">!= (Tidak Sama Dengan)</option>
                    <option value=">">&gt; (Lebih Besar)</option>
                    <option value="<">&lt; (Lebih Kecil)</option>
                    <option value=">=">&gt;= (Lebih Besar Sama)</option>
                    <option value="<=">&lt;= (Lebih Kecil Sama)</option>
                  </select>
                </div>

                {/* Number B */}
                <div className="md:col-span-3 space-y-1">
                  <label className="text-xs font-bold text-slate-400">Nilai B:</label>
                  <input
                    type="number"
                    value={numB}
                    onChange={(e) => setNumB(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-cyan-300 text-sm font-bold focus:outline-none focus:border-emerald-400"
                  />
                </div>

                {/* Result Box */}
                <div className="md:col-span-3 space-y-1">
                  <label className="text-xs font-bold text-slate-400">Hasil Evaluasi Boolean:</label>
                  <div className={`w-full border rounded-xl px-3 py-2 text-sm font-bold flex items-center justify-between ${
                    relResult 
                      ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-400' 
                      : 'bg-rose-500/20 border-rose-500/60 text-rose-400'
                  }`}>
                    <span>{numA} {selectedRelOp} {numB} &rarr; {relResult ? 'True' : 'False'}</span>
                    {relResult ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: TABEL KEBENARAN INTERAKTIF (TRUTH TABLE MATRIX)                    */}
        {/* ========================================================================= */}
        {activeTab === 'truthTable' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 overflow-visible"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-visible">
              
              {/* Left Column: Interactive Switch Inputs */}
              <div className="lg:col-span-4 p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  Saklar Input Nilai Kebenaran:
                </span>

                {/* Toggle P */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-300 block">Kondisi P:</span>
                    <span className={`text-sm font-mono font-extrabold ${valP ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {valP ? 'True (1 / Menyala)' : 'False (0 / Mati)'}
                    </span>
                  </div>
                  <button
                    onClick={() => setValP(!valP)}
                    className="cursor-pointer text-emerald-400 hover:scale-110 transition-transform"
                  >
                    {valP ? <ToggleRight className="w-9 h-9 text-emerald-400" /> : <ToggleLeft className="w-9 h-9 text-slate-600" />}
                  </button>
                </div>

                {/* Toggle Q */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-300 block">Kondisi Q:</span>
                    <span className={`text-sm font-mono font-extrabold ${valQ ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {valQ ? 'True (1 / Menyala)' : 'False (0 / Mati)'}
                    </span>
                  </div>
                  <button
                    onClick={() => setValQ(!valQ)}
                    className="cursor-pointer text-emerald-400 hover:scale-110 transition-transform"
                  >
                    {valQ ? <ToggleRight className="w-9 h-9 text-emerald-400" /> : <ToggleLeft className="w-9 h-9 text-slate-600" />}
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  Klik saklar di atas untuk melihat respon instan pada gerbang logika di samping!
                </p>
              </div>

              {/* Right Column: Dynamic Matrix Table */}
              <div className="lg:col-span-8 overflow-visible">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-visible">
                  
                  {/* Gate 1: AND */}
                  <div className={`p-4 rounded-2xl border-2 transition-all space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] sm:hover:scale-[1.3] duration-300 ease-out origin-center md:origin-left hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] ${
                    andResult ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}>
                    <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                      <strong className="text-sm font-bold text-white">Logika AND ( &amp;&amp; )</strong>
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${andResult ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-500'}`}>
                        {andResult ? 'TRUE' : 'FALSE'}
                      </span>
                    </div>
                    <div className="text-xs font-mono">
                      {valP ? 'True' : 'False'} <strong className="text-amber-400">and</strong> {valQ ? 'True' : 'False'} &rarr; <strong className={andResult ? 'text-emerald-400' : 'text-rose-400'}>{andResult ? 'True' : 'False'}</strong>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                      Hanya bernilai <strong>True jika KEDUA-DUANYA</strong> bernilai True.
                    </p>
                  </div>

                  {/* Gate 2: OR */}
                  <div className={`p-4 rounded-2xl border-2 transition-all space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] sm:hover:scale-[1.3] duration-300 ease-out origin-center md:origin-right hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] ${
                    orResult ? 'bg-blue-500/15 border-blue-500 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}>
                    <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                      <strong className="text-sm font-bold text-white">Logika OR ( || )</strong>
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${orResult ? 'bg-blue-500 text-white' : 'bg-slate-950 text-slate-500'}`}>
                        {orResult ? 'TRUE' : 'FALSE'}
                      </span>
                    </div>
                    <div className="text-xs font-mono">
                      {valP ? 'True' : 'False'} <strong className="text-amber-400">or</strong> {valQ ? 'True' : 'False'} &rarr; <strong className={orResult ? 'text-blue-400' : 'text-rose-400'}>{orResult ? 'True' : 'False'}</strong>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                      Bernilai <strong>True jika SALAH SATU saja</strong> bernilai True.
                    </p>
                  </div>

                  {/* Gate 3: NOT P */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] sm:hover:scale-[1.3] duration-300 ease-out origin-center md:origin-left hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-purple-400">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                      <strong className="text-sm font-bold text-white">Logika NOT P ( !P )</strong>
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${notPResult ? 'bg-purple-500 text-white' : 'bg-slate-950 text-slate-500'}`}>
                        {notPResult ? 'TRUE' : 'FALSE'}
                      </span>
                    </div>
                    <div className="text-xs font-mono">
                      <strong className="text-purple-400">not</strong> ({valP ? 'True' : 'False'}) &rarr; <strong className="text-purple-300">{notPResult ? 'True' : 'False'}</strong>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                      Inversi nilai P (kebalikan dari P).
                    </p>
                  </div>

                  {/* Gate 4: NOT Q */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] sm:hover:scale-[1.3] duration-300 ease-out origin-center md:origin-right hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-amber-400">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                      <strong className="text-sm font-bold text-white">Logika NOT Q ( !Q )</strong>
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${notQResult ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-500'}`}>
                        {notQResult ? 'TRUE' : 'FALSE'}
                      </span>
                    </div>
                    <div className="text-xs font-mono">
                      <strong className="text-amber-400">not</strong> ({valQ ? 'True' : 'False'}) &rarr; <strong className="text-amber-300">{notQResult ? 'True' : 'False'}</strong>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                      Inversi nilai Q (kebalikan dari Q).
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SHORT-CIRCUIT EVALUATION (OPTIMASI CERDAS KOMPILER)                */}
        {/* ========================================================================= */}
        {activeTab === 'shortCircuit' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 overflow-visible"
          >
            <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Optimasi Cerdas Kompiler &amp; Interpreter
                </span>
                <h4 className="text-base md:text-lg font-extrabold text-slate-100 mt-1">
                  Bagaimana Komputer Menghemat Waktu: Short-Circuit Logic
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Kompiler tidak akan pernah mengevaluasi ekspresi kedua jika hasil akhir sudah bisa dipastikan 100% dari ekspresi pertama!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-visible">
                
                {/* Short Circuit AND */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] sm:hover:scale-[1.3] transition-all duration-300 ease-out origin-center md:origin-left hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-rose-400">
                  <span className="text-xs font-bold text-rose-400 block font-mono">
                    1. Short-Circuit pada AND (False &amp;&amp; ...):
                  </span>
                  <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 space-y-1">
                    <div className="text-rose-400 font-bold">if False and cek_database_lama():</div>
                    <div className="text-slate-500 text-[10px]">&rarr; fungsi cek_database_lama() TIDAK AKAN PERNAH DIJALANKAN!</div>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                    Karena sisi kiri sudah <code>False</code>, apapun isi sisi kanan, hasil akhir AND pasti <code>False</code>. Komputer langsung berhenti di sisi kiri.
                  </p>
                </div>

                {/* Short Circuit OR */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] sm:hover:scale-[1.3] transition-all duration-300 ease-out origin-center md:origin-right hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-emerald-400">
                  <span className="text-xs font-bold text-emerald-400 block font-mono">
                    2. Short-Circuit pada OR (True || ...):
                  </span>
                  <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 space-y-1">
                    <div className="text-emerald-400 font-bold">if True or hitung_rumus_berat():</div>
                    <div className="text-slate-500 text-[10px]">&rarr; fungsi hitung_rumus_berat() TIDAK AKAN PERNAH DIJALANKAN!</div>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                    Karena sisi kiri sudah <code>True</code>, apapun isi sisi kanan, hasil akhir OR pasti <code>True</code>. Komputer langsung melompat tanpa membuang daya CPU.
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* 4. Tabel Kamus Lengkap Operator Relasional & Logika */}
        <div className="space-y-4 pt-2">
          {/* Tabel Relasional */}
          <div className="p-4 md:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <ShieldAlert className="w-4 h-4" />
              <span>Tabel Kamus Lengkap 6 Operator Relasional (Pembanding):</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-sans">
                    <th className="p-3">Simbol</th>
                    <th className="p-3">Makna Operasi</th>
                    <th className="p-3">Pseudocode</th>
                    <th className="p-3">Python 3</th>
                    <th className="p-3">JavaScript</th>
                    <th className="p-3">Contoh Uji</th>
                    <th className="p-3">Hasil Evaluasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-emerald-400 text-sm">==</td>
                    <td className="p-3 font-sans font-bold text-white">Sama Dengan</td>
                    <td className="p-3 text-purple-300">a = b</td>
                    <td className="p-3 text-blue-300">a == b</td>
                    <td className="p-3 text-amber-300">a === b</td>
                    <td className="p-3 text-cyan-300">5 == 5</td>
                    <td className="p-3 font-bold text-emerald-400">True</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-emerald-400 text-sm">!=</td>
                    <td className="p-3 font-sans font-bold text-white">Tidak Sama Dengan</td>
                    <td className="p-3 text-purple-300">a &lt;&gt; b / a != b</td>
                    <td className="p-3 text-blue-300">a != b</td>
                    <td className="p-3 text-amber-300">a !== b</td>
                    <td className="p-3 text-cyan-300">5 != 3</td>
                    <td className="p-3 font-bold text-emerald-400">True</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-blue-400 text-sm">&gt;</td>
                    <td className="p-3 font-sans font-bold text-white">Lebih Besar Dari</td>
                    <td className="p-3 text-purple-300">a &gt; b</td>
                    <td className="p-3 text-blue-300">a &gt; b</td>
                    <td className="p-3 text-amber-300">a &gt; b</td>
                    <td className="p-3 text-cyan-300">10 &gt; 20</td>
                    <td className="p-3 font-bold text-rose-400">False</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-blue-400 text-sm">&lt;</td>
                    <td className="p-3 font-sans font-bold text-white">Lebih Kecil Dari</td>
                    <td className="p-3 text-purple-300">a &lt; b</td>
                    <td className="p-3 text-blue-300">a &lt; b</td>
                    <td className="p-3 text-amber-300">a &lt; b</td>
                    <td className="p-3 text-cyan-300">10 &lt; 20</td>
                    <td className="p-3 font-bold text-emerald-400">True</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-purple-400 text-sm">&gt;=</td>
                    <td className="p-3 font-sans font-bold text-white">Lebih Besar Sama Dengan</td>
                    <td className="p-3 text-purple-300">a &gt;= b</td>
                    <td className="p-3 text-blue-300">a &gt;= b</td>
                    <td className="p-3 text-amber-300">a &gt;= b</td>
                    <td className="p-3 text-cyan-300">17 &gt;= 17</td>
                    <td className="p-3 font-bold text-emerald-400">True</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-purple-400 text-sm">&lt;=</td>
                    <td className="p-3 font-sans font-bold text-white">Lebih Kecil Sama Dengan</td>
                    <td className="p-3 text-purple-300">a &lt;= b</td>
                    <td className="p-3 text-blue-300">a &lt;= b</td>
                    <td className="p-3 text-amber-300">a &lt;= b</td>
                    <td className="p-3 text-cyan-300">25 &lt;= 20</td>
                    <td className="p-3 font-bold text-rose-400">False</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabel Logika Boolean */}
          <div className="p-4 md:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Zap className="w-4 h-4" />
              <span>Tabel Kamus 3 Operator Logika Boolean (AND, OR, NOT):</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-sans">
                    <th className="p-3">Operator</th>
                    <th className="p-3">Pseudocode</th>
                    <th className="p-3">Python 3</th>
                    <th className="p-3">JavaScript</th>
                    <th className="p-3">Aturan Kebenaran</th>
                    <th className="p-3">Contoh Ekspresi</th>
                    <th className="p-3">Hasil</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-emerald-400">AND (Konjungsi)</td>
                    <td className="p-3 text-purple-300">AND</td>
                    <td className="p-3 text-blue-300">and</td>
                    <td className="p-3 text-amber-300">&amp;&amp;</td>
                    <td className="p-3 font-sans text-slate-300">True HANYA jika semua operand bernilai True.</td>
                    <td className="p-3 text-cyan-300">(5 &gt; 2) and (10 &gt; 5)</td>
                    <td className="p-3 font-bold text-emerald-400">True</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-blue-400">OR (Disjungsi)</td>
                    <td className="p-3 text-purple-300">OR</td>
                    <td className="p-3 text-blue-300">or</td>
                    <td className="p-3 text-amber-300">||</td>
                    <td className="p-3 font-sans text-slate-300">True jika MINIMAL SATU operand bernilai True.</td>
                    <td className="p-3 text-cyan-300">(5 &gt; 10) or (10 &gt; 5)</td>
                    <td className="p-3 font-bold text-emerald-400">True</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-purple-400">NOT (Negasi)</td>
                    <td className="p-3 text-purple-300">NOT</td>
                    <td className="p-3 text-blue-300">not</td>
                    <td className="p-3 text-amber-300">!</td>
                    <td className="p-3 font-sans text-slate-300">Membalikkan nilai boolean (True &harr; False).</td>
                    <td className="p-3 text-cyan-300">not (5 &gt; 10)</td>
                    <td className="p-3 font-bold text-emerald-400">True</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
