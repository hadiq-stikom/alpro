"use client";

import React, { useState, useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import type { Variants } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Eye, EyeOff, LogIn, AlertCircle, Moon, Sun, Code2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/components/ThemeProvider";

// ----------------------------------------------------------------
// Animasi
// ----------------------------------------------------------------
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

// ----------------------------------------------------------------
// Komponen utama
// ----------------------------------------------------------------
export default function LoginPage() {
  const router              = useRouter();
  const { signIn, profile, loading: authLoading } = useAuth();
  const { theme, setTheme } = useTheme();

  const [nim, setNim]               = useState("");
  const [password, setPassword]     = useState("");
  const [showPass, setShowPass]     = useState(false);
  const [error, setError]           = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted]       = useState(false);

  const nimId  = useId();
  const passId = useId();

  useEffect(() => { setMounted(true); }, []);

  // Redirect jika sudah login
  useEffect(() => {
    if (!authLoading && profile) {
      if (!profile.password_changed) {
        router.replace("/change-password");
      } else if (profile.role === "dosen") {
        router.replace("/lecturer/dashboard");
      } else {
        router.replace("/student/dashboard");
      }
    }
  }, [authLoading, profile, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nim.trim()) {
      setError("NIM tidak boleh kosong.");
      return;
    }
    if (!password) {
      setError("Password tidak boleh kosong.");
      return;
    }

    setIsSubmitting(true);
    const { error: authError } = await signIn(nim.trim(), password);
    setIsSubmitting(false);

    if (authError) {
      setError(authError);
    }
    // Jika berhasil, useEffect di atas akan handle redirect
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#09090b] selection:bg-primary/30">
      {/* ---- Latar belakang: gradient + grid ---- */}
      <div className="absolute inset-0 -z-10">
        {/* Radial gradient biru-indigo di tengah */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(139,92,246,0.10) 0%, transparent 60%)",
          }}
        />
        {/* Grid halus */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ---- Toggle Theme (pojok kanan atas) ---- */}
      {mounted && (
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Toggle tema"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      )}

      {/* ---- Card Login ---- */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md mx-4"
      >
        {/* Glow effect di balik card */}
        <div
          className="absolute -inset-px rounded-2xl opacity-60 blur-xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.4) 0%, rgba(139,92,246,0.2) 100%)",
          }}
        />

        <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Garis aksen atas */}
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(99,102,241,0.8) 30%, rgba(139,92,246,0.8) 70%, transparent)",
            }}
          />

          <div className="px-8 py-10">
            {/* ---- Header ---- */}
            <motion.div variants={fadeUp} custom={0} className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-5 shadow-lg shadow-primary/10">
                <GraduationCap className="h-8 w-8 text-primary" style={{ color: "#6366f1" }} />
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">Selamat Datang</h1>
              <p className="text-sm text-white/50">
                Algoritma &amp; Pemrograman &mdash; TI-101
              </p>
            </motion.div>

            {/* ---- Pesan Error (prominent di atas form) ---- */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 flex items-start gap-3"
                  role="alert"
                  id="login-error-message"
                >
                  <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-300">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ---- Form ---- */}
            <motion.form
              variants={fadeUp}
              custom={1}
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >
              {/* NIM */}
              <div>
                <label
                  htmlFor={nimId}
                  className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2"
                >
                  NIM / Email
                </label>
                <input
                  id={nimId}
                  type="text"
                  autoComplete="username"
                  placeholder="NIM mahasiswa atau email dosen"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/20 text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/40
                    disabled:opacity-50 transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor={passId}
                  className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id={passId}
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Password Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-11 text-white placeholder:text-white/20 text-sm
                      focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/40
                      disabled:opacity-50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    aria-label={showPass ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="mt-1.5 text-xs text-white/30">
                  Login pertama: gunakan NIM sebagai password awal.
                </p>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting || authLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold text-white
                  transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%)",
                  boxShadow: "0 0 30px rgba(99,102,241,0.3), 0 4px 16px rgba(99,102,241,0.2)",
                }}
                id="login-submit-button"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Memverifikasi...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Masuk
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>

          {/* ---- Footer card ---- */}
          <div className="border-t border-white/5 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/30">
              <Code2 className="h-3.5 w-3.5" />
              <span className="text-xs">Hadiq, ST, M.Kom</span>
            </div>
            <span className="text-xs text-white/20">TI-101 • Semester Ganjil</span>
          </div>
        </div>
      </motion.div>

      {/* ---- Dekorasi pojok kiri bawah ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="fixed bottom-6 left-6 text-white/10 text-[10px] font-mono"
      >
        alpro.v1.auth
      </motion.div>
    </div>
  );
}
