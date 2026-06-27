import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "var(--claude-surface-card)",
          color: "var(--claude-ink)",
          border: "1px solid var(--claude-hairline)",
          borderRadius: "var(--claude-radius-md)",
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "0.875rem",
        },
      }}
    />
  );
}
