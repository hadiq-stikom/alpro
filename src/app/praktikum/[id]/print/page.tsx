"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { Printer, ArrowLeft, CheckCircle2, Lock, AlertTriangle } from "lucide-react";
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
  const { profile } = useAuth();

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
        if (item) parsed = JSON.parse(item);
      } catch (e) {
        console.error("Gagal membaca fallbackKey:", e);
      }
    }
    // Scan alternatif jika ada key draf untuk modul ini
    if (!parsed && typeof window !== "undefined") {
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith(`lkp_draft_m${moduleId}_`)) {
            const raw = localStorage.getItem(k);
            if (raw) {
              parsed = JSON.parse(raw);
              break;
            }
          }
        }
      } catch (scanErr) {
        // ignore
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
    } else {
      setObservations(moduleData.defaultObservations);
    }

    // Ambil data remote submission dari database jika ada (bisa dari userId di searchParams atau profile)
    const targetUserId = (typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("userId") : null) || profile?.id;

    if (targetUserId) {
      fetch(`/api/praktikum/submission?userId=${targetUserId}&moduleId=${moduleId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.submission) {
            const sub = data.submission;

            // Pulihkan hasil pengamatan hanya jika DB memiliki data kustom
            if (Array.isArray(sub.observations) && sub.observations.length > 0) {
              setObservations((prev) => {
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

            // Pulihkan analisis hanya jika DB memiliki jawaban non-kosong
            if (
              Array.isArray(sub.analisis_answers) &&
              sub.analisis_answers.some((a: string) => typeof a === "string" && a.trim().length > 0)
            ) {
              setAnalisisAnswers((prev) => {
                const hasLocalAnswers = prev && prev.some((a: string) => typeof a === "string" && a.trim().length > 0);
                return hasLocalAnswers ? prev : sub.analisis_answers;
              });
            }

            // Pulihkan kesimpulan hanya jika DB memiliki teks non-kosong
            if (sub.kesimpulan_text && sub.kesimpulan_text.trim().length > 0) {
              setKesimpulanText((prev) => (prev && prev.trim().length > 0 ? prev : sub.kesimpulan_text));
            }

            if (sub.ai_evaluation && Object.keys(sub.ai_evaluation).length > 0) {
              setAiEvaluation((prev: any) => prev || sub.ai_evaluation);
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
    } else {
      setIsLoaded(true);
    }
  }, [moduleId, moduleData, profile]);

  const handlePrint = () => {
    window.print();
  };

  if (!moduleData) {
    return <div className="p-8 text-center">Modul tidak ditemukan.</div>;
  }

  // Cek apakah data sudah dimuat dari localStorage
  if (!isLoaded) {
    return <div className="p-12 text-center text-slate-400">Memuat data lembar kerja...</div>;
  }

  // Validasi ketat: Analisis lengkap, Kesimpulan terisi, dan LOLOS Ulasan AI (Skor >= 60)
  const totalAnalisis = moduleData.analisisPrompts.length;
  const filledAnalisis = analisisAnswers.filter((a) => a && a.trim().length > 0).length;
  const isAnalisisComplete = totalAnalisis > 0 && filledAnalisis === totalAnalisis;
  const isKesimpulanComplete = Boolean(kesimpulanText && kesimpulanText.trim().length > 0);
  const isAiApproved = Boolean(aiEvaluation && aiEvaluation.canPrint);
  const isReadyToPrint = isAnalisisComplete && isKesimpulanComplete && isAiApproved;

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
      {/* Action Bar (Hanya tampil di layar, tersembunyi saat cetak PDF) */}
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
            💡 Tips: Pada dialog cetak, pilih <strong>Save as PDF</strong> dan kertas <strong>A4</strong>
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
      {/* LEMBAR KERJA PRAKTIKUM A4 RESMI (PRINT CONTAINER)                        */}
      {/* ========================================================================= */}
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-xl print:shadow-none print:p-0 print:max-w-none text-black font-sans leading-normal border border-slate-300 print:border-none">
        
        {/* KOP RESMI LABORATORIUM */}
        <div className="text-center pb-3 border-b-2 border-black space-y-1">
          <h2 className="text-base font-bold tracking-widest uppercase text-black">
            Laboratorium Algoritma &amp; Pemrograman
          </h2>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-black">
            Program Studi Teknik Informatika
          </h1>
          <p className="text-sm font-medium text-black">
            Mata Kuliah: Praktikum Algoritma &amp; Pemrograman (KK112601) • Semester Ganjil 2024/2025
          </p>
          <div className="pt-2">
            <span className="inline-block px-5 py-1 text-sm font-black uppercase tracking-wider border-2 border-black bg-white">
              LEMBAR KERJA PRAKTIKUM (LKP) MAHASISWA
            </span>
          </div>
        </div>
        <div className="border-b border-black mb-6 mt-1"></div>

        {/* BLOK IDENTITAS PRAKTIKAN */}
        <div className="border-2 border-black p-4 mb-6 text-sm grid grid-cols-2 gap-y-2 gap-x-6 text-black">
          <div className="flex">
            <span className="w-32 font-bold shrink-0">Modul Praktikum</span>
            <span className="w-3">:</span>
            <span className="font-bold">Modul 0{moduleData.id} - {moduleData.title}</span>
          </div>
          <div className="flex">
            <span className="w-32 font-bold shrink-0">Tanggal Uji</span>
            <span className="w-3">:</span>
            <span className="font-medium">{labDate}</span>
          </div>
          <div className="flex">
            <span className="w-32 font-bold shrink-0">Nama Mahasiswa</span>
            <span className="w-3">:</span>
            <span className="font-bold uppercase tracking-wide">{studentName || "......................................................."}</span>
          </div>
          <div className="flex">
            <span className="w-32 font-bold shrink-0">Kelas</span>
            <span className="w-3">:</span>
            <span className="font-bold">{studentClass}</span>
          </div>
          <div className="flex">
            <span className="w-32 font-bold shrink-0">NIM</span>
            <span className="w-3">:</span>
            <span className="font-mono font-bold">{studentNim || "......................................................."}</span>
          </div>
          <div className="flex">
            <span className="w-32 font-bold shrink-0">Dosen Pengampu</span>
            <span className="w-3">:</span>
            <span className="font-bold">Hadiq, ST, M.Kom</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BAGIAN A: CAPAIAN PRAKTIKUM                                               */}
        {/* ========================================================================= */}
        <div className="mb-6 space-y-2">
          <h3 className="text-sm font-black uppercase tracking-wider border-b-2 border-black pb-1 text-black">
            A. Capaian Praktikum (Learning Outcomes)
          </h3>
          <ul className="list-decimal pl-6 text-xs sm:text-sm space-y-1.5 text-black leading-relaxed font-normal">
            {moduleData.capaian.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>

        {/* ========================================================================= */}
        {/* BAGIAN B: DASAR TEORI                                                     */}
        {/* ========================================================================= */}
        <div className="mb-6 space-y-2.5">
          <h3 className="text-sm font-black uppercase tracking-wider border-b-2 border-black pb-1 text-black">
            B. Dasar Teori &amp; Hipotesis Uji Laboratorium
          </h3>
          <p className="text-xs sm:text-sm text-justify text-black leading-relaxed font-normal">
            {moduleData.dasarTeori.leadParagraph || moduleData.dasarTeori.overview}
          </p>

          {moduleData.dasarTeori.fundamentalPillars && moduleData.dasarTeori.fundamentalPillars.length > 0 && (
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              {moduleData.dasarTeori.fundamentalPillars.map((fp) => (
                <div key={fp.number} className="border border-black p-2 rounded bg-slate-50 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[10.5px] uppercase tracking-tight text-black">
                      #{fp.number} {fp.title}
                    </span>
                    {fp.tag && (
                      <span className="text-[9px] font-mono font-bold border border-black px-1 rounded">
                        {fp.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-800 leading-snug">
                    {fp.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Rincian Pilar Dasar Teori & Parameter Uji */}
          {moduleData.dasarTeori.points && moduleData.dasarTeori.points.length > 0 && (
            <div className="mt-3 space-y-2 text-xs text-black border-t border-slate-300 pt-2.5">
              {moduleData.dasarTeori.points.map((p, idx) => (
                <div key={idx} className="border-l-2 border-slate-800 pl-3 py-0.5 space-y-1">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <span className="font-bold text-xs uppercase tracking-tight text-black">
                      {p.title}
                    </span>
                    {p.relatedScenarios && (
                      <span className="text-[10px] font-semibold italic text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-300">
                        {p.relatedScenarios}
                      </span>
                    )}
                  </div>
                  {p.leadSentence && (
                    <p className="text-[11px] leading-relaxed text-black font-semibold">
                      <span className="underline">Intisari:</span> {p.leadSentence}
                    </p>
                  )}
                  {p.keyPoints && p.keyPoints.length > 0 ? (
                    <ul className="text-[10.5px] text-slate-900 space-y-0.5 list-disc pl-4">
                      {p.keyPoints.map((kp, kIdx) => (
                        <li key={kIdx}>
                          <span className="font-bold">{kp.label}:</span> {kp.detail}{" "}
                          {kp.code && <span className="font-mono font-semibold">[{kp.code}]</span>}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[11px] leading-relaxed text-justify text-slate-900 font-normal">
                      {p.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* BAGIAN C: TABEL PENGAMATAN & PENGUKURAN                                   */}
        {/* ========================================================================= */}
        <div className="mb-7 space-y-2.5">
          <div className="flex items-center justify-between border-b-2 border-black pb-1">
            <h3 className="text-sm font-black uppercase tracking-wider text-black">
              C. Tabel Pengamatan &amp; Pengukuran Empiris
            </h3>
            <span className="text-xs italic text-black font-medium">Instrumen Pencatatan Hasil Uji Komputasi</span>
          </div>

          <table className="w-full border-collapse border-2 border-black text-xs text-black">
            <thead>
              <tr className="bg-slate-100 text-black border-b-2 border-black">
                <th className="border border-black p-2 text-center w-8 font-bold">No</th>
                <th className="border border-black p-2 text-left w-40 font-bold">Skenario Pengujian</th>
                <th className="border border-black p-2 text-left w-36 font-bold">Masukan / Kode Uji</th>
                <th className="border border-black p-2 text-left w-40 font-bold">Prediksi Teori</th>
                <th className="border border-black p-2 text-left w-44 font-bold">Hasil Aktual Komputer</th>
                <th className="border border-black p-2 text-left w-36 font-bold">Metrik Terukur</th>
                <th className="border border-black p-2 text-center w-24 font-bold">Validasi</th>
              </tr>
            </thead>
            <tbody>
              {observations.map((row, idx) => (
                <tr key={idx} className="border-b border-black">
                  <td className="border border-black p-2 text-center font-bold">{row.no}</td>
                  <td className="border border-black p-2 font-medium leading-snug">{row.scenario}</td>
                  <td className="border border-black p-2 font-mono font-bold leading-snug">{row.testInput}</td>
                  <td className="border border-black p-2 leading-snug">{row.expectedTheory}</td>
                  <td className="border border-black p-2 font-bold leading-snug">{row.actualOutput}</td>
                  <td className="border border-black p-2 leading-snug">{row.measuredMetric}</td>
                  <td className="border border-black p-2 text-center font-bold">
                    {row.validationStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ========================================================================= */}
        {/* BAGIAN D: ANALISIS & PEMBAHASAN                                           */}
        {/* ========================================================================= */}
        <div className="mb-7 space-y-3 page-break-inside-avoid">
          <h3 className="text-sm font-black uppercase tracking-wider border-b-2 border-black pb-1 text-black">
            D. Analisis &amp; Pembahasan Hasil Pengukuran
          </h3>
          <div className="space-y-4 text-xs sm:text-sm text-black">
            {moduleData.analisisPrompts.map((prompt, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="font-bold text-black leading-snug">
                  {idx + 1}. {prompt}
                </div>
                <div className="pl-4 italic text-justify text-black min-h-[48px] border-l-2 border-black py-1 leading-relaxed">
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
        {/* BAGIAN E: KESIMPULAN                                                      */}
        {/* ========================================================================= */}
        <div className="mb-8 space-y-2.5 page-break-inside-avoid">
          <h3 className="text-sm font-black uppercase tracking-wider border-b-2 border-black pb-1 text-black">
            E. Kesimpulan Ilmiah
          </h3>
          <div className="text-xs sm:text-sm text-justify text-black pl-4 border-l-2 border-black py-1.5 min-h-[56px] leading-relaxed">
            {kesimpulanText || (
              <span className="text-slate-500 italic">
                [Mahasiswa belum mengisi kesimpulan akhir pada formulir web]
              </span>
            )}
          </div>
        </div>

        {/* BADGE AUDIT AI LAB REVIEWER */}
        {aiEvaluation && (
          <div className="mb-4 p-2.5 border border-black bg-slate-50 flex items-center justify-between text-xs text-black page-break-inside-avoid">
            <div className="flex items-center gap-2">
              <span className="font-bold font-mono uppercase text-[11px] bg-black text-white px-2 py-0.5">
                AI PRE-GRADING VERIFIED
              </span>
              <span className="font-semibold">
                Skor Kelayakan Ilmiah: <strong>{aiEvaluation.score} / 100</strong> ({aiEvaluation.status})
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-700">
              Audit Sistem: {aiEvaluation.provider?.toUpperCase() || "AI"} • {aiEvaluation.evaluatedAt || labDate}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LEMBAR PENGESAHAN & PENILAIAN DOSEN                                       */}
        {/* ========================================================================= */}
        <div className="border-2 border-black p-5 text-sm page-break-inside-avoid space-y-4 text-black">
          <div className="flex items-center justify-between border-b border-black pb-2.5">
            <div>
              <div className="font-bold text-sm uppercase tracking-wider text-black">
                Lembar Penilaian &amp; Pengesahan Laboratorium
              </div>
              <div className="text-[11px] font-mono text-slate-700">
                Mata Kuliah Praktikum Algoritma &amp; Pemrograman (1 SKS)
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono font-bold text-black">
              <span>Nilai / Skor Akhir :</span>
              <span className="border-2 border-black px-4 py-1 text-base inline-block min-w-[90px] text-center font-black bg-slate-50">
                {lecturerScore !== null
                  ? `${lecturerScore} / 100`
                  : aiEvaluation?.score
                  ? `${aiEvaluation.score} / 100*`
                  : "....... / 100"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 text-center pt-2 gap-8">
            {/* Kolom Mahasiswa Praktikan */}
            <div className="space-y-2 flex flex-col justify-between h-44">
              <div className="space-y-0.5">
                <p className="text-xs">Menyatakan Kebenaran Hasil Uji,</p>
                <p className="font-bold text-sm">Mahasiswa Praktikan,</p>
              </div>

              <div className="h-20 flex items-center justify-center">
                {studentSignature ? (
                  <img
                    src={studentSignature}
                    alt="Tanda Tangan Mahasiswa"
                    className="max-h-20 max-w-[200px] object-contain mx-auto filter drop-shadow-sm"
                  />
                ) : (
                  <div className="border-b border-dashed border-slate-400 w-44 mx-auto mt-14" />
                )}
              </div>

              <div>
                <p className="font-bold text-sm uppercase underline text-black">
                  {studentName || "( ..................................................... )"}
                </p>
                <p className="font-mono text-xs font-semibold text-black mt-0.5">
                  NIM. {studentNim || "......................................."}
                </p>
              </div>
            </div>

            {/* Kolom Dosen Pengampu */}
            <div className="space-y-2 flex flex-col justify-between h-44">
              <div className="space-y-0.5">
                <p className="text-xs">Menyetujui &amp; Mengesahkan,</p>
                <p className="font-bold text-sm">Dosen Pengampu Laboratorium,</p>
              </div>

              <div className="h-20 flex items-center justify-center">
                {lecturerSignature ? (
                  <div className="text-center space-y-0.5">
                    <img
                      src={lecturerSignature}
                      alt="Tanda Tangan Dosen"
                      className="max-h-16 max-w-[220px] object-contain mx-auto filter drop-shadow-sm"
                    />
                    <span className="text-[9px] font-mono text-slate-600 block">
                      Tanda Tangan Digital Sah • {lecturerSignedAt ? new Date(lecturerSignedAt).toLocaleDateString("id-ID") : labDate}
                    </span>
                  </div>
                ) : (
                  <div className="border-b border-dashed border-slate-400 w-44 mx-auto mt-14" />
                )}
              </div>

              <div>
                <p className="font-bold text-sm underline text-black">Hadiq, ST, M.Kom</p>
                <p className="text-xs font-semibold text-black mt-0.5">NIDN: 0713077804</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
