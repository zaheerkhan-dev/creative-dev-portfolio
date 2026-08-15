"use client";

import React, { useRef } from "react";
import gsap from "gsap";

interface TransitionLayoutProps {
  children: React.ReactNode;
}

export default function TransitionLayout({ children }: TransitionLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <div ref={containerRef}>
      {/* 25 Column Screen Curtain */}
      <div className="fixed top-0 left-0 w-screen h-lvh flex z-[98] pointer-events-none">
        {Array.from({ length: 25 }).map((_, r) => (
          <div
            key={r}
            className="block flex-1 h-full bg-foreground scale-x-0 origin-left not-first:-ml-[1px]"
          />
        ))}
      </div>

      {/* Center Signature Transition Modal */}
      <div
        ref={modalRef}
        className="fixed top-0 left-0 w-screen h-svh flex justify-center items-center bg-foreground pointer-events-none opacity-0 z-[99]"
      >
        <div className="w-70 h-70 md:w-90 md:h-90 flex justify-center items-center p-[20px]">
          <svg
            ref={svgRef}
            viewBox="0 0 500 500"
            className="w-full h-full fill-none"
          >
            <path
              d="M 175 165 L 325 165 L 175 335 L 325 335"
              className="fill-none stroke-background stroke-[50]"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
}
