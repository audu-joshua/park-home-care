"use client";

import React, { useState } from "react";
import { X, CheckCircle, Phone } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  selectedService = "",
}: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: selectedService || "Companion Care",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-[#EE7862] tracking-widest uppercase mb-1 block">
                FREE CONSULTATION
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#081630]">
                Schedule a Consultation
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Tell us about your care needs and we'll reach out promptly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EE7862] focus:ring-2 focus:ring-[#EE7862]/20 text-sm outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EE7862] focus:ring-2 focus:ring-[#EE7862]/20 text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EE7862] focus:ring-2 focus:ring-[#EE7862]/20 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Care Service Needed
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EE7862] focus:ring-2 focus:ring-[#EE7862]/20 text-sm outline-none transition-all bg-white"
                >
                  <option value="Companion Care">Companion Care</option>
                  <option value="Personal Care">Personal Care</option>
                  <option value="Memory Care">Memory Care</option>
                  <option value="Specialized Care">Specialized Care</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Additional Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Share any specific requirements or preferred timing..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EE7862] focus:ring-2 focus:ring-[#EE7862]/20 text-sm outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#EE7862] hover:bg-[#E4644D] text-white font-semibold py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Request Free Consultation</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-[#00F0ED] mx-auto mb-4 animate-bounce" />
            <h3 className="font-serif text-2xl font-bold text-[#081630] mb-2">
              Thank You, {formData.name || "Friend"}!
            </h3>
            <p className="text-slate-600 text-sm mb-6 max-w-sm mx-auto">
              Your consultation request for <strong>{formData.service}</strong> has been received. Our care coordinator will contact you shortly.
            </p>
            <button
              onClick={handleReset}
              className="bg-[#081630] hover:bg-[#0D2247] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
