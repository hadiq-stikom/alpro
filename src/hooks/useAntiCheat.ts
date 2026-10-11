'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook komprehensif Anti-AI, Anti-Cheat, dan Perekam Telemetri Ketikan Mahasiswa (Lini 1).
 * Mengamankan kontainer asesmen dari:
 * 1. Perpindahan tab (Visibility & Blur/Focus)
 * 2. Clipboard injection / Paste / Drag & Drop
 * 3. Delta Burst (deteksi injeksi teks instan > 15 karakter per tick)
 * 4. Merekam metrik ritme ketikan (Keystrokes, Backspaces, Koreksi)
 */
export function useAntiCheat(isActive: boolean = true) {
  const [tabSwitches, setTabSwitches] = useState(0);
  const [lastSwitchTime, setLastSwitchTime] = useState<number | null>(null);
  const [burstAttempts, setBurstAttempts] = useState(0);
  const [lastBurstTime, setLastBurstTime] = useState<number | null>(null);

  // Telemetri ketikan
  const [keystrokeCount, setKeystrokeCount] = useState(0);
  const [backspaceCount, setBackspaceCount] = useState(0);

  // Layer 4: Pencatat perpindahan tab (Visibility Change)
  useEffect(() => {
    if (!isActive) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitches((prev) => prev + 1);
      } else {
        setLastSwitchTime(Date.now());
        console.warn('Anti-Cheat: Terdeteksi user kembali setelah berpindah tab!');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Mendeteksi kehilangan fokus (klik aplikasi lain di background / split screen)
    const handleWindowBlur = () => {
      setTabSwitches((prev) => prev + 1);
    };

    // Mendeteksi kembalinya fokus
    const handleWindowFocus = () => {
      setLastSwitchTime(Date.now());
      console.warn('Anti-Cheat: Terdeteksi user kembali fokus ke jendela!');
    };
    
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [isActive]);

  // Layer 2: Klik kanan dinonaktifkan
  const handleContextMenu = useCallback((e: React.MouseEvent | Event) => {
    if (isActive) {
      e.preventDefault();
    }
  }, [isActive]);

  // Layer 1: Copy/Paste/Cut disabled
  const handleCopy = useCallback((e: React.ClipboardEvent) => {
    if (isActive) {
      e.preventDefault();
    }
  }, [isActive]);

  const handleCut = useCallback((e: React.ClipboardEvent) => {
    if (isActive) {
      e.preventDefault();
    }
  }, [isActive]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    if (isActive) {
      e.preventDefault();
      setBurstAttempts((prev) => prev + 1);
      setLastBurstTime(Date.now());
    }
  }, [isActive]);

  // Layer Drag & Drop lockout
  const handleDragOver = useCallback((e: React.DragEvent) => {
    if (isActive) {
      e.preventDefault();
    }
  }, [isActive]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    if (isActive) {
      e.preventDefault();
      setBurstAttempts((prev) => prev + 1);
      setLastBurstTime(Date.now());
    }
  }, [isActive]);

  // Pelindung shortcut developer tools & keyboard paste
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Cegah Developer Tools (F12, Ctrl+Shift+I, Ctrl+Shift+J)
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))
      ) {
        e.preventDefault();
        console.warn('Anti-Cheat: Akses Developer Tools diblokir.');
      }
      
      // Cegah Copy/Paste via Keyboard (Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+U)
      if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 'u')) {
        e.preventDefault();
        if (e.key === 'v') {
          setBurstAttempts((prev) => prev + 1);
          setLastBurstTime(Date.now());
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  /**
   * Perekam Telemetri Ketukan Tombol untuk Input Area (onKeyDown)
   */
  const trackKeyInput = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!isActive) return;

    if (e.key === 'Backspace' || e.key === 'Delete') {
      setBackspaceCount((prev) => prev + 1);
    } else if (e.key.length === 1 || e.key === 'Enter') {
      setKeystrokeCount((prev) => prev + 1);
    }
  }, [isActive]);

  /**
   * Delta Burst Limiter:
   * Memvalidasi perubahan nilai input. Jika delta penambahan panjang karakter
   * melebihi maxBurst (default 15 karakter) dalam 1 tick/event (ciri khas paste/injeksi),
   * tolak penambahan tersebut dan pertahankan teks sebelumnya.
   */
  const filterInputBurst = useCallback((
    prevVal: string, 
    nextVal: string, 
    maxBurst: number = 15
  ): { safeValue: string; isBurst: boolean } => {
    if (!isActive) return { safeValue: nextVal, isBurst: false };

    const diff = nextVal.length - prevVal.length;
    // Jika ada penambahan lebih dari 15 karakter secara instan
    if (diff > maxBurst) {
      setBurstAttempts((prev) => prev + 1);
      setLastBurstTime(Date.now());
      console.warn(`Anti-Cheat: Terdeteksi lonjakan karakter instan (+${diff} chars). Injeksi diblokir!`);
      return { safeValue: prevVal, isBurst: true };
    }

    return { safeValue: nextVal, isBurst: false };
  }, [isActive]);

  const resetTelemetry = useCallback(() => {
    setKeystrokeCount(0);
    setBackspaceCount(0);
    setBurstAttempts(0);
  }, []);

  return {
    tabSwitches,
    lastSwitchTime,
    burstAttempts,
    lastBurstTime,
    keystrokeCount,
    backspaceCount,
    trackKeyInput,
    filterInputBurst,
    resetTelemetry,
    // Prop ini disematkan (spread) ke kontainer asesmen
    containerProps: {
      onContextMenu: handleContextMenu,
      onCopy: handleCopy,
      onCut: handleCut,
      onPaste: handlePaste,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
      className: isActive ? 'select-none' : '',
    }
  };
}
