import Link from "next/link";

type GalleryCardProps = {
  title: string;
  caption: string;
  href: string;
};

export function GalleryCard({ title, caption, href }: GalleryCardProps) {
  return (
    <Link href={href} className="surface-card block rounded-card p-6 hover:-translate-y-[1px]">
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted">{caption}</p>
    </Link>
  );
}
