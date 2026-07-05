import { useSuspenseQuery } from "@tanstack/react-query"; import { ClientOnly, Link } from "@tanstack/react-router"; import { ArrowRight } from "lucide-react"; import { Skeleton } from "@/components/ui/skeleton"; import { relatedPostsQuery } from "@/features/posts/queries"; import { formatDate } from "@/lib/utils"; import { m } from "@/paraglide/messages"; import { config } from "../../../config";

export function RelatedPosts({ slug }: { slug: string }) {
  const { data: posts } = useSuspenseQuery(relatedPostsQuery(slug, config.post.relatedPostsLimit));
  if (!posts.length) return null;
  return (<section><h2 className="geist-eyebrow mb-6">{m.post_related_posts()}</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{posts.map(p => (
    <Link key={p.id} to="/post/$slug" params={{ slug: p.slug }} className="geist-card group flex flex-col gap-2">
      <span className="text-xs text-[var(--geist-mute)]"><ClientOnly fallback="-">{formatDate(p.publishedAt)}</ClientOnly></span>
      <h3 className="font-semibold text-[var(--geist-ink)] group-hover:text-[var(--geist-link)] transition-colors tracking-tight">{p.title}</h3>
      <span className="text-xs text-[var(--geist-mute)] mt-auto flex items-center gap-1">{m.post_read_more()}<ArrowRight size={12}/></span>
    </Link>
  ))}</div></section>);
}
export function RelatedPostsSkeleton() {
  return (<section><Skeleton className="h-4 w-32 mb-6 bg-[var(--geist-hairline-soft)]"/><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{[1,2,3].map(i => <div key={i} className="geist-card space-y-2"><Skeleton className="h-3 w-20 bg-[var(--geist-hairline-soft)]"/><Skeleton className="h-5 w-full bg-[var(--geist-hairline-soft)]"/><Skeleton className="h-5 w-2/3 bg-[var(--geist-hairline-soft)]"/></div>)}</div></section>);
}
