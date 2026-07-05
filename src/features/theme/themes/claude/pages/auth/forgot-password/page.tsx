import type { ForgotPasswordPageProps } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";
import { ForgotPasswordForm } from "./form";

export function ForgotPasswordPage({ forgotPasswordForm, turnstileElement }: ForgotPasswordPageProps) {
  return (
    <div className="space-y-10">
      <header className="text-center space-y-2">
        <p className="geist-eyebrow">[ {m.forgot_password_label()} ]</p>
        <h1 className="text-2xl font-semibold text-[var(--geist-ink)] tracking-tight">{m.forgot_password_title()}</h1>
      </header>
      <div className="space-y-8">
        {forgotPasswordForm.isSent ? (
          <div className="text-center py-8"><p className="text-sm text-[var(--geist-body)]">{m.forgot_password_success_desc({ email: forgotPasswordForm.sentEmail })}</p></div>
        ) : <ForgotPasswordForm form={forgotPasswordForm} />}
        {turnstileElement}
      </div>
    </div>
  );
}
