"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FileText, Briefcase, Users, LogOut, Eye } from "lucide-react";
import { adminLogout, isAdminLoggedIn } from "@/lib/store";

const NAV = [
  { href: "/admin", label: "Blog Posts", short: "Blogs", match: (path: string) => path === "/admin" },
  { href: "/admin/jobs", label: "Job Openings", short: "Jobs", match: (path: string) => path.startsWith("/admin/jobs") },
  { href: "/admin/applications", label: "Applications", short: "Apps", match: (path: string) => path.startsWith("/admin/applications") },
] as const;

const ICONS = {
  "/admin": FileText,
  "/admin/jobs": Briefcase,
  "/admin/applications": Users,
};

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [router]);

  const handleLogout = () => {
    adminLogout();
    router.replace("/admin/login");
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-[#EE7862]/30 border-t-[#EE7862] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
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

      <div className="min-h-screen bg-[#F8FAFC]">
        <aside className="hidden lg:flex flex-col w-64 bg-[#081630] text-white fixed inset-y-0 left-0 z-40 overflow-y-auto">
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
            {NAV.map(({ href, label, match }) => {
              const Icon = ICONS[href];
              const active = match(pathname);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active ? "bg-[#EE7862] text-white" : "text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10 space-y-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <Eye className="w-4 h-4" />
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-[#EE7862] hover:bg-white/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        <div className="lg:hidden fixed top-0 inset-x-0 z-30 bg-[#081630] text-white px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative w-7 h-7 shrink-0">
              <Image src="/images/Icon 1.webp" alt="Logo" fill className="object-contain" />
            </div>
            <span className="font-bold text-sm">Admin</span>
          </div>
          <div className="flex items-center gap-1 overflow-x-auto">
            {NAV.map(({ href, short, match }) => (
              <Link
                key={href}
                href={href}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  match(pathname) ? "bg-[#EE7862] text-white" : "text-slate-300 hover:bg-white/10"
                }`}
              >
                {short}
              </Link>
            ))}
            <button onClick={handleLogout} className="text-slate-400 hover:text-white ml-1">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        <main className="lg:pl-64 pt-14 lg:pt-0 min-h-screen">
          <div className="p-6 lg:p-10">{children}</div>
        </main>
      </div>
    </>
  );
}
