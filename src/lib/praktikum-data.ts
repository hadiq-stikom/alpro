export interface ObservationRow {
  no: number;
  scenario: string;
  testInput: string;
  expectedTheory: string;
  actualOutput: string;
  measuredMetric: string;
  validationStatus: 'Sesuai' | 'Tidak Sesuai' | 'Belum Diuji';
}

export interface PraktikumModule {
  id: number;
  title: string;
  subtitle: string;
  focusValidation: string;
  focusMeasurement: string;
  capaian: string[];
  dasarTeori: {
    overview: string;
    points: {
      title: string;
      desc: string;
    }[];
  };
  prosedurKerja: string[];
  defaultObservations: ObservationRow[];
  analisisPrompts: string[];
  kesimpulanPrompts: string[];
}

export const PRAKTIKUM_MODULES: PraktikumModule[] = [
  {
    id: 1,
    title: "Tipe Data, Variabel & Operator",
    subtitle: "Pengukuran Alokasi Memori, Presisi Bilangan, dan Validasi Type Safety",
    focusValidation: "Validasi Type Mismatch, pembagian bulat (truncation) vs float, dan string concatenation bug.",
    focusMeasurement: "Pengukuran alokasi byte memori per tipe data (int, float, str, bool) dan perubahan state variabel di RAM.",
    capaian: [
      "Mampu mengidentifikasi karakteristik domain nilai dan alokasi memori fisik per tipe data (integer, float, string, boolean) pada memori komputer.",
      "Mampu membuktikan secara empiris fenomena pemotongan desimal (integer division truncation), konversi tipe data (type casting), dan perilaku string concatenation bug.",
      "Mampu menganalisis implikasi kesalahan pemilihan tipe data terhadap kebenaran logika dan akurasi presisi komputasi program."
    ],
    dasarTeori: {
      overview: "Variabel adalah label nama yang merujuk pada alamat lokasi tertentu di dalam Random Access Memory (RAM). Ketika variabel dideklarasikan, komputer mengalokasikan sejumlah byte memori berdasarkan Tipe Data yang dipilih. Pemilihan tipe data menentukan dua hal fundamental: (1) kapasitas dan domain nilai yang diizinkan, serta (2) jenis operasi matematika/logika yang sah dijalankan pada variabel tersebut.",
      points: [
        {
          title: "1. Alokasi Memori Primitif",
          desc: "Tipe Integer (bilangan bulat) dan Float (bilangan pecahan) memiliki representasi biner yang berbeda di tingkat arsitektur. Bilangan pecahan menggunakan format IEEE 754 (sign, exponent, mantissa) yang membutuhkan alokasi memori dan siklus prosesor lebih tinggi daripada bilangan bulat murni."
        },
        {
          title: "2. Bahaya Pemotongan Desimal (Integer Truncation)",
          desc: "Jika dua bilangan bulat dibagi menggunakan pembagian bulat (seperti operator // pada Python atau pembagian integer di C/Java), bagian pecahan di belakang koma akan dibuang seketika (truncated), bukan dibulatkan. Ini memicu kesalahan logika fatal pada perhitungan sains atau finansial."
        },
        {
          title: "3. Konversi Eksplisit (Type Casting) vs Masukan String",
          desc: "Seluruh masukan pengguna melalui keyboard (input()) secara bawaan ditangkap oleh sistem sebagai tipe String (teks). Menjumlahkan '50' + '10' tanpa type casting akan menghasilkan teks gabungan '5010' (concatenation), bukan penjumlahan numerik 60."
        },
        {
          title: "4. Pembagian dengan Nol (Division by Zero)",
          desc: "Operasi pembagian dengan penyebut nol secara matematika tidak terdefinisi. Dalam komputasi, operasi ini memicu interupsi fatal (ZeroDivisionError/Crash) jika tidak divalidasi terlebih dahulu dengan pra-syarat (precondition)."
        }
      ]
    },
    prosedurKerja: [
      "Buka instrumen editor uji coba di layar praktikum atau gunakan interpreter Python.",
      "Lakukan Uji Kasus 1: Periksa tipe data dan alokasi byte memori dari variabel integer, float, string, dan boolean menggunakan fungsi type() dan penelusuran memori.",
      "Lakukan Uji Kasus 2: Lakukan operasi pembagian 10 / 4 (float division) dan 10 // 4 (integer division). Catat perbedaan hasil dan tipe data kembaliannya pada tabel pengamatan.",
      "Lakukan Uji Kasus 3: Simulasikan masukan teks '75' dan '25'. Lakukan operasi penjumlahan sebelum di-casting ('75' + '25') dan setelah di-casting (int('75') + int('25')). Amati hasilnya.",
      "Lakukan Uji Kasus 4: Jalankan operasi pembagian dengan nilai penyebut 0. Amati pesan respons error yang dihasilkan oleh sistem.",
      "Lakukan Uji Kasus 5: Uji nilai desimal presisi tinggi (misal: 0.1 + 0.2). Amati apakah hasilnya tepat 0.3 atau terdapat fenomena floating-point artifact (misal: 0.30000000000000004).",
      "Catat seluruh hasil pengamatan aktual ke dalam Tabel Pengamatan Bagian C.",
      "Susun uraian analisis mendalam pada Bagian D dan rumuskan kesimpulan akhir pada Bagian E."
    ],
    defaultObservations: [
      {
        no: 1,
        scenario: "Pengukuran Alokasi & Tipe Data Integer",
        testInput: "a = 100; type(a)",
        expectedTheory: "Tipe int, bilangan bulat diskrit",
        actualOutput: "<class 'int'>, 100",
        measuredMetric: "28 byte (Python int object)",
        validationStatus: "Sesuai"
      },
      {
        no: 2,
        scenario: "Pengukuran Alokasi & Tipe Data Float",
        testInput: "b = 100.5; type(b)",
        expectedTheory: "Tipe float, bilangan pecahan presisi",
        actualOutput: "<class 'float'>, 100.5",
        measuredMetric: "24 byte (IEEE 754 double)",
        validationStatus: "Sesuai"
      },
      {
        no: 3,
        scenario: "Uji Pembagian Pecahan (Float Division)",
        testInput: "hasil = 10 / 4",
        expectedTheory: "Menghasilkan 2.5 bertipe float",
        actualOutput: "2.5 (tipe float)",
        measuredMetric: "Presisi desimal dipertahankan",
        validationStatus: "Sesuai"
      },
      {
        no: 4,
        scenario: "Uji Pemotongan Desimal (Integer Truncation)",
        testInput: "hasil = 10 // 4",
        expectedTheory: "Pecahan dibuang, menghasilkan 2",
        actualOutput: "2 (tipe int)",
        measuredMetric: "0.5 desimal terpotong (hilang)",
        validationStatus: "Sesuai"
      },
      {
        no: 5,
        scenario: "Masukan String Tanpa Type Casting",
        testInput: "x = '50'; y = '25'; z = x + y",
        expectedTheory: "Terjadi penggabungan teks '5025'",
        actualOutput: "'5025' (tipe str)",
        measuredMetric: "Operasi string concatenation",
        validationStatus: "Sesuai"
      },
      {
        no: 6,
        scenario: "Masukan dengan Explicit Type Casting",
        testInput: "x = int('50'); y = int('25'); z = x + y",
        expectedTheory: "Penjumlahan aritmatika bernilai 75",
        actualOutput: "75 (tipe int)",
        measuredMetric: "Operasi aritmetika numerik",
        validationStatus: "Sesuai"
      },
      {
        no: 7,
        scenario: "Uji Kasus Ekstrem: Pembagian dengan Nol",
        testInput: "hasil = 100 / 0",
        expectedTheory: "Sistem menolak / memicu exception",
        actualOutput: "ZeroDivisionError: division by zero",
        measuredMetric: "Program berhenti (Crash / Interrupted)",
        validationStatus: "Sesuai"
      },
      {
        no: 8,
        scenario: "Uji Presisi Floating Point (IEEE 754)",
        testInput: "0.1 + 0.2",
        expectedTheory: "Bernilai 0.3",
        actualOutput: "0.30000000000000004",
        measuredMetric: "Penyimpangan biner IEEE 754",
        validationStatus: "Sesuai"
      }
    ],
    analisisPrompts: [
      "Jelaskan mengapa hasil dari operasi 10 // 4 membuang nilai desimal, dan apa implikasi fatalnya jika operator ini secara tidak sengaja digunakan dalam sistem perhitungan diskon atau perbankan!",
      "Berdasarkan hasil pengujian pada skenario 5 dan 6, jelaskan mengapa input dari pengguna secara default dianggap sebagai teks (string), serta mengapa type casting menjadi kewajiban mutlak sebelum melakukan kalkulasi!",
      "Jelaskan temuan Anda pada skenario 8 mengenai hasil 0.1 + 0.2 = 0.30000000000000004! Mengapa fenomena tersebut terjadi di dalam memori komputer dan bagaimana seorang programmer mengantisipasinya?"
    ],
    kesimpulanPrompts: [
      "Tuliskan kesimpulan objektif mengenai pentingnya ketelitian dalam mengidentifikasi tipe data dan operator dalam rekayasa perangkat lunak!",
      "Bagaimana hasil pengujian di laboratorium ini membuktikan bahwa program yang bebas dari pesan error sintaksis belum tentu menghasilkan perhitungan yang benar secara logika?"
    ]
  },
  {
    id: 2,
    title: "Sequence (Input - Proses - Output)",
    subtitle: "Validasi Ketergantungan Alur dan Pengukuran Transisi State Variabel",
    focusValidation: "Validasi ketergantungan urutan instruksi dan akurasi formula matematika.",
    focusMeasurement: "Tracing perubahan nilai variabel baris demi baris dari inisialisasi hingga output.",
    capaian: [
      "Mampu membuktikan sifat deterministik instruksi sekuensial komputer.",
      "Mampu mengukur transisi nilai variabel di memori pada setiap tahapan instruksi."
    ],
    dasarTeori: { overview: "Struktur sekuensial adalah fondasi alur program di mana instruksi dieksekusi tepat satu demi satu sesuai urutan baris tertulis.", points: [] },
    prosedurKerja: [],
    defaultObservations: [],
    analisisPrompts: [],
    kesimpulanPrompts: []
  },
  {
    id: 3,
    title: "Selection (Percabangan)",
    subtitle: "Branch & Boundary Value Coverage Serta Pengukuran Efisiensi Jalur",
    focusValidation: "Validasi ambang batas operator relasional (< vs <=) dan pengujian seluruh cabang logika.",
    focusMeasurement: "Pengukuran rasio jalur dieksekusi vs dilewati (taken vs bypassed).",
    capaian: [
      "Mampu menguji kasus batas (boundary testing) pada struktur percabangan.",
      "Mampu menganalisis efisiensi evaluasi kondisi bertingkat."
    ],
    dasarTeori: { overview: "Percabangan memungkinkan komputer memilih jalur eksekusi berdasarkan evaluasi kondisi boolean.", points: [] },
    prosedurKerja: [],
    defaultObservations: [],
    analisisPrompts: [],
    kesimpulanPrompts: []
  },
  {
    id: 4,
    title: "Looping (Perulangan)",
    subtitle: "Validasi Kondisi Berhenti dan Pengukuran Skalabilitas Kompleksitas Waktu",
    focusValidation: "Validasi termination condition, pencegahan infinite loop, dan pengujian loop 0 iterasi.",
    focusMeasurement: "Pengukuran jumlah iterasi aktual dan waktu eksekusi saat input N meningkat.",
    capaian: [
      "Mampu memvalidasi kekebalan perulangan terhadap infinite loop.",
      "Mampu mengukur pertumbuhan waktu eksekusi terhadap kenaikan beban data N."
    ],
    dasarTeori: { overview: "Perulangan mengeksekusi blok kode secara berulang selama kondisi penguji bernilai benar.", points: [] },
    prosedurKerja: [],
    defaultObservations: [],
    analisisPrompts: [],
    kesimpulanPrompts: []
  },
  {
    id: 5,
    title: "Function (Fungsi & Modularitas)",
    subtitle: "Validasi Kontrak I/O, Isolasi Scope Variabel, dan Tracing Call Stack",
    focusValidation: "Validasi parameter masukan, nilai kembalian, dan isolasi variabel lokal vs global.",
    focusMeasurement: "Pengukuran overhead memori pada call stack saat fungsi dipanggil.",
    capaian: [
      "Mampu membuktikan independensi variabel lokal dalam fungsi.",
      "Mampu mengukur siklus hidup memori pada call stack."
    ],
    dasarTeori: { overview: "Fungsi memecah program besar menjadi sub-program modular yang dapat dipanggil berulang.", points: [] },
    prosedurKerja: [],
    defaultObservations: [],
    analisisPrompts: [],
    kesimpulanPrompts: []
  },
  {
    id: 6,
    title: "Array / List (Struktur Data Sekuensial)",
    subtitle: "Validasi Batas Indeks dan Komparasi Waktu Pencarian Data",
    focusValidation: "Validasi index out of bounds, penanganan array kosong, dan integritas data.",
    focusMeasurement: "Pengukuran waktu pencarian elemen (linear search vs binary search).",
    capaian: [
      "Mampu memvalidasi batasan indeks array secara aman.",
      "Mampu membandingkan efisiensi algoritma pencarian secara empiris."
    ],
    dasarTeori: { overview: "Array/List menyimpan sekumpulan elemen data terurut dalam satu variabel.", points: [] },
    prosedurKerja: [],
    defaultObservations: [],
    analisisPrompts: [],
    kesimpulanPrompts: []
  },
  {
    id: 7,
    title: "Dictionary / Object (Struktur Asosiatif)",
    subtitle: "Validasi Integritas Key-Value dan Komparasi Kecepatan Akses O(1)",
    focusValidation: "Validasi key not found, keunikan kunci, dan integritas pemetaan data.",
    focusMeasurement: "Pengukuran komparasi kecepatan akses O(1) Dictionary vs O(N) List pada volume data besar.",
    capaian: [
      "Mampu membuktikan efisiensi pencarian berbasis hash key pada dictionary.",
      "Mampu memvalidasi penanganan exception saat key tidak ditemukan."
    ],
    dasarTeori: { overview: "Dictionary menyimpan data dalam pasangan kunci-nilai (key-value) dengan akses sangat cepat.", points: [] },
    prosedurKerja: [],
    defaultObservations: [],
    analisisPrompts: [],
    kesimpulanPrompts: []
  }
];
