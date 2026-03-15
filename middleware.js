import { NextResponse } from "next/server";

export function middleware(_req) {
  return NextResponse.next();
}

// IMPORTANT: Disable all matching so middleware runs for nothing
export const config = {
  matcher: [],
};
