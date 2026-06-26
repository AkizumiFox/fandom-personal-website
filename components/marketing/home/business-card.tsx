"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HighlightStack, type HighlightItem } from "@/components/marketing/highlight-stack";
import { FoxInteractionPlayground } from "@/components/marketing/home/fox-interaction-playground";
import { BusinessCardBack } from "@/components/marketing/home/business-card-back";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import styles from "./business-card.module.css";

type BusinessCardProps = {
  highlights: readonly HighlightItem[];
  facebookHref: string;
  twitterHref: string;
  siteUrl?: string;
  dict: Dictionary;
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

export function BusinessCard({ highlights, facebookHref, twitterHref, siteUrl, dict }: BusinessCardProps) {
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
      aria-label={dict.hero.cardAria}
    >
      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.controlBtn} ${styles.flipBtn}`}
          aria-pressed={flipped}
          aria-label={flipped ? dict.card.flipToFront : dict.card.flipToBack}
          onClick={() => setFlipped((value) => !value)}
        >
          {FlipIcon}
        </button>
        <button
          ref={closeRef}
          type="button"
          className={styles.controlBtn}
          aria-label={fullscreen ? dict.card.closeFull : dict.card.expand}
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

          <div className={`${styles.heroGrid} relative z-10 grid items-end gap-4`}>
            <div className={`${styles.heroIdentity} space-y-3 pb-1 md:space-y-6 md:pb-4`}>
              <div className="space-y-2 md:space-y-3">
                <p className="section-kicker">AKIZUMI</p>
                <h1 className="font-serif text-4xl font-black leading-none tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
                  <span className="text-ink-gradient">秋墨</span>
                </h1>
                <p className="text-base font-medium text-muted md:text-xl lg:text-2xl">{dict.hero.tagline}</p>
              </div>
              <p className="max-w-sm text-sm leading-6 text-muted md:max-w-md md:text-base md:leading-7 lg:text-lg lg:leading-8">
                {dict.hero.bio}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/writing/about-akizumi"
                  className="inline-flex items-center rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-[var(--hero-cta-text)] transition-colors duration-200 hover:bg-[var(--accent-soft)] md:px-6 md:py-2.5 md:text-base"
                >
                  {dict.hero.about}
                </Link>
                <Link href="/writing/keywords-100" className="ui-chip text-sm md:text-base">
                  {dict.hero.keywords}
                </Link>
              </div>
            </div>

            <div className={`${styles.characterWrap} relative mx-auto w-full max-w-[150px] md:max-w-[320px] lg:max-w-[420px] xl:max-w-[480px]`}>
              <FoxInteractionPlayground dict={dict} />
            </div>

            <div className={`${styles.rightStack} lg:pb-4`}>
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
            dict={dict}
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
            aria-label={dict.hero.cardAria}
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
