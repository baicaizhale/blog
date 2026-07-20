import { ClientOnly, Link } from "@tanstack/react-router"; import { Eye } from "lucide-react"; import { memo } from "react"; import { Skeleton } from "@/components/ui/skeleton"; import type { PostItem as PostItemType } from "@/features/posts/schema/posts.schema"; import { formatDate } from "@/lib/utils"; import { m } from "@/paraglide/messages";

interface PostCardProps { post: PostItemType; pinned?: boolean; views?: number; isLoadingViews?: boolean; }

export const PostCard = memo(({ post, pinned, views, isLoadingViews }: PostCardProps) => (
  <div className="group py-6 first:pt-4">
    <Link to="/post/$slug" params={{ slug: post.slug }} className="block">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--geist-mute)]">
          <time dateTime={post.publishedAt?.toISOString()}><ClientOnly fallback="-">{formatDate(post.publishedAt)}</ClientOnly></time>
          {post.tags && post.tags.length > 0 && <><span className="opacity-30">/</span>{post.tags.map(tag => <span key={tag.id} className="text-[var(--geist-mute)]">#{tag.name}</span>)}</>}
          {pinned && <><span className="opacity-30">/</span><span className="text-[var(--geist-link)]">Pinned</span></>}
          {isLoadingViews ? <><span className="opacity-30">/</span><span className="flex items-center gap-1"><Eye size={12} /><Skeleton className="h-3 w-12 rounded" /></span></> : views !== undefined ? <><span className="opacity-30">/</span><span className="flex items-center gap-1"><Eye size={12} />{m.post_views_count({ count: views })}</span></> : null}
        </div>
        <h3 className="text-xl font-semibold text-[var(--geist-ink)] group-hover:text-[var(--geist-link)] transition-colors tracking-tight" style={{ viewTransitionName: `post-title-${post.slug}` }}>{post.title}</h3>
        <p className="text-sm text-[var(--geist-body)] line-clamp-2">{post.summary}</p>
      </div>
    </Link>
  </div>
));
PostCard.displayName = "PostCard";
