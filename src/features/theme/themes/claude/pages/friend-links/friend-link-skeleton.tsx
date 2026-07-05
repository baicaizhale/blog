export function FriendLinkSkeleton() {
  return (
    <div className="flex items-start gap-4 p-4 animate-pulse">
      <div className="shrink-0 w-10 h-10 rounded-[var(--geist-radius-sm)] bg-[var(--geist-hairline-soft)]" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/3 bg-[var(--geist-hairline-soft)] rounded" />
        <div className="h-3 w-full bg-[var(--geist-hairline-soft)] rounded" />
      </div>
    </div>
  );
}
