"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Services from "@/components/Services";
import AboutFounder from "@/components/AboutFounder";
import FAQ from "@/components/FAQ";
import BlogSection from "@/components/BlogSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleOpenConsultation = (serviceName: string = "") => {
    setSelectedService(serviceName);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#00F0ED] selection:text-[#081630]">
      {/* Sticky Header */}
      <Header onOpenConsultation={() => handleOpenConsultation()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenConsultation={() => handleOpenConsultation()} />
        <Philosophy />
        <Services onSelectService={(service) => handleOpenConsultation(service)} />
        <AboutFounder />
        <FAQ />
        <BlogSection />
        <CtaBanner onOpenConsultation={() => handleOpenConsultation()} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Free Consultation Booking Modal */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedService={selectedService}
      />
    </div>
  );
}
