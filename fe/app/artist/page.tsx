import type { Metadata } from "next";
import Link from "next/link";
import { Menu } from "@/components/Menu";
import { ReadingBar } from "@/components/ReadingBar";
import { getArtistPage } from "@/sanity/artist";

export const metadata: Metadata = {
  title: "Artist and Exhibition",
};

function referenceItems(reference: string) {
  const items: { number: string | null; body: string }[] = [];

  for (const rawLine of reference.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;

    const match = line.match(/^(\d+)\.\s+([\s\S]*)$/);
    if (match) {
      items.push({ number: match[1], body: match[2] });
      continue;
    }

    const previous = items.at(-1);
    if (previous) {
      previous.body = `${previous.body} ${line}`;
    } else {
      items.push({ number: null, body: line });
    }
  }

  return items;
}

export default async function ArtistPage() {
  const content = await getArtistPage();
  const references = content?.reference ? referenceItems(content.reference) : [];

  return (
    <div className="page-artist">
      <header className="site-header layout">
        <Link className="site-title" href="/">
          Sophie Calle : The Sleepers
        </Link>
        <h1 className="page-title">Artist and Exhibition</h1>
        <Menu current="/artist" />
      </header>

      <main className="artist-layout layout">
        <figure className="artist-photo">
          {content?.thumbnailUrl ? (
            <img src={content.thumbnailUrl} alt="" />
          ) : null}
        </figure>
        <article className="artist-text">{content?.text}</article>
        <div className="artist-reference">
          {references.map((item) => (
            <p key={`${item.number ?? "x"}-${item.body}`}>
              {item.number ? <span className="ref-num">{item.number}.</span> : null}
              <span className="ref-body">{item.body}</span>
            </p>
          ))}
        </div>
      </main>

      <ReadingBar href="/works" label="Part 1. Artist and Exhibition →" />
    </div>
  );
}
