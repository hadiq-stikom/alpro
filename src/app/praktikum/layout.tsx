"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaskConical, ArrowLeft, Layers, CheckCircle2, BookmarkCheck, FileSpreadsheet } from "lucide-react";
import { PRAKTIKUM_MODULES } from "@/lib/praktikum-data";

export default function PraktikumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPrintPage = pathname?.includes("/print");

  // Jika halaman cetak PDF, jangan render layout chrome apapun
  if (isPrintPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-[#07090e] flex flex-col">
      {/* Sub-Header Laboratorium */}
      <header className="sticky top-16 z-40 border-b border-border/70 bg-background/95 backdrop-blur shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Sisi Kiri: Branding Laboratorium */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded-lg border border-border/60 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-xs font-semibold"
              title="Kembali ke Ruang Kuliah (Teori)"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Teori</span>
            </Link>

            <div className="h-5 w-[1px] bg-border/60 hidden sm:block"></div>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 shadow-sm">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    LABORATORIUM KOMPUTASI
                  </span>
                  <span className="text-xs text-muted-foreground hidden md:inline">TI-101P • 1 SKS</span>
                </div>
                <h1 className="text-sm md:text-base font-bold text-foreground leading-tight">
                  Praktikum Pengukuran &amp; Validasi Algoritma
                </h1>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Quick Switcher Modul */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <Link
              href="/praktikum"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                pathname === "/praktikum"
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/50"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Semua Modul</span>
            </Link>

            {PRAKTIKUM_MODULES.map((m) => {
              const isActive = pathname === `/praktikum/${m.id}`;
              return (
                <Link
                  key={m.id}
                  href={`/praktikum/${m.id}`}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shrink-0 ${
                    isActive
                      ? "bg-cyan-500 text-white shadow-sm"
                      : "bg-secondary/40 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/40"
                  }`}
                  title={`Modul ${m.id}: ${m.title}`}
                >
                  M-0{m.id}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="flex-1 container mx-auto max-w-7xl px-4 py-8">
        {children}
      </main>
    </div>
  );
}
