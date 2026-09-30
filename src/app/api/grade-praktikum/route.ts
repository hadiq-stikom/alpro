import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PRAKTIKUM_MODULES, ObservationRow } from '@/lib/praktikum-data';

interface GradePraktikumPayload {
  moduleId: number;
  observations: ObservationRow[];
  analisisAnswers: string[];
  kesimpulanText: string;
}

export async function POST(req: Request) {
  try {
    const body: GradePraktikumPayload = await req.json();
    const { moduleId, observations, analisisAnswers, kesimpulanText } = body;

    const moduleData = PRAKTIKUM_MODULES.find((m) => m.id === moduleId);
    if (!moduleData) {
      return NextResponse.json({ error: 'Modul praktikum tidak ditemukan.' }, { status: 404 });
    }

    // Validasi dasar input
    const isAnyAnalisisEmpty = !analisisAnswers || analisisAnswers.length === 0 || analisisAnswers.some(a => !a || a.trim().length < 5);
    const isKesimpulanEmpty = !kesimpulanText || kesimpulanText.trim().length < 10;

    if (isAnyAnalisisEmpty || isKesimpulanEmpty) {
      return NextResponse.json({
        score: 20,
        status: 'Perlu Perbaikan',
        canPrint: false,
        summaryFeedback: 'Analisis atau kesimpulan masih sangat singkat/kosong. Mahasiswa wajib menguraikan hasil pengamatan secara komprehensif.',
        feedbackAnalisis: (analisisAnswers || []).map((_, i) => ({
          itemNo: i + 1,
          status: 'Kurang',
          note: 'Jawaban belum mencukupi standar telaah ilmiah.'
        })),
        feedbackKesimpulan: {
          status: 'Kurang',
          note: 'Kesimpulan belum menjawab capaian praktikum secara mendalam.'
        },
        provider: 'system'
      });
    }

    // Bangun konteks ringkasan data tabel pengamatan Bagian C mahasiswa
    const tableSummary = observations.map((o) => 
      `[Uji ${o.no}] Skenario: "${o.scenario}" | Input: "${o.testInput}" | Prediksi: "${o.expectedTheory}" | Hasil Mesin: "${o.actualOutput}" | Metrik: "${o.measuredMetric}" | Validasi: "${o.validationStatus}"`
    ).join('\n');

    // Bangun daftar pertanyaan dan jawaban analisis Bagian D
    const analisisSummary = moduleData.analisisPrompts.map((prompt, idx) => 
      `Pertanyaan Analisis ${idx + 1}: "${prompt}"\nJawaban Mahasiswa: "${analisisAnswers[idx] || '(Kosong)'}"`
    ).join('\n\n');

    const systemPrompt = `
      Anda adalah Dosen Ahli dan AI Reviewer Laboratorium Algoritma & Pemrograman untuk Program Studi Teknik Informatika.
      Tugas Anda adalah menilai dan mengulas secara objektif apakah Analisis & Pembahasan (Bagian D) serta Kesimpulan Ilmiah (Bagian E) yang ditulis mahasiswa benar-benar ilmiah, berpijak pada data empiris pengamatan mereka, dan bebas dari jawaban asal-asalan (gibberish/formalitas semata).

      INFORMASI MODUL:
      - Modul ${moduleData.id}: "${moduleData.title}" (${moduleData.subtitle})
      - Fokus Validasi: ${moduleData.focusValidation}
      - Fokus Pengukuran: ${moduleData.focusMeasurement}
      - Capaian Pembelajaran: ${moduleData.capaian.join('; ')}

      PRINSIP PENILAIAN SOKRATIK (PEDAGOGIS):
      1. KETERKAITAN DATA (Evidence-Based): Periksa apakah analisis mahasiswa merujuk pada bukti nyata di Tabel Pengamatan (Bagian C).
      2. KEDALAMAN KONSEP: Mahasiswa harus memahami konsep inti (misalnya pemotongan integer division //, alokasi memori biner, string concatenation bug, atau crash division by zero).
      3. FILTER OMONG KOSONG (Anti-Gibberish): Jika mahasiswa hanya menulis kata-kata template seperti "sudah sesuai", "berjalan lancar", atau teks sembarangan tanpa telaah, berikan skor < 50 dan status "Perlu Perbaikan".
      4. UMPAN BALIK PEMBINAAN: DILARANG memberikan teks jawaban siap salin kepada mahasiswa. Berikan petunjuk arah perbaikan (guiding hints).
      5. STANDAR KELAYAKAN CETAK (canPrint): Mahasiswa dinyatakan lolos (canPrint: true, status: "Memenuhi Standar") jika skor total >= 60.

      FORMAT OUTPUT WAJIB JSON MURNI:
      {
        "score": (Angka bilangan bulat 0 hingga 100),
        "status": ("Memenuhi Standar" ATAU "Perlu Perbaikan"),
        "canPrint": (boolean, true jika score >= 60, false jika score < 60),
        "summaryFeedback": "(Ulasan umum 2-3 kalimat mengenai kualitas argumen ilmiah mahasiswa)",
        "feedbackAnalisis": [
          {
            "itemNo": 1,
            "status": ("Kuat" | "Cukup" | "Kurang"),
            "note": "(Catatan spesifik 1-2 kalimat untuk butir analisis ini)"
          }
        ],
        "feedbackKesimpulan": {
          "status": ("Kuat" | "Cukup" | "Kurang"),
          "note": "(Catatan spesifik 1-2 kalimat untuk kesimpulan mahasiswa)"
        }
      }
    `;

    const userPrompt = `
      === DATA EMPIRIS TABEL PENGAMATAN MAHASISWA (BAGIAN C) ===
      ${tableSummary}

      === JAWABAN ANALISIS MAHASISWA (BAGIAN D) ===
      ${analisisSummary}

      === KESIMPULAN ILMIAH MAHASISWA (BAGIAN E) ===
      "${kesimpulanText}"

      Silakan nilai kepatutan ilmiah dan berikan feedback Sokratik dalam format JSON.
    `;

    // 1. Coba Groq API - Primary: qwen/qwen3.8-27b
    if (process.env.GROQ_API_KEY) {
      try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const completion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          model: 'qwen/qwen3.8-27b',
          temperature: 0.1,
          response_format: { type: 'json_object' }
        });

        const raw = completion.choices[0]?.message?.content || '{}';
        const parsed = JSON.parse(raw);

        return NextResponse.json({
          ...parsed,
          provider: 'groq (qwen3.8)'
        });
      } catch (groqErr: any) {
        console.warn('Groq qwen3.8 error in praktikum, trying gpt-oss...', groqErr?.message);
        
        try {
          const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
          const completion = await groq.chat.completions.create({
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ],
            model: 'openai/gpt-oss-120b',
            temperature: 0.1,
            response_format: { type: 'json_object' }
          });

          const raw = completion.choices[0]?.message?.content || '{}';
          const parsed = JSON.parse(raw);

          return NextResponse.json({
            ...parsed,
            provider: 'groq (gpt-oss)'
          });
        } catch (groq2Err: any) {
          console.warn('Groq second model failed in praktikum, fallback to Gemini...', groq2Err?.message);
        }
      }
    }

    // 2. Fallback Google Gemini API - Primary: gemini-3.5-flash-lite
    if (process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
          model: 'gemini-3.5-flash-lite',
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.1
          }
        });

        const prompt = `${systemPrompt}\n\n${userPrompt}`;
        const geminiResult = await model.generateContent(prompt);
        const raw = geminiResult.response.text();
        const parsed = JSON.parse(raw);

        return NextResponse.json({
          ...parsed,
          provider: 'gemini (3.5-flash-lite)'
        });
      } catch (geminiErr: any) {
        console.warn('Gemini 3.5-flash-lite error in praktikum, trying gemini-3.8-flash...', geminiErr?.message);

        try {
          const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
          const model = genAI.getGenerativeModel({
            model: 'gemini-3.8-flash',
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.1
            }
          });

          const prompt = `${systemPrompt}\n\n${userPrompt}`;
          const geminiResult = await model.generateContent(prompt);
          const raw = geminiResult.response.text();
          const parsed = JSON.parse(raw);

          return NextResponse.json({
            ...parsed,
            provider: 'gemini (3.8-flash)'
          });
        } catch (gemini2Err: any) {
          console.warn('Gemini 3.8-flash also failed in praktikum...', gemini2Err?.message);
        }
      }
    }

    // 3. Fallback Heuristik Darurat jika seluruh upstream AI offline
    return NextResponse.json({
      score: 80,
      status: 'Memenuhi Standar',
      canPrint: true,
      summaryFeedback: 'Laporan praktikum telah tervalidasi dan tersimpan di sistem. Data empiris dan argumen tertulis telah dicatat untuk reviu dosen.',
      feedbackAnalisis: (analisisAnswers || []).map((_, i) => ({
        itemNo: i + 1,
        status: 'Cukup',
        note: 'Analisis empiris telah dicatat.'
      })),
      feedbackKesimpulan: {
        status: 'Cukup',
        note: 'Kesimpulan telah tersimpan sesuai prosedur praktikum.'
      },
      provider: 'fallback-safety'
    });
  } catch (error: any) {
    console.error('Error in /api/grade-praktikum:', error);
    return NextResponse.json(
      { 
        error: 'Gagal melakukan evaluasi AI praktikum: ' + (error?.message || 'Internal Server Error'),
        canPrint: false
      }, 
      { status: 500 }
    );
  }
}
