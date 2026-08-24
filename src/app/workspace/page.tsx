"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Play, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  GitMerge, 
  FileCode2, 
  BookOpen, 
  Send, 
  Bot, 
  Loader2, 
  Terminal, 
  ChevronUp, 
  ChevronDown,
  ArrowLeft,
  Sparkles,
  Layers,
  CheckCircle2,
  LayoutGrid,
  Code2
} from 'lucide-react';
import { usePython } from '@/hooks/usePython';
import FlowchartVisualizer from '@/components/FlowchartVisualizer';

// Editor stabil
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import { useLanguage } from '@/context/LanguageContext';
import { useJavaScript } from '@/hooks/useJavaScript';

interface Mission {
  id: number;
  title: string;
  category: string;
  description: string;
  formula: string;
  pyCode: string;
  jsCode: string;
  theoryDesc: string;
}

const missions: Mission[] = [
  {
    id: 1,
    title: 'Misi 5.1: Konversi Suhu (Aritmatika)',
    category: 'Aritmatika',
    description: 'Bantulah stasiun cuaca mengonversi suhu dari Celcius ke Fahrenheit. Buat variabel celcius dengan nilai 30, lalu hitung fahrenheit dengan rumus.',
    formula: 'fahrenheit = (9/5 * celcius) + 32',
    pyCode: `celcius = 30\nfahrenheit = (9/5 * celcius) + 32\nprint("Suhu dalam Fahrenheit:", fahrenheit)`,
    jsCode: `let celcius = 30;\nlet fahrenheit = (9/5 * celcius) + 32;\nconsole.log("Suhu dalam Fahrenheit:", fahrenheit);`,
    theoryDesc: 'Operator aritmatika +, -, *, / digunakan untuk mengolah data numerik secara matematis.'
  },
  {
    id: 2,
    title: 'Misi 5.2: Dekomposisi Detik (Modulo % & //)',
    category: 'Modulo & Floor Div',
    description: 'Urai total 3725 detik menjadi berapa jam, menit, dan sisa detik menggunakan kombinasi pembagian bulat (//) dan modulo (%).',
    formula: 'jam = detik // 3600 | sisa = detik % 3600 | menit = sisa // 60 | detik_akhir = sisa % 60',
    pyCode: `total_detik = 3725\njam = total_detik // 3600\nsisa = total_detik % 3600\nmenit = sisa // 60\ndetik = sisa % 60\nprint("Hasil:", jam, "jam", menit, "menit", detik, "detik")`,
    jsCode: `let total_detik = 3725;\nlet jam = Math.floor(total_detik / 3600);\nlet sisa = total_detik % 3600;\nlet menit = Math.floor(sisa / 60);\nlet detik = sisa % 60;\nconsole.log("Hasil:", jam, "jam", menit, "menit", detik, "detik");`,
    theoryDesc: 'Modulo (%) menghasilkan sisa pembagian bulat, sangat penting untuk siklus waktu berulang.'
  },
  {
    id: 3,
    title: 'Misi 5.3: Kelayakan Ujian SIM (Relasional & Logika)',
    category: 'Relasional & Logika',
    description: 'Uji apakah calon pengemudi berhak membuat SIM. Syarat: umur minimal 17 tahun DAN nilai tes minimal 75.',
    formula: 'lulus_sim = (umur >= 17) and (skor_tes >= 75)',
    pyCode: `umur = 19\nskor_tes = 80\nlulus_sim = (umur >= 17) and (skor_tes >= 75)\nprint("Status Kelayakan SIM:", lulus_sim)`,
    jsCode: `let umur = 19;\nlet skor_tes = 80;\nlet lulus_sim = (umur >= 17) && (skor_tes >= 75);\nconsole.log("Status Kelayakan SIM:", lulus_sim);`,
    theoryDesc: 'Operator perbandingan (>=) menghasilkan boolean, dan operator logika (and / &&) menggabungkan kondisi.'
  },
  {
    id: 4,
    title: 'Misi 5.4: Kasir Diskon & Pajak (Presedensi PEMDAS)',
    category: 'PEMDAS',
    description: 'Hitung total bayar kasir: subtotal harga dikali kuantitas, dikurangi diskon 10%, lalu ditambah pajak 5000.',
    formula: 'subtotal = harga * qty | total = subtotal - (0.10 * subtotal) + pajak',
    pyCode: `harga = 50000\nqty = 2\npajak = 5000\nsubtotal = harga * qty\ntotal = subtotal - (0.10 * subtotal) + pajak\nprint("Total Pembayaran:", total)`,
    jsCode: `let harga = 50000;\nlet qty = 2;\nlet pajak = 5000;\nlet subtotal = harga * qty;\nlet total = subtotal - (0.10 * subtotal) + pajak;\nconsole.log("Total Pembayaran:", total);`,
    theoryDesc: 'Tanda kurung () memiliki presedensi mutlak tertinggi untuk mendahulukan perhitungan diskon.'
  },
  {
    id: 5,
    title: 'Misi 5.5: Struk Belanja & Compound (f-string & -=)',
    category: 'Compound & String',
    description: 'Perbarui saldo dompet digital setelah belanja menggunakan compound operator (-=) dan format struk f-string.',
    formula: 'saldo -= belanja | struk = f"Halo {nama}, sisa: {saldo}"',
    pyCode: `nama = "Budi"\nsaldo = 150000\nbelanja = 45000\nsaldo -= belanja\nprint(f"Halo {nama}, sisa saldo: Rp {saldo}")`,
    jsCode: `let nama = "Budi";\nlet saldo = 150000;\nlet belanja = 45000;\nsaldo -= belanja;\nconsole.log(\`Halo \${nama}, sisa saldo: Rp \${saldo}\`);`,
    theoryDesc: 'Compound operator (-=) menyederhanakan update nilai pada variabel yang sama.'
  }
];

export default function Workspace() {
  const [selectedMissionId, setSelectedMissionId] = useState(1);
  const [activeTab, setActiveTab] = useState<'task' | 'theory'>('task');
  const [visualizerTab, setVisualizerTab] = useState<'descriptive' | 'flowchart' | 'pseudocode' | 'all'>('flowchart');
  const [showMemory, setShowMemory] = useState(true);
  const [isVisualizerMaximized, setIsVisualizerMaximized] = useState(false);
  const [chatInput, setChatInput] = useState('');
  
  const { language } = useLanguage();
  
  // Eksekutor
  const py = usePython();
  const js = useJavaScript();
  const engine = language === 'python' ? py : js;
  const { isLoading, output, variables, runCode } = engine;
  
  const currentMission = missions.find(m => m.id === selectedMissionId) || missions[0];

  // Code Editor State
  const [pythonCode, setPythonCode] = useState(currentMission.pyCode);
  const [jsCode, setJsCode] = useState(currentMission.jsCode);
  
  const code = language === 'python' ? pythonCode : jsCode;
  const setCode = language === 'python' ? setPythonCode : setJsCode;

  // Handle Mission Switch
  const handleSelectMission = (id: number) => {
    setSelectedMissionId(id);
    const m = missions.find(item => item.id === id) || missions[0];
    setPythonCode(m.pyCode);
    setJsCode(m.jsCode);
  };

  // Live Real-Time Execution (Debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoading) {
        runCode(code);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [code, isLoading, runCode]);

  // AI Chat Mock State
  const [messages, setMessages] = useState<{role: 'bot'|'user', text: string}[]>([
    { role: 'bot', text: 'Halo! Pilih misi di sebelah kiri, edit kodenya di editor kanan, dan perhatikan bagaimana Flowchart & RAM bereaksi secara langsung!' }
  ]);

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const newMessages = [...messages, { role: 'user' as const, text: chatInput }];
    setMessages(newMessages);
    setChatInput('');
    
    setTimeout(() => {
      setMessages([...newMessages, { role: 'bot', text: `Pertanyaan bagus mengenai ${currentMission.category}. Perhatikan rumus: ${currentMission.formula}. Coba ubah angkanya di editor!` }]);
    }, 1000);
  };

  const handleRun = async () => {
    if (isLoading) return;
    await runCode(code);
  };

  const inferType = (val: any): string => {
    if (typeof val === 'number') {
      return Number.isInteger(val) ? 'integer' : 'float';
    }
    if (typeof val === 'boolean') return 'boolean';
    if (typeof val === 'string') return 'string';
    return 'float';
  };

  const renderPseudocode = () => {
    // Generate Program Name based on mission
    const progName = currentMission.title.split(':')[1]?.trim().replace(/[^a-zA-Z0-9]/g, '') || 'LabOperator';

    // Extract variables and types
    const varEntries = Object.entries(variables);
    
    return (
      <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 font-mono text-sm leading-relaxed shadow-lg w-full max-w-lg text-foreground transition-all">
        {/* 1. Header */}
        <div className="text-violet-600 dark:text-violet-400 font-extrabold text-lg tracking-wide">
          PROGRAM {progName}
        </div>
        <div className="text-muted-foreground text-xs italic mb-4 font-sans border-b border-border/40 pb-3 mt-0.5">
          // {currentMission.description}
        </div>
        
        {/* 2. Kamus */}
        <div className="text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider mb-1">
          KAMUS:
        </div>
        <div className="pl-4 mb-4 text-xs space-y-0.5 text-foreground/90">
          {varEntries.length > 0 ? (
            varEntries.map(([k, v]) => (
              <div key={k}>
                <span className="text-violet-600 dark:text-violet-400 font-bold">{k}</span> : <span className="text-blue-600 dark:text-blue-400 font-semibold">{inferType(v)}</span>
              </div>
            ))
          ) : (
            <div className="text-muted-foreground italic">variabel_program : float</div>
          )}
        </div>
        
        {/* 3. Algoritma */}
        <div className="text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider mb-1">
          ALGORITMA:
        </div>
        <div className="pl-4 text-xs space-y-1.5 text-foreground/90 font-medium">
          {code.split('\n').filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('//')).map((line, i) => {
            const normalizedLine = line.replace(/^(let|const|var)\s+/, '').replace(/;/g, '').trim();
            
            // Input statement
            if (normalizedLine.includes('=') && (normalizedLine.includes('input(') || normalizedLine.includes('prompt('))) {
              const parts = normalizedLine.split('=');
              const varName = parts[0].trim();
              return (
                <div key={i} className="text-fuchsia-600 dark:text-fuchsia-400 font-bold">
                  input(<span className="text-violet-600 dark:text-violet-400">{varName}</span>)
                </div>
              );
            }
            
            // Output statement (print / console.log)
            if (normalizedLine.startsWith('print') || normalizedLine.startsWith('console.log')) {
              const match = normalizedLine.match(/\((.*)\)/);
              const args = match ? match[1].trim() : '';
              return (
                <div key={i} className="text-emerald-600 dark:text-emerald-400 font-bold">
                  output({args})
                </div>
              );
            }

            // Assignment / Math statement (using modern '=' operator)
            if (normalizedLine.includes('=')) {
              const parts = normalizedLine.split('=');
              const left = parts[0].trim();
              const right = parts.slice(1).join('=').trim();
              return (
                <div key={i}>
                  <span className="text-violet-600 dark:text-violet-400 font-bold">{left}</span> <span className="text-rose-600 dark:text-rose-400 font-extrabold">=</span> {right}
                </div>
              );
            }

            return <div key={i}>{normalizedLine}</div>;
          })}
        </div>
      </div>
    );
  };

  const renderNaratif = () => (
    <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 text-sm leading-loose shadow-lg w-full max-w-lg text-foreground transition-all">
      <h3 className="font-extrabold text-xl mb-4 text-violet-600 dark:text-violet-400 border-b border-border/50 pb-3">
        Algoritma Naratif
      </h3>

      <div className="space-y-3.5 text-sm md:text-base text-slate-700 dark:text-slate-300">
        {code.split('\n').filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('//')).map((line, i) => {
          const normalizedLine = line.replace(/^(let|const|var)\s+/, '').replace(/;/g, '').trim();
          
          // Input
          if (normalizedLine.includes('=') && (normalizedLine.includes('input(') || normalizedLine.includes('prompt('))) {
            const parts = normalizedLine.split('=');
            const varName = parts[0].trim();
            return (
              <p key={i} className="leading-relaxed">
                {i + 1}. Masukkan nilai <strong className="text-violet-600 dark:text-violet-400 font-bold">{varName}</strong>.
              </p>
            );
          }

          // Assignment & Math
          if (normalizedLine.includes('=') && !normalizedLine.startsWith('print') && !normalizedLine.startsWith('console.log')) {
            const parts = normalizedLine.split('=');
            const varName = parts[0].trim();
            const expr = parts.slice(1).join('=').trim();
            const isMath = isNaN(Number(expr)) && (expr.includes('*') || expr.includes('/') || expr.includes('+') || expr.includes('-') || expr.includes('%'));

            if (isMath) {
              return (
                <div key={i} className="leading-relaxed">
                  <p>
                    {i + 1}. Hitung nilai <strong className="text-violet-600 dark:text-violet-400 font-bold">{varName}</strong>
                  </p>
                  <div className="pl-5 mt-1">
                    <code className="bg-slate-100 dark:bg-slate-800/80 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-lg font-mono text-xs md:text-sm border border-border/60 inline-block font-bold">
                      {varName} = {expr}
                    </code>
                  </div>
                </div>
              );
            } else {
              return (
                <p key={i} className="leading-relaxed">
                  {i + 1}. Tentukan nilai <strong className="text-violet-600 dark:text-violet-400 font-bold">{varName}</strong> sebesar <span className="font-semibold text-slate-900 dark:text-slate-100">{expr}</span>.
                </p>
              );
            }
          }

          // Output
          if (normalizedLine.startsWith('print') || normalizedLine.startsWith('console.log')) {
            const match = normalizedLine.match(/\((.*)\)/);
            const args = match ? match[1].trim() : '';
            return (
              <p key={i} className="leading-relaxed">
                {i + 1}. Tampilkan hasil <span className="text-emerald-600 dark:text-emerald-400 font-bold">{args}</span> ke layar.
              </p>
            );
          }

          return null;
        })}
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-background flex flex-col overflow-hidden h-[calc(100vh-4rem)]">
      
      {/* Top Navbar Studio */}
      <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <Link href="/theory/5" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Teori Bab 5</span>
          </Link>
          <span className="text-slate-600">|</span>
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Pertemuan 5: Interactive Code &amp; Algorithm Studio
          </span>
        </div>

        {/* Mission Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {missions.map(m => (
            <button
              key={m.id}
              onClick={() => handleSelectMission(m.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedMissionId === m.id 
                  ? 'bg-amber-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              5.{m.id}
            </button>
          ))}
        </div>
      </div>

      {/* Workspace Grid Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Panel 1: Modul & AI (Kiri - 3 Kolom) */}
        <div className={`${isVisualizerMaximized ? 'hidden' : 'lg:col-span-3'} border-r border-border/50 bg-card/50 flex flex-col overflow-hidden`}>
          <div className="flex border-b border-border/50 bg-secondary/20">
            <button onClick={() => setActiveTab('task')} className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer ${activeTab === 'task' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}>
              <FileCode2 className="w-4 h-4" /> Misi Praktikum
            </button>
            <button onClick={() => setActiveTab('theory')} className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer ${activeTab === 'theory' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}>
              <BookOpen className="w-4 h-4" /> Konsep Inti
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {activeTab === 'task' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded">
                    {currentMission.category}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">Bab 5</span>
                </div>

                <h2 className="font-bold text-base md:text-lg text-foreground">
                  {currentMission.title}
                </h2>
                
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentMission.description}
                </p>

                <div className="p-3 bg-secondary/30 rounded-xl border border-border/50 space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block font-mono">FORMULA TARGET</span>
                  <p className="font-mono text-xs text-primary font-bold">{currentMission.formula}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <h2 className="font-bold text-base text-foreground">Konsep Operator</h2>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentMission.theoryDesc}
                </p>
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary leading-relaxed">
                  💡 Amati bagaimana setiap perubahan angka pada kode di sebelah kanan langsung mengubah diagram Flowchart di tengah!
                </div>
              </div>
            )}
          </div>

          {/* AI Tutor Chat */}
          <div className="h-64 border-t border-border/50 bg-secondary/10 flex flex-col">
            <div className="p-2.5 border-b border-border/50 flex items-center justify-between bg-secondary/30">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold">Socratic AI Tutor</span>
              </div>
              <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full">Assistant</span>
            </div>
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${msg.role === 'user' ? 'bg-purple-500/20' : 'bg-primary/20'}`}>
                    {msg.role === 'user' ? '👤' : <Bot className="w-3.5 h-3.5 text-primary" />}
                  </div>
                  <div className={`p-2.5 rounded-2xl border text-xs max-w-[85%] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground border-primary rounded-tr-none' 
                      : 'bg-secondary border-border/50 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2.5 border-t border-border/50 bg-card">
              <div className="relative">
                <input 
                  type="text" 
                  value={chatInput} 
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  placeholder="Tanya rumus / logika..." 
                  className="w-full bg-background border border-border/50 rounded-full py-1.5 pl-3.5 pr-8 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button onClick={handleSendChat} className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 bg-primary rounded-full text-primary-foreground hover:bg-primary/90 cursor-pointer">
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2: Visualizer (Tengah - 5 Kolom atau 12 Kolom saat Maximized) */}
        <div className={`${isVisualizerMaximized ? 'lg:col-span-12 z-20' : 'lg:col-span-5'} bg-background flex flex-col relative overflow-hidden transition-all duration-300`}>
          <div className="p-1 flex items-center justify-between border-b border-border/50 bg-card/50 backdrop-blur z-20 absolute top-0 w-full h-11">
            <div className="flex h-full p-0.5 bg-secondary/50 rounded-lg ml-2 items-center gap-1">
              <button 
                onClick={() => setVisualizerTab('descriptive')} 
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${visualizerTab === 'descriptive' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Naratif
              </button>
              <button 
                onClick={() => setVisualizerTab('flowchart')} 
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${visualizerTab === 'flowchart' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Flowchart
              </button>
              <button 
                onClick={() => setVisualizerTab('pseudocode')} 
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${visualizerTab === 'pseudocode' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Pseudocode
              </button>
              {isVisualizerMaximized && (
                <button 
                  onClick={() => setVisualizerTab('all')} 
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${visualizerTab === 'all' ? 'bg-amber-500 text-white shadow-md' : 'text-amber-500 hover:text-amber-400 bg-amber-500/10'}`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Tampilkan Semua (Berdampingan)</span>
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {isVisualizerMaximized && (
                <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline-block mr-1">
                  Mode Layar Penuh
                </span>
              )}
              <button 
                onClick={() => {
                  if (isVisualizerMaximized && visualizerTab === 'all') {
                    setVisualizerTab('flowchart');
                  }
                  setIsVisualizerMaximized(!isVisualizerMaximized);
                }}
                className="p-1.5 hover:bg-secondary rounded text-muted-foreground mr-2 transition-colors cursor-pointer"
                title={isVisualizerMaximized ? "Perkecil (Minimize)" : "Perbesar (Maximize)"}
              >
                {isVisualizerMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center z-10 w-full h-full relative pt-11">
             {visualizerTab === 'flowchart' && <FlowchartVisualizer code={code} variables={variables} />}
             
             {visualizerTab === 'pseudocode' && (
               <div className="w-full h-full p-6 overflow-auto bg-secondary/10 flex justify-center items-start pt-14">
                 {renderPseudocode()}
               </div>
             )}

             {visualizerTab === 'descriptive' && (
               <div className="w-full h-full p-6 overflow-auto bg-secondary/10 flex justify-center items-start pt-14">
                 {renderNaratif()}
               </div>
             )}

             {/* Mode Quad-Split (4 Kolom Berdampingan) */}
             {visualizerTab === 'all' && isVisualizerMaximized && (
               <div className="w-full h-full p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 overflow-y-auto bg-secondary/10 pt-14">
                 
                 {/* Kolom 1: Algoritma Naratif */}
                 <div className="flex flex-col h-[calc(100vh-8.5rem)] overflow-hidden bg-card border border-border/60 rounded-3xl shadow-lg p-5">
                   <div className="flex items-center justify-between border-b border-border/40 pb-2 mb-3">
                     <span className="text-xs font-bold text-violet-600 dark:text-violet-400">1. Algoritma Naratif</span>
                     <span className="text-[10px] font-mono text-muted-foreground">Bahasa Alami</span>
                   </div>
                   <div className="flex-1 overflow-y-auto pr-1">
                     {renderNaratif()}
                   </div>
                 </div>

                 {/* Kolom 2: Flowchart */}
                 <div className="flex flex-col h-[calc(100vh-8.5rem)] overflow-hidden bg-card border border-border/60 rounded-3xl shadow-lg p-3">
                   <div className="flex items-center justify-between border-b border-border/40 pb-2 mb-1 px-2">
                     <span className="text-xs font-bold text-blue-600 dark:text-blue-400">2. Flowchart</span>
                     <span className="text-[10px] font-mono text-muted-foreground">Diagram Alir</span>
                   </div>
                   <div className="flex-1 w-full h-full relative rounded-2xl overflow-hidden">
                     <FlowchartVisualizer code={code} variables={variables} />
                   </div>
                 </div>

                 {/* Kolom 3: Pseudocode */}
                 <div className="flex flex-col h-[calc(100vh-8.5rem)] overflow-hidden bg-card border border-border/60 rounded-3xl shadow-lg p-5">
                   <div className="flex items-center justify-between border-b border-border/40 pb-2 mb-3">
                     <span className="text-xs font-bold text-violet-600 dark:text-violet-400">3. Pseudocode</span>
                     <span className="text-[10px] font-mono text-muted-foreground">Standar Bab 3</span>
                   </div>
                   <div className="flex-1 overflow-y-auto pr-1">
                     {renderPseudocode()}
                   </div>
                 </div>

                 {/* Kolom 4: Live Code Editor & Output Console */}
                 <div className="flex flex-col h-[calc(100vh-8.5rem)] overflow-hidden bg-[#0d1117] border border-border/60 rounded-3xl shadow-lg text-white">
                   <div className="p-3 border-b border-border/20 bg-[#161b22] flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                       <span className="text-xs font-mono font-bold text-emerald-400">
                         4. Kode ({language === 'python' ? 'main.py' : 'main.js'})
                       </span>
                     </div>
                     <button 
                       onClick={handleRun}
                       disabled={isLoading}
                       className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                     >
                       {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                       <span>{isLoading ? '...' : 'RUN'}</span>
                     </button>
                   </div>

                   {/* Editor Area */}
                   <div className="flex-1 overflow-auto p-4 font-mono text-xs">
                     <Editor
                       value={code}
                       onValueChange={newCode => setCode(newCode)}
                       highlight={code => Prism.highlight(code, language === 'python' ? Prism.languages.python : Prism.languages.javascript, language)}
                       padding={6}
                       className="font-mono min-h-full focus:outline-none"
                       style={{ fontFamily: '"Fira Code", "Fira Mono", monospace', fontSize: 13 }}
                     />
                   </div>

                   {/* Console Output in Quad Split */}
                   <div className="h-36 border-t border-border/20 bg-black p-3 font-mono text-xs text-emerald-400 flex flex-col shrink-0">
                     <div className="text-[10px] text-gray-400 mb-1 flex items-center gap-1.5">
                       <Terminal className="w-3 h-3 text-emerald-400" />
                       <span>OUTPUT CONSOLE:</span>
                     </div>
                     <div className="flex-1 overflow-y-auto whitespace-pre-wrap">
                       {output || <span className="text-gray-600 italic">Program siap dijalankan...</span>}
                     </div>
                   </div>
                 </div>

               </div>
             )}
          </div>
        </div>

        {/* Panel 3: Code Editor & Console (Kanan - 4 Kolom) */}
        <div className={`${isVisualizerMaximized ? 'hidden' : 'lg:col-span-4'} border-l border-border/50 bg-[#0d1117] flex flex-col overflow-hidden text-white`}>
          
          {/* Editor Header */}
          <div className="p-2 border-b border-border/20 bg-[#161b22] flex items-center justify-between">
            <div className="flex items-center gap-2 pl-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
              <span className="text-xs font-mono text-gray-400 ml-2">
                main.{language === 'python' ? 'py' : 'js'}
              </span>
            </div>
            
            <button 
              onClick={handleRun}
              disabled={isLoading}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isLoading ? 'Running...' : 'RUN'}</span>
            </button>
          </div>

          {/* State Memory Inspector Bar */}
          <div className="w-full bg-[#161b22] border-b border-border/20 z-20 shrink-0">
            <div 
              className="px-4 py-1.5 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => setShowMemory(!showMemory)}
            >
              <span className="text-[10px] font-bold tracking-wider text-cyan-400 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                STATE MEMORY RAM (LIVE)
              </span>
              {showMemory ? <ChevronUp className="w-3 h-3 text-gray-400" /> : <ChevronDown className="w-3 h-3 text-gray-400" />}
            </div>
            {showMemory && (
              <div className="p-2.5 bg-[#0d1117] border-t border-border/10 shadow-inner max-h-36 overflow-y-auto">
                {Object.keys(variables).length === 0 ? (
                  <div className="text-xs text-center text-gray-500 italic py-1">Memori kosong. Tekan RUN.</div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(variables).map(key => (
                      <div key={key} className="flex flex-col p-1.5 bg-[#161b22] rounded-lg border border-border/10 shadow-sm">
                        <span className="font-mono text-purple-400 text-[10px] truncate">{key}</span>
                        <span className="font-mono text-emerald-400 text-xs font-bold truncate">{variables[key]?.toString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Code Editor Box */}
          <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed bg-[#0d1117]">
            <Editor
              value={code}
              onValueChange={newCode => setCode(newCode)}
              highlight={code => Prism.highlight(code, language === 'python' ? Prism.languages.python : Prism.languages.javascript, language)}
              padding={10}
              className="font-mono min-h-full focus:outline-none"
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 13,
              }}
            />
          </div>

          {/* Output Terminal Console */}
          <div className="h-40 border-t border-border/20 bg-black flex flex-col shrink-0">
            <div className="px-3 py-1 bg-[#161b22] text-[10px] font-mono text-gray-400 border-b border-border/10 flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-emerald-400" />
              <span>OUTPUT CONSOLE</span>
            </div>
            <div className="p-3 font-mono text-xs text-emerald-400 overflow-y-auto flex-1 whitespace-pre-wrap">
              {output || <span className="text-gray-600 italic">Program siap dijalankan...</span>}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
