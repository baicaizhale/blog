import { Link } from "@tanstack/react-router";
import type { RegisterPageProps } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";

export function RegisterPage({
  isEmailConfigured,
  registerForm,
  turnstileElement,
}: RegisterPageProps) {
  return (
    <div className="space-y-8">
      <header className="text-center space-y-2">
        <h1
          className="text-2xl font-serif text-[var(--claude-ink)]"
          style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
        >
          {m.register_header_title()}
        </h1>
      </header>

      <div className="space-y-6">
        {isEmailConfigured ? (
          registerForm.isSuccess ? (
            <div className="text-center py-8 space-y-3">
              <p className="text-[var(--claude-body)]">{m.register_success_desc()}</p>
            </div>
          ) : (
            <form onSubmit={registerForm.handleSubmit} className="space-y-4">
              <div>
                <input
                  {...registerForm.register("name")}
                  placeholder={m.register_nickname_placeholder()}
                  className="claude-input"
                />
                {registerForm.errors.name && (
                  <p className="text-xs text-[var(--claude-error)] mt-1">{registerForm.errors.name.message}</p>
                )}
              </div>
              <div>
                <input
                  {...registerForm.register("email")}
                  type="email"
                  placeholder={m.login_email_placeholder()}
                  className="claude-input"
                />
                {registerForm.errors.email && (
                  <p className="text-xs text-[var(--claude-error)] mt-1">{registerForm.errors.email.message}</p>
                )}
              </div>
              <div>
                <input
                  {...registerForm.register("password")}
                  type="password"
                  placeholder={m.login_password_placeholder()}
                  className="claude-input"
                />
                {registerForm.errors.password && (
                  <p className="text-xs text-[var(--claude-error)] mt-1">{registerForm.errors.password.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={registerForm.isSubmitting}
                className="claude-btn-primary w-full"
              >
                {registerForm.isSubmitting ? "Loading..." : m.register_submit()}
              </button>
            </form>
          )
        ) : (
          <p className="text-sm text-[var(--claude-muted)] text-center">
            {m.login_only_third_party()}
          </p>
        )}

        {turnstileElement}

        <div className="text-center pt-2">
          <p className="text-sm text-[var(--claude-muted)]">
            {m.register_have_account()}{" "}
            <Link
              to="/login"
              className="text-[var(--claude-primary)] hover:text-[var(--claude-primary-active)] transition-colors"
            >
              {m.register_go_to_login()}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
