import { Image, Link2, X } from "lucide-react"; import { memo, useCallback, useState } from "react"; import { Input } from "@/components/ui/input"; import { m } from "@/paraglide/messages";
export type ModalType = "link" | "image" | null;

const InsertModal = memo(({ type, onClose, onInsert, initialUrl }: { type: ModalType; onClose: () => void; onInsert: (url: string, initialUrl?: string) => void; initialUrl?: string }) => {
  const [url, setUrl] = useState(initialUrl ?? "");
  const handleSubmit = useCallback((e: React.FormEvent) => { e.preventDefault(); if (url.trim()) { onInsert(url.trim(), initialUrl); setUrl(""); } }, [url, onInsert, initialUrl]);
  if (!type) return null;
  return (<div className="flex items-center gap-2 p-2 border-t border-[var(--geist-hairline)] bg-[var(--geist-hairline-soft)]">
    {type === "link" ? <Link2 size={14} className="text-[var(--geist-mute)] shrink-0" /> : <Image size={14} className="text-[var(--geist-mute)] shrink-0" />}
    <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2"><Input value={url} onChange={e => setUrl(e.target.value)} placeholder={type === "link" ? m.comments_editor_modal_link_label() : m.comments_editor_modal_image_label()} className="geist-input h-8 text-sm" autoFocus />
      <button type="submit" disabled={!url.trim()} className="geist-btn-primary-sm text-xs">{m.common_confirm()}</button>
      <button type="button" onClick={onClose} className="text-[var(--geist-mute)] hover:text-[var(--geist-ink)]"><X size={16}/></button>
    </form>
  </div>);
});
InsertModal.displayName = "InsertModal";
export default InsertModal;
