"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Mail, Phone, Briefcase, Calendar, Trash2, X, Search, User, ArrowRight
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
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    setApps(await fetchApplications());
  };

  const downloadResume = (app: JobApplication) => {
    if (!app.resumeDownloadUrl && !app.resumeDataUrl) return;
    const link = document.createElement("a");
    link.href = app.resumeDownloadUrl || app.resumeDataUrl || "";
    link.download = app.resumeName || `${app.firstName || "candidate"}-${app.lastName || "resume"}.pdf`;
    link.click();
  };

  const downloadBackgroundCheckForm = () => {
    const link = document.createElement("a");
    link.href = "/packhome_Background_Check.pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download = "packhome_Background_Check.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      await refresh();
    } finally {
      setDeleteId(null);
      setBusy(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 min-w-0">
        <div className="min-w-0">
          <h1 className="font-bold text-xl text-[#081630]">Job Applications</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            {apps.length} submitted {apps.length === 1 ? "candidate application" : "candidate applications"}
          </p>
        </div>
        <div className="relative w-full sm:w-64 min-w-0 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            className="field pl-9"
            placeholder="Search name, position, email..."
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
        <div className="space-y-2.5 min-w-0">
          {filtered.map((app) => (
            <Link
              key={app.id}
              href={`/admin/applications/${app.id}`}
              className="w-full text-left bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 cursor-pointer group min-w-0 overflow-hidden"
            >
              <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-full bg-[#081630] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-sm group-hover:bg-[#EE7862] transition-colors">
                  {initials(app)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                    <h3 className="font-bold text-[#081630] text-sm group-hover:text-[#EE7862] transition-colors break-words">
                      {app.firstName} {app.lastName}
                    </h3>
                    {app.position && (
                      <span className="text-[10px] font-bold text-[#EE7862] bg-[#EE7862]/10 border border-[#EE7862]/20 px-2 py-0.5 rounded-full max-w-full truncate">
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
                  View details <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 overflow-x-hidden">
          <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-6 max-w-sm w-full text-center relative min-w-0 overflow-hidden">
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
    <div className="flex items-start gap-3 min-w-0">
      <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
        {href ? (
          <a href={href} className="text-sm font-semibold text-[#081630] hover:text-[#EE7862] transition-colors break-all">
            {value}
          </a>
        ) : (
          <p className="text-sm font-semibold text-[#081630] break-words">{value}</p>
        )}
      </div>
    </div>
  );
}
