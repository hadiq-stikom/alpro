-- ================================================================
-- SEED DATA MAHASISWA & KELAS DUMMY
-- Digunakan untuk uji coba Fase 2 (Badge) dan Fase 4-5 (Dashboard)
-- ================================================================

-- 1. Bersihkan data dummy (jika sudah ada sebelumnya agar tidak duplikat)
DELETE FROM public.users WHERE email LIKE '%@dummy.com';
DELETE FROM public.classes WHERE name IN ('TI-SP1', 'MI-DP1');

-- 2. Insert Data Kelas
INSERT INTO public.classes (id, name, academic_year, semester, is_active) VALUES
('11111111-1111-1111-1111-111111111111', 'TI-SP1', '2024/2025', 'Ganjil', true),
('22222222-2222-2222-2222-222222222222', 'MI-DP1', '2024/2025', 'Ganjil', true);

-- 3. Insert Data Mahasiswa (Tabel auth.users dan public.users)
-- Membutuhkan ekstensi pgcrypto untuk hash password
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Hapus dari auth.users jika sudah ada
DELETE FROM auth.users WHERE email LIKE '%@alpro.internal';

-- Insert ke auth.users agar bisa login via Supabase Auth
-- Password di-hash dengan Bcrypt sesuai standar Supabase
INSERT INTO auth.users (
  id, instance_id, aud, role, email, encrypted_password, 
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data, 
  created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES
('33333333-3333-3333-3333-333333333331', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '1126100100@alpro.internal', crypt('1126100100', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', ''),
('33333333-3333-3333-3333-333333333332', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '1126100101@alpro.internal', crypt('1126100101', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', ''),
('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '1126100102@alpro.internal', crypt('1126100102', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', ''),
('44444444-4444-4444-4444-444444444441', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '1126100103@alpro.internal', crypt('1126100103', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', ''),
('44444444-4444-4444-4444-444444444442', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', '1126100104@alpro.internal', crypt('1126100104', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', '');

-- Insert ke public.users
INSERT INTO public.users (id, email, full_name, nim, role, class_id) VALUES
-- 3 Mahasiswa TI-SP1
('33333333-3333-3333-3333-333333333331', '1126100100@alpro.internal', 'Budi Santoso', '1126100100', 'mahasiswa', '11111111-1111-1111-1111-111111111111'),
('33333333-3333-3333-3333-333333333332', '1126100101@alpro.internal', 'Andi Wijaya', '1126100101', 'mahasiswa', '11111111-1111-1111-1111-111111111111'),
('33333333-3333-3333-3333-333333333333', '1126100102@alpro.internal', 'Siti Aminah', '1126100102', 'mahasiswa', '11111111-1111-1111-1111-111111111111'),

-- 2 Mahasiswa MI-DP1
('44444444-4444-4444-4444-444444444441', '1126100103@alpro.internal', 'Deni Pratama', '1126100103', 'mahasiswa', '22222222-2222-2222-2222-222222222222'),
('44444444-4444-4444-4444-444444444442', '1126100104@alpro.internal', 'Eka Putri', '1126100104', 'mahasiswa', '22222222-2222-2222-2222-222222222222');

-- 4. (Opsional) Insert Data Quiz Submissions Dummy untuk menguji tampilan lencana
DELETE FROM public.quiz_submissions WHERE user_id IN (
  '33333333-3333-3333-3333-333333333331', '33333333-3333-3333-3333-333333333332', '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444441', '44444444-4444-4444-4444-444444444442'
);

INSERT INTO public.quiz_submissions (user_id, class_id, meeting_id, quiz_type, quiz_key, score, max_score, time_spent_seconds, tab_switches) VALUES
-- Budi: Skor Emas (Sempurna) - 95
('33333333-3333-3333-3333-333333333331', '11111111-1111-1111-1111-111111111111', 1, 'quiz', 'm1-quiz', 95, 100, 300, 0),
-- Andi: Skor Zamrud (Baik) - 75
('33333333-3333-3333-3333-333333333332', '11111111-1111-1111-1111-111111111111', 1, 'quiz', 'm1-quiz', 75, 100, 400, 1),
-- Siti: Skor Langit (Cukup) - 68
('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 1, 'quiz', 'm1-quiz', 68, 100, 450, 2),
-- Deni: Skor Oranye (Kurang) - 52
('44444444-4444-4444-4444-444444444441', '22222222-2222-2222-2222-222222222222', 1, 'quiz', 'm1-quiz', 52, 100, 500, 5),
-- Eka: Skor Abu Gelap (Kurang) - 20
('44444444-4444-4444-4444-444444444442', '22222222-2222-2222-2222-222222222222', 1, 'quiz', 'm1-quiz', 20, 100, 600, 10);
