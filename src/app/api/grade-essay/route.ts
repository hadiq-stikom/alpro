import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface GradeItem {
  id: string;
  question: string;
  answer: string;
  rubric: string;
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
    Kembalikan respons dalam format JSON murni:
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

  // 1. Groq API
  try {
    if (!process.env.GROQ_API_KEY) throw new Error('Groq Key missing');
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: 'qwen/qwen3.6-27b',
      temperature: 0.1,
      response_format: { type: 'json_object' },
    });

    const responseContent = chatCompletion.choices[0]?.message?.content || '{}';
    const parsed = JSON.parse(responseContent);

    return {
      score: typeof parsed.score === 'number' ? parsed.score : 0,
      feedback: parsed.feedback || 'Penilaian selesai.',
      provider: 'groq'
    };
  } catch (groqError: any) {
    console.warn('Groq API fallback to Gemini...', groqError.message);

    // 2. Gemini API Fallback
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('Semua API AI gagal.');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.1
      }
    });

    const prompt = `${systemPrompt}\n\n${userPrompt}`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = JSON.parse(text);

    return {
      score: typeof parsed.score === 'number' ? parsed.score : 0,
      feedback: parsed.feedback || 'Penilaian selesai.',
      provider: 'gemini'
    };
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // BATCH MODE: Menilai beberapa soal esai sekaligus (5 butir soal)
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
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Gagal memproses penilaian esai', details: error.message },
      { status: 500 }
    );
  }
}

