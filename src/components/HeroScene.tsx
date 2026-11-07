'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const truthVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const truthFragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uCursor;
  uniform float uLensRadius;
  varying vec2 vUv;

  // Pseudo-random generator
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    vec2 cursorNorm = uCursor / uResolution.xy;
    cursorNorm.y = 1.0 - cursorNorm.y; // invert Y for screen coords

    // Distance to ray lens
    float aspect = uResolution.x / uResolution.y;
    vec2 distVec = (st - cursorNorm);
    distVec.x *= aspect;
    float dist = length(distVec);
    float radiusNorm = uLensRadius / uResolution.y;

    // Inside lens check
    float lensEdge = smoothstep(radiusNorm, radiusNorm - 0.015, dist);

    // Dynamic hex/asm noise pattern inside lens
    vec2 grid = floor(st * vec2(80.0 * aspect, 80.0));
    float rnd = hash(grid + floor(uTime * 4.0));

    // Base background colors: Ink black outside
    vec3 baseBg = vec3(0.027, 0.031, 0.039); // #07080A

    // Truth layer inside lens: Cold Cyan #6FE7FF with scanlines and opcode flashes
    vec3 truthCyan = vec3(0.435, 0.905, 1.0); // #6FE7FF
    vec3 truthDeep = vec3(0.04, 0.12, 0.18);
    float scanline = sin(gl_FragCoord.y * 1.5 + uTime * 10.0) * 0.15;
    vec3 truthColor = mix(truthDeep, truthCyan, rnd * 0.85 + scanline);

    // Chromatic ring at lens perimeter (Acid-lime #C8FF2E edge)
    float ring = smoothstep(radiusNorm + 0.006, radiusNorm, dist) - smoothstep(radiusNorm, radiusNorm - 0.006, dist);
    vec3 ringColor = vec3(0.784, 1.0, 0.18); // #C8FF2E

    // Blend
    vec3 finalColor = mix(baseBg, truthColor, lensEdge * 0.85);
    finalColor += ringColor * ring * 1.5;

    gl_FragColor = vec4(finalColor, 0.92);
  }
`;

function TruthShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uCursor: { value: new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2) },
      uLensRadius: { value: 140 },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.getElapsedTime();
      // Read current CSS cursor coords
      const rootStyle = getComputedStyle(document.documentElement);
      const curX = parseFloat(rootStyle.getPropertyValue('--cursor-x')) || window.innerWidth / 2;
      const curY = parseFloat(rootStyle.getPropertyValue('--cursor-y')) || window.innerHeight / 2;
      const radius = parseFloat(rootStyle.getPropertyValue('--lens-radius')) || 140;

      uniforms.uCursor.value.set(curX, curY);
      uniforms.uLensRadius.value = radius;
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        vertexShader={truthVertexShader}
        fragmentShader={truthFragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <TruthShaderPlane />
      </Canvas>
    </div>
  );
}
