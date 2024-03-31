import { readFile } from "node:fs/promises";
import { glob } from "glob";

type Header = {
  tags: string[];
};

function extractHeader(mdText: string): Header {
  const header: Header = { tags: [] };
  const rawHeader = mdText.match(/^---\n(.*?)\n---\n/s)?.[1];
  if (!rawHeader) return header;
  rawHeader.split("\n").forEach((line) => {
    const [key, value] = line.split(": ");
    switch (key) {
      case "tags":
        // Note value is like: "[tag1, tag2, tag3]"
        const tags = value.substring(1, value.length - 1).split(", ");
        for (let tag of tags) {
          tag = tag.replace(/"/g, "").trim();
          if (!tag) continue;
          header.tags.push(tag);
        }
        break;
      default:
        break;
    }
  });
  return header;
}

export default async function crawlTags() {
  const mdFiles = glob.sync("src/pages/atcoder/**/*.{md,mdx}");
  const tags: Map<string, string[]> = new Map();
  for (const file of mdFiles) {
    const mdText = await readFile(file, "utf-8");
    const header = extractHeader(mdText);
    header.tags.forEach((tag) =>
      tags.set(tag, (tags.get(tag) || []).concat(file))
    );
  }
  return tags;
}
