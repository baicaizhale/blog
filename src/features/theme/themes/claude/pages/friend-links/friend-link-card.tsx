import type { FriendLinkWithUser } from "@/features/friend-links/friend-links.schema";

interface FriendLinkCardProps {
  link: Omit<FriendLinkWithUser, "createdAt" | "updatedAt">;
}

export function FriendLinkCard({ link }: FriendLinkCardProps) {
  const displayUrl = link.siteUrl
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  return (
    <a
      href={link.siteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 p-4 rounded-[var(--claude-radius-lg)] hover:bg-[var(--claude-surface-soft)] transition-colors border border-transparent hover:border-[var(--claude-hairline)]"
    >
      {/* Logo */}
      <div className="shrink-0 w-10 h-10 rounded-md bg-[var(--claude-surface-card)] border border-[var(--claude-hairline)] flex items-center justify-center overflow-hidden">
        {link.logoUrl ? (
          <img
            src={link.logoUrl}
            alt={link.siteName}
            className="w-full h-full object-cover transition-all duration-300"
            loading="lazy"
          />
        ) : (
          <span className="text-sm font-serif font-medium text-[var(--claude-muted)]">
            {link.siteName.slice(0, 1)}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium text-[var(--claude-ink)] tracking-tight truncate group-hover:underline decoration-[var(--claude-hairline)] underline-offset-4 decoration-1">
            {link.siteName}
          </h3>
          <span className="text-[10px] font-mono text-[var(--claude-muted)] hidden sm:block truncate shrink-0">
            {displayUrl}
          </span>
        </div>

        <div className="min-h-[2.5em]">
          {link.description ? (
            <p className="text-sm text-[var(--claude-body)] leading-relaxed line-clamp-2">
              {link.description}
            </p>
          ) : null}
        </div>
      </div>
    </a>
  );
}
