"use client";

import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import styles from "./reader.module.css";

type ReaderProps = {
  body: string;
};

type FontSize = "small" | "medium" | "large";
type WritingMode = "horizontal" | "vertical";

export function Reader({ body }: ReaderProps) {
  const [fontSize, setFontSize] = useState<FontSize>("medium");
  const [writingMode, setWritingMode] = useState<WritingMode>("horizontal");

  const articleClassName = useMemo(() => {
    const sizeClass = fontSize === "small" ? styles.small : fontSize === "large" ? styles.large : styles.medium;
    const modeClass = writingMode === "vertical" ? styles.vertical : styles.horizontal;
    return `${styles.article} ${sizeClass} ${modeClass}`;
  }, [fontSize, writingMode]);

  return (
    <div className={styles.readerShell}>
      <div className={styles.toolbar} aria-label="閱讀設定">
        <div className={styles.control}>
          <span className={styles.label}>字體</span>
          <div className={styles.options}>
            <button
              type="button"
              onClick={() => setFontSize("small")}
              className={fontSize === "small" ? styles.active : styles.option}
            >
              小
            </button>
            <button
              type="button"
              onClick={() => setFontSize("medium")}
              className={fontSize === "medium" ? styles.active : styles.option}
            >
              中
            </button>
            <button
              type="button"
              onClick={() => setFontSize("large")}
              className={fontSize === "large" ? styles.active : styles.option}
            >
              大
            </button>
          </div>
        </div>

        <div className={styles.control}>
          <span className={styles.label}>排版</span>
          <div className={styles.options}>
            <button
              type="button"
              onClick={() => setWritingMode("horizontal")}
              className={writingMode === "horizontal" ? styles.active : styles.option}
            >
              橫書
            </button>
            <button
              type="button"
              onClick={() => setWritingMode("vertical")}
              className={writingMode === "vertical" ? styles.active : styles.option}
            >
              直書
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
