'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Sparkles, 
  HeartHandshake, 
  Smile, 
  Coffee, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Flame,
  MessageSquareHeart,
  Bot
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getTimeContext, getWarmupTheme } from '@/lib/warmup-themes';
import { ConceptBaselineProfile } from '@/components/assessment/RapidConceptGateway';

interface WarmupMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
}

interface WarmupChatProps {
  meetingId: number;
  onWarmupComplete: (baseline: ConceptBaselineProfile) => void;
}

export function WarmupChat({ meetingId, onWarmupComplete }: WarmupChatProps) {
  const { profile } = useAuth();
  const studentName = profile?.full_name?.split(' ')[0] || 'Teman-teman';

  const [messages, setMessages] = useState<WarmupMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [turn, setTurn] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [inputPlaceholder, setInputPlaceholder] = useState('Ketik ceritamu santai di sini...');
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  // Telemetri tersembunyi untuk Golden Baseline
  const startTimeRef = useRef<number>(Date.now());
  const keystrokeCountRef = useRef<number>(0);
  const backspaceCountRef = useRef<number>(0);
  const studentTextsRef = useRef<string[]>([]);
  const tabSwitchesRef = useRef<number>(0);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const theme = getWarmupTheme(meetingId);
  const timeContext = getTimeContext();

  // Scroll otomatis HANYA di dalam kontainer pesan chat (tanpa menggulir window/halaman peramban)
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Pantau tab switch selama obrolan (anti-cheat telemetry)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        tabSwitchesRef.current += 1;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Mulai turn 0: Meminta sapaan pertama dari Pak Hadiq
  useEffect(() => {
    let isMounted = true;

    async function fetchInitialGreeting() {
      setIsTyping(true);
      try {
        const res = await fetch('/api/warmup-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            meetingId,
            studentName,
            turn: 0,
            messages: [],
            timeContext,
          }),
        });

        if (!res.ok) throw new Error('Network error');
        const data = await res.json();

        if (isMounted) {
          setMessages([
            {
              id: 'msg-0',
              role: 'assistant',
              content: data.reply,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
          if (data.inputPlaceholder) setInputPlaceholder(data.inputPlaceholder);
          setTurn(1);
        }
      } catch (err) {
        console.error('Failed to load initial greeting:', err);
        if (isMounted) {
          setMessages([
            {
              id: 'msg-0',
              role: 'assistant',
              content: `${timeContext.greeting}, ${studentName}! Senang sekali Bapak bisa mendampingi kamu di materi Minggu ${meetingId} (${theme.title}). Sebelum kita mulai menguji pemahaman, mari kita rileks sejenak yuk. Bagaimana kabarmu hari ini? Lagi di kos, kampus, atau di mana nih? Ceritakan santai ke Bapak ya.`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
          setTurn(1);
        }
      } finally {
        if (isMounted) setIsTyping(false);
      }
    }

    fetchInitialGreeting();

    return () => {
      isMounted = false;
    };
  }, [meetingId, studentName]);

  // Deteksi pengetikan & telemetri keystroke
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    keystrokeCountRef.current += 1;
    if (e.key === 'Backspace' || e.key === 'Delete') {
      backspaceCountRef.current += 1;
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Burst limiter (mencegah paste masif saat ngobrol santai)
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    const diff = val.length - inputText.length;

    if (diff > 15) {
      setWarningMessage('Santai saja ya! Ketik ceritamu langsung, tidak perlu copy-paste 😉');
      setTimeout(() => setWarningMessage(null), 4000);
      return;
    }

    setInputText(val);
  };

  // Kirim balasan mahasiswa
  const handleSendMessage = async () => {
    const trimmed = inputText.trim();
    if (!trimmed || isTyping) return;

    // Minimum word check untuk validitas data
    const words = trimmed.split(/\s+/).filter(Boolean);
    if (words.length < 3) {
      setWarningMessage('Ceritakan sedikit lebih banyak ya (minimal 3-5 kata) biar obrolan kita seru 😊');
      setTimeout(() => setWarningMessage(null), 3000);
      return;
    }

    setWarningMessage(null);
    studentTextsRef.current.push(trimmed);

    const userMsg: WarmupMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/warmup-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingId,
          studentName,
          turn,
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
          timeContext,
        }),
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();

      const assistantMsg: WarmupMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (data.inputPlaceholder) setInputPlaceholder(data.inputPlaceholder);

      if (data.isComplete || turn >= 3) {
        setIsComplete(true);
      } else {
        setTurn((t) => t + 1);
      }
    } catch (err) {
      console.error('Error continuing warmup chat:', err);
      // Fallback lokal
      const assistantMsg: WarmupMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: `Terima kasih banyak sudah berbagi cerita, ${studentName}! Bapak sangat senang mendengar perspektifmu. Sekarang pikiranmu sudah jauh lebih segar dan rileks. Bapak percaya kamu bisa menuntaskan ujian ini dengan baik. Mari kita mulai ujian dengan penuh keyakinan dan kejujuran!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsComplete(true);
    } finally {
      setIsTyping(false);
    }
  };

  // Mahasiswa klik tombol "Mulai Ujian Sekarang"
  const handleProceedToExam = () => {
    const elapsedSeconds = Math.max(15, Math.round((Date.now() - startTimeRef.current) / 1000));
    const allText = studentTextsRef.current.join(' ');
    const totalWords = allText.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(0.2, elapsedSeconds / 60);

    const calculatedWpm = Math.min(85, Math.max(8, Math.round(totalWords / minutes)));
    const totalKeys = keystrokeCountRef.current || Math.max(30, allText.length);
    const totalDel = backspaceCountRef.current || 2;
    const backspaceRatio = Number((totalDel / totalKeys).toFixed(3));

    const baseline: ConceptBaselineProfile = {
      wpm: calculatedWpm,
      backspaceRatio: backspaceRatio,
      sampleText: allText || 'Sampel obrolan pemanasan mahasiswa.',
      totalKeystrokes: totalKeys,
      totalBackspaces: totalDel,
      tabSwitches: tabSwitchesRef.current,
      timeSpentSeconds: elapsedSeconds,
    };

    onWarmupComplete(baseline);
  };

  return (
    <div className="max-w-3xl mx-auto scroll-mt-36" id="warmup-chat-container">
      <motion.div 
        id="warmup-chat-card"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border-2 border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[500px] sm:h-[520px] max-h-[calc(100vh-140px)] relative"
      >
        {/* Top Gradient Line (Aksen Relaksasi Estetik) */}
        <div className="w-full h-1 bg-gradient-to-r from-primary via-indigo-500 to-emerald-400 shrink-0" />

        {/* Header Ruang Obrolan Santai */}
        <div className="bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-primary/40 shadow-sm relative bg-slate-200 dark:bg-slate-800">
                <Image 
                  src="/dosen-smile.png" 
                  alt="Pak Hadiq" 
                  width={44} 
                  height={44} 
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm sm:text-base leading-tight">
                  Pak Hadiq, ST, M.Kom
                </h3>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                  <CheckCircle2 className="w-3 h-3 text-primary" /> Dosen
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                <Coffee className="w-3 h-3 text-amber-500" />
                Obrolan Santai Pra-Ujian • Minggu {meetingId}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-500" />
            <span>Zona Relaksasi Kognitif</span>
          </div>
        </div>

        {/* Indikator Langkah Relaksasi */}
        <div className="bg-slate-100/60 dark:bg-slate-950/40 px-4 py-1.5 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>
              {isComplete 
                ? '🎉 Pikiranmu sudah rileks & siap ujian!' 
                : turn === 1 
                ? 'Langkah 1/3: Sapaan & Suasana' 
                : turn === 2 
                ? 'Langkah 2/3: Cerita & Opini Santai' 
                : 'Langkah 3/3: Jembatan Pikiran & Motivasi'}
            </span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((step) => (
              <div 
                key={step} 
                className={`w-5 h-1.5 rounded-full transition-all duration-500 ${
                  isComplete || turn >= step 
                    ? 'bg-emerald-500 shadow-sm' 
                    : 'bg-slate-300 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Area Pesan Chat */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 bg-gradient-to-b from-transparent via-slate-50/20 to-slate-100/30 dark:via-slate-900/10 dark:to-slate-900/30">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className={`flex gap-3 max-w-[88%] sm:max-w-[80%] ${
                msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {msg.role === 'assistant' ? (
                <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 shrink-0 self-end shadow-sm">
                  <Image src="/dosen-smile.png" alt="Pak Hadiq" width={36} height={36} className="object-cover w-full h-full" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 self-end shadow-md">
                  {studentName.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="space-y-1">
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-xs shadow-md font-medium'
                      : 'bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-xs shadow-sm font-normal'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
                <div className={`text-[10px] text-slate-400 font-medium px-1 flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                  {msg.timestamp}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Animasi Sedang Mengetik */}
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mr-auto"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 shrink-0 shadow-sm">
                <Image src="/dosen-smile.png" alt="Pak Hadiq" width={36} height={36} className="object-cover w-full h-full" />
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-3 rounded-2xl rounded-bl-xs shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-xs text-slate-400 font-medium ml-2">Pak Hadiq sedang mengetik...</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Warning Alert Inline */}
        <AnimatePresence>
          {warningMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-amber-500/10 border-t border-amber-500/20 px-4 py-2 text-xs text-amber-600 dark:text-amber-400 font-medium flex items-center gap-2 justify-center"
            >
              <Smile className="w-4 h-4 text-amber-500" />
              <span>{warningMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Area: Input Field ATAU Tombol Masuk Ujian */}
        <div className="p-3 sm:p-3.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 shrink-0">
          {isComplete ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-2 py-1"
            >
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Pemanasan selesai • Kesiapan mental prima</span>
              </div>
              <div>
                <button
                  onClick={handleProceedToExam}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold px-7 py-3 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all text-sm hover:scale-[1.02] cursor-pointer"
                >
                  <span>🚀 Saya Sudah Rileks &amp; Siap Masuk Ujian</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Langkah berikutnya: 5 Soal Esai Belajar Tuntas (Evaluasi AI Instan)
              </p>
            </motion.div>
          ) : (
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={inputPlaceholder}
                  rows={2}
                  disabled={isTyping}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none transition-all leading-relaxed"
                />
                <span className="absolute bottom-2 right-3 text-[10px] text-slate-400 select-none">
                  Tekan Enter ↵ untuk kirim
                </span>
              </div>

              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="h-[46px] w-[46px] rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                title="Kirim pesan"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
