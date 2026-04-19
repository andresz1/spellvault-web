import { useTranslation } from "next-i18next";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/components/ui/core";

export interface TocHeading {
  depth: number;
  text: string;
  slug: string;
}

interface TableOfContentsProps {
  headings: TocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const { t } = useTranslation("tutorial");
  const [activeSlug, setActiveSlug] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.slug))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0 },
    );

    for (const el of elements) {
      observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block sticky top-20 w-80 shrink-0 space-y-3">
      <p className="font-semibold text-sm">{t("toc.title")}</p>
      <nav aria-label={t("toc.title")}>
        <ol className="space-y-1.5 text-sm">
          {headings.map((h) => (
            <li key={h.slug} className={cn(h.depth === 3 && "pl-3")}>
              <a
                href={`#${h.slug}`}
                className={cn(
                  "transition-colors line-clamp-2",
                  activeSlug === h.slug
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
