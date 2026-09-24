import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { agencyInbox, sendAdminInboxNotice, sendViaResend, siteUrl } from "@/lib/mail";
import { buildApplicationConfirmHtml, buildInboxHtml } from "@/lib/inboxEmail";
import { deleteResume, getResumeDownloadUrl, getResumeViewUrl, uploadResume } from "@/lib/r2";

export const dynamic = "force-dynamic";

function serialize(doc: Record<string, unknown> & { _id?: ObjectId }): Record<string, unknown> & { id: string; createdAt: string } {
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
    const applications = await Promise.all(rows.map(async (row) => {
      const application = serialize(row as Record<string, unknown> & { _id?: ObjectId });
      if (typeof application.resumeKey === "string" && application.resumeKey) {
        try {
          application.resumeDownloadUrl = await getResumeDownloadUrl(
            application.resumeKey,
            String(application.resumeName || "resume"),
          );
          application.resumeViewUrl = await getResumeViewUrl(
            application.resumeKey,
            String(application.resumeName || "resume"),
          );
        } catch (err) {
          console.error("Resume download URL generation failed:", err);
        }
      }
      return application;
    }));
    return NextResponse.json(applications);
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("resume");
    if (!(file instanceof File) || !file.size) {
      return NextResponse.json({ ok: false, error: "Resume is required" }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ ok: false, error: "Resume must be smaller than 5MB" }, { status: 400 });
    }

    const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const resumeKey = `applications/${id}/${safeName || "resume"}`;
    await uploadResume(resumeKey, new Uint8Array(await file.arrayBuffer()), file.type || "application/octet-stream");

    const db = await getDb();
    const col = db.collection("applications");
    const consent = form.get("backgroundCheckConsent") === "true";
    const doc = {
      id,
      firstName: String(form.get("firstName") || ""),
      lastName: String(form.get("lastName") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      position: String(form.get("position") || ""),
      message: String(form.get("message") || ""),
      referee1Name: String(form.get("referee1Name") || ""),
      referee1Business: String(form.get("referee1Business") || ""),
      referee1Phone: String(form.get("referee1Phone") || ""),
      referee2Name: String(form.get("referee2Name") || ""),
      referee2Business: String(form.get("referee2Business") || ""),
      referee2Phone: String(form.get("referee2Phone") || ""),
      backgroundCheckConsent: consent,
      backgroundCheckConsentAt: consent ? new Date() : null,
      resumeName: file.name || "resume",
      resumeKey,
      createdAt: new Date(),
    };
    await col.insertOne(doc);

    const applicantEmail = String(doc.email || "").trim();
    const name = `${doc.firstName} ${doc.lastName}`.trim() || "Applicant";
    const adminFields = {
      Applicant: name,
      Position: doc.position || "Not specified",
      Email: applicantEmail || "Not provided",
      Phone: doc.phone || "Not provided",
      Experience: doc.message || "No summary provided",
      "Background Check Consent": consent ? "Yes" : "No",
      Resume: doc.resumeName || "No resume uploaded",
      "View Application": `${siteUrl()}/admin/login`,
    };
    const adminSubject = `New Application: ${doc.position} - ${name}`;

    try {
      await sendAdminInboxNotice({
        subject: adminSubject,
        html: buildInboxHtml(adminSubject, adminFields),
        fields: adminFields,
        replyTo: applicantEmail.includes("@") ? applicantEmail : undefined,
      });
    } catch (mailErr) {
      console.error("Admin application notice failed:", mailErr);
    }

    if (applicantEmail.includes("@")) {
      try {
        await sendViaResend({
          to: [applicantEmail],
          subject: "We received your application — Pack Home Health Care",
          html: buildApplicationConfirmHtml({
            name,
            position: doc.position,
            backgroundCheckUrl: `${siteUrl()}/packhome_Background_Check.pdf`,
            returnDays: 3,
          }),
          replyTo: agencyInbox(),
        });
      } catch (mailErr) {
        console.error("Applicant confirmation failed:", mailErr);
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
    const existing = await col.findOne({ $or: [{ id }, ...(ObjectId.isValid(id) ? [{ _id: new ObjectId(id) }] : [])] });
    const byCustomId = await col.deleteOne({ id });
    if (byCustomId.deletedCount === 0 && ObjectId.isValid(id)) {
      await col.deleteOne({ _id: new ObjectId(id) });
    }
    if (existing?.resumeKey) {
      try {
        await deleteResume(String(existing.resumeKey));
      } catch (err) {
        console.error("Resume deletion failed:", err);
      }
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
