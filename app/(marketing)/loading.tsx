import { SectionShell } from "@/components/layout/section-shell";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <SectionShell className="py-10 md:py-16">
      <section className="surface-panel rounded-[1.75rem] px-6 pb-10 pt-8 md:px-10">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto_1fr]">
          <div className="space-y-6 pb-4">
            <div className="space-y-3">
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="h-16 w-44" />
              <Skeleton className="h-6 w-52" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full max-w-sm" />
              <Skeleton className="h-4 w-4/5 max-w-sm" />
              <Skeleton className="h-4 w-3/5 max-w-sm" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-10 w-28 rounded-full" />
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>
          </div>
          <Skeleton className="mx-auto aspect-[4/5] w-full max-w-[320px] rounded-2xl md:w-[320px]" />
          <div className="grid gap-4 md:pb-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="surface-card flex items-center gap-3 rounded-card p-3">
                <Skeleton className="aspect-video w-[7.5rem] shrink-0 rounded-xl" />
                <div className="min-w-0 flex-1">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="mt-2 h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="surface-panel rounded-panel p-6">
            <Skeleton className="h-4 w-20 rounded-full" />
            <Skeleton className="mt-3 h-7 w-48" />
            <Skeleton className="mt-5 h-40 w-full rounded-xl" />
          </div>
        ))}
      </section>
    </SectionShell>
  );
}
