/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    ];
  },
};

module.exports = nextConfig;
