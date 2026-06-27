import { Link, useRouteContext } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  resolveSocialHref,
  SOCIAL_PLATFORMS,
} from "@/features/config/utils/social-platforms";
import { useViewCounts } from "@/features/pageview/queries";
import type { HomePageProps } from "@/features/theme/contract/pages";
import { PostCard } from "@/features/theme/themes/claude/components/post-card";
import { m } from "@/paraglide/messages";

export function HomePage({ posts, pinnedPosts }: HomePageProps) {
  const { siteConfig } = useRouteContext({ from: "__root__" });

  const displayPosts = useMemo(() => {
    const pinned = (pinnedPosts ?? []).map((p) => ({ ...p, isPinned: true }));
    const regular = posts.map((p) => ({ ...p, isPinned: false }));
    const seen = new Set<number>();
    const merged = [];
    for (const p of [...pinned, ...regular]) {
      if (!seen.has(p.id)) {
        seen.add(p.id);
        merged.push(p);
      }
    }
    return merged;
  }, [posts, pinnedPosts]);

  const allSlugs = useMemo(
    () => displayPosts.map((p) => p.slug),
    [displayPosts],
  );
  const { data: viewCounts, isPending: isPendingViewCounts } =
    useViewCounts(allSlugs);

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-16 md:py-24">
      {/* Editorial Hero */}
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

        {/* Social Links */}
        <div className="flex items-center gap-5 mt-8 text-[var(--claude-muted)]">
          {siteConfig.social
            .filter((link) => link.url)
            .map((link, i) => {
              const preset =
                link.platform !== "custom"
                  ? SOCIAL_PLATFORMS[link.platform]
                  : null;
              const Icon = preset?.icon;
              const label = preset?.label ?? link.label ?? "";
              const href = resolveSocialHref(link.platform, link.url);

              return (
                <a
                  key={`${link.platform}-${i}`}
                  href={href}
                  target={link.platform === "email" ? undefined : "_blank"}
                  rel={link.platform === "email" ? undefined : "noreferrer"}
                  className="hover:text-[var(--claude-ink)] transition-colors"
                  aria-label={label}
                >
                  {Icon ? (
                    <Icon size={20} strokeWidth={1.5} />
                  ) : (
                    <img src={link.icon} alt={label} className="w-5 h-5" />
                  )}
                </a>
              );
            })}
        </div>
      </section>

      {/* Recent Posts */}
      <section>
        <h2
          className="font-serif text-2xl text-[var(--claude-ink)] mb-2"
          style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
        >
          {m.home_latest_posts()}
        </h2>
        <div className="claude-hairline mb-8" />

        <div>
          {displayPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              pinned={post.isPinned}
              views={viewCounts?.[post.slug]}
              isLoadingViews={isPendingViewCounts}
            />
          ))}
        </div>

        {displayPosts.length > 0 && (
          <div className="mt-10">
            <Link
              to="/posts"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--claude-primary)] hover:text-[var(--claude-primary-active)] transition-colors"
            >
              {m.nav_posts()} &rarr;
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
