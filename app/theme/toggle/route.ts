import { NextResponse, type NextRequest } from "next/server";

const STORAGE_KEY = "theme-mode";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export async function GET(request: NextRequest) {
  const modeParam = request.nextUrl.searchParams.get("mode");
  const redirectDisabled = request.nextUrl.searchParams.get("redirect") === "0";
  const currentTheme = request.cookies.get(STORAGE_KEY)?.value === "autumn-light" ? "autumn-light" : "autumn-dark";
  const nextTheme = modeParam === "autumn-dark" || modeParam === "autumn-light"
    ? modeParam
    : currentTheme === "autumn-dark"
      ? "autumn-light"
      : "autumn-dark";
  const referer = request.headers.get("referer");
  const redirectUrl = referer ? new URL(referer) : new URL("/", request.url);

  const response = redirectDisabled
    ? NextResponse.json({ ok: true, theme: nextTheme })
    : NextResponse.redirect(redirectUrl);
  response.cookies.set(STORAGE_KEY, nextTheme, {
    path: "/",
    maxAge: ONE_YEAR_SECONDS,
    sameSite: "lax"
  });

  return response;
}
