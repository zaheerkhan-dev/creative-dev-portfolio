"use client";

import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

interface TransitionContextType {
  navigate: (href: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
  navigate: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(TransitionContext);

export default function TransitionRouter({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentPathRef = useRef(pathname);

  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isEnteringRef = useRef(false);

  const getPathLen = useCallback(() => {
    if (pathRef.current && typeof pathRef.current.getTotalLength === "function") {
      try {
        return pathRef.current.getTotalLength();
      } catch {
        return 530;
      }
    }
    return 530;
  }, []);

  // Initialize path stroke dash
  useEffect(() => {
    if (pathRef.current) {
      const len = getPathLen();
      pathRef.current.style.strokeDasharray = `${len} ${len}`;
      pathRef.current.style.strokeDashoffset = `${len}`;
    }
  }, [getPathLen]);

  const runEnterAnimation = useCallback(() => {
    const modal = modalRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const blocks = containerRef.current?.querySelectorAll(".transition-slice");

    if (modal && svg && path && blocks && blocks.length > 0) {
      const len = getPathLen();
      gsap.killTweensOf([blocks, modal, svg, path]);

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.pointerEvents = "auto";
          setIsTransitioning(false);
          isEnteringRef.current = false;
        },
      });

      // 1. Symmetrically Draw "Z" path out (0.7s duration matching Draw In)
      tl.to(path, {
        strokeDashoffset: -len,
        duration: 0.7,
        ease: "power2.inOut",
      })
        // 2. Smoothly fade modal after stroke reaches completion
        .to(svg, { opacity: 0, duration: 0.2 }, "-=0.1")
        .to(modal, { opacity: 0, duration: 0.2 }, "<")
        // 3. Open 25-slice curtain smoothly from right to left
        .add(() => {
          gsap.set(blocks, { scaleX: 1.01, transformOrigin: "right" });
        })
        .to(blocks, {
          scaleX: 0,
          duration: 0.45,
          stagger: 0.015,
          ease: "power2.inOut",
          transformOrigin: "right",
        });
    } else {
      document.body.style.pointerEvents = "auto";
      setIsTransitioning(false);
    }
  }, [getPathLen]);

  // Enter animation when pathname changes after navigation
  useEffect(() => {
    if (currentPathRef.current !== pathname) {
      currentPathRef.current = pathname;
      requestAnimationFrame(() => {
        runEnterAnimation();
      });
    }
  }, [pathname, runEnterAnimation]);

  const navigate = (href: string) => {
    if (href === pathname || isTransitioning) return;

    setIsTransitioning(true);
    isEnteringRef.current = false;

    const modal = modalRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const blocks = containerRef.current?.querySelectorAll(".transition-slice");

    if (modal && svg && path && blocks && blocks.length > 0) {
      const len = getPathLen();
      gsap.killTweensOf([blocks, modal, svg, path]);

      gsap.set(path, { strokeDasharray: `${len} ${len}`, strokeDashoffset: len });
      gsap.set(svg, { opacity: 0 });
      gsap.set(modal, { opacity: 0 });
      gsap.set(blocks, { scaleX: 0, transformOrigin: "left" });

      const tl = gsap.timeline({
        onStart: () => {
          document.body.style.pointerEvents = "none";
        },
        onComplete: () => {
          router.push(href);
        },
      });

      // 1. Close curtain across the screen
      tl.to(blocks, {
        scaleX: 1.01,
        duration: 0.45,
        stagger: 0.015,
        ease: "power2.inOut",
        transformOrigin: "left",
      })
        // 2. Fade in modal & draw "Z" in with smooth symmetrical timing (0.7s)
        .to(modal, { opacity: 1, duration: 0.15 }, "-=0.2")
        .to(svg, { opacity: 1, duration: 0.15 }, "<")
        .to(
          path,
          { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" },
          "-=0.1"
        );
    } else {
      router.push(href);
    }
  };

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning }}>
      <div ref={containerRef}>
        {/* 25 Column Vertical Slices */}
        <div className="fixed top-0 left-0 w-screen h-lvh flex z-[98] pointer-events-none">
          {Array.from({ length: 25 }).map((_, r) => (
            <div
              key={r}
              className="transition-slice block flex-1 h-full bg-foreground scale-x-0 origin-left not-first:-ml-[1px]"
            />
          ))}
        </div>

        {/* Center Signature Overlay */}
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
                ref={pathRef}
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
    </TransitionContext.Provider>
  );
}
