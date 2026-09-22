<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# KESEPAKATAN PEDAGOGIS & STANDAR ATURAN WEB-ALPRO (SINGLE SOURCE OF TRUTH)

Seluruh AI Agent dan developer WAJIB mematuhi spesifikasi di [`PROJECT_SPEC.md`](file:///home/hadiq/Documents/0-workDir/0-TriDharma/kuliah/alpro/web-alpro/PROJECT_SPEC.md) dan [`.agents/rules/pedagogy_conventions.md`](file:///home/hadiq/Documents/0-workDir/0-TriDharma/kuliah/alpro/web-alpro/.agents/rules/pedagogy_conventions.md):

1. **Algoritma Naratif**:
   - Blok IF-ELSE wajib dalam **SATU NOMOR URUT** yang sama (misal `2. Jika ... maka:`, di dalamnya `Selain itu:`).
   - `Selain itu:` **DILARANG** diberi nomor baru.
   - Baris terakhir (penutup/terminal `Selesai`) **DILARANG memiliki nomor urut**.

2. **Flowchart ANSI/ISO & Percabangan True/False**:
   - Belah ketupat keputusan wajib berlatar cokelat gelap pekat (`#451a03`) dengan teks kuning keemasan (`text-amber-200`) tebal (*font-black*) untuk kontras tinggi.
   - Menampilkan badge hasil evaluasi dinamis di sisi bawah: `✓ HASIL: TRUE (Ya)` atau `✗ HASIL: FALSE (Tidak)`.
   - **Simbol Jajar Genjang (Input/Output)**: Wajib menggunakan notasi fungsi universal berkurung **`input(variabel)`** dan **`output(pesan/variabel)`** (contoh: `output("Grade E")`). **DILARANG** menggunakan format titik dua (`output: ...`) atau kata kunci bahasa tertentu (`print(...)`).
   - **Jalur Aktif**: Garis tebal cerah ber-glow, **animasi aliran bergerak dinamis** (`animated: true`), label `✓ ...`, dan node ditandai `✓ DIJALANKAN`.
   - **Jalur Dilewati**: Garis redup (*opacity 0.35*, dashed), animasi mati, label `✗ ... (DILEWATI)`, dan node meredup dengan badge `🚫 DILEWATI`.
   - Jalur percabangan menyatu kembali ke lingkaran konektor (*merge node*).
   - **Orientasi Fleksibel (Vertikal & Horisontal)**: Header kartu Flowchart menyediakan toggle orientasi Vertikal (`LayoutList` / Atas-ke-Bawah) dan Horisontal (`LayoutGrid` / Kiri-ke-Kanan).
   - **Port Panah Alir Rapi**: Pada mode Vertikal, port panah keluar/masuk terminator (`MULAI`/`SELESAI`) wajib vertikal. Garis alur dari cabang True/False tidak boleh saling menabrak kotak statemen lawan sebelum menuju *merge node*.

3. **Editor Kode & Bebas Gangguan Kursor (*Zero Caret Metric Interference*)**:
   - Gutter nomor baris vertikal di sisi kiri (`sticky left-0`) dengan indikator `▶ X`.
   - Highlight baris aktif menggunakan background layer terpisah di z-index 0 (`bg-amber-400/20 border-l-4 border-amber-400`).
   - **DILARANG KERAS memodifikasi string balik dari `highlightCode` Prism** (tidak boleh membungkus baris dengan `<span>` atau `<div>`) agar posisi kursor pengetikan tetap presisi 1:1 sub-piksel tanpa pergeseran karakter (*ghost caret offset*).
   - **Wajib Nonaktifkan Soft-Wrapping** (`white-space: pre !important; word-break: normal !important; overflow-wrap: normal !important;`) sehingga 1 baris fisik tepat 1 baris visual setinggi 22px tanpa pergeseran kursor ataupun gutter.
   - **Sinkronisasi Sorotan 'else:'**: Menyorot `Selain itu:` di Naratif atau `else` di Pseudocode wajib menyorot tepat pada baris `else:` di editor kode.

4. **Studio Workspace Multi-Kolom Fleksibel (Mulai Bab 5 ke Atas)**:
   - **Selektor Kotak Cawang (*Checkbox Multi-Selection*)**: Header visualizer menyediakan 3 tombol representasi ber-kotak cawang interaktif (`[✓] 🔷 Flowchart`, `[✓] 📋 Pseudocode`, `[✓] 📝 Naratif`) serta tombol cepat `Semua`. Mahasiswa bebas memilih kombinasi representasi yang ingin ditampilkan bersamaan dengan Editor Kode.
   - **Safety Guard**: Minimal 1 representasi wajib aktif (mencegah layar kosong tanpa representasi algoritma).
   - **Penyesuaian Lebar Komponen Dinamis (*Auto-Adjust Scaling*)**: Ketika kurang dari 4 kolom yang aktif, lebar kolom disesuaikan secara otomatis (`1.85fr` untuk Flowchart pada 3 kolom, `1.45fr` pada 2 kolom) agar visualisasi menjadi lebih luas, fokus, dan mendalam.
   - **Toggle Isolasi/Fokus**: Ikon maximize di setiap header kartu berfungsi sebagai toggle: klik pertama mengisolasi kartu tersebut + Editor Kode, klik berikutnya memulihkan semua kolom.
   - *Cross-highlighting on hover* aktif lintas seluruh panel yang sedang ditampilkan.

5. **State Memory RAM (Live) di Mode Maximize Studio**:
   - Bilah `STATE MEMORY RAM (LIVE)` wajib disematkan tepat di bawah header kartu Kode Program pada mode maximize studio.
   - Menampilkan variabel runtime secara real-time (nama variabel ungu `text-purple-400`, nilai hijau emerald `text-emerald-400`).
   - Tersinkronisasi penuh dengan tombol pintas `RAM Live` di header studio dan mendukung toggle buka/tutup (*collapse/expand*).

6. **Standar Penulisan & Indentasi Pseudocode (CLRS & Bab 3)**:
   - **Format Baku 3 Blok**: `PROGRAM` (PascalCase + komentar `// ...`), `KAMUS:` (`var : tipeData`), `ALGORITMA:` (urutan aksi).
   - **Operator Baku**: `=` (assignment), `==` (equality), `!=` (inequality).
   - **Percabangan Majemuk**: Wajib menggunakan **`else if <kondisi> then`** (dua kata terpisah). **DILARANG KERAS** menggunakan kata kunci Python `elif` di dalam pseudocode.
   - **Instruksi I/O Universal**: Wajib berformat **`input(variabel)`** dan **`output("Pesan", variabel)`**. **DILARANG KERAS** menggunakan format string Python `f"..."`, kurung kurawal `{variabel}`, ataupun perintah bahasa tertentu (`print(...)`).
   - **Struktur Indentasi Lurus Sejajar**: Kata kunci `if <kondisi> then`, `else if <kondisi> then`, `else`, dan `endif` wajib berada pada level kolom indentasi yang sama. Pernyataan di dalam badan cabang menjorok ke dalam (+1 level / 4 spasi / 24px).
   - **Penutup Percabangan**: Wajib ditutup dengan **`endif`** pada level blok yang bersesuaian.

7. **Sistem Gamifikasi & Lencana Capaian (*Badge System*)**:
   - **Skala 9 Tingkat Capaian**: `E`, `DE`, `D`, `CD`, `C`, `BC`, `B`, `AB`, `A` dengan pembeda warna visual spesifik.
   - **4 Klaster Capaian**:
     - `Kurang`: E, DE, D, CD
     - `Cukup`: C, BC
     - `Baik`: B, AB
     - `Sempurna`: A
   - **Distribusi Lencana**:
     - **Halaman Mahasiswa**: Menampilkan rata-rata capaian seluruh materi dan capaian spesifik per pertemuan.
     - **Halaman Dosen**: Menampilkan statistik capaian kelas dan rincian performa per mahasiswa baik secara umum maupun per pertemuan.

