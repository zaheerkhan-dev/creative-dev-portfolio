"use client";

import React from "react";
import ParticleCanvas from "@/components/ParticleCanvas";
import ContactForm from "@/components/contact/ContactForm";
import ContactFooter from "@/components/contact/ContactFooter";

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground overflow-hidden relative">
      <main className="w-full">
        <section className="w-full min-h-lvh flex flex-col items-center justify-between overflow-hidden relative bg-background">
          {/* Background Interactive WebGL Particle Cloud */}
          <div className="absolute inset-0 z-0 pointer-events-auto">
            <div className="relative h-full w-full overflow-hidden">
              <ParticleCanvas />
            </div>
          </div>

          {/* Form Content Container */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-7 pointer-events-none pt-24 pb-12 flex-1 my-auto">
            <div className="w-full pointer-events-auto max-w-4xl px-4">
              <ContactForm />
            </div>
          </div>

          {/* Bottom Footer with Email & Social Links */}
          <div className="w-full pointer-events-auto z-10 mt-auto">
            <ContactFooter />
          </div>
        </section>
      </main>
    </div>
  );
}
