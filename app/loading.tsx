import { SectionShell } from "@/components/layout/section-shell";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <SectionShell className="py-10 md:py-14">
      <div className="space-y-3 py-8 md:py-10">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-5 w-72 max-w-full" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="surface-card rounded-card p-5">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
