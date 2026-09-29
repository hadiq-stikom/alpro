<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# KESEPAKATAN PEDAGOGIS & STANDAR ATURAN WEB-ALPRO (SINGLE SOURCE OF TRUTH)

Seluruh AI Agent dan developer WAJIB mematuhi spesifikasi di [`PROJECT_SPEC.md`](file:///home/hadiq/Documents/0-workDir/0-TriDharma/kuliah/alpro/web-alpro/PROJECT_SPEC.md), [`PRAKTIKUM_SPEC.md`](file:///home/hadiq/Documents/0-workDir/0-TriDharma/kuliah/alpro/web-alpro/PRAKTIKUM_SPEC.md), dan [`.agents/rules/pedagogy_conventions.md`](file:///home/hadiq/Documents/0-workDir/0-TriDharma/kuliah/alpro/web-alpro/.agents/rules/pedagogy_conventions.md):

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

8. **Standar Penyajian Definisi & Visualisasi Konsep Interaktif**:
   - **Kartu Definisi Berdimensi Ganda (Front & Back/Flip)**:
     - **Sisi Depan (Front)**: Menyajikan intisari konsep fundamental, ikonografi semantik visual, nomor langkah/pilar, dan deskripsi singkat padat yang terarah.
     - **Sisi Belakang (Back/Flip)**: Menyajikan contoh penerapan nyata (*concrete example*), pembedahan sintaks, atau penjelasan akademis mendalam.
   - **Visualisasi Aktif & Interaktif**: Definisi teori tidak boleh berupa teks pasif semata; wajib didukung analogi visual konkret (misal simulator loker memori RAM, verifikator sintaks real-time, atau visualisasi alir otomata algoritma).

9. **Standar Zoom / Fokus Pembahasan (Strict 1.2x Scale)**:
   - **Skala Zoom Mutlak 1.2x**: Seluruh kartu konsep, simbol flowchart, pilar pseudocode, kaidah naratif, dan modul lab yang memiliki interaksi pembesaran WAJIB menggunakan skala standar tepat **1.2x**:
     `hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center`
   - **Prioritas Lapisan Visual (Z-Index)**: Wajib menyertakan `relative z-0 hover:z-50` agar kartu yang sedang diperbesar melayang bebas di atas kartu tetangga tanpa terpotong batas kontainer (*overflow-visible*).
   - **Elevasi Kedalaman Fokus**: Menggunakan bayangan tegas (`hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)]`) untuk menciptakan efek kedalaman visual yang kuat bagi mahasiswa.

10. **Mekanisme Flip Kartu Bebas Buram (*Zero 3D Texture Blur Pattern*)**:
    - **DILARANG MENGGUNAKAN** `perspective: 1000` + `transformStyle: "preserve-3d"` + `backfaceVisibility: "hidden"` secara permanen pada elemen kartu yang memiliki zoom/scale.
      - *Alasan Teknis*: Chromium/WebKit mengisolasi elemen 3D ke dalam buffer tekstur GPU beresolusi tetap 1.0x. Saat kontainer diperbesar 1.2x, browser hanya meregangkan (*bilinear stretch*) tekstur 1x tersebut sehingga teks, garis, dan diagram SVG menjadi buram/kabur (*blurry*).
    - **WAJIB Menggunakan Pola `AnimatePresence` 2D Bersih**:
      - Transisi balik kartu dikelola melalui `<AnimatePresence mode="wait" initial={false}>` dengan animasi `rotateY` saat pertukaran sisi muka dan belakang.
      - Saat kartu dalam keadaan diam (*idle/resting state*), kartu adalah elemen 2D murni (`rotateY: 0`) tanpa konteks 3D, sehingga saat di-hover 1.2x, browser me-rasterisasi teks dan kurva vektor SVG langsung pada resolusi layar penuh secara tajam dan presisi.

11. **Standar Ketajaman Tipografi & Anti-Blur Rendering Global**:
    - **Font Smoothing Grayscale**:
      ```css
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale !important;
      text-rendering: optimizeLegibility !important;
      ```
    - **DILARANG KERAS Menggunakan `subpixel-antialiased` pada Elemen Ber-Zoom/Scale**:
      Subpixel antialiasing mengasumsikan grid fisik sub-piksel RGB monitor 1:1. Ketika di-scale 1.2x, kisi sub-piksel tersebut bergeser dan menimbulkan efek pelangi kabur (*rainbow color fringing*) serta huruf menjadi tebal buram. Grayscale antialiasing menjamin kurva font tetap tajam dan bersih pada sembarang skala pembesaran.
    - **DILARANG Menggunakan `filter: blur(0)` atau `backface-visibility: hidden` Global**:
      Properti tersebut memaksa browser mengunci rasterisasi layer bitmap pada skala 1x, yang menyebabkan efek blur saat kartu membesar.
    - **Ketebalan Tipografi (Font Weight) Padat**:
      Gunakan minimal **`font-semibold`**, **`font-bold`**, atau **`font-black`** pada kartu ber-zoom agar batang karakter terisi penuh piksel fisik layar dan tidak menghasilkan pecahan piksel abu-abu lembut (*gray fringe*).

12. **Standar Kontras Tinggi Elemen Visual & Diagram SVG**:
    - **Belah Ketupat Decision Flowchart**: Wajib berlatar cokelat pekat `#451a03`, border amber `#f59e0b` (`strokeWidth="2.5"`), dan teks kondisi kuning keemasan `#fde68a` (amber-200) `font-black` (`fontWeight="900"`, `fontFamily="monospace"`).
    - **Kotak Proses & SVG di Mode Terang (Light Mode)**: Wajib menggunakan atribut `fill="..."` dan `stroke="..."` eksplisit ber-kontras tinggi (misal: kotak proses benar menggunakan border hijau pekat `#059669`, background lembut `#ecfdf5`, dan teks hijau gelap pekat `#064e3b`). DILARANG menampilkan teks kuning/terang di atas latar terang.
    - **Kotak Proses & SVG di Mode Gelap (Dark Mode)**: Menggunakan latar belakang gelap pekat (`dark:fill-slate-950` / `dark:fill-emerald-950/80`) dengan teks cerah kontras tinggi (`dark:fill-emerald-200`, `dark:fill-rose-200`).
    - **Lingkaran Connector**: Menggunakan warna biru solid `#0284c7` dengan teks putih murni `#ffffff` `font-black`.

