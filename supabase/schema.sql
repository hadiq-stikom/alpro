-- ================================================================
-- SKEMA DATABASE: Web Algoritma & Pemrograman
-- Berdasarkan PROJECT_SPEC.md § 5
-- REVISI: Tambah dukungan multi-kelas
--
-- CARA MENJALANKAN:
-- 1. Buka https://app.supabase.com → Project Anda
-- 2. Pergi ke SQL Editor
-- 3. Paste seluruh isi file ini, lalu klik "Run"
-- ================================================================

-- ----------------------------------------------------------------
-- 1. Tabel: classes (kelas / rombongan belajar)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.classes (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT        NOT NULL,                    -- contoh: "TI-A 2024", "TI-B 2024"
  academic_year TEXT       NOT NULL,                    -- contoh: "2024/2025"
  semester     TEXT        NOT NULL DEFAULT 'Ganjil'
                           CHECK (semester IN ('Ganjil', 'Genap')),
  is_active    BOOLEAN     NOT NULL DEFAULT true,       -- kelas aktif atau arsip
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE  public.classes IS 'Rombongan belajar — satu matkul bisa punya beberapa kelas paralel';
COMMENT ON COLUMN public.classes.name IS 'Nama kelas, contoh: TI-2024-A, TI-2024-B';
COMMENT ON COLUMN public.classes.is_active IS 'true = semester berjalan, false = kelas diarsipkan';

-- ----------------------------------------------------------------
-- 2. Tabel: users
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.users (
  id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  email            TEXT         UNIQUE,
  full_name        TEXT         NOT NULL,
  nim              TEXT         UNIQUE,
  role             TEXT         NOT NULL CHECK (role IN ('mahasiswa', 'dosen')) DEFAULT 'mahasiswa',
  class_id         UUID         REFERENCES public.classes(id) ON DELETE SET NULL,  -- NULL = dosen atau belum ada kelas
  avatar_url       TEXT,
  password_changed BOOLEAN      NOT NULL DEFAULT false,
  created_at       TIMESTAMPTZ  NOT NULL DEFAULT now()
);

COMMENT ON TABLE  public.users IS 'Profil pengguna — terhubung ke Supabase Auth via id (UUID sama dengan auth.users.id)';
COMMENT ON COLUMN public.users.nim IS 'Nomor Induk Mahasiswa — digunakan sebagai username login';
COMMENT ON COLUMN public.users.class_id IS 'Kelas mahasiswa (NULL untuk dosen)';
COMMENT ON COLUMN public.users.password_changed IS 'false = login pertama, belum ganti password; true = sudah ganti password';

-- Index untuk query per kelas
CREATE INDEX IF NOT EXISTS idx_users_class_id ON public.users(class_id);

-- ----------------------------------------------------------------
-- 3. Tabel: quiz_submissions
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.quiz_submissions (
  id                   UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID         NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  class_id             UUID         REFERENCES public.classes(id) ON DELETE SET NULL,  -- denormalized untuk query cepat
  meeting_id           INTEGER      NOT NULL CHECK (meeting_id BETWEEN 1 AND 16),
  quiz_type            TEXT         NOT NULL CHECK (quiz_type IN ('quiz', 'lab', 'challenge', 'exam')),
  quiz_key             TEXT         NOT NULL,
  score                NUMERIC(5,2) NOT NULL CHECK (score BETWEEN 0 AND 100),
  max_score            NUMERIC(5,2) NOT NULL DEFAULT 100,
  answers_json         JSONB,
  time_spent_seconds   INTEGER,
  tab_switches         INTEGER      NOT NULL DEFAULT 0,
  submitted_at         TIMESTAMPTZ  NOT NULL DEFAULT now(),
  created_at           TIMESTAMPTZ  NOT NULL DEFAULT now()
);

COMMENT ON TABLE  public.quiz_submissions IS 'Rekaman setiap submission kuis, lab, atau tantangan kode';
COMMENT ON COLUMN public.quiz_submissions.class_id IS 'Denormalized dari users.class_id untuk mempercepat query analitik per kelas';
COMMENT ON COLUMN public.quiz_submissions.quiz_key IS 'Identifier unik asesmen (contoh: p1-kuis-1, p3-lab-flowchart)';
COMMENT ON COLUMN public.quiz_submissions.tab_switches IS 'Jumlah kali mahasiswa keluar tab saat mengerjakan asesmen (anti-AI Layer 4)';

-- Index untuk query dashboard
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_user_id      ON public.quiz_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_class_id     ON public.quiz_submissions(class_id);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_meeting_id   ON public.quiz_submissions(meeting_id);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_user_meeting ON public.quiz_submissions(user_id, meeting_id);
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_class_meeting ON public.quiz_submissions(class_id, meeting_id);

-- ----------------------------------------------------------------
-- 4. View: meeting_grades
--    Rata-rata nilai per pertemuan per mahasiswa + grade letter
-- ----------------------------------------------------------------
CREATE OR REPLACE VIEW public.meeting_grades AS
SELECT
  qs.user_id,
  qs.class_id,
  qs.meeting_id,
  ROUND(AVG(qs.score), 2) AS avg_score,
  CASE
    WHEN AVG(qs.score) >= 90 THEN 'A'
    WHEN AVG(qs.score) >= 80 THEN 'AB'
    WHEN AVG(qs.score) >= 70 THEN 'B'
    WHEN AVG(qs.score) >= 65 THEN 'BC'
    WHEN AVG(qs.score) >= 55 THEN 'C'
    WHEN AVG(qs.score) >= 50 THEN 'CD'
    WHEN AVG(qs.score) >= 40 THEN 'D'
    WHEN AVG(qs.score) >= 30 THEN 'DE'
    ELSE 'E'
  END AS grade_letter,
  CASE
    WHEN AVG(qs.score) >= 90 THEN 'Sempurna'
    WHEN AVG(qs.score) >= 70 THEN 'Baik'
    WHEN AVG(qs.score) >= 55 THEN 'Cukup'
    ELSE 'Kurang'
  END AS grade_category
FROM public.quiz_submissions qs
GROUP BY qs.user_id, qs.class_id, qs.meeting_id;

-- ----------------------------------------------------------------
-- 5. View: overall_grades
--    Rata-rata keseluruhan per mahasiswa
-- ----------------------------------------------------------------
CREATE OR REPLACE VIEW public.overall_grades AS
SELECT
  user_id,
  class_id,
  ROUND(AVG(avg_score), 2) AS total_avg_score,
  CASE
    WHEN AVG(avg_score) >= 90 THEN 'A'
    WHEN AVG(avg_score) >= 80 THEN 'AB'
    WHEN AVG(avg_score) >= 70 THEN 'B'
    WHEN AVG(avg_score) >= 65 THEN 'BC'
    WHEN AVG(avg_score) >= 55 THEN 'C'
    WHEN AVG(avg_score) >= 50 THEN 'CD'
    WHEN AVG(avg_score) >= 40 THEN 'D'
    WHEN AVG(avg_score) >= 30 THEN 'DE'
    ELSE 'E'
  END AS overall_grade_letter,
  CASE
    WHEN AVG(avg_score) >= 90 THEN 'Sempurna'
    WHEN AVG(avg_score) >= 70 THEN 'Baik'
    WHEN AVG(avg_score) >= 55 THEN 'Cukup'
    ELSE 'Kurang'
  END AS overall_grade_category
FROM public.meeting_grades
GROUP BY user_id, class_id;

-- ----------------------------------------------------------------
-- 6. View: class_grades
--    Rata-rata nilai per kelas per pertemuan (untuk dashboard dosen)
-- ----------------------------------------------------------------
CREATE OR REPLACE VIEW public.class_grades AS
SELECT
  mg.class_id,
  c.name          AS class_name,
  mg.meeting_id,
  ROUND(AVG(mg.avg_score), 2)  AS class_avg_score,
  COUNT(DISTINCT mg.user_id)   AS student_count,
  CASE
    WHEN AVG(mg.avg_score) >= 90 THEN 'A'
    WHEN AVG(mg.avg_score) >= 80 THEN 'AB'
    WHEN AVG(mg.avg_score) >= 70 THEN 'B'
    WHEN AVG(mg.avg_score) >= 65 THEN 'BC'
    WHEN AVG(mg.avg_score) >= 55 THEN 'C'
    WHEN AVG(mg.avg_score) >= 50 THEN 'CD'
    WHEN AVG(mg.avg_score) >= 40 THEN 'D'
    WHEN AVG(mg.avg_score) >= 30 THEN 'DE'
    ELSE 'E'
  END AS class_grade_letter
FROM public.meeting_grades mg
JOIN public.classes c ON c.id = mg.class_id
GROUP BY mg.class_id, c.name, mg.meeting_id;
