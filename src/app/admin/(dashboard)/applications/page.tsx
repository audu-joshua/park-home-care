"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Mail, Phone, Briefcase, Calendar, Trash2, X, Search, User, FileText, ArrowRight
} from "lucide-react";
import {
  fetchApplications,
  deleteApplicationRemote,
  type JobApplication,
} from "@/lib/store";
import EmptyState from "@/components/EmptyState";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function initials(app: JobApplication) {
  return `${app.firstName?.[0] ?? ""}${app.lastName?.[0] ?? ""}`.toUpperCase() || "?";
}

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<JobApplication | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    setApps(await fetchApplications());
  };

  useEffect(() => {
    (async () => {
      await refresh();
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return apps;
    return apps.filter((app) =>
      [app.firstName, app.lastName, app.email, app.phone, app.position, app.message]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [apps, query]);

  const handleDelete = async (id: string) => {
    setBusy(true);
    try {
      await deleteApplicationRemote(id);
      if (selected?.id === id) setSelected(null);
      await refresh();
    } finally {
      setDeleteId(null);
      setBusy(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-bold text-2xl text-[#081630]">Job Applications</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {apps.length} submitted {apps.length === 1 ? "candidate application" : "candidate applications"}
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            className="field pl-9"
            placeholder="Search candidate name, position, email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <span className="w-8 h-8 border-2 border-[#EE7862]/30 border-t-[#EE7862] rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title={apps.length === 0 ? "No applications yet" : "No matching applications"}
          description={
            apps.length === 0
              ? "When candidates apply on the careers page, their application details will appear here."
              : "Try searching for another candidate name or position."
          }
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => (
            <div
              key={app.id}
              onClick={() => setSelected(app)}
              className="w-full text-left bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer group"
            >
              <div className="flex items-center gap-3.5 min-w-0 w-full sm:w-auto">
                <div className="w-11 h-11 rounded-full bg-[#081630] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-sm group-hover:bg-[#EE7862] transition-colors">
                  {initials(app)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-[#081630] text-sm sm:text-base group-hover:text-[#EE7862] transition-colors">
                      {app.firstName} {app.lastName}
                    </h3>
                    {app.position && (
                      <span className="text-[10px] font-bold text-[#EE7862] bg-[#EE7862]/10 border border-[#EE7862]/20 px-2.5 py-0.5 rounded-full">
                        {app.position}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs truncate">{app.email} · {app.phone}</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">{formatDate(app.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                <span className="text-xs font-semibold text-[#EE7862] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  View Full Details <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Application Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-start justify-between p-5 sm:p-6 border-b border-slate-100 bg-[#081630] text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#EE7862] text-white flex items-center justify-center font-bold text-lg shadow-md">
                  {initials(selected)}
                </div>
                <div>
                  <h2 className="font-bold text-lg text-white leading-tight">
                    {selected.firstName} {selected.lastName}
                  </h2>
                  <p className="text-xs text-[#00F0ED] font-semibold">{selected.position || "Caregiver Applicant"}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
              <DetailRow icon={User} label="Applicant Name" value={`${selected.firstName} ${selected.lastName}`} />
              <DetailRow icon={Mail} label="Email Address" value={selected.email} href={`mailto:${selected.email}`} />
              <DetailRow icon={Phone} label="Phone Number" value={selected.phone} href={`tel:${selected.phone}`} />
              <DetailRow icon={Briefcase} label="Position Interested In" value={selected.position || "General Application"} />
              <DetailRow icon={Calendar} label="Date Submitted" value={formatDate(selected.createdAt)} />

              <div className="pt-2">
                <p className="field-label">Experience & Cover Message</p>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {selected.message?.trim() || "No additional notes provided."}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 flex flex-wrap gap-3">
              <a
                href={`mailto:${selected.email}`}
                className="btn-primary flex-1 justify-center text-xs sm:text-sm"
              >
                <Mail className="w-4 h-4" /> Email Candidate
              </a>
              <a
                href={`tel:${selected.phone}`}
                className="btn-ghost flex-1 justify-center text-xs sm:text-sm bg-white border border-slate-200 hover:bg-slate-100"
              >
                <Phone className="w-4 h-4 text-emerald-600" /> Call Candidate
              </a>
              <button
                onClick={() => setDeleteId(selected.id)}
                className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all border border-red-200 cursor-pointer"
                title="Delete Application"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center relative">
            <button onClick={() => setDeleteId(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#081630] mb-2">Delete application?</h3>
            <p className="text-slate-500 text-xs sm:text-sm mb-6">This candidate record will be permanently deleted. This action cannot be undone.</p>
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

function DetailRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
        {href ? (
          <a href={href} className="text-sm font-semibold text-[#081630] hover:text-[#EE7862] transition-colors break-all">
            {value}
          </a>
        ) : (
          <p className="text-sm font-semibold text-[#081630] break-all">{value}</p>
        )}
      </div>
    </div>
  );
}
