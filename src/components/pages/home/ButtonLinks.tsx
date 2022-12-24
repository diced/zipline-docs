import Link from 'next/link';
import { ArrowRight, BrandGithub, Star } from 'tabler-icons-react';
import GithubIcon from '../../icons/GithubIcon';
import Tooltip from '../../Tooltip';

export default function ButtonLinks({ stars }: { stars: number }) {
  return (
    <div className='flex flex-col md:flex-row justify-center mt-8 space-y-4 md:space-y-0 md:space-x-6'>
      <Link
        href='/docs/get-started'
        className='w-full md:w-auto justify-between items-center transition-all shadow-lg duration-500 shadow-blue-500/30 hover:shadow-blue-600/50 ease-in-out bg-blue-500 hover:bg-blue-600 focus:bg-blue-400 text-white font-bold py-2 px-4 rounded text-2xl flex'
      >
        Get Started <ArrowRight className='md:ml-6' />
      </Link>

      <Tooltip
        label={
          stars === 0 ? (
            "Couldn't fetch stars :("
          ) : (
            <div className='flex items-center'>
              <Star className='mr-2' /> {stars?.toLocaleString()} stars!
            </div>
          )
        }
        placement='top-start'
      >
        <Link
          href='/github'
          className='w-full md:w-auto justify-between duration-500 transition-all hover:shadow-lg hover:shadow-gray-600/50 ease-in-out bg-gray-400 dark:bg-gray-800 hover:bg-gray-700 focus:bg-gray-600 text-white font-bold py-2 px-4 rounded text-2xl flex items-center'
        >
          GitHub <GithubIcon className='w-6 h-6 fill-white md:ml-6' />
        </Link>
      </Tooltip>
    </div>
  );
}
