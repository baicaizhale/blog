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
      <div className="group">
        <Link
          to="/post/$slug"
          params={{ slug: post.slug }}
          className="block py-8 md:py-10 transition-all duration-300"
        >
          <article className="flex flex-col gap-3">
            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[var(--claude-muted)]">
              <time
                dateTime={post.publishedAt?.toISOString()}
                className="whitespace-nowrap text-sm"
              >
                <ClientOnly fallback="-">
                  {formatDate(post.publishedAt)}
                </ClientOnly>
              </time>
              {post.tags && post.tags.length > 0 && (
                <>
                  <span className="opacity-30">/</span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="claude-badge text-xs"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {isLoadingViews ? (
                <>
                  <span className="opacity-30">/</span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap text-[var(--claude-muted)]">
                    <Eye size={12} />
                    <Skeleton className="h-3 w-12 rounded" />
                  </span>
                </>
              ) : views !== undefined ? (
                <>
                  <span className="opacity-30">/</span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap text-[var(--claude-muted)]">
                    <Eye size={12} />
                    {m.post_views_count({ count: views })}
                  </span>
                </>
              ) : null}
            </div>

            {/* Title — serif, editorial */}
            <h3
              className="text-2xl md:text-3xl font-serif text-[var(--claude-ink)] group-hover:text-[var(--claude-primary)] transition-colors duration-300 flex items-center gap-3"
              style={{
                fontWeight: 400,
                letterSpacing: "-0.02em",
                viewTransitionName: `post-title-${post.slug}`,
              }}
            >
              {pinned && (
                <Pin
                  size={22}
                  className="text-[var(--claude-muted-soft)]"
                  strokeWidth={1.5}
                />
              )}
              <span className="line-clamp-2">{post.title}</span>
            </h3>

            {/* Summary */}
            <p className="text-[var(--claude-body)] leading-relaxed max-w-2xl line-clamp-2 text-base">
              {post.summary}
            </p>

            {/* Hairline separator */}
            <div className="mt-4 h-px bg-[var(--claude-hairline)]" />
          </article>
        </Link>
      </div>
    );
  },
);

PostCard.displayName = "PostCard";
