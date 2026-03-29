"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { FandomItem } from "@/lib/content/fandom-shared";
import { fandomCategoryLabels } from "@/lib/content/fandom-shared";
import styles from "./gallery-showcase.module.css";

type GalleryShowcaseProps = {
  items: readonly FandomItem[];
};

export function GalleryShowcase({ items }: GalleryShowcaseProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const pauseRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || items.length === 0) return;

    const speedPxPerFrame = 0.28;

    const tick = () => {
      if (!viewport) return;

      if (!pauseRef.current) {
        const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
        viewport.scrollLeft += speedPxPerFrame;
        if (maxScroll > 0 && viewport.scrollLeft >= maxScroll) {
          viewport.scrollLeft = 0;
        }
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [items.length]);

  return (
    <div className={styles.showcaseRoot}>
      <div
        ref={viewportRef}
        className={styles.viewport}
        onPointerDown={(event) => {
          if (!viewportRef.current) return;
          draggingRef.current = true;
          movedRef.current = false;
          pauseRef.current = true;
          dragStartXRef.current = event.clientX;
          dragStartScrollRef.current = viewportRef.current.scrollLeft;
          viewportRef.current.setPointerCapture(event.pointerId);
          viewportRef.current.dataset.dragging = "true";
        }}
        onPointerMove={(event) => {
          if (!draggingRef.current || !viewportRef.current) return;
          const deltaX = event.clientX - dragStartXRef.current;
          if (Math.abs(deltaX) > 6) movedRef.current = true;
          viewportRef.current.scrollLeft = dragStartScrollRef.current - deltaX;
        }}
        onPointerUp={(event) => {
          if (!viewportRef.current) return;
          draggingRef.current = false;
          viewportRef.current.releasePointerCapture(event.pointerId);
          viewportRef.current.dataset.dragging = "false";
          if (movedRef.current) {
            suppressClickRef.current = true;
            window.setTimeout(() => {
              suppressClickRef.current = false;
            }, 0);
          }
          window.setTimeout(() => {
            pauseRef.current = false;
          }, 450);
        }}
        onPointerCancel={() => {
          if (!viewportRef.current) return;
          draggingRef.current = false;
          viewportRef.current.dataset.dragging = "false";
          window.setTimeout(() => {
            pauseRef.current = false;
          }, 450);
        }}
        onClickCapture={(event) => {
          if (suppressClickRef.current) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
        onMouseEnter={() => {
          pauseRef.current = true;
        }}
        onMouseLeave={() => {
          if (!draggingRef.current) pauseRef.current = false;
        }}
      >
        <div className={styles.track}>
          {items.map((item) => (
            <article className={styles.slide} key={item.id}>
              <a
                href={`#gallery-item-${item.id}`}
                className={styles.imageButton}
                aria-label={`定位到圖片 ${item.title || item.id}`}
                draggable={false}
                onDragStart={(event) => event.preventDefault()}
                onClick={(event) => {
                  const target = document.getElementById(`gallery-item-${item.id}`);
                  if (!target) return;
                  event.preventDefault();
                  target.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest"
                  });
                }}
              >
                <div className={styles.imageWrap}>
                  <Image
                    src={item.image}
                    alt={item.title || "fandom image"}
                    fill
                    className={styles.image}
                    sizes="(min-width: 1280px) 320px, (min-width: 768px) 24vw, 190px"
                    draggable={false}
                  />
                </div>
              </a>
              <div className={styles.overlay}>
                <span className={styles.category}>{fandomCategoryLabels[item.category]}</span>
                {item.title ? <p className={styles.title}>{item.title}</p> : null}
                {item.description ? <p className={styles.desc}>{item.description}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

