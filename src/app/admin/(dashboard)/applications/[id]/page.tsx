"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Mail, Phone, Briefcase, Calendar, User, ArrowLeft, Download, ExternalLink, Trash2, X } from "lucide-react";
import { fetchApplications, deleteApplicationRemote, type JobApplication } from "@/lib/store";

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

export default function ApplicationDetailPage() {
  const params = useParams<{ id: string }>();
  const [app, setApp] = useState<JobApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const rows = await fetchApplications();
        const found = rows.find((item) => item.id === params.id) || null;
        setApp(found);
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  const downloadResume = () => {
    if (!app?.resumeDownloadUrl && !app?.resumeDataUrl) return;
    const link = document.createElement("a");
    link.href = app.resumeDownloadUrl || app.resumeDataUrl || "";
    link.download = app.resumeName || `${app.firstName || "candidate"}-${app.lastName || "resume"}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  const handleDelete = async () => {
    if (!app) return;
    setBusy(true);
    try {
      await deleteApplicationRemote(app.id);
      window.location.href = "/admin/applications";
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-[#EE7862]/30 border-t-[#EE7862] rounded-full animate-spin" />
      </div>
    );
  }

  if (!app) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center">
        <h2 className="font-bold text-xl text-[#081630] mb-2">Application Not Found</h2>
        <p className="text-slate-500 text-sm mb-4">This applicant record could not be found.</p>
        <Link href="/admin/applications" className="btn-primary inline-flex">
          <ArrowLeft className="w-4 h-4" /> Back to Applications
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <Link href="/admin/applications" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#EE7862] mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to applications
          </Link>
          <h1 className="font-bold text-xl text-[#081630]">Applicant Details</h1>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-w-0">
        <div className="bg-[#081630] text-white p-4 sm:p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#EE7862] text-white flex items-center justify-center font-bold text-lg shrink-0">
            {initials(app)}
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-lg sm:text-xl leading-tight truncate">{app.firstName} {app.lastName}</h2>
            <p className="text-xs text-[#00F0ED] font-semibold truncate">{app.position || "Caregiver Applicant"}</p>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailRow icon={User} label="Applicant Name" value={`${app.firstName} ${app.lastName}`} />
            <DetailRow icon={Briefcase} label="Position Interested In" value={app.position || "General Application"} />
            <DetailRow icon={Mail} label="Email Address" value={app.email} href={`mailto:${app.email}`} />
            <DetailRow icon={Phone} label="Phone Number" value={app.phone} href={`tel:${app.phone}`} />
            <DetailRow icon={Calendar} label="Date Submitted" value={formatDate(app.createdAt)} />
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="field-label">Background Check Consent</p>
              <p className="text-sm font-semibold text-[#081630]">
                {app.backgroundCheckConsent ? `Granted${app.backgroundCheckConsentAt ? ` on ${formatDate(app.backgroundCheckConsentAt)}` : ""}` : "Not granted"}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="field-label">Experience & Cover Message</p>
            <p className="text-sm text-slate-700 whitespace-pre-wrap break-words leading-relaxed">
              {app.message?.trim() || "No additional notes provided."}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="field-label">Character References</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {[1, 2].map((number) => {
                const name = app[`referee${number}Name` as keyof JobApplication] as string | undefined;
                const business = app[`referee${number}Business` as keyof JobApplication] as string | undefined;
                const phone = app[`referee${number}Phone` as keyof JobApplication] as string | undefined;
                return (
                  <div key={number} className="rounded-lg border border-slate-200 bg-white p-3">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Reference {number}</p>
                    <p className="text-sm font-semibold text-[#081630]">{name || "Not provided"}</p>
                    <p className="text-sm text-slate-600">{business || "Business not provided"}</p>
                    {phone ? <a href={`tel:${phone}`} className="text-sm font-semibold text-[#EE7862] hover:underline">{phone}</a> : <p className="text-sm text-slate-500">Phone not provided</p>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="field-label">Resume</p>
            {(app.resumeViewUrl || app.resumeDownloadUrl || app.resumeDataUrl) ? (
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <a
                  href={app.resumeViewUrl || app.resumeDataUrl || app.resumeDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex text-sm"
                >
                  <ExternalLink className="w-4 h-4" /> View resume
                </a>
                <button onClick={downloadResume} className="btn-ghost inline-flex text-sm">
                  <Download className="w-4 h-4" /> Download resume
                </button>
                <span className="text-xs text-slate-500">{app.resumeName || "Resume"}</span>
              </div>
            ) : (
              <p className="text-sm text-slate-500">No resume uploaded.</p>
            )}
          </div>
        </div>

        <div className="p-3 sm:p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-2 min-w-0">
          <button onClick={downloadBackgroundCheckForm} className="btn-primary flex-1 justify-center text-xs sm:text-sm min-w-0">
            <Mail className="w-4 h-4" /> BG Check Form
          </button>
          <a href={`mailto:${app.email}`} className="btn-primary flex-1 justify-center text-xs sm:text-sm min-w-0 bg-[#081630] hover:bg-[#1d2a41]">
            <Mail className="w-4 h-4" /> Email Candidate
          </a>
          <a href={`tel:${app.phone}`} className="btn-ghost flex-1 justify-center text-xs sm:text-sm bg-white border border-slate-200 hover:bg-slate-100 min-w-0">
            <Phone className="w-4 h-4 text-emerald-600" /> Call Candidate
          </a>
          <button onClick={() => setDeleteId(app.id)} className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all border border-red-200 cursor-pointer shrink-0 self-center sm:self-auto" title="Delete Application">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

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
              <button disabled={busy} onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50 flex-1">
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
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 min-w-0">
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-white text-slate-600 flex items-center justify-center shrink-0 border border-slate-200">
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
    </div>
  );
}
