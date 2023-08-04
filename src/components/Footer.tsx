import { IconArrowRight, IconBrandDiscordFilled, IconBrandGithubFilled } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { randomStr } from '../lib/random';
import Container from './Container';
import ThemeDropdown from './ThemeDropdown';

const items = [
  {
    title: 'Zipline',
    items: [
      { title: 'Features', href: '/#features' },
      { title: 'Docs', href: '/docs' },
      { title: 'Community', href: '/community' },
      { title: 'Sponsor', href: 'https://github.com/sponsors/diced' },
    ],
  },
  {
    title: 'Docs',
    items: [
      { title: 'Get Started', href: '/docs/get-started' },
      { title: 'API Reference', href: '/docs/api' },
      { title: 'Config', href: '/docs/config' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { title: 'NGINX Proxy', href: '/docs/guides/nginx/nginx-no-ssl' },
      { title: 'ShareX', href: '/docs/guides/uploaders/sharex' },
      { title: 'Discord Webhooks', href: '/docs/guides/discord-webhooks' },
      { title: 'OAuth2', href: '/docs/guides/oauth' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { title: 'GitHub', href: '/github' },
      { title: 'GitHub Docs', href: '/github-docs' },
      { title: 'Discord', href: '/discord' },
    ],
  },
];

export default function Footer() {
  return (
    <div className='dark:bg-gray-900 border-gray-100 dark:border-gray-800 border-t'>
      <Container>
        <div className='max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8'>
          <div className='flex md:flex-row flex-col items-center h-auto justify-between'>
            <div className='flex flex-col items-center'>
              <div className='flex items-center'>
                <p className='text-4xl font-bold mx-6'>Zipline</p>
                <div className='flex flex-row space-x-4'>
                  <Link href='/github' aria-label='github'>
                    <IconBrandGithubFilled className='fill-black dark:fill-white h-6 w-6 transition-colors ease-in-out hover:fill-gray-200' />
                  </Link>
                  <Link href='/discord' aria-label='discord'>
                    <IconBrandDiscordFilled className='fill-[#5865F2] hover:fill-[#4750b5] h-6 w-6 transition-colors ease-in-out' />
                  </Link>
                </div>
              </div>

              <div className='text-gray-300 py-2 rounded-md font-normal text-md'>
                © {new Date().getFullYear()} diced. All rights reserved.
              </div>
              <ThemeDropdown withName />
            </div>

            <div className='justify-center'>
              <div className='md:ml-10 md:flex md:flex-row my-6 md:my-0 flex-col items-baseline md:space-x-20'>
                {items.map((item) => (
                  <div key={randomStr()} className='py-2 rounded-md font-medium text-md'>
                    <span className='text-lg text-gray-600 dark:text-gray-300'>{item.title}</span>
                    <div className='flex flex-col'>
                      {item.items.map((subItem) => (
                        <Link
                          key={randomStr()}
                          href={subItem.href}
                          className='flex transition-colors ease-in-out text-gray-300 hover:text-blue-400 py-2 rounded-md font-normal text-md text-center'
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
