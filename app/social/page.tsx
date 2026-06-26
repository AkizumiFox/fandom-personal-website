import Link from "next/link";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { getSocialLinks } from "@/lib/content/social";
import { getServerDictionary } from "@/lib/i18n/server";

export default async function SocialPage() {
  const socialLinks = getSocialLinks();
  const { dict } = await getServerDictionary();

  return (
    <SectionShell>
      <SectionHeading eyebrow="Connect" title={dict.sections.social.title} description={dict.sections.social.description} />
      <div className="grid gap-3 md:grid-cols-2">
        {socialLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="surface-card rounded-card p-5"
          >
            <span className="ui-chip text-xs">{dict.sections.social.chip}</span>
            <h3 className="mt-3 text-xl font-semibold text-foreground">{link.label}</h3>
            <p className="mt-2 text-xs text-muted break-all">{link.href.replace(/^https?:\/\//, "")}</p>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}
