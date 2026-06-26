"use client";

import QRCode from "qrcode";
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { fmt } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import styles from "./business-card.module.css";

const emptySubscribe = () => () => {};

function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

type QrTarget = {
  id: string;
  label: string;
  caption: string;
  href: string;
  icon: ReactNode;
};

type BusinessCardBackProps = {
  facebookHref: string;
  twitterHref: string;
  siteUrl?: string;
  fullscreen?: boolean;
  onBack: () => void;
  dict: Dictionary;
};

const ScanIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 8V5a1 1 0 0 1 1-1h3" />
    <path d="M20 8V5a1 1 0 0 0-1-1h-3" />
    <path d="M4 16v3a1 1 0 0 0 1 1h3" />
    <path d="M20 16v3a1 1 0 0 1-1 1h-3" />
    <path d="M4 12h16" />
  </svg>
);

const FacebookIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
    <path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.4 1.4-1.4h1.4V5.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8.2V14h2.6v7h2.7z" />
  </svg>
);

const XIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
    <path d="M17.5 4h2.6l-5.7 6.5L21 20h-5.3l-4.1-5.4L6.8 20H4.2l6.1-7L3.5 4h5.4l3.7 4.9L17.5 4zm-.9 14.4h1.4L8.3 5.5H6.8l9.8 12.9z" />
  </svg>
);

function QrTile({ label, caption, href, icon, featured, scanAria }: Omit<QrTarget, "id"> & { featured?: boolean; scanAria: string }) {
  const [svg, setSvg] = useState("");

  useEffect(() => {
    if (!href) return;
    let active = true;
    QRCode.toString(href, {
      type: "svg",
      margin: 2,
      errorCorrectionLevel: "M",
      color: { dark: "#010101", light: "#00000000" }
    })
      .then((markup) => {
        if (active) setSvg(markup.replaceAll("#010101", "currentColor"));
      })
      .catch(() => {
        if (active) setSvg("");
      });
    return () => {
      active = false;
    };
  }, [href]);

  return (
    <a
      href={href || undefined}
      target="_blank"
      rel="noreferrer"
      className={`${styles.qrTile} ${featured ? styles.qrTileFeatured : ""}`}
      aria-label={fmt(scanAria, { label, caption })}
    >
      <span
        className={`${styles.qrCode} ${featured ? styles.qrCodeFeatured : ""}`}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <span className={styles.qrMeta}>
        <span className={styles.qrIcon}>{icon}</span>
        <span className={styles.qrLabel}>{label}</span>
      </span>
      <span className={styles.qrCaption}>{caption}</span>
    </a>
  );
}

export function BusinessCardBack({ facebookHref, twitterHref, siteUrl, fullscreen, onBack, dict }: BusinessCardBackProps) {
  const isClient = useIsClient();
  const resolvedSite = siteUrl ?? (isClient ? window.location.origin : "");
  const scanAria = dict.card.scanAria;

  const site: Omit<QrTarget, "id"> = {
    label: dict.card.siteLabel,
    caption: dict.card.siteCaption,
    href: resolvedSite,
    icon: ScanIcon
  };
  const facebook: Omit<QrTarget, "id"> = {
    label: "Facebook",
    caption: "AkizumiFox",
    href: facebookHref,
    icon: FacebookIcon
  };
  const twitter: Omit<QrTarget, "id"> = {
    label: "Twitter / X",
    caption: "@AkizumiFox",
    href: twitterHref,
    icon: XIcon
  };

  return (
    <div className={styles.backInner}>
      <div className={styles.backHeader}>
        <p className="section-kicker">AKIZUMI</p>
        <p className={styles.backTitle}>{dict.card.title}</p>
        <p className={styles.backHint}>{dict.card.hint}</p>
      </div>

      {fullscreen ? (
        <>
          <div className={styles.masterRow}>
            <QrTile featured scanAria={scanAria} {...site} />
          </div>
          <div className={styles.followDivider}>
            <span>{dict.card.followOnly}</span>
          </div>
          <div className={styles.qrGrid}>
            <QrTile scanAria={scanAria} {...facebook} />
            <QrTile scanAria={scanAria} {...twitter} />
          </div>
        </>
      ) : (
        <div className={styles.qrGrid}>
          <QrTile scanAria={scanAria} {...facebook} />
          <QrTile scanAria={scanAria} {...site} />
          <QrTile scanAria={scanAria} {...twitter} />
        </div>
      )}

      <button type="button" onClick={onBack} className={styles.backFlip}>
        {dict.card.backToFront}
      </button>
    </div>
  );
}
