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
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Maximize2,
  Minimize2,
  Tv,
  ArrowRight,
  ArrowDown
} from 'lucide-react';

// ══════════════════════════════════════════════════════════════════════════════
// 1. FLOWCHART VERTIKAL (STANDAR ANSI/ISO 5807 PROPORSIONAL)
// ══════════════════════════════════════════════════════════════════════════════
function NestedVerticalFlowchart({
  usia,
  berat,
  hb,
  step,
}: {
  usia: number;
  berat: number;
  hb: number;
  step: number;
}) {
  const g1 = usia >= 17;
  const g2 = g1 && berat >= 45;
  const g3 = g2 && hb >= 12.5;

  const isStepActive = (s: number) => {
    if (step === 0) return true;
    return step >= s;
  };

  return (
    <svg
      viewBox="0 0 760 700"
      className="w-full h-auto select-none max-w-[700px] mx-auto"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <marker id="nss-arr-gray" markerWidth="11" markerHeight="11" refX="9.5" refY="5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 9.5 5 L 1 8.5 Z" fill="#94a3b8" />
        </marker>
        <marker id="nss-arr-green" markerWidth="12" markerHeight="12" refX="10.5" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 10.5 5.5 L 1 9.5 Z" fill="#10b981" stroke="#34d399" strokeWidth="0.5" />
        </marker>
        <marker id="nss-arr-rose" markerWidth="12" markerHeight="12" refX="10.5" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 10.5 5.5 L 1 9.5 Z" fill="#f43f5e" stroke="#fb7185" strokeWidth="0.5" />
        </marker>
        <filter id="nss-glow-diamond" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="nss-glow-active" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ─── 1. START TERMINAL ─── */}
      <g opacity={isStepActive(1) ? 1 : 0.2}>
        <rect x="145" y="16" width="140" height="42" rx="21" fill="rgba(16,185,129,0.18)" stroke="#10b981" strokeWidth="2.5" />
        <text x="215" y="42" textAnchor="middle" fontSize="14" fontWeight="900" fill="#6ee7b7" fontFamily="monospace">
          START
        </text>
      </g>
      <line x1="215" y1="58" x2="215" y2="86" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#nss-arr-gray)" opacity={isStepActive(1) ? 1 : 0.2} />

      {/* ─── 2. INPUT JAJARAN GENJANG ─── */}
      <g opacity={isStepActive(2) ? 1 : 0.2}>
        <polygon points="125,86 335,86 305,134 95,134" fill="rgba(168,85,247,0.25)" stroke="#a855f7" strokeWidth="2.5" />
        <text x="215" y="104" dominantBaseline="central" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#e9d5ff" fontFamily="monospace">
          input(usia, berat, Hb)
        </text>
        <text x="215" y="120" dominantBaseline="central" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fbcfe8" fontFamily="monospace">
          [{usia}th, {berat}kg, {hb.toFixed(1)}]
        </text>
      </g>
      <line x1="215" y1="134" x2="215" y2="167" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#nss-arr-gray)" opacity={isStepActive(2) ? 1 : 0.2} />

      {/* ─── 3. REL REJEKSI KANAN (x = 675) ─── */}
      <line x1="675" y1="205" x2="675" y2="575" stroke="#334155" strokeWidth="2.5" strokeDasharray="4 4" />
      {(!g1 || !g2 || !g3) && (
        <>
          <line
            x1="675"
            y1={!g1 ? 205 : !g2 ? 310 : 415}
            x2="675"
            y2="575"
            stroke="#f43f5e"
            strokeWidth="8"
            strokeOpacity="0.25"
            opacity={isStepActive(3) ? 1 : 0.2}
          />
          <line
            x1="675"
            y1={!g1 ? 205 : !g2 ? 310 : 415}
            x2="675"
            y2="575"
            stroke="#f43f5e"
            strokeWidth="3.5"
            opacity={isStepActive(3) ? 1 : 0.2}
          />
        </>
      )}
      {/* Rel Turn Left ke Merge */}
      {/* Rel Pengumpul Rejeksi Horisontal ke Titik Temu */}
      {!g3 && (
        <line
          x1="675"
          y1="575"
          x2="215"
          y2="575"
          stroke="#f43f5e"
          strokeWidth="8"
          strokeOpacity="0.25"
          opacity={step === 0 || step >= 6 ? 1 : 0.2}
        />
      )}
      <line
        x1="675"
        y1="575"
        x2="215"
        y2="575"
        stroke={!g3 ? '#f43f5e' : '#334155'}
        strokeWidth="3.5"
        markerEnd={!g3 ? 'url(#nss-arr-rose)' : undefined}
        opacity={step === 0 || step >= 6 ? 1 : 0.2}
      />

      {/* ─── GERBANG 1: USIA >= 17 (cx = 215, cy = 205) ─── */}
      <g opacity={isStepActive(3) ? 1 : 0.2}>
        {/* Diamond */}
        <polygon
          points="215,167 320,205 215,243 110,205"
          fill={g1 ? '#451a03' : '#291305'}
          stroke={g1 ? '#fbbf24' : '#f43f5e'}
          strokeWidth={g1 ? 3.5 : 2}
          filter={g1 ? 'url(#nss-glow-diamond)' : undefined}
        />
        <text x="215" y="199" textAnchor="middle" fill={g1 ? '#fde68a' : '#fecdd3'} fontSize="14.5" fontWeight="900" fontFamily="monospace">
          usia ≥ 17?
        </text>
        <g transform="translate(215, 219)">
          <rect x="-42" y="-9" width="84" height="18" rx="9" fill={g1 ? '#10b981' : '#881337'} />
          <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
            {g1 ? '✓ LOLOS' : '✗ GAGAL'}
          </text>
        </g>

        {/* Cabang GAGAL (Ke Kanan menuju Jajaran Genjang Penolakan) */}
        <line
          x1="320"
          y1="205"
          x2="385"
          y2="205"
          stroke={!g1 ? '#f43f5e' : '#334155'}
          strokeWidth={!g1 ? 3.5 : 2}
          markerEnd={!g1 ? 'url(#nss-arr-rose)' : 'url(#nss-arr-gray)'}
        />
        <rect x="330" y="186" width="46" height="17" rx="4" fill={!g1 ? '#881337' : '#1e293b'} />
        <text x="353" y="198" textAnchor="middle" fill={!g1 ? '#fecdd3' : '#64748b'} fontSize="10.5" fontWeight="bold" fontFamily="monospace">Tidak</text>

        {/* Jajaran Genjang Penolakan Gerbang 1 */}
        <polygon
          points="405,180 615,180 590,230 380,230"
          fill={!g1 ? '#881337' : '#0f172a'}
          stroke={!g1 ? '#f43f5e' : '#1e293b'}
          strokeWidth={!g1 ? 3 : 1.5}
        />
        <text x="497" y="205" dominantBaseline="central" textAnchor="middle" fill={!g1 ? '#fecdd3' : '#475569'} fontSize="13" fontWeight="bold" fontFamily="monospace">
          output(&quot;Gagal: Usia &lt; 17th&quot;)
        </text>
        <line x1="590" y1="205" x2="675" y2="205" stroke={!g1 ? '#f43f5e' : '#334155'} strokeWidth={!g1 ? 3.5 : 1.5} />

        {/* Cabang YA (Turun ke Gerbang 2) */}
        <line
          x1="215"
          y1="243"
          x2="215"
          y2="272"
          stroke={g1 ? '#10b981' : '#334155'}
          strokeWidth={g1 ? 3.5 : 2}
          markerEnd={g1 ? 'url(#nss-arr-green)' : 'url(#nss-arr-gray)'}
        />
        <rect x="223" y="247" width="34" height="17" rx="4" fill={g1 ? '#065f46' : '#1e293b'} />
        <text x="240" y="259" textAnchor="middle" fill={g1 ? '#6ee7b7' : '#94a3b8'} fontSize="11" fontWeight="bold" fontFamily="monospace">Ya</text>
      </g>

      {/* ─── GERBANG 2: BERAT >= 45 (cx = 215, cy = 310) ─── */}
      <g opacity={isStepActive(4) ? (g1 ? 1 : 0.35) : 0.2}>
        <polygon
          points="215,272 320,310 215,348 110,310"
          fill={!g1 ? '#18181b' : g2 ? '#451a03' : '#291305'}
          stroke={!g1 ? '#3f3f46' : g2 ? '#fbbf24' : '#f43f5e'}
          strokeWidth={g2 ? 3.5 : 2}
          strokeDasharray={!g1 ? '4 3' : undefined}
          filter={g2 ? 'url(#nss-glow-diamond)' : undefined}
        />
        <text x="215" y="304" textAnchor="middle" fill={!g1 ? '#52525b' : g2 ? '#fde68a' : '#fecdd3'} fontSize="14.5" fontWeight="900" fontFamily="monospace">
          berat ≥ 45 kg?
        </text>
        <g transform="translate(215, 324)">
          <rect x="-42" y="-9" width="84" height="18" rx="9" fill={!g1 ? '#27272a' : g2 ? '#10b981' : '#881337'} />
          <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
            {!g1 ? '🚫 LEWATI' : g2 ? '✓ LOLOS' : '✗ GAGAL'}
          </text>
        </g>

        {/* Cabang GAGAL (Ke Kanan) */}
        <line
          x1="320"
          y1="310"
          x2="385"
          y2="310"
          stroke={g1 && !g2 ? '#f43f5e' : '#334155'}
          strokeWidth={g1 && !g2 ? 3.5 : 2}
          markerEnd={g1 && !g2 ? 'url(#nss-arr-rose)' : 'url(#nss-arr-gray)'}
        />
        <rect x="330" y="291" width="46" height="17" rx="4" fill={g1 && !g2 ? '#881337' : '#1e293b'} />
        <text x="353" y="303" textAnchor="middle" fill={g1 && !g2 ? '#fecdd3' : '#64748b'} fontSize="10.5" fontWeight="bold" fontFamily="monospace">Tidak</text>

        {/* Jajaran Genjang Penolakan Gerbang 2 */}
        <polygon
          points="405,285 615,285 590,335 380,335"
          fill={g1 && !g2 ? '#881337' : '#0f172a'}
          stroke={g1 && !g2 ? '#f43f5e' : '#1e293b'}
          strokeWidth={g1 && !g2 ? 3 : 1.5}
        />
        <text x="497" y="310" dominantBaseline="central" textAnchor="middle" fill={g1 && !g2 ? '#fecdd3' : '#475569'} fontSize="13" fontWeight="bold" fontFamily="monospace">
          output(&quot;Gagal: Berat &lt; 45kg&quot;)
        </text>
        <line x1="590" y1="310" x2="675" y2="310" stroke={g1 && !g2 ? '#f43f5e' : '#334155'} strokeWidth={g1 && !g2 ? 3.5 : 1.5} />

        {/* Cabang YA (Turun ke Gerbang 3) */}
        <line
          x1="215"
          y1="348"
          x2="215"
          y2="377"
          stroke={g2 ? '#10b981' : '#334155'}
          strokeWidth={g2 ? 3.5 : 2}
          markerEnd={g2 ? 'url(#nss-arr-green)' : 'url(#nss-arr-gray)'}
        />
        <rect x="223" y="352" width="34" height="17" rx="4" fill={g2 ? '#065f46' : '#1e293b'} />
        <text x="240" y="364" textAnchor="middle" fill={g2 ? '#6ee7b7' : '#94a3b8'} fontSize="11" fontWeight="bold" fontFamily="monospace">Ya</text>
      </g>

      {/* ─── GERBANG 3: HB >= 12.5 (cx = 215, cy = 415) ─── */}
      <g opacity={isStepActive(5) ? (g2 ? 1 : 0.35) : 0.2}>
        <polygon
          points="215,377 320,415 215,453 110,415"
          fill={!g2 ? '#18181b' : g3 ? '#451a03' : '#291305'}
          stroke={!g2 ? '#3f3f46' : g3 ? '#fbbf24' : '#f43f5e'}
          strokeWidth={g3 ? 3.5 : 2}
          strokeDasharray={!g2 ? '4 3' : undefined}
          filter={g3 ? 'url(#nss-glow-diamond)' : undefined}
        />
        <text x="215" y="409" textAnchor="middle" fill={!g2 ? '#52525b' : g3 ? '#fde68a' : '#fecdd3'} fontSize="14.5" fontWeight="900" fontFamily="monospace">
          Hb ≥ 12.5 g/dL?
        </text>
        <g transform="translate(215, 429)">
          <rect x="-42" y="-9" width="84" height="18" rx="9" fill={!g2 ? '#27272a' : g3 ? '#10b981' : '#881337'} />
          <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
            {!g2 ? '🚫 LEWATI' : g3 ? '✓ LOLOS' : '✗ GAGAL'}
          </text>
        </g>

        {/* Cabang GAGAL (Ke Kanan) */}
        <line
          x1="320"
          y1="415"
          x2="385"
          y2="415"
          stroke={g2 && !g3 ? '#f43f5e' : '#334155'}
          strokeWidth={g2 && !g3 ? 3.5 : 2}
          markerEnd={g2 && !g3 ? 'url(#nss-arr-rose)' : 'url(#nss-arr-gray)'}
        />
        <rect x="330" y="396" width="46" height="17" rx="4" fill={g2 && !g3 ? '#881337' : '#1e293b'} />
        <text x="353" y="408" textAnchor="middle" fill={g2 && !g3 ? '#fecdd3' : '#64748b'} fontSize="10.5" fontWeight="bold" fontFamily="monospace">Tidak</text>

        {/* Jajaran Genjang Penolakan Gerbang 3 */}
        <polygon
          points="405,390 615,390 590,440 380,440"
          fill={g2 && !g3 ? '#881337' : '#0f172a'}
          stroke={g2 && !g3 ? '#f43f5e' : '#1e293b'}
          strokeWidth={g2 && !g3 ? 3 : 1.5}
        />
        <text x="497" y="415" dominantBaseline="central" textAnchor="middle" fill={g1 && g2 && !g3 ? '#fecdd3' : '#475569'} fontSize="13" fontWeight="bold" fontFamily="monospace">
          output(&quot;Gagal: Hb &lt; 12.5&quot;)
        </text>
        <line x1="590" y1="415" x2="675" y2="415" stroke={g2 && !g3 ? '#f43f5e' : '#334155'} strokeWidth={g2 && !g3 ? 3.5 : 1.5} />

        {/* Cabang YA (Turun ke Sukses) */}
        <line
          x1="215"
          y1="453"
          x2="215"
          y2="485"
          stroke={g3 ? '#10b981' : '#334155'}
          strokeWidth={g3 ? 3.5 : 2}
          markerEnd={g3 ? 'url(#nss-arr-green)' : 'url(#nss-arr-gray)'}
        />
        <rect x="223" y="457" width="34" height="17" rx="4" fill={g3 ? '#065f46' : '#1e293b'} />
        <text x="240" y="469" textAnchor="middle" fill={g3 ? '#6ee7b7' : '#94a3b8'} fontSize="11" fontWeight="bold" fontFamily="monospace">Ya</text>
      </g>

      {/* ─── 4. JAJARAN GENJANG SUKSES (LOLOS SEMUA GERBANG) ─── */}
      <g opacity={isStepActive(6) ? (g3 ? 1 : 0.2) : 0.2}>
        <polygon
          points="105,490 325,490 300,542 80,542"
          fill={g3 ? '#064e3b' : '#0f172a'}
          stroke={g3 ? '#10b981' : '#1e293b'}
          strokeWidth={g3 ? 3 : 1.5}
          filter={g3 ? 'url(#nss-glow-active)' : undefined}
        />
        <text x="200" y="516" dominantBaseline="central" textAnchor="middle" fill={g3 ? '#a7f3d0' : '#475569'} fontSize="13.5" fontWeight="900" fontFamily="monospace">
          output(&quot;LOLOS: Donor Darah!&quot;)
        </text>
        <line x1="215" y1="542" x2="215" y2="575" stroke={g3 ? '#10b981' : '#334155'} strokeWidth={g3 ? 3.5 : 1.5} />
      </g>

      {/* ─── 5. MERGE NODE & SELESAI ─── */}
      <g opacity={step === 0 || step >= 6 ? 1 : 0.2}>
        <circle
          cx="215"
          cy="575"
          r="5"
          fill={g3 ? '#10b981' : '#f43f5e'}
        />
        <line
          x1="215"
          y1="580"
          x2="215"
          y2="615"
          stroke={g3 ? '#10b981' : '#f43f5e'}
          strokeWidth="3"
          markerEnd={g3 ? 'url(#nss-arr-green)' : 'url(#nss-arr-rose)'}
        />

        <rect
          x="145"
          y="615"
          width="140"
          height="42"
          rx="21"
          fill="rgba(239,68,68,0.3)"
          stroke="#f87171"
          strokeWidth="3"
        />
        <text
          x="215"
          y="636"
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
function NestedHorizontalFlowchart({
  usia,
  berat,
  hb,
  step,
}: {
  usia: number;
  berat: number;
  hb: number;
  step: number;
}) {
  const g1 = usia >= 17;
  const g2 = g1 && berat >= 45;
  const g3 = g2 && hb >= 12.5;

  const isStepActive = (s: number) => {
    if (step === 0) return true;
    return step >= s;
  };

  const busY = 305;
  const activeColor = g3 ? '#10b981' : '#f43f5e';
  const activeMarker = g3 ? 'url(#nsth-arr-green)' : 'url(#nsth-arr-rose)';
  const isFlowActive = step === 0 || (g3 ? step >= 6 : (!g1 ? step >= 3 : (!g2 ? step >= 4 : step >= 5)));
  const cxActive = !g1 ? 328 : !g2 ? 538 : !g3 ? 748 : 976;

  return (
    <svg 
      viewBox="0 0 1210 370" 
      className="w-full h-auto select-none min-w-[900px]" 
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Marker Gray (Inactive Flow) */}
        <marker id="nsth-arr-gray" markerWidth="11" markerHeight="11" refX="9.5" refY="5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 9.5 5 L 1 8.5 Z" fill="#94a3b8" />
        </marker>
        {/* Marker Green (Active Lolos) */}
        <marker id="nsth-arr-green" markerWidth="12" markerHeight="12" refX="10.5" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 10.5 5.5 L 1 9.5 Z" fill="#10b981" stroke="#34d399" strokeWidth="0.5" />
        </marker>
        {/* Marker Rose (Active Gagal) */}
        <marker id="nsth-arr-rose" markerWidth="12" markerHeight="12" refX="10.5" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 10.5 5.5 L 1 9.5 Z" fill="#f43f5e" stroke="#fb7185" strokeWidth="0.5" />
        </marker>
        <filter id="nsth-glow-diamond" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="nsth-glow-active" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. START */}
      <g opacity={isStepActive(1) ? 1 : 0.2}>
        <rect x="15" y="42" width="76" height="36" rx="18" fill="rgba(16,185,129,0.18)" stroke="#10b981" strokeWidth="2.5" />
        <text x="53" y="60" dominantBaseline="central" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#6ee7b7" fontFamily="monospace">
          START
        </text>
      </g>
      <line x1="91" y1="60" x2="117" y2="60" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#nsth-arr-gray)" opacity={isStepActive(1) ? 1 : 0.2} />

      {/* 2. INPUT */}
      <g opacity={isStepActive(2) ? 1 : 0.2}>
        <polygon points="127,34 245,34 227,86 109,86" fill="rgba(168,85,247,0.25)" stroke="#a855f7" strokeWidth="2.5" />
        <text x="178" y="51" dominantBaseline="central" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#e9d5ff" fontFamily="monospace">
          input(usia, berat, Hb)
        </text>
        <text x="178" y="68" dominantBaseline="central" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fbcfe8" fontFamily="monospace">
          [{usia}th, {berat}kg, {hb.toFixed(1)}]
        </text>
      </g>
      <line x1="237" y1="60" x2="270" y2="60" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#nsth-arr-gray)" opacity={isStepActive(2) ? 1 : 0.2} />

      {/* 3. HORIZONTAL REJECTION BUS (y = 305) */}
      <line x1="328" y1={busY} x2="1060" y2={busY} stroke="#334155" strokeWidth="2.5" strokeDasharray="4 4" />
      {isFlowActive && (
        <g>
          {/* Glow Underlayer */}
          <line
            x1={cxActive}
            y1={busY}
            x2="1060"
            y2={busY}
            stroke={activeColor}
            strokeWidth="8"
            strokeOpacity="0.25"
            strokeLinecap="round"
          />
          {/* Core Solid Line */}
          <line
            x1={cxActive}
            y1={busY}
            x2="1060"
            y2={busY}
            stroke={activeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Panah Arah Horisontal Menuju SELESAI */}
          <line
            x1={cxActive + 10}
            y1={busY}
            x2={Math.min(1050, cxActive + Math.max(35, (1060 - cxActive) / 2))}
            y2={busY}
            stroke={activeColor}
            strokeWidth="3.5"
            markerEnd={activeMarker}
          />
        </g>
      )}

      {/* ─── GERBANG 1: USIA >= 17 (cx = 340, cy = 60) ─── */}
      <g opacity={isStepActive(3) ? 1 : 0.2}>
        <polygon
          points="340,27 410,60 340,93 270,60"
          fill={g1 ? '#451a03' : '#291305'}
          stroke={g1 ? '#fbbf24' : '#f43f5e'}
          strokeWidth={g1 ? 3.5 : 2}
          filter={g1 ? 'url(#nsth-glow-diamond)' : undefined}
        />
        <text x="340" y="56" dominantBaseline="central" textAnchor="middle" fill={g1 ? '#fde68a' : '#fecdd3'} fontSize="13.5" fontWeight="900" fontFamily="monospace">
          usia ≥ 17?
        </text>
        <g transform="translate(340, 93)">
          <rect x="-42" y="-9" width="84" height="18" rx="9" fill={g1 ? '#10b981' : '#881337'} />
          <text x="0" y="1" dominantBaseline="central" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
            {g1 ? '✓ LOLOS' : '✗ GAGAL'}
          </text>
        </g>

        {/* Cabang GAGAL (Turun ke Bawah) */}
        <line
          x1="340"
          y1="102"
          x2="340"
          y2="186"
          stroke={!g1 ? '#f43f5e' : '#334155'}
          strokeWidth={!g1 ? 3.5 : 2}
          markerEnd={!g1 ? 'url(#nsth-arr-rose)' : 'url(#nsth-arr-gray)'}
        />
        <rect x="348" y="118" width="40" height="17" rx="4" fill={!g1 ? '#881337' : '#1e293b'} stroke={!g1 ? '#f43f5e' : '#334155'} strokeWidth="1" />
        <text x="368" y="126.5" dominantBaseline="central" textAnchor="middle" fill={!g1 ? '#fecdd3' : '#64748b'} fontSize="9.5" fontWeight="bold" fontFamily="monospace">Tidak</text>

        <polygon
          points="262,186 418,186 394,244 238,244"
          fill={!g1 ? '#881337' : '#0f172a'}
          stroke={!g1 ? '#f43f5e' : '#1e293b'}
          strokeWidth={3}
        />
        <text x="328" y="215" dominantBaseline="central" textAnchor="middle" fill={!g1 ? '#fecdd3' : '#475569'} fontSize="11" fontWeight="bold" fontFamily="monospace">
          output(&quot;Gagal: Usia &lt; 17th&quot;)
        </text>
        <line x1="328" y1="244" x2="328" y2={busY} stroke={!g1 ? '#f43f5e' : '#334155'} strokeWidth={!g1 ? 3.5 : 1.5} markerEnd={!g1 ? 'url(#nsth-arr-rose)' : 'url(#nsth-arr-gray)'} />

        {/* Cabang LOLOS (Lanjut ke Kanan - 70px) */}
        <line
          x1="410"
          y1="60"
          x2="480"
          y2="60"
          stroke={g1 ? '#10b981' : '#334155'}
          strokeWidth={g1 ? 3.5 : 2}
          markerEnd={g1 ? 'url(#nsth-arr-green)' : 'url(#nsth-arr-gray)'}
        />
        {/* Floating Badge Ya */}
        <rect x="428" y="38" width="30" height="17" rx="4" fill={g1 ? '#065f46' : '#1e293b'} stroke={g1 ? '#10b981' : '#334155'} strokeWidth="1" />
        <text x="443" y="46.5" dominantBaseline="central" textAnchor="middle" fill={g1 ? '#6ee7b7' : '#94a3b8'} fontSize="10" fontWeight="bold" fontFamily="monospace">Ya</text>
      </g>

      {/* ─── GERBANG 2: BERAT >= 45 (cx = 550, cy = 60) ─── */}
      <g opacity={isStepActive(4) ? (g1 ? 1 : 0.35) : 0.2}>
        <polygon
          points="550,27 620,60 550,93 480,60"
          fill={!g1 ? '#18181b' : g2 ? '#451a03' : '#291305'}
          stroke={!g1 ? '#3f3f46' : g2 ? '#fbbf24' : '#f43f5e'}
          strokeWidth={g2 ? 3.5 : 2}
          strokeDasharray={!g1 ? '4 3' : undefined}
          filter={g2 ? 'url(#nsth-glow-diamond)' : undefined}
        />
        <text x="550" y="56" dominantBaseline="central" textAnchor="middle" fill={!g1 ? '#52525b' : g2 ? '#fde68a' : '#fecdd3'} fontSize="13.5" fontWeight="900" fontFamily="monospace">
          berat ≥ 45?
        </text>
        <g transform="translate(550, 93)">
          <rect x="-42" y="-9" width="84" height="18" rx="9" fill={!g1 ? '#27272a' : g2 ? '#10b981' : '#881337'} />
          <text x="0" y="1" dominantBaseline="central" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
            {!g1 ? '🚫 LEWATI' : g2 ? '✓ LOLOS' : '✗ GAGAL'}
          </text>
        </g>

        {/* Cabang GAGAL */}
        <line
          x1="550"
          y1="102"
          x2="550"
          y2="186"
          stroke={g1 && !g2 ? '#f43f5e' : '#334155'}
          strokeWidth={g1 && !g2 ? 3.5 : 2}
          markerEnd={g1 && !g2 ? 'url(#nsth-arr-rose)' : 'url(#nsth-arr-gray)'}
        />
        <rect x="558" y="118" width="40" height="17" rx="4" fill={g1 && !g2 ? '#881337' : '#1e293b'} stroke={g1 && !g2 ? '#f43f5e' : '#334155'} strokeWidth="1" />
        <text x="578" y="126.5" dominantBaseline="central" textAnchor="middle" fill={g1 && !g2 ? '#fecdd3' : '#64748b'} fontSize="9.5" fontWeight="bold" fontFamily="monospace">Tidak</text>

        <polygon
          points="472,186 628,186 604,244 448,244"
          fill={g1 && !g2 ? '#881337' : '#0f172a'}
          stroke={g1 && !g2 ? '#f43f5e' : '#1e293b'}
          strokeWidth={3}
        />
        <text x="538" y="215" dominantBaseline="central" textAnchor="middle" fill={g1 && !g2 ? '#fecdd3' : '#475569'} fontSize="11" fontWeight="bold" fontFamily="monospace">
          output(&quot;Gagal: Berat &lt; 45kg&quot;)
        </text>
        <line x1="538" y1="244" x2="538" y2={busY} stroke={g1 && !g2 ? '#f43f5e' : '#334155'} strokeWidth={g1 && !g2 ? 3.5 : 1.5} markerEnd={g1 && !g2 ? 'url(#nsth-arr-rose)' : 'url(#nsth-arr-gray)'} />

        {/* Cabang LOLOS (Lanjut ke Kanan - 70px) */}
        <line
          x1="620"
          y1="60"
          x2="690"
          y2="60"
          stroke={g2 ? '#10b981' : '#334155'}
          strokeWidth={g2 ? 3.5 : 2}
          markerEnd={g2 ? 'url(#nsth-arr-green)' : 'url(#nsth-arr-gray)'}
        />
        {/* Floating Badge Ya */}
        <rect x="638" y="38" width="30" height="17" rx="4" fill={g2 ? '#065f46' : '#1e293b'} stroke={g2 ? '#10b981' : '#334155'} strokeWidth="1" />
        <text x="653" y="46.5" dominantBaseline="central" textAnchor="middle" fill={g2 ? '#6ee7b7' : '#94a3b8'} fontSize="10" fontWeight="bold" fontFamily="monospace">Ya</text>
      </g>

      {/* ─── GERBANG 3: HB >= 12.5 (cx = 760, cy = 60) ─── */}
      <g opacity={isStepActive(5) ? (g2 ? 1 : 0.35) : 0.2}>
        <polygon
          points="760,27 830,60 760,93 690,60"
          fill={!g2 ? '#18181b' : g3 ? '#451a03' : '#291305'}
          stroke={!g2 ? '#3f3f46' : g3 ? '#fbbf24' : '#f43f5e'}
          strokeWidth={g3 ? 3.5 : 2}
          strokeDasharray={!g2 ? '4 3' : undefined}
          filter={g3 ? 'url(#nsth-glow-diamond)' : undefined}
        />
        <text x="760" y="56" dominantBaseline="central" textAnchor="middle" fill={!g2 ? '#52525b' : g3 ? '#fde68a' : '#fecdd3'} fontSize="13.5" fontWeight="900" fontFamily="monospace">
          Hb ≥ 12.5?
        </text>
        <g transform="translate(760, 93)">
          <rect x="-42" y="-9" width="84" height="18" rx="9" fill={!g2 ? '#27272a' : g3 ? '#10b981' : '#881337'} />
          <text x="0" y="1" dominantBaseline="central" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
            {!g2 ? '🚫 LEWATI' : g3 ? '✓ LOLOS' : '✗ GAGAL'}
          </text>
        </g>

        {/* Cabang GAGAL */}
        <line
          x1="760"
          y1="102"
          x2="760"
          y2="186"
          stroke={g2 && !g3 ? '#f43f5e' : '#334155'}
          strokeWidth={g2 && !g3 ? 3.5 : 2}
          markerEnd={g2 && !g3 ? 'url(#nsth-arr-rose)' : 'url(#nsth-arr-gray)'}
        />
        <rect x="768" y="118" width="40" height="17" rx="4" fill={g2 && !g3 ? '#881337' : '#1e293b'} stroke={g2 && !g3 ? '#f43f5e' : '#334155'} strokeWidth="1" />
        <text x="788" y="126.5" dominantBaseline="central" textAnchor="middle" fill={g2 && !g3 ? '#fecdd3' : '#64748b'} fontSize="9.5" fontWeight="bold" fontFamily="monospace">Tidak</text>

        <polygon
          points="682,186 838,186 814,244 658,244"
          fill={g2 && !g3 ? '#881337' : '#0f172a'}
          stroke={g2 && !g3 ? '#f43f5e' : '#1e293b'}
          strokeWidth={3}
        />
        <text x="748" y="215" dominantBaseline="central" textAnchor="middle" fill={g2 && !g3 ? '#fecdd3' : '#475569'} fontSize="11" fontWeight="bold" fontFamily="monospace">
          output(&quot;Gagal: Hb &lt; 12.5&quot;)
        </text>
        <line x1="748" y1="244" x2="748" y2={busY} stroke={g2 && !g3 ? '#f43f5e' : '#334155'} strokeWidth={g2 && !g3 ? 3.5 : 1.5} markerEnd={g2 && !g3 ? 'url(#nsth-arr-rose)' : 'url(#nsth-arr-gray)'} />

        {/* Cabang LOLOS (SUKSES) */}
        <line
          x1="830"
          y1="60"
          x2="883"
          y2="60"
          stroke={g3 ? '#10b981' : '#334155'}
          strokeWidth={g3 ? 3.5 : 2}
          markerEnd={g3 ? 'url(#nsth-arr-green)' : 'url(#nsth-arr-gray)'}
        />
        {/* Floating Badge Ya */}
        <rect x="848" y="38" width="30" height="17" rx="4" fill={g3 ? '#065f46' : '#1e293b'} stroke={g3 ? '#10b981' : '#334155'} strokeWidth="1" />
        <text x="863" y="46.5" dominantBaseline="central" textAnchor="middle" fill={g3 ? '#6ee7b7' : '#94a3b8'} fontSize="10" fontWeight="bold" fontFamily="monospace">Ya</text>
      </g>

      {/* ─── 4. JAJARAN GENJANG SUKSES ─── */}
      <g opacity={isStepActive(6) ? (g3 ? 1 : 0.2) : 0.2}>
        <polygon
          points="905,34 1070,34 1048,86 883,86"
          fill={g3 ? '#064e3b' : '#0f172a'}
          stroke={g3 ? '#10b981' : '#1e293b'}
          strokeWidth={3}
          filter={g3 ? 'url(#nsth-glow-active)' : undefined}
        />
        <text x="976" y="60" dominantBaseline="central" textAnchor="middle" fill={g3 ? '#a7f3d0' : '#475569'} fontSize="11.5" fontWeight="900" fontFamily="monospace">
          output(&quot;LOLOS: Donor Darah!&quot;)
        </text>
        <line x1="976" y1="86" x2="976" y2={busY} stroke={g3 ? '#10b981' : '#334155'} strokeWidth={g3 ? 3.5 : 1.5} markerEnd={g3 ? 'url(#nsth-arr-green)' : 'url(#nsth-arr-gray)'} />
      </g>

      {/* ─── 5. MERGE NODE & SELESAI ─── */}
      <g opacity={isFlowActive ? 1 : 0.2}>
        <circle cx="1060" cy={busY} r="6" fill={isFlowActive ? activeColor : '#64748b'} stroke={isFlowActive ? '#ffffff' : '#334155'} strokeWidth="1.5" />
        <line x1="1066" y1={busY} x2="1092" y2={busY} stroke={isFlowActive ? activeColor : '#64748b'} strokeWidth={isFlowActive ? 3.5 : 2} markerEnd={isFlowActive ? activeMarker : 'url(#nsth-arr-gray)'} />

        <rect x="1092" y={busY - 20} width="96" height="40" rx="20" fill={isFlowActive ? 'rgba(239,68,68,0.25)' : 'rgba(239,68,68,0.1)'} stroke={isFlowActive ? '#ef4444' : '#7f1d1d'} strokeWidth={isFlowActive ? 3 : 2} filter={isFlowActive ? 'url(#nsth-glow-diamond)' : undefined} />
        <text x="1140" y={busY} dominantBaseline="central" textAnchor="middle" fontSize="13" fontWeight="900" fill={isFlowActive ? '#fca5a5' : '#991b1b'} fontFamily="monospace">
          SELESAI
        </text>
      </g>
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 3. KOMPONEN UTAMA NESTEDDONORLAB
// ══════════════════════════════════════════════════════════════════════════════
export default function NestedDonorLab() {
  const [usia, setUsia] = useState<number>(20);
  const [berat, setBerat] = useState<number>(54);
  const [hb, setHb] = useState<number>(13.5);
  const [activeTab, setActiveTab] = useState<'naratif' | 'flowchart' | 'pseudocode' | 'kode'>('flowchart');
  const [flowchartOrientation, setFlowchartOrientation] = useState<'vertical' | 'horizontal'>('vertical');
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [isProjectorMode, setIsProjectorMode] = useState<boolean>(false);
  const [activeLang, setActiveLang] = useState<'python' | 'js'>('python');
  const [step, setStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Pada mode Maximize (Proyektor), keputusan wajib berjejer ke samping (horisontal lanskap)
  const effectiveOrientation = isProjectorMode ? 'horizontal' : flowchartOrientation;

  const isGate1Passed = usia >= 17;
  const isGate2Passed = isGate1Passed && berat >= 45;
  const isGate3Passed = isGate2Passed && hb >= 12.5;

  let failGate = 0;
  let statusMessage = "LOLOS: Memenuhi seluruh syarat medis donor darah!";
  if (!isGate1Passed) {
    failGate = 1;
    statusMessage = `DITOLAK DI GERBANG 1: Usia ${usia} tahun belum cukup (Minimal 17 tahun).`;
  } else if (!isGate2Passed) {
    failGate = 2;
    statusMessage = `DITOLAK DI GERBANG 2: Berat badan ${berat} kg kurang (Minimal 45 kg).`;
  } else if (!isGate3Passed) {
    failGate = 3;
    statusMessage = `DITOLAK DI GERBANG 3: Kadar Hb ${hb.toFixed(1)} g/dL kurang (Minimal 12.5 g/dL).`;
  }

  const maxSteps = 6;
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
    if (s === 1) return 'Terminal MULAI skrining donor darah.';
    if (s === 2) return `Input data kandidat: Usia = ${usia} th, Berat = ${berat} kg, Hb = ${hb.toFixed(1)} g/dL.`;
    if (s === 3) return `Gerbang 1 (usia ≥ 17 th): ${isGate1Passed ? '✓ LOLOS! Lanjut evaluasi berat badan.' : '✗ GAGAL! output("Gagal: Usia < 17th").'}`;
    if (s === 4) return `Gerbang 2 (berat ≥ 45 kg): ${!isGate1Passed ? '🚫 Dilewati karena Gerbang 1 gagal.' : isGate2Passed ? '✓ LOLOS! Lanjut evaluasi kadar Hb.' : '✗ GAGAL! output("Gagal: Berat < 45kg").'}`;
    if (s === 5) return `Gerbang 3 (Hb ≥ 12.5 g/dL): ${!isGate1Passed || !isGate2Passed ? '🚫 Dilewati karena gerbang sebelumnya gagal.' : isGate3Passed ? '✓ LOLOS! Memenuhi seluruh kriteria medis.' : '✗ GAGAL! output("Gagal: Hb < 12.5").'}`;
    if (s === 6) return isGate3Passed ? '🎉 output("LOLOS: Donor Darah!") → Menuju SELESAI.' : 'Alur penolakan dialirkan ke Merge Node dan SELESAI.';
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
          <span className="text-xl">2️⃣</span>
          <div>
            <h3 className="font-bold text-sm md:text-base text-slate-100 flex items-center gap-2">
              <span>Lab Percabangan Bersarang (Nested IF)</span>
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

          {/* Tombol Maximize / Mode Proyektor */}
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
            <HeartHandshake className="w-4 h-4 text-rose-400" />
            <span>Studi Kasus: Skrining 3 Gerbang Medis Donor Darah</span>
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
                📝 <strong>Algoritma Naratif Bersarang (Nested)</strong> — Keputusan di dalam keputusan. Blok IF anak ditulis menjorok ke dalam dengan hierarki indentasi yang rapi.
              </p>
            </div>

            <pre className="bg-slate-900 p-5 rounded-2xl border border-slate-800 font-mono text-sm leading-relaxed overflow-x-auto shadow-sm text-slate-300 whitespace-pre">
              <span className="text-slate-400">1. Masukkan nilai usia, beratBadan, dan hemoglobin.</span>{'\n\n'}
              <span className="font-bold text-amber-300">2. Jika usia &gt;= 17 maka:</span>{'\n'}
              <span className="font-bold text-sky-300">      Jika beratBadan &gt;= 45 maka:</span>{'\n'}
              <span className="font-bold text-purple-300">         Jika hemoglobin &gt;= 12.5 maka:</span>{'\n'}
              <span className="text-emerald-300 font-medium">            Tampilkan &quot;Selamat! Anda Lolos Skrining Donor Darah.&quot; ke layar.</span>{'\n'}
              <span className="font-bold text-purple-300">         Selain itu:</span>{'\n'}
              <span className="text-rose-300">            Tampilkan &quot;Gagal: Kadar Hemoglobin kurang dari 12.5 g/dL.&quot; ke layar.</span>{'\n'}
              <span className="font-bold text-sky-300">      Selain itu:</span>{'\n'}
              <span className="text-rose-300">         Tampilkan &quot;Gagal: Berat badan kurang dari 45 kg.&quot; ke layar.</span>{'\n'}
              <span className="font-bold text-amber-300">   Selain itu:</span>{'\n'}
              <span className="text-rose-300">      Tampilkan &quot;Gagal: Usia belum mencapai 17 tahun.&quot; ke layar.</span>{'\n\n'}
              <span className="text-slate-400">Selesai.</span>
            </pre>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-900 border border-emerald-600/30 rounded-xl">
                <p className="text-xs font-bold text-emerald-400 mb-1.5">🎯 Keunggulan Nested IF</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dapat memberikan <strong>pesan kegagalan spesifik</strong> pada setiap tahapan syarat tanpa memeriksa syarat berikutnya jika syarat awal sudah gagal.
                </p>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-xl">
                <p className="text-xs font-bold text-slate-300 mb-1.5">⚖️ Dibandingkan Operator AND Tunggal</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Jika menggunakan <code className="text-amber-300 font-mono">if usia &gt;= 17 and berat &gt;= 45 and hb &gt;= 12.5:</code>, pengguna hanya tahu &quot;Ditolak&quot; tanpa mengetahui syarat mana yang sebenarnya gagal.
                </p>
              </div>
            </div>
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
                  <NestedVerticalFlowchart
                    usia={usia}
                    berat={berat}
                    hb={hb}
                    step={step}
                  />
                )}
                {effectiveOrientation === 'horizontal' && (
                  <NestedHorizontalFlowchart
                    usia={usia}
                    berat={berat}
                    hb={hb}
                    step={step}
                  />
                )}
              </div>
            </div>

            {/* ─── ZONA BAWAH: CONTROL DOCK TERPADU & TIDAK TERPOTONG ─── */}
            <div className="p-4 md:p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                {/* 1. Kontrol 3 Slider Input */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Usia */}
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-300">1. Usia:</span>
                      <span className={`font-mono font-black text-sm px-2 py-0.5 rounded-lg bg-slate-900 border ${
                        isGate1Passed ? 'text-emerald-400 border-emerald-500/40' : 'text-rose-400 border-rose-500/40'
                      }`}>
                        {usia} thn
                      </span>
                    </div>
                    <input
                      type="range"
                      min={14}
                      max={65}
                      value={usia}
                      onChange={e => { setUsia(Number(e.target.value)); reset(); }}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                    <div className="text-[10px] text-slate-500 text-center font-mono font-bold">Syarat Min: 17 Tahun</div>
                  </div>

                  {/* Berat */}
                  <div className={`p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 transition-opacity ${!isGate1Passed ? 'opacity-40' : ''}`}>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-300">2. Berat:</span>
                      <span className={`font-mono font-black text-sm px-2 py-0.5 rounded-lg bg-slate-900 border ${
                        !isGate1Passed ? 'text-slate-500 border-slate-800' : isGate2Passed ? 'text-emerald-400 border-emerald-500/40' : 'text-rose-400 border-rose-500/40'
                      }`}>
                        {berat} kg
                      </span>
                    </div>
                    <input
                      type="range"
                      min={35}
                      max={95}
                      value={berat}
                      onChange={e => { setBerat(Number(e.target.value)); reset(); }}
                      disabled={!isGate1Passed}
                      className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                    <div className="text-[10px] text-slate-500 text-center font-mono font-bold">Syarat Min: 45 kg</div>
                  </div>

                  {/* Hb */}
                  <div className={`p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 transition-opacity ${!isGate2Passed ? 'opacity-40' : ''}`}>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-300">3. Hb:</span>
                      <span className={`font-mono font-black text-sm px-2 py-0.5 rounded-lg bg-slate-900 border ${
                        !isGate2Passed ? 'text-slate-500 border-slate-800' : isGate3Passed ? 'text-emerald-400 border-emerald-500/40' : 'text-rose-400 border-rose-500/40'
                      }`}>
                        {hb.toFixed(1)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={90}
                      max={180}
                      value={Math.round(hb * 10)}
                      onChange={e => { setHb(Number(e.target.value) / 10); reset(); }}
                      disabled={!isGate2Passed}
                      className="w-full accent-purple-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                    <div className="text-[10px] text-slate-500 text-center font-mono font-bold">Syarat Min: 12.5 g/dL</div>
                  </div>
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

              {/* 3. Pita Evaluasi Status Live — Widescreen, Jelas & Bebas Terpotong */}
              <div className={`p-4 rounded-2xl border-2 text-xs font-bold flex flex-wrap items-center justify-between gap-3 shadow-md ${
                isGate3Passed
                  ? 'border-emerald-500/80 bg-emerald-950/70 text-emerald-200'
                  : 'border-rose-500/80 bg-rose-950/70 text-rose-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl text-base font-black ${
                    isGate3Passed ? 'bg-emerald-900/80 text-emerald-300' : 'bg-rose-900/80 text-rose-300'
                  }`}>
                    {isGate3Passed ? '✓' : '✗'}
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                      Status Evaluasi Kelayakan Donor (Runtime Live):
                    </div>
                    <div className="text-sm md:text-base font-black font-mono text-white pt-0.5">
                      {statusMessage}
                    </div>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-xl text-xs md:text-sm font-black shrink-0 shadow-md ${
                  isGate3Passed ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                }`}>
                  {isGate3Passed ? '✓ LOLOS 3 GERBANG' : `✗ DITOLAK GERBANG ${failGate}`}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. TAB PSEUDOCODE */}
        {activeTab === 'pseudocode' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-xl">
              <p className="text-slate-300 text-xs font-medium">
                📋 <strong>Pseudocode Standar 3 Blok</strong> — Struktur percabangan bersarang dengan pasangan <code>if ... endif</code> pada setiap tingkatan blok.
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
                  <span className="text-xs text-slate-400 font-mono">pseudocode — NESTED IF</span>
                </div>
              </div>
              <pre className="p-5 text-sm font-mono text-slate-200 leading-relaxed whitespace-pre overflow-x-auto">
                <span className="text-purple-400 font-bold">PROGRAM</span> <span className="text-white font-semibold">SkriningDonorDarah</span>{'\n'}
                <span className="text-slate-500 italic text-xs">// Skrining bertingkat kelayakan medis donor darah</span>{'\n\n'}
                <span className="text-sky-400 font-bold">KAMUS:</span>{'\n'}
                <span className="text-slate-300">  usia, beratBadan : integer</span>{'\n'}
                <span className="text-slate-300">  hemoglobin : real</span>{'\n\n'}
                <span className="text-amber-400 font-bold">ALGORITMA:</span>{'\n'}
                <span className="text-slate-300">  input(usia, beratBadan, hemoglobin)</span>{'\n'}
                <span className="text-amber-300 font-bold">  if</span> <span className="text-amber-100 font-bold">usia &gt;= 17</span> <span className="text-amber-300 font-bold">then</span>{'\n'}
                <span className="text-sky-300 font-bold">    if</span> <span className="text-sky-100 font-bold">beratBadan &gt;= 45</span> <span className="text-sky-300 font-bold">then</span>{'\n'}
                <span className="text-purple-300 font-bold">      if</span> <span className="text-purple-100 font-bold">hemoglobin &gt;= 12.5</span> <span className="text-purple-300 font-bold">then</span>{'\n'}
                <span className="text-emerald-300 font-medium">        output(&quot;Selamat! Anda LOLOS donor darah.&quot;)</span>{'\n'}
                <span className="text-purple-300 font-bold">      else</span>{'\n'}
                <span className="text-rose-300 font-medium">        output(&quot;Gagal: Kadar Hemoglobin kurang.&quot;)</span>{'\n'}
                <span className="text-purple-300 font-bold">      endif</span>{'\n'}
                <span className="text-sky-300 font-bold">    else</span>{'\n'}
                <span className="text-rose-300 font-medium">      output(&quot;Gagal: Berat badan kurang dari 45 kg.&quot;)</span>{'\n'}
                <span className="text-sky-300 font-bold">    endif</span>{'\n'}
                <span className="text-amber-300 font-bold">  else</span>{'\n'}
                <span className="text-rose-300 font-medium">    output(&quot;Gagal: Usia belum mencapai 17 tahun.&quot;)</span>{'\n'}
                <span className="text-amber-300 font-bold">  endif</span>{'\n'}
                <span className="text-slate-400">  output(&quot;Skrining selesai.&quot;)</span>
              </pre>
            </div>
          </motion.div>
        )}

        {/* 4. TAB KODE PROGRAM */}
        {activeTab === 'kode' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-xl flex items-center justify-between flex-wrap gap-2">
              <p className="text-slate-300 text-xs font-medium">
                💻 <strong>Kode Program Eksekusi Langsung</strong> — Perhatikan indentasi bersarang pada Python dan kurung kurawal berlapis pada JavaScript.
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
                  {lang === 'python' ? '🐍 Python' : '⚡ JavaScript'}
                </button>
              ))}
            </div>

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
                    {activeLang === 'python' ? 'donor_skrining.py' : 'donorSkrining.js'}
                  </span>
                </div>
              </div>
              <pre className="p-5 text-sm font-mono text-slate-200 leading-relaxed overflow-x-auto">
                {activeLang === 'python' ? (
                  <>
                    <span className="text-slate-400">usia = {usia}</span>{'\n'}
                    <span className="text-slate-400">berat_badan = {berat}</span>{'\n'}
                    <span className="text-slate-400">hemoglobin = {hb.toFixed(1)}</span>{'\n\n'}
                    <span className="text-amber-300 font-bold">if usia &gt;= 17:</span>{'\n'}
                    <span className="text-sky-300 font-bold">    if berat_badan &gt;= 45:</span>{'\n'}
                    <span className="text-purple-300 font-bold">        if hemoglobin &gt;= 12.5:</span>{'\n'}
                    <span className="text-emerald-300 font-medium">            print(&quot;🎉 Selamat! Anda LOLOS donor darah.&quot;)</span>{'\n'}
                    <span className="text-purple-300 font-bold">        else:</span>{'\n'}
                    <span className="text-rose-300 font-medium">            print(&quot;❌ Gagal: Hemoglobin kurang dari 12.5 g/dL&quot;)</span>{'\n'}
                    <span className="text-sky-300 font-bold">    else:</span>{'\n'}
                    <span className="text-rose-300 font-medium">        print(&quot;❌ Gagal: Berat badan kurang dari 45 kg&quot;)</span>{'\n'}
                    <span className="text-amber-300 font-bold">else:</span>{'\n'}
                    <span className="text-rose-300 font-medium">    print(&quot;❌ Gagal: Usia belum mencapai 17 tahun&quot;)</span>
                  </>
                ) : (
                  <>
                    <span className="text-slate-400">const usia = {usia};</span>{'\n'}
                    <span className="text-slate-400">const beratBadan = {berat};</span>{'\n'}
                    <span className="text-slate-400">const hemoglobin = {hb.toFixed(1)};</span>{'\n\n'}
                    <span className="text-amber-300 font-bold">if (usia &gt;= 17) {'{'}</span>{'\n'}
                    <span className="text-sky-300 font-bold">    if (beratBadan &gt;= 45) {'{'}</span>{'\n'}
                    <span className="text-purple-300 font-bold">        if (hemoglobin &gt;= 12.5) {'{'}</span>{'\n'}
                    <span className="text-emerald-300 font-medium">            console.log(&quot;🎉 Selamat! Anda LOLOS donor darah.&quot;);</span>{'\n'}
                    <span className="text-purple-300 font-bold">        {'}'} else {'{'}</span>{'\n'}
                    <span className="text-rose-300 font-medium">            console.log(&quot;❌ Gagal: Hemoglobin kurang dari 12.5 g/dL&quot;);</span>{'\n'}
                    <span className="text-purple-300 font-bold">        {'}'}</span>{'\n'}
                    <span className="text-sky-300 font-bold">    {'}'} else {'{'}</span>{'\n'}
                    <span className="text-rose-300 font-medium">        console.log(&quot;❌ Gagal: Berat badan kurang dari 45 kg&quot;);</span>{'\n'}
                    <span className="text-sky-300 font-bold">    {'}'}</span>{'\n'}
                    <span className="text-amber-300 font-bold">{'}'} else {'{'}</span>{'\n'}
                    <span className="text-rose-300 font-medium">    console.log(&quot;❌ Gagal: Usia belum mencapai 17 tahun&quot;);</span>{'\n'}
                    <span className="text-amber-300 font-bold">{'}'}</span>
                  </>
                )}
              </pre>
            </div>

            {/* Live Terminal Output Simulator */}
            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <span className="text-xs text-amber-400 font-bold font-mono">Hasil Output Program</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  isGate3Passed
                    ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300' 
                    : 'bg-rose-950 border border-rose-500/40 text-rose-300'
                }`}>
                  {isGate3Passed ? '✔ STATUS LOLOS' : `✖ GAGAL GERBANG ${failGate}`}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <p className={`text-sm font-mono font-bold ${isGate3Passed ? 'text-emerald-300' : 'text-rose-300'}`}>
                  &gt; {isGate3Passed ? '🎉 Selamat! Anda LOLOS donor darah.' : `❌ Gagal: ${failGate === 1 ? 'Usia belum mencapai 17 tahun' : failGate === 2 ? 'Berat badan kurang dari 45 kg' : 'Kadar Hemoglobin kurang dari 12.5 g/dL'}`}
                </p>
                <p className="text-slate-500 text-xs font-mono">&gt; Skrining selesai.</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
