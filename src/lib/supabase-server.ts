import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Server-side Supabase client menggunakan Service Role Key.
 * HANYA gunakan di API Routes (server-side) — JANGAN import di Client Components!
 * Service Role Key melewati Row Level Security (RLS).
 */
export function createServerClient() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY tidak ditemukan di environment variables. ' +
      'Pastikan .env.local sudah diisi dengan benar.'
    );
  }
  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
