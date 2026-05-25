import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
      transparentMode: 'top',
    },
    githubUrl: `https://github.com/${gitConfig.user}/zipline`,
    links: [
      {
        text: 'Features',
        url: '/#features',
        active: 'url',
        on: 'nav',
      },
      {
        text: 'Documentation',
        url: '/docs/get-started',
        active: 'nested-url',
        on: 'nav',
      },
      {
        text: 'Releases',
        url: '/releases',
        active: 'nested-url',
        on: 'nav',
      },
    ],
  };
}
