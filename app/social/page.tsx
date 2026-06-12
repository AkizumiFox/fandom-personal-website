import Link from "next/link";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { getSocialLinks } from "@/lib/content/social";

export default function SocialPage() {
  const socialLinks = getSocialLinks();

  return (
    <SectionShell>
      <SectionHeading eyebrow="Connect" title="社群媒體" description="每個平台都可以私訊我，最常出沒在 X、Facebook、Instagram 與 Threads。" />
      <div className="grid gap-3 md:grid-cols-2">
        {socialLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="surface-card rounded-card p-5"
          >
            <span className="ui-chip text-xs">社群</span>
            <h3 className="mt-3 text-xl font-semibold text-foreground">{link.label}</h3>
            <p className="mt-2 text-xs text-muted break-all">{link.href.replace(/^https?:\/\//, "")}</p>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}
