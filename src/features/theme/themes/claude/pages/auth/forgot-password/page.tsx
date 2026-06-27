import type { ForgotPasswordPageProps } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";

export function ForgotPasswordPage({
  forgotPasswordForm,
  turnstileElement,
}: ForgotPasswordPageProps) {
  return (
    <div className="space-y-8">
      <header className="text-center space-y-2">
        <h1
          className="text-2xl font-serif text-[var(--claude-ink)]"
          style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
        >
          {m.forgot_password_title()}
        </h1>
        <p className="text-sm text-[var(--claude-muted)]">
          {m.forgot_password_header_desc()}
        </p>
      </header>

      <div className="space-y-6">
        {forgotPasswordForm.isSent ? (
          <div className="text-center py-8 space-y-3">
            <p className="text-[var(--claude-body)]">
              {m.forgot_password_success_desc({ email: forgotPasswordForm.sentEmail })}
            </p>
          </div>
        ) : (
          <form onSubmit={forgotPasswordForm.handleSubmit} className="space-y-4">
            <div>
              <input
                {...forgotPasswordForm.register("email")}
                type="email"
                placeholder={m.forgot_password_email_label()}
                className="claude-input"
              />
              {forgotPasswordForm.errors.email && (
                <p className="text-xs text-[var(--claude-error)] mt-1">{forgotPasswordForm.errors.email.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={forgotPasswordForm.isSubmitting}
              className="claude-btn-primary w-full"
            >
              {forgotPasswordForm.isSubmitting ? "Sending..." : m.forgot_password_submit()}
            </button>
          </form>
        )}

        {turnstileElement}
      </div>
    </div>
  );
}
