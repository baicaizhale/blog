import type { FriendLinkWithUser } from "@/features/friend-links/friend-links.schema";

export function FriendLinkCard({ link }: { link: Omit<FriendLinkWithUser, "createdAt" | "updatedAt"> }) {
  const displayUrl = link.siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <a href={link.siteUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 p-4 rounded-[var(--geist-radius-sm)] hover:bg-[var(--geist-hairline-soft)] transition-colors border border-transparent hover:border-[var(--geist-hairline)]">
      <div className="shrink-0 w-10 h-10 rounded-[var(--geist-radius-sm)] bg-[var(--geist-hairline-soft)] border border-[var(--geist-hairline)] flex items-center justify-center overflow-hidden">
        {link.logoUrl ? <img src={link.logoUrl} alt={link.siteName} className="w-full h-full object-cover" loading="lazy" /> : <span className="text-sm font-medium text-[var(--geist-mute)]">{link.siteName.slice(0, 1)}</span>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-[var(--geist-ink)] truncate group-hover:underline decoration-[var(--geist-hairline)] underline-offset-2">{link.siteName}</h3>
          <span className="text-[10px] text-[var(--geist-mute)] hidden sm:block shrink-0">{displayUrl}</span>
        </div>
        {link.description && <p className="text-sm text-[var(--geist-body)] mt-1 line-clamp-2">{link.description}</p>}
      </div>
    </a>
  );
}
