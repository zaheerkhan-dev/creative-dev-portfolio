"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAppContext } from "@/context/AppContext";

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const { setIsLoading, isLoading, setIsNavbarOpen } = useAppContext();
  const loaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const digitHundredRef = useRef<HTMLDivElement>(null);
  const digitTenRef = useRef<HTMLDivElement>(null);
  const digitOneRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);

  // Failsafe timer to guarantee page reveals even if browser pauses animation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setIsNavbarOpen(true);
        if (loaderRef.current) {
          loaderRef.current.style.display = "none";
        }
        if (contentRef.current) {
          gsap.set(contentRef.current, { xPercent: 0 });
        }
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [isLoading, setIsLoading, setIsNavbarOpen]);

  useGSAP(
    () => {
      if (!isLoading) {
        if (loaderRef.current) {
          loaderRef.current.style.display = "none";
        }
        if (contentRef.current) {
          gsap.set(contentRef.current, { xPercent: 0 });
        }
        return;
      }

      if (contentRef.current) {
        gsap.set(contentRef.current, { xPercent: 100 });
      }

      const getDigitHeight = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (!ref.current) return window.innerWidth < 768 ? 40 : 60;
        const numEl = ref.current.querySelector<HTMLElement>(".num");
        const h = numEl?.offsetHeight || numEl?.clientHeight || 0;
        return h > 0 ? h : window.innerWidth < 768 ? 40 : 60;
      };

      const getScrollOffset = (ref: React.RefObject<HTMLDivElement | null>, targetIndex: number) => {
        const height = getDigitHeight(ref);
        return { y: -(targetIndex * height) };
      };

      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          setIsNavbarOpen(true);
          if (loaderRef.current) {
            loaderRef.current.style.display = "none";
          }
          if (contentRef.current) {
            gsap.set(contentRef.current, { xPercent: 0 });
          }
        },
      });

      // Phase 1: 0% to ~90%
      tl.to(progressBarRef.current, {
        width: "30%",
        duration: 1.4,
        ease: "power4.inOut",
      })
        .to(
          digitTenRef.current,
          {
            ...getScrollOffset(digitTenRef, 9),
            duration: 1.6,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          digitOneRef.current,
          {
            ...getScrollOffset(digitOneRef, 20),
            duration: 1.4,
            ease: "power2.inOut",
          },
          "<"
        );

      // Phase 2: 90% to 100%
      tl.to(digitHundredRef.current, {
        ...getScrollOffset(digitHundredRef, 1),
        duration: 0.7,
        ease: "power2.inOut",
      })
        .to(
          digitTenRef.current,
          {
            ...getScrollOffset(digitTenRef, 10),
            duration: 0.7,
            ease: "power2.inOut",
          },
          "-=0.6"
        )
        .to(
          progressBarRef.current,
          {
            width: "40%",
            opacity: 0,
            duration: 1.0,
            ease: "power4.out",
          },
          "-=0.3"
        );

      // Phase 3: Screen wipe off to reveal content
      tl.to(
        loaderRef.current,
        {
          xPercent: -100,
          duration: 1.0,
          ease: "power3.inOut",
        },
        "<-=0.3"
      ).to(
        contentRef.current,
        {
          xPercent: 0,
          duration: 1.0,
          ease: "power3.inOut",
        },
        "<"
      );
    },
    { scope: scopeRef, dependencies: [isLoading] }
  );

  return (
    <div ref={scopeRef} className="overflow-hidden">
      {/* Preloader Panel */}
      <div
        ref={loaderRef}
        className="w-[200%] -translate-x-1/2 h-full fixed top-0 left-0 flex bg-foreground text-center items-end justify-end gap-2 p-8 font-bigger-display z-[99]"
      >
        <p className="w-max text-background text-3xl md:text-5xl uppercase">Loading</p>
        <div className="counter h-[40px] md:h-[60px] flex text-5xl md:text-7xl font-light text-background overflow-hidden">
          {/* Hundreds column: 0 -> 1 */}
          <div ref={digitHundredRef} className="digit">
            <div className="num">0</div>
            <div className="num">1</div>
          </div>
          {/* Tens column: 0, 1, ..., 9, 0 */}
          <div ref={digitTenRef} className="digit">
            {Array.from({ length: 10 }).map((_, r) => (
              <div key={r} className="num">
                {r}
              </div>
            ))}
            <div className="num">0</div>
          </div>
          {/* Ones column: 0..9, 0..9, 0 (21 numbers total) */}
          <div ref={digitOneRef} className="digit">
            {Array.from({ length: 21 }).map((_, r) => (
              <div key={r} className="num">
                {r % 10}
              </div>
            ))}
          </div>
          <div className="digit flex items-center">%</div>
        </div>
        <div ref={progressBarRef} className="progress-bar relative top-[-15px] w-0 h-[4px] bg-background" />
      </div>

      {/* Main Content wrapper */}
      <div ref={contentRef} className="overflow-hidden">
        {children}
      </div>
    </div>
  );
}
