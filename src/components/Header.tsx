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
    name: 'Docs',
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
  const [scrolling, setScrolling] = useState(false);

  const router = useRouter();

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

  const handleClick = () => {
    if (router.pathname !== '/') return;

    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed w-full h-16 top-0 z-50 backdrop-filter backdrop-blur-md transition-all duration-500 ease-in-out ${
        scrolling
          ? 'border-gray-100 dark:border-gray-800 bg-white/40 dark:bg-gray-900/70 border-b'
          : 'border-gray-100/0 dark:border-gray-800/0 bg-white/0 dark:bg-gray-900/0'
      }`}
    >
      <div className='sm:px-6 lg:px-8 py-2'>
        <div className='flex lg:grid lg:grid-cols-3 flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <div className='hidden justify-start items-center text-sm md:flex'>
            <Link
              href='/'
              className='flex flex-row items-center flex-shrink-0 mr-6 ml-6 text-3xl font-bold dark:hover:text-blue-400 hover:text-blue-500 transition-colors duration-500'
            >
              Zipline
            </Link>
          </div>
          <div className='justify-center items-baseline space-x-4 hidden md:flex'>
            {items.map((item) =>
              router.pathname === '/' && item.name === 'Features' ? (
                <button
                  key={randomStr()}
                  aria-label={item.name}
                  className={`text-gray-300 px-3 py-1 rounded-md font-medium text-lg transition-all ease-in-out hover:text-blue-400 ${
                    item.active(router.pathname, router.asPath)
                      ? 'text-blue-400 dark:bg-gray-800/70 bg-gray-50/50'
                      : ''
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
                  className={`text-gray-300 px-3 py-1 rounded-md font-medium text-lg transition-all ease-in-out hover:text-blue-400 ${
                    item.active(router.pathname, router.asPath)
                      ? 'text-blue-400 dark:bg-gray-800/70 bg-gray-200/30'
                      : ''
                  }`}
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>
          <div className='flex sm:grid sm:grid-cols-2 justify-between items-center w-full md:hidden'>
            <Link href='/' className='ml-6 text-2xl font-bold text-blue-300 justify-start'>
              Zipline
            </Link>

            <div className='flex flex-row items-center'>
              <ThemeDropdown />
              <HamburgerMenu />
            </div>
          </div>
          <div className='hidden md:flex justify-end items-center'>
            <ThemeDropdown />
            <Link href='/github' className='text-gray-300 px-3 py-2 rounded-md font-medium text-md'>
              <IconBrandGithubFilled className='text-black dark:text-white hover:text-gray-200 transition-colors duration-300 ease-in-out w-6 h-6' />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
