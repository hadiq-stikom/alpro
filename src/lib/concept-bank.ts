export interface ConceptQuestion {
  id: string;
  meetingId: number;
  term: string;
  prompt: string;
  timeLimit: number; // dalam detik (default 90 detik / 1.5 menit)
  keywords: string[];
  rubric: string;
}

export const CONCEPT_BANK: ConceptQuestion[] = [
  // ==========================================
  // PERTEMUAN 1: Pengenalan Komputer & Bahasa
  // ==========================================
  {
    id: 'm1-c1',
    meetingId: 1,
    term: 'Compiler (Kompilator)',
    prompt: 'Jelaskan dengan kata-kata Anda sendiri apa yang dimaksud dengan "Compiler" dan apa peran utamanya dalam pemrograman!',
    timeLimit: 90,
    keywords: ['penerjemah', 'bahasa mesin', 'source code', 'seluruh', 'sekaligus', 'biner'],
    rubric: 'Menjelaskan compiler sebagai program penerjemah kode sumber bahasa tingkat tinggi ke bahasa mesin secara keseluruhan sebelum dieksekusi.'
  },
  {
    id: 'm1-c2',
    meetingId: 1,
    term: 'Interpreter',
    prompt: 'Jelaskan apa itu "Interpreter" dan bagaimana cara kerjanya menerjemahkan kode program jika dibandingkan dengan Compiler!',
    timeLimit: 90,
    keywords: ['penerjemah', 'baris demi baris', 'eksekusi langsung', 'interpreter'],
    rubric: 'Menjelaskan interpreter sebagai penerjemah kode instruksi baris demi baris secara langsung pada saat program berjalan.'
  },
  {
    id: 'm1-c3',
    meetingId: 1,
    term: 'Bahasa Mesin (Machine Code)',
    prompt: 'Jelaskan apa yang dimaksud dengan "Bahasa Mesin" dan mengapa komputer hanya dapat mengeksekusi instruksi dalam format ini!',
    timeLimit: 90,
    keywords: ['biner', '0 dan 1', 'hardware', 'sirkuit', 'arus listrik', 'elektronik'],
    rubric: 'Menjelaskan bahasa mesin sebagai kode instruksi biner (0 dan 1) yang langsung dipahami sirkuit fisik mikroprosesor komputer.'
  },
  {
    id: 'm1-c4',
    meetingId: 1,
    term: 'Bahasa Pemrograman Tingkat Tinggi (High-Level Language)',
    prompt: 'Jelaskan apa yang dimaksud dengan "Bahasa Pemrograman Tingkat Tinggi" dan apa keuntungannya bagi manusia yang menulis program!',
    timeLimit: 90,
    keywords: ['bahasa manusia', 'mudah dibaca', 'inggris', 'abstraksi', 'python', 'javascript'],
    rubric: 'Menjelaskan bahasa pemrograman yang sintaksnya mendekati bahasa manusia/Inggris sehingga mudah dipahami, ditulis, dan dikembangkan.'
  },
  {
    id: 'm1-c5',
    meetingId: 1,
    term: 'Source Code (Kode Sumber)',
    prompt: 'Jelaskan apa yang dimaksud dengan "Source Code" (Kode Sumber) dalam rekayasa perangkat lunak!',
    timeLimit: 90,
    keywords: ['teks', 'instruksi', 'programmer', 'ditulis', 'bahasa pemrograman'],
    rubric: 'Menjelaskan source code sebagai teks instruksi program mentah yang diketik oleh programmer dalam bahasa pemrograman tertentu.'
  },
  {
    id: 'm1-c6',
    meetingId: 1,
    term: 'Bug & Debugging',
    prompt: 'Jelaskan apa arti istilah "Bug" dalam program dan apa aktivitas yang disebut sebagai "Debugging"!',
    timeLimit: 90,
    keywords: ['kesalahan', 'error', 'memperbaiki', 'mencari', 'menemukan'],
    rubric: 'Menjelaskan bug sebagai cacat/kesalahan logika atau sintaks pada program, dan debugging sebagai proses menemukan dan memperbaikinya.'
  },

  // ==========================================
  // PERTEMUAN 2: Arsitektur & Organisasi Komputer
  // ==========================================
  {
    id: 'm2-c1',
    meetingId: 2,
    term: 'CPU (Central Processing Unit)',
    prompt: 'Jelaskan apa fungsi fundamental dari "CPU" dalam sistem komputer!',
    timeLimit: 90,
    keywords: ['otak', 'prosesor', 'instruksi', 'eksekusi', 'menghitung', 'mengontrol'],
    rubric: 'Menjelaskan CPU sebagai otak pemrosesan komputer yang bertugas mengambil, mendekode, dan mengeksekusi instruksi program.'
  },
  {
    id: 'm2-c2',
    meetingId: 2,
    term: 'ALU (Arithmetic Logic Unit)',
    prompt: 'Jelaskan apa tanggung jawab utama dari unit "ALU" yang terdapat di dalam CPU!',
    timeLimit: 90,
    keywords: ['aritmatika', 'matematika', 'logika', 'perhitungan', 'penjumlahan', 'perbandingan'],
    rubric: 'Menjelaskan ALU sebagai komponen CPU yang menjalankan operasi perhitungan matematis dan keputusan logika perbandingan.'
  },
  {
    id: 'm2-c3',
    meetingId: 2,
    term: 'Control Unit (CU)',
    prompt: 'Jelaskan peran "Control Unit" dalam mengatur jalannya proses komputasi!',
    timeLimit: 90,
    keywords: ['mengatur', 'mengendalikan', 'sinyal', 'arus data', 'fetch', 'koordinasi'],
    rubric: 'Menjelaskan Control Unit sebagai pengatur lalu lintas sinyal dan komando yang mengoordinasikan seluruh komponen komputer.'
  },
  {
    id: 'm2-c4',
    meetingId: 2,
    term: 'RAM (Random Access Memory)',
    prompt: 'Jelaskan sifat utama memori "RAM" dan mengapa ia disebut bersifat "Volatile"!',
    timeLimit: 90,
    keywords: ['sementara', 'volatile', 'hilang', 'listrik padam', 'akses cepat', 'memori utama'],
    rubric: 'Menjelaskan RAM sebagai memori kerja utama yang cepat namun bersifat sementara (data hilang saat daya listrik mati/volatile).'
  },
  {
    id: 'm2-c5',
    meetingId: 2,
    term: 'Register CPU',
    prompt: 'Jelaskan apa yang dimaksud dengan "Register" pada prosesor dan apa keunggulannya dibandingkan RAM!',
    timeLimit: 90,
    keywords: ['memori sangat cepat', 'internal CPU', 'kapasitas kecil', 'kecepatan tertinggi'],
    rubric: 'Menjelaskan register sebagai lokasi penyimpanan sementara internal CPU berkecepatan ultra-tinggi untuk menampung operand operasi aktif.'
  },
  {
    id: 'm2-c6',
    meetingId: 2,
    term: 'Siklus Fetch-Decode-Execute',
    prompt: 'Jelaskan secara ringkas 3 langkah dalam siklus "Fetch-Decode-Execute" yang dijalankan prosesor!',
    timeLimit: 90,
    keywords: ['mengambil', 'menerjemahkan', 'menjalankan', 'fetch', 'decode', 'execute', 'siklus instruksi'],
    rubric: 'Menjelaskan alur CPU mengambil instruksi dari memori (fetch), menerjemahkan arti instruksi (decode), dan menjalankannya (execute).'
  },

  // ==========================================
  // PERTEMUAN 3: Fondasi Algoritma
  // ==========================================
  {
    id: 'm3-c1',
    meetingId: 3,
    term: 'Algoritma',
    prompt: 'Jelaskan definisi fundamental dari "Algoritma" dan mengapa ia harus bersifat logis dan terstruktur!',
    timeLimit: 90,
    keywords: ['langkah-langkah', 'urutan', 'logis', 'sistematis', 'menyelesaikan masalah'],
    rubric: 'Menjelaskan algoritma sebagai urutan langkah-langkah logis dan sistematis yang berhingga untuk menyelesaikan suatu permasalahan komputasi.'
  },
  {
    id: 'm3-c2',
    meetingId: 3,
    term: 'Finiteness (Keterhinggaan)',
    prompt: 'Jelaskan mengapa salah satu syarat mutlak algoritma adalah memiliki sifat "Finiteness" (keterhinggaan)!',
    timeLimit: 90,
    keywords: ['berakhir', 'berhenti', 'langkah berhingga', 'terminasi', 'tidak berulang selamanya'],
    rubric: 'Menjelaskan bahwa algoritma harus memiliki titik akhir dan berhenti setelah sejumlah langkah terhingga (tidak mengalami perulangan abadi).'
  },
  {
    id: 'm3-c3',
    meetingId: 3,
    term: 'Definiteness (Kepastian/Kejelasan)',
    prompt: 'Jelaskan apa maksud dari sifat algoritma "Definiteness" (Kepastian) dan apa akibatnya jika instruksi bersifat ambigu!',
    timeLimit: 90,
    keywords: ['jelas', 'tidak ambigu', 'pasti', 'satu arti', 'spesifik'],
    rubric: 'Menjelaskan setiap langkah algoritma harus terdefinisi jelas, tidak bermakna ganda, sehingga komputer dapat mengeksekusinya tanpa keraguan.'
  },
  {
    id: 'm3-c4',
    meetingId: 3,
    term: 'Pseudocode',
    prompt: 'Jelaskan apa itu "Pseudocode" dan apa manfaatnya sebelum menulis kode program yang sebenarnya!',
    timeLimit: 90,
    keywords: ['kode semu', 'bahasa manusia', 'terstruktur', 'notasi', 'rancangan', 'jembatan'],
    rubric: 'Menjelaskan pseudocode sebagai tiruan kode yang menggunakan kombinasi bahasa alami terstruktur untuk memodelkan logika algoritma secara independen dari bahasa pemrograman.'
  },
  {
    id: 'm3-c5',
    meetingId: 3,
    term: 'Flowchart',
    prompt: 'Jelaskan apa yang dimaksud dengan "Flowchart" dan sebutkan minimal 2 simbol standar beserta fungsinya!',
    timeLimit: 90,
    keywords: ['diagram alir', 'grafis', 'simbol', 'terminator', 'proses', 'decision', 'jajar genjang'],
    rubric: 'Menjelaskan flowchart sebagai diagram representasi visual alur logika algoritma menggunakan simbol-simbol standar ANSI/ISO.'
  },
  {
    id: 'm3-c6',
    meetingId: 3,
    term: 'Struktur Sekuensial (Runtunan)',
    prompt: 'Jelaskan bagaimana instruksi dieksekusi dalam "Struktur Sekuensial"!',
    timeLimit: 90,
    keywords: ['berurutan', 'satu per satu', 'dari atas ke bawah', 'runtun', 'langkah berikutnya'],
    rubric: 'Menjelaskan eksekusi instruksi secara linear dari baris pertama hingga terakhir tanpa lompatan atau percabangan.'
  },

  // ==========================================
  // PERTEMUAN 4: Tipe Data, Variabel & I/O Dasar
  // ==========================================
  {
    id: 'm4-c1',
    meetingId: 4,
    term: 'Variabel',
    prompt: 'Jelaskan konsep "Variabel" dalam pemrograman dan apa yang terjadi di memori komputer saat sebuah variabel dideklarasikan!',
    timeLimit: 90,
    keywords: ['penampung', 'wadah', 'memori', 'nilai berubah', 'alamat RAM', 'tipe data'],
    rubric: 'Menjelaskan variabel sebagai lokasi penampung nilai di memori (RAM) yang memiliki nama pengenal dan nilainya dapat berubah selama runtime.'
  },
  {
    id: 'm4-c2',
    meetingId: 4,
    term: 'Konstanta (Constant)',
    prompt: 'Jelaskan apa perbedaan mendasar antara sebuah "Konstanta" dengan "Variabel" biasa!',
    timeLimit: 90,
    keywords: ['tetap', 'tidak berubah', 'nilai tetap', 'konstan', 'read-only'],
    rubric: 'Menjelaskan konstanta sebagai penampung nilai yang bersifat tetap dan tidak dapat dimodifikasi setelah diinisialisasi.'
  },
  {
    id: 'm4-c3',
    meetingId: 4,
    term: 'Tipe Data Integer vs Float (Real)',
    prompt: 'Jelaskan perbedaan mendasar antara tipe data "Integer" dan tipe data "Float/Real" beserta contoh nilainya!',
    timeLimit: 90,
    keywords: ['bilangan bulat', 'desimal', 'koma', 'pecahan', 'angka bulat'],
    rubric: 'Menjelaskan integer untuk bilangan bulat (misal 5, -10) sedangkan float/real untuk bilangan yang memiliki pecahan/desimal (misal 3.14, 0.5).'
  },
  {
    id: 'm4-c4',
    meetingId: 4,
    term: 'Tipe Data Boolean',
    prompt: 'Jelaskan karakteristik tipe data "Boolean" dan mengapa tipe data ini sangat penting dalam pengambilan keputusan komputasi!',
    timeLimit: 90,
    keywords: ['true', 'false', 'benar', 'salah', 'kondisi', 'percabangan'],
    rubric: 'Menjelaskan boolean sebagai tipe data logika yang hanya memiliki dua kemungkinan nilai (true atau false) sebagai fondasi evaluasi kondisi.'
  },
  {
    id: 'm4-c5',
    meetingId: 4,
    term: 'String',
    prompt: 'Jelaskan apa yang dimaksud dengan tipe data "String" dan bagaimana penulisannya dibedakan dari nama variabel!',
    timeLimit: 90,
    keywords: ['teks', 'karakter', 'tanda kutip', 'rangkaian huruf'],
    rubric: 'Menjelaskan string sebagai kumpulan karakter/teks yang diapit oleh tanda kutip (petik satu atau dua) untuk membedakannya dari identifier kode.'
  },
  {
    id: 'm4-c6',
    meetingId: 4,
    term: 'Kamus (Deklarasi Variabel)',
    prompt: 'Jelaskan apa fungsi blok "KAMUS" dalam standar pseudocode dan mengapa deklarasi tipe data itu penting!',
    timeLimit: 90,
    keywords: ['deklarasi', 'mendaftarkan', 'nama variabel', 'alokasi memori', 'tipe data'],
    rubric: 'Menjelaskan blok kamus sebagai tempat mendeklarasikan nama dan tipe data seluruh variabel yang akan dialokasikan memori sebelum algoritma berjalan.'
  },

  // ==========================================
  // PERTEMUAN 5: Operator, Ekspresi & Manipulasi Data
  // ==========================================
  {
    id: 'm5-c1',
    meetingId: 5,
    term: 'Operator Penugasan (Assignment)',
    prompt: 'Jelaskan apa fungsi dari "Operator Assignment" (=) dan bagaimana arah aliran datanya!',
    timeLimit: 90,
    keywords: ['mengisi', 'memberikan nilai', 'kanan ke kiri', 'menyimpan', 'sama dengan'],
    rubric: 'Menjelaskan operator penugasan berfungsi menyimpan hasil evaluasi ekspresi di sisi kanan ke dalam variabel penampung di sisi kiri.'
  },
  {
    id: 'm5-c2',
    meetingId: 5,
    term: 'Operator Relasional (Perbandingan)',
    prompt: 'Jelaskan fungsi "Operator Relasional" (seperti ==, !=, >, <) dan tipe data apa yang selalu dihasilkan dari operasinya!',
    timeLimit: 90,
    keywords: ['membandingkan', 'dua nilai', 'boolean', 'true false', 'relasi'],
    rubric: 'Menjelaskan operator relasional digunakan untuk membandingkan dua nilai dan selalu menghasilkan nilai bertipe Boolean (True atau False).'
  },
  {
    id: 'm5-c3',
    meetingId: 5,
    term: 'Operator Logika AND vs OR',
    prompt: 'Jelaskan perbedaan mendasar hasil evaluasi antara operator logika "AND" dan operator logika "OR"!',
    timeLimit: 90,
    keywords: ['keduanya benar', 'salah satu benar', 'dan', 'atau', 'kondisi'],
    rubric: 'Menjelaskan AND bernilai true hanya jika kedua kondisi true, sedangkan OR bernilai true jika minimal salah satu kondisi bernilai true.'
  },
  {
    id: 'm5-c4',
    meetingId: 5,
    term: 'Operator Modulo (%)',
    prompt: 'Jelaskan apa fungsi dari operator "Modulo" (%) dalam komputasi dan berikan 1 contoh kasus kegunaannya!',
    timeLimit: 90,
    keywords: ['sisa bagi', 'sisa pembagian', 'ganjil genap', 'kelipatan'],
    rubric: 'Menjelaskan modulo menghasilkan sisa bagi dari pembagian dua bilangan bulat, contohnya untuk menentukan bilangan ganjil atau genap.'
  },
  {
    id: 'm5-c5',
    meetingId: 5,
    term: 'Ekspresi (Expression)',
    prompt: 'Jelaskan apa yang dimaksud dengan sebuah "Ekspresi" dalam pemrograman!',
    timeLimit: 90,
    keywords: ['kombinasi', 'variabel', 'literal', 'operator', 'menghasilkan nilai'],
    rubric: 'Menjelaskan ekspresi sebagai kombinasi operand (variabel, konstanta) dan operator yang dievaluasi komputer untuk menghasilkan suatu nilai baru.'
  },
  {
    id: 'm5-c6',
    meetingId: 5,
    term: 'Type Casting (Konversi Tipe Data)',
    prompt: 'Jelaskan apa itu "Type Casting" dan mengapa programmer perlu mengubah tipe data suatu nilai!',
    timeLimit: 90,
    keywords: ['mengubah', 'konversi', 'tipe data', 'string ke integer', 'perhitungan'],
    rubric: 'Menjelaskan type casting sebagai proses konversi suatu tipe data ke tipe data lain, misalnya mengubah teks angka masukan input menjadi integer agar dapat dihitung.'
  },

  // ==========================================
  // PERTEMUAN 6: Struktur Percabangan Tunggal & Ganda
  // ==========================================
  {
    id: 'm6-c1',
    meetingId: 6,
    term: 'Percabangan (Branching / Selection)',
    prompt: 'Jelaskan apa esensi konsep "Percabangan" dalam algoritma dan mengapa ia membuat komputer tampak "cerdas"!',
    timeLimit: 90,
    keywords: ['keputusan', 'memilih jalur', 'kondisi', 'bercabang', 'evaluasi'],
    rubric: 'Menjelaskan percabangan sebagai struktur yang memungkinkan program memilih dan mengeksekusi instruksi berbeda berdasarkan hasil evaluasi kondisi tertentu.'
  },
  {
    id: 'm6-c2',
    meetingId: 6,
    term: 'Struktur IF-THEN (Percabangan Tunggal)',
    prompt: 'Jelaskan bagaimana alur eksekusi struktur "IF-THEN" dan apa yang terjadi jika kondisi bernilai FALSE!',
    timeLimit: 90,
    keywords: ['kondisi benar', 'dijalankan', 'dilewati', 'false tidak dieksekusi', 'lanjut'],
    rubric: 'Menjelaskan blok statemen hanya dieksekusi jika kondisi bernilai TRUE, dan jika FALSE blok tersebut dilewati langsung ke instruksi berikutnya.'
  },
  {
    id: 'm6-c3',
    meetingId: 6,
    term: 'Struktur IF-THEN-ELSE (Percabangan Ganda)',
    prompt: 'Jelaskan bagaimana struktur "IF-THEN-ELSE" memastikan bahwa tepat satu aksi yang akan dieksekusi oleh program!',
    timeLimit: 90,
    keywords: ['dua pilihan', 'true jalankan if', 'false jalankan else', 'salah satu', 'alternatif'],
    rubric: 'Menjelaskan program menyediakan dua jalur alternatif: jalur IF jika kondisi TRUE, atau jalur ELSE jika kondisi FALSE.'
  },
  {
    id: 'm6-c4',
    meetingId: 6,
    term: 'Kondisi Boolean (Ekspresi Kondisi)',
    prompt: 'Jelaskan apa peran sebuah "Kondisi Boolean" pada gerbang keputusan percabangan!',
    timeLimit: 90,
    keywords: ['penentu', 'evaluasi', 'true atau false', 'menentukan arah', 'belah ketupat'],
    rubric: 'Menjelaskan ekspresi kondisi sebagai parameter penentu arah alur program yang harus dapat dievaluasi secara pasti menjadi True atau False.'
  },
  {
    id: 'm6-c5',
    meetingId: 6,
    term: 'Indentasi Blok Kode',
    prompt: 'Jelaskan pentingnya "Indentasi" dalam penulisan struktur percabangan baik pada pseudocode maupun bahasa pemrograman!',
    timeLimit: 90,
    keywords: ['menjorok', 'kejelasan blok', 'milik cabang', 'keterbacaan', 'hierarki'],
    rubric: 'Menjelaskan indentasi sebagai perataan teks menjorok ke dalam untuk menandai secara visual bahwa baris-baris instruksi tersebut berada di dalam lingkup cabang bersangkutan.'
  },
  {
    id: 'm6-c6',
    meetingId: 6,
    term: 'Merge Node (Titik Temu Alur Flowchart)',
    prompt: 'Jelaskan fungsi dari lingkaran konektor / "Merge Node" setelah cabang IF dan ELSE selesai dieksekusi pada flowchart!',
    timeLimit: 90,
    keywords: ['menyatu kembali', 'titik temu', 'konektor', 'alur utama', 'lingkaran'],
    rubric: 'Menjelaskan merge node sebagai titik temu yang menyatukan kembali jalur-jalur percabangan yang terpisah ke alur instruksi sekuensial berikutnya.'
  },

  // ==========================================
  // PERTEMUAN 7: Percabangan Majemuk & Bersarang
  // ==========================================
  {
    id: 'm7-c1',
    meetingId: 7,
    term: 'Percabangan Majemuk (IF - ELSE IF - ELSE)',
    prompt: 'Jelaskan kapan programmer harus menggunakan struktur percabangan majemuk "IF - ELSE IF - ELSE" dibandingkan IF-ELSE ganda biasa!',
    timeLimit: 90,
    keywords: ['lebih dari dua pilihan', 'banyak kondisi', 'kategori nilai', 'bertingkat'],
    rubric: 'Menjelaskan struktur majemuk digunakan saat terdapat lebih dari dua kondisi/pilihan mutually exclusive yang harus dievaluasi secara berjenjang.'
  },
  {
    id: 'm7-c2',
    meetingId: 7,
    term: 'Nested IF (Percabangan Bersarang)',
    prompt: 'Jelaskan konsep "Nested IF" (Percabangan Bersarang) dan berikan analogi kasus penggunaannya di kehidupan sehari-hari!',
    timeLimit: 90,
    keywords: ['if di dalam if', 'kondisi bertingkat', 'percabangan di dalam cabang', 'syarat lanjutan'],
    rubric: 'Menjelaskan struktur percabangan yang berada di dalam badan blok percabangan lain, untuk mengevaluasi kondisi lanjutan jika kondisi pertama sudah terpenuhi.'
  },
  {
    id: 'm7-c3',
    meetingId: 7,
    term: 'Mutually Exclusive (Kondisi Saling Meniadakan)',
    prompt: 'Jelaskan apa arti sifat "Mutually Exclusive" pada serangkaian kondisi ELSE IF dan apa dampaknya jika salah satu kondisi sudah terpenuhi!',
    timeLimit: 90,
    keywords: ['hanya satu yang jalan', 'saling meniadakan', 'kondisi lain diabaikan', 'keluar dari struktur'],
    rubric: 'Menjelaskan bahwa ketika salah satu kondisi bernilai TRUE dan bloknya dieksekusi, sisa kondisi ELSE IF di bawahnya tidak akan dievaluasi lagi.'
  },
  {
    id: 'm7-c4',
    meetingId: 7,
    term: 'Blok Default (Catch-All ELSE)',
    prompt: 'Jelaskan fungsi penting dari blok "ELSE" penutup paling akhir pada struktur percabangan bertingkat!',
    timeLimit: 90,
    keywords: ['kondisi terakhir', 'jika semua salah', 'penampung akhir', 'fallback', 'default'],
    rubric: 'Menjelaskan else terakhir sebagai jaring pengaman (fallback) yang akan dieksekusi jika seluruh kondisi IF dan ELSE IF sebelumnya bernilai False.'
  },
  {
    id: 'm7-c5',
    meetingId: 7,
    term: 'Evaluasi Short-Circuit',
    prompt: 'Jelaskan konsep "Short-Circuit Evaluation" pada ekspresi kondisi majemuk yang menggunakan operator logika AND atau OR!',
    timeLimit: 90,
    keywords: ['berhenti mengevaluasi', 'efisiensi', 'langsung tahu hasil', 'kondisi pertama'],
    rubric: 'Menjelaskan optimasi evaluasi di mana komputer berhenti memeriksa kondisi kedua jika kondisi pertama sudah cukup untuk menentukan hasil akhir (misal FALSE pada AND atau TRUE pada OR).'
  },
  {
    id: 'm7-c6',
    meetingId: 7,
    term: 'Pemeriksaan Rentang Nilai (Range Checking)',
    prompt: 'Jelaskan bagaimana cara yang benar menguji apakah sebuah nilai variabel "x" berada di dalam rentang antara 70 sampai 80 pada pseudocode!',
    timeLimit: 90,
    keywords: ['x >= 70', 'AND', 'x <= 80', 'operator logika', 'dua pembanding'],
    rubric: 'Menjelaskan penggunaan operator relasional dipadukan operator logika AND (contoh: x >= 70 AND x <= 80), bukan penulisan matematis beruntun 70 <= x <= 80.'
  }
];

/**
 * Mengambil N pertanyaan istilah konsep secara acak untuk sebuah pertemuan.
 * Default mengambil 3 soal.
 */
export function getRandomConceptsByMeetingId(meetingId: number, count: number = 3): ConceptQuestion[] {
  const matching = CONCEPT_BANK.filter((c) => c.meetingId === meetingId);
  if (matching.length === 0) return [];

  // Fisher-Yates Shuffle
  const shuffled = [...matching];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}
