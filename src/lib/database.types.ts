/**
 * Tipe TypeScript untuk skema database Supabase.
 * Dibuat secara manual berdasarkan skema di PROJECT_SPEC.md § 5.
 *
 * Untuk regenerasi otomatis setelah migrasi:
 * npx supabase gen types typescript --project-id <project-id> > src/lib/database.types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type GradeLetter = 'A' | 'AB' | 'B' | 'BC' | 'C' | 'CD' | 'D' | 'DE' | 'E';
export type GradeCategory = 'Sempurna' | 'Baik' | 'Cukup' | 'Kurang';
export type UserRole = 'mahasiswa' | 'dosen';
export type QuizType = 'quiz' | 'lab' | 'challenge' | 'exam';

export interface Database {
  public: {
    Tables: {
      classes: {
        Row: {
          id: string;
          name: string;
          academic_year: string;
          semester: 'Ganjil' | 'Genap';
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          academic_year: string;
          semester?: 'Ganjil' | 'Genap';
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          academic_year?: string;
          semester?: 'Ganjil' | 'Genap';
          is_active?: boolean;
          created_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string | null;
          full_name: string;
          nim: string | null;
          role: UserRole;
          class_id: string | null;
          avatar_url: string | null;
          password_changed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          email?: string | null;
          full_name: string;
          nim?: string | null;
          role?: UserRole;
          class_id?: string | null;
          avatar_url?: string | null;
          password_changed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string;
          nim?: string | null;
          role?: UserRole;
          class_id?: string | null;
          avatar_url?: string | null;
          password_changed?: boolean;
          created_at?: string;
        };
      };
      quiz_submissions: {
        Row: {
          id: string;
          user_id: string;
          class_id: string | null;
          meeting_id: number;
          quiz_type: QuizType;
          quiz_key: string;
          score: number;
          max_score: number;
          answers_json: Json | null;
          time_spent_seconds: number | null;
          tab_switches: number;
          submitted_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          class_id?: string | null;
          meeting_id: number;
          quiz_type: QuizType;
          quiz_key: string;
          score: number;
          max_score?: number;
          answers_json?: Json | null;
          time_spent_seconds?: number | null;
          tab_switches?: number;
          submitted_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          class_id?: string | null;
          meeting_id?: number;
          quiz_type?: QuizType;
          quiz_key?: string;
          score?: number;
          max_score?: number;
          answers_json?: Json | null;
          time_spent_seconds?: number | null;
          tab_switches?: number;
          submitted_at?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      meeting_grades: {
        Row: {
          user_id: string;
          class_id: string | null;
          meeting_id: number;
          avg_score: number;
          grade_letter: GradeLetter;
          grade_category: GradeCategory;
        };
      };
      overall_grades: {
        Row: {
          user_id: string;
          class_id: string | null;
          total_avg_score: number;
          overall_grade_letter: GradeLetter;
          overall_grade_category: GradeCategory;
        };
      };
      class_grades: {
        Row: {
          class_id: string;
          class_name: string;
          meeting_id: number;
          class_avg_score: number;
          student_count: number;
          class_grade_letter: GradeLetter;
        };
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
