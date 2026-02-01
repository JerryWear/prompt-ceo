import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  return NextResponse.json({ ok: true, message: "API route is alive" });
}
