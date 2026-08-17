"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Eye, EyeOff, Save, ArrowLeft, X, Check, Globe } from "lucide-react";
import {
  fetchBlogs,
  getBlogs,
  saveBlogRemote,
  deleteBlogRemote,
  type BlogPost,
} from "@/lib/store";
import EmptyState from "@/components/EmptyState";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function BlogForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: BlogPost;
  onSave: (p: BlogPost) => void;
  onCancel: () => void;
}) {
  const isNew = !initial;
  const [form, setForm] = useState<BlogPost>(
    initial ?? {
      id: uid(),
      slug: "",
      title: "",
      category: "WELLNESS",
      snippet: "",
      content: "",
      image: "/images/blog_1.jpg",
      date: new Date().toISOString().slice(0, 10),
      published: true,
    }
  );

  const set = (k: keyof BlogPost, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleTitle = (v: string) => {
    setForm((f) => ({ ...f, title: v, slug: isNew ? slugify(v) : f.slug }));
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="field-label">Article Title</label>
          <input className="field" value={form.title} onChange={(e) => handleTitle(e.target.value)} placeholder="e.g. 5 Essential Home Care Tips for Seniors" />
        </div>
        <div>
          <label className="field-label">URL Slug</label>
          <input className="field font-mono text-xs" value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="5-essential-home-care-tips" />
        </div>
        <div>
          <label className="field-label">Category</label>
          <input className="field uppercase" value={form.category} onChange={(e) => set("category", e.target.value.toUpperCase())} placeholder="WELLNESS, SAFETY, CAREGIVING" />
        </div>
        <div>
          <label className="field-label">Image Path / URL</label>
          <input className="field" value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="/images/blog_1.jpg" />
        </div>
        <div>
          <label className="field-label">Publication Date</label>
          <input type="date" className="field" value={form.date} onChange={(e) => set("date", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label">Card Snippet (Short Summary)</label>
          <textarea className="field" rows={2} value={form.snippet} onChange={(e) => set("snippet", e.target.value)} placeholder="Short summary displayed on article cards..." />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label">Full Content (HTML Supported)</label>
          <textarea className="field font-mono text-xs" rows={12} value={form.content} onChange={(e) => set("content", e.target.value)} placeholder="<p>Write your article body here...</p>" />
        </div>
        <div className="sm:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <p className="font-bold text-sm text-[#081630]">Visibility Status</p>
            <p className="text-xs text-slate-500">Choose whether this article is live on the public website.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EE7862]"></div>
            <span className="ml-3 text-xs font-bold text-slate-700">{form.published ? "Published" : "Draft"}</span>
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button onClick={() => onSave(form)} className="btn-primary flex-1 sm:flex-initial">
          <Save className="w-4 h-4" /> Save Article
        </button>
        <button onClick={onCancel} className="btn-ghost flex-1 sm:flex-initial">Cancel</button>
      </div>
    </div>
  );
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null | "new">(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = async (preferLocal = false) => {
    if (preferLocal) {
      setBlogs(getBlogs());
      return;
    }
    try {
      setBlogs(await fetchBlogs());
    } catch {
      setBlogs(getBlogs());
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const handleSave = async (post: BlogPost) => {
    setBusy(true);
    const synced = await saveBlogRemote(post);
    await refresh(!synced);
    setEditingBlog(null);
    setBusy(false);
  };

  const handleTogglePublished = async (post: BlogPost) => {
    setBusy(true);
    const synced = await saveBlogRemote({ ...post, published: !post.published });
    await refresh(!synced);
    setBusy(false);
  };

  const handleDelete = async (id: string) => {
    setBusy(true);
    const synced = await deleteBlogRemote(id);
    await refresh(!synced);
    setDeleteId(null);
    setBusy(false);
  };

  return (
    <>
      {editingBlog !== null ? (
        <>
          <button onClick={() => setEditingBlog(null)} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#EE7862] mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </button>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm">
            <h2 className="font-bold text-xl sm:text-2xl text-[#081630] mb-6">
              {editingBlog === "new" ? "Create New Article" : "Edit Article"}
            </h2>
            <BlogForm
              key={editingBlog === "new" ? "new" : editingBlog.id}
              initial={editingBlog === "new" ? undefined : editingBlog}
              onSave={handleSave}
              onCancel={() => setEditingBlog(null)}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-bold text-2xl text-[#081630]">Blog Articles</h1>
              <p className="text-slate-500 text-sm mt-0.5">
                {blogs.length} total · {blogs.filter((b) => b.published).length} published live
              </p>
            </div>
            <button onClick={() => setEditingBlog("new")} className="btn-primary w-full sm:w-auto">
              <Plus className="w-4 h-4" /> New Article
            </button>
          </div>

          <div className="space-y-4">
            {blogs.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-start gap-4 min-w-0 w-full sm:w-auto flex-1">
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                    <Image src={post.image} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${post.published ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-amber-100 text-amber-800 border border-amber-200"}`}>
                        {post.published ? "● Published" : "○ Draft"}
                      </span>
                      <span className="text-[10px] font-bold text-[#081630] bg-[#00F0ED]/20 px-2.5 py-0.5 rounded-full uppercase">{post.category}</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#081630] text-sm sm:text-base leading-snug line-clamp-1">{post.title}</h3>
                    <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">{post.snippet}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                  <button
                    disabled={busy}
                    onClick={() => handleTogglePublished(post)}
                    title={post.published ? "Unpublish Article" : "Publish Article"}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      post.published
                        ? "bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800"
                        : "bg-[#081630] hover:bg-[#EE7862] text-white"
                    }`}
                  >
                    {post.published ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Unpublish</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Publish</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setEditingBlog(post)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                    title="Edit Post"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setDeleteId(post.id)}
                    className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-all cursor-pointer"
                    title="Delete Post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {blogs.length === 0 && (
              <EmptyState
                title="No blog posts yet"
                description="Create your first article to publish on the site."
                action={<button onClick={() => setEditingBlog("new")} className="btn-primary"><Plus className="w-4 h-4" /> New Article</button>}
              />
            )}
          </div>
        </>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center relative">
            <button onClick={() => setDeleteId(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#081630] mb-2">Delete this article?</h3>
            <p className="text-slate-500 text-xs sm:text-sm mb-6">This will permanently delete this blog post from your website. This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button
                disabled={busy}
                onClick={() => handleDelete(deleteId)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50 flex-1"
              >
                Delete
              </button>
              <button onClick={() => setDeleteId(null)} className="btn-ghost flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
