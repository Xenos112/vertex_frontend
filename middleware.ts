import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const authToken = (await cookies()).get("auth_token")?.value || null;

  if (authToken && ["/login", "/register"].includes(request.nextUrl.pathname))
    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: "/:path*",
};
