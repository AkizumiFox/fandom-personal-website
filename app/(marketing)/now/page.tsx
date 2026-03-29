import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/typography/section-heading";

export default function NowPage() {
  return (
    <SectionShell>
      <SectionHeading title="Now" />
      <p className="max-w-prose text-muted">Add your present projects, reading, and creative focus areas here.</p>
    </SectionShell>
  );
}
