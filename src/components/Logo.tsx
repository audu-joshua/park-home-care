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
      {/* Brand Icon Image (Clean, transparent, no wrapper background box) */}
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2">
        <Image
          src={light ? "/images/Icon 1.webp" : "/images/Icon 2.webp"}
          alt="Pack Home Health Care Agency LLC Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Brand Title (Hidden on mobile as requested, visible from sm up) */}
      <div className="hidden sm:flex flex-col">
          <span
          className={`font-serif text-xl sm:text-2xl font-bold tracking-tight leading-tight transition-colors duration-300 ${
            light ? "text-white group-hover:text-[#00F0ED]" : "text-[#081630] group-hover:text-[#EE7862]"
          }`}
        >
          Pack Home Health Care
        </span>
      </div>
    </Link>
  );
}
