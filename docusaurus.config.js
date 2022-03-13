const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Zipline',
  tagline: 'Zipline is a ShareX/file upload server that is easy to use, packed with features and can be setup in one command!',
  url: 'https://zipline.diced.me',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'diced', // Usually your GitHub org/user name.
  projectName: 'zipline', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/diced/zipline/edit/newer/website/',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      prism: {
        additionalLanguages: ['toml', 'log', 'nginx']
      },
      navbar: {
        title: 'Zipline',
        logo: {
          alt: 'Zipline',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'get-started',
            position: 'left',
            label: 'Get Started',
          },
          {
            type: 'doc',
            docId: 'config/overview',
            position: 'left',
            label: 'Configuration',
          },
          {
            type: 'doc',
            docId: 'uploaders/sharex',
            position: 'left',
            label: 'Uploaders',
          },
          {
            href: 'https://github.com/diced/zipline',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Get Started',
                to: '/docs/get-started',
              },
              {
                label: 'Configuration',
                to: '/docs/config/overview',
              },
              {
                label: 'NGINX Config',
                to: '/docs/nginx',
              },
              {
                label: 'Uploaders',
                to: '/docs/uploaders/sharex',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/EAhCRfGxCF',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/diced/zipline',
              },
              {
                label: 'GitHub Docs',
                href: 'https://github.com/diced/zipline-docs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} diced, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
