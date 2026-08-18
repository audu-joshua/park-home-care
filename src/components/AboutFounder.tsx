import React from "react";
// import Image from "next/image";

export default function AboutFounder() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-bold text-[#EE7862] tracking-widest uppercase mb-3 block">
            ABOUT US
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081630] tracking-tight mb-2">
            Meet Kehinde O. Ajirotutu
          </h2>

          <p className="text-[#00F0ED] font-bold text-sm uppercase tracking-wider mb-6">
            Founder & Director
          </p>

          <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            <p>
              Pack Home Health Care Agency LLC was founded with a clear and heartfelt mission: to provide high quality, compassionate in-home care that prioritizes the dignity and independence of every client.
            </p>

            <p>
              The inspiration behind our agency stems from a deeply personal experience. When our founder's father faced a complex medical crisis, their family struggled to find reliable, professional care that truly understood his needs and treated him with the respect he deserved. This challenging journey illuminated the critical need for a home health agency that doesn't just offer services, but delivers peace of mind.
            </p>

            <p className="font-medium text-slate-900 italic pt-2 border-l-4 border-[#00F0ED] pl-4 text-left max-w-2xl mx-auto">
              "We believe that care should be personal, professional, and profound. Our team is dedicated to treating your family like our own, ensuring they receive the highest standard of support in the comfort and familiarity of their own home."
            </p>
          </div>
        </div>

        {/* Photo column commented out — client asked to remove founder image for now
        <div className="lg:col-span-5 relative">
          <div className="relative h-96 sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group">
            <Image
              src="/images/ajirotutu.png"
              alt="Kehinde O. Ajirotutu - Founder & Director of Pack Home Health Care Agency LLC"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
        */}

      </div>
    </section>
  );
}
