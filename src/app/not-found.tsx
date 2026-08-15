"use client";

import React, { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAppContext } from "@/context/AppContext";
import { SplitText } from "@/lib/splitText";

export default function NotFound() {
  const containerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const { isLoading, setIsNotFoundPage } = useAppContext();
  const hasAnimated = useRef(false);
  const isHoverReady = useRef(false);
  const hoverTlRef = useRef<gsap.core.Timeline | null>(null);
  const splitsRef = useRef<SplitText[]>([]);

  useEffect(() => {
    setIsNotFoundPage(true);
    return () => {
      setIsNotFoundPage(false);
      hoverTlRef.current?.kill();
      hoverTlRef.current = null;
      splitsRef.current.forEach((s) => s.revert());
      splitsRef.current = [];
    };
  }, [setIsNotFoundPage]);

  useGSAP(
    () => {
      if (!textContainerRef.current) return;
      const [div1, div2, div3] = Array.from(textContainerRef.current.children) as HTMLElement[];

      if (splitsRef.current.length === 0 && div1 && div2 && div3) {
        splitsRef.current = [
          new SplitText(div1, { type: "chars" }),
          new SplitText(div2, { type: "chars" }),
          new SplitText(div3, { type: "chars" }),
        ];
      }

      if (isLoading || hasAnimated.current) return;
      hasAnimated.current = true;

      const [split1, split2, split3] = splitsRef.current;
      const eyeLid = ".face__eye-lid";
      const pupil = ".face__pupil";

      const introTl = gsap.timeline({
        delay: 0.3,
        ease: "cubic-bezier(0.65, 0, 0.35, 1)",
      });

      introTl
        .fromTo(
          ".face__eyes",
          { transform: "translateY(112.5px)" },
          { transform: "translateY(15px)", duration: 1 },
          0
        )
        .fromTo(
          ".face__nose",
          { transform: "translate(0, 0)" },
          { transform: "translate(0, 22.5px)", duration: 1 },
          0
        )
        .to(
          split1.chars,
          {
            yPercent: -100,
            ease: "power4.out",
            duration: 0.75,
            stagger: { each: 0.025, from: "center" },
          },
          "<"
        )
        .to(
          split2.chars,
          {
            yPercent: -100,
            ease: "power4.out",
            duration: 0.75,
            stagger: { each: 0.025, from: "center" },
            onComplete: () => {
              const hTl = gsap.timeline({ paused: true });
              hTl
                .to(split2.chars, {
                  yPercent: -200,
                  ease: "power4.out",
                  duration: 0.75,
                  stagger: { each: 0.025, from: "center" },
                })
                .to(
                  split3.chars,
                  {
                    yPercent: -100,
                    ease: "power4.out",
                    duration: 0.75,
                    stagger: { each: 0.025, from: "center" },
                  },
                  "<"
                );
              hoverTlRef.current = hTl;
              isHoverReady.current = true;
            },
          },
          "<"
        )
        .fromTo(
          ".face__mouth-left",
          { strokeDashoffset: -102 },
          { strokeDashoffset: 0, duration: 1, ease: "cubic-bezier(0.33, 1, 0.68, 1)" },
          0.5
        )
        .fromTo(
          ".face__mouth-right",
          { strokeDashoffset: 102 },
          { strokeDashoffset: 0, duration: 1, ease: "cubic-bezier(0.33, 1, 0.68, 1)" },
          0.5
        );

      // Blinking & Looking around continuous loop
      const blinkLoop = gsap.timeline({
        repeat: -1,
        delay: 1.3,
        defaults: { ease: "power1.inOut", duration: 0.7 },
      });

      blinkLoop
        .to(pupil, { x: -35, delay: 0.5 })
        .to(pupil, { x: 0, delay: 0.5 })
        .to([eyeLid, pupil], { y: 17.5, duration: 0.1, ease: "power1.out", delay: 0.1 })
        .to(pupil, { strokeDashoffset: 35, duration: 0.1 }, "<")
        .to([eyeLid, pupil], { y: 0, duration: 0.1, ease: "power1.in" })
        .to(pupil, { strokeDashoffset: 0, duration: 0.1 }, "<")
        .to(pupil, { x: -35, delay: 0.7 })
        .to(pupil, { x: 0, delay: 0.7 });

      return () => {
        introTl.kill();
        blinkLoop.kill();
      };
    },
    { scope: containerRef, dependencies: [isLoading] }
  );

  const onMouseEnter = useCallback(() => {
    if (isHoverReady.current && hoverTlRef.current) {
      hoverTlRef.current.play();
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    if (isHoverReady.current && hoverTlRef.current) {
      hoverTlRef.current.reverse();
    }
  }, []);

  return (
    <main
      ref={containerRef}
      className="grid min-h-screen w-full place-items-center bg-background px-4 py-[1.5em] text-foreground transition-colors duration-300 overflow-x-hidden"
    >
      <div className="flex flex-col items-center justify-center gap-8 md:gap-10 max-w-full">
        {/* SVG Animated 404 Face */}
        <svg
          className="block h-auto w-[9em] sm:w-[11em] md:w-[12em]"
          viewBox="0 0 320 380"
          width="320px"
          height="380px"
          aria-label="A 404 becomes a face, looks to the sides, and blinks."
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="25"
          >
            {/* Eyes */}
            <g className="face__eyes" transform="translate(0, 112.5)">
              <g transform="translate(15, 0)">
                <polyline className="face__eye-lid" points="37,0 0,120 75,120" />
                <polyline className="face__pupil" points="55,120 55,155" strokeDasharray="35 35" />
              </g>
              <g transform="translate(230, 0)">
                <polyline className="face__eye-lid" points="37,0 0,120 75,120" />
                <polyline className="face__pupil" points="55,120 55,155" strokeDasharray="35 35" />
              </g>
            </g>

            {/* Nose (0) */}
            <rect
              className="face__nose"
              rx="4"
              ry="4"
              x="132.5"
              y="112.5"
              width="55"
              height="155"
            />

            {/* Smile Mouth */}
            <g strokeDasharray="102 102" transform="translate(65, 334)">
              <path
                className="face__mouth-left"
                d="M 0 30 C 0 30 40 0 95 0"
                strokeDashoffset="-102"
              />
              <path
                className="face__mouth-right"
                d="M 95 0 C 150 0 190 30 190 30"
                strokeDashoffset="102"
              />
            </g>
          </g>
        </svg>

        {/* Rolling Go Back Home Link */}
        <Link href="/" aria-label="Go back home" className="max-w-full">
          <div
            ref={textContainerRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="relative overflow-hidden text-4xl min-[380px]:text-5xl sm:text-7xl md:text-8xl tracking-wide font-bigger-display text-foreground uppercase whitespace-nowrap text-center max-w-full"
          >
            <div>Page Not Found</div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2">
              Go Back Home
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 text-orange">
              Go Back Home
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
