"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface ParticleCanvasProps {
  img?: string;
  mixBlend?: boolean;
}

interface Particle {
  originX: number;
  originY: number;
  velocityX: number;
  velocityY: number;
}

const VERTEX_SHADER_SRC = `
  precision highp float;
  uniform vec2 u_resolution;
  attribute vec2 a_position;
  attribute vec4 a_color;
  varying vec4 v_color;
  void main() {
      vec2 zeroToOne = a_position / u_resolution;
      vec2 clipSpace = (zeroToOne * 2.0 - 1.0);
      v_color = a_color;
      gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);
      gl_PointSize = 3.5;
  }
`;

const FRAGMENT_SHADER_SRC = `
  precision highp float;
  varying vec4 v_color;
  void main() {
      if (v_color.a < 0.01) discard;
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      float alpha = 1.0 - smoothstep(0.0, 0.4, dist);
      gl_FragColor = vec4(v_color.rgb, min(1.0, v_color.a * alpha * 2.0));
  }
`;

export default function ParticleCanvas({
  img = "/Images/Home/Home_Particle_Text.webp",
  mixBlend = true,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const posBufferRef = useRef<WebGLBuffer | null>(null);
  const colorBufferRef = useRef<WebGLBuffer | null>(null);
  const posArrayRef = useRef<Float32Array | null>(null);
  const rafRef = useRef<number | null>(null);
  const framesRemainingRef = useRef<number>(300);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const lastTimeRef = useRef<number>(0);
  const vaoRef = useRef<any>(null);
  const vaoExtRef = useRef<any>(null);
  const wakeLoopRef = useRef<(() => void) | null>(null);

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.display = isHomePage ? "block" : "none";
      if (isHomePage) {
        framesRemainingRef.current = 300;
        wakeLoopRef.current?.();
      }
    }
  }, [isHomePage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isCancelled = false;

    const config = {
      logoPath: img,
      logoSize: isMobile ? 600 : 750,
      particleDensity: 1.5,
      distortionRadius: 2500,
      forceStrength: 0.001,
      maxDisplacement: 50,
      returnForce: 0.04,
    };

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader Compile Error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const render = () => {
      const gl = glRef.current;
      const program = programRef.current;
      if (!gl || !program || particlesRef.current.length === 0) return;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      const uRes = gl.getUniformLocation(program, "u_resolution");
      gl.uniform2f(uRes, canvas.width, canvas.height);

      if (vaoExtRef.current && vaoRef.current) {
        vaoExtRef.current.bindVertexArrayOES(vaoRef.current);
        gl.drawArrays(gl.POINTS, 0, particlesRef.current.length);
        vaoExtRef.current.bindVertexArrayOES(null);
      } else {
        const aPos = gl.getAttribLocation(program, "a_position");
        gl.bindBuffer(gl.ARRAY_BUFFER, posBufferRef.current);
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        const aCol = gl.getAttribLocation(program, "a_color");
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferRef.current);
        gl.enableVertexAttribArray(aCol);
        gl.vertexAttribPointer(aCol, 4, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.POINTS, 0, particlesRef.current.length);
      }
    };

    const updatePhysics = (deltaTimeSec: number) => {
      const dt = Math.min(2, deltaTimeSec / (1 / 60));
      const particles = particlesRef.current;
      const positions = posArrayRef.current;
      if (!positions) return;

      const radiusSq = config.distortionRadius * config.distortionRadius;
      const mouse = mousePosRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const curX = positions[2 * i];
        const curY = positions[2 * i + 1];

        const dx = mouse.x - curX;
        const dy = mouse.y - curY;
        const distSq = dx * dx + dy * dy;

        if (distSq < radiusSq && distSq > 0) {
          const force = -radiusSq / distSq;
          const angle = Math.atan2(dy, dx);
          const dispFromOrigin = Math.sqrt(
            (curX - p.originX) ** 2 + (curY - p.originY) ** 2
          );
          const proximity = Math.max(
            0.1,
            1 - dispFromOrigin / (2 * config.maxDisplacement)
          );

          p.velocityX +=
            force * Math.cos(angle) * config.forceStrength * proximity * dt;
          p.velocityY +=
            force * Math.sin(angle) * config.forceStrength * proximity * dt;
        }

        // Velocity damping
        const damp = Math.pow(0.82, dt);
        p.velocityX *= damp;
        p.velocityY *= damp;

        // Spring return force
        const returnEase = 1 - Math.pow(1 - config.returnForce, dt);
        const nextX = curX + p.velocityX + (p.originX - curX) * returnEase;
        const nextY = curY + p.velocityY + (p.originY - curY) * returnEase;

        const offsetX = nextX - p.originX;
        const offsetY = nextY - p.originY;
        const offsetDistSq = offsetX * offsetX + offsetY * offsetY;

        if (offsetDistSq > config.maxDisplacement * config.maxDisplacement) {
          const offsetDist = Math.sqrt(offsetDistSq);
          const factor = config.maxDisplacement / offsetDist;
          positions[2 * i] = p.originX + offsetX * factor;
          positions[2 * i + 1] = p.originY + offsetY * factor;
          p.velocityX *= 0.7;
          p.velocityY *= 0.7;
        } else {
          positions[2 * i] = nextX;
          positions[2 * i + 1] = nextY;
        }
      }

      const gl = glRef.current;
      if (gl && posBufferRef.current) {
        gl.bindBuffer(gl.ARRAY_BUFFER, posBufferRef.current);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, positions);
      }
    };

    const animateLoop = (timestamp: number) => {
      if (isCancelled) return;
      if (lastTimeRef.current === 0) lastTimeRef.current = timestamp;
      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      if (framesRemainingRef.current > 0) {
        framesRemainingRef.current--;
        updatePhysics(deltaTime);
        render();
        rafRef.current = requestAnimationFrame(animateLoop);
      } else {
        rafRef.current = null;
      }
    };

    const wakeLoop = () => {
      if (rafRef.current === null && !isCancelled) {
        lastTimeRef.current = 0;
        rafRef.current = requestAnimationFrame(animateLoop);
      }
    };
    wakeLoopRef.current = wakeLoop;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      mousePosRef.current.x = (clientX - rect.left) * dpr;
      mousePosRef.current.y = (clientY - rect.top) * dpr;
      framesRemainingRef.current = 300;
      wakeLoop();
    };

    const handlePointerLeave = () => {
      mousePosRef.current.x = -9999;
      mousePosRef.current.y = -9999;
      framesRemainingRef.current = 300;
      wakeLoop();
    };

    const handleWindowResize = () => {
      const oldCenterX = canvas.width / 2;
      const oldCenterY = canvas.height / 2;
      updateSize();

      const particles = particlesRef.current;
      const positions = posArrayRef.current;
      if (particles.length > 0 && positions) {
        const newCenterX = canvas.width / 2;
        const newCenterY = canvas.height / 2;
        const deltaX = newCenterX - oldCenterX;
        const deltaY = newCenterY - oldCenterY;

        for (let i = 0; i < particles.length; i++) {
          particles[i].originX += deltaX;
          particles[i].originY += deltaY;
          positions[2 * i] += deltaX;
          positions[2 * i + 1] += deltaY;
        }

        const gl = glRef.current;
        if (gl && posBufferRef.current) {
          gl.bindBuffer(gl.ARRAY_BUFFER, posBufferRef.current);
          gl.bufferSubData(gl.ARRAY_BUFFER, 0, positions);
          render();
        }
      }
    };

    // Initialize WebGL context
    updateSize();
    const gl = canvas.getContext("webgl", {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      powerPreference: "high-performance",
      premultipliedAlpha: false,
    });

    if (!gl) return;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    glRef.current = gl;

    // Create Shaders & Program
    const vertShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    const program = gl.createProgram();

    if (vertShader && fragShader && program) {
      gl.attachShader(program, vertShader);
      gl.attachShader(program, fragShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program Link Error:", gl.getProgramInfoLog(program));
        return;
      }
      programRef.current = program;

      const processImage = (imgElement: HTMLImageElement) => {
        if (isCancelled) return;
        const offCanvas = document.createElement("canvas");
        const offCtx = offCanvas.getContext("2d");
        if (!offCtx) return;

        offCanvas.width = config.logoSize;
        offCanvas.height = config.logoSize;
        const drawSize = config.logoSize * 0.9;
        const drawOffset = (config.logoSize - drawSize) / 2;
        offCtx.drawImage(imgElement, drawOffset, drawOffset, drawSize, drawSize);

        const imgData = offCtx.getImageData(0, 0, config.logoSize, config.logoSize).data;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2 + 50;

        const posList: number[] = [];
        const colorList: number[] = [];
        const particleList: Particle[] = [];
        const step = config.particleDensity;

        for (let y = 0; y < config.logoSize; y += step) {
          for (let x = 0; x < config.logoSize; x += step) {
            const idx = (Math.floor(y) * config.logoSize + Math.floor(x)) * 4;
            if (imgData[idx + 3] > 10) {
              const px = centerX + (x - config.logoSize / 2);
              const py = centerY + (y - config.logoSize / 2);
              posList.push(px, py);

              const r = imgData[idx] / 255;
              const g = imgData[idx + 1] / 255;
              const b = imgData[idx + 2] / 255;
              colorList.push(r, g, b, 1);

              particleList.push({
                originX: px,
                originY: py,
                velocityX: 0,
                velocityY: 0,
              });
            }
          }
        }

        particlesRef.current = particleList;
        posArrayRef.current = new Float32Array(posList);
        const colArray = new Float32Array(colorList);

        // Upload to GPU Buffers
        const posBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
        gl.bufferData(gl.ARRAY_BUFFER, posArrayRef.current, gl.DYNAMIC_DRAW);
        posBufferRef.current = posBuf;

        const colBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colBuf);
        gl.bufferData(gl.ARRAY_BUFFER, colArray, gl.STATIC_DRAW);
        colorBufferRef.current = colBuf;

        // Try VAO extension
        const vaoExt = gl.getExtension("OES_vertex_array_object");
        if (vaoExt) {
          vaoExtRef.current = vaoExt;
          const vao = vaoExt.createVertexArrayOES();
          vaoExt.bindVertexArrayOES(vao);

          const aPos = gl.getAttribLocation(program, "a_position");
          gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
          gl.enableVertexAttribArray(aPos);
          gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

          const aCol = gl.getAttribLocation(program, "a_color");
          gl.bindBuffer(gl.ARRAY_BUFFER, colBuf);
          gl.enableVertexAttribArray(aCol);
          gl.vertexAttribPointer(aCol, 4, gl.FLOAT, false, 0, 0);

          vaoExt.bindVertexArrayOES(null);
          vaoRef.current = vao;
        }

        framesRemainingRef.current = 300;
        render();
        wakeLoopRef.current?.();
      };

      // Load image and handle both fresh load and cached image
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => processImage(image);
      image.src = config.logoPath;

      if (image.complete && image.naturalWidth > 0) {
        processImage(image);
      }

      // Start animation loop
      lastTimeRef.current = 0;
      framesRemainingRef.current = 300;
      rafRef.current = requestAnimationFrame(animateLoop);

      if (isMobile) {
        document.addEventListener("touchstart", handlePointerMove, { passive: false });
        document.addEventListener("touchmove", handlePointerMove, { passive: false });
        document.addEventListener("touchend", handlePointerLeave);
      } else {
        document.addEventListener("mousemove", handlePointerMove);
        document.addEventListener("mouseleave", handlePointerLeave);
      }

      window.addEventListener("resize", handleWindowResize);

      return () => {
        isCancelled = true;
        if (isMobile) {
          document.removeEventListener("touchstart", handlePointerMove);
          document.removeEventListener("touchmove", handlePointerMove);
          document.removeEventListener("touchend", handlePointerLeave);
        } else {
          document.removeEventListener("mousemove", handlePointerMove);
          document.removeEventListener("mouseleave", handlePointerLeave);
        }

        window.removeEventListener("resize", handleWindowResize);
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        wakeLoopRef.current = null;

        const currentGl = glRef.current;
        if (currentGl) {
          if (vaoRef.current && vaoExtRef.current) {
            vaoExtRef.current.deleteVertexArrayOES(vaoRef.current);
            vaoRef.current = null;
          }
          if (posBufferRef.current) {
            currentGl.deleteBuffer(posBufferRef.current);
            posBufferRef.current = null;
          }
          if (colorBufferRef.current) {
            currentGl.deleteBuffer(colorBufferRef.current);
            colorBufferRef.current = null;
          }
          if (programRef.current) {
            currentGl.deleteProgram(programRef.current);
            programRef.current = null;
          }
        }
      };
    }
  }, [isMobile, img]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full z-10 pointer-events-none ${
        mixBlend ? "mix-blend-difference" : ""
      }`}
    />
  );
}
