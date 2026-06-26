import { SectionShell } from "./section-shell";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function FoxFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className="mt-8 border-t border-[var(--surface-border)] bg-[var(--surface-2)]/85">
      <SectionShell className="pb-4 pt-3 md:pb-6">
        <div className="relative inline-block">
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(closest-side,var(--glow-accent),transparent)]" />
          <iframe
            src="/fox/index.html"
            title="Fox animation"
            className="relative h-[170px] w-[260px] border-0 bg-transparent md:h-[210px] md:w-[360px]"
          />
        </div>
        <p className="mt-2 text-xs tracking-wide text-muted">
          {dict.footer.tagline}
        </p>
      </SectionShell>
    </footer>
  );
}
