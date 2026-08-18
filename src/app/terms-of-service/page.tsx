"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import ScrollReveal from "@/components/ScrollReveal";

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Last updated: August 2026
          </p>
        </div>
      </section>

      <main className="flex-1 py-16 bg-[#FAF8F5]">
        <ScrollReveal direction="up">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl shadow-sm border border-slate-100 p-8 sm:p-14 lg:p-16">
            <div className="prose prose-slate prose-lg max-w-none
              prose-headings:font-serif prose-headings:text-[#081630] prose-headings:font-bold
              prose-p:text-slate-700 prose-p:leading-relaxed prose-p:font-light
              prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-100
              prose-strong:text-[#081630]
              prose-a:text-[#EE7862] prose-a:no-underline hover:prose-a:underline
              prose-ul:space-y-2 prose-li:text-slate-700 prose-p:mb-5">

              <p>
                Please read these Terms of Service (&quot;Terms&quot;) carefully before using the website and services offered by Pack Home Health Agency LLC (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using our website or engaging our services, you agree to be bound by these Terms.
              </p>

              <h2>1. Services Provided</h2>
              <p>
                Pack Home Health Agency LLC provides non-medical in-home care services including, but not limited to, personal hygiene assistance, companionship, meal preparation, mobility support, medication reminders, and specialized care for seniors and individuals with chronic conditions. Our services are provided in Raleigh, NC and surrounding areas.
              </p>

              <h2>2. Eligibility</h2>
              <p>
                Our services are available to individuals who require in-home care assistance. A care assessment will be conducted prior to the commencement of services to determine the appropriate level of care. We reserve the right to decline or discontinue services if the required level of care exceeds our current capabilities.
              </p>

              <h2>3. Service Agreements</h2>
              <p>
                A formal service agreement will be executed prior to the start of care. This agreement outlines the specific services to be provided, the schedule, the rates, and any other conditions applicable to the care arrangement. The service agreement supersedes any verbal representations made prior to its execution.
              </p>

              <h2>4. Fees and Payment</h2>
              <p>
                Fees for services are outlined in the individual service agreement. Payment is due as specified in the agreement. We accept various payment methods as detailed during onboarding. Late payments may be subject to applicable fees as outlined in your agreement.
              </p>

              <h2>5. Cancellation and Changes</h2>
              <p>
                Clients may cancel or modify scheduled services by providing advance notice as specified in their service agreement. Cancellations made with insufficient notice may result in a cancellation fee. We reserve the right to modify, suspend, or discontinue services with reasonable notice.
              </p>

              <h2>6. Caregiver Conduct</h2>
              <p>
                All our caregivers are thoroughly screened, background-checked, and trained. However, clients agree not to directly hire or privately engage any Pack Home Health caregiver outside of the services provided by the Agency for a period of 12 months after the termination of the service agreement.
              </p>

              <h2>7. Client Responsibilities</h2>
              <p>Clients agree to:</p>
              <ul>
                <li>Provide a safe working environment for caregivers.</li>
                <li>Provide accurate and complete health and care information.</li>
                <li>Notify us promptly of any changes in the client&apos;s health or care needs.</li>
                <li>Treat all Pack Home Health staff with dignity and respect.</li>
              </ul>

              <h2>8. Limitation of Liability</h2>
              <p>
                Pack Home Health Agency LLC provides non-medical care services and is not a licensed medical or clinical provider. We are not liable for any medical decisions, outcomes, or emergencies. In no event shall our liability exceed the total amount paid by the client for services in the three months preceding the event giving rise to a claim.
              </p>

              <h2>9. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Pack Home Health Agency LLC, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising from your use of our services or violation of these Terms.
              </p>

              <h2>10. Intellectual Property</h2>
              <p>
                All content on our website, including text, graphics, logos, and images, is the property of Pack Home Health Agency LLC and is protected by applicable intellectual property laws. You may not use, reproduce, or distribute any content without our express written permission.
              </p>

              <h2>11. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of North Carolina, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Wake County, North Carolina.
              </p>

              <h2>12. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective upon posting to our website. Your continued use of our services after any modifications constitutes your acceptance of the revised Terms.
              </p>

              <h2>13. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us:
              </p>
              <ul>
                <li><strong>Pack Home Health Agency LLC</strong></li>
                <li>1312 Forestford Court, Raleigh, NC 27610</li>
                <li>Phone: <a href="tel:+19175868217">+1 (917) 586-8217</a></li>
                <li>Email: <a href="mailto:info@packhomehealthcareagency.com">info@packhomehealthcareagency.com</a></li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </main>

      <Footer />

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedService="Terms of Service Inquiry"
      />
    </div>
  );
}
