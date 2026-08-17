"use client";

import React from "react";
import Image from "next/image";
import ParticleCanvas from "./ParticleCanvas";
import SocialLinks from "./SocialLinks";

export default function HeroSection() {
  return (
    <section className="w-full h-svh flex justify-center relative overflow-hidden">
      {/* Background Portrait Image */}
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/Images/Home/Home_Image.webp"
          alt="Creative developer portrait"
          fill
          sizes="100vw"
          className="object-cover md:scale-120 translate-y-8 md:translate-y-16"
          priority
        />
      </div>

      {/* Center Top Title with mix-blend-difference */}
      <div className="relative z-10 text-center mix-blend-difference">
        <h1 className="tracking-[.6rem] md:mt-[5.5rem] mt-[8rem] uppercase text-[.8rem] md:text-[1rem] font-bold text-foreground font-barlow-condensed">
          Zaheer Khan
        </h1>
      </div>

      {/* Interactive WebGL Particle Cloud (78,631 points) */}
      <ParticleCanvas img="/Images/Home/Home_Particle_Text.webp" mixBlend={true} />

      {/* Social Links */}
      <SocialLinks />

      {/* Fixed Gradient Vignettes for cinematic framing */}
      <div className="w-full h-screen fixed top-0 left-0 z-40 pointer-events-none">
        <div className="absolute left-0 top-0 w-full h-[10rem] bg-gradient-to-b from-background to-transparent" />
        <div className="absolute left-0 bottom-0 w-full h-[10rem] bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}
