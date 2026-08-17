import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { sendMail } from "@/lib/mail";

export const dynamic = "force-dynamic";

const ALLOWED_EMAILS = [
  "support@audujoshua.com",
  "info@packhomehealthcareagency.com",
];

export async function POST(req: Request) {
  try {
    const { email, otp, newPassword } = await req.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json({ ok: false, error: "Email, reset code, and new password are required" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ ok: false, error: "Password must be at least 6 characters long" }, { status: 400 });
    }

    const normEmail = email.trim().toLowerCase();

    if (!ALLOWED_EMAILS.includes(normEmail)) {
      return NextResponse.json({ ok: false, error: "Unauthorized email address" }, { status: 403 });
    }

    // Validate OTP from MongoDB
    const db = await getDb();
    const tokenDoc = await db.collection("admin_reset_tokens").findOne({ email: normEmail });

    if (!tokenDoc) {
      return NextResponse.json({ ok: false, error: "No reset code found. Please request a new one." }, { status: 400 });
    }

    if (tokenDoc.used) {
      return NextResponse.json({ ok: false, error: "This reset code has already been used. Please request a new one." }, { status: 400 });
    }

    if (new Date() > new Date(tokenDoc.expiresAt)) {
      return NextResponse.json({ ok: false, error: "Reset code has expired. Please request a new one." }, { status: 400 });
    }

    if (tokenDoc.otp !== otp.trim()) {
      return NextResponse.json({ ok: false, error: "Invalid reset code. Please check your email and try again." }, { status: 400 });
    }

    // Mark token as used
    await db.collection("admin_reset_tokens").updateOne(
      { email: normEmail },
      { $set: { used: true } }
    );

    // Update password in MongoDB
    await db.collection("admin_users").updateOne(
      { email: normEmail },
      { $set: { email: normEmail, password: newPassword, updatedAt: new Date() } },
      { upsert: true }
    );

    // Send success confirmation email
    try {
      const html = `
        <div style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;max-width:550px;margin:0 auto;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
          <div style="background-color:#081630;padding:24px;text-align:center;color:#ffffff;">
            <h2 style="margin:0;font-size:20px;font-weight:700;">Pack Home Health Care</h2>
            <p style="margin:4px 0 0 0;font-size:12px;color:#00F0ED;text-transform:uppercase;letter-spacing:1px;">Admin Security Notice</p>
          </div>
          <div style="padding:28px;color:#1e293b;">
            <h3 style="margin-top:0;color:#081630;font-size:17px;">Password Successfully Changed</h3>
            <p style="font-size:14px;line-height:1.6;color:#334155;">
              The password for admin account <strong>${normEmail}</strong> was successfully updated on ${new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}.
            </p>
            <p style="font-size:13px;color:#64748b;line-height:1.5;">
              If you did not perform this reset, please contact <a href="mailto:support@audujoshua.com" style="color:#EE7862;">support@audujoshua.com</a> immediately.
            </p>
          </div>
          <div style="background-color:#f1f5f9;padding:16px;text-align:center;font-size:11px;color:#64748b;">
            &copy; ${new Date().getFullYear()} Pack Home Health Care Agency LLC. All rights reserved.
          </div>
        </div>
      `;
      await sendMail({ to: normEmail, subject: "Pack Home Health Admin — Password Changed Successfully", html });
    } catch (e) {
      console.error("Failed to send reset confirmation email:", e);
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}
