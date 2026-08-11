import React from "react";
import Logo from "./Logo";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#040C1A] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <Logo light />
            
            <p className="text-slate-400 text-sm font-light leading-relaxed max-w-sm">
              Compassionate, professional in-home care services tailored to help your loved ones live safely and independently.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00F0ED] hover:text-[#081630] text-slate-300 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00F0ED] hover:text-[#081630] text-slate-300 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00F0ED] hover:text-[#081630] text-slate-300 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <h4 className="text-[#00F0ED] text-xs font-bold uppercase tracking-wider mb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-300 font-light">
              <li>
                <a href="/" className="hover:text-white transition-colors cursor-pointer">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#services" className="hover:text-white transition-colors cursor-pointer">
                  Services
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-white transition-colors cursor-pointer">
                  Careers
                </a>
              </li>
              <li>
                <a href="/blogs" className="hover:text-white transition-colors cursor-pointer">
                  Blog
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-white transition-colors cursor-pointer">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <h4 className="text-[#00F0ED] text-xs font-bold uppercase tracking-wider mb-2">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-300 font-light">
              <li>
                <a href="#" className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-white transition-colors cursor-pointer">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <h4 className="text-[#00F0ED] text-xs font-bold uppercase tracking-wider mb-2">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-300 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#EE7862] shrink-0 mt-0.5" />
                <span>1312 Forestford court, Raleigh NC 27610</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#EE7862] shrink-0" />
                <a href="tel:+19175868217" className="hover:text-white transition-colors cursor-pointer">
                  +1 (917) 586-8217
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#EE7862] shrink-0" />
                <a href="mailto:info@parkhomecare.com" className="hover:text-white transition-colors cursor-pointer">
                  info@parkhomecare.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Park Home Health Agency. All rights reserved.</p>
          <a
            href="/admin/login"
            className="text-slate-500 hover:text-slate-300 transition-colors text-[11px]"
          >
            Admin Portal
          </a>
        </div>

      </div>
    </footer>
  );
}
