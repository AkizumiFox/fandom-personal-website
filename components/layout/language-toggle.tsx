"use client";

import { useEffect, useRef, useState } from "react";
import { locales, localeLabels, localeShortLabels, type Locale } from "@/lib/i18n/config";

type LanguageToggleProps = {
  locale: Locale;
  switchLabel: string;
  className?: string;
};

export function LanguageToggle({ locale, switchLabel, className = "" }: LanguageToggleProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function selectLocale(next: Locale) {
    if (next === locale) {
      setOpen(false);
      return;
    }
    window.location.assign(`/locale/set?locale=${next}`);
  }

  return (
    <div ref={rootRef} className={`relative ${className}`.trim()}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--surface-border)] bg-[var(--surface-2)] px-3 text-sm text-[var(--accent-soft)] transition-colors duration-200 ease-out hover:border-[var(--surface-border-strong)]"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={switchLabel}
        title={switchLabel}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
        </svg>
        <span className="font-medium">{localeShortLabels[locale]}</span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 min-w-[8rem] overflow-hidden rounded-xl border border-[var(--surface-border)] bg-[var(--surface-2)] py-1 shadow-lg"
        >
          {locales.map((option) => (
            <button
              key={option}
              type="button"
              role="menuitemradio"
              aria-checked={option === locale}
              onClick={() => selectLocale(option)}
              className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${
                option === locale
                  ? "bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-foreground"
                  : "text-muted hover:bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] hover:text-foreground"
              }`}
            >
              <span>{localeLabels[option]}</span>
              {option === locale ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
