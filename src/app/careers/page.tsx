"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { Heart, ShieldCheck, Clock, Award, CheckCircle2, ArrowRight, MapPin, Briefcase } from "lucide-react";
import { getJobs, type JobOpening } from "@/lib/store";
import CustomSelect from "@/components/CustomSelect";
import ScrollReveal from "@/components/ScrollReveal";

export default function CareersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [selectedPos, setSelectedPos] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setJobs(getJobs().filter((j) => j.active));
  }, []);

  const selectOptions = React.useMemo(() => {
    const base = jobs.map((j) => ({ value: j.title, label: `${j.title} (${j.type})` }));
    const extras = [
      { value: "General In-Home Caregiver", label: "General In-Home Caregiver" },
      { value: "Certified Nursing Assistant (CNA)", label: "Certified Nursing Assistant (CNA)" },
      { value: "Registered Nurse (RN) / LPN", label: "Registered Nurse (RN) / LPN" },
    ];
    const combined = [...base, ...extras];
    const dedup = new Map<string, { value: string; label: string }>();
    combined.forEach((o) => {
      if (!dedup.has(o.value)) dedup.set(o.value, o);
    });
    return [{ value: "", label: "Select position..." }, ...Array.from(dedup.values())];
  }, [jobs]);

  const handleApplyClick = (title: string) => {
    setSelectedPos(title);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onOpenConsultation={() => setModalOpen(true)} />

      {/* Hero Banner */}
      <section className="bg-[#081630] text-white pt-36 pb-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs font-bold text-[#00F0ED] tracking-widest uppercase mb-3 block">
            CAREER OPPORTUNITIES
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Join Our Care Team
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Build a fulfilling career making a meaningful difference in the lives of seniors and families in Raleigh, NC and surrounding areas.
          </p>
        </div>
      </section>

      <main className="flex-1 py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Why Work With Us */}
          <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-[#EE7862] tracking-widest uppercase mb-3 block">
              WHY PACK HOME HEALTH?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#081630] mb-4">
              We Support Those Who Care
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We value our caregivers as family. Enjoy competitive pay, flexible schedules, ongoing professional development, and a supportive environment.
            </p>
          </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { icon: Heart, title: "Competitive Pay", desc: "Industry-leading compensation and rewards for exceptional care." },
              { icon: Clock, title: "Flexible Hours", desc: "Full-time, part-time, and flexible shift schedules available." },
              { icon: ShieldCheck, title: "Supportive Leadership", desc: "Direct access to management and 24/7 care coordination support." },
              { icon: Award, title: "Ongoing Training", desc: "Paid orientation, certifications, and career advancement opportunities." },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <ScrollReveal key={idx} delay={idx * 100} direction="up">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-start hover:shadow-md transition-shadow">
                <div className="p-3 rounded-2xl bg-[#00F0ED]/10 text-[#081630] mb-4">
                  <Icon className="w-6 h-6 text-[#EE7862]" />
                </div>
                <h3 className="font-bold text-[#081630] text-lg mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Current Openings */}
          {jobs.length > 0 && (
            <ScrollReveal direction="up">
            <div className="mb-20">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold text-[#00F0ED] tracking-widest uppercase mb-3 block">
                  OPEN POSITIONS
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#081630]">
                  Explore Job Opportunities
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job, idx) => (
                  <ScrollReveal key={job.id} delay={idx * 80} direction="up">
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold text-[#00F0ED] bg-[#00F0ED]/10 border border-[#00F0ED]/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {job.department}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                          {job.type}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-[#081630] mb-2">{job.title}</h3>
                      <p className="text-xs text-slate-400 mb-4 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#EE7862]" />
                        {job.location}
                      </p>
                      <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-3">{job.description}</p>
                      {job.requirements.length > 0 && (
                        <ul className="space-y-1.5 mb-6">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="text-xs text-slate-500 flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0ED] shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <button
                      onClick={() => handleApplyClick(job.title)}
                      className="w-full bg-[#081630] hover:bg-[#EE7862] text-white text-xs font-semibold py-3 rounded-2xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Apply For This Position</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
            </ScrollReveal>
          )}

          {/* Quick Application Form */}
          <ScrollReveal direction="up" delay={100}>
          <div ref={formRef} className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-100 scroll-mt-28">
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#081630] mb-2">
                Apply to Join Our Team
              </h2>
              <p className="text-slate-600 text-sm">
                Fill out the quick form below and our recruiting team will reach out to you within 24-48 hours.
              </p>
            </div>

            {submitted ? (
              <div className="bg-[#00F0ED]/10 text-[#081630] p-8 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#EE7862] mx-auto" />
                <h3 className="font-bold text-xl">Application Received!</h3>
                <p className="text-sm text-slate-700">
                  Thank you for applying to Pack Home Health. We're excited to review your background and will be in touch shortly!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">First Name</label>
                    <input required type="text" placeholder="John" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EE7862]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Last Name</label>
                    <input required type="text" placeholder="Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EE7862]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Phone Number</label>
                    <input required type="tel" placeholder="+1 (917) 000-0000" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EE7862]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
                    <input required type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EE7862]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Position Interested In</label>
                  <CustomSelect
                    options={selectOptions}
                    value={selectedPos}
                    onChange={(v) => setSelectedPos(v)}
                    placeholder="Select position..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Brief Summary of Experience</label>
                  <textarea rows={4} placeholder="Tell us briefly about your caregiving experience and availability..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EE7862] text-sm"></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#EE7862] hover:bg-[#E4644D] text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
          </ScrollReveal>

        </div>
      </main>

      <Footer />

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedService="Career Applicant Inquiry"
      />
    </div>
  );
}
