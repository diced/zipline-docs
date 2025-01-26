import { Icon, IconFile } from '@tabler/icons-react';
import Link from 'next/link';

export type Project = {
  name: string;
  description: string;
  href: string;
  author: string;
  authorHref?: string;
  image?: string;
  Icon?: Icon;
};

export default function CommunityProject({ project }: { project: Project }) {
  return (
    <div
      key={project.name}
      className='border border-gray-100 dark:border-gray-800 rounded-md shadow-md hover:shadow-2xl transition-all p-4 flex flex-row items-center'
    >
      {project.image ? (
        <img
          src={project.image}
          alt={project.name}
          className='rounded-md w-20 h-20 object-cover'
        />
      ) : project.Icon ? (
        <project.Icon className='w-20 h-20' />
      ) : (
        <IconFile className='w-20 h-20' />
      )}

      <div className='flex flex-col ml-4'>
        <Link
          href={project.href}
          className='text-3xl font-bold hover:underline decoration-blue-400 hover:decoration-[2px]'
        >
          {project.name}
        </Link>

        <p className='text-lg mt-2'>{project.description}</p>

        {project.author && (
          <span className='text-gray-500 dark:text-gray-400 '>
            by{' '}
            <a
              href={project.authorHref}
              className='text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition-colors'
            >
              {project.author}
            </a>
          </span>
        )}
      </div>
    </div>
  );
}
