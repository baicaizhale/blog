import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import type { TableOfContentsItem } from "@/features/posts/utils/toc";
import { useActiveTOC } from "@/hooks/use-active-toc";

export default function TableOfContents({ headers }: { headers: TableOfContentsItem[] }) {
  const activeId = useActiveTOC(headers);
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeId || !navRef.current) return;
    const link = navRef.current.querySelector(`a[href="#${CSS.escape(activeId)}"]`);
    if (link instanceof HTMLElement) link.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeId]);

  if (!headers.length) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    navigate({ replace: true, hash: `#${id}` });
  };

  return (
    <nav ref={navRef} className="max-h-[70vh] overflow-y-auto">
      <h4 className="geist-eyebrow mb-3">On this page</h4>
      <ul className="space-y-1">
        {headers.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => handleClick(e, h.id)}
              className={`block text-sm py-1 transition-colors ${
                h.level === 2 ? "pl-0" : "pl-4"
              } ${
                activeId === h.id
                  ? "text-[var(--geist-link)] font-medium"
                  : "text-[var(--geist-mute)] hover:text-[var(--geist-ink)]"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
