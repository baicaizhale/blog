import { GithubIcon } from "@/components/common/brand-icon";
import type { SocialLoginData } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";

interface SocialLoginProps extends SocialLoginData { showDivider?: boolean; }

export function SocialLogin({ isLoading, handleGithubLogin, showDivider = true }: SocialLoginProps) {
  return (
    <div className="space-y-4">
      {showDivider && <div className="relative flex items-center"><div className="grow h-px bg-[var(--geist-hairline)]" /><span className="shrink-0 mx-3 text-xs text-[var(--geist-mute)]">{m.login_or()}</span><div className="grow h-px bg-[var(--geist-hairline)]" /></div>}
      <button type="button" onClick={handleGithubLogin} disabled={isLoading} className={`w-full flex items-center justify-center gap-2 h-10 rounded-[var(--geist-radius-sm)] border border-[var(--geist-hairline)] text-sm font-medium transition-colors hover:border-[var(--geist-ink)] disabled:opacity-50 ${!showDivider ? "geist-btn-primary !rounded-[var(--geist-radius-sm)]" : "bg-[var(--geist-canvas-elevated)] text-[var(--geist-ink)]"}`}>
        <GithubIcon size={14} strokeWidth={1.5} />
        <span>{isLoading ? m.login_social_connecting() : m.login_github()}</span>
      </button>
    </div>
  );
}
