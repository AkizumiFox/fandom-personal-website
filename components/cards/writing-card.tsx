import Link from "next/link";

type WritingCardProps = {
  title: string;
  excerpt: string;
  href: string;
  tags?: string[];
};

export function WritingCard({ title, excerpt, href, tags = [] }: WritingCardProps) {
  return (
    <Link href={href} className="surface-card block rounded-card p-6">
      <h3 className="text-xl font-medium text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted">{excerpt}</p>
      {tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="ui-chip px-2.5 py-1 text-xs">
              #{tag}
            </span>
          ))}
        </div>
      ) : null}
    </Link>
  );
}
