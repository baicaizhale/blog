import type { ForgotPasswordPageProps } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";
import { ForgotPasswordForm } from "./form";

export function ForgotPasswordPage({
  forgotPasswordForm,
  turnstileElement,
}: ForgotPasswordPageProps) {
  return (
    <div className="space-y-12">
      <header className="text-center space-y-3">
        <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[var(--claude-muted)]">
          [ {m.forgot_password_label()} ]
        </p>
        <h1
          className="text-2xl font-serif text-[var(--claude-ink)]"
          style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
        >
          {m.forgot_password_title()}
        </h1>
      </header>

      <div className="space-y-10">
        {forgotPasswordForm.isSent ? (
          <div className="text-center py-8 space-y-3">
            <p className="text-sm text-[var(--claude-body)]">
              {m.forgot_password_success_desc({ email: forgotPasswordForm.sentEmail })}
            </p>
          </div>
        ) : (
          <ForgotPasswordForm form={forgotPasswordForm} />
        )}

        {turnstileElement}
      </div>
    </div>
  );
}
