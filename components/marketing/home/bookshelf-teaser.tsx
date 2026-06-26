import Link from "next/link";
import type { BookshelfEntry } from "@/lib/content/bookshelf";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type BookshelfTeaserProps = {
  books: readonly BookshelfEntry[];
  dict: Dictionary;
};

export function BookshelfTeaser({ books, dict }: BookshelfTeaserProps) {
  const previewBooks = books.slice(-3).reverse();

  return (
    <div className="surface-panel h-full rounded-panel p-6">
      <p className="section-kicker">FICTION</p>
      <h3 className="mt-2 text-2xl font-semibold text-foreground">
        <Link href="/bookshelf" className="transition hover:text-accent">
          {dict.nav.bookshelf}
        </Link>
      </h3>

      <ul className="mt-5 space-y-2">
        {previewBooks.map((book) => (
          <li key={book.slug}>
            <Link
              href={`/bookshelf/${encodeURIComponent(book.slug)}`}
              className="surface-card block rounded-xl px-3 py-2"
            >
              <p className="text-sm font-medium text-foreground">{book.title}</p>
              <p className="mt-0.5 line-clamp-1 text-xs text-muted">{book.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
