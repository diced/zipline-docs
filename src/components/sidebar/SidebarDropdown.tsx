import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { randomStr } from '../../lib/random';
import SidebarItem, { SidebarItemProps } from './SidebarItem';

export default function SidebarDropdown({ item }: SidebarItemProps) {
  function isActive(item: SidebarItemProps['item']): boolean {
    if (item.items && !item.href) {
      return item.items.some((item) => isActive(item));
    }

    return router.asPath.startsWith(item.href || '');
  }
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(isActive(item));

  const active = router.asPath === item.href || '';

  return (
    <div>
      {item.href ? (
        <button className='flex w-full'>
          <Link
            className={`flex transition-colors text-gray-400 hover:text-black dark:hover:text-white ease-in-out w-full mr-1 items-center justify-between hover:bg-gray-100/60 dark:hover:bg-gray-800/40 rounded-md px-2 py-1 ${
              active ? 'dark:bg-gray-800/60 bg-gray-100/50 text-blue-400 font-semibold' : ''
            }`}
            href={item.href}
          >
            <div>{item.title}</div>
          </Link>
          <div
            className='mr-2 transition-colors ease-in-out text-gray-400 hover:bg-gray-100/60 dark:hover:bg-gray-800/40 rounded-md cursor-pointer'
            onClick={() => setOpen(!open)}
          >
            {open ? <IconChevronDown size={24} /> : <IconChevronRight size={24} />}
          </div>
        </button>
      ) : (
        <button
          className={`flex w-full transition-colors text-gray-400 hover:text-black dark:hover:text-white ease-in-out items-center justify-between hover:bg-gray-100/60 dark:hover:bg-gray-800/40 rounded-md px-2 py-1 ${
            active ? 'dark:bg-gray-800/60 bg-gray-100/50 text-blue-400' : ''
          }`}
          onClick={() => setOpen(!open)}
        >
          <div>{item.title}</div>
          <div
            className='transition-colors ease-in-out hover:bg-gray-100/60 dark:hover:bg-gray-800 rounded-md cursor-pointer'
            onClick={() => setOpen(!open)}
          >
            {open ? <IconChevronDown size={24} /> : <IconChevronRight size={24} />}
          </div>
        </button>
      )}

      <ul className='ml-1/2' style={{ display: open ? 'block' : 'none' }}>
        {item.items?.map((subitem) => <SidebarItem key={randomStr()} item={subitem} />)}
      </ul>
    </div>
  );
}
