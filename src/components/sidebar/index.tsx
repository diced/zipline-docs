import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import SearchBar from '../search/SearchBar';
import Headings from './SidebarHeadings';
import SidebarItem from './SidebarItem';
import MobileMenu from './full/MobileMenu';

export interface SidebarProps {
  items: Item[];
  children: React.ReactNode;
}

export interface Item {
  title: string;
  href?: string;
  hidden?: boolean;
  items?: Item[];
}

export default function Sidebar({ items, children }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);

  useEffect(() => {
    setOpen(false);
  }, [router.asPath]);

  return (
    <div className='flex flex-1 w-full'>
      <aside
        className='scroll-styled pr-4 select-none scroll-area text-sm flex-shrink-0 w-64 hidden lg:sticky top-24 overflow-y-auto transform-none h-[calc(100vh-150px)] xl:block'
        style={{ maxHeight: '90%' }}
      >
        <SearchBar />

        <ul>
          {items.map((item, i) => (
            <SidebarItem key={i} item={item} />
          ))}
        </ul>
      </aside>

      <div className='w-full'>
        <MobileMenu open={open} setOpen={setOpen} items={items} />

        <div className='grow pb-8 w-full justify-center max-w-full flex min-w-0'>
          {children}
        </div>
      </div>

      <aside className='scroll-styled select-none text-sm flex-shrink-0 w-64 hidden lg:sticky top-24 overflow-y-auto transform-none h-[calc(100vh-50px)] xl:block'>
        <div className='font-semibold text-sm w-full mb-4'>On This Page</div>

        <Headings close={() => {}} />
      </aside>
    </div>
  );
}
