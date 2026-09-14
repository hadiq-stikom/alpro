export interface QuestionOption {
  id: string; // Misal: 'A', 'B', 'C', 'D' (akan di-shuffle nantinya)
  text: string;
}

export interface Question {
  id: string; // Identifier unik soal
  meetingId: number; // Terkait minggu ke-berapa
  text: string; // Teks soal
  options: QuestionOption[]; // Pilihan ganda
  correctOptionId: string; // ID opsi yang benar (harus match dengan salah satu opsi)
  explanation?: string; // Penjelasan setelah kuis selesai
  timeLimit?: number; // Batas waktu spesifik per soal (opsional, jika tidak ada pakai default global)
}

// ----------------------------------------------------------------
export const QUESTION_BANK: Question[] = [
  // --- MINGGU 1: Pengenalan Komputer & Bahasa Pemrograman ---
  {
    id: 'm1-q1',
    meetingId: 1,
    text: 'Dalam materi interaktif, komputer dianalogikan sebagai seorang "Koki Super Cepat". Apa kelemahan utama dari koki ini?',
    options: [
      { id: 'opt1', text: 'Koki tersebut sering melupakan bahan masakan' },
      { id: 'opt2', text: 'Koki tersebut tidak memiliki ingatan sama sekali' },
      { id: 'opt3', text: 'Koki tersebut sama sekali tidak tahu cara memasak tanpa diberikan urutan instruksi' },
      { id: 'opt4', text: 'Koki tersebut hanya bisa membaca instruksi dalam bahasa manusia' }
    ],
    correctOptionId: 'opt3',
    explanation: 'Komputer ibarat koki dengan ingatan fotografis dan kecepatan super, namun tidak bisa melakukan apa-apa tanpa adanya instruksi langkah demi langkah (Algoritma).'
  },
  {
    id: 'm1-q2',
    meetingId: 1,
    text: 'Jika CPU (Central Processing Unit) diibaratkan sebagai otak komputer, maka apa analogi yang paling tepat untuk sebuah "Program Komputer"?',
    options: [
      { id: 'opt1', text: 'Tangan yang mengeksekusi gerakan' },
      { id: 'opt2', text: 'Buku resep terstruktur yang memberitahu langkah demi langkah' },
      { id: 'opt3', text: 'Bahan makanan mentah yang siap dimasak' },
      { id: 'opt4', text: 'Dapur tempat memasak berlangsung' }
    ],
    correctOptionId: 'opt2',
    explanation: 'Program komputer bertindak sebagai "buku resep" yang menuntun CPU untuk mengeksekusi instruksi dari awal hingga membuahkan hasil.'
  },
  {
    id: 'm1-q3',
    meetingId: 1,
    text: 'Bahasa Pemrograman Tingkat Rendah (Low-Level Language) seperti Bahasa Mesin sangat sulit dibaca manusia karena...',
    options: [
      { id: 'opt1', text: 'Hanya menggunakan simbol angka biner (0 dan 1)' },
      { id: 'opt2', text: 'Harus diketik menggunakan keyboard khusus' },
      { id: 'opt3', text: 'Menggunakan kata-kata dalam bahasa Inggris kuno' },
      { id: 'opt4', text: 'Membutuhkan koneksi internet untuk menerjemahkannya' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Bahasa mesin adalah satu-satunya bahasa yang dimengerti langsung oleh komputer, yang hanya terdiri dari rangkaian angka 0 dan 1 (biner).'
  },
  {
    id: 'm1-q4',
    meetingId: 1,
    text: 'Mengapa programmer saat ini lebih banyak menggunakan Bahasa Pemrograman Tingkat Tinggi (High-Level Language) seperti Python atau JavaScript?',
    options: [
      { id: 'opt1', text: 'Karena komputer modern sudah tidak lagi menggunakan bahasa biner (0 dan 1)' },
      { id: 'opt2', text: 'Karena bahasa ini lebih mendekati bahasa manusia, sehingga logika algoritma lebih mudah ditulis dan dipahami' },
      { id: 'opt3', text: 'Karena bahasa tingkat tinggi langsung dieksekusi oleh RAM tanpa lewat CPU' },
      { id: 'opt4', text: 'Karena bahasa tingkat tinggi tidak memerlukan listrik yang besar' }
    ],
    correctOptionId: 'opt2',
    explanation: 'Bahasa pemrograman tingkat tinggi diciptakan agar manusia bisa menulis kode yang mudah dibaca, di-maintenance, dan tidak perlu pusing memikirkan memori biner.'
  },
  {
    id: 'm1-q5',
    meetingId: 1,
    text: 'Bagaimana cara komputer mengeksekusi kode yang ditulis dalam Bahasa Tingkat Tinggi (seperti Python)?',
    options: [
      { id: 'opt1', text: 'CPU langsung membaca teks Python dan menjalankannya secara ajaib' },
      { id: 'opt2', text: 'Monitor menerjemahkan teks tersebut ke dalam piksel warna' },
      { id: 'opt3', text: 'Kode tersebut diterjemahkan terlebih dahulu ke Bahasa Mesin menggunakan Translator (Compiler/Interpreter)' },
      { id: 'opt4', text: 'Programmer harus mengirim email berisi kode tersebut ke server pusat' }
    ],
    correctOptionId: 'opt3',
    explanation: 'Mesin (CPU) tidak mengerti kode Python atau JS. Kita butuh Translator (seperti Interpreter atau Compiler) untuk mengubah kode manusia menjadi bahasa mesin (0 & 1).'
  },

  // --- MINGGU 2: Arsitektur & Organisasi Komputer ---
  {
    id: 'm2-q1',
    meetingId: 2,
    text: 'Siklus utama pemrosesan instruksi di dalam CPU dikenal dengan istilah...',
    options: [
      { id: 'opt1', text: 'Read - Write - Delete' },
      { id: 'opt2', text: 'Fetch - Decode - Execute' },
      { id: 'opt3', text: 'Input - Output - Storage' },
      { id: 'opt4', text: 'Compile - Run - Terminate' }
    ],
    correctOptionId: 'opt2',
    explanation: 'Siklus dasar mesin CPU adalah Fetch (mengambil instruksi dari memori), Decode (menerjemahkan arti instruksi), dan Execute (menjalankan instruksi).'
  },
  {
    id: 'm2-q2',
    meetingId: 2,
    text: 'Perbedaan mendasar antara Organisasi Komputer dan Arsitektur Komputer adalah:',
    options: [
      { id: 'opt1', text: 'Organisasi terkait detail fisik hardware (seperti sirkuit & memori), Arsitektur terkait atribut logis yang terlihat oleh programmer (seperti set instruksi)' },
      { id: 'opt2', text: 'Organisasi membuat software, Arsitektur membuat hardware' },
      { id: 'opt3', text: 'Organisasi hanya membahas RAM, Arsitektur membahas CPU' },
      { id: 'opt4', text: 'Organisasi berkaitan dengan desain luar casing komputer, Arsitektur berkaitan dengan desain motherboard' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Arsitektur berhubungan dengan atribut sistem yang berdampak logis pada program (instruction set, data types). Organisasi berkaitan dengan unit operasional dan interkoneksi hardware.'
  },
  {
    id: 'm2-q3',
    meetingId: 2,
    text: 'Di dalam CPU, terdapat komponen yang bertugas melakukan operasi perhitungan matematika (seperti tambah, kurang) dan operasi logika (seperti AND, OR). Komponen ini disebut...',
    options: [
      { id: 'opt1', text: 'Control Unit (CU)' },
      { id: 'opt2', text: 'Random Access Memory (RAM)' },
      { id: 'opt3', text: 'Arithmetic Logic Unit (ALU)' },
      { id: 'opt4', text: 'Register' }
    ],
    correctOptionId: 'opt3',
    explanation: 'ALU (Arithmetic Logic Unit) adalah "kalkulator"-nya CPU yang secara khusus menangani semua operasi aritmetika dan logika.'
  },
  {
    id: 'm2-q4',
    meetingId: 2,
    text: 'Sistem bilangan Heksadesimal (basis 16) sering digunakan dalam komputasi untuk menyingkat penulisan biner. Dalam sistem Heksadesimal, huruf "F" mewakili nilai desimal...',
    options: [
      { id: 'opt1', text: '10' },
      { id: 'opt2', text: '12' },
      { id: 'opt3', text: '15' },
      { id: 'opt4', text: '16' }
    ],
    correctOptionId: 'opt3',
    explanation: 'Dalam heksadesimal, angka 0-9 sama dengan desimal, sedangkan nilai 10 hingga 15 direpresentasikan dengan huruf A, B, C, D, E, dan F. Jadi, F sama dengan 15.'
  },
  {
    id: 'm2-q5',
    meetingId: 2,
    text: 'Komputer memproses data dalam unit terkecil yang disebut Bit (Binary Digit). Berapakah jumlah bit yang menyusun 1 Byte data?',
    options: [
      { id: 'opt1', text: '2 bit' },
      { id: 'opt2', text: '4 bit' },
      { id: 'opt3', text: '8 bit' },
      { id: 'opt4', text: '1024 bit' }
    ],
    correctOptionId: 'opt3',
    explanation: 'Satu Byte secara standar terdiri dari 8 bit. Byte merupakan satuan dasar untuk menyimpan satu karakter teks (seperti satu huruf ASCII) di memori.'
  },

  // --- MINGGU 3: Fondasi Algoritma ---
  {
    id: 'm3-q1',
    meetingId: 3,
    text: 'Menurut Donald E. Knuth, sebuah algoritma yang baik harus selalu berakhir setelah melakukan sejumlah langkah tertentu (tidak berputar tanpa henti). Ciri algoritma ini dikenal dengan istilah...',
    options: [
      { id: 'opt1', text: 'Definiteness (Kepastian)' },
      { id: 'opt2', text: 'Effectiveness (Efektivitas)' },
      { id: 'opt3', text: 'Finiteness (Keterbatasan)' },
      { id: 'opt4', text: 'Output (Keluaran)' }
    ],
    correctOptionId: 'opt3',
    explanation: 'Finiteness (Keterbatasan) berarti algoritma harus memiliki titik berhenti setelah mengeksekusi sejumlah langkah. Jika algoritma tidak pernah berhenti (infinite loop), maka algoritma tersebut cacat.'
  },
  {
    id: 'm3-q2',
    meetingId: 3,
    text: 'Dalam teknik penyajian algoritma menggunakan Diagram Alir (Flowchart), simbol geometri berbentuk Belah Ketupat (Diamond) digunakan untuk merepresentasikan...',
    options: [
      { id: 'opt1', text: 'Proses perhitungan matematis (Process)' },
      { id: 'opt2', text: 'Titik awal dan akhir program (Terminal)' },
      { id: 'opt3', text: 'Membaca atau menulis data (Input/Output)' },
      { id: 'opt4', text: 'Pengambilan keputusan atau kondisi (Decision)' }
    ],
    correctOptionId: 'opt4',
    explanation: 'Belah ketupat (Decision) digunakan untuk menanyakan sebuah kondisi (Ya/Tidak atau Benar/Salah), yang kemudian akan memecah alur program menjadi dua cabang berbeda.'
  },
  {
    id: 'm3-q3',
    meetingId: 3,
    text: 'Mengapa teknik penyajian menggunakan Pseudocode dianggap sangat ideal bagi seorang Programmer dibandingkan dengan teknik Deskriptif Naratif?',
    options: [
      { id: 'opt1', text: 'Karena Pseudocode bisa langsung dieksekusi oleh mesin CPU tanpa perlu di-*compile*' },
      { id: 'opt2', text: 'Karena Pseudocode menggunakan sintaks dan kata kunci yang terstruktur mirip bahasa pemrograman sungguhan' },
      { id: 'opt3', text: 'Karena Pseudocode hanya berisi gambar-gambar yang mudah dipahami' },
      { id: 'opt4', text: 'Karena Pseudocode tidak memerlukan logika pemecahan masalah' }
    ],
    correctOptionId: 'opt2',
    explanation: 'Pseudocode menyerap struktur logika dan kata kunci (seperti IF, FOR, WHILE) dari bahasa pemrograman, sehingga menerjemahkannya menjadi kode asli jauh lebih cepat dan mudah dibandingkan membaca paragraf naratif.'
  },
  {
    id: 'm3-q4',
    meetingId: 3,
    text: 'Sebuah program kasir dirancang dengan aturan: "Jika total belanja lebih dari Rp 100.000, maka berikan diskon 10%. Jika tidak, jangan berikan diskon." Struktur dasar algoritma apa yang sedang digunakan pada kasus ini?',
    options: [
      { id: 'opt1', text: 'Sequential (Runtunan)' },
      { id: 'opt2', text: 'Selection (Percabangan)' },
      { id: 'opt3', text: 'Looping (Perulangan)' },
      { id: 'opt4', text: 'Declaration (Pendeklarasian)' }
    ],
    correctOptionId: 'opt2',
    explanation: 'Selection (Percabangan) digunakan ketika alur program harus memilih eksekusi aksi berdasarkan suatu kondisi/syarat tertentu (dalam hal ini, syarat total belanja).'
  },
  {
    id: 'm3-q5',
    meetingId: 3,
    text: 'Ketika Anda bermain game balap mobil dan Anda terus menekan tombol "Gas", mobil akan terus bergerak maju sampai Anda melepas tombol tersebut. Program game ini sangat kental mengimplementasikan struktur dasar algoritma, yaitu...',
    options: [
      { id: 'opt1', text: 'Sequential (Runtunan)' },
      { id: 'opt2', text: 'Selection (Percabangan)' },
      { id: 'opt3', text: 'Looping (Perulangan / Repetition)' },
      { id: 'opt4', text: 'Compilation (Kompilasi)' }
    ],
    correctOptionId: 'opt3',
    explanation: 'Looping (Perulangan) digunakan untuk mengeksekusi sebuah aksi secara berulang-ulang selama kondisi tertentu terpenuhi (selama tombol ditekan, jalankan fungsi bergerak maju).'
  },

  // --- MINGGU 4: Tipe Data, Variabel & I/O Dasar ---
  {
    id: 'm4-q1',
    meetingId: 4,
    text: 'Analogi manakah yang paling tepat untuk menggambarkan konsep Variabel dalam pemrograman?',
    options: [
      { id: 'opt1', text: 'Sebuah buku resep yang berisi daftar perintah' },
      { id: 'opt2', text: 'Sebuah kotak berlabel di memori yang menyimpan satu nilai data' },
      { id: 'opt3', text: 'Sebuah mesin yang memproses operasi matematika kompleks' },
      { id: 'opt4', text: 'Sebuah jembatan yang menghubungkan keyboard dan monitor' }
    ],
    correctOptionId: 'opt2',
    explanation: 'Variabel ibarat sebuah kotak atau wadah berlabel di dalam memori komputer (RAM) yang digunakan untuk menyimpan sebuah data secara sementara.'
  },
  {
    id: 'm4-q2',
    meetingId: 4,
    text: 'Berdasarkan aturan standar penamaan identifier (variabel) di sebagian besar bahasa pemrograman, manakah dari nama variabel berikut yang TIDAK VALID?',
    options: [
      { id: 'opt1', text: 'total_harga' },
      { id: 'opt2', text: 'namaMahasiswa' },
      { id: 'opt3', text: '2nd_player' },
      { id: 'opt4', text: '_score' }
    ],
    correctOptionId: 'opt3',
    explanation: 'Nama variabel (identifier) TIDAK BOLEH diawali dengan angka. Nama \'2nd_player\' tidak valid karena diawali dengan angka 2.'
  },
  {
    id: 'm4-q3',
    meetingId: 4,
    text: 'Tipe data primitif yang merepresentasikan nilai kebenaran logika dan hanya memiliki dua kemungkinan nilai (True atau False), disebut...',
    options: [
      { id: 'opt1', text: 'Integer' },
      { id: 'opt2', text: 'String' },
      { id: 'opt3', text: 'Boolean' },
      { id: 'opt4', text: 'Float' }
    ],
    correctOptionId: 'opt3',
    explanation: 'Boolean adalah tipe data logis yang hanya bisa bernilai True (Benar/1) atau False (Salah/0).'
  },
  {
    id: 'm4-q4',
    meetingId: 4,
    text: 'Proses mengubah sebuah tipe data menjadi tipe data lain secara sengaja, misalnya mengubah teks "100" menjadi angka bulat 100 untuk operasi perhitungan, dikenal dengan istilah...',
    options: [
      { id: 'opt1', text: 'Type Casting' },
      { id: 'opt2', text: 'String Concatenation' },
      { id: 'opt3', text: 'Code Compiling' },
      { id: 'opt4', text: 'Data Debugging' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Type Casting (atau konversi tipe data) adalah operasi untuk mengubah struktur dari sebuah data, seperti dari String (teks) ke Integer (angka) agar bisa dijumlahkan.'
  },
  {
    id: 'm4-q5',
    meetingId: 4,
    text: 'Ketika sebuah program meminta input dari pengguna melalui keyboard (contoh perintah input()), secara default (bawaan) data yang ditangkap oleh program akan dibaca sebagai tipe data...',
    options: [
      { id: 'opt1', text: 'Integer (Angka Bulat)' },
      { id: 'opt2', text: 'Float (Angka Desimal)' },
      { id: 'opt3', text: 'Boolean (Benar/Salah)' },
      { id: 'opt4', text: 'String (Teks)' }
    ],
    correctOptionId: 'opt4',
    explanation: 'Secara default, seluruh input dari terminal/keyboard ditangkap sebagai rentetan karakter/teks murni (String). Oleh karena itu diperlukan konversi jika ingin digunakan dalam rumus matematika.'
  },

  // --- MINGGU 5: Operator, Ekspresi & Manipulasi Data ---
  {
    id: 'm5-q1',
    meetingId: 5,
    text: 'Manakah dari ekspresi matematika berikut yang akan menghasilkan sisa bagi (modulo) bernilai 3?',
    options: [
      { id: 'opt1', text: '10 % 5' },
      { id: 'opt2', text: '15 % 4' },
      { id: 'opt3', text: '20 % 6' },
      { id: 'opt4', text: '25 % 7' }
    ],
    correctOptionId: 'opt2',
    explanation: 'Operator modulo (%) menghasilkan sisa pembagian bulat. 15 dibagi 4 adalah 3 dengan sisa pembagian sebesar 3.'
  },
  {
    id: 'm5-q2',
    meetingId: 5,
    text: 'Dalam bahasa pemrograman modern seperti JavaScript, apa perbedaan utama antara operator `==` (Equality) dan `===` (Strict Equality)?',
    options: [
      { id: 'opt1', text: '`==` membandingkan panjang string, sedangkan `===` membandingkan nilai string' },
      { id: 'opt2', text: '`==` mengecek tipe data secara ketat, sedangkan `===` melakukan konversi nilai' },
      { id: 'opt3', text: '`==` membandingkan nilai dan mengizinkan konversi tipe otomatis, sedangkan `===` mengecek kesamaan nilai DAN tipe data mutlak' },
      { id: 'opt4', text: 'Keduanya tidak ada bedanya, hanya gaya penulisan' }
    ],
    correctOptionId: 'opt3',
    explanation: 'Operator `==` akan melakukan type-coercion (misal angka 1 == teks "1" bernilai True). Sedangkan `===` sangat ketat dan menuntut nilai dan tipe datanya persis sama.'
  },
  {
    id: 'm5-q3',
    meetingId: 5,
    text: 'Diberikan dua buah kondisi boolean: A = True dan B = False. Manakah dari ekspresi logika berikut yang akan menghasilkan nilai akhir True?',
    options: [
      { id: 'opt1', text: 'A AND B' },
      { id: 'opt2', text: 'NOT A' },
      { id: 'opt3', text: 'A OR B' },
      { id: 'opt4', text: '(A AND B) AND (NOT B)' }
    ],
    correctOptionId: 'opt3',
    explanation: 'Operator logika OR akan bernilai True jika salah satu saja atau kedua operand bernilai True. Karena A bernilai True, maka A OR B = True.'
  },
  {
    id: 'm5-q4',
    meetingId: 5,
    text: 'Dalam aturan urutan evaluasi (Operator Precedence / PEMDAS), manakah operator berikut yang memiliki prioritas eksekusi paling tinggi jika ditulis tanpa tanda kurung?',
    options: [
      { id: 'opt1', text: 'Penjumlahan (+) dan Pengurangan (-)' },
      { id: 'opt2', text: 'Perkalian (*) dan Pembagian (/)' },
      { id: 'opt3', text: 'Pangkat (**)' },
      { id: 'opt4', text: 'Modulo (%)' }
    ],
    correctOptionId: 'opt3',
    explanation: 'Operator Pangkat (**) memiliki hierarki eksekusi paling tinggi dibandingkan kali, bagi, modulo, tambah, maupun kurang (kecuali jika disela oleh tanda kurung).'
  },
  {
    id: 'm5-q5',
    meetingId: 5,
    text: 'Apa hasil akhir dari eksekusi penggabungan (String Concatenation) teks dan angka berikut di mayoritas bahasa pemrograman: `"5" + 5 + 5`?',
    options: [
      { id: 'opt1', text: '15' },
      { id: 'opt2', text: '510' },
      { id: 'opt3', text: '555' },
      { id: 'opt4', text: 'Akan menghasilkan Error (Syntax Error)' }
    ],
    correctOptionId: 'opt3',
    explanation: 'Karena operand paling pertama berjenis String ("5"), maka operator + tidak berfungsi sebagai penjumlahan aritmatika, melainkan menyambung teks berikutnya secara berurutan, sehingga menghasilkan "555".'
  },

  // --- MINGGU 6: Struktur Percabangan Tunggal & Ganda (IF - ELSE) ---
  {
    id: 'm6-q1',
    meetingId: 6,
    text: 'Pada sebuah flowchart, simbol apakah yang digunakan untuk merepresentasikan sebuah titik KEPUTUSAN atau percabangan (seperti struktur IF)?',
    options: [
      { id: 'opt1', text: 'Persegi Panjang (Rectangle) — karena ia merepresentasikan proses' },
      { id: 'opt2', text: 'Oval (Ellipse) — karena ia adalah titik paling penting' },
      { id: 'opt3', text: 'Jajar Genjang (Parallelogram) — karena digunakan untuk input dan output' },
      { id: 'opt4', text: 'Belah Ketupat (Diamond) — karena ia memiliki dua jalur keluar: "Ya" dan "Tidak"' }
    ],
    correctOptionId: 'opt4',
    explanation: 'Simbol Diamond (Belah Ketupat) adalah simbol universal untuk keputusan/percabangan dalam flowchart. Simbol ini selalu memiliki TEPAT DUA panah keluar yang harus diberi label "Ya" (True) dan "Tidak" (False).'
  },
  {
    id: 'm6-q2',
    meetingId: 6,
    text: 'Perhatikan pseudocode berikut:\n\nPROGRAM Cek\nKAMUS\n   nilai : integer\nALGORITMA\n   input(nilai)\n   if nilai >= 80 then\n      output("Bagus!")\n   endif\n   output("Selesai.")\n\nJika nilai yang dimasukkan adalah 65, apa yang akan ditampilkan program?',
    options: [
      { id: 'opt1', text: '"Bagus!" dan "Selesai." (keduanya tampil)' },
      { id: 'opt2', text: 'Hanya "Bagus!" saja' },
      { id: 'opt3', text: 'Hanya "Selesai." saja' },
      { id: 'opt4', text: 'Program tidak menampilkan apa-apa (error)' }
    ],
    correctOptionId: 'opt3',
    explanation: 'Nilai 65 tidak memenuhi kondisi >= 80, sehingga blok IF dilewati (tidak ada output "Bagus!"). Namun, instruksi output("Selesai.") berada di LUAR blok IF (setelah endif), sehingga ia SELALU dieksekusi tanpa syarat apapun. Hasilnya: hanya "Selesai." yang tampil.'
  },
  {
    id: 'm6-q3',
    meetingId: 6,
    text: 'Apa perbedaan paling mendasar antara struktur IF tunggal dan struktur IF-ELSE saat kondisi yang dievaluasi bernilai FALSE?',
    options: [
      { id: 'opt1', text: 'Pada IF tunggal, program langsung berhenti. Pada IF-ELSE, program mengulangi kondisi dari awal.' },
      { id: 'opt2', text: 'Pada IF tunggal, tidak ada aksi yang dilakukan dan eksekusi berlanjut setelah blok. Pada IF-ELSE, blok ELSE dieksekusi sebagai jalur alternatif.' },
      { id: 'opt3', text: 'Keduanya berperilaku sama persis — tidak ada perbedaan saat kondisi False.' },
      { id: 'opt4', text: 'Pada IF tunggal, blok ELSE tersembunyi dieksekusi. Pada IF-ELSE, program menampilkan pesan error.' }
    ],
    correctOptionId: 'opt2',
    explanation: 'Ini adalah perbedaan kunci: IF tunggal hanya punya SATU jalur aksi (saat True). Jika False, tidak ada aksi dan program lanjut. Sedangkan IF-ELSE menjamin SELALU ada aksi — jika True maka blok IF dieksekusi, jika False maka blok ELSE dieksekusi. Tidak ada kondisi yang "tidak ditangani".'
  },
  {
    id: 'm6-q4',
    meetingId: 6,
    text: 'Dalam pseudocode standar mata kuliah ini, kondisi majemuk untuk IF ditulis sebagai: `if usia >= 18 and status == "aktif" then`. Kapan tepatnya blok instruksi di dalam IF tersebut akan dieksekusi?',
    options: [
      { id: 'opt1', text: 'Saat usia >= 18 ATAU status == "aktif" (salah satu terpenuhi)' },
      { id: 'opt2', text: 'Hanya saat usia >= 18 saja (kondisi kedua diabaikan)' },
      { id: 'opt3', text: 'Saat usia >= 18 DAN status == "aktif" (kedua kondisi harus terpenuhi bersamaan)' },
      { id: 'opt4', text: 'Saat usia < 18 DAN status != "aktif" (kebalikan kondisi)' }
    ],
    correctOptionId: 'opt3',
    explanation: 'Operator logika AND (dan/&&) bersifat konjungtif — SEMUA kondisi yang dihubungkan harus bernilai True agar hasil keseluruhan True. Jadi, blok IF hanya dieksekusi jika usia >= 18 SEKALIGUS status == "aktif". Jika salah satu saja False, keseluruhan kondisi menjadi False.'
  },
  {
    id: 'm6-q5',
    meetingId: 6,
    text: 'Sebuah algoritma naratif berbunyi: "Jika suhu di atas 100 derajat, tampilkan peringatan \'Mendidih!\'; jika tidak, tampilkan \'Belum mendidih.\'". Manakah pseudocode yang paling tepat dan sesuai standar untuk algoritma tersebut?',
    options: [
      { id: 'opt1', text: 'PROGRAM Suhu\nKAMUS\n   s : integer\nALGORITMA\n   input(s)\n   if s > 100\n      output("Mendidih!")\n   else\n      output("Belum mendidih.")\n   end' },
      { id: 'opt2', text: 'PROGRAM CekSuhu\nKAMUS\n   suhuAir : real\nALGORITMA\n   input(suhuAir)\n   if suhuAir > 100 then\n      output("Mendidih!")\n   else\n      output("Belum mendidih.")\n   endif' },
      { id: 'opt3', text: 'input(s)\nif s > 100:\n    print("Mendidih!")\nelse:\n    print("Belum mendidih.")' },
      { id: 'opt4', text: 'PROGRAM CekSuhu\nALGORITMA\n   input(suhuhAir)\n   if suhuhAir > 100 then\n      output("Mendidih!")\n   endif' }
    ],
    correctOptionId: 'opt2',
    explanation: 'Pilihan B adalah yang paling tepat: (1) ada blok PROGRAM dengan nama deskriptif, (2) ada blok KAMUS dengan variabel deskriptif "suhuhAir" bukan "s", (3) sintaks IF menggunakan "then" setelah kondisi, (4) ada blok ELSE untuk kondisi False, dan (5) blok ditutup dengan "endif". Pilihan A: pakai variabel "s" (tidak deskriptif), tidak ada "then", salah penutup "end". Pilihan C: ini kode Python, bukan pseudocode. Pilihan D: tidak ada blok KAMUS dan menggunakan IF tunggal padahal butuh IF-ELSE.'
  },

  // --- MINGGU 7: Percabangan Majemuk & Bersarang (Nested IF / ELIF) ---
  {
    id: 'm7-q1',
    meetingId: 7,
    text: 'Perhatikan potongan kode berikut:\n\nnilai = 88\nif nilai >= 60:\n    grade = "C"\nelif nilai >= 75:\n    grade = "B"\nelif nilai >= 85:\n    grade = "A"\nelse:\n    grade = "D"\n\nBerapakah nilai akhir variabel grade dan mengapa hal tersebut terjadi?',
    options: [
      { id: 'opt1', text: 'grade = "A", karena 88 paling dekat dengan 85' },
      { id: 'opt2', text: 'grade = "C", karena kondisi pertama (nilai >= 60) sudah bernilai True sehingga komputer langsung keluar dari struktur percabangan' },
      { id: 'opt3', text: 'grade = "B", karena kondisi nilai >= 75 menimpa kondisi sebelumnya' },
      { id: 'opt4', text: 'Program error karena urutan angka pada kondisi tidak berurutan naik' }
    ],
    correctOptionId: 'opt2',
    explanation: 'Komputer mengevaluasi percabangan majemuk secara sekuensial dari atas ke bawah. Karena 88 >= 60 bernilai True, blok pertama (grade = "C") langsung dieksekusi dan komputer melakukan short-circuit (keluar dari percabangan). Inilah mengapa kondisi wajib diurutkan dari yang paling ketat/spesifik ke yang paling umum.'
  },
  {
    id: 'm7-q2',
    meetingId: 7,
    text: 'Manakah pernyataan yang paling tepat mengenai karakteristik Percabangan Bersarang (Nested IF)?',
    options: [
      { id: 'opt1', text: 'Semua kondisi IF diuji secara paralel dalam satu siklus CPU' },
      { id: 'opt2', text: 'Blok IF bagian dalam hanya akan dievaluasi jika kondisi pada blok IF bagian luar bernilai True' },
      { id: 'opt3', text: 'Hanya bisa digunakan jika jumlah variabel yang diuji maksimal dua buah' },
      { id: 'opt4', text: 'Pasti menghasilkan waktu eksekusi yang lebih lambat dibanding fungsi perulangan' }
    ],
    correctOptionId: 'opt2',
    explanation: 'Pada Nested IF, blok IF bagian luar bertindak sebagai gerbang prasyarat (gatekeeper). Jika kondisi terluar bernilai False, seluruh blok percabangan di dalamnya akan langsung dilewati dan tidak pernah dievaluasi.'
  },
  {
    id: 'm7-q3',
    meetingId: 7,
    text: 'Dalam standar baku pseudocode CLRS mata kuliah ini, konstruksi kata kunci yang benar untuk menyajikan percabangan majemuk lebih dari dua cabang adalah...',
    options: [
      { id: 'opt1', text: 'if <kondisi1> then ... elseif <kondisi2> then ... else ... endif' },
      { id: 'opt2', text: 'if <kondisi1> : ... elif <kondisi2> : ... else : ...' },
      { id: 'opt3', text: 'switch <kondisi1> then ... case <kondisi2> then ... end' },
      { id: 'opt4', text: 'if <kondisi1> do ... else if <kondisi2> do ... fi' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Standar baku pseudocode menggunakan "if <kondisi> then", diikuti oleh "elseif <kondisi> then" untuk cabang alternatif berikutnya, "else" untuk fallback terakhir, dan ditutup dengan tepat satu "endif". Opsi B adalah sintaks Python, bukan pseudocode.'
  },
  {
    id: 'm7-q4',
    meetingId: 7,
    text: 'Pada bahasa JavaScript, apa dampak yang terjadi jika seorang programmer lupa menyematkan kata kunci "break;" pada akhir sebuah blok "case" di dalam pernyataan switch?',
    options: [
      { id: 'opt1', text: 'Program otomatis melempar syntax error dan gagal dikompilasi' },
      { id: 'opt2', text: 'Terjadi efek fall-through, di mana eksekusi terus meluncur ke case di bawahnya tanpa memeriksa kecocokan nilai' },
      { id: 'opt3', text: 'Nilai variabel yang diuji direset menjadi null atau undefined' },
      { id: 'opt4', text: 'Blok default akan otomatis dieksekusi terlebih dahulu' }
    ],
    correctOptionId: 'opt2',
    explanation: 'Dalam JavaScript (dan bahasa turunan C), tanpa pernyataan "break;", eksekusi akan terus "jatuh" (fall-through) mengeksekusi instruksi pada blok case berikutnya secara beruntun sampai menemukan break atau mencapai akhir switch.'
  },
  {
    id: 'm7-q5',
    meetingId: 7,
    text: 'Perhatikan penelusuran memori RAM berikut:\n\ntotalBelanja = 250000\nmember = "VIP"\ndiskon = 0\n\nif member == "VIP" then\n    diskon = 15\n    if totalBelanja >= 200000 then\n        diskon = diskon + 10\n    endif\nelse\n    if totalBelanja >= 100000 then\n        diskon = 5\n    endif\nendif\n\nBerapakah nilai akhir variabel "diskon" di memori RAM?',
    options: [
      { id: 'opt1', text: '15' },
      { id: 'opt2', text: '25' },
      { id: 'opt3', text: '10' },
      { id: 'opt4', text: '5' }
    ],
    correctOptionId: 'opt2',
    explanation: 'Karena member == "VIP" bernilai True, diskon diisi 15. Selanjutnya, nested IF di dalamnya (totalBelanja >= 200000) bernilai True (250000 >= 200000), sehingga diskon diperbarui menjadi 15 + 10 = 25. Blok ELSE tidak pernah dieksekusi.'
  }
];

/**
 * Mengambil soal-soal berdasarkan ID pertemuan (minggu perkuliahan)
 */
export function getQuestionsByMeetingId(meetingId: number): Question[] {
  return QUESTION_BANK.filter(q => q.meetingId === meetingId);
}
