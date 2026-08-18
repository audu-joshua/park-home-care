import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  // Inbox notification is sent from the browser so FormSubmit sees the live site Origin.
  return NextResponse.json({ ok: true });
}
