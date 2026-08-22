'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCursor } from '@/components/providers/CursorProvider';
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider';

// Helper to generate a gear shape procedurally
function createGearGeometry(innerRadius: number, outerRadius: number, teeth: number, depth: number) {
  const shape = new THREE.Shape();
  const hole = new THREE.Path();

  // Draw star-like gear teeth shape
  for (let i = 0; i < teeth * 2; i++) {
    const angle = (i / (teeth * 2)) * Math.PI * 2;
    const isTooth = i % 2 === 0;
    const r = isTooth ? outerRadius : innerRadius;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.closePath();

  // Center cutout hole
  const holeRadius = innerRadius * 0.25;
  hole.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const extrudeSettings = {
    depth: depth,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.015,
    bevelThickness: 0.015,
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

interface NetworkSceneProps {
  onInspectBrokenGear?: () => void;
}

function NetworkScene({ onInspectBrokenGear }: NetworkSceneProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  // Refs for the gears
  const gearARef = useRef<THREE.Mesh>(null);
  const gearBRef = useRef<THREE.Mesh>(null);
  const gearCRRef = useRef<THREE.Mesh>(null);
  const gearDRef = useRef<THREE.Mesh>(null); // Broken gear
  
  const cursor = useCursor();
  const prefersReducedMotion = useReducedMotion();

  // Scroll tracking state
  const scrollYRef = useRef(0);
  const viewportHeightRef = useRef(1000);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    viewportHeightRef.current = window.innerHeight;
    
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    
    const handleResize = () => {
      viewportHeightRef.current = window.innerHeight;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Particle configuration
  const particleCount = 500;
  const maxDistance = 0.22; // Extended from 0.15 for better connection networks

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;

      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return [pos, vel];
  }, [particleCount]);

  const linesGeometry = useMemo(() => new THREE.BufferGeometry(), []);

  // Gear geometry creation
  const gearAGeom = useMemo(() => createGearGeometry(0.9, 1.1, 24, 0.2), []);
  const gearBGeom = useMemo(() => createGearGeometry(0.55, 0.75, 16, 0.18), []);
  const gearCGeom = useMemo(() => createGearGeometry(0.65, 0.85, 18, 0.18), []);
  const gearDGeom = useMemo(() => createGearGeometry(0.4, 0.55, 12, 0.15), []); // Broken gear

  const [hovered, setHovered] = useState(false);

  // Set hover cursor
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.cursor = 'auto';
      }
    };
  }, [hovered]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollY = scrollYRef.current;
    const vh = viewportHeightRef.current;

    // Transition progress: 
    // y = 0 → Hero: progress = 0 (100% particles)
    // y = vh → Watchmaker entry: progress moves 0 to 1
    // y = 2vh → Findings entry
    const transitionStart = vh * 0.2;
    const transitionEnd = vh * 1.0;
    const progress = Math.max(0, Math.min(1, (scrollY - transitionStart) / (transitionEnd - transitionStart)));

    const particlesOpacity = Math.max(0, 1 - progress);
    const gearsOpacity = progress;

    // 1. Update Particles
    if (pointsRef.current && linesRef.current) {
      const positionsAttr = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const targetX = cursor?.x ? (cursor.x / window.innerWidth) * 2 - 1 : 0;
      const targetY = cursor?.y ? -(cursor.y / window.innerHeight) * 2 + 1 : 0;

      const linePositions = [];
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        if (!prefersReducedMotion) {
          positionsAttr[i3] += velocities[i3];
          positionsAttr[i3 + 1] += velocities[i3 + 1];
          positionsAttr[i3 + 2] += velocities[i3 + 2];

          // Bounce boundaries
          if (Math.abs(positionsAttr[i3]) > 2.8) velocities[i3] *= -1;
          if (Math.abs(positionsAttr[i3 + 1]) > 2.8) velocities[i3 + 1] *= -1;
          if (Math.abs(positionsAttr[i3 + 2]) > 1.5) velocities[i3 + 2] *= -1;
        }
        
        // Particles move freely and bounce off boundaries

        // Populate lines
        for (let j = i + 1; j < particleCount; j++) {
          const j3 = j * 3;
          const dx = positionsAttr[i3] - positionsAttr[j3];
          const dy = positionsAttr[i3 + 1] - positionsAttr[j3 + 1];
          const dz = positionsAttr[i3 + 2] - positionsAttr[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistance * maxDistance) {
            linePositions.push(
              positionsAttr[i3], positionsAttr[i3 + 1], positionsAttr[i3 + 2],
              positionsAttr[j3], positionsAttr[j3 + 1], positionsAttr[j3 + 2]
            );
          }
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      
      // Control opacity
      const ptsMat = pointsRef.current.material as THREE.PointsMaterial;
      const lnsMat = linesRef.current.material as THREE.LineBasicMaterial;
      ptsMat.opacity = 0.6 * particlesOpacity;
      lnsMat.opacity = 0.18 * particlesOpacity;

      // Hide particles if fully faded
      pointsRef.current.visible = particlesOpacity > 0.01;
      linesRef.current.visible = particlesOpacity > 0.01;
    }

    // 2. Update Gears (Watchmaker Scene)
    const activeGears = gearsOpacity > 0.01;
    if (gearARef.current && gearBRef.current && gearCRRef.current && gearDRef.current) {
      gearARef.current.visible = activeGears;
      gearBRef.current.visible = activeGears;
      gearCRRef.current.visible = activeGears;
      gearDRef.current.visible = activeGears;

      if (activeGears) {
        // Materials opacity mapping
        const applyOpacity = (mesh: THREE.Mesh) => {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.transparent = true;
          mat.opacity = gearsOpacity;
        };

        applyOpacity(gearARef.current);
        applyOpacity(gearBRef.current);
        applyOpacity(gearCRRef.current);
        applyOpacity(gearDRef.current);

        // Rotation base driven by page scroll scroll progress + continuous slow background drift
        const scrollRotation = (scrollY / vh) * 1.5;
        const continuousRotation = prefersReducedMotion ? 0 : time * 0.08;
        const baseRot = scrollRotation + continuousRotation;

        // Gear A (Center: 24 teeth)
        gearARef.current.rotation.z = baseRot;

        // Gear B (Meshes with A: 16 teeth -> rotates opposite and faster)
        // Ratio = 24/16 = 1.5
        gearBRef.current.rotation.z = -baseRot * 1.5 + (Math.PI / 16); // Align teeth offset

        // Gear C (Meshes with A: 18 teeth -> rotates opposite)
        // Ratio = 24/18 = 1.33
        gearCRRef.current.rotation.z = -baseRot * 1.33 + (Math.PI / 18);

        // Gear D (Broken Gear: meshes with B -> rotates same dir as A, but stutters)
        // B has 16, D has 12 -> ratio from B is 16/12 = 1.33. Dir opposite of B (same as A).
        // Total rotation relative to baseRot = baseRot * 1.5 * 1.33 = baseRot * 2.0
        let stutter = 0;
        if (!prefersReducedMotion) {
          // Jitter modulation wave
          stutter = Math.sin(time * 15) * 0.08;
        }
        gearDRef.current.rotation.z = (baseRot * 2.0) + stutter + (Math.PI / 12);
        
      }
    }

    // Parallax effect on the entire scene based on mouse (runs always)
    const targetParallaxX = cursor?.x ? (cursor.x / window.innerWidth - 0.5) * 0.6 : 0;
    const targetParallaxY = cursor?.y ? -(cursor.y / window.innerHeight - 0.5) * 0.6 : 0;
    
    // Depth offset shifts back on scroll progress
    const targetDepthOffset = Math.max(-0.5, Math.min(0, -progress * 0.5));
    
    // Smoothly ease scene positions to avoid coordinate jumps
    state.scene.position.x += (targetParallaxX - state.scene.position.x) * 0.05;
    state.scene.position.y += (targetParallaxY - state.scene.position.y) * 0.05;
    state.scene.position.z += (targetDepthOffset - state.scene.position.z) * 0.05;
  });

  // Brass standard material
  const brassMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#C8A24B'),
      metalness: 0.85,
      roughness: 0.25,
      flatShading: true,
      transparent: true,
      opacity: 0,
    });
  }, []);

  // Broken gear material (signal red + glowing)
  const brokenMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FF3B30'),
      emissive: new THREE.Color('#FF3B30'),
      emissiveIntensity: 0.25,
      metalness: 0.75,
      roughness: 0.35,
      flatShading: true,
      transparent: true,
      opacity: 0,
    });
  }, []);

  return (
    <>
      {/* 1. Particle Network Layer */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.018} color="#8A5CF6" transparent opacity={0.6} sizeAttenuation={true} />
      </points>
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial color="#8A5CF6" transparent opacity={0.15} />
      </lineSegments>

      {/* 2. Clockwork Gears Layer */}
      {/* Gear A: Center principal gear */}
      <mesh
        ref={gearARef}
        geometry={gearAGeom}
        material={brassMaterial}
        position={[0, 0.4, -0.5]}
        visible={false}
      />
      {/* Gear B: Bottom-left gear */}
      <mesh
        ref={gearBRef}
        geometry={gearBGeom}
        material={brassMaterial}
        position={[-1.7, -0.6, -0.6]}
        visible={false}
      />
      {/* Gear C: Top-right gear */}
      <mesh
        ref={gearCRRef}
        geometry={gearCGeom}
        material={brassMaterial}
        position={[1.8, 1.2, -0.7]}
        visible={false}
      />
      {/* Gear D: Broken Gear (Clickable trigger, meshes with B, positioned mid-bottom) */}
      <mesh
        ref={gearDRef}
        geometry={gearDGeom}
        material={brokenMaterial}
        position={[-0.7, -1.6, -0.4]}
        rotation={[0.15, 0.1, 0]} // Tilted axis
        visible={false}
        onClick={(e) => {
          e.stopPropagation();
          if (onInspectBrokenGear) {
            onInspectBrokenGear();
          }
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
    </>
  );
}

export function Network({ onInspectBrokenGear }: NetworkSceneProps) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 60 }} 
        dpr={[1, 1.5]} // Performance optimized dpr cap
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#EDECE6" />
        <pointLight position={[-5, -5, -2]} intensity={0.5} color="#8A5CF6" />
        <NetworkScene onInspectBrokenGear={onInspectBrokenGear} />
      </Canvas>
    </div>
  );
}
