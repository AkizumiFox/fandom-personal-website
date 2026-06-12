import { cn } from "@/lib/utils";

type ProseProps = {
  className?: string;
  children: React.ReactNode;
};

export function Prose({ className, children }: ProseProps) {
  return (
    <article
      className={cn(
        "font-serif-prose mx-auto max-w-prose py-8 text-[1.05rem] leading-9 text-foreground/95 md:py-10",
        "[&_h1]:mt-2 [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:leading-tight",
        "[&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight",
        "[&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold",
        "[&_p]:mt-4",
        "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
        "[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
        "[&_blockquote]:mt-6 [&_blockquote]:border-l-4 [&_blockquote]:border-accent/40 [&_blockquote]:bg-accent/5 [&_blockquote]:px-4 [&_blockquote]:py-2 [&_blockquote]:text-muted",
        "[&_hr]:my-8 [&_hr]:border-brown/25",
        "[&_code]:rounded [&_code]:bg-background/70 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.92em] [&_code]:text-accent",
        className
      )}
    >
      {children}
    </article>
  );
}
