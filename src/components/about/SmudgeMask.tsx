"use client";

import React, { useRef, useEffect, useId } from "react";
import gsap from "gsap";

interface SmudgeMaskProps {
  foreground: React.ReactNode;
  background: React.ReactNode;
  className?: string;
}

interface StampedCircle {
  circle: SVGCircleElement;
  radius: { current: number };
  tween?: gsap.core.Tween;
}

export default function SmudgeMask({
  foreground,
  background,
  className = "",
}: SmudgeMaskProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskGroupRef = useRef<SVGGElement>(null);
  const rawId = useId().replace(/:/g, "");
  const gooId = `smudge-goo-${rawId}`;
  const maskId = `smudge-mask-${rawId}`;

  const lastPos = useRef({ x: 0, y: 0 });
  const isInteracting = useRef(false);
  const circlesRef = useRef<StampedCircle[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const maskGroup = maskGroupRef.current;
    if (!container || !maskGroup) return;

    const stampCircle = (x: number, y: number, r: number = 38) => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", x.toString());
      circle.setAttribute("cy", y.toString());
      circle.setAttribute("r", r.toString());
      circle.setAttribute("fill", "white");
      maskGroup.appendChild(circle);

      const item: StampedCircle = {
        circle,
        radius: { current: r },
      };
      circlesRef.current.push(item);
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      const rect = container.getBoundingClientRect();
      const pad = window.innerWidth < 768 ? 112 : 144; // match -inset-28 (7rem=112px) / -inset-36 (9rem=144px)
      const currentX = clientX - rect.left + pad;
      const currentY = clientY - rect.top + pad;

      if (!isInteracting.current) {
        lastPos.current = { x: currentX, y: currentY };
        isInteracting.current = true;
        stampCircle(currentX, currentY);
        return;
      }

      // Interpolate between last and current pos to avoid gaps
      const dx = currentX - lastPos.current.x;
      const dy = currentY - lastPos.current.y;
      const dist = Math.hypot(dx, dy);
      const step = 12;
      const count = Math.floor(dist / step);

      for (let i = 1; i <= count; i++) {
        const t = i / (count + 1);
        const ix = lastPos.current.x + dx * t;
        const iy = lastPos.current.y + dy * t;
        stampCircle(ix, iy);
      }

      stampCircle(currentX, currentY);
      lastPos.current = { x: currentX, y: currentY };
    };

    const dissolveCircles = () => {
      isInteracting.current = false;
      const list = [...circlesRef.current];
      circlesRef.current = [];

      list.forEach((item, idx) => {
        item.tween = gsap.to(item.radius, {
          current: 0,
          duration: 1.5,
          delay: (idx % 12) * 0.02,
          ease: "power2.inOut",
          onUpdate: () => {
            item.circle.setAttribute("r", Math.max(0, item.radius.current).toString());
          },
          onComplete: () => {
            item.circle.remove();
          },
        });
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onMouseEnter = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        dissolveCircles();
      }, 300);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => {
      timeoutRef.current = setTimeout(() => {
        dissolveCircles();
      }, 300);
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full mx-auto flex justify-center items-center text-center select-none cursor-pointer py-10 md:py-16 px-4 -my-10 md:-my-16 ${className}`}
    >
      {/* Foreground Content */}
      <div className="relative w-full h-full z-0 flex flex-col justify-center items-center text-center">
        {foreground}
      </div>

      {/* Secret Background Content revealed by Goo Mask */}
      <div
        className="absolute -inset-28 md:-inset-36 z-10 bg-orange text-[#131212] flex flex-col justify-center items-center text-center pointer-events-none"
        style={{
          mask: `url(#${maskId})`,
          WebkitMask: `url(#${maskId})`,
        }}
      >
        <div className="relative w-full h-full flex flex-col justify-center items-center text-center p-28 md:p-36">
          {background}
        </div>
      </div>

      {/* SVG Gooey Mask Filter Definition */}
      <svg
        className="absolute -inset-28 md:-inset-36 w-[calc(100%+14rem)] md:w-[calc(100%+18rem)] h-[calc(100%+14rem)] md:h-[calc(100%+18rem)] pointer-events-none z-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={gooId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 60 -14"
            />
          </filter>
        </defs>
        <mask id={maskId}>
          <g ref={maskGroupRef} filter={`url(#${gooId})`} fill="white" />
        </mask>
      </svg>
    </div>
  );
}
