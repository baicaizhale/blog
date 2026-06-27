import { useRouteContext } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { m } from "@/paraglide/messages";

export function HomePageSkeleton() {
  const { siteConfig } = useRouteContext({ from: "__root__" });

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-16 md:py-24">
      {/* Hero Skeleton */}
      <section className="mb-20">
        <header className="space-y-6">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--claude-ink)] leading-tight"
            style={{ fontWeight: 400, letterSpacing: "-0.03em" }}
          >
            {siteConfig.author}
          </h1>
          <p className="text-lg text-[var(--claude-body)] leading-relaxed max-w-2xl">
            {siteConfig.description}
          </p>
        </header>
      </section>

      {/* Posts Skeleton */}
      <section>
        <h2 className="font-serif text-2xl text-[var(--claude-ink)] mb-2"
            style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
          {m.home_latest_posts()}
        </h2>
        <div className="h-px bg-[var(--claude-hairline)] mb-8" />

        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              <div className="py-6 space-y-3">
                <Skeleton className="h-4 w-32 bg-[var(--claude-surface-card)]" />
                <Skeleton className="h-8 w-3/4 bg-[var(--claude-surface-card)]" />
                <Skeleton className="h-4 w-full bg-[var(--claude-surface-soft)]" />
                <Skeleton className="h-4 w-2/3 bg-[var(--claude-surface-soft)]" />
              </div>
              {i < 4 && <div className="h-px bg-[var(--claude-hairline)]" />}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
