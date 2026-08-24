"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Trophy, Clock, Target, GraduationCap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function StudentDashboardPage() {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
              <GraduationCap className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Halo, {profile?.full_name ?? profile?.nim ?? "Mahasiswa"} 👋
              </h1>
              <p className="text-sm text-muted-foreground">
                NIM: {profile?.nim ?? "–"} • Semester Ganjil
              </p>
            </div>
          </div>
        </motion.div>

        {/* Placeholder Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen, label: "Materi Selesai", value: "0 / 16", color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
            { icon: Trophy, label: "Lencana Diraih", value: "0", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
            { icon: Target, label: "Nilai Rata-rata", value: "—", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
            { icon: Clock, label: "Waktu Belajar", value: "0 jam", color: "text-sky-500", bg: "bg-sky-500/10", border: "border-sky-500/20" },
          ].map(({ icon: Icon, label, value, color, bg, border }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className={`rounded-2xl border ${border} ${bg} p-5`}
            >
              <div className={`inline-flex p-2 rounded-lg ${bg} border ${border} mb-3`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <p className="text-2xl font-bold mb-0.5">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Placeholder content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-border bg-card p-8 text-center"
        >
          <div className="text-4xl mb-3">🚧</div>
          <h2 className="text-lg font-semibold mb-2">Dashboard Mahasiswa</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Halaman ini akan menampilkan lencana capaian, progress per pertemuan, dan riwayat asesmen.
            Fitur ini akan dibangun pada <strong>Fase 4</strong>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
