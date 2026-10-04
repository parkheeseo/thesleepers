import { client } from "./client";

export type ArtistPageContent = {
  thumbnailUrl: string | null;
  text: string | null;
  reference: string | null;
};

const artistQuery = `*[_type == "artistAndExhibition"][0]{
  text,
  reference,
  "thumbnailUrl": thumbnail.asset->url
}`;

export function getArtistPage() {
  return client
    .withConfig({ useCdn: false })
    .fetch<ArtistPageContent | null>(artistQuery, {}, { cache: "no-store" });
}
