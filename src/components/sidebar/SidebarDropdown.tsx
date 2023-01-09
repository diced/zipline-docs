import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'tabler-icons-react';
import { randomStr } from '../../lib/random';
import SidebarItem, { SidebarItemProps } from './SidebarItem';

export default function SidebarDropdown({ item }: SidebarItemProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    function isActive(item: SidebarItemProps['item']): boolean {
      if (item.items && !item.href) {
        return item.items.some((item) => isActive(item));
      }

      return router.asPath.startsWith(item.href || '');
    }

    if (isActive(item)) {
      setOpen(true);
    }
  }, []);

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
            {open ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
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
            {open ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
          </div>
        </button>
      )}

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0 }}
          transition={{ duration: 0.2 }}
          className='ml-1/2'
        >
          {item.items?.map((subitem) => (
            <SidebarItem key={randomStr()} item={subitem} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
