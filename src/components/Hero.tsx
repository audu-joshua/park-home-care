"use client";

import React from "react";
import Image from "next/image";
import { Phone, Briefcase, ShieldCheck, Clock, Heart, Home } from "lucide-react";

interface HeroProps {
  onOpenConsultation: () => void;
}

export default function Hero({ onOpenConsultation }: HeroProps) {
  return (
    <section id="hero" className="relative bg-[#081630] text-white pt-8 pb-16 lg:py-20 overflow-hidden">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-radial from-[#0D2247] via-[#081630] to-[#040C1A] opacity-90" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Photo Arches/Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-center">
          {/* Card 1 */}
          <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
            <Image
              src="/images/hero_1.jpg"
              alt="Elderly woman smiling with caregiver"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Center Card / Title Container */}
          <div className="text-center px-4 py-6 md:py-0 z-10 flex flex-col items-center justify-center">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
              Compassionate Care. <br />
              <span className="text-[#00F0ED]">Like Family.</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-8 font-light leading-relaxed">
              At Park Home Health Agency LLC, we provide personalized in-home care that helps your loved ones live safely, comfortably, and independently.
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-sm">
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#EE7862] hover:bg-[#E4644D] text-white text-sm font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-[#EE7862]/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Get Started Today</span>
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent hover:bg-white/10 text-white text-sm font-semibold px-7 py-3.5 rounded-full border border-white/30 transition-all duration-300"
              >
                <Briefcase className="w-4 h-4 text-[#00F0ED]" />
                <span>Our Services</span>
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group hidden md:block">
            <Image
              src="/images/hero_2.jpg"
              alt="Male caregiver assisting elderly man"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>

        {/* Bottom 4 Feature Badges */}
        <div className="mt-12 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-[#00F0ED]/30 transition-colors">
            <div className="p-3 rounded-xl bg-[#00F0ED]/10 text-[#00F0ED] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm mb-1">Vetted & Available</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Background-checked caregivers ready when you need.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-[#00F0ED]/30 transition-colors">
            <div className="p-3 rounded-xl bg-[#00F0ED]/10 text-[#00F0ED] shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm mb-1">24/7 Support</h3>
              <p className="text-slate-400 text-xs leading-relaxed">We're here when you need us, day or night.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-[#00F0ED]/30 transition-colors">
            <div className="p-3 rounded-xl bg-[#00F0ED]/10 text-[#00F0ED] shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm mb-1">Personalised Care</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Tailored specifically to your loved one's needs.</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-[#00F0ED]/30 transition-colors">
            <div className="p-3 rounded-xl bg-[#00F0ED]/10 text-[#00F0ED] shrink-0">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm mb-1">Comfort of Home</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Quality care in a familiar, comforting place.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
