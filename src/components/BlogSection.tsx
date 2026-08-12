"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBlogs, type BlogPost } from "@/lib/store";

export default function BlogSection() {
  const [articles, setArticles] = useState<BlogPost[]>([]);

  useEffect(() => {
    const published = getBlogs().filter((b) => b.published);
    setArticles(published.slice(0, 3));
  }, []);

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#EE7862] tracking-widest uppercase mb-3 block">
            INSIGHTS &amp; RESOURCES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081630] tracking-tight">
            The Pack Blog
          </h2>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.id} href={`/blogs/${article.slug}`} legacyBehavior>
              <a className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#00F0ED] uppercase tracking-wider mb-2 block">
                      {article.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#081630] mb-3 group-hover:text-[#EE7862] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {article.snippet}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-2 text-xs font-bold text-[#EE7862] group-hover:text-[#081630] uppercase tracking-wider transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="mt-12 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#081630] border border-[#081630] px-7 py-3 rounded-full hover:bg-[#081630] hover:text-white transition-all duration-300"
          >
            View all Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
