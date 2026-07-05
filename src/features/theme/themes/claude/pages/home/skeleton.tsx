import { Skeleton } from "@/components/ui/skeleton";
export function HomePageSkeleton() {
  return (<div className="w-full max-w-[48rem] mx-auto px-6 pt-20 pb-32"><div className="mb-24 space-y-6"><Skeleton className="h-12 w-64 bg-[var(--geist-hairline-soft)]" /><Skeleton className="h-6 w-96 bg-[var(--geist-hairline-soft)]" /></div><div className="space-y-8">{[1,2,3,4].map(i => <div key={i} className="py-6 space-y-2 border-b border-[var(--geist-hairline)]"><Skeleton className="h-4 w-24 bg-[var(--geist-hairline-soft)]" /><Skeleton className="h-6 w-3/4 bg-[var(--geist-hairline-soft)]" /><Skeleton className="h-4 w-full bg-[var(--geist-hairline-soft)]" /></div>)}</div></div>);
}
