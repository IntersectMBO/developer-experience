import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const organizationName = "IntersectMBO";
const projectName = "developer-experience";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Cardano Developer Experience",
  tagline: "Community-driven developer experience initiatives at Intersect MBO",
  favicon: "img/favicon.png",
  // GitHub Pages adds a trailing slash by default that I don't want
  trailingSlash: false,

  // Add Google Fonts
  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
      type: 'text/css',
    },
  ],

  // Set the production url of your site here
  url: 'https://devex.intersectmbo.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For custom domain deployment
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName, // Usually your GitHub org/user name.
  projectName, // Usually your repo name.

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
      } satisfies Preset.Options,
    ],
  ],

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },

  plugins: [
    function suppressVscodeLspWarning() {
      return {
        name: "suppress-vscode-lsp-warning",
        configureWebpack() {
          return {
            ignoreWarnings: [
              {
                module: /vscode-languageserver-types/,
                message: /Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/,
              },
            ],
          };
        },
      };
    },
  ],

  themes: [
    "@docusaurus/theme-mermaid",
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        language: ["en"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: "/docs",
        forceIgnoreNoIndex: true,
      },
    ],
  ],

  themeConfig: {
    metadata: [
      { name: "keywords", content: "Cardano, developer experience, blockchain, smart contracts, DeFi, Intersect MBO" },
      { name: "author", content: "Intersect MBO Developer Experience Working Group" },
    ],
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Developer Experience",
      logo: {
        alt: "Intersect MBO Logo",
        src: "img/intersect-logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          type: "dropdown",
          label: "Resources",
          position: "left",
          items: [
            {
              label: "Getting Started",
              to: "/docs/getting-started",
            },
            {
              label: "How-to Guides",
              to: "/docs/how-to-guide/beginner",
            },
            {
              label: "Working Groups",
              to: "/docs/working-group/",
            },
          ],
        },
        {
          label: "FAQs",
          to: "/docs/faq",
          position: "left",
        },
        {
          type: "search",
          position: "right",
        },
        {
          href: "https://github.com/IntersectMBO/developer-experience",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://intersectmbo.org",
          label: "Intersect MBO",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "Getting Started",
              to: "/docs/getting-started",
            },
            {
              label: "How-to Guides",
              to: "/docs/how-to-guide/beginner",
            },
            {
              label: "Working Groups",
              to: "/docs/working-group/",
            },
          ],
        },
        {
          title: "Intersect Ecosystem",
          items: [
            {
              label: "Intersect MBO",
              href: "https://intersectmbo.org",
            },
            {
              label: "Cardano Foundation",
              href: "https://cardanofoundation.org",
            },
            {
              label: "IOG",
              href: "https://iohk.io",
            },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "GitHub Repository",
              href: "https://github.com/IntersectMBO/developer-experience",
            },
            {
              label: "Community Resources",
              to: "/docs/resources/community",
            },
            {
              label: "Tools & APIs",
              to: "/docs/resources/tools",
            },
            {
              label: "FAQs",
              to: "/docs/faq",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Intersect MBO. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  customFields: {
    googleScriptUrl: process.env.GOOGLE_SCRIPT_URL,
  },
};

export default config;
