import { useRouteContext } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { PostsPageProps } from "@/features/theme/contract/pages";
import { PostCard } from "@/features/theme/themes/claude/components/post-card";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";

export const INITIAL_TAG_COUNT = 8;

export function PostsPage({ posts, tags, selectedTag, onTagClick, hasNextPage, isFetchingNextPage, fetchNextPage }: PostsPageProps) {
  const { siteConfig } = useRouteContext({ from: "__root__" });
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMoreTags = tags.length > INITIAL_TAG_COUNT;
  const visibleTags = isExpanded ? tags : tags.slice(0, INITIAL_TAG_COUNT);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage(); }, { threshold: 0.1 });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="w-full max-w-[48rem] mx-auto pb-20 px-6">
      <header className="py-20 space-y-4">
        <h1 className="text-[2.5rem] md:text-[3rem] font-semibold text-[var(--geist-ink)] leading-tight" style={{ letterSpacing: "-0.04em" }}>{m.nav_posts()}</h1>
        <p className="text-base text-[var(--geist-body)] max-w-xl">{siteConfig.description}</p>
      </header>

      <div className="mb-12">
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => onTagClick("")} className={cn("px-3 py-1.5 rounded-[var(--geist-radius-sm)] text-sm transition-colors", !selectedTag ? "bg-[var(--geist-ink)] text-[var(--geist-canvas-elevated)]" : "bg-[var(--geist-canvas-elevated)] border border-[var(--geist-hairline)] text-[var(--geist-body)] hover:border-[var(--geist-ink)]")} type="button">{m.posts_all()}</button>
          {visibleTags.map(tag => (
            <button key={tag.id} onClick={() => onTagClick(tag.name)} className={cn("px-3 py-1.5 rounded-[var(--geist-radius-sm)] text-sm transition-colors flex items-baseline gap-1", selectedTag === tag.name ? "bg-[var(--geist-ink)] text-[var(--geist-canvas-elevated)]" : "bg-[var(--geist-canvas-elevated)] border border-[var(--geist-hairline)] text-[var(--geist-body)] hover:border-[var(--geist-ink)]")} type="button">
              <span>{tag.name}</span><span className="text-xs opacity-60">({tag.postCount})</span>
            </button>
          ))}
          {hasMoreTags && <button onClick={() => setIsExpanded(!isExpanded)} className="text-xs text-[var(--geist-mute)] hover:text-[var(--geist-ink)]" type="button">{isExpanded ? `[- ${m.tags_collapse()}]` : `[+ ${m.tags_expand()} ${tags.length - INITIAL_TAG_COUNT}]`}</button>}
        </div>
      </div>

      <div className="divide-y divide-[var(--geist-hairline)]">
        {posts.length === 0 ? <p className="py-20 text-[var(--geist-mute)]">{m.posts_no_posts()}</p> : posts.map(post => <PostCard key={post.id} post={post} />)}
      </div>

      <div ref={observerRef} className="py-16 flex justify-center">
        {isFetchingNextPage ? <span className="text-xs text-[var(--geist-mute)]">{m.posts_loading()}</span> : hasNextPage ? <div className="h-px w-24 bg-[var(--geist-hairline)]" /> : posts.length > 0 ? <span className="text-sm text-[var(--geist-mute)] font-serif italic">{m.posts_end()}</span> : null}
      </div>
    </div>
  );
}
