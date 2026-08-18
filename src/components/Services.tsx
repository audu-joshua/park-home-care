"use client";

import React, { useState } from "react";
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
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Services" },
    { id: "daily", label: "Daily Living & Personal Care" },
    { id: "wellness", label: "Wellness & Lifestyle" },
    { id: "specialized", label: "Specialized & Recovery" },
    { id: "planning", label: "Care Planning" },
  ];

  const servicesData = [
    // Care Planning
    {
      category: "planning",
      icon: ShieldCheck,
      title: "Comprehensive Care Assessment",
      tagline: "Personalized & Detailed Planning",
      description: "Initial in-depth evaluation covering medical history, emotional needs, and lifestyle routines to design a baseline care plan.",
      highlights: ["In-home safety audit", "Lifestyle & preference mapping", "Family consultation"],
    },
    {
      category: "planning",
      icon: Sparkles,
      title: "Customized & Adaptive Care Plans",
      tagline: "Evolving Client Support",
      description: "Tailored care schedules that dynamically adjust as health conditions, mobility, or family needs change over time.",
      highlights: ["Dynamic schedule updates", "Continuous health tracking", "Routine family check-ins"],
    },

    // Daily Living & Personal Care
    {
      category: "daily",
      icon: UserCheck,
      title: "Personal Hygiene & Daily Living",
      tagline: "Dignified Personal Care",
      description: "Respectful assistance with bathing, dressing, personal grooming, oral care, and incontinence management in the privacy of home.",
      highlights: ["Bathing & grooming assistance", "Dressing & hygiene care", "Dignified support"],
    },
    {
      category: "daily",
      icon: HomeIcon,
      title: "Mobility & Household Management",
      tagline: "Safe & Clean Home Environment",
      description: "Support with transferring, walking safety, light housekeeping, laundry, and maintaining an organized, hazard-free home.",
      highlights: ["Transfer & walking support", "Light housekeeping & laundry", "Fall prevention placement"],
    },

    // Wellness & Lifestyle
    {
      category: "wellness",
      icon: Utensils,
      title: "Nutrition & Custom Meal Planning",
      tagline: "Dietary & Hydration Oversight",
      description: "Preparation of fresh, heart-healthy meals tailored to dietary restrictions, doctor recommendations, and personal taste.",
      highlights: ["Doctor-guided meal prep", "Hydration monitoring", "Grocery shopping assistance"],
    },
    // {
    //   category: "wellness",
    //   icon: Church,
    //   title: "Spiritual Life & Outings Transport",
    //   tagline: "Faith & Community Connection",
    //   description: "Reliable, escort-assisted transportation to church services, faith-based gatherings, social events, and family visits.",
    //   highlights: ["Church & service transport", "Community outing escort", "Social event accompaniment"],
    // },
    {
      category: "wellness",
      icon: HeartHandshake,
      title: "Companionship & Mental Well-Being",
      tagline: "Emotional & Cognitive Engagement",
      description: "Meaningful conversation, cognitive memory games, tech assistance for family video calls, and gentle mental health encouragement.",
      highlights: ["Family tech setup & calls", "Memory & puzzle games", "Daily emotional check-ins"],
    },

    // Specialized & Recovery
    {
      category: "specialized",
      icon: Brain,
      title: "Alzheimer's & Dementia Memory Care",
      tagline: "Specialized Cognitive Support",
      description: "Structured daily routines, wandering prevention, behavioral agitation management, and safe cognitive stimulation exercises.",
      highlights: ["Memory-focused routines", "Wandering prevention", "Empathetic behavioral care"],
    },
    // {
    //   category: "specialized",
    //   icon: Stethoscope,
    //   title: "Post-Surgery & Hospital Recovery",
    //   tagline: "Smooth In-Home Healing",
    //   description: "Mobility transfers, wound/incision care reminders, nutrition tracking, and daily assistance to avoid hospital readmission.",
    //   highlights: ["Transfer & movement assistance", "Healing nutrition oversight", "Incision monitoring reminders"],
    // },
    {
      category: "specialized",
      icon: Activity,
      title: "Therapy & Chronic Condition Reminders",
      tagline: "Stroke, MS, Parkinson's & Cardiac",
      description: "Non-clinical physical, speech, and occupational therapy exercise reminders, medication tracking logs, and energy pacing.",
      highlights: ["Therapy routine reminders", "Medication adherence tracking", "Energy conservation pacing"],
    },
  ];

  const filteredServices = activeTab === "all" 
    ? servicesData 
    : servicesData.filter(s => s.category === activeTab);

  return (
    <section id="services" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#EE7862] tracking-widest uppercase mb-3 block">
            OUR COMPREHENSIVE SERVICES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081630] tracking-tight mb-4">
            In-Home Care Tailored for Every Need
          </h2>
          <p className="text-slate-600 text-base font-light leading-relaxed">
            Our personalized senior home care services are designed to enhance safety, independence, and comfort in the familiar surroundings of home.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === cat.id
                  ? "bg-[#081630] text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#00F0ED]/10 text-[#081630] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
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

                  {/* Highlights Bullet points */}
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

      </div>
    </section>
  );
}
