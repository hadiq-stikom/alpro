"use client";

import { useEffect, useState, useRef, memo } from 'react';
import { ReactFlow, useNodesState, useEdgesState, Background, Controls, MarkerType, Node, Edge, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Custom Node dengan Animasi Perubahan Nilai yang Presisi (Proses)
const VarNode = memo(({ data }: any) => {
  // Animasi otomatis menyala saat node baru saja diciptakan (Penambahan Variabel)
  const [isAnimating, setIsAnimating] = useState(true); 
  const prevData = useRef({ label: data.label, value: data.value });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // Cek apakah label (persamaan) ATAU value (nilai akhir) benar-benar berubah
    if (prevData.current.label !== data.label || prevData.current.value !== data.value) {
      setIsAnimating(true);
      prevData.current = { label: data.label, value: data.value };
      timer = setTimeout(() => setIsAnimating(false), 800);
    } else if (isAnimating) {
      // Untuk mematikan animasi setelah render pertama
      timer = setTimeout(() => setIsAnimating(false), 800);
    }
    
    return () => clearTimeout(timer);
  }, [data.label, data.value, isAnimating]); // Hanya trigger jika isi data primitifnya berubah

  return (
    <div className={`px-5 py-3 border-2 rounded-xl transition-all duration-500 font-mono text-sm font-bold shadow-lg flex items-center justify-center min-w-[120px]
      ${isAnimating 
        ? 'bg-green-500/20 border-green-500 text-green-400 scale-110 shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
        : 'bg-[#6366f11a] border-primary text-primary scale-100'
      }
    `}>
      <Handle type="target" position={Position.Top} className="opacity-0" />
      {data.label}
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
});
VarNode.displayName = 'VarNode';

// Custom Node untuk Output (Bentuk Jajar Genjang)
const OutputNode = memo(({ data }: any) => {
  return (
    <div className="relative flex items-center justify-center min-w-[140px]">
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="px-8 py-3 border-2 rounded-xl font-mono text-sm font-bold shadow-lg bg-[#6366f11a] border-primary text-primary w-full text-center" style={{ transform: 'skewX(-15deg)' }}>
        <div style={{ transform: 'skewX(15deg)' }}>{data.label}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
});
OutputNode.displayName = 'OutputNode';

const nodeTypes = { varNode: VarNode, outputNode: OutputNode };

export default function FlowchartVisualizer({ code, variables }: { code: string, variables: Record<string, any> }) {
  const initialNodes: Node[] = [
    { id: 'start', position: { x: 200, y: 50 }, origin: [0.5, 0], data: { label: 'START' }, type: 'input', style: { borderRadius: '50px', background: '#09090b', color: '#fff', border: '2px solid #27272a', width: 150 } },
    { id: 'end', position: { x: 200, y: 350 }, origin: [0.5, 0], data: { label: 'STOP' }, type: 'output', style: { borderRadius: '50px', background: '#09090b', color: '#fff', border: '2px solid #27272a', width: 150 } },
  ];

  const initialEdges: Edge[] = [];

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);

  // Auto-generate nodes based on code statements and variables
  useEffect(() => {
    const newNodes: Node[] = [...initialNodes];
    const newEdges: Edge[] = [];
    
    let yPos = 125;
    let prevNodeId = 'start';
    
    // Parse statements from code (looking for assignments and print/console.log)
    const statements = code.split('\n')
      .map(line => line.split('#')[0].split('//')[0].trim()) // Hapus komentar Python dan JS
      .filter(line => {
         const normalizedLine = line.replace(/^(let|const|var)\s+/, '').replace(/;/g, '');
         return (normalizedLine.includes('=') && !normalizedLine.startsWith('if') && !normalizedLine.startsWith('for') && !normalizedLine.startsWith('while')) || normalizedLine.startsWith('print') || normalizedLine.startsWith('console.log');
      });
    
    statements.forEach((stmt, index) => {
      const normalizedStmt = stmt.replace(/^(let|const|var)\s+/, '').replace(/;/g, '');
      let nodeId = `node-${index}`;
      let label = stmt;
      let nodeType = 'varNode';
      let value = undefined;

      if (normalizedStmt.startsWith('print') || normalizedStmt.startsWith('console.log')) {
        nodeType = 'outputNode';
        const match = normalizedStmt.match(/\((.*)\)/);
        const vars = match ? match[1].split(',') : [];
        const printedVar = vars.length > 1 ? vars[1].trim() : vars[0];
        // Hilangkan kutipan dari string yang di print jika ada
        label = `Tampilkan(${printedVar})`;
      } else if (normalizedStmt.includes('input(') || normalizedStmt.includes('prompt(')) {
        nodeType = 'outputNode'; // Jajaran genjang untuk Input/Output
        const varName = normalizedStmt.split('=')[0].trim();
        nodeId = `var-${varName}`;
        value = variables[varName];
        label = `Baca(${varName})`;
      } else {
        const varName = normalizedStmt.split('=')[0].trim();
        nodeId = `var-${varName}`;
        value = variables[varName];
      }
      
      newNodes.push({
        id: nodeId,
        position: { x: 200, y: yPos },
        origin: [0.5, 0], // Agar selalu lurus tengah terlepas dari lebar kotaknya
        type: nodeType,
        data: { label, value },
      });
      
      newEdges.push({
        id: `e-${prevNodeId}-${nodeId}`,
        source: prevNodeId,
        target: nodeId,
        animated: true,
        style: { stroke: '#6366f1' },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
      });
      
      prevNodeId = nodeId;
      yPos += 75;
    });
    
    // Connect last node to END and adjust END position
    const endNode = newNodes.find(n => n.id === 'end');
    if (endNode) {
        endNode.position.y = yPos;
    }
    
    newEdges.push({
      id: `e-${prevNodeId}-end`,
      source: prevNodeId,
      target: 'end',
      animated: true,
      style: { stroke: '#6366f1' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [variables, setNodes, setEdges]); // Re-run whenever variables change from Pyodide

  return (
    <div className="w-full h-full relative" style={{ minHeight: '400px' }}>
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background gap={24} size={1} color="#3f3f46" />
        <Controls />
      </ReactFlow>
    </div>
  );
}
