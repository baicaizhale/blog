import { useInfiniteQuery } from "@tanstack/react-query"; import { getRouteApi, Link } from "@tanstack/react-router"; import type { JSONContent } from "@tiptap/react"; import { LogIn } from "lucide-react"; import { useEffect, useRef, useState } from "react"; import { toast } from "sonner"; import { Turnstile, useTurnstile } from "@/components/common/turnstile"; import ConfirmationModal from "@/components/ui/confirmation-modal"; import { useComments } from "@/features/comments/hooks/use-comments"; import { rootCommentsByPostIdInfiniteQuery } from "@/features/comments/queries"; import { authClient } from "@/lib/auth/auth.client"; import { cn } from "@/lib/utils"; import { m } from "@/paraglide/messages"; import { CommentEditor } from "./comment-editor"; import { CommentList } from "./comment-list"; import { CommentSectionSkeleton } from "./comment-section-skeleton";

const routeApi = getRouteApi("/_public/post/$slug");

export const CommentSection = ({ postId, className }: { postId: number; className?: string }) => {
  const { data: session } = authClient.useSession();
  const { rootId, highlightCommentId } = routeApi.useSearch();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(rootCommentsByPostIdInfiniteQuery(postId, session?.user.id));
  const rootComments = data?.pages.flatMap(p => p.items) ?? [];
  const totalCount = data?.pages[0]?.total ?? 0;
  const { createComment, deleteComment, isCreating, isDeleting } = useComments(postId);
  const [replyTarget, setReplyTarget] = useState<{ rootId: number; commentId: number; userName: string } | null>(null);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const { isPending: turnstilePending, reset: resetTurnstile, turnstileProps } = useTurnstile("comment");
  const requireTurnstile = () => { if (!turnstilePending) return false; toast.error(m.comments_turnstile_required()); turnstileRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); throw new Error("TURNSTILE_PENDING"); };

  const handleCreate = async (content: JSONContent) => { requireTurnstile(); try { await createComment({ data: { postId, content } }); } finally { resetTurnstile(); } };
  const handleReply = async (content: JSONContent) => { if (!replyTarget) return; requireTurnstile(); try { await createComment({ data: { postId, content, rootId: replyTarget.rootId, replyToCommentId: replyTarget.commentId } }); setReplyTarget(null); } finally { resetTurnstile(); } };
  const handleDelete = async () => { if (commentToDelete) { await deleteComment({ data: { id: commentToDelete } }); setCommentToDelete(null); } };

  useEffect(() => {
    if (isLoading || !data) return;
    let t: ReturnType<typeof setTimeout> | null = null;
    const fn = () => { const hash = window.location.hash; if (!hash?.startsWith("#comment-")) return; const id = parseInt(hash.replace("#comment-", ""), 10); if (isNaN(id)) return;
      let retries = 0; const attempt = () => { const el = document.getElementById(`comment-${id}`); if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); return; } if (retries < 20) { retries++; t = setTimeout(attempt, 200); } }; attempt(); };
    fn(); window.addEventListener("hashchange", fn); return () => { window.removeEventListener("hashchange", fn); if (t) clearTimeout(t); };
  }, [isLoading, data]);

  if (isLoading || !data) return <CommentSectionSkeleton />;
  return (<section className={cn("space-y-8 mt-16 pt-8 border-t border-[var(--geist-hairline)] animate-in fade-in", className)}>
    <h2 className="geist-eyebrow">{m.comments_count({ count: totalCount })}</h2>
    {session ? <CommentEditor onSubmit={handleCreate} isSubmitting={isCreating && !replyTarget} /> : (
      <div className="py-8 text-center space-y-3"><p className="text-sm text-[var(--geist-mute)]">{m.comments_join_discussion()}</p>
        <Link to="/login"><button className="geist-btn-primary-sm" type="button"><LogIn size={14}/>{m.comments_login()}</button></Link></div>
    )}
    <div ref={turnstileRef}><Turnstile {...turnstileProps} /></div>
    <CommentList rootComments={rootComments} postId={postId} onReply={(r: number, c: number, n: string) => setReplyTarget({ rootId: r, commentId: c, userName: n })} onDelete={(id: number) => setCommentToDelete(id)} replyTarget={replyTarget} onCancelReply={() => setReplyTarget(null)} onSubmitReply={handleReply} isSubmittingReply={isCreating} initialExpandedRootId={rootId} highlightCommentId={highlightCommentId} />
    {hasNextPage && <div className="flex justify-center"><button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className="geist-btn-ghost-sm">{isFetchingNextPage ? m.comments_loading() : m.comments_load_more()}</button></div>}
    <ConfirmationModal isOpen={!!commentToDelete} onClose={() => setCommentToDelete(null)} onConfirm={handleDelete} title={m.comments_delete_title()} message={m.comments_delete_desc()} confirmLabel={m.comments_delete_confirm()} isDanger isLoading={isDeleting} />
  </section>);
};
