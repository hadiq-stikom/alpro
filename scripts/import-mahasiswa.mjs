import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("❌ Error: NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY wajib ada di .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const MAHASISWA_LIST = [
  { nim: '1122102088', name: 'RAFFAEL ANANDA ADI PUTRA' },
  { nim: '1126102242', name: 'CHELSEA FRANSISCA LAURENT' },
  { nim: '1126102243', name: 'RISKI NAILUS SAADAH' },
  { nim: '1126102244', name: 'MOHAMAD IVAN SAYFANI' },
  { nim: '1126102246', name: 'MOH. DENDY ARDIYANSYAH' },
  { nim: '1126102249', name: 'OKY HADI PRASETYA' },
  { nim: '1126102250', name: 'RODEON VARISDA NURSYAHBANA' },
  { nim: '1126102251', name: 'YUDIKA ARDIANTO PUTRA' },
  { nim: '1126102254', name: 'DIAN SOFIANA NUR HAFIFA' },
  { nim: '1126102258', name: 'MOH. IRVANSIA' },
  { nim: '1126102259', name: 'ILHAM RASIT TAMIMI' },
  { nim: '1126102260', name: 'DIMAS DWI KURNIAWAN' },
  { nim: '1126102262', name: 'MOHAMMAD IRFAN FADHILA' },
  { nim: '1126102264', name: 'MOH. ALVIN TAUVIQUL HIKAM' },
  { nim: '1126102265', name: 'MUHAMMAD FARIDZ' },
  { nim: '1126102268', name: 'AHMAD UMARUL FARUQ' },
  { nim: '1126102270', name: 'NAKSATRA PRABANGGANA' },
  { nim: '1126102273', name: 'ARIEL IKMA SALVINO ADITYA WIJAYA' },
  { nim: '1126102277', name: 'EL TAJZNIEAM PAQUITTA DORRANGGO BANI HASAN' },
  { nim: '1126102278', name: 'NADIA PUTRI HOLIFAH' },
];

async function main() {
  console.log("🚀 Memulai proses pendaftaran 20 mahasiswa ke Supabase...\n");

  // Ambil kelas default jika ada (misal TI-SP1)
  const { data: classes } = await supabase.from('classes').select('id, name').limit(1);
  const defaultClass = classes && classes.length > 0 ? classes[0] : null;

  if (defaultClass) {
    console.log(`📌 Mahasiswa akan diasosiasikan ke kelas: ${defaultClass.name} (${defaultClass.id})\n`);
  } else {
    console.log(`⚠️ Tidak ditemukan kelas di tabel classes. class_id akan diisi NULL.\n`);
  }

  let successCount = 0;
  let failCount = 0;

  for (const mhs of MAHASISWA_LIST) {
    const email = `${mhs.nim}@alpro.internal`;
    const password = mhs.nim; // Password default = NIM

    try {
      // 1. Buat / Cek user di auth.users via Admin API
      let userId = null;

      const { data: createData, error: createError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: mhs.name, nim: mhs.nim },
      });

      if (createError) {
        if (createError.message.includes("already registered") || createError.message.includes("already exists")) {
          // Cari user id yang sudah ada
          const { data: listData } = await supabase.auth.admin.listUsers();
          const existingUser = listData?.users?.find(u => u.email === email);
          if (existingUser) {
            userId = existingUser.id;
            console.log(`ℹ️ [AUTH] User sudah ada: ${mhs.nim} (${userId})`);
          } else {
            throw createError;
          }
        } else {
          throw createError;
        }
      } else {
        userId = createData.user.id;
        console.log(`✅ [AUTH] Berhasil buat akun auth: ${mhs.nim} (${email})`);
      }

      // 2. Insert / Update ke public.users
      const { error: profileError } = await supabase.from('users').upsert({
        id: userId,
        email,
        full_name: mhs.name,
        nim: mhs.nim,
        role: 'mahasiswa',
        class_id: defaultClass ? defaultClass.id : null,
        password_changed: false, // Mahasiswa harus ganti password saat login pertama
      }, { onConflict: 'id' });

      if (profileError) {
        console.error(`❌ [PROFILE] Gagal simpan ke public.users untuk ${mhs.nim}:`, profileError.message);
        failCount++;
      } else {
        console.log(`   └─ [PROFILE] Profil tersimpan di public.users: ${mhs.name}`);
        successCount++;
      }

    } catch (err) {
      console.error(`❌ Gagal memproses ${mhs.nim} - ${mhs.name}:`, err.message);
      failCount++;
    }
  }

  console.log("\n========================================================");
  console.log(`🎉 Selesai! Berhasil: ${successCount} mahasiswa, Gagal: ${failCount}`);
  console.log("Mahasiswa kini bisa login di /login dengan:");
  console.log("  - NIM      : <NIM masing-masing>");
  console.log("  - Password : <NIM masing-masing>");
  console.log("Saat login pertama kali, mereka otomatis diarahkan untuk mengganti password.");
  console.log("========================================================\n");
}

main();
