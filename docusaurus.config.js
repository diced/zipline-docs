// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/vsLight');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Zipline',
  tagline: 'A ShareX / file upload server',
  url: 'https://zipline.diced.tech',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'diced',
  projectName: 'zipline',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/diced/zipline-docs/tree/v4/',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  // plugins: [
  //   [
  //     '@docusaurus/plugin-pwa',
  //     {
  //       debug: true,
  //       offlineModeActivationStrategies: [
  //         'appInstalled',
  //         'standalone',
  //         'queryString',
  //       ],
  //       pwaHead: [
  //         {
  //           tagName: 'link',
  //           rel: 'icon',
  //           href: '/img/zipline.png',
  //         },
  //         {
  //           tagName: 'link',
  //           rel: 'manifest',
  //           href: '/manifest.json',
  //         },
  //         {
  //           tagName: 'meta',
  //           name: 'theme-color',
  //           content: '#0d7ce2',
  //         },
  //       ],
  //     },
  //   ],
  // ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        { name: 'keywords', content: 'zipline, sharex, file uploader' }
      ],
      colorMode: {
        respectPrefersColorScheme: true,
        defaultMode: 'dark',
      },
      navbar: {
        title: 'Zipline',
        logo: {
          alt: 'Zipline Image',
          src: 'img/zipline.svg',
        },
        items: [
          {
            to: '/',
            label: 'Home',
            position: 'left',
            activeBaseRegex: '^/$'
          },
          {
            type: 'doc',
            docId: 'get-started',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/diced/zipline',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://discordapp.com/invite/EAhCRfGxCF',
            label: 'Discord',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/diced/zipline',
              },
              {
                label: 'GitHub docs',
                href: 'https://github.com/diced/zipline-docs'
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/EAhCRfGxCF',
              },
            ],
          },
          {},
          {
            title: 'Docs',
            items: [
              {
                to: '/docs/get-started',
                label: 'Get Started',
              },
              {
                to: '/docs/config',
                label: 'Configuration',
              },
            ]
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} diced, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['nginx']
      },
      algolia: {
        appId: 'BXUJSM62NY',
        apiKey: '94e0a10b58aab0c08fcb8c7d1821fbb3',
        indexName: 'zipline',
        contextualSearch: false,
      },
    }),
};

module.exports = config;
