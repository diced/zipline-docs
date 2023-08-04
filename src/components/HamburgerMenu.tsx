import { IconMenu, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { randomStr } from '../lib/random';
import { items } from './Header';
import { Item } from './sidebar';
import SidebarItem from './sidebar/SidebarItem';

interface HamburgerMenuProps {
  item?: Item;
}

export default function HamburgerMenu({ item }: HamburgerMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const isDocs = router.asPath.startsWith('/docs/');

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  return (
    <>
      <button
        className='ml-2 justify-end p-2 text-gray-400 rounded-md dark:hover:bg-gray-900/80'
        onClick={() => setOpen(!open)}
      >
        <span className='sr-only'>Open main menu</span>
        <IconMenu />
      </button>

      {open && (
        <div
          ref={ref}
          className='md:hidden top-0 right-0 left-0 bottom-0 absolute w-[100vw] max-w-[100vw] h-screen z-[10000] bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md'
        >
          <div className='px-5 pt-4 flex items-center justify-between'>
            <div className='flex items-center'>
              <Link href='/' className='text-3xl font-bold'>
                Zipline
              </Link>
            </div>
            <div className='-mr-2'>
              <button
                className='m-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500'
                onClick={() => setOpen(!open)}
              >
                <span className='sr-only'>Close main menu</span>
                <IconX />
              </button>
            </div>
          </div>
          <div className='px-2 pt-2 pb-3 space-y-1'>
            {items.map((item) => (
              <a
                key={randomStr()}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium hover:text-gray-600 dark:hover:text-gray-200 dark:hover:bg-gray-900/40 ${
                  item.active(router.pathname, router.asPath) ? 'text-blue-400' : ''
                }}`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {isDocs && item && (
            <div className='px-2 pt-2 pb-3 space-y-1'>
              <SidebarItem item={item} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
