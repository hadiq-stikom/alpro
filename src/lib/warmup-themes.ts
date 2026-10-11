export interface WarmupTheme {
  meetingId: number;
  title: string;
  themeContext: string;
  casualTopic: string;
  starterAngles: string[];
  analogyBridge: string;
}

export const WARMUP_THEMES: Record<number, WarmupTheme> = {
  1: {
    meetingId: 1,
    title: 'Pengenalan Komputer & Pemrograman',
    themeContext: 'Filosofi langkah hidup, memasak resep, petunjuk rakit barang, atau rutinitas pagi.',
    casualTopic: 'Langkah-langkah teratur dalam kegiatan sehari-hari (membuat kopi, memasak mi, rute berangkat kuliah).',
    starterAngles: [
      'Menanyakan makanan/minuman favorit mahasiswa hari ini dan bagaimana urutan langkah mereka saat menyiapkannya.',
      'Menanyakan kebiasaan pagi sebelum berangkat kuliah atau aktivitas pertama yang wajib dilakukan saat bangun tidur.',
      'Menanyakan pengalaman mengikuti petunjuk pemasangan barang atau peta jalan yang sempat bikin bingung.'
    ],
    analogyBridge: 'Manusia terbiasa berasumsi, sedangkan komputer butuh instruksi eksplisit satu per satu tanpa ada yang terlewat.'
  },
  2: {
    meetingId: 2,
    title: 'Arsitektur Komputer & Sistem Bilangan',
    themeContext: 'Kapasitas memori HP, gadget favorit, baterai, atau saklar listrik lampu kamar.',
    casualTopic: 'Barang elektronik kesayangan, masalah memori penyimpanan penuh, atau rahasia tombol switch ON/OFF.',
    starterAngles: [
      'Menanyakan HP atau laptop yang sedang dipakai, apa yang paling sering bikin memorinya cepat penuh (foto, game, atau file kuliah?).',
      'Menanyakan pengalaman mati lampu atau sensasi saklar switch ON/OFF di kos/rumah.',
      'Menanyakan apakah lebih suka menyimpan rapi barang di laci atau membiarkannya berserakan di meja.'
    ],
    analogyBridge: 'Di balik aplikasi secanggih apapun, semuanya tersusun dari saklar fisik mikroskopis yang hanya kenal ON dan OFF.'
  },
  3: {
    meetingId: 3,
    title: 'Notasi & Penyajian Algoritma',
    themeContext: 'Cara memberi petunjuk jalan ke teman, sketsa gambar vs teks, atau bahasa sandi rahasia.',
    casualTopic: 'Gaya komunikasi saat ngasih arahan (tipe deskriptif panjang lebar atau tipe peta coret-coretan).',
    starterAngles: [
      'Menanyakan bagaimana cara mahasiswa mengarahkan teman yang tersesat mau main ke rumah/kosannya.',
      'Menanyakan apakah mahasiswa tipe orang yang lebih paham membaca petunjuk tulisan atau melihat diagram/gambar visual.',
      'Menanyakan apakah pernah punya catatan rencana harian (to-do list) dan bagaimana format menuliskannya.'
    ],
    analogyBridge: 'Pikiran manusia yang rumit bisa dituangkan dalam 3 bentuk: cerita kata-kata (naratif), bagan alur (flowchart), atau coretan semi-kode (pseudocode).'
  },
  4: {
    meetingId: 4,
    title: 'Tipe Data, Variabel & I/O Dasar',
    themeContext: 'Pemberian label wadah barang, laci lemari baju, kategori playlist musik, atau dompet.',
    casualTopic: 'Organisasi wadah penyimpanan barang pribadi dan label nama yang diberikan.',
    starterAngles: [
      'Menanyakan bagaimana mahasiswa mengorganisasi playlist Spotify atau folder file di laptop.',
      'Menanyakan barang apa di meja belajar yang punya wadah khusus dan dilarang dipindahkan orang lain.',
      'Menanyakan panggilan atau julukan unik yang paling disukai teman-teman untuk memanggil namanya.'
    ],
    analogyBridge: 'Setiap wadah punya ukuran dan jenis isi yang pas—seperti variabel di memori RAM yang diberi tipe dan nama khusus.'
  },
  5: {
    meetingId: 5,
    title: 'Operator, Ekspresi & Manipulasi Data',
    themeContext: 'Kalkulasi belanja diskon, hitung split-bill nongkrong di kafe, atau kombinasi logika belanja.',
    casualTopic: 'Pengalaman nongkrong bareng teman, jajan hemat, atau perburuan promo tanggal kembar di marketplace.',
    starterAngles: [
      'Menanyakan pengalaman nongkrong baru-baru ini dan siapa yang biasanya kebagian tugas menghitung split bill.',
      'Menanyakan taktik belanja online saat tanggal kembar atau mencari promo gratis ongkir.',
      'Menanyakan apa kriteria mutlak kalau mau makan di luar (misal: "harus pedas DAN harga mahasiswa").'
    ],
    analogyBridge: 'Keputusan belanja kita sebenarnya adalah rantai ekspresi matematika dan logika Boolean yang dievaluasi secara instan.'
  },
  6: {
    meetingId: 6,
    title: 'Struktur Percabangan Statemen Tunggal & Ganda',
    themeContext: 'Dilema pilihan dua arah (bawa payung vs tidak, sarapan vs tidur lagi, jalur macet vs lancar).',
    casualTopic: 'Pilihan keputusan sehari-hari yang punya konsekuensi berbeda jika skenario berubah.',
    starterAngles: [
      'Menanyakan apakah hari ini sempat ragu mau pakai pakaian apa atau bawa payung melihat cuaca di luar.',
      'Menanyakan pilihan sarapan tadi pagi dan apa yang terjadi kalau menu incaran ternyata habis.',
      'Menanyakan jalur perjalanan berangkat kuliah: apakah setia pada satu jalur atau suka ambil jalan tikus alternatif.'
    ],
    analogyBridge: 'Hidup selalu punya simpang jalan IF (jika terjadi) dan ELSE (jika tidak), yang mengarahkan langkah kita berikutnya.'
  },
  7: {
    meetingId: 7,
    title: 'Percabangan Majemuk & Bersarang',
    themeContext: 'Sistem ranking di game online, filter pencarian toko online bertingkat, atau antrean prioritas.',
    casualTopic: 'Tingkatan level game, syarat diskon bertingkat, atau memilih menu di restoran dengan banyak opsi.',
    starterAngles: [
      'Menanyakan game apa yang pernah atau sedang dimainkan dan bagaimana sistem ranking/tier tier pemainnya.',
      'Menanyakan bagaimana mahasiswa memilih film di Netflix atau barang di e-commerce saat pilihannya sangat banyak.',
      'Menanyakan menu minuman favorit saat pesan di kafe: bagaimana menentukan ukuran cup, tingkat gula, dan toppingnya.'
    ],
    analogyBridge: 'Keputusan bertingkat (cascading) dan bersarang (nested) membantu kita menyaring ratusan kemungkinan menjadi satu aksi tepat.'
  },
  8: {
    meetingId: 8,
    title: 'Evaluasi Tengah Semester (UTS)',
    themeContext: 'Kilas balik setengah perjalanan kuliah, titik balik pemahaman, dan refleksi pencapaian.',
    casualTopic: 'Perasaan dan pengalaman seru selama setengah semester pertama di perkuliahan Informatika.',
    starterAngles: [
      'Menanyakan bagaimana rasanya sudah menjalani setengah semester kuliah Teknik Informatika sejauh ini.',
      'Menanyakan topik materi apa dari pertemuan 1 sampai 7 yang awalnya terasa misterius tapi sekarang mulai masuk akal.',
      'Menanyakan ritual atau kebiasaan khusus mahasiswa sebelum menghadapi sesi ujian agar tetap tenang dan fokus.'
    ],
    analogyBridge: 'Setiap langkah kecil logika yang dipelajari sejauh ini kini menyatu menjadi fondasi berpikir komputasional yang tangguh.'
  },
  9: {
    meetingId: 9,
    title: 'Dasar Perulangan (FOR & WHILE Loop)',
    themeContext: 'Kebiasaan berulang (lagu on repeat, olahraga repetisi, alarm HP tunda 5 menit, grinding rank).',
    casualTopic: 'Aktivitas yang diulang-ulang berkali-kali sampai target atau batas tertentu tercapai.',
    starterAngles: [
      'Menanyakan apakah ada lagu yang belakangan ini diputar berulang-ulang tanpa bosan sepanjang hari.',
      'Menanyakan berapa kali alarm HP biasanya berbunyi atau ditekan tombol "tunda" (snooze) sebelum benar-benar bangun.',
      'Menanyakan rutinitas latihan fisik atau hobi yang butuh latihan berulang-ulang untuk menguasainya.'
    ],
    analogyBridge: 'Komputer tidak pernah lelah mengulang aksi jutaan kali, selama kita memberi tahu kapan perulangan harus berhenti.'
  },
  10: {
    meetingId: 10,
    title: 'Perulangan Bersarang (Nested Loop)',
    themeContext: 'Pola ubin lantai, kalender meja (minggu dan hari), barisan kursi bioskop, atau formasi marching band.',
    casualTopic: 'Susunan kisi-kisi atau grid dua dimensi dalam kehidupan sehari-hari (baris dan kolom).',
    starterAngles: [
      'Menanyakan pengalaman saat memesan kursi bioskop atau tiket konser: lebih suka duduk di baris tengah atau pojok atas.',
      'Menanyakan apakah pernah mengamati pola lantai ubin atau motif batik yang berulang secara rapi.',
      'Menanyakan bagaimana mahasiswa menjadwalkan kalender harian dalam rentang seminggu penuh.'
    ],
    analogyBridge: 'Perulangan di dalam perulangan ibarat menelusuri setiap baris dan kolom pada papan catur atau layar monitor.'
  },
  11: {
    meetingId: 11,
    title: 'Struktur Data Berurutan (List & Tuple)',
    themeContext: 'Daftar nomor antrean belanjaan, rak laci bernomor, akta kelahiran/prasasti yang tidak boleh diubah.',
    casualTopic: 'Menyusun daftar barang berderet yang bebas ditambah/hapus (List) vs data permanen yang terkunci aman (Tuple).',
    starterAngles: [
      'Menanyakan barang apa saja yang saat ini ada di daftar belanjaan (wishlist) yang paling ingin dibeli.',
      'Menanyakan data pribadi apa yang menurut mahasiswa haram untuk diubah-ubah (seperti tanggal lahir atau NIK).',
      'Menanyakan bagaimana mahasiswa menyusun koleksi buku atau playlist lagu favorit di ponsel.'
    ],
    analogyBridge: 'List ibarat buku catatan pensil yang bebas diedit kapan saja, sedangkan Tuple adalah prasasti batu yang terukir aman selamanya.'
  },
  12: {
    meetingId: 12,
    title: 'Struktur Data Asosiatif (Dictionary & Set)',
    themeContext: 'Kontak telepon di ponsel (Nama -> Nomor), formulir biodata KTP, koleksi koin/stiker unik tanpa kembar.',
    casualTopic: 'Mencari informasi berdasarkan label nama daripada nomor urut, dan trik membuang barang kembar.',
    starterAngles: [
      'Menanyakan bagaimana mahasiswa menyimpan nama kontak teman di HP (apakah nama lengkap, julukan, atau nama instansi).',
      'Menanyakan apakah pernah mengoleksi barang tertentu (seperti stiker, koin, photocard) dan bagaimana menukar barang yang kembar.',
      'Menanyakan formulir pendaftaran apa yang paling sering diisi dan kolom apa saja yang wajib ada.'
    ],
    analogyBridge: 'Dictionary menghubungkan kata kunci dengan artinya seperti buku kontak, sedangkan Set memastikan tidak ada anggota yang kembar.'
  },
  13: {
    meetingId: 13,
    title: 'Fungsi Dasar & Top-Down Design',
    themeContext: 'Bumbu racik instan praktis, pembagian tugas dalam kepanitiaan, tombol remote TV dengan fungsi masing-masing.',
    casualTopic: 'Cara memecah proyek atau acara besar menjadi sub-kegiatan mandiri yang rapi dan terorganisir.',
    starterAngles: [
      'Menanyakan peran yang paling disukai saat ada acara kepanitiaan kampus (perlengkapan, konsumsi, acara, atau publikasi).',
      'Menanyakan apakah lebih suka merakit komputer/lego dengan mengikuti modul panduan per bagian atau langsung coba-coba.',
      'Menanyakan tombol pintas di keyboard atau remote TV yang paling sering ditekan untuk mempermudah hidup.'
    ],
    analogyBridge: 'Top-down design memecah tugas raksasa menjadi sub-fungsi kecil; setiap fungsi fokus mengerjakan satu tugas hingga tuntas.'
  },
  14: {
    meetingId: 14,
    title: 'Fungsi Lanjutan (Parameter & Return Value)',
    themeContext: 'Jasa kurir pengantar paket (masukan alamat) dan tanda terima/struk pengembalian barang belanjaan.',
    casualTopic: 'Pengalaman memesan makanan dengan catatan khusus (parameter) dan menerima struk hasil pembelian (return value).',
    starterAngles: [
      'Menanyakan kalau memesan makanan via ojek online, seberapa sering memberi catatan kustom (tanpa pedas, saus dipisah, es sedikit).',
      'Menanyakan apakah mahasiswa terbiasa menyimpan struk belanjaan untuk mencatat pengeluaran keuangan pribadi.',
      'Menanyakan rahasia kecil di dalam kamar kos (variabel lokal) yang tidak perlu diketahui oleh orang di luar kamar.'
    ],
    analogyBridge: 'Parameter adalah catatan pesanan yang kita kirim masuk ke dapur, sedangkan return value adalah hidangan lezat yang disajikan keluar.'
  },
  15: {
    meetingId: 15,
    title: 'Penanganan Galat & Teknik Debugging',
    themeContext: 'Lampu indikator check-engine kendaraan, kotak P3K pertolongan pertama, peran detektif melacak petunjuk bug.',
    casualTopic: 'Pengalaman menghadapi situasi tak terduga (ban bocor, salah ketik) dan bagaimana sikap tenang menyelesaikannya.',
    starterAngles: [
      'Menanyakan reaksi pertama saat kendaraan tiba-tiba mogok atau ada barang elektronik rumah yang mati mendadak.',
      'Menanyakan apakah mahasiswa tipe orang yang panik atau tenang membaca buku manual saat ada indikator error.',
      'Menanyakan pengalaman salah paham atau salah komunikasi dengan teman dan bagaimana cara meluruskan kesalahannya.'
    ],
    analogyBridge: 'Pesan error bukan musuh yang menakutkan, melainkan surat petunjuk dari komputer yang memberi tahu di mana letak obatnya.'
  },
  16: {
    meetingId: 16,
    title: 'Ujian Akhir Semester (UAS) & Proyek Terapan',
    themeContext: 'Kilas balik perjalanan 1 semester penuh, transformasi dari pemula menjadi calon programmer handal, rencana liburan.',
    casualTopic: 'Rasa bangga telah menuntaskan seluruh materi perkuliahan dan harapan petualangan koding ke depan.',
    starterAngles: [
      'Menanyakan kilas balik dari pertemuan 1 sampai hari ini: apa perubahan terbesar yang dirasakan dalam cara berpikir logis.',
      'Menanyakan apa proyek impian atau aplikasi yang paling ingin dibuat setelah resmi menyelesaikan mata kuliah Algoritma & Pemrograman ini.',
      'Menanyakan rencana liburan atau kegiatan santai apa yang paling dinantikan setelah tuntas mengerjakan UAS hari ini.'
    ],
    analogyBridge: 'Algoritma bukan sekadar baris kode di layar, melainkan seni menyelesaikan masalah kehidupan secara elegan dan terstruktur.'
  }
};

export function getTimeContext(): { timeOfDay: 'pagi' | 'siang' | 'sore' | 'malam'; dayName: string; greeting: string } {
  const now = new Date();
  const hours = now.getHours();
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const dayName = days[now.getDay()];

  let timeOfDay: 'pagi' | 'siang' | 'sore' | 'malam' = 'pagi';
  let greeting = 'Selamat pagi';

  if (hours >= 5 && hours < 11) {
    timeOfDay = 'pagi';
    greeting = 'Selamat pagi';
  } else if (hours >= 11 && hours < 15) {
    timeOfDay = 'siang';
    greeting = 'Selamat siang';
  } else if (hours >= 15 && hours < 18) {
    timeOfDay = 'sore';
    greeting = 'Selamat sore';
  } else {
    timeOfDay = 'malam';
    greeting = 'Selamat malam';
  }

  return { timeOfDay, dayName, greeting };
}

export function getWarmupTheme(meetingId: number): WarmupTheme {
  return WARMUP_THEMES[meetingId] || WARMUP_THEMES[1];
}
