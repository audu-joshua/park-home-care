import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const col = db.collection("blogs");
    const rows = await col.find({}).sort({ date: -1 }).toArray();
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await getDb();
    const col = db.collection("blogs");
    if (body.id) {
      await col.updateOne({ id: body.id }, { $set: body }, { upsert: true });
      return NextResponse.json({ ok: true });
    }
    // ensure id exists
    body.id = body.id || Date.now().toString();
    await col.insertOne(body);
    return NextResponse.json({ ok: true, id: body.id });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
