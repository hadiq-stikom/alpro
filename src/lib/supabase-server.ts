import { createClient } from '@supabase/supabase-js';
import { createServerClient as createSsrServerClient } from '@supabase/ssr';
import type { NextRequest } from 'next/server';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

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

export interface AuthenticatedSessionContext {
  user: { id: string; email?: string };
  profile: {
    id: string;
    role: 'mahasiswa' | 'dosen';
    full_name: string | null;
    nim: string | null;
    class_id: string | null;
  };
  supabaseAdmin: ReturnType<typeof createServerClient>;
}

/**
 * Memverifikasi sesi login aktif dari cookies request menggunakan @supabase/ssr
 * dan memuat profil peran pengguna (mahasiswa / dosen) dari public.users.
 */
export async function getAuthenticatedSessionUser(
  request: NextRequest
): Promise<AuthenticatedSessionContext | null> {
  if (!supabaseUrl || !supabasePublishableKey) {
    return null;
  }

  const supabaseAuth = createSsrServerClient<Database>(
    supabaseUrl,
    supabasePublishableKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {},
      },
    }
  );

  const {
    data: { user },
    error: authErr,
  } = await supabaseAuth.auth.getUser();

  if (authErr || !user) {
    return null;
  }

  const supabaseAdmin = createServerClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profile, error: profileErr } = await (supabaseAdmin.from('users') as any)
    .select('id, role, full_name, nim, class_id')
    .eq('id', user.id)
    .single();

  if (profileErr || !profile) {
    return null;
  }

  return {
    user: { id: user.id, email: user.email },
    profile,
    supabaseAdmin,
  };
}
