import Link from "next/link";

type HobbiesFacetProps = {
  hobbyItems: readonly string[];
};

export function HobbiesFacet({ hobbyItems }: HobbiesFacetProps) {
  return (
    <article id="hobby-facet" className="surface-panel scroll-mt-24 rounded-panel p-6">
      <p className="section-kicker">LIFE</p>
      <h2 className="mt-2 text-2xl font-semibold">
        <Link href="/hobbies" className="transition hover:text-accent">
          生活興趣
        </Link>
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {hobbyItems.map((item) => (
          <span key={item} className="ui-chip px-3 py-1 text-sm">
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
