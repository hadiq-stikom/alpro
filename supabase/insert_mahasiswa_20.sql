-- ================================================================
-- SCRIPT INSERT 20 MAHASISWA & AKUN LOGIN SUPABASE
-- Digunakan untuk mendaftarkan mahasiswa baru agar bisa login
-- dengan Username: NIM dan Password: NIM (default)
-- ================================================================

-- 1. Pastikan ekstensi pgcrypto aktif untuk hashing password
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Tentukan ID Kelas (Default menggunakan TI-SP1 atau sesuaikan ID kelas)
-- Anda bisa mengganti ID kelas di bawah jika ingin memasukkan ke kelas tertentu.
DO $$
DECLARE
  v_class_id UUID;
  rec RECORD;
  v_user_id UUID;
BEGIN
  -- Ambil kelas default (misal TI-SP1) jika ada, atau NULL jika belum ditentukan
  SELECT id INTO v_class_id FROM public.classes WHERE name = 'TI-SP1' LIMIT 1;

  -- 3. Daftar 20 Mahasiswa (NIM dan Nama Lengkap)
  FOR rec IN 
    SELECT * FROM (VALUES
      ('1122102088', 'RAFFAEL ANANDA ADI PUTRA'),
      ('1126102242', 'CHELSEA FRANSISCA LAURENT'),
      ('1126102243', 'RISKI NAILUS SAADAH'),
      ('1126102244', 'MOHAMAD IVAN SAYFANI'),
      ('1126102246', 'MOH. DENDY ARDIYANSYAH'),
      ('1126102249', 'OKY HADI PRASETYA'),
      ('1126102250', 'RODEON VARISDA NURSYAHBANA'),
      ('1126102251', 'YUDIKA ARDIANTO PUTRA'),
      ('1126102254', 'DIAN SOFIANA NUR HAFIFA'),
      ('1126102258', 'MOH. IRVANSIA'),
      ('1126102259', 'ILHAM RASIT TAMIMI'),
      ('1126102260', 'DIMAS DWI KURNIAWAN'),
      ('1126102262', 'MOHAMMAD IRFAN FADHILA'),
      ('1126102264', 'MOH. ALVIN TAUVIQUL HIKAM'),
      ('1126102265', 'MUHAMMAD FARIDZ'),
      ('1126102268', 'AHMAD UMARUL FARUQ'),
      ('1126102270', 'NAKSATRA PRABANGGANA'),
      ('1126102273', 'ARIEL IKMA SALVINO ADITYA WIJAYA'),
      ('1126102277', 'EL TAJZNIEAM PAQUITTA DORRANGGO BANI HASAN'),
      ('1126102278', 'NADIA PUTRI HOLIFAH'),
      ('1126100109','Tes Data')
    ) AS t(nim, full_name)
  LOOP
    -- Cek apakah email/NIM sudah ada di auth.users
    SELECT id INTO v_user_id FROM auth.users WHERE email = rec.nim || '@alpro.internal';

    -- Jika belum ada, buat UUID baru dan insert ke auth.users
    IF v_user_id IS NULL THEN
      v_user_id := gen_random_uuid();
      
      INSERT INTO auth.users (
        id,
        instance_id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
      ) VALUES (
        v_user_id,
        '00000000-0000-0000-0000-000000000000',
        'authenticated',
        'authenticated',
        rec.nim || '@alpro.internal',
        crypt(rec.nim, gen_salt('bf')), -- Password default = NIM di-hash bcrypt
        now(),
        '{"provider":"email","providers":["email"]}'::jsonb,
        json_build_object('full_name', rec.full_name, 'nim', rec.nim)::jsonb,
        now(),
        now(),
        '',
        '',
        '',
        ''
      );
    END IF;

    -- Insert atau Update profil di public.users
    INSERT INTO public.users (
      id,
      email,
      full_name,
      nim,
      role,
      class_id,
      password_changed,
      created_at
    ) VALUES (
      v_user_id,
      rec.nim || '@alpro.internal',
      rec.full_name,
      rec.nim,
      'mahasiswa',
      v_class_id,
      false, -- Mahasiswa WAJIB ganti password saat pertama kali login
      now()
    )
    ON CONFLICT (id) DO UPDATE SET
      full_name = EXCLUDED.full_name,
      nim = EXCLUDED.nim,
      class_id = COALESCE(public.users.class_id, EXCLUDED.class_id);

  END LOOP;
END $$;
