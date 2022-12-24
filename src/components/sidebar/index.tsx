import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'tabler-icons-react';
import { randomStr } from '../../lib/random';
import Container from '../Container';
import Headings from '../Headings';
import SidebarItem from './SidebarItem';

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
  const [onThisPageOpen, setOnThisPageOpen] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleScroll() {
      if (ref.current && window.scrollY > ref.current.clientHeight) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return (
    <div className='max-xl md:max-w-full mx-auto md:px-0 flex mb-10'>
      <aside
        style={{ top: 'calc(2rem + 50px)' }}
        className='hidden md:block w-1/4 h-screen sticky dark:bg-gray-900 overflow-y-scroll overflow-x-hidden'
      >
        <div className='font-bold text-xl w-full ml-6 mr-1 my-2'>Documentation</div>
        {items.map((item) => (
          <SidebarItem key={randomStr()} item={item} />
        ))}
      </aside>
      <main className='w-full'>
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

        <div className='container max-w-xl md:max-w-3xl mx-auto px-6'>{children}</div>
      </main>
      <aside
        style={{ top: 'calc(2rem + 50px)' }}
        className='hidden md:block w-1/4 h-screen sticky top-0 dark:bg-gray-900 pr-2'
      >
        <div className='font-bold text-xl w-fullmr-1 my-2'>On this page</div>

        <Headings />
      </aside>
    </div>
  );
}
