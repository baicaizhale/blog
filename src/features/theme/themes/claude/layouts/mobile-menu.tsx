import { Link, useRouteContext } from "@tanstack/react-router";
import { LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NavOption, UserInfo } from "@/features/theme/contract/layouts";
import { m } from "@/paraglide/messages";

interface MobileMenuProps {
  navOptions: Array<NavOption>;
  isOpen: boolean;
  onClose: () => void;
  user?: UserInfo;
  logout: () => Promise<void>;
}

export function MobileMenu({
  navOptions,
  isOpen,
  onClose,
  user,
  logout,
}: MobileMenuProps) {
  const { siteConfig } = useRouteContext({ from: "__root__" });

  return (
    <div
      className={`fixed inset-0 z-100 transition-all duration-500 ease-in-out ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop with cream canvas */}
      <div
        className="absolute inset-0 bg-[var(--claude-canvas)]"
        onClick={onClose}
      />

      {/* Content Container */}
      <div
        className={`relative h-full w-full flex flex-col p-8 md:p-16 transition-all duration-500 delay-75 ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <span
            className="font-serif text-2xl tracking-tight text-[var(--claude-ink)]"
            style={{ fontWeight: 400, letterSpacing: "-0.03em" }}
          >
            {siteConfig.theme.claude.navBarName}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-12 h-12 rounded-full text-[var(--claude-muted)] hover:text-[var(--claude-ink)] hover:bg-transparent transition-all"
          >
            <X size={24} strokeWidth={1.5} />
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col justify-center space-y-8">
          {navOptions.map((item, idx) => (
            <Link
              key={item.id}
              to={item.to}
              onClick={onClose}
              className={`group transition-all duration-500 ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
              activeProps={{
                className: "!text-[var(--claude-ink)]",
              }}
              style={{ transitionDelay: isOpen ? `${50 + idx * 50}ms` : "0ms" }}
            >
              {({ isActive }) => (
                <span
                  className={`font-serif text-4xl md:text-5xl tracking-tight transition-colors ${
                    isActive
                      ? "text-[var(--claude-ink)]"
                      : "text-[var(--claude-muted)] group-hover:text-[var(--claude-ink)]"
                  }`}
                  style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
                >
                  {item.label}
                </span>
              )}
            </Link>
          ))}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              onClick={onClose}
              className={`group transition-all duration-500 ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
              style={{
                transitionDelay: isOpen
                  ? `${100 + navOptions.length * 75}ms`
                  : "0ms",
              }}
            >
              <span
                className="font-serif text-4xl md:text-5xl tracking-tight text-[var(--claude-muted)] group-hover:text-[var(--claude-ink)] transition-colors"
                style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
              >
                {m.profile_admin_dashboard()}
              </span>
            </Link>
          )}
        </nav>

        {/* Footer: User Info / Login */}
        <div
          className={`transition-all duration-500 border-t border-[var(--claude-hairline)] pt-8 ${
            isOpen
              ? "opacity-100 translate-y-0 delay-500"
              : "opacity-0 translate-y-4"
          }`}
        >
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--claude-surface-soft)] overflow-hidden">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-[var(--claude-muted)]">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-[var(--claude-ink)]">
                    {user.name}
                  </span>
                  <Link
                    to="/profile"
                    onClick={onClose}
                    className="text-xs text-[var(--claude-muted)] hover:text-[var(--claude-primary)] transition-colors"
                  >
                    {m.profile_title()}
                  </Link>
                </div>
              </div>

              <button
                onClick={async () => {
                  await logout();
                  onClose();
                }}
                className="text-[var(--claude-muted)] hover:text-[var(--claude-error)] transition-colors"
                type="button"
              >
                <LogOut size={20} strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="text-sm font-medium text-[var(--claude-muted)] hover:text-[var(--claude-ink)] transition-colors"
            >
              {m.nav_login()}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
