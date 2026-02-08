import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const ml = url.searchParams.get("ml");

  // Only store token if it’s within safe cookie size range
  // (cookies have ~4KB limits; leave buffer for attributes)
  if (ml && ml.length < 3000) {
    const res = NextResponse.next();
    res.cookies.set("ml", ml, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/prompt-v2/:path*", "/video/:path*"],
};
