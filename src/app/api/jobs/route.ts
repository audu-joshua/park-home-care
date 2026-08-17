import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

function clean(doc: Record<string, unknown>) {
  const { _id, ...rest } = doc;
  void _id;
  return rest;
}

export async function GET() {
  try {
    const db = await getDb();
    const rows = await db
      .collection("jobs")
      .find({}, { projection: { _id: 0 } })
      .sort({ posted: -1 })
      .toArray();
    return NextResponse.json(rows.map((row) => clean(row as Record<string, unknown>)));
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { _id, ...doc } = body as Record<string, unknown> & { _id?: unknown };
    void _id;
    if (!doc.id) doc.id = Date.now().toString();
    const db = await getDb();
    await db.collection("jobs").updateOne({ id: doc.id }, { $set: doc }, { upsert: true });
    return NextResponse.json({ ok: true, id: doc.id });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
    const db = await getDb();
    await db.collection("jobs").deleteOne({ id });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
