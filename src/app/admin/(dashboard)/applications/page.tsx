"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Mail, Phone, Briefcase, Calendar, Trash2, X, Search, User,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-bold text-2xl text-[#081630]">Applications</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {apps.length} submitted {apps.length === 1 ? "application" : "applications"}
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            className="field pl-9"
            placeholder="Search name, email, position..."
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
              ? "When someone applies from the careers page, their details will show up here."
              : "Try a different search term."
          }
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => (
            <button
              key={app.id}
              onClick={() => setSelected(app)}
              className="w-full text-left bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start"
            >
              <div className="w-11 h-11 rounded-full bg-[#081630] text-white flex items-center justify-center text-sm font-bold shrink-0">
                {initials(app)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold text-[#081630] text-sm">
                    {app.firstName} {app.lastName}
                  </h3>
                  {app.position && (
                    <span className="text-[10px] font-bold text-[#EE7862] bg-[#EE7862]/10 px-2.5 py-0.5 rounded-full">
                      {app.position}
                    </span>
                  )}
                </div>
                <p className="text-slate-500 text-xs truncate">{app.email} · {app.phone}</p>
                <p className="text-slate-400 text-[11px] mt-1">{formatDate(app.createdAt)}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between p-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#081630] text-white flex items-center justify-center font-bold">
                  {initials(selected)}
                </div>
                <div>
                  <h2 className="font-bold text-lg text-[#081630]">
                    {selected.firstName} {selected.lastName}
                  </h2>
                  <p className="text-xs text-slate-500">{formatDate(selected.createdAt)}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <DetailRow icon={User} label="Full name" value={`${selected.firstName} ${selected.lastName}`} />
              <DetailRow icon={Mail} label="Email" value={selected.email} href={`mailto:${selected.email}`} />
              <DetailRow icon={Phone} label="Phone" value={selected.phone} href={`tel:${selected.phone}`} />
              <DetailRow icon={Briefcase} label="Position" value={selected.position || "Not specified"} />
              <DetailRow icon={Calendar} label="Submitted" value={formatDate(selected.createdAt)} />
              <div>
                <p className="field-label">Experience / Message</p>
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {selected.message?.trim() || "No message provided."}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex gap-3">
              <a href={`mailto:${selected.email}`} className="btn-primary flex-1 justify-center">
                <Mail className="w-4 h-4" /> Email Applicant
              </a>
              <button
                onClick={() => setDeleteId(selected.id)}
                className="btn-ghost text-red-500 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
            <Trash2 className="w-10 h-10 text-red-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg text-[#081630] mb-2">Delete application?</h3>
            <p className="text-slate-500 text-sm mb-6">This applicant record will be permanently removed.</p>
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
      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
        {href ? (
          <a href={href} className="text-sm text-[#081630] hover:text-[#EE7862] break-all">
            {value}
          </a>
        ) : (
          <p className="text-sm text-[#081630] break-all">{value}</p>
        )}
      </div>
    </div>
  );
}
