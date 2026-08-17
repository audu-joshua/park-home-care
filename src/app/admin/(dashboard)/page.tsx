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
      published: false,
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
          <label className="field-label">Title</label>
          <input className="field" value={form.title} onChange={(e) => handleTitle(e.target.value)} placeholder="Article title" />
        </div>
        <div>
          <label className="field-label">Slug</label>
          <input className="field" value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto-generated-slug" />
        </div>
        <div>
          <label className="field-label">Category</label>
          <input className="field" value={form.category} onChange={(e) => set("category", e.target.value.toUpperCase())} placeholder="e.g. WELLNESS" />
        </div>
        <div>
          <label className="field-label">Image Path</label>
          <input className="field" value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="/images/blog_1.jpg" />
        </div>
        <div>
          <label className="field-label">Date</label>
          <input type="date" className="field" value={form.date} onChange={(e) => set("date", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label">Snippet (shown in cards)</label>
          <textarea className="field" rows={2} value={form.snippet} onChange={(e) => set("snippet", e.target.value)} placeholder="One-line summary..." />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label">Content (HTML)</label>
          <textarea className="field font-mono text-xs" rows={10} value={form.content} onChange={(e) => set("content", e.target.value)} placeholder="<p>Article body...</p>" />
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="pub" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="w-4 h-4 accent-[#EE7862]" />
          <label htmlFor="pub" className="text-sm text-slate-700 cursor-pointer">Published (visible on site)</label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave(form)} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Post
        </button>
        <button onClick={onCancel} className="btn-ghost">Cancel</button>
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
          <button onClick={() => setEditingBlog(null)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog Posts
          </button>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="font-bold text-xl text-[#081630] mb-6">
              {editingBlog === "new" ? "New Blog Post" : "Edit Blog Post"}
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-bold text-2xl text-[#081630]">Blog Posts</h1>
              <p className="text-slate-500 text-sm mt-0.5">
                {blogs.length} total · {blogs.filter((b) => b.published).length} published
              </p>
            </div>
            <button onClick={() => setEditingBlog("new")} className="btn-primary">
              <Plus className="w-4 h-4" /> New Post
            </button>
          </div>

          <div className="space-y-4">
            {blogs.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex gap-4 items-start hover:shadow-md transition-shadow">
                <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${post.published ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                    <span className="text-[10px] font-bold text-[#00F0ED] bg-[#00F0ED]/10 px-2.5 py-0.5 rounded-full uppercase">{post.category}</span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#081630] text-sm leading-snug truncate">{post.title}</h3>
                  <p className="text-slate-500 text-xs mt-1 line-clamp-1">{post.snippet}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    disabled={busy}
                    onClick={() => handleTogglePublished(post)}
                    title={post.published ? "Unpublish" : "Publish"}
                    className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-[#081630] transition-all disabled:opacity-50"
                  >
                    {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setEditingBlog(post)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-[#081630] transition-all">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteId(post.id)} className="p-2 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {blogs.length === 0 && (
              <EmptyState
                title="No blog posts"
                description="Create your first post to publish on the site."
                action={<button onClick={() => setEditingBlog("new")} className="btn-primary"><Plus className="w-4 h-4" /> New Post</button>}
              />
            )}
          </div>
        </>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center relative">
            <button onClick={() => setDeleteId(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-4 h-4" />
            </button>
            <Trash2 className="w-10 h-10 text-red-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-[#081630] mb-2">Are you sure?</h3>
            <p className="text-slate-500 text-sm mb-6">This will permanently delete this blog post. This cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button
                disabled={busy}
                onClick={() => handleDelete(deleteId)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
              >
                Delete
              </button>
              <button onClick={() => setDeleteId(null)} className="btn-ghost">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
