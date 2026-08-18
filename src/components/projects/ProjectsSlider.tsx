"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { projectsData, ProjectItem } from "@/data/projectsData";
import { usePageTransition } from "@/components/TransitionRouter";
import { playClick } from "@/lib/soundEffects";

export default function ProjectsSlider() {
  const { navigate, isTransitioning } = usePageTransition();

  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);

  const curPos = useRef(1);
  const targetPos = useRef(1);
  const touchStartY = useRef(0);
  const isTouchActiveRef = useRef(false);
  const isTransitioningRef = useRef(isTransitioning);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
    if (!isTransitioning) {
      targetPos.current = Math.round(targetPos.current);
      if (Math.abs(curPos.current - 1) < 0.05) {
        curPos.current = 1;
        targetPos.current = 1;
      }
    }
  }, [isTransitioning]);

  const leftMap = useRef<Map<number, HTMLDivElement>>(new Map());
  const rightMap = useRef<Map<number, HTMLDivElement>>(new Map());

  const getProject = useCallback((idx: number): ProjectItem => {
    const total = projectsData.length;
    const pos = ((idx % total) + total) % total;
    return projectsData[pos];
  }, []);

  const createSlide = useCallback(
    (side: "left" | "right", idx: number): HTMLDivElement => {
      const p = getProject(idx);
      const mediaSrc = p.img || p.projectImages[0]?.url;
      const total = projectsData.length;
      const currentNum = String((((idx % total) + total) % total) + 1).padStart(2, "0");
      const totalNum = String(total).padStart(2, "0");
      const numLabel = `${currentNum} / ${totalNum}`;
      const taglines = p.tagline || [
        "Creative development & motion design.",
        "High performance immersive digital experience.",
      ];

      const slide = document.createElement("div");
      slide.className =
        "slide absolute inset-0 overflow-hidden pointer-events-none bg-[#131212]";
      slide.style.zIndex = idx.toString();

      const isVideo =
        mediaSrc.endsWith(".mp4") || mediaSrc.endsWith(".webm");
      const mediaHtml = isVideo
        ? `<video src="${mediaSrc}" loop muted playsinline preload="none" class="w-full h-full object-cover block will-change-transform filter grayscale contrast-110 brightness-95"></video>`
        : `<img src="${mediaSrc}" alt="${p.title}" class="w-full h-full object-cover block will-change-transform filter grayscale contrast-110 brightness-95" />`;

      slide.innerHTML = `
        <div class="img-wrapper absolute top-0 ${
          side === "left" ? "left-0" : "right-0"
        } w-[100vw] max-w-none h-full pointer-events-none">
            ${mediaHtml}
        </div>
        <div class="overlay absolute inset-0 bg-black/20 pointer-events-none"></div>

        <!-- Bottom Gradient Shadow for high contrast legibility -->
        <div class="bottom-gradient absolute bottom-0 ${
          side === "left" ? "left-0" : "right-0"
        } w-[100vw] h-[60vh] bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none"></div>

        <div class="copy absolute top-0 ${
          side === "left" ? "left-0" : "right-0"
        } w-[100vw] h-full pointer-events-none will-change-transform flex flex-col items-center justify-end text-center p-6 pb-20 sm:pb-24 md:pb-16 lg:pb-20">
            <!-- Desktop Bottom Left Project Number -->
            <div class="hidden md:block absolute bottom-8 left-6 md:bottom-12 md:left-12 lg:bottom-16 lg:left-16 pointer-events-none z-20">
                <span class="hover-text-target font-barlow-condensed tracking-[.35rem] text-lg md:text-2xl lg:text-3xl font-bold text-white/90 uppercase inline-block pointer-events-auto drop-shadow-lg">
                    ${numLabel}
                </span>
            </div>

            <!-- Bottom Center Project Name, Paragraph & Mobile Number -->
            <div class="flex flex-col items-center justify-end max-w-4xl px-4 pointer-events-none z-20 w-full">
                <!-- Mobile Project Number -->
                <div class="md:hidden mb-4 pointer-events-none">
                    <span class="hover-text-target font-barlow-condensed tracking-[.4rem] text-xs font-semibold text-white/80 uppercase inline-block pointer-events-auto">
                        ${numLabel}
                    </span>
                </div>

                <!-- Main Project Title -->
                <h2 class="slide-title hover-text-target pointer-events-auto inline-block text-white/95 uppercase font-bigger-display text-[clamp(2.2rem,6.8vw,10.5rem)] tracking-wide leading-[0.9] select-none drop-shadow-[0_4px_25px_rgba(0,0,0,0.85)] m-0 p-0 mb-4 md:mb-5">
                    ${p.title}
                </h2>

                <!-- 2-Line Brief Description -->
                <div class="relative max-w-3xl text-center pointer-events-none flex flex-col items-center gap-2">
                    <p class="hover-text-target pointer-events-auto inline-block text-sm sm:text-base md:text-lg lg:text-xl font-normal text-white/80 font-barlow-condensed tracking-[.15rem] leading-relaxed drop-shadow-md select-none m-0">
                        ${taglines[0]}
                    </p>
                    <p class="hover-text-target pointer-events-auto inline-block text-sm sm:text-base md:text-lg lg:text-xl font-normal text-white/80 font-barlow-condensed tracking-[.15rem] leading-relaxed drop-shadow-md select-none m-0">
                        ${taglines[1]}
                    </p>

                    <!-- Subtext below Paragraph -->
                    <div class="absolute top-full mt-4 sm:mt-5 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none">
                        <span class="hover-text-target pointer-events-auto inline-block font-barlow-condensed tracking-[.25rem] text-[9px] sm:text-[10px] md:text-xs uppercase text-orange/90 font-semibold drop-shadow-md">
                            ( SCROLL DOWN TO EXPLORE )
                        </span>
                    </div>
                </div>
            </div>
        </div>
      `;

      return slide;
    },
    [getProject]
  );

  const getPolygonClip = useCallback((side: "left" | "right", t: number) => {
    const r = 100.5 * Math.max(0, Math.min(1, t));
    return side === "left"
      ? `polygon(0% ${100 - r}%, 100% ${100 - r}%, 100% 100%, 0% 100%)`
      : `polygon(0% 0%, 100% 0%, 100% ${r}%, 0% ${r}%)`;
  }, []);

  const getCopyEase = useCallback((e: number) => {
    const t = e - 1;
    const r = Math.abs(t) - 0.1;
    if (r <= 0) return 1;
    const a = r / 0.9;
    return 1 + Math.sign(t) * a * a * (3 - 2 * a);
  }, []);

  // Animation Frame Loop
  useEffect(() => {
    let animId: number;
    let syncFrameCount = 0;
    const leftEl = leftMap.current;
    const rightEl = rightMap.current;

    const render = () => {
      const diff = targetPos.current - curPos.current;
      if (Math.abs(diff) < 0.0008 && !isTouchActiveRef.current) {
        curPos.current = targetPos.current;
      } else {
        curPos.current += diff * 0.07;
      }
      const pos = curPos.current;
      const minIdx = Math.floor(pos) - 3;
      const maxIdx = Math.floor(pos) + 3 + 1;

      const currentActive =
        ((Math.round(pos - 1) % projectsData.length) + projectsData.length) %
        projectsData.length;
      setActiveIdx(currentActive);

      const columns: {
        side: "left" | "right";
        container: HTMLDivElement | null;
        visibleMap: Map<number, HTMLDivElement>;
        driftDir: number;
      }[] = [
        {
          side: "left",
          container: leftColRef.current,
          visibleMap: leftMap.current,
          driftDir: 1,
        },
        {
          side: "right",
          container: rightColRef.current,
          visibleMap: rightMap.current,
          driftDir: -1,
        },
      ];

      columns.forEach(({ side, container, visibleMap, driftDir }) => {
        if (!container) return;

        // Append missing slides in range
        for (let i = minIdx; i <= maxIdx; i++) {
          if (!visibleMap.has(i)) {
            const slide = createSlide(side, i);
            container.appendChild(slide);
            visibleMap.set(i, slide);
          }
        }

        // Update / Remove out of range
        for (const [i, slide] of visibleMap.entries()) {
          if (i < minIdx || i > maxIdx) {
            // Release video decoder before removing slide
            const vid = slide.querySelector("video");
            if (vid) {
              vid.pause();
              vid.removeAttribute("src");
              vid.load();
            }
            slide.remove();
            visibleMap.delete(i);
            continue;
          }

          const l = pos - i;
          const d = Math.max(0, Math.min(2, l));
          if (l <= 0 || l >= 2) {
            // Keep slide in DOM but visually hidden (video decoder stays alive)
            slide.style.visibility = "hidden";
            slide.style.clipPath = "inset(100%)";
            const vid = slide.querySelector("video") as HTMLVideoElement | null;
            if (vid) {
              if (l <= -0.5 || l >= 2.5) {
                // Far away: stop downloading and pause
                if (!vid.paused) vid.pause();
                if (vid.preload !== "none") vid.preload = "none";
              } else {
                // Pre-roll zone: start buffering but don't play yet
                if (vid.preload !== "auto") vid.preload = "auto";
              }
            }
            continue;
          }

          slide.style.visibility = "visible";
          slide.style.clipPath = getPolygonClip(side, l);

          const media = slide.querySelector<HTMLElement>("img, video");
          if (media) {
            const drift = (1 - d) * 25 * driftDir;
            media.style.transform = `translateY(${drift}%) scale(1.25)`;
            // Ensure video is buffering and playing when slide is visible
            if (media.tagName === "VIDEO") {
              const video = media as HTMLVideoElement;
              if (video.preload !== "auto") video.preload = "auto";
              if (video.paused) video.play().catch(() => {});
            }
          }

          const isCurrentActive = Math.round(pos - 1) === i;
          slide.querySelectorAll<HTMLElement>(".hover-text-target").forEach((el) => {
            el.style.pointerEvents = isCurrentActive ? "auto" : "none";
          });

          const copy = slide.querySelector<HTMLElement>(".copy");
          if (copy) {
            const copyDrift = (1 - getCopyEase(d)) * 15 * driftDir;
            copy.style.transform = `translateY(${copyDrift}%)`;
          }
        }
      });

      // Synchronize video players & stall recovery (throttled to every 10 frames)
      syncFrameCount++;
      if (syncFrameCount % 10 === 0) {
        for (let i = minIdx; i <= maxIdx; i++) {
          const leftSlide = leftMap.current.get(i);
          const rightSlide = rightMap.current.get(i);
          if (!leftSlide || !rightSlide) continue;

          const leftVideo = leftSlide.querySelector("video");
          const rightVideo = rightSlide.querySelector("video");
          if (!leftVideo || !rightVideo) continue;

          // Stall recovery: force-play both videos on visible slides
          const isSlideVisible = (pos - i) > 0 && (pos - i) < 2;
          if (isSlideVisible) {
            if (leftVideo.paused && leftVideo.readyState >= 2) {
              leftVideo.play().catch(() => {});
            }
            if (rightVideo.paused && rightVideo.readyState >= 2) {
              rightVideo.play().catch(() => {});
            }
          }

          // Cross-side sync: if one side is playing, start the other
          if (!leftVideo.paused && rightVideo.paused) {
            rightVideo.play().catch(() => {});
          } else if (leftVideo.paused && !rightVideo.paused) {
            leftVideo.play().catch(() => {});
          }

          // Time sync: keep both sides at the same playback position
          if (
            leftVideo.readyState >= 2 &&
            rightVideo.readyState >= 2 &&
            Math.abs(leftVideo.currentTime - rightVideo.currentTime) > 0.35
          ) {
            rightVideo.currentTime = leftVideo.currentTime;
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      leftEl.forEach((s) => s.remove());
      leftEl.clear();
      rightEl.forEach((s) => s.remove());
      rightEl.clear();
    };
  }, [createSlide, getPolygonClip, getCopyEase]);

  // Wheel, Touch, and Keyboard Event Listeners
  useEffect(() => {
    let snapTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioningRef.current) return;
      targetPos.current += e.deltaY / 1000;
      clearTimeout(snapTimeout);
      snapTimeout = setTimeout(() => {
        const val = targetPos.current;
        const base = Math.floor(val);
        const rem = val - base;
        if (rem >= 0.65) {
          targetPos.current = base + 1;
        } else if (rem <= 0.35) {
          targetPos.current = base;
        }
      }, 180);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (isTransitioningRef.current) return;
      if (e.touches.length > 0) {
        isTouchActiveRef.current = true;
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitioningRef.current || !isTouchActiveRef.current) return;
      if (e.touches.length > 0) {
        const clientY = e.touches[0].clientY;
        const rawDelta = touchStartY.current - clientY;
        if (touchStartY.current > 0 && Math.abs(rawDelta) < 200) {
          targetPos.current += (rawDelta * 8) / 1000;
        }
        touchStartY.current = clientY;
      }
    };

    const handleTouchEnd = () => {
      isTouchActiveRef.current = false;
      touchStartY.current = 0;
      targetPos.current = Math.round(targetPos.current);
    };

    const handleTouchCancel = () => {
      isTouchActiveRef.current = false;
      touchStartY.current = 0;
      targetPos.current = Math.round(targetPos.current);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioningRef.current) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        targetPos.current = Math.floor(targetPos.current) + 1;
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        targetPos.current = Math.ceil(targetPos.current) - 1;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchCancel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(snapTimeout);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchCancel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Custom Cursor (VIEW) Follower
  useEffect(() => {
    const sec = sectionRef.current;
    const cur = cursorRef.current;
    if (!sec || !cur) return;

    const span = cur.querySelector("span");
    const setX = gsap.quickTo(cur, "x", { duration: 0.35, ease: "power3.out" });
    const setY = gsap.quickTo(cur, "y", { duration: 0.35, ease: "power3.out" });

    let isTargetHovered = false;
    let isBtnHovered = false;

    const onMouseMove = (e: MouseEvent) => {
      setX(e.clientX);
      setY(e.clientY);

      const target = e.target as HTMLElement;
      const isBtn = !!(target.closest("button") || target.closest("a"));
      const isHoverText = !isBtn && !!target.closest(".hover-text-target");

      if (isBtn) {
        if (!isBtnHovered) {
          isBtnHovered = true;
          isTargetHovered = false;
          gsap.to(cur, { scale: 0, duration: 0.2 });
        }
        return;
      }

      if (isBtnHovered) {
        isBtnHovered = false;
      }

      if (isHoverText !== isTargetHovered) {
        isTargetHovered = isHoverText;
        if (isHoverText) {
          if (span) gsap.to(span, { scale: 0, opacity: 0, duration: 0.2, ease: "power2.out" });
          gsap.to(cur, {
            scale: 1.25,
            backgroundColor: "#ffffff",
            mixBlendMode: "difference",
            duration: 0.25,
            ease: "power2.out",
          });
        } else {
          if (span) gsap.to(span, { scale: 1, opacity: 1, duration: 0.2, ease: "power2.out" });
          gsap.to(cur, {
            scale: 1,
            backgroundColor: "#f93434",
            mixBlendMode: "normal",
            duration: 0.25,
            ease: "power2.out",
          });
        }
      } else if (!isHoverText) {
        gsap.to(cur, { scale: 1, duration: 0.2 });
      }
    };

    const onMouseEnter = () => {
      gsap.to(cur, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    const onMouseLeave = () => {
      isTargetHovered = false;
      isBtnHovered = false;
      if (span) gsap.set(span, { scale: 1, opacity: 1 });
      gsap.to(cur, {
        scale: 0,
        backgroundColor: "#f93434",
        mixBlendMode: "normal",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    sec.addEventListener("mousemove", onMouseMove);
    sec.addEventListener("mouseenter", onMouseEnter);
    sec.addEventListener("mouseleave", onMouseLeave);

    return () => {
      sec.removeEventListener("mousemove", onMouseMove);
      sec.removeEventListener("mouseenter", onMouseEnter);
      sec.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const handleSectionClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) return;

    const p = getProject(activeIdx);
    if (p?.id) {
      playClick();
      navigate(`/projects/${p.id}`);
    }
  };

  return (
    <section
      ref={sectionRef}
      onClick={handleSectionClick}
      className="fixed inset-0 w-full h-svh flex overflow-hidden bg-[#131212] select-none z-10 md:cursor-none cursor-pointer"
    >
      {/* Dual Columns */}
      <div ref={leftColRef} className="column left flex-1 relative h-full overflow-hidden" />
      <div ref={rightColRef} className="column right flex-1 relative h-full overflow-hidden" />

      {/* Custom Desktop Floating Cursor */}
      <div
        ref={cursorRef}
        className="hidden md:flex fixed top-0 left-0 z-[9999] items-center justify-center w-20 h-20 rounded-full bg-orange text-[#131212] font-barlow-condensed font-bold text-xs uppercase tracking-widest pointer-events-none -translate-x-1/2 -translate-y-1/2 scale-0 shadow-2xl transition-opacity duration-300"
      >
        <span>VIEW</span>
      </div>

      {/* Navigation Buttons (Previous / Next) */}
      <div className="hidden md:flex absolute bottom-8 right-8 md:bottom-12 md:right-12 z-50 items-center gap-3 pointer-events-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            playClick();
            targetPos.current = Math.ceil(targetPos.current) - 1;
          }}
          aria-label="Previous Project"
          className="w-12 h-12 rounded-full border border-foreground/20 bg-background/60 backdrop-blur-md text-foreground flex items-center justify-center hover:bg-orange hover:text-[#131212] hover:border-orange transition-all duration-300 group shadow-lg cursor-pointer"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-x-0.5 transition-transform"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            playClick();
            targetPos.current = Math.floor(targetPos.current) + 1;
          }}
          aria-label="Next Project"
          className="w-12 h-12 rounded-full border border-foreground/20 bg-background/60 backdrop-blur-md text-foreground flex items-center justify-center hover:bg-orange hover:text-[#131212] hover:border-orange transition-all duration-300 group shadow-lg cursor-pointer"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:translate-x-0.5 transition-transform"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </section>
  );
}
