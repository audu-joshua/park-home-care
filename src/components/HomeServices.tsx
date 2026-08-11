"use client";

import React from "react";
import Link from "next/link";
import { UserCheck, Brain, HeartHandshake, ArrowRight, CheckCircle2 } from "lucide-react";

interface HomeServicesProps {
  onSelectService: (serviceName: string) => void;
}

const featured = [
  {
    icon: UserCheck,
    title: "Personal Hygiene & Daily Living",
    tagline: "Dignified Personal Care",
    description:
      "Respectful assistance with bathing, dressing, personal grooming, oral care, and incontinence management in the privacy of home.",
    highlights: ["Bathing & grooming assistance", "Dressing & hygiene care", "Dignified support"],
  },
  {
    icon: Brain,
    title: "Alzheimer's & Dementia Memory Care",
    tagline: "Specialized Cognitive Support",
    description:
      "Structured daily routines, wandering prevention, behavioral agitation management, and safe cognitive stimulation exercises.",
    highlights: ["Memory-focused routines", "Wandering prevention", "Empathetic behavioral care"],
  },
  {
    icon: HeartHandshake,
    title: "Companionship & Mental Well-Being",
    tagline: "Emotional & Cognitive Engagement",
    description:
      "Meaningful conversation, cognitive memory games, tech assistance for family video calls, and gentle mental health encouragement.",
    highlights: ["Family tech setup & calls", "Memory & puzzle games", "Daily emotional check-ins"],
  },
];

export default function HomeServices({ onSelectService }: HomeServicesProps) {
  return (
    <section id="services" className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#EE7862] tracking-widest uppercase mb-3 block">
            OUR SERVICES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081630] tracking-tight mb-4">
            In-Home Care Tailored for Every Need
          </h2>
          <p className="text-slate-600 text-base font-light leading-relaxed">
            Our personalized senior home care services are designed to enhance safety, independence, and comfort in the familiar surroundings of home.
          </p>
        </div>

        {/* 3 Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featured.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
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
                  onClick={() => onSelectService(service.title)}
                  className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold bg-slate-50 hover:bg-[#EE7862] text-[#081630] hover:text-white py-3 rounded-2xl transition-all duration-200 cursor-pointer"
                >
                  <span>Request This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* View All Services CTA */}
        <div className="flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 bg-[#081630] text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-[#EE7862] transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <span>View all Services</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
