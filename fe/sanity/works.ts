import { client } from "./client";

export type WorkListItem = {
  _id: string;
  number: string | null;
  thumbnailUrl: string | null;
};

export type WorksInfo = {
  title: string | null;
  medium: string | null;
  dimension: string | null;
  credit: string | null;
};

export type WorksPageContent = {
  info: WorksInfo | null;
  works: WorkListItem[];
};

const worksQuery = `{
  "info": *[_type == "worksInfo"][0]{
    title,
    medium,
    dimension,
    credit
  },
  "works": *[_type == "work"]{
    _id,
    number,
    "thumbnailUrl": thumbnail.asset->url
  }
}`;

export async function getWorksPage() {
  const content = await client
    .withConfig({ useCdn: false })
    .fetch<WorksPageContent>(worksQuery, {}, { cache: "no-store" });

  const works = [...(content.works ?? [])].sort((a, b) => {
    return Number(a.number) - Number(b.number);
  });

  return { info: content.info ?? null, works };
}
