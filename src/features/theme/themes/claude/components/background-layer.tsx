import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import type { ClaudeThemeBackground } from "@/features/config/site-config.schema";

const baseStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  pointerEvents: "none",
  zIndex: 0,
};

export function BackgroundLayer({
  background,
}: {
  background?: ClaudeThemeBackground;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isHomepage = pathname === "/" || pathname === "";
  const hasAnyImage = Boolean(
    background &&
      (background.homeImage !== "" || background.globalImage !== ""),
  );

  useEffect(() => {
    if (!background || !hasAnyImage || !isHomepage) return;

    const handleScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      containerRef.current?.style.setProperty(
        "--scroll-progress",
        String(progress),
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [background, hasAnyImage, isHomepage]);

  if (!background || !hasAnyImage) return null;

  const {
    homeImage,
    globalImage,
    light,
    dark,
    backdropBlur,
    transitionDuration,
  } = background;
  const imageStyle: React.CSSProperties = {
    ...baseStyle,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    filter: backdropBlur ? `blur(${backdropBlur}px)` : undefined,
  };

  const transition = `opacity ${transitionDuration}ms ease`;

  const homeOpacityExpr = isHomepage
    ? "calc((1 - var(--scroll-progress, 0)) * var(--bg-opacity))"
    : "0";
  const globalOpacityExpr = isHomepage
    ? "calc(var(--scroll-progress, 0) * var(--bg-opacity))"
    : "var(--bg-opacity)";

  return (
    <>
      {homeImage && <link rel="preload" as="image" href={homeImage} />}
      {globalImage && <link rel="preload" as="image" href={globalImage} />}

      <div
        ref={containerRef}
        aria-hidden="true"
        className="[--bg-opacity:var(--bg-opacity-light)] dark:[--bg-opacity:var(--bg-opacity-dark)]"
        style={
          {
            "--bg-opacity-light": light.opacity,
            "--bg-opacity-dark": dark.opacity,
            "--scroll-progress": "0",
          } as React.CSSProperties
        }
      >
        {homeImage && (
          <div
            style={{
              ...imageStyle,
              backgroundImage: `url("${homeImage}")`,
              opacity: homeOpacityExpr,
              transition,
            }}
          />
        )}

        {globalImage && (
          <div
            style={{
              ...imageStyle,
              backgroundImage: `url("${globalImage}")`,
              opacity: globalOpacityExpr,
              transition,
            }}
          />
        )}

        {(isHomepage || Boolean(globalImage)) && (
          <div
            className="bg-[linear-gradient(to_bottom,transparent,var(--claude-canvas)_60%,var(--claude-canvas)_100%)]"
            style={baseStyle}
          />
        )}
      </div>
    </>
  );
}
