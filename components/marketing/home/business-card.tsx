"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HighlightStack, type HighlightItem } from "@/components/marketing/highlight-stack";
import { FoxInteractionPlayground } from "@/components/marketing/home/fox-interaction-playground";
import { BusinessCardBack } from "@/components/marketing/home/business-card-back";
import styles from "./business-card.module.css";

type BusinessCardProps = {
  highlights: readonly HighlightItem[];
  facebookHref: string;
  twitterHref: string;
  siteUrl?: string;
};

const FlipIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8a8 8 0 0 1 13.5-3.5L20 8" />
    <path d="M20 4v4h-4" />
    <path d="M21 16a8 8 0 0 1-13.5 3.5L4 16" />
    <path d="M4 20v-4h4" />
  </svg>
);

const ExpandIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9V4h5" />
    <path d="M20 9V4h-5" />
    <path d="M4 15v5h5" />
    <path d="M20 15v5h-5" />
  </svg>
);

const CloseIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export function BusinessCard({ highlights, facebookHref, twitterHref, siteUrl }: BusinessCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [placeholderHeight, setPlaceholderHeight] = useState<number>();

  const inlineRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const openFullscreen = useCallback(() => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setPlaceholderHeight(inlineRef.current?.offsetHeight);
    setFullscreen(true);
  }, []);

  const closeFullscreen = useCallback(() => {
    setFullscreen(false);
  }, []);

  useEffect(() => {
    if (!fullscreen) return;
    const previousOverflow = document.body.style.overflow;
    const elementToRestore = lastFocusedRef.current;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeFullscreen();
    };
    document.addEventListener("keydown", onKeyDown);

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
      elementToRestore?.focus();
    };
  }, [fullscreen, closeFullscreen]);

  const card = (
    <section
      className={`${styles.cardShell} surface-panel ${fullscreen ? styles.cardShellFull : ""}`}
      aria-label="秋墨 電子名片"
    >
      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.controlBtn} ${styles.flipBtn}`}
          aria-pressed={flipped}
          aria-label={flipped ? "翻回正面" : "翻到背面（QR code）"}
          onClick={() => setFlipped((value) => !value)}
        >
          {FlipIcon}
        </button>
        <button
          ref={closeRef}
          type="button"
          className={styles.controlBtn}
          aria-label={fullscreen ? "關閉全屏" : "全屏顯示名片"}
          onClick={fullscreen ? closeFullscreen : openFullscreen}
        >
          {fullscreen ? CloseIcon : ExpandIcon}
        </button>
      </div>

      <div className={styles.flip} data-flipped={flipped}>
        <div className={`${styles.face} ${styles.front}`} inert={flipped || undefined}>
          <div className={`${styles.orb} ${styles.orbA}`} />
          <div className={`${styles.orb} ${styles.orbB}`} />
          <div className={styles.topLine} />

          <div className="relative z-10 grid items-end gap-8 md:grid-cols-[1fr_auto_1fr]">
            <div className="space-y-6 pb-4">
              <div className="space-y-3">
                <p className="section-kicker">AKIZUMI</p>
                <h1 className="font-serif text-6xl font-black leading-none tracking-tight md:text-7xl">
                  <span className="text-ink-gradient">秋墨</span>
                </h1>
                <p className="text-lg font-medium text-muted">一隻寫小說的黑色狐狸</p>
              </div>
              <p className="max-w-sm text-sm leading-7 text-muted">
                純文學、極短篇小說寫作者。對於探店、美食有興趣，喜歡在各地探索美食，目標是把全台的米其林必比登吃過一輪。
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/writing/about-akizumi"
                  className="inline-flex items-center rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-[var(--hero-cta-text)] transition-colors duration-200 hover:bg-[var(--accent-soft)]"
                >
                  自我介紹
                </Link>
                <Link href="/writing/keywords-100" className="ui-chip text-sm">
                  100 關鍵詞
                </Link>
              </div>
            </div>

            <div className={`${styles.characterWrap} relative mx-auto w-full max-w-[360px]`}>
              <FoxInteractionPlayground />
            </div>

            <div className={`${styles.rightStack} md:pb-4`}>
              <HighlightStack items={highlights} />
            </div>
          </div>
        </div>

        <div className={`${styles.face} ${styles.back}`} inert={!flipped || undefined}>
          <BusinessCardBack
            facebookHref={facebookHref}
            twitterHref={twitterHref}
            siteUrl={siteUrl}
            fullscreen={fullscreen}
            onBack={() => setFlipped(false)}
          />
        </div>
      </div>
    </section>
  );

  if (fullscreen && typeof document !== "undefined") {
    return (
      <>
        <div ref={inlineRef} aria-hidden="true" style={{ height: placeholderHeight }} />
        {createPortal(
          <div
            className={styles.overlay}
            role="dialog"
            aria-modal="true"
            aria-label="秋墨 電子名片"
            onClick={(event) => {
              if (event.target === event.currentTarget) closeFullscreen();
            }}
          >
            <div className={styles.overlayInner}>{card}</div>
          </div>,
          document.body
        )}
      </>
    );
  }

  return (
    <div ref={inlineRef}>{card}</div>
  );
}
