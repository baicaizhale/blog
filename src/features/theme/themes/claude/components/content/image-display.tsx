import ZoomableImage from "@/features/theme/themes/claude/components/content/zoomable-image";
export function ImageDisplay({ src, alt, width, height }: { src: string; alt: string; width?: number; height?: number }) {
  return (
    <figure className="my-8"><div className="rounded-[var(--geist-radius-sm)] overflow-hidden border border-[var(--geist-hairline)]"><ZoomableImage src={src} alt={alt} width={width} height={height} className="w-full h-auto" showHint /></div>
      {alt && <figcaption className="mt-2 text-center"><span className="text-xs text-[var(--geist-mute)]">{alt}</span></figcaption>}
    </figure>
  );
}
