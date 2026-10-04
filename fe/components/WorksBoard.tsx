"use client";

import { useState } from "react";
import { ReadingBar } from "@/components/ReadingBar";
import type { WorkListItem, WorksInfo } from "@/sanity/works";

function text(value: string | null | undefined) {
  return value && value.trim() ? value : "—";
}

function fillProgress(number: string | null, total: number) {
  const value = Number(number);
  if (!Number.isFinite(value) || value <= 0 || total <= 0) return 0;
  return Math.min(1, value / total);
}

export function WorksBoard({
  info,
  works,
}: {
  info: WorksInfo | null;
  works: WorkListItem[];
}) {
  const [selectedId, setSelectedId] = useState(works[0]?._id ?? null);
  const selected = works.find((work) => work._id === selectedId) ?? null;

  return (
    <>
      <main className="works-layout layout">
        <section className="works-grid" aria-label="All works">
          {works.map((work) => (
            <button
              key={work._id}
              type="button"
              aria-pressed={work._id === selected?._id}
              aria-label={work.number ? `No. ${work.number}` : "Work"}
              onClick={() => setSelectedId(work._id)}
            >
              {work.thumbnailUrl ? <img src={work.thumbnailUrl} alt="" /> : null}
            </button>
          ))}
        </section>

        <section className="work-detail" aria-label="Selected work">
          <figure className="work-photo">
            {selected?.thumbnailUrl ? (
              <img src={selected.thumbnailUrl} alt={info?.title ?? "Selected work"} />
            ) : null}
          </figure>
          <dl className="work-meta">
            <div>
              <dt>Title</dt>
              <dd>{text(info?.title)}</dd>
            </div>
            <div>
              <dt>Number</dt>
              <dd>{text(selected?.number)}</dd>
            </div>
            <div>
              <dt>Medium</dt>
              <dd>{text(info?.medium)}</dd>
            </div>
            <div>
              <dt>Dimensions</dt>
              <dd>{text(info?.dimension)}</dd>
            </div>
            <div>
              <dt>Credit</dt>
              <dd>{text(info?.credit)}</dd>
            </div>
          </dl>
        </section>
      </main>

      <ReadingBar
        href="/event"
        label="Part 2. Works →"
        progress={fillProgress(selected?.number ?? null, works.length)}
      />
    </>
  );
}
