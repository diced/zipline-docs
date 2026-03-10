import Link from 'next/link';

type Links = {
  title: string;
  description: string;
  href: string;
}[];

export default function DocLinks({ links }: { links: Links }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 my-10 not-prose'>
      {links.map((link, i) => (
        <Link
          href={link.href}
          key={i}
          className='not-prose ease-in-out transition-colors duration-100 border border-gray-200 dark:border-gray-800 rounded-md p-4 hover:border-gray-300 dark:hover:border-blue-700 hover:shadow-md'
        >
          <div className='flex flex-col py-2 px-3'>
            <div className='flex items-center justify-start text-lg'>
              {link.title}
            </div>
            <div className='text-xs text-gray-500 dark:text-gray-400'>
              {link.description.length > 50
                ? link.description.substring(0, 50).trim() + '...'
                : link.description}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
