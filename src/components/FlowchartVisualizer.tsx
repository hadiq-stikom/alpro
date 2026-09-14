"use client";

import React, { useEffect, useState, useRef, memo } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MarkerType,
  Node,
  Edge,
  Handle,
  Position,
  BaseEdge,
  EdgeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { formatOutputArgsForPseudocode } from '@/lib/algorithm-formatters';

// ── 1. Terminator Node (MULAI / SELESAI) ──────────────────────────────────────
const TerminatorNode = memo(({ data }: { data: { label: string; isStart: boolean } }) => {
  const isStart = data.isStart;
  return (
    <div
      className={`px-6 py-2 rounded-full border-2 font-mono text-xs font-black tracking-widest uppercase shadow-lg text-center min-w-[130px] transition-all select-none ${
        isStart
          ? 'bg-emerald-950/95 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.35)]'
          : 'bg-rose-950/95 border-rose-400 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.35)]'
      }`}
    >
      {!isStart && <Handle type="target" position={Position.Top} id="top" className="opacity-0 !w-2 !h-2" />}
      {!isStart && <Handle type="target" position={Position.Left} id="left" className="opacity-0 !w-2 !h-2" style={{ top: '50%', left: 0 }} />}
      <span>{data.label}</span>
      {isStart && <Handle type="source" position={Position.Bottom} id="bottom" className="opacity-0 !w-2 !h-2" />}
      {isStart && <Handle type="source" position={Position.Right} id="right" className="opacity-0 !w-2 !h-2" style={{ top: '50%', right: 0 }} />}
    </div>
  );
});
TerminatorNode.displayName = 'TerminatorNode';

// ── 2. Process Node (Persegi Panjang Standar ANSI) ───────────────────────────
const ProcessNode = memo(({ data }: { 
  data: { 
    label: string; 
    stepKey?: string; 
    isHovered?: boolean; 
    onHover?: (key: string | null) => void;
    branchStatus?: 'active' | 'bypassed' | 'neutral';
  } 
}) => {
  const isBypassed = data.branchStatus === 'bypassed';
  const isActive = data.branchStatus === 'active';

  return (
    <div
      onMouseEnter={() => data.stepKey && data.onHover?.(data.stepKey)}
      onMouseLeave={() => data.onHover?.(null)}
      className={`relative px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-center min-w-[160px] max-w-[280px] select-none transition-all duration-300 cursor-pointer ${
        data.isHovered
          ? 'bg-indigo-700 !border-4 !border-amber-400 text-white scale-110 shadow-[0_0_30px_rgba(251,191,36,0.95)] z-50'
          : isBypassed
            ? 'bg-slate-900/50 border border-slate-700/60 text-slate-500 opacity-40 grayscale-[60%] hover:opacity-80'
            : isActive
              ? 'bg-slate-900/95 border-2 border-emerald-400 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-[1.02]'
              : 'bg-slate-900/95 border-2 border-indigo-500/80 text-indigo-100 shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:scale-[1.02]'
      }`}
    >
      {data.isHovered ? (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-mono text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg border border-white whitespace-nowrap pointer-events-none animate-bounce z-50">
          📍 AKTIF
        </div>
      ) : isBypassed ? (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-400 font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-slate-700 whitespace-nowrap pointer-events-none z-30">
          🚫 DILEWATI
        </div>
      ) : isActive ? (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-emerald-400 whitespace-nowrap pointer-events-none shadow z-30">
          ✓ DIJALANKAN
        </div>
      ) : null}
      <Handle type="target" position={Position.Top} id="top" className="opacity-0 !w-2 !h-2" />
      <Handle type="source" position={Position.Top} id="s-top" className="opacity-0 !w-2 !h-2" style={{ top: 0, left: '50%' }} />
      <Handle type="target" position={Position.Left} id="left" className="opacity-0 !w-2 !h-2" style={{ top: '50%', left: 0 }} />
      <div className="break-words leading-relaxed">{data.label}</div>
      <Handle type="source" position={Position.Right} id="right" className="opacity-0 !w-2 !h-2" style={{ top: '50%', right: 0 }} />
      <Handle type="source" position={Position.Bottom} id="bottom" className="opacity-0 !w-2 !h-2" />
      <Handle type="target" position={Position.Bottom} id="t-bottom" className="opacity-0 !w-2 !h-2" style={{ bottom: 0, left: '50%' }} />
    </div>
  );
});
ProcessNode.displayName = 'ProcessNode';

// ── 3. IO Node (Jajaran Genjang Standar ANSI) ─────────────────────────────────
const IONode = memo(({ data }: { 
  data: { 
    label: string; 
    stepKey?: string; 
    isHovered?: boolean; 
    onHover?: (key: string | null) => void;
    branchStatus?: 'active' | 'bypassed' | 'neutral';
  } 
}) => {
  const isBypassed = data.branchStatus === 'bypassed';
  const isActive = data.branchStatus === 'active';

  return (
    <div 
      onMouseEnter={() => data.stepKey && data.onHover?.(data.stepKey)}
      onMouseLeave={() => data.onHover?.(null)}
      className={`relative flex items-center justify-center min-w-[170px] max-w-[280px] select-none transition-all duration-300 cursor-pointer ${
        data.isHovered 
          ? 'scale-110 z-50' 
          : isBypassed 
            ? 'opacity-40 grayscale-[60%] hover:opacity-80' 
            : 'hover:scale-[1.02]'
      }`}
    >
      {data.isHovered ? (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-mono text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg border border-white whitespace-nowrap pointer-events-none animate-bounce z-50">
          📍 AKTIF
        </div>
      ) : isBypassed ? (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-400 font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-slate-700 whitespace-nowrap pointer-events-none z-30">
          🚫 DILEWATI
        </div>
      ) : isActive ? (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-emerald-400 whitespace-nowrap pointer-events-none shadow z-30">
          ✓ DIJALANKAN
        </div>
      ) : null}
      <Handle type="target" position={Position.Top} id="top" className="opacity-0 !w-2 !h-2" />
      <Handle type="source" position={Position.Top} id="s-top" className="opacity-0 !w-2 !h-2" style={{ top: 0, left: '50%' }} />
      <Handle type="target" position={Position.Left} id="left" className="opacity-0 !w-2 !h-2" style={{ top: '50%', left: 0 }} />
      <div
        className={`px-5 py-3 rounded-xl font-mono text-xs font-bold w-full text-center transition-all duration-300 ${
          data.isHovered
            ? 'bg-purple-700 !border-4 !border-amber-400 text-white shadow-[0_0_30px_rgba(251,191,36,0.95)]'
            : isBypassed
              ? 'border border-slate-700 bg-slate-900/60 text-slate-400'
              : isActive
                ? 'border-2 border-emerald-400 bg-emerald-950/80 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'border-2 border-purple-400 bg-purple-950/90 text-purple-200 shadow-[0_4px_12px_rgba(0,0,0,0.3)]'
        }`}
        style={{ transform: 'skewX(-14deg)' }}
      >
        <div style={{ transform: 'skewX(14deg)' }} className="break-words leading-relaxed">
          {data.label}
        </div>
      </div>
      <Handle type="source" position={Position.Right} id="right" className="opacity-0 !w-2 !h-2" style={{ top: '50%', right: 0 }} />
      <Handle type="source" position={Position.Bottom} id="bottom" className="opacity-0 !w-2 !h-2" />
      <Handle type="target" position={Position.Bottom} id="t-bottom" className="opacity-0 !w-2 !h-2" style={{ bottom: 0, left: '50%' }} />
    </div>
  );
});
IONode.displayName = 'IONode';

// ── 4. Diamond Decision Node (Belah Ketupat Standar ANSI) ──────────────────────
const DiamondNode = memo(({ data }: { 
  data: { 
    label: string; 
    stepKey?: string; 
    isHovered?: boolean; 
    onHover?: (key: string | null) => void;
    condResult?: boolean | null;
    branchStatus?: 'active' | 'bypassed' | 'neutral';
  } 
}) => {
  const isBypassed = data.branchStatus === 'bypassed';

  return (
    <div 
      onMouseEnter={() => data.stepKey && data.onHover?.(data.stepKey)}
      onMouseLeave={() => data.onHover?.(null)}
      className={`relative flex items-center justify-center select-none transition-all duration-300 cursor-pointer ${
        data.isHovered 
          ? 'scale-110 z-50' 
          : isBypassed 
            ? 'opacity-40 grayscale-[60%] hover:opacity-80' 
            : 'hover:scale-[1.02]'
      }`} 
      style={{ width: 200, height: 90 }}
    >
      {data.isHovered ? (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-mono text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg border border-white whitespace-nowrap pointer-events-none animate-bounce z-50">
          📍 AKTIF
        </div>
      ) : isBypassed ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-400 font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-slate-700 whitespace-nowrap pointer-events-none z-30">
          🚫 DILEWATI
        </div>
      ) : null}
      <Handle type="target" position={Position.Top} id="top" className="opacity-0 !w-2 !h-2" style={{ top: 2 }} />
      
      {/* SVG Diamond Shape */}
      <svg width="200" height="90" viewBox="0 0 200 90" className="absolute inset-0 pointer-events-none">
        <polygon
          points="100,3 197,45 100,87 3,45"
          fill={data.isHovered ? '#b45309' : isBypassed ? '#1e1a17' : '#451a03'}
          stroke={
            data.isHovered
              ? '#fbbf24'
              : isBypassed
                ? '#64748b'
                : data.condResult === true 
                  ? '#10b981' 
                  : data.condResult === false 
                    ? '#f43f5e' 
                    : '#fbbf24'
          }
          strokeWidth={data.isHovered ? 4.5 : isBypassed ? 1.5 : 2.5}
          strokeDasharray={isBypassed ? '4,4' : undefined}
          className={`transition-all ${
            data.isHovered 
              ? 'filter drop-shadow-[0_0_24px_rgba(251,191,36,1)]' 
              : isBypassed
                ? 'filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]'
                : data.condResult === true
                  ? 'filter drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                  : data.condResult === false
                    ? 'filter drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                    : 'filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]'
          }`}
        />
      </svg>
      
      {/* Text Label Inside */}
      <div className="relative z-10 px-6 text-center max-w-[150px]">
        <span className={`font-mono text-xs font-black leading-snug block break-words transition-colors ${
          data.isHovered ? 'text-white drop-shadow-md text-[13px]' : isBypassed ? 'text-slate-400' : 'text-amber-200'
        }`}>
          {data.label}
        </span>
      </div>

      {/* Evaluation Result Badge */}
      {!isBypassed && data.condResult !== null && typeof data.condResult !== 'undefined' && (
        <div className={`absolute -bottom-3.5 left-1/2 -translate-x-1/2 font-mono text-[9px] font-black px-2 py-0.5 rounded-full shadow-md border whitespace-nowrap pointer-events-none z-30 flex items-center gap-1 ${
          data.condResult === true
            ? 'bg-emerald-600 text-white border-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
            : 'bg-rose-600 text-white border-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
        }`}>
          <span>{data.condResult === true ? '✓' : '✗'}</span>
          <span>HASIL: {data.condResult === true ? 'TRUE (Ya)' : 'FALSE (Tidak)'}</span>
        </div>
      )}

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="opacity-0 !w-2 !h-2"
        style={{ top: 2, left: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="yes-top"
        className="opacity-0 !w-2 !h-2"
        style={{ top: 2, left: '50%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="t-left"
        className="opacity-0 !w-2 !h-2"
        style={{ left: 2, top: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="yes-left"
        className="opacity-0 !w-2 !h-2"
        style={{ left: 2, top: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="yes"
        className="opacity-0 !w-2 !h-2"
        style={{ right: 2, top: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="yes-right"
        className="opacity-0 !w-2 !h-2"
        style={{ right: 2, top: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="no-left"
        className="opacity-0 !w-2 !h-2"
        style={{ left: 2, top: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="no"
        className="opacity-0 !w-2 !h-2"
        style={{ right: 2, top: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="no-right"
        className="opacity-0 !w-2 !h-2"
        style={{ right: 2, top: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="opacity-0 !w-2 !h-2"
        style={{ bottom: 2, left: '50%' }}
      />
    </div>
  );
});
DiamondNode.displayName = 'DiamondNode';

// ── 5. Merge Node (Titik Temu Jalur ISO) ──────────────────────────────────────
const MergeNode = memo(() => {
  return (
    <div className="w-4 h-4 rounded-full bg-slate-700 border-2 border-slate-400 shadow-md relative">
      <Handle type="target" position={Position.Top} id="t-top" className="opacity-0 !w-2 !h-2" style={{ top: 0, left: '50%' }} />
      <Handle type="target" position={Position.Left} id="t-left" className="opacity-0 !w-2 !h-2" style={{ top: '50%', left: 0 }} />
      <Handle type="target" position={Position.Right} id="t-right" className="opacity-0 !w-2 !h-2" style={{ top: '50%', right: 0 }} />
      <Handle type="target" position={Position.Bottom} id="t-bottom" className="opacity-0 !w-2 !h-2" style={{ bottom: 0, left: '50%' }} />
      <Handle type="source" position={Position.Right} id="r-out" className="opacity-0 !w-2 !h-2" style={{ top: '50%', right: 0 }} />
      <Handle type="source" position={Position.Bottom} id="b-out" className="opacity-0 !w-2 !h-2" style={{ bottom: 0, left: '50%' }} />
    </div>
  );
});
MergeNode.displayName = 'MergeNode';

// ── 6. Trunk Edge (Satu Jalur Bus Vertikal Lurus Standar ANSI) ─────────────────
const TrunkEdge = memo(({
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
  markerEnd,
  markerStart,
  interactionWidth,
}: EdgeProps) => {
  const r = 12;
  let path = '';
  if (sourceX < targetX - 5 && targetY > sourceY + r) {
    path = `M ${sourceX} ${sourceY} L ${sourceX} ${targetY - r} Q ${sourceX} ${targetY} ${sourceX + r} ${targetY} L ${targetX} ${targetY}`;
  } else if (sourceX > targetX + 5 && targetY > sourceY + r) {
    path = `M ${sourceX} ${sourceY} L ${sourceX} ${targetY - r} Q ${sourceX} ${targetY} ${sourceX - r} ${targetY} L ${targetX} ${targetY}`;
  } else {
    path = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
  }

  return (
    <BaseEdge
      path={path}
      style={style}
      markerEnd={markerEnd}
      markerStart={markerStart}
      interactionWidth={interactionWidth}
    />
  );
});
TrunkEdge.displayName = 'TrunkEdge';

// ── 7. Collector Edge (Garis Bus Kolektor Sisi Kanan Luar Standar ANSI) ────────
const CollectorEdge = memo(({
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
  markerEnd,
  markerStart,
  interactionWidth,
}: EdgeProps) => {
  const r = 10;
  const busX = Math.max(sourceX + 35, 630);

  const path = `M ${sourceX} ${sourceY} ` +
    `L ${busX - r} ${sourceY} ` +
    `Q ${busX} ${sourceY} ${busX} ${sourceY + r} ` +
    `L ${busX} ${targetY - r} ` +
    `Q ${busX} ${targetY} ${busX - r} ${targetY} ` +
    `L ${targetX} ${targetY}`;

  return (
    <BaseEdge
      path={path}
      style={style}
      markerEnd={markerEnd}
      markerStart={markerStart}
      interactionWidth={interactionWidth}
    />
  );
});
CollectorEdge.displayName = 'CollectorEdge';

// ── 8. Collector Horizontal Edge (Garis Bus Kolektor Sisi Atas Standar ANSI) ────
const CollectorHorizontalEdge = memo(({
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
  markerEnd,
  markerStart,
  interactionWidth,
}: EdgeProps) => {
  const r = 10;
  // Bus berjalan di atas seluruh node aksi
  const busY = Math.min(sourceY - 35, 45);

  let path = '';
  if (sourceX < targetX - 2 * r) {
    path = `M ${sourceX} ${sourceY} ` +
      `L ${sourceX} ${busY + r} ` +
      `Q ${sourceX} ${busY} ${sourceX + r} ${busY} ` +
      `L ${targetX - r} ${busY} ` +
      `Q ${targetX} ${busY} ${targetX} ${busY + r} ` +
      `L ${targetX} ${targetY}`;
  } else {
    path = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
  }

  return (
    <BaseEdge
      path={path}
      style={style}
      markerEnd={markerEnd}
      markerStart={markerStart}
      interactionWidth={interactionWidth}
    />
  );
});
CollectorHorizontalEdge.displayName = 'CollectorHorizontalEdge';

const nodeTypes = {
  terminatorNode: TerminatorNode,
  processNode: ProcessNode,
  ioNode: IONode,
  diamondNode: DiamondNode,
  mergeNode: MergeNode,
};

const edgeTypes = {
  trunkEdge: TrunkEdge,
  collectorEdge: CollectorEdge,
  collectorHorizontalEdge: CollectorHorizontalEdge,
};

// ── Parser Struktur Kode ──────────────────────────────────────────────────────
type Stmt =
  | { kind: 'assign' | 'io'; label: string; varName?: string; id: string; stepKey: string }
  | { kind: 'if'; cond: string; trueBranch: Stmt[]; falseBranch: Stmt[]; id: string; stepKey: string; elseStepKey?: string }
  | {
      kind: 'multi_branch';
      branches: {
        cond: string;
        body: Stmt[];
        id: string;
        stepKey: string;
      }[];
      elseBranch?: {
        body: Stmt[];
        id: string;
        stepKey?: string;
      };
      id: string;
      stepKey: string;
    };

type IndexedLine = { text: string; lineIndex: number };

function getIndent(line: string): number {
  const match = line.search(/\S/);
  return match === -1 ? 0 : match;
}

function parseCode(lines: IndexedLine[]): Stmt[] {
  const stmts: Stmt[] = [];
  let i = 0;

  const stripComment = (l: string) => l.split('#')[0].split('//')[0].trimEnd();

  while (i < lines.length) {
    const item = lines[i];
    const raw = stripComment(item.text);
    const trimmed = raw.trim();

    if (!trimmed || trimmed === '}' || trimmed === '{') {
      i++;
      continue;
    }

    const baseIndent = getIndent(raw);

    // 1. Switch / Match Case
    const isSwitchMatch = /^switch\s*\(?.+\)?\s*[:{]/.test(trimmed) || /^match\s+.+:$/.test(trimmed);
    if (isSwitchMatch) {
      const matchLineIdx = item.lineIndex;
      const varMatch = trimmed.match(/(?:switch|match)\s*\(?(.*?)\)?\s*[:{]\s*$/);
      const targetVar = varMatch ? varMatch[1].trim() : 'pilihan';
      i++;

      const caseBranches: { cond: string; body: Stmt[]; id: string; stepKey: string }[] = [];
      let defaultBranch: { body: Stmt[]; id: string; stepKey?: string } | null = null;

      while (i < lines.length) {
        const nextItem = lines[i];
        const nextRaw = stripComment(nextItem.text);
        const nextTrimmed = nextRaw.trim();
        if (!nextTrimmed || nextTrimmed === '{') { i++; continue; }
        if (nextTrimmed === '}') { i++; break; }

        const nextIndent = getIndent(nextRaw);
        const isCase = /^case\s+.+:/.test(nextTrimmed);
        const isDefault = /^default\s*:/.test(nextTrimmed) || /^case\s+_+\s*:/.test(nextTrimmed);

        if (isCase) {
          const caseValMatch = nextTrimmed.match(/^case\s+(.*?)\s*:\s*$/);
          const val = caseValMatch ? caseValMatch[1].trim() : '';
          const caseLineIdx = nextItem.lineIndex;
          i++;

          const caseBodyLines: IndexedLine[] = [];
          while (i < lines.length) {
            const subItem = lines[i];
            const subRaw = stripComment(subItem.text);
            const subTrimmed = subRaw.trim();
            if (!subTrimmed) { i++; continue; }
            if (subTrimmed === 'break;' || subTrimmed === 'break') { i++; continue; }
            if (/^case\s+/.test(subTrimmed) || /^default\s*:/.test(subTrimmed) || subTrimmed === '}') break;

            const subIndent = getIndent(subRaw);
            if (subIndent > nextIndent || (subIndent === nextIndent && !subTrimmed.startsWith('case') && !subTrimmed.startsWith('default'))) {
              caseBodyLines.push(subItem);
              i++;
            } else {
              break;
            }
          }

          caseBranches.push({
            cond: `${targetVar} == ${val}?`,
            body: parseCode(caseBodyLines),
            id: `case-${caseLineIdx}`,
            stepKey: `line-${caseLineIdx}`
          });
        } else if (isDefault) {
          const defLineIdx = nextItem.lineIndex;
          i++;

          const defBodyLines: IndexedLine[] = [];
          while (i < lines.length) {
            const subItem = lines[i];
            const subRaw = stripComment(subItem.text);
            const subTrimmed = subRaw.trim();
            if (!subTrimmed) { i++; continue; }
            if (subTrimmed === 'break;' || subTrimmed === 'break') { i++; continue; }
            if (subTrimmed === '}') break;

            defBodyLines.push(subItem);
            i++;
          }

          defaultBranch = {
            body: parseCode(defBodyLines),
            id: `default-${defLineIdx}`,
            stepKey: `line-${defLineIdx}`
          };
          break;
        } else {
          i++;
        }
      }

      stmts.push({
        kind: 'multi_branch',
        branches: caseBranches,
        elseBranch: defaultBranch || undefined,
        id: `switch-${matchLineIdx}`,
        stepKey: `line-${matchLineIdx}`
      });
      continue;
    }

    // 2. IF statement (Python: `if ...:`, JS: `if (...) {` or `if (...)`)
    const isIf = /^if\s*\(?.+\)?\s*[:{]/.test(trimmed) || /^if\s+.+:$/.test(trimmed);
    if (isIf) {
      const ifLineIdx = item.lineIndex;
      const condMatch = trimmed.match(/^if\s*\(?(.*?)\)?\s*[:{]\s*$/) || trimmed.match(/^if\s+(.*):$/);
      let cond1 = condMatch ? condMatch[1].trim() : trimmed.replace(/^if\s*/, '');
      cond1 = cond1.replace(/\s*:\s*$/, '').replace(/\s*\{\s*$/, '');
      if (!cond1.endsWith('?')) cond1 += '?';
      i++;

      // Collect True branch for IF
      const trueLines: IndexedLine[] = [];
      let braceDepth = trimmed.includes('{') ? 1 : 0;

      while (i < lines.length) {
        const subItem = lines[i];
        const subRaw = stripComment(subItem.text);
        const subTrimmed = subRaw.trim();
        if (!subTrimmed) { i++; continue; }

        const subIndent = getIndent(subRaw);

        // In Python (braceDepth === 0): check indentation
        // In JS (braceDepth > 0): if line starts with '} else' or '} else if' or 'else', it closes this block and starts next branch
        if (subTrimmed.startsWith('} else') || subTrimmed.startsWith('} else if') || (braceDepth === 0 && subIndent === baseIndent && (subTrimmed.startsWith('elif') || subTrimmed.startsWith('else')))) {
          break;
        }

        if (braceDepth > 0) {
          if (subTrimmed === '}') {
            braceDepth--;
            if (braceDepth === 0) { i++; break; }
          }
          trueLines.push(subItem);
          i++;
        } else if (subIndent > baseIndent) {
          trueLines.push(subItem);
          i++;
        } else {
          break;
        }
      }

      // Check for ELIF / ELSE IF / ELSE chains
      const elifBranches: { cond: string; body: Stmt[]; id: string; stepKey: string }[] = [];
      let elseBranch: { body: Stmt[]; id: string; stepKey?: string } | null = null;

      while (i < lines.length) {
        const nextItem = lines[i];
        const nextRaw = stripComment(nextItem.text);
        const nextTrimmed = nextRaw.trim();
        if (!nextTrimmed) { i++; continue; }

        const nextIndent = getIndent(nextRaw);
        const isElif = (/^elif\s+.+:$/.test(nextTrimmed) || /^elif\s*\(?.+\)?\s*[:{]/.test(nextTrimmed) || /^}?\s*else\s+if\s*\(?.+\)?\s*[:{]/.test(nextTrimmed)) && (nextIndent === baseIndent || nextIndent === 0);
        const isElse = (/^else\s*:$/.test(nextTrimmed) || /^}?\s*else\s*[:{]?$/.test(nextTrimmed) || /^else\s*\{$/.test(nextTrimmed)) && (nextIndent === baseIndent || nextIndent === 0);

        if (isElif) {
          const elifLineIdx = nextItem.lineIndex;
          const elifMatch = nextTrimmed.match(/(?:elif|else\s+if)\s*\(?(.*?)\)?\s*[:{]\s*$/) || nextTrimmed.match(/elif\s+(.*):$/);
          let elifCond = elifMatch ? elifMatch[1].trim() : nextTrimmed;
          elifCond = elifCond.replace(/\s*:\s*$/, '').replace(/\s*\{\s*$/, '');
          if (!elifCond.endsWith('?')) elifCond += '?';
          i++;

          const elifBodyLines: IndexedLine[] = [];
          let elifBrace = nextTrimmed.includes('{') ? 1 : 0;
          while (i < lines.length) {
            const subItem = lines[i];
            const subRaw = stripComment(subItem.text);
            const subTrimmed = subRaw.trim();
            if (!subTrimmed) { i++; continue; }

            const subIndent = getIndent(subRaw);
            if (subTrimmed.startsWith('} else') || subTrimmed.startsWith('} else if') || (elifBrace === 0 && subIndent === baseIndent && (subTrimmed.startsWith('elif') || subTrimmed.startsWith('else')))) {
              break;
            }

            if (elifBrace > 0) {
              if (subTrimmed === '}') {
                elifBrace--;
                if (elifBrace === 0) { i++; break; }
              }
              elifBodyLines.push(subItem);
              i++;
            } else if (subIndent > baseIndent) {
              elifBodyLines.push(subItem);
              i++;
            } else {
              break;
            }
          }

          elifBranches.push({
            cond: elifCond,
            body: parseCode(elifBodyLines),
            id: `elif-${elifLineIdx}`,
            stepKey: `line-${elifLineIdx}`
          });
        } else if (isElse) {
          const elseLineIdx = nextItem.lineIndex;
          const elseBrace = nextTrimmed.includes('{') ? 1 : 0;
          i++;

          const elseBodyLines: IndexedLine[] = [];
          let currBrace = elseBrace;
          while (i < lines.length) {
            const subItem = lines[i];
            const subRaw = stripComment(subItem.text);
            const subTrimmed = subRaw.trim();
            if (!subTrimmed) { i++; continue; }

            const subIndent = getIndent(subRaw);
            if (currBrace > 0) {
              if (subTrimmed === '}') {
                currBrace--;
                if (currBrace === 0) { i++; break; }
              }
              elseBodyLines.push(subItem);
              i++;
            } else if (subIndent > baseIndent) {
              elseBodyLines.push(subItem);
              i++;
            } else {
              break;
            }
          }

          elseBranch = {
            body: parseCode(elseBodyLines),
            id: `else-${elseLineIdx}`,
            stepKey: `line-${elseLineIdx}`
          };
          break;
        } else {
          break;
        }
      }

      if (elifBranches.length > 0) {
        stmts.push({
          kind: 'multi_branch',
          branches: [
            {
              cond: cond1,
              body: parseCode(trueLines),
              id: `if-${ifLineIdx}`,
              stepKey: `line-${ifLineIdx}`
            },
            ...elifBranches
          ],
          elseBranch: elseBranch || undefined,
          id: `mb-${ifLineIdx}`,
          stepKey: `line-${ifLineIdx}`
        });
      } else {
        stmts.push({
          kind: 'if',
          cond: cond1,
          trueBranch: parseCode(trueLines),
          falseBranch: elseBranch ? elseBranch.body : [],
          id: `if-${ifLineIdx}`,
          stepKey: `line-${ifLineIdx}`,
          elseStepKey: elseBranch ? elseBranch.stepKey : undefined
        });
      }
      continue;
    }

    // 3. Output IO (print / console.log)
    const norm = trimmed.replace(/^(let|const|var)\s+/, '').replace(/;$/, '').trim();
    if (norm.startsWith('print') || norm.startsWith('console.log')) {
      const match = norm.match(/\(([^)]*)\)/);
      let args = match ? match[1].trim() : norm;
      args = formatOutputArgsForPseudocode(args);
      stmts.push({ kind: 'io', label: `output(${args})`, id: `io-${item.lineIndex}`, stepKey: `line-${item.lineIndex}` });
      i++;
      continue;
    }

    // 4. Input IO
    if (norm.includes('=') && (norm.includes('input(') || norm.includes('prompt('))) {
      const varName = norm.split('=')[0].trim();
      stmts.push({ kind: 'io', label: `input(${varName})`, varName, id: `input-${item.lineIndex}`, stepKey: `line-${item.lineIndex}` });
      i++;
      continue;
    }

    // 5. Assignment / Process
    if (norm.includes('=') && !norm.startsWith('if') && !norm.startsWith('while') && !norm.startsWith('for') && !norm.startsWith('elif') && !norm.startsWith('case')) {
      const varName = norm.split('=')[0].trim();
      const label = norm.slice(0, 50) + (norm.length > 50 ? '…' : '');
      stmts.push({ kind: 'assign', label, varName, id: `assign-${item.lineIndex}`, stepKey: `line-${item.lineIndex}` });
      i++;
      continue;
    }

    i++;
  }

  return stmts;
}

// ── Variable Extractor & Condition Evaluator ─────────────────────────────────
function extractVariablesFromCode(code: string, runtimeVars: Record<string, any>): Record<string, any> {
  const vars: Record<string, any> = { ...runtimeVars };
  code.split('\n').forEach(line => {
    const withoutComment = line.split('#')[0].split('//')[0].trim();
    const trimmed = withoutComment.replace(/^(let|const|var)\s+/, '').replace(/;/g, '').trim();
    if (
      trimmed.includes('=') &&
      !trimmed.startsWith('if') &&
      !trimmed.startsWith('while') &&
      !trimmed.startsWith('for') &&
      !trimmed.startsWith('print') &&
      !trimmed.startsWith('console.log')
    ) {
      const parts = trimmed.split('=');
      const name = parts[0].trim();
      const valStr = parts.slice(1).join('=').trim();
      if (name && /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name) && !(name in vars)) {
        try {
          if (!isNaN(Number(valStr))) {
            vars[name] = Number(valStr);
          } else if (valStr === 'True' || valStr === 'true') {
            vars[name] = true;
          } else if (valStr === 'False' || valStr === 'false') {
            vars[name] = false;
          } else if (
            (valStr.startsWith('"') && valStr.endsWith('"')) ||
            (valStr.startsWith("'") && valStr.endsWith("'"))
          ) {
            vars[name] = valStr.slice(1, -1);
          }
        } catch (e) {}
      }
    }
  });
  return vars;
}

function evaluateCondition(condStr: string, vars: Record<string, any>): boolean | null {
  try {
    const cleanCond = condStr.replace(/\?+$/, '').trim();
    const expr = cleanCond
      .replace(/===/g, '==')
      .replace(/!==/g, '!=')
      .replace(/\band\b/g, '&&')
      .replace(/\bor\b/g, '||')
      .replace(/\bnot\b/g, '!')
      .replace(/\bTrue\b/g, 'true')
      .replace(/\bFalse\b/g, 'false');

    const keys = Object.keys(vars);
    const values = Object.values(vars);
    const fn = new Function(...keys, `return Boolean(${expr});`);
    return fn(...values);
  } catch (err) {
    return null;
  }
}

function getEstimatedNodeHeight(stmt: Stmt): number {
  if (stmt.kind === 'if' || stmt.kind === 'multi_branch') return 90;
  const len = stmt.label ? stmt.label.length : 20;
  if (len > 50) return 65;
  if (len > 30) return 52;
  return 42;
}

// ── Graph Builder ─────────────────────────────────────────────────────────────
function buildGraph(
  stmts: Stmt[],
  nodes: Node[],
  edges: Edge[],
  prevId: string,
  prevHandle: string | undefined,
  centerX: number,
  yRef: { y: number },
  counter: { n: number },
  variables: Record<string, any>,
  hoveredStepKey?: string | null,
  onHoverStepKey?: (key: string | null) => void,
  branchStatus: 'neutral' | 'active' | 'bypassed' = 'neutral'
): { lastId: string; lastHandle: string | undefined } {
  let currentPrev = prevId;
  let currentPrevHandle = prevHandle;

  for (const stmt of stmts) {
    if (stmt.kind === 'assign' || stmt.kind === 'io') {
      const nodeId = `${stmt.id}-${counter.n++}`;
      const nodeH = getEstimatedNodeHeight(stmt);
      const isHovered = Boolean(hoveredStepKey && hoveredStepKey === stmt.stepKey);

      nodes.push({
        id: nodeId,
        position: { x: centerX, y: yRef.y },
        origin: [0.5, 0],
        type: stmt.kind === 'io' ? 'ioNode' : 'processNode',
        data: { 
          label: stmt.label,
          stepKey: stmt.stepKey,
          isHovered,
          onHover: onHoverStepKey,
          branchStatus,
        },
      });

      edges.push({
        id: `e-${currentPrev}-${nodeId}`,
        source: currentPrev,
        sourceHandle: currentPrevHandle,
        target: nodeId,
        targetHandle: currentPrevHandle === 'yes' ? 'left' : 'top',
        type: 'smoothstep',
        style: branchStatus === 'bypassed'
          ? { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.4 }
          : branchStatus === 'active'
            ? { stroke: '#10b981', strokeWidth: 2.5, filter: 'drop-shadow(0 0 4px rgba(16,185,129,0.5))' }
            : { stroke: '#94a3b8', strokeWidth: 2 },
        animated: branchStatus === 'active',
        markerEnd: { 
          type: MarkerType.ArrowClosed, 
          color: branchStatus === 'bypassed' ? '#64748b' : branchStatus === 'active' ? '#10b981' : '#94a3b8', 
          width: 14, 
          height: 14 
        },
      });

      currentPrev = nodeId;
      currentPrevHandle = 'bottom';
      yRef.y += nodeH + 46;
    } else if (stmt.kind === 'if') {
      const diamondId = `diamond-${counter.n++}`;
      const isHovered = Boolean(hoveredStepKey && hoveredStepKey === stmt.stepKey);
      const condEval = branchStatus === 'bypassed' ? null : evaluateCondition(stmt.cond, variables);

      nodes.push({
        id: diamondId,
        position: { x: centerX, y: yRef.y },
        origin: [0.5, 0],
        type: 'diamondNode',
        data: { 
          label: stmt.cond,
          stepKey: stmt.stepKey,
          isHovered,
          onHover: onHoverStepKey,
          condResult: condEval,
          branchStatus,
        },
      });

      edges.push({
        id: `e-${currentPrev}-${diamondId}`,
        source: currentPrev,
        sourceHandle: currentPrevHandle,
        target: diamondId,
        targetHandle: 'top',
        type: 'smoothstep',
        style: branchStatus === 'bypassed'
          ? { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 }
          : { stroke: '#94a3b8', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: branchStatus === 'bypassed' ? '#64748b' : '#94a3b8', width: 14, height: 14 },
      });

      yRef.y += 90 + 40;
      const branchStartY = yRef.y;

      const leftBranchX = centerX - 220;
      const leftYRef = { y: branchStartY };
      let leftLastId: string;
      let leftLastHandle: string | undefined;

      const isTrueActive = branchStatus === 'bypassed' ? false : condEval === true;
      const isTrueBypassed = branchStatus === 'bypassed' ? true : condEval === false;
      const trueBranchStatus: 'active' | 'bypassed' | 'neutral' = 
        isTrueActive ? 'active' : isTrueBypassed ? 'bypassed' : 'neutral';

      if (stmt.trueBranch.length > 0) {
        const res = buildGraph(
          stmt.trueBranch,
          nodes,
          edges,
          diamondId,
          'yes-left',
          leftBranchX,
          leftYRef,
          counter,
          variables,
          hoveredStepKey,
          onHoverStepKey,
          trueBranchStatus
        );
        leftLastId = res.lastId;
        leftLastHandle = res.lastHandle;

        const firstEdge = edges.find(e => e.source === diamondId && (e.sourceHandle === 'yes-left' || e.sourceHandle === 'yes'));
        if (firstEdge) {
          if (condEval === true && branchStatus !== 'bypassed') {
            firstEdge.label = '✓ Ya (TRUE)';
            firstEdge.labelStyle = { fill: '#ffffff', fontWeight: 900, fontSize: 11 };
            firstEdge.labelBgStyle = { fill: '#059669', fillOpacity: 1, rx: 6, ry: 6 };
            firstEdge.labelBgPadding = [8, 4];
            firstEdge.style = { stroke: '#10b981', strokeWidth: 3.5, filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.8))' };
            firstEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#10b981', width: 16, height: 16 };
            firstEdge.animated = true;
          } else if (condEval === false || branchStatus === 'bypassed') {
            firstEdge.label = '✗ Ya (DILEWATI)';
            firstEdge.labelStyle = { fill: '#94a3b8', fontWeight: 700, fontSize: 10 };
            firstEdge.labelBgStyle = { fill: '#1e293b', fillOpacity: 0.8, rx: 4, ry: 4 };
            firstEdge.labelBgPadding = [6, 3];
            firstEdge.style = { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 };
            firstEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#64748b', width: 12, height: 12 };
            firstEdge.animated = false;
          } else {
            firstEdge.label = 'Ya';
            firstEdge.labelStyle = { fill: '#34d399', fontWeight: 900, fontSize: 12 };
            firstEdge.labelBgStyle = { fill: '#064e3b', fillOpacity: 0.95, rx: 4, ry: 4 };
            firstEdge.labelBgPadding = [6, 3];
            firstEdge.style = { stroke: '#10b981', strokeWidth: 2.5 };
            firstEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#10b981', width: 14, height: 14 };
            firstEdge.animated = false;
          }
        }
      } else {
        leftLastId = diamondId;
        leftLastHandle = 'yes-left';
      }

      const rightBranchX = centerX + 220;
      const rightYRef = { y: branchStartY };
      let rightLastId: string;
      let rightLastHandle: string | undefined;

      const isFalseActive = branchStatus === 'bypassed' ? false : condEval === false;
      const isFalseBypassed = branchStatus === 'bypassed' ? true : condEval === true;
      const falseBranchStatus: 'active' | 'bypassed' | 'neutral' = 
        isFalseActive ? 'active' : isFalseBypassed ? 'bypassed' : 'neutral';

      if (stmt.falseBranch.length > 0) {
        const res = buildGraph(
          stmt.falseBranch,
          nodes,
          edges,
          diamondId,
          'no',
          rightBranchX,
          rightYRef,
          counter,
          variables,
          hoveredStepKey,
          onHoverStepKey,
          falseBranchStatus
        );
        rightLastId = res.lastId;
        rightLastHandle = res.lastHandle;

        const firstEdge = edges.find(e => e.source === diamondId && e.sourceHandle === 'no');
        if (firstEdge) {
          const isElseHovered = Boolean(stmt.elseStepKey && hoveredStepKey === stmt.elseStepKey);
          if (isElseHovered) {
            firstEdge.label = '⚡ Selain itu (ELSE)';
            firstEdge.labelStyle = { fill: '#ffffff', fontWeight: 900, fontSize: 11 };
            firstEdge.labelBgStyle = { fill: '#b45309', fillOpacity: 1, rx: 6, ry: 6 };
            firstEdge.labelBgPadding = [8, 4];
            firstEdge.style = { stroke: '#fbbf24', strokeWidth: 4, filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.95))' };
            firstEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#fbbf24', width: 16, height: 16 };
            firstEdge.animated = true;
          } else if (condEval === false && branchStatus !== 'bypassed') {
            firstEdge.label = '✓ Tidak (FALSE)';
            firstEdge.labelStyle = { fill: '#ffffff', fontWeight: 900, fontSize: 11 };
            firstEdge.labelBgStyle = { fill: '#e11d48', fillOpacity: 1, rx: 6, ry: 6 };
            firstEdge.labelBgPadding = [8, 4];
            firstEdge.style = { stroke: '#f43f5e', strokeWidth: 3.5, filter: 'drop-shadow(0 0 6px rgba(244,63,94,0.8))' };
            firstEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#f43f5e', width: 16, height: 16 };
            firstEdge.animated = true;
          } else if (condEval === true || branchStatus === 'bypassed') {
            firstEdge.label = '✗ Tidak (DILEWATI)';
            firstEdge.labelStyle = { fill: '#94a3b8', fontWeight: 700, fontSize: 10 };
            firstEdge.labelBgStyle = { fill: '#1e293b', fillOpacity: 0.8, rx: 4, ry: 4 };
            firstEdge.labelBgPadding = [6, 3];
            firstEdge.style = { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 };
            firstEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#64748b', width: 12, height: 12 };
            firstEdge.animated = false;
          } else {
            firstEdge.label = 'Tidak';
            firstEdge.labelStyle = { fill: '#fb7185', fontWeight: 900, fontSize: 12 };
            firstEdge.labelBgStyle = { fill: '#4c0519', fillOpacity: 0.95, rx: 4, ry: 4 };
            firstEdge.labelBgPadding = [6, 3];
            firstEdge.style = { stroke: '#f43f5e', strokeWidth: 2.5 };
            firstEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#f43f5e', width: 14, height: 14 };
            firstEdge.animated = false;
          }
        }
      } else {
        rightLastId = diamondId;
        rightLastHandle = 'no';
      }

      const maxY = Math.max(leftYRef.y, rightYRef.y) + 30;
      const mergeId = `merge-${counter.n++}`;
      nodes.push({
        id: mergeId,
        position: { x: centerX, y: maxY },
        origin: [0.5, 0.5],
        type: 'mergeNode',
        data: {},
      });
      yRef.y = maxY + 45;

      edges.push({
        id: `e-${leftLastId}-${mergeId}`,
        source: leftLastId,
        sourceHandle: leftLastHandle,
        target: mergeId,
        targetHandle: 't-left',
        type: 'trunkEdge',
        style: condEval === true && branchStatus !== 'bypassed'
          ? { stroke: '#10b981', strokeWidth: 2.5, filter: 'drop-shadow(0 0 4px rgba(16,185,129,0.5))' }
          : { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 },
        animated: condEval === true && branchStatus !== 'bypassed',
        markerEnd: { 
          type: MarkerType.ArrowClosed, 
          color: condEval === true && branchStatus !== 'bypassed' ? '#10b981' : '#64748b', 
          width: 14, 
          height: 14 
        },
      });

      if (stmt.falseBranch.length > 0) {
        edges.push({
          id: `e-${rightLastId}-${mergeId}`,
          source: rightLastId,
          sourceHandle: rightLastHandle,
          target: mergeId,
          targetHandle: 't-right',
          type: 'trunkEdge',
          style: condEval === false && branchStatus !== 'bypassed'
            ? { stroke: '#f43f5e', strokeWidth: 2.5, filter: 'drop-shadow(0 0 4px rgba(244,63,94,0.5))' }
            : { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 },
          animated: condEval === false && branchStatus !== 'bypassed',
          markerEnd: { 
            type: MarkerType.ArrowClosed, 
            color: condEval === false && branchStatus !== 'bypassed' ? '#f43f5e' : '#64748b', 
            width: 14, 
            height: 14 
          },
        });
      } else {
        const isElseHovered = Boolean(stmt.elseStepKey && hoveredStepKey === stmt.elseStepKey);
        const isBypassActive = condEval === false && branchStatus !== 'bypassed';
        const isBypassDimmed = condEval === true || branchStatus === 'bypassed';
        edges.push({
          id: `e-${diamondId}-${mergeId}`,
          source: diamondId,
          sourceHandle: 'no',
          target: mergeId,
          targetHandle: 't-right',
          label: isElseHovered
            ? '⚡ Selain itu (LEWATI)'
            : isBypassActive
              ? '✓ Tidak (FALSE)'
              : isBypassDimmed
                ? '✗ Tidak (LEWATI)'
                : 'Tidak',
          labelStyle: isElseHovered
            ? { fill: '#ffffff', fontWeight: 900, fontSize: 11 }
            : isBypassActive 
              ? { fill: '#ffffff', fontWeight: 900, fontSize: 11 }
              : isBypassDimmed
                ? { fill: '#94a3b8', fontWeight: 700, fontSize: 10 }
                : { fill: '#fb7185', fontWeight: 900, fontSize: 12 },
          labelBgStyle: isElseHovered
            ? { fill: '#b45309', fillOpacity: 1, rx: 6, ry: 6 }
            : isBypassActive
              ? { fill: '#e11d48', fillOpacity: 1, rx: 6, ry: 6 }
              : isBypassDimmed
                ? { fill: '#1e293b', fillOpacity: 0.8, rx: 4, ry: 4 }
                : { fill: '#4c0519', fillOpacity: 0.95, rx: 4, ry: 4 },
          labelBgPadding: [6, 3],
          type: 'trunkEdge',
          style: isElseHovered
            ? { stroke: '#fbbf24', strokeWidth: 4, filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.95))' }
            : isBypassActive
              ? { stroke: '#f43f5e', strokeWidth: 3.5, filter: 'drop-shadow(0 0 6px rgba(244,63,94,0.8))' }
              : isBypassDimmed
                ? { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 }
                : { stroke: '#f43f5e', strokeWidth: 2.5 },
          animated: isElseHovered || isBypassActive,
          markerEnd: { 
            type: MarkerType.ArrowClosed, 
            color: isElseHovered ? '#fbbf24' : isBypassActive ? '#f43f5e' : isBypassDimmed ? '#64748b' : '#f43f5e', 
            width: isElseHovered || isBypassActive ? 16 : 14, 
            height: isElseHovered || isBypassActive ? 16 : 14 
          },
        });
      }

      currentPrev = mergeId;
      currentPrevHandle = 'b-out';
    } else if (stmt.kind === 'multi_branch') {
      // ── Cascading Selection (Percabangan Majemuk / Multi-Branch) ────────────
      let activeBranchIdx: number | null = null;
      let isElseActive = false;

      if (branchStatus !== 'bypassed') {
        for (let k = 0; k < stmt.branches.length; k++) {
          if (evaluateCondition(stmt.branches[k].cond, variables) === true) {
            activeBranchIdx = k;
            break;
          }
        }
        if (activeBranchIdx === null && stmt.elseBranch) {
          isElseActive = true;
        }
      }

      const branchEnds: { id: string; handle?: string; status: 'active' | 'bypassed' | 'neutral' }[] = [];
      let prevDiamondId = currentPrev;
      let prevDiamondHandle = currentPrevHandle;
      let maxY = yRef.y;

      for (let k = 0; k < stmt.branches.length; k++) {
        const branch = stmt.branches[k];
        const diamondId = `diamond-${counter.n++}`;
        const isHovered = Boolean(hoveredStepKey && hoveredStepKey === branch.stepKey);

        const isBranchActive = branchStatus !== 'bypassed' && activeBranchIdx === k;
        const isBranchPast = branchStatus === 'bypassed' || (activeBranchIdx !== null && k > activeBranchIdx);
        const isBranchEvaluatedFalse = branchStatus !== 'bypassed' && activeBranchIdx !== null ? k < activeBranchIdx : (branchStatus !== 'bypassed');

        let diamondCondResult: boolean | null = null;
        if (isBranchPast) {
          diamondCondResult = null;
        } else if (isBranchActive) {
          diamondCondResult = true;
        } else if (isBranchEvaluatedFalse) {
          diamondCondResult = false;
        }

        const diamondBranchStatus: 'active' | 'bypassed' | 'neutral' = isBranchPast ? 'bypassed' : 'neutral';

        nodes.push({
          id: diamondId,
          position: { x: centerX, y: yRef.y },
          origin: [0.5, 0],
          type: 'diamondNode',
          data: {
            label: branch.cond,
            stepKey: branch.stepKey,
            isHovered,
            onHover: onHoverStepKey,
            condResult: diamondCondResult,
            branchStatus: diamondBranchStatus,
          },
        });

        // Edge dari node sebelumnya (atau dari 'bottom' diamond sebelumnya)
        if (k === 0) {
          edges.push({
            id: `e-${prevDiamondId}-${diamondId}`,
            source: prevDiamondId,
            sourceHandle: prevDiamondHandle,
            target: diamondId,
            targetHandle: 'top',
            type: 'smoothstep',
            style: branchStatus === 'bypassed'
              ? { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 }
              : { stroke: '#94a3b8', strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: branchStatus === 'bypassed' ? '#64748b' : '#94a3b8', width: 14, height: 14 },
          });
        } else {
          const isPrevFalseActive = activeBranchIdx === null ? true : (k - 1) < activeBranchIdx;
          const isPrevPassed = activeBranchIdx !== null && (k - 1) >= activeBranchIdx;
          edges.push({
            id: `e-${prevDiamondId}-${diamondId}`,
            source: prevDiamondId,
            sourceHandle: prevDiamondHandle,
            target: diamondId,
            targetHandle: 'top',
            label: isPrevFalseActive && branchStatus !== 'bypassed' ? '✓ Tidak (FALSE)' : '✗ Tidak (DILEWATI)',
            labelStyle: isPrevFalseActive && branchStatus !== 'bypassed'
              ? { fill: '#ffffff', fontWeight: 900, fontSize: 11 }
              : { fill: '#94a3b8', fontWeight: 700, fontSize: 10 },
            labelBgStyle: isPrevFalseActive && branchStatus !== 'bypassed'
              ? { fill: '#e11d48', fillOpacity: 1, rx: 6, ry: 6 }
              : { fill: '#1e293b', fillOpacity: 0.8, rx: 4, ry: 4 },
            labelBgPadding: [6, 3],
            type: 'smoothstep',
            style: isPrevFalseActive && branchStatus !== 'bypassed'
              ? { stroke: '#f43f5e', strokeWidth: 3.5, filter: 'drop-shadow(0 0 6px rgba(244,63,94,0.8))' }
              : { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 },
            animated: isPrevFalseActive && branchStatus !== 'bypassed',
            markerEnd: { 
              type: MarkerType.ArrowClosed, 
              color: isPrevFalseActive && branchStatus !== 'bypassed' ? '#f43f5e' : '#64748b', 
              width: 14, 
              height: 14 
            },
          });
        }

        // True branch body (di sisi KANAN)
        const branchStartY = yRef.y;
        const rightBranchX = centerX + 270;
        const rightYRef = { y: branchStartY };
        const currentBranchStatus: 'active' | 'bypassed' | 'neutral' = isBranchActive ? 'active' : 'bypassed';

        if (branch.body.length > 0) {
          const res = buildGraph(
            branch.body,
            nodes,
            edges,
            diamondId,
            'yes',
            rightBranchX,
            rightYRef,
            counter,
            variables,
            hoveredStepKey,
            onHoverStepKey,
            currentBranchStatus
          );

          const firstEdge = edges.find(e => e.source === diamondId && e.sourceHandle === 'yes');
          if (firstEdge) {
            if (isBranchActive) {
              firstEdge.label = '✓ Ya (TRUE)';
              firstEdge.labelStyle = { fill: '#ffffff', fontWeight: 900, fontSize: 11 };
              firstEdge.labelBgStyle = { fill: '#059669', fillOpacity: 1, rx: 6, ry: 6 };
              firstEdge.labelBgPadding = [8, 4];
              firstEdge.style = { stroke: '#10b981', strokeWidth: 3.5, filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.8))' };
              firstEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#10b981', width: 16, height: 16 };
              firstEdge.animated = true;
            } else {
              firstEdge.label = 'Ya';
              firstEdge.labelStyle = { fill: '#94a3b8', fontWeight: 700, fontSize: 10 };
              firstEdge.labelBgStyle = { fill: '#1e293b', fillOpacity: 0.8, rx: 4, ry: 4 };
              firstEdge.labelBgPadding = [6, 3];
              firstEdge.style = { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 };
              firstEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#64748b', width: 12, height: 12 };
              firstEdge.animated = false;
            }
          }

          branchEnds.push({ id: res.lastId, handle: 'right', status: currentBranchStatus });
          maxY = Math.max(maxY, rightYRef.y);
        } else {
          branchEnds.push({ id: diamondId, handle: 'yes', status: currentBranchStatus });
        }

        prevDiamondId = diamondId;
        prevDiamondHandle = 'bottom';

        const bodyH = rightYRef.y - branchStartY;
        yRef.y += Math.max(90 + 45, bodyH + 20);
      }

      // Cabang Else (Default) di akhir rantai seleksi (di sumbu tengah / center spine)
      let elseEndId: string | null = null;
      let elseEndHandle: string | undefined = undefined;
      let elseEndStatus: 'active' | 'bypassed' | 'neutral' = 'neutral';

      if (stmt.elseBranch && stmt.elseBranch.body.length > 0) {
        const elseStatus: 'active' | 'bypassed' | 'neutral' = isElseActive ? 'active' : 'bypassed';
        const elseBranchX = centerX;
        const elseYRef = { y: yRef.y + 10 };
        const isElseHovered = Boolean(stmt.elseBranch.stepKey && hoveredStepKey === stmt.elseBranch.stepKey);

        const res = buildGraph(
          stmt.elseBranch.body,
          nodes,
          edges,
          prevDiamondId,
          'bottom',
          elseBranchX,
          elseYRef,
          counter,
          variables,
          hoveredStepKey,
          onHoverStepKey,
          elseStatus
        );

        const elseEdge = edges.find(e => e.source === prevDiamondId && e.sourceHandle === 'bottom');
        if (elseEdge) {
          if (isElseHovered) {
            elseEdge.label = '⚡ Selain itu (ELSE)';
            elseEdge.labelStyle = { fill: '#ffffff', fontWeight: 900, fontSize: 11 };
            elseEdge.labelBgStyle = { fill: '#b45309', fillOpacity: 1, rx: 6, ry: 6 };
            elseEdge.labelBgPadding = [8, 4];
            elseEdge.style = { stroke: '#fbbf24', strokeWidth: 4, filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.95))' };
            elseEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#fbbf24', width: 16, height: 16 };
            elseEdge.animated = true;
          } else if (isElseActive) {
            elseEdge.label = '✓ Selain itu (ELSE)';
            elseEdge.labelStyle = { fill: '#ffffff', fontWeight: 900, fontSize: 11 };
            elseEdge.labelBgStyle = { fill: '#059669', fillOpacity: 1, rx: 6, ry: 6 };
            elseEdge.labelBgPadding = [8, 4];
            elseEdge.style = { stroke: '#10b981', strokeWidth: 3.5, filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.8))' };
            elseEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#10b981', width: 16, height: 16 };
            elseEdge.animated = true;
          } else {
            elseEdge.label = '✗ Selain itu (DILEWATI)';
            elseEdge.labelStyle = { fill: '#94a3b8', fontWeight: 700, fontSize: 10 };
            elseEdge.labelBgStyle = { fill: '#1e293b', fillOpacity: 0.8, rx: 4, ry: 4 };
            elseEdge.labelBgPadding = [6, 3];
            elseEdge.style = { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 };
            elseEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#64748b', width: 12, height: 12 };
            elseEdge.animated = false;
          }
        }

        elseEndId = res.lastId;
        elseEndHandle = res.lastHandle;
        elseEndStatus = elseStatus;
        maxY = Math.max(maxY, elseYRef.y);
        yRef.y = Math.max(yRef.y, elseYRef.y);
      } else {
        // Jika tidak ada else, hubungkan 'bottom' dari diamond terakhir langsung ke mergeNode
        const isBypassActive = activeBranchIdx === null && branchStatus !== 'bypassed';
        elseEndId = prevDiamondId;
        elseEndHandle = 'bottom';
        elseEndStatus = isBypassActive ? 'active' : 'bypassed';
      }

      // Merge Node (Titik Temu Seluruh Cabang Majemuk)
      const mergeId = `merge-${counter.n++}`;
      nodes.push({
        id: mergeId,
        position: { x: centerX, y: maxY + 40 },
        origin: [0.5, 0.5],
        type: 'mergeNode',
        data: {},
      });

      // 1. Seluruh cabang TRUE dari lajur kanan masuk ke GARIS BUS KOLEKTOR KANAN (CollectorEdge) ke port kanan MergeNode
      for (const end of branchEnds) {
        edges.push({
          id: `e-${end.id}-${mergeId}`,
          source: end.id,
          sourceHandle: end.handle || 'right',
          target: mergeId,
          targetHandle: 't-right',
          type: 'collectorEdge',
          style: end.status === 'active'
            ? { stroke: '#10b981', strokeWidth: 2.5, filter: 'drop-shadow(0 0 4px rgba(16,185,129,0.5))' }
            : { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 },
          animated: end.status === 'active',
          markerEnd: { 
            type: MarkerType.ArrowClosed, 
            color: end.status === 'active' ? '#10b981' : '#64748b', 
            width: 14, 
            height: 14 
          },
        });
      }

      // 2. Jalur ELSE / Default lurus dari sumbu tengah ke port atas MergeNode
      if (elseEndId) {
        edges.push({
          id: `e-${elseEndId}-${mergeId}`,
          source: elseEndId,
          sourceHandle: elseEndHandle,
          target: mergeId,
          targetHandle: 't-top',
          type: 'smoothstep',
          style: elseEndStatus === 'active'
            ? { stroke: '#10b981', strokeWidth: 2.5, filter: 'drop-shadow(0 0 4px rgba(16,185,129,0.5))' }
            : { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 },
          animated: elseEndStatus === 'active',
          markerEnd: { 
            type: MarkerType.ArrowClosed, 
            color: elseEndStatus === 'active' ? '#10b981' : '#64748b', 
            width: 14, 
            height: 14 
          },
        });
      }

      currentPrev = mergeId;
      currentPrevHandle = 'b-out';
      yRef.y = maxY + 85;
    }
  }

  return { lastId: currentPrev, lastHandle: currentPrevHandle };
}

// ── Horizontal Graph Builder (Alur Kiri ke Kanan Standar ANSI) ─────────────────
function buildHorizontalGraph(
  stmts: Stmt[],
  nodes: Node[],
  edges: Edge[],
  prevId: string,
  prevHandle: string | undefined,
  centerY: number,
  xRef: { x: number },
  counter: { n: number },
  variables: Record<string, any>,
  hoveredStepKey?: string | null,
  onHoverStepKey?: (key: string | null) => void,
  branchStatus: 'neutral' | 'active' | 'bypassed' = 'neutral'
): { lastId: string; lastHandle: string | undefined } {
  let currentPrev = prevId;
  let currentPrevHandle = prevHandle;

  for (const stmt of stmts) {
    if (stmt.kind === 'assign' || stmt.kind === 'io') {
      const nodeId = `${stmt.id}-${counter.n++}`;
      const isHovered = Boolean(hoveredStepKey && hoveredStepKey === stmt.stepKey);

      nodes.push({
        id: nodeId,
        position: { x: xRef.x, y: centerY },
        origin: [0.5, 0.5],
        type: stmt.kind === 'io' ? 'ioNode' : 'processNode',
        data: {
          label: stmt.label,
          stepKey: stmt.stepKey,
          isHovered,
          onHover: onHoverStepKey,
          branchStatus,
        },
      });

      const targetHandle = currentPrevHandle === 'yes-top' ? 't-bottom' : 'left';
      edges.push({
        id: `e-${currentPrev}-${nodeId}`,
        source: currentPrev,
        sourceHandle: currentPrevHandle,
        target: nodeId,
        targetHandle,
        type: 'smoothstep',
        style: branchStatus === 'bypassed'
          ? { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.4 }
          : branchStatus === 'active'
            ? { stroke: '#10b981', strokeWidth: 2.5, filter: 'drop-shadow(0 0 4px rgba(16,185,129,0.5))' }
            : { stroke: '#94a3b8', strokeWidth: 2 },
        animated: branchStatus === 'active',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: branchStatus === 'bypassed' ? '#64748b' : branchStatus === 'active' ? '#10b981' : '#94a3b8',
          width: 14,
          height: 14,
        },
      });

      currentPrev = nodeId;
      currentPrevHandle = 'right';
      xRef.x += 240;
    } else if (stmt.kind === 'if') {
      const diamondId = `diamond-${counter.n++}`;
      const isHovered = Boolean(hoveredStepKey && hoveredStepKey === stmt.stepKey);
      const condEval = branchStatus === 'bypassed' ? null : evaluateCondition(stmt.cond, variables);

      nodes.push({
        id: diamondId,
        position: { x: xRef.x, y: centerY },
        origin: [0.5, 0.5],
        type: 'diamondNode',
        data: {
          label: stmt.cond,
          stepKey: stmt.stepKey,
          isHovered,
          onHover: onHoverStepKey,
          condResult: condEval,
          branchStatus,
        },
      });

      edges.push({
        id: `e-${currentPrev}-${diamondId}`,
        source: currentPrev,
        sourceHandle: currentPrevHandle,
        target: diamondId,
        targetHandle: 't-left',
        type: 'smoothstep',
        style: branchStatus === 'bypassed'
          ? { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 }
          : { stroke: '#94a3b8', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: branchStatus === 'bypassed' ? '#64748b' : '#94a3b8',
          width: 14,
          height: 14,
        },
      });

      const isTrueActive = branchStatus === 'bypassed' ? false : condEval === true;
      const isTrueBypassed = branchStatus === 'bypassed' ? true : condEval === false;
      const trueBranchStatus: 'active' | 'bypassed' | 'neutral' =
        isTrueActive ? 'active' : isTrueBypassed ? 'bypassed' : 'neutral';

      const actionY = centerY - 140;
      const topXRef = { x: xRef.x };
      let leftLastId = diamondId;
      let leftLastHandle: string | undefined = 'yes-top';

      if (stmt.trueBranch.length > 0) {
        const res = buildHorizontalGraph(
          stmt.trueBranch,
          nodes,
          edges,
          diamondId,
          'yes-top',
          actionY,
          topXRef,
          counter,
          variables,
          hoveredStepKey,
          onHoverStepKey,
          trueBranchStatus
        );
        leftLastId = res.lastId;
        leftLastHandle = res.lastHandle;

        const firstEdge = edges.find(e => e.source === diamondId && e.sourceHandle === 'yes-top');
        if (firstEdge) {
          if (condEval === true && branchStatus !== 'bypassed') {
            firstEdge.label = '✓ Ya (TRUE)';
            firstEdge.labelStyle = { fill: '#ffffff', fontWeight: 900, fontSize: 11 };
            firstEdge.labelBgStyle = { fill: '#059669', fillOpacity: 1, rx: 6, ry: 6 };
            firstEdge.labelBgPadding = [8, 4];
            firstEdge.style = { stroke: '#10b981', strokeWidth: 3.5, filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.8))' };
            firstEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#10b981', width: 16, height: 16 };
            firstEdge.animated = true;
          } else if (condEval === false || branchStatus === 'bypassed') {
            firstEdge.label = '✗ Ya (DILEWATI)';
            firstEdge.labelStyle = { fill: '#94a3b8', fontWeight: 700, fontSize: 10 };
            firstEdge.labelBgStyle = { fill: '#1e293b', fillOpacity: 0.8, rx: 4, ry: 4 };
            firstEdge.labelBgPadding = [6, 3];
            firstEdge.style = { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 };
            firstEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#64748b', width: 12, height: 12 };
            firstEdge.animated = false;
          } else {
            firstEdge.label = 'Ya';
            firstEdge.labelStyle = { fill: '#34d399', fontWeight: 900, fontSize: 12 };
            firstEdge.labelBgStyle = { fill: '#064e3b', fillOpacity: 0.95, rx: 4, ry: 4 };
            firstEdge.labelBgPadding = [6, 3];
            firstEdge.style = { stroke: '#10b981', strokeWidth: 2.5 };
            firstEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#10b981', width: 14, height: 14 };
            firstEdge.animated = false;
          }
        }
      }

      let rightLastId = diamondId;
      let rightLastHandle: string | undefined = 'no-right';
      const elseXRef = { x: xRef.x + 280 };

      if (stmt.falseBranch.length > 0) {
        const isFalseActive = branchStatus === 'bypassed' ? false : condEval === false;
        const isFalseBypassed = branchStatus === 'bypassed' ? true : condEval === true;
        const falseBranchStatus: 'active' | 'bypassed' | 'neutral' =
          isFalseActive ? 'active' : isFalseBypassed ? 'bypassed' : 'neutral';

        const res = buildHorizontalGraph(
          stmt.falseBranch,
          nodes,
          edges,
          diamondId,
          'no-right',
          centerY,
          elseXRef,
          counter,
          variables,
          hoveredStepKey,
          onHoverStepKey,
          falseBranchStatus
        );
        rightLastId = res.lastId;
        rightLastHandle = res.lastHandle;

        const firstEdge = edges.find(e => e.source === diamondId && e.sourceHandle === 'no-right');
        if (firstEdge) {
          const isElseHovered = Boolean(stmt.elseStepKey && hoveredStepKey === stmt.elseStepKey);
          if (isElseHovered) {
            firstEdge.label = '⚡ Selain itu (ELSE)';
            firstEdge.labelStyle = { fill: '#ffffff', fontWeight: 900, fontSize: 11 };
            firstEdge.labelBgStyle = { fill: '#b45309', fillOpacity: 1, rx: 6, ry: 6 };
            firstEdge.labelBgPadding = [8, 4];
            firstEdge.style = { stroke: '#fbbf24', strokeWidth: 4, filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.95))' };
            firstEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#fbbf24', width: 16, height: 16 };
            firstEdge.animated = true;
          } else if (condEval === false && branchStatus !== 'bypassed') {
            firstEdge.label = '✓ Tidak (FALSE)';
            firstEdge.labelStyle = { fill: '#ffffff', fontWeight: 900, fontSize: 11 };
            firstEdge.labelBgStyle = { fill: '#e11d48', fillOpacity: 1, rx: 6, ry: 6 };
            firstEdge.labelBgPadding = [8, 4];
            firstEdge.style = { stroke: '#f43f5e', strokeWidth: 3.5, filter: 'drop-shadow(0 0 6px rgba(244,63,94,0.8))' };
            firstEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#f43f5e', width: 16, height: 16 };
            firstEdge.animated = true;
          } else if (condEval === true || branchStatus === 'bypassed') {
            firstEdge.label = '✗ Tidak (DILEWATI)';
            firstEdge.labelStyle = { fill: '#94a3b8', fontWeight: 700, fontSize: 10 };
            firstEdge.labelBgStyle = { fill: '#1e293b', fillOpacity: 0.8, rx: 4, ry: 4 };
            firstEdge.labelBgPadding = [6, 3];
            firstEdge.style = { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 };
            firstEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#64748b', width: 12, height: 12 };
            firstEdge.animated = false;
          } else {
            firstEdge.label = 'Tidak';
            firstEdge.labelStyle = { fill: '#fb7185', fontWeight: 900, fontSize: 12 };
            firstEdge.labelBgStyle = { fill: '#4c0519', fillOpacity: 0.95, rx: 4, ry: 4 };
            firstEdge.labelBgPadding = [6, 3];
            firstEdge.style = { stroke: '#f43f5e', strokeWidth: 2.5 };
            firstEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#f43f5e', width: 14, height: 14 };
            firstEdge.animated = false;
          }
        }
      }

      const maxX = Math.max(topXRef.x, stmt.falseBranch.length > 0 ? elseXRef.x : xRef.x + 280) + 30;
      const mergeId = `merge-${counter.n++}`;
      nodes.push({
        id: mergeId,
        position: { x: maxX, y: centerY },
        origin: [0.5, 0.5],
        type: 'mergeNode',
        data: {},
      });

      // True branch -> collectorHorizontalEdge into mergeNode t-top
      edges.push({
        id: `e-${leftLastId}-${mergeId}`,
        source: leftLastId,
        sourceHandle: leftLastHandle === 'right' ? 's-top' : leftLastHandle || 's-top',
        target: mergeId,
        targetHandle: 't-top',
        type: 'collectorHorizontalEdge',
        style: condEval === true && branchStatus !== 'bypassed'
          ? { stroke: '#10b981', strokeWidth: 2.5, filter: 'drop-shadow(0 0 4px rgba(16,185,129,0.5))' }
          : { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 },
        animated: condEval === true && branchStatus !== 'bypassed',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: condEval === true && branchStatus !== 'bypassed' ? '#10b981' : '#64748b',
          width: 14,
          height: 14,
        },
      });

      if (stmt.falseBranch.length > 0) {
        edges.push({
          id: `e-${rightLastId}-${mergeId}`,
          source: rightLastId,
          sourceHandle: rightLastHandle || 'right',
          target: mergeId,
          targetHandle: 't-left',
          type: 'smoothstep',
          style: condEval === false && branchStatus !== 'bypassed'
            ? { stroke: '#f43f5e', strokeWidth: 2.5, filter: 'drop-shadow(0 0 4px rgba(244,63,94,0.5))' }
            : { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 },
          animated: condEval === false && branchStatus !== 'bypassed',
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: condEval === false && branchStatus !== 'bypassed' ? '#f43f5e' : '#64748b',
            width: 14,
            height: 14,
          },
        });
      } else {
        const isElseHovered = Boolean(stmt.elseStepKey && hoveredStepKey === stmt.elseStepKey);
        const isBypassActive = condEval === false && branchStatus !== 'bypassed';
        const isBypassDimmed = condEval === true || branchStatus === 'bypassed';
        edges.push({
          id: `e-${diamondId}-${mergeId}`,
          source: diamondId,
          sourceHandle: 'no-right',
          target: mergeId,
          targetHandle: 't-left',
          label: isElseHovered
            ? '⚡ Selain itu (LEWATI)'
            : isBypassActive
              ? '✓ Tidak (FALSE)'
              : isBypassDimmed
                ? '✗ Tidak (LEWATI)'
                : 'Tidak',
          labelStyle: isElseHovered
            ? { fill: '#ffffff', fontWeight: 900, fontSize: 11 }
            : isBypassActive
              ? { fill: '#ffffff', fontWeight: 900, fontSize: 11 }
              : isBypassDimmed
                ? { fill: '#94a3b8', fontWeight: 700, fontSize: 10 }
                : { fill: '#fb7185', fontWeight: 900, fontSize: 12 },
          labelBgStyle: isElseHovered
            ? { fill: '#b45309', fillOpacity: 1, rx: 6, ry: 6 }
            : isBypassActive
              ? { fill: '#e11d48', fillOpacity: 1, rx: 6, ry: 6 }
              : isBypassDimmed
                ? { fill: '#1e293b', fillOpacity: 0.8, rx: 4, ry: 4 }
                : { fill: '#4c0519', fillOpacity: 0.95, rx: 4, ry: 4 },
          labelBgPadding: [6, 3],
          type: 'smoothstep',
          style: isElseHovered
            ? { stroke: '#fbbf24', strokeWidth: 4, filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.95))' }
            : isBypassActive
              ? { stroke: '#f43f5e', strokeWidth: 3.5, filter: 'drop-shadow(0 0 6px rgba(244,63,94,0.8))' }
              : isBypassDimmed
                ? { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 }
                : { stroke: '#f43f5e', strokeWidth: 2.5 },
          animated: isElseHovered || isBypassActive,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isElseHovered ? '#fbbf24' : isBypassActive ? '#f43f5e' : isBypassDimmed ? '#64748b' : '#f43f5e',
            width: isElseHovered || isBypassActive ? 16 : 14,
            height: isElseHovered || isBypassActive ? 16 : 14,
          },
        });
      }

      currentPrev = mergeId;
      currentPrevHandle = 'r-out';
      xRef.x = maxX + 80;
    } else if (stmt.kind === 'multi_branch') {
      let activeBranchIdx: number | null = null;
      let isElseActive = false;

      if (branchStatus !== 'bypassed') {
        for (let k = 0; k < stmt.branches.length; k++) {
          if (evaluateCondition(stmt.branches[k].cond, variables) === true) {
            activeBranchIdx = k;
            break;
          }
        }
        if (activeBranchIdx === null && stmt.elseBranch) {
          isElseActive = true;
        }
      }

      const branchEnds: { id: string; handle?: string; status: 'active' | 'bypassed' | 'neutral' }[] = [];
      let prevDiamondId = currentPrev;
      let prevDiamondHandle = currentPrevHandle;
      let maxX = xRef.x;

      for (let k = 0; k < stmt.branches.length; k++) {
        const branch = stmt.branches[k];
        const diamondId = `diamond-${counter.n++}`;
        const isHovered = Boolean(hoveredStepKey && hoveredStepKey === branch.stepKey);

        const isBranchActive = branchStatus !== 'bypassed' && activeBranchIdx === k;
        const isBranchPast = branchStatus === 'bypassed' || (activeBranchIdx !== null && k > activeBranchIdx);
        const isBranchEvaluatedFalse = branchStatus !== 'bypassed' && activeBranchIdx !== null ? k < activeBranchIdx : (branchStatus !== 'bypassed');

        let diamondCondResult: boolean | null = null;
        if (isBranchPast) {
          diamondCondResult = null;
        } else if (isBranchActive) {
          diamondCondResult = true;
        } else if (isBranchEvaluatedFalse) {
          diamondCondResult = false;
        }

        const diamondBranchStatus: 'active' | 'bypassed' | 'neutral' = isBranchPast ? 'bypassed' : 'neutral';

        nodes.push({
          id: diamondId,
          position: { x: xRef.x, y: centerY },
          origin: [0.5, 0.5],
          type: 'diamondNode',
          data: {
            label: branch.cond,
            stepKey: branch.stepKey,
            isHovered,
            onHover: onHoverStepKey,
            condResult: diamondCondResult,
            branchStatus: diamondBranchStatus,
          },
        });

        if (k === 0) {
          edges.push({
            id: `e-${prevDiamondId}-${diamondId}`,
            source: prevDiamondId,
            sourceHandle: prevDiamondHandle,
            target: diamondId,
            targetHandle: 't-left',
            type: 'smoothstep',
            style: branchStatus === 'bypassed'
              ? { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 }
              : { stroke: '#94a3b8', strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: branchStatus === 'bypassed' ? '#64748b' : '#94a3b8', width: 14, height: 14 },
          });
        } else {
          const isPrevFalseActive = activeBranchIdx === null ? true : (k - 1) < activeBranchIdx;
          edges.push({
            id: `e-${prevDiamondId}-${diamondId}`,
            source: prevDiamondId,
            sourceHandle: prevDiamondHandle,
            target: diamondId,
            targetHandle: 't-left',
            label: isPrevFalseActive && branchStatus !== 'bypassed' ? '✓ Tidak (FALSE)' : '✗ Tidak (DILEWATI)',
            labelStyle: isPrevFalseActive && branchStatus !== 'bypassed'
              ? { fill: '#ffffff', fontWeight: 900, fontSize: 11 }
              : { fill: '#94a3b8', fontWeight: 700, fontSize: 10 },
            labelBgStyle: isPrevFalseActive && branchStatus !== 'bypassed'
              ? { fill: '#e11d48', fillOpacity: 1, rx: 6, ry: 6 }
              : { fill: '#1e293b', fillOpacity: 0.8, rx: 4, ry: 4 },
            labelBgPadding: [6, 3],
            type: 'smoothstep',
            style: isPrevFalseActive && branchStatus !== 'bypassed'
              ? { stroke: '#f43f5e', strokeWidth: 3.5, filter: 'drop-shadow(0 0 6px rgba(244,63,94,0.8))' }
              : { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 },
            animated: isPrevFalseActive && branchStatus !== 'bypassed',
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: isPrevFalseActive && branchStatus !== 'bypassed' ? '#f43f5e' : '#64748b',
              width: 14,
              height: 14,
            },
          });
        }

        // True branch body (di sisi ATAS pada centerY - 140)
        const actionY = centerY - 140;
        const branchXRef = { x: xRef.x };
        const currentBranchStatus: 'active' | 'bypassed' | 'neutral' = isBranchActive ? 'active' : 'bypassed';

        if (branch.body.length > 0) {
          const res = buildHorizontalGraph(
            branch.body,
            nodes,
            edges,
            diamondId,
            'yes-top',
            actionY,
            branchXRef,
            counter,
            variables,
            hoveredStepKey,
            onHoverStepKey,
            currentBranchStatus
          );

          const firstEdge = edges.find(e => e.source === diamondId && e.sourceHandle === 'yes-top');
          if (firstEdge) {
            if (isBranchActive) {
              firstEdge.label = '✓ Ya (TRUE)';
              firstEdge.labelStyle = { fill: '#ffffff', fontWeight: 900, fontSize: 11 };
              firstEdge.labelBgStyle = { fill: '#059669', fillOpacity: 1, rx: 6, ry: 6 };
              firstEdge.labelBgPadding = [8, 4];
              firstEdge.style = { stroke: '#10b981', strokeWidth: 3.5, filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.8))' };
              firstEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#10b981', width: 16, height: 16 };
              firstEdge.animated = true;
            } else {
              firstEdge.label = 'Ya';
              firstEdge.labelStyle = { fill: '#94a3b8', fontWeight: 700, fontSize: 10 };
              firstEdge.labelBgStyle = { fill: '#1e293b', fillOpacity: 0.8, rx: 4, ry: 4 };
              firstEdge.labelBgPadding = [6, 3];
              firstEdge.style = { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 };
              firstEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#64748b', width: 12, height: 12 };
              firstEdge.animated = false;
            }
          }

          branchEnds.push({ id: res.lastId, handle: 's-top', status: currentBranchStatus });
          maxX = Math.max(maxX, branchXRef.x);
        } else {
          branchEnds.push({ id: diamondId, handle: 'yes-top', status: currentBranchStatus });
        }

        prevDiamondId = diamondId;
        prevDiamondHandle = 'no-right';

        xRef.x += 320;
      }

      // Else branch di sumbu tengah (centerY)
      let elseEndId: string | null = null;
      let elseEndHandle: string | undefined = undefined;
      let elseEndStatus: 'active' | 'bypassed' | 'neutral' = 'neutral';

      if (stmt.elseBranch && stmt.elseBranch.body.length > 0) {
        const elseStatus: 'active' | 'bypassed' | 'neutral' = isElseActive ? 'active' : 'bypassed';
        const elseXRef = { x: xRef.x };
        const isElseHovered = Boolean(stmt.elseBranch.stepKey && hoveredStepKey === stmt.elseBranch.stepKey);

        const res = buildHorizontalGraph(
          stmt.elseBranch.body,
          nodes,
          edges,
          prevDiamondId,
          'no-right',
          centerY,
          elseXRef,
          counter,
          variables,
          hoveredStepKey,
          onHoverStepKey,
          elseStatus
        );

        const elseEdge = edges.find(e => e.source === prevDiamondId && e.sourceHandle === 'no-right');
        if (elseEdge) {
          if (isElseHovered) {
            elseEdge.label = '⚡ Selain itu (ELSE)';
            elseEdge.labelStyle = { fill: '#ffffff', fontWeight: 900, fontSize: 11 };
            elseEdge.labelBgStyle = { fill: '#b45309', fillOpacity: 1, rx: 6, ry: 6 };
            elseEdge.labelBgPadding = [8, 4];
            elseEdge.style = { stroke: '#fbbf24', strokeWidth: 4, filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.95))' };
            elseEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#fbbf24', width: 16, height: 16 };
            elseEdge.animated = true;
          } else if (isElseActive) {
            elseEdge.label = '✓ Selain itu (ELSE)';
            elseEdge.labelStyle = { fill: '#ffffff', fontWeight: 900, fontSize: 11 };
            elseEdge.labelBgStyle = { fill: '#059669', fillOpacity: 1, rx: 6, ry: 6 };
            elseEdge.labelBgPadding = [8, 4];
            elseEdge.style = { stroke: '#10b981', strokeWidth: 3.5, filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.8))' };
            elseEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#10b981', width: 16, height: 16 };
            elseEdge.animated = true;
          } else {
            elseEdge.label = '✗ Selain itu (DILEWATI)';
            elseEdge.labelStyle = { fill: '#94a3b8', fontWeight: 700, fontSize: 10 };
            elseEdge.labelBgStyle = { fill: '#1e293b', fillOpacity: 0.8, rx: 4, ry: 4 };
            elseEdge.labelBgPadding = [6, 3];
            elseEdge.style = { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 };
            elseEdge.markerEnd = { type: MarkerType.ArrowClosed, color: '#64748b', width: 12, height: 12 };
            elseEdge.animated = false;
          }
        }

        elseEndId = res.lastId;
        elseEndHandle = res.lastHandle || 'right';
        elseEndStatus = elseStatus;
        maxX = Math.max(maxX, elseXRef.x);
        xRef.x = elseXRef.x;
      } else {
        const isBypassActive = activeBranchIdx === null && branchStatus !== 'bypassed';
        elseEndId = prevDiamondId;
        elseEndHandle = 'no-right';
        elseEndStatus = isBypassActive ? 'active' : 'bypassed';
      }

      // Merge Node
      const mergeId = `merge-${counter.n++}`;
      const mergeX = Math.max(maxX, xRef.x) + 40;
      nodes.push({
        id: mergeId,
        position: { x: mergeX, y: centerY },
        origin: [0.5, 0.5],
        type: 'mergeNode',
        data: {},
      });

      // Collector edges for true branches -> t-top
      for (const end of branchEnds) {
        edges.push({
          id: `e-${end.id}-${mergeId}`,
          source: end.id,
          sourceHandle: end.handle || 's-top',
          target: mergeId,
          targetHandle: 't-top',
          type: 'collectorHorizontalEdge',
          style: end.status === 'active'
            ? { stroke: '#10b981', strokeWidth: 2.5, filter: 'drop-shadow(0 0 4px rgba(16,185,129,0.5))' }
            : { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 },
          animated: end.status === 'active',
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: end.status === 'active' ? '#10b981' : '#64748b',
            width: 14,
            height: 14,
          },
        });
      }

      // Else / Default edge -> t-left
      if (elseEndId) {
        edges.push({
          id: `e-${elseEndId}-${mergeId}`,
          source: elseEndId,
          sourceHandle: elseEndHandle,
          target: mergeId,
          targetHandle: 't-left',
          type: 'smoothstep',
          style: elseEndStatus === 'active'
            ? { stroke: '#10b981', strokeWidth: 2.5, filter: 'drop-shadow(0 0 4px rgba(16,185,129,0.5))' }
            : { stroke: '#64748b', strokeWidth: 1.5, strokeDasharray: '5,5', opacity: 0.35 },
          animated: elseEndStatus === 'active',
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: elseEndStatus === 'active' ? '#10b981' : '#64748b',
            width: 14,
            height: 14,
          },
        });
      }

      currentPrev = mergeId;
      currentPrevHandle = 'r-out';
      xRef.x = mergeX + 85;
    }
  }

  return { lastId: currentPrev, lastHandle: currentPrevHandle };
}

// ── Komponen Utama ────────────────────────────────────────────────────────────
export default function FlowchartVisualizer({
  code,
  variables = {},
  hoveredStepKey = null,
  onHoverStepKey,
  orientation = 'vertical',
}: {
  code: string;
  variables?: Record<string, any>;
  hoveredStepKey?: string | null;
  onHoverStepKey?: (key: string | null) => void;
  orientation?: 'vertical' | 'horizontal';
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    const indexedLines: IndexedLine[] = code.split('\n').map((text, lineIndex) => ({ text, lineIndex }));
    const stmts = parseCode(indexedLines);
    const activeVariables = extractVariablesFromCode(code, variables);

    if (orientation === 'horizontal') {
      const centerY = 240;
      const newNodes: Node[] = [];
      const newEdges: Edge[] = [];
      const xRef = { x: 50 };
      const counter = { n: 0 };

      const startNodeId = 'node-start';
      newNodes.push({
        id: startNodeId,
        position: { x: xRef.x, y: centerY },
        origin: [0.5, 0.5],
        type: 'terminatorNode',
        data: { label: 'MULAI', isStart: true },
      });
      xRef.x += 160;

      const { lastId, lastHandle } = buildHorizontalGraph(
        stmts,
        newNodes,
        newEdges,
        startNodeId,
        'right',
        centerY,
        xRef,
        counter,
        activeVariables,
        hoveredStepKey,
        onHoverStepKey
      );

      const endNodeId = 'node-end';
      newNodes.push({
        id: endNodeId,
        position: { x: xRef.x, y: centerY },
        origin: [0.5, 0.5],
        type: 'terminatorNode',
        data: { label: 'SELESAI', isStart: false },
      });

      newEdges.push({
        id: `e-${lastId}-${endNodeId}`,
        source: lastId,
        sourceHandle: lastHandle || 'r-out',
        target: endNodeId,
        targetHandle: 'left',
        type: 'smoothstep',
        style: { stroke: '#94a3b8', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8', width: 14, height: 14 },
      });

      setNodes(newNodes);
      setEdges(newEdges);
    } else {
      const centerX = 220;
      const newNodes: Node[] = [];
      const newEdges: Edge[] = [];
      const yRef = { y: 30 };
      const counter = { n: 0 };

      const startNodeId = 'node-start';
      newNodes.push({
        id: startNodeId,
        position: { x: centerX, y: yRef.y },
        origin: [0.5, 0],
        type: 'terminatorNode',
        data: { label: 'MULAI', isStart: true },
      });
      yRef.y += 38 + 45;

      const { lastId, lastHandle } = buildGraph(
        stmts,
        newNodes,
        newEdges,
        startNodeId,
        'bottom',
        centerX,
        yRef,
        counter,
        activeVariables,
        hoveredStepKey,
        onHoverStepKey
      );

      const endNodeId = 'node-end';
      newNodes.push({
        id: endNodeId,
        position: { x: centerX, y: yRef.y },
        origin: [0.5, 0],
        type: 'terminatorNode',
        data: { label: 'SELESAI', isStart: false },
      });

      newEdges.push({
        id: `e-${lastId}-${endNodeId}`,
        source: lastId,
        sourceHandle: lastHandle || 'bottom',
        target: endNodeId,
        targetHandle: 'top',
        type: 'smoothstep',
        style: { stroke: '#94a3b8', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8', width: 14, height: 14 },
      });

      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [code, variables, orientation, setNodes, setEdges]);

  // Efek reaktif untuk hover sinkronisasi antar panel (Naratif, Flowchart, Pseudocode, Kode)
  useEffect(() => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (!node.data || typeof (node.data as any).stepKey === 'undefined') return node;
        const isHovered = Boolean(hoveredStepKey && (node.data as any).stepKey === hoveredStepKey);
        if ((node.data as any).isHovered === isHovered) return node;
        return {
          ...node,
          data: {
            ...node.data,
            isHovered,
          },
        };
      })
    );
  }, [hoveredStepKey, setNodes]);

  return (
    <div className="w-full h-full relative select-none overflow-hidden" style={{ minHeight: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.25, maxZoom: 1.1 }}
        minZoom={0.2}
        maxZoom={1.8}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={24} size={1.5} color="#334155" />
        <Controls 
          className="!bg-slate-900/90 !border !border-slate-700 !fill-slate-300 !text-slate-300 !rounded-xl !overflow-hidden !shadow-2xl !m-3"
          showInteractive={false}
        />
      </ReactFlow>

      {/* Style override untuk Controls button ReactFlow agar tampil kontras di dark mode */}
      <style jsx global>{`
        .react-flow__controls-button {
          background-color: #0f172a !important;
          border-bottom: 1px solid #334155 !important;
          fill: #cbd5e1 !important;
          color: #cbd5e1 !important;
        }
        .react-flow__controls-button:hover {
          background-color: #1e293b !important;
          fill: #38bdf8 !important;
        }
        .react-flow__controls-button svg {
          max-width: 14px;
          max-height: 14px;
          fill: inherit !important;
        }
      `}</style>
    </div>
  );
}
