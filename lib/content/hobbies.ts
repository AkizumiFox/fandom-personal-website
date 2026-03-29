import { readFileSync } from "node:fs";
import { join } from "node:path";

type HobbiesData = {
  description?: string;
  items: string[];
};

const primaryHobbiesFile = join(process.cwd(), "content", "collections", "hobbies", "items.json");

function readHobbiesFile(filePath: string): HobbiesData {
  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as HobbiesData;
  } catch {
    return { description: "", items: [] };
  }
}

export function getHobbiesData(): HobbiesData {
  return readHobbiesFile(primaryHobbiesFile);
}

export function getHobbyItems(): string[] {
  return getHobbiesData().items;
}

export function getHobbyDescription(): string {
  return getHobbiesData().description ?? "";
}
