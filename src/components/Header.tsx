"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Phone, Menu, X, ArrowRight, ChevronRight } from "lucide-react";

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

  // Track scroll position to transition floating capsule styles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "About", href: "/about" },
    { name: "Career", href: "/careers" },
    { name: "Blog", href: "/blogs" },
    { name: "FAQ", href: "/#faq" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      {/* Floating Pill/Capsule Navbar Container */}
      <header className="fixed top-0 inset-x-0 z-40 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300">
        <div
          className={`rounded-full px-5 sm:px-7 py-3 flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-slate-900/10 text-slate-800 scale-[0.99]"
              : "bg-[#0D2247]/90 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/20 text-white"
          }`}
        >
          {/* Brand Logo - Light text over top dark navy, dark text when scrolled */}
          <Logo light={!scrolled} />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.filter(link => link.name !== "Home").map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1 text-sm font-semibold transition-colors duration-200 group cursor-pointer ${
                  scrolled
                    ? "text-slate-700 hover:text-[#EE7862]"
                    : "text-slate-200 hover:text-[#00F0ED]"
                }`}
              >
                <span>{link.name}</span>
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full ${
                    scrolled ? "bg-[#EE7862]" : "bg-[#00F0ED]"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 bg-[#EE7862] hover:bg-[#E4644D] text-white text-xs font-semibold px-4.5 py-2.5 rounded-full shadow-md shadow-[#EE7862]/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>Get Started</span>
            </button>

            <a
              href="tel:+19175868217"
              className={`inline-flex items-center gap-2 text-xs font-semibold px-4.5 py-2.5 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-200 uppercase tracking-wider cursor-pointer ${
                scrolled
                  ? "bg-[#081630] hover:bg-[#0D2247] text-white"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-[#00F0ED]" />
              <span>+1 (917) 586-8217</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`p-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                scrolled
                  ? "bg-slate-100 text-slate-800 hover:bg-[#081630] hover:text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              aria-label="Open Fullscreen Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Premium Full-Screen Mobile Overlay Navigation (Slides from Top) */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-10 transition-all duration-500 overflow-y-auto animate-in fade-in slide-in-from-top-full duration-500 ease-out ${
            scrolled ? "bg-white text-slate-900" : "bg-[#081630] text-white"
          }`}
        >
          {/* Top Bar: Brand Logo + Close Button */}
          <div className={`flex items-center justify-between pb-6 border-b ${scrolled ? "border-slate-200/80" : "border-white/10"}`}>
            <Logo light={!scrolled} />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                scrolled
                  ? "bg-slate-100 text-slate-800 hover:bg-[#EE7862] hover:text-white"
                  : "bg-white/10 text-white hover:bg-[#EE7862]"
              }`}
              aria-label="Close Mobile Navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Spacious Menu Items (Inspired by modern minimal mobile navigation design) */}
          <div className="my-auto py-6 flex flex-col space-y-3 px-2">
            {navLinks
              .filter((link) => link.name !== "Home")
              .map((link, idx) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center justify-between py-3.5 font-serif text-2xl sm:text-3xl font-medium border-b transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-top-3 duration-500 ${
                    scrolled
                      ? "border-slate-200 text-slate-800 hover:text-[#EE7862] hover:pl-2"
                      : "border-white/10 text-slate-100 hover:text-[#00F0ED] hover:pl-2"
                  }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <span>{link.name}</span>
                  <ChevronRight
                    className={`w-6 h-6 transition-all duration-300 group-hover:translate-x-1 ${
                      scrolled ? "text-slate-500 group-hover:text-[#EE7862]" : "text-white/50 group-hover:text-[#00F0ED]"
                    }`}
                  />
                </Link>
              ))}
          </div>

          {/* Bottom Area: Primary CTA Button + Minimal Footer Links */}
          <div className="pt-4 flex flex-col space-y-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full bg-[#EE7862] hover:bg-[#E4644D] text-white font-semibold py-3.5 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Get Started Today</span>
            </button>

            {/* Clean Minimal Social / Copyright Row */}
            <div className={`flex items-center justify-center space-x-6 text-xs font-light tracking-wide ${scrolled ? "text-slate-400" : "text-slate-400"}`}>
              <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#EE7862] transition-colors cursor-pointer">
                Pack Home Care
              </a>
              <span>•</span>
              <a href="tel:+19175868217" className="hover:text-[#EE7862] transition-colors cursor-pointer">
                +1 (917) 586-8217
              </a>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
