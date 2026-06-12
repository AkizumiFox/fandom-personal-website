"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/content/data/nav";
import { cn } from "@/lib/utils";

export function NavLinks() {
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
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
