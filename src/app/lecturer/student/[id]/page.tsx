"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getBadgeFromScore } from "@/lib/badges";
import { BadgeDisplay } from "@/components/BadgeDisplay";
import { motion } from "framer-motion";
import { ArrowLeft, Target, AlertTriangle, FileText, Bot, User } from "lucide-react";
import Link from "next/link";

export default function LecturerStudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>(null);
  const [overallGrade, setOverallGrade] = useState<any>(null);
  const [meetingGrades, setMeetingGrades] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  
  // Filter state
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions'>('overview');

  useEffect(() => {
    async function fetchStudentData() {
      if (!studentId) return;
      
      try {
        setLoading(true);
        
        // 1. Fetch profil mahasiswa
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', studentId)
          .single();
          
        if (userData) setStudent(userData);
        
        // 2. Fetch overall grade
        const { data: overallData } = await supabase
          .from('overall_grades')
          .select('*')
          .eq('user_id', studentId)
          .single();
          
        if (overallData) setOverallGrade(overallData);
        
        // 3. Fetch meeting grades
        const { data: meetingData } = await supabase
          .from('meeting_grades')
          .select('*')
          .eq('user_id', studentId)
          .order('meeting_id', { ascending: true });
          
        if (meetingData) setMeetingGrades(meetingData);
        
        // 4. Fetch all submissions
        const { data: subData } = await supabase
          .from('quiz_submissions')
          .select('*')
          .eq('user_id', studentId)
          .order('submitted_at', { ascending: false });
          
        if (subData) setSubmissions(subData);
        
      } catch (error) {
        console.error("Gagal mengambil detail mahasiswa", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStudentData();
  }, [studentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
        <h2 className="text-2xl font-bold mb-2">Mahasiswa Tidak Ditemukan</h2>
        <button onClick={() => router.back()} className="px-6 py-3 bg-primary text-white font-bold rounded-xl mt-4">
          Kembali
        </button>
      </div>
    );
  }

  const badge = getBadgeFromScore(overallGrade?.total_avg_score || 0);
  const totalCheatingFlags = submissions.reduce((acc, curr) => acc + (curr.tab_switches > 0 ? 1 : 0), 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Khusus Profil Mahasiswa */}
      <div className="bg-card border-b border-border pt-12 pb-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <Link href="/lecturer/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 font-medium">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-24 h-24 bg-secondary/50 border-2 border-border rounded-full flex items-center justify-center shrink-0">
                <User className="w-10 h-10 text-muted-foreground" />
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-black mb-1">{student.full_name}</h1>
                <p className="text-muted-foreground mb-4 text-lg">NIM: {student.nim}</p>
                
                {totalCheatingFlags > 0 && (
                  <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-2 rounded-xl text-sm font-bold">
                    <AlertTriangle className="w-4 h-4" />
                    Terdeteksi {totalCheatingFlags}x Indikasi Pelanggaran (Pindah Tab)
                  </div>
                )}
              </div>
            </div>
            
            <div className="shrink-0 bg-background border border-border p-4 rounded-2xl flex items-center gap-6 shadow-sm">
              <div className="text-right">
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Rata-Rata Total</div>
                <div className="text-3xl font-black">{overallGrade?.total_avg_score?.toFixed(1) || '0'}</div>
              </div>
              <BadgeDisplay badge={badge} size="md" showLabel={false} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 mt-8">
        {/* Tab Navigasi */}
        <div className="flex border-b border-border mb-8">
          <button 
            className={`px-6 py-4 font-bold border-b-2 transition-colors ${activeTab === 'overview' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('overview')}
          >
            Ringkasan Rapor
          </button>
          <button 
            className={`px-6 py-4 font-bold border-b-2 transition-colors ${activeTab === 'submissions' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('submissions')}
          >
            Log Aktivitas & Esai
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {meetingGrades.length === 0 ? (
              <div className="col-span-full text-center p-12 text-muted-foreground">Belum ada data pengerjaan.</div>
            ) : (
              meetingGrades.map((mg, i) => {
                const meetingBadge = getBadgeFromScore(mg.avg_score);
                return (
                  <motion.div 
                    key={mg.meeting_id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center"
                  >
                    <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Minggu {mg.meeting_id}</div>
                    <BadgeDisplay badge={meetingBadge} size="md" />
                    <div className="mt-4 text-2xl font-black" style={{ color: meetingBadge.hexColor }}>{mg.avg_score}</div>
                  </motion.div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="space-y-6">
            {submissions.length === 0 ? (
              <div className="text-center p-12 text-muted-foreground">Belum ada submission kuis/esai.</div>
            ) : (
              submissions.map((sub, i) => (
                <motion.div 
                  key={sub.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm p-6"
                >
                  <div className="flex justify-between items-start mb-4 border-b border-border/50 pb-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-xs font-bold uppercase tracking-wider mb-2">
                        {sub.quiz_type === 'essay' ? <FileText className="w-3 h-3" /> : <Target className="w-3 h-3" />}
                        M{sub.meeting_id} - {sub.quiz_type}
                      </div>
                      <h3 className="text-lg font-bold">Modul: {sub.quiz_key}</h3>
                      <div className="text-xs text-muted-foreground mt-1">
                        Disubmit: {new Date(sub.submitted_at).toLocaleString('id-ID')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black" style={{ color: getBadgeFromScore(sub.score).hexColor }}>
                        {sub.score}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-background rounded-xl p-3 border border-border/50 text-center">
                      <div className="text-lg font-bold text-sky-400">{sub.time_spent_seconds}s</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Waktu Pengerjaan</div>
                    </div>
                    
                    {sub.tab_switches > 0 && (
                      <div className="bg-red-500/10 rounded-xl p-3 border border-red-500/30 text-center col-span-2 md:col-span-3 flex items-center justify-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <div className="text-left text-red-500">
                          <div className="text-sm font-bold">Mahasiswa keluar dari jendela ujian {sub.tab_switches} kali!</div>
                          <div className="text-[10px] uppercase tracking-wider">Potensi Kecurangan (Copy-Paste / Browsing)</div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {sub.quiz_type === 'essay' && (
                    <div className="mt-4 border-t border-border/50 pt-4">
                      {/* Tampilkan Jawaban Mahasiswa */}
                      <div className="mb-4 bg-background/50 p-4 rounded-xl border border-border/50">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Jawaban Mahasiswa:</div>
                        {/* 
                          Catatan: Di schema.sql saat ini kita menyimpan jawaban JSONB.
                          Jika menyimpan plain string di answers_json, kita render langsung. 
                          Atau jika berbentuk stringify, kita parse.
                        */}
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                          {typeof sub.answers_json === 'string' 
                            ? sub.answers_json.replace(/^"|"$/g, '') 
                            : JSON.stringify(sub.answers_json)}
                        </p>
                      </div>

                      {/* Tampilkan Ulasan AI */}
                      {sub.ai_feedback && (
                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                          <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                            <Bot className="w-4 h-4" /> Analisis Otomatis AI (Rubrik):
                          </h4>
                          <p className="text-sm leading-relaxed text-slate-300 italic">
                            "{sub.ai_feedback}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
