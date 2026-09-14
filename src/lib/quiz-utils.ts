/**
 * Utilitas untuk mengacak soal dan opsi menggunakan seed (berbasis ID/NIM User)
 * sehingga urutan acakan konsisten per user, tapi berbeda dengan user lain.
 */

/**
 * Generate seed integer dari sebuah string (misal User UUID atau NIM)
 * Menggunakan algoritma hash xmur3
 */
function xmur3(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

/**
 * Simple Seeded Random Number Generator (Mulberry32)
 */
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Algoritma Fisher-Yates Shuffle yang termodifikasi untuk menerima string seed.
 * 
 * @param array Array yang akan diacak
 * @param seedStr String untuk seed (misalnya userId + quizId)
 * @returns Array baru yang sudah diacak
 */
export function seededShuffle<T>(array: T[], seedStr: string): T[] {
  if (!array || array.length === 0) return [];
  
  // Kombinasikan string seed
  const seed = xmur3(seedStr)();
  const random = mulberry32(seed);
  
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Generate angka acak konsisten
    const j = Math.floor(random() * (i + 1));
    // Swap element
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

/**
 * Mendapatkan nilai acak (integer) di dalam rentang min dan max
 * berdasarkan seed tertentu. Berguna untuk membuat variasi angka dinamis di soal.
 */
export function getSeededRandomInt(min: number, max: number, seedStr: string): number {
  const seed = xmur3(seedStr)();
  const random = mulberry32(seed);
  return Math.floor(random() * (max - min + 1)) + min;
}
