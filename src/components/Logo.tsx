import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  light?: boolean;
  className?: string;
}

export default function Logo({ light = false, className = "" }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 group focus:outline-none ${className}`}>
      {/* Brand Icon Image */}
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden shadow-xs border border-slate-100/30 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2">
        <Image
          src="/images/Icon 1.webp"
          alt="Park Home Health Logo"
          fill
          className="object-contain p-0.5"
          priority
        />
      </div>

      {/* Brand Title */}
      <div className="flex flex-col">
        <span
          className={`font-serif text-xl sm:text-2xl font-bold tracking-tight leading-tight transition-colors duration-300 ${
            light ? "text-white group-hover:text-[#00F0ED]" : "text-[#081630] group-hover:text-[#EE7862]"
          }`}
        >
          Park Home Health
        </span>
      </div>
    </Link>
  );
}
