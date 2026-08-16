"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Phone, Users, ShieldCheck, Clock, Heart, Home } from "lucide-react";

interface HeroProps {
  onOpenConsultation: () => void;
}

export default function Hero({ onOpenConsultation }: HeroProps) {
  const images = [
    { src: "/images/image_2.webp", alt: "Caregiver smiling with senior" },
    { src: "/images/image_5.webp", alt: "Male caregiver supporting elderly man" },
    { src: "/images/image_3.webp", alt: "Female nurse walking with senior woman" },
    { src: "/images/image_1.webp", alt: "Caregivers assisting elderly couple" },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const next = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = () => {
    setActiveSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-advance slider every 4s on mobile
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      id="hero"
      className="relative bg-[#081630] text-white min-h-screen flex flex-col justify-between overflow-x-hidden max-w-full"
    >
      {/* ─────────────────────────────────────────────────
          DESKTOP: 4 Full-Height Vertical Columns (edge-to-edge)
      ───────────────────────────────────────────────── */}
      <div className="absolute inset-0 hidden md:grid grid-cols-4 w-full">
        {images.map((img, idx) => (
          <div key={idx} className="relative overflow-hidden bg-[#081630]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover object-top scale-105 transition-transform duration-700 hover:scale-110"
              priority={idx < 2}
            />
          </div>
        ))}
        {/* Rich dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081630] via-[#081630]/75 to-[#081630]/30" />
      </div>

      {/* ─────────────────────────────────────────────────
          MOBILE: Single Image Slider (full bleed, auto-playing)
      ───────────────────────────────────────────────── */}
      <div className="absolute inset-0 md:hidden overflow-hidden bg-[#081630] w-full">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover object-[center_35%] scale-100"
              priority={idx === 0}
            />
          </div>
        ))}
        {/* Dark gradient overlay on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081630] via-[#081630]/75 to-[#081630]/40" />
      </div>

      {/* ─────────────────────────────────────────────────
          HERO TEXT CONTENT (sits above both bg layers)
      ───────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-end flex-1 pb-10 sm:pb-12 pt-28 sm:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

          {/* Headline + CTA block */}
          <div className="text-center mb-10 sm:mb-12">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight mb-4">
              Compassionate Care. <br />
              <span className="text-[#00F0ED]">Like Family.</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-7 font-light leading-relaxed">
              At Pack Home Health Care Agency LLC, we provide personalized in-home care that helps your loved ones live safely, comfortably, and independently.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#EE7862] hover:bg-[#E4644D] text-white text-sm font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-[#EE7862]/25 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Get Started Today</span>
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent hover:bg-white/10 text-white text-sm font-semibold px-8 py-3.5 rounded-full border border-white/35 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Users className="w-4 h-4 text-[#00F0ED]" />
                <span>Our Services</span>
              </a>
            </div>
          </div>

          {/* Bottom 4 Feature Bar */}
          <div className="border-t border-white/10 pt-6 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5">
            {[
              { icon: ShieldCheck, title: "Trusted & Reliable", desc: "Background-checked caregivers", border: true },
              { icon: Clock, title: "24/7 Support", desc: "We're here when you need us", border: true },
              { icon: Heart, title: "Personalized Care", desc: "Tailored to your loved one's needs", border: true },
              { icon: Home, title: "Comfort of Home", desc: "Quality care in a familiar place", border: false },
            ].map(({ icon: Icon, title, desc, border }, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 ${border ? "lg:border-r lg:border-white/10 lg:pr-4" : ""}`}
              >
                <div className="p-2 rounded-lg bg-[#00F0ED]/10 text-[#00F0ED] shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-xs sm:text-sm leading-tight mb-0.5">{title}</h3>
                  <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
