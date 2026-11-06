-- ==============================================================================
-- MIGRASI BASIS DATA: DUKUNGAN RESMI INPUT NILAI UTS & UAS (5 ASPEK PENILAIAN)
-- ==============================================================================
-- Fitur:
-- 1. Menjamin 'exam' terdaftar di constraint quiz_type pada public.quiz_submissions
-- 2. Menambahkan Unique Constraint Partial untuk mencegah duplikasi nilai ujian
-- 3. Menambahkan Index GIN pada answers_json untuk query analitik berkecepatan tinggi
-- 4. Menambahkan View khusus exam_grades_overview untuk rekap langsung di SQL Editor
-- 5. Menambahkan RLS Policy UPDATE untuk Dosen Pengampu
-- ==============================================================================

-- 1. Pastikan Constraint quiz_type mendukung 'exam'
ALTER TABLE public.quiz_submissions 
  DROP CONSTRAINT IF EXISTS quiz_submissions_quiz_type_check;

ALTER TABLE public.quiz_submissions 
  ADD CONSTRAINT quiz_submissions_quiz_type_check 
  CHECK (quiz_type IN ('quiz', 'lab', 'challenge', 'exam', 'essay'));

-- 2. Unique Index Partial: 1 Mahasiswa hanya memiliki tepat 1 nilai ujian per pertemuan ujian
--    (Meeting 8 = UTS, Meeting 16 = UAS)
CREATE UNIQUE INDEX IF NOT EXISTS uq_quiz_submissions_exam_per_meeting
  ON public.quiz_submissions (user_id, meeting_id)
  WHERE quiz_type = 'exam';

-- 3. Index GIN untuk pencarian dan filter cepat di dalam JSON aspek penilaian
CREATE INDEX IF NOT EXISTS idx_quiz_submissions_answers_json_gin
  ON public.quiz_submissions USING gin (answers_json);

-- 4. View Analitik Lengkap Ujian (UTS & UAS)
CREATE OR REPLACE VIEW public.exam_grades_overview AS
SELECT
  qs.id                                                         AS submission_id,
  qs.user_id,
  u.nim,
  u.full_name,
  u.class_id,
  c.name                                                        AS class_name,
  qs.meeting_id,
  CASE WHEN qs.meeting_id = 8 THEN 'UTS' ELSE 'UAS' END         AS exam_type,
  ROUND(qs.score, 2)                                            AS final_score,
  
  -- Ekstraksi Nilai 5 Aspek dari JSONB
  COALESCE((qs.answers_json->'aspect_scores'->>'penyerapan_materi')::NUMERIC, 0)   AS penyerapan_materi,
  COALESCE((qs.answers_json->'aspect_scores'->>'pemahaman_konsep')::NUMERIC, 0)    AS pemahaman_konsep,
  COALESCE((qs.answers_json->'aspect_scores'->>'kemampuan_menjelaskan')::NUMERIC, 0) AS kemampuan_menjelaskan,
  COALESCE((qs.answers_json->'aspect_scores'->>'implementasi_algoritma')::NUMERIC, 0) AS implementasi_algoritma,
  COALESCE((qs.answers_json->'aspect_scores'->>'implementasi_kode')::NUMERIC, 0)     AS implementasi_kode,
  
  -- Ekstraksi Bobot Persentase
  COALESCE((qs.answers_json->'weights'->>'penyerapan_materi')::NUMERIC, 20)        AS weight_penyerapan,
  COALESCE((qs.answers_json->'weights'->>'pemahaman_konsep')::NUMERIC, 20)         AS weight_konsep,
  COALESCE((qs.answers_json->'weights'->>'kemampuan_menjelaskan')::NUMERIC, 20)    AS weight_penjelasan,
  COALESCE((qs.answers_json->'weights'->>'implementasi_algoritma')::NUMERIC, 20)   AS weight_algoritma,
  COALESCE((qs.answers_json->'weights'->>'implementasi_kode')::NUMERIC, 20)        AS weight_kode,
  
  -- Grade & Catatan Evaluasi Dosen
  qs.answers_json->>'grade_letter'                              AS grade_letter,
  qs.answers_json->>'grade_category'                            AS grade_category,
  qs.answers_json->>'notes'                                     AS lecturer_notes,
  qs.answers_json->>'graded_by'                                 AS graded_by,
  qs.submitted_at
FROM public.quiz_submissions qs
JOIN public.users u ON u.id = qs.user_id
LEFT JOIN public.classes c ON c.id = u.class_id
WHERE qs.quiz_type = 'exam';

-- 5. Hak Akses View
GRANT SELECT ON public.exam_grades_overview TO authenticated, anon;

-- 6. Policy RLS: Pastikan Dosen dapat mengupdate submission (jika diakses via direct client)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'quiz_submissions' 
      AND policyname = 'submissions_update_dosen'
  ) THEN
    CREATE POLICY "submissions_update_dosen"
      ON public.quiz_submissions
      FOR UPDATE
      USING (public.is_dosen())
      WITH CHECK (public.is_dosen());
  END IF;
END $$;

