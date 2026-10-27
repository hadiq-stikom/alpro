"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getBadgeFromScore } from "@/lib/badges";
import { BadgeDisplay } from "@/components/BadgeDisplay";
import { motion } from "framer-motion";
import { ArrowLeft, Target, AlertTriangle, FileText, Bot, User, Filter } from "lucide-react";
import Link from "next/link";
import { SubmissionDetailCard } from "@/components/lecturer/SubmissionDetailCard";

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
  const [selectedMeetingFilter, setSelectedMeetingFilter] = useState<number | 'all'>('all');

  // Callback saat dosen mengoreksi nilai submission secara real-time
  const handleScoreUpdated = (subId: string, newScore: number, feedback: string) => {
    setSubmissions(prev => {
      const nextSubs = prev.map(sub => sub.id === subId ? { ...sub, score: newScore, ai_feedback: feedback } : sub);

      // Hitung ulang capaian per pertemuan dan rata-rata total
      const GRADABLE_TYPES = ['essay', 'exam', 'lab', 'challenge'];
      const gradeMap = new Map<number, number>();
      for (const sub of nextSubs) {
        if (
          sub.meeting_id !== undefined &&
          sub.score !== undefined &&
          sub.score > 0 &&
          GRADABLE_TYPES.includes(sub.quiz_type)
        ) {
          const cur = gradeMap.get(sub.meeting_id);
          if (cur === undefined || sub.score > cur) {
            gradeMap.set(sub.meeting_id, sub.score);
          }
        }
      }

      const synthesized = Array.from(gradeMap.entries()).map(([mid, score]) => {
        const b = getBadgeFromScore(score);
        return {
          meeting_id: mid,
          avg_score: score,
          grade_letter: b.level,
          grade_category: b.category,
          user_id: studentId
        };
      }).sort((a, b) => a.meeting_id - b.meeting_id);

      setMeetingGrades(synthesized);

      if (synthesized.length > 0) {
        const avg = synthesized.reduce((acc, curr) => acc + curr.avg_score, 0) / synthesized.length;
        const b = getBadgeFromScore(avg);
        setOverallGrade({
          user_id: studentId,
          total_avg_score: Number(avg.toFixed(2)),
          overall_grade_letter: b.level,
          overall_grade_category: b.category
        });
      }

      return nextSubs;
    });
  };

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
          .maybeSingle();
          
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
          
        if (subData) {
          setSubmissions(subData);
          
          // Aturan pedagogi: hanya essay/exam/lab yang jadi sumber nilai. MCQ quiz hanya syarat masuk.
          const GRADABLE_TYPES = ['essay', 'exam', 'lab', 'challenge'];
          
          const gradeMap = new Map<number, number>();
          if (meetingData) {
            for (const item of (meetingData as any[])) {
              gradeMap.set(item.meeting_id, item.avg_score);
            }
          }
          // Fallback: hanya esai/exam/lab yang dihitung (score > 0)
          for (const sub of (subData as any[])) {
            if (
              sub.meeting_id !== undefined &&
              sub.score !== undefined &&
              sub.score > 0 &&
              GRADABLE_TYPES.includes(sub.quiz_type)
            ) {
              const cur = gradeMap.get(sub.meeting_id);
              if (cur === undefined || sub.score > cur) {
                gradeMap.set(sub.meeting_id, sub.score);
              }
            }
          }
          
          if (!meetingData || meetingData.length < gradeMap.size) {
            const synthesized: any[] = Array.from(gradeMap.entries()).map(([mid, score]) => {
              const b = getBadgeFromScore(score);
              return {
                meeting_id: mid,
                avg_score: score,
                grade_letter: b.level,
                grade_category: b.category,
                user_id: studentId
              };
            }).sort((a, b) => a.meeting_id - b.meeting_id);
            setMeetingGrades(synthesized);
            
            if (!overallData && synthesized.length > 0) {
              const avg = synthesized.reduce((acc, curr) => acc + curr.avg_score, 0) / synthesized.length;
              const b = getBadgeFromScore(avg);
              setOverallGrade({
                user_id: studentId,
                total_avg_score: Number(avg.toFixed(2)),
                overall_grade_letter: b.level,
                overall_grade_category: b.category
              });
            }
          }
        }
        
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
            {/* Filter Pertemuan & Jumlah Submisi */}
            {submissions.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-4 bg-card border border-border p-4 rounded-2xl mb-6">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Filter className="w-4 h-4 text-primary" />
                  <span>Filter Berdasarkan Pertemuan:</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setSelectedMeetingFilter('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedMeetingFilter === 'all'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-secondary/70 text-secondary-foreground hover:bg-secondary'
                    }`}
                  >
                    Semua ({submissions.length})
                  </button>
                  {Array.from(new Set(submissions.map(s => s.meeting_id)))
                    .filter(Boolean)
                    .sort((a, b) => a - b)
                    .map(mId => {
                      const count = submissions.filter(s => s.meeting_id === mId).length;
                      return (
                        <button
                          key={mId}
                          onClick={() => setSelectedMeetingFilter(mId)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            selectedMeetingFilter === mId
                              ? 'bg-primary text-primary-foreground shadow-sm'
                              : 'bg-secondary/70 text-secondary-foreground hover:bg-secondary'
                          }`}
                        >
                          Minggu {mId} ({count})
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {submissions.length === 0 ? (
              <div className="text-center p-16 bg-card border border-border rounded-2xl text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-bold">Belum ada riwayat pengerjaan kuis/esai untuk mahasiswa ini.</p>
              </div>
            ) : (
              submissions
                .filter(sub => selectedMeetingFilter === 'all' || sub.meeting_id === selectedMeetingFilter)
                .map(sub => (
                  <SubmissionDetailCard 
                    key={sub.id} 
                    submission={sub} 
                    onScoreUpdated={handleScoreUpdated} 
                  />
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
