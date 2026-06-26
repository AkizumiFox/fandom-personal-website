import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, LOCALE_MAX_AGE_SECONDS, normalizeLocale } from "@/lib/i18n/config";

export async function GET(request: NextRequest) {
  const nextLocale = normalizeLocale(request.nextUrl.searchParams.get("locale"));
  const referer = request.headers.get("referer");
  const redirectUrl = referer ? new URL(referer) : new URL("/", request.url);

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set(LOCALE_COOKIE, nextLocale, {
    path: "/",
    maxAge: LOCALE_MAX_AGE_SECONDS,
    sameSite: "lax"
  });

  return response;
}
