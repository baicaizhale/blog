import { ClientOnly, Link } from "@tanstack/react-router";
import { Eye, Pin } from "lucide-react";
import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { PostItem as PostItemType } from "@/features/posts/schema/posts.schema";
import { formatDate } from "@/lib/utils";
import { m } from "@/paraglide/messages";

interface PostCardProps {
  post: PostItemType;
  pinned?: boolean;
  views?: number;
  isLoadingViews?: boolean;
}

export const PostCard = memo(
  ({ post, pinned, views, isLoadingViews }: PostCardProps) => {
    return (
      <div className="group py-8 first:pt-4">
        <Link
          to="/post/$slug"
          params={{ slug: post.slug }}
          className="block"
        >
          <article className="flex flex-col gap-3">
            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[var(--claude-muted)]">
              <time dateTime={post.publishedAt?.toISOString()}>
                <ClientOnly fallback="-">
                  {formatDate(post.publishedAt)}
                </ClientOnly>
              </time>

              {post.tags && post.tags.length > 0 && (
                <>
                  <span className="text-[var(--claude-hairline)]">&middot;</span>
                  {post.tags.map((tag) => (
                    <span key={tag.id} className="claude-badge">
                      {tag.name}
                    </span>
                  ))}
                </>
              )}

              {pinned && (
                <span className="claude-badge-coral flex items-center gap-1">
                  <Pin size={10} /> Pinned
                </span>
              )}

              {isLoadingViews ? (
                <>
                  <span className="text-[var(--claude-hairline)]">&middot;</span>
                  <span className="flex items-center gap-1">
                    <Eye size={12} />
                    <Skeleton className="h-3 w-12 rounded" />
                  </span>
                </>
              ) : views !== undefined ? (
                <>
                  <span className="text-[var(--claude-hairline)]">&middot;</span>
                  <span className="flex items-center gap-1">
                    <Eye size={12} />
                    {m.post_views_count({ count: views })}
                  </span>
                </>
              ) : null}
            </div>

            {/* Title — Serif display, coral hover */}
            <h3
              className="text-xl md:text-2xl font-serif text-[var(--claude-ink)] group-hover:text-[var(--claude-primary)] transition-colors duration-200"
              style={{
                fontWeight: 400,
                letterSpacing: "-0.02em",
                viewTransitionName: `post-title-${post.slug}`,
              }}
            >
              {post.title}
            </h3>

            {/* Summary — Body text */}
            <p className="text-[var(--claude-body)] leading-relaxed line-clamp-2 text-sm md:text-base">
              {post.summary}
            </p>
          </article>
        </Link>
      </div>
    );
  },
);

PostCard.displayName = "PostCard";
