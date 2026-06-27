import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { FriendLinksPageProps } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";

export function FriendLinksPage({ links }: FriendLinksPageProps) {
  return (
    <div className="w-full max-w-3xl mx-auto pb-20 px-6">
      <header className="py-16 md:py-20 space-y-4">
        <h1
          className="text-4xl md:text-5xl font-serif text-[var(--claude-ink)] leading-tight"
          style={{ fontWeight: 400, letterSpacing: "-0.03em" }}
        >
          {m.friend_links_title()}
        </h1>
        <p className="text-lg text-[var(--claude-body)] leading-relaxed max-w-xl">
          {m.friend_links_desc()}
        </p>
      </header>

      <div className="min-h-50">
        {links.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-lg text-[var(--claude-muted)]">
              {m.friend_links_no_links()}
            </p>
            <p className="mt-2 text-sm text-[var(--claude-muted-soft)]">
              {m.friend_links_first_link()}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.siteUrl}
                target="_blank"
                rel="noreferrer"
                className="group p-5 rounded-[var(--claude-radius-lg)] border border-[var(--claude-hairline)] hover:border-[var(--claude-primary)] bg-[var(--claude-canvas)] transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-serif text-lg text-[var(--claude-ink)] group-hover:text-[var(--claude-primary)] transition-colors"
                      style={{ fontWeight: 400 }}
                    >
                      {link.siteName}
                    </h3>
                    {link.description && (
                      <p className="mt-1 text-sm text-[var(--claude-body)] line-clamp-2">
                        {link.description}
                      </p>
                    )}
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-[var(--claude-muted)] group-hover:text-[var(--claude-primary)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                  />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="mt-20 pt-10 border-t border-[var(--claude-hairline)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-[var(--claude-ink)]">
            {m.friend_links_join_title()}
          </h3>
          <p className="text-sm text-[var(--claude-body)]">
            {m.friend_links_join_desc()}
          </p>
        </div>

        <Link
          to="/submit-friend-link"
          className="claude-btn-secondary text-sm"
        >
          <span>{m.friend_links_apply()}</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}
