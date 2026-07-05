import { ArrowLeft } from "lucide-react";
import type { AuthLayoutProps } from "@/features/theme/contract/layouts";

export function AuthLayout({ onBack, children }: AuthLayoutProps) {
  return (
    <div className="geist-theme min-h-screen bg-[var(--geist-canvas)] flex flex-col">
      <div className="p-6">
        <button onClick={onBack} className="geist-btn-ghost-sm" type="button">
          <ArrowLeft size={14} strokeWidth={1.5} /> Back
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 pb-24">
        <div className="w-full max-w-sm geist-card-lg">{children}</div>
      </div>
    </div>
  );
}
