import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, service, message } = data;

    const to = process.env.CONTACT_EMAIL || "info@packhomehealthcareagency.com";
    const admin = process.env.NOTIFY_EMAIL || "packhomehealthcareagency@gmail.com";

    const html = `
      <h3>New consultation request</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Message:</strong></p>
      <div>${message}</div>
    `;

    await sendMail({ to: [to, admin], subject: `Consultation request from ${name}`, html });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}
