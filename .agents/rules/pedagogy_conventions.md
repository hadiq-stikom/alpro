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
1. **Terminator (Kapsul/Oval)**: Menandai awal (`START` / `MULAI`) dan akhir (`STOP` / `SELESAI`) algoritma. Terminator DILARANG memiliki renderan teks ganda/tumpang tindih.
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
8. **Anti-Clipping & Ergonomi Dimensi Parallelogram (Zero Boundary Collision)**:
   - Teks instruksi di dalam simbol jajar genjang WAJIB berada sepenuhnya di dalam batas simbol dengan *safe inner margin* minimal 15–20px di sisi miring.
   - Sisi miring parallelogram memotong area horizontal sebesar 20–30px di kedua ujung. Untuk teks instruksi panjang (`input(var1, var2, ...)`, `output("Pesan Lengkap...")`), lebar simbol WAJIB diperlebar secara proporsional (minimal 240–280px pada mode vertikal, 150–200px pada horizontal) dan ukuran font diskalakan secara dinamis (`9.5px`–`11.5px`), bukan memaksakan font besar statis yang menembus garis tepi.
9. **Jalur Alir Aktif Berkelanjutan (*Continuous Unbroken Active Flow Path*)**:
   - Alur eksekusi dari cabang yang bernilai benar (True / Ya) WAJIB digambarkan sebagai garis alir solid tebal aktif (`strokeWidth="3.5"`, warna solid cerah seperti emerald `#10b981`) yang menyambung secara kontinu dari port keluar decision, melewati kotak proses/aksi, melalui rel bus pengumpul (*collector bus*), menyatu ke *merge node*, hingga mencapai terminator `SELESAI`.
   - DILARANG KERAS membiarkan segmen rel pengumpul tetap berupa garis putus-putus (*dashed line*) saat cabang aktif dieksekusi.

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
2. **Kotak Proses, Jajar Genjang Aksi & SVG di Mode Terang (Light Mode)**:
   - Wajib menggunakan atribut `fill="..."` dan `stroke="..."` eksplisit ber-kontras tinggi:
     - Kotak proses/aksi benar (True/Sukses): border hijau pekat `#059669`, background lembut `#ecfdf5`, teks hijau gelap pekat `#064e3b` (*font-black*).
     - Kotak proses/aksi salah (False/Gagal): border merah mawar `#e11d48`, background lembut `#fff1f2`, teks merah gelap pekat `#881337` (*font-black*).
   - **DILARANG KERAS** menggunakan warna teks/latar pastel muda (seperti hijau muda `#a7f3d0`, pink muda `#fda4af`, teks putih di atas latar terang, atau teks abu-abu pudar) yang menyebabkan tulisan pudar (*washed out*).
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

## 14. Standar Kelengkapan Dual-Language (Python & JavaScript) pada Simulator & Lab Interaktif
1. **Wajib Dua Bahasa Sekaligus**:
   - Seluruh modul lab interaktif, visualizer memori/stack/RAM, interactive playground, dan simulator alur kerja algoritma di setiap bab perkuliahan WAJIB menyediakan implementasi dalam **KEDUA BAHASA PEMROGRAMAN SEKALIGUS (Python & JavaScript)** dengan tab/toggle pemilih bahasa (`activeTab: 'python' | 'javascript'`).
2. **Larangan Monolingual**:
   - **DILARANG KERAS** hanya menyediakan salah satu bahasa (misalnya hanya JavaScript saja atau hanya Python saja).
   - Platform Web-Alpro berlandaskan pedagogi komparasi dwibahasa: mahasiswa diajarkan bagaimana konsep logika yang sama diimplementasikan dalam Python (bahasa dengan sintaks bersih bertipe dinamis) maupun JavaScript (bahasa berbasis web dengan blok kurung kurawal).
3. **Penyajian Kode Seimbang**:
   - Contoh kode, repl, dan playground wajib memuat kedua sintaks dengan padanan fungsionalitas yang setara 1:1.

---

## 15. Fitur Reset Password Mahasiswa oleh Dosen (Ke Default NIM)
1. **Pusat Kontrol Akun Dosen (`/lecturer/dashboard`)**:
   - Kolom tindakan "Reset ke NIM" pada tabel daftar mahasiswa.
   - Indikator Status Akun:
     - Badge `Default NIM` (warna lembut/abu-abu/biru muda): Menandai bahwa akun mahasiswa masih menggunakan password default (NIM).
     - Badge `Kustom` (warna emerald/kuning): Menandai bahwa mahasiswa telah mengganti password mandiri.
   - Dialog Modal Konfirmasi: Dosen wajib mengonfirmasi sebelum sistem melakukan reset password.
2. **Keamanan & Endpoint Server-Side (`/api/lecturer/reset-password`)**:
   - Pemanggilan API menggunakan method `POST` dengan validasi otentikasi role `dosen`.
   - Menggunakan Supabase Service Role Admin Client untuk mengupdate password pengguna di `auth.users` ke NIM yang bersangkutan.
   - Metadata `password_is_default = true` di-update secara simultan agar status badge di dashboard dosen langsung tersinkronisasi.

---

## 16. Standar Desain Dashboard Mahasiswa (Compact 16 Pertemuan & Kebebasan Akses Bab)
1. **Grid Responsif Kartu Kompak (16 Pekan Silabus)**:
   - Menampilkan seluruh 16 minggu perkuliahan semester dalam tata letak kartu kompak (`min-h-[148px]`, grid 4 kolom responsif).
   - Menjamin seluruh kurikulum semester terlihat komprehensif tanpa memerlukan scrolling vertikal yang melelahkan.
2. **3 Status Visual Kartu**:
   - **Selesai**: Menampilkan skor rata-rata, lencana capaian berwarna spesifik, status kelulusan (*Sempurna*, *Bagus*, atau *Remedial*), serta tombol cepat menuju ulasan rapor pertemuan (`/student/meeting/[id]`).
   - **Tersedia**: Pertemuan aktif yang materi dan bank soalnya sudah siap. Menampilkan border putus-putus (*dashed*), badge `Tersedia`, dan tombol aksi langsung `Mulai Tes`.
   - **Segera / Terkunci**: Pertemuan semester lanjutan yang belum dibuka materi/asesmennya dengan ikon gembok dan tampilan redup (*opacity 0.6*).
3. **Prinsip Akses Belajar Non-Linear**:
   - Mahasiswa bebas memilih dan mengerjakan materi bab manapun yang berstatus *Tersedia* tanpa harus dipaksa berurutan secara kaku. Jika mahasiswa telah menyelesaikan bab 3 dan 5, mahasiswa tetap memiliki kebebasan penuh untuk mengerjakan bab 1 atau bab lainnya yang belum selesai dari dashboard.
4. **Hero Banner Motivasional**:
   - Menampilkan salam personal, metrik capaian total, dan pesan persuasif mengenai pentingnya konsistensi belajar.
   - Tombol CTA otomatis mendeteksi pertemuan pertama yang belum tuntas untuk memandu mahasiswa melanjutkan progres belajarnya.

---

## 17. Standar Penyajian Halaman Teori (Sub-Materi Tertutup / Collapsed by Default)
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

## 18. Larangan Mutlak CSS Global `scroll-behavior: smooth` & Standar Navigasi Ujian
1. **Larangan Keras `scroll-behavior: smooth` pada Tag `html` Global**:
   - **DILARANG KERAS** menambahkan `html { scroll-behavior: smooth; }` secara global di `src/app/globals.css`.
   - **Alasan Teknis**: Mengaktifkan smooth scroll secara global memaksa peramban (browser) melakukan interpolasi animasi lambat pada seluruh perpindahan rute Next.js. Hal ini mematahkan mekanisme *scroll restoration* Next.js, menyebabkan pengguna yang berpindah dari halaman beranda mendarat di tengah halaman.
   - Transisi scroll antarhalaman wajib instan agar pengguna selalu tiba di titik koordinat paling atas (`0, 0`).
2. **Smooth Scrolling Hanya Programmatic / Lokal**:
   - Animasi smooth scrolling hanya diizinkan untuk aksi interaksi pengguna lokal di dalam halaman yang sama, seperti tombol **🏆 Uji Pemahaman** pada sticky sub-header:
     ```typescript
     const targetY = (window.scrollY || window.pageYOffset) + el.getBoundingClientRect().top - 90;
     window.scrollTo({ top: targetY, behavior: 'smooth' });
     ```
3. **Protokol Navigasi Tombol "Mulai Tes"**:
   - Tautan langsung ke tes dari dashboard menggunakan format:
     `href={`/theory/${meeting.id}?startTest=true#assessment`}`
   - Wajib menyertakan atribut `scroll={false}` pada Next.js `<Link>` agar router tidak bentrok dengan koordinat target asesmen.

---

## 19. Standar Adaptabilitas Tema Penuh (Dual-Mode: Strict Light vs Dark Theme Harmony)
1. **Larangan Keras Hardcoding Latar Belakang Gelap**:
   - **DILARANG KERAS** menggunakan kelas latar belakang gelap (`bg-slate-950`, `bg-slate-900`, `bg-slate-900/90`, `text-slate-100`, `border-slate-800`) secara statis tanpa prefix `dark:` pada elemen pembungkus modul, kontainer lab, toolbar header, kartu materi, dan field input.
2. **Harmoni Tema 100% Konsisten**:
   - **Light Mode (Mode Terang)**: Seluruh kontainer, kartu lab, toolbar, dan area kerja WAJIB berlatar terang bersih (`bg-card`, `bg-white`, `bg-slate-50`, `bg-slate-100/80`), border halus (`border-slate-200/80` / `border-border`), teks utama gelap tegas (`text-slate-900`, `text-slate-800`), serta token warna jenuh berkontras tinggi (*deep jewel tones*).
   - **Dark Mode (Mode Gelap)**: Seluruh kontainer dan kartu beralih ke warna gelap pekat (`dark:bg-slate-950`, `dark:bg-slate-900`), border gelap (`dark:border-slate-800`), teks cerah (`dark:text-slate-100`), serta token warna neon bercahaya (*luminous*).
3. **Pemberantasan Anomali "Black Slab"**:
   - Menghilangkan tampilan kotak hitam pekat yang "bocor" atau terisolasi di tengah halaman saat pengguna memilih Mode Terang.

---

## 20. Standar Anti-Clipping Simbol Flowchart & Safe Margins Geometri (Zero Boundary Collision)
1. **Prinsip Bebas Tubrukan Batas (Zero Clipping)**:
   - Teks instruksi di dalam simbol diagram alir (khususnya Jajar Genjang Input/Output dan Belah Ketupat Decision) WAJIB berada sepenuhnya di dalam batas simbol dengan *safe inner margin* minimal 15–20px di setiap sisi miring.
   - Teks DILARANG KERAS menabrak, memotong, atau menembus garis tepi polygon.
2. **Kompensasi Sudut Miring Parallelogram**:
   - Sisi miring parallelogram memotong area horizontal sebesar 20–30px di kedua ujung.
   - Untuk teks instruksi berkarakter panjang (seperti `input(var1, var2, ...)`, `output("Pesan Lengkap...")`), dimensi lebar simbol WAJIB diperlebar secara proporsional:
     - Mode Vertikal: lebar dasar **240–280px** (misal `points="100,86 360,86 330,134 70,134"`).
     - Mode Horisontal: lebar dasar **160–210px**.
   - Ukuran font diskalakan secara dinamis (`fontSize={text.length > 20 ? 10.5 : 11.5}`) agar teks panjang tidak memaksakan font besar yang meluap ke luar garis.
3. **Perhitungan Matematis Kapasitas Teks Monospace**:
   - Huruf font monospace 12px membutuhkan lebar rata-rata ~7.2px per karakter.
   - Teks 30 karakter membutuhkan ruang horizontal ~216px. Jika dimasukkan ke dalam parallelogram berlebar 200px dengan kemiringan 25px (lebar aman hanya ~150px), teks dipastikan menabrak tepi.
   - Developer dan AI Agent WAJIB memperlebar polygon dan menyesuaikan font size sebelum menyusun tata letak.

---

## 21. Standar Kontinuitas Jalur Aktif Flowchart (Unbroken Solid Path to Terminator)
1. **Alur Aktif Utuh Tanpa Cacat**:
   - Aliran eksekusi dari cabang yang bernilai benar (True / Ya) WAJIB digambarkan sebagai garis alir solid tebal aktif (`strokeWidth="3.5"`, warna solid cerah seperti emerald `#10b981`) yang menyambung secara kontinu dari port keluar decision, melewati kotak proses/aksi, melalui rel bus pengumpul (*collector bus*), menyatu ke *merge node*, hingga mencapai terminator `SELESAI`.
2. **Larangan Garis Putus-Putus pada Jalur Aktif**:
   - DILARANG KERAS membiarkan segmen rel pengumpul (collector bus) tetap berupa garis putus-putus (*dashed line*) abu-abu saat cabang yang menuju ke sana sedang aktif dieksekusi.
   - Garis putus-putus abu-abu (`strokeDasharray="4 4"`) hanya digunakan untuk jalur dasar atau jalur yang sedang dilewati (*skipped*). Ketika jalur aktif, layer garis solid berwarna wajib menimpa atau menggantikan garis putus-putus tersebut hingga ke titik temu.

---

## 22. Standar Pencegahan Warna Pastel Pudar pada Diagram SVG di Mode Terang (Anti-Washed Out Graphic Tokens)
1. **Larangan Teks & Latar Pastel Pudar**:
   - Pada seluruh diagram SVG dan simbol flowchart, DILARANG KERAS menggunakan warna pastel muda (seperti hijau muda `#a7f3d0`, pink muda `#fda4af`, teks putih di atas latar terang, atau teks abu-abu redup di latar putih) pada elemen aksi/output di Mode Terang (*Light Mode*).
2. **Dual-Mode High Contrast Token Baku**:
   - **Mode Terang (Light Mode)**: Menggunakan latar lembut dengan border tegas (`fill="#ecfdf5"` border `#059669` untuk sukses/true; `fill="#fff1f2"` border `#e11d48` untuk gagal/false) dan teks warna jenuh pekat (*deep jewel tones*, misal `fill="#064e3b"` atau `fill="#881337"` dengan `fontWeight="900"`).
   - **Mode Gelap (Dark Mode)**: Menggunakan latar belakang gelap pekat (`dark:fill-slate-950` / `dark:fill-emerald-950/80`) dengan teks cerah kontras tinggi (`dark:fill-emerald-200`, `dark:fill-rose-200`).

---

## 23. Standar Audit Forensik & Normalisasi Basis Data Integritas Asesmen
1. **Protokol Forensik Empat Vektor**:
   - Audit orisinalitas esai mahasiswa wajib menggunakan 4 indikator ilmiah:
     1. *Superhuman Ingestion*: Kecepatan pengetikan tidak wajar ($> 60$–$100$ WPM) pada teks jawaban panjang.
     2. *Persona & Bot Leaks*: Kehadiran prompt leakage atau nama bot (seperti *Hydra*, *Tuan*, respon chatbot).
     3. *Peer-to-Peer Cross Plagiarism*: Kemiripan kalimat antar-mahasiswa $\ge 50\%$ (Jaccard similarity).
     4. *Smart Transcriber & Hidden Rubric Footprint*: Indikasi transkripsi manual dari layar ponsel/perangkat kedua via typo ketukan khas mekanis (`tinggi. yakni`, `'koki'CPU .`) dan kesempurnaan 100% mencakup seluruh kata kunci sistem prompt tersembunyi.
2. **Normalisasi Database & Backup Wajib**:
   - Setiap penghapusan rekaman pada `quiz_submissions` WAJIB dicadangkan dalam snapshot file JSON terenkripsi/terarsip rapi sebelum dieksekusi.
   - Penghapusan data curang mengembalikan integritas view `meeting_grades` dan `overall_grades` secara adil bagi seluruh mahasiswa.
3. **Isolasi View `meeting_grades`**:
   - SQL View `meeting_grades` hanya menghitung submission bertipe `'essay', 'exam', 'lab', 'challenge'`. Tes prasyarat (MCQ atau Gerbang Konsep dengan `quiz_type='quiz'`) berfungsi murni sebagai pembuka akses dan dilarang mencemari rata-rata nilai akhir mahasiswa.
4. **Pendekatan Pedagogis Transkripsi Mandiri**:
   - Kasus pengetikan mandiri dari draf AI di ponsel diselesaikan secara edukatif melalui wawancara verifikasi lisan singkat (*viva voce* di kelas) dan penyesuaian nilai ke rentang wajar Grade B/AB (75–80).

---

## 24. Standar Arsitektur Dual-Shield Asesmen: Obrolan Santai Pra-Ujian (Warm-Up Chat) & Profiler Golden Baseline
1. **Pemanasan Psikologis & Penghapusan Kecemasan Ujian**:
   - Tahap awal sebelum Ujian Esai resmi menggunakan modul **Obrolan Santai Pra-Ujian (*Warm-Up Chat*)** bersama persona Dosen Pengampu (Pak Hadiq) via LLM dinamis (`src/components/assessment/WarmupChat.tsx` & `/api/warmup-chat`).
   - Pendekatan ini menurunkan kecemasan (*test anxiety*) dan menghapus insentif menyontek karena obrolan bersifat personal, santai, dan non-formal (zero incentive to cheat).
2. **Arsitektur Obrolan 4 Dimensi Dinamis (Bab 1–16)**:
   - Dilarang menggunakan pola percakapan statis/monoton. Setiap minggu menggunakan kombinasi:
     * *Dimensi 1 (Tematik Bab 1–16)*: 16 topik analogi nyata unik (`src/lib/warmup-themes.ts`).
     * *Dimensi 2 (Kesadaran Waktu Nyata)*: Konteks pagi/siang/sore/malam & hari dalam seminggu.
     * *Dimensi 3 (Personal & Empatis)*: Menyapa nama mahasiswa dan mendengarkan kondisi nyata mereka.
     * *Dimensi 4 (Respons Adaptif LLM)*: AI menanggapi cerita mahasiswa sebelum mengalirkan ke topik berikutnya (maksimal 3 putaran/turn).
3. **Perekaman Diam-Diam Profil Baseline Kognitif & Stylometry (*Golden Baseline*)**:
   - Selama mahasiswa mengetik obrolan santai, sistem diam-diam merekam metrik motorik & gaya bahasa biologis murni tanpa rekayasa:
     * *Baseline WPM*: Kecepatan pengetikan alami mahasiswa (umumnya 10–25 WPM saat santai).
     * *Baseline Backspace Ratio*: Kebiasaan tombol koreksi (normal: 8%–18%).
     * *Baseline Stylometric Sample*: Sampel diksi, sintaks, dan struktur kalimat orisinal mahasiswa.
4. **Lini 1: Benteng Klien & Telemetri Real-Time**:
   - *Delta Burst Limiter*: `filterInputBurst` memblokir pertambahan teks mendadak $\le 15$ karakter per tick/event. Injeksi teks instan dari clipboard / DevTools / ekstensi langsung dibatalkan dengan peringatan inline ramah.
   - *Drag & Drop Lockout*: Event `onDragOver` dan `onDrop` dikunci rapat (`preventDefault`).
   - *Perekam Telemetri*: Melacak `keystrokeCount` dan `backspaceCount`.
5. **Lini 2: Backend AI Profiling & Stylometric Verification**:
   - API penilaian esai (`/api/grade-essay`) memverifikasi jawaban dengan membandingkannya terhadap *Golden Baseline*.
   - *Deteksi Inkonsistensi Gaya Bahasa*: Jika jawaban esai mendadak menggunakan diksi super-ensiklopedis baku tingkat tinggi khas output LLM yang melompat jauh dari baseline pemula, atau WPM melompat $> 3\times$ baseline, **nilai esai otomatis dibatasi maksimal 75–78 (Grade B/AB)** dengan catatan edukatif agar mahasiswa menggunakan analogi pemikiran sendiri.
   - *Perekaman Audit*: Seluruh telemetri ketikan dan baseline tersimpan rapi di kolom `answers_json` pada tabel `quiz_submissions`.

---

## 25. Standar Kehadiran Sosial Humanis & Nudge Kejujuran (Watching Eyes Effect & Persona "Bapak")
1. **Efek Kehadiran Sosial Humanis (Watching Eyes Effect)**:
   - Berdasarkan riset ilmiah Bateson, Nettle, & Roberts (2006, *Biology Letters*) dan Bryan et al. (2011, *PNAS*): stimulus tatapan mata ramah figur otoritas moral secara bawah sadar meningkatkan kesadaran etis (*ethical self-awareness*) dan menekan niat berbuat curang tanpa menimbulkan rasa terintimidasi.
   - Form obrolan santai dan lembar pengerjaan esai WAJIB menyertakan foto potret senyum hangat Dosen Pengampu (`/dosen-smile.png`) yang didampingi badge hijau *Integritas Akademik* dan kutipan pendampingan kebapakan:
     *“Kerjakan dengan tenang ya! Bapak jauh lebih menghargai satu kalimat murni pemikiranmu sendiri daripada sepuluh paragraf salinan mesin. Kamu pasti bisa!”*
2. **Panggilan Persona Dosen Baku ("Bapak")**:
   - Seluruh teks percakapan, prompt sistem LLM, dialog antarmuka, dan instruksi WAJIB menggunakan sebutan persona **"Bapak"** (DILARANG KERAS menggunakan kata "Aku" yang terlalu informal atau "Saya" yang berjarak kaku).
   - Mencerminkan budaya akademis perguruan tinggi Indonesia yang hangat, kebapakan, mengayomi, dan santun.

---

## 26. Standar Tata Letak Bersanding 2 Kolom pada Lembar Esai (Dual-Column Side-by-Side Responsive Architecture)
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

---

## 27. Standar Jarak Bebas Estetika Bilah Menempel & Aksen Gradien Puncak Kartu (Sticky Header Clearance & Floating Card Geometry)
1. **Offset Navigasi Baku 154px**:
   - Total tinggi elemen menempel (*sticky*) di atas layar adalah ~134px (Navbar 64px + Sub-header materi ~70px).
   - Seluruh mekanisme *scroll restoration* dan tombol *Uji Pemahaman* WAJIB menggunakan konstanta `headerOffset = 154` (bukan 118px) untuk memberikan ruang napas estetika (*aesthetic breathing room*) sebesar ~20px di bawah bilah sub-header.
2. **Garis Aksen Gradien Relaksasi Puncak Kartu**:
   - Seluruh kartu evaluasi (Kartu Intro, Form Obrolan Santai `WarmupChat`, dan Form Esai `EssayContainer`) WAJIB menyertakan garis gradien halus di puncak kartu: `<div className="w-full h-1 bg-gradient-to-r from-primary via-indigo-500 to-emerald-400 shrink-0" />`.
   - Garis tepi atas, sudut membulat (*rounded corners*), dan bayangan kartu (*drop shadow*) WAJIB tampak utuh mengambang bebas (*floating card*), DILARANG terpotong atau terselip di bawah bilah navigasi menempel.

---

## 28. Standar Arsitektur Energi Ganda Psikologis (Dual-Energy Interface Harmony / Yerkes-Dodson Law)
1. **Zona Materi Teori & Laboratorium (Tinggi Semangat / High Arousal)**:
   - Tetap menggunakan tone berenergi tinggi, dinamis, dan semarak (*vibrant jewel tones*, zoom interaktif 1.2x, animasi alir flowchart, flip card 2D tajam, simulator dwibahasa Python & JavaScript).
   - Tujuannya menjaga atensi, mengaktifkan dopamin, mencegah rasa kantuk/kebosanan saat membedah logika kode yang rumit.
2. **Zona Evaluasi & Obrolan Santai (Penenang & Ramah / Low-to-Medium Arousal)**:
   - Menggunakan tone sejuk, menenangkan, humanis, dan minim stres visual (aksen hijau zamrud/slate/indigo lembut, senyum Pak Hadiq, garis gradien halus).
   - Tujuannya menurunkan kortisol/kecemasan ujian (*exam anxiety*), menciptakan rasa aman, dan mendorong kejujuran intelektual.
3. **Larangan Menyamaratakan Tone**: DILARANG meredupkan atau menerapkan tone menenangkan pada materi teori, dan sebaliknya DILARANG menggunakan gaya visual agresif/menegangkan pada sesi ujian.

---

## 29. Standar Asesmen Esai Murni & Sequential Progressive Mastery Gateway (Gembok Bertingkat)
1. **Evaluasi 100% Esai Murni**:
   - Seluruh evaluasi pemahaman mahasiswa pada platform resmi menggunakan Ujian Esai Interaktif (`ESSAY_BANK` di `src/lib/essay-bank.ts`) yang dinilai otomatis oleh AI Grader berbasis rubrik analitik. Bank soal pilihan ganda (`question-bank.ts`) resmi berstatus arsip lama / ditiadakan.
2. **Sequential Progressive Mastery Gateway**:
   - Soal esai disajikan satu per satu secara berurutan (5 soal bertingkat per bab).
   - Soal berikutnya **HANYA AKAN MUNCUL** jika mahasiswa telah memperoleh nilai kelulusan minimal ($\ge 80$) pada soal sebelumnya.
3. **Tiga Pilar Rasional Esensial**:
   - *Grit & Daya Juang*: Membangun kegigihan mahasiswa merevisi jawaban berdasarkan umpan balik korektif Dosen AI yang humanis tanpa rasa jemu.
   - *Anti Bulk-Prompt Dumping*: Menutup celah kecurangan penyalinan semua soal sekaligus ke chatbot AI eksternal.
   - *Mastery Learning*: Menjamin penguasaan tuntas sub-konsep sebelum melanjutkan ke tingkat kognitif yang lebih kompleks.

---

## 30. Standar Navigasi Beranda Dua Baris 16 Pekan (Two-Row Semester Bar Matrix & Zero Scroll)
1. **Akses Cepat Bebas Gulir (*Above-the-Fold*)**:
   - Puncak beranda (`src/app/page.tsx`) menyajikan akses instan ke seluruh 16 pekan materi dalam format matriks 2 baris ramping:
     - Baris 1: Pekan `01` s.d. `08` (Paruh 1 - UTS).
     - Baris 2: Pekan `09` s.d. `16` (Paruh 2 - UAS).
2. **Tipografi Humanis Plus Jakarta Sans**:
   - Wajib menggunakan font modern **Plus Jakarta Sans** (`font-heading font-bold`) dengan penomoran dua digit (`01` s.d. `16`) yang proporsional, elegan, dan tidak kaku.
3. **Bilah Pratinjau Interaktif 1 Baris**:
   - Disematkan bilah pratinjau ringkas (tinggi 36px) yang langsung memunculkan judul materi dan capaian pembelajaran saat tombol pekan di-hover tanpa memicu pergeseran tata letak.

---

## 31. Status Kurikulum Baku Pertemuan 1 s.d. 7 (Strict Immutable & Verified)
1. **Status FIX & Final**:
   - Seluruh materi, laboratorium interaktif dwibahasa (Python & JavaScript), visualizer 4 representasi, modul Pra-Ujian Obrolan Santai (*Warmup Chat*), dan bank 5 soal esai untuk **Pertemuan 1 sampai 7 telah dinyatakan 100% LENGKAP, TERUJI, dan BERSTATUS FIX (SINGLE SOURCE OF TRUTH)**.
2. **Kepatuhan Penambahan Materi Baru (Pertemuan 8 s.d. 16)**:
   - DILARANG mengubah struktur kurikulum atau mereduksi kedalaman materi Pertemuan 1–7 tanpa instruksi eksplisit dari Dosen Pengampu. Seluruh pengembangan materi lanjutan (Pertemuan 8 s.d. 16) wajib menaati cetak biru pedagogis yang telah dibakukan ini.

---

## 32. Standar Silabus & Alokasi Kurikulum Paruh Kedua (Pertemuan 9 s.d. 16 — 4 SKS / 200 Menit)
1. **Struktur Waktu 4 SKS (200 Menit per Pertemuan)**:
   - Setiap pertemuan dirancang dengan siklus pedagogis lengkap: Analogi Teori (30-35') $\rightarrow$ Visualizer Lab (40-50') $\rightarrow$ Hands-on Coding Mandiri (35-45') $\rightarrow$ Asesmen Esai AI Bertingkat (35-40').
2. **Matriks Silabus Resmi**:
   - **Pekan 09**: Dasar Perulangan (FOR & WHILE Loop) — Iterasi terhitung, iterasi terkondisi, akumulator data.
   - **Pekan 10**: Perulangan Bersarang (Nested Loop) — Iterasi multi-dimensi, alur outer/inner loop, koordinat baris-kolom ($i, j$), pola geometris, kompleksitas $O(n^2)$.
   - **Pekan 11**: Struktur Data Berurutan (List 75% & Tuple 25%) — Manipulasi CRUD List, *slicing*, *Linear Search*, dan proteksi *Immutability Vault* Tuple.
   - **Pekan 12**: Struktur Data Asosiatif (Dictionary 75% & Set 25%) — Key-Value semantik, Set deduplikasi instan, dan puncak **List of Dictionaries** (tabel mini-database terformat & filter dengan `if`).
   - **Pekan 13**: Fungsi Dasar & Top-Down Design — **Wajib TANPA parameter dan TANPA return value**; fokus pada dekomposisi modular masalah, alur kontrol *Call-and-Return*, simbol baku ANSI/ISO **Predefined Process** (`| [Nama] |`), Pseudocode `procedure`, sintaks Python `def` dan JS `function`.
   - **Pekan 14**: Fungsi Lanjutan (Parameter & Return Value) — Parameter Formal vs Argumen Aktual (*positional, named, default*), isolasi *scope lokal vs global* di RAM, mekanisme `return`, **Matriks Keputusan Desain Fungsi 4 Kuadran**, fungsi pemroses *List of Dictionaries*.
   - **Pekan 15**: Penanganan Galat & Teknik Debugging — Taksonomi 3 jenis galat (**Syntax Error**, **Runtime Error / Exception**, dan **Logical Error**), blok pertahanan `try - except - finally` / `try - catch`, analisis *Stack Trace*, dan penelusuran bug (*RAM State Tracing*).
   - **Pekan 16**: Evaluasi Akhir Semester (UAS) & Proyek Terapan — Ujian integrasi seluruh pilar dan perakitan aplikasi terapan modular bebas crash.

---

## 33. Implementasi Baku Pertemuan 9 (Dasar Perulangan: FOR & WHILE Loop — Verified & Active)
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

---

## 34. Protokol Penanganan Modus Gawai Kedua (Second Device Transcription) & Dokumen Audit Resmi PDF
1. **Pembedahan Forensik Modus Gawai Kedua**:
   - Mahasiswa tidak melakukan tab switch pada peramban laptop ujian (`tab_switches = 0`), melainkan mengetikkan ulang hasil prompt AI dari layar smartphone di samping keyboard secara langsung.
   - Terdeteksi melalui kecepatan ketik tinggi terus-menerus ($> 15 - 30$ WPM), ketiadaan salah ketik, struktur kalimat simetris formulaik AI, dan kemunculan leksikon teknis tingkat lanjut di luar materi pengantar.
2. **Kebijakan Pembinaan Proporsional**:
   - Mahasiswa yang terindikasi modus ini disesuaikan dan ditetapkan pada nilai batas kelulusan pembinaan **70.00 (Grade B / Kategori: Baik)** pada modul terkait:
     * **Ahmad Umarul Faruq (1126102268)** pada Pertemuan 1.
     * **Moh. Alvin Tauviqul Hikam (1126102264)** pada Pertemuan 2 (dan nilai M1 tetap di-reset karena plagiasi silang).
3. **Standardisasi Tiga Format Dokumen Audit**:
   - Berkas Markdown Utama: `LAPORAN_AUDIT_INTEGRITAS_ESAI.md` (Nomor Resmi: `042/ALPRO-TI/AUDIT-AI/X/2026`).
   - Berkas Mandiri Standalone: `LAPORAN_AUDIT_INTEGRITAS_ESAI.html` (Base64 signature tersemat, Mermaid CDN).
   - Rute Antarmuka Web Siap Cetak: `/lecturer/audit-report` dengan styling standar A4 dan tombol *Cetak / Simpan PDF*.

---

## 35. Standar Desain, Hierarki Visual & Interaktivitas Modul Praktikum Laboratorium (LKP)
1. **Landasan Filosofis & Pembongkaran 2 Pilar Fundamental**:
   - Dilarang menyajikan pengantar filosofis sebagai teks datar monokrom panjang. Wajib menggunakan kotak pengantar beraksen khusus (`p-4 rounded-xl bg-card border border-border/80 shadow-sm`) dengan *keyword highlighting* otomatis.
   - Dua pilar fundamental yang dikendalikan oleh pemilihan tipe data **DILARANG disajikan mendatar inline `(1) ... serta (2) ...`**. Wajib disajikan dalam **2 Kartu Kolom Responsif (`grid-cols-1 md:grid-cols-2`)**:
     * **Pilar #1 (Aksen Cyan)**: *Kapasitas Domain Nilai & Akurasi Presisi Komputasi* (Tag: `Domain & Presisi RAM`).
     * **Pilar #2 (Aksen Indigo)**: *Keabsahan Operasi Matematika & Logika* (Tag: `Type Safety & Operasi`).
2. **Kartu Dasar Teori 3-Level Visual Hierarchy (Bagian B)**:
   - **Tingkat 1**: Banner Intisari Konsep (*Lead Concept Callout*) bergradien Cyan (`border-l-4 border-cyan-500`) dengan badge `✨ INTISARI KONSEP`.
   - **Tingkat 2**: Kartu Rincian Kunci (*Structured Fact Cards*) berindikator *glowing dot*, judul tebal, uraian ringkas, dan badge/chip kode di sisi kanan (`int: 28B | float: 24B`, `PyObject`, `type() & sys.getsizeof()`).
   - **Tingkat 3**: Akordion Naratif Lengkap (`<details>`) untuk membaca teks akademis panjang tanpa memicu *cognitive overload*.
   - **Lab Insight**: Catatan analisis investigasi berlatar amber (`Lightbulb` icon).
   - **Larangan Blok Konsol Hitam di Teori**: Blok terminal gelap *Parameter & Sintaks Uji* **DIHILANGKAN DARI KARTU TEORI** agar bebas dari *horizontal scrollbar*. Eksekusi pengujian dipusatkan ke Prosedur Kerja dan Terminal Helper.
3. **Mesin Penekanan Tipografi Otomatis (`renderHighlightedText`)**:
   - Metrik kapasitas (`28 byte`, `24 byte`, `52-bit`, `64-bit`) $\rightarrow$ Chip Amber kontras tinggi.
   - Fungsi & identifier (`type()`, `sys.getsizeof()`, `PyObject`, `IEEE 754`, `ZeroDivisionError`, `10 // 4`, `0.1 + 0.2`) $\rightarrow$ Chip konsol Cyan.
   - Nilai Boolean (`True`, `False`) $\rightarrow$ Badge Hijau Emerald.
   - Konsep inti (`pointer ke alamat memori fisik RAM`, `integer truncation`, `String Concatenation`, `Explicit Type Casting`, `hardware trap`) $\rightarrow$ Teks tebal bergaris bawah aksen cyan.
4. **Prosedur Langkah Kerja Berfase (Bagian C)**:
   - Dilarang tag `<ol>` datar monokrom.
   - Wajib menyertakan bilah pipeline alur 4 fase: `1. Persiapan` $\rightarrow$ `2. 5 Kasus Uji` $\rightarrow$ `3. Catat Tabel C` $\rightarrow$ `4. Sintesis D & E`.
   - Kartu berfase dengan nomor badge tebal `#1`–`#8` berkode warna semantik per fase (Sky, Cyan, Amber, Purple).
   - Tombol pintas interaktif langsung: `[▶ Uji di Simulator]` (*auto-fill input & smooth scroll*), `[✓ Ke Tabel Pengamatan]`, dan `[📝 Ke Bagian Analisis]`.
5. **Standar Cetak Lembar Kerja Resmi A4 / PDF (`print/page.tsx`)**:
   - Landasan filosofis dicetak dalam 2 kotak pilar mini berdampingan (*side-by-side*).
   - Dasar teori disajikan dalam format daftar butir berpoin rapi (*bulleted list*) dengan tag kode tebal, tanpa blok konsol hitam.




