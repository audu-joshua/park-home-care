import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { sendMail } from "@/lib/mail";

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
      console.error("Failed to send application email", e);
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
