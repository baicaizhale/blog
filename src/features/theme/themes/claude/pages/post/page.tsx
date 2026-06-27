import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowUp, Pencil, Share2, Sparkles } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import type { PostPageProps } from "@/features/theme/contract/pages";
import { ContentRenderer } from "@/features/theme/themes/claude/components/content/content-renderer";
import { authClient } from "@/lib/auth/auth.client";
import { formatDate } from "@/lib/utils";
import { m } from "@/paraglide/messages";
import { CommentSection } from "../../components/comments/view/comment-section";
import { RelatedPosts, RelatedPostsSkeleton } from "./components/related-posts";
import TableOfContents from "./components/table-of-contents";

function ClientOnly({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  return <>{isMounted ? children : fallback}</>;
}

export function PostPage({ post }: PostPageProps) {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto pb-20 px-6">
      {/* Navigation */}
      <nav className="py-12 flex items-center justify-between">
        <button
          onClick={() => navigate({ to: "/posts" })}
          className="flex items-center gap-2 text-xs text-[var(--claude-muted)] hover:text-[var(--claude-ink)] transition-colors"
          type="button"
        >
          <ArrowLeft size={14} />
          <span>{m.post_back_to_list()}</span>
        </button>
        {session?.user.role === "admin" && (
          <Link
            to="/admin/posts/edit/$id"
            params={{ id: String(post.id) }}
            className="flex items-center gap-2 text-xs text-[var(--claude-muted)] hover:text-[var(--claude-ink)] transition-colors"
          >
            <Pencil size={14} />
            <span>{m.post_edit()}</span>
          </Link>
        )}
      </nav>

      <article>
        {/* Header */}
        <header className="space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--claude-muted)]">
            <time dateTime={post.publishedAt?.toISOString()}>
              <ClientOnly fallback={<span>-</span>}>
                {formatDate(post.publishedAt)}
              </ClientOnly>
            </time>
            <span className="opacity-30">/</span>
            <span>{m.read_time({ count: post.readTimeInMinutes })}</span>
            {post.tags && post.tags.length > 0 && (
              <>
                <span className="opacity-30">/</span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      to="/posts"
                      search={{ tagName: tag.name }}
                      className="text-[var(--claude-primary)] hover:text-[var(--claude-primary-active)] transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--claude-ink)] leading-tight"
            style={{
              fontWeight: 400,
              letterSpacing: "-0.03em",
              viewTransitionName: `post-title-${post.slug}`,
            }}
          >
            {post.title}
          </h1>

          {post.summary && (
            <div className="bg-[var(--claude-surface-card)] rounded-[var(--claude-radius-lg)] p-6 border border-[var(--claude-hairline)]">
              <div className="flex items-center gap-2 text-sm text-[var(--claude-muted)] mb-2">
                <Sparkles size={14} />
                <span className="uppercase tracking-wider text-xs">{m.post_summary_title()}</span>
              </div>
              <p className="text-lg leading-relaxed text-[var(--claude-body)] font-serif">
                {post.summary}
              </p>
            </div>
          )}
        </header>

        {/* Content */}
        <div className="relative">
          <aside className="hidden xl:block absolute left-full ml-12 top-0 h-full">
            <div className="sticky top-32 w-60">
              <TableOfContents headers={post.toc} />
            </div>
          </aside>

          <main className="max-w-none">
            <ContentRenderer content={post.contentJson} />

            <footer className="mt-20 pt-8 border-t border-[var(--claude-hairline)] flex flex-col md:flex-row justify-between items-center gap-6">
              <span className="text-sm text-[var(--claude-muted)]">
                {m.post_end_notice()}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                    .then(() => toast.success(m.post_share_success(), {
                      description: m.post_share_success_desc(),
                    }))
                    .catch(() => toast.error(m.post_share_error(), {
                      description: m.post_share_error_desc(),
                    }));
                }}
                className="flex items-center gap-2 text-sm text-[var(--claude-muted)] hover:text-[var(--claude-ink)] transition-colors"
                type="button"
              >
                <Share2 size={14} />
                <span>{m.post_share()}</span>
              </button>
            </footer>
          </main>
        </div>

        {/* Related Posts */}
        <div className="mt-20 pt-10 border-t border-[var(--claude-hairline)]">
          <Suspense fallback={<RelatedPostsSkeleton />}>
            <RelatedPosts slug={post.slug} />
          </Suspense>
        </div>

        {/* Comments */}
        <CommentSection postId={post.id} />
      </article>

      {/* Back to Top */}
      <div
        className={`fixed bottom-8 right-8 z-40 transition-all duration-500 ${
          showBackToTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col items-center gap-1 text-[var(--claude-muted)] hover:text-[var(--claude-ink)] transition-colors"
          type="button"
        >
          <ArrowUp size={16} />
          <span className="text-xs">{m.post_back_to_top()}</span>
        </button>
      </div>
    </div>
  );
}
