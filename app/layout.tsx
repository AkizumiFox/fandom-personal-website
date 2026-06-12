import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { FoxFooter } from "@/components/layout/fox-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/content/data/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`
  },
  description: siteConfig.description
};

export const viewport: Viewport = {
  themeColor: "#12100e"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeMode = cookieStore.get("theme-mode")?.value === "autumn-light" ? "autumn-light" : "autumn-dark";

  return (
    <html lang="zh-Hant" suppressHydrationWarning data-theme={themeMode}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <FoxFooter />
      </body>
    </html>
  );
}
