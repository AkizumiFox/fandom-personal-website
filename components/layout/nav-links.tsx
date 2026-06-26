"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

type NavLinksProps = {
  dict: Dictionary;
};

const navItems = [
  { key: "fandom", href: "/fandom/gallery" },
  { key: "bookshelf", href: "/bookshelf" },
  { key: "hobbies", href: "/hobbies" },
  { key: "social", href: "/social" },
  { key: "writing", href: "/writing" }
] as const;

export function NavLinks({ dict }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 overflow-x-auto whitespace-nowrap text-base md:gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 transition-colors duration-200",
              isActive
                ? "bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-foreground"
                : "text-muted hover:bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] hover:text-foreground"
            )}
          >
            {dict.nav[item.key]}
          </Link>
        );
      })}
    </nav>
  );
}
