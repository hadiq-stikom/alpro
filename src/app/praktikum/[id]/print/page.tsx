"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { Printer, ArrowLeft, CheckCircle2, Lock, AlertTriangle, Loader2 } from "lucide-react";
import { PRAKTIKUM_MODULES, ObservationRow } from "@/lib/praktikum-data";
import { useAuth } from "@/context/AuthContext";

export default function PraktikumPrintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const moduleId = parseInt(unwrappedParams.id, 10);
  const moduleData = PRAKTIKUM_MODULES.find((m) => m.id === moduleId);
  const { profile, loading: profileLoading } = useAuth();

  const [studentName, setStudentName] = useState("");
  const [studentNim, setStudentNim] = useState("");
  const [studentClass, setStudentClass] = useState("TI-SP1");
  const [labDate, setLabDate] = useState("");

  const [observations, setObservations] = useState<ObservationRow[]>([]);
  const [analisisAnswers, setAnalisisAnswers] = useState<string[]>([]);
  const [kesimpulanText, setKesimpulanText] = useState("");
  const [aiEvaluation, setAiEvaluation] = useState<any | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // State tanda tangan & pengesahan resmi dosen
  const [studentSignature, setStudentSignature] = useState<string | null>(null);
  const [lecturerSignature, setLecturerSignature] = useState<string | null>(null);
  const [lecturerScore, setLecturerScore] = useState<number | null>(null);
  const [lecturerSignedAt, setLecturerSignedAt] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<string>("draft");

  useEffect(() => {
    // Tanggal default
    const today = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setLabDate(today);

    if (profile) {
      setStudentName(profile.full_name || "");
      setStudentNim(profile.nim || "");
    }

    if (!moduleData) {
      setIsLoaded(true);
      return;
    }

    const specificKey = profile?.nim ? `lkp_draft_m${moduleId}_${profile.nim}` : null;
    const fallbackKey = `lkp_draft_m${moduleId}_local`;
    let parsed: any = null;

    if (specificKey) {
      try {
        const item = localStorage.getItem(specificKey);
        if (item) parsed = JSON.parse(item);
      } catch (e) {
        console.error("Gagal membaca specificKey:", e);
      }
    }
    if (!parsed) {
      try {
        const item = localStorage.getItem(fallbackKey);
        if (item) {
          const rawParsed = JSON.parse(item);
          if (!profile?.nim || !rawParsed.studentNim || rawParsed.studentNim === profile.nim) {
            parsed = rawParsed;
          }
        }
      } catch (e) {
        console.error("Gagal membaca fallbackKey:", e);
      }
    }

    if (parsed) {
      if (Array.isArray(parsed.observations) && parsed.observations.length > 0) {
        setObservations(parsed.observations);
      } else {
        setObservations(moduleData.defaultObservations);
      }
      if (Array.isArray(parsed.analisisAnswers)) {
        setAnalisisAnswers(parsed.analisisAnswers);
      }
      if (parsed.kesimpulanText) {
        setKesimpulanText(parsed.kesimpulanText);
      }
      if (parsed.aiEvaluation) setAiEvaluation(parsed.aiEvaluation);
      if (parsed.studentName) setStudentName(parsed.studentName);
      if (parsed.studentNim) setStudentNim(parsed.studentNim);
      if (parsed.studentClass) setStudentClass(parsed.studentClass);
      if (parsed.labDate) setLabDate(parsed.labDate);
      if (parsed.studentSignature) setStudentSignature(parsed.studentSignature);
      if (parsed.lecturerSignature) setLecturerSignature(parsed.lecturerSignature);
      if (parsed.lecturerScore !== null && parsed.lecturerScore !== undefined) {
        setLecturerScore(Number(parsed.lecturerScore));
      }
      if (parsed.lecturerSignedAt) setLecturerSignedAt(parsed.lecturerSignedAt);
      if (parsed.submissionStatus) setSubmissionStatus(parsed.submissionStatus);
    } else {
      setObservations(moduleData.defaultObservations);
    }

    // Ambil data remote submission dari database jika ada (bisa dari userId di searchParams atau profile)
    const searchParamsUserId = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("userId") : null;
    const targetUserId = searchParamsUserId || profile?.id;

    if (targetUserId) {
      fetch(`/api/praktikum/submission?userId=${targetUserId}&moduleId=${moduleId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.submission) {
            const sub = data.submission;
            const isOfficial = sub.status === "submitted" || sub.status === "disetujui" || sub.status === "graded";
            const remoteHasObs = Array.isArray(sub.observations) && sub.observations.length > 0;
            const remoteHasAnalysis =
              Array.isArray(sub.analisis_answers) &&
              sub.analisis_answers.some((a: string) => typeof a === "string" && a.trim().length > 0);
            const remoteHasKesimpulan = Boolean(sub.kesimpulan_text && sub.kesimpulan_text.trim().length > 0);

            // Pulihkan hasil pengamatan
            if (remoteHasObs) {
              setObservations((prev) => {
                if (isOfficial) return sub.observations;
                const hasLocalData =
                  prev &&
                  prev.some(
                    (row) =>
                      (row.actualOutput && row.actualOutput.trim().length > 0) ||
                      (row.validationStatus && row.validationStatus !== "Belum Diuji")
                  );
                return hasLocalData ? prev : sub.observations;
              });
            }

            // Pulihkan analisis
            if (remoteHasAnalysis) {
              setAnalisisAnswers((prev) => {
                if (isOfficial) return sub.analisis_answers;
                const hasLocalAnswers = prev && prev.some((a: string) => typeof a === "string" && a.trim().length > 0);
                return hasLocalAnswers ? prev : sub.analisis_answers;
              });
            }

            // Pulihkan kesimpulan
            if (remoteHasKesimpulan) {
              setKesimpulanText((prev) => {
                if (isOfficial) return sub.kesimpulan_text;
                return prev && prev.trim().length > 0 ? prev : sub.kesimpulan_text;
              });
            }

            if (sub.ai_evaluation && Object.keys(sub.ai_evaluation).length > 0) {
              setAiEvaluation(sub.ai_evaluation);
            }
            if (sub.student_signature) setStudentSignature((prev) => prev || sub.student_signature);
            if (sub.lecturer_signature) setLecturerSignature(sub.lecturer_signature);
            if (sub.lecturer_score !== null && sub.lecturer_score !== undefined) {
              setLecturerScore(Number(sub.lecturer_score));
            }
            if (sub.lecturer_signed_at) setLecturerSignedAt(sub.lecturer_signed_at);
            if (sub.status) setSubmissionStatus(sub.status);
            if (sub.student_name) setStudentName((prev) => prev || sub.student_name);
            if (sub.student_nim) setStudentNim((prev) => prev || sub.student_nim);
            if (sub.student_class) setStudentClass((prev) => prev || sub.student_class);
            if (sub.lab_date) setLabDate((prev) => prev || sub.lab_date);
          }
        })
        .catch((err) => console.warn("Gagal memuat status pengesahan cetak remote:", err))
        .finally(() => setIsLoaded(true));
    } else if (!profileLoading) {
      setIsLoaded(true);
    }
  }, [moduleId, moduleData, profile, profileLoading]);

  const handlePrint = () => {
    window.print();
  };

  if (!moduleData) {
    return <div className="p-8 text-center">Modul tidak ditemukan.</div>;
  }

  const searchParamsUserId = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("userId") : null;

  // Cek apakah data sudah dimuat dari localStorage atau database
  if (!isLoaded || (profileLoading && !searchParamsUserId)) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-12 text-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
        <p className="text-sm text-slate-300">Memverifikasi status pengesahan &amp; memuat dokumen cetak...</p>
      </div>
    );
  }

  // Validasi kelayakan cetak:
  // 1. Analisis lengkap & Kesimpulan terisi
  // 2. OTORITAS TERTINGGI: Laporan telah disetujui / disahkan oleh Dosen Pengampu (submissionStatus === 'disetujui' || tanda tangan dosen ada || nilai dosen ada),
  //    ATAU telah memenuhi ambang batas AI Pre-Grading Reviewer (skor >= 60).
  const totalAnalisis = moduleData.analisisPrompts.length;
  const filledAnalisis = analisisAnswers.filter((a) => a && a.trim().length > 0).length;
  const isAnalisisComplete = totalAnalisis > 0 && filledAnalisis === totalAnalisis;
  const isKesimpulanComplete = Boolean(kesimpulanText && kesimpulanText.trim().length > 0);
  const isApprovedByLecturer =
    submissionStatus === "disetujui" ||
    Boolean(lecturerSignature) ||
    (lecturerScore !== null && lecturerScore !== undefined);
  const isAiApproved = Boolean(aiEvaluation && aiEvaluation.canPrint);
  const isReadyToPrint = isAnalisisComplete && isKesimpulanComplete && (isApprovedByLecturer || isAiApproved);

  if (!isReadyToPrint) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-950 border border-amber-500/40 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white tracking-tight">Dokumen Laporan Terkunci</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Dokumen cetak resmi A4 belum dapat dibuka karena belum memenuhi syarat kelayakan ilmiah laboratorium.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-left space-y-2.5 font-medium">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Pertanyaan Analisis:</span>
              <span className={isAnalisisComplete ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                {filledAnalisis} / {totalAnalisis} terjawab
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Kesimpulan Ilmiah:</span>
              <span className={isKesimpulanComplete ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                {isKesimpulanComplete ? "✓ Sudah diisi" : "✗ Masih kosong"}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-800 pt-2">
              <span className="text-slate-400">Validasi AI Lab Reviewer:</span>
              <span className={isAiApproved ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                {aiEvaluation 
                  ? `${aiEvaluation.status} (${aiEvaluation.score}/100)` 
                  : "Belum diuji oleh AI"}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-800 pt-2">
              <span className="text-slate-400">Pengesahan Dosen:</span>
              <span className={isApprovedByLecturer ? "text-emerald-400 font-bold" : "text-slate-400 font-medium"}>
                {isApprovedByLecturer 
                  ? `✓ Disahkan (${lecturerScore ?? 100}/100)` 
                  : "Belum disahkan"}
              </span>
            </div>
          </div>
          <Link
            href={`/praktikum/${moduleData.id}`}
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali &amp; Uji dengan AI di Lembar Kerja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-6 print:py-0 print:bg-white text-slate-900">
      {/* INJEKSI ATURAN CSS CETAK RESMI (@page & @media print) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @page {
          size: A4 portrait;
          margin: 12mm 15mm 12mm 15mm;
        }
        @media print {
          html, body, .print-container {
            font-family: var(--font-nunito), 'Nunito', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-page-break-after {
            break-after: page !important;
            page-break-after: always !important;
          }
          .print-page-break-before {
            break-before: page !important;
            page-break-before: always !important;
          }
          .print-avoid-break {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
          table {
            page-break-inside: auto;
          }
          tr {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
          thead {
            display: table-header-group !important;
          }
          tfoot {
            display: table-footer-group !important;
          }
        }
      `}} />

      {/* Action Bar (Hanya tampil di layar monitor, tersembunyi saat cetak PDF) */}
      <div className="max-w-4xl mx-auto px-4 mb-6 print:hidden flex items-center justify-between">
        <Link
          href={`/praktikum/${moduleData.id}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-cyan-500 transition-colors bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Form Lembar Kerja
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
            💡 Tips Cetak: Pilih <strong>Save as PDF</strong>, Kertas <strong>A4</strong>, dan centang <strong>Background graphics</strong>
          </span>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Cetak / Simpan PDF
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEMBAR KERJA PRAKTIKUM A4 RESMI (PRINT CONTAINER DENGAN FONT NUNITO)      */}
      {/* ========================================================================= */}
      <div className="print-container max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-xl print:shadow-none print:p-0 print:max-w-none text-black font-nunito leading-normal border border-slate-300 print:border-none">
        
        {/* ========================================================================= */}
        {/* BAGIAN I: KOP KAMPUS, IDENTITAS, CAPAIAN, & DASAR TEORI (HALAMAN 1 TUNTAS) */}
        {/* ========================================================================= */}
        <div className="print-page-break-after">
          
          {/* KOP RESMI STIKOM PGRI BANYUWANGI */}
          <div className="border-b-2 border-black pb-2 mb-2.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <img
                  src="/kop-kampus.png"
                  alt="STIKOM PGRI Banyuwangi"
                  className="h-12 sm:h-14 w-auto object-contain"
                />
              </div>
              <div className="text-right shrink-0">
                <div className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-black">
                  Laboratorium Algoritma &amp; Pemrograman
                </div>
                <div className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">
                  Program Studi S1 Teknik Informatika
                </div>
                <div className="text-[9px] text-slate-600 font-medium">
                  Jl. Jenderal A. Yani No. 80 Banyuwangi
                </div>
              </div>
            </div>
            <div className="border-t border-black mt-2 pt-1 text-center">
              <span className="inline-block px-4 py-0.5 text-xs font-black uppercase tracking-wider border-2 border-black bg-slate-100">
                LEMBAR KERJA PRAKTIKUM (LKP) MAHASISWA
              </span>
            </div>
          </div>

          {/* BLOK IDENTITAS PRAKTIKAN (DILENGKAPI KODE MATA KULIAH) */}
          <div className="border-2 border-black p-2.5 mb-2.5 text-xs grid grid-cols-2 gap-y-1 gap-x-6 text-black bg-white">
            <div className="flex">
              <span className="w-28 font-bold shrink-0">Mata Kuliah</span>
              <span className="w-3">:</span>
              <span className="font-bold">Praktikum Algoritma &amp; Pemrograman</span>
            </div>
            <div className="flex">
              <span className="w-28 font-bold shrink-0">Tanggal Uji</span>
              <span className="w-3">:</span>
              <span className="font-medium">{labDate}</span>
            </div>

            <div className="flex">
              <span className="w-28 font-bold shrink-0">Kode MK / Bobot</span>
              <span className="w-3">:</span>
              <span className="font-mono font-bold text-black">KK112601 / 1 SKS</span>
            </div>
            <div className="flex">
              <span className="w-28 font-bold shrink-0">Kelas</span>
              <span className="w-3">:</span>
              <span className="font-bold">{studentClass}</span>
            </div>

            <div className="flex">
              <span className="w-28 font-bold shrink-0">Modul Praktikum</span>
              <span className="w-3">:</span>
              <span className="font-bold">Modul 0{moduleData.id} - {moduleData.title}</span>
            </div>
            <div className="flex">
              <span className="w-28 font-bold shrink-0">NIM</span>
              <span className="w-3">:</span>
              <span className="font-mono font-bold">{studentNim || "......................................."}</span>
            </div>

            <div className="flex">
              <span className="w-28 font-bold shrink-0">Dosen Pengampu</span>
              <span className="w-3">:</span>
              <span className="font-bold">Hadiq, ST, M.Kom</span>
            </div>
            <div className="flex">
              <span className="w-28 font-bold shrink-0">Nama Praktikan</span>
              <span className="w-3">:</span>
              <span className="font-bold uppercase tracking-wide">{studentName || "......................................."}</span>
            </div>
          </div>

          {/* BAGIAN A: CAPAIAN PRAKTIKUM */}
          <div className="mb-2.5 space-y-1">
            <h3 className="text-xs font-black uppercase tracking-wider border-b-2 border-black pb-0.5 text-black">
              A. Capaian Praktikum (Learning Outcomes)
            </h3>
            <ul className="list-decimal pl-5 text-[10px] space-y-0.5 text-black leading-tight font-normal">
              {moduleData.capaian.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          {/* BAGIAN B: DASAR TEORI & HIPOTESIS UJI LABORATORIUM */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-black uppercase tracking-wider border-b-2 border-black pb-0.5 text-black">
              B. Dasar Teori &amp; Hipotesis Uji Laboratorium
            </h3>
            <p className="text-[9.5px] text-justify text-black leading-tight font-normal">
              {moduleData.dasarTeori.leadParagraph || moduleData.dasarTeori.overview}
            </p>

            {moduleData.dasarTeori.fundamentalPillars && moduleData.dasarTeori.fundamentalPillars.length > 0 && (
              <div className="grid grid-cols-2 gap-2 text-[9.5px] pt-0.5">
                {moduleData.dasarTeori.fundamentalPillars.map((fp) => (
                  <div key={fp.number} className="border border-black p-1.5 rounded bg-slate-50 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[9px] uppercase tracking-tight text-black">
                        #{fp.number} {fp.title}
                      </span>
                      {fp.tag && (
                        <span className="text-[8px] font-mono font-bold border border-black px-1 rounded bg-white">
                          {fp.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[9px] text-slate-800 leading-tight">
                      {fp.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Rincian Pilar Dasar Teori & Parameter Uji */}
            {moduleData.dasarTeori.points && moduleData.dasarTeori.points.length > 0 && (
              <div className="mt-1 space-y-1 text-[9.5px] text-black border-t border-slate-300 pt-1">
                {moduleData.dasarTeori.points.map((p, idx) => (
                  <div key={idx} className="border-l-2 border-slate-800 pl-2.5 py-0.5 space-y-0.5">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <span className="font-bold text-[9.5px] uppercase tracking-tight text-black">
                        {p.title}
                      </span>
                      {p.relatedScenarios && (
                        <span className="text-[8.5px] font-semibold italic text-slate-700 bg-slate-100 px-1 rounded border border-slate-300">
                          {p.relatedScenarios}
                        </span>
                      )}
                    </div>
                    {p.leadSentence && (
                      <p className="text-[9px] leading-tight text-black font-semibold">
                        <span className="underline">Intisari:</span> {p.leadSentence}
                      </p>
                    )}
                    {p.keyPoints && p.keyPoints.length > 0 ? (
                      <ul className="text-[9px] text-slate-900 space-y-0.5 list-disc pl-3 leading-tight">
                        {p.keyPoints.map((kp, kIdx) => (
                          <li key={kIdx}>
                            <span className="font-bold">{kp.label}:</span> {kp.detail}{" "}
                            {kp.code && <span className="font-mono font-semibold">[{kp.code}]</span>}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[9px] leading-tight text-justify text-slate-900 font-normal">
                        {p.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BAGIAN II: TABEL PENGAMATAN & PENGUKURAN EMPIRIS (HALAMAN BARU)          */}
        {/* ========================================================================= */}
        <div className="print-page-break-before mb-5 space-y-2">
          <div className="flex items-center justify-between border-b-2 border-black pb-1">
            <h3 className="text-xs font-black uppercase tracking-wider text-black">
              C. Tabel Pengamatan &amp; Pengukuran Empiris
            </h3>
            <span className="text-[10px] italic text-black font-medium">Instrumen Pencatatan Hasil Uji Komputasi</span>
          </div>

          <table className="w-full border-collapse border-2 border-black text-[10.5px] text-black">
            <thead>
              <tr className="bg-slate-100 text-black border-b-2 border-black">
                <th className="border border-black p-1.5 text-center w-8 font-bold">No</th>
                <th className="border border-black p-1.5 text-left w-36 font-bold">Skenario Pengujian</th>
                <th className="border border-black p-1.5 text-left w-36 font-bold">Masukan / Kode Uji</th>
                <th className="border border-black p-1.5 text-left w-36 font-bold">Prediksi Teori</th>
                <th className="border border-black p-1.5 text-left w-40 font-bold">Hasil Aktual Komputer</th>
                <th className="border border-black p-1.5 text-left w-32 font-bold">Metrik Terukur</th>
                <th className="border border-black p-1.5 text-center w-20 font-bold">Validasi</th>
              </tr>
            </thead>
            <tbody>
              {observations.map((row, idx) => (
                <tr key={idx} className="border-b border-black print-avoid-break">
                  <td className="border border-black p-1.5 text-center font-bold">{row.no}</td>
                  <td className="border border-black p-1.5 font-medium leading-tight">{row.scenario}</td>
                  <td className="border border-black p-1.5 font-mono font-bold leading-tight">{row.testInput}</td>
                  <td className="border border-black p-1.5 leading-tight">{row.expectedTheory}</td>
                  <td className="border border-black p-1.5 font-bold leading-tight">{row.actualOutput}</td>
                  <td className="border border-black p-1.5 leading-tight">{row.measuredMetric}</td>
                  <td className="border border-black p-1.5 text-center font-bold">
                    {row.validationStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ========================================================================= */}
        {/* BAGIAN III: ANALISIS & PEMBAHASAN HASIL PENGUKURAN                         */}
        {/* ========================================================================= */}
        <div className="mb-5 space-y-2.5">
          <h3 className="text-xs font-black uppercase tracking-wider border-b-2 border-black pb-1 text-black">
            D. Analisis &amp; Pembahasan Hasil Pengukuran
          </h3>
          <div className="space-y-3 text-xs text-black">
            {moduleData.analisisPrompts.map((prompt, idx) => (
              <div key={idx} className="print-avoid-break space-y-1">
                <div className="font-bold text-black text-xs leading-snug">
                  {idx + 1}. {prompt}
                </div>
                <div className="pl-3.5 italic text-justify text-black min-h-[44px] border-l-2 border-black py-1 leading-relaxed bg-slate-50/50 text-[11px]">
                  {analisisAnswers[idx] || (
                    <span className="text-slate-500 italic">
                      [Mahasiswa belum mengisi analisis untuk butir ini pada formulir web]
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BAGIAN IV: KESIMPULAN ILMIAH & PENGESAHAN LABORATORIUM                    */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          {/* KESIMPULAN ILMIAH */}
          <div className="print-avoid-break space-y-1.5">
            <h3 className="text-xs font-black uppercase tracking-wider border-b-2 border-black pb-1 text-black">
              E. Kesimpulan Ilmiah
            </h3>
            <div className="text-xs text-justify text-black pl-3.5 border-l-2 border-black py-1.5 min-h-[48px] leading-relaxed bg-slate-50/50 text-[11px]">
              {kesimpulanText || (
                <span className="text-slate-500 italic">
                  [Mahasiswa belum mengisi kesimpulan akhir pada formulir web]
                </span>
              )}
            </div>
          </div>

          {/* BADGE AUDIT AI LAB REVIEWER */}
          {aiEvaluation && (
            <div className="print-avoid-break p-2 border border-black bg-slate-50 flex items-center justify-between text-xs text-black">
              <div className="flex items-center gap-2">
                <span className="font-bold font-mono uppercase text-[10px] bg-black text-white px-2 py-0.5">
                  AI PRE-GRADING VERIFIED
                </span>
                <span className="font-semibold text-[11px]">
                  Skor Kelayakan Ilmiah: <strong>{aiEvaluation.score} / 100</strong> ({aiEvaluation.status})
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-700">
                Audit Sistem: {aiEvaluation.provider?.toUpperCase() || "AI"} • {aiEvaluation.evaluatedAt || labDate}
              </div>
            </div>
          )}

          {/* LEMBAR PENGESAHAN & PENILAIAN DOSEN */}
          <div className="print-avoid-break border-2 border-black p-4 text-xs space-y-3 text-black bg-white">
            <div className="flex items-center justify-between border-b border-black pb-2">
              <div>
                <div className="font-bold text-xs uppercase tracking-wider text-black">
                  Lembar Penilaian &amp; Pengesahan Laboratorium
                </div>
                <div className="text-[10px] font-mono text-slate-700">
                  Mata Kuliah Praktikum Algoritma &amp; Pemrograman (KK112601 • 1 SKS)
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono font-bold text-black">
                <span>Nilai / Skor Akhir :</span>
                <span className="border-2 border-black px-3 py-1 text-sm inline-block min-w-[80px] text-center font-black bg-slate-50">
                  {lecturerScore !== null
                    ? `${lecturerScore} / 100`
                    : aiEvaluation?.score
                    ? `${aiEvaluation.score} / 100*`
                    : "....... / 100"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 text-center pt-1 gap-6">
              {/* Kolom Mahasiswa Praktikan */}
              <div className="space-y-1.5 flex flex-col justify-between h-36">
                <div className="space-y-0.5">
                  <p className="text-[11px]">Menyatakan Kebenaran Hasil Uji,</p>
                  <p className="font-bold text-xs">Mahasiswa Praktikan,</p>
                </div>

                <div className="h-16 flex items-center justify-center">
                  {studentSignature ? (
                    <img
                      src={studentSignature}
                      alt="Tanda Tangan Mahasiswa"
                      className="max-h-16 max-w-[180px] object-contain mx-auto filter drop-shadow-sm"
                    />
                  ) : (
                    <div className="border-b border-dashed border-slate-400 w-36 mx-auto mt-10" />
                  )}
                </div>

                <div>
                  <p className="font-bold text-xs uppercase underline text-black">
                    {studentName || "( ..................................................... )"}
                  </p>
                  <p className="font-mono text-[10px] font-semibold text-black mt-0.5">
                    NIM. {studentNim || "......................................."}
                  </p>
                </div>
              </div>

              {/* Kolom Dosen Pengampu */}
              <div className="space-y-1.5 flex flex-col justify-between h-36">
                <div className="space-y-0.5">
                  <p className="text-[11px]">Menyetujui &amp; Mengesahkan,</p>
                  <p className="font-bold text-xs">Dosen Pengampu Laboratorium,</p>
                </div>

                <div className="h-16 flex items-center justify-center">
                  {lecturerSignature ? (
                    <div className="text-center space-y-0.5">
                      <img
                        src={lecturerSignature}
                        alt="Tanda Tangan Dosen"
                        className="max-h-14 max-w-[200px] object-contain mx-auto filter drop-shadow-sm"
                      />
                      <span className="text-[8.5px] font-mono text-slate-600 block">
                        Tanda Tangan Digital Sah • {lecturerSignedAt ? new Date(lecturerSignedAt).toLocaleDateString("id-ID") : labDate}
                      </span>
                    </div>
                  ) : (
                    <div className="border-b border-dashed border-slate-400 w-36 mx-auto mt-10" />
                  )}
                </div>

                <div>
                  <p className="font-bold text-xs underline text-black">Hadiq, ST, M.Kom</p>
                  <p className="text-[10px] font-semibold text-black mt-0.5">NIDN: 0713077804</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BAGIAN LAMPIRAN: LISTING ALGORITMA & KODE PROGRAM LENGKAP (JIKA TERSEDIA) */}
        {/* ========================================================================= */}
        {Boolean((moduleData as any).lampiran || (moduleData as any).fullAlgorithmCode) && (
          <div className="print-page-break-before pt-2 space-y-3">
            <div className="border-b-2 border-black pb-1">
              <h3 className="text-xs font-black uppercase tracking-wider text-black">
                Lampiran: Listing Algoritma &amp; Kode Sumber Lengkap
              </h3>
              <p className="text-[10px] text-slate-600">
                Dokumentasi Algoritma &amp; Source Code Modul 0{moduleData.id} ({moduleData.title})
              </p>
            </div>
            <div className="border border-black p-3 font-mono text-[9.5px] leading-relaxed bg-slate-50 text-black whitespace-pre-wrap">
              {(moduleData as any).lampiran || (moduleData as any).fullAlgorithmCode}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
