# Catatan Penelitian: Arsitektur Database & Normalisasi

Dokumen ini berisi rangkuman diskusi mengenai keputusan arsitektur database pada proyek Web Algoritma & Pemrograman, khususnya terkait normalisasi dan pola *Single Table Inheritance* (STI) pada platform modern seperti Supabase/PostgreSQL.

## Konteks

Dalam skema database, entitas `dosen` dan `mahasiswa` digabungkan ke dalam satu tabel tunggal bernama `users`, dibedakan menggunakan kolom `role`. Hal ini memunculkan pertanyaan kritis: **Apakah rancangan ini melanggar standar normalisasi tabel relasional?**

## Analisis Normalisasi

Secara teoritis berdasarkan aturan normalisasi (1NF - 3NF), tabel tunggal ini masih memenuhi standar dasar:
1. **1NF (Bentuk Normal Pertama)**: Semua atribut/kolom bernilai atomik. Tidak ada *array* kompleks di dalam satu sel.
2. **2NF (Bentuk Normal Kedua)**: Semua kolom bergantung sepenuhnya pada Primary Key (`id`).
3. **3NF (Bentuk Normal Ketiga)**: Tidak ada *transitive dependency*. Nilai seperti `nim` bergantung langsung pada `id` pengguna, bukan bergantung pada `class_id` atau atribut non-kunci lainnya.

Namun, dari perspektif **Entity-Relationship (ER) murni** dan normalisasi tingkat lanjut, desain ini memiliki cacat teoritis:
- Pendekatan ini menghasilkan **nilai NULL untuk atribut yang tidak relevan**. Contohnya, seorang dosen tidak memiliki kelas spesifik (`class_id` bernilai `NULL`), dan mungkin tidak memiliki `nim` layaknya mahasiswa.
- Dalam pemodelan data akademik murni, relasi ini seharusnya dipecah menjadi pola *Supertype-Subtype* (1 tabel umum `users`, lalu berelasi 1-to-1 dengan tabel `dosen` dan `mahasiswa`).

## Trade-off: Teori vs Praktik Modern (Planned Denormalization)

Dalam *Software Engineering* modern, khususnya yang menggunakan *BaaS (Backend as a Service)* seperti Supabase, kita dengan sengaja menerapkan kompromi ini (*Planned Denormalization*) dengan pola **Single Table Inheritance**. Keputusan ini didasari oleh keuntungan praktis yang masif:

### 1. Performa (Reduksi JOIN)
Membaca profil pengguna beserta otorisasi kelasnya bisa dilakukan dengan **satu kali kueri**. Jika mematuhi ERD murni (memecah tabel), setiap validasi pengguna akan selalu membutuhkan operasi `JOIN` antara tabel `users` dan sub-tabelnya, yang dapat menyebabkan *bottleneck* performa saat lalu lintas aplikasi tinggi.

### 2. Kinerja Row Level Security (RLS)
Supabase (PostgreSQL) mengandalkan RLS untuk keamanan data. Mengevaluasi kebijakan (policy) RLS pada satu tabel terpusat jauh lebih ringan daripada mesin database harus memecah evaluasi hak akses ke dalam tiga tabel yang saling terkait (`users`, `dosen`, `mahasiswa`) di setiap *request* (seperti pengambilan data kuis/lab).

### 3. Fleksibilitas Skalabilitas (Future-proofing)
Jika di masa depan ekosistem kelas berkembang (contoh: munculnya peran "Asisten Praktikum"), sistem tidak perlu membongkar rancangan fisik tabel. Cukup menambahkan nilai baru pada `role`, dan sistem autentikasi tetap berjalan sempurna.

## Kesimpulan

Meskipun secara teoritis pola *Single Table Inheritance* menghasilkan redudansi nilai `NULL` yang kurang elok dalam kacamata ERD klasik, pola ini adalah sebuah *Best Practice* di era modern. Ini adalah wujud nyata dari *Engineering Trade-off*: mengorbankan sedikit "kesempurnaan teoritis relasional" demi mendapatkan performa sistem autentikasi, penyederhanaan sekuriti, dan kecepatan baca data yang maksimal.
