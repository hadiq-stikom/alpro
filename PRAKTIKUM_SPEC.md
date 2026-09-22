# 📋 SPESIFIKASI STANDAR PRAKTIKUM: ALGORITMA & PEMROGRAMAN
# Dokumen Rujukan Utama (Single Source of Truth) — Versi 1.0 (22 September 2026)

> **PENTING**: Dokumen ini adalah sumber kebenaran tunggal (*single source of truth*) untuk seluruh perancangan, arsitektur, dan pengembangan sistem **Praktikum Algoritma & Pemrograman**. Seluruh modul, lembar kerja praktikum (LKP), sistem pengukuran, dan generator laporan wajib mematuhi ketentuan di dalam dokumen ini.

---

## 1. VISI, PARADIGMA & FILOSOFI PRAKTIKUM

### 1.1 Identitas Mata Kuliah
- **Mata Kuliah Teori**: Algoritma & Pemrograman (TI-101, 3 SKS)
- **Mata Kuliah Pasangan**: **Praktikum Algoritma & Pemrograman (1 SKS)**
- **Dosen Pengampu**: **Hadiq, ST, M.Kom**

### 1.2 Pergeseran Paradigma: Dari "Praktek Koding" ke "Pengukuran & Validasi"
Praktikum ini **BUKAN LAGI** sekadar sesi mengetik sintaks atau menyalin kode dari modul ke komputer (*coding-first*). 
Praktikum ini diposisikan sebagai **Laboratorium Eksperimen Sains Komputasi (*Empirical Computer Science Lab*)**, di mana mahasiswa bertindak sebagai **Penguji Mutu & Analis Kinerja Algoritma (*Software QA & Algorithm Analyst*)**.

Dua pilar utama laboratorium:
1. **Validasi Algoritma & Pemrograman**:
   - Memvalidasi kebenaran logika program (*Correctness*).
   - Menguji respons program terhadap variasi skenario: *Happy Path* (Normal), *Boundary Value* (Ambang Batas), dan *Invalid/Extreme Input* (Data Tidak Valid).
   - Menguji cakupan cabang (*Branch & Logic Coverage*) untuk memastikan tidak ada alur yang cacat atau terlewat.
2. **Pengukuran Algoritma & Pemrograman**:
   - Mengukur metrik kinerja program secara empiris dan kuantitatif.
   - Pengukuran alokasi memori fisik variabel di RAM (*Memory Allocation / State Tracking*).
   - Pengukuran waktu eksekusi (*Execution Time* dalam milidetik/mikrodetik).
   - Penghitungan jumlah langkah instruksi dan iterasi perulangan ($N = 10, 100, 1.000$).
   - Komparasi efisiensi empiris antara dua pendekatan algoritma berbeda untuk persoalan yang sama.

---

## 2. STRUKTUR 7 PERTEMUAN PRAKTIKUM

Mata kuliah praktikum ini tersusun atas **7 Modul Pertemuan** yang progresif:

| No | Topik Modul | Fokus Pengujian & Validasi (Kebenaran Logika) | Fokus Pengukuran (Metrik & Kinerja) |
|:---:|:---|:---|:---|
| **1** | **Tipe Data, Variabel & Operator** | **Validasi Presisi & Type Safety:**<br>Menguji fenomena *type mismatch*, kepatuhan batas nilai, pembagian bulat (*integer truncation*) vs pecahan (*float*), dan *string concatenation bug*. | **Pengukuran Ukuran Memori:**<br>Mengukur alokasi byte memori per tipe data di RAM (`int`, `float`, `str`, `bool`) dan mengamati perubahan nilai state variabel. |
| **2** | **Sequence (Input - Proses - Output)** | **Validasi Ketergantungan Alur:**<br>Menguji dampak jika urutan instruksi dibalik/ditukar, serta validasi ketepatan konversi rumus matematika ke bentuk komputasi. | **Tracing State Transisi Variabel:**<br>Mengukur perubahan nilai variabel baris-demi-baris dari inisialisasi masukan hingga keluaran akhir. |
| **3** | **Selection (Percabangan)** | **Branch & Boundary Coverage:**<br>Menguji nilai tepat di ambang batas operator relasional (`<` vs `<=`), serta membuktikan seluruh cabang (True dan False) dapat dilalui. | **Pengukuran Efisiensi Jalur:**<br>Menghitung rasio percabangan yang dieksekusi vs dilewati (*taken vs bypassed*), serta mengukur efisiensi urutan evaluasi kondisi. |
| **4** | **Looping (Perulangan)** | **Validasi Kondisi Berhenti:**<br>Menguji kebenaran *termination condition*, pencegahan *infinite loop*, dan perilaku loop pada kondisi batas (0 iterasi). | **Pengukuran Skalabilitas & Waktu:**<br>Mengukur jumlah iterasi aktual dan waktu eksekusi saat ukuran input $N$ dinaikkan ($N = 10, 100, 1.000$). |
| **5** | **Function (Fungsi & Modularitas)** | **Validasi Kontrak I/O & Scope:**<br>Memvalidasi parameter masukan, keabsahan nilai balik (*return value*), dan batas isolasi variabel lokal vs global (*variable scope*). | **Tracing Call Stack & Overhead:**<br>Mengukur pemakaian memori pada tumpukan pemanggilan (*call stack*) dan waktu eksekusi pemanggilan modular. |
| **6** | **Array / List (Struktur Data Sekuensial)** | **Validasi Batas Indeks:**<br>Menguji batas indeks (*index out of bounds*), penanganan array kosong, dan integritas data saat operasi penyisipan/penghapusan. | **Pengukuran Waktu Akses & Pencarian:**<br>Mengukur waktu pencarian elemen (*linear search* vs *binary search*) dan pola pertumbuhan memori dinamis. |
| **7** | **Dictionary / Object (Struktur Asosiatif)** | **Validasi Integritas Key-Value:**<br>Menguji penanganan *key error / key not found*, keunikan kunci (*unique keys*), dan keabsahan pemetaan data. | **Komparasi Efisiensi Pencarian:**<br>Mengukur perbedaan kecepatan pencarian langsung $O(1)$ pada Dictionary vs pencarian sekuensial pada List untuk volume data besar. |

---

## 3. SUSUNAN BAKU LEMBAR KERJA PRAKTIKUM (LKP)

Setiap Lembar Kerja Praktikum (baik tampilan formulir web maupun dokumen cetak PDF) **WAJIB** mengikuti susunan 5 bagian baku (A s.d. E) berikut:

### **A. Capaian Praktikum** *(Learning Outcomes)*
- Menetapkan kompetensi konkret yang harus dikuasai mahasiswa setelah menyelesaikan sesi praktikum.
- Bersifat terukur dan mengarah pada keterampilan analisis/pengukuran.

### **B. Dasar Teori** *(Theoretical Framework)*
- Landasan ilmiah ringkas yang mendasari eksperimen.
- Memuat definisi penting, konsep kunci, atau rumus persamaan yang menjadi dasar hipotesis pengujian.

### **C. Praktikum** *(Experimental Procedures & Observation Table)*
- **Prosedur / Langkah Kerja**: Instruksi langkah demi langkah pelaksanaan uji coba laboratorium.
- **Tabel Pengamatan & Pengukuran**:
  - Tabel terstruktur yang **wajib diisi oleh mahasiswa**.
  - Kolom standar meliputi:
    1. *Nomor Skenario / Kasus Uji* (Normal, Batas Ekstrem, Tidak Valid).
    2. *Parameter Input Uji*.
    3. *Prediksi Teori* (Ekspektasi sebelum dijalankan).
    4. *Hasil Aktual Program* (Nilai keluaran nyata dari mesin).
    5. *Metrik Terukur* (Alokasi Memori, Waktu Eksekusi ms, Status Error).
    6. *Status Validasi* (Sesuai / Tidak Sesuai).

### **D. Analisis** *(Empirical Data Analysis & Discussion)*
- Ruang telaah analitis mendalam dari mahasiswa berbasis data di Bagian C.
- Mahasiswa menjelaskan *mengapa* hasil pengamatan tersebut terjadi, menghubungkannya dengan teori di Bagian B, dan mendiagnosis anomali atau *logic error* yang muncul.

### **E. Kesimpulan** *(Conclusion)*
- Pernyataan ringkas berbasis bukti empiris yang menjawab langsung target capaian di Bagian A.
- Kaidah atau batasan komputasi apa yang berhasil dibuktikan melalui sesi praktikum tersebut.

---

## 4. SISTEM APLIKASI LEMBAR KERJA PRAKTIKUM (WEB-BASED & PDF)

### 4.1 Antarmuka Web (Web-Based Worksheet)
1. **Identitas Terintegrasi Otomatis**:
   - Terkoneksi dengan akun mahasiswa (NIM) di Supabase.
   - Kolom Nama Mahasiswa, NIM, Kelas, dan Dosen Pengampu terkunci otomatis.
2. **Penyajian Materi A & B**:
   - Ditampilkan bersih dan elegan sebagai panduan belajar mahasiswa.
3. **Formulir Interaktif Bagian C, D, dan E**:
   - Tabel pengamatan interaktif yang responsif dan mudah diisi.
   - Area pengetikan analisis dan kesimpulan terstruktur.
   - Fitur **Penyimpanan Otomatis (*Auto-Save*)** ke local state agar mahasiswa tidak kehilangan data ketikan.

### 4.2 Dokumen Laporan Resmi (Print-Ready PDF)
Dokumen yang diunduh mahasiswa adalah **Laporan Resmi Standar Akademik (Ukuran A4)**:
1. **Kop Surat / Header Resmi**:
   - Nama Laboratorium: *Laboratorium Algoritma dan Pemrograman*.
   - Program Studi: *Teknik Informatika*.
   - Judul Modul & Nomor Pertemuan.
2. **Blok Identitas Mahasiswa & Dosen**:
   - Nama Mahasiswa, NIM, Kelas, Tanggal Praktikum, dan Nama Dosen Pengampu (**Hadiq, ST, M.Kom**).
3. **Isi Lengkap Bagian A s.d. E**:
   - Tersusun proporsional tanpa pergeseran layout atau margin berantakan.
4. **Blok Penilaian & Lembar Pengesahan (Signature Box)**:
   - Kotak Skor/Nilai Akhir: `[ ..... / 100 ]`.
   - Kolom Tanda Tangan Praktikan (sisi kiri).
   - Kolom Tanda Tangan Dosen Pengampu (sisi kanan) lengkap dengan nama dan NIP/NIDN.

---

## 5. ARSITEKTUR UI/UX & ISOLASI LAYOUT: DUA PARADIGMA DALAM SATU APLIKASI

Meskipun modul Teori dan Praktikum berada dalam satu proyek Web-Alpro (Opsi A) demi efisiensi *Single Sign-On (SSO)* dan basis data terpadu, keduanya mengusung **dua paradigma dan model mental (*mental model*) yang berbeda secara tegas**:

### 5.1 Matriks Perbedaan Paradigma Teori vs Praktikum

| Dimensi | 🎓 Ruang Kuliah (Teori) | 🔬 Ruang Laboratorium (Praktikum) |
|:---|:---|:---|
| **Paradigma Utama** | **Eksplanatif & Gamifikasi:**<br>Membangun konsep, eksplorasi 4 representasi, kuis interaktif, dan lencana capaian. | **Empiris & Ketelitian Ilmiah:**<br>Pengujian hipotesis, pencatatan data ke tabel pengamatan, analisis data empiris, dan pengesahan laporan resmi. |
| **Metafora Desain** | *"Interactive Digital Textbook & Studio"* | *"Scientific Workbench & Formal Lab Sheet"* |
| **Palet & Aksen** | Hangat, dinamis, animasi aliran flowchart, kaya warna gamifikasi (9 lencana). | Presisi tinggi, aksen warna instrumen laboratorium (*Cyan / Indigo / Slate*), garis tabel tegas, minim distraksi visual. |
| **Interaksi Kunci** | Menyimak materi, mencoba teka-teki logika, menulis kode di editor, kuis berbatas waktu. | Menjalankan instrumen alat ukur (*Run & Measure*), mengisi sel-sel tabel pengamatan, mengetik analisis dan kesimpulan A s.d. E. |
| **Hasil Akhir** | Lencana Capaian (E s.d. A) di profil/dashboard. | **Dokumen Fisik PDF Resmi A4** lengkap dengan kotak nilai dan tanda tangan basah dosen & mahasiswa. |

### 5.2 Implementasi Layout Mandiri (*Independent Layout Hierarchy*)
Di Next.js App Router, pemisahan atmosfer ini diwujudkan melalui hierarki rute dan layout terisolasi:

```
src/app/
├── theory/[id]/            <- Layout Teori (Navbar standar, animasi pilar, gamifikasi)
│
└── praktikum/              <- Layout Khusus Laboratorium (Terisolasi dari Teori)
    ├── layout.tsx          <- Header Laboratorium, Status Auto-Save Draf, Switcher 7 Modul
    ├── page.tsx            <- Beranda Laboratorium (Peta 7 Modul & Status Pengumpulan)
    ├── [id]/page.tsx       <- Formulir Web Interaktif Lembar Kerja Praktikum (A s.d. E)
    └── [id]/print/page.tsx <- Mode Khusus Render Dokumen A4 Resmi untuk Ekspor PDF
```

### 5.3 Indikator Visual Peralihan Konteks (*Context Switching*)
1. **Navigasi Utama Terpadu**: Navbar utama menyediakan tombol peralihan yang tegas antara **📘 Materi Teori** dan **🔬 Praktikum (LKP)**.
2. **Visual Cue Laboratorium**: Saat mahasiswa masuk ke `/praktikum`, tampilan beralih ke atmosfer laboratorium dengan identitas resmi:
   `🔬 Laboratorium Algoritma & Pemrograman`
3. **Status Draf Real-Time**: Menyediakan indikator penyimpanan otomatis (`💾 Draf Tersimpan Otomatis`) dan tombol cepat pratinjau dokumen cetak (`📄 Pratinjau PDF A4`).

---

## 6. HUBUNGAN DENGAN SISTEM DATABASE

- **Autentikasi Terpadu (Single Sign-On)**: Memanfaatkan kredensial akun mahasiswa yang telah terdaftar di Supabase (`auth.users` dan `public.users`). Mahasiswa login sekali dengan NIM dan langsung dapat mengakses materi kuliah maupun lembar kerja praktikum.
- **Penyimpanan Nilai & Laporan**: Status pengerjaan, nilai dosen, dan data tabel pengamatan tersinkronisasi ke tabel laporan praktikum di Supabase untuk monitoring kelas oleh dosen.

---

*Disusun dan disepakati oleh: Hadiq, ST, M.Kom bersama Antigravity AI*  
*Tanggal: 22 September 2026*

