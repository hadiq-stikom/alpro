-- ================================================================
-- TABEL & SKEMA: PRAKTIKUM SUBMISSIONS & DIGITAL SIGNATURE
-- Mata Kuliah: Praktikum Algoritma & Pemrograman (1 SKS)
-- Terpisah secara independen dari Mata Kuliah Teori/Proyek (3 SKS)
--
-- CARA MENJALANKAN:
-- 1. Buka https://app.supabase.com → Project Anda
-- 2. Pergi ke SQL Editor
-- 3. Paste seluruh isi file ini, lalu klik "Run"
-- ================================================================

-- 1. Tambah kolom stored_signature di tabel users jika belum ada
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS stored_signature TEXT;

COMMENT ON COLUMN public.users.stored_signature IS 'Data URL gambar tanda tangan digital yang tersimpan (PNG base64)';

-- 2. Buat tabel praktikum_submissions
CREATE TABLE IF NOT EXISTS public.praktikum_submissions (
  id                  UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID         NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  class_id            UUID         REFERENCES public.classes(id) ON DELETE SET NULL,
  module_id           INTEGER      NOT NULL CHECK (module_id BETWEEN 1 AND 16),
  student_name        TEXT,
  student_nim         TEXT,
  student_class       TEXT,
  lab_date            TEXT,
  observations        JSONB        NOT NULL DEFAULT '[]'::jsonb,
  analisis_answers    JSONB        NOT NULL DEFAULT '[]'::jsonb,
  kesimpulan_text     TEXT         NOT NULL DEFAULT '',
  telemetry           JSONB        DEFAULT '{}'::jsonb, 
  ai_evaluation       JSONB        DEFAULT '{}'::jsonb,
  student_signature   TEXT,        
  student_signed_at   TIMESTAMPTZ,
  status              TEXT         NOT NULL DEFAULT 'draft' 
                                   CHECK (status IN ('draft', 'diajukan', 'perlu_revisi', 'disetujui')),
  lecturer_feedback   TEXT,
  lecturer_score      NUMERIC(5,2) CHECK (lecturer_score IS NULL OR (lecturer_score BETWEEN 0 AND 100)),
  lecturer_signature  TEXT,        
  lecturer_signed_at  TIMESTAMPTZ,
  created_at          TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ  NOT NULL DEFAULT now(),
  CONSTRAINT uq_praktikum_user_module UNIQUE (user_id, module_id)
);

COMMENT ON TABLE  public.praktikum_submissions IS 'Laporan resmi pelaksanaan praktikum laboratorium algoritma & pemrograman';
COMMENT ON COLUMN public.praktikum_submissions.observations IS 'Tabel C: Array hasil pengamatan workbench';
COMMENT ON COLUMN public.praktikum_submissions.analisis_answers IS 'Bagian D: Jawaban analisis komparatif';
COMMENT ON COLUMN public.praktikum_submissions.kesimpulan_text IS 'Bagian E: Kesimpulan ilmiah mahasiswa';
COMMENT ON COLUMN public.praktikum_submissions.telemetry IS 'Metrik ketikan (WPM, backspace ratio, burst, waktu pengerjaan)';
COMMENT ON COLUMN public.praktikum_submissions.ai_evaluation IS 'Hasil telaah Sokratik AI & Indeks Keaslian vs Baseline Chat';
COMMENT ON COLUMN public.praktikum_submissions.student_signature IS 'Tanda tangan digital mahasiswa praktikan';
COMMENT ON COLUMN public.praktikum_submissions.lecturer_signature IS 'Tanda tangan digital resmi dosen pengesah (Hadiq, ST, M.Kom)';
COMMENT ON COLUMN public.praktikum_submissions.lecturer_score IS 'Skor resmi akhir dari Dosen (0-100)';

-- Index untuk kecepatan query
CREATE INDEX IF NOT EXISTS idx_praktikum_submissions_user_id ON public.praktikum_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_praktikum_submissions_module_id ON public.praktikum_submissions(module_id);
CREATE INDEX IF NOT EXISTS idx_praktikum_submissions_status ON public.praktikum_submissions(status);
CREATE INDEX IF NOT EXISTS idx_praktikum_submissions_class_id ON public.praktikum_submissions(class_id);

-- RLS Policies agar aman namun tetap bisa diakses frontend
ALTER TABLE public.praktikum_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Akses publik baca praktikum_submissions" ON public.praktikum_submissions;
CREATE POLICY "Akses publik baca praktikum_submissions" 
ON public.praktikum_submissions FOR SELECT 
TO authenticated, anon 
USING (true);

DROP POLICY IF EXISTS "Akses modifikasi praktikum_submissions" ON public.praktikum_submissions;
CREATE POLICY "Akses modifikasi praktikum_submissions" 
ON public.praktikum_submissions FOR ALL 
TO authenticated, anon 
USING (true) 
WITH CHECK (true);
