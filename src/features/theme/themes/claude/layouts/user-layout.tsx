import { useState } from "react";
import type { UserLayoutProps } from "@/features/theme/contract/layouts";
import { Navbar } from "./navbar";
import { MobileMenu } from "./mobile-menu";
import { Footer } from "./footer";

export function UserLayout({
  children,
  navOptions,
  user,
  isSessionLoading,
  logout,
  isAuthenticated,
}: UserLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="claude-theme min-h-screen bg-[var(--claude-canvas)] flex items-center justify-center">
        <p className="text-[var(--claude-muted)]">Please log in to access this page.</p>
      </div>
    );
  }

  return (
    <div className="claude-theme min-h-screen flex flex-col bg-[var(--claude-canvas)]">
      <Navbar
        navOptions={navOptions}
        onMenuClick={() => setIsMenuOpen(true)}
        user={user}
        isLoading={isSessionLoading}
      />
      <MobileMenu
        navOptions={navOptions}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        user={user}
        logout={logout}
      />
      <main className="flex-1">{children}</main>
      <Footer navOptions={navOptions} />
    </div>
  );
}
