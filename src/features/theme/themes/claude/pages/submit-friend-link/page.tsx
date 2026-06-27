import type { SubmitFriendLinkPageProps } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";
import { Turnstile } from "@/components/common/turnstile";

export function SubmitFriendLinkPage({
  myLinks,
  form,
}: SubmitFriendLinkPageProps) {
  return (
    <div className="w-full max-w-3xl mx-auto pb-20 px-6">
      <header className="py-16 space-y-4">
        <h1
          className="text-4xl md:text-5xl font-serif text-[var(--claude-ink)] leading-tight"
          style={{ fontWeight: 400, letterSpacing: "-0.03em" }}
        >
          {m.friend_links_title()}
        </h1>
        <p className="text-lg text-[var(--claude-body)] leading-relaxed max-w-xl">
          {m.friend_links_desc()}
        </p>
      </header>

      <form onSubmit={form.handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <input
            {...form.register("siteName")}
            placeholder={m.friend_links_form_site_name_ph()}
            className="claude-input"
          />
          {form.errors.siteName && (
            <p className="text-xs text-[var(--claude-error)] mt-1">{form.errors.siteName.message}</p>
          )}
        </div>
        <div>
          <input
            {...form.register("siteUrl")}
            placeholder={m.friend_links_form_site_url_ph()}
            className="claude-input"
          />
          {form.errors.siteUrl && (
            <p className="text-xs text-[var(--claude-error)] mt-1">{form.errors.siteUrl.message}</p>
          )}
        </div>
        <div>
          <textarea
            {...form.register("description")}
            placeholder={m.friend_links_form_desc_ph()}
            className="claude-input min-h-[80px] resize-y"
          />
          {form.errors.description && (
            <p className="text-xs text-[var(--claude-error)] mt-1">{form.errors.description.message}</p>
          )}
        </div>

        <Turnstile {...form.turnstileProps} />

        <button
          type="submit"
          disabled={form.isSubmitting}
          className="claude-btn-primary"
        >
          {form.isSubmitting ? "Sending..." : m.friend_links_add_modal_submit()}
        </button>
      </form>

      {myLinks.length > 0 && (
        <div className="mt-16">
          <h2 className="font-serif text-xl text-[var(--claude-ink)] mb-4"
              style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
            My Links
          </h2>
          <div className="space-y-3">
            {myLinks.map((link) => (
              <div key={link.id} className="p-4 rounded-[var(--claude-radius-md)] border border-[var(--claude-hairline)]">
                <p className="font-medium text-[var(--claude-ink)]">{link.siteName}</p>
                <p className="text-sm text-[var(--claude-muted)]">{link.siteUrl}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
