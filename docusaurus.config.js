module.exports = {
  title: 'Zipline',
  tagline: 'Fast & lightweight file uploading.',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'ziplineproject', // Usually your GitHub org/user name.
  projectName: 'zipline', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Zipline',
      logo: {
        alt: 'Zipline Zip Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/ziplineproject/zipline',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'Deploy with Vercel',
        src: 'https://vercel.com/button',
        href: 'https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fdicedtomatoreal%2Fzipline-docs%2Ftree%2Fmaster'
      },
      copyright: `Copyright © ${new Date().getFullYear()} ZiplineProject. Built with Docusaurus. `,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/ziplineproject/zipline-docs/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        }
      }
    ]
  ]
};
