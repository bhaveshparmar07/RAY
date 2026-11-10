'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RESEARCH_DOMAINS } from '@/src/content/site';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════
   GENERATIVE VISUALS — each domain gets a unique Canvas2D animation
   ═══════════════════════════════════════════════════════════════════ */

type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;

// Domain 01 — Malware Analysis: particle swarm that "unpacks"
const drawMalwareSwarm: DrawFn = (ctx, w, h, t) => {
  ctx.clearRect(0, 0, w, h);
  const N = 80;
  for (let i = 0; i < N; i++) {
    const angle = (i / N) * Math.PI * 2 + t * 0.4;
    const radius = 60 + Math.sin(t * 0.8 + i * 0.3) * 40 + (i % 3) * 15;
    const x = w / 2 + Math.cos(angle) * radius;
    const y = h / 2 + Math.sin(angle) * radius;
    const size = 2 + Math.sin(t + i) * 1.5;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = i % 5 === 0 ? '#C8FF2E' : `rgba(111, 231, 255, ${0.3 + Math.sin(t + i) * 0.2})`;
    ctx.fill();
    // Connection lines
    if (i > 0 && i % 3 === 0) {
      const pAngle = ((i - 3) / N) * Math.PI * 2 + t * 0.4;
      const pRadius = 60 + Math.sin(t * 0.8 + (i - 3) * 0.3) * 40 + ((i - 3) % 3) * 15;
      const px = w / 2 + Math.cos(pAngle) * pRadius;
      const py = h / 2 + Math.sin(pAngle) * pRadius;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(px, py);
      ctx.strokeStyle = 'rgba(111, 231, 255, 0.08)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  }
};

// Domain 02 — Reverse Engineering: falling disassembly text
const drawDisassemblyRain: DrawFn = (ctx, w, h, t) => {
  ctx.clearRect(0, 0, w, h);
  const asm = ['push rbp', 'mov rsp', 'sub 0x40', 'call sym', 'test eax', 'jz fail', 'xor edx', 'ret', 'nop', 'lea rsi'];
  ctx.font = '11px monospace';
  const cols = 8;
  for (let c = 0; c < cols; c++) {
    const x = (c / cols) * w + 10;
    const speed = 0.3 + (c % 3) * 0.15;
    for (let row = 0; row < 12; row++) {
      const yBase = (row * 35 + t * 30 * speed) % (h + 50) - 25;
      const idx = (c * 7 + row * 3 + Math.floor(t * 0.5)) % asm.length;
      const alpha = Math.max(0, 1 - yBase / h) * 0.6;
      ctx.fillStyle = row === 0 ? `rgba(200, 255, 46, ${alpha})` : `rgba(111, 231, 255, ${alpha * 0.7})`;
      ctx.fillText(asm[idx], x, yBase);
    }
  }
};

// Domain 03 — Digital Forensics: scrubbable timeline bars
const drawForensicTimeline: DrawFn = (ctx, w, h, t) => {
  ctx.clearRect(0, 0, w, h);
  const tracks = 6;
  const trackH = h / (tracks + 2);
  for (let tr = 0; tr < tracks; tr++) {
    const y = trackH * (tr + 1);
    // Track line
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(w - 20, y);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();
    // Evidence blocks
    const blocks = 3 + (tr % 3);
    for (let b = 0; b < blocks; b++) {
      const bx = 30 + ((b * 67 + tr * 23) % (w - 80));
      const bw = 20 + (b * 13 + tr * 7) % 50;
      const reveal = Math.min(1, Math.max(0, (t * 0.6 - tr * 0.3 - b * 0.15)));
      const colors = ['#6FE7FF', '#C8FF2E', '#FF3B30', '#9A9890'];
      ctx.fillStyle = colors[tr % colors.length];
      ctx.globalAlpha = reveal * 0.6;
      ctx.fillRect(bx, y - 6, bw * reveal, 12);
      ctx.globalAlpha = 1;
    }
    // Track label
    ctx.fillStyle = 'rgba(154,152,144,0.4)';
    ctx.font = '9px monospace';
    const labels = ['MFT', 'EVTX', 'PREFETCH', 'SHIMCACHE', 'AMCACHE', 'REGISTRY'];
    ctx.fillText(labels[tr], 20, y - 12);
  }
  // Playhead
  const playX = 20 + ((t * 25) % (w - 40));
  ctx.beginPath();
  ctx.moveTo(playX, trackH * 0.5);
  ctx.lineTo(playX, trackH * (tracks + 1));
  ctx.strokeStyle = 'rgba(200, 255, 46, 0.5)';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.stroke();
  ctx.setLineDash([]);
};

// Domain 04 — Web/API Security: animated HTTP request flow
const drawHTTPFlow: DrawFn = (ctx, w, h, t) => {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2;
  const cy = h / 2;
  // Client node
  ctx.beginPath();
  ctx.arc(60, cy, 16, 0, Math.PI * 2);
  ctx.strokeStyle = '#C8FF2E';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.font = '8px monospace';
  ctx.fillStyle = '#C8FF2E';
  ctx.fillText('CLIENT', 42, cy + 30);
  // Auth gate
  const gateX = cx;
  ctx.strokeStyle = 'rgba(255, 59, 48, 0.6)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(gateX, cy - 50);
  ctx.lineTo(gateX, cy + 50);
  ctx.stroke();
  ctx.fillStyle = '#FF3B30';
  ctx.font = '9px monospace';
  ctx.fillText('AUTH_GATE', gateX - 25, cy - 55);
  // Server node
  ctx.beginPath();
  ctx.arc(w - 60, cy, 16, 0, Math.PI * 2);
  ctx.strokeStyle = '#6FE7FF';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = '#6FE7FF';
  ctx.font = '8px monospace';
  ctx.fillText('SERVER', w - 80, cy + 30);
  // Packets
  const packetPhase = (t * 0.8) % 4;
  const packetX = 76 + (packetPhase / 4) * (w - 152);
  // Packet bypasses gate
  const bypass = packetPhase > 1.8;
  ctx.beginPath();
  ctx.arc(packetX, cy + (bypass ? -30 * Math.sin(packetPhase * 1.5) : 0), 5, 0, Math.PI * 2);
  ctx.fillStyle = bypass ? '#C8FF2E' : '#6FE7FF';
  ctx.fill();
  ctx.shadowColor = bypass ? '#C8FF2E' : '#6FE7FF';
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.shadowBlur = 0;
  // Trail
  ctx.beginPath();
  ctx.setLineDash([2, 4]);
  ctx.moveTo(76, cy);
  ctx.lineTo(packetX, cy + (bypass ? -30 * Math.sin(packetPhase * 1.5) : 0));
  ctx.strokeStyle = bypass ? 'rgba(200,255,46,0.3)' : 'rgba(111,231,255,0.2)';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.setLineDash([]);
};

// Domain 05 — CTF: flag capture blinking effect
const drawFlagCapture: DrawFn = (ctx, w, h, t) => {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2;
  const cy = h / 2;
  // Concentric rings
  for (let r = 5; r > 0; r--) {
    const radius = r * 22 + Math.sin(t + r) * 8;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(200, 255, 46, ${0.1 + (5 - r) * 0.05})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  // Flag text that scrambles
  ctx.font = 'bold 14px monospace';
  const flag = 'FLAG{XOR_BYPAS5}';
  const revealed = Math.floor((t * 2) % (flag.length + 5));
  let display = '';
  for (let i = 0; i < flag.length; i++) {
    if (i < revealed) {
      display += flag[i];
    } else {
      display += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
    }
  }
  const tw = ctx.measureText(display).width;
  ctx.fillStyle = revealed >= flag.length ? '#C8FF2E' : '#6FE7FF';
  ctx.fillText(display, cx - tw / 2, cy + 5);
  // Crosshair
  ctx.strokeStyle = 'rgba(200,255,46,0.3)';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 80);
  ctx.lineTo(cx, cy - 15);
  ctx.moveTo(cx, cy + 15);
  ctx.lineTo(cx, cy + 80);
  ctx.moveTo(cx - 80, cy);
  ctx.lineTo(cx - 15, cy);
  ctx.moveTo(cx + 15, cy);
  ctx.lineTo(cx + 80, cy);
  ctx.stroke();
};

// Domain 06 — AI Automation: neural mesh
const drawNeuralMesh: DrawFn = (ctx, w, h, t) => {
  ctx.clearRect(0, 0, w, h);
  const layers = [4, 6, 8, 6, 4];
  const layerSpacing = w / (layers.length + 1);
  const nodes: { x: number; y: number }[][] = [];
  layers.forEach((count, li) => {
    const layerNodes: { x: number; y: number }[] = [];
    const x = layerSpacing * (li + 1);
    for (let ni = 0; ni < count; ni++) {
      const y = (h / (count + 1)) * (ni + 1);
      layerNodes.push({ x, y });
    }
    nodes.push(layerNodes);
  });
  // Draw connections
  for (let li = 0; li < nodes.length - 1; li++) {
    for (const n1 of nodes[li]) {
      for (const n2 of nodes[li + 1]) {
        const pulse = Math.sin(t * 1.5 + n1.y * 0.02 + n2.y * 0.01) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.strokeStyle = `rgba(111, 231, 255, ${0.04 + pulse * 0.08})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  // Draw nodes
  for (let li = 0; li < nodes.length; li++) {
    for (const n of nodes[li]) {
      const pulse = Math.sin(t * 2 + n.y * 0.03) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 3 + pulse * 2, 0, Math.PI * 2);
      ctx.fillStyle = li === 0 || li === nodes.length - 1 ? '#C8FF2E' : `rgba(111, 231, 255, ${0.5 + pulse * 0.5})`;
      ctx.fill();
    }
  }
};

const DRAW_FNS: DrawFn[] = [
  drawMalwareSwarm,
  drawDisassemblyRain,
  drawForensicTimeline,
  drawHTTPFlow,
  drawFlagCapture,
  drawNeuralMesh,
];

/* ═══════════════════════════════════════════════════════════════════
   DOMAIN PANEL — individual full-viewport panel
   ═══════════════════════════════════════════════════════════════════ */

function DomainPanel({ domain, index }: { domain: typeof RESEARCH_DOMAINS[number]; index: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startTime = useRef(Date.now());

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const t = (Date.now() - startTime.current) / 1000;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }
    ctx.save();
    DRAW_FNS[index]?.(ctx, rect.width, rect.height, t);
    ctx.restore();
    animRef.current = requestAnimationFrame(animate);
  }, [index]);

  useEffect(() => {
    startTime.current = Date.now();
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  return (
    <div className="domain-panel relative flex-shrink-0 w-screen min-h-screen sm:h-screen flex items-center overflow-hidden py-24 sm:py-0">
      {/* Generative Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50 sm:opacity-60"
        aria-hidden="true"
      />

      {/* Huge Background Numeral */}
      <div
        className="absolute right-4 sm:right-16 top-1/2 -translate-y-1/2 font-sans text-[30vw] sm:text-[26vw] font-black text-white/[0.02] leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        {domain.num}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-12 md:px-20 py-8 sm:py-16 flex flex-col justify-center">
        {/* Section Meta */}
        <div className="font-mono text-[10px] sm:text-xs text-[#9A9890] flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
          <span className="text-[#C8FF2E] font-bold">{domain.tag}</span>
          <span className="text-[#62605B]">|</span>
          <span className="truncate">{domain.metrics}</span>
        </div>

        {/* Numeral + Title Stack */}
        <div className="flex items-end gap-3 sm:gap-6 mb-3 sm:mb-6">
          <span className="font-sans text-5xl sm:text-8xl md:text-9xl font-black text-[#C8FF2E] leading-none tracking-tighter">
            {domain.num}
          </span>
          <div className="pb-1 sm:pb-2">
            <h3 className="font-sans text-xl sm:text-3xl md:text-5xl font-black text-[#ECE9E2] tracking-tight leading-tight">
              {domain.title}
            </h3>
            <p className="font-serif italic text-sm sm:text-base md:text-lg text-[#9A9890] mt-0.5 sm:mt-1">
              {domain.subtitle}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="font-sans text-xs sm:text-base text-[#9A9890] leading-relaxed max-w-2xl mb-5 sm:mb-8">
          {domain.description}
        </p>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 sm:gap-y-2 mb-5 sm:mb-8">
          {domain.focusAreas.map((area, i) => (
            <div key={i} className="flex items-start gap-2 font-mono text-[10px] sm:text-xs text-[#ECE9E2]">
              <span className="text-[#C8FF2E] font-bold mt-0.5">▸</span>
              <span>{area}</span>
            </div>
          ))}
        </div>

        {/* Tools Row */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
          {domain.tools.map((tool, i) => (
            <span
              key={i}
              className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-white/[0.04] border border-white/10 font-mono text-[9px] sm:text-[11px] text-[#9A9890] hover:text-[#6FE7FF] hover:border-[#6FE7FF]/30 transition-colors"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Truth Layer Interactive Telemetry Console */}
        <div className="relative mt-2 p-3 sm:p-4 rounded-lg bg-[#0E1015]/90 border border-white/10 max-w-xl group hover:border-[#6FE7FF]/40 transition-colors">
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-[#62605B] mb-1.5">
            <span className="flex items-center gap-1.5 text-[#6FE7FF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6FE7FF] animate-ping" />
              <span>TRUTH_LAYER_TRACE</span>
            </span>
            <span>REVEAL_LENS</span>
          </div>
          <div className="font-mono text-[10px] sm:text-xs text-[#6FE7FF] break-all leading-relaxed opacity-90">
            {domain.truthLayerSnippet}
          </div>
        </div>
      </div>

      {/* Vertical Separator Line (except last) */}
      {index < RESEARCH_DOMAINS.length - 1 && (
        <div className="hidden sm:block absolute right-0 top-[15%] bottom-[15%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   RESEARCH DOMAINS SECTION — pinned horizontal scroll
   ═══════════════════════════════════════════════════════════════════ */

export default function ResearchDomains() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.domain-panel');
      if (panels.length === 0) return;

      gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${trackRef.current!.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="research-domains"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#07080A]"
    >
      {/* Section Header — sticky while scrolling horizontally */}
      <div className="absolute top-6 sm:top-8 left-6 sm:left-12 md:left-20 right-6 sm:right-12 md:right-20 z-20 flex justify-between items-center font-mono text-xs text-[#9A9890] border-b border-white/10 pb-3">
        <span className="flex items-center gap-2">
          <span className="text-[#C8FF2E] font-bold">// 03</span>
          <span>RESEARCH DOMAINS</span>
        </span>
        <span className="text-[#62605B] hidden sm:inline">SCROLL → HORIZONTAL_TRAVERSE</span>
      </div>

      {/* Horizontal Track */}
      <div
        ref={trackRef}
        className="flex w-max"
      >
        {RESEARCH_DOMAINS.map((domain, i) => (
          <DomainPanel key={domain.id} domain={domain} index={i} />
        ))}
      </div>
    </section>
  );
}
