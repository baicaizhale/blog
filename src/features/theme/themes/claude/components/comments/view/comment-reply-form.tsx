import type { JSONContent } from "@tiptap/react"; import { m } from "@/paraglide/messages"; import { CommentEditor } from "./comment-editor";
interface CommentReplyFormProps { parentUserName: string; onSubmit: (content: JSONContent) => Promise<void>; isSubmitting: boolean; onCancel: () => void; className?: string; }
export const CommentReplyForm = ({ parentUserName, onSubmit, isSubmitting, onCancel }: CommentReplyFormProps) => (
  <div className="mt-4 animate-in fade-in"><div className="mb-2 flex items-center gap-2"><span className="text-xs text-[var(--geist-mute)]">{m.comments_item_reply()}</span><span className="text-sm font-medium text-[var(--geist-link)]">@{parentUserName}</span></div>
    <CommentEditor onSubmit={onSubmit} isSubmitting={isSubmitting} autoFocus onCancel={onCancel} submitLabel={m.comments_editor_submit_reply()} /></div>
);
