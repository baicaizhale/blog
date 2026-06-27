import { Check, Copy } from "lucide-react";
import { memo, useState } from "react";
import { m } from "@/paraglide/messages";

const LANGUAGE_MAP: Record<string, string> = {
  ts: "TypeScript", typescript: "TypeScript", js: "JavaScript", javascript: "JavaScript",
  jsx: "JSX", tsx: "TSX", py: "Python", python: "Python", rb: "Ruby", ruby: "Ruby",
  go: "Go", rs: "Rust", rust: "Rust", java: "Java", cpp: "C++", c: "C", php: "PHP",
  css: "CSS", html: "HTML", json: "JSON", yaml: "YAML", xml: "XML", sql: "SQL",
  sh: "Shell", bash: "Bash", md: "Markdown",
};

interface CodeBlockProps { code: string; language: string | null; highlightedHtml?: string; }

export const CodeBlock = memo(({ code, language, highlightedHtml }: CodeBlockProps) => {
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
    <div className="claude-card-code-window my-12 max-w-full">
      {/* Header bar — language + copy */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-[var(--claude-on-dark-soft)]">
          {displayLanguage}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-[var(--claude-on-dark-soft)] hover:text-[var(--claude-on-dark)] transition-colors"
          type="button"
          aria-label={m.common_copy_code()}
        >
          {copied ? <><Check size={12} />{m.common_copied()}</> : <><Copy size={12} />{m.common_copy_code()}</>}
        </button>
      </div>
      {/* Code area — dark-soft surface inside dark card */}
      <div className="bg-[var(--claude-surface-dark-soft)] rounded-[var(--claude-radius-sm)] overflow-x-auto [&>pre]:p-5 [&>pre]:m-0 [&>pre>code]:p-0">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
});

CodeBlock.displayName = "CodeBlock";
