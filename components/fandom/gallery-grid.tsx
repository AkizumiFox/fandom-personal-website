"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { FandomItem } from "@/lib/content/fandom-shared";
import { fandomCategoryLabels } from "@/lib/content/fandom-shared";

type GalleryGridProps = {
  items: readonly FandomItem[];
};

function GalleryImage({ item }: { item: FandomItem }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className={`block ${loaded ? "" : "skeleton aspect-square"}`}>
      <Image
        src={item.image}
        alt={item.title || "fandom image"}
        width={1200}
        height={1200}
        onLoad={() => setLoaded(true)}
        className={`block h-auto w-full transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = useMemo(
    () => (activeIndex === null ? null : items[activeIndex] ?? null),
    [activeIndex, items]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <>
      <div className="mt-8 columns-1 gap-4 md:columns-2 xl:columns-3">
        {items.map((item, index) => (
          <article
            key={item.id}
            id={`gallery-item-${item.id}`}
            className="surface-card mb-4 scroll-mt-28 break-inside-avoid rounded-card p-3"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="block w-full overflow-hidden rounded-xl border border-[var(--surface-border)] bg-[var(--surface-2)]"
              aria-label={`開啟圖片 ${item.title || item.id}`}
            >
              <GalleryImage item={item} />
            </button>
            <p className="mt-3 text-xs text-muted">{fandomCategoryLabels[item.category]}</p>
            {item.title || item.author ? (
              <div className="mt-1 flex items-baseline gap-2 text-left">
                {item.title ? <h3 className="text-lg font-medium leading-tight">{item.title}</h3> : null}
                {item.author ? (
                  <span className="min-w-0 text-xs text-muted">
                    —
                    {item.authorUrl ? (
                      <a
                        href={item.authorUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-1 underline underline-offset-2 transition hover:text-foreground"
                      >
                        {item.author}
                      </a>
                    ) : (
                      <span className="ml-1">{item.author}</span>
                    )}
                  </span>
                ) : null}
              </div>
            ) : null}
            {item.description ? <p className="mt-1 text-sm text-muted">{item.description}</p> : null}
          </article>
        ))}
      </div>

      {activeItem ? (
        <div
          className="fixed inset-0 z-[80] bg-black/80 p-4 backdrop-blur-[2px] md:p-8"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
        >
          <div className="mx-auto flex h-full w-full max-w-5xl flex-col gap-3" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between rounded-xl border border-[var(--surface-border)] bg-surface2 px-4 py-2 text-sm text-foreground">
              <div className="min-w-0 text-left">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium">{activeItem.title || "未命名作品"}</p>
                  {activeItem.author ? (
                    <p className="truncate text-xs text-muted">
                      —
                      {activeItem.authorUrl ? (
                        <a
                          href={activeItem.authorUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-1 underline underline-offset-2 transition hover:text-foreground"
                        >
                          {activeItem.author}
                        </a>
                      ) : (
                        <span className="ml-1">{activeItem.author}</span>
                      )}
                    </p>
                  ) : null}
                </div>
                <p className="truncate text-xs text-muted">
                  {activeItem.description || "（尚未填寫描述）"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="grid h-8 w-8 place-items-center rounded-full border border-[var(--surface-border)] transition hover:border-[var(--surface-border-strong)]"
                aria-label="關閉"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-2">
                  <path d="M6 6L18 18M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-surface3">
              <Image
                src={activeItem.image}
                alt={activeItem.title || "fandom image"}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
