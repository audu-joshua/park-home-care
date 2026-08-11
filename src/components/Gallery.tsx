import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Briefcase } from "lucide-react";

export default function Gallery() {
  const images = [
    { src: "/images/image_2.webp", alt: "Caregiver smiling warmly with senior woman", span: "col-span-1 row-span-2" },
    { src: "/images/image_5.webp", alt: "Male caregiver supporting elderly man", span: "col-span-1 row-span-1" },
    { src: "/images/image_3.webp", alt: "Female nurse assisting senior woman", span: "col-span-1 row-span-1" },
    { src: "/images/image_1.webp", alt: "Caregivers with elderly couple", span: "col-span-2 row-span-1" },
  ];

  return (
    <section className="py-20 bg-[#FAF8F5] fade-in-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#EE7862] tracking-widest uppercase mb-3 block">
            OUR CAREGIVERS IN ACTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081630] tracking-tight mb-4">
            Care That Goes Beyond the Ordinary
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every interaction is built on trust, dignity, and genuine compassion — because your loved ones deserve nothing less.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]">
          {/* Image 1 — tall left column (spans 2 rows on lg) */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer lg:row-span-2">
            <Image
              src={images[0].src}
              alt={images[0].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Image 2 — top-right */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer">
            <Image
              src={images[1].src}
              alt={images[1].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Image 3 — top-far-right */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer">
            <Image
              src={images[2].src}
              alt={images[2].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Image 4 — bottom-right (spans 2 cols on lg) */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer lg:col-span-2">
            <Image
              src={images[3].src}
              alt={images[3].alt}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* CTA Overlay Card */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#081630]/90 via-[#081630]/50 to-transparent flex items-center px-8 sm:px-12">
              <div className="max-w-xs">
                <p className="text-[#00F0ED] text-xs font-bold uppercase tracking-widest mb-2">JOIN OUR TEAM</p>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
                  Make a Difference Every Day
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  We're always looking for passionate, dedicated caregivers who want to create meaningful impact.
                </p>
                <Link
                  href="/careers"
                  className="inline-flex items-center gap-2.5 bg-[#EE7862] hover:bg-[#E4644D] text-white text-sm font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Work With Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
