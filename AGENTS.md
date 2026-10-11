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
   - **Geometri Bebas Tubrukan Teks (Anti-Clipping)**: Teks di dalam simbol jajar genjang dan belah ketupat WAJIB berada sepenuhnya di dalam batas simbol dengan *safe inner margin* minimal 15–20px di sisi miring. Dimensi polygon wajib diperlebar (minimal 240–280px pada mode vertikal, 150–200px pada horizontal) dan font diskalakan secara dinamis (`9.5px`–`11.5px`) saat memuat instruksi berkarakter panjang.
   - **Jalur Aktif Tak Terputus (*Continuous Unbroken Path*)**: Garis tebal cerah ber-glow (`strokeWidth: 3.5`, `#10b981`), **animasi aliran bergerak dinamis** (`animated: true`), label `✓ ...`, dan node ditandai `✓ DIJALANKAN`. Garis aktif dari cabang benar WAJIB menyambung utuh tanpa putus melalui rel bus pengumpul hingga *merge node* dan terminator `SELESAI` (DILARANG membiarkan segmen rel bus berupa garis putus-putus saat cabang aktif).
   - **Jalur Dilewati**: Garis redup (*opacity 0.35*, dashed), animasi mati, label `✗ ... (DILEWATI)`, dan node meredup dengan badge `🚫 DILEWATI`.
   - Jalur percabangan menyatu kembali ke lingkaran konektor (*merge node*).
   - **Orientasi Fleksibel (Vertikal & Horisontal)**: Header kartu Flowchart menyediakan toggle orientasi Vertikal (`LayoutList` / Atas-ke-Bawah) dan Horisontal (`LayoutGrid` / Kiri-ke-Kanan).
   - **Port Panah Alir Rapi & Anti Teks Ganda**: Pada mode Vertikal, port panah keluar/masuk terminator (`MULAI`/`SELESAI`) wajib vertikal. Garis alur dari cabang True/False tidak boleh saling menabrak kotak statemen lawan sebelum menuju *merge node*. Terminator DILARANG memiliki renderan teks ganda/tumpang tindih.

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

13. **Standar Pewarnaan Sintaks Kode (VS Code Palette & Dual-Mode High Contrast)**:
    - **Pewarnaan Token Semantik**: Viewer kode (Pseudocode, Python, JavaScript) dan editor kode wajib menerapkan pewarnaan sintaks ala editor modern (VS Code / JetBrains).
    - **Light Mode (Mode Terang)**: WAJIB menggunakan warna *deep jewel tones* / jenuh kontras tinggi (`text-emerald-700`, `text-blue-700`, `text-violet-700`, `text-rose-600`, `text-sky-800`, `text-amber-700`, `text-slate-900`) di atas latar terang (`bg-slate-50`, `bg-white`, `bg-card`). **DILARANG KERAS** menggunakan warna teks pastel muda (`text-*-300`/`text-*-400`) di mode terang karena pudar (*washed out*).
    - **Dark Mode (Mode Gelap)**: Menggunakan warna neon/luminous cerah berpijar (`dark:text-emerald-400`, `dark:text-sky-300`, `dark:text-violet-400`, `dark:text-rose-400`, `dark:text-amber-300`, `dark:text-slate-100`) di atas latar gelap pekat (`dark:bg-slate-950`).
    - **Gutter Nomor Baris (Line Numbers)**: Wajib menyertakan properti `select-none` (`user-select: none`) agar saat mahasiswa melakukan seleksi teks (drag select) atau salin manual, angka nomor baris tidak ikut tercopy sebagai teks liar ke clipboard.
    - **Tombol Salin (Clipboard Copy)**: Tombol salin kode WAJIB menyalin string kode mentah bersih runnable (*clean raw string*), bukan elemen atau tag renderan HTML.

14. **Standar Sinkronisasi Semantik Warna Lintas Representasi (Naratif, Flowchart, Pseudocode)**:
    - Seluruh representasi dalam visualizer dan converter (seperti *Tri-Converter Lab*) wajib menggunakan token warna semantik yang identik:
      - **Input / Masukan**: Biru Royal (`text-blue-700 dark:text-blue-400`, `bg-blue-500/10`, jajar genjang input).
      - **Proses / Kalkulasi / Assignment**: Ungu / Violet (`text-purple-700 dark:text-purple-400`, `bg-purple-500/10`, persegi panjang proses).
      - **Output / Keluaran**: Hijau Emerald (`text-emerald-700 dark:text-emerald-300`, `bg-emerald-500/10`, jajar genjang output).
      - **Percabangan / Kondisi**: Amber / Emas pekat (`text-amber-700 dark:text-amber-300`, belah ketupat `#451a03` border amber).
      - **Operator Matematika & Relasional**: Merah Mawar / Rose tegas (`text-rose-600 dark:text-rose-400 font-bold`).
      - **Angka / Literal Numerik**: Amber / Oranye (`text-amber-600 dark:text-amber-400`).
      - **Variabel**: Biru Langit / Sky (`text-sky-800 dark:text-sky-300 font-medium`).
      - **Nomor Langkah Naratif**: Hijau Emerald / Teal (`text-emerald-700 dark:text-emerald-400 font-bold`).
    - **Editor Masukan Interaktif**: Pada panel konverter yang dapat disunting mahasiswa, WAJIB menggunakan editor interaktif ber-syntax-highlighting (seperti `react-simple-code-editor`), bukan `<textarea>` monokrom polos.

15. **Standar Ergonomi Dimensi Kartu Flip & Proteksi Overflow Teks**:
    - **Tinggi Kartu Proporsional**: Pada layout grid multi-kolom (misalnya 5 kolom pada 5 Ciri Algoritma Knuth), tinggi kartu harus memadai minimal `min-h-[245px]` (responsif: `h-[245px] sm:h-[255px] md:h-[265px]` atau lebih) agar ruang konten di sisi balik (flip/back face) memuat 5–7 baris penjelasan tanpa menabrak batas footer atau tepi bawah kartu.
    - **Larangan Teks Statis `text-white` pada Elemen Dinamis**:
      - **DILARANG KERAS** menggunakan kelas `text-white` secara statis pada teks konten dalam elemen kartu berlatar `bg-card` atau adaptif tema, karena di Light Mode warna putih akan lenyap (*invisible/washed out*).
      - WAJIB gunakan `text-slate-950 dark:text-white` dengan aksen dekoratif semantik (seperti `underline decoration-*/60 decoration-2` atau warna semantik bertema).
    - **Proteksi Overflow Teks Footer**:
      - Gunakan `line-clamp-2` (bukan `truncate`) pada catatan ringkasan atau takeaway di bagian bawah kartu agar teks yang panjang dapat mengalir secara alami menjadi 2 baris dan tidak terpotong kasar dengan `...` di tengah kata atau menabrak border.
      - Sediakan ruang bawah yang cukup (`p-4` atau `p-4.5` dengan `space-y-2`) agar layout fleksibel dan estetik.

16. **Standar Kelengkapan Dual-Language (Python & JavaScript) pada Simulator & Lab Interaktif**:
    - **Wajib Dua Bahasa Sekaligus**: Seluruh modul lab interaktif, visualizer memori/stack/RAM, interactive playground, dan simulator alur kerja algoritma di setiap bab perkuliahan WAJIB menyediakan implementasi dalam **KEDUA BAHASA PEMROGRAMAN SEKALIGUS (Python & JavaScript)** dengan tab/toggle pemilih bahasa (`activeTab: 'python' | 'javascript'`).
    - **DILARANG KERAS** hanya menyediakan salah satu bahasa (misalnya hanya JavaScript saja atau hanya Python saja). Platform ini berlandaskan pedagogi komparasi dwibahasa, sehingga mahasiswa berhak melihat bagaimana konsep yang sama diimplementasikan dalam Python maupun JavaScript secara berdampingan.

17. **Fitur Reset Password Mahasiswa oleh Dosen (Ke Default NIM)**:
    - Lokasi: `/lecturer/dashboard`.
    - Kolom aksi tabel: "Reset ke NIM" dengan dialog modal konfirmasi eksplisit sebelum tindakan dieksekusi.
    - Status Akun: Pill badge `Default NIM` (mahasiswa belum mengubah password) vs `Kustom` (mahasiswa telah mengubah password mandiri).
    - Endpoint Backend: `POST /api/lecturer/reset-password` menggunakan Supabase Service Role Admin Client untuk mengupdate password akun di `auth.users` ke nilai NIM yang bersangkutan, serta menyinkronkan metadata `password_is_default = true`.
    - Hak Akses: Wajib dilindungi otentikasi peran `dosen` pada level server API.

18. **Dashboard Mahasiswa: Desain Kartu Compact 16 Pertemuan & Kebebasan Akses Bab**:
    - Lokasi: `/student/dashboard`.
    - Menggunakan tata letak grid responsif 4 kolom kartu compact berdimensi minimal `min-h-[148px]` yang memuat seluruh 16 minggu perkuliahan semester.
    - 3 Status Visual Kartu:
      1. `Selesai`: Menampilkan nilai, lencana capaian visual, status capaian (*Sempurna*, *Bagus*, atau *Remedial*), serta tombol cepat menuju rapor/ulas nilai (`/student/meeting/[id]`).
      2. `Tersedia`: Pertemuan aktif siap dikerjakan dengan border putus-putus (*dashed*), badge `Tersedia`, dan tombol langsung `Mulai Tes`. Mahasiswa bebas mengerjakan bab manapun yang tersedia tanpa penguncian sekuensial yang kaku (misal: jika sudah bab 3 dan 5, tetap bebas mengambil tes bab 1).
      3. `Segera / Terkunci`: Pekan semester lanjutan dengan indikator gembok redup.
    - Banner Hero Motivasional: Menekankan nilai konsistensi belajar, tombol akses cepat ke materi yang belum selesai, dan motivasi melakukan perbaikan/remedial bagi capaian di bawah A.

19. **Standar Penyajian Halaman Teori (Sub-Materi Tertutup / Collapsed by Default)**:
    - Lokasi: Seluruh komponen materi bab perkuliahan (`src/components/theory/Pertemuan[1..N].tsx`).
    - **WAJIB Tertutup Secara Default (`useState(false)`)**: Seluruh akordion sub-materi wajib berada dalam status tertutup saat halaman pertama kali dibuka mahasiswa.
    - Struktur Kartu Sub-Materi Wajib:
      - Ikon semantik dan judul sub-bab yang tegas.
      - Indikator Capaian Pembelajaran baku:
        `<div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-semibold"><CheckCircle2 className="w-4 h-4 text-emerald-500" /><span>Capaian: [ringkasan kompetensi]</span></div>`
      - Tombol toggle chevron (`ChevronDown`).
    - Rasional Pedagogis & Teknis:
      - Menghindari kelelahan menggulir (*infinite scroll fatigue*) dan *cognitive overload*.
      - Mencegah *massive layout shift* akibat render komputasi berat (animasi SVG flowchart, interactive code playground, timeline, lab).
      - Menjadikan tinggi awal halaman sangat ringkas (~800px) sehingga sesi asesmen/kuis di bagian bawah halaman langsung terlihat dan mudah dijangkau mahasiswa.

20. **Larangan Mutlak CSS Global `scroll-behavior: smooth` & Standar Navigasi Ujian**:
    - **DILARANG KERAS** menambahkan `html { scroll-behavior: smooth; }` secara global pada stylesheet aplikasi (`globals.css`).
    - *Alasan Teknis*: Aturan smooth scroll global pada `html` merusak mekanisme *scroll restoration* dan transisi rute Next.js App Router, menyebabkan navigasi dari halaman beranda atau halaman lain tersendat/berhenti di tengah halaman.
    - *Smooth scrolling* hanya boleh dijalankan secara lokal/programmatic melalui JavaScript (misal: tombol "Uji Pemahaman" di sticky sub-header dengan `window.scrollTo({ behavior: 'smooth' })`).
    - Tautan langsung ke asesmen menggunakan format `href="/theory/[id]?startTest=true#assessment"` dengan properti `scroll={false}` pada Next.js `<Link>`.
    - Sticky sub-header pada `/theory/[id]` wajib menyediakan tombol pintas cepat **🏆 Uji Pemahaman** (`Trophy` icon) agar mahasiswa yang sedang membaca materi dapat meluncur ke sesi kuis kapan saja dengan 1 kali klik.

21. **Standar Adaptabilitas Tema Penuh (Dual-Mode: Strict Light vs Dark Theme Harmony)**:
    - **Larangan Keras Hardcoding Latar Belakang Gelap**: DILARANG KERAS menggunakan kelas latar belakang gelap (`bg-slate-950`, `bg-slate-900`, `bg-slate-900/90`, `text-slate-100`, `border-slate-800`) secara statis tanpa prefix `dark:` pada elemen pembungkus modul, kontainer lab, toolbar header, kartu materi, dan field input.
    - **Harmoni Tema 100% Konsisten**:
      - **Light Mode (Mode Terang)**: Seluruh kontainer, kartu lab, toolbar, dan area kerja WAJIB berlatar terang bersih (`bg-card`, `bg-white`, `bg-slate-50`, `bg-slate-100/80`), border halus (`border-slate-200/80` / `border-border`), teks utama gelap tegas (`text-slate-900`, `text-slate-800`), serta token warna jenuh berkontras tinggi (*deep jewel tones*).
      - **Dark Mode (Mode Gelap)**: Seluruh kontainer dan kartu beralih ke warna gelap pekat (`dark:bg-slate-950`, `dark:bg-slate-900`), border gelap (`dark:border-slate-800`), teks cerah (`dark:text-slate-100`), serta token warna neon bercahaya (*luminous*).
    - **Pemberantasan Anomali "Black Slab"**: Menghilangkan tampilan kotak hitam pekat yang "bocor" atau terisolasi di tengah halaman saat pengguna memilih Mode Terang.

22. **Standar Anti-Clipping Simbol Flowchart & Safe Margins Geometri (Zero Boundary Collision)**:
    - **Prinsip Bebas Tubrukan Batas (Zero Clipping)**: Teks instruksi di dalam simbol flowchart (khususnya Jajar Genjang Input/Output dan Belah Ketupat Decision) WAJIB berada sepenuhnya di dalam batas simbol dengan *safe inner margin* minimal 15–20px di setiap sisi miring. Teks DILARANG KERAS menabrak, memotong, atau menembus garis tepi polygon.
    - **Kompensasi Sudut Miring Parallelogram**: Sisi miring parallelogram memotong area horizontal sebesar 20–30px di kedua ujung. Untuk teks instruksi berkarakter panjang (seperti `input(var1, var2, ...)`, `output("Pesan Lengkap...")`), dimensi lebar simbol WAJIB diperlebar secara proporsional (lebar dasar 250–280px untuk vertikal, 150–200px untuk horizontal) dan ukuran font diskalakan secara dinamis (`9.5px`–`11.5px`), bukan memaksakan font besar statis yang menembus garis tepi.
    - **Perhitungan Kapasitas Monospace**: Huruf monospace berukuran font 12px membutuhkan lebar ~7.2px per karakter. Teks 30 karakter membutuhkan ruang horizontal ~216px. Jika dimasukkan ke dalam parallelogram berlebar 200px dengan kemiringan 25px (lebar aman hanya ~150px), teks dipastikan menabrak tepi. Developer/AI Agent WAJIB memperlebar polygon (misal ke 260px) dan/atau menurunkan font ke 10px–11px.

23. **Standar Kontinuitas Jalur Aktif Flowchart (Unbroken Solid Path to Terminator)**:
    - **Alur Aktif Utuh Tanpa Cacat**: Aliran eksekusi dari cabang yang bernilai benar (True / Ya) WAJIB digambarkan sebagai garis alir solid tebal aktif (`strokeWidth="3.5"`, warna solid cerah seperti emerald `#10b981`) yang menyambung secara kontinu dari port keluar decision, melewati kotak proses/aksi, melalui rel bus pengumpul (*collector bus*), menyatu ke *merge node*, hingga mencapai terminator `SELESAI`.
    - **Larangan Garis Putus-Putus pada Jalur Aktif**: DILARANG KERAS membiarkan segmen rel pengumpul (collector bus) tetap berupa garis putus-putus (*dashed line*) abu-abu saat cabang yang menuju ke sana sedang aktif dieksekusi. Garis putus-putus hanya digunakan untuk jalur yang sedang tidak aktif / dilewati (*skipped*).

24. **Standar Pencegahan Warna Pastel Pudar pada Diagram SVG di Mode Terang (Anti-Washed Out Graphic Tokens)**:
    - **Larangan Teks & Latar Pastel Pudar**: Pada seluruh diagram SVG dan simbol flowchart, DILARANG KERAS menggunakan warna pastel muda (seperti hijau muda `#a7f3d0`, pink muda `#fda4af`, teks putih di atas latar terang, atau teks abu-abu redup di latar putih) pada elemen aksi/output di Mode Terang (*Light Mode*).
    - **Dual-Mode High Contrast Token**:
      - **Mode Terang (Light Mode)**: Menggunakan latar lembut dengan border tegas (`fill="#ecfdf5"` border `#059669` untuk sukses/true; `fill="#fff1f2"` border `#e11d48` untuk gagal/false) dan teks warna jenuh pekat (*deep jewel tones*, misal `fill="#064e3b"` atau `fill="#881337"` dengan `fontWeight="900"`).
      - **Mode Gelap (Dark Mode)**: Menggunakan latar belakang gelap pekat (`dark:fill-slate-950` / `dark:fill-emerald-950/80`) dengan teks cerah kontras tinggi (`dark:fill-emerald-200`, `dark:fill-rose-200`).

25. **Standar Audit Forensik, Normalisasi Database & Kebijakan Pedagogis Integritas Asesmen**:
    - **Protokol Forensik Empat Vektor**: Audit integritas pengerjaan esai mahasiswa wajib menggunakan 4 indikator ilmiah terukur:
      1. *Superhuman Ingestion*: Kecepatan ketik tidak wajar ($> 60$–$100$ WPM) pada teks panjang dengan waktu pengerjaan ekstrem singkat.
      2. *Persona/Bot Leaks*: Kehadiran prompt leak atau nama bot LLM (seperti *Hydra*, *Tuan*, respons template chatbot).
      3. *Peer-to-Peer Cross Plagiarism*: Kemiripan kalimat antar-mahasiswa $\ge 50\%$ (Jaccard similarity).
      4. *Smart Transcriber & Hidden Rubric Footprint*: Jawaban mahasiswa yang menyalin dari prompt anti-AI di ponsel/layar kedua terdeteksi melalui ketukan typo transkripsi mekanis (misal `tinggi. yakni`, `'koki'CPU .`) dan kesempurnaan 100% mencakup poin rahasia sistem prompt.
    - **Prosedur Normalisasi Database Bersih**:
      - Setiap tindakan reset data pada `quiz_submissions` WAJIB didahului backup snapshot data mentah dalam format JSON (`scratch/backup_deleted_submissions.json`).
      - Dosen/sistem menghapus rekaman submission yang terbukti curang secara forensik, sehingga view `meeting_grades` dan `overall_grades` otomatis ternormalisasi kembali secara adil.
    - **Pendekatan Pedagogis Kasus Transkripsi Mandiri (Asas Keadilan Humanis)**:
      - Mahasiswa yang terbukti membaca dan mengetik manual dari draf AI di ponsel tidak langsung di-nolkan, melainkan diarahkan pada wawancara verifikasi lisan singkat (*viva voce* di kelas) dan penyesuaian nilai ke batas wajar Grade B/AB (75–80).
    - **Isolasi Nilai View Database**:
      - SQL View `public.meeting_grades` hanya menghitung submission bertipe `'essay', 'exam', 'lab', 'challenge'`. Seluruh aktivitas prasyarat (MCQ atau Gerbang Konsep dengan `quiz_type='quiz'`) berfungsi murni sebagai gerbang pembuka (*gatekeeper*) dan DILARANG mencemari rerata nilai semester mahasiswa.

26. **Standar Arsitektur Dual-Shield Asesmen: Obrolan Santai Pra-Ujian (Warm-Up Chat) & Profiler Golden Baseline**:
    - **Pemanasan Psikologis & Penghapusan Kecemasan Ujian**:
      - Tahap pembuka sebelum Ujian Esai resmi menggunakan modul **Obrolan Santai Pra-Ujian (*Warm-Up Chat*)** bersama persona Dosen Pengampu (Pak Hadiq) via LLM dinamis (`src/components/assessment/WarmupChat.tsx` & `/api/warmup-chat`).
      - Pendekatan ini menurunkan kecemasan (*test anxiety*) dan menghapus insentif menyontek karena obrolan bersifat personal, santai, dan non-formal (*zero incentive to cheat*).
    - **Arsitektur Obrolan 4 Dimensi Dinamis (Bab 1–16)**:
      - Dilarang menggunakan pola percakapan statis/monoton. Setiap minggu menggunakan kombinasi:
        * *Dimensi 1 (Tematik Bab 1–16)*: 16 topik analogi nyata unik (`src/lib/warmup-themes.ts`).
        * *Dimensi 2 (Kesadaran Waktu Nyata)*: Konteks pagi/siang/sore/malam & hari dalam seminggu.
        * *Dimensi 3 (Personal & Empatis)*: Menyapa nama mahasiswa dan mendengarkan kondisi nyata mereka.
        * *Dimensi 4 (Respons Adaptif LLM)*: AI menanggapi cerita mahasiswa sebelum mengalirkan ke topik berikutnya (maksimal 3 putaran/turn).
    - **Perekaman Diam-Diam Profil Baseline Kognitif & Stylometry (*Golden Baseline*)**:
      - Selama mahasiswa mengetik obrolan santai, sistem diam-diam merekam metrik motorik & gaya bahasa biologis murni tanpa rekayasa:
        * *Baseline WPM*: Kecepatan pengetikan alami mahasiswa (umumnya 10–25 WPM saat santai).
        * *Baseline Backspace Ratio*: Kebiasaan tombol koreksi (normal: 8%–18%).
        * *Baseline Stylometric Sample*: Sampel diksi, sintaks, dan struktur kalimat orisinal mahasiswa.
    - **Lini 1 (Benteng Client & Telemetri Real-Time)**:
      - *Delta Burst Limiter*: `filterInputBurst` membatasi pertambahan karakter $\le 15$ karakter per tick/event. Injeksi teks instan dari clipboard / DevTools / ekstensi langsung dibatalkan dengan peringatan animasi ramah.
      - *Drag & Drop Lockout*: Event `onDragOver` dan `onDrop` dikunci rapat (`preventDefault`).
      - *Perekam Telemetri*: Komponen melacak `keystrokeCount` dan `backspaceCount`.
    - **Lini 2 (Backend AI Profiling & Stylometric Verification)**:
      - API penilaian esai (`/api/grade-essay`) menerima `baselineProfile` dan telemetri aktif.
      - *Deteksi Inkonsistensi Gaya Bahasa*: Jika jawaban esai melonjak drastis menjadi super-baku ensiklopedis khas LLM (misal: *"mengejawantahkan"*, *"mereduksi disparitas"*) yang berbeda jauh dari baseline mahasiswa, atau WPM melonjak $> 3\times$ baseline, **nilai esai dibatasi maksimal 75–78 (Grade B/AB)** dengan saran edukatif agar mahasiswa memakai analogi mandiri.
      - *Audit Readiness*: Seluruh telemetri (`wpm`, `backspaceRatio`, `burstAttempts`) tersimpan rapi di kolom `answers_json` pada tabel Supabase `quiz_submissions`.

27. **Standar Kehadiran Sosial Humanis & Nudge Kejujuran (Watching Eyes Effect & Persona "Bapak")**:
    - **Watching Eyes Effect**: Stimulus tatapan ramah figur otoritas moral meningkatkan kesadaran etis (*ethical self-awareness*) dan menekan niat berbuat curang tanpa rasa terintimidasi (Bateson et al., 2006).
    - Form obrolan santai dan lembar pengerjaan esai WAJIB menyertakan foto potret senyum hangat Dosen Pengampu (`/dosen-smile.png`) yang didampingi badge hijau *Integritas Akademik* dan kutipan pendampingan kebapakan: *“Kerjakan dengan tenang ya! Bapak jauh lebih menghargai satu kalimat murni pemikiranmu sendiri daripada sepuluh paragraf salinan mesin. Kamu pasti bisa!”*
    - **Panggilan Persona Dosen Baku ("Bapak")**: Seluruh teks percakapan, prompt sistem LLM, dialog antarmuka, dan instruksi WAJIB menggunakan sebutan persona **"Bapak"** (DILARANG KERAS menggunakan kata "Aku" atau "Saya").

28. **Standar Tata Letak Bersanding 2 Kolom pada Lembar Esai (Dual-Column Side-by-Side Responsive Architecture)**:
    - **Pemisahan Horizontal Bebas Tumpukan (`md:grid-cols-12`)**: Layout pengerjaan esai WAJIB menggunakan format bersanding 2 kolom mulai breakpoint `md:` (≥768px):
      - **Kolom Kiri (`md:col-span-5`)**: Banner dosen ramah + Pesan integritas + Teks pertanyaan soal + Badge standar kelulusan (≥80).
      - **Kolom Kanan (`md:col-span-7`)**: Area pengetikan jawaban (*textarea*) + notifikasi revisi/telemetri + Word counter + Tombol **"Kirim Jawaban"** yang menonjol (`bg-primary`).
    - **Pelebaran Kontainer Proporsional (`max-w-5xl xl:max-w-6xl`)**: Lembar esai diperluas agar seimbang dan selaras dengan lebar konten teori.
    - **Optimasi Viewport Bebas Gulir (*Zero-Scroll Guarantee*)**: Total tinggi vertikal kartu dikompresi menjadi hanya **~340px–370px**. Seluruh elemen penting (pertanyaan soal, textarea, tombol Kirim Jawaban) terjamin tampil 100% utuh dalam satu pandangan mata (*in-viewport*) pada monitor/laptop standar (1366×768 atau 1080p).

29. **Standar Jarak Bebas Estetika Bilah Menempel & Aksen Gradien Puncak Kartu (Sticky Header Clearance & Floating Card Geometry)**:
    - **Offset Navigasi Baku 154px**: Total tinggi elemen menempel (*sticky*) adalah ~134px (Navbar 64px + Sub-header materi ~70px). Seluruh mekanisme *scroll restoration* dan tombol *Uji Pemahaman* WAJIB menggunakan konstanta `headerOffset = 154` (bukan 118px) untuk memberikan ruang napas estetika (*aesthetic breathing room*) sebesar ~20px di bawah bilah sub-header.
    - **Garis Aksen Gradien Relaksasi Puncak Kartu**: Seluruh kartu evaluasi (Kartu Intro, Form Obrolan Santai `WarmupChat`, dan Form Esai `EssayContainer`) WAJIB menyertakan garis gradien halus di puncak kartu: `<div className="w-full h-1 bg-gradient-to-r from-primary via-indigo-500 to-emerald-400 shrink-0" />`.
    - Garis tepi atas, sudut membulat (*rounded corners*), dan bayangan kartu (*drop shadow*) WAJIB tampak utuh mengambang bebas (*floating card*), DILARANG terpotong atau terselip di bawah bilah navigasi menempel.

30. **Standar Arsitektur Energi Ganda Psikologis (Dual-Energy Interface Harmony / Yerkes-Dodson Law)**:
    - **Zona Materi Teori & Laboratorium (Tinggi Semangat / High Arousal)**: Tetap menggunakan tone berenergi tinggi, dinamis, dan semarak (*vibrant jewel tones*, zoom interaktif 1.2x, animasi alir flowchart, flip card 2D tajam, simulator dwibahasa Python & JavaScript) untuk menjaga atensi dan mencegah kantuk saat membedah logika rumit.
    - **Zona Evaluasi & Obrolan Santai (Penenang & Ramah / Low-to-Medium Arousal)**: Menggunakan tone sejuk, menenangkan, humanis, dan minim stres visual (aksen hijau zamrud/slate/indigo lembut, senyum Pak Hadiq, garis gradien halus) untuk menurunkan kecemasan ujian (*exam anxiety*) dan mendorong kejujuran intelektual.
    - **Larangan Menyamaratakan Tone**: DILARANG meredupkan atau menerapkan tone menenangkan pada materi teori, dan sebaliknya DILARANG menggunakan gaya visual agresif/menegangkan pada sesi ujian.

31. **Standar Asesmen Esai Murni & Sequential Progressive Mastery Gateway (Gembok Bertingkat)**:
    - **Evaluasi 100% Esai Murni**: Seluruh evaluasi pemahaman mahasiswa pada platform resmi menggunakan Ujian Esai Interaktif (`ESSAY_BANK` di `src/lib/essay-bank.ts`) yang dinilai otomatis oleh AI Grader berbasis rubrik analitik. Bank soal pilihan ganda (`question-bank.ts`) resmi berstatus arsip/ditiadakan.
    - **Sequential Progressive Mastery Gateway**: Soal esai disajikan satu per satu secara berurutan (5 soal bertingkat per bab). Soal berikutnya HANYA AKAN MUNCUL jika mahasiswa telah memperoleh nilai kelulusan minimal ($\ge 80$) pada soal sebelumnya.
    - **Tiga Pilar Esensial**:
      1. *Grit & Daya Juang*: Membangun kegigihan mahasiswa merevisi jawaban berdasarkan umpan balik korektif Dosen AI yang humanis tanpa rasa jemu.
      2. *Anti Bulk-Prompt Dumping*: Menutup celah kecurangan penyalinan semua soal sekaligus ke chatbot AI eksternal.
      3. *Mastery Learning*: Menjamin penguasaan tuntas sub-konsep sebelum melanjutkan ke tingkat kognitif yang lebih kompleks.

32. **Standar Navigasi Beranda Dua Baris 16 Pekan (Two-Row Semester Bar Matrix & Zero Scroll)**:
    - **Akses Cepat Bebas Gulir (*Above-the-Fold*)**: Puncak beranda (`src/app/page.tsx`) menyajikan akses instan ke seluruh 16 pekan materi dalam format matriks 2 baris ramping:
      - Baris 1: Pekan `01` s.d. `08` (Paruh 1 - UTS).
      - Baris 2: Pekan `09` s.d. `16` (Paruh 2 - UAS).
    - **Tipografi Humanis Plus Jakarta Sans**: Wajib menggunakan font modern **Plus Jakarta Sans** (`font-heading font-bold`) dengan penomoran dua digit (`01` s.d. `16`) yang proporsional dan tidak kaku.
    - **Bilah Pratinjau Interaktif 1 Baris**: Disematkan bilah pratinjau ringkas (tinggi 36px) yang langsung memunculkan judul materi dan capaian pembelajaran saat tombol pekan di-hover.

33. **Status Kurikulum Baku Pertemuan 1 s.d. 7 (Strict Immutable & Verified)**:
    - Seluruh materi, laboratorium interaktif dwibahasa (Python & JavaScript), visualizer 4 representasi, modul Pra-Ujian Obrolan Santai (*Warmup Chat*), dan bank 5 soal esai untuk **Pertemuan 1 sampai 7 telah dinyatakan 100% LENGKAP, TERUJI, dan BERSTATUS FIX (SINGLE SOURCE OF TRUTH)**.
    - DILARANG mengubah struktur kurikulum atau mereduksi kedalaman materi Pertemuan 1–7 tanpa instruksi eksplisit dari Dosen Pengampu. Seluruh pengembangan materi lanjutan (Pertemuan 8 s.d. 16) wajib menaati cetak biru pedagogis yang telah dibakukan ini.

34. **Standar Silabus & Alokasi Kurikulum Paruh Kedua (Pertemuan 9 s.d. 16 — 4 SKS / 200 Menit)**:
    - Seluruh AI Agent dan developer WAJIB mematuhi cetak biru silabus resmi paruh kedua semester:
      - **Pekan 09**: Dasar Perulangan (FOR & WHILE Loop) — Iterasi terhitung, iterasi terkondisi, akumulator data.
      - **Pekan 10**: Perulangan Bersarang (Nested Loop) — Iterasi multi-dimensi, alur outer/inner loop, koordinat baris-kolom ($i, j$), pola geometris.
      - **Pekan 11**: Struktur Data Berurutan (List 75% & Tuple 25%) — Manipulasi CRUD List, *slicing*, *Linear Search*, dan proteksi *Immutability Vault* Tuple.
      - **Pekan 12**: Struktur Data Asosiatif (Dictionary 75% & Set 25%) — Key-Value semantik, Set deduplikasi instan, dan puncak **List of Dictionaries** (tabel mini-database terformat & filter dengan `if`).
      - **Pekan 13**: Fungsi Dasar & Top-Down Design — **Wajib TANPA parameter dan TANPA return value**; fokus pada dekomposisi modular masalah, alur kontrol *Call-and-Return*, simbol baku ANSI/ISO **Predefined Process** (`| [Nama] |`), Pseudocode `procedure`, sintaks Python `def` dan JS `function`.
      - **Pekan 14**: Fungsi Lanjutan (Parameter & Return Value) — Parameter Formal vs Argumen Aktual (*positional, named, default*), isolasi *scope lokal vs global* di RAM, mekanisme `return`, **Matriks Keputusan Desain Fungsi 4 Kuadran**, fungsi pemroses *List of Dictionaries*.
      - **Pekan 15**: Penanganan Galat & Teknik Debugging — Taksonomi 3 jenis galat (**Syntax Error**, **Runtime Error / Exception**, dan **Logical Error**), blok pertahanan `try - except - finally` / `try - catch`, analisis *Stack Trace*, dan penelusuran bug (*RAM State Tracing*).
      - **Pekan 16**: Evaluasi Akhir Semester (UAS) & Proyek Terapan — Ujian integrasi seluruh pilar dan perakitan aplikasi terapan modular bebas crash.
    - Setiap pertemuan dirancang untuk durasi **4 SKS (200 Menit)** dengan siklus pedagogis lengkap: Analogi Teori (30-35') $\rightarrow$ Visualizer Lab (40-50') $\rightarrow$ Hands-on Coding Mandiri (35-45') $\rightarrow$ Asesmen Esai AI Bertingkat (35-40').


