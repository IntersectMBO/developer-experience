import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import dotenv from 'dotenv';
// One source for the five tracks: the navbar's Your Path menu and band 02 read the
// same list, so a renamed track cannot appear in one place and not the other.
import { topics, tracks } from './src/data/landing';

dotenv.config({ path: '.env' });

const organizationName = "IntersectMBO";
const projectName = "developer-experience";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Cardano Developer Experience",
  tagline: "Community-driven developer experience initiatives at Intersect MBO",
  favicon: "img/favicon.png",
  // GitHub Pages serves directories with a trailing slash; align Docusaurus output
  // so relative links from directory indexes (readme.md) resolve correctly.
  trailingSlash: true,

  // Self-hosted webfonts: @font-face rules and the woff2 files both live in
  // website/static/fonts, served from this origin so no page calls out to a
  // font CDN. Served verbatim (not bundled) so the browser fetches only the
  // subsets and weights the page actually renders.
  stylesheets: ['/fonts/fonts.css'],

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
  onBrokenAnchors: "throw",

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
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: "/docs/how-to-guide/beginner/howtocreateaddress",
            to: "/docs/how-to-guide/beginner/address/",
          },
          {
            from: "/docs/resources/tools",
            to: "/docs/resources/repositories/",
          },
          {
            from: "/docs/how-to-guide/intermediate",
            to: "/docs/how-to-guide/beginner/",
          },
          {
            from: "/docs/tutorials/readme",
            to: "/docs/tutorials/local-cardano-payment-detector/",
          },
          {
            // These eight pages carried no slug, so their URLs came from the folder
            // path (numeric prefixes stripped, the literal "sessions" kept). They now
            // carry a slug in the shape every other session uses, and these keep the
            // old routes alive.
            from: "/docs/working-group/sessions/q1-2026/community-builder-story/session-notes/",
            to: "/docs/working-group/q1-2026/sessions/09-community-builder-story/session-notes/",
          },
          {
            from: "/docs/working-group/sessions/q1-2026/open-source-docs/session-notes/",
            to: "/docs/working-group/q1-2026/sessions/11-open-source-docs/session-notes/",
          },
          {
            from: "/docs/working-group/sessions/q1-2026/cardano-developer-pathway/session-notes/",
            to: "/docs/working-group/q1-2026/sessions/12-cardano-developer-pathway/session-notes/",
          },
          {
            from: "/docs/working-group/sessions/q4-2025/kickoff-orientation/session-notes/",
            to: "/docs/working-group/q4-2025/sessions/01-kickoff-orientation/session-notes/",
          },
          {
            from: "/docs/working-group/sessions/q4-2025/dev-opportunities/session-notes/",
            to: "/docs/working-group/q4-2025/sessions/02-dev-opportunities/session-notes/",
          },
          {
            from: "/docs/working-group/sessions/q4-2025/dev-environment-setup/session-notes/",
            to: "/docs/working-group/q4-2025/sessions/03-dev-environment-setup/session-notes/",
          },
          {
            from: "/docs/working-group/sessions/q4-2025/essential-links/session-notes/",
            to: "/docs/working-group/q4-2025/sessions/04-essential-links/session-notes/",
          },
          {
            from: "/docs/working-group/sessions/q4-2025/repo-walkthrough/session-notes/",
            to: "/docs/working-group/q4-2025/sessions/06-repo-walkthrough/session-notes/",
          },
          {
            // These six pages carried slugs that said q1-2025 while their folders say
            // q1-2026. The slugs now match the folder; the old routes stay alive.
            from: "/docs/working-group/q1-2025/sessions/07-contributing-intersect/recordings/",
            to: "/docs/working-group/q1-2026/sessions/07-contributing-intersect/recordings/",
          },
          {
            from: "/docs/working-group/q1-2025/sessions/07-contributing-intersect/session-notes/",
            to: "/docs/working-group/q1-2026/sessions/07-contributing-intersect/session-notes/",
          },
          {
            from: "/docs/working-group/q1-2025/sessions/08-open-clinic-1/recordings/",
            to: "/docs/working-group/q1-2026/sessions/08-open-clinic-1/recordings/",
          },
          {
            from: "/docs/working-group/q1-2025/sessions/08-open-clinic-1/session-notes/",
            to: "/docs/working-group/q1-2026/sessions/08-open-clinic-1/session-notes/",
          },
          {
            from: "/docs/working-group/q1-2025/sessions/08-open-clinic-1/session-resources/",
            to: "/docs/working-group/q1-2026/sessions/08-open-clinic-1/session-resources/",
          },
          {
            from: "/docs/working-group/q1-2025/sessions/08-open-clinic-1/session-2/recordings/",
            to: "/docs/working-group/q1-2026/sessions/08-open-clinic-1/session-2/recordings/",
          },
          {
            // Two folder-derived routes under the wallet-integration session: its
            // Session-1 pages had no slug, so their URLs came from the folder, which
            // these renames changed. One capitalised slug is corrected below too.
            from: "/docs/working-group/sessions/q1-2026/wallet-integration/Session-1/session-notes/",
            to: "/docs/working-group/q1-2026/sessions/10-wallet-integration/session-1/session-notes/",
          },
          {
            from: "/docs/working-group/sessions/q1-2026/wallet-integration/Session-1/recordings/",
            to: "/docs/working-group/q1-2026/sessions/10-wallet-integration/session-1/recordings/",
          },
          {
            from: "/docs/working-group/q1-2026/sessions/10-wallet-integration/Session-2/recordings/",
            to: "/docs/working-group/q1-2026/sessions/10-wallet-integration/session-2/recordings/",
          },
          {
            // The folder was misspelled sesion-notes until 2026-11; the route comes
            // from the directory name, so the old URL is kept alive here. It points
            // at the slug route directly, so this stays one hop.
            from: "/docs/working-group/sessions/q4-2025/repo-walkthrough/sesion-notes/",
            to: "/docs/working-group/q4-2025/sessions/06-repo-walkthrough/session-notes/",
          },
        ],
        createRedirects(existingPath: string) {
          const renamedSessionPaths = [
            {
              from: "/docs/working-group/q2-2026/sessions/18-ai-dev-workflow",
              to: "/docs/working-group/q2-2026/sessions/18-cardano-ai-dev-workflow/",
            },
            {
              from: "/docs/working-group/q2-2026/sessions/18-cardano-mcp-server",
              to: "/docs/working-group/q2-2026/sessions/19-cardano-mcp-server/",
            },
            {
              from: "/docs/working-group/q2-2026/sessions/19-one-api-call-blockfrost",
              to: "/docs/working-group/q2-2026/sessions/20-one-api-call-blockfrost/",
            },
            {
              from: "/docs/working-group/q2-2026/sessions/20-cardano-production-sdk",
              to: "/docs/working-group/q2-2026/sessions/21-cardano-production-sdk/",
            },
          ];

          const renamedSession = renamedSessionPaths.find(
            ({ to }) => existingPath === to || existingPath.startsWith(to),
          );

          return renamedSession
            ? [existingPath.replace(renamedSession.to, `${renamedSession.from}/`)]
            : undefined;
        },
      },
    ],
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
    // The toggle is a navbar item (src/theme/NavbarItem/ComponentTypes.tsx), placed before
    // the search field. Docusaurus appends its own after every right-hand item, so it has
    // to be switched off here or the bar shows two.
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    metadata: [
      { name: "keywords", content: "Cardano, developer experience, blockchain, smart contracts, DeFi, Intersect MBO" },
      { name: "author", content: "Intersect MBO Developer Experience Working Group" },
    ],
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      // The lockup carries the wordmark, so the bar renders no text beside it.
      title: "",
      logo: {
        alt: "Developer Experience",
        src: "img/devex-logo-lockup.png",
      },
      items: [
        // Four things, two menus, one meaning each, after docs.logos.co: the entry
        // point, intent, and surface. Both menus read the landing page's own data, so
        // the bar and bands 02 and 03 cannot drift apart.
        {
          label: "Get started",
          to: "/docs/getting-started/",
          position: "left",
        },
        {
          type: "dropdown",
          label: "Your Path",
          position: "left",
          items: tracks.map((track) => ({
            label: track.title,
            to: track.href,
          })),
        },
        {
          type: "dropdown",
          label: "Explore",
          position: "left",
          // The eight library topics from band 03, in the band's order.
          items: topics.map((topic) => ({
            label: topic.title,
            to: topic.href,
          })),
        },
        {
          type: "search",
          position: "right",
        },
        {
          type: "custom-githubIcon",
          href: "https://github.com/IntersectMBO/developer-experience",
          label: "GitHub",
          position: "right",
        },
        {
          // Last, at the corner: the one control with no label and no count, in the
          // place a mode switch sits on every operating system.
          type: "custom-colorModeToggle",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      // The same mark the navbar carries, so the footer closes the page with the
      // site's identity rather than starting cold with a column heading.
      logo: {
        alt: "Developer Experience",
        src: "img/intersect-logo.png",
        href: "/",
        width: 32,
        height: 32,
      },
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "Getting Started",
              to: "/docs/getting-started/",
            },
            {
              label: "How-to Guides",
              to: "/docs/how-to-guide/beginner/",
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
              to: "/docs/resources/community/",
            },
            {
              label: "Repositories & Tools",
              to: "/docs/resources/repositories/",
            },
            {
              label: "Brand Kit",
              to: "/brand-kit",
            },
            {
              label: "FAQs",
              to: "/docs/faq/",
            },
            {
              label: "Notable Contributors",
              to: "/docs/notable-contributors/",
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
};

export default config;
