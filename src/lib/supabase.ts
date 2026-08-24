import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'Supabase URL atau Publishable Key tidak ditemukan. ' +
    'Pastikan .env.local sudah diisi dengan benar.'
  );
}

/**
 * Browser-side Supabase client (menggunakan @supabase/ssr).
 * Menyimpan session di COOKIES (bukan localStorage) sehingga middleware
 * dapat membaca session di server side.
 */
export const supabase = createBrowserClient<Database>(supabaseUrl, supabasePublishableKey);
