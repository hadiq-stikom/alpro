-- ==============================================================================
-- MIGRASI PERBAIKAN: QUIZ SUBMISSIONS, VIEWS, DAN LENCANA MAHASISWA
-- ==============================================================================
-- Masalah yang diselesaikan:
-- 1. Penambahan tipe 'essay' pada check constraint quiz_submissions.
-- 2. Memastikan kolom 'ai_feedback' tersedia di tabel quiz_submissions.
-- 3. Memperbaiki view meeting_grades agar TIDAK memfilter 'quiz' (sebelumnya
--    terdapat WHERE qs.quiz_type != 'quiz' yang membuat nilai pilihan ganda
--    dibuang dan lencana tidak muncul).
-- ==============================================================================

-- 1. Perbarui Constraint quiz_type agar mendukung 'essay'
ALTER TABLE public.quiz_submissions 
  DROP CONSTRAINT IF EXISTS quiz_submissions_quiz_type_check;

ALTER TABLE public.quiz_submissions 
  ADD CONSTRAINT quiz_submissions_quiz_type_check 
  CHECK (quiz_type IN ('quiz', 'lab', 'challenge', 'exam', 'essay'));

-- 2. Tambahkan kolom ai_feedback jika belum ada (opsional / pelengkap)
ALTER TABLE public.quiz_submissions 
  ADD COLUMN IF NOT EXISTS ai_feedback TEXT;

-- 3. Perbarui View: meeting_grades (Hapus filter quiz_type != 'quiz')
CREATE OR REPLACE VIEW public.meeting_grades AS
SELECT
  qs.user_id,
  qs.class_id,
  qs.meeting_id,
  ROUND(MAX(qs.score), 2) AS avg_score,
  CASE
    WHEN MAX(qs.score) >= 90 THEN 'A'
    WHEN MAX(qs.score) >= 80 THEN 'AB'
    WHEN MAX(qs.score) >= 70 THEN 'B'
    WHEN MAX(qs.score) >= 65 THEN 'BC'
    WHEN MAX(qs.score) >= 55 THEN 'C'
    WHEN MAX(qs.score) >= 50 THEN 'CD'
    WHEN MAX(qs.score) >= 40 THEN 'D'
    WHEN MAX(qs.score) >= 30 THEN 'DE'
    ELSE 'E'
  END AS grade_letter,
  CASE
    WHEN MAX(qs.score) >= 90 THEN 'Sempurna'
    WHEN MAX(qs.score) >= 70 THEN 'Baik'
    WHEN MAX(qs.score) >= 55 THEN 'Cukup'
    ELSE 'Kurang'
  END AS grade_category
FROM public.quiz_submissions qs
GROUP BY qs.user_id, qs.class_id, qs.meeting_id;

-- 4. Perbarui View: overall_grades
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

-- 5. Perbarui View: class_grades
CREATE OR REPLACE VIEW public.class_grades AS
SELECT
  mg.class_id,
  c.name                       AS class_name,
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
LEFT JOIN public.classes c ON c.id = mg.class_id
GROUP BY mg.class_id, c.name, mg.meeting_id;

-- 6. Hak Akses (Permissions)
GRANT SELECT ON public.meeting_grades TO authenticated, anon;
GRANT SELECT ON public.overall_grades TO authenticated, anon;
GRANT SELECT ON public.class_grades TO authenticated, anon;
