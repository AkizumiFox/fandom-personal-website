import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { FoxFooter } from "@/components/layout/fox-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/content/data/site";
import tabIcon from "@/paws.png";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`
  },
  description: siteConfig.description,
  themeColor: "rgb(112, 100, 86)",
  icons: {
    icon: tabIcon.src,
    shortcut: tabIcon.src,
    apple: tabIcon.src
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeMode = cookieStore.get("theme-mode")?.value === "autumn-dark" ? "autumn-dark" : "autumn-light";

  return (
    <html lang="en" suppressHydrationWarning data-theme={themeMode}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <FoxFooter />
      </body>
    </html>
  );
}
