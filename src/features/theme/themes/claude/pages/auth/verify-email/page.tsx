import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import type { VerifyEmailPageProps } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";

export function VerifyEmailPage({ status, error }: VerifyEmailPageProps) {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-2xl font-semibold text-[var(--geist-ink)] tracking-tight">{m.verify_email_title()}</h1>
      <div className="flex flex-col items-center gap-4 py-8">
        {status === "ANALYZING" && <><Loader2 size={32} className="animate-spin text-[var(--geist-link)]" /><p className="text-sm text-[var(--geist-body)]">{m.verify_email_analyzing()}</p></>}
        {status === "SUCCESS" && <><CheckCircle size={32} className="text-[var(--geist-link)]" /><p className="text-sm text-[var(--geist-body)]">{m.verify_email_success_desc()}</p></>}
        {status === "ERROR" && <><XCircle size={32} className="text-[var(--geist-error)]" /><p className="text-sm text-[var(--geist-error)]">{error || m.verify_email_error_generic_desc()}</p></>}
      </div>
    </div>
  );
}
