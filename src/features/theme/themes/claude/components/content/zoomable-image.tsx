import { ClientOnly } from "@tanstack/react-router"; import { useEffect, useRef, useState } from "react"; import { createPortal } from "react-dom"; import { cn } from "@/lib/utils"; import { m } from "@/paraglide/messages";

export default function ZoomableImage({ className="", alt="", src, showHint, width, height, ...props }: any) {
  const [open, setOpen] = useState(false); const [loaded, setLoaded] = useState(false); const ref = useRef<HTMLImageElement>(null);
  useEffect(() => { if (ref.current?.complete) setLoaded(true); }, []);
  if (!src) return null;
  const portrait = !!(width && height && height > width);
  return (<>
    <div className={cn("relative cursor-zoom-in overflow-hidden bg-[var(--geist-hairline-soft)]",portrait?"flex items-center justify-center w-full max-h-[70vh]":"w-full",!loaded&&"animate-pulse")} style={{ aspectRatio: !portrait && width && height ? `${width}/${height}` : "auto" }} onClick={() => setOpen(true)}>
      <img ref={ref} src={src} alt={alt} loading="lazy" onLoad={() => setLoaded(true)} className={cn(className,portrait&&"h-auto w-auto max-h-[70vh]",loaded?"opacity-100":"opacity-0")} {...props} />
      {showHint && <div className="absolute inset-0 bg-black/0 hover:bg-black/[.02] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity pointer-events-none"><div className="bg-[var(--geist-canvas-elevated)]/90 backdrop-blur-sm px-3 py-1 rounded-[var(--geist-radius-pill)] border border-[var(--geist-hairline)] text-xs text-[var(--geist-ink)]">{m.common_view_full_image()}</div></div>}
    </div>
    <ClientOnly>{open && createPortal(<div className="fixed inset-0 z-200 flex items-center justify-center bg-[var(--geist-canvas)]/98 backdrop-blur-xl" onClick={() => setOpen(false)}><img src={src} alt={alt} className="max-w-[90vw] max-h-[90vh] object-contain p-8" /></div>, document.body)}</ClientOnly>
  </>);
}
