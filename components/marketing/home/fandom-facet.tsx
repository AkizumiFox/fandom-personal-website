"use client";

import Link from "next/link";
import type { FandomCategory, FandomItem } from "@/lib/content/fandom";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type FandomFacetProps = {
  fandomSelections: { category: string; label: string }[];
  fandomItems: readonly FandomItem[];
};

export function FandomFacet({ fandomSelections, fandomItems }: FandomFacetProps) {
  const router = useRouter();
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    if (fandomItems.length <= 1) return;
    const timer = window.setTimeout(() => {
      setFeaturedIndex(Math.floor(Math.random() * fandomItems.length));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [fandomItems.length]);

  const featuredItem = fandomItems[featuredIndex];

  return (
    <article id="fandom-facet" className="surface-panel scroll-mt-24 rounded-panel p-6">
      <p className="section-kicker">GALLERY</p>
      <h2 className="mt-2 text-2xl font-semibold">
        <Link href="/fandom/gallery" className="transition hover:text-accent">
          獸設 / 獸圖 / 毛裝
        </Link>
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {fandomSelections.map((item) => (
          <Link
            key={item.category}
            href={`/fandom/gallery?category=${item.category as FandomCategory}`}
            className="ui-chip text-sm text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </div>
      {featuredItem ? (
        <div className="surface-card mt-4 overflow-hidden rounded-xl">
          <button
            type="button"
            onClick={() => router.push(`/fandom/gallery?category=${featuredItem.category}`)}
            className="block w-full text-left"
            aria-label={`前往 ${featuredItem.title || "fandom"} 類別`}
          >
            <div className="relative h-44 w-full">
              <Image
                src={featuredItem.image}
                alt={featuredItem.title || "fandom featured"}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 45vw, 100vw"
              />
            </div>
            <div className="px-3 pb-1 pt-2">
              <p className="line-clamp-1 text-sm font-medium text-foreground">
                {featuredItem.title || "隨機展示作品"}
              </p>
            </div>
          </button>
          <div className="px-3 pb-2 text-right">
            {featuredItem.author ? (
              featuredItem.authorUrl ? (
                <a
                  href={featuredItem.authorUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-muted underline underline-offset-2 transition hover:text-foreground"
                >
                  {featuredItem.author}
                </a>
              ) : (
                <span className="text-xs text-muted">{featuredItem.author}</span>
              )
            ) : (
              <span className="text-xs text-muted">作者待補</span>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-1)] px-3 py-2 text-xs text-muted">
          尚無可展示作品
        </div>
      )}
    </article>
  );
}
