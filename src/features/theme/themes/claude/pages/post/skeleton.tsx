import { Skeleton } from "@/components/ui/skeleton";
export function PostPageSkeleton() {
  return (
    <div className="w-full max-w-[48rem] mx-auto pb-20 px-6">
      <div className="py-12"><Skeleton className="h-6 w-24 bg-[var(--geist-hairline-soft)]" /></div>
      <div className="space-y-4"><Skeleton className="h-4 w-48 bg-[var(--geist-hairline-soft)]" /><Skeleton className="h-10 w-full bg-[var(--geist-hairline-soft)]" /><Skeleton className="h-10 w-3/4 bg-[var(--geist-hairline-soft)]" /><Skeleton className="h-24 w-full bg-[var(--geist-hairline-soft)] rounded-[var(--geist-radius-md)]" /></div>
      <div className="mt-10 space-y-3"><Skeleton className="h-4 w-full bg-[var(--geist-hairline-soft)]" /><Skeleton className="h-4 w-full bg-[var(--geist-hairline-soft)]" /><Skeleton className="h-4 w-3/4 bg-[var(--geist-hairline-soft)]" /></div>
    </div>
  );
}
