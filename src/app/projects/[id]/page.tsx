"use client";

import React, { useRef, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projectsData } from "@/data/projectsData";
import { SplitText } from "@/lib/splitText";
import ProjectGallery from "@/components/projects/ProjectGallery";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const projectIndex = useMemo(() => {
    return projectsData.findIndex((p) => p.id === id);
  }, [id]);

  const project = projectsData[projectIndex >= 0 ? projectIndex : 0];
  const total = projectsData.length;

  const prevProject =
    projectsData[(projectIndex - 1 + total) % total];
  const nextProject =
    projectsData[(projectIndex + 1) % total];

  const heroRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const liveBtnRef = useRef<HTMLAnchorElement>(null);
  const liveBtnTl = useRef<gsap.core.Timeline | null>(null);

  // SplitText & Parallax GSAP Animations
  useGSAP(
    () => {
      if (!project) return;

      // Parallax on Hero Media
      if (heroMediaRef.current && heroRef.current) {
        gsap.to(heroMediaRef.current, {
          y: 200,
          opacity: 0.2,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Title SplitText animation on entrance
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: "chars" });
        gsap.from(split.chars, {
          yPercent: 100,
          opacity: 0,
          duration: 1,
          stagger: { each: 0.03, from: "center" },
          ease: "power4.out",
          delay: 0.2,
        });
      }

      // Live Site button rolling hover
      if (liveBtnRef.current) {
        const [span1, span2] = Array.from(
          liveBtnRef.current.children
        ) as HTMLElement[];
        if (span1 && span2) {
          const split1 = new SplitText(span1, { type: "chars" });
          const split2 = new SplitText(span2, { type: "chars" });

          const tl = gsap.timeline({ paused: true });
          tl.to(split1.chars, {
            yPercent: -100,
            duration: 0.5,
            ease: "power3.out",
            stagger: { each: 0.02, from: "center" },
          }).to(
            split2.chars,
            {
              yPercent: -100,
              duration: 0.5,
              ease: "power3.out",
              stagger: { each: 0.02, from: "center" },
            },
            "<"
          );
          liveBtnTl.current = tl;
        }
      }
    },
    { dependencies: [project] }
  );

  if (!project) {
    return null;
  }

  const isVideo =
    project.img.endsWith(".mp4") || project.img.endsWith(".webm");

  return (
    <div className="w-full min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* ─────────────────────────────────────────────────────────────
          1. Hero Parallax Showcase
         ───────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative w-full h-[80vh] md:h-[90vh] flex flex-col justify-end items-center overflow-hidden pb-12 px-6"
      >
        <div
          ref={heroMediaRef}
          className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none"
        >
          {isVideo ? (
            <video
              src={project.img}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover filter grayscale contrast-110 brightness-75"
            />
          ) : (
            <Image
              src={project.img}
              alt={project.title}
              fill
              className="object-cover filter grayscale contrast-110 brightness-75"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        {/* Hero Title */}
        <div className="relative z-10 text-center flex flex-col items-center max-w-5xl">
          <span className="font-barlow-condensed tracking-[.4rem] text-xs md:text-sm uppercase text-orange font-bold mb-3">
            PROJECT SHOWCASE
          </span>
          <h1
            ref={titleRef}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bigger-display uppercase text-foreground tracking-wide leading-none overflow-hidden drop-shadow-2xl"
          >
            {project.title}
          </h1>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. Meta Specs Grid
         ───────────────────────────────────────────────────────────── */}
      <section className="relative z-20 w-full max-w-6xl mx-auto px-6 py-12 md:py-20 border-b border-foreground/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
          {/* Client & Year */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-barlow-condensed text-xs uppercase tracking-widest text-foreground/50 font-bold">
                Client
              </span>
              <span className="font-barlow-condensed text-base md:text-lg uppercase tracking-wider text-foreground font-semibold">
                {project.client}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-barlow-condensed text-xs uppercase tracking-widest text-foreground/50 font-bold">
                Year
              </span>
              <span className="font-barlow-condensed text-base md:text-lg uppercase tracking-wider text-foreground font-semibold">
                {project.year}
              </span>
            </div>
          </div>

          {/* Role & Scope */}
          <div className="flex flex-col gap-1 sm:col-span-1 lg:col-span-1">
            <span className="font-barlow-condensed text-xs uppercase tracking-widest text-foreground/50 font-bold">
              Role & Scope
            </span>
            <span className="font-barlow-condensed text-base md:text-lg uppercase tracking-wider text-foreground font-semibold leading-snug">
              {project.role}
            </span>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1">
            <span className="font-barlow-condensed text-xs uppercase tracking-widest text-foreground/50 font-bold">
              Tech Stack
            </span>
            <div className="flex flex-wrap justify-center md:justify-start gap-1.5 pt-0.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-foreground/10 text-foreground/80 font-barlow-condensed text-xs md:text-sm tracking-wider uppercase font-semibold whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Visit Live Site Button */}
          <div className="flex flex-col justify-center items-center md:items-end">
            <a
              ref={liveBtnRef}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => liveBtnTl.current?.play()}
              onMouseLeave={() => liveBtnTl.current?.reverse()}
              className="group relative overflow-hidden tracking-[.2rem] text-sm md:text-base uppercase font-bold font-barlow-condensed inline-flex items-center cursor-pointer pb-0.5"
            >
              <span aria-hidden="true" className="flex items-center gap-2 text-foreground">
                <span>VISIT LIVE SITE</span>
                <span>↗</span>
              </span>
              <span
                aria-hidden="true"
                className="flex items-center gap-2 absolute left-0 top-0 translate-y-full text-orange"
              >
                <span>VISIT LIVE SITE</span>
                <span>↗</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2.5 Key Capabilities & Systems (Optional Highlighted Architecture)
         ───────────────────────────────────────────────────────────── */}
      {project.features && project.features.length > 0 && (
        <section className="relative z-20 w-full max-w-6xl mx-auto px-6 pt-12 md:pt-16 pb-4">
          <p className="font-barlow-condensed tracking-[.4rem] uppercase text-orange text-xs md:text-sm font-bold mb-8 text-center md:text-left">
            KEY CAPABILITIES & ARCHITECTURE
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 rounded-xl bg-white/[0.02] border border-white/10 hover:border-orange/40 transition-all duration-300 flex flex-col justify-start group"
              >
                <div className="flex items-center gap-3 mb-3.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange group-hover:scale-125 transition-transform duration-300" />
                  <h3 className="font-barlow-condensed text-xl md:text-2xl uppercase tracking-wider font-bold text-foreground">
                    {feat.title}
                  </h3>
                </div>
                <p className="font-barlow-condensed text-base md:text-lg text-foreground/70 tracking-wide leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. Project Narrative Story Sections
         ───────────────────────────────────────────────────────────── */}
      <section className="relative z-20 w-full max-w-5xl mx-auto px-6 py-16 md:py-28 flex flex-col gap-16 md:gap-24">
        {/* Overview & Vision */}
        <div className="w-full flex flex-col items-center text-center">
          <p className="font-barlow-condensed tracking-[.4rem] uppercase text-orange text-xs md:text-sm font-bold mb-4 md:mb-6">
            OVERVIEW & VISION
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] tracking-wide leading-snug sm:leading-tight md:leading-[3.2rem] font-bigger-display uppercase text-foreground max-w-4xl mx-auto">
            {project.description}
          </h2>
        </div>

        {/* My Role & Scope */}
        <div className="w-full flex flex-col items-center text-center">
          <p className="font-barlow-condensed tracking-[.4rem] uppercase text-orange text-xs md:text-sm font-bold mb-4 md:mb-6">
            MY ROLE & SCOPE
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] tracking-wide leading-snug sm:leading-tight md:leading-[3.2rem] font-bigger-display uppercase text-foreground max-w-4xl mx-auto">
            {project.whatIDid}
          </h2>
        </div>

        {/* Tech & Implementation */}
        <div className="w-full flex flex-col items-center text-center">
          <p className="font-barlow-condensed tracking-[.4rem] uppercase text-orange text-xs md:text-sm font-bold mb-4 md:mb-6">
            TECH & IMPLEMENTATION
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] tracking-wide leading-snug sm:leading-tight md:leading-[3.2rem] font-bigger-display uppercase text-foreground max-w-4xl mx-auto">
            {project.howIBuiltThis}
          </h2>
        </div>

        {/* Key Takeaways & Lessons */}
        {project.keyTakeaway && (
          <div className="w-full flex flex-col items-center text-center">
            <p className="font-barlow-condensed tracking-[.4rem] uppercase text-orange text-xs md:text-sm font-bold mb-4 md:mb-6">
              KEY TAKEAWAYS & LESSONS
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] tracking-wide leading-snug sm:leading-tight md:leading-[3.2rem] font-bigger-display uppercase text-foreground max-w-4xl mx-auto">
              {project.keyTakeaway}
            </h2>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. Draggable Infinite WebGL Gallery
         ───────────────────────────────────────────────────────────── */}
      <section className="relative z-20 w-full bg-background px-0 pb-24 md:pb-36">
        <div className="w-full mx-auto flex flex-col items-center pt-8 md:pt-16">
          <h2 className="text-4xl md:text-6xl font-bigger-display uppercase text-white/90 mb-3 text-center tracking-wider">
            Project Gallery
          </h2>
          <span className="font-barlow-condensed tracking-[.25rem] text-xs md:text-sm uppercase text-orange/90 mb-8 md:mb-10 font-semibold">
            ( DRAG TO EXPLORE )
          </span>
          <div className="w-full h-[48vh] sm:h-[60vh] md:h-[88vh] overflow-hidden relative">
            <ProjectGallery images={project.projectImages} />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. Dual Split Next / Previous Project Bottom Navigator
         ───────────────────────────────────────────────────────────── */}
      <section className="relative z-20 w-full h-[60vh] md:h-[50vh] flex flex-col md:flex-row border-t border-foreground/10">
        {/* Previous Project Card */}
        <Link
          href={`/projects/${prevProject.id}`}
          className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden border-b md:border-b-0 md:border-r border-white/10"
        >
          {prevProject.img.endsWith(".mp4") || prevProject.img.endsWith(".webm") ? (
            <video
              src={prevProject.img}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0 pointer-events-none"
            />
          ) : (
            <Image
              src={prevProject.img}
              alt={prevProject.title}
              fill
              className="object-cover opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
            />
          )}
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <span className="text-xs md:text-sm uppercase tracking-widest text-white/80 mb-3 font-barlow-condensed group-hover:-translate-y-1 transition-transform duration-500">
              Previous Project
            </span>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bigger-display uppercase text-white/90 group-hover:scale-105 transition-transform duration-500">
              {prevProject.title}
            </h3>
          </div>
        </Link>

        {/* Next Project Card */}
        <Link
          href={`/projects/${nextProject.id}`}
          className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden"
        >
          {nextProject.img.endsWith(".mp4") || nextProject.img.endsWith(".webm") ? (
            <video
              src={nextProject.img}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0 pointer-events-none"
            />
          ) : (
            <Image
              src={nextProject.img}
              alt={nextProject.title}
              fill
              className="object-cover opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
            />
          )}
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <span className="text-xs md:text-sm uppercase tracking-widest text-white/80 mb-3 font-barlow-condensed group-hover:-translate-y-1 transition-transform duration-500">
              Next Project
            </span>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bigger-display uppercase text-white/90 group-hover:scale-105 transition-transform duration-500">
              {nextProject.title}
            </h3>
          </div>
        </Link>
      </section>
    </div>
  );
}
