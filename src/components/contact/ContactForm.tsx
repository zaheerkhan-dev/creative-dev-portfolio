"use client";

import React, { useRef, useState, useMemo, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "@/lib/splitText";
import { playClick } from "@/lib/soundEffects";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<"idle" | "sending" | "success" | "error">("idle");
  const [isDisabled, setIsDisabled] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const submitTextRef = useRef<HTMLDivElement>(null);
  const proxyTextRef = useRef<HTMLDivElement>(null);

  const titleTalkRef = useRef<HTMLHeadingElement>(null);
  const titleSubmittedRef = useRef<HTMLHeadingElement>(null);
  const titleErrorRef = useRef<HTMLHeadingElement>(null);

  const progressRef = useRef<HTMLDivElement>(null);
  const checkmarkRef = useRef<SVGPathElement>(null);
  const errorLineRef = useRef<SVGPathElement>(null);
  const errorDotRef = useRef<SVGPathElement>(null);

  const submitTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const submitSplitRef = useRef<SplitText | null>(null);
  const proxySplitRef = useRef<SplitText | null>(null);

  const isTouchDevice = useMemo(
    () =>
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0),
    []
  );

  const triggerResultAnimation = () => {
    if (!titleTalkRef.current || !titleSubmittedRef.current || !titleErrorRef.current) return;

    const talkSplit = new SplitText(titleTalkRef.current, { type: "chars" });
    const subSplit = new SplitText(titleSubmittedRef.current, { type: "chars" });
    const errSplit = new SplitText(titleErrorRef.current, { type: "chars" });

    const isSuccess = statusRef.current === "success";
    const targetIcon = isSuccess ? checkmarkRef.current : errorLineRef.current;
    const errorDot = errorDotRef.current;
    const strokeDash = isSuccess ? 41 : 10;
    const activeHeaderSplit = isSuccess ? subSplit : errSplit;

    if (!targetIcon) return;

    const tl = gsap.timeline();
    tl.to(targetIcon, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" })
      .to(
        talkSplit.chars,
        {
          yPercent: -100,
          ease: "power4.out",
          duration: 0.75,
          stagger: { each: 0.025, from: "center" },
        },
        "<"
      )
      .to(
        activeHeaderSplit.chars,
        {
          yPercent: -100,
          ease: "power4.out",
          duration: 0.75,
          stagger: { each: 0.025, from: "center" },
        },
        "<"
      );

    if (!isSuccess && errorDot) {
      tl.to(errorDot, { opacity: 1, duration: 0.3 }, "-=.5");
    }

    tl.to(targetIcon, {
      strokeDashoffset: -strokeDash,
      duration: 0.3,
      delay: 0.6,
      ease: "power2.in",
    });

    if (!isSuccess && errorDot) {
      tl.to(errorDot, { opacity: 0, duration: 0.3 }, "<");
    }

    tl.to(talkSplit.chars, {
      yPercent: 0,
      ease: "power4.inOut",
      duration: 1,
      stagger: { each: 0.035, from: "center" },
    })
      .to(
        activeHeaderSplit.chars,
        {
          yPercent: 0,
          ease: "power4.inOut",
          duration: 1,
          stagger: { each: 0.035, from: "center" },
        },
        "<"
      )
      .set(targetIcon, { strokeDashoffset: strokeDash });
  };

  useGSAP(() => {
    if (
      !buttonRef.current ||
      !submitTextRef.current ||
      !proxyTextRef.current ||
      !progressRef.current ||
      !checkmarkRef.current ||
      !errorLineRef.current ||
      !errorDotRef.current
    )
      return;

    submitTimelineRef.current?.kill();
    const btn = buttonRef.current;
    const initialWidth = btn.offsetWidth || 180;
    const initialHeight = btn.offsetHeight || 60;

    submitSplitRef.current = new SplitText(submitTextRef.current, { type: "chars" });
    proxySplitRef.current = new SplitText(proxyTextRef.current, { type: "chars" });

    gsap.set([checkmarkRef.current, errorLineRef.current], {
      strokeDasharray: (i) => (i === 0 ? 41 : 10),
      strokeDashoffset: (i) => (i === 0 ? 41 : 10),
    });

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        setIsDisabled(false);
        statusRef.current = "idle";
        formRef.current?.reset();
      },
    });

    submitTimelineRef.current = tl;

    if (isTouchDevice) {
      tl.to(submitSplitRef.current.chars, {
        yPercent: -100,
        ease: "power4.out",
        duration: 0.75,
        stagger: { each: 0.025, from: "center" },
      });
    } else {
      tl.to(proxySplitRef.current.chars, {
        yPercent: 0,
        ease: "power4.out",
        duration: 0.75,
        stagger: { each: 0.025, from: "center" },
      });
    }

    tl.to(
      btn,
      { duration: 0.4, height: "10px", width: "250px", ease: "power2.inOut" },
      "-=0.5"
    )
      .to(progressRef.current, {
        duration: 1.5,
        width: "250px",
        ease: "power1.inOut",
      })
      .to(btn, { duration: 0.4, background: "#2a2929", ease: "power2.inOut" }, "-=0.2")
      .set(progressRef.current, { width: 0 })
      .to(btn, {
        duration: 0.5,
        width: "50px",
        height: "50px",
        ease: "back.out(1.2)",
      })
      .add(triggerResultAnimation)
      .to({}, { duration: 2.2 })
      .to(
        btn,
        {
          width: initialWidth,
          height: initialHeight,
          background: "#2a2929",
          duration: 0.4,
          ease: "back.out(1.2)",
        },
        "-=.3"
      )
      .to(submitSplitRef.current.chars, {
        yPercent: 0,
        ease: "power4.out",
        duration: 0.75,
        stagger: { each: 0.025, from: "center" },
      });

    return () => {
      submitTimelineRef.current?.kill();
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!isDisabled && !isTouchDevice && submitSplitRef.current && proxySplitRef.current) {
      gsap.to(submitSplitRef.current.chars, {
        yPercent: -100,
        ease: "power4.out",
        duration: 0.75,
        stagger: { each: 0.025, from: "center" },
      });
      gsap.to(proxySplitRef.current.chars, {
        yPercent: -100,
        ease: "power4.out",
        duration: 0.75,
        stagger: { each: 0.025, from: "center" },
      });
    }
  }, [isDisabled, isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    if (!isDisabled && !isTouchDevice && submitSplitRef.current && proxySplitRef.current) {
      gsap.to(submitSplitRef.current.chars, {
        yPercent: 0,
        ease: "power4.out",
        duration: 0.75,
        stagger: { each: 0.025, from: "center" },
      });
      gsap.to(proxySplitRef.current.chars, {
        yPercent: 0,
        ease: "power4.out",
        duration: 0.75,
        stagger: { each: 0.025, from: "center" },
      });
    }
  }, [isDisabled, isTouchDevice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    playClick();
    setIsDisabled(true);
    statusRef.current = "sending";
    submitTimelineRef.current?.restart();

    // Emulate contact submission / EmailJS
    setTimeout(() => {
      statusRef.current = "success";
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      {/* Title Header with SplitText Animation */}
      <div className="relative w-full overflow-hidden text-center">
        <h1
          ref={titleTalkRef}
          className="text-7xl md:text-8xl text-foreground font-bigger-display uppercase tracking-wide"
        >
          Let&apos;s Talk
        </h1>
        <h1
          ref={titleSubmittedRef}
          className="absolute right-1/2 translate-x-1/2 text-7xl md:text-8xl text-orange font-bigger-display uppercase tracking-wide translate-y-full"
        >
          Submitted
        </h1>
        <h1
          ref={titleErrorRef}
          className="absolute right-1/2 translate-x-1/2 text-7xl md:text-8xl text-orange font-bigger-display uppercase tracking-wide translate-y-full"
        >
          Error!
        </h1>
      </div>

      {/* Form with Floating Labels */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full flex flex-col justify-center items-center gap-5 md:gap-6"
      >
        {/* Name Field */}
        <div className="relative w-1/3 min-w-[325px]">
          <input
            type="text"
            id="name"
            name="name"
            placeholder=" "
            required
            className="peer bg-transparent p-3 border-2 border-foreground/30 w-full focus:outline-none focus:border-orange transition-colors text-lg rounded-none"
          />
          <label
            htmlFor="name"
            className="bg-background text-[15px] px-1 absolute left-3 text-foreground/60 tracking-widest uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange not-placeholder-shown:-top-2 not-placeholder-shown:text-xs pointer-events-none"
          >
            What&apos;s your name?
          </label>
        </div>

        {/* Email Field */}
        <div className="relative w-1/3 min-w-[325px]">
          <input
            type="email"
            id="email"
            name="email"
            placeholder=" "
            required
            className="peer bg-transparent p-3 border-2 border-foreground/30 w-full focus:outline-none focus:border-orange transition-colors text-lg rounded-none"
          />
          <label
            htmlFor="email"
            className="bg-background text-[15px] px-1 absolute left-3 text-foreground/60 tracking-widest uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange not-placeholder-shown:-top-2 not-placeholder-shown:text-xs pointer-events-none"
          >
            What&apos;s your email?
          </label>
        </div>

        {/* Message Field */}
        <div className="relative w-1/3 min-w-[325px]">
          <textarea
            id="message"
            name="message"
            required
            rows={3}
            placeholder=" "
            className="peer bg-transparent p-3 border-2 border-foreground/30 w-full focus:outline-none focus:border-orange transition-colors resize-none text-lg rounded-none"
          />
          <label
            htmlFor="message"
            className="bg-background text-[15px] px-1 absolute left-3 text-foreground/60 tracking-widest uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange not-placeholder-shown:-top-2 not-placeholder-shown:text-xs pointer-events-none"
          >
            Tell me about your project...
          </label>
        </div>

        {/* Animated Submit Pill / Badge Button */}
        <div className="relative flex justify-center items-center min-h-[60px]">
          <button
            type="submit"
            aria-label="Submit form"
            ref={buttonRef}
            disabled={isDisabled}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group relative bg-[#1f1e1e] h-15 w-[180px] overflow-hidden rounded-full cursor-pointer flex items-center justify-center disabled:pointer-events-none disabled:cursor-not-allowed"
          >
            <div className="relative text-2xl text-foreground font-bigger-display overflow-hidden uppercase z-10 tracking-[.2rem] h-7 flex items-center justify-center leading-none translate-y-[2px]">
              <div
                ref={submitTextRef}
                className="whitespace-nowrap flex items-center justify-center leading-none"
              >
                Submit
              </div>
              <div
                ref={proxyTextRef}
                className="text-[#121212] whitespace-nowrap proxy-submit-btn absolute top-0 left-0 w-full h-full flex items-center justify-center translate-y-full z-10 leading-none"
              >
                Submit
              </div>
            </div>
            {/* Orange Hover Circular Fill */}
            <div className="btn-hover-bg absolute top-0 left-1/2 -translate-x-1/2 bg-orange w-1/3 h-full rounded-full translate-y-[110%] group-hover:translate-y-0 group-hover:scale-300 transition-transform duration-300 pointer-events-none" />
          </button>

          {/* Svg Loader / Success Checkmark / Error Exclamation */}
          <div
            ref={progressRef}
            className="absolute pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[10px] w-0 rounded-full bg-orange"
          >
            {/* Checkmark */}
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25px]"
              viewBox="0 0 25 30"
            >
              <path
                ref={checkmarkRef}
                d="M2,19.2C5.9,23.6,9.4,28,9.4,28L23,2"
                className="fill-none stroke-orange stroke-4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Error Exclamation */}
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px]"
              viewBox="0 0 25 30"
            >
              <path
                ref={errorLineRef}
                d="M12 4 L12 14"
                className="stroke-orange stroke-4 fill-none"
                strokeLinecap="round"
              />
              <path
                ref={errorDotRef}
                d="M12 18a1.5 1.5 0 1 0 0.0001 0"
                className="opacity-0 fill-orange"
              />
            </svg>
          </div>
        </div>
      </form>
    </div>
  );
}
