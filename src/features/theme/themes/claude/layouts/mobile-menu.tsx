import { Link } from "@tanstack/react-router";
import { LogOut, X } from "lucide-react";
import type { NavOption, UserInfo } from "@/features/theme/contract/layouts";
import { m } from "@/paraglide/messages";

interface MobileMenuProps { navOptions: NavOption[]; isOpen: boolean; onClose: () => void; user?: UserInfo; logout: () => Promise<void>; }

export function MobileMenu({ navOptions, isOpen, onClose, user, logout }: MobileMenuProps) {
  return (
    <div className={`fixed inset-0 z-100 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <div className="absolute inset-0 bg-[var(--geist-canvas-elevated)]" onClick={onClose} />
      <div className="relative h-full flex flex-col p-8">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-[var(--geist-mute)] hover:text-[var(--geist-ink)]" type="button"><X size={24} /></button>
        </div>
        <nav className="flex-1 flex flex-col justify-center space-y-8">
          {navOptions.map((item) => (
            <Link key={item.id} to={item.to} onClick={onClose}
              className="text-2xl font-semibold text-[var(--geist-mute)] hover:text-[var(--geist-ink)] transition-colors tracking-tight"
              style={{ letterSpacing: "-0.02em" }}>
              {item.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link to="/admin" onClick={onClose} className="text-2xl font-semibold text-[var(--geist-mute)] hover:text-[var(--geist-ink)] transition-colors tracking-tight">
              {m.profile_admin_dashboard()}
            </Link>
          )}
        </nav>
        <div className="border-t border-[var(--geist-hairline)] pt-6">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--geist-hairline-soft)] overflow-hidden">
                  {user.image ? <img src={user.image} alt={user.name} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center w-full h-full text-[var(--geist-mute)]">{user.name.charAt(0).toUpperCase()}</div>}
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--geist-ink)]">{user.name}</p>
                  <Link to="/profile" onClick={onClose} className="text-xs text-[var(--geist-link)]">{m.profile_title()}</Link>
                </div>
              </div>
              <button onClick={async () => { await logout(); onClose(); }} className="text-[var(--geist-mute)] hover:text-[var(--geist-error)]" type="button"><LogOut size={20} /></button>
            </div>
          ) : (
            <Link to="/login" onClick={onClose} className="geist-btn-primary-sm">{m.nav_login()}</Link>
          )}
        </div>
      </div>
    </div>
  );
}
