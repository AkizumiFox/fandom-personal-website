export const locales = ["zh", "en", "ja"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh";

export const LOCALE_COOKIE = "locale";

export const LOCALE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export const localeHtmlLang: Record<Locale, string> = {
  zh: "zh-Hant",
  en: "en",
  ja: "ja"
};

export const localeLabels: Record<Locale, string> = {
  zh: "中文",
  en: "English",
  ja: "日本語"
};

export const localeShortLabels: Record<Locale, string> = {
  zh: "中",
  en: "EN",
  ja: "日"
};

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "zh" || value === "en" || value === "ja";
}

export function normalizeLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : defaultLocale;
}

/** Replace {name} style placeholders in a template string. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match
  );
}
