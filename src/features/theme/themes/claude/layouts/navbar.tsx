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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 flex items-center transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--claude-canvas)]/80 backdrop-blur-md border-b border-[var(--claude-hairline)] py-3 shadow-sm"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-5xl mx-auto w-full px-6 flex items-center justify-between">
          {/* Left: Brand */}
          <Link to="/" className="group select-none">
            <span
              className="font-serif text-2xl tracking-tight text-[var(--claude-ink)]"
              style={{ fontWeight: 400, letterSpacing: "-0.03em" }}
            >
              {siteConfig.theme.claude.navBarName}
            </span>
          </Link>

          {/* Center: Main Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navOptions.map((option) => (
              <Link
                key={option.id}
                to={option.to}
                className="text-sm font-medium text-[var(--claude-muted)] hover:text-[var(--claude-ink)] transition-colors"
                activeProps={{
                  className: "!text-[var(--claude-ink)]",
                }}
              >
                {option.label}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher className="text-[var(--claude-muted)] hover:text-[var(--claude-ink)] h-8 w-8" />
              <Link
                to="/search"
                className="text-[var(--claude-muted)] hover:text-[var(--claude-ink)] h-8 w-8 flex items-center justify-center transition-colors"
                aria-label={m.nav_search()}
              >
                <Search size={16} strokeWidth={1.5} />
              </Link>
            </div>

            {/* Profile / Menu Toggle */}
            <div className="flex items-center gap-3 pl-3">
              <div className="hidden md:flex items-center">
                {isLoading ? (
                  <Skeleton className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="flex items-center gap-3 animate-in fade-in">
                    {user ? (
                      <Link
                        to="/profile"
                        className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-[var(--claude-hairline)] hover:ring-[var(--claude-primary)] transition-all relative z-10"
                      >
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[var(--claude-surface-soft)] flex items-center justify-center">
                            <span className="text-xs text-[var(--claude-muted)]">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </Link>
                    ) : (
                      <Link
                        to="/login"
                        className="claude-btn-primary text-xs"
                      >
                        {m.nav_login()}
                      </Link>
                    )}
                  </div>
                )}
              </div>

              <button
                className="w-8 h-8 flex flex-col items-center justify-center gap-1.5 group lg:hidden"
                onClick={onMenuClick}
                aria-label={m.common_open_menu()}
                type="button"
              >
                <div className="w-5 h-px bg-[var(--claude-ink)] transition-all group-hover:w-3" />
                <div className="w-5 h-px bg-[var(--claude-ink)] transition-all group-hover:w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="h-24" />
    </>
  );
}
