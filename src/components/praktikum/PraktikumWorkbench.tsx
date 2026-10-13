"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Terminal,
  Play,
  RotateCcw,
  Maximize2,
  Minimize2,
  Copy,
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  Sparkles,
  AlertTriangle,
  FileSpreadsheet,
  CornerDownLeft,
  ChevronDown,
  Loader2,
  Code2
} from "lucide-react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

import { usePython } from "@/hooks/usePython";
import { useJavaScript } from "@/hooks/useJavaScript";
import { ProsedurStepItem } from "@/lib/praktikum-data";

interface PraktikumWorkbenchProps {
  moduleId: number;
  moduleTitle: string;
  prosedurSteps?: ProsedurStepItem[];
  onApplyOutputToTable?: (
    actualOutput: string,
    measuredMetric: string,
    targetRowNo: number
  ) => void;
  totalRows?: number;
  selectedRowNo?: number;
  externalCodeTrigger?: { code: string; timestamp: number } | null;
}

export default function PraktikumWorkbench({
  moduleId,
  moduleTitle,
  prosedurSteps = [],
  onApplyOutputToTable,
  totalRows = 5,
  selectedRowNo = 1,
  externalCodeTrigger = null
}: PraktikumWorkbenchProps) {
  // Pilihan Bahasa Eksekusi (Default Python)
  const [language, setLanguage] = useState<"python" | "javascript">("python");

  // Filter langkah yang memiliki potongan kode uji
  const codeSteps = prosedurSteps.filter((s) => !!s.codeSnippet);

  // Template awal berdasarkan modul
  const getDefaultCode = (lang: "python" | "javascript") => {
    const firstSnippet = codeSteps[0]?.codeSnippet;
    if (lang === "python") {
      return (
        firstSnippet ||
        `# Workbench Pengujian Modul ${moduleId}\n# Tulis ekspresi atau program Python di sini:\n\na = 10\nb = 4\nhasil = a // b\nprint(f"Hasil {a} // {b} =", hasil)`
      );
    } else {
      return `// Workbench Pengujian Modul ${moduleId} (JavaScript)\nlet a = 10;\nlet b = 4;\nlet hasil = Math.floor(a / b);\nconsole.log(\`Hasil \${a} // \${b} = \${hasil}\`);`;
    }
  };

  const [pythonCode, setPythonCode] = useState<string>(() => getDefaultCode("python"));
  const [jsCode, setJsCode] = useState<string>(() => getDefaultCode("javascript"));
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [targetRowNo, setTargetRowNo] = useState<number>(selectedRowNo);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [activeScenarioNo, setActiveScenarioNo] = useState<number | null>(null);

  // Engines
  const pyEngine = usePython();
  const jsEngine = useJavaScript();
  const activeEngine = language === "python" ? pyEngine : jsEngine;
  const { isLoading, output, variables, variableDetails, runCode, setOutput } = activeEngine;

  const currentCode = language === "python" ? pythonCode : jsCode;
  const setCurrentCode = language === "python" ? setPythonCode : setJsCode;

  // Tangani trigger kode eksternal dari tombol "Uji di Simulator" pada langkah kerja
  useEffect(() => {
    if (externalCodeTrigger && externalCodeTrigger.code) {
      if (language === "python") {
        setPythonCode(externalCodeTrigger.code);
      } else {
        setJsCode(externalCodeTrigger.code);
      }
      // Deteksi nomor langkah yang bersesuaian
      const matched = codeSteps.find((s) => s.codeSnippet === externalCodeTrigger.code);
      if (matched) {
        setActiveScenarioNo(matched.no);
        // Otomatis arahkan target baris tabel jika cocok
        if (matched.no >= 2 && matched.no <= totalRows + 1) {
          setTargetRowNo(matched.no - 1);
        }
      }
    }
  }, [externalCodeTrigger]);

  // Sinkronkan targetRowNo jika prop selectedRowNo berubah
  useEffect(() => {
    if (selectedRowNo && selectedRowNo >= 1 && selectedRowNo <= totalRows) {
      setTargetRowNo(selectedRowNo);
    }
  }, [selectedRowNo, totalRows]);

  // Eksekusi Kode
  const handleExecute = useCallback(async () => {
    if (isLoading) return;
    const t0 = performance.now();
    await runCode(currentCode);
    const t1 = performance.now();
    const dur = Math.max(0.1, Number((t1 - t0).toFixed(2)));
    setExecutionTime(dur);
  }, [currentCode, isLoading, runCode]);

  // Pintasan Keyboard Ctrl+Enter / Cmd+Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleExecute();
    }
  };

  // Muat Skenario Uji Tertentu
  const handleLoadScenario = (step: ProsedurStepItem) => {
    if (!step.codeSnippet) return;
    setActiveScenarioNo(step.no);
    if (language === "python") {
      setPythonCode(step.codeSnippet);
    } else {
      setJsCode(step.codeSnippet);
    }
    // Arahkan nomor target baris tabel
    if (step.no >= 2 && step.no <= totalRows + 1) {
      setTargetRowNo(step.no - 1);
    }
  };

  // Reset Kode ke Bawaan
  const handleResetCode = () => {
    setActiveScenarioNo(null);
    if (language === "python") {
      setPythonCode(getDefaultCode("python"));
    } else {
      setJsCode(getDefaultCode("javascript"));
    }
    setOutput([]);
    setExecutionTime(null);
  };

  // Bersihkan Terminal
  const handleClearTerminal = () => {
    setOutput([]);
    setExecutionTime(null);
  };

  // Salin Output Aktual ke Tabel Pengamatan
  const handleApplyToTable = () => {
    if (!onApplyOutputToTable) return;

    let cleanOutput = "";
    if (output && output.length > 0) {
      cleanOutput = output.join("\n").trim();
    } else {
      cleanOutput = "Eksekusi berhasil (tanpa output stdout).";
    }

    // Bangun string metrik empiris terukur (termasuk kepatuhan tipe int vs float)
    let metricStr = "";
    if (executionTime !== null) {
      metricStr += `Waktu: ${executionTime} ms`;
    }
    const details = Object.entries(variableDetails || {});
    if (details.length > 0) {
      const topVars = details
        .slice(0, 2)
        .map(([k, m]) => `${k}=${m.repr} (${m.type}${m.size ? `, ${m.size}B` : ""})`)
        .join(", ");
      metricStr += metricStr ? ` | RAM: ${topVars}` : `RAM: ${topVars}`;
    } else {
      const varKeys = Object.keys(variables || {});
      if (varKeys.length > 0) {
        const topVars = varKeys
          .slice(0, 2)
          .map((k) => `${k}=${JSON.stringify(variables[k])}`)
          .join(", ");
        metricStr += metricStr ? ` | RAM: ${topVars}` : `RAM: ${topVars}`;
      }
    }
    if (!metricStr) {
      metricStr = "Normal (0 Exception)";
    }

    onApplyOutputToTable(cleanOutput, metricStr, targetRowNo);

    // Tampilkan notifikasi umpan balik
    setCopyFeedback(`Output disalin ke Baris #${targetRowNo}!`);
    setTimeout(() => {
      setCopyFeedback(null);
    }, 2800);
  };

  // Salin Output ke Clipboard
  const handleCopyClipboard = () => {
    const text = Array.isArray(output) ? output.join("\n") : String(output || "");
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopyFeedback("Tersalin ke Clipboard!");
      setTimeout(() => setCopyFeedback(null), 2000);
    }
  };

  // Syntax Highlighting Prism (Sesuai Aturan: Dilarang membungkus span/div kustom)
  const highlightCode = (codeStr: string) => {
    const grammar =
      language === "python" ? Prism.languages.python : Prism.languages.javascript;
    if (!grammar) return codeStr;
    return Prism.highlight(codeStr, grammar, language);
  };

  // Hitung Baris untuk Gutter
  const codeLines = currentCode.split("\n");

  // Deteksi Galat pada Output untuk Penanda Visual
  const outputString = Array.isArray(output) ? output.join("\n") : String(output || "");
  const hasError =
    outputString.includes("Error:") ||
    outputString.includes("Traceback") ||
    outputString.includes("Exception");

  return (
    <div
      id="praktikum-workbench-container"
      className={`print:hidden transition-all duration-200 ${
        isMaximized
          ? "fixed inset-0 z-50 p-4 sm:p-6 bg-slate-950/95 backdrop-blur flex flex-col"
          : "rounded-2xl border border-cyan-500/40 bg-slate-950 shadow-xl overflow-hidden my-6 scroll-mt-24"
      }`}
    >
      {/* ── Toolbar Header Workbench ──────────────────────────── */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Sisi Kiri: Judul & Tab Bahasa */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-slate-100 flex items-center gap-1.5">
                  Workbench Laboratorium Empiris
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                  Live Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block">
                Uji logika, ukur waktu eksekusi, dan salin hasil ke Tabel Pengamatan
              </p>
            </div>
          </div>

          {/* Toggle Bahasa */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold ml-2">
            <button
              type="button"
              onClick={() => setLanguage("python")}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                language === "python"
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>🐍</span>
              <span>Python</span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage("javascript")}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                language === "javascript"
                  ? "bg-amber-400 text-slate-950 font-bold shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>🌐</span>
              <span>JS</span>
            </button>
          </div>
        </div>

        {/* Sisi Kanan: Pemilih Skenario & Tombol Aksi Eksekusi */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Scenario Selector */}
          {codeSteps.length > 0 && (
            <div className="relative">
              <select
                value={activeScenarioNo ?? ""}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  const found = codeSteps.find((s) => s.no === val);
                  if (found) handleLoadScenario(found);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold focus:outline-none focus:border-cyan-400 cursor-pointer max-w-[190px] sm:max-w-[240px] truncate"
              >
                <option value="" disabled>
                  🧪 Pilih Skenario Uji...
                </option>
                {codeSteps.map((step) => (
                  <option key={step.no} value={step.no}>
                    #{step.no}: {step.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Tombol Reset */}
          <button
            type="button"
            onClick={handleResetCode}
            title="Kembalikan kode ke template awal"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Tombol Maximize / Focus Mode */}
          <button
            type="button"
            onClick={() => setIsMaximized(!isMaximized)}
            title={isMaximized ? "Perkecil (Minimize)" : "Layar Penuh (Maximize)"}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700 cursor-pointer"
          >
            {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Tombol RUN Utama */}
          <button
            type="button"
            onClick={handleExecute}
            disabled={isLoading}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Mengeksekusi...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>Jalankan (Ctrl+Enter)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Konten Utama 2-Kolom (Editor di Kiri, Terminal di Kanan) ── */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 ${
          isMaximized ? "flex-1 overflow-hidden" : ""
        }`}
      >
        {/* ── PANEL KIRI: Code Editor (7 Kolom Desktop) ────────── */}
        <div className="lg:col-span-7 flex flex-col bg-[#0b0f17] min-h-[300px]">
          {/* Sub-header Editor */}
          <div className="px-3.5 py-1.5 bg-[#121824] border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold text-slate-300">
                {language === "python" ? "script.py" : "script.js"}
              </span>
              {activeScenarioNo && (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Skenario #{activeScenarioNo}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span>{codeLines.length} baris</span>
              <span className="hidden sm:inline text-slate-500">|</span>
              <span className="hidden sm:inline text-slate-500">
                Pintasan: <kbd className="px-1 rounded bg-slate-800 text-slate-300">Ctrl+Enter</kbd>
              </span>
            </div>
          </div>

          {/* Area Pengetikan Editor dengan Gutter Nomor Baris */}
          <div
            className="flex-1 flex overflow-auto max-h-[460px] lg:max-h-[500px]"
            onKeyDown={handleKeyDown}
          >
            {/* Gutter Nomor Baris (Sticky di Kiri) */}
            <div className="sticky left-0 bg-[#0b0f17] text-slate-400 font-mono text-xs leading-[22px] py-[10px] px-2.5 select-none text-right border-r border-slate-800/80 min-w-[42px] shrink-0 z-20">
              {codeLines.map((_, i) => (
                <div key={i} className="hover:text-slate-200">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* React Simple Code Editor Stabil (Non-Wrapping 1:1) */}
            <div className="flex-1 relative min-w-0">
              <Editor
                value={currentCode}
                onValueChange={setCurrentCode}
                highlight={highlightCode}
                padding={10}
                className="code-editor-root font-mono text-xs leading-[22px]"
                style={{
                  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                  fontSize: 12.5,
                  lineHeight: "22px",
                  minHeight: "100%",
                  color: "#f8fafc",
                  background: "transparent",
                  whiteSpace: "pre"
                }}
              />
            </div>
          </div>

          {/* Footer Bar Editor */}
          <div className="px-3.5 py-1.5 bg-[#121824] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Engine: {language === "python" ? "Pyodide WASM v0.25" : "Native V8 JS"}
            </span>
            <span className="text-slate-400">
              Tekan <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">Run</kbd> untuk menguji
            </span>
          </div>
        </div>

        {/* ── PANEL KANAN: Terminal Output & Pengukuran (5 Kolom) ── */}
        <div className="lg:col-span-5 flex flex-col bg-[#0d1117] min-h-[300px]">
          {/* Sub-header Terminal */}
          <div className="px-3.5 py-1.5 bg-[#161b22] border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="font-semibold text-slate-300 ml-1">Terminal Konsol</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Badge Waktu Eksekusi */}
              {executionTime !== null && (
                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 font-mono font-bold border border-cyan-500/30">
                  <Clock className="w-3 h-3" />
                  {executionTime} ms
                </span>
              )}

              {/* Salin Output */}
              <button
                type="button"
                onClick={handleCopyClipboard}
                title="Salin teks keluaran terminal"
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>

              {/* Bersihkan Terminal */}
              <button
                type="button"
                onClick={handleClearTerminal}
                title="Bersihkan luaran konsol"
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Body Terminal */}
          <div className="flex-1 p-3.5 overflow-auto max-h-[360px] lg:max-h-[380px] font-mono text-xs leading-relaxed space-y-2">
            {isLoading ? (
              <div className="py-8 flex flex-col items-center justify-center text-cyan-400 gap-2">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-xs font-semibold">
                  Mengeksekusi di engine {language === "python" ? "Python (Pyodide)" : "JavaScript"}...
                </span>
              </div>
            ) : outputString ? (
              <div className="space-y-1">
                {hasError && (
                  <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-600/40 text-rose-300 text-xs mb-2 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Interupsi Galat Terdeteksi:</strong>
                      <p className="text-[11px] text-rose-200/90 mt-0.5">
                        Program menghentikan eksekusi atau melempar exception. Periksa pesan di bawah untuk analisis LKP Bagian D.
                      </p>
                    </div>
                  </div>
                )}
                {Array.isArray(output) ? (
                  output.map((line, idx) => (
                    <div
                      key={idx}
                      className={`whitespace-pre-wrap ${
                        line.includes("Error:") || line.includes("Traceback")
                          ? "text-rose-400 font-semibold"
                          : idx === 0
                          ? "text-cyan-300"
                          : "text-slate-200"
                      }`}
                    >
                      {idx === 0 && <span className="text-slate-500 mr-2 font-bold">&gt;&gt;&gt;</span>}
                      {idx > 0 && <span className="text-slate-600 mr-2 font-bold">...</span>}
                      {line}
                    </div>
                  ))
                ) : (
                  <div className="text-slate-200 whitespace-pre-wrap">{outputString}</div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs italic space-y-1">
                <p>&gt;&gt;&gt; Siap menerima eksekusi.</p>
                <p className="text-[11px] text-slate-400">
                  Klik tombol <strong>"Jalankan (Ctrl+Enter)"</strong> untuk melihat luaran program dan metrik mesin.
                </p>
              </div>
            )}
          </div>

          {/* ── State RAM Inspector Mini (Kesesuaian Tipe Data Empiris) ────────────────────────── */}
          {(Object.keys(variableDetails || {}).length > 0 || Object.keys(variables || {}).length > 0) && (
            <div className="px-3.5 py-2 bg-[#10141d] border-t border-slate-800/80 text-[11px]">
              <div className="flex items-center justify-between text-slate-400 font-mono mb-1.5 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" />
                  <span>State Variabel di RAM:</span>
                </span>
                <span className="text-[10px] text-slate-400">
                  {language === "python" ? "PyObject Type & Byte Size" : "V8 Type"}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                {Object.entries(variableDetails || {}).length > 0 ? (
                  Object.entries(variableDetails).map(([k, meta]) => {
                    const typeLower = (meta.type || "").toLowerCase();
                    const isInt = typeLower === "int";
                    const isFloat = typeLower === "float";
                    const isStr = typeLower === "str" || typeLower === "string";
                    const isBool = typeLower === "bool" || typeLower === "boolean";

                    return (
                      <span
                        key={k}
                        className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300 flex items-center gap-1.5 shadow-sm"
                      >
                        <span className="text-purple-400 font-bold">{k}:</span>
                        <span className="text-emerald-400 font-bold truncate max-w-[130px]">
                          {meta.repr || JSON.stringify(meta.val)}
                        </span>
                        <span
                          className={`text-[9.5px] px-1.5 py-0.2 rounded font-extrabold uppercase tracking-tight ${
                            isInt
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                              : isFloat
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                              : isStr
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : isBool
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                              : "bg-slate-800 text-slate-300 border border-slate-700"
                          }`}
                        >
                          {meta.type}
                        </span>
                        {meta.size !== undefined && meta.size !== null && (
                          <span className="text-[9px] text-amber-300 font-semibold">
                            {meta.size}B
                          </span>
                        )}
                      </span>
                    );
                  })
                ) : (
                  Object.entries(variables).map(([k, v]) => {
                    const isNum = typeof v === "number";
                    const isInt = isNum && Number.isInteger(v);
                    const isFloat = isNum && !Number.isInteger(v);

                    return (
                      <span
                        key={k}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300 flex items-center gap-1"
                      >
                        <span className="text-purple-400 font-bold">{k}:</span>
                        <span className="text-emerald-400 font-semibold truncate max-w-[140px]">
                          {JSON.stringify(v)}
                        </span>
                        <span
                          className={`text-[9.5px] px-1 rounded font-bold uppercase ${
                            isInt
                              ? "bg-amber-500/20 text-amber-300"
                              : isFloat
                              ? "bg-cyan-500/20 text-cyan-300"
                              : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          {isNum ? (isInt ? "int" : "float") : Array.isArray(v) ? "list" : typeof v}
                        </span>
                      </span>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* ── Toolbar Salin ke Baris Tabel ─────────────────────── */}
          <div className="p-3 bg-[#161b22] border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300 font-medium">Tujuan Baris:</span>
              <select
                value={targetRowNo}
                onChange={(e) => setTargetRowNo(parseInt(e.target.value, 10))}
                className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-cyan-300 focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                {Array.from({ length: totalRows }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    Baris #{num}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              {copyFeedback && (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 animate-pulse">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {copyFeedback}
                </span>
              )}
              <button
                type="button"
                onClick={handleApplyToTable}
                disabled={!outputString}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer disabled:cursor-not-allowed"
                title="Salin hasil aktual dan metrik ke baris tabel terpilih"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Salin ke Tabel #{targetRowNo}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
