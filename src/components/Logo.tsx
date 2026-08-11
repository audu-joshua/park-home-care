import React from "react";
import Link from "next/link";

interface LogoProps {
  light?: boolean;
  className?: string;
}

export default function Logo({ light = false, className = "" }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {/* Cyan Icon Emblem */}
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#00F0ED] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
        <svg
          viewBox="0 0 100 100"
          className="w-7 h-7 text-white fill-current"
          aria-hidden="true"
        >
          {/* Interlocking P & Cross Symbol */}
          <path
            d="M50 15 C30 15 15 30 15 50 C15 70 30 85 50 85 C70 85 85 70 85 50 C85 30 70 15 50 15 Z M50 25 C63.8 25 75 36.2 75 50 C75 63.8 63.8 75 50 75 C36.2 75 25 63.8 25 50 C25 36.2 36.2 25 50 25 Z"
            fill="none"
          />
          <path
            d="M42 28 H58 C64 28 69 33 69 39 C69 45 64 50 58 50 H50 V72 H42 V28 Z M50 36 V42 H57 C59 42 61 40.5 61 39 C61 37.5 59 36 57 36 H50 Z"
            fill="currentColor"
          />
          <path
            d="M30 46 H70 V54 H30 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Brand Title */}
      <div className="flex flex-col">
        <span
          className={`font-serif text-xl sm:text-2xl font-bold tracking-tight leading-tight ${
            light ? "text-white" : "text-[#081630]"
          }`}
        >
          Park Home Health
        </span>
      </div>
    </Link>
  );
}
