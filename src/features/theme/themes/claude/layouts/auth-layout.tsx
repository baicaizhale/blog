import type { AuthLayoutProps } from "@/features/theme/contract/layouts";
import { ArrowLeft } from "lucide-react";

export function AuthLayout({ onBack, children }: AuthLayoutProps) {
  return (
    <div className="claude-theme min-h-screen bg-[var(--claude-canvas)] flex flex-col">
      {/* Back button */}
      <div className="p-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-[var(--claude-muted)] hover:text-[var(--claude-ink)] transition-colors"
          type="button"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Back
        </button>
      </div>

      {/* Centered card */}
      <div className="flex-1 flex items-center justify-center px-4 pb-24">
        <div className="w-full max-w-md bg-[var(--claude-surface-card)] rounded-[var(--claude-radius-lg)] p-8 border border-[var(--claude-hairline)]">
          {children}
        </div>
      </div>
    </div>
  );
}
