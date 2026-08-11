"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What service areas do you cover in North Carolina?",
      answer:
        "We proudly serve clients throughout Raleigh, NC, Wake County, and surrounding metropolitan communities. Contact our team to confirm coverage for your specific address.",
    },
    {
      question: "Are your caregivers thoroughly vetted, licensed, and insured?",
      answer:
        "Yes, absolutely. Every caregiver undergoes comprehensive nationwide background checks, drug screening, credential verification, and ongoing training. They are fully insured, licensed, and bonded for your family's protection.",
    },
    {
      question: "How quickly can care services begin for my loved one?",
      answer:
        "In most cases, we can conduct an in-home assessment and match a qualified caregiver within 24 to 48 hours. Emergency or urgent care placement can also be accommodated upon request.",
    },
    {
      question: "How do you match the right caregiver with a client?",
      answer:
        "We evaluate both specialized care needs and personal compatibility — including personality traits, routine preferences, and shared interests — ensuring a comforting and harmonious bond.",
    },
    {
      question: "Do you offer 24/7 care or overnight assistance?",
      answer:
        "Yes. We offer flexible scheduling tailored to your needs, ranging from a few hours a week to continuous 24/7 shift care, respite care, and live-in overnight support.",
    },
    {
      question: "What payment options and long-term care plans do you accept?",
      answer:
        "We accept private pay, long-term care insurance (LTCI), veterans' benefits (VA Aid & Attendance), and select local healthcare assistance programs. Our team assists with policy verification and claims management.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-[#EE7862] tracking-widest uppercase mb-3 block">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081630] tracking-tight mb-4">
            Common Questions & Answers
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Everything you need to know about our in-home care services, caregiver qualifications, and getting started.
          </p>
        </div>

        {/* Accordion Stack with Smooth Grid Animation */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  isOpen ? "border-[#EE7862]/40 shadow-md" : "border-slate-200/80 shadow-xs hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-serif text-base sm:text-lg font-bold text-[#081630] hover:text-[#EE7862] transition-colors focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <div className={`p-1.5 rounded-full transition-colors ${isOpen ? "bg-[#EE7862]/10" : "bg-slate-100"}`}>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#EE7862]" : "text-slate-500"
                      }`}
                    />
                  </div>
                </button>

                {/* Animated Accordion Body */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/80 pt-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
