'use client';

import React, { useState } from 'react';
import { CVE_DATA } from '@/data/cves';
import { VulnClass, CVEEntry } from '@/lib/types';
import { useSound } from '@/lib/useSound';

interface TaxonomyGraphProps {
  activeClass: VulnClass;
  activeCveId: string;
  onSelectCVE?: (cve: CVEEntry) => void;
}

export default function TaxonomyGraph({ activeClass, activeCveId, onSelectCVE }: TaxonomyGraphProps) {
  const { playHover, playClick } = useSound();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Find related findings that share the same class or are related
  const relatedCVEs = CVE_DATA.filter((cve) => cve.vulnClass === activeClass);

  // Center node coordinates
  const centerX = 150;
  const centerY = 100;

  // Nodes configuration
  const nodes = [
    // Central Node (The Vuln Class)
    { 
      id: 'root', 
      label: activeClass, 
      x: centerX, 
      y: centerY, 
      isRoot: true,
      tooltip: `Vulnerability class: ${activeClass}`
    },
    // Leaf Nodes (Related CVE findings)
    ...relatedCVEs.map((cve, idx) => {
      // Space them out radially
      const angle = (idx / relatedCVEs.length) * Math.PI * 2;
      const radius = 65;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      return {
        id: cve.id,
        label: cve.id,
        x,
        y,
        isRoot: false,
        cve,
        tooltip: `${cve.target}: ${cve.title}`
      };
    })
  ];

  const handleNodeClick = (node: any) => {
    if (!node.isRoot && node.cve && onSelectCVE) {
      playClick();
      onSelectCVE(node.cve);
    }
  };

  return (
    <div className="w-full border border-white/5 bg-black/40 p-6 rounded-sm taxonomy-graph-container">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-mono text-xs text-[#666666] uppercase tracking-widest">
          ANATOMY_TAXONOMY_MAP
        </h4>
        <span className="font-mono text-[9px] text-white/30 uppercase">
          Interactive Schematic
        </span>
      </div>

      <div className="relative flex justify-center items-center">
        <svg 
          viewBox="0 0 300 200" 
          className="w-full max-w-sm h-auto"
          aria-label="Vulnerability classification graph"
        >
          {/* Connector lines (rendered underneath nodes) */}
          {nodes.filter(n => !n.isRoot).map((node) => {
            const isActive = hoveredNode === node.id || hoveredNode === 'root';
            return (
              <line
                key={`line-${node.id}`}
                x1={centerX}
                y1={centerY}
                x2={node.x}
                y2={node.y}
                className="transition-all duration-300 taxonomy-line"
                stroke={node.id === activeCveId ? '#FF3B30' : isActive ? '#8A5CF6' : 'rgba(255,255,255,0.1)'}
                strokeWidth={node.id === activeCveId ? '1.5' : isActive ? '1.2' : '0.8'}
                strokeDasharray={node.id === activeCveId ? '4 2' : undefined}
              />
            );
          })}

          {/* Render nodes */}
          {nodes.map((node) => {
            const isCurrent = node.id === activeCveId;
            const isHovered = hoveredNode === node.id;
            
            // Central node visual style vs leaves
            const r = node.isRoot ? 24 : 14;
            const strokeColor = node.isRoot 
              ? '#8A5CF6' 
              : isCurrent 
                ? '#FF3B30' 
                : isHovered 
                  ? '#38BDF8' 
                  : 'rgba(255,255,255,0.3)';
            
            const fillColor = node.isRoot 
              ? 'rgba(138, 92, 246, 0.15)' 
              : isCurrent 
                ? 'rgba(255, 59, 48, 0.1)' 
                : 'rgba(10, 11, 13, 0.9)';

            return (
              <g 
                key={node.id}
                className={`transition-all duration-300 ${!node.isRoot ? 'cursor-pointer' : ''}`}
                onMouseEnter={() => {
                  setHoveredNode(node.id);
                  if (!node.isRoot) playHover();
                }}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleNodeClick(node)}
              >
                <title>{node.tooltip}</title>
                
                {/* Node outer pulse if hovered */}
                {isHovered && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={r + 4}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="0.5"
                    className="animate-pulse"
                  />
                )}

                <circle
                  cx={node.x}
                  cy={node.y}
                  r={r}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={node.isRoot || isCurrent || isHovered ? '1.5' : '1'}
                  className="taxonomy-circle"
                />

                {/* Node Label Text */}
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="font-mono select-none taxonomy-text"
                  fill={isHovered ? '#FFFFFF' : isCurrent ? '#FF3B30' : node.isRoot ? '#8A5CF6' : '#BBBBBB'}
                  fontSize={node.isRoot ? '7px' : '6px'}
                  fontWeight={node.isRoot || isCurrent ? 'bold' : 'normal'}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover detail box */}
        <div className="absolute bottom-0 left-0 right-0 text-center font-mono text-[9px] text-[#888888] min-h-[14px]">
          {hoveredNode && hoveredNode !== 'root' && (
            <span>
              SELECT: {nodes.find(n => n.id === hoveredNode)?.tooltip}
            </span>
          )}
          {hoveredNode === 'root' && (
            <span>CLASS_ROOT: ALL SECURED / RELATED DISCLOSURES</span>
          )}
        </div>
      </div>
    </div>
  );
}
