import type { JSONContent } from "@tiptap/react"; import { EditorContent, useEditor } from "@tiptap/react"; import { Loader2, Send } from "lucide-react"; import { useCallback, useState } from "react"; import { getCommentExtensions } from "@/features/comments/components/editor/config"; import { normalizeLinkHref } from "@/lib/links/normalize-link-href"; import { m } from "@/paraglide/messages"; import CommentEditorToolbar from "../editor/comment-editor-toolbar"; import type { ModalType } from "../editor/comment-insert-modal"; import InsertModal from "../editor/comment-insert-modal";

export const CommentEditor = ({ onSubmit, isSubmitting, autoFocus, onCancel, submitLabel }: { onSubmit: (content: JSONContent) => Promise<void>; isSubmitting?: boolean; autoFocus?: boolean; onCancel?: () => void; submitLabel?: string; }) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalInitialUrl, setModalInitialUrl] = useState("");
  const editor = useEditor({ extensions: getCommentExtensions(), content: "", autofocus: autoFocus ? "end" : false, editorProps: { attributes: { class: "min-h-[80px] w-full bg-transparent py-2 text-sm focus:outline-none" } } });
  const isEmpty = !editor || editor.isEmpty;

  const handleSubmit = useCallback(async () => { if (!editor || editor.isEmpty) return; await onSubmit(editor.getJSON()); editor.commands.clearContent(); }, [editor, onSubmit]);

  return (<div className="border border-[var(--geist-hairline)] rounded-[var(--geist-radius-sm)] overflow-hidden bg-[var(--geist-canvas-elevated)]">
    {editor && <><CommentEditorToolbar editor={editor} onLinkClick={() => { setModalInitialUrl(editor.getAttributes("link").href ?? ""); setModalType("link"); }} onImageClick={() => setModalType("image")} />
    <div className="px-3"><EditorContent editor={editor} /></div></>}
    <InsertModal type={modalType} onClose={() => setModalType(null)} onInsert={modalType === "link" ? (url, init) => { if (!editor) return; if (init) editor.chain().focus().extendMarkRange("link").setLink({ href: normalizeLinkHref(url) }).run(); else editor.chain().focus().setLink({ href: normalizeLinkHref(url) }).run(); setModalType(null); } : (url) => { editor?.chain().focus().setImage({ src: url }).run(); setModalType(null); }} initialUrl={modalInitialUrl} />
    <div className="flex items-center justify-end gap-2 px-3 py-2 border-t border-[var(--geist-hairline)]">
      {onCancel && <button onClick={onCancel} className="geist-btn-ghost-sm text-xs" type="button">{m.common_cancel()}</button>}
      <button onClick={handleSubmit} disabled={isEmpty || isSubmitting} className="geist-btn-primary-sm text-xs" type="button">{isSubmitting ? <Loader2 size={14} className="animate-spin"/> : <Send size={14}/>}{submitLabel || m.comments_editor_submit()}</button>
    </div>
  </div>);
};
