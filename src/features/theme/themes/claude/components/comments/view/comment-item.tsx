import { ClientOnly } from "@tanstack/react-router";
import { memo, useMemo } from "react";
import type { CommentWithUser } from "@/features/comments/comments.schema";
import { authClient } from "@/lib/auth/auth.client";
import { cn, formatDate } from "@/lib/utils";
import { m } from "@/paraglide/messages";
import { ExpandableContent } from "./expandable-content";

interface CommentItemProps {
  comment: CommentWithUser;
  onReply?: (rootId: number, commentId: number, userName: string) => void;
  onDelete?: (commentId: number) => void;
  isReply?: boolean;
  replyToName?: string | null;
  highlightCommentId?: number;
  className?: string;
}

export const CommentItem = memo(
  ({
    comment,
    onReply,
    onDelete,
    isReply,
    replyToName,
    highlightCommentId,
    className,
  }: CommentItemProps) => {
    const isHighlighted = highlightCommentId === comment.id;

    const { data: session } = authClient.useSession();

    const isAuthor = session?.user.id === comment.userId;
    const isAdmin = session?.user.role === "admin";
    const isBlogger = comment.user?.role === "admin";

    const renderedContent = useMemo(() => {
      if (comment.status === "deleted") {
        return (
          <p className="text-xs italic text-[var(--claude-muted)] py-1">
            {m.comments_item_deleted_content()}
          </p>
        );
      }
      return (
        <ExpandableContent
          content={comment.content}
          className="py-1 text-sm leading-relaxed text-[var(--claude-body)]"
          maxLines={6}
        />
      );
    }, [comment.content, comment.status]);

    return (
      <div
        id={`comment-${comment.id}`}
        className={cn(
          "group flex gap-3 md:gap-5 py-6 md:py-8 scroll-mt-32 transition-colors duration-500",
          isReply
            ? "ml-3 pl-3 border-l border-[var(--claude-hairline)] md:ml-8 md:pl-8 md:border-l-0"
            : "border-b border-[var(--claude-hairline)]",
          isHighlighted && "bg-[var(--claude-surface-soft)] -mx-4 px-4 rounded-[var(--claude-radius-sm)]",
          className,
        )}
      >
        {/* Avatar */}
        <div className="shrink-0 pt-1">
          <div className="w-8 h-8 rounded-full bg-[var(--claude-surface-soft)] overflow-hidden flex items-center justify-center border border-[var(--claude-hairline)]">
            {comment.status === "deleted" ? (
              <span className="text-[9px] font-mono text-[var(--claude-muted)] uppercase opacity-30">
                X
              </span>
            ) : comment.user?.image ? (
              <img
                src={comment.user.image}
                alt={comment.user.name ?? m.comments_item_anonymous()}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[10px] font-mono text-[var(--claude-muted)] uppercase">
                {comment.user?.name?.slice(0, 1) || "?"}
              </span>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[var(--claude-ink)]">
                {comment.status === "deleted"
                  ? m.comments_item_deleted_author()
                  : comment.user?.name || m.comments_item_anonymous()}
              </span>
              {isBlogger && comment.status !== "deleted" && (
                <span className="claude-badge-coral !text-[9px] !px-1.5 !py-0.5">
                  {m.comments_item_blogger()}
                </span>
              )}

              {isReply && replyToName && (
                <span className="text-[10px] text-[var(--claude-muted)] font-mono">
                  {m.comments_item_reply_to({
                    name:
                      comment.status === "deleted"
                        ? m.comments_item_unknown()
                        : replyToName,
                  })}
                </span>
              )}
            </div>
            <span className="text-[9px] font-mono text-[var(--claude-muted-soft)] uppercase tracking-widest">
              <ClientOnly fallback="-">
                {formatDate(comment.createdAt, { includeTime: true })}
              </ClientOnly>
            </span>
          </div>

          {renderedContent}

          {comment.status !== "deleted" && (
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => {
                  const rootId = comment.rootId ?? comment.id;
                  onReply?.(
                    rootId,
                    comment.id,
                    comment.user?.name || m.comments_item_unknown_user(),
                  );
                }}
                className="text-[9px] uppercase tracking-widest font-bold text-[var(--claude-muted)] hover:text-[var(--claude-ink)] transition-colors"
                type="button"
              >
                {m.comments_item_reply()}
              </button>

              {(isAuthor || isAdmin) && (
                <button
                  onClick={() => onDelete?.(comment.id)}
                  className="text-[9px] uppercase tracking-widest font-bold text-[var(--claude-muted)] hover:text-[var(--claude-error)] transition-colors"
                  type="button"
                >
                  {m.comments_item_delete()}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);

CommentItem.displayName = "CommentItem";
