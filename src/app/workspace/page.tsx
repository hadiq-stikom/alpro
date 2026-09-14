"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
  Check,
  LayoutGrid,
  Code2
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { usePython } from '@/hooks/usePython';
import { formatOutputArgsForPseudocode } from '@/lib/algorithm-formatters';

const FlowchartVisualizer = dynamic(() => import('@/components/FlowchartVisualizer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-xs p-4">
      Memuat Diagram Flowchart...
    </div>
  ),
});

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
  chapter: number;
  codeNum: string;
  title: string;
  category: string;
  description: string;
  formula: string;
  pyCode: string;
  jsCode: string;
  theoryDesc: string;
}

const missions: Mission[] = [
  // ── BAB 5: Operator, Ekspresi & Manipulasi Data ──────────────────────────
  {
    id: 1,
    chapter: 5,
    codeNum: '5.1',
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
    chapter: 5,
    codeNum: '5.2',
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
    chapter: 5,
    codeNum: '5.3',
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
    chapter: 5,
    codeNum: '5.4',
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
    chapter: 5,
    codeNum: '5.5',
    title: 'Misi 5.5: Struk Belanja & Compound (f-string & -=)',
    category: 'Compound & String',
    description: 'Perbarui saldo dompet digital setelah belanja menggunakan compound operator (-=) dan format struk f-string.',
    formula: 'saldo -= belanja | struk = f"Halo {nama}, sisa: {saldo}"',
    pyCode: `nama = "Budi"\nsaldo = 150000\nbelanja = 45000\nsaldo -= belanja\nprint(f"Halo {nama}, sisa saldo: Rp {saldo}")`,
    jsCode: `let nama = "Budi";\nlet saldo = 150000;\nlet belanja = 45000;\nsaldo -= belanja;\nconsole.log(\`Halo \${nama}, sisa saldo: Rp \${saldo}\`);`,
    theoryDesc: 'Compound operator (-=) menyederhanakan update nilai pada variabel yang sama.'
  },

  // ── BAB 6: Struktur Percabangan Tunggal & Ganda ───────────────────────────
  {
    id: 6,
    chapter: 6,
    codeNum: '6.1',
    title: 'Misi 6.1: Deteksi Suhu Tubuh Demam (IF Tunggal)',
    category: 'IF Tunggal',
    description: 'Program klinik menguji suhu tubuh pasien. Jika suhu > 37.5°C, tampilkan peringatan "⚠️ Peringatan: Pasien mengalami DEMAM!". Jika suhu normal, pesan peringatan tidak muncul.',
    formula: 'if suhu_tubuh > 37.5: print("⚠️ Pasien mengalami DEMAM!")',
    pyCode: `suhu_tubuh = 38.2\n\nprint(f"Suhu pasien: {suhu_tubuh}°C")\n\nif suhu_tubuh > 37.5:\n    print("⚠️ Peringatan: Pasien mengalami DEMAM!")\n\nprint("Pemeriksaan selesai. Terima kasih.")`,
    jsCode: `let suhuTubuh = 38.2;\n\nconsole.log(\`Suhu pasien: \${suhuTubuh}°C\`);\n\nif (suhuTubuh > 37.5) {\n    console.log("⚠️ Peringatan: Pasien mengalami DEMAM!");\n}\n\nconsole.log("Pemeriksaan selesai. Terima kasih.");`,
    theoryDesc: 'Percabangan Tunggal (IF) mengeksekusi instruksi di dalamnya HANYA jika kondisi bernilai True. Jika False, blok dilewati.'
  },
  {
    id: 7,
    chapter: 6,
    codeNum: '6.2',
    title: 'Misi 6.2: Kupon Diskon Marketplace (IF Tunggal)',
    category: 'IF Tunggal',
    description: 'Sebuah toko online memberikan potongan Rp10.000 jika total belanja mencapai minimal Rp100.000 (>= 100000). Kurangi total_bayar jika syarat terpenuhi.',
    formula: 'total_bayar = total_belanja | if total_belanja >= 100000: total_bayar -= 10000',
    pyCode: `total_belanja = 135000\ntotal_bayar = total_belanja\n\nif total_belanja >= 100000:\n    potongan = 10000\n    total_bayar -= potongan\n    print(f"🎉 Selamat! Anda hemat Rp{potongan:,}")\n\nprint(f"Total Bayar Akhir: Rp{total_bayar:,}")`,
    jsCode: `let totalBelanja = 135000;\nlet totalBayar = totalBelanja;\n\nif (totalBelanja >= 100000) {\n    let potongan = 10000;\n    totalBayar -= potongan;\n    console.log(\`🎉 Selamat! Anda hemat Rp\${potongan.toLocaleString()}\`);\n}\n\nconsole.log(\`Total Bayar Akhir: Rp\${totalBayar.toLocaleString()}\`);`,
    theoryDesc: 'Variabel penampung dimodifikasi di dalam blok IF jika kondisi terpenuhi, atau tetap pada nilai awal jika kondisi False.'
  },
  {
    id: 8,
    chapter: 6,
    codeNum: '6.3',
    title: 'Misi 6.3: Paritas Bilangan Ganjil/Genap (IF-ELSE)',
    category: 'IF-ELSE Ganda',
    description: 'Sistem tilang elektronik memeriksa plat nomor kendaraan. Uji apakah angka plat adalah bilangan GENAP atau GANJIL menggunakan operator modulo (%).',
    formula: 'if angka % 2 == 0 then "GENAP" else "GANJIL"',
    pyCode: `angka = 48\n\nif angka % 2 == 0:\n    print(f"Angka {angka} adalah: BILANGAN GENAP")\nelse:\n    print(f"Angka {angka} adalah: BILANGAN GANJIL")\n\nprint("Analisis plat nomor selesai.")`,
    jsCode: `let angka = 48;\n\nif (angka % 2 === 0) {\n    console.log(\`Angka \${angka} adalah: BILANGAN GENAP\`);\n} else {\n    console.log(\`Angka \${angka} adalah: BILANGAN GANJIL\`);\n}\n\nconsole.log("Analisis plat nomor selesai.");`,
    theoryDesc: 'Percabangan Ganda (IF-ELSE) menyediakan tepat dua cabang tindakan saling eksklusif. Salah satu cabang pasti dieksekusi.'
  },
  {
    id: 9,
    chapter: 6,
    codeNum: '6.4',
    title: 'Misi 6.4: Evaluasi Kelulusan Siswa (IF-ELSE)',
    category: 'IF-ELSE Ganda',
    description: 'Sistem akademik menentukan kelulusan siswa berdasarkan nilai ujian. Syarat LULUS adalah nilaiAkhir >= 75. Selain itu, dinyatakan TIDAK LULUS.',
    formula: 'if nilai_akhir >= 75: "LULUS" else: "TIDAK LULUS"',
    pyCode: `nilai_akhir = 82\n\nif nilai_akhir >= 75:\n    print("🎉 Selamat! Status Anda: LULUS")\n    print("Nilai Anda memenuhi batas kelulusan.")\nelse:\n    print("❌ Status Anda: TIDAK LULUS")\n    print("Silakan mengikuti ujian remedial.")\n\nprint(f"Nilai Siswa: {nilai_akhir}/100")`,
    jsCode: `let nilaiAkhir = 82;\n\nif (nilaiAkhir >= 75) {\n    console.log("🎉 Selamat! Status Anda: LULUS");\n    console.log("Nilai Anda memenuhi batas kelulusan.");\n} else {\n    console.log("❌ Status Anda: TIDAK LULUS");\n    console.log("Silakan mengikuti ujian remedial.");\n}\n\nconsole.log(\`Nilai Siswa: \${nilaiAkhir}/100\`);`,
    theoryDesc: 'Kondisi relasional (>=) membagi data ke dalam dua kubu keputusan biner secara tegas.'
  },
  {
    id: 10,
    chapter: 6,
    codeNum: '6.5',
    title: 'Misi 6.5: Simulasi Tarik Tunai ATM (IF-ELSE)',
    category: 'IF-ELSE Ganda',
    description: 'Mesin ATM memeriksa saldo sebelum mengeluarkan uang. Jika saldo mencukupi (jumlah_tarik <= saldo), kurangi saldo. Jika tidak, batalkan transaksi.',
    formula: 'if jumlah_tarik <= saldo: saldo -= jumlah_tarik else: "Saldo Kurang"',
    pyCode: `saldo = 500000\njumlah_tarik = 200000\n\nprint(f"Saldo awal: Rp{saldo:,}")\nprint(f"Permintaan tarik: Rp{jumlah_tarik:,}")\n\nif jumlah_tarik <= saldo:\n    saldo -= jumlah_tarik\n    print("💵 Transaksi BERHASIL! Silakan ambil uang Anda.")\n    print(f"Sisa saldo Anda: Rp{saldo:,}")\nelse:\n    print("❌ Transaksi GAGAL: Saldo Anda tidak mencukupi!")\n\nprint("Terima kasih telah menggunakan ATM.")`,
    jsCode: `let saldo = 500000;\nlet jumlahTarik = 200000;\n\nconsole.log(\`Saldo awal: Rp\${saldo.toLocaleString()}\`);\nconsole.log(\`Permintaan tarik: Rp\${jumlahTarik.toLocaleString()}\`);\n\nif (jumlahTarik <= saldo) {\n    saldo -= jumlahTarik;\n    console.log("💵 Transaksi BERHASIL! Silakan ambil uang Anda.");\n    console.log(\`Sisa saldo Anda: Rp\${saldo.toLocaleString()}\`);\n} else {\n    console.log("❌ Transaksi GAGAL: Saldo Anda tidak mencukupi!");\n}\n\nconsole.log("Terima kasih telah menggunakan ATM.");`,
    theoryDesc: 'Struktur IF-ELSE sering digunakan sebagai penjaga validasi (guard condition) sebelum memanipulasi saldo memori.'
  },

  // ── BAB 7: Percabangan Majemuk & Bersarang (Nested IF / ELIF) ───────────
  {
    id: 11,
    chapter: 7,
    codeNum: '7.1',
    title: 'Misi 7.1: Konversi Predikat Akademik (IF - ELIF - ELSE)',
    category: 'Percabangan Majemuk',
    description: 'Sistem akademik mengonversi skor nilai (0-100) ke dalam predikat mutu huruf: nilai >= 85 ("A"), nilai >= 70 ("B"), nilai >= 55 ("C"), nilai >= 40 ("D"), dan selain itu ("E").',
    formula: 'if nilai >= 85: "A" elif nilai >= 70: "B" elif nilai >= 55: "C" elif nilai >= 40: "D" else: "E"',
    pyCode: `nilai = 82\n\nif nilai >= 85:\n    grade = "A"\n    predikat = "Sangat Memuaskan"\nelif nilai >= 70:\n    grade = "B"\n    predikat = "Memuaskan"\nelif nilai >= 55:\n    grade = "C"\n    predikat = "Cukup"\nelif nilai >= 40:\n    grade = "D"\n    predikat = "Kurang"\nelse:\n    grade = "E"\n    predikat = "Gagal"\n\nprint(f"Skor Ujian: {nilai}")\nprint(f"Hasil Evaluasi: Grade {grade} ({predikat})")`,
    jsCode: `let nilai = 82;\nlet grade = "";\nlet predikat = "";\n\nif (nilai >= 85) {\n    grade = "A";\n    predikat = "Sangat Memuaskan";\n} else if (nilai >= 70) {\n    grade = "B";\n    predikat = "Memuaskan";\n} else if (nilai >= 55) {\n    grade = "C";\n    predikat = "Cukup";\n} else if (nilai >= 40) {\n    grade = "D";\n    predikat = "Kurang";\n} else {\n    grade = "E";\n    predikat = "Gagal";\n}\n\nconsole.log(\`Skor Ujian: \${nilai}\`);\nconsole.log(\`Hasil Evaluasi: Grade \${grade} (\${predikat})\`);`,
    theoryDesc: 'Percabangan Majemuk (IF - ELIF - ELSE) mengevaluasi kondisi secara sekuensial dari atas ke bawah (dari kondisi paling spesifik ke paling umum).'
  },
  {
    id: 12,
    chapter: 7,
    codeNum: '7.2',
    title: 'Misi 7.2: Kategori Usia & Tarif Tiket (IF - ELIF - ELSE)',
    category: 'Percabangan Majemuk',
    description: 'Bioskop menetapkan harga tiket berdasarkan kelompok usia: Balita usia < 5 thn gratis (Rp0), Anak usia < 12 thn Rp25.000, Remaja/Dewasa usia < 60 thn Rp50.000, dan Lansia (>= 60 thn) diskon khusus lansia Rp30.000.',
    formula: 'if usia < 5: 0 elif usia < 12: 25000 elif usia < 60: 50000 else: 30000',
    pyCode: `usia = 63\n\nif usia < 5:\n    kategori = "Balita"\n    tarif = 0\nelif usia < 12:\n    kategori = "Anak-anak"\n    tarif = 25000\nelif usia < 60:\n    kategori = "Dewasa"\n    tarif = 50000\nelse:\n    kategori = "Lansia"\n    tarif = 30000\n\nprint(f"Usia Penonton: {usia} tahun")\nprint(f"Kategori: {kategori}")\nprint(f"Tarif Tiket: Rp{tarif:,}")`,
    jsCode: `let usia = 63;\nlet kategori = "";\nlet tarif = 0;\n\nif (usia < 5) {\n    kategori = "Balita";\n    tarif = 0;\n} else if (usia < 12) {\n    kategori = "Anak-anak";\n    tarif = 25000;\n} else if (usia < 60) {\n    kategori = "Dewasa";\n    tarif = 50000;\n} else {\n    kategori = "Lansia";\n    tarif = 30000;\n}\n\nconsole.log(\`Usia Penonton: \${usia} tahun\`);\nconsole.log(\`Kategori: \${kategori}\`);\nconsole.log(\`Tarif Tiket: Rp\${tarif.toLocaleString()}\`);`,
    theoryDesc: 'Pengujian rentang usia menggunakan elif memastikan hanya satu kategori harga tiket yang terpilih.'
  },
  {
    id: 13,
    chapter: 7,
    codeNum: '7.3',
    title: 'Misi 7.3: Skrining Donor Darah PMI (Nested IF)',
    category: 'Percabangan Bersarang',
    description: 'PMI menetapkan syarat bertingkat: Pendonor harus berusia minimal 17 tahun. Jika lolos usia, berat badan harus minimal 45 kg. Jika kedua syarat lolos, dinyatakan "MEMENUHI SYARAT". Berikan umpan balik spesifik jika gugur pada gerbang tertentu.',
    formula: 'if usia >= 17: if berat >= 45: "LOLOS" else: "Gagal Berat" else: "Gagal Usia"',
    pyCode: `usia = 19\nberat_badan = 52\n\nprint("=== SKRINING DONOR DARAH PMI ===")\nprint(f"Data: Usia {usia} thn, Berat {berat_badan} kg")\n\nif usia >= 17:\n    if berat_badan >= 45:\n        print("✅ Status: MEMENUHI SYARAT DONOR DARAH")\n        print("Silakan menuju meja pengambilan darah.")\n    else:\n        print("❌ Status: DITOLAK")\n        print("Alasan: Berat badan minimal 45 kg belum terpenuhi.")\nelse:\n    print("❌ Status: DITOLAK")\n    print("Alasan: Usia minimal pendonor adalah 17 tahun.")`,
    jsCode: `let usia = 19;\nlet beratBadan = 52;\n\nconsole.log("=== SKRINING DONOR DARAH PMI ===");\nconsole.log(\`Data: Usia \${usia} thn, Berat \${beratBadan} kg\`);\n\nif (usia >= 17) {\n    if (beratBadan >= 45) {\n        console.log("✅ Status: MEMENUHI SYARAT DONOR DARAH");\n        console.log("Silakan menuju meja pengambilan darah.");\n    } else {\n        console.log("❌ Status: DITOLAK");\n        console.log("Alasan: Berat badan minimal 45 kg belum terpenuhi.");\n    }\n} else {\n    console.log("❌ Status: DITOLAK");\n    console.log("Alasan: Usia minimal pendonor adalah 17 tahun.");\n}`,
    theoryDesc: 'Percabangan Bersarang (Nested IF) berfungsi sebagai gerbang prasyarat (gatekeeper): kondisi ke-2 hanya diuji jika kondisi ke-1 terpenuhi.'
  },
  {
    id: 14,
    chapter: 7,
    codeNum: '7.4',
    title: 'Misi 7.4: Kalkulator Diskon Kasir Member (Nested IF)',
    category: 'Percabangan Bersarang',
    description: 'Toko memberikan diskon bertingkat: Jika pelanggan adalah member (is_member == True), periksa total belanjanya. Jika belanja >= 200.000 diskon 20%, selain itu diskon 10%. Pelanggan non-member hanya dapat diskon 5% jika belanja >= 300.000.',
    formula: 'if is_member: (20% if belanja >= 200rb else 10%) else: (5% if belanja >= 300rb else 0%)',
    pyCode: `is_member = True\ntotal_belanja = 240000\n\nif is_member:\n    if total_belanja >= 200000:\n        diskon_persen = 20\n    else:\n        diskon_persen = 10\nelse:\n    if total_belanja >= 300000:\n        diskon_persen = 5\n    else:\n        diskon_persen = 0\n\npotongan = total_belanja * diskon_persen // 100\ntotal_bayar = total_belanja - potongan\n\nprint(f"Status: {'Member' if is_member else 'Non-Member'}")\nprint(f"Total Belanja: Rp{total_belanja:,}")\nprint(f"Diskon Didapat: {diskon_persen}% (Hemat Rp{potongan:,})")\nprint(f"Total Bayar: Rp{total_bayar:,}")`,
    jsCode: `let isMember = true;\nlet totalBelanja = 240000;\nlet diskonPersen = 0;\n\nif (isMember) {\n    if (totalBelanja >= 200000) {\n        diskonPersen = 20;\n    } else {\n        diskonPersen = 10;\n    }\n} else {\n    if (totalBelanja >= 300000) {\n        diskonPersen = 5;\n    } else {\n        diskonPersen = 0;\n    }\n}\n\nlet potongan = Math.floor((totalBelanja * diskonPersen) / 100);\nlet totalBayar = totalBelanja - potongan;\n\nconsole.log(\`Status: \${isMember ? 'Member' : 'Non-Member'}\`);\nconsole.log(\`Total Belanja: Rp\${totalBelanja.toLocaleString()}\`);\nconsole.log(\`Diskon Didapat: \${diskonPersen}% (Hemat Rp\${potongan.toLocaleString()})\`);\nconsole.log(\`Total Bayar: Rp\${totalBayar.toLocaleString()}\`);`,
    theoryDesc: 'Kombinasi pengecekan status keanggotaan dan nilai transaksi dalam struktur bersarang menghasilkan skema harga dinamis yang akurat.'
  },
  {
    id: 15,
    chapter: 7,
    codeNum: '7.5',
    title: 'Misi 7.5: Menu Transaksi Layanan ATM (Multi-Way Selection)',
    category: 'Pemilihan Diskrit',
    description: 'Mesin ATM melayani 4 pilihan menu: 1 untuk "Cek Saldo", 2 untuk "Tarik Tunai", 3 untuk "Transfer", dan 4 untuk "Keluar". Tangani pula opsi selain angka 1-4 sebagai input tidak valid.',
    formula: 'match pilihan: case 1: ... case 2: ... case 3: ... case 4: ... case _: ...',
    pyCode: `pilihan_menu = 2\nsaldo = 1500000\n\nprint("=== MENU TRANSAKSI ATM ===")\n\nif pilihan_menu == 1:\n    print(f"Saldo rekening Anda: Rp{saldo:,}")\nelif pilihan_menu == 2:\n    tarik = 200000\n    if tarik <= saldo:\n        saldo -= tarik\n        print(f"Penarikan Rp{tarik:,} berhasil!")\n        print(f"Sisa saldo: Rp{saldo:,}")\n    else:\n        print("Saldo tidak mencukupi.")\nelif pilihan_menu == 3:\n    print("Silakan masukkan nomor rekening tujuan transfer.")\nelif pilihan_menu == 4:\n    print("Transaksi selesai. Kartu Anda telah dikeluarkan.")\nelse:\n    print("⚠️ Pilihan menu tidak valid. Silakan tekan angka 1 - 4.")`,
    jsCode: `let pilihanMenu = 2;\nlet saldo = 1500000;\n\nconsole.log("=== MENU TRANSAKSI ATM ===");\n\nswitch (pilihanMenu) {\n    case 1:\n        console.log(\`Saldo rekening Anda: Rp\${saldo.toLocaleString()}\`);\n        break;\n    case 2:\n        let tarik = 200000;\n        if (tarik <= saldo) {\n            saldo -= tarik;\n            console.log(\`Penarikan Rp\${tarik.toLocaleString()} berhasil!\`);\n            console.log(\`Sisa saldo: Rp\${saldo.toLocaleString()}\`);\n        } else {\n            console.log("Saldo tidak mencukupi.");\n        }\n        break;\n    case 3:\n        console.log("Silakan masukkan nomor rekening tujuan transfer.");\n        break;\n    case 4:\n        console.log("Transaksi selesai. Kartu Anda telah dikeluarkan.");\n        break;\n    default:\n        console.log("⚠️ Pilihan menu tidak valid. Silakan tekan angka 1 - 4.");\n        break;\n}`,
    theoryDesc: 'Pemilihan nilai diskrit pasti cocok diimplementasikan menggunakan if-elif maupun switch/match case dengan penanganan fallback default.'
  }
];

function WorkspaceContent() {
  const searchParams = useSearchParams();
  const chapterParam = searchParams.get('chapter');
  const initialChapter = chapterParam === '7' ? 7 : chapterParam === '6' ? 6 : 5;
  const initialMissionId = initialChapter === 7 ? 11 : initialChapter === 6 ? 6 : 1;

  const [selectedChapter, setSelectedChapter] = useState<5 | 6 | 7>(initialChapter);
  const [selectedMissionId, setSelectedMissionId] = useState(initialMissionId);
  const [activeTab, setActiveTab] = useState<'task' | 'theory'>('task');
  const [normalTab, setNormalTab] = useState<'flowchart' | 'pseudocode' | 'narrative'>('flowchart');
  const [visiblePanels, setVisiblePanels] = useState<{
    flowchart: boolean;
    pseudocode: boolean;
    narrative: boolean;
  }>({
    flowchart: true,
    pseudocode: true,
    narrative: true,
  });
  const [showMemory, setShowMemory] = useState(true);
  const [isVisualizerMaximized, setIsVisualizerMaximized] = useState(false);
  const [flowchartOrientation, setFlowchartOrientation] = useState<'vertical' | 'horizontal'>('vertical');
  const [chatInput, setChatInput] = useState('');
  const [hoveredStepKey, setHoveredStepKey] = useState<string | null>(null);

  const togglePanel = (key: 'flowchart' | 'pseudocode' | 'narrative') => {
    setVisiblePanels(prev => {
      const activeCount = Object.values(prev).filter(Boolean).length;
      if (prev[key] && activeCount <= 1) {
        return prev;
      }
      return { ...prev, [key]: !prev[key] };
    });
  };

  const activeAlgoCount = 
    (visiblePanels.narrative ? 1 : 0) + 
    (visiblePanels.flowchart ? 1 : 0) + 
    (visiblePanels.pseudocode ? 1 : 0);

  const totalStudioCols = activeAlgoCount + 1;

  const getStudioGridClass = () => {
    if (totalStudioCols === 4) {
      return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.05fr_1.6fr_1.15fr_1.35fr] min-w-[1100px] xl:min-w-0';
    }
    if (totalStudioCols === 3) {
      if (visiblePanels.flowchart && visiblePanels.pseudocode) {
        return 'grid-cols-1 md:grid-cols-3 xl:grid-cols-[1.85fr_1.2fr_1.4fr] min-w-[900px] xl:min-w-0';
      }
      if (visiblePanels.narrative && visiblePanels.flowchart) {
        return 'grid-cols-1 md:grid-cols-3 xl:grid-cols-[1.1fr_1.85fr_1.4fr] min-w-[900px] xl:min-w-0';
      }
      return 'grid-cols-1 md:grid-cols-3 xl:grid-cols-[1.25fr_1.25fr_1.4fr] min-w-[850px] xl:min-w-0';
    }
    if (totalStudioCols === 2) {
      if (visiblePanels.flowchart) {
        return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.45fr_1fr] min-w-[750px] xl:min-w-0';
      }
      return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.1fr_1fr] min-w-[700px] xl:min-w-0';
    }
    return 'grid-cols-1';
  };

  
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

  // Handle Chapter Switch
  const handleSwitchChapter = (ch: 5 | 6 | 7) => {
    setSelectedChapter(ch);
    const chapterMissions = missions.filter(m => m.chapter === ch);
    if (chapterMissions.length > 0) {
      const firstM = chapterMissions[0];
      setSelectedMissionId(firstM.id);
      setPythonCode(firstM.pyCode);
      setJsCode(firstM.jsCode);
    }
  };

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
    { role: 'bot', text: 'Halo! Pilih misi di bagian atas, modifikasi kode di editor, dan perhatikan bagaimana Flowchart & RAM bereaksi secara real-time!' }
  ]);

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const newMessages = [...messages, { role: 'user' as const, text: chatInput }];
    setMessages(newMessages);
    setChatInput('');
    
    setTimeout(() => {
      setMessages([...newMessages, { role: 'bot', text: `Pertanyaan bagus mengenai ${currentMission.category}. Perhatikan rumus/kondisi: ${currentMission.formula}. Coba ubah angkanya di editor!` }]);
    }, 1000);
  };

  const handleRun = async () => {
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

  const highlightCode = (codeStr: string) => {
    const grammar = language === 'python' ? Prism.languages.python : Prism.languages.javascript;
    return Prism.highlight(codeStr, grammar, language);
  };

  const renderPseudocode = (isCompact = false) => {
    const progName = currentMission.title.split(':')[1]?.trim().replace(/[^a-zA-Z0-9]/g, '') || 'LabAlgoritma';
    // Deteksi variabel dari runtime atau parsing statis dari kode
    const extractedVars: Record<string, string> = { ...variables };
    if (Object.keys(extractedVars).length === 0) {
      code.split('\n').forEach(line => {
        const trimmed = line.trim().replace(/^(let|const|var)\s+/, '').replace(/;/g, '').trim();
        if (trimmed.includes('=') && !trimmed.startsWith('if') && !trimmed.startsWith('while') && !trimmed.startsWith('for')) {
          const varName = trimmed.split('=')[0].trim();
          if (varName && /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(varName)) {
            extractedVars[varName] = 'float';
          }
        }
      });
    }
    const varEntries = Object.entries(extractedVars);
    
    const innerContent = (
      <>
        {/* 1. Header */}
        <div className="text-violet-600 dark:text-violet-400 font-extrabold text-sm md:text-base tracking-wide break-words leading-snug">
          PROGRAM {progName}
        </div>
        <div className="text-muted-foreground text-[11px] md:text-xs italic mb-3 font-sans border-b border-border/40 pb-2 mt-0.5 leading-relaxed break-words">
          // {currentMission.description}
        </div>
        
        {/* 2. Kamus */}
        <div className="text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider mb-1">
          KAMUS:
        </div>
        <div className="pl-3 mb-3 text-xs space-y-0.5 text-foreground/90">
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
        <div className="pl-2 text-xs space-y-1 text-foreground/90 font-medium">
          {(() => {
            const lines = code.split('\n');
            const items: {
              type: 'if' | 'else_if' | 'else' | 'endif' | 'input' | 'output' | 'assign' | 'other';
              text: string;
              level: number;
              lineIdx?: number;
              stepKey?: string;
              cond?: string;
              varName?: string;
              args?: string;
              left?: string;
              right?: string;
            }[] = [];
            const ifStack: { baseIndent: number; level: number; lineIdx: number; stepKey: string }[] = [];

            for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
              const rawLineText = lines[lineIdx];
              const rawLine = rawLineText.trim();
              if (!rawLine || rawLine.startsWith('#') || rawLine.startsWith('//')) continue;

              const indent = rawLineText.search(/\S/);

              // JS closing brace '}'
              if (rawLine === '}' || rawLine.startsWith('}')) {
                if (rawLine === '}') {
                  if (ifStack.length > 0) {
                    const top = ifStack.pop()!;
                    items.push({
                      type: 'endif',
                      text: 'endif',
                      level: top.level,
                      lineIdx,
                      stepKey: `line-${lineIdx}`
                    });
                  }
                  continue;
                }
              }

              // In Python, check if indentation decreased below active if blocks
              if (ifStack.length > 0 && indent !== -1) {
                const isElif = rawLine.startsWith('elif ') || rawLine.startsWith('elif(') || rawLine.startsWith('} else if') || rawLine.startsWith('else if');
                const isElse = rawLine === 'else:' || rawLine.startsWith('else:') || rawLine.startsWith('else') || rawLine.startsWith('} else');

                if (isElif || isElse) {
                  // Pop any inner nested ifs that were deeper than this elif/else
                  while (ifStack.length > 0 && ifStack[ifStack.length - 1].baseIndent > indent) {
                    const top = ifStack.pop()!;
                    items.push({
                      type: 'endif',
                      text: 'endif',
                      level: top.level,
                      lineIdx: top.lineIdx,
                      stepKey: top.stepKey
                    });
                  }
                } else {
                  // Normal statement with smaller indent -> close if blocks
                  while (ifStack.length > 0 && ifStack[ifStack.length - 1].baseIndent >= indent) {
                    const top = ifStack.pop()!;
                    items.push({
                      type: 'endif',
                      text: 'endif',
                      level: top.level,
                      lineIdx: top.lineIdx,
                      stepKey: top.stepKey
                    });
                  }
                }
              }

              const currentLevel = ifStack.length > 0 ? ifStack[ifStack.length - 1].level + 1 : 0;
              const stepKey = `line-${lineIdx}`;
              const normalizedLine = rawLine.replace(/^(let|const|var)\s+/, '').replace(/;/g, '').trim();

              // 1. IF statement
              if (rawLine.startsWith('if ') || rawLine.startsWith('if(')) {
                const cond = rawLine
                  .replace(/^if\s*\(?/, '')
                  .replace(/\)?\s*:\s*$/, '')
                  .replace(/\)?\s*\{\s*$/, '')
                  .trim();
                
                const myLevel = ifStack.length; // at current block level
                ifStack.push({ baseIndent: indent !== -1 ? indent : 0, level: myLevel, lineIdx, stepKey });

                items.push({
                  type: 'if',
                  text: `if ${cond} then`,
                  cond,
                  level: myLevel,
                  lineIdx,
                  stepKey
                });
                continue;
              }

              // 2. ELIF / ELSE IF statement
              if (rawLine.startsWith('elif ') || rawLine.startsWith('elif(') || rawLine.startsWith('} else if') || rawLine.startsWith('else if')) {
                const cond = rawLine
                  .replace(/^(?:\}\s*)?else\s+if\s*\(?/, '')
                  .replace(/^elif\s*\(?/, '')
                  .replace(/\)?\s*:\s*$/, '')
                  .replace(/\)?\s*\{\s*$/, '')
                  .trim();

                const topLevel = ifStack.length > 0 ? ifStack[ifStack.length - 1].level : 0;
                items.push({
                  type: 'else_if',
                  text: `else if ${cond} then`,
                  cond,
                  level: topLevel,
                  lineIdx,
                  stepKey
                });
                continue;
              }

              // 3. ELSE statement
              if (rawLine === 'else:' || rawLine.startsWith('else:') || rawLine.startsWith('else') || rawLine.startsWith('} else')) {
                const topLevel = ifStack.length > 0 ? ifStack[ifStack.length - 1].level : 0;
                items.push({
                  type: 'else',
                  text: 'else',
                  level: topLevel,
                  lineIdx,
                  stepKey
                });
                continue;
              }

              // 4. Input statement
              if (normalizedLine.includes('=') && (normalizedLine.includes('input(') || normalizedLine.includes('prompt('))) {
                const parts = normalizedLine.split('=');
                const varName = parts[0].trim();
                items.push({
                  type: 'input',
                  text: `input(${varName})`,
                  varName,
                  level: currentLevel,
                  lineIdx,
                  stepKey
                });
                continue;
              }

              // 5. Output statement
              if (normalizedLine.startsWith('print') || normalizedLine.startsWith('console.log')) {
                const match = normalizedLine.match(/\((.*)\)/);
                const rawArgs = match ? match[1].trim() : '';
                const args = formatOutputArgsForPseudocode(rawArgs);
                items.push({
                  type: 'output',
                  text: `output(${args})`,
                  args,
                  level: currentLevel,
                  lineIdx,
                  stepKey
                });
                continue;
              }

              // 6. Assignment
              if (normalizedLine.includes('=')) {
                const parts = normalizedLine.split('=');
                const left = parts[0].trim();
                const right = parts.slice(1).join('=').trim();
                items.push({
                  type: 'assign',
                  text: `${left} = ${right}`,
                  left,
                  right,
                  level: currentLevel,
                  lineIdx,
                  stepKey
                });
                continue;
              }

              // 7. Other statement
              items.push({
                type: 'other',
                text: normalizedLine,
                level: currentLevel,
                lineIdx,
                stepKey
              });
            }

            // Close any remaining if blocks at end of file
            while (ifStack.length > 0) {
              const top = ifStack.pop()!;
              items.push({
                type: 'endif',
                text: 'endif',
                level: top.level,
                lineIdx: top.lineIdx,
                stepKey: top.stepKey
              });
            }

            return items.map((item, idx) => {
              const isHovered = Boolean(item.stepKey && hoveredStepKey === item.stepKey);
              const hoverClass = `transition-all duration-200 cursor-pointer rounded-lg px-2 py-1 ${
                isHovered
                  ? 'bg-purple-500/20 border-l-4 border-purple-500 font-bold shadow-sm translate-x-1'
                  : 'hover:bg-muted/40 border-l-4 border-transparent'
              }`;

              let content: React.ReactNode = null;
              if (item.type === 'if' || item.type === 'else_if') {
                content = (
                  <span className="text-amber-500 dark:text-amber-300 font-bold">
                    {item.type === 'if' ? 'if ' : 'else if '}
                    <span className="text-amber-600 dark:text-amber-100">{item.cond}</span>
                    <span> then</span>
                  </span>
                );
              } else if (item.type === 'else') {
                content = <span className="text-amber-500 dark:text-amber-300 font-bold">else</span>;
              } else if (item.type === 'endif') {
                content = <span className="text-amber-500 dark:text-amber-300 font-bold">endif</span>;
              } else if (item.type === 'input') {
                content = (
                  <span className="text-fuchsia-600 dark:text-fuchsia-400 font-bold">
                    input(<span className="text-violet-600 dark:text-violet-400">{item.varName}</span>)
                  </span>
                );
              } else if (item.type === 'output') {
                content = (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    output({item.args})
                  </span>
                );
              } else if (item.type === 'assign') {
                content = (
                  <>
                    <span className="text-violet-600 dark:text-violet-400 font-bold">{item.left}</span>{' '}
                    <span className="text-rose-600 dark:text-rose-400 font-extrabold">=</span>{' '}
                    <span>{item.right}</span>
                  </>
                );
              } else {
                content = <span>{item.text}</span>;
              }

              return (
                <div
                  key={`${item.type}-${item.lineIdx ?? idx}-${idx}`}
                  onMouseEnter={() => item.stepKey && setHoveredStepKey(item.stepKey)}
                  onMouseLeave={() => setHoveredStepKey(null)}
                  className={hoverClass}
                  style={{ paddingLeft: `${item.level * 24}px` }}
                >
                  {content}
                </div>
              );
            });
          })()}
      </div>
    </>
  );

    if (isCompact) {
      return <div className="font-mono text-xs leading-relaxed text-foreground">{innerContent}</div>;
    }

    return (
      <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 font-mono text-sm leading-relaxed shadow-lg w-full max-w-lg text-foreground transition-all">
        {innerContent}
      </div>
    );
  };

  const renderNaratif = (isCompact = false) => {
    let stepCounter = 0;
    const lines = code.split('\n');
    let currentBlock: { type: 'if' | 'else'; baseIndent: number } | null = null;

    const innerContent = (
      <div className="space-y-2 text-xs md:text-sm text-slate-700 dark:text-slate-300 font-mono">
        {lines.map((rawLineText, lineIdx) => {
          const rawLine = rawLineText.trim();
          if (!rawLine || rawLine.startsWith('#') || rawLine.startsWith('//')) return null;

          if (rawLine === '}') {
            currentBlock = null;
            return null;
          }

          const indent = rawLineText.search(/\S/);

          // Reset blok jika ada baris dengan indentasi <= baseIndent yang bukan 'else' atau 'elif'
          if (
            currentBlock !== null &&
            indent !== -1 &&
            indent <= currentBlock.baseIndent &&
            !rawLine.startsWith('else') &&
            !rawLine.startsWith('elif') &&
            !rawLine.startsWith('} else')
          ) {
            currentBlock = null;
          }

          const normalizedLine = rawLine.replace(/^(let|const|var)\s+/, '').replace(/;/g, '').trim();
          const stepKey = `line-${lineIdx}`;
          const isHovered = hoveredStepKey === stepKey;
          const isChild = currentBlock !== null;

          const hoverClass = `transition-all duration-200 cursor-pointer rounded-xl p-2 leading-relaxed ${
            isHovered
              ? 'bg-purple-500/20 border-l-4 border-purple-500 font-bold shadow-sm translate-x-1'
              : 'hover:bg-muted/40 border-l-4 border-transparent'
          }`;

          // IF statement
          if (rawLine.startsWith('if ') || rawLine.startsWith('if(')) {
            stepCounter++;
            currentBlock = { type: 'if', baseIndent: indent !== -1 ? indent : 0 };
            const cond = rawLine.replace(/^if\s*\(?/, '').replace(/\)?\s*:\s*$/, '').replace(/\)?\s*\{\s*$/, '').trim();
            return (
              <div 
                key={lineIdx} 
                onMouseEnter={() => setHoveredStepKey(stepKey)}
                onMouseLeave={() => setHoveredStepKey(null)}
                className={hoverClass}
              >
                <p className="font-bold text-amber-500 dark:text-amber-300">
                  {stepCounter}. Jika {cond} maka:
                </p>
              </div>
            );
          }

          // ELSE statement
          if (rawLine.startsWith('else:') || rawLine.startsWith('else') || rawLine.startsWith('} else')) {
            currentBlock = { type: 'else', baseIndent: indent !== -1 ? indent : 0 };
            return (
              <div 
                key={lineIdx} 
                onMouseEnter={() => setHoveredStepKey(stepKey)}
                onMouseLeave={() => setHoveredStepKey(null)}
                className={`ml-4 md:ml-5 ${hoverClass}`}
              >
                <p className="font-bold text-amber-500 dark:text-amber-300">
                  Selain itu:
                </p>
              </div>
            );
          }

          // Format langkah utama (top level ada nomor) vs aksi cabang (child tanpa nomor dengan indentasi)
          const prefix = isChild ? '' : `${++stepCounter}. `;
          const containerClass = isChild 
            ? `ml-6 md:ml-8 pl-3 border-l-2 border-border/50 dark:border-border/40 ${hoverClass}` 
            : hoverClass;

          // Input
          if (normalizedLine.includes('=') && (normalizedLine.includes('input(') || normalizedLine.includes('prompt('))) {
            const parts = normalizedLine.split('=');
            const varName = parts[0].trim();
            return (
              <div 
                key={lineIdx} 
                onMouseEnter={() => setHoveredStepKey(stepKey)}
                onMouseLeave={() => setHoveredStepKey(null)}
                className={containerClass}
              >
                <p>
                  {prefix}Masukkan nilai <strong className="text-violet-600 dark:text-violet-400 font-bold">{varName}</strong>.
                </p>
              </div>
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
                <div 
                  key={lineIdx} 
                  onMouseEnter={() => setHoveredStepKey(stepKey)}
                  onMouseLeave={() => setHoveredStepKey(null)}
                  className={containerClass}
                >
                  <p>
                    {prefix}Hitung nilai <strong className="text-violet-600 dark:text-violet-400 font-bold">{varName}</strong>:
                  </p>
                  <div className="pl-4 mt-1">
                    <code className="bg-slate-100 dark:bg-slate-800/80 text-amber-700 dark:text-amber-300 px-2.5 py-0.5 rounded-lg font-mono text-xs border border-border/60 inline-block font-bold">
                      {varName} = {expr}
                    </code>
                  </div>
                </div>
              );
            } else {
              return (
                <div 
                  key={lineIdx} 
                  onMouseEnter={() => setHoveredStepKey(stepKey)}
                  onMouseLeave={() => setHoveredStepKey(null)}
                  className={containerClass}
                >
                  <p>
                    {prefix}Tetapkan nilai <strong className="text-violet-600 dark:text-violet-400 font-bold">{varName}</strong> = <span className="font-semibold">{expr}</span>.
                  </p>
                </div>
              );
            }
          }

          // Output
          if (normalizedLine.startsWith('print') || normalizedLine.startsWith('console.log')) {
            const match = normalizedLine.match(/\((.*)\)/);
            const rawArgs = match ? match[1].trim() : '';
            const cleanArgs = formatOutputArgsForPseudocode(rawArgs);
            return (
              <div 
                key={lineIdx} 
                onMouseEnter={() => setHoveredStepKey(stepKey)}
                onMouseLeave={() => setHoveredStepKey(null)}
                className={containerClass}
              >
                <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {prefix}Tampilkan {cleanArgs} ke layar.
                </p>
              </div>
            );
          }

          return null;
        })}
      </div>
    );

    if (isCompact) {
      return innerContent;
    }

    return (
      <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 text-sm leading-loose shadow-lg w-full max-w-lg text-foreground transition-all">
        <h3 className="font-extrabold text-xl mb-4 text-violet-600 dark:text-violet-400 border-b border-border/50 pb-3">
          Algoritma Naratif
        </h3>
        {innerContent}
      </div>
    );
  };

  return (
    <div className="flex-1 bg-background flex flex-col overflow-hidden h-[calc(100vh-4rem)]">
      
      {/* Top Navbar Studio */}
      <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 z-30">
        <div className="flex items-center gap-3">
          <Link 
            href={`/theory/${selectedChapter}`} 
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Teori Bab {selectedChapter}</span>
          </Link>
          <span className="text-slate-700">|</span>
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Pertemuan {selectedChapter}: {selectedChapter === 5 ? 'Operator & Ekspresi' : selectedChapter === 6 ? 'Percabangan Tunggal & Ganda' : 'Percabangan Majemuk & Bersarang'} Studio
          </span>
        </div>

        {/* Chapter Switcher & Mission Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Chapter Toggle Buttons */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => handleSwitchChapter(5)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedChapter === 5 ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🧮</span> Bab 5
            </button>
            <button
              onClick={() => handleSwitchChapter(6)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedChapter === 6 ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🔀</span> Bab 6
            </button>
            <button
              onClick={() => handleSwitchChapter(7)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedChapter === 7 ? 'bg-orange-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🌿</span> Bab 7
            </button>
          </div>

          {/* Mission Selector Tabs for Active Chapter */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {missions
              .filter(m => m.chapter === selectedChapter)
              .map(m => (
                <button
                  key={m.id}
                  onClick={() => handleSelectMission(m.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedMissionId === m.id 
                      ? selectedChapter === 5 
                        ? 'bg-amber-600 text-white shadow-md' 
                        : selectedChapter === 6 
                        ? 'bg-sky-600 text-white shadow-md' 
                        : 'bg-orange-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {m.codeNum}
                </button>
              ))}
          </div>
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
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    selectedChapter === 5 
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                      : selectedChapter === 6
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                      : 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                  }`}>
                    {currentMission.category}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">Bab {currentMission.chapter}</span>
                </div>

                <h2 className="font-bold text-base md:text-lg text-foreground">
                  {currentMission.title}
                </h2>
                
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentMission.description}
                </p>

                <div className="p-3 bg-secondary/30 rounded-xl border border-border/50 space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block font-mono">FORMULA / LOGIKA TARGET</span>
                  <p className="font-mono text-xs text-primary font-bold">{currentMission.formula}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <h2 className="font-bold text-base text-foreground">Konsep Pembelajaran</h2>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentMission.theoryDesc}
                </p>
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary leading-relaxed">
                  💡 Amati bagaimana setiap perubahan angka/kondisi pada kode di sebelah kanan langsung mengubah diagram Flowchart dan variabel RAM di tengah!
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
                  placeholder="Tanya rumus / logika percabangan..." 
                  className="w-full bg-background border border-border/50 rounded-full py-1.5 pl-3.5 pr-8 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button onClick={handleSendChat} className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 bg-primary rounded-full text-primary-foreground hover:bg-primary/90 cursor-pointer">
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2: Visualizer (Tengah - 5 Kolom pada Mode Normal, 12 Kolom pada Mode Studio) */}
        <div className={`${isVisualizerMaximized ? 'lg:col-span-12' : 'lg:col-span-5'} border-r border-border/50 bg-background flex flex-col overflow-hidden relative`}>
          
          {/* Header Tab Visualizer */}
          <div className="p-2.5 border-b border-border/50 flex flex-wrap items-center justify-between gap-2 bg-card/30">
            {isVisualizerMaximized ? (
              /* Mode Studio: Checkbox Multi-Selection */
              <div className="flex items-center gap-1.5 bg-secondary/40 p-1.5 rounded-xl border border-border/50">
                {/* Checkbox: Flowchart */}
                <button
                  type="button"
                  onClick={() => togglePanel('flowchart')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer select-none ${
                    visiblePanels.flowchart 
                      ? 'bg-background shadow-sm text-foreground ring-1 ring-border/80' 
                      : 'text-muted-foreground hover:bg-background/50 opacity-70'
                  }`}
                  title="Pilih untuk menampilkan/menyembunyikan Flowchart"
                >
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                    visiblePanels.flowchart 
                      ? 'bg-sky-500 border-sky-500 text-white shadow-sm' 
                      : 'border-muted-foreground/40 bg-background/50'
                  }`}>
                    {visiblePanels.flowchart && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>🔷 Flowchart</span>
                </button>

                {/* Checkbox: Pseudocode */}
                <button
                  type="button"
                  onClick={() => togglePanel('pseudocode')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer select-none ${
                    visiblePanels.pseudocode 
                      ? 'bg-background shadow-sm text-foreground ring-1 ring-border/80' 
                      : 'text-muted-foreground hover:bg-background/50 opacity-70'
                  }`}
                  title="Pilih untuk menampilkan/menyembunyikan Pseudocode"
                >
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                    visiblePanels.pseudocode 
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm' 
                      : 'border-muted-foreground/40 bg-background/50'
                  }`}>
                    {visiblePanels.pseudocode && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>📋 Pseudocode</span>
                </button>

                {/* Checkbox: Naratif */}
                <button
                  type="button"
                  onClick={() => togglePanel('narrative')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer select-none ${
                    visiblePanels.narrative 
                      ? 'bg-background shadow-sm text-foreground ring-1 ring-border/80' 
                      : 'text-muted-foreground hover:bg-background/50 opacity-70'
                  }`}
                  title="Pilih untuk menampilkan/menyembunyikan Naratif"
                >
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                    visiblePanels.narrative 
                      ? 'bg-purple-500 border-purple-500 text-white shadow-sm' 
                      : 'border-muted-foreground/40 bg-background/50'
                  }`}>
                    {visiblePanels.narrative && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>📝 Naratif</span>
                </button>

                {/* Tombol Pintas: Semua */}
                <button 
                  type="button"
                  onClick={() => setVisiblePanels({ flowchart: true, pseudocode: true, narrative: true })}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                    activeAlgoCount === 3 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
                  }`}
                  title="Tampilkan semua representasi algoritma"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Semua</span>
                </button>
              </div>
            ) : (
              /* Mode Normal: Single Active Tab */
              <div className="flex items-center gap-1.5 bg-secondary/40 p-1.5 rounded-xl border border-border/50">
                <button
                  type="button"
                  onClick={() => setNormalTab('flowchart')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                    normalTab === 'flowchart'
                      ? 'bg-background shadow-sm text-foreground ring-1 ring-border/80'
                      : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
                  }`}
                  title="Tampilkan diagram Flowchart"
                >
                  <span>🔷 Flowchart</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNormalTab('pseudocode')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                    normalTab === 'pseudocode'
                      ? 'bg-background shadow-sm text-foreground ring-1 ring-border/80'
                      : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
                  }`}
                  title="Tampilkan teks Pseudocode"
                >
                  <span>📋 Pseudocode</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNormalTab('narrative')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                    normalTab === 'narrative'
                      ? 'bg-background shadow-sm text-foreground ring-1 ring-border/80'
                      : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
                  }`}
                  title="Tampilkan Algoritma Naratif"
                >
                  <span>📝 Naratif</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setVisiblePanels({ flowchart: true, pseudocode: true, narrative: true });
                    setIsVisualizerMaximized(true);
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-background/50 transition-all flex items-center gap-1.5 cursor-pointer select-none"
                  title="Perbesar dan tampilkan semua representasi berdampingan di Mode Studio"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-amber-500" />
                  <span>Semua (Studio)</span>
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              {isVisualizerMaximized ? (
                <>
                  <span className="hidden sm:inline-flex text-[11px] font-medium text-muted-foreground px-2 py-0.5 bg-secondary/60 rounded-full border border-border/40">
                    {totalStudioCols} Kolom Aktif
                  </span>
                  <button 
                    onClick={() => setShowMemory(!showMemory)} 
                    className={`p-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-all cursor-pointer ${showMemory ? 'bg-primary/10 border-primary text-primary' : 'border-border/60 text-muted-foreground'}`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">RAM Live</span>
                  </button>
                  <button 
                    onClick={() => setIsVisualizerMaximized(false)} 
                    title="Perkecil ke Workspace Normal (Minimize)"
                    className="p-1.5 hover:bg-secondary rounded-lg border border-border/60 text-muted-foreground hover:text-foreground cursor-pointer flex items-center gap-1.5 text-xs font-medium"
                  >
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Perkecil</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsVisualizerMaximized(true)} 
                  title="Perbesar ke Mode Studio Layar Penuh (Maximize)"
                  className="p-1.5 hover:bg-secondary rounded-lg border border-border/60 text-muted-foreground hover:text-foreground cursor-pointer flex items-center gap-1.5 text-xs font-medium"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Perbesar Studio</span>
                </button>
              )}
            </div>
          </div>

          {/* Area Render: Mode Studio (Maximized) vs Mode Normal (Minimized) */}
          {isVisualizerMaximized ? (
            <div className="flex-1 overflow-x-auto overflow-y-auto p-3.5 bg-dot-grid">
              <div className={`grid gap-3.5 h-full ${getStudioGridClass()}`}>
                
                {/* 1. Algoritma Naratif Card */}
                {visiblePanels.narrative && (
                  <div className="border border-border/80 rounded-2xl bg-card flex flex-col overflow-hidden min-h-[380px] shadow-md">
                    <div className="px-4 py-2.5 border-b border-border/60 bg-muted/40 flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground flex items-center gap-2">
                        <span className="p-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400">📝</span>
                        Algoritma Naratif
                      </span>
                      <button
                        onClick={() => {
                          if (activeAlgoCount === 1 && visiblePanels.narrative) {
                            setVisiblePanels({ flowchart: true, pseudocode: true, narrative: true });
                          } else {
                            setVisiblePanels({ flowchart: false, pseudocode: false, narrative: true });
                          }
                        }}
                        title={activeAlgoCount === 1 && visiblePanels.narrative ? "Kembalikan Semua Kolom" : "Fokuskan Algoritma Naratif"}
                        className="p-1 hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        {activeAlgoCount === 1 && visiblePanels.narrative ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 bg-card">
                      {renderNaratif(true)}
                    </div>
                  </div>
                )}

                {/* 2. Flowchart Card */}
                {visiblePanels.flowchart && (
                  <div className="border border-border/80 rounded-2xl bg-card flex flex-col overflow-hidden min-h-[380px] shadow-md">
                    <div className="px-4 py-2.5 border-b border-border/60 bg-muted/40 flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground flex items-center gap-2">
                        <span className="p-1 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400">🔷</span>
                        Flowchart Standar ANSI
                      </span>
                      <div className="flex items-center gap-2">
                        {/* Toggle Orientasi Vertikal / Horisontal */}
                        <div className="flex items-center bg-background/80 p-0.5 rounded-lg border border-border/70 text-[10px] font-mono">
                          <button
                            type="button"
                            onClick={() => setFlowchartOrientation('vertical')}
                            className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                              flowchartOrientation === 'vertical'
                                ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                            title="Orientasi Vertikal (Atas ke Bawah)"
                          >
                            ↕ Vertikal
                          </button>
                          <button
                            type="button"
                            onClick={() => setFlowchartOrientation('horizontal')}
                            className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                              flowchartOrientation === 'horizontal'
                                ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                            title="Orientasi Horisontal (Kiri ke Kanan)"
                          >
                            ↔ Horisontal
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            if (activeAlgoCount === 1 && visiblePanels.flowchart) {
                              setVisiblePanels({ flowchart: true, pseudocode: true, narrative: true });
                            } else {
                              setVisiblePanels({ flowchart: true, pseudocode: false, narrative: false });
                            }
                          }}
                          title={activeAlgoCount === 1 && visiblePanels.flowchart ? "Kembalikan Semua Kolom" : "Fokuskan Flowchart"}
                          className="p-1 hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          {activeAlgoCount === 1 && visiblePanels.flowchart ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 w-full relative min-h-[320px] overflow-hidden bg-dot-grid bg-background">
                      <FlowchartVisualizer 
                        code={code} 
                        variables={variables} 
                        hoveredStepKey={hoveredStepKey}
                        onHoverStepKey={setHoveredStepKey}
                        orientation={flowchartOrientation}
                      />
                    </div>
                  </div>
                )}

                {/* 3. Pseudocode Card */}
                {visiblePanels.pseudocode && (
                  <div className="border border-border/80 rounded-2xl bg-card flex flex-col overflow-hidden min-h-[380px] shadow-md">
                    <div className="px-4 py-2.5 border-b border-border/60 bg-muted/40 flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground flex items-center gap-2">
                        <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">📋</span>
                        Pseudocode Standar
                      </span>
                      <button
                        onClick={() => {
                          if (activeAlgoCount === 1 && visiblePanels.pseudocode) {
                            setVisiblePanels({ flowchart: true, pseudocode: true, narrative: true });
                          } else {
                            setVisiblePanels({ flowchart: false, pseudocode: true, narrative: false });
                          }
                        }}
                        title={activeAlgoCount === 1 && visiblePanels.pseudocode ? "Kembalikan Semua Kolom" : "Fokuskan Pseudocode"}
                        className="p-1 hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        {activeAlgoCount === 1 && visiblePanels.pseudocode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 bg-card">
                      {renderPseudocode(true)}
                    </div>
                  </div>
                )}

                {/* 4. Live Code Editor & Output (Studio Mode) */}
                <div className="border border-slate-800 rounded-2xl bg-[#0d1117] flex flex-col overflow-hidden min-h-[380px] shadow-md text-white">
                  <div className="px-4 py-2.5 border-b border-slate-800 bg-[#161b22] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-400">
                        <Code2 className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        Kode ({language === 'python' ? 'main.py' : 'main.js'})
                      </span>
                      {hoveredStepKey && (
                        <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/40 flex items-center gap-1.5 animate-pulse shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          Baris {parseInt(hoveredStepKey.replace('line-', '')) + 1} Tersorot
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={handleRun}
                        disabled={isLoading}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50 transition-all"
                      >
                        {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
                        <span>RUN</span>
                      </button>
                    </div>
                  </div>

                  {/* State Memory Inspector Bar (Studio Mode) */}
                  <div className="w-full bg-[#161b22] border-b border-slate-800 z-20 shrink-0">
                    <div 
                      className="px-4 py-1.5 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors"
                      onClick={() => setShowMemory(!showMemory)}
                    >
                      <span className="text-[10px] font-bold tracking-wider text-cyan-400 font-mono flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        STATE MEMORY RAM (LIVE)
                      </span>
                      {showMemory ? <ChevronUp className="w-3 h-3 text-slate-400" /> : <ChevronDown className="w-3 h-3 text-slate-400" />}
                    </div>
                    {showMemory && (
                      <div className="p-2.5 bg-[#0d1117] border-t border-slate-800 shadow-inner max-h-36 overflow-y-auto">
                        {Object.keys(variables).length === 0 ? (
                          <div className="text-xs text-center text-slate-500 italic py-1.5">Memori kosong. Tekan RUN.</div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(variables).map(([k, v]) => (
                              <div key={k} className="flex flex-col p-1.5 bg-[#161b22] rounded-lg border border-slate-800 shadow-sm">
                                <span className="font-mono text-purple-400 text-[10px] truncate">{k}</span>
                                <span className="font-mono text-emerald-400 text-xs font-bold truncate">
                                  {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 overflow-auto font-mono text-sm relative bg-[#0d1117] flex">
                    {/* Gutter / Nomor Baris */}
                    <div className="select-none py-[10px] pl-2.5 pr-2 text-right text-slate-500 bg-[#161b22] border-r border-slate-800/80 flex flex-col font-mono text-xs leading-[22px] shrink-0 min-w-[36px] sticky left-0 z-20 shadow-[2px_0_6px_rgba(0,0,0,0.4)]">
                      {code.split('\n').map((_, i) => {
                        const isTarget = hoveredStepKey === `line-${i}`;
                        return (
                          <div 
                            key={i} 
                            className={`h-[22px] flex items-center justify-end gap-1 transition-colors ${
                              isTarget 
                                ? 'text-amber-400 font-bold scale-105' 
                                : 'hover:text-slate-400'
                            }`}
                          >
                            {isTarget && <span className="text-[8px] text-amber-400 animate-pulse">▶</span>}
                            <span>{i + 1}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Editor dengan Layer Sorotan Baris di Latar Belakang (Tanpa mengganggu kursor) */}
                    <div className="relative flex-1 min-w-fit w-full">
                      {hoveredStepKey && (() => {
                        const targetIdx = parseInt(hoveredStepKey.replace('line-', ''));
                        if (isNaN(targetIdx) || targetIdx < 0) return null;
                        return (
                          <div
                            className="absolute left-0 right-0 bg-amber-400/20 border-l-4 border-amber-400 pointer-events-none transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] z-0 w-full min-w-full"
                            style={{
                              top: 10 + targetIdx * 22,
                              height: 22,
                            }}
                          >
                            <div className="absolute right-2 top-0 bottom-0 flex items-center">
                              <span className="text-[9px] font-mono font-bold bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded shadow">
                                ⚡ AKTIF
                              </span>
                            </div>
                          </div>
                        );
                      })()}

                      <Editor
                        value={code}
                        onValueChange={setCode}
                        highlight={highlightCode}
                        padding={10}
                        className="code-editor-root font-mono text-xs leading-[22px] relative z-10"
                        style={{
                          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                          fontSize: 12,
                          lineHeight: '22px',
                          minHeight: '100%',
                          color: '#f8fafc',
                          background: 'transparent',
                          whiteSpace: 'pre',
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Output Terminal for studio mode */}
                  <div className="h-32 border-t border-slate-800 bg-[#0d1117] flex flex-col">
                    <div className="px-3 py-1.5 border-b border-slate-800 flex items-center justify-between bg-[#161b22]">
                      <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5"><Terminal className="w-3 h-3" /> Output Terminal</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2.5 font-mono text-xs text-slate-200 whitespace-pre-wrap">
                      {Array.isArray(output) ? (
                        output.length > 0 ? output.join('\n') : <span className="text-slate-600 italic">Belum ada output...</span>
                      ) : output ? (
                        output
                      ) : (
                        <span className="text-slate-600 italic">Belum ada output...</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Mode Normal (3-Kolom Workspace: Panel Visualizer 100% Bersih & Luas) */
            <div className="flex-1 overflow-hidden relative bg-background flex flex-col">
              {normalTab === 'flowchart' && (
                <div className="w-full h-full relative bg-dot-grid">
                  <div className="absolute top-3 right-3 z-20 flex items-center bg-card/90 backdrop-blur border border-border/80 p-0.5 rounded-lg shadow-md text-[10px] font-mono">
                    <button
                      type="button"
                      onClick={() => setFlowchartOrientation('vertical')}
                      className={`px-2 py-1 rounded transition-all cursor-pointer ${
                        flowchartOrientation === 'vertical'
                          ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      title="Orientasi Vertikal (Atas ke Bawah)"
                    >
                      ↕ Vertikal
                    </button>
                    <button
                      type="button"
                      onClick={() => setFlowchartOrientation('horizontal')}
                      className={`px-2 py-1 rounded transition-all cursor-pointer ${
                        flowchartOrientation === 'horizontal'
                          ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      title="Orientasi Horisontal (Kiri ke Kanan)"
                    >
                      ↔ Horisontal
                    </button>
                  </div>
                  <FlowchartVisualizer 
                    code={code} 
                    variables={variables} 
                    hoveredStepKey={hoveredStepKey}
                    onHoverStepKey={setHoveredStepKey}
                    orientation={flowchartOrientation}
                  />
                </div>
              )}

              {normalTab === 'pseudocode' && (
                <div className="w-full h-full p-6 overflow-auto bg-card/20 flex justify-center items-start">
                  {renderPseudocode(false)}
                </div>
              )}

              {normalTab === 'narrative' && (
                <div className="w-full h-full p-6 overflow-auto bg-card/20 flex justify-center items-start">
                  {renderNaratif(false)}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Panel 3: Code Editor & Live Terminal (Kanan - 4 Kolom) */}
        <div className={`${isVisualizerMaximized ? 'hidden' : 'lg:col-span-4'} flex flex-col overflow-hidden bg-slate-950`}>
          
          {/* Header Editor */}
          <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-slate-200 font-mono">
                {language === 'python' ? 'main.py' : 'main.js'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleRun}
                disabled={isLoading}
                className="px-3.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-950 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>Jalankan</span>
              </button>
            </div>
          </div>

          {/* State Memory Inspector Bar */}
          <div className="w-full bg-[#161b22] border-b border-slate-800 z-20 shrink-0">
            <div 
              className="px-4 py-1.5 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => setShowMemory(!showMemory)}
            >
              <span className="text-[10px] font-bold tracking-wider text-cyan-400 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                STATE MEMORY RAM (LIVE)
              </span>
              {showMemory ? <ChevronUp className="w-3 h-3 text-slate-400" /> : <ChevronDown className="w-3 h-3 text-slate-400" />}
            </div>
            {showMemory && (
              <div className="p-2.5 bg-[#0d1117] border-t border-slate-800 shadow-inner max-h-40 overflow-y-auto">
                {Object.keys(variables).length === 0 ? (
                  <div className="text-xs text-center text-slate-500 italic py-2">Memori kosong. Tekan RUN.</div>
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {Object.entries(variables).map(([k, v]) => (
                      <div key={k} className="flex flex-col p-1.5 bg-[#161b22] rounded-lg border border-slate-800 shadow-sm">
                        <span className="font-mono text-purple-400 text-[10px] truncate">{k}</span>
                        <span className="font-mono text-emerald-400 text-xs font-bold truncate">
                          {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Area Monaco / Simple Editor */}
          <div className="flex-1 overflow-auto font-mono text-sm relative bg-slate-950 flex">
            {/* Gutter / Nomor Baris */}
            <div className="select-none py-[10px] pl-3 pr-2 text-right text-slate-500 bg-slate-900 border-r border-slate-800 flex flex-col font-mono text-xs leading-[22px] shrink-0 min-w-[38px] sticky left-0 z-20 shadow-[2px_0_6px_rgba(0,0,0,0.4)]">
              {code.split('\n').map((_, i) => {
                const isTarget = hoveredStepKey === `line-${i}`;
                return (
                  <div 
                    key={i} 
                    className={`h-[22px] flex items-center justify-end gap-1 transition-colors ${
                      isTarget 
                        ? 'text-amber-400 font-bold scale-105' 
                        : 'hover:text-slate-400'
                    }`}
                  >
                    {isTarget && <span className="text-[9px] text-amber-400 animate-pulse">▶</span>}
                    <span>{i + 1}</span>
                  </div>
                );
              })}
            </div>

            {/* Editor dengan Layer Sorotan Baris di Latar Belakang */}
            <div className="relative flex-1 min-w-fit w-full">
              {hoveredStepKey && (() => {
                const targetIdx = parseInt(hoveredStepKey.replace('line-', ''));
                if (isNaN(targetIdx) || targetIdx < 0) return null;
                return (
                  <div
                    className="absolute left-0 right-0 bg-amber-400/20 border-l-4 border-amber-400 pointer-events-none transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] z-0 w-full min-w-full"
                    style={{
                      top: 10 + targetIdx * 22,
                      height: 22,
                    }}
                  >
                    <div className="absolute right-3 top-0 bottom-0 flex items-center">
                      <span className="text-[10px] font-mono font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded shadow">
                        ⚡ AKTIF
                      </span>
                    </div>
                  </div>
                );
              })()}

              <Editor
                value={code}
                onValueChange={setCode}
                highlight={highlightCode}
                padding={10}
                className="code-editor-root font-mono text-sm leading-[22px] relative z-10"
                style={{
                  fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                  fontSize: 13,
                  lineHeight: '22px',
                  minHeight: '100%',
                  color: '#f8fafc',
                  background: 'transparent',
                  whiteSpace: 'pre',
                }}
              />
            </div>
          </div>

          {/* Console / Terminal Output */}
          <div className="h-44 border-t border-slate-800 bg-slate-900 flex flex-col">
            <div className="p-2 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Terminal className="w-3.5 h-3.5" />
                <span>Standard Output (Stdout)</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Engine
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
              {isLoading ? (
                <div className="flex items-center gap-2 text-slate-500">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Mengevaluasi kode...</span>
                </div>
              ) : (Array.isArray(output) ? output.length > 0 : Boolean(output)) ? (
                Array.isArray(output) ? output.join('\n') : output
              ) : (
                <span className="text-slate-600 italic">Keluaran program (print / console.log) akan tampil di sini...</span>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default function Workspace() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 font-mono text-sm">Memuat Workspace Studio...</div>}>
      <WorkspaceContent />
    </Suspense>
  );
}
