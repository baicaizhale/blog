import { ChevronDown, Languages } from "lucide-react"; import { useEffect, useRef, useState } from "react"; import { getLocale, setLocale } from "@/paraglide/runtime";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false); const ref = useRef<HTMLDivElement>(null); const locale = getLocale();
  useEffect(() => { const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false); }; document.addEventListener("mousedown", handler); return () => document.removeEventListener("mousedown", handler); }, []);
  return (<div className={`relative ${className}`} ref={ref}><button onClick={() => setIsOpen(!isOpen)} className="flex items-center text-sm text-[var(--geist-mute)] hover:text-[var(--geist-ink)] transition-colors" type="button"><Languages size={16} strokeWidth={1.5} /><ChevronDown size={12} className={`ml-0.5 transition-transform ${isOpen?"rotate-180":""}`} /></button>
    {isOpen && <div className="absolute top-full right-0 mt-2 w-28 bg-[var(--geist-canvas-elevated)] border border-[var(--geist-hairline)] z-50 py-1 rounded-[var(--geist-radius-sm)] shadow-lg">
      <button onClick={() => { setLocale("zh"); setIsOpen(false); }} className={`w-full text-left px-3 py-1.5 text-sm ${locale==="zh"?"text-[var(--geist-ink)] font-medium":"text-[var(--geist-mute)] hover:text-[var(--geist-ink)]"}`} type="button">中文</button>
      <button onClick={() => { setLocale("en"); setIsOpen(false); }} className={`w-full text-left px-3 py-1.5 text-sm ${locale==="en"?"text-[var(--geist-ink)] font-medium":"text-[var(--geist-mute)] hover:text-[var(--geist-ink)]"}`} type="button">English</button>
    </div>}
  </div>);
}
