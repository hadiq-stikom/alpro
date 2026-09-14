"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Sparkles, RotateCcw } from 'lucide-react';

// ── Jenis Kesalahan Umum ──────────────────────────────────────────────────────
interface MistakeExample {
  id: string;
  title: string;
  wrong: string;
  correct: string;
  errorType: string;
  explanation: string;
}

const MISTAKES: MistakeExample[] = [
  {
    id: 'no-program',
    title: 'Lupa Blok PROGRAM & Deskripsi',
    wrong: `KAMUS:
  nilai : integer

ALGORITMA:
  input(nilai)
  if nilai >= 75 then
    output("Lulus")
  endif`,
    correct: `PROGRAM CekNilai
// Menentukan kelulusan siswa berdasarkan nilai ujian

KAMUS:
  nilai : integer

ALGORITMA:
  input(nilai)
  if nilai >= 75 then
    output("Lulus")
  endif`,
    errorType: 'Struktur Tidak Lengkap',
    explanation: 'Setiap pseudocode wajib diawali dengan deklarasi PROGRAM beserta nama algoritmanya (PascalCase) dan komentar deskripsi fungsi. Tanpa ini, pembaca tidak tahu konteks dari algoritma tersebut.',
  },
  {
    id: 'var-1char',
    title: 'Nama Variabel 1 Huruf',
    wrong: `PROGRAM CekNilai
// Cek kelulusan

KAMUS:
  n : integer

ALGORITMA:
  input(n)
  if n >= 75 then
    output("Lulus")
  endif`,
    correct: `PROGRAM CekNilai
// Cek kelulusan

KAMUS:
  nilaiUjian : integer

ALGORITMA:
  input(nilaiUjian)
  if nilaiUjian >= 75 then
    output("Lulus")
  endif`,
    errorType: 'Nama Variabel Tidak Deskriptif',
    explanation: 'Standar baku mata kuliah ini MELARANG penggunaan variabel satu huruf (n, x, a, b). Gunakan nama variabel deskriptif yang jelas artinya: "nilaiUjian", "totalBelanja", "usiaPengguna".',
  },
  {
    id: 'no-endif',
    title: 'Lupa endif (Penutup IF)',
    wrong: `PROGRAM CekNilai
// Cek kelulusan

KAMUS:
  nilaiUjian : integer

ALGORITMA:
  input(nilaiUjian)
  if nilaiUjian >= 75 then
    output("Lulus")
  else
    output("Tidak Lulus")`,
    correct: `PROGRAM CekNilai
// Cek kelulusan

KAMUS:
  nilaiUjian : integer

ALGORITMA:
  input(nilaiUjian)
  if nilaiUjian >= 75 then
    output("Lulus")
  else
    output("Tidak Lulus")
  endif`,
    errorType: 'Blok Tidak Ditutup',
    explanation: 'Setiap blok IF (baik IF tunggal maupun IF-ELSE) WAJIB diakhiri dengan kata kunci "endif". Tanpa penutup ini, batas akhir percabangan menjadi ambigu.',
  },
  {
    id: 'arrow-assign',
    title: 'Operator Penugasan Salah (<-)',
    wrong: `PROGRAM HitungLuas
// Menghitung luas persegi panjang

KAMUS:
  panjang, lebar : integer
  luas : integer

ALGORITMA:
  input(panjang, lebar)
  luas <- panjang * lebar
  output(luas)`,
    correct: `PROGRAM HitungLuas
// Menghitung luas persegi panjang

KAMUS:
  panjang, lebar : integer
  luas : integer

ALGORITMA:
  input(panjang, lebar)
  luas = panjang * lebar
  output(luas)`,
    errorType: 'Operator Penugasan Salah',
    explanation: 'Standar pseudocode modern menggunakan tanda sama dengan "=" sebagai operator penugasan (assignment) agar seragam dengan Python dan JavaScript. Tanda panah "<-" adalah gaya lama yang tidak lagi digunakan.',
  },
  {
    id: 'single-eq-compare',
    title: 'Salah Operator Perbandingan (= alih-alih ==)',
    wrong: `PROGRAM CekStatus
// Memeriksa status akun

KAMUS:
  status : string

ALGORITMA:
  input(status)
  if status = "LUNAS" then
    output("Terima kasih")
  endif`,
    correct: `PROGRAM CekStatus
// Memeriksa status akun

KAMUS:
  status : string

ALGORITMA:
  input(status)
  if status == "LUNAS" then
    output("Terima kasih")
  endif`,
    errorType: 'Operator Perbandingan Salah',
    explanation: 'Sesuai standar CLRS mata kuliah ini, tanda "=" tunggal adalah operator penugasan nilai (assignment). Untuk menguji kesamaan nilai dalam kondisi IF, wajib menggunakan tanda "==" ganda.',
  },
  {
    id: 'no-kamus',
    title: 'Lupa Deklarasi Variabel di KAMUS:',
    wrong: `PROGRAM CekGanjil
// Menentukan ganjil

KAMUS:

ALGORITMA:
  input(angka)
  if angka % 2 != 0 then
    output("Ganjil")
  endif`,
    correct: `PROGRAM CekGanjil
// Menentukan ganjil

KAMUS:
  angka : integer

ALGORITMA:
  input(angka)
  if angka % 2 != 0 then
    output("Ganjil")
  endif`,
    errorType: 'Variabel Tidak Dideklarasikan',
    explanation: 'Semua variabel yang digunakan dalam ALGORITMA: WAJIB didaftarkan terlebih dahulu pada bagian KAMUS: beserta tipe datanya (integer, float, string, boolean).',
  },
];

// ── Contoh Pseudocode Standar ─────────────────────────────────────────────────
const CORRECT_EXAMPLES = [
  {
    id: 'single',
    label: 'IF Tunggal',
    code: `PROGRAM CekSuhu
// Menampilkan peringatan demam jika suhu tubuh melebihi 37.5

KAMUS:
  suhu : float

ALGORITMA:
  input(suhu)
  if suhu > 37.5 then
    output("Demam! Segera ke dokter.")
  endif`,
  },
  {
    id: 'double',
    label: 'IF-ELSE (Ganda)',
    code: `PROGRAM PenentuKelulusan
// Menentukan status kelulusan siswa berdasarkan batas kelulusan 75

KAMUS:
  nilaiAkhir : integer

ALGORITMA:
  input(nilaiAkhir)
  if nilaiAkhir >= 75 then
    output("Status: LULUS")
  else
    output("Status: TIDAK LULUS")
  endif`,
  },
  {
    id: 'multivar',
    label: 'IF dengan Banyak Variabel',
    code: `PROGRAM KalkulatorDiskon
// Menghitung potongan harga 10% jika total belanja minimal 500.000

KAMUS:
  hargaAsli, totalBelanja : integer
  hargaAkhir, potonganHarga : integer

ALGORITMA:
  input(hargaAsli)
  input(totalBelanja)
  if totalBelanja >= 500000 then
    potonganHarga = hargaAsli * 10 / 100
    hargaAkhir = hargaAsli - potonganHarga
    output("Diskon 10%! Harga akhir: Rp", hargaAkhir)
  else
    hargaAkhir = hargaAsli
    output("Tidak ada diskon. Harga: Rp", hargaAkhir)
  endif`,
  },
];

// ── Validator Pseudocode ──────────────────────────────────────────────────────
interface ValidationResult {
  pass: boolean;
  message: string;
}

function validatePseudocode(code: string): ValidationResult[] {
  const results: ValidationResult[] = [];
  const lines = code.split('\n').map(l => l.trim()).filter(Boolean);
  const upper = code.toUpperCase();

  // 1. Cek PROGRAM
  results.push({
    pass: lines[0]?.startsWith('PROGRAM ') && lines[0].split(' ').length >= 2 && lines[0].split(' ')[1].length > 1,
    message: 'Baris pertama harus diawali "PROGRAM NamaAlgoritma"',
  });

  // 2. Cek KAMUS:
  results.push({
    pass: upper.includes('KAMUS'),
    message: 'Harus memuat blok "KAMUS:" untuk deklarasi variabel',
  });

  // 3. Cek ALGORITMA:
  results.push({
    pass: upper.includes('ALGORITMA'),
    message: 'Harus memuat blok "ALGORITMA:" untuk langkah aksi',
  });

  // 4. Cek tidak ada variabel 1 huruf di KAMUS
  const kamusIdx = lines.findIndex(l => l.toUpperCase().replace(':', '') === 'KAMUS');
  const algIdx = lines.findIndex(l => l.toUpperCase().replace(':', '') === 'ALGORITMA');
  let singleCharVar = false;
  if (kamusIdx >= 0 && algIdx > kamusIdx) {
    for (let i = kamusIdx + 1; i < algIdx; i++) {
      const match = lines[i].match(/^(\w+)\s*:/);
      if (match && match[1].length === 1) { singleCharVar = true; break; }
    }
  }
  results.push({ pass: !singleCharVar, message: 'Nama variabel harus deskriptif (bukan 1 huruf: a, b, x, n...)' });

  // 5. Cek tidak ada arrow assignment
  results.push({
    pass: !code.includes('<-'),
    message: 'Gunakan operator "=" untuk penugasan nilai, bukan "<-"',
  });

  // 6. Cek endif jika ada if
  const hasIf = upper.includes('\nIF ') || upper.includes('   IF ') || upper.includes('\n  IF ') || upper.includes('IF ');
  const hasEndif = upper.includes('ENDIF');
  results.push({
    pass: !hasIf || hasEndif,
    message: 'Setiap blok percabangan IF wajib ditutup dengan "endif"',
  });

  return results;
}

// ── Komponen Utama ────────────────────────────────────────────────────────────
export default function PseudocodeStandardLab() {
  const [activeTab, setActiveTab] = useState<'aturan' | 'salah_vs_benar' | 'validator' | 'contoh'>('aturan');
  const [selectedMistake, setSelectedMistake] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [userCode, setUserCode] = useState(`PROGRAM NamaProgram
// Deskripsi singkat tujuan algoritma

KAMUS:
  variabelSatu : integer

ALGORITMA:
  input(variabelSatu)
  if variabelSatu > 0 then
    output("Nilai Positif")
  endif`);

  const [validationResults, setValidationResults] = useState<ValidationResult[] | null>(null);

  const handleValidate = () => {
    setValidationResults(validatePseudocode(userCode));
  };

  const handleResetEditor = () => {
    setUserCode(`PROGRAM CekNilai
// Menentukan kelulusan siswa

KAMUS:
  nilaiUjian : integer

ALGORITMA:
  input(nilaiUjian)
  if nilaiUjian >= 75 then
    output("Selamat, Anda LULUS!")
  else
    output("Maaf, Anda TIDAK LULUS.")
  endif`);
    setValidationResults(null);
  };

  return (
    <div className="border border-border/60 rounded-3xl overflow-hidden bg-slate-950 shadow-2xl">
      {/* Header */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">📋</span>
          <div>
            <h3 className="font-bold text-sm md:text-base text-slate-100">
              Lab Standar Pseudocode — Percabangan
            </h3>
            <p className="text-xs text-slate-400">
              Panduan Baku: Struktur 3 Blok, Standar Identitas, &amp; Sintaks IF/THEN/ELSE/ENDIF
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 flex-wrap">
          {[
            { id: 'aturan', label: '📖 6 Aturan Baku' },
            { id: 'salah_vs_benar', label: '❌ vs ✅ Kesalahan Umum' },
            { id: 'validator', label: '🔍 Validator Real-time' },
            { id: 'contoh', label: '💡 Contoh Standar' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === t.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 md:p-6">
        {/* ── TAB 1: 6 ATURAN BAKU ─────────────────────────────────────────────── */}
        {activeTab === 'aturan' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3.5 bg-purple-950/40 border border-purple-700/50 rounded-xl">
              <p className="text-purple-300 text-xs font-medium leading-relaxed">
                ⚖️ <strong>Standar Pseudocode Semester 1:</strong> Wajib mematuhi struktur 3 blok baku (PROGRAM, KAMUS:, ALGORITMA:) yang diajarkan pada Bab 3 sebagai jembatan berpikir logis sebelum implementasi bahasa pemrograman.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { no: '1', title: 'Struktur 3 Blok Baku', desc: 'Wajib memuat blok PROGRAM (identitas), KAMUS: (deklarasi variabel & tipe), dan ALGORITMA: (urutan aksi).', badge: 'Wajib' },
                { no: '2', title: 'Nama Variabel Deskriptif', desc: 'DILARANG menggunakan variabel 1 huruf (a, b, x, n). Gunakan nama bermakna: nilaiUjian, totalBelanja, usia.', badge: 'Kritis' },
                { no: '3', title: 'Operator CLRS: Penugasan (=) vs Perbandingan (==)', desc: 'Gunakan tanda "=" untuk memasukkan nilai (assignment) dan tanda "==" untuk membandingkan kesamaan nilai. Tanda "<-" dilarang.', badge: 'Standar CLRS' },
                { no: '4', title: 'Instruksi I/O Universal', desc: 'Gunakan input(namaVariabel) untuk menerima masukan data dan output(nilai/teks) untuk mencetak hasil.', badge: 'Standar' },
                { no: '5', title: 'Blok IF Wajib Ditutup endif', desc: 'Setiap struktur percabangan IF (termasuk yang memiliki ELSE) WAJIB diakhiri dengan kata kunci endif.', badge: 'Kritis' },
                { no: '6', title: 'Kapitalisasi Kata Kunci', desc: 'Kata kunci struktur ditulis kapital: PROGRAM, KAMUS:, ALGORITMA:. Keyword logika: if, then, else, endif.', badge: 'Konvensi' },
              ].map(r => (
                <div key={r.no} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-600/30 text-purple-300 text-xs font-bold flex items-center justify-center">
                        {r.no}
                      </span>
                      <h4 className="font-bold text-xs text-white">{r.title}</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-purple-300 border border-purple-500/30">
                      {r.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-7">{r.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── TAB 2: SALAH VS BENAR ───────────────────────────────────────────── */}
        {activeTab === 'salah_vs_benar' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {MISTAKES.map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMistake(i)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedMistake === i
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  Kasus {i + 1}: {m.title}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Sisi Salah */}
              <div className="bg-red-950/20 border-2 border-red-500/40 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
                  <XCircle className="w-4 h-4" />
                  <span>CONTOH KELIRU (DILARANG)</span>
                </div>
                <pre className="p-3 bg-slate-950 rounded-xl text-xs font-mono text-red-200 overflow-x-auto leading-relaxed border border-red-500/20">
                  {MISTAKES[selectedMistake].wrong}
                </pre>
              </div>

              {/* Sisi Benar */}
              <div className="bg-emerald-950/20 border-2 border-emerald-500/40 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>CONTOH STANDAR BAKU BAB 3 (BENAR)</span>
                </div>
                <pre className="p-3 bg-slate-950 rounded-xl text-xs font-mono text-emerald-200 overflow-x-auto leading-relaxed border border-emerald-500/20">
                  {MISTAKES[selectedMistake].correct}
                </pre>
              </div>
            </div>

            {/* Penjelasan */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Analisis Kesalahan: {MISTAKES[selectedMistake].errorType}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {MISTAKES[selectedMistake].explanation}
              </p>
            </div>
          </motion.div>
        )}

        {/* ── TAB 3: VALIDATOR REAL-TIME ──────────────────────────────────────── */}
        {activeTab === 'validator' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3.5 bg-blue-950/40 border border-blue-700/50 rounded-xl">
              <p className="text-blue-300 text-xs font-medium leading-relaxed">
                🔍 <strong>Uji Mandiri Pseudocode:</strong> Ketik atau edit kode semu Anda di editor bawah ini, lalu klik <strong>Periksa Kepatuhan</strong> untuk mengecek kepatuhan terhadap aturan baku Bab 3.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Editor */}
              <div className="lg:col-span-7 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 font-mono">Editor Pseudocode:</span>
                  <button
                    onClick={handleResetEditor}
                    className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 font-mono cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset Contoh
                  </button>
                </div>
                <textarea
                  value={userCode}
                  onChange={e => setUserCode(e.target.value)}
                  rows={12}
                  className="w-full p-4 bg-slate-900 border border-slate-700 rounded-2xl font-mono text-xs text-slate-100 leading-relaxed focus:outline-none focus:border-purple-500 shadow-inner"
                  spellCheck={false}
                />
                <button
                  onClick={handleValidate}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-purple-900/30"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Periksa Kepatuhan Standar Bab 3
                </button>
              </div>

              {/* Hasil Validasi */}
              <div className="lg:col-span-5 space-y-2">
                <span className="text-xs font-bold text-slate-400 font-mono">Hasil Pemeriksaan:</span>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2.5 min-h-[280px]">
                  {validationResults ? (
                    validationResults.map((r, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        {r.pass ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        )}
                        <span className={r.pass ? 'text-slate-300 font-medium' : 'text-red-300 font-bold'}>
                          {r.message}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-slate-500 italic flex items-center justify-center h-48 text-center">
                      Klik tombol &quot;Periksa Kepatuhan&quot; untuk mengevaluasi kode Anda secara otomatis.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 4: CONTOH STANDAR ───────────────────────────────────────────── */}
        {activeTab === 'contoh' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex gap-2">
              {CORRECT_EXAMPLES.map((ex, i) => (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExample(i)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedExample === i
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {ex.label}
                </button>
              ))}
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-md">
              <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs text-purple-300 font-mono font-bold">
                  {CORRECT_EXAMPLES[selectedExample].label} — Standar Baku Bab 3
                </span>
              </div>
              <pre className="p-5 text-xs md:text-sm font-mono text-slate-200 leading-relaxed overflow-x-auto">
                {CORRECT_EXAMPLES[selectedExample].code}
              </pre>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
