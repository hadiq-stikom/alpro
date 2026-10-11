import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface ConceptSubmission {
  id: string;
  term: string;
  answer: string;
  rubric: string;
  keywords: string[];
}

interface TelemetryData {
  timeSpentSeconds: number;
  keystrokeCount: number;
  backspaceCount: number;
  tabSwitches: number;
  burstAttempts: number;
}

function parseJsonSafe(raw: string): any {
  try {
    return JSON.parse(raw);
  } catch (e) {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw e;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { concepts, telemetry, meetingId } = body as {
      concepts: ConceptSubmission[];
      telemetry: TelemetryData;
      meetingId: number;
    };

    if (!concepts || !Array.isArray(concepts) || concepts.length === 0) {
      return NextResponse.json({ error: 'Data konsep tidak valid' }, { status: 400 });
    }

    // Hitung kata total & WPM
    const combinedText = concepts.map(c => c.answer || '').join(' ').trim();
    const totalWords = combinedText.split(/\s+/).filter(w => w.length > 0).length;
    const minutes = Math.max(0.2, (telemetry?.timeSpentSeconds || 60) / 60);
    const calculatedWpm = Math.round(totalWords / minutes);

    const backspaceRatio = (telemetry?.keystrokeCount && telemetry.keystrokeCount > 0)
      ? Number(((telemetry.backspaceCount || 0) / telemetry.keystrokeCount).toFixed(3))
      : 0.1;

    const systemPrompt = `
      Anda adalah dosen ahli Algoritma dan Pemrograman yang menilai pemahaman konsep dasar/istilah mahasiswa semester 1.
      Mahasiswa diminta menjelaskan 3 istilah dengan kata-kata mereka sendiri dalam waktu terbatas (90 detik per istilah).
      
      PANDUAN PENILAIAN KONSEP (0-100 per istilah):
      - Berikan skor 85-100 jika mahasiswa memahami esensi konsep dengan tepat, menggunakan analogi yang masuk akal, atau menyebutkan fungsi intinya dengan bahasa sendiri.
      - Berikan skor 65-80 jika definisi cukup benar meskipun ada sedikit kekeliruan minor atau penjelasannya singkat.
      - Berikan skor 40-60 jika definisi melenceng atau terlalu dangkal.
      - Berikan skor 0 jika kosong atau tidak relevan sama sekali.
      - Bersikaplah objektif, ramah, dan apresiatif terhadap upaya mahasiswa menjelaskan dengan kalimat orisinal pemula.
      
      ATURAN FORMAT OUTPUT:
      Kembalikan HANYA format JSON valid berikut tanpa markdown/teks tambahan:
      {
        "itemScores": [
          { "id": "id_soal", "score": 85, "feedback": "Ulasan 1 kalimat singkat." }
        ],
        "averageScore": 85,
        "overallFeedback": "Ulasan umum 1-2 kalimat menyemangati mahasiswa."
      }
    `;

    const userPrompt = `
      Daftar Jawaban Konsep Mahasiswa (Pertemuan ${meetingId}):
      ${concepts.map((c, idx) => `
      ${idx + 1}. Istilah: "${c.term}"
         Jawaban Mahasiswa: "${c.answer || '(Kosong)'}"
         Panduan Konsep: ${c.rubric}
         Kata Kunci Acuan: ${c.keywords.join(', ')}
      `).join('\n')}
    `;

    let evaluationResult: {
      averageScore: number;
      overallFeedback: string;
      itemScores: Array<{ id: string; score: number; feedback: string }>;
      provider: string;
    } | null = null;

    // 1. Coba Groq API
    if (process.env.GROQ_API_KEY) {
      try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          model: 'qwen/qwen3.8-27b',
          temperature: 0.1,
          response_format: { type: 'json_object' },
        });

        const content = chatCompletion.choices[0]?.message?.content || '{}';
        const parsed = parseJsonSafe(content);
        evaluationResult = {
          averageScore: typeof parsed.averageScore === 'number' ? Math.round(parsed.averageScore) : 75,
          overallFeedback: parsed.overallFeedback || 'Evaluasi konsep dasar selesai.',
          itemScores: parsed.itemScores || concepts.map(c => ({ id: c.id, score: 75, feedback: 'Cukup baik.' })),
          provider: 'groq (qwen3.8)'
        };
      } catch (err: any) {
        console.warn('Groq failed for grade-concept, fallback to Gemini...', err.message);
      }
    }

    // 2. Fallback Gemini API
    if (!evaluationResult && process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
          model: 'gemini-2.5-flash-lite',
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.1
          }
        });

        const prompt = `${systemPrompt}\n\n${userPrompt}`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const parsed = parseJsonSafe(text);

        evaluationResult = {
          averageScore: typeof parsed.averageScore === 'number' ? Math.round(parsed.averageScore) : 75,
          overallFeedback: parsed.overallFeedback || 'Evaluasi konsep dasar selesai.',
          itemScores: parsed.itemScores || concepts.map(c => ({ id: c.id, score: 75, feedback: 'Cukup baik.' })),
          provider: 'gemini-2.5-flash-lite'
        };
      } catch (geminiErr: any) {
        console.warn('Gemini also failed for grade-concept, using local fallback...', geminiErr.message);
      }
    }

    // 3. Fallback Heuristik Cerdas (jika kedua API offline)
    if (!evaluationResult) {
      const itemScores = concepts.map(c => {
        const ans = (c.answer || '').toLowerCase();
        let hitCount = 0;
        c.keywords.forEach(kw => {
          if (ans.includes(kw.toLowerCase())) hitCount++;
        });
        const score = ans.length < 10 ? 30 : Math.min(95, 60 + hitCount * 12);
        return {
          id: c.id,
          score,
          feedback: score >= 75 ? 'Penjelasan konsep cukup tepat.' : 'Perlu memperdalam kata kunci utama konsep.'
        };
      });
      const avg = Math.round(itemScores.reduce((acc, curr) => acc + curr.score, 0) / itemScores.length);
      evaluationResult = {
        averageScore: avg,
        overallFeedback: 'Evaluasi konsep selesai dinilai.',
        itemScores,
        provider: 'heuristic-offline'
      };
    }

    // Penalti pelanggaran tab switches pada tahap gerbang
    const penalty = (telemetry?.tabSwitches || 0) * 10;
    const finalScore = Math.max(0, evaluationResult.averageScore - penalty);
    const isPassed = finalScore >= 70 && (telemetry?.tabSwitches || 0) <= 2;

    const baseline = {
      wpm: calculatedWpm,
      backspaceRatio: backspaceRatio,
      sampleText: combinedText,
      totalKeystrokes: telemetry?.keystrokeCount || 0,
      totalBackspaces: telemetry?.backspaceCount || 0,
      tabSwitches: telemetry?.tabSwitches || 0,
      timeSpentSeconds: telemetry?.timeSpentSeconds || 0
    };

    return NextResponse.json({
      score: finalScore,
      rawScore: evaluationResult.averageScore,
      isPassed,
      feedback: evaluationResult.overallFeedback,
      itemScores: evaluationResult.itemScores,
      provider: evaluationResult.provider,
      baseline
    });

  } catch (error: any) {
    console.error('Error di /api/grade-concept:', error);
    return NextResponse.json({
      error: 'Terjadi kesalahan sistem saat mengevaluasi konsep',
      details: error.message
    }, { status: 500 });
  }
}
