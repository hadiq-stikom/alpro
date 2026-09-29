"use client";

import React, { useState } from 'react';
import { 
  Brain, 
  Workflow, 
  Code2, 
  CheckSquare, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  ArrowLeft,
  ArrowDown,
  Variable, 
  Calculator, 
  Scale, 
  Cpu, 
  Play, 
  RotateCcw,
  Zap,
  FileCode2,
  TerminalSquare,
  ShieldAlert,
  Lightbulb,
  Eye,
  ShieldCheck,
  RefreshCw,
  XCircle,
  Info,
  Tag,
  MonitorPlay,
  FileText,
  Flame,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DEFINISI MODEL IPO TAHAP 2 (INPUT - PROSES - OUTPUT) ---
interface IpoScenarioItem {
  id: 'newton' | 'triangle' | 'circle' | 'suhu' | 'kasir';
  title: string;
  subtitle: string;
  badge: string;
  equation: string;
  constants: { name: string; val: string; desc: string }[];
  inputPhase: {
    title: string;
    sub: string;
    targetVars: { name: string; label: string; type: string; unit: string }[];
    universalCode: string[];
    pedagogicalRule: string;
  };
  processPhase: {
    title: string;
    sub: string;
    formula: string;
    operation: string;
    universalCode: string[];
    pedagogicalRule: string;
  };
  outputPhase: {
    title: string;
    sub: string;
    resultVars: { name: string; label: string; type: string; unit: string }[];
    universalCode: string[];
    pedagogicalRule: string;
  };
  triBlueprintSummary: {
    flowchart: string;
    pseudocode: string;
    naratif: string;
  };
}

const ipoScenariosData: Record<'newton' | 'triangle' | 'circle' | 'suhu' | 'kasir', IpoScenarioItem> = {
  newton: {
    id: 'newton',
    title: 'Hukum II Newton & Gaya Gerak',
    subtitle: 'Fisika Dinamika Benda',
    badge: 'Fisika & Matematika',
    equation: 'F = m · a',
    constants: [
      { name: 'g', val: '9.8 m/s²', desc: 'Tetapan gravitasi bumi (invarian di alam semesta)' }
    ],
    inputPhase: {
      title: '1. CORONG INPUT',
      sub: 'Membaca Variabel Bebas (Keyboard → RAM)',
      targetVars: [
        { name: 'm', label: 'massa benda', type: 'float', unit: 'kg' },
        { name: 'a', label: 'percepatan gerak', type: 'float', unit: 'm/s²' }
      ],
      universalCode: ['input(m)', 'input(a)'],
      pedagogicalRule: 'Hanya variabel bebas (m dan a) yang diminta ke pengguna. Tetapan gravitasi g = 9.8 bernilai paten sehingga TIDAK BOLEH diminta lewat input!'
    },
    processPhase: {
      title: '2. RUANG PROSES',
      sub: 'Eksekusi Persamaan Fisika (CPU / ALU)',
      formula: 'F = m · a',
      operation: 'ALU komputer mengalikan nilai m dengan a di register memori.',
      universalCode: ['F = m * a'],
      pedagogicalRule: 'Persamaan yang ditemukan di Tahap Analisis baru dapat dihitung setelah variabel m dan a memiliki nilai konkret di RAM.'
    },
    outputPhase: {
      title: '3. SALURAN OUTPUT',
      sub: 'Menyajikan Variabel Terikat (RAM → Layar)',
      resultVars: [
        { name: 'F', label: 'gaya total', type: 'float', unit: 'Newton' }
      ],
      universalCode: ['output("Gaya Total: ", F)'],
      pedagogicalRule: 'Variabel terikat F diserahkan ke perangkat tampilan pengguna sebagai hasil komputasi akhir.'
    },
    triBlueprintSummary: {
      flowchart: 'Jajar Genjang [input(m), input(a)] ➔ Kotak Persegi Panjang [F = m * a] ➔ Jajar Genjang [output(F)]',
      pseudocode: 'input(m)\ninput(a)\nF = m * a\noutput("Gaya: ", F)',
      naratif: '1. Minta masukan nilai massa (m) dan percepatan (a)\n2. Hitung gaya F = m * a\n3. Tampilkan nilai gaya F ke layar\nSelesai.'
    }
  },
  triangle: {
    id: 'triangle',
    title: 'Luas Bidang Segitiga',
    subtitle: 'Geometri Bidang Datar',
    badge: 'Geometri Datar',
    equation: 'Luas = 0.5 · alas · tinggi',
    constants: [
      { name: 'FAKTOR_SETENGAH', val: '0.5 (atau 1/2)', desc: 'Konstanta pecahan mutlak setengah luas persegi panjang' }
    ],
    inputPhase: {
      title: '1. CORONG INPUT',
      sub: 'Membaca Variabel Bebas (Keyboard → RAM)',
      targetVars: [
        { name: 'alas', label: 'panjang sisi dasar', type: 'float', unit: 'cm' },
        { name: 'tinggi', label: 'garis tegak lurus', type: 'float', unit: 'cm' }
      ],
      universalCode: ['input(alas)', 'input(tinggi)'],
      pedagogicalRule: 'Pengguna hanya memasukkan ukuran alas dan tinggi. Tetapan pecahan 0.5 tidak pernah diinput dari keyboard!'
    },
    processPhase: {
      title: '2. RUANG PROSES',
      sub: 'Eksekusi Rumus Luas Geometri (CPU / ALU)',
      formula: 'luas = 0.5 · alas · tinggi',
      operation: 'CPU mengalikan tetapan fraksi 0.5 dengan alas dan tinggi secara berurutan.',
      universalCode: ['luas = 0.5 * alas * tinggi'],
      pedagogicalRule: 'Tetapan 0.5 berpadu dengan variabel alas dan tinggi untuk menghasilkan nilai variabel terikat luas.'
    },
    outputPhase: {
      title: '3. SALURAN OUTPUT',
      sub: 'Menyajikan Variabel Terikat (RAM → Layar)',
      resultVars: [
        { name: 'luas', label: 'luas segitiga', type: 'float', unit: 'cm²' }
      ],
      universalCode: ['output("Luas Segitiga: ", luas)'],
      pedagogicalRule: 'Nilai luas disajikan ke monitor lengkap dengan label informatif.'
    },
    triBlueprintSummary: {
      flowchart: 'Jajar Genjang [input(alas), input(tinggi)] ➔ Kotak Persegi Panjang [luas = 0.5 * alas * tinggi] ➔ Jajar Genjang [output(luas)]',
      pseudocode: 'input(alas)\ninput(tinggi)\nluas = 0.5 * alas * tinggi\noutput("Luas: ", luas)',
      naratif: '1. Minta masukan panjang alas dan tinggi segitiga\n2. Hitung luas = 0.5 * alas * tinggi\n3. Tampilkan luas segitiga\nSelesai.'
    }
  },
  circle: {
    id: 'circle',
    title: 'Luas & Keliling Lingkaran',
    subtitle: 'Rasio Metrik Archimedes',
    badge: 'Geometri Lingkaran',
    equation: 'Luas = π · r²   |   Keliling = 2 · π · r',
    constants: [
      { name: 'PI (π)', val: '3.14159', desc: 'Rasio Archimedes baku keliling/diameter' },
      { name: 'FAKTOR_DUA', val: '2', desc: 'Pengali diameter keliling' }
    ],
    inputPhase: {
      title: '1. CORONG INPUT',
      sub: 'Membaca Variabel Bebas (Keyboard → RAM)',
      targetVars: [
        { name: 'r', label: 'panjang jari-jari', type: 'float', unit: 'cm' }
      ],
      universalCode: ['input(r)'],
      pedagogicalRule: 'Cukup 1 variabel bebas yang di-input! Tetapan Pi (3.14159) dan angka 2 sudah baku di sistem.'
    },
    processPhase: {
      title: '2. RUANG PROSES',
      sub: 'Eksekusi 2 Rumus Sekaligus (CPU / ALU)',
      formula: 'luas = π · r²  |  keliling = 2 · π · r',
      operation: 'CPU menghitung 2 persamaan berurutan menggunakan nilai r yang sama.',
      universalCode: ['luas = 3.14159 * r * r', 'keliling = 2 * 3.14159 * r'],
      pedagogicalRule: 'Satu variabel masukan dapat diproses menghasilkan dua variabel keluaran berbeda.'
    },
    outputPhase: {
      title: '3. SALURAN OUTPUT',
      sub: 'Menyajikan Dua Variabel Terikat (RAM → Layar)',
      resultVars: [
        { name: 'luas', label: 'luas lingkaran', type: 'float', unit: 'cm²' },
        { name: 'keliling', label: 'keliling lingkaran', type: 'float', unit: 'cm' }
      ],
      universalCode: ['output("Luas: ", luas)', 'output("Keliling: ", keliling)'],
      pedagogicalRule: 'Dua variabel terikat dapat disajikan ke layar secara terpisah atau bersamaan.'
    },
    triBlueprintSummary: {
      flowchart: 'Jajar Genjang [input(r)] ➔ Kotak Proses [luas = ..., keliling = ...] ➔ Jajar Genjang [output(luas, keliling)]',
      pseudocode: 'input(r)\nluas = 3.14159 * r * r\nkeliling = 2 * 3.14159 * r\noutput("Luas: ", luas)\noutput("Keliling: ", keliling)',
      naratif: '1. Minta masukan panjang jari-jari r\n2. Hitung luas = π * r² dan keliling = 2 * π * r\n3. Tampilkan luas dan keliling lingkaran\nSelesai.'
    }
  },
  suhu: {
    id: 'suhu',
    title: 'Konversi Skala Suhu (Termodinamika)',
    subtitle: 'Celcius ke Fahrenheit & Kelvin',
    badge: 'Termodinamika Fisika',
    equation: 'F = (1.8 · C) + 32   |   K = C + 273.15',
    constants: [
      { name: 'FAKTOR_FAHRENHEIT', val: '1.8 (atau 9/5)', desc: 'Tetapan rasio pengali skala Celcius ke Fahrenheit' },
      { name: 'OFFSET_BEKU', val: '32.0', desc: 'Titik beku air murni dalam skala Fahrenheit' },
      { name: 'OFFSET_KELVIN', val: '273.15', desc: 'Titik nol mutlak termodinamika universal' }
    ],
    inputPhase: {
      title: '1. CORONG INPUT',
      sub: 'Membaca Variabel Bebas (Keyboard / Sensor → RAM)',
      targetVars: [
        { name: 'C', label: 'suhu Celcius', type: 'float', unit: '°C' }
      ],
      universalCode: ['input(C)'],
      pedagogicalRule: 'Pengguna hanya menginput suhu Celcius (C). Angka 1.8, 32, dan 273.15 adalah tetapan mutlak konversi dan TIDAK BOLEH diminta lewat input!'
    },
    processPhase: {
      title: '2. RUANG PROSES',
      sub: 'Eksekusi Rumus Konversi Suhu (CPU / ALU)',
      formula: 'F = (1.8 · C) + 32   |   K = C + 273.15',
      operation: 'CPU menghitung perkalian rasio 1.8 dengan C lalu ditambah 32, serta menjumlahkan C dengan 273.15.',
      universalCode: [
        'F = (1.8 * C) + 32.0',
        'K = C + 273.15'
      ],
      pedagogicalRule: 'Dua persamaan matematika dieksekusi secara berurutan menggunakan variabel bebas C dan tiga nilai tetapan konversi.'
    },
    outputPhase: {
      title: '3. SALURAN OUTPUT',
      sub: 'Menyajikan Dua Skala Suhu Terikat (RAM → Layar)',
      resultVars: [
        { name: 'F', label: 'suhu Fahrenheit', type: 'float', unit: '°F' },
        { name: 'K', label: 'suhu Kelvin', type: 'float', unit: 'K' }
      ],
      universalCode: ['output("Fahrenheit: ", F)', 'output("Kelvin: ", K)'],
      pedagogicalRule: 'Menyajikan dua variabel terikat (F dan K) hasil konversi presisi ke layar pengguna.'
    },
    triBlueprintSummary: {
      flowchart: 'Jajar Genjang [input(C)] ➔ Kotak Proses [F = ..., K = ...] ➔ Jajar Genjang [output(F, K)]',
      pseudocode: 'input(C)\nF = (1.8 * C) + 32.0\nK = C + 273.15\noutput("Fahrenheit: ", F)\noutput("Kelvin: ", K)',
      naratif: '1. Minta masukan derajat suhu Celcius (C)\n2. Hitung F = (1.8 * C) + 32.0 dan K = C + 273.15\n3. Tampilkan hasil suhu Fahrenheit (F) dan Kelvin (K)\nSelesai.'
    }
  },
  kasir: {
    id: 'kasir',
    title: 'Sistem Kasir Penjualan Grosir & Pajak PPN 11%',
    subtitle: 'Komputasi Finansial & Aritmatika Sekuensial',
    badge: 'Aritmatika Sekuensial',
    equation: 'subtotal = jumlah · harga   |   total = subtotal + (subtotal · 0.11)',
    constants: [
      { name: 'TARIF_PPN', val: '0.11 (11%)', desc: 'Tetapan hukum Pajak Pertambahan Nilai baku (tipe pecahan / float)' }
    ],
    inputPhase: {
      title: '1. CORONG INPUT',
      sub: 'Membaca Variabel Bebas (Keyboard / Barcode Scanner → RAM)',
      targetVars: [
        { name: 'jumlahBarang', label: 'kuantitas barang', type: 'integer', unit: 'pcs' },
        { name: 'hargaSatuan', label: 'harga per unit', type: 'float', unit: 'Rp' }
      ],
      universalCode: ['input(jumlahBarang)', 'input(hargaSatuan)'],
      pedagogicalRule: 'Pengguna memasukkan kuantitas jumlahBarang (bilangan bulat) dan hargaSatuan (pecahan). Tetapan TARIF_PPN = 0.11 bernilai paten dan DILARANG diinput lewat keyboard!'
    },
    processPhase: {
      title: '2. RUANG PROSES',
      sub: 'Eksekusi Persamaan Bertingkat (CPU / ALU)',
      formula: 'subtotal = jumlah · harga  |  nominalPpn = subtotal · 0.11  |  totalBayar = subtotal + nominalPpn',
      operation: 'ALU menghitung perkalian integer x float menghasilkan float subtotal, lalu menghitung nominal PPN dan total tagihan akhir secara sekuensial lurus tanpa percabangan.',
      universalCode: [
        'subtotal = jumlahBarang * hargaSatuan',
        'nominalPpn = subtotal * TARIF_PPN',
        'totalBayar = subtotal + nominalPpn'
      ],
      pedagogicalRule: 'Persamaan dihitung berurutan tanpa percabangan (sekuensial murni). Nilai subtotal wajib dihitung sebelum nominalPpn dan totalBayar dapat diproses.'
    },
    outputPhase: {
      title: '3. SALURAN OUTPUT',
      sub: 'Menyajikan Variabel Terikat (RAM → Layar Struk Kasir)',
      resultVars: [
        { name: 'subtotal', label: 'subtotal kotor', type: 'float', unit: 'Rp' },
        { name: 'nominalPpn', label: 'pajak PPN 11%', type: 'float', unit: 'Rp' },
        { name: 'totalBayar', label: 'total tagihan akhir', type: 'float', unit: 'Rp' }
      ],
      universalCode: [
        'output("Subtotal   : Rp", subtotal)',
        'output("PPN (11%)  : Rp", nominalPpn)',
        'output("Total Bayar: Rp", totalBayar)'
      ],
      pedagogicalRule: 'Tiga variabel terikat disajikan berurutan ke layar monitor atau mesin pencetak struk belanja kasir.'
    },
    triBlueprintSummary: {
      flowchart: 'Alur Visual ANSI: [MULAI] ➔ [input(jumlahBarang, hargaSatuan)] ➔ [subtotal, nominalPpn, totalBayar] ➔ [output(subtotal, nominalPpn, totalBayar)] ➔ [SELESAI]',
      pseudocode: 'PROGRAM KasirGrosir\nKAMUS:\n  TARIF_PPN : float = 0.11\n  jumlahBarang : integer\n  hargaSatuan, subtotal : float\n  nominalPpn, totalBayar : float\nALGORITMA:\n  input(jumlahBarang)\n  input(hargaSatuan)\n  subtotal = jumlahBarang * hargaSatuan\n  nominalPpn = subtotal * TARIF_PPN\n  totalBayar = subtotal + nominalPpn\n  output("Subtotal   : Rp", subtotal)\n  output("PPN (11%)  : Rp", nominalPpn)\n  output("Total Bayar: Rp", totalBayar)',
      naratif: '1. Minta masukan jumlahBarang (bilangan bulat) dan hargaSatuan (pecahan)\n2. Hitung subtotal = jumlahBarang * hargaSatuan\n3. Hitung nominalPpn = subtotal * 0.11\n4. Hitung totalBayar = subtotal + nominalPpn\n5. Tampilkan subtotal, nominalPpn, dan totalBayar ke layar\nSelesai.'
    }
  }
};

export default function ProgramEngineeringMethodology() {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [activeLabTab, setActiveLabTab] = useState<'analisis' | 'desain' | 'coding' | 'testing'>('analisis');
  const [testWeight, setTestWeight] = useState<string>('68');
  const [testHeight, setTestHeight] = useState<string>('172');
  const [selectedMistake, setSelectedMistake] = useState<number>(0);

  // --- CAPSTONE DESAIN SOLUSI VIEW STATE ---
  const [capstoneDesignView, setCapstoneDesignView] = useState<'all' | 'flowchart' | 'pseudocode' | 'naratif'>('all');

  // --- TAHAP 1: Analisis Kasus Kasir Grosir & PPN 11% ---
  const [kasirQty, setKasirQty] = useState<number>(10);
  const [kasirPrice, setKasirPrice] = useState<number>(25000);
  const TARIF_PPN = 0.11;
  const kasirSubtotal = kasirQty * kasirPrice;
  const kasirPpn = kasirSubtotal * TARIF_PPN;
  const kasirTotal = kasirSubtotal + kasirPpn;

  // --- TAHAP 2: IPO Pipeline State ---
  const [selectedIpoScenario, setSelectedIpoScenario] = useState<'newton' | 'triangle' | 'circle' | 'suhu' | 'kasir'>('kasir');
  const [activeIpoFilter, setActiveIpoFilter] = useState<'all' | 'input' | 'process' | 'output'>('all');

  // --- Helper Navigasi Tahap (Auto Smooth Scroll) ---
  const handleStageChange = (stageNum: number) => {
    setActiveStage(stageNum);
    setTimeout(() => {
      const element = document.getElementById('sdlc-stepper-anchor');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 40);
  };

  // --- TAHAP 2: Blueprint View State ---
  const [designBlueprintView, setDesignBlueprintView] = useState<'naratif' | 'flowchart' | 'pseudocode'>('naratif');

  // --- TAHAP 3: Rosetta Transcriber State ---
  const [activeRosettaLine, setActiveRosettaLine] = useState<number>(0);
  const [transcriptionLang, setTranscriptionLang] = useState<'python' | 'cpp' | 'javascript'>('python');

  // --- TAHAP 4: Test Matrix State ---
  const [activeTestScenario, setActiveTestScenario] = useState<'happy' | 'boundary' | 'extreme'>('happy');

  // Perhitungan interaktif untuk Lab Testing
  const numWeight = parseFloat(testWeight);
  const numHeight = parseFloat(testHeight);
  const isValid = !isNaN(numWeight) && !isNaN(numHeight) && numWeight > 0 && numHeight > 0;
  
  let bmiResult: number | null = null;
  let categoryResult = '';
  let categoryColor = '';
  let statusMessage = '';

  if (isValid) {
    const heightInMeters = numHeight / 100;
    bmiResult = Number((numWeight / (heightInMeters * heightInMeters)).toFixed(1));
    if (bmiResult < 18.5) {
      categoryResult = 'Kurus (Underweight)';
      categoryColor = 'text-amber-500 bg-amber-500/10 border-amber-500/30';
      statusMessage = 'Perlu asupan nutrisi seimbang untuk mencapai berat ideal.';
    } else if (bmiResult <= 24.9) {
      categoryResult = 'Normal (Ideal)';
      categoryColor = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
      statusMessage = 'Pertahankan pola makan dan aktivitas fisik yang sehat!';
    } else if (bmiResult <= 29.9) {
      categoryResult = 'Kelebihan Berat Badan (Overweight)';
      categoryColor = 'text-orange-500 bg-orange-500/10 border-orange-500/30';
      statusMessage = 'Disarankan meningkatkan intensitas olahraga dan kontrol kalori.';
    } else {
      categoryResult = 'Obesitas (Obese)';
      categoryColor = 'text-rose-500 bg-rose-500/10 border-rose-500/30';
      statusMessage = 'Perlu konsultasi medis dan program penurunan berat terarah.';
    }
  }

  // --- KONDISI PERCABANGAN FLOWCHART ANSI INTERAKTIF ---
  const isWeightHeightValid = !isNaN(numWeight) && !isNaN(numHeight) && numWeight > 0 && numHeight > 0;
  const currentBmi = bmiResult ?? 23.0;

  const isHitKurus = isWeightHeightValid && currentBmi < 18.5;
  const isHitNormal = isWeightHeightValid && currentBmi >= 18.5 && currentBmi <= 24.9;
  const isHitOverweight = isWeightHeightValid && currentBmi > 24.9 && currentBmi <= 29.9;
  const isHitObesitas = isWeightHeightValid && currentBmi > 29.9;

  const isCond1PassedFalse = isWeightHeightValid && currentBmi >= 18.5;
  const isCond2Skipped = isHitKurus;
  const isCond2PassedFalse = isWeightHeightValid && currentBmi > 24.9;
  const isCond3Skipped = isHitKurus || isHitNormal;
  const isCond3PassedFalse = isWeightHeightValid && currentBmi > 29.9;
  const isElseSkipped = isHitKurus || isHitNormal || isHitOverweight;

  const commonMistakes = [
    {
      title: "1. Menganggap Angka Pasti 'Integer'",
      problem: "Menggunakan tipe integer untuk variabel 'berat' (misal: 62.5 kg dipaksa jadi 62 kg).",
      consequence: "Presisi desimal hilang terpotong. Perhitungan BMI menjadi tidak akurat hingga selisih 0.5 - 1.0 poin.",
      solution: "Gunakan tipe data Float (pecahan) untuk seluruh pengukuran fisika/matematis kontinu."
    },
    {
      title: "2. Masukan Angka Tertinggal sebagai 'String'",
      problem: "Hasil input pengguna dari keyboard tidak di-konversi ke angka sebelum dihitung.",
      consequence: "Di komputer, '65' + '5' bukan menghasilkan 70, melainkan teks gabungan '655'! Operasi pembagian akan memicu TypeError (Crash).",
      solution: "Wajib melakukan Type Casting (konversi tipe data eksplisit) dari string masukan ke tipe numerik."
    },
    {
      title: "3. Tanpa Analisis Batas: Pembagian dengan Nol",
      problem: "Mengabaikan analisis domain data saat tinggi badan yang dimasukkan adalah 0 cm.",
      consequence: "Komputer mengalami 'Division by Zero' crash seketika karena pembagian dengan angka nol mustahil secara matematika.",
      solution: "Sertakan pra-syarat (precondition): tinggi > 0 dan berat > 0 sebelum proses pembagian dijalankan."
    }
  ];


  // Helper Rosetta lines (Sekuensial Murni: Kasir Grosir & PPN 11%)
  const rosettaLines = [
    {
      lineNum: 1,
      pseudo: "const TARIF_PPN : real = 0.11",
      python: "TARIF_PPN = 0.11",
      cpp: "const float TARIF_PPN = 0.11f;",
      javascript: "const TARIF_PPN = 0.11;",
      desc: {
        python: "Di Python, tetapan ditulis huruf kapital (PEP 8) sebagai penanda nilai paten yang tidak boleh diubah saat program berjalan.",
        cpp: "Di C++, kata kunci 'const float' mengunci nilai di memori sebagai konstanta bertipe pecahan riil.",
        javascript: "Di JavaScript, kata kunci 'const' membuat variabel konstan bernilai tetap (read-only)."
      }
    },
    {
      lineNum: 2,
      pseudo: "input(jumlahBarang)",
      python: "jumlah_barang = int(input('Jumlah barang (pcs): '))",
      cpp: "cin >> jumlah_barang;",
      javascript: "let jumlahBarang = parseInt(prompt('Jumlah barang: '));",
      desc: {
        python: "Wajib dibungkus int() karena kuantitas barang adalah bilangan bulat (integer). Input keyboard default berupa string!",
        cpp: "Variabel jumlah_barang dideklarasikan bertipe 'int', sehingga cin otomatis mem-parsing input keyboard menjadi bilangan bulat.",
        javascript: "Fungsi parseInt() mengonversi teks string masukan dari jendela prompt menjadi bilangan bulat."
      }
    },
    {
      lineNum: 3,
      pseudo: "input(hargaSatuan)",
      python: "harga_satuan = float(input('Harga satuan (Rp): '))",
      cpp: "cin >> harga_satuan;",
      javascript: "let hargaSatuan = parseFloat(prompt('Harga satuan: '));",
      desc: {
        python: "Wajib dibungkus float() karena nominal harga uang adalah bilangan pecahan kontinu (bisa memuat desimal koma).",
        cpp: "Variabel harga_satuan dideklarasikan bertipe 'float', membaca angka desimal secara presisi.",
        javascript: "Fungsi parseFloat() mengonversi teks masukan menjadi bilangan desimal berkoma."
      }
    },
    {
      lineNum: 4,
      pseudo: "subtotal = jumlahBarang * hargaSatuan",
      python: "subtotal = jumlah_barang * harga_satuan",
      cpp: "float subtotal = jumlah_barang * harga_satuan;",
      javascript: "let subtotal = jumlahBarang * hargaSatuan;",
      desc: {
        python: "Persamaan 1: Perkalian antara integer (jumlah) dan float (harga) secara otomatis menghasilkan nilai bertipe pecahan float.",
        cpp: "Komputer melakukan type promotion: perkalian int x float disimpan ke dalam variabel float subtotal.",
        javascript: "Operator perkalian (*) menghasilkan angka desimal bertipe Number (floating point 64-bit)."
      }
    },
    {
      lineNum: 5,
      pseudo: "nominalPpn = subtotal * TARIF_PPN",
      python: "nominal_ppn = subtotal * TARIF_PPN",
      cpp: "float nominal_ppn = subtotal * TARIF_PPN;",
      javascript: "let nominalPpn = subtotal * TARIF_PPN;",
      desc: {
        python: "Persamaan 2: Menghitung nominal rupiah pajak PPN 11% dengan mengalikan subtotal dengan konstanta TARIF_PPN.",
        cpp: "Mengalikan variabel float subtotal dengan konstanta float TARIF_PPN.",
        javascript: "Mengalikan subtotal dengan tetapan konstan TARIF_PPN 0.11."
      }
    },
    {
      lineNum: 6,
      pseudo: "totalBayar = subtotal + nominalPpn",
      python: "total_bayar = subtotal + nominal_ppn",
      cpp: "float total_bayar = subtotal + nominal_ppn;",
      javascript: "let totalBayar = subtotal + nominalPpn;",
      desc: {
        python: "Persamaan 3: Menjumlahkan subtotal kotor dengan nominal pajak PPN untuk memperoleh total tagihan akhir.",
        cpp: "Menjumlahkan dua variabel float ke dalam variabel float total_bayar.",
        javascript: "Menjumlahkan subtotal dan nominalPpn menjadi total akhir."
      }
    },
    {
      lineNum: 7,
      pseudo: 'output("Total Bayar: Rp", totalBayar)',
      python: "print('Total Bayar: Rp', total_bayar)",
      cpp: 'cout << "Total Bayar: Rp " << total_bayar << endl;',
      javascript: 'console.log("Total Bayar: Rp " + totalBayar);',
      desc: {
        python: "Instruksi universal output() dipetakan ke print() bawaan Python untuk menampilkan hasil ke terminal/layar.",
        cpp: "Mengalirkan label teks dan variabel total_bayar ke layar konsol melalui stream cout.",
        javascript: "Mencetak teks dan totalBayar ke konsol web atau terminal Node.js."
      }
    }
  ];

  const testScenarios = {
    happy: {
      title: "1. Kasus Normal (Happy Path)",
      badge: "PASS (HIJAU)",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      inputVal: "jumlahBarang = 5 pcs (int), hargaSatuan = Rp 20.000,00 (float)",
      kondisiEval: "subtotal = 5 x 20.000 = 100.000 | PPN = 100.000 x 0.11 = 11.000",
      outputRes: "Total Bayar = Rp 111.000,00",
      statusColor: "text-emerald-500",
      ahaMessage: "Kasus umum transaksi normal. Menguji bahwa perkalian integer dengan float dan penambahan tetapan pajak menghasilkan nilai yang tepat sesuai perhitungan manual."
    },
    boundary: {
      title: "2. Kasus Presisi Pecahan (Floating-Point Precision)",
      badge: "PRECISION TEST",
      badgeColor: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30",
      inputVal: "jumlahBarang = 3 pcs (int), hargaSatuan = Rp 12.500,50 (float desimal)",
      kondisiEval: "subtotal = 3 x 12.500,50 = 37.501,50 | PPN = 37.501,50 x 0.11 = 4.125,165",
      outputRes: "Total Bayar = Rp 41.626,665 (Rp 41.626,67)",
      statusColor: "text-amber-500",
      ahaMessage: "JEBAKAN TIPE DATA: Jika programmer salah memilih tipe data integer untuk harga, nilai pecahan ,50 akan hilang terpotong (truncate)! Dalam sistem kasir nyata, akumulasi selisih koma akan menyebabkan kerugian finansial."
    },
    extreme: {
      title: "3. Kasus Nilai Ekstrem (Kuantitas Nol & Partai Sangat Besar)",
      badge: "BOUNDARY / OVERFLOW",
      badgeColor: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/30",
      inputVal: "jumlahBarang = 0 pcs (Batal) ATAU jumlahBarang = 50.000 pcs (Partai Pabrik)",
      kondisiEval: "Jika 0: subtotal = 0, PPN = 0, Total = 0. Jika 50.000 @ 15.000: Total = Rp 832.500.000",
      outputRes: "Program tetap stabil tanpa crash (Nol Error Pembagian)",
      statusColor: "text-cyan-600 dark:text-cyan-400",
      ahaMessage: "PROGRAM TANGGUH: Menguji apakah tipe data integer dan float mampu menampung angka transaksi hingga ratusan juta rupiah tanpa mengalami integer overflow."
    }
  };

  return (
    <div className="space-y-12">
      {/* 1. Header Pembuka & Paradigma Think First Code Later */}
      <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10 rounded-2xl border border-indigo-500/20 p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/15 text-indigo-400 rounded-full text-xs font-semibold uppercase tracking-wider border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Paradigma Utama Insinyur Perangkat Lunak
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              Prinsip 70/30: <span className="text-indigo-600 dark:text-indigo-400">Think First</span>, Code Later
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl font-medium">
              <strong className="text-rose-600 dark:text-rose-400 font-extrabold">Kesalahan fatal</strong> yang paling sering menjebak pemrogram pemula adalah{' '}
              <span className="bg-rose-500/10 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded-md border border-rose-500/30 font-semibold italic">
                terburu-buru membuka editor dan langsung mengetik baris kode
              </span>. Di era rekayasa modern, menulis sintaksis kode adalah{' '}
              <span className="text-slate-900 dark:text-slate-100 font-bold underline decoration-slate-400/60 dark:decoration-slate-500/60 underline-offset-4">
                pekerjaan hilir yang mekanis
              </span>. Nilai intelektual sejati seorang analis dan pemrogram terletak pada{' '}
              <span className="bg-indigo-500/15 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2.5 py-0.5 rounded-md border border-indigo-500/30 font-black shadow-xs">
                kematangan analisis hulu
              </span>
              : <strong className="text-slate-950 dark:text-white font-bold">menemukan persamaan</strong>,{' '}
              <strong className="text-slate-950 dark:text-white font-bold">membedah variabel beserta tipe datanya</strong>, dan{' '}
              <strong className="text-slate-950 dark:text-white font-bold">merancang arsitektur alur algoritma</strong>{' '}
              sebelum <strong className="text-amber-600 dark:text-amber-400 font-extrabold underline decoration-amber-500/60 decoration-2 underline-offset-2">satu baris kode pun dieksekusi</strong>.
            </p>
          </div>
          <div className="shrink-0 flex items-center justify-center">
            <div className="p-4 bg-background/80 backdrop-blur rounded-2xl border border-border/80 shadow-md text-center space-y-2 w-48">
              <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">70% : 30%</div>
              <div className="text-xs text-slate-700 dark:text-slate-300 font-bold">
                70% Analisis &amp; Desain<br />
                30% Coding &amp; Testing
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden flex">
                <div className="h-full bg-indigo-500 w-[70%]" title="Analisis & Desain (70%)"></div>
                <div className="h-full bg-cyan-500 w-[30%]" title="Coding & Testing (30%)"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Tahap Ringkas Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border/50">
          <div 
            onClick={() => setActiveStage(1)}
            className={`p-4 rounded-xl bg-card border-2 border-indigo-500/40 space-y-1.5 relative z-10 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center lg:origin-left hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-indigo-600 hover:brightness-105 ${activeStage === 1 ? 'ring-2 ring-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20' : ''}`}
          >
            <div className="text-xs font-mono font-black text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">FASE 1 (HULU)</div>
            <div className="font-extrabold text-base text-foreground flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-indigo-700 dark:text-indigo-400" /> Analisis Masalah
            </div>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              Mencari{' '}
              <span className="bg-indigo-500/15 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold px-1.5 py-0.5 rounded border border-indigo-500/30">
                rumus / persamaan
              </span>{' '}
              &amp; membedah{' '}
              <strong className="text-slate-950 dark:text-white font-extrabold underline decoration-indigo-500/50 underline-offset-2">
                tipe data tiap variabel
              </strong>.
            </p>
          </div>
          <div 
            onClick={() => setActiveStage(2)}
            className={`p-4 rounded-xl bg-card border-2 border-amber-500/40 space-y-1.5 relative z-10 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-amber-600 hover:brightness-105 ${activeStage === 2 ? 'ring-2 ring-amber-600 bg-amber-50/40 dark:bg-amber-950/20' : ''}`}
          >
            <div className="text-xs font-mono font-black text-amber-800 dark:text-amber-400 uppercase tracking-wider">FASE 2 (ARSITEKTUR)</div>
            <div className="font-extrabold text-base text-foreground flex items-center gap-1.5">
              <Workflow className="w-4 h-4 text-amber-700 dark:text-amber-400" /> Desain Algoritma
            </div>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              Merangkai{' '}
              <span className="bg-amber-500/15 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold px-1.5 py-0.5 rounded border border-amber-500/30">
                alur bebas ambiguitas
              </span>{' '}
              (
              <strong className="text-slate-950 dark:text-white font-bold">Naratif</strong>,{' '}
              <strong className="text-slate-950 dark:text-white font-bold">Flowchart</strong>,{' '}
              <strong className="text-slate-950 dark:text-white font-bold">Pseudocode</strong>
              ).
            </p>
          </div>
          <div 
            onClick={() => setActiveStage(3)}
            className={`p-4 rounded-xl bg-card border-2 border-cyan-500/40 space-y-1.5 relative z-10 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-cyan-600 hover:brightness-105 ${activeStage === 3 ? 'ring-2 ring-cyan-600 bg-cyan-50/40 dark:bg-cyan-950/20' : ''}`}
          >
            <div className="text-xs font-mono font-black text-cyan-800 dark:text-cyan-400 uppercase tracking-wider">FASE 3 (HILIR)</div>
            <div className="font-extrabold text-base text-foreground flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-cyan-700 dark:text-cyan-400" /> Implementasi (Coding)
            </div>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              Menerjemahkan alur ke{' '}
              <span className="bg-cyan-500/15 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 font-bold px-1.5 py-0.5 rounded border border-cyan-500/30">
                sintaks resmi
              </span>{' '}
              <strong className="text-slate-950 dark:text-white font-extrabold underline decoration-cyan-500/50 underline-offset-2">
                bahasa pemrograman
              </strong>.
            </p>
          </div>
          <div 
            onClick={() => setActiveStage(4)}
            className={`p-4 rounded-xl bg-card border-2 border-emerald-500/40 space-y-1.5 relative z-10 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center lg:origin-right hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-emerald-600 hover:brightness-105 ${activeStage === 4 ? 'ring-2 ring-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20' : ''}`}
          >
            <div className="text-xs font-mono font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">FASE 4 (VALIDASI)</div>
            <div className="font-extrabold text-base text-foreground flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /> Pengujian (Testing)
            </div>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              Menguji{' '}
              <strong className="text-slate-950 dark:text-white font-bold">kasus normal</strong>,{' '}
              <span className="bg-emerald-500/15 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
                batas ekstrem
              </span>, dan mendeteksi{' '}
              <span className="bg-rose-500/15 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold px-1.5 py-0.5 rounded border border-rose-500/30">
                logic error
              </span>.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Stepper 4 Tahap Pembahasan Mendalam */}
      <div id="sdlc-stepper-anchor" className="space-y-6 pt-2">
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md p-4 rounded-2xl border-2 border-border shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-mono font-black uppercase tracking-wider text-primary">
                Satu Studi Kasus Terpadu: Sistem Kasir Grosir &amp; PPN 11%
              </span>
            </div>
            <h4 className="text-lg md:text-xl font-black text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Siklus Rekayasa Program: 4 Tahap Mengalir
            </h4>
          </div>
          {/* Navigation Pill Buttons */}
          <div className="flex items-center gap-1.5 bg-secondary/80 p-1.5 rounded-xl border border-border shrink-0">
            {[
              { id: 1, label: '1. Analisis', icon: Brain },
              { id: 2, label: '2. Desain', icon: Workflow },
              { id: 3, label: '3. Coding', icon: Code2 },
              { id: 4, label: '4. Testing', icon: CheckSquare },
            ].map((step) => {
              const Icon = step.icon;
              const isActive = activeStage === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => handleStageChange(step.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-extrabold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-md scale-[1.02]' 
                      : 'text-slate-800 dark:text-slate-200 hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Card by Active Stage */}
        <AnimatePresence mode="wait">
          {activeStage === 1 && (
            <motion.div
              key="stage-1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-6 md:p-8 bg-card border-2 border-indigo-500/40 rounded-2xl space-y-8 shadow-sm"
            >
              {/* Header Stage 1 */}
              <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-5">
                <div>
                  <span className="text-xs font-mono font-black px-3 py-1 rounded bg-indigo-600 text-white dark:bg-indigo-500/20 dark:text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                    TAHAP 1: ANALISIS MASALAH (HULU UTAMA)
                  </span>
                  <h4 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">
                    Membedah Persyaratan Nyata: Persamaan, Tetapan, &amp; Variabel
                  </h4>
                  <p className="text-slate-800 dark:text-slate-200 text-sm md:text-base mt-2 font-medium max-w-3xl leading-relaxed">
                    Studi Kasus: <strong className="text-indigo-900 dark:text-indigo-300 font-bold">Sistem Kasir Penjualan Grosir (Faktur Pajak PPN 11%)</strong>. Tahap paling hulu di mana seorang pemrogram membedah dunia nyata: menemukan persamaan matematis, menentukan nilai paten (tetapan), serta mendata variabel masukan (bulat &amp; pecahan) dan variabel luaran.
                  </p>
                </div>
                <div className="p-3.5 bg-indigo-600 text-white dark:bg-indigo-500/20 dark:text-indigo-400 rounded-2xl shrink-0 shadow-md">
                  <Brain className="w-8 h-8" />
                </div>
              </div>

              {/* DOMAIN PROBLEM STATEMENT */}
              <div className="p-5 bg-indigo-50/80 dark:bg-indigo-950/30 rounded-2xl border-2 border-indigo-300 dark:border-indigo-800 space-y-2.5">
                <span className="text-xs font-mono font-black uppercase text-indigo-700 dark:text-indigo-400 tracking-wider flex items-center gap-1.5">
                  <Info className="w-4 h-4" /> Konteks Masalah Dunia Nyata (Problem Domain)
                </span>
                <p className="text-sm md:text-base text-slate-900 dark:text-slate-100 font-semibold leading-relaxed">
                  Toko Grosir Perlengkapan Kantor melayani pembelian barang dalam partai besar. Kasir memerlukan sistem komputer otomatis untuk menghitung total tagihan belanja: <strong className="text-indigo-700 dark:text-indigo-300 font-black">mengalikan kuantitas barang dengan harga satuan, lalu menambahkan Pajak Pertambahan Nilai (PPN) sebesar 11%</strong> sesuai ketetapan undang-undang perpajakan yang berlaku.
                </p>
              </div>

              {/* PERSAMAAN MATEMATIS DOMAIN (SEKUENSIAL BERTINGKAT - SATU BARIS PER PERSAMAAN) */}
              <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-purple-50/40 to-indigo-50/80 dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-indigo-950/30 border-2 border-indigo-300 dark:border-indigo-800 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-200/80 dark:border-indigo-800 pb-3">
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono font-black uppercase text-indigo-800 dark:text-indigo-300 flex items-center gap-2 tracking-wide">
                      <Calculator className="w-4 h-4 text-indigo-600" /> Tiga Persamaan Matematis Domain (Aritmatika Sekuensial):
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      Komputasi mengalir berurutan dari atas ke bawah: hasil langkah sebelumnya menjadi masukan bagi langkah berikutnya.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono font-black px-2.5 py-1 rounded-full bg-indigo-200 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700 self-start sm:self-auto shrink-0">
                    3 Langkah Mengalir
                  </span>
                </div>

                {/* Vertical Equation Stack: 1 Baris Penuh per Persamaan */}
                <div className="space-y-2.5 font-mono">
                  {/* Langkah 1: Subtotal */}
                  <div className="p-3.5 md:p-4 bg-white dark:bg-slate-900 rounded-xl border-2 border-indigo-200 dark:border-indigo-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs hover:border-indigo-400 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                        1
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline font-sans">Subtotal Kotor:</span>
                        <code className="text-indigo-700 dark:text-indigo-300 font-black text-sm md:text-base whitespace-nowrap">
                          subtotal = jumlahBarang &times; hargaSatuan
                        </code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-sans text-slate-600 dark:text-slate-400 pl-10 md:pl-0">
                      <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 font-mono text-[11px] font-bold text-indigo-800 dark:text-indigo-300 whitespace-nowrap">
                        integer &times; float &rarr; float
                      </span>
                      <span className="hidden lg:inline text-slate-500 font-medium">Kuantitas dikalikan harga per unit</span>
                    </div>
                  </div>

                  {/* Flow Indicator 1 -> 2 */}
                  <div className="flex items-center gap-2 pl-4 text-xs font-sans text-indigo-600 dark:text-indigo-400 font-bold">
                    <ArrowDown className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Nilai <code className="font-mono font-bold text-indigo-700 dark:text-indigo-300">subtotal</code> diteruskan ke perhitungan pajak PPN:</span>
                  </div>

                  {/* Langkah 2: Nominal Pajak PPN 11% */}
                  <div className="p-3.5 md:p-4 bg-white dark:bg-slate-900 rounded-xl border-2 border-amber-200 dark:border-amber-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs hover:border-amber-400 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                        2
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline font-sans">Nominal Pajak:</span>
                        <code className="text-amber-700 dark:text-amber-300 font-black text-sm md:text-base whitespace-nowrap">
                          nominalPpn = subtotal &times; TARIF_PPN
                        </code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-sans text-slate-600 dark:text-slate-400 pl-10 md:pl-0">
                      <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 font-mono text-[11px] font-bold text-amber-800 dark:text-amber-300 whitespace-nowrap">
                        float &times; 0.11 &rarr; float
                      </span>
                      <span className="hidden lg:inline text-slate-500 font-medium">Perkalian dengan tetapan hukum 11%</span>
                    </div>
                  </div>

                  {/* Flow Indicator 2 -> 3 */}
                  <div className="flex items-center gap-2 pl-4 text-xs font-sans text-emerald-600 dark:text-emerald-400 font-bold">
                    <ArrowDown className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Nilai <code className="font-mono font-bold text-indigo-700 dark:text-indigo-300">subtotal</code> dan <code className="font-mono font-bold text-amber-700 dark:text-amber-300">nominalPpn</code> dijumlahkan menjadi total akhir:</span>
                  </div>

                  {/* Langkah 3: Total Akhir */}
                  <div className="p-3.5 md:p-4 bg-white dark:bg-slate-900 rounded-xl border-2 border-emerald-200 dark:border-emerald-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs hover:border-emerald-400 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                        3
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline font-sans">Total Tagihan:</span>
                        <code className="text-emerald-700 dark:text-emerald-300 font-black text-sm md:text-base whitespace-nowrap">
                          totalBayar = subtotal + nominalPpn
                        </code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-sans text-slate-600 dark:text-slate-400 pl-10 md:pl-0">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 font-mono text-[11px] font-bold text-emerald-800 dark:text-emerald-300 whitespace-nowrap">
                        float + float &rarr; float
                      </span>
                      <span className="hidden lg:inline text-slate-500 font-medium">Penjumlahan subtotal + pajak</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2 PILAR DEKOMPOSISI DATA: TETAPAN vs VARIABEL */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-indigo-600 animate-pulse"></span>
                  <h5 className="font-black text-lg md:text-xl text-slate-900 dark:text-white flex items-center gap-2">
                    <Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    Dekomposisi Data: Tetapan (Konstanta) vs Variabel
                  </h5>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* PILAR KIRI: TETAPAN / KONSTANTA */}
                  <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border-2 border-amber-400/80 dark:border-amber-600/70 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between border-b-2 border-amber-300/80 dark:border-amber-700/80 pb-3">
                      <span className="text-xs font-mono font-black uppercase px-2.5 py-1 rounded bg-amber-600 text-white shadow-sm flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5" /> 🔒 TETAPAN / KONSTANTA (NILAI TETAP)
                      </span>
                      <span className="text-xs font-bold text-amber-900 dark:text-amber-200">Invarian Baku</span>
                    </div>

                    <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                      Nilai persentase pajak yang <strong className="text-amber-950 dark:text-amber-200 font-black">sudah paten di sistem hukum</strong>. Pemrogram <strong className="text-rose-700 dark:text-rose-400 font-black">DILARANG</strong> meminta nilai ini diinput lewat keyboard oleh kasir!
                    </p>

                    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border-2 border-amber-300 dark:border-amber-800 space-y-2 shadow-inner">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-black text-amber-900 dark:text-amber-300 text-sm md:text-base">
                          TARIF_PPN : Pajak Pertambahan Nilai
                        </span>
                        <span className="text-xs font-mono font-black px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-400">
                          [float / pecahan]
                        </span>
                      </div>
                      <div className="text-lg md:text-xl font-mono font-black text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700">
                        Nilai Baku = 0.11 (11%)
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                        💡 <em>Karakteristik:</em> Ditentukan oleh regulasi perpajakan resmi. Bernilai tetap untuk seluruh barang kena pajak dan tidak pernah diminta dari keyboard kasir.
                      </p>
                    </div>
                  </div>

                  {/* PILAR KANAN: VARIABEL BEBAS & TERIKAT */}
                  <div className="p-5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/30 border-2 border-indigo-400/80 dark:border-indigo-600/70 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between border-b-2 border-indigo-300/80 dark:border-indigo-700/80 pb-3">
                      <span className="text-xs font-mono font-black uppercase px-2.5 py-1 rounded bg-indigo-600 text-white shadow-sm flex items-center gap-1.5">
                        <Variable className="w-3.5 h-3.5" /> 🔄 VARIABEL (NILAI BERUBAH)
                      </span>
                      <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200">Dinamis &amp; Dihitung</span>
                    </div>

                    <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                      Nilai yang dimasukkan kasir (<strong className="text-indigo-950 dark:text-indigo-200 font-black">Variabel Bebas: Bulat &amp; Pecahan</strong>) dan hasil kalkulasi komputer (<strong className="text-indigo-950 dark:text-indigo-200 font-black">Variabel Terikat: Pecahan</strong>).
                    </p>

                    <div className="space-y-3">
                      {/* Variabel Bebas: Integer */}
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-1 shadow-inner">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-black text-indigo-900 dark:text-indigo-300 text-xs md:text-sm">
                            jumlahBarang
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300">
                              Bebas (Input)
                            </span>
                            <span className="text-xs font-mono font-black px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 border border-indigo-300">
                              [integer / bulat]
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                          <span className="font-bold text-slate-900 dark:text-slate-100">Domain Fisik:</span> 1 s.d. 100.000 unit/pcs &bull; Kuantitas barang utuh yang dibeli pelanggan (tidak ada nilai pecahan koma).
                        </div>
                      </div>

                      {/* Variabel Bebas: Float */}
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-1 shadow-inner">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-black text-indigo-900 dark:text-indigo-300 text-xs md:text-sm">
                            hargaSatuan
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300">
                              Bebas (Input)
                            </span>
                            <span className="text-xs font-mono font-black px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 border border-indigo-300">
                              [float / pecahan]
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                          <span className="font-bold text-slate-900 dark:text-slate-100">Domain Finansial:</span> Rp 100,00 s.d. Rp 1.000.000.000,00 &bull; Harga per satu barang yang dapat memuat nilai desimal sen.
                        </div>
                      </div>

                      {/* Variabel Terikat */}
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-300 dark:border-emerald-800 space-y-1 shadow-inner">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-black text-emerald-900 dark:text-emerald-300 text-xs md:text-sm">
                            subtotal, nominalPpn, totalBayar
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
                              Terikat (Output)
                            </span>
                            <span className="text-xs font-mono font-black px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-300">
                              [float / pecahan]
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                          <span className="font-bold text-slate-900 dark:text-slate-100">Domain Hasil:</span> Nilai rupiah kalkulasi akhir yang dicetak ke lembar faktur atau struk belanja pelanggan.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SIMULATOR INTERAKTIF KALKULASI KASIR GROSIR */}
              <div className="p-6 bg-slate-50/90 dark:bg-slate-900/60 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 space-y-5 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-black text-sm md:text-base text-slate-900 dark:text-white">
                      Simulator Interaktif Kasir: Operasi Integer &times; Float di Tahap Analisis
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">
                    Ubah kuantitas &amp; harga untuk mengamati kalkulasi bertingkat:
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  <div className="space-y-4">
                    {/* Input 1: Kuantitas (Integer) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-900 dark:text-slate-100 flex justify-between items-center">
                        <span>1. Kuantitas Barang (jumlahBarang) [Bilangan Bulat]:</span>
                        <span className="text-xs font-mono text-indigo-700 dark:text-indigo-400 font-bold">[integer]</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="1"
                          min="1"
                          value={kasirQty}
                          onChange={(e) => setKasirQty(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full px-4 py-2 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-950 text-base font-mono font-black text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-inner"
                        />
                        <span className="text-sm font-black text-slate-700 dark:text-slate-300 shrink-0">unit</span>
                      </div>
                    </div>

                    {/* Input 2: Harga Satuan (Float) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-900 dark:text-slate-100 flex justify-between items-center">
                        <span>2. Harga Satuan (hargaSatuan) [Bilangan Pecahan]:</span>
                        <span className="text-xs font-mono text-indigo-700 dark:text-indigo-400 font-bold">[float]</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-700 dark:text-slate-300 shrink-0">Rp</span>
                        <input
                          type="number"
                          step="500"
                          min="0"
                          value={kasirPrice}
                          onChange={(e) => setKasirPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full px-4 py-2 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-950 text-base font-mono font-black text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Tombol Sampel Kasus Uji */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">Sampel Uji Cepat:</span>
                      <div className="flex flex-wrap items-center gap-2">
                        {[
                          { qty: 5, price: 12000, label: '5 Buku @ Rp 12.000' },
                          { qty: 12, price: 45500, label: '12 Rim @ Rp 45.500' },
                          { qty: 3, price: 125750.5, label: '3 Kalkulator @ Rp 125.750,50' },
                          { qty: 100, price: 3250, label: '100 Pulpen @ Rp 3.250' },
                        ].map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => { setKasirQty(item.qty); setKasirPrice(item.price); }}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono font-black border transition-all cursor-pointer bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-border hover:border-indigo-400"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hasil Kalkulasi Persamaan */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border-2 border-indigo-200 dark:border-indigo-800 space-y-3 font-mono">
                    <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide border-b border-border pb-2 flex justify-between items-center">
                      <span>Rincian Komputasi CPU (ALU):</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-black">Sekuensial Lurus</span>
                    </div>

                    <div className="space-y-2 text-xs md:text-sm">
                      <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                        <span>1. Subtotal ({kasirQty} &times; Rp {kasirPrice.toLocaleString('id-ID')}):</span>
                        <strong className="text-indigo-700 dark:text-indigo-300">Rp {kasirSubtotal.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                        <span>2. PPN 11% (Subtotal &times; 0.11):</span>
                        <strong className="text-amber-700 dark:text-amber-300">Rp {kasirPpn.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</strong>
                      </div>
                      <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 flex items-center justify-between text-emerald-900 dark:text-emerald-200">
                        <span className="font-bold uppercase text-xs">Total Tagihan (totalBayar):</span>
                        <span className="font-black text-base md:text-lg">
                          Rp {kasirTotal.toLocaleString('id-ID', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* MOMEN AHA INGINYUR */}
              <div className="p-5 md:p-6 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border-2 border-amber-400 dark:border-amber-500/60 flex items-start gap-4 text-xs md:text-sm text-amber-950 dark:text-amber-100 shadow-sm">
                <div className="p-2.5 rounded-xl bg-amber-500 text-white shrink-0 mt-0.5 shadow-md">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <strong className="text-amber-950 dark:text-amber-200 block text-base md:text-lg font-black">
                    💡 Momen AHA Insinyur: Tipe Data Mencerminkan Sifat Fisik Dunia Nyata!
                  </strong>
                  <p className="leading-relaxed font-medium text-slate-900 dark:text-slate-100">
                    Mengapa <code className="font-mono font-bold text-amber-900 dark:text-amber-300">jumlahBarang</code> harus bertipe <strong>Integer (Bilangan Bulat)</strong> sementara <code className="font-mono font-bold text-amber-900 dark:text-amber-300">hargaSatuan</code> dan <code className="font-mono font-bold text-amber-900 dark:text-amber-300">TARIF_PPN</code> bertipe <strong>Float (Bilangan Pecahan)</strong>? Karena barang dihitung dalam cacah fisik utuh (tidak ada pembeli meminta 2.4 buah buku), sedangkan uang dan tarif pajak adalah besaran kontinu yang membutuhkan nilai desimal. Saat komputer mengalikan Integer dengan Float, CPU secara otomatis mempromosikan hasilnya menjadi Float agar presisi angka di belakang koma tidak hilang terpotong!
                  </p>
                </div>
              </div>

              {/* TOMBOL NAVIGASI LANJUT KE TAHAP 2 */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleStageChange(2)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm md:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-600/30 transition-all hover:translate-x-1 cursor-pointer"
                >
                  <span>Lanjut ke Tahap 2: Desain Solusi (Pola IPO &amp; Cetak Biru)</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {activeStage === 2 && (
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-6 md:p-8 bg-card border-2 border-amber-500/40 rounded-2xl space-y-8 shadow-sm"
            >
              {/* Header Stage 2 */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-border/60 pb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-600 text-white dark:bg-amber-500/20 dark:text-amber-300 border border-amber-500/30 text-xs font-mono font-black uppercase tracking-wider mb-2">
                    <Workflow className="w-3.5 h-3.5" /> TAHAP 2: DESAIN SOLUSI &amp; ARSITEKTUR ALGORITMA
                  </div>
                  <h4 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    Cetak Biru Logika: Bebas Bahasa Mesin
                  </h4>
                  <p className="text-slate-800 dark:text-slate-200 text-sm md:text-base mt-2 font-medium max-w-3xl leading-relaxed">
                    Sebelum mengetik di komputer, langkah penyelesaian masalah wajib dituangkan ke dalam format cetak biru (blueprint) bebas ambiguitas. Jika logikanya sudah kokoh di sini, kode dapat diimplementasikan ke bahasa apa pun tanpa hambatan.
                  </p>
                </div>
                <div className="p-3.5 bg-amber-600 text-white dark:bg-amber-500/20 dark:text-amber-400 rounded-2xl shrink-0 self-start shadow-md">
                  <Layers className="w-8 h-8" />
                </div>
              </div>

              {/* 3 Pilar Desain Kartu */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className="p-5 bg-card rounded-2xl border-2 border-border space-y-2.5 shadow-sm relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center md:origin-left hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-amber-500/80 hover:brightness-105"
                >
                  <div className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white dark:bg-amber-500/30 dark:text-amber-200 flex items-center justify-center font-mono font-black text-xs shadow-sm">1</span>
                    Agnostik Bahasa (Universal)
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    <strong className="text-slate-950 dark:text-white font-bold">Tidak terikat sintaks</strong>{' '}
                    <code className="text-[11px] font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/20">Python</code>,{' '}
                    <code className="text-[11px] font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/20">C++</code>, atau{' '}
                    <code className="text-[11px] font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/20">Java</code>. Algoritma yang benar{' '}
                    <span className="text-emerald-700 dark:text-emerald-400 font-extrabold underline decoration-emerald-500/50 underline-offset-2">
                      bersifat abadi
                    </span>, meski bahasa pemrograman berganti <strong className="text-slate-950 dark:text-white font-bold">dekade demi dekade</strong>.
                  </p>
                </div>

                <div 
                  className="p-5 bg-card rounded-2xl border-2 border-border space-y-2.5 shadow-sm relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-amber-500/80 hover:brightness-105"
                >
                  <div className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white dark:bg-amber-500/30 dark:text-amber-200 flex items-center justify-center font-mono font-black text-xs shadow-sm">2</span>
                    Deterministik &amp; Sekuensial
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Instruksi dieksekusi <strong className="text-slate-950 dark:text-white font-bold">langkah demi langkah dari atas ke bawah</strong>. Setiap{' '}
                    <span className="bg-amber-500/15 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold px-1.5 py-0.5 rounded border border-amber-500/30">
                      persamaan matematis
                    </span>{' '}
                    hanya dapat dihitung setelah{' '}
                    <strong className="text-cyan-700 dark:text-cyan-300 font-extrabold underline decoration-cyan-500/50 underline-offset-2">
                      variabel masukannya tersedia di memori
                    </strong>.
                  </p>
                </div>

                <div 
                  className="p-5 bg-card rounded-2xl border-2 border-border space-y-2.5 shadow-sm relative z-0 hover:z-50 cursor-pointer hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center md:origin-right hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-amber-500/80 hover:brightness-105"
                >
                  <div className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white dark:bg-amber-500/30 dark:text-amber-200 flex items-center justify-center font-mono font-black text-xs shadow-sm">3</span>
                    Sinkronisasi Tri-Perspektif
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    <strong className="text-slate-950 dark:text-white font-bold">Naratif</strong> berbicara kepada{' '}
                    <span className="bg-indigo-500/15 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold px-1.5 py-0.5 rounded border border-indigo-500/30">
                      manusia awam
                    </span>,{' '}
                    <strong className="text-slate-950 dark:text-white font-bold">Flowchart</strong> memetakan{' '}
                    <span className="bg-blue-500/15 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold px-1.5 py-0.5 rounded border border-blue-500/30">
                      alur visual 2D
                    </span>, dan{' '}
                    <strong className="text-slate-950 dark:text-white font-bold">Pseudocode</strong> menyusun{' '}
                    <span className="bg-purple-500/15 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold px-1.5 py-0.5 rounded border border-purple-500/30">
                      struktur blok formal
                    </span> siap coding.
                  </p>
                </div>
              </div>

              {/* BAGIAN A: PARADIGMA INTI ALGORITMA: POLA IPO (INPUT - PROSES - OUTPUT) */}
              <div className="p-6 md:p-8 bg-slate-50/90 dark:bg-slate-900/60 rounded-2xl border-2 border-amber-300 dark:border-amber-700/60 space-y-6 shadow-sm">
                {/* Header Bagian A */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b-2 border-amber-500/20 pb-5">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-600 text-white font-mono font-black text-xs uppercase tracking-wider">
                      <Layers className="w-3.5 h-3.5" /> BAGIAN A: JEMBATAN PARADIGMA PROSEDURAL
                    </div>
                    <h5 className="font-black text-xl md:text-2xl text-slate-900 dark:text-white">
                      Pola IPO: Menghidupkan Persamaan &amp; Variabel Hasil Analisis
                    </h5>
                    <p className="text-slate-800 dark:text-slate-200 text-sm md:text-base font-medium leading-relaxed max-w-4xl">
                      Pada <strong className="text-indigo-900 dark:text-indigo-300 font-black">Tahap 1 (Analisis)</strong>, Anda menemukan <em>APA</em> yang ada di masalah: Persamaan Matematis, Tetapan (Konstanta), dan Variabel beserta tipe datanya. Di tahap itu, data masih bersifat pasif. Komputer adalah mesin sekuensial yang memerlukan urutan waktu eksekusi: <strong className="text-amber-900 dark:text-amber-300 font-black">Kapan nilai diambil (Input)</strong>, <strong className="text-amber-900 dark:text-amber-300 font-black">Kapan persamaan dihitung (Proses)</strong>, dan <strong className="text-amber-900 dark:text-amber-300 font-black">Kapan hasil disajikan (Output)</strong>.
                    </p>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-amber-900 dark:text-amber-300 shrink-0 self-start">
                    Formula Prosedural: I ➔ P ➔ O
                  </div>
                </div>

                {/* Skenario Aktif Terpadu */}
                <div className="p-4 bg-amber-500/10 rounded-2xl border-2 border-amber-500/30 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🧾</span>
                    <div>
                      <span className="text-xs font-mono font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider block">
                        Studi Kasus Berkelanjutan:
                      </span>
                      <h6 className="text-base font-black text-slate-900 dark:text-white">
                        Sistem Kasir Penjualan Grosir (Faktur Pajak PPN 11%)
                      </h6>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="px-2.5 py-1 rounded-md bg-amber-600 text-white font-mono text-xs font-black">
                      Aritmatika Sekuensial (Tanpa Percabangan &amp; Looping)
                    </span>
                  </div>
                </div>

                {/* Filter Tahap IPO */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="text-xs md:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-secondary font-mono text-xs border border-border">
                      {ipoScenariosData[selectedIpoScenario].badge}
                    </span>
                    <span>Persamaan: <code className="font-mono text-amber-800 dark:text-amber-300 font-black">{ipoScenariosData[selectedIpoScenario].equation}</code></span>
                  </div>

                  <div className="inline-flex p-1 bg-background rounded-xl border-2 border-border shadow-sm">
                    {[
                      { key: 'all', label: 'Semua Alur' },
                      { key: 'input', label: '1. Input' },
                      { key: 'process', label: '2. Proses' },
                      { key: 'output', label: '3. Output' }
                    ].map(f => (
                      <button
                        key={f.key}
                        onClick={() => setActiveIpoFilter(f.key as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                          activeIpoFilter === f.key
                            ? 'bg-amber-600 text-white shadow-sm'
                            : 'text-slate-700 dark:text-slate-300 hover:text-foreground'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3 Pipeline Cards (Input -> Process -> Output: Alur Sekuensial Vertikal dari Atas ke Bawah) */}
                <div className="flex flex-col space-y-5 pt-2">
                  {/* PIPA 1: INPUT */}
                  {(activeIpoFilter === 'all' || activeIpoFilter === 'input') && (
                    <div className="p-5 md:p-6 bg-card rounded-2xl border-2 border-cyan-500/60 dark:border-cyan-500/40 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between border-b-2 border-cyan-500/20 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-mono font-black text-sm shadow-sm">
                            I
                          </div>
                          <div>
                            <h6 className="font-black text-base md:text-lg text-slate-900 dark:text-white">
                              1. CORONG INPUT
                            </h6>
                            <span className="text-xs text-cyan-800 dark:text-cyan-300 font-bold block">
                              Keyboard / Barcode Scanner ➔ Memori RAM
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-cyan-100 dark:bg-cyan-950/80 text-cyan-900 dark:text-cyan-200 font-mono text-xs font-black border border-cyan-300 dark:border-cyan-800 uppercase tracking-wider">
                          MASUKAN
                        </span>
                      </div>

                      <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                        Membaca variabel bebas dari luar yang nilainya belum diketahui saat program ditulis:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Kolom Kiri: Variabel Bebas */}
                        <div className="space-y-2">
                          <span className="text-[11px] font-mono font-black text-cyan-800 dark:text-cyan-300 uppercase tracking-wider block">
                            Daftar Variabel Bebas Masukan:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {ipoScenariosData[selectedIpoScenario].inputPhase.targetVars.map((v, i) => (
                              <div key={i} className="p-3 bg-cyan-50/80 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-800/60 flex items-center justify-between text-xs font-mono">
                                <div>
                                  <span className="font-black text-cyan-900 dark:text-cyan-200 text-sm block">
                                    {v.name}
                                  </span>
                                  <span className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold">
                                    ({v.label})
                                  </span>
                                </div>
                                <span className="px-2.5 py-1 bg-background rounded-lg font-bold text-slate-800 dark:text-slate-200 border border-border">
                                  {v.type} ({v.unit})
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Kolom Kanan: Notasi Universal & Kaidah */}
                        <div className="space-y-2.5">
                          <div className="p-3 bg-slate-100 dark:bg-slate-950 rounded-xl font-mono text-xs text-cyan-800 dark:text-cyan-300 space-y-1 border border-border dark:border-slate-800">
                            <span className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider block">
                              Notasi Universal (1 Baris per Masukan):
                            </span>
                            <div className="space-y-1">
                              {ipoScenariosData[selectedIpoScenario].inputPhase.universalCode.map((code, idx) => (
                                <div key={idx} className="font-black font-mono flex items-center gap-2">
                                  <span className="text-cyan-600 dark:text-cyan-500 font-bold text-xs">{idx + 1}.</span>
                                  <span>{code}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="p-2.5 bg-amber-500/10 border-2 border-amber-500/30 rounded-xl text-xs font-semibold text-amber-950 dark:text-amber-200 flex items-start gap-2">
                            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <p className="text-[11px] leading-relaxed">
                              <strong className="text-amber-900 dark:text-amber-300">Patuhi Aturan Tetapan:</strong> {ipoScenariosData[selectedIpoScenario].inputPhase.pedagogicalRule}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FLOW ARROW 1 -> 2 */}
                  {activeIpoFilter === 'all' && (
                    <div className="flex items-center justify-center -my-1">
                      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border-2 border-cyan-500/30 text-cyan-800 dark:text-cyan-300 font-mono text-xs font-black shadow-xs">
                        <ArrowDown className="w-4 h-4 text-cyan-600 animate-bounce" />
                        <span>Aliran Data Masukan Disimpan ke RAM untuk Diproses oleh CPU &amp; ALU</span>
                      </div>
                    </div>
                  )}

                  {/* PIPA 2: PROSES */}
                  {(activeIpoFilter === 'all' || activeIpoFilter === 'process') && (
                    <div className="p-5 md:p-6 bg-card rounded-2xl border-2 border-amber-500/60 dark:border-amber-500/40 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between border-b-2 border-amber-500/20 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-mono font-black text-sm shadow-sm">
                            P
                          </div>
                          <div>
                            <h6 className="font-black text-base md:text-lg text-slate-900 dark:text-white">
                              2. RUANG PROSES
                            </h6>
                            <span className="text-xs text-amber-800 dark:text-amber-300 font-bold block">
                              Register CPU / ALU ➔ RAM
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 font-mono text-xs font-black border border-amber-300 dark:border-amber-800 uppercase tracking-wider">
                          PENGOLAHAN
                        </span>
                      </div>

                      <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                        {ipoScenariosData[selectedIpoScenario].processPhase.operation}
                      </p>

                      {/* PERSAMAAN MATEMATIS - SATU BARIS UNTUK SATU PERSAMAAN */}
                      <div className="p-4 md:p-5 bg-amber-50/90 dark:bg-amber-950/40 rounded-xl border-2 border-amber-300 dark:border-amber-800 space-y-3 font-mono">
                        <div className="flex items-center justify-between text-xs border-b border-amber-200 dark:border-amber-800 pb-2">
                          <span className="text-[11px] text-amber-900 dark:text-amber-300 font-black uppercase tracking-wider flex items-center gap-1.5">
                            <Calculator className="w-4 h-4 text-amber-600" /> PERSAMAAN MATEMATIS (SATU BARIS UNTUK SATU PERSAMAAN):
                          </span>
                          <span className="text-[10px] text-slate-500 font-bold hidden sm:inline">Urutan Waktu Eksekusi Bertingkat</span>
                        </div>

                        <div className="space-y-2">
                          {ipoScenariosData[selectedIpoScenario].processPhase.formula.includes('|') ? (
                            ipoScenariosData[selectedIpoScenario].processPhase.formula.split('|').map((eq, idx) => (
                              <div key={idx} className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
                                <div className="flex items-center gap-3">
                                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                                    {idx + 1}
                                  </span>
                                  <span className="font-black text-amber-950 dark:text-amber-200 text-sm md:text-base font-mono">
                                    {eq.trim()}
                                  </span>
                                </div>
                                <span className="text-xs text-slate-600 dark:text-slate-400 font-sans font-medium pl-9 sm:pl-0">
                                  {idx === 0 && 'Tahap 1: Perkalian kuantitas & harga (integer × float → float)'}
                                  {idx === 1 && 'Tahap 2: Menghitung nominal pajak 11% (float × 0.11 → float)'}
                                  {idx === 2 && 'Tahap 3: Total tagihan akhir konsumen (subtotal + PPN → float)'}
                                </span>
                              </div>
                            ))
                          ) : (
                            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-900 font-black text-amber-950 dark:text-amber-200 text-sm md:text-base font-mono">
                              {ipoScenariosData[selectedIpoScenario].processPhase.formula}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* INSTRUKSI PROSEDURAL & KAIDAH CPU */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3.5 bg-slate-100 dark:bg-slate-950 rounded-xl font-mono text-xs md:text-sm text-amber-900 dark:text-amber-300 space-y-2 border border-border dark:border-slate-800">
                          <span className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider block border-b border-border dark:border-slate-800 pb-1.5">
                            Instruksi Prosedural (Kode Universal 1 Baris per Aksi):
                          </span>
                          <div className="space-y-1.5">
                            {ipoScenariosData[selectedIpoScenario].processPhase.universalCode.map((code, idx) => (
                              <div key={idx} className="flex items-center gap-2.5 font-black">
                                <span className="text-amber-600 dark:text-amber-500 font-mono text-xs w-4">{idx + 1}.</span>
                                <span className="text-amber-950 dark:text-amber-100">{code}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-3.5 bg-indigo-500/10 border-2 border-indigo-500/30 rounded-xl text-xs font-semibold text-indigo-950 dark:text-indigo-200 flex flex-col justify-between">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 font-black text-indigo-900 dark:text-indigo-300 text-sm">
                              <Cpu className="w-4 h-4 shrink-0" />
                              <span>Prinsip Eksekusi CPU &amp; ALU:</span>
                            </div>
                            <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                              {ipoScenariosData[selectedIpoScenario].processPhase.pedagogicalRule}
                            </p>
                          </div>
                          <div className="text-[11px] text-indigo-700 dark:text-indigo-400 font-mono font-bold pt-2 border-t border-indigo-500/20">
                            ✓ Tidak ada percabangan logika (sekuensial murni)
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FLOW ARROW 2 -> 3 */}
                  {activeIpoFilter === 'all' && (
                    <div className="flex items-center justify-center -my-1">
                      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border-2 border-amber-500/30 text-amber-800 dark:text-amber-300 font-mono text-xs font-black shadow-xs">
                        <ArrowDown className="w-4 h-4 text-amber-600 animate-bounce" />
                        <span>Aliran Nilai Hasil Komputasi Disimpan di Variabel Terikat Menuju Saluran Output</span>
                      </div>
                    </div>
                  )}

                  {/* PIPA 3: OUTPUT */}
                  {(activeIpoFilter === 'all' || activeIpoFilter === 'output') && (
                    <div className="p-5 md:p-6 bg-card rounded-2xl border-2 border-emerald-500/60 dark:border-emerald-500/40 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between border-b-2 border-emerald-500/20 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-mono font-black text-sm shadow-sm">
                            O
                          </div>
                          <div>
                            <h6 className="font-black text-base md:text-lg text-slate-900 dark:text-white">
                              3. SALURAN OUTPUT
                            </h6>
                            <span className="text-xs text-emerald-800 dark:text-emerald-300 font-bold block">
                              Memori RAM ➔ Monitor / Layar Struk Kasir
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 font-mono text-xs font-black border border-emerald-300 dark:border-emerald-800 uppercase tracking-wider">
                          KELUARAN
                        </span>
                      </div>

                      <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                        Menyerahkan variabel terikat atau hasil evaluasi kepada pengguna:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Kolom Kiri: Variabel Terikat */}
                        <div className="space-y-2">
                          <span className="text-[11px] font-mono font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
                            Daftar Variabel Terikat Hasil Komputasi:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {ipoScenariosData[selectedIpoScenario].outputPhase.resultVars.map((v, i) => (
                              <div key={i} className="p-3 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60 flex flex-col justify-between text-xs font-mono">
                                <div>
                                  <span className="font-black text-emerald-900 dark:text-emerald-200 text-sm block">
                                    {v.name}
                                  </span>
                                  <span className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold block mt-0.5">
                                    {v.label}
                                  </span>
                                </div>
                                <span className="mt-2 px-2.5 py-1 bg-background rounded-lg font-bold text-slate-800 dark:text-slate-200 border border-border self-start">
                                  {v.type} ({v.unit})
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Kolom Kanan: Notasi Universal & Kaidah */}
                        <div className="space-y-2.5">
                          <div className="p-3 bg-slate-100 dark:bg-slate-950 rounded-xl font-mono text-xs text-emerald-800 dark:text-emerald-300 space-y-1 border border-border dark:border-slate-800">
                            <span className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider block">
                              Notasi Universal (1 Baris per Keluaran):
                            </span>
                            <div className="space-y-1">
                              {ipoScenariosData[selectedIpoScenario].outputPhase.universalCode.map((code, idx) => (
                                <div key={idx} className="font-black font-mono flex items-center gap-2">
                                  <span className="text-emerald-600 dark:text-emerald-500 font-bold text-xs">{idx + 1}.</span>
                                  <span>{code}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="p-2.5 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl text-xs font-semibold text-emerald-950 dark:text-emerald-200 flex items-start gap-2">
                            <MonitorPlay className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <p className="text-[11px] leading-relaxed">
                              <strong className="text-emerald-900 dark:text-emerald-300">Penyajian Nilai Terikat:</strong> {ipoScenariosData[selectedIpoScenario].outputPhase.pedagogicalRule}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Transformation Grid to 3 Tri-Blueprint */}
                <div className="p-5 md:p-6 bg-background rounded-2xl border-2 border-border space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-xs md:text-sm font-mono font-black text-amber-800 dark:text-amber-300 uppercase tracking-wide flex items-center gap-2">
                      <Workflow className="w-4 h-4" /> BAGAIMANA POLA IPO INI DITUANGKAN KE 3 FORMAT CETAK BIRU?
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold hidden sm:inline">
                      Semua Berasal dari Alur IPO yang Sama
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
                    {/* 1. Naratif Mapping */}
                    <div className="p-4 md:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-border space-y-3 flex flex-col justify-between shadow-sm">
                      <div className="space-y-1.5">
                        <div className="font-black text-slate-900 dark:text-white flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-emerald-600" /> 1. Algoritma Naratif
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 uppercase">
                            BAHASA MANUSIA
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                          Bahasa alami terstruktur bernomor urut 1 sampai 5 yang mencerminkan urutan waktu pemrosesan, diakhiri penutup tanpa nomor urut.
                        </p>
                      </div>
                      <pre className="p-3 bg-white dark:bg-slate-900 rounded-xl font-mono text-[11px] text-emerald-900 dark:text-emerald-300 border border-border whitespace-pre-wrap font-bold leading-relaxed overflow-x-auto shadow-inner max-h-[220px]">
{ipoScenariosData[selectedIpoScenario].triBlueprintSummary.naratif}
                      </pre>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-bold">
                          ✓ Prosedur bebas ambiguitas
                        </span>
                        <button
                          onClick={() => {
                            setDesignBlueprintView('naratif');
                            const el = document.getElementById('blueprint-simulator-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-[11px] text-primary hover:underline font-extrabold flex items-center gap-1 cursor-pointer"
                        >
                          Buka Detail &darr;
                        </button>
                      </div>
                    </div>

                    {/* 2. Flowchart Mapping - REAL VISUAL ANSI FLOWCHART DIAGRAM */}
                    <div className="p-4 md:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-amber-500/50 space-y-3 flex flex-col justify-between shadow-sm">
                      <div className="space-y-1.5">
                        <div className="font-black text-slate-900 dark:text-white flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <Workflow className="w-4 h-4 text-amber-600" /> 2. Flowchart ANSI / ISO
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 uppercase">
                            DIAGRAM VISUAL
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                          Alur disajikan dengan simbol grafis spasial baku: <strong>Oval</strong> (terminator), <strong>Jajar Genjang</strong> (I/O), dan <strong>Persegi Panjang</strong> (proses komputasi).
                        </p>
                      </div>

                      {/* Mini Visual Flowchart Diagram with Real ANSI Shapes */}
                      <div className="p-3 bg-white dark:bg-slate-900/90 rounded-xl border border-border shadow-inner flex flex-col items-center gap-1 font-mono text-[11px]">
                        {/* Terminator Mulai */}
                        <div className="px-4 py-0.5 rounded-full bg-emerald-600 text-white font-black text-[10px] shadow-xs flex items-center gap-1">
                          <span>●</span> MULAI
                        </div>

                        {/* Flow Arrow */}
                        <div className="flex flex-col items-center justify-center my-0 text-slate-500 dark:text-slate-400 shrink-0">
                          <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                            <line x1="5" y1="0" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <polygon points="5,13 1.5,8 8.5,8" fill="currentColor" />
                          </svg>
                        </div>

                        {/* Parallelogram Input */}
                        <div className="px-2.5 py-1 bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-500 text-cyan-950 dark:text-cyan-100 font-black rounded -skew-x-12 shadow-xs text-center text-[10px]">
                          <div className="skew-x-12 flex items-center gap-1 justify-center">
                            <span className="text-[9px] text-cyan-700 dark:text-cyan-400 font-bold uppercase">INPUT:</span>
                            <span>input(jumlahBarang, hargaSatuan)</span>
                          </div>
                        </div>

                        {/* Flow Arrow */}
                        <div className="flex flex-col items-center justify-center my-0 text-slate-500 dark:text-slate-400 shrink-0">
                          <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                            <line x1="5" y1="0" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <polygon points="5,13 1.5,8 8.5,8" fill="currentColor" />
                          </svg>
                        </div>

                        {/* Rectangle Process */}
                        <div className="w-full px-2 py-1 bg-amber-100 dark:bg-amber-950/80 border border-amber-500 text-amber-950 dark:text-amber-100 font-black rounded shadow-xs text-center text-[10px] space-y-0.5">
                          <span className="text-[9px] text-amber-700 dark:text-amber-400 font-bold uppercase block">PROSES ARITMATIKA:</span>
                          <div className="truncate">subtotal = jumlahBarang * hargaSatuan</div>
                          <div className="truncate">nominalPpn = subtotal * 0.11</div>
                          <div className="truncate">totalBayar = subtotal + nominalPpn</div>
                        </div>

                        {/* Flow Arrow */}
                        <div className="flex flex-col items-center justify-center my-0 text-slate-500 dark:text-slate-400 shrink-0">
                          <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                            <line x1="5" y1="0" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <polygon points="5,13 1.5,8 8.5,8" fill="currentColor" />
                          </svg>
                        </div>

                        {/* Parallelogram Output */}
                        <div className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-500 text-emerald-950 dark:text-emerald-100 font-black rounded -skew-x-12 shadow-xs text-center text-[10px]">
                          <div className="skew-x-12 flex items-center gap-1 justify-center">
                            <span className="text-[9px] text-emerald-700 dark:text-emerald-400 font-bold uppercase">OUTPUT:</span>
                            <span>output(subtotal, nominalPpn, totalBayar)</span>
                          </div>
                        </div>

                        {/* Flow Arrow */}
                        <div className="flex flex-col items-center justify-center my-0 text-slate-500 dark:text-slate-400 shrink-0">
                          <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                            <line x1="5" y1="0" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <polygon points="5,13 1.5,8 8.5,8" fill="currentColor" />
                          </svg>
                        </div>

                        {/* Terminator Selesai */}
                        <div className="px-4 py-0.5 rounded-full bg-rose-600 text-white font-black text-[10px] shadow-xs flex items-center gap-1">
                          <span>■</span> SELESAI
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-amber-800 dark:text-amber-300 font-bold">
                          ✓ Runtutan sekuensial lurus
                        </span>
                        <button
                          onClick={() => {
                            setDesignBlueprintView('flowchart');
                            const el = document.getElementById('blueprint-simulator-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-[11px] text-primary hover:underline font-extrabold flex items-center gap-1 cursor-pointer"
                        >
                          Buka Detail &darr;
                        </button>
                      </div>
                    </div>

                    {/* 3. Pseudocode Mapping */}
                    <div className="p-4 md:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-border space-y-3 flex flex-col justify-between shadow-sm">
                      <div className="space-y-1.5">
                        <div className="font-black text-slate-900 dark:text-white flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <FileCode2 className="w-4 h-4 text-cyan-600" /> 3. Pseudocode CLRS
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-500/30 uppercase">
                            TEKS STRUKTURAL
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                          Bahasa semu 3 blok baku (Cormen et al.): <strong>KAMUS</strong> mendeklarasikan tipe data, <strong>ALGORITMA</strong> mengeksekusi instruksi sekuensial.
                        </p>
                      </div>
                      <pre className="p-3 bg-white dark:bg-slate-900 rounded-xl font-mono text-[11px] text-cyan-900 dark:text-cyan-300 border border-border whitespace-pre-wrap font-bold leading-relaxed overflow-x-auto shadow-inner max-h-[220px]">
{ipoScenariosData[selectedIpoScenario].triBlueprintSummary.pseudocode}
                      </pre>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-cyan-800 dark:text-cyan-300 font-bold">
                          ✓ Standar akademik 3 blok
                        </span>
                        <button
                          onClick={() => {
                            setDesignBlueprintView('pseudocode');
                            const el = document.getElementById('blueprint-simulator-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-[11px] text-primary hover:underline font-extrabold flex items-center gap-1 cursor-pointer"
                        >
                          Buka Detail &darr;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MOMEN KUNCI IPO CALLOUT */}
                <div className="p-5 md:p-6 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border-2 border-amber-400 dark:border-amber-500/60 space-y-2.5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-amber-600 text-white font-black text-xs flex items-center gap-1.5 shadow-md">
                      <Sparkles className="w-5 h-5" /> MOMEN KUNCI IPO
                    </div>
                    <h6 className="font-black text-slate-900 dark:text-white text-base md:text-lg">
                      Tahap Analisis Menemukan 'Bahan Masalah' (Data), Algoritma IPO Mengatur 'Urutan Memasak' (Waktu)!
                    </h6>
                  </div>
                  <p className="text-slate-900 dark:text-slate-100 text-sm md:text-base leading-relaxed font-medium">
                    Ibarat seorang koki di dapur: Tahap Analisis adalah proses mengumpulkan resep dan bahan baku (tepung, gula, telur, oven). Tetapi tumpukan bahan tersebut tidak akan pernah menjadi kue jika Anda tidak menyusun <em>prosedur memasaknya</em>! Di Tahap Desain Solusi, <strong className="text-amber-950 dark:text-amber-300 font-black">Pola IPO mengatur urutan waktu</strong>: Pertama masukkan bahan (Input), kedua aduk dan panggang di oven (Proses), ketiga sajikan kue hangat di atas meja makan (Output). Ketiga representasi cetak biru di bawah ini (Flowchart, Pseudocode, Naratif) hanyalah tiga cara berbeda dalam mendokumentasikan urutan IPO tersebut!
                  </p>
                </div>
              </div>

              {/* BAGIAN B: SIMULATOR CETAK BIRU TRI-PERSPEKTIF INTERAKTIF */}
              <div id="blueprint-simulator-section" className="p-6 md:p-7 bg-slate-50/90 dark:bg-slate-900/60 rounded-2xl border-2 border-amber-300 dark:border-amber-700/60 space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-600 text-white font-mono font-black text-xs uppercase tracking-wider mb-1.5 shadow-sm">
                      <Workflow className="w-3.5 h-3.5" /> BAGIAN B: CETAK BIRU LENGKAP
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-600 animate-pulse"></span>
                      <h5 className="font-black text-lg md:text-xl text-slate-900 dark:text-white">
                        Simulator Cetak Biru Tri-Perspektif (Interactive Tri-Blueprint)
                      </h5>
                    </div>
                    <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-bold mt-1">
                      Studi Kasus: <strong className="text-amber-900 dark:text-amber-300">Sistem Kasir Penjualan Grosir (Faktur Pajak PPN 11%)</strong>
                    </p>
                  </div>

                  {/* Switcher 3 Representasi */}
                  <div className="inline-flex p-1.5 bg-background rounded-xl border-2 border-border shadow-sm shrink-0">
                    <button
                      onClick={() => setDesignBlueprintView('naratif')}
                      className={`px-3.5 py-2 rounded-lg text-xs md:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                        designBlueprintView === 'naratif'
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'text-slate-800 dark:text-slate-200 hover:text-foreground'
                      }`}
                    >
                      <FileText className="w-4 h-4" /> 1. Algoritma Naratif
                    </button>
                    <button
                      onClick={() => setDesignBlueprintView('flowchart')}
                      className={`px-3.5 py-2 rounded-lg text-xs md:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                        designBlueprintView === 'flowchart'
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'text-slate-800 dark:text-slate-200 hover:text-foreground'
                      }`}
                    >
                      <Workflow className="w-4 h-4" /> 2. Flowchart ANSI
                    </button>
                    <button
                      onClick={() => setDesignBlueprintView('pseudocode')}
                      className={`px-3.5 py-2 rounded-lg text-xs md:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                        designBlueprintView === 'pseudocode'
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'text-slate-800 dark:text-slate-200 hover:text-foreground'
                      }`}
                    >
                      <FileCode2 className="w-4 h-4" /> 3. Pseudocode CLRS
                    </button>
                  </div>
                </div>

                {/* VIEW 1: FLOWCHART ANSI / ISO (SEKUENSIAL MURNI) */}
                {designBlueprintView === 'flowchart' && (
                  <motion.div
                    key="view-flowchart"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-background rounded-2xl border-2 border-border space-y-5 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs md:text-sm pb-3 border-b-2 border-border gap-1">
                      <span className="font-mono font-black text-amber-800 dark:text-amber-300 flex items-center gap-2 uppercase tracking-wide">
                        <Workflow className="w-4 h-4" /> NOTASI STANDAR ANSI/ISO FLOWCHART (ALUR SEKUENSIAL)
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 font-extrabold">Eksekusi Runtutan: Jajar Genjang Input/Output &bull; Persegi Panjang Komputasi</span>
                    </div>

                    {/* Flowchart Diagram Layout - Sequential Vertical */}
                    <div className="flex flex-col items-center gap-3 py-4 max-w-lg mx-auto font-mono text-xs md:text-sm">
                      {/* Terminator MULAI */}
                      <div className="px-7 py-2 rounded-full bg-emerald-600 text-white font-black tracking-wider shadow-md flex items-center gap-2 text-sm">
                        <span>●</span> MULAI
                      </div>

                      {/* Panah */}
                      <div className="flex flex-col items-center">
                        <div className="w-1 h-4 bg-slate-500 dark:bg-slate-400"></div>
                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-slate-500 dark:border-t-slate-400"></div>
                      </div>

                      {/* Input Jajar Genjang */}
                      <div className="relative px-6 py-2.5 bg-cyan-100 dark:bg-cyan-950/70 border-2 border-cyan-500 text-cyan-950 dark:text-cyan-100 font-black rounded-lg -skew-x-12 shadow-sm text-center">
                        <div className="skew-x-12 flex items-center gap-2">
                          <span className="text-[11px] text-cyan-700 dark:text-cyan-400 font-bold uppercase">INPUT:</span>
                          <span className="text-xs md:text-sm">input(jumlahBarang, hargaSatuan)</span>
                        </div>
                      </div>

                      {/* Panah */}
                      <div className="flex flex-col items-center">
                        <div className="w-1 h-4 bg-slate-500 dark:bg-slate-400"></div>
                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-slate-500 dark:border-t-slate-400"></div>
                      </div>

                      {/* Kotak Proses 1: Subtotal */}
                      <div className="w-full max-w-sm px-5 py-2.5 bg-amber-100 dark:bg-amber-950/70 border-2 border-amber-500 text-amber-950 dark:text-amber-100 font-black rounded-xl shadow-sm text-center">
                        <span className="text-[10px] text-amber-700 dark:text-amber-400 font-bold uppercase block">PROSES 1 (PERKALIAN):</span>
                        <span className="text-xs md:text-sm font-mono">subtotal = jumlahBarang * hargaSatuan</span>
                      </div>

                      {/* Panah */}
                      <div className="flex flex-col items-center">
                        <div className="w-1 h-4 bg-slate-500 dark:bg-slate-400"></div>
                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-slate-500 dark:border-t-slate-400"></div>
                      </div>

                      {/* Kotak Proses 2: Nominal PPN */}
                      <div className="w-full max-w-sm px-5 py-2.5 bg-amber-100 dark:bg-amber-950/70 border-2 border-amber-500 text-amber-950 dark:text-amber-100 font-black rounded-xl shadow-sm text-center">
                        <span className="text-[10px] text-amber-700 dark:text-amber-400 font-bold uppercase block">PROSES 2 (PAJAK PPN 11%):</span>
                        <span className="text-xs md:text-sm font-mono">nominalPpn = subtotal * 0.11</span>
                      </div>

                      {/* Panah */}
                      <div className="flex flex-col items-center">
                        <div className="w-1 h-4 bg-slate-500 dark:bg-slate-400"></div>
                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-slate-500 dark:border-t-slate-400"></div>
                      </div>

                      {/* Kotak Proses 3: Total Bayar */}
                      <div className="w-full max-w-sm px-5 py-2.5 bg-amber-100 dark:bg-amber-950/70 border-2 border-amber-500 text-amber-950 dark:text-amber-100 font-black rounded-xl shadow-sm text-center">
                        <span className="text-[10px] text-amber-700 dark:text-amber-400 font-bold uppercase block">PROSES 3 (PENJUMLAHAN):</span>
                        <span className="text-xs md:text-sm font-mono">totalBayar = subtotal + nominalPpn</span>
                      </div>

                      {/* Panah */}
                      <div className="flex flex-col items-center">
                        <div className="w-1 h-4 bg-slate-500 dark:bg-slate-400"></div>
                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-slate-500 dark:border-t-slate-400"></div>
                      </div>

                      {/* Output Jajar Genjang */}
                      <div className="relative px-6 py-2.5 bg-emerald-100 dark:bg-emerald-950/70 border-2 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-black rounded-lg -skew-x-12 shadow-sm text-center">
                        <div className="skew-x-12 flex items-center gap-2">
                          <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold uppercase">OUTPUT:</span>
                          <span className="text-xs md:text-sm">output(subtotal, nominalPpn, totalBayar)</span>
                        </div>
                      </div>

                      {/* Panah */}
                      <div className="flex flex-col items-center">
                        <div className="w-1 h-4 bg-slate-500 dark:bg-slate-400"></div>
                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-slate-500 dark:border-t-slate-400"></div>
                      </div>

                      {/* Terminator SELESAI */}
                      <div className="px-7 py-2 rounded-full bg-rose-600 text-white font-black tracking-wider shadow-md flex items-center gap-2 text-sm">
                        <span>■</span> SELESAI
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* VIEW 2: PSEUDOCODE CLRS BAKU (SEKUENSIAL MURNI) */}
                {designBlueprintView === 'pseudocode' && (
                  <motion.div
                    key="view-pseudocode"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-background rounded-2xl border-2 border-border space-y-4 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs md:text-sm pb-3 border-b-2 border-border gap-1">
                      <span className="font-mono font-black text-amber-800 dark:text-amber-300 flex items-center gap-2 uppercase tracking-wide">
                        <FileCode2 className="w-4 h-4" /> PSEUDOCODE BAKU (STANDAR 3 BLOK CLRS &amp; BAB 3)
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 font-extrabold">PROGRAM &bull; KAMUS: &bull; ALGORITMA:</span>
                    </div>

                    <div className="p-5 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl font-mono text-sm md:text-base leading-relaxed overflow-x-auto shadow-inner border-2 border-border dark:border-slate-800">
                      <div className="text-emerald-700 dark:text-emerald-400 font-black">PROGRAM KasirGrosir <span className="text-slate-500 dark:text-slate-400 font-normal">// Menghitung faktur penjualan grosir &amp; PPN 11%</span></div>
                      <div className="pt-2 text-purple-700 dark:text-purple-400 font-black">KAMUS:</div>
                      <div className="pl-6 space-y-0.5 text-slate-700 dark:text-slate-200 font-semibold text-xs md:text-sm">
                        <div><span className="text-amber-700 dark:text-amber-400 font-bold">const</span> TARIF_PPN : <span className="text-cyan-700 dark:text-cyan-400 font-bold">real</span> = 0.11 <span className="text-slate-500 dark:text-slate-400 font-normal">// tetapan pajak 11%</span></div>
                        <div>jumlahBarang : <span className="text-cyan-700 dark:text-cyan-400 font-bold">integer</span> <span className="text-slate-500 dark:text-slate-400 font-normal">// kuantitas barang utuh (bilangan bulat)</span></div>
                        <div>hargaSatuan, subtotal, nominalPpn, totalBayar : <span className="text-cyan-700 dark:text-cyan-400 font-bold">real</span> <span className="text-slate-500 dark:text-slate-400 font-normal">// nilai moneter (pecahan)</span></div>
                      </div>
                      <div className="pt-2 text-amber-700 dark:text-amber-400 font-black">ALGORITMA:</div>
                      <div className="pl-6 space-y-1 font-semibold text-xs md:text-sm">
                        <div className="text-cyan-800 dark:text-cyan-300 font-bold">input(jumlahBarang)</div>
                        <div className="text-cyan-800 dark:text-cyan-300 font-bold">input(hargaSatuan)</div>
                        <div className="text-amber-800 dark:text-amber-300 font-bold">subtotal = jumlahBarang * hargaSatuan</div>
                        <div className="text-amber-800 dark:text-amber-300 font-bold">nominalPpn = subtotal * TARIF_PPN</div>
                        <div className="text-amber-800 dark:text-amber-300 font-bold">totalBayar = subtotal + nominalPpn</div>
                        <div className="text-emerald-800 dark:text-emerald-300 font-bold">output("Subtotal   : Rp ", subtotal)</div>
                        <div className="text-emerald-800 dark:text-emerald-300 font-bold">output("PPN (11%)  : Rp ", nominalPpn)</div>
                        <div className="text-emerald-800 dark:text-emerald-300 font-bold">output("Total Bayar: Rp ", totalBayar)</div>
                      </div>
                    </div>

                    <div className="p-3.5 bg-secondary/70 rounded-xl text-xs md:text-sm text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-2.5 border border-border">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>
                        <strong className="text-foreground">Kepatuhan Standar:</strong> Format 3 blok lengkap (PROGRAM, KAMUS, ALGORITMA), pemisahan tipe <code className="text-amber-800 dark:text-amber-300 font-black">integer</code> vs <code className="text-amber-800 dark:text-amber-300 font-black">real</code>, instruksi universal <code className="text-amber-800 dark:text-amber-300 font-black">input()</code>/<code className="text-amber-800 dark:text-amber-300 font-black">output()</code>, dan alur sekuensial murni.
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* VIEW 3: ALGORITMA NARATIF FORMAL (SEKUENSIAL MURNI) */}
                {designBlueprintView === 'naratif' && (
                  <motion.div
                    key="view-naratif"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-background rounded-2xl border-2 border-border space-y-4 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs md:text-sm pb-3 border-b-2 border-border gap-1">
                      <span className="font-mono font-black text-amber-800 dark:text-amber-300 flex items-center gap-2 uppercase tracking-wide">
                        <FileText className="w-4 h-4" /> ALGORITMA NARATIF (BAHASA ALAMI TERSTRUKTUR)
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 font-extrabold">Aturan: Bernomor Urut Runtutan, 'Selesai' Tanpa Nomor</span>
                    </div>

                    <div className="p-6 bg-background rounded-xl border-2 border-border space-y-3 font-sans text-sm md:text-base">
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-mono font-black flex items-center justify-center shrink-0 text-sm shadow-sm">
                          1
                        </span>
                        <div className="text-slate-900 dark:text-slate-100 font-semibold pt-0.5">
                          Minta masukan kuantitas barang yang dibeli (<code className="font-mono text-cyan-700 dark:text-cyan-400 font-black">jumlahBarang</code> [bilangan bulat]) dan harga per unit barang (<code className="font-mono text-cyan-700 dark:text-cyan-400 font-black">hargaSatuan</code> [pecahan]).
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-mono font-black flex items-center justify-center shrink-0 text-sm shadow-sm">
                          2
                        </span>
                        <div className="text-slate-900 dark:text-slate-100 font-semibold pt-0.5">
                          Hitung subtotal kotor belanja dengan rumus: <code className="font-mono text-amber-800 dark:text-amber-300 font-black">subtotal = jumlahBarang &times; hargaSatuan</code>.
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-mono font-black flex items-center justify-center shrink-0 text-sm shadow-sm">
                          3
                        </span>
                        <div className="text-slate-900 dark:text-slate-100 font-semibold pt-0.5">
                          Hitung nominal pajak PPN 11% menggunakan tetapan baku: <code className="font-mono text-amber-800 dark:text-amber-300 font-black">nominalPpn = subtotal &times; 0.11</code>.
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-mono font-black flex items-center justify-center shrink-0 text-sm shadow-sm">
                          4
                        </span>
                        <div className="text-slate-900 dark:text-slate-100 font-semibold pt-0.5">
                          Hitung total bayar akhir yang harus dibayar pembeli: <code className="font-mono text-emerald-700 dark:text-emerald-400 font-black">totalBayar = subtotal + nominalPpn</code>.
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-mono font-black flex items-center justify-center shrink-0 text-sm shadow-sm">
                          5
                        </span>
                        <div className="text-slate-900 dark:text-slate-100 font-semibold pt-0.5">
                          Tampilkan rincian subtotal, nominal PPN, dan total bayar ke layar monitor kasir dan cetak struk belanja pelanggan.
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2 text-slate-700 dark:text-slate-300 font-black text-sm uppercase tracking-wider">
                        <span className="w-7 flex justify-center text-rose-600 font-mono text-lg">■</span>
                        <span>Selesai.</span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-secondary/70 rounded-xl text-xs md:text-sm text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-2.5 border border-border">
                      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>
                        <strong className="text-foreground">Kaidah Baku:</strong> Algoritma sekuensial bernomor urut runtutan 1 sampai 5 yang mencerminkan eksekusi waktu, dan baris penutup <em>Selesai.</em> tidak diberi nomor urut.
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* MOMEN AHA #3 */}
              <div className="p-5 md:p-6 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border-2 border-amber-400 dark:border-amber-500/60 space-y-2.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-600 text-white font-black text-xs flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-5 h-5" /> MOMEN AHA #3
                  </div>
                  <h6 className="font-black text-slate-900 dark:text-white text-base md:text-lg">
                    Cetak Biru adalah Kembar Tiga: Konten Sama, Wadah Berbeda!
                  </h6>
                </div>
                <p className="text-slate-900 dark:text-slate-100 text-sm md:text-base leading-relaxed font-medium">
                  Banyak mahasiswa mengeluh karena merasa harus menghafal tiga materi terpisah: Naratif, Flowchart, dan Pseudocode. <strong className="text-amber-950 dark:text-amber-300 font-black">AHA! Ketiganya sebenarnya adalah SATU SOLUSI LOGIKA YANG SAMA!</strong> Flowchart memetakan alur secara visual spasial untuk mata kita, sedangkan Pseudocode menyusun struktur baris demi baris untuk persiapan coding. Jika Anda paham inti logikanya, berpindah dari Flowchart ke Pseudocode semudah membaca peta yang sama dengan gaya navigasi berbeda!
                </p>
              </div>

              {/* Prinsip Emas */}
              <div className="p-5 bg-amber-100/70 dark:bg-amber-950/50 rounded-2xl border-2 border-amber-500/50 text-xs md:text-sm font-semibold flex items-start gap-3.5 shadow-sm">
                <Flame className="w-6 h-6 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-950 dark:text-amber-200 block text-base font-black mb-0.5">Prinsip Emas Arsitektur Algoritma:</strong>
                  <span className="text-amber-950 dark:text-amber-100">
                    Jika Anda belum bisa menggambar atau menjelaskan langkah-langkah penyelesaian masalah secara terstruktur di atas kertas atau whiteboard, maka Anda <em>belum siap</em> membuka IDE dan mengetik kode di komputer!
                  </span>
                </div>
              </div>

              {/* TOMBOL NAVIGASI TAHAP 2 */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/80">
                <button
                  onClick={() => handleStageChange(1)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-slate-800 dark:text-slate-200 font-extrabold text-sm flex items-center justify-center gap-2 border border-border cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali ke Tahap 1: Analisis</span>
                </button>
                <button
                  onClick={() => handleStageChange(3)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-sm md:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-amber-600/30 transition-all hover:translate-x-1 cursor-pointer"
                >
                  <span>Lanjut ke Tahap 3: Implementasi Kode (Coding)</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {activeStage === 3 && (
            <motion.div
              key="stage-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-6 md:p-8 bg-card border-2 border-cyan-500/40 rounded-2xl space-y-8 shadow-sm"
            >
              {/* Header Stage 3 */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border-2 border-cyan-500/30 text-xs md:text-sm font-mono font-black uppercase tracking-wider mb-2">
                    <Code2 className="w-4 h-4" /> TAHAP 3: IMPLEMENTASI KODE (TRANSKRIPSI MEKANIS)
                  </div>
                  <h4 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    Transkripsi 1:1: Dari Desain ke Kode Mesin
                  </h4>
                  <p className="text-slate-800 dark:text-slate-200 text-sm md:text-base mt-2 font-medium max-w-3xl leading-relaxed">
                    Coding di depan komputer adalah pekerjaan hilir yang mekanis. Saat pseudocode dan variabel sudah tuntas, menulis kode hanyalah menerjemahkan setiap baris logika ke dalam tata bahasa (sintaksis) bahasa pemrograman target.
                  </p>
                </div>
                <div className="p-3.5 bg-cyan-500/15 rounded-2xl text-cyan-700 dark:text-cyan-300 shrink-0 self-start border-2 border-cyan-500/30 shadow-sm">
                  <TerminalSquare className="w-8 h-8" />
                </div>
              </div>

              {/* SIMULATOR LIVE ROSETTA TRANSCRIBER */}
              <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border-2 border-cyan-500/40 space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></span>
                      <h5 className="font-black text-lg md:text-xl text-slate-900 dark:text-white">
                        Penerjemah Rosetta Interaktif (Live 1:1 Transcriber)
                      </h5>
                    </div>
                    <p className="text-sm text-slate-800 dark:text-slate-200 font-semibold mt-1">
                      Klik salah satu baris di bawah untuk melihat bagaimana instruksi logika diterjemahkan secara mekanis:
                    </p>
                  </div>

                  {/* Language Selector */}
                  <div className="inline-flex p-1.5 bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-300 dark:border-slate-700 shadow-sm shrink-0">
                    <button
                      onClick={() => setTranscriptionLang('python')}
                      className={`px-3.5 py-2 rounded-lg text-xs md:text-sm font-extrabold transition-all ${
                        transcriptionLang === 'python'
                          ? 'bg-cyan-600 text-white font-black shadow-md'
                          : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      Python 3
                    </button>
                    <button
                      onClick={() => setTranscriptionLang('cpp')}
                      className={`px-3.5 py-2 rounded-lg text-xs md:text-sm font-extrabold transition-all ${
                        transcriptionLang === 'cpp'
                          ? 'bg-cyan-600 text-white font-black shadow-md'
                          : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      C++ (ISO)
                    </button>
                    <button
                      onClick={() => setTranscriptionLang('javascript')}
                      className={`px-3.5 py-2 rounded-lg text-xs md:text-sm font-extrabold transition-all ${
                        transcriptionLang === 'javascript'
                          ? 'bg-cyan-600 text-white font-black shadow-md'
                          : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      JavaScript (ES6)
                    </button>
                  </div>
                </div>

                {/* Dual Column Code Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left: Pseudocode CLRS */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs md:text-sm px-2 font-mono font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      <span>CETAK BIRU: PSEUDOCODE BAKU</span>
                      <span>STANDAR CLRS</span>
                    </div>
                    <div className="p-3.5 bg-white dark:bg-slate-950 rounded-xl border-2 border-border dark:border-slate-800 space-y-1.5 font-mono text-xs md:text-sm">
                      {rosettaLines.map((row, idx) => {
                        const isSelected = activeRosettaLine === idx;
                        return (
                          <div
                            key={`pseudo-${idx}`}
                            onClick={() => setActiveRosettaLine(idx)}
                            className={`p-2.5 rounded-lg cursor-pointer transition-all flex items-center justify-between gap-2 ${
                              isSelected
                                ? 'bg-cyan-500/15 dark:bg-cyan-500/25 text-cyan-900 dark:text-cyan-200 border-2 border-cyan-500 font-black shadow-sm'
                                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-foreground dark:hover:text-white font-medium'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-slate-500 dark:text-slate-400 font-bold w-5 text-right text-xs md:text-sm">{row.lineNum}</span>
                              <span className="leading-relaxed">{row.pseudo}</span>
                            </div>
                            {isSelected && (
                              <ArrowRight className="w-4 h-4 text-cyan-600 dark:text-cyan-300 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Target Language */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs md:text-sm px-2 font-mono font-black text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
                      <span>KODE MESIN: {transcriptionLang.toUpperCase()}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">Sintaksis Terpadu</span>
                    </div>
                    <div className="p-3.5 bg-white dark:bg-slate-950 rounded-xl border-2 border-border dark:border-slate-800 space-y-1.5 font-mono text-xs md:text-sm">
                      {rosettaLines.map((row, idx) => {
                        const isSelected = activeRosettaLine === idx;
                        const codeText = transcriptionLang === 'python' 
                          ? row.python 
                          : transcriptionLang === 'cpp' 
                            ? row.cpp 
                            : row.javascript;

                        return (
                          <div
                            key={`code-${idx}`}
                            onClick={() => setActiveRosettaLine(idx)}
                            className={`p-2.5 rounded-lg cursor-pointer transition-all flex items-center justify-between gap-2 ${
                              isSelected
                                ? 'bg-cyan-500/15 dark:bg-cyan-500/25 text-emerald-900 dark:text-emerald-300 border-2 border-cyan-500 font-black shadow-sm'
                                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-foreground dark:hover:text-white font-medium'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-slate-500 dark:text-slate-400 font-bold w-5 text-right text-xs md:text-sm">{row.lineNum}</span>
                              <span className={`leading-relaxed ${isSelected ? 'text-emerald-800 dark:text-emerald-300 font-black' : 'text-slate-800 dark:text-slate-200 font-medium'}`}>{codeText}</span>
                            </div>
                            {isSelected && (
                              <span className="text-xs uppercase font-mono font-black px-2 py-0.5 rounded bg-cyan-500 text-slate-950 shadow-sm shrink-0">
                                Baris Aktif
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Dynamic Transcription Rule Inspector */}
                <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border-2 border-cyan-500/50 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="font-black text-cyan-800 dark:text-cyan-300 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-600" /> KAIDAH TRANSKRIPSI BARIS #{activeRosettaLine + 1}
                    </span>
                    <span className="font-mono text-slate-700 dark:text-slate-300 text-xs md:text-sm font-bold">
                      {rosettaLines[activeRosettaLine].pseudo} &rarr; {transcriptionLang.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-slate-900 dark:text-slate-100 font-semibold leading-relaxed">
                    {rosettaLines[activeRosettaLine].desc[transcriptionLang]}
                  </p>
                </div>
              </div>

              {/* MOMEN AHA #4 */}
              <div className="p-6 bg-gradient-to-r from-cyan-50 via-sky-50 to-cyan-50/50 dark:from-cyan-950/40 dark:via-sky-950/30 dark:to-cyan-950/20 rounded-2xl border-2 border-cyan-500 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-lg bg-cyan-700 text-white font-black text-xs md:text-sm flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="w-4 h-4" /> MOMEN AHA #4
                  </div>
                  <h6 className="font-black text-slate-950 dark:text-slate-50 text-base md:text-lg">
                    Coding Hanyalah 10% Pekerjaan: Transkripsi Mekanis, Bukan Pusing Logika!
                  </h6>
                </div>
                <p className="text-slate-900 dark:text-slate-100 text-sm md:text-base leading-relaxed font-medium">
                  Pernahkah Anda duduk terpaku di depan layar kosong editor kode selama berjam-jam tanpa tahu harus mengetik apa? Kebuntuan itu bukan karena Anda tidak berbakat di bidang komputer, melainkan karena Anda <strong>mencoba memikirkan logika dan sintaksis bahasa secara bersamaan!</strong> Saat pseudocode dan analisis variabel sudah beres di Tahap 1 &amp; 2, coding berubah 180&deg; menjadi pekerjaan santai: tinggal mengganti kata per kata mengikuti kamus sintaksis bahasa tujuan!
                </p>
              </div>

              {/* Kepatuhan Tata Bahasa Tip */}
              <div className="p-5 bg-cyan-100/70 dark:bg-cyan-950/50 rounded-2xl border-2 border-cyan-500/50 text-sm md:text-base font-semibold flex items-start gap-3.5 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-cyan-700 dark:text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cyan-950 dark:text-cyan-200 block text-base font-black mb-1">Fokus Tahap Implementasi: Kepatuhan Tata Bahasa (Syntax Rules)</strong>
                  <span className="text-cyan-950 dark:text-cyan-100 leading-relaxed font-medium">
                    Di tahap ini, perhatian kita tertuju penuh pada kebersihan sintaks: tanda titik dua (<code className="font-bold text-cyan-800 dark:text-cyan-300">:</code>), tanda kurung kurawal (<code className="font-bold text-cyan-800 dark:text-cyan-300">&#123; &#125;</code>), indentasi 4 spasi, dan fungsi konversi tipe data seperti <code className="font-bold text-cyan-800 dark:text-cyan-300">float(input())</code>.
                  </span>
                </div>
              </div>

              {/* TOMBOL NAVIGASI TAHAP 3 */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/80">
                <button
                  onClick={() => handleStageChange(2)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-slate-800 dark:text-slate-200 font-extrabold text-sm flex items-center justify-center gap-2 border border-border cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali ke Tahap 2: Desain</span>
                </button>
                <button
                  onClick={() => handleStageChange(4)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-black text-sm md:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-cyan-600/30 transition-all hover:translate-x-1 cursor-pointer"
                >
                  <span>Lanjut ke Tahap 4: Pengujian Mutu (Testing)</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {activeStage === 4 && (
            <motion.div
              key="stage-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-6 md:p-8 bg-card border-2 border-emerald-500/40 rounded-2xl space-y-8 shadow-sm"
            >
              {/* Header Stage 4 */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-2 border-emerald-500/30 text-xs md:text-sm font-mono font-black uppercase tracking-wider mb-2">
                    <CheckSquare className="w-4 h-4" /> TAHAP 4: PENGUJIAN &amp; PENJAMINAN KUALITAS (TESTING)
                  </div>
                  <h4 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    Matriks Pengujian: Melampaui Bebas Sintaks
                  </h4>
                  <p className="text-slate-800 dark:text-slate-200 text-sm md:text-base mt-2 font-medium max-w-3xl leading-relaxed">
                    "Program yang berjalan mulus tanpa pesan error merah di terminal, <strong className="text-slate-950 dark:text-white font-black">BELUM TENTU</strong> menghasilkan jawaban yang benar!" Pengujian sistematis memvalidasi integritas logika di segala kondisi masukan ekstrem.
                  </p>
                </div>
                <div className="p-3.5 bg-emerald-500/15 rounded-2xl text-emerald-700 dark:text-emerald-300 shrink-0 self-start border-2 border-emerald-500/30 shadow-sm">
                  <ShieldCheck className="w-8 h-8" />
                </div>
              </div>

              {/* SIMULATOR MATRIKS UJI 3 ZONA INTERAKTIF */}
              <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border-2 border-emerald-500/40 space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                      <h5 className="font-black text-lg md:text-xl text-slate-900 dark:text-white">
                        Simulator Matriks Uji 3 Zona (Interactive 3-Zone Test Matrix)
                      </h5>
                    </div>
                    <p className="text-sm text-slate-800 dark:text-slate-200 font-semibold mt-1">
                      Pilih zona pengujian untuk mengamati presisi komputasi program kasir grosir (<code className="font-mono text-emerald-700 dark:text-emerald-400 font-black">PPN 11% &amp; Bilangan Pecahan</code>):
                    </p>
                  </div>

                  {/* Switcher 3 Zona */}
                  <div className="inline-flex p-1.5 bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-300 dark:border-slate-700 shadow-sm shrink-0">
                    <button
                      onClick={() => setActiveTestScenario('happy')}
                      className={`px-3.5 py-2 rounded-lg text-xs md:text-sm font-extrabold transition-all ${
                        activeTestScenario === 'happy'
                          ? 'bg-emerald-600 text-white font-black shadow-md'
                          : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      1. Happy Path
                    </button>
                    <button
                      onClick={() => setActiveTestScenario('boundary')}
                      className={`px-3.5 py-2 rounded-lg text-xs md:text-sm font-extrabold transition-all ${
                        activeTestScenario === 'boundary'
                          ? 'bg-amber-600 text-white font-black shadow-md'
                          : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      2. Ambang Batas
                    </button>
                    <button
                      onClick={() => setActiveTestScenario('extreme')}
                      className={`px-3.5 py-2 rounded-lg text-xs md:text-sm font-extrabold transition-all ${
                        activeTestScenario === 'extreme'
                          ? 'bg-rose-600 text-white font-black shadow-md'
                          : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      3. Nilai Ekstrem
                    </button>
                  </div>
                </div>

                {/* Display Zona Terpilih */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Kartu Detail Uji */}
                  <div className="md:col-span-2 p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-300 dark:border-slate-700 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-base md:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        {testScenarios[activeTestScenario].title}
                      </span>
                      <span className={`px-3 py-1 rounded-md text-xs font-mono font-black border-2 ${testScenarios[activeTestScenario].badgeColor}`}>
                        {testScenarios[activeTestScenario].badge}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm font-mono">
                      <div className="p-3.5 bg-slate-100 dark:bg-slate-800 rounded-xl space-y-1 border border-slate-200 dark:border-slate-700">
                        <span className="text-xs text-slate-700 dark:text-slate-300 font-black block uppercase tracking-wider">Data Masukan (Input):</span>
                        <span className="text-slate-950 dark:text-slate-50 font-black text-sm md:text-base">{testScenarios[activeTestScenario].inputVal}</span>
                      </div>
                      <div className="p-3.5 bg-slate-100 dark:bg-slate-800 rounded-xl space-y-1 border border-slate-200 dark:border-slate-700">
                        <span className="text-xs text-slate-700 dark:text-slate-300 font-black block uppercase tracking-wider">Evaluasi Kondisi:</span>
                        <span className="text-slate-950 dark:text-slate-50 font-black text-sm md:text-base">{testScenarios[activeTestScenario].kondisiEval}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-between text-xs md:text-sm">
                      <span className="font-black text-slate-800 dark:text-slate-200 font-mono tracking-wide">
                        HASIL KELUARAN PROGRAM:
                      </span>
                      <span className="font-mono font-black text-emerald-800 dark:text-emerald-300 text-base md:text-lg">
                        {testScenarios[activeTestScenario].outputRes}
                      </span>
                    </div>

                    <p className="text-sm md:text-base text-slate-900 dark:text-slate-100 font-semibold leading-relaxed">
                      {testScenarios[activeTestScenario].ahaMessage}
                    </p>
                  </div>

                  {/* Diagnostik Radar Bug */}
                  <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-300 dark:border-slate-700 space-y-4 flex flex-col justify-between shadow-sm">
                    <div>
                      <div className="font-black text-slate-900 dark:text-white text-base md:text-lg flex items-center gap-2 mb-2">
                        <Eye className="w-5 h-5 text-emerald-600" /> Radar Kualitas
                      </div>
                      <p className="text-slate-800 dark:text-slate-200 font-medium text-sm leading-relaxed">
                        Pengujian software yang handal tidak hanya mengecek saat data benar, melainkan sengaja "meracuni" masukan untuk membuktikan bahwa program tidak runtuh (crash).
                      </p>
                    </div>

                    <div className="p-3.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs md:text-sm space-y-1.5">
                      <div className="text-slate-700 dark:text-slate-300 font-black tracking-wide">STATUS QA CHECK:</div>
                      <div className="text-emerald-700 dark:text-emerald-400 font-black">✓ Syntax Error: 0</div>
                      <div className="text-emerald-700 dark:text-emerald-400 font-black">✓ Runtime Crash: 0</div>
                      <div className="text-amber-700 dark:text-amber-400 font-black">
                        {activeTestScenario === 'boundary' ? '⚠ Boundary Alert!' : '✓ Logic Integrity: 100%'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* THE SILENT KILLER: INTEGER TRUNCATION BUG COMPARISON */}
                <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border-2 border-amber-500/50 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <span className="font-black text-sm md:text-base text-slate-950 dark:text-white">
                      Anatomi Silent Bug: Bahaya Salah Memilih Tipe Data (Integer Truncation &amp; Division Bug)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
                    <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-xl border-2 border-rose-500/40 space-y-1.5">
                      <div className="font-black text-rose-800 dark:text-rose-300 font-mono text-sm">
                        ✗ KODE CACAT: hargaSatuan = int(input()) atau (11 / 100)
                      </div>
                      <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                        Jika harga barang grosir memuat pecahan sen <strong className="text-slate-950 dark:text-white">Rp 12.500,50</strong>, pembacaan integer memenggal sen desimal menjadi <code className="font-mono text-rose-700 dark:text-rose-400 font-black">12500</code>. Di C++, pembagian integer <code className="font-mono text-rose-700 dark:text-rose-400 font-black">11 / 100</code> menghasilkan <code className="font-mono text-rose-700 dark:text-rose-400 font-black">0</code>! Pajak PPN bernilai Rp 0 dan toko merugi puluhan juta tanpa satu pun error merah dari compiler.
                      </p>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border-2 border-emerald-500/40 space-y-1.5">
                      <div className="font-black text-emerald-800 dark:text-emerald-300 font-mono text-sm">
                        ✓ KODE PRESISI: hargaSatuan = float(input()) &amp; 0.11
                      </div>
                      <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                        Dengan mendeklarasikan <strong className="text-slate-950 dark:text-white">float</strong> untuk harga dan nilai desimal <code className="font-mono text-emerald-700 dark:text-emerald-400 font-black">0.11</code>, komputer menghitung angka pecahan secara akurat hingga digit sen terkecil. Hasil perkalian integer dan float secara otomatis dinaikkan (*type promotion*) menjadi float presisi tinggi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* MOMEN AHA #5 */}
              <div className="p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50/50 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-emerald-950/20 rounded-2xl border-2 border-emerald-500 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white font-black text-xs md:text-sm flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="w-4 h-4" /> MOMEN AHA #5
                  </div>
                  <h6 className="font-black text-slate-950 dark:text-slate-50 text-base md:text-lg">
                    Pesan Error Merah adalah Sahabat, Silent Logic Bug adalah Musuh Terbesar!
                  </h6>
                </div>
                <p className="text-slate-900 dark:text-slate-100 text-sm md:text-base leading-relaxed font-medium">
                  Banyak pemula merasa panik dan frustrasi ketika melihat layar merah (error compiler). Padahal error compiler itu sangat ramah: <em>ia secara jujur memberi tahu baris mana yang salah ketik!</em> Musuh paling berbahaya bagi software engineer profesional adalah <strong className="text-slate-950 dark:text-white">Logic Error (Silent Bug)</strong>: program berjalan mulus, terminal bersih tanpa pesan merah, tetapi hasil perhitungannya salah! Itulah mengapa pengujian kasus batas (Boundary Testing) adalah instrumen wajib sebelum sebuah program dilepas ke pengguna nyata.
                </p>
              </div>

              {/* TOMBOL NAVIGASI TAHAP 4 */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/80">
                <button
                  onClick={() => handleStageChange(3)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-slate-800 dark:text-slate-200 font-extrabold text-sm flex items-center justify-center gap-2 border border-border cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali ke Tahap 3: Coding</span>
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('capstone-project-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm md:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/30 transition-all hover:translate-y-0.5 cursor-pointer"
                >
                  <span>Selesai Siklus! Lanjut ke Proyek Capstone BMI</span>
                  <ArrowDown className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Laboratorium Studi Kasus End-to-End: Kalkulator BMI */}
      <div id="capstone-project-section" className="bg-card border-2 border-slate-300 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden space-y-6">
        <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-900/60 border-b-2 border-slate-200 dark:border-slate-800 space-y-6">
          {/* Header Title & Intro - Full Width */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 text-emerald-900 dark:text-emerald-300 border-2 border-emerald-500/30 text-xs md:text-sm font-mono font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Laboratorium Studi Kasus Lengkap (End-to-End)
            </div>
            <h4 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Studi Kasus: Perhitungan Indeks Massa Tubuh (BMI)
            </h4>
            <p className="text-sm md:text-base text-slate-800 dark:text-slate-200 font-medium max-w-4xl leading-relaxed">
              Saksikan bagaimana persoalan nyata di dunia kesehatan diolah secara bertahap melalui 4 tahap rekayasa: mulai dari pembedahan persamaan matematis hingga pengujian kasus batas.
            </p>
          </div>

          {/* 4 Interactive Stage Tabs - Responsive 4-Column Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-1.5 bg-background rounded-2xl border-2 border-slate-300 dark:border-slate-700 shadow-sm">
            <button
              onClick={() => setActiveLabTab('analisis')}
              className={`p-3.5 rounded-xl text-left font-sans transition-all cursor-pointer flex flex-col gap-1 border-2 shadow-sm ${
                activeLabTab === 'analisis' 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-400/40' 
                  : 'bg-card text-slate-700 dark:text-slate-300 border-transparent hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm font-black flex items-center gap-1.5">
                  <Variable className="w-4 h-4" /> 1. Analisis Masalah
                </span>
                <span className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded ${activeLabTab === 'analisis' ? 'bg-indigo-500 text-white' : 'bg-secondary text-slate-600 dark:text-slate-400'}`}>
                  Tahap 1
                </span>
              </div>
              <span className={`text-xs font-semibold leading-tight ${activeLabTab === 'analisis' ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}>
                Persamaan, Tetapan, &amp; Variabel
              </span>
            </button>

            <button
              onClick={() => setActiveLabTab('desain')}
              className={`p-3.5 rounded-xl text-left font-sans transition-all cursor-pointer flex flex-col gap-1 border-2 shadow-sm ${
                activeLabTab === 'desain' 
                  ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-400/40' 
                  : 'bg-card text-slate-700 dark:text-slate-300 border-transparent hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm font-black flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> 2. Desain Solusi
                </span>
                <span className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded ${activeLabTab === 'desain' ? 'bg-amber-500 text-white' : 'bg-secondary text-slate-600 dark:text-slate-400'}`}>
                  Tahap 2
                </span>
              </div>
              <span className={`text-xs font-semibold leading-tight ${activeLabTab === 'desain' ? 'text-amber-100' : 'text-slate-500 dark:text-slate-400'}`}>
                Pola IPO &amp; Algoritma Baku
              </span>
            </button>

            <button
              onClick={() => setActiveLabTab('coding')}
              className={`p-3.5 rounded-xl text-left font-sans transition-all cursor-pointer flex flex-col gap-1 border-2 shadow-sm ${
                activeLabTab === 'coding' 
                  ? 'bg-cyan-600 text-white border-cyan-600 shadow-md ring-2 ring-cyan-400/40' 
                  : 'bg-card text-slate-700 dark:text-slate-300 border-transparent hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm font-black flex items-center gap-1.5">
                  <Code2 className="w-4 h-4" /> 3. Kode Program
                </span>
                <span className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded ${activeLabTab === 'coding' ? 'bg-cyan-500 text-white' : 'bg-secondary text-slate-600 dark:text-slate-400'}`}>
                  Tahap 3
                </span>
              </div>
              <span className={`text-xs font-semibold leading-tight ${activeLabTab === 'coding' ? 'text-cyan-100' : 'text-slate-500 dark:text-slate-400'}`}>
                Transkripsi ke Python 3
              </span>
            </button>

            <button
              onClick={() => setActiveLabTab('testing')}
              className={`p-3.5 rounded-xl text-left font-sans transition-all cursor-pointer flex flex-col gap-1 border-2 shadow-sm ${
                activeLabTab === 'testing' 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400/40' 
                  : 'bg-card text-slate-700 dark:text-slate-300 border-transparent hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm font-black flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4" /> 4. Uji Kasus (Testing)
                </span>
                <span className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded ${activeLabTab === 'testing' ? 'bg-emerald-500 text-white' : 'bg-secondary text-slate-600 dark:text-slate-400'}`}>
                  Tahap 4
                </span>
              </div>
              <span className={`text-xs font-semibold leading-tight ${activeLabTab === 'testing' ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>
                Verifikasi Kasus Ekstrem &amp; Batas
              </span>
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="p-6 md:p-8 pt-0">
          <AnimatePresence mode="wait">
            {/* TAB 1: ANALISIS */}
            {activeLabTab === 'analisis' && (
              <motion.div
                key="lab-analisis"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Rumus Math Box */}
                <div className="p-5 md:p-6 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border-2 border-indigo-400/50 space-y-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-500/20 pb-3">
                    <div className="font-black text-slate-900 dark:text-white text-base md:text-lg flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      Persamaan Matematis Standar WHO:
                    </div>
                    <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800">
                      Formula Domain Kesehatan
                    </span>
                  </div>

                  {/* Formula Mathematical Canvas */}
                  <div className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800/80 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 dark:border-indigo-900/60 pb-3">
                      <div className="text-xs font-mono font-black uppercase text-indigo-700 dark:text-indigo-400 tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-indigo-600" /> Rumus Matematis Baku (WHO Standard)
                      </div>
                      <span className="text-xs text-slate-500 font-medium">Satuan Internasional: Kilogram (kg) &amp; Meter (m)</span>
                    </div>

                    {/* Formula Mathematical Canvas - Never Wraps */}
                    <div className="overflow-x-auto py-2">
                      <div className="min-w-fit flex items-center justify-center gap-4 sm:gap-6 px-6 py-4 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-xl border border-indigo-200/80 dark:border-indigo-800/50">
                        {/* Sisi Kiri: BMI */}
                        <div className="text-2xl sm:text-3xl font-serif font-black italic text-indigo-900 dark:text-indigo-200 tracking-wide select-none">
                          BMI
                        </div>

                        <div className="text-2xl sm:text-3xl font-sans font-light text-slate-400 select-none">
                          =
                        </div>

                        {/* Pecahan Lengkap: berat (kg) / (tinggi (cm) / 100)^2 */}
                        <div className="inline-flex flex-col items-center justify-center font-serif select-none px-2">
                          {/* Pembilang (Numerator) */}
                          <div className="pb-1.5 text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                            beratBadan <span className="font-sans font-normal text-xs text-slate-500">(kg)</span>
                          </div>

                          {/* Garis Pembagi (Fraction Line) */}
                          <div className="w-full h-0.5 bg-indigo-500 dark:bg-indigo-400 rounded-full"></div>

                          {/* Penyebut (Denominator) */}
                          <div className="pt-1.5 text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap flex items-center gap-1">
                            <span className="text-xl sm:text-2xl font-sans font-light text-indigo-600 dark:text-indigo-400">(</span>
                            <span className="inline-flex flex-col items-center px-1">
                              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                                tinggiBadan <span className="font-sans font-normal text-[10px] text-slate-500">(cm)</span>
                              </span>
                              <span className="w-full h-[1.5px] bg-slate-400 dark:bg-slate-500 rounded-full my-0.5"></span>
                              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">100</span>
                            </span>
                            <span className="text-xl sm:text-2xl font-sans font-light text-indigo-600 dark:text-indigo-400">)</span>
                            <sup className="text-xs sm:text-sm font-sans font-black text-indigo-700 dark:text-indigo-300 -mt-2">2</sup>
                          </div>
                        </div>

                        <div className="text-2xl sm:text-3xl font-sans font-light text-slate-400 select-none hidden sm:block">
                          =
                        </div>

                        {/* Pecahan Sederhana: beratBadan / tinggiMeter^2 */}
                        <div className="hidden sm:inline-flex flex-col items-center justify-center font-serif select-none px-2">
                          <div className="pb-1.5 text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                            beratBadan <span className="font-sans font-normal text-xs text-slate-500">(kg)</span>
                          </div>
                          <div className="w-full h-0.5 bg-indigo-500 dark:bg-indigo-400 rounded-full"></div>
                          <div className="pt-1.5 text-sm sm:text-base font-bold text-indigo-700 dark:text-indigo-300 whitespace-nowrap">
                            tinggiMeter<sup className="text-xs sm:text-sm font-sans font-black text-indigo-700 dark:text-indigo-300">2</sup>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dekomposisi 2 Langkah Komputasi */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3.5 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800/60 font-mono text-xs flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black flex items-center justify-center shrink-0 text-xs shadow-xs">
                          1
                        </span>
                        <div>
                          <span className="text-[10px] text-indigo-800 dark:text-indigo-300 font-bold uppercase tracking-wider block font-sans">
                            Tahap 1 (Normalisasi Satuan):
                          </span>
                          <span className="font-black text-slate-900 dark:text-white text-xs sm:text-sm">
                            tinggiMeter = tinggiBadan / 100.0
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800/60 font-mono text-xs flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black flex items-center justify-center shrink-0 text-xs shadow-xs">
                          2
                        </span>
                        <div>
                          <span className="text-[10px] text-indigo-800 dark:text-indigo-300 font-bold uppercase tracking-wider block font-sans">
                            Tahap 2 (Kalkulasi Rasio Indeks):
                          </span>
                          <span className="font-black text-slate-900 dark:text-white text-xs sm:text-sm">
                            nilaiBmi = beratBadan / (tinggiMeter &times; tinggiMeter)
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed pt-1">
                      <strong className="text-slate-950 dark:text-white">Mengapa Dibagi 100?</strong> Karena pengguna memasukkan tinggi badan dalam satuan sentimeter (cm), sedangkan standar medis WHO menghitung indeks massa tubuh berbasis satuan meter (m). Nilai angka <strong className="text-amber-700 dark:text-amber-400 font-bold">100.0</strong> adalah <em>tetapan konversi invarian</em>.
                    </p>
                  </div>

                  {/* 3 Indikator Komponen Formula */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                    <div className="p-2.5 rounded-lg bg-background border border-amber-400/40 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
                      <span><strong>Tetapan:</strong> Angka 100.0 (konversi cm ke meter)</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-background border border-blue-400/40 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
                      <span><strong>Variabel Bebas:</strong> beratBadan, tinggiBadan</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-background border border-purple-400/40 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0"></span>
                      <span><strong>Variabel Terikat:</strong> nilaiBmi, kategori</span>
                    </div>
                  </div>
                </div>

                {/* Tabel Dekomposisi Komponen Data (Tetapan vs Variabel) */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h5 className="font-black text-slate-900 dark:text-white text-base md:text-lg flex items-center gap-2">
                      <Variable className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      Tabel Dekomposisi Komponen Data: Tetapan (Konstanta) vs Variabel
                    </h5>
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">
                      Standar Analisis: Tanpa Peran I/O Prosedural
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border-2 border-slate-300 dark:border-slate-700 shadow-sm">
                    <table className="w-full text-left border-collapse text-xs md:text-sm">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800/90 border-b-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-black">
                          <th className="p-3.5 whitespace-nowrap">Nama Komponen</th>
                          <th className="p-3.5 whitespace-nowrap">Sifat &amp; Kategori Komponen</th>
                          <th className="p-3.5 whitespace-nowrap">Domain Fisik / Nilai Invarian</th>
                          <th className="p-3.5 whitespace-nowrap">Tipe Data</th>
                          <th className="p-3.5">Karakteristik &amp; Alasan Pemilihan Tipe Data</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-800 dark:text-slate-200 font-medium">
                        {/* Baris 1: TETAPAN (KONSTANTA) */}
                        <tr className="bg-amber-500/5 hover:bg-amber-500/10 transition-colors">
                          <td className="p-3.5 font-mono font-black text-amber-800 dark:text-amber-300">
                            KONVERSI_METER
                            <span className="block text-[11px] font-sans font-normal text-slate-500 dark:text-slate-400">Nilai tetap: 100.0</span>
                          </td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 font-black text-xs border border-amber-300 dark:border-amber-800 inline-flex items-center gap-1 shadow-sm">
                              🔒 TETAPAN (KONSTANTA)
                            </span>
                          </td>
                          <td className="p-3.5 font-semibold font-mono text-amber-950 dark:text-amber-200">
                            100.0 (cm ke meter)
                          </td>
                          <td className="p-3.5 font-mono text-emerald-800 dark:text-emerald-300 font-black">
                            float
                          </td>
                          <td className="p-3.5 leading-relaxed">
                            <strong className="text-amber-950 dark:text-amber-300">Tetapan mutlak rasio konversi unit:</strong> 1 meter tepat sama dengan 100 sentimeter. Bernilai paten di alam semesta dan <strong className="text-rose-700 dark:text-rose-400">DILARANG diminta sebagai input dari keyboard pengguna</strong>.
                          </td>
                        </tr>

                        {/* Baris 2: VARIABEL BEBAS 1 */}
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="p-3.5 font-mono font-black text-indigo-700 dark:text-indigo-300">
                            beratBadan
                          </td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950/70 text-blue-900 dark:text-blue-200 font-black text-xs border border-blue-300 dark:border-blue-800 inline-flex items-center gap-1 shadow-sm">
                              🔄 VARIABEL BEBAS
                            </span>
                          </td>
                          <td className="p-3.5 font-semibold">10.0 s.d. 300.0 kg</td>
                          <td className="p-3.5 font-mono text-emerald-800 dark:text-emerald-300 font-black">float</td>
                          <td className="p-3.5 leading-relaxed">
                            Berat seseorang berupa kuantitas fisik kontinu pecahan desimal (misal 65.4 kg). Dilarang integer agar presisi pecahan tidak terpotong (truncate).
                          </td>
                        </tr>

                        {/* Baris 3: VARIABEL BEBAS 2 */}
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="p-3.5 font-mono font-black text-indigo-700 dark:text-indigo-300">
                            tinggiBadan
                          </td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950/70 text-blue-900 dark:text-blue-200 font-black text-xs border border-blue-300 dark:border-blue-800 inline-flex items-center gap-1 shadow-sm">
                              🔄 VARIABEL BEBAS
                            </span>
                          </td>
                          <td className="p-3.5 font-semibold">50.0 s.d. 250.0 cm (&gt; 0)</td>
                          <td className="p-3.5 font-mono text-emerald-800 dark:text-emerald-300 font-black">float</td>
                          <td className="p-3.5 leading-relaxed">
                            Tinggi badan bernilai kontinu (misal 172.5 cm). Wajib float dan harus bernilai positif (&gt; 0) untuk mencegah error fatal pembagian dengan nol (<em>division by zero</em>).
                          </td>
                        </tr>

                        {/* Baris 4: VARIABEL TERIKAT 1 */}
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="p-3.5 font-mono font-black text-indigo-700 dark:text-indigo-300">
                            nilaiBmi
                          </td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 font-black text-xs border border-emerald-300 dark:border-emerald-800 inline-flex items-center gap-1 shadow-sm">
                              🎯 VARIABEL TERIKAT
                            </span>
                          </td>
                          <td className="p-3.5 font-semibold">Hasil hitung pecahan riil</td>
                          <td className="p-3.5 font-mono text-emerald-800 dark:text-emerald-300 font-black">float</td>
                          <td className="p-3.5 leading-relaxed">
                            Indeks rasio massa tubuh hasil komputasi formula pembagian matematis yang selalu menghasilkan bilangan desimal berpresisi tinggi.
                          </td>
                        </tr>

                        {/* Baris 5: VARIABEL TERIKAT 2 */}
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="p-3.5 font-mono font-black text-indigo-700 dark:text-indigo-300">
                            kategori
                          </td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-950/70 text-purple-900 dark:text-purple-200 font-black text-xs border border-purple-300 dark:border-purple-800 inline-flex items-center gap-1 shadow-sm">
                              🎯 VARIABEL TERIKAT
                            </span>
                          </td>
                          <td className="p-3.5 font-semibold">Teks deskriptif klasifikasi</td>
                          <td className="p-3.5 font-mono text-purple-800 dark:text-purple-300 font-black">string</td>
                          <td className="p-3.5 leading-relaxed">
                            Diagnosis medis berupa label teks diskrit: "Kurus", "Normal", "Overweight", atau "Obesitas" hasil evaluasi logika cabang (if-else).
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Callout Pedagogis Penjelasan Pemisahan Tahap */}
                <div className="p-4 md:p-5 bg-indigo-50/80 dark:bg-indigo-950/40 rounded-xl border-2 border-indigo-400/50 flex items-start gap-3.5 shadow-sm text-xs md:text-sm text-indigo-950 dark:text-indigo-200">
                  <Lightbulb className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="font-black text-indigo-950 dark:text-indigo-100 block text-sm">
                      Pembedahan Pedagogis: Mengapa Tidak Ada Kolom "Peran I/O" (Input/Output) di Tahap Analisis Ini?
                    </strong>
                    <p className="leading-relaxed">
                      Di <strong className="text-indigo-900 dark:text-indigo-100">Tahap 1 (Analisis Masalah)</strong>, fokus mahasiswa murni membedah <em>bahan dan spesifikasi data</em>: menemukan rumus domain masalah, memisahkan nilai tetap (tetapan/konstanta) dari nilai yang dinamis (variabel bebas dan terikat), serta menentukan tipe data.
                    </p>
                    <p className="leading-relaxed font-bold text-indigo-900 dark:text-indigo-100">
                      Alur sekuensial prosedural mengenai siapa yang dibaca dari keyboard (Input), bagaimana rumus dieksekusi di register CPU (Proses), dan siapa yang disajikan ke layar (Output) baru dirancang di <strong className="text-amber-700 dark:text-amber-300">Tahap 2: Desain Solusi (Pola IPO)</strong>!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: DESAIN */}
            {activeLabTab === 'desain' && (
              <motion.div
                key="lab-desain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Pipa Prosedural IPO Vertikal BMI (Atas ke Bawah) */}
                <div className="p-5 md:p-6 bg-amber-50/70 dark:bg-amber-950/40 rounded-2xl border-2 border-amber-400/50 space-y-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
                    <div className="flex items-center gap-2">
                      <Layers className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <div>
                        <h5 className="font-black text-base md:text-lg text-slate-900 dark:text-white">
                          Pola Prosedural IPO: Membangun Urutan Eksekusi Waktu
                        </h5>
                        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                          Dekomposisi bertahap: Masukan variabel bebas ➔ Pemrosesan persamaan matematis ➔ Penyajian keluaran
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-black px-2.5 py-1 rounded bg-amber-600 text-white shadow-sm self-start sm:self-auto uppercase tracking-wide">
                      Alur Prosedural: Input ➔ Proses ➔ Output
                    </span>
                  </div>

                  <div className="space-y-4 pt-1">
                    {/* PIPA 1: INPUT */}
                    <div className="p-5 bg-card rounded-2xl border-2 border-cyan-500/50 space-y-3.5 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-500/20 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-mono font-black text-sm shadow-xs">
                            I
                          </div>
                          <div>
                            <h6 className="font-black text-sm md:text-base text-slate-900 dark:text-white flex items-center gap-2">
                              <TerminalSquare className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                              1. CORONG INPUT (Keyboard ➔ Memori RAM)
                            </h6>
                            <span className="text-xs text-cyan-800 dark:text-cyan-300 font-bold block">
                              Membaca nilai variabel bebas dari keyboard pengguna
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 font-mono text-xs font-black text-cyan-900 dark:text-cyan-200 border border-cyan-300 dark:border-cyan-800 self-start sm:self-auto">
                          MASUKAN
                        </span>
                      </div>

                      <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                        Program membaca 2 variabel bebas yang harus diisi oleh pengguna melalui keyboard. Tetapan nilai <strong className="text-amber-600 dark:text-amber-400 font-mono">100</strong> tidak di-input karena sudah berupa konstanta pembagi matematis di dalam rumus:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                        {/* Var 1: beratBadan */}
                        <div className="p-3.5 bg-cyan-50/70 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-800/60 flex items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-cyan-950 dark:text-cyan-200 text-sm">beratBadan</span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-200 dark:bg-cyan-900 text-cyan-900 dark:text-cyan-200 font-bold">float</span>
                            </div>
                            <span className="text-[11px] text-slate-600 dark:text-slate-400 font-sans font-medium block mt-0.5">Massa tubuh dalam satuan kilogram (kg)</span>
                          </div>
                          <code className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-950 text-cyan-800 dark:text-cyan-300 font-black text-xs shrink-0 border border-border dark:border-slate-800 shadow-xs">
                            input(beratBadan)
                          </code>
                        </div>

                        {/* Var 2: tinggiBadan */}
                        <div className="p-3.5 bg-cyan-50/70 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-800/60 flex items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-cyan-950 dark:text-cyan-200 text-sm">tinggiBadan</span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-200 dark:bg-cyan-900 text-cyan-900 dark:text-cyan-200 font-bold">float</span>
                            </div>
                            <span className="text-[11px] text-slate-600 dark:text-slate-400 font-sans font-medium block mt-0.5">Panjang tubuh dalam satuan sentimeter (cm)</span>
                          </div>
                          <code className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-950 text-cyan-800 dark:text-cyan-300 font-black text-xs shrink-0 border border-border dark:border-slate-800 shadow-xs">
                            input(tinggiBadan)
                          </code>
                        </div>
                      </div>
                    </div>

                    {/* FLOW ARROW 1 -> 2 */}
                    <div className="flex items-center justify-center -my-1">
                      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border-2 border-cyan-500/30 text-cyan-800 dark:text-cyan-300 font-mono text-xs font-black shadow-xs">
                        <ArrowDown className="w-3.5 h-3.5 text-cyan-600 animate-bounce" />
                        <span>Variabel Bebas Masukan Siap Diolah oleh Register CPU &amp; ALU</span>
                      </div>
                    </div>

                    {/* PIPA 2: PROSES (PERSAMAAN MATEMATIS & KODE UNIVERSAL 1 BARIS) */}
                    <div className="p-5 bg-card rounded-2xl border-2 border-amber-500/60 dark:border-amber-500/40 space-y-4 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-mono font-black text-sm shadow-xs">
                            P
                          </div>
                          <div>
                            <h6 className="font-black text-sm md:text-base text-slate-900 dark:text-white flex items-center gap-2">
                              <Cpu className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                              2. RUANG PROSES (CPU, Register, &amp; ALU)
                            </h6>
                            <span className="text-xs text-amber-800 dark:text-amber-300 font-bold block">
                              Eksekusi persamaan matematis sekuensial dan evaluasi cabang logika
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 font-mono text-xs font-black text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 self-start sm:self-auto">
                          PENGOLAHAN RUMUS
                        </span>
                      </div>

                      <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                        CPU mengeksekusi komputasi rumus secara bertahap (1 baris per persamaan waktu) sebelum melakukan evaluasi klasifikasi kategori:
                      </p>

                      <div className="space-y-3">
                        {/* Persamaan 1: Normalisasi Satuan */}
                        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border-2 border-amber-500/30 space-y-2.5 shadow-xs">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
                            <span className="font-mono font-black text-amber-800 dark:text-amber-300 text-xs flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-md bg-amber-600 text-white flex items-center justify-center text-[11px] font-black">1</span>
                              PERSAMAAN 1: NORMALISASI SATUAN PANJANG (CM ➔ METER)
                            </span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
                              Operasi Pembagian (Float)
                            </span>
                          </div>

                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 pt-1">
                            {/* Visual Math Formula */}
                            <div className="flex items-center gap-3 px-4 py-2.5 bg-amber-500/10 rounded-lg border border-amber-500/25 whitespace-nowrap">
                              <span className="font-serif font-black italic text-sm md:text-base text-amber-950 dark:text-amber-200">tinggiMeter</span>
                              <span className="font-sans font-light text-slate-400 text-lg">=</span>
                              <div className="inline-flex flex-col items-center justify-center font-serif text-xs md:text-sm px-1.5">
                                <span className="font-bold text-slate-800 dark:text-slate-200 pb-0.5">tinggiBadan (cm)</span>
                                <span className="w-full h-0.5 bg-amber-500 dark:bg-amber-400 rounded-full"></span>
                                <span className="font-mono font-bold text-amber-700 dark:text-amber-300 pt-0.5">100.0</span>
                              </div>
                            </div>

                            {/* Universal Instruction */}
                            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-border dark:border-slate-800 text-slate-800 dark:text-slate-100 font-mono text-xs md:text-sm whitespace-nowrap shadow-xs">
                              <span className="text-slate-500 dark:text-slate-400 mr-2 font-normal">// Instruksi Universal:</span>
                              <span className="text-amber-700 dark:text-amber-400 font-black">tinggiMeter</span>
                              <span className="text-slate-700 dark:text-slate-300"> = </span>
                              <span className="text-cyan-700 dark:text-cyan-300 font-bold">tinggiBadan</span>
                              <span className="text-rose-600 dark:text-rose-400 font-black"> / </span>
                              <span className="text-amber-700 dark:text-amber-300 font-black">100.0</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                            Mengonversi nilai masukan tinggi badan dari satuan sentimeter ke meter agar memenuhi Standar Internasional rumus WHO.
                          </p>
                        </div>

                        {/* Persamaan 2: Rumus BMI WHO */}
                        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border-2 border-amber-500/30 space-y-2.5 shadow-xs">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
                            <span className="font-mono font-black text-amber-800 dark:text-amber-300 text-xs flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-md bg-amber-600 text-white flex items-center justify-center text-[11px] font-black">2</span>
                              PERSAMAAN 2: KALKULASI INDEKS MASSA TUBUH (WHO)
                            </span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
                              Perkalian &amp; Pembagian (Float)
                            </span>
                          </div>

                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 pt-1">
                            {/* Visual Math Formula */}
                            <div className="flex items-center gap-3 px-4 py-2.5 bg-amber-500/10 rounded-lg border border-amber-500/25 whitespace-nowrap">
                              <span className="font-serif font-black italic text-sm md:text-base text-amber-950 dark:text-amber-200">nilaiBmi</span>
                              <span className="font-sans font-light text-slate-400 text-lg">=</span>
                              <div className="inline-flex flex-col items-center justify-center font-serif text-xs md:text-sm px-1.5">
                                <span className="font-bold text-slate-800 dark:text-slate-200 pb-0.5">beratBadan (kg)</span>
                                <span className="w-full h-0.5 bg-amber-500 dark:bg-amber-400 rounded-full"></span>
                                <span className="font-bold text-amber-700 dark:text-amber-300 pt-0.5 flex items-center gap-1">
                                  tinggiMeter <span className="font-sans text-xs">&times;</span> tinggiMeter
                                </span>
                              </div>
                            </div>

                            {/* Universal Instruction */}
                            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-border dark:border-slate-800 text-slate-800 dark:text-slate-100 font-mono text-xs md:text-sm whitespace-nowrap shadow-xs">
                              <span className="text-slate-500 dark:text-slate-400 mr-2 font-normal">// Instruksi Universal:</span>
                              <span className="text-amber-700 dark:text-amber-400 font-black">nilaiBmi</span>
                              <span className="text-slate-700 dark:text-slate-300"> = </span>
                              <span className="text-cyan-700 dark:text-cyan-300 font-bold">beratBadan</span>
                              <span className="text-rose-600 dark:text-rose-400 font-black"> / </span>
                              <span className="text-slate-700 dark:text-slate-200">(</span>
                              <span className="text-amber-700 dark:text-amber-300 font-black">tinggiMeter</span>
                              <span className="text-rose-600 dark:text-rose-400 font-black"> * </span>
                              <span className="text-amber-700 dark:text-amber-300 font-black">tinggiMeter</span>
                              <span className="text-slate-700 dark:text-slate-200">)</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                            Tanda kurung <code className="font-mono font-bold text-amber-700 dark:text-amber-300">(tinggiMeter * tinggiMeter)</code> memaksakan CPU menghitung kuadrat penyebut terlebih dahulu sebelum membagi pembilang.
                          </p>
                        </div>

                        {/* Langkah 3: Evaluasi Percabangan Kategori */}
                        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border-2 border-amber-500/30 space-y-2.5 shadow-xs">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
                            <span className="font-mono font-black text-amber-800 dark:text-amber-300 text-xs flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-md bg-amber-600 text-white flex items-center justify-center text-[11px] font-black">3</span>
                              EVALUASI LOGIKA: KLASIFIKASI KATEGORI BERDASARKAN HASIL BMI
                            </span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
                              4 Kondisi Percabangan
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs font-mono">
                            <div className={`p-3 rounded-xl border transition-all ${isHitKurus ? 'bg-amber-500/20 border-amber-500 text-amber-950 dark:text-amber-200 font-black shadow-xs ring-2 ring-amber-500/30' : 'bg-slate-50 dark:bg-slate-950 border-border text-slate-700 dark:text-slate-300'}`}>
                              <span className="text-[10px] uppercase text-slate-500 block">Kondisi 1:</span>
                              <div className="font-bold text-xs mt-0.5">nilaiBmi &lt; 18.5</div>
                              <div className="text-amber-600 dark:text-amber-400 font-black text-sm mt-1.5">➔ "Kurus"</div>
                            </div>
                            <div className={`p-3 rounded-xl border transition-all ${isHitNormal ? 'bg-emerald-500/20 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-black shadow-xs ring-2 ring-emerald-500/30' : 'bg-slate-50 dark:bg-slate-950 border-border text-slate-700 dark:text-slate-300'}`}>
                              <span className="text-[10px] uppercase text-slate-500 block">Kondisi 2:</span>
                              <div className="font-bold text-xs mt-0.5">nilaiBmi &lt;= 24.9</div>
                              <div className="text-emerald-600 dark:text-emerald-400 font-black text-sm mt-1.5">➔ "Normal"</div>
                            </div>
                            <div className={`p-3 rounded-xl border transition-all ${isHitOverweight ? 'bg-orange-500/20 border-orange-500 text-orange-950 dark:text-orange-200 font-black shadow-xs ring-2 ring-orange-500/30' : 'bg-slate-50 dark:bg-slate-950 border-border text-slate-700 dark:text-slate-300'}`}>
                              <span className="text-[10px] uppercase text-slate-500 block">Kondisi 3:</span>
                              <div className="font-bold text-xs mt-0.5">nilaiBmi &lt;= 29.9</div>
                              <div className="text-orange-600 dark:text-orange-400 font-black text-sm mt-1.5">➔ "Overweight"</div>
                            </div>
                            <div className={`p-3 rounded-xl border transition-all ${isHitObesitas ? 'bg-rose-500/20 border-rose-500 text-rose-950 dark:text-rose-200 font-black shadow-xs ring-2 ring-rose-500/30' : 'bg-slate-50 dark:bg-slate-950 border-border text-slate-700 dark:text-slate-300'}`}>
                              <span className="text-[10px] uppercase text-slate-500 block">Kondisi 4:</span>
                              <div className="font-bold text-xs mt-0.5">Selain itu (else)</div>
                              <div className="text-rose-600 dark:text-rose-400 font-black text-sm mt-1.5">➔ "Obesitas"</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* FLOW ARROW 2 -> 3 */}
                    <div className="flex items-center justify-center -my-1">
                      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border-2 border-amber-500/30 text-amber-800 dark:text-amber-300 font-mono text-xs font-black shadow-xs">
                        <ArrowDown className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
                        <span>Nilai Hasil Komputasi Tersimpan di Variabel Terikat Menuju Saluran Output</span>
                      </div>
                    </div>

                    {/* PIPA 3: OUTPUT */}
                    <div className="p-5 bg-card rounded-2xl border-2 border-emerald-500/50 space-y-3.5 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/20 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-mono font-black text-sm shadow-xs">
                            O
                          </div>
                          <div>
                            <h6 className="font-black text-sm md:text-base text-slate-900 dark:text-white flex items-center gap-2">
                              <MonitorPlay className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              3. SALURAN OUTPUT (Memori RAM ➔ Layar Pengguna)
                            </h6>
                            <span className="text-xs text-emerald-800 dark:text-emerald-300 font-bold block">
                              Menyajikan variabel terikat &amp; label diagnosis ke monitor
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 font-mono text-xs font-black text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 self-start sm:self-auto">
                          KELUARAN
                        </span>
                      </div>

                      <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                        Hasil komputasi diserahkan ke layar monitor pengguna dalam bentuk nilai numerik BMI dan teks diagnosis status kesehatan:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                        {/* Var 1: nilaiBmi */}
                        <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-emerald-950 dark:text-emerald-200 text-sm">nilaiBmi</span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 font-bold">float</span>
                            </div>
                            <span className="text-[11px] text-slate-600 dark:text-slate-400 font-sans font-medium block mt-0.5">Angka terikat hasil kalkulasi rumus WHO</span>
                          </div>
                          <code className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-950 text-emerald-800 dark:text-emerald-300 font-black text-xs shrink-0 border border-border dark:border-slate-800 shadow-xs">
                            output(nilaiBmi)
                          </code>
                        </div>

                        {/* Var 2: kategori */}
                        <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-emerald-950 dark:text-emerald-200 text-sm">kategori</span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 font-bold">string</span>
                            </div>
                            <span className="text-[11px] text-slate-600 dark:text-slate-400 font-sans font-medium block mt-0.5">Label diagnosis hasil percabangan 4 kategori</span>
                          </div>
                          <code className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-950 text-emerald-800 dark:text-emerald-300 font-black text-xs shrink-0 border border-border dark:border-slate-800 shadow-xs">
                            output(kategori)
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* HEADER NAVIGASI TRI-REPRESENTASI DESAIN */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-100 dark:bg-slate-900/80 rounded-2xl border-2 border-border shadow-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                      <h5 className="font-black text-sm md:text-base text-slate-900 dark:text-white">
                        Cetak Biru Tri-Representasi Solusi Algoritma BMI
                      </h5>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5">
                      Satu solusi logika diekspresikan dalam 3 representasi baku: Naratif, Pseudocode (CLRS), dan Flowchart ANSI/ISO.
                    </p>
                  </div>

                  <div className="inline-flex p-1 bg-white dark:bg-slate-950 rounded-xl border border-border shadow-xs shrink-0 flex-wrap gap-1">
                    <button
                      onClick={() => setCapstoneDesignView('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                        capstoneDesignView === 'all'
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'text-slate-700 dark:text-slate-300 hover:text-foreground'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" /> Semua (3 Kolom)
                    </button>
                    <button
                      onClick={() => setCapstoneDesignView('flowchart')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                        capstoneDesignView === 'flowchart'
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'text-slate-700 dark:text-slate-300 hover:text-foreground'
                      }`}
                    >
                      <Workflow className="w-3.5 h-3.5" /> Flowchart ANSI
                    </button>
                    <button
                      onClick={() => setCapstoneDesignView('pseudocode')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                        capstoneDesignView === 'pseudocode'
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'text-slate-700 dark:text-slate-300 hover:text-foreground'
                      }`}
                    >
                      <FileCode2 className="w-3.5 h-3.5" /> Pseudocode CLRS
                    </button>
                    <button
                      onClick={() => setCapstoneDesignView('naratif')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                        capstoneDesignView === 'naratif'
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'text-slate-700 dark:text-slate-300 hover:text-foreground'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" /> Algoritma Naratif
                    </button>
                  </div>
                </div>

                {/* SIMULATOR PRESET PENGUJIAN PERCABANGAN CEPAT */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-border">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-black text-slate-800 dark:text-slate-200">
                      Uji Jalur Cabang Algoritma Live:
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400">
                      (BB: <strong className="text-amber-600 dark:text-amber-400">{testWeight} kg</strong>, TB: <strong className="text-amber-600 dark:text-amber-400">{testHeight} cm</strong> ➔ BMI: <strong className="text-emerald-600 dark:text-emerald-400">{bmiResult ?? '-'}</strong> ➔ <strong className="text-primary">{categoryResult || '-'}</strong>)
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() => { setTestWeight('45'); setTestHeight('165'); }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold transition-all cursor-pointer ${
                        isHitKurus
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-border hover:bg-muted'
                      }`}
                    >
                      Kurus (45kg/165cm)
                    </button>
                    <button
                      onClick={() => { setTestWeight('68'); setTestHeight('172'); }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold transition-all cursor-pointer ${
                        isHitNormal
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-border hover:bg-muted'
                      }`}
                    >
                      Normal (68kg/172cm)
                    </button>
                    <button
                      onClick={() => { setTestWeight('80'); setTestHeight('170'); }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold transition-all cursor-pointer ${
                        isHitOverweight
                          ? 'bg-orange-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-border hover:bg-muted'
                      }`}
                    >
                      Overweight (80kg/170cm)
                    </button>
                    <button
                      onClick={() => { setTestWeight('95'); setTestHeight('165'); }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold transition-all cursor-pointer ${
                        isHitObesitas
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-border hover:bg-muted'
                      }`}
                    >
                      Obesitas (95kg/165cm)
                    </button>
                  </div>
                </div>

                {/* KONTEN REPRESENTASI CETAK BIRU (SEMUA / FOKUS) */}
                <div className={`grid gap-6 ${capstoneDesignView === 'all' ? 'grid-cols-1 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {/* CARD 1: FORMAT NARATIF */}
                  {(capstoneDesignView === 'all' || capstoneDesignView === 'naratif') && (
                    <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border-2 border-amber-400/50 space-y-3.5 shadow-sm flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="font-black text-base md:text-lg text-slate-900 dark:text-white flex items-center justify-between">
                          <span className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                            <FileText className="w-5 h-5 text-amber-600" />
                            Representasi A: Algoritma Naratif
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-mono font-black px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-500/30">
                              Model 1: Blok Sejajar
                            </span>
                            {capstoneDesignView === 'all' ? (
                              <button
                                onClick={() => setCapstoneDesignView('naratif')}
                                title="Fokus / Perbesar Naratif"
                                className="p-1 rounded-md text-slate-500 hover:text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-colors cursor-pointer"
                              >
                                <Maximize2 className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => setCapstoneDesignView('all')}
                                title="Kembali ke 3 Kolom"
                                className="p-1 rounded-md text-slate-500 hover:text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-colors cursor-pointer"
                              >
                                <Minimize2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="p-4 md:p-5 bg-white dark:bg-slate-950 rounded-xl border-2 border-slate-300 dark:border-slate-800 font-mono text-xs md:text-sm leading-relaxed text-slate-900 dark:text-slate-100 space-y-1.5 shadow-inner">
                          <div>1. Masukkan nilai beratBadan (kg) dan tinggiBadan (cm).</div>
                          <div>2. Hitung tinggiMeter = tinggiBadan / 100.</div>
                          <div>3. Hitung nilaiBmi = beratBadan / (tinggiMeter * tinggiMeter).</div>
                          <div className="font-bold text-amber-800 dark:text-amber-300">4. Jika nilaiBmi &lt; 18.5 maka:</div>
                          <div className={`pl-6 font-bold ${isHitKurus ? 'text-amber-600 dark:text-amber-300 bg-amber-500/10 rounded px-1.5 py-0.5' : 'text-emerald-700 dark:text-emerald-400'}`}>
                            Tampilkan "Kategori: Kurus" ke layar.
                          </div>
                          <div className="font-bold text-amber-800 dark:text-amber-300">&nbsp;&nbsp;&nbsp;Selain itu jika nilaiBmi &lt;= 24.9 maka:</div>
                          <div className={`pl-6 font-bold ${isHitNormal ? 'text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 rounded px-1.5 py-0.5' : 'text-emerald-700 dark:text-emerald-400'}`}>
                            Tampilkan "Kategori: Normal" ke layar.
                          </div>
                          <div className="font-bold text-amber-800 dark:text-amber-300">&nbsp;&nbsp;&nbsp;Selain itu jika nilaiBmi &lt;= 29.9 maka:</div>
                          <div className={`pl-6 font-bold ${isHitOverweight ? 'text-orange-600 dark:text-orange-300 bg-orange-500/10 rounded px-1.5 py-0.5' : 'text-emerald-700 dark:text-emerald-400'}`}>
                            Tampilkan "Kategori: Overweight" ke layar.
                          </div>
                          <div className="font-bold text-amber-800 dark:text-amber-300">&nbsp;&nbsp;&nbsp;Selain itu:</div>
                          <div className={`pl-6 font-bold ${isHitObesitas ? 'text-rose-600 dark:text-rose-300 bg-rose-500/10 rounded px-1.5 py-0.5' : 'text-emerald-700 dark:text-emerald-400'}`}>
                            Tampilkan "Kategori: Obesitas" ke layar.
                          </div>
                          <div className="pt-2 text-slate-950 dark:text-white font-black">Selesai.</div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium italic leading-relaxed pt-2 border-t border-amber-500/20">
                        *Perhatikan aturan baku: seluruh percabangan berada dalam nomor 4, klausa "Selain itu:" tidak diberi nomor baru, dan kata "Selesai." tanpa nomor urut.
                      </p>
                    </div>
                  )}

                  {/* CARD 2: FORMAT PSEUDOCODE CLRS */}
                  {(capstoneDesignView === 'all' || capstoneDesignView === 'pseudocode') && (
                    <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border-2 border-indigo-400/50 space-y-3.5 shadow-sm flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="font-black text-base md:text-lg text-slate-900 dark:text-white flex items-center justify-between">
                          <span className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300">
                            <FileCode2 className="w-5 h-5 text-indigo-600" />
                            Representasi B: Pseudocode Baku (CLRS)
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-mono font-black px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-900 dark:text-indigo-300 border border-indigo-500/30">
                              Format 3 Blok Baku
                            </span>
                            {capstoneDesignView === 'all' ? (
                              <button
                                onClick={() => setCapstoneDesignView('pseudocode')}
                                title="Fokus / Perbesar Pseudocode"
                                className="p-1 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-950/50 transition-colors cursor-pointer"
                              >
                                <Maximize2 className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => setCapstoneDesignView('all')}
                                title="Kembali ke 3 Kolom"
                                className="p-1 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-950/50 transition-colors cursor-pointer"
                              >
                                <Minimize2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="p-4 md:p-5 bg-white dark:bg-slate-950 rounded-xl border-2 border-slate-300 dark:border-slate-800 font-mono text-xs md:text-sm leading-relaxed text-slate-900 dark:text-slate-100 space-y-1.5 shadow-inner">
                          <div className="text-indigo-700 dark:text-indigo-400 font-black">PROGRAM HitungIndeksMassaTubuh // Menghitung BMI &amp; status kesehatan</div>
                          <div className="text-slate-950 dark:text-white font-black pt-1">KAMUS:</div>
                          <div className="pl-4 text-emerald-700 dark:text-emerald-400 font-bold">beratBadan, tinggiBadan, tinggiMeter, nilaiBmi : float</div>
                          <div className="pl-4 text-emerald-700 dark:text-emerald-400 font-bold">kategori : string</div>
                          <div className="text-slate-950 dark:text-white font-black pt-1">ALGORITMA:</div>
                          <div className="pl-4 font-bold">input(beratBadan)</div>
                          <div className="pl-4 font-bold">input(tinggiBadan)</div>
                          <div className="pl-4">tinggiMeter = tinggiBadan / 100</div>
                          <div className="pl-4">nilaiBmi = beratBadan / (tinggiMeter * tinggiMeter)</div>
                          <div className="pl-4 text-amber-700 dark:text-amber-400 font-black">if nilaiBmi &lt; 18.5 then</div>
                          <div className={`pl-8 font-bold ${isHitKurus ? 'text-amber-600 dark:text-amber-300 bg-amber-500/10 rounded px-1.5 py-0.5' : 'text-cyan-700 dark:text-cyan-400'}`}>
                            output("Kurus", nilaiBmi)
                          </div>
                          <div className="pl-4 text-amber-700 dark:text-amber-400 font-black">else if nilaiBmi &lt;= 24.9 then</div>
                          <div className={`pl-8 font-bold ${isHitNormal ? 'text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 rounded px-1.5 py-0.5' : 'text-cyan-700 dark:text-cyan-400'}`}>
                            output("Normal", nilaiBmi)
                          </div>
                          <div className="pl-4 text-amber-700 dark:text-amber-400 font-black">else if nilaiBmi &lt;= 29.9 then</div>
                          <div className={`pl-8 font-bold ${isHitOverweight ? 'text-orange-600 dark:text-orange-300 bg-orange-500/10 rounded px-1.5 py-0.5' : 'text-cyan-700 dark:text-cyan-400'}`}>
                            output("Overweight", nilaiBmi)
                          </div>
                          <div className="pl-4 text-amber-700 dark:text-amber-400 font-black">else</div>
                          <div className={`pl-8 font-bold ${isHitObesitas ? 'text-rose-600 dark:text-rose-300 bg-rose-500/10 rounded px-1.5 py-0.5' : 'text-cyan-700 dark:text-cyan-400'}`}>
                            output("Obesitas", nilaiBmi)
                          </div>
                          <div className="pl-4 text-amber-700 dark:text-amber-400 font-black">endif</div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium italic leading-relaxed pt-2 border-t border-indigo-500/20">
                        *Perhatikan keselarasan: blok KAMUS memuat variabel hasil tahap Analisis, instruksi I/O universal <code className="text-indigo-700 dark:text-indigo-400 font-bold">input()</code>/<code className="text-indigo-700 dark:text-indigo-400 font-bold">output()</code>, serta penutup wajib <code className="text-amber-700 dark:text-amber-400 font-black">endif</code>.
                      </p>
                    </div>
                  )}

                  {/* CARD 3: FORMAT FLOWCHART ANSI / ISO (YANG SEBELUMNYA HILANG) */}
                  {(capstoneDesignView === 'all' || capstoneDesignView === 'flowchart') && (
                    <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border-2 border-emerald-500/50 space-y-3.5 shadow-sm flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="font-black text-base md:text-lg text-slate-900 dark:text-white flex items-center justify-between">
                          <span className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                            <Workflow className="w-5 h-5 text-emerald-600" />
                            Representasi C: Flowchart ANSI / ISO
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-mono font-black px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-900 dark:text-emerald-300 border border-emerald-500/30">
                              ANSI/ISO 5807
                            </span>
                            {capstoneDesignView === 'all' ? (
                              <button
                                onClick={() => setCapstoneDesignView('flowchart')}
                                title="Fokus / Perbesar Flowchart"
                                className="p-1 rounded-md text-slate-500 hover:text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 transition-colors cursor-pointer"
                              >
                                <Maximize2 className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => setCapstoneDesignView('all')}
                                title="Kembali ke 3 Kolom"
                                className="p-1 rounded-md text-slate-500 hover:text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 transition-colors cursor-pointer"
                              >
                                <Minimize2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* DIAGRAM SVG FLOWCHART RESMI ANSI */}
                        <div className="p-3 bg-slate-950 rounded-xl border-2 border-slate-800 shadow-inner overflow-x-auto">
                          <svg viewBox="0 0 680 770" className="w-full max-w-[620px] mx-auto h-auto block select-none">
                            <defs>
                              <marker
                                id="bmi-arr-gray"
                                viewBox="0 0 10 10"
                                refX="6"
                                refY="5"
                                markerWidth="6"
                                markerHeight="6"
                                orient="auto-start-reverse"
                              >
                                <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
                              </marker>
                              <marker
                                id="bmi-arr-green"
                                viewBox="0 0 10 10"
                                refX="6"
                                refY="5"
                                markerWidth="6"
                                markerHeight="6"
                                orient="auto-start-reverse"
                              >
                                <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                              </marker>
                              <marker
                                id="bmi-arr-rose"
                                viewBox="0 0 10 10"
                                refX="6"
                                refY="5"
                                markerWidth="6"
                                markerHeight="6"
                                orient="auto-start-reverse"
                              >
                                <path d="M 0 1 L 10 5 L 0 9 z" fill="#f43f5e" />
                              </marker>
                              <filter id="bmi-glow-green" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                              </filter>
                              <filter id="bmi-glow-diamond" x="-30%" y="-30%" width="160%" height="160%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                              </filter>
                            </defs>

                            {/* 1. TERMINATOR MULAI */}
                            <rect x="145" y="16" width="130" height="34" rx="17" fill="rgba(16,185,129,0.25)" stroke="#10b981" strokeWidth="2.5" />
                            <text x="210" y="38" textAnchor="middle" fontSize="13" fontWeight="900" fill="#6ee7b7" fontFamily="monospace">
                              ● MULAI
                            </text>
                            <line x1="210" y1="50" x2="210" y2="70" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#bmi-arr-green)" />

                            {/* 2. JAJAR GENJANG INPUT */}
                            <polygon points="110,70 310,70 285,110 85,110" fill="rgba(6,182,212,0.22)" stroke="#06b6d4" strokeWidth="2.5" />
                            <text x="195" y="87" dominantBaseline="central" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#67e8f9" fontFamily="monospace">
                              input(beratBadan, tinggiBadan)
                            </text>
                            <text x="195" y="101" dominantBaseline="central" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#a5f3fc" fontFamily="monospace">
                              [BB: {testWeight} kg, TB: {testHeight} cm]
                            </text>
                            <line x1="210" y1="110" x2="210" y2="128" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#bmi-arr-green)" />

                            {/* 3. PROSES 1: KONVERSI TINGGI KE METER */}
                            <rect x="95" y="128" width="230" height="34" rx="8" fill="rgba(245,158,11,0.18)" stroke="#f59e0b" strokeWidth="2" />
                            <text x="210" y="149" dominantBaseline="central" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fde68a" fontFamily="monospace">
                              tinggiMeter = tinggiBadan / 100
                            </text>
                            <line x1="210" y1="162" x2="210" y2="180" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#bmi-arr-green)" />

                            {/* 4. PROSES 2: KALKULASI RUMUS BMI */}
                            <rect x="85" y="180" width="250" height="34" rx="8" fill="rgba(245,158,11,0.18)" stroke="#f59e0b" strokeWidth="2" />
                            <text x="210" y="201" dominantBaseline="central" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fde68a" fontFamily="monospace">
                              nilaiBmi = berat / (tMeter * tMeter)
                            </text>
                            <line x1="210" y1="214" x2="210" y2="238" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#bmi-arr-green)" />

                            {/* ─── REL PENGUMPUL SISI KANAN (x = 645) ─── */}
                            <line x1="645" y1="273" x2="645" y2="640" stroke="#334155" strokeWidth="2.5" strokeDasharray="4 4" />
                            <line x1="645" y1="640" x2="210" y2="640" stroke="#334155" strokeWidth="2.5" strokeDasharray="4 4" />
                            <line x1="210" y1="640" x2="210" y2="671" stroke="#334155" strokeWidth="2.5" markerEnd="url(#bmi-arr-gray)" />

                            {/* Garis Rel Hijau Aktif jika salah satu cabang Ya terpilih */}
                            {(isHitKurus || isHitNormal || isHitOverweight) && (
                              <>
                                <line
                                  x1="645"
                                  y1={isHitKurus ? 273 : isHitNormal ? 373 : 473}
                                  x2="645"
                                  y2="640"
                                  stroke="#10b981"
                                  strokeWidth="3.5"
                                />
                                <line
                                  x1="645"
                                  y1="640"
                                  x2="210"
                                  y2="640"
                                  stroke="#10b981"
                                  strokeWidth="3.5"
                                />
                                <line
                                  x1="210"
                                  y1="640"
                                  x2="210"
                                  y2="671"
                                  stroke="#10b981"
                                  strokeWidth="3.5"
                                  markerEnd="url(#bmi-arr-green)"
                                />
                              </>
                            )}

                            {/* ─── 5. DIAMOND 1: nilaiBmi < 18.5 ? ─── */}
                            <g>
                              <polygon
                                points="210,238 315,273 210,308 105,273"
                                fill="#451a03"
                                stroke={isHitKurus ? '#10b981' : isCond1PassedFalse ? '#f43f5e' : '#fbbf24'}
                                strokeWidth={isHitKurus ? 3.5 : 2}
                                filter={isHitKurus ? 'url(#bmi-glow-diamond)' : undefined}
                              />
                              <text x="210" y="268" textAnchor="middle" fill="#fde68a" fontSize="12" fontWeight="900" fontFamily="monospace">
                                nilaiBmi &lt; 18.5 ?
                              </text>
                              {/* Badge Hasil Evaluasi */}
                              <rect
                                x="168"
                                y="284"
                                width="84"
                                height="16"
                                rx="8"
                                fill={isHitKurus ? '#065f46' : isCond1PassedFalse ? '#881337' : '#78350f'}
                              />
                              <text x="210" y="296" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="monospace">
                                {isHitKurus ? '✓ TRUE (Ya)' : isCond1PassedFalse ? '✗ FALSE' : 'EVALUASI'}
                              </text>

                              {/* Cabang YA (Ke Kanan) */}
                              <line
                                x1="315"
                                y1="273"
                                x2="375"
                                y2="273"
                                stroke={isHitKurus ? '#10b981' : '#475569'}
                                strokeWidth={isHitKurus ? 3.5 : 1.5}
                                markerEnd={isHitKurus ? 'url(#bmi-arr-green)' : 'url(#bmi-arr-gray)'}
                              />
                              <rect x="330" y="262" width="28" height="15" rx="3" fill={isHitKurus ? '#065f46' : '#1e293b'} />
                              <text x="344" y="273" textAnchor="middle" fill={isHitKurus ? '#6ee7b7' : '#94a3b8'} fontSize="10" fontWeight="bold">
                                Ya
                              </text>

                              {/* Jajar Genjang Output Kurus */}
                              <polygon
                                points="390,253 595,253 575,293 370,293"
                                fill={isHitKurus ? '#064e3b' : '#0f172a'}
                                stroke={isHitKurus ? '#10b981' : '#334155'}
                                strokeWidth={isHitKurus ? 3 : 1.5}
                              />
                              <text x="480" y="273" dominantBaseline="central" textAnchor="middle" fill={isHitKurus ? '#a7f3d0' : '#64748b'} fontSize="11" fontWeight="bold" fontFamily="monospace">
                                output("Kurus", nilaiBmi)
                              </text>
                              {/* Penghubung Output ke Rel */}
                              <line
                                x1="575"
                                y1="273"
                                x2="645"
                                y2="273"
                                stroke={isHitKurus ? '#10b981' : '#334155'}
                                strokeWidth={isHitKurus ? 3.5 : 1.5}
                                strokeDasharray={isHitKurus ? undefined : '3 3'}
                              />

                              {/* Cabang TIDAK (Ke Bawah) */}
                              <line
                                x1="210"
                                y1="308"
                                x2="210"
                                y2="338"
                                stroke={isCond1PassedFalse ? '#f43f5e' : '#475569'}
                                strokeWidth={isCond1PassedFalse ? 2.5 : 1.5}
                                markerEnd={isCond1PassedFalse ? 'url(#bmi-arr-rose)' : 'url(#bmi-arr-gray)'}
                              />
                              <rect x="216" y="316" width="38" height="15" rx="3" fill={isCond1PassedFalse ? '#881337' : '#1e293b'} />
                              <text x="235" y="327" textAnchor="middle" fill={isCond1PassedFalse ? '#fda4af' : '#94a3b8'} fontSize="9.5" fontWeight="bold">
                                Tidak
                              </text>
                            </g>

                            {/* ─── 6. DIAMOND 2: nilaiBmi <= 24.9 ? ─── */}
                            <g opacity={isCond2Skipped ? 0.35 : 1}>
                              <polygon
                                points="210,338 315,373 210,408 105,373"
                                fill={isHitNormal ? '#451a03' : isCond2Skipped ? '#18181b' : '#291305'}
                                stroke={isHitNormal ? '#10b981' : isCond2Skipped ? '#3f3f46' : isCond2PassedFalse ? '#f43f5e' : '#fbbf24'}
                                strokeWidth={isHitNormal ? 3.5 : 2}
                                strokeDasharray={isCond2Skipped ? '4 3' : undefined}
                                filter={isHitNormal ? 'url(#bmi-glow-diamond)' : undefined}
                              />
                              <text x="210" y="368" textAnchor="middle" fill={isCond2Skipped ? '#71717a' : '#fde68a'} fontSize="12" fontWeight="900" fontFamily="monospace">
                                nilaiBmi &lt;= 24.9 ?
                              </text>
                              {/* Badge Hasil Evaluasi */}
                              <rect
                                x="168"
                                y="384"
                                width="84"
                                height="16"
                                rx="8"
                                fill={isCond2Skipped ? '#27272a' : isHitNormal ? '#065f46' : isCond2PassedFalse ? '#881337' : '#78350f'}
                              />
                              <text x="210" y="396" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="monospace">
                                {isCond2Skipped ? '🚫 DILEWATI' : isHitNormal ? '✓ TRUE (Ya)' : isCond2PassedFalse ? '✗ FALSE' : 'EVALUASI'}
                              </text>

                              {/* Cabang YA (Ke Kanan) */}
                              <line
                                x1="315"
                                y1="373"
                                x2="375"
                                y2="373"
                                stroke={isHitNormal ? '#10b981' : '#475569'}
                                strokeWidth={isHitNormal ? 3.5 : 1.5}
                                markerEnd={isHitNormal ? 'url(#bmi-arr-green)' : 'url(#bmi-arr-gray)'}
                              />
                              <rect x="330" y="362" width="28" height="15" rx="3" fill={isHitNormal ? '#065f46' : '#1e293b'} />
                              <text x="344" y="373" textAnchor="middle" fill={isHitNormal ? '#6ee7b7' : '#94a3b8'} fontSize="10" fontWeight="bold">
                                Ya
                              </text>

                              {/* Jajar Genjang Output Normal */}
                              <polygon
                                points="390,353 595,353 575,393 370,393"
                                fill={isHitNormal ? '#064e3b' : '#0f172a'}
                                stroke={isHitNormal ? '#10b981' : '#334155'}
                                strokeWidth={isHitNormal ? 3 : 1.5}
                              />
                              <text x="480" y="373" dominantBaseline="central" textAnchor="middle" fill={isHitNormal ? '#a7f3d0' : '#64748b'} fontSize="11" fontWeight="bold" fontFamily="monospace">
                                output("Normal", nilaiBmi)
                              </text>
                              {/* Penghubung Output ke Rel */}
                              <line
                                x1="575"
                                y1="373"
                                x2="645"
                                y2="373"
                                stroke={isHitNormal ? '#10b981' : '#334155'}
                                strokeWidth={isHitNormal ? 3.5 : 1.5}
                                strokeDasharray={isHitNormal ? undefined : '3 3'}
                              />

                              {/* Cabang TIDAK (Ke Bawah) */}
                              <line
                                x1="210"
                                y1="408"
                                x2="210"
                                y2="438"
                                stroke={isCond2PassedFalse ? '#f43f5e' : '#475569'}
                                strokeWidth={isCond2PassedFalse ? 2.5 : 1.5}
                                markerEnd={isCond2PassedFalse ? 'url(#bmi-arr-rose)' : 'url(#bmi-arr-gray)'}
                              />
                              <rect x="216" y="416" width="38" height="15" rx="3" fill={isCond2PassedFalse ? '#881337' : '#1e293b'} />
                              <text x="235" y="427" textAnchor="middle" fill={isCond2PassedFalse ? '#fda4af' : '#94a3b8'} fontSize="9.5" fontWeight="bold">
                                Tidak
                              </text>
                            </g>

                            {/* ─── 7. DIAMOND 3: nilaiBmi <= 29.9 ? ─── */}
                            <g opacity={isCond3Skipped ? 0.35 : 1}>
                              <polygon
                                points="210,438 315,473 210,508 105,473"
                                fill={isHitOverweight ? '#451a03' : isCond3Skipped ? '#18181b' : '#291305'}
                                stroke={isHitOverweight ? '#10b981' : isCond3Skipped ? '#3f3f46' : isCond3PassedFalse ? '#f43f5e' : '#fbbf24'}
                                strokeWidth={isHitOverweight ? 3.5 : 2}
                                strokeDasharray={isCond3Skipped ? '4 3' : undefined}
                                filter={isHitOverweight ? 'url(#bmi-glow-diamond)' : undefined}
                              />
                              <text x="210" y="468" textAnchor="middle" fill={isCond3Skipped ? '#71717a' : '#fde68a'} fontSize="12" fontWeight="900" fontFamily="monospace">
                                nilaiBmi &lt;= 29.9 ?
                              </text>
                              {/* Badge Hasil Evaluasi */}
                              <rect
                                x="168"
                                y="484"
                                width="84"
                                height="16"
                                rx="8"
                                fill={isCond3Skipped ? '#27272a' : isHitOverweight ? '#065f46' : isCond3PassedFalse ? '#881337' : '#78350f'}
                              />
                              <text x="210" y="496" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="monospace">
                                {isCond3Skipped ? '🚫 DILEWATI' : isHitOverweight ? '✓ TRUE (Ya)' : isCond3PassedFalse ? '✗ FALSE' : 'EVALUASI'}
                              </text>

                              {/* Cabang YA (Ke Kanan) */}
                              <line
                                x1="315"
                                y1="473"
                                x2="375"
                                y2="473"
                                stroke={isHitOverweight ? '#10b981' : '#475569'}
                                strokeWidth={isHitOverweight ? 3.5 : 1.5}
                                markerEnd={isHitOverweight ? 'url(#bmi-arr-green)' : 'url(#bmi-arr-gray)'}
                              />
                              <rect x="330" y="462" width="28" height="15" rx="3" fill={isHitOverweight ? '#065f46' : '#1e293b'} />
                              <text x="344" y="473" textAnchor="middle" fill={isHitOverweight ? '#6ee7b7' : '#94a3b8'} fontSize="10" fontWeight="bold">
                                Ya
                              </text>

                              {/* Jajar Genjang Output Overweight */}
                              <polygon
                                points="390,453 595,453 575,493 370,493"
                                fill={isHitOverweight ? '#064e3b' : '#0f172a'}
                                stroke={isHitOverweight ? '#10b981' : '#334155'}
                                strokeWidth={isHitOverweight ? 3 : 1.5}
                              />
                              <text x="480" y="473" dominantBaseline="central" textAnchor="middle" fill={isHitOverweight ? '#a7f3d0' : '#64748b'} fontSize="11" fontWeight="bold" fontFamily="monospace">
                                output("Overweight", nilaiBmi)
                              </text>
                              {/* Penghubung Output ke Rel */}
                              <line
                                x1="575"
                                y1="473"
                                x2="645"
                                y2="473"
                                stroke={isHitOverweight ? '#10b981' : '#334155'}
                                strokeWidth={isHitOverweight ? 3.5 : 1.5}
                                strokeDasharray={isHitOverweight ? undefined : '3 3'}
                              />

                              {/* Cabang TIDAK (Ke Bawah: Final Else Obesitas) */}
                              <line
                                x1="210"
                                y1="508"
                                x2="210"
                                y2="538"
                                stroke={isHitObesitas ? '#10b981' : '#475569'}
                                strokeWidth={isHitObesitas ? 3 : 1.5}
                                markerEnd={isHitObesitas ? 'url(#bmi-arr-green)' : 'url(#bmi-arr-gray)'}
                              />
                              <rect x="216" y="516" width="38" height="15" rx="3" fill={isHitObesitas ? '#065f46' : '#1e293b'} />
                              <text x="235" y="527" textAnchor="middle" fill={isHitObesitas ? '#6ee7b7' : '#94a3b8'} fontSize="9.5" fontWeight="bold">
                                Tidak
                              </text>
                            </g>

                            {/* ─── 8. OUTPUT OBESITAS (LURUS KE BAWAH) ─── */}
                            <g opacity={isElseSkipped ? 0.35 : 1}>
                              <polygon
                                points="110,538 310,538 285,578 85,578"
                                fill={isHitObesitas ? '#064e3b' : '#0f172a'}
                                stroke={isHitObesitas ? '#10b981' : '#334155'}
                                strokeWidth={isHitObesitas ? 3 : 1.5}
                              />
                              <text x="195" y="558" dominantBaseline="central" textAnchor="middle" fill={isHitObesitas ? '#a7f3d0' : '#64748b'} fontSize="11" fontWeight="bold" fontFamily="monospace">
                                output("Obesitas", nilaiBmi)
                              </text>
                              {/* Garis Masuk ke Titik Temu Alur */}
                              <line
                                x1="210"
                                y1="578"
                                x2="210"
                                y2="671"
                                stroke={isHitObesitas ? '#10b981' : '#475569'}
                                strokeWidth={isHitObesitas ? 3.5 : 1.5}
                                markerEnd={isHitObesitas ? 'url(#bmi-arr-green)' : 'url(#bmi-arr-gray)'}
                              />
                            </g>

                            {/* ─── 9. MERGE NODE (TITIK TEMU SELURUH ALUR CABANG) ─── */}
                            <circle cx="210" cy="680" r="9" fill="#059669" stroke="#34d399" strokeWidth="2" />
                            <text x="210" y="684" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">
                              ●
                            </text>
                            <text x="228" y="684" fill="#94a3b8" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
                              Titik Temu Alur (Merge Node)
                            </text>
                            <line x1="210" y1="689" x2="210" y2="715" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#bmi-arr-green)" />

                            {/* ─── 10. TERMINATOR SELESAI ─── */}
                            <rect x="145" y="715" width="130" height="34" rx="17" fill="rgba(225,29,72,0.25)" stroke="#e11d48" strokeWidth="2.5" />
                            <text x="210" y="737" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fda4af" fontFamily="monospace">
                              ■ SELESAI
                            </text>
                          </svg>

                          {/* GLOSARIUM SIMBOL RESMI ANSI */}
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-3 text-[10px] font-mono border-t border-slate-800 text-slate-400 mt-2">
                            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Oval: Terminator
                            </div>
                            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                              <span className="w-2.5 h-2.5 rounded-xs bg-cyan-500 -skew-x-12"></span> Jajar Genjang: I/O
                            </div>
                            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                              <span className="w-2.5 h-2.5 rounded-xs bg-amber-500"></span> Persegi: Proses Rumus
                            </div>
                            <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                              <span className="w-2.5 h-2.5 bg-[#451a03] border border-amber-400 rotate-45"></span> Belah Ketupat: Cabang
                            </div>
                            <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Lingkaran: Titik Temu
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium italic leading-relaxed pt-2 border-t border-emerald-500/20">
                        *Perhatikan aturan ANSI 5807: Belah ketupat keputusan wajib berkontras tinggi (<code className="text-amber-800 dark:text-amber-300 font-bold">#451a03</code>), notasi fungsi universal berkurung <code className="text-cyan-700 dark:text-cyan-300 font-bold">input()</code> / <code className="text-emerald-700 dark:text-emerald-300 font-bold">output()</code>, serta seluruh cabang menyatu kembali ke lingkaran konektor (Merge Node) sebelum menuju <code className="text-rose-700 dark:text-rose-400 font-black">SELESAI</code>.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB 3: CODING */}
            {activeLabTab === 'coding' && (
              <motion.div
                key="lab-coding"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs md:text-sm text-slate-800 dark:text-slate-200 font-mono font-bold">
                    Bahasa Implementasi: <strong className="text-cyan-700 dark:text-cyan-400">Python 3 (Clean Standard)</strong>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-500/30 font-black">
                    Transkripsi Langsung dari Pseudocode
                  </span>
                </div>

                <div className="p-5 md:p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border-2 border-border dark:border-slate-800 text-xs md:text-sm font-mono text-slate-800 dark:text-slate-100 leading-relaxed overflow-x-auto space-y-1.5 shadow-inner" style={{ fontVariantLigatures: 'none' }}>
                  <div className="text-slate-500 dark:text-slate-400 font-semibold"># =========================================================================</div>
                  <div className="text-slate-500 dark:text-slate-400 font-semibold"># PROGRAM: Hitung Indeks Massa Tubuh (BMI)</div>
                  <div className="text-slate-500 dark:text-slate-400 font-semibold"># Ditranskripsikan langsung dari hasil Analisis dan Desain Pseudocode Bab 3</div>
                  <div className="text-slate-500 dark:text-slate-400 font-semibold"># =========================================================================</div>
                  <div className="pt-2 text-slate-500 dark:text-slate-400 font-semibold"># 1. INPUT: Membaca data masukan dan melakukan konversi tipe ke Float</div>
                  <div><span className="text-cyan-700 dark:text-cyan-300 font-bold">berat_badan</span> = <span className="text-amber-600 dark:text-amber-400 font-bold">float</span>(<span className="text-emerald-700 dark:text-emerald-400 font-bold">input</span>(<span className="text-emerald-800 dark:text-emerald-300 font-medium">"Masukkan berat badan (kg): "</span>))</div>
                  <div><span className="text-cyan-700 dark:text-cyan-300 font-bold">tinggi_badan</span> = <span className="text-amber-600 dark:text-amber-400 font-bold">float</span>(<span className="text-emerald-700 dark:text-emerald-400 font-bold">input</span>(<span className="text-emerald-800 dark:text-emerald-300 font-medium">"Masukkan tinggi badan (cm): "</span>))</div>
                  <div className="pt-2 text-slate-500 dark:text-slate-400 font-semibold"># 2. PROSES: Menghitung persamaan BMI</div>
                  <div><span className="text-cyan-700 dark:text-cyan-300 font-bold">tinggi_meter</span> = <span className="text-cyan-700 dark:text-cyan-300 font-bold">tinggi_badan</span> / <span className="text-purple-700 dark:text-purple-300 font-bold">100.0</span></div>
                  <div><span className="text-cyan-700 dark:text-cyan-300 font-bold">nilai_bmi</span> = <span className="text-cyan-700 dark:text-cyan-300 font-bold">berat_badan</span> / (<span className="text-cyan-700 dark:text-cyan-300 font-bold">tinggi_meter</span> ** <span className="text-purple-700 dark:text-purple-300 font-bold">2</span>)</div>
                  <div className="pt-2 text-slate-500 dark:text-slate-400 font-semibold"># 3. KEPUTUSAN &amp; OUTPUT: Menentukan status kesehatan berdasarkan ambang batas</div>
                  <div><span className="text-indigo-700 dark:text-indigo-400 font-black">if</span> <span className="text-cyan-700 dark:text-cyan-300 font-bold">nilai_bmi</span> &lt; <span className="text-purple-700 dark:text-purple-300 font-bold">18.5</span>:</div>
                  <div className="pl-4"><span className="text-cyan-700 dark:text-cyan-300 font-bold">kategori</span> = <span className="text-emerald-800 dark:text-emerald-300 font-medium">"Kurus (Underweight)"</span></div>
                  <div><span className="text-indigo-700 dark:text-indigo-400 font-black">elif</span> <span className="text-cyan-700 dark:text-cyan-300 font-bold">nilai_bmi</span> &lt;= <span className="text-purple-700 dark:text-purple-300 font-bold">24.9</span>:</div>
                  <div className="pl-4"><span className="text-cyan-700 dark:text-cyan-300 font-bold">kategori</span> = <span className="text-emerald-800 dark:text-emerald-300 font-medium">"Normal (Ideal)"</span></div>
                  <div><span className="text-indigo-700 dark:text-indigo-400 font-black">elif</span> <span className="text-cyan-700 dark:text-cyan-300 font-bold">nilai_bmi</span> &lt;= <span className="text-purple-700 dark:text-purple-300 font-bold">29.9</span>:</div>
                  <div className="pl-4"><span className="text-cyan-700 dark:text-cyan-300 font-bold">kategori</span> = <span className="text-emerald-800 dark:text-emerald-300 font-medium">"Kelebihan Berat Badan (Overweight)"</span></div>
                  <div><span className="text-indigo-700 dark:text-indigo-400 font-black">else</span>:</div>
                  <div className="pl-4"><span className="text-cyan-700 dark:text-cyan-300 font-bold">kategori</span> = <span className="text-emerald-800 dark:text-emerald-300 font-medium">"Obesitas (Obese)"</span></div>
                  <div className="pt-3 text-slate-500 dark:text-slate-400 font-semibold"># 4. Menampilkan hasil terformat</div>
                  <div><span className="text-emerald-700 dark:text-emerald-400 font-bold">print</span>(<span className="text-emerald-800 dark:text-emerald-300 font-medium">f"Skor BMI Anda : {"{"}nilai_bmi:.1f{"}"}"</span>)</div>
                  <div><span className="text-emerald-700 dark:text-emerald-400 font-bold">print</span>(<span className="text-emerald-800 dark:text-emerald-300 font-medium">f"Kategori      : {"{"}kategori{"}"}"</span>)</div>
                </div>

                <div className="p-4 md:p-5 bg-cyan-100/70 dark:bg-cyan-950/50 rounded-2xl border-2 border-cyan-500/50 text-sm md:text-base text-cyan-950 dark:text-cyan-100 font-medium leading-relaxed shadow-sm">
                  <strong className="font-black text-cyan-950 dark:text-cyan-200">Perhatikan Kemudahannya:</strong> Tidak ada satu pun baris di atas yang membingungkan karena struktur variabel, tipe data, dan alur percabangannya telah 100% matang sejak Tahap 1 dan Tahap 2!
                </div>
              </motion.div>
            )}

            {/* TAB 4: TESTING INTERAKTIF */}
            {activeLabTab === 'testing' && (
              <motion.div
                key="lab-testing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Controls Input Simulator */}
                  <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border-2 border-emerald-500/40 space-y-4 shadow-sm">
                    <div className="font-black text-base text-slate-900 dark:text-white flex items-center justify-between">
                      <span className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                        <Play className="w-5 h-5 text-emerald-600" />
                        Simulator Data Uji
                      </span>
                      <button 
                        onClick={() => { setTestWeight('68'); setTestHeight('172'); }}
                        className="text-xs text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white flex items-center gap-1.5 transition-colors font-bold"
                        title="Reset ke nilai default"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Reset
                      </button>
                    </div>

                    <div className="space-y-3.5 text-xs md:text-sm">
                      <div>
                        <label className="block text-slate-900 dark:text-slate-100 font-extrabold mb-1.5">
                          Masukan Berat Badan (kg):
                        </label>
                        <input
                          type="number"
                          value={testWeight}
                          onChange={(e) => setTestWeight(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white font-mono font-black text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/40 shadow-sm"
                          placeholder="contoh: 65.5"
                          step="0.5"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-900 dark:text-slate-100 font-extrabold mb-1.5">
                          Masukan Tinggi Badan (cm):
                        </label>
                        <input
                          type="number"
                          value={testHeight}
                          onChange={(e) => setTestHeight(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white font-mono font-black text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/40 shadow-sm"
                          placeholder="contoh: 170"
                          step="1"
                        />
                      </div>
                    </div>

                    {/* Presets Button */}
                    <div className="space-y-2 pt-2 border-t-2 border-slate-200 dark:border-slate-700">
                      <div className="text-xs text-slate-700 dark:text-slate-300 font-black">Uji Cepat Skenario:</div>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => { setTestWeight('48'); setTestHeight('165'); }}
                          className="px-2.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white border border-slate-300 dark:border-slate-700 text-center transition-colors font-black shadow-sm"
                        >
                          Uji Kurus
                        </button>
                        <button
                          onClick={() => { setTestWeight('65'); setTestHeight('170'); }}
                          className="px-2.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white border border-slate-300 dark:border-slate-700 text-center transition-colors font-black shadow-sm"
                        >
                          Uji Normal
                        </button>
                        <button
                          onClick={() => { setTestWeight('95'); setTestHeight('175'); }}
                          className="px-2.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white border border-slate-300 dark:border-slate-700 text-center transition-colors font-black shadow-sm"
                        >
                          Uji Obesitas
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Execution Output Box */}
                  <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-300 dark:border-slate-700 space-y-4 shadow-sm">
                    <div className="font-black text-base md:text-lg text-slate-900 dark:text-white flex items-center justify-between">
                      <span className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400">
                        <TerminalSquare className="w-5 h-5 text-cyan-600" />
                        Hasil Eksekusi Program (Live Runtime)
                      </span>
                      {isValid ? (
                        <span className="flex items-center gap-1.5 text-xs font-mono font-black text-emerald-800 dark:text-emerald-300 bg-emerald-500/15 px-3 py-1 rounded-md border border-emerald-500/30">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Kasus Valid
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-mono font-black text-rose-800 dark:text-rose-300 bg-rose-500/15 px-3 py-1 rounded-md border border-rose-500/30">
                          <AlertTriangle className="w-4 h-4 text-rose-600" /> Input Tidak Valid
                        </span>
                      )}
                    </div>

                    {isValid && bmiResult !== null ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-1">
                            <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-black">Skor BMI Terhitung</div>
                            <div className="text-3xl md:text-4xl font-black text-indigo-700 dark:text-indigo-400 font-mono">{bmiResult}</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 font-bold">kg / m²</div>
                          </div>
                          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-1">
                            <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-black">Status Evaluasi Cabang</div>
                            <div className={`text-base md:text-lg font-black px-3 py-1.5 rounded-xl border-2 inline-block mt-1 ${categoryColor}`}>
                              {categoryResult}
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs md:text-sm space-y-2">
                          <div className="font-black text-slate-900 dark:text-white">Analisis Uji Kasus:</div>
                          <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                            {statusMessage} Dengan nilai input berat {numWeight} kg dan tinggi {numHeight} cm, variabel <code className="text-indigo-700 dark:text-indigo-400 font-black">tinggiMeter</code> bernilai {(numHeight/100).toFixed(2)} m. Evaluasi percabangan melompat tepat ke blok kondisi yang sesuai.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 rounded-xl bg-rose-500/15 border-2 border-rose-500/40 text-center space-y-2 text-rose-900 dark:text-rose-200">
                        <AlertTriangle className="w-8 h-8 text-rose-600 dark:text-rose-400 mx-auto" />
                        <div className="font-black text-base md:text-lg text-rose-950 dark:text-rose-100">Kesalahan Data Uji Terdeteksi!</div>
                        <p className="text-sm max-w-md mx-auto leading-relaxed text-rose-900 dark:text-rose-200 font-medium">
                          Nilai berat dan tinggi badan wajib berupa angka positif lebih dari nol. Pengujian ini membuktikan pentingnya menambahkan <em>validasi masukan</em> pada program sebelum rumus pembagian dieksekusi.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 4. Matriks Kesalahan Fatal Pemilihan Tipe Data & Analisis */}
      <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-900/40 border-2 border-amber-500/40 rounded-2xl space-y-6 shadow-sm">
        <div className="flex items-center gap-3 text-foreground">
          <AlertTriangle className="w-7 h-7 text-amber-500 shrink-0" />
          <div>
            <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
              Klinik Kesalahan Pemula: Bencana Akibat Lemahnya Analisis Tipe Data
            </h4>
            <p className="text-sm text-slate-800 dark:text-slate-200 font-medium mt-1 leading-relaxed">
              Klik salah satu kasus di bawah untuk mempelajari mengapa kekeliruan analisis di hulu tidak bisa diselamatkan oleh sintaksis kode di hilir.
            </p>
          </div>
        </div>

        {/* Tab selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {commonMistakes.map((mistake, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMistake(idx)}
              className={`p-3.5 text-left rounded-xl border-2 text-xs md:text-sm font-extrabold transition-all ${
                selectedMistake === idx 
                  ? 'bg-amber-500/20 border-amber-500 text-amber-950 dark:text-amber-200 font-black shadow-sm' 
                  : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {mistake.title}
            </button>
          ))}
        </div>

        {/* Card explanation */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border-2 border-amber-500/40 space-y-4 shadow-sm text-xs md:text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-300 dark:border-rose-900/50">
              <div className="font-black text-rose-800 dark:text-rose-300 text-sm flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" /> Bentuk Kesalahan Analisis:
              </div>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">{commonMistakes[selectedMistake].problem}</p>
              <div className="pt-2 font-black text-amber-800 dark:text-amber-300 text-sm flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-600" /> Konsekuensi Fatal di Komputer:
              </div>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">{commonMistakes[selectedMistake].consequence}</p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-300 dark:border-emerald-900/50">
              <div className="font-black text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Solusi Rekayasa yang Tepat:
              </div>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">{commonMistakes[selectedMistake].solution}</p>
              <div className="p-3.5 mt-3 bg-white dark:bg-slate-950 rounded-xl border-2 border-emerald-400/50 text-xs md:text-sm text-emerald-950 dark:text-emerald-200 font-semibold leading-relaxed shadow-sm">
                💡 <strong className="font-black">Kaidah Pedagogis:</strong> "Lebih baik menghabiskan waktu 10 menit ekstra untuk membedah tipe data di atas kertas, daripada menghabiskan waktu 3 hari melakukan debugging mencari sumber kesalahan perhitungan di ribuan baris kode."
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
