import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const expected = process.env.ADMIN_PASSWORD || "packadmin2026";
    if (password === expected) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}
