"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause,
  RotateCcw, 
  StepForward,
  FileText, 
  GitBranch, 
  Code2, 
  Sparkles,
  Menu,
  Terminal,
  AlertTriangle,
  Flame,
  Maximize2,
  Minimize2,
  Tv,
  ArrowRight,
  ArrowDown
} from 'lucide-react';

// ══════════════════════════════════════════════════════════════════════════// 1. FLOWCHART VERTIKAL (STANDAR ANSI/ISO 5807 PROPORSIONAL — SELARAS IF MAJEMUK)
// ══════════════════════════════════════════════════════════════════════════════
function SwitchMatchVerticalFlowchart({
  selectedOption,
  simulateFallthrough,
  step,
}: {
  selectedOption: number;
  simulateFallthrough: boolean;
  step: number;
}) {
  const isOption1 = selectedOption === 1;
  const isOption2 = selectedOption === 2;
  const isOption3 = selectedOption === 3;
  const isOption4 = selectedOption === 4;
  const isDefault = selectedOption !== 1 && selectedOption !== 2 && selectedOption !== 3 && selectedOption !== 4;
  const activeIndex = selectedOption >= 1 && selectedOption <= 4 ? selectedOption - 1 : -1;

  const isStepActive = (s: number) => {
    if (step === 0) return true;
    return step >= s;
  };

  const cases = [
    { num: 1, title: 'Cek Saldo', action: 'Saldo: Rp2.500.000', isHit: isOption1 },
    { num: 2, title: 'Tarik Tunai', action: 'Pilih Nominal Tarik', isHit: isOption2 },
    { num: 3, title: 'Transfer Dana', action: 'Transfer Dana Bank', isHit: isOption3 },
    { num: 4, title: 'Keluar / Kartu', action: 'Kartu ATM Dikeluarkan', isHit: isOption4 },
  ];

  return (
    <svg
      viewBox="0 0 760 720"
      className="w-full h-auto select-none max-w-[700px] mx-auto"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <marker id="sms-arr-gray" markerWidth="11" markerHeight="11" refX="9.5" refY="5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 9.5 5 L 1 8.5 Z" fill="#94a3b8" />
        </marker>
        <marker id="sms-arr-green" markerWidth="12" markerHeight="12" refX="10.5" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 10.5 5.5 L 1 9.5 Z" fill="#10b981" stroke="#34d399" strokeWidth="0.5" />
        </marker>
        <marker id="sms-arr-rose" markerWidth="12" markerHeight="12" refX="10.5" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 10.5 5.5 L 1 9.5 Z" fill="#f43f5e" stroke="#fb7185" strokeWidth="0.5" />
        </marker>
        <marker id="sms-arr-amber" markerWidth="12" markerHeight="12" refX="10.5" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 10.5 5.5 L 1 9.5 Z" fill="#f59e0b" stroke="#fcd34d" strokeWidth="0.5" />
        </marker>
        <filter id="sms-glow-diamond" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="sms-glow-active" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ─── 1. START TERMINAL (MULAI) ─── */}
      <g opacity={isStepActive(1) ? 1 : 0.2}>
        <rect x="145" y="16" width="140" height="42" rx="21" fill="rgba(16,185,129,0.18)" stroke="#10b981" strokeWidth="2.5" />
        <text x="215" y="42" textAnchor="middle" fontSize="14" fontWeight="900" fill="#6ee7b7" fontFamily="monospace">
          MULAI
        </text>
      </g>
      <line x1="215" y1="58" x2="215" y2="88" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#sms-arr-gray)" opacity={isStepActive(1) ? 1 : 0.2} />

      {/* ─── 2. INPUT JAJARAN GENJANG ─── */}
      <g opacity={isStepActive(2) ? 1 : 0.2}>
        <polygon points="135,88 325,88 295,134 105,134" fill="rgba(168,85,247,0.25)" stroke="#a855f7" strokeWidth="2.5" />
        <text x="215" y="104" dominantBaseline="central" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#e9d5ff" fontFamily="monospace">
          input(pilihan)
        </text>
        <text x="215" y="120" dominantBaseline="central" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fbcfe8" fontFamily="monospace">
          [pilihan = {selectedOption}]
        </text>
      </g>
      <line x1="215" y1="134" x2="215" y2="168" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#sms-arr-gray)" opacity={isStepActive(2) ? 1 : 0.2} />

      {/* ─── 3. REL BUS PENGUMPUL (x = 675) ─── */}
      <line x1="675" y1="205" x2="675" y2="635" stroke="#334155" strokeWidth="2.5" strokeDasharray="4 4" />
      {activeIndex !== -1 && (
        <>
          <line
            x1="675"
            y1={205 + activeIndex * 95}
            x2="675"
            y2="635"
            stroke={simulateFallthrough ? '#f59e0b' : '#10b981'}
            strokeWidth="8"
            strokeOpacity="0.25"
            opacity={isStepActive(3 + activeIndex) ? 1 : 0.2}
          />
          <line
            x1="675"
            y1={205 + activeIndex * 95}
            x2="675"
            y2="635"
            stroke={simulateFallthrough ? '#f59e0b' : '#10b981'}
            strokeWidth="3.5"
            opacity={isStepActive(3 + activeIndex) ? 1 : 0.2}
          />
        </>
      )}
      {/* Rel Pengumpul Horisontal Bawah ke Titik Temu (Merge Node) — Khusus Cabang Kanan (Ya) */}
      <line x1="675" y1="635" x2="220" y2="635" stroke="#334155" strokeWidth="2.5" strokeDasharray="4 4" />
      {activeIndex !== -1 && (
        <>
          <line
            x1="675"
            y1="635"
            x2="220"
            y2="635"
            stroke={simulateFallthrough ? '#f59e0b' : '#10b981'}
            strokeWidth="8"
            strokeOpacity="0.25"
            opacity={step === 0 || step >= 7 ? 1 : 0.2}
          />
          <line
            x1="675"
            y1="635"
            x2="220"
            y2="635"
            stroke={simulateFallthrough ? '#f59e0b' : '#10b981'}
            strokeWidth="3.5"
            markerEnd={simulateFallthrough ? 'url(#sms-arr-amber)' : 'url(#sms-arr-green)'}
            opacity={step === 0 || step >= 7 ? 1 : 0.2}
          />
        </>
      )}

      {/* ─── 4. CASCADING DIAMONDS DENGAN CABANG YA KE SAMPING ─── */}
      {cases.map((c, idx) => {
        const cx = 215;
        const cy = 205 + idx * 95;
        const isHit = activeIndex === idx;
        const activeOrFall = isHit || (simulateFallthrough && selectedOption <= c.num && selectedOption >= 1);
        const isSkipped = activeIndex !== -1 && idx > activeIndex && !simulateFallthrough;
        const isPassedFalse = activeIndex > idx || (activeIndex === -1 && idx < cases.length);

        const currentStep = 3 + idx;
        const groupOpacity = isStepActive(currentStep) ? (isSkipped ? 0.35 : 1) : 0.2;

        return (
          <g key={c.num} opacity={groupOpacity}>
            {/* Belah Ketupat ANSI/ISO 5807 Besar & Kontras */}
            <polygon
              points={`${cx},${cy - 38} ${cx + 105},${cy} ${cx},${cy + 38} ${cx - 105},${cy}`}
              fill={activeOrFall ? (simulateFallthrough && !c.isHit ? '#78350f' : '#451a03') : isSkipped ? '#18181b' : '#291305'}
              stroke={activeOrFall ? (simulateFallthrough && !c.isHit ? '#f59e0b' : '#fbbf24') : isSkipped ? '#3f3f46' : '#78350f'}
              strokeWidth={activeOrFall ? 3.5 : 2}
              strokeDasharray={isSkipped ? '4 3' : undefined}
              filter={activeOrFall ? 'url(#sms-glow-diamond)' : undefined}
            />

            {/* Teks Kondisi Besar */}
            <text
              x={cx}
              y={cy - 6}
              textAnchor="middle"
              fill={activeOrFall ? '#fde68a' : isSkipped ? '#52525b' : '#fcd34d'}
              fontSize="14.5"
              fontWeight="900"
              fontFamily="monospace"
            >
              pilihan == {c.num}?
            </text>

            {/* Dynamic Status Badge */}
            <g transform={`translate(${cx}, ${cy + 14})`}>
              <rect
                x="-48"
                y="-9"
                width="96"
                height="18"
                rx="9"
                fill={activeOrFall ? (simulateFallthrough && !c.isHit ? '#d97706' : '#10b981') : isSkipped ? '#27272a' : '#881337'}
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="10.5"
                fontWeight="bold"
                fontFamily="monospace"
              >
                {isHit ? '✓ TRUE (Ya)' : (simulateFallthrough && activeOrFall) ? '⚡ FALL' : isSkipped ? '🚫 LEWATI' : '✗ FALSE'}
              </text>
            </g>

            {/* ─── CABANG YA: MENCABANG KE SAMPING (KANAN) MENUJU JAJARAN GENJANG ─── */}
            <line
              x1={cx + 105}
              y1={cy}
              x2={385}
              y2={cy}
              stroke={activeOrFall ? (simulateFallthrough && !c.isHit ? '#f59e0b' : '#10b981') : '#334155'}
              strokeWidth={activeOrFall ? 3.5 : 2}
              markerEnd={activeOrFall ? (simulateFallthrough && !c.isHit ? 'url(#sms-arr-amber)' : 'url(#sms-arr-green)') : 'url(#sms-arr-gray)'}
            />
            {/* Badge 'Ya' */}
            <rect
              x="328"
              y={cy - 19}
              width="36"
              height="18"
              rx="4"
              fill={activeOrFall ? (simulateFallthrough && !c.isHit ? '#78350f' : '#065f46') : '#1e293b'}
              stroke={activeOrFall ? (simulateFallthrough && !c.isHit ? '#f59e0b' : '#10b981') : '#334155'}
            />
            <text
              x="346"
              y={cy - 6}
              textAnchor="middle"
              fill={activeOrFall ? (simulateFallthrough && !c.isHit ? '#fde68a' : '#6ee7b7') : '#94a3b8'}
              fontSize="11"
              fontWeight="bold"
              fontFamily="monospace"
            >
              Ya
            </text>

            {/* Label Kasus di Atas Jajaran Genjang */}
            <text
              x="497"
              y={cy - 30}
              textAnchor="middle"
              fill={activeOrFall ? (simulateFallthrough && !c.isHit ? '#fde68a' : '#6ee7b7') : '#64748b'}
              fontSize="11"
              fontWeight="900"
              fontFamily="monospace"
            >
              Kasus {c.num}: {c.title}
            </text>

            {/* JAJARAN GENJANG OUTPUT (MENCABANG DI SISI KANAN) */}
            <polygon
              points={`405,${cy - 25} 615,${cy - 25} 590,${cy + 25} 380,${cy + 25}`}
              fill={activeOrFall ? (simulateFallthrough && !c.isHit ? '#78350f' : '#064e3b') : '#0f172a'}
              stroke={activeOrFall ? (simulateFallthrough && !c.isHit ? '#f59e0b' : '#10b981') : '#1e293b'}
              strokeWidth={activeOrFall ? 3 : 1.5}
              filter={activeOrFall ? 'url(#sms-glow-active)' : undefined}
            />
            <text
              x="497"
              y={cy}
              dominantBaseline="central"
              textAnchor="middle"
              fill={activeOrFall ? (simulateFallthrough && !c.isHit ? '#fde68a' : '#a7f3d0') : '#475569'}
              fontSize="12.5"
              fontWeight="bold"
              fontFamily="monospace"
            >
              output(&quot;{c.action}&quot;)
            </text>

            {/* Panah Pengumpul dari Output ke Rel Bus */}
            <line
              x1="590"
              y1={cy}
              x2="675"
              y2={cy}
              stroke={activeOrFall ? (simulateFallthrough && !c.isHit ? '#f59e0b' : '#10b981') : '#334155'}
              strokeWidth={activeOrFall ? 3.5 : 1.5}
              strokeDasharray={activeOrFall ? undefined : '3 3'}
            />

            {/* ─── CABANG TIDAK: MENGALIR KE BAWAH KE KONDISI BERIKUTNYA ─── */}
            <line
              x1={cx}
              y1={cy + 38}
              x2={cx}
              y2={idx === cases.length - 1 ? 565 : cy + 57}
              stroke={isPassedFalse ? '#f43f5e' : '#334155'}
              strokeWidth={isPassedFalse ? 3 : 2}
              markerEnd={isPassedFalse ? 'url(#sms-arr-rose)' : 'url(#sms-arr-gray)'}
            />
            {/* Badge 'Tidak' */}
            <rect
              x={cx + 8}
              y={cy + 42}
              width="46"
              height="17"
              rx="4"
              fill={isPassedFalse ? '#881337' : '#1e293b'}
              stroke={isPassedFalse ? '#f43f5e' : '#334155'}
            />
            <text
              x={cx + 31}
              y={cy + 54}
              textAnchor="middle"
              fill={isPassedFalse ? '#fecdd3' : '#64748b'}
              fontSize="10"
              fontWeight="bold"
              fontFamily="monospace"
            >
              Tidak
            </text>
          </g>
        );
      })}

      {/* ─── 5. CABANG DEFAULT / ELSE (JIKA TIDAK ADA KASUS COCOK) ─── */}
      <g opacity={isStepActive(7) ? (isDefault || simulateFallthrough ? 1 : 0.35) : 0.2}>
        {/* Label di atas jajaran genjang */}
        <text
          x="217"
          y="553"
          textAnchor="middle"
          fill={isDefault || simulateFallthrough ? '#fca5a5' : '#64748b'}
          fontSize="11"
          fontWeight="900"
          fontFamily="monospace"
        >
          DEFAULT / OTHERWISE (case _):
        </text>

        {/* Jajaran Genjang Blok DEFAULT */}
        <polygon
          points="135,565 325,565 300,615 110,615"
          fill={isDefault || simulateFallthrough ? '#881337' : '#0f172a'}
          stroke={isDefault || simulateFallthrough ? '#f43f5e' : '#1e293b'}
          strokeWidth={isDefault || simulateFallthrough ? 3 : 1.5}
        />
        <text
          x="217"
          y="590"
          dominantBaseline="central"
          textAnchor="middle"
          fill={isDefault || simulateFallthrough ? '#fecdd3' : '#475569'}
          fontSize="12.5"
          fontWeight="bold"
          fontFamily="monospace"
        >
          output(&quot;Menu Tidak Valid!&quot;)
        </text>

        {/* Panah Langsung Turun dari DEFAULT ke Titik Temu / SELESAI */}
        {(isDefault || simulateFallthrough) && (
          <line
            x1="215"
            y1="615"
            x2="215"
            y2="630"
            stroke="#f43f5e"
            strokeWidth="8"
            strokeOpacity="0.25"
            opacity={isStepActive(7) ? 1 : 0.2}
          />
        )}
        <line
          x1="215"
          y1="615"
          x2="215"
          y2="630"
          stroke={isDefault || simulateFallthrough ? '#f43f5e' : '#64748b'}
          strokeWidth={isDefault || simulateFallthrough ? 3.5 : 2.5}
          markerEnd={isDefault || simulateFallthrough ? 'url(#sms-arr-rose)' : 'url(#sms-arr-gray)'}
          opacity={isStepActive(7) ? (isDefault || simulateFallthrough ? 1 : 0.35) : 0.2}
        />
      </g>

      {/* ─── 6. MERGE NODE & SELESAI ─── */}
      <g opacity={step === 0 || step >= 7 ? 1 : 0.2}>
        <circle
          cx="215"
          cy="635"
          r="5"
          fill={activeIndex !== -1 ? (simulateFallthrough ? '#f59e0b' : '#10b981') : (isDefault || simulateFallthrough) ? '#f43f5e' : '#94a3b8'}
        />
        {(activeIndex !== -1 || isDefault || simulateFallthrough) && (
          <line
            x1="215"
            y1="640"
            x2="215"
            y2="665"
            stroke={activeIndex !== -1 ? (simulateFallthrough ? '#f59e0b' : '#10b981') : '#f43f5e'}
            strokeWidth="8"
            strokeOpacity="0.25"
          />
        )}
        <line
          x1="215"
          y1="640"
          x2="215"
          y2="665"
          stroke={activeIndex !== -1 ? (simulateFallthrough ? '#f59e0b' : '#10b981') : (isDefault || simulateFallthrough) ? '#f43f5e' : '#64748b'}
          strokeWidth={activeIndex !== -1 || isDefault || simulateFallthrough ? 3.5 : 2.5}
          markerEnd={activeIndex !== -1 ? (simulateFallthrough ? 'url(#sms-arr-amber)' : 'url(#sms-arr-green)') : (isDefault || simulateFallthrough) ? 'url(#sms-arr-rose)' : 'url(#sms-arr-gray)'}
        />

        {/* ─── 7. TERMINAL SELESAI ─── */}
        <rect
          x="145"
          y="665"
          width="140"
          height="42"
          rx="21"
          fill="rgba(239,68,68,0.18)"
          stroke="#f87171"
          strokeWidth="2.5"
        />
        <text
          x="215"
          y="686"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize="14"
          fontWeight="900"
          fill="#fecdd3"
          fontFamily="monospace"
        >
          SELESAI
        </text>
      </g>
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 2. FLOWCHART HORISONTAL (LANDSCAPE 16:9 DENGAN FONT & NODE BESAR)
// ══════════════════════════════════════════════════════════════════════════════
function SwitchMatchHorizontalFlowchart({
  selectedOption,
  simulateFallthrough,
  step,
}: {
  selectedOption: number;
  simulateFallthrough: boolean;
  step: number;
}) {
  const isOption1 = selectedOption === 1;
  const isOption2 = selectedOption === 2;
  const isOption3 = selectedOption === 3;
  const isOption4 = selectedOption === 4;
  const isDefault = selectedOption !== 1 && selectedOption !== 2 && selectedOption !== 3 && selectedOption !== 4;

  const isStepActive = (s: number) => {
    if (step === 0) return true;
    return step >= s;
  };

  const isFlowActive = step === 0 || (isDefault ? step >= 7 : step >= 3);
  const activeColor = simulateFallthrough ? '#f59e0b' : isDefault ? '#f43f5e' : '#10b981';
  const activeMarker = simulateFallthrough ? 'url(#smh-arr-rose)' : isDefault ? 'url(#smh-arr-rose)' : 'url(#smh-arr-green)';

  const cases = [
    { num: 1, label: 'case 1', title: 'Cek Saldo', action: 'Saldo: Rp2.5jt', isHit: isOption1, cx: 420 },
    { num: 2, label: 'case 2', title: 'Tarik Tunai', action: 'Nominal Tarik', isHit: isOption2, cx: 590 },
    { num: 3, label: 'case 3', title: 'Transfer Dana', action: 'Transfer Bank', isHit: isOption3, cx: 760 },
    { num: 4, label: 'case 4', title: 'Keluar / Kartu', action: 'Kartu Keluar', isHit: isOption4, cx: 930 },
  ];

  return (
    <svg 
      viewBox="0 0 1340 420" 
      className="w-full h-auto select-none min-w-[900px]" 
      style={{ overflow: 'visible' }}
    >
      <defs>
        <marker id="smh-arr-gray" markerWidth="11" markerHeight="11" refX="9.5" refY="5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 9.5 5 L 1 8.5 Z" fill="#94a3b8" />
        </marker>
        <marker id="smh-arr-green" markerWidth="12" markerHeight="12" refX="10.5" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 10.5 5.5 L 1 9.5 Z" fill="#10b981" stroke="#34d399" strokeWidth="0.5" />
        </marker>
        <marker id="smh-arr-rose" markerWidth="12" markerHeight="12" refX="10.5" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 10.5 5.5 L 1 9.5 Z" fill="#f43f5e" stroke="#fb7185" strokeWidth="0.5" />
        </marker>
        <filter id="smh-glow-diamond" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="smh-glow-active" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. MULAI */}
      <g opacity={isStepActive(1) ? 1 : 0.2}>
        <rect x="15" y="68" width="115" height="46" rx="23" fill="rgba(16,185,129,0.18)" stroke="#10b981" strokeWidth="2.5" />
        <text x="72" y="91" dominantBaseline="central" textAnchor="middle" fontSize="14" fontWeight="900" fill="#6ee7b7" fontFamily="monospace">
          MULAI
        </text>
      </g>
      <line x1="130" y1="91" x2="165" y2="91" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#smh-arr-gray)" opacity={isStepActive(1) ? 1 : 0.2} />

      {/* 2. INPUT */}
      <g opacity={isStepActive(2) ? 1 : 0.2}>
        <polygon points="185,66 335,66 315,116 165,116" fill="rgba(168,85,247,0.25)" stroke="#a855f7" strokeWidth="2.5" />
        <text x="250" y="83" dominantBaseline="central" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#e9d5ff" fontFamily="monospace">
          input(pilihan)
        </text>
        <text x="250" y="100" dominantBaseline="central" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fbcfe8" fontFamily="monospace">
          [pilihan = {selectedOption}]
        </text>
      </g>
      <line x1="325" y1="91" x2="355" y2="91" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#smh-arr-gray)" opacity={isStepActive(2) ? 1 : 0.2} />

      {/* 3. HORIZONTAL COLLECTOR BUS (y = 290) */}
      <line x1="420" y1="290" x2="1165" y2="290" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
      {isFlowActive && (
        <g>
          {/* Glow Underlayer */}
          <line
            x1={isOption1 ? 420 : isOption2 ? 590 : isOption3 ? 760 : isOption4 ? 930 : 1082}
            y1="290"
            x2="1165"
            y2="290"
            stroke={activeColor}
            strokeWidth="8"
            strokeOpacity="0.25"
            strokeLinecap="round"
          />
          {/* Main Solid Line */}
          <line
            x1={isOption1 ? 420 : isOption2 ? 590 : isOption3 ? 760 : isOption4 ? 930 : 1082}
            y1="290"
            x2="1165"
            y2="290"
            stroke={activeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Panah Horisontal Menuju SELESAI */}
          <line
            x1={(isOption1 ? 420 : isOption2 ? 590 : isOption3 ? 760 : isOption4 ? 930 : 1082) + 10}
            y1="290"
            x2={Math.min(1155, (isOption1 ? 420 : isOption2 ? 590 : isOption3 ? 760 : isOption4 ? 930 : 1082) + Math.max(35, (1165 - (isOption1 ? 420 : isOption2 ? 590 : isOption3 ? 760 : isOption4 ? 930 : 1082)) / 2))}
            y2="290"
            stroke={activeColor}
            strokeWidth="3.5"
            markerEnd={activeMarker}
          />
        </g>
      )}

      {/* 4. DISPATCHER DIAMONDS (1..4) */}
      {cases.map((c, i) => {
        const isPastHit = selectedOption < c.num && selectedOption >= 1;
        const activeOrFall = c.isHit || (simulateFallthrough && selectedOption <= c.num && selectedOption >= 1);

        return (
          <g key={c.num} opacity={isStepActive(3 + i) ? 1 : 0.2}>
            {/* Diamond */}
            <polygon
              points={`${c.cx},48 ${c.cx + 65},91 ${c.cx},134 ${c.cx - 65},91`}
              fill="#451a03"
              stroke={activeOrFall ? (simulateFallthrough && !c.isHit ? '#f59e0b' : '#10b981') : isPastHit ? '#3f3f46' : '#f59e0b'}
              strokeWidth="3"
              filter={activeOrFall ? 'url(#smh-glow-diamond)' : undefined}
              strokeDasharray={isPastHit ? '4 3' : undefined}
            />
            <text x={c.cx} y={86} textAnchor="middle" fill={isPastHit ? '#52525b' : '#fde68a'} fontSize="11" fontWeight="900" fontFamily="monospace">
              opsi == {c.num}?
            </text>
            <g transform={`translate(${c.cx}, 105)`}>
              <rect
                x="-32"
                y="-7"
                width="64"
                height="15"
                rx="7"
                fill={isPastHit ? '#27272a' : activeOrFall ? (simulateFallthrough && !c.isHit ? '#78350f' : '#065f46') : '#881337'}
                stroke={isPastHit ? '#3f3f46' : activeOrFall ? (simulateFallthrough && !c.isHit ? '#fbbf24' : '#34d399') : '#f43f5e'}
                strokeWidth="1"
              />
              <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="900" fontFamily="monospace">
                {isPastHit ? '🚫 LEWATI' : activeOrFall ? (simulateFallthrough && !c.isHit ? '⚡ FALL' : '✓ TRUE') : '✗ FALSE'}
              </text>
            </g>

            {/* Ya -> Turun ke Action Box */}
            <line
              x1={c.cx}
              y1="134"
              x2={c.cx}
              y2="185"
              stroke={activeOrFall ? (simulateFallthrough && !c.isHit ? '#f59e0b' : '#10b981') : '#64748b'}
              strokeWidth={activeOrFall ? 3 : 2}
              markerEnd={activeOrFall ? (simulateFallthrough && !c.isHit ? 'url(#smh-arr-amber)' : 'url(#smh-arr-green)') : 'url(#smh-arr-gray)'}
              strokeDasharray={activeOrFall ? undefined : '3 3'}
            />
            <text x={c.cx + 8} y="160" fill={activeOrFall ? '#10b981' : '#64748b'} fontSize="10" fontWeight="bold" fontFamily="monospace">
              ↓ Ya
            </text>

            {/* Label Kasus di Atas Jajaran Genjang */}
            <text x={c.cx} y="178" textAnchor="middle" fill={activeOrFall ? (simulateFallthrough && !c.isHit ? '#fde68a' : '#6ee7b7') : '#64748b'} fontSize="10.5" fontWeight="900" fontFamily="monospace">
              {c.label}: {c.title}
            </text>

            {/* Jajaran Genjang Aksi (ANSI/ISO Output) */}
            <polygon
              points={`${c.cx - 55},186 ${c.cx + 70},186 ${c.cx + 55},238 ${c.cx - 70},238`}
              fill={activeOrFall ? (simulateFallthrough && !c.isHit ? '#78350f' : '#064e3b') : '#0f172a'}
              stroke={activeOrFall ? (simulateFallthrough && !c.isHit ? '#f59e0b' : '#10b981') : '#1e293b'}
              strokeWidth={activeOrFall ? 2.5 : 1.5}
              opacity={activeOrFall ? 1 : 0.35}
              filter={activeOrFall ? 'url(#smh-glow-active)' : undefined}
            />
            <text x={c.cx} y="212" dominantBaseline="central" textAnchor="middle" fill={activeOrFall ? (simulateFallthrough && !c.isHit ? '#fde68a' : '#a7f3d0') : '#475569'} fontSize="11.5" fontWeight="bold" fontFamily="monospace">
              output(&quot;{c.action}&quot;)
            </text>

            {/* Line from Action Box to Collector Bus */}
            <line
              x1={c.cx}
              y1="238"
              x2={c.cx}
              y2="290"
              stroke={activeOrFall ? (simulateFallthrough && !c.isHit ? '#f59e0b' : '#10b981') : '#334155'}
              strokeWidth={activeOrFall ? 3 : 1.5}
              strokeDasharray={activeOrFall ? undefined : '3 3'}
            />

            {/* Tidak -> Lanjut ke kanan */}
            {i < cases.length - 1 ? (
              <>
                <line
                  x1={c.cx + 65}
                  y1="91"
                  x2={cases[i + 1].cx - 65}
                  y2="91"
                  stroke={!activeOrFall ? '#f43f5e' : '#334155'}
                  strokeWidth={!activeOrFall ? 3 : 2}
                  markerEnd={!activeOrFall ? 'url(#smh-arr-rose)' : 'url(#smh-arr-gray)'}
                  strokeDasharray={!activeOrFall ? undefined : '3 3'}
                />
                <text x={c.cx + 70} y="82" fill={!activeOrFall ? '#fb7185' : '#64748b'} fontSize="10" fontWeight="bold" fontFamily="monospace">
                  → Tidak
                </text>
              </>
            ) : (
              <>
                <line
                  x1={c.cx + 65}
                  y1="91"
                  x2={1025}
                  y2="91"
                  stroke={isDefault ? '#f43f5e' : '#334155'}
                  strokeWidth={isDefault ? 3 : 2}
                  markerEnd={isDefault ? 'url(#smh-arr-rose)' : 'url(#smh-arr-gray)'}
                  strokeDasharray={isDefault ? undefined : '3 3'}
                />
                <text x={c.cx + 70} y="82" fill={isDefault ? '#fb7185' : '#64748b'} fontSize="10" fontWeight="bold" fontFamily="monospace">
                  → Else
                </text>
              </>
            )}
          </g>
        );
      })}

      {/* 5. DEFAULT CASE (PARALLELOGRAM ANSI/ISO) */}
      <g opacity={isStepActive(7) ? (isDefault || simulateFallthrough ? 1 : 0.3) : 0.2}>
        <text x="1082" y="58" textAnchor="middle" fill={isDefault || simulateFallthrough ? '#fca5a5' : '#64748b'} fontSize="10.5" fontWeight="900" fontFamily="monospace">
          DEFAULT (case _):
        </text>
        <polygon
          points="1025,68 1160,68 1140,118 1005,118"
          fill={isDefault || simulateFallthrough ? '#881337' : '#0f172a'}
          stroke={isDefault || simulateFallthrough ? '#f43f5e' : '#1e293b'}
          strokeWidth={2.5}
        />
        <text x="1082" y="93" dominantBaseline="central" textAnchor="middle" fill={isDefault || simulateFallthrough ? '#fecdd3' : '#475569'} fontSize="11" fontWeight="bold" fontFamily="monospace">
          output(&quot;Menu Tidak Valid!&quot;)
        </text>

        <line x1="1082" y1="118" x2="1082" y2="290" stroke={isDefault || simulateFallthrough ? '#f43f5e' : '#334155'} strokeWidth={3} markerEnd={isDefault || simulateFallthrough ? 'url(#smh-arr-rose)' : 'url(#smh-arr-gray)'} />
      </g>

      {/* 6. MERGE NODE & SELESAI */}
      <g opacity={isFlowActive ? 1 : 0.2}>
        <circle cx="1165" cy="290" r="6" fill={isFlowActive ? activeColor : '#64748b'} stroke={isFlowActive ? '#ffffff' : '#334155'} strokeWidth="1.5" />
        <line x1="1171" y1="290" x2="1208" y2="290" stroke={isFlowActive ? activeColor : '#64748b'} strokeWidth={isFlowActive ? 3.5 : 2} markerEnd={isFlowActive ? activeMarker : 'url(#smh-arr-gray)'} />

        <rect x="1208" y="267" width="105" height="46" rx="23" fill={isFlowActive ? 'rgba(239,68,68,0.25)' : 'rgba(239,68,68,0.1)'} stroke={isFlowActive ? '#ef4444' : '#7f1d1d'} strokeWidth={3} filter={isFlowActive ? 'url(#smh-glow-diamond)' : undefined} />
        <text x="1260" y="290" dominantBaseline="central" textAnchor="middle" fontSize="13" fontWeight="900" fill={isFlowActive ? '#fca5a5' : '#991b1b'} fontFamily="monospace">
          SELESAI
        </text>
      </g>
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 4. KOMPONEN UTAMA SWITCHMATCHLAB
// ══════════════════════════════════════════════════════════════════════════════
export default function SwitchMatchLab() {
  const [selectedOption, setSelectedOption] = useState<number>(1);
  const [simulateFallthrough, setSimulateFallthrough] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'naratif' | 'flowchart' | 'pseudocode' | 'kode'>('flowchart');
  const [flowchartOrientation, setFlowchartOrientation] = useState<'vertical' | 'horizontal'>('vertical');
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [isProjectorMode, setIsProjectorMode] = useState<boolean>(false);
  const [activeLang, setActiveLang] = useState<'python' | 'js'>('python');
  const [step, setStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Pada mode Maximize (Proyektor), keputusan wajib berjejer ke samping (horisontal lanskap)
  const effectiveOrientation = isProjectorMode ? 'horizontal' : flowchartOrientation;

  const menuItems = [
    { id: 1, title: 'Cek Saldo', action: 'Saldo Anda saat ini: Rp2.500.000', icon: '💳' },
    { id: 2, title: 'Tarik Tunai', action: 'Silakan pilih nominal penarikan (Rp100.000 - Rp1.000.000)', icon: '💵' },
    { id: 3, title: 'Transfer Dana', action: 'Masukkan nomor rekening tujuan dan nominal transfer', icon: '📲' },
    { id: 4, title: 'Keluar / Selesai', action: 'Kartu ATM dikeluarkan. Terima kasih!', icon: '🚪' },
  ];

  let executionLog: string[] = [];
  if (selectedOption >= 1 && selectedOption <= 4) {
    if (simulateFallthrough && activeLang === 'js') {
      for (let i = selectedOption; i <= 4; i++) {
        const item = menuItems.find(m => m.id === i);
        if (item) executionLog.push(`[Case ${i}]: ${item.action}`);
      }
      executionLog.push('[Default]: Pilihan menu tidak valid (Ikut tereksekusi akibat fall-through!)');
    } else {
      const current = menuItems.find(m => m.id === selectedOption);
      if (current) executionLog.push(`[Pilihan ${current.id}]: ${current.action}`);
    }
  } else {
    executionLog.push('[Default / Wildcard]: Pilihan tidak dikenali. Silakan pilih menu 1 - 4.');
  }

  const maxSteps = 7;
  const animRunIdRef = useRef<number>(0);

  const runAnimation = async () => {
    if (isRunning) {
      animRunIdRef.current++;
      setIsRunning(false);
      return;
    }
    const runId = ++animRunIdRef.current;
    setIsRunning(true);
    const startFrom = (step === 0 || step >= maxSteps) ? 1 : step;
    for (let i = startFrom; i <= maxSteps; i++) {
      setStep(i);
      await new Promise(r => setTimeout(r, 650));
      if (animRunIdRef.current !== runId) return;
    }
    setIsRunning(false);
  };

  const nextStep = () => {
    animRunIdRef.current++;
    setIsRunning(false);
    if (step === 0 || step >= maxSteps) {
      setStep(1);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const reset = () => {
    animRunIdRef.current++;
    setIsRunning(false);
    setStep(0);
  };

  const getStepDescription = (s: number) => {
    if (s === 1) return 'Terminal MULAI mesin ATM dieksekusi.';
    if (s === 2) return `Input data pilihan menu: input(pilihan) = ${selectedOption}.`;
    if (s >= 3 && s <= 6) {
      const idx = s - 3;
      const c = menuItems[idx];
      const isMatch = selectedOption === c.id;
      return `Pencocokan case ${c.id} (${c.title}): ${isMatch ? '✓ MATCH (Cocok)! Menjalankan output("' + c.action + '")' : '✗ NOT MATCH (Tidak Cocok), alur turun mengevaluasi case berikutnya.'}`;
    }
    if (s === 7) return selectedOption > 4 || selectedOption < 1
      ? 'Tidak ada case 1-4 yang cocok → Menjalankan blok DEFAULT: output("Menu Tidak Valid!").'
      : 'Alur transaksi case terpilih menyatu ke Merge Node dan SELESAI.';
    return '';
  };

  const tabs = [
    { id: 'naratif', icon: <FileText className="w-3.5 h-3.5" />, label: 'Naratif' },
    { id: 'flowchart', icon: <GitBranch className="w-3.5 h-3.5" />, label: 'Flowchart' },
    { id: 'pseudocode', icon: <Sparkles className="w-3.5 h-3.5" />, label: 'Pseudocode' },
    { id: 'kode', icon: <Code2 className="w-3.5 h-3.5" />, label: 'Kode Program' },
  ] as const;

  return (
    <div className={`border border-border/60 rounded-3xl overflow-hidden bg-slate-950 shadow-2xl transition-all duration-300 ${
      isProjectorMode ? 'fixed inset-4 z-50 overflow-y-auto bg-slate-950/98 ring-4 ring-orange-500/50 backdrop-blur-2xl p-2' : ''
    }`}>
      {/* ─── Header Lab ─────────────────────────────────────────────────────── */}
      <div className="p-4 md:px-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">4️⃣</span>
          <div>
            <h3 className="font-bold text-sm md:text-base text-slate-100 flex items-center gap-2">
              <span>Lab Struktur Pemilihan Kasus Diskrit (Switch / Match)</span>
              {isProjectorMode && (
                <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-wider animate-pulse">
                  Mode Proyektor Aktif
                </span>
              )}
            </h3>
          </div>
        </div>

        {/* 4 Pilar Tabs Header */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 flex-wrap">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === tab.id
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'flowchart' && (
            <button
              onClick={() => {
                const next = !isProjectorMode;
                setIsProjectorMode(next);
                if (next) setActiveTab('flowchart');
              }}
              className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isProjectorMode
                  ? 'bg-orange-500 text-white border-orange-400 shadow-lg ring-2 ring-orange-400/50'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
              title={isProjectorMode ? 'Kembali ke Tampilan Normal' : 'Mode Layar Penuh Maximize (Keputusan Berjejer ke Samping)'}
            >
              {isProjectorMode ? (
                <>
                  <Minimize2 className="w-4 h-4" />
                  <span className="hidden sm:inline text-[11px]">Tutup Maximize</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4" />
                  <span className="hidden sm:inline text-[11px]">Maximize 16:9</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* ─── Orientation Switcher Bar ────────────────────────────────────────── */}
      {activeTab === 'flowchart' && (
        <div className="p-3 md:px-6 bg-slate-900/50 border-b border-slate-800/50 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Menu className="w-4 h-4 text-amber-400" />
            <span>Pilihan Nilai Diskrit Pasti (Simulasi Tombol Layanan ATM)</span>
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {/* Orientasi Flowchart */}
            {isProjectorMode ? (
              <div className="flex items-center bg-orange-950/70 border border-orange-500/50 text-orange-200 px-3 py-1.5 rounded-xl text-[11px] font-bold gap-2 shadow-sm">
                <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
                <span>Mode Maximize: Keputusan Berjejer ke Samping</span>
                <span className="text-[10px] bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded border border-orange-500/30 font-mono">Lanskap 16:9</span>
              </div>
            ) : (
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-bold">
                <span className="text-slate-500 px-2 flex items-center gap-1">
                  <Tv className="w-3.5 h-3.5" /> Orientasi:
                </span>
                <button
                  onClick={() => setFlowchartOrientation('vertical')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                    flowchartOrientation === 'vertical'
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Arah Atas ke Bawah: Keputusan Mengalir Vertikal dengan Output Mencabang"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span>Vertikal</span>
                </button>
                <button
                  onClick={() => setFlowchartOrientation('horizontal')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                    flowchartOrientation === 'horizontal'
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Arah Kiri ke Kanan: Keputusan Berjejer ke Samping (Optimal untuk Layar Lebar)"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Horisontal</span>
                </button>
              </div>
            )}

            {/* Kontrol Pembesaran / Zoom */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-bold">
              <span className="text-slate-500 px-2">🔍 Skala:</span>
              {[0.85, 1.0, 1.2, 1.4].map(scale => (
                <button
                  key={scale}
                  onClick={() => setZoomLevel(scale)}
                  className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                    zoomLevel === scale
                      ? 'bg-amber-600 text-white font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {Math.round(scale * 100)}%
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── Konten Tab ─────────────────────────────────────────────────────── */}
      <div className="p-4 md:p-6">
        {/* 1. TAB NARATIF */}
        {activeTab === 'naratif' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-xl">
              <p className="text-slate-300 text-xs font-medium">
                📝 <strong>Algoritma Naratif Pemilihan Nilai Diskrit</strong> — Pola pencocokan nilai pasti diskrit (pilihan 1, 2, 3, 4, atau lainnya) dengan klausul pilihan alternatif.
              </p>
            </div>

            <pre className="bg-slate-900 p-5 rounded-2xl border border-slate-800 font-mono text-sm leading-relaxed overflow-x-auto shadow-sm text-slate-300 whitespace-pre">
              <span className="text-slate-400">1. Masukkan nomor pilihan menu ATM (pilihan).</span>{'\n\n'}
              <span className="font-bold text-amber-300">2. Pilih tindakan berdasarkan nilai pilihan:</span>{'\n'}
              <span className="text-emerald-300">      Kasus 1: Tampilkan &quot;Saldo Anda saat ini: Rp2.500.000&quot; ke layar.</span>{'\n'}
              <span className="text-sky-300">      Kasus 2: Tampilkan instruksi tarik tunai ke layar.</span>{'\n'}
              <span className="text-amber-300">      Kasus 3: Tampilkan instruksi transfer dana ke layar.</span>{'\n'}
              <span className="text-purple-300">      Kasus 4: Tampilkan &quot;Kartu ATM dikeluarkan. Terima kasih!&quot; ke layar.</span>{'\n'}
              <span className="text-rose-300">      Selain itu: Tampilkan &quot;Pilihan menu tidak valid!&quot; ke layar.</span>{'\n\n'}
              <span className="text-slate-400">Selesai.</span>
            </pre>
          </motion.div>
        )}

        {/* 2. TAB FLOWCHART (STACKED LANDSCAPE ARCHITECTURE) */}
        {activeTab === 'flowchart' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">


            {/* ─── ZONA ATAS: KANVAS FLOWCHART LEBAR & ZOOMABLE ─── */}
            <div className={`w-full flex flex-col items-center justify-center p-4 md:p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-inner overflow-x-auto ${effectiveOrientation === 'horizontal' ? 'min-h-[380px]' : 'min-h-[480px]'}`}>
              <div
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  width: '100%',
                }}
              >
                {effectiveOrientation === 'vertical' && (
                  <SwitchMatchVerticalFlowchart
                    selectedOption={selectedOption}
                    simulateFallthrough={simulateFallthrough}
                    step={step}
                  />
                )}
                {effectiveOrientation === 'horizontal' && (
                  <SwitchMatchHorizontalFlowchart
                    selectedOption={selectedOption}
                    simulateFallthrough={simulateFallthrough}
                    step={step}
                  />
                )}
              </div>
            </div>

            {/* ─── ZONA BAWAH: CONTROL DOCK TERPADU & TIDAK TERPOTONG ─── */}
            <div className="p-4 md:p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                {/* 1. Tombol Layanan ATM */}
                <div className="lg:col-span-8 space-y-3">
                  <span className="text-xs font-mono text-slate-300 block font-bold">
                    Pilih Tombol Mesin ATM:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {menuItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => { setSelectedOption(item.id); reset(); }}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          selectedOption === item.id
                            ? 'bg-amber-600 text-white border-amber-500 shadow-md font-black'
                            : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                        }`}
                      >
                        <span className="text-base">{item.icon}</span>
                        <span className="truncate">{item.id}. {item.title}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => { setSelectedOption(99); reset(); }}
                    className={`w-full py-1.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      selectedOption === 99
                        ? 'bg-rose-600 text-white border-rose-500 shadow-md font-black'
                        : 'bg-slate-800/80 text-slate-400 hover:text-rose-300 border-slate-700'
                    }`}
                  >
                    ❓ Opsi Tidak Valid (Nilai 99 - Trigger Default / Otherwise)
                  </button>
                </div>

                {/* 2. Tombol Aksi Animasi: Mode Otomatis & Mode Manual */}
                <div className="lg:col-span-4 flex items-center gap-2">
                  <button
                    onClick={runAnimation}
                    className={`flex-1 flex items-center justify-center gap-2 px-3.5 py-3 rounded-2xl text-xs md:text-sm font-black transition-all cursor-pointer shadow-lg ${
                      isRunning
                        ? 'bg-amber-500 text-white shadow-amber-900/50 animate-pulse'
                        : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950/40'
                    }`}
                    title={isRunning ? 'Jeda simulasi otomatis' : 'Jalankan seluruh langkah secara otomatis'}
                  >
                    {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isRunning ? 'Jeda Otomatis' : 'Mode Otomatis'}</span>
                  </button>

                  <button
                    onClick={nextStep}
                    className={`flex-1 flex items-center justify-center gap-2 px-3.5 py-3 rounded-2xl text-xs md:text-sm font-black transition-all cursor-pointer shadow-lg border ${
                      step > 0 && !isRunning
                        ? 'bg-sky-600 hover:bg-sky-500 text-white border-sky-400/60 shadow-sky-950/40 ring-2 ring-sky-400/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white border-slate-700 shadow-md'
                    }`}
                    title="Maju langkah demi langkah (Step-by-Step) sambil menjelaskan materi"
                  >
                    <StepForward className="w-4 h-4" />
                    <span>
                      {step === 0 || isRunning ? 'Mode Manual' : `Langkah (${step}/${maxSteps})`}
                    </span>
                  </button>

                  <button
                    onClick={reset}
                    className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-bold transition-all cursor-pointer border border-slate-800 hover:border-slate-700 shadow-md shrink-0"
                    title="Reset ke Tampilan Penuh (Semua Alur)"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bilah Edukasi Mode Manual / Langkah Aktif */}
              {step > 0 && (
                <div className="p-3 rounded-2xl bg-sky-950/70 border border-sky-600/50 text-sky-200 text-xs flex flex-wrap items-center justify-between gap-3 shadow-md font-mono">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded-lg bg-sky-500/20 text-sky-300 font-black border border-sky-500/30 text-[11px] shrink-0">
                      {isRunning ? '🤖 OTOMATIS' : '👤 MANUAL'} • Langkah {step}/{maxSteps}
                    </span>
                    <span className="font-sans font-semibold text-slate-100">
                      {getStepDescription(step)}
                    </span>
                  </div>
                  {!isRunning && (
                    <span className="text-[11px] text-sky-300/80 font-bold shrink-0">
                      {step === maxSteps ? '✓ Selesai' : 'Klik "Mode Manual" untuk lanjut →'}
                    </span>
                  )}
                </div>
              )}

              {/* 3. Output Layar Terminal Mesin ATM — Widescreen, Jelas & Bebas Terpotong */}
              <div className="p-4 rounded-2xl border-2 border-slate-800 bg-slate-950 text-xs font-mono space-y-2 shadow-md">
                <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-2 gap-2">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-white text-sm">LAYAR MONITOR MESIN ATM (RUNTIME LIVE)</span>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 text-xs font-bold">
                    Opsi Terpilih: <strong className="text-white text-sm">{selectedOption}</strong>
                  </span>
                </div>
                <div className="space-y-1.5 pt-1">
                  {executionLog.map((log, i) => (
                    <div key={i} className={`p-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 ${
                      log.includes('Default')
                        ? 'bg-rose-950/50 border border-rose-800 text-rose-300'
                        : 'bg-emerald-950/50 border border-emerald-800 text-emerald-200'
                    }`}>
                      <span>&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. TAB PSEUDOCODE */}
        {activeTab === 'pseudocode' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-xl">
              <p className="text-slate-300 text-xs font-medium">
                📋 <strong>Pseudocode Standar (Struktur CASE OF)</strong> — Struktur baku pemilihan kasus diskrit pada algoritma.
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-xs text-slate-400 font-mono">pseudocode — CASE OF</span>
                </div>
              </div>
              <pre className="p-5 text-sm font-mono text-slate-200 leading-relaxed whitespace-pre overflow-x-auto">
                <span className="text-purple-400 font-bold">PROGRAM</span> <span className="text-white font-semibold">MenuLayananATM</span>{'\n'}
                <span className="text-slate-500 italic text-xs">// Pemilihan menu diskrit pasti menggunakan CASE OF</span>{'\n\n'}
                <span className="text-sky-400 font-bold">KAMUS:</span>{'\n'}
                <span className="text-slate-300">  pilihan : integer</span>{'\n\n'}
                <span className="text-amber-400 font-bold">ALGORITMA:</span>{'\n'}
                <span className="text-slate-300">  input(pilihan)</span>{'\n'}
                <span className="text-amber-300 font-bold">  case</span> <span className="text-amber-100 font-bold">pilihan</span> <span className="text-amber-300 font-bold">of</span>{'\n'}
                <span className="text-emerald-300">    1 : output(&quot;Saldo Anda saat ini: Rp2.500.000&quot;)</span>{'\n'}
                <span className="text-sky-300">    2 : output(&quot;Silakan pilih nominal penarikan&quot;)</span>{'\n'}
                <span className="text-amber-300">    3 : output(&quot;Masukkan rekening tujuan dan nominal&quot;)</span>{'\n'}
                <span className="text-purple-300">    4 : output(&quot;Kartu ATM dikeluarkan. Terima kasih!&quot;)</span>{'\n'}
                <span className="text-rose-300">    otherwise : output(&quot;Pilihan menu tidak valid!&quot;)</span>{'\n'}
                <span className="text-amber-300 font-bold">  endcase</span>{'\n'}
                <span className="text-slate-400">  output(&quot;Transaksi selesai.&quot;)</span>
              </pre>
            </div>
          </motion.div>
        )}

        {/* 4. TAB KODE PROGRAM */}
        {activeTab === 'kode' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-xl flex items-center justify-between flex-wrap gap-2">
              <p className="text-slate-300 text-xs font-medium">
                💻 <strong>Kode Program Eksekusi Langsung</strong> — Python 3.10+ (match-case) vs JavaScript (switch-case).
              </p>
            </div>

            {/* Language Selector */}
            <div className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700 w-fit">
              {(['python', 'js'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeLang === lang
                      ? lang === 'python'
                        ? 'bg-blue-600 text-white'
                        : 'bg-yellow-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lang === 'python' ? '🐍 Python (match-case)' : '⚡ JavaScript (switch-case)'}
                </button>
              ))}
            </div>

            {/* Toggle Khusus JS: Simulasi Fall-Through */}
            {activeLang === 'js' && (
              <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-rose-400" />
                    <span>Simulasikan Lupa &apos;break;&apos; (Bahaya Fall-Through):</span>
                  </div>
                  <div className="text-[10px] text-rose-400/80">
                    Eksekusi akan bablas ke case di bawahnya!
                  </div>
                </div>
                <button
                  onClick={() => setSimulateFallthrough(!simulateFallthrough)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    simulateFallthrough
                      ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {simulateFallthrough ? 'AKTIF (Bahaya)' : 'Mati (Aman)'}
                </button>
              </div>
            )}

            {/* Code Block Container */}
            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {activeLang === 'python' ? 'menu_atm.py' : 'menuAtm.js'}
                  </span>
                </div>
              </div>
              <pre className="p-5 text-sm font-mono text-slate-200 leading-relaxed overflow-x-auto">
                {activeLang === 'python' ? (
                  <>
                    <span className="text-slate-400">pilihan = {selectedOption}</span>{'\n\n'}
                    <span className="text-amber-300 font-bold">match pilihan:</span>{'\n'}
                    <span className="text-emerald-300">    case 1:</span>{'\n'}
                    <span className="text-emerald-300 font-medium">        print(&quot;Saldo Anda saat ini: Rp2.500.000&quot;){'\n'}</span>
                    <span className="text-sky-300">    case 2:</span>{'\n'}
                    <span className="text-sky-300 font-medium">        print(&quot;Silakan pilih nominal penarikan&quot;){'\n'}</span>
                    <span className="text-amber-300">    case 3:</span>{'\n'}
                    <span className="text-amber-300 font-medium">        print(&quot;Masukkan rekening tujuan &amp; nominal&quot;){'\n'}</span>
                    <span className="text-purple-300">    case 4:</span>{'\n'}
                    <span className="text-purple-300 font-medium">        print(&quot;Kartu ATM dikeluarkan. Terima kasih!&quot;){'\n'}</span>
                    <span className="text-rose-300">    case _:</span>{'\n'}
                    <span className="text-rose-300 font-medium">        print(&quot;Pilihan menu tidak valid!&quot;){'\n\n'}</span>
                    <span className="text-slate-500 italic text-xs"># Python tidak butuh break dan bebas dari risiko fall-through!</span>
                  </>
                ) : (
                  <>
                    <span className="text-slate-400">const pilihan = {selectedOption};</span>{'\n\n'}
                    <span className="text-amber-300 font-bold">switch (pilihan) {'{'}</span>{'\n'}
                    <span className="text-emerald-300">    case 1:</span>{'\n'}
                    <span className="text-emerald-300 font-medium">        console.log(&quot;Saldo Anda: Rp2.500.000&quot;);{'\n'}</span>
                    <span className="text-amber-400">{simulateFallthrough ? '        // OOPS: Lupa break!' : '        break;'}</span>{'\n'}
                    <span className="text-sky-300">    case 2:</span>{'\n'}
                    <span className="text-sky-300 font-medium">        console.log(&quot;Pilih nominal penarikan&quot;);{'\n'}</span>
                    <span className="text-amber-400">{simulateFallthrough ? '        // OOPS: Lupa break!' : '        break;'}</span>{'\n'}
                    <span className="text-amber-300">    case 3:</span>{'\n'}
                    <span className="text-amber-300 font-medium">        console.log(&quot;Rekening tujuan &amp; nominal&quot;);{'\n'}</span>
                    <span className="text-amber-400">{simulateFallthrough ? '        // OOPS: Lupa break!' : '        break;'}</span>{'\n'}
                    <span className="text-purple-300">    case 4:</span>{'\n'}
                    <span className="text-purple-300 font-medium">        console.log(&quot;Kartu ATM dikeluarkan.&quot;);{'\n'}</span>
                    <span className="text-amber-400">{simulateFallthrough ? '        // OOPS: Lupa break!' : '        break;'}</span>{'\n'}
                    <span className="text-rose-300">    default:</span>{'\n'}
                    <span className="text-rose-300 font-medium">        console.log(&quot;Pilihan tidak valid!&quot;);{'\n'}</span>
                    <span className="text-amber-300 font-bold">{'}'}</span>
                  </>
                )}
              </pre>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
