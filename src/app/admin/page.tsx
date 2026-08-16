"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard, FileText, Briefcase, LogOut, Plus, Pencil, Trash2,
  Eye, EyeOff, CheckCircle, XCircle, X, ChevronDown, Save, ArrowLeft
} from "lucide-react";
import {
  isAdminLoggedIn, adminLogout,
  getBlogs, saveBlog, deleteBlog,
  getJobs, saveJob, deleteJob,
  type BlogPost, type JobOpening
} from "@/lib/store";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ─── Blog Form ────────────────────────────────────────────────────────────────
function BlogForm({ initial, onSave, onCancel }: {
  initial?: BlogPost;
  onSave: (p: BlogPost) => void;
  onCancel: () => void;
}) {
  const isNew = !initial;
  const [form, setForm] = useState<BlogPost>(initial ?? {
    id: uid(), slug: "", title: "", category: "WELLNESS",
    snippet: "", content: "", image: "/images/blog_1.jpg",
    date: new Date().toISOString().slice(0, 10), published: false,
  });

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

// ─── Job Form ─────────────────────────────────────────────────────────────────
function JobForm({ initial, onSave, onCancel }: {
  initial?: JobOpening;
  onSave: (j: JobOpening) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<JobOpening>(initial ?? {
    id: uid(), title: "", department: "", type: "Full-Time",
    location: "Raleigh, NC", description: "", requirements: [""],
    posted: new Date().toISOString().slice(0, 10), active: true,
  });

  const set = (k: keyof JobOpening, v: string | boolean | string[]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const setReq = (idx: number, val: string) => {
    const reqs = [...form.requirements];
    reqs[idx] = val;
    set("requirements", reqs);
  };
  const addReq = () => set("requirements", [...form.requirements, ""]);
  const removeReq = (idx: number) => set("requirements", form.requirements.filter((_, i) => i !== idx));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="field-label">Job Title</label>
          <input className="field" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Certified Nursing Assistant" />
        </div>
        <div>
          <label className="field-label">Department</label>
          <input className="field" value={form.department} onChange={(e) => set("department", e.target.value)} placeholder="e.g. Clinical" />
        </div>
        <div>
          <label className="field-label">Type</label>
          <select className="field bg-white" value={form.type} onChange={(e) => set("type", e.target.value as JobOpening["type"])}>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Flexible</option>
          </select>
        </div>
        <div>
          <label className="field-label">Location</label>
          <input className="field" value={form.location} onChange={(e) => set("location", e.target.value)} />
        </div>
        <div>
          <label className="field-label">Date Posted</label>
          <input type="date" className="field" value={form.posted} onChange={(e) => set("posted", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label">Description</label>
          <textarea className="field" rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Role overview..." />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label">Requirements</label>
          <div className="space-y-2">
            {form.requirements.map((req, i) => (
              <div key={i} className="flex gap-2">
                <input className="field flex-1" value={req} onChange={(e) => setReq(i, e.target.value)} placeholder={`Requirement ${i + 1}`} />
                {form.requirements.length > 1 && (
                  <button type="button" onClick={() => removeReq(i)} className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addReq} className="text-xs text-[#EE7862] font-semibold hover:underline cursor-pointer">
              + Add requirement
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="active" checked={form.active} onChange={(e) => set("active", e.target.checked)} className="w-4 h-4 accent-[#EE7862]" />
          <label htmlFor="active" className="text-sm text-slate-700 cursor-pointer">Active (visible on careers page)</label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave(form)} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Opening
        </button>
        <button onClick={onCancel} className="btn-ghost">Cancel</button>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
type Tab = "blogs" | "jobs";

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("blogs");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null | "new">(null);
  const [editingJob, setEditingJob] = useState<JobOpening | null | "new">(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: "blog" | "job"; id: string } | null>(null);

  useEffect(() => {
    if (!isAdminLoggedIn()) { router.replace("/admin/login"); return; }
    setBlogs(getBlogs());
    setJobs(getJobs());
  }, [router]);

  const refreshBlogs = () => setBlogs(getBlogs());
  const refreshJobs = () => setJobs(getJobs());

  const handleSaveBlog = (post: BlogPost) => {
    saveBlog(post);
    refreshBlogs();
    setEditingBlog(null);
  };

  const handleToggleBlogPublished = (post: BlogPost) => {
    saveBlog({ ...post, published: !post.published });
    refreshBlogs();
  };

  const handleDeleteBlog = (id: string) => {
    deleteBlog(id);
    refreshBlogs();
    setDeleteConfirm(null);
  };

  const handleSaveJob = (job: JobOpening) => {
    saveJob(job);
    refreshJobs();
    setEditingJob(null);
  };

  const handleToggleJobActive = (job: JobOpening) => {
    saveJob({ ...job, active: !job.active });
    refreshJobs();
  };

  const handleDeleteJob = (id: string) => {
    deleteJob(id);
    refreshJobs();
    setDeleteConfirm(null);
  };

  const handleLogout = () => {
    adminLogout();
    router.replace("/admin/login");
  };

  const typeColor = (t: string) =>
    t === "Full-Time" ? "bg-emerald-100 text-emerald-700" :
    t === "Part-Time" ? "bg-blue-100 text-blue-700" :
    "bg-amber-100 text-amber-700";

  return (
    <>
      {/* Global admin styles */}
      <style>{`
        .field-label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #475569; margin-bottom: 6px; }
        .field { width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 13.5px; color: #1e293b; outline: none; transition: border-color .15s, box-shadow .15s; }
        .field:focus { border-color: #EE7862; box-shadow: 0 0 0 3px rgba(238,120,98,.15); }
        .btn-primary { background: #EE7862; color: #fff; font-size: 13px; font-weight: 600; padding: 10px 20px; border-radius: 10px; cursor: pointer; transition: background .2s, transform .1s; display: inline-flex; align-items: center; gap: 6px; }
        .btn-primary:hover { background: #E4644D; }
        .btn-primary:active { transform: scale(0.98); }
        .btn-ghost { background: #f1f5f9; color: #475569; font-size: 13px; font-weight: 600; padding: 10px 20px; border-radius: 10px; cursor: pointer; transition: background .2s; }
        .btn-ghost:hover { background: #e2e8f0; }
      `}</style>

      <div className="min-h-screen bg-[#F8FAFC] flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#081630] text-white shrink-0">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9">
                <Image src="/images/Icon 1.webp" alt="Logo" fill className="object-contain" />
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">Pack Home Health Care</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Admin Portal</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {[
              { id: "blogs" as Tab, icon: FileText, label: "Blog Posts" },
              { id: "jobs" as Tab, icon: Briefcase, label: "Job Openings" },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => { setTab(id); setEditingBlog(null); setEditingJob(null); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  tab === id ? "bg-[#EE7862] text-white" : "text-slate-300 hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10 space-y-2">
            <a href="/" target="_blank" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer">
              <Eye className="w-4 h-4" />
              View Site
            </a>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-[#EE7862] hover:bg-white/10 transition-all cursor-pointer">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="lg:hidden fixed top-0 inset-x-0 z-30 bg-[#081630] text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7">
              <Image src="/images/Icon 1.webp" alt="Logo" fill className="object-contain" />
            </div>
            <span className="font-bold text-sm">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            {(["blogs", "jobs"] as Tab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer ${tab === t ? "bg-[#EE7862] text-white" : "text-slate-300 hover:bg-white/10"}`}>
                {t === "blogs" ? "Blogs" : "Jobs"}
              </button>
            ))}
            <button onClick={handleLogout} className="text-slate-400 hover:text-white ml-1 cursor-pointer">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 lg:p-10 mt-14 lg:mt-0 overflow-y-auto">

          {/* ── BLOGS TAB ── */}
          {tab === "blogs" && (
            <div>
              {editingBlog !== null ? (
                <>
                  <button onClick={() => setEditingBlog(null)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors cursor-pointer">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog Posts
                  </button>
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h2 className="font-bold text-xl text-[#081630] mb-6">
                      {editingBlog === "new" ? "New Blog Post" : "Edit Blog Post"}
                    </h2>
                    <BlogForm
                      initial={editingBlog === "new" ? undefined : editingBlog}
                      onSave={handleSaveBlog}
                      onCancel={() => setEditingBlog(null)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h1 className="font-bold text-2xl text-[#081630]">Blog Posts</h1>
                      <p className="text-slate-500 text-sm mt-0.5">{blogs.length} total · {blogs.filter((b) => b.published).length} published</p>
                    </div>
                    <button onClick={() => setEditingBlog("new")} className="btn-primary">
                      <Plus className="w-4 h-4" /> New Post
                    </button>
                  </div>

                  <div className="space-y-4">
                    {blogs.map((post) => (
                      <div key={post.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex gap-4 items-start hover:shadow-md transition-shadow">
                        <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0">
                          <Image src={post.image} alt={post.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${post.published ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                              {post.published ? "Published" : "Draft"}
                            </span>
                            <span className="text-[10px] font-bold text-[#00F0ED] bg-[#00F0ED]/10 px-2.5 py-0.5 rounded-full uppercase">{post.category}</span>
                            <span className="text-[10px] text-slate-400">{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                          </div>
                          <h3 className="font-semibold text-[#081630] text-sm leading-snug truncate">{post.title}</h3>
                          <p className="text-slate-500 text-xs mt-1 line-clamp-1">{post.snippet}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button onClick={() => handleToggleBlogPublished(post)} title={post.published ? "Unpublish" : "Publish"} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-[#081630] transition-all cursor-pointer">
                            {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button onClick={() => setEditingBlog(post)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-[#081630] transition-all cursor-pointer">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDeleteConfirm({ type: "blog", id: post.id })} className="p-2 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {blogs.length === 0 && (
                      <div className="text-center py-16 text-slate-400">No blog posts yet. Create your first one!</div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── JOBS TAB ── */}
          {tab === "jobs" && (
            <div>
              {editingJob !== null ? (
                <>
                  <button onClick={() => setEditingJob(null)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors cursor-pointer">
                    <ArrowLeft className="w-4 h-4" /> Back to Job Openings
                  </button>
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h2 className="font-bold text-xl text-[#081630] mb-6">
                      {editingJob === "new" ? "New Job Opening" : "Edit Job Opening"}
                    </h2>
                    <JobForm
                      initial={editingJob === "new" ? undefined : editingJob}
                      onSave={handleSaveJob}
                      onCancel={() => setEditingJob(null)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h1 className="font-bold text-2xl text-[#081630]">Job Openings</h1>
                      <p className="text-slate-500 text-sm mt-0.5">{jobs.length} total · {jobs.filter((j) => j.active).length} active</p>
                    </div>
                    <button onClick={() => setEditingJob("new")} className="btn-primary">
                      <Plus className="w-4 h-4" /> New Opening
                    </button>
                  </div>

                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <div key={job.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex gap-4 items-start hover:shadow-md transition-shadow">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${job.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                              {job.active ? "Active" : "Inactive"}
                            </span>
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${typeColor(job.type)}`}>{job.type}</span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">{job.department}</span>
                          </div>
                          <h3 className="font-semibold text-[#081630] leading-snug">{job.title}</h3>
                          <p className="text-slate-500 text-xs mt-1">{job.location} · Posted {new Date(job.posted).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button onClick={() => handleToggleJobActive(job)} title={job.active ? "Deactivate" : "Activate"} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-[#081630] transition-all cursor-pointer">
                            {job.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button onClick={() => setEditingJob(job)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-[#081630] transition-all cursor-pointer">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDeleteConfirm({ type: "job", id: job.id })} className="p-2 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {jobs.length === 0 && (
                      <div className="text-center py-16 text-slate-400">No job openings yet. Add your first one!</div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
            <Trash2 className="w-10 h-10 text-red-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-[#081630] mb-2">Are you sure?</h3>
            <p className="text-slate-500 text-sm mb-6">This will permanently delete this {deleteConfirm.type === "blog" ? "blog post" : "job opening"}. This cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => deleteConfirm.type === "blog" ? handleDeleteBlog(deleteConfirm.id) : handleDeleteJob(deleteConfirm.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
              >
                Delete
              </button>
              <button onClick={() => setDeleteConfirm(null)} className="btn-ghost">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
