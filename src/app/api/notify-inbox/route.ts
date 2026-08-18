import { NextResponse } from "next/server";
import { agencyInbox, sendViaResend } from "@/lib/mail";
import { buildInboxHtml } from "@/lib/inboxEmail";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      subject?: string;
      fields?: Record<string, string>;
    };
    const subject = String(body.subject || "").trim();
    const fields = body.fields && typeof body.fields === "object" ? body.fields : null;
    if (!subject || !fields) {
      return NextResponse.json({ ok: false, error: "Missing subject or fields" }, { status: 400 });
    }

    const sent = await sendViaResend({
      to: [agencyInbox()],
      subject,
      html: buildInboxHtml(subject, fields),
      replyTo: fields.Email || fields.email,
    });

    if (!sent) {
      return NextResponse.json({ ok: false, fallback: true }, { status: 501 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
