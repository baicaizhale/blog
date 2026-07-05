import { Input } from "@/components/ui/input";
import type { ResetPasswordFormData } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";

interface ResetPasswordFormProps { form: ResetPasswordFormData; }

export function ResetPasswordForm({ form }: ResetPasswordFormProps) {
  const { register, errors, handleSubmit, isSubmitting } = form;
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-sm text-[var(--geist-body)]">{m.reset_password_header_desc()}</p>
      <div><label htmlFor="np" className="geist-eyebrow">{m.reset_password_new_password()}</label><Input id="np" type="password" {...register("password")} className="geist-input" placeholder={m.login_password_placeholder()} />{errors.password && <span className="text-xs text-[var(--geist-error)]">{errors.password.message}</span>}</div>
      <div><label htmlFor="cp" className="geist-eyebrow">{m.reset_password_confirm_new_password()}</label><Input id="cp" type="password" {...register("confirmPassword")} className="geist-input" placeholder={m.login_password_placeholder()} />{errors.confirmPassword && <span className="text-xs text-[var(--geist-error)]">{errors.confirmPassword.message}</span>}</div>
      <button type="submit" disabled={isSubmitting} className="w-full geist-btn-primary">{isSubmitting ? "Resetting..." : m.reset_password_submit()}</button>
    </form>
  );
}
