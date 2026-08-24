-- ================================================================
-- ROW LEVEL SECURITY (RLS): Web Algoritma & Pemrograman
-- Berdasarkan PROJECT_SPEC.md § 4.1 (Autentikasi)
-- REVISI: Tambah dukungan multi-kelas
--
-- CARA MENJALANKAN:
-- Jalankan SETELAH schema.sql berhasil dieksekusi.
-- ================================================================

-- ----------------------------------------------------------------
-- TABEL: classes
-- ----------------------------------------------------------------

-- Aktifkan RLS
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

-- Policy: Semua user yang login bisa membaca daftar kelas
CREATE POLICY "classes_select_authenticated"
  ON public.classes
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Policy: Hanya dosen yang bisa membuat/mengubah kelas
CREATE POLICY "classes_insert_dosen"
  ON public.classes
  FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'dosen')
  );

CREATE POLICY "classes_update_dosen"
  ON public.classes
  FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'dosen')
  );

-- ----------------------------------------------------------------
-- TABEL: users
-- ----------------------------------------------------------------

-- ----------------------------------------------------------------
-- HELPER FUNCTION: is_dosen()
-- SECURITY DEFINER = bypass RLS saat cek role → tidak rekursif
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_dosen()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'dosen'
  );
$$;

-- ----------------------------------------------------------------
-- TABEL: users
-- ----------------------------------------------------------------

-- Aktifkan RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy: Mahasiswa lihat data sendiri; dosen lihat semua
-- (digabung menjadi 1 policy menggunakan is_dosen() untuk hindari rekursi)
CREATE POLICY "users_select"
  ON public.users
  FOR SELECT
  USING (
    auth.uid() = id
    OR public.is_dosen()
  );

-- Policy: Setiap user bisa update profil dirinya sendiri
CREATE POLICY "users_update_own"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Insert hanya oleh service role (dosen input NIM mahasiswa via API)
-- (Tidak ada policy INSERT untuk anon/authenticated — hanya service role yang bisa)

-- ----------------------------------------------------------------
-- TABEL: quiz_submissions
-- ----------------------------------------------------------------

-- Aktifkan RLS
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Mahasiswa lihat submission sendiri; dosen lihat semua
CREATE POLICY "submissions_select"
  ON public.quiz_submissions
  FOR SELECT
  USING (
    auth.uid() = user_id
    OR public.is_dosen()
  );

-- Policy: Mahasiswa bisa membuat submission untuk dirinya sendiri
CREATE POLICY "submissions_insert_own"
  ON public.quiz_submissions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Mahasiswa TIDAK bisa mengubah submission yang sudah ada (immutable)
-- (Tidak ada policy UPDATE untuk submissions)

-- ----------------------------------------------------------------
-- VIEW: meeting_grades, overall_grades, class_grades
-- Views otomatis mengikuti RLS tabel underlying-nya (quiz_submissions).
-- Tidak perlu policy tambahan.
-- ----------------------------------------------------------------
