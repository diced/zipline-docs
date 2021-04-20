module.exports = {
  title: "Zipline",
  tagline: "Fast & lightweight file uploading.",
  url: "https://zipline.diced.wtf/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "diced", // Usually your GitHub org/user name.
  projectName: "zipline", // Usually your repo name.
  themeConfig: {
    colorMode: {
      defaultMode: "dark"
    },
    algolia: {
      apiKey: "6c53c673cd48e2713f933f9f398412a0",
      indexName: "zipline",
      contextualSearch: true,
      searchParameters: {}
    },
    announcementBar: {
      id: "starzipline",
      content:
        '⭐️ If you like Zipline, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/dicedtomatoreal/zipline">GitHub</a>! ⭐️'
    },
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/dracula")
    },
    navbar: {
      title: "Zipline",
      logo: {
        alt: "Zipline Logo",
        src: "img/logo.svg"
      },
      items: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "left"
        },
        {
          href: "https://github.com/diced/zipline",
          label: "GitHub",
          position: "right"
        },
        {
          href: "https://github.com/diced/zipline-docs",
          label: "GitHub Docs",
          position: "right"
        },
        {
          href: "https://discord.gg/hCAS87WaQz",
          label: "Join us on Discord",
          position: "right"
        }
      ]
    },
    footer: {
      style: "dark",
      logo: {
        alt: "Deploy with Vercel",
        src: "https://vercel.com/button",
        href:
          "https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fdicedtomatoreal%2Fzipline-docs%2Ftree%2Fmaster"
      },
      copyright: `Copyright © ${new Date().getFullYear()} ZiplineProject. Built with Docusaurus. `
    }
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/dicedtomatoreal/zipline-docs/edit/master/"
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      }
    ]
  ]
};
