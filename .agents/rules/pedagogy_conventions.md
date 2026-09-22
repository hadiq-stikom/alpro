# KESEPAKATAN PEDAGOGIS & STANDAR PENULISAN ALGORITMA (WEB-ALPRO)
# Sumber Rujukan: Materi Perkuliahan Pertemuan 3 & Standar CLRS

Dokumen aturan ini WAJIB dipatuhi oleh seluruh AI Agent dan pengembang yang bekerja pada proyek Web Algoritma & Pemrograman:

---

## 1. Tiga Teknik Baku Penyajian Algoritma (Materi Pertemuan 3)

### A. Algoritma Naratif (Deskriptif) — Model 1: Format Blok Sejajar
1. **Nomor Urut Wajib & Langkah Tunggal (*Atomic Decision Block*)**:
   - Setiap langkah diawali dengan nomor urut (`1.`, `2.`, `3.`) yang berurutan dan lurus sejajar di kolom paling kiri (kolom 0).
   - Seluruh blok percabangan IF-ELSE (kondisi, cabang `Jika`, dan cabang `Selain itu`) **wajib berada di dalam SATU NOMOR URUT YANG SAMA**.
   - **Klausa `Selain itu:` DILARANG diberi nomor baru** karena merupakan jalur alternatif eksklusif (*mutually exclusive*), bukan langkah sekuensial berikutnya.
2. **Format Baku Percabangan Naratif**:
   ```text
   1. Masukkan nilai ujian.
   2. Jika nilai >= 75 maka:
         Tampilkan "Selamat, Anda LULUS!" ke layar.
      Selain itu:
         Tampilkan "Maaf, Anda TIDAK LULUS." ke layar.
   3. Selesai.
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

### B. Flowchart (Diagram Alir Standar ANSI/ISO)
1. **Terminator (Kapsul/Oval)**: Menandai awal (`START` / `MULAI`) dan akhir (`STOP` / `SELESAI`) algoritma.
2. **Input/Output (Jajar Genjang)**: Operasi masukan data (`input(var)`) dan tampilan keluaran (`output(...)` / `output(var)`). DILARANG menggunakan format titik dua (`output: ...`) atau perintah bahasa tertentu (`print(...)`) agar netral dan selaras dengan pseudocode.
3. **Process (Persegi Panjang)**: Operasi kalkulasi, pengolahan data, atau penugasan variabel (`luas = panjang * lebar`).
4. **Decision (Belah Ketupat / Diamond)**: Titik percabangan logika kondisi. **WAJIB memiliki tepat dua panah keluar** berlabel tegas:
   - Cabang Benar: `Ya` (atau `True`)
   - Cabang Salah: `Tidak` (atau `False`)
5. **Flowline (Garis Alir Berpanah)**: Menunjukkan arah aliran logis (umumnya dari atas ke bawah).
6. **Orientasi Fleksibel (Vertikal & Horisontal)**:
   - Menyediakan opsi tata letak Vertikal (Atas-ke-Bawah) dan Horisontal (Kiri-ke-Kanan).
   - Pada mode Vertikal, port panah keluar/masuk terminator (`MULAI`/`SELESAI`) wajib vertikal.
7. **Pemisahan Jalur Cabang**: Garis alur dari cabang True dan False dilarang menabrak kotak statemen lawan, wajib mengalir rapi sebelum menyatu ke *merge node*.

### C. Pseudocode (Kode Semu Standar CLRS & Bab 3)
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
   - **DILARANG KERAS** menggunakan fitur spesifik bahasa seperti format string Python (`f"..."`), interpolasi kurung kurawal `{variabel}`, atau perintah bawaan bahasa (`print(...)`). Pseudocode wajib universal dan netral (*language-agnostic*).
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
10. **Perataan Indentasi Sejajar**:
    - Kata kunci `if <kondisi> then`, `else if <kondisi> then`, `else`, dan `endif` wajib berada pada level kolom indentasi yang sama.
    - Setiap instruksi di dalam tubuh percabangan menjorok ke dalam (+1 level / 4 spasi).

---

## 2. Standar Tabulasi & Indentasi Monospace (Perataan Kolom)
1. **Algoritma Naratif**:
   - Nomor urut `1.`, `2.`, `3.` wajib lurus sejajar pada kolom margin kiri yang sama (kolom 0).
   - Aksi cabang berindentasi rapi (`pl-5`) tanpa box wrapper.
2. **Pseudocode & Kode Program**:
   - Blok `PROGRAM`, `KAMUS:`, `ALGORITMA:` berada di kolom 0.
   - Instruksi di dalam `ALGORITMA:` (`input`, `if ... then`, `else`, `endif`) menjorok tepat **2 spasi**.
   - Badan di dalam percabangan menjorok tepat **4 spasi**.
   - Kode Python/JS di baris terluar (`var = ...`, `if ...:`) wajib mulai di kolom 0.
   - **DILARANG** membungkus baris keputusan dengan elemen pembungkus CSS (`<div>`/`<span>` dengan `border-l-2`, `pl-2`, atau `bg-amber`) di dalam `<pre>` yang menggeser tabulasi horizontal.
   - Pembeda visual pada kode yang sedang dibahas **MURNI menggunakan pewarnaan teks sintaks (*inline syntax highlighting*)**, bukan kotak pembungkus.

---

## 3. Aturan Tipografi Kode: Penonaktifan Font Ligatures
- **Font Ligatures WAJIB dinonaktifkan secara global** pada seluruh elemen `code`, `pre`, `.font-mono` melalui CSS:
  ```css
  code, pre, kbd, samp, .font-mono, [class*="font-mono"] {
    font-variant-ligatures: none !important;
    font-feature-settings: "liga" 0, "calt" 0, "dlig" 0 !important;
  }
  ```
- **Tujuan**: Memastikan operator pemrograman seperti `==`, `!=`, `>=`, `<=` tampil sebagai karakter ASCII terpisah yang nyata (sesuai tombol yang diketik mahasiswa pada keyboard), bukan disatukan menjadi simbol tipografi matematika `═`, `≠`, `≥`, `≤`.

---

---

## 5. Penyajian Multi-Kolom & Kotak Cawang Fleksibel di Studio Workspace (Bab 5 ke Atas)
Mulai materi Bab 5 (Operator & Manipulasi Data) dan Bab 6 (Percabangan) ke atas, halaman Workspace menyediakan mode tampilan **Multi-Kolom Fleksibel dengan Kotak Cawang (Checkbox)**:
1. **Selektor Kotak Cawang Interaktif**:
   - `[✓] 🔷 Flowchart`
   - `[✓] 📋 Pseudocode`
   - `[✓] 📝 Naratif`
   - Tombol cepat `Semua` untuk membuka seluruh 4 kolom sekaligus.
   - Mahasiswa dapat mencentang 1, 2, atau 3 representasi sekaligus berdampingan dengan Editor Kode Program.
   - *Safety Guard*: Minimal harus ada 1 representasi yang aktif.
2. **Penyesuaian Lebar Komponen Dinamis (*Auto-Adjust Component Width*)**:
   - Ketika kurang dari 4 kolom yang aktif, lebar kolom disesuaikan secara otomatis:
     - **4 Kolom**: `[1.05fr _ 1.6fr _ 1.15fr _ 1.35fr]` (Naratif, Flowchart, Pseudocode, Kode).
     - **3 Kolom**: Flowchart membesar hingga `1.85fr`, komponen pendamping `1.1fr–1.2fr`, dan Kode `1.4fr`.
     - **2 Kolom**: Flowchart mendapat ruang sangat luas `1.45fr` (~60%) dan Kode `1fr` (~40%) untuk analisis logika yang mendalam dan detil.
3. **Tombol Isolasi/Fokus**:
   - Ikon maximize pada masing-masing kartu berfungsi sebagai toggle: klik pertama mengisolasi kartu tersebut bersama Kode Program, klik berikutnya memulihkan kembali seluruh kolom.
4. **State Memory RAM (Live) di Mode Maximize Studio**:
   - Disematkan tepat di bawah header kartu Kode Program pada mode maximize studio.
   - Menampilkan variabel memori runtime aktif secara real-time dengan status buka/tutup (*collapsible*) tersinkronisasi langsung dengan tombol `RAM Live` di header studio.

---

## 6. Sinkronisasi Interaktif Lintas 4 Panel (Cross-Highlighting on Hover)
Interaktivitas pedagogis utama yang menghubungkan pemahaman mahasiswa:
- Mengarahkan kursor (*hover*) pada salah satu representasi (Naratif, Pseudocode, Flowchart, atau baris Kode) secara simultan mengaktifkan highlight yang setara di seluruh panel aktif.
- **Efek pada Flowchart**:
  - Node bersangkutan mendapat bingkai emas menyala: `!border-4 !border-amber-400`, skala 1.1x, dan badge mengambang `📍 AKTIF`.
  - Ketika menyorot `Selain itu:` di Naratif atau `else` di Pseudocode, Flowchart mengalirkan kilau emas bercahaya pada jalur cabang False/Tidak dengan label `⚡ Selain itu (ELSE)`.
- **Efek pada Naratif & Pseudocode**:
  - Langkah/baris bersangkutan mendapat bingkai kiri amber dan latar lembut `bg-amber-400/10 border-amber-400`.
- **Efek pada Editor Kode (ATURAN MUTLAK KURSOR & TATA LETAK)**:
  - **Gutter Nomor Baris**: Angka nomor baris di sebelah kiri (`sticky left-0`) berubah menjadi penanda panah emas `▶ X` (`text-amber-400 font-bold`).
  - **Background Highlight Layer**: Layer terpisah di latar belakang (`z-0`) menyorot baris aktif (`bg-amber-400/20 border-l-4 border-amber-400`) dengan badge `⚡ AKTIF`.
  - **Sorotan Baris `else:`**: Menyorot `Selain itu:` di Naratif atau `else` di Pseudocode menyorot baris `else:` secara presisi pada editor kode.
  - **Wajib Nonaktifkan Soft-Wrapping**:
    ```css
    .code-editor-root textarea,
    .code-editor-root pre {
      white-space: pre !important;
      word-break: normal !important;
      overflow-wrap: normal !important;
    }
    ```
    Menjamin 1 baris fisik tepat 1 baris visual setinggi 22px tanpa pergeseran kursor (*caret*) maupun nomor baris saat baris kode melebar.
  - **DILARANG KERAS memodifikasi string keluaran dari Prism `highlightCode`**:
    - Tidak boleh menyisipkan `<span>` pembungkus baris, `<div>`, margin/padding tambahan, atau `font-bold` di dalam tokenizer Prism.
    - Metrik teks `<textarea>` (lapisan pengetikan kursor) dan `<pre>` (lapisan visual pewarnaan sintaks) WAJIB identik 100% sub-piksel agar kursor pengetikan (*caret*) tidak mengalami pergeseran (*ghost offset*).

---

## 7. Standar Visual Interaktif Flowchart & Logika Percabangan (True vs False)
Untuk memastikan diagram alir tidak sekadar statis, tetapi hidup dan merefleksikan jalannya eksekusi program:
1. **Evaluasi Kondisi Real-Time**:
   - Nilai variabel awal dari kode diekstrak otomatis dan digabung dengan variabel runtime (`extractVariablesFromCode`).
   - Ekspresi kondisi pada belah ketupat dievaluasi secara dinamis (`evaluateCondition`).
2. **Simbol Belah Ketupat (*Decision Diamond*)**:
   - Memiliki kontras tinggi: background cokelat gelap pekat `#451a03` dengan teks kuning keemasan `text-amber-200` tebal/font-black.
   - Dilengkapi badge hasil evaluasi di sisi bawah:
     - `✓ HASIL: TRUE (Ya)` (hijau emerald bercahaya) jika kondisi True.
     - `✗ HASIL: FALSE (Tidak)` (merah mawar bercahaya) jika kondisi False.
   - Border SVG belah ketupat memancarkan aksen hijau (True) atau merah (False).
3. **Pembeda Visual Jalur True vs False**:
   - **Jalur Aktif (*Taken/Executed Branch*)**:
     - Garis tebal (`strokeWidth: 3.5`), warna cerah (#10b981 untuk True / #f43f5e untuk False), efek *glow/drop-shadow*.
     - **Animasi aliran data bergerak dinamis** (`animated: true`).
     - Label tegas berlatar solid: `✓ Ya (TRUE)` atau `✓ Tidak (FALSE)`.
     - Node di dalam cabang diberi badge `✓ DIJALANKAN` dengan border hijau berpijar.
   - **Jalur Dilewati (*Bypassed/Skipped Branch*)**:
     - Garis redup (*dimmed*, `opacity: 0.35`, `strokeWidth: 1.5`, dashed `strokeDasharray: '5,5'`).
     - Animasi dinonaktifkan (`animated: false`).
     - Label cabang gelap: `✗ Ya (DILEWATI)` atau `✗ Tidak (DILEWATI)` / `✗ Tidak (LEWATI)`.
     - Node di dalam cabang yang dilewati otomatis meredup (`opacity-40 grayscale-[60%]`) dan berlabel `🚫 DILEWATI`.
4. **Titik Temu (*Merge Node*)**:
   - Menggunakan lingkaran konektor standar ANSI/ISO (`mergeNode`) agar alur percabangan yang selesai menyatu rapi sebelum melanjutkan ke instruksi berikutnya.
   - Berlaku untuk **IF Tunggal** (garis bypass langsung ke merge) maupun **IF-ELSE Ganda** (dua cabang sub-graph yang menyatu kembali).

---

## 8. Prinsip Desain UI/UX & Kontras
1. **Elegan, Modern, dan Tidak Menor**: Menghindari lencana (*badge*) berlebihan atau kotak mencolok di tengah-tengah baris kode yang dapat merusak pemahaman mahasiswa.
2. **Kontras Tinggi & Ramah Pemula**: Seluruh elemen teks harus memiliki rasio kontras tinggi yang nyaman dibaca baik pada mode gelap (*Dark Mode*) maupun terang (*Light Mode*).
3. **Layout Penuh & Tidak Tertekan**: Navigasi tab modul menggunakan grid responsif (`grid-cols-2 lg:grid-cols-4`) agar judul modul dan tombol navigasi tidak tertekan (*squished*) atau memunculkan *scroll-bar* horizontal.

---

## 9. Sistem Gamifikasi & Lencana Capaian (Badge System)
1. **Skala 9 Tingkat Capaian**:
   - `E`, `DE`, `D`, `CD`, `C`, `BC`, `B`, `AB`, `A` dengan pembeda warna visual spesifik untuk setiap tingkat capaian.
2. **4 Klaster Capaian Akademik**:
   - **Kurang**: `E`, `DE`, `D`, `CD`
   - **Cukup**: `C`, `BC`
   - **Baik**: `B`, `AB`
   - **Sempurna**: `A`
3. **Integrasi Halaman**:
   - **Halaman Mahasiswa**: Menampilkan lencana rata-rata capaian seluruh materi dan lencana capaian spesifik per pertemuan.
   - **Halaman Dosen**: Menampilkan rekap agregat capaian kelas dan rincian performa per mahasiswa baik secara umum maupun per pertemuan.

