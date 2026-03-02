import { IconStarFilled } from '@tabler/icons-react';
import clsx from 'clsx';
import Link from 'next/link';

export default function GithubStarsButton({ stars }: { stars?: number }) {
  return (
    <Link href='/github'>
      <button
        className={clsx(
          'transition-all duration-300 ease-in-out hover:scale-105 group w-full md:w-auto flex items-center justify-center',
          'bg-blue-600 hover:bg-black focus:bg-blue-500',
          'text-white font-bold py-2 px-4 rounded-sm text-xl',
          'hover:ring-2 hover:ring-black dark:hover:ring-blue-300 hover:ring-offset-white dark:hover:ring-offset-gray-900 hover:ring-offset-2',
        )}
        data-umami-event='github_stars_button'
      >
        GitHub{' '}
        <IconStarFilled className='w-4 h-4 transition-colors group-hover:fill-yellow-600 ml-4 mr-2' />{' '}
        <span className='text-sm'>
          {Intl.NumberFormat('en', { notation: 'compact' }).format(
            stars ?? 1600,
          )}
        </span>
      </button>
    </Link>
  );
}
