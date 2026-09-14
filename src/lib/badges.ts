export type BadgeLevel = 'A' | 'AB' | 'B' | 'BC' | 'C' | 'CD' | 'D' | 'DE' | 'E';
export type ScoreCategory = 'Sempurna' | 'Baik' | 'Cukup' | 'Kurang';

export interface BadgeConfig {
  level: BadgeLevel;
  minScore: number;
  maxScore: number;
  name: string;
  hexColor: string;
  category: ScoreCategory;
}

export const BADGE_CONFIGS: BadgeConfig[] = [
  { level: 'A', minScore: 90, maxScore: 100, name: 'Emas (Gold)', hexColor: '#F59E0B', category: 'Sempurna' },
  { level: 'AB', minScore: 80, maxScore: 89.99, name: 'Biru Safir (Sapphire)', hexColor: '#3B82F6', category: 'Baik' },
  { level: 'B', minScore: 70, maxScore: 79.99, name: 'Hijau Zamrud (Emerald)', hexColor: '#10B981', category: 'Baik' },
  { level: 'BC', minScore: 65, maxScore: 69.99, name: 'Biru Langit (Sky)', hexColor: '#0EA5E9', category: 'Cukup' },
  { level: 'C', minScore: 55, maxScore: 64.99, name: 'Kuning (Amber)', hexColor: '#FBBF24', category: 'Cukup' },
  { level: 'CD', minScore: 50, maxScore: 54.99, name: 'Oranye (Orange)', hexColor: '#F97316', category: 'Kurang' },
  { level: 'D', minScore: 40, maxScore: 49.99, name: 'Merah Bata (Rose)', hexColor: '#F43F5E', category: 'Kurang' },
  { level: 'DE', minScore: 30, maxScore: 39.99, name: 'Merah (Red)', hexColor: '#EF4444', category: 'Kurang' },
  { level: 'E', minScore: 0, maxScore: 29.99, name: 'Abu Gelap (Slate)', hexColor: '#64748B', category: 'Kurang' },
];

/**
 * Mendapatkan konfigurasi badge berdasarkan skor.
 * @param score Skor dari 0 sampai 100
 */
export function getBadgeFromScore(score: number): BadgeConfig {
  const safeScore = Math.max(0, Math.min(100, score));
  return BADGE_CONFIGS.find((config) => safeScore >= config.minScore && safeScore <= config.maxScore) || BADGE_CONFIGS[8];
}

export interface ScoreCalculation {
  accuracy: number;
  timeReward: number;
  finalScore: number;
}

/**
 * Menghitung skor akhir kuis/lab.
 * REVISI: Skor akhir = Akurasi (0-100). Waktu pengerjaan menjadi reward terpisah (timeReward).
 * 
 * @param correctAnswers Jumlah jawaban benar
 * @param totalQuestions Total pertanyaan
 * @param timeLimitSeconds Batas waktu dalam detik
 * @param actualTimeSeconds Waktu aktual pengerjaan dalam detik
 * @param tabSwitches Jumlah pelanggaran perpindahan tab (opsional, default 0)
 */
export function calculateFinalScore(
  correctAnswers: number,
  totalQuestions: number,
  timeLimitSeconds: number,
  actualTimeSeconds: number,
  tabSwitches: number = 0
): ScoreCalculation {
  if (totalQuestions <= 0) return { accuracy: 0, timeReward: 0, finalScore: 0 };
  
  // Akurasi murni (0 - 100) berdasarkan jawaban
  let accuracy = Number(((correctAnswers / totalQuestions) * 100).toFixed(2));
  
  // Penalti Akademik: Mengurangi akurasi (Misal: 10 poin nilai per 1 pelanggaran)
  // Sesuai kesepakatan agar adil antara yang jujur dan yang curang
  if (tabSwitches > 0) {
    accuracy = Math.max(0, accuracy - (tabSwitches * 10));
  }
  
  // Reward Waktu (0 - 100) berdasarkan persentase sisa waktu
  let timeReward = 0;
  if (timeLimitSeconds > 0) {
    const savedTime = Math.max(0, timeLimitSeconds - actualTimeSeconds);
    timeReward = Number(((savedTime / timeLimitSeconds) * 100).toFixed(2));
  }
  
  // Penalti Pelanggaran Gamifikasi: Mengurangi reward waktu secara agresif (25 poin per pelanggaran)
  if (tabSwitches > 0) {
    timeReward = Math.max(0, timeReward - (tabSwitches * 25));
  }
  
  return {
    accuracy,
    timeReward: Number(timeReward.toFixed(2)),
    finalScore: accuracy
  };
}
