import { IconMenu, IconX } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import { Item } from '..';
import SearchBar from '../../search/SearchBar';
import SidebarItem from '../SidebarItem';
import { useRouter } from 'next/router';

interface MobileMenuProps {
  items: Item[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

function findItem(items: Item[], href: string): Item | undefined {
  for (const item of items) {
    if (item.href === href) return item;

    if (item.items) {
      const found = findItem(item.items, href);
      if (found) return found;
    }
  }
}

export default function MobileMenu({ items, open, setOpen }: MobileMenuProps) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const currentDocItem = findItem(items, router.asPath);

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
      document.body.style.overflow = 'visible';
    }
  }, [open]);

  return (
    <div className='xl:hidden w-full z-50 flex justify-between dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 bg-white/85 dark:bg-gray-900/70'>
      <button
        className='flex items-center text-white transition-colors ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md mx-6 my-2 py-0.5 pr-2'
        onClick={() => setOpen(!open)}
      >
        <IconMenu className='mx-2 text-gray-400' />

        <span className='ml-4 text-gray-400 font-semibold'>Menu</span>
      </button>

      {open && (
        <>
          <div
            ref={ref}
            className='md:hidden top-0 right-0 left-0 bottom-0 absolute overflow-auto w-screen max-w-[100vw] z-999999 h-[60vh] dark:bg-gray-900 bg-white border-b dark:border-b-gray-800 shadow-2xl'
          >
            <div className='px-5 py-2 flex items-center justify-between'>
              <div className='flex items-center'>
                <span className='text-3xl font-bold'>Docs</span>
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
            <div className='px-5 py-2 pb-3 space-y-1'>
              <SearchBar />

              <ul>
                {items.map((item, i) => (
                  <SidebarItem key={i} item={item} />
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
