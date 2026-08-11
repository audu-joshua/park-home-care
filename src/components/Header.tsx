"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Phone, Menu, X, ArrowRight, Mail, MapPin } from "lucide-react";

interface HeaderProps {
  onOpenConsultation: () => void;
}

export default function Header({ onOpenConsultation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Lock body scroll when full-screen mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Track scroll position for subtle shadow elevation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "FAQ", href: "#faq" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Floating Pill/Capsule Navbar Header */}
      <header className="fixed top-0 inset-x-0 z-40 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300">
        <div
          className={`bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-full px-5 sm:px-7 py-3 flex items-center justify-between transition-all duration-300 ${
            scrolled ? "shadow-xl shadow-slate-900/10 border-slate-300/80 bg-white/95 scale-[0.99]" : "shadow-md shadow-slate-900/5"
          }`}
        >
          {/* Brand Logo */}
          <Logo />

          {/* Desktop Navigation Links with Animated Underline */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative py-1 text-sm font-semibold text-slate-700 hover:text-[#EE7862] transition-colors duration-200 group"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EE7862] rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Phone CTA Button */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 bg-[#EE7862] hover:bg-[#E4644D] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-md shadow-[#EE7862]/20 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>Get Started</span>
            </button>

            <a
              href="tel:01234567890"
              className="inline-flex items-center gap-2 bg-[#081630] hover:bg-[#0D2247] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-200 uppercase tracking-wider"
            >
              <Phone className="w-3.5 h-3.5 text-[#00F0ED]" />
              <span>0123 456 7890</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 rounded-full bg-slate-100/80 text-slate-800 hover:bg-[#081630] hover:text-white transition-all duration-300 focus:outline-none"
              aria-label="Open Fullscreen Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer to offset fixed header height */}
      <div className="h-24" />

      {/* Full-Screen Mobile Overlay Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#081630] text-white flex flex-col justify-between p-6 sm:p-10 animate-in fade-in zoom-in-95 duration-300 overflow-y-auto">
          
          {/* Top Bar inside Fullscreen Menu */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Logo light />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-[#EE7862] hover:rotate-90 transition-all duration-300 focus:outline-none"
              aria-label="Close Mobile Navigation"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Centered Large Navigation Links */}
          <div className="my-auto py-10 flex flex-col items-center space-y-6 text-center">
            <span className="text-xs font-bold text-[#00F0ED] tracking-widest uppercase mb-2">
              NAVIGATION
            </span>
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-center gap-3 font-serif text-3xl sm:text-4xl font-bold text-slate-100 hover:text-[#00F0ED] transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <span>{link.name}</span>
                <ArrowRight className="w-6 h-6 text-[#EE7862] opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Bottom Action Area inside Fullscreen Menu */}
          <div className="pt-6 border-t border-white/10 flex flex-col space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full bg-[#EE7862] hover:bg-[#E4644D] text-white font-semibold py-4 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Get Started Today</span>
              </button>

              <a
                href="tel:01234567890"
                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-4 rounded-full text-center text-sm flex items-center justify-center gap-2 transition-all duration-200"
              >
                <Phone className="w-4 h-4 text-[#00F0ED]" />
                <span>CALL 0123 456 7890</span>
              </a>
            </div>

            {/* Quick Contact Info */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 pt-2 text-center sm:text-left">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#00F0ED]" />
                <span>123 Healthcare Lane, Suite 100</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#00F0ED]" />
                <span>hi@contact.com</span>
              </span>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
