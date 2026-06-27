import { ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import type { SearchPageProps } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";

export function SearchPage({
  query,
  results,
  isSearching,
  onQueryChange,
  onSelectPost,
  onBack,
}: SearchPageProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-16 md:py-24">
      <header className="flex items-center justify-between mb-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[var(--claude-muted)] hover:text-[var(--claude-ink)] transition-colors"
          type="button"
        >
          <ArrowLeft size={18} className="hover:-translate-x-1 transition-transform" />
          <span className="text-sm">{m.search_back()}</span>
        </button>
      </header>

      {/* Search Input */}
      <section className="mb-16">
        <div className="border-b border-[var(--claude-hairline)] pb-4 focus-within:border-[var(--claude-ink)] transition-all">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={m.search_input_label()}
            className="w-full bg-transparent text-3xl md:text-4xl font-serif text-[var(--claude-ink)] placeholder:text-[var(--claude-muted-soft)] focus:outline-none"
            style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
          />
        </div>
      </section>

      {/* Results */}
      <section className="space-y-6">
        {query.trim() !== "" && !isSearching && results.length === 0 && (
          <div className="py-12">
            <p className="font-serif text-lg text-[var(--claude-muted)]">
              {m.search_no_results()} &ldquo;{query}&rdquo;
            </p>
          </div>
        )}

        {results.map((result) => (
          <div
            key={result.post.id}
            onClick={() => onSelectPost(result.post.slug)}
            className="group cursor-pointer p-4 -mx-4 rounded-[var(--claude-radius-md)] hover:bg-[var(--claude-surface-soft)] transition-colors"
          >
            <div className="flex flex-col gap-2">
              <h4
                className="text-lg md:text-xl font-serif text-[var(--claude-muted)] group-hover:text-[var(--claude-ink)] transition-colors"
                style={{
                  fontWeight: 400,
                  viewTransitionName: `post-title-${result.post.slug}`,
                }}
                dangerouslySetInnerHTML={{
                  __html: result.matches.title || result.post.title,
                }}
              />

              <p
                className="text-sm text-[var(--claude-body)] line-clamp-2 opacity-60 group-hover:opacity-100 transition-opacity"
                dangerouslySetInnerHTML={{
                  __html: result.matches.summary || result.post.summary || "",
                }}
              />

              {result.post.tags.length > 0 && (
                <div className="flex gap-2 pt-1">
                  {result.post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="claude-badge text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
