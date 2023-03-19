import { Icon } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CommunityCardProps {
  title: string;
  description: string;
  href?: string;
  Icon: Icon;
}

export default function CommunityCard({ title, description, href, Icon }: CommunityCardProps) {
  return (
    <div className='cursor-pointer dark:bg-gray-900 shadow-md hover:shadow-2xl rounded-md transition-all hover:-translate-y-1 border-gray-100 dark:border-gray-800 border flex flex-col flex-grow justify-center items-center w-full p-4'>
      <h1 className='flex text-3xl font-bold mt-4'>
        <Icon
          size={36}
          className='mr-6 fill-black dark:fill-white hover:fill-gray-200 transition-colors ease-in-out h-8 w-8'
        />{' '}
        {title}
      </h1>

      <p className='text-center grow text-xl mt-2'>{description}</p>

      {href && (
        <Link
          href={href}
          className='underline decoration-blue-400 hover:decoration-[2px] font-bold py-2 px-4 rounded mt-4'
        >
          Visit
        </Link>
      )}
    </div>
  );
}
