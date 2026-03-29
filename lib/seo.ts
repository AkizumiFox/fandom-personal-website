import type { Metadata } from "next";
import { siteConfig } from "@/content/data/site";

export function buildMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.title}`,
      description,
      type: "website"
    }
  };
}
