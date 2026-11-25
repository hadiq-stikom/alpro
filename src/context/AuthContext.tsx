"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

type UserProfile = Database["public"]["Tables"]["users"]["Row"];

// ----------------------------------------------------------------
// Tipe Context
// ----------------------------------------------------------------
interface AuthContextValue {
  /** User dari Supabase Auth (berisi email, id, dll) */
  user: User | null;
  /** Profil dari tabel public.users (berisi nim, full_name, role, dll) */
  profile: UserProfile | null;
  /** Session aktif */
  session: Session | null;
  /** true saat sedang memuat state awal */
  loading: boolean;
  /**
   * Login menggunakan NIM sebagai username.
   * Secara internal, NIM dikonversi ke format email internal: nim@alpro.internal
   */
  signIn: (nim: string, password: string) => Promise<{ error: string | null }>;
  /** Logout */
  signOut: () => Promise<void>;
  /**
   * Ganti password (digunakan pada halaman change-password).
   * Setelah berhasil, update kolom password_changed = true.
   */
  changePassword: (newPassword: string) => Promise<{ error: string | null }>;
  /** Reload profil dari database */
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ----------------------------------------------------------------
// Utilitas: NIM → email internal
// ----------------------------------------------------------------
/**
 * Konversi input login ke format email Supabase:
 * - Jika sudah berformat email (ada @) → gunakan langsung (untuk dosen dengan email asli)
 * - Jika berupa NIM (tanpa @) → tambahkan @alpro.internal (untuk mahasiswa)
 */
function resolveEmail(input: string): string {
  const trimmed = input.trim().toLowerCase();
  return trimmed.includes('@') ? trimmed : `${trimmed}@alpro.internal`;
}

// ----------------------------------------------------------------
// Provider
// ----------------------------------------------------------------
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Ambil profil dari tabel users
  const fetchProfile = useCallback(async (userId: string): Promise<UserProfile | null> => {
    try {
      console.log("[AuthContext] fetchProfile userId:", userId);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("[AuthContext] ❌ Gagal ambil profil:", error.code, error.message, error.details);
        setProfile(null);
        return null;
      } else {
        console.log("[AuthContext] ✅ Profil ditemukan:", data);
        setProfile(data);
        return data;
      }
    } catch (err) {
      console.error("[AuthContext] Exception saat fetchProfile:", err);
      setProfile(null);
      return null;
    }
  }, []);

  // Inisialisasi: cek session yang sudah ada (tahan gagal & timeout agar loading tidak pernah macet)
  useEffect(() => {
    let isMounted = true;
    const safetyTimer = setTimeout(() => {
      if (isMounted) {
        console.warn("[AuthContext] Init auth timeout fallback — melepas status loading.");
        setLoading(false);
      }
    }, 4500);

    async function initAuth() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (!isMounted) return;
        if (error) {
          console.warn("[AuthContext] getSession error:", error.message);
        }
        setSession(session ?? null);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error("[AuthContext] Exception saat getSession:", err);
        if (isMounted) {
          setSession(null);
          setUser(null);
          setProfile(null);
        }
      } finally {
        clearTimeout(safetyTimer);
        if (isMounted) setLoading(false);
      }
    }

    initAuth();

    // Dengarkan perubahan auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, nextSession) => {
        if (!isMounted) return;
        setSession(nextSession ?? null);
        setUser(nextSession?.user ?? null);
        if (nextSession?.user) {
          await fetchProfile(nextSession.user.id);
        } else {
          setProfile(null);
        }
        if (isMounted) setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  // ----------------------------------------------------------------
  // signIn
  // ----------------------------------------------------------------
  const signIn = useCallback(
    async (nim: string, password: string): Promise<{ error: string | null }> => {
      try {
        const email = resolveEmail(nim);
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            return { error: "NIM atau password salah. Coba lagi." };
          }
          return { error: error.message };
        }

        if (data?.session) {
          setSession(data.session);
          setUser(data.user ?? null);
        }
        if (data?.user) {
          const loadedProfile = await fetchProfile(data.user.id);
          if (!loadedProfile) {
            setLoading(false);
            return { error: "Login berhasil, tetapi data profil tidak dapat dimuat dari tabel users." };
          }
        }
        setLoading(false);
        return { error: null };
      } catch (err: any) {
        return { error: err?.message || "Terjadi kesalahan jaringan saat mencoba masuk." };
      }
    },
    [fetchProfile]
  );

  // ----------------------------------------------------------------
  // signOut
  // ----------------------------------------------------------------
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
  }, []);

  // ----------------------------------------------------------------
  // changePassword
  // ----------------------------------------------------------------
  const changePassword = useCallback(
    async (newPassword: string): Promise<{ error: string | null }> => {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) return { error: error.message };

      // Update flag password_changed di tabel users
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const supabaseAny = supabase as any;
        const { error: updateError } = await supabaseAny
          .from("users")
          .update({ password_changed: true })
          .eq("id", user.id);

        if (updateError) {
          console.error("[AuthContext] Gagal update password_changed:", updateError.message);
        } else {
          // Refresh profil lokal
          setProfile((prev) => prev ? { ...prev, password_changed: true } : prev);
        }
      }

      return { error: null };
    },
    [user]
  );

  // ----------------------------------------------------------------
  // refreshProfile
  // ----------------------------------------------------------------
  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user.id);
  }, [user, fetchProfile]);

  return (
    <AuthContext.Provider
      value={{ user, profile, session, loading, signIn, signOut, changePassword, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ----------------------------------------------------------------
// Hook
// ----------------------------------------------------------------
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth harus digunakan di dalam <AuthProvider>.");
  }
  return ctx;
}
