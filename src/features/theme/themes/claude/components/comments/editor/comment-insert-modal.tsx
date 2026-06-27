import { Image, Link2, X } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { m } from "@/paraglide/messages";

export type ModalType = "link" | "image" | null;

interface InsertModalProps {
  type: ModalType;
  onClose: () => void;
  onInsert: (url: string, initialUrl?: string) => void;
  initialUrl?: string;
}

const InsertModal = memo(
  ({ type, onClose, onInsert, initialUrl }: InsertModalProps) => {
    const [url, setUrl] = useState(initialUrl ?? "");

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (url.trim()) {
          onInsert(url.trim(), initialUrl);
          setUrl("");
        }
      },
      [url, onInsert, initialUrl],
    );

    if (!type) return null;

    const isLink = type === "link";

    return (
      <div className="flex items-center gap-2 p-2 border-t border-[var(--claude-hairline)] bg-[var(--claude-surface-soft)]">
        {isLink ? (
          <Link2 size={14} className="text-[var(--claude-muted)] shrink-0" />
        ) : (
          <Image size={14} className="text-[var(--claude-muted)] shrink-0" />
        )}
        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={
              isLink
                ? m.comments_editor_modal_link_label()
                : m.comments_editor_modal_image_label()
            }
            className="claude-input h-8 text-sm"
            autoFocus
          />
          <button
            type="submit"
            className="claude-btn-primary h-8 text-xs px-3"
            disabled={!url.trim()}
          >
            {m.common_confirm()}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--claude-muted)] hover:text-[var(--claude-ink)] transition-colors"
          >
            <X size={16} />
          </button>
        </form>
      </div>
    );
  },
);

InsertModal.displayName = "InsertModal";

export default InsertModal;
