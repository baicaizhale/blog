import type { CSSProperties } from "react";
import type { SiteConfig } from "@/features/config/site-config.schema";

export function getClaudeThemeStyle(
  _siteConfig: SiteConfig,
): CSSProperties | undefined {
  return {
    "--claude-primary-hue": "16",
    "--claude-primary-saturation": "50%",
    "--claude-primary-lightness": "58%",
  } as CSSProperties;
}
