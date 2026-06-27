import { useInfiniteQuery } from "@tanstack/react-query";
import { getRouteApi, Link } from "@tanstack/react-router";
import type { JSONContent } from "@tiptap/react";
import { LogIn } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Turnstile, useTurnstile } from "@/components/common/turnstile";
import ConfirmationModal from "@/components/ui/confirmation-modal";
import { useComments } from "@/features/comments/hooks/use-comments";
import { rootCommentsByPostIdInfiniteQuery } from "@/features/comments/queries";
import { authClient } from "@/lib/auth/auth.client";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";
import { CommentEditor } from "./comment-editor";
import { CommentList } from "./comment-list";
import { CommentSectionSkeleton } from "./comment-section-skeleton";

const routeApi = getRouteApi("/_public/post/$slug");

interface CommentSectionProps {
  postId: number;
  className?: string;
}

export const CommentSection = ({ postId, className }: CommentSectionProps) => {
  const { data: session } = authClient.useSession();
  const { rootId, highlightCommentId } = routeApi.useSearch();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      rootCommentsByPostIdInfiniteQuery(postId, session?.user.id),
    );

  const rootComments = data?.pages.flatMap((page) => page.items) ?? [];
  const totalCount = data?.pages[0]?.total ?? 0;

  const { createComment, deleteComment, isCreating, isDeleting } =
    useComments(postId);

  const [replyTarget, setReplyTarget] = useState<{
    rootId: number;
    commentId: number;
    userName: string;
  } | null>(null);

  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const {
    isPending: turnstilePending,
    reset: resetTurnstile,
    turnstileProps,
  } = useTurnstile("comment");

  const requireTurnstile = () => {
    if (!turnstilePending) return false;
    toast.error(m.comments_turnstile_required());
    turnstileRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    throw new Error("TURNSTILE_PENDING");
  };

  const handleCreateComment = async (content: JSONContent) => {
    requireTurnstile();
    try {
      await createComment({ data: { postId, content } });
    } finally {
      resetTurnstile();
    }
  };

  const handleCreateReply = async (content: JSONContent) => {
    if (!replyTarget) return;
    requireTurnstile();
    try {
      await createComment({
        data: {
          postId,
          content,
          rootId: replyTarget.rootId,
          replyToCommentId: replyTarget.commentId,
        },
      });
      setReplyTarget(null);
    } finally {
      resetTurnstile();
    }
  };

  const handleDelete = async () => {
    if (commentToDelete) {
      await deleteComment({ data: { id: commentToDelete } });
      setCommentToDelete(null);
    }
  };

  useEffect(() => {
    if (isLoading || !data) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleAnchor = () => {
      const hash = window.location.hash;
      if (!hash || !hash.startsWith("#comment-")) return;

      const commentId = parseInt(hash.replace("#comment-", ""), 10);
      if (isNaN(commentId)) return;

      let retries = 0;
      const maxRetries = 20;

      const attemptScroll = () => {
        const element = document.getElementById(`comment-${commentId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }
        if (retries < maxRetries) {
          retries++;
          timeoutId = setTimeout(attemptScroll, 200);
        }
      };

      attemptScroll();
    };

    handleAnchor();
    window.addEventListener("hashchange", handleAnchor);
    return () => {
      window.removeEventListener("hashchange", handleAnchor);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoading, data]);

  if (isLoading || !data) {
    return <CommentSectionSkeleton />;
  }

  return (
    <section
      className={cn(
        "space-y-10 mt-20 pt-10 border-t border-[var(--claude-hairline)] animate-in fade-in duration-700",
        className,
      )}
    >
      {/* Header with serif count */}
      <header>
        <h3
          className="font-serif text-2xl text-[var(--claude-ink)]"
          style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
        >
          {m.comments_count({ count: totalCount })}
        </h3>
      </header>

      {/* Main Editor */}
      {session ? (
        <CommentEditor
          onSubmit={handleCreateComment}
          isSubmitting={isCreating && !replyTarget}
        />
      ) : (
        <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-[var(--claude-muted)]">
            {m.comments_join_discussion()}
          </p>
          <Link to="/login">
            <button className="claude-btn-primary" type="button">
              <LogIn size={14} />
              {m.comments_login()}
            </button>
          </Link>
        </div>
      )}

      <div ref={turnstileRef}>
        <Turnstile {...turnstileProps} />
      </div>

      {/* Comments List */}
      <CommentList
        rootComments={rootComments}
        postId={postId}
        onReply={(rootIdArg, commentId, userName) =>
          setReplyTarget({ rootId: rootIdArg, commentId, userName })
        }
        onDelete={(id) => setCommentToDelete(id)}
        replyTarget={replyTarget}
        onCancelReply={() => setReplyTarget(null)}
        onSubmitReply={handleCreateReply}
        isSubmittingReply={isCreating}
        initialExpandedRootId={rootId}
        highlightCommentId={highlightCommentId}
      />

      {/* Load More */}
      {hasNextPage && (
        <div className="flex justify-center pt-6">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="claude-btn-secondary text-xs"
            type="button"
          >
            {isFetchingNextPage ? m.comments_loading() : m.comments_load_more()}
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!commentToDelete}
        onClose={() => setCommentToDelete(null)}
        onConfirm={handleDelete}
        title={m.comments_delete_title()}
        message={m.comments_delete_desc()}
        confirmLabel={m.comments_delete_confirm()}
        isDanger={true}
        isLoading={isDeleting}
      />
    </section>
  );
};
