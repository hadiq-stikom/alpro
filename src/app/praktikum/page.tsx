"use client";

import React from "react";
import Link from "next/link";
import { 
  FlaskConical, 
  FileSpreadsheet, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  FileText,
  Printer
} from "lucide-react";
import { PRAKTIKUM_MODULES } from "@/lib/praktikum-data";
import { useAuth } from "@/context/AuthContext";

export default function PraktikumIndexPage() {
  const { profile } = useAuth();

  return (
    <div className="space-y-10">
      {/* Hero Banner Laboratorium */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-slate-900/40 to-indigo-500/10 p-6 sm:p-10 shadow-lg">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <FlaskConical className="w-4 h-4" /> Laboratorium Sains Komputasi &amp; Validasi
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Laboratorium Pengukuran &amp; <span className="text-cyan-400">Validasi Algoritma</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Selamat datang di laboratorium praktikum,{" "}
            <strong className="text-foreground">{profile?.full_name ?? "Mahasiswa"}</strong>! 
            Di sini Anda tidak sekadar mengetik ulang kode program. Anda bertindak sebagai seorang 
            <em> Software QA &amp; Algorithm Analyst</em> yang melakukan serangkaian pengujian hipotesis, 
            mencatat data empiris ke dalam tabel pengamatan, dan menyusun laporan resmi standar akademik.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/praktikum/1"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-sm shadow-md transition-all hover:gap-3"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Mulai Modul 01: Tipe Data &amp; Operator
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Tersedia Ekspor Dokumen Resmi PDF A4
            </div>
          </div>
        </div>
      </div>

      {/* 5 Tahap Alur LKP */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          Format Baku 5 Bagian Lembar Kerja Praktikum (A s.d. E)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/60 space-y-1">
            <span className="font-mono font-bold text-cyan-400">BAGIAN A</span>
            <div className="font-bold text-foreground">Capaian Praktikum</div>
            <p className="text-muted-foreground text-[11px]">Target kompetensi dan luaran belajar terukur.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/60 space-y-1">
            <span className="font-mono font-bold text-cyan-400">BAGIAN B</span>
            <div className="font-bold text-foreground">Dasar Teori</div>
            <p className="text-muted-foreground text-[11px]">Hipotesis dan landasan ilmiah parameter uji.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 space-y-1">
            <span className="font-mono font-bold text-cyan-400">BAGIAN C (INTI)</span>
            <div className="font-bold text-foreground">Tabel Pengamatan</div>
            <p className="text-muted-foreground text-[11px]">Pencatatan data empiris aktual dan metrik mesin.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/60 space-y-1">
            <span className="font-mono font-bold text-cyan-400">BAGIAN D</span>
            <div className="font-bold text-foreground">Analisis Pembahasan</div>
            <p className="text-muted-foreground text-[11px]">Telaah kritis mengapa fenomena terjadi.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/60 space-y-1">
            <span className="font-mono font-bold text-cyan-400">BAGIAN E</span>
            <div className="font-bold text-foreground">Kesimpulan &amp; TTD</div>
            <p className="text-muted-foreground text-[11px]">Intisari ilmiah &amp; lembar pengesahan dosen.</p>
          </div>
        </div>
      </div>

      {/* Grid 7 Modul Praktikum */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Daftar 7 Modul Praktikum</h2>
            <p className="text-sm text-muted-foreground">Pilih modul untuk membuka lembar kerja pengukuran.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRAKTIKUM_MODULES.map((m) => {
            const isReady = m.id === 1;
            return (
              <div
                key={m.id}
                className={`rounded-2xl border transition-all flex flex-col justify-between ${
                  isReady 
                    ? "bg-card border-cyan-500/40 shadow-md hover:border-cyan-500 hover:shadow-cyan-500/10" 
                    : "bg-card/50 border-border/60 opacity-80"
                }`}
              >
                <div className="p-6 space-y-4">
                  {/* Header Card */}
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      MODUL 0{m.id}
                    </span>
                    {isReady ? (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Siap Diisi
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Modul Berjalan
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-cyan-400 transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed font-normal">
                      {m.subtitle}
                    </p>
                  </div>

                  {/* Fokus Validasi & Pengukuran */}
                  <div className="space-y-3 pt-3 border-t border-border/60 text-sm">
                    <div className="space-y-1">
                      <span className="text-xs font-mono uppercase font-bold text-amber-500 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" /> Fokus Validasi:
                      </span>
                      <p className="text-slate-700 dark:text-slate-200 text-xs md:text-sm leading-relaxed font-normal">
                        {m.focusValidation}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-mono uppercase font-bold text-cyan-500 flex items-center gap-1.5">
                        <Activity className="w-4 h-4" /> Fokus Pengukuran:
                      </span>
                      <p className="text-slate-700 dark:text-slate-200 text-xs md:text-sm leading-relaxed font-normal">
                        {m.focusMeasurement}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-secondary/30 border-t border-border/60 flex items-center justify-between">
                  {isReady ? (
                    <Link
                      href={`/praktikum/${m.id}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      Buka Lembar Kerja (LKP)
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <Link
                      href={`/praktikum/${m.id}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-sm font-bold flex items-center justify-center gap-2 transition-colors border border-border/70 cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      Buka Lembar Kerja
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
