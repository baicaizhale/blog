import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import type { ForgotPasswordFormData } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";

interface ForgotPasswordFormProps { form: ForgotPasswordFormData; }

export function ForgotPasswordForm({ form }: ForgotPasswordFormProps) {
  const { register, errors, handleSubmit, isSubmitting, turnstilePending } = form;
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-sm text-[var(--geist-body)]">{m.forgot_password_header_desc()}</p>
      <div><label htmlFor="email" className="geist-eyebrow">{m.forgot_password_email_label()}</label><Input id="email" type="email" {...register("email")} className="geist-input" placeholder={m.login_email_placeholder()} />{errors.email && <span className="text-xs text-[var(--geist-error)]">{errors.email.message}</span>}</div>
      <div className="space-y-3">
        <button type="submit" disabled={isSubmitting || turnstilePending} className="w-full geist-btn-primary">{isSubmitting ? "Sending..." : m.forgot_password_submit()}</button>
        <Link to="/login" className="block text-center text-xs text-[var(--geist-mute)] hover:text-[var(--geist-ink)]">[ &larr; {m.register_back_to_login()} ]</Link>
      </div>
    </form>
  );
}
