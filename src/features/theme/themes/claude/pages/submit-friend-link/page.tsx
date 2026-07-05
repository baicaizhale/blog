import type { SubmitFriendLinkPageProps } from "@/features/theme/contract/pages";
import { m } from "@/paraglide/messages";
import { Turnstile } from "@/components/common/turnstile";

export function SubmitFriendLinkPage({ myLinks, form }: SubmitFriendLinkPageProps) {
  return (
    <div className="w-full max-w-[48rem] mx-auto pb-20 px-6">
      <header className="py-20 space-y-4">
        <h1 className="text-[2.5rem] md:text-[3rem] font-semibold text-[var(--geist-ink)] leading-tight" style={{ letterSpacing: "-0.04em" }}>{m.friend_links_title()}</h1>
        <p className="text-base text-[var(--geist-body)]">{m.friend_links_desc()}</p>
      </header>
      <form onSubmit={form.handleSubmit} className="space-y-4 max-w-lg">
        <div><input {...form.register("siteName")} placeholder={m.friend_links_form_site_name_ph()} className="geist-input" />{form.errors.siteName && <p className="text-xs text-[var(--geist-error)] mt-1">{form.errors.siteName.message}</p>}</div>
        <div><input {...form.register("siteUrl")} placeholder={m.friend_links_form_site_url_ph()} className="geist-input" />{form.errors.siteUrl && <p className="text-xs text-[var(--geist-error)] mt-1">{form.errors.siteUrl.message}</p>}</div>
        <div><textarea {...form.register("description")} placeholder={m.friend_links_form_desc_ph()} className="geist-input" />{form.errors.description && <p className="text-xs text-[var(--geist-error)] mt-1">{form.errors.description.message}</p>}</div>
        <Turnstile {...form.turnstileProps} />
        <button type="submit" disabled={form.isSubmitting} className="geist-btn-primary">{form.isSubmitting ? "Sending..." : m.friend_links_add_modal_submit()}</button>
      </form>
      {myLinks.length > 0 && (
        <div className="mt-16"><h2 className="geist-eyebrow mb-4">My Links</h2>
          <div className="space-y-2">{myLinks.map(link => <div key={link.id} className="geist-card !p-4"><p className="font-medium text-[var(--geist-ink)]">{link.siteName}</p><p className="text-sm text-[var(--geist-mute)]">{link.siteUrl}</p></div>)}</div>
        </div>
      )}
    </div>
  );
}
