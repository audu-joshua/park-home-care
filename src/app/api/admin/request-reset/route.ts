import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { sendMail, agencyInbox } from "@/lib/mail";

export const dynamic = "force-dynamic";

const ALLOWED_EMAILS = [
  "support@audujoshua.com",
  "info@packhomehealthcareagency.com",
];

function generateOTP(): string {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  return otp;
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const normEmail = email.trim().toLowerCase();

    // Reject unauthorised emails immediately -- no silent fallthrough
    if (!ALLOWED_EMAILS.includes(normEmail)) {
      return NextResponse.json(
        { ok: false, error: "That email is not registered as an admin account." },
        { status: 403 }
      );
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    const db = await getDb();
    await db.collection("admin_reset_tokens").updateOne(
      { email: normEmail },
      {
        $set: {
          email: normEmail,
          otp,
          expiresAt,
          used: false,
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    const year = new Date().getFullYear();

    const html = [
      '<div style="font-family:\'Segoe UI\',Tahoma,Geneva,Verdana,sans-serif;max-width:520px;margin:0 auto;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">',
      '<div style="background-color:#081630;padding:24px;text-align:center;color:#ffffff;">',
      '<h2 style="margin:0;font-size:20px;font-weight:700;">Pack Home Health Care</h2>',
      '<p style="margin:4px 0 0 0;font-size:12px;color:#00F0ED;text-transform:uppercase;letter-spacing:1px;">Admin Password Reset</p>',
      "</div>",
      '<div style="padding:32px;color:#1e293b;">',
      '<h3 style="margin-top:0;color:#081630;font-size:17px;">Your One-Time Reset Code</h3>',
      '<p style="font-size:14px;line-height:1.6;color:#334155;">',
      "A password reset was requested for this admin account. Enter the 6-digit code below within <strong>15 minutes</strong>.",
      "</p>",
      '<div style="margin:24px 0;text-align:center;">',
      '<div style="display:inline-block;background-color:#f1f5f9;border:2px dashed #cbd5e1;border-radius:14px;padding:18px 36px;">',
      `<span style="font-size:36px;font-weight:800;letter-spacing:10px;color:#081630;font-family:'Courier New',monospace;">${otp}</span>`,
      "</div>",
      "</div>",
      '<p style="font-size:13px;color:#64748b;line-height:1.5;">',
      "If you did not request this reset, you can safely ignore this email. Your password will not change.",
      "</p>",
      "</div>",
      `<div style="background-color:#f1f5f9;padding:16px;text-align:center;font-size:11px;color:#64748b;">`,
      `&copy; ${year} Pack Home Health Care Agency LLC. All rights reserved.`,
      "</div>",
      "</div>",
    ].join("");

    const inbox = agencyInbox();
    const recipients = Array.from(new Set([inbox, normEmail]));

    await sendMail({
      to: recipients,
      subject: "Pack Home Health Admin - Password Reset Code",
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("request-reset error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
