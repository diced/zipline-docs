import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'tabler-icons-react';
import { randomStr } from '../../lib/random';
import Headings from '../Headings';
import SearchBar from '../search/SearchBar';
import SidebarItem from './SidebarItem';
import VersionSelect from './VersionSelect';

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
      <aside className='select-none text-sm flex-shrink-0 w-64 hidden md:sticky top-24 overflow-y-auto transform-none h-[calc(100vh-50px)] md:block'>
        <div className='mx-2'>
          <SearchBar />

          <VersionSelect />
        </div>
        {items.map((item) => (
          <SidebarItem key={randomStr()} item={item} />
        ))}
      </aside>
      <div className='w-full'>
        <div className='md:hidden flex justify-between p-1 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 -my-6 mb-2'>
          <button
            className='flex items-center text-white transition-colors ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md'
            onClick={() => setOpen(!open)}
          >
            <span className='ml-4 text-gray-400'>Menu</span>
            <Menu className='mx-2 text-gray-400' />
          </button>

          <button
            className='flex items-center text-white transition-colors ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md'
            onClick={() => setOnThisPageOpen(!onThisPageOpen)}
          >
            <span className='ml-4 text-gray-400'>On this page</span>
            <Menu className='mx-2 text-gray-400' />
          </button>
        </div>

        {open && (
          <div
            ref={ref}
            className='md:hidden block absolute top-12 rounded-md inset-x-0 m-4 border border-gray-200 dark:border-gray-700 p-2 transition transform origin-top-right dark:bg-gray-900 bg-gray-50 backdrop-blur-3xl'
          >
            <SearchBar />
            <VersionSelect />

            {items.map((item) => (
              <SidebarItem key={randomStr()} item={item} />
            ))}
            <button
              className='flex mt-6 transition-colors ease-in-out w-full mr-1 items-center justify-between hover:bg-gray-200/50 dark:hover:bg-gray-800 rounded-md px-2 py-1'
              onClick={() => setOpen(!open)}
            >
              <div className='flex text-center'>Close Menu</div>
              <div>
                <X className='mr-2' />
              </div>
            </button>
          </div>
        )}

        {onThisPageOpen && (
          <div
            ref={ref}
            className='md:hidden block absolute top-12 rounded-md inset-x-0 m-4 border border-gray-200 dark:border-gray-700 p-2 transition transform origin-top-right dark:bg-gray-900 bg-gray-50 backdrop-blur-3xl px-4'
          >
            <Headings />

            <button
              className='flex mt-6 transition-colors ease-in-out w-full mr-1 items-center justify-between hover:bg-gray-200/50 dark:hover:bg-gray-800 rounded-md px-2 py-1'
              onClick={() => setOnThisPageOpen(!onThisPageOpen)}
            >
              <div className='flex text-center'>Close Menu</div>
              <div>
                <X className='mr-2' />
              </div>
            </button>
          </div>
        )}

        <div className='grow pb-8 w-full justify-center max-w-full flex min-w-0'>{children}</div>
      </div>
      <aside className='select-none text-sm flex-shrink-0 w-64 hidden md:sticky top-24 overflow-y-auto transform-none h-[calc(100vh-50px)] md:block'>
        <div className='font-semibold text-sm w-full mr-1 mb-4'>On This Page</div>

        <Headings />
      </aside>
    </div>
  );
}
