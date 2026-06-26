import { SectionShell } from "@/components/layout/section-shell";
import { BusinessCard } from "@/components/marketing/home/business-card";
import { BookshelfTeaser } from "@/components/marketing/home/bookshelf-teaser";
import { FandomFacet } from "@/components/marketing/home/fandom-facet";
import { HobbiesFacet } from "@/components/marketing/home/hobbies-facet";
import { SocialFacet } from "@/components/marketing/home/social-facet";
import { WritingFacet } from "@/components/marketing/home/writing-facet";
import { heroHighlights } from "@/content/data/hero-highlights";
import { getBookshelfEntries } from "@/lib/content/bookshelf";
import { fandomCategoryLabels, getFandomGalleryItems } from "@/lib/content/fandom";
import { getHobbyItems } from "@/lib/content/hobbies";
import { getSocialLinks } from "@/lib/content/social";
import { getWritingEntries } from "@/lib/content/writing";

export default function HomePage() {
  const highlights = heroHighlights;
  const writings = getWritingEntries();
  const books = getBookshelfEntries();
  const fandomItems = getFandomGalleryItems();
  const hobbyItems = getHobbyItems();
  const socialLinks = getSocialLinks();
  const fandomSelections = Object.entries(fandomCategoryLabels).map(([category, label]) => ({ category, label }));

  const facebookHref = socialLinks.find((link) => link.label === "Facebook")?.href ?? "https://www.facebook.com/AkizumiFox/";
  const twitterHref = socialLinks.find((link) => link.label.startsWith("Twitter"))?.href ?? "https://x.com/AkizumiFox";

  return (
    <div className="min-h-screen text-foreground">
      <SectionShell className="py-8 md:py-10">
        <BusinessCard highlights={highlights} facebookHref={facebookHref} twitterHref={twitterHref} />

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <FandomFacet
            fandomSelections={fandomSelections}
            fandomItems={fandomItems}
          />

          <div id="novel-facet" className="scroll-mt-24">
            <BookshelfTeaser books={books} />
          </div>
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <HobbiesFacet hobbyItems={hobbyItems} />
          <SocialFacet socialLinks={socialLinks} />
        </section>

        <WritingFacet writings={writings} />
      </SectionShell>
    </div>
  );
}
