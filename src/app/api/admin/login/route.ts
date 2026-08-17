import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const DEFAULT_ADMINS: Record<string, string> = {
  "support@audujoshua.com": "Packhome123...",
  "info@packhomehealthcareagency.com": "Packhome123...",
};

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!password) {
      return NextResponse.json({ ok: false, error: "Password is required" }, { status: 400 });
    }

    const normEmail = (email || "").trim().toLowerCase();

    // Check MongoDB for custom updated password
    try {
      const db = await getDb();
      const user = await db.collection("admin_users").findOne({ email: normEmail });
      if (user) {
        if (user.password === password) {
          return NextResponse.json({ ok: true, email: normEmail });
        } else {
          return NextResponse.json({ ok: false, error: "Incorrect email or password" }, { status: 401 });
        }
      }
    } catch (e) {
      console.warn("MongoDB check failed, falling back to default seed credentials", e);
    }

    // Fallback to seed accounts
    const expectedPassword = DEFAULT_ADMINS[normEmail];
    if (expectedPassword && password === expectedPassword) {
      return NextResponse.json({ ok: true, email: normEmail });
    }

    // Also support fallback single password for backwards compatibility if email not matched
    const legacyPass = process.env.ADMIN_PASSWORD || "Packhome123...";
    if (password === legacyPass && (normEmail === "support@audujoshua.com" || normEmail === "info@packhomehealthcareagency.com" || !normEmail)) {
      return NextResponse.json({ ok: true, email: normEmail || "info@packhomehealthcareagency.com" });
    }

    return NextResponse.json({ ok: false, error: "Incorrect email or password" }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}
