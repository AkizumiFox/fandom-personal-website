import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const primaryWorksDir = join(process.cwd(), "content", "collections", "bookshelf");

export type BookshelfEntry = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
};

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function normalizeSlug(value: string) {
  return safeDecode(value).normalize("NFC");
}

function titleFromFilename(filename: string) {
  const base = filename.replace(/\.md$/i, "");
  return base.replace(/^\d+[_-]?/, "");
}

function excerptFromBody(body: string) {
  const lines = body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#") && !line.startsWith(">"));
  return lines[0] ?? "（尚無摘要）";
}

export function getBookshelfEntries(): BookshelfEntry[] {
  return readdirSync(primaryWorksDir)
    .filter((file) => file.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b, "zh-Hant"))
    .map((file) => {
      const body = readFileSync(join(primaryWorksDir, file), "utf8");
      const slug = file.replace(/\.md$/i, "");
      return {
        slug,
        title: titleFromFilename(file),
        excerpt: excerptFromBody(body),
        body
      };
    });
}

export function getBookshelfEntryBySlug(slug: string): BookshelfEntry | undefined {
  const target = normalizeSlug(slug);
  return getBookshelfEntries().find((entry) => {
    const entrySlug = normalizeSlug(entry.slug);
    return entrySlug === target || encodeURIComponent(entry.slug) === slug;
  });
}
