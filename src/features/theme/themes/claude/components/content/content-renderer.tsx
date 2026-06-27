import type { JSONContent } from "@tiptap/react";
import { useMemo } from "react";
import { renderReact } from "@/features/theme/themes/claude/components/content/render";
import { cn } from "@/lib/utils";

interface ContentRendererProps {
  content: JSONContent | null;
  className?: string;
}

export function ContentRenderer({ content, className }: ContentRendererProps) {
  const renderedContent = useMemo(() => {
    if (!content) return null;
    return renderReact(content);
  }, [content]);

  if (!content) {
    return null;
  }

  return <div className={cn("ProseMirror claude-theme", className)}>{renderedContent}</div>;
}
