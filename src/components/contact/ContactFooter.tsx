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
    name: "Upwork",
    url: "https://www.upwork.com/freelancers/~01290115e797943d08?mp_source=share",
    viewBox: "0 0 24 24",
    svgPath: (
      <path
        className="fill-foreground group-hover:fill-[#131212] transition-all duration-400 ease-in-out"
        d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"
      />
    ),
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/nikhil-dhakad",
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
    url: "https://github.com/Tech-Nickkk",
    viewBox: "0 0 24 24",
    svgPath: (
      <path
        className="fill-foreground group-hover:fill-[#131212] transition-all duration-400 ease-in-out"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    ),
  },
  {
    name: "CodePen",
    url: "https://codepen.io/nikhildhakad",
    viewBox: "0 0 24 24",
    svgPath: (
      <path
        className="fill-foreground group-hover:fill-[#131212] transition-all duration-400 ease-in-out"
        d="M24 7.643l-.004-.047-.008-.046-.012-.047c-.005-.015-.011-.03-.017-.044l-.018-.042-.023-.042-.025-.038-.028-.037-.031-.035-.033-.032-.036-.03-.037-.026-.04-.024-.042-.02-.043-.016-.045-.013-.047-.009-.047-.004-.05-.002L12.302.016a.998.998 0 0 0-.604 0L.648 7.378l-.05.002-.047.004-.047.009-.045.013-.043.016-.042.02-.04.024-.037.026-.036.03-.033.032-.031.035-.028.037-.025.038-.023.042-.018.042c-.006.014-.012.029-.017.044l-.012.047-.008.046L0 7.643v8.714l.004.047.008.046.012.047c.005.015.011.03.017.044l.018.042.023.042.025.038.028.037.031.035.033.032.036.03.037.026.04.024.042.02.043.016.045.013.047.009.047.004.05.002 11.05 7.362c.098.065.21.1.326.113.09.011.183.007.278-.013l11.05-7.362.05-.002.047-.004.047-.009.045-.013.043-.016.042-.02.04-.024.037-.026.036-.03.033-.032.031-.035.028-.037.025-.038.023-.042.018-.042c.006-.014.012-.029.017-.044l.012-.047.008-.046.004-.047V7.643zm-10.999 1.48l3.963 2.646-3.963 2.647V9.123zm-2 0v5.294L7.038 11.77 11.001 9.123zM2.001 9.684l2.833 1.89-2.833 1.89V9.684zm9 7.023v5.17L3.238 16.71l7.763-5.18v5.177zm2 0l7.763-5.18-7.763 5.169v-5.166zm8.999-3.257l-2.833-1.89 2.833-1.89v3.78zM12 14.288L15.433 12 12 9.712 8.567 12 12 14.288zm1-12.165l7.762 5.177-7.762 5.178V2.123zm-2 0v5.178L3.238 7.3 11 2.123z"
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
            href="mailto:nikhildhakad712@gmail.com"
            className="group relative inline-block text-foreground hover:text-orange transition-colors duration-300 font-semibold pb-0.5"
          >
            nikhildhakad712@gmail.com
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
