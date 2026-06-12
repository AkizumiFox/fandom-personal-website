import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { getHobbyItems } from "@/lib/content/hobbies";

export default function HobbiesPage() {
  const hobbyItems = getHobbyItems();

  return (
    <SectionShell>
      <SectionHeading eyebrow="Life" title="生活興趣" description="平常喜歡做的事。" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {hobbyItems.map((item) => (
          <article key={item} className="surface-card rounded-card p-5">
            <span className="ui-chip text-xs">興趣</span>
            <h3 className="mt-3 text-xl font-semibold text-foreground">{item}</h3>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
