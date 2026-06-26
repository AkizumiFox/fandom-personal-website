import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SectionShell } from "@/components/layout/section-shell";
import { Prose } from "@/components/typography/prose";
import { ReadingProgress } from "@/components/typography/reading-progress";
import { getWritingEntries, getWritingEntryBySlug } from "@/lib/content/writing";
import { getServerDictionary } from "@/lib/i18n/server";

type WritingDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getWritingEntries().map((entry) => ({
    slug: entry.slug
  }));
}

export default async function WritingDetailPage({ params }: WritingDetailPageProps) {
  const { slug } = await params;
  const { dict, locale } = await getServerDictionary();
  const entries = getWritingEntries(locale);
  const entry = getWritingEntryBySlug(slug, locale);

  if (!entry) {
    notFound();
  }

  const currentIndex = entries.findIndex((candidate) => candidate.slug === entry.slug);
  const prevEntry = currentIndex > 0 ? entries[currentIndex - 1] : null;
  const nextEntry = currentIndex >= 0 && currentIndex < entries.length - 1 ? entries[currentIndex + 1] : null;
  const normalizedBody = entry.body.replace(/^\s*#\s+(.+)\n+/, (fullMatch, headingText: string) => {
    return headingText.trim() === entry.title.trim() ? "" : fullMatch;
  });

  return (
    <SectionShell>
      <ReadingProgress />
      <article className="surface-panel mx-auto mt-6 max-w-4xl rounded-panel px-6 pb-8 pt-6 md:px-10">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{entry.title}</h1>
        <p className="mt-2 text-sm leading-7 text-muted">{entry.excerpt ?? dict.common.updating}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span key={tag} className="ui-chip px-2 py-0.5 text-xs">
              #{tag}
            </span>
          ))}
        </div>

        <Prose className="mt-2">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {normalizedBody}
          </ReactMarkdown>
        </Prose>

        <nav aria-label={dict.articleNav.label} className="mt-8 grid gap-3 border-t border-[var(--surface-border)] pt-5 md:grid-cols-2">
          {prevEntry ? (
            <Link
              href={`/writing/${prevEntry.slug}`}
              className="surface-card block rounded-card p-4"
            >
              <p className="text-xs text-muted">{dict.articleNav.prev}</p>
              <p className="mt-1 line-clamp-1 text-sm font-medium text-foreground">{prevEntry.title}</p>
            </Link>
          ) : (
            <div className="rounded-card border border-dashed border-[var(--surface-border)] p-4 text-xs text-muted">{dict.articleNav.first}</div>
          )}

          {nextEntry ? (
            <Link
              href={`/writing/${nextEntry.slug}`}
              className="surface-card block rounded-card p-4 text-right"
            >
              <p className="text-xs text-muted">{dict.articleNav.next}</p>
              <p className="mt-1 line-clamp-1 text-sm font-medium text-foreground">{nextEntry.title}</p>
            </Link>
          ) : (
            <div className="rounded-card border border-dashed border-[var(--surface-border)] p-4 text-right text-xs text-muted">{dict.articleNav.last}</div>
          )}
        </nav>
      </article>
    </SectionShell>
  );
}
