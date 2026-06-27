import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { TableOfContentsItem } from "@/features/posts/utils/toc";
import { useActiveTOC } from "@/hooks/use-active-toc";

export default function TableOfContents({
  headers,
}: {
  headers: Array<TableOfContentsItem>;
}) {
  const activeId = useActiveTOC(headers);
  const [, setIndicatorTop] = useState<number>(0);
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeId && navRef.current) {
      const container = navRef.current;
      const activeLink = container.querySelector(
        `a[href="#${CSS.escape(activeId)}"]`,
      );

      if (activeLink instanceof HTMLElement) {
        const listRect = container
          .querySelector(".toc-root")
          ?.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        if (listRect) {
          setIndicatorTop(linkRect.top - listRect.top);
        }

        const linkTop =
          container.scrollTop + (linkRect.top - containerRect.top);
        const linkBottom = linkTop + linkRect.height;
        const padding = 40;

        if (linkBottom > container.scrollTop + containerRect.height - padding) {
          container.scrollTo({
            top: linkBottom - containerRect.height + padding,
            behavior: "smooth",
          });
        } else if (linkTop < container.scrollTop + padding) {
          container.scrollTo({
            top: Math.max(0, linkTop - padding),
            behavior: "smooth",
          });
        }
      }
    }
  }, [activeId]);

  if (headers.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      navigate({ replace: true, hash: `#${id}` });
    }
  };

  return (
    <nav ref={navRef} className="max-h-[70vh] overflow-y-auto toc-scrollbar">
      <h4 className="text-xs font-medium text-[var(--claude-muted)] uppercase tracking-wider mb-3">
        On this page
      </h4>
      <ul className="toc-root space-y-1.5">
        {headers.map((header) => (
          <li key={header.id}>
            <a
              href={`#${header.id}`}
              onClick={(e) => handleClick(e, header.id)}
              className={`block text-sm py-1 transition-colors ${
                header.level === 2 ? "pl-0" : "pl-4"
              } ${
                activeId === header.id
                  ? "text-[var(--claude-primary)] font-medium"
                  : "text-[var(--claude-muted)] hover:text-[var(--claude-ink)]"
              }`}
            >
              {header.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
