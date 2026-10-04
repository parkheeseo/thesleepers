import Link from "next/link";

export function PartLink({ href, label }: { href: string; label: string }) {
  return (
    <footer className="site-footer">
      <Link className="part-link" href={href}>
        {label}
      </Link>
    </footer>
  );
}
