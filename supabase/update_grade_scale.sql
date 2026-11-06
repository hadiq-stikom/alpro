-- ==============================================================================
-- UPDATE SKALA GRADE NILAI WEB-ALPRO (8 TINGKAT RESMI):
-- 90 - 100 = A  (Sempurna)
-- 80 - 89  = AB (Baik)
-- 70 - 79  = B  (Baik)
-- 60 - 69  = BC (Cukup)
-- 50 - 59  = C  (Cukup)
-- 40 - 49  = CD (Kurang)
-- 30 - 39  = D  (Kurang)
-- 0  - 29  = E  (Kurang)
-- ==============================================================================

-- 1. View: meeting_grades
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
    WHEN MAX(qs.score) >= 60 THEN 'BC'
    WHEN MAX(qs.score) >= 50 THEN 'C'
    WHEN MAX(qs.score) >= 40 THEN 'CD'
    WHEN MAX(qs.score) >= 30 THEN 'D'
    ELSE 'E'
  END AS grade_letter,
  CASE
    WHEN MAX(qs.score) >= 90 THEN 'Sempurna'
    WHEN MAX(qs.score) >= 70 THEN 'Baik'
    WHEN MAX(qs.score) >= 50 THEN 'Cukup'
    ELSE 'Kurang'
  END AS grade_category
FROM public.quiz_submissions qs
WHERE qs.quiz_type IN ('essay', 'exam', 'lab', 'challenge')
  AND qs.score > 0
GROUP BY qs.user_id, qs.class_id, qs.meeting_id;

-- 2. View: overall_grades
CREATE OR REPLACE VIEW public.overall_grades AS
SELECT
  user_id,
  class_id,
  ROUND(AVG(avg_score), 2) AS total_avg_score,
  CASE
    WHEN AVG(avg_score) >= 90 THEN 'A'
    WHEN AVG(avg_score) >= 80 THEN 'AB'
    WHEN AVG(avg_score) >= 70 THEN 'B'
    WHEN AVG(avg_score) >= 60 THEN 'BC'
    WHEN AVG(avg_score) >= 50 THEN 'C'
    WHEN AVG(avg_score) >= 40 THEN 'CD'
    WHEN AVG(avg_score) >= 30 THEN 'D'
    ELSE 'E'
  END AS overall_grade_letter,
  CASE
    WHEN AVG(avg_score) >= 90 THEN 'Sempurna'
    WHEN AVG(avg_score) >= 70 THEN 'Baik'
    WHEN AVG(avg_score) >= 50 THEN 'Cukup'
    ELSE 'Kurang'
  END AS overall_grade_category
FROM public.meeting_grades
GROUP BY user_id, class_id;

-- 3. View: class_grades
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
    WHEN AVG(mg.avg_score) >= 60 THEN 'BC'
    WHEN AVG(mg.avg_score) >= 50 THEN 'C'
    WHEN AVG(mg.avg_score) >= 40 THEN 'CD'
    WHEN AVG(mg.avg_score) >= 30 THEN 'D'
    ELSE 'E'
  END AS class_grade_letter
FROM public.meeting_grades mg
LEFT JOIN public.classes c ON c.id = mg.class_id
GROUP BY mg.class_id, c.name, mg.meeting_id;

-- 4. Hak akses
GRANT SELECT ON public.meeting_grades TO authenticated, anon;
GRANT SELECT ON public.overall_grades TO authenticated, anon;
GRANT SELECT ON public.class_grades TO authenticated, anon;

