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

const tag2file: Map<string, string[]> = new Map();
const file2tag: Map<string, string[]> = new Map();

async function crawlTags() {
  if (tag2file.size > 0) return [tag2file, file2tag];
  const mdFiles = glob.sync("src/pages/atcoder/**/*.{md,mdx}");
  for (const file of mdFiles) {
    const mdText = await readFile(file, "utf-8");
    const header = extractHeader(mdText);
    header.tags.forEach((tag) => {
      tag2file.set(tag, (tag2file.get(tag) || []).concat(file));
      file2tag.set(file, (file2tag.get(file) || []).concat(tag));
    });
  }
  return [tag2file, file2tag];
}

export default crawlTags;
