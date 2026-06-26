import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { FoxFooter } from "@/components/layout/fox-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { localeHtmlLang } from "@/lib/i18n/config";
import { getServerDictionary } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getServerDictionary();
  return {
    title: {
      default: dict.meta.title,
      template: `%s | ${dict.meta.title}`
    },
    description: dict.meta.description
  };
}

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
  const { locale, dict } = await getServerDictionary();

  return (
    <html lang={localeHtmlLang[locale]} suppressHydrationWarning data-theme={themeMode}>
      <body>
        <SiteHeader locale={locale} dict={dict} />
        <main>{children}</main>
        <FoxFooter dict={dict} />
      </body>
    </html>
  );
}
