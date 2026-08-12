"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import ScrollReveal from "@/components/ScrollReveal";

export default function PrivacyPolicyPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onOpenConsultation={() => setModalOpen(true)} />

      {/* Hero */}
      <section className="bg-[#081630] text-white pt-36 pb-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs font-bold text-[#00F0ED] tracking-widest uppercase mb-3 block">
            Legal
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Last updated: August 2026
          </p>
        </div>
      </section>

      <main className="flex-1 py-16 bg-[#FAF8F5]">
        <ScrollReveal direction="up">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl shadow-sm border border-slate-100 p-8 sm:p-12">
            <div className="prose prose-slate prose-lg max-w-none
              prose-headings:font-serif prose-headings:text-[#081630] prose-headings:font-bold
              prose-p:text-slate-700 prose-p:leading-relaxed prose-p:font-light
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-strong:text-[#081630]
              prose-a:text-[#EE7862] prose-a:no-underline hover:prose-a:underline
              prose-ul:space-y-1 prose-li:text-slate-700">

              <p>
                Park Home Health Agency LLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our home care services.
              </p>

              <h2>1. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul>
                <li><strong>Personal Identifiers:</strong> Name, address, phone number, email address, and date of birth.</li>
                <li><strong>Health Information:</strong> Medical history, care needs, and health conditions relevant to providing care services.</li>
                <li><strong>Financial Information:</strong> Payment details and insurance information where applicable.</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent on the site, browser type, and device information collected automatically via cookies.</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, operate, and maintain our home care services.</li>
                <li>Respond to your inquiries, consultations, and service requests.</li>
                <li>Process applications from caregiving staff.</li>
                <li>Communicate service updates, appointment reminders, and important notices.</li>
                <li>Comply with applicable legal and regulatory obligations.</li>
                <li>Improve our website and service offerings.</li>
              </ul>

              <h2>3. Sharing of Information</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website or conducting our business, under strict confidentiality obligations. We may also disclose information as required by law, regulation, or court order.
              </p>

              <h2>4. Health Information (HIPAA)</h2>
              <p>
                Where applicable, we handle protected health information (PHI) in accordance with the Health Insurance Portability and Accountability Act (HIPAA). Your PHI is used solely for the purpose of providing care services and will not be disclosed without your written authorization except as permitted by law.
              </p>

              <h2>5. Cookies and Tracking Technologies</h2>
              <p>
                Our website uses cookies and similar tracking technologies to improve your experience, analyze site usage, and tailor content. You can instruct your browser to refuse cookies, but doing so may affect some portions of the website.
              </p>

              <h2>6. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure.
              </p>

              <h2>7. Data Retention</h2>
              <p>
                We retain personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.
              </p>

              <h2>8. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you.</li>
                <li>Request correction of inaccurate data.</li>
                <li>Request deletion of your data, subject to applicable law.</li>
                <li>Opt out of certain data uses, including marketing communications.</li>
              </ul>

              <h2>9. Children&apos;s Privacy</h2>
              <p>
                Our services are not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately.
              </p>

              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new policy on this page with an updated effective date. Your continued use of our services after any changes constitutes your acceptance of the revised policy.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy, please contact us:
              </p>
              <ul>
                <li><strong>Park Home Health Agency LLC</strong></li>
                <li>1312 Forestford Court, Raleigh, NC 27610</li>
                <li>Phone: <a href="tel:+19175868217">+1 (917) 586-8217</a></li>
                <li>Email: <a href="mailto:info@parkhomecare.com">info@parkhomecare.com</a></li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </main>

      <Footer />

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedService="Privacy Policy Inquiry"
      />
    </div>
  );
}
