import type { JSONContent } from "@tiptap/react";
import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import { MathFormula } from "@/components/content/math-formula";
import { extensions } from "@/features/posts/editor/config";
import { CodeBlock } from "@/features/theme/themes/claude/components/content/code-block";
import { ImageDisplay } from "@/features/theme/themes/claude/components/content/image-display";

export function renderReact(content: JSONContent) {
  return renderToReactElement({
    extensions, content,
    options: {
      nodeMapping: {
        image: ({ node }) => { const a = node.attrs as Record<string, unknown>; return <ImageDisplay src={a.src as string} alt={(a.alt as string && (a.alt as string) !== "null" ? a.alt as string : null) || "blog image"} width={typeof a.width === "string" ? parseInt(a.width) : a.width as number} height={typeof a.height === "string" ? parseInt(a.height) : a.height as number} />; },
        codeBlock: ({ node }) => { const a = node.attrs as Record<string, unknown>; return <CodeBlock code={node.textContent || ""} language={(a.language as string) || null} highlightedHtml={a.highlightedHtml as string} />; },
        tableCell: ({ node, children }) => { const a = node.attrs as Record<string, unknown>; return <td colSpan={a.colspan as number} rowSpan={a.rowspan as number} style={a.style ? { width: a.style as string } : undefined}>{children}</td>; },
        tableHeader: ({ node, children }) => { const a = node.attrs as Record<string, unknown>; return <th colSpan={a.colspan as number} rowSpan={a.rowspan as number} style={a.style ? { width: a.style as string } : undefined}>{children}</th>; },
        inlineMath: ({ node }) => { const latex = (node.attrs as Record<string, unknown>).latex as string ?? ""; return <MathFormula latex={latex} mode="inline" />; },
        blockMath: ({ node }) => { const latex = (node.attrs as Record<string, unknown>).latex as string ?? ""; return <MathFormula latex={latex} mode="block" />; },
      },
    },
  });
}
