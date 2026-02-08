import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const ml = url.searchParams.get("ml");

  // If token is present in the URL, store it in a cookie for later requests
  if (ml) {
    const res = NextResponse.next();
    res.cookies.set("ml", ml, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/prompt-v2/:path*", "/video/:path*"],
};
