"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { getBlogBySlug, getBlogs, type BlogPost } from "@/lib/store";
import { ChevronLeft, Calendar, Tag, ArrowRight, Check, Copy, User, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const slug = params?.slug as string;
    const found = getBlogBySlug(slug);
    if (!found || !found.published) {
      setNotFound(true);
      return;
    }
    setPost(found);
    const rel = getBlogs()
      .filter((b) => b.published && b.slug !== slug)
      .slice(0, 2);
    setRelated(rel);
  }, [params?.slug]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
        <p className="text-slate-600 text-lg">Article not found.</p>
        <Link href="/blogs" className="text-[#EE7862] underline text-sm">Back to Blog</Link>
      </div>
    );
  }

  if (!post) return null;

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onOpenConsultation={() => setModalOpen(true)} />

      {/* Hero Header Section */}
      <section className="bg-[#081630] text-white pt-40 sm:pt-48 pb-36 sm:pb-52 px-4 sm:px-6 lg:px-8 relative">
        {/* Reduced Width Featured Image Container with Title, Read Time & Writer Inside */}
        <div className="max-w-4xl mx-auto px-4 absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-full z-20">
          <div className="relative w-full h-[320px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
            {/* Back Circular Button (<) at Top Left of Image */}
            <Link
              href="/blogs"
              className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-[#EE7862] backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 shadow-lg group cursor-pointer border border-white/20"
              title="Back to Blog"
            >
              <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
            </Link>

            {/* Background Image */}
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#081630]/95 via-[#081630]/50 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
              {/* Category Pill */}
              <span className="inline-block text-[10px] sm:text-xs font-bold text-[#081630] bg-[#00F0ED] px-3.5 py-1 rounded-full uppercase tracking-wider mb-3 w-fit shadow-xs">
                {post.category}
              </span>

              {/* Title inside the image */}
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-4 text-white drop-shadow-md">
                {post.title}
              </h1>

              {/* Metadata inside the image: Writer, Read Time, Date */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-200 font-medium">
                <span className="flex items-center gap-1.5 text-[#00F0ED]">
                  <User className="w-4 h-4" />
                  By Park Editorial Team
                </span>
                <span className="text-slate-400">•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#EE7862]" />
                  4 min read
                </span>
                <span className="text-slate-400">•</span>
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Article Content */}
      <main className="flex-1 bg-white pt-52 sm:pt-64 lg:pt-80 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

            {/* Sticky Social Share Sidebar */}
            <aside className="lg:w-12 shrink-0 flex lg:flex-col items-center gap-3 lg:sticky lg:top-36 z-10 w-full justify-center lg:justify-start border-b lg:border-b-0 pb-6 lg:pb-0 border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest lg:hidden mr-2">Share:</span>
              <button
                onClick={handleCopyLink}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#EE7862] hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs"
                title={copied ? "Link Copied!" : "Copy Link"}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#1877F2] hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200 shadow-xs"
                title="Share on Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-black hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200 shadow-xs"
                title="Share on X (Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#25D366] hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200 shadow-xs"
                title="Share on WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </aside>

            {/* Article Body */}
            <article className="flex-1 min-w-0">
              {/* Introduction snippet callout */}
              <p className="text-slate-600 text-lg sm:text-xl font-light leading-relaxed mb-8 border-l-4 border-[#00F0ED] pl-5 py-1 italic bg-[#FAF8F5] rounded-r-2xl">
                {post.snippet}
              </p>

              <div
                className="prose prose-slate prose-lg sm:prose-xl max-w-none
                  prose-headings:font-serif prose-headings:text-[#081630] prose-headings:font-bold prose-headings:tracking-tight
                  prose-p:text-slate-700 prose-p:leading-relaxed prose-p:font-light prose-p:text-base sm:prose-p:text-lg
                  prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5
                  prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-ul:my-6 prose-li:text-slate-700 prose-li:text-base sm:prose-li:text-lg
                  prose-strong:text-[#081630] prose-strong:font-bold
                  prose-a:text-[#EE7862] prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Author / Editorial Card */}
              <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-slate-200/80 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md">
                  <Image src="/images/Icon 1.webp" alt="Park Home Health" fill className="object-cover bg-[#081630] p-2" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="font-bold text-[#081630] text-base sm:text-lg">Park Home Health Editorial Team</h4>
                  <p className="text-xs text-[#EE7862] font-semibold uppercase tracking-wider mb-2">Senior Care Specialists &amp; Health Advisors</p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Dedicated to providing families in Raleigh, NC with trustworthy advice, compassionate guidance, and clinical insight on senior care and independent living.
                  </p>
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-[#081630] text-white text-center shadow-xl">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-3">Ready to Discuss Your Care Needs?</h3>
                <p className="text-slate-300 text-sm sm:text-base mb-6 font-light max-w-lg mx-auto leading-relaxed">
                  Our care coordinators are here to answer your questions and design a personalized home care plan for your loved one.
                </p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#EE7862] hover:bg-[#E4644D] text-white font-semibold px-8 py-4 rounded-full text-sm transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg"
                >
                  Get a Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>

          </div>
          </ScrollReveal>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <ScrollReveal direction="up" delay={100}>
          <section className="mt-20 pt-16 pb-12 bg-[#FAF8F5] border-t border-slate-200/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#081630]">More Articles You Might Like</h2>
                <Link href="/blogs" className="text-xs font-bold text-[#EE7862] hover:underline uppercase tracking-wider">View All</Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blogs/${rel.slug}`}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex gap-5 p-5 group hover:-translate-y-1"
                  >
                    <div className="relative w-28 h-28 rounded-2xl overflow-hidden shrink-0">
                      <Image src={rel.image} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex flex-col justify-center flex-1">
                      <span className="text-[10px] font-bold text-[#00F0ED] uppercase tracking-wider mb-1">{rel.category}</span>
                      <h3 className="font-serif text-base font-bold text-[#081630] group-hover:text-[#EE7862] transition-colors leading-snug mb-2">
                        {rel.title}
                      </h3>
                      <span className="text-xs text-slate-400 font-medium">{new Date(rel.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
          </ScrollReveal>
        )}
      </main>

      <Footer />

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedService="Blog Reader Inquiry"
      />
    </div>
  );
}
