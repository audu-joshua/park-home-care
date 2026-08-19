"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FileText, Briefcase, Users, LogOut, Eye } from "lucide-react";
import { adminLogout, isAdminLoggedIn } from "@/lib/store";

const NAV = [
  { href: "/admin", label: "Blog Posts", short: "Blogs", icon: FileText, match: (path: string) => path === "/admin" },
  { href: "/admin/jobs", label: "Job Openings", short: "Jobs", icon: Briefcase, match: (path: string) => path.startsWith("/admin/jobs") },
  { href: "/admin/applications", label: "Applications", short: "Apps", icon: Users, match: (path: string) => path.startsWith("/admin/applications") },
] as const;

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
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center overflow-x-hidden">
        <span className="w-7 h-7 border-2 border-[#EE7862]/30 border-t-[#EE7862] rounded-full animate-spin" />
      </div>
    );
  }

  const currentNav = NAV.find((n) => n.match(pathname)) || NAV[0];

  return (
    <>
      <style>{`
        .field-label { display: block; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #475569; margin-bottom: 5px; }
        .field { width: 100%; max-width: 100%; min-width: 0; padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 13.5px; color: #1e293b; outline: none; transition: border-color .15s, box-shadow .15s; background-color: #ffffff; box-sizing: border-box; }
        .field:focus { border-color: #EE7862; box-shadow: 0 0 0 3px rgba(238,120,98,.15); }
        .btn-primary { background: #EE7862; color: #fff; font-size: 13px; font-weight: 600; padding: 8px 14px; border-radius: 10px; cursor: pointer; transition: background .2s, transform .1s; display: inline-flex; align-items: center; justify-content: center; gap: 6px; border: none; }
        .btn-primary:hover { background: #E4644D; }
        .btn-primary:active { transform: scale(0.98); }
        .btn-ghost { background: #f1f5f9; color: #475569; font-size: 13px; font-weight: 600; padding: 8px 14px; border-radius: 10px; cursor: pointer; transition: background .2s; border: none; display: inline-flex; align-items: center; justify-content: center; gap: 6px; }
        .btn-ghost:hover { background: #e2e8f0; }
      `}</style>

      <div className="min-h-screen min-w-0 max-w-[100vw] bg-[#F8FAFC] flex flex-col overflow-x-hidden">
        {/* Desktop Fixed Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 bg-[#081630] text-white fixed inset-y-0 left-0 z-40 overflow-y-auto overflow-x-hidden shadow-2xl">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-8 h-8 shrink-0">
                <Image src="/images/Icon 1.webp" alt="Logo" fill className="object-contain" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[13px] leading-tight text-white truncate">Pack Home Health</p>
                <p className="text-[10px] text-[#00F0ED] uppercase tracking-wider font-semibold">Admin Portal</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {NAV.map(({ href, label, icon: Icon, match }) => {
              const active = match(pathname);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`w-full min-w-0 flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                    active
                      ? "bg-[#EE7862] text-white shadow-md shadow-[#EE7862]/30"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-white/10 space-y-1">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="w-full min-w-0 flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              <Eye className="w-4 h-4 text-[#00F0ED] shrink-0" />
              <span className="truncate">View Website</span>
            </a>
            <button
              onClick={handleLogout}
              className="w-full min-w-0 flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-[#EE7862] hover:bg-white/10 transition-all"
            >
              <LogOut className="w-4 h-4 text-red-400 shrink-0" />
              <span className="truncate">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Mobile Top Header */}
        <header className="lg:hidden fixed top-0 inset-x-0 z-30 bg-[#081630] text-white px-3 py-2.5 flex items-center justify-between gap-2 shadow-md overflow-hidden">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="relative w-7 h-7 shrink-0">
              <Image src="/images/Icon 1.webp" alt="Logo" fill className="object-contain" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-[13px] leading-none text-white truncate">{currentNav.label}</h1>
              <p className="text-[9px] text-[#00F0ED] uppercase tracking-wider font-semibold mt-0.5">Admin Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200"
              title="View Site"
            >
              <Eye className="w-4 h-4 text-[#00F0ED]" />
            </a>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500/20 text-slate-200 hover:text-red-400"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#081630] border-t border-white/10 px-1 pt-1.5 pb-[max(0.4rem,env(safe-area-inset-bottom))] flex items-stretch justify-around text-white shadow-2xl overflow-hidden">
          {NAV.map(({ href, short, icon: Icon, match }) => {
            const active = match(pathname);
            return (
              <Link
                key={href}
                href={href}
                className={`flex-1 min-w-0 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
                  active
                    ? "bg-[#EE7862] text-white shadow-md shadow-[#EE7862]/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5 shrink-0" />
                <span className="text-[10px] font-bold tracking-tight truncate w-full text-center">{short}</span>
              </Link>
            );
          })}
        </nav>

        {/* Main Content Area */}
        <main className="lg:pl-56 pt-12 pb-[4.75rem] lg:pt-0 lg:pb-8 flex-1 min-h-screen min-w-0 max-w-full overflow-x-hidden">
          <div className="p-3 sm:p-5 lg:p-6 max-w-6xl mx-auto w-full min-w-0 overflow-x-hidden">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
