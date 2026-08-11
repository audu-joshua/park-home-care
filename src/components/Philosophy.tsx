import React from "react";
import Image from "next/image";
import { Sparkles, Activity, Users } from "lucide-react";

export default function Philosophy() {
  const highlights = [
    {
      icon: Sparkles,
      title: "Independence",
      description:
        "Empowering seniors to maintain autonomy while ensuring safety, dignity, and comfort in their daily routine.",
    },
    {
      icon: Activity,
      title: "Real-Time Updates",
      description:
        "Transparent and continuous communication updates so family members stay informed and at ease.",
    },
    {
      icon: Users,
      title: "Right Match Guarantee",
      description:
        "Respecting the privacy and personality of every individual by pairing them with compatible, caring staff.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Photo with Subtle Shadow */}
          <div className="relative">
            <div className="relative h-96 sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
              <Image
                src="/images/philosophy.jpg"
                alt="Caregiver holding elderly person's hand"
                fill
                className="object-cover"
              />
            </div>
            {/* Accent Floating Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#081630] text-white p-5 rounded-2xl shadow-xl border border-white/10 max-w-xs">
              <p className="font-serif text-lg font-bold text-[#00F0ED]">
                Dignity & Respect
              </p>
              <p className="text-slate-300 text-xs mt-1">
                Fostering meaningful relationships that enrich lives.
              </p>
            </div>
          </div>

          {/* Right Side: Philosophy Text Content */}
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#00F0ED] tracking-widest uppercase mb-3">
              ELIGIBLE & VETTED SENIOR CARE IN YOUR AREA
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081630] tracking-tight mb-6 leading-tight">
              It's Not Just Care. <br />
              It's Making Personal Connections.
            </h2>

            <p className="text-slate-600 text-base leading-relaxed mb-8">
              We believe that true care goes beyond physical assistance. It's about preserving dignity, fostering independence, and building meaningful relationships that enrich the lives of those we serve.
            </p>

            {/* 3 Highlights List */}
            <div className="space-y-6">
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-[#00F0ED]/15 text-[#081630] shrink-0 mt-0.5">
                      <IconComponent className="w-5 h-5 text-[#081630]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base mb-1">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
