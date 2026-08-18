"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import CtaBanner from "@/components/CtaBanner";
import ScrollReveal from "@/components/ScrollReveal";
import {
  HeartHandshake,
  UserCheck,
  Brain,
  // Stethoscope,
  Activity,
  // Church,
  Utensils,
  ShieldCheck,
  Home as HomeIcon,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

/* ─── Categories ─────────────────────────────────────────────────── */
const categories = [
  { id: "all", label: "All Services" },
  { id: "planning", label: "Care Planning" },
  { id: "daily", label: "Daily Living" },
  { id: "wellness", label: "Wellness" },
  { id: "specialized", label: "Specialized Care" },
];

/* ─── 9 Distinct Services (Exactly 3 rows of 3) ───────────────────── */
const services = [
  {
    category: "planning",
    icon: ShieldCheck,
    title: "Comprehensive Care Assessment",
    tagline: "Personalized & Detailed Planning",
    description:
      "Initial in-depth evaluation covering medical history, emotional needs, and lifestyle routines to design a thorough baseline care plan unique to each client.",
    highlights: ["In-home safety audit", "Lifestyle & preference mapping", "Family consultation"],
  },
  {
    category: "daily",
    icon: UserCheck,
    title: "Personal Hygiene & Daily Living",
    tagline: "Dignified Personal Care",
    description:
      "Respectful assistance with bathing, dressing, personal grooming, oral care, and incontinence management in the comfort and privacy of home.",
    highlights: ["Bathing & grooming assistance", "Dressing & hygiene care", "Dignified support"],
  },
  {
    category: "daily",
    icon: HomeIcon,
    title: "Mobility & Household Management",
    tagline: "Safe & Clean Home Environment",
    description:
      "Support with transferring, walking safely, light housekeeping, laundry, and maintaining a hazard-free, organized home environment.",
    highlights: ["Transfer & walking support", "Light housekeeping & laundry", "Fall prevention placement"],
  },
  {
    category: "wellness",
    icon: Utensils,
    title: "Nutrition & Custom Meal Planning",
    tagline: "Dietary & Hydration Oversight",
    description:
      "Preparation of fresh, heart-healthy meals tailored to dietary restrictions, doctor recommendations, and personal taste preferences.",
    highlights: ["Doctor-guided meal prep", "Hydration monitoring", "Grocery shopping assistance"],
  },
  // {
  //   category: "wellness",
  //   icon: Church,
  //   title: "Spiritual Life & Outings Transport",
  //   tagline: "Faith & Community Connection",
  //   description:
  //     "Reliable, escort-assisted transportation to church services, faith-based gatherings, social events, and family visits — keeping community ties strong.",
  //   highlights: ["Church & service transport", "Community outing escort", "Social event accompaniment"],
  // },
  {
    category: "wellness",
    icon: HeartHandshake,
    title: "Companionship & Mental Well-Being",
    tagline: "Emotional & Cognitive Engagement",
    description:
      "Meaningful conversation, cognitive memory games, tech assistance for family video calls, and gentle mental health encouragement every day.",
    highlights: ["Family tech setup & calls", "Memory & puzzle games", "Daily emotional check-ins"],
  },
  {
    category: "specialized",
    icon: Brain,
    title: "Alzheimer's & Dementia Memory Care",
    tagline: "Specialized Cognitive Support",
    description:
      "Structured daily routines, wandering prevention, behavioral agitation management, and safe cognitive stimulation exercises for memory care clients.",
    highlights: ["Memory-focused routines", "Wandering prevention", "Empathetic behavioral care"],
  },
  // {
  //   category: "specialized",
  //   icon: Stethoscope,
  //   title: "Post-Surgery & Hospital Recovery",
  //   tagline: "Smooth In-Home Healing",
  //   description:
  //     "Mobility transfers, wound care reminders, nutrition tracking, and daily in-home assistance designed to prevent hospital readmission and speed recovery.",
  //   highlights: ["Transfer & movement assistance", "Healing nutrition oversight", "Incision monitoring reminders"],
  // },
  {
    category: "specialized",
    icon: Activity,
    title: "Therapy & Chronic Condition Reminders",
    tagline: "Stroke, MS, Parkinson's & Cardiac",
    description:
      "Non-clinical physical, speech, and occupational therapy exercise reminders, medication tracking logs, and energy pacing for ongoing conditions.",
    highlights: ["Therapy routine reminders", "Medication adherence tracking", "Energy conservation pacing"],
  },
];

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const handleOpenConsultation = (serviceName: string = "") => {
    setSelectedService(serviceName);
    setModalOpen(true);
  };

  const filtered =
    activeTab === "all" ? services : services.filter((s) => s.category === activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onOpenConsultation={() => handleOpenConsultation()} />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative bg-[#081630] text-white pt-40 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative background rings */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border border-white/5" />
          <div className="absolute -top-16 -right-16 w-[400px] h-[400px] rounded-full border border-white/5" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#00F0ED]/5 blur-3xl" />
          <div className="absolute top-20 right-1/4 w-40 h-40 rounded-full bg-[#EE7862]/10 blur-2xl" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="inline-block text-[11px] font-bold text-[#00F0ED] tracking-[0.2em] uppercase mb-5 px-4 py-1.5 rounded-full border border-[#00F0ED]/30 bg-[#00F0ED]/5">
            Home Care Support Tailored for Every Client
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Our Senior{" "}
            <span className="relative inline-block">
              <span className="relative z-10">In-Home Care</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-[#EE7862]/30 -skew-x-2 -z-0 rounded" />
            </span>{" "}
            Services
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Designed to enhance well-being, dignity, and comfort for your loved ones — in the
            familiar surroundings of home.
          </p>

          {/* Stats row */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-xl mx-auto">
            {[
              { value: "9", label: "Specialized Services" },
              { value: "24/7", label: "Availability" },
              { value: "100%", label: "Personalized Care" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-white">{stat.value}</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="flex-1">

        {/* ── Services Grid ────────────────────────────────── */}
        <section className="py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Filter pills */}
            <ScrollReveal direction="up">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    activeTab === cat.id
                      ? "bg-[#081630] text-white shadow-md scale-105"
                      : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200 hover:text-slate-800"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            </ScrollReveal>

            {/* Services Grid (Matches exact HomeServices design) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <ScrollReveal key={idx} delay={idx * 70} direction="up">
                  <div
                    className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                  >
                    <div>
                      {/* Top Badge & Icon */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-[#00F0ED]/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          <Icon className="w-6 h-6 text-[#EE7862]" />
                        </div>
                        <span className="text-[10px] font-bold text-[#00F0ED] uppercase tracking-wider bg-[#081630] px-3 py-1 rounded-full">
                          {service.tagline}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-xl font-bold text-[#081630] mb-2.5 leading-snug">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 text-sm leading-relaxed mb-5 font-light">
                        {service.description}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-2 mb-6 pt-4 border-t border-slate-100 text-xs text-slate-700">
                        {service.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0ED] shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Request Care Button */}
                    <button
                      onClick={() => handleOpenConsultation(service.title)}
                      className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold bg-slate-50 hover:bg-[#EE7862] text-[#081630] hover:text-white py-3.5 rounded-2xl transition-all duration-200 cursor-pointer"
                    >
                      <span>Request This Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  </ScrollReveal>
                );
              })}
            </div>

          </div>
        </section>

        <ScrollReveal direction="up">
          <CtaBanner onOpenConsultation={() => handleOpenConsultation()} />
        </ScrollReveal>
      </main>

      <Footer />

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedService={selectedService}
      />
    </div>
  );
}
