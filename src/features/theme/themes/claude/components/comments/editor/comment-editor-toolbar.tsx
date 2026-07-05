import type { Editor } from "@tiptap/react"; import { Bold, Code, Image as ImageIcon, Italic, Link as LinkIcon, Redo, Strikethrough, Underline as UnderlineIcon, Undo } from "lucide-react";

const TBtn = ({ onClick, isActive, icon: Icon }: any) => (
  <button onClick={onClick} className={`p-1.5 rounded-[var(--geist-radius-sm)] transition-colors ${isActive ? "bg-[var(--geist-ink)] text-[var(--geist-canvas-elevated)]" : "text-[var(--geist-mute)] hover:bg-[var(--geist-hairline-soft)] hover:text-[var(--geist-ink)]"}`} type="button"><Icon size={14}/></button>
);

export default function CommentEditorToolbar({ editor, onLinkClick, onImageClick }: { editor: Editor; onLinkClick: () => void; onImageClick: () => void }) {
  const is = (attr: string) => editor.isActive(attr);
  return (<div className="flex items-center gap-0.5 p-1.5 border-b border-[var(--geist-hairline)] flex-wrap">
    <TBtn onClick={() => editor.chain().focus().toggleBold().run()} isActive={is("bold")} icon={Bold} />
    <TBtn onClick={() => editor.chain().focus().toggleItalic().run()} isActive={is("italic")} icon={Italic} />
    <TBtn onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={is("underline")} icon={UnderlineIcon} />
    <TBtn onClick={() => editor.chain().focus().toggleStrike().run()} isActive={is("strike")} icon={Strikethrough} />
    <div className="w-px h-5 bg-[var(--geist-hairline)] mx-0.5" />
    <TBtn onClick={() => editor.chain().focus().toggleCode().run()} isActive={is("code")} icon={Code} />
    <TBtn onClick={onLinkClick} icon={LinkIcon} />
    <TBtn onClick={onImageClick} icon={ImageIcon} />
    <div className="w-px h-5 bg-[var(--geist-hairline)] mx-0.5" />
    <TBtn onClick={() => editor.chain().focus().undo().run()} icon={Undo} />
    <TBtn onClick={() => editor.chain().focus().redo().run()} icon={Redo} />
  </div>);
}
