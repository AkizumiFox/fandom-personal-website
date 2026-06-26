import Link from "next/link";
import styles from "./highlight-stack.module.css";

export type HighlightItem = {
  id: string;
  title: string;
  short: string;
  href: string;
  note: string;
};

type HighlightStackProps = {
  items: readonly HighlightItem[];
};

export function HighlightStack({ items }: HighlightStackProps) {
  return (
    <div className={styles.stackRoot}>
      <div className={styles.stackFrame}>
        {items.map((item, index) => {
          const toneClass =
            index % 3 === 0 ? styles.miniPreview0 : index % 3 === 1 ? styles.miniPreview1 : styles.miniPreview2;

          return (
            <div key={item.id} className={styles.cardWrap}>
              <Link
                href={item.href}
                className={`${styles.highlightCard} group flex items-center gap-3 rounded-card border p-2 transition md:p-3`}
              >
                <div className={`${styles.miniPreview} ${toneClass}`} />
                <div className={`${styles.cardText} min-w-0`}>
                  <p className="text-sm font-semibold text-[var(--hero-card-title)] group-hover:text-[var(--foreground)] md:text-base">{item.title}</p>
                  <p className="mt-0.5 text-xs text-[var(--hero-card-note)] md:text-sm">{item.note}</p>
                </div>
                <span className={styles.cardShort}>{item.short}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
