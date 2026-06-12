import Link from "next/link";
import type { SocialLink } from "@/lib/content/social";

type SocialFacetProps = {
  socialLinks: readonly SocialLink[];
};

export function SocialFacet({ socialLinks }: SocialFacetProps) {
  return (
    <article id="social-facet" className="surface-panel scroll-mt-24 rounded-panel p-6">
      <p className="section-kicker">CONNECT</p>
      <h2 className="mt-2 text-2xl font-semibold">
        <Link href="/social" className="transition hover:text-accent">
          社群媒體
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
