export interface EssayQuestion {
  id: string;
  meetingId: number;
  text: string;
  timeLimit: number; // Dalam detik (contoh: 300 = 5 menit)
  rubric: string; // Instruksi rahasia untuk AI Grader
}

export const ESSAY_BANK: EssayQuestion[] = [
  // ==========================================
  // MINGGU 1: Pengenalan Komputer & Bahasa Pemrograman
  // ==========================================
  {
    id: 'm1-essay-1',
    meetingId: 1,
    text: 'Dalam materi interaktif, komputer sering dianalogikan sebagai seorang koki super cepat yang memiliki ingatan fotografis, namun sayangnya ia sama sekali tidak tahu cara memasak tanpa instruksi. Jelaskan kaitan analogi "Koki", "Buku Resep", dan "Bahasa Translator" (seperti Compiler/Interpreter) dalam dunia pemrograman komputer berdasarkan pemahaman Anda sendiri!',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Analogi Koki (30 poin): Harus menjelaskan bahwa koki merepresentasikan Komputer/CPU yang sangat cepat tapi tidak bisa apa-apa tanpa diinstruksikan.
      2. Analogi Buku Resep (35 poin): Harus menjelaskan bahwa buku resep merepresentasikan Program/Algoritma, yakni urutan langkah yang memberi tahu komputer apa yang harus dilakukan.
      3. Analogi Translator (35 poin): Harus menjelaskan bahwa karena bahasa tingkat tinggi (resep) tidak dimengerti langsung oleh koki (mesin), dibutuhkan translator (Compiler/Interpreter) untuk mengubahnya ke bahasa mesin (0 dan 1).
      Berikan nilai maksimal 100 jika ketiga elemen dijelaskan dengan logis. Kurangi proporsional jika ada analogi yang salah tafsir.
    `
  },
  {
    id: 'm1-essay-2',
    meetingId: 1,
    text: 'Mengapa komputer di level perangkat keras (hardware) hanya bisa memahami Bahasa Mesin yang berupa angka biner (0 dan 1)? Jelaskan alasan teknisnya secara sederhana.',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Sifat Elektronik (50 poin): Harus menyinggung bahwa komputer pada dasarnya adalah kumpulan saklar elektronik (transistor).
      2. Logika Biner (50 poin): Menjelaskan bahwa saklar elektronik hanya mengenal dua status kelistrikan: ON (ada arus = 1) dan OFF (tidak ada arus = 0), sehingga semua instruksi harus diterjemahkan ke dalam bahasa biner.
    `
  },
  {
    id: 'm1-essay-3',
    meetingId: 1,
    text: 'Bayangkan jika hingga saat ini tidak pernah diciptakan Bahasa Pemrograman Tingkat Tinggi (seperti Python, JavaScript, Java) dan semua programmer di seluruh dunia harus terus menulis kode dalam Bahasa Mesin (0 dan 1). Jelaskan minimal 2 (dua) dampak negatif yang akan terjadi pada perkembangan teknologi saat ini!',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Dampak 1: Kesulitan & Waktu (50 poin): Membuat program akan sangat lambat, memakan waktu lama, dan rentan terhadap kesalahan manusia (human error).
      2. Dampak 2: Perkembangan Teknologi Terhambat (50 poin): Sedikitnya orang yang bisa memprogram karena sangat sulit dipelajari, sehingga aplikasi modern (game 3D, AI, web raksasa) tidak mungkin bisa dibuat sekompleks sekarang.
    `
  },
  {
    id: 'm1-essay-4',
    meetingId: 1,
    text: 'Jelaskan perbedaan mendasar antara Algoritma dan Program! Berikan satu contoh aktivitas sehari-hari yang bisa disebut sebagai algoritma, namun bukan program komputer.',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Beda Konsep (40 poin): Algoritma adalah ide, rancangan logika, atau urutan langkah penyelesaian masalah (independen dari bahasa mesin). Program adalah implementasi dari algoritma tersebut ke dalam bahasa pemrograman yang bisa dijalankan komputer.
      2. Contoh Logis (60 poin): Menyebutkan urutan instruksi di dunia nyata, misalnya "Resep membuat nasi goreng", "Langkah-langkah mengganti ban mobil", dsb.
    `
  },
  {
    id: 'm1-essay-5',
    meetingId: 1,
    text: 'Apa fungsi utama dari Translator (seperti Compiler atau Interpreter) dalam ekosistem pemrograman? Jelaskan apa yang terjadi jika Anda mencoba menjalankan kode Python langsung ke CPU tanpa menggunakan Translator.',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Fungsi Translator (50 poin): Berfungsi menjembatani manusia dan mesin dengan menerjemahkan instruksi bahasa tingkat tinggi (bahasa manusia) menjadi instruksi bahasa tingkat rendah/mesin (0 dan 1).
      2. Tanpa Translator (50 poin): CPU akan menolak/tidak mengenali teks tersebut ("Syntax Error" / gagal dieksekusi) karena CPU tidak memiliki kemampuan bawaan untuk membaca huruf atau sintaks bahasa manusia.
    `
  },
  
  // ==========================================
  // MINGGU 2: Arsitektur & Organisasi Komputer
  // ==========================================
  {
    id: 'm2-essay-1',
    meetingId: 2,
    text: 'Jelaskan dengan kata-kata Anda sendiri bagaimana siklus *Fetch - Decode - Execute* bekerja di dalam Central Processing Unit (CPU) saat menjalankan sebuah instruksi dari program komputer! Sertakan penjelasan singkat mengenai peran Control Unit (CU) dan Arithmetic Logic Unit (ALU) dalam siklus tersebut.',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Siklus F-D-E (50 poin): Harus menjelaskan bahwa CPU mengambil (Fetch) instruksi dari memori, menerjemahkannya (Decode) agar dimengerti mesin, lalu menjalankannya (Execute).
      2. Peran CU & ALU (50 poin): Harus menyebutkan bahwa Control Unit (CU) berperan sebagai pengatur/mandor yang mengarahkan instruksi, dan ALU berperan sebagai kalkulator untuk operasi matematika atau logika.
    `
  },
  {
    id: 'm2-essay-2',
    meetingId: 2,
    text: 'Mengapa sistem komputer dari tingkat paling dasar (perangkat keras) harus menggunakan Sistem Bilangan Biner (0 dan 1) untuk menyimpan dan mengolah data, bukan Sistem Desimal (0-9) yang biasa digunakan manusia sehari-hari? Berikan alasan teknisnya secara singkat dan logis.',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Sifat Perangkat Keras (50 poin): Harus menjelaskan bahwa komputer terdiri dari sirkuit elektronik dan jutaan saklar kecil (transistor) yang beroperasi dengan arus listrik.
      2. Logika Dua Keadaan (50 poin): Komponen elektronik jauh lebih stabil dan tahan terhadap noise jika hanya membedakan dua keadaan ekstrem: ada tegangan/menyala (1) dan tidak ada tegangan/mati (0), dibandingkan harus membedakan 10 tingkat tegangan berbeda (Desimal).
    `
  },
  {
    id: 'm2-essay-3',
    meetingId: 2,
    text: 'Jelaskan perbedaan mendasar antara istilah "Arsitektur Komputer" dan "Organisasi Komputer"! Berikan contoh konkret untuk memperjelas batas perbedaan keduanya bagi seorang pengembang perangkat lunak (*software developer*).',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Arsitektur Komputer (40 poin): Berkaitan dengan atribut logis sistem yang terlihat oleh pemrogram (seperti set instruksi, format data, mekanisme I/O, pengalamatan memori).
      2. Organisasi Komputer (40 poin): Berkaitan dengan unit-unit operasional fisik dan interkoneksinya yang mewujudkan spesifikasi arsitektur tersebut (seperti sinyal kontrol, teknologi memori, frekuensi clock sirkuit).
      3. Contoh Konkret (20 poin): Misalnya arsitektur x86 didukung oleh banyak prosesor berbeda (Intel vs AMD) dengan organisasi internal fisik yang berbeda.
    `
  },
  {
    id: 'm2-essay-4',
    meetingId: 2,
    text: 'Sistem bilangan Heksadesimal (basis 16) sangat sering digunakan dalam pemrograman komputer (seperti representasi warna web #FF0000 atau alamat memori 0x7FFF). Mengapa Heksadesimal lebih disukai daripada Biner dalam penulisan oleh manusia? Jelaskan hubungan 1 digit Heksadesimal terhadap jumlah bit Biner!',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Keringkasan & Keterbacaan (50 poin): Menjelaskan bahwa bilangan biner terlalu panjang dan rentan salah ketik bagi manusia (misal 11111111 vs FF). Heksadesimal memperpendek penulisan biner secara signifikan.
      2. Konversi Tepat 4 Bit (50 poin): Menjelaskan bahwa 1 digit heksadesimal (0-F) tepat mewakili 4 bit biner (nibble), karena 2^4 = 16. Sehingga 1 Byte (8 bit) selalu pas diwakili oleh tepat 2 digit heksadesimal.
    `
  },
  {
    id: 'm2-essay-5',
    meetingId: 2,
    text: 'Jelaskan konsep hierarki satuan data dalam komputasi dari satuan terkecil Bit hingga Byte, Kilobyte (KB), dan Megabyte (MB)! Mengapa dalam perhitungan kapasitas memori biner, 1 KB bernilai 1024 Byte dan bukan 1000 Byte?',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Hierarki Satuan (50 poin): Menjelaskan bahwa 1 Byte = 8 Bit, dan satuan selanjutnya adalah kelipatan kapasitas penyimpanan memori.
      2. Alasan Basis 2 / 1024 (50 poin): Komputer beroperasi dengan sistem biner (basis 2). Angka 1024 adalah hasil dari 2^10, yang merupakan perpangkatan biner terdekat dengan angka 1000 pada sistem desimal.
    `
  },

  // ==========================================
  // MINGGU 3: Fondasi Algoritma
  // ==========================================
  {
    id: 'm3-essay-1',
    meetingId: 3,
    text: 'Jelaskan secara singkat kelebihan dan kekurangan dari masing-masing teknik penyajian algoritma (Deskriptif Naratif, Flowchart, dan Pseudocode)! Berdasarkan analisis tersebut, teknik mana yang menurut Anda paling cocok dan efektif jika Anda bekerja dalam sebuah tim pembuatan software yang beranggotakan Programmer (Teknis) dan Klien Bisnis (Non-Teknis) secara bersamaan?',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Kelebihan/Kekurangan ke-3 Teknik (60 poin): Menyebutkan Deskriptif (mudah bagi awam tapi bertele-tele bagi programmer), Flowchart (visual jelas tapi makan tempat jika program besar), Pseudocode (sangat terstruktur, mudah diubah ke bahasa asli, tapi awam mungkin kurang paham).
      2. Pemilihan Teknik yang Tepat (40 poin): Jawaban ideal adalah Flowchart (karena menjembatani visual untuk klien dan struktur logika untuk programmer) ATAU kombinasi Deskriptif & Pseudocode yang diberikan alasan masuk akal.
    `
  },
  {
    id: 'm3-essay-2',
    meetingId: 3,
    text: 'Tiga struktur dasar penyusun algoritma adalah Sequential (Berurutan), Selection (Percabangan), dan Looping (Perulangan). Berikan masing-masing 1 (satu) contoh aktivitas Anda di kehidupan nyata (bukan program komputer) yang merepresentasikan ketiga struktur tersebut secara logis!',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Contoh Sequential (30 poin): Harus aktivitas berurutan pasti (misal: Resep membuat mie instan dari merebus air hingga menaburkan bumbu).
      2. Contoh Selection (35 poin): Harus ada kondisi percabangan (misal: JIKA di luar hujan, MAKA bawa payung, JIKA TIDAK, pakai topi).
      3. Contoh Looping (35 poin): Harus ada aktivitas repetitif hingga kondisi terpenuhi (misal: Mengaduk teh TERUS-MENERUS SAMPAI gula larut).
    `
  },
  {
    id: 'm3-essay-3',
    meetingId: 3,
    text: 'Menurut Donald E. Knuth, algoritma yang baik harus memiliki 5 ciri penting: Input, Output, Definiteness (Kepastian), Finiteness (Keterbatasan), dan Effectiveness (Efektivitas). Jelaskan apa yang dimaksud dengan Definiteness dan Finiteness, serta apa akibat fatal yang terjadi jika sebuah algoritma tidak memenuhi sifat Finiteness saat dieksekusi oleh komputer?',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Definiteness (35 poin): Setiap langkah harus jelas, tidak ambigu, dan memiliki makna tunggal sehingga tidak membingungkan mesin/manusia.
      2. Finiteness (35 poin): Algoritma harus memiliki batas langkah dan pada akhirnya HARUS berhenti (ada kondisi terminasi).
      3. Akibat Fatal Tanpa Finiteness (30 poin): Terjadi Infinite Loop (perulangan tanpa henti) yang menyebabkan program hang, freeze, menguras memori/CPU, atau crash.
    `
  },
  {
    id: 'm3-essay-4',
    meetingId: 3,
    text: 'Dalam penyajian algoritma menggunakan diagram alir (Flowchart), sebutkan fungsi dan gambarkan makna dari 3 simbol standar: Terminal (Oval/Kapsul), Process (Persegi Panjang), dan Decision (Belah Ketupat)! Jelaskan mengapa arah panah (Flowline) pada simbol Decision selalu memiliki minimal 2 cabang keluar.',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Tiga Simbol Utama (60 poin): Terminal = Titik awal (Start) & akhir (End); Process = Operasi pengolahan/aritmatika; Decision = Evaluasi kondisi logika.
      2. Alasan 2 Cabang Flowline (40 poin): Decision menguji suatu pernyataan kondisi yang menghasilkan nilai logika Benar (True/Ya) atau Salah (False/Tidak), sehingga harus ada 2 jalur tindakan berbeda berdasarkan hasil evaluasi tersebut.
    `
  },
  {
    id: 'm3-essay-5',
    meetingId: 3,
    text: 'Buatlah rancangan Pseudocode lengkap dan terstruktur sesuai standar materi kuliah untuk mengecek kelayakan seorang calon pendonor darah! (Syarat: Usia minimal 17 tahun DAN berat badan minimal 45 kg). Terapkan struktur 3 Blok Baku (PROGRAM, KAMUS, ALGORITMA), instruksi I/O (input & output), serta struktur percabangan IF-ELSE dengan rapi!',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian Standar Pseudocode Akademik (0-100):
      1. Struktur 3 Blok Baku (30 poin):
         - Blok Header: PROGRAM NamaProgram (misal: PROGRAM CekDonorDarah) beserta komentar ringkas.
         - Blok Deklarasi: KAMUS: (deklarasi variabel seperti usia, berat_badan : integer/float).
         - Blok Eksekusi: ALGORITMA:
      2. Logika Input & Seleksi IF-ELSE (45 poin):
         - Menggunakan instruksi I/O universal: input(usia) dan input(berat_badan).
         - Menggunakan kondisi IF usia >= 17 AND berat_badan >= 45 THEN (wajib memakai operator logika AND/DAN).
         - Menyediakan cabang ELSE jika salah satu atau kedua syarat tidak terpenuhi.
      3. Output & Kerapian Tata Tulis (25 poin):
         - Menggunakan instruksi output(...) untuk mencetak status boleh/tidak boleh donor.
         - Menggunakan penamaan variabel deskriptif (clean code, dilarang singkatan 1 huruf) dan penulisan kata kunci berhuruf kapital.
    `
  },

  // ==========================================
  // MINGGU 4: Tipe Data, Variabel & I/O Dasar
  // ==========================================
  {
    id: 'm4-essay-1',
    meetingId: 4,
    text: 'Dalam pemrograman, mengapa kita membutuhkan tipe data yang berbeda-beda (seperti Integer, Float, String, dan Boolean)? Apa dampaknya terhadap alokasi memori dan operasi aritmatika jika sebuah bahasa pemrograman memperlakukan semua data sebagai String?',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Alasan butuh tipe data (50 poin): Efisiensi memori (ukuran bit berbeda), kejelasan operasi aritmatika vs teks, validasi nilai.
      2. Dampak jika semua String (50 poin): Operasi matematika gagal (misal "10" + "5" jadi "105" bukan 15), memori boros, dan pemrosesan komputasi CPU menjadi lambat.
    `
  },
  {
    id: 'm4-essay-2',
    meetingId: 4,
    text: 'Jelaskan perbedaan mendasar antara Variabel dan Konstanta dalam pemrograman! Berikan 2 contoh data di dunia nyata yang wajib dideklarasikan sebagai konstanta, dan 2 contoh data yang harus dideklarasikan sebagai variabel biasa.',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Beda Variabel vs Konstanta (50 poin): Variabel nilainya dapat berubah selama runtime program; Konstanta nilainya bersifat tetap (immutable) setelah diinisialisasi.
      2. Contoh Logis (50 poin): Konstanta (Nilai Pi 3.14159, Kecepatan Cahaya, Jumlah jam per hari 24); Variabel (Skor pemain, Saldo rekening, Umur pengguna).
    `
  },
  {
    id: 'm4-essay-3',
    meetingId: 4,
    text: 'Apa yang dimaksud dengan Type Casting (Konversi Tipe Data)? Jelaskan perbedaan antara Implicit Casting (Otomatis) dan Explicit Casting (Manual) beserta contoh kasusnya!',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Definisi Type Casting (30 poin): Mengubah nilai dari satu tipe data ke tipe data lainnya.
      2. Implicit vs Explicit (70 poin): Implicit dilakukan otomatis oleh compiler/interpreter tanpa kehilangan data (misal int ke float: 5 -> 5.0); Explicit dipaksa manual oleh programmer (misal float ke int: 9.8 -> 9 atau string ke int: "123" -> 123).
    `
  },
  {
    id: 'm4-essay-4',
    meetingId: 4,
    text: 'Dalam operasi Input/Output (I/O) interaktif, mengapa input yang diterima dari pengguna (misal melalui prompt atau input()) hampir selalu bertipe data String secara default? Apa yang harus dilakukan programmer sebelum menggunakan input tersebut dalam rumus matematika?',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Alasan Default String (50 poin): Keyboard mengirimkan data berupa deretan karakter/teks umum (ASCII/Unicode) tanpa mengetahui apakah pengguna mengetik angka atau huruf.
      2. Solusi Konversi/Casting (50 poin): Programmer harus melakukan parsing / explicit type casting (misal parseInt(), float(), Number()) sebelum melakukan operasi perhitungan.
    `
  },
  {
    id: 'm4-essay-5',
    meetingId: 4,
    text: 'Sebutkan minimal 4 aturan penamaan variabel (Identifier Naming Convention) yang baik dan standar dalam dunia pemrograman, serta jelaskan mengapa penamaan variabel yang deskriptif sangat penting bagi keterbacaan kode (Clean Code)!',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Aturan Penamaan (60 poin): Tidak boleh diawali angka, tidak boleh ada spasi, tidak boleh memakai reserved keyword, case-sensitive, konsisten menggunakan camelCase/snake_case.
      2. Manfaat Keterbacaan (40 poin): Mempermudah debugging, kolaborasi tim, dan pemeliharaan kode (maintainability) jangka panjang tanpa perlu membaca seluruh logika.
    `
  },

  // ==========================================
  // MINGGU 5: Operator, Ekspresi & Manipulasi Data
  // ==========================================
  {
    id: 'm5-essay-1',
    meetingId: 5,
    text: 'Apa perbedaan mendasar antara Operator Aritmatika Pembagian Biasa (/), Pembagian Bulat / Floor Division (// atau div), dan Modulo (%)? Berikan contoh hasil operasi matematika dari ketiga operator tersebut untuk angka 14 dan 4!',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Definisi 3 Operator (60 poin): / menghasilkan nilai desimal/float; // menghasilkan hasil bagi bulat; % menghasilkan sisa bagi.
      2. Contoh 14 dan 4 (40 poin): 14 / 4 = 3.5; 14 // 4 = 3; 14 % 4 = 2.
    `
  },
  {
    id: 'm5-essay-2',
    meetingId: 5,
    text: 'Jelaskan perbedaan antara operator Assignment (=), Equality (==), dan Strict Equality (===)! Mengapa dalam JavaScript atau bahasa modern penggunaan === sangat disarankan dibandingkan ==?',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Perbedaan 3 Operator (60 poin): = untuk mengisi nilai; == membandingkan nilai dengan konversi tipe otomatis (coercion); === membandingkan nilai DAN tipe data secara mutlak.
      2. Alasan Disarankan === (40 poin): Mencegah bug tersembunyi akibat type coercion tak terduga (misal 0 == "0" atau false == "" bernilai True).
    `
  },
  {
    id: 'm5-essay-3',
    meetingId: 5,
    text: 'Jelaskan cara kerja Operator Logika AND (&&), OR (||), dan NOT (!) menggunakan Tabel Kebenaran (Truth Table)! Kapan operator AND menghasilkan nilai TRUE, dan kapan operator OR menghasilkan nilai FALSE?',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Cara Kerja 3 Operator (50 poin): AND = True jika kedua kondisi True; OR = True jika salah satu atau kedua kondisi True; NOT = Membalikkan nilai logika.
      2. Syarat True/False (50 poin): AND hanya True saat (True && True); OR hanya False saat (False || False).
    `
  },
  {
    id: 'm5-essay-4',
    meetingId: 5,
    text: 'Apa yang dimaksud dengan Operator Precedence (Prioritas Operator)? Tentukan dan jelaskan urutan pengerjaan dari ekspresi matematika berikut: `hasil = 5 + 3 * 2 ** 2 > 15 && 10 - 2 == 8`. Apakah nilai akhirnya True atau False?',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Konsep Precedence (30 poin): Aturan hierarki urutan operator mana yang dieksekusi lebih dahulu (Pangkat > Kali/Bagi > Tambah/Kurang > Perbandingan > Logika).
      2. Langkah Tracing (50 poin): 2**2=4 -> 3*4=12 -> 5+12=17 -> 17 > 15 (True) -> 10-2=8 -> 8==8 (True) -> True && True.
      3. Hasil Akhir (20 poin): Menjawab TRUE.
    `
  },
  {
    id: 'm5-essay-5',
    meetingId: 5,
    text: 'Jelaskan apa yang dimaksud dengan Short-Circuit Evaluation pada operator logika (AND dan OR)! Berikan contoh bagaimana konsep ini bisa dimanfaatkan untuk mengoptimalkan performa atau mencegah error (misal pengecekan null/undefined).',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Definisi Short-Circuit (50 poin): Evaluasi logika berhenti segera setelah hasil akhir sudah pasti (pada AND: jika operand kiri False, operand kanan tidak dievaluasi; pada OR: jika operand kiri True, operand kanan tidak dievaluasi).
      2. Contoh Manfaat (50 poin): Mencegah crash pembagian nol atau null pointer (misal: if (user !== null && user.isActive) -> jika user null, user.isActive tidak akan dipanggil sehingga tidak crash).
    `
  },

  // ==========================================
  // MINGGU 6: Struktur Percabangan Tunggal & Ganda (IF - ELSE)
  // ==========================================
  {
    id: 'm6-essay-1',
    meetingId: 6,
    text: 'Jelaskan dengan kata-kata Anda sendiri apa yang dimaksud dengan "Struktur Percabangan" dalam algoritma pemrograman! Mengapa sebuah algoritma memerlukan kemampuan untuk "memilih jalur"? Berikan minimal 2 (dua) contoh situasi kehidupan sehari-hari yang dapat dimodelkan sebagai percabangan (IF-ELSE), dan jelaskan mana yang menjadi kondisi, aksi jika True, dan aksi jika False pada masing-masing contoh.',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Definisi Percabangan (25 poin): Harus menjelaskan bahwa percabangan adalah struktur kontrol yang memungkinkan program mengevaluasi kondisi boolean dan memilih jalur eksekusi yang berbeda berdasarkan hasil evaluasi (True/False).
      2. Alasan Dibutuhkan (25 poin): Menjelaskan bahwa tanpa percabangan, program hanya bisa mengeksekusi instruksi secara linear/berurutan tanpa bisa bereaksi terhadap perbedaan kondisi atau input yang bervariasi.
      3. Contoh 1 (25 poin): Contoh situasi nyata yang logis dengan identifikasi jelas mana kondisi, aksi True, dan aksi False.
      4. Contoh 2 (25 poin): Contoh situasi nyata kedua yang berbeda dari contoh pertama, dengan identifikasi kondisi/True/False yang tepat.
      Contoh contoh yang baik: Lampu lalu lintas (kondisi: ada kendaraan darurat?), ATM (kondisi: saldo cukup?), game (kondisi: HP habis?), tiket bioskop (kondisi: usia >= 12?), dll.
    `
  },
  {
    id: 'm6-essay-2',
    meetingId: 6,
    text: 'Buatlah algoritma lengkap untuk program "Cek Bilangan Positif atau Negatif" menggunakan TIGA representasi berikut:\n\n(A) ALGORITMA NARATIF: Tuliskan langkah-langkah dalam bahasa Indonesia alami.\n(B) PSEUDOCODE STANDAR: Tuliskan dalam format PROGRAM/KAMUS/ALGORITMA yang sesuai standar mata kuliah (variabel deskriptif, operator "=", input(), output(), diakhiri endif).\n(C) KODE PYTHON: Implementasikan dalam bahasa Python dengan sintaks yang benar.\n\nCatatan: Program menerima sebuah bilangan dari pengguna. Jika bilangan > 0, tampilkan "Bilangan Positif"; jika bilangan < 0, tampilkan "Bilangan Negatif"; jika bilangan == 0, tampilkan "Nol". (Gunakan IF tunggal terpisah atau IF-ELSE sederhana untuk dua kondisi utama.)',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      A. Algoritma Naratif (30 poin):
         - Menyebutkan langkah mulai, input bilangan, evaluasi kondisi dengan dua/tiga kemungkinan, output sesuai kondisi, selesai (15 poin).
         - Bahasa naratif jelas, logis, dan tidak ambigu (15 poin).
      B. Pseudocode Standar (40 poin):
         - Ada blok PROGRAM dengan nama deskriptif (5 poin).
         - Ada blok KAMUS dengan nama variabel deskriptif (bukan satu huruf) dan tipe data (10 poin).
         - Sintaks IF menggunakan "then" dan diakhiri "endif" (10 poin).
         - Menggunakan input() dan output() sebagai I/O (5 poin).
         - Logika kondisi benar dan menangani dua atau tiga kasus (10 poin).
      C. Kode Python (30 poin):
         - Sintaks if/elif/else Python benar (15 poin).
         - Logika kondisi sesuai dengan pseudocode (15 poin).
      Kurangi nilai proporsional untuk kesalahan konseptual. Penulisan variabel 1 huruf di KAMUS: kurangi 10 poin. Tidak ada endif: kurangi 10 poin.
    `
  },
  {
    id: 'm6-essay-3',
    meetingId: 6,
    text: 'Jelaskan perbedaan mendasar antara struktur IF tunggal dan struktur IF-ELSE (ganda) dalam algoritma! Kemudian, buatlah PSEUDOCODE STANDAR lengkap untuk program "Penentu Status Kelulusan" dengan kriteria berikut:\n- Input: nilai ujian mahasiswa (0–100)\n- Jika nilai >= 75: tampilkan "LULUS" dan "Selamat, pertahankan prestasi Anda!"\n- Jika nilai < 75: tampilkan "TIDAK LULUS" dan "Anda wajib mengikuti ujian remedial."\n\nJelaskan juga mengapa kasus ini lebih tepat menggunakan IF-ELSE dibandingkan IF tunggal!',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      1. Penjelasan Perbedaan IF vs IF-ELSE (25 poin):
         - IF tunggal: hanya satu jalur aksi (saat True); jika False tidak ada aksi (10 poin).
         - IF-ELSE: dua jalur aksi yang saling eksklusif; selalu ada aksi untuk setiap kondisi (10 poin).
         - Analogi atau contoh pendukung yang tepat (5 poin).
      2. Pseudocode Standar (50 poin):
         - Blok PROGRAM dengan nama deskriptif (5 poin).
         - Blok KAMUS dengan variabel deskriptif dan tipe integer/real (10 poin).
         - Blok ALGORITMA dengan input() (5 poin).
         - Kondisi IF benar (nilai >= 75), menggunakan "then" (10 poin).
         - Blok ELSE ada dan logis (10 poin).
         - Ditutup dengan "endif" (5 poin).
         - Dua output di setiap cabang (True dan False) tercantum (5 poin).
      3. Alasan Penggunaan IF-ELSE (25 poin):
         - Menjelaskan bahwa SETIAP mahasiswa harus mendapat salah satu dari dua status (tidak boleh ada yang "tidak berstatus") (15 poin).
         - Menyebutkan bahwa IF tunggal tidak tepat karena akan membiarkan kondisi False tanpa penanganan eksplisit (10 poin).
    `
  },
  {
    id: 'm6-essay-4',
    meetingId: 6,
    text: 'Ini adalah soal terpadu 4 representasi! Buatlah algoritma lengkap untuk program "Kalkulator Tarif Listrik Sederhana" dengan ketentuan:\n- Pemakaian <= 100 kWh: tarif = Rp500/kWh (pelanggan daya rendah)\n- Pemakaian > 100 kWh: tarif = Rp1.500/kWh (pelanggan daya tinggi)\n- Total tagihan = pemakaian x tarif\n\nSajikan algoritma dalam KEEMPAT representasi berikut:\n(A) NARATIF: Uraian langkah dalam bahasa Indonesia.\n(B) FLOWCHART: Deskripsi tekstual simbol-simbol flowchart yang digunakan (Oval untuk Start/End, Diamond untuk kondisi, dst).\n(C) PSEUDOCODE STANDAR: Format baku PROGRAM/KAMUS/ALGORITMA.\n(D) KODE PYTHON: Implementasi lengkap dengan print output yang informatif.',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      A. Naratif (20 poin):
         - Langkah-langkah lengkap dan logis: mulai, input pemakaian, evaluasi kondisi, hitung tarif, hitung total, tampilkan, selesai (15 poin).
         - Bahasa deskriptif dan mudah dipahami orang tanpa latar programming (5 poin).
      B. Flowchart Tekstual (20 poin):
         - Menyebutkan simbol Oval untuk MULAI dan SELESAI (5 poin).
         - Menyebutkan simbol Jajar Genjang untuk input pemakaian dan output total (5 poin).
         - Menyebutkan simbol Diamond untuk kondisi pemakaian <= 100, dengan dua panah berlabel Ya/Tidak (7 poin).
         - Menyebutkan simbol Rectangle untuk proses kalkulasi tarif dan total (3 poin).
      C. Pseudocode Standar (35 poin):
         - Blok PROGRAM dengan nama deskriptif (3 poin).
         - Blok KAMUS: variabel deskriptif untuk pemakaian (integer/real), tarif (integer), totalTagihan (integer) (10 poin).
         - input() untuk pemakaian listrik (3 poin).
         - IF dengan kondisi benar (<= 100) dan keyword "then" (7 poin).
         - Kalkulasi tarif di kedua cabang (True dan False) (7 poin).
         - Kalkulasi totalTagihan setelah IF-ELSE selesai (3 poin).
         - output() totalTagihan (2 poin).
      D. Kode Python (25 poin):
         - Variabel bermakna, sintaks if/else benar (10 poin).
         - Logika kalkulasi tarif sesuai ketentuan (10 poin).
         - Output informatif menampilkan pemakaian, tarif per kWh, dan total tagihan (5 poin).
    `
  },
  {
    id: 'm6-essay-5',
    meetingId: 6,
    text: 'Berikut adalah sebuah pseudocode yang mengandung BEBERAPA kesalahan sesuai standar mata kuliah:\n\nKAMUS\n   n : integer\n\nALGORITMA\n   input(n)\n   if n > 0\n      output("Positif")\n   else\n      output("Tidak Positif")\n   end\n\nTugasnya:\n(A) Identifikasi SEMUA kesalahan yang ada dalam pseudocode tersebut (sebutkan minimal 4 kesalahan).\n(B) Tulis ulang pseudocode yang BENAR sesuai standar resmi mata kuliah.\n(C) Jelaskan apa tujuan dan manfaat mengikuti standar penulisan pseudocode yang konsisten dalam tim pengembang.',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      A. Identifikasi Kesalahan (40 poin — 10 poin per kesalahan, minimal 4):
         Kesalahan yang ada:
         1. Tidak ada blok PROGRAM di awal (10 poin).
         2. Nama variabel "n" hanya satu huruf — tidak deskriptif, melanggar standar (10 poin).
         3. Sintaks IF tidak menggunakan kata kunci "then" setelah kondisi (10 poin).
         4. Blok IF-ELSE tidak ditutup dengan "endif" — menggunakan "end" yang salah (10 poin).
         Bonus: Menyebutkan KAMUS ada tapi tidak ada nama PROGRAM = kesalahan struktur urutan (5 poin bonus).
      B. Pseudocode yang Benar (40 poin):
         PROGRAM CekBilangan (5 poin)
         KAMUS (5 poin)
            bilanganMasukan : integer (nama deskriptif — 10 poin)
         ALGORITMA (5 poin)
            input(bilanganMasukan) (3 poin)
            if bilanganMasukan > 0 then (5 poin — ada "then")
               output("Positif") (3 poin)
            else (2 poin)
               output("Tidak Positif") (2 poin)
            endif (5 poin — bukan "end")
      C. Manfaat Standar Pseudocode (20 poin):
         - Keterbacaan dan pemeliharaan kode yang lebih baik (5 poin).
         - Komunikasi yang konsisten antar anggota tim — setiap orang membaca format yang sama (7 poin).
         - Konversi ke kode program lebih mudah dan terstruktur (5 poin).
         - Mengurangi ambiguitas saat merancang algoritma sebelum coding (3 poin).
    `
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MINGGU 7: Percabangan Majemuk & Bersarang (Nested IF / ELIF)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'm7-essay-1',
    meetingId: 7,
    text: 'Seorang mahasiswa membuat program penentu kelayakan beasiswa dengan kode Python berikut:\n\nipk = 3.85\nif ipk >= 2.75:\n    status = "Beasiswa Cukup (Perunggu)"\nelif ipk >= 3.25:\n    status = "Beasiswa Prestasi (Perak)"\nelif ipk >= 3.75:\n    status = "Beasiswa Utama (Emas)"\nelse:\n    status = "Tidak Mendapatkan Beasiswa"\n\nTugas Anda:\n(A) Tentukan apa output nilai variabel status jika ipk = 3.85, dan jelaskan secara teknis mengapa komputer menghasilkan output tersebut.\n(B) Jelaskan prinsip dasar Order of Evaluation (urutan evaluasi) dan mekanisme short-circuit pada struktur if - elif - else.\n(C) Tuliskan perbaikan kode Python yang benar agar mahasiswa dengan IPK 3.85 mendapatkan predikat yang adil dan tepat.',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      A. Analisis Output & Akar Masalah (35 poin):
         - Menyebutkan dengan tepat bahwa outputnya adalah "Beasiswa Cukup (Perunggu)" (15 poin).
         - Menjelaskan bahwa kondisi pertama (ipk >= 2.75) langsung bernilai True karena 3.85 >= 2.75 (10 poin).
         - Menjelaskan bahwa setelah cabang pertama True dieksekusi, komputer langsung keluar dari struktur percabangan (10 poin).
      B. Prinsip Order of Evaluation & Short-Circuit (35 poin):
         - Menjelaskan bahwa komputer membaca kondisi berurutan dari atas ke bawah (15 poin).
         - Menjelaskan konsep short-circuit: begitu satu cabang True ditemukan, seluruh elif dan else di bawahnya dilewati (10 poin).
         - Menyimpulkan bahwa kondisi wajib disusun dari yang paling ketat/spesifik ke paling umum/longgar (10 poin).
      C. Perbaikan Kode Python (30 poin):
         - Urutan kondisi dibalik dari terbesar: ipk >= 3.75 (Emas), elif ipk >= 3.25 (Perak), elif ipk >= 2.75 (Perunggu), else (Tidak Dapat) (20 poin).
         - Sintaksis Python benar, indentasi tepat, variabel konsisten (10 poin).
    `
  },
  {
    id: 'm7-essay-2',
    meetingId: 7,
    text: 'Sebuah klinik kesehatan menghitung Body Mass Index (BMI) dengan rumus: BMI = berat / (tinggi * tinggi). Ketentuannya:\n- BMI < 18.5: "Kurus"\n- 18.5 <= BMI < 25.0: "Normal"\n- 25.0 <= BMI < 30.0: "Kelebihan Berat Badan"\n- BMI >= 30.0: "Obesitas"\n\nTugas Anda:\n(A) Tuliskan Algoritma Naratif lengkap untuk menentukan kategori BMI tersebut.\nPERHATIKAN ATURAN PEDAGOGIS:\n1. Seluruh klausa "Jika ...", "Selain itu, jika ...", dan "Selain itu:" WAJIB berada di dalam SATU NOMOR URUT yang sama.\n2. Baris penutup "Selesai" DILARANG memiliki nomor urut.\n(B) Jelaskan mengapa secara logika klausa "Selain itu:" dan "Selain itu, jika:" tidak boleh diberi nomor baru dalam algoritma naratif.',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      A. Algoritma Naratif Sesuai Standar Baku (60 poin):
         - Langkah 1: Input beratBadan dan tinggiBadan (10 poin).
         - Langkah 2: Hitung nilai BMI (10 poin).
         - Langkah 3 (Satu nomor urut untuk seluruh blok keputusan):
           - "3. Jika BMI < 18.5 maka: Tentukan kategori = 'Kurus'" (10 poin).
           - "Selain itu, jika BMI < 25.0 maka: Tentukan kategori = 'Normal'" (10 poin).
           - "Selain itu, jika BMI < 30.0 maka: Tentukan kategori = 'Kelebihan Berat Badan'" (5 poin).
           - "Selain itu: Tentukan kategori = 'Obesitas'" (5 poin).
         - Langkah 4: Tampilkan kategori ke layar (5 poin).
         - Baris terakhir: "Selesai." tanpa nomor urut (5 poin).
      B. Alasan Pedagogis Penomoran Sejajar (40 poin):
         - Menjelaskan bahwa "Selain itu:" adalah cabang alternatif eksklusif (mutually exclusive) dari kondisi yang sama, bukan langkah sekuensial berikutnya (20 poin).
         - Memberi nomor baru pada ELSE akan memberi ilusi bahwa langkah tersebut dieksekusi setelah langkah IF, padahal hanya salah satu cabang yang dieksekusi (20 poin).
    `
  },
  {
    id: 'm7-essay-3',
    meetingId: 7,
    text: 'Wahana ekstrem "Roller Coaster Halilintar" menerapkan syarat keamanan bertingkat (Nested IF):\n1. Pengunjung harus memiliki tinggiBadan >= 140 cm.\n2. Jika tinggi lolos, pengunjung harus berusia >= 12 tahun.\n3. Jika usia lolos, pengunjung tidak boleh memiliki riwayat penyakit jantung (adaRiwayatJantung == false).\nJika lolos ketiga syarat, tampilkan "Silakan Masuk: Memenuhi Syarat Wahana". Jika salah satu syarat gagal, tampilkan alasan penolakan spesifik sesuai gerbang kegagalan.\n\nTugas Anda:\n(A) Tuliskan Pseudocode 3 Blok Baku (PROGRAM, KAMUS, ALGORITMA) menggunakan struktur Nested IF.\n(B) Pastikan mematuhi standar CLRS: nama variabel deskriptif, operator kesamaan ==, operator penugasan =, dan setiap if ditutup dengan endif sejajar.',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      A. Struktur 3 Blok Baku (30 poin):
         - Blok PROGRAM NamaAlgoritma (PascalCase) beserta komentar (10 poin).
         - Blok KAMUS lengkap dengan tipe data (tinggiBadan: integer/real, usia: integer, adaRiwayatJantung: boolean, status: string) (10 poin).
         - Blok ALGORITMA lengkap dengan input (10 poin).
      B. Logika Nested IF & Pesan Penolakan Spesifik (50 poin):
         - if tinggiBadan >= 140 then di tingkat terluar (10 poin).
         - if usia >= 12 then di dalam cabang True tinggiBadan (10 poin).
         - if adaRiwayatJantung == false then di tingkat terdalam (10 poin).
         - Cabang sukses menampilkan pesan lolos wahana (5 poin).
         - Ketiga cabang ELSE memberikan pesan penolakan spesifik sesuai gerbang yang gugur (15 poin).
      C. Kepatuhan Standar CLRS (20 poin):
         - Penggunaan == untuk pembanding dan = untuk penugasan (5 poin).
         - Tepat 3 buah "endif" yang menutup masing-masing blok IF secara sejajar (10 poin).
         - Variabel deskriptif tanpa singkatan 1 huruf (5 poin).
    `
  },
  {
    id: 'm7-essay-4',
    meetingId: 7,
    text: 'Perhatikan program perhitungan diskon kasir berikut:\n\nmember = "REGULER"\nbelanja = 220000\ndiskon = 0\n\nif member == "VIP":\n    diskon = 20\n    if belanja >= 250000:\n        diskon += 5\nelif member == "REGULER":\n    diskon = 10\n    if belanja >= 200000:\n        diskon += 5\nelse:\n    if belanja >= 300000:\n        diskon = 5\n\ntotal_bayar = belanja - (belanja * diskon / 100)\n\nTugas Anda:\n(A) Buatlah tabel penelusuran (trace table) memori RAM baris per baris yang mencatat perubahan nilai variabel member, belanja, diskon, dan total_bayar.\n(B) Berapakah nilai akhir diskon (dalam %) dan total_bayar (dalam Rupiah)? Tunjukkan langkah perhitungannya secara rinci.',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      A. Tabel Penelusuran Memori RAM (50 poin):
         - Inisialisasi: member="REGULER", belanja=220000, diskon=0 (10 poin).
         - Evaluasi if member == "VIP": False (dilewati) (10 poin).
         - Evaluasi elif member == "REGULER": True -> diskon diubah menjadi 10 (15 poin).
         - Evaluasi nested if belanja >= 200000: True (220000 >= 200000) -> diskon diupdate 10 + 5 = 15 (15 poin).
      B. Nilai Akhir & Langkah Perhitungan (50 poin):
         - Nilai akhir diskon = 15% (15 poin).
         - Potongan belanja = 220.000 * 15% = Rp33.000 (15 poin).
         - Total bayar = 220.000 - 33.000 = Rp187.000 (20 poin).
    `
  },
  {
    id: 'm7-essay-5',
    meetingId: 7,
    text: 'Dalam pengembangan perangkat lunak modern, pengembang dapat memilih antara menggunakan percabangan majemuk if - elif - else atau pernyataan pemilihan diskrit switch - case (JavaScript) / match - case (Python 3.10+).\n\nTugas Anda:\n(A) Uraikan perbedaan mendasar antara kedua struktur tersebut dari aspek jenis kondisi dan tipe data yang dapat diuji.\n(B) Berikan 2 contoh kasus nyata di mana match/switch-case JAUH LEBIH TEPAT digunakan dibanding if-elif.\n(C) Jelaskan apa yang dimaksud dengan efek "fall-through" pada switch JavaScript, mengapa efek ini berbahaya jika tidak disengaja, dan bagaimana cara mencegahnya.',
    timeLimit: 300,
    rubric: `
      Kriteria Penilaian (0-100):
      A. Perbedaan Mendasar (35 poin):
         - if-elif dapat menguji rentang nilai (<, >, <=, >=) dan ekspresi logika majemuk (AND, OR), sedangkan switch/match mencocokkan nilai diskrit pasti (equality/pattern) (20 poin).
         - switch/match biasanya hanya menguji satu ekspresi/variabel tunggal terhadap sekumpulan nilai konstanta (15 poin).
      B. Dua Contoh Kasus Nyata (30 poin — 15 poin per kasus):
         - Contoh 1: Menu navigasi aplikasi / CLI / ATM (Pilihan 1, 2, 3, 4) (15 poin).
         - Contoh 2: Konversi kode status HTTP (200, 404, 500) atau nama hari/bulan diskrit (15 poin).
      C. Efek Fall-Through, Bahaya, dan Pencegahan (35 poin):
         - Definisi: Eksekusi program meluncur terus ke case berikutnya tanpa memeriksa kecocokan nilai jika break tidak ditulis (15 poin).
         - Bahaya: Perintah dari case lain yang tidak seharusnya dijalankan akan ikut tereksekusi, menyebabkan bug serius (10 poin).
         - Pencegahan: Menyematkan kata kunci "break;" di akhir setiap blok case, atau beralih ke Python match-case yang tidak memiliki fall-through (10 poin).
    `
  }
];

export function getEssaysByMeetingId(meetingId: number): EssayQuestion[] {
  return ESSAY_BANK.filter((q) => q.meetingId === meetingId);
}

export function getEssayByMeetingId(meetingId: number): EssayQuestion | undefined {
  const essays = getEssaysByMeetingId(meetingId);
  if (essays.length === 0) return undefined;
  return essays[0];
}

