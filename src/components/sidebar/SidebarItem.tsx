import { Item } from '.';
import Link from 'next/link';
import SidebarDropdown from './SidebarDropdown';
import { useRouter } from 'next/router';
import clsx from 'clsx';

export interface SidebarItemProps {
  item: Item;
}

export default function SidebarItem({ item }: SidebarItemProps) {
  const router = useRouter();
  const active = router.asPath === item.href || '';

  return (
    <li className='my-1'>
      {item.items ? (
        <SidebarDropdown item={item} />
      ) : item.href ? (
        <Link
          href={item.href}
          className={clsx(
            'flex items-center transition-colors hover:text-black dark:hover:text-white ease-in-out hover:bg-gray-100/70 dark:hover:bg-gray-800/40 max-w-full w-full px-2 py-1.5 rounded-md',
            active
              ? 'dark:bg-gray-800/60 bg-gray-100/50 text-blue-400 font-semibold'
              : 'text-gray-400',
          )}
        >
          {item.title}
        </Link>
      ) : (
        <div className='transition-colors ease-in-out hover:bg-gray-800 w-full px-2 py-1.5 rounded-md'>
          {item.title}
        </div>
      )}
    </li>
  );
}
