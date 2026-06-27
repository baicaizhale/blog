import { useInfiniteQuery } from "@tanstack/react-query";
import type { JSONContent } from "@tiptap/react";
import { useState } from "react";
import type { RootCommentWithReplyCount } from "@/features/comments/comments.schema";
import { repliesByRootIdInfiniteQuery } from "@/features/comments/queries";
import { m } from "@/paraglide/messages";
import { CommentItem } from "./comment-item";
import { CommentReplyForm } from "./comment-reply-form";

type RootCommentWithUser = RootCommentWithReplyCount;

interface CommentListProps {
  rootComments: Array<RootCommentWithUser>;
  postId: number;
  onReply?: (rootId: number, commentId: number, userName: string) => void;
  onDelete?: (commentId: number) => void;
  replyTarget?: { rootId: number; commentId: number; userName: string } | null;
  onCancelReply?: () => void;
  onSubmitReply?: (content: JSONContent) => Promise<void>;
  isSubmittingReply?: boolean;
  initialExpandedRootId?: number;
  highlightCommentId?: number;
}

export const CommentList = ({
  rootComments,
  postId,
  onReply,
  onDelete,
  replyTarget,
  onCancelReply,
  onSubmitReply,
  isSubmittingReply,
  initialExpandedRootId,
  highlightCommentId,
}: CommentListProps) => {
  const [expandedRoots, setExpandedRoots] = useState<Set<number>>(() =>
    initialExpandedRootId ? new Set([initialExpandedRootId]) : new Set(),
  );

  const handleToggleReplies = (rootId: number) => {
    setExpandedRoots((prev) => {
      const next = new Set(prev);
      if (next.has(rootId)) {
        next.delete(rootId);
      } else {
        next.add(rootId);
      }
      return next;
    });
  };

  return (
    <div>
      {rootComments.map((rootComment) => (
        <div key={rootComment.id}>
          <div className="group">
            <CommentItem
              comment={rootComment}
              onReply={onReply}
              onDelete={onDelete}
              highlightCommentId={highlightCommentId}
            />

            {/* Reply toggle button */}
            {((rootComment as { replyCount?: number }).replyCount ?? 0) > 0 && (
              <button
                onClick={() => handleToggleReplies(rootComment.id)}
                className="ml-12 md:ml-16 text-xs text-[var(--claude-muted)] hover:text-[var(--claude-primary)] transition-colors font-medium"
                type="button"
              >
                {expandedRoots.has(rootComment.id)
                  ? m.comments_list_collapse_replies()
                  : m.comments_list_expand_replies({
                      count: (rootComment as { replyCount?: number }).replyCount ?? 0,
                    })}
              </button>
            )}
          </div>

          {/* Expanded replies */}
          {expandedRoots.has(rootComment.id) && (
            <RepliesList
              rootId={rootComment.id}
              postId={postId}
              onReply={onReply}
              onDelete={onDelete}
              replyTarget={replyTarget}
              onCancelReply={onCancelReply}
              onSubmitReply={onSubmitReply}
              isSubmittingReply={isSubmittingReply}
              highlightCommentId={highlightCommentId}
            />
          )}

          {/* Inline reply form for this root */}
          {replyTarget?.rootId === rootComment.id && onSubmitReply && (
            <div className="ml-12 md:ml-16 mt-2">
              <CommentReplyForm
                parentUserName={replyTarget.userName}
                onSubmit={onSubmitReply}
                isSubmitting={isSubmittingReply ?? false}
                onCancel={onCancelReply ?? (() => {})}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

function RepliesList({
  rootId,
  postId,
  onReply,
  onDelete,
  replyTarget,
  onCancelReply,
  onSubmitReply,
  isSubmittingReply,
  highlightCommentId,
}: {
  rootId: number;
  postId: number;
  onReply?: (rootId: number, commentId: number, userName: string) => void;
  onDelete?: (commentId: number) => void;
  replyTarget?: { rootId: number; commentId: number; userName: string } | null;
  onCancelReply?: () => void;
  onSubmitReply?: (content: JSONContent) => Promise<void>;
  isSubmittingReply?: boolean;
  highlightCommentId?: number;
}) {
  const { data, isLoading } = useInfiniteQuery(
    repliesByRootIdInfiniteQuery(rootId, postId),
  );

  const replies = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading) {
    return (
      <div className="ml-12 md:ml-16 py-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-[var(--claude-surface-soft)] rounded w-3/4" />
          <div className="h-4 bg-[var(--claude-surface-soft)] rounded w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="ml-4 md:ml-8 border-l-2 border-[var(--claude-hairline)] pl-4 md:pl-8">
      {replies.map((reply) => (
        <div key={reply.id}>
          {replyTarget?.commentId === reply.id && onSubmitReply && (
            <div className="mb-2">
              <CommentReplyForm
                parentUserName={replyTarget.userName}
                onSubmit={onSubmitReply}
                isSubmitting={isSubmittingReply ?? false}
                onCancel={onCancelReply ?? (() => {})}
              />
            </div>
          )}

          <CommentItem
            comment={reply}
            onReply={onReply}
            onDelete={onDelete}
            isReply
            replyToName={reply.replyTo ? undefined : reply.user?.name}
            highlightCommentId={highlightCommentId}
          />
        </div>
      ))}
    </div>
  );
}
