import { Skeleton } from "@/components/ui/skeleton";
import { m } from "@/paraglide/messages";

export function PostsPageSkeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto pb-20 px-6">
      <header className="py-16 md:py-20 space-y-4">
        <h1
          className="text-4xl md:text-5xl font-serif text-[var(--claude-ink)]"
          style={{ fontWeight: 400, letterSpacing: "-0.03em" }}
        >
          {m.nav_posts()}
        </h1>
      </header>

      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <div className="py-6 space-y-3">
              <Skeleton className="h-3 w-24 bg-[var(--claude-surface-card)]" />
              <Skeleton className="h-7 w-3/4 bg-[var(--claude-surface-card)]" />
              <Skeleton className="h-4 w-full bg-[var(--claude-surface-soft)]" />
            </div>
            {i < 4 && <div className="h-px bg-[var(--claude-hairline)]" />}
          </div>
        ))}
      </div>
    </div>
  );
}
