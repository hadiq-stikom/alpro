import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Proxy Next.js: Proteksi route berbasis role.
 * Menggunakan @supabase/ssr untuk membaca session dari cookies.
 *
 * Rute yang dilindungi:
 * - /student/* → hanya role 'mahasiswa'
 * - /lecturer/* → hanya role 'dosen'
 * - /change-password → hanya user yang sudah login
 * - /login → redirect ke dashboard jika sudah login
 *
 * Catatan: Di Next.js 16.x, file ini menggantikan middleware.ts
 */

const LOGIN_PATH = '/login';
const CHANGE_PASSWORD_PATH = '/change-password';

type UserProfile = {
  role: 'mahasiswa' | 'dosen';
  password_changed: boolean;
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({ request });

  // Buat Supabase SSR client yang baca/tulis session dari cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Gunakan getUser() bukan getSession() untuk validasi server-side yang aman
  const { data: { user } } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  // ---- Halaman login: redirect ke dashboard jika sudah login ----
  if (pathname === LOGIN_PATH || pathname.startsWith('/login')) {
    if (isLoggedIn) {
      const { data } = await supabase
        .from('users')
        .select('role, password_changed')
        .eq('id', user.id)
        .single();

      const profile = data as UserProfile | null;

      if (profile) {
        if (!profile.password_changed) {
          return NextResponse.redirect(new URL(CHANGE_PASSWORD_PATH, request.url));
        }
        const dest = profile.role === 'dosen' ? '/lecturer/dashboard' : '/student/dashboard';
        return NextResponse.redirect(new URL(dest, request.url));
      }
    }
    return response;
  }

  // ---- Halaman change-password ----
  if (pathname === CHANGE_PASSWORD_PATH) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    }
    return response;
  }

  // ---- Routes yang memerlukan autentikasi ----
  if (pathname.startsWith('/student') || pathname.startsWith('/lecturer')) {
    if (!isLoggedIn) {
      const loginUrl = new URL(LOGIN_PATH, request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const { data } = await supabase
      .from('users')
      .select('role, password_changed')
      .eq('id', user.id)
      .single();

    const profile = data as UserProfile | null;

    if (!profile) {
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    }

    // Paksa ganti password jika belum
    if (!profile.password_changed) {
      return NextResponse.redirect(new URL(CHANGE_PASSWORD_PATH, request.url));
    }

    // Cek role mismatch
    if (pathname.startsWith('/student') && profile.role !== 'mahasiswa') {
      return NextResponse.redirect(new URL('/lecturer/dashboard', request.url));
    }
    if (pathname.startsWith('/lecturer') && profile.role !== 'dosen') {
      return NextResponse.redirect(new URL('/student/dashboard', request.url));
    }

    return response;
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};
