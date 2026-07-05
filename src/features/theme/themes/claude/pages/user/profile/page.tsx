import { Link } from "@tanstack/react-router";
import type { ProfilePageProps } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";

export function ProfilePage({ user, profileForm, passwordForm, notification, logout }: ProfilePageProps) {
  return (
    <div className="w-full max-w-[48rem] mx-auto pb-20 px-6">
      <header className="py-20"><h1 className="text-[2.5rem] md:text-[3rem] font-semibold text-[var(--geist-ink)] leading-tight" style={{ letterSpacing: "-0.04em" }}>{m.profile_title()}</h1></header>
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="geist-eyebrow">{m.profile_basic_info()}</h2>
          <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-[var(--geist-hairline-soft)] overflow-hidden">{user.image ? <img src={user.image} alt={user.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[var(--geist-mute)] font-medium">{user.name.charAt(0).toUpperCase()}</div>}</div><div><p className="font-medium text-[var(--geist-ink)]">{user.name}</p><p className="text-sm text-[var(--geist-mute)]">{user.email}</p></div></div>
        </section>
        <form onSubmit={profileForm.handleSubmit} className="space-y-4 max-w-md"><div><label className="geist-eyeblock">{m.profile_name()}</label><input {...profileForm.register("name")} className="geist-input" />{profileForm.errors.name && <p className="text-xs text-[var(--geist-error)] mt-1">{profileForm.errors.name.message}</p>}</div><button type="submit" disabled={profileForm.isSubmitting} className="geist-btn-primary-sm">{profileForm.isSubmitting ? "Saving..." : m.profile_basic_settings()}</button></form>
        {passwordForm && (
          <section className="space-y-4"><h2 className="geist-eyebrow">Change Password</h2>
            <form onSubmit={passwordForm.handleSubmit} className="space-y-4 max-w-md">
              <div><input {...passwordForm.register("currentPassword")} type="password" placeholder={m.profile_current_password()} className="geist-input" /></div>
              <div><input {...passwordForm.register("newPassword")} type="password" placeholder={m.login_password_placeholder()} className="geist-input" /></div>
              <button type="submit" disabled={passwordForm.isSubmitting} className="geist-btn-primary-sm">{passwordForm.isSubmitting ? "Updating..." : m.reset_password_submit()}</button>
            </form>
          </section>
        )}
        {notification.available && <section className="space-y-4"><h2 className="geist-eyebrow">{m.profile_email_notify()}</h2><button onClick={notification.toggle} disabled={notification.isLoading} className="geist-btn-ghost-sm">{notification.enabled ? m.profile_notify_enabled() : m.profile_notify_disabled()}</button></section>}
        <div className="pt-8 border-t border-[var(--geist-hairline)] flex items-center justify-between">
          {user.role === "admin" && <Link to="/admin" className="geist-eyebrow text-[var(--geist-link)] hover:text-[var(--geist-link-deep)] transition-colors">{m.profile_admin_dashboard()}</Link>}
          <button onClick={logout} className="geist-btn-ghost-sm text-[var(--geist-error)]">{m.profile_logout()}</button>
        </div>
      </div>
    </div>
  );
}
