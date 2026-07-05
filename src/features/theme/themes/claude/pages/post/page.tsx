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

function ClientOnly({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return <>{mounted ? children : fallback}</>;
}

export function PostPage({ post }: PostPageProps) {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full max-w-[48rem] mx-auto pb-20 px-6">
      <nav className="py-12 flex items-center justify-between">
        <button onClick={() => navigate({ to: "/posts" })} className="geist-btn-ghost-sm" type="button"><ArrowLeft size={14} />{m.post_back_to_list()}</button>
        {session?.user.role === "admin" && <Link to="/admin/posts/edit/$id" params={{ id: String(post.id) }} className="geist-btn-ghost-sm"><Pencil size={14} />{m.post_edit()}</Link>}
      </nav>

      <article>
        <header className="mb-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--geist-mute)]">
            <time dateTime={post.publishedAt?.toISOString()}><ClientOnly fallback={<span>-</span>}>{formatDate(post.publishedAt)}</ClientOnly></time>
            <span className="opacity-30">/</span><span>{m.read_time({ count: post.readTimeInMinutes })}</span>
            {post.tags && post.tags.length > 0 && <><span className="opacity-30">/</span>{post.tags.map(tag => <Link key={tag.id} to="/posts" search={{ tagName: tag.name }} className="text-[var(--geist-link)] hover:underline">#{tag.name}</Link>)}</>}
          </div>
          <h1 className="text-[2rem] md:text-[2.5rem] font-semibold text-[var(--geist-ink)] leading-tight" style={{ letterSpacing: "-0.04em", viewTransitionName: `post-title-${post.slug}` }}>{post.title}</h1>
          {post.summary && <div className="geist-card flex items-start gap-3"><Sparkles size={16} className="shrink-0 mt-0.5 text-[var(--geist-link)]" /><p className="text-sm text-[var(--geist-body)]">{post.summary}</p></div>}
        </header>

        <div className="relative">
          <aside className="hidden xl:block absolute left-full ml-12 top-0 h-full">
            <div className="sticky top-32 w-56"><TableOfContents headers={post.toc} /></div>
          </aside>
          <main className="max-w-none"><ContentRenderer content={post.contentJson} />
            <footer className="mt-20 pt-8 border-t border-[var(--geist-hairline)] flex justify-between items-center">
              <span className="text-sm text-[var(--geist-mute)]">{m.post_end_notice()}</span>
              <button onClick={() => navigator.clipboard.writeText(window.location.href).then(() => toast.success(m.post_share_success(), { description: m.post_share_success_desc() })).catch(() => toast.error(m.post_share_error(), { description: m.post_share_error_desc() }))} className="geist-btn-ghost-sm" type="button"><Share2 size={14} />{m.post_share()}</button>
            </footer>
          </main>
        </div>

        <div className="mt-20 pt-10 border-t border-[var(--geist-hairline)]"><Suspense fallback={<RelatedPostsSkeleton />}><RelatedPosts slug={post.slug} /></Suspense></div>
        <CommentSection postId={post.id} />
      </article>

      <div className={`fixed bottom-8 right-8 z-40 transition-all duration-300 ${showBackToTop ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="geist-btn-ghost-sm" type="button"><ArrowUp size={14} />{m.post_back_to_top()}</button>
      </div>
    </div>
  );
}
