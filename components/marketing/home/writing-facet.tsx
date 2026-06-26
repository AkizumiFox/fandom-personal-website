import Link from "next/link";
import type { WritingEntry } from "@/lib/content/writing";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type WritingFacetProps = {
  writings: readonly WritingEntry[];
  dict: Dictionary;
};

export function WritingFacet({ writings, dict }: WritingFacetProps) {
  return (
    <section id="article-facet" className="surface-panel mt-6 scroll-mt-24 rounded-panel p-6">
      <p className="section-kicker">NOTES</p>
      <h2 className="mt-2 text-2xl font-semibold">
        <Link href="/writing" className="transition hover:text-accent">
          {dict.nav.writing}
        </Link>
      </h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {writings.slice(0, 4).map((entry) => (
          <Link key={entry.slug} href={`/writing/${entry.slug}`} className="surface-card rounded-xl p-4">
            <p className="font-medium text-foreground">{entry.title}</p>
            <p className="mt-1 text-sm text-muted">{entry.excerpt ?? dict.common.updating}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span key={tag} className="ui-chip px-2 py-0.5 text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
