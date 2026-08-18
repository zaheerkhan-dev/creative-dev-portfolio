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

      const getDigitHeight = () => {
        if (digitHundredRef.current) {
          const num = digitHundredRef.current.querySelector<HTMLElement>(".num");
          if (num && num.offsetHeight > 0) {
            return num.offsetHeight;
          }
        }
        return window.innerWidth < 768 ? 56 : 80;
      };

      const getScrollOffset = (targetIndex: number) => {
        const height = getDigitHeight();
        return { y: -(targetIndex * height) };
      };

      const isMobile = window.innerWidth < 768;
      const targetWidth1 = isMobile ? "60px" : "200px";
      const targetWidth2 = isMobile ? "100px" : "280px";

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
        width: targetWidth1,
        duration: 1.4,
        ease: "power4.inOut",
      })
        .to(
          digitTenRef.current,
          {
            ...getScrollOffset(9),
            duration: 1.6,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          digitOneRef.current,
          {
            ...getScrollOffset(20),
            duration: 1.4,
            ease: "power2.inOut",
          },
          "<"
        );

      // Phase 2: 90% to 100%
      tl.to(digitHundredRef.current, {
        ...getScrollOffset(1),
        duration: 0.7,
        ease: "power2.inOut",
      })
        .to(
          digitTenRef.current,
          {
            ...getScrollOffset(10),
            duration: 0.7,
            ease: "power2.inOut",
          },
          "-=0.6"
        )
        .to(
          progressBarRef.current,
          {
            width: targetWidth2,
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
        className="w-full h-full fixed inset-0 bg-foreground font-bigger-display z-[99] overflow-hidden"
      >
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 flex items-end gap-2 sm:gap-3 max-w-[calc(100vw-3rem)]">
          <p className="w-max text-background text-2xl sm:text-3xl md:text-5xl uppercase leading-none pb-2 sm:pb-3 md:pb-4">
            Loading
          </p>
          <div className="counter h-[56px] md:h-[80px] flex text-4xl sm:text-5xl md:text-7xl font-light text-background overflow-hidden leading-[56px] md:leading-[80px]">
            {/* Hundreds column: 0 -> 1 */}
            <div ref={digitHundredRef} className="digit">
              <div className="num h-[56px] md:h-[80px] flex items-center justify-center">0</div>
              <div className="num h-[56px] md:h-[80px] flex items-center justify-center">1</div>
            </div>
            {/* Tens column: 0, 1, ..., 9, 0 */}
            <div ref={digitTenRef} className="digit">
              {Array.from({ length: 10 }).map((_, r) => (
                <div key={r} className="num h-[56px] md:h-[80px] flex items-center justify-center">
                  {r}
                </div>
              ))}
              <div className="num h-[56px] md:h-[80px] flex items-center justify-center">0</div>
            </div>
            {/* Ones column: 0..9, 0..9, 0 (21 numbers total) */}
            <div ref={digitOneRef} className="digit">
              {Array.from({ length: 21 }).map((_, r) => (
                <div key={r} className="num h-[56px] md:h-[80px] flex items-center justify-center">
                  {r % 10}
                </div>
              ))}
            </div>
            <div className="digit flex items-center justify-center h-[56px] md:h-[80px] leading-[56px] md:leading-[80px]">%</div>
          </div>
          <div
            ref={progressBarRef}
            className="progress-bar relative top-[-14px] md:top-[-20px] w-0 h-[3px] md:h-[4px] bg-background shrink-0"
          />
        </div>
      </div>

      {/* Main Content wrapper */}
      <div ref={contentRef} className="overflow-hidden">
        {children}
      </div>
    </div>
  );
}
