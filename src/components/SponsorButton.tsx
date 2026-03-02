import { IconHeartFilled } from '@tabler/icons-react';
import clsx from 'clsx';
import Link from 'next/link';

export default function SponsorButton() {
  return (
    <Link href='https://github.com/sponsors/diced'>
      <button
        className={clsx(
          'transition-all duration-300 ease-in-out hover:scale-105 group w-full md:w-auto flex items-center justify-center',
          'bg-blue-600 hover:bg-gray-800 focus:bg-blue-500',
          'text-white font-bold py-2 px-4 rounded-sm text-xl',
          'hover:ring-2 hover:ring-gray-800 dark:hover:ring-blue-300 hover:ring-offset-white dark:hover:ring-offset-gray-900 hover:ring-offset-2',
        )}
        data-umami-event='sponsor_button'
      >
        Sponsor on GitHub{' '}
        <IconHeartFilled className='w-4 h-4 transition-colors group-hover:fill-red-400 ml-4' />
      </button>
    </Link>
  );
}
