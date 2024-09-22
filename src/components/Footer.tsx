import {
  IconBrandDiscordFilled,
  IconBrandGithubFilled,
} from '@tabler/icons-react';
import Link from 'next/link';
import Container from './Container';
import ThemeDropdown from './ThemeDropdown';

const items = [
  {
    title: 'Zipline',
    items: [
      { title: 'Features', href: '/#features' },
      { title: 'Documentation', href: '/docs' },
      { title: 'Community', href: '/community' },
      { title: 'Sponsor', href: 'https://github.com/sponsors/diced' },
    ],
  },
  {
    title: 'Documentation',
    items: [
      { title: 'Get Started', href: '/docs/get-started' },
      { title: 'Config', href: '/docs/config' },
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
        <div className='max-w-full px-4 my-20 sm:px-6 lg:px-8'>
          <div className='flex md:flex-row flex-col items-center h-auto justify-between'>
            <div className='flex flex-col items-center'>
              <div className='flex items-center'>
                <p className='text-4xl font-bold mx-6'>Zipline</p>
                <div className='flex flex-row space-x-4'>
                  <Link href='/github' aria-label='github'>
                    <IconBrandGithubFilled className='fill-black dark:fill-white h-6 w-6 transition-colors ease-in-out dark:hover:fill-gray-300 hover:fill-gray-700' />
                  </Link>
                  <Link href='/discord' aria-label='discord'>
                    <IconBrandDiscordFilled className='fill-[#5865F2] hover:fill-[#4750b5] h-6 w-6 transition-colors ease-in-out' />
                  </Link>
                </div>
              </div>

              <div className='text-gray-300 py-2 rounded-md font-normal text-md'>
                © {new Date().getFullYear()}{' '}
                <Link
                  href='https://github.com/diced/'
                  className='hover:underline'
                >
                  diced
                </Link>
                .{' '}
                <Link
                  href='https://github.com/diced/zipline/tree/trunk/LICENSE'
                  className='hover:underline'
                >
                  All rights reserved.
                </Link>
              </div>
              <ThemeDropdown withName />
            </div>

            <div className='justify-center'>
              <div className='md:ml-10 md:flex md:flex-row my-6 md:my-0 flex-col items-baseline md:space-x-20'>
                {items.map((item, i) => (
                  <div key={i} className='py-2 rounded-md font-medium text-md'>
                    <span className='text-lg text-gray-600 dark:text-gray-300'>
                      {item.title}
                    </span>
                    <div className='flex flex-col'>
                      {item.items.map((subItem, j) => (
                        <Link
                          key={j}
                          href={subItem.href}
                          className='flex transition-colors ease-in-out text-gray-300 hover:text-blue-400 py-2 rounded-md font-normal text-sm text-center'
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
