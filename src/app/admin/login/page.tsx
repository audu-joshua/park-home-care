"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, KeyRound, ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { isAdminLoggedIn, adminLogin } from "@/lib/store";

type Mode = "login" | "reset-request" | "reset-confirm";

export default function AdminLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdminLoggedIn()) router.replace("/admin");
  }, [router]);

  const resetState = () => {
    setError("");
    setSuccessMsg("");
    setOtp("");
    setNewPassword("");
  };

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        adminLogin(email);
        router.replace("/admin");
      } else {
        setError(data.error || "Incorrect email or password. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Unexpected network error. Please try again.");
      setLoading(false);
    }
  };

  // ── STEP 1: REQUEST OTP ────────────────────────────────────────────────────
  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSuccessMsg(
          "If that email is registered, a 6-digit code has been sent to it. Check your inbox."
        );
        setMode("reset-confirm");
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Unexpected network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── STEP 2: SUBMIT OTP + NEW PASSWORD ─────────────────────────────────────
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      const res = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSuccessMsg("Password successfully reset! You can now sign in with your new password.");
        setMode("login");
        setPassword(newPassword);
      } else {
        setError(data.error || "Failed to reset password. Please check the code and try again.");
      }
    } catch {
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040C1A] flex items-center justify-center px-4 py-12 relative overflow-x-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#00F0ED]/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-[#EE7862]/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative w-14 h-14">
              <Image src="/images/Icon 1.webp" alt="Pack Home Health Care Agency LLC" fill className="object-contain" />
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 text-[#00F0ED] text-xs font-bold uppercase tracking-widest mb-1.5">
              <ShieldCheck className="w-4 h-4" />
              Admin Portal
            </div>
            <h1 className="font-serif text-2xl font-bold text-white">Pack Home Health Care</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {mode === "login"
                ? "Sign in to access your administrative dashboard"
                : mode === "reset-request"
                ? "Enter your admin email to receive a reset code"
                : "Enter the code from your email and choose a new password"}
            </p>
          </div>

          {/* Success banner */}
          {successMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Error banner */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs text-center">
              {error}
            </div>
          )}

          {/* ── LOGIN FORM ── */}
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your admin email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-500 text-sm outline-none focus:border-[#EE7862] focus:ring-2 focus:ring-[#EE7862]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setMode("reset-request"); resetState(); }}
                    className="text-xs text-[#EE7862] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPw ? "text" : "password"}
                    required
                    placeholder="Enter password"
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#EE7862] hover:bg-[#E4644D] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 text-sm cursor-pointer mt-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Sign In to Portal"
                )}
              </button>
            </form>
          )}

          {/* ── STEP 1: REQUEST RESET CODE ── */}
          {mode === "reset-request" && (
            <form onSubmit={handleRequestReset} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Your Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your admin email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-500 text-sm outline-none focus:border-[#EE7862] focus:ring-2 focus:ring-[#EE7862]/20 transition-all"
                  />
                </div>
                <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
                  A 6-digit code will be sent to this address. You must have access to the inbox to continue.
                </p>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#EE7862] hover:bg-[#E4644D] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><Send className="w-4 h-4" /> Send Reset Code</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => { setMode("login"); resetState(); }}
                  className="px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-semibold text-sm transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ── STEP 2: ENTER CODE + NEW PASSWORD ── */}
          {mode === "reset-confirm" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  6-Digit Reset Code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    placeholder="Enter the code from your email"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-500 text-sm outline-none focus:border-[#EE7862] focus:ring-2 focus:ring-[#EE7862]/20 transition-all tracking-widest font-mono text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPw ? "text" : "password"}
                    required
                    minLength={6}
                    placeholder="Choose a new password (min 6 chars)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#EE7862] hover:bg-[#E4644D] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Set New Password"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => { setMode("reset-request"); resetState(); }}
                  className="px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-semibold text-sm transition-all"
                  title="Back — resend code"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          <div className="text-center text-slate-500 text-xs mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-center sm:justify-between gap-2">
            <a href="/" className="hover:text-slate-300 transition-colors">← Back to website</a>
            <span className="text-[10px] text-slate-600">Pack Home Health Agency</span>
          </div>
        </div>
      </div>
    </div>
  );
}
