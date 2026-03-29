type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header className="space-y-3 py-8 md:py-10">
      {eyebrow ? (
        <p className="inline-flex items-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-2)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-muted">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h2>
      {description ? <p className="max-w-prose text-[1.02rem] leading-8 text-muted">{description}</p> : null}
    </header>
  );
}
