# 📋 SPESIFIKASI PROYEK: Web Algoritma & Pemrograman
# Dokumen Rujukan Utama — Versi 2.1 (31 Agustus 2026)

> **PENTING**: Dokumen ini adalah sumber kebenaran tunggal (*single source of truth*) untuk seluruh keputusan arsitektur, visi produk, dan status implementasi proyek ini. AI agent atau developer manapun yang bekerja pada proyek ini WAJIB membaca dokumen ini terlebih dahulu sebelum melakukan perubahan apapun.

---

## 1. VISI & TUJUAN PRODUK

Platform pembelajaran interaktif mata kuliah **Dasar Algoritma & Pemrograman (PP112601, 3 SKS)** yang dirancang untuk:

1. **Meningkatkan minat belajar mahasiswa** melalui visualisasi dan animasi interaktif yang dinamis, modern, dan pedagogis.
2. **Menambah semangat mahasiswa** untuk mendapatkan capaian terbaik melalui **gamifikasi**.
3. **Menyediakan lencana capaian mahasiswa** di halaman profil mahasiswa — baik rata-rata capaian dari semua bab maupun capaian tiap pertemuan.
4. **Menyediakan lencana capaian kelas dan per mahasiswa** di halaman dosen — baik secara umum maupun per pertemuan.
5. **Lencana berupa warna berbeda** untuk 9 tingkat capaian: E, DE, D, CD, C, BC, B, AB, A.
6. **Kategori capaian**: E/DE/D/CD = Kurang, C/BC = Cukup, B/AB = Baik, A = Sempurna.

### Dosen Pengampu
- **Nama**: Hadiq, ST, M.Kom
- **NIDN**: 0713077804
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
| **Fase 3** | **Sistem Asesmen & Dual-Shield Anti-AI** | ✅ **Selesai 100%** | Obrolan Santai Pra-Ujian Berbasis LLM (`WarmupChat.tsx`, 4 Dimensi Dinamis Bab 1–16, Kesadaran Waktu, Perekam Golden Baseline WPM/Backspace/Stilometri), Delta Burst Limiter (Δchar ≤ 15/tick), Drag & Drop lockout, Validasi Silang Stilometri di `/api/grade-essay`, isolasi view `meeting_grades` khusus esai/lab. |
| **Fase 4** | **Dashboard Mahasiswa** | ✅ **Selesai** | Rute `/student/dashboard` & `/student/meeting/[id]`, visualisasi lencana dinamis (`BadgeDisplay.tsx`), agregasi view `overall_grades` & `meeting_grades`. |
| **Fase 5** | **Dashboard Dosen** | ✅ **Selesai** | Rute `/lecturer/dashboard` (analitik kelas, filter pencarian mahasiswa) & `/lecturer/student/[id]` (detail rapor, detektor anti-cheat, ulasan AI grader). |
| **Pilar 2 (Bagian 2)** | **Struktur Percabangan Statemen Tunggal & Ganda (Minggu 6)** | ✅ **Selesai 100%** | Teori 4 Representasi Terpadu (`Pertemuan6.tsx`), 4 Lab Interaktif (Anatomi Kondisi, IF Tunggal, IF-ELSE Ganda, 3 Kasus Nyata Terpadu), Mode Proyektor Fullscreen, dan **5 Misi Coding Percabangan di Workspace Studio** (`/workspace?chapter=6`). |
| **Pilar 2 (Bagian 3)** | **Percabangan Majemuk & Bersarang (Minggu 7)** | ✅ **Selesai 100%** | Teori 4 Representasi Terpadu (`Pertemuan7.tsx`), 4 Lab Interaktif (Cascading IF-ELIF Grade, Skrining Donor Darah Nested IF, Selector ATM Switch/Match-case, Studi Kasus Kasir Restoran Terpadu), 5 Soal MCQ Kuis, 5 Soal Esai Evaluasi AI, dan **5 Misi Coding Percabangan Majemuk di Workspace Studio** (`/workspace?chapter=7`). |
| **Pilar 3 (Bagian 1)** | **Dasar Perulangan: FOR & WHILE Loop (Minggu 9)** | ✅ **Selesai 100%** | Teori 5 Sub-Materi Terlipat Default (`Pertemuan9.tsx`), 4 Lab Interaktif Dwibahasa (`AnimatedLoopDefinition`, `ForLoopStepperLab`, `WhileSentinelLab`, `LoopAccumulatorRamLab`, `BreakContinueLab`), Bank 5 Esai AI Grader, dan Rute Cetak Laporan Audit Forensik `/lecturer/audit-report`. |

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
│   │   └── [id]/page.tsx              <- Materi perkuliahan interaktif per minggu (Minggu 1 s.d. 7 & 9 aktif)
│   ├── student/
│   │   ├── dashboard/page.tsx         <- Dasbor Mahasiswa (16 Kartu Pekan, Status Selesai/Tersedia/Gembok)
│   │   └── meeting/[id]/page.tsx      <- Rapor nilai capaian individual per pertemuan
│   ├── lecturer/
│   │   ├── dashboard/page.tsx         <- Dasbor Dosen (Analitik kelas, reset password NIM, audit esai)
│   │   ├── audit-report/page.tsx      <- Halaman cetak laporan resmi forensik integritas PDF A4
│   │   └── student/[id]/page.tsx      <- Detail performa per mahasiswa & detektor anti-cheat
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

### 6.6 Standar Pewarnaan Sintaks Kode (VS Code Palette & Dual-Mode High Contrast)
1. **Prinsip Dual-Mode High Contrast**:
   - **Light Mode**: WAJIB menggunakan warna *deep jewel tones* / jenuh kontras tinggi (`text-emerald-700`, `text-blue-700`, `text-violet-700`, `text-rose-600`, `text-sky-800`, `text-amber-700`, `text-slate-900`) di atas latar terang (`bg-slate-50`, `bg-white`, `bg-card`). **DILARANG KERAS** menggunakan warna teks pastel muda (`text-*-300`/`text-*-400`) di mode terang karena pudar (*washed out*).
   - **Dark Mode**: Menggunakan warna neon/luminous cerah berpijar (`dark:text-emerald-400`, `dark:text-sky-300`, `dark:text-violet-400`, `dark:text-rose-400`, `dark:text-amber-300`, `dark:text-slate-100`) di atas latar gelap pekat (`dark:bg-slate-950`).
2. **Gutter Nomor Baris (Line Numbers)**: Wajib menyertakan properti `select-none` (`user-select: none`) agar saat mahasiswa menyeleksi atau menyalin teks secara manual, angka nomor baris tidak ikut tersalin ke clipboard.
3. **Tombol Salin (Clipboard Copy)**: Tombol salin kode WAJIB menyalin string kode mentah bersih runnable (*clean raw string*), bukan elemen atau tag renderan HTML.

---

### 6.7 Standar Sinkronisasi Semantik Warna Lintas Representasi (Naratif, Flowchart, Pseudocode)
1. **Token Warna Semantik Terpadu**:
   - **Input / Masukan**: Biru Royal (`text-blue-700 dark:text-blue-400`, `bg-blue-500/10`, jajar genjang input).
   - **Proses / Kalkulasi / Assignment**: Ungu / Violet (`text-purple-700 dark:text-purple-400`, `bg-purple-500/10`, persegi panjang proses).
   - **Output / Keluaran**: Hijau Emerald (`text-emerald-700 dark:text-emerald-300`, `bg-emerald-500/10`, jajar genjang output).
   - **Percabangan / Kondisi**: Amber / Emas pekat (`text-amber-700 dark:text-amber-300`, belah ketupat `#451a03` border amber).
   - **Operator Matematika & Relasional**: Merah Mawar / Rose tegas (`text-rose-600 dark:text-rose-400 font-bold`).
   - **Angka / Literal Numerik**: Amber / Oranye (`text-amber-600 dark:text-amber-400`).
   - **Variabel**: Biru Langit / Sky (`text-sky-800 dark:text-sky-300 font-medium`).
   - **Nomor Langkah Naratif**: Hijau Emerald / Teal (`text-emerald-700 dark:text-emerald-400 font-bold`).
2. **Editor Masukan Interaktif**: Panel konverter yang dapat disunting mahasiswa WAJIB menggunakan editor interaktif ber-syntax-highlighting (seperti `react-simple-code-editor`), bukan `<textarea>` monokrom polos.

---

### 6.8 Standar Ergonomi Dimensi Kartu Flip & Proteksi Overflow Teks
1. **Tinggi Kartu Proporsional**: Pada layout grid multi-kolom (misalnya 5 kolom pada 5 Ciri Algoritma Knuth), tinggi kartu harus memadai minimal `min-h-[245px]` (responsif: `h-[245px] sm:h-[255px] md:h-[265px]` atau lebih) agar ruang konten di sisi balik memuat seluruh penjelasan tanpa menabrak batas footer atau tepi bawah.
2. **Larangan Teks Statis `text-white` pada Elemen Adaptif Tema**:
   - DILARANG menggunakan kelas `text-white` secara statis pada teks konten dalam elemen kartu berlatar `bg-card` atau adaptif tema.
   - WAJIB gunakan `text-slate-950 dark:text-white` dengan aksen dekoratif semantik (seperti `underline decoration-*/60 decoration-2`).
3. **Proteksi Overflow Teks Footer**: Gunakan `line-clamp-2` (bukan `truncate`) pada catatan ringkasan atau takeaway di bagian bawah kartu agar teks yang panjang dapat mengalir rapi menjadi 2 baris tanpa terpotong kasar atau menabrak batas border.

---

### 6.9 Standar Database & Migrasi SQL Supabase
1. **Idempotensi**: Seluruh file SQL migrasi atau seed data pengguna (`supabase/*.sql`) wajib menggunakan `ON CONFLICT (id) DO UPDATE ...` atau verifikasi eksistensi.
2. **Hashing Password**: Menggunakan format hashing bcrypt auth Supabase yang valid.
3. **Sinkronisasi Role**: Sinkron antara `auth.users` dan `public.profiles` (`mahasiswa` atau `dosen`).

### 6.10 Fitur Reset Password Mahasiswa oleh Dosen (Ke Default NIM)
1. **Pusat Kontrol Akun Dosen (`/lecturer/dashboard`)**:
   - Kolom aksi tabel: "Reset ke NIM" dengan dialog modal konfirmasi eksplisit sebelum eksekusi.
   - Status Akun: Pill badge `Default NIM` (mahasiswa belum mengubah password) vs `Kustom` (mahasiswa telah mengubah password mandiri).
2. **Endpoint Backend (`POST /api/lecturer/reset-password`)**:
   - Memanfaatkan Supabase Service Role Admin Client untuk mengupdate password pengguna di `auth.users` ke nilai NIM yang bersangkutan.
   - Metadata `password_is_default = true` di-update secara simultan agar status badge di dashboard dosen langsung tersinkronisasi.
   - Dilindungi proteksi otentikasi peran `dosen` pada level server.

---

### 6.11 Standar Desain Dashboard Mahasiswa (Compact 16 Pertemuan & Kebebasan Akses Bab)
1. **Grid Responsif Kartu Kompak (16 Pekan Silabus)**:
   - Menampilkan seluruh 16 minggu perkuliahan semester dalam tata letak kartu kompak (`min-h-[148px]`, grid 4 kolom responsif).
   - Menjamin seluruh kurikulum semester terlihat komprehensif tanpa memerlukan scrolling vertikal yang melelahkan.
2. **3 Status Visual Kartu**:
   - **Selesai**: Menampilkan skor rata-rata, lencana capaian berwarna spesifik, status kelulusan (*Sempurna*, *Bagus*, atau *Remedial*), serta tombol cepat menuju ulasan rapor pertemuan (`/student/meeting/[id]`).
   - **Tersedia**: Pertemuan aktif yang materi dan bank soalnya sudah siap. Menampilkan border putus-putus (*dashed*), badge `Tersedia`, dan tombol aksi langsung `Mulai Tes`.
   - **Segera / Terkunci**: Pertemuan semester lanjutan yang belum dibuka materi/asesmennya dengan ikon gembok dan tampilan redup (*opacity 0.6*).
3. **Prinsip Akses Belajar Non-Linear**:
   - Mahasiswa bebas memilih dan mengerjakan materi bab manapun yang berstatus *Tersedia* tanpa harus dipaksa berurutan secara kaku. Jika mahasiswa telah menyelesaikan bab 3 dan 5, mahasiswa tetap memiliki kebebasan penuh untuk mengambil tes bab 1 dari dashboard.
4. **Hero Banner Motivasional**:
   - Menampilkan salam personal, metrik capaian total, dan pesan persuasif mengenai pentingnya konsistensi belajar.
   - Tombol CTA otomatis mendeteksi pertemuan pertama yang belum tuntas untuk memandu mahasiswa melanjutkan progres belajarnya.

---

### 6.12 Standar Penyajian Halaman Teori (Sub-Materi Tertutup / Collapsed by Default)
1. **Aturan Mutlak Tertutup Default (`useState(false)`)**:
   - Seluruh komponen materi bab perkuliahan (`src/components/theory/Pertemuan[1..N].tsx`) **WAJIB menyetel seluruh akordion sub-materi dalam keadaan tertutup secara default**.
2. **Anatomi Kartu Akordion Sub-Materi**:
   - **Header Kartu**:
     - Ikon semantik dan judul sub-bab yang tegas (contoh: `<Cpu className="w-8 h-8" /> 1. Mengupas Definisi Komputer`).
     - Indikator Capaian Pembelajaran baku dengan ikon ceklis hijau:
       `<div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold"><CheckCircle2 className="w-4 h-4 text-emerald-500" /><span>Capaian: [deskripsi kompetensi]</span></div>`
     - Tombol chevron toggle (`ChevronDown`) dengan rotasi 180° saat terbuka.
   - **Badan Kartu**:
     - Dibungkus dengan `<AnimatePresence>` dan `<motion.div>` ber-animasi `height: 'auto'` dan `opacity: 1`.
3. **Keuntungan Pedagogis & Performa Web**:
   - **Bebas Infinite Scroll**: Halaman saat pertama kali dimuat hanya memiliki tinggi total ~800px, sehingga mahasiswa mendapatkan gambaran besar (*overview*) materi secara instan.
   - **Akses Cepat Asesmen**: Sesi kuis/tes di bagian bawah halaman langsung terlihat dan mudah dijangkau tanpa harus melewati ribuan piksel konten yang terbuka.
   - **Bebas Layout Shift**: Komponen visual berat (Prism code playground, SVG flowchart animasi, timeline) baru di-mount/di-render saat mahasiswa sengaja membuka sub-materi yang bersangkutan.

---

### 6.13 Larangan Mutlak CSS Global `scroll-behavior: smooth` & Standar Navigasi Ujian
1. **Larangan Keras `scroll-behavior: smooth` pada Tag `html` Global**:
   - **DILARANG KERAS** menambahkan `html { scroll-behavior: smooth; }` secara global di `src/app/globals.css`.
   - **Alasan Teknis**: Mengaktifkan smooth scroll secara global memaksa peramban (browser) melakukan interpolasi animasi lambat pada seluruh perpindahan rute Next.js. Hal ini mematahkan mekanisme *scroll restoration* Next.js, menyebabkan pengguna yang berpindah dari halaman beranda mendarat di tengah halaman.
   - Transisi scroll antarhalaman wajib instan agar pengguna selalu tiba di titik koordinat paling atas (`0, 0`).
2. **Smooth Scrolling Hanya Programmatic / Lokal**:
   - Animasi smooth scrolling hanya diizinkan untuk aksi interaksi pengguna lokal di dalam halaman yang sama, seperti tombol **🏆 Uji Pemahaman** pada sticky sub-header.
3. **Protokol Navigasi Tombol "Mulai Tes"**:
   - Tautan langsung ke tes dari dashboard menggunakan format:
     `href={`/theory/${meeting.id}?startTest=true#assessment`}`
   - Wajib menyertakan atribut `scroll={false}` pada Next.js `<Link>` agar router tidak bentrok dengan koordinat target asesmen.

### 6.14 Standar Adaptabilitas Tema Penuh (Dual-Mode: Strict Light vs Dark Theme Harmony)
1. **Larangan Keras Hardcoding Latar Belakang Gelap**:
   - **DILARANG KERAS** menggunakan kelas latar belakang gelap (`bg-slate-950`, `bg-slate-900`, `bg-slate-900/90`, `text-slate-100`, `border-slate-800`) secara statis tanpa prefix `dark:` pada elemen pembungkus modul, kontainer lab, toolbar header, kartu materi, dan field input.
2. **Harmoni Tema 100% Konsisten**:
   - **Light Mode (Mode Terang)**: Seluruh kontainer, kartu lab, toolbar, dan area kerja WAJIB berlatar terang bersih (`bg-card`, `bg-white`, `bg-slate-50`, `bg-slate-100/80`), border halus (`border-slate-200/80` / `border-border`), teks utama gelap tegas (`text-slate-900`, `text-slate-800`), serta token warna jenuh berkontras tinggi (*deep jewel tones*).
   - **Dark Mode (Mode Gelap)**: Seluruh kontainer dan kartu beralih ke warna gelap pekat (`dark:bg-slate-950`, `dark:bg-slate-900`), border gelap (`dark:border-slate-800`), teks cerah (`dark:text-slate-100`), serta token warna neon bercahaya (*luminous*).
3. **Pemberantasan Anomali "Black Slab"**:
   - Menghilangkan tampilan kotak hitam pekat yang "bocor" atau terisolasi di tengah halaman saat pengguna memilih Mode Terang.

### 6.15 Standar Kelengkapan Dual-Language (Python & JavaScript) pada Simulator & Lab Interaktif
1. **Wajib Dua Bahasa Sekaligus**:
   - Seluruh modul lab interaktif, visualizer memori/stack/RAM, interactive playground, dan simulator alur kerja algoritma di setiap bab perkuliahan WAJIB menyediakan implementasi dalam **KEDUA BAHASA PEMROGRAMAN SEKALIGUS (Python & JavaScript)** dengan tab/toggle pemilih bahasa (`activeTab: 'python' | 'javascript'`).
2. **Larangan Monolingual**:
   - **DILARANG KERAS** hanya menyediakan salah satu bahasa (misalnya hanya JavaScript saja atau hanya Python saja). Platform ini berlandaskan pedagogi komparasi dwibahasa: mahasiswa berhak melihat bagaimana konsep logika yang sama diimplementasikan dalam Python maupun JavaScript secara berdampingan.

### 6.16 Standar Anti-Clipping Simbol Flowchart & Safe Margins Geometri (Zero Boundary Collision)
1. **Prinsip Bebas Tubrukan Batas (Zero Clipping)**:
   - Teks instruksi di dalam simbol flowchart (khususnya Jajar Genjang Input/Output dan Belah Ketupat Decision) WAJIB berada sepenuhnya di dalam batas simbol dengan *safe inner margin* minimal 15–20px di setiap sisi miring. Teks DILARANG KERAS menabrak, memotong, atau menembus garis tepi polygon.
2. **Kompensasi Sudut Miring Parallelogram**:
   - Sisi miring parallelogram memotong area horizontal sebesar 20–30px di kedua ujung.
   - Untuk teks instruksi berkarakter panjang (seperti `input(var1, var2, ...)`, `output("Pesan Lengkap...")`), dimensi lebar simbol WAJIB diperlebar secara proporsional (lebar dasar 250–280px untuk vertikal, 150–200px untuk horizontal) dan ukuran font diskalakan secara dinamis (`9.5px`–`11.5px`), bukan memaksakan font besar statis yang menembus garis tepi.
3. **Perhitungan Kapasitas Monospace**:
   - Huruf monospace berukuran font 12px membutuhkan lebar ~7.2px per karakter. Teks 30 karakter membutuhkan ruang horizontal ~216px. Jika dimasukkan ke dalam parallelogram berlebar 200px dengan kemiringan 25px (lebar aman hanya ~150px), teks dipastikan menabrak tepi. Developer/AI Agent WAJIB memperlebar polygon (misal ke 260px) dan/atau menurunkan font ke 10px–11px.

### 6.17 Standar Kontinuitas Jalur Aktif Flowchart (Unbroken Solid Path to Terminator)
1. **Alur Aktif Utuh Tanpa Cacat**:
   - Aliran eksekusi dari cabang yang bernilai benar (True / Ya) WAJIB digambarkan sebagai garis alir solid tebal aktif (`strokeWidth="3.5"`, warna solid cerah seperti emerald `#10b981`) yang menyambung secara kontinu dari port keluar decision, melewati kotak proses/aksi, melalui rel bus pengumpul (*collector bus*), menyatu ke *merge node*, hingga mencapai terminator `SELESAI`.
2. **Larangan Garis Putus-Putus pada Jalur Aktif**:
   - DILARANG KERAS membiarkan segmen rel pengumpul (collector bus) tetap berupa garis putus-putus (*dashed line*) abu-abu saat cabang yang menuju ke sana sedang aktif dieksekusi. Garis putus-putus hanya digunakan untuk jalur yang sedang tidak aktif / dilewati (*skipped*).

### 6.18 Standar Pencegahan Warna Pastel Pudar pada Diagram SVG di Mode Terang (Anti-Washed Out Graphic Tokens)
1. **Larangan Teks & Latar Pastel Pudar**:
   - Pada seluruh diagram SVG dan simbol flowchart, DILARANG KERAS menggunakan warna pastel muda (seperti hijau muda `#a7f3d0`, pink muda `#fda4af`, teks putih di atas latar terang, atau teks abu-abu redup di latar putih) pada elemen aksi/output di Mode Terang (*Light Mode*).
2. **Dual-Mode High Contrast Token**:
   - **Mode Terang (Light Mode)**: Menggunakan latar lembut dengan border tegas (`fill="#ecfdf5"` border `#059669` untuk sukses/true; `fill="#fff1f2"` border `#e11d48` untuk gagal/false) dan teks warna jenuh pekat (*deep jewel tones*, misal `fill="#064e3b"` atau `fill="#881337"` dengan `fontWeight="900"`).
   - **Mode Gelap (Dark Mode)**: Menggunakan latar belakang gelap pekat (`dark:fill-slate-950` / `dark:fill-emerald-950/80`) dengan teks cerah kontras tinggi (`dark:fill-emerald-200`, `dark:fill-rose-200`).

### 6.19 Standar Kehadiran Sosial Humanis & Nudge Kejujuran (Watching Eyes Effect & Persona "Bapak")
1. **Efek Kehadiran Sosial Humanis (Watching Eyes Effect)**:
   - Berdasarkan riset ilmiah Bateson, Nettle, & Roberts (2006, *Biology Letters*) dan Bryan et al. (2011, *PNAS*): stimulus tatapan mata ramah figur otoritas moral secara bawah sadar meningkatkan kesadaran etis (*ethical self-awareness*) dan menekan niat berbuat curang tanpa menimbulkan rasa terintimidasi.
   - Form obrolan santai dan lembar pengerjaan esai WAJIB menyertakan foto potret senyum hangat Dosen Pengampu (`/dosen-smile.png`) yang didampingi badge hijau *Integritas Akademik* dan kutipan pendampingan kebapakan:
     *“Kerjakan dengan tenang ya! Bapak jauh lebih menghargai satu kalimat murni pemikiranmu sendiri daripada sepuluh paragraf salinan mesin. Kamu pasti bisa!”*
2. **Panggilan Persona Dosen Baku ("Bapak")**:
   - Seluruh teks percakapan, prompt sistem LLM, dialog antarmuka, dan instruksi WAJIB menggunakan sebutan persona **"Bapak"** (DILARANG KERAS menggunakan kata "Aku" yang terlalu informal atau "Saya" yang berjarak kaku).
   - Mencerminkan budaya akademis perguruan tinggi Indonesia yang hangat, kebapakan, mengayomi, dan santun.

### 6.20 Standar Tata Letak Bersanding 2 Kolom pada Lembar Esai (Dual-Column Side-by-Side Responsive Architecture)
1. **Pemisahan Horizontal Bebas Tumpukan (`md:grid-cols-12`)**:
   - DILARANG KERAS menumpuk foto dosen, pertanyaan soal, textarea pengetikan, dan tombol kirim dalam satu kolom vertikal panjang yang memicu pemotongan tombol (*cutoff below the fold*).
   - Layout pengerjaan esai WAJIB menggunakan format bersanding 2 kolom mulai breakpoint `md:` (≥768px):
     - **Kolom Kiri (`md:col-span-5`)**: Banner dosen ramah + Pesan integritas + Teks pertanyaan soal lengkap dengan nomor soal dan badge standar kelulusan (≥80).
     - **Kolom Kanan (`md:col-span-7`)**: Area pengetikan jawaban (*textarea*) + notifikasi revisi/telemetri + Word counter + Tombol **"Kirim Jawaban"** yang menonjol (`bg-primary`).
2. **Pelebaran Kontainer Proporsional (`max-w-5xl xl:max-w-6xl`)**:
   - DILARANG membatasi lebar lembar esai pada `max-w-3xl` yang sempit. Kontainer diperluas ke `max-w-5xl xl:max-w-6xl` agar seimbang, lapang, dan selaras dengan lebar konten teori.
3. **Optimasi Viewport Bebas Gulir (*Zero-Scroll Guarantee*)**:
   - Total tinggi vertikal kartu dikompresi menjadi hanya **~340px–370px**.
   - Seluruh elemen penting (pertanyaan soal, textarea, dan tombol Kirim Jawaban) terjamin tampil 100% utuh dalam satu pandangan mata (*in-viewport*) pada monitor/laptop standar (1366×768 atau 1080p).
   - Mahasiswa dapat membaca teks soal di sisi kiri sembari mengetikkan penalarannya di sisi kanan tanpa bolak-balik scroll.
   - Layar ponsel (<768px): Otomatis beralih ke tata letak vertikal alami (*fluid stack*) dengan textarea yang tetap ringkas.

### 6.21 Standar Jarak Bebas Estetika Bilah Menempel & Aksen Gradien Puncak Kartu (Sticky Header Clearance & Floating Card Geometry)
1. **Offset Navigasi Baku 154px**:
   - Total tinggi elemen menempel (*sticky*) di atas layar adalah ~134px (Navbar 64px + Sub-header materi ~70px).
   - Seluruh mekanisme *scroll restoration* dan tombol *Uji Pemahaman* WAJIB menggunakan konstanta `headerOffset = 154` (bukan 118px) untuk memberikan ruang napas estetika (*aesthetic breathing room*) sebesar ~20px di bawah bilah sub-header.
2. **Garis Aksen Gradien Relaksasi Puncak Kartu**:
   - Seluruh kartu evaluasi (Kartu Intro, Form Obrolan Santai `WarmupChat`, dan Form Esai `EssayContainer`) WAJIB menyertakan garis gradien halus di puncak kartu: `<div className="w-full h-1 bg-gradient-to-r from-primary via-indigo-500 to-emerald-400 shrink-0" />`.
   - Garis tepi atas, sudut membulat (*rounded corners*), dan bayangan kartu (*drop shadow*) WAJIB tampak utuh mengambang bebas (*floating card*), DILARANG terpotong atau terselip di bawah bilah navigasi menempel.

### 6.22 Standar Arsitektur Energi Ganda Psikologis (Dual-Energy Interface Harmony / Yerkes-Dodson Law)
1. **Zona Materi Teori & Laboratorium (Tinggi Semangat / High Arousal)**:
   - Tetap menggunakan tone berenergi tinggi, dinamis, dan semarak (*vibrant jewel tones*, zoom interaktif 1.2x, animasi alir flowchart, flip card 2D tajam, simulator dwibahasa Python & JavaScript).
   - Tujuannya menjaga atensi, mengaktifkan dopamin, mencegah rasa kantuk/kebosanan saat membedah logika kode yang rumit.
2. **Zona Evaluasi & Obrolan Santai (Penenang & Ramah / Low-to-Medium Arousal)**:
   - Menggunakan tone sejuk, menenangkan, humanis, dan minim stres visual (aksen hijau zamrud/slate/indigo lembut, senyum Pak Hadiq, garis gradien halus).
   - Tujuannya menurunkan kortisol/kecemasan ujian (*exam anxiety*), menciptakan rasa aman, dan mendorong kejujuran intelektual.
3. **Larangan Menyamaratakan Tone**: DILARANG meredupkan atau menerapkan tone menenangkan pada materi teori, dan sebaliknya DILARANG menggunakan gaya visual agresif/menegangkan pada sesi ujian.

### 6.23 Standar Asesmen Esai Murni & Sequential Progressive Mastery Gateway (Gembok Bertingkat)
1. **Asesmen Esai Murni Tanpa Pilihan Ganda**:
   - Seluruh evaluasi pemahaman mahasiswa pada platform resmi menggunakan **100% Ujian Esai Interaktif** yang dinilai langsung oleh AI Grader berbasis rubrik analitik komprehensif (`src/lib/essay-bank.ts`).
   - Kuis Pilihan Ganda (`question-bank.ts`) resmi ditinggalkan/ditiadakan dalam alur belajar aktif untuk mengeliminasi budaya tebak spekulatif dan mendorong pemikiran komputasional mendalam.
2. **Mekanisme Ujian: Sequential Progressive Mastery Gateway**:
   - Soal esai disajikan satu per satu secara berurutan (5 soal per pertemuan).
   - Soal berikutnya **HANYA AKAN TERBUKA** apabila soal sebelumnya telah memperoleh nilai kelulusan minimal ($\ge 80$).
   - **Tiga Pilar Rasional Pedagogis**:
     1. *Membangun Grit & Daya Juang Mental*: Membiasakan mahasiswa untuk tidak mudah menyerah dan pantang bosan saat merevisi jawaban atas bimbingan korektif AI yang ramah dan suportif.
     2. *Anti Bulk-Prompt Dumping*: Menutup celah kecurangan penyalinan borongan soal ke AI luar (ChatGPT/Claude/Gemini), karena mahasiswa tidak dapat mengakses soal berikutnya sebelum menyelesaikan soal saat ini.
     3. *Mastery Learning (Belajar Tuntas)*: Menjamin bahwa kompetensi prasyarat telah benar-benar dikuasai sebelum berpindah ke tingkat kesulitan berikutnya.

### 6.24 Standar Navigasi Beranda Dua Baris 16 Pekan (Two-Row Semester Navigator & Zero Scroll Above-the-Fold)
1. **Akses Instan Tanpa Gulir (*Above-the-Fold Guarantee*)**:
   - Area puncak beranda (`src/app/page.tsx`) wajib menyediakan gerbang navigasi langsung menuju seluruh 16 pekan perkuliahan tanpa mengharuskan pengguna menggulir ke bawah (*zero scroll*).
   - Tata letak menggunakan **Two-Row Semester Bar Matrix**:
     - **Baris 1**: Pertemuan `01` s.d. `08` (Paruh Pertama Semester - UTS).
     - **Baris 2**: Pertemuan `09` s.d. `16` (Paruh Kedua Semester - UAS).
2. **Tipografi & Estetika Humanis Plus Jakarta Sans**:
   - Menggunakan font modern bulat dinamis **Plus Jakarta Sans** (`font-heading font-bold`) dengan penomoran dua digit (`01` s.d. `16`) agar tampil proporsional, ramah, dan bebas kesan kaku monospaced.
   - Status visual:
     - Hijau Zamrud Aktif (`bg-emerald-500 text-white shadow-emerald-500/25`): Pertemuan `01` s.d. `07` (tersedia & siap diakses).
     - Aksen Border Biru/Spesial: Pekan evaluasi UTS (08) dan UAS (16).
     - Gembok Redup: Pekan materi lanjutan yang masih dalam tahap persiapan.
3. **Bilah Pratinjau Interaktif 1 Baris (*Live Single-Line Preview Bar*)**:
   - Tepat di bawah matriks tombol pekan disematkan bilah pratinjau ringkas setinggi 36px.
   - Mengarahkan kursor (*hover*) ke sembarang tombol pekan langsung menampilkan judul materi dan capaian pembelajaran secara instan tanpa pergeseran tata letak (*zero layout shift*).

### 6.25 Status Kurikulum & Standar Baku Pertemuan 1 s.d. 7 (Immutable & Verified)
1. **Status FIX & Final**:
   - Seluruh konten pembelajaran Pertemuan 1 sampai 7 telah dinyatakan **100% LENGKAP, TERUJI, dan BERSTATUS FIX (SINGLE SOURCE OF TRUTH)**.
   - Mencakup materi teori lengkap, visualizer 4 representasi, modul laboratorium interaktif dwibahasa (Python & JavaScript), modul Pra-Ujian Obrolan Santai (*Warmup Chat*), serta bank 5 soal esai penalaran berbobot.
2. **Kepatuhan Penambahan Materi Baru (Pertemuan 8 s.d. 16)**:
   - Seluruh modul lanjutan (Pekan 8 s.d. 16) WAJIB mengadopsi standar pedagogis yang telah dibakukan pada Pertemuan 1–7 tanpa pengecualian.

### 6.26 Standar Silabus & Capaian Pembelajaran Paruh Kedua (Pertemuan 9 s.d. 16 — 4 SKS / 200 Menit)
1. **Struktur Pembelajaran 4 SKS (200 Menit per Pertemuan)**:
   - Alokasi waktu memfasilitasi siklus lengkap: Konsep & Analogi (30-35') $\rightarrow$ Visualizer Lab (40-50') $\rightarrow$ Hands-on Coding Mandiri (35-45') $\rightarrow$ Asesmen Esai AI Bertingkat (35-40').
2. **Matriks Silabus Baku Pertemuan 9 s.d. 16**:
   - **Pertemuan 09: Dasar Perulangan (FOR & WHILE Loop)**: Iterasi terhitung (`range`), iterasi berkondisi (`sentinel/flag`), pencegahan *infinite loop*, variabel akumulator (*sum/count*).
   - **Pertemuan 10: Perulangan Bersarang (Nested Loop)**: Iterasi multi-dimensi, alur outer vs inner loop, pemetaan koordinat spasial ($i, j$), pembangkit pola visual geometris, kompleksitas $O(n^2)$.
   - **Pertemuan 11: Struktur Data Berurutan (List & Tuple)**:
     - *Porsi Dominan 75% List*: Manipulasi CRUD (*append, insert, pop, remove*), *slicing*, algoritma agregasi & *Linear Search*.
     - *Porsi Khusus 25% Tuple*: Integritas data (*immutability vault*), koordinat paten, dan *tuple unpacking*.
   - **Pertemuan 12: Struktur Data Asosiatif (Dictionary & Set)**:
     - *Porsi Khusus 25% Set*: Deduplikasi instan (`list(set(data))`), pencarian cepat $O(1)$, operasi diagram Venn.
     - *Porsi Dominan 75% Dictionary*: Pasangan *Key-Value*, aturan kunci unik, metode `.get()`, traversal `.items()`.
     - *Klimaks Terapan: List of Dictionaries*: Representasi tabel mini-database (rekaman data dunia nyata/JSON ready), penelusuran display dan filtering dengan `if`.
   - **Pertemuan 13: Fungsi Dasar & Top-Down Design**:
     - *Aturan Mutlak*: **Belum ada parameter dan belum ada return value**.
     - Filosofi modularitas (DRY), dekomposisi masalah *Top-Down*, alur kontrol pemanggilan *Call-and-Return*, simbol baku ANSI/ISO **Predefined Process** (`| [Nama] |`), Pseudocode `procedure`, sintaks Python `def` dan JS `function`.
   - **Pertemuan 14: Fungsi Lanjutan (Parameter & Return Value)**:
     - Parameter Formal vs Argumen Aktual, ragam akses (*positional, named/keyword, default*), isolasi ruang lingkup (*scope lokal vs global* di RAM), mekanisme `return` vs *void*, **Matriks Keputusan Desain Fungsi 4 Kuadran**, fungsi pemroses *List of Dictionaries*.
   - **Pertemuan 15: Penanganan Galat & Teknik Debugging**:
     - Taksonomi 3 jenis galat: **Syntax Error** (waktu compile/parse), **Runtime Error / Exception** (`ZeroDivisionError`, `IndexError`, `TypeError`, `ValueError`), dan **Logical Error** (bug semantik).
     - Mekanisme defensif: Blok `try - except - finally` di Python vs `try - catch - finally` di JavaScript.
     - Toolkit debugging: Membaca *Stack Trace*, *Print/Logging Debugging*, *RAM State Tracing*, dan *Rubber Duck Debugging*.
   - **Pertemuan 16: Evaluasi Akhir Semester (UAS) & Proyek Terapan**:
     - Evaluasi komprehensif integrasi seluruh pilar dan perakitan proyek aplikasi terapan mandiri yang modular dan kokoh bebas crash.

### 6.27 Implementasi Baku Pertemuan 9 (Dasar Perulangan: FOR & WHILE Loop — 100% Selesai & Aktif)
1. **5 Sub-Materi Berstruktur Akordion Tertutup (*Collapsed by Default*)**:
   - Sub-Materi 9.1: Taksonomi Perulangan: Definite vs Indefinite Iteration.
   - Sub-Materi 9.2: Perulangan FOR & Anatomi Fungsi `range(start, stop, step)`.
   - Sub-Materi 9.3: Perulangan WHILE, Nilai Sentinel, dan Penanganan Infinite Loop.
   - Sub-Materi 9.4: Pola Akumulator Data (*Sum, Count, Min/Max Extreme Value*).
   - Sub-Materi 9.5: Pengendali Aliran Loop: `break`, `continue`, dan Fitur Unik Python `loop else:`.
2. **Modul Laboratorium Interaktif Dwibahasa (Python & JavaScript)**:
   - Terintegrasi penuh dengan kartu flip 2D bebas buram (`AnimatedLoopDefinition.tsx`), stepper rentang nilai (`ForLoopStepperLab.tsx`), simulator kasir sentinel & infinite loop breaker (`WhileSentinelLab.tsx`), RAM accumulator (`LoopAccumulatorRamLab.tsx`), dan sirkuit interupsi alur loop (`BreakContinueLab.tsx`).
3. **Asesmen Murni Esai AI Grader**:
   - Bank 5 butir soal esai penalaran bergradasi (`m9-essay-1` s.d. `m9-essay-5`) dengan durasi 300 detik per butir dan rubrik analitik 0–100.
4. **Integrasi Sistem**: Rute `/theory/9` aktif dengan status beranda dan dasbor mahasiswa `ready`.

### 6.28 Audit Forensik Integritas Esai, Penanganan Kasus Gawai Kedua & Laporan Resmi PDF
1. **Audit Populasi Penuh 51 Submission (16 Mahasiswa)**:
   - Evaluasi menyeluruh membuktikan integritas tinggi pada 11 mahasiswa (Chelsea Fransisca, Dendy, Ivan, Naksatra, Rodeon, Dian, Faridz, Ariel, Riski, Irfan M2, Dimas M2).
   - Tindakan tegas: Reset total M1–M3 untuk injeksi bot Hydra (Ilham), reset M2 untuk ChatGPT spurt (Oky), reset M1 untuk plagiasi silang (Alvin, Irfan, Dimas), dan diskualifikasi skor 0 untuk 19x tab switch (El Tajznieam).
2. **Penanganan Kasus Transkripsi Gawai Kedua (*Second Device Transcription*)**:
   - Modus transkripsi langsung dari layar ponsel di samping keyboard tanpa tab switch (`tab_switches = 0`).
   - Sanksi pembinaan proporsional: Skor disesuaikan dan ditetapkan menjadi **70.00 (Grade B / Baik)** untuk **Ahmad Umarul Faruq (M1)** dan **Moh. Alvin Tauviqul Hikam (M2)**.
3. **Standardisasi Dokumen Audit Siap Cetak**:
   - Dokumen resmi: `LAPORAN_AUDIT_INTEGRITAS_ESAI.md` (Nomor: 042/ALPRO-TI/AUDIT-AI/X/2026).
   - Berkas mandiri HTML: `LAPORAN_AUDIT_INTEGRITAS_ESAI.html`.
   - Rute cetak resmi: `/lecturer/audit-report` dengan styling cetak kertas A4, kop surat institusi, dan tanda tangan digital.

### 6.29 Standar Desain, Hierarki Visual & Interaktivitas Modul Praktikum Laboratorium (LKP)
1. **Landasan Filosofis & Pembongkaran 2 Pilar Fundamental**:
   - Dilarang menyajikan pengantar filosofis sebagai teks datar monokrom panjang. Wajib menggunakan kotak pengantar beraksen khusus (`p-4 rounded-xl bg-card border border-border/80 shadow-sm`) dengan *keyword highlighting* otomatis.
   - Dua pilar fundamental tipe data wajib disajikan dalam **2 Kartu Kolom Responsif (`grid-cols-1 md:grid-cols-2`)**: Pilar #1 (*Kapasitas Domain Nilai & Akurasi Presisi Komputasi*) dan Pilar #2 (*Keabsahan Operasi Matematika & Logika*).
2. **Kartu Dasar Teori 3-Level Visual Hierarchy (Bagian B)**:
   - *Tingkat 1*: Banner Intisari Konsep (*Lead Concept Callout*) bergradien Cyan (`border-l-4 border-cyan-500`) dengan badge `✨ INTISARI KONSEP`.
   - *Tingkat 2*: Kartu Rincian Kunci (*Structured Fact Cards*) berindikator *glowing dot*, judul tebal, uraian ringkas, dan badge kode di sisi kanan (`int: 28B | float: 24B`, `PyObject`, `type() & sys.getsizeof()`).
   - *Tingkat 3*: Akordion Naratif Lengkap (`<details>`) untuk membaca teks akademis panjang tanpa memicu *cognitive overload*.
   - *Pembersihan Konsol Teori*: Blok terminal gelap *Parameter & Sintaks Uji* **dihilangkan dari kartu teori** untuk menghapus *horizontal scrollbar*. Eksekusi pengujian dipusatkan ke Prosedur Kerja dan Terminal Helper.
3. **Prosedur Langkah Kerja Berfase (Bagian C)**:
   - Dilarang tag `<ol>` datar monokrom. Dilengkapi **Bilah Pipeline Alur 4 Fase** (`Persiapan` $\rightarrow$ `Eksperimen` $\rightarrow$ `Pencatatan` $\rightarrow$ `Sintesis`).
   - Kartu berfase berbadge nomor tebal `#1`–`#8` dengan warna semantik per fase dan tombol pintas aksi langsung (`[▶ Uji di Simulator]`, `[✓ Ke Tabel Pengamatan]`, `[📝 Ke Bagian Analisis]`).
4. **Standar Cetak Lembar Kerja Resmi A4 / PDF (`print/page.tsx`)**:
   - Landasan filosofis dicetak dalam 2 kotak pilar berdampingan (*side-by-side*).
   - Dasar teori disajikan dalam format daftar butir berpoin rapi (*bulleted list*) dengan tag kode tebal, tanpa blok konsol hitam.

---

*Dokumen ini terakhir diperbarui: 11 Oktober 2026 (Versi 3.0)*  
*Disusun dan disepakati oleh: Hadiq, ST, M.Kom bersama Antigravity AI*

