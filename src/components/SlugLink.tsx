import { IconHash } from '@tabler/icons-react';
import Link from 'next/link';

export default function SlugLink({ id }: { id: string }) {
  return (
    <Link
      href={`#${id}`}
      className='ml-2 text-gray-400 hover:text-gray-200 opacity-0 transition-opacity ease-in-out group-hover:opacity-100 duration-300 '
    >
      <IconHash />
    </Link>
  );
}
