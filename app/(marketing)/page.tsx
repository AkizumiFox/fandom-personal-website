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
    <div className="min-h-screen bg-background text-foreground">
      <SectionShell className="py-10 md:py-16">
        <section className={`${styles.heroShell} surface-panel relative overflow-hidden rounded-[2rem] px-6 pb-10 pt-6 shadow-[0_20px_48px_var(--surface-shadow)] md:px-10`}>
          <div className={`${styles.heroOrb} pointer-events-none absolute -left-20 top-8 h-52 w-52 rounded-full bg-[var(--hero-orb-a)] blur-2xl`} />
          <div className={`${styles.heroOrb} ${styles.heroOrbDelay} pointer-events-none absolute bottom-4 right-4 h-40 w-40 rounded-full bg-[var(--hero-orb-b)] blur-2xl`} />

          <div className="relative z-10 mt-8 grid items-end gap-8 md:mt-10 md:grid-cols-[1fr_auto_1fr]">
            <div className="space-y-6 pb-4">
              <div className="space-y-2">
                <p className="text-3xl font-semibold leading-tight text-muted">你好，我是</p>
                <h1 className="text-5xl font-black uppercase tracking-[0.06em] text-foreground md:text-6xl">
                  秋墨
                </h1>
              </div>
              <p className="max-w-sm text-sm leading-7 text-muted">
                一隻黑色的狐狸。純文學、極短篇小說寫作者。對於探店、美食有興趣，喜歡在各地探索美食，目標是把全台的米其林必比登吃過一輪。
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/writing/about-akizumi" className="ui-chip-active ui-chip text-xs text-foreground">
                  自我介紹
                </Link>
                <Link href="/writing/keywords-100" className="ui-chip text-xs">
                  100 關鍵詞
                </Link>
              </div>
            </div>

            <div className={`${styles.characterWrap} relative mx-auto w-full max-w-[420px]`}>
              <FoxInteractionPlayground />
            </div>

            <div className={`${styles.rightStack} md:pb-4`}>
              <HighlightStack items={highlights} />
            </div>
          </div>

        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
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
