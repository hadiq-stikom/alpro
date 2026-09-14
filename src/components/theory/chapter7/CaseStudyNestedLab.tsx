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
  ShoppingBag,
  Receipt,
  Ticket,
  CheckCircle2,
  Maximize2,
  Minimize2,
  Tv,
  ArrowRight,
  ArrowDown
} from 'lucide-react';

// ══════════════════════════════════════════════════════════════════════════════
// 1. FLOWCHART VERTIKAL (STANDAR ANSI/ISO 5807 PROPORSIONAL)
// ══════════════════════════════════════════════════════════════════════════════
function CaseStudyVerticalFlowchart({
  memberType,
  totalBelanja,
  isWeekend,
  step,
}: {
  memberType: 'VIP' | 'REGULER' | 'NON_MEMBER';
  totalBelanja: number;
  isWeekend: boolean;
  step: number;
}) {
  const isVIP = memberType === 'VIP';
  const isReguler = memberType === 'REGULER';
  const isNonMember = memberType === 'NON_MEMBER';

  const isStepActive = (s: number) => {
    if (step === 0) return true;
    return step >= s;
  };

  return (
    <svg
      viewBox="0 0 760 760"
      className="w-full h-auto select-none max-w-[700px] mx-auto"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <marker id="css-arr-gray" markerWidth="11" markerHeight="11" refX="9.5" refY="5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 9.5 5 L 1 8.5 Z" fill="#94a3b8" />
        </marker>
        <marker id="css-arr-green" markerWidth="12" markerHeight="12" refX="10.5" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 10.5 5.5 L 1 9.5 Z" fill="#10b981" stroke="#34d399" strokeWidth="0.5" />
        </marker>
        <marker id="css-arr-rose" markerWidth="12" markerHeight="12" refX="10.5" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 10.5 5.5 L 1 9.5 Z" fill="#f43f5e" stroke="#fb7185" strokeWidth="0.5" />
        </marker>
        <filter id="css-glow-diamond" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="css-glow-active" x="-25%" y="-25%" width="150%" height="150%">
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
      <line x1="215" y1="58" x2="215" y2="86" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#css-arr-gray)" opacity={isStepActive(1) ? 1 : 0.2} />

      {/* ─── 2. INPUT JAJARAN GENJANG ─── */}
      <g opacity={isStepActive(2) ? 1 : 0.2}>
        <polygon points="135,86 315,86 295,130 115,130" fill="rgba(168,85,247,0.22)" stroke="#a855f7" strokeWidth="2.5" />
        <text x="215" y="102" dominantBaseline="central" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#e9d5ff" fontFamily="monospace">
          input(member, belanja, libur)
        </text>
        <text x="215" y="118" dominantBaseline="central" textAnchor="middle" fontSize="11" fontWeight="900" fill="#fbcfe8" fontFamily="monospace">
          [{memberType}, Rp{Math.round(totalBelanja / 1000)}rb, {isWeekend ? 'Weekend' : 'Weekday'}]
        </text>
      </g>
      <line x1="215" y1="130" x2="215" y2="158" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#css-arr-gray)" opacity={isStepActive(2) ? 1 : 0.2} />

      {/* ─── 3. RIGHT COLLECTOR BUS (x = 690) ─── */}
      <line x1="690" y1="195" x2="690" y2="620" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

      {/* ─── KONDISI 1: MEMBER == 'VIP'? (cx = 215, cy = 195) ─── */}
      <g opacity={isStepActive(3) ? 1 : 0.2}>
        <polygon
          points="215,152 320,195 215,238 110,195"
          fill="#451a03"
          stroke={isVIP ? '#10b981' : '#f59e0b'}
          strokeWidth="3.5"
          filter={isVIP ? 'url(#css-glow-diamond)' : undefined}
        />
        <text x="215" y="190" textAnchor="middle" fill="#fde68a" fontSize="13" fontWeight="900" fontFamily="monospace">
          member == &quot;VIP&quot;?
        </text>
        <text x="215" y="208" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="bold" fontFamily="monospace">
          ({memberType})
        </text>
        <rect
          x="175"
          y="230"
          width="80"
          height="18"
          rx="9"
          fill={isVIP ? '#065f46' : '#881337'}
          stroke={isVIP ? '#34d399' : '#f43f5e'}
          strokeWidth="1.5"
        />
        <text x="215" y="242" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#ffffff" fontFamily="monospace">
          {isVIP ? '✓ TRUE' : '✗ FALSE'}
        </text>
      </g>

      {/* VIP: TRUE (Cabang ke Kanan) */}
      <line
        x1="320"
        y1="195"
        x2="415"
        y2="195"
        stroke={isVIP ? '#10b981' : '#64748b'}
        strokeWidth={isVIP ? '3.5' : '2'}
        strokeDasharray={isVIP ? undefined : '4 4'}
        markerEnd={isVIP ? 'url(#css-arr-green)' : 'url(#css-arr-gray)'}
        opacity={isVIP ? 1 : 0.3}
      />
      <text x="365" y="185" textAnchor="middle" fontSize="11" fontWeight="900" fill={isVIP ? '#6ee7b7' : '#94a3b8'} fontFamily="monospace">
        YA
      </text>

      {/* Jajaran Genjang Aksi VIP (Ke Samping) */}
      <g opacity={isVIP ? 1 : 0.3}>
        <polygon
          points="435,168 645,168 625,222 415,222"
          fill={isVIP ? 'rgba(16,185,129,0.22)' : 'rgba(30,41,59,0.3)'}
          stroke={isVIP ? '#10b981' : '#334155'}
          strokeWidth={isVIP ? 2.5 : 1.5}
          filter={isVIP ? 'url(#css-glow-active)' : undefined}
        />
        <text x="525" y="188" textAnchor="middle" fill={isVIP ? '#a7f3d0' : '#64748b'} fontSize="11.5" fontWeight="900" fontFamily="monospace">
          VIP: Diskon {totalBelanja >= 250000 ? '25% (+5%)' : '20%'}
        </text>
        <text x="525" y="208" textAnchor="middle" fill={isVIP ? '#6ee7b7' : '#475569'} fontSize="11" fontWeight="bold" fontFamily="monospace">
          {isWeekend ? '🎁 + Voucher Rp25rb' : 'Voucher: Rp0'}
        </text>
      </g>

      {/* Jalur VIP ke Collector Bus */}
      <line
        x1="635"
        y1="195"
        x2="690"
        y2="195"
        stroke={isVIP ? '#10b981' : '#334155'}
        strokeWidth={isVIP ? '3.5' : '2'}
        strokeDasharray={isVIP ? undefined : '4 4'}
        opacity={isVIP ? 1 : 0.3}
      />

      {/* VIP: FALSE (Turun ke Gerbang 2) */}
      <line
        x1="215"
        y1="248"
        x2="215"
        y2="295"
        stroke={!isVIP ? '#f43f5e' : '#64748b'}
        strokeWidth={!isVIP ? '3' : '2'}
        markerEnd={!isVIP ? 'url(#css-arr-rose)' : 'url(#css-arr-gray)'}
        opacity={!isVIP ? 1 : 0.35}
      />
      <text x="223" y="275" fontSize="11" fontWeight="900" fill={!isVIP ? '#fda4af' : '#94a3b8'} fontFamily="monospace">
        TIDAK
      </text>

      {/* ─── KONDISI 2: MEMBER == 'REGULER'? (cx = 215, cy = 340) ─── */}
      <g opacity={!isVIP && isStepActive(4) ? 1 : 0.25}>
        <polygon
          points="215,296 320,340 215,384 110,340"
          fill="#451a03"
          stroke={isReguler ? '#10b981' : isVIP ? '#3f3f46' : '#f59e0b'}
          strokeWidth="3.5"
          filter={isReguler ? 'url(#css-glow-diamond)' : undefined}
          strokeDasharray={isVIP ? '4 3' : undefined}
        />
        <text x="215" y="335" textAnchor="middle" fill={isVIP ? '#52525b' : '#fde68a'} fontSize="13" fontWeight="900" fontFamily="monospace">
          member == &quot;REG&quot;?
        </text>
        <text x="215" y="353" textAnchor="middle" fill={isVIP ? '#3f3f46' : '#cbd5e1'} fontSize="11" fontWeight="bold" fontFamily="monospace">
          ({memberType})
        </text>
        <rect
          x="175"
          y="375"
          width="80"
          height="18"
          rx="9"
          fill={isVIP ? '#27272a' : isReguler ? '#065f46' : '#881337'}
          stroke={isVIP ? '#3f3f46' : isReguler ? '#34d399' : '#f43f5e'}
          strokeWidth="1.5"
        />
        <text x="215" y="387" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#ffffff" fontFamily="monospace">
          {isVIP ? '🚫 LEWATI' : isReguler ? '✓ TRUE' : '✗ FALSE'}
        </text>
      </g>

      {/* Reguler: TRUE (Cabang ke Kanan) */}
      <line
        x1="320"
        y1="340"
        x2="415"
        y2="340"
        stroke={isReguler ? '#10b981' : '#64748b'}
        strokeWidth={isReguler ? '3.5' : '2'}
        strokeDasharray={isReguler ? undefined : '4 4'}
        markerEnd={isReguler ? 'url(#css-arr-green)' : 'url(#css-arr-gray)'}
        opacity={isReguler ? 1 : 0.3}
      />
      <text x="365" y="330" textAnchor="middle" fontSize="11" fontWeight="900" fill={isReguler ? '#6ee7b7' : '#94a3b8'} fontFamily="monospace">
        YA
      </text>

      {/* Jajaran Genjang Aksi Reguler (Ke Samping) */}
      <g opacity={isReguler ? 1 : 0.3}>
        <polygon
          points="435,313 645,313 625,367 415,367"
          fill={isReguler ? 'rgba(16,185,129,0.22)' : 'rgba(30,41,59,0.3)'}
          stroke={isReguler ? '#10b981' : '#334155'}
          strokeWidth={isReguler ? 2.5 : 1.5}
          filter={isReguler ? 'url(#css-glow-active)' : undefined}
        />
        <text x="525" y="333" textAnchor="middle" fill={isReguler ? '#a7f3d0' : '#64748b'} fontSize="11.5" fontWeight="900" fontFamily="monospace">
          Reguler Diskon:
        </text>
        <text x="525" y="353" textAnchor="middle" fill={isReguler ? '#6ee7b7' : '#475569'} fontSize="11" fontWeight="bold" fontFamily="monospace">
          {totalBelanja >= 200000 ? '15% (Dasar 10% + 5%)' : '10% (Dasar)'}
        </text>
      </g>

      {/* Jalur Reguler ke Collector Bus */}
      <line
        x1="635"
        y1="340"
        x2="690"
        y2="340"
        stroke={isReguler ? '#10b981' : '#334155'}
        strokeWidth={isReguler ? '3.5' : '2'}
        strokeDasharray={isReguler ? undefined : '4 4'}
        opacity={isReguler ? 1 : 0.3}
      />

      {/* Reguler: FALSE (Turun ke Gerbang 3 Non-Member) */}
      <line
        x1="215"
        y1="393"
        x2="215"
        y2="440"
        stroke={isNonMember ? '#f43f5e' : '#64748b'}
        strokeWidth={isNonMember ? '3' : '2'}
        markerEnd={isNonMember ? 'url(#css-arr-rose)' : 'url(#css-arr-gray)'}
        opacity={isNonMember ? 1 : 0.35}
      />
      <text x="223" y="420" fontSize="11" fontWeight="900" fill={isNonMember ? '#fda4af' : '#94a3b8'} fontFamily="monospace">
        TIDAK (ELSE)
      </text>

      {/* ─── KONDISI 3: NON-MEMBER BELANJA >= 300RB? (cx = 215, cy = 485) ─── */}
      <g opacity={isNonMember && isStepActive(5) ? 1 : 0.25}>
        <polygon
          points="215,441 320,485 215,529 110,485"
          fill="#451a03"
          stroke={isNonMember ? (totalBelanja >= 300000 ? '#10b981' : '#f59e0b') : '#3f3f46'}
          strokeWidth="3.5"
          filter={isNonMember && totalBelanja >= 300000 ? 'url(#css-glow-diamond)' : undefined}
        />
        <text x="215" y="480" textAnchor="middle" fill={!isNonMember ? '#52525b' : '#fde68a'} fontSize="13" fontWeight="900" fontFamily="monospace">
          belanja &gt;= 300rb?
        </text>
        <text x="215" y="498" textAnchor="middle" fill={!isNonMember ? '#3f3f46' : '#cbd5e1'} fontSize="11" fontWeight="bold" fontFamily="monospace">
          (Umum: Rp{Math.round(totalBelanja / 1000)}rb)
        </text>
        <rect
          x="175"
          y="520"
          width="80"
          height="18"
          rx="9"
          fill={!isNonMember ? '#27272a' : totalBelanja >= 300000 ? '#065f46' : '#881337'}
          stroke={!isNonMember ? '#3f3f46' : totalBelanja >= 300000 ? '#34d399' : '#f43f5e'}
          strokeWidth="1.5"
        />
        <text x="215" y="532" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#ffffff" fontFamily="monospace">
          {!isNonMember ? '🚫 LEWATI' : totalBelanja >= 300000 ? '✓ TRUE' : '✗ FALSE'}
        </text>
      </g>

      {/* Non-Member Promo: TRUE (Cabang ke Kanan) */}
      <line
        x1="320"
        y1="485"
        x2="415"
        y2="485"
        stroke={isNonMember && totalBelanja >= 300000 ? '#10b981' : '#64748b'}
        strokeWidth={isNonMember && totalBelanja >= 300000 ? '3.5' : '2'}
        strokeDasharray={isNonMember && totalBelanja >= 300000 ? undefined : '4 4'}
        markerEnd={isNonMember && totalBelanja >= 300000 ? 'url(#css-arr-green)' : 'url(#css-arr-gray)'}
        opacity={isNonMember && totalBelanja >= 300000 ? 1 : 0.3}
      />
      <text x="365" y="475" textAnchor="middle" fontSize="11" fontWeight="900" fill={isNonMember && totalBelanja >= 300000 ? '#6ee7b7' : '#94a3b8'} fontFamily="monospace">
        YA
      </text>

      {/* Jajaran Genjang Aksi Non-Member Promo (Ke Samping) */}
      <g opacity={isNonMember && totalBelanja >= 300000 ? 1 : 0.3}>
        <polygon
          points="435,458 645,458 625,512 415,512"
          fill={isNonMember && totalBelanja >= 300000 ? 'rgba(16,185,129,0.22)' : 'rgba(30,41,59,0.3)'}
          stroke={isNonMember && totalBelanja >= 300000 ? '#10b981' : '#334155'}
          strokeWidth={isNonMember && totalBelanja >= 300000 ? 2.5 : 1.5}
        />
        <text x="525" y="478" textAnchor="middle" fill="#a7f3d0" fontSize="11.5" fontWeight="900" fontFamily="monospace">
          Promo Umum:
        </text>
        <text x="525" y="498" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold" fontFamily="monospace">
          Diskon Promo 5%
        </text>
      </g>

      {/* Jalur Promo ke Collector Bus */}
      <line
        x1="635"
        y1="485"
        x2="690"
        y2="485"
        stroke={isNonMember && totalBelanja >= 300000 ? '#10b981' : '#334155'}
        strokeWidth={isNonMember && totalBelanja >= 300000 ? '3.5' : '2'}
        strokeDasharray={isNonMember && totalBelanja >= 300000 ? undefined : '4 4'}
        opacity={isNonMember && totalBelanja >= 300000 ? 1 : 0.3}
      />

      {/* Non-Member: FALSE (Diskon 0%) */}
      <line
        x1="215"
        y1="538"
        x2="215"
        y2="572"
        stroke={isNonMember && totalBelanja < 300000 ? '#f43f5e' : '#64748b'}
        strokeWidth={isNonMember && totalBelanja < 300000 ? '3' : '2'}
        markerEnd={isNonMember && totalBelanja < 300000 ? 'url(#css-arr-rose)' : 'url(#css-arr-gray)'}
        opacity={isNonMember && totalBelanja < 300000 ? 1 : 0.35}
      />

      {/* Jajaran Genjang Aksi Diskon 0% */}
      <g opacity={isNonMember && totalBelanja < 300000 ? 1 : 0.3}>
        <polygon
          points="130,572 300,572 280,616 110,616"
          fill="rgba(244,63,94,0.18)"
          stroke="#f43f5e"
          strokeWidth="2"
        />
        <text x="205" y="591" textAnchor="middle" fill="#fda4af" fontSize="11" fontWeight="bold" fontFamily="monospace">
          Umum &lt; 300rb:
        </text>
        <text x="205" y="607" textAnchor="middle" fill="#fecdd3" fontSize="11.5" fontWeight="900" fontFamily="monospace">
          Diskon 0%
        </text>
      </g>
      {/* Panah Turun Langsung dari Diskon 0% ke Merge Node */}
      {isNonMember && totalBelanja < 300000 && (
        <line
          x1="215"
          y1="616"
          x2="215"
          y2="630"
          stroke="#f43f5e"
          strokeWidth="8"
          strokeOpacity="0.25"
          opacity={isStepActive(6) ? 1 : 0.3}
        />
      )}
      <line
        x1="215"
        y1="616"
        x2="215"
        y2="630"
        stroke={isNonMember && totalBelanja < 300000 ? '#f43f5e' : '#64748b'}
        strokeWidth={isNonMember && totalBelanja < 300000 ? 3 : 2}
        markerEnd={isNonMember && totalBelanja < 300000 ? 'url(#css-arr-rose)' : 'url(#css-arr-gray)'}
        opacity={isStepActive(6) ? 1 : 0.3}
      />

      {/* ─── MERGE COLLECTOR BUS KE PROCESS BOX ─── */}
      {(!isNonMember || totalBelanja >= 300000) && (
        <line
          x1="690"
          y1="640"
          x2="225"
          y2="640"
          stroke="#10b981"
          strokeWidth="8"
          strokeOpacity="0.25"
          opacity={!isNonMember || totalBelanja >= 300000 ? 1 : 0.3}
        />
      )}
      <line
        x1="690"
        y1="640"
        x2="225"
        y2="640"
        stroke="#10b981"
        strokeWidth="3"
        markerEnd="url(#css-arr-green)"
        opacity={!isNonMember || totalBelanja >= 300000 ? 1 : 0.3}
      />

      {/* Merge Node Circle */}
      <circle
        cx="215"
        cy="640"
        r="10"
        fill="#1e293b"
        stroke={!isNonMember || totalBelanja >= 300000 ? '#10b981' : '#f43f5e'}
        strokeWidth="2.5"
      />
      <text x="215" y="644" textAnchor="middle" fontSize="10" fontWeight="black" fill={!isNonMember || totalBelanja >= 300000 ? '#6ee7b7' : '#fecdd3'}>
        M
      </text>
      <line
        x1="215"
        y1="650"
        x2="215"
        y2="670"
        stroke="#10b981"
        strokeWidth="2.5"
        markerEnd="url(#css-arr-green)"
      />

      {/* ─── 4. PROSES: HITUNG TOTAL BAYAR ─── */}
      <g opacity={step === 0 || step >= 6 ? 1 : 0.2}>
        <rect x="75" y="670" width="280" height="40" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
        <text x="215" y="688" dominantBaseline="central" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold" fontFamily="monospace">
          totalBayar = belanja - diskon
        </text>
        <text x="215" y="702" dominantBaseline="central" textAnchor="middle" fill="#6ee7b7" fontSize="9.5" fontFamily="monospace">
          Cetak Struk Kasir &amp; Serahkan Voucher
        </text>
      </g>
      <line x1="215" y1="710" x2="215" y2="726" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#css-arr-green)" opacity={step === 0 || step >= 6 ? 1 : 0.2} />

      {/* ─── 5. TERMINAL SELESAI ─── */}
      <g opacity={step === 0 || step >= 7 ? 1 : 0.2}>
        <rect
          x="145"
          y="726"
          width="140"
          height="34"
          rx="17"
          fill="rgba(239,68,68,0.3)"
          stroke="#f87171"
          strokeWidth="3"
        />
        <text
          x="215"
          y="743"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize="13"
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
function CaseStudyHorizontalFlowchart({
  memberType,
  totalBelanja,
  isWeekend,
  step,
}: {
  memberType: 'VIP' | 'REGULER' | 'NON_MEMBER';
  totalBelanja: number;
  isWeekend: boolean;
  step: number;
}) {
  const isVIP = memberType === 'VIP';
  const isReguler = memberType === 'REGULER';
  const isNonMember = memberType === 'NON_MEMBER';

  const isStepActive = (s: number) => {
    if (step === 0) return true;
    return step >= s;
  };

  return (
    <svg 
      viewBox="0 0 1340 420" 
      className="w-full h-auto select-none min-w-[900px]" 
      style={{ overflow: 'visible' }}
    >
      <defs>
        <marker id="csh-arr-gray" markerWidth="11" markerHeight="11" refX="9.5" refY="5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 9.5 5 L 1 8.5 Z" fill="#94a3b8" />
        </marker>
        <marker id="csh-arr-green" markerWidth="12" markerHeight="12" refX="10.5" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 10.5 5.5 L 1 9.5 Z" fill="#10b981" stroke="#34d399" strokeWidth="0.5" />
        </marker>
        <marker id="csh-arr-rose" markerWidth="12" markerHeight="12" refX="10.5" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1 1.5 L 10.5 5.5 L 1 9.5 Z" fill="#f43f5e" stroke="#fb7185" strokeWidth="0.5" />
        </marker>
        <filter id="csh-glow-diamond" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="csh-glow-active" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. START */}
      <g opacity={isStepActive(1) ? 1 : 0.2}>
        <rect x="15" y="68" width="115" height="46" rx="23" fill="rgba(16,185,129,0.18)" stroke="#10b981" strokeWidth="2.5" />
        <text x="72" y="91" dominantBaseline="central" textAnchor="middle" fontSize="14" fontWeight="900" fill="#6ee7b7" fontFamily="monospace">
          START
        </text>
      </g>
      <line x1="130" y1="91" x2="165" y2="91" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#csh-arr-gray)" opacity={isStepActive(1) ? 1 : 0.2} />

      {/* 2. INPUT */}
      <g opacity={isStepActive(2) ? 1 : 0.2}>
        <polygon points="185,66 335,66 315,116 165,116" fill="rgba(168,85,247,0.25)" stroke="#a855f7" strokeWidth="2.5" />
        <text x="250" y="83" dominantBaseline="central" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#e9d5ff" fontFamily="monospace">
          input(member, belanja, libur)
        </text>
        <text x="250" y="100" dominantBaseline="central" textAnchor="middle" fontSize="11" fontWeight="900" fill="#fbcfe8" fontFamily="monospace">
          [{memberType}, Rp{Math.round(totalBelanja / 1000)}rb, {isWeekend ? 'Weekend' : 'Weekday'}]
        </text>
      </g>
      <line x1="325" y1="91" x2="365" y2="91" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#csh-arr-gray)" opacity={isStepActive(2) ? 1 : 0.2} />

      {/* ─── KONDISI 1: MEMBER == 'VIP'? (cx = 450, cy = 91) ─── */}
      <g opacity={isStepActive(3) ? 1 : 0.2}>
        <polygon
          points="450,48 535,91 450,134 365,91"
          fill="#451a03"
          stroke={isVIP ? '#10b981' : '#f59e0b'}
          strokeWidth={isVIP ? 3.5 : 2}
          filter={isVIP ? 'url(#csh-glow-diamond)' : undefined}
        />
        <text x="450" y="85" textAnchor="middle" fill={isVIP ? '#fde68a' : '#fecdd3'} fontSize="12" fontWeight="900" fontFamily="monospace">
          member == &quot;VIP&quot;?
        </text>
        <g transform="translate(450, 105)">
          <rect x="-35" y="-8" width="70" height="16" rx="8" fill={isVIP ? '#065f46' : '#881337'} stroke={isVIP ? '#34d399' : '#f43f5e'} strokeWidth="1.5" />
          <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="monospace">
            {isVIP ? '✓ TRUE' : '✗ FALSE'}
          </text>
        </g>

        {/* Ya (Down to VIP Action Box) */}
        <line
          x1="450"
          y1="134"
          x2="450"
          y2="190"
          stroke={isVIP ? '#10b981' : '#64748b'}
          strokeWidth={isVIP ? 3.5 : 2}
          markerEnd={isVIP ? 'url(#csh-arr-green)' : 'url(#csh-arr-gray)'}
          strokeDasharray={isVIP ? undefined : '3 3'}
        />
        <text x="462" y="165" fill={isVIP ? '#10b981' : '#64748b'} fontSize="11" fontWeight="900" fontFamily="monospace">
          ↓ Ya
        </text>

        {/* VIP Action Box */}
        <rect
          x="375"
          y="190"
          width="150"
          height="54"
          rx="10"
          fill={isVIP ? '#064e3b' : '#0f172a'}
          stroke={isVIP ? '#10b981' : '#1e293b'}
          strokeWidth={isVIP ? 2.5 : 1.5}
          opacity={isVIP ? 1 : 0.35}
        />
        <text x="450" y="212" textAnchor="middle" fill={isVIP ? '#a7f3d0' : '#64748b'} fontSize="11.5" fontWeight="900" fontFamily="monospace">
          VIP: {totalBelanja >= 250000 ? 'Diskon 25%' : 'Diskon 20%'}
        </text>
        <text x="450" y="232" textAnchor="middle" fill={isVIP ? '#6ee7b7' : '#475569'} fontSize="10.5" fontWeight="bold" fontFamily="monospace">
          {isWeekend ? '🎁 + Voucher Rp25.000' : 'Voucher Rp0'}
        </text>

        {/* Line down to Process Box */}
        <line x1="450" y1="244" x2="450" y2="305" stroke={isVIP ? '#10b981' : '#334155'} strokeWidth={isVIP ? 3.5 : 1.5} strokeDasharray={isVIP ? undefined : '3 3'} />

        {/* Tidak (Right to Reguler Diamond) */}
        <line
          x1="535"
          y1="91"
          x2="615"
          y2="91"
          stroke={!isVIP ? '#f43f5e' : '#64748b'}
          strokeWidth={!isVIP ? 3 : 2}
          markerEnd={!isVIP ? 'url(#csh-arr-rose)' : 'url(#csh-arr-gray)'}
          strokeDasharray={!isVIP ? undefined : '3 3'}
        />
        <text x="575" y="82" textAnchor="middle" fill={!isVIP ? '#fb7185' : '#64748b'} fontSize="11" fontWeight="900" fontFamily="monospace">
          → Tidak
        </text>
      </g>

      {/* ─── KONDISI 2: MEMBER == 'REGULER'? (cx = 700, cy = 91) ─── */}
      <g opacity={isStepActive(4) ? (!isVIP ? 1 : 0.3) : 0.2}>
        <polygon
          points="700,48 785,91 700,134 615,91"
          fill={isReguler ? '#451a03' : isVIP ? '#18181b' : '#291305'}
          stroke={isReguler ? '#10b981' : isVIP ? '#3f3f46' : '#f59e0b'}
          strokeWidth={isReguler ? 3.5 : 2}
          filter={isReguler ? 'url(#csh-glow-diamond)' : undefined}
          strokeDasharray={isVIP ? '4 3' : undefined}
        />
        <text x="700" y="85" textAnchor="middle" fill={isReguler ? '#fde68a' : isVIP ? '#52525b' : '#fecdd3'} fontSize="12" fontWeight="900" fontFamily="monospace">
          member == &quot;REG&quot;?
        </text>
        <g transform="translate(700, 105)">
          <rect x="-35" y="-8" width="70" height="16" rx="8" fill={isVIP ? '#27272a' : isReguler ? '#065f46' : '#881337'} stroke={isVIP ? '#3f3f46' : isReguler ? '#34d399' : '#f43f5e'} strokeWidth="1.5" />
          <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="monospace">
            {isVIP ? '🚫 LEWATI' : isReguler ? '✓ TRUE' : '✗ FALSE'}
          </text>
        </g>

        {/* Ya (Down to Reguler Action Box) */}
        <line
          x1="700"
          y1="134"
          x2="700"
          y2="190"
          stroke={isReguler ? '#10b981' : '#334155'}
          strokeWidth={isReguler ? 3.5 : 2}
          markerEnd={isReguler ? 'url(#csh-arr-green)' : 'url(#csh-arr-gray)'}
          strokeDasharray={isReguler ? undefined : '3 3'}
        />
        <text x="712" y="165" fill={isReguler ? '#10b981' : '#64748b'} fontSize="11" fontWeight="900" fontFamily="monospace">
          ↓ Ya
        </text>

        {/* Reguler Action Box */}
        <rect
          x="625"
          y="190"
          width="150"
          height="54"
          rx="10"
          fill={isReguler ? '#064e3b' : '#0f172a'}
          stroke={isReguler ? '#10b981' : '#1e293b'}
          strokeWidth={isReguler ? 2.5 : 1.5}
          opacity={isReguler ? 1 : 0.35}
        />
        <text x="700" y="212" textAnchor="middle" fill={isReguler ? '#a7f3d0' : '#64748b'} fontSize="11.5" fontWeight="900" fontFamily="monospace">
          Reguler Diskon:
        </text>
        <text x="700" y="232" textAnchor="middle" fill={isReguler ? '#6ee7b7' : '#475569'} fontSize="11" fontWeight="bold" fontFamily="monospace">
          {totalBelanja >= 200000 ? '15% (Bonus 5%)' : '10% (Dasar)'}
        </text>

        {/* Line down to Process Box */}
        <line x1="700" y1="244" x2="700" y2="305" stroke={isReguler ? '#10b981' : '#334155'} strokeWidth={isReguler ? 3.5 : 1.5} strokeDasharray={isReguler ? undefined : '3 3'} />

        {/* Tidak (Right to Non-Member Box) */}
        <line
          x1="785"
          y1="91"
          x2="865"
          y2="91"
          stroke={isNonMember ? '#f43f5e' : '#334155'}
          strokeWidth={isNonMember ? 3 : 2}
          markerEnd={isNonMember ? 'url(#csh-arr-rose)' : 'url(#csh-arr-gray)'}
          strokeDasharray={isNonMember ? undefined : '3 3'}
        />
        <text x="825" y="82" textAnchor="middle" fill={isNonMember ? '#fb7185' : '#64748b'} fontSize="11" fontWeight="900" fontFamily="monospace">
          → Else
        </text>
      </g>

      {/* ─── KONDISI 3: NON-MEMBER ELSE BOX (cx = 945, cy = 91) ─── */}
      <g opacity={isStepActive(5) ? (isNonMember ? 1 : 0.3) : 0.2}>
        <rect
          x="870"
          y="68"
          width="150"
          height="52"
          rx="10"
          fill={isNonMember ? '#881337' : '#0f172a'}
          stroke={isNonMember ? '#f43f5e' : '#1e293b'}
          strokeWidth={isNonMember ? 2.5 : 1.5}
        />
        <text x="945" y="88" textAnchor="middle" fill={isNonMember ? '#fda4af' : '#64748b'} fontSize="11" fontWeight="bold" fontFamily="monospace">
          ELSE: Non-Member
        </text>
        <text x="945" y="108" textAnchor="middle" fill={isNonMember ? '#fecdd3' : '#475569'} fontSize="11.5" fontWeight="900" fontFamily="monospace">
          {totalBelanja >= 300000 ? 'Promo Diskon 5%' : 'Diskon 0%'}
        </text>

        {/* Line down to Process Box */}
        <line
          x1="945"
          y1="120"
          x2="945"
          y2="305"
          stroke={isNonMember ? '#10b981' : '#334155'}
          strokeWidth={isNonMember ? 3.5 : 1.5}
          markerEnd={isNonMember ? 'url(#csh-arr-green)' : 'url(#csh-arr-gray)'}
        />
      </g>

      {/* ─── CALCULATION PROCESS BOX (Bawah) ─── */}
      <g opacity={step === 0 || step >= 6 ? 1 : 0.2}>
        <rect
          x="350"
          y="305"
          width="670"
          height="48"
          rx="10"
          fill="#0f172a"
          stroke="#64748b"
          strokeWidth="2"
        />
        <text x="685" y="325" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold" fontFamily="monospace">
          totalBayar = totalBelanja - (totalBelanja * diskon / 100)
        </text>
        <text x="685" y="343" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontFamily="monospace">
          Cetak Struk Kasir &amp; Serahkan Voucher Weekend
        </text>

        {/* Line Process -> SELESAI */}
        <line x1="1020" y1="329" x2="1088" y2="329" stroke="#10b981" strokeWidth="3" markerEnd="url(#csh-arr-green)" />

        <rect x="1088" y="305" width="115" height="48" rx="24" fill="rgba(239,68,68,0.25)" stroke="#ef4444" strokeWidth="2.5" filter="url(#csh-glow-diamond)" />
        <text x="1145" y="329" dominantBaseline="central" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fca5a5" fontFamily="monospace">
          SELESAI
        </text>
      </g>
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 4. KOMPONEN UTAMA CASESTUDYNESTEDLAB
// ══════════════════════════════════════════════════════════════════════════════
export default function CaseStudyNestedLab() {
  const [memberType, setMemberType] = useState<'VIP' | 'REGULER' | 'NON_MEMBER'>('VIP');
  const [totalBelanja, setTotalBelanja] = useState<number>(280000);
  const [isWeekend, setIsWeekend] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'naratif' | 'flowchart' | 'pseudocode' | 'kode'>('flowchart');
  const [flowchartOrientation, setFlowchartOrientation] = useState<'vertical' | 'horizontal'>('vertical');
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [isProjectorMode, setIsProjectorMode] = useState<boolean>(false);
  const [activeLang, setActiveLang] = useState<'python' | 'js'>('python');
  const [step, setStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Pada mode Maximize (Proyektor), keputusan wajib berjejer ke samping (horisontal lanskap)
  const effectiveOrientation = isProjectorMode ? 'horizontal' : flowchartOrientation;

  let diskonPersen = 0;
  let bonusVoucher = 0;

  if (memberType === 'VIP') {
    diskonPersen = 20;
    if (totalBelanja >= 250000) {
      diskonPersen += 5;
    }
    if (isWeekend) {
      bonusVoucher = 25000;
    }
  } else if (memberType === 'REGULER') {
    diskonPersen = 10;
    if (totalBelanja >= 200000) {
      diskonPersen += 5;
    }
  } else {
    if (totalBelanja >= 300000) {
      diskonPersen = 5;
    } else {
      diskonPersen = 0;
    }
  }

  const potonganRupiah = (totalBelanja * diskonPersen) / 100;
  const totalBayar = totalBelanja - potonganRupiah;

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
    if (s === 1) return 'Terminal MULAI sistem kasir swalayan dieksekusi.';
    if (s === 2) return `Input data transaksi: Member=${memberType}, Belanja=Rp${totalBelanja.toLocaleString('id-ID')}, Hari=${isWeekend ? 'Weekend' : 'Weekday'}.`;
    if (s === 3) return `Gerbang 1 (Member VIP?): ${memberType === 'VIP' ? '✓ YA (VIP) → Diskon 20% (+5% jika belanja ≥ 250rb) & Voucher.' : '✗ BUKAN VIP → Lanjut ke evaluasi Member Reguler.'}`;
    if (s === 4) return `Gerbang 2 (Member Reguler?): ${memberType === 'REGULER' ? '✓ YA (Reguler) → Diskon 10% (+5% jika belanja ≥ 200rb).' : '✗ BUKAN REGULER → Lanjut ke evaluasi Non-Member.'}`;
    if (s === 5) return `Gerbang 3 (Non-Member / Umum): ${totalBelanja >= 300000 ? '✓ Belanja ≥ 300rb → Diskon 5%.' : '✗ Belanja < 300rb → Diskon 0%.'}`;
    if (s === 6) return 'Alur persentase diskon menyatu ke Merge Node (Titik Temu M).';
    if (s === 7) return `Proses: totalBayar = Rp${totalBayar.toLocaleString('id-ID')} → Cetak struk kasir & SELESAI.`;
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
          <span className="text-xl">3️⃣</span>
          <div>
            <h3 className="font-bold text-sm md:text-base text-slate-100 flex items-center gap-2">
              <span>Lab Studi Kasus: Kasir Swalayan (Diskon Multi-Kondisi)</span>
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
            <ShoppingBag className="w-4 h-4 text-purple-400" />
            <span>Studi Kasus: Multi-Way Member × Nilai Belanja × Hari Weekend</span>
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
                📝 <strong>Algoritma Naratif Kasir Swalayan</strong> — Menggabungkan struktur percabangan majemuk untuk kategori member dan percabangan bersarang untuk nominal belanja dan promo hari libur.
              </p>
            </div>

            <pre className="bg-slate-900 p-5 rounded-2xl border border-slate-800 font-mono text-sm leading-relaxed overflow-x-auto shadow-sm text-slate-300 whitespace-pre">
              <span className="text-slate-400">1. Masukkan member, totalBelanja, dan hariLibur.</span>{'\n\n'}
              <span className="font-bold text-amber-300">2. Jika member == &quot;VIP&quot; maka:</span>{'\n'}
              <span className="text-emerald-300">      Tetapkan diskon = 20%</span>{'\n'}
              <span className="font-bold text-sky-300">      Jika totalBelanja &gt;= 250000 maka:</span>{'\n'}
              <span className="text-emerald-300">         Tambahkan diskon 5% (Total diskon = 25%)</span>{'\n'}
              <span className="font-bold text-purple-300">      Jika hariLibur == True maka:</span>{'\n'}
              <span className="text-emerald-300">         Berikan bonus voucher belanja Rp25.000</span>{'\n'}
              <span className="font-bold text-amber-300">   Selain itu, jika member == &quot;REGULER&quot; maka:</span>{'\n'}
              <span className="text-sky-300">      Tetapkan diskon = 10%</span>{'\n'}
              <span className="font-bold text-sky-300">      Jika totalBelanja &gt;= 200000 maka:</span>{'\n'}
              <span className="text-sky-300">         Tambahkan diskon 5% (Total diskon = 15%)</span>{'\n'}
              <span className="font-bold text-amber-300">   Selain itu:</span>{'\n'}
              <span className="font-bold text-rose-300">      Jika totalBelanja &gt;= 300000 maka:</span>{'\n'}
              <span className="text-rose-300">         Tetapkan diskon promo = 5%</span>{'\n'}
              <span className="font-bold text-rose-300">      Selain itu:</span>{'\n'}
              <span className="text-rose-300">         Tetapkan diskon = 0%</span>{'\n\n'}
              <span className="text-slate-400">3. Hitung potongan = totalBelanja * diskon / 100.</span>{'\n'}
              <span className="text-slate-400">4. Hitung totalBayar = totalBelanja - potongan.</span>{'\n'}
              <span className="text-slate-400">5. Tampilkan totalBayar dan voucher ke layar.</span>{'\n'}
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
                  <CaseStudyVerticalFlowchart
                    memberType={memberType}
                    totalBelanja={totalBelanja}
                    isWeekend={isWeekend}
                    step={step}
                  />
                )}
                {effectiveOrientation === 'horizontal' && (
                  <CaseStudyHorizontalFlowchart
                    memberType={memberType}
                    totalBelanja={totalBelanja}
                    isWeekend={isWeekend}
                    step={step}
                  />
                )}
              </div>
            </div>

            {/* ─── ZONA BAWAH: CONTROL DOCK TERPADU & TIDAK TERPOTONG ─── */}
            <div className="p-4 md:p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                {/* 1. Kontrol Masukan Kasir */}
                <div className="lg:col-span-8 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Tipe Member Chips */}
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-xs font-mono font-bold text-slate-300">Tipe Member:</span>
                      <div className="flex gap-1.5">
                        {(['VIP', 'REGULER', 'NON_MEMBER'] as const).map(type => (
                          <button
                            key={type}
                            onClick={() => { setMemberType(type); reset(); }}
                            className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              memberType === type
                                ? 'bg-amber-600 text-white shadow-md font-black'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {type === 'VIP' ? '👑 VIP' : type === 'REGULER' ? '⭐ Reg' : '👤 Umum'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Switch Weekend */}
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono text-slate-300">Hari Transaksi:</span>
                        <span className={`font-mono font-bold ${isWeekend ? 'text-amber-400' : 'text-slate-400'}`}>
                          {isWeekend ? '🎉 Akhir Pekan' : '💼 Hari Kerja'}
                        </span>
                      </div>
                      <button
                        onClick={() => { setIsWeekend(!isWeekend); reset(); }}
                        className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          isWeekend ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>Ganti ke {isWeekend ? 'Weekday (Tanpa Voucher)' : 'Weekend (+Voucher VIP)'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Slider Total Belanja */}
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-slate-300">Total Belanja:</span>
                      <span className="font-mono font-black text-amber-400 text-base px-2.5 py-0.5 rounded-lg bg-slate-900 border border-amber-500/40">
                        Rp {totalBelanja.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={50000}
                      max={500000}
                      step={10000}
                      value={totalBelanja}
                      onChange={e => { setTotalBelanja(Number(e.target.value)); reset(); }}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>Rp 50.000</span>
                      <span>Ambang Bonus: 200rb (Reguler) / 250rb (VIP) / 300rb (Umum)</span>
                      <span>Rp 500.000</span>
                    </div>
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

              {/* 3. Struk Kasir Live — Widescreen, Jelas & Bebas Terpotong */}
              <div className="p-4 rounded-2xl border-2 border-emerald-500/80 bg-emerald-950/70 text-xs font-mono space-y-2 shadow-md">
                <div className="flex flex-wrap items-center justify-between border-b border-emerald-500/40 pb-2 gap-2">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-white text-sm">STRUK TRANSAKSI KASIR (LIVE RUNTIME)</span>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-sm">
                    TOTAL DISKON: {diskonPersen}%
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-slate-300 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block font-bold uppercase">Subtotal Belanja:</span>
                    <span className="text-sm font-bold text-white">Rp {totalBelanja.toLocaleString('id-ID')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block font-bold uppercase">Potongan Diskon ({diskonPersen}%):</span>
                    <span className="text-sm font-bold text-emerald-400">- Rp {potonganRupiah.toLocaleString('id-ID')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block font-bold uppercase">Bonus Akhir Pekan:</span>
                    <span className={`text-sm font-bold ${bonusVoucher > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                      {bonusVoucher > 0 ? `🎁 Voucher Rp ${bonusVoucher.toLocaleString('id-ID')}` : 'Tidak Ada'}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center border-t border-emerald-500/40 pt-2 text-base md:text-lg font-black text-white">
                  <span>TOTAL WAJIB BAYAR:</span>
                  <span className="text-emerald-300 font-mono">Rp {totalBayar.toLocaleString('id-ID')}</span>
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
                📋 <strong>Pseudocode Standar Bisnis Swalayan</strong> — Menggambarkan aturan diskon bersarang untuk kasir.
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
                  <span className="text-xs text-slate-400 font-mono">pseudocode — KASIR SWALAYAN</span>
                </div>
              </div>
              <pre className="p-5 text-sm font-mono text-slate-200 leading-relaxed whitespace-pre overflow-x-auto">
                <span className="text-purple-400 font-bold">PROGRAM</span> <span className="text-white font-semibold">KasirSwalayanDiskon</span>{'\n'}
                <span className="text-slate-500 italic text-xs">// Menghitung potongan harga berdasarkan keanggotaan dan hari</span>{'\n\n'}
                <span className="text-sky-400 font-bold">KAMUS:</span>{'\n'}
                <span className="text-slate-300">  member : string</span>{'\n'}
                <span className="text-slate-300">  totalBelanja, diskon, potongan, totalBayar, voucher : integer</span>{'\n'}
                <span className="text-slate-300">  hariLibur : boolean</span>{'\n\n'}
                <span className="text-amber-400 font-bold">ALGORITMA:</span>{'\n'}
                <span className="text-slate-300">  input(member, totalBelanja, hariLibur)</span>{'\n'}
                <span className="text-amber-300 font-bold">  if</span> <span className="text-amber-100 font-bold">member == &quot;VIP&quot;</span> <span className="text-amber-300 font-bold">then</span>{'\n'}
                <span className="text-emerald-300">    diskon = 20</span>{'\n'}
                <span className="text-sky-300 font-bold">    if</span> <span className="text-sky-100 font-bold">totalBelanja &gt;= 250000</span> <span className="text-sky-300 font-bold">then</span>{'\n'}
                <span className="text-emerald-300">      diskon = diskon + 5</span>{'\n'}
                <span className="text-sky-300 font-bold">    endif</span>{'\n'}
                <span className="text-purple-300 font-bold">    if</span> <span className="text-purple-100 font-bold">hariLibur == true</span> <span className="text-purple-300 font-bold">then</span>{'\n'}
                <span className="text-emerald-300">      voucher = 25000</span>{'\n'}
                <span className="text-purple-300 font-bold">    endif</span>{'\n'}
                <span className="text-amber-300 font-bold">  else if</span> <span className="text-amber-100 font-bold">member == &quot;REGULER&quot;</span> <span className="text-amber-300 font-bold">then</span>{'\n'}
                <span className="text-sky-300">    diskon = 10</span>{'\n'}
                <span className="text-sky-300 font-bold">    if</span> <span className="text-sky-100 font-bold">totalBelanja &gt;= 200000</span> <span className="text-sky-300 font-bold">then</span>{'\n'}
                <span className="text-sky-300">      diskon = diskon + 5</span>{'\n'}
                <span className="text-sky-300 font-bold">    endif</span>{'\n'}
                <span className="text-amber-300 font-bold">  else</span>{'\n'}
                <span className="text-rose-300 font-bold">    if</span> <span className="text-rose-100 font-bold">totalBelanja &gt;= 300000</span> <span className="text-rose-300 font-bold">then</span>{'\n'}
                <span className="text-rose-300">      diskon = 5</span>{'\n'}
                <span className="text-rose-300 font-bold">    else</span>{'\n'}
                <span className="text-rose-300">      diskon = 0</span>{'\n'}
                <span className="text-rose-300 font-bold">    endif</span>{'\n'}
                <span className="text-amber-300 font-bold">  endif</span>{'\n'}
                <span className="text-slate-300">  potongan = totalBelanja * diskon / 100</span>{'\n'}
                <span className="text-slate-300">  totalBayar = totalBelanja - potongan</span>{'\n'}
                <span className="text-slate-300">  output(&quot;Total Bayar: Rp&quot;, totalBayar)</span>
              </pre>
            </div>
          </motion.div>
        )}

        {/* 4. TAB KODE PROGRAM */}
        {activeTab === 'kode' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-3 bg-slate-900 border border-slate-700/60 rounded-xl flex items-center justify-between flex-wrap gap-2">
              <p className="text-slate-300 text-xs font-medium">
                💻 <strong>Kode Program Eksekusi Langsung</strong> — Implementasi kalkulasi diskon bertingkat dalam Python &amp; JavaScript.
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
                    {activeLang === 'python' ? 'kasir_swalayan.py' : 'kasirSwalayan.js'}
                  </span>
                </div>
              </div>
              <pre className="p-5 text-sm font-mono text-slate-200 leading-relaxed overflow-x-auto">
                {activeLang === 'python' ? (
                  <>
                    <span className="text-slate-400">member = &quot;{memberType}&quot;</span>{'\n'}
                    <span className="text-slate-400">total_belanja = {totalBelanja}</span>{'\n'}
                    <span className="text-slate-400">hari_libur = {isWeekend ? 'True' : 'False'}</span>{'\n'}
                    <span className="text-slate-400">voucher = 0</span>{'\n\n'}
                    <span className="text-amber-300 font-bold">if member == &quot;VIP&quot;:</span>{'\n'}
                    <span className="text-emerald-300">    diskon = 20</span>{'\n'}
                    <span className="text-sky-300 font-bold">    if total_belanja &gt;= 250000:</span>{'\n'}
                    <span className="text-emerald-300">        diskon += 5</span>{'\n'}
                    <span className="text-purple-300 font-bold">    if hari_libur:</span>{'\n'}
                    <span className="text-emerald-300">        voucher = 25000</span>{'\n'}
                    <span className="text-amber-300 font-bold">elif member == &quot;REGULER&quot;:</span>{'\n'}
                    <span className="text-sky-300">    diskon = 10</span>{'\n'}
                    <span className="text-sky-300 font-bold">    if total_belanja &gt;= 200000:</span>{'\n'}
                    <span className="text-sky-300">        diskon += 5</span>{'\n'}
                    <span className="text-amber-300 font-bold">else:</span>{'\n'}
                    <span className="text-rose-300 font-bold">    if total_belanja &gt;= 300000:</span>{'\n'}
                    <span className="text-rose-300">        diskon = 5</span>{'\n'}
                    <span className="text-rose-300 font-bold">    else:</span>{'\n'}
                    <span className="text-rose-300">        diskon = 0</span>{'\n\n'}
                    <span className="text-slate-400">potongan = int(total_belanja * diskon / 100)</span>{'\n'}
                    <span className="text-slate-400">total_bayar = total_belanja - potongan</span>{'\n'}
                    <span className="text-slate-400">print(f&quot;Diskon: &#123;diskon&#125;% | Bayar: Rp&#123;total_bayar:,&#125;&quot;)</span>
                  </>
                ) : (
                  <>
                    <span className="text-slate-400">const member = &quot;{memberType}&quot;;</span>{'\n'}
                    <span className="text-slate-400">const totalBelanja = {totalBelanja};</span>{'\n'}
                    <span className="text-slate-400">const hariLibur = {isWeekend ? 'true' : 'false'};</span>{'\n'}
                    <span className="text-slate-400">let diskon = 0;</span>{'\n'}
                    <span className="text-slate-400">let voucher = 0;</span>{'\n\n'}
                    <span className="text-amber-300 font-bold">if (member === &quot;VIP&quot;) {'{'}</span>{'\n'}
                    <span className="text-emerald-300">    diskon = 20;</span>{'\n'}
                    <span className="text-sky-300 font-bold">    if (totalBelanja &gt;= 250000) {'{'}</span>{'\n'}
                    <span className="text-emerald-300">        diskon += 5;</span>{'\n'}
                    <span className="text-purple-300 font-bold">    {'}'}</span>{'\n'}
                    <span className="text-purple-300 font-bold">    if (hariLibur) {'{'}</span>{'\n'}
                    <span className="text-emerald-300">        voucher = 25000;</span>{'\n'}
                    <span className="text-purple-300 font-bold">    {'}'}</span>{'\n'}
                    <span className="text-amber-300 font-bold">{'}'} else if (member === &quot;REGULER&quot;) {'{'}</span>{'\n'}
                    <span className="text-sky-300">    diskon = 10;</span>{'\n'}
                    <span className="text-sky-300 font-bold">    if (totalBelanja &gt;= 200000) {'{'}</span>{'\n'}
                    <span className="text-sky-300">        diskon += 5;</span>{'\n'}
                    <span className="text-sky-300 font-bold">    {'}'}</span>{'\n'}
                    <span className="text-amber-300 font-bold">{'}'} else {'{'}</span>{'\n'}
                    <span className="text-rose-300 font-bold">    if (totalBelanja &gt;= 300000) {'{'}</span>{'\n'}
                    <span className="text-rose-300">        diskon = 5;</span>{'\n'}
                    <span className="text-rose-300 font-bold">    {'}'} else {'{'}</span>{'\n'}
                    <span className="text-rose-300">        diskon = 0;</span>{'\n'}
                    <span className="text-rose-300 font-bold">    {'}'}</span>{'\n'}
                    <span className="text-amber-300 font-bold">{'}'}</span>{'\n\n'}
                    <span className="text-slate-400">const potongan = Math.round(totalBelanja * diskon / 100);</span>{'\n'}
                    <span className="text-slate-400">const totalBayar = totalBelanja - potongan;</span>{'\n'}
                    <span className="text-slate-400">console.log(`Diskon: $&#123;diskon&#125;% | Bayar: Rp$&#123;totalBayar&#125;`);</span>
                  </>
                )}
              </pre>
            </div>

            {/* Live Terminal Output Simulator */}
            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <span className="text-xs text-amber-400 font-bold font-mono">Hasil Output Program</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                  ✔ DISKON: {diskonPersen}%
                </span>
              </div>
              <div className="p-4 space-y-1">
                <p className="text-sm font-mono font-bold text-emerald-300">
                  &gt; Total Bayar: Rp {totalBayar.toLocaleString('id-ID')} (Potongan: Rp {potonganRupiah.toLocaleString('id-ID')})
                </p>
                {bonusVoucher > 0 && (
                  <p className="text-amber-300 text-xs font-mono font-bold">
                    &gt; Voucher Belanja: Rp {bonusVoucher.toLocaleString('id-ID')}
                  </p>
                )}
                <p className="text-slate-500 text-xs font-mono">&gt; Transaksi selesai dicatat.</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
