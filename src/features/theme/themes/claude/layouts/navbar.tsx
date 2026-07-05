import { Link, useRouteContext } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import type { NavOption, UserInfo } from "@/features/theme/contract/layouts";
import { m } from "@/paraglide/messages";
import { LanguageSwitcher } from "./language-switcher";

interface NavbarProps { navOptions: NavOption[]; onMenuClick: () => void; isLoading?: boolean; user?: UserInfo; }

export function Navbar({ onMenuClick, user, navOptions, isLoading }: NavbarProps) {
  const { siteConfig } = useRouteContext({ from: "__root__" });
  const [isScrolled] = useState(false);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 flex items-center h-16 transition-all duration-200 ${
        isScrolled ? "bg-[var(--geist-canvas)]/90 backdrop-blur-md border-b border-[var(--geist-hairline)]" : "bg-[var(--geist-canvas)]"
      }`}>
        <div className="w-full max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="font-semibold text-[var(--geist-ink)] tracking-tight select-none" style={{ fontSize: "1rem", letterSpacing: "-0.04em" }}>
            {siteConfig.theme.claude.navBarName}
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navOptions.map((opt) => (
              <Link key={opt.id} to={opt.to}
                className="text-sm text-[var(--geist-body)] hover:text-[var(--geist-ink)] transition-colors"
                activeProps={{ className: "!text-[var(--geist-ink)]" }}>
                {opt.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher className="text-[var(--geist-mute)] hover:text-[var(--geist-ink)]" />
            <Link to="/search" className="text-[var(--geist-mute)] hover:text-[var(--geist-ink)] p-1" aria-label={m.nav_search()}>
              <Search size={16} strokeWidth={1.5} />
            </Link>
            <ThemeToggle />

            <div className="hidden md:flex items-center ml-3 pl-3 border-l border-[var(--geist-hairline)] gap-2">
              {isLoading ? <Skeleton className="w-7 h-7 rounded-full" /> : user ? (
                <Link to="/profile" className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-[var(--geist-hairline)]">
                  {user.image ? <img src={user.image} alt={user.name} className="w-full h-full object-cover" /> : (
                    <div className="w-full h-full bg-[var(--geist-hairline-soft)] flex items-center justify-center">
                      <span className="text-xs text-[var(--geist-mute)]">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                </Link>
              ) : (
                <Link to="/login" className="geist-btn-primary-sm">{m.nav_login()}</Link>
              )}
            </div>

            <button className="w-8 h-8 flex flex-col items-center justify-center gap-1.5 md:hidden ml-1" onClick={onMenuClick} type="button" aria-label={m.common_open_menu()}>
              <div className="w-5 h-px bg-[var(--geist-ink)]" />
              <div className="w-5 h-px bg-[var(--geist-ink)]" />
            </button>
          </div>
        </div>
      </header>
      <div className="h-16" />
    </>
  );
}
