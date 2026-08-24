"use client";

import React, { useState, useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import type { Variants } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Eye, EyeOff, AlertCircle, CheckCircle2, KeyRound } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" },
  }),
};

// Validasi password
function validatePassword(password: string, nim: string): string | null {
  if (password.length < 8) return "Password minimal 8 karakter.";
  if (password.toLowerCase() === nim.toLowerCase()) return "Password tidak boleh sama dengan NIM Anda.";
  return null;
}

export default function ChangePasswordPage() {
  const router = useRouter();
  const { profile, user, changePassword, loading: authLoading } = useAuth();

  const [newPassword, setNewPassword]     = useState("");
  const [confirmPass, setConfirmPass]     = useState("");
  const [showNew, setShowNew]             = useState(false);
  const [showConfirm, setShowConfirm]     = useState(false);
  const [error, setError]                 = useState<string | null>(null);
  const [success, setSuccess]             = useState(false);
  const [isSubmitting, setIsSubmitting]   = useState(false);

  const newPassId  = useId();
  const confPassId = useId();

  // Redirect jika bukan pengguna yang perlu ganti password
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
    if (!authLoading && profile?.password_changed) {
      // Sudah ganti password, arahkan ke dashboard
      if (profile.role === "dosen") {
        router.replace("/lecturer/dashboard");
      } else {
        router.replace("/student/dashboard");
      }
    }
  }, [authLoading, user, profile, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const nim = profile?.nim ?? "";

    const validationError = validatePassword(newPassword, nim);
    if (validationError) { setError(validationError); return; }

    if (newPassword !== confirmPass) {
      setError("Konfirmasi password tidak cocok. Coba lagi.");
      return;
    }

    setIsSubmitting(true);
    const { error: changeError } = await changePassword(newPassword);
    setIsSubmitting(false);

    if (changeError) {
      setError(changeError);
    } else {
      setSuccess(true);
      // Tunda redirect agar user sempat melihat pesan sukses
      setTimeout(() => {
        if (profile?.role === "dosen") {
          router.replace("/lecturer/dashboard");
        } else {
          router.replace("/student/dashboard");
        }
      }, 2000);
    }
  };

  const strength = (() => {
    if (!newPassword) return 0;
    let s = 0;
    if (newPassword.length >= 8) s++;
    if (/[A-Z]/.test(newPassword)) s++;
    if (/[0-9]/.test(newPassword)) s++;
    if (/[^A-Za-z0-9]/.test(newPassword)) s++;
    return s;
  })();

  const strengthLabel = ["", "Lemah", "Cukup", "Kuat", "Sangat Kuat"][strength];
  const strengthColor = ["", "bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-emerald-500"][strength];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#09090b]">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(16,185,129,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <motion.div initial="hidden" animate="visible" className="relative w-full max-w-md mx-4">
        {/* Glow */}
        <div
          className="absolute -inset-px rounded-2xl opacity-50 blur-xl"
          style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(99,102,241,0.2) 100%)" }}
        />

        <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl overflow-hidden">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(16,185,129,0.8) 30%, rgba(99,102,241,0.8) 70%, transparent)",
            }}
          />

          <div className="px-8 py-10">
            {/* Header */}
            <motion.div variants={fadeUp} custom={0} className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-5">
                <KeyRound className="h-8 w-8 text-emerald-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">Buat Password Baru</h1>
              <p className="text-sm text-white/50">
                Selamat datang,{" "}
                <span className="text-white/80 font-semibold">
                  {profile?.full_name ?? profile?.nim ?? ""}
                </span>
                ! Ganti password awal Anda untuk melanjutkan.
              </p>
            </motion.div>

            {/* Error / Sukses */}
            <AnimatePresence mode="wait">
              {error && !success && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 flex items-start gap-3"
                  role="alert"
                  id="change-password-error"
                >
                  <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-300">{error}</p>
                </motion.div>
              )}
              {success && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 flex items-start gap-3"
                  role="status"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-emerald-300">
                    Password berhasil diperbarui! Mengarahkan ke dashboard...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <motion.form variants={fadeUp} custom={1} onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Password Baru */}
              <div>
                <label htmlFor={newPassId} className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">
                  Password Baru
                </label>
                <div className="relative">
                  <input
                    id={newPassId}
                    type={showNew ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Minimal 8 karakter"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={isSubmitting || success}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-11 text-white placeholder:text-white/20 text-sm
                      focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/30
                      disabled:opacity-50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    aria-label={showNew ? "Sembunyikan" : "Tampilkan"}
                  >
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Strength bar */}
                {newPassword && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2"
                  >
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : "bg-white/10"}`}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-white/40">Kekuatan: <span className="text-white/60">{strengthLabel}</span></p>
                  </motion.div>
                )}
              </div>

              {/* Konfirmasi Password */}
              <div>
                <label htmlFor={confPassId} className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <input
                    id={confPassId}
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Ulangi password baru"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    disabled={isSubmitting || success}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-11 text-white placeholder:text-white/20 text-sm
                      focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/30
                      disabled:opacity-50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    aria-label={showConfirm ? "Sembunyikan" : "Tampilkan"}
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmPass && newPassword !== confirmPass && (
                  <p className="mt-1.5 text-xs text-red-400">Password tidak cocok.</p>
                )}
                {confirmPass && newPassword === confirmPass && newPassword.length >= 8 && (
                  <p className="mt-1.5 text-xs text-emerald-400">Password cocok ✓</p>
                )}
              </div>

              {/* Info */}
              <div className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 space-y-1">
                <p className="text-xs text-white/40 font-semibold mb-2">Syarat password:</p>
                {[
                  ["Minimal 8 karakter", newPassword.length >= 8],
                  ["Tidak sama dengan NIM", newPassword !== "" && newPassword.toLowerCase() !== (profile?.nim ?? "").toLowerCase()],
                  ["Mengandung huruf kapital", /[A-Z]/.test(newPassword)],
                  ["Mengandung angka", /[0-9]/.test(newPassword)],
                ].map(([label, met]) => (
                  <div key={label as string} className="flex items-center gap-2">
                    <div className={`h-1.5 w-1.5 rounded-full transition-colors ${met ? "bg-emerald-400" : "bg-white/20"}`} />
                    <span className={`text-xs ${met ? "text-emerald-400" : "text-white/30"}`}>{label as string}</span>
                  </div>
                ))}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting || success || authLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold text-white
                  transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)",
                  boxShadow: "0 0 30px rgba(16,185,129,0.25), 0 4px 16px rgba(16,185,129,0.15)",
                }}
                id="change-password-submit-button"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    Simpan Password Baru
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
