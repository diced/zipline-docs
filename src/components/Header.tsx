import { IconBrandGithubFilled } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { randomStr } from '../lib/random';
import HamburgerMenu from './HamburgerMenu';
import ThemeDropdown from './ThemeDropdown';

export const items = [
  {
    name: 'Features',
    href: '/#features',
    active: (_: string, asPath: string) => asPath === '/#features',
  },
  {
    name: 'Documentation',
    href: '/docs/get-started',
    active: (pathname: string) => pathname.startsWith('/docs'),
  },
  {
    name: 'Releases',
    href: '/releases',
    active: (pathname: string) => pathname === '/releases',
  },
  {
    name: 'FAQ',
    href: '/faq',
    active: (pathname: string) => pathname === '/faq',
  },
  {
    name: 'Community',
    href: '/community',
    active: (pathname: string) => pathname === '/community',
  },
];

export default function Navbar() {
  const router = useRouter();

  const [scrolling, setScrolling] = useState(false);

  const handleClick = () => {
    if (router.pathname !== '/') return;

    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 backdrop-filter backdrop-blur-md transition-all duration-500 ease-in-out border-gray-100  border-b dark:border-gray-800 ${
        scrolling
          ? 'bg-white/85 dark:bg-gray-900/70'
          : 'bg-white/0 dark:bg-gray-900/0'
      }`}
    >
      <div className='sm:px-2 lg:px-6 py-3'>
        <div className='flex lg:grid lg:grid-cols-3 items-center mx-auto max-w-screen-2xl'>
          <div className='hidden justify-start items-center md:flex'>
            <Link
              href='/'
              className='mr-6 ml-6 text-2xl font-semibold tracking-wide dark:hover:text-blue-300 hover:text-blue-500 transition-colors duration-200 ease-out'
            >
              Zipline
            </Link>
          </div>

          <div className='items-baseline space-x-4 hidden md:flex'>
            {items.map((item) =>
              router.pathname === '/' && item.name === 'Features' ? (
                <button
                  key={randomStr()}
                  aria-label={item.name}
                  className={`px-3 py-1 rounded-md font-medium text-md transition-all ease-in-out dark:hover:text-blue-300 hover:text-blue-400 ${
                    item.active(router.pathname, router.asPath)
                      ? 'text-blue-500'
                      : 'dark:text-gray-300 text-gray-600'
                  }`}
                  onClick={handleClick}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={randomStr()}
                  href={item.href}
                  aria-label={item.name}
                  className={`px-3 py-1 rounded-md font-medium text-md transition-all ease-in-out dark:hover:text-blue-300 hover:text-blue-400 ${
                    item.active(router.pathname, router.asPath)
                      ? 'text-blue-500'
                      : 'dark:text-gray-300 text-gray-600'
                  }`}
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>

          <div className='flex sm:grid sm:grid-cols-2 justify-between items-center w-full md:hidden'>
            <Link
              href='/'
              className='ml-6 text-2xl font-bold text-blue-300 justify-start'
            >
              Zipline
            </Link>

            <div className='flex flex-row items-center'>
              <ThemeDropdown />
              <HamburgerMenu />
            </div>
          </div>

          <div className='hidden md:flex justify-end items-center'>
            <ThemeDropdown />

            <Link
              href='/github'
              className='text-gray-300 px-3 py-2 rounded-md font-medium text-md'
            >
              <IconBrandGithubFilled className='text-black dark:text-white hover:text-gray-200 transition-colors duration-300 ease-in-out w-6 h-6' />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
