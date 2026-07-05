import type { JSONContent } from "@tiptap/react"; import { useEffect, useRef, useState } from "react"; import { cn } from "@/lib/utils"; import { m } from "@/paraglide/messages"; import { renderCommentReact } from "./comment-render";

export function ExpandableContent({ content, className, maxLines = 3 }: { content: JSONContent | null; className?: string; maxLines?: number }) {
  const [expanded, setExpanded] = useState(false); const [showBtn, setShowBtn] = useState(false); const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (ref.current) setShowBtn(ref.current.scrollHeight > ref.current.clientHeight); }, [content]);
  return (<div className={cn(className)}>
    <div ref={ref} className="transition-all" style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: expanded ? "unset" : maxLines, overflow: "hidden" }}>{renderCommentReact(content)}</div>
    {showBtn && <button onClick={() => setExpanded(!expanded)} className="text-xs text-[var(--geist-mute)] hover:text-[var(--geist-link)] mt-1" type="button">{expanded ? m.common_collapse() : m.common_expand_all()}</button>}
  </div>);
}
