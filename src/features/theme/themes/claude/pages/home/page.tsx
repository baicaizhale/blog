import { Link, useRouteContext } from "@tanstack/react-router";
import { useMemo } from "react";
import { resolveSocialHref, SOCIAL_PLATFORMS } from "@/features/config/utils/social-platforms";
import { useViewCounts } from "@/features/pageview/queries";
import type { HomePageProps } from "@/features/theme/contract/pages";
import { PostCard } from "@/features/theme/themes/claude/components/post-card";
import { m } from "@/paraglide/messages";

export function HomePage({ posts, pinnedPosts }: HomePageProps) {
  const { siteConfig } = useRouteContext({ from: "__root__" });
  const displayPosts = useMemo(() => {
    const pinned = (pinnedPosts ?? []).map(p => ({ ...p, isPinned: true }));
    const regular = posts.map(p => ({ ...p, isPinned: false }));
    const seen = new Set<number>();
    return [...pinned, ...regular].filter(p => { if (seen.has(p.id)) return false; seen.add(p.id); return true; });
  }, [posts, pinnedPosts]);
  const { data: vc, isPending: vcLoading } = useViewCounts(useMemo(() => displayPosts.map(p => p.slug), [displayPosts]));

  return (
    <div className="w-full max-w-[48rem] mx-auto px-6 pt-20 pb-32">
      <section className="mb-24">
        <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[3rem] font-semibold text-[var(--geist-ink)] leading-tight mb-6"
            style={{ letterSpacing: "-0.12em" }}>
          {siteConfig.author}
        </h1>
        <p className="text-base md:text-lg text-[var(--geist-body)] leading-relaxed max-w-[36rem] mb-8">
          {siteConfig.description}
        </p>
        <div className="flex items-center gap-4 text-[var(--geist-mute)]">
          {siteConfig.social.filter(l => l.url).map((link, i) => {
            const preset = link.platform !== "custom" ? SOCIAL_PLATFORMS[link.platform] : null;
            const href = resolveSocialHref(link.platform, link.url);
            return <a key={`${link.platform}-${i}`} href={href} target={link.platform === "email" ? undefined : "_blank"} rel={link.platform === "email" ? undefined : "noreferrer"} className="hover:text-[var(--geist-ink)] transition-colors" aria-label={preset?.label ?? link.label ?? ""}>
              {preset?.icon ? <preset.icon size={20} strokeWidth={1.5} /> : <img src={link.icon} alt="" className="w-5 h-5" />}
            </a>;
          })}
        </div>
      </section>

      <section>
        <div className="geist-eyebrow mb-8">{m.home_latest_posts()}</div>
        {displayPosts.length === 0 ? (
          <p className="text-[var(--geist-mute)] py-16 text-center">{m.posts_no_posts()}</p>
        ) : (
          <div className="divide-y divide-[var(--geist-hairline)]">
            {displayPosts.map(post => <PostCard key={post.id} post={post} pinned={post.isPinned} views={vc?.[post.slug]} isLoadingViews={vcLoading} />)}
          </div>
        )}
        {displayPosts.length > 0 && (
          <div className="mt-10"><Link to="/posts" className="text-sm text-[var(--geist-link)] hover:underline">{m.nav_posts()} &rarr;</Link></div>
        )}
      </section>
    </div>
  );
}
