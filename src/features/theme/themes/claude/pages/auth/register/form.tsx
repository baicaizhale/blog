import { Input } from "@/components/ui/input";
import type { RegisterFormData } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";

interface RegisterFormProps { form: RegisterFormData; }

export function RegisterForm({ form }: RegisterFormProps) {
  const { register, errors, handleSubmit, isSubmitting, turnstilePending } = form;
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div><label className="geist-eyebrow">{m.register_nickname()}</label><Input type="text" {...register("name")} className="geist-input" placeholder={m.register_nickname_placeholder()} />{errors.name && <span className="text-xs text-[var(--geist-error)]">{errors.name.message}</span>}</div>
      <div><label className="geist-eyebrow">{m.login_email_address()}</label><Input type="email" {...register("email")} className="geist-input" placeholder={m.login_email_placeholder()} />{errors.email && <span className="text-xs text-[var(--geist-error)]">{errors.email.message}</span>}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="geist-eyebrow">{m.register_password()}</label><Input type="password" {...register("password")} className="geist-input" placeholder={m.login_password_placeholder()} />{errors.password && <span className="text-xs text-[var(--geist-error)]">{errors.password.message}</span>}</div>
        <div><label className="geist-eyebrow">{m.register_confirm_password()}</label><Input type="password" {...register("confirmPassword")} className="geist-input" placeholder={m.login_password_placeholder()} />{errors.confirmPassword && <span className="text-xs text-[var(--geist-error)]">{errors.confirmPassword.message}</span>}</div>
      </div>
      <button type="submit" disabled={isSubmitting || turnstilePending} className="w-full geist-btn-primary">{isSubmitting ? "Submitting..." : m.register_submit()}</button>
    </form>
  );
}
