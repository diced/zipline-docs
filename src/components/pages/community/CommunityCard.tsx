import { Icon } from '@tabler/icons-react';
import Link from 'next/link';

export type Link = {
  name: string;
  description: string;
  href: string;
  Icon: Icon;
};

export default function CommunityCard({ link }: { link: Link }) {
  return (
    <div className='cursor-pointer dark:bg-gray-900 shadow-md hover:shadow-2xl rounded-md transition-all hover:-translate-y-1 border-gray-100 dark:border-gray-800 border flex flex-col grow justify-center items-center w-full p-4'>
      <h1 className='flex text-3xl font-bold mt-4'>
        <link.Icon
          size={36}
          className='mr-6 fill-black dark:fill-white hover:fill-gray-200 transition-colors ease-in-out h-8 w-8'
        />{' '}
        {link.name}
      </h1>

      <p className='text-center grow text-xl mt-2'>{link.description}</p>

      {link.href && (
        <Link
          href={link.href}
          className='underline decoration-blue-400 hover:decoration-2 font-bold py-2 px-4 rounded-sm mt-4'
          data-umami-event={`community_card_${link.name}`}
        >
          Visit
        </Link>
      )}
    </div>
  );
}
