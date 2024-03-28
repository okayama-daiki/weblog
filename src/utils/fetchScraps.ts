import * as fs from "fs";
import { parse } from "@progfay/scrapbox-parser";

const BASE_URL = process.env.SCRAPBOX_BASE_URL;
const cookies = {
  "connect.sid": process.env.SCRAPBOX_CONNECT_SID,
};
const headers = {
  cookie: Object.entries(cookies)
    .map(([key, value]) => `${key}=${value}`)
    .join("; "),
};

async function fetchScrapPageList() {
  const searchParams = new URLSearchParams({ limit: "200" });
  const response = await fetch(`${BASE_URL}?${searchParams}`, {
    headers,
  });
  const data: {
    projectName: string;
    skip: number;
    limit: number;
    count: number;
    pages: {
      id: string;
      title: string;
    }[];
  } = await response.json();
  return data;
}

async function fetchScrapPage(title: string) {
  const url = encodeURI(`${BASE_URL}/${title}/text`);
  const response = await fetch(url, {
    headers,
  });
  const data = await response.text();
  return data;
}

async function convertScrapToMarkdown(
  abc_no: string,
  abc_alphaget: string,
  text: string
) {
  const parsed = parse(text);
  const lines = [];
  const images = [];
  const tags = [];
  for (const jsObject of parsed) {
    switch (jsObject.type) {
      case "title":
        lines.push(`# ${jsObject.text}\n`);
        break;
      case "line":
        const line = [];
        for (const node of jsObject.nodes) {
          switch (node.type) {
            case "plain":
              line.push(node.text);
              break;
            case "strong":
              line.push(`**${node.nodes.map((n) => n.raw).join("")}**`);
              break;
            case "link":
              line.push(`[${node.content || node.href}](${node.href})  `);
              break;
            case "code":
              line.push(`\`${node.text}\``);
              break;
            case "formula":
              line.push(` $${node.formula}$ `);
              break;
            case "quote":
              line.push(`> ${node.nodes.map((n) => n.raw).join("")}`);
              break;
            case "blank":
              line.push(``);
              break;
            case "icon":
              if (node.path == "hr") {
                line.push(`---`);
              }
              break;
            case "image":
              images.push(node.src);
              line.push(
                `![](../../../../../src/assets/atcoder/abc/${abc_no}/${abc_alphaget}-${images.length}.png)`
              );
              break;
            case "hashTag":
              tags.push(node.href);
              break;
            case "numberList":
              line.push(
                `${node.number}. ${node.nodes.map((n) => n.raw).join("")}`
              );
              break;
            case "decoration":
              let text = node.nodes.map((n) => n.raw).join("");
              if (node.rawDecos.includes("*")) {
                text = `**${text}**`;
              }
              if (node.rawDecos.includes("/")) {
                text = `_${text}_`;
              }
              if (node.rawDecos.includes("-")) {
                text = `~~${text}~~`;
              }
              line.push(text);
              break;
            default:
              console.log(node);
          }
        }
        lines.push(line.join(""));
        break;
      case "codeBlock":
        lines.push(`\`\`\`${jsObject.fileName}`);
        lines.push(jsObject.content);
        lines.push("```");
        break;
      default:
        console.log(jsObject);
    }
  }
  for (let i = 0; i < images.length; i++) {
    const url = images[i];
    const response = await fetch(url, { headers });
    const buffer = await response.arrayBuffer();
    const filename = `./src/assets/atcoder/abc/${abc_no}/${abc_alphaget}-${
      i + 1
    }.png`;
    const dir = filename.replace(/\/[^/]+$/, "");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filename, Buffer.from(buffer));
  }
  const header = "---\n" + "tags: [" + tags.join(", ") + "]\n" + "---\n\n";
  const body =
    lines.join("\n").replace(/，/g, "、").replace(/．/g, "。").trimEnd() + "\n";
  return header + body;
}

function createFile(abc_no: string, abc_alphabet: string, markdown: string) {
  const filename = `./src/pages/atcoder/abc/${abc_no}/${abc_alphabet}.md`;
  const dir = filename.replace(/\/[^/]+$/, "");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filename, markdown);
}

async function main() {
  const list = await fetchScrapPageList();
  let counter = 0;
  for (const page of list.pages) {
    console.log(`${++counter}/${list.count}`);

    const pattern = /ABC(\d{3}) (\w)/;
    const match = page.title.match(pattern);
    if (!match) continue;

    const abc_no = match[1];
    const abc_alphabet = match[2];

    const text = await fetchScrapPage(page.title);
    const markdown = await convertScrapToMarkdown(abc_no, abc_alphabet, text);

    createFile(abc_no, abc_alphabet, markdown);

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

main();
