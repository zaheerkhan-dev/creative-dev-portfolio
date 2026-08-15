"use client";

import React, { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAppContext } from "@/context/AppContext";
import { SplitText } from "@/lib/splitText";
import { usePageTransition } from "./TransitionRouter";

const navLinks = ["Home", "About", "Projects", "Contact"];

export default function Navbar() {
  const { isNavbarOpen } = useAppContext();
  const { navigate } = usePageTransition();
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const logoPathRef = useRef<SVGPathElement>(null);
  const logoTlRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedLogo = useRef(false);

  // Desktop links refs
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const desktopIntroTl = useRef<gsap.core.Timeline | null>(null);

  // Mobile menu state & refs
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileScopeRef = useRef<HTMLDivElement>(null);
  const hamburgerTl = useRef<gsap.core.Timeline | null>(null);
  const mobileMenuTl = useRef<gsap.core.Timeline | null>(null);

  // ─────────────────────────────────────────────────────────────
  // 1. Logo Stroke Draw Animation
  // ─────────────────────────────────────────────────────────────
  useGSAP(
    () => {
      const path = logoPathRef.current;
      if (!path) return;

      const len = path.getTotalLength ? path.getTotalLength() : 350;
      path.style.strokeDasharray = `${len} ${len}`;

      // Hover timeline (draw off, then draw back in)
      const tl = gsap.timeline({ paused: true });
      tl.to(path, {
        strokeDashoffset: len,
        duration: 0.35,
        ease: "power2.in",
      })
        .set(path, { strokeDashoffset: -len })
        .to(path, {
          strokeDashoffset: 0,
          duration: 0.35,
          ease: "power2.out",
        });
      logoTlRef.current = tl;

      // Initial reveal
      if (isNavbarOpen && !hasAnimatedLogo.current) {
        hasAnimatedLogo.current = true;
        gsap.fromTo(
          path,
          { strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 0.7,
            ease: "power2.inOut",
            delay: 0.15,
          }
        );
      }
    },
    { scope: navRef, dependencies: [isNavbarOpen] }
  );

  // ─────────────────────────────────────────────────────────────
  // 2. Desktop Navigation Links (Center SplitText + Rolling Hover)
  // ─────────────────────────────────────────────────────────────
  useGSAP(
    () => {
      if (!desktopNavRef.current) return;
      const links = gsap.utils.toArray<HTMLElement>(".desktop-link");
      const introTl = gsap.timeline({ paused: true });

      links.forEach((link) => {
        const firstSpan = link.children[0] as HTMLElement;
        if (!firstSpan) return;
        const split = new SplitText(firstSpan, { type: "chars" });
        gsap.set(split.chars, { yPercent: 100 });

        introTl.to(
          split.chars,
          {
            yPercent: 0,
            ease: "power4.out",
            duration: 1,
            stagger: { each: 0.035, from: "center" },
          },
          0
        );
      });

      desktopIntroTl.current = introTl;
    },
    { scope: desktopNavRef }
  );

  useEffect(() => {
    if (isNavbarOpen) {
      desktopIntroTl.current?.play();
    } else {
      desktopIntroTl.current?.reverse(2);
    }
  }, [isNavbarOpen]);

  // Rolling Hover Effect on Desktop Links
  useGSAP(
    () => {
      if (!desktopNavRef.current) return;
      const links = gsap.utils.toArray<HTMLElement>(".desktop-link");
      const splits: SplitText[] = [];
      const listeners: { link: HTMLElement; onEnter: () => void; onLeave: () => void }[] = [];

      links.forEach((link) => {
        const [span1, span2] = Array.from(link.children) as HTMLElement[];
        if (!span1 || !span2) return;

        const split1 = new SplitText(span1, { type: "chars" });
        const split2 = new SplitText(span2, { type: "chars" });
        splits.push(split1, split2);

        const hoverTl = gsap.timeline({ paused: true });
        hoverTl
          .to(split1.chars, {
            yPercent: -100,
            ease: "power4.out",
            duration: 0.75,
            stagger: { each: 0.035, from: "center" },
          })
          .to(
            split2.chars,
            {
              yPercent: -100,
              ease: "power4.out",
              duration: 0.75,
              stagger: { each: 0.035, from: "center" },
            },
            "<"
          );

        const onEnter = () => hoverTl.play();
        const onLeave = () => hoverTl.reverse();

        link.addEventListener("mouseenter", onEnter);
        link.addEventListener("mouseleave", onLeave);
        listeners.push({ link, onEnter, onLeave });
      });

      return () => {
        listeners.forEach(({ link, onEnter, onLeave }) => {
          link.removeEventListener("mouseenter", onEnter);
          link.removeEventListener("mouseleave", onLeave);
        });
        splits.forEach((s) => s.revert());
      };
    },
    { scope: desktopNavRef }
  );

  // ─────────────────────────────────────────────────────────────
  // 3. Mobile Hamburger & Fullscreen Menu
  // ─────────────────────────────────────────────────────────────
  useGSAP(
    () => {
      if (!mobileScopeRef.current) return;

      const closeSpans = gsap.utils.toArray<HTMLElement>(".hamburger-close span");
      const openSpans = gsap.utils.toArray<HTMLElement>(".hamburger-open span");
      const menu = mobileScopeRef.current.querySelector<HTMLElement>(".mobile-menu");
      const menuLinks = gsap.utils
        .toArray<HTMLElement>(".mobile-menu-link span")
        .map((span) => new SplitText(span, { type: "chars" }));

      // Set initial states
      gsap.set(openSpans, { yPercent: 100 });
      gsap.set(menu, { autoAlpha: 0, display: "none" });
      menuLinks.forEach((s) => gsap.set(s.chars, { yPercent: 100 }));

      // Hamburger Morph Timeline
      const hTl = gsap.timeline({ paused: true });
      hTl
        .fromTo(
          closeSpans,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.5, stagger: { each: 0.1, from: "end" } }
        )
        .fromTo(
          openSpans,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.5, stagger: { each: 0.1, from: "end" } },
          "<"
        );
      hamburgerTl.current = hTl;

      // Mobile Menu Fullscreen Open Timeline
      const mTl = gsap.timeline({
        paused: true,
        onStart: () => {
          gsap.set(menu, { display: "flex" });
        },
        onReverseComplete: () => {
          gsap.set(menu, { display: "none" });
        },
      });

      // SVG morph path animation
      mTl
        .to(".overlay-svg-path", {
          duration: 0.65,
          ease: "linear",
          attr: { d: "M0 1005S175 1000 500 1000s500 5 500 5V0H0Z" },
        })
        .to(menu, { autoAlpha: 1, duration: 0.2 }, "<")
        .to(
          closeSpans,
          { xPercent: -100, duration: 0.5, ease: "power2.inOut", stagger: 0.1 },
          "<"
        )
        .to(
          openSpans,
          { yPercent: 0, duration: 0.5, ease: "power2.inOut", stagger: 0.1 },
          "<"
        );

      menuLinks.forEach((split, idx) => {
        mTl.to(
          split.chars,
          {
            yPercent: 0,
            stagger: { each: 0.025, from: "center" },
            ease: "power4.out",
            duration: 0.75,
          },
          idx === 0 ? "<" : "-=0.7"
        );
      });

      mobileMenuTl.current = mTl;

      return () => {
        menuLinks.forEach((s) => s.revert());
      };
    },
    { scope: mobileScopeRef }
  );

  useEffect(() => {
    if (isNavbarOpen) {
      hamburgerTl.current?.play();
    } else {
      hamburgerTl.current?.reverse();
    }
  }, [isNavbarOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      mobileMenuTl.current?.play();
    } else {
      mobileMenuTl.current?.reverse();
    }

    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  const getHref = (name: string) => (name === "Home" ? "/" : `/${name.toLowerCase()}`);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigate(href);
  };

  return (
    <nav
      ref={navRef}
      className={`w-full fixed top-0 left-0 flex justify-between items-center py-3 px-5 z-50 ${
        isNavbarOpen ? "pointer-events-auto" : "pointer-events-none"
      } transition-all duration-500 ease-in-out`}
    >
      {/* Signature Logo Mark */}
      <a
        href="/"
        aria-label="Home"
        onClick={(e) => handleNavClick(e, "/")}
        onMouseEnter={() => logoTlRef.current?.play()}
        onMouseLeave={() => logoTlRef.current?.reverse()}
        className={`pointer-events-auto transition-all duration-500 ease-in-out cursor-pointer ${
          isNavbarOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-16 h-16 flex items-center justify-center p-0.5 hover:scale-110 transition-transform duration-300">
          <svg viewBox="0 0 500 500" className="w-full h-full fill-none">
            <path
              ref={logoPathRef}
              d="M 175 165 L 325 165 L 175 335 L 325 335"
              className="fill-none stroke-foreground stroke-[50]"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </a>

      {/* Desktop Navigation Links */}
      <div
        ref={desktopNavRef}
        className="hidden md:flex justify-center items-center gap-8 text-foreground"
      >
        {navLinks.map((name) => {
          const href = getHref(name);
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <a
              key={name}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="cursor-pointer"
            >
              <div
                className={`desktop-link ${
                  isNavbarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                } overflow-hidden tracking-[.2rem] relative text-[1em] uppercase leading-[1em] ${
                  isActive ? "text-orange pointer-events-none" : "text-foreground pointer-events-auto"
                } transition-all duration-300 ease-in-out`}
              >
                <span aria-hidden="true">{name}</span>
                <span aria-hidden="true" className="absolute left-0 top-0 translate-y-full text-orange">
                  {name}
                </span>
              </div>
            </a>
          );
        })}
      </div>

      {/* Mobile Hamburger & Overlay */}
      <div ref={mobileScopeRef} className="md:hidden">
        <button
          className="hamburger relative w-7 h-7 cursor-pointer flex justify-center items-center z-50"
          aria-label="Menu"
          aria-controls="mobile-menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {/* Hamburger Close Icon (3 horizontal bars) */}
          <div className="hamburger-close w-full h-full overflow-hidden flex flex-col gap-1 justify-center items-center">
            <span className="w-full h-1 bg-foreground rounded-4xl" />
            <span className="w-full h-1 bg-foreground rounded-4xl" />
            <span className="w-full h-1 bg-foreground rounded-4xl" />
          </div>

          {/* Hamburger Open Icon (3 vertical bars) */}
          <div className="hamburger-open absolute w-full h-full rounded-[5px] overflow-hidden flex gap-1 justify-center items-center">
            <span className="w-1 h-full bg-foreground rounded-4xl" />
            <span className="w-1 h-full bg-foreground rounded-4xl" />
            <span className="w-1 h-full bg-foreground rounded-4xl" />
          </div>
        </button>

        {/* Mobile SVG Organic Wave Backdrop */}
        <div className="md:hidden absolute top-0 left-0 w-full h-svh pointer-events-none z-30">
          <svg className="w-full h-lvh" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path
              className="overlay-svg-path fill-background"
              d="M0 2S175 1 500 1s500 1 500 1V0H0Z"
            />
          </svg>
        </div>

        {/* Mobile Fullscreen Menu */}
        <div className="mobile-menu md:hidden fixed inset-0 flex-col justify-center items-center z-40">
          {navLinks.map((name) => {
            const href = getHref(name);
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <a
                key={name}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="cursor-pointer"
              >
                <div className="mobile-menu-link text-8xl whitespace-nowrap tracking-wide overflow-hidden leading-25 uppercase cursor-pointer font-bigger-display">
                  <span className={isActive ? "text-orange" : "text-foreground"}>{name}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
