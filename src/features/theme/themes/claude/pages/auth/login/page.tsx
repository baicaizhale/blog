import { Link } from "@tanstack/react-router";
import type { LoginPageProps } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";
import { LoginForm } from "./form";
import { SocialLogin } from "./social-login";

export function LoginPage({ isEmailConfigured, loginForm, socialLogin, turnstileElement }: LoginPageProps) {
  return (
    <div className="space-y-10">
      <header className="text-center space-y-2">
        <p className="geist-eyebrow">[ {isEmailConfigured ? m.login_label() : m.login_auth_label()} ]</p>
        <h1 className="text-2xl font-semibold text-[var(--geist-ink)] tracking-tight">{isEmailConfigured ? m.login_title() : m.login_auth_title()}</h1>
        {!isEmailConfigured && <p className="text-xs text-[var(--geist-mute)]">{m.login_only_third_party()}</p>}
      </header>
      <div className={isEmailConfigured ? "space-y-8" : "space-y-0"}>
        {isEmailConfigured && <LoginForm form={loginForm} isEmailConfigured={isEmailConfigured} />}
        <SocialLogin isLoading={socialLogin.isLoading} handleGithubLogin={socialLogin.handleGithubLogin} showDivider={isEmailConfigured} />
        {turnstileElement}
        {isEmailConfigured && <div className="text-center pt-4"><p className="text-xs text-[var(--geist-mute)]">{m.login_no_account()} <Link to="/register" className="text-[var(--geist-link)] ml-1">[{m.login_register_now()}]</Link></p></div>}
      </div>
    </div>
  );
}
