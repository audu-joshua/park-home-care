"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Eye, EyeOff, Save, ArrowLeft, X } from "lucide-react";
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
    <div className="space-y-4 min-w-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2 min-w-0">
          <label className="field-label">Article Title</label>
          <input className="field" value={form.title} onChange={(e) => handleTitle(e.target.value)} placeholder="e.g. 5 Essential Home Care Tips for Seniors" />
        </div>
        <div className="min-w-0">
          <label className="field-label">URL Slug</label>
          <input className="field font-mono text-xs" value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="5-essential-home-care-tips" />
        </div>
        <div className="min-w-0">
          <label className="field-label">Category</label>
          <input className="field uppercase" value={form.category} onChange={(e) => set("category", e.target.value.toUpperCase())} placeholder="WELLNESS, SAFETY, CAREGIVING" />
        </div>
        <div className="min-w-0">
          <label className="field-label">Image Path / URL</label>
          <input className="field" value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="/images/blog_1.jpg" />
        </div>
        <div className="min-w-0">
          <label className="field-label">Publication Date</label>
          <input type="date" className="field" value={form.date} onChange={(e) => set("date", e.target.value)} />
        </div>
        <div className="sm:col-span-2 min-w-0">
          <label className="field-label">Card Snippet (Short Summary)</label>
          <textarea className="field" rows={2} value={form.snippet} onChange={(e) => set("snippet", e.target.value)} placeholder="Short summary displayed on article cards..." />
        </div>
        <div className="sm:col-span-2 min-w-0">
          <label className="field-label">Full Content (HTML Supported)</label>
          <textarea className="field font-mono text-xs" rows={10} value={form.content} onChange={(e) => set("content", e.target.value)} placeholder="<p>Write your article body here...</p>" />
        </div>
        <div className="sm:col-span-2 bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between min-w-0">
          <div className="min-w-0">
            <p className="font-bold text-sm text-[#081630]">Visibility Status</p>
            <p className="text-xs text-slate-500">Choose whether this article is live on the public website.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0 self-start sm:self-auto">
            <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EE7862]"></div>
            <span className="ml-3 text-xs font-bold text-slate-700">{form.published ? "Published" : "Draft"}</span>
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        <button onClick={() => onSave(form)} className="btn-primary flex-1 sm:flex-initial min-w-0">
          <Save className="w-4 h-4" /> Save Article
        </button>
        <button onClick={onCancel} className="btn-ghost flex-1 sm:flex-initial min-w-0">Cancel</button>
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
          <button onClick={() => setEditingBlog(null)} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#EE7862] mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 shrink-0" /> Back to Articles
          </button>
          <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-6 shadow-sm min-w-0 overflow-hidden">
            <h2 className="font-bold text-lg sm:text-xl text-[#081630] mb-4 break-words">
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 min-w-0">
            <div className="min-w-0">
              <h1 className="font-bold text-xl text-[#081630]">Blog Articles</h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                {blogs.length} total · {blogs.filter((b) => b.published).length} published live
              </p>
            </div>
            <button onClick={() => setEditingBlog("new")} className="btn-primary w-full sm:w-auto shrink-0">
              <Plus className="w-4 h-4" /> New Article
            </button>
          </div>

          <div className="space-y-3 min-w-0">
            {blogs.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between min-w-0 overflow-hidden">
                <div className="flex items-start gap-3 min-w-0 w-full sm:w-auto flex-1">
                  <div className="relative w-16 h-14 sm:w-20 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                    <Image src={post.image} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${post.published ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-amber-100 text-amber-800 border border-amber-200"}`}>
                        {post.published ? "● Published" : "○ Draft"}
                      </span>
                      <span className="text-[10px] font-bold text-[#081630] bg-[#00F0ED]/20 px-2 py-0.5 rounded-full uppercase max-w-[8rem] truncate">{post.category}</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#081630] text-sm leading-snug line-clamp-2 break-words">{post.title}</h3>
                    <p className="text-slate-500 text-xs mt-0.5 line-clamp-1 break-words">{post.snippet}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0 flex-wrap">
                  <button
                    disabled={busy}
                    onClick={() => handleTogglePublished(post)}
                    title={post.published ? "Unpublish Article" : "Publish Article"}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 overflow-x-hidden">
          <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-6 max-w-sm w-full text-center relative min-w-0 overflow-hidden">
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
