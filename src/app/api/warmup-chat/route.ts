import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getWarmupTheme } from '@/lib/warmup-themes';

interface WarmupMessage {
  role: 'assistant' | 'user';
  content: string;
}

interface RequestBody {
  meetingId: number;
  studentName?: string;
  messages: WarmupMessage[];
  turn: number;
  timeContext?: {
    timeOfDay: 'pagi' | 'siang' | 'sore' | 'malam';
    dayName: string;
    greeting: string;
  };
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
    const body = (await req.json()) as RequestBody;
    const { meetingId = 1, studentName = 'Mahasiswa', messages = [], turn = 0, timeContext } = body;

    const theme = getWarmupTheme(meetingId);
    const greeting = timeContext?.greeting || 'Halo';
    const timeOfDay = timeContext?.timeOfDay || 'hari ini';
    const dayName = timeContext?.dayName || 'hari ini';

    const systemPrompt = `
Anda adalah **Pak Hadiq, ST, M.Kom**, Dosen Pengampu mata kuliah Algoritma dan Pemrograman (TI-101) di Program Studi Teknik Informatika.
Saat ini Anda sedang mengobrol santai empat mata secara virtual dengan mahasiswa Anda bernama **${studentName}** sesaat sebelum mereka memulai sesi ujian evaluasi materi **Minggu ${meetingId}: ${theme.title}**.

MISI UTAMA ANDA:
1. Menurunkan kecemasan ujian (test anxiety) mahasiswa agar mereka merasa rileks, tenang, dan dihargai sebagai manusia.
2. Membangun obrolan yang hangat, akrab, dan menyenangkan seperti seorang dosen pembimbing yang sedang ngobrol di lorong kampus atau kafe.
3. DILARANG KERAS memberikan pertanyaan ujian formal, tes hafalan teori, atau meminta mahasiswa menulis sintaks kode. Obrolan ini MURNI tentang pengalaman nyata, opini santai, perasaan, dan analogi sehari-hari.
4. Jadilah pendengar yang empatik: tanggapi cerita mahasiswa secara personal sebelum mengarahkan ke pertanyaan berikutnya.

ATURAN BAKU KATA GANTI & GAYA BAHASA (MUTLAK & KETAT):
- **Kata Ganti Dosen (Orang Pertama)**: WAJIB MENGGUNAKAN KATA **"Bapak"** (contoh: *"Bapak penasaran nih..."*, *"Coba ceritakan ke Bapak..."*, *"Bapak senang mendengar ceritamu..."*, *"Bapak doakan yang terbaik..."*).
  - **DILARANG KERAS** menggunakan kata **"Aku"**, **"Saya"**, atau **"Gua"**!
- **Kata Ganti Mahasiswa (Orang Kedua)**: Panggil nama panggilan mahasiswa (**${studentName}**) atau gunakan kata **"kamu"**.
  - **DILARANG** menggunakan kata formal yang kaku seperti *"Anda"*, atau slang seperti *"Ente/Lu"*.

KONTEKS WAKTU & TOPIK MINGGU INI:
- Waktu saat ini: **${dayName}, waktu ${timeOfDay}** (Sapaan: "${greeting}").
- Bab Kuliah: **Minggu ${meetingId} — ${theme.title}**.
- Tema Obrolan Santai: "${theme.casualTopic}".
- Filosofi Analogi Materi: "${theme.analogyBridge}".
- Pilihan Ide Obrolan:
  ${theme.starterAngles.map((angle, i) => `  * Opsi ${i + 1}: ${angle}`).join('\n')}

TAHAP OBROLAN SAAT INI (TURN ${turn}):
${
  turn === 0
    ? `- **Turn 0 (Sapaan Pembuka)**:
  * Berikan sapaan hangat yang menyebut nama mahasiswa (${studentName}).
  * Sesuaikan dengan suasana waktu ${timeOfDay} dan hari ${dayName}.
  * Tanyakan kabar mereka dan di mana mereka sedang berada/belajar saat ini dengan nada santai dan ramah.
  * PENTING: DILARANG menanyakan materi pelajaran, tugas, kode, atau kesiapan teknis di Turn 0 ini! Murni tanyakan kabar, suasana sekitar, atau aktivitas santai mereka.`
    : turn === 1
    ? `- **Turn 1 (Eksplorasi Santai Tema Bab)**:
  * Dengarkan dan tanggapi cerita/kondisi mahasiswa sebelumnya dengan hangat dan bersahabat.
  * Lemparkan obrolan santai bertema "${theme.casualTopic}" sesuai pilihan ide obrolan di atas.
  * Ajak mereka bercerita santai 2-3 kalimat.`
    : turn === 2
    ? `- **Turn 2 (Jembatan Analogi Ringan)**:
  * Tanggapi jawaban mahasiswa dengan apresiasi (bisa dibumbui senyum/emotikon ramah).
  * Sentuh secara sangat halus analogi kehidupan nyata: "${theme.analogyBridge}".
  * Tanyakan pendapat santai mereka tentang analogi tersebut tanpa terkesan sedang menguji.`
    : `- **Turn 3 (Penutup & Dorongan Motivasi - SELESAI)**:
  * Rangkum obrolan dengan kalimat yang membesarkan hati dan membakar semangat.
  * Nyatakan bahwa pikiran mereka sekarang sudah segar, rileks, dan siap untuk menghadapi sesi ujian esai hari ini.
  * Doakan yang terbaik dan sampaikan bahwa Anda yakin mereka bisa mengerjakannya dengan jujur dan maksimal.
  * Set "isComplete": true.`
}

ATURAN FORMAT OUTPUT:
Kembalikan HANYA format JSON valid berikut tanpa markdown code fences tambahan jika memungkinkan:
{
  "reply": "(Teks ucapan Pak Hadiq dalam bahasa Indonesia yang luwes, santai, sopan, dan hangat. Maksimal 2-3 paragraf pendek)",
  "isComplete": ${turn >= 3 ? 'true' : 'false'},
  "inputPlaceholder": "(Panduan placeholder santai untuk mahasiswa, misal: 'Ceritakan santai di sini...')"
}
`;

    // 1. Coba Groq API terlebih dahulu
    if (process.env.GROQ_API_KEY) {
      try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
          ],
          model: 'qwen/qwen3.8-27b',
          temperature: 0.7, // Kreatif dan hangat
          response_format: { type: 'json_object' },
        });

        const responseContent = chatCompletion.choices[0]?.message?.content || '{}';
        const parsed = parseJsonSafe(responseContent);

        return NextResponse.json({
          reply: parsed.reply || 'Halo! Bagaimana kabarmu hari ini?',
          isComplete: Boolean(parsed.isComplete || turn >= 3),
          inputPlaceholder: parsed.inputPlaceholder || 'Ketik ceritamu di sini...',
          provider: 'groq (qwen3.8)',
        });
      } catch (groqError: any) {
        console.warn('Groq warmup chat failed, trying llama fallback...', groqError.message);

        try {
          const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
          const chatCompletion = await groq.chat.completions.create({
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.map((m) => ({ role: m.role, content: m.content })),
            ],
            model: 'openai/gpt-oss-120b',
            temperature: 0.7,
            response_format: { type: 'json_object' },
          });

          const responseContent = chatCompletion.choices[0]?.message?.content || '{}';
          const parsed = parseJsonSafe(responseContent);

          return NextResponse.json({
            reply: parsed.reply || 'Halo! Senang bisa menyapa kamu.',
            isComplete: Boolean(parsed.isComplete || turn >= 3),
            inputPlaceholder: parsed.inputPlaceholder || 'Ketik ceritamu di sini...',
            provider: 'groq (gpt-oss)',
          });
        } catch (groq2Error: any) {
          console.warn('Groq 2nd model failed, fallback to Gemini...', groq2Error.message);
        }
      }
    }

    // 2. Fallback Gemini API
    if (process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
          model: 'gemini-2.5-flash-lite',
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        });

        const conversationHistory = messages
          .map((m) => `${m.role === 'assistant' ? 'Pak Hadiq' : studentName}: ${m.content}`)
          .join('\n');

        const prompt = `${systemPrompt}\n\nRIWAYAT PERCAKAPAN SEJAUH INI:\n${conversationHistory}\n\nBerikan balasan JSON sekarang:`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const parsed = parseJsonSafe(text);

        return NextResponse.json({
          reply: parsed.reply || 'Halo! Bagaimana persiapan belajarmu hari ini?',
          isComplete: Boolean(parsed.isComplete || turn >= 3),
          inputPlaceholder: parsed.inputPlaceholder || 'Ketik ceritamu di sini...',
          provider: 'gemini-2.5-flash-lite',
        });
      } catch (geminiError: any) {
        console.warn('Gemini warmup chat fallback failed:', geminiError.message);
      }
    }

    // 3. Fallback Statis Cerdas jika API jaringan terkendala
    const staticReplies: Record<number, { reply: string; isComplete: boolean; inputPlaceholder: string }> = {
      0: {
        reply: `${greeting}, ${studentName}! Senang sekali Bapak bisa menyapa kamu di sesi Minggu ke-${meetingId} ini. Bagaimana suasana belajarmu saat ini? Lagi di kos, kampus, atau rumah nih? Ceritakan santai ke Bapak ya.`,
        isComplete: false,
        inputPlaceholder: 'Ceritakan ke Bapak di mana kamu sekarang dan suasananya...',
      },
      1: {
        reply: `Wah seru juga ya! Ngomong-ngomong soal materi ${theme.title}, Bapak penasaran nih kalau di kehidupan sehari-hari kamu, apa kegiatan atau kebiasaan yang menurutmu paling butuh urutan langkah teratur?`,
        isComplete: false,
        inputPlaceholder: 'Tuliskan kegiatan sehari-hari yang menurutmu menarik...',
      },
      2: {
        reply: `Keren banget analogi dari kamu! Ternyata tanpa sadar kita semua sudah mempraktikkan logika komputasi ya di aktivitas nyata. Bapak senang mendengar ceritamu. Pikiranmu sudah terasa lebih rileks sekarang?`,
        isComplete: false,
        inputPlaceholder: 'Ceritakan apa yang kamu rasakan sekarang...',
      },
      3: {
        reply: `Mantap sekali, ${studentName}! Sekarang pikiranmu sudah segar dan rileks. Bapak percaya penuh pada kemampuanmu sendiri, baca setiap soal dengan tenang, dan berikan jawaban orisinal terbaikmu. Selamat berjuang ya!`,
        isComplete: true,
        inputPlaceholder: 'Siap masuk ke ujian!',
      },
    };

    const fallback = staticReplies[turn] || staticReplies[3];
    return NextResponse.json({
      ...fallback,
      provider: 'local-static-fallback',
    });
  } catch (error: any) {
    console.error('Error in /api/warmup-chat:', error);
    return NextResponse.json(
      {
        reply: 'Halo! Bapak ingin kita rileks sejenak sebelum memulai sesi evaluasi hari ini. Bagaimana perasaanmu sekarang? Ceritakan santai ke Bapak ya.',
        isComplete: false,
        inputPlaceholder: 'Ceritakan perasaanmu ke Bapak di sini...',
        provider: 'error-fallback',
      },
      { status: 200 }
    );
  }
}
