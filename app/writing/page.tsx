import { SectionShell } from "@/components/layout/section-shell";
import { WritingCard } from "@/components/cards/writing-card";
import { SectionHeading } from "@/components/typography/section-heading";
import { getWritingEntries } from "@/lib/content/writing";

export default function WritingListPage() {
  const entries = getWritingEntries();

  return (
    <SectionShell>
      <SectionHeading title="文章雜談" description="近期筆記、散文與主題文章。保留清楚層級，也留一點玩心。" />
      <div className="grid gap-4 md:grid-cols-2">
        {entries.map((entry) => (
          <WritingCard
            key={entry.slug}
            title={entry.title}
            href={`/writing/${entry.slug}`}
            excerpt={entry.excerpt ?? "更新中"}
            tags={entry.tags}
          />
        ))}
      </div>
    </SectionShell>
  );
}
