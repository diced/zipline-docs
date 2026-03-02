import clsx from 'clsx';
import Link from 'next/link';
import GithubStarsButton from '../../GithubStarsButton';
import SearchBar from '../../search/SearchBar';

export default function ButtonLinks({
  stars,
  first: first,
}: {
  stars: number;
  first?: boolean;
}) {
  return (
    <div className='flex flex-col md:flex-row justify-center mt-8 space-y-4 md:space-y-0 md:space-x-6'>
      <Link href='/docs/get-started'>
        <button
          className={clsx(
            'transition-all duration-300 ease-in-out hover:scale-105 group w-full md:w-auto',
            'bg-blue-600 hover:bg-blue-500 focus:bg-blue-500',
            'text-white font-bold py-2 px-4 rounded-sm text-xl',
            'hover:ring-2 hover:ring-blue-800 dark:hover:ring-blue-300 hover:ring-offset-white dark:hover:ring-offset-gray-900 hover:ring-offset-2',
          )}
          data-umami-event='home_get_started'
        >
          Get started
        </button>
      </Link>

      {first ? <SearchBar big /> : <GithubStarsButton stars={stars} />}
    </div>
  );
}
