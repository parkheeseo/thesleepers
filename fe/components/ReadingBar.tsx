"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";

export function ReadingBar({
  href,
  label,
  progress,
}: {
  href: string;
  label: string;
  progress?: number;
}) {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    if (progress !== undefined) {
      footer.style.setProperty("--progress", String(progress));
      return;
    }

    const text = document.querySelector<HTMLElement>(".artist-text");
    if (!text) return;

    const update = () => {
      const max = text.scrollHeight - text.clientHeight;
      const next = max <= 0 ? 0 : text.scrollTop / max;
      footer.style.setProperty("--progress", String(next));
    };

    update();
    text.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      text.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progress]);

  return (
    <footer
      ref={footerRef}
      className="site-footer"
      style={
        progress === undefined
          ? undefined
          : ({ "--progress": progress } as CSSProperties)
      }
    >
      <Link className="part-link" href={href}>
        <span className="part-label">{label}</span>
        <span className="part-label part-label-on-fill" aria-hidden="true">
          {label}
        </span>
      </Link>
    </footer>
  );
}
