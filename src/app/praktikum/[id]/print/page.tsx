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

    const storageKey = `lkp_draft_m${moduleId}_${profile?.nim || "local"}`;
    const savedDraft = localStorage.getItem(storageKey);

    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setObservations(parsed.observations || moduleData.defaultObservations);
        setAnalisisAnswers(parsed.analisisAnswers || []);
        setKesimpulanText(parsed.kesimpulanText || "");
        if (parsed.aiEvaluation) setAiEvaluation(parsed.aiEvaluation);
        if (parsed.studentName) setStudentName(parsed.studentName);
        if (parsed.studentNim) setStudentNim(parsed.studentNim);
        if (parsed.studentClass) setStudentClass(parsed.studentClass);
        if (parsed.labDate) setLabDate(parsed.labDate);
        setIsLoaded(true);
        return;
      } catch (e) {
        console.error("Gagal membaca draf lokal:", e);
      }
    }

    setObservations(moduleData.defaultObservations);
    setIsLoaded(true);
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
            Mata Kuliah: Praktikum Algoritma &amp; Pemrograman (TI-101P) • Semester Ganjil 2024/2025
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
        <div className="mb-6 space-y-2">
          <h3 className="text-sm font-black uppercase tracking-wider border-b-2 border-black pb-1 text-black">
            B. Dasar Teori &amp; Hipotesis Uji
          </h3>
          <p className="text-xs sm:text-sm text-justify text-black leading-relaxed font-normal">
            {moduleData.dasarTeori.overview}
          </p>
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
        <div className="border-2 border-black p-5 text-sm page-break-inside-avoid space-y-5 text-black">
          <div className="flex items-center justify-between border-b border-black pb-2.5">
            <div className="font-bold text-sm uppercase tracking-wider text-black">
              Lembar Penilaian &amp; Pengesahan Laboratorium
            </div>
            <div className="flex items-center gap-2 font-mono font-bold text-black">
              <span>Nilai / Skor Akhir :</span>
              <span className="border-2 border-black px-5 py-1 text-base inline-block min-w-[80px] text-center font-black">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 100
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 text-center pt-3 gap-8">
            <div className="space-y-16">
              <div className="space-y-1">
                <p className="text-sm">Menyatakan Kebenaran Hasil Uji,</p>
                <p className="font-bold text-sm">Mahasiswa Praktikan,</p>
              </div>
              <div>
                <p className="font-bold text-base uppercase underline text-black">{studentName || "( ..................................................... )"}</p>
                <p className="font-mono text-xs font-semibold text-black mt-0.5">NIM. {studentNim || "......................................."}</p>
              </div>
            </div>

            <div className="space-y-16">
              <div className="space-y-1">
                <p className="text-sm">Menyetujui &amp; Mengesahkan,</p>
                <p className="font-bold text-sm">Dosen Pengampu,</p>
              </div>
              <div>
                <p className="font-bold text-base underline text-black">Hadiq, ST, M.Kom</p>
                <p className="text-xs font-semibold text-black mt-0.5">Dosen Pengampu Matakuliah</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
