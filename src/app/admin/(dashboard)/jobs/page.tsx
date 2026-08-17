"use client";

import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Save, ArrowLeft, X } from "lucide-react";
import {
  fetchJobs,
  getJobs,
  saveJobRemote,
  deleteJobRemote,
  type JobOpening,
} from "@/lib/store";
import EmptyState from "@/components/EmptyState";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function JobForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: JobOpening;
  onSave: (j: JobOpening) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<JobOpening>(
    initial ?? {
      id: uid(),
      title: "",
      department: "",
      type: "Full-Time",
      location: "Raleigh, NC",
      description: "",
      requirements: [""],
      posted: new Date().toISOString().slice(0, 10),
      active: true,
    }
  );

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
                  <button type="button" onClick={() => removeReq(i)} className="text-slate-400 hover:text-red-500 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addReq} className="text-xs text-[#EE7862] font-semibold hover:underline">
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

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [editingJob, setEditingJob] = useState<JobOpening | null | "new">(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = async (preferLocal = false) => {
    if (preferLocal) {
      setJobs(getJobs());
      return;
    }
    try {
      setJobs(await fetchJobs());
    } catch {
      setJobs(getJobs());
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const handleSave = async (job: JobOpening) => {
    setBusy(true);
    const synced = await saveJobRemote({
      ...job,
      requirements: job.requirements.map((r) => r.trim()).filter(Boolean),
    });
    await refresh(!synced);
    setEditingJob(null);
    setBusy(false);
  };

  const handleToggleActive = async (job: JobOpening) => {
    setBusy(true);
    const synced = await saveJobRemote({ ...job, active: !job.active });
    await refresh(!synced);
    setBusy(false);
  };

  const handleDelete = async (id: string) => {
    setBusy(true);
    const synced = await deleteJobRemote(id);
    await refresh(!synced);
    setDeleteId(null);
    setBusy(false);
  };

  const typeColor = (t: string) =>
    t === "Full-Time" ? "bg-emerald-100 text-emerald-700" :
    t === "Part-Time" ? "bg-blue-100 text-blue-700" :
    "bg-amber-100 text-amber-700";

  return (
    <>
      {editingJob !== null ? (
        <>
          <button onClick={() => setEditingJob(null)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Job Openings
          </button>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="font-bold text-xl text-[#081630] mb-6">
              {editingJob === "new" ? "New Job Opening" : "Edit Job Opening"}
            </h2>
            <JobForm
              key={editingJob === "new" ? "new" : editingJob.id}
              initial={editingJob === "new" ? undefined : editingJob}
              onSave={handleSave}
              onCancel={() => setEditingJob(null)}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-bold text-2xl text-[#081630]">Job Openings</h1>
              <p className="text-slate-500 text-sm mt-0.5">
                {jobs.length} total · {jobs.filter((j) => j.active).length} active
              </p>
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
                  <p className="text-slate-500 text-xs mt-1">
                    {job.location} · Posted {new Date(job.posted).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    disabled={busy}
                    onClick={() => handleToggleActive(job)}
                    title={job.active ? "Unpublish" : "Publish"}
                    className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-[#081630] transition-all disabled:opacity-50"
                  >
                    {job.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setEditingJob(job)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-[#081630] transition-all">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteId(job.id)} className="p-2 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {jobs.length === 0 && (
              <EmptyState
                title="No job openings"
                description="Add a job opening to make it visible on the careers page."
                action={<button onClick={() => setEditingJob("new")} className="btn-primary"><Plus className="w-4 h-4" /> New Job</button>}
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
            <p className="text-slate-500 text-sm mb-6">This will permanently delete this job opening. This cannot be undone.</p>
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
