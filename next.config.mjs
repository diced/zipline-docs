import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  serverExternalPackages: ['@takumi-rs/image-response'],
  reactStrictMode: true,
  redirects: async () => [
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
      source: '/api/docker-compose.yml',
      destination: '/docker-compose.yml',
      permanent: true,
    },
  ],
  distDir: 'build',
};

export default withMDX(config);
