"use client";

import React, { createContext, useContext, useRef, useState, useEffect } from "react";
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

  const PATH_LENGTH = 550;

  // Initialize path stroke dash
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength ? pathRef.current.getTotalLength() : 550;
      pathRef.current.style.strokeDasharray = `${len} ${len}`;
      pathRef.current.style.strokeDashoffset = `${len}`;
    }
  }, []);

  // Enter animation when pathname changes after navigation
  useEffect(() => {
    if (currentPathRef.current !== pathname) {
      currentPathRef.current = pathname;
      runEnterAnimation();
    }
  }, [pathname]);

  const runEnterAnimation = () => {
    const modal = modalRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const blocks = containerRef.current?.querySelectorAll(".transition-slice");

    if (modal && svg && path && blocks && blocks.length > 0) {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.pointerEvents = "auto";
          setIsTransitioning(false);
          isEnteringRef.current = false;
        },
      });

      tl.to(path, {
        strokeDashoffset: -PATH_LENGTH,
        duration: 0.8,
        ease: "power2.inOut",
      })
        .to(svg, { opacity: 0, duration: 0.3 }, ">-0.2")
        .to(modal, { opacity: 0, duration: 0.25, ease: "power2.out" })
        .add(() => {
          gsap.set(blocks, { scaleX: 1.01, transformOrigin: "right" });
        })
        .to(blocks, {
          scaleX: 0,
          duration: 0.4,
          stagger: 0.02,
          ease: "power2.out",
          transformOrigin: "right",
        });
    } else {
      document.body.style.pointerEvents = "auto";
      setIsTransitioning(false);
    }
  };

  const navigate = (href: string) => {
    if (href === pathname || isTransitioning) return;

    setIsTransitioning(true);
    isEnteringRef.current = false;

    const modal = modalRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const blocks = containerRef.current?.querySelectorAll(".transition-slice");

    if (modal && svg && path && blocks && blocks.length > 0) {
      gsap.killTweensOf([blocks, modal, svg, path]);

      gsap.set(path, { strokeDashoffset: PATH_LENGTH });
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

      tl.to(blocks, {
        scaleX: 1.01,
        duration: 0.5,
        stagger: 0.02,
        ease: "power2.out",
        transformOrigin: "left",
      })
        .to(modal, { opacity: 1, duration: 0.1 }, "-=0.1")
        .to(svg, { opacity: 1, duration: 0.1 })
        .to(
          path,
          { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" },
          "-=.2"
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
