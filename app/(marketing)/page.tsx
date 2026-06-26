import { SectionShell } from "@/components/layout/section-shell";
import { BusinessCard } from "@/components/marketing/home/business-card";
import { BookshelfTeaser } from "@/components/marketing/home/bookshelf-teaser";
import { FandomFacet } from "@/components/marketing/home/fandom-facet";
import { HobbiesFacet } from "@/components/marketing/home/hobbies-facet";
import { SocialFacet } from "@/components/marketing/home/social-facet";
import { WritingFacet } from "@/components/marketing/home/writing-facet";
import { heroHighlights } from "@/content/data/hero-highlights";
import { getBookshelfEntries } from "@/lib/content/bookshelf";
import { getFandomGalleryItems, type FandomCategory } from "@/lib/content/fandom";
import { getHobbyItems } from "@/lib/content/hobbies";
import { getSocialLinks } from "@/lib/content/social";
import { getWritingEntries } from "@/lib/content/writing";
import { getServerDictionary } from "@/lib/i18n/server";

export default async function HomePage() {
  const { dict, locale } = await getServerDictionary();
  const highlights = heroHighlights.map((item) => ({
    id: item.id,
    href: item.href,
    title: dict.highlights[item.id].title,
    short: dict.highlights[item.id].short,
    note: dict.highlights[item.id].note
  }));
  const writings = getWritingEntries(locale);
  const books = getBookshelfEntries();
  const fandomItems = getFandomGalleryItems();
  const hobbyItems = getHobbyItems().map((item) => dict.hobbiesMap[item] ?? item);
  const socialLinks = getSocialLinks();
  const fandomSelections = (Object.keys(dict.fandomCategories) as FandomCategory[]).map((category) => ({
    category,
    label: dict.fandomCategories[category]
  }));

  const facebookHref = socialLinks.find((link) => link.label === "Facebook")?.href ?? "https://www.facebook.com/AkizumiFox/";
  const twitterHref = socialLinks.find((link) => link.label.startsWith("Twitter"))?.href ?? "https://x.com/AkizumiFox";

  return (
    <div className="min-h-screen text-foreground">
      <SectionShell className="py-8 md:py-10">
        <BusinessCard highlights={highlights} facebookHref={facebookHref} twitterHref={twitterHref} dict={dict} />

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <FandomFacet
            fandomSelections={fandomSelections}
            fandomItems={fandomItems}
            dict={dict}
          />

          <div id="novel-facet" className="scroll-mt-24">
            <BookshelfTeaser books={books} dict={dict} />
          </div>
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <HobbiesFacet hobbyItems={hobbyItems} dict={dict} />
          <SocialFacet socialLinks={socialLinks} dict={dict} />
        </section>

        <WritingFacet writings={writings} dict={dict} />
      </SectionShell>
    </div>
  );
}
