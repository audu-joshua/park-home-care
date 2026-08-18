import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { sendMail, agencyInbox, AGENCY_EMAIL, siteUrl } from "@/lib/mail";

export const dynamic = "force-dynamic";

function serialize(doc: Record<string, unknown> & { _id?: ObjectId }) {
  const { _id, ...rest } = doc;
  const createdAt = rest.createdAt instanceof Date
    ? rest.createdAt.toISOString()
    : String(rest.createdAt ?? "");
  return {
    ...rest,
    id: (rest.id as string) || (_id ? String(_id) : ""),
    createdAt,
  };
}

export async function GET() {
  try {
    const db = await getDb();
    const rows = await db.collection("applications").find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(rows.map((row) => serialize(row as Record<string, unknown> & { _id?: ObjectId })));
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await getDb();
    const col = db.collection("applications");
    const doc = {
      id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`,
      firstName: body.firstName || "",
      lastName: body.lastName || "",
      email: body.email || "",
      phone: body.phone || "",
      position: body.position || "",
      message: body.message || "",
      createdAt: new Date(),
    };
    await col.insertOne(doc);

    const appUrl = siteUrl();
    const adminEmail = agencyInbox();
    const viewApplicationUrl = `${appUrl}/admin/login`;

    // 1. Send Notification Email to Admin
    try {
      const adminHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div style="background-color: #081630; padding: 24px; text-align: center; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 700;">Pack Home Health Care</h2>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #00F0ED; text-transform: uppercase; letter-spacing: 1px;">New Job Application Received</p>
          </div>
          <div style="padding: 28px; color: #1e293b;">
            <p style="font-size: 15px; margin-top: 0;">A new candidate has submitted an application for the <strong>${doc.position}</strong> position.</p>
            
            <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #f1f5f9;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 110px;">Applicant:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${doc.firstName} ${doc.lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Position:</td>
                  <td style="padding: 6px 0; color: #EE7862; font-weight: 700;">${doc.position}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Email:</td>
                  <td style="padding: 6px 0; color: #0f172a;"><a href="mailto:${doc.email}" style="color: #2563eb; text-decoration: none;">${doc.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Phone:</td>
                  <td style="padding: 6px 0; color: #0f172a;"><a href="tel:${doc.phone}" style="color: #2563eb; text-decoration: none;">${doc.phone}</a></td>
                </tr>
              </table>

              ${doc.message ? `
                <div style="margin-top: 14px; padding-top: 14px; border-t: 1px solid #e2e8f0;">
                  <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase;">Experience / Summary:</p>
                  <p style="margin: 0; font-size: 13px; color: #334155; line-height: 1.5; white-space: pre-wrap;">${doc.message}</p>
                </div>
              ` : ''}
            </div>

            <div style="text-align: center; margin-top: 28px;">
              <a href="${viewApplicationUrl}" style="display: inline-block; background-color: #EE7862; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 50px; box-shadow: 0 4px 12px rgba(238, 120, 98, 0.25);">
                View Application
              </a>
            </div>
          </div>
          <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #64748b;">
            © 2026 Pack Home Health Care Agency. All rights reserved.
          </div>
        </div>
      `;

      await sendMail({
        to: adminEmail,
        subject: `New Application: ${doc.position} - ${doc.firstName} ${doc.lastName}`,
        html: adminHtml,
        fields: {
          Applicant: `${doc.firstName} ${doc.lastName}`,
          Position: doc.position,
          Email: doc.email,
          Phone: doc.phone,
          Experience: doc.message || "No summary provided",
          "View Application": viewApplicationUrl,
        },
      });
    } catch (e) {
      console.error("Failed to send admin notification email:", e);
    }

    // 2. Send Acknowledgment Email to Applicant
    if (doc.email) {
      try {
        const applicantHtml = `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
            <div style="background-color: #081630; padding: 28px; text-align: center; color: #ffffff;">
              <h2 style="margin: 0; font-size: 22px; font-weight: 700;">Pack Home Health Care</h2>
              <p style="margin: 6px 0 0 0; font-size: 13px; color: #00F0ED; font-weight: 600;">Compassionate Care. Like Family.</p>
            </div>
            <div style="padding: 32px; color: #1e293b;">
              <h3 style="margin-top: 0; color: #081630; font-size: 18px;">Application Received!</h3>
              <p style="font-size: 14px; line-height: 1.6; color: #334155;">
                Hello <strong>${doc.firstName}</strong>,
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #334155;">
                Thank you for applying for the <strong>${doc.position}</strong> position at Pack Home Health Care. We appreciate your interest in joining our dedicated care team!
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #334155;">
                Our recruiting team is reviewing your application details. If your background aligns with our current openings, a care manager will reach out to you within 24 to 48 hours to discuss the next steps.
              </p>

              <div style="background-color: #FAF8F5; border-radius: 12px; padding: 18px; margin: 24px 0; border: 1px solid #f1f5f9;">
                <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; color: #081630; text-transform: uppercase;">Application Summary:</p>
                <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Position:</strong> ${doc.position}</p>
                <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Applicant Name:</strong> ${doc.firstName} ${doc.lastName}</p>
                <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Phone Number:</strong> ${doc.phone}</p>
              </div>

              <p style="font-size: 14px; line-height: 1.6; color: #334155;">
                If you have any immediate questions, feel free to reach us at <a href="mailto:${AGENCY_EMAIL}" style="color: #EE7862; text-decoration: none; font-weight: 600;">${AGENCY_EMAIL}</a> or call <a href="tel:+19175868217" style="color: #EE7862; text-decoration: none; font-weight: 600;">+1 (917) 586-8217</a>.
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
          to: doc.email,
          subject: `Application Received: ${doc.position} - Pack Home Health Care`,
          html: applicantHtml,
        });
      } catch (e) {
        console.error("Failed to send applicant confirmation email:", e);
      }
    }

    return NextResponse.json({ ok: true, id: doc.id }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
    const db = await getDb();
    const col = db.collection("applications");
    const byCustomId = await col.deleteOne({ id });
    if (byCustomId.deletedCount === 0 && ObjectId.isValid(id)) {
      await col.deleteOne({ _id: new ObjectId(id) });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
