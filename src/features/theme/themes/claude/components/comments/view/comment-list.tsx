import { useState } from "react";
import type { RootCommentWithReplyCount } from "@/features/comments/comments.schema";
import { repliesByRootIdInfiniteQuery } from "@/features/comments/queries";
import { m } from "@/paraglide/messages";
import { CommentItem } from "./comment-item";
import { CommentReplyForm } from "./comment-reply-form";
import { useInfiniteQuery } from "@tanstack/react-query";

export const CommentList = ({ rootComments, postId, onReply, onDelete, replyTarget, onCancelReply, onSubmitReply, isSubmittingReply, initialExpandedRootId, highlightCommentId }: any) => {
  const [expanded, setExpanded] = useState<Set<number>>(() => initialExpandedRootId ? new Set([initialExpandedRootId]) : new Set());
  const toggle = (id: number) => setExpanded(p => { const n = new Set(p); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  return (<div>{rootComments.map((rc: RootCommentWithReplyCount) => <div key={rc.id}>
    <CommentItem comment={rc} onReply={onReply} onDelete={onDelete} highlightCommentId={highlightCommentId} />
    {(rc.replyCount ?? 0) > 0 && <button onClick={() => toggle(rc.id)} className="ml-12 md:ml-16 text-xs text-[var(--geist-mute)] hover:text-[var(--geist-ink)] transition-colors" type="button">
      {expanded.has(rc.id) ? m.comments_list_collapse_replies() : m.comments_list_expand_replies({ count: rc.replyCount })}
    </button>}
    {expanded.has(rc.id) && <RepliesList rootId={rc.id} postId={postId} onReply={onReply} onDelete={onDelete} replyTarget={replyTarget} onCancelReply={onCancelReply} onSubmitReply={onSubmitReply} isSubmittingReply={isSubmittingReply} highlightCommentId={highlightCommentId} />}
    {replyTarget?.rootId === rc.id && onSubmitReply && <div className="ml-12 md:ml-16 mt-2"><CommentReplyForm parentUserName={replyTarget.userName} onSubmit={onSubmitReply} isSubmitting={isSubmittingReply || false} onCancel={onCancelReply || (() => {})} /></div>}
  </div>)}</div>);
};

function RepliesList({ rootId, postId, onReply, onDelete, replyTarget, onCancelReply, onSubmitReply, isSubmittingReply, highlightCommentId }: any) {
  const { data, isLoading } = useInfiniteQuery(repliesByRootIdInfiniteQuery(rootId, postId));
  const replies = data?.pages.flatMap(p => p.items) ?? [];
  if (isLoading) return <div className="ml-12 md:ml-16 py-4 text-sm text-[var(--geist-mute)]">Loading...</div>;
  return (<div className="ml-4 md:ml-8 border-l-2 border-[var(--geist-hairline)] pl-4 md:pl-8">
    {replies.map((reply: any) => <div key={reply.id}>
      {replyTarget?.commentId === reply.id && onSubmitReply && <div className="mb-2"><CommentReplyForm parentUserName={replyTarget.userName} onSubmit={onSubmitReply} isSubmitting={isSubmittingReply || false} onCancel={onCancelReply || (() => {})} /></div>}
      <CommentItem comment={reply} onReply={onReply} onDelete={onDelete} isReply replyToName={reply.replyTo ? undefined : reply.user?.name} highlightCommentId={highlightCommentId} />
    </div>)}
  </div>);
}
