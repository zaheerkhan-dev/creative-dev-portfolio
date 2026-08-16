"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "@/lib/splitText";

interface SocialLinkData {
  name: string;
  url: string;
  viewBox?: string;
  svgPath: React.ReactNode;
}

const contactSocialLinks: SocialLinkData[] = [
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/zakzaheerkhan/",
    viewBox: "0 0 24 24",
    svgPath: (
      <path
        className="fill-foreground group-hover:fill-[#131212] transition-all duration-400 ease-in-out"
        d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533c2.987,0,3.539,1.966,3.539,4.522V22z"
      />
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/zaheerkhan-dev",
    viewBox: "0 0 24 24",
    svgPath: (
      <path
        className="fill-foreground group-hover:fill-[#131212] transition-all duration-400 ease-in-out"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    ),
  },
  {
    name: "X",
    url: "https://x.com/zakzaheerkhan",
    viewBox: "0 0 24 24",
    svgPath: (
      <path
        className="fill-foreground group-hover:fill-[#131212] transition-all duration-400 ease-in-out"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    ),
  },
];

export default function ContactFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const links = gsap.utils.toArray<HTMLElement>(".contact-social-link");
      links.forEach((link) => {
        const nameEl = link.querySelector<HTMLElement>(".contact-social-name");
        if (!nameEl) return;

        const split = new SplitText(nameEl, { type: "chars" });
        gsap.set(split.chars, { yPercent: 100 });

        const onEnter = () => {
          link.setAttribute("data-active", "true");
          gsap.to(split.chars, {
            yPercent: 0,
            ease: "power4.out",
            duration: 0.75,
            stagger: { each: 0.01, from: "center" },
            overwrite: "auto",
          });
        };

        const onLeave = () => {
          link.removeAttribute("data-active");
          gsap.to(split.chars, {
            yPercent: 100,
            ease: "power4.out",
            duration: 0.75,
            stagger: { each: 0.01, from: "center" },
            overwrite: "auto",
          });
        };

        link.addEventListener("mouseenter", onEnter);
        link.addEventListener("mouseleave", onLeave);

        return () => {
          link.removeEventListener("mouseenter", onEnter);
          link.removeEventListener("mouseleave", onLeave);
          split.revert();
        };
      });
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="w-full border-t border-foreground/10 py-6 px-6 md:px-12 bg-transparent"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        {/* Left: Email */}
        <div className="flex-1 min-w-0 flex flex-col items-center md:items-start text-xs md:text-sm font-barlow-condensed tracking-wider text-foreground/80 order-2 md:order-1">
          <span className="text-foreground/50 text-[10px] md:text-xs uppercase tracking-widest mb-0.5">
            Direct Contact
          </span>
          <a
            href="mailto:izak3x@gmail.com"
            className="group relative inline-block text-foreground hover:text-orange transition-colors duration-300 font-semibold pb-0.5"
          >
            izak3x@gmail.com
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-orange origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
          </a>
        </div>

        {/* Center: Social Links */}
        <div className="flex-1 min-w-0 flex justify-center items-center flex-wrap gap-4 order-1 md:order-2">
          {contactSocialLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group contact-social-link relative select-none [-webkit-touch-callout:none] cursor-pointer"
              aria-label={item.name}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 z-20 overflow-hidden relative bg-[#2a2929] rounded-full p-3.5 md:p-4 hover:scale-90 group-data-[active=true]:scale-90 transition-transform duration-300 flex items-center justify-center">
                {/* Circular Orange Expand */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-orange w-1/3 h-full rounded-full translate-y-[110%] group-hover:translate-y-0 group-hover:scale-300 transition-transform duration-300 pointer-events-none" />

                <svg
                  viewBox={item.viewBox || "0 0 24 24"}
                  className="w-full h-full relative z-10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {item.svgPath}
                </svg>
              </div>

              {/* Tooltip on Top with SplitText */}
              <div
                className="contact-social-name absolute overflow-hidden left-1/2 top-0 -translate-x-1/2 -translate-y-full whitespace-nowrap uppercase font-bold tracking-wide text-foreground pointer-events-none text-xs pb-1"
                aria-label={item.name}
              >
                <span>{item.name}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Right Empty Spacer for Symmetry */}
        <div className="flex-1 min-w-0 flex flex-col items-center md:items-end text-xs md:text-sm font-barlow-condensed tracking-wider text-foreground/80 order-3" />
      </div>
    </footer>
  );
}
