import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function BlogSection() {
  const articles = [
    {
      id: 1,
      category: "WELLNESS",
      title: "Understanding the Different Levels of Home Care",
      snippet:
        "Navigating the options between companion care, personal care, and specialized medical support for your loved one.",
      image: "/images/blog_1.jpg",
    },
    {
      id: 2,
      category: "SAFETY",
      title: "5 Tips for Preventing Falls at Home",
      snippet:
        "Creating a safe environment is crucial for seniors living at home. Learn simple adjustments to prevent accidents.",
      image: "/images/blog_2.jpg",
    },
    {
      id: 3,
      category: "CAREGIVING",
      title: "The Importance of Respite Care for Family Caregivers",
      snippet:
        "Why taking a break is essential for your own well-being and how respite services can support your family.",
      image: "/images/blog_3.jpg",
    },
  ];

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#EE7862] tracking-widest uppercase mb-3 block">
            INSIGHTS & RESOURCES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081630] tracking-tight">
            The Park Blog
          </h2>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
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

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#EE7862] group-hover:text-[#081630] uppercase tracking-wider transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
