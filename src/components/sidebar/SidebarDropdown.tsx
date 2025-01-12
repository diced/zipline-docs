import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
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
        <button
          className={clsx(
            'flex transition-colors hover:text-black dark:hover:text-white ease-in-out w-full mr-1 items-center justify-between hover:bg-gray-100/60 dark:hover:bg-gray-800/40 rounded-md px-2 py-1.5',
            active
              ? 'dark:bg-gray-800/60 bg-gray-100/50 text-blue-400 font-semibold'
              : 'text-gray-400',
          )}
        >
          <Link href={item.href} className='w-full text-left'>
            {item.title}
          </Link>

          <div
            className='transition-colors ease-in-out text-gray-400 hover:bg-gray-100/60 dark:hover:bg-gray-800/40 rounded-md cursor-pointer'
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <IconChevronDown size='1.25rem' />
            ) : (
              <IconChevronRight size='1.25rem' />
            )}
          </div>
        </button>
      ) : (
        <button
          className={clsx(
            'flex transition-colors hover:text-black dark:hover:text-white ease-in-out w-full mr-1 items-center justify-between hover:bg-gray-100/60 dark:hover:bg-gray-800/40 rounded-md px-2 py-1.5',
            active
              ? 'dark:bg-gray-800/60 bg-gray-100/50 text-blue-400 font-semibold'
              : 'text-gray-400',
          )}
          onClick={() => setOpen(!open)}
        >
          <div>{item.title}</div>
          <div onClick={() => setOpen(!open)}>
            {open ? (
              <IconChevronDown size='1.25rem' />
            ) : (
              <IconChevronRight size='1.25rem' />
            )}
          </div>
        </button>
      )}

      <ul
        className='border-l border-l-gray-800 ms-2 ps-4'
        style={{ display: open ? 'block' : 'none' }}
      >
        {item.items?.map((subitem, i) => (
          <SidebarItem key={i} item={subitem} />
        ))}
      </ul>
    </div>
  );
}
