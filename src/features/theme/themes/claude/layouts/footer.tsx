import { Link, useRouteContext } from "@tanstack/react-router";
import { resolveSocialHref, SOCIAL_PLATFORMS } from "@/features/config/utils/social-platforms";
import type { NavOption } from "@/features/theme/contract/layouts";
import { m } from "@/paraglide/messages";

interface FooterProps { navOptions: NavOption[]; }

export function Footer({ navOptions }: FooterProps) {
  const { siteConfig } = useRouteContext({ from: "__root__" });
  return (
    <footer className="bg-[var(--geist-canvas)] border-t border-[var(--geist-hairline)] mt-24">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <span className="font-semibold text-[var(--geist-ink)] tracking-tight" style={{ letterSpacing: "-0.02em" }}>{siteConfig.theme.claude.navBarName}</span>
            <p className="text-sm text-[var(--geist-mute)] mt-2 leading-relaxed">{siteConfig.description}</p>
          </div>
          <div>
            <h4 className="geist-eyebrow mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navOptions.map((opt) => (
                <li key={opt.id}><Link to={opt.to} className="text-sm text-[var(--geist-body)] hover:text-[var(--geist-ink)] transition-colors">{opt.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="geist-eyebrow mb-4">Social</h4>
            <ul className="space-y-2">
              {siteConfig.social.filter(l => l.url).map((link, i) => {
                const href = resolveSocialHref(link.platform, link.url);
                const label = link.platform !== "custom" ? SOCIAL_PLATFORMS[link.platform].label : (link.label ?? "");
                return <li key={`${link.platform}-${i}`}><a href={href} target={link.platform === "email" ? undefined : "_blank"} rel={link.platform === "email" ? undefined : "noreferrer"} className="text-sm text-[var(--geist-body)] hover:text-[var(--geist-ink)] transition-colors">{label}</a></li>;
              })}
            </ul>
          </div>
          <div>
            <h4 className="geist-eyebrow mb-4">Legal</h4>
            <p className="text-sm text-[var(--geist-mute)]">&copy; {new Date().getFullYear()} {siteConfig.author}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--geist-hairline)] py-4">
        <div className="max-w-[1200px] mx-auto px-6 flex justify-between text-xs text-[var(--geist-mute)]">
          <span>{m.footer_copyright({ year: new Date().getFullYear().toString(), author: siteConfig.author })}</span>
          <span>{m.footer_powered_by()} <a href="https://tanstack.com/start" target="_blank" rel="noreferrer" className="hover:text-[var(--geist-ink)] transition-colors">TanStack Start</a> &amp; <a href="https://github.com/du2333/flare-stack-blog" target="_blank" rel="noreferrer" className="hover:text-[var(--geist-ink)] transition-colors">flare-stack-blog</a></span>
        </div>
      </div>
    </footer>
  );
}
