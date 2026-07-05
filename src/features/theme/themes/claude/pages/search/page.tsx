import { ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import type { SearchPageProps } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";

export function SearchPage({ query, results, isSearching, onQueryChange, onSelectPost, onBack }: SearchPageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 100); }, []);

  return (
    <div className="w-full max-w-[48rem] mx-auto px-6 py-20">
      <header className="mb-10"><button onClick={onBack} className="geist-btn-ghost-sm" type="button"><ArrowLeft size={14} />{m.search_back()}</button></header>
      <section className="mb-16">
        <div className="border-b border-[var(--geist-hairline)] pb-3 focus-within:border-[var(--geist-ink)] transition-colors">
          <label className="geist-eyebrow block mb-1">{m.search_input_label()}</label>
          <input ref={inputRef} type="text" value={query} onChange={e => onQueryChange(e.target.value)} placeholder="..." className="w-full bg-transparent text-3xl md:text-4xl font-semibold text-[var(--geist-ink)] placeholder:text-[var(--geist-hairline)] focus:outline-none" style={{ letterSpacing: "-0.02em" }} />
        </div>
      </section>
      <section className="space-y-4">
        {query.trim() !== "" && !isSearching && results.length === 0 && <p className="py-12 text-[var(--geist-mute)]">{m.search_no_results()} &ldquo;{query}&rdquo;</p>}
        {results.map(r => (
          <div key={r.post.id} onClick={() => onSelectPost(r.post.slug)} className="group cursor-pointer p-4 -mx-4 rounded-[var(--geist-radius-sm)] hover:bg-[var(--geist-hairline-soft)] transition-colors">
            <h4 className="text-lg font-semibold text-[var(--geist-mute)] group-hover:text-[var(--geist-ink)] transition-colors tracking-tight" style={{ viewTransitionName: `post-title-${r.post.slug}` }} dangerouslySetInnerHTML={{ __html: r.matches.title || r.post.title }} />
            <p className="text-sm text-[var(--geist-body)] line-clamp-2 mt-1" dangerouslySetInnerHTML={{ __html: r.matches.summary || r.post.summary || "" }} />
            {r.post.tags.length > 0 && <div className="flex gap-2 mt-2">{r.post.tags.map(tag => <span key={tag} className="geist-eyebrow !text-[10px]">{tag}</span>)}</div>}
          </div>
        ))}
      </section>
    </div>
  );
}
