"use client";

import React, { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

interface BookInnerProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  glowOrange?: boolean;
}

function BookMesh({
  containerRef,
  position = [0, 0, 0],
  rotation = [0.65, -0.35, 0.15],
  scale = 0.007,
  glowOrange = false,
}: BookInnerProps) {
  const { scene } = useGLTF("/3D/viking_book.glb");
  const groupRef = useRef<THREE.Group>(null);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const mouseOffset = useRef({ x: 0, y: 0 });
  const targetMouseOffset = useRef({ x: 0, y: 0 });

  // Configure materials: Preserve leather cover and enable vibrant additive rune glow on pages
  useEffect(() => {
    clonedScene.traverse((obj) => {
      if ("isMesh" in obj && (obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        
        materials.forEach((mat) => {
          if (!mat) return;
          mat.side = THREE.DoubleSide;

          // Pages & Rune Particles Mesh (Object_1 / lambert5SG)
          if (mesh.name === "Object_3" || mat.name === "lambert5SG" || (mat as any).alphaMode === "BLEND") {
            const stdMat = mat as THREE.MeshStandardMaterial;
            stdMat.transparent = true;
            stdMat.depthWrite = false;
            stdMat.blending = THREE.AdditiveBlending; // Makes glowing runes and floating particles luminous
            
            if (glowOrange) {
              stdMat.color = new THREE.Color("#FF4D00");
              stdMat.emissive = new THREE.Color("#FF4D00");
              stdMat.emissiveIntensity = 3.0;
            } else {
              stdMat.color = new THREE.Color("#00E5FF");
              stdMat.emissive = new THREE.Color("#00E5FF");
              stdMat.emissiveIntensity = 2.2;
            }
          } else {
            // Book cover, leather binding, metal clasp (MeshSG)
            const stdMat = mat as THREE.MeshStandardMaterial;
            stdMat.roughness = 0.5;
            stdMat.metalness = 0.4;
            stdMat.emissive = new THREE.Color(glowOrange ? "#3a1200" : "#001a24");
            stdMat.emissiveIntensity = 0.5;
          }
        });
      }
    });
  }, [clonedScene, glowOrange]);

  // Clean memory on unmount
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

  // Mouse Parallax listener
  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      targetMouseOffset.current = {
        y: 0.45 * ((e.clientX - rect.left) / rect.width - 0.5),
        x: 0.35 * ((e.clientY - rect.top) / rect.height - 0.5),
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

  // Floating bobbing & rotation physics
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseOffset.current.x += (targetMouseOffset.current.x - mouseOffset.current.x) * 0.08;
      mouseOffset.current.y += (targetMouseOffset.current.y - mouseOffset.current.y) * 0.08;

      // Gentle floating bobbing
      const floatY = Math.sin(t * 1.8) * 0.12;
      const floatRotX = Math.sin(t * 1.2) * 0.06;
      const floatRotZ = Math.cos(t * 1.5) * 0.04;

      const baseRotX = rotation[0] || 0.65;
      const baseRotY = rotation[1] || -0.35;
      const baseRotZ = rotation[2] || 0.15;
      const baseY = position[1] || 0;

      groupRef.current.position.y = baseY + floatY;
      groupRef.current.rotation.x = baseRotX + floatRotX + mouseOffset.current.x;
      groupRef.current.rotation.y = baseRotY + mouseOffset.current.y;
      groupRef.current.rotation.z = baseRotZ + floatRotZ;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Center>
        <primitive object={clonedScene} scale={scale} />
      </Center>
    </group>
  );
}

function FallbackBox({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((state) => {
    if (matRef.current) {
      const t = state.clock.elapsedTime;
      matRef.current.opacity = 0.4 + 0.2 * Math.sin(3 * t);
    }
  });

  return (
    <mesh position={position} scale={1.2}>
      <boxGeometry args={[1.2, 0.4, 1.4]} />
      <meshStandardMaterial ref={matRef} color="#00E5FF" transparent opacity={0.4} roughness={0.8} />
    </mesh>
  );
}

export interface EducationBookModelProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  glowOrange?: boolean;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function EducationBookModel({
  containerRef,
  className = "",
  glowOrange = false,
  scale = 0.007,
  position = [0, 0, 0],
  rotation = [0.65, -0.35, 0.15],
}: EducationBookModelProps) {
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
        camera={{ position: [0, 0, 3.0], fov: 45 }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[6, 12, 8]} intensity={1.8} />
        <directionalLight position={[-6, -4, -2]} intensity={1.0} color={glowOrange || hovered ? "#FF4D00" : "#00E5FF"} />
        <pointLight position={[0, 0.8, 0.8]} intensity={glowOrange || hovered ? 3.0 : 2.2} color={glowOrange || hovered ? "#FF4D00" : "#00E5FF"} distance={5} />
        <Suspense fallback={<FallbackBox position={position} />}>
          <BookMesh
            containerRef={containerRef}
            scale={scale}
            position={position}
            rotation={rotation}
            glowOrange={glowOrange || hovered}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/3D/viking_book.glb");
