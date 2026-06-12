import { SectionShell } from "@/components/layout/section-shell";
import { Skeleton } from "@/components/ui/skeleton";

export default function GalleryLoading() {
  return (
    <SectionShell className="pb-12">
      <div className="space-y-3 py-8 md:py-10">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="flex flex-wrap justify-center gap-2 py-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-20 rounded-full" />
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="surface-card rounded-card p-3">
            <Skeleton className={`w-full rounded-xl ${i % 3 === 1 ? "aspect-[3/4]" : "aspect-square"}`} />
            <Skeleton className="mt-3 h-4 w-16" />
            <Skeleton className="mt-2 h-5 w-2/5" />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
