import { IconMenu, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { randomStr } from '../../lib/random';
import Headings from '../Headings';
import SearchBar from '../search/SearchBar';
import SidebarItem from './SidebarItem';
import VersionSelect from './VersionSelect';
import MobileMenu from './full/MobileMenu';
import MobileHeadingsMenu from './full/MobileHeadingsMenu';

export interface SidebarProps {
  items: Item[];
  children: React.ReactNode;
}

export interface Item {
  title: string;
  href?: string;
  items?: Item[];
}

export default function Sidebar({ items, children }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const [onThisPageOpen, setOnThisPageOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [scrolling, setScrolling] = useState(false);

  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
        setOnThisPageOpen(false);
      }
    }

    function handleScroll() {
      if (ref.current && window.scrollY > ref.current.clientHeight) {
        setOpen(false);
        setOnThisPageOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  useEffect(() => {
    setOpen(false);
    setOnThisPageOpen(false);
  }, [router.asPath]);

  return (
    <div className='flex flex-1 w-full'>
      <aside
        className='select-none scroll-area text-sm flex-shrink-0 w-64 hidden md:sticky top-24 overflow-y-auto transform-none h-[calc(100vh-50px)] md:block'
        style={{ maxHeight: '95%' }}
      >
        <div className='mx-2'>
          <SearchBar />

          <VersionSelect />
        </div>

        <ul>
          {items.map((item) => (
            <SidebarItem key={randomStr()} item={item} />
          ))}
        </ul>
      </aside>
      <div className='w-full'>
        <div
          className={`md:hidden fixed w-full z-[49] flex justify-between p-1 dark:bg-gray-900 border-b border-t border-gray-200 dark:border-gray-700 px-6 -my-4 mb-2 backdrop-filter backdrop-blur-md transition-all duration-500 ease-in-out ${
            scrolling
              ? 'border-gray-100 dark:border-gray-800 bg-white/40 dark:bg-gray-900/70 borderb'
              : 'bg-white/0 dark:bg-gray-900/0'
          }`}
        >
          <MobileMenu open={open} setOpen={setOpen} items={items} />

          <MobileHeadingsMenu open={onThisPageOpen} setOpen={setOnThisPageOpen} />
        </div>

        <div className='grow pb-8 w-full justify-center max-w-full flex min-w-0'>{children}</div>
      </div>
      <aside className='select-none text-sm flex-shrink-0 w-64 hidden md:sticky top-24 overflow-y-auto transform-none h-[calc(100vh-50px)] md:block'>
        <div className='font-semibold text-sm w-full mr-1 mb-4'>On This Page</div>

        <Headings close={() => {}} />
      </aside>
    </div>
  );
}
