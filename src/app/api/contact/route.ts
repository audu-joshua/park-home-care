import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, service, message } = data;

    const adminEmail = process.env.CONTACT_EMAIL || process.env.NOTIFY_EMAIL || "info@packhomehealthcareagency.com";

    // 1. Send Admin Notification Email
    try {
      const adminHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div style="background-color: #081630; padding: 24px; text-align: center; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 700;">Pack Home Health Care</h2>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #00F0ED; text-transform: uppercase; letter-spacing: 1px;">New Consultation Request</p>
          </div>
          <div style="padding: 28px; color: #1e293b;">
            <p style="font-size: 15px; margin-top: 0;">A new free consultation request has been submitted on the website.</p>
            
            <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #f1f5f9;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 110px;">Client Name:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${name || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Service Requested:</td>
                  <td style="padding: 6px 0; color: #EE7862; font-weight: 700;">${service || "General Inquiry"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Email Address:</td>
                  <td style="padding: 6px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Phone Number:</td>
                  <td style="padding: 6px 0; color: #0f172a;"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a></td>
                </tr>
              </table>

              ${message ? `
                <div style="margin-top: 14px; padding-top: 14px; border-t: 1px solid #e2e8f0;">
                  <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase;">Additional Notes / Details:</p>
                  <p style="margin: 0; font-size: 13px; color: #334155; line-height: 1.5; white-space: pre-wrap;">${message}</p>
                </div>
              ` : ''}
            </div>
          </div>
          <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #64748b;">
            © 2026 Pack Home Health Care Agency. All rights reserved.
          </div>
        </div>
      `;

      await sendMail({
        to: [adminEmail, "info@parkhomecare.com"],
        subject: `New Consultation Request: ${service || "General Inquiry"} — ${name}`,
        html: adminHtml,
      });
    } catch (e) {
      console.error("Failed to send admin consultation email:", e);
    }

    // 2. Send Client Acknowledgment Email
    if (email) {
      try {
        const clientHtml = `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
            <div style="background-color: #081630; padding: 28px; text-align: center; color: #ffffff;">
              <h2 style="margin: 0; font-size: 22px; font-weight: 700;">Pack Home Health Care</h2>
              <p style="margin: 6px 0 0 0; font-size: 13px; color: #00F0ED; font-weight: 600;">Compassionate Care. Like Family.</p>
            </div>
            <div style="padding: 32px; color: #1e293b;">
              <h3 style="margin-top: 0; color: #081630; font-size: 18px;">Consultation Request Received</h3>
              <p style="font-size: 14px; line-height: 1.6; color: #334155;">
                Hello <strong>${name}</strong>,
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #334155;">
                Thank you for requesting a free consultation regarding <strong>${service || "our home care services"}</strong> with Pack Home Health Care Agency LLC.
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #334155;">
                Our care coordinator is reviewing your inquiry and will contact you directly via phone or email within 24 hours to discuss your needs and answer any questions.
              </p>

              <div style="background-color: #FAF8F5; border-radius: 12px; padding: 18px; margin: 24px 0; border: 1px solid #f1f5f9;">
                <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; color: #081630; text-transform: uppercase;">Request Summary:</p>
                <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Client Name:</strong> ${name}</p>
                <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Service Requested:</strong> ${service || "General Inquiry"}</p>
                <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Phone Number:</strong> ${phone}</p>
              </div>

              <p style="font-size: 14px; line-height: 1.6; color: #334155;">
                Need immediate assistance? Feel free to call us at <a href="tel:+19175868217" style="color: #EE7862; text-decoration: none; font-weight: 600;">+1 (917) 586-8217</a> or email <a href="mailto:info@packhomehealthcareagency.com" style="color: #EE7862; text-decoration: none; font-weight: 600;">info@packhomehealthcareagency.com</a>.
              </p>

              <p style="font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 0;">
                Warm regards,<br />
                <strong>Pack Home Health Care Team</strong>
              </p>
            </div>
            <div style="background-color: #081630; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8;">
              1312 Forestford Court, Raleigh NC 27610 · +1 (917) 586-8217
            </div>
          </div>
        `;

        await sendMail({
          to: email,
          subject: `Consultation Request Received — Pack Home Health Care`,
          html: clientHtml,
        });
      } catch (e) {
        console.error("Failed to send client consultation acknowledgment email:", e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}
