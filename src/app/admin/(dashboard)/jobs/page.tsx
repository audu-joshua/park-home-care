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
      department: "Caregiving",
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
    <div className="space-y-4 min-w-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2 min-w-0">
          <label className="field-label">Job Title</label>
          <input className="field" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Certified Nursing Assistant (CNA)" />
        </div>
        <div className="min-w-0">
          <label className="field-label">Department</label>
          <input className="field" value={form.department} onChange={(e) => set("department", e.target.value)} placeholder="e.g. Caregiving, Clinical, Administration" />
        </div>
        <div className="min-w-0">
          <label className="field-label">Employment Type</label>
          <select className="field bg-white" value={form.type} onChange={(e) => set("type", e.target.value as JobOpening["type"])}>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Flexible</option>
          </select>
        </div>
        <div className="min-w-0">
          <label className="field-label">Location</label>
          <input className="field" value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="Raleigh, NC" />
        </div>
        <div className="min-w-0">
          <label className="field-label">Date Posted</label>
          <input type="date" className="field" value={form.posted} onChange={(e) => set("posted", e.target.value)} />
        </div>
        <div className="sm:col-span-2 min-w-0">
          <label className="field-label">Role Description</label>
          <textarea className="field" rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Brief summary of duties and responsibilities..." />
        </div>
        <div className="sm:col-span-2 min-w-0">
          <label className="field-label">Key Requirements</label>
          <div className="space-y-2">
            {form.requirements.map((req, i) => (
              <div key={i} className="flex gap-2 min-w-0">
                <input className="field min-w-0 flex-1" value={req} onChange={(e) => setReq(i, e.target.value)} placeholder={`Requirement #${i + 1}`} />
                {form.requirements.length > 1 && (
                  <button type="button" onClick={() => removeReq(i)} className="p-2 text-slate-400 hover:text-red-500 transition-colors shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addReq} className="text-xs text-[#EE7862] font-bold hover:underline inline-flex items-center gap-1 mt-1">
              + Add another requirement
            </button>
          </div>
        </div>
        <div className="sm:col-span-2 bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between min-w-0">
          <div className="min-w-0">
            <p className="font-bold text-sm text-[#081630]">Active Status</p>
            <p className="text-xs text-slate-500">Show this job opening on the careers page for candidates to apply.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0 self-start sm:self-auto">
            <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EE7862]"></div>
            <span className="ml-3 text-xs font-bold text-slate-700">{form.active ? "Active" : "Hidden"}</span>
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        <button onClick={() => onSave(form)} className="btn-primary flex-1 sm:flex-initial min-w-0">
          <Save className="w-4 h-4" /> Save Job Opening
        </button>
        <button onClick={onCancel} className="btn-ghost flex-1 sm:flex-initial min-w-0">Cancel</button>
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
    t === "Full-Time" ? "bg-emerald-100 text-emerald-800 border-emerald-200" :
    t === "Part-Time" ? "bg-blue-100 text-blue-800 border-blue-200" :
    "bg-amber-100 text-amber-800 border-amber-200";

  return (
    <>
      {editingJob !== null ? (
        <>
          <button onClick={() => setEditingJob(null)} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#EE7862] mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 shrink-0" /> Back to Job Openings
          </button>
          <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-6 shadow-sm min-w-0 overflow-hidden">
            <h2 className="font-bold text-lg sm:text-xl text-[#081630] mb-4 break-words">
              {editingJob === "new" ? "Add Job Opening" : "Edit Job Opening"}
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 min-w-0">
            <div className="min-w-0">
              <h1 className="font-bold text-xl text-[#081630]">Job Openings</h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                {jobs.length} total · {jobs.filter((j) => j.active).length} active listings
              </p>
            </div>
            <button onClick={() => setEditingJob("new")} className="btn-primary w-full sm:w-auto shrink-0">
              <Plus className="w-4 h-4" /> New Opening
            </button>
          </div>

          <div className="space-y-3 min-w-0">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between min-w-0 overflow-hidden">
                <div className="flex-1 min-w-0 w-full sm:w-auto">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${job.active ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-slate-100 text-slate-500 border-slate-200"}`}>
                      {job.active ? "● Active" : "○ Hidden"}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${typeColor(job.type)}`}>{job.type}</span>
                    <span className="text-[10px] font-bold text-[#081630] bg-[#00F0ED]/20 px-2 py-0.5 rounded-full uppercase max-w-[9rem] truncate">{job.department}</span>
                  </div>
                  <h3 className="font-bold text-[#081630] text-sm leading-snug break-words">{job.title}</h3>
                  <p className="text-slate-500 text-xs mt-1 flex items-center gap-2 flex-wrap">
                    <span className="break-words">{job.location}</span>
                    <span>•</span>
                    <span>Posted {new Date(job.posted).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </p>
                </div>

                <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0 flex-wrap">
                  <button
                    disabled={busy}
                    onClick={() => handleToggleActive(job)}
                    title={job.active ? "Hide Listing" : "Activate Listing"}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      job.active
                        ? "bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800"
                        : "bg-[#081630] hover:bg-[#EE7862] text-white"
                    }`}
                  >
                    {job.active ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Activate</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setEditingJob(job)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                    title="Edit Opening"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setDeleteId(job.id)}
                    className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-all cursor-pointer"
                    title="Delete Opening"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {jobs.length === 0 && (
              <EmptyState
                title="No job openings yet"
                description="Add a job opening to display it on the careers page."
                action={<button onClick={() => setEditingJob("new")} className="btn-primary"><Plus className="w-4 h-4" /> New Opening</button>}
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
            <h3 className="font-bold text-lg text-[#081630] mb-2">Delete this job opening?</h3>
            <p className="text-slate-500 text-xs sm:text-sm mb-6">This will permanently remove the position from your website. This action cannot be undone.</p>
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
