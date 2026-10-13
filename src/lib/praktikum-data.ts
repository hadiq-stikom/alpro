export interface ObservationRow {
  no: number;
  scenario: string;
  testInput: string;
  expectedTheory: string;
  actualOutput: string;
  measuredMetric: string;
  validationStatus: 'Sesuai' | 'Tidak Sesuai' | 'Belum Diuji';
}

export interface KeyPointItem {
  label: string;
  detail: string;
  badge?: string;
  code?: string;
}

export interface TheoryPoint {
  title: string;
  desc: string;
  leadSentence?: string;
  keyPoints?: KeyPointItem[];
  keyTerms?: string[];
  relatedScenarios?: string;
  syntaxExample?: string;
  labInsight?: string;
  category?: string;
}

export interface FundamentalPillar {
  number: number;
  title: string;
  desc: string;
  tag?: string;
  badge?: string;
}

export interface DasarTeoriData {
  overview: string;
  leadParagraph?: string;
  fundamentalPillars?: FundamentalPillar[];
  keyConceptsSummary?: string[];
  points: TheoryPoint[];
}

export interface ProsedurStepItem {
  no: number;
  phase: 'Persiapan' | 'Eksperimen' | 'Pencatatan' | 'Sintesis';
  title: string;
  instruction: string;
  codeSnippet?: string;
  scenarioRef?: string;
  target?: string;
}

export interface PraktikumModule {
  id: number;
  title: string;
  subtitle: string;
  focusValidation: string;
  focusMeasurement: string;
  capaian: string[];
  dasarTeori: DasarTeoriData;
  prosedurKerja: string[];
  prosedurSteps?: ProsedurStepItem[];
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
      overview: "Variabel adalah label pengenal yang merujuk pada alamat lokasi tertentu di dalam Random Access Memory (RAM). Ketika variabel dideklarasikan, komputer mengalokasikan sejumlah byte memori fisik berdasarkan Tipe Data yang ditentukan. Pemilihan tipe data mengendalikan dua hal fundamental: (1) kapasitas domain nilai dan akurasi presisi komputasi di memori, serta (2) keabsahan operasi matematika atau logika yang diizinkan untuk dieksekusi.",
      leadParagraph: "Variabel adalah label pengenal yang merujuk pada alamat lokasi fisik tertentu di dalam Random Access Memory (RAM). Ketika variabel dideklarasikan, komputer mengalokasikan sejumlah byte memori fisik berdasarkan Tipe Data yang ditentukan.",
      fundamentalPillars: [
        {
          number: 1,
          title: "Kapasitas Domain Nilai & Akurasi Presisi Komputasi",
          desc: "Mengendalikan batas rentang nilai (domain) minimum dan maksimum yang dapat ditampung, serta ketepatan presisi fraksi desimal di memori (seperti mantissa 52-bit pada standar IEEE 754 vs integer murni).",
          tag: "Domain & Presisi RAM",
          badge: "Pilar 1"
        },
        {
          number: 2,
          title: "Keabsahan Operasi Matematika & Logika",
          desc: "Mengendalikan validitas instruksi yang diizinkan dieksekusi prosesor (misalnya pembedaan operator + untuk penjumlahan numerik vs penggabungan teks str, serta proteksi terhadap runtime error fatal seperti ZeroDivisionError).",
          tag: "Type Safety & Operasi",
          badge: "Pilar 2"
        }
      ],
      keyConceptsSummary: [
        "Alokasi Memori RAM (PyObject)",
        "Integer Truncation (//)",
        "Type Casting int() / float()",
        "ZeroDivisionError",
        "Presisi IEEE 754 (0.1 + 0.2)",
        "Boolean Truthiness & Relasional"
      ],
      points: [
        {
          title: "1. Alokasi Memori RAM & Karakteristik Tipe Primitif",
          category: "Alokasi Memori",
          relatedScenarios: "Skenario Uji #1 & #2",
          keyTerms: ["Alamat RAM", "type()", "sys.getsizeof()", "PyObject Overhead", "28 Byte int / 24 Byte float"],
          syntaxExample: "a = 100; type(a)  # int: 28 byte | b = 100.5; type(b)  # float: 24 byte",
          leadSentence: "Variabel bukan sekadar penampung nilai statis, melainkan pointer (referensi alamat) ke memori fisik RAM dengan pembungkus struktur objek PyObject.",
          desc: "Variabel bukan sekadar label penampung nilai, melainkan pointer ke alamat memori fisik RAM. Pada bahasa modern bertipe dinamis (seperti Python), tipe primitif dibungkus sebagai struktur objek (PyObject). Bilangan bulat (int) membutuhkan alokasi memori 28 byte (memuat header referensi objek, penanda tipe, dan nilai), sedangkan bilangan pecahan (float) membutuhkan 24 byte berstandar IEEE 754. Fungsi type() digunakan untuk memvalidasi kelas tipe data, dan sys.getsizeof() untuk mengukur kapasitas byte fisik variabel di memori.",
          keyPoints: [
            {
              label: "Hakikat Variabel",
              detail: "Variabel bekerja sebagai pointer yang menunjuk ke alamat memori fisik RAM tempat data disimpan.",
              badge: "RAM Pointer"
            },
            {
              label: "Struktur Objek (PyObject)",
              detail: "Tipe primitif dibungkus sebagai objek lengkap dengan header referensi (refcount), penanda tipe data, dan nilai.",
              code: "PyObject"
            },
            {
              label: "Alokasi Memori Fisik",
              detail: "Bilangan bulat int memerlukan alokasi 28 byte di RAM, sedangkan pecahan float memerlukan 24 byte berstandar IEEE 754.",
              code: "int: 28B | float: 24B"
            },
            {
              label: "Fungsi Diagnostik Memori",
              detail: "Gunakan type() untuk memvalidasi kelas tipe data dan sys.getsizeof() untuk mengukur kapasitas byte fisik variabel di RAM.",
              code: "type() & sys.getsizeof()"
            }
          ],
          labInsight: "Alokasi memori memiliki biaya (overhead) nyata di RAM. Memahami ukuran byte melatih efisiensi sumber daya komputasi saat memproses volume data besar."
        },
        {
          title: "2. Pembagian Pecahan (/) vs Pemotongan Desimal (//) (Integer Truncation)",
          category: "Operator Aritmatika",
          relatedScenarios: "Skenario Uji #3 & #4",
          keyTerms: ["Float Division (/)", "Floor Division (//)", "Integer Truncation", "Penyusutan Nilai Pecahan"],
          syntaxExample: "10 / 4  # -> 2.5 (tipe float)  vs  10 // 4  # -> 2 (tipe int)",
          leadSentence: "Komputer membedakan secara tegas antara pembagian pecahan riil (/) yang mempertahankan desimal, dan pembagian bulat (//) yang memicu pemotongan desimal paksa (integer truncation).",
          desc: "Komputer membedakan secara tegas antara Pembagian Pecahan (Float Division '/') dan Pembagian Bulat (Floor Division '//'). Pembagian 10 / 4 menghasilkan 2.5 dengan presisi desimal dipertahankan secara utuh. Sebaliknya, operator pembagian bulat 10 // 4 memicu pemotongan desimal paksa (integer truncation) dengan membuang seluruh angka di belakang koma, menghasilkan nilai bulat 2 murni (bukan dibulatkan ke atas). Bagian pecahan 0.5 lenyap seketika dari memori kalkulasi.",
          keyPoints: [
            {
              label: "Float Division (/)",
              detail: "Operasi 10 / 4 menghasilkan nilai 2.5 bertipe float dengan seluruh presisi angka di belakang koma dipertahankan utuh.",
              code: "10 / 4 -> 2.5"
            },
            {
              label: "Floor Division (//)",
              detail: "Operasi 10 // 4 menghasilkan nilai 2 bertipe int; seluruh angka di belakang koma dibuang paksa tanpa pembulatan.",
              code: "10 // 4 -> 2"
            },
            {
              label: "Integer Truncation",
              detail: "Bagian pecahan 0.5 dimusnahkan seketika dari memori kalkulasi, bukan dibulatkan ke atas (bukan ceiling).",
              badge: "Truncation"
            },
            {
              label: "Bahaya Akurasi Finansial",
              detail: "Ketidaksengajaan memakai operator // pada sistem perbankan atau formula sains memicu akumulasi selisih yang fatal.",
              badge: "Kritis"
            }
          ],
          labInsight: "Bahaya Kritis: Penggunaan operator // secara tidak sengaja pada sistem perbankan atau formula sains akan mengakibatkan akumulasi selisih nilai (truncation error) yang merusak akurasi finansial dan logika program."
        },
        {
          title: "3. Karakteristik Masukan Keyboard & Kewajiban Explicit Type Casting",
          category: "Type Safety & I/O",
          relatedScenarios: "Skenario Uji #5 & #6",
          keyTerms: ["input()", "String Concatenation", "Explicit Type Casting", "Konversi int() / float()"],
          syntaxExample: "'50' + '25'  # -> '5025' (str)  vs  int('50') + int('25')  # -> 75 (int)",
          leadSentence: "Seluruh data masukan dari input() selalu bertipe String (str), sehingga operator + memicu penggabungan teks (concatenation) bukan operasi aritmatika tanpa Explicit Type Casting.",
          desc: "Seluruh data masukan dari keyboard melalui fungsi universal input() secara bawaan ditangkap oleh sistem operasi sebagai deretan teks bertipe String (str). Menerapkan operator penjumlahan '+' pada dua buah string '50' + '25' memicu operasi penggabungan teks (String Concatenation), menghasilkan teks gabungan '5025', bukan hasil aritmatika 75. Untuk melakukan perhitungan numerik yang valid, programmer wajib melakukan konversi tipe data eksplisit (Explicit Type Casting) menggunakan fungsi int() atau float() sebelum variabel dioperasikan.",
          keyPoints: [
            {
              label: "Sifat Bawaan input()",
              detail: "Semua karakter yang diketikkan pengguna ditangkap sistem operasi sebagai deretan teks bertipe String (str).",
              code: "type -> str"
            },
            {
              label: "String Concatenation Bug",
              detail: "Operasi '50' + '25' menghasilkan teks gabungan '5025' (bukan 75). Program berjalan lancar tanpa pesan error (silent bug).",
              code: "'50' + '25' -> '5025'"
            },
            {
              label: "Explicit Type Casting",
              detail: "Wajib membungkus variabel dengan fungsi int() atau float() sebelum variabel dioperasikan secara matematis.",
              code: "int('50') + int('25') -> 75"
            },
            {
              label: "Pencegahan Silent Error",
              detail: "Validasi konversi tipe sedini mungkin mencegah kebocoran kesalahan logika ke tahapan kalkulasi berikutnya.",
              badge: "Defensive Coding"
            }
          ],
          labInsight: "String concatenation bug adalah sumber kesalahan logika (logic error) paling berbahaya pada pemula karena program berjalan lancar tanpa pesan error (silent bug), namun menghasilkan nilai keluaran yang keliru total."
        },
        {
          title: "4. Penanganan Interupsi Fatal: Pembagian dengan Nol (Division by Zero)",
          category: "Exception & Error",
          relatedScenarios: "Skenario Uji #7",
          keyTerms: ["ZeroDivisionError", "Interupsi Hardware", "Undefined State", "Defensive Precondition"],
          syntaxExample: "100 / 0  # -> ZeroDivisionError: division by zero",
          leadSentence: "Pembagian dengan pembagi nol (x / 0) adalah operasi tak terdefinisi yang membangkitkan interupsi hardware trap dan menghentikan eksekusi dengan ZeroDivisionError.",
          desc: "Secara matematis, operasi pembagian dengan penyebut nol (x / 0) adalah operasi yang tidak terdefinisi (undefined). Pada tingkat mikroarsitektur prosesor (ALU), instruksi pembagian dengan nol membangkitkan interupsi perangkat keras (hardware trap). Komputer menghentikan eksekusi secara paksa (crash) dan melemparkan kesalahan runtime ZeroDivisionError. Untuk mencegah kegagalan sistem di lingkungan produksi, kode wajib dilindungi dengan validasi awal (defensive pre-condition check) menggunakan pengujian kondisi if pembagi != 0 sebelum kalkulasi.",
          keyPoints: [
            {
              label: "Operasi Tak Terdefinisi",
              detail: "Secara matematis pembagian dengan nol tidak terdefinisi dan tidak dapat diproses oleh unit logika aritmatika (ALU).",
              badge: "Undefined"
            },
            {
              label: "Hardware Trap & Crash",
              detail: "Mikroprosesor membangkitkan interupsi perangkat keras yang memaksa sistem operasi menghentikan proses runtime secara mendadak.",
              code: "ZeroDivisionError"
            },
            {
              label: "Defensive Precondition",
              detail: "Wajib menyertakan percabangan validasi if pembagi != 0 sebelum instruksi pembagian diizinkan dieksekusi.",
              code: "if pembagi != 0:"
            },
            {
              label: "Ketahanan Sistem Produksi",
              detail: "Membuktikan pentingnya sanitasi masukan agar aplikasi tangguh dan tidak rentan crash akibat masukan tidak valid.",
              badge: "Robustness"
            }
          ],
          labInsight: "Pengujian kasus ekstrem ini membuktikan bahwa program tanpa filter validasi input sangat rapuh terhadap crash. Program yang tangguh wajib memvalidasi input sebelum mengizinkan eksekusi operasi aritmatika."
        },
        {
          title: "5. Keterbatasan Presisi Biner Pecahan (Standar IEEE 754 & Rounding Artifact)",
          category: "Presisi Desimal",
          relatedScenarios: "Skenario Uji #8",
          keyTerms: ["IEEE 754 Standard", "Floating-Point Artifact", "Mantissa 52-bit", "Epsilon (ε)", "math.isclose()"],
          syntaxExample: "0.1 + 0.2  # -> 0.30000000000000004  (0.1 + 0.2 == 0.3 -> False!)",
          leadSentence: "Pecahan desimal seperti 0.1 dan 0.2 membentuk biner berulang tak hingga pada format IEEE 754 64-bit, memicu rounding artifact (0.1 + 0.2 != 0.3) akibat batas mantissa 52-bit.",
          desc: "Komputer menyimpan bilangan pecahan menggunakan format standar IEEE 754 Double Precision (64-bit) yang membagi bit menjadi: 1 bit tanda (sign), 11 bit eksponen, dan 52 bit fraksi (mantissa). Pecahan desimal seperti 0.1 (1/10) dan 0.2 (1/5) tidak dapat direpresentasikan secara eksak ke dalam pecahan biner berhingga basis 2, melainkan membentuk pola biner berulang tak hingga (mirip 1/3 = 0.3333... dalam desimal). Pemotongan bit pada batas mantissa 52-bit menimbulkan penyimpangan presisi (rounding error), sehingga 0.1 + 0.2 menghasilkan 0.30000000000000004. Akibatnya, pengujian kesamaan langsung (0.1 + 0.2 == 0.3) menghasilkan nilai False. Solusi rekayasanya adalah menggunakan toleransi selisih epsilon (abs(a - b) < 1e-9), pembulatan round(), atau fungsi math.isclose(a, b).",
          keyPoints: [
            {
              label: "Format IEEE 754 64-Bit",
              detail: "Bit memori dibagi menjadi 1 bit sign, 11 bit exponent, dan 52 bit mantissa fraksi.",
              code: "Mantissa 52-bit"
            },
            {
              label: "Rounding Artifact Terkenal",
              detail: "Operasi 0.1 + 0.2 di memori menghasilkan 0.30000000000000004 akibat pemotongan biner berulang tak hingga.",
              code: "0.30000000000000004"
            },
            {
              label: "Kegagalan Uji Kesamaan ==",
              detail: "Pengujian 0.1 + 0.2 == 0.3 mengembalikan False karena terdapat selisih pecahan residual pada digit ke-17.",
              code: "== 0.3 -> False"
            },
            {
              label: "Solusi Rekayasa Epsilon",
              detail: "Gunakan toleransi selisih epsilon abs(a - b) < 1e-9, pembulatan round(), atau fungsi math.isclose(a, b).",
              code: "math.isclose(a, b)"
            }
          ],
          labInsight: "Penyimpangan desimal bukan bug bahasa pemrograman, melainkan batasan fisik arsitektur komputasi biner di seluruh komputer modern. Analisis laboratorium wajib menguraikan mengapa fenomena ini terjadi."
        },
        {
          title: "6. Domain Tipe Boolean, Operator Relasional & Validasi Logika",
          category: "Evaluasi Logika",
          relatedScenarios: "Status Validasi Tabel C",
          keyTerms: ["bool", "True / False", "Operator Relasional (==, !=, <, <=, >, >=)", "Assignment vs Equality"],
          syntaxExample: "hasil == 2.5  # -> True / False (Relasional)  vs  hasil = 2.5 (Assignment)",
          leadSentence: "Tipe Boolean (bool) merepresentasikan status diskrit (True / False) hasil evaluasi Operator Relasional sebagai fondasi percabangan dan instrumen validasi pengujian.",
          desc: "Tipe data Boolean (bool) adalah tipe data logika murni yang hanya memiliki dua status diskrit: True (benar) atau False (salah). Tipe ini dihasilkan dari evaluasi Operator Relasional seperti perbandingan kesamaan (==), ketidaksamaan (!=), dan perbandingan nilai (<, <=, >, >=). Pemula sering melakukan kesalahan fatal dengan menukar tanda sama dengan tunggal '=' (penugasan nilai ke variabel) dengan tanda ganda '==' (pengujian kesamaan nilai). Evaluasi boolean adalah fondasi pengujian status validasi pada praktikum: memastikan apakah hasil aktual keluaran mesin identik dengan prediksi hipotesis teoritis.",
          keyPoints: [
            {
              label: "Domain Diskrit Biner",
              detail: "Hanya memiliki dua status kebenaran mutlak: True (benar / 1 logika) atau False (salah / 0 logika).",
              code: "True | False"
            },
            {
              label: "Operator Relasional",
              detail: "Dievaluasi melalui perbandingan kesamaan (==), ketidaksamaan (!=), dan rentang (<, <=, >, >=).",
              code: "==, !=, <, >"
            },
            {
              label: "Perangkap = vs ==",
              detail: "Tanda = adalah operator penugasan nilai (assignment), sedangkan == adalah operator pengujian kesamaan nilai (equality).",
              badge: "Kritis: = vs =="
            },
            {
              label: "Instrumen Validasi Lab",
              detail: "Digunakan pada kolom status validasi untuk membuktikan kesesuaian antara luaran aktual mesin dengan hipotesis teoritis.",
              badge: "Benchmarking"
            }
          ],
          labInsight: "Logika boolean adalah jembatan penentu alur percabangan (Selection) dan perulangan (Looping). Mengetahui cara kerja evaluasi logika menjamin kebenaran status uji di lembar kerja praktikum."
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
    prosedurSteps: [
      {
        no: 1,
        phase: "Persiapan",
        title: "Inisialisasi Lingkungan Uji",
        instruction: "Buka instrumen editor uji coba di layar praktikum atau gunakan interpreter Python interaktif.",
        target: "Helper Simulator"
      },
      {
        no: 2,
        phase: "Eksperimen",
        title: "Uji Kasus 1: Pengukuran Tipe Data & Alokasi Byte Memori",
        instruction: "Periksa tipe data dan alokasi byte memori dari variabel integer, float, string, dan boolean menggunakan fungsi type() dan penelusuran memori.",
        codeSnippet: "a = 100; type(a)",
        scenarioRef: "Skenario #1 & #2"
      },
      {
        no: 3,
        phase: "Eksperimen",
        title: "Uji Kasus 2: Pembagian Pecahan (/) vs Truncation (//)",
        instruction: "Lakukan operasi pembagian 10 / 4 (float division) dan 10 // 4 (integer division). Catat perbedaan hasil dan tipe data kembaliannya pada tabel pengamatan.",
        codeSnippet: "10 // 4",
        scenarioRef: "Skenario #3 & #4"
      },
      {
        no: 4,
        phase: "Eksperimen",
        title: "Uji Kasus 3: Masukan Teks & Explicit Type Casting",
        instruction: "Simulasikan masukan teks '75' dan '25'. Lakukan operasi penjumlahan sebelum di-casting ('75' + '25') dan setelah di-casting (int('75') + int('25')). Amati hasilnya.",
        codeSnippet: "'75' + '25'",
        scenarioRef: "Skenario #5 & #6"
      },
      {
        no: 5,
        phase: "Eksperimen",
        title: "Uji Kasus 4: Penanganan Pembagian dengan Nol (Hardware Trap)",
        instruction: "Jalankan operasi pembagian dengan nilai penyebut 0. Amati pesan respons error yang dihasilkan oleh sistem.",
        codeSnippet: "100 / 0",
        scenarioRef: "Skenario #7"
      },
      {
        no: 6,
        phase: "Eksperimen",
        title: "Uji Kasus 5: Batasan Presisi IEEE 754 & Floating-Point Artifact",
        instruction: "Uji nilai desimal presisi tinggi (misal: 0.1 + 0.2). Amati apakah hasilnya tepat 0.3 atau terdapat fenomena floating-point artifact (misal: 0.30000000000000004).",
        codeSnippet: "0.1 + 0.2",
        scenarioRef: "Skenario #8"
      },
      {
        no: 7,
        phase: "Pencatatan",
        title: "Pencatatan Hasil Pengamatan Empiris",
        instruction: "Catat seluruh hasil pengamatan aktual ke dalam Tabel Pengamatan Bagian C dan verifikasi status kesesuaian nilai.",
        target: "Tabel Bagian C"
      },
      {
        no: 8,
        phase: "Sintesis",
        title: "Analisis Pembahasan & Formulasi Kesimpulan",
        instruction: "Susun uraian analisis mendalam pada Bagian D dan rumuskan kesimpulan akhir pada Bagian E.",
        target: "Bagian D & E"
      }
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
    subtitle: "Validasi Ketergantungan Alur, Tracing State Variabel, dan Akurasi Rumus Komputasi",
    focusValidation: "Validasi ketergantungan urutan instruksi (data dependency), pencegahan NameError, dan akurasi operator precedence.",
    focusMeasurement: "Tracing transisi state nilai variabel di RAM baris demi baris dari input buffer hingga display output.",
    capaian: [
      "Mampu membuktikan secara empiris prinsip deterministik eksekusi sekuensial komputer dan akibat fatal pelanggaran dependensi data.",
      "Mampu melakukan tracing perubahan state nilai variabel di memori RAM pada setiap tahapan instruksi sekuensial.",
      "Mampu mentransformasikan formula matematika kompleks ke dalam ekspresi komputasi dengan kepatuhan hierarki presedensi operator (PEMDAS) yang presisi."
    ],
    dasarTeori: {
      overview: "Struktur sekuensial (Sequence) adalah fondasi alur program di mana instruksi dieksekusi tepat satu demi satu secara deterministik dari atas ke bawah sesuai urutan baris. Komputer tidak dapat melompati baris atau mengantisipasi data di masa depan. Pemahaman alur sekuensial mengendalikan dua hal fundamental: (1) kepatuhan ketergantungan data (Data Dependency) di mana variabel wajib diinisialisasi sebelum dibaca, serta (2) presisi komputasi formula matematika yang tunduk pada aturan hierarki presedensi operator (PEMDAS).",
      leadParagraph: "Struktur sekuensial (Sequence) adalah arsitektur eksekusi paling mendasar dalam sains komputasi. Program dieksekusi secara deterministik satu demi satu oleh prosesor mengikuti register Program Counter (PC), membentuk rantai transisi state di memori RAM.",
      fundamentalPillars: [
        {
          number: 1,
          title: "Kepatuhan Ketergantungan Data (Data Dependency)",
          desc: "Setiap variabel wajib telah dialokasikan dan diisi nilai di RAM sebelum dapat dibaca sebagai operan kalkulasi. Pelanggaran urutan memicu kegagalan fatal Read-After-Write (RAW) atau NameError.",
          tag: "Data Dependency & RAM",
          badge: "Pilar 1"
        },
        {
          number: 2,
          title: "Presisi Hirarki Operator Precedence (PEMDAS)",
          desc: "Transformasi rumus matematika ke baris komputasi wajib mematuhi aturan presedensi operator. Tanda kurung () mengendalikan evaluasi prioritas agar nilai tidak bias oleh perkalian/pembagian implisit.",
          tag: "Operator Precedence",
          badge: "Pilar 2"
        }
      ],
      keyConceptsSummary: [
        "Siklus I-P-O & Input Buffer",
        "Program Counter (PC) Deterministik",
        "Data Dependency & NameError",
        "Operator Precedence (PEMDAS)",
        "State Transition Tracing",
        "Atomic Swap (a, b = b, a)"
      ],
      points: [
        {
          title: "1. Prinsip Deterministik & Siklus Input-Proses-Output (I-P-O)",
          category: "Arsitektur Eksekusi",
          relatedScenarios: "Skenario Uji #1",
          keyTerms: ["Program Counter", "Deterministik", "Siklus I-P-O", "Buffer I/O"],
          syntaxExample: "panjang = float(input()); lebar = float(input()); luas = panjang * lebar",
          leadSentence: "Komputer mengeksekusi instruksi secara deterministik baris demi baris mengikuti Program Counter, mengubah masukan mentah dari buffer I/O menjadi informasi terproses.",
          desc: "Siklus Input-Proses-Output (I-P-O) adalah alur universal pemrosesan data. Tahap Masukan menangkap data eksternal ke buffer I/O dan memetakannya ke variabel di RAM. Tahap Proses melakukan transformasi komputasi berbasis formula logika dan matematika. Tahap Keluaran menyajikan hasil dari RAM ke antarmuka pengguna. Komputer bersifat deterministik: urutan baris yang sama dengan masukan identik dijamin menghasilkan keluaran yang persis sama.",
          keyPoints: [
            {
              label: "Alur Eksekusi Deterministik",
              detail: "Setiap baris kode diproses berurutan tanpa jeda atau lompatan acak, menjamin reprodusibilitas hasil.",
              badge: "Deterministik"
            },
            {
              label: "Buffer Masukan (I/O Buffer)",
              detail: "Data yang dimasukkan pengguna ditampung dalam buffer memori sebelum disalin ke variabel lokal.",
              code: "input() -> RAM"
            },
            {
              label: "Isolasi Tahap Pemrosesan",
              detail: "Kalkulasi logika hanya dapat berlangsung setelah seluruh data operan siap di memori fisik.",
              code: "luas = p * l"
            },
            {
              label: "Penyajian Hasil Akhir",
              detail: "Instruksi output membaca state terakhir dari RAM dan menyajikannya ke terminal pengguna.",
              badge: "Output Stream"
            }
          ],
          labInsight: "Memisahkan secara disiplin tahap masukan, kalkulasi proses, dan penulisan keluaran mencegah kekacauan alur kode dan mempermudah debugging kesalahan logika."
        },
        {
          title: "2. Ketergantungan Data (Data Dependency) & Bahaya NameError",
          category: "Integritas Variabel",
          relatedScenarios: "Skenario Uji #2",
          keyTerms: ["Data Dependency", "Read-After-Write", "NameError", "Alokasi Dini"],
          syntaxExample: "total = harga * jumlah  # NameError: name 'harga' is not defined",
          leadSentence: "Membaca variabel sebelum nilainya dideklarasikan dan dialokasikan di RAM memicu pelanggaran dependensi data (Read-After-Write hazard) dan menghentikan runtime dengan NameError.",
          desc: "Dalam arsitektur sekuensial, sebuah variabel baru memiliki referensi alamat memori fisik setelah baris inisialisasinya dieksekusi. Jika seorang programmer mencoba menghitung formula menggunakan variabel yang baru diinputkan pada baris-baris berikutnya, mesin virtual tidak dapat menemukan label variabel di tabel simbol lokal. Pelanggaran ketergantungan data ini menghasilkan galat runtime fatal NameError dan mematikan program seketika.",
          keyPoints: [
            {
              label: "Tabel Simbol Lokal",
              detail: "Interpreter mencari identifier di tabel simbol memori; jika belum terdaftar, pencarian langsung gagal.",
              badge: "Symbol Table"
            },
            {
              label: "Read-After-Write Hazard",
              detail: "Operasi pembacaan (Read) tidak boleh mendahului operasi penulisan (Write) dari variabel yang sama.",
              code: "NameError"
            },
            {
              label: "Inisialisasi Wajib",
              detail: "Seluruh variabel penampung wajib dideklarasikan dan diisi nilai sebelum dilibatkan dalam rumus.",
              code: "x = 0  # Init"
            },
            {
              label: "Pencegahan Bug Sekuensial",
              detail: "Selalu tempatkan deklarasi masukan dan konstanta di blok teratas sebelum blok manipulasi data.",
              badge: "Top-Down Safety"
            }
          ],
          labInsight: "Kesalahan urutan baris adalah salah satu kesalahan paling umum pemula yang terbiasa berpikir deklaratif seperti aljabar matematika di mana posisi baris sering dianggap bebas."
        },
        {
          title: "3. Presedensi Operator (PEMDAS) & Bahaya Ambiguitas Notasi",
          category: "Aritmatika Komputasi",
          relatedScenarios: "Skenario Uji #3 & #4",
          keyTerms: ["Operator Precedence", "PEMDAS", "Parentheses ()", "Truncation Bias"],
          syntaxExample: "rata = a + b / 2  # Salah! -> a + (b/2)  vs  rata = (a + b) / 2  # Benar!",
          leadSentence: "Komputer mengevaluasi ekspresi aritmatika mengikuti hierarki ketat (PEMDAS: Kurung, Eksponen, Perkalian/Pembagian, Penjumlahan), sehingga tanpa kurung formula rata-rata menghasilkan nilai bias.",
          desc: "Ekspresi komputasi tidak dibaca mendatar dari kiri ke kanan secara murni. Operator perkalian (*) dan pembagian (/) memiliki level prioritas lebih tinggi daripada penjumlahan (+) dan pengurangan (-). Rumus rata-rata matematika (a + b) / 2 yang ditulis tanpa kurung a + b / 2 akan dievaluasi prosesor sebagai a + (b / 2), menghasilkan nilai kalkulasi yang keliru tanpa memicu error sintaksis. Tanda kurung () wajib digunakan untuk menegaskan prioritas evaluasi.",
          keyPoints: [
            {
              label: "Hierarki Prioritas PEMDAS",
              detail: "Kurung () > Eksponen (**) > Perkalian/Pembagian (*, /, //, %) > Penjumlahan/Pengurangan (+, -).",
              code: "() > ** > * / > + -"
            },
            {
              label: "Ambiguitas Pembagian Implisit",
              detail: "Penulisan a + b / 2 membagi nilai b terlebih dahulu, baru kemudian menjumlahkannya dengan a.",
              badge: "Bias Formula"
            },
            {
              label: "Eksplisit Menggunakan Kurung",
              detail: "Penggunaan tanda kurung memaksa ALU menghitung sub-ekspresi di dalamnya terlebih dahulu.",
              code: "(a + b) / 2"
            },
            {
              label: "Bebas Silent Logic Bug",
              detail: "Menghindari bias nilai tersembunyi yang berisiko meloloskan kalkulasi salah ke produksi.",
              badge: "High Precision"
            }
          ],
          labInsight: "Jangan pernah mengandalkan asumsi intuitif pembacaan manusia. Gunakan tanda kurung secara eksplisit untuk menjamin keabsahan urutan kalkulasi pada setiap rumus matematika."
        },
        {
          title: "4. Mekanisme Penukaran Nilai (Variable Swapping) & Atomic Unpacking",
          category: "Manipulasi RAM",
          relatedScenarios: "Skenario Uji #5 & #6",
          keyTerms: ["Variable Swapping", "Temporary Variable", "Atomic Unpack", "Data Overwrite"],
          syntaxExample: "a, b = b, a  # Pythonic Swap  vs  temp = a; a = b; b = temp  # Classic Swap",
          leadSentence: "Menukar nilai dua variabel membutuhkan perantara variabel sementara (temp) atau mekanisme atomic unpacking tuple (a, b = b, a) untuk mencegah penimpaan destruktif nilai awal di RAM.",
          desc: "Menukar nilai dua variabel a dan b tidak dapat dilakukan dengan baris sekuensial ceroboh a = b; b = a. Pada baris pertama, nilai asli a langsung tertimpa oleh nilai b di RAM, sehingga pada baris kedua nilai b diisi oleh salinan dirinya sendiri (nilai asli a musnah). Cara klasik adalah menggunakan variabel sementara temp = a; a = b; b = temp. Pada bahasa modern seperti Python, mekanisme atomic tuple unpacking a, b = b, a mengevaluasi sisi kanan ke dalam memori sementara sebelum menugaskannya serentak ke sisi kiri.",
          keyPoints: [
            {
              label: "Jebakan Destructive Overwrite",
              detail: "Perintah a = b memusnahkan nilai asli a di alamat memori sebelum sempat disalin ke b.",
              code: "a = b; b = a  # BUG!"
            },
            {
              label: "Metode Variabel Penampung (Temp)",
              detail: "Nilai awal a diamankan terlebih dahulu di memori loker temp sebelum a ditimpa.",
              code: "temp = a; a = b; b = temp"
            },
            {
              label: "Atomic Tuple Unpacking",
              detail: "Mekanisme canggih Python mengevaluasi tuple (b, a) di memori internal sebelum assign simultan.",
              code: "a, b = b, a"
            },
            {
              label: "Efisiensi Siklus Instruksi",
              detail: "Atomic unpacking lebih ringkas dan menghilangkan kebutuhan alokasi variabel sementara manual.",
              badge: "Pythonic"
            }
          ],
          labInsight: "Eksperimen penukaran nilai adalah bukti konkret bahwa variabel komputer bukan persamaan matematika statis, melainkan sel memori dinamis yang dapat ditimpa secara permanen."
        },
        {
          title: "5. Tracing Transisi State Akumulatif & Variabel Turunan",
          category: "State Tracking",
          relatedScenarios: "Skenario Uji #7",
          keyTerms: ["State Transition", "In-Place Mutation", "Accumulator", "Variable Shadowing"],
          syntaxExample: "x = 10; x = x + 5  # x berubah state: 10 -> 15 di RAM",
          leadSentence: "Operasi x = x + 5 mengevaluasi nilai lama di sisi kanan, menambahkan 5, lalu menugaskan hasil baru kembali ke alamat label x, memicu transisi state mutatif di RAM.",
          desc: "Dalam pemrograman sekuensial, baris x = x + 5 bukanlah persamaan aljabar (karena secara matematis x tidak pernah sama dengan x + 5). Tanda sama dengan adalah operator penugasan (assignment). Komputer membaca state nilai lama x dari RAM (misal 10), mengevaluasi 10 + 5 = 15 pada ALU, kemudian memperbarui referensi x dengan nilai baru 15. Pelacakan tabel state (tracing table) adalah metode ilmiah untuk memverifikasi kebenaran transisi variabel pada setiap ketukan instruksi.",
          keyPoints: [
            {
              label: "Semantik Assignment",
              detail: "Simbol = mengeksekusi evaluasi nilai kanan terlebih dahulu, baru menyimpannya ke kiri.",
              code: "x = x + 5"
            },
            {
              label: "Pola Akumulator",
              detail: "Pola fundamental komputasi untuk menjumlahkan nilai agregat secara bertahap.",
              badge: "Accumulator"
            },
            {
              label: "State Tracing Table",
              detail: "Tabel verifikasi baris-demi-baris untuk membuktikan nilai variabel sebelum dan sesudah dieksekusi.",
              badge: "Tracing"
            },
            {
              label: "Shortcut In-Place (+=)",
              detail: "Sintaks shorthand x += 5 memperbarui nilai secara langsung di dalam struktur memori.",
              code: "x += 5"
            }
          ],
          labInsight: "Menguasai tracing state adalah kemampuan inti seorang insinyur perangkat lunak untuk menelusuri bug logika tanpa harus bergantung pada tebak-tebakan."
        }
      ]
    },
    prosedurKerja: [
      "Buka instrumen editor uji coba di layar praktikum atau gunakan interpreter Python.",
      "Lakukan Uji Kasus 1: Jalankan alur sekuensial normal penghitungan Luas Persegi Panjang dengan input panjang=10 dan lebar=5. Catat hasil keluaran.",
      "Lakukan Uji Kasus 2: Tukar posisi baris rumus sebelum baris inisialisasi variabel masukan. Amati munculnya kesalahan NameError.",
      "Lakukan Uji Kasus 3: Bandingkan hasil evaluasi rumus rata-rata tanpa tanda kurung (a + b / 2) vs dengan kurung ((a + b) / 2) pada nilai a=10, b=20.",
      "Lakukan Uji Kasus 4: Simulasikan penukaran nilai variabel a=5 dan b=9 menggunakan cara destruktif (a=b; b=a) vs atomic unpacking (a, b = b, a).",
      "Lakukan Uji Kasus 5: Amati mutasi state variabel akumulator (saldo = 1000; saldo = saldo + 500; saldo = saldo - 200). Catat state transisi di RAM.",
      "Catat seluruh hasil pengamatan aktual ke dalam Tabel Pengamatan Bagian C.",
      "Susun uraian analisis mendalam pada Bagian D dan rumuskan kesimpulan akhir pada Bagian E."
    ],
    prosedurSteps: [
      {
        no: 1,
        phase: "Persiapan",
        title: "Inisialisasi Lingkungan Uji Sekuensial",
        instruction: "Siapkan lingkungan uji dan pastikan pemahaman atas alur Program Counter deterministik.",
        target: "Helper Simulator"
      },
      {
        no: 2,
        phase: "Eksperimen",
        title: "Uji Kasus 1: Siklus I-P-O Normal Luas Persegi Panjang",
        instruction: "Eksekusi alur sekuensial teratur: inisialisasi masukan, kalkulasi luas, dan cetak hasil ke layar.",
        codeSnippet: "p = 10; l = 5; luas = p * l; print(luas)",
        scenarioRef: "Skenario #1"
      },
      {
        no: 3,
        phase: "Eksperimen",
        title: "Uji Kasus 2: Pelanggaran Ketergantungan Data (Data Dependency Violation)",
        instruction: "Panggil rumus kalkulasi sebelum variabel diinisialisasi. Amati respons penghentian eksekusi NameError oleh interpreter.",
        codeSnippet: "luas = p * l; p = 10; l = 5",
        scenarioRef: "Skenario #2"
      },
      {
        no: 4,
        phase: "Eksperimen",
        title: "Uji Kasus 3: Ambiguitas Operator Precedence (Formula Rata-Rata)",
        instruction: "Uji nilai a=10 dan b=20 dengan rumus a + b / 2 dan bandingkan terhadap formula kurung (a + b) / 2.",
        codeSnippet: "a = 10; b = 20; print(a + b / 2); print((a + b) / 2)",
        scenarioRef: "Skenario #3 & #4"
      },
      {
        no: 5,
        phase: "Eksperimen",
        title: "Uji Kasus 4: Penukaran Nilai Destruktif vs Atomic Swapping",
        instruction: "Buktikan kerusakan data pada algoritma swap naif (a = b; b = a) dan bandingkan dengan atomic tuple unpack (a, b = b, a).",
        codeSnippet: "a, b = 5, 9; a, b = b, a; print(a, b)",
        scenarioRef: "Skenario #5 & #6"
      },
      {
        no: 6,
        phase: "Eksperimen",
        title: "Uji Kasus 5: Tracing Transisi State Akumulatif di RAM",
        instruction: "Lakukan mutasi state in-place pada variabel saldo dan catat perubahan nilainya baris-demi-baris.",
        codeSnippet: "saldo = 1000; saldo += 500; saldo -= 200; print(saldo)",
        scenarioRef: "Skenario #7"
      },
      {
        no: 7,
        phase: "Pencatatan",
        title: "Pencatatan Hasil Pengamatan Empiris",
        instruction: "Catat seluruh hasil keluaran aktual dan metrik transisi nilai variabel ke dalam Tabel Pengamatan Bagian C.",
        target: "Tabel Bagian C"
      },
      {
        no: 8,
        phase: "Sintesis",
        title: "Analisis Pembahasan & Formulasi Kesimpulan",
        instruction: "Susun uraian analisis ilmiah ketergantungan urutan pada Bagian D dan simpulkan hukum deterministik pada Bagian E.",
        target: "Bagian D & E"
      }
    ],
    defaultObservations: [
      {
        no: 1,
        scenario: "Siklus I-P-O Normal (Luas Persegi Panjang)",
        testInput: "p = 10; l = 5; luas = p * l",
        expectedTheory: "Eksekusi sekuensial lancar, luas = 50",
        actualOutput: "50",
        measuredMetric: "State luas teralokasi di RAM (int: 50)",
        validationStatus: "Sesuai"
      },
      {
        no: 2,
        scenario: "Pelanggaran Urutan: Baca Sebelum Deklarasi",
        testInput: "luas = p * l; p = 10; l = 5",
        expectedTheory: "Gagal eksekusi (NameError variabel belum ada)",
        actualOutput: "NameError: name 'p' is not defined",
        measuredMetric: "Program berhenti seketika di baris 1",
        validationStatus: "Sesuai"
      },
      {
        no: 3,
        scenario: "Formula Rata-rata Tanpa Tanda Kurung",
        testInput: "a = 10; b = 20; hasil = a + b / 2",
        expectedTheory: "Evaluasi prioritas pembagian (10 + 10 = 20.0)",
        actualOutput: "20.0 (Bukan rata-rata 15.0!)",
        measuredMetric: "Penyimpangan logika akibat PEMDAS",
        validationStatus: "Sesuai"
      },
      {
        no: 4,
        scenario: "Formula Rata-rata Dengan Tanda Kurung Eksplisit",
        testInput: "a = 10; b = 20; hasil = (a + b) / 2",
        expectedTheory: "Sub-ekspresi kurung dihitung dulu (30 / 2 = 15.0)",
        actualOutput: "15.0",
        measuredMetric: "Presisi formula matematika terjaga",
        validationStatus: "Sesuai"
      },
      {
        no: 5,
        scenario: "Penukaran Nilai Naif (Destructive Overwrite)",
        testInput: "a = 5; b = 9; a = b; b = a",
        expectedTheory: "Nilai awal a hilang, kedua variabel bernilai 9",
        actualOutput: "a = 9, b = 9 (Data a musnah)",
        measuredMetric: "Kegagalan penukaran state RAM",
        validationStatus: "Sesuai"
      },
      {
        no: 6,
        scenario: "Penukaran Nilai Atomic (Pythonic Tuple Swap)",
        testInput: "a = 5; b = 9; a, b = b, a",
        expectedTheory: "Nilai bertukar sempurna (a = 9, b = 5)",
        actualOutput: "a = 9, b = 5",
        measuredMetric: "Atomic unpacking tanpa temporary variable",
        validationStatus: "Sesuai"
      },
      {
        no: 7,
        scenario: "Tracing Transisi State Akumulator In-Place",
        testInput: "s = 1000; s = s + 500; s = s - 200",
        expectedTheory: "Nilai s bertransisi: 1000 -> 1500 -> 1300",
        actualOutput: "1300",
        measuredMetric: "2 kali mutasi state di alamat s",
        validationStatus: "Sesuai"
      }
    ],
    analisisPrompts: [
      "Berdasarkan hasil pengujian pada skenario 2, jelaskan secara arsitektural mengapa komputer tidak dapat memproses baris luas = p * l meskipun variabel p dan l dideklarasikan pada baris tepat di bawahnya!",
      "Analisis mengapa formula a + b / 2 menghasilkan nilai 20.0 dan bukan 15.0 pada skenario 3! Apa implikasinya terhadap kebenaran program keuangan jika programmer mengabaikan tanda kurung?",
      "Jelaskan mengapa skenario 5 mengalami kegagalan penukaran nilai dan bagaimana mekanisme internal tuple unpacking pada skenario 6 mampu menukar nilai tanpa merusak data memori!"
    ],
    kesimpulanPrompts: [
      "Rumuskan kesimpulan ilmiah mengenai sifat deterministik eksekusi sekuensial dan pentingnya kepatuhan rantai dependensi data dalam rekayasa perangkat lunak!",
      "Bagaimana pemahaman atas operator precedence dan state tracking di RAM melindungi sistem komputasi dari bug logika fatal yang tak kasat mata?"
    ]
  },
  {
    id: 3,
    title: "Selection (Percabangan)",
    subtitle: "Branch & Boundary Value Coverage Serta Pengukuran Efisiensi Jalur",
    focusValidation: "Validasi ambang batas operator relasional (< vs <=), eliminasi dead code pada cascading if-elif, dan proteksi short-circuit.",
    focusMeasurement: "Pengukuran rasio jalur dieksekusi vs dilewati (taken vs bypassed) dan jumlah evaluasi kondisi logika.",
    capaian: [
      "Mampu melakukan pengujian nilai batas (Boundary Value Analysis) untuk membuktikan ketepatan operator relasional (< vs <=) pada ambang kelulusan.",
      "Mampu mendiagnosis dan mengeliminasi bug kode mati (Dead Code) yang diakibatkan oleh kesalahan urutan evaluasi kondisi bertingkat (cascading conditions).",
      "Mampu membuktikan mekanisme evaluasi singkat (Short-Circuit Evaluation) pada operator logika AND/OR untuk mencegah crash runtime (ZeroDivisionError)."
    ],
    dasarTeori: {
      overview: "Struktur percabangan (Selection) memberikan kemampuan kognitif kepada program untuk mengambil keputusan non-linear berdasarkan evaluasi kondisi Boolean (True atau False). Tanpa percabangan, program hanya berjalan statis. Pemilihan struktur percabangan mengendalikan dua hal fundamental: (1) integritas evaluasi ambang batas (Boundary Value Coverage) agar tidak terjadi ketidakadilan klasifikasi pada titik kritis, serta (2) optimalitas jalur eksekusi dan perlindungan runtime melalui evaluasi logika singkat (Short-Circuit Evaluation).",
      leadParagraph: "Struktur percabangan (Selection) mentransformasikan alur linier menjadi pohon keputusan dinamis. Berdasarkan evaluasi kondisi logika pada unit aritmatika prosesor (ALU), aliran Program Counter dialihkan secara bersyarat ke blok instruksi yang relevan sembari melewati blok alternatif.",
      fundamentalPillars: [
        {
          number: 1,
          title: "Integritas Evaluasi Ambang Batas (Boundary Value Coverage)",
          desc: "Titik batas operator relasional (< vs <= atau > vs >=) adalah sumber bug logika paling rentan. Pengujian wajib mencakup batas tepat (boundary), satu poin di bawahnya, dan satu poin di atasnya.",
          tag: "Boundary & Edge Case",
          badge: "Pilar 1"
        },
        {
          number: 2,
          title: "Optimalitas Jalur & Short-Circuit Evaluation",
          desc: "Operator logika and dan or mengevaluasi operan secara malas (lazy evaluation). Menghentikan evaluasi sedini mungkin tidak hanya menghemat siklus CPU, tetapi juga bertindak sebagai benteng pertahanan terhadap crash fatal.",
          tag: "Short-Circuit & Branching",
          badge: "Pilar 2"
        }
      ],
      keyConceptsSummary: [
        "Pohon Keputusan (Branch Coverage)",
        "Analisis Nilai Batas (< vs <=)",
        "Cascading Order & Dead Code Bug",
        "Short-Circuit Evaluation (AND/OR)",
        "Nested Selection vs Combined Logic",
        "Rasio Jalur (Taken vs Bypassed)"
      ],
      points: [
        {
          title: "1. Taksonomi Percabangan & Rasio Cakupan Jalur (Branch Coverage)",
          category: "Struktur Kontrol",
          relatedScenarios: "Skenario Uji #1 & #2",
          keyTerms: ["IF Tunggal", "IF-ELSE Ganda", "IF-ELIF Majemuk", "Branch Coverage"],
          syntaxExample: "if nilai >= 75:\n    status = 'Lulus'\nelse:\n    status = 'Remedial'",
          leadSentence: "Percabangan membagi aliran eksekusi menjadi dua atau lebih jalur independen, di mana rasio cakupan cabang (Branch Coverage) mengukur persentase jalur logika yang berhasil diuji.",
          desc: "Percabangan hadir dalam tiga bentuk kanonikal: IF Tunggal (aksi kondisional), IF-ELSE Ganda (dua alternatif mutually exclusive), dan IF-ELIF-ELSE Majemuk (banyak alternatif). Dalam penjaminan mutu perangkat lunak (QA), setiap blok percabangan wajib diuji dengan variasi masukan yang membuktikan bahwa kedua cabang (cabang True dan cabang False) dapat dieksekusi secara nyata. Mengabaikan pengujian salah satu cabang menyembunyikan potensi bug laten yang berbahaya.",
          keyPoints: [
            {
              label: "IF Tunggal (Single Alternative)",
              detail: "Blok hanya dieksekusi jika kondisi True; jika False, alur langsung berlanjut ke baris berikutnya.",
              code: "if kondisi:"
            },
            {
              label: "IF-ELSE Ganda (Dual Alternative)",
              detail: "Menjamin tepat satu dari dua blok yang dieksekusi, tidak pernah keduanya dan tidak pernah tidak sama sekali.",
              code: "if...else:"
            },
            {
              label: "Mutually Exclusive",
              detail: "Jalur eksekusi bersifat eksklusif: eksekusi pada satu cabang secara otomatis mengabaikan cabang lainnya.",
              badge: "Exclusive"
            },
            {
              label: "Metrik Branch Coverage",
              detail: "Persentase jalur logika yang teruji (Rasio: cabang dieksekusi / total cabang yang ada).",
              badge: "QA Metric"
            }
          ],
          labInsight: "Program yang lulus pengujian pada kasus normal (Happy Path) belum tentu bebas bug. Mahasiswa wajib menguji kasus negatif untuk membuktikan kekokohan cabang ELSE."
        },
        {
          title: "2. Analisis Nilai Batas (Boundary Value Analysis: < vs <=)",
          category: "Pengujian Ambang Batas",
          relatedScenarios: "Skenario Uji #3",
          keyTerms: ["Boundary Testing", "Off-by-One Bug", "Operator Relasional", "Titik Kritis Ambang"],
          syntaxExample: "if skor > 80:  # Gagal meluluskan skor tepat 80!  vs  if skor >= 80:  # Benar!",
          leadSentence: "Kesalahan memilih operator relasional ketat (>) versus inklusif (>=) pada ambang batas memicu bug pergeseran satu angka (off-by-one error) yang merugikan subjek evaluasi.",
          desc: "Sebagian besar kegagalan logika percabangan terjadi tepat pada angka batas (Boundary). Contohnya, jika syarat kelulusan nilai A adalah 80 ke atas, penulisan kondisi if skor > 80 akan mendiskualifikasi mahasiswa yang memperoleh nilai tepat 80.0 ke dalam kategori B. Operator relasional yang benar adalah if skor >= 80. Metodologi Boundary Value Analysis mewajibkan pengujian pada tiga titik uji: tepat pada batas (80), satu unit di bawah batas (79.9), dan satu unit di atas batas (80.1).",
          keyPoints: [
            {
              label: "Batas Ketat vs Inklusif",
              detail: "Operator > dan < mengecualikan angka batas; operator >= dan <= menyertakan angka batas.",
              code: "> vs >="
            },
            {
              label: "Off-by-One Logic Bug",
              detail: "Penyimpangan keputusan akibat pergeseran ambang batas sebesar satu fraksi desimal terkecil.",
              badge: "Off-by-One"
            },
            {
              label: "Tiga Titik Uji Wajib",
              detail: "Uji nilai tepat pada batas (On-Point), tepat di bawah batas (Below), dan tepat di atas batas (Above).",
              badge: "Boundary Triad"
            },
            {
              label: "Presisi Penentuan Grade",
              detail: "Menjamin konsistensi sistem akademik atau finansial terhadap regulasi yang telah disepakati.",
              badge: "Fairness"
            }
          ],
          labInsight: "Pengujian nilai batas adalah instrumen standar industri untuk membongkar kelemahan kode yang sepintas tampak normal saat diuji dengan data tengah (misal nilai 90 atau 50)."
        },
        {
          title: "3. Urutan Evaluasi Kondisi Bertingkat & Jebakan Dead Code",
          category: "Struktur Multicabang",
          relatedScenarios: "Skenario Uji #4",
          keyTerms: ["Cascading IF-ELIF", "Dead Code", "Evaluasi Top-Down", "Jangkauan Kondisi"],
          syntaxExample: "if skor > 60: grade = 'C'\nelif skor > 80: grade = 'A'  # DEAD CODE! Tidak pernah tercapai!",
          leadSentence: "Interpreter mengevaluasi percabangan bertingkat (if-elif) dari atas ke bawah dan langsung keluar begitu kondisi pertama terpenuhi, sehingga urutan kondisi yang salah menciptakan dead code.",
          desc: "Pada struktur cascading if-elif-else, kondisi dievaluasi secara sekuensial. Begitu sebuah kondisi bernilai True, blok kodenya dieksekusi dan seluruh blok elif berikutnya dilewati seketika. Jika seorang programmer meletakkan kondisi yang lebih luas di atas (misal if skor > 60) sebelum kondisi yang lebih spesifik (elif skor > 80), maka skor 95 akan ditangkap oleh blok pertama (Grade C). Blok skor > 80 menjadi kode mati (Dead Code) yang tidak akan pernah dieksekusi seumur hidup program.",
          keyPoints: [
            {
              label: "Prinsip Top-Down Exit",
              detail: "Kondisi pertama yang bernilai True mengunci eksekusi; interpreter langsung melompat keluar struktur.",
              badge: "First-Match Exit"
            },
            {
              label: "Anomali Dead Code",
              detail: "Blok kode yang valid secara sintaksis namun secara logika mustahil dijangkau oleh aliran alur apapun.",
              code: "Unreachable Code"
            },
            {
              label: "Aturan Monotonik Urutan",
              detail: "Urutan kondisi multi-tingkat wajib disusun monoton: dari kriteria tertinggi ke terendah, atau sebaliknya.",
              badge: "Monotonic Order"
            },
            {
              label: "Deteksi Dini di Laboratorium",
              detail: "Pengujian kasus nilai ekstrem tinggi membuktikan apakah cabang grade teratas berfungsi dengan benar.",
              badge: "Verification"
            }
          ],
          labInsight: "Dead code adalah aib rekayasa perangkat lunak. Compiler sering kali tidak mampu memperingatkan kesalahan urutan ini karena masing-masing ekspresi secara terpisah valid."
        },
        {
          title: "4. Evaluasi Singkat Logika Boolean (Short-Circuit Evaluation)",
          category: "Optimalitas & Proteksi",
          relatedScenarios: "Skenario Uji #5 & #6",
          keyTerms: ["Short-Circuit", "Lazy Evaluation", "Operator AND / OR", "Crash Prevention"],
          syntaxExample: "if pembagi != 0 and (total / pembagi) > 2:  # Aman! Tidak akan ZeroDivisionError",
          leadSentence: "Pada operator and, jika operan kiri False maka operan kanan tidak akan dievaluasi; pada operator or, jika operan kiri True maka operan kanan langsung diabaikan.",
          desc: "Short-Circuit Evaluation (evaluasi sirkuit pendek) adalah teknik optimasi di mana mesin komputasi berhenti mengevaluasi ekspresi logika majemuk begitu hasil akhirnya sudah pasti. Pada A and B: jika A bernilai False, maka keseluruhan ekspresi pasti False, sehingga B tidak pernah dijalankan. Fenomena ini dimanfaatkan secara cerdas sebagai benteng pertahanan (guard clause): ekspresi if pembagi != 0 and (total / pembagi) > 2 dijamin aman dari ZeroDivisionError saat pembagi bernilai 0, karena pembagian di sisi kanan tidak disentuh sama sekali.",
          keyPoints: [
            {
              label: "Sirkuit Pendek AND",
              detail: "False and [apapun] langsung bernilai False tanpa mengevaluasi ekspresi kanan.",
              code: "False and X -> False"
            },
            {
              label: "Sirkuit Pendek OR",
              detail: "True or [apapun] langsung bernilai True tanpa mengevaluasi ekspresi kanan.",
              code: "True or X -> True"
            },
            {
              label: "Guard Clause Pattern",
              detail: "Menempatkan validasi keamanan di sisi kiri operan untuk melindungi operasi berbahaya di sisi kanan.",
              badge: "Guard Clause"
            },
            {
              label: "Penghematan Beban CPU",
              detail: "Mencegah pemanggilan fungsi lambat atau kueri database jika kondisi awal sudah menggugurkan hasil.",
              badge: "CPU Efficiency"
            }
          ],
          labInsight: "Memahami Short-Circuit mengubah cara programmer menyusun kondisi. Menempatkan kondisi yang paling murah biayanya dan paling mungkin menggugurkan di sebelah kiri adalah praktik terbaik industri."
        },
        {
          title: "5. Percabangan Bersarang (Nested Selection) & Kompleksitas Kognitif",
          category: "Logika Majemuk",
          relatedScenarios: "Skenario Uji #7",
          keyTerms: ["Nested IF", "Kompleksitas Siklomatik", "Refactoring", "Kombinasi Logika"],
          syntaxExample: "if usia >= 17:\n    if berat >= 45:\n        status = 'Boleh Donor'",
          leadSentence: "Percabangan bersarang (Nested IF) menguji hierarki prasyarat multi-tahap, namun kedalaman sarang yang berlebihan meningkatkan kompleksitas kognitif dan menyulitkan pengujian.",
          desc: "Percabangan bersarang menempatkan struktur if di dalam badan if lainnya. Struktur ini ideal untuk proses skrining bertingkat (misalnya: donor darah mensyaratkan usia minimal 17 tahun, dan jika usia lolos, baru mengevaluasi berat badan minimal 45 kg). Namun, bersarang lebih dari tiga tingkat (deep nesting / Arrow Anti-pattern) meningkatkan kompleksitas siklomatik dan mempersulit pengujian. Praktik rekayasa modern sering merefaktornya menjadi kondisi kombinasi and atau teknik early exit.",
          keyPoints: [
            {
              label: "Hierarki Prasyarat",
              detail: "Kondisi anak (inner condition) hanya dievaluasi jika kondisi induk (outer condition) bernilai True.",
              badge: "Hierarchical"
            },
            {
              label: "Arrow Anti-Pattern",
              detail: "Bentuk kode yang menjorok tajam ke kanan akibat nesting berlebihan, mempersulit penelusuran alur.",
              badge: "Code Smell"
            },
            {
              label: "Refactoring dengan AND",
              detail: "Kondisi bertingkat sederhana dapat disederhanakan menjadi if usia >= 17 and berat >= 45.",
              code: "if A and B:"
            },
            {
              label: "Kejelasan Pesan Penolakan",
              detail: "Kelebihan Nested IF adalah kemampuan memberikan umpan balik spesifik pada masing-masing kegagalan tahap.",
              badge: "Granular Feedback"
            }
          ],
          labInsight: "Gunakan nested if jika Anda perlu memberikan alasan penolakan yang berbeda untuk setiap prasyarat (misal 'Usia belum cukup' vs 'Berat badan kurang'). Jika tidak, gabungkan dengan operator and."
        }
      ]
    },
    prosedurKerja: [
      "Buka instrumen editor uji coba di layar praktikum atau gunakan interpreter Python.",
      "Lakukan Uji Kasus 1: Jalankan penentuan kelulusan nilai normal (skor 85 -> Grade A) dan amati jalur True yang dieksekusi.",
      "Lakukan Uji Kasus 2: Jalankan penentuan kelulusan nilai gagal (skor 55 -> Grade E) dan amati pengalihan alur ke blok ELSE.",
      "Lakukan Uji Kasus 3: Uji nilai tepat di ambang batas skor 80.0 dengan kondisi skor > 80 vs skor >= 80. Amati anomali off-by-one.",
      "Lakukan Uji Kasus 4: Simulasikan bug Dead Code dengan menukar urutan kondisi if skor > 60 sebelum if skor > 80 pada nilai input 95. Catat hasil yang salah.",
      "Lakukan Uji Kasus 5: Uji proteksi Short-Circuit AND pada operasi pembagian dengan nol (pembagi != 0 and 100 / pembagi > 2) saat pembagi bernilai 0.",
      "Lakukan Uji Kasus 6: Uji Short-Circuit OR pada kondisi (True or 100 / 0 == 0) untuk membuktikan sisi kanan tidak dieksekusi.",
      "Catat seluruh hasil pengamatan aktual ke dalam Tabel Pengamatan Bagian C.",
      "Susun uraian analisis mendalam pada Bagian D dan rumuskan kesimpulan akhir pada Bagian E."
    ],
    prosedurSteps: [
      {
        no: 1,
        phase: "Persiapan",
        title: "Inisialisasi Lingkungan Uji Percabangan",
        instruction: "Siapkan modul pengujian dan verifikasi pemahaman struktur evaluasi kondisi True/False.",
        target: "Helper Simulator"
      },
      {
        no: 2,
        phase: "Eksperimen",
        title: "Uji Kasus 1 & 2: Happy Path & Jalur Alternatif ELSE",
        instruction: "Uji nilai 85 dan 55 pada struktur IF-ELSE penentuan kelulusan. Amati perpindahan jalur taken vs bypassed.",
        codeSnippet: "skor = 85\nif skor >= 70: print('Lulus')\nelse: print('Remedial')",
        scenarioRef: "Skenario #1 & #2"
      },
      {
        no: 3,
        phase: "Eksperimen",
        title: "Uji Kasus 3: Analisis Nilai Ambang Batas (Boundary Value)",
        instruction: "Bandingkan operator ketat (>) vs inklusif (>=) pada nilai batas tepat 80.0.",
        codeSnippet: "skor = 80.0\nprint('Ketat:', skor > 80)\nprint('Inklusif:', skor >= 80)",
        scenarioRef: "Skenario #3"
      },
      {
        no: 4,
        phase: "Eksperimen",
        title: "Uji Kasus 4: Investigasi Jebakan Dead Code pada Urutan Terbalik",
        instruction: "Jalankan urutan kondisi terbalik (kondisi umum di atas kondisi spesifik) pada skor 95. Amati penangkapan salah pada Grade C.",
        codeSnippet: "skor = 95\nif skor > 60: grade = 'C'\nelif skor > 80: grade = 'A'\nprint(grade)",
        scenarioRef: "Skenario #4"
      },
      {
        no: 5,
        phase: "Eksperimen",
        title: "Uji Kasus 5: Pembuktian Guard Clause Short-Circuit AND",
        instruction: "Uji kondisi ekspresi majemuk dengan pembagi nol. Buktikan tidak terjadi ZeroDivisionError karena sisi kanan diabaikan.",
        codeSnippet: "pembagi = 0\nif pembagi != 0 and (100 / pembagi) > 2: print('Lolos')\nelse: print('Aman dari Crash')",
        scenarioRef: "Skenario #5"
      },
      {
        no: 6,
        phase: "Eksperimen",
        title: "Uji Kasus 6: Pembuktian Short-Circuit OR",
        instruction: "Uji ekspresi True or (100 / 0 == 0) untuk membuktikan evaluasi berhenti seketika di operan pertama.",
        codeSnippet: "status = True or (100 / 0 == 0)\nprint('Hasil:', status)",
        scenarioRef: "Skenario #6"
      },
      {
        no: 7,
        phase: "Pencatatan",
        title: "Pencatatan Rasio Jalur & Evaluasi Logika",
        instruction: "Catat seluruh hasil aktual, status eksekusi cabang, dan pencegahan error ke dalam Tabel Pengamatan Bagian C.",
        target: "Tabel Bagian C"
      },
      {
        no: 8,
        phase: "Sintesis",
        title: "Analisis Pembahasan & Formulasi Kesimpulan",
        instruction: "Susun uraian analisis boundary testing pada Bagian D dan simpulkan hukum integritas percabangan pada Bagian E.",
        target: "Bagian D & E"
      }
    ],
    defaultObservations: [
      {
        no: 1,
        scenario: "Happy Path: Nilai di Atas Ambang Kelulusan",
        testInput: "skor = 85; if skor >= 70: Lulus; else: Remedial",
        expectedTheory: "Cabang True dieksekusi, cetak 'Lulus'",
        actualOutput: "Lulus",
        measuredMetric: "Jalur True aktif, jalur ELSE di-bypass",
        validationStatus: "Sesuai"
      },
      {
        no: 2,
        scenario: "Jalur Alternatif: Nilai di Bawah Ambang",
        testInput: "skor = 55; if skor >= 70: Lulus; else: Remedial",
        expectedTheory: "Cabang False dialihkan ke ELSE, cetak 'Remedial'",
        actualOutput: "Remedial",
        measuredMetric: "Jalur True di-bypass, jalur ELSE aktif",
        validationStatus: "Sesuai"
      },
      {
        no: 3,
        scenario: "Boundary Testing Tepat di Titik Ambang (80.0)",
        testInput: "skor = 80.0; uji (skor > 80) vs (skor >= 80)",
        expectedTheory: "Operator > menghasilkan False, operator >= menghasilkan True",
        actualOutput: "Ketat: False | Inklusif: True",
        measuredMetric: "Pembuktian off-by-one boundary sensitivity",
        validationStatus: "Sesuai"
      },
      {
        no: 4,
        scenario: "Uji Urutan Terbalik (Dead Code Bug)",
        testInput: "skor = 95; if skor > 60: C; elif skor > 80: A",
        expectedTheory: "Salah tangkap: berhenti di grade C, blok A terlewati",
        actualOutput: "C (Seharusnya Grade A!)",
        measuredMetric: "Blok elif skor > 80 menjadi Dead Code",
        validationStatus: "Sesuai"
      },
      {
        no: 5,
        scenario: "Short-Circuit AND Sebagai Crash Guard",
        testInput: "p = 0; if p != 0 and (100 / p) > 2: OK; else: Crash Guard",
        expectedTheory: "p != 0 bernilai False, sisi kanan diabaikan (bebas crash)",
        actualOutput: "Aman dari Crash",
        measuredMetric: "ZeroDivisionError dicegah oleh lazy evaluation",
        validationStatus: "Sesuai"
      },
      {
        no: 6,
        scenario: "Short-Circuit OR Mengabaikan Operan Kanan",
        testInput: "hasil = True or (100 / 0 == 0)",
        expectedTheory: "Sisi kiri True, ekspresi kanan diabaikan",
        actualOutput: "Hasil: True",
        measuredMetric: "Eksekusi berhasil tanpa interupsi hardware",
        validationStatus: "Sesuai"
      },
      {
        no: 7,
        scenario: "Nested Selection Skrining Donor Darah",
        testInput: "usia = 16; berat = 50; if usia >= 17: if berat >= 45: OK",
        expectedTheory: "Gagal di seleksi luar (usia), seleksi dalam tidak disentuh",
        actualOutput: "Usia belum mencukupi",
        measuredMetric: "1 level evaluasi (efisiensi pruning)",
        validationStatus: "Sesuai"
      }
    ],
    analisisPrompts: [
      "Berdasarkan hasil pengujian skenario 3, jelaskan bahaya dari off-by-one bug jika seorang analis sistem salah memilih operator > alih-alih >= pada sistem penentuan penerima beasiswa bernilai ambang batas 80!",
      "Mengapa pada skenario 4 nilai skor 95 menghasilkan Grade C dan bukan Grade A? Jelaskan mekanisme top-down exit pada interpreter dan bagaimana cara menyusun urutan kondisi bertingkat yang benar!",
      "Jelaskan prinsip kerja Short-Circuit Evaluation pada skenario 5 dan 6! Mengapa operasi 100 / 0 tidak membangkitkan ZeroDivisionError, dan bagaimana teknik guard clause ini dimanfaatkan dalam rekayasa aplikasi berskala besar?"
    ],
    kesimpulanPrompts: [
      "Tuliskan kesimpulan ilmiah mengenai pentingnya Boundary Value Analysis dalam menjamin keadilan dan kebenaran logika pada struktur percabangan!",
      "Bagaimana evaluasi logika singkat (Short-Circuit) bertindak ganda sebagai penghemat siklus komputasi prosesor sekaligus pelindung integritas sistem dari crash fatal?"
    ]
  },
  {
    id: 4,
    title: "Looping (Perulangan)",
    subtitle: "Validasi Kondisi Berhenti, Pencegahan Infinite Loop, dan Skalabilitas Kompleksitas Waktu",
    focusValidation: "Validasi kondisi terminasi (termination condition), eliminasi infinite loop, dan pengujian kasus batas (0 iterasi).",
    focusMeasurement: "Pengukuran jumlah iterasi aktual, penghitungan siklus CPU, dan komparasi waktu eksekusi O(N) vs O(N^2).",
    capaian: [
      "Mampu menguji dan memvalidasi keabsahan kondisi terminasi (termination condition) pada struktur perulangan terhitung (FOR) dan tak terhitung (WHILE).",
      "Mampu mendeteksi dan mencegah jebakan perulangan tak hingga (Infinite Loop) melalui instrumen pembaruan variabel kontrol dan timeout safeguard.",
      "Mampu mengukur secara kuantitatif skalabilitas waktu eksekusi program saat ukuran masukan N ditingkatkan secara bertingkat (N = 10 s.d. 100.000)."
    ],
    dasarTeori: {
      overview: "Struktur perulangan (Looping / Iteration) mengotomatisasi eksekusi blok kode berulang kali tanpa redundansi penulisan instruksi. Efektivitas perulangan dikendalikan oleh dua pilar fundamental: (1) kepastian kondisi terminasi (Loop Invariant & Termination) untuk menjamin program selalu berhenti dan tidak menyebabkan hang sistem, serta (2) skalabilitas kompleksitas waktu (Time Complexity) saat menangani lonjakan volume data.",
      leadParagraph: "Struktur perulangan (Looping) adalah mesin pengali tenaga komputasi. Melalui kombinasi register pencacah dan pengujian predikat Boolean, satu blok instruksi dapat dieksekusi jutaan kali dengan utilisasi memori yang tetap ringkas dan efisien.",
      fundamentalPillars: [
        {
          number: 1,
          title: "Kepastian Terminasi & Pencegahan Hang Sistem",
          desc: "Setiap perulangan wajib memiliki mutasi state yang secara monoton mendekati kondisi terminasi (Loop Invariant). Ketiadaan pembaruan variabel kontrol memicu pemborosan siklus CPU 100% dan kelumpuhan sistem.",
          tag: "Loop Invariant & Termination",
          badge: "Pilar 1"
        },
        {
          number: 2,
          title: "Skalabilitas Komputasi & Efisiensi Waktu CPU",
          desc: "Jumlah iterasi menentukan pertumbuhan waktu eksekusi. Perulangan tunggal tumbuh linear O(N), sedangkan perulangan bersarang tumbuh kuadratik O(N^2), menyebabkan lonjakan latensi dramatis pada data besar.",
          tag: "Time Complexity O(N)",
          badge: "Pilar 2"
        }
      ],
      keyConceptsSummary: [
        "Definite (FOR) vs Indefinite (WHILE)",
        "Termination Condition & Invariant",
        "Infinite Loop & Timeout Guard",
        "Interupsi Alur (break & continue)",
        "Pythonic Loop else: Construct",
        "Skalabilitas O(N) vs O(N^2)"
      ],
      points: [
        {
          title: "1. Taksonomi Perulangan: Definite Loop (FOR) vs Indefinite Loop (WHILE)",
          category: "Struktur Iterasi",
          relatedScenarios: "Skenario Uji #1 & #2",
          keyTerms: ["Definite Iteration", "Indefinite Iteration", "range(start, stop, step)", "Koleksi Terurut"],
          syntaxExample: "for i in range(1, 6):\n    print(i)  # Iterasi terhitung 5 langkah pasti",
          leadSentence: "Perulangan FOR digunakan saat batas jumlah iterasi telah diketahui pasti di awal (Definite), sedangkan WHILE digunakan saat perulangan bergantung pada kondisi dinamis runtime (Indefinite).",
          desc: "Sains komputasi membedakan iterasi menjadi dua kategori utama. Perulangan Terhitung (Definite Iteration) diwakili oleh struktur for yang mengiterasi deret angka terhitung melalui generator seperti range(start, stop, step) atau elemen koleksi data. Sebaliknya, Perulangan Terkondisi (Indefinite Iteration) diwakili oleh struktur while yang terus mengeksekusi blok selama kondisi Boolean bernilai True. Pemilihan struktur yang tepat mencegah kekeliruan arsitektur alur program.",
          keyPoints: [
            {
              label: "Definite Iteration (FOR)",
              detail: "Batas awal, akhir, dan interval loncatan (step) terdefinisi secara pasti sebelum perulangan dimulai.",
              code: "for i in range():"
            },
            {
              label: "Indefinite Iteration (WHILE)",
              detail: "Berapa kali loop berjalan tidak diketahui di awal; loop berjalan dinamis hingga kondisi bernilai False.",
              code: "while kondisi:"
            },
            {
              label: "Anatomi range() Generator",
              detail: "Parameter range(start, stop, step): batas stop bersifat eksklusif (berhenti di stop - 1).",
              badge: "Exclusive Stop"
            },
            {
              label: "Kasus Batas 0 Iterasi",
              detail: "Jika kondisi awal sudah False (misal range(10, 2, 1)), badan loop diabaikan 0 kali tanpa error.",
              badge: "Zero Iteration"
            }
          ],
          labInsight: "Pahami sifat eksklusif batas akhir range(1, 10) yang hanya berjalan sampai 9. Kesalahan ini adalah manifestasi klasik dari off-by-one bug pada struktur perulangan."
        },
        {
          title: "2. Nilai Sentinel & Penjaga Batas (Loop Invariant)",
          category: "Logika Kondisi",
          relatedScenarios: "Skenario Uji #3",
          keyTerms: ["Sentinel Value", "Loop Invariant", "Pembaruan Kontrol", "Akumulator"],
          syntaxExample: "while input_data != 'SELESAI':\n    input_data = input('Ketik SELESAI:')",
          leadSentence: "Nilai Sentinel adalah nilai tanda khusus yang memicu terminasi perulangan tak tentu (WHILE) saat pengguna atau sensor mengisyaratkan akhir aliran data.",
          desc: "Pada sistem interaktif seperti mesin kasir atau pembacaan sensor IoT, perulangan tidak dapat dihitung dengan range() karena programmer tidak tahu berapa banyak barang yang dibeli pelanggan. Sistem mengandalkan Nilai Sentinel (misalnya angka -1 atau string 'SELESAI') sebagai sinyal terminasi. Agar perulangan berakhir secara sah, badan loop wajib memperbarui variabel kontrol di setiap putaran sehingga mendekati nilai sentinel.",
          keyPoints: [
            {
              label: "Nilai Sentinel",
              detail: "Data spesial yang bukan bagian dari domain proses, difungsikan khusus sebagai sinyal penghenti.",
              code: "sentinel = -1"
            },
            {
              label: "Tiga Syarat Loop Sehat",
              detail: "Inisialisasi variabel kontrol, evaluasi kondisi pada header, dan mutasi variabel di dalam badan.",
              badge: "3 Syarat Loop"
            },
            {
              label: "Loop Invariant",
              detail: "Kondisi logika yang selalu bernilai benar sebelum dan sesudah setiap putaran iterasi.",
              badge: "Invariant"
            },
            {
              label: "Pola Pembacaan Kasir",
              detail: "Membaca data masukan berulang kali sampai pelanggan memasukkan kode bayar akhir.",
              badge: "Real-World Pattern"
            }
          ],
          labInsight: "Nilai sentinel harus dipilih dari nilai yang mustahil menjadi data input valid. Menggunakan 0 sebagai sentinel pada aplikasi pencatat suhu akan merusak pencatatan saat suhu tepat 0°C!"
        },
        {
          title: "3. Fenomena Infinite Loop & Mekanisme Circuit Breaker",
          category: "Keamanan Runtime",
          relatedScenarios: "Skenario Uji #4",
          keyTerms: ["Infinite Loop", "CPU Starvation", "Circuit Breaker", "Counter Mutation"],
          syntaxExample: "i = 1\nwhile i <= 5:\n    # Lupa i += 1 -> INFINITE LOOP! CPU 100%",
          leadSentence: "Ketiadaan mutasi pada variabel kontrol menyebabkan kondisi penguji bernilai True selamanya, mengurung prosesor dalam perulangan tak hingga (Infinite Loop).",
          desc: "Infinite Loop terjadi ketika kondisi terminasi perulangan while tidak pernah tercapai. Penyebab paling umum adalah programmer lupa menambahkan perintah pembaruan variabel pencacah (misalnya i += 1) di dalam badan perulangan. Akibatnya, variabel pencacah tetap bernilai sama dan kondisi i <= 5 selalu True. Komputer terkunci dalam putaran abadi, memboroskan 100% kapasitas satu inti CPU (CPU starvation), dan antarmuka aplikasi menjadi hang/tidak merespons.",
          keyPoints: [
            {
              label: "Lupa Increment Pencacah",
              detail: "Variabel penguji bernilai statis selamanya karena tidak ada baris yang mengubah nilainya.",
              code: "i = 1; while i <= 5:"
            },
            {
              label: "CPU Starvation",
              detail: "Prosesor mengeksekusi instruksi yang sama miliaran kali per detik tanpa menghasilkan progres.",
              badge: "CPU 100%"
            },
            {
              label: "Circuit Breaker / Timeout",
              detail: "Mekanisme pengaman darurat yang memaksa perulangan berhenti jika melampaui ambang batas aman.",
              code: "if loop_count > MAX: break"
            },
            {
              label: "Defensive Programming",
              detail: "Selalu sertakan batas maksimum iterasi (safety cap) pada perulangan while di sistem produksi.",
              badge: "Safety Cap"
            }
          ],
          labInsight: "Di laboratorium ini, simulator dilengkapi Circuit Breaker otomatis yang memotong eksekusi jika perulangan melebihi 2.000 iterasi untuk melindungi browser mahasiswa dari crash."
        },
        {
          title: "4. Pengendali Aliran: break, continue, dan Fitur Unik Loop else:",
          category: "Interupsi Alur",
          relatedScenarios: "Skenario Uji #5",
          keyTerms: ["break", "continue", "loop else:", "Early Exit"],
          syntaxExample: "for x in data:\n    if x == target: break\nelse: print('Tidak Ditemukan')",
          leadSentence: "Pernyataan break menghentikan perulangan seketika, continue melompati sisa iterasi saat ini, dan blok else: dieksekusi jika perulangan selesai alami tanpa terkena break.",
          desc: "Sains komputasi menyediakan instrumen interupsi terarah di dalam loop. Pernyataan break melompat keluar dari perulangan secara dini (early exit), sangat efisien untuk algoritma pencarian (Linear Search) begitu target ditemukan. Pernyataan continue melompati sisa baris pada iterasi aktif dan langsung melanjutkan ke putaran berikutnya. Fitur unik pada bahasa modern (seperti Python) adalah konstruksi loop else:, yang hanya dieksekusi jika perulangan selesai secara tuntas tanpa pernah tersentuh oleh pernyataan break.",
          keyPoints: [
            {
              label: "Pernyataan break",
              detail: "Menghentikan seluruh perulangan seketika dan melompat ke baris pertama setelah blok loop.",
              code: "break"
            },
            {
              label: "Pernyataan continue",
              detail: "Mengabaikan sisa instruksi di bawahnya hanya untuk putaran saat ini, lalu lanjut ke iterasi berikutnya.",
              code: "continue"
            },
            {
              label: "Konstruksi loop else:",
              detail: "Hanya berjalan jika loop tuntas normal (berguna untuk konfirmasi 'Data tidak ditemukan').",
              code: "for...else:"
            },
            {
              label: "Efisiensi Siklus Pencarian",
              detail: "Menggunakan break saat target ditemukan di elemen ke-3 dari 1.000.000 data menghemat 999.997 iterasi sia-sia.",
              badge: "O(1) Best Case"
            }
          ],
          labInsight: "Konstruksi loop else: mengeliminasi kebutuhan variabel flag boolean tambahan (seperti ditemukan = False), menghasilkan kode yang lebih elegan dan bebas bug."
        },
        {
          title: "5. Kompleksitas Waktu Empiris: Single Loop O(N) vs Nested Loop O(N²)",
          category: "Analisis Algoritma",
          relatedScenarios: "Skenario Uji #6 & #7",
          keyTerms: ["Kompleksitas Waktu", "Big-O Notation", "Single Loop O(N)", "Nested Loop O(N^2)"],
          syntaxExample: "for i in range(N):\n    for j in range(N):\n        operasi()  # N * N total eksekusi!",
          leadSentence: "Waktu eksekusi single loop tumbuh secara linear O(N), sedangkan perulangan bersarang (nested loop) tumbuh kuadratik O(N^2), memicu ledakan waktu komputasi saat N membesar.",
          desc: "Skalabilitas algoritma diukur dari bagaimana waktu eksekusi bertambah terhadap kenaikan volume data masukan (N). Perulangan tunggal memiliki kompleksitas linier O(N): jika N naik 10 kali lipat, waktu eksekusi bertambah 10 kali lipat. Namun pada perulangan bersarang (Nested Loop dua tingkat), untuk setiap putaran loop luar, loop dalam berputar sebanyak N kali, menghasilkan total operasi N * N = N^2. Untuk N = 1.000, single loop mengeksekusi 1.000 langkah, sedangkan nested loop mengeksekusi 1.000.000 langkah komputasi.",
          keyPoints: [
            {
              label: "Kompleksitas Linear O(N)",
              detail: "Waktu eksekusi proporsional langsung terhadap ukuran input N (grafik garis lurus).",
              code: "O(N)"
            },
            {
              label: "Kompleksitas Kuadratik O(N²)",
              detail: "Waktu eksekusi bertambah kuadratik (grafik kurva eksponensial curam); bahaya laten pada data besar.",
              code: "O(N^2)"
            },
            {
              label: "Perhitungan Langkah Nyata",
              detail: "Untuk N = 10.000, operasi O(N) = 10.000 langkah, sedangkan O(N^2) = 100.000.000 langkah CPU.",
              badge: "Scale Hazard"
            },
            {
              label: "Pemberantasan Redundansi",
              detail: "Mendorong mahasiswa mencari solusi cerdas untuk menghindari perulangan bersarang yang tidak perlu.",
              badge: "Optimization"
            }
          ],
          labInsight: "Analisis empiris di laboratorium membuktikan bahwa perbedaan O(N) dan O(N^2) bukan sekadar teori matematika, melainkan pembeda nyata antara aplikasi instan (<10ms) dan aplikasi yang macet berjam-jam."
        }
      ]
    },
    prosedurKerja: [
      "Buka instrumen editor uji coba di layar praktikum atau gunakan interpreter Python.",
      "Lakukan Uji Kasus 1: Jalankan perulangan FOR akumulator penjumlahan deret bilangan 1 sampai 10 (range(1, 11)). Catat hasil akhir 55.",
      "Lakukan Uji Kasus 2: Uji kasus batas 0 iterasi dengan memanggil range(10, 2, 1). Buktikan blok loop dilewati 0 kali tanpa error.",
      "Lakukan Uji Kasus 3: Jalankan simulasi kasir WHILE dengan nilai sentinel angka -1. Hitung total belanja hingga kasir memasukkan -1.",
      "Lakukan Uji Kasus 4: Simulasikan jebakan Infinite Loop yang dihentikan oleh Circuit Breaker (maksimal 2.000 iterasi). Catat peringatan sistem.",
      "Lakukan Uji Kasus 5: Uji efisiensi Linear Search dengan perintah break pada target yang berada di awal deret vs pencarian tuntas tanpa break.",
      "Lakukan Uji Kasus 6: Ukur waktu eksekusi Single Loop O(N) pada N = 10.000 elemen dan bandingkan terhadap Nested Loop O(N^2) pada N = 1.000.",
      "Catat seluruh hasil pengamatan aktual ke dalam Tabel Pengamatan Bagian C.",
      "Susun uraian analisis mendalam pada Bagian D dan rumuskan kesimpulan akhir pada Bagian E."
    ],
    prosedurSteps: [
      {
        no: 1,
        phase: "Persiapan",
        title: "Inisialisasi Lingkungan Uji Perulangan",
        instruction: "Siapkan modul pengujian dan aktifkan pemantau waktu eksekusi serta pelacak jumlah iterasi.",
        target: "Helper Simulator"
      },
      {
        no: 2,
        phase: "Eksperimen",
        title: "Uji Kasus 1: Akumulator Deret FOR (range 1 s.d. 10)",
        instruction: "Eksekusi akumulator penjumlahan nilai 1 sampai 10 menggunakan range(1, 11) dan amati transisi state total.",
        codeSnippet: "total = 0\nfor i in range(1, 11): total += i\nprint(total)",
        scenarioRef: "Skenario #1"
      },
      {
        no: 3,
        phase: "Eksperimen",
        title: "Uji Kasus 2: Kasus Batas Batas Awal Melampaui Batas Akhir (0 Iterasi)",
        instruction: "Uji ekspresi range(10, 2, 1) dengan step positif. Buktikan program tidak crash dan langsung melewati badan loop.",
        codeSnippet: "hitung = 0\nfor i in range(10, 2, 1): hitung += 1\nprint('Iterasi:', hitung)",
        scenarioRef: "Skenario #2"
      },
      {
        no: 4,
        phase: "Eksperimen",
        title: "Uji Kasus 3: Perulangan WHILE Berbasis Nilai Sentinel Kasir",
        instruction: "Simulasikan masukan belanja berulang kali sampai sentinel -1 diinputkan.",
        codeSnippet: "total = 0; items = [25000, 15000, 10000, -1]; idx = 0\nwhile items[idx] != -1: total += items[idx]; idx += 1\nprint('Total:', total)",
        scenarioRef: "Skenario #3"
      },
      {
        no: 5,
        phase: "Eksperimen",
        title: "Uji Kasus 4: Investigasi Infinite Loop & Circuit Breaker Safeguard",
        instruction: "Jalankan perulangan while tanpa increment pencacah. Buktikan penghentian otomatis oleh Circuit Breaker pada batas 2.000 iterasi.",
        codeSnippet: "i = 1; count = 0\nwhile i <= 5:\n    count += 1\n    if count >= 2000: print('Circuit Breaker Aktif!'); break",
        scenarioRef: "Skenario #4"
      },
      {
        no: 6,
        phase: "Eksperimen",
        title: "Uji Kasus 5: Early Exit dengan break pada Linear Search",
        instruction: "Cari angka 7 pada deret 1 s.d. 1.000. Buktikan loop berhenti di langkah ke-7 dan menghemat 993 iterasi berikutnya.",
        codeSnippet: "langkah = 0\nfor x in range(1, 1001):\n    langkah += 1\n    if x == 7: break\nprint('Ditemukan dalam langkah:', langkah)",
        scenarioRef: "Skenario #5"
      },
      {
        no: 7,
        phase: "Eksperimen",
        title: "Uji Kasus 6: Benchmarking Skalabilitas O(N) vs O(N²)",
        instruction: "Bandingkan waktu eksekusi Single Loop O(N) pada N=100.000 vs Nested Loop O(N^2) pada N=1.000.",
        codeSnippet: "import time\nt0 = time.time(); s = sum(range(100000)); t_single = time.time() - t0\nt0 = time.time(); c = sum(1 for i in range(1000) for j in range(1000)); t_nested = time.time() - t0\nprint(f'Single O(N): {t_single*1000:.2f}ms | Nested O(N^2): {t_nested*1000:.2f}ms')",
        scenarioRef: "Skenario #6 & #7"
      },
      {
        no: 8,
        phase: "Pencatatan",
        title: "Pencatatan Iterasi & Waktu Komputasi",
        instruction: "Catat seluruh jumlah iterasi aktual dan selisih waktu eksekusi ke dalam Tabel Pengamatan Bagian C.",
        target: "Tabel Bagian C"
      },
      {
        no: 9,
        phase: "Sintesis",
        title: "Analisis Pembahasan & Formulasi Kesimpulan",
        instruction: "Susun uraian analisis kompleksitas algoritma pada Bagian D dan simpulkan hukum skalabilitas pada Bagian E.",
        target: "Bagian D & E"
      }
    ],
    defaultObservations: [
      {
        no: 1,
        scenario: "Akumulator FOR Range Terhitung (1 s.d. 10)",
        testInput: "total = 0; for i in range(1, 11): total += i",
        expectedTheory: "Berjalan tepat 10 iterasi, menghasilkan total = 55",
        actualOutput: "55",
        measuredMetric: "10 langkah terhitung (Definite Iteration)",
        validationStatus: "Sesuai"
      },
      {
        no: 2,
        scenario: "Kasus Batas Awal Melampaui Batas Akhir",
        testInput: "for i in range(10, 2, 1): print(i)",
        expectedTheory: "Kondisi awal False, badan loop dilewati 0 kali",
        actualOutput: "Tidak ada output (Iterasi: 0)",
        measuredMetric: "0 iterasi tanpa exception error",
        validationStatus: "Sesuai"
      },
      {
        no: 3,
        scenario: "Perulangan WHILE dengan Nilai Sentinel Kasir (-1)",
        testInput: "items = [25000, 15000, 10000, -1]; akumulasi belanja",
        expectedTheory: "Berhenti saat elemen bernilai -1 terbaca",
        actualOutput: "Total: 50000",
        measuredMetric: "3 iterasi proses + 1 iterasi sentinel exit",
        validationStatus: "Sesuai"
      },
      {
        no: 4,
        scenario: "Deteksi Infinite Loop & Safety Circuit Breaker",
        testInput: "i = 1; while i <= 5: count += 1 (tanpa i += 1)",
        expectedTheory: "Loop tidak berhenti, diputus paksa di limit aman",
        actualOutput: "Circuit Breaker Aktif! (Diputus pada iterasi 2000)",
        measuredMetric: "Proteksi hang sistem dari starvation",
        validationStatus: "Sesuai"
      },
      {
        no: 5,
        scenario: "Optimasi Early Exit Menggunakan break",
        testInput: "Cari angka 7 pada deret 1 s.d. 1.000 dengan break",
        expectedTheory: "Loop langsung berhenti di angka 7 (hemat 993 langkah)",
        actualOutput: "Ditemukan dalam langkah: 7",
        measuredMetric: "Efisiensi 99.3% siklus instruksi dihemat",
        validationStatus: "Sesuai"
      },
      {
        no: 6,
        scenario: "Komparasi Waktu Skalabilitas: Single Loop O(N)",
        testInput: "Single loop N = 100.000 iterasi",
        expectedTheory: "Waktu eksekusi sangat cepat (< 15 ms)",
        actualOutput: "Single O(N): ~4.20 ms",
        measuredMetric: "Pertumbuhan linear O(N)",
        validationStatus: "Sesuai"
      },
      {
        no: 7,
        scenario: "Komparasi Waktu Skalabilitas: Nested Loop O(N²)",
        testInput: "Nested loop dua tingkat N = 1.000 (1.000.000 iterasi)",
        expectedTheory: "Waktu eksekusi melonjak tajam dibanding single loop",
        actualOutput: "Nested O(N^2): ~48.50 ms",
        measuredMetric: "Pertumbuhan kuadratik O(N^2) (1 juta operasi)",
        validationStatus: "Sesuai"
      }
    ],
    analisisPrompts: [
      "Berdasarkan pengujian skenario 1 dan 2, jelaskan cara kerja generator range(start, stop, step) dan mengapa parameter stop bersifat eksklusif! Mengapa sifat ini sering menjadi sumber off-by-one error pada pemula?",
      "Jelaskan secara mendalam mengapa ketiadaan mutasi variabel kontrol pada skenario 4 memicu Infinite Loop, dan apa dampak fisiknya terhadap pemakaian daya serta suhu CPU pada server produksi!",
      "Analisis perbandingan waktu eksekusi antara skenario 6 dan 7! Mengapa Nested Loop dengan N yang jauh lebih kecil (1.000) membutuhkan waktu eksekusi lebih dari 10 kali lipat dibanding Single Loop dengan N = 100.000?"
    ],
    kesimpulanPrompts: [
      "Rumuskan kesimpulan ilmiah mengenai prinsip Loop Invariant dan pentingnya pemilihan struktur iterasi yang tepat (Definite vs Indefinite) dalam rekayasa perangkat lunak!",
      "Bagaimana pembuktian empiris kompleksitas waktu O(N) vs O(N^2) memandu seorang insinyur komputasi dalam merancang algoritma yang tangguh dan skalabel?"
    ]
  },
  {
    id: 5,
    title: "Function (Fungsi & Modularitas)",
    subtitle: "Validasi Kontrak I/O, Isolasi Scope Variabel, dan Tracing Call Stack",
    focusValidation: "Validasi parameter formal vs aktual, pembedaan return value vs NoneType, dan pembuktian isolasi scope memori lokal vs global.",
    focusMeasurement: "Tracing alokasi stack frame di RAM, overhead siklus CPU pemanggilan fungsi, dan eliminasi side effects.",
    capaian: [
      "Mampu memvalidasi keutuhan kontrak input-output (parameter formal vs argumen aktual) dan membedakan fungsi murni (Pure Function) dengan prosedur ber-side effect.",
      "Mampu membuktikan secara empiris batas isolasi ruang lingkup (Scope Isolation) variabel lokal di dalam Call Stack frame versus variabel global di RAM.",
      "Mampu mendeteksi dan mencegah jebakan nilai kembalian kosong (NoneType bug) serta bahaya penggunaan argumen bawaan bertipe data dapat-berubah (Mutable Default Argument)."
    ],
    dasarTeori: {
      overview: "Fungsi (Function) adalah unit dekomposisi modular yang mengemas serangkaian instruksi menjadi sub-program yang independen, dapat digunakan kembali (reusable), dan dapat diuji secara terisolasi. Arsitektur fungsi dikendalikan oleh dua pilar fundamental: (1) isolasi memori ruang lingkup (Scope & Stack Frame) yang melindungi variabel lokal dari pencemaran lingkungan global, serta (2) integritas kontrak I/O dan determinisme fungsi murni (Pure Function & Contracts) yang menjamin ketiadaan efek samping merusak (side effects).",
      leadParagraph: "Fungsi (Function) adalah jantung dekomposisi perangkat lunak modern. Beroperasi dengan protokol pemanggilan Call-and-Return, setiap invokasi fungsi menciptakan lingkungan eksekusi terisolasi (Stack Frame) di memori RAM yang hidup dan musnah secara otomatis.",
      fundamentalPillars: [
        {
          number: 1,
          title: "Isolasi Scope Memori & Proteksi Variabel Global",
          desc: "Variabel di dalam badan fungsi dialokasikan secara lokal pada Stack Frame prosesor. Begitu fungsi selesai dieksekusi, memori lokal dimusnahkan seketika (deallocated), menjamin proteksi variabel global dari efek samping tak terduga.",
          tag: "Scope & Stack Frame",
          badge: "Pilar 1"
        },
        {
          number: 2,
          title: "Integritas Kontrak I/O & Determinisme Pure Function",
          desc: "Fungsi yang ideal menerima parameter input secara eksplisit dan mengembalikan hasil lewat return tanpa memanipulasi state luar. Nilai input yang sama dijamin selalu menghasilkan keluaran yang identik (Referential Transparency).",
          tag: "Pure Function & Contracts",
          badge: "Pilar 2"
        }
      ],
      keyConceptsSummary: [
        "Dekomposisi Modular (Call-and-Return)",
        "Call Stack Frame & Lifecycle Memori",
        "Scope Isolation (Local vs Global)",
        "Return Value vs NoneType Void",
        "Formal Parameter vs Actual Argument",
        "Mutable Default Argument Trap"
      ],
      points: [
        {
          title: "1. Dekomposisi Modular & Alur Kontrol Call-and-Return",
          category: "Arsitektur Modular",
          relatedScenarios: "Skenario Uji #1",
          keyTerms: ["Call-and-Return", "Dekomposisi Masalah", "Abstraksi Prosedural", "Reusable"],
          syntaxExample: "def hitung_pajak(gaji, tarif=0.05):\n    return gaji * tarif",
          leadSentence: "Mekanisme Call-and-Return menunda eksekusi kode utama, memindahkan Program Counter ke alamat fungsi, memproses sub-instruksi, lalu mengembalikan kontrol beserta nilai hasil.",
          desc: "Dekomposisi modular memecah kompleksitas sistem monolitik menjadi modul-modul fungsi kecil yang memiliki satu tanggung jawab spesifik (Single Responsibility Principle). Saat fungsi dipanggil, Program Counter melompat ke blok kode fungsi. Setelah mencapai pernyataan return atau akhir blok, alur kembali ke titik pemanggilan semula (Return Address). Pendekatan ini meningkatkan keterbacaan, memangkas duplikasi kode, dan mempermudah unit testing.",
          keyPoints: [
            {
              label: "Alur Call-and-Return",
              detail: "Prosesor menyimpan Return Address sebelum melompat ke badan fungsi, menjamin alur kembali akurat.",
              badge: "Call-Return"
            },
            {
              label: "Single Responsibility",
              detail: "Setiap fungsi dirancang untuk mengerjakan satu tugas komputasi spesifik secara tuntas.",
              badge: "Clean Code"
            },
            {
              label: "Abstraksi Antarmuka",
              detail: "Pemanggil fungsi hanya perlu mengetahui kontrak I/O tanpa harus memahami seluk-beluk internalnya.",
              code: "def nama(param):"
            },
            {
              label: "Keterujian (Testability)",
              detail: "Fungsi modular dapat diuji dengan unit test independen terpisah dari antarmuka pengguna.",
              badge: "Unit Test"
            }
          ],
          labInsight: "Fungsi yang baik adalah fungsi yang independen: tidak bergantung pada variabel luar dan tidak melakukan input/print langsung di dalam rumusnya."
        },
        {
          title: "2. Struktur Call Stack & Siklus Hidup Memori Stack Frame",
          category: "Manajemen Memori RAM",
          relatedScenarios: "Skenario Uji #2",
          keyTerms: ["Call Stack", "Stack Frame", "Aktivasi Memori", "Deallokasi Otomatis"],
          syntaxExample: "def kuadrat(x):\n    hasil = x * x  # Frame lokal dialokasikan di RAM\n    return hasil   # Frame dihancurkan seketika!",
          leadSentence: "Setiap pemanggilan fungsi mengalokasikan Stack Frame baru di tumpukan memori RAM (Call Stack) untuk menampung variabel lokal, yang langsung dimusnahkan begitu fungsi selesai.",
          desc: "Memori RAM untuk fungsi dikelola menggunakan struktur tumpukan Last-In First-Out (Call Stack). Saat fungsi dipanggil, sistem operasi mengalokasikan blok memori Stack Frame yang memuat parameter formal, variabel lokal, dan alamat kembali. Ketika fungsi menyelesaikan tugasnya lewat perintah return, Stack Frame-nya di-pop (dihancurkan) dari tumpukan memori. Variabel lokal di dalamnya lenyap seketika, mengembalikan sumber daya memori ke sistem.",
          keyPoints: [
            {
              label: "Struktur LIFO Tumpukan",
              detail: "Fungsi yang dipanggil terakhir akan selesai dan dihapus dari stack terlebih dahulu.",
              code: "Push & Pop Frame"
            },
            {
              label: "Alokasi Variabel Lokal",
              detail: "Seluruh variabel di dalam fungsi disimpan eksklusif di dalam Stack Frame yang bersangkutan.",
              badge: "Stack Frame"
            },
            {
              label: "Pembersihan Memori Otomatis",
              detail: "Memori dikembalikan ke sistem tanpa intervensi manual (zero memory leak).",
              badge: "Garbage Auto"
            },
            {
              label: "Bahaya Stack Overflow",
              detail: "Pemanggilan rekursif tanpa henti akan memenuhi batas kapasitas stack dan memicu StackOverflowError.",
              badge: "Stack Overflow"
            }
          ],
          labInsight: "Pahami bahwa variabel di dalam fungsi berumur pendek: mereka lahir saat fungsi dipanggil, dan mati saat fungsi mengembalikan nilai."
        },
        {
          title: "3. Isolasi Ruang Lingkup (Scope Isolation: Lokal vs Global)",
          category: "Integritas Variabel",
          relatedScenarios: "Skenario Uji #3 & #4",
          keyTerms: ["Scope Isolation", "Local Scope", "Global Scope", "NameError", "Variable Shadowing"],
          syntaxExample: "def f():\n    pesan = 'halo'\nprint(pesan)  # NameError: name 'pesan' is not defined!",
          leadSentence: "Variabel lokal terisolasi secara kedap di dalam fungsi dan mustahil diakses langsung dari ranah global, melindungi integritas variabel global dari tabrakan nama.",
          desc: "Prinsip Scope Isolation menjamin variabel yang dideklarasikan di dalam fungsi (Local Scope) hanya dapat dilihat dan dimanipulasi oleh fungsi itu sendiri. Percobaan membaca variabel lokal dari lingkungan luar (Global Scope) memicu NameError. Sebaliknya, jika nama variabel lokal identik dengan variabel global, interpreter melakukan Variable Shadowing (memprioritaskan variabel lokal tanpa mengubah nilai variabel global di luar, kecuali kata kunci global dideklarasikan secara eksplisit).",
          keyPoints: [
            {
              label: "Isolasi Kedap Lokal",
              detail: "Kode di luar fungsi dilarang mengintip atau mengubah isi variabel lokal di dalam fungsi.",
              code: "NameError"
            },
            {
              label: "Variable Shadowing",
              detail: "Variabel lokal menutupi variabel global bernama sama tanpa memodifikasi nilai global aslinya.",
              badge: "Shadowing"
            },
            {
              label: "Larangan Kata Kunci global",
              detail: "Penggunaan perintah global memecah isolasi dan memperkenalkan bug ketergantungan tersembunyi.",
              badge: "Anti-Pattern"
            },
            {
              label: "LEGB Rule",
              detail: "Pencarian nama variabel mengikuti urutan: Local -> Enclosing -> Global -> Built-in.",
              badge: "LEGB Hierarchy"
            }
          ],
          labInsight: "Hindari tergoda menggunakan kata kunci global hanya demi kemudahan instan. Mengirimkan data via parameter dan menerima via return adalah standar rekayasa bersih."
        },
        {
          title: "4. Nilai Kembalian (return) vs Prosedur Kosong (NoneType Bug)",
          category: "Kontrak Keluaran",
          relatedScenarios: "Skenario Uji #5",
          keyTerms: ["return Statement", "Void Function", "NoneType", "Implicit Return None"],
          syntaxExample: "def cetak(x): print(x)\nhasil = cetak(10)  # hasil bernilai None! Bukan 10!",
          leadSentence: "Fungsi yang tidak menyertakan pernyataan return secara eksplisit akan mengembalikan objek None bertipe NoneType, memicu TypeError fatal saat hasilnya dioperasikan.",
          desc: "Banyak pemula salah mengira bahwa perintah print() di dalam fungsi sama fungsinya dengan return. print() hanya menyajikan teks ke monitor (I/O visual) dan tidak mengembalikan nilai apapun ke program. Pada bahasa modern (seperti Python), fungsi yang selesai tanpa mencapai perintah return akan secara implisit mengembalikan objek None. Jika hasil pemanggilan fungsi void ini ditampung ke variabel lalu dijumlahkan (hasil + 5), sistem operasi melempar TypeError: unsupported operand type for +: 'NoneType' and 'int'.",
          keyPoints: [
            {
              label: "Fungsi vs Prosedur (Void)",
              detail: "Fungsi sejati menghitung dan mengembalikan nilai; prosedur hanya menjalankan aksi sampingan.",
              code: "return vs print()"
            },
            {
              label: "Objek None Bawaan",
              detail: "Ketiadaan return menghasilkan None bertipe NoneType yang menandakan kekosongan nilai.",
              code: "type -> NoneType"
            },
            {
              label: "Perangkap NoneType TypeError",
              detail: "Mencoba mengoperasikan matematika pada kembalian None mematikan program seketika.",
              badge: "TypeError Trap"
            },
            {
              label: "Aturan Desain Baku",
              detail: "Jika suatu modul bertugas menghitung formula, WAJIB mengembalikan hasil via return.",
              badge: "Return Mandatory"
            }
          ],
          labInsight: "Ingat pepatah arsitektur perangkat lunak: fungsi yang menghitung tidak boleh mencetak, dan fungsi yang mencetak tidak boleh menghitung!"
        },
        {
          title: "5. Kontrak Parameter & Jebakan Mutable Default Argument",
          category: "Keamanan Parameter",
          relatedScenarios: "Skenario Uji #6 & #7",
          keyTerms: ["Formal Parameter", "Actual Argument", "Default Argument", "Mutable Default Bug"],
          syntaxExample: "def append_ke(item, daftar=[]):  # BAHAYA! daftar di-share lintas pemanggilan!",
          leadSentence: "Menetapkan tipe data mutable (seperti List []) sebagai nilai bawaan (Default Argument) menyebabkan state memori dibagi bersama lintas pemanggilan, memicu silent bug.",
          desc: "Parameter fungsi dapat memiliki nilai bawaan (Default Argument) yang digunakan jika pemanggil tidak menyediakan argumen. Namun, terdapat jebakan memori yang sangat berbahaya: nilai bawaan fungsi hanya dievaluasi satu kali pada saat fungsi didefinisikan (compile time). Jika tipe data mutable seperti List [] digunakan sebagai default argument (def tambah(item, data=[])), objek list yang sama akan digunakan kembali oleh seluruh pemanggilan fungsi berikutnya di RAM, mengakibatkan data terakumulasi secara tidak terduga.",
          keyPoints: [
            {
              label: "Evaluasi Dini Default Argument",
              detail: "Argumen bawaan dialokasikan sekali saat definisi fungsi dimuat ke memori interpreter.",
              badge: "Definition-Time"
            },
            {
              label: "Mutable Shared State Bug",
              detail: "Objek list bawaan menjadi variabel bersama antar pemanggilan independen di RAM.",
              code: "def f(x, lst=[]):"
            },
            {
              label: "Pola Penanganan Idiomatik",
              detail: "Gunakan nilai None sebagai penjaga, lalu inisialisasi list baru di dalam badan fungsi.",
              code: "lst = None; if lst is None: lst = []"
            },
            {
              label: "Positional vs Keyword Arguments",
              detail: "Argumen posisi terikat urutan, sedangkan argumen kata kunci terikat nama parameter.",
              badge: "Flexible Binding"
            }
          ],
          labInsight: "Penyakit 'Mutable Default Argument' adalah salah satu pertanyaan wawancara teknis paling sering karena menunjukkan seberapa dalam pemahaman kandidat atas manajemen memori Python."
        }
      ]
    },
    prosedurKerja: [
      "Buka instrumen editor uji coba di layar praktikum atau gunakan interpreter Python.",
      "Lakukan Uji Kasus 1: Definisikan Pure Function hitung_lingkaran(r) yang mengembalikan luas lingkaran via return. Uji dengan r=7 dan r=14.",
      "Lakukan Uji Kasus 2: Amati siklus hidup Call Stack dengan memanggil fungsi berantai luar_func() -> dalam_func(). Catat transisi stack frame.",
      "Lakukan Uji Kasus 3: Buktikan isolasi Scope Lokal: coba akses variabel internal fungsi dari lingkungan luar. Catat kemunculan NameError.",
      "Lakukan Uji Kasus 4: Buktikan Variable Shadowing: deklarasikan x = 100 di global, lalu di dalam fungsi ubah x = 5. Periksa nilai x global setelahnya.",
      "Lakukan Uji Kasus 5: Uji anomali NoneType Bug: bandingkan penangkapan hasil fungsi return vs fungsi print(). Coba operasikan hasil + 10.",
      "Lakukan Uji Kasus 6: Simulasikan bahaya Mutable Default Argument (def tambah(val, arr=[])) dengan 3 kali pemanggilan berturut-turut.",
      "Catat seluruh hasil pengamatan aktual ke dalam Tabel Pengamatan Bagian C.",
      "Susun uraian analisis mendalam pada Bagian D dan rumuskan kesimpulan akhir pada Bagian E."
    ],
    prosedurSteps: [
      {
        no: 1,
        phase: "Persiapan",
        title: "Inisialisasi Lingkungan Uji Modularitas",
        instruction: "Siapkan modul pengujian dan aktifkan pemantau alokasi stack frame serta tabel simbol lokal.",
        target: "Helper Simulator"
      },
      {
        no: 2,
        phase: "Eksperimen",
        title: "Uji Kasus 1: Kontrak I/O Pure Function Luas Lingkaran",
        instruction: "Definisikan fungsi murni dengan parameter r dan kembalikan nilai float luas lingkaran via return.",
        codeSnippet: "def luas_lingkaran(r):\n    return 3.14159 * r * r\nprint(luas_lingkaran(7))",
        scenarioRef: "Skenario #1"
      },
      {
        no: 3,
        phase: "Eksperimen",
        title: "Uji Kasus 2: Pembuktian Isolasi Ruang Lingkup (Scope Isolation)",
        instruction: "Deklarasikan variabel rahasia di dalam fungsi, lalu panggil variabel tersebut dari luar fungsi.",
        codeSnippet: "def buat_token():\n    kunci_rahasia = 'XYZ-999'\n    return True\nbuat_token()\nprint(kunci_rahasia)",
        scenarioRef: "Skenario #2"
      },
      {
        no: 4,
        phase: "Eksperimen",
        title: "Uji Kasus 3: Uji Variable Shadowing (Proteksi Nilai Global)",
        instruction: "Uji apakah assignment variabel lokal dengan nama yang sama mampu mengubah nilai variabel global di luar.",
        codeSnippet: "skor_global = 100\ndef mutasi_lokal():\n    skor_global = 0\nmutasi_lokal()\nprint('Skor Global Tetap:', skor_global)",
        scenarioRef: "Skenario #3"
      },
      {
        no: 5,
        phase: "Eksperimen",
        title: "Uji Kasus 4: Investigasi NoneType Trap pada Fungsi Void",
        instruction: "Tangkap hasil pemanggilan fungsi yang hanya memanggil print() tanpa return, lalu coba operasikan dengan angka.",
        codeSnippet: "def prosedur_salam(nama):\n    print('Halo', nama)\nhasil = prosedur_salam('Budi')\nprint('Hasil Tangkapan:', hasil)\n# hasil + 5  -> Memicu TypeError!",
        scenarioRef: "Skenario #4"
      },
      {
        no: 6,
        phase: "Eksperimen",
        title: "Uji Kasus 5: Investigasi Jebakan Mutable Default Argument",
        instruction: "Panggil fungsi dengan argumen bawaan list [] sebanyak 3 kali tanpa memberikan parameter kedua. Amati akumulasi data bocor.",
        codeSnippet: "def daftar_hadir(nama, log=[]):\n    log.append(nama)\n    return log\nprint(daftar_hadir('Andi'))\nprint(daftar_hadir('Budi'))\nprint(daftar_hadir('Citra'))",
        scenarioRef: "Skenario #5"
      },
      {
        no: 7,
        phase: "Eksperimen",
        title: "Uji Kasus 6: Perbaikan Idiomatik Safe Default Argument (None Guard)",
        instruction: "Terapkan pola None Guard untuk memastikan list baru selalu dialokasikan bersih di setiap invokasi.",
        codeSnippet: "def daftar_hadir_aman(nama, log=None):\n    if log is None: log = []\n    log.append(nama)\n    return log\nprint(daftar_hadir_aman('Andi'))\nprint(daftar_hadir_aman('Budi'))",
        scenarioRef: "Skenario #6"
      },
      {
        no: 8,
        phase: "Pencatatan",
        title: "Pencatatan Kontrak I/O & State Memori",
        instruction: "Catat seluruh hasil nilai kembalian, tipe data kembalian, dan perilaku scope ke dalam Tabel Pengamatan Bagian C.",
        target: "Tabel Bagian C"
      },
      {
        no: 9,
        phase: "Sintesis",
        title: "Analisis Pembahasan & Formulasi Kesimpulan",
        instruction: "Susun uraian analisis modularitas pada Bagian D dan rumuskan kesimpulan arsitektur fungsi pada Bagian E.",
        target: "Bagian D & E"
      }
    ],
    defaultObservations: [
      {
        no: 1,
        scenario: "Evaluasi Pure Function Luas Lingkaran (r = 7)",
        testInput: "def luas(r): return 3.14159 * r * r; luas(7)",
        expectedTheory: "Kembalian float deterministik bernilai ~153.9379",
        actualOutput: "153.93791",
        measuredMetric: "Pure function (Referential Transparency)",
        validationStatus: "Sesuai"
      },
      {
        no: 2,
        scenario: "Percobaan Akses Variabel Lokal dari Scope Global",
        testInput: "def f(): kunci = 'XYZ'; f(); print(kunci)",
        expectedTheory: "NameError karena kunci hancur saat stack frame di-pop",
        actualOutput: "NameError: name 'kunci' is not defined",
        measuredMetric: "Isolasi memori lokal 100% terjaga",
        validationStatus: "Sesuai"
      },
      {
        no: 3,
        scenario: "Uji Variable Shadowing Terhadap State Global",
        testInput: "x = 100; def f(): x = 0; f(); print(x)",
        expectedTheory: "Nilai global x tetap 100, tidak terkontaminasi",
        actualOutput: "100",
        measuredMetric: "Proteksi state global tanpa side effect",
        validationStatus: "Sesuai"
      },
      {
        no: 4,
        scenario: "Penangkapan Hasil Fungsi Void (Tanpa return)",
        testInput: "def s(): print('Hai'); res = s(); print(type(res))",
        expectedTheory: "Menghasilkan objek None bertipe <class 'NoneType'>",
        actualOutput: "Hai \n <class 'NoneType'>",
        measuredMetric: "Implicit return None terbukti",
        validationStatus: "Sesuai"
      },
      {
        no: 5,
        scenario: "Jebakan Akumulasi Mutable Default Argument",
        testInput: "def add(x, l=[]): l.append(x); return l; add('A'); add('B')",
        expectedTheory: "List di-share antar pemanggilan, nilai terakumulasi",
        actualOutput: "['A', 'B'] (Bocor! Seharusnya cuma ['B'])",
        measuredMetric: "Pencemaran shared memory reference",
        validationStatus: "Sesuai"
      },
      {
        no: 6,
        scenario: "Pola Idiomatik Safe Default Argument (None Guard)",
        testInput: "def add(x, l=None): if l is None: l=[]; l.append(x); return l",
        expectedTheory: "List baru dialokasikan per pemanggilan",
        actualOutput: "['B']",
        measuredMetric: "Isolasi memori kembali bersih",
        validationStatus: "Sesuai"
      }
    ],
    analisisPrompts: [
      "Berdasarkan pengujian skenario 2 dan 3, jelaskan bagaimana arsitektur Call Stack mengisolasi variabel lokal! Mengapa variabel di dalam fungsi tidak dapat diakses dari luar dan mengapa nilai global tidak tertimpa saat nama variabelnya sama?",
      "Jelaskan mengapa skenario 4 menghasilkan objek bertipe NoneType dan apa risiko fatalnya jika seorang programmer mengabaikan pembedaan antara fungsi (dengan return) dan prosedur (tanpa return)?",
      "Analisis mendalam fenomena bocornya memori pada skenario 5! Mengapa argumen bawaan list [] mempertahankan state dari pemanggilan sebelumnya dan bagaimana pola None Guard pada skenario 6 mengatasi masalah tersebut?"
    ],
    kesimpulanPrompts: [
      "Rumuskan kesimpulan ilmiah mengenai prinsip modularitas dan dekomposisi masalah dalam rekayasa perangkat lunak berskala industri!",
      "Bagaimana penerapan Pure Function dan isolasi ruang lingkup (Scope Isolation) melindungi sistem komputasi dari bug efek samping (side effects) yang sulit dilacak?"
    ]
  },
  {
    id: 6,
    title: "Array / List (Struktur Data Sekuensial)",
    subtitle: "Validasi Batas Indeks, Pengukuran Memori Dinamis, dan Komparasi Algoritma Pencarian",
    focusValidation: "Validasi batas indeks (IndexError), mutabilitas list vs aliasing bug (shallow copy), dan integritas data saat penyisipan.",
    focusMeasurement: "Pengukuran alokasi over-allocation buffer RAM (sys.getsizeof) dan komparasi waktu akses O(1) vs pencarian O(N).",
    capaian: [
      "Mampu menguji dan memvalidasi batas pengindeksan array/list (Zero-based & Negative indexing) serta mencegah crash IndexError.",
      "Mampu membuktikan secara empiris bahaya penugasan referensi pointer (Aliasing Bug) pada tipe data mutable dan memperbaikinya menggunakan mekanisme kloning independen.",
      "Mampu mengukur pertumbuhan alokasi memori dinamis (over-allocation buffer) pada operasi append() serta membandingkan kecepatan akses indeks O(1) vs pencarian linear O(N)."
    ],
    dasarTeori: {
      overview: "Array / List adalah struktur data sekuensial yang mengelompokkan sekumpulan elemen data di dalam blok memori terurut. Di balik kemudahan akses berbasis nomor indeks (0-based indexing), pengelolaan list dikendalikan oleh dua pilar fundamental: (1) integritas batas akses memori (Contiguous Memory & Bounds) untuk mencegah pembacaan di luar alokasi fisik, serta (2) karakteristik mutabilitas objek di RAM (Mutability & Aliasing Bug) yang dapat memicu perubahan data tak terduga jika referensi pointer dibagi bersama.",
      leadParagraph: "Struktur data sekuensial (List / Dynamic Array) adalah fondasi pengolahan himpunan data komputasi. Elemen ditata secara kontigu menggunakan referensi offset memori, memungkinkan akses waktu konstan O(1) berdasarkan nomor indeks.",
      fundamentalPillars: [
        {
          number: 1,
          title: "Integritas Akses Memori Kontigu & Batas Indeks",
          desc: "Alamat memori setiap elemen dihitung secara matematis lewat rumus base_address + (indeks * ukuran). Mengakses indeks yang melampaui rentang [0 s.d. N-1] memicu pelanggaran batas memori dan melempar IndexError.",
          tag: "Contiguous Memory & Bounds",
          badge: "Pilar 1"
        },
        {
          number: 2,
          title: "Mutabilitas Objek & Bahaya Referensi Pointer Bersama",
          desc: "List bersifat mutable (dapat diubah di tempat). Perintah penugasan sederhana list_b = list_a TIDAK menyalin data, melainkan hanya menduplikasi pointer alamat RAM. Memodifikasi list_b akan secara otomatis merusak list_a.",
          tag: "Mutability & Aliasing Bug",
          badge: "Pilar 2"
        }
      ],
      keyConceptsSummary: [
        "Dynamic Array Over-Allocation",
        "Zero-Based & Negative Indexing",
        "IndexError Out of Bounds Trap",
        "Pointer Aliasing Bug (list_b = list_a)",
        "Kloning Independen (.copy() / slicing)",
        "Kompleksitas Akses O(1) vs Search O(N)"
      ],
      points: [
        {
          title: "1. Arsitektur Dynamic Array & Pola Alokasi Memori Dinamis (Over-allocation)",
          category: "Struktur Data & RAM",
          relatedScenarios: "Skenario Uji #1 & #2",
          keyTerms: ["Dynamic Array", "sys.getsizeof()", "Over-allocation Buffer", "Amortized O(1)"],
          syntaxExample: "angka = []; angka.append(10)  # Ukuran RAM melonjak bertahap",
          leadSentence: "List Python diimplementasikan sebagai Dynamic Array yang mengalokasikan ruang memori cadangan lebih besar (over-allocation) agar operasi penambahan elemen append() tetap berkinerja cepat O(1).",
          desc: "Di tingkat memori fisik, List bukanlah rantai terpisah, melainkan array kontinu berisi pointer ke objek-objek data. Untuk mencegah realokasi memori yang lambat setiap kali sebuah elemen baru ditambahkan via .append(), interpreter menggunakan strategi over-allocation: mencadangkan kapasitas ekstra (buffer cadangan) di RAM. Melalui fungsi sys.getsizeof(), mahasiswa dapat membuktikan bahwa ukuran byte memori list tidak bertambah secara linier 1-per-1, melainkan melonjak dalam pola lompatan bertingkat (misal: 56 byte -> 88 byte -> 120 byte).",
          keyPoints: [
            {
              label: "Array Pointer Kontigu",
              detail: "List menyimpan deretan pointer 64-bit yang merujuk ke lokasi objek elemen di RAM.",
              code: "PyListObject"
            },
            {
              label: "Strategi Over-allocation",
              detail: "Sistem mencadangkan loker memori ekstra lebih besar dari jumlah elemen aktif saat ini.",
              badge: "Buffer Reserve"
            },
            {
              label: "Kinerja Amortized O(1)",
              detail: "Penambahan elemen .append() berjalan instan rata-rata O(1) tanpa memindahkan seluruh array.",
              badge: "Amortized O(1)"
            },
            {
              label: "Pelacakan Ukuran Fisik",
              detail: "Gunakan modul sys.getsizeof(data) untuk membuktikan lonjakan alokasi kapasitas di RAM.",
              code: "sys.getsizeof(list)"
            }
          ],
          labInsight: "Mengetahui sifat over-allocation membantu mahasiswa memahami mengapa pra-alokasi list berukuran tetap jauh lebih hemat memori dibanding memanggil .append() miliaran kali."
        },
        {
          title: "2. Skema Pengindeksan: Zero-Based Indexing, Indeks Negatif, dan IndexError",
          category: "Akses & Validasi Batas",
          relatedScenarios: "Skenario Uji #3",
          keyTerms: ["Zero-Based Indexing", "Offset Memori", "Indeks Negatif", "IndexError"],
          syntaxExample: "data = [10, 20, 30]\nprint(data[0])   # Elemen pertama\nprint(data[-1])  # Elemen terakhir\n# data[3] -> IndexError!",
          leadSentence: "Indeks adalah nilai pergeseran offset dari alamat awal memori, di mana indeks 0 adalah elemen pertama, indeks -1 adalah elemen terakhir, dan indeks >= N memicu IndexError fatal.",
          desc: "Pengindeksan berbasis nol (Zero-based indexing) berasal dari rumus arsitektur komputer: alamat elemen ke-i = alamat_awal + (i * ukuran_elemen). Elemen pertama berada tepat di alamat awal, sehingga pergeserannya adalah 0. Fitur canggih Python menyediakan Indeks Negatif di mana data[-1] merujuk ke elemen paling belakang (dihitung sebagai len(data) + indeks). Namun, meminta indeks yang melampaui batas ukuran array (misal data[len(data)]) memicu pelanggaran batas memori IndexError.",
          keyPoints: [
            {
              label: "Indeks Nol Sebagai Offset",
              detail: "Angka indeks 0 berarti '0 langkah pergeseran' dari alamat fisik pertama array di RAM.",
              code: "Offset: base + 0"
            },
            {
              label: "Fitur Indeks Negatif",
              detail: "Sintaks data[-1] mengakses elemen ujung kanan tanpa perlu menghitung len(data) - 1 manual.",
              code: "data[-1]"
            },
            {
              label: "Batas Rentang Sah",
              detail: "Indeks positif sah berada pada rentang [0 s.d. N - 1], dan indeks negatif pada [-N s.d. -1].",
              badge: "Safe Interval"
            },
            {
              label: "Pelanggaran Batas IndexError",
              detail: "Mencoba membaca di luar batas memicu IndexError seketika untuk mencegah korupsi memori liar.",
              code: "IndexError"
            }
          ],
          labInsight: "IndexError adalah pelindung keamanan memori (memory safety). Pada bahasa tingkat rendah seperti C, mengakses batas di luar array dapat membaca memori liar (buffer overflow) tanpa peringatan error!"
        },
        {
          title: "3. Mutabilitas Objek & Jebakan Referensi Pointer Bersama (Aliasing Bug)",
          category: "Integritas Objek RAM",
          relatedScenarios: "Skenario Uji #4 & #5",
          keyTerms: ["Mutable", "Pointer Aliasing", "Shallow Copy", "id() Function", "Independent Clone"],
          syntaxExample: "b = a  # ALIASING BUG! Mengarah ke objek RAM yang sama!\nb = a.copy()  # AMAN! Kloning objek baru di memori",
          leadSentence: "Penugasan b = a hanya menduplikasi pointer alamat RAM (aliasing), sehingga mengubah isi b akan secara destruktif mengubah isi a tanpa peringatan.",
          desc: "Tipe data List bersifat mutable, artinya nilai elemen di dalamnya dapat diubah langsung di memori tanpa membuat wadah baru. Kesalahan paling umum adalah mengira instruksi b = a menciptakan salinan terpisah. Pada kenyataannya, b = a hanya membuat label baru yang menunjuk ke alamat RAM fisik yang persis sama (id(a) == id(b)). Jika programmer memodifikasi b[0] = 999, data pada a[0] otomatis berubah menjadi 999. Untuk menghasilkan salinan independen, programmer wajib melakukan kloning eksplisit menggunakan metode .copy() atau slicing a[:].",
          keyPoints: [
            {
              label: "Hakikat Aliasing Pointer",
              detail: "Dua variabel berbeda menunjuk ke lokasi memori RAM yang identik (Shared Identity).",
              code: "id(a) == id(b)"
            },
            {
              label: "Pencemaran Data Silang",
              detail: "Modifikasi pada satu label seketika mencemari data pada seluruh label referensi lainnya.",
              badge: "Silent Mutation"
            },
            {
              label: "Kloning Dangkal (.copy())",
              detail: "Metode a.copy() atau slicing a[:] mengalokasikan blok memori terpisah dengan isi identik.",
              code: "b = a.copy()"
            },
            {
              label: "Verifikasi Identitas Memori",
              detail: "Gunakan fungsi built-in id() atau operator is untuk membuktikan kemandirian objek di RAM.",
              code: "b is not a"
            }
          ],
          labInsight: "Aliasing bug adalah sumber bug paling membingungkan pemula karena tampak seperti program 'berhantu': variabel a berubah padahal baris kodenya hanya menyentuh variabel b."
        },
        {
          title: "4. Operasi Modifikasi Struktur: append() vs insert() dan Biaya Shifting",
          category: "Kinerja Operasi",
          relatedScenarios: "Skenario Uji #6",
          keyTerms: ["append()", "insert()", "pop()", "Element Shifting", "Biaya O(N)"],
          syntaxExample: "data.append(99)  # O(1) di ujung  vs  data.insert(0, 99)  # O(N) geser semua!",
          leadSentence: "Menambahkan elemen di ujung list (append) berjalan instan O(1), sedangkan menyisipkan di awal (insert(0)) memaksa pergeseran seluruh elemen di RAM dengan biaya lambat O(N).",
          desc: "Tidak semua operasi manipulasi list memiliki efisiensi yang sama. Menambahkan elemen di akhir list via .append() tidak mengganggu posisi elemen lain dan berjalan dalam waktu konstan O(1). Sebaliknya, menyisipkan elemen di posisi paling depan via .insert(0, nilai) memaksa prosesor menggeser seluruh N elemen yang sudah ada satu langkah ke kanan di memori RAM. Pada list berisi 1.000.000 elemen, operasi insert(0) membutuhkan 1.000.000 kali pergeseran memori, mengakibatkan degradasi performa yang parah.",
          keyPoints: [
            {
              label: "Operasi Ujung append()",
              detail: "Menempatkan elemen baru pada slot kosong terdekat tanpa menggeser elemen yang ada.",
              code: "append() -> O(1)"
            },
            {
              label: "Operasi Sisip Awal insert(0)",
              detail: "Wajib memindahkan seluruh N elemen ke alamat memori offset berikutnya satu per satu.",
              code: "insert(0) -> O(N)"
            },
            {
              label: "Biaya Shifting Memori",
              detail: "Beban komputasi bertambah sebanding dengan jumlah elemen yang berada di sebelah kanan titik sisip.",
              badge: "Memory Shifting"
            },
            {
              label: "Alternatif collections.deque",
              detail: "Jika aplikasi memerlukan manipulasi cepat di kedua ujung, gunakan struktur antrean ganda (deque).",
              badge: "Best Practice"
            }
          ],
          labInsight: "Pahami perbedaan biaya operasi: hindari menggunakan list.insert(0) di dalam loop data besar karena akan melipatgandakan kompleksitas menjadi kuadratik O(N^2)!"
        },
        {
          title: "5. Karakteristik Kompleksitas Waktu: Akses Indeks O(1) vs Linear Search O(N)",
          category: "Komparasi Algoritma",
          relatedScenarios: "Skenario Uji #7",
          keyTerms: ["Akses Indeks O(1)", "Pencarian Linier O(N)", "Binary Search O(log N)", "Trade-Off"],
          syntaxExample: "nilai = data[50000]  # O(1) instan!  vs  50000 in data  # O(N) periksa satu per satu",
          leadSentence: "Mengambil data berdasarkan nomor indeks berjalan instan O(1) lewat perhitungan offset alamat, sedangkan mencari keberadaan suatu nilai membutuhkan penelusuran sekuensial O(N).",
          desc: "Kelebihan utama struktur List adalah kecepatan akses indeks langsung: ekspresi data[i] membutuhkan tepat 1 kali kalkulasi perkalian offset memori, sehingga waktu aksesnya konstan O(1) terlepas dari apakah list memuat 10 atau 10.000.000 elemen. Namun, jika programmer mencari apakah suatu nilai tertentu ada di dalam list (menggunakan operator in atau Linear Search), komputer terpaksa membandingkan nilai tersebut dari elemen indeks 0 hingga ujung akhir, menghasilkan kompleksitas waktu linier O(N).",
          keyPoints: [
            {
              label: "Akses Deterministik O(1)",
              detail: "Waktu akses langsung lewat indeks ke-k selalu sama persis (~0.001 mikrodetik).",
              code: "data[k] -> O(1)"
            },
            {
              label: "Pencarian Sekuensial O(N)",
              detail: "Operator in atau metode .index() menelusuri elemen satu demi satu hingga ditemukan.",
              code: "x in data -> O(N)"
            },
            {
              label: "Skenario Terburuk (Worst Case)",
              detail: "Jika elemen berada di paling akhir atau tidak ada, pencarian wajib memeriksa seluruh N elemen.",
              badge: "Worst Case O(N)"
            },
            {
              label: "Prasyarat Binary Search",
              detail: "Jika data telah terurut rapi, pencarian dapat dioptimasi menjadi O(log N) menggunakan Binary Search.",
              badge: "Binary Search"
            }
          ],
          labInsight: "Eksperimen laboratorium ini mendemonstrasikan mengapa struktur List sangat unggul untuk akses berbasis posisi, namun memerlukan struktur asosiatif (seperti Hash Set/Dictionary) jika aplikasi berfokus pada pencarian keberadaan nilai."
        }
      ]
    },
    prosedurKerja: [
      "Buka instrumen editor uji coba di layar praktikum atau gunakan interpreter Python.",
      "Lakukan Uji Kasus 1: Buat list kosong angka = []. Lakukan penambahan elemen secara bertahap menggunakan .append() dan ukur alokasi byte RAM menggunakan sys.getsizeof().",
      "Lakukan Uji Kasus 2: Amati pola lonjakan kapasitas over-allocation memori pada panjang list N = 0, 1, 4, 8, dan 16.",
      "Lakukan Uji Kasus 3: Uji akses elemen sah (indeks 0 dan -1) serta uji pelanggaran batas indeks (indeks len(data)). Amati munculnya IndexError.",
      "Lakukan Uji Kasus 4: Simulasikan bug Aliasing Pointer: buat b = a, lalu ubah b[0] = 999. Buktikan nilai a[0] ikut berubah dan bandingkan nilai id(a) vs id(b).",
      "Lakukan Uji Kasus 5: Terapkan perbaikan kloning independen menggunakan b = a.copy(). Buktikan a[0] tetap aman terlindungi saat b dimutasi.",
      "Lakukan Uji Kasus 6: Bandingkan waktu eksekusi akses langsung data[k] O(1) vs pencarian keberadaan nilai x in data O(N) pada 50.000 elemen.",
      "Catat seluruh hasil pengamatan aktual ke dalam Tabel Pengamatan Bagian C.",
      "Susun uraian analisis mendalam pada Bagian D dan rumuskan kesimpulan akhir pada Bagian E."
    ],
    prosedurSteps: [
      {
        no: 1,
        phase: "Persiapan",
        title: "Inisialisasi Lingkungan Uji List & Array",
        instruction: "Siapkan modul pengujian dan aktifkan modul sys untuk memantau kapasitas byte memori objek list.",
        target: "Helper Simulator"
      },
      {
        no: 2,
        phase: "Eksperimen",
        title: "Uji Kasus 1: Pengukuran Pertumbuhan Byte Memori (sys.getsizeof)",
        instruction: "Tambahkan elemen angka berturut-turut ke dalam list dan catat ukuran byte memori fisiknya.",
        codeSnippet: "import sys\nlst = []\nfor i in range(5):\n    print(f'Len: {len(lst)}, Size: {sys.getsizeof(lst)} bytes')\n    lst.append(i)",
        scenarioRef: "Skenario #1 & #2"
      },
      {
        no: 3,
        phase: "Eksperimen",
        title: "Uji Kasus 2: Validasi Batas Indeks & Penanganan IndexError",
        instruction: "Akses elemen ujung depan data[0], ujung belakang data[-1], dan uji akses batas terlarang data[len(data)].",
        codeSnippet: "huruf = ['A', 'B', 'C']\nprint('Depan:', huruf[0])\nprint('Belakang:', huruf[-1])\n# huruf[3] -> IndexError!",
        scenarioRef: "Skenario #3"
      },
      {
        no: 4,
        phase: "Eksperimen",
        title: "Uji Kasus 3: Investigasi Bahaya Pointer Aliasing Bug",
        instruction: "Tugaskan b = a, mutasikan elemen b[0], dan amati kehancuran data asli pada list a akibat alamat memori yang sama.",
        codeSnippet: "a = [10, 20, 30]\nb = a\nb[0] = 999\nprint('Nilai a ikut rusak:', a)\nprint('id sama:', id(a) == id(b))",
        scenarioRef: "Skenario #4"
      },
      {
        no: 5,
        phase: "Eksperimen",
        title: "Uji Kasus 4: Kloning Mandiri Menggunakan .copy()",
        instruction: "Gunakan kloning mandiri b = a.copy() untuk memastikan kedua list memiliki loker memori terpisah.",
        codeSnippet: "a = [10, 20, 30]\nb = a.copy()\nb[0] = 999\nprint('Nilai a aman:', a)\nprint('Nilai b terpisah:', b)\nprint('id berbeda:', id(a) != id(b))",
        scenarioRef: "Skenario #5"
      },
      {
        no: 6,
        phase: "Eksperimen",
        title: "Uji Kasus 5: Benchmarking Akses Indeks O(1) vs Pencarian O(N)",
        instruction: "Bandingkan kecepatan akses instan via indeks data[49999] vs pencarian nilai 49999 in data pada deret 50.000 elemen.",
        codeSnippet: "import time\ndata = list(range(50000))\nt0 = time.time(); x = data[49999]; t_akses = time.time() - t0\nt0 = time.time(); ada = 49999 in data; t_search = time.time() - t0\nprint(f'Akses O(1): {t_akses*1000:.4f}ms | Search O(N): {t_search*1000:.4f}ms')",
        scenarioRef: "Skenario #6"
      },
      {
        no: 7,
        phase: "Pencatatan",
        title: "Pencatatan Ukuran Memori & Status Aliasing",
        instruction: "Catat seluruh kapasitas byte, identitas pointer id(), dan waktu komputasi ke dalam Tabel Pengamatan Bagian C.",
        target: "Tabel Bagian C"
      },
      {
        no: 8,
        phase: "Sintesis",
        title: "Analisis Pembahasan & Formulasi Kesimpulan",
        instruction: "Susun uraian analisis struktur data pada Bagian D dan rumuskan kesimpulan efisiensi list pada Bagian E.",
        target: "Bagian D & E"
      }
    ],
    defaultObservations: [
      {
        no: 1,
        scenario: "Pengukuran Memori List Kosong vs Terisi 1 Elemen",
        testInput: "lst = []; sys.getsizeof(lst); lst.append(10)",
        expectedTheory: "List kosong ~56 byte, bertambah saat diisi elemen",
        actualOutput: "Len 0: 56 byte | Len 1: 88 byte",
        measuredMetric: "Over-allocation cadangan 32 byte pertama",
        validationStatus: "Sesuai"
      },
      {
        no: 2,
        scenario: "Pola Lonjakan Kapasitas Over-allocation Buffer",
        testInput: "Append elemen ke-2, ke-3, ke-4",
        expectedTheory: "Ukuran byte tidak naik tiap baris karena buffer ada",
        actualOutput: "Len 2, 3, 4: Tetap 88 byte!",
        measuredMetric: "Amortized constant time allocation",
        validationStatus: "Sesuai"
      },
      {
        no: 3,
        scenario: "Pengujian Batas Indeks dan Pelanggaran IndexError",
        testInput: "data = ['A', 'B', 'C']; data[3]",
        expectedTheory: "IndexError karena rentang sah hanya [0 s.d. 2]",
        actualOutput: "IndexError: list index out of range",
        measuredMetric: "Memory safety boundary interupsi",
        validationStatus: "Sesuai"
      },
      {
        no: 4,
        scenario: "Eksperimen Pointer Aliasing Bug (b = a)",
        testInput: "a = [10, 20]; b = a; b[0] = 999; print(a[0])",
        expectedTheory: "Nilai a ikut terdistorsi menjadi 999 (id sama)",
        actualOutput: "a[0] = 999 (Shared Pointer)",
        measuredMetric: "Korupsi data akibat mutabilitas referensi",
        validationStatus: "Sesuai"
      },
      {
        no: 5,
        scenario: "Perbaikan Kloning Mandiri (b = a.copy())",
        testInput: "a = [10, 20]; b = a.copy(); b[0] = 999; print(a[0])",
        expectedTheory: "Nilai a tetap 10, b teralokasi di blok RAM baru",
        actualOutput: "a[0] = 10 (Aman!), b[0] = 999",
        measuredMetric: "Alokasi objek baru independen (id beda)",
        validationStatus: "Sesuai"
      },
      {
        no: 6,
        scenario: "Benchmarking Akses Indeks O(1) vs Linear Search O(N)",
        testInput: "N = 50.000; komparasi data[49999] vs (49999 in data)",
        expectedTheory: "Akses indeks instan, pencarian butuh telusur 50.000 data",
        actualOutput: "Akses: ~0.0010ms | Search: ~1.2500ms",
        measuredMetric: "Kecepatan akses indeks 1.000x lebih cepat",
        validationStatus: "Sesuai"
      }
    ],
    analisisPrompts: [
      "Berdasarkan pengujian skenario 1 dan 2, jelaskan mengapa alokasi memori list di RAM tidak bertambah tepat satu demi satu pada setiap pemanggilan .append()! Apa keuntungan strategi over-allocation ini bagi performa komputasi?",
      "Jelaskan secara mendalam mengapa skenario 4 memicu 'Aliasing Bug'! Apa yang sebenarnya terjadi di memori fisik saat perintah b = a dieksekusi dan mengapa kloning b = a.copy() pada skenario 5 mampu menyelesaikan masalah tersebut?",
      "Analisis perbandingan performa pada skenario 6 antara akses indeks O(1) dan pencarian linear O(N)! Kapan seorang perekayasa perangkat lunak harus menggunakan list dan kapan harus beralih ke struktur data lain?"
    ],
    kesimpulanPrompts: [
      "Rumuskan kesimpulan ilmiah mengenai karakteristik mutabilitas list dan aturan pengelolaan referensi memori dalam rekayasa perangkat lunak!",
      "Bagaimana pemahaman batas indeks dan kompleksitas akses memandu kita dalam mengolah struktur data berskala ribuan hingga jutaan record secara aman dan efisien?"
    ]
  },
  {
    id: 7,
    title: "Dictionary / Object (Struktur Asosiatif)",
    subtitle: "Validasi Integritas Key-Value, Penanganan KeyError, dan Pembuktian Kecepatan Akses Hash O(1)",
    focusValidation: "Validasi keunikan kunci (key uniqueness), aturan hashability (unhashable TypeError), dan mitigasi crash KeyError via .get().",
    focusMeasurement: "Benchmarking empiris kecepatan pencarian langsung Hash Table O(1) Dictionary vs penelusuran O(N) List pada volume 100.000 record.",
    capaian: [
      "Mampu menguji dan memvalidasi integritas pemetaan pasangan kunci-nilai (Key-Value Integrity) dan aturan mutabilitas nilai versus immutability kunci (Hashability).",
      "Mampu mengeliminasi risiko kegagalan sistem akibat KeyError menggunakan teknik akses defensif (Defensive Access via .get() dan in operator).",
      "Mampu membuktikan secara empiris keunggulan efisiensi algoritma Hash Table berwaktu konstan O(1) pada Dictionary dibandingkan pencarian sekuensial O(N) pada List saat mengolah volume data masif."
    ],
    dasarTeori: {
      overview: "Dictionary (Struktur Data Asosiatif / Hash Map) adalah struktur data tingkat lanjut yang mengorganisasikan data dalam pasangan Kunci-Nilai (Key-Value Pairs). Berbeda dengan array/list yang menggunakan nomor urut indeks angka (0, 1, 2...), dictionary menggunakan label kunci semantik bermakna. Pengelolaan dictionary dikendalikan oleh dua pilar fundamental: (1) mekanisme arsitektur Hash Table dan determinisme akses O(1) (Hash Table & O(1) Lookup) yang memungkinkan pencarian secepat kilat, serta (2) integritas kunci dan keamanan akses defensif (Key Integrity & Type Safety) untuk mencegah program tumbang akibat kunci tak ditemukan.",
      leadParagraph: "Struktur data asosiatif (Dictionary / Hash Map) adalah puncak representasi data terstruktur dalam pemrograman modern. Menggunakan fungsi matematis Hash Function, kunci semantik diubah menjadi indeks numerik keranjang memori (bucket), memberikan kecepatan baca-tulis konstan O(1).",
      fundamentalPillars: [
        {
          number: 1,
          title: "Mekanisme Hash Table & Akses Deterministik O(1)",
          desc: "Kunci dilewatkan ke fungsi hash untuk menghitung slot alamat memori secara instan. Menemukan data di antara 1.000.000 entri membutuhkan waktu yang sama persis seperti mencari di antara 10 entri, tanpa perlu menelusuri data satu demi satu.",
          tag: "Hash Table & O(1) Lookup",
          badge: "Pilar 1"
        },
        {
          number: 2,
          title: "Integritas Pemetaan Semantik & Defensive Key Access",
          desc: "Kunci wajib bersifat unik dan tidak dapat diubah (immutable/hashable). Mengakses kunci yang tidak terdaftar lewat kurung siku dict[key] membangkitkan KeyError fatal; kode produksi wajib dilindungi metode defensif dict.get(key, default).",
          tag: "Key Integrity & Type Safety",
          badge: "Pilar 2"
        }
      ],
      keyConceptsSummary: [
        "Arsitektur Hash Map (Key-Value Bucket)",
        "Key Uniqueness & Mutabilitas Nilai",
        "Hashability Rule (Unhashable TypeError)",
        "Crash KeyError vs Defensive .get()",
        "Manipulasi CRUD Asosiatif di RAM",
        "Empirical Speedup: O(1) Dict vs O(N) List"
      ],
      points: [
        {
          title: "1. Arsitektur Hash Table & Pemetaan Pasangan Kunci-Nilai (Key-Value)",
          category: "Arsitektur Hash Map",
          relatedScenarios: "Skenario Uji #1",
          keyTerms: ["Hash Table", "Hash Function", "Key-Value Pair", "Hash Bucket", "Amortized O(1)"],
          syntaxExample: "mahasiswa = {'nim': '1126102268', 'nama': 'Ahmad', 'ipk': 3.85}\nprint(mahasiswa['nama'])",
          leadSentence: "Dictionary menyimpan data dalam pasangan kunci-nilai (key-value), di mana fungsi hash internal mengubah kunci menjadi indeks ember memori (bucket) untuk akses instan.",
          desc: "Dalam kehidupan nyata, informasi diidentifikasi melalui label pengenal: nomor induk mahasiswa (NIM), nomor KTP, atau kode produk. Dictionary merepresentasikan relasi semantik ini. Saat sebuah pasangan key: value disimpan, interpreter melewatkan key ke fungsi matematis hash() untuk menghasilkan integer digest. Nilai digest ini dimodulo dengan kapasitas tabel untuk menentukan nomor keranjang memori (bucket) tempat nilai disimpan. Seluruh mekanisme ini berlangsung di balik layar, memberikan antarmuka semantik yang sangat ramah manusia.",
          keyPoints: [
            {
              label: "Pemetaan Berlabel Semantik",
              detail: "Data diakses lewat label bermakna kontekstual ('nama', 'harga'), bukan nomor indeks angka statis.",
              code: "{key: value}"
            },
            {
              label: "Fungsi Hash (Hash Function)",
              detail: "Fungsi matematika deterministik yang memetakan objek kunci menjadi angka integer digest.",
              code: "hash(key)"
            },
            {
              label: "Ember Memori (Hash Bucket)",
              detail: "Slot memori tempat pointer nilai disimpan berdasarkan kalkulasi digest kunci.",
              badge: "Hash Bucket"
            },
            {
              label: "Akses Super Cepat O(1)",
              detail: "Pengambilan nilai berjalan dalam waktu konstan terlepas dari seberapa besar jumlah data.",
              badge: "O(1) Lookup"
            }
          ],
          labInsight: "Dictionary adalah fondasi format pertukaran data standar internet (JSON). Memahami dictionary berarti memahami bagaimana API web modern bertukar data antar server."
        },
        {
          title: "2. Keunikan Kunci (Key Uniqueness) & Aturan Hashability (Immutable Keys)",
          category: "Integritas Kunci",
          relatedScenarios: "Skenario Uji #2 & #3",
          keyTerms: ["Key Uniqueness", "Hashability", "Immutable Types", "TypeError: unhashable type"],
          syntaxExample: "d = {'a': 1, 'a': 2}  # Key 'a' tertimpa jadi 2!\n# d[[1, 2]] = 'data'  -> TypeError: unhashable type: 'list'",
          leadSentence: "Kunci dictionary wajib unik (duplikasi akan menimpa nilai lama) dan wajib bertipe data immutable (string, int, tuple), sehingga list dilarang menjadi kunci.",
          desc: "Dua aturan mutlak mengendalikan kunci dictionary: (1) Keunikan Kunci: Sebuah dictionary tidak boleh memiliki dua kunci yang sama. Jika programmer menugaskan nilai baru pada kunci yang sudah ada, nilai lama di memori akan ditimpa (overwritten) secara permanen. (2) Aturan Hashability: Hanya tipe data yang tidak dapat diubah (immutable) seperti integer, float, string, dan tuple yang diizinkan menjadi kunci. Tipe data mutable seperti List atau Dictionary dilarang keras menjadi kunci karena perubahannya akan merusak konsistensi nilai hash, memicu TypeError: unhashable type: 'list'.",
          keyPoints: [
            {
              label: "Keunikan Kunci Mutlak",
              detail: "Satu kunci hanya boleh merujuk ke tepat satu nilai; kunci duplikat menimpa nilai sebelumnya.",
              badge: "Unique Key"
            },
            {
              label: "Syarat Immutability Kunci",
              detail: "Kunci wajib tidak dapat berubah selama siklus hidup program agar nilai hash-nya konsisten.",
              code: "str, int, tuple"
            },
            {
              label: "Jebakan Unhashable Type",
              detail: "Mencoba memakai list [] sebagai kunci memicu TypeError: unhashable type: 'list'.",
              code: "TypeError"
            },
            {
              label: "Kebebasan Tipe Nilai (Values)",
              detail: "Nilai (value) bebas bertipe data apapun: angka, string, list, bahkan dictionary bersarang lainnya.",
              badge: "Flexible Value"
            }
          ],
          labInsight: "Jika Anda membutuhkan kunci majemuk gabungan (misal koordinat X dan Y), gunakan tipe data Tuple (x, y) karena tuple bersifat immutable dan sah sebagai kunci hash!"
        },
        {
          title: "3. Penanganan Akses Kunci: Crash KeyError vs Defensive Method .get()",
          category: "Keamanan Runtime",
          relatedScenarios: "Skenario Uji #4 & #5",
          keyTerms: ["KeyError", "Subscript Operator []", ".get() Method", "Fallback Default Value", "Defensive Coding"],
          syntaxExample: "email = user['email']  # BAHAYA! KeyError jika tidak ada!\nemail = user.get('email', 'Tidak Ada')  # AMAN! Mengembalikan fallback",
          leadSentence: "Mengakses kunci tak terdaftar menggunakan kurung siku dict[key] melempar KeyError fatal dan mematikan program, sedangkan metode dict.get() mengembalikan nilai fallback yang aman.",
          desc: "Dalam arsitektur perangkat lunak yang tangguh (robust software), penanganan ketiadaan data adalah keharusan. Operator subskrip dict['kunci'] mengasumsikan kunci pasti ada; jika kunci tersebut ternyata tidak terdaftar, interpreter melempar eksepsi KeyError dan mematikan proses runtime seketika. Untuk mencegah crash tak terduga, praktik industri mewajibkan penggunaan metode defensif dict.get(kunci, nilai_default). Jika kunci tidak ditemukan, metode .get() mengembalikan nilai bawaan yang aman (misalnya None atau string penjelas) tanpa menimbulkan crash.",
          keyPoints: [
            {
              label: "Bahaya Crash KeyError",
              detail: "Penggunaan tanda kurung siku [] tanpa verifikasi rentan mematikan aplikasi saat input pengguna tidak lengkap.",
              code: "KeyError Trap"
            },
            {
              label: "Metode Aman .get()",
              detail: "Mengambil nilai jika ada; jika tidak ada, mengembalikan nilai cadangan tanpa melempar exception.",
              code: "dict.get(key, default)"
            },
            {
              label: "Pemeriksaan dengan Operator in",
              detail: "Klausa if 'kunci' in dict memverifikasi keberadaan kunci dalam waktu konstan O(1) sebelum akses.",
              code: "if key in dict:"
            },
            {
              label: "Ketahanan Sistem Produksi",
              detail: "Melindungi integrasi data eksternal (seperti respons REST API JSON) dari perubahan skema mendadak.",
              badge: "Robustness"
            }
          ],
          labInsight: "Di sistem backend perbankan dan e-commerce, kegagalan menangani KeyError adalah salah satu penyebab utama insiden aplikasi down saat menerima payload JSON yang tidak lengkap."
        },
        {
          title: "4. Siklus Hidup CRUD Struktur Data Asosiatif di Memori RAM",
          category: "Manipulasi Memori",
          relatedScenarios: "Skenario Uji #6",
          keyTerms: ["CRUD Operations", "dict[k] = v", "del dict[k]", "dict.pop()", "dict.update()"],
          syntaxExample: "mhs['status'] = 'Aktif'  # Create/Update\ndel mhs['status']          # Delete dari RAM",
          leadSentence: "Operasi CRUD (Create, Read, Update, Delete) pada dictionary memanipulasi pasangan kunci-nilai secara dinamis di memori RAM dengan efisiensi waktu konstan O(1).",
          desc: "Dictionary adalah struktur data yang sepenuhnya dapat dimutasi (mutable). Operasi penambahan data (Create) dan pengubahan nilai (Update) menggunakan sintaks penugasan yang sama: dict[kunci] = nilai_baru. Jika kunci belum ada, slot baru dialokasikan; jika sudah ada, nilainya diperbarui. Operasi penghapusan (Delete) menggunakan pernyataan del dict[kunci] atau metode dict.pop(kunci, default), yang membebaskan slot keranjang memori kembali ke heap allocator.",
          keyPoints: [
            {
              label: "Create / Insert Dinamis",
              detail: "Menambahkan atribut data baru semudah menetapkan nilai pada label kunci baru.",
              code: "dict[key] = val"
            },
            {
              label: "In-Place Value Update",
              detail: "Memperbarui nilai yang sudah ada di RAM tanpa perlu membuat dictionary baru.",
              badge: "In-Place Update"
            },
            {
              label: "Penghapusan Bersih (del & pop)",
              detail: "del membuang kunci dari tabel; pop mengembalikan nilainya sembari menghapusnya.",
              code: "del & pop()"
            },
            {
              label: "Metode Iterasi Kunci-Nilai",
              detail: "Gunakan .keys(), .values(), dan .items() untuk melintasi seluruh pasangan secara elegan.",
              code: "for k, v in d.items():"
            }
          ],
          labInsight: "Metode dict.pop(key, default) lebih disukai daripada del karena dapat menangkap nilai yang dihapus sekaligus menyediakan fallback jika kunci tidak ditemukan."
        },
        {
          title: "5. Pembuktian Empiris: Kecepatan Hash Table O(1) Dictionary vs Pencarian O(N) List",
          category: "Analisis Algoritma",
          relatedScenarios: "Skenario Uji #7",
          keyTerms: ["Hash Table O(1)", "Linear Search O(N)", "Big-O Empirical", "Benchmark Skalabilitas"],
          syntaxExample: "ada = target in hash_dict  # O(1) < 0.001 ms!  vs  target in data_list  # O(N) lambat!",
          leadSentence: "Pencarian pada Dictionary berjalan dalam waktu konstan O(1) berapapun ukuran data, sedangkan pada List waktu pencarian melonjak linier O(N), terbukti 1.000x lebih lambat pada 100.000 data.",
          desc: "Inilah puncak alasan mengapa struktur data Dictionary diciptakan. Untuk mencari apakah suatu elemen ada di dalam List berisi 100.000 item, prosesor terpaksa menelusuri dari indeks ke-0 hingga indeks ke-99.999 satu per satu (Linear Search O(N)). Sebaliknya, pada Dictionary (Hash Table), kunci langsung dimasukkan ke fungsi hash matematis yang langsung menunjuk ke alamat ember memori tempat data berada, tanpa peduli apakah data berjumlah 10 atau 1.000.000 entri (O(1)). Uji laboratorium membuktikan pencarian Dictionary hingga 1.000–5.000 kali lebih cepat daripada List.",
          keyPoints: [
            {
              label: "Waktu Konstan Hash O(1)",
              detail: "Kecepatan pencarian tidak terpengaruh oleh penambahan volume data (grafik horizontal datar).",
              code: "O(1) Constant"
            },
            {
              label: "Waktu Linier List O(N)",
              detail: "Waktu pencarian membengkak sebanding dengan jumlah data yang harus dilintasi.",
              code: "O(N) Linear"
            },
            {
              label: "Trade-off Memori vs Waktu",
              detail: "Dictionary membutuhkan alokasi RAM lebih besar untuk tabel hash demi mendapatkan kecepatan pencarian instan.",
              badge: "Space-Time Tradeoff"
            },
            {
              label: "Pilar Sistem Skala Besar",
              detail: "Algoritma pencarian database, routing web, dan caching memori semuanya berbasis hash map.",
              badge: "Industry Standard"
            }
          ],
          labInsight: "Eksperimen benchmarking ini adalah bukti konkret sains komputasi: pemilihan struktur data yang tepat dapat meningkatkan performa program ribuan kali lipat tanpa perlu mengganti prosesor komputer!"
        }
      ]
    },
    prosedurKerja: [
      "Buka instrumen editor uji coba di layar praktikum atau gunakan interpreter Python.",
      "Lakukan Uji Kasus 1: Buat dictionary data profil mahasiswa dengan atribut nim, nama, prodi, dan ipk. Akses setiap elemen via label kunci semantik.",
      "Lakukan Uji Kasus 2: Uji aturan keunikan kunci: masukkan dua kunci identik 'status' dengan nilai berbeda. Amati penimpaan nilai lama di memori.",
      "Lakukan Uji Kasus 3: Uji aturan Hashability: coba gunakan tipe data List [1, 2] sebagai kunci dictionary. Amati respons penolakan TypeError: unhashable type.",
      "Lakukan Uji Kasus 4: Simulasikan crash KeyError dengan mengakses kunci 'alamat' yang tidak terdaftar menggunakan kurung siku [].",
      "Lakukan Uji Kasus 5: Terapkan teknik defensif menggunakan metode .get('alamat', 'Data Belum Diisi'). Buktikan program tetap berjalan aman tanpa crash.",
      "Lakukan Uji Kasus 6: Lakukan operasi CRUD lengkap (tambah hobi, ubah ipk, hapus status via .pop()) dan amati perubahan state RAM.",
      "Lakukan Uji Kasus 7: Lakukan benchmarking pencarian nilai target pada 100.000 entri: ukur waktu pencarian Dictionary O(1) vs List O(N). Catat rasio kecepatannya.",
      "Catat seluruh hasil pengamatan aktual ke dalam Tabel Pengamatan Bagian C.",
      "Susun uraian analisis mendalam pada Bagian D dan rumuskan kesimpulan akhir pada Bagian E."
    ],
    prosedurSteps: [
      {
        no: 1,
        phase: "Persiapan",
        title: "Inisialisasi Lingkungan Uji Struktur Asosiatif",
        instruction: "Siapkan modul pengujian dan aktifkan pengukur waktu eksekusi presisi tinggi (modul time).",
        target: "Helper Simulator"
      },
      {
        no: 2,
        phase: "Eksperimen",
        title: "Uji Kasus 1 & 2: Pemetaan Kunci Semantik & Penimpaan Kunci Duplikat",
        instruction: "Buat dictionary mahasiswa dan uji penimpaan kunci identik pada atribut 'ipk'.",
        codeSnippet: "mhs = {'nim': '1126102268', 'nama': 'Ahmad', 'ipk': 3.50}\nmhs['ipk'] = 3.85\nprint(mhs)",
        scenarioRef: "Skenario #1 & #2"
      },
      {
        no: 3,
        phase: "Eksperimen",
        title: "Uji Kasus 3: Pembuktian Aturan Hashability (Penolakan List Sebagai Kunci)",
        instruction: "Coba deklarasikan dictionary dengan kunci bertipe mutable list. Amati kemunculan TypeError.",
        codeSnippet: "try:\n    d = {[1, 2]: 'Koordinat'}\nexcept TypeError as e:\n    print('Ditolak:', e)",
        scenarioRef: "Skenario #3"
      },
      {
        no: 4,
        phase: "Eksperimen",
        title: "Uji Kasus 4: Investigasi Crash Fatal KeyError",
        instruction: "Akses kunci yang tidak terdaftar menggunakan kurung siku mhs['beasiswa']. Amati terminasi crash akibat KeyError.",
        codeSnippet: "mhs = {'nama': 'Ahmad'}\ntry:\n    print(mhs['beasiswa'])\nexcept KeyError as e:\n    print('Crash Tertangkap:', e)",
        scenarioRef: "Skenario #4"
      },
      {
        no: 5,
        phase: "Eksperimen",
        title: "Uji Kasus 5: Penerapan Metode Defensif .get() dengan Fallback",
        instruction: "Ambil data kunci yang sama menggunakan metode .get() dengan nilai cadangan 'Tidak Menerima'.",
        codeSnippet: "mhs = {'nama': 'Ahmad'}\nstatus = mhs.get('beasiswa', 'Tidak Menerima')\nprint('Akses Aman:', status)",
        scenarioRef: "Skenario #5"
      },
      {
        no: 6,
        phase: "Eksperimen",
        title: "Uji Kasus 6: Manipulasi CRUD Dinamis di Memori RAM",
        instruction: "Lakukan siklus CRUD lengkap: tambahkan 'semester', perbarui 'ipk', dan hapus 'prodi' menggunakan .pop().",
        codeSnippet: "mhs = {'nama': 'Ahmad', 'prodi': 'TI'}\nmhs['semester'] = 2\nmhs['nama'] = 'Ahmad U.'\nprodi_lama = mhs.pop('prodi')\nprint('State Akhir:', mhs)",
        scenarioRef: "Skenario #6"
      },
      {
        no: 7,
        phase: "Eksperimen",
        title: "Uji Kasus 7: Benchmarking Kecepatan Hash O(1) vs List O(N) (100.000 Data)",
        instruction: "Bandingkan kecepatan pencarian target kunci pada 100.000 entri Dictionary vs pencarian elemen pada List 100.000.",
        codeSnippet: "import time\nN = 100000\ndata_list = list(range(N))\ndata_dict = {i: True for i in range(N)}\ntarget = N - 1\nt0 = time.time(); ada_l = target in data_list; t_list = time.time() - t0\nt0 = time.time(); ada_d = target in data_dict; t_dict = time.time() - t0\nprint(f'List O(N): {t_list*1000:.3f}ms | Dict O(1): {t_dict*1000:.4f}ms | Speedup: {t_list/max(t_dict, 1e-9):.1f}x')",
        scenarioRef: "Skenario #7"
      },
      {
        no: 8,
        phase: "Pencatatan",
        title: "Pencatatan Waktu & Status Keamanan Kunci",
        instruction: "Catat seluruh hasil perbandingan waktu komputasi, faktor percepatan (speedup), dan status penanganan error ke dalam Tabel Pengamatan Bagian C.",
        target: "Tabel Bagian C"
      },
      {
        no: 9,
        phase: "Sintesis",
        title: "Analisis Pembahasan & Formulasi Kesimpulan",
        instruction: "Susun uraian analisis keunggulan struktur asosiatif pada Bagian D dan simpulkan hukum trade-off efisiensi pada Bagian E.",
        target: "Bagian D & E"
      }
    ],
    defaultObservations: [
      {
        no: 1,
        scenario: "Akses Semantik Pasangan Kunci-Nilai",
        testInput: "mhs = {'nim': '1126102268', 'ipk': 3.50}; mhs['nim']",
        expectedTheory: "Akses langsung via label string, mengembalikan '1126102268'",
        actualOutput: "'1126102268'",
        measuredMetric: "Akses semantik O(1) via hash table",
        validationStatus: "Sesuai"
      },
      {
        no: 2,
        scenario: "Uji Aturan Keunikan Kunci (Penimpaan Nilai)",
        testInput: "mhs = {'ipk': 3.50}; mhs['ipk'] = 3.85; mhs['ipk']",
        expectedTheory: "Nilai lama 3.50 ditimpa nilai baru 3.85 di RAM",
        actualOutput: "3.85 (Nilai 3.50 terhapus permanen)",
        measuredMetric: "In-place mutation slot hash yang sama",
        validationStatus: "Sesuai"
      },
      {
        no: 3,
        scenario: "Uji Hashability Kunci (List Sebagai Kunci)",
        testInput: "d = {[1, 2]: 'koordinat'}",
        expectedTheory: "Gagal eksekusi (List mutable, tidak memiliki hash tetap)",
        actualOutput: "TypeError: unhashable type: 'list'",
        measuredMetric: "Penegakan aturan immutability kunci",
        validationStatus: "Sesuai"
      },
      {
        no: 4,
        scenario: "Akses Kunci Tidak Terdaftar via Subscript []",
        testInput: "mhs = {'nama': 'Ahmad'}; mhs['beasiswa']",
        expectedTheory: "Memicu exception KeyError dan menghentikan program",
        actualOutput: "KeyError: 'beasiswa'",
        measuredMetric: "Interupsi runtime fatal terbukti",
        validationStatus: "Sesuai"
      },
      {
        no: 5,
        scenario: "Metode Akses Defensif via .get() dengan Fallback",
        testInput: "mhs.get('beasiswa', 'Tidak Menerima')",
        expectedTheory: "Aman tanpa crash, mengembalikan 'Tidak Menerima'",
        actualOutput: "'Tidak Menerima'",
        measuredMetric: "Ketahanan sistem (Defensive Guard)",
        validationStatus: "Sesuai"
      },
      {
        no: 6,
        scenario: "Siklus CRUD Lengkap pada Dictionary di RAM",
        testInput: "Insert 'semester', update 'nama', pop 'prodi'",
        expectedTheory: "Operasi mutasi berhasil tanpa memindahkan objek",
        actualOutput: "{'nama': 'Ahmad U.', 'semester': 2}",
        measuredMetric: "State transisi asosiatif di RAM bersih",
        validationStatus: "Sesuai"
      },
      {
        no: 7,
        scenario: "Benchmarking Pencarian: Dict O(1) vs List O(N) (100.000)",
        testInput: "Pencarian elemen ke-99.999 pada List vs Dictionary",
        expectedTheory: "Dict ribuan kali lebih cepat daripada List",
        actualOutput: "List: ~2.450ms | Dict: ~0.0012ms (Percepatan ~2000x!)",
        measuredMetric: "Pembuktian empiris kedigdayaan Hash Table O(1)",
        validationStatus: "Sesuai"
      }
    ],
    analisisPrompts: [
      "Berdasarkan pengujian skenario 3, jelaskan apa yang dimaksud dengan istilah 'Hashability' dan mengapa tipe data mutable seperti List dilarang keras dijadikan sebagai kunci dictionary di Python!",
      "Analisis perbandingan antara skenario 4 dan 5! Mengapa penggunaan metode .get() menjadi standar wajib dalam pemrograman pertahanan (defensive programming) saat mengolah payload data JSON dari API publik?",
      "Jelaskan temuan spektakuler Anda pada skenario 7 di mana Dictionary mampu mencari data 2.000 kali lebih cepat daripada List pada 100.000 data! Jelaskan secara arsitektural bagaimana cara kerja fungsi hash di balik layar sehingga waktu pencariannya konstan O(1)!"
    ],
    kesimpulanPrompts: [
      "Rumuskan kesimpulan ilmiah mengenai trade-off (kompromi) antara efisiensi ruang memori (RAM) dan efisiensi waktu komputasi (CPU) yang diwakili oleh struktur data Dictionary!",
      "Bagaimana pembuktian di laboratorium ini membuktikan bahwa penguasaan struktur data lanjutan (asosiatif) adalah kunci pembeda utama antara kode amatir yang lambat dan kode rekayasa industri yang skalabel?"
    ]
  }
];

