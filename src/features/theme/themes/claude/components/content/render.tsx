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
        image: ({ node }) => { const a = node.attrs as any; return <ImageDisplay src={a.src} alt={(a.alt && a.alt !== "null" ? a.alt : null) || "blog image"} width={typeof a.width === "string" ? parseInt(a.width) : a.width} height={typeof a.height === "string" ? parseInt(a.height) : a.height} />; },
        codeBlock: ({ node }) => { const a = node.attrs as any; return <CodeBlock code={node.textContent || ""} language={a.language || null} highlightedHtml={a.highlightedHtml} />; },
        tableCell: ({ node, children }) => { const a = node.attrs as any; return <td colSpan={a.colspan} rowSpan={a.rowspan} style={a.style ? { width: a.style } : undefined}>{children}</td>; },
        tableHeader: ({ node, children }) => { const a = node.attrs as any; return <th colSpan={a.colspan} rowSpan={a.rowspan} style={a.style ? { width: a.style } : undefined}>{children}</th>; },
        inlineMath: ({ node }) => { const latex = (node.attrs as any).latex ?? ""; return <MathFormula latex={latex} mode="inline" />; },
        blockMath: ({ node }) => { const latex = (node.attrs as any).latex ?? ""; return <MathFormula latex={latex} mode="block" />; },
      },
    },
  });
}
