import { Check, Copy } from "lucide-react"; import { memo, useState } from "react"; import { m } from "@/paraglide/messages";

const LM: Record<string, string> = { ts:"TypeScript",typescript:"TypeScript",js:"JavaScript",javascript:"JavaScript",jsx:"JSX",tsx:"TSX",py:"Python",go:"Go",rs:"Rust",rust:"Rust",java:"Java",cpp:"C++",css:"CSS",html:"HTML",json:"JSON",yaml:"YAML",sql:"SQL",sh:"Shell",bash:"Bash",md:"Markdown" };

export const CodeBlock = memo(({ code, language, highlightedHtml }: { code: string; language: string | null; highlightedHtml?: string }) => {
  const lang = language?.toLowerCase();
  const label = lang ? (lang==="text"||lang==="txt" ? m.common_plain_text() : LM[lang]||language) : m.common_plain_text();
  const fallback = `<pre class="shiki font-mono text-sm leading-relaxed text-[var(--geist-ink)] bg-transparent! p-0 m-0"><code>${code}</code></pre>`;
  const [copied, setCopied] = useState(false);
  return (
    <div className="geist-code-block my-8">
      <div className="geist-code-header">
        <span>{label}</span>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false),2000); }} type="button">{copied ? <><Check size={12}/><span>Copied</span></> : <><Copy size={12}/><span>Copy</span></>}</button>
      </div>
      <div className="geist-code-body"><div dangerouslySetInnerHTML={{ __html: highlightedHtml||fallback }} /></div>
    </div>
  );
});
CodeBlock.displayName = "CodeBlock";
