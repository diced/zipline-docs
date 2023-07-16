import { IconBrandDiscordFilled } from '@tabler/icons-react';
import Link from 'next/link';

interface HomeCardProps {
  title: string;
  description: string;
  href?: string;
  Icon: any;
}

export default function HomeCard({ title, description, href, Icon }: HomeCardProps) {
  return (
    <div className='shadow-md hover:dark:border-blue-700 border w-full rounded-md dark:border-gray-800 border-gray-100 p-4 flex-col flex-grow transition-all hover:-translate-y-1 hover:shadow-2xl cursor-pointer'>
      <Icon className='w-8 h-8 text-gray-400 bg-gray-100 p-1 dark:bg-gray-800 rounded-md' />
      {href ? (
        <Link
          href={href}
          className='flex items-center text-3xl font-bold mt-4 space-x-2 transition-all hover:underline decoration-blue-500'
        >
          {title}
        </Link>
      ) : (
        <span className='flex items-center text-3xl font-bold mt-4 space-x-2 transition-all'>{title}</span>
      )}

      <p className='text-xl mt-2 grow'>{description}</p>
    </div>
  );
}
