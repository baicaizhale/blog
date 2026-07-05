import { useState } from "react";
import type { UserLayoutProps } from "@/features/theme/contract/layouts";
import { Navbar } from "./navbar";
import { MobileMenu } from "./mobile-menu";
import { Footer } from "./footer";

export function UserLayout({ children, navOptions, user, isSessionLoading, logout }: UserLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="geist-theme min-h-screen flex flex-col bg-[var(--geist-canvas)]">
      <Navbar navOptions={navOptions} onMenuClick={() => setIsMenuOpen(true)} user={user} isLoading={isSessionLoading} />
      <MobileMenu navOptions={navOptions} isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} user={user} logout={logout} />
      <main className="flex-1">{children}</main>
      <Footer navOptions={navOptions} />
    </div>
  );
}
