import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

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
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
