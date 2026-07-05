import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import type { LoginFormData } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";

interface LoginFormProps { form: LoginFormData; isEmailConfigured: boolean; }

export function LoginForm({ form, isEmailConfigured }: LoginFormProps) {
  const { register, errors, handleSubmit, loginStep, isSubmitting, turnstilePending } = form;
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div><label htmlFor="email" className="geist-eyebrow block mb-1">{m.login_email_address()}</label>
          <Input id="email" type="email" {...register("email")} className="geist-input" placeholder={m.login_email_placeholder()} autoComplete="username" disabled={isSubmitting || loginStep !== "IDLE"} />
          {errors.email && <span className="text-xs text-[var(--geist-error)] mt-1 block">{errors.email.message}</span>}
        </div>
        <div><div className="flex justify-between items-center"><label htmlFor="password" className="geist-eyebrow">{m.login_password()}</label>{isEmailConfigured && <Link to="/forgot-password" className="text-xs text-[var(--geist-link)]">[{m.login_forgot_password()}]</Link>}</div>
          <Input id="password" type="password" {...register("password")} className="geist-input" placeholder={m.login_password_placeholder()} autoComplete="current-password" disabled={isSubmitting || loginStep !== "IDLE"} />
          {errors.password && <span className="text-xs text-[var(--geist-error)] mt-1 block">{errors.password.message}</span>}
        </div>
      </div>
      <button type="submit" disabled={isSubmitting || loginStep !== "IDLE" || turnstilePending} className="w-full geist-btn-primary">
        {loginStep === "VERIFYING" ? <span className="animate-pulse">{m.login_submit()}</span> : <span>{m.login_submit()}</span>}
      </button>
    </form>
  );
}
