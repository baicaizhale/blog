import { ClientOnly } from "@tanstack/react-router"; import { memo, useMemo } from "react"; import { authClient } from "@/lib/auth/auth.client"; import { cn, formatDate } from "@/lib/utils"; import { m } from "@/paraglide/messages"; import { ExpandableContent } from "./expandable-content";

export const CommentItem = memo(({ comment, onReply, onDelete, isReply, replyToName, highlightCommentId, className }: any) => {
  const isHighlighted = highlightCommentId === comment.id;
  const { data: session } = authClient.useSession();
  const isAuthor = session?.user.id === comment.userId;
  const isAdmin = session?.user.role === "admin";
  const isBlogger = comment.user?.role === "admin";
  const content = useMemo(() => comment.status === "deleted" ? <p className="text-xs italic text-[var(--geist-mute)] py-1">{m.comments_item_deleted_content()}</p> : <ExpandableContent content={comment.content} className="text-sm text-[var(--geist-body)]" maxLines={6} />, [comment.content, comment.status]);

  return (<div id={`comment-${comment.id}`} className={cn("flex gap-3 py-6 scroll-mt-32 transition-colors", isReply ? "ml-3 pl-3 border-l border-[var(--geist-hairline)] md:ml-8 md:pl-8 md:border-l-0" : "border-b border-[var(--geist-hairline)]", isHighlighted && "bg-[var(--geist-hairline-soft)] -mx-4 px-4 rounded-[var(--geist-radius-sm)]", className)}>
    <div className="shrink-0 pt-1"><div className="w-8 h-8 rounded-full bg-[var(--geist-hairline-soft)] overflow-hidden flex items-center justify-center border border-[var(--geist-hairline)]">
      {comment.status === "deleted" ? <span className="text-[9px] text-[var(--geist-mute)]">X</span> : comment.user?.image ? <img src={comment.user.image} alt={comment.user.name} className="w-full h-full object-cover" /> : <span className="text-xs text-[var(--geist-mute)]">{comment.user?.name?.slice(0,1) || "?"}</span>}
    </div></div>
    <div className="flex-1 min-w-0 space-y-1">
      <div className="flex items-baseline justify-between gap-2"><div className="flex items-center gap-2"><span className="text-sm font-medium text-[var(--geist-ink)]">{comment.status === "deleted" ? m.comments_item_deleted_author() : comment.user?.name || m.comments_item_anonymous()}</span>
        {isBlogger && comment.status !== "deleted" && <span className="text-[10px] text-[var(--geist-link)] font-medium">Blogger</span>}
        {isReply && replyToName && <span className="text-xs text-[var(--geist-mute)]">{m.comments_item_reply_to({ name: comment.status === "deleted" ? m.comments_item_unknown() : replyToName })}</span>}
      </div><span className="text-xs text-[var(--geist-mute)]"><ClientOnly fallback="-">{formatDate(comment.createdAt)}</ClientOnly></span></div>
      {content}
      {comment.status !== "deleted" && <div className="flex items-center gap-4 pt-1"><button onClick={() => onReply?.(comment.rootId ?? comment.id, comment.id, comment.user?.name || m.comments_item_unknown_user())} className="text-xs text-[var(--geist-mute)] hover:text-[var(--geist-ink)]" type="button">{m.comments_item_reply()}</button>
        {(isAuthor || isAdmin) && <button onClick={() => onDelete?.(comment.id)} className="text-xs text-[var(--geist-mute)] hover:text-[var(--geist-error)]" type="button">{m.comments_item_delete()}</button>}
      </div>}
    </div>
  </div>);
});
CommentItem.displayName = "CommentItem";
