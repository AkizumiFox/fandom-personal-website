import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--surface-border)] bg-[var(--header-bg)] backdrop-blur-md">
      <div className="container-shell">
        <div className="flex h-[76px] items-center justify-between gap-3 md:h-[84px]">
          <Link
            href="/"
            aria-label="秋墨首頁"
            className="flex shrink-0 items-center"
          >
            <Image
              src="/assets/branding/logo-main.png"
              alt="秋墨 Akizumi"
              width={192}
              height={90}
              priority
              className="h-[64px] w-auto object-contain md:h-[72px]"
            />
          </Link>

          <div className="flex min-w-0 items-center gap-2 md:gap-4">
            <NavLinks />
            <ThemeToggle className="shrink-0" />
          </div>
        </div>
      </div>
    </header>
  );
}
