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

## 8. Prinsip Desain UI/UX, Ketajaman Visual, Zoom & Flip Interaktif

### A. Cara Penyajian Definisi & Visualisasi Konsep Interaktif
1. **Konsep Berdimensi Ganda (*Two-Sided Pedagogical Concept Cards*)**:
   - **Sisi Muka (*Front Face*)**: Menampilkan intisari konsep esensial, ikon visual tematik, nomor urut/pilar, dan uraian padat yang langsung menjawab *"apa itu konsep ini?"*.
   - **Sisi Balik (*Back/Flip Face*)**: Menampilkan contoh penerapan konkret (*real-world implementation*), pembedahan kode/sintaks, atau elaborasi akademis mendalam yang menjawab *"bagaimana cara menggunakannya?"*.
2. **Visualisasi Konsep yang Hidup (*Active Visual Metaphors*)**:
   - Definisi konsep tidak boleh disajikan secara tekstual semata (*text-only dry explanation*).
   - Wajib disertai visualisasi konkret yang dapat diinteraksikan:
     - **Bab 4 (Variabel & Tipe Data)**: Simulator loker/wadah memori RAM, verifikator nama identifier real-time, dan taksonomi tipe data interaktif.
     - **Bab 5 (Operator & Ekspresi)**: Pembedahan anatomi ekspresi, kalkulator modulo jam dinding (*clock arithmetic*), gerbang logika relasional hidup, dan pembanding string *f-string vs template literal*.
     - **Bab 6 & 7 (Percabangan)**: Simulator evaluasi logika kondisi real-time, visualisasi alir branching dengan cabang aktif vs dilewati (*true/false pathing*).

---

### B. Standar Mutlak Zoom / Fokus Pembahasan (Strict 1.2x Scale)
1. **Faktor Skala Terstandar**:
   - Seluruh kartu konsep, simbol unsur flowchart, pilar pseudocode, kaidah naratif, dan modul lab interaktif WAJIB menggunakan skala zoom seragam tepat **1.2x**:
     ```css
     hover:scale-[1.2] hover:-translate-y-2 transition-transform duration-300 ease-out origin-center
     ```
   - Skala ini dipilih secara ergonomis agar seluruh teks dan detail diagram membesar secara proporsional dan nyaman dibaca tanpa terdistorsi.
2. **Prioritas Lapisan Visual (*Z-Index Stacking*)**:
   - Wajib menyertakan kelas `relative z-0 hover:z-50` agar elemen yang diperbesar selalu melayang bebas di atas kartu-kartu tetangga tanpa terpotong (*no clipping / overflow-visible*).
3. **Elevasi Kedalaman Fokus**:
   - Wajib didukung bayangan fokus yang kuat (`hover:shadow-2xl dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)]`) untuk memberikan efek elevasi 3 dimensi yang memusatkan perhatian mahasiswa ke kartu yang sedang dipelajari.

---

### C. Arsitektur Balik Kartu Bebas Buram (*Zero 3D Texture Blur Pattern*)
1. **Penyebab Utama Keburaman pada CSS Transform Scale**:
   - Ketika elemen HTML menggunakan CSS 3D (`perspective: 1000`, `transformStyle: "preserve-3d"`, atau `backfaceVisibility: "hidden"`), browser WebKit/Blink (Chromium di Linux/Windows/Mac) mengisolasi elemen tersebut ke dalam tekstur GPU *off-screen* beresolusi tetap 1.0x.
   - Jika kontainer tersebut kemudian di-zoom 1.2x saat di-hover, browser sekadar meregangkan (*bilinear stretch*) tekstur 1x yang sudah di-rasterisasi tersebut. Hasilnya: seluruh teks, border, dan kurva SVG menjadi **buram dan kabur**.
2. **Pola Wajib: `AnimatePresence` 2D Bersih**:
   - **DILARANG MENGGUNAKAN** `preserve-3d` permanen pada kartu yang memiliki hover zoom.
   - **Wajib menggunakan `<AnimatePresence mode="wait" initial={false}>`**:
     ```tsx
     <AnimatePresence mode="wait" initial={false}>
       {!isFlipped ? (
         <motion.div
           key="front"
           initial={{ rotateY: -90, opacity: 0 }}
           animate={{ rotateY: 0, opacity: 1 }}
           exit={{ rotateY: 90, opacity: 0 }}
           transition={{ duration: 0.18, ease: "easeInOut" }}
           className="w-full h-full p-5 rounded-2xl border-2 bg-card dark:bg-slate-950 ..."
         >
           {/* Konten Sisi Depan */}
         </motion.div>
       ) : (
         <motion.div
           key="back"
           initial={{ rotateY: 90, opacity: 0 }}
           animate={{ rotateY: 0, opacity: 1 }}
           exit={{ rotateY: -90, opacity: 0 }}
           transition={{ duration: 0.18, ease: "easeInOut" }}
           className="w-full h-full p-5 rounded-2xl border-2 bg-card dark:bg-slate-950 ..."
         >
           {/* Konten Sisi Belakang */}
         </motion.div>
       )}
     </AnimatePresence>
     ```
   - **Keunggulan Teknis**:
     - Saat kartu dalam keadaan diam (*idle/resting state*), kartu adalah elemen 2D DOM murni (`rotateY: 0`).
     - Ketika pengguna mengarahkan kursor (*hover*) dan skala 1.2x aktif, browser me-rasterisasi teks dan grafik vektor langsung pada resolusi layar penuh secara murni tanpa kompresi tekstur 3D. Teks dan diagram tetap **kristal tajam (*razor-sharp*)**.

---

### D. Standar Ketajaman Tipografi & Anti-Blur Rendering Global
1. **Konfigurasi CSS Anti-Blur Baku (`globals.css`)**:
   ```css
   [class*="hover:scale-"],
   [class*="group-hover:scale-"] {
     -webkit-font-smoothing: antialiased !important;
     -moz-osx-font-smoothing: grayscale !important;
     text-rendering: optimizeLegibility !important;
     transform-origin: center center;
   }

   svg text {
     text-rendering: geometricPrecision !important;
     -webkit-font-smoothing: antialiased !important;
     -moz-osx-font-smoothing: grayscale !important;
   }
   ```
2. **Larangan Penggunaan `subpixel-antialiased` pada Elemen Ber-Scale**:
   - `subpixel-antialiased` mengandalkan kisi garis RGB sub-piksel fisik layar LCD 1:1. Ketika diperbesar 1.2x, strip RGB bergeser dari kisi fisik monitor, memunculkan efek pelangi kabur (*rainbow color fringing*) dan teks menjadi tebal buram.
   - Grayscale antialiasing (`antialiased`) menjamin kurva font menggunakan interpolasi alfa murni yang tetap tajam tanpa distorsi warna saat di-scale.
3. **Larangan `filter: blur(0)` dan `backface-visibility: hidden` Global**:
   - Properti tersebut memaksa browser mengunci rasterisasi layer bitmap pada skala 1x, yang menyebabkan efek blur saat kartu membesar.
4. **Ketebalan Tipografi (Font Weight) Padat**:
   - Hindari teks tipis (`font-normal`/`font-medium`) pada kartu ber-zoom karena garis 1px akan jatuh pada pecahan piksel (0.3px abu-abu buram) saat di-scale 1.2x pada monitor 1080p.
   - Wajib gunakan minimal **`font-semibold`**, **`font-bold`**, atau **`font-black`** agar batang karakter terisi piksel solid.

---

### E. Standar Kontras Tinggi & Pewarnaan Diagram SVG
1. **Belah Ketupat Decision Flowchart**:
   - Latar belakang cokelat pekat: `#451a03`
   - Border tegas: amber `#f59e0b` (`strokeWidth="2.5"`)
   - Teks kondisi: kuning keemasan `#fde68a` (amber-200), `fontWeight="900"`, `fontFamily="monospace"`, bebas dari keburaman.
2. **Kotak Proses & SVG di Mode Terang (Light Mode)**:
   - Wajib menggunakan atribut `fill="..."` dan `stroke="..."` eksplisit ber-kontras tinggi:
     - Kotak proses benar: border hijau pekat `#059669`, background lembut `#ecfdf5`, teks hijau gelap pekat `#064e3b`.
     - Kotak proses salah: border merah mawar `#e11d48`, background lembut `#fff1f2`, teks merah gelap pekat `#881337`.
   - **DILARANG KERAS** menampilkan teks berwarna kuning/terang di atas latar belakang terang!
3. **Kotak Proses & SVG di Mode Gelap (Dark Mode)**:
   - Background gelap pekat (`dark:fill-slate-950` / `dark:fill-emerald-950/80`) dengan teks cerah kontras tinggi (`dark:fill-emerald-200`, `dark:fill-rose-200`).
4. **Lingkaran Connector**:
   - Warna biru solid `#0284c7` dengan teks putih murni `#ffffff` `font-black`.

---

### F. Tata Letak Responsif & Ergonomi Antarmuka
1. **Elegan, Modern, dan Tidak Menor**: Menghindari lencana (*badge*) berlebihan atau kotak mencolok di tengah-tengah baris kode yang dapat merusak pemahaman mahasiswa.
2. **Layout Penuh & Tidak Tertekan**: Navigasi tab modul menggunakan grid responsif (`grid-cols-2 lg:grid-cols-4`) agar judul modul dan tombol navigasi tidak tertekan (*squished*) atau memunculkan *scroll-bar* horizontal.

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

---

## 10. Standar Pewarnaan Sintaks Kode (VS Code Palette & Dual-Mode Contrast)
Pada seluruh komponen penampil kode (misal `DetailedPseudocode.tsx`, modul multi-tab bahasa, dan editor kode):
1. **Prinsip Dual-Mode High Contrast**:
   - **Light Mode (Mode Terang)**: WAJIB menggunakan warna *deep jewel tones* jenuh kontras tinggi. **DILARANG KERAS** menggunakan warna teks pastel muda (`text-*-300` / `text-*-400`) di atas latar terang karena tidak terbaca (*washed out*).
     - Keywords (`PROGRAM`, `KAMUS`, `ALGORITMA`, `def`, `if`, `else`): Biru pekat jenuh (`text-blue-700` atau `text-blue-800`).
     - Strings (`"Halo"`, `'teks'`): Hijau Emerald tua pekat (`text-emerald-700` atau `text-emerald-800`).
     - Types (`integer`, `float`, `string`, `boolean`): Ungu / Violet pekat (`text-purple-700` atau `text-violet-700`).
     - Functions / Built-in (`input`, `output`, `print`, `len`): Kuning Emas pekat / Cokelat emas (`text-amber-800` atau `text-yellow-800`).
     - Numbers (`10`, `3.14`, `0`): Amber oranye jenuh (`text-amber-600` atau `text-amber-700`).
     - Operators (`+`, `-`, `*`, `/`, `==`, `!=`, `=`): Rose / Merah muda tua tegas (`text-rose-600 font-bold`).
     - Variables / Identifiers: Biru langit gelap (`text-sky-800` atau `text-slate-900`).
     - Comments (`// ...`, `# ...`): Abu-abu medium miring (`text-slate-500 italic`).
   - **Dark Mode (Mode Gelap)**: Menggunakan warna neon/luminous cerah berpijar di atas latar `dark:bg-slate-950`:
     - Keywords: Biru terang berpendar (`dark:text-sky-400` / `dark:text-blue-400`).
     - Strings: Hijau mint / Emerald cerah (`dark:text-emerald-300` / `dark:text-emerald-400`).
     - Types: Violet / Ungu cerah (`dark:text-violet-400`).
     - Functions: Kuning keemasan cerah (`dark:text-amber-300`).
     - Numbers: Amber oranye cerah (`dark:text-amber-400`).
     - Operators: Rose cerah (`dark:text-rose-400 font-bold`).
     - Variables: Biru langit lembut (`dark:text-sky-300`).
     - Comments: Abu-abu redup miring (`dark:text-slate-500 italic`).
2. **Gutter Nomor Baris (Line Numbers)**:
   - Wajib menyertakan atribut `select-none` (`user-select: none`) pada nomor baris agar saat mahasiswa melakukan drag selection atau copy manual, angka nomor baris tidak ikut tercopy ke clipboard.
3. **Tombol Salin (Clipboard Copy)**:
   - Tombol salin kode WAJIB menyalin string kode mentah bersih runnable (*clean raw string*), bukan elemen atau tag renderan HTML.

---

## 11. Standar Sinkronisasi Semantik Warna Lintas Representasi (Naratif, Flowchart, Pseudocode)
Pada modul konversi dan lab perbandingan (*Tri-Converter Lab*, workspace, dsb.):
1. **Pemetaan Warna Semantik Wajib Identik**:
   - **Input / Masukan**: Biru Royal (`text-blue-700 dark:text-blue-400`, `bg-blue-500/10`, jajar genjang input ber-border biru).
   - **Proses / Kalkulasi / Assignment**: Ungu / Violet (`text-purple-700 dark:text-purple-400`, `bg-purple-500/10`, kotak proses ber-border ungu).
   - **Output / Keluaran**: Hijau Emerald (`text-emerald-700 dark:text-emerald-300`, `bg-emerald-500/10`, jajar genjang output ber-border hijau).
   - **Percabangan / Kondisi**: Amber / Emas pekat (`text-amber-700 dark:text-amber-300`, belah ketupat keputusan `#451a03` border amber `#f59e0b`).
   - **Operator Matematika & Relasional**: Merah Mawar / Rose tegas (`text-rose-600 dark:text-rose-400 font-bold`).
   - **Angka / Literal Numerik**: Amber / Oranye (`text-amber-600 dark:text-amber-400`).
   - **Variabel**: Biru Langit / Sky (`text-sky-800 dark:text-sky-300 font-medium`).
   - **Nomor Langkah Naratif**: Hijau Emerald / Teal (`text-emerald-700 dark:text-emerald-400 font-bold`).
2. **Editor Masukan Interaktif**:
   - Panel konverter yang dapat disunting mahasiswa WAJIB menggunakan editor interaktif ber-syntax-highlighting (seperti `react-simple-code-editor` dengan regex tokenizer semantik), **DILARANG KERAS** menggunakan `<textarea>` monokrom polos.

---

## 12. Standar Ergonomi Dimensi Kartu Flip & Proteksi Overflow Teks
Untuk seluruh kartu ber-animasi flip (misal *5 Ciri Algoritma Knuth*, kartu pilar, dan konsep interaktif):
1. **Tinggi Kartu Adaptif & Ergonomis**:
   - Pada tata letak grid multi-kolom (misalnya 5 kolom pada 5 Ciri Algoritma), tinggi kartu harus memadai minimal `min-h-[245px]` (responsif: `h-[245px] sm:h-[255px] md:h-[265px]` atau lebih).
   - Menjamin seluruh 5–7 baris penjelasan akademis di sisi balik termuat utuh tanpa menabrak batas footer atau terpotong border bawah.
2. **Larangan Teks Statis `text-white` pada Elemen Dinamis**:
   - **DILARANG KERAS** menggunakan kelas `text-white` secara statis pada teks konten dalam elemen kartu berlatar `bg-card` atau adaptif tema, karena di Light Mode warna putih akan lenyap (*invisible/washed out*).
   - WAJIB gunakan `text-slate-950 dark:text-white` dengan aksen dekoratif semantik (seperti `underline decoration-*/60 decoration-2` atau warna semantik bertema).
3. **Proteksi Overflow Teks Footer**:
   - Gunakan `line-clamp-2` (bukan `truncate`) pada catatan ringkasan atau takeaway di bagian bawah kartu agar teks yang panjang dapat mengalir secara alami menjadi 2 baris dan tidak terpotong kasar dengan `...` di tengah kata atau menabrak border.
   - Sediakan ruang bawah yang cukup (`p-4` atau `p-4.5` dengan `space-y-2`) agar layout fleksibel dan estetik.

---

## 13. Standar Sisi Belakang Kartu Definisi Teori (Flip Back Content)
Sisi muka (*Front Face*) menyajikan intisari konsep esensial, sedangkan sisi balik (*Back/Flip Face*) WAJIB menyajikan pembuktian konkret visual:
1. **Definisi Algoritma**: Sisi balik menyajikan visualisasi Flowchart mini dengan simbol ANSI/ISO baku (Terminator, Input/Output jajar genjang, Proses persegi panjang, Decision diamond) sebagai bukti konkret bahwa algoritma disajikan dengan simbol-simbol grafis.
2. **Definisi Pseudocode**: Sisi balik menyajikan struktur 3 blok baku (PROGRAM, KAMUS, ALGORITMA) dengan pewarnaan sintaks VS Code.
3. **Definisi Bahasa Pemrograman**: Sisi balik menyajikan pembedahan kode runnable (Python & JavaScript) yang dapat disalin dan dijalankan.
4. **Mekanisme Flip Bebas Blur**: Wajib menggunakan `AnimatePresence` 2D bersih tanpa `preserve-3d` permanen agar tetap tajam (*zero blur*) saat di-scale 1.2x.

---

## 14. Standar Database Seed & SQL Scripts (Supabase)
1. **Idempotensi Skrip**:
   - Setiap file seed data SQL (`supabase/*.sql`) wajib menggunakan klausa `ON CONFLICT (id) DO UPDATE ...` atau verifikasi eksistensi agar aman dijalankan berulang kali tanpa merusak integritas tabel.
2. **Hashing Password Akun Auth**:
   - Password mahasiswa dan dosen wajib di-hash menggunakan format bcrypt auth Supabase yang valid (`$2a$10$...` atau ekstensi `pgcrypto`).
3. **Sinkronisasi Metadata & Role Profil**:
   - Role akun wajib tersinkronisasi konsisten antara `raw_user_meta_data->>'role'` di `auth.users` dan kolom `role` di `public.profiles` (`mahasiswa` atau `dosen`).


