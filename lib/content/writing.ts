import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const primaryWritingDir = join(process.cwd(), "content", "collections", "writing");

export type WritingEntry = {
  slug: string;
  title: string;
  excerpt?: string;
  tags: string[];
  body: string;
  publishedAt?: string;
};

export function getWritingEntries(): WritingEntry[] {
  return readdirSync(primaryWritingDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const source = readFileSync(join(primaryWritingDir, file), "utf8");
      const { data, content } = matter(source);
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: String(data.title ?? "Untitled"),
        excerpt: data.excerpt ? String(data.excerpt) : undefined,
        tags: Array.isArray(data.tags) ? data.tags.map((tag) => String(tag)) : [],
        body: content,
        publishedAt: data.publishedAt ? String(data.publishedAt) : undefined
      };
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

export function getWritingEntryBySlug(slug: string): WritingEntry | undefined {
  return getWritingEntries().find((entry) => entry.slug === slug);
}
