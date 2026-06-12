import Link from "next/link";
import { SectionShell } from "@/components/layout/section-shell";
import { HighlightStack } from "@/components/marketing/highlight-stack";
import { BookshelfTeaser } from "@/components/marketing/home/bookshelf-teaser";
import { FandomFacet } from "@/components/marketing/home/fandom-facet";
import { FoxInteractionPlayground } from "@/components/marketing/home/fox-interaction-playground";
import { HobbiesFacet } from "@/components/marketing/home/hobbies-facet";
import { SocialFacet } from "@/components/marketing/home/social-facet";
import { WritingFacet } from "@/components/marketing/home/writing-facet";
import { heroHighlights } from "@/content/data/hero-highlights";
import { getBookshelfEntries } from "@/lib/content/bookshelf";
import { fandomCategoryLabels, getFandomGalleryItems } from "@/lib/content/fandom";
import { getHobbyItems } from "@/lib/content/hobbies";
import { getSocialLinks } from "@/lib/content/social";
import { getWritingEntries } from "@/lib/content/writing";
import styles from "./page.module.css";

export default function HomePage() {
  const highlights = heroHighlights;
  const writings = getWritingEntries();
  const books = getBookshelfEntries();
  const fandomItems = getFandomGalleryItems();
  const hobbyItems = getHobbyItems();
  const socialLinks = getSocialLinks();
  const fandomSelections = Object.entries(fandomCategoryLabels).map(([category, label]) => ({ category, label }));

  return (
    <div className="min-h-screen text-foreground">
      <SectionShell className="py-8 md:py-10">
        <section className={`${styles.heroShell} surface-panel relative overflow-hidden rounded-[1.75rem] px-6 pb-8 pt-6 shadow-[0_24px_60px_var(--surface-shadow)] md:px-10`}>
          <div className={`${styles.heroOrb} pointer-events-none absolute -left-24 -top-16 h-72 w-72 rounded-full bg-[var(--hero-orb-a)] blur-3xl`} />
          <div className={`${styles.heroOrb} ${styles.heroOrbDelay} pointer-events-none absolute -bottom-12 -right-10 h-60 w-60 rounded-full bg-[var(--hero-orb-b)] blur-3xl`} />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent" />

          <div className="relative z-10 grid items-end gap-8 md:grid-cols-[1fr_auto_1fr]">
            <div className="space-y-6 pb-4">
              <div className="space-y-3">
                <p className="section-kicker">AKIZUMI</p>
                <h1 className="font-serif text-6xl font-black leading-none tracking-tight md:text-7xl">
                  <span className="text-ink-gradient">秋墨</span>
                </h1>
                <p className="text-lg font-medium text-muted">一隻寫小說的黑色狐狸</p>
              </div>
              <p className="max-w-sm text-sm leading-7 text-muted">
                純文學、極短篇小說寫作者。對於探店、美食有興趣，喜歡在各地探索美食，目標是把全台的米其林必比登吃過一輪。
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/writing/about-akizumi"
                  className="inline-flex items-center rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-[var(--hero-cta-text)] transition-colors duration-200 hover:bg-[var(--accent-soft)]"
                >
                  自我介紹
                </Link>
                <Link href="/writing/keywords-100" className="ui-chip text-sm">
                  100 關鍵詞
                </Link>
              </div>
            </div>

            <div className={`${styles.characterWrap} relative mx-auto w-full max-w-[360px]`}>
              <FoxInteractionPlayground />
            </div>

            <div className={`${styles.rightStack} md:pb-4`}>
              <HighlightStack items={highlights} />
            </div>
          </div>

        </section>

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
