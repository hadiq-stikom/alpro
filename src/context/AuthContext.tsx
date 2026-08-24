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
  const fetchProfile = useCallback(async (userId: string) => {
    console.log("[AuthContext] fetchProfile userId:", userId);
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("[AuthContext] ❌ Gagal ambil profil:", error.code, error.message, error.details);
      setProfile(null);
    } else {
      console.log("[AuthContext] ✅ Profil ditemukan:", data);
      setProfile(data);
    }
  }, []);

  // Inisialisasi: cek session yang sudah ada
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // Dengarkan perubahan auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  // ----------------------------------------------------------------
  // signIn
  // ----------------------------------------------------------------
  const signIn = useCallback(
    async (nim: string, password: string): Promise<{ error: string | null }> => {
      const email = resolveEmail(nim);
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          return { error: "NIM atau password salah. Coba lagi." };
        }
        return { error: error.message };
      }
      return { error: null };
    },
    []
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
