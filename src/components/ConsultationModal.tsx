"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, CheckCircle, Phone, ChevronDown, Check } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string;
}

const SERVICE_OPTIONS = [
  "Comprehensive Care Assessment",
  "Customised & Adaptive Care Plans",
  "Personal Hygiene & Daily Living",
  "Mobility & Household Management",
  "Nutrition & Custom Meal Planning",
  "Spiritual Life & Outings Transport",
  "Companionship & Mental Well-Being",
  "Alzheimer's & Dementia Memory Care",
  "Post-Surgery & Hospital Recovery",
  "Therapy & Chronic Condition Reminders",
  "General Enquiry",
];

export default function ConsultationModal({
  isOpen,
  onClose,
  selectedService = "",
}: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const defaultService = selectedService || "General Enquiry";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: defaultService,
    message: "",
  });

  // Sync selected service whenever the modal opens with a new service
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        service: selectedService || "General Enquiry",
      }));
      setSubmitted(false);
      setDropdownOpen(false);
    }
  }, [isOpen, selectedService]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) setSubmitted(true);
        else setSubmitted(false);
      } catch (err) {
        setSubmitted(false);
      }
    })();
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
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
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
              {/* Name */}
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

              {/* Phone + Email */}
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

              {/* Custom Service Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Care Service Needed
                </label>
                <div ref={dropdownRef} className="relative">
                  {/* Trigger */}
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((o) => !o)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all outline-none cursor-pointer text-left ${
                      dropdownOpen
                        ? "border-[#EE7862] ring-2 ring-[#EE7862]/20"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className={formData.service ? "text-slate-800" : "text-slate-400"}>
                      {formData.service || "Select a service…"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Panel */}
                  <div
                    className={`absolute z-50 left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden transition-all duration-200 origin-top ${
                      dropdownOpen
                        ? "opacity-100 scale-y-100 translate-y-0"
                        : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
                    }`}
                    style={{ maxHeight: "220px", overflowY: "auto" }}
                  >
                    {SERVICE_OPTIONS.map((option) => {
                      const isSelected = formData.service === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, service: option });
                            setDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3 text-sm text-left transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-[#EE7862]/8 text-[#EE7862] font-semibold"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span>{option}</span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-[#EE7862] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Additional Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Share any specific requirements or preferred timing..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EE7862] focus:ring-2 focus:ring-[#EE7862]/20 text-sm outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#EE7862] hover:bg-[#E4644D] text-white font-semibold py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
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
              Your consultation request for <strong>{formData.service}</strong> has been received.
              Our care coordinator will contact you shortly.
            </p>
            <button
              onClick={handleReset}
              className="bg-[#081630] hover:bg-[#0D2247] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
