import { createReadStream, readdirSync, readFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { createClient } from "@sanity/client";

const projectId = "y3pnsf4w";
const dataset = "production";
const imagesDir = join(import.meta.dirname, "../../images/works");

const auth = JSON.parse(readFileSync(join(process.env.HOME, ".config/sanity/config.json"), "utf8"));
const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-09-22",
  token: auth.authToken,
  useCdn: false,
});

const info = {
  _id: "worksInfo",
  _type: "worksInfo",
  title: "The Sleepers (Les Dormeurs)",
  medium: "Gelatin silver print",
  dimension: 'Overall 61 1/4 × 176 × 1" (155.6 × 447 × 2.5 cm)',
  credit:
    "Acquired through the generosity of Clarissa A. Bronfman, Nathalie M. Cohen,\nJoseph M. Cohen, Ian M. Cook, David A. Dechman, Thomas Dunn, Anne Ehrenkranz, Robert Harteveldt, Charles Heilbronn, Jo Carole Lauder, Robert B. Menschel, Peter Norton, Donna Redel, Richard O. Rieger, Pamela Spiegel Sanders, Jon L. Stryker, Steven Tananbaum, and Clark B. Winter Jr., in honor of Quentin Bajac",
};

const files = readdirSync(imagesDir)
  .map((name) => {
    const match = name.match(/^(\d+)\.(avif|jpe?g|png|webp)$/i);
    if (!match) return null;
    return { name, number: String(Number(match[1])) };
  })
  .filter(Boolean)
  .sort((a, b) => Number(a.number) - Number(b.number));

const keptIds = [];

for (const file of files) {
  const asset = await client.assets.upload("image", createReadStream(join(imagesDir, file.name)), {
    filename: basename(file.name),
  });
  const id = `work-${file.number}`;
  await client.createOrReplace({
    _id: id,
    _type: "work",
    number: file.number,
    thumbnail: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    },
  });
  keptIds.push(id);
  console.log(`uploaded ${file.name} as number ${file.number}`);
}

await client.createOrReplace(info);
console.log("saved shared Works text");

const existing = await client.fetch('*[_type == "work"]._id');
let removed = 0;
for (const id of existing) {
  const publishedId = id.replace(/^drafts\./, "");
  if (keptIds.includes(publishedId)) continue;
  await client.delete(id);
  removed += 1;
}
console.log(`removed ${removed} old work documents`);

console.log(`done: ${keptIds.length} works`);
