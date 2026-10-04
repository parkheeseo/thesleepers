import Link from "next/link";
import { pages } from "@/lib/nav";

export default function HomePage() {
  return (
    <div className="page-home">
      <header className="site-header layout">
        <div className="site-intro">
          <Link className="site-title" href="/">
            Sophie Calle : The Sleepers
          </Link>
          <p className="exhibition-dates">2026.9.28 — 2027.1.29 | Seoul Museum of Art</p>
        </div>

        <nav className="site-nav" aria-label="Pages">
          {pages.map((page) => (
            <Link key={page.href} href={page.href} aria-current={page.href === "/" ? "page" : undefined}>
              {page.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="home-photo" aria-label="Exhibition photograph" />
    </div>
  );
}
