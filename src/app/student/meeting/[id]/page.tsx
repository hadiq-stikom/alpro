"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { getBadgeFromScore } from "@/lib/badges";
import { BadgeDisplay } from "@/components/BadgeDisplay";
import { TheoryAssessment } from "@/components/assessment/TheoryAssessment";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Target, AlertTriangle, FileText, Bot, BrainCircuit } from "lucide-react";
import Link from "next/link";

export default function MeetingDetailDashboard() {
  const params = useParams();
  const router = useRouter();
  const meetingId = Number(params.id);
  const { profile } = useAuth();

  const [loading, setLoading] = useState(true);
  const [meetingGrade, setMeetingGrade] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [showRemedial, setShowRemedial] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      if (!profile?.id || isNaN(meetingId)) return;
      
      try {
        setLoading(true);
        
        // Ambil rata-rata pertemuan
        const { data: gradeData } = await supabase
          .from('meeting_grades')
          .select('*')
          .eq('user_id', profile.id)
          .eq('meeting_id', meetingId)
          .single();
          
        if (gradeData) setMeetingGrade(gradeData);
        
        // Ambil semua submission untuk pertemuan ini
        const { data: subData } = await supabase
          .from('quiz_submissions')
          .select('*')
          .eq('user_id', profile.id)
          .eq('meeting_id', meetingId)
          .order('submitted_at', { ascending: false });
          
        if (subData) setSubmissions(subData);
        
      } catch (error) {
        console.error("Gagal mengambil detail pertemuan", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDetails();
  }, [profile?.id, meetingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!meetingGrade && submissions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
        <h2 className="text-2xl font-bold mb-2">Data Tidak Ditemukan</h2>
        <p className="text-muted-foreground mb-6">Anda belum mengerjakan kuis atau tugas apapun untuk Minggu {meetingId}.</p>
        <button onClick={() => router.back()} className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90">
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  const badge = getBadgeFromScore(meetingGrade?.avg_score || 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Khusus */}
      <div className="bg-card border-b border-border pt-12 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link href="/student/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 font-medium">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="shrink-0">
              <BadgeDisplay badge={badge} size="lg" />
            </div>
            
            <div className="text-center md:text-left flex-1">
              <div className="text-primary font-bold tracking-wider mb-2 uppercase text-sm">Rincian Capaian</div>
              <h1 className="text-3xl md:text-4xl font-black mb-2">Materi Minggu {meetingId}</h1>
              <p className="text-muted-foreground max-w-xl mb-6">
                Rata-rata dari semua kuis dan tugas pada pertemuan ini adalah <strong className="text-foreground">{meetingGrade?.avg_score || 0}</strong>.
              </p>
              
              {badge.level !== 'A' && (
                <button 
                  onClick={() => setShowRemedial(!showRemedial)}
                  className="bg-primary text-white font-bold py-2.5 px-6 rounded-xl hover:bg-primary/90 transition-all text-sm shadow-sm"
                >
                  {showRemedial ? "Batal Remedial" : "Mulai Remedial Sekarang"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 mt-8 space-y-6">
        {showRemedial && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-12 overflow-hidden"
          >
            <TheoryAssessment meetingId={Number(meetingId)} />
          </motion.div>
        )}

        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-primary" /> Riwayat Pengerjaan
        </h2>
        
        {submissions.map((sub, index) => (
          <motion.div 
            key={sub.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:border-primary/30 transition-colors"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4 border-b border-border/50 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-xs font-bold uppercase tracking-wider mb-2">
                    {sub.quiz_type === 'essay' ? <FileText className="w-3 h-3" /> : <Target className="w-3 h-3" />}
                    Tipe: {sub.quiz_type}
                  </div>
                  <h3 className="text-lg font-bold">Modul: {sub.quiz_key}</h3>
                  <div className="text-xs text-muted-foreground mt-1">
                    Dikirim pada: {new Date(sub.submitted_at).toLocaleString('id-ID')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black" style={{ color: getBadgeFromScore(sub.score).hexColor }}>
                    {sub.score}
                  </div>
                  <div className="text-xs text-muted-foreground font-bold uppercase">Skor Final</div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div className="bg-background rounded-xl p-3 border border-border/50 text-center">
                  <div className="text-xl font-bold text-slate-300">{sub.max_score}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Max Skor</div>
                </div>
                <div className="bg-background rounded-xl p-3 border border-border/50 text-center">
                  <div className="text-xl font-bold text-sky-400">{sub.time_spent_seconds}s</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Waktu</div>
                </div>
                <div className="bg-background rounded-xl p-3 border border-border/50 text-center col-span-2 sm:col-span-2 flex items-center justify-center gap-2">
                  <AlertTriangle className={`w-5 h-5 ${sub.tab_switches > 0 ? 'text-red-500' : 'text-emerald-500'}`} />
                  <div className="text-left">
                    <div className={`text-lg font-bold leading-tight ${sub.tab_switches > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                      {sub.tab_switches} Pelanggaran
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Pindah Tab (Anti-Cheat)</div>
                  </div>
                </div>
              </div>

              {sub.ai_feedback && (
                <div className="mt-4 bg-primary/5 border border-primary/20 rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                    <Bot className="w-24 h-24" />
                  </div>
                  <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2 relative z-10">
                    <Bot className="w-4 h-4" /> Ulasan Dosen AI:
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-300 relative z-10 italic">
                    "{sub.ai_feedback}"
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
