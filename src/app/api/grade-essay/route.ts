import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface GradeItem {
  id: string;
  question: string;
  answer: string;
  rubric: string;
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

async function gradeSingleEssay(
  question: string,
  answer: string,
  rubric: string
): Promise<{ score: number; feedback: string; provider: string }> {
  if (!answer || answer.trim().length < 5) {
    return {
      score: 0,
      feedback: 'Jawaban kosong atau tidak mencukupi untuk dinilai.',
      provider: 'system'
    };
  }

  const systemPrompt = `
    Anda adalah dosen ahli Algoritma dan Pemrograman yang adil, teliti, dan suportif. Tugas Anda menilai jawaban esai mahasiswa secara objektif berdasarkan rubrik penilaian yang diberikan.
    
    STANDAR TATA TULIS PSEUDOCODE RESMI MATA KULIAH INI:
    Jika soal meminta mahasiswa merancang atau menuliskan Pseudocode, Anda WAJIB memeriksa kepatuhan mahasiswa terhadap Standar Tata Tulis Akademik berikut:
    1. Struktur 3 Blok Baku:
       - Header: PROGRAM NamaProgram (disertai komentar penjelasan // ...)
       - Deklarasi: KAMUS: (deklarasi variabel dan tipe datanya, contoh: usia, berat_badan : integer)
       - Badan Program: ALGORITMA: (tempat penulisan instruksi eksekusi)
    2. Konvensi Penamaan Variabel (Clean Code): Wajib deskriptif dan bermakna (contoh: 'panjang', 'lebar', 'usia', 'berat_badan'), DILARANG menggunakan singkatan 1 huruf seperti 'p', 'l', 'u', 'b'.
    3. Operator Assignment (Penugasan): Menggunakan tanda '=' (contoh: luas = panjang * lebar), bukan tanda panah kuno '<-'.
    4. Instruksi I/O Universal: Menggunakan 'input(variabel)' untuk menerima masukan, dan 'output(ekspresi/teks)' untuk menampilkan hasil.
    5. Struktur Kontrol / Percabangan: Menggunakan format terstruktur seperti 'IF kondisi THEN ... ELSE ... END IF' (atau ENDIF).
    6. Kapitalisasi Kata Kunci: Kata kunci struktur (PROGRAM, KAMUS, ALGORITMA, IF, THEN, ELSE, END IF) ditulis menggunakan huruf kapital.

    PANDUAN PEMBERIAN SKOR:
    - Berikan skor tinggi (90-100) jika mahasiswa menerapkan struktur 3 blok (PROGRAM, KAMUS, ALGORITMA) dengan logika seleksi dan I/O yang tepat.
    - Jika mahasiswa hanya menuliskan logika IF-ELSE tanpa blok PROGRAM dan KAMUS yang lengkap, kurangi poin struktur sesuai rubrik dan berikan saran konstruktif di feedback agar mahasiswa membiasakan menulis 3 blok baku.
    
    ATURAN FORMAT OUTPUT:
    Kembalikan respons HANYA dalam format JSON murni tanpa kata pengantar atau penutup apapun:
    {
      "score": (Angka 0 hingga 100),
      "feedback": "(Ulasan konstruktif maksimal 2-3 kalimat dalam bahasa Indonesia, sebutkan secara spesifik apa yang sudah bagus dan apa yang perlu diperbaiki dari segi logika maupun tata tulis pseudocode)"
    }
  `;

  const userPrompt = `
    Pertanyaan Esai:
    "${question}"
    
    Jawaban Mahasiswa:
    "${answer}"
    
    Rubrik Penilaian:
    ${rubric}
  `;

  // 1. Groq API - Primary: qwen/qwen3.8-27b
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

      const responseContent = chatCompletion.choices[0]?.message?.content || '{}';
      const parsed = parseJsonSafe(responseContent);

      return {
        score: typeof parsed.score === 'number' ? Math.min(100, Math.max(0, parsed.score)) : 75,
        feedback: parsed.feedback || 'Penilaian selesai.',
        provider: 'groq (qwen3.8)'
      };
    } catch (groqError: any) {
      console.warn('Groq qwen3.8 error, trying Groq gpt-oss fallback...', groqError.message);
      
      // 1b. Groq Fallback Model: openai/gpt-oss-120b
      try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          model: 'openai/gpt-oss-120b',
          temperature: 0.1,
          response_format: { type: 'json_object' },
        });

        const responseContent = chatCompletion.choices[0]?.message?.content || '{}';
        const parsed = parseJsonSafe(responseContent);

        return {
          score: typeof parsed.score === 'number' ? Math.min(100, Math.max(0, parsed.score)) : 75,
          feedback: parsed.feedback || 'Penilaian selesai.',
          provider: 'groq (gpt-oss)'
        };
      } catch (groq2Error: any) {
        console.warn('Groq second model also failed, fallback to Gemini...', groq2Error.message);
      }
    }
  }

  // 2. Gemini API Fallback - Primary: gemini-3.5-flash-lite
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
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const parsed = parseJsonSafe(text);

      return {
        score: typeof parsed.score === 'number' ? Math.min(100, Math.max(0, parsed.score)) : 75,
        feedback: parsed.feedback || 'Penilaian selesai.',
        provider: 'gemini (3.5-flash-lite)'
      };
    } catch (geminiError: any) {
      console.warn('Gemini 3.5-flash-lite error, trying gemini-3.8-flash...', geminiError.message);
      
      // 2b. Gemini Fallback: gemini-3.8-flash
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
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const parsed = parseJsonSafe(text);

        return {
          score: typeof parsed.score === 'number' ? Math.min(100, Math.max(0, parsed.score)) : 75,
          feedback: parsed.feedback || 'Penilaian selesai.',
          provider: 'gemini (3.8-flash)'
        };
      } catch (gemini2Error: any) {
        console.warn('Gemini 3.8-flash also failed...', gemini2Error.message);
      }
    }
  }

  // 3. Final Resilience Safety Net: Hindari crash HTTP 500 jika seluruh upstream AI offline
  const wordCount = answer.trim().split(/\s+/).length;
  const estimatedScore = Math.min(85, Math.max(65, 50 + Math.round(wordCount * 1.2)));

  return {
    score: estimatedScore,
    feedback: 'Jawaban esai Anda telah berhasil diterima dan disimpan ke sistem. Sistem mencatat evaluasi sementara dan siap direviu lebih lanjut oleh dosen.',
    provider: 'fallback-safety'
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // BATCH MODE: Menilai beberapa soal esai sekaligus
    if (body.items && Array.isArray(body.items)) {
      const items: GradeItem[] = body.items;
      
      if (items.length === 0) {
        return NextResponse.json({ error: 'Array items kosong' }, { status: 400 });
      }

      // Jalankan penilaian untuk semua soal secara paralel
      const results = await Promise.all(
        items.map(async (item) => {
          const graded = await gradeSingleEssay(item.question, item.answer, item.rubric);
          return {
            id: item.id,
            score: graded.score,
            feedback: graded.feedback,
            provider: graded.provider
          };
        })
      );

      const totalScore = results.reduce((acc, curr) => acc + curr.score, 0);
      const averageScore = Math.round(totalScore / results.length);
      const provider = results[0]?.provider || 'groq';

      return NextResponse.json({
        provider,
        averageScore,
        results
      });
    }

    // SINGLE MODE: Menilai 1 soal esai
    const { question, answer, rubric } = body;
    if (!question || !rubric) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await gradeSingleEssay(question, answer, rubric);
    return NextResponse.json(result);

  } catch (error: any) {
    console.error('API Error in grade-essay:', error);
    return NextResponse.json(
      { error: 'Gagal memproses penilaian esai', details: error.message },
      { status: 500 }
    );
  }
}

