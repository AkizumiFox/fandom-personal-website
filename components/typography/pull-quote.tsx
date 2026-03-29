type PullQuoteProps = {
  quote: string;
  attribution?: string;
};

export function PullQuote({ quote, attribution }: PullQuoteProps) {
  return (
    <figure className="my-10 border-l-2 border-accent/70 pl-6 text-xl italic text-foreground/90">
      <blockquote>{quote}</blockquote>
      {attribution ? <figcaption className="mt-3 text-sm not-italic text-muted">- {attribution}</figcaption> : null}
    </figure>
  );
}
