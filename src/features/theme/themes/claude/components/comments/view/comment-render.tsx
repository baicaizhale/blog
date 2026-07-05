import type { JSONContent } from "@tiptap/react"; import { renderToReactElement } from "@tiptap/static-renderer/pm/react"; import { getCommentExtensions } from "@/features/comments/components/editor/config"; import { ImageDisplay } from "../../content/image-display";
export function renderCommentReact(content: JSONContent | null) {
  if (!content) return null;
  return renderToReactElement({ extensions: getCommentExtensions(), content, options: { nodeMapping: { image: ({ node }) => { const a = node.attrs as Record<string, unknown>; return <ImageDisplay src={a.src as string} alt={(a.alt as string && (a.alt as string) !== "null" ? a.alt as string : null) || "comment image"} width={typeof a.width === "string" ? parseInt(a.width) : a.width as number} height={typeof a.height === "string" ? parseInt(a.height) : a.height as number} />; } } } });
}
