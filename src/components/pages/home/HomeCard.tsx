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
    <div className='dark:bg-gray-800 shadow-md hover:shadow-2xl rounded-md transition-all duration-200 hover:scale-105 hover:-translate-y-2 border-gray-100 dark:border-gray-700 border flex flex-col flex-grow justify-center items-center w-full p-4'>
      <h1 className='flex items-center text-3xl text-center font-bold mt-4'>
        <Icon
          className={`mr-4 h-6 w-6 text-black dark:text-white ${
            Icon.name === DiscordIcon.name ? 'dark:fill-white' : ''
          }`}
        />
        {title}
      </h1>

      <p className='text-center text-xl mt-2 grow'>{description}</p>

      {href && (
        <Link
          href={href}
          className='underline decoration-blue-400 hover:decoration-[2px] font-bold py-2 px-4 rounded mt-4'
        >
          Documentation
        </Link>
      )}
    </div>
  );
}
