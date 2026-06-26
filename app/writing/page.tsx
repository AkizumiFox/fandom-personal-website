import { SectionShell } from "@/components/layout/section-shell";
import { WritingCard } from "@/components/cards/writing-card";
import { SectionHeading } from "@/components/typography/section-heading";
import { getWritingEntries } from "@/lib/content/writing";
import { getServerDictionary } from "@/lib/i18n/server";

export default async function WritingListPage() {
  const { dict, locale } = await getServerDictionary();
  const entries = getWritingEntries(locale);

  return (
    <SectionShell>
      <SectionHeading eyebrow="Notes" title={dict.sections.writing.title} description={dict.sections.writing.description} />
      <div className="grid gap-4 md:grid-cols-2">
        {entries.map((entry) => (
          <WritingCard
            key={entry.slug}
            title={entry.title}
            href={`/writing/${entry.slug}`}
            excerpt={entry.excerpt ?? dict.common.updating}
            tags={entry.tags}
          />
        ))}
      </div>
    </SectionShell>
  );
}
