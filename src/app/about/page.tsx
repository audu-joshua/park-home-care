"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutFounder from "@/components/AboutFounder";
import Philosophy from "@/components/Philosophy";
import ConsultationModal from "@/components/ConsultationModal";
import Gallery from "@/components/Gallery";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onOpenConsultation={() => setModalOpen(true)} />

      {/* Hero Banner for About */}
      <section className="bg-[#081630] text-white pt-36 pb-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs font-bold text-[#00F0ED] tracking-widest uppercase mb-3 block">
            OUR STORY & MISSION
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            About Park Home Health LLC
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Founded with heart, guided by integrity, and committed to empowering individuals to live safely and independently in the comfort of their homes.
          </p>
        </div>
      </section>

      <main className="flex-1">
        <ScrollReveal>
          <AboutFounder />
        </ScrollReveal>
        <ScrollReveal>
          <Philosophy />
        </ScrollReveal>
        <ScrollReveal>
          <Gallery />
        </ScrollReveal>
      </main>

      <Footer />

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedService="About Us Inquiry"
      />
    </div>
  );
}
