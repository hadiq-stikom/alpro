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
   - Mahasiswa: Akses materi, laboratorium interaktif, kuis/asesmen, dan papan capaian.
   - Dosen: Monitoring kelas, analitik performa mahasiswa, penilaian manual/review essay.
2. **Bank Soal & Asesmen**:
   - Soal Pilihan Ganda & Isian Singkat (`question-bank.ts`).
   - Soal Essay & Studi Kasus Algoritma (`essay-bank.ts`) dengan rubrik penilaian otomatis berbasis kata kunci, logika percabangan, dan konsep algoritma.
3. **Integritas Ujian (*Anti-Cheat*)**:
   - Modul `useAntiCheat.ts` mendeteksi perpindahan tab/jendela (*tab switch*), upaya *copy-paste*, dan aktivitas di luar batas pengerjaan untuk menjaga integritas evaluasi belajar.

---

## 6. Progres Materi Kuliah
- **Bagian 1 (Pertemuan 1 - 4)**: Konsep Komputer & Algoritma, Unit Data & Memori, Pseudocode & Naratif, Tipe Data & Identifier. (Selesai dengan Visualizer & Lab Interaktif).
- **Bagian 2 (Pertemuan 5 - 7+)**:
  - Pertemuan 5: Operator Aritmatika, Relasional, Logika, Modulo, Manipulasi String.
  - Pertemuan 6: Percabangan Tunggal (IF) & Ganda (IF-ELSE).
  - Pertemuan 7: Percabangan Majemuk (IF-ELSE IF-ELSE), Seleksi Diskrit (Switch/Match), dan Percabangan Bersarang (Nested IF).
  - Workspace Studio Multi-Kolom Fleksibel dengan engine Python Pyodide in-browser.