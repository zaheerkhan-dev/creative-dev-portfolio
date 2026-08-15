"use client";

import React, { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface GogglesProps {
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
}

function GogglesMesh({
  position = [-0.06, 0.20, 0.14],
  scale = [0.16, 0.08, 1],
  rotation = [0, 0, 0.2],
}: GogglesProps) {
  const texture = useTexture("/Images/About/Goggles.png");
  return (
    <mesh position={position} scale={scale} rotation={rotation} renderOrder={999}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent depthTest={false} />
    </mesh>
  );
}

interface MarcusModelProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  showGoggles?: boolean;
  gogglesPosition?: [number, number, number];
  gogglesScale?: [number, number, number];
  gogglesRotation?: [number, number, number];
}

function MarcusModel({
  containerRef,
  position = [0, -0.45, 0],
  rotation = [0, 6.5, 0],
  scale = 3.0,
  showGoggles = false,
  gogglesPosition = [-0.06, 0.20, 0.14],
  gogglesScale = [0.16, 0.08, 1],
  gogglesRotation = [0, 0, 0.2],
}: MarcusModelProps) {
  const { scene } = useGLTF("/3D/marcus_aurelius.glb");
  const groupRef = useRef<THREE.Group>(null);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const mouseOffset = useRef({ x: 0, y: 0 });
  const targetMouseOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      clonedScene.traverse((obj) => {
        if ("isMesh" in obj && (obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      });
    };
  }, [clonedScene]);

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      targetMouseOffset.current = {
        y: 0.35 * ((e.clientX - rect.left) / rect.width - 0.5),
        x: 0.25 * ((e.clientY - rect.top) / rect.height - 0.5),
      };
    };

    const handleLeave = () => {
      targetMouseOffset.current = { x: 0, y: 0 };
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [containerRef]);

  useFrame(() => {
    if (groupRef.current && containerRef?.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const rawOffset =
        (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.0006;
      const scrollOffset = Math.max(-0.35, Math.min(0.35, rawOffset));

      mouseOffset.current.x += (targetMouseOffset.current.x - mouseOffset.current.x) * 0.08;
      mouseOffset.current.y += (targetMouseOffset.current.y - mouseOffset.current.y) * 0.08;

      const rotX = rotation[0] || 0;
      const rotY = rotation[1] || 6.5;
      const posY = position[1] || -0.45;

      groupRef.current.position.y = posY - scrollOffset;
      groupRef.current.rotation.x = rotX + mouseOffset.current.x;
      groupRef.current.rotation.y = rotY + 0.35 * scrollOffset + mouseOffset.current.y;
    }
  });

  return (
    <group ref={groupRef} scale={scale} position={position} rotation={rotation}>
      <primitive object={clonedScene} />
      {showGoggles && (
        <GogglesMesh
          position={gogglesPosition}
          scale={gogglesScale}
          rotation={gogglesRotation}
        />
      )}
    </group>
  );
}

function FallbackBox({ scale = 3.0, position = [0, -0.45, 0] }: { scale?: number; position?: [number, number, number] }) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((state) => {
    if (matRef.current) {
      const t = state.clock.elapsedTime;
      matRef.current.opacity = 0.5 + 0.2 * Math.sin(3 * t);
    }
  });

  return (
    <mesh position={position} scale={0.8 * scale}>
      <boxGeometry args={[1, 1.4, 0.5]} />
      <meshStandardMaterial ref={matRef} color="#a0a0a0" transparent opacity={0.5} roughness={1} />
    </mesh>
  );
}

export interface MarcusAureliusModelProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  showGoggles?: boolean;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  gogglesPosition?: [number, number, number];
  gogglesScale?: [number, number, number];
  gogglesRotation?: [number, number, number];
}

export default function MarcusAureliusModel({
  containerRef,
  className = "",
  showGoggles = false,
  scale = 3.0,
  position = [0, -0.45, 0],
  rotation = [0, 6.5, 0],
  ...props
}: MarcusAureliusModelProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`cursor-pointer w-full h-full relative ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 5]} intensity={1.6} />
        <directionalLight position={[-5, -2, -2]} intensity={0.6} color="#f93434" />
        <Suspense fallback={<FallbackBox scale={scale} position={position} />}>
          <MarcusModel
            containerRef={containerRef}
            scale={scale}
            position={position}
            rotation={rotation}
            showGoggles={showGoggles || hovered}
            {...props}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/3D/marcus_aurelius.glb");
useTexture.preload("/Images/About/Goggles.png");
