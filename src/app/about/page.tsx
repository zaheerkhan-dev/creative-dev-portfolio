"use client";

import React, { useRef } from "react";
import Image from "next/image";
import SmudgeMask from "@/components/about/SmudgeMask";
import ServicesSection from "@/components/about/ServicesSection";
import WhatTheySaid from "@/components/about/WhatTheySaid";
import ScrollRevealText from "@/components/about/ScrollRevealText";
import MarcusAureliusModel from "@/components/about/MarcusAureliusModel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroPathRef = useRef<SVGPathElement>(null);
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);

  // Hero SVG organic curve morphing animation on scroll
  useGSAP(
    () => {
      const heroPath = heroPathRef.current;
      const section = sectionRef.current;
      if (!heroPath || !section) return;

      gsap.to(heroPath, {
        attr: {
          d: "M 0,0 L 1,0 L 1,1 Q 0.7,1 0.4,1 Q 0.15,1 0,1 Z",
        },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "50% bottom",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="about-section w-full min-h-screen text-foreground text-center"
    >
      {/* ─────────────────────────────────────────────────────────────
          Hero Section with SVG Organic Bottom Wave Morphing
         ───────────────────────────────────────────────────────────── */}
      <div className="relative">
        <svg width="0" height="0" className="absolute">
          <defs>
            <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
              <path
                ref={heroPathRef}
                d="M 0,0 L 1,0 L 1,0.85 Q 0.7,0.95 0.4,0.95 Q 0.15,0.9 0,0.8 Z"
              />
            </clipPath>
          </defs>
        </svg>
        <div className="relative w-full h-svh mx-auto [clip-path:url(#my-clip-path)] bg-[#282a2c] pointer-events-none select-none [-webkit-touch-callout:none]">
          <Image
            src="/Images/About/About_Main_Img.webp"
            alt="A portrait of Zaheer Khan"
            fill
            draggable={false}
            className="object-cover -translate-y-[5%] scale-105 pointer-events-none select-none [-webkit-touch-callout:none]"
            priority
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          Main Content Sections (All 5 sections with uppercase typography)
         ───────────────────────────────────────────────────────────── */}
      {/* 1. About Me Section (Double Smudge Mask Reveal) */}
      <div ref={aboutMeRef} className="relative py-10 md:py-20">
        <p className="font-barlow-condensed text-xs sm:text-sm md:text-base tracking-[.35rem] sm:tracking-[.5rem] pb-8 sm:pb-12 uppercase text-orange font-bold">
          About Me
        </p>

        <div className="max-w-4xl mx-auto px-4">
          <SmudgeMask
            className="!p-0 !-my-0"
            foreground={
              <ScrollRevealText triggerStart="top 98%" triggerEnd="top 45%">
                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wide leading-snug sm:leading-tight md:leading-[4.5rem] font-bigger-display uppercase">
                  &ldquo;A FULL-STACK DEVELOPER CRAFTING HIGH-END WEBSITES, BUILDING PRODUCTION-GRADE SAAS PLATFORMS, AND PUSHING THE BOUNDARIES OF APPLIED AI.&rdquo;
                </h2>
              </ScrollRevealText>
            }
            background={
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wide leading-snug sm:leading-tight md:leading-[4.5rem] font-bigger-display uppercase text-[#131212]">
                &ldquo;I REVERSE ENGINEER COMPLEX WEBSITES, BULLY AI INTO WRITING FULL SAAS BACKENDS, AND MAKE SURE THE GSAP ANIMATIONS LOOK SICK.&rdquo;
              </h2>
            }
          />
        </div>
      </div>

      {/* 2. What I Do Section (12 Rolling Categories with Sarcastic Quotes) */}
      <ServicesSection />

      {/* 3. My Experience Section (Dedicated Experience Smudge Mask) */}
      <div className="relative py-10 md:py-20">
        <p className="font-barlow-condensed text-xs sm:text-sm md:text-base tracking-[.35rem] sm:tracking-[.5rem] pb-8 sm:pb-12 uppercase text-orange font-bold">
          My Experience
        </p>

        <div className="max-w-4xl mx-auto px-4">
          <SmudgeMask
            className="!p-0 !-my-0"
            foreground={
              <ScrollRevealText triggerStart="top 98%" triggerEnd="top 45%">
                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wide leading-snug sm:leading-tight md:leading-[4.5rem] font-bigger-display uppercase">
                  &ldquo;HALF A DECADE OF EXPERIENCE SPENT CRAFTING CODE, FIXING BUGS, SIPPING COFFEE, AND ACCIDENTALLY CREATING NEW BUGS.&rdquo;
                </h2>
              </ScrollRevealText>
            }
            background={
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wide leading-snug sm:leading-tight md:leading-[4.5rem] font-bigger-display uppercase text-[#131212]">
                &ldquo;ONLY A FEW YEARS OF ACTIVELY BUILDING REALLY COOL STUFF, BUT HEY, 5 SOUNDS MUCH BETTER ON A RESUME.&rdquo;
              </h2>
            }
          />
        </div>
      </div>

      {/* 4. My Education Section (Full-Width Smudge Mask) */}
      <div className="relative py-10 md:py-20 border-t border-[#272522]">
        <p className="font-barlow-condensed text-xs sm:text-sm md:text-base tracking-[.35rem] sm:tracking-[.5rem] pb-8 sm:pb-12 uppercase text-orange font-bold">
          My Education
        </p>

        <div className="max-w-4xl mx-auto px-4">
          <SmudgeMask
            className="!p-0 !-my-0"
            foreground={
              <ScrollRevealText triggerStart="top 98%" triggerEnd="top 45%">
                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wide leading-snug sm:leading-tight md:leading-[4.5rem] font-bigger-display uppercase">
                  &ldquo;SELF-TAUGHT BY DESIGN. EDUCATED BY THE OPEN WEB, DRIVEN BY RELENTLESS CURIOSITY, AND REFINED BY REAL-WORLD EXECUTION.&rdquo;
                </h2>
              </ScrollRevealText>
            }
            background={
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wide leading-snug sm:leading-tight md:leading-[4.5rem] font-bigger-display uppercase text-[#131212]">
                &ldquo;9TH CLASS DROPOUT WITH A PHD IN GOOGLING, READING MINIFIED SOURCE CODE, AND ARGUING WITH AI AT 4 AM.&rdquo;
              </h2>
            }
          />
        </div>
      </div>

      {/* 5. What They Said Section (Testimonials Circular Dial & Full Review Modal) */}
      <WhatTheySaid />

      {/* 5. My Philosophy Section with 3D Marcus Aurelius & Smudge Reveal */}
      <div ref={philosophyRef} className="py-20 md:py-20 border-t border-[#272522]">
        <p className="font-barlow-condensed text-xs sm:text-sm md:text-base tracking-[.35rem] sm:tracking-[.5rem] pb-8 sm:pb-10 uppercase text-orange font-bold">
          My Philosophy
        </p>

        <SmudgeMask
          className="!p-0 !-my-0 w-full"
          foreground={
            <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-4 w-full gap-8 md:gap-12">
              <div className="md:h-[27rem] h-[20rem] w-[18rem] sm:w-[22rem] shrink-0">
                <MarcusAureliusModel
                  containerRef={philosophyRef}
                  showGoggles={false}
                  className="w-full h-full"
                />
              </div>
              <div className="md:px-6 px-4 max-w-3xl flex-1 flex flex-col items-center justify-center text-center">
                <ScrollRevealText triggerStart="top 98%" triggerEnd="top 45%">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-wide leading-tight md:leading-[3.6rem] lg:leading-[4rem] font-bigger-display uppercase text-foreground">
                    &ldquo;WASTE NO MORE TIME ARGUING ABOUT WHAT A GOOD MAN SHOULD BE. BE ONE.&rdquo;
                  </h2>
                </ScrollRevealText>
                <p className="font-barlow-condensed tracking-[.3rem] pt-5 capitalize text-foreground text-sm md:text-base">
                  ~Marcus aurelius
                </p>
              </div>
            </div>
          }
          background={
            <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-4 w-full gap-8 md:gap-12">
              <div className="md:h-[27rem] h-[20rem] w-[18rem] sm:w-[22rem] shrink-0">
                <MarcusAureliusModel
                  containerRef={philosophyRef}
                  showGoggles={true}
                  className="w-full h-full"
                />
              </div>
              <div className="md:px-6 px-4 max-w-3xl flex-1 flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-wide leading-tight md:leading-[3.6rem] lg:leading-[4rem] font-bigger-display uppercase text-[#131212]">
                  &ldquo;EASY FOR AN EMPEROR TO SAY WHEN HE DOESN&apos;T HAVE TO EXPLAIN TO A CLIENT WHY THE CSS IS BROKEN.&rdquo;
                </h2>
                <p className="font-barlow-condensed tracking-[.3rem] pt-5 capitalize text-[#131212] text-sm md:text-base">
                  ~Someone desperately trying to center a div
                </p>
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
}
