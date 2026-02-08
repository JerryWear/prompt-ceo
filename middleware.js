import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const ml = url.searchParams.get("ml");

  // Cookie size safety (4KB limits). If too large, don't set cookie.
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
