"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Pause, Play, X } from "lucide-react";
import SmudgeMask from "./SmudgeMask";
import ScrollRevealText from "./ScrollRevealText";

export interface Testimonial {
  id: string;
  quote: string;
  shortQuote?: string;
  backgroundQuote?: string;
  name: string;
  role: string;
  company: string;
  websiteUrl: string;
  avatar: string;
}

export const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Working with Zaheer was the best investment we made for Staurga this year. The website launched smoothly and we started getting compliments and customer inquiries from day one.",
    backgroundQuote:
      "Zaheer did the entire project via text because he is too shy to get on a Zoom call 😂",
    name: "Shahida Zia",
    role: "Founder",
    company: "Staurga",
    websiteUrl: "https://staurga.com/",
    avatar: "/Images/About/Shahida_Zia_Client_Img.png",
  },
  {
    id: "2",
    quote:
      "Zaheer is a great developer. The quality of his work was amazing and he delivered very fast. He recommended and debated changes with me and how to best implement the features. He also understood and completed the work just as defined in the spec. Overall great work all around, I would love to work again on other projects.",
    shortQuote:
      "Zaheer is a great developer. The quality of his work was amazing and he delivered very fast. I would love to work again on other projects.",
    backgroundQuote:
      "I'm actually his brother... he literally forced me to write this 5-star review at gunpoint.",
    name: "Kushal Thakur",
    role: "Client",
    company: "Upwork",
    websiteUrl: "https://www.upwork.com/freelancers/~01290115e797943d08?mp_source=share",
    avatar: "/Images/About/Kushal_Client_Img.avif",
  },
  {
    id: "3",
    quote:
      "As a website strategist, I have high standards for frontend execution. Whenever I need custom code, complex motion, or high-performance Next.js architecture that goes beyond standard setups, Zaheer is the developer I trust. His technical depth and speed are unreal.",
    shortQuote:
      "Whenever I need custom code, complex motion, or high-performance Next.js architecture that goes beyond standard setups, Zaheer is the developer I trust.",
    backgroundQuote:
      "I am literally his friend and had zero idea that he put my face on his portfolio.",
    name: "Abeeha Parveen",
    role: "Website Strategist & Developer",
    company: "LinkedIn",
    websiteUrl: "https://www.linkedin.com/in/abeeha-parveen-website-strategist/",
    avatar: "/Images/About/Abeeha_Parveen_Client_Img.png",
  },
];

export default function WhatTheySaid({
  testimonials = defaultTestimonials,
}: {
  testimonials?: Testimonial[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isPlaying, setIsPlaying] = useState(true);
  const [modalItem, setModalItem] = useState<Testimonial | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const currentContentRef = useRef<HTMLDivElement>(null);
  const prevContentRef = useRef<HTMLDivElement>(null);
  const lastClickTime = useRef(0);

  const total = testimonials.length;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Autoplay Timer (5s)
  useEffect(() => {
    if (!isPlaying || modalItem !== null) return;
    const interval = setInterval(() => {
      setDirection("next");
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, modalItem, currentIndex, total]);

  const selectReview = (index: number) => {
    if (index === currentIndex) return;
    const now = Date.now();
    if (now - lastClickTime.current < 250) return;
    lastClickTime.current = now;

    let diff = index - currentIndex;
    diff = ((diff % total) + total) % total;
    if (diff > total / 2) diff -= total;

    setDirection(diff >= 0 ? "next" : "prev");
    setPrevIndex(currentIndex);
    setCurrentIndex(index);
  };

  // SplitText Letter Animation on review switch
  useGSAP(
    () => {
      if (prevContentRef.current && prevIndex !== null) {
        const chars = prevContentRef.current.querySelectorAll(".char-span");
        gsap.to(chars, {
          yPercent: direction === "next" ? -110 : 110,
          duration: 0.45,
          ease: "power2.in",
          stagger: (i, target: Element) =>
            0.5 * parseFloat(target.getAttribute("data-delay") || "0"),
        });
      }

      if (currentContentRef.current) {
        const chars = currentContentRef.current.querySelectorAll(".char-span");
        gsap.fromTo(
          chars,
          {
            yPercent: direction === "next" ? 110 : -110,
          },
          {
            yPercent: 0,
            duration: 0.65,
            ease: "power3.out",
            stagger: (i, target: Element) =>
              0.7 * parseFloat(target.getAttribute("data-delay") || "0"),
            onComplete: () => {
              setPrevIndex(null);
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [currentIndex] }
  );

  const renderAnimatedLetters = (text: string, className: string, baseDelay = 0) => {
    const words = text.split(" ");
    return (
      <div className={`flex flex-wrap gap-x-[0.3em] gap-y-[0.05em] ${className}`}>
        {words.map((word, wIdx) => {
          // Use Array.from to correctly handle multi-byte Unicode/emojis without breaking surrogate pairs
          const chars = Array.from(word);
          const center = (chars.length - 1) / 2;
          return (
            <span key={wIdx} className="inline-flex overflow-hidden py-0.5">
              {chars.map((char, cIdx) => {
                const dist = Math.abs(cIdx - center);
                const isEmoji = /\p{Extended_Pictographic}/u.test(char);
                return (
                  <span
                    key={cIdx}
                    data-delay={baseDelay + 0.045 * dist}
                    className={`char-span inline-block ${isEmoji ? "font-sans not-italic text-[0.8em] align-middle" : ""}`}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          );
        })}
      </div>
    );
  };

  const renderReviewContent = (item: Testimonial, isPrevious = false) => {
    const hasShort = !!item.shortQuote;
    const displayText = item.shortQuote || item.quote;
    const headingClass =
      "text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide leading-snug sm:leading-tight md:leading-[3.6rem] lg:leading-[4.1rem] font-bigger-display uppercase";

    return (
      <div className="w-full flex flex-col items-start text-left">
        {/* Quote Container */}
        <div
          className={`mb-6 md:mb-8 min-h-[150px] sm:min-h-[170px] md:min-h-[190px] lg:min-h-[210px] w-full ${
            hasShort && !isPrevious ? "group select-none" : ""
          }`}
        >
          {isPrevious ? (
            renderAnimatedLetters(displayText, `${headingClass} text-foreground`)
          ) : item.backgroundQuote ? (
            <SmudgeMask
              className="!p-0 !-my-0 !justify-start items-start text-left"
              foreground={
                <ScrollRevealText
                  triggerRef={sectionRef}
                  triggerStart="top 80%"
                  triggerEnd="top 30%"
                >
                  {renderAnimatedLetters(displayText, `${headingClass} text-foreground`)}
                </ScrollRevealText>
              }
              background={
                <div className="w-full text-left">
                  {renderAnimatedLetters(item.backgroundQuote, `${headingClass} text-[#131212]`)}
                </div>
              }
            />
          ) : (
            <ScrollRevealText
              triggerRef={sectionRef}
              triggerStart="top 80%"
              triggerEnd="top 30%"
            >
              {renderAnimatedLetters(displayText, `${headingClass} text-foreground`)}
            </ScrollRevealText>
          )}

          {/* [ Click to Read Full Review ] Button */}
          <div className="mt-3 md:mt-4 h-7 md:h-8 flex items-center">
            {hasShort ? (
              <div
                onClick={() => {
                  if (!isPrevious) setModalItem(item);
                }}
                className="inline-flex items-center gap-2 text-xs md:text-sm font-barlow-condensed tracking-[.2rem] uppercase text-orange font-bold cursor-pointer hover:opacity-80 transition-all z-30 relative"
              >
                {renderAnimatedLetters(
                  "[ Click to Read Full Review ]",
                  "text-xs md:text-sm text-orange font-barlow-condensed tracking-[.2rem] uppercase font-bold",
                  0.2
                )}
              </div>
            ) : (
              <div className="h-full w-full pointer-events-none opacity-0 select-none" aria-hidden="true" />
            )}
          </div>
        </div>

        {/* Client Meta (Name, Role, Company) */}
        <div className="flex flex-col gap-0.5 text-left min-h-[70px]">
          {renderAnimatedLetters(
            item.name,
            "text-lg md:text-xl font-bold text-foreground font-barlow-condensed tracking-wider uppercase",
            0.05
          )}
          {renderAnimatedLetters(
            item.role,
            "text-xs md:text-sm text-foreground/60 font-barlow-condensed tracking-widest uppercase",
            0.1
          )}
          {item.websiteUrl ? (
            <a
              href={item.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-block hover:text-orange transition-colors cursor-pointer group/link"
            >
              {renderAnimatedLetters(
                item.company,
                "text-xs md:text-sm text-foreground/40 font-barlow-condensed tracking-widest uppercase group-hover/link:text-orange transition-colors",
                0.15
              )}
            </a>
          ) : (
            renderAnimatedLetters(
              item.company,
              "text-xs md:text-sm text-foreground/40 font-barlow-condensed tracking-widest uppercase",
              0.15
            )
          )}
        </div>
      </div>
    );
  };

  const currentItem = testimonials[currentIndex];
  const prevItem = prevIndex !== null ? testimonials[prevIndex] : null;

  return (
    <section
      ref={sectionRef}
      className="w-full relative py-10 md:py-20 overflow-hidden border-t border-[#272522]"
    >
      <p className="font-barlow-condensed text-xs sm:text-sm md:text-base tracking-[.35rem] sm:tracking-[.5rem] pb-8 md:pb-12 uppercase text-orange font-bold text-center">
        WHAT THEY SAID
      </p>

      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 lg:gap-6">
        {/* Left Side: Circular Arc Avatar Dial */}
        <div className="relative w-full md:w-52 h-[140px] md:h-[380px] flex items-center justify-center md:justify-end shrink-0 my-1 md:my-0">
          {/* Pause / Resume Button */}
          <button
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
            className="absolute left-1/2 -translate-x-1/2 -top-5 md:-left-3 md:top-1/2 md:translate-x-0 md:-translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full border border-foreground/30 bg-background/80 hover:bg-orange hover:border-orange hover:text-white transition-all flex items-center justify-center cursor-pointer text-foreground/80 z-20 backdrop-blur-sm shadow-md hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current" />
            ) : (
              <Play className="w-4 h-4 md:w-5 md:h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Avatars on Arc */}
          {testimonials.map((item, idx) => {
            const isActive = currentIndex === idx;
            let offset = idx - currentIndex;
            offset = ((offset % total) + total) % total;
            if (offset > total / 2) offset -= total;

            let x = 0;
            let y = 0;
            if (isMobile) {
              const rad = ((52 * offset) * Math.PI) / 180;
              x = 95 * Math.sin(rad);
              y = 95 * (Math.cos(rad) - 1);
            } else {
              const rad = ((58 * offset) * Math.PI) / 180;
              x = 170 * (Math.cos(rad) - 1);
              y = 170 * Math.sin(rad);
            }

            return (
              <button
                key={item.id}
                onClick={() => selectReview(idx)}
                aria-label={`View review from ${item.name}`}
                style={{
                  transform: `translate3d(${x}px, ${y}px, 0) scale(${isActive ? 1.08 : 0.8})`,
                  opacity: isActive ? 1 : 0.4,
                }}
                className={`absolute top-1/2 focus:outline-none cursor-pointer group z-10 transition-all duration-500 ease-out ${
                  isMobile
                    ? "left-1/2 -translate-x-1/2 -translate-y-1/2"
                    : "right-2 -translate-y-1/2"
                }`}
              >
                <div
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full overflow-hidden transition-all duration-300 ${
                    isActive ? "" : "hover:opacity-80"
                  }`}
                >
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover grayscale contrast-130 brightness-70"
                    sizes="(max-width: 768px) 80px, 112px"
                  />
                </div>

                {/* Active Indicator Arrow */}
                {isActive && (
                  isMobile ? (
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent border-t-[9px] border-t-orange z-20 transition-all duration-300" />
                  ) : (
                    <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[7px] border-y-transparent border-l-[11px] border-l-orange z-20 transition-all duration-300" />
                  )
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side: Animated Review Quote & Details */}
        <div className="flex-1 min-h-[280px] md:min-h-[320px] flex flex-col items-start text-left pt-0 md:pt-2 pl-0 md:pl-2">
          <div className="w-full flex items-start gap-4 md:gap-6">
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-orange leading-none select-none shrink-0 -mt-1 sm:-mt-1.5 md:-mt-2 mr-1 sm:mr-1.5">
              &ldquo;
            </span>

            <div className="flex-1 relative min-h-[260px] md:min-h-[280px] w-full">
              {prevItem && (
                <div
                  ref={prevContentRef}
                  className="absolute top-0 left-0 w-full pointer-events-none z-0"
                >
                  {renderReviewContent(prevItem, true)}
                </div>
              )}
              <div ref={currentContentRef} className="relative w-full z-10">
                {renderReviewContent(currentItem, false)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Review Popup Modal */}
      {modalItem &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-300 overflow-hidden"
            onClick={() => setModalItem(null)}
          >
            <div
              className="relative w-full max-w-4xl bg-[#131212] border border-white/15 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl overflow-y-auto max-h-[85vh] flex flex-col gap-6 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setModalItem(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/5 border border-white/15 text-foreground flex items-center justify-center hover:bg-orange hover:border-orange hover:text-white transition-all cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Client Info Header */}
              <div className="flex items-center gap-4 pr-10">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 border border-white/15">
                  <Image
                    src={modalItem.avatar}
                    alt={modalItem.name}
                    fill
                    className="object-cover grayscale contrast-130 brightness-70"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-xl md:text-2xl font-bold font-barlow-condensed uppercase tracking-wider text-foreground">
                    {modalItem.name}
                  </h3>
                  <p className="text-xs md:text-sm text-foreground/70 font-barlow-condensed tracking-widest uppercase">
                    {modalItem.role}
                  </p>
                  {modalItem.websiteUrl ? (
                    <a
                      href={modalItem.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs md:text-sm text-orange font-barlow-condensed tracking-widest uppercase font-semibold hover:opacity-80 transition-opacity w-fit cursor-pointer"
                    >
                      {modalItem.company}
                    </a>
                  ) : (
                    <p className="text-xs md:text-sm text-orange font-barlow-condensed tracking-widest uppercase font-semibold">
                      {modalItem.company}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full h-[1px] bg-white/10" />

              {/* Full Review Body */}
              <div className="flex items-start gap-3 w-full">
                <span className="text-4xl sm:text-5xl md:text-6xl font-serif text-orange leading-none select-none shrink-0 -mt-1 sm:-mt-1.5">
                  &ldquo;
                </span>
                <p className="flex-1 text-sm sm:text-base md:text-lg font-barlow-condensed text-foreground/90 leading-relaxed tracking-wide uppercase font-medium whitespace-pre-line">
                  {modalItem.quote}
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
