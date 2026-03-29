import Link from "next/link";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { getBookshelfEntries } from "@/lib/content/bookshelf";

export default function BookshelfPage() {
  const books = [...getBookshelfEntries()].reverse();

  return (
    <SectionShell>
      <SectionHeading title="文字創作" description="一行一篇，直接進入閱讀。" />

      {books.length === 0 ? (
        <p className="text-muted">目前還沒有作品，請先在 `content/collections/bookshelf/` 新增 .md 檔案。</p>
      ) : (
        <div className="grid gap-4">
          {books.map((book) => (
            <Link
              key={book.slug}
              href={`/bookshelf/${encodeURIComponent(book.slug)}`}
              className="surface-card rounded-card p-5 hover:-translate-y-[1px]"
            >
              <h2 className="text-xl font-semibold text-foreground">{book.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm leading-7 text-muted">{book.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </SectionShell>
  );
}