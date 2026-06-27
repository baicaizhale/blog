import { useRouteContext } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { PostsPageProps } from "@/features/theme/contract/pages";
import { PostCard } from "@/features/theme/themes/claude/components/post-card";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";

export const INITIAL_TAG_COUNT = 8;

export function PostsPage({
  posts,
  tags,
  selectedTag,
  onTagClick,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: PostsPageProps) {
  const { siteConfig } = useRouteContext({ from: "__root__" });
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMoreTags = tags.length > INITIAL_TAG_COUNT;
  const visibleTags = isExpanded ? tags : tags.slice(0, INITIAL_TAG_COUNT);

  const observerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "0px" },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="w-full max-w-3xl mx-auto pb-20 px-6">
      {/* Header */}
      <header className="py-16 md:py-20 space-y-4">
        <h1
          className="text-4xl md:text-5xl font-serif text-[var(--claude-ink)] leading-tight"
          style={{ fontWeight: 400, letterSpacing: "-0.03em" }}
        >
          {m.nav_posts()}
        </h1>
        <p className="text-lg text-[var(--claude-body)] leading-relaxed max-w-xl">
          {siteConfig.description}
        </p>
      </header>

      {/* Tag Filters */}
      <div className="mb-12">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <button
            onClick={() => onTagClick("")}
            className={cn(
              "text-sm transition-colors",
              !selectedTag
                ? "text-[var(--claude-ink)] font-medium"
                : "text-[var(--claude-muted)] hover:text-[var(--claude-ink)]",
            )}
            type="button"
          >
            {m.posts_all()}
          </button>

          {visibleTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagClick(tag.name)}
              className={cn(
                "text-sm transition-colors flex items-baseline gap-1",
                selectedTag === tag.name
                  ? "text-[var(--claude-ink)] font-medium"
                  : "text-[var(--claude-muted)] hover:text-[var(--claude-ink)]",
              )}
              type="button"
            >
              <span>{tag.name}</span>
              <span className="text-xs text-[var(--claude-muted-soft)]">
                ({tag.postCount})
              </span>
            </button>
          ))}

          {hasMoreTags && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-[var(--claude-muted-soft)] hover:text-[var(--claude-ink)] transition-colors ml-1"
              type="button"
            >
              {isExpanded
                ? `[${m.tags_collapse()}]`
                : `[${m.tags_expand()} ${tags.length - INITIAL_TAG_COUNT}]`}
            </button>
          )}
        </div>
      </div>

      {/* Posts List */}
      <div>
        {posts.length === 0 ? (
          <div className="py-20">
            <p className="font-serif text-xl text-[var(--claude-muted)]">
              {m.posts_no_posts()}
            </p>
          </div>
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* Load More */}
      <div
        ref={observerRef}
        className="py-16 flex flex-col items-center justify-center gap-6"
      >
        {isFetchingNextPage ? (
          <div className="flex flex-col items-center gap-4 animate-in fade-in">
            <div className="w-1.5 h-1.5 bg-[var(--claude-ink)] animate-ping rounded-full" />
            <span className="text-xs text-[var(--claude-muted)] uppercase tracking-widest">
              {m.posts_loading()}
            </span>
          </div>
        ) : hasNextPage ? (
          <div className="h-px w-24 bg-[var(--claude-hairline)]" />
        ) : posts.length > 0 ? (
          <div className="flex items-center gap-4 text-[var(--claude-muted-soft)]">
            <span className="h-px w-12 bg-current" />
            <span className="font-serif italic">{m.posts_end()}</span>
            <span className="h-px w-12 bg-current" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
