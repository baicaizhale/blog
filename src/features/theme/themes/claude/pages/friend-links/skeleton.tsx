import { Skeleton } from "@/components/ui/skeleton";
import { FriendLinkSkeleton } from "./friend-link-skeleton";

export function FriendLinksPageSkeleton() {
  return (<div className="w-full max-w-[48rem] mx-auto pb-20 px-6">
    <header className="py-20 space-y-4"><Skeleton className="h-10 w-48 bg-[var(--geist-hairline-soft)]" /><Skeleton className="h-5 w-64 bg-[var(--geist-hairline-soft)]" /></header>
    <div className="space-y-2">{[1,2,3,4].map(i => <FriendLinkSkeleton key={i} />)}</div>
  </div>);
}
