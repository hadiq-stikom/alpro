# 📋 SPESIFIKASI PROYEK: Web Algoritma & Pemrograman
# Dokumen Rujukan Utama — Versi 1.0 (20 Agustus 2026)

> **PENTING**: Dokumen ini adalah sumber kebenaran tunggal (*single source of truth*) untuk seluruh keputusan arsitektur, visi produk, dan status implementasi proyek ini. AI agent atau developer manapun yang bekerja pada proyek ini WAJIB membaca dokumen ini terlebih dahulu sebelum melakukan perubahan apapun.

---

## 1. VISI & TUJUAN PRODUK

Platform pembelajaran interaktif mata kuliah **Algoritma & Pemrograman (TI-101, 3 SKS)** yang dirancang untuk:

1. **Meningkatkan minat belajar mahasiswa** melalui visualisasi dan animasi interaktif yang menarik.
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

| Layer | Teknologi | Versi |
|:---|:---|:---|
| Framework | Next.js (App Router) | 16.3.0 |
| UI | React | 19.2.8 |
| Styling | Tailwind CSS v4 | ^4 |
| Animasi | Framer Motion | ^13.0.0 |
| Ikon | Lucide React | ^1.28.0 |
| Font Utama | **Plus Jakarta Sans** (Google Fonts via `next/font`) | - |
| Font Kode | **JetBrains Mono** (Google Fonts via `next/font`) | - |
| Tema | next-themes (dark/light/system) | ^0.4.6 |
| Code Editor | react-simple-code-editor + PrismJS | - |
| Python Runtime | Pyodide (browser-side) | ^314.0.3 |
| Flowchart | @xyflow/react | ^12.11.2 |
| Backend/Auth/DB | **Supabase** (`@supabase/supabase-js`) | ^2.112.1 |
| Gambar (jika perlu) | Cloudinary | (akun tersedia) |

---

## 3. STATUS IMPLEMENTASI SAAT INI

### 3.1 Halaman yang Sudah Ada

| Route | Deskripsi | Status |
|:---|:---|:---:|
| `/` (page.tsx) | Halaman utama — Hero, 4 Pilar, Roadmap 16 Pertemuan | ✅ Selesai |
| `/theory/[id]` | Halaman materi per pertemuan | ✅ Selesai (1–5) |
| `/workspace` | Studio Praktikum (Code Editor + Flowchart + Pseudocode + RAM) | ✅ Selesai |

### 3.2 Komponen Materi Interaktif (24+ Komponen)

**Pertemuan 1 — Pengenalan Komputer & Pemrograman:**
- `HistoryTimeline.tsx` — Timeline sejarah komputasi
- `InteractiveComputerDefinition.tsx` — Definisi komputer interaktif
- `InteractiveComputerStructure.tsx` — Struktur komputer visual
- `AnimatedComputerOperation.tsx` — Animasi operasi komputer
- `AnimatedFetchCycle.tsx` — Siklus Fetch-Decode-Execute
- `AnimatedLanguageDefinition.tsx` — Definisi bahasa pemrograman
- `AnimatedMachineLanguage.tsx` — Bahasa mesin visual
- `AnimatedAssemblyDefinition.tsx` — Bahasa assembly visual
- `AnimatedHighLevelDefinition.tsx` — Bahasa tingkat tinggi
- `AnimatedTranslatorDefinition.tsx` — Kompiler vs Interpreter
- `AnimatedProgramDefinition.tsx` — Definisi program
- `CodeTranslationVisualizer.tsx` — Visualisasi terjemahan kode

**Pertemuan 2 — Arsitektur Komputer & Sistem Bilangan:**
- `AnimatedArchVsOrg.tsx` — Arsitektur vs Organisasi
- `AnimatedNumberConversion.tsx` — Konversi bilangan animasi
- `InteractiveNumberSystem.tsx` — Sistem bilangan interaktif
- `LogicPuzzleRiver.tsx` — Teka-teki logika sungai
- `LogicPuzzleSwitches.tsx` — Puzzle gerbang logika
- `DataUnitsHierarchyLab.tsx` — Satuan data (Bit hingga Yottabyte)

**Pertemuan 3 — Notasi & Penyajian Algoritma:**
- `AnimatedAlgorithmDefinition.tsx` — Definisi algoritma
- `AnimatedAlgorithmCharacteristics.tsx` — 5 Karakteristik algoritma
- `AnimatedShippingAlgorithm.tsx` — Contoh algoritma pengiriman
- `AnimatedBasicStructures.tsx` — Struktur dasar algoritma (sekuensial, seleksi, iterasi)
- `InteractiveAlgorithmPresentation.tsx` — Presentasi algoritma
- `DetailedDescriptive.tsx` — Algoritma naratif detail
- `DetailedFlowchart.tsx` — Flowchart detail
- `DetailedPseudocode.tsx` — Pseudocode 3 blok baku
- `AlgorithmTriConverterLab.tsx` — Konverter Naratif, Flowchart, Pseudocode (62KB, sangat kompleks)

**Pertemuan 4 — Tipe Data, Variabel & I/O:**
- `DataTypeTaxonomyAndEditor.tsx` — Taksonomi tipe data
- `DataTypeLab.tsx` — Lab eksplorasi tipe data
- `VariableAndIdentifierIntro.tsx` — Pengenalan variabel & identifier
- `IdentifierValidator.tsx` — Validator aturan penamaan identifier
- `ConstantVsVariable.tsx` — Perbedaan konstanta vs variabel
- `MemoryAllocationVisualizer.tsx` — Visualisasi alokasi memori RAM
- `TypeCastingLab.tsx` — Lab konversi tipe data
- `IOBridgeVisualizer.tsx` — Jembatan Input/Output

**Pertemuan 5 — Operator, Ekspresi & Manipulasi Data:**
- `ArithmeticModuloLab.tsx` — Operator aritmatika & modulo
- `OperatorPrecedenceLab.tsx` — Hierarki presedensi (PEMDAS)
- `ExpressionAnatomyLab.tsx` — Anatomi ekspresi
- `RelationalLogicLab.tsx` — Operator relasional & logika Boolean
- `CompoundStringLab.tsx` — Operator compound assignment & string

### 3.3 Infrastruktur yang Sudah Ada

| Komponen | File | Status |
|:---|:---|:---:|
| Toggle Python/JS | `src/context/LanguageContext.tsx` | ✅ |
| Dark/Light/System theme | `src/components/ThemeProvider.tsx` | ✅ |
| Header utama + profil dosen | `src/components/layout/Navbar.tsx` | ✅ |
| Hook Pyodide (Python browser) | `src/hooks/usePython.ts` | ✅ |
| Hook eval JS aman | `src/hooks/useJavaScript.ts` | ✅ |
| Flowchart auto-gen dari kode | `src/components/FlowchartVisualizer.tsx` | ✅ |

### 3.4 Yang BELUM Ada (Perlu Dibangun)

| Komponen | Prioritas |
|:---|:---:|
| Autentikasi (Login/Register) | Fase 1 |
| Koneksi & konfigurasi Supabase | Fase 1 |
| Skema database (tabel users, quiz_submissions, dll) | Fase 1 |
| Komponen Badge/Lencana | Fase 2 |
| Sistem asesmen (kuis + lab scoring) | Fase 3 |
| Dashboard Mahasiswa | Fase 4 |
| Dashboard Dosen | Fase 5 |
| Integrasi lencana di seluruh halaman | Fase 6 |

---

## 4. KEPUTUSAN ARSITEKTUR YANG TELAH DISEPAKATI

### 4.1 Autentikasi

- **Metode**: NIM mahasiswa sebagai username DAN password awal.
- **Alur**: Dosen memasukkan daftar NIM. Mahasiswa login pertama kali dengan NIM/NIM. Mahasiswa diminta ubah password setelah login pertama.
- **Provider**: Supabase Auth (email/password — NIM dijadikan email internal atau field terpisah).
- **Role**: 2 role — `mahasiswa` dan `dosen`.

### 4.2 Sistem Penilaian & Lencana

**Rentang Skor yang Disepakati:**

| Nilai | Rentang | Warna Lencana | Hex Color | Kategori |
|:---:|:---:|:---|:---|:---:|
| A | 90–100 | Emas (Gold) | #F59E0B | Sempurna |
| AB | 80–89 | Biru Safir (Sapphire) | #3B82F6 | Baik |
| B | 70–79 | Hijau Zamrud (Emerald) | #10B981 | Baik |
| BC | 65–69 | Biru Langit (Sky) | #0EA5E9 | Cukup |
| C | 55–64 | Kuning (Amber) | #FBBF24 | Cukup |
| CD | 50–54 | Oranye (Orange) | #F97316 | Kurang |
| D | 40–49 | Merah Bata (Rose) | #F43F5E | Kurang |
| DE | 30–39 | Merah (Red) | #EF4444 | Kurang |
| E | 0–29 | Abu Gelap (Slate) | #64748B | Kurang |

### 4.3 Formula Penilaian Asesmen

**Bobot yang Disepakati: 80% Akurasi + 20% Bonus Waktu**

```
Skor Akhir = (Akurasi × 0.80) + (Bonus Waktu × 0.20)

Dimana:
- Akurasi     = (Jawaban Benar / Total Soal) × 100
- Bonus Waktu = max(0, ((Batas Waktu - Waktu Aktual) / Batas Waktu) × 100)
  → Jika melebihi batas waktu, bonus = 0 (tidak dikurangi, hanya tidak dapat bonus)
```

**Contoh Perhitungan:**
- Kuis 10 soal, batas waktu 10 menit (600 detik)
- Mahasiswa A: 9/10 benar, selesai 4 menit → (90×0.8)+(100×0.6×0.2) = 72+12 = **84 (AB)**
- Mahasiswa B: 10/10 benar, selesai 9 menit → (100×0.8)+(100×0.1×0.2) = 80+2 = **82 (AB)**
- Mahasiswa C: 10/10 benar, selesai 3 menit → (100×0.8)+(100×0.7×0.2) = 80+14 = **94 (A)**

**Sumber skor per pertemuan (kombinasi):**
1. **Kuis pilihan ganda / isian singkat** (dengan timer ketat per soal)
2. **Penyelesaian lab interaktif** (checklist tugas tervalidasi)
3. **Tantangan kode di workspace** (validasi output program)

### 4.4 Strategi Anti-AI pada Asesmen (7 Lapisan)

| # | Strategi | Implementasi Teknis |
|:---:|:---|:---|
| 1 | **Copy/Paste/Cut disabled** | `onCopy`, `onPaste`, `onCut` → `e.preventDefault()` pada seluruh input/textarea asesmen |
| 2 | **Klik kanan disabled** | `onContextMenu` → `e.preventDefault()` pada area asesmen |
| 3 | **Timer ketat per soal** | 30–60 detik per soal, terlalu cepat untuk copy-paste ke AI |
| 4 | **Tab-switch detection** | `visibilitychange` event dicatat jumlahnya, ditampilkan di dashboard dosen |
| 5 | **Soal acak dari bank soal** | Setiap mahasiswa dapat urutan & variasi soal berbeda (seed dari user_id) |
| 6 | **Variasi angka random** | Soal sama tapi angka/variabel berubah tiap mahasiswa |
| 7 | **Soal visual drag & drop** | Susun flowchart, drag variabel ke memori — tidak bisa di-copy ke AI |


### 4.5 Tipografi

- **Font utama**: Plus Jakarta Sans (via `next/font/google`, variable: `--font-sans`)
- **Font kode**: JetBrains Mono (via `next/font/google`, variable: `--font-mono`)
- **Fallback chain**: `"Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, sans-serif`
- **JANGAN mengubah font** — sudah disepakati oleh dosen pengampu.

---

## 5. SKEMA DATABASE (SUPABASE POSTGRESQL)

> **REVISI (20 Agustus 2026):** Skema diperbarui untuk mendukung **multi-kelas** (beberapa rombongan belajar paralel dalam satu semester).

```sql
-- Tabel kelas/rombongan belajar
CREATE TABLE classes (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT        NOT NULL,          -- contoh: "TI-2024-A", "TI-2024-B"
  academic_year TEXT        NOT NULL,          -- contoh: "2024/2025"
  semester      TEXT        NOT NULL DEFAULT 'Ganjil'
                            CHECK (semester IN ('Ganjil', 'Genap')),
  is_active     BOOLEAN     NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabel pengguna
CREATE TABLE users (
  id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  email            TEXT         UNIQUE,
  full_name        TEXT         NOT NULL,
  nim              TEXT         UNIQUE,
  role             TEXT         CHECK (role IN ('mahasiswa', 'dosen')) DEFAULT 'mahasiswa',
  class_id         UUID         REFERENCES classes(id) ON DELETE SET NULL,  -- NULL untuk dosen
  avatar_url       TEXT,
  password_changed BOOLEAN      DEFAULT false,
  created_at       TIMESTAMPTZ  DEFAULT now()
);

-- Tabel submission kuis/tugas
CREATE TABLE quiz_submissions (
  id                 UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            UUID         REFERENCES users(id) ON DELETE CASCADE,
  class_id           UUID         REFERENCES classes(id) ON DELETE SET NULL,  -- denormalized
  meeting_id         INTEGER      NOT NULL CHECK (meeting_id BETWEEN 1 AND 16),
  quiz_type          TEXT         CHECK (quiz_type IN ('quiz', 'lab', 'challenge', 'exam')),
  quiz_key           TEXT         NOT NULL,
  score              NUMERIC(5,2) CHECK (score BETWEEN 0 AND 100),
  max_score          NUMERIC(5,2) DEFAULT 100,
  answers_json       JSONB,
  time_spent_seconds INTEGER,
  tab_switches       INTEGER      DEFAULT 0,
  submitted_at       TIMESTAMPTZ  DEFAULT now(),
  created_at         TIMESTAMPTZ  DEFAULT now()
);

-- View: Rata-rata nilai per pertemuan per mahasiswa (per kelas)
CREATE VIEW meeting_grades AS
SELECT user_id, class_id, meeting_id,
  ROUND(AVG(score), 2) as avg_score,
  CASE WHEN AVG(score) >= 90 THEN 'A' WHEN AVG(score) >= 80 THEN 'AB'
       WHEN AVG(score) >= 70 THEN 'B' WHEN AVG(score) >= 65 THEN 'BC'
       WHEN AVG(score) >= 55 THEN 'C' WHEN AVG(score) >= 50 THEN 'CD'
       WHEN AVG(score) >= 40 THEN 'D' WHEN AVG(score) >= 30 THEN 'DE'
       ELSE 'E' END as grade_letter,
  CASE WHEN AVG(score) >= 90 THEN 'Sempurna' WHEN AVG(score) >= 70 THEN 'Baik'
       WHEN AVG(score) >= 55 THEN 'Cukup' ELSE 'Kurang' END as grade_category
FROM quiz_submissions GROUP BY user_id, class_id, meeting_id;

-- View: Rata-rata keseluruhan per mahasiswa (per kelas)
CREATE VIEW overall_grades AS
SELECT user_id, class_id, ROUND(AVG(avg_score), 2) as total_avg_score,
  CASE WHEN AVG(avg_score) >= 90 THEN 'A' WHEN AVG(avg_score) >= 80 THEN 'AB'
       WHEN AVG(avg_score) >= 70 THEN 'B' WHEN AVG(avg_score) >= 65 THEN 'BC'
       WHEN AVG(avg_score) >= 55 THEN 'C' WHEN AVG(avg_score) >= 50 THEN 'CD'
       WHEN AVG(avg_score) >= 40 THEN 'D' WHEN AVG(avg_score) >= 30 THEN 'DE'
       ELSE 'E' END as overall_grade_letter,
  CASE WHEN AVG(avg_score) >= 90 THEN 'Sempurna' WHEN AVG(avg_score) >= 70 THEN 'Baik'
       WHEN AVG(avg_score) >= 55 THEN 'Cukup' ELSE 'Kurang' END as overall_grade_category
FROM meeting_grades GROUP BY user_id, class_id;

-- View: Rata-rata nilai per kelas (untuk dashboard dosen)
CREATE VIEW class_grades AS
SELECT mg.class_id, c.name as class_name, mg.meeting_id,
  ROUND(AVG(mg.avg_score), 2) as class_avg_score,
  COUNT(DISTINCT mg.user_id) as student_count,
  CASE WHEN AVG(mg.avg_score) >= 90 THEN 'A' WHEN AVG(mg.avg_score) >= 80 THEN 'AB'
       WHEN AVG(mg.avg_score) >= 70 THEN 'B' WHEN AVG(mg.avg_score) >= 65 THEN 'BC'
       WHEN AVG(mg.avg_score) >= 55 THEN 'C' WHEN AVG(mg.avg_score) >= 50 THEN 'CD'
       WHEN AVG(mg.avg_score) >= 40 THEN 'D' WHEN AVG(mg.avg_score) >= 30 THEN 'DE'
       ELSE 'E' END as class_grade_letter
FROM meeting_grades mg JOIN classes c ON c.id = mg.class_id
GROUP BY mg.class_id, c.name, mg.meeting_id;
```

---

## 6. HALAMAN & ROUTING YANG DIRENCANAKAN

```
src/app/
  page.tsx                         <- Home (SUDAH ADA)
  login/page.tsx                   <- Halaman Login              [BARU - Fase 1]
  theory/[id]/page.tsx             <- Materi per pertemuan (SUDAH ADA)
  workspace/page.tsx               <- Studio Praktikum (SUDAH ADA)
  student/                                                       [BARU - Fase 4]
    dashboard/page.tsx             <- Dashboard Mahasiswa
    meeting/[id]/page.tsx          <- Capaian per Pertemuan
  lecturer/                                                      [BARU - Fase 5]
    dashboard/page.tsx             <- Dashboard Dosen
    class/page.tsx                 <- Analitik Kelas
    student/[id]/page.tsx          <- Detail per Mahasiswa
  api/                                                           [BARU - Fase 1]
    ...                            <- Next.js API Routes
```

---

## 7. FASE IMPLEMENTASI

| Fase | Isi | Dependensi |
|:---:|:---|:---|
| **1** | Setup Supabase (koneksi, env vars, tabel, RLS) + Halaman Login (NIM/password) | - |
| **2** | Komponen Badge System (9 warna, 4 kategori) + utilitas penilaian | Fase 1 |
| **3** | Sistem Asesmen untuk Pertemuan 1–5 (kuis, lab scoring, anti-AI) | Fase 1, 2 |
| **4** | Dashboard Mahasiswa (profil, lencana overall, lencana per pertemuan, progress) | Fase 1, 2, 3 |
| **5** | Dashboard Dosen (analitik kelas, distribusi nilai, detail per mahasiswa) | Fase 1, 2, 3 |
| **6** | Integrasi penuh (badge di Navbar, di header materi, leaderboard) | Fase 1–5 |

---

## 8. KONVENSI KODE & DESAIN

### UI/UX
- **Warna primer**: Indigo (#4F46E5 light / #6366F1 dark)
- **Tema**: Semantic tokens via CSS custom properties (--background, --foreground, --card, dll)
- **Animasi**: Framer Motion untuk transisi dan micro-interactions
- **Glassmorphism**: backdrop-blur + transparansi untuk panel-panel utama
- **Responsif**: Mobile-first, breakpoints sm, md, lg

### Kode
- TypeScript strict mode
- Semua komponen adalah Client Components ("use client")
- State management via React Context (bukan Redux/Zustand)
- Verifikasi kompilasi: `npx tsc --noEmit` harus exit code 0
- Semua file Pertemuan: `src/components/theory/PertemuanX.tsx`
- Komponen spesifik chapter: `src/components/theory/chapterX/NamaKomponen.tsx`

### Prinsip Pedagogis
- Validasi/peringatan harus **prominent di atas**, bukan tersembunyi di bawah
- Lab interaktif harus memberikan **umpan balik instan**
- Flowchart harus bisa diedit secara visual (bukan hanya teks)
- Variabel yang belum didefinisikan harus langsung ditandai sebagai error

---

## 9. CATATAN PENTING UNTUK AI AGENT / DEVELOPER BERIKUTNYA

1. **Baca dokumen ini SEBELUM melakukan perubahan apapun.**
2. **`@supabase/supabase-js` sudah terinstal** di `package.json`, tapi belum ada file konfigurasi (`src/lib/supabase.ts`) atau environment variables.
3. **Jangan mengubah font** — Plus Jakarta Sans sudah disepakati sebagai font utama.
4. **Jangan mengubah struktur komponen materi** yang sudah ada (Pertemuan 1–5) kecuali diminta secara eksplisit.
5. **Setiap perubahan harus diverifikasi** dengan `npx tsc --noEmit` (harus exit code 0).
6. **Pesan validasi/error untuk mahasiswa** harus selalu ditampilkan secara prominent (sticky/top), bukan di bagian bawah yang tidak terlihat.

---

*Dokumen ini terakhir diperbarui: 20 Agustus 2026*
*Dibuat oleh: AI Assistant bersama Hadiq, ST, M.Kom*
