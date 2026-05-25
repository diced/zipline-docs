export type FooterLink = {
  title: string;
  href: string;
  external?: boolean;
  event?: string;
};

export type FooterColumn = {
  title: string;
  items: FooterLink[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: 'Zipline',
    items: [
      { title: 'Features', href: '/#features' },
      { title: 'Documentation', href: '/docs/get-started' },
      { title: 'Community', href: '/community' },
      {
        title: 'Sponsor',
        href: 'https://github.com/sponsors/diced',
        external: true,
        event: 'footer_link_sponsor',
      },
    ],
  },
  {
    title: 'Documentation',
    items: [
      { title: 'Get Started', href: '/docs/get-started' },
      { title: 'Config', href: '/docs/config' },
      { title: 'Migrate from v3', href: '/docs/migrate' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { title: 'Docker', href: '/docs/get-started/docker' },
      { title: 'OAuth', href: '/docs/guides/oauth' },
      { title: 'Reverse Proxies', href: '/docs/guides/reverse-proxy' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { title: 'GitHub', href: '/github', event: 'footer_link_github' },
      {
        title: 'GitHub Docs',
        href: '/github-docs',
        event: 'footer_link_github_docs',
      },
      { title: 'Discord', href: '/discord', event: 'footer_link_discord' },
      {
        title: 'v3 Docs',
        href: 'https://v3.zipline.diced.sh',
        external: true,
        event: 'footer_link_v3_docs',
      },
      {
        title: 'Version Search',
        href: 'https://search.zipline.diced.sh/',
        external: true,
        event: 'footer_link_version_search',
      },
      {
        title: 'Version API',
        href: 'https://github.com/diced/zipline-version',
        external: true,
        event: 'footer_link_version_api',
      },
    ],
  },
];
