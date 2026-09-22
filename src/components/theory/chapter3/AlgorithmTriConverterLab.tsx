"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  GitCommit, 
  Code2, 
  Sparkles, 
  RefreshCw, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  HelpCircle,
  Zap,
  Layers,
  Wand2,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Info,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Edit3
} from 'lucide-react';

interface FlowStep {
  id: string;
  type: 'input' | 'calc' | 'assign' | 'output';
  varName: string;
  expr?: string;
  outputArgs?: string;
}

interface ParsedStep {
  originalLine: string;
  lineNumber: number;
  type: 'input' | 'calc' | 'assign' | 'output' | 'unknown';
  varName: string;
  expr?: string;
  outputArgs?: string;
  error?: string;
}

interface LintIssue {
  id: string;
  type: 'error' | 'warning' | 'tip';
  title: string;
  message: string;
  ruleReference: string;
  fixSuggestion?: string;
}

const PRESETS = [
  {
    id: 'persegi_panjang',
    name: 'Hitung Luas Persegi Panjang',
    programName: 'HitungLuas',
    naratif: `1. Masukkan nilai panjang.
2. Masukkan nilai lebar.
3. Hitung nilai luas
   luas = panjang * lebar
4. Tampilkan hasil luas ke layar.`,
    pseudocode: `PROGRAM HitungLuas
// Menghitung luas persegi panjang

KAMUS:
  panjang, lebar : float
  luas : float

ALGORITMA:
  input(panjang)
  input(lebar)
  luas = panjang * lebar
  output(luas)`,
    steps: [
      { id: '1', type: 'input' as const, varName: 'panjang' },
      { id: '2', type: 'input' as const, varName: 'lebar' },
      { id: '3', type: 'calc' as const, varName: 'luas', expr: 'panjang * lebar' },
      { id: '4', type: 'output' as const, varName: 'output', outputArgs: 'luas' }
    ]
  },
  {
    id: 'konversi_suhu',
    name: 'Konversi Suhu Celcius ke Fahrenheit',
    programName: 'KonversiSuhu',
    naratif: `1. Masukkan nilai celcius.
2. Hitung nilai fahrenheit
   fahrenheit = (9/5 * celcius) + 32
3. Tampilkan hasil "Suhu Fahrenheit:", fahrenheit ke layar.`,
    pseudocode: `PROGRAM KonversiSuhu
// Konversi suhu Celcius ke Fahrenheit

KAMUS:
  celcius, fahrenheit : float

ALGORITMA:
  input(celcius)
  fahrenheit = (9/5 * celcius) + 32
  output("Suhu Fahrenheit:", fahrenheit)`,
    steps: [
      { id: '1', type: 'input' as const, varName: 'celcius' },
      { id: '2', type: 'calc' as const, varName: 'fahrenheit', expr: '(9/5 * celcius) + 32' },
      { id: '3', type: 'output' as const, varName: 'output', outputArgs: '"Suhu Fahrenheit:", fahrenheit' }
    ]
  },
  {
    id: 'luas_segitiga',
    name: 'Hitung Luas Segitiga',
    programName: 'HitungSegitiga',
    naratif: `1. Masukkan nilai alas.
2. Masukkan nilai tinggi.
3. Hitung nilai luas
   luas = 0.5 * alas * tinggi
4. Tampilkan hasil luas ke layar.`,
    pseudocode: `PROGRAM HitungSegitiga
// Menghitung luas segitiga

KAMUS:
  alas, tinggi, luas : float

ALGORITMA:
  input(alas)
  input(tinggi)
  luas = 0.5 * alas * tinggi
  output(luas)`,
    steps: [
      { id: '1', type: 'input' as const, varName: 'alas' },
      { id: '2', type: 'input' as const, varName: 'tinggi' },
      { id: '3', type: 'calc' as const, varName: 'luas', expr: '0.5 * alas * tinggi' },
      { id: '4', type: 'output' as const, varName: 'output', outputArgs: 'luas' }
    ]
  },
  {
    id: 'contoh_keliru',
    name: 'Contoh Penulisan Keliru (Tes Linter)',
    programName: 'ContohKeliru',
    naratif: `panjang adalah 10
lebar adalah 5
L = panjang dikali lebar
print L ke layar`,
    pseudocode: `DEKLARASI:
  P, L : data
MULAI
  READ(P)
  READ(L)
  luas <- P * L
  WRITE(luas)
SELESAI`,
    steps: [
      { id: '1', type: 'input' as const, varName: 'P' },
      { id: '2', type: 'input' as const, varName: 'L' },
      { id: '3', type: 'calc' as const, varName: 'luas', expr: 'P * L' },
      { id: '4', type: 'output' as const, varName: 'output', outputArgs: 'luas' }
    ]
  }
];

export default function AlgorithmTriConverterLab() {
  const [sourceMode, setSourceMode] = useState<'naratif' | 'flowchart' | 'pseudocode'>('naratif');
  const [selectedPresetId, setSelectedPresetId] = useState('persegi_panjang');
  const [isMaximized, setIsMaximized] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Active editable text states
  const [naratifInput, setNaratifInput] = useState(PRESETS[0].naratif);
  const [pseudoInput, setPseudoInput] = useState(PRESETS[0].pseudocode);
  const [customFlowSteps, setCustomFlowSteps] = useState<FlowStep[]>(PRESETS[0].steps);
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key to exit fullscreen & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMaximized) {
        setIsMaximized(false);
      }
    };

    if (isMaximized) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMaximized]);

  // Handle Preset selection
  const handleSelectPreset = (id: string) => {
    setSelectedPresetId(id);
    const p = PRESETS.find(c => c.id === id) || PRESETS[0];
    setNaratifInput(p.naratif);
    setPseudoInput(p.pseudocode);
    setCustomFlowSteps(p.steps);
  };

  // =========================================================================
  // DATA-FLOW / UNDEFINED VARIABLE TRACKER (Kaidah Alur Nilai Data)
  // =========================================================================
  const checkDataFlowIssues = (
    stepsList: { type: string; varName?: string; expr?: string; outputArgs?: string; lineNumber?: number }[],
    modeLabel?: string
  ): LintIssue[] => {
    const issues: LintIssue[] = [];
    const definedVars = new Set<string>();

    stepsList.forEach((step, idx) => {
      const stepNum = step.lineNumber || (idx + 1);

      if (step.type === 'input') {
        if (step.varName && step.varName.trim() && step.varName !== 'unknown') {
          definedVars.add(step.varName.trim().toLowerCase());
        }
      } else if (step.type === 'calc' || step.type === 'assign') {
        // Check variables used in expression (RHS)
        if (step.expr) {
          const tokens = step.expr.match(/[a-zA-Z_][a-zA-Z0-9_]*/g) || [];
          const ignoredTokens = new Set(['math', 'sqrt', 'sin', 'cos', 'pi', 'pow', 'abs', 'true', 'false', 'and', 'or', 'not', 'div', 'mod', 'int', 'float']);
          
          tokens.forEach(tok => {
            const lowerTok = tok.toLowerCase();
            if (!ignoredTokens.has(lowerTok) && !definedVars.has(lowerTok)) {
              issues.push({
                id: `undef_${lowerTok}_${stepNum}`,
                type: 'error',
                title: `Variabel "${tok}" Digunakan Tanpa Nilai (Undefined Variable)`,
                message: `Pada langkah #${stepNum}, variabel "${tok}" digunakan dalam rumus "${step.varName} = ${step.expr}", namun variabel "${tok}" belum pernah diinput atau ditetapkan nilainya pada langkah sebelumnya.`,
                ruleReference: 'Kaidah Alur Data Algoritma: Inisialisasi Nilai',
                fixSuggestion: `Tambahkan langkah "input(${tok})" sebelum langkah perhitungan ini.`
              });
            }
          });
        }

        // Add the LHS (target variable) to defined variables
        if (step.varName && step.varName.trim() && step.varName !== 'unknown') {
          definedVars.add(step.varName.trim().toLowerCase());
        }
      } else if (step.type === 'output') {
        if (step.outputArgs) {
          // Remove string literals in quotes
          const cleanArgs = step.outputArgs.replace(/"[^"]*"/g, '').replace(/'[^']*'/g, '');
          const tokens = cleanArgs.match(/[a-zA-Z_][a-zA-Z0-9_]*/g) || [];
          const ignoredTokens = new Set(['true', 'false']);

          tokens.forEach(tok => {
            const lowerTok = tok.toLowerCase();
            if (!ignoredTokens.has(lowerTok) && !definedVars.has(lowerTok)) {
              issues.push({
                id: `undef_out_${lowerTok}_${stepNum}`,
                type: 'warning',
                title: `Variabel "${tok}" Ditampilkan Tanpa Nilai`,
                message: `Variabel "${tok}" dicetak ke layar pada langkah #${stepNum}, padahal belum pernah diinput atau dihitung sebelumnya.`,
                ruleReference: 'Kaidah Output Algoritma: Nilai Harus Ada',
                fixSuggestion: `Pastikan variabel "${tok}" sudah dihitung atau diinput sebelum ditampilkan.`
              });
            }
          });
        }
      }
    });

    return issues;
  };

  // =========================================================================
  // 1. REAL-TIME PARSER ENGINE (NARATIF -> STEPS -> PSEUDOCODE & FLOWCHART)
  // =========================================================================
  const { parsedStepsFromNaratif, generatedPseudoFromNaratif, naratifLintIssues } = useMemo(() => {
    const lines = naratifInput.split('\n').map(l => l.trimEnd());
    const steps: ParsedStep[] = [];
    let issues: LintIssue[] = [];
    const variablesSet = new Set<string>();

    let stepCounter = 1;
    let i = 0;

    while (i < lines.length) {
      const line = lines[i].trim();
      const rawLine = lines[i];
      const lineNum = i + 1;

      if (!line) {
        i++;
        continue;
      }

      // Check if it starts with number (e.g., "1.", "2.")
      const numMatch = line.match(/^(\d+)\.\s*(.*)$/);
      const isIndentedFormula = rawLine.startsWith('   ') || rawLine.startsWith('\t');

      if (!numMatch && !isIndentedFormula) {
        issues.push({
          id: `num_${lineNum}`,
          type: 'warning',
          title: `Langkah Baris ${lineNum} Tidak Bernomor`,
          message: `Langkah utama "${line}" harus diawali dengan nomor urut seperti "${stepCounter}. ${line}".`,
          ruleReference: 'Aturan 1 Naratif: Penomoran Urut Baku',
          fixSuggestion: `Awali baris dengan "${stepCounter}. "`
        });
      }

      const text = numMatch ? numMatch[2].trim() : line;

      // 1. INPUT DETECTION: "Masukkan nilai X" / "Input X" / "Baca X"
      const inputMatch = text.match(/^(?:masukkan|input|baca)\s+(?:nilai\s+)?([a-zA-Z_][a-zA-Z0-9_]*)/i);
      if (inputMatch) {
        const varName = inputMatch[1].toLowerCase();
        variablesSet.add(varName);
        steps.push({
          originalLine: line,
          lineNumber: lineNum,
          type: 'input',
          varName: varName
        });
        stepCounter++;
        i++;
        continue;
      }

      // 2. CALC DETECTION: "Hitung nilai X" followed by "X = formula"
      const hitungMatch = text.match(/^hitung\s+(?:nilai\s+)?([a-zA-Z_][a-zA-Z0-9_]*)(?:\s*[:=]\s*(.+))?/i);
      if (hitungMatch) {
        const varName = hitungMatch[1].toLowerCase();
        variablesSet.add(varName);
        let expr = hitungMatch[2] ? hitungMatch[2].trim() : '';

        // Check if next line has the formula (Bab 3 indented style)
        if (!expr && i + 1 < lines.length) {
          const nextRaw = lines[i + 1];
          const nextLine = nextRaw.trim();
          if (nextLine.includes('=')) {
            const parts = nextLine.split('=');
            expr = parts.slice(1).join('=').trim();
            i++; // skip next line as it was consumed as formula
          }
        }

        if (!expr) {
          expr = `${varName}_ekspresi`;
          issues.push({
            id: `calc_expr_${lineNum}`,
            type: 'warning',
            title: `Rumus Perhitungan Baris ${lineNum} Belum Lengkap`,
            message: `Langkah perhitungan untuk "${varName}" belum menyertakan rumus pada baris baru di bawahnya.`,
            ruleReference: 'Aturan Format Bab 3: Persamaan pada Baris Baru',
            fixSuggestion: `Tambahkan "${varName} = [rumus]" pada baris baru di bawahnya.`
          });
        }

        steps.push({
          originalLine: line,
          lineNumber: lineNum,
          type: 'calc',
          varName: varName,
          expr: expr
        });
        stepCounter++;
        i++;
        continue;
      }

      // 3. ASSIGN DETECTION: "Tetapkan nilai X = Y" / "Tentukan nilai X sebesar Y"
      const assignMatch = text.match(/^(?:tetapkan|tentukan)\s+(?:nilai\s+)?([a-zA-Z_][a-zA-Z0-9_]*)\s*(?:sebesar|=|menjadi)\s*(.+)/i);
      if (assignMatch) {
        const varName = assignMatch[1].toLowerCase();
        const expr = assignMatch[2].trim().replace(/\.$/, '');
        variablesSet.add(varName);
        steps.push({
          originalLine: line,
          lineNumber: lineNum,
          type: 'assign',
          varName: varName,
          expr: expr
        });
        stepCounter++;
        i++;
        continue;
      }

      // 4. OUTPUT DETECTION: "Tampilkan hasil X ke layar" / "Cetak X" / "Output X"
      const outputMatch = text.match(/^(?:tampilkan|cetak|print|tulis|output)\s+(?:hasil\s+)?(.+?)(?:\s+ke\s+layar)?\.?$/i);
      if (outputMatch) {
        const args = outputMatch[1].trim();
        steps.push({
          originalLine: line,
          lineNumber: lineNum,
          type: 'output',
          varName: 'output',
          outputArgs: args
        });
        stepCounter++;
        i++;
        continue;
      }

      // 5. UNKNOWN / AMBIGUOUS LINE
      issues.push({
        id: `unknown_${lineNum}`,
        type: 'error',
        title: `Instruksi Baris ${lineNum} Ambigu / Tidak Dikenali`,
        message: `Kalimat "${line}" tidak menggunakan kata perintah baku algoritma deskriptif.`,
        ruleReference: 'Aturan 2 Naratif: Bebas Ambiguitas & Kata Imperatif',
        fixSuggestion: 'Gunakan kata kerja tegas seperti "Masukkan", "Hitung", "Tetapkan", atau "Tampilkan".'
      });

      steps.push({
        originalLine: line,
        lineNumber: lineNum,
        type: 'unknown',
        varName: 'unknown',
        error: line
      });

      stepCounter++;
      i++;
    }

    // Check for single letter variables in naratif (e.g. P, L, T)
    if (/\b(P|L|T|A|B|X|Y)\b/i.test(naratifInput)) {
      issues.push({
        id: 'naratif_single_var',
        type: 'tip',
        title: 'Hindari Variabel Singkatan 1 Huruf',
        message: 'Gunakan nama variabel deskriptif yang jelas seperti "panjang", "lebar", "tinggi", bukan singkatan seperti "P", "L".',
        ruleReference: 'Prinsip 2 Bab 3: Clean Variable Names'
      });
    }

    // Data-Flow undefined variable check
    const dataFlowIssues = checkDataFlowIssues(steps, 'naratif');
    issues = [...issues, ...dataFlowIssues];

    // Auto-generate Pseudocode from parsed naratif steps
    const varList = Array.from(variablesSet);
    const kamusText = varList.length > 0 
      ? `  ${varList.join(', ')} : float`
      : '  variabel_program : float';

    const algoLines = steps.map(s => {
      if (s.type === 'input') return `  input(${s.varName})`;
      if (s.type === 'calc') return `  ${s.varName} = ${s.expr}`;
      if (s.type === 'assign') return `  ${s.varName} = ${s.expr}`;
      if (s.type === 'output') return `  output(${s.outputArgs})`;
      return `  // ${s.originalLine}`;
    });

    const generatedPseudo = `PROGRAM ${PRESETS.find(p => p.id === selectedPresetId)?.programName || 'ProgramAlgoritma'}
// Algoritma hasil konversi otomatis dari Naratif

KAMUS:
${kamusText}

ALGORITMA:
${algoLines.length > 0 ? algoLines.join('\n') : '  // Belum ada langkah algoritma'}`;

    return {
      parsedStepsFromNaratif: steps,
      generatedPseudoFromNaratif: generatedPseudo,
      naratifLintIssues: issues
    };
  }, [naratifInput, selectedPresetId]);

  // =========================================================================
  // 2. REAL-TIME PARSER ENGINE (PSEUDOCODE -> STEPS -> NARATIF & FLOWCHART)
  // =========================================================================
  const { parsedStepsFromPseudo, generatedNaratifFromPseudo, pseudoLintIssues } = useMemo(() => {
    const lines = pseudoInput.split('\n').map(l => l.trim());
    let issues: LintIssue[] = [];
    const steps: ParsedStep[] = [];

    // Rule 1: Struktur 3 Blok Baku
    const hasProgram = pseudoInput.includes('PROGRAM');
    const hasKamus = pseudoInput.includes('KAMUS:');
    const hasAlgoritma = pseudoInput.includes('ALGORITMA:');

    if (!hasProgram || !hasKamus || !hasAlgoritma) {
      issues.push({
        id: 'pseudo_3_blocks',
        type: 'error',
        title: 'Struktur 3 Blok Baku Belum Lengkap',
        message: 'Pseudocode wajib memuat 3 blok terpisah secara urut: PROGRAM, KAMUS:, dan ALGORITMA:.',
        ruleReference: 'Prinsip 1 Bab 3: Struktur 3 Blok Baku',
        fixSuggestion: 'Tambahkan blok PROGRAM Nama, KAMUS:, dan ALGORITMA:.'
      });
    }

    // Rule 2: Operator Penugasan Modern (=) vs Panah Kuno (<-)
    if (pseudoInput.includes('<-') || pseudoInput.includes('←') || pseudoInput.includes(':=')) {
      issues.push({
        id: 'pseudo_arrow_assignment',
        type: 'error',
        title: 'Penggunaan Operator Penugasan Kuno',
        message: 'Sesuai standar modern Bab 3, gunakan operator "=" agar selaras dengan Python & JS (gantikan panah "<-" atau "←").',
        ruleReference: 'Prinsip 3 Bab 3: Operator Penugasan Modern (=)',
        fixSuggestion: 'Ganti tanda "<-" atau "←" dengan "="'
      });
    }

    // Rule 3: Universal I/O vs READ/WRITE
    if (/READ\s*\(|WRITE\s*\(|BACA\s*\(|TULIS\s*\(/i.test(pseudoInput)) {
      issues.push({
        id: 'pseudo_io_caps',
        type: 'warning',
        title: 'Gunakan Instruksi I/O Universal',
        message: 'Gunakan input(...) dan output(...) berhuruf kecil yang universal.',
        ruleReference: 'Prinsip 4 Bab 3: Universal I/O Instruksi',
        fixSuggestion: 'Ganti READ() dengan input() dan WRITE() dengan output().'
      });
    }

    // Rule 4: Single letter variable names
    if (/\b(P|L|T|A|B)\s*:/i.test(pseudoInput) || /input\(\s*[P|L|T]\s*\)/.test(pseudoInput)) {
      issues.push({
        id: 'pseudo_single_var',
        type: 'tip',
        title: 'Nama Variabel Wajib Deskriptif',
        message: 'Hindari variabel 1 huruf di Kamus. Gunakan "panjang, lebar : float" bukan "P, L : float".',
        ruleReference: 'Prinsip 2 Bab 3: Clean Variable Names'
      });
    }

    // Parse instructions inside ALGORITMA
    let inAlgoritma = false;
    let stepCount = 1;
    const naratifLines: string[] = [];

    lines.forEach((line, idx) => {
      if (line.startsWith('ALGORITMA:')) {
        inAlgoritma = true;
        return;
      }
      if (!inAlgoritma || !line || line.startsWith('//') || line.startsWith('#')) return;

      const norm = line.replace(/;/g, '').trim();

      // Input
      const inMatch = norm.match(/^(?:input|read|baca)\s*\((.+?)\)/i);
      if (inMatch) {
        const varName = inMatch[1].trim();
        steps.push({ originalLine: line, lineNumber: idx + 1, type: 'input', varName });
        naratifLines.push(`${stepCount}. Masukkan nilai ${varName}.`);
        stepCount++;
        return;
      }

      // Output
      const outMatch = norm.match(/^(?:output|write|print|tulis)\s*\((.+?)\)/i);
      if (outMatch) {
        const args = outMatch[1].trim();
        steps.push({ originalLine: line, lineNumber: idx + 1, type: 'output', varName: 'output', outputArgs: args });
        naratifLines.push(`${stepCount}. Tampilkan hasil ${args} ke layar.`);
        stepCount++;
        return;
      }

      // Assignment / Math
      if (norm.includes('=') || norm.includes('<-') || norm.includes('←')) {
        const separator = norm.includes('=') ? '=' : (norm.includes('<-') ? '<-' : '←');
        const parts = norm.split(separator);
        const left = parts[0].trim();
        const right = parts.slice(1).join(separator).trim();

        const isMath = isNaN(Number(right)) && (right.includes('*') || right.includes('/') || right.includes('+') || right.includes('-') || right.includes('%'));

        if (isMath) {
          steps.push({ originalLine: line, lineNumber: idx + 1, type: 'calc', varName: left, expr: right });
          naratifLines.push(`${stepCount}. Hitung nilai ${left}\n   ${left} = ${right}`);
        } else {
          steps.push({ originalLine: line, lineNumber: idx + 1, type: 'assign', varName: left, expr: right });
          naratifLines.push(`${stepCount}. Tentukan nilai ${left} sebesar ${right}.`);
        }
        stepCount++;
        return;
      }
    });

    // Data-Flow undefined variable check
    const dataFlowIssues = checkDataFlowIssues(steps, 'pseudocode');
    issues = [...issues, ...dataFlowIssues];

    const generatedNaratif = naratifLines.length > 0 
      ? naratifLines.join('\n') 
      : '1. (Algoritma belum memiliki baris instruksi)';

    return {
      parsedStepsFromPseudo: steps,
      generatedNaratifFromPseudo: generatedNaratif,
      pseudoLintIssues: issues
    };
  }, [pseudoInput]);

  // =========================================================================
  // 3. REAL-TIME GENERATORS (FLOWCHART -> NARATIF & PSEUDOCODE)
  // =========================================================================
  const { generatedNaratifFromFlow, generatedPseudoFromFlow, flowchartLintIssues } = useMemo(() => {
    let issues: LintIssue[] = [];
    const naratifLines: string[] = [];
    const algoLines: string[] = [];
    const variablesSet = new Set<string>();

    if (customFlowSteps.length === 0) {
      issues.push({
        id: 'flow_empty',
        type: 'warning',
        title: 'Flowchart Kosong',
        message: 'Flowchart belum memiliki langkah apapun di antara START dan STOP.',
        ruleReference: 'Struktur Alur Flowchart',
        fixSuggestion: 'Tambahkan node Input, Proses/Hitung, atau Output menggunakan tombol di bawah.'
      });
    }

    customFlowSteps.forEach((step, idx) => {
      const num = idx + 1;
      if (step.type === 'input') {
        if (!step.varName) {
          issues.push({
            id: `flow_empty_input_${idx}`,
            type: 'error',
            title: `Node #${num}: Variabel Input Kosong`,
            message: `Node input ke-${num} belum memiliki nama variabel.`,
            ruleReference: 'Simbol Jajar Genjang I/O',
            fixSuggestion: 'Ketikkan nama variabel (contoh: panjang).'
          });
        }
        variablesSet.add(step.varName || 'var_input');
        naratifLines.push(`${num}. Masukkan nilai ${step.varName || '...'}.`);
        algoLines.push(`  input(${step.varName || '...'})`);
      } else if (step.type === 'calc') {
        if (!step.varName || !step.expr) {
          issues.push({
            id: `flow_empty_calc_${idx}`,
            type: 'error',
            title: `Node #${num}: Perhitungan Belum Lengkap`,
            message: `Node proses/hitung ke-${num} harus memiliki variabel hasil dan rumus ekspresi.`,
            ruleReference: 'Simbol Persegi Panjang Proses',
            fixSuggestion: 'Lengkapi variabel dan rumus (contoh: luas = panjang * lebar).'
          });
        }
        variablesSet.add(step.varName || 'var_hasil');
        naratifLines.push(`${num}. Hitung nilai ${step.varName || '...'}\n   ${step.varName || '...'} = ${step.expr || '...'}`);
        algoLines.push(`  ${step.varName || '...'} = ${step.expr || '...'}`);
      } else if (step.type === 'assign') {
        variablesSet.add(step.varName || 'var');
        naratifLines.push(`${num}. Tentukan nilai ${step.varName || '...'} sebesar ${step.expr || '...'}.`);
        algoLines.push(`  ${step.varName || '...'} = ${step.expr || '...'}`);
      } else if (step.type === 'output') {
        naratifLines.push(`${num}. Tampilkan hasil ${step.outputArgs || '...'} ke layar.`);
        algoLines.push(`  output(${step.outputArgs || '...'})`);
      }
    });

    // Check single letter variables in flowchart
    customFlowSteps.forEach((step, idx) => {
      const num = idx + 1;
      if (step.varName && /^[a-zA-Z]$/.test(step.varName)) {
        issues.push({
          id: `flow_single_var_${idx}`,
          type: 'tip',
          title: `Node #${num}: Hindari Variabel 1 Huruf "${step.varName}"`,
          message: `Gunakan nama variabel yang deskriptif (contoh: "${step.varName === 'P' ? 'panjang' : (step.varName === 'L' ? 'lebar' : 'variabel_deskriptif')}").`,
          ruleReference: 'Prinsip 2 Bab 3: Clean Variable Names'
        });
      }
    });

    // Data-Flow undefined variable check on customFlowSteps
    const dataFlowIssues = checkDataFlowIssues(customFlowSteps, 'flowchart');
    issues = [...issues, ...dataFlowIssues];

    const varList = Array.from(variablesSet);
    const kamusText = varList.length > 0 
      ? `  ${varList.join(', ')} : float`
      : '  variabel_program : float';

    const generatedNaratif = naratifLines.length > 0 ? naratifLines.join('\n') : '1. (Belum ada langkah flowchart)';
    const generatedPseudo = `PROGRAM ${PRESETS.find(p => p.id === selectedPresetId)?.programName || 'ProgramAlgoritma'}
// Algoritma hasil visualisasi Flowchart

KAMUS:
${kamusText}

ALGORITMA:
${algoLines.length > 0 ? algoLines.join('\n') : '  // Belum ada instruksi'}`;

    return {
      generatedNaratifFromFlow: generatedNaratif,
      generatedPseudoFromFlow: generatedPseudo,
      flowchartLintIssues: issues
    };
  }, [customFlowSteps, selectedPresetId]);

  // Active steps based on which mode is the source
  const activeSteps: ParsedStep[] = useMemo(() => {
    if (sourceMode === 'naratif') return parsedStepsFromNaratif;
    if (sourceMode === 'pseudocode') return parsedStepsFromPseudo;
    return customFlowSteps.map((s, idx) => ({
      originalLine: `Step ${idx + 1}`,
      lineNumber: idx + 1,
      type: s.type,
      varName: s.varName,
      expr: s.expr,
      outputArgs: s.outputArgs
    }));
  }, [sourceMode, parsedStepsFromNaratif, parsedStepsFromPseudo, customFlowSteps]);

  // Active lint issues based on source
  const activeLintIssues = useMemo(() => {
    if (sourceMode === 'naratif') return naratifLintIssues;
    if (sourceMode === 'pseudocode') return pseudoLintIssues;
    return flowchartLintIssues;
  }, [sourceMode, naratifLintIssues, pseudoLintIssues, flowchartLintIssues]);

  // Active rendered texts
  const activeNaratif = useMemo(() => {
    if (sourceMode === 'naratif') return naratifInput;
    if (sourceMode === 'pseudocode') return generatedNaratifFromPseudo;
    return generatedNaratifFromFlow;
  }, [sourceMode, naratifInput, generatedNaratifFromPseudo, generatedNaratifFromFlow]);

  const activePseudo = useMemo(() => {
    if (sourceMode === 'pseudocode') return pseudoInput;
    if (sourceMode === 'naratif') return generatedPseudoFromNaratif;
    return generatedPseudoFromFlow;
  }, [sourceMode, pseudoInput, generatedPseudoFromNaratif, generatedPseudoFromFlow]);

  // Flowchart Node Modifiers (When in Mode 3)
  const addFlowStep = (type: 'input' | 'calc' | 'output') => {
    const newId = Date.now().toString();
    if (type === 'input') {
      setCustomFlowSteps([...customFlowSteps, { id: newId, type: 'input', varName: 'nilai_baru' }]);
    } else if (type === 'calc') {
      setCustomFlowSteps([...customFlowSteps, { id: newId, type: 'calc', varName: 'hasil', expr: 'a + b' }]);
    } else {
      setCustomFlowSteps([...customFlowSteps, { id: newId, type: 'output', varName: 'output', outputArgs: 'hasil' }]);
    }
  };

  const updateFlowStep = (index: number, field: string, value: string) => {
    const updated = [...customFlowSteps];
    updated[index] = { ...updated[index], [field]: value };
    setCustomFlowSteps(updated);
  };

  const deleteFlowStep = (index: number) => {
    setCustomFlowSteps(customFlowSteps.filter((_, i) => i !== index));
  };

  const moveFlowStep = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === customFlowSteps.length - 1)) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...customFlowSteps];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setCustomFlowSteps(updated);
  };

  const copyToClipboard = (text: string, tabId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabId);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  // =========================================================================
  // 4. MAIN COMPONENT JSX
  // =========================================================================
  const mainContentJSX = (
    <div className={`transition-all duration-300 ${
      isMaximized 
        ? 'fixed top-0 left-0 right-0 bottom-0 inset-0 z-[99999] p-4 md:p-6 bg-slate-950/98 backdrop-blur-2xl flex flex-col justify-between w-screen h-screen overflow-y-auto text-slate-100 font-sans' 
        : 'border border-border/60 rounded-3xl overflow-visible bg-slate-950 shadow-2xl space-y-0 text-slate-100'
    }`}>
      
      {/* 1. Header Toolbar */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 rounded-t-3xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400 border border-amber-500/30">
            <Wand2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm md:text-base text-slate-100 flex items-center gap-2">
              Simulator Konversi Tri-Arah &amp; Validator Algoritma (Bab 3)
            </h3>
            <p className="text-[11px] text-slate-400">
              Ketik/edit salah satu dari 3 representasi (Naratif &harr; Flowchart &harr; Pseudocode) &rarr; Dua lainnya otomatis tersinkronisasi!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Preset Case Selector */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 px-2 font-mono hidden sm:inline-block">Preset:</span>
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedPresetId === p.id 
                    ? 'bg-amber-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {p.name.split(' ')[1] || p.name}
              </button>
            ))}
          </div>

          {/* Maximize Toggle Button */}
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            title={isMaximized ? "Perkecil (Tekan ESC untuk keluar)" : "Perbesar Layar Penuh (Maximize)"}
          >
            {isMaximized ? <Minimize2 className="w-4 h-4 text-amber-400" /> : <Maximize2 className="w-4 h-4 text-amber-400" />}
            <span className="text-xs font-mono hidden md:inline-block">
              {isMaximized ? 'Keluar Layar Penuh' : 'Layar Penuh'}
            </span>
          </button>
        </div>
      </div>

      {/* 2. Main Interactive Workspace */}
      <div className="p-4 md:p-6 space-y-6 overflow-visible">
        
        {/* Source Mode Toggle (Pilih dari mana Anda ingin mengetik/mengedit) */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Pilih Representasi Awal yang Ingin Anda Edit / Bangun:
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              💡 Klik salah satu mode di bawah untuk membuka editor aktif pada kolom tersebut
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setSourceMode('naratif')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                sourceMode === 'naratif' 
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/50 shadow-lg' 
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">Mode 1: Edit Naratif</div>
                  <div className="text-[10px] text-slate-400">Ketik teks deskriptif baku</div>
                </div>
              </div>
              {sourceMode === 'naratif' && (
                <span className="text-[9px] bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded font-extrabold">
                  AKTIF
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setSourceMode('flowchart');
                // Sync latest steps from naratif if coming from naratif
                if (sourceMode === 'naratif' && parsedStepsFromNaratif.length > 0) {
                  setCustomFlowSteps(parsedStepsFromNaratif.map((s, idx) => ({
                    id: idx.toString(),
                    type: s.type === 'unknown' ? 'input' : s.type,
                    varName: s.varName === 'unknown' ? 'x' : s.varName,
                    expr: s.expr,
                    outputArgs: s.outputArgs
                  })));
                }
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                sourceMode === 'flowchart' 
                  ? 'bg-blue-500/20 border-blue-500 text-blue-300 ring-2 ring-blue-500/50 shadow-lg' 
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <GitCommit className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-xs font-bold text-white">Mode 2: Edit Flowchart</div>
                  <div className="text-[10px] text-slate-400">Susun visual node alur diagram</div>
                </div>
              </div>
              {sourceMode === 'flowchart' && (
                <span className="text-[9px] bg-blue-500 text-white px-1.5 py-0.5 rounded font-extrabold">
                  AKTIF
                </span>
              )}
            </button>

            <button
              onClick={() => setSourceMode('pseudocode')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                sourceMode === 'pseudocode' 
                  ? 'bg-violet-500/20 border-violet-500 text-violet-300 ring-2 ring-violet-500/50 shadow-lg' 
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Code2 className="w-4 h-4 text-violet-400" />
                <div>
                  <div className="text-xs font-bold text-white">Mode 3: Edit Pseudocode</div>
                  <div className="text-[10px] text-slate-400">Ketik struktur 3 blok baku</div>
                </div>
              </div>
              {sourceMode === 'pseudocode' && (
                <span className="text-[9px] bg-violet-500 text-white px-1.5 py-0.5 rounded font-extrabold">
                  AKTIF
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 2. TOP PROMINENT VALIDATION STATUS BANNER */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-xl border ${activeLintIssues.length === 0 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'}`}>
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs md:text-sm text-slate-100 flex items-center gap-2">
                  <span>Status Kepatuhan Aturan Penulisan (Live Pedagogical Linter)</span>
                  <span className="text-[10px] text-slate-400 font-normal hidden sm:inline-block">
                    &bull; Otomatis mengevaluasi kesesuaian dengan Bab 3
                  </span>
                </h4>
              </div>
            </div>
            
            {activeLintIssues.length === 0 ? (
              <span className="text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full flex items-center gap-1.5 self-start sm:self-center shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                100% Sesuai Standar Bab 3
              </span>
            ) : (
              <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/50 px-3 py-1 rounded-full flex items-center gap-1.5 self-start sm:self-center shadow-sm animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Ditemukan {activeLintIssues.length} Catatan / Peringatan Aturan
              </span>
            )}
          </div>

          {activeLintIssues.length === 0 ? (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>
                <strong>Bagus sekali!</strong> Algoritma Anda telah mematuhi seluruh kaidah imperatif dan 4 prinsip baku Bab 3.
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
              {activeLintIssues.map((issue) => (
                <div 
                  key={issue.id}
                  className={`p-3 rounded-xl border text-xs flex flex-col justify-between gap-2 shadow-sm ${
                    issue.type === 'error'
                      ? 'bg-rose-950/50 border-rose-500/50 text-rose-200'
                      : issue.type === 'warning'
                      ? 'bg-amber-950/50 border-amber-500/50 text-amber-200'
                      : 'bg-blue-950/50 border-blue-500/50 text-blue-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <AlertTriangle className={`w-3.5 h-3.5 shrink-0 ${issue.type === 'error' ? 'text-rose-400' : 'text-amber-400'}`} />
                      <span>{issue.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-sans pl-5">
                      {issue.message}
                    </p>
                  </div>

                  {issue.fixSuggestion && (
                    <div className="text-[11px] font-mono bg-slate-950/80 px-2.5 py-1 rounded-lg border border-white/10 text-amber-300 mt-1 flex items-center gap-1.5">
                      <span>💡 <strong>Saran:</strong></span>
                      <span>{issue.fixSuggestion}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. 3-Column Tri-Directional Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* ========================================================================= */}
          {/* PANEL 1: ALGORITMA NARATIF                                                */}
          {/* ========================================================================= */}
          <div className={`rounded-3xl border transition-all flex flex-col justify-between overflow-hidden shadow-xl ${
            sourceMode === 'naratif' 
              ? 'bg-slate-900/95 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500' 
              : 'bg-card border-border/60 text-foreground'
          }`}>
            <div className={`p-4 border-b flex items-center justify-between ${
              sourceMode === 'naratif' ? 'bg-slate-950 border-slate-800' : 'bg-secondary/30 border-border/40'
            }`}>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-500" />
                <h4 className="font-extrabold text-sm text-emerald-500">1. Algoritma Naratif</h4>
              </div>
              
              <div className="flex items-center gap-1.5">
                {sourceMode === 'naratif' ? (
                  <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Editor Aktif ✍️
                  </span>
                ) : (
                  <span className="text-[9px] font-mono bg-secondary text-slate-700 dark:text-slate-300 font-semibold px-2 py-0.5 rounded-full border border-border/40">
                    Auto-Generated ⚡
                  </span>
                )}
                <button
                  onClick={() => copyToClipboard(activeNaratif, 'naratif')}
                  className="text-slate-600 dark:text-slate-400 hover:text-foreground p-1 cursor-pointer"
                  title="Salin Naratif"
                >
                  {copiedTab === 'naratif' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3 text-xs md:text-sm">
              {sourceMode === 'naratif' ? (
                <div className="space-y-2">
                  <textarea
                    value={naratifInput}
                    onChange={(e) => setNaratifInput(e.target.value)}
                    rows={10}
                    className={`w-full bg-slate-950 border rounded-2xl p-4 text-slate-100 font-mono text-xs leading-relaxed focus:outline-none focus:ring-1 transition-all shadow-inner ${
                      activeLintIssues.length > 0 ? 'border-amber-500/60 focus:border-amber-400 focus:ring-amber-400' : 'border-slate-800 focus:border-emerald-500 focus:ring-emerald-500'
                    }`}
                    placeholder="1. Masukkan nilai panjang.&#10;2. Masukkan nilai lebar.&#10;3. Hitung nilai luas&#10;   luas = panjang * lebar&#10;4. Tampilkan hasil luas ke layar."
                  />
                  
                  {activeLintIssues.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-amber-950/70 border border-amber-500/60 text-amber-200 text-xs flex items-start gap-2 shadow-inner">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="font-bold text-amber-300">Catatan Baris: </span>
                        <span>{activeLintIssues[0].message}</span>
                        {activeLintIssues[0].fixSuggestion && (
                          <div className="text-[11px] font-mono text-amber-400 font-semibold mt-0.5">
                            👉 {activeLintIssues[0].fixSuggestion}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono px-1">
                    <span>{naratifInput.split('\n').filter(l => l.trim()).length} Baris Langkah</span>
                    <span className="text-emerald-400 font-semibold">Live Auto-Sync &rarr;</span>
                  </div>
                </div>
              ) : (
                <div className="bg-secondary/20 border border-border/40 rounded-2xl p-4 text-foreground/90 font-sans text-xs md:text-sm leading-loose whitespace-pre-wrap flex-1 shadow-inner">
                  {activeNaratif}
                </div>
              )}

              <div className="p-2.5 rounded-xl bg-secondary/30 border border-border/40 text-[11px] text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                💡 <strong>Format Naratif Bab 3:</strong> Langkah diberi nomor urut dan rumus ditulis pada baris baru di bawah kata hitung.
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PANEL 2: FLOWCHART VISUALIZER & BUILDER                                   */}
          {/* ========================================================================= */}
          <div className={`rounded-3xl border transition-all flex flex-col justify-between overflow-hidden shadow-xl ${
            sourceMode === 'flowchart' 
              ? 'bg-slate-900/95 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)] ring-1 ring-blue-500' 
              : 'bg-card border-border/60 text-foreground'
          }`}>
            <div className={`p-4 border-b flex items-center justify-between ${
              sourceMode === 'flowchart' ? 'bg-slate-950 border-slate-800' : 'bg-secondary/30 border-border/40'
            }`}>
              <div className="flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-blue-500" />
                <h4 className="font-extrabold text-sm text-blue-500">2. Flowchart (Diagram Alir)</h4>
              </div>
              
              {sourceMode === 'flowchart' ? (
                <span className="text-[9px] font-mono bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/40 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
                  Visual Builder 🛠️
                </span>
              ) : (
                <span className="text-[9px] font-mono bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30 font-bold">
                  Auto-Synced ⚡
                </span>
              )}
            </div>

            {/* Interactive Visual Builder (Mode 2) or Synced Readonly (Mode 1 & 3) */}
            <div className="p-4 flex-1 flex flex-col items-center justify-start space-y-2 bg-secondary/10 overflow-y-auto max-h-[440px]">
              
              {/* START Terminator */}
              <div className="px-5 py-1.5 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-300 font-mono font-extrabold text-xs shadow-sm">
                START
              </div>
              <div className="w-0.5 h-3 bg-border"></div>

              {/* Editable Nodes when in Flowchart Mode */}
              {sourceMode === 'flowchart' ? (
                <div className="w-full space-y-2">
                  {customFlowSteps.map((step, idx) => (
                    <div key={step.id || idx} className="flex flex-col items-center gap-1 w-full">
                      
                      <div className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm flex flex-col gap-2 relative group">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-[10px] font-mono text-slate-400">
                          <span className="font-bold flex items-center gap-1">
                            <span>#{idx + 1}</span>
                            <span className={step.type === 'input' ? 'text-blue-400' : (step.type === 'calc' ? 'text-purple-400' : 'text-emerald-400')}>
                              {step.type === 'input' ? 'Input Data (Jajar Genjang)' : (step.type === 'calc' ? 'Hitung Rumus (Persegi Panjang)' : 'Output Hasil')}
                            </span>
                          </span>
                          
                          {/* Reorder and Delete Controls */}
                          <div className="flex items-center gap-1">
                            <button onClick={() => moveFlowStep(idx, 'up')} disabled={idx === 0} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer" title="Geser ke Atas">
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button onClick={() => moveFlowStep(idx, 'down')} disabled={idx === customFlowSteps.length - 1} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer" title="Geser ke Bawah">
                              <ArrowDown className="w-3 h-3" />
                            </button>
                            <button onClick={() => deleteFlowStep(idx)} className="p-1 hover:bg-rose-500/20 text-rose-400 rounded cursor-pointer" title="Hapus Node">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Input Fields depending on Node Type */}
                        {step.type === 'input' && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-blue-400 font-bold">input(</span>
                            <input 
                              type="text" 
                              value={step.varName} 
                              onChange={(e) => updateFlowStep(idx, 'varName', e.target.value)} 
                              placeholder="nama_variabel" 
                              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-400"
                            />
                            <span className="text-xs font-mono text-blue-400 font-bold">)</span>
                          </div>
                        )}

                        {step.type === 'calc' && (
                          <div className="flex items-center gap-1.5 text-xs font-mono">
                            <input 
                              type="text" 
                              value={step.varName} 
                              onChange={(e) => updateFlowStep(idx, 'varName', e.target.value)} 
                              placeholder="hasil" 
                              className="w-24 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 font-mono text-purple-300 focus:outline-none focus:border-purple-400 font-bold"
                            />
                            <span className="text-rose-400 font-bold">=</span>
                            <input 
                              type="text" 
                              value={step.expr || ''} 
                              onChange={(e) => updateFlowStep(idx, 'expr', e.target.value)} 
                              placeholder="ekspresi rumus (misal: a * b)" 
                              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 font-mono text-amber-300 focus:outline-none focus:border-purple-400 font-bold"
                            />
                          </div>
                        )}

                        {step.type === 'output' && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-emerald-400 font-bold">output(</span>
                            <input 
                              type="text" 
                              value={step.outputArgs || ''} 
                              onChange={(e) => updateFlowStep(idx, 'outputArgs', e.target.value)} 
                              placeholder="variabel_atau_pesan" 
                              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-400"
                            />
                            <span className="text-xs font-mono text-emerald-400 font-bold">)</span>
                          </div>
                        )}
                      </div>

                      <div className="w-0.5 h-3 bg-border"></div>
                    </div>
                  ))}

                  {/* Add Node Tool Bar */}
                  <div className="pt-2 flex flex-col gap-1.5 border-t border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 font-bold">+ Tambah Node Simbol:</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button 
                        onClick={() => addFlowStep('input')} 
                        className="p-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-xl text-[10px] font-mono font-bold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> + Input
                      </button>
                      <button 
                        onClick={() => addFlowStep('calc')} 
                        className="p-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-xl text-[10px] font-mono font-bold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> + Hitung
                      </button>
                      <button 
                        onClick={() => addFlowStep('output')} 
                        className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-[10px] font-mono font-bold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> + Output
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Readonly visual representation when Mode 1 or 3 is active */
                activeSteps.map((node, i) => (
                  <React.Fragment key={i}>
                    {node.type === 'input' && (
                      <div className="px-4 py-1.5 text-xs font-mono font-bold bg-blue-500/15 border-2 border-blue-500 text-blue-600 dark:text-blue-300 transform -skew-x-12 rounded shadow-sm">
                        <span className="transform skew-x-12 inline-block">
                          input({node.varName})
                        </span>
                      </div>
                    )}

                    {(node.type === 'calc' || node.type === 'assign') && (
                      <div className="px-4 py-1.5 text-xs font-mono font-bold bg-purple-500/15 border-2 border-purple-500 text-purple-600 dark:text-purple-300 rounded-lg shadow-sm">
                        {node.varName} = {node.expr}
                      </div>
                    )}

                    {node.type === 'output' && (
                      <div className="px-4 py-1.5 text-xs font-mono font-bold bg-emerald-500/15 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-300 transform -skew-x-12 rounded shadow-sm">
                        <span className="transform skew-x-12 inline-block">
                          output({node.outputArgs})
                        </span>
                      </div>
                    )}

                    {node.type === 'unknown' && (
                      <div className="px-3 py-1 text-xs font-mono bg-rose-500/20 border-2 border-rose-500 text-rose-400 rounded-lg">
                        ⚠️ ? ({node.error})
                      </div>
                    )}

                    <div className="w-0.5 h-3 bg-border"></div>
                  </React.Fragment>
                ))
              )}

              {/* STOP Terminator */}
              <div className="px-5 py-1.5 rounded-full bg-rose-500/20 border-2 border-rose-500 text-rose-600 dark:text-rose-300 font-mono font-extrabold text-xs shadow-sm">
                STOP
              </div>
            </div>
            
            <div className="p-3 bg-secondary/30 border-t border-border/40 text-center">
              <p className="text-[11px] text-slate-700 dark:text-slate-300 font-medium italic font-sans">
                Kapsul (Terminator) &bull; Jajar Genjang (Input/Output) &bull; Persegi Panjang (Proses/Hitung)
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PANEL 3: PSEUDOCODE (STANDAR BAB 3)                                       */}
          {/* ========================================================================= */}
          <div className={`rounded-3xl border transition-all flex flex-col justify-between overflow-hidden shadow-xl ${
            sourceMode === 'pseudocode' 
              ? 'bg-slate-900/95 border-violet-500 shadow-[0_0_30px_rgba(168,85,247,0.2)] ring-1 ring-violet-500' 
              : 'bg-card border-border/60 text-foreground'
          }`}>
            <div className={`p-4 border-b flex items-center justify-between ${
              sourceMode === 'pseudocode' ? 'bg-slate-950 border-slate-800' : 'bg-secondary/30 border-border/40'
            }`}>
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-violet-500" />
                <h4 className="font-extrabold text-sm text-violet-500">3. Pseudocode (Standar Baku)</h4>
              </div>
              
              <div className="flex items-center gap-1.5">
                {sourceMode === 'pseudocode' ? (
                  <span className="text-[9px] font-mono bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full border border-violet-500/40 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping"></span>
                    Editor Aktif ✍️
                  </span>
                ) : (
                  <span className="text-[9px] font-mono bg-secondary text-slate-700 dark:text-slate-300 font-semibold px-2 py-0.5 rounded-full border border-border/40">
                    Auto-Generated ⚡
                  </span>
                )}
                <button
                  onClick={() => copyToClipboard(activePseudo, 'pseudo')}
                  className="text-slate-600 dark:text-slate-400 hover:text-foreground p-1 cursor-pointer"
                  title="Salin Pseudocode"
                >
                  {copiedTab === 'pseudo' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3 text-xs md:text-sm">
              {sourceMode === 'pseudocode' ? (
                <div className="space-y-2">
                  <textarea
                    value={pseudoInput}
                    onChange={(e) => setPseudoInput(e.target.value)}
                    rows={10}
                    className={`w-full bg-slate-950 border rounded-2xl p-4 text-slate-100 font-mono text-xs leading-relaxed focus:outline-none focus:ring-1 transition-all shadow-inner ${
                      activeLintIssues.length > 0 ? 'border-amber-500/60 focus:border-amber-400 focus:ring-amber-400' : 'border-slate-800 focus:border-violet-500 focus:ring-violet-500'
                    }`}
                    placeholder="PROGRAM NamaProgram&#10;// deskripsi&#10;&#10;KAMUS:&#10;  a, b : float&#10;&#10;ALGORITMA:&#10;  input(a)&#10;  ..."
                  />

                  {activeLintIssues.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-amber-950/70 border border-amber-500/60 text-amber-200 text-xs flex items-start gap-2 shadow-inner">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="font-bold text-amber-300">Catatan Baris: </span>
                        <span>{activeLintIssues[0].message}</span>
                        {activeLintIssues[0].fixSuggestion && (
                          <div className="text-[11px] font-mono text-amber-400 font-semibold mt-0.5">
                            👉 {activeLintIssues[0].fixSuggestion}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono px-1">
                    <span>{pseudoInput.split('\n').filter(l => l.trim()).length} Baris Kode</span>
                    <span className="text-violet-400 font-semibold">Live Auto-Sync &rarr;</span>
                  </div>
                </div>
              ) : (
                <div className="bg-secondary/20 border border-border/40 rounded-2xl p-4 text-foreground/90 font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap flex-1 shadow-inner">
                  {activePseudo}
                </div>
              )}

              <div className="p-2.5 rounded-xl bg-secondary/30 border border-border/40 text-[11px] text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                💡 <strong>Prinsip Pseudocode:</strong> Memuat 3 Blok (PROGRAM, KAMUS, ALGORITMA), operator modern (=), dan I/O universal input()/output().
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );

  if (isMaximized && mounted) {
    return createPortal(mainContentJSX, document.body);
  }

  return mainContentJSX;
}
