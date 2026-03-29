import Link from "next/link";
import styles from "./highlight-stack.module.css";

export type HighlightItem = {
  id: string;
  title: string;
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
                className={`${styles.highlightCard} group block rounded-card border p-3 transition`}
              >
                <div className={`${styles.miniPreview} ${toneClass}`} />
                <p className="text-base font-semibold text-[var(--hero-card-title)] group-hover:text-[var(--foreground)]">{item.title}</p>
                <p className="mt-1 text-sm text-[var(--hero-card-note)]">{item.note}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
