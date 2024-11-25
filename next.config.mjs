import nextra from "nextra";
import crawlTags from "./src/utils/crawlTags.js";

const [_, file2tag] = await crawlTags.default();

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
  latex: true,
  transform(content, { route }) {
    if (route.startsWith("/atcoder/abc")) {
      const target = "<>";
      const index = content.indexOf(target);

      const tags = (file2tag.get("src/pages" + route + ".md") || [])
        .map(
          (tag) => `
            <Link href="/atcoder/tags/${tag}">
              <Chip color="primary" variant="dot">
                ${tag}
              </Chip>
            </Link>`
        )
        .join("");
      const html = `
        <_components.p>\n</_components.p>
        ${tags}
      `;
      content =
        content.slice(0, index + target.length) +
        html +
        content.slice(index + target.length);

      return (
        'import {Chip} from "@nextui-org/react";import Link from "next/link";' +
        content
      );
    }
    return content;
  },
  codeHighlight: true,
  readingTime: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
  },
};

export default withNextra(nextConfig);
