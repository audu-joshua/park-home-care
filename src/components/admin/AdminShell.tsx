"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FileText, Briefcase, Users, LogOut, Eye, Menu, X } from "lucide-react";
import { adminLogout, isAdminLoggedIn } from "@/lib/store";

const NAV = [
  { href: "/admin", label: "Blog Posts", short: "Blogs", icon: FileText, match: (path: string) => path === "/admin" },
  { href: "/admin/jobs", label: "Job Openings", short: "Jobs", icon: Briefcase, match: (path: string) => path.startsWith("/admin/jobs") },
  { href: "/admin/applications", label: "Applications", short: "Applications", icon: Users, match: (path: string) => path.startsWith("/admin/applications") },
] as const;

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

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

  const currentNav = NAV.find((n) => n.match(pathname)) || NAV[0];

  return (
    <>
      <style>{`
        .field-label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #475569; margin-bottom: 6px; }
        .field { width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 14px; color: #1e293b; outline: none; transition: border-color .15s, box-shadow .15s; background-color: #ffffff; }
        .field:focus { border-color: #EE7862; box-shadow: 0 0 0 3px rgba(238,120,98,.15); }
        .btn-primary { background: #EE7862; color: #fff; font-size: 13.5px; font-weight: 600; padding: 10px 20px; border-radius: 10px; cursor: pointer; transition: background .2s, transform .1s; display: inline-flex; align-items: center; justify-content: center; gap: 6px; border: none; }
        .btn-primary:hover { background: #E4644D; }
        .btn-primary:active { transform: scale(0.98); }
        .btn-ghost { background: #f1f5f9; color: #475569; font-size: 13.5px; font-weight: 600; padding: 10px 20px; border-radius: 10px; cursor: pointer; transition: background .2s; border: none; display: inline-flex; align-items: center; justify-content: center; gap: 6px; }
        .btn-ghost:hover { background: #e2e8f0; }
      `}</style>

      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        {/* Desktop Fixed Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#081630] text-white fixed inset-y-0 left-0 z-40 overflow-y-auto shadow-2xl">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 shrink-0">
                <Image src="/images/Icon 1.webp" alt="Logo" fill className="object-contain" />
              </div>
              <div>
                <p className="font-bold text-sm leading-tight text-white">Pack Home Health</p>
                <p className="text-[10px] text-[#00F0ED] uppercase tracking-wider font-semibold">Admin Portal</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1.5">
            {NAV.map(({ href, label, icon: Icon, match }) => {
              const active = match(pathname);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? "bg-[#EE7862] text-white shadow-md shadow-[#EE7862]/30"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10 space-y-1.5">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              <Eye className="w-4 h-4 text-[#00F0ED]" />
              View Main Website
            </a>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-[#EE7862] hover:bg-white/10 transition-all"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Mobile Top Header (Phone Screens) */}
        <header className="lg:hidden fixed top-0 inset-x-0 z-30 bg-[#081630] text-white px-4 py-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-8 h-8 shrink-0">
              <Image src="/images/Icon 1.webp" alt="Logo" fill className="object-contain" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-sm leading-none text-white truncate">{currentNav.label}</h1>
              <p className="text-[10px] text-[#00F0ED] uppercase tracking-wider font-semibold">Admin Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200"
              title="View Site"
            >
              <Eye className="w-4 h-4 text-[#00F0ED]" />
            </a>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-white/10 hover:bg-red-500/20 text-slate-200 hover:text-red-400"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Mobile Bottom Navigation Bar (Phone Screens - One Tap Navigation) */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#081630] border-t border-white/10 px-2 py-2 flex items-center justify-around text-white shadow-2xl">
          {NAV.map(({ href, short, icon: Icon, match }) => {
            const active = match(pathname);
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
                  active
                    ? "bg-[#EE7862] text-white shadow-md shadow-[#EE7862]/30 scale-105"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[11px] font-bold tracking-tight">{short}</span>
              </Link>
            );
          })}
        </nav>

        {/* Main Content Area */}
        <main className="lg:pl-64 pt-16 pb-24 lg:pt-0 lg:pb-10 flex-1 min-h-screen">
          <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </>
  );
}
