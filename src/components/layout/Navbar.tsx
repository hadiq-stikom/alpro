"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Flame, Code2, Menu, Moon, Sun, GraduationCap,
  LogOut, ChevronDown, User, LayoutDashboard, ShieldCheck,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { getBadgeFromScore, BadgeConfig } from "@/lib/badges";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { language, setLanguage }   = useLanguage();
  const { theme, setTheme }         = useTheme();
  const { profile, signOut, loading } = useAuth();
  const router                      = useRouter();

  const [mounted, setMounted]       = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userBadge, setUserBadge]   = useState<BadgeConfig | null>(null);
  const dropdownRef                 = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Ambil badge pengguna jika mahasiswa
  useEffect(() => {
    async function fetchBadge() {
      if (profile?.role === "mahasiswa") {
        const { data } = await supabase
          .from('overall_grades')
          .select('total_avg_score')
          .eq('user_id', profile.id)
          .single();
        
        if (data && (data as any).total_avg_score !== undefined) {
          setUserBadge(getBadgeFromScore((data as any).total_avg_score));
        }
      }
    }
    fetchBadge();
  }, [profile]);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await signOut();
    router.push("/login");
  };

  const dashboardPath = profile?.role === "dosen" ? "/lecturer/dashboard" : "/student/dashboard";

  // Inisial nama untuk avatar
  const initials = profile?.full_name
    ? profile.full_name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
    : profile?.nim?.slice(0, 2).toUpperCase() ?? "?";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo & Course Info */}
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-2.5 rounded-lg hidden sm:block">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">
              Algoritma &amp; Pemrograman
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              TI-101 • Semester Ganjil
            </p>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center rounded-full bg-secondary/80 p-1 border border-border/50">
            <button
              onClick={() => setLanguage("python")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                language === "python"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Python
            </button>
            <button
              onClick={() => setLanguage("javascript")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                language === "javascript"
                  ? "bg-yellow-500 text-black shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              JavaScript
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-secondary/50 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle tema"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}

          {/* User Section */}
          {mounted && !loading && (
            <>
              {profile ? (
                /* User sudah login: tampilkan avatar + dropdown */
                <div className="relative" ref={dropdownRef}>
                  <button
                    id="navbar-user-menu-button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="hidden md:flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-full border border-border/50 bg-secondary/40 hover:bg-secondary transition-all"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    {/* Avatar */}
                    <div className="relative">
                      <div className="h-7 w-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary">{initials}</span>
                      </div>
                      {/* Mini Badge Indicator */}
                      {userBadge && (
                        <div 
                          className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border border-background shadow-sm flex items-center justify-center"
                          style={{ backgroundColor: userBadge.hexColor }}
                          title={`Lencana: ${userBadge.name}`}
                        >
                          <span className="text-[7px] font-bold text-white leading-none">{userBadge.level}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-left hidden lg:block">
                      <p className="text-xs font-semibold leading-tight max-w-[120px] truncate">
                        {profile.full_name ?? profile.nim}
                      </p>
                      <p className="text-[10px] text-muted-foreground capitalize">
                        {profile.role === "dosen" ? "Dosen" : `NIM: ${profile.nim}`}
                      </p>
                    </div>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-border/60 bg-popover shadow-xl overflow-hidden"
                        role="menu"
                      >
                        {/* Header dropdown */}
                        <div className="px-4 py-3 border-b border-border/40">
                          <p className="text-sm font-semibold truncate">{profile.full_name ?? profile.nim}</p>
                          <p className="text-xs text-muted-foreground">
                            {profile.role === "dosen" ? "Dosen Pengampu" : `NIM: ${profile.nim}`}
                          </p>
                        </div>

                        {/* Menu items */}
                        <div className="py-1">
                          <button
                            onClick={() => { setDropdownOpen(false); router.push(dashboardPath); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                            role="menuitem"
                            id="navbar-dashboard-link"
                          >
                            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                            Dashboard
                          </button>

                          {profile.role === "dosen" && (
                            <button
                              onClick={() => { setDropdownOpen(false); router.push("/lecturer/dashboard"); }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                              role="menuitem"
                            >
                              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                              Panel Dosen
                            </button>
                          )}
                        </div>

                        {/* Logout */}
                        <div className="border-t border-border/40 py-1">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                            role="menuitem"
                            id="navbar-logout-button"
                          >
                            <LogOut className="h-4 w-4" />
                            Keluar
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Belum login: tampilkan profil dosen & tombol login */
                <div className="hidden md:flex items-center gap-4 pl-4 border-l border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold leading-tight">Hadiq, ST, M.Kom</p>
                      <p className="text-[10px] text-muted-foreground">Dosen Pengampu</p>
                    </div>
                    <div className="h-9 w-9 rounded-full border border-primary/30 shadow-sm flex items-center justify-center overflow-hidden bg-secondary relative shrink-0">
                      <img src="/dosen.png" alt="Hadiq, ST, M.Kom" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <button
                    onClick={() => router.push("/login")}
                    className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    Masuk
                  </button>
                </div>
              )}
            </>
          )}

          {/* Mobile menu */}
          <button className="md:hidden p-2 rounded-md hover:bg-secondary">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
