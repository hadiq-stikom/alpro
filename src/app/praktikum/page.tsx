"use client";

import React, { useState, useEffect } from "react";
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
  Printer,
  AlertCircle,
  FileEdit,
  Award,
  ChevronRight,
  Loader2
} from "lucide-react";
import { PRAKTIKUM_MODULES } from "@/lib/praktikum-data";
import { useAuth } from "@/context/AuthContext";

interface StudentModuleStatus {
  status: 'draft' | 'diajukan' | 'perlu_revisi' | 'disetujui' | 'belum_mulai';
  score?: number | null;
  feedback?: string | null;
  updatedAt?: string | null;
}

export default function PraktikumIndexPage() {
  const { profile } = useAuth();
  const [moduleStatusMap, setModuleStatusMap] = useState<Record<number, StudentModuleStatus>>({});
  const [loadingStatus, setLoadingStatus] = useState<boolean>(true);

  // Ambil data submission seluruh modul untuk mahasiswa ini
  useEffect(() => {
    async function loadStatuses() {
      const currentNim = profile?.nim;
      const initialMap: Record<number, StudentModuleStatus> = {};

      // 1. Cek draft lokal terlebih dahulu sebagai baseline offline-first
      PRAKTIKUM_MODULES.forEach((m) => {
        let hasDraft = false;
        let savedDraftTime: string | null = null;
        if (typeof window !== "undefined") {
          try {
            const specificKey = currentNim ? `lkp_draft_m${m.id}_${currentNim}` : null;
            const fallbackKey = `lkp_draft_m${m.id}_local`;
            const rawDraft = (specificKey ? localStorage.getItem(specificKey) : null) || localStorage.getItem(fallbackKey);
            if (rawDraft) {
              const parsed = JSON.parse(rawDraft);
              // Anggap draft jika ada isian analisis atau kesimpulan atau modifikasi observasi
              if (
                (Array.isArray(parsed.analisisAnswers) && parsed.analisisAnswers.some((a: string) => a && a.trim().length > 0)) ||
                (parsed.kesimpulanText && parsed.kesimpulanText.trim().length > 0)
              ) {
                hasDraft = true;
                savedDraftTime = parsed.savedAt || null;
              }
            }
          } catch (e) {
            // ignore
          }
        }

        initialMap[m.id] = {
          status: hasDraft ? 'draft' : 'belum_mulai',
          updatedAt: savedDraftTime
        };
      });

      // 2. Jika mahasiswa terautentikasi, sinkronkan dengan database Supabase
      if (profile?.id) {
        try {
          const res = await fetch(`/api/praktikum/submission?userId=${profile.id}`);
          const data = await res.json();
          if (data.success && Array.isArray(data.submissions)) {
            data.submissions.forEach((sub: any) => {
              const mId = Number(sub.module_id);
              if (mId && initialMap[mId]) {
                initialMap[mId] = {
                  status: sub.status || 'draft',
                  score: sub.lecturer_score !== null && sub.lecturer_score !== undefined ? Number(sub.lecturer_score) : null,
                  feedback: sub.lecturer_feedback || null,
                  updatedAt: sub.updated_at
                };
              }
            });
          }
        } catch (err) {
          console.warn("Gagal mengambil status pengajuan praktikum:", err);
        }
      }

      setModuleStatusMap(initialMap);
      setLoadingStatus(false);
    }

    loadStatuses();
  }, [profile?.id, profile?.nim]);

  // Kalkulasi Statistik Keseluruhan Praktikum
  const totalModules = PRAKTIKUM_MODULES.length;
  const approvedModules = Object.values(moduleStatusMap).filter((s) => s.status === 'disetujui');
  const pendingModules = Object.values(moduleStatusMap).filter((s) => s.status === 'diajukan');
  const revisionModules = Object.values(moduleStatusMap).filter((s) => s.status === 'perlu_revisi');

  const approvedCount = approvedModules.length;
  const pendingCount = pendingModules.length;
  const revisionCount = revisionModules.length;

  const validScores = approvedModules
    .map((s) => s.score)
    .filter((sc): sc is number => sc !== null && sc !== undefined && !isNaN(sc));
  const avgScore = validScores.length > 0 ? (validScores.reduce((a, b) => a + b, 0) / validScores.length).toFixed(1) : null;

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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all hover:gap-3 cursor-pointer"
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

      {/* Ringkasan Status Mahasiswa (4 Kartu Metrik Cepat) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Disetujui */}
        <div className="p-4 sm:p-5 rounded-2xl bg-card border border-emerald-500/30 bg-emerald-500/5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <span>Disetujui Dosen</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-foreground">
            {loadingStatus ? "..." : `${approvedCount} / ${totalModules}`}
          </div>
          <p className="text-xs text-muted-foreground">
            {avgScore ? `Rata-rata Nilai: ${avgScore}` : "Modul disahkan resmi"}
          </p>
        </div>

        {/* Dalam Antrean */}
        <div className="p-4 sm:p-5 rounded-2xl bg-card border border-cyan-500/30 bg-cyan-500/5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
            <span>Dalam Antrean</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-foreground">
            {loadingStatus ? "..." : `${pendingCount} Modul`}
          </div>
          <p className="text-xs text-muted-foreground">Menunggu telaah &amp; TTD dosen</p>
        </div>

        {/* Perlu Revisi */}
        <div className="p-4 sm:p-5 rounded-2xl bg-card border border-rose-500/30 bg-rose-500/5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            <span>Perlu Revisi</span>
            <AlertCircle className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-foreground">
            {loadingStatus ? "..." : `${revisionCount} Modul`}
          </div>
          <p className="text-xs text-muted-foreground">Ada catatan koreksi dosen</p>
        </div>

        {/* SKS & Portofolio */}
        <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <span>Bobot SKS</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-foreground">
            1 SKS Lab
          </div>
          <p className="text-xs text-muted-foreground">Terpisah dari Teori (3 SKS)</p>
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

      {/* Grid 7 Modul Praktikum Berdasarkan Status Dinamis Mahasiswa */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Daftar 7 Modul Praktikum</h2>
            <p className="text-sm text-muted-foreground">Pilih modul untuk membuka lembar kerja pengukuran dan memantau status pengesahan.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRAKTIKUM_MODULES.map((m) => {
            const modStatus = moduleStatusMap[m.id] || { status: 'belum_mulai' };
            const statusKey = modStatus.status;

            // Tentukan border dan badge berdasarkan status aktual
            let borderStyle = "border-border/80 hover:border-cyan-500/60";
            let statusBadge = (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border flex items-center gap-1">
                <Clock className="w-3 h-3" /> Belum Dimulai
              </span>
            );

            if (statusKey === 'disetujui') {
              borderStyle = "border-emerald-500/50 shadow-emerald-500/10 bg-emerald-500/[0.02]";
              statusBadge = (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Disetujui {modStatus.score !== null && modStatus.score !== undefined ? `• ${modStatus.score}/100` : ""}
                </span>
              );
            } else if (statusKey === 'diajukan') {
              borderStyle = "border-cyan-500/50 shadow-cyan-500/10 bg-cyan-500/[0.02]";
              statusBadge = (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/40 flex items-center gap-1 animate-pulse">
                  <Clock className="w-3.5 h-3.5 text-cyan-500" />
                  Dalam Antrean Dosen
                </span>
              );
            } else if (statusKey === 'perlu_revisi') {
              borderStyle = "border-rose-500/60 shadow-rose-500/15 bg-rose-500/[0.03]";
              statusBadge = (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/40 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                  Perlu Revisi
                </span>
              );
            } else if (statusKey === 'draft') {
              borderStyle = "border-amber-500/40 bg-amber-500/[0.02]";
              statusBadge = (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
                  <FileEdit className="w-3.5 h-3.5 text-amber-500" />
                  Draf Tersimpan
                </span>
              );
            }

            return (
              <div
                key={m.id}
                className={`rounded-2xl border transition-all flex flex-col justify-between bg-card shadow-md hover:shadow-lg ${borderStyle}`}
              >
                <div className="p-6 space-y-4">
                  {/* Header Card */}
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                      MODUL 0{m.id}
                    </span>
                    {statusBadge}
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-cyan-400 transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed font-normal">
                      {m.subtitle}
                    </p>
                  </div>

                  {/* Catatan Feedback Dosen jika status Perlu Revisi */}
                  {statusKey === 'perlu_revisi' && modStatus.feedback && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-xs text-rose-700 dark:text-rose-300 space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>Catatan Dosen:</span>
                      </div>
                      <p className="line-clamp-2 pl-5 italic font-normal text-slate-700 dark:text-slate-300">
                        &ldquo;{modStatus.feedback}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Fokus Validasi & Pengukuran */}
                  <div className="space-y-3 pt-3 border-t border-border/60 text-sm">
                    <div className="space-y-1">
                      <span className="text-xs font-mono uppercase font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-amber-500" /> Fokus Validasi:
                      </span>
                      <p className="text-slate-700 dark:text-slate-200 text-xs md:text-sm leading-relaxed font-normal">
                        {m.focusValidation}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-mono uppercase font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                        <Activity className="w-4 h-4 text-cyan-500" /> Fokus Pengukuran:
                      </span>
                      <p className="text-slate-700 dark:text-slate-200 text-xs md:text-sm leading-relaxed font-normal">
                        {m.focusMeasurement}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-secondary/30 border-t border-border/60 flex flex-col sm:flex-row items-center gap-2">
                  <Link
                    href={`/praktikum/${m.id}`}
                    className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer ${
                      statusKey === 'disetujui'
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : statusKey === 'perlu_revisi'
                        ? 'bg-rose-600 hover:bg-rose-500 text-white'
                        : statusKey === 'diajukan'
                        ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                        : 'bg-primary/90 hover:bg-primary text-primary-foreground'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>
                      {statusKey === 'disetujui'
                        ? `Laporan Disahkan (Nilai: ${modStatus.score || 100})`
                        : statusKey === 'perlu_revisi'
                        ? 'Perbaiki Lembar Kerja (Revisi)'
                        : statusKey === 'diajukan'
                        ? 'Pantau Pengajuan Dosen'
                        : statusKey === 'draft'
                        ? 'Lanjutkan Draf LKP'
                        : 'Mulai Lembar Kerja (LKP)'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* Tombol Cepat Cetak jika sudah disetujui */}
                  {statusKey === 'disetujui' && (
                    <Link
                      href={`/praktikum/${m.id}/print`}
                      target="_blank"
                      className="w-full sm:w-auto p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground border border-border flex items-center justify-center gap-1.5 text-xs font-bold transition-colors cursor-pointer shrink-0"
                      title="Cetak Dokumen Resmi PDF A4"
                    >
                      <Printer className="w-4 h-4 text-emerald-500" />
                      <span className="sm:hidden">Cetak PDF</span>
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
