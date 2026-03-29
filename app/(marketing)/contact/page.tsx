import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/typography/section-heading";

export default function ContactPage() {
  return (
    <SectionShell>
      <SectionHeading title="Contact" />
      <p className="max-w-prose text-muted">Add preferred contact links and collaboration notes.</p>
    </SectionShell>
  );
}
