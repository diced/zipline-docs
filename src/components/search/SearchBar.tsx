import { IconSearch } from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from './SearchProvider';
import clsx from 'clsx';

export default function SearchBar({ big }: { big?: boolean }) {
  const { isOpen, setIsOpen } = useContext(SearchContext);

  const [mod, setMod] = useState('Ctrl + ');
  useEffect(() => {
    const isMac = navigator.userAgent.includes('Mac');
    setMod(isMac ? '⌘' : 'Ctrl + ');
  }, []);

  return (
    <button
      className={clsx(
        'transition-all flex items-center space-x-3 p-2 rounded-md text-gray-400 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 dark:hover:bg-gray-800/80 hover:bg-gray-100',
        big ? 'sm:w-full md:w-72' : 'mb-4 w-full',
      )}
      onClick={() => setIsOpen(!isOpen)}
      data-umami-event='search_button'
    >
      <IconSearch size={20} />
      <span className='flex-auto text-left'>Quick search...</span>
      <span className='text-gray-400 text-xs font-semibold'>{mod}K</span>
    </button>
  );
}
