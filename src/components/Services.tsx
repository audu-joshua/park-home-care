import React from "react";
import { UserCheck, HeartHandshake, Brain, Stethoscope, ArrowRight } from "lucide-react";

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const servicesList = [
    {
      id: "companion-care",
      icon: HeartHandshake,
      iconBg: "bg-[#00F0ED]/15 text-[#081630]",
      title: "Companion Care",
      description:
        "Social interaction, light housekeeping, meal preparation, and transportation for errands or appointments to keep life engaging and manageable.",
    },
    {
      id: "personal-care",
      icon: UserCheck,
      iconBg: "bg-[#EE7862]/15 text-[#EE7862]",
      title: "Personal Care",
      description:
        "Respectful assistance with daily living activities including bathing, grooming, dressing, and mobility support to enhance quality of life.",
    },
    {
      id: "memory-care",
      icon: Brain,
      iconBg: "bg-[#081630]/10 text-[#081630]",
      title: "Memory Care",
      description:
        "Specialized, gentle support for individuals living with Alzheimer's or dementia, focusing on safety, routine, and cognitive engagement.",
    },
    {
      id: "specialized-care",
      icon: Stethoscope,
      iconBg: "bg-[#00F0ED]/15 text-[#081630]",
      title: "Specialized Care",
      description:
        "Post-hospitalization support, chronic illness management, and respite care designed to meet complex, specific health requirements.",
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#EE7862] tracking-widest uppercase mb-3 block">
            OUR SERVICES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081630] tracking-tight mb-4">
            Care Services To Provide Peace of Mind
          </h2>
          <p className="text-slate-600 text-base font-light leading-relaxed">
            Tailored support designed to meet the unique needs of your loved ones, delivered by trusted and compassionate professionals.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon Circle */}
                  <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl font-bold text-[#081630] mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Learn More Button */}
                <button
                  onClick={() => onSelectService(service.title)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#EE7862] group-hover:text-[#081630] uppercase tracking-wider transition-colors pt-4 border-t border-slate-100"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
