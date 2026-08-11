"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What areas do you serve?",
      answer:
        "We proudly serve clients throughout the entire metropolitan region and surrounding suburban counties. Contact our friendly team today to verify coverage in your exact neighborhood.",
    },
    {
      question: "Are your caregivers licensed and bonded?",
      answer:
        "Yes, absolutely. Every caregiver on our team undergoes rigorous criminal background checks, motor vehicle record reviews, reference checks, and specialized training. They are fully insured, licensed, and bonded for your complete protection.",
    },
    {
      question: "How do you match caregivers with clients?",
      answer:
        "We consider both clinical needs and personal preferences. During our initial free consultation, we learn about your loved one's habits, interests, personality, and schedule to ensure a harmonious and supportive caregiver match.",
    },
    {
      question: "Do you offer 24/7 care?",
      answer:
        "Yes, we offer flexible scheduling options ranging from a few hours a day to full 24/7 round-the-clock shift care and overnight assistance.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-[#EE7862] tracking-widest uppercase mb-3 block">
            FAQ
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081630] tracking-tight">
            Common Questions
          </h2>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-serif text-lg font-bold text-[#081630] hover:text-[#EE7862] transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#EE7862]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-3 animate-in fade-in duration-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
