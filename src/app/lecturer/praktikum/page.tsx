"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FlaskConical, 
  ArrowLeft, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Printer, 
  Eye, 
  Check, 
  X, 
  Loader2, 
  UserCheck, 
  TrendingUp, 
  Award,
  Layers,
  Terminal,
  RotateCcw
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { PRAKTIKUM_MODULES, ObservationRow } from "@/lib/praktikum-data";

interface PraktikumSubmissionItem {
  id: string;
  user_id: string;
  class_id?: string | null;
  module_id: number;
  student_name: string;
  student_nim: string;
  student_class: string;
  lab_date: string;
  observations: ObservationRow[];
  analisis_answers: string[];
  kesimpulan_text: string;
  telemetry: any;
  ai_evaluation: any;
  student_signature: string | null;
  student_signed_at: string | null;
  status: 'draft' | 'diajukan' | 'perlu_revisi' | 'disetujui';
  lecturer_feedback: string | null;
  lecturer_score: number | null;
  lecturer_signature: string | null;
  lecturer_signed_at: string | null;
  created_at: string;
  updated_at: string;
  user?: {
    id: string;
    full_name: string;
    nim: string;
    email: string;
    avatar_url?: string;
  };
}

export default function LecturerPraktikumPage() {
  const { profile } = useAuth();

  const [submissions, setSubmissions] = useState<PraktikumSubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filter & Search
  const [selectedModule, setSelectedModule] = useState<number | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("diajukan"); // default fokus ke antrean yang diajukan
  const [searchQuery, setSearchQuery] = useState("");

  // Modal Detail Pemeriksaan
  const [activeSubmission, setActiveSubmission] = useState<PraktikumSubmissionItem | null>(null);
  const [inputScore, setInputScore] = useState<string>("85");
  const [inputFeedback, setInputFeedback] = useState<string>("");
  const [lecturerSignature, setLecturerSignature] = useState<string | null>(null);
  const [lecturerStoredSignature, setLecturerStoredSignature] = useState<string | null>(null);
  const [saveAsDefaultSig, setSaveAsDefaultSig] = useState(true);
  const [isSubmittingApproval, setIsSubmittingApproval] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const url = new URL("/api/lecturer/praktikum", window.location.origin);
      if (selectedModule !== "all") url.searchParams.set("moduleId", selectedModule.toString());
      if (selectedStatus !== "all") url.searchParams.set("status", selectedStatus);
      if (profile?.id) url.searchParams.set("lecturerId", profile.id);

      const res = await fetch(url.toString());
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal memuat antrean praktikum.");
      }

      setSubmissions(data.submissions || []);
      if (data.lecturerStoredSignature) {
        setLecturerStoredSignature(data.lecturerStoredSignature);
        if (!lecturerSignature) {
          setLecturerSignature(data.lecturerStoredSignature);
        }
      }
    } catch (err: any) {
      console.error("Fetch praktikum submissions error:", err);
      setErrorMsg(err.message || "Terjadi kesalahan saat memuat data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [selectedModule, selectedStatus, profile?.id]);

  // Buka modal pemeriksaan
  const handleOpenReview = (item: PraktikumSubmissionItem) => {
    setActiveSubmission(item);
    // Skor default dari AI atau skor dosen sebelumnya
    if (item.lecturer_score !== null && item.lecturer_score !== undefined) {
      setInputScore(item.lecturer_score.toString());
    } else if (item.ai_evaluation?.score) {
      setInputScore(item.ai_evaluation.score.toString());
    } else {
      setInputScore("85");
    }

    setInputFeedback(item.lecturer_feedback || "");
    // Pastikan TTD dosen terisi dari stored signature jika ada
    if (item.lecturer_signature) {
      setLecturerSignature(item.lecturer_signature);
    } else if (lecturerStoredSignature) {
      setLecturerSignature(lecturerStoredSignature);
    }
    setActionSuccessMsg(null);
  };

  // Upload tanda tangan dosen
  const handleLecturerSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Harap pilih file gambar (PNG, JPG, atau WebP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setLecturerSignature(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Simpan pengesahan (Disetujui atau Perlu Revisi)
  const handleSubmitReview = async (decision: "disetujui" | "perlu_revisi") => {
    if (!activeSubmission) return;

    if (decision === "disetujui") {
      const numScore = parseFloat(inputScore);
      if (isNaN(numScore) || numScore < 0 || numScore > 100) {
        alert("Harap masukkan nilai valid antara 0 hingga 100.");
        return;
      }
      if (!lecturerSignature) {
        alert("Harap bubuhkan tanda tangan digital Dosen sebelum mengesahkan laporan.");
        return;
      }
    }

    setIsSubmittingApproval(true);
    setActionSuccessMsg(null);

    try {
      const res = await fetch("/api/lecturer/praktikum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: activeSubmission.id,
          lecturerId: profile?.id,
          status: decision,
          lecturerScore: decision === "disetujui" ? parseFloat(inputScore) : null,
          lecturerFeedback: inputFeedback,
          lecturerSignature: decision === "disetujui" ? lecturerSignature : null,
          saveAsDefaultLecturerSignature: saveAsDefaultSig,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal menyimpan pengesahan.");
      }

      setActionSuccessMsg(
        decision === "disetujui"
          ? "✓ Laporan praktikum berhasil disahkan dan ditandatangani secara digital!"
          : "✓ Catatan revisi praktikum berhasil dikirimkan ke mahasiswa."
      );

      if (saveAsDefaultSig && lecturerSignature) {
        setLecturerStoredSignature(lecturerSignature);
      }

      // Refresh antrean dan update modal
      await fetchSubmissions();
      setTimeout(() => {
        setActiveSubmission(null);
      }, 1200);

    } catch (err: any) {
      console.error("Gagal menyimpan review praktikum:", err);
      alert("Gagal menyimpan: " + err.message);
    } finally {
      setIsSubmittingApproval(false);
    }
  };

  // Filtered submissions
  const filteredSubmissions = submissions.filter((item) => {
    const studentName = item.student_name || item.user?.full_name || "";
    const studentNim = item.student_nim || item.user?.nim || "";
    const matchesSearch = 
      studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studentNim.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Statistik Ringkasan
  const countDiajukan = submissions.filter((s) => s.status === "diajukan").length;
  const countDisetujui = submissions.filter((s) => s.status === "disetujui").length;
  const countRevisi = submissions.filter((s) => s.status === "perlu_revisi").length;

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Sticky Header Navigasi */}
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur border-b border-border/80 px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/lecturer/dashboard"
              className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground transition-colors border border-border/70"
              title="Kembali ke Dasbor Dosen"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-500 dark:text-cyan-400">
                  <FlaskConical className="w-5 h-5" />
                </span>
                <h1 className="text-lg md:text-xl font-black text-foreground tracking-tight">
                  Pemeriksaan &amp; Pengesahan Laporan Praktikum
                </h1>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Mata Kuliah Praktikum Algoritma &amp; Pemrograman (1 SKS) • Dosen: Hadiq, ST, M.Kom
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchSubmissions}
              className="px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold flex items-center gap-2 border border-border/70 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Segarkan Antrean</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Banner Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Menunggu Pengesahan</span>
              <span className="text-2xl font-black text-cyan-600 dark:text-cyan-400 mt-1 block">
                {countDiajukan}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-500 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Telah Disahkan</span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
                {countDisetujui}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Dalam Revisi</span>
              <span className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1 block">
                {countRevisi}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center font-bold">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Modul Praktikum</span>
              <span className="text-2xl font-black text-foreground mt-1 block">
                7 Modul
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-500/15 text-indigo-500 flex items-center justify-center font-bold">
              <Layers className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Toolbar Filter & Pencarian */}
        <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Status */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-secondary/60 border border-border/70 text-xs font-bold">
              <button
                onClick={() => setSelectedStatus("diajukan")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedStatus === "diajukan"
                    ? "bg-cyan-600 text-white shadow"
                    : "text-slate-600 dark:text-slate-400 hover:text-foreground"
                }`}
              >
                Menunggu Pengesahan ({countDiajukan})
              </button>
              <button
                onClick={() => setSelectedStatus("disetujui")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedStatus === "disetujui"
                    ? "bg-emerald-600 text-white shadow"
                    : "text-slate-600 dark:text-slate-400 hover:text-foreground"
                }`}
              >
                Disetujui ({countDisetujui})
              </button>
              <button
                onClick={() => setSelectedStatus("perlu_revisi")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedStatus === "perlu_revisi"
                    ? "bg-rose-600 text-white shadow"
                    : "text-slate-600 dark:text-slate-400 hover:text-foreground"
                }`}
              >
                Revisi ({countRevisi})
              </button>
              <button
                onClick={() => setSelectedStatus("all")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedStatus === "all"
                    ? "bg-slate-700 text-white shadow"
                    : "text-slate-600 dark:text-slate-400 hover:text-foreground"
                }`}
              >
                Semua
              </button>
            </div>

            {/* Filter Modul */}
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value === "all" ? "all" : parseInt(e.target.value, 10))}
              className="px-3 py-2 rounded-xl bg-secondary border border-border/70 text-foreground text-xs font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            >
              <option value="all">Semua Modul Praktikum</option>
              {PRAKTIKUM_MODULES.map((m) => (
                <option key={m.id} value={m.id}>
                  Modul 0{m.id}: {m.title}
                </option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Nama / NIM..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-background border border-border/80 text-foreground text-xs focus:ring-2 focus:ring-cyan-500/40 focus:outline-none"
            />
          </div>
        </div>

        {/* Tabel Antrean Pengajuan Laporan Praktikum */}
        <div className="rounded-2xl bg-card border border-border/80 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-slate-400 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-cyan-500" />
              <p className="text-sm">Memuat antrean laporan praktikum mahasiswa...</p>
            </div>
          ) : errorMsg ? (
            <div className="p-12 text-center text-rose-400 space-y-2">
              <AlertCircle className="w-8 h-8 mx-auto" />
              <p className="text-sm font-semibold">{errorMsg}</p>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="p-16 text-center text-slate-500 space-y-3">
              <FlaskConical className="w-12 h-12 mx-auto text-slate-400/60" />
              <h3 className="text-base font-bold text-foreground">Tidak Ada Laporan dalam Kategori Ini</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Belum ada mahasiswa yang mengajukan laporan praktikum untuk kriteria filter yang dipilih.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-secondary/70 border-b border-border text-foreground font-bold text-xs uppercase tracking-wider">
                    <th className="p-4">Mahasiswa Praktikan</th>
                    <th className="p-4">Modul Praktikum</th>
                    <th className="p-4 text-center">Keaslian Ketikan</th>
                    <th className="p-4 text-center">Skor AI</th>
                    <th className="p-4 text-center">Status Laporan</th>
                    <th className="p-4 text-center">Nilai Dosen</th>
                    <th className="p-4 text-center">Aksi Pemeriksaan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/70 text-slate-700 dark:text-slate-200">
                  {filteredSubmissions.map((sub) => {
                    const mod = PRAKTIKUM_MODULES.find((m) => m.id === sub.module_id);
                    const authScore = sub.ai_evaluation?.integrity?.authenticityScore || 90;
                    return (
                      <tr key={sub.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">
                              {(sub.student_name || "M")[0]}
                            </div>
                            <div>
                              <span className="font-bold text-foreground block">
                                {sub.student_name || sub.user?.full_name || "Mahasiswa"}
                              </span>
                              <span className="font-mono text-xs text-slate-500">
                                NIM. {sub.student_nim || sub.user?.nim || "-"} • {sub.student_class || "TI"}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="p-4 align-middle">
                          <span className="font-bold text-foreground block">
                            Modul 0{sub.module_id}: {mod?.title || "Praktikum"}
                          </span>
                          <span className="text-xs text-slate-500 block">
                            Uji: {sub.lab_date || new Date(sub.created_at).toLocaleDateString("id-ID")}
                          </span>
                        </td>

                        <td className="p-4 text-center align-middle">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                            authScore >= 80
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                              : authScore >= 65
                              ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
                              : "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30"
                          }`}>
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{authScore}%</span>
                          </span>
                        </td>

                        <td className="p-4 text-center align-middle">
                          <span className="font-mono font-bold text-foreground">
                            {sub.ai_evaluation?.score ? `${sub.ai_evaluation.score}/100` : "-"}
                          </span>
                        </td>

                        <td className="p-4 text-center align-middle">
                          <span className={`text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                            sub.status === "disetujui"
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                              : sub.status === "diajukan"
                              ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30"
                              : sub.status === "perlu_revisi"
                              ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30"
                              : "bg-slate-500/15 text-slate-500 border-slate-500/30"
                          }`}>
                            {sub.status === "disetujui"
                              ? "✓ Disetujui"
                              : sub.status === "diajukan"
                              ? "⏳ Diajukan"
                              : sub.status === "perlu_revisi"
                              ? "⚠️ Revisi"
                              : "Draf"}
                          </span>
                        </td>

                        <td className="p-4 text-center align-middle font-mono font-black text-sm">
                          {sub.lecturer_score !== null && sub.lecturer_score !== undefined ? (
                            <span className="text-emerald-600 dark:text-emerald-400">
                              {sub.lecturer_score} / 100
                            </span>
                          ) : (
                            <span className="text-slate-400 font-normal">-</span>
                          )}
                        </td>

                        <td className="p-4 text-center align-middle">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenReview(sub)}
                              className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-colors cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>{sub.status === "disetujui" ? "Ulas / Nilai" : "Periksa & Sahkan"}</span>
                            </button>
                            <Link
                              href={`/praktikum/${sub.module_id}/print`}
                              target="_blank"
                              className="p-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground border border-border/70"
                              title="Buka Lembar Cetak A4"
                            >
                              <Printer className="w-4 h-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* ======================================================================= */}
      {/* MODAL DETAL PEMERIKSAAN & PENGESAHAN LAPORAN                           */}
      {/* ======================================================================= */}
      {activeSubmission && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="max-w-4xl w-full bg-card rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-secondary/50 border-b border-border flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-mono font-bold text-xs">
                    Modul 0{activeSubmission.module_id}
                  </span>
                  <h3 className="font-extrabold text-base md:text-lg text-foreground">
                    Pemeriksaan Laporan: {activeSubmission.student_name}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 font-mono">
                  NIM. {activeSubmission.student_nim} • {activeSubmission.student_class} • Diajukan: {new Date(activeSubmission.updated_at).toLocaleString("id-ID")}
                </p>
              </div>

              <button
                onClick={() => setActiveSubmission(null)}
                className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 text-slate-500 hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Pesan Sukses Aksi */}
              {actionSuccessMsg && (
                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-sm font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>{actionSuccessMsg}</span>
                </div>
              )}

              {/* KARTU AUDIT FORENSIK DIGITAL KEASLIAN KETIKAN */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-transparent border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-500" />
                    Audit Forensik Keaslian Ketikan (vs Baseline Obrolan Pra-Ujian DB)
                  </span>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                    Indeks Keaslian: {activeSubmission.ai_evaluation?.integrity?.authenticityScore || 92}% Autentik
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-card border border-border/80">
                    <span className="text-slate-500 block text-[11px]">Kecepatan Ketik</span>
                    <span className="font-mono font-bold text-foreground text-sm">
                      {activeSubmission.ai_evaluation?.integrity?.wpmComparison?.currentWpm || activeSubmission.telemetry?.wpm || 12} WPM
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border/80">
                    <span className="text-slate-500 block text-[11px]">Baseline Chat DB</span>
                    <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400 text-sm">
                      {activeSubmission.ai_evaluation?.integrity?.wpmComparison?.baselineWpm || 12} WPM
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border/80">
                    <span className="text-slate-500 block text-[11px]">Rasio Koreksi Backspace</span>
                    <span className="font-mono font-bold text-foreground text-sm">
                      {Math.round((activeSubmission.telemetry?.backspaceRatio || 0.12) * 100)}%
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border/80">
                    <span className="text-slate-500 block text-[11px]">Blokir Paste/Burst</span>
                    <span className="font-mono font-bold text-foreground text-sm">
                      {activeSubmission.telemetry?.burstAttempts || 0} kali
                    </span>
                  </div>
                </div>

                {activeSubmission.ai_evaluation?.integrity?.stylometricNotes && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic pt-1">
                    💬 Telaah AI: &ldquo;{activeSubmission.ai_evaluation.integrity.stylometricNotes}&rdquo;
                  </p>
                )}
              </div>

              {/* TABEL PENGAMATAN C */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/15 text-cyan-500 text-xs flex items-center justify-center font-bold">C</span>
                  Tabel Pengamatan Workbench ({activeSubmission.observations?.length || 0} Uji Coba)
                </h4>
                <div className="rounded-xl border border-border overflow-hidden">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-secondary/70 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5 w-8 text-center">No</th>
                        <th className="p-2.5">Skenario</th>
                        <th className="p-2.5">Input / Kode</th>
                        <th className="p-2.5">Hasil Aktual Komputer</th>
                        <th className="p-2.5">Metrik Terukur</th>
                        <th className="p-2.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {(activeSubmission.observations || []).map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-secondary/20">
                          <td className="p-2.5 text-center font-mono font-bold text-cyan-500">{row.no}</td>
                          <td className="p-2.5 font-medium text-foreground">{row.scenario}</td>
                          <td className="p-2.5 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{row.testInput}</td>
                          <td className="p-2.5 font-mono font-bold text-foreground">{row.actualOutput}</td>
                          <td className="p-2.5 font-mono text-slate-600 dark:text-slate-300">{row.measuredMetric}</td>
                          <td className="p-2.5 text-center font-bold text-emerald-500">{row.validationStatus}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* BAGIAN D: ANALISIS & PEMBAHASAN */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/15 text-cyan-500 text-xs flex items-center justify-center font-bold">D</span>
                  Analisis &amp; Pembahasan Hasil Pengukuran
                </h4>
                <div className="space-y-3">
                  {(activeSubmission.analisis_answers || []).map((ans, aIdx) => (
                    <div key={aIdx} className="p-3.5 rounded-xl bg-secondary/30 border border-border/70 space-y-1">
                      <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 block">
                        Pertanyaan Analisis 0{aIdx + 1}:
                      </span>
                      <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                        {ans || "(Kosong)"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* BAGIAN E: KESIMPULAN */}
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/15 text-cyan-500 text-xs flex items-center justify-center font-bold">E</span>
                  Kesimpulan Ilmiah Mahasiswa
                </h4>
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/70 text-xs leading-relaxed text-foreground whitespace-pre-wrap">
                  {activeSubmission.kesimpulan_text || "(Kosong)"}
                </div>
              </div>

              {/* TANDA TANGAN MAHASISWA PRAKTIKAN */}
              <div className="p-4 rounded-xl bg-secondary/30 border border-border/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-foreground block">Tanda Tangan Praktikan:</span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Dibubuhkan pada: {activeSubmission.student_signed_at ? new Date(activeSubmission.student_signed_at).toLocaleString("id-ID") : "Belum tertanggal"}
                  </span>
                </div>
                {activeSubmission.student_signature ? (
                  <div className="h-14 w-32 bg-white dark:bg-slate-900 border border-border/70 rounded-lg p-1 flex items-center justify-center">
                    <img
                      src={activeSubmission.student_signature}
                      alt="TTD Mahasiswa"
                      className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                    />
                  </div>
                ) : (
                  <span className="text-xs text-rose-500 font-semibold italic">Belum membubuhkan tanda tangan</span>
                )}
              </div>

              {/* FORM PENILAIAN & PENGESAHAN DOSEN */}
              <div className="p-5 rounded-2xl bg-secondary/40 border-2 border-cyan-500/40 space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="font-bold text-sm text-foreground flex items-center gap-2">
                    <Award className="w-4 h-4 text-cyan-500" />
                    Penetapan Nilai Resmi &amp; Pengesahan Tanda Tangan Dosen
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    Bapak Hadiq, ST, M.Kom
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Input Skor Resmi */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground block">
                      Skor Resmi Praktikum (0–100):
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={inputScore}
                      onChange={(e) => setInputScore(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border font-mono font-black text-lg text-cyan-600 dark:text-cyan-400 focus:ring-2 focus:ring-cyan-500/40 focus:outline-none"
                    />
                  </div>

                  {/* Input Tanda Tangan Dosen */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-foreground block">
                        Tanda Tangan Dosen Pengesah:
                      </label>
                      {lecturerStoredSignature && lecturerStoredSignature !== lecturerSignature && (
                        <button
                          type="button"
                          onClick={() => setLecturerSignature(lecturerStoredSignature)}
                          className="text-[11px] text-cyan-600 dark:text-cyan-400 font-bold hover:underline cursor-pointer"
                        >
                          Gunakan TTD Tersimpan
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-14 w-36 bg-white dark:bg-slate-900 border border-border rounded-xl p-1 flex items-center justify-center shrink-0">
                        {lecturerSignature ? (
                          <img
                            src={lecturerSignature}
                            alt="TTD Dosen"
                            className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                          />
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">Belum ada TTD</span>
                        )}
                      </div>

                      <div className="space-y-1 text-xs">
                        <label className="inline-block px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground font-bold border border-border cursor-pointer transition-colors">
                          Unggah File TTD Baru
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/svg+xml"
                            onChange={handleLecturerSignatureUpload}
                            className="hidden"
                          />
                        </label>
                        <label className="flex items-center gap-1.5 text-[11px] text-slate-500 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={saveAsDefaultSig}
                            onChange={(e) => setSaveAsDefaultSig(e.target.checked)}
                            className="w-3.5 h-3.5 rounded text-cyan-600"
                          />
                          <span>Simpan sebagai tanda tangan default saya</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Catatan Pembinaan Dosen */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground block">
                    Catatan Pembinaan Dosen (Opsional / untuk revisi):
                  </label>
                  <textarea
                    rows={2}
                    value={inputFeedback}
                    onChange={(e) => setInputFeedback(e.target.value)}
                    placeholder="Tuliskan catatan apresiasi atau arahan perbaikan jika meminta revisi..."
                    className="w-full p-3 rounded-xl bg-background border border-border text-foreground text-xs focus:ring-2 focus:ring-cyan-500/40 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer (Aksi Pengesahan) */}
            <div className="px-6 py-4 bg-secondary/50 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveSubmission(null)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border cursor-pointer"
              >
                Tutup Jendela
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleSubmitReview("perlu_revisi")}
                  disabled={isSubmittingApproval}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Minta Perbaikan / Revisi</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSubmitReview("disetujui")}
                  disabled={isSubmittingApproval || !lecturerSignature}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  {isSubmittingApproval ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mengesahkan...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Sahkan &amp; Bubuhkan Tanda Tangan (1-Klik)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
