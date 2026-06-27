export function FriendLinkSkeleton() {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-transparent animate-pulse">
      <div className="shrink-0 w-10 h-10 rounded-md bg-[var(--claude-surface-card)]" />
      <div className="flex-1 space-y-2 py-0.5">
        <div className="flex justify-between gap-4">
          <div className="h-4 w-1/3 bg-[var(--claude-surface-card)] rounded" />
          <div className="h-3 w-1/4 bg-[var(--claude-surface-soft)] rounded hidden sm:block" />
        </div>
        <div className="space-y-1.5 pt-1">
          <div className="h-3 w-full bg-[var(--claude-surface-soft)] rounded" />
          <div className="h-3 w-4/5 bg-[var(--claude-surface-soft)] rounded" />
        </div>
      </div>
    </div>
  );
}
