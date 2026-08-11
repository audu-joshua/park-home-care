"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Phone, Menu, X } from "lucide-react";

interface HeaderProps {
  onOpenConsultation: () => void;
}

export default function Header({ onOpenConsultation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "FAQ", href: "#faq" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-700 hover:text-[#EE7862] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Phone CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="tel:01234567890"
            className="inline-flex items-center gap-2.5 bg-[#081630] hover:bg-[#0D2247] text-white text-xs font-semibold px-5 py-3 rounded-full shadow-sm hover:shadow transition-all duration-200 uppercase tracking-wider"
          >
            <Phone className="w-4 h-4 text-[#00F0ED]" />
            <span>CALL 0123 456 7890</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-900" />
            ) : (
              <Menu className="w-6 h-6 text-slate-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bg-white border-b border-slate-200 shadow-xl py-6 px-6 flex flex-col space-y-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 hover:text-[#EE7862] py-2 border-b border-slate-100 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full bg-[#EE7862] hover:bg-[#E4644D] text-white font-semibold py-3 rounded-xl shadow transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Get Started Today</span>
            </button>
            <a
              href="tel:01234567890"
              className="w-full bg-[#081630] text-white font-semibold py-3 rounded-xl text-center text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#00F0ED]" />
              <span>CALL 0123 456 7890</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
