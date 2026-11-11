'use client';

import React, { useRef, useEffect, useState } from 'react';
import Matter from 'matter-js';
import { ARSENAL_TOOLS, ToolItem } from '@/src/content/site';

const CATEGORIES = [
  { id: 'all', label: 'ALL_ARSENAL', count: ARSENAL_TOOLS.length },
  { id: 'binary', label: 'BINARY REVERSE', color: '#6FE7FF' },
  { id: 'dynamic', label: 'DYNAMIC & NETWORK', color: '#C8FF2E' },
  { id: 'forensics', label: 'DIGITAL FORENSICS', color: '#FFB800' },
  { id: 'development', label: 'DEV & AUTOMATION', color: '#E066FF' },
];

export default function Arsenal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedTool, setSelectedTool] = useState<ToolItem>(ARSENAL_TOOLS[0]);
  const [isHovering, setIsHovering] = useState(false);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 520;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

    const engine = Engine.create({
      gravity: { x: 0, y: 0.8 },
    });
    engineRef.current = engine;

    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;

    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: 'transparent',
      },
    });

    Render.run(render);
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // Static boundary walls
    const wallThickness = 60;
    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2 - 10, width * 2, wallThickness, {
      isStatic: true,
      render: { fillStyle: 'transparent' },
    });
    const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, {
      isStatic: true,
      render: { fillStyle: 'transparent' },
    });
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, {
      isStatic: true,
      render: { fillStyle: 'transparent' },
    });

    Composite.add(engine.world, [ground, leftWall, rightWall]);

    // Create tool bodies
    const toolBodies: { body: Matter.Body; tool: ToolItem }[] = [];
    const itemWidth = Math.min(160, Math.max(120, width / 7));
    const itemHeight = 44;

    ARSENAL_TOOLS.forEach((tool, i) => {
      const col = i % 4;
      const x = width / 2 - 180 + col * 100 + (Math.random() * 40 - 20);
      const y = -50 - i * 55;

      const body = Bodies.rectangle(x, y, itemWidth, itemHeight, {
        chamfer: { radius: 8 },
        restitution: 0.45,
        friction: 0.2,
        density: 0.002,
        render: {
          fillStyle: '#0E1015',
          strokeStyle: tool.color,
          lineWidth: 1.5,
        },
      });

      // Attach custom data
      (body as any).plugin = { tool };
      toolBodies.push({ body, tool });
    });

    Composite.add(engine.world, toolBodies.map((tb) => tb.body));

    // Mouse control
    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Custom Canvas renderer overlay to draw tool names and badges
    Events.on(render, 'afterRender', () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      toolBodies.forEach(({ body, tool }) => {
        const { x, y } = body.position;
        const angle = body.angle;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Card background
        ctx.fillStyle = '#0E1015';
        ctx.beginPath();
        ctx.roundRect(-itemWidth / 2, -itemHeight / 2, itemWidth, itemHeight, 6);
        ctx.fill();

        // Border colored by category
        ctx.strokeStyle = activeFilter === 'all' || activeFilter === tool.category ? tool.color : 'rgba(255,255,255,0.1)';
        ctx.lineWidth = activeFilter === tool.category ? 2 : 1;
        ctx.stroke();

        // Tool Name
        ctx.fillStyle = '#ECE9E2';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tool.name, 0, -4);

        // Category Tag
        ctx.fillStyle = tool.color;
        ctx.font = '8px JetBrains Mono, monospace';
        ctx.fillText(tool.categoryLabel.slice(0, 14), 0, 10);

        ctx.restore();
      });
    });

    // Hover detection
    Events.on(mouseConstraint, 'mousemove', (event: any) => {
      const mousePosition = event.mouse.position;
      const found = toolBodies.find(({ body }) =>
        Matter.Bounds.contains(body.bounds, mousePosition) &&
        Matter.Vertices.contains(body.vertices, mousePosition)
      );

      if (found) {
        setSelectedTool(found.tool);
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    });

    // Expose scatter impulse to window for button trigger
    (window as any).__scatterArsenal = () => {
      toolBodies.forEach(({ body }) => {
        Matter.Body.applyForce(body, body.position, {
          x: (Math.random() - 0.5) * 0.05,
          y: -0.06 - Math.random() * 0.04,
        });
      });
    };

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      delete (window as any).__scatterArsenal;
    };
  }, [activeFilter]);

  const handleScatter = () => {
    if (typeof window !== 'undefined' && (window as any).__scatterArsenal) {
      (window as any).__scatterArsenal();
    }
  };

  return (
    <section id="arsenal" className="relative w-full bg-[#07080A] py-24 px-6 sm:px-12 md:px-20 border-t border-white/10 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6 mb-12">
        <div>
          <div className="font-mono text-xs text-[#9A9890] flex items-center gap-2 mb-3">
            <span className="text-[#C8FF2E] font-bold">// 04</span>
            <span>OPERATIONAL ARSENAL</span>
            <span className="text-[#62605B]">|</span>
            <span>PHYSICS_GRAVITY_RIG</span>
          </div>
          <h2 className="font-sans text-4xl sm:text-6xl font-black text-[#ECE9E2] tracking-tighter">
            Tooling <span className="font-serif italic font-normal text-[#C8FF2E]">Engineered</span> for Depth
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#9A9890] max-w-xl mt-3">
            Interactive tactical equipment matrix. Tools operate under rigid physical constraints. Drag, toss, or filter to inspect low-level telemetry.
          </p>
        </div>

        {/* Category Filter Pills & Rig Controls */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-white/15 text-[#ECE9E2] border border-white/30 font-bold'
                  : 'bg-white/[0.03] text-[#9A9890] border border-white/5 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <button
            onClick={handleScatter}
            className="px-3 py-1.5 rounded bg-[#C8FF2E]/10 border border-[#C8FF2E]/40 text-[#C8FF2E] hover:bg-[#C8FF2E] hover:text-[#07080A] font-bold transition-all cursor-pointer flex items-center gap-1.5 ml-auto sm:ml-0"
          >
            <span>⚡ SCATTER_RIG</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Physics Rig + Telemetry HUD */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Physics Canvas Sandbox */}
        <div
          ref={containerRef}
          className="lg:col-span-8 relative w-full h-[400px] sm:h-[520px] rounded-xl bg-[#0E1015]/60 border border-white/10 overflow-hidden shadow-2xl"
        >
          {/* Subtle Grid Lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
          />

          {/* Sandbox Helper Hint */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-[#62605B] pointer-events-none flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF2E] animate-pulse" />
            <span>GRAVITY: 0.8G // DRAG_AND_THROW_ENABLED</span>
          </div>
        </div>

        {/* Right Column: Selected Tool Telemetry HUD */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-xl bg-[#0E1015] border border-white/10 font-mono text-xs space-y-6 shadow-2xl relative">
          <div className="flex justify-between items-center border-b border-white/10 pb-3 text-[#9A9890]">
            <span className="text-[#C8FF2E] font-bold">TOOL_INSPECTOR</span>
            <span className="text-[10px]" style={{ color: selectedTool.color }}>
              [{selectedTool.categoryLabel}]
            </span>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-black font-sans text-[#ECE9E2] tracking-tight">
              {selectedTool.name}
            </div>
            <div className="font-serif italic text-sm text-[#9A9890] mt-1">
              {selectedTool.type}
            </div>
          </div>

          {/* Proficiency Rating Badge */}
          <div className="p-3 rounded bg-white/[0.03] border border-white/10 flex justify-between items-center">
            <span className="text-[#9A9890]">PROFICIENCY</span>
            <span
              className="font-bold px-2 py-0.5 rounded text-[11px]"
              style={{
                backgroundColor: `${selectedTool.color}15`,
                color: selectedTool.color,
                border: `1px solid ${selectedTool.color}40`,
              }}
            >
              {selectedTool.proficiency}
            </span>
          </div>

          {/* Telemetry Trace */}
          <div className="space-y-2 border-t border-white/10 pt-4 text-[11px] text-[#9A9890]">
            <div className="text-[10px] text-[#62605B] uppercase">TACTICAL_APPLICATION</div>
            <p className="leading-relaxed text-[#ECE9E2] font-sans">
              Deployed in live research engagements, automated security triage pipelines, and binary vulnerability discovery.
            </p>
          </div>

          {/* Bottom Signal Footprint */}
          <div className="border-t border-white/10 pt-4 flex justify-between items-center text-[10px] text-[#62605B]">
            <span>STATUS: ACTIVE_RIG</span>
            <span className="text-[#C8FF2E] font-bold">VERIFIED_FIELD_USE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
