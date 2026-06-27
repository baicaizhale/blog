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
    return [...pinned, ...regular].filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
  }, [posts, pinnedPosts]);

  const allSlugs = useMemo(() => displayPosts.map((p) => p.slug), [displayPosts]);
  const { data: viewCounts, isPending: isPendingViewCounts } = useViewCounts(allSlugs);

  return (
    <div className="w-full max-w-[48rem] mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
      {/* ── Editorial Hero Section ── */}
      <section
        className="mb-20 md:mb-24"
        style={{ paddingBottom: "var(--claude-section-gap)" }}
      >
        {/* Serif display headline — 64px at desktop, 400 weight, negative tracking */}
        <h1
          className="text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-serif text-[var(--claude-ink)] leading-tight mb-8"
          style={{ fontWeight: 400, letterSpacing: "-0.03em" }}
        >
          {siteConfig.author}
        </h1>

        {/* Body lead — StyreneB body-strong, 18px-ish */}
        <p className="text-lg md:text-xl text-[var(--claude-body)] leading-relaxed max-w-[36rem] mb-10">
          {siteConfig.description}
        </p>

        {/* Social links row */}
        <div className="flex items-center gap-5 text-[var(--claude-muted)]">
          {siteConfig.social
            .filter((link) => link.url)
            .map((link, i) => {
              const preset = link.platform !== "custom" ? SOCIAL_PLATFORMS[link.platform] : null;
              const Icon = preset?.icon;
              const label = preset?.label ?? link.label ?? "";
              const href = resolveSocialHref(link.platform, link.url);
              return (
                <a key={`${link.platform}-${i}`} href={href}
                   target={link.platform === "email" ? undefined : "_blank"}
                   rel={link.platform === "email" ? undefined : "noreferrer"}
                   className="hover:text-[var(--claude-ink)] transition-colors"
                   aria-label={label}>
                  {Icon ? <Icon size={20} strokeWidth={1.5} /> : <img src={link.icon} alt={label} className="w-5 h-5" />}
                </a>
              );
            })}
        </div>
      </section>

      {/* ── Posts Section ── */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2
            className="font-serif text-2xl text-[var(--claude-ink)]"
            style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            {m.home_latest_posts()}
          </h2>
        </div>

        {displayPosts.length === 0 ? (
          <p className="text-[var(--claude-muted)] py-16 text-center">
            {m.posts_no_posts()}
          </p>
        ) : (
          <div className="divide-y divide-[var(--claude-hairline)]">
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
        )}

        {displayPosts.length > 0 && (
          <div className="mt-12">
            <Link to="/posts" className="claude-text-link text-sm">
              {m.nav_posts()} &rarr;
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
