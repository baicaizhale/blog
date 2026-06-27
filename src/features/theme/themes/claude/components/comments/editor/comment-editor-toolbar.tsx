import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import {
  Bold,
  Code,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  Redo,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo,
} from "lucide-react";
import type React from "react";
import { m } from "@/paraglide/messages";

interface CommentEditorToolbarProps {
  editor: Editor;
  onLinkClick: () => void;
  onImageClick: () => void;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  icon: LucideIcon;
  label?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  isActive,
  icon: Icon,
  label,
}) => (
  <button
    onClick={onClick}
    className={clsx(
      "p-1.5 rounded-[var(--claude-radius-xs)] transition-all duration-200 flex items-center justify-center",
      isActive
        ? "bg-[var(--claude-ink)] text-[var(--claude-on-dark)]"
        : "text-[var(--claude-muted)] hover:bg-[var(--claude-surface-soft)] hover:text-[var(--claude-ink)]",
    )}
    title={label}
    type="button"
  >
    <Icon size={14} />
  </button>
);

const ToolbarDivider = () => (
  <div className="w-px h-5 bg-[var(--claude-hairline)] mx-0.5" />
);

export default function CommentEditorToolbar({
  editor,
  onLinkClick,
  onImageClick,
}: CommentEditorToolbarProps) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive("bold") ?? false,
      isItalic: ctx.editor?.isActive("italic") ?? false,
      isStrike: ctx.editor?.isActive("strike") ?? false,
      isUnderline: ctx.editor?.isActive("underline") ?? false,
      isCode: ctx.editor?.isActive("code") ?? false,
      canUndo: ctx.editor?.can().undo() ?? false,
      canRedo: ctx.editor?.can().redo() ?? false,
    }),
  });

  return (
    <div className="flex items-center gap-0.5 p-1.5 border-b border-[var(--claude-hairline)] flex-wrap">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editorState.isBold}
        icon={Bold}
        label={m.comments_editor_toolbar_bold()}
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editorState.isItalic}
        icon={Italic}
        label={m.comments_editor_toolbar_italic()}
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editorState.isUnderline}
        icon={UnderlineIcon}
        label={m.comments_editor_toolbar_underline()}
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editorState.isStrike}
        icon={Strikethrough}
        label={m.comments_editor_toolbar_strike()}
      />
      <ToolbarDivider />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editorState.isCode}
        icon={Code}
        label={m.comments_editor_toolbar_code()}
      />
      <ToolbarButton
        onClick={onLinkClick}
        icon={LinkIcon}
        label={m.comments_editor_toolbar_link()}
      />
      <ToolbarButton
        onClick={onImageClick}
        icon={ImageIcon}
        label={m.comments_editor_toolbar_image()}
      />
      <ToolbarDivider />
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        icon={Undo}
        label={m.comments_editor_toolbar_undo()}
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        icon={Redo}
        label={m.comments_editor_toolbar_redo()}
      />
    </div>
  );
}
