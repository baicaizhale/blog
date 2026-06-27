import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { ForgotPasswordFormData } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";

interface ForgotPasswordFormProps {
  form: ForgotPasswordFormData;
}

export function ForgotPasswordForm({ form }: ForgotPasswordFormProps) {
  const { register, errors, handleSubmit, isSubmitting, turnstilePending } = form;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <p className="text-sm text-[var(--claude-muted)] font-light leading-relaxed">
        {m.forgot_password_header_desc()}
      </p>

      <div className="space-y-6">
        <div className="space-y-2 group">
          <label
            htmlFor="email"
            className="text-[10px] font-mono uppercase tracking-widest text-[var(--claude-muted)] group-focus-within:text-[var(--claude-ink)] transition-colors"
          >
            {m.forgot_password_email_label()}
          </label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="w-full bg-transparent border-0 border-b border-[var(--claude-hairline)] rounded-none py-3 text-sm font-light focus-visible:ring-0 focus:border-[var(--claude-ink)] focus:outline-none transition-all placeholder:text-[var(--claude-muted-soft)] shadow-none px-0"
            placeholder={m.login_email_placeholder()}
          />
          {errors.email && (
            <span className="text-[9px] font-mono text-[var(--claude-error)] uppercase tracking-widest mt-1 block">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <button
          type="submit"
          disabled={isSubmitting || turnstilePending}
          className="w-full py-4 bg-[var(--claude-ink)] text-[var(--claude-on-dark)] text-[10px] font-mono uppercase tracking-[0.3em] hover:opacity-80 transition-all disabled:opacity-30 flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={14} />
          ) : (
            <span>{m.forgot_password_submit()}</span>
          )}
        </button>

        <Link
          to="/login"
          className="block w-full text-center text-[9px] font-mono text-[var(--claude-muted)] hover:text-[var(--claude-ink)] transition-colors"
        >
          [ &larr; {m.register_back_to_login()} ]
        </Link>
      </div>
    </form>
  );
}
