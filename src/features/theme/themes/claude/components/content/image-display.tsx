import ZoomableImage from "@/features/theme/themes/claude/components/content/zoomable-image";

export function ImageDisplay({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-10 group relative block">
      <div className="relative overflow-hidden rounded-[var(--claude-radius-md)] border border-[var(--claude-hairline)]">
        <ZoomableImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover max-h-200 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] scale-100 group-hover:scale-[1.01]"
          showHint={true}
        />
      </div>

      {alt && (
        <figcaption className="mt-3 text-center">
          <span className="text-xs text-[var(--claude-muted)]">
            {alt}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
