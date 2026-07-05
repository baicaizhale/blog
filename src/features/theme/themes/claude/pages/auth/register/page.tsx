import { Link } from "@tanstack/react-router";
import type { RegisterPageProps } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";
import { RegisterForm } from "./form";

export function RegisterPage({ registerForm, turnstileElement }: RegisterPageProps) {
  if (registerForm.isSuccess) {
    return (
      <div className="text-center space-y-6 animate-in fade-in">
        <p className="geist-eyebrow">[ {m.register_success_label()} ]</p>
        <h3 className="text-xl font-semibold text-[var(--geist-ink)] tracking-tight">{m.register_success_title()}</h3>
        <p className="text-sm text-[var(--geist-body)]">{m.register_success_desc()}</p>
        <Link to="/login" className="geist-btn-ghost-sm">{m.register_back_to_login()}</Link>
      </div>
    );
  }
  return (
    <div className="space-y-10">
      <header className="text-center space-y-2">
        <p className="geist-eyebrow">[ {m.register_label()} ]</p>
        <h1 className="text-2xl font-semibold text-[var(--geist-ink)] tracking-tight">{m.register_header_title()}</h1>
      </header>
      <div className="space-y-8"><RegisterForm form={registerForm} />{turnstileElement}
        <div className="text-center"><p className="text-xs text-[var(--geist-mute)]">{m.register_have_account()} <Link to="/login" className="text-[var(--geist-link)]">[{m.register_go_to_login()}]</Link></p></div>
      </div>
    </div>
  );
}
