import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { FriendLinksPageProps } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";
import { FriendLinkCard } from "./friend-link-card";

export function FriendLinksPage({ links }: FriendLinksPageProps) {
  return (
    <div className="w-full max-w-[48rem] mx-auto pb-20 px-6">
      <header className="py-20 space-y-4">
        <h1 className="text-[2.5rem] md:text-[3rem] font-semibold text-[var(--geist-ink)] leading-tight" style={{ letterSpacing: "-0.12em" }}>{m.friend_links_title()}</h1>
        <p className="text-base text-[var(--geist-body)] max-w-xl">{m.friend_links_desc()}</p>
      </header>
      <div className="min-h-50">
        {links.length === 0 ? (
          <div className="py-20 text-center"><p className="text-[var(--geist-mute)]">{m.friend_links_no_links()}</p><p className="text-sm text-[var(--geist-faint)] mt-2">{m.friend_links_first_link()}</p></div>
        ) : (
          <div className="space-y-2">{links.map(link => <FriendLinkCard key={link.id} link={link} />)}</div>
        )}
      </div>
      <div className="mt-20 pt-10 border-t border-[var(--geist-hairline)] flex justify-between items-center gap-6">
        <div><h3 className="text-sm font-semibold text-[var(--geist-ink)]">{m.friend_links_join_title()}</h3><p className="text-sm text-[var(--geist-body)] mt-1">{m.friend_links_join_desc()}</p></div>
        <Link to="/submit-friend-link" className="geist-btn-secondary text-sm whitespace-nowrap">{m.friend_links_apply()}<ArrowUpRight size={14} /></Link>
      </div>
    </div>
  );
}
