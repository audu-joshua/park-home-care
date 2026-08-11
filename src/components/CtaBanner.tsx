"use client";

import React from "react";
import { Phone, Calendar } from "lucide-react";

interface CtaBannerProps {
  onOpenConsultation: () => void;
}

export default function CtaBanner({ onOpenConsultation }: CtaBannerProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-[#081630] text-white p-10 sm:p-14 lg:p-16 text-center overflow-hidden shadow-2xl border border-white/10">
          
          {/* Cyan Glow Accent */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00F0ED]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Medical Briefcase Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#00F0ED]/10 text-[#00F0ED] flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-6 h-6" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Ready to Experience Compassionate Care?
            </h2>

            <p className="text-slate-300 text-base sm:text-lg mb-8 font-light leading-relaxed max-w-2xl mx-auto">
              Contact us today to schedule a free consultation. Let us help you find the right care plan for your loved one.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#EE7862] hover:bg-[#E4644D] text-white text-sm font-semibold px-8 py-4 rounded-full shadow-lg shadow-[#EE7862]/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Get In Touch Now</span>
              </button>

              <a
                href="tel:01234567890"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent hover:bg-white/10 text-white text-sm font-semibold px-8 py-4 rounded-full border border-white/30 transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-[#00F0ED]" />
                <span>0123 456 7890</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
