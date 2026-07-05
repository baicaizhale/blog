import { Skeleton } from "@/components/ui/skeleton";
export function CommentSectionSkeleton({ count = 3 }: { count?: number }) {
  return (<div className="space-y-4 py-4">{[...Array(count)].map((_, i) => <div key={i} className="flex gap-3"><Skeleton className="w-8 h-8 rounded-full shrink-0 bg-[var(--geist-hairline-soft)]"/><div className="flex-1 space-y-2"><Skeleton className="h-3 w-24 bg-[var(--geist-hairline-soft)]"/><Skeleton className="h-4 w-full bg-[var(--geist-hairline-soft)]"/></div></div>)}</div>);
}
