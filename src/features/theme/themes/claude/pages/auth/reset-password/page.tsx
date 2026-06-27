import type { ResetPasswordPageProps } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";
import { ResetPasswordForm } from "./form";

export function ResetPasswordPage({
  resetPasswordForm,
  token,
  error,
}: ResetPasswordPageProps) {
  return (
    <div className="space-y-12">
      <header className="text-center space-y-3">
        <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[var(--claude-muted)]">
          [ {m.reset_password_label()} ]
        </p>
        <h1
          className="text-2xl font-serif text-[var(--claude-ink)]"
          style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
        >
          {m.reset_password_title()}
        </h1>
      </header>

      <div className="space-y-10">
        {error && (
          <div className="p-4 rounded-[var(--claude-radius-md)] bg-[var(--claude-error)]/10 border border-[var(--claude-error)]/20">
            <p className="text-sm text-[var(--claude-error)]">{error}</p>
          </div>
        )}

        {token && !error ? (
          <ResetPasswordForm form={resetPasswordForm} />
        ) : !token ? (
          <div className="text-center py-8">
            <p className="text-sm text-[var(--claude-muted)]">{m.reset_password_error_missing_token()}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
