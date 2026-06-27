import type { ProfilePageProps } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";

export function ProfilePage({
  user,
  profileForm,
  passwordForm,
  notification,
  logout,
}: ProfilePageProps) {
  return (
    <div className="w-full max-w-3xl mx-auto pb-20 px-6">
      <header className="py-16 space-y-4">
        <h1
          className="text-4xl md:text-5xl font-serif text-[var(--claude-ink)] leading-tight"
          style={{ fontWeight: 400, letterSpacing: "-0.03em" }}
        >
          {m.profile_title()}
        </h1>
      </header>

      <div className="space-y-12">
        {/* Profile Info */}
        <section className="space-y-4">
          <h2 className="font-serif text-xl text-[var(--claude-ink)]"
              style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
            {m.profile_basic_info()}
          </h2>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[var(--claude-surface-soft)] overflow-hidden">
              {user.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--claude-muted)] font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <p className="font-medium text-[var(--claude-ink)]">{user.name}</p>
              <p className="text-sm text-[var(--claude-muted)]">{user.email}</p>
            </div>
          </div>
        </section>

        {/* Edit Profile Form */}
        <form onSubmit={profileForm.handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm text-[var(--claude-muted)] mb-1">{m.profile_name()}</label>
            <input
              {...profileForm.register("name")}
              className="claude-input"
            />
            {profileForm.errors.name && (
              <p className="text-xs text-[var(--claude-error)] mt-1">{profileForm.errors.name.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={profileForm.isSubmitting}
            className="claude-btn-primary"
          >
            {profileForm.isSubmitting ? "Saving..." : m.profile_basic_settings()}
          </button>
        </form>

        {/* Password Form */}
        {passwordForm && (
          <section className="space-y-4">
            <h2 className="font-serif text-xl text-[var(--claude-ink)]"
                style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
              Change Password
            </h2>
            <form onSubmit={passwordForm.handleSubmit} className="space-y-4 max-w-md">
              <div>
                <input
                  {...passwordForm.register("currentPassword")}
                  type="password"
                  placeholder={m.profile_current_password()}
                  className="claude-input"
                />
              </div>
              <div>
                <input
                  {...passwordForm.register("newPassword")}
                  type="password"
                  placeholder={m.login_password_placeholder()}
                  className="claude-input"
                />
              </div>
              <button
                type="submit"
                disabled={passwordForm.isSubmitting}
                className="claude-btn-primary"
              >
                {passwordForm.isSubmitting ? "Updating..." : m.reset_password_submit()}
              </button>
            </form>
          </section>
        )}

        {/* Notification Settings */}
        {notification.available && (
          <section className="space-y-4">
            <h2 className="font-serif text-xl text-[var(--claude-ink)]"
                style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
              {m.profile_email_notify()}
            </h2>
            <button
              onClick={notification.toggle}
              disabled={notification.isLoading}
              className="claude-btn-secondary"
              type="button"
            >
              {notification.enabled ? m.profile_notify_disabled() : m.profile_notify_enabled()}
            </button>
          </section>
        )}

        {/* Logout */}
        <div className="pt-8 border-t border-[var(--claude-hairline)]">
          <button
            onClick={logout}
            className="claude-btn-secondary text-[var(--claude-error)] hover:bg-[var(--claude-error)]/10"
            type="button"
          >
            {m.profile_logout()}
          </button>
        </div>
      </div>
    </div>
  );
}
