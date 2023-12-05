/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  distDir: 'build',
  redirects: async () => {
    return [
      {
        source: '/docs',
        destination: '/docs/get-started',
        permanent: true,
      },
      {
        source: '/github',
        destination: 'https://github.com/diced/zipline',
        permanent: true,
      },
      {
        source: '/github-docs',
        destination: 'https://github.com/diced/zipline-docs',
        permanent: true,
      },
      {
        source: '/discord',
        destination: 'https://discord.gg/EAhCRfGxCF',
        permanent: true,
      },
      {
        source: '/v4/r',
        destination: 'https://diced.notion.site/Zipline-v4-Roadmap-058aceb8a35140e7af4c726560aa3db1?pvs=4',
        permanent: true,
      },
      {
        source: '/v4/d',
        destination: 'https://github.com/diced/zipline/discussions/433',
        permanent: true,
      },
      {
        source: '/v4/g',
        destination: 'https://github.com/diced/zipline/tree/v4',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
