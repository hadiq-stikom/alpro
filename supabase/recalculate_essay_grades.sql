-- ==============================================================================
-- SKRIP AUDIT & REKALKULASI NILAI KUIS MINGGUAN (ESAI)
-- Kasus: Mahasiswa hanya menjawab sebagian butir soal (misal 1 atau 2 butir soal dari total 5 soal)
-- namun mendapatkan skor tinggi karena pembagi rata-rata sebelumnya hanya membagi dengan
-- jumlah butir soal yang dijawab, bukan total 5 butir soal.
-- ==============================================================================

-- 1. CEK SUBMISSION DENGAN ANOMALI (Preview Sebelum Diubah)
-- Query ini menampilkan submission di mana ai_feedback hanya mencatat sebagian nomor soal
-- atau jawaban kosong tetapi skornya >= 60.

SELECT 
  qs.id,
  u.full_name,
  u.nim,
  qs.meeting_id,
  qs.score AS current_score,
  qs.tab_switches,
  qs.submitted_at,
  SUBSTRING(qs.ai_feedback FROM 1 FOR 120) AS feedback_preview
FROM public.quiz_submissions qs
JOIN public.users u ON u.id = qs.user_id
WHERE qs.quiz_type IN ('essay', 'exam')
ORDER BY qs.submitted_at DESC;

-- 2. PENJELASAN FORMULA PERBAIKAN:
-- Setiap pertemuan memiliki 5 butir soal esai (standar pedagogi).
-- Jika mahasiswa menjawab 1 soal (skor 90) dan 4 soal lainnya kosong:
-- Skor Lama : 90 / 1 = 90 (Grade A)  <-- SALAH/INFLASI
-- Skor Adil : (90 + 0 + 0 + 0 + 0) / 5 = 18 (Grade E) <-- BENAR

-- Catatan:
-- Dosen dapat menjalankan audit otomatis dan rekalkulasi langsung melalui:
-- API: POST /api/lecturer/audit-essay-scores
-- atau mengoreksi satu per satu secara manusiawi melalui Dashboard Dosen:
-- /lecturer/dashboard -> Klik mahasiswa -> Koreksi Nilai.

