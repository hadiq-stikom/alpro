# 📋 SPESIFIKASI PROYEK: Web Algoritma & Pemrograman
# Dokumen Rujukan Utama — Versi 2.1 (31 Agustus 2026)

> **PENTING**: Dokumen ini adalah sumber kebenaran tunggal (*single source of truth*) untuk seluruh keputusan arsitektur, visi produk, dan status implementasi proyek ini. AI agent atau developer manapun yang bekerja pada proyek ini WAJIB membaca dokumen ini terlebih dahulu sebelum melakukan perubahan apapun.

---

## 1. VISI & TUJUAN PRODUK

Platform pembelajaran interaktif mata kuliah **Algoritma & Pemrograman (TI-101, 3 SKS)** yang dirancang untuk:

1. **Meningkatkan minat belajar mahasiswa** melalui visualisasi dan animasi interaktif yang dinamis, modern, dan pedagogis.
2. **Menambah semangat mahasiswa** untuk mendapatkan capaian terbaik melalui **gamifikasi**.
3. **Menyediakan lencana capaian mahasiswa** di halaman profil mahasiswa — baik rata-rata capaian dari semua bab maupun capaian tiap pertemuan.
4. **Menyediakan lencana capaian kelas dan per mahasiswa** di halaman dosen — baik secara umum maupun per pertemuan.
5. **Lencana berupa warna berbeda** untuk 9 tingkat capaian: E, DE, D, CD, C, BC, B, AB, A.
6. **Kategori capaian**: E/DE/D/CD = Kurang, C/BC = Cukup, B/AB = Baik, A = Sempurna.

### Dosen Pengampu
- **Nama**: Hadiq, ST, M.Kom
- **Foto**: `/public/dosen.png`

---

## 2. TECH STACK

| Layer | Teknologi | Versi / Keterangan |
|:---|:---|:---|
| Framework | Next.js (App Router) | 16.3.0 |
| UI Library | React | 19.2.8 |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`) | ^4 (Class-based dark mode: `@custom-variant dark`) |
| Animasi | Framer Motion | ^13.0.0 |
| Ikon | Lucide React | ^1.28.0 |
| Font Utama | **Plus Jakarta Sans** (Google Fonts via `next/font`) | Variable: `--font-sans` |
| Font Kode | **JetBrains Mono** (Google Fonts via `next/font`) | Variable: `--font-mono` |
| Tema | next-themes (dark/light/system) | ^0.4.6 |
| Code Editor | react-simple-code-editor + PrismJS | - |
| Python Runtime | Pyodide (browser-side) | ^314.0.3 |
| Flowchart | @xyflow/react | ^12.11.2 |
| Backend & Auth | **Supabase** (`@supabase/supabase-js` + `@supabase/ssr`) | SSR cookie-based auth via `proxy.ts` |
| Evaluator AI | Groq API / Google Gemini Fallback (`/api/grade-essay`) | Evaluasi esai mahasiswa per butir soal |
| Image Hosting | Cloudinary | Akun tersedia (jika diperlukan) |

---

## 3. STATUS IMPLEMENTASI & ARSITEKTUR

### 3.1 Status Fase Pengerjaan

| Bagian / Fase | Nama Modul / Fitur | Status | Detail yang Tersedia |
|:---:|:---|:---:|:---|
| **Fase 1** | **Autentikasi & Database Supabase** | ✅ **Selesai** | `supabase/schema.sql`, `supabase/rls.sql`, `src/lib/supabase.ts`, `src/lib/supabase-server.ts`, `src/proxy.ts`, `AuthContext.tsx`, `login/page.tsx` (NIM & Email login, Role-based redirect, RLS recursion fixed via `is_dosen()`). |
| **UI/UX** | **Halaman Depan (Homepage) Ramah Pemula** | ✅ **Selesai** | Hero terfokus dengan *Single Primary CTA* ("Mulai Belajar: Minggu 01"), Quick Hub Pertemuan Aktif (M-01 s.d. M-05), Onboarding 3 Langkah, 3D Dual-Tone Icons (`ChapterIllustration`), Leaderboard Top 5. |
| **Pilar 1 (Bagian 1)** | **Fondasi Logika, Algoritma & Tipe Data (Minggu 1–5)** | ✅ **Selesai 100%** | **24+ Lab Interaktif Lengkap**, **Bank Soal Kuis (5 MCQ/minggu)**, dan **Bank Soal Esai (5 Esai/minggu)** dengan sistem penilaian AI otomatis. |
| **Fase 2** | **Badge & Gamification System** | ✅ **Selesai** | Utilitas kalkulasi skor 9 tingkat + komponen visual lencana. |
| **Fase 3** | **Sistem Asesmen & Anti-AI (1–5)** | ✅ **Selesai** | Kuis timer ketat, timer akumulasi esai (carry-over), tab-switch watcher tanpa alert modal fokus, auto-remedial gateway. |
| **Fase 4** | **Dashboard Mahasiswa** | ✅ **Selesai** | Rute `/student/dashboard` & `/student/meeting/[id]`, visualisasi lencana dinamis (`BadgeDisplay.tsx`), agregasi view `overall_grades` & `meeting_grades`. |
| **Fase 5** | **Dashboard Dosen** | ✅ **Selesai** | Rute `/lecturer/dashboard` (analitik kelas, filter pencarian mahasiswa) & `/lecturer/student/[id]` (detail rapor, detektor anti-cheat, ulasan AI grader). |
| **Pilar 2 (Bagian 2)** | **Struktur Percabangan Tunggal & Ganda (Minggu 6)** | ✅ **Selesai 100%** | Teori 4 Representasi Terpadu (`Pertemuan6.tsx`), 4 Lab Interaktif (Anatomi Kondisi, IF Tunggal, IF-ELSE Ganda, 3 Kasus Nyata Terpadu), Mode Proyektor Fullscreen, dan **5 Misi Coding Percabangan di Workspace Studio** (`/workspace?chapter=6`). |
| **Pilar 2 (Bagian 3)** | **Percabangan Majemuk & Bersarang (Minggu 7)** | ✅ **Selesai 100%** | Teori 4 Representasi Terpadu (`Pertemuan7.tsx`), 4 Lab Interaktif (Cascading IF-ELIF Grade, Skrining Donor Darah Nested IF, Selector ATM Switch/Match-case, Studi Kasus Kasir Restoran Terpadu), 5 Soal MCQ Kuis, 5 Soal Esai Evaluasi AI, dan **5 Misi Coding Percabangan Majemuk di Workspace Studio** (`/workspace?chapter=7`). |

---

### 3.2 Halaman & Rute Aplikasi

```
src/
├── app/
│   ├── layout.tsx                     <- Root layout (Fonts, ThemeProvider, AuthProvider, LanguageProvider)
│   ├── globals.css                    <- Tailwind v4 config, CSS vars, @custom-variant dark
│   ├── page.tsx                       <- Homepage (Hero Ramah Pemula, 3 Langkah Onboarding, 16 Pertemuan, Leaderboard)
│   ├── (auth)/
│   │   └── login/page.tsx             <- Halaman Login NIM / Email
│   ├── theory/
│   │   └── [id]/page.tsx              <- Materi perkuliahan interaktif per minggu (Minggu 1 s.d. 7 aktif)
│   ├── workspace/
│   │   └── page.tsx                   <- Studio Praktikum (Editor, Flowchart, Pseudocode, RAM)
│   ├── student/                       <- [Fase 4]
│   │   ├── dashboard/page.tsx         <- Dashboard profil & capaian lencana mahasiswa
│   │   └── meeting/[id]/page.tsx      <- Rincian nilai kuis & lab per minggu
│   └── lecturer/                      <- [Fase 5]
│       ├── dashboard/page.tsx         <- Ringkasan analitik dosen & overview kelas
│       ├── class/page.tsx             <- Manajemen kelas & distribusi nilai
│       └── student/[id]/page.tsx      <- Rapor individu mahasiswa
├── components/
│   ├── layout/Navbar.tsx              <- Navbar responsif + user profile + theme switcher
│   ├── ThemeProvider.tsx              <- next-themes wrapper
│   ├── FlowchartVisualizer.tsx        <- Generator visual flowchart
│   ├── Leaderboard.tsx                <- Papan peringkat kelas (Top 5)
│   ├── assessment/                    <- Sistem Ujian & Gamifikasi
│   │   ├── TheoryAssessment.tsx       <- Container modul asesmen di akhir teori (MCQ -> Gateway -> Esai -> Rapor)
│   │   ├── QuizContainer.tsx          <- 5 Soal Pilihan Ganda + Timer + Anti-Cheat
│   │   ├── AssessmentGateway.tsx      <- Gerbang syarat kelulusan Kuis (≥80) untuk membuka Esai
│   │   └── EssayContainer.tsx         <- 5 Soal Esai Belajar Tuntas (Gembok bertingkat, Timer Carry-Over, AI Evaluator)
│   └── theory/                        <- 24+ Komponen materi & lab interaktif Pilar 1 (Bab 1 s.d. 5)
├── context/
│   ├── AuthContext.tsx                <- Client-side Supabase auth state & profile
│   └── LanguageContext.tsx            <- Context toggle Python / JavaScript
├── lib/
│   ├── supabase.ts                    <- Supabase browser client (`createBrowserClient`)
│   ├── supabase-server.ts             <- Supabase server client (`createServerClient`)
│   ├── database.types.ts              <- TypeScript database interface
│   ├── question-bank.ts               <- Bank Soal Kuis (5 MCQ per pertemuan)
│   └── essay-bank.ts                  <- Bank Soal Esai + Rubrik AI (5 Esai per pertemuan)
├── proxy.ts                           <- Next.js server-side auth proxy (pengganti middleware.ts)
└── supabase/
    ├── schema.sql                     <- Skema tabel: classes, users, quiz_submissions, views
    └── rls.sql                        <- RLS policies & SECURITY DEFINER helper function `is_dosen()`
```

---

## 4. KEPUTUSAN ARSITEKTUR & ATURAN PENTING

### 4.1 Autentikasi & Sesi
- **Login Mahasiswa**: NIM sebagai username dan password default (bisa ubah password).
- **Login Dosen**: Email dosen / kredensial dosen.
- **Server-side Session Handling**: Menggunakan `@supabase/ssr` dan cookie handling di `proxy.ts`.
- **Keamanan RLS**: Menggunakan helper `public.is_dosen()` dengan flag `SECURITY DEFINER` untuk mencegah rekursi tak hingga (*infinite recursion*) pada RLS policy tabel `users`.

### 4.2 Sistem Penilaian & Lencana (9 Warna)

| Nilai | Rentang | Warna Lencana | Hex Color | Kategori |
|:---:|:---:|:---|:---|:---:|
| **A** | 90–100 | Emas (Gold) | `#F59E0B` | Sempurna |
| **AB** | 80–89 | Biru Safir (Sapphire) | `#3B82F6` | Baik |
| **B** | 70–79 | Hijau Zamrud (Emerald) | `#10B981` | Baik |
| **BC** | 65–69 | Biru Langit (Sky) | `#0EA5E9` | Cukup |
| **C** | 55–64 | Kuning (Amber) | `#FBBF24` | Cukup |
| **CD** | 50–54 | Oranye (Orange) | `#F97316` | Kurang |
| **D** | 40–49 | Merah Bata (Rose) | `#F43F5E` | Kurang |
| **DE** | 30–39 | Merah (Red) | `#EF4444` | Kurang |
| **E** | 0–29 | Abu Gelap (Slate) | `#64748B` | Kurang |

### 4.3 Formula Penilaian Asesmen
$$\text{Skor Akhir} = (\text{Akurasi} \times 0.80) + (\text{Bonus Waktu} \times 0.20)$$

- $\text{Akurasi} = \left(\frac{\text{Jawaban Benar}}{\text{Total Soal}}\right) \times 100$
- $\text{Bonus Waktu} = \max\left(0, \left(\frac{\text{Batas Waktu} - \text{Waktu Aktual}}{\text{Batas Waktu}}\right) \times 100\right)$

### 4.4 7 Lapisan Anti-AI pada Asesmen
1. **Copy/Paste/Cut disabled** via event prevention pada container asesmen.
2. **Klik kanan dinonaktifkan** (`contextmenu` blocked).
3. **Timer ketat per butir soal** (30–60 detik per soal kuis, 5 menit akumulasi per soal esai).
4. **Pencatat perpindahan tab** (`visibilitychange` logging ke `quiz_submissions.tab_switches`).
5. **Soal acak & permutasi opsi** dari bank soal.
6. **Variasi angka/variabel dinamis** per user id.
7. **Soal interaktif berbasis aksi/visual** (drag node, susun alur, tracing RAM).

### 4.5 Evaluasi Esai Dosen AI (Mastery-Based Progression)
Ujian esai menerapkan konsep **Belajar Tuntas (Mastery Learning)** per butir soal:
1. **Gembok Bertingkat (*Progressive Gateway*)**: Terdapat 5 soal esai per modul. Soal berikutnya (`N+1`) **wajib terkunci** sebelum soal saat ini (`N`) mendapat nilai kelulusan $\ge 80$.
2. **Evaluasi Instan AI**: Begitu dikirim, API Dosen AI mengevaluasi dan merespons dalam 1–2 detik, memberikan skor murni (0–100) dan *feedback* spesifik.
3. **Loop Revisi di Tempat (*Instant Revision Loop*)**: Jika nilai $< 80$, mahasiswa masuk ke mode revisi, teks jawaban sebelumnya dipertahankan, dan mahasiswa diminta untuk menyempurnakannya berdasarkan ulasan Dosen AI yang disandingkan.
4. **Manajemen Waktu Cerdas (Timer Carry-Over & Pause)**:
   - Waktu awal = 5 menit (300 detik).
   - Waktu **berhenti otomatis (*pause*)** saat AI sedang menilai atau saat mahasiswa membaca ulasan. Waktu hanya berjalan saat mahasiswa aktif mengetik jawaban.
   - Sisa waktu dari soal sebelumnya **terakumulasi/dibawa (*carry-over*)** ke soal berikutnya begitu gembok terbuka (+300 detik per soal baru).
5. **Penanganan Error Tanpa Native Alert**: Error API / jaringan disajikan secara *inline* di dalam kartu untuk mencegah *focus loss* yang memicu penalti *tab switch*.
6. **Standar Penilaian Pseudocode Resmi**:
   - Struktur **3 Blok Baku**: `PROGRAM`, `KAMUS`, `ALGORITMA`.
   - **Clean Code Variable**: Menggunakan nama deskriptif (`usia`, `panjang`), dilarang variabel 1 huruf (`u`, `p`).
   - Instruksi I/O Universal: `input()` dan `output()`.
   - Operator Penugasan (*Assignment*): `=` (bukan `<-`).

## 6. KESEPAKATAN PEDAGOGIS & STANDAR PENULISAN ALGORITMA (SESUAI MATERI PERTEMUAN 3)

Dokumen ini merekam seluruh kesepakatan baku pengajaran antara Dosen Pengampu dan Asisten AI berdasarkan materi **Pertemuan 3 (3 Teknik Penyajian Algoritma: Naratif, Flowchart, dan Pseudocode)**:

---

### 6.1 Tiga Teknik Baku Penyajian Algoritma (Materi Pertemuan 3)

#### A. Algoritma Naratif (Deskriptif) — Model 1: Format Blok Sejajar
1. **Nomor Urut Wajib & Langkah Tunggal (*Atomic Decision Block*)**:
   - Setiap langkah diawali dengan nomor urut (`1.`, `2.`, `3.`) yang berurutan dan lurus sejajar di kolom paling kiri (kolom 0).
   - Seluruh blok percabangan IF-ELSE (kondisi, cabang `Jika`, dan cabang `Selain itu`) **wajib berada di dalam SATU NOMOR URUT YANG SAMA**.
   - **Klausa `Selain itu:` DILARANG diberi nomor baru** karena merupakan jalur alternatif eksklusif (*mutually exclusive*), bukan langkah sekuensial berikutnya.
   - **Baris Terakhir Tanpa Nomor**: Baris penutup atau aksi selesai/terminal pada algoritma naratif **DILARANG memiliki nomor urut** (misal `Selesai` ditulis tanpa awalan angka).
2. **Format Baku Percabangan Naratif**:
   ```text
   1. Masukkan nilai ujian.
   2. Jika nilai >= 75 maka:
         Tampilkan "Selamat, Anda LULUS!" ke layar.
      Selain itu:
         Tampilkan "Maaf, Anda TIDAK LULUS." ke layar.
   Selesai.
   ```
3. **Perataan Indentasi Vertikal**:
   - Huruf `S` pada kata `Selain itu:` lurus sejajar vertikal persis di bawah huruf `J` pada kata `Jika` (menjorok 3 spasi dari angka nomor).
   - Aksi perintah di dalam cabang menjorok lebih dalam (6 spasi).
4. **Kata Kerja Imperatif (Perintah Baku)**:
   - Masukan: `Masukkan nilai [variabel]`
   - Perhitungan/Aksi: `Hitung [variabel] = [rumus]`
   - Keluaran: `Tampilkan hasil [variabel] ke layar`
   - Kondisi: `Jika [kondisi] maka:` dan `Selain itu:`
5. **Bebas Ambiguitas & Variabel Lengkap**: Nama variabel ditulis lengkap (`panjang`, `lebar`, `luas`, `totalBelanja`, `nilaiUjian`), dilarang singkatan 1 huruf.

#### B. Flowchart (Diagram Alir Standar ANSI/ISO & Interaktif)
1. **Terminator (Kapsul/Oval)**: Menandai awal (`START` / `MULAI`) dan akhir (`STOP` / `SELESAI`) algoritma.
2. **Input/Output (Jajar Genjang)**: Operasi masukan data (`input(var)`) dan tampilan keluaran (`output(...)`).
3. **Process (Persegi Panjang)**: Operasi kalkulasi, pengolahan data, atau penugasan variabel (`luas = panjang * lebar`).
4. **Decision (Belah Ketupat / Diamond) Kontras Tinggi & Evaluasi Dinamis**:
   - Background cokelat gelap pekat (`#451a03`) dengan teks kuning keemasan (`text-amber-200`) tebal (*font-black*) untuk kontras optimal.
   - Memiliki tepat dua panah keluar: Cabang Benar (`Ya` / `True`) dan Cabang Salah (`Tidak` / `False`).
   - **Badge Hasil Evaluasi**: Menampilkan status logika *real-time* di sisi bawah:
     - `✓ HASIL: TRUE (Ya)` (hijau emerald bercahaya) jika kondisi terpenuhi.
     - `✗ HASIL: FALSE (Tidak)` (merah mawar bercahaya) jika kondisi tidak terpenuhi.
   - Border SVG belah ketupat memancarkan aksen hijau terang (True) atau merah terang (False).
5. **Pembeda Visual Jalur True vs False**:
   - **Jalur Aktif (*Taken/Executed*)**: Garis tebal (`strokeWidth: 3.5`), berwarna cerah (#10b981 atau #f43f5e), efek *glow*, **animasi aliran bergerak dinamis** (`animated: true`), label cabang tegas `✓ Ya (TRUE)` / `✓ Tidak (FALSE)`, serta node di dalamnya diberi badge `✓ DIJALANKAN`.
   - **Jalur Dilewati (*Bypassed/Skipped*)**: Garis alur redup (*dimmed*, `opacity: 0.35`, dashed `5,5`, `strokeWidth: 1.5`), animasi mati (`animated: false`), label redup `✗ ... (DILEWATI)`, dan node di dalamnya meredup (`opacity-40 grayscale-[60%]`) dengan badge `🚫 DILEWATI`.
6. **Titik Temu (*Merge Node*)**: Menggunakan lingkaran konektor standar ANSI/ISO (`mergeNode`) agar alur percabangan yang selesai menyatu rapi sebelum melanjutkan ke instruksi sekuensial berikutnya.

#### C. Pseudocode (Kode Semu Standar CLRS & Bab 3)
1. **Struktur 3 Blok Wajib**:
   - `PROGRAM NamaAlgoritma` (Format PascalCase, wajib disertai komentar deskripsi fungsi `// ...`).
   - `KAMUS:` (Semua variabel wajib didaftarkan beserta tipe datanya: `integer`, `float`, `string`, `boolean`).
   - `ALGORITMA:` (Urutan instruksi langkah program).
2. **Nama Variabel Deskriptif (*Clean Code*)**:
   - Wajib menggunakan nama variabel bermakna (`nilaiUjian`, `totalBelanja`, `usiaPengguna`).
   - **DILARANG KERAS** menggunakan variabel satu huruf (`a`, `b`, `x`, `n`, `p`).
3. **Instruksi I/O Universal**:
   - Menerima masukan: `input(namaVariabel)`.
   - Menampilkan keluaran: `output("Pesan", variabel)`.
4. **Operator Penugasan (*Assignment*) — Standar CLRS**:
   - Menggunakan tanda sama dengan tunggal `=` (contoh: `luas = panjang * lebar`, `sisaSaldo = saldo - jumlahTarik`).
   - **DILARANG** menggunakan tanda panah klasik `<-`.
5. **Operator Perbandingan Kesamaan (*Equality Comparison*) — Standar CLRS**:
   - Wajib menggunakan tanda ganda `==` (contoh: `if status == "LUNAS" then`, `if angka % 2 == 0 then`).
   - Penegasan: Tanda `=` adalah penugasan nilai, sedangkan `==` adalah pengujian kesamaan nilai.
6. **Operator Ketidaksamaan (*Inequality*) — Standar CLRS**:
   - Wajib menggunakan notasi `!=` (contoh: `if angka % 2 != 0 then`, `if pembagi != 0 then`).
   - **DILARANG** menggunakan notasi Pascal klasik `<>`.
7. **Operator Ambang Batas Relasional**:
   - Menggunakan `>`, `>=`, `<`, `<=`.
8. **Penutup Blok Percabangan**:
   - Setiap struktur percabangan `if` (baik IF tunggal maupun IF-ELSE) **WAJIB diakhiri dengan `endif`**.
9. **Percabangan Majemuk (*Cascading / Multi-Branch IF - ELSE IF - ELSE*)**:
   - Kata kunci baku percabangan majemuk adalah **`else if <kondisi> then`** (dua kata terpisah).
   - **DILARANG KERAS** menggunakan kata kunci Python `elif` di dalam pseudocode.
   - Pada pola bertingkat sejajar (*cascading*), struktur ditutup dengan tepat **satu `endif`** pada baris penutup struktur.

---

### 6.2 Standar Tabulasi & Indentasi Monospace (Perataan Kolom)
1. **Algoritma Naratif**:
   - Nomor urut `1.`, `2.`, `3.` wajib lurus sejajar pada kolom margin kiri yang sama (kolom 0).
   - Aksi cabang berindentasi rapi (`pl-5`) tanpa box wrapper.
2. **Pseudocode & Kode Program**:
   - Blok `PROGRAM`, `KAMUS:`, `ALGORITMA:` berada di kolom 0.
   - Instruksi di dalam `ALGORITMA:` (`input`, `if ... then`, `else`, `endif`) menjorok tepat **2 spasi**.
   - Badan di dalam percabangan menjorok tepat **4 spasi**.
   - Kode Python/JS di baris terluar (`var = ...`, `if ...:`) wajib mulai di kolom 0.

---

### 6.3 Aturan Tipografi Kode: Penonaktifan Font Ligatures
- **Font Ligatures WAJIB dinonaktifkan secara global** pada seluruh elemen `code`, `pre`, `.font-mono` melalui CSS:
  ```css
  code, pre, kbd, samp, .font-mono, [class*="font-mono"] {
    font-variant-ligatures: none !important;
    font-feature-settings: "liga" 0, "calt" 0, "dlig" 0 !important;
  }
  ```
- **Tujuan**: Memastikan operator pemrograman seperti `==`, `!=`, `>=`, `<=` tampil sebagai karakter ASCII terpisah yang nyata (sesuai tombol yang diketik mahasiswa pada keyboard), bukan disatukan menjadi simbol tipografi matematika `═`, `≠`, `≥`, `≤`.

---

### 6.4 Studio Workspace: Layout Multi-Kolom Dinamis, Selektor Checkbox & Kursor Presisi
1. **Penyajian Fleksibel dengan Kotak Cawang (Checkbox Multi-Selection)**:
   - Header visualizer menyediakan 3 tombol representasi ber-kotak cawang interaktif:
     - `[✓] 🔷 Flowchart`
     - `[✓] 📋 Pseudocode`
     - `[✓] 📝 Naratif`
     - Serta tombol pintas `Semua` (Studio 4 Kolom) dan indikator jumlah kolom aktif.
   - Pengguna bebas memilih 1, 2, atau ketiga representasi secara simultan bersama Editor Kode.
   - *Safety Guard*: Minimal harus ada 1 representasi aktif (tidak dapat di-uncheck semua).
2. **Penyesuaian Lebar Komponen Dinamis (*Auto-Adjust Grid Scaling*)**:
   - Ketika kurang dari 4 kolom yang aktif, CSS grid secara dinamis memperlebar komponen terpilih:
     - **4 Kolom**: `[1.05fr _ 1.6fr _ 1.15fr _ 1.35fr]` (Naratif, Flowchart, Pseudocode, Kode).
     - **3 Kolom**: Flowchart (jika aktif) membesar hingga `1.85fr`, komponen pendamping `1.1fr–1.2fr`, dan Kode `1.4fr`.
     - **2 Kolom**: Tampilan fokus mendalam di mana Flowchart mendapatkan `1.45fr` (~60%) dan Kode `1fr` (~40%) untuk analisis logika yang sangat detail dan lapang.
3. **Sinkronisasi Sorotan Lintas Panel (*Cross-Highlighting on Hover*)**:
   - Mengarahkan kursor pada salah satu langkah di salah satu kolom secara simultan menyorot langkah yang setara di seluruh panel aktif.
   - Penyorotan langkah `Selain itu:` / `else` mengalirkan visual True/False beranimasi pada Flowchart dan menyorot baris `else:` di editor kode.
4. **Arsitektur Editor Kode: Bebas Gangguan Kursor (*Zero Caret Metric Interference*)**:
   - Gutter Nomor Baris vertikal (`sticky left-0`) dengan penanda `▶ X`.
   - Layer Background Highlight (`bg-amber-400/20 border-l-4 border-amber-400`).
   - Penonaktifan soft-wrapping (`white-space: pre !important; word-break: normal !important;`) memastikan rasio tinggi baris selalu tepat 1:1 setinggi 22px tanpa pergeseran kursor (*zero ghost caret offset*).
   - Tidak boleh menyisipkan `<span>` pembungkus baris, `<div>`, margin/padding, atau `font-bold` di dalam tokenizer Prism.
   - Metrik teks `<textarea>` (lapisan pengetikan kursor) dan `<pre>` (lapisan pewarnaan sintaks) pada `react-simple-code-editor` WAJIB identik 100% sub-piksel agar kursor pengetikan tidak pernah mengalami pergeseran (*ghost caret offset*).
5. **Integrasi State Memory RAM (Live) pada Mode Maximize Studio**:
   - Bilah `STATE MEMORY RAM (LIVE)` disematkan tepat di bawah header kartu Kode Program pada mode maximize studio.
   - Menampilkan variabel memori aktif runtime secara real-time dengan status buka/tutup (*collapsible*) yang tersinkronisasi langsung dengan tombol pintas `RAM Live` di header studio.

---

### 6.5 Prinsip Desain UI/UX & Kontras
1. **Elegan, Modern, dan Tidak Menor**: Menghindari lencana (*badge*) berlebihan atau kotak mencolok di tengah-tengah baris kode yang dapat merusak pemahaman mahasiswa.
2. **Kontras Tinggi & Ramah Pemula**: Seluruh elemen teks harus memiliki rasio kontras tinggi yang nyaman dibaca baik pada mode gelap (*Dark Mode*) maupun terang (*Light Mode*).
3. **Layout Penuh & Tidak Tertekan**: Navigasi tab modul menggunakan grid responsif (`grid-cols-2 lg:grid-cols-4`) agar judul modul dan tombol navigasi tidak tertekan (*squished*) atau memunculkan *scroll-bar* horizontal.

---

*Dokumen ini terakhir diperbarui: 7 September 2026*  
*Disusun dan disepakati oleh: Hadiq, ST, M.Kom bersama Antigravity AI*


