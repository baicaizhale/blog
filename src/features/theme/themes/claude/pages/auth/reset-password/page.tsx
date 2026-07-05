import type { ResetPasswordPageProps } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";
import { ResetPasswordForm } from "./form";

export function ResetPasswordPage({ resetPasswordForm, token, error }: ResetPasswordPageProps) {
  return (
    <div className="space-y-10">
      <header className="text-center space-y-2">
        <p className="geist-eyebrow">[ {m.reset_password_label()} ]</p>
        <h1 className="text-2xl font-semibold text-[var(--geist-ink)] tracking-tight">{m.reset_password_title()}</h1>
      </header>
      <div className="space-y-8">
        {error && <div className="p-4 rounded-[var(--geist-radius-sm)] bg-[var(--geist-error)]/10 border border-[var(--geist-error)]/20"><p className="text-sm text-[var(--geist-error)]">{error}</p></div>}
        {token && !error ? <ResetPasswordForm form={resetPasswordForm} /> : !token ? <p className="text-sm text-[var(--geist-mute)] text-center">{m.reset_password_error_missing_token()}</p> : null}
      </div>
    </div>
  );
}
