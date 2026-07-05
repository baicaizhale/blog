import type { JSONContent } from "@tiptap/react"; import { useMemo } from "react"; import { renderReact } from "@/features/theme/themes/claude/components/content/render"; import { cn } from "@/lib/utils";
export function ContentRenderer({ content, className }: { content: JSONContent | null; className?: string }) {
  const rendered = useMemo(() => content ? renderReact(content) : null, [content]);
  if (!content) return null;
  return <div className={cn("ProseMirror geist-theme", className)}>{rendered}</div>;
}
