import type { JSONContent } from "@tiptap/react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import { Loader2, Send } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { getCommentExtensions } from "@/features/comments/components/editor/config";
import { normalizeLinkHref } from "@/lib/links/normalize-link-href";
import { m } from "@/paraglide/messages";
import CommentEditorToolbar from "../editor/comment-editor-toolbar";
import type { ModalType } from "../editor/comment-insert-modal";
import InsertModal from "../editor/comment-insert-modal";

interface CommentEditorProps {
  onSubmit: (content: JSONContent) => Promise<void>;
  isSubmitting?: boolean;
  autoFocus?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
}

export const CommentEditor = ({
  onSubmit,
  isSubmitting,
  autoFocus,
  onCancel,
  submitLabel,
}: CommentEditorProps) => {
  const actualSubmitLabel = submitLabel || m.comments_editor_submit();

  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalInitialUrl, setModalInitialUrl] = useState("");

  const editor = useEditor({
    extensions: getCommentExtensions(),
    content: "",
    autofocus: autoFocus ? "end" : false,
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] w-full bg-transparent py-2 text-sm focus:outline-none placeholder:text-[var(--claude-muted-soft)] max-w-none",
      },
    },
  });

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isEmpty: ctx.editor?.isEmpty ?? true,
    }),
  });

  const handleSubmit = useCallback(async () => {
    if (!editor || editor.isEmpty) return;
    const content = editor.getJSON();
    await onSubmit(content);
    editor.commands.clearContent();
  }, [editor, onSubmit]);

  const handleLinkInsert = useCallback(
    (url: string, _initialUrl?: string) => {
      if (!editor) return;

      const normalized = normalizeLinkHref(url);
      if (_initialUrl) {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: normalized })
          .run();
      } else if (url) {
        editor.chain().focus().setLink({ href: normalized }).run();
      }
      setModalType(null);
    },
    [editor],
  );

  const handleImageInsert = useCallback(
    (url: string) => {
      if (!editor) return;
      editor.chain().focus().setImage({ src: url }).run();
      setModalType(null);
    },
    [editor],
  );

  return (
    <div className="border border-[var(--claude-hairline)] rounded-[var(--claude-radius-md)] overflow-hidden bg-[var(--claude-canvas)]">
      {editor && (
        <>
          <CommentEditorToolbar
            editor={editor}
            onLinkClick={() => {
              const previousUrl = editor.getAttributes("link").href;
              setModalInitialUrl(previousUrl ?? "");
              setModalType("link");
            }}
            onImageClick={() => setModalType("image")}
          />
          <div className="px-3">
            <EditorContent editor={editor} />
          </div>
        </>
      )}

      <InsertModal
        type={modalType}
        onClose={() => setModalType(null)}
        onInsert={modalType === "link" ? handleLinkInsert : handleImageInsert}
        initialUrl={modalInitialUrl}
      />

      <div className="flex items-center justify-end gap-2 px-3 py-2 border-t border-[var(--claude-hairline)]">
        {onCancel && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-[var(--claude-muted)] h-8 text-xs"
          >
            {m.common_cancel()}
          </Button>
        )}
        <button
          onClick={handleSubmit}
          disabled={editorState.isEmpty || isSubmitting}
          className="claude-btn-primary h-8 text-xs px-4"
          type="button"
        >
          {isSubmitting ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} />
          )}
          {actualSubmitLabel}
        </button>
      </div>
    </div>
  );
};
