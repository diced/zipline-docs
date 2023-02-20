import { useContext } from 'react';
import { Search } from 'tabler-icons-react';
import { SearchContext } from './SearchProvider';

export default function SearchBar({ big }: { big?: boolean }) {
  const { isOpen, setIsOpen } = useContext(SearchContext);

  return (
    <button
      className={`transition-all flex items-center space-x-3 rounded-md text-gray-400 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 dark:hover:bg-gray-700/80 hover:bg-gray-100 ${
        big ? 'p-3 sm:w-full md:w-72' : 'p-2 mb-4 w-full'
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <Search size={20} />
      <span className='flex-auto text-left'>Quick search...</span>
      <span className='text-gray-400 text-xs font-semibold'>Ctrl K</span>
    </button>
  );
}
