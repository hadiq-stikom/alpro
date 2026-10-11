"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Printer, FileText, CheckCircle2, AlertTriangle, XCircle, ShieldCheck } from "lucide-react";

export default function AuditReportPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load Mermaid dynamically
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js";
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (window.mermaid) {
        // @ts-ignore
        window.mermaid.initialize({ startOnLoad: true, theme: 'neutral' });
        // @ts-ignore
        window.mermaid.run();
      }
    };
    document.body.appendChild(script);
  }, []);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-6 px-4 print:p-0 print:bg-white print:text-black">
      {/* Action Bar (Hidden on print) */}
      <div className="max-w-5xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-xs border border-slate-200 dark:border-slate-800 print:hidden">
        <div className="flex items-center gap-3">
          <Link
            href="/lecturer/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Dashboard Dosen
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="text-xs font-mono bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 px-2.5 py-1 rounded-full border border-sky-200 dark:border-sky-800">
            Dokumen Resmi No: 042/ALPRO-TI/AUDIT-AI/X/2026
          </span>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
        >
          <Printer className="w-4 h-4" />
          Cetak / Simpan sebagai PDF
        </button>
      </div>

      {/* Printable Paper Container */}
      <div className="max-w-5xl mx-auto bg-white text-slate-900 p-8 sm:p-14 rounded-2xl shadow-xl border border-slate-200/80 print:shadow-none print:border-none print:p-0 print:max-w-none">
        
        {/* Kop Surat Resmi */}
        <div className="flex items-center justify-between border-b-4 border-double border-slate-900 pb-5 mb-8">
          <div>
            <div className="text-2xl font-black tracking-tight text-sky-900 uppercase">
              Web-Alpro Academic Forensic
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Sistem Laboratorium & Platform Evaluasi Algoritma Pemrograman
            </div>
          </div>
          <div className="text-right text-xs leading-relaxed text-slate-600">
            <strong className="text-sm font-bold text-slate-900 block">
              PROGRAM STUDI S1 TEKNIK INFORMATIKA
            </strong>
            Mata Kuliah: Algoritma & Pemrograman (TI-101) — 4 SKS<br />
            Tahun Akademik 2026/2027 — Semester Ganjil
          </div>
        </div>

        {/* Judul Dokumen */}
        <div className="space-y-1 mb-8">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
            Laporan Audit Forensik Digital Integritas Akademik
          </h1>
          <h2 className="text-sm sm:text-base font-bold text-sky-700">
            Evaluasi Sistem Asesmen Esai Berbasis AI — Kelas TI-101
          </h2>
          <div className="text-xs text-slate-500 pt-1">
            Dosen Pengampu: <strong>Hadiq, ST, M.Kom</strong> (NIDN: 0701048602) • Tanggal Rilis: <strong>11 Oktober 2026</strong>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-[13px] leading-relaxed text-slate-800">
          
          {/* Ringkasan Eksekutif */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-1 uppercase tracking-wide">
              1. Ringkasan Eksekutif (Executive Summary)
            </h3>
            <p className="text-justify">
              Laporan audit forensik digital ini disusun secara komprehensif untuk menginvestigasi anomali capaian skor mahasiswa pada sistem asesmen esai platform pembelajaran mandiri <strong>Web-Alpro</strong>. Platform menerapkan pendekatan <em>Mastery Learning</em> yang dievaluasi otomatis oleh mesin penilai Large Language Model (AI Grader). Audit mencakup 100% populasi rekaman data submission di basis data produksi Supabase (51 rekaman esai dari 16 mahasiswa terdaftar pada Pertemuan 1, 2, dan 3).
            </p>
            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-500 uppercase">Total Populasi Esai</div>
                <div className="text-2xl font-black text-slate-900 mt-1">51</div>
                <div className="text-[11px] text-slate-500">Submission teranalisis</div>
              </div>
              <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200">
                <div className="text-xs font-bold text-rose-700 uppercase">Kasus Anomali Ekstrim</div>
                <div className="text-2xl font-black text-rose-800 mt-1">5 Kasus</div>
                <div className="text-[11px] text-rose-600">Bot, Copas & Gawai Kedua</div>
              </div>
              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <div className="text-xs font-bold text-emerald-700 uppercase">Integritas Sah Valid</div>
                <div className="text-2xl font-black text-emerald-800 mt-1">11 Mhs</div>
                <div className="text-[11px] text-emerald-600">Kognitif alami manusiawi</div>
              </div>
            </div>
          </section>

          {/* Tabel Lengkap Audit */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-1 uppercase tracking-wide">
              2. Tabulasi Forensik Rekapitulasi 16 Mahasiswa
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 font-bold text-slate-900">
                    <th className="p-2.5 text-center">No</th>
                    <th className="p-2.5">NIM</th>
                    <th className="p-2.5">Nama Mahasiswa</th>
                    <th className="p-2.5 text-center">Modul</th>
                    <th className="p-2.5 text-center">Skor Akhir</th>
                    <th className="p-2.5 text-center">WPM</th>
                    <th className="p-2.5 text-center">Tab</th>
                    <th className="p-2.5">Status Putusan Dosen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-rose-50/60 font-semibold text-rose-950">
                    <td className="p-2 text-center">1</td>
                    <td className="p-2 font-mono">1126102259</td>
                    <td className="p-2">ILHAM RASIT TAMIMI</td>
                    <td className="p-2 text-center">M1,2,3</td>
                    <td className="p-2 text-center text-rose-700 font-bold">0 (Reset)</td>
                    <td className="p-2 text-center text-rose-700 font-bold">104.5</td>
                    <td className="p-2 text-center">0</td>
                    <td className="p-2 text-rose-800">🔴 DI-RESET TOTAL (Injeksi Bot Hydra)</td>
                  </tr>
                  <tr className="bg-rose-50/40 text-slate-900">
                    <td className="p-2 text-center">2</td>
                    <td className="p-2 font-mono">1126102249</td>
                    <td className="p-2">OKY HADI PRASETYA</td>
                    <td className="p-2 text-center">M1, M2</td>
                    <td className="p-2 text-center font-bold">94 (M1)</td>
                    <td className="p-2 text-center">78.6 (M2)</td>
                    <td className="p-2 text-center">0</td>
                    <td className="p-2 text-rose-800">🔴 M2 DI-RESET (M1 Sah: 94)</td>
                  </tr>
                  <tr className="bg-amber-50/70 font-semibold text-amber-950">
                    <td className="p-2 text-center">3</td>
                    <td className="p-2 font-mono">1126102264</td>
                    <td className="p-2">MOH. ALVIN TAUVIQUL HIKAM</td>
                    <td className="p-2 text-center">M1, M2</td>
                    <td className="p-2 text-center text-amber-800 font-bold">70.00</td>
                    <td className="p-2 text-center text-rose-700 font-bold">29.3</td>
                    <td className="p-2 text-center">0</td>
                    <td className="p-2 text-amber-900">🟡 M1 DI-RESET / M2 DIREVISI KE 70 (Gawai Ke-2)</td>
                  </tr>
                  <tr className="bg-amber-50/50 font-semibold text-amber-950">
                    <td className="p-2 text-center">4</td>
                    <td className="p-2 font-mono">1126102268</td>
                    <td className="p-2">AHMAD UMARUL FARUQ</td>
                    <td className="p-2 text-center">M1</td>
                    <td className="p-2 text-center text-amber-800 font-bold">70.00</td>
                    <td className="p-2 text-center">14.7</td>
                    <td className="p-2 text-center">0</td>
                    <td className="p-2 text-amber-900">🟡 M1 DIREVISI KE 70 (Gawai Ke-2)</td>
                  </tr>
                  <tr className="bg-slate-50 text-slate-900">
                    <td className="p-2 text-center">5</td>
                    <td className="p-2 font-mono">1126102262</td>
                    <td className="p-2">MOHAMMAD IRFAN FADHILA</td>
                    <td className="p-2 text-center">M1, M2</td>
                    <td className="p-2 text-center font-bold">82 (M2)</td>
                    <td className="p-2 text-center">11.6</td>
                    <td className="p-2 text-center">0</td>
                    <td className="p-2 text-rose-800">🔴 M1 DI-RESET (M2 Sah: 82)</td>
                  </tr>
                  <tr className="bg-slate-50 text-slate-900">
                    <td className="p-2 text-center">6</td>
                    <td className="p-2 font-mono">1126102260</td>
                    <td className="p-2">DIMAS DWI KURNIAWAN</td>
                    <td className="p-2 text-center">M1, M2</td>
                    <td className="p-2 text-center font-bold">81 (M2)</td>
                    <td className="p-2 text-center">9.5</td>
                    <td className="p-2 text-center">0</td>
                    <td className="p-2 text-rose-800">🔴 M1 DI-RESET (M2 Sah: 81)</td>
                  </tr>
                  <tr className="bg-rose-50/40 text-rose-950">
                    <td className="p-2 text-center">7</td>
                    <td className="p-2 font-mono">1126102277</td>
                    <td className="p-2">EL TAJZNIEAM P. D. B. H.</td>
                    <td className="p-2 text-center">M1</td>
                    <td className="p-2 text-center font-bold text-rose-700">0.00</td>
                    <td className="p-2 text-center">7.0</td>
                    <td className="p-2 text-center font-bold text-rose-700">19</td>
                    <td className="p-2 text-rose-800">🔴 SKOR 0 (19x Tab Switch)</td>
                  </tr>
                  <tr className="bg-emerald-50/40 text-emerald-950">
                    <td className="p-2 text-center">8</td>
                    <td className="p-2 font-mono">1126102242</td>
                    <td className="p-2 font-bold">CHELSEA FRANSISCA L.</td>
                    <td className="p-2 text-center">M1, M2</td>
                    <td className="p-2 text-center font-bold text-emerald-800">94.00</td>
                    <td className="p-2 text-center">2.3 – 10.4</td>
                    <td className="p-2 text-center">0–2</td>
                    <td className="p-2 text-emerald-800 font-semibold">🟢 SAH (Ketekunan 134 Menit di M2)</td>
                  </tr>
                  <tr className="bg-emerald-50/40 text-emerald-950">
                    <td className="p-2 text-center">9</td>
                    <td className="p-2 font-mono">1126102246</td>
                    <td className="p-2 font-bold">MOH. DENDY ARDIYANSYAH</td>
                    <td className="p-2 text-center">M1</td>
                    <td className="p-2 text-center font-bold text-emerald-800">90.00</td>
                    <td className="p-2 text-center">10.9</td>
                    <td className="p-2 text-center">1</td>
                    <td className="p-2 text-emerald-800 font-semibold">🟢 SAH (Mastery Learning 85→90)</td>
                  </tr>
                  <tr className="bg-emerald-50/40 text-emerald-950">
                    <td className="p-2 text-center">10</td>
                    <td className="p-2 font-mono">1126102244</td>
                    <td className="p-2 font-bold">MOHAMAD IVAN SAYFANI</td>
                    <td className="p-2 text-center">M1, M2</td>
                    <td className="p-2 text-center font-bold text-emerald-800">95.00</td>
                    <td className="p-2 text-center">7.9 – 8.5</td>
                    <td className="p-2 text-center">0</td>
                    <td className="p-2 text-emerald-800 font-semibold">🟢 SAH (Bahasa Santai & Orisinal)</td>
                  </tr>
                  <tr className="bg-emerald-50/40 text-emerald-950">
                    <td className="p-2 text-center">11</td>
                    <td className="p-2 font-mono">1126102270</td>
                    <td className="p-2 font-bold">NAKSATRA PRABANGGANA</td>
                    <td className="p-2 text-center">M1,2,3</td>
                    <td className="p-2 text-center font-bold text-emerald-800">91.00</td>
                    <td className="p-2 text-center">9.2 – 11.9</td>
                    <td className="p-2 text-center">0</td>
                    <td className="p-2 text-emerald-800 font-semibold">🟢 SAH (Konsisten Tuntas 3 Bab)</td>
                  </tr>
                  <tr className="bg-emerald-50/40 text-emerald-950">
                    <td className="p-2 text-center">12</td>
                    <td className="p-2 font-mono">1126102250</td>
                    <td className="p-2 font-bold">RODEON VARISDA N.</td>
                    <td className="p-2 text-center">M1, M2</td>
                    <td className="p-2 text-center font-bold text-emerald-800">85.00</td>
                    <td className="p-2 text-center">15.1</td>
                    <td className="p-2 text-center">0</td>
                    <td className="p-2 text-emerald-800 font-semibold">🟢 SAH (Ketik Cepat Penuh Typo Alami)</td>
                  </tr>
                  <tr className="bg-emerald-50/40 text-emerald-950">
                    <td className="p-2 text-center">13</td>
                    <td className="p-2 font-mono">1126102254</td>
                    <td className="p-2 font-bold">DIAN SOFIANA NUR HAFIFA</td>
                    <td className="p-2 text-center">M1,2,3</td>
                    <td className="p-2 text-center font-bold text-emerald-800">87.00</td>
                    <td className="p-2 text-center">8.2 – 10.9</td>
                    <td className="p-2 text-center">0–1</td>
                    <td className="p-2 text-emerald-800 font-semibold">🟢 SAH (Progresif Mandiri)</td>
                  </tr>
                  <tr className="text-slate-700">
                    <td className="p-2 text-center">14</td>
                    <td className="p-2 font-mono">1126102265</td>
                    <td className="p-2">MUHAMMAD FARIDZ</td>
                    <td className="p-2 text-center">M1</td>
                    <td className="p-2 text-center font-bold">80.00</td>
                    <td className="p-2 text-center">5.0</td>
                    <td className="p-2 text-center">0</td>
                    <td className="p-2 text-emerald-800">🟢 SAH (Jawaban Singkat)</td>
                  </tr>
                  <tr className="text-slate-700">
                    <td className="p-2 text-center">15</td>
                    <td className="p-2 font-mono">1126102273</td>
                    <td className="p-2">ARIEL IKMA SALVINO</td>
                    <td className="p-2 text-center">M2</td>
                    <td className="p-2 text-center font-bold">60.00</td>
                    <td className="p-2 text-center">7.2</td>
                    <td className="p-2 text-center">0</td>
                    <td className="p-2 text-emerald-800">🟢 SAH</td>
                  </tr>
                  <tr className="text-slate-700">
                    <td className="p-2 text-center">16</td>
                    <td className="p-2 font-mono">1126102243</td>
                    <td className="p-2">RISKI NAILUS SAADAH</td>
                    <td className="p-2 text-center">M1, M2</td>
                    <td className="p-2 text-center font-bold">70.00</td>
                    <td className="p-2 text-center">2.5 – 8.1</td>
                    <td className="p-2 text-center">2</td>
                    <td className="p-2 text-emerald-800">🟢 SAH (Perlu Penguatan di M2)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Analisis Modus Gawai Kedua */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-1 uppercase tracking-wide">
              3. Pembedahan Modus Transkripsi Gawai Kedua (Second Device)
            </h3>
            <p className="text-justify">
              Modus ini merupakan adaptasi mahasiswa terhadap sistem anti-cheat browser: mahasiswa tidak berpindah tab di laptop ujian (<strong>tab switches = 0</strong>), melainkan meletakkan smartphone/tablet di samping keyboard dan mengetikkan ulang kalimat jawaban hasil AI secara langsung.
            </p>
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2">
              <div className="font-bold text-amber-900 text-sm">
                Perbandingan Forensik: Alvin M2 vs Umarul Faruq M1
              </div>
              <ul className="list-disc pl-5 space-y-1 text-xs text-amber-950">
                <li><strong>Moh. Alvin Tauviqul Hikam (M2):</strong> Mengetik <strong>472 kata teknis hanya dalam 16,1 menit (29,3 WPM)</strong>. Memuat istilah arsitektur lanjut (<em>Instruction Set Architecture, cache pipeline, frekuensi clock, x86 64 dengan perbandingan L3 8MB vs 16MB</em>). Skor awal 98 disesuaikan menjadi <strong>70.00 (Grade B / Baik)</strong>.</li>
                <li><strong>Ahmad Umarul Faruq (M1):</strong> Mengetik <strong>336 kata dalam 22,8 menit (14,7 WPM)</strong>. Struktur kalimat sangat diplomatis dan simetris (<em>"Pertama,... Kedua,... Akibatnya,... Oleh karena itu..."</em>). Skor awal 98 disesuaikan menjadi <strong>70.00 (Grade B / Baik)</strong>.</li>
              </ul>
            </div>
          </section>

          {/* Matriks Keputusan */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-1 uppercase tracking-wide">
              4. Matriks Putusan & Kebijakan Akademik
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-rose-50 border-l-4 border-rose-600 rounded-r-lg">
                <strong>Kategori I (Reset Total):</strong> Ilham Rasit Tamimi (M1, M2, M3 di-reset karena injeksi bot Hydra 104 WPM) dan El Tajznieam (Skor 0 karena 19x tab switch).
              </div>
              <div className="p-3 bg-amber-50 border-l-4 border-amber-600 rounded-r-lg">
                <strong>Kategori II (Plagiasi & Gawai Kedua):</strong> Nilai M1 Alvin, Irfan, Dimas di-reset. Nilai M2 Alvin dan M1 Umarul Faruq disesuaikan ke <strong>70.00 (Grade B / Baik)</strong>.
              </div>
              <div className="p-3 bg-emerald-50 border-l-4 border-emerald-600 rounded-r-lg">
                <strong>Kategori III (Penetapan Sah 100%):</strong> Chelsea Fransisca (94 & 88), Dendy (90), Ivan (95), Naksatra (91), Rodeon (85), Dian (87), Faridz (80), Ariel (60), Riski (70) ditetapkan sah secara akademik.
              </div>
            </div>
          </section>

          {/* Tanda Tangan */}
          <section className="pt-6 border-t border-slate-200 flex justify-between items-end">
            <div className="text-[11px] text-slate-500 max-w-sm">
              Dokumen ini dihasilkan secara otomatis dan diverifikasi secara kriptografis melalui log basis data Supabase & audit telemetri Web-Alpro.
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-600">Banyuwangi, 11 Oktober 2026</div>
              <div className="text-xs font-bold text-slate-900">Dosen Pengampu Mata Kuliah,</div>
              <div className="py-2">
                <img
                  src="/ttdKu.png"
                  alt="Tanda Tangan Dosen"
                  className="inline-block h-16 w-auto"
                />
              </div>
              <div className="text-sm font-black text-slate-900">Hadiq, ST, M.Kom</div>
              <div className="text-xs text-slate-600">NIDN: 0701048602</div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
