'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook khusus untuk mengimplementasikan Anti-AI dan Anti-Cheat
 * pada kontainer kuis atau asesmen.
 * 
 * @param isActive Menentukan apakah sistem anti-cheat sedang aktif
 */
export function useAntiCheat(isActive: boolean = true) {
  const [tabSwitches, setTabSwitches] = useState(0);
  const [lastSwitchTime, setLastSwitchTime] = useState<number | null>(null);

  // Layer 4: Pencatat perpindahan tab (Visibility Change)
  useEffect(() => {
    if (!isActive) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Terjadi saat user pindah ke tab browser lain atau me-minimize browser
        setTabSwitches((prev) => prev + 1);
      } else {
        // Terjadi saat user kembali ke tab ini
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
    }
  }, [isActive]);

  // Mencegah keydown shortcut spesifik (Ctrl+C, Ctrl+V, F12)
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Cegah Developer Tools (F12, Ctrl+Shift+I, Ctrl+Shift+J)
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J'))
      ) {
        e.preventDefault();
        console.warn('Anti-Cheat: Akses Developer Tools diblokir.');
      }
      
      // Cegah Copy/Paste via Keyboard (Ctrl+C, Ctrl+V, Ctrl+X)
      if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x')) {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  return {
    tabSwitches,
    lastSwitchTime,
    // Prop ini harus disematkan (spread) ke root <div> dari kuis
    containerProps: {
      onContextMenu: handleContextMenu,
      onCopy: handleCopy,
      onCut: handleCut,
      onPaste: handlePaste,
      // 'select-none' mencegah user memblok/menyeleksi teks dengan kursor
      className: isActive ? 'select-none' : '',
    }
  };
}
