"use client";

import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import styles from "./reader.module.css";

type ReaderProps = {
  body: string;
  dict: Dictionary;
};

type FontSize = "small" | "medium" | "large";
type WritingMode = "horizontal" | "vertical";

export function Reader({ body, dict }: ReaderProps) {
  const [fontSize, setFontSize] = useState<FontSize>("medium");
  const [writingMode, setWritingMode] = useState<WritingMode>("horizontal");

  const articleClassName = useMemo(() => {
    const sizeClass = fontSize === "small" ? styles.small : fontSize === "large" ? styles.large : styles.medium;
    const modeClass = writingMode === "vertical" ? styles.vertical : styles.horizontal;
    return `${styles.article} ${sizeClass} ${modeClass}`;
  }, [fontSize, writingMode]);

  return (
    <div className={styles.readerShell}>
      <div className={styles.toolbar} aria-label={dict.reader.settings}>
        <div className={styles.control}>
          <span className={styles.label}>{dict.reader.font}</span>
          <div className={styles.options}>
            <button
              type="button"
              onClick={() => setFontSize("small")}
              className={fontSize === "small" ? styles.active : styles.option}
            >
              {dict.reader.small}
            </button>
            <button
              type="button"
              onClick={() => setFontSize("medium")}
              className={fontSize === "medium" ? styles.active : styles.option}
            >
              {dict.reader.medium}
            </button>
            <button
              type="button"
              onClick={() => setFontSize("large")}
              className={fontSize === "large" ? styles.active : styles.option}
            >
              {dict.reader.large}
            </button>
          </div>
        </div>

        <div className={styles.control}>
          <span className={styles.label}>{dict.reader.layout}</span>
          <div className={styles.options}>
            <button
              type="button"
              onClick={() => setWritingMode("horizontal")}
              className={writingMode === "horizontal" ? styles.active : styles.option}
            >
              {dict.reader.horizontal}
            </button>
            <button
              type="button"
              onClick={() => setWritingMode("vertical")}
              className={writingMode === "vertical" ? styles.active : styles.option}
            >
              {dict.reader.vertical}
            </button>
          </div>
        </div>
      </div>

      <article className={articleClassName}>
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{body}</ReactMarkdown>
      </article>
    </div>
  );
}
