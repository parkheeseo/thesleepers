"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { pages } from "@/lib/nav";

export function Menu({ current }: { current: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <>
      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="menu-icon" aria-hidden="true" />
        <span className="visually-hidden">Menu</span>
      </button>
      <nav id="site-menu" className="site-menu layout" aria-label="Pages" hidden={!open}>
        <div className="site-intro">
          <Link className="site-title" href="/">
            Sophie Calle : The Sleepers
          </Link>
          <p className="exhibition-dates">2026.9.28 — 2027.1.29 | Seoul Museum of Art</p>
        </div>
        <div className="site-nav">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              aria-current={current === page.href ? "page" : undefined}
            >
              {page.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
