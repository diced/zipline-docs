import { Item } from '.';
import Link from 'next/link';
import SidebarDropdown from './SidebarDropdown';
import { useRouter } from 'next/router';

export interface SidebarItemProps {
  item: Item;
}

export default function SidebarItem({ item }: SidebarItemProps) {
  const router = useRouter();
  const active = router.asPath.startsWith(item.href || '');

  return (
    <div className='ml-6 mr-1 my-2 font-semibold'>
      {item.items ? (
        <SidebarDropdown item={item} />
      ) : item.href ? (
        <Link
          href={item.href}
          className={`flex items-center transition-colors ease-in-out hover:bg-gray-100/70 dark:hover:bg-gray-800 max-w-full w-full px-2 py-1 rounded-md ${
            active ? 'dark:bg-gray-800 bg-gray-100/50 text-blue-400' : ''
          }`}
        >
          {item.title}
        </Link>
      ) : (
        <div className='transition-colors ease-in-out hover:bg-gray-800 w-full px-2 py-1 rounded-md'>
          {item.title}
        </div>
      )}
    </div>
  );
}
