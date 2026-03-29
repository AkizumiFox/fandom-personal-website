import { readFileSync } from "node:fs";
import { join } from "node:path";

export type SocialLink = { label: string; href: string };

type SocialData = {
  description?: string;
  links: SocialLink[];
};

const primarySocialFile = join(process.cwd(), "content", "collections", "social", "links.json");

function readSocialFile(filePath: string): SocialData {
  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as SocialData;
  } catch {
    return { description: "", links: [] };
  }
}

export function getSocialData(): SocialData {
  return readSocialFile(primarySocialFile);
}

export function getSocialLinks(): SocialLink[] {
  return getSocialData().links;
}

export function getSocialDescription(): string {
  return getSocialData().description ?? "";
}
