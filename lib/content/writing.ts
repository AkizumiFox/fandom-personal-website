import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

const primaryWritingDir = join(process.cwd(), "content", "collections", "writing");

const localeSuffixPattern = /\.(en|ja)\.mdx$/;

export type WritingEntry = {
  slug: string;
  title: string;
  excerpt?: string;
  tags: string[];
  body: string;
  publishedAt?: string;
};

function parseEntry(slug: string, fileName: string): WritingEntry {
  const source = readFileSync(join(primaryWritingDir, fileName), "utf8");
  const { data, content } = matter(source);
  return {
    slug,
    title: String(data.title ?? "Untitled"),
    excerpt: data.excerpt ? String(data.excerpt) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map((tag) => String(tag)) : [],
    body: content,
    publishedAt: data.publishedAt ? String(data.publishedAt) : undefined
  };
}

export function getWritingEntries(locale: Locale = defaultLocale): WritingEntry[] {
  const files = readdirSync(primaryWritingDir).filter((file) => file.endsWith(".mdx"));
  const fileSet = new Set(files);
  const baseSlugs = files
    .filter((file) => !localeSuffixPattern.test(file))
    .map((file) => file.replace(/\.mdx$/, ""));

  return baseSlugs
    .map((slug) => {
      const localizedName = `${slug}.${locale}.mdx`;
      const fileName = locale !== defaultLocale && fileSet.has(localizedName) ? localizedName : `${slug}.mdx`;
      return parseEntry(slug, fileName);
    })
    .sort((a, b) => {
      const dateA = a.publishedAt ? Date.parse(a.publishedAt) : NaN;
      const dateB = b.publishedAt ? Date.parse(b.publishedAt) : NaN;
      const hasDateA = !Number.isNaN(dateA);
      const hasDateB = !Number.isNaN(dateB);

      if (hasDateA && hasDateB) return dateB - dateA;
      if (hasDateA) return -1;
      if (hasDateB) return 1;
      return b.slug.localeCompare(a.slug, "zh-Hant");
    });
}

export function getWritingEntryBySlug(slug: string, locale: Locale = defaultLocale): WritingEntry | undefined {
  return getWritingEntries(locale).find((entry) => entry.slug === slug);
}
