import { useSuspenseQuery } from "@tanstack/react-query";
import { ClientOnly, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { relatedPostsQuery } from "@/features/posts/queries";
import { formatDate } from "@/lib/utils";
import { m } from "@/paraglide/messages";
import { config } from "../../../config";

interface RelatedPostsProps {
  slug: string;
}

export function RelatedPosts({ slug }: RelatedPostsProps) {
  const { data: posts } = useSuspenseQuery(
    relatedPostsQuery(slug, config.post.relatedPostsLimit),
  );

  if (posts.length === 0) return null;

  return (
    <section className="space-y-6 animate-in fade-in duration-500 delay-300 fill-mode-both">
      <h3
        className="font-serif text-xl text-[var(--claude-ink)]"
        style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
      >
        {m.post_related_posts()}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            to="/post/$slug"
            params={{ slug: post.slug }}
            className="group flex flex-col h-full space-y-2 p-4 rounded-[var(--claude-radius-md)] border border-[var(--claude-hairline)] hover:border-[var(--claude-primary)] transition-colors bg-[var(--claude-canvas)]"
          >
            <div className="flex items-center gap-2 text-xs text-[var(--claude-muted)]">
              <ClientOnly fallback="-">
                {formatDate(post.publishedAt)}
              </ClientOnly>
            </div>

            <h4
              className="text-base font-serif text-[var(--claude-ink)] leading-snug group-hover:text-[var(--claude-primary)] transition-colors"
              style={{ fontWeight: 400 }}
            >
              {post.title}
            </h4>

            <div className="mt-auto pt-2 flex items-center gap-1 text-xs text-[var(--claude-muted)] group-hover:text-[var(--claude-primary)] transition-colors">
              <span>{m.post_read_more()}</span>
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function RelatedPostsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-6 w-32 bg-[var(--claude-surface-card)]" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 border border-[var(--claude-hairline)] rounded-[var(--claude-radius-md)] space-y-2">
            <Skeleton className="h-3 w-20 bg-[var(--claude-surface-card)]" />
            <Skeleton className="h-5 w-full bg-[var(--claude-surface-card)]" />
            <Skeleton className="h-5 w-2/3 bg-[var(--claude-surface-card)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
