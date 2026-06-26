import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { getHobbyItems } from "@/lib/content/hobbies";
import { getServerDictionary } from "@/lib/i18n/server";

export default async function HobbiesPage() {
  const { dict } = await getServerDictionary();
  const hobbyItems = getHobbyItems().map((item) => dict.hobbiesMap[item] ?? item);

  return (
    <SectionShell>
      <SectionHeading eyebrow="Life" title={dict.sections.hobbies.title} description={dict.sections.hobbies.description} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {hobbyItems.map((item) => (
          <article key={item} className="surface-card rounded-card p-5">
            <span className="ui-chip text-xs">{dict.sections.hobbies.chip}</span>
            <h3 className="mt-3 text-xl font-semibold text-foreground">{item}</h3>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
