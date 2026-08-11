"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { getBlogs, type BlogPost } from "@/lib/store";
import { ArrowRight, Calendar, Tag } from "lucide-react";

export default function BlogsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(getBlogs().filter((b) => b.published));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onOpenConsultation={() => setModalOpen(true)} />

      {/* Hero */}
      <section className="bg-[#081630] text-white pt-36 pb-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs font-bold text-[#00F0ED] tracking-widest uppercase mb-3 block">
            RESOURCES &amp; INSIGHTS
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Park Home Health Blog
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Expert advice, family caregiving guides, health tips, and stories to support you on your care journey.
          </p>
        </div>
      </section>

      <main className="flex-1 py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-slate-500 py-20">No posts published yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
                >
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#00F0ED] uppercase tracking-wider">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-slate-400 uppercase tracking-wider">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <h2 className="font-serif text-xl font-bold text-[#081630] mb-3 group-hover:text-[#EE7862] transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                      {post.snippet}
                    </p>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#EE7862] uppercase tracking-wider transition-colors group-hover:text-[#081630]"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
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
