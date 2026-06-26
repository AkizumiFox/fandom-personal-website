import Link from "next/link";
import { notFound } from "next/navigation";
import { Reader } from "@/components/bookshelf/reader";
import { SectionShell } from "@/components/layout/section-shell";
import { getBookshelfEntries, getBookshelfEntryBySlug } from "@/lib/content/bookshelf";
import { getServerDictionary } from "@/lib/i18n/server";

type BookshelfReaderPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getBookshelfEntries().map((entry) => ({
    slug: entry.slug
  }));
}

export default async function BookshelfReaderPage({ params }: BookshelfReaderPageProps) {
  const { slug } = await params;
  const { dict } = await getServerDictionary();
  const entry = getBookshelfEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <SectionShell className="py-8 md:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 flex items-center justify-between gap-3">
          <Link href="/bookshelf" className="ui-chip text-xs">
            {dict.bookshelfReader.back}
          </Link>
        </div>

        <header className="surface-panel mb-6 rounded-panel px-6 py-5">
          <h1 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">{entry.title}</h1>
        </header>

        <Reader body={entry.body} dict={dict} />
      </div>
    </SectionShell>
  );
}
