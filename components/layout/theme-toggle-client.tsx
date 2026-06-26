"use client";

import { useState, type MouseEvent } from "react";

type ThemeToggleClientProps = {
  className?: string;
  initialIsDark: boolean;
  toLightLabel: string;
  toDarkLabel: string;
};

export function ThemeToggleClient({ className = "", initialIsDark, toLightLabel, toDarkLabel }: ThemeToggleClientProps) {
  const [isDark, setIsDark] = useState(initialIsDark);

  async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // Keep native link behavior for modified clicks/new-tab.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    const nextIsDark = !isDark;
    const nextTheme = nextIsDark ? "autumn-dark" : "autumn-light";
    setIsDark(nextIsDark);
    document.documentElement.dataset.theme = nextTheme;

    try {
      const response = await fetch(`/theme/toggle?mode=${nextTheme}&redirect=0`, {
        method: "GET",
        credentials: "same-origin",
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Theme persistence failed");
      }
    } catch {
      // Fallback to non-JS path if fetch fails for any reason.
      window.location.href = "/theme/toggle";
    }
  }

  return (
    <a
      href="/theme/toggle"
      onClick={handleClick}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200 ease-out ${isDark
        ? "border-[var(--surface-border)] bg-[var(--surface-2)] text-[var(--accent-soft)]"
        : "border-[var(--surface-border)] bg-[var(--surface-2)] text-[var(--brown)]"
      } hover:border-[var(--surface-border-strong)] ${className}`.trim()}
      aria-label={isDark ? toLightLabel : toDarkLabel}
      title={isDark ? toLightLabel : toDarkLabel}
    >
      {isDark ? (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 transition-transform duration-200 ease-out"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.2M12 19.3v2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 transition-transform duration-200 ease-out"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M21.3 14.9A9.2 9.2 0 0 1 9.1 2.7a.9.9 0 0 0-1.15 1.15 7.4 7.4 0 1 0 12.2 12.2.9.9 0 0 0 1.15-1.15Z" />
        </svg>
      )}
    </a>
  );
}
