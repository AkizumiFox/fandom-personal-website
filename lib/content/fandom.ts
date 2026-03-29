import { readFileSync } from "node:fs";
import { join } from "node:path";
import { type FandomItem, fandomCategoryLabels } from "@/lib/content/fandom-shared";

const primaryFandomGalleryFile = join(process.cwd(), "content", "collections", "fandom", "gallery-items.json");

type FandomGalleryData = {
  description?: string;
  items: FandomItem[];
};

export { fandomCategoryLabels };
export type { FandomCategory, FandomItem } from "@/lib/content/fandom-shared";

function readGalleryFile(filePath: string): FandomGalleryData {
  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as FandomGalleryData;
  } catch {
    return { description: "", items: [] };
  }
}

export function getFandomGalleryData(): FandomGalleryData {
  return readGalleryFile(primaryFandomGalleryFile);
}

export function getFandomGalleryItems(): FandomItem[] {
  return getFandomGalleryData().items;
}

export function getFandomGalleryDescription(): string {
  return getFandomGalleryData().description ?? "";
}
