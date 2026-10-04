import type { Metadata } from "next";
import Link from "next/link";
import { Menu } from "@/components/Menu";

export const metadata: Metadata = {
  title: "Event",
};

export default function EventPage() {
  return (
    <div className="page-event">
      <header className="site-header layout">
        <Link className="site-title" href="/">
          Sophie Calle : The Sleepers
        </Link>
        <h1 className="page-title">Event</h1>
        <Menu current="/event" />
      </header>

      <main className="event-layout layout" />
    </div>
  );
}
