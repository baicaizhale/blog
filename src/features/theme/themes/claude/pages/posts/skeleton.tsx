import { Skeleton } from "@/components/ui/skeleton";
export function PostsPageSkeleton() {
  return (<div className="w-full max-w-[48rem] mx-auto pb-20 px-6"><header className="py-20 space-y-4"><Skeleton className="h-10 w-32 bg-[var(--geist-hairline-soft)]" /><Skeleton className="h-5 w-64 bg-[var(--geist-hairline-soft)]" /></header><div className="space-y-6">{[1,2,3,4].map(i => <div key={i} className="py-6 space-y-2 border-b border-[var(--geist-hairline)]"><Skeleton className="h-4 w-20 bg-[var(--geist-hairline-soft)]" /><Skeleton className="h-6 w-3/4 bg-[var(--geist-hairline-soft)]" /><Skeleton className="h-4 w-full bg-[var(--geist-hairline-soft)]" /></div>)}</div></div>);
}
