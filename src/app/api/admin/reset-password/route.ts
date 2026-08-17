import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { sendMail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { newPassword } = await req.json();
    if (!newPassword) return NextResponse.json({ ok: false, error: "missing newPassword" }, { status: 400 });

    // Update or create .env.local ADMIN_PASSWORD
    const envPath = path.resolve(process.cwd(), ".env.local");
    let content = "";
    try { content = fs.readFileSync(envPath, "utf8"); } catch (e) { content = ""; }
    const lines = content.split(/\r?\n/).filter(Boolean).filter(l => !l.startsWith("ADMIN_PASSWORD="));
    lines.push(`ADMIN_PASSWORD=${newPassword}`);
    fs.writeFileSync(envPath, lines.join("\n") + "\n");

    // Notify admin email
    const notify = process.env.NOTIFY_EMAIL || "packhomehealthcareagency@gmail.com";
    await sendMail({ to: notify, subject: "Admin password reset", html: `<p>Admin password was reset on ${new Date().toISOString()}</p>` });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}
