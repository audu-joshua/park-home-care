import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { agencyInbox, sendAdminInboxNotice, sendViaResend, siteUrl } from "@/lib/mail";
import { buildApplicationConfirmHtml, buildInboxHtml } from "@/lib/inboxEmail";

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

    const applicantEmail = String(doc.email || "").trim();
    const name = `${doc.firstName} ${doc.lastName}`.trim() || "Applicant";
    const adminFields = {
      Applicant: name,
      Position: doc.position || "Not specified",
      Email: applicantEmail || "Not provided",
      Phone: doc.phone || "Not provided",
      Experience: doc.message || "No summary provided",
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
          html: buildApplicationConfirmHtml({ name, position: doc.position }),
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
    const byCustomId = await col.deleteOne({ id });
    if (byCustomId.deletedCount === 0 && ObjectId.isValid(id)) {
      await col.deleteOne({ _id: new ObjectId(id) });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
