import type { VerifyEmailPageProps } from "@/features/theme/contract/pages";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { m } from "@/paraglide/messages";

export function VerifyEmailPage({ status, error }: VerifyEmailPageProps) {
  return (
    <div className="space-y-8">
      <header className="text-center space-y-2">
        <h1
          className="text-2xl font-serif text-[var(--claude-ink)]"
          style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
        >
          {m.verify_email_title()}
        </h1>
      </header>

      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        {status === "ANALYZING" && (
          <>
            <Loader2 size={32} className="animate-spin text-[var(--claude-primary)]" />
            <p className="text-[var(--claude-body)]">{m.verify_email_analyzing()}</p>
          </>
        )}

        {status === "SUCCESS" && (
          <>
            <CheckCircle size={32} className="text-[var(--claude-success)]" />
            <p className="text-[var(--claude-body)]">{m.verify_email_success_desc()}</p>
          </>
        )}

        {status === "ERROR" && (
          <>
            <XCircle size={32} className="text-[var(--claude-error)]" />
            <p className="text-[var(--claude-error)]">{error || m.verify_email_error_generic_desc()}</p>
          </>
        )}
      </div>
    </div>
  );
}
