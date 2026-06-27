import { Link, useRouteContext } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import type { NavOption, UserInfo } from "@/features/theme/contract/layouts";
import { m } from "@/paraglide/messages";
import { LanguageSwitcher } from "./language-switcher";

interface NavbarProps {
  navOptions: Array<NavOption>;
  onMenuClick: () => void;
  isLoading?: boolean;
  user?: UserInfo;
}

export function Navbar({
  onMenuClick,
  user,
  navOptions,
  isLoading,
}: NavbarProps) {
  const { siteConfig } = useRouteContext({ from: "__root__" });
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 flex items-center transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--claude-canvas)]/80 backdrop-blur-md border-b border-[var(--claude-hairline)] shadow-sm"
            : "bg-[var(--claude-canvas)] border-transparent"
        }`}
        style={{ height: "4rem" }}
      >
        <div
          className="w-full max-w-[75rem] mx-auto px-6 flex items-center justify-between"
        >
          {/* Left: Brand — serif, no bracket decoration, just the name */}
          <Link to="/" className="group select-none">
            <span
              className="font-serif text-xl tracking-tight text-[var(--claude-ink)] transition-opacity group-hover:opacity-70"
              style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
            >
              {siteConfig.theme.claude.navBarName}
            </span>
          </Link>

          {/* Center: Main Nav — StyreneB 14px/500 */}
          <nav className="hidden lg:flex items-center gap-8">
            {navOptions.map((option) => (
              <Link
                key={option.id}
                to={option.to}
                className="text-sm font-medium text-[var(--claude-muted)] hover:text-[var(--claude-ink)] transition-colors"
                activeProps={{ className: "!text-[var(--claude-ink)]" }}
              >
                {option.label}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-1">
            <LanguageSwitcher className="text-[var(--claude-muted)] hover:text-[var(--claude-ink)] h-8 w-8" />
            <Link
              to="/search"
              className="text-[var(--claude-muted)] hover:text-[var(--claude-ink)] h-8 w-8 flex items-center justify-center transition-colors"
              aria-label={m.nav_search()}
            >
              <Search size={16} strokeWidth={1.5} />
            </Link>
            <ThemeToggle />

            <div className="hidden md:flex items-center ml-4 pl-4 border-l border-[var(--claude-hairline)]">
              {isLoading ? (
                <Skeleton className="w-8 h-8 rounded-full" />
              ) : user ? (
                <Link
                  to="/profile"
                  className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-[var(--claude-hairline)] hover:ring-[var(--claude-primary)] transition-all"
                >
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[var(--claude-surface-soft)] flex items-center justify-center">
                      <span className="text-xs text-[var(--claude-muted)]">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </Link>
              ) : (
                <Link to="/login" className="claude-btn-primary text-xs h-8">
                  {m.nav_login()}
                </Link>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="w-8 h-8 flex flex-col items-center justify-center gap-1.5 group lg:hidden ml-3"
              onClick={onMenuClick}
              aria-label={m.common_open_menu()}
              type="button"
            >
              <div className="w-5 h-px bg-[var(--claude-ink)] transition-all group-hover:w-3" />
              <div className="w-5 h-px bg-[var(--claude-ink)] transition-all group-hover:w-6" />
            </button>
          </div>
        </div>
      </header>
      {/* Spacer to push content below fixed nav */}
      <div style={{ height: "4rem" }} />
    </>
  );
}
