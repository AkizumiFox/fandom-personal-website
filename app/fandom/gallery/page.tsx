import Link from "next/link";
import Image from "next/image";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/typography/section-heading";
import { GalleryShowcase } from "@/components/fandom/gallery-showcase";
import { GalleryGrid } from "@/components/fandom/gallery-grid";
import { getFandomGalleryItems, type FandomCategory } from "@/lib/content/fandom";
import { getServerDictionary } from "@/lib/i18n/server";

type FandomGalleryPageProps = {
  searchParams?: Promise<{
    category?: string;
  }>;
};

const categoryOrder: FandomCategory[] = ["commission", "ocs", "fursuit", "stickers", "model3d"];

export default async function FandomGalleryPage({ searchParams }: FandomGalleryPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const { dict } = await getServerDictionary();
  const fandomItems = getFandomGalleryItems();
  const selected = (params?.category ?? "") as FandomCategory | "";
  const activeCategory = categoryOrder.includes(selected as FandomCategory) ? (selected as FandomCategory) : "";
  const isStickersTab = activeCategory === "stickers";
  const isModelTab = activeCategory === "model3d";
  const filteredItems = activeCategory && !isStickersTab && !isModelTab
    ? fandomItems.filter((item) => item.category === activeCategory)
    : fandomItems;

  return (
    <SectionShell>
      <SectionHeading eyebrow="Gallery" title={dict.sections.gallery.title} />

      <section className="relative left-1/2 right-1/2 mb-6 w-screen -translate-x-1/2 px-2 md:px-4">
        <div className="flex flex-wrap items-center justify-center gap-2 py-2">
          <Link
            href="/fandom/gallery"
            className={`ui-chip text-sm ${activeCategory === "" ? "ui-chip-active text-foreground" : ""}`}
          >
            {dict.common.all}
          </Link>
          {categoryOrder.map((category) => (
            <Link
              key={category}
              href={`/fandom/gallery?category=${category}`}
              className={`ui-chip text-sm ${activeCategory === category ? "ui-chip-active text-foreground" : ""}`}
            >
              {dict.fandomCategories[category]}
            </Link>
          ))}
        </div>
        {isStickersTab ? (
          <div className="surface-panel mx-auto mt-4 w-full max-w-3xl rounded-panel p-5">
            <div className="overflow-hidden rounded-card border border-[var(--surface-border)] bg-surface3 p-3">
              <Image
                src="/assets/fandom/tg-stickers-preview.png"
                alt="秋墨 TG貼圖預覽"
                width={1179}
                height={1109}
                className="h-auto w-full rounded-lg"
                sizes="(min-width: 1024px) 720px, 100vw"
                priority
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted">
                {dict.sections.gallery.stickersIntro}
                <a
                  href="https://www.instagram.com/dinnerholic/"
                  target="_blank"
                  rel="noreferrer"
                  className="ml-1 underline underline-offset-2 transition hover:text-foreground"
                >
                  迪諾
                </a>
              </p>
              <a
                href="https://t.me/addstickers/AkizumiFox"
                target="_blank"
                rel="noreferrer"
                className="ui-chip ui-chip-active text-foreground"
              >
                {dict.sections.gallery.stickersCta}
              </a>
            </div>
          </div>
        ) : isModelTab ? (
          <div className="surface-panel mx-auto mt-4 w-full max-w-4xl rounded-panel p-5">
            <div className="mt-4 overflow-hidden rounded-card border border-[var(--surface-border)] bg-surface3 p-3">
              <Image
                src="/assets/fandom/model-sheet-preview.png"
                alt="秋墨 3D模型設定圖"
                width={1920}
                height={1080}
                className="h-auto w-full rounded-lg"
                sizes="(min-width: 1024px) 820px, 100vw"
                priority
              />
            </div>
            <div className="mt-4 grid gap-2 text-sm text-muted">
              <p>
                {dict.sections.gallery.modelLabel}
                <a
                  href="https://dontjinxit.gumroad.com/l/JinxedFox"
                  target="_blank"
                  rel="noreferrer"
                  className="ml-1 underline underline-offset-2 transition hover:text-foreground"
                >
                  JinxedFox
                </a>
              </p>
              <p>
                {dict.sections.gallery.remodelLabel}
                <a
                  href="https://www.facebook.com/DDWoofPT"
                  target="_blank"
                  rel="noreferrer"
                  className="ml-1 underline underline-offset-2 transition hover:text-foreground"
                >
                  ㄉㄉ
                </a>
              </p>
              <p>
                {dict.sections.gallery.colorLabel}
                <a
                  href="https://www.facebook.com/blumewmew"
                  target="_blank"
                  rel="noreferrer"
                  className="ml-1 underline underline-offset-2 transition hover:text-foreground"
                >
                  Haru
                </a>
              </p>
            </div>
          </div>
        ) : (
          <GalleryShowcase items={filteredItems} dict={dict} />
        )}
      </section>
      {!isStickersTab && !isModelTab ? <GalleryGrid items={filteredItems} dict={dict} /> : null}
    </SectionShell>
  );
}
