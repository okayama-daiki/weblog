import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Weblog</span>,
  project: {
    link: "https://github.com/okayama-daiki/weblog",
  },
  docsRepositoryBase: "https://github.com/okayama-daiki/weblog/tree/main",
  banner: {
    key: "banner",
    text: "🚧 This website is under construction. 🚧",
  },
  toc: {
    backToTop: true,
  },
  feedback: {
    content: null,
  },
  navigation: false,
  gitTimestamp: null,
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{" "}
        <a href="https://daiki.dev" target="_blank">
          Daiki Okayama
        </a>
        .
      </span>
    ),
  },
};

export default config;
