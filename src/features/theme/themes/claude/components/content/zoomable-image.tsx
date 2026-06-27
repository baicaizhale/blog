import { ClientOnly } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";

interface ZoomableImageProps
  extends Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    "src" | "width" | "height"
  > {
  className?: string;
  showHint?: boolean;
  src?: string;
  width?: number;
  height?: number;
}

function Lightbox({
  src,
  alt,
  isOpen,
  onClose,
}: {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const originalSrc = React.useMemo(() => {
    try {
      const base =
        typeof window !== "undefined" ? window.location.origin : undefined;
      const url = base ? new URL(src, base) : new URL(src);
      url.searchParams.set("original", "true");
      return url.toString();
    } catch {
      return src.includes("?")
        ? `${src}&original=true`
        : `${src}?original=true`;
    }
  }, [src]);

  return createPortal(
    <div
      className={`fixed inset-0 z-200 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-[var(--claude-surface-dark)]/98 backdrop-blur-xl"
        onClick={onClose}
      />

      <div
        className={`absolute top-0 left-0 right-0 p-8 flex justify-between items-start z-210 transition-all duration-500 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-[var(--claude-on-dark)] tracking-widest uppercase">
            {m.common_image_preview()}
          </span>
          <span className="text-[10px] text-[var(--claude-on-dark-soft)]">
            {alt || m.common_untitled()}
          </span>
        </div>

        <div className="flex gap-6 items-center">
          <a
            href={originalSrc}
            download
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-widest text-[var(--claude-on-dark-soft)] group-hover:text-[var(--claude-on-dark)] transition-colors">
              {m.media_preview_btn_download()}
            </span>
          </a>
          <button onClick={onClose} className="group flex items-center gap-2" type="button">
            <span className="text-[10px] uppercase tracking-widest text-[var(--claude-on-dark-soft)] group-hover:text-[var(--claude-on-dark)] transition-colors">
              {m.common_close()}
            </span>
          </button>
        </div>
      </div>

      <div
        className={`relative z-205 p-6 md:p-12 w-full h-full flex items-center justify-center transition-all duration-700 delay-100 ${
          isOpen ? "scale-100 opacity-100" : "scale-[0.98] opacity-0"
        }`}
      >
        <img
          src={src}
          alt={alt}
          loading="eager"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>,
    document.body,
  );
}

export default function ZoomableImage({
  className = "",
  alt = "",
  src,
  showHint = false,
  width,
  height,
  ...props
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  const isPortrait = !!(width && height && height > width);

  if (!src) return null;

  return (
    <>
      <div
        className={cn(
          "relative group cursor-zoom-in block overflow-hidden bg-[var(--claude-surface-soft)]",
          isPortrait
            ? "flex items-center justify-center w-full max-h-[70vh]"
            : "w-full max-h-[80vh]",
          !isLoaded && "animate-pulse",
        )}
        style={{
          aspectRatio:
            !isPortrait && width && height ? `${width} / ${height}` : "auto",
        }}
        onClick={() => setIsOpen(true)}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          className={cn(
            className,
            "transition-all duration-500",
            isPortrait && "h-auto w-auto max-h-[70vh] max-w-full mx-auto block",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
          {...props}
        />

        {showHint && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/2 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
            <div className="bg-[var(--claude-canvas)]/80 backdrop-blur-sm px-3 py-1.5 rounded-[var(--claude-radius-pill)] border border-[var(--claude-hairline)] transform scale-95 group-hover:scale-100 transition-all duration-500">
              <span className="text-[10px] uppercase tracking-widest text-[var(--claude-ink)]">
                {m.common_view_full_image()}
              </span>
            </div>
          </div>
        )}
      </div>

      <ClientOnly>
        <Lightbox
          src={src}
          alt={alt}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </ClientOnly>
    </>
  );
}
