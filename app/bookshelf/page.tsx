import Link from "next/link";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { getBookshelfEntries } from "@/lib/content/bookshelf";
import { getServerDictionary } from "@/lib/i18n/server";

export default async function BookshelfPage() {
  const books = [...getBookshelfEntries()].reverse();
  const { dict } = await getServerDictionary();

  return (
    <SectionShell>
      <SectionHeading eyebrow="Fiction" title={dict.sections.bookshelf.title} description={dict.sections.bookshelf.description} />

      {books.length === 0 ? (
        <p className="text-muted">{dict.sections.bookshelf.empty}</p>
      ) : (
        <div className="grid gap-4">
          {books.map((book) => (
            <Link
              key={book.slug}
              href={`/bookshelf/${encodeURIComponent(book.slug)}`}
              className="surface-card rounded-card p-5"
            >
              <h2 className="font-serif text-xl font-semibold text-foreground">{book.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm leading-7 text-muted">{book.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
