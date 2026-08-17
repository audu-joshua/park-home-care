import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { sendMail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await getDb();
    const col = db.collection("applications");
    const doc = {
      firstName: body.firstName || "",
      lastName: body.lastName || "",
      email: body.email || "",
      phone: body.phone || "",
      position: body.position || "",
      message: body.message || "",
      createdAt: new Date(),
    };
    await col.insertOne(doc);
    // send notification email to careers inbox
    try {
      const to = process.env.CONTACT_EMAIL || process.env.NOTIFY_EMAIL || "info@packhomehealthcareagency.com";
      const html = `
        <h3>New Career Application</h3>
        <p><strong>Name:</strong> ${doc.firstName} ${doc.lastName}</p>
        <p><strong>Email:</strong> ${doc.email}</p>
        <p><strong>Phone:</strong> ${doc.phone}</p>
        <p><strong>Position:</strong> ${doc.position}</p>
        <p><strong>Message:</strong></p>
        <div>${doc.message}</div>
      `;
      await sendMail({ to, subject: `Job application: ${doc.position} — ${doc.firstName} ${doc.lastName}`, html });
    } catch (e) {
      // log and continue
      console.error('Failed to send application email', e);
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
