import { Skeleton } from "@/components/ui/skeleton";

export function FriendLinksPageSkeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto pb-20 px-6">
      <header className="py-16 md:py-20 space-y-4">
        <Skeleton className="h-10 w-48 bg-[var(--claude-surface-card)]" />
        <Skeleton className="h-5 w-80 bg-[var(--claude-surface-soft)]" />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-5 rounded-[var(--claude-radius-lg)] border border-[var(--claude-hairline)] space-y-2">
            <Skeleton className="h-5 w-32 bg-[var(--claude-surface-card)]" />
            <Skeleton className="h-4 w-full bg-[var(--claude-surface-soft)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
