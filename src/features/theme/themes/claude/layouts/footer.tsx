import { ClientOnly, Link, useRouteContext } from "@tanstack/react-router";
import {
  resolveSocialHref,
  SOCIAL_PLATFORMS,
} from "@/features/config/utils/social-platforms";
import type { NavOption } from "@/features/theme/contract/layouts";
import { m } from "@/paraglide/messages";

interface FooterProps {
  navOptions: Array<NavOption>;
}

export function Footer({ navOptions }: FooterProps) {
  const { siteConfig } = useRouteContext({ from: "__root__" });

  return (
    <footer className="bg-[var(--claude-surface-dark)] text-[var(--claude-on-dark)] mt-24">
      {/* Top section with links */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <span
              className="font-serif text-2xl tracking-tight text-[var(--claude-on-dark)]"
              style={{ fontWeight: 400, letterSpacing: "-0.03em" }}
            >
              {siteConfig.theme.claude.navBarName}
            </span>
            <p className="mt-3 text-sm text-[var(--claude-on-dark-soft)] leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="text-sm font-medium text-[var(--claude-on-dark)] mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navOptions.map((option) => (
                <li key={option.id}>
                  <Link
                    to={option.to}
                    className="text-sm text-[var(--claude-on-dark-soft)] hover:text-[var(--claude-on-dark)] transition-colors"
                  >
                    {option.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-medium text-[var(--claude-on-dark)] mb-4 uppercase tracking-wider">
              Social
            </h4>
            <ul className="space-y-3">
              {siteConfig.social
                .filter((link) => link.url)
                .map((link, i) => {
                  const href = resolveSocialHref(link.platform, link.url);
                  const label =
                    link.platform !== "custom"
                      ? SOCIAL_PLATFORMS[link.platform].label
                      : (link.label ?? "");
                  return (
                    <li key={`${link.platform}-${i}`}>
                      <a
                        href={href}
                        target={link.platform === "email" ? undefined : "_blank"}
                        rel={
                          link.platform === "email"
                            ? undefined
                            : "noreferrer"
                        }
                        className="text-sm text-[var(--claude-on-dark-soft)] hover:text-[var(--claude-on-dark)] transition-colors"
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>

          {/* Copyright */}
          <div>
            <h4 className="text-sm font-medium text-[var(--claude-on-dark)] mb-4 uppercase tracking-wider">
              Legal
            </h4>
            <p className="text-sm text-[var(--claude-on-dark-soft)]">
              &copy; {new Date().getFullYear()} {siteConfig.author}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--claude-hairline)]/20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs text-[var(--claude-on-dark-soft)]">
            <ClientOnly>
              {m.footer_copyright({
                year: new Date().getFullYear().toString(),
                author: siteConfig.author,
              })}
            </ClientOnly>
          </span>
          <span className="text-xs text-[var(--claude-on-dark-soft)]">
            {m.footer_powered_by()}
          </span>
        </div>
      </div>
    </footer>
  );
}
