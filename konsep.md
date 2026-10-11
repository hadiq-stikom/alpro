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