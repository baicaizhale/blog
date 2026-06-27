import { Check, Copy } from "lucide-react";
import { memo, useState } from "react";
import { m } from "@/paraglide/messages";

const LANGUAGE_MAP: Record<string, string> = {
  ts: "TypeScript",
  typescript: "TypeScript",
  js: "JavaScript",
  javascript: "JavaScript",
  jsx: "JSX",
  tsx: "TSX",
  py: "Python",
  python: "Python",
  rb: "Ruby",
  ruby: "Ruby",
  go: "Go",
  rs: "Rust",
  rust: "Rust",
  java: "Java",
  cpp: "C++",
  c: "C",
  php: "PHP",
  css: "CSS",
  html: "HTML",
  json: "JSON",
  yaml: "YAML",
  xml: "XML",
  sql: "SQL",
  sh: "Shell",
  bash: "Bash",
  md: "Markdown",
};

interface CodeBlockProps {
  code: string;
  language: string | null;
  highlightedHtml?: string;
}

export const CodeBlock = memo(
  ({ code, language, highlightedHtml }: CodeBlockProps) => {
    const fallback = `<pre class="shiki font-mono text-sm leading-relaxed whitespace-pre-wrap text-[var(--claude-on-dark)] bg-transparent! p-0 m-0 border-0"><code>${code}</code></pre>`;
    const html = highlightedHtml || fallback;

    const [copied, setCopied] = useState(false);

    const normalizedLanguage = language?.toLowerCase();
    const displayLanguage = normalizedLanguage
      ? normalizedLanguage === "text" || normalizedLanguage === "txt"
        ? m.common_plain_text()
        : LANGUAGE_MAP[normalizedLanguage] || language
      : m.common_plain_text();

    const handleCopy = () => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="claude-card-dark my-10 group relative max-w-full overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--claude-on-dark-soft)] font-mono">
              {displayLanguage}
            </span>
          </div>

          <button
            onClick={handleCopy}
            aria-label={m.common_copy_code()}
            className="flex items-center gap-2 text-xs text-[var(--claude-on-dark-soft)] hover:text-[var(--claude-on-dark)] transition-colors"
            type="button"
          >
            {copied ? (
              <span className="animate-in fade-in slide-in-from-right-1">
                {m.common_copied()}
              </span>
            ) : null}
            {copied ? <Check size={12} /> : <Copy size={12} />}
          </button>
        </div>

        {/* Code area — scrollable */}
        <div className="overflow-x-auto text-sm font-mono leading-relaxed">
          <div
            className="[&>pre]:m-0 [&>pre]:min-w-full [&>pre]:w-fit [&>pre>code]:p-0"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    );
  },
);

CodeBlock.displayName = "CodeBlock";
