# DOKUMEN KONSENSUS & KONSEP PENGEMBANGAN WEB-ALPRO
**Single Source of Truth untuk Desain, Pedagogi, Gamifikasi, dan Arsitektur Aplikasi**

---

## 1. Tujuan & Filosofi Pengembangan Aplikasi
Aplikasi Web Pembelajaran Algoritma dan Pemrograman (Web-Alpro) dibangun dengan fondasi:
1. **Meningkatkan Minat Belajar**: Menghadirkan visualisasi dan animasi interaktif yang membuat konsep abstrak pemrograman mudah dipahami secara visual dan intuitif.
2. **Mendorong Capaian Terbaik Melalui Gamifikasi**: Mengapresiasi dedikasi dan performa mahasiswa dengan sistem lencana (*badge*), skor, dan umpan balik (*feedback*) belajar seketika.
3. **Standar Pedagogis Baku**: Menjembatani logika alami manusia ke bahasa pemrograman komputer melalui 3 representasi algoritma baku: **Naratif**, **Flowchart**, dan **Pseudocode**, yang tersinkronisasi langsung dengan **Kode Program**.

---

## 2. Sistem Gamifikasi & Lencana Capaian (*Badge System*)
Untuk memotivasi mahasiswa dan memetakan performa belajar:
1. **Skala 9 Tingkat Capaian**:
   Tersedia pembeda warna visual spesifik untuk tingkat:
   `E`, `DE`, `D`, `CD`, `C`, `BC`, `B`, `AB`, `A`
2. **4 Klaster Capaian Akademik**:
   - **Kurang**: `E`, `DE`, `D`, `CD`
   - **Cukup**: `C`, `BC`
   - **Baik**: `B`, `AB`
   - **Sempurna**: `A`
3. **Penyajian Lencana**:
   - **Halaman Mahasiswa**:
     - Lencana agregat (rata-rata capaian dari seluruh bab/pertemuan yang telah dikerjakan).
     - Lencana individual per pertemuan di masing-masing modul materi.
   - **Halaman Dosen**:
     - Rekapitulasi capaian kelas secara agregat.
     - Rincian performa capaian per mahasiswa baik secara umum maupun per pertemuan untuk monitoring dan evaluasi.

---

## 3. Standar Representasi Algoritma (Pedagogy Conventions)

### A. Algoritma Naratif (Deskriptif)
- **Blok Keputusan Atomik**: Seluruh percabangan IF-ELSE wajib berada dalam **satu nomor urut yang sama** (contoh: `2. Jika nilai >= 75 maka: ... Selain itu: ...`).
- **Klausa `Selain itu:`**: **DILARANG** diberi nomor urut baru.
- **Baris Penutup**: Baris terakhir (`Selesai`) dilarang memiliki nomor urut.
- **Kata Kerja Imperatif**: `Masukkan nilai [var]`, `Hitung [var] = [rumus]`, `Tampilkan [var] ke layar`.

### B. Flowchart (Diagram Alir Standar ANSI/ISO)
- **Simbol I/O (Jajar Genjang)**: Wajib menggunakan notasi fungsi universal berkurung **`input(variabel)`** dan **`output(pesan/variabel)`**. DILARANG menggunakan tanda titik dua (`output: ...`) atau kata kunci bahasa tertentu (`print(...)`).
- **Decision Diamond (Belah Ketupat)**:
  - Latar cokelat gelap pekat (`#451a03`), teks kuning keemasan tebal (`text-amber-200 font-black`) untuk kontras tinggi.
  - Dilengkapi badge evaluasi dinamis di sisi bawah: `✓ HASIL: TRUE (Ya)` atau `✗ HASIL: FALSE (Tidak)`.
- **Pembeda Jalur Cabang**:
  - *Jalur Aktif*: Garis tebal cerah ber-glow, animasi aliran dinamis (`animated: true`), label `✓ Ya (TRUE)` / `✓ Tidak (FALSE)`, badge node `✓ DIJALANKAN`.
  - *Jalur Dilewati*: Garis redup dashed (`opacity 0.35`), animasi nonaktif, label `✗ ... (DILEWATI)`, badge node `🚫 DILEWATI`.
  - *Merge Node*: Lingkaran konektor tempat menyatunya kembali alur percabangan.
- **Orientasi Fleksibel (Vertikal & Horisontal)**:
  - Header visualizer menyediakan toggle mode **Vertikal** (Atas-ke-Bawah) dan **Horisontal** (Kiri-ke-Kanan).
  - Pada mode Vertikal, port panah keluar/masuk terminator (`MULAI`/`SELESAI`) mengalir secara vertikal.
  - Alur panah cabang True dan False tidak boleh saling menabrak kotak statemen lawan.

### C. Pseudocode (Standar CLRS & Pertemuan 3)
- **Struktur 3 Blok Wajib**: `PROGRAM <NamaAlgoritma>`, `KAMUS:`, `ALGORITMA:`.
- **Operator Baku**: Penugasan `=`, kesamaan `==`, ketidaksamaan `!=`. DILARANG panah `<-` atau Pascal `<>`.
- **Percabangan Majemuk**: Wajib **`else if <kondisi> then`** (dua kata terpisah). DILARANG kata kunci Python `elif`.
- **Instruksi I/O Universal**:
  - Format baku: **`output("Pesan Teks", variabel)`** dan **`input(variabel)`**.
  - **DILARANG KERAS** menyertakan sintaks spesifik Python seperti f-string `f"..."`, interpolasi kurung kurawal `{variabel}`, atau perintah `print(...)`.
  - Sistem memiliki parser otomatis (`formatOutputArgsForPseudocode`) untuk mengonversi kode bahasa implementasi ke format universal ini.
- **Indentasi Sejajar Baku**:
  - Kata kunci `if <kondisi> then`, `else if <kondisi> then`, `else`, dan `endif` wajib berada pada garis kolom yang sejajar (level indentasi sama).
  - Statemen di dalam cabang menjorok ke dalam (+1 level / 4 spasi / 24px).
  - Wajib ditutup dengan **`endif`**.

---

## 4. Arsitektur Workspace Studio Multi-Kolom
1. **Selektor Kotak Cawang (*Checkbox Multi-Selection*)**:
   - 3 Representasi interaktif: `[✓] 🔷 Flowchart`, `[✓] 📋 Pseudocode`, `[✓] 📝 Naratif` berdampingan dengan Editor Kode.
   - Tombol pintas `Semua` untuk membuka keempat representasi secara simultan.
   - Safety guard: Minimal 1 representasi visualizer aktif.
2. **Auto-Adjust Component Scaling**:
   - 4 Kolom: `[1.05fr _ 1.6fr _ 1.15fr _ 1.35fr]`.
   - 3 Kolom: Flowchart membesar hingga `1.85fr`.
   - 2 Kolom: Flowchart mendapat `1.45fr` (~60%) dan Kode `1fr` (~40%).
3. **Editor Kode Bebas Gangguan Kursor (*Zero Caret Metric Interference*)**:
   - Gutter nomor baris vertikal di sisi kiri (`sticky left-0`) dengan indikator panah `▶ X`.
   - Highlight baris aktif di background layer `z-0` (`bg-amber-400/20 border-l-4 border-amber-400`).
   - Dilarang memodifikasi token output Prism agar kursor 100% presisi tanpa ghost offset.
   - Soft-wrapping dinonaktifkan (`white-space: pre !important`).
4. **Cross-Highlighting on Hover**:
   - Menyorot baris/langkah pada salah satu representasi (Naratif, Flowchart, Pseudocode, atau Kode) secara instan menyorot representasi yang ekuivalen di seluruh panel lain.
   - Menyorot `Selain itu:` / `else` mengalirkan highlight ke jalur cabang False dan baris `else:` di editor kode.
5. **State Memory RAM (Live)**:
   - Panel inspeksi variabel runtime real-time di mode maximize studio yang terintegrasi dengan tombol `RAM Live`.

---

## 5. Asesmen, Autentikasi & Integritas Akademik
1. **Manajemen Akun & Role**:
   - Mahasiswa: Akses materi, laboratorium interaktif, ujian esai adaptif, dan papan capaian.
   - Dosen: Monitoring kelas, analitik performa mahasiswa, fasilitas reset password ke default NIM, review esai.
2. **Asesmen Murni Ujian Esai Berbasis AI Grader (Bebas Pilihan Ganda)**:
   - Platform secara resmi **100% menggunakan Ujian Esai Interaktif** yang diperiksa otomatis oleh Dosen AI dengan rubrik analitik komprehensif.
   - **Kuis Pilihan Ganda DITIADAKAN**: Mencegah budaya tebak-tebakan dan kecurangan dangkal; melatih nalar kritis, kemampuan perancangan algoritma multi-representasi, dan *computational thinking*.
   - Berkas `question-bank.ts` berstatus arsip lama (*legacy sandbox*).
3. **Mekanisme Ujian: Sequential Progressive Mastery Gateway (Gembok Bertingkat)**:
   - Soal esai disajikan satu per satu secara sekuensial (5 soal bertingkat per pertemuan).
   - **Soal berikutnya HANYA AKAN MUNCUL jika soal sebelumnya telah memenuhi syarat nilai kelulusan minimal ($\ge 80$)**.
   - **Rasional Pedagogis & Anti-Cheat**:
     1. *Membangun Grit & Daya Juang*: Melatih mental mahasiswa untuk gigih memperbaiki jawaban berdasarkan umpan balik korektif dari Dosen AI tanpa rasa bosan.
     2. *Anti Bulk-Prompt Dumping*: Mencegah mahasiswa menyalin seluruh soal sekaligus ke AI luar (ChatGPT/Claude), karena soal berikutnya masih terkunci di server.
     3. *Mastery Learning (Belajar Tuntas)*: Menjamin mahasiswa benar-benar menguasai sub-konsep sebelum melangkah ke konsep yang lebih rumit.
4. **Tahapan Alur Asesmen (TheoryAssessment.tsx)**:
   - *Tahap 1 (Intro)*: Penjelasan bobot penilaian dan standar kelulusan.
   - *Tahap 2 (Warmup Chat)*: Obrolan santai pra-ujian bersama figur Dosen ("Bapak") untuk meredakan kecemasan ujian sekaligus membentuk *Baseline Linguistic Profile* (analisis gaya bahasa unik mahasiswa sebagai benteng deteksi AI).
   - *Tahap 3 (Ujian Esai Bertingkat)*: Pengerjaan 5 soal esai berbatas waktu dengan tata letak bersanding 2 kolom bebas *scroll*.
   - *Tahap 4 (Rapor & Evaluasi Instan)*: Nilai terbobot, lencana capaian visual (E s.d. A), dan saran perbaikan spesifik.
5. **Integritas Ujian (*Anti-Cheat*)**:
   - Modul `useAntiCheat.ts` mendeteksi perpindahan tab/jendela (*tab switch*), upaya *copy-paste*, dan aktivitas di luar batas pengerjaan untuk menjaga integritas evaluasi belajar.

---

## 6. Desain Beranda & Navigasi Cepat 16 Pekan (Two-Row Semester Bar)
1. **Prinsip *Above-the-Fold* & Bebas Gulir (*Zero Scroll*)**:
   - Bagian atas halaman beranda (`src/app/page.tsx`) menyajikan akses instan menuju 16 pertemuan kuliah tanpa memaksa pengguna menggulir ke bawah.
   - Menggunakan tata letak matriks **2 Baris Ramping** (*Two-Row Semester Bar*):
     - **Baris 1**: Pertemuan `01` s.d. `08` (Paruh Pertama - Menuju UTS).
     - **Baris 2**: Pertemuan `09` s.d. `16` (Paruh Kedua - Menuju UAS).
2. **Tipografi & Estetika Visual Humanis**:
   - Menggunakan font modern bulat dinamis **Plus Jakarta Sans** (`font-heading font-bold`) dengan format dua digit (`01` s.d. `16`) agar tampil bersih, tegas, dan tidak kaku.
   - Kode visual status:
     - Hijau Zamrud Aktif (`bg-emerald-500 text-white shadow-emerald-500/25`): Pertemuan 01 s.d. 07 (tersedia & siap diakses).
     - Border Biru/Aksen: Pertemuan evaluasi UTS/UAS.
     - Redup/Gembok: Pekan semester lanjutan.
3. **Bilah Pratinjau Interaktif 1 Baris (*Live Single-Line Preview Bar*)**:
   - Area pratinjau ringkas setinggi 36px tepat di bawah tombol pekan.
   - Saat mahasiswa mengarahkan kursor (*hover*) ke salah satu tombol pekan, judul materi dan capaian pembelajaran langsung muncul seketika secara responsif tanpa memakan ruang vertikal berlebih.

---

## 7. Status Materi Kuliah Pertemuan 1 s.d. 7 (FIX & Final)
Seluruh materi, visualizer, laboratorium interaktif dwibahasa (Python & JavaScript), dan asesmen esai untuk **Pertemuan 1 sampai 7 telah selesai 100% dan berstatus FIX**:
- **Pertemuan 1**: Pengantar Algoritma & Pemrograman, 5 Ciri Algoritma Knuth (Flip Card 2D Tajam), Paradigma Pemrograman, Instalasi & Setup Lingkungan.
- **Pertemuan 2**: Representasi Algoritma 1 (Bahasa Naratif & Flowchart ANSI/ISO), Aturan Blok IF-ELSE, Simbol Standar, Validator Aturan Naratif Interaktif.
- **Pertemuan 3**: Representasi Algoritma 2 (Pseudocode Baku CLRS), Struktur 3 Blok (`PROGRAM`, `KAMUS:`, `ALGORITMA:`), Indentasi Sejajar, Tri-Converter Lab Interaktif (Naratif ↔ Flowchart ↔ Pseudocode).
- **Pertemuan 4**: Variabel, Tipe Data Primitif/Komposit, Penamaan Identifier, I/O Universal, Simulator Alokasi Memori RAM & Tipe Data Python vs JS.
- **Pertemuan 5**: Operator Aritmatika, Presedensi PEMDAS, Operator Relasional, Logika Boolean, Modulo & Operasi String, Lab Interaktif Ekspresi & Evaluator Step-by-Step.
- **Pertemuan 6**: Struktur Kontrol Percabangan 1: Pernyataan Tunggal (`IF`) & Ganda (`IF-ELSE`), Sinkronisasi 4 Representasi, Jalur Aktif Kontinu Flowchart, Studio Workspace Multi-Kolom Fleksibel.
- **Pertemuan 7**: Struktur Kontrol Percabangan 2: Percabangan Majemuk (`IF-ELSE IF-ELSE`), Percabangan Bersarang (*Nested IF*), Seleksi Kondisi Terdefinisi (`Switch/Case` & Python `match-case`), RAM Memory Trace Real-Time.

Setiap pertemuan di atas telah dilengkapi dengan:
1. Akordion sub-materi terlipat (*collapsed by default*) dengan indikator capaian baku.
2. Mode gelap/terang adaptif tanpa anomali *black slab*.
3. Obrolan Santai Pra-Ujian (*Warmup Chat*) dengan profil dasar gaya bahasa (*Golden Baseline*).
4. Bank 5 Soal Esai Penalaran Murni (`ESSAY_BANK`) dengan mekanisme *Sequential Progressive Mastery Gateway*.

---

## 8. Kurikulum Semester Paruh Kedua (Pertemuan 8 s.d. 16) — 4 SKS / 200 Menit
Berdasarkan telaah empiris pedagogis dan keselarasan teknologi rekayasa perangkat lunak modern (JSON / API ready), paruh kedua semester dibakukan sebagai berikut:
- **Pertemuan 08**: Evaluasi Tengah Semester (UTS) — Ujian Komprehensif Esai & Coding Studio.
- **Pertemuan 09**: Dasar Perulangan (FOR & WHILE Loop) — Iterasi terhitung (*range*), iterasi terkondisi (*sentinel/flag*), akumulator data, pencegahan *infinite loop*.
- **Pertemuan 10**: Perulangan Bersarang (Nested Loop) — Iterasi multi-dimensi, pemetaan koordinat baris-kolom ($i, j$), pembangkit pola geometris, pengantar kompleksitas $O(n^2)$.
- **Pertemuan 11**: Struktur Data Berurutan (Sequence: List & Tuple) —
  - Porsi Dominan **75% List**: Manipulasi CRUD (*append, insert, pop, remove, update*), *slicing*, algoritma agregasi & *Linear Search*.
  - Porsi Khusus **25% Tuple**: Integritas data (*immutability vault*), koordinat/rekaman paten, dan *tuple unpacking*.
- **Pertemuan 12**: Struktur Data Asosiatif & Himpunan (Dictionary & Set) —
  - Porsi Khusus **25% Set**: Deduplikasi instan (`list(set(data))`), pencarian cepat $O(1)$, operasi diagram Venn.
  - Porsi Dominan **75% Dictionary**: Pasangan *Key-Value*, aturan kunci unik, metode `.get()`, `.items()`.
  - **Puncak Pembelajaran: List of Dictionaries**: Representasi tabel mini-database (rekaman data dunia nyata/JSON ready), penelusuran display dan filtering dengan `if`.
- **Pertemuan 13**: Fungsi Dasar & Top-Down Design —
  - *Aturan Mutlak*: **Belum ada parameter dan belum ada return value**.
  - Filosofi modularitas (DRY), dekomposisi masalah *Top-Down*, alur kontrol pemanggilan *Call-and-Return*, simbol baku ANSI/ISO **Predefined Process** (`| [Nama] |`), Pseudocode `procedure`, sintaks Python `def` dan JS `function`.
- **Pertemuan 14**: Fungsi Lanjutan (Parameter Passing, Scope Memori & Return Value) —
  - Parameter Formal vs Argumen Aktual, ragam akses (*positional, named/keyword, default*), isolasi ruang lingkup (*scope lokal vs global* di RAM), mekanisme `return` vs *void*, **Matriks Keputusan Desain Fungsi 4 Kuadran**, fungsi pemroses *List of Dictionaries*.
- **Pertemuan 15**: Penanganan Galat & Teknik Debugging Sistematis —
  - Taksonomi 3 jenis galat: **Syntax Error** (waktu compile/parse), **Runtime Error / Exception** (`ZeroDivisionError`, `IndexError`, `TypeError`, `ValueError`), dan **Logical Error** (bug semantik).
  - Mekanisme defensif: Blok `try - except - finally` di Python vs `try - catch - finally` di JavaScript.
  - Toolkit debugging: Membaca *Stack Trace*, *Print/Logging Debugging*, *RAM State Tracing*, dan *Rubber Duck Debugging*.
- **Pertemuan 16**: Evaluasi Akhir Semester (UAS) & Proyek Terapan —
  - Ujian komprehensif integrasi seluruh pilar dan perakitan proyek aplikasi terapan mandiri yang modular dan kokoh bebas crash.

---

## 9. Status Materi Pertemuan 9: Dasar Perulangan (FOR & WHILE Loop) — SELESAI 100% & AKTIF
Modul Pertemuan 9 telah selesai dibangun secara utuh dan aktif di platform:
1. **5 Sub-Materi Berstruktur Akordion Tertutup (*Collapsed by Default*)**:
   - Sub-Materi 9.1: Taksonomi Perulangan: Definite vs Indefinite Iteration.
   - Sub-Materi 9.2: Perulangan FOR & Anatomi Fungsi `range(start, stop, step)`.
   - Sub-Materi 9.3: Perulangan WHILE, Nilai Sentinel, dan Penanganan Infinite Loop.
   - Sub-Materi 9.4: Pola Akumulator Data (*Sum, Count, Min/Max Extreme Value*).
   - Sub-Materi 9.5: Pengendali Aliran Loop: `break`, `continue`, dan Fitur Unik Python `loop else:`.
2. **4 Modul Laboratorium Interaktif Dwibahasa (Python & JavaScript)**:
   - `AnimatedLoopDefinition.tsx`: Kartu Definisi Flip 2D bebas buram (analogi pelari orbit & kincir air).
   - `ForLoopStepperLab.tsx`: Stepper dinamis rentang nilai, garis bilangan, dan kalkulator langkah.
   - `WhileSentinelLab.tsx`: Simulator kasir interaktif dengan perangkap nilai sentinel dan penguji *Infinite Loop Breaker*.
   - `LoopAccumulatorRamLab.tsx`: Simulator RAM penempatan akumulator di luar vs dalam loop dan pencari nilai ekstrem.
   - `BreakContinueLab.tsx`: Simulator sirkuit interupsi alur perulangan dan pencarian *Linear Search* dengan `for...else`.
3. **Asesmen Murni Esai AI Grader**:
   - Disematkan 5 butir soal esai penalaran bertingkat (`m9-essay-1` s.d. `m9-essay-5`) dengan batas waktu 300 detik per butir dan rubrik analitik 0–100.
4. **Perutean & Status Akses**:
   - Aktif di `/theory/9` dengan bilah navigasi menempel dan tombol pintas *🏆 Uji Pemahaman*.
   - Status di beranda (`src/app/page.tsx`) dan dasbor mahasiswa (`/student/dashboard`) telah berstatus `ready`.

---

## 10. Audit Forensik Digital Integritas Esai & Penanganan Kasus Gawai Kedua (Second Device)
1. **Hasil Audit Populasi Penuh 51 Submission (16 Mahasiswa)**:
   - *Kasus 1 (Injeksi Bot)*: Ilham Rasit Tamimi (104.5 WPM, kebocoran persona bot *Hydra/Tuan*) $\rightarrow$ **Nilai M1, M2, M3 di-reset total**.
   - *Kasus 2 (ChatGPT Spurt)*: Oky Hadi Prasetya (Lonjakan 1.248 kata, 78.6 WPM di M2) $\rightarrow$ **Nilai M2 di-reset** (M1 tetap sah: 94).
   - *Kasus 3 (Plagiasi Silang)*: Moh. Alvin, Moh. Irfan, Dimas Dwi (Kemiripan kalimat 55%–65% di M1) $\rightarrow$ **Nilai M1 ketiganya di-reset**.
   - *Kasus 4 (Pelanggaran Tab)*: El Tajznieam (19x tab switch) $\rightarrow$ **Nilai M1 ditetapkan 0.00**.
   - *Kelompok Integritas Sah*: Chelsea Fransisca (94 & 88), Dendy (90), Ivan (95), Naksatra (91), Rodeon (85), Dian (87), Faridz (80), Ariel (60), Riski (70) **ditetapkan 100% sah dan valid**.
2. **Penanganan Kasus Transkripsi Gawai Kedua (*Second Device Transcription*)**:
   - Mahasiswa tidak melakukan tab switch pada laptop ujian (`tab_switches = 0`), melainkan mengetikkan ulang hasil prompt AI dari layar ponsel di samping keyboard.
   - Terbukti pada:
     - **Ahmad Umarul Faruq (1126102268) pada M1**: Skor awal 98 disesuaikan dan ditetapkan menjadi **70.00 (Grade B / Kategori: Baik)**.
     - **Moh. Alvin Tauviqul Hikam (1126102264) pada M2**: Mengetik 472 kata teknis dalam 16.1 menit (29.3 WPM) memuat istilah arsitektur lanjut di luar silabus pengantar. Skor awal 98 disesuaikan dan ditetapkan menjadi **70.00 (Grade B / Kategori: Baik)**.
3. **Dokumentasi Resmi Laporan Audit & Fasilitas Cetak PDF**:
   - Dokumen resmi: [`LAPORAN_AUDIT_INTEGRITAS_ESAI.md`](file:///home/hadiq/Documents/0-workDir/0-TriDharma/kuliah/alpro/web-alpro/LAPORAN_AUDIT_INTEGRITAS_ESAI.md) (Nomor: `042/ALPRO-TI/AUDIT-AI/X/2026`).
   - Berkas mandiri siap cetak: [`LAPORAN_AUDIT_INTEGRITAS_ESAI.html`](file:///home/hadiq/Documents/0-workDir/0-TriDharma/kuliah/alpro/web-alpro/LAPORAN_AUDIT_INTEGRITAS_ESAI.html).
   - Antarmuka siap cetak web: `/lecturer/audit-report` dengan styling standar kertas A4, kop surat resmi, dan sematan tanda tangan digital resmi dosen pengampu.

---

## 11. Standar Desain, Hierarki Visual & Pedagogi Modul Praktikum Laboratorium Sains Komputasi (LKP)

Praktikum Algoritma & Pemrograman menganut standar visual, tipografi, dan interaktivitas baku agar mahasiswa dapat membedah konsep empiris dengan mudah, cepat dipindai (*scannable*), dan bebas dari *cognitive overload*:

### 11.1 Landasan Filosofis & 2 Pilar Fundamental Tipe Data
1. **Larangan Paragraf Datar Monokrom (*Anti-Wall of Text*)**:
   - Landasan filosofis tidak boleh disajikan sebagai paragraf panjang tanpa pemisah visual.
   - Paragraf pengantar filosofis disajikan dalam kotak pengantar beraksen khusus (`p-4 rounded-xl bg-card border border-border/80 shadow-sm`) dengan *keyword highlighting* otomatis.
2. **Pembongkaran 2 Pilar Fundamental (Dilarang Menyajikan Mendatar)**:
   - Kalimat mendatar `(1) kapasitas domain nilai ... serta (2) keabsahan operasi ...` **DIBONGKAR TOTAL** menjadi **2 Kartu Kolom Responsif (`grid-cols-1 md:grid-cols-2`)**:
     - **Pilar #1 (Aksen Cyan)**: *Kapasitas Domain Nilai & Akurasi Presisi Komputasi* (Tag: `Domain & Presisi RAM`).
     - **Pilar #2 (Aksen Indigo)**: *Keabsahan Operasi Matematika & Logika* (Tag: `Type Safety & Operasi`).

### 11.2 Standar Tiga Tingkat Hierarki Kartu Dasar Teori (Bagian B)
Setiap kartu pilar teori wajib memiliki tingkatan penyajian:
1. **💡 Banner Intisari Konsep (*Lead Concept Callout*)**:
   - Kotak bergradien Cyan (`border-l-4 border-cyan-500`) di bagian atas yang merangkum inti hukum komputasi dalam 1 kalimat padat bertekanan kata kunci.
2. **🗂️ Parameter & Rincian Kunci (*Structured Fact Cards*)**:
   - Daftar butir kartu berindikator titik bercahaya (*glowing dot indicator*), judul tebal, uraian ringkas ber-chip kode, dan badge metrik di sisi kanan (contoh: `int: 28B | float: 24B`, `PyObject`, `type() & sys.getsizeof()`).
3. **📂 Akordion Naratif Lengkap (*Collapsible Details*)**:
   - Uraian akademis teoritis lengkap disimpan di dalam elemen lipat `<details>` berlabel *"Lihat Uraian Teori Naratif Lengkap"* agar layar tetap ringkas dan bebas sesak.
4. **💡 Catatan Analisis Laboratorium (*Lab Insight*)**:
   - Kotak amber dengan ikon `Lightbulb` yang mengarahkan fokus investigasi ilmiah saat mahasiswa menyusun analisis di Bagian D.
5. **Pemisahan Peran Tegas (Teori Murni vs Eksekusi Praktik)**:
   - **Blok konsol gelap *Parameter & Sintaks Uji* DIHILANGKAN DARI KARTU TEORI**: Menghilangkan bilah *horizontal scrollbar* yang tidak rapi. Kartu teori difokuskan murni pada pemahaman konseptual. Eksekusi pengujian sepenuhnya dipusatkan pada Prosedur Kerja dan Terminal Helper.
6. **Mesin Penekanan Tipografi Otomatis (`renderHighlightedText`)**:
   - Metrik kapasitas (`28 byte`, `24 byte`, `52-bit`, `64-bit`) $\rightarrow$ Chip Amber kontras tinggi.
   - Fungsi & identifier (`type()`, `sys.getsizeof()`, `PyObject`, `IEEE 754`, `ZeroDivisionError`, `10 // 4`, `0.1 + 0.2`) $\rightarrow$ Chip konsol Cyan.
   - Nilai Boolean (`True`, `False`) $\rightarrow$ Badge Hijau Emerald.
   - Konsep inti (`pointer ke alamat memori fisik RAM`, `integer truncation`, `String Concatenation`, `Explicit Type Casting`, `hardware trap`) $\rightarrow$ Teks tebal bergaris bawah aksen cyan.

### 11.3 Standar Prosedur Langkah Kerja Praktikum (Bagian C: Prosedur Kerja)
1. **Larangan List Datar Monokrom (`<ol>`)**:
   - Prosedur kerja tidak boleh disajikan sebagai daftar bernomor statis biasa.
2. **Bilah Pipeline Alur 4 Fase (*Phase Workflow Pipeline*)**:
   - Menyajikan tahapan eksperimen secara visual di header:  
     `1. Persiapan` $\rightarrow$ `2. 5 Kasus Uji` $\rightarrow$ `3. Catat Tabel C` $\rightarrow$ `4. Sintesis D & E`.
3. **Kartu Langkah Kerja Berfase (*Phase Workflow Cards*)**:
   - Nomor langkah berformat badge kotak tebal `#1` s.d. `#8` dengan pewarnaan semantik per fase (Sky untuk Persiapan, Cyan untuk Eksperimen, Amber untuk Pencatatan, Purple untuk Sintesis).
   - Memuat tag fase, tag referensi skenario uji (`Skenario #1 & #2`, `Skenario #3 & #4`, dst.), judul langkah tebal, dan instruksi ber-highlight kata kunci.
4. **Tombol Pintas Aksi Langsung (*Interactive Action Shortcuts*)**:
   - Tombol **`▶ Uji di Simulator`** pada langkah uji coba: otomatis memuat sintaks uji ke input simulator dan melakukan *smooth scroll* ke helper terminal.
   - Tombol **`✓ Ke Tabel Pengamatan`** pada langkah pencatatan: meluncurkan layar langsung ke `#tabel-pengamatan-container`.
   - Tombol **`📝 Ke Bagian Analisis`** pada langkah perumusan: meluncurkan layar langsung ke `#bagian-analisis-container`.

### 11.4 Integrated Lab Workbench & Live Execution Engine (Bagian C: Workbench Empiris)
1. **Penyatuan Workbench IDE Langsung di Dokumen LKP**:
   - Menggantikan helper 1-baris statis dengan **Integrated Lab Workbench** 2-kolom (Editor di kiri, Terminal di kanan).
2. **Dual-Engine Eksekusi Asli**:
   - Menjalankan interpreter **Python murni via Pyodide (WASM v0.25)** di sisi client (browser) tanpa backend, serta JavaScript native.
3. **Editor Kode Berstandar IDE**:
   - Menggunakan `react-simple-code-editor` + Prism syntax highlighting dengan gutter nomor baris 1:1, nonaktif soft-wrapping (`white-space: pre !important;`), dan pintasan eksekusi `Ctrl + Enter`.
4. **Terminal Output & Pengukuran Empiris**:
   - Konsol hitam bergaya IDE modern (`#0d1117`), menampilkan luaran stdout/stderr asli dan exception traceback, dilengkapi pengukur waktu eksekusi (`performance.now()` dalam ms) dan **RAM State Inspector** (menampilkan variabel aktif di memori beserta tipe data dan ukurannya).
5. **Konektivitas Cerdas ke Tabel Pengamatan**:
   - Tombol **`[📋 Salin ke Tabel #X]`** memindahkan hasil aktual mesin dan metrik terukur ke baris tabel pengamatan terpilih dalam 1 kali klik.
   - Di setiap baris tabel, tombol **`[▶ Uji di Workbench]`** memungkinkan mahasiswa mengirim masukan baris tersebut ke workbench untuk pengujian ulang.
6. **Proteksi Dokumen Cetak (`print:hidden`)**:
   - Workbench disembunyikan otomatis pada saat cetak/ekspor PDF A4 sehingga hasil cetak tetap berupa dokumen akademik formal yang bersih.

### 11.5 Sinkronisasi Lembar Kerja Cetak Resmi A4 / PDF (`print/page.tsx`)
1. **Landasan Filosofis**: Dicetak rapi dalam 2 kotak pilar mini berdampingan (*side-by-side*).
2. **Dasar Teori**: Dicetak dalam format daftar butir berpoin (*bulleted list*) dengan tag kode tebal.
3. **Pembersihan Konsol Uji**: Menghilangkan baris sintaks konsol hitam dari dokumen cetak teori agar format fisik bersih dan memenuhi standar dokumen resmi akademik.