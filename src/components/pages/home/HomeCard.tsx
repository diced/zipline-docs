import Link from 'next/link';
import DiscordIcon from '../../icons/DiscordIcon';

interface HomeCardProps {
  title: string;
  description: string;
  href?: string;
  Icon: any;
}

export default function HomeCard({ title, description, href, Icon }: HomeCardProps) {
  return (
    // <div className='dark:bg-gray-800 shadow-md hover:shadow-2xl rounded-md transition-all duration-200 hover:scale-105 hover:-translate-y-2 border-gray-100 dark:border-gray-700 border flex flex-col flex-grow justify-center items-center w-full p-4'>
    <div className='shadow-md border w-full rounded-md dark:border-gray-800 border-gray-100 p-4 flex-col flex-grow transition-all hover:-translate-y-1 hover:shadow-2xl cursor-pointer'>
      <Icon
        className={`w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-gray-400 ${
          Icon.name === DiscordIcon.name ? 'fill-gray-400' : ''
        }`}
      />
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
