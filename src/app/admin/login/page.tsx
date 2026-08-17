"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { isAdminLoggedIn } from "@/lib/store";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdminLoggedIn()) router.replace("/admin");
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem("phh_admin_auth", "1");
        router.replace("/admin");
      } else {
        setError("Incorrect password. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      setError("Unexpected error. Try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040C1A] flex items-center justify-center px-4">
      {/* Background rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#00F0ED]/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-[#EE7862]/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative w-14 h-14">
              <Image src="/images/Icon 1.webp" alt="Pack Home Health Care Agency LLC" fill className="object-contain" />
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-[#00F0ED] text-xs font-bold uppercase tracking-widest mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Portal
            </div>
            <h1 className="font-serif text-2xl font-bold text-white">Pack Home Health Care</h1>
            <p className="text-slate-400 text-sm mt-1">Sign in to manage content</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPw ? "text" : "password"}
                  required
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-500 text-sm outline-none focus:border-[#EE7862] focus:ring-2 focus:ring-[#EE7862]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-[#EE7862] text-xs text-center bg-[#EE7862]/10 border border-[#EE7862]/20 rounded-xl py-2.5 px-4">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#EE7862] hover:bg-[#E4644D] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-sm cursor-pointer mt-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-slate-500 text-xs mt-6">
            <a href="/" className="hover:text-slate-300 transition-colors">← Back to website</a>
          </p>
        </div>
      </div>
    </div>
  );
}
