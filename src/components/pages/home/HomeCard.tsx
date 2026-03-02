import { IconBrandDiscordFilled } from '@tabler/icons-react';
import Link from 'next/link';

interface HomeCardProps {
  title: string;
  description: string;
  href?: string;
  Icon: any;
}

export default function HomeCard({
  title,
  description,
  href,
  Icon,
}: HomeCardProps) {
  return (
    <div className='relative w-full group rounded-md p-0 hover:p-0.5 flex-col grow transition-all hover:-translate-y-1 hover:shadow-2xl'>
      <div className='absolute opacity-0 group-hover:opacity-100 inset-0 rounded-md p-[2px] bg-linear-to-r from-blue-500 via-purple-500 to-blue-500 bg-size-[200%_200%] hover:animate-[gradient-spin_3s_linear_infinite]'></div>

      <div className='relative bg-white dark:bg-gray-900 border dark:border-gray-800 border-transparent shadow-md rounded-md p-4 h-full'>
        <Icon className='w-8 h-8 text-gray-400 bg-gray-100 p-1 dark:bg-gray-800 rounded-md' />
        {href ? (
          <Link
            href={href}
            className='flex items-center text-3xl font-bold mt-4 space-x-2 transition-all hover:underline decoration-blue-500'
          >
            {title}
          </Link>
        ) : (
          <span className='flex items-center text-3xl font-bold mt-4 space-x-2 transition-all'>
            {title}
          </span>
        )}
        <p className='text-xl mt-2 grow'>{description}</p>
      </div>
    </div>
  );
}
