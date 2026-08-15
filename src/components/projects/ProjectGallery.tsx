"use client";

import React, { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { ProjectImage } from "@/data/projectsData";

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform vec2 uOffset;
uniform vec2 uResolution;
uniform vec4 uBackgroundColor;
uniform float uZoom;
uniform float uCellSize;
uniform float uTextureCount;
uniform sampler2D uImageAtlas;

varying vec2 vUv;

void main() {
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 uv = (vUv * 2.0 - 1.0) * aspect;

    // Organic barrel / fish-eye distortion
    float r = length(uv);
    float distortion = 1.0 - 0.04 * r * r;
    vec2 distortedUV = uv * distortion;

    // Cell positioning and tiling
    vec2 cellCoord = (distortedUV * uZoom + uOffset) / vec2(uCellSize, uCellSize * 0.5625);
    vec2 cellId = floor(cellCoord);
    vec2 cellUV = fract(cellCoord);

    vec3 backgroundColor = uBackgroundColor.rgb;

    // Larger 16:9 Image size inside cell (93% width, equal pixel gaps)
    vec2 imageSize = vec2(0.93, 0.8496);
    vec2 imageBorder = (vec2(1.0) - imageSize) * 0.5;

    vec2 imageUV = (cellUV - imageBorder) / imageSize;

    float edgeSmooth = 0.003;
    vec2 imageMask = smoothstep(-edgeSmooth, edgeSmooth, imageUV) *
                    smoothstep(-edgeSmooth, edgeSmooth, 1.0 - imageUV);
    float imageAlpha = imageMask.x * imageMask.y;

    bool inImageArea = imageUV.x >= 0.0 && imageUV.x <= 1.0 && imageUV.y >= 0.0 && imageUV.y <= 1.0;

    // Organic screen boundary dissolve factor (top and bottom shadows only)
    float fadeY = smoothstep(0.0, 0.16, vUv.y) * smoothstep(1.0, 0.84, vUv.y);
    float screenDissolve = fadeY;

    // Apply smooth dissolve directly to the image texture alpha so images dissolve into background
    float finalAlpha = imageAlpha * screenDissolve;

    // Non-negative modulo index wrapping for seamless 4x4 infinite grid looping
    float rawIndex = mod(cellId.x + cellId.y * 3.0, uTextureCount);
    float texIndex = rawIndex < 0.0 ? rawIndex + uTextureCount : rawIndex;

    vec3 color = backgroundColor;

    if (inImageArea && finalAlpha > 0.0) {
        float atlasSize = ceil(sqrt(uTextureCount));
        vec2 atlasPos = vec2(mod(texIndex, atlasSize), floor(texIndex / atlasSize));
        vec2 atlasUV = (atlasPos + imageUV) / atlasSize;
        atlasUV.y = 1.0 - atlasUV.y;

        vec3 imageColor = texture2D(uImageAtlas, atlasUV).rgb;
        color = mix(backgroundColor, imageColor, finalAlpha);
    }

    gl_FragColor = vec4(color, 1.0);
}
`;

interface ProjectGalleryProps {
  images: ProjectImage[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Distribute 16 gallery tile items
  const galleryItems = useMemo(() => {
    if (!images || images.length === 0) return [];
    if (images.length === 1) return Array(16).fill(images[0].url);

    const result: string[] = [];
    while (result.length < 16) {
      images.forEach((img) => {
        if (result.length < 16) result.push(img.url);
      });
    }
    return result.slice(0, 16);
  }, [images]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || galleryItems.length === 0) return;

    let isDragging = false;
    let isClick = true;
    let dragStartTime = 0;
    const lastPos = { x: 0, y: 0 };
    const curPos = { x: 0, y: 0 };
    const targetPos = { x: 0, y: 0 };

    const getBaseZoom = () => (window.innerWidth < 768 ? 1.25 : 1.0);
    let curZoom = getBaseZoom();
    let targetZoom = curZoom;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(new THREE.Color(0x131212), 1);
    container.appendChild(renderer.domElement);

    let mesh: THREE.Mesh | null = null;
    const textures: THREE.Texture[] = [];
    const loader = new THREE.TextureLoader();
    let loadedCount = 0;

    galleryItems.forEach((url) => {
      const tex = loader.load(url, () => {
        loadedCount++;
        if (loadedCount === galleryItems.length) {
          // Generate Texture Atlas on 2D Canvas
          const atlasGridSize = Math.ceil(Math.sqrt(textures.length));
          const atlasCanvas = document.createElement("canvas");
          atlasCanvas.width = atlasCanvas.height = Math.max(1024, 1024 * atlasGridSize);
          const ctx = atlasCanvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "#131212";
            ctx.fillRect(0, 0, atlasCanvas.width, atlasCanvas.height);

            textures.forEach((t, i) => {
              const imgEl = t.image as CanvasImageSource | undefined;
              if (imgEl) {
                const row = Math.floor(i / atlasGridSize);
                const col = i % atlasGridSize;
                ctx.drawImage(imgEl, col * 1024, row * 1024, 1024, 1024);
              }
            });
          }

          const atlasTex = new THREE.CanvasTexture(atlasCanvas);
          atlasTex.wrapS = THREE.ClampToEdgeWrapping;
          atlasTex.wrapT = THREE.ClampToEdgeWrapping;
          atlasTex.minFilter = THREE.LinearFilter;
          atlasTex.magFilter = THREE.LinearFilter;
          atlasTex.flipY = false;

          const uniforms = {
            uOffset: { value: new THREE.Vector2(0, 0) },
            uResolution: { value: new THREE.Vector2(container.offsetWidth, container.offsetHeight) },
            uBackgroundColor: { value: new THREE.Vector4(0.0745, 0.0706, 0.0706, 1.0) },
            uZoom: { value: curZoom },
            uCellSize: { value: 1.52 },
            uTextureCount: { value: galleryItems.length },
            uImageAtlas: { value: atlasTex },
          };

          const geometry = new THREE.PlaneGeometry(2, 2);
          const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms,
          });

          mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
        }
      });

      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      textures.push(tex);
    });

    const startDrag = (x: number, y: number) => {
      isDragging = true;
      isClick = true;
      dragStartTime = Date.now();
      container.style.cursor = "grabbing";
      lastPos.x = x;
      lastPos.y = y;
      setTimeout(() => {
        if (isDragging) targetZoom = 1.06 * getBaseZoom();
      }, 150);
    };

    const onMouseDown = (e: MouseEvent) => startDrag(e.clientX, e.clientY);
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) startDrag(e.touches[0].clientX, e.touches[0].clientY);
    };

    const moveDrag = (x: number, y: number) => {
      if (!isDragging) return;
      const dx = x - lastPos.x;
      const dy = y - lastPos.y;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        isClick = false;
        targetZoom = 1.06 * getBaseZoom();
      }
      targetPos.x -= 0.003 * dx;
      targetPos.y += 0.003 * dy;
      lastPos.x = x;
      lastPos.y = y;
    };

    const onMouseMove = (e: MouseEvent) => moveDrag(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    };

    const endDrag = () => {
      isDragging = false;
      container.style.cursor = "grab";
      targetZoom = getBaseZoom();
    };

    const onResize = () => {
      if (!container) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h);
      if (mesh) {
        const mat = mesh.material as THREE.ShaderMaterial;
        mat.uniforms.uResolution.value.set(w, h);
        targetZoom = getBaseZoom();
      }
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", endDrag);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", endDrag);
    window.addEventListener("resize", onResize);
    container.style.cursor = "grab";

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      curPos.x += (targetPos.x - curPos.x) * 0.075;
      curPos.y += (targetPos.y - curPos.y) * 0.075;
      curZoom += (targetZoom - curZoom) * 0.075;

      if (mesh) {
        const mat = mesh.material as THREE.ShaderMaterial;
        mat.uniforms.uOffset.value.set(curPos.x, curPos.y);
        mat.uniforms.uZoom.value = curZoom;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", endDrag);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", endDrag);
      window.removeEventListener("resize", onResize);

      if (mesh) {
        const mat = mesh.material as THREE.ShaderMaterial;
        mat.uniforms.uImageAtlas?.value?.dispose();
        mesh.geometry.dispose();
        mat.dispose();
      }
      textures.forEach((t) => t.dispose());
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [galleryItems]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none bg-[#131212]"
    />
  );
}
