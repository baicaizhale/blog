import type { ResetPasswordPageProps } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";

export function ResetPasswordPage({
  resetPasswordForm,
  token,
  error,
}: ResetPasswordPageProps) {
  return (
    <div className="space-y-8">
      <header className="text-center space-y-2">
        <h1
          className="text-2xl font-serif text-[var(--claude-ink)]"
          style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
        >
          {m.reset_password_title()}
        </h1>
      </header>

      <div className="space-y-6">
        {error && (
          <div className="p-4 rounded-[var(--claude-radius-md)] bg-[var(--claude-error)]/10 border border-[var(--claude-error)]/20">
            <p className="text-sm text-[var(--claude-error)]">{error}</p>
          </div>
        )}

        {token && !error ? (
          <form onSubmit={resetPasswordForm.handleSubmit} className="space-y-4">
            <div>
              <input
                {...resetPasswordForm.register("password")}
                type="password"
                placeholder={m.reset_password_new_password()}
                className="claude-input"
              />
              {resetPasswordForm.errors.password && (
                <p className="text-xs text-[var(--claude-error)] mt-1">{resetPasswordForm.errors.password.message}</p>
              )}
            </div>
            <div>
              <input
                {...resetPasswordForm.register("confirmPassword")}
                type="password"
                placeholder={m.reset_password_confirm_new_password()}
                className="claude-input"
              />
              {resetPasswordForm.errors.confirmPassword && (
                <p className="text-xs text-[var(--claude-error)] mt-1">{resetPasswordForm.errors.confirmPassword.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={resetPasswordForm.isSubmitting}
              className="claude-btn-primary w-full"
            >
              {resetPasswordForm.isSubmitting ? "Loading..." : m.reset_password_submit()}
            </button>
          </form>
        ) : !token ? (
          <p className="text-sm text-[var(--claude-muted)] text-center">
            {m.reset_password_error_missing_token()}
          </p>
        ) : null}
      </div>
    </div>
  );
}
