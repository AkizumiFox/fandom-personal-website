import Link from "next/link";
import type { SocialLink } from "@/lib/content/social";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type SocialFacetProps = {
  socialLinks: readonly SocialLink[];
  dict: Dictionary;
};

export function SocialFacet({ socialLinks, dict }: SocialFacetProps) {
  return (
    <article id="social-facet" className="surface-panel scroll-mt-24 rounded-panel p-6">
      <p className="section-kicker">CONNECT</p>
      <h2 className="mt-2 text-2xl font-semibold">
        <Link href="/social" className="transition hover:text-accent">
          {dict.nav.social}
        </Link>
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {socialLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="ui-chip text-sm text-foreground"
          >
            {item.label}
          </a>
        ))}
      </div>
    </article>
  );
}
