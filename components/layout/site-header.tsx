import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/content/data/nav";
import { SectionShell } from "./section-shell";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--surface-border)] bg-[var(--surface-2)]/90 backdrop-blur-sm">
      <SectionShell className="py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="group inline-flex items-center" aria-label="秋墨首頁">
            <Image
              src="/assets/branding/logo-main.png"
              alt="秋墨"
              width={192}
              height={90}
              className="h-[4.5rem] w-auto object-contain transition duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.03] md:h-20"
              priority
            />
          </Link>
          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:gap-3">
            <nav className="flex w-full flex-wrap items-center gap-2 text-xs text-[var(--hero-chip-text)] md:w-auto md:justify-center">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="ui-chip"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex w-full justify-end md:w-auto">
              <ThemeToggle className="shrink-0" />
            </div>
          </div>
        </div>
      </SectionShell>
    </header>
  );
}
