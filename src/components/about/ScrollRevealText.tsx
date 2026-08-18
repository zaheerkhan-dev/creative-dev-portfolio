"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "@/lib/splitText";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealTextProps {
  children: React.ReactNode;
  colorInitial?: string;
  colorAccent?: string;
  colorFinal?: string;
  triggerStart?: string;
  triggerEnd?: string;
  markers?: boolean;
  inverse?: boolean;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function ScrollRevealText({
  children,
  colorInitial = "#555555",
  colorAccent,
  colorFinal,
  triggerStart = "top bottom",
  triggerEnd = "top 25%",
  markers = false,
  inverse = false,
  triggerRef,
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const splitsRef = useRef<SplitText[]>([]);
  const lastProgressRef = useRef(0);
  const timeoutsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());
  const animatedSetRef = useRef<Set<number>>(new Set());
  const triggerInstanceRef = useRef<ScrollTrigger | null>(null);

  const accentColor = colorAccent || (inverse ? "#f2f2f2" : "#f93434");
  const finalColor = colorFinal || (inverse ? "#121212" : "#f2f2f2");

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // Clean up previous
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current.clear();
      animatedSetRef.current.clear();
      if (triggerInstanceRef.current) {
        triggerInstanceRef.current.kill();
        triggerInstanceRef.current = null;
      }
      splitsRef.current.forEach((s) => s.revert());
      splitsRef.current = [];
      lastProgressRef.current = 0;

      const targetElements: HTMLElement[] = container.hasAttribute("data-copy-wrapper")
        ? (Array.from(container.children) as HTMLElement[])
        : [container];

      const allChars: HTMLElement[] = [];
      targetElements.forEach((el) => {
        const existingChars = Array.from(
          el.querySelectorAll<HTMLElement>(".char-span, .char")
        );
        if (existingChars.length > 0) {
          allChars.push(...existingChars);
        } else {
          const split = SplitText.create(el, {
            type: "chars",
            wordsClass: "word",
            charsClass: "char",
          });
          splitsRef.current.push(split);
          allChars.push(...split.chars);
        }
      });

      gsap.set(allChars, { color: colorInitial });

      const triggerEl = triggerRef?.current || container;

      triggerInstanceRef.current = ScrollTrigger.create({
        trigger: triggerEl,
        start: triggerStart,
        end: triggerEnd,
        markers,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const total = allChars.length;
          const isForward = progress >= lastProgressRef.current;
          const activeIndex = Math.floor(progress * total);
          const lastActiveIndex = Math.floor(lastProgressRef.current * total);

          // Only process the range of chars that changed, not all chars
          let rangeStart: number, rangeEnd: number;
          if (progress >= 0.98) {
            rangeStart = 0;
            rangeEnd = total - 1;
          } else if (isForward) {
            rangeStart = Math.max(0, lastActiveIndex - 3);
            rangeEnd = Math.min(total - 1, activeIndex + 1);
          } else {
            rangeStart = Math.max(0, activeIndex);
            rangeEnd = Math.min(total - 1, lastActiveIndex + 1);
          }

          for (let idx = rangeStart; idx <= rangeEnd; idx++) {
            const charEl = allChars[idx];

            if (!isForward && idx >= activeIndex) {
              if (timeoutsRef.current.has(idx)) {
                clearTimeout(timeoutsRef.current.get(idx)!);
                timeoutsRef.current.delete(idx);
              }
              animatedSetRef.current.delete(idx);
              gsap.set(charEl, { color: colorInitial });
              continue;
            }

            if (!animatedSetRef.current.has(idx)) {
              if (idx <= activeIndex) {
                if (idx < activeIndex - 2 || progress >= 0.98) {
                  gsap.set(charEl, { color: finalColor });
                  animatedSetRef.current.add(idx);
                } else {
                  gsap.set(charEl, { color: accentColor });
                  if (!timeoutsRef.current.has(idx)) {
                    const t = setTimeout(() => {
                      if (!animatedSetRef.current.has(idx)) {
                        gsap.to(charEl, {
                          duration: 0.1,
                          ease: "none",
                          color: finalColor,
                          onComplete: () => {
                            animatedSetRef.current.add(idx);
                          },
                        });
                      }
                      timeoutsRef.current.delete(idx);
                    }, 100);
                    timeoutsRef.current.set(idx, t);
                  }
                }
              } else {
                gsap.set(charEl, { color: colorInitial });
              }
            }
          }

          lastProgressRef.current = progress;
        },
      });

      return () => {
        timeoutsRef.current.forEach((t) => clearTimeout(t));
        timeoutsRef.current.clear();
        animatedSetRef.current.clear();
        if (triggerInstanceRef.current) {
          triggerInstanceRef.current.kill();
          triggerInstanceRef.current = null;
        }
        splitsRef.current.forEach((s) => s.revert());
      };
    },
    {
      scope: containerRef,
      dependencies: [colorInitial, accentColor, finalColor, triggerStart, triggerEnd, triggerRef],
    }
  );

  if (React.Children.count(children) === 1 && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ref: containerRef,
    });
  }

  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>} data-copy-wrapper="true">
      {children}
    </div>
  );
}
