import { SectionShell } from "./section-shell";

export function FoxFooter() {
  return (
    <footer className="mt-4 border-t border-[var(--surface-border)] bg-[var(--surface-2)]/85">
      <SectionShell className="pb-4 pt-2 md:pb-6">
        <iframe
          src="/fox/index.html"
          title="Fox animation"
          className="h-[170px] w-[260px] border-0 bg-transparent md:h-[210px] md:w-[360px]"
        />
      </SectionShell>
    </footer>
  );
}
