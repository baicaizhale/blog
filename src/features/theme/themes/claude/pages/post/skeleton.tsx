import { Skeleton } from "@/components/ui/skeleton";

export function PostPageSkeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto pb-20 px-6">
      <div className="py-12">
        <Skeleton className="h-4 w-24 bg-[var(--claude-surface-card)]" />
      </div>

      <div className="space-y-6 mb-12">
        <Skeleton className="h-4 w-64 bg-[var(--claude-surface-card)]" />
        <Skeleton className="h-12 w-full bg-[var(--claude-surface-card)]" />
        <Skeleton className="h-12 w-3/4 bg-[var(--claude-surface-card)]" />
        <Skeleton className="h-24 w-full bg-[var(--claude-surface-soft)] rounded-[var(--claude-radius-lg)]" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-4 w-full bg-[var(--claude-surface-soft)]" />
        <Skeleton className="h-4 w-full bg-[var(--claude-surface-soft)]" />
        <Skeleton className="h-4 w-5/6 bg-[var(--claude-surface-soft)]" />
        <Skeleton className="h-4 w-full bg-[var(--claude-surface-soft)]" />
        <Skeleton className="h-4 w-4/5 bg-[var(--claude-surface-soft)]" />
      </div>
    </div>
  );
}
