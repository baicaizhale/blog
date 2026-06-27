import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { RegisterFormData } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";

interface RegisterFormProps {
  form: RegisterFormData;
}

export function RegisterForm({ form }: RegisterFormProps) {
  const { register, errors, handleSubmit, isSubmitting, turnstilePending } = form;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-2 group">
          <label className="text-[10px] font-mono uppercase tracking-widest text-[var(--claude-muted)] group-focus-within:text-[var(--claude-ink)] transition-colors">
            {m.register_nickname()}
          </label>
          <Input
            type="text"
            {...register("name")}
            className="w-full bg-transparent border-0 border-b border-[var(--claude-hairline)] rounded-none py-3 text-sm font-light focus-visible:ring-0 focus:border-[var(--claude-ink)] focus:outline-none transition-all placeholder:text-[var(--claude-muted-soft)] shadow-none px-0"
            placeholder={m.register_nickname_placeholder()}
          />
          {errors.name && (
            <span className="text-[9px] font-mono text-[var(--claude-error)] uppercase tracking-widest mt-1 block">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="space-y-2 group">
          <label className="text-[10px] font-mono uppercase tracking-widest text-[var(--claude-muted)] group-focus-within:text-[var(--claude-ink)] transition-colors">
            {m.login_email_address()}
          </label>
          <Input
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 group">
            <label className="text-[10px] font-mono uppercase tracking-widest text-[var(--claude-muted)] group-focus-within:text-[var(--claude-ink)] transition-colors">
              {m.register_password()}
            </label>
            <Input
              type="password"
              {...register("password")}
              className="w-full bg-transparent border-0 border-b border-[var(--claude-hairline)] rounded-none py-3 text-sm font-light focus-visible:ring-0 focus:border-[var(--claude-ink)] focus:outline-none transition-all placeholder:text-[var(--claude-muted-soft)] shadow-none px-0"
              placeholder={m.login_password_placeholder()}
            />
            {errors.password && (
              <span className="text-[9px] font-mono text-[var(--claude-error)] uppercase tracking-widest mt-1 block">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="space-y-2 group">
            <label className="text-[10px] font-mono uppercase tracking-widest text-[var(--claude-muted)] group-focus-within:text-[var(--claude-ink)] transition-colors">
              {m.register_confirm_password()}
            </label>
            <Input
              type="password"
              {...register("confirmPassword")}
              className="w-full bg-transparent border-0 border-b border-[var(--claude-hairline)] rounded-none py-3 text-sm font-light focus-visible:ring-0 focus:border-[var(--claude-ink)] focus:outline-none transition-all placeholder:text-[var(--claude-muted-soft)] shadow-none px-0"
              placeholder={m.login_password_placeholder()}
            />
            {errors.confirmPassword && (
              <span className="text-[9px] font-mono text-[var(--claude-error)] uppercase tracking-widest mt-1 block">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || turnstilePending}
        className="w-full claude-btn-primary"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin" size={14} />
        ) : (
          <span>{m.register_submit()}</span>
        )}
      </button>
    </form>
  );
}
